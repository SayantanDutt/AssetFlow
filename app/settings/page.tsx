"use client"

import ProtectedLayout from "@/components/layout/protected-layout"
import SettingsContent from "@/components/settings/settings-content"

export default function SettingsPage() {
  return (
    <ProtectedLayout>
      <SettingsContent />
    </ProtectedLayout>
  )
}
