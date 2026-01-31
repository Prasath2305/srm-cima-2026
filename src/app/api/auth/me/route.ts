import { NextResponse } from 'next/server';
import { validateSession, getRegistrationStatus } from '@/lib/auth';

export async function GET() {
  const user = await validateSession();
  
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  const registration = await getRegistrationStatus(user.email);
  
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.full_name,
    },
    registrationStatus: registration ? {
      submitted: true,
      status: registration.status,
    } : {
      submitted: false,
    },
  });
}