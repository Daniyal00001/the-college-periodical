"use client"

import { ArrowLeft, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">About The College Periodical</h1>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* About Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">
            The publication aims to facilitate a structured and productive dialogue among students
            on a broad range of subjects, thereby promoting critical thinking and its application
            through writing. A forum through which students can methodically share their opinions on
            various aspects, like politics, religion, sports, institutional policies, etc., and respond
            to each other. During undergraduate studies, it is not important that students publish research
            articles, but that they learn to think and engage meaningfully, write, and learn to articulate
            and respond, be that on any subject.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Even though good platforms and ways of writing for them do in fact exist, young adults are
            usually underdeveloped to breach the strict quality barriers of such prestigious forums. A general
            writing culture would help reduce the gap between our capacities and the high standards of good
            forums. The Periodical, hence, aims to reduce this gap.
          </p>
        </section>

        {/* Coverage Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Themes & Categories</h2>
          <p className="text-gray-700 leading-relaxed">
            The periodical covers all non-fiction themes such as politics, law, religion, history, science,
            sports, and all other social sciences. It has several article categories, such as opinion,
            book review, and response articles.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            It aims to strike a balance between typical opinion writing that has minimal evidence/support
            requirements and academic writing that has the highest evidence/support requirements. Therefore,
            it will accept short to medium-length articles.
          </p>
        </section>

        {/* Issues Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Issues</h2>
          <p className="text-gray-700 leading-relaxed">
            The Periodical publishes four issues per year. The upcoming issue is <strong>December 2025</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Submissions, reviews, and publications are on a rolling basis and not contingent on the publication
            of issues. Accepted submissions will be published on the website without waiting for the issue.
            Publications up until the publication of an issue will feature in it. Issue numbers will also be
            allotted to publications upon the publication of an issue.
          </p>
        </section>

        {/* Social Links */}
        <section className="flex justify-center space-x-6">
          <a
            href="https://www.instagram.com/thecollegeperiodical?igsh=MXUzb2k0d3loeGZ3NQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.facebook.com/share/16JcDSk5Rf/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <Facebook className="h-6 w-6" />
          </a>
        </section>
      </main>
    </div>
  )
}
