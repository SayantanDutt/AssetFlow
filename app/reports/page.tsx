"use client"

import ProtectedLayout from "@/components/layout/protected-layout"
import ReportsContent from "@/components/reports/reports-content"

export default function ReportsPage() {
  return (
    <ProtectedLayout>
      <ReportsContent />
    </ProtectedLayout>
  )
}
