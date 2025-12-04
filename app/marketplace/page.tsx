import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Package, ExternalLink, Heart, User } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'
import { TreeBranches } from '@/components/decorative/TreeBranches'
import { FlyingBirds } from '@/components/decorative/FlyingBirds'

async function getApprovedProducts() {
  try {
    const products = await prisma.userProduct.findMany({
      where: {
        approvalStatus: 'APPROVED',
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 24,
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function MarketplacePage() {
  const products = await getApprovedProducts()

  const categories = [
    'all',
    'home-decor',
    'accessories',
    'clothing',
    'personal-care',
    'kitchen',
    'garden',
    'art',
    'other',
  ]

  return (
    <div className="min-h-screen relative">
      {/* Decorative Elements */}
      <TreeBranches />
      <FlyingBirds />

      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-block px-6 py-3 bg-[var(--accent)]/10 rounded-full border-2 border-theme-accent mb-4">
              <span className="text-sm font-black text-theme-accent uppercase tracking-wider">
                Community Marketplace
              </span>
            </div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              HANDMADE SUSTAINABLE PRODUCTS
            </h1>
            <p className="text-xl font-bold text-theme-muted max-w-3xl mx-auto">
              Support community makers creating <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>eco-friendly</span> products for a better planet
            </p>
            <div className="flex justify-center">
              <Link href="/profile/products/new">
                <Button size="lg" className="text-lg px-10 py-6 rounded-2xl shadow-2xl font-black">
                  <Package className="w-5 h-5 mr-2" />
                  SELL YOUR PRODUCTS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {products.length === 0 ? (
              <Card>
                <CardContent className="p-16 text-center">
                  <Package className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-black text-[var(--foreground)] mb-2">
                    Marketplace Coming Soon
                  </h3>
                  <p className="text-theme-muted font-medium mb-6 max-w-md mx-auto">
                    Be the first to share your sustainable creations with our community!
                  </p>
                  <Link href="/profile/products/new">
                    <Button size="lg" className="font-black">
                      <Package className="w-4 h-4 mr-2" />
                      SUBMIT YOUR PRODUCT
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-black text-[var(--foreground)] mb-2">
                    FEATURED PRODUCTS
                  </h2>
                  <p className="text-theme-muted font-medium">
                    {products.length} handcrafted sustainable {products.length === 1 ? 'item' : 'items'} from community makers
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product: any) => (
                    <Card key={product.id} className="hover:shadow-xl transition-all group">
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative w-full pt-[100%] bg-[var(--muted)] overflow-hidden rounded-t-lg">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Package className="w-12 h-12 text-theme-muted opacity-50" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <h3 className="text-lg font-black text-[var(--foreground)] mb-1 line-clamp-1">
                            {product.name}
                          </h3>

                          <p className="text-sm font-medium text-theme-muted mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-black text-theme-primary">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-xs font-bold uppercase px-2 py-1 bg-theme-accent/20 text-theme-accent rounded">
                              {product.category.replace('-', ' ')}
                            </span>
                          </div>

                          {/* Seller Info */}
                          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--border)]">
                            {product.seller.image ? (
                              <img
                                src={product.seller.image}
                                alt={product.seller.name || 'Seller'}
                                className="w-6 h-6 rounded-full"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <span className="text-xs font-semibold text-theme-muted">
                              by {product.seller.name || 'Anonymous Maker'}
                            </span>
                          </div>

                          {/* Materials */}
                          <div className="mb-3">
                            <p className="text-xs font-bold text-theme-muted uppercase mb-1">Materials:</p>
                            <p className="text-xs font-medium text-[var(--foreground)] line-clamp-1">
                              {product.materials}
                            </p>
                          </div>

                          {/* Action Button */}
                          <a
                            href={product.affiliateLink || product.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full"
                          >
                            <Button size="sm" className="w-full font-black">
                              <ExternalLink className="w-3 h-3 mr-2" />
                              VIEW IN STORE
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-5xl font-black">
              READY TO SHARE YOUR CREATIONS?
            </h2>
            <p className="text-xl font-semibold opacity-90">
              Join our community of sustainable makers and reach thousands of eco-conscious customers
            </p>
            <Link href="/profile/products/new">
              <Button size="lg" className="text-xl px-14 py-10 bg-white text-[var(--primary)] hover:bg-[var(--sand-100)] rounded-2xl font-black shadow-2xl">
                START SELLING TODAY →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
