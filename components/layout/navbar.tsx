"use client"

import { useState } from "react"
import { Moon, Sun, Bell, User, ChevronDown } from "lucide-react"

interface NavbarProps {
  onThemeToggle: () => void
  isDark: boolean
}

export default function Navbar({ onThemeToggle, isDark }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}

  return (
    <nav className="fixed top-0 right-0 left-64 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30 backdrop-blur-sm bg-card/95">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">Asset Management System</h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-muted rounded-lg transition-all duration-200 relative group">
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Theme Toggle */}
        <button onClick={onThemeToggle} className="p-2 hover:bg-muted rounded-lg transition-all duration-200 group">
          {isDark ? (
            <Sun
              className="w-5 h-5 text-muted-foreground group-hover:text-yellow-500 transition-colors duration-200 rotate-0 group-hover:rotate-90"
              style={{ transitionProperty: "transform, color" }}
            />
          ) : (
            <Moon
              className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors duration-200 rotate-0 group-hover:-rotate-90"
              style={{ transitionProperty: "transform, color" }}
            />
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-all duration-200"
          >
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:shadow-lg transition-shadow">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {user.email?.split("@")[0] || "User"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
