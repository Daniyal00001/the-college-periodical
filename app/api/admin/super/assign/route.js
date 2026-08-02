import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function POST(req) {
  try {
    const { user: authUser, errorResponse } = await getAuthUser(req, ['super_admin'])
    if (errorResponse) return errorResponse

    const { submissionId, reviewerId } = await req.json()

    if (!submissionId || !reviewerId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const assignedBy = authUser.userId

    // Create assignment
    await db.query(
      `INSERT INTO article_assignments (submission_id, assigned_to, assigned_by) 
       VALUES (?, ?, ?)`,
      [submissionId, reviewerId, assignedBy]
    )

    // Update article_submissions status
    await db.query(
      `UPDATE article_submissions 
       SET assignment_status = 'assigned' 
       WHERE id = ?`,
      [submissionId]
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Assign Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}