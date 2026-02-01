import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req: NextRequest) {
  try {
    // Verify user session
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get session
    const { data: session } = await supabase
      .from('sessions')
      .select('user_id')
      .eq('token', sessionToken)
      .single();

    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    // Get user's registration
    const { data: registration } = await supabase
      .from('registrations')
      .select('id, status, user_id, full_paper_path')
      .eq('user_id', session.user_id)
      .single();

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Check if approved
    if (registration.status !== 'approved') {
      return NextResponse.json(
        { error: 'Full paper can only be uploaded after approval' }, 
        { status: 403 }
      );
    }

    // Parse file
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files allowed' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    // Generate path
    const fileExt = file.name.split('.').pop();
    const fileName = `fullpapers/${registration.id}/${Date.now()}_fullpaper.${fileExt}`;

    // Delete old file if exists
    if (registration.full_paper_path) {
      await supabase.storage
        .from('cima26-abstracts')
        .remove([registration.full_paper_path]);
    }

    // Upload
    const { error: uploadError } = await supabase.storage
      .from('cima26-abstracts')
      .upload(fileName, file, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    // Update DB
    const { error: updateError } = await supabase
      .from('registrations')
      .update({ 
        full_paper_path: fileName,
        updated_at: new Date().toISOString()
      })
      .eq('id', registration.id);

    if (updateError) {
      await supabase.storage.from('cima26-abstracts').remove([fileName]);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Full paper uploaded successfully',
      filePath: fileName 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' }, 
      { status: 500 }
    );
  }
}