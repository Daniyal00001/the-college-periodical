"use client"

import { ArrowLeft, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            About The College Periodical
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
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* About Section */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            About The Periodical
          </h2>
          <p className="text-gray-700 leading-relaxed space-y-4">
            The publication aims to facilitate a structured and productive dialogue among students on a broad range of subjects, thereby promoting critical thinking and its application through writing. A forum through which students can methodically share their opinions on various aspects, like politics, religion, sports, institutional policies, etc., and respond to each other. During undergraduate studies, it is not important that students publish research articles, but that they learn to think and engage meaningfully, write, and learn to articulate and respond, be that on any subject. Even though good platforms and ways of writing for them do in fact exist, young adults are usually underdeveloped to breach the strict quality barriers of such prestigious forums. A general writing culture would help reduce the gap between our capacities and the high standards of good forums. The Periodical, hence, aims to reduce this gap.
          </p>

          <p className="text-gray-700 leading-relaxed space-y-4 mt-4">
            The periodical covers all non-fiction themes such as politics, law, religion, history, science, sports, and all other social sciences. It has several article categories, such as opinion, book review, and response articles. It aims to strike a balance between typical opinion writing that has minimal evidence/support requirements and academic writing that has the highest evidence/support requirements. Therefore, it will accept short to medium-length articles.
          </p>
        </section>

        {/* Publication Flow Section */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Publication Flow
          </h2>
          <p className="text-gray-700 leading-relaxed space-y-4">
            Writers should receive a confirmation email upon submitting if they provide an email address. This email conveys the submission number. Submissions are scanned through Turnitin and reviewed via a double-anonymized review process. The first decision on submissions is made within 2 to 4 weeks. One of three decisions can be made: acceptance, rejection, or revision required.
          </p>
          <p className="text-gray-700 leading-relaxed space-y-4 mt-4">
            Upon acceptance, articles go into production and are published on the website within 1–2 weeks. Issue numbers are allotted to publications according to the next issue in line.
          </p>
        </section>

        {/* Issues Section */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Issues
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Periodical publishes four issues per year. The upcoming issue is December 2025. Submissions, reviews, and publications are on a rolling basis and not contingent on the publication of issues. Accepted submissions are published on the website without waiting for the issue.
          </p>
        </section>

        {/* Social Links */}
        <section className="flex justify-center space-x-6">
          <a
            href="https://www.instagram.com/thecollegeperiodical/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-transform transform hover:scale-110"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.facebook.com/thecollegeperiodical/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-transform transform hover:scale-110"
          >
            <Facebook className="h-6 w-6" />
          </a>
        </section>
      </main>
    </div>
  )
}
