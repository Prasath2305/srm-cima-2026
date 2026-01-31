// // app/api/register/route.ts
// import { createClient } from '@supabase/supabase-js';
// import { NextRequest, NextResponse } from 'next/server';

// // Server-side Supabase client with service role (never expose this key to client)
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role key for server
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();

//     // Extract files
//     const abstractFile = formData.get('abstractFile') as File;
//     const paymentScreenshot = formData.get('paymentScreenshot') as File;
    
//     // Extract form fields
//     const data = {
//       author1_designation: formData.get('author1_designation') as string,
//       author1_name: formData.get('author1_name') as string,
//       author1_institution: formData.get('author1_institution') as string,
//       author2_designation: formData.get('author2_designation') as string || null,
//       author2_name: formData.get('author2_name') as string || null,
//       author2_institution: formData.get('author2_institution') as string || null,
//       author3_designation: formData.get('author3_designation') as string || null,
//       author3_name: formData.get('author3_name') as string || null,
//       author3_institution: formData.get('author3_institution') as string || null,
//       author4_designation: formData.get('author4_designation') as string || null,
//       author4_name: formData.get('author4_name') as string || null,
//       author4_institution: formData.get('author4_institution') as string || null,
//       author5_designation: formData.get('author5_designation') as string || null,
//       author5_name: formData.get('author5_name') as string || null,
//       author5_institution: formData.get('author5_institution') as string || null,
//       author6_designation: formData.get('author6_designation') as string || null,
//       author6_name: formData.get('author6_name') as string || null,
//       author6_institution: formData.get('author6_institution') as string || null,
//       author_email: formData.get('author_email') as string,
//       author_whatsapp: formData.get('author_whatsapp') as string,
//       article_title: formData.get('article_title') as string,
//       participant_type: formData.get('participant_type') as string,
//       transaction_id: formData.get('transaction_id') as string,
//       payment_date: formData.get('payment_date') as string,
//     };

//     // Validate required fields
//     if (!abstractFile || !paymentScreenshot) {
//       return NextResponse.json(
//         { error: 'Missing required files' },
//         { status: 400 }
//       );
//     }

//     if (!data.author1_name || !data.author_email || !data.article_title) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     let abstractFilePath = '';
//     let paymentScreenshotPath = '';

//     // Upload abstract file
//     if (abstractFile) {
//       const fileExt = abstractFile.name.split('.').pop();
//       const fileName = `${Date.now()}_${data.author_email.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`;
//       const filePath = `abstracts/${fileName}`;

//       const arrayBuffer = await abstractFile.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const { error: uploadError } = await supabase.storage
//         .from('cima26-abstracts')
//         .upload(filePath, buffer, {
//           contentType: abstractFile.type,
//           cacheControl: '3600',
//           upsert: false,
//         });

//       if (uploadError) {
//         console.error('Abstract upload error:', uploadError);
//         return NextResponse.json(
//           { error: `Abstract upload failed: ${uploadError.message}` },
//           { status: 500 }
//         );
//       }

//       abstractFilePath = filePath;
//     }

//     // Upload payment screenshot
//     if (paymentScreenshot) {
//       const fileExt = paymentScreenshot.name.split('.').pop();
//       const fileName = `${Date.now()}_payment_${data.author_email.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`;
//       const filePath = `payment-screenshots/${fileName}`;

//       const arrayBuffer = await paymentScreenshot.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const { error: uploadError } = await supabase.storage
//         .from('cima26-abstracts')
//         .upload(filePath, buffer, {
//           contentType: paymentScreenshot.type,
//           cacheControl: '3600',
//           upsert: false,
//         });

//       if (uploadError) {
//         console.error('Payment screenshot upload error:', uploadError);
//         return NextResponse.json(
//           { error: `Payment screenshot upload failed: ${uploadError.message}` },
//           { status: 500 }
//         );
//       }

//       paymentScreenshotPath = filePath;
//     }

//     // Insert into database
//     const { data: insertData, error: insertError } = await supabase
//       .from('registrations')
//       .insert([
//         {
//           ...data,
//           abstract_file_path: abstractFilePath,
//           payment_screenshot_path: paymentScreenshotPath,
//           created_at: new Date().toISOString(),
//         },
//       ])
//       .select();

