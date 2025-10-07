import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// ✅ No need to import favicon manually
// Just make sure favicon.ico is inside /public

export const metadata: Metadata = {
  title: 'thecollegeperiodical',
  description: 'Created by Daniyal',
  generator: 'hehe',
  icons: {
    icon: '/favicon.ico', 
    apple: '/favicon-32x32.png', 
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
