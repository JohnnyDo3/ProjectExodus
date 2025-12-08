'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Shield,
  User,
  Package,
  FileText,
  Flag,
  Settings,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Download,
  ExternalLink,
  Loader2,
  Clock,
  RefreshCw,
} from 'lucide-react'
import Image from 'next/image'
import { useAdminEvent } from '@/components/admin/AdminPusherProvider'

interface AuditLog {
  id: string
  action: string
  description: string
  metadata: Record<string, any> | null
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
  }
}

interface ActionStat {
  action: string
  count: number
}

interface AdminUser {
  id: string
  name: string | null
  email: string
  image: string | null
}

const actionLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  USER_BANNED: { label: 'User Banned', color: 'bg-red-100 text-red-700', icon: <User className="w-3 h-3" /> },
  USER_UNBANNED: { label: 'User Unbanned', color: 'bg-green-100 text-green-700', icon: <User className="w-3 h-3" /> },
  PRODUCT_APPROVED: { label: 'Product Approved', color: 'bg-green-100 text-green-700', icon: <Package className="w-3 h-3" /> },
  PRODUCT_REJECTED: { label: 'Product Rejected', color: 'bg-red-100 text-red-700', icon: <Package className="w-3 h-3" /> },
  ARTICLE_PUBLISHED: { label: 'Article Published', color: 'bg-blue-100 text-blue-700', icon: <FileText className="w-3 h-3" /> },
  ARTICLE_UNPUBLISHED: { label: 'Article Unpublished', color: 'bg-gray-100 text-gray-700', icon: <FileText className="w-3 h-3" /> },
  CONTENT_DELETED: { label: 'Content Deleted', color: 'bg-red-100 text-red-700', icon: <Shield className="w-3 h-3" /> },
  REPORT_RESOLVED: { label: 'Report Resolved', color: 'bg-purple-100 text-purple-700', icon: <Flag className="w-3 h-3" /> },
  SETTINGS_CHANGED: { label: 'Settings Changed', color: 'bg-yellow-100 text-yellow-700', icon: <Settings className="w-3 h-3" /> },
  ROLE_CHANGED: { label: 'Role Changed', color: 'bg-indigo-100 text-indigo-700', icon: <Shield className="w-3 h-3" /> },
  USER_CREATED: { label: 'User Created', color: 'bg-green-100 text-green-700', icon: <User className="w-3 h-3" /> },
  USER_DELETED: { label: 'User Deleted', color: 'bg-red-100 text-red-700', icon: <User className="w-3 h-3" /> },
}

