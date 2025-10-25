"use client"

import { useState } from "react"
import { Search, Plus, Download } from "lucide-react"
import UsersTable from "./users-table"
import AddUserModal from "./add-user-modal"

const mockUsers = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    assignedAssets: 5,
    lastLogin: "2024-10-24 14:30",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Engineer",
    assignedAssets: 3,
    lastLogin: "2024-10-24 10:15",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Viewer",
    assignedAssets: 0,
    lastLogin: "2024-10-23 09:45",
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    role: "Engineer",
    assignedAssets: 4,
    lastLogin: "2024-10-22 16:20",
    status: "Active",
  },
  {
    id: "USR-005",
    name: "Robert Brown",
    email: "robert.brown@company.com",
    role: "Viewer",
    assignedAssets: 1,
    lastLogin: "2024-10-20 11:00",
    status: "Inactive",
  },
]

export default function UsersContent() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleAddUser = (newUser) => {
    const user = {
      ...newUser,
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      assignedAssets: 0,
      lastLogin: "Never",
      status: "Active",
    }
    setUsers([...users, user])
    setShowAddModal(false)
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleExport = () => {
    const csv = [
      ["User ID", "Name", "Email", "Role", "Assigned Assets", "Last Login", "Status"],
      ...filteredUsers.map((user) => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.assignedAssets,
        user.lastLogin,
        user.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
          <p className="text-muted-foreground mt-1">Manage system users and their permissions.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add User
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-10"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="input-base w-full md:w-40"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Engineer">Engineer</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Table */}
      <UsersTable
        users={filteredUsers}
        onDelete={handleDeleteUser}
        onEdit={(user) => {
          setEditingUser(user)
          setShowAddModal(true)
        }}
      />

      {/* Add/Edit Modal */}
      {showAddModal && (
        <AddUserModal
          onClose={() => {
            setShowAddModal(false)
            setEditingUser(null)
          }}
          onSubmit={handleAddUser}
          initialData={editingUser}
        />
      )}
    </div>
  )
}
