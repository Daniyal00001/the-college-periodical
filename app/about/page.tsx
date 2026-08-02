"use client"

import { ArrowLeft, Instagram, Facebook, Mail, BookOpen, Layers, ShieldCheck, Sparkles, Users } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* HEADER NAVBAR */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="The College Periodical Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-700 transition-colors">
                  The College Periodical
                </h1>
                <p className="text-xs text-blue-700 font-semibold tracking-wide uppercase">
                  About Our Charter & Publication
                </p>
              </div>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="rounded-xl border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION (LIGHT ACADEMIC THEME) */}
      <section className="py-16 bg-gradient-to-b from-blue-100/70 via-white to-gray-50 text-gray-900 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-bold text-blue-800 uppercase tracking-widest">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Our Academic Charter
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Bridging Student Thought & Publication Standards
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Fostering structured dialogue, analytical writing, and double-anonymized peer review among undergraduate scholars.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* MISSION & VISION */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden p-8 sm:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Our Mission & Purpose</h2>
              <p className="text-xs text-blue-700 font-semibold uppercase">Academic Rigor Meets Student Discourse</p>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed pt-2">
            <p>
              The College Periodical aims to facilitate a structured and productive dialogue among students
              on a broad range of subjects, thereby promoting <strong>critical thinking</strong> and its
              application through clear, evidence-based writing. It serves as a forum where students can share their opinions
              on various topics — including law, politics, religion, sports, literature, and institutional policies — and
              engage in thoughtful intellectual exchange.
            </p>
            <p>
              During undergraduate studies, it is essential that students learn to <strong>think, write, and articulate ideas meaningfully</strong>.
              While professional academic journals exist, young adults often find it difficult to meet the demanding pre-requisites
              of such platforms. The Periodical strives to <strong>bridge the gap</strong> between students’ developing capacities and the expectations of established publication standards, nurturing a general culture of scholarly writing.
            </p>
          </div>
        </Card>

        {/* THEMES & CATEGORIES */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden p-8 sm:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Themes & Categories</h2>
              <p className="text-xs text-indigo-700 font-semibold uppercase">Multi-Disciplinary Non-Fiction Scope</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 text-sm leading-relaxed pt-2">
            <p>
              The Periodical covers a wide range of <strong>non-fiction themes</strong> such as politics, law,
              religion, history, science, sports, and other social sciences. Article formats include:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Opinion Essays</h3>
                <p className="text-xs text-gray-600">Analytical essays supported by logical reasoning and clear thesis statements.</p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Book & Text Reviews</h3>
                <p className="text-xs text-gray-600">Critical analyses of classical and contemporary non-fiction books and papers.</p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-center">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Response Articles</h3>
                <p className="text-xs text-gray-600">Structured academic responses to previously published pieces in the Periodical.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* ISSUES & ROLLING PUBLICATION */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden p-8 sm:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Editorial Schedule & Rolling Release</h2>
              <p className="text-xs text-sky-700 font-semibold uppercase">Four Quarterly Editions Per Year</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 text-sm leading-relaxed pt-2">
            <p>
              The Periodical publishes <strong>four official issues per year</strong> (with the upcoming winter edition being <strong>December 2025</strong>).
            </p>
            <p>
              Submissions, peer reviews, and copyediting are conducted on a <strong>rolling basis</strong>. Accepted submissions are published online as soon as editorial revisions are complete. Works published during a quarter are compiled into that edition, and official <strong>issue numbers</strong> are permanently assigned upon publication.
            </p>
          </div>
        </Card>

        {/* EDITORIAL & ADMINISTRATIVE TEAM */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden p-8 sm:p-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Editorial & Administrative Team</h2>
                <p className="text-xs text-indigo-700 font-semibold uppercase">The Minds Behind The Periodical</p>
              </div>
            </div>
            <Link href="/about/team">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs h-10 px-5 shadow-sm">
                Meet Our Full Team →
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed pt-2">
            Our journal is managed by dedicated student boards across Administration, Peer Review Copyediting, Technical Infrastructure, and Student Outreach.
          </p>
        </Card>

        {/* CONTACT BANNER (LIGHT ACADEMIC BANNER) */}
        <div className="bg-blue-50 border border-blue-200 p-8 sm:p-10 rounded-3xl text-center text-gray-900 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">Connect With The Editorial Board</h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto font-normal">
            Have questions about manuscript guidelines, peer review inquiries, or institutional partnerships? Get in touch with us:
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="mailto:thecollegeperiodical@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-white border border-blue-200 text-blue-800 rounded-xl hover:bg-blue-100 transition text-sm font-semibold shadow-sm"
            >
              <Mail className="h-4 w-4 mr-2 text-blue-600" />
              thecollegeperiodical@gmail.com
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/thecollegeperiodical?igsh=MXUzb2k0d3loeGZ3NQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16JcDSk5Rf/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-xs text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} The College Periodical. All rights reserved.
      </footer>

    </div>
  )
}
