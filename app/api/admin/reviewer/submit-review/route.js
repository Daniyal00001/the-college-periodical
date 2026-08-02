export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function POST(req) {
  try {
    const { user: authUser, errorResponse } = await getAuthUser(req, ['reviewer', 'super_admin'])
    if (errorResponse) return errorResponse

    const { assignmentId, remarks } = await req.json()

    if (!assignmentId || !remarks) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Ensure the assignment belongs to this reviewer (unless super_admin)
    if (authUser.role !== 'super_admin') {
      const [check] = await db.query(
        `SELECT id FROM article_assignments WHERE id = ? AND assigned_to = ?`,
        [assignmentId, authUser.userId]
      )
      if (!check || check.length === 0) {
        return NextResponse.json({ error: "Forbidden. You are not assigned to this article." }, { status: 403 })
      }
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Submit Review Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}