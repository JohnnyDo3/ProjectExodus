'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Leaf, Search as SearchIcon, ChevronDown, X } from 'lucide-react'

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)

  // Filter products based on search and selected category
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
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.id === selectedCategory
      )
    }

    return filtered
  }, [initialProducts, searchQuery, selectedCategory])

  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMore = filteredProducts.length > displayCount

  const selectedCategoryName = selectedCategory === 'all'
    ? 'All Categories'
    : categories.find(c => c.id === selectedCategory)?.name || 'All Categories'

  const selectedCategoryCount = selectedCategory === 'all'
    ? initialProducts.length
    : categories.find(c => c.id === selectedCategory)?._count?.products || 0

  return (
    <div className="space-y-12">
      {/* Search and Category Filter - PROMINENTLY AT TOP */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Search Bar - FIRST */}
          <div className="relative">
            <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-theme-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sustainable products..."
              className="w-full pl-16 pr-12 py-6 text-lg font-semibold rounded-2xl bg-[var(--card)] border-4 border-theme-primary focus:border-theme-accent focus:outline-none text-[var(--foreground)] placeholder:text-theme-muted shadow-theme-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-theme-muted hover:bg-theme-primary transition-colors flex items-center justify-center"
                aria-label="Clear search"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            )}
          </div>

          {/* Category Dropdown - SECOND */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-6 py-5 text-lg font-black rounded-2xl bg-[var(--card)] border-4 border-theme-accent hover:border-theme-primary transition-all text-left flex items-center justify-between shadow-theme-lg"
            >
              <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-theme-accent" />
                <span className="text-[var(--foreground)]">{selectedCategoryName}</span>
                <span className="text-sm font-semibold text-theme-muted">
                  ({selectedCategoryCount} products)
                </span>
              </div>
              <ChevronDown className={`w-6 h-6 text-theme-accent transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-[var(--card)] border-4 border-theme-accent rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
                <div className="p-2">
                  {/* All Categories Option */}
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-6 py-4 rounded-xl text-left font-bold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-theme-primary text-[var(--primary-foreground)]'
                        : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>All Categories</span>
                      <span className="text-sm font-semibold opacity-75">
                        {initialProducts.length} products
                      </span>
                    </div>
                  </button>

                  {/* Individual Categories */}
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setDropdownOpen(false)
                      }}
                      className={`w-full px-6 py-4 rounded-xl text-left font-bold transition-all ${
                        selectedCategory === category.id
                          ? 'bg-theme-primary text-[var(--primary-foreground)]'
                          : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm font-semibold opacity-75">
                          {category._count?.products || 0} products
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="text-center py-4">
            <p className="text-xl font-black text-[var(--foreground)]">
              {filteredProducts.length === initialProducts.length ? (
                <>Showing all <span className="text-theme-primary">{filteredProducts.length}</span> sustainable products</>
              ) : (
                <>Found <span className="text-theme-primary">{filteredProducts.length}</span> products</>
              )}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="mt-3 text-sm font-bold text-theme-accent hover:text-theme-primary transition-colors underline"
              >
                Clear all filters
              </button>
            )}
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
                  LOAD MORE PRODUCTS ({filteredProducts.length - displayCount} remaining)
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
                      ? `No products match "${searchQuery}". Try a different search term.`
                      : 'No products in this category yet. Check back soon!'}
                  </p>
                  <Button
                    size="lg"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="text-lg px-10 py-6 font-black shadow-lg"
                  >
                    VIEW ALL PRODUCTS
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
