import { NextResponse } from "next/server"
import db from "@/lib/db"
import { generateTrackingNumber } from "@/lib/generateTrackingNumber"
import { sendEmail } from "@/lib/emailService"
import { getSubmissionConfirmationEmail } from "@/lib/emailTemplates"

export async function POST(req) {
  console.log("API Submit Article Request")
  try {
    const body = await req.json()
    const { title, author, email, category, excerpt, content, tags } = body

    if (!title || !author || !email || !category || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate unique tracking number
    const trackingNumber = generateTrackingNumber()

    // Insert into database
    const [result] = await db.query(
      `INSERT INTO article_submissions 
       (title, author_name, author_email, category, excerpt, content, tags, status, tracking_number) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      [title, author, email, category, excerpt, content, JSON.stringify(tags), trackingNumber]
    )

    // Send confirmation email
    const emailTemplate = getSubmissionConfirmationEmail(author, title, trackingNumber)
    await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text)

    console.log("Article submitted with tracking number:", trackingNumber)

    return NextResponse.json({ 
      success: true, 
      id: result.insertId,
      trackingNumber 
    })
  } catch (err) {
    console.error("Submit error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}