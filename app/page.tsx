"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Package } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleQuickStart = async () => {
    setIsLoading(true)
    try {
      // Simulate quick login for personal use
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Store user session
      localStorage.setItem("user", JSON.stringify({ name: "Personal User", role: "owner" }))
      localStorage.setItem("isAuthenticated", "true")

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setError("Failed to start. Please try again.")
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AssetFlow</h1>
          </div>
          <p className="text-muted-foreground">Personal Asset Management System</p>
        </div>

        {/* Card */}
        <div className="card-base p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Track and manage your assets with ease</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-600">{error}</div>
          )}

          <button
            onClick={handleQuickStart}
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Start Managing Assets
              </>
            )}
          </button>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              All your data is stored locally on your device. No cloud sync required.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">∞</div>
            <p className="text-xs text-muted-foreground">Unlimited Assets</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">📊</div>
            <p className="text-xs text-muted-foreground">Full Analytics</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">💾</div>
            <p className="text-xs text-muted-foreground">Local Storage</p>
          </div>
        </div>
      </div>
    </div>
  )
}
