import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  color: string
}

export default function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  return (
    <div className="card-base p-6 hover:shadow-lg hover:border-accent/50 transition-all duration-300 cursor-default group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
            {value}
          </h3>
          <p className="text-xs text-green-600 mt-2">{trend} from last month</p>
        </div>
        <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
