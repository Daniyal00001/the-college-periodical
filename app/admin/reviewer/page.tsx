"use client"

import NavbarHeader from "@/components/NavbarHeader"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, Send, LogOut, Clock, CheckCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"

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
    async function initSession() {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          router.push("/login")
          return
        }

        const data = await res.json()
        if (!data.user) {
          router.push("/login")
          return
        }

        if (data.user.role !== "reviewer" && data.user.role !== "super_admin") {
          router.push("/admin/super")
          return
        }

        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        fetchAssignments(data.user.id)
      } catch (error) {
        console.error("Session error:", error)
        router.push("/login")
      }
    }

    initSession()
  }, [])

  const fetchAssignments = async (reviewerId: number) => {
    try {
      const res = await fetch(`/api/admin/reviewer/assignments?reviewerId=${reviewerId}`)
      if (res.status === 401 || res.status === 403) {
        handleLogout()
        return
      }
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

      if (res.status === 401 || res.status === 403) {
        handleLogout()
        return
      }

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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (e) {
      console.error(e)
    }
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/login")
  }

  const pendingAssignments = assignments.filter(a => a.reviewer_status === "pending")
  const reviewedAssignments = assignments.filter(a => a.reviewer_status === "reviewed")

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ==================== STANDARDIZED HEADER NAVBAR ==================== */}
      <NavbarHeader
        subtitle="Peer Reviewer Portal"
        user={user}
        onLogout={handleLogout}
      />

      {/* ==================== DASHBOARD CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Minimal Stats */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-amber-500 hidden sm:block" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-extrabold text-amber-600">{pendingAssignments.length}</div>
              <p className="text-xs text-slate-500 mt-0.5">Manuscripts awaiting your evaluation</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Reviews</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-500 hidden sm:block" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-extrabold text-emerald-600">{reviewedAssignments.length}</div>
              <p className="text-xs text-slate-500 mt-0.5">Reviews submitted to editorial board</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews Table */}
        <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <CardTitle className="text-base font-bold text-slate-900">Assigned Articles</CardTitle>
            <CardDescription className="text-xs text-slate-500">Review assigned articles and provide constructive academic feedback</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto w-full">
              <Table className="min-w-[650px]">
                <TableHeader className="bg-slate-50/80">
                  <TableRow className="border-slate-100">
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Date</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAssignments.map((assignment) => (
                    <TableRow key={assignment.id} className="border-slate-100 hover:bg-slate-50/40 transition-colors">
                      <TableCell className="font-semibold text-slate-900 max-w-[220px] truncate">{assignment.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[11px] font-semibold">
                          {assignment.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs">{new Date(assignment.assigned_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">Pending</Badge>
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
                              className="rounded-xl border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold"
                            >
                              <Eye className="h-4 w-4 mr-1.5" />
                              Review Paper
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
                            <DialogHeader className="border-b border-slate-100 pb-4">
                              <DialogTitle className="text-xl font-extrabold text-slate-900">{selectedArticle?.title}</DialogTitle>
                              <DialogDescription className="text-xs text-slate-500">
                                Category: <span className="font-semibold text-slate-700">{selectedArticle?.category}</span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-5 pt-4">
                              <div className="bg-blue-50/80 border border-blue-200/80 p-3.5 rounded-2xl text-xs text-blue-900 leading-relaxed font-medium">
                                🔒 <strong>Double-Blind Review Policy:</strong> Author names and email details are hidden to maintain unbiased peer evaluation.
                              </div>
                              
                              <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Abstract / Excerpt</h4>
                                <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">{selectedArticle?.excerpt}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Manuscript</h4>
                                <div
                                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 prose max-w-none text-sm text-slate-700 leading-relaxed"
                                  dangerouslySetInnerHTML={{
                                    __html: selectedArticle?.content || "",
                                  }}
                                />
                              </div>
                              
                              <div className="space-y-2 pt-3 border-t border-slate-100">
                                <Label htmlFor="remarks" className="font-bold text-sm text-slate-900">Your Peer Review & Remarks *</Label>
                                <Textarea
                                  id="remarks"
                                  value={remarks}
                                  onChange={(e) => setRemarks(e.target.value)}
                                  placeholder="Provide detailed evaluation of the paper quality, argument coherence, citation validity, and your recommendation..."
                                  rows={5}
                                  className="rounded-2xl text-sm border-slate-200"
                                />
                              </div>
                              
                              <Button 
                                onClick={handleSubmitReview}
                                disabled={isLoading || !remarks.trim()}
                                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 h-11 text-white font-semibold shadow-sm"
                              >
                                {isLoading ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit Review to Board
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
            </div>
            {pendingAssignments.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                No pending articles currently assigned to you for review
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Reviews Table */}
        <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <CardTitle className="text-base font-bold text-slate-900">Completed Reviews</CardTitle>
            <CardDescription className="text-xs text-slate-500">Articles you have already evaluated</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto w-full">
              <Table className="min-w-[550px]">
                <TableHeader className="bg-slate-50/80">
                  <TableRow className="border-slate-100">
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviewedAssignments.map((assignment) => (
                    <TableRow key={assignment.id} className="border-slate-100">
                      <TableCell className="font-semibold text-slate-900 max-w-[200px] truncate text-sm">{assignment.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-[10px]">
                          {assignment.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md truncate text-xs text-slate-600">{assignment.reviewer_remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {reviewedAssignments.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                No completed reviews yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}