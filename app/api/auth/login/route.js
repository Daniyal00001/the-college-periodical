import { NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/jwt"

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

    if (!user.is_active) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("Login successful:", user.email, "Role:", user.role)

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    console.log("Token created successfully") // Debug log

    // Return response with token
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (err) {
    console.error("Login Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}