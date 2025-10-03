import db from "@/lib/db"

export async function POST(req) {
    console.log("API Submit Article Request")
  try {
    const body = await req.json()
    const { title, author, email, category, excerpt, content, tags } = body

    const [result] = await db.query(
      `INSERT INTO article_submissions 
       (title, author_name, author_email, category, excerpt, content, tags, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [title, author, email, category, excerpt, content, JSON.stringify(tags)]
    )

    return Response.json({ success: true, id: result.insertId })
  } catch (err) {
    console.error("DB Insert Error:", err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
