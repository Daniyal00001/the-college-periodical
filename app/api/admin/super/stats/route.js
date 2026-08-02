export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function GET(req) {
  try {
    const { errorResponse } = await getAuthUser(req, ['super_admin'])
    if (errorResponse) return errorResponse

    const [publishedRows] = await db.query(`
      SELECT COUNT(*) as count 
      FROM article_submissions 
      WHERE status = 'published'
    `)

    const [rejectedRows] = await db.query(`
      SELECT COUNT(*) as count 
      FROM article_submissions 
      WHERE status = 'rejected'
    `)

    const publishedCount = publishedRows[0]?.count || 0
    const rejectedCount = rejectedRows[0]?.count || 0

    return NextResponse.json({ publishedCount, rejectedCount })
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}