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
    <Card className="card-gradient hover-lift h-full flex flex-col">
      <CardHeader>
        {product.featured && (
          <div className="flex items-center gap-1 text-xs text-moss-600 font-medium mb-2">
            <Leaf className="w-3 h-3" />
            Featured
          </div>
        )}
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
          {score && (
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-moss-100 flex items-center justify-center">
              <span className="text-lg font-bold text-moss-700">{score}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-xs text-earth-600">
          {product.category.name}
          {product.vendor && ` • ${product.vendor.name}`}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-earth-700 line-clamp-3">
          {product.description}
        </p>
        {product.sustainabilityMetric?.carbonSavings && (
          <div className="mt-4 p-3 rounded-lg bg-moss-50 border border-moss-200">
            <p className="text-xs text-moss-800">
              <span className="font-semibold">
                {product.sustainabilityMetric.carbonSavings.toFixed(0)} kg CO₂
              </span>
              {' '}saved vs conventional
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-sand-200 pt-4">
        {product.price ? (
          <span className="text-lg font-bold text-earth-900">
            ${product.price.toFixed(2)}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">
            See pricing
          </span>
        )}
        <Link href={`/products/${product.slug}`}>
          <Button size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
