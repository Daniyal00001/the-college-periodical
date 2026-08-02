"use client"

import { Users, Code, PenTool, Share2, ArrowLeft, Sparkles, ShieldCheck, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import NavbarHeader from "@/components/NavbarHeader"

export default function TeamPage() {
  const teams = [
    {
      title: "Administration & Leadership",
      icon: Users,
      badge: "Executive Board",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
      members: ["Nawall Shehraz", "Noor ul Huda Pervaiz", "Syed Jawad Arshad"],
      description: "Overseeing journal operations, institutional relations, charter adherence, and strategic growth."
    },
    {
      title: "Editorial Board",
      icon: PenTool,
      badge: "Peer Review & Copyediting",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      iconBg: "bg-indigo-100 text-indigo-600",
      members: ["Aly Osjah Bukhari", "Zara Qazi", "Syed Jawad Arshad"],
      description: "Managing double-anonymized peer review pipelines, article evaluation, and APA 7th style copyediting."
    },
    {
      title: "Technical & Systems Team",
      icon: Code,
      badge: "Engineering & Platform",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-600",
      members: ["Muhammad Daniyal Tallat"],
      description: "Developing and maintaining the peer review platform, database infrastructure, and web security."
    },
    {
      title: "Outreach & Student Relations",
      icon: Share2,
      badge: "Community Engagement",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      iconBg: "bg-rose-100 text-rose-600",
      members: ["Noor ul Huda Pervaiz", "Nawall Shehraz"],
      description: "Engaging student writers across universities, managing social channels, and guiding manuscript submissions."
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ==================== HEADER NAVBAR ==================== */}
      <NavbarHeader
        subtitle="Editorial Board & Team"
        backUrl="/about"
        backText="About Us"
      />


      {/* ==================== HERO SECTION ==================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Meets The Minds Behind The Periodical
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Editorial & Administrative Team
          </h1>
          
          <p className="text-slate-600 text-base max-w-2xl mx-auto font-normal leading-relaxed">
            The dedicated team of student editors, administrators, engineers, and outreach leaders bringing every article and edition to publication.
          </p>
        </div>
      </section>


      {/* ==================== TEAM GRID ==================== */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((t, i) => (
            <Card key={i} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${t.iconBg}`}>
                    <t.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className={`text-xs font-semibold ${t.badgeColor}`}>
                    {t.badge}
                  </Badge>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.description}</p>
                </div>

                <div className="pt-2 space-y-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Team Members:</span>
                  <div className="flex flex-wrap gap-2">
                    {t.members.map((m, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/60"
                      >
                        <UserCheck className="h-3.5 w-3.5 text-blue-600" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </Card>
          ))}
        </div>
      </main>


      {/* ==================== FOOTER ==================== */}
      <footer className="py-10 border-t border-slate-100 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="font-semibold text-slate-700">The College Periodical</p>
          <p>© {new Date().getFullYear()} All Rights Reserved. Editorial & Team Directory.</p>
        </div>
      </footer>

    </div>
  )
}
