import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Leaf, Star, ExternalLink, Shield } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number | null
    featured: boolean
    purchaseLink?: string | null
    category: {
      name: string
      slug: string
    }
    vendor?: {
      name: string
    }
    sustainabilityMetric?: {
      sustainabilityScore: number | null
      carbonSavings: number | null
    }
  }
}

// Get rating tier based on score
function getRatingTier(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 90) return { label: 'EXCEPTIONAL', color: 'text-emerald-600', bgColor: 'bg-emerald-500' }
  if (score >= 80) return { label: 'EXCELLENT', color: 'text-green-600', bgColor: 'bg-green-500' }
  if (score >= 70) return { label: 'VERY GOOD', color: 'text-lime-600', bgColor: 'bg-lime-500' }
  if (score >= 60) return { label: 'GOOD', color: 'text-yellow-600', bgColor: 'bg-yellow-500' }
  return { label: 'FAIR', color: 'text-orange-600', bgColor: 'bg-orange-500' }
}

// Check if product is an affiliate product
function isAffiliateProduct(purchaseLink?: string | null): boolean {
  return purchaseLink?.includes('ref=projectexodus') || purchaseLink?.includes('?ref=') || false
}

export function ProductCard({ product }: ProductCardProps) {
  const score = product.sustainabilityMetric?.sustainabilityScore
  const tier = score ? getRatingTier(score) : null
  const isAffiliate = isAffiliateProduct(product.purchaseLink)

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <Card className="hover-lift h-full flex flex-col border-4 border-theme-primary hover:opacity-90 transition-all transform hover:scale-105 shadow-theme-lg cursor-pointer relative overflow-hidden">
        {/* Affiliate Badge */}
        {isAffiliate && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-md">
              <Shield className="w-3 h-3" />
              PARTNER
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          {/* Featured & Rating Row */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {product.featured && (
              <div className="px-3 py-1 rounded-full bg-theme-primary flex items-center gap-1.5 shadow-md">
                <Leaf className="w-4 h-4 text-[var(--primary-foreground)]" />
                <span className="text-xs font-black text-[var(--primary-foreground)] uppercase tracking-wide">Featured</span>
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg font-black line-clamp-2 flex-1">
              {product.name.toUpperCase()}
            </CardTitle>

            {/* Project Exodus Rating Badge */}
            {score && tier && (
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full ${tier.bgColor} flex items-center justify-center shadow-lg relative`}>
                  <span className="text-xl font-black text-white">{score}</span>
                </div>
                <span className={`text-[8px] font-black mt-1 ${tier.color} uppercase tracking-wider`}>
                  {tier.label}
                </span>
              </div>
            )}
          </div>

          <CardDescription className="text-sm font-bold mt-2 flex items-center gap-1.5 flex-wrap">
            <span className="text-[var(--muted-foreground)]">{product.category.name.toUpperCase()}</span>
            {product.vendor && (
              <>
                <span className="text-[var(--muted-foreground)]">•</span>
                <span className="text-theme-primary flex items-center gap-1">
                  {product.vendor.name}
                  {isAffiliate && <ExternalLink className="w-3 h-3" />}
                </span>
              </>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow pb-4">
          <p className="text-sm font-medium line-clamp-3 mb-4 text-[var(--foreground)] opacity-80">
            {product.description}
          </p>

          {/* Sustainability Metrics */}
          {product.sustainabilityMetric?.carbonSavings && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-500/30">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="text-base flex items-center gap-1">
                  <Leaf className="w-4 h-4" />
                  {Number(product.sustainabilityMetric.carbonSavings).toFixed(0)} kg CO₂
                </span>
                <span className="opacity-80 text-[10px]">CARBON SAVINGS</span>
              </p>
            </div>
          )}

          {/* Rating Label */}
          {score && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.round(score / 20)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">
                Exodus Rating
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t-4 border-[var(--border)] pt-4">
          {product.price ? (
            <span className="text-2xl font-black text-[var(--foreground)]">
              ${Number(product.price).toFixed(2)}
            </span>
          ) : (
            <span className="text-sm font-bold text-[var(--muted-foreground)]">
              SEE PRICING
            </span>
          )}
          <span className="px-5 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-black text-sm shadow-lg flex items-center gap-1.5">
            VIEW
            {isAffiliate && <ExternalLink className="w-3.5 h-3.5" />}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
