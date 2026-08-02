export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function GET(req) {
  try {
    const { errorResponse } = await getAuthUser(req, ['super_admin'])
    if (errorResponse) return errorResponse

    const [rows] = await db.query(`
      SELECT id, name, email, role
      FROM auth_users
      WHERE role = 'reviewer' AND is_active = 1
      ORDER BY name ASC
    `)

    return NextResponse.json(rows)
  } catch (err) {
    console.error("DB Error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}