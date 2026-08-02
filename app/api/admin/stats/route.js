import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function GET(req) {
  try {
    const { errorResponse } = await getAuthUser(req, ['super_admin', 'reviewer'])
    if (errorResponse) return errorResponse

    const [countRows] = await db.query(`
      SELECT COUNT(*) as count 
      FROM articles 
      WHERE status = 'published'
    `)

    const publishedCount = countRows[0]?.count || 0

    return NextResponse.json({ publishedCount })
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}