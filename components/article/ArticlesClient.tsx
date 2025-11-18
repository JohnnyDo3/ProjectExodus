'use client'

import { useState, useMemo } from 'react'
import { ArticleCard } from './ArticleCard'
import { Search } from '@/components/ui/Search'
import { Filter } from '@/components/ui/Filter'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { BookOpen, SlidersHorizontal } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage?: string
  readTime: number | null
  publishedAt: Date | null
  featured: boolean
  author: {
    name: string | null
    image: string | null
  }
  category: {
    id: string
    name: string
    slug: string
  }
  tags?: Array<{
    tag: {
      id: string
      name: string
    }
  }>
  _count?: {
    comments: number
  }
}

interface ArticleCategory {
  id: string
  name: string
  slug: string
  _count?: {
    articles: number
  }
}

interface ArticlesClientProps {
  initialArticles: Article[]
  categories: ArticleCategory[]
}

export function ArticlesClient({ initialArticles, categories }: ArticlesClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)
  const [displayCount, setDisplayCount] = useState(12)

  // Filter articles based on search and selected categories
  const filteredArticles = useMemo(() => {
    let filtered = initialArticles

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.category.name.toLowerCase().includes(query) ||
        article.author.name?.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.includes(article.category.id)
      )
    }

    return filtered
  }, [initialArticles, searchQuery, selectedCategories])

  const displayedArticles = filteredArticles.slice(0, displayCount)
  const hasMore = filteredArticles.length > displayCount

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
    count: cat._count?.articles
  }))

  return (
    <div className="space-y-16">
      {/* Search and Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Bar */}
          <Search
            placeholder="Search articles, topics, authors..."
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
            <div className="bg-white rounded-3xl border-4 border-ocean-200 p-8 shadow-xl">
              <Filter
                title="TOPICS"
                options={categoryOptions}
                selectedIds={selectedCategories}
                onToggle={handleCategoryToggle}
                onClear={() => setSelectedCategories([])}
              />
            </div>
          )}

          {/* Results Count */}
          <div className="text-center">
            <p className="text-lg font-bold" style={{ color: '#666' }}>
              Showing {displayedArticles.length} of {filteredArticles.length} articles
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategories.length > 0 && ` in ${selectedCategories.length} topic${selectedCategories.length === 1 ? '' : 's'}`}
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {displayedArticles.length > 0 ? (
        <section className="bg-sand-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-16">
                <Button
                  size="lg"
                  onClick={() => setDisplayCount(prev => prev + 12)}
                  className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl"
                >
                  LOAD MORE ARTICLES →
                </Button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-sand-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Card className="border-4 border-ocean-300 bg-gradient-to-br from-ocean-50 to-ocean-100">
                <CardContent className="p-12">
                  <BookOpen className="w-20 h-20 text-ocean-600 mx-auto mb-6" />
                  <h3 className="text-4xl font-black mb-6" style={{ color: '#357777' }}>
                    NO ARTICLES FOUND
                  </h3>
                  <p className="text-xl font-semibold mb-8" style={{ color: '#666' }}>
                    {searchQuery
                      ? `No articles match "${searchQuery}". Try a different search term or adjust your filters.`
                      : 'No articles match your current filters. Try adjusting your selection.'}
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
