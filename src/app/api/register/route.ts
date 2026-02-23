import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import { validateSession } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  let connection;
  
  try {
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

    const abstractFile = formData.get('abstractFile') as File;
    const paymentScreenshot = formData.get('paymentScreenshot') as File;
    
    const data: any = {
      user_id: user.id,
      author_email: user.email,
      author_whatsapp: formData.get('author_whatsapp') as string,
      article_title: formData.get('article_title') as string,
      transaction_id: formData.get('transaction_id') as string,
      payment_date: formData.get('payment_date') as string,
      status: 'pending'
    };

    const authorData: any = {};

    for (let i = 1; i <= 6; i++) {
      const name = formData.get(`author${i}_name`) as string;

      if (name && name.trim()) {
        authorData[`author${i}_salutation`] =
          (formData.get(`author${i}_salutation`) as string) || '';

        authorData[`author${i}_name`] = name;

        authorData[`author${i}_affiliation`] =
          (formData.get(`author${i}_affiliation`) as string) || '';

        authorData[`author${i}_institution`] =
          (formData.get(`author${i}_institution`) as string) || '';
      }
    }

    if (!abstractFile || !paymentScreenshot) {
      return NextResponse.json(
        { error: 'Missing required files' },
        { status: 400 }
      );
    }

    if (!authorData.author1_name || !data.article_title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!authorData.author1_salutation || !authorData.author1_affiliation) {
      return NextResponse.json(
        { error: 'Primary author salutation and affiliation are required' },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const filesDir = path.join(uploadsDir, 'files');
    await fs.mkdir(filesDir, { recursive: true });

    let abstractFilePath = '';

    const abstractsDir = path.join(filesDir, 'abstracts');
    const paymentsDir = path.join(filesDir, 'payments');

    await fs.mkdir(abstractsDir, { recursive: true });
    await fs.mkdir(paymentsDir, { recursive: true });

    if (abstractFile) {
      const fileExt = abstractFile.name.split('.').pop();
      const fileName = `${Date.now()}_${user.id}.${fileExt}`;
      const filePath = path.join(abstractsDir, fileName);

      const arrayBuffer = await abstractFile.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));

      abstractFilePath = `uploads/files/abstracts/${fileName}`;
    }

    let paymentScreenshotPath = '';

    if (paymentScreenshot) {
      const fileExt = paymentScreenshot.name.split('.').pop();
      const fileName = `${Date.now()}_payment_${user.id}.${fileExt}`;
      const filePath = path.join(paymentsDir, fileName);

      const arrayBuffer = await paymentScreenshot.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));

      paymentScreenshotPath = `uploads/files/payments/${fileName}`;
    }

    const baseFields = [
      'id',
      'user_id',
      'author_email',
      'author_whatsapp',
      'article_title',
      'transaction_id',
      'payment_date',
      'abstract_file_path',
      'payment_screenshot_path',
      'status'
    ];

    const baseValues = [
      user.id,
      data.author_email,
      data.author_whatsapp,
      data.article_title,
      data.transaction_id,
      data.payment_date,
      abstractFilePath,
      paymentScreenshotPath,
      'pending'
    ];

    const authorFields: string[] = [];
    const authorValues: any[] = [];

    for (let i = 1; i <= 6; i++) {
      if (authorData[`author${i}_name`]) {
        authorFields.push(
          `author${i}_salutation`,
          `author${i}_name`,
          `author${i}_affiliation`,
          `author${i}_institution`
        );

        authorValues.push(
          authorData[`author${i}_salutation`],
          authorData[`author${i}_name`],
          authorData[`author${i}_affiliation`],
          authorData[`author${i}_institution`]
        );
      }
    }

    const allFields = [...baseFields, ...authorFields];
    const allValues = [...baseValues, ...authorValues];

    const placeholders = allFields.map((_, i) => (i === 0 ? 'UUID()' : '?'));

    const insertQuery = `
      INSERT INTO registrations (${allFields.join(', ')})
      VALUES (${placeholders.join(', ')})
    `;

    await connection.execute(insertQuery, allValues);

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
      registration
    });

  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });

  } finally {
    if (connection) connection.release();
  }
}
