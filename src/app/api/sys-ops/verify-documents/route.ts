import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAdmin } from '../auth/route';

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
    // Verify admin authentication
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get file path from query params
    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    // Get file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('cima26-abstracts')
      .download(filePath);

    if (downloadError || !fileData) {
      console.error('Storage error:', downloadError);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Extract filename and determine content type
    const fileName = filePath.split('/').pop() || 'document';
    const contentType = fileData.type || 'application/octet-stream';
    
    // Create response with inline disposition to display in browser
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    
    // KEY: Use 'inline' instead of 'attachment' to show in browser
    headers.set('Content-Disposition', `inline; filename="${fileName}"`);
    
    // Security headers
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    return new NextResponse(fileData, { headers });

  } catch (error: any) {
    console.error('View document error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to load document' }, 
      { status: 500 }
    );
  }
}