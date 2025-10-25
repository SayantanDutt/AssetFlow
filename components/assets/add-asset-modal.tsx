"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

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

interface AddAssetModalProps {
  onClose: () => void
  onSubmit: (asset: any) => void
  initialData?: PersonalAsset | null
  isEditing?: boolean
}

export default function AddAssetModal({ onClose, onSubmit, initialData, isEditing = false }: AddAssetModalProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      type: "Electronics",
      dateBought: new Date().toISOString().split("T")[0],
      purchasePrice: 0,
      paymentMethod: "cash",
      emiMonths: 0,
      emiAmount: 0,
      pendingPayment: 0,
      currentValue: 0,
      condition: "good",
      notes: "",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name?.trim()) newErrors.name = "Asset name is required"
    if (!formData.type?.trim()) newErrors.type = "Asset type is required"
    if (!formData.dateBought) newErrors.dateBought = "Date bought is required"
    if (formData.purchasePrice <= 0) newErrors.purchasePrice = "Purchase price must be greater than 0"
    if (formData.paymentMethod === "emi" && (!formData.emiMonths || !formData.emiAmount)) {
      newErrors.emiMonths = "EMI details are required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(isEditing ? { ...formData, id: initialData?.id } : formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const numFields = ["purchasePrice", "emiMonths", "emiAmount", "pendingPayment", "currentValue"]
    setFormData((prev) => ({
      ...prev,
      [name]: numFields.includes(name) ? Number.parseFloat(value) || 0 : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="card-base w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">{isEditing ? "Edit Asset" : "Add New Asset"}</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Asset Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Asset Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Samsung 55-inch TV, Honda Bike"
                className={`input-base ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Asset Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Asset Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`input-base ${errors.type ? "border-red-500" : ""}`}
              >
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Vehicle</option>
                <option>Jewelry</option>
                <option>Appliances</option>
                <option>Sports Equipment</option>
                <option>Musical Instruments</option>
                <option>Other</option>
              </select>
              {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
            </div>

            {/* Date Bought */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Date Bought *</label>
              <input
                type="date"
                name="dateBought"
                value={formData.dateBought}
                onChange={handleChange}
                className={`input-base ${errors.dateBought ? "border-red-500" : ""}`}
              />
              {errors.dateBought && <p className="text-xs text-red-600 mt-1">{errors.dateBought}</p>}
            </div>

            {/* Purchase Price */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Purchase Price *</label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className={`input-base ${errors.purchasePrice ? "border-red-500" : ""}`}
              />
              {errors.purchasePrice && <p className="text-xs text-red-600 mt-1">{errors.purchasePrice}</p>}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="input-base"
              >
                <option value="cash">Cash</option>
                <option value="credit">Credit Card</option>
                <option value="emi">EMI</option>
              </select>
            </div>

            {/* EMI Months - Show only if EMI selected */}
            {formData.paymentMethod === "emi" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">EMI Months</label>
                <input
                  type="number"
                  name="emiMonths"
                  value={formData.emiMonths}
                  onChange={handleChange}
                  placeholder="e.g., 12"
                  className={`input-base ${errors.emiMonths ? "border-red-500" : ""}`}
                />
                {errors.emiMonths && <p className="text-xs text-red-600 mt-1">{errors.emiMonths}</p>}
              </div>
            )}

            {/* EMI Amount - Show only if EMI selected */}
            {formData.paymentMethod === "emi" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">EMI Amount per Month</label>
                <input
                  type="number"
                  name="emiAmount"
                  value={formData.emiAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="input-base"
                />
              </div>
            )}

            {/* Pending Payment */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Pending Payment</label>
              <input
                type="number"
                name="pendingPayment"
                value={formData.pendingPayment}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="input-base"
              />
            </div>

            {/* Current Value */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Current Value</label>
              <input
                type="number"
                name="currentValue"
                value={formData.currentValue}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="input-base"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Condition</label>
              <select name="condition" value={formData.condition} onChange={handleChange} className="input-base">
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about this asset..."
                rows={3}
                className="input-base resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Update Asset" : "Add Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
