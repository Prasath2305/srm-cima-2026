import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import { validateSession } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  let connection;
  
  try {
    // Verify user session
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await validateSession();
    if (!user) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    // Get connection
    connection = await pool.getConnection();
    
    // Get user's registration
    const [regRows] = await connection.execute(
      'SELECT id, status, user_id, full_paper_path FROM registrations WHERE user_id = ?',
      [user.id]
    );
    
    const registration = (regRows as any[])[0];
    
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

    // Validate PDF
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files allowed' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    const fullPapersDir = path.join(uploadsDir, 'fullpapers');
    await fs.mkdir(fullPapersDir, { recursive: true });

    // Generate path
    const fileName = `${Date.now()}_fullpaper_${registration.id}.pdf`;
    const filePath = path.join(fullPapersDir, fileName);
    const publicPath = `uploads/fullpapers/${fileName}`;

    // Delete old file if exists
    if (registration.full_paper_path) {
      const oldFilePath = path.join(process.cwd(), 'public', registration.full_paper_path);
      try {
        await fs.unlink(oldFilePath);
      } catch (e) {
        console.log('Old file not found, continuing...');
      }
    }

    // Save new file
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    // Update database
    await connection.execute(
      'UPDATE registrations SET full_paper_path = ?, updated_at = NOW() WHERE id = ?',
      [publicPath, registration.id]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Full paper uploaded successfully',
      filePath: publicPath 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' }, 
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
