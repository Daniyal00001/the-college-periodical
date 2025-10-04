"use client";

import { useState } from "react";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Sample articles data
const featuredArticles = [
  {
    id: 1,
    title: "The Future of Higher Education: Embracing Digital Transformation",
    excerpt:
      "How universities are adapting to the digital age and what it means for students and faculty.",
    author: "Sarah Johnson",
    date: "2024-03-15",
    category: "Education",
    readTime: "8 min read",
    image: "/university-campus-digital.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Student Mental Health: Breaking the Stigma",
    excerpt:
      "A comprehensive look at mental health resources and support systems available on campus.",
    author: "Michael Chen",
    date: "2024-03-12",
    category: "Health",
    readTime: "6 min read",
    image: "/students-mental-health-support.jpg",
    featured: true,
  },
];

// Famous law articles hardcoded
const lawArticles = [
  {
    id: 101,
    title: "The Spirit of the Laws",
    author: "Montesquieu",
    excerpt:
      "A foundational text in political theory discussing the separation of powers in government.",
    content: `Montesquieu's "The Spirit of the Laws" is a seminal work in jurisprudence and political theory.
It explores how laws vary according to climate, culture, and government structure. His idea of separation
of powers deeply influenced modern democratic constitutions.`,
    image: "/montesquieu.jpg",
  },
  {
    id: 102,
    title: "Commentaries on the Laws of England",
    author: "William Blackstone",
    excerpt:
      "A definitive guide to English law that influenced legal systems worldwide.",
    content: `William Blackstone's "Commentaries on the Laws of England" provides an extensive overview of English
law in the 18th century. It systematically explains legal principles, rights, and property laws, becoming
essential reading for lawyers and scholars worldwide.`,
    image: "/blackstone.jpg",
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Title */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="The College Periodical Logo"
                className="h-20 w-20 mr-2 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "block";
                }}
              />
              <BookOpen
                className="h-8 w-8 text-blue-700 mr-3"
                style={{ display: "none" }}
              />
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                The College Periodical
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 ml-auto">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-700 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                Publication Flow
              </Link>
              <Link
                href="/submit"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                Submit Article
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-blue-700 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="px-4 py-3 flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-700 font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="text-gray-600 hover:text-blue-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-blue-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Publication Flow
              </Link>
              <Link
                href="/submit"
                className="text-gray-600 hover:text-blue-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Submit Article
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </header>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100 py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Your Voice, Your Stories, Your Campus
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            The College Periodical is your platform to share ideas, experiences,
            and insights that matter to our campus community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white shadow-md"
              >
                Submit Your Article
              </Button>
            </Link>
            <Link href="/articles">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-blue-700 text-blue-700 hover:bg-blue-50"
              >
                Browse Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
            Our Startup Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900">20+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900">10+</div>
              <div className="text-gray-600">Student Writers</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4">
                <Calendar className="h-6 w-6 text-orange-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900">2025</div>
              <div className="text-gray-600">Year We Started</div>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-10 max-w-2xl mx-auto">
            We’ve just begun our journey — and every new article, writer, and
            reader brings us one step closer to building a thriving creative
            community at{" "}
            <span className="font-semibold text-blue-700">
              The College Periodical
            </span>
            .
          </p>
        </div>
      </section>

      {/* Famous Law Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Famous Law Articles
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read two of the most influential law texts in history.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {lawArticles.map((article, index) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200"
              >
                <div className="aspect-video bg-gray-200">
                  <img
                    src={
                      index === 0
                        ? "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=80"
                        : "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle
                    className="text-xl text-gray-900 hover:text-blue-700 cursor-pointer font-semibold"
                    onClick={() => setSelectedArticle(article)}
                  >
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {article.author}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {typeof window !== "undefined" && selectedArticle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-200">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 z-10 transition-all duration-200"
              onClick={() => setSelectedArticle(null)}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
              <img
                src={
                  selectedArticle.id === 101
                    ? "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=80"
                    : "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                }
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3 leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="font-medium">
                    By {selectedArticle.author}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line border-l-4 border-blue-700 pl-6 bg-blue-50/30 p-6 rounded-r-lg">
                  {selectedArticle.content}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                Classic Legal Literature • Historical Significance
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Left */}
            <div className="md:text-left">
              <div className="flex items-center mb-4 justify-center md:justify-start">
                <img
                  src="/logo.png"
                  alt="The College Periodical Logo"
                  className="h-8 w-8 mr-3 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "block";
                  }}
                />
                <BookOpen
                  className="h-8 w-8 text-blue-400 mr-3"
                  style={{ display: "none" }}
                />
                <h4 className="text-xl font-semibold">
                  The College Periodical
                </h4>
              </div>
              <p className="text-gray-400">
                Empowering student voices and fostering meaningful conversations
                within our campus community.
              </p>
            </div>

            {/* Center */}
            <div className="md:text-center">
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/articles" className="hover:text-white">
                    All Articles
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Publication Flow
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-white">
                    Submit Article
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right */}
            <div className="md:text-right">
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  📧 Email:{" "}
                  <a
                    href="mailto:thecollegeperiodical@gmail.com"
                    className="hover:text-blue-400 transition-colors"
                  >
                    thecollegeperiodical@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              The College Periodical. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
