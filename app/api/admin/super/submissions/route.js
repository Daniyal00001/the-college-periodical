export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function GET(req) {
  try {
    const { errorResponse } = await getAuthUser(req, ['super_admin'])
    if (errorResponse) return errorResponse

    const [rows] = await db.query(`
      SELECT id, title, author_name, author_email, tracking_number, category,
             excerpt, content, tags, assignment_status, submitted_at
      FROM article_submissions
      WHERE (status = 'pending' OR status = 'resubmitted') 
        AND assignment_status = 'unassigned'
      ORDER BY submitted_at DESC
    `)

    return NextResponse.json(rows)
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
