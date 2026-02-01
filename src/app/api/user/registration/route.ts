import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: session } = await supabase
      .from('sessions')
      .select('user_id')
      .eq('token', sessionToken)
      .single();

    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const { data: registration } = await supabase
      .from('registrations')
      .select('*')
      .eq('user_id', session.user_id)
      .single();

    if (!registration) {
      return NextResponse.json({ error: 'No registration found' }, { status: 404 });
    }

    return NextResponse.json({ registration });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}