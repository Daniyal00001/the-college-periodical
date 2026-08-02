"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn, Eye, EyeOff, ArrowLeft, ShieldCheck, UserCheck, KeyRound, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const autofill = (email: string, pass: string) => {
    setFormData({ email, password: pass })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please verify your credentials.")
      }

      // Store user session state
      localStorage.setItem("user", JSON.stringify(data.user))
      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      // Redirect based on verified role
      if (data.user.role === "super_admin") {
        router.push("/admin/super")
      } else {
        router.push("/admin/reviewer")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-gray-100 flex flex-col justify-between text-gray-800 font-sans">
      
      {/* HEADER NAVBAR (Matching Website Theme) */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  The College Periodical
                </h1>
                <p className="text-xs text-blue-700 font-medium">Editorial & Peer Review Portal</p>
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

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <Card className="bg-white/90 backdrop-blur-md border border-blue-100/80 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-10 space-y-6">
              
              {/* Header with Prominent Visible Logo */}
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 shadow-inner">
                    <img
                      src="/logo.png"
                      alt="The College Periodical Logo"
                      className="h-20 w-20 object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  Secure System Login
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Enter your editorial or reviewer credentials to sign in
                </p>
              </div>

              {/* DEMO CREDENTIALS BOX */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-blue-900">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="h-3.5 w-3.5 text-blue-600" /> Quick Demo Credentials
                  </span>
                  <span className="text-[10px] bg-blue-200/60 px-2 py-0.5 rounded-full text-blue-800 uppercase tracking-wider font-semibold">
                    Recruiter Preview
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  
                  {/* Reviewer Demo */}
                  <div className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>Reviewer</span>
                      <button
                        type="button"
                        onClick={() => autofill("reviewer@gmail.com", "Reviewer@123")}
                        className="text-[10px] font-bold text-blue-600 hover:underline"
                      >
                        Fill ↓
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <p><span className="font-medium text-slate-400">Email:</span> reviewer@gmail.com</p>
                      <p><span className="font-medium text-slate-400">Pass:</span> Reviewer@123</p>
                    </div>
                  </div>

                  {/* Super Admin Demo */}
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>Super Admin</span>
                      <button
                        type="button"
                        onClick={() => autofill("admin@gmail.com", "Admin@123")}
                        className="text-[10px] font-bold text-indigo-600 hover:underline"
                      >
                        Fill ↓
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <p><span className="font-medium text-slate-400">Email:</span> admin@gmail.com</p>
                      <p><span className="font-medium text-slate-400">Pass:</span> Admin@123</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium leading-relaxed"
                >
                  {error}
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl h-12 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm text-sm"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl h-12 pr-11 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.99]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-500 font-medium">New Reviewer?</span>
                </div>
              </div>

              {/* Signup Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have a reviewer account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors"
                  >
                    Register as Reviewer
                  </Link>
                </p>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 text-center text-xs text-gray-500 border-t bg-white/50 backdrop-blur-sm">
        © {new Date().getFullYear()} The College Periodical. All rights reserved.
      </footer>

    </div>
  )
}