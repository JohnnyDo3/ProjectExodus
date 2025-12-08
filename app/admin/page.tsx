'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Users,
  Package,
  FileText,
  Flag,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  FolderKanban,
  ArrowRight,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { format, formatDistanceToNow } from 'date-fns'

interface DashboardStats {
  users: {
    total: number
    newThisWeek: number
    byRole: Record<string, number>
  }
  products: {
    total: number
    pending: number
    approved: number
    rejected: number
  }
  articles: {
    total: number
    published: number
    drafts: number
  }
  reports: {
    open: number
    resolved: number
  }
  projects: {
    active: number
  }
  activity: {
    recent: Array<{
      id: string
      action: string
      description: string
      metadata: any
      createdAt: string
      user: { id: string; name: string; image: string | null }
    }>
  }
  charts: {
    userSignups: Array<{ date: string; count: number }>
  }
}

const ROLE_COLORS: Record<string, string> = {
  USER: '#10b981',
  EDITOR: '#3b82f6',
  MODERATOR: '#f59e0b',
  ADMIN: '#8b5cf6',
  SUPER_ADMIN: '#ef4444',
}

const ACTION_COLORS: Record<string, string> = {
  USER_BANNED: 'text-red-500 bg-red-500/10',
  USER_UNBANNED: 'text-green-500 bg-green-500/10',
  PRODUCT_APPROVED: 'text-green-500 bg-green-500/10',
  PRODUCT_REJECTED: 'text-red-500 bg-red-500/10',
  ARTICLE_PUBLISHED: 'text-blue-500 bg-blue-500/10',
  ARTICLE_UNPUBLISHED: 'text-yellow-500 bg-yellow-500/10',
  CONTENT_DELETED: 'text-red-500 bg-red-500/10',
  REPORT_RESOLVED: 'text-green-500 bg-green-500/10',
  SETTINGS_CHANGED: 'text-purple-500 bg-purple-500/10',
  OTHER: 'text-gray-500 bg-gray-500/10',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchStats()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-theme-primary mx-auto mb-4 animate-spin" />
          <p className="text-theme-muted font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const roleData = stats?.users.byRole
    ? Object.entries(stats.users.byRole).map(([role, count]) => ({
        name: role,
        value: count,
        color: ROLE_COLORS[role] || '#6b7280',
      }))
    : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[var(--foreground)]">Dashboard</h1>
          <p className="text-theme-muted mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] hover:border-theme-primary transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="font-medium">Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users */}
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-500" />
            </div>
            {stats?.users.newThisWeek && stats.users.newThisWeek > 0 && (
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                <TrendingUp className="w-4 h-4" />
                +{stats.users.newThisWeek}
              </span>
            )}
          </div>
          <p className="text-3xl font-black text-[var(--foreground)]">
            {stats?.users.total.toLocaleString() || 0}
          </p>
          <p className="text-sm text-theme-muted font-medium">Total Users</p>
        </div>

        {/* Products */}
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
            {stats?.products.pending && stats.products.pending > 0 && (
              <Link
                href="/admin/products"
                className="flex items-center gap-1 text-sm font-medium text-yellow-500 hover:underline"
              >
                <Clock className="w-4 h-4" />
                {stats.products.pending} pending
              </Link>
            )}
          </div>
          <p className="text-3xl font-black text-[var(--foreground)]">
            {stats?.products.total.toLocaleString() || 0}
          </p>
          <p className="text-sm text-theme-muted font-medium">Total Products</p>
        </div>

        {/* Articles */}
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm font-medium text-theme-muted">
              {stats?.articles.drafts || 0} drafts
            </span>
          </div>
          <p className="text-3xl font-black text-[var(--foreground)]">
            {stats?.articles.published.toLocaleString() || 0}
          </p>
          <p className="text-sm text-theme-muted font-medium">Published Articles</p>
        </div>

        {/* Reports */}
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Flag className="w-6 h-6 text-red-500" />
            </div>
            {stats?.reports.open && stats.reports.open > 0 && (
              <Link
                href="/admin/reports"
                className="flex items-center gap-1 text-sm font-medium text-red-500 hover:underline"
              >
                <Activity className="w-4 h-4" />
                {stats.reports.open} open
              </Link>
            )}
          </div>
          <p className="text-3xl font-black text-[var(--foreground)]">
            {stats?.reports.resolved.toLocaleString() || 0}
          </p>
          <p className="text-sm text-theme-muted font-medium">Resolved Reports</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Signups Chart */}
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            User Signups (Last 30 Days)
          </h3>
          <div className="h-64">
            {stats?.charts.userSignups && stats.charts.userSignups.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.charts.userSignups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(val) => format(new Date(val), 'MMM d')}
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '2px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    labelFormatter={(val) => format(new Date(val), 'MMMM d, yyyy')}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-theme-muted">
                No signup data available
              </div>
            )}
          </div>
        </div>

        {/* User Roles Pie Chart */}
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Users by Role
          </h3>
          <div className="h-64">
            {roleData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }: any) =>
                      `${name} (${((percent || 0) * 100).toFixed(0)}%)`
                    }
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '2px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-theme-muted">
                No role data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {stats?.products.pending && stats.products.pending > 0 && (
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-[var(--foreground)]">
                    Review Products
                  </span>
                </div>
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-yellow-500 text-white">
                  {stats.products.pending}
                </span>
              </Link>
            )}
            {stats?.reports.open && stats.reports.open > 0 && (
              <Link
                href="/admin/reports"
                className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Flag className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-[var(--foreground)]">
                    Handle Reports
                  </span>
                </div>
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
                  {stats.reports.open}
                </span>
              </Link>
            )}
            <Link
              href="/admin/moderation"
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-theme-primary" />
                <span className="font-medium text-[var(--foreground)]">
                  Moderation Queue
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-theme-muted" />
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-theme-primary" />
                <span className="font-medium text-[var(--foreground)]">
                  Manage Users
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-theme-muted" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              Recent Admin Activity
            </h3>
            <Link
              href="/admin/audit"
              className="text-sm font-medium text-theme-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.activity.recent && stats.activity.recent.length > 0 ? (
              stats.activity.recent.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[var(--muted)]"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      ACTION_COLORS[activity.action] || ACTION_COLORS.OTHER
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] text-sm">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-theme-muted">
                        by {activity.user?.name || 'Unknown'}
                      </span>
                      <span className="text-xs text-theme-muted">•</span>
                      <span className="text-xs text-theme-muted">
                        {formatDistanceToNow(new Date(activity.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-theme-muted">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
