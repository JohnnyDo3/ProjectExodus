'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { ArrowLeft, Plus, Edit2, Trash2, Users, Mail, Shield, UserCheck, Ban } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

export default function UsersManagementPage() {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Sage Thompson',
      email: 'sage@projectexodus.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      joinedDate: '2024-12-01',
      productsCreated: 45,
      articlesWritten: 12
    },
    {
      id: '2',
      name: 'Alex Rivera',
      email: 'alex.rivera@email.com',
      role: 'EDITOR',
      status: 'ACTIVE',
      joinedDate: '2025-01-10',
      productsCreated: 0,
      articlesWritten: 8
    },
    {
      id: '3',
      name: 'Jordan Chen',
      email: 'jordan.chen@email.com',
      role: 'USER',
      status: 'ACTIVE',
      joinedDate: '2025-01-15',
      productsCreated: 0,
      articlesWritten: 0
    },
    {
      id: '4',
      name: 'Taylor Morgan',
      email: 'taylor.m@email.com',
      role: 'USER',
      status: 'SUSPENDED',
      joinedDate: '2025-01-05',
      productsCreated: 0,
      articlesWritten: 0
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'USER'
  })

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) return

    setUsers([...users, {
      id: Date.now().toString(),
      ...newUser,
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0],
      productsCreated: 0,
      articlesWritten: 0
    }])

    setNewUser({ name: '', email: '', role: 'USER' })
    setIsCreating(false)
  }

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const handleSuspendUser = (id: string) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u
    ))
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-terra-100 text-terra-800'
      case 'EDITOR': return 'bg-ocean-100 text-ocean-800'
      default: return 'bg-moss-100 text-moss-800'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE' ? 'text-moss-600' : 'text-terra-600'
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-[var(--card)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[var(--foreground)]">
                Manage Users
              </h1>
              <p className="text-[var(--muted-foreground)] mt-1">
                User accounts, roles, and permissions
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New User
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Create New User */}
          {isCreating && (
            <Card className="border-moss-300 bg-moss-50">
              <CardHeader>
                <CardTitle className="text-[var(--primary)]">Create New User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <Select
                  label="Role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  options={[
                    { value: 'USER', label: 'User - Can browse and comment' },
                    { value: 'EDITOR', label: 'Editor - Can create content' },
                    { value: 'ADMIN', label: 'Admin - Full access' }
                  ]}
                />
                <div className="flex gap-3">
                  <Button onClick={handleCreateUser}>
                    Create User
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-moss-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-moss-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">Total Users</p>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{users.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">Active</p>
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {users.filter(u => u.status === 'ACTIVE').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-terra-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-terra-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">Admins</p>
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {users.filter(u => u.role === 'ADMIN').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-moss-100 flex items-center justify-center">
                    <Ban className="w-6 h-6 text-moss-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">Suspended</p>
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {users.filter(u => u.status === 'SUSPENDED').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-5 rounded-lg border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white text-xl font-black">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-[var(--foreground)]">
                            {user.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                          <span className={`text-xs font-semibold ${getStatusColor(user.status)}`}>
                            ● {user.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </div>
                          <div>Joined {new Date(user.joinedDate).toLocaleDateString()}</div>
                        </div>
                        <div className="flex gap-4 mt-2 text-xs font-semibold text-[var(--muted-foreground)]">
                          {user.productsCreated > 0 && (
                            <div>{user.productsCreated} products</div>
                          )}
                          {user.articlesWritten > 0 && (
                            <div>{user.articlesWritten} articles</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSuspendUser(user.id)}
                      >
                        <Ban className={`w-4 h-4 ${user.status === 'ACTIVE' ? 'text-terra-600' : 'text-moss-600'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4 text-terra-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Development Notice */}
          <Card className="bg-ocean-50 border-ocean-200">
            <CardContent className="p-6">
              <p className="text-sm text-[var(--muted-foreground)]">
                <strong>Note:</strong> This is a UI demonstration. User management will be fully functional
                once authentication is integrated with NextAuth. Changes made here are temporary and for preview purposes only.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
