"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus, Eye, EyeOff, ArrowLeft, ShieldCheck, Check, X, UserCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { validatePassword } from "@/lib/passwordValidator"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const passwordVal = validatePassword(formData.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!passwordVal.isValid) {
      setError("Please ensure your password meets all security requirements below.")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Signup failed. Please try again.")
      }

      alert("Account created successfully! Redirecting to login.")
      router.push("/login")
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
                <p className="text-xs text-blue-700 font-medium">Reviewer Account Onboarding</p>
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
                  <UserCheck className="h-3.5 w-3.5 text-blue-600" />
                  Create Reviewer Account
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Sign Up
                </h2>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Register to participate in double-anonymized peer reviews
                </p>
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

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl h-11 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm text-sm"
                  />
                </div>

                {/* Email Address */}
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
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl h-11 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm text-sm"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl h-11 pr-11 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm text-sm"
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

                {/* Real-time Password Requirements Checklist */}
                {formData.password.length > 0 && passwordVal.checks && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1 text-xs"
                  >
                    <p className="font-semibold text-gray-700 mb-1">Password Requirements:</p>
                    <div className="grid grid-cols-1 gap-1">
                      <div className={`flex items-center gap-1.5 ${passwordVal.checks.minLength ? "text-green-700 font-medium" : "text-gray-500"}`}>
                        {passwordVal.checks.minLength ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-gray-400" />}
                        At least 8 characters
                      </div>
                      <div className={`flex items-center gap-1.5 ${passwordVal.checks.hasUpper ? "text-green-700 font-medium" : "text-gray-500"}`}>
                        {passwordVal.checks.hasUpper ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-gray-400" />}
                        At least one uppercase letter (A-Z)
                      </div>
                      <div className={`flex items-center gap-1.5 ${passwordVal.checks.hasLower ? "text-green-700 font-medium" : "text-gray-500"}`}>
                        {passwordVal.checks.hasLower ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-gray-400" />}
                        At least one lowercase letter (a-z)
                      </div>
                      <div className={`flex items-center gap-1.5 ${passwordVal.checks.hasNumber ? "text-green-700 font-medium" : "text-gray-500 font-normal"}`}>
                        {passwordVal.checks.hasNumber ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-gray-400" />}
                        At least one number (0-9)
                      </div>
                      <div className={`flex items-center gap-1.5 ${passwordVal.checks.hasSpecial ? "text-green-700 font-medium" : "text-gray-500 font-normal"}`}>
                        {passwordVal.checks.hasSpecial ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-gray-400" />}
                        At least one special character (!@#$%^&*)
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Role Note */}
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs text-blue-900 leading-relaxed">
                  You will be registered as a <strong>Reviewer</strong>. Super Admin can assign articles to you once logged in.
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || (formData.password.length > 0 && !passwordVal.isValid)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      <span>Sign Up</span>
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
                  <span className="bg-white px-3 text-gray-500 font-medium">Already Registered?</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors"
                  >
                    Login
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