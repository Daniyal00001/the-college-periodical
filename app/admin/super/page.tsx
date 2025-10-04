"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, CheckCircle, XCircle, UserPlus, BookOpen, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Submission = {
  id: number
  title: string
  author_name: string
  author_email: string
  category: string
  submitted_at: string
  assignment_status: string
  excerpt: string
  content: string
}

type Reviewer = {
  id: number
  name: string
  email: string
  role: string
}

type Assignment = {
  id: number
  submission_id: number
  title: string
  category: string
  reviewer_name: string
  reviewer_remarks: string
  reviewer_status: string
  assigned_at: string
}

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [reviewers, setReviewers] = useState<Reviewer[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Submission | null>(null)
  const [selectedReviewer, setSelectedReviewer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    
    const parsed = JSON.parse(userData)
    if (parsed.role !== "super_admin") {
      router.push("/admin/reviewer")
      return
    }
    
    setUser(parsed)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [subsRes, reviewersRes, assignmentsRes] = await Promise.all([
        fetch("/api/admin/super/submissions"),
        fetch("/api/admin/super/reviewers"),
        fetch("/api/admin/super/assignments")
      ])
      
      if (subsRes.ok) setSubmissions(await subsRes.json())
      if (reviewersRes.ok) setReviewers(await reviewersRes.json())
      if (assignmentsRes.ok) setAssignments(await assignmentsRes.json())
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleAssign = async (submissionId: number) => {
    if (!selectedReviewer) {
      alert("Please select a reviewer")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/super/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          reviewerId: parseInt(selectedReviewer),
          assignedBy: user.id
        })
      })

      if (!res.ok) throw new Error("Failed to assign")

      alert("Article assigned successfully!")
      setSelectedReviewer("")
      fetchData()
    } catch (error) {
      alert("Failed to assign article")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinalDecision = async (submissionId: number, decision: "approved" | "rejected") => {
    if (!confirm(`Are you sure you want to ${decision === "approved" ? "approve" : "reject"} this article?`)) {
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/super/final-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, decision })
      })

      if (!res.ok) throw new Error("Failed")

      alert(`Article ${decision}!`)
      fetchData()
    } catch (error) {
      alert("Failed to process decision")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const unassignedArticles = submissions.filter(s => s.assignment_status === "unassigned")
  const reviewedArticles = assignments.filter(a => a.reviewer_status === "reviewed")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Super Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="unassigned" className="space-y-6">
          <TabsList>
            <TabsTrigger value="unassigned">
              Unassigned Articles ({unassignedArticles.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Reviewed Articles ({reviewedArticles.length})
            </TabsTrigger>
            <TabsTrigger value="reviewers">
              Reviewers ({reviewers.length})
            </TabsTrigger>
          </TabsList>

          {/* Unassigned Articles */}
          <TabsContent value="unassigned">
            <Card>
              <CardHeader>
                <CardTitle>Unassigned Articles</CardTitle>
                <CardDescription>Assign these articles to reviewers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unassignedArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                        <TableCell>{new Date(article.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
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
                                    By {selectedArticle?.author_name} ({selectedArticle?.author_email})
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
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">Assign to Reviewer</h4>
                                    <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select reviewer" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {reviewers.map(r => (
                                          <SelectItem key={r.id} value={r.id.toString()}>
                                            {r.name} ({r.email})
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <Button 
                                      onClick={() => handleAssign(selectedArticle!.id)}
                                      disabled={isLoading || !selectedReviewer}
                                      className="w-full"
                                    >
                                      <UserPlus className="h-4 w-4 mr-2" />
                                      Assign Article
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviewed Articles */}
          <TabsContent value="reviewed">
            <Card>
              <CardHeader>
                <CardTitle>Reviewed Articles</CardTitle>
                <CardDescription>Articles reviewed by reviewers - Make final decision</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviewedArticles.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{assignment.reviewer_name}</TableCell>
                        <TableCell className="max-w-xs truncate">{assignment.reviewer_remarks}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleFinalDecision(assignment.submission_id, "approved")}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={isLoading}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleFinalDecision(assignment.submission_id, "rejected")}
                              disabled={isLoading}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviewers List */}
          <TabsContent value="reviewers">
            <Card>
              <CardHeader>
                <CardTitle>Reviewers</CardTitle>
                <CardDescription>All registered reviewers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviewers.map((reviewer) => (
                      <TableRow key={reviewer.id}>
                        <TableCell className="font-medium">{reviewer.name}</TableCell>
                        <TableCell>{reviewer.email}</TableCell>
                        <TableCell><Badge>{reviewer.role}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}