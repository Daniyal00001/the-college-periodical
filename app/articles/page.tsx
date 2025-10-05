"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, BookOpen, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const ARTICLES_PER_PAGE = 15

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedMonth, setSelectedMonth] = useState("All Months")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [sortBy, setSortBy] = useState("newest")
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [months, setMonths] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/articles")
        const data = await res.json()
        setArticles(Array.isArray(data) ? data : [])

        const monthSet = new Set<string>()
        const yearSet = new Set<string>()
        data.forEach((a: any) => {
          if (a.published_at) {
            const date = new Date(a.published_at)
            const monthName = date.toLocaleString("default", { month: "long" })
            monthSet.add(monthName)
            yearSet.add(date.getFullYear().toString())
          }
        })

        setMonths(["All Months", ...Array.from(monthSet)])
        setYears(["All Years", ...Array.from(yearSet).sort((a, b) => Number(b) - Number(a))])
      } catch (err) {
        console.error("Error fetching articles:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories([{ id: 0, name: "All Categories" }, ...data])
      } catch (err) {
        console.error("Error fetching categories:", err)
        setCategories([{ id: 0, name: "All Categories" }])
      }
    }

    fetchCategories()
  }, [])

  // Truncate content to ~200 characters
  const truncateContent = (text: string, maxLength: number = 200) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  const filteredArticles = (articles || [])
    .filter((article) => {
      const matchesSearch =
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "All Categories" || article.category_name === selectedCategory

      const date = article.published_at ? new Date(article.published_at) : null
      const matchesMonth =
        selectedMonth === "All Months" ||
        (date && date.toLocaleString("default", { month: "long" }) === selectedMonth)

      const matchesYear =
        selectedYear === "All Years" || (date && date.getFullYear().toString() === selectedYear)

      return matchesSearch && matchesCategory && matchesMonth && matchesYear
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

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedMonth, selectedYear, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="The College Periodical Logo"
                className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mr-2 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <BookOpen className="h-8 w-8 text-blue-600 mr-3 hidden" />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                The College Periodical
              </h1>
            </Link>
            <Link href="/">
              <Button variant="outline" className="rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">All Articles</h2>
          <p className="text-lg text-gray-600">
            Explore our complete collection of published articles
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-gray-300 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[130px] rounded-xl border-gray-300">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[130px] rounded-xl border-gray-300">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px] rounded-xl border-gray-300">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] rounded-xl border-gray-300">
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

        {/* Results */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading articles...</div>
        ) : paginatedArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 mb-8">
              {paginatedArticles.map((article) => (
                <Card
                  key={article.id}
                  className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm"
                >
                  <CardHeader className="p-0 mb-3">
                    <Link href={`/article/${article.slug}`}>
                      <CardTitle className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                        {article.title}
                      </CardTitle>
                    </Link>
                  </CardHeader>

                  <CardContent className="p-0">
                    <CardDescription className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {truncateContent(article.content, 200)}
                    </CardDescription>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-700 font-medium">
                        {article.author_name || article.author}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                        {article.category_name || article.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {article.published_at
                            ? new Date(article.published_at).toLocaleDateString()
                            : "Not Published"}
                        </span>
                      </div>

                      <Link href={`/article/${article.slug}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg ${
                        currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All Categories")
                setSelectedMonth("All Months")
                setSelectedYear("All Years")
              }}
              className="rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}