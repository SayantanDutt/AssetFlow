"use client"

import { useState } from "react"
import { Download, Calendar } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import ChartCard from "@/components/dashboard/chart-card"

const assetHealthData = [
  { name: "Excellent", value: 120, percentage: 43 },
  { name: "Good", value: 85, percentage: 30 },
  { name: "Fair", value: 50, percentage: 18 },
  { name: "Poor", value: 25, percentage: 9 },
]

const utilizationTrendData = [
  { month: "Jan", utilization: 65, efficiency: 72 },
  { month: "Feb", utilization: 68, efficiency: 75 },
  { month: "Mar", utilization: 72, efficiency: 78 },
  { month: "Apr", utilization: 75, efficiency: 80 },
  { month: "May", utilization: 78, efficiency: 82 },
  { month: "Jun", utilization: 82, efficiency: 85 },
]

const allocationTrendData = [
  { month: "Jan", allocated: 180, unallocated: 100 },
  { month: "Feb", allocated: 190, unallocated: 90 },
  { month: "Mar", allocated: 200, unallocated: 80 },
  { month: "Apr", allocated: 210, unallocated: 70 },
  { month: "May", allocated: 220, unallocated: 60 },
  { month: "Jun", allocated: 245, unallocated: 35 },
]

const departmentAllocationData = [
  { name: "IT", value: 85 },
  { name: "HR", value: 45 },
  { name: "Finance", value: 60 },
  { name: "Operations", value: 50 },
  { name: "Sales", value: 40 },
]

const COLORS = ["#14b8a6", "#2dd4bf", "#0d9488", "#99f6e4", "#06b6d4"]

export default function ReportsContent() {
  const [dateRange, setDateRange] = useState("last-month")

  const handleExportPDF = () => {
    alert("PDF export functionality would be implemented here")
  }

  const handleExportCSV = () => {
    alert("CSV export functionality would be implemented here")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive asset management analytics and insights.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button onClick={handleExportCSV} className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="card-base p-4">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-base w-full md:w-48"
          >
            <option value="last-week">Last 7 Days</option>
            <option value="last-month">Last 30 Days</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="last-year">Last Year</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-base p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
          <h3 className="text-3xl font-bold text-foreground">280</h3>
          <p className="text-xs text-green-600 mt-2">+12% from last period</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-muted-foreground mb-1">Avg. Utilization</p>
          <h3 className="text-3xl font-bold text-foreground">82%</h3>
          <p className="text-xs text-green-600 mt-2">+5% improvement</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-muted-foreground mb-1">Asset Health</p>
          <h3 className="text-3xl font-bold text-foreground">73%</h3>
          <p className="text-xs text-yellow-600 mt-2">Needs attention</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-muted-foreground mb-1">Allocation Rate</p>
          <h3 className="text-3xl font-bold text-foreground">87%</h3>
          <p className="text-xs text-green-600 mt-2">+8% increase</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Health Distribution */}
        <ChartCard title="Asset Health Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetHealthData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetHealthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Utilization & Efficiency Trend */}
        <ChartCard title="Utilization & Efficiency Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationTrendData}>
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
              <Line
                type="monotone"
                dataKey="utilization"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ fill: "#14b8a6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: "#06b6d4", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Allocation Trend */}
        <ChartCard title="Asset Allocation Trend">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={allocationTrendData}>
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
              <Area type="monotone" dataKey="allocated" stackId="1" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
              <Area
                type="monotone"
                dataKey="unallocated"
                stackId="1"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Allocation */}
        <ChartCard title="Asset Allocation by Department">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentAllocationData}>
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
              <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Detailed Report Table */}
      <ChartCard title="Asset Status Summary">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Total</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Active</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Inactive</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Maintenance</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Utilization %</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-muted/50">
                <td className="px-4 py-3 text-foreground">Laptops</td>
                <td className="px-4 py-3 text-foreground">85</td>
                <td className="px-4 py-3 text-green-600">78</td>
                <td className="px-4 py-3 text-red-600">5</td>
                <td className="px-4 py-3 text-yellow-600">2</td>
                <td className="px-4 py-3 text-foreground">91%</td>
              </tr>
              <tr className="border-b border-border hover:bg-muted/50">
                <td className="px-4 py-3 text-foreground">Desktops</td>
                <td className="px-4 py-3 text-foreground">60</td>
                <td className="px-4 py-3 text-green-600">55</td>
                <td className="px-4 py-3 text-red-600">3</td>
                <td className="px-4 py-3 text-yellow-600">2</td>
                <td className="px-4 py-3 text-foreground">92%</td>
              </tr>
              <tr className="border-b border-border hover:bg-muted/50">
                <td className="px-4 py-3 text-foreground">Servers</td>
                <td className="px-4 py-3 text-foreground">25</td>
                <td className="px-4 py-3 text-green-600">24</td>
                <td className="px-4 py-3 text-red-600">0</td>
                <td className="px-4 py-3 text-yellow-600">1</td>
                <td className="px-4 py-3 text-foreground">96%</td>
              </tr>
              <tr className="border-b border-border hover:bg-muted/50">
                <td className="px-4 py-3 text-foreground">Printers</td>
                <td className="px-4 py-3 text-foreground">30</td>
                <td className="px-4 py-3 text-green-600">25</td>
                <td className="px-4 py-3 text-red-600">4</td>
                <td className="px-4 py-3 text-yellow-600">1</td>
                <td className="px-4 py-3 text-foreground">83%</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-4 py-3 font-semibold text-foreground">Total</td>
                <td className="px-4 py-3 font-semibold text-foreground">280</td>
                <td className="px-4 py-3 font-semibold text-green-600">245</td>
                <td className="px-4 py-3 font-semibold text-red-600">12</td>
                <td className="px-4 py-3 font-semibold text-yellow-600">6</td>
                <td className="px-4 py-3 font-semibold text-foreground">90%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}
