import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { BackButton } from '@/components/navigation/BackButton'
import { Leaf, ExternalLink, TrendingDown, Award } from 'lucide-react'
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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Products" fallbackUrl="/products" />
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-[var(--card)] rounded-3xl border-4 border-theme-primary flex items-center justify-center overflow-hidden shadow-2xl">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-12">
                      <Leaf className="w-24 h-24 sm:w-32 sm:h-32 text-theme-primary opacity-30 mx-auto mb-6" />
                      <p className="text-lg font-bold text-theme-muted">
                        PRODUCT IMAGE COMING SOON
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6 sm:space-y-8">
                {product.featured && (
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full shadow-lg">
                      <Leaf className="w-5 h-5 text-[var(--primary-foreground)]" />
                      <span className="text-sm font-black text-[var(--primary-foreground)] uppercase tracking-wide">
                        Featured Product
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-[var(--foreground)]">
                    {product.name.toUpperCase()}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base font-bold">
                    <Link
                      href={`/products?category=${product.category.slug}`}
                      className="text-theme-primary hover:opacity-80 uppercase"
                    >
                      {product.category.name}
                    </Link>
                    {product.vendor && (
                      <>
                        <span className="text-theme-muted">•</span>
                        <Link
                          href={`/vendors/${product.vendor.slug}`}
                          className="text-theme-accent hover:opacity-80"
                        >
                          {product.vendor.name}
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Sustainability Score */}
                {score && (
                  <Card className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/20 border-4 border-theme-primary shadow-xl">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black mb-2 text-theme-primary">
                            SUSTAINABILITY SCORE
                          </h3>
                          <p className="text-sm sm:text-base font-semibold text-theme-muted">
                            Based on environmental impact
                          </p>
                        </div>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] flex items-center justify-center shadow-2xl">
                          <span className="text-3xl sm:text-4xl font-black">{score}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Price & CTA */}
                <div className="space-y-4 sm:space-y-6">
                  {product.price ? (
                    <div className="text-4xl sm:text-5xl font-black text-[var(--foreground)]">
                      ${Number(product.price).toFixed(2)}
                    </div>
                  ) : (
                    <div className="text-lg sm:text-xl font-bold text-theme-muted">
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
                      <Button size="lg" className="w-full text-lg sm:text-xl py-6 sm:py-8 font-black shadow-2xl">
                        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                        BUY FROM VENDOR
                      </Button>
                    </a>
                  ) : (
                    <Button size="lg" className="w-full text-lg sm:text-xl py-6 sm:py-8 font-black" disabled>
                      PURCHASE LINK COMING SOON
                    </Button>
                  )}
                </div>

                {/* Key Metrics */}
                {(carbonSavings || carbonFootprint) && (
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {carbonSavings && (
                      <Card className="border-4 border-theme-primary shadow-lg">
                        <CardContent className="p-4 sm:p-6 text-center">
                          <TrendingDown className="w-10 h-10 sm:w-12 sm:h-12 text-theme-primary mx-auto mb-2 sm:mb-3" />
                          <div className="text-2xl sm:text-3xl font-black text-theme-primary">
                            {carbonSavings.toFixed(0)} kg
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold mt-2 text-theme-muted">
                            CO₂ SAVINGS VS CONVENTIONAL
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {carbonFootprint && (
                      <Card className="border-4 border-theme-accent shadow-lg">
                        <CardContent className="p-4 sm:p-6 text-center">
                          <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-theme-accent mx-auto mb-2 sm:mb-3" />
                          <div className="text-2xl sm:text-3xl font-black text-theme-accent">
                            {carbonFootprint.toFixed(1)} kg
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold mt-2 text-theme-muted">
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
      <section className="py-16 sm:py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 sm:gap-10">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8 sm:space-y-10">
              {/* Description */}
              <Card className="border-4 border-theme-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl font-black text-[var(--foreground)]">
                    ABOUT THIS PRODUCT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg font-medium leading-relaxed text-theme-muted">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Specifications */}
              {product.specifications && typeof product.specifications === 'object' && (
                <Card className="border-4 border-theme-accent shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-black text-[var(--foreground)]">
                      SPECIFICATIONS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      {Object.entries(product.specifications as Record<string, any>).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between py-3 border-b-2 border-[var(--border)]">
                            <dt className="font-bold uppercase text-[var(--foreground)]">
                              {key.replace(/_/g, ' ')}
                            </dt>
                            <dd className="font-semibold text-theme-muted">{String(value)}</dd>
                          </div>
                        )
                      )}
                    </dl>
                  </CardContent>
                </Card>
              )}

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <Card className="border-4 border-theme-secondary shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-black text-[var(--foreground)]">
                      CERTIFICATIONS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {product.certifications.map((cert: any) => (
                        <div
                          key={cert.id}
                          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 bg-[var(--primary)]/10 border-2 border-theme-primary rounded-xl shadow-md"
                        >
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-theme-primary" />
                          <span className="font-black text-theme-primary text-sm sm:text-base">
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
            <div className="space-y-6 sm:space-y-8">
              {/* Vendor Info */}
              {product.vendor && (
                <Card className="border-4 border-theme-accent shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-black text-[var(--foreground)]">
                      VENDOR
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link
                      href={`/vendors/${product.vendor.slug}`}
                      className="block group"
                    >
                      <h3 className="font-black text-xl sm:text-2xl mb-3 text-theme-accent group-hover:opacity-80">
                        {product.vendor.name.toUpperCase()}
                      </h3>
                    </Link>
                    {product.vendor.description && (
                      <p className="text-sm sm:text-base font-medium line-clamp-4 text-theme-muted">
                        {product.vendor.description}
                      </p>
                    )}
                    {product.vendor.website && (
                      <a
                        href={product.vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-theme-primary hover:opacity-80 mt-4"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        VISIT WEBSITE
                      </a>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <Card className="border-4 border-theme-secondary shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-black text-[var(--foreground)]">
                      TAGS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {product.tags.map((tagRel: any) => (
                        <Link
                          key={tagRel.tag.id}
                          href={`/products?tag=${tagRel.tag.slug}`}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--muted)] hover:bg-[var(--primary)]/20 border-2 border-[var(--border)] rounded-xl text-xs sm:text-sm font-bold transition-colors text-[var(--foreground)]"
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
