import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("API Get Stats")
  try {
    // Count published articles
    const [publishedRows] = await db.query(`
      SELECT COUNT(*) as count 
      FROM article_submissions 
      WHERE status = 'published'
    `)

    // Count rejected articles
    const [rejectedRows] = await db.query(`
      SELECT COUNT(*) as count 
      FROM article_submissions 
      WHERE status = 'rejected'
    `)

    const publishedCount = publishedRows[0]?.count || 0
    const rejectedCount = rejectedRows[0]?.count || 0

    console.log("Stats - Published:", publishedCount, "Rejected:", rejectedCount)
    return NextResponse.json({ publishedCount, rejectedCount })
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}