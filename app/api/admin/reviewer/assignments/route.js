export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(req) {
  try {
    const { user: authUser, errorResponse } = await getAuthUser(req, ['reviewer', 'super_admin'])
    if (errorResponse) return errorResponse

    const { searchParams } = new URL(req.url);
    let reviewerId = searchParams.get("reviewerId");

    // If non-super-admin reviewer, force using their own user ID
    if (authUser.role !== 'super_admin' || !reviewerId) {
      reviewerId = authUser.userId;
    }

    const [rows] = await db.query(
      `
      SELECT 
        aa.id,
        aa.submission_id,
        aa.reviewer_status,
        aa.reviewer_remarks,
        aa.assigned_at,
        asub.title,
        asub.excerpt,
        asub.content,
        asub.category
      FROM article_assignments aa
      JOIN article_submissions asub ON aa.submission_id = asub.id
      WHERE aa.assigned_to = ?
      ORDER BY aa.assigned_at DESC
      `,
      [reviewerId]
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
