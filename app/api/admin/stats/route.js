import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("API Get Stats Request")
  try {
    // Count published articles
    const [countRows] = await db.query(`
      SELECT COUNT(*) as count 
      FROM articles 
      WHERE status = 'published'
    `)

    const publishedCount = countRows[0]?.count || 0

    console.log("✅ Stats fetched - Published:", publishedCount)
    return NextResponse.json({ publishedCount })
  } catch (err) {
    console.error("❌ DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}