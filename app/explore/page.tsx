'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  Search,
  FileText,
  ShoppingBag,
  Briefcase,
  Users,
  MessageCircle,
  BookOpen,
  X,
  Loader2,
  Compass,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CategoryKey = 'all' | 'articles' | 'products' | 'projects' | 'people' | 'discussions' | 'learning'

interface SearchResult {
  id: string
  type: CategoryKey
  title?: string
  name?: string
  content?: string
  excerpt?: string
  description?: string
  headline?: string
  image?: string
  price?: number | null
  memberCount?: number
  author?: { name: string; image?: string }
  date?: string
  slug?: string
  url?: string
}

interface SearchResponse {
  results: SearchResult[]
  total: number
  page: number
  pageSize: number
}

const CATEGORIES: { key: CategoryKey; label: string; icon: React.ElementType; apiType: string }[] = [
  { key: 'all', label: 'All', icon: Compass, apiType: '' },
  { key: 'articles', label: 'Articles', icon: FileText, apiType: 'articles' },
  { key: 'products', label: 'Products', icon: ShoppingBag, apiType: 'products' },
  { key: 'projects', label: 'Projects', icon: Briefcase, apiType: 'projects' },
  { key: 'people', label: 'People', icon: Users, apiType: 'people' },
  { key: 'discussions', label: 'Discussions', icon: MessageCircle, apiType: 'discussions' },
  { key: 'learning', label: 'Learning', icon: BookOpen, apiType: 'learning' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resultLink(result: SearchResult): string {
  if (result.url) return result.url
  switch (result.type) {
    case 'articles':
      return `/articles/${result.slug || result.id}`
    case 'products':
      return `/products/${result.slug || result.id}`
    case 'projects':
      return `/projects/${result.slug || result.id}`
    case 'people':
      return `/profile/${result.id}`
    case 'discussions':
      return `/community?post=${result.id}`
    case 'learning':
      return `/learn/${result.slug || result.id}`
    default:
      return '#'
  }
}

function categoryIcon(type: CategoryKey) {
  const match = CATEGORIES.find((c) => c.key === type)
  return match ? match.icon : Compass
}

function categoryLabel(type: CategoryKey) {
  const match = CATEGORIES.find((c) => c.key === type)
  return match ? match.label : type
}

// ---------------------------------------------------------------------------
// Result Cards
// ---------------------------------------------------------------------------

function ResultCard({ result }: { result: SearchResult }) {
  const Icon = categoryIcon(result.type)

  return (
    <Link href={resultLink(result)} className="block group">
      <div
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all duration-200 hover:shadow-lg hover:border-[var(--primary)] hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-4">
          {/* Icon / avatar area */}
          {result.type === 'people' ? (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {result.image ? (
                <img src={result.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <Users className="w-5 h-5 text-[var(--primary-foreground)]" />
              )}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-[var(--primary)]" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                {categoryLabel(result.type)}
              </span>
            </div>

            <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
              {result.title || result.name || 'Untitled'}
            </h3>

            {/* Type-specific details */}
            {result.type === 'articles' && (
              <>
                {result.excerpt && (
                  <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">{result.excerpt}</p>
                )}
                <div className="mt-2 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                  {result.author?.name && <span className="font-medium">{result.author.name}</span>}
                  {result.date && (
                    <span>{new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  )}
                </div>
              </>
            )}

            {result.type === 'products' && (
              <>
                {result.description && (
                  <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">{result.description}</p>
                )}
                {result.price != null && (
                  <p className="mt-2 text-sm font-bold text-[var(--primary)]">${Number(result.price).toFixed(2)}</p>
                )}
              </>
            )}

            {result.type === 'projects' && (
              <>
                {result.description && (
                  <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">{result.description}</p>
                )}
                {result.memberCount != null && (
                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                    <Users className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
                    {result.memberCount} member{result.memberCount !== 1 ? 's' : ''}
                  </p>
                )}
              </>
            )}

            {result.type === 'people' && (
              <>
                {result.headline && (
                  <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-1">{result.headline}</p>
                )}
              </>
            )}

            {result.type === 'discussions' && (
              <>
                {result.content && (
                  <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">{result.content}</p>
                )}
                {result.author?.name && (
                  <p className="mt-2 text-xs text-[var(--muted-foreground)] font-medium">{result.author.name}</p>
                )}
              </>
            )}

            {result.type === 'learning' && (
              <>
                {result.description && (
                  <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">{result.description}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Grouped Results (All tab)
// ---------------------------------------------------------------------------

function GroupedResults({ results }: { results: SearchResult[] }) {
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const key = r.type || 'all'
    if (!acc[key]) acc[key] = []
    acc[key].push(r)
    return acc
  }, {})

  const typeOrder: CategoryKey[] = ['articles', 'products', 'projects', 'people', 'discussions', 'learning']

  return (
    <div className="space-y-10">
      {typeOrder.map((type) => {
        const items = grouped[type]
        if (!items || items.length === 0) return null
        const Icon = categoryIcon(type)
        return (
          <section key={type}>
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-lg font-bold text-[var(--foreground)]">{categoryLabel(type)}</h2>
              <span className="text-xs font-semibold text-[var(--muted-foreground)] bg-[var(--muted)] px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((r) => (
                <ResultCard key={`${r.type}-${r.id}`} result={r} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ExplorePage() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<CategoryKey>('all')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced search
  const performSearch = useCallback(
    async (q: string, type: CategoryKey, p: number) => {
      if (!q.trim()) {
        setResults([])
        setHasSearched(false)
        setTotal(0)
        return
      }

      setLoading(true)
      setHasSearched(true)

      try {
        const params = new URLSearchParams({ q: q.trim(), page: String(p) })
        if (type !== 'all') {
          const cat = CATEGORIES.find((c) => c.key === type)
          if (cat) params.set('type', cat.apiType)
        }

        const res = await fetch(`/api/search?${params.toString()}`)
        if (res.ok) {
          const data: SearchResponse = await res.json()
          setResults(data.results ?? [])
          setTotal(data.total ?? 0)
        } else {
          setResults([])
          setTotal(0)
        }
      } catch {
        setResults([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  // Trigger search on query / tab change with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setPage(1)
      performSearch(query, activeTab, 1)
    }, 350)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, activeTab, performSearch])

  // Page change (no debounce)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    performSearch(query, activeTab, newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setHasSearched(false)
    setTotal(0)
    inputRef.current?.focus()
  }

  const totalPages = Math.ceil(total / 20)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero / Search Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--accent)_10%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1
              className="text-[var(--foreground)]"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1.15 }}
            >
              Explore Project Exodus
            </h1>
            <p className="text-lg font-semibold text-[var(--muted-foreground)]">
              Search across articles, products, projects, people, and more
            </p>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto mt-8">
              <div className="flex items-center rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] shadow-lg focus-within:border-[var(--primary)] transition-colors">
                <Search className="ml-5 w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search across all of Project Exodus..."
                  className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-base font-medium text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="mr-4 p-1 rounded-full hover:bg-[var(--muted)] transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-[var(--muted-foreground)]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + Results */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = activeTab === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200
                    ${
                      isActive
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                        : 'bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--foreground)]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin mb-4" />
              <p className="text-sm font-semibold text-[var(--muted-foreground)]">Searching...</p>
            </div>
          )}

          {/* Initial / empty state */}
          {!loading && !hasSearched && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,var(--background))] flex items-center justify-center mb-6">
                <Compass className="w-10 h-10 text-[var(--primary)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Search across all of Project Exodus</h2>
              <p className="text-[var(--muted-foreground)] font-medium max-w-md">
                Find articles, sustainable products, community projects, people, discussions, and learning modules.
              </p>
            </div>
          )}

          {/* No results */}
          {!loading && hasSearched && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[var(--muted)] flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-[var(--muted-foreground)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No results found</h2>
              <p className="text-[var(--muted-foreground)] font-medium max-w-md">
                Try different keywords or browse a different category.
              </p>
            </div>
          )}

          {/* Results */}
          {!loading && hasSearched && results.length > 0 && (
            <>
              <p className="text-sm font-semibold text-[var(--muted-foreground)] mb-6">
                {total} result{total !== 1 ? 's' : ''} found
              </p>

              {activeTab === 'all' ? (
                <GroupedResults results={results} />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((r) => (
                    <ResultCard key={`${r.type}-${r.id}`} result={r} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 rounded-lg text-sm font-bold border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] disabled:opacity-40 hover:border-[var(--primary)] transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-semibold text-[var(--muted-foreground)] px-3">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 rounded-lg text-sm font-bold border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] disabled:opacity-40 hover:border-[var(--primary)] transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
