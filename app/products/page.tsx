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
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Discover Sustainable{' '}
              <span className="earth-gradient-text">
                Products
              </span>
            </h1>
            <p className="text-xl text-earth-700">
              Explore eco-friendly alternatives across every category.
              Find products that align with your values and make a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <input
                type="search"
                placeholder="Search products..."
                className="px-6 py-3 rounded-lg border-2 border-sand-300 focus:border-moss-500 focus:outline-none w-full sm:w-96"
              />
              <Button size="lg">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      {categories.length > 0 && (
        <section className="py-20 bg-sand-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
              <p className="text-lg text-earth-700">
                Find exactly what you're looking for
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {categories.slice(0, 8).map((category: any) => {
                const Icon = getCategoryIcon(category.slug)
                const productCount = category._count?.products || 0

                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                  >
                    <Card className="card-gradient hover-lift cursor-pointer h-full">
                      <CardHeader>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-moss-100 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-moss-600" />
                        </div>
                        <CardTitle className="text-center text-lg">
                          {category.name}
                        </CardTitle>
                        {category.description && (
                          <CardDescription className="text-center text-sm line-clamp-2">
                            {category.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground">
                          {productCount} {productCount === 1 ? 'product' : 'products'}
                        </p>
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
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-lg text-earth-700">
                Curated sustainable solutions for a better tomorrow
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length >= 12 && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-moss-50 border-2 border-moss-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-moss-900">
                  Products Coming Soon!
                </h3>
                <p className="text-moss-800 mb-6">
                  We're currently building out our comprehensive product database.
                  This page will soon feature real sustainable products with detailed
                  specifications, sustainability metrics, and direct purchase links.
                </p>
                <p className="text-sm text-moss-700">
                  Check back soon or sign up to be notified when we launch! 🌱
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-moss-50 to-ocean-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-earth-700">
              Request a product and help us expand our sustainable marketplace
            </p>
            <Button size="lg">
              Request a Product
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
