"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, Send, BookOpen, LogOut, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Assignment = {
  id: number
  submission_id: number
  title: string
  excerpt: string
  content: string
  category: string
  assigned_at: string
  reviewer_status: string
  reviewer_remarks: string
}

export default function ReviewerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Assignment | null>(null)
  const [remarks, setRemarks] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    
    const parsed = JSON.parse(userData)
    if (parsed.role !== "reviewer") {
      router.push("/admin/super")
      return
    }
    
    setUser(parsed)
    fetchAssignments(parsed.id)
  }, [])

  const fetchAssignments = async (reviewerId: number) => {
    try {
      const res = await fetch(`/api/admin/reviewer/assignments?reviewerId=${reviewerId}`)
      if (res.ok) {
        const data = await res.json()
        setAssignments(data)
      }
    } catch (error) {
      console.error("Error fetching assignments:", error)
    }
  }

  const handleSubmitReview = async () => {
    if (!remarks.trim()) {
      alert("Please enter your remarks")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/reviewer/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId: selectedArticle!.id,
          remarks: remarks
        })
      })

      if (!res.ok) throw new Error("Failed to submit review")

      alert("Review submitted successfully!")
      setRemarks("")
      setSelectedArticle(null)
      fetchAssignments(user.id)
    } catch (error) {
      alert("Failed to submit review")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const pendingAssignments = assignments.filter(a => a.reviewer_status === "pending")
  const reviewedAssignments = assignments.filter(a => a.reviewer_status === "reviewed")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reviewer Dashboard</h1>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Articles to review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewedAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Reviews submitted</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Assigned Articles</CardTitle>
            <CardDescription>Review these articles and provide your feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.title}</TableCell>
                    <TableCell><Badge variant="outline">{assignment.category}</Badge></TableCell>
                    <TableCell>{new Date(assignment.assigned_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setSelectedArticle(assignment)
                              setRemarks(assignment.reviewer_remarks || "")
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedArticle?.title}</DialogTitle>
                            <DialogDescription>
                              Category: {selectedArticle?.category}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-800">
                              Note: Author details are hidden to ensure unbiased review
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Excerpt</h4>
                              <p className="text-gray-600">{selectedArticle?.excerpt}</p>
                            </div>
                            
                          <div>
  <h4 className="font-semibold mb-2">Full Content</h4>
  <div
    className="bg-gray-50 p-4 rounded-lg prose max-w-none"
    dangerouslySetInnerHTML={{
      __html: selectedArticle?.content || "",
    }}
  />
</div>

                            
                            <div className="space-y-2">
                              <Label htmlFor="remarks">Your Review & Remarks *</Label>
                              <Textarea
                                id="remarks"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Provide detailed feedback about the article quality, accuracy, readability, and your recommendation..."
                                rows={6}
                              />
                            </div>
                            
                            <Button 
                              onClick={handleSubmitReview}
                              disabled={isLoading || !remarks.trim()}
                              className="w-full"
                            >
                              {isLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Submit Review
                                </>
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {pendingAssignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No pending articles to review
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Reviews</CardTitle>
            <CardDescription>Articles you have already reviewed</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Your Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviewedAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.title}</TableCell>
                    <TableCell><Badge variant="outline">{assignment.category}</Badge></TableCell>
                    <TableCell className="max-w-md truncate">{assignment.reviewer_remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {reviewedAssignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No completed reviews yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}