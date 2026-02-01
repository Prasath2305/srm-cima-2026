// import { cookies } from 'next/headers';
// import { supabaseAdmin } from './db';
// import bcrypt from 'bcryptjs';
// import { randomUUID } from 'crypto';

// const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// export async function hashPassword(password: string): Promise<string> {
//   return bcrypt.hash(password, 12);
// }

// export async function verifyPassword(password: string, hash: string): Promise<boolean> {
//   return bcrypt.compare(password, hash);
// }

// export function generateToken(): string {
//   return randomUUID();
// }

// export async function createSession(userId: string) {
//   const token = generateToken();
//   const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
//   const { error } = await supabaseAdmin
//     .from('sessions')
//     .insert({ user_id: userId, token, expires_at: expiresAt.toISOString() });
    
//   if (error) throw error;
  
//   // Set HTTP-only cookie
//   const cookieStore = await cookies();
//   cookieStore.set('session_token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: SESSION_DURATION / 1000,
//     path: '/',
//   });
  
//   return token;
// }

// export async function validateSession() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('session_token')?.value;
  
//   if (!token) return null;
  
//   const { data: session, error } = await supabaseAdmin
//     .from('sessions')
//     .select('*, users(*)')
//     .eq('token', token)
//     .gt('expires_at', new Date().toISOString())
//     .single();
    
//   if (error || !session) {
//     cookieStore.delete('session_token');
//     return null;
//   }
  
//   return session.users;
// }

// export async function destroySession() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('session_token')?.value;
  
//   if (token) {
//     await supabaseAdmin.from('sessions').delete().eq('token', token);
//   }
  
//   cookieStore.delete('session_token');
// }

// export async function getRegistrationStatus(email: string) {
//   const { data: registration } = await supabaseAdmin
//     .from('registrations')
//     .select('status, created_at')
//     .eq('author_email', email)
//     .order('created_at', { ascending: false })
//     .limit(1)
//     .single();
    
//   return registration;
// }














import { cookies } from 'next/headers';
import { supabaseAdmin } from './db';
import bcrypt from 'bcryptjs';
import { randomBytes, randomUUID } from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate secure random token
export function generateToken(): string {
  // Use randomUUID for session tokens (or randomBytes for custom format)
  return randomUUID();
}

export async function createSession(userId: string) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const { error } = await supabaseAdmin
    .from('sessions')
    .insert({ 
      user_id: userId, 
      token, 
      expires_at: expiresAt.toISOString() 
    });
    
  if (error) throw error;
  
  const cookieStore = await cookies();
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  
  return token;
}

export async function validateSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  if (!token) return null;
  
  const { data: session } = await supabaseAdmin
    .from('sessions')
    .select('*, users(*)')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single();
    
  if (!session) {
    cookieStore.delete('session_token');
    return null;
  }
  
  return session.users;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  if (token) {
    await supabaseAdmin.from('sessions').delete().eq('token', token);
  }
  
  cookieStore.delete('session_token');
}

// Alternative: Generate URL-safe token for password reset
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}