//     if (insertError) {
//       console.error('Database insert error:', insertError);
//       return NextResponse.json(
//         { error: `Database insert failed: ${insertError.message}` },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { 
//         success: true, 
//         message: 'Registration submitted successfully',
//         data: insertData[0]
//       },
//       { status: 200 }
//     );

//   } catch (error: any) {
//     console.error('Registration error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Registration failed' },
//       { status: 500 }
//     );
//   }
// }















import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Server-side Supabase client with service role
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

// Helper to validate session
async function validateSession(token: string) {
  const { data: session } = await supabase
    .from('sessions')
    .select('*, users(*)')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single();
  
  return session?.users || null;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Please login first' },
        { status: 401 }
      );
    }

    const user = await validateSession(sessionToken);
    if (!user) {
      return NextResponse.json(
        { error: 'Session expired. Please login again' },
        { status: 401 }
      );
    }

    // Check if user already has a registration
    const { data: existingReg } = await supabase
      .from('registrations')
      .select('id, status')
      .eq('user_id', user.id)
      .single();

    if (existingReg) {
      return NextResponse.json(
        { error: 'You have already submitted a registration', status: existingReg.status },
        { status: 409 }
      );
    }

    const formData = await request.formData();

    // Extract files
    const abstractFile = formData.get('abstractFile') as File;
    const paymentScreenshot = formData.get('paymentScreenshot') as File;
    
    // Extract form fields - only include authors with names
    const data: any = {
      user_id: user.id,
      author_email: user.email, // Use logged-in user's email
      author_whatsapp: formData.get('author_whatsapp') as string,
      article_title: formData.get('article_title') as string,
      participant_type: formData.get('participant_type') as string,
      transaction_id: formData.get('transaction_id') as string,
      payment_date: formData.get('payment_date') as string,
      status: 'pending'
    };

    // Process authors - only include non-empty ones
    const authors = [];
    for (let i = 1; i <= 6; i++) {
      const name = formData.get(`author${i}_name`) as string;
      if (name && name.trim()) {
        authors.push({
          num: i,
          designation: formData.get(`author${i}_designation`) as string || '',
          name: name,
          institution: formData.get(`author${i}_institution`) as string || ''
        });
      }
    }

    // Add author fields to data
    authors.forEach(author => {
      data[`author${author.num}_designation`] = author.designation;
      data[`author${author.num}_name`] = author.name;
      data[`author${author.num}_institution`] = author.institution;
    });

    // Validate required fields
    if (!abstractFile || !paymentScreenshot) {
      return NextResponse.json(
        { error: 'Missing required files' },
        { status: 400 }
      );
    }

    if (!data.author1_name || !data.article_title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let abstractFilePath = '';
    let paymentScreenshotPath = '';

    // Upload abstract file
    if (abstractFile) {
      const fileExt = abstractFile.name.split('.').pop();
      const fileName = `${Date.now()}_${user.id}.${fileExt}`;
      const filePath = `abstracts/${fileName}`;

      const arrayBuffer = await abstractFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('cima26-abstracts')
        .upload(filePath, buffer, {
          contentType: abstractFile.type,
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Abstract upload error:', uploadError);
        return NextResponse.json(
          { error: `Abstract upload failed: ${uploadError.message}` },
          { status: 500 }
        );
      }

      abstractFilePath = filePath;
    }

    // Upload payment screenshot
    if (paymentScreenshot) {
      const fileExt = paymentScreenshot.name.split('.').pop();
      const fileName = `${Date.now()}_payment_${user.id}.${fileExt}`;
      const filePath = `payment-screenshots/${fileName}`;

      const arrayBuffer = await paymentScreenshot.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('cima26-abstracts')
        .upload(filePath, buffer, {
          contentType: paymentScreenshot.type,
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Payment screenshot upload error:', uploadError);
        return NextResponse.json(
          { error: `Payment screenshot upload failed: ${uploadError.message}` },
          { status: 500 }
        );
      }

      paymentScreenshotPath = filePath;
    }

    // Insert into database
    const { data: insertData, error: insertError } = await supabase
      .from('registrations')
      .insert([
        {
          ...data,
          abstract_file_path: abstractFilePath,
          payment_screenshot_path: paymentScreenshotPath,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: `Database insert failed: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration submitted successfully',
        data: insertData[0]
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}

// Also handle GET to check registration status
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

    return NextResponse.json({ 
      hasRegistration: !!registration,
      registration: registration 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}