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
  const carbonSavings = product.sustainabilityMetric?.carbonSavings ? Number(product.sustainabilityMetric.carbonSavings) : null
  const carbonFootprint = product.sustainabilityMetric?.carbonFootprint ? Number(product.sustainabilityMetric.carbonFootprint) : null

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-moss-50 via-ocean-50 to-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-3xl border-4 border-moss-300 flex items-center justify-center overflow-hidden shadow-2xl">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-12">
                      <Leaf className="w-32 h-32 text-moss-300 mx-auto mb-6" />
                      <p className="text-lg font-bold" style={{ color: '#666' }}>
                        PRODUCT IMAGE COMING SOON
                      </p>
                    </div>
                  )}
                </div>
                {/* Thumbnail gallery would go here */}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                {product.featured && (
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-moss-500 to-ocean-500 rounded-full shadow-lg">
                      <Leaf className="w-5 h-5 text-white" />
                      <span className="text-sm font-black text-white uppercase tracking-wide">
                        Featured Product
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ color: '#000' }}>
                    {product.name.toUpperCase()}
                  </h1>
                  <div className="flex items-center gap-4 text-base font-bold">
                    <Link
                      href={`/products?category=${product.category.slug}`}
                      className="text-moss-600 hover:text-moss-700 uppercase"
                    >
                      {product.category.name}
                    </Link>
                    {product.vendor && (
                      <>
                        <span style={{ color: '#999' }}>•</span>
                        <Link
                          href={`/vendors/${product.vendor.slug}`}
                          className="text-ocean-600 hover:text-ocean-700"
                        >
                          {product.vendor.name}
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Sustainability Score */}
                {score && (
                  <Card className="bg-gradient-to-br from-moss-50 to-moss-100 border-4 border-moss-300 shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-black mb-2" style={{ color: '#2e5d30' }}>
                            SUSTAINABILITY SCORE
                          </h3>
                          <p className="text-base font-semibold text-moss-700">
                            Based on environmental impact
                          </p>
                        </div>
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 text-white flex items-center justify-center shadow-2xl">
                          <span className="text-4xl font-black">{score}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Price & CTA */}
                <div className="space-y-6">
                  {product.price ? (
                    <div className="text-5xl font-black" style={{ color: '#000' }}>
                      ${Number(product.price).toFixed(2)}
                    </div>
                  ) : (
                    <div className="text-xl font-bold" style={{ color: '#666' }}>
                      CONTACT VENDOR FOR PRICING
                    </div>
                  )}

                  {product.purchaseLink ? (
                    <a
                      href={product.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button size="lg" className="w-full text-xl py-8 font-black shadow-2xl">
                        <ExternalLink className="w-6 h-6 mr-3" />
                        BUY FROM VENDOR
                      </Button>
                    </a>
                  ) : (
                    <Button size="lg" className="w-full text-xl py-8 font-black" disabled>
                      PURCHASE LINK COMING SOON
                    </Button>
                  )}
                </div>

                {/* Key Metrics */}
                {(carbonSavings || carbonFootprint) && (
                  <div className="grid grid-cols-2 gap-6">
                    {carbonSavings && (
                      <Card className="border-4 border-moss-200 shadow-lg">
                        <CardContent className="p-6 text-center">
                          <TrendingDown className="w-12 h-12 text-moss-600 mx-auto mb-3" />
                          <div className="text-3xl font-black text-moss-700">
                            {carbonSavings.toFixed(0)} kg
                          </div>
                          <div className="text-xs font-bold mt-2" style={{ color: '#666' }}>
                            CO₂ SAVINGS VS CONVENTIONAL
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {carbonFootprint && (
                      <Card className="border-4 border-ocean-200 shadow-lg">
                        <CardContent className="p-6 text-center">
                          <Leaf className="w-12 h-12 text-ocean-600 mx-auto mb-3" />
                          <div className="text-3xl font-black text-ocean-700">
                            {carbonFootprint.toFixed(1)} kg
                          </div>
                          <div className="text-xs font-bold mt-2" style={{ color: '#666' }}>
                            CARBON FOOTPRINT
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
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-10">
              {/* Description */}
              <Card className="border-4 border-moss-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-3xl font-black" style={{ color: '#000' }}>
                    ABOUT THIS PRODUCT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium leading-relaxed" style={{ color: '#444' }}>
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Specifications */}
              {product.specifications && typeof product.specifications === 'object' && (
                <Card className="border-4 border-ocean-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl font-black" style={{ color: '#000' }}>
                      SPECIFICATIONS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      {Object.entries(product.specifications as Record<string, any>).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between py-3 border-b-2 border-sand-200">
                            <dt className="font-bold uppercase" style={{ color: '#000' }}>
                              {key.replace(/_/g, ' ')}
                            </dt>
                            <dd className="font-semibold" style={{ color: '#666' }}>{String(value)}</dd>
                          </div>
                        )
                      )}
                    </dl>
                  </CardContent>
                </Card>
              )}

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <Card className="border-4 border-terra-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl font-black" style={{ color: '#000' }}>
                      CERTIFICATIONS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {product.certifications.map((cert: any) => (
                        <div
                          key={cert.id}
                          className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-moss-50 to-moss-100 border-2 border-moss-300 rounded-xl shadow-md"
                        >
                          <Award className="w-6 h-6 text-moss-600" />
                          <span className="font-black text-moss-900">
                            {cert.certification.name.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Vendor Info */}
              {product.vendor && (
                <Card className="border-4 border-ocean-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black" style={{ color: '#000' }}>
                      VENDOR
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link
                      href={`/vendors/${product.vendor.slug}`}
                      className="block group"
                    >
                      <h3 className="font-black text-2xl mb-3 text-ocean-600 group-hover:text-ocean-700">
                        {product.vendor.name.toUpperCase()}
                      </h3>
                    </Link>
                    {product.vendor.description && (
                      <p className="text-base font-medium line-clamp-4" style={{ color: '#666' }}>
                        {product.vendor.description}
                      </p>
                    )}
                    {product.vendor.website && (
                      <a
                        href={product.vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base font-bold text-moss-600 hover:text-moss-700 mt-4"
                      >
                        <ExternalLink className="w-5 h-5" />
                        VISIT WEBSITE
                      </a>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <Card className="border-4 border-terra-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black" style={{ color: '#000' }}>
                      TAGS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {product.tags.map((tagRel: any) => (
                        <Link
                          key={tagRel.tag.id}
                          href={`/products?tag=${tagRel.tag.slug}`}
                          className="px-4 py-2 bg-sand-100 hover:bg-sand-200 border-2 border-sand-300 rounded-xl text-sm font-bold transition-colors"
                          style={{ color: '#444' }}
                        >
                          {tagRel.tag.name.toUpperCase()}
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
