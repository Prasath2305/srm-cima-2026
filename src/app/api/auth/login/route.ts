// import { NextRequest, NextResponse } from 'next/server';
// import { supabaseAdmin } from '@/lib/db';
// import { verifyPassword, createSession, getRegistrationStatus } from '@/lib/auth';

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();
    
//     if (!email || !password) {
//       return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
//     }
    
//     // Get user
//     const { data: user } = await supabaseAdmin
//       .from('users')
//       .select('*')
//       .eq('email', email.toLowerCase())
//       .single();
      
//     if (!user) {
//       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//     }
    
//     // Verify password
//     const valid = await verifyPassword(password, user.password_hash);
//     if (!valid) {
//       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//     }
    
//     // Check registration status
//     const registration = await getRegistrationStatus(user.email);
    
//     // Create session
//     await createSession(user.id);
    
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.full_name,
//       },
//       registrationStatus: registration ? {
//         submitted: true,
//         status: registration.status,
//         date: registration.created_at,
//       } : {
//         submitted: false,
//       },
//     });
    
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }








import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    console.log('Login attempt:', email); // Debug log
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' }, 
        { status: 400 }
      );
    }
    
    // Get user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
      
    if (userError || !user) {
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
    
    // Create session with explicit cookie settings for Vercel
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    const { error: sessionError } = await supabaseAdmin
      .from('sessions')
      .insert({ 
        user_id: user.id, 
        token, 
        expires_at: expiresAt.toISOString() 
      });
      
    if (sessionError) {
      console.error('Session creation error:', sessionError);
      throw sessionError;
    }
    
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
      sameSite: 'lax', // Changed from strict for better compatibility
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
  }
}