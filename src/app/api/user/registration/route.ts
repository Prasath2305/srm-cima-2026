import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import { validateSession } from '@/lib/auth';

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

    // Get connection
    connection = await pool.getConnection();
    
    // Get user's registration
    const [rows] = await connection.execute(
      `SELECT 
        r.*,
        r.paper_id
       FROM registrations r
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC
       LIMIT 1`,
      [user.id]
    );

    const registration = (rows as any[])[0];

    if (!registration) {
      return NextResponse.json({ error: 'No registration found' }, { status: 404 });
    }

    return NextResponse.json({ registration });

  } catch (error: any) {
    console.error('Get registration error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
