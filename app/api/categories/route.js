import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  console.log("📦 Fetching categories from DB...")
  try {
    const [rows] = await db.query(`
      SELECT id, name, slug, description, color, created_at
      FROM categories
      ORDER BY created_at DESC
    `)

    return NextResponse.json(rows)
  } catch (err) {
    console.error("❌ DB Error (Categories):", err)
    return NextResponse.json({ error: "Database error while fetching categories" }, { status: 500 })
  }
}
