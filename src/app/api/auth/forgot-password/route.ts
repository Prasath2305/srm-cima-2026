// import { NextRequest, NextResponse } from 'next/server';
// import { supabaseAdmin } from '@/lib/db';
// import { generateToken } from '@/lib/auth';
// import { sendPasswordResetEmail } from '@/lib/mail';

// export async function POST(req: NextRequest) {
//   try {
//     const { email } = await req.json();
//     const host = req.headers.get('host') || 'localhost:3000';
    
//     if (!email) {
//       return NextResponse.json({ error: 'Email required' }, { status: 400 });
//     }
    
//     // Get user
//     const { data: user } = await supabaseAdmin
//       .from('users')
//       .select('id, email')
//       .eq('email', email.toLowerCase())
//       .single();
      
//     // Don't reveal if user exists for security, but only send if found
//     if (user) {
//       // Invalidate old tokens
//       await supabaseAdmin
//         .from('password_resets')
//         .update({ used: true })
//         .eq('user_id', user.id)
//         .eq('used', false);
      
//       // Create new token
//       const token = generateToken();
//       const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      
//       await supabaseAdmin
//         .from('password_resets')
//         .insert({
//           user_id: user.id,
//           token,
//           expires_at: expiresAt.toISOString(),
//         });
      
//       // Send email
//       await sendPasswordResetEmail(user.email, token, host);
//     }
    
//     // Always return success to prevent email enumeration
//     return NextResponse.json({ 
//       success: true, 
//       message: 'If an account exists, a reset link has been sent' 
//     });
    
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }







import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    // Get user
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single();
      
    // Don't reveal if user exists for security, but only send if found
    if (user) {
      // Invalidate old tokens
      await supabaseAdmin
        .from('password_resets')
        .update({ used: true })
        .eq('user_id', user.id)
        .eq('used', false);
      
      // Create new token
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      
      await supabaseAdmin
        .from('password_resets')
        .insert({
          user_id: user.id,
          token,
          expires_at: expiresAt.toISOString(),
        });
      
      // Send email
      await sendPasswordResetEmail(user.email, token);
    }
    
    // Always return success to prevent email enumeration
    return NextResponse.json({ 
      success: true, 
      message: 'If an account exists, a reset link has been sent' 
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
