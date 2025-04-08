import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Job Board Application",
  description: "Find your next opportunity or post a job",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="border-b">
              <div className="container flex h-16 items-center justify-between py-4">
                <Link href="/" className="font-bold text-xl">
                  Job Board
                </Link>
                <nav className="flex items-center gap-6">
                  <Link href="/profile" className="text-sm font-medium hover:underline">
                    Profile
                  </Link>
                  <Link href="/post-job" className="text-sm font-medium hover:underline">
                    Post Job
                  </Link>
                  <Link href="/jobs" className="text-sm font-medium hover:underline">
                    Browse Jobs
                  </Link>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6">
              <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-center text-sm text-muted-foreground md:text-left">
                  &copy; {new Date().getFullYear()} Job Board. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'