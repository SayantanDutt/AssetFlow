"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function SecuritySettings() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage("Please fill in all fields")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New passwords do not match")
      return
    }

    if (formData.newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setMessage("Password changed successfully!")
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setIsLoading(false)
    setTimeout(() => setMessage(""), 3000)
  }

  const PasswordInput = ({ label, name, show }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="input-base pl-10 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPasswords((prev) => ({ ...prev, [name]: !prev[name] }))}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )

  return (
    <div className="card-base p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Change Password</h2>
        <p className="text-sm text-muted-foreground">Update your password to keep your account secure.</p>
      </div>

      <div className="space-y-4">
        <PasswordInput label="Current Password" name="currentPassword" show={showPasswords.current} />
        <PasswordInput label="New Password" name="newPassword" show={showPasswords.new} />
        <PasswordInput label="Confirm Password" name="confirmPassword" show={showPasswords.confirm} />
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.includes("successfully")
              ? "bg-green-500/10 border border-green-500/50 text-green-600"
              : "bg-red-500/10 border border-red-500/50 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-border">
        <button onClick={handleChangePassword} disabled={isLoading} className="btn-primary">
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* Security Info */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Security Information</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Not enabled</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Last Password Change</p>
              <p className="text-xs text-muted-foreground">90 days ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Active Sessions</p>
              <p className="text-xs text-muted-foreground">1 session active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
