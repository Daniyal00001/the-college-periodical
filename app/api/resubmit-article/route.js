import { NextResponse } from "next/server"
import db from "@/lib/db"
import { sendEmail } from "@/lib/emailService"
import { getResubmissionConfirmationEmail } from "@/lib/emailTemplates"

export async function POST(req) {
  console.log("API Resubmit Article Request")
  try {
    const body = await req.json()
    const { trackingNumber, content } = body

    if (!trackingNumber || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find the article by tracking number
    const [articles] = await db.query(
      `SELECT id, title, author_name, author_email, category 
       FROM article_submissions 
       WHERE tracking_number = ?`,
      [trackingNumber]
    )

    if (!articles || articles.length === 0) {
      return NextResponse.json({ 
        error: "Article not found. Please check your tracking number." 
      }, { status: 404 })
    }

    const article = articles[0]

    // ⭐ ADD THIS CODE HERE - Update the article content and reset status
    await db.query(
      `UPDATE article_submissions 
       SET content = ?, 
           status = 'resubmitted',
           assignment_status = 'unassigned',
           final_decision = 'pending',
           reviewed_at = NULL,
           resubmission_count = resubmission_count + 1,
           last_resubmitted_at = NOW(),
           reviewer_remarks = CONCAT(
             COALESCE(reviewer_remarks, ''), 
             '\n\n--- RESUBMITTED ON ', 
             NOW(), 
             ' (Revision #', 
             resubmission_count + 1,
             ') ---\n'
           )
       WHERE id = ?`,
      [content, article.id]
    )

    // Send confirmation email
    const emailTemplate = getResubmissionConfirmationEmail(
      article.author_name, 
      article.title, 
      trackingNumber
    )
    await sendEmail(article.author_email, emailTemplate.subject, emailTemplate.html, emailTemplate.text)

    console.log("Article resubmitted successfully:", trackingNumber)

    return NextResponse.json({ 
      success: true, 
      id: article.id,
      trackingNumber,
      email: article.author_email
    })
  } catch (err) {
    console.error("Resubmit error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
