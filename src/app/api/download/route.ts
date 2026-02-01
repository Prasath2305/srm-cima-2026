// import { createClient } from '@supabase/supabase-js';
// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );

// export async function GET(request: NextRequest) {
//   try {
//     // Get session
//     const cookieStore = await cookies();
//     const sessionToken = cookieStore.get('session_token')?.value;
    
//     if (!sessionToken) {
//       return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
//     }

//     // Validate session
//     const { data: session } = await supabase
//       .from('sessions')
//       .select('user_id')
//       .eq('token', sessionToken)
//       .single();

//     if (!session) {
//       return NextResponse.json({ error: 'Session expired' }, { status: 401 });
//     }

//     // Get file path from query params
//     const { searchParams } = new URL(request.url);
//     const filePath = searchParams.get('path');
//     const type = searchParams.get('type'); // 'abstract' or 'payment'

//     if (!filePath) {
//       return NextResponse.json({ error: 'File path required' }, { status: 400 });
//     }

//     // Verify user owns this file by checking registration
//     const { data: registration } = await supabase
//       .from('registrations')
//       .select('id')
//       .eq('user_id', session.user_id)
//       .or(`abstract_file_path.eq.${filePath},payment_screenshot_path.eq.${filePath}`)
//       .single();

//     if (!registration) {
//       return NextResponse.json({ error: 'File not found or access denied' }, { status: 403 });
//     }

//     // Get file from Supabase Storage
//     const { data: fileData, error: downloadError } = await supabase
//       .storage
//       .from('cima26-abstracts')
//       .download(filePath);

//     if (downloadError || !fileData) {
//       return NextResponse.json({ error: 'File not found' }, { status: 404 });
//     }

//     // Determine content type and filename
//     const fileName = filePath.split('/').pop() || 'download';
//     const contentType = fileData.type || 'application/octet-stream';
    
//     // Create response with file
//     const headers = new Headers();
//     headers.set('Content-Type', contentType);
//     headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    
//     return new NextResponse(fileData, { headers });

//   } catch (error) {
//     console.error('Download error:', error);
//     return NextResponse.json({ error: 'Download failed' }, { status: 500 });
//   }
// }









import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAdmin } from '../sys-ops/auth/route';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET(req: NextRequest) {
  try {
    // Check admin auth
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    let query = supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(
        `author1_name.ilike.%${search}%,author_email.ilike.%${search}%,article_title.ilike.%${search}%`
      );
    }

    const { data: registrations, error } = await query;

    if (error) throw error;

    // Get stats
    const { data: stats } = await supabase
      .from('registrations')
      .select('status');

    const statsData = {
      total: stats?.length || 0,
      pending: stats?.filter(r => r.status === 'pending').length || 0,
      approved: stats?.filter(r => r.status === 'approved').length || 0,
      rejected: stats?.filter(r => r.status === 'rejected').length || 0,
      under_review: stats?.filter(r => r.status === 'under_review').length || 0,
    };

    return NextResponse.json({
      registrations: registrations || [],
      stats: statsData
    });

  } catch (error: any) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch data' }, 
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status, admin_comments } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (admin_comments !== undefined) {
      updateData.admin_comments = admin_comments;
    }

    const { data, error } = await supabase
      .from('registrations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      registration: data 
    });

  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error.message || 'Update failed' }, 
      { status: 500 }
    );
  }
}