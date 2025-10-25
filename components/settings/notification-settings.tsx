"use client"

import { useState } from "react"
import { Mail, AlertCircle } from "lucide-react"

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    assetUpdates: true,
    userActivity: true,
    systemAlerts: true,
    weeklyReport: true,
    monthlyReport: false,
  })

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="card-base p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Notification Preferences</h2>
        <p className="text-sm text-muted-foreground">Choose how you want to be notified about important events.</p>
      </div>

      {/* Email Notifications */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Notifications
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">Asset Updates</p>
              <p className="text-xs text-muted-foreground">Get notified when assets are added or modified</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.assetUpdates}
              onChange={() => handleToggle("assetUpdates")}
              className="w-4 h-4 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">User Activity</p>
              <p className="text-xs text-muted-foreground">Get notified about user logins and changes</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.userActivity}
              onChange={() => handleToggle("userActivity")}
              className="w-4 h-4 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">System Alerts</p>
              <p className="text-xs text-muted-foreground">Get notified about system errors and warnings</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.systemAlerts}
              onChange={() => handleToggle("systemAlerts")}
              className="w-4 h-4 rounded"
            />
          </label>
        </div>
      </div>

      {/* Reports */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Reports
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">Weekly Report</p>
              <p className="text-xs text-muted-foreground">Receive weekly asset management summary</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyReport}
              onChange={() => handleToggle("weeklyReport")}
              className="w-4 h-4 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">Monthly Report</p>
              <p className="text-xs text-muted-foreground">Receive monthly analytics and insights</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.monthlyReport}
              onChange={() => handleToggle("monthlyReport")}
              className="w-4 h-4 rounded"
            />
          </label>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Channels</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">In-App Notifications</p>
              <p className="text-xs text-muted-foreground">Show notifications in the application</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
          </label>

          <label className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Send notifications to your email</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
              className="w-4 h-4 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
