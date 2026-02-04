import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';  // Import shared pool
import { verifyPassword } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  let connection;
  
  try {
    const { email, password } = await req.json();
    
    console.log('Login attempt:', email);
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' }, 
        { status: 400 }
      );
    }
    
    // Get connection
    connection = await pool.getConnection();
    
    // Get user
    const [userRows] = await connection.execute(
      'SELECT id, email, password_hash, full_name FROM users WHERE email = ?',
      [email.toLowerCase()]
    );
    
    const user = (userRows as any[])[0];
    
    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' }, 
        { status: 401 }
      );
    }
    
    // Verify password
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      console.log('Invalid password for:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' }, 
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
    
    // Set cookie - critical for Vercel
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
      }
    });
    
    // Set cookie on the response
    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: true, // Must be true for Vercel (HTTPS)
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
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
