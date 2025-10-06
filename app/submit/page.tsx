"use client"
import { useEffect } from "react"
import type React from "react"
import { useState } from "react"
import { Send, FileText, BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

const categories = [
  "Opinion Article",
  "Law Review Article",
  "Institutional Review",
  "Book Review",
  "Other",
]

export default function SubmitArticle() {
  console.log("SubmitArticle component rendered");
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    email: "",
    category: "",
    content: "",
    excerpt: "",
    tags: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("handleSubmit called!");
    console.log("Form data:", formData);
    
    // Validate category is selected
    if (!formData.category) {
      alert("Please select a category")
      return
    }
    
    setIsSubmitting(true)

    try {
      console.log("Sending data to /api/submit-article");
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

      console.log("Response status:", res.status);
      const data = await res.json()
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      // Save email before clearing form
      const submittedEmail = formData.email
      
      setSubmitted(true)
      setFormData({
        title: "",
        author: "",
        email: submittedEmail,
        category: "",
        content: "",
        excerpt: "",
        tags: "",
      })
    } catch (err: any) {
      console.error("Submit error:", err)
      alert("Error: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // ✅ Success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Article Submitted Successfully!</CardTitle>
              <CardDescription>
                Thank you for your submission. Our editorial team will review your article and get back to you within
                2-4 weeks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  You'll receive a confirmation email at <strong>{formData.email}</strong> shortly.
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
                      setFormData({
                        title: "",
                        author: "",
                        email: "",
                        category: "",
                        content: "",
                        excerpt: "",
                        tags: "",
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

  // ✅ Main form screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              {/* <BookOpen className="h-8 w-8 text-blue-600 mr-3" /> */}
                 <img
                src="/logo.png"
                alt="The College Periodical Logo"
                className="h-20 w-20 mr-2 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "block";
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Article</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share your thoughts, experiences, and insights with the campus community. All submissions are reviewed by
              our editorial team before publication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Submission Guidelines */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Submission Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Article Length</h4>
                    <p className="text-sm text-gray-600">500-2000 words for optimal readability</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Content Guidelines</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Original content only</li>
                      <li>• Respectful and inclusive language</li>
                      <li>• Fact-check all claims</li>
                      <li>• Include relevant sources</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Review Process</h4>
                    <p className="text-sm text-gray-600">
                      Articles are reviewed within 2-4 weeks. You'll receive feedback via email.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Publication</h4>
                    <p className="text-sm text-gray-600">
                      Approved articles are published on our website and promoted through our social channels.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submission Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Article Submission Form</CardTitle>
                  <CardDescription>Fill out all required fields to submit your article for review.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    console.log("Form onSubmit triggered!");
                    handleSubmit(e);
                  }} className="space-y-6">
                    {/* Author Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="author">Author Name *</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          placeholder="Your full name"
                          required
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
                          required
                        />
                      </div>
                    </div>

                    {/* Article Information */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Article Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter a compelling title for your article"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                          required
                        >
                          <SelectTrigger className={!formData.category ? "border-red-300" : ""}>
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
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) => handleInputChange("tags", e.target.value)}
                          placeholder="e.g., campus life, research, innovation"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Article Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange("excerpt", e.target.value)}
                        placeholder="Write a brief summary of your article (100-200 characters)"
                        rows={3}
                        required
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
                        required
                      />
                      <p className="text-sm text-gray-500">
                        Current word count: {formData.content.split(" ").filter((word) => word.length > 0).length}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        onClick={() => console.log("Button clicked!")}
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
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
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}