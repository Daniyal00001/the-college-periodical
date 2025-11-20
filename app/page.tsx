"use client"

import { useState } from "react"
import { BookOpen, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="The College Periodical"
                className="h-20 w-20 mr-2 object-contain"
                onError={(e) => e.currentTarget.style.display = "none"}
              />
              <h1 className="text-2xl font-semibold text-gray-900">The College Periodical</h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {/* Instructions Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown("instructions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-gray-700 hover:text-blue-700 font-medium flex items-center gap-1">
                  Instructions
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === "instructions" && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link href="/guidelines" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Guidelines
                    </Link>
                    <Link href="/categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Publication Flow
                    </Link>
                  </div>
                )}
              </div>

              {/* Submit Article */}
              <Link href="/submit" className="px-4 py-2 text-gray-700 hover:text-blue-700 font-medium">
                Submit
              </Link>

              {/* Articles */}
              <Link href="/articles" className="px-4 py-2 text-gray-700 hover:text-blue-700 font-medium">
                Articles
              </Link>

              {/* Issues Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown("issues")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-gray-700 hover:text-blue-700 font-medium flex items-center gap-1">
                  Issues
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === "issues" && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link href="/issues/december-2025" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      December 2025
                    </Link>
                  </div>
                )}
              </div>

              {/* About Dropdown */}
         <div 
  className="relative group"
  onMouseEnter={() => setActiveDropdown("about")}
  onMouseLeave={() => setActiveDropdown(null)}
>
  <button className="px-4 py-2 text-gray-700 hover:text-blue-700 font-medium flex items-center gap-1">
    About
    <ChevronDown className="h-4 w-4" />
  </button>
  {activeDropdown === "about" && (
    <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <Link
        href="/about/team"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        About Our Team
      </Link>
      <Link
        href="/about"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        About Us
      </Link>
    </div>
  )}
</div>

            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-blue-700"
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-2">
              <details className="group">
                <summary className="font-medium text-gray-700 cursor-pointer list-none">Instructions</summary>
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/guidelines" className="block text-gray-600" onClick={() => setMenuOpen(false)}>Guidelines</Link>
                  <Link href="/categories" className="block text-gray-600" onClick={() => setMenuOpen(false)}>Publication Flow</Link>
                </div>
              </details>
              <Link href="/submit" className="block text-gray-700" onClick={() => setMenuOpen(false)}>Submit Article</Link>
              <Link href="/articles" className="block text-gray-700" onClick={() => setMenuOpen(false)}>Articles</Link>
              <details className="group">
                <summary className="font-medium text-gray-700 cursor-pointer list-none">Issues</summary>
                <div className="ml-4 mt-2">
                  <Link href="/issues/december-2025" className="block text-gray-600" onClick={() => setMenuOpen(false)}>December 2025</Link>
                </div>
              </details>
              <details className="group">
                <summary className="font-medium text-gray-700 cursor-pointer list-none">About</summary>
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/about/team" className="block text-gray-600" onClick={() => setMenuOpen(false)}>About Our Team</Link>
                  <Link href="/about" className="block text-gray-600" onClick={() => setMenuOpen(false)}>About Us</Link>
                </div>
              </details>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Your Voice, Your Stories, Your Campus
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            The College Periodical is your platform to share ideas, experiences, and insights that matter.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/submit">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800">Submit Your Article</Button>
            </Link>
            <Link href="/articles">
              <Button variant="outline" size="lg">Browse Articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of homepage content... */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12">Our Startup Journey</h2>
          <div className="flex justify-center">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm w-64">
              <div className="text-3xl font-bold text-gray-900 mb-2">2025</div>
              <div className="text-gray-600">Year We Started</div>
            </div>
          </div>
          <p className="text-gray-600 mt-10 max-w-2xl mx-auto">
            We've just begun our journey — every new article, writer, and reader brings us closer to building a thriving creative community.
          </p>
        </div>
      </section>


      

      <section className="py-24 bg-gray-100 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Submissions Are Open Now!</h2>
          <p className="text-lg text-gray-700">
            Share your voice with The College Periodical — a platform for creative, critical, and thoughtful student writing.
          </p>
        </div>
      </section>

      {/* Footer */}
<footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 py-16">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* ====== GRID AREA ====== */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-start">
      
      {/* Column 1 - Brand */}
      <div className="flex flex-col items-center md:items-start space-y-4">
        <h4 className="text-2xl font-bold text-white tracking-tight">
          The College Periodical
        </h4>
        <p className="text-gray-400 leading-relaxed max-w-sm">
          Empowering student voices and fostering meaningful conversations through creativity and expression.
        </p>
      </div>

      {/* Column 2 - Links */}
      <div className="flex flex-col items-center space-y-4">
        <h5 className="text-lg font-semibold text-white">Quick Links</h5>
        <ul className="space-y-2">
          <li><Link href="/articles" className="hover:text-blue-400 transition-colors">All Articles</Link></li>
          <li><Link href="/submit" className="hover:text-blue-400 transition-colors">Submit Article</Link></li>
          <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
          <li><Link href="/about/team" className="hover:text-blue-400 transition-colors">Our Team</Link></li>
        </ul>
      </div>

      {/* Column 3 - Contact & Social */}
      <div className="flex flex-col items-center md:items-end space-y-4">
        <h5 className="text-lg font-semibold text-white">Contact</h5>
        <a
          href="mailto:thecollegeperiodical@gmail.com"
          className="text-gray-400 hover:text-blue-400 transition-colors"
        >
          thecollegeperiodical@gmail.com
        </a>
   <div className="flex justify-center md:justify-end gap-6 mt-2">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/thecollegeperiodical?igsh=MXUzb2k0d3loeGZ3NQ=="
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-transform transform hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/16JcDSk5Rf/?mibextid=wwXIfr"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-transform transform hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="h-6 w-6"
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6V12H17l-.4 3h-2.9v7A10 10 0 0 0 22 12z" />
    </svg>
  </a>
</div>

      </div>
    </div>

    {/* ====== Bottom Line ====== */}
    <div className="border-t border-gray-700 mt-12 pt-6 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} The College Periodical — All Rights Reserved.
      </p>
    </div>
  </div>
</footer>


    </div>
  )
}