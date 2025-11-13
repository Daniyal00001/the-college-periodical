import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateTrackingNumber } from '@/lib/generateTrackingNumber'
// Remove this import - it causes build errors
// import DOMPurify from 'isomorphic-dompurify'
// Removed email import - add it back if you have the email.js file

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
      { 
        title, 
        author, 
        email, 
        category, 
        excerpt, 
        content: cleanContent, 
        tags, 
        status: 'submitted',
        tracking_number: trackingNumber 
      }
    ])
    .select()

  if (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // TODO: Send confirmation email if you have email functionality
  // const emailSent = await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text)

  return NextResponse.json({ 
    message: 'Article submitted successfully', 
    trackingNumber 
  })
}