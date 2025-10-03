import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
// import favicon from '../public/favicon.ico'
import favicon from '../public/favicon.ico'

// ✅ Add favicon in metadata
export const metadata: Metadata = {
  title: 'thecollegeperiodical',
  description: 'Created by Daniyal',
  generator: 'hehe',
  icons: {
    icon: '/public/favicon.ico', // place your favicon in /public folder
    apple: '/public/favicon-32x32.png', // optional, for Apple devices
    shortcut: '/public/favicon.ico',
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
