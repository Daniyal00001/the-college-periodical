"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  X,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  ShieldCheck,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([])
  const [loadingArticles, setLoadingArticles] = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/articles")
        if (res.ok) {
          const data = await res.json()
          setFeaturedArticles(Array.isArray(data) ? data.slice(0, 2) : [])
        }
      } catch (err) {
        console.error("Failed to fetch featured articles:", err)
      } finally {
        setLoadingArticles(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ==================== SIMPLE SLEEK HEADER WITH DROPDOWN ==================== */}
      <header className="border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo + Title */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="The College Periodical Logo"
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  The College Periodical
                </h1>
                <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider">
                  Academic Student Journal
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              
              <Link
                href="/guidelines"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
              >
                Guidelines
              </Link>

              <Link
                href="/articles"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
              >
                Articles
              </Link>

              <Link
                href="/issues/december-2025"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 py-2"
              >
                <span>❄️</span> Dec 2025
              </Link>

              {/* ABOUT US WITH HOVER DROPDOWN */}
              <div
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown("about")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 focus:outline-none">
                  About Us
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {activeDropdown === "about" && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 p-1">
                    <Link
                      href="/about"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      About The Periodical
                    </Link>
                    <Link
                      href="/about/team"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <Users className="h-4 w-4 text-indigo-600" />
                      Meet Our Editorial Team
                    </Link>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <Link href="/submit">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm px-5 shadow-sm">
                    Submit Paper
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium text-sm">
                    Login
                  </Button>
                </Link>
              </div>

            </nav>

            {/* Mobile Hamburger Toggle */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-lg">
            <Link href="/submit" className="block w-full py-2.5 text-center bg-blue-600 text-white font-semibold rounded-xl" onClick={() => setMenuOpen(false)}>
              Submit Paper
            </Link>
            <Link href="/guidelines" className="block text-slate-700 font-medium text-sm" onClick={() => setMenuOpen(false)}>
              Submission Guidelines
            </Link>
            <Link href="/articles" className="block text-slate-700 font-medium text-sm" onClick={() => setMenuOpen(false)}>
              Browse Articles
            </Link>
            <Link href="/issues/december-2025" className="block text-slate-700 font-medium text-sm" onClick={() => setMenuOpen(false)}>
              December 2025 Issue
            </Link>
            <Link href="/about" className="block text-slate-700 font-medium text-sm" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/about/team" className="block text-slate-700 font-medium text-sm pl-4 text-blue-600" onClick={() => setMenuOpen(false)}>
              ↳ Meet Our Editorial Team
            </Link>
            <Link href="/login" className="block text-slate-700 font-medium text-sm" onClick={() => setMenuOpen(false)}>
              Portal Login
            </Link>
          </div>
        )}
      </header>


      {/* ==================== NOTICE BANNER BELOW NAVBAR ==================== */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2.5 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2">
        <ShieldCheck className="h-4 w-4 text-blue-400 flex-shrink-0" />
        <span>
          <strong>Notice:</strong> The Portal Login is for <strong>Journal Administration & Peer Reviewers</strong>. Readers and contributors can browse articles or submit manuscripts without logging in.
        </span>
      </div>


      {/* ==================== SLEEK HERO SECTION ==================== */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-blue-50/60 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Double-Anonymized Peer-Reviewed Journal
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your Voice. Your Research. <br />
            <span className="text-blue-600">Your Periodical.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            The College Periodical provides students a platform to publish analytical essays, legal reviews, and opinion pieces through double-blind peer review.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/submit">
              <Button size="lg" className="w-full sm:w-auto h-12 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">
                Submit Your Article <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/articles">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-7 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
                Browse Articles
              </Button>
            </Link>
          </div>

          {/* Simple 3 Key Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-12 border-t border-slate-100 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium">Double-Blind</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">4 Issues</div>
              <div className="text-xs text-slate-500 font-medium">Per Year</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">2-4 Wks</div>
              <div className="text-xs text-slate-500 font-medium">Review Time</div>
            </div>
          </div>

        </div>
      </section>


      {/* ==================== ABOUT PLATFORM CARD (LIGHT BLUE) ==================== */}
      <section className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="p-6 sm:p-8 bg-blue-50/90 border border-blue-200 text-slate-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-xs text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" /> About Our Platform
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Bridging Undergraduate Thought & Published Scholarship
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              The Periodical fosters critical inquiry across law, politics, social sciences, and humanities through double-anonymized peer review. 
              Our mission is to bridge undergraduate writing capacities with established academic publication standards, providing a structured, 
              constructive platform for student scholars to publish high-quality opinion essays, legal reviews, institutional critiques, and analytical research pieces.
            </p>
          </div>
          <Link href="/about">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs h-10 px-5 shadow-sm flex-shrink-0">
              Learn More About Us →
            </Button>
          </Link>
        </div>
      </section>


      {/* ==================== FEATURED PUBLICATIONS ==================== */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Publications</h2>
            <p className="text-xs text-slate-500 mt-0.5">Explore recent articles reviewed and published by our editorial team</p>
          </div>
          <Link href="/articles" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            All Articles <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loadingArticles ? (
          <div className="text-center py-12 text-slate-400 text-sm">Loading articles...</div>
        ) : featuredArticles.length > 0 ? (
          <div className="space-y-4">
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="bg-white border-slate-200 hover:border-blue-300 transition-all rounded-xl p-5 shadow-none hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[11px] font-semibold">
                        {article.category_name || article.category}
                      </Badge>
                      <span className="text-[11px] text-slate-400">
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <Link href={`/article/${article.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {article.excerpt || (article.content ? article.content.substring(0, 140) + "..." : "")}
                    </p>
                  </div>
                  <Link href={`/article/${article.slug}`} className="flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600 hover:underline">Read →</span>
                  </Link>
                </div>
              </Card>
            ))}

            <div className="pt-2 text-center">
              <Link href="/articles" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                View All Published Articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
            <BookOpen className="h-8 w-8 text-slate-400 mx-auto mb-2 opacity-60" />
            <p className="font-semibold text-slate-800 text-sm">Articles are currently under peer review.</p>
            <p className="text-xs text-slate-500 mt-1">Check back soon or submit your manuscript!</p>
          </div>
        )}

      </section>


      {/* ==================== SIMPLE SUBMIT CALLOUT ==================== */}
      <section className="py-16 bg-slate-50 border-t border-slate-100 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Ready to publish your work?</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            We welcome opinion essays, book reviews, law papers, and analytical non-fiction articles from undergraduate students.
          </p>
          <div className="pt-2">
            <Link href="/submit">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm px-6 h-11 shadow-sm">
                Submit Your Paper
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================== FOOTER ==================== */}
      <footer className="py-10 border-t border-slate-100 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="font-semibold text-slate-700">The College Periodical</p>
          <p>© {new Date().getFullYear()} All Rights Reserved. Empowering student scholarship.</p>
        </div>
      </footer>

    </div>
  )
}