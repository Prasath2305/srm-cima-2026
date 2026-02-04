import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  let connection;
  
  try {
    const { token, password } = await req.json();
    
    if (!token || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password too short' }, { status: 400 });
    }
    
    // Get connection
    connection = await pool.getConnection();
    
    // Get valid token with user data
    const [resetRows] = await connection.execute(
      `SELECT 
        pr.id, pr.user_id, pr.used, pr.expires_at,
        u.id as user_id_check
       FROM password_resets pr
       JOIN users u ON pr.user_id = u.id
       WHERE pr.token = ? 
       AND pr.used = 0 
       AND pr.expires_at > NOW()`,
      [token]
    );
    
    const resetData = (resetRows as any[])[0];
    
    if (!resetData) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
    
    // Update password
    const passwordHash = await hashPassword(password);
    await connection.execute(
      'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?',
      [passwordHash, resetData.user_id]
    );
    
    // Mark token as used
    await connection.execute(
      'UPDATE password_resets SET used = 1 WHERE id = ?',
      [resetData.id]
    );
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
