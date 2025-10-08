// app/api/track/[trackingNumber]/route.js
import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(request, { params }) {
  try {
    // Next.js 13+ mein params await karna hota hai
    const { trackingNumber } = await params
    
    if (!trackingNumber) {
      return NextResponse.json({ error: "Tracking number required" }, { status: 400 })
    }

    // Fetch submission with all related data
    const [submissions] = await db.query(`
      SELECT 
        asub.*,
        aa.id as assignment_id,
        aa.reviewer_remarks,
        aa.reviewer_status,
        aa.assigned_at,
        aa.reviewed_at,
        u.name as reviewer_name,
        u.email as reviewer_email,
        a.slug
      FROM article_submissions asub
      LEFT JOIN article_assignments aa ON asub.id = aa.submission_id
      LEFT JOIN users u ON aa.reviewer_id = u.id
      LEFT JOIN articles a ON asub.title = a.title 
        AND asub.author_email = (
          SELECT email FROM users WHERE id = a.author_id LIMIT 1
        )
      WHERE asub.tracking_number = ?
      ORDER BY aa.assigned_at DESC
      LIMIT 1
    `, [trackingNumber])

    if (!submissions || submissions.length === 0) {
      return NextResponse.json({ 
        error: "Submission not found",
        message: "Invalid tracking number" 
      }, { status: 404 })
    }

    console.log("Tracking info fetched for:", trackingNumber)
    return NextResponse.json(submissions[0])
  } catch (err) {
    console.error("Tracking API Error:", err)
    return NextResponse.json({ 
      error: "Database error",
      details: err.message 
    }, { status: 500 })
  }
}