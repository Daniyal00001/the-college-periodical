import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(request, { params }) {
  try {
    const { slug } = params

    const [rows] = await db.query(`
      SELECT a.*, 
             c.name AS category_name,
             s.author_name, 
             s.author_email
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN article_submissions s ON a.author_id = s.id
      WHERE a.slug = ? AND a.status = 'published'
      LIMIT 1
    `, [slug])

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}