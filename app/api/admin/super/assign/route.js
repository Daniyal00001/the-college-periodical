import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function POST(req) {
  console.log("API Assign Article to Reviewer")
  try {
    const { submissionId, reviewerId, assignedBy } = await req.json()

    if (!submissionId || !reviewerId || !assignedBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if already assigned
    const [existing] = await db.query(
      `SELECT id FROM article_assignments WHERE submission_id = ?`,
      [submissionId]
    )

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "Article already assigned" }, { status: 400 })
    }

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

    console.log("Article assigned successfully")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Assign Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}