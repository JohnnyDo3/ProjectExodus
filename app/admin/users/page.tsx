'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Pagination } from '@/components/ui/Pagination'
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  Mail,
  Shield,
  UserCheck,
  Ban,
  Search,
  Loader2,
  X,
  AlertTriangle,
  Calendar,
  FileText,
  Package,
  User,
  RefreshCw,
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

interface UserData {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
  createdAt: string
  emailVerified: string | null
  isBanned: boolean
  ban: {
    id: string
    reason: string
    expiresAt: string | null
    createdAt: string
  } | null
  stats: {
    articles: number
    products: number
    projects: number
    followers: number
  }
}

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

const ROLES = ['USER', 'EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN']

export default function UsersManagementPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Create user state
  const [isCreating, setIsCreating] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'USER' })
  const [createError, setCreateError] = useState('')

  // Ban modal state
  const [banModalUser, setBanModalUser] = useState<UserData | null>(null)
  const [banReason, setBanReason] = useState('')
  const [banDuration, setBanDuration] = useState<string>('') // days or empty for permanent
  const [banning, setBanning] = useState(false)

  // Edit modal state
  const [editModalUser, setEditModalUser] = useState<UserData | null>(null)
  const [editRole, setEditRole] = useState('')
  const [editing, setEditing] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.append('search', search)
      if (roleFilter) params.append('role', roleFilter)
      if (statusFilter) params.append('status', statusFilter)

      const res = await fetch(`/api/admin/users?${params}`)
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, roleFilter, statusFilter])

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchUsers()
    }, 300)
    return () => clearTimeout(debounce)
  }, [fetchUsers])

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setCreateError('All fields are required')
      return
    }

    setCreating(true)
    setCreateError('')

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })

      if (res.ok) {
        setNewUser({ name: '', email: '', password: '', role: 'USER' })
        setIsCreating(false)
        fetchUsers()
      } else {
        const data = await res.json()
        setCreateError(data.error || 'Failed to create user')
      }
    } catch (error) {
      setCreateError('Failed to create user')
    } finally {
      setCreating(false)
    }
  }

  const handleBanUser = async () => {
    if (!banModalUser || !banReason) return

    setBanning(true)
    try {
      const res = await fetch(`/api/admin/users/${banModalUser.id}/ban`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: banReason,
          duration: banDuration ? parseInt(banDuration) : null
        })
      })

      if (res.ok) {
        setBanModalUser(null)
        setBanReason('')
        setBanDuration('')
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to ban user:', error)
    } finally {
      setBanning(false)
    }
  }

  const handleUnbanUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/ban`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to unban user:', error)
    }
  }

  const handleUpdateRole = async () => {
    if (!editModalUser || !editRole) return

    setEditing(true)
    try {
      const res = await fetch(`/api/admin/users/${editModalUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole })
      })

      if (res.ok) {
        setEditModalUser(null)
        setEditRole('')
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to update role:', error)
    } finally {
      setEditing(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-red-500/20 text-red-700'
      case 'ADMIN': return 'bg-purple-500/20 text-purple-700'
      case 'MODERATOR': return 'bg-yellow-500/20 text-yellow-700'
      case 'EDITOR': return 'bg-blue-500/20 text-blue-700'
      default: return 'bg-green-500/20 text-green-700'
    }
  }

  const totalUsers = pagination.total
  const activeUsers = users.filter(u => !u.isBanned).length
  const adminUsers = users.filter(u => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN').length
  const bannedUsers = users.filter(u => u.isBanned).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[var(--foreground)]">Users</h1>
          <p className="text-theme-muted mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => fetchUsers()}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New User
          </Button>
        </div>
      </div>

      {/* Create User Form */}
      {isCreating && (
        <Card className="border-theme-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Create New User</CardTitle>
            <button onClick={() => setIsCreating(false)}>
              <X className="w-5 h-5 text-theme-muted hover:text-[var(--foreground)]" />
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            {createError && (
              <div className="p-3 rounded-lg bg-red-500/10 text-red-600 text-sm font-medium">
                {createError}
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g., Jane Doe"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                placeholder="jane@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                placeholder="Strong password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <Select
                label="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                options={ROLES.map(r => ({ value: r, label: r }))}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateUser} disabled={creating}>
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-theme-muted">Total Users</p>
                <p className="text-2xl font-black text-[var(--foreground)]">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-theme-muted">Active</p>
                <p className="text-2xl font-black text-[var(--foreground)]">{activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-theme-muted">Admins</p>
                <p className="text-2xl font-black text-[var(--foreground)]">{adminUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Ban className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-theme-muted">Banned</p>
                <p className="text-2xl font-black text-[var(--foreground)]">{bannedUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] focus:border-theme-primary focus:outline-none"
                />
              </div>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] focus:border-theme-primary focus:outline-none"
            >
              <option value="">All Roles</option>
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] focus:border-theme-primary focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 text-theme-primary mx-auto mb-4 animate-spin" />
              <p className="text-theme-muted">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-theme-muted mx-auto mb-4 opacity-50" />
              <p className="text-theme-muted">No users found</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-[var(--muted)] transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Avatar */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-theme-primary to-theme-accent flex items-center justify-center flex-shrink-0">
                      {user.image ? (
                        <Image src={user.image} alt="" fill unoptimized sizes="100%" className="rounded-full object-cover" />
                      ) : (
                        <span className="text-white font-bold">
                          {(user.name || user.email).charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[var(--foreground)] truncate">
                          {user.name || 'No name'}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                        {user.isBanned && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                            BANNED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-theme-muted mt-1">
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      {(user.stats.articles > 0 || user.stats.products > 0) && (
                        <div className="flex items-center gap-3 text-xs text-theme-muted mt-1">
                          {user.stats.articles > 0 && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {user.stats.articles} articles
                            </span>
                          )}
                          {user.stats.products > 0 && (
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {user.stats.products} products
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditModalUser(user)
                        setEditRole(user.role)
                      }}
                      className="p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
                      title="Edit role"
                    >
                      <Edit2 className="w-4 h-4 text-theme-muted" />
                    </button>
                    {user.isBanned ? (
                      <button
                        onClick={() => handleUnbanUser(user.id)}
                        className="p-2 rounded-lg hover:bg-green-500/10 transition-colors"
                        title="Unban user"
                      >
                        <UserCheck className="w-4 h-4 text-green-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setBanModalUser(user)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Ban user"
                      >
                        <Ban className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination(p => ({ ...p, page }))}
          />
        </div>
      )}

      {/* Ban Modal */}
      {banModalUser && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[var(--card)] rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--foreground)]">Ban User</h3>
                <p className="text-sm text-theme-muted">{banModalUser.name || banModalUser.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Reason for ban *
                </label>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Explain why this user is being banned..."
                  className="w-full px-4 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] focus:border-theme-primary focus:outline-none resize-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={banDuration}
                  onChange={(e) => setBanDuration(e.target.value)}
                  placeholder="Leave empty for permanent ban"
                  className="w-full px-4 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] focus:border-theme-primary focus:outline-none"
                />
                <p className="text-xs text-theme-muted mt-1">
                  Leave empty for a permanent ban
                </p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setBanModalUser(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleBanUser}
                  disabled={banning || !banReason}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {banning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Banning...
                    </>
                  ) : (
                    'Ban User'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editModalUser && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[var(--card)] rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
                <Edit2 className="w-5 h-5 text-theme-primary" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--foreground)]">Edit User Role</h3>
                <p className="text-sm text-theme-muted">{editModalUser.name || editModalUser.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] focus:border-theme-primary focus:outline-none"
                >
                  {ROLES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setEditModalUser(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateRole} disabled={editing}>
                  {editing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
