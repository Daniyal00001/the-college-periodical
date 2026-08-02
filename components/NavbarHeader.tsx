"use client"

import Link from "next/link"
import { ArrowLeft, LogOut, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarHeaderProps {
  subtitle: string
  backUrl?: string
  backText?: string
  user?: { name: string; role?: string } | null
  onLogout?: () => void
}

export default function NavbarHeader({
  subtitle,
  backUrl = "/",
  backText = "Home",
  user,
  onLogout,
}: NavbarHeaderProps) {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-3">
          
          {/* Logo + Brand Name + Subtitle */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <img
              src="/logo.png"
              alt="The College Periodical Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform group-hover:scale-105 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight truncate">
                The College Periodical
              </h1>
              <p className="text-[10px] sm:text-xs text-blue-600 font-semibold uppercase tracking-wider truncate leading-tight">
                {subtitle}
              </p>
            </div>
          </Link>

          {/* Right Actions (Back Button or Admin User + Logout) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {onLogout ? (
              <>
                {user && (
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    <span className="truncate">{user.name}</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={onLogout}
                  className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                >
                  <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-slate-500" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href={backUrl} className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  {backText}
                </Button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}
