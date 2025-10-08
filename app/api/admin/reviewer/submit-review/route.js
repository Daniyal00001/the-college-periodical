export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function POST(req) {
  console.log("API Submit Review")
  try {
    const { assignmentId, remarks } = await req.json()

    if (!assignmentId || !remarks) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update assignment with remarks
    await db.query(
      `UPDATE article_assignments 
       SET reviewer_remarks = ?, 
           reviewer_status = 'reviewed',
           reviewed_at = NOW()
       WHERE id = ?`,
      [remarks, assignmentId]
    )

    // Update submission status
    const [assignment] = await db.query(
      `SELECT submission_id FROM article_assignments WHERE id = ?`,
      [assignmentId]
    )

    if (assignment && assignment.length > 0) {
      await db.query(
        `UPDATE article_submissions 
         SET assignment_status = 'reviewed' 
         WHERE id = ?`,
        [assignment[0].submission_id]
      )
    }

    console.log("Review submitted successfully")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Submit Review Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}