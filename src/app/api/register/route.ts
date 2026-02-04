import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import { validateSession } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  let connection;
  
  try {
    // Check authentication
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Please login first' },
        { status: 401 }
      );
    }

    const user = await validateSession();
    if (!user) {
      return NextResponse.json(
        { error: 'Session expired. Please login again' },
        { status: 401 }
      );
    }

    // Check if user already has a registration
    connection = await pool.getConnection();
    const [existingRows] = await connection.execute(
      'SELECT id, status FROM registrations WHERE user_id = ?',
      [user.id]
    );
    
    const existingReg = (existingRows as any[])[0];
    if (existingReg) {
      return NextResponse.json(
        { error: 'You have already submitted a registration', status: existingReg.status },
        { status: 409 }
      );
    }

    const formData = await request.formData();

    // Extract files
    const abstractFile = formData.get('abstractFile') as File;
    const paymentScreenshot = formData.get('paymentScreenshot') as File;
    
    // Extract form fields
    const data: any = {
      user_id: user.id,
      author_email: user.email,
      author_whatsapp: formData.get('author_whatsapp') as string,
      article_title: formData.get('article_title') as string,
      participant_type: formData.get('participant_type') as string,
      transaction_id: formData.get('transaction_id') as string,
      payment_date: formData.get('payment_date') as string,
      status: 'pending'
    };

    // Process authors
    for (let i = 1; i <= 6; i++) {
      const name = formData.get(`author${i}_name`) as string;
      if (name && name.trim()) {
        data[`author${i}_designation`] = formData.get(`author${i}_designation`) as string || '';
        data[`author${i}_name`] = name;
        data[`author${i}_institution`] = formData.get(`author${i}_institution`) as string || '';
      }
    }

    // Validate required fields
    if (!abstractFile || !paymentScreenshot) {
      return NextResponse.json(
        { error: 'Missing required files' },
        { status: 400 }
      );
    }

    if (!data.author1_name || !data.article_title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    
    const filesDir = path.join(uploadsDir, 'files');
    await fs.mkdir(filesDir, { recursive: true });

    // Save abstract file
    let abstractFilePath = '';
    if (abstractFile) {
      const fileExt = abstractFile.name.split('.').pop();
      const fileName = `abstracts/${Date.now()}_${user.id}.${fileExt}`;
      const filePath = path.join(filesDir, fileName);
      
      const arrayBuffer = await abstractFile.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));
      abstractFilePath = `uploads/files/${fileName}`;
    }

    // Save payment screenshot
    let paymentScreenshotPath = '';
    if (paymentScreenshot) {
      const fileExt = paymentScreenshot.name.split('.').pop();
      const fileName = `payments/${Date.now()}_payment_${user.id}.${fileExt}`;
      const filePath = path.join(filesDir, fileName);
      
      const arrayBuffer = await paymentScreenshot.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));
      paymentScreenshotPath = `uploads/files/${fileName}`;
    }

    // Insert into database
    const authorFields = [];
    const authorValues = [];
    
    for (let i = 1; i <= 6; i++) {
      if (data[`author${i}_name`]) {
        authorFields.push(`author${i}_designation, author${i}_name, author${i}_institution`);
        authorValues.push(
          data[`author${i}_designation`],
          data[`author${i}_name`],
          data[`author${i}_institution`]
        );
      }
    }

    const insertQuery = `
      INSERT INTO registrations (
        id, user_id, author_email, author_whatsapp, article_title, participant_type, 
        transaction_id, payment_date, abstract_file_path, payment_screenshot_path, status,
        ${authorFields.join(', ')}
      ) VALUES (
        UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ${authorValues.map(() => '?').join(', ')}
      )
    `;
    
    const insertParams = [
      user.id, data.author_email, data.author_whatsapp, data.article_title,
      data.participant_type, data.transaction_id, data.payment_date,
      abstractFilePath, paymentScreenshotPath, ...authorValues
    ];

    const [result] = await connection.execute(insertQuery, insertParams);

    // Get created registration with paper_id
    const [newRegRows] = await connection.execute(
      'SELECT * FROM registrations WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [user.id]
    );
    
    const newReg = (newRegRows as any[])[0];

    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration submitted successfully',
        data: newReg
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

export async function GET() {
  let connection;
  
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await validateSession();
    if (!user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM registrations WHERE user_id = ?',
      [user.id]
    );

    const registration = (rows as any[])[0];

    return NextResponse.json({ 
      hasRegistration: !!registration,
      registration: registration 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
