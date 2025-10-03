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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Custom Logo */}
              <img
                src="/logo.png" // Replace with your actual logo path
                alt="The College Periodical Logo"
                className="h-20 w-20 mr-2 object-contain"
                onError={(e) => {
                  // Fallback to icon if logo doesn't load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              {/* Fallback Icon (hidden by default) */}
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" style={{ display: 'none' }} />
              
              <h1 className="text-2xl font-bold text-gray-900">
                The College Periodical
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8 ml-auto">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="text-gray-600 hover:text-blue-600"
              >
                Articles
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-blue-600"
              >
                Publication Flow
              </Link>
              <Link
                href="/submit"
                className="text-gray-600 hover:text-blue-600"
              >
                Submit Article
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Voice, Your Stories, Your Campus
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The College Periodical is your platform to share ideas,
              experiences, and insights that matter to our campus community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/submit">
                <Button size="lg" className="w-full sm:w-auto">
                  Submit Your Article
                </Button>
              </Link>
              <Link href="/articles">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent"
                >
                  Browse Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">150+</div>
              <div className="text-gray-600">Published Articles</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Student Writers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">1</div>
              <div className="text-gray-600">Year Running</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Law Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
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
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
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
                    className="text-xl hover:text-blue-600 cursor-pointer"
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
                      <span className="text-sm text-gray-600">{article.author}</span>
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
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-auto p-4 backdrop-blur-sm">
    <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 z-10 transition-all duration-200"
        onClick={() => setSelectedArticle(null)}
      >
        <X className="h-6 w-6" />
      </button>

      {/* Hero Image */}
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

      {/* Content */}
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {selectedArticle.title}
          </h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="h-4 w-4" />
            <span className="font-medium">By {selectedArticle.author}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line border-l-4 border-blue-500 pl-6 bg-blue-50/30 p-6 rounded-r-lg">
            {selectedArticle.content}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 text-center">
            Classic Legal Literature • Historical Significance
          </div>
        </div>
      </div>
    </div>
  </div>
)}


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Left - Logo & description */}
            <div className="md:text-left">
              <div className="flex items-center mb-4 justify-center md:justify-start">
                <img
                  src="/logo.png"
                  alt="The College Periodical Logo"
                  className="h-8 w-8 mr-3 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <BookOpen className="h-8 w-8 text-blue-400 mr-3" style={{ display: 'none' }} />
                <h4 className="text-xl font-bold">The College Periodical</h4>
              </div>
              <p className="text-gray-400">
                Empowering student voices and fostering meaningful conversations
                within our campus community.
              </p>
            </div>

            {/* Center - Quick Links */}
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

            {/* Right - Contact */}
            <div className="md:text-right">
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Email: thecollegeperiodical@gmail.com</li>
                {/* <li>LAW DEPARTMENT</li> */}
                <li>Government College University</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
               The College Periodical. All
               rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}