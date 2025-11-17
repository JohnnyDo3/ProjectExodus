import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Leaf, ExternalLink, TrendingDown, Award, Star } from 'lucide-react'
import Link from 'next/link'

async function getProduct(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const score = product.sustainabilityMetric?.sustainabilityScore
  const carbonSavings = product.sustainabilityMetric?.carbonSavings
  const carbonFootprint = product.sustainabilityMetric?.carbonFootprint

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-sand-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <Leaf className="w-24 h-24 text-moss-300 mx-auto mb-4" />
                      <p className="text-earth-500">Product image coming soon</p>
                    </div>
                  )}
                </div>
                {/* Thumbnail gallery would go here */}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {product.featured && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-moss-100 text-moss-700 rounded-full text-sm font-medium">
                    <Leaf className="w-4 h-4" />
                    Featured Product
                  </div>
                )}

                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-earth-600">
                    <Link
                      href={`/products?category=${product.category.slug}`}
                      className="hover:text-moss-600"
                    >
                      {product.category.name}
                    </Link>
                    {product.vendor && (
                      <>
                        <span>•</span>
                        <Link
                          href={`/vendors/${product.vendor.slug}`}
                          className="hover:text-moss-600"
                        >
                          {product.vendor.name}
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Sustainability Score */}
                {score && (
                  <Card className="bg-gradient-to-br from-moss-50 to-moss-100 border-moss-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-moss-900 mb-1">
                            Sustainability Score
                          </h3>
                          <p className="text-sm text-moss-700">
                            Based on environmental impact metrics
                          </p>
                        </div>
                        <div className="w-20 h-20 rounded-full bg-moss-600 text-white flex items-center justify-center">
                          <span className="text-3xl font-bold">{score}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Price & CTA */}
                <div className="space-y-4">
                  {product.price ? (
                    <div className="text-4xl font-bold text-earth-900">
                      ${Number(product.price).toFixed(2)}
                    </div>
                  ) : (
                    <div className="text-lg text-earth-600">
                      Contact vendor for pricing
                    </div>
                  )}

                  {product.purchaseLink ? (
                    <a
                      href={product.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button size="lg" className="w-full">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Buy from Vendor
                      </Button>
                    </a>
                  ) : (
                    <Button size="lg" className="w-full" disabled>
                      Purchase Link Coming Soon
                    </Button>
                  )}
                </div>

                {/* Key Metrics */}
                {(carbonSavings || carbonFootprint) && (
                  <div className="grid grid-cols-2 gap-4">
                    {carbonSavings && (
                      <Card>
                        <CardContent className="p-4 text-center">
                          <TrendingDown className="w-8 h-8 text-moss-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-moss-700">
                            {carbonSavings.toFixed(0)} kg
                          </div>
                          <div className="text-xs text-earth-600">
                            CO₂ savings vs conventional
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {carbonFootprint && (
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Leaf className="w-8 h-8 text-earth-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-earth-700">
                            {carbonFootprint.toFixed(1)} kg
                          </div>
                          <div className="text-xs text-earth-600">
                            Carbon footprint
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Product</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-earth-700 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Specifications */}
              {product.specifications && typeof product.specifications === 'object' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3">
                      {Object.entries(product.specifications as Record<string, any>).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-sand-200">
                            <dt className="font-medium text-earth-900 capitalize">
                              {key.replace(/_/g, ' ')}
                            </dt>
                            <dd className="text-earth-700">{String(value)}</dd>
                          </div>
                        )
                      )}
                    </dl>
                  </CardContent>
                </Card>
              )}

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {product.certifications.map((cert: any) => (
                        <div
                          key={cert.id}
                          className="flex items-center gap-2 px-4 py-2 bg-moss-50 border border-moss-200 rounded-lg"
                        >
                          <Award className="w-5 h-5 text-moss-600" />
                          <span className="font-medium text-moss-900">
                            {cert.certification.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Vendor Info */}
              {product.vendor && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vendor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/vendors/${product.vendor.slug}`}
                      className="block hover:text-moss-600"
                    >
                      <h3 className="font-bold text-lg mb-2">
                        {product.vendor.name}
                      </h3>
                    </Link>
                    {product.vendor.description && (
                      <p className="text-sm text-earth-600 line-clamp-3">
                        {product.vendor.description}
                      </p>
                    )}
                    {product.vendor.website && (
                      <a
                        href={product.vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-moss-600 hover:underline mt-2 inline-block"
                      >
                        Visit Website →
                      </a>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tagRel: any) => (
                        <Link
                          key={tagRel.tag.id}
                          href={`/products?tag=${tagRel.tag.slug}`}
                          className="px-3 py-1 bg-sand-100 hover:bg-sand-200 rounded-full text-sm text-earth-700"
                        >
                          {tagRel.tag.name}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
