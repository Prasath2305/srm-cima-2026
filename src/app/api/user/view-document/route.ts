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

export async function GET(req: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: session } = await supabase
      .from('sessions')
      .select('user_id')
      .eq('token', sessionToken)
      .single();

    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'Path required' }, { status: 400 });
    }

    // Verify ownership - user can only view their own files
    const { data: registration } = await supabase
      .from('registrations')
      .select('id')
      .eq('user_id', session.user_id)
      .or(`abstract_file_path.eq.${filePath},payment_screenshot_path.eq.${filePath},full_paper_path.eq.${filePath}`)
      .single();

    if (!registration) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get file from storage
    const { data: fileData, error } = await supabase
      .storage
      .from('cima26-abstracts')
      .download(filePath);

    if (error || !fileData) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileName = filePath.split('/').pop() || 'document';
    const contentType = fileData.type || 'application/pdf';
    
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `inline; filename="${fileName}"`);
    headers.set('Cache-Control', 'public, max-age=3600');

    return new NextResponse(fileData, { headers });

  } catch (error) {
    console.error('View error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}