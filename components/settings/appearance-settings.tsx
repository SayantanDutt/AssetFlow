"use client"

import { useState } from "react"
import { Palette, Monitor, Moon, Sun } from "lucide-react"

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("auto")
  const [accentColor, setAccentColor] = useState("teal")

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme-preference", newTheme)
  }

  const handleAccentChange = (color) => {
    setAccentColor(color)
    localStorage.setItem("accent-color", color)
  }

  return (
    <div className="card-base p-6 space-y-6">
      {/* Theme Selection */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Theme</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Light Theme */}
          <button
            onClick={() => handleThemeChange("light")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "light" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
            }`}
          >
            <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Light</p>
            <p className="text-xs text-muted-foreground">Bright and clean</p>
          </button>

          {/* Dark Theme */}
          <button
            onClick={() => handleThemeChange("dark")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "dark" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
            }`}
          >
            <Moon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Dark</p>
            <p className="text-xs text-muted-foreground">Easy on the eyes</p>
          </button>

          {/* Auto Theme */}
          <button
            onClick={() => handleThemeChange("auto")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "auto" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
            }`}
          >
            <Monitor className="w-6 h-6 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Auto</p>
            <p className="text-xs text-muted-foreground">System preference</p>
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div className="pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Accent Color
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Teal", value: "teal", color: "bg-teal-500" },
            { name: "Blue", value: "blue", color: "bg-blue-500" },
            { name: "Purple", value: "purple", color: "bg-purple-500" },
            { name: "Pink", value: "pink", color: "bg-pink-500" },
            { name: "Red", value: "red", color: "bg-red-500" },
            { name: "Orange", value: "orange", color: "bg-orange-500" },
            { name: "Green", value: "green", color: "bg-green-500" },
            { name: "Cyan", value: "cyan", color: "bg-cyan-500" },
          ].map((color) => (
            <button
              key={color.value}
              onClick={() => handleAccentChange(color.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                accentColor === color.value ? "border-foreground" : "border-border hover:border-foreground/50"
              }`}
            >
              <div className={`w-8 h-8 ${color.color} rounded-lg mx-auto mb-2`}></div>
              <p className="text-xs font-medium text-foreground">{color.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Display Options */}
      <div className="pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Display Options</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm text-foreground">Compact sidebar</span>
          </label>
          <label className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm text-foreground">Show animations</span>
          </label>
          <label className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-sm text-foreground">Reduce motion</span>
          </label>
        </div>
      </div>
    </div>
  )
}
