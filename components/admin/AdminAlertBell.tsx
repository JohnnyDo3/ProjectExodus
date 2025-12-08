'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, AlertTriangle, Shield, Bug, Flag, Package, Check } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface AdminAlert {
  id: string
  type: string
  priority: string
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: string
}

const alertIcons: Record<string, React.ElementType> = {
  NEW_REPORT: Flag,
  USER_BANNED: Shield,
  SECURITY_ALERT: AlertTriangle,
  SYSTEM_ERROR: Bug,
  CONTENT_FLAGGED: Flag,
  PRODUCT_SUBMISSION: Package,
  HIGH_PRIORITY_REPORT: AlertTriangle,
  ADMIN_ACTION: Shield,
}

const priorityColors: Record<string, string> = {
  LOW: 'text-blue-500 bg-blue-500/10',
  MEDIUM: 'text-yellow-500 bg-yellow-500/10',
  HIGH: 'text-orange-500 bg-orange-500/10',
  CRITICAL: 'text-red-500 bg-red-500/10',
}

export function AdminAlertBell() {
  const [alerts, setAlerts] = useState<AdminAlert[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/alerts?limit=10')
      if (res.ok) {
        const data = await res.json()
        setAlerts(data.alerts || [])
      }
    } catch (error) {
      console.error('Failed to fetch admin alerts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()
    // Poll every 30 seconds for new alerts
    const interval = setInterval(fetchAlerts, 30000)
    return () => clearInterval(interval)
  }, [fetchAlerts])

  const unreadCount = alerts.filter(a => !a.read).length

  const markAsRead = async (alertId: string) => {
    try {
      await fetch(`/api/admin/alerts/${alertId}/read`, { method: 'POST' })
      setAlerts(prev =>
        prev.map(a => (a.id === alertId ? { ...a, read: true } : a))
      )
    } catch (error) {
      console.error('Failed to mark alert as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await fetch('/api/admin/alerts/read-all', { method: 'POST' })
      setAlerts(prev => prev.map(a => ({ ...a, read: true })))
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
        title="Admin Alerts"
      >
        <Bell className="w-5 h-5 text-[var(--foreground)]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-[var(--card)] rounded-xl shadow-lg border-2 border-[var(--border)] overflow-hidden z-[101]">
            {/* Header */}
            <div className="p-4 border-b-2 border-[var(--border)] flex items-center justify-between">
              <h3 className="font-bold text-[var(--foreground)]">
                Admin Alerts
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-theme-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Alerts List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <Bell className="w-8 h-8 text-theme-muted mx-auto mb-2 animate-pulse" />
                  <p className="text-sm text-theme-muted">Loading alerts...</p>
                </div>
              ) : alerts.length === 0 ? (
                <div className="p-8 text-center">
                  <Check className="w-8 h-8 text-theme-primary mx-auto mb-2" />
                  <p className="text-sm text-theme-muted">No alerts</p>
                </div>
              ) : (
                <ul>
                  {alerts.map((alert) => {
                    const Icon = alertIcons[alert.type] || Bell
                    const priorityClass = priorityColors[alert.priority] || priorityColors.MEDIUM

                    return (
                      <li
                        key={alert.id}
                        className={`
                          border-b border-[var(--border)] last:border-b-0
                          ${!alert.read ? 'bg-theme-primary/5' : ''}
                        `}
                      >
                        <div
                          className="p-4 hover:bg-[var(--muted)] transition-colors cursor-pointer"
                          onClick={() => {
                            if (!alert.read) markAsRead(alert.id)
                            if (alert.link) {
                              setIsOpen(false)
                              window.location.href = alert.link
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${priorityClass}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className={`font-medium text-sm ${!alert.read ? 'text-[var(--foreground)]' : 'text-theme-muted'}`}>
                                  {alert.title}
                                </p>
                                {!alert.read && (
                                  <span className="w-2 h-2 rounded-full bg-theme-primary flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-theme-muted line-clamp-2">
                                {alert.message}
                              </p>
                              <p className="text-xs text-theme-muted mt-1">
                                {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t-2 border-[var(--border)] bg-[var(--muted)]">
              <Link
                href="/admin/alerts"
                className="block text-center text-sm font-medium text-theme-primary hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View all alerts
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
