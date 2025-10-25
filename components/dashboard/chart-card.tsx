import type React from "react"

interface ChartCardProps {
  title: string
  children: React.ReactNode
}

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="card-base p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  )
}
