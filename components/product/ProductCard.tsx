import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Leaf, ExternalLink } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number | null
    featured: boolean
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

export function ProductCard({ product }: ProductCardProps) {
  const score = product.sustainabilityMetric?.sustainabilityScore

  return (
    <Card className="hover-lift h-full flex flex-col border-4 border-theme-primary hover:opacity-90 transition-all transform hover:scale-105 shadow-theme-lg">
      <CardHeader className="pb-4">
        {product.featured && (
          <div className="flex items-center gap-2 mb-3">
            <div className="px-3 py-1 rounded-full bg-theme-primary flex items-center gap-1.5 shadow-md">
              <Leaf className="w-4 h-4 text-[var(--primary-foreground)]" />
              <span className="text-xs font-black text-[var(--primary-foreground)] uppercase tracking-wide">Featured</span>
            </div>
          </div>
        )}
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-black line-clamp-2">
            {product.name.toUpperCase()}
          </CardTitle>
          {score && (
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-theme-accent flex items-center justify-center shadow-lg">
              <span className="text-xl font-black text-[var(--accent-foreground)]">{score}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-sm font-bold mt-2">
          {product.category.name.toUpperCase()}
          {product.vendor && (
            <>
              <span className="mx-1.5">•</span>
              <span className="text-theme-primary">{product.vendor.name}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pb-4">
        <p className="text-sm font-medium line-clamp-3 mb-4 text-[var(--foreground)] opacity-80">
          {product.description}
        </p>
        {product.sustainabilityMetric?.carbonSavings && (
          <div className="p-3 rounded-xl bg-theme-muted border-2 border-theme-primary">
            <p className="text-xs font-bold text-theme-primary">
              <span className="text-base">
                {Number(product.sustainabilityMetric.carbonSavings).toFixed(0)} kg CO₂
              </span>
              <br />
              <span className="opacity-80">SAVED VS CONVENTIONAL</span>
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t-4 border-[var(--border)] pt-5">
        {product.price ? (
          <span className="text-2xl font-black text-[var(--foreground)]">
            ${Number(product.price).toFixed(2)}
          </span>
        ) : (
          <span className="text-sm font-bold text-theme-muted">
            SEE PRICING
          </span>
        )}
        <Link href={`/products/${product.slug}`}>
          <Button size="sm" className="font-black shadow-lg px-6">
            VIEW →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
