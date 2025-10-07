"use client"

import { Snowflake, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function December2025Issue() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Floating Snowflakes */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Snowflake className="absolute top-10 left-10 text-blue-300 w-10 h-10 animate-spin-slow" />
        <Snowflake className="absolute bottom-20 right-20 text-blue-400 w-8 h-8 animate-pulse" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-10 rounded-3xl backdrop-blur-xl bg-white/60 shadow-xl border border-white/30 max-w-2xl"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          December 2025 Issue
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Our upcoming issue is in progress — featuring thought-provoking articles, insightful opinions, and original contributions from our talented student writers❄️
        </p>

        <div className="flex items-center justify-center gap-2 text-blue-700 mb-6">
          <Clock className="w-5 h-5" />
          <span className="font-medium">Coming Soon...</span>
        </div>

    
      </motion.div>
    </div>
  )
}
