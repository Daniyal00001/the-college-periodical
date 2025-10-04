import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("API Get Reviewers")
  try {
    const [rows] = await db.query(`
      SELECT id, name, email, role
      FROM auth_users
      WHERE role = 'reviewer' AND is_active = 1
      ORDER BY name ASC
    `)

    console.log("Reviewers fetched:", rows.length)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}