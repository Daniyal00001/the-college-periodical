import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import db from "@/lib/db"

export async function POST(req) {
  try {
    const { errorResponse } = await getAuthUser(req, ['super_admin'])
    if (errorResponse) return errorResponse

    const { submissionId, decision } = await req.json()
    
    if (!submissionId || !decision) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (decision === "approved") {
      // Get article details
      const [submissions] = await db.query(
        `SELECT * FROM article_submissions WHERE id = ?`,
        [submissionId]
      )

      if (!submissions || submissions.length === 0) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 })
      }

      const article = submissions[0]

      // Get or create category_id
      let categoryId = null
      const [categoryRows] = await db.query(
        `SELECT id FROM categories WHERE name = ?`,
        [article.category]
      )
      
      if (categoryRows && categoryRows.length > 0) {
        categoryId = categoryRows[0].id
      } else {
        const [result] = await db.query(
          `INSERT INTO categories (name, slug) VALUES (?, ?)`,
          [article.category, article.category.toLowerCase().replace(/\s+/g, "-")]
        )
        categoryId = result.insertId
      }

      const authorId = submissionId

      // Check if article already exists in articles table
      const [existingArticle] = await db.query(
        `SELECT * FROM articles WHERE submission_id = ?`,
        [submissionId]
      )

      if (existingArticle.length === 0) {
        // First time approval - insert into articles
        const slug = article.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
        
        let tagsForDB = '[]'
        if (article.tags) {
          try {
            const parsed = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags
            tagsForDB = JSON.stringify(parsed)
          } catch {
            tagsForDB = JSON.stringify([article.tags])
          }
        }
        
        await db.query(
          `INSERT INTO articles 
           (title, slug, excerpt, content, author_id, category_id, image_url, tags, status, published_at, views, likes, submission_id) 
           VALUES (?, ?, ?, ?, ?, ?, NULL, ?, 'published', NOW(), 0, 0, ?)`,
          [article.title, slug, article.excerpt, article.content, authorId, categoryId, tagsForDB, submissionId]
        )
      } else {
        // Article already exists, just update status
        await db.query(
          `UPDATE articles 
           SET status = 'published', 
               published_at = NOW() 
           WHERE submission_id = ?`,
          [submissionId]
        )
      }

      // Update submission with BOTH status and assignment_status
      await db.query(
        `UPDATE article_submissions 
         SET status = 'published', 
             assignment_status = 'approved', 
             reviewed_at = NOW() 
         WHERE id = ?`,
        [submissionId]
      )
    } else {
      // Rejected - update BOTH status and assignment_status
      await db.query(
        `UPDATE article_submissions 
         SET status = 'rejected', 
             assignment_status = 'rejected', 
             reviewed_at = NOW() 
         WHERE id = ?`,
        [submissionId]
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Final Decision Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}