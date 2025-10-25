"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"

export default function ProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "IT",
    position: "System Administrator",
    location: "New York, USA",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveMessage("Profile updated successfully!")
    setIsSaving(false)
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="card-base p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-border">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="text-sm text-muted-foreground">{formData.position}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-base"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-base"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-base pl-10"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-base pl-10"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="input-base"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="input-base"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-base pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-600 text-sm">
          {saveMessage}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-border">
        <button onClick={handleSave} disabled={isSaving} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
