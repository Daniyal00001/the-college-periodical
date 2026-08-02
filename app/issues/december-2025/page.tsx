"use client"

import NavbarHeader from "@/components/NavbarHeader"

import { useState, useEffect } from "react"
import { Snowflake, Clock, Calendar, FileText, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function December2025Issue() {
  const [decemberArticles, setDecemberArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles")
        if (res.ok) {
          const data = await res.json()
          setDecemberArticles(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error("Error fetching December articles:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-800 font-sans">
      
      {/* HEADER NAVBAR */}
      <NavbarHeader
        subtitle="❄️ December 2025 Edition"
        backUrl="/"
        backText="Home"
      />

      {/* HERO SECTION (LIGHT ACADEMIC THEME) */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-blue-100/70 via-white to-blue-50/40 text-gray-900 border-b border-gray-200">
        
        {/* Floating Ambient Glow & Snowflakes */}
        <div className="absolute top-0 right-10 z-0 pointer-events-none opacity-40">
          <Snowflake className="text-blue-300 w-28 h-28 animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-10 z-0 pointer-events-none opacity-30">
          <Snowflake className="text-indigo-300 w-36 h-36 animate-pulse" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-xs font-bold text-blue-800 uppercase tracking-widest">
              <Calendar className="h-4 w-4 text-blue-600" />
              Volume I — Issue 1 (Winter Release)
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              December 2025 Issue: <br />
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Perspective & Paradigm Shifts
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
              Welcome to the inaugural December 2025 edition of <strong>The College Periodical</strong>. 
              Featuring rigorous student research, legal reviews, economic critiques, and philosophical inquiries submitted by emerging writers.
            </p>

            {/* Status Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Peer Reviews Active
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Clock className="h-3.5 w-3.5 text-blue-600" /> Rolling Publication In Progress
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-800 text-xs font-semibold border border-indigo-200">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" /> Double-Anonymized Standards
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/submit">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-md shadow-blue-600/20">
                  Submit Manuscript for Dec 2025 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/guidelines">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100">
                  Read Editorial Guidelines
                </Button>
              </Link>
            </div>

          </motion.div>

        </div>
      </section>

      {/* THEMATIC FOCUS AREAS */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Curated Subject Tracks
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            December 2025 Thematic Focus Areas
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            The December 2025 edition accepts submissions across four primary academic tracks:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-6 border-l-4 border-l-blue-600">
            <CardHeader className="p-0 pb-3">
              <Badge className="w-fit bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-semibold mb-2">
                Track 01
              </Badge>
              <CardTitle className="text-xl font-bold text-gray-900">
                Political Economy & Institutional Governance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-xs text-gray-600 leading-relaxed">
              Critical analyses of state policies, economic structures, institutional reform, global trade dynamics, and public administration.
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-6 border-l-4 border-l-indigo-600">
            <CardHeader className="p-0 pb-3">
              <Badge className="w-fit bg-indigo-100 text-indigo-800 hover:bg-indigo-200 text-xs font-semibold mb-2">
                Track 02
              </Badge>
              <CardTitle className="text-xl font-bold text-gray-900">
                Legal Analysis & Constitutional Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-xs text-gray-600 leading-relaxed">
              Examinations of judicial precedent, constitutional law, human rights frameworks, legislative developments, and comparative jurisprudence.
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-6 border-l-4 border-l-sky-600">
            <CardHeader className="p-0 pb-3">
              <Badge className="w-fit bg-sky-100 text-sky-800 hover:bg-sky-200 text-xs font-semibold mb-2">
                Track 03
              </Badge>
              <CardTitle className="text-xl font-bold text-gray-900">
                Modern Philosophy & Applied Ethics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-xs text-gray-600 leading-relaxed">
              Explorations of bioethics, digital privacy, technological ethics, moral philosophy, and contemporary societal dilemmas.
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-6 border-l-4 border-l-emerald-600">
            <CardHeader className="p-0 pb-3">
              <Badge className="w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-semibold mb-2">
                Track 04
              </Badge>
              <CardTitle className="text-xl font-bold text-gray-900">
                Literature, Culture & Book Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-xs text-gray-600 leading-relaxed">
              Literary critiques, reviews of foundational texts, historical essays, and cultural commentary exploring identity and rhetoric.
            </CardContent>
          </Card>

        </div>

      </section>


      {/* DECEMBER PUBLISHED & ACCEPTED MANUSCRIPTS */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase mb-2">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              Preprints & Accepted Articles
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              December 2025 Issue Accepted Works
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Articles accepted during the December review cycle published under the rolling release model:
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500 text-sm">Loading articles...</div>
          ) : decemberArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {decemberArticles.map((article) => (
                <Card
                  key={article.id}
                  className="bg-gray-50/50 border-gray-200 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <CardHeader className="pb-3">
                    <Badge variant="outline" className="w-fit text-blue-700 border-blue-200 bg-blue-50 text-xs mb-2">
                      {article.category_name || article.category}
                    </Badge>
                    <Link href={`/article/${article.slug}`}>
                      <CardTitle className="text-base font-bold text-gray-900 hover:text-blue-700 transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {article.excerpt || (article.content ? article.content.substring(0, 100) + "..." : "")}
                    </p>
                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">
                        {article.author_name || article.author || "Contributor"}
                      </span>
                      <Link href={`/article/${article.slug}`}>
                        <span className="text-xs font-bold text-blue-700 hover:underline">Read Article →</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 text-gray-600">
              <Snowflake className="h-10 w-10 text-blue-500 mx-auto mb-3" />
              <p className="font-bold text-gray-800">Manuscripts undergoing peer review for December 2025.</p>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                Be among the first authors featured in our December release by submitting your manuscript today!
              </p>
              <Link href="/submit" className="inline-block mt-4">
                <Button className="bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm">
                  Submit Your Paper
                </Button>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-xs text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} The College Periodical. All Rights Reserved.
      </footer>

    </div>
  )
}