const getActionInfo = (action: string) => {
  return actionLabels[action] || {
    label: action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
    color: 'bg-gray-100 text-gray-700',
    icon: <Shield className="w-3 h-3" />
  }
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [actionStats, setActionStats] = useState<ActionStat[]>([])
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])

  // Filters
  const [showFilters, setShowFilters] = useState(false)
  const [actionFilter, setActionFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Expanded rows
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      })
      if (actionFilter) params.set('action', actionFilter)
      if (userFilter) params.set('userId', userFilter)
      if (searchQuery) params.set('search', searchQuery)
      if (startDate) params.set('startDate', startDate)
      if (endDate) params.set('endDate', endDate)

      const res = await fetch(`/api/admin/audit?${params}`)
      if (res.ok) {
        const data = await res.json()
        setLogs(data.logs)
        setTotal(data.total)
        setTotalPages(data.totalPages)
        setActionStats(data.actionStats)
        setAdminUsers(data.adminUsers)
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
    } finally {
      setLoading(false)
    }
  }, [page, actionFilter, userFilter, searchQuery, startDate, endDate])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  // Listen for real-time updates
  useAdminEvent('admin-action', () => {
    if (page === 1) {
      fetchLogs()
    }
  }, [page, fetchLogs])

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatTimeAgo = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(date)
  }

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({ limit: '10000' })
      if (actionFilter) params.set('action', actionFilter)
      if (userFilter) params.set('userId', userFilter)
      if (searchQuery) params.set('search', searchQuery)
      if (startDate) params.set('startDate', startDate)
      if (endDate) params.set('endDate', endDate)

      const res = await fetch(`/api/admin/audit?${params}`)
      if (!res.ok) return

      const data = await res.json()
      const csv = [
        ['Date', 'Admin', 'Action', 'Description', 'Target Type', 'Target ID', 'IP Address'].join(','),
        ...data.logs.map((log: AuditLog) => [
          new Date(log.createdAt).toISOString(),
          log.user.name || log.user.email,
          log.action,
          `"${log.description.replace(/"/g, '""')}"`,
          log.metadata?.targetType || '',
          log.metadata?.targetId || '',
          log.metadata?.ipAddress || '',
        ].join(','))
      ].join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const clearFilters = () => {
    setActionFilter('')
    setUserFilter('')
    setSearchQuery('')
    setStartDate('')
    setEndDate('')
    setPage(1)
  }

  const hasActiveFilters = actionFilter || userFilter || searchQuery || startDate || endDate

  if (loading && logs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-theme-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-theme-primary">Audit Log</h1>
          <p className="text-theme-muted mt-1">{total.toLocaleString()} total entries</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 w-2 h-2 bg-theme-primary rounded-full" />
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Action Stats */}
      <div className="flex flex-wrap gap-2">
        {actionStats.slice(0, 6).map((stat) => {
          const info = getActionInfo(stat.action)
          return (
            <button
              key={stat.action}
              onClick={() => setActionFilter(stat.action === actionFilter ? '' : stat.action)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full transition-all ${
                actionFilter === stat.action
                  ? 'ring-2 ring-theme-primary ring-offset-2'
                  : ''
              } ${info.color}`}
            >
              {info.icon}
              {info.label}
              <span className="ml-1 font-semibold">{stat.count}</span>
            </button>
          )
        })}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search descriptions..."
                    className="w-full pl-9 pr-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary"
                  />
                </div>
              </div>

              {/* Admin User Filter */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">Admin</label>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary"
                >
                  <option value="">All Admins</option>
                  {adminUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-[var(--card-border)] flex justify-end">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Logs Table */}
      <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--muted)] border-b border-[var(--card-border)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                    When
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--card-border)]">
                {logs.map((log) => {
                  const actionInfo = getActionInfo(log.action)
                  const isExpanded = expandedRows.has(log.id)

                  return (
                    <>
                      <tr key={log.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-sm text-theme-muted">
                            <Clock className="w-3.5 h-3.5" />
                            <span title={formatDate(log.createdAt)}>{formatTimeAgo(log.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {log.user.image ? (
                              <Image
                                src={log.user.image}
                                alt={log.user.name || ''}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-6 h-6 bg-theme-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-theme-primary" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-theme-primary">
                                {log.user.name || 'Unknown'}
                              </p>
                              <p className="text-xs text-theme-muted">{log.user.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${actionInfo.color}`}>
                            {actionInfo.icon}
                            {actionInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-theme-primary max-w-md truncate" title={log.description}>
                            {log.description}
                          </p>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {log.metadata && Object.keys(log.metadata).length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRow(log.id)}
                              className="text-theme-muted hover:text-theme-primary"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </Button>
                          )}
                        </td>
                      </tr>
                      {isExpanded && log.metadata && (
                        <tr key={`${log.id}-details`} className="bg-[var(--muted)]/30">
                          <td colSpan={5} className="px-4 py-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {log.metadata.targetType && (
                                <div>
                                  <span className="text-theme-muted">Target Type:</span>
                                  <span className="ml-2 text-theme-primary capitalize">{log.metadata.targetType}</span>
                                </div>
                              )}
                              {log.metadata.targetId && (
                                <div>
                                  <span className="text-theme-muted">Target ID:</span>
                                  <span className="ml-2 text-theme-primary font-mono text-xs">{log.metadata.targetId}</span>
                                </div>
                              )}
                              {log.metadata.ipAddress && (
                                <div>
                                  <span className="text-theme-muted">IP Address:</span>
                                  <span className="ml-2 text-theme-primary">{log.metadata.ipAddress}</span>
                                </div>
                              )}
                              {log.metadata.reason && (
                                <div className="col-span-2">
                                  <span className="text-theme-muted">Reason:</span>
                                  <span className="ml-2 text-theme-primary">{log.metadata.reason}</span>
                                </div>
                              )}
                              {log.metadata.permanent !== undefined && (
                                <div>
                                  <span className="text-theme-muted">Permanent:</span>
                                  <span className="ml-2 text-theme-primary">{log.metadata.permanent ? 'Yes' : 'No'}</span>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>

          {logs.length === 0 && (
            <div className="p-12 text-center">
              <Shield className="w-12 h-12 text-theme-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-theme-primary mb-2">No audit logs found</h3>
              <p className="text-theme-muted">
                {hasActiveFilters ? 'Try adjusting your filters.' : 'Admin actions will appear here.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-[var(--card-border)] flex items-center justify-between">
              <p className="text-sm text-theme-muted">
                Showing {((page - 1) * 50) + 1} to {Math.min(page * 50, total)} of {total.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-theme-secondary">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
