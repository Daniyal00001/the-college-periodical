"use client"

import { BookOpen, ArrowLeft, ArrowRight, ShieldCheck, FileText, CheckCircle2, Layers, Sparkles, Scale, BookMarked, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function GuidelinesPage() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ==================== HEADER NAVBAR ==================== */}
      <header className="border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 sm:py-0 min-h-[4rem] sm:h-20 gap-2 sm:gap-4">
            
            {/* Logo + Brand */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <img
                src="/logo.png"
                alt="The College Periodical Logo"
                className="h-10 w-10 sm:h-14 sm:w-14 object-contain transition-transform group-hover:scale-105 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <div className="min-w-0">
                <h1 className="text-sm sm:text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight truncate">
                  The College Periodical
                </h1>
                <p className="text-[9px] sm:text-[11px] text-blue-600 font-semibold uppercase tracking-wider truncate leading-tight">
                  Writer & Submission Guidelines
                </p>
              </div>
            </Link>

            <Link href="/" className="flex-shrink-0">
              <Button
                variant="outline"
                className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm h-8 sm:h-10 px-2.5 sm:px-4"
              >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Home
              </Button>
            </Link>

          </div>
        </div>
      </header>


      {/* ==================== HERO HEADER ==================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Official Editorial Guidelines
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Instructions for Contributors & Authors
          </h1>
          
          <p className="text-slate-600 text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Everything you need to know about manuscript categories, citation standards, word limits, and double-anonymized peer review.
          </p>

          {/* Quick Table of Contents Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button onClick={() => scrollToSection("types")} className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-700 transition">
              Publication Types
            </button>
            <button onClick={() => scrollToSection("categories")} className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-700 transition">
              Article Categories
            </button>
            <button onClick={() => scrollToSection("limits")} className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-700 transition">
              Word Limits
            </button>
            <button onClick={() => scrollToSection("citations")} className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-700 transition">
              Citation Standard (APA 7th)
            </button>
            <button onClick={() => scrollToSection("review")} className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-700 transition">
              Review Process
            </button>
          </div>
        </div>
      </section>


      {/* ==================== GUIDELINES SECTIONS ==================== */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-10">

        {/* 1. PUBLICATION TYPES */}
        <section id="types" className="scroll-mt-28">
          <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">1. Publication Types</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Attributed Publication</h3>
                  <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 text-[10px]">Standard</Badge>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Attributed directly to the writer. The author’s name and institutional affiliation will appear with the published article. A brief bio must be submitted during manuscript intake.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Anonymous Publication</h3>
                  <Badge variant="outline" className="border-slate-300 text-slate-700 bg-white text-[10px]">Protected</Badge>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Writers may request anonymity to avoid institutional or political backlash. Submissions are reviewed with identical double-anonymized standards without disclosing author identity.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* 2. ARTICLE CATEGORIES */}
        <section id="categories" className="scroll-mt-28">
          <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">2. Article Categories</h2>
                <p className="text-xs text-slate-500">Explore the five primary non-fiction formats accepted by the journal</p>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Category 1 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" /> Opinion Articles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Opinion articles sit between standard op-eds and full research papers. Key ideas and claims must be supported by accessible, valid citations. Typically focused on one central thesis argument.
                </p>
              </div>

              {/* Category 2 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Scale className="h-4 w-4 text-indigo-600" /> Law Review Articles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Requires additional statutory or case law support. Authors may inspect statutes, legislative acts, judicial decisions, or specific legal phrasing to argue for legislative or administrative reform.
                </p>
              </div>

              {/* Category 3 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-sky-600" /> Institutional Review Articles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Comments on educational policies, administrative frameworks, and institutional practices. Encourages constructive discourse on higher education without institutional bias.
                </p>
              </div>

              {/* Category 4 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-emerald-600" /> Book Review Articles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Goes beyond mere summary to critically evaluate the strengths, evidentiary gaps, and contemporary relevance of non-fiction classical or modern texts.
                </p>
              </div>

              {/* Category 5 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600" /> Response Articles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structured academic responses to previously published articles in the Periodical. Given editorial priority to encourage active academic discourse. Tone must remain respectful and evidence-based.
                </p>
              </div>

            </div>
          </Card>
        </section>

        {/* 3. WORD LIMITS */}
        <section id="limits" className="scroll-mt-28">
          <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">3. Word Limits</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 text-center space-y-1">
                <div className="text-xs text-blue-700 font-bold uppercase tracking-wider">Book Reviews</div>
                <div className="text-2xl font-black text-slate-900">800 – 1,500</div>
                <div className="text-xs text-slate-500">Words (including citations)</div>
              </div>

              <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-center space-y-1">
                <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">All Other Articles</div>
                <div className="text-2xl font-black text-slate-900">1,200 – 2,000</div>
                <div className="text-xs text-slate-500">Words (including references)</div>
              </div>
            </div>
          </Card>
        </section>

        {/* 4. CITATION STANDARDS */}
        <section id="citations" className="scroll-mt-28">
          <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">4. Citation & Support Guidelines (APA 7th)</h2>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed pt-1">
              <p>
                All manuscripts must adhere to <strong>APA 7th Edition</strong> citation standards. Key arguments, empirical claims, and legal references must cite credible primary or secondary sources.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-semibold text-slate-900">General Citation Rules:</div>
                <ul className="list-disc ml-5 space-y-1 text-slate-600">
                  <li>In-text parenthetical citations: (Author, Year, p. Page)</li>
                  <li>Incorporate full reference list at the end of the manuscript</li>
                  <li>Background or common-knowledge facts do not require citation unless essential to the thesis</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* 5. REVIEW PROCESS & OTHER POLICIES */}
        <section id="review" className="scroll-mt-28">
          <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">5. Review Process & Integrity Policies</h2>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">Double-Anonymized Peer Review</h3>
                <p>
                  To ensure complete impartiality, writer identities are scrubbed before evaluation, and reviewers remain completely anonymous to authors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Co-Authoring</div>
                  <p className="text-slate-500">Up to two student co-authors allowed per submission.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">AI Policy</div>
                  <p className="text-slate-500">AI-generated content is not permitted; assistance must be disclosed.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Originality</div>
                  <p className="text-slate-500">Must be original work not submitted or published elsewhere.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

      </main>


      {/* ==================== BOTTOM SUBMIT CALLOUT ==================== */}
      <section className="py-16 bg-slate-50 border-t border-slate-100 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Ready to submit your manuscript?</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ensure your paper meets the word limits and APA 7th standards before submitting.
          </p>
          <div className="pt-2">
            <Link href="/submit">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm px-7 h-11 shadow-sm">
                Submit Your Paper <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================== FOOTER ==================== */}
      <footer className="py-10 border-t border-slate-100 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="font-semibold text-slate-700">The College Periodical</p>
          <p>© {new Date().getFullYear()} All Rights Reserved. Author & Contributor Guidelines.</p>
        </div>
      </footer>

    </div>
  )
}
