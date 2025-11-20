'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { Search } from '@/components/ui/Search'
import { Filter } from '@/components/ui/Filter'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Leaf, SlidersHorizontal } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number | null
  featured: boolean
  category: {
    id: string
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
  tags?: Array<{
    tag: {
      id: string
      name: string
    }
  }>
}

interface Category {
  id: string
  name: string
  slug: string
  _count?: {
    products: number
  }
}

interface ProductsClientProps {
  initialProducts: Product[]
  categories: Category[]
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)
  const [displayCount, setDisplayCount] = useState(12)

  // Filter products based on search and selected categories
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.name.toLowerCase().includes(query) ||
        product.vendor?.name.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category.id)
      )
    }

    return filtered
  }, [initialProducts, searchQuery, selectedCategories])

  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMore = filteredProducts.length > displayCount

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const categoryOptions = categories.map(cat => ({
    id: cat.id,
    label: cat.name,
    count: cat._count?.products
  }))

  return (
    <div className="space-y-16">
      {/* Search and Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Bar */}
          <Search
            placeholder="Search products, categories, vendors..."
            onSearch={setSearchQuery}
            className="max-w-3xl mx-auto"
          />

          {/* Filter Toggle */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="font-bold border-2"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && categories.length > 0 && (
            <div className="bg-[var(--card)] rounded-3xl border-4 border-theme-primary p-8 shadow-theme-xl">
              <Filter
                title="CATEGORIES"
                options={categoryOptions}
                selectedIds={selectedCategories}
                onToggle={handleCategoryToggle}
                onClear={() => setSelectedCategories([])}
              />
            </div>
          )}

          {/* Results Count */}
          <div className="text-center">
            <p className="text-lg font-bold text-theme-muted">
              Showing {displayedProducts.length} of {filteredProducts.length} products
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategories.length > 0 && ` in ${selectedCategories.length} categor${selectedCategories.length === 1 ? 'y' : 'ies'}`}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {displayedProducts.length > 0 ? (
        <section className="bg-[var(--muted)] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-16">
                <Button
                  size="lg"
                  onClick={() => setDisplayCount(prev => prev + 12)}
                  className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl"
                >
                  LOAD MORE PRODUCTS →
                </Button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-[var(--muted)] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Card className="border-4 border-theme-secondary shadow-theme-lg">
                <CardContent className="p-12">
                  <Leaf className="w-20 h-20 text-theme-secondary mx-auto mb-6" />
                  <h3 className="text-4xl font-black mb-6 text-theme-secondary">
                    NO PRODUCTS FOUND
                  </h3>
                  <p className="text-xl font-semibold mb-8 text-theme-muted">
                    {searchQuery
                      ? `No products match "${searchQuery}". Try a different search term or adjust your filters.`
                      : 'No products match your current filters. Try adjusting your selection.'}
                  </p>
                  <Button
                    size="lg"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategories([])
                    }}
                    className="text-lg px-10 py-6 font-black shadow-lg"
                  >
                    CLEAR ALL FILTERS
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
