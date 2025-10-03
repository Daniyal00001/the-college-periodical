"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

const categories = ["All", "Education"]

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)

  // ✅ Fetch published articles from our API (MySQL)
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/articles")
        const data = await res.json()
        setArticles(data || [])
      } catch (err) {
        console.error("❌ Error fetching articles:", err)
      }
      setLoading(false)
    }

    fetchArticles()
  }, [])


  useEffect(() => {
  const fetchArticles = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/articles")
      const data = await res.json()
      console.log("📌 API Response:", data)   // <- yeh check karo
      setArticles(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("❌ Fetch error:", err)
      setArticles([])
    }
    setLoading(false)
  }

  fetchArticles()
}, [])

  // ✅ Filtering & Sorting
  const filteredArticles = (articles || [])
  .filter((article) => {
    const matchesSearch =
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      case "oldest":
        return new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
      default:
        return 0
    }
  })



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="The College Periodical Logo"
                className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mr-2 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" style={{ display: 'none' }} />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                The College Periodical
              </h1>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">All Articles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete collection of published articles from students and faculty.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                {/* Categories removed for now */}
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-12">Loading articles...</div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              return (
                <Card
                  key={article.id}
                  className="p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl bg-white"
                >
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-3 mt-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 flex flex-col gap-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString()
                          : "Not Published"}
                      </span>
                    </div>

                    {/* Read More with Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="mt-2 w-full rounded-xl"
                          onClick={() => setSelectedArticle(article)}
                        >
                          Read More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl w-[95%] sm:w-full">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">{selectedArticle?.title}</DialogTitle>
                          <DialogDescription className="text-gray-600">
                            {selectedArticle?.excerpt}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 text-gray-800 whitespace-pre-line max-h-[70vh] overflow-y-auto pr-2">
                          {selectedArticle?.content}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No published articles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
