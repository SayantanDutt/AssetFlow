"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Package, CheckCircle, AlertCircle } from "lucide-react"
import StatCard from "./stat-card"
import ChartCard from "./chart-card"

const assetData = [
  { name: "Jan", assets: 120 },
  { name: "Feb", assets: 150 },
  { name: "Mar", assets: 180 },
  { name: "Apr", assets: 200 },
  { name: "May", assets: 220 },
  { name: "Jun", assets: 250 },
]

const assetTypeData = [
  { name: "Laptops", value: 45 },
  { name: "Desktops", value: 30 },
  { name: "Servers", value: 15 },
  { name: "Printers", value: 10 },
]

const departmentData = [
  { name: "IT", assets: 85 },
  { name: "HR", assets: 45 },
  { name: "Finance", assets: 60 },
  { name: "Operations", assets: 50 },
  { name: "Sales", assets: 40 },
]

const COLORS = ["#14b8a6", "#2dd4bf", "#0d9488", "#99f6e4"]

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your asset overview.</p>
        </div>
        <button className="btn-primary">+ Add New Asset</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Assets" value="280" icon={Package} trend="+12%" color="bg-blue-500/10 text-blue-600" />
        <StatCard
          title="Active Assets"
          value="245"
          icon={CheckCircle}
          trend="+8%"
          color="bg-green-500/10 text-green-600"
        />
        <StatCard
          title="Assigned Assets"
          value="210"
          icon={CheckCircle}
          trend="+5%"
          color="bg-teal-500/10 text-teal-600"
        />
        <StatCard
          title="Unassigned"
          value="35"
          icon={AlertCircle}
          trend="-3%"
          color="bg-orange-500/10 text-orange-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Utilization Chart */}
        <ChartCard title="Asset Utilization Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={assetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="assets" stroke="#14b8a6" strokeWidth={2} dot={{ fill: "#14b8a6", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Asset Type Distribution */}
        <ChartCard title="Asset Type Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Assets per Department */}
        <ChartCard title="Assets per Department">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="assets" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Quick Actions */}
        <ChartCard title="Quick Actions">
          <div className="space-y-3">
            <button className="w-full p-3 bg-muted hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-left font-medium transition-colors">
              📊 Export Asset Report
            </button>
            <button className="w-full p-3 bg-muted hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-left font-medium transition-colors">
              👥 Manage Users
            </button>
            <button className="w-full p-3 bg-muted hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-left font-medium transition-colors">
              ⚙️ System Settings
            </button>
            <button className="w-full p-3 bg-muted hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-left font-medium transition-colors">
              📋 View Audit Log
            </button>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
