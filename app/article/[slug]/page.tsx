"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Calendar, User, ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ArticleDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/article/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setArticle(data)
        }
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading article...</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
          <Link href="/articles">
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">The College Periodical</h1>
            </Link>
            <Link href="/articles">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Articles
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
            {article.category_name || article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            <span className="font-medium">{article.author_name || article.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <span>
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Not Published"}
            </span>
          </div>
        </div>

        {/* Excerpt */}
        {article.excerpt && (
          <div className="mb-8">
            <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-blue-600 pl-6">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Content */}
     <div
  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: article.content }}
></div>


        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {(typeof article.tags === "string" ? JSON.parse(article.tags) : article.tags).map(
                (tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}