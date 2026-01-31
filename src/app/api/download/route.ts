import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(request: NextRequest) {
  try {
    // Get session
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Validate session
    const { data: session } = await supabase
      .from('sessions')
      .select('user_id')
      .eq('token', sessionToken)
      .single();

    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    // Get file path from query params
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    const type = searchParams.get('type'); // 'abstract' or 'payment'

    if (!filePath) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    // Verify user owns this file by checking registration
    const { data: registration } = await supabase
      .from('registrations')
      .select('id')
      .eq('user_id', session.user_id)
      .or(`abstract_file_path.eq.${filePath},payment_screenshot_path.eq.${filePath}`)
      .single();

    if (!registration) {
      return NextResponse.json({ error: 'File not found or access denied' }, { status: 403 });
    }

    // Get file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('cima26-abstracts')
      .download(filePath);

    if (downloadError || !fileData) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Determine content type and filename
    const fileName = filePath.split('/').pop() || 'download';
    const contentType = fileData.type || 'application/octet-stream';
    
    // Create response with file
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    
    return new NextResponse(fileData, { headers });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}