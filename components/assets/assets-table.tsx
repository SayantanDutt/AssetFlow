"use client"

import { Edit2, Trash2 } from "lucide-react"

interface PersonalAsset {
  id: string
  name: string
  type: string
  dateBought: string
  purchasePrice: number
  paymentMethod: "cash" | "emi" | "credit"
  emiMonths?: number
  emiAmount?: number
  pendingPayment: number
  currentValue: number
  condition: "excellent" | "good" | "fair" | "poor"
  notes: string
}

interface AssetsTableProps {
  assets: PersonalAsset[]
  onDelete: (id: string) => void
  onEdit: (asset: PersonalAsset) => void
}

const getConditionColor = (condition: string) => {
  switch (condition) {
    case "excellent":
      return "bg-green-500/10 text-green-700 dark:text-green-400"
    case "good":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
    case "fair":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    case "poor":
      return "bg-red-500/10 text-red-700 dark:text-red-400"
    default:
      return "bg-gray-500/10 text-gray-700"
  }
}

export default function AssetsTable({ assets, onDelete, onEdit }: AssetsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="card-base overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Asset Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date Bought</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Purchase Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Payment</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Pending</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Current Value</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Condition</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{asset.name}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {asset.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{new Date(asset.dateBought).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{formatCurrency(asset.purchasePrice)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="capitalize text-xs font-medium">
                    {asset.paymentMethod === "emi"
                      ? `EMI (${asset.emiMonths}m)`
                      : asset.paymentMethod === "credit"
                        ? "Credit"
                        : "Cash"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {asset.pendingPayment > 0 ? (
                    <span className="text-red-600">{formatCurrency(asset.pendingPayment)}</span>
                  ) : (
                    <span className="text-green-600">Paid</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{formatCurrency(asset.currentValue)}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getConditionColor(asset.condition)}`}
                  >
                    {asset.condition}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(asset)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(asset.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-muted-foreground hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {assets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No assets found. Add your first asset to get started!</p>
        </div>
      )}
    </div>
  )
}
