import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("API Get Submissions for Super Admin")
  try {
    const [rows] = await db.query(`
      SELECT id, title, author_name, author_email, category, 
             excerpt, content, tags, assignment_status, submitted_at
      FROM article_submissions
      WHERE status = 'pending'
      ORDER BY submitted_at DESC
    `)

    console.log("Submissions fetched:", rows.length)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}