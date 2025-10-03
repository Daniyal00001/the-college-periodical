import { NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req) {
  console.log("API Login Request")
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Get user
    const [users] = await db.query(
      `SELECT id, email, password, name, role, is_active 
       FROM auth_users 
       WHERE email = ?`,
      [email]
    )

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const user = users[0]

    // Check if active
    if (!user.is_active) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("Login successful:", user.email, "Role:", user.role)

    // Return user data (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (err) {
    console.error("Login Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}