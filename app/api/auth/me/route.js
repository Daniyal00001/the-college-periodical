export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(req) {
  try {
    const { user: authUser, errorResponse } = await getAuthUser(req);
    if (errorResponse) return errorResponse;

    // Fetch fresh user details from DB
    const [rows] = await db.query(
      `SELECT id, name, email, role, is_active, created_at 
       FROM auth_users 
       WHERE id = ?`,
      [authUser.userId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    if (!user.is_active) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (err) {
    console.error("GET /api/auth/me error:", err);
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 });
  }
}
