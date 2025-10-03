import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("API Get Articles Request")
  try {
    const [rows] = await db.query(`
      SELECT a.id, a.title, a.excerpt, a.content, a.read_time, a.published_at,
             u.name AS author, c.name AS category
      FROM articles a
      JOIN users u ON a.author_id = u.id
      JOIN categories c ON a.category_id = c.id
      WHERE a.status = 'published'
      ORDER BY a.published_at DESC
    `)

    console.log("✅ Articles fetched:", rows.length)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("❌ DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}