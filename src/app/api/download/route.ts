import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { verifyAdmin } from '../sys-ops/auth/route';

export async function GET(req: NextRequest) {
  let connection;
  
  try {
    // Check admin auth
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    // Get connection
    connection = await pool.getConnection();
    
    // Base query with filters
    let baseQuery = `
      SELECT 
        r.*, 
        r.paper_id,
        u.full_name as reviewer_name
      FROM registrations r
      LEFT JOIN users u ON r.reviewed_by = u.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    // Apply status filter
    if (status && status !== 'all') {
      baseQuery += ' AND r.status = ?';
      params.push(status);
    }
    
    // Apply search filter
    if (search) {
      baseQuery += ` AND (
        LOWER(r.author1_name) LIKE LOWER(?) OR
        LOWER(r.author_email) LIKE LOWER(?) OR
        LOWER(r.article_title) LIKE LOWER(?)
      )`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    baseQuery += ' ORDER BY r.created_at DESC';
    
    const [registrations] = await connection.execute(baseQuery, params);
    
    // Get stats
    const [statsRows] = await connection.execute(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN status = 'under_review' THEN 1 ELSE 0 END) as under_review
       FROM registrations`
    );
    
    const statsData = {
      total: (statsRows as any[])[0].total,
      pending: (statsRows as any[])[0].pending,
      approved: (statsRows as any[])[0].approved,
      rejected: (statsRows as any[])[0].rejected,
      under_review: (statsRows as any[])[0].under_review,
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
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function PATCH(req: NextRequest) {
  let connection;
  
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

    // Get connection
    connection = await pool.getConnection();
    
    const updateData: any = {
      status,
      updated_at: new Date(),
    };

    if (admin_comments !== undefined) {
      updateData.admin_comments = admin_comments;
    }

    const [result] = await connection.execute(
      `UPDATE registrations 
       SET status = ?, updated_at = NOW() ${admin_comments !== undefined ? ', admin_comments = ?' : ''}
       WHERE id = ?`,
      [status, ...(admin_comments !== undefined ? [admin_comments] : []), id]
    ) as any[];

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Return updated record
    const [updatedRows] = await connection.execute(
      `SELECT r.*, u.full_name as reviewer_name 
       FROM registrations r
       LEFT JOIN users u ON r.reviewed_by = u.id
       WHERE r.id = ?`,
      [id]
    );

    return NextResponse.json({ 
      success: true, 
      registration: (updatedRows as any[])[0] 
    });

  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error.message || 'Update failed' }, 
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
