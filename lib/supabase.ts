// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase URL or Key is missing. Check your .env.local")
}

// console.log("✅ Supabase URL:", supabaseUrl)
// console.log("✅ Supabase Key exists:", !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
