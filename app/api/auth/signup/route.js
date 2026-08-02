import { NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"
import { validatePassword } from "@/lib/passwordValidator"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    // Password validation
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json({
        error: `Password is not strong enough: ${passwordValidation.errors.join(", ")}`
      }, { status: 400 })
    }

    // Check if user exists
    const [existing] = await db.query(
      `SELECT id FROM auth_users WHERE email = ?`,
      [email]
    )

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "An account with this email address already exists." }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user (default role: reviewer, active: 1)
    const [result] = await db.query(
      `INSERT INTO auth_users (name, email, password, role, is_active) 
       VALUES (?, ?, ?, 'reviewer', 1)`,
      [name, email, hashedPassword]
    )

    return NextResponse.json({ 
      success: true, 
      message: "Account created successfully. Please login.",
      userId: result.insertId 
    })
  } catch (err) {
    console.error("Signup Error:", err)

    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      return NextResponse.json({ 
        error: "Database authentication failed (Access Denied). Please ensure your DB_USER and DB_PASSWORD environment variables are properly set in .env.local or Vercel." 
      }, { status: 500 })
    }

    if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT') {
      return NextResponse.json({ 
        error: "Database connection failed. Please check that your Aiven MySQL server is running and DB_HOST / DB_PORT are set." 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      error: err.message || "Server error during account creation." 
    }, { status: 500 })
  }
}