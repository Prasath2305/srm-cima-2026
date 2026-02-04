import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import { validateSession } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  let connection;
  
  try {
    // Auth check
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await validateSession();
    if (!user) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'Path required' }, { status: 400 });
    }

    // Get connection
    connection = await pool.getConnection();
    
    // Verify ownership - user can only view their own files
    const [rows] = await connection.execute(
      `SELECT id FROM registrations 
       WHERE user_id = ? 
       AND (
         abstract_file_path = ? OR 
         payment_screenshot_path = ? OR 
         full_paper_path = ?
       )`,
      [user.id, filePath, filePath, filePath]
    );

    const registration = (rows as any[])[0];

    if (!registration) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Construct full file path
    const fullFilePath = path.join(process.cwd(), 'public', filePath);
    
    // Security: Ensure path is within uploads directory
    if (!fullFilePath.startsWith(path.join(process.cwd(), 'public/uploads'))) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Check if file exists
    try {
      await fs.access(fullFilePath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read file
    const fileBuffer = await fs.readFile(fullFilePath);
    
    // Determine content type
    const ext = path.extname(filePath).toLowerCase();
    const contentTypeMap: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    
    const contentType = contentTypeMap[ext] || 'application/octet-stream';
    const fileName = path.basename(filePath);
    
    // Create response headers
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `inline; filename="${fileName}"`);
    headers.set('Cache-Control', 'public, max-age=3600');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Content-Length', fileBuffer.length.toString());

    return new NextResponse(fileBuffer, { headers });

  } catch (error: any) {
    console.error('View error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
