import { cookies } from 'next/headers';
import { pool } from './db';  // Your MySQL pool
import bcrypt from 'bcryptjs';
import { randomBytes, randomUUID } from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate secure random token
export function generateToken(): string {
  return randomUUID();
}

// Create session in database AND set cookie
export async function createSession(userId: string): Promise<string> {
  let connection;
  
  try {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    // Insert session
    connection = await pool.getConnection();
    await connection.execute(
      `INSERT INTO sessions (id, user_id, token, expires_at) 
       VALUES (UUID(), ?, ?, ?)`,
      [userId, token, expiresAt]
    );
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    
    return token;
    
  } finally {
    if (connection) connection.release();
  }
}

// Validate session - returns user object or null
export async function validateSession() {
  let connection;
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    
    if (!token) return null;
    
    // Validate session and get user
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT 
        u.id, u.email, u.full_name, u.email_verified
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ? AND s.expires_at > NOW()`,
      [token]
    );
    
    const session = (rows as any[])[0];
    
    if (!session) {
      // Delete invalid cookie
      const cookieStore = await cookies();
      cookieStore.delete('session_token');
      return null;
    }
    
    return {
      id: session.id,
      email: session.email,
      full_name: session.full_name,
      email_verified: session.email_verified
    };
    
  } finally {
    if (connection) connection.release();
  }
}

// Destroy session
export async function destroySession() {
  let connection;
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    
    if (token) {
      // Delete session from DB
      connection = await pool.getConnection();
      await connection.execute(
        'DELETE FROM sessions WHERE token = ?',
        [token]
      );
    }
    
    // Delete cookie
    cookieStore.delete('session_token');
    
  } finally {
    if (connection) connection.release();
  }
}

// Alternative: Generate URL-safe token for password reset
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}
