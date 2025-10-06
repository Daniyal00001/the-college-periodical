import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(request, { params }) {
  try {
    const { trackingNumber } = params

    if (!trackingNumber) {
      return NextResponse.json({ error: "Tracking number required" }, { status: 400 })
    }

    // Fetch submission with assignment details
    const [submissions] = await db.query(`
      SELECT 
        asub.*,
        aa.reviewer_remarks,
        a.slug
      FROM article_submissions asub
      LEFT JOIN article_assignments aa ON asub.id = aa.submission_id
      LEFT JOIN articles a ON asub.title = a.title AND asub.author_email = (
        SELECT email FROM users WHERE id = a.author_id LIMIT 1
      )
      WHERE asub.tracking_number = ?
      LIMIT 1
    `, [trackingNumber])

    if (!submissions || submissions.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    console.log("Tracking info fetched for:", trackingNumber)
    return NextResponse.json(submissions[0])
  } catch (err) {
    console.error("Tracking API Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}