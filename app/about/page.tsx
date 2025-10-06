"use client"

import { ArrowLeft, Instagram, Facebook, Mail, BookOpen, Layers } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            About <span className="text-blue-700">The College Periodical</span>
          </h1>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">

        {/* About Section */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-blue-600 w-7 h-7" />
            <h2 className="text-3xl font-semibold text-gray-900">About</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The publication aims to facilitate a structured and productive dialogue among students
            on a broad range of subjects, thereby promoting <strong>critical thinking</strong> and its
            application through writing. It serves as a forum where students can share their opinions
            on various topics — including politics, religion, sports, and institutional policies — and
            engage in thoughtful exchange with one another.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            During undergraduate studies, it is not essential that students publish research papers,
            but that they learn to <strong>think, write, and articulate ideas meaningfully</strong>.
            While professional forums exist, young adults often find it difficult to meet the rigorous
            standards of such platforms. The Periodical, therefore, strives to <strong>bridge the gap</strong>
            between students’ developing capacities and the expectations of established publication standards,
            nurturing a general culture of writing.
          </p>
        </section>

        {/* Themes & Categories */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="text-blue-600 w-7 h-7" />
            <h2 className="text-3xl font-semibold text-gray-900">Themes & Categories</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The Periodical covers a wide range of <strong>non-fiction themes</strong> such as politics, law,
            religion, history, science, sports, and other social sciences. Its article categories include
            <em> Opinion Articles, Book Reviews,</em> and <em>Response Articles</em>.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            The aim is to strike a balance between <strong>opinion writing</strong> (which has minimal
            evidence requirements) and <strong>academic writing</strong> (which demands strong evidence and structure).
            Therefore, the publication accepts <strong>short to medium-length articles</strong> that demonstrate
            both intellectual depth and accessibility.
          </p>
        </section>

        {/* Issues Section */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-blue-600 w-7 h-7" />
            <h2 className="text-3xl font-semibold text-gray-900">Issues</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The Periodical publishes <strong>four issues per year</strong>. The upcoming issue is
            <strong> December 2025</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Submissions, reviews, and publications are conducted on a <strong>rolling basis</strong>,
            independent of the issue release schedule. Accepted submissions are published on the website
            as soon as they are ready. All works published before the next issue will be included in it,
            and <strong>issue numbers</strong> will be assigned upon publication.
          </p>
        </section>

        {/* Contact & Socials */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-10 rounded-3xl text-center text-white shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Contact & Connect</h2>

          <div className="flex justify-center mb-8">
            <a
              href="mailto:thecollegeperiodical@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition"
            >
              <Mail className="h-5 w-5 mr-2" />
              thecollegeperiodical@gmail.com
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="https://www.instagram.com/thecollegeperiodical?igsh=MXUzb2k0d3loeGZ3NQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/share/16JcDSk5Rf/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
