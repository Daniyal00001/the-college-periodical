import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function POST(req) {
  try {
    const { errorResponse } = await getAuthUser(req, ['super_admin'])
    if (errorResponse) return errorResponse

    const { articleId } = await req.json();

    if (!articleId) {
      return NextResponse.json({ error: "Article ID required" }, { status: 400 })
    }

    const [result] = await db.query(
      `UPDATE article_submissions 
       SET status = 'rejected', reviewed_at = NOW() 
       WHERE id = ?`,
      [articleId]
    )
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Reject Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}