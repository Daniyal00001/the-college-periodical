"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, ShieldAlert, Loader2 } from "lucide-react"

export default function AdminDispatcher() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) {
          router.replace("/login")
          return
        }

        const data = await res.json()
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user))
          if (data.user.role === "super_admin") {
            router.replace("/admin/super")
          } else if (data.user.role === "reviewer") {
            router.replace("/admin/reviewer")
          } else {
            router.replace("/login")
          }
        } else {
          router.replace("/login")
        }
      } catch (err) {
        console.error("Session verification failed:", err)
        setError("Failed to authenticate session")
        router.replace("/login")
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-sm">
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="The College Periodical Logo"
            className="h-20 w-20 object-contain animate-pulse"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
        </div>
        {loading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-gray-600 font-medium">Verifying authorization...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center space-y-2 text-red-600">
            <ShieldAlert className="h-6 w-6" />
            <p className="font-medium">{error}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}