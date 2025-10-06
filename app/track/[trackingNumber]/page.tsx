"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { BookOpen, ArrowLeft, CheckCircle, Clock, XCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TrackingPage() {
  const params = useParams()
  const router = useRouter()
  const trackingNumber = params.trackingNumber as string
  const [submission, setSubmission] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (trackingNumber) {
      fetchSubmission()
    }
  }, [trackingNumber])

  const fetchSubmission = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/track/${trackingNumber}`)
      if (res.ok) {
        const data = await res.json()
        setSubmission(data)
      } else {
        setError("Invalid tracking number or submission not found")
      }
    } catch (err) {
      setError("Failed to fetch submission status")
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status: string, assignmentStatus: string) => {
    if (status === "published") {
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
        label: "Published",
        message: "Your article has been published!"
      }
    }
    if (status === "rejected" || assignmentStatus === "rejected") {
      return {
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-100",
        label: "Rejected",
        message: "Your article was not approved for publication"
      }
    }
    if (assignmentStatus === "reviewed") {
      return {
        icon: Clock,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        label: "Under Final Review",
        message: "Your article has been reviewed and is awaiting final decision"
      }
    }
    if (assignmentStatus === "assigned") {
      return {
        icon: Clock,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        label: "Under Review",
        message: "Your article is currently being reviewed"
      }
    }
    return {
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      label: "Pending",
      message: "Your article is in queue for review"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading submission status...</p>
      </div>
    )
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-xl font-bold text-gray-900">The College Periodical</h1>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Not Found</h2>
              <p className="text-gray-600 mb-6">
                {error || "We couldn't find a submission with this tracking number."}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Please check your tracking number and try again.
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700">Go to Homepage</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(submission.status, submission.assignment_status)
  const StatusIcon = statusInfo.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">The College Periodical</h1>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Track Your Submission</h2>
          <p className="text-gray-600">Tracking Number: <span className="font-mono font-semibold">{trackingNumber}</span></p>
        </div>

        <Card className="mb-6">
          <CardHeader className="text-center pb-4">
            <div className={`w-20 h-20 rounded-full ${statusInfo.bgColor} flex items-center justify-center mx-auto mb-4`}>
              <StatusIcon className={`h-10 w-10 ${statusInfo.color}`} />
            </div>
            <CardTitle className="text-2xl">{statusInfo.label}</CardTitle>
            <CardDescription className="text-base">{statusInfo.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Article Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title:</span>
                    <span className="font-medium text-right max-w-md">{submission.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Author:</span>
                    <span className="font-medium">{submission.author_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <Badge variant="outline">{submission.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium">
                      {new Date(submission.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                  {submission.reviewed_at && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviewed:</span>
                      <span className="font-medium">
                        {new Date(submission.reviewed_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {submission.reviewer_remarks && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Reviewer Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{submission.reviewer_remarks}</p>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Submission Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Submitted</p>
                      <p className="text-xs text-gray-500">
                        {new Date(submission.submitted_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {submission.assignment_status !== "unassigned" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Assigned for Review</p>
                        <p className="text-xs text-gray-500">Article sent to reviewer</p>
                      </div>
                    </div>
                  )}

                  {submission.assignment_status === "reviewed" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Review Completed</p>
                        <p className="text-xs text-gray-500">Awaiting final decision</p>
                      </div>
                    </div>
                  )}

                  {(submission.status === "published" || submission.status === "rejected") && (
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                        submission.status === "published" ? "bg-green-500" : "bg-red-500"
                      }`}></div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {submission.status === "published" ? "Published" : "Rejected"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {submission.reviewed_at && new Date(submission.reviewed_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {submission.status === "published" && (
          <div className="text-center">
            <Link href={`/article/${submission.slug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Published Article
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}