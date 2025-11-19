export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("API Get Articles Request")
  try {
    const [rows] = await db.query(`
      SELECT a.*, 
             c.name AS category_name,
             s.author_name, 
             s.author_email,
             s.tracking_number

      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN article_submissions s ON a.author_id = s.id
      WHERE a.status = 'published'
      ORDER BY a.published_at DESC
    `)

    console.log("Articles fetched:", rows.length)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}