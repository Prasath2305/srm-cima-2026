import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    
    if (!token || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password too short' }, { status: 400 });
    }
    
    // Get valid token
    const { data: resetData } = await supabaseAdmin
      .from('password_resets')
      .select('*, users(*)')
      .eq('token', token)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();
      
    if (!resetData) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
    
    // Update password
    const passwordHash = await hashPassword(password);
    await supabaseAdmin
      .from('users')
      .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
      .eq('id', resetData.user_id);
    
    // Mark token as used
    await supabaseAdmin
      .from('password_resets')
      .update({ used: true })
      .eq('id', resetData.id);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}