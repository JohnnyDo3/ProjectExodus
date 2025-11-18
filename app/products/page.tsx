import { Suspense } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
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
      <section className="py-32 bg-gradient-to-br from-moss-50 via-ocean-50 to-terra-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: '#000'
            }}>
              SUSTAINABLE PRODUCTS
            </h1>
            <p className="text-2xl font-bold" style={{ color: '#222' }}>
              Discover eco-friendly alternatives that{' '}
              <span style={{
                background: 'linear-gradient(135deg, #36763d, #357777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>align with your values</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-3xl mx-auto">
              <input
                type="search"
                placeholder="Search products..."
                className="px-6 py-4 rounded-2xl border-4 border-moss-300 focus:border-moss-500 focus:outline-none w-full sm:flex-1 text-lg font-semibold shadow-lg"
              />
              <Button size="lg" className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl">
                SEARCH
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      {categories.length > 0 && (
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #36763d, #2e6161)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                BROWSE BY CATEGORY
              </h2>
              <p className="text-xl font-semibold" style={{ color: '#333' }}>
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
                    <Card className="hover-lift cursor-pointer h-full border-4 border-moss-200 hover:border-moss-400 transition-all transform hover:scale-105">
                      <CardHeader>
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center shadow-lg">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-center text-2xl font-black" style={{ color: '#000' }}>
                          {category.name.toUpperCase()}
                        </CardTitle>
                        {category.description && (
                          <CardDescription className="text-center text-base line-clamp-2 font-medium" style={{ color: '#444' }}>
                            {category.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="px-4 py-2 rounded-full bg-moss-100 inline-block">
                          <p className="text-sm font-bold text-moss-800">
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

      {/* Products Grid */}
      {products.length > 0 ? (
        <section className="py-32 bg-sand-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black mb-6" style={{ color: '#000' }}>
                FEATURED PRODUCTS
              </h2>
              <p className="text-xl font-semibold" style={{ color: '#333' }}>
                Curated sustainable solutions for a better tomorrow
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length >= 12 && (
              <div className="text-center mt-16">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl">
                  LOAD MORE PRODUCTS →
                </Button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-32 bg-sand-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Card className="border-4 border-moss-300 bg-gradient-to-br from-moss-50 to-moss-100">
                <CardContent className="p-12">
                  <Leaf className="w-20 h-20 text-moss-600 mx-auto mb-6" />
                  <h3 className="text-4xl font-black mb-6" style={{ color: '#36763d' }}>
                    PRODUCTS LAUNCHING SOON
                  </h3>
                  <p className="text-xl font-semibold mb-8" style={{ color: '#2e5d30' }}>
                    We're building out our comprehensive product database with real sustainable products,
                    detailed specifications, sustainability metrics, and direct purchase links!
                  </p>
                  <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                    NOTIFY ME WHEN PRODUCTS LAUNCH
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">
              CAN'T FIND WHAT YOU'RE LOOKING FOR?
            </h2>
            <p className="text-2xl font-semibold">
              Request a product and help us expand our sustainable marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 bg-white text-earth-900 hover:bg-sand-100 font-black shadow-2xl rounded-2xl">
                REQUEST A PRODUCT
              </Button>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-white text-white hover:bg-white hover:text-earth-900 font-black rounded-2xl">
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
