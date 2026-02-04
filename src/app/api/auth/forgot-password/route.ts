import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';  // Import shared pool
import { generateToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  let connection;
  
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    connection = await pool.getConnection();

    // Get user
    const [userRows] = await connection.execute(
      'SELECT id, email FROM users WHERE email = ?',
      [email.toLowerCase()]
    );
    
    const user = (userRows as any[])[0];

    if (user) {
      // Invalidate old tokens
      await connection.execute(
        'UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0',
        [user.id]
      );
      
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      
      await connection.execute(
        `INSERT INTO password_resets (id, user_id, token, expires_at) 
         VALUES (UUID(), ?, ?, ?)`,
        [user.id, token, expiresAt]
      );
      
      sendPasswordResetEmail(user.email, token).catch(console.error);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'If an account exists, a reset link has been sent' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
