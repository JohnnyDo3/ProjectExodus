'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Package,
  Flag,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Eye,
  ChevronDown,
  Filter,
  RefreshCw,
  ExternalLink,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAdminPusher, useAdminEvent } from '@/components/admin/AdminPusherProvider'

interface ModerationItem {
  id: string
  type: 'product' | 'report' | 'comment'
  title: string
  description: string
  image: string | null
  author: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
  createdAt: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status?: string
  metadata?: Record<string, any>
}

interface Counts {
  products: number
  reports: number
  total: number
}

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-700 border-gray-300',
  MEDIUM: 'bg-blue-100 text-blue-700 border-blue-300',
  HIGH: 'bg-orange-100 text-orange-700 border-orange-300',
  CRITICAL: 'bg-red-100 text-red-700 border-red-300',
}

const priorityIcons = {
  LOW: null,
  MEDIUM: null,
  HIGH: <AlertTriangle className="w-3 h-3" />,
  CRITICAL: <AlertTriangle className="w-3 h-3 animate-pulse" />,
}

export default function ModerationPage() {
  const { data: session } = useSession()
  const { isConnected } = useAdminPusher()
  const [items, setItems] = useState<ModerationItem[]>([])
  const [counts, setCounts] = useState<Counts>({ products: 0, reports: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [typeFilter, setTypeFilter] = useState<'all' | 'products' | 'reports'>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Action modals
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [affiliateLink, setAffiliateLink] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')
  const [resolutionNote, setResolutionNote] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const fetchQueue = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    try {
      const res = await fetch(`/api/admin/moderation?type=${typeFilter}`)
      if (res.ok) {
        const data = await res.json()
        setItems(data.items)
        setCounts(data.counts)
      }
    } catch (error) {
      console.error('Failed to fetch moderation queue:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [typeFilter])

  useEffect(() => {
    fetchQueue()
  }, [fetchQueue])

  // Listen for real-time updates
  useAdminEvent('new-product', () => {
    fetchQueue()
  }, [fetchQueue])

  useAdminEvent('new-report', () => {
    fetchQueue()
  }, [fetchQueue])

  useAdminEvent('product-approved', () => {
    fetchQueue()
  }, [fetchQueue])

  useAdminEvent('product-rejected', () => {
    fetchQueue()
  }, [fetchQueue])

  useAdminEvent('report-resolved', () => {
    fetchQueue()
  }, [fetchQueue])

  const handleProductAction = async (action: 'approve' | 'reject') => {
    if (!selectedItem) return
    if (action === 'approve' && !affiliateLink.trim()) {
      alert('Please enter an affiliate link')
      return
    }
    if (action === 'reject' && !rejectionReason.trim()) {
      alert('Please enter a rejection reason')
      return
    }

    setActionLoading(true)
    try {
      const res = await fetch('/api/admin/products/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedItem.id,
          action,
          affiliateLink: action === 'approve' ? affiliateLink.trim() : undefined,
          reason: action === 'reject' ? rejectionReason.trim() : undefined,
        })
      })

      if (res.ok) {
        setShowProductModal(false)
        setSelectedItem(null)
        setAffiliateLink('')
        setRejectionReason('')
        fetchQueue()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to process product')
      }
    } catch (error) {
      console.error('Product action error:', error)
      alert('Failed to process product')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReportAction = async (action: 'resolve' | 'dismiss') => {
    if (!selectedItem) return

    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/reports/${selectedItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: action === 'resolve' ? 'RESOLVED' : 'DISMISSED',
          resolutionNote: resolutionNote.trim() || undefined,
        })
      })

      if (res.ok) {
        setShowReportModal(false)
        setSelectedItem(null)
        setResolutionNote('')
        fetchQueue()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to update report')
      }
    } catch (error) {
      console.error('Report action error:', error)
      alert('Failed to update report')
    } finally {
      setActionLoading(false)
    }
  }

  const openActionModal = (item: ModerationItem) => {
    setSelectedItem(item)
    if (item.type === 'product') {
      setShowProductModal(true)
    } else if (item.type === 'report') {
      setShowReportModal(true)
    }
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return d.toLocaleDateString()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Package className="w-4 h-4" />
      case 'report':
        return <Flag className="w-4 h-4" />
      case 'comment':
        return <MessageSquare className="w-4 h-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-purple-100 text-purple-700'
      case 'report':
        return 'bg-red-100 text-red-700'
      case 'comment':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
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
          <h1 className="text-2xl font-bold text-theme-primary">Moderation Queue</h1>
          <p className="text-theme-muted mt-1">
            {counts.total} items need review
            {isConnected && (
              <span className="inline-flex items-center ml-2 text-green-600 text-xs">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
                Live
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchQueue(true)}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-theme-muted">Pending Products</p>
                <p className="text-2xl font-bold text-theme-primary">{counts.products}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-theme-muted">Open Reports</p>
                <p className="text-2xl font-bold text-theme-primary">{counts.reports}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-theme-muted">Total Queue</p>
                <p className="text-2xl font-bold text-theme-primary">{counts.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter dropdown */}
      {showFilters && (
        <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-theme-muted mr-2">Type:</span>
              {(['all', 'products', 'reports'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    typeFilter === type
                      ? 'bg-theme-primary text-white'
                      : 'bg-[var(--muted)] text-theme-secondary hover:bg-[var(--accent)]'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queue Items */}
      {items.length === 0 ? (
        <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-theme-primary mb-2">All caught up!</h3>
            <p className="text-theme-muted">No items need moderation right now.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card
              key={`${item.type}-${item.id}`}
              className="bg-[var(--card-bg)] border-[var(--card-border)] hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Image or Icon */}
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-[var(--muted)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${priorityColors[item.priority]}`}>
                            {priorityIcons[item.priority]}
                            {item.priority}
                          </span>
                          {item.status === 'REVIEWING' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                              <Eye className="w-3 h-3" />
                              Reviewing
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-theme-primary truncate">{item.title}</h3>
                        <p className="text-sm text-theme-muted line-clamp-2 mt-1">{item.description}</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openActionModal(item)}
                        >
                          Review
                        </Button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-theme-muted">
                      <div className="flex items-center gap-1">
                        {item.author.image ? (
                          <Image
                            src={item.author.image}
                            alt={item.author.name || ''}
                            width={16}
                            height={16}
                            className="rounded-full"
                          />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span>{item.author.name || item.author.email}</span>
                      </div>
                      <span>{formatDate(item.createdAt)}</span>
                      {item.metadata?.contentType && (
                        <span className="text-theme-muted">
                          Re: {item.metadata.contentType}
                        </span>
                      )}
                      {item.metadata?.price && (
                        <span className="font-medium text-green-600">
                          ${item.metadata.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Product Review Modal */}
      {showProductModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] w-full max-w-lg">
            <CardHeader>
              <CardTitle>Review Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-theme-primary">{selectedItem.title}</h4>
                <p className="text-sm text-theme-muted mt-1">{selectedItem.description}</p>
              </div>

              {selectedItem.image && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[var(--muted)]">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Affiliate Link (required for approval)
                </label>
                <input
                  type="url"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Rejection Reason (required for rejection)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this product is being rejected..."
                  rows={3}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[var(--card-border)]">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowProductModal(false)
                    setSelectedItem(null)
                    setAffiliateLink('')
                    setRejectionReason('')
                  }}
                  disabled={actionLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleProductAction('reject')}
                  disabled={actionLoading}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4 mr-1" />}
                  Reject
                </Button>
                <Button
                  onClick={() => handleProductAction('approve')}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Review Modal */}
      {showReportModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] w-full max-w-lg">
            <CardHeader>
              <CardTitle>Review Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-theme-primary">{selectedItem.title}</h4>
                <p className="text-sm text-theme-muted mt-1">{selectedItem.description}</p>
              </div>

              {selectedItem.metadata?.contentType && (
                <div className="flex items-center gap-2 p-3 bg-[var(--muted)] rounded-lg">
                  <span className="text-sm text-theme-secondary">Reported Content:</span>
                  <Link
                    href={`/admin/${selectedItem.metadata.contentType}s/${selectedItem.metadata.contentId}`}
                    className="text-sm text-theme-primary hover:underline flex items-center gap-1"
                  >
                    View {selectedItem.metadata.contentType}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Resolution Note (optional)
                </label>
                <textarea
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Add notes about how this report was handled..."
                  rows={3}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[var(--card-border)]">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReportModal(false)
                    setSelectedItem(null)
                    setResolutionNote('')
                  }}
                  disabled={actionLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleReportAction('dismiss')}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4 mr-1" />}
                  Dismiss
                </Button>
                <Button
                  onClick={() => handleReportAction('resolve')}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                  Resolve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
