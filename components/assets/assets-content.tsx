"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Download, Upload, Trash2 } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import AssetsTable from "./assets-table"
import AddAssetModal from "./add-asset-modal"

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
  dateAdded: string
}

const DEFAULT_ASSETS: PersonalAsset[] = [
  {
    id: "AST-001",
    name: "Samsung 55-inch TV",
    type: "Electronics",
    dateBought: "2024-01-15",
    purchasePrice: 45000,
    paymentMethod: "emi",
    emiMonths: 12,
    emiAmount: 4000,
    pendingPayment: 16000,
    currentValue: 38000,
    condition: "excellent",
    notes: "4K Smart TV with warranty",
    dateAdded: new Date().toISOString(),
  },
]

export default function AssetsContent() {
  const [assets, setAssets, isLoaded] = useLocalStorage<PersonalAsset[]>("personal-assets", DEFAULT_ASSETS)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAsset, setEditingAsset] = useState<PersonalAsset | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [assetToDelete, setAssetToDelete] = useState<string | null>(null)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-muted border-t-accent rounded-full animate-spin"></div>
      </div>
    )
  }

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || asset.type === filterType
    return matchesSearch && matchesType
  })

  const handleAddAsset = (newAsset: Omit<PersonalAsset, "id" | "dateAdded">) => {
    const asset: PersonalAsset = {
      ...newAsset,
      id: `AST-${String(assets.length + 1).padStart(3, "0")}`,
      dateAdded: new Date().toISOString(),
    }
    setAssets([...assets, asset])
    setShowAddModal(false)
  }

  const handleUpdateAsset = (updatedAsset: PersonalAsset) => {
    setAssets(assets.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)))
    setEditingAsset(null)
    setShowAddModal(false)
  }

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter((asset) => asset.id !== id))
    setShowDeleteConfirm(false)
    setAssetToDelete(null)
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(assets, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `personal-assets-backup-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    const csv = [
      [
        "Asset ID",
        "Name",
        "Type",
        "Date Bought",
        "Purchase Price",
        "Payment Method",
        "EMI Months",
        "EMI Amount",
        "Pending Payment",
        "Current Value",
        "Condition",
        "Notes",
      ],
      ...filteredAssets.map((asset) => [
        asset.id,
        asset.name,
        asset.type,
        asset.dateBought,
        asset.purchasePrice,
        asset.paymentMethod,
        asset.emiMonths || "",
        asset.emiAmount || "",
        asset.pendingPayment,
        asset.currentValue,
        asset.condition,
        asset.notes,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `personal-assets-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string)
        if (Array.isArray(imported)) {
          setAssets(imported)
        }
      } catch (error) {
        console.error("Error importing file:", error)
      }
    }
    reader.readAsText(file)
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all assets? This cannot be undone.")) {
      setAssets([])
    }
  }

  const assetTypes = Array.from(new Set(assets.map((a) => a.type)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Assets</h1>
          <p className="text-muted-foreground mt-1">Track and manage all your personal assets in one place.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" id="import-file" />
            <label htmlFor="import-file" className="btn-secondary flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              Import
            </label>
          </div>
          <button onClick={handleExportJSON} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Backup
          </button>
          <button onClick={handleExportCSV} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by asset name or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-10"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-base w-full md:w-40"
          >
            <option value="all">All Types</option>
            {assetTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredAssets.length} of {assets.length} assets
        </span>
        {assets.length > 0 && (
          <button onClick={handleClearAll} className="text-red-600 hover:text-red-700 flex items-center gap-1 text-xs">
            <Trash2 className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Table */}
      <AssetsTable
        assets={filteredAssets}
        onDelete={(id) => {
          setAssetToDelete(id)
          setShowDeleteConfirm(true)
        }}
        onEdit={(asset) => {
          setEditingAsset(asset)
          setShowAddModal(true)
        }}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && assetToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card-base p-6 max-w-sm">
            <h3 className="text-lg font-bold text-foreground mb-2">Delete Asset?</h3>
            <p className="text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAsset(assetToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <AddAssetModal
          onClose={() => {
            setShowAddModal(false)
            setEditingAsset(null)
          }}
          onSubmit={editingAsset ? handleUpdateAsset : handleAddAsset}
          initialData={editingAsset}
          isEditing={!!editingAsset}
        />
      )}
    </div>
  )
}
