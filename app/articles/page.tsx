'use client'

// ============================================
// THE LIBRARY
// "Wisdom is not consumed - it is received.
//  A text offers its truth; a reader brings their readiness to understand."
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Search,
  Filter,
  Clock,
  Eye,
  MessageCircle,
  User,
  Bookmark,
  PenSquare,
  ChevronDown,
  Sparkles,
  TrendingUp,
  History,
  BookOpen,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Loader2,
  ScrollText,
  Flame,
  Star,
} from 'lucide-react'

// Archetype traits for author theming (traits only, no names)
const ARCHETYPE_TRAITS: Record<string, { gradient: string; trait: string; accentColor: string }> = {
  michael: { gradient: 'from-red-600 to-orange-500', trait: 'Strength', accentColor: 'text-red-500' },
  gabriel: { gradient: 'from-sky-500 to-blue-600', trait: 'Truth', accentColor: 'text-sky-500' },
  raphael: { gradient: 'from-emerald-500 to-green-600', trait: 'Healing', accentColor: 'text-emerald-500' },
  uriel: { gradient: 'from-amber-500 to-yellow-500', trait: 'Wisdom', accentColor: 'text-amber-500' },
  camael: { gradient: 'from-pink-500 to-rose-600', trait: 'Love', accentColor: 'text-pink-500' },
  jophiel: { gradient: 'from-violet-500 to-purple-600', trait: 'Creativity', accentColor: 'text-violet-500' },
  zadkiel: { gradient: 'from-indigo-500 to-blue-700', trait: 'Grace', accentColor: 'text-indigo-500' },
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  readTime: number
  views: number
  featured: boolean
  publishedAt: string
  hasRead: boolean
  author: {
    id: string
    name: string
    image: string | null
    guardianArchetype: string | null
  }
  category: {
    id: string
    name: string
    slug: string
  }
  _count: {
    comments: number
    readBy: number
  }
}

type SortOption = 'all' | 'newest' | 'oldest' | 'most_read' | 'read'

interface TrendingArticle extends Article {
  trendingScore?: number
}

