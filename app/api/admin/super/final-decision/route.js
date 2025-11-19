

// import { NextResponse } from "next/server"
// import db from "@/lib/db"

// export async function POST(req) {
//   console.log("API Final Decision")
//   try {
//     const { submissionId, decision } = await req.json()
// console.log("Final decision data received:", { submissionId, decision });
//     if (!submissionId || !decision) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     if (decision === "approved") {
//       // Get article details
//       const [submissions] = await db.query(
//         `SELECT * FROM article_submissions WHERE id = ?`,
//         [submissionId]
//       )
   
//       console.log("Submissions fetched for final decision:", submissions);

//       if (!submissions || submissions.length === 0) {
//         return NextResponse.json({ error: "Article not found" }, { status: 404 })
//       }

//       const article = submissions[0]

//       // Get or create category_id
//       let categoryId = null
//       const [categoryRows] = await db.query(
//         `SELECT id FROM categories WHERE name = ?`,
//         [article.category]
//       )
      
//       if (categoryRows && categoryRows.length > 0) {
//         categoryId = categoryRows[0].id
//       } else {
//         const [result] = await db.query(
//           `INSERT INTO categories (name, slug) VALUES (?, ?)`,
//           [article.category, article.category.toLowerCase().replace(/\s+/g, "-")]
//         )
//         categoryId = result.insertId
//       }

//       // Get or create user/author
//       let authorId = null
//       const [userRows] = await db.query(
//         `SELECT id FROM users WHERE email = ?`,
//         [article.author_email]
//       )

//       if (userRows && userRows.length > 0) {
//         authorId = userRows[0].id
//       } else {
//         const [result] = await db.query(
//           `INSERT INTO users (name, email, role) VALUES (?, ?, 'author')`,
//           [article.author_name, article.author_email]
//         )
//         authorId = result.insertId
//       }

//       // Check if article already exists in articles table
//       const [existingArticle] = await db.query(
//         `SELECT * FROM articles WHERE title = ? AND author_id = ?`,
//         [article.title, authorId]
//       )

//       if (existingArticle.length === 0) {
//         // First time approval - insert into articles
//         const slug = article.title
//           .toLowerCase()
//           .replace(/\s+/g, "-")
//           .replace(/[^a-z0-9-]/g, "")
        
//         let tagsForDB = '[]'
//         if (article.tags) {
//           try {
//             const parsed = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags
//             tagsForDB = JSON.stringify(parsed)
//           } catch {
//             tagsForDB = JSON.stringify([article.tags])
//           }
//         }
        
//         await db.query(
//           `INSERT INTO articles 
//            (title, slug, excerpt, content, author_id, category_id, image_url, tags, status, published_at, views, likes) 
//            VALUES (?, ?, ?, ?, ?, ?, NULL, ?, 'published', NOW(), 0, 0)`,
//           [article.title, slug, article.excerpt, article.content, authorId, categoryId, tagsForDB]
//         )
//       }

//       // Update submission with BOTH status and assignment_status
//       await db.query(
//         `UPDATE article_submissions 
//          SET status = 'published', 
//              assignment_status = 'approved', 
//              reviewed_at = NOW() 
//          WHERE id = ?`,
//         [submissionId]
//       )

//       console.log("✅ Article approved and published")
//     } else {
//       // Rejected - update BOTH status and assignment_status
//       await db.query(
//         `UPDATE article_submissions 
//          SET status = 'rejected', 
//              assignment_status = 'rejected', 
//              reviewed_at = NOW() 
//          WHERE id = ?`,
//         [submissionId]
//       )
      
//       console.log("✅ Article rejected")
//     }

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error("❌ Final Decision Error:", err)
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function POST(req) {
  console.log("API Final Decision")
  try {
    const { submissionId, decision } = await req.json()
    console.log("Final decision data received:", { submissionId, decision })
    
    if (!submissionId || !decision) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (decision === "approved") {
      // Get article details
      const [submissions] = await db.query(
        `SELECT * FROM article_submissions WHERE id = ?`,
        [submissionId]
      )
   
      console.log("Submissions fetched for final decision:", submissions)

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

      // ✅ USE SUBMISSION ID AS AUTHOR ID
      const authorId = submissionId
      console.log("Using submission_id as author_id:", authorId)

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
        
        console.log("✅ New article inserted with author_id:", authorId, "and submission_id:", submissionId)
      } else {
        // Article already exists, just update status
        await db.query(
          `UPDATE articles 
           SET status = 'published', 
               published_at = NOW() 
           WHERE submission_id = ?`,
          [submissionId]
        )
        
        console.log("✅ Existing article updated for submission_id:", submissionId)
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

      console.log("✅ Article approved and published with submission_id:", submissionId)
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
      
      console.log("✅ Article rejected for submission_id:", submissionId)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("❌ Final Decision Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}