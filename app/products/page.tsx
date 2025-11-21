import { Suspense } from 'react'
import { ProductsClient } from '@/components/product/ProductsClient'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Zap, Droplet, Recycle, Leaf } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        vendor: true,
        images: true,
        sustainabilityMetric: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      take: 50,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Convert Prisma types to frontend-compatible types
    return products.map(product => ({
      ...product,
      price: product.price ? Number(product.price) : null,
      vendor: product.vendor ? { name: product.vendor.name } : undefined,
      sustainabilityMetric: product.sustainabilityMetric ? {
        sustainabilityScore: product.sustainabilityMetric.sustainabilityScore ? Number(product.sustainabilityMetric.sustainabilityScore) : null,
        carbonSavings: product.sustainabilityMetric.carbonSavings ? Number(product.sustainabilityMetric.carbonSavings) : null,
      } : undefined,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return categories
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

  const totalProducts = products.length
  const totalCategories = categories.length

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              SUSTAINABLE MARKETPLACE
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Discover <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>{totalProducts}+ eco-friendly products</span> across {totalCategories} categories
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="px-6 py-3 bg-[var(--card)] border-2 border-theme-primary rounded-full">
                <p className="text-sm font-black text-[var(--foreground)]">
                  ✓ Vetted for Sustainability
                </p>
              </div>
              <div className="px-6 py-3 bg-[var(--card)] border-2 border-theme-accent rounded-full">
                <p className="text-sm font-black text-[var(--foreground)]">
                  ✓ Real Brands You Trust
                </p>
              </div>
              <div className="px-6 py-3 bg-[var(--card)] border-2 border-theme-secondary rounded-full">
                <p className="text-sm font-black text-[var(--foreground)]">
                  ✓ Carbon Impact Data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search, Filters, and Products Grid - IMMEDIATELY AFTER HERO */}
      <section className="py-16 bg-[var(--background)]">
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
              <Link href="/contact">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-2xl">
                  REQUEST A PRODUCT
                </Button>
              </Link>
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
