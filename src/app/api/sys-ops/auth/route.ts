import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const ADMIN_TOKEN = 'admin_session_token';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Validate against env vars
    if (email !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASS) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    // Create admin session
    const token = randomUUID();
    const cookieStore = await cookies();
    
    cookieStore.set(ADMIN_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/',
    });

    return NextResponse.json({ 
      success: true,
      admin: { email: process.env.ADMIN_ID }
    });

  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' }, 
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN);
  return NextResponse.json({ success: true });
}

// Verify admin helper
export async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN)?.value;
  return !!token; // In production, you might want to validate against a stored session
}
