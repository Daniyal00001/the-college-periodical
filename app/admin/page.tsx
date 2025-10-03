"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, CheckCircle, XCircle, Clock, Search, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

type Submission = {
  id: number
  title: string
  author_name: string
  author_email: string
  category: string
  submitted_at: string
  status: string
  excerpt: string
  content: string
  tags: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const key = searchParams.get("key")

  // 🔒 Admin access check
  useEffect(() => {
    const secretKey = "hehe123"
    if (key !== secretKey) {
      console.error("Unauthorized access")
      router.replace("/")
    }
  }, [key, router])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState<Submission | null>(null)
  const [articles, setArticles] = useState<Submission[]>([])
  const [publishedCount, setPublishedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Fetch Submissions from MySQL
  useEffect(() => {
    fetchArticles()
    fetchPublishedStats()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/admin/submissions")
      if (!res.ok) throw new Error("Failed to fetch submissions")
      const data = await res.json()
      setArticles(data)
    } catch (error) {
      console.error("Error fetching submissions:", error)
    }
  }

  const fetchPublishedStats = async () => {
    try {
      const res = await fetch("/api/admin/stats")
      if (!res.ok) throw new Error("Failed to fetch stats")
      const data = await res.json()
      setPublishedCount(data.publishedCount || 0)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  // ✅ Approve & Publish
  const handleApprove = async (articleId: number) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      })

      if (!res.ok) throw new Error("Failed to approve article")

      await fetchArticles()
      await fetchPublishedStats()
      alert("Article approved and published!")
    } catch (error) {
      console.error("Error approving article:", error)
      alert("Failed to approve article")
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Reject
  const handleReject = async (articleId: number) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      })

      if (!res.ok) throw new Error("Failed to reject article")

      await fetchArticles()
      alert("Article rejected")
    } catch (error) {
      console.error("Error rejecting article:", error)
      alert("Failed to reject article")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Parse tags if stored as JSON string
  const parseTags = (tags: string) => {
    try {
      return typeof tags === 'string' ? JSON.parse(tags) : tags
    } catch {
      return []
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Site</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Articles</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles.filter((a) => a.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCount}</div>
              <p className="text-xs text-muted-foreground">In total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Writers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles.length}</div>
              <p className="text-xs text-muted-foreground">Submitted authors</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Articles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Article Management</CardTitle>
            <CardDescription>Review and manage submitted articles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.author_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{article.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(article.status)}</TableCell>
                    <TableCell>{new Date(article.submitted_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedArticle(article)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedArticle?.title}</DialogTitle>
                              <DialogDescription>
                                By {selectedArticle?.author_name} • {selectedArticle?.category}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Excerpt</h4>
                                <p className="text-gray-600">{selectedArticle?.excerpt}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Full Content</h4>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="whitespace-pre-wrap">{selectedArticle?.content}</p>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button
                                  onClick={() => handleApprove(selectedArticle!.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                  disabled={isLoading}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve & Publish
                                </Button>
                                {/* <Button
                                  variant="destructive"
                                  onClick={() => handleReject(selectedArticle!.id)}
                                  disabled={isLoading}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button> */}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {article.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(article.id)}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={isLoading}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleReject(article.id)}
                              disabled={isLoading}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}