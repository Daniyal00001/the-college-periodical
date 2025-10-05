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
        asub.title,
        asub.category,
        asub.assignment_status,
        asub.status,
        u.name as reviewer_name
      FROM article_assignments aa
      JOIN article_submissions asub ON aa.submission_id = asub.id
      JOIN users u ON aa.assigned_to = u.id
      ORDER BY aa.assigned_at DESC
    `)

    console.log("Assignments fetched:", rows.length)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}