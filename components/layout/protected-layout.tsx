"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "./sidebar"
import Navbar from "./navbar"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Load theme preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark

    setIsDark(shouldBeDark)
    applyTheme(shouldBeDark)
    setIsLoading(false)
  }, [router])

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add("dark")
      html.setAttribute("data-theme", "dark")
    } else {
      html.classList.remove("dark")
      html.removeAttribute("data-theme")
    }
  }

  const handleThemeToggle = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-accent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar onThemeToggle={handleThemeToggle} isDark={isDark} />
      <main className="ml-64 mt-16 p-6">{children}</main>
    </div>
  )
}
