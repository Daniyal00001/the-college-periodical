export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("API Get Assignments")
  try {
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
        s.author_name,            -- NEW
        s.author_email,           -- NEW (optional, you can remove if unused)
        s.tracking_number,        -- NEW
        au.name AS reviewer_name
      FROM article_assignments aa
      JOIN article_submissions s ON aa.submission_id = s.id
      JOIN auth_users au ON aa.assigned_to = au.id
      ORDER BY aa.assigned_at DESC
    `);

    console.log("Assignments fetched:", rows.length);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
