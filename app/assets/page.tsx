"use client"

import ProtectedLayout from "@/components/layout/protected-layout"
import AssetsContent from "@/components/assets/assets-content"

export default function AssetsPage() {
  return (
    <ProtectedLayout>
      <AssetsContent />
    </ProtectedLayout>
  )
}
