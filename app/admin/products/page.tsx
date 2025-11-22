'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Package, CheckCircle, XCircle, Clock, User, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

interface Seller {
  id: string
  name: string | null
  email: string
  image: string | null
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  materials: string
  images: string[]
  externalUrl: string
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  rejectionReason: string | null
  affiliateLink: string | null
  reviewedBy: string | null
  reviewedAt: Date | null
  createdAt: Date
  seller: Seller
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING')
  const [loading, setLoading] = useState(true)
  const [reviewingProduct, setReviewingProduct] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [affiliateLink, setAffiliateLink] = useState('')
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null)
  const [showApproveModal, setShowApproveModal] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (statusFilter === 'ALL') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.approvalStatus === statusFilter))
    }
  }, [statusFilter, products])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        console.error('Failed to fetch products')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (productId: string) => {
    if (!affiliateLink.trim()) {
      alert('Please enter an affiliate link')
      return
    }

    setReviewingProduct(productId)
    try {
      const response = await fetch('/api/admin/products/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          action: 'approve',
          affiliateLink: affiliateLink.trim()
        })
      })

      if (response.ok) {
        alert('Product approved successfully!')
        setShowApproveModal(null)
        setAffiliateLink('')
        fetchProducts()
      } else {
        const data = await response.json()
        alert(`Error: ${data.error || 'Failed to approve product'}`)
      }
    } catch (error) {
      console.error('Error approving product:', error)
      alert('An error occurred while approving the product')
    } finally {
      setReviewingProduct(null)
    }
  }

  const handleReject = async (productId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason')
      return
    }

    setReviewingProduct(productId)
    try {
      const response = await fetch('/api/admin/products/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          action: 'reject',
          rejectionReason: rejectionReason.trim()
        })
      })

      if (response.ok) {
        alert('Product rejected with feedback sent to seller')
        setShowRejectModal(null)
        setRejectionReason('')
        fetchProducts()
      } else {
        const data = await response.json()
        alert(`Error: ${data.error || 'Failed to reject product'}`)
      }
    } catch (error) {
      console.error('Error rejecting product:', error)
      alert('An error occurred while rejecting the product')
    } finally {
      setReviewingProduct(null)
    }
  }

  const pendingCount = products.filter(p => p.approvalStatus === 'PENDING').length
  const approvedCount = products.filter(p => p.approvalStatus === 'APPROVED').length
  const rejectedCount = products.filter(p => p.approvalStatus === 'REJECTED').length

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--muted)] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-theme-primary mx-auto mb-4 animate-pulse" />
          <p className="text-theme-muted font-medium">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Admin" fallbackUrl="/admin" />
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-3">
                  <span className="text-xs font-black uppercase tracking-wider">Admin Panel</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-1">
                  PRODUCT REVIEW CENTER
                </h1>
                <p className="text-sm font-semibold opacity-90">
                  Review and approve user-submitted products for the marketplace
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/marketplace">
                  <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-black">
                    <Package className="w-4 h-4 mr-2" />
                    VIEW MARKETPLACE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-4 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`text-center p-4 rounded-lg transition-colors ${
                  statusFilter === 'ALL' ? 'bg-[var(--primary)]/10 border-2 border-theme-primary' : 'hover:bg-[var(--muted)]'
                }`}
              >
                <div className="text-xl font-black text-[var(--foreground)]">{products.length}</div>
                <div className="text-xs font-semibold text-theme-muted uppercase">Total Products</div>
              </button>
              <button
                onClick={() => setStatusFilter('PENDING')}
                className={`text-center p-4 rounded-lg transition-colors ${
                  statusFilter === 'PENDING' ? 'bg-yellow-500/10 border-2 border-yellow-500' : 'hover:bg-[var(--muted)]'
                }`}
              >
                <div className="text-xl font-black text-yellow-500">{pendingCount}</div>
                <div className="text-xs font-semibold text-theme-muted uppercase">Pending Review</div>
              </button>
              <button
                onClick={() => setStatusFilter('APPROVED')}
                className={`text-center p-4 rounded-lg transition-colors ${
                  statusFilter === 'APPROVED' ? 'bg-green-500/10 border-2 border-green-500' : 'hover:bg-[var(--muted)]'
                }`}
              >
                <div className="text-xl font-black text-green-500">{approvedCount}</div>
                <div className="text-xs font-semibold text-theme-muted uppercase">Approved</div>
              </button>
              <button
                onClick={() => setStatusFilter('REJECTED')}
                className={`text-center p-4 rounded-lg transition-colors ${
                  statusFilter === 'REJECTED' ? 'bg-red-500/10 border-2 border-red-500' : 'hover:bg-[var(--muted)]'
                }`}
              >
                <div className="text-xl font-black text-red-500">{rejectedCount}</div>
                <div className="text-xs font-semibold text-theme-muted uppercase">Rejected</div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-black text-[var(--foreground)] mb-2">
                    No Products Found
                  </h3>
                  <p className="text-theme-muted font-medium">
                    {statusFilter === 'PENDING' && 'No products pending review at this time.'}
                    {statusFilter === 'APPROVED' && 'No approved products yet.'}
                    {statusFilter === 'REJECTED' && 'No rejected products.'}
                    {statusFilter === 'ALL' && 'No products have been submitted yet.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-[var(--foreground)]">
                    {statusFilter === 'ALL' ? 'ALL PRODUCTS' : `${statusFilter} PRODUCTS`}
                  </h2>
                  <span className="text-sm font-medium text-theme-muted">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>

                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Product Images */}
                        <div className="flex-shrink-0">
                          <div className="grid grid-cols-2 gap-2 w-48">
                            {product.images.slice(0, 4).map((img, idx) => (
                              <div key={idx} className="w-full pt-[100%] relative rounded-lg bg-[var(--muted)] overflow-hidden">
                                {img ? (
                                  <img
                                    src={img}
                                    alt={`${product.name} ${idx + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-theme-muted opacity-50" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-2xl font-black text-[var(--foreground)] mb-1">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl font-black text-theme-primary">
                                  ${product.price.toFixed(2)}
                                </span>
                                <span className="text-xs font-bold uppercase px-2 py-1 bg-theme-accent/20 text-theme-accent rounded">
                                  {product.category.replace('-', ' ')}
                                </span>
                              </div>
                            </div>

                            {/* Status Badge */}
                            {product.approvalStatus === 'PENDING' && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 rounded-full">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs font-black uppercase">Pending Review</span>
                              </div>
                            )}
                            {product.approvalStatus === 'APPROVED' && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded-full">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-black uppercase">Approved</span>
                              </div>
                            )}
                            {product.approvalStatus === 'REJECTED' && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full">
                                <XCircle className="w-4 h-4" />
                                <span className="text-xs font-black uppercase">Rejected</span>
                              </div>
                            )}
                          </div>

                          <p className="text-sm font-medium text-theme-muted mb-4">
                            {product.description}
                          </p>

                          {/* Materials */}
                          <div className="mb-4 p-3 bg-[var(--muted)] rounded-lg">
                            <p className="text-xs font-bold text-theme-muted uppercase mb-1">Sustainable Materials:</p>
                            <p className="text-sm font-medium text-[var(--foreground)]">{product.materials}</p>
                          </div>

                          {/* Seller Info */}
                          <div className="mb-4 p-3 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-lg border border-[var(--border)]">
                            <p className="text-xs font-bold text-theme-muted uppercase mb-2">Seller Information:</p>
                            <div className="flex items-center gap-3">
                              {product.seller.image ? (
                                <img
                                  src={product.seller.image}
                                  alt={product.seller.name || 'Seller'}
                                  className="w-10 h-10 rounded-full"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                                  <User className="w-5 h-5 text-white" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-black text-[var(--foreground)]">
                                  {product.seller.name || 'Anonymous Maker'}
                                </p>
                                <p className="text-xs font-medium text-theme-muted">{product.seller.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* External URL */}
                          <div className="mb-4">
                            <p className="text-xs font-bold text-theme-muted uppercase mb-1">Seller's Store Link:</p>
                            <a
                              href={product.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold text-theme-primary hover:underline flex items-center gap-1"
                            >
                              {product.externalUrl}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          {/* Affiliate Link (if approved) */}
                          {product.approvalStatus === 'APPROVED' && product.affiliateLink && (
                            <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                              <p className="text-xs font-bold text-green-700 dark:text-green-300 mb-1">Affiliate Link:</p>
                              <code className="text-xs font-mono text-theme-muted break-all">
                                {product.affiliateLink}
                              </code>
                            </div>
                          )}

                          {/* Rejection Reason (if rejected) */}
                          {product.approvalStatus === 'REJECTED' && product.rejectionReason && (
                            <div className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                              <p className="text-xs font-bold text-red-700 dark:text-red-300 mb-1">Rejection Reason:</p>
                              <p className="text-sm font-medium text-theme-muted">
                                {product.rejectionReason}
                              </p>
                            </div>
                          )}

                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs font-semibold text-theme-muted mb-4">
                            <span>Submitted {new Date(product.createdAt).toLocaleDateString()}</span>
                            {product.reviewedAt && (
                              <span>Reviewed {new Date(product.reviewedAt).toLocaleDateString()}</span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          {product.approvalStatus === 'PENDING' && (
                            <div className="flex gap-3">
                              <Button
                                onClick={() => setShowApproveModal(product.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black"
                                disabled={reviewingProduct === product.id}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                APPROVE PRODUCT
                              </Button>
                              <Button
                                onClick={() => setShowRejectModal(product.id)}
                                variant="outline"
                                className="flex-1 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 font-black"
                                disabled={reviewingProduct === product.id}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                REJECT PRODUCT
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Approve Modal */}
                      {showApproveModal === product.id && (
                        <div className="mt-4 p-4 border-2 border-green-500 rounded-lg bg-green-500/5">
                          <h4 className="text-lg font-black text-[var(--foreground)] mb-3">Approve Product</h4>
                          <div className="mb-4">
                            <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                              Affiliate Link (Required) *
                            </label>
                            <input
                              type="url"
                              value={affiliateLink}
                              onChange={(e) => setAffiliateLink(e.target.value)}
                              placeholder="https://projectexodus.com/marketplace/product-slug"
                              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] font-medium"
                            />
                            <p className="text-xs text-theme-muted mt-1">
                              Enter the Project Exodus marketplace URL for this product
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleApprove(product.id)}
                              className="bg-green-600 hover:bg-green-700 text-white font-black"
                              disabled={reviewingProduct === product.id || !affiliateLink.trim()}
                            >
                              {reviewingProduct === product.id ? 'Approving...' : 'Confirm Approval'}
                            </Button>
                            <Button
                              onClick={() => {
                                setShowApproveModal(null)
                                setAffiliateLink('')
                              }}
                              variant="outline"
                              className="font-black"
                              disabled={reviewingProduct === product.id}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Reject Modal */}
                      {showRejectModal === product.id && (
                        <div className="mt-4 p-4 border-2 border-red-500 rounded-lg bg-red-500/5">
                          <h4 className="text-lg font-black text-[var(--foreground)] mb-3">Reject Product</h4>
                          <div className="mb-4">
                            <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                              Rejection Reason (Required) *
                            </label>
                            <textarea
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              placeholder="Provide clear feedback on why this product doesn't meet our standards..."
                              rows={4}
                              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] font-medium resize-none"
                            />
                            <p className="text-xs text-theme-muted mt-1">
                              This feedback will be sent to the seller
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleReject(product.id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-black"
                              disabled={reviewingProduct === product.id || !rejectionReason.trim()}
                            >
                              {reviewingProduct === product.id ? 'Rejecting...' : 'Confirm Rejection'}
                            </Button>
                            <Button
                              onClick={() => {
                                setShowRejectModal(null)
                                setRejectionReason('')
                              }}
                              variant="outline"
                              className="font-black"
                              disabled={reviewingProduct === product.id}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
