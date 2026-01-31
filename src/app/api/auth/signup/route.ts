import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json();
    
    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    
    // Check if user exists
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();
      
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    
    // Create user
    const passwordHash = await hashPassword(password);
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        full_name: fullName,
      })
      .select()
      .single();
      
    if (error || !user) {
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
    }
    
    // // Create session
    // await createSession(user.id);
    
    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email, name: user.full_name } 
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}