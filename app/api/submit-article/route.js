import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateTrackingNumber } from '@/lib/generateTrackingNumber'
import { sendEmail } from '@/lib/email'
// Remove this import - it causes build errors
// import DOMPurify from 'isomorphic-dompurify'

// Add this to make the route dynamic (not pre-rendered at build time)
export const dynamic = 'force-dynamic'

// Simple HTML sanitization function to replace DOMPurify
function sanitizeHTML(html) {
  if (!html) return ''
  
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript:/gi, '')
}

export async function POST(req) {
  const { title, author, email, category, excerpt, content, tags } = await req.body.json()

  if (!title || !author || !email || !category || !excerpt || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Sanitize the HTML content to prevent script injections
  const cleanContent = sanitizeHTML(content)

  // Generate unique tracking number
  const trackingNumber = generateTrackingNumber()

  // Insert into database
  const { data: article_submission, error } = await supabase
    .from('article_submissions')
    .insert([
      { title, author, email, category, excerpt, cleanContent, tags, status, tracking_number: trackingNumber }
    ])
    .select()

  if (error) {
    console.log(error)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  // Send confirmation email
  const emailSent = await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text)

  if (err) {
    console.error('Email error:', err)
    return NextResponse.json({ 
      error: err.message 
    }, { status: 500 })
  }

  return NextResponse.json({ 
    message: 'Article submitted successfully', 
    trackingNumber 
  })
}