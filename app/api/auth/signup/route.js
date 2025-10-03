import { NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req) {
  console.log("API Signup Request")
  try {
    const { name, email, password } = await req.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user exists
    const [existing] = await db.query(
      `SELECT id FROM auth_users WHERE email = ?`,
      [email]
    )

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user (default role: reviewer)
    const [result] = await db.query(
      `INSERT INTO auth_users (name, email, password, role) 
       VALUES (?, ?, ?, 'reviewer')`,
      [name, email, hashedPassword]
    )

    console.log("User created:", result.insertId)

    return NextResponse.json({ 
      success: true, 
      message: "Account created successfully. Please login.",
      userId: result.insertId 
    })
  } catch (err) {
    console.error("Signup Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}