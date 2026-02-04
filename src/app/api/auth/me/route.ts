import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';

export async function GET() {
  let connection;
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' }, 
        { status: 401 }
      );
    }
    
    // Get connection
    connection = await pool.getConnection();
    
    // Get session with user data - single query for performance
    const [rows] = await connection.execute(
      `SELECT 
        s.id as session_id,
        s.user_id,
        s.expires_at,
        u.id as user_id,
        u.email,
        u.full_name,
        u.email_verified
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ? 
      AND s.expires_at > NOW()`,
      [token]
    );
    
    const session = (rows as any[])[0];
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session expired' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: session.user_id,
        email: session.email,
        name: session.full_name,
        emailVerified: session.email_verified
      }
    });
    
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Server error' }, 
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
