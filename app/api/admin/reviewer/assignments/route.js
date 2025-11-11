// // import { NextResponse } from "next/server"
// // import db from "@/lib/db"

// // export async function GET(req) {
// //   console.log("API Get Reviewer Assignments")
// //   try {
// //     const { searchParams } = new URL(req.url)
// //     const reviewerId = searchParams.get("reviewerId")

// //     if (!reviewerId) {
// //       return NextResponse.json({ error: "Reviewer ID required" }, { status: 400 })
// //     }

// //     // Get assignments for this reviewer (NO author details)
// //     const [rows] = await db.query(`
// //       SELECT 
// //         aa.id,
// //         aa.submission_id,
// //         aa.reviewer_status,
// //         aa.reviewer_remarks,
// //         aa.assigned_at,
// //         asub.title,
// //         asub.excerpt,
// //         asub.content,
// //         asub.category
// //       FROM article_assignments aa
// //       JOIN article_submissions asub ON aa.submission_id = asub.id
// //       WHERE aa.assigned_to = ?
// //       ORDER BY aa.assigned_at DESC
// //     `, [reviewerId])

// //     console.log("Assignments fetched for reviewer:", rows.length)
// //     return NextResponse.json(rows)
// //   } catch (err) {
// //     console.error("DB Error:", err)
// //     return NextResponse.json({ error: "Database error" }, { status: 500 })
// //   }
// // }

// export const dynamic = "force-dynamic";


// import { NextResponse } from "next/server"
// import db from "@/lib/db"

// export async function GET() {
//   console.log("API Get Assignments")
//   try {
//     const [rows] = await db.query(`
//       SELECT 
//         aa.id,
//         aa.submission_id,
//         aa.reviewer_remarks,
//         aa.reviewer_status,
//         aa.assigned_at,
//         asub.title,
//         asub.category,
//         u.name as reviewer_name
//       FROM article_assignments aa
//       JOIN article_submissions asub ON aa.submission_id = asub.id
//       JOIN auth_users u ON aa.assigned_to = u.id
//       ORDER BY aa.assigned_at DESC
//     `)

//     console.log("Assignments fetched:", rows.length)
//     return NextResponse.json(rows)
//   } catch (err) {
//     console.error("DB Error:", err)
//     return NextResponse.json({ error: "Database error" }, { status: 500 })
//   }
// }


export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req) {
  console.log("API Get Reviewer Assignmentssssssssssssssssss");
  try {
    const { searchParams } = new URL(req.url);
    const reviewerId = searchParams.get("reviewerId");

    if (!reviewerId) {
      return NextResponse.json({ error: "Reviewer ID required" }, { status: 400 });
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
        asub.content,    -- ✅ Include content!
        asub.category
      FROM article_assignments aa
      JOIN article_submissions asub ON aa.submission_id = asub.id
      WHERE aa.assigned_to = ?
      ORDER BY aa.assigned_at DESC
      `,
      [reviewerId]
    );

    console.log("Assignments fetched for reviewer:", rows.length);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