export default function ArticlesPage() {
  const { data: session } = useSession()
  const [articles, setArticles] = useState<Article[]>([])
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [trendingArticles, setTrendingArticles] = useState<TrendingArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSort, setActiveSort] = useState<SortOption>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [totalArticles, setTotalArticles] = useState(0)
  const [totalViews, setTotalViews] = useState(0)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const sortOptions: { value: SortOption; label: string; icon: any }[] = [
    { value: 'all', label: 'All Texts', icon: BookOpen },
    { value: 'newest', label: 'Recent', icon: Sparkles },
    { value: 'oldest', label: 'Classic', icon: History },
    { value: 'most_read', label: 'Popular', icon: TrendingUp },
    { value: 'read', label: 'Studied', icon: CheckCircle2 },
  ]

  // Use ref for offset to avoid stale closure issues
  const offsetRef = useRef(0)

  // Fetch trending articles (most views in recent timeframe)
  const fetchTrendingArticles = useCallback(async () => {
    try {
      const res = await fetch('/api/articles?limit=3&sort=most_read')
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.data) {
          // Calculate trending score based on views and recency
          const trending = data.data.map((article: Article) => {
            const daysSincePublished = Math.max(1, Math.floor((Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60 * 24)))
            const trendingScore = article.views / daysSincePublished
            return { ...article, trendingScore }
          }).sort((a: TrendingArticle, b: TrendingArticle) => (b.trendingScore || 0) - (a.trendingScore || 0))
          setTrendingArticles(trending)

          // Calculate totals
          const totalViewsCount = data.data.reduce((sum: number, a: Article) => sum + a.views, 0)
          setTotalViews(totalViewsCount)
          if (data.pagination?.total) {
            setTotalArticles(data.pagination.total)
          }
        }
      }
    } catch (err) {
      console.error('[Articles] Error fetching trending:', err)
    }
  }, [])

  const fetchArticles = useCallback(async (reset = false) => {
    console.log('[Articles] fetchArticles called, reset:', reset)
    try {
      setError(null)
      const currentOffset = reset ? 0 : offsetRef.current
      // Map 'all' to 'newest' for the API, since 'all' just means show everything sorted by newest
      const apiSort = activeSort === 'all' ? 'newest' : activeSort
      const params = new URLSearchParams({
        limit: '12',
        offset: currentOffset.toString(),
        sort: apiSort,
      })
      if (searchQuery) {
        params.set('search', searchQuery)
      }

      console.log('[Articles] Fetching:', `/api/articles?${params}`)
      const res = await fetch(`/api/articles?${params}`)
      console.log('[Articles] Response status:', res.status)

      // Check response status
      if (!res.ok) {
        const errorText = await res.text()
        console.error('[Articles] Error response:', errorText)
        throw new Error(`Server error: ${res.status}`)
      }

      const data = await res.json()
      console.log('[Articles] Data received, success:', data.success, 'count:', data.data?.length)

      if (data.success) {
        if (reset) {
          // Set featured article from the first article if it exists and is actually featured
          // Show featured article for 'all' and 'newest' filters when not searching
          const featured = data.data?.find((a: Article) => a.featured)
          if (featured && (activeSort === 'all' || activeSort === 'newest') && !searchQuery) {
            setFeaturedArticle(featured)
            setArticles(data.data?.filter((a: Article) => a.id !== featured.id) || [])
          } else {
            setFeaturedArticle(null)
            setArticles(data.data || [])
          }
          offsetRef.current = 12
          setOffset(12)
        } else {
          setArticles(prev => [...prev, ...(data.data || [])])
          offsetRef.current += 12
          setOffset(offsetRef.current)
        }
        setHasMore(data.pagination?.hasMore ?? false)
      } else {
        throw new Error(data.error || 'Failed to fetch articles')
      }
    } catch (err) {
      console.error('[Articles] Catch block error:', err)
      const message = err instanceof Error ? err.message : 'Failed to load articles'
      setError(message)
    } finally {
      console.log('[Articles] Finally block, setting isLoading to false')
      setIsLoading(false)
    }
  }, [activeSort, searchQuery])

  // Fetch trending on mount
  useEffect(() => {
    fetchTrendingArticles()
  }, [fetchTrendingArticles])

  useEffect(() => {
    setIsLoading(true)
    offsetRef.current = 0
    fetchArticles(true)
  }, [activeSort, searchQuery, fetchArticles])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchArticles(false)
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, fetchArticles])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setOffset(0)
    fetchArticles(true)
  }

  const getAuthorTheme = (archetype: string | null) => {
    return ARCHETYPE_TRAITS[archetype || 'uriel'] || ARCHETYPE_TRAITS.uriel
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Header - The Library */}
      <div className="relative bg-[var(--primary)] text-white overflow-hidden">
        {/* Decorative book spines pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-[10%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[20%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[30%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[70%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[80%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[90%] w-px h-full bg-white" />
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-12 relative">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <ScrollText className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">The Library</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 tracking-tight">
                Knowledge Shared
              </h1>
              <p className="text-sm sm:text-base font-medium opacity-80 px-4 max-w-lg mx-auto italic">
                "Wisdom is not consumed - it is received."
              </p>

              {/* Stats Pills in Hero */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-xs font-bold opacity-90">
                    {totalArticles > 0 ? totalArticles : articles.length + (featuredArticle ? 1 : 0)} texts
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-xs font-bold opacity-90">
                    {totalViews.toLocaleString()} readers
                  </span>
                </div>
              </div>
            </div>

            {/* Search Bar + Write Button Row */}
            <div className="flex items-center gap-3 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search the library..."
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 font-medium focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
              {session && (
                <Link href="/articles/write" className="hidden sm:block">
                  <Button className="bg-white text-[var(--primary)] hover:bg-white/90 font-bold px-5 py-2.5 rounded-xl shadow-lg whitespace-nowrap">
                    <PenSquare className="w-4 h-4 mr-2" />
                    Write
                  </Button>
                </Link>
              )}
            </div>

            {/* Most Sought Texts - Integrated in Hero */}
            {trendingArticles.length > 0 && !searchQuery && activeSort === 'all' && (
              <div className="px-4 sm:px-0">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
                  <span className="text-sm sm:text-base font-bold opacity-80">Most Sought</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  {trendingArticles.slice(0, 3).map((article, index) => {
                    const authorTheme = getAuthorTheme(article.author.guardianArchetype)
                    const rankColors = ['from-yellow-500 to-amber-600', 'from-gray-400 to-gray-500', 'from-orange-600 to-amber-700']
                    const rankLabels = ['#1', '#2', '#3']

                    return (
                      <Link key={article.id} href={`/articles/${article.slug}`}>
                        <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-3 hover:bg-black/30 transition-all group cursor-pointer">
                          <div className="flex items-start gap-3">
                            {/* Rank Badge */}
                            <div className={`shrink-0 w-8 h-8 bg-gradient-to-br ${rankColors[index]} rounded-lg flex items-center justify-center shadow-lg`}>
                              <span className="text-white font-black text-sm">{rankLabels[index]}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Category */}
                              <span className="px-1.5 py-0.5 bg-white/20 font-bold text-[10px] rounded">
                                {article.category.name}
                              </span>

                              {/* Title */}
                              <h3 className="text-sm font-bold mt-1 line-clamp-2 group-hover:underline">
                                {article.title}
                              </h3>

                              {/* Stats */}
                              <div className="flex items-center gap-3 mt-1.5 text-[10px] opacity-70">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {article.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {article.readTime}m
                                </span>
                                <span className="font-medium truncate">{article.author.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-3 sm:py-4 gap-2">
            {/* Sort Options - Horizontal scroll on mobile */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 flex-1 scrollbar-hide -mx-1 px-1">
              {sortOptions.map((option) => {
                const Icon = option.icon
                const isActive = activeSort === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() => setActiveSort(option.value)}
                    disabled={option.value === 'read' && !session}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                      isActive
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/10'
                    } ${option.value === 'read' && !session ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={option.value === 'read' && !session ? 'Sign in to see studied texts' : ''}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{option.label}</span>
                    <span className="xs:hidden">{option.label.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {error ? (
          <div className="flex items-center justify-center py-16 sm:py-20">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] mb-2">Error Loading Articles</h2>
              <p className="text-sm sm:text-base text-theme-muted font-medium mb-6">{error}</p>
              <Button onClick={() => { setError(null); setIsLoading(true); fetchArticles(true); }} className="font-black">
                Try Again
              </Button>
            </div>
          </div>
        ) : isLoading && articles.length === 0 ? (
          <div className="flex items-center justify-center py-16 sm:py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-theme-primary animate-spin mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg font-bold text-theme-muted">Loading articles...</p>
            </div>
          </div>
        ) : articles.length === 0 && !featuredArticle ? (
          <div className="text-center py-16 sm:py-20 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full border-4 border-[var(--muted)] flex items-center justify-center">
              <ScrollText className="w-8 h-8 sm:w-10 sm:h-10 text-theme-muted opacity-50" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] mb-2">No Texts Found</h2>
            <p className="text-sm sm:text-base text-theme-muted font-medium mb-6">
              {searchQuery
                ? `No texts match "${searchQuery}"`
                : activeSort === 'read'
                ? "You haven't studied any texts yet"
                : 'Be the first to share your wisdom'}
            </p>
            {session && (
              <Link href="/articles/write">
                <Button className="font-bold text-sm sm:text-base">
                  <PenSquare className="w-4 h-4 mr-2" />
                  Write the First Text
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Featured Article Hero */}
            {featuredArticle && (
              <Link href={`/articles/${featuredArticle.slug}`}>
                <Card className="mb-6 sm:mb-8 border-2 sm:border-4 border-theme-primary overflow-hidden hover:shadow-theme-2xl transition-all group cursor-pointer">
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative h-48 sm:h-64 md:h-auto md:min-h-[300px] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
                      {featuredArticle.coverImage ? (
                        <img
                          src={featuredArticle.coverImage}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-16 h-16 sm:w-24 sm:h-24 text-white/50" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[var(--secondary)] text-white font-black text-xs sm:text-sm rounded-full shadow-lg">
                          FEATURED
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <span className="px-2 sm:px-3 py-1 bg-[var(--primary)]/10 text-theme-primary font-bold text-[10px] sm:text-xs rounded-full">
                          {featuredArticle.category.name}
                        </span>
                        {featuredArticle.hasRead && (
                          <span className="flex items-center gap-1 text-emerald-500 text-[10px] sm:text-xs font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            Studied
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2 sm:mb-3 group-hover:text-theme-primary transition-colors line-clamp-2">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-sm sm:text-base text-theme-muted font-medium mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getAuthorTheme(featuredArticle.author.guardianArchetype).gradient} flex items-center justify-center flex-shrink-0`}>
                          {featuredArticle.author.image ? (
                            <img src={featuredArticle.author.image} alt={featuredArticle.author.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm sm:text-base text-[var(--foreground)] truncate">{featuredArticle.author.name}</p>
                          <p className="text-[10px] sm:text-xs text-theme-muted">
                            {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-theme-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {featuredArticle.readTime}m
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {featuredArticle.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {featuredArticle._count.comments}
                        </span>
                      </div>

                      <div className="mt-4 sm:mt-6 flex items-center text-theme-primary font-bold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base">
                        Begin Reading
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {articles.map((article) => {
                const authorTheme = getAuthorTheme(article.author.guardianArchetype)

                return (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <Card className={`h-full border-2 border-[var(--border)] hover:border-theme-primary hover:shadow-theme-xl transition-all group cursor-pointer overflow-hidden ${article.hasRead ? 'opacity-75' : ''}`}>
                      {/* Cover Image */}
                      {article.coverImage && (
                        <div className="relative h-36 sm:h-48 overflow-hidden">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {article.hasRead && (
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                              <span className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
                                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                Studied
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <CardContent className="p-3 sm:p-5">
                        {/* Category */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="px-2 py-0.5 sm:py-1 bg-[var(--muted)] text-theme-muted font-bold text-[10px] sm:text-xs rounded-md sm:rounded-lg">
                            {article.category.name}
                          </span>
                          {!article.coverImage && article.hasRead && (
                            <span className="flex items-center gap-1 text-emerald-500 text-[10px] sm:text-xs font-bold">
                              <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              Studied
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-black text-[var(--foreground)] mb-1.5 sm:mb-2 group-hover:text-theme-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-theme-muted font-medium mb-3 sm:mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* Author Row */}
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${authorTheme.gradient} flex items-center justify-center flex-shrink-0`}>
                            {article.author.image ? (
                              <img src={article.author.image} alt={article.author.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-[var(--foreground)] truncate">{article.author.name}</p>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-theme-muted pt-2 sm:pt-3 border-t border-[var(--border)]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {article.readTime}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {article._count.comments}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {/* Load More Trigger */}
            <div ref={loadMoreRef} className="py-6 sm:py-8 flex justify-center">
              {isLoading && articles.length > 0 && (
                <div className="flex items-center gap-2 text-theme-muted">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="text-sm sm:text-base font-medium">Loading more...</span>
                </div>
              )}
              {!hasMore && articles.length > 0 && (
                <p className="text-xs sm:text-sm text-theme-muted font-medium text-center px-4">
                  You've reached the end! {articles.length + (featuredArticle ? 1 : 0)} articles total.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Floating Write Button (Mobile) */}
      {session && (
        <Link
          href="/articles/write"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 sm:hidden w-12 h-12 sm:w-14 sm:h-14 bg-[var(--primary)] text-white rounded-full shadow-theme-xl flex items-center justify-center hover:bg-[var(--accent)] transition-colors safe-area-inset"
        >
          <PenSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
      )}
    </div>
  )
}
