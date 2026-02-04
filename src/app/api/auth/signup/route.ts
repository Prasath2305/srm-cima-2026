import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  let connection: mysql.PoolConnection | null = null;
  
  try {
    const { email, password, fullName } = await req.json();
    
    console.log('Signup attempt:', email);
    
    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'All fields are required' }, 
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' }, 
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
    
    // Create user
    const passwordHash = await hashPassword(password);
    
    const [insertResult] = await connection.execute(
      `INSERT INTO users (id, email, password_hash, full_name) 
       VALUES (UUID(), ?, ?, ?)`,
      [email.toLowerCase(), passwordHash, fullName]
    ) as mysql.ResultSetHeader[];
    
    // Get created user using LAST_INSERT_ID() since our ID is UUID
    const [userRows] = await connection.execute(
      'SELECT id, email FROM users WHERE email = ?',
      [email.toLowerCase()]
    );
    
    const user = (userRows as any[])[0];
    
    console.log('User created:', user.id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully',
      user: { id: user.id, email: user.email }
    });
    
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
