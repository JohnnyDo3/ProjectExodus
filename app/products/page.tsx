import { Suspense } from 'react'
import { ProductsClient } from '@/components/product/ProductsClient'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Zap, Droplet, Recycle, Leaf } from 'lucide-react'
import Link from 'next/link'

async function getProducts() {
  try {
    // In production, this would be an absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products?limit=12`, {
      cache: 'no-store', // Always get fresh data
    })

    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch categories')
    }

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'energy': Zap,
  'water': Droplet,
  'materials': Recycle,
  'organic': Leaf,
  'default': Leaf,
}

function getCategoryIcon(categorySlug: string) {
  const iconKey = Object.keys(categoryIcons).find(key =>
    categorySlug.toLowerCase().includes(key)
  )
  return categoryIcons[iconKey || 'default']
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              SUSTAINABLE PRODUCTS
            </h1>
            <p className="text-2xl font-bold text-theme-muted">
              Discover eco-friendly alternatives that{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>align with your values</span>
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      {categories.length > 0 && (
        <section className="py-32 bg-[var(--background)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                BROWSE BY CATEGORY
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                Find exactly what you're looking for
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {categories.slice(0, 8).map((category: any) => {
                const Icon = getCategoryIcon(category.slug)
                const productCount = category._count?.products || 0

                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                  >
                    <Card className="hover-lift cursor-pointer h-full border-4 border-theme-primary hover:border-theme-accent transition-all transform hover:scale-105">
                      <CardHeader>
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                          <Icon className="w-10 h-10 text-[var(--primary-foreground)]" />
                        </div>
                        <CardTitle className="text-center text-2xl font-black text-[var(--foreground)]">
                          {category.name.toUpperCase()}
                        </CardTitle>
                        {category.description && (
                          <CardDescription className="text-center text-base line-clamp-2 font-medium text-theme-muted">
                            {category.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] inline-block">
                          <p className="text-sm font-bold text-theme-primary">
                            {productCount} {productCount === 1 ? 'PRODUCT' : 'PRODUCTS'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search, Filters, and Products Grid */}
      <section className="py-16">
        <ProductsClient initialProducts={products} categories={categories} />
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">
              CAN'T FIND WHAT YOU'RE LOOKING FOR?
            </h2>
            <p className="text-2xl font-semibold">
              Request a product and help us expand our sustainable marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-2xl">
                REQUEST A PRODUCT
              </Button>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-2xl">
                  LEARN MORE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
