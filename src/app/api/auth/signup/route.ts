import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import mysql from 'mysql2/promise';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  let connection: mysql.PoolConnection | null = null;

  try {
    const { email, fullName } = await req.json();

    console.log('Signup attempt:', email);

    // Validation
    if (!email || !fullName) {
      return NextResponse.json(
        { error: 'Email and full name are required' },
        { status: 400 }
      );
    }

    // Get connection
    connection = await pool.getConnection();

    // Check if user exists
    const [existingRows] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    const existing = (existingRows as any[])[0];

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered. Please login.' },
        { status: 409 }
      );
    }

    // Create user without password
    await connection.execute(
      `INSERT INTO users (id, email, full_name)
       VALUES (UUID(), ?, ?)`,
      [email.toLowerCase(), fullName]
    );

    // Get created user
    const [userRows] = await connection.execute(
      'SELECT id, email FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    const user = (userRows as any[])[0];
    console.log('User created:', user.id);

    // Auto-create session so user can proceed to register
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await connection.execute(
      `INSERT INTO sessions (id, user_id, token, expires_at)
       VALUES (UUID(), ?, ?, ?)`,
      [user.id, token, expiresAt]
    );

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: { id: user.id, email: user.email }
    });

    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
