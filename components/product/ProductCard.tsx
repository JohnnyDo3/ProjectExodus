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
    <Card className="hover-lift h-full flex flex-col border-4 border-moss-200 hover:border-moss-400 transition-all transform hover:scale-105 bg-white shadow-lg">
      <CardHeader className="pb-4">
        {product.featured && (
          <div className="flex items-center gap-2 mb-3">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-moss-500 to-ocean-500 flex items-center gap-1.5 shadow-md">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-xs font-black text-white uppercase tracking-wide">Featured</span>
            </div>
          </div>
        )}
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-black line-clamp-2" style={{ color: '#000' }}>
            {product.name.toUpperCase()}
          </CardTitle>
          {score && (
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center shadow-lg">
              <span className="text-xl font-black text-white">{score}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-sm font-bold mt-2" style={{ color: '#666' }}>
          {product.category.name.toUpperCase()}
          {product.vendor && (
            <>
              <span className="mx-1.5">•</span>
              <span className="text-moss-600">{product.vendor.name}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pb-4">
        <p className="text-sm font-medium line-clamp-3 mb-4" style={{ color: '#444' }}>
          {product.description}
        </p>
        {product.sustainabilityMetric?.carbonSavings && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-moss-50 to-moss-100 border-2 border-moss-300">
            <p className="text-xs font-bold text-moss-900">
              <span className="text-base">
                {Number(product.sustainabilityMetric.carbonSavings).toFixed(0)} kg CO₂
              </span>
              <br />
              <span className="text-moss-700">SAVED VS CONVENTIONAL</span>
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t-4 border-sand-200 pt-5">
        {product.price ? (
          <span className="text-2xl font-black" style={{ color: '#000' }}>
            ${Number(product.price).toFixed(2)}
          </span>
        ) : (
          <span className="text-sm font-bold" style={{ color: '#666' }}>
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
