import nodemailer from 'nodemailer'

export async function sendEmail(to, subject, html, text) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️ Email Service Notice: EMAIL_USER or EMAIL_PASS environment variables are missing. Please add EMAIL_USER and EMAIL_PASS to your .env.local file or Vercel Environment Variables.")
    return { success: false, error: "SMTP credentials not configured." }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `"The College Periodical" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    })
    
    console.log('✅ Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email dispatch error:', error)
    return { success: false, error: error.message }
  }
}