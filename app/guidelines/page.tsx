"use client"

import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] via-[#f1f5f9] to-[#e2e8f0]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3 group-hover:rotate-6 transition-transform duration-300" />
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                The College Periodical
              </h1>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Instructions for Writers
          </h2>
          <p className="text-lg text-gray-600 italic">
            Complete publication and submission guidelines for contributors
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        {/* Table of Contents */}
        <Card className="mb-10 shadow-md hover:shadow-lg transition-all duration-300 border-none bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-700 font-semibold">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2 font-medium">
            {[
              "Publication Types",
              "Article Categories",
              "Word Limits",
              "Preparing Your Manuscript",
              "Citation and Support Guidelines",
              "Review Process",
              "Other Guidelines",
            ].map((item, i) => (
              <p key={i} className="hover:text-blue-600 transition-colors cursor-pointer">
                • {item}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Each Section */}
        {sections.map((section, i) => (
          <Card
            key={i}
            className="mb-8 border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm"
          >
            <CardHeader>
              <CardTitle className="text-blue-700 font-semibold">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-3 leading-relaxed">
              {section.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 💫 Organized Section Content
const sections = [
  {
    title: "Publication Types",
    content: (
      <>
        <div>
          <h4 className="font-semibold text-gray-900">Attributed publication</h4>
          <p>
            This type of publication will be attributed to the writer, meaning their name and contact
            details will appear with the article. A biodata file must be submitted.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Anonymous publication</h4>
          <p>
            Writers may choose anonymity to avoid social or institutional backlash. No personal data
            should be included. Submissions are reviewed identically as the process is
            double-anonymized.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Article Categories",
    content: (
      <>
        <p>
          Two main categories: <strong>opinion</strong> and <strong>book review</strong>. Subcategories expand on
          opinion writing.
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li><strong>Opinion articles:</strong> Balanced between opinion and academic writing; cite key arguments.</li>
          <li><strong>Law review articles:</strong> Present legal arguments with solid references.</li>
          <li><strong>Institutional review:</strong> Analyze educational or policy frameworks.</li>
          <li><strong>Book review:</strong> Critically analyze themes, impact, and context.</li>
          <li><strong>Response articles:</strong> Engage respectfully with previously published content.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Word Limits",
    content: (
      <>
        <p><strong>Book reviews:</strong> 800–1500 words</p>
        <p><strong>All others:</strong> 1200–2000 words (including references)</p>
      </>
    ),
  },
  {
    title: "Preparing Your Manuscript",
    content: (
      <ul className="list-disc ml-5 space-y-2">
        <li>Use the official Article Template (A4, 1-inch margins).</li>
        <li>12pt Times New Roman, double spacing, APA 7th references.</li>
        <li>Headings hierarchy: Bold → Bold Italic → Italic → Inline Italic.</li>
        <li>Only capitalize first word and proper nouns.</li>
        <li>Quotes under 40 words in quotes (“”), longer ones as indented blocks.</li>
        <li>Maintain language consistency; American English preferred.</li>
      </ul>
    ),
  },
  {
    title: "Citation and Support Guidelines",
    content: (
      <>
        <p>
          Follow <strong>APA 7th Edition</strong> citation style. Support every key argument with credible sources.
        </p>
        <p>
          Non-substantial or background information doesn’t require citation unless crucial to the
          argument.
        </p>
      </>
    ),
  },
  {
    title: "Review Process",
    content: (
      <>
        <p>The review process is <strong>double-anonymized</strong>.</p>
        <p>Writers and editors remain unaware of each other’s identities to ensure impartiality.</p>
      </>
    ),
  },
  {
    title: "Other Guidelines",
    content: (
      <ul className="list-disc ml-5 space-y-2">
        <li><strong>Co-writing:</strong> Up to two writers may co-author.</li>
        <li><strong>AI policy:</strong> AI-generated content is not accepted; declare assistance if used.</li>
        <li><strong>Original work:</strong> Submissions must be original and unpublished elsewhere.</li>
      </ul>
    ),
  },
]
