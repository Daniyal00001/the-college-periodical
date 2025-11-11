"use client"
import { useState } from "react"
import { Send, FileText, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const categories = [
  "Opinion Article",
  "Law Review Article",
  "Institutional Review",
  "Book Review",
  "Response Article",
  "Tech Insight Article",
  "Medical Review Article",
  "Leadership Perspective",
]

export default function SubmitArticle() {
  const [mode, setMode] = useState("submit") // "submit" or "resubmit"
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    email: "",
    category: "",
    content: "",
    excerpt: "",
    tags: "",
  })
  const [resubmitData, setResubmitData] = useState({
    trackingNumber: "",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.category) {
      alert("Please select a category")
      return
    }
    
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/submit-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          email: formData.email,
          category: formData.category,
          excerpt: formData.excerpt,
          content: formData.content,
          tags: formData.tags.split(",").map((tag) => tag.trim()).filter(tag => tag),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setSubmittedEmail(formData.email)
      setSubmitted(true)
      setFormData({
        title: "",
        author: "",
        email: "",
        category: "",
        content: "",
        excerpt: "",
        tags: "",
      })
    } catch (err) {
      console.error("Submit error:", err)
      alert("Error: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResubmit = async () => {
    if (!resubmitData.trackingNumber || !resubmitData.content) {
      alert("Please provide both tracking number and updated content")
      return
    }
    
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/resubmit-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingNumber: resubmitData.trackingNumber,
          content: resubmitData.content,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setSubmittedEmail(data.email)
      setSubmitted(true)
      setResubmitData({
        trackingNumber: "",
        content: "",
      })
    } catch (err) {
      console.error("Resubmit error:", err)
      alert("Error: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleResubmitChange = (field, value) => {
    setResubmitData((prev) => ({ ...prev, [field]: value }))
  }

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {mode === "submit" ? (
                  <Send className="h-8 w-8 text-green-600" />
                ) : (
                  <RefreshCw className="h-8 w-8 text-green-600" />
                )}
              </div>
              <CardTitle className="text-2xl text-green-600">
                {mode === "submit" ? "Article Submitted Successfully!" : "Article Resubmitted Successfully!"}
              </CardTitle>
              <CardDescription>
                {mode === "submit" 
                  ? "Thank you for your submission. Our editorial team will review your article and get back to you within 2-4 weeks."
                  : "Your revised article has been resubmitted. Our editorial team will review the changes."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  You'll receive a confirmation email at <strong>{submittedEmail}</strong> shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setMode("submit")
                      setFormData({
                        title: "",
                        author: "",
                        email: "",
                        category: "",
                        content: "",
                        excerpt: "",
                        tags: "",
                      })
                      setResubmitData({
                        trackingNumber: "",
                        content: "",
                      })
                    }}
                  >
                    Submit Another Article
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Main form screen
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
                className="h-20 w-20 mr-2 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <h1 className="text-2xl font-bold text-gray-900">The College Periodical</h1>
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

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {mode === "submit" ? "Submit Your Article" : "Resubmit Your Article"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {mode === "submit" 
                ? "Share your thoughts, experiences, and insights with the community."
                : "Update your article content based on editorial feedback."}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={mode === "submit" ? "default" : "outline"}
              onClick={() => setMode("submit")}
              className="min-w-[150px]"
            >
              <Send className="h-4 w-4 mr-2" />
              New Submission
            </Button>
            <Button
              variant={mode === "resubmit" ? "default" : "outline"}
              onClick={() => setMode("resubmit")}
              className="min-w-[150px]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Resubmit Article
            </Button>
          </div>

          {/* Forms */}
          <div className="grid grid-cols-1 gap-8">
            <div className="col-span-1">
              {mode === "submit" ? (
                // Original Submission Form
                <Card>
                  <CardHeader>
                    <CardTitle>Article Submission Form</CardTitle>
                    <CardDescription>
                      Fill out all required fields to submit your article for review.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="author">Author Name *</Label>
                          <Input
                            id="author"
                            value={formData.author}
                            onChange={(e) => handleInputChange("author", e.target.value)}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@college.edu"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Article Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Enter a compelling title for your article"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleInputChange("category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tags">Theme/Discipline *</Label>
                          <Input
                            id="tags"
                            value={formData.tags}
                            onChange={(e) => handleInputChange("tags", e.target.value)}
                            placeholder="e.g., law, technology, medicine"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Article Precis *</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange("excerpt", e.target.value)}
                          placeholder="Write a brief summary of your article (100-200 characters)"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Article Content *</Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => handleInputChange("content", e.target.value)}
                          placeholder="Write your full article here..."
                          rows={12}
                        />
                        <p className="text-sm text-gray-500">
                          Current word count:{" "}
                          {formData.content.split(" ").filter((word) => word.length > 0).length}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Submit Article
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Resubmission Form
                <Card>
                  <CardHeader>
                    <CardTitle>Article Resubmission Form</CardTitle>
                    <CardDescription>
                      Provide your tracking number and updated article content to resubmit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="trackingNumber">Tracking Number *</Label>
                        <Input
                          id="trackingNumber"
                          value={resubmitData.trackingNumber}
                          onChange={(e) => handleResubmitChange("trackingNumber", e.target.value)}
                          placeholder="e.g., TCP-2024-ABC123"
                        />
                        <p className="text-sm text-gray-500">
                          Enter the tracking number provided in your submission confirmation email.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resubmitContent">Updated Article Content *</Label>
                        <Textarea
                          id="resubmitContent"
                          value={resubmitData.content}
                          onChange={(e) => handleResubmitChange("content", e.target.value)}
                          placeholder="Paste your revised article content here..."
                          rows={16}
                        />
                        <p className="text-sm text-gray-500">
                          Current word count:{" "}
                          {resubmitData.content.split(" ").filter((word) => word.length > 0).length}
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Resubmission Guidelines</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Address all feedback provided by the editorial team</li>
                          <li>• Maintain the original article's theme and category</li>
                          <li>• Only the article content will be updated</li>
                          <li>• You will receive a confirmation email once processed</li>
                        </ul>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleResubmit} disabled={isSubmitting} className="w-full sm:w-auto">
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Resubmitting...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Resubmit Article
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}