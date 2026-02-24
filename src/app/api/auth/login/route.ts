import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  let connection;

  try {
    const { email } = await req.json();

    console.log('Login attempt:', email);

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get connection
    connection = await pool.getConnection();

    // Get user by email only
    const [userRows] = await connection.execute(
      'SELECT id, email, full_name FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    const user = (userRows as any[])[0];

    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json(
        { error: 'No account found with this email. Please sign up first.' },
        { status: 401 }
      );
    }

    // Create session
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await connection.execute(
      `INSERT INTO sessions (id, user_id, token, expires_at)
       VALUES (UUID(), ?, ?, ?)`,
      [user.id, token, expiresAt]
    );

    // Check registration status
    const [regRows] = await connection.execute(
      'SELECT id, status FROM registrations WHERE user_id = ? LIMIT 1',
      [user.id]
    );
    const registration = (regRows as any[])[0];

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
      },
      registrationStatus: {
        submitted: !!registration,
        status: registration?.status || null,
      }
    });

    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('Login successful:', email);
    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
