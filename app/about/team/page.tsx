"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Code, PenTool, Share2 } from "lucide-react"

export default function TeamPage() {
  const teams = [
    {
      title: "Administration",
      icon: Users,
      members: ["Nawall Shehraz", "Noor ul Huda Pervaiz", "Syed Jawad Arshad"],
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Technical Team",
      icon: Code,
      members: ["Muhammad Daniyal Tallat"],
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Editors",
      icon: PenTool,
      members: ["Aly Osjah Bukhari", "Zara Qazi", "Syed Jawad Arshad"],
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Outreach",
      icon: Share2,
      members: ["Noor ul Huda Pervaiz", "Nawall Shehraz"],
      color: "from-pink-500 to-rose-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20 px-6 flex flex-col items-center">
      {/* ====== HEADER ====== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Meet Our Team
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The passionate individuals who bring{" "}
          <span className="font-semibold">The College Periodical</span> to life —
          every article, every edition.
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
      </motion.div>

      {/* ====== TEAM GRID ====== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-5xl">
        {teams.map((team, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex justify-center"
          >
            <Card className="w-full max-w-md hover:shadow-2xl transition-all duration-300 border-none bg-white/80 backdrop-blur-md rounded-2xl">
              <CardHeader className="pb-3 text-center">
                <CardTitle
                  className={`text-xl font-bold bg-gradient-to-r ${team.color} bg-clip-text text-transparent flex justify-center items-center gap-2`}
                >
                  <team.icon className="w-5 h-5" /> {team.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-2">
                {team.members.map((member, idx) => (
                  <p
                    key={idx}
                    className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                  >
                    {member}
                  </p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
