import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  console.log("API Approveeeeeeeeeeeee Article Request");
  try {
    const { articleId } = await req.json();

    if (!articleId) {
      return NextResponse.json({ error: "Article ID required" }, { status: 400 });
    }

    // 1. Get article details from submissions
    const [submissions] = await db.query(
      `SELECT * FROM article_submissions WHERE id = ?`,
      [articleId]
    );

    if (!submissions || submissions.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const article = submissions[0];

    // 2. Get or create category_id
    let categoryId = null;
    const [categoryRows] = await db.query(
      `SELECT id FROM categories WHERE name = ?`,
      [article.category]
    );

    if (categoryRows && categoryRows.length > 0) {
      categoryId = categoryRows[0].id;
    } else {
      const [result] = await db.query(
        `INSERT INTO categories (name, slug) VALUES (?, ?)`,
        [article.category, article.category.toLowerCase().replace(/\s+/g, "-")]
      );
      categoryId = result.insertId;
    }

    // 3. Get or create user/author
    let authorId = null;
    const [userRows] = await db.query(
      `SELECT id FROM users WHERE email = ?`,
      [article.author_email]
    );

    if (userRows && userRows.length > 0) {
      authorId = userRows[0].id;
    } else {
      const [result] = await db.query(
        `INSERT INTO users (name, email, role) VALUES (?, ?, 'author')`,
        [article.author_name, article.author_email]
      );
      authorId = result.insertId;
    }

    // 4. Check if already exists in articles
    const [existingArticle] = await db.query(
      `SELECT * FROM articles WHERE title = ? AND author_id = ?`,
      [article.title, authorId]
    );

    let newStatus = "published";

    if (existingArticle.length > 0) {
      // Already exists → toggle publish/unpublish
      const currentStatus = existingArticle[0].status;
      newStatus = currentStatus === "published" ? "unpublished" : "published";

      await db.query(
        `UPDATE articles 
         SET status = ?, updated_at = NOW() 
         WHERE id = ?`,
        [newStatus, existingArticle[0].id]
      );
    } else {
      // First time approval → insert into articles
      const slug = article.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      let tagsForDB = "[]";
      if (article.tags) {
        try {
          const parsed =
            typeof article.tags === "string"
              ? JSON.parse(article.tags)
              : article.tags;
          tagsForDB = JSON.stringify(parsed);
        } catch {
          tagsForDB = JSON.stringify([article.tags]);
        }
      }

      await db.query(
        `INSERT INTO articles 
         (title, slug, excerpt, content, image_url, tags, category_id, author_id, status, published_at, views, likes) 
         VALUES (?, ?, ?, ?, NULL, ?, ?, ?, 'published', NOW(), 0, 0)`,
        [
          article.title,
          slug,
          article.excerpt,
          article.content,
          tagsForDB,
          categoryId,
          authorId,
        ]
      );
    }

    // 5. Update submission status accordingly
    await db.query(
      `UPDATE article_submissions 
       SET status = ?, reviewed_at = NOW() 
       WHERE id = ?`,
      [newStatus, articleId]
    );

    console.log(`✅ Article ${newStatus}:`, articleId);
    return NextResponse.json({ success: true, status: newStatus });
  } catch (err) {
    console.error("❌ Approve Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
