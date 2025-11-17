import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product/ProductCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ExternalLink, Package, Leaf } from 'lucide-react'
import Link from 'next/link'

async function getVendor(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/vendors/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching vendor:', error)
    return null
  }
}

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const vendor = await getVendor(slug)

  if (!vendor) {
    notFound()
  }

  const productCount = vendor._count?.products || 0

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Vendor Logo/Icon */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
                  {vendor.logo ? (
                    <img
                      src={vendor.logo}
                      alt={vendor.name}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <Leaf className="w-16 h-16 text-moss-500" />
                  )}
                </div>
              </div>

              {/* Vendor Info */}
              <div className="flex-grow space-y-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-earth-900 mb-2">
                    {vendor.name}
                  </h1>
                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-moss-600 hover:text-moss-700 font-medium"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {vendor.description && (
                  <p className="text-lg text-earth-700 leading-relaxed max-w-2xl">
                    {vendor.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-moss-100 rounded-lg">
                    <Package className="w-5 h-5 text-moss-600" />
                    <div>
                      <div className="font-bold text-moss-900">{productCount}</div>
                      <div className="text-xs text-moss-700">
                        {productCount === 1 ? 'Product' : 'Products'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {vendor.products && vendor.products.length > 0 ? (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-earth-900 mb-2">
                  Products by {vendor.name}
                </h2>
                <p className="text-earth-600">
                  Browse {productCount} sustainable {productCount === 1 ? 'product' : 'products'} from this vendor
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vendor.products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-12">
                <Package className="w-16 h-16 text-earth-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-earth-900 mb-2">
                  No Products Yet
                </h3>
                <p className="text-earth-600 mb-6">
                  This vendor hasn't listed any products yet. Check back soon!
                </p>
                <Link href="/products">
                  <Button>Browse All Products</Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {vendor.description && (
        <section className="py-20 bg-sand-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>About {vendor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-earth-700 leading-relaxed">
                    {vendor.description}
                  </p>

                  {vendor.website && (
                    <div className="pt-4 border-t border-sand-200">
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit {vendor.name} Website
                        </Button>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-earth-900">
              Discover More Sustainable Vendors
            </h2>
            <p className="text-lg text-earth-700">
              Explore other eco-friendly brands and sustainable product makers
            </p>
            <Link href="/products">
              <Button size="lg">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
