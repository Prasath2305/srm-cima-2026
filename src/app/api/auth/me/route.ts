// import { NextResponse } from 'next/server';
// import { validateSession, getRegistrationStatus } from '@/lib/auth';

// export async function GET() {
//   const user = await validateSession();
  
//   if (!user) {
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
//   }
  
//   const registration = await getRegistrationStatus(user.email);
  
//   return NextResponse.json({
//     user: {
//       id: user.id,
//       email: user.email,
//       name: user.full_name,
//     },
//     registrationStatus: registration ? {
//       submitted: true,
//       status: registration.status,
//     } : {
//       submitted: false,
//     },
//   });
// }













import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' }, 
        { status: 401 }
      );
    }
    
    // Get session
    const { data: session } = await supabaseAdmin
      .from('sessions')
      .select('*, users(*)')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session expired' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: session.users.id,
        email: session.users.email,
        name: session.users.full_name,
      }
    });
    
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Server error' }, 
      { status: 500 }
    );
  }
}