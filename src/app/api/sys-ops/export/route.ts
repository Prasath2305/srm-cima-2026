import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { verifyAdmin } from '../auth/route';
import * as XLSX from 'xlsx';

export async function GET(req: NextRequest) {
  let connection;

  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    connection = await pool.getConnection();

    const [rows] = await connection.execute(`
      SELECT
        r.id,
        r.paper_id,
        r.author1_salutation,
        r.author1_name,
        r.author1_affiliation,
        r.author1_institution,
        r.author2_salutation,
        r.author2_name,
        r.author2_affiliation,
        r.author2_institution,
        r.author3_salutation,
        r.author3_name,
        r.author3_affiliation,
        r.author3_institution,
        r.author4_salutation,
        r.author4_name,
        r.author4_affiliation,
        r.author4_institution,
        r.author5_salutation,
        r.author5_name,
        r.author5_affiliation,
        r.author5_institution,
        r.author6_salutation,
        r.author6_name,
        r.author6_affiliation,
        r.author6_institution,
        r.author_email,
        r.author_whatsapp,
        r.article_title,
        r.transaction_id,
        r.payment_date,
        r.abstract_file_path,
        r.payment_screenshot_path,
        r.full_paper_path,
        r.status,
        r.created_at,
        r.updated_at,
        u.full_name as registered_user_name,
        u.email as registered_user_email
      FROM registrations r
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `);

    const registrations = rows as any[];

    // Build Excel rows
    const excelData = registrations.map((r, idx) => ({
      'S.No': idx + 1,
      'Paper ID': r.paper_id || '',
      'Registration ID': r.id,
      'Status': r.status,
      'Submission Date': r.created_at ? new Date(r.created_at).toLocaleString('en-IN') : '',
      'Last Updated': r.updated_at ? new Date(r.updated_at).toLocaleString('en-IN') : '',

      // Article
      'Article Title': r.article_title || '',

      // Author 1
      'Author 1 Salutation': r.author1_salutation || '',
      'Author 1 Name': r.author1_name || '',
      'Author 1 Affiliation': r.author1_affiliation || '',
      'Author 1 Institution': r.author1_institution || '',

      // Author 2
      'Author 2 Salutation': r.author2_salutation || '',
      'Author 2 Name': r.author2_name || '',
      'Author 2 Affiliation': r.author2_affiliation || '',
      'Author 2 Institution': r.author2_institution || '',

      // Author 3
      'Author 3 Salutation': r.author3_salutation || '',
      'Author 3 Name': r.author3_name || '',
      'Author 3 Affiliation': r.author3_affiliation || '',
      'Author 3 Institution': r.author3_institution || '',

      // Author 4
      'Author 4 Salutation': r.author4_salutation || '',
      'Author 4 Name': r.author4_name || '',
      'Author 4 Affiliation': r.author4_affiliation || '',
      'Author 4 Institution': r.author4_institution || '',

      // Author 5
      'Author 5 Salutation': r.author5_salutation || '',
      'Author 5 Name': r.author5_name || '',
      'Author 5 Affiliation': r.author5_affiliation || '',
      'Author 5 Institution': r.author5_institution || '',

      // Author 6
      'Author 6 Salutation': r.author6_salutation || '',
      'Author 6 Name': r.author6_name || '',
      'Author 6 Affiliation': r.author6_affiliation || '',
      'Author 6 Institution': r.author6_institution || '',

      // Contact
      'Email': r.author_email || '',
      'WhatsApp': r.author_whatsapp || '',

      // Payment
      'Transaction ID': r.transaction_id || '',
      'Payment Date': r.payment_date || '',

      // File links
      'Abstract File': r.abstract_file_path ? `${baseUrl}/${r.abstract_file_path}` : '',
      'Payment Screenshot': r.payment_screenshot_path ? `${baseUrl}/${r.payment_screenshot_path}` : '',
      'Full Paper': r.full_paper_path ? `${baseUrl}/${r.full_paper_path}` : '',

      // Registered user
      'Registered User Name': r.registered_user_name || '',
      'Registered User Email': r.registered_user_email || '',
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    ws['!cols'] = [
      { wch: 6 },   // S.No
      { wch: 12 },  // Paper ID
      { wch: 36 },  // Registration ID
      { wch: 14 },  // Status
      { wch: 22 },  // Submission Date
      { wch: 22 },  // Last Updated
      { wch: 50 },  // Article Title
      // Author columns
      ...Array(24).fill({ wch: 20 }),
      // Contact
      { wch: 30 },  // Email
      { wch: 16 },  // WhatsApp
      // Payment
      { wch: 20 },  // Transaction ID
      { wch: 14 },  // Payment Date
      // Files
      { wch: 60 },  // Abstract File
      { wch: 60 },  // Payment Screenshot
      { wch: 60 },  // Full Paper
      { wch: 26 },  // Registered User Name
      { wch: 30 },  // Registered User Email
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const fileName = `CIMA2026_Registrations_${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });

  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: error.message || 'Export failed' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
