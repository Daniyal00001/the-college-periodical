"use client"

import { ArrowLeft, Mail, Instagram, Facebook, FileText, BookOpen, CheckCircle, XCircle, Clock } from "lucide-react"
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
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* Overview Section */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-blue-600 w-7 h-7" />
            <h2 className="text-3xl font-semibold text-gray-900">Themes & Categories</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>The College Periodical</strong> covers a broad range of non-fiction themes including politics, law, religion, history, science, sports, and social sciences. 
            Its article categories include <em>Opinion Article, Law Review Article, Institutional Review, Book Review</em>, and others.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            It aims to strike a balance between traditional opinion pieces and rigorous academic writing — 
            welcoming short to medium-length articles backed by thoughtful evidence and argumentation.
          </p>
        </section>

        {/* Publication Flow */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-blue-600 w-7 h-7" />
            <h2 className="text-3xl font-semibold text-gray-900">Publication Flow</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Writers receive a <strong>confirmation email</strong> upon submission if they provide an email address. 
            This email includes a <strong>submission number</strong> used in all future correspondence.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Submissions are scanned through <strong>Turnitin</strong> and undergo a 
            <strong> double-anonymized review process</strong>. The first editorial decision is made within 
            <strong> 2 to 4 weeks</strong>.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <CheckCircle className="text-blue-600 w-8 h-8 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900">Acceptance</h3>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                Articles requiring no major changes are accepted and move directly to copyediting. 
                Such decisions are rare and signify readiness for publication.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
              <Clock className="text-yellow-600 w-8 h-8 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900">Revision Required</h3>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                The most common decision type — authors are asked to make specific changes to enhance clarity, structure, or depth. 
                The final decision depends on the revised submission.
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <XCircle className="text-red-600 w-8 h-8 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900">Rejection</h3>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                Articles not fitting the publication’s scope or failing revision standards are declined. 
                Desk rejections occur when a submission is outside thematic focus.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mt-6">
            Upon <strong>acceptance</strong>, articles go into production and are published on the website within 
            <strong> 1 to 2 weeks</strong>. Issue numbers are allotted according to the next issue in line.
          </p>
        </section>

        {/* Issues Section */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-blue-600 w-7 h-7" />
            <h2 className="text-3xl font-semibold text-gray-900">Publication Schedule</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The Periodical publishes <strong>four issues annually</strong>. The upcoming issue is 
            <strong> December 2025</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Submissions and reviews occur on a rolling basis — accepted works appear on the website 
            as soon as they’re ready. Issue numbers are assigned at the next scheduled release.
          </p>
        </section>

        {/* Contact & Socials */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-10 rounded-3xl text-center text-white shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Contact & Social Links</h2>
          <div className="flex justify-center mb-6">
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
