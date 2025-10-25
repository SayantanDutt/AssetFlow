"use client"

import { Edit2, Trash2, CheckCircle, XCircle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  assignedAssets: number
  lastLogin: string
  status: string
}

interface UsersTableProps {
  users: User[]
  onDelete: (id: string) => void
  onEdit: (user: User) => void
}

export default function UsersTable({ users, onDelete, onEdit }: UsersTableProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-500/10 text-red-600"
      case "Engineer":
        return "bg-blue-500/10 text-blue-600"
      case "Viewer":
        return "bg-gray-500/10 text-gray-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  return (
    <div className="card-base overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Assigned Assets</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Last Login</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{user.id}</td>
                <td className="px-6 py-4 text-sm text-foreground">{user.name}</td>
                <td className="px-6 py-4 text-sm text-foreground">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground text-center">{user.assignedAssets}</td>
                <td className="px-6 py-4 text-sm text-foreground">{user.lastLogin}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {user.status === "Active" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={user.status === "Active" ? "text-green-600" : "text-red-600"}>{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
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

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}
