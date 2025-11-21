import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Package, DollarSign, Image, AlertCircle, CheckCircle, Clock, Store } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db/prisma'

async function getUserProducts(userId: string) {
  try {
    const products = await prisma.userProduct.findMany({
      where: {
        sellerId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return products
  } catch (error) {
    console.error('Error fetching user products:', error)
    return []
  }
}

export default async function MyProductsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/signin?callbackUrl=/profile/products')
  }

  const userProducts = await getUserProducts(session.user.id)

  const pendingCount = userProducts.filter((p: any) => p.approvalStatus === 'PENDING').length
  const approvedCount = userProducts.filter((p: any) => p.approvalStatus === 'APPROVED').length
  const rejectedCount = userProducts.filter((p: any) => p.approvalStatus === 'REJECTED').length

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-[var(--accent)] via-[var(--primary)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-3">
                  <span className="text-xs font-black uppercase tracking-wider">Seller Dashboard</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-1">
                  MY PRODUCTS
                </h1>
                <p className="text-sm font-semibold opacity-90">
                  Sell your handmade sustainable products on Project Exodus
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/profile/products/new">
                  <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-black">
                    <Package className="w-4 h-4 mr-2" />
                    ADD PRODUCT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-4 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-black text-yellow-500">{pendingCount}</div>
                <div className="text-xs font-semibold text-theme-muted uppercase">Pending Review</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-green-500">{approvedCount}</div>
                <div className="text-xs font-semibold text-theme-muted uppercase">Live Products</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-red-500">{rejectedCount}</div>
                <div className="text-xs font-semibold text-theme-muted uppercase">Needs Work</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Info Card */}
            <Card className="mb-8 border-2 border-[var(--primary)] bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Store className="w-8 h-8 text-theme-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-[var(--foreground)] mb-2">How It Works</h3>
                    <ul className="space-y-2 text-sm font-medium text-theme-muted">
                      <li className="flex items-start gap-2">
                        <span className="text-theme-primary font-black">1.</span>
                        <span>Submit your handmade, sustainable product with photos and details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-theme-primary font-black">2.</span>
                        <span>Project Exodus team reviews your product for quality and sustainability standards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-theme-primary font-black">3.</span>
                        <span>If approved, we'll create an affiliate link and list your product on the marketplace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-theme-primary font-black">4.</span>
                        <span>You handle fulfillment directly with customers through your provided link</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-theme-primary font-black">5.</span>
                        <span>We promote your products to our community of sustainability advocates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products List */}
            {userProducts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-black text-[var(--foreground)] mb-2">No Products Yet</h3>
                  <p className="text-theme-muted font-medium mb-6">
                    Start selling your handmade sustainable products on Project Exodus
                  </p>
                  <Link href="/profile/products/new">
                    <Button size="lg" className="font-black">
                      <Package className="w-4 h-4 mr-2" />
                      ADD YOUR FIRST PRODUCT
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-[var(--foreground)]">YOUR PRODUCTS</h2>
                </div>

                {userProducts.map((product: any) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image className="w-8 h-8 text-theme-muted" />
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-lg font-black text-[var(--foreground)]">{product.name}</h3>
                            <div className="text-lg font-black text-theme-primary flex-shrink-0">
                              ${product.price.toFixed(2)}
                            </div>
                          </div>

                          <p className="text-sm font-medium text-theme-muted mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center gap-4 flex-wrap">
                            {/* Status Badge */}
                            {product.approvalStatus === 'PENDING' && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 rounded-full">
                                <Clock className="w-3 h-3" />
                                <span className="text-xs font-black uppercase">Pending Review</span>
                              </div>
                            )}
                            {product.approvalStatus === 'APPROVED' && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded-full">
                                <CheckCircle className="w-3 h-3" />
                                <span className="text-xs font-black uppercase">Live on Site</span>
                              </div>
                            )}
                            {product.approvalStatus === 'REJECTED' && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full">
                                <AlertCircle className="w-3 h-3" />
                                <span className="text-xs font-black uppercase">Needs Revision</span>
                              </div>
                            )}

                            {/* Product Link */}
                            {product.externalUrl && (
                              <a
                                href={product.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-theme-primary hover:underline"
                              >
                                View Your Store →
                              </a>
                            )}

                            {/* Submitted Date */}
                            <span className="text-xs font-semibold text-theme-muted">
                              Submitted {new Date(product.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Rejection Reason */}
                          {product.approvalStatus === 'REJECTED' && product.rejectionReason && (
                            <div className="mt-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                              <p className="text-xs font-bold text-red-700 dark:text-red-300 mb-1">
                                Feedback from Project Exodus:
                              </p>
                              <p className="text-xs font-medium text-theme-muted">
                                {product.rejectionReason}
                              </p>
                            </div>
                          )}

                          {/* Affiliate Link (if approved) */}
                          {product.approvalStatus === 'APPROVED' && product.affiliateLink && (
                            <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                              <p className="text-xs font-bold text-green-700 dark:text-green-300 mb-1">
                                Your Affiliate Link:
                              </p>
                              <code className="text-xs font-mono text-theme-muted break-all">
                                {product.affiliateLink}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
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
