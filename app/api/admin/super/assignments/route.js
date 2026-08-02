export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function GET(req) {
  try {
    const { errorResponse } = await getAuthUser(req, ['super_admin'])
    if (errorResponse) return errorResponse

    const [rows] = await db.query(`
      SELECT 
        aa.id,
        aa.submission_id,
        aa.reviewer_remarks,
        aa.reviewer_status,
        aa.assigned_at,
        s.title,
        s.category,
        s.assignment_status,
        s.status,
        s.author_name,
        s.author_email,
        s.tracking_number,
        au.name AS reviewer_name
      FROM article_assignments aa
      JOIN article_submissions s ON aa.submission_id = s.id
      JOIN auth_users au ON aa.assigned_to = au.id
      ORDER BY aa.assigned_at DESC
    `);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
