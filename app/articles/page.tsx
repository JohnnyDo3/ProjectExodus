'use client'

// ============================================
// THE LIBRARY
// "Wisdom is not consumed - it is received.
//  A text offers its truth; a reader brings their readiness to understand."
//
// Articles are case studies and sustainability journeys -
// accessible to anyone regardless of age, knowledge, or experience.
// Every reader brings their own readiness. Every writer shares their truth.
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
  Leaf,
  Heart,
  GraduationCap,
  Lightbulb,
  Compass,
  X,
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

// Reading depth indicators - experiential rather than explicit difficulty levels
// Helps readers find content that matches their available time and focus
const getReadingDepth = (readTime: number): { label: string; icon: any; color: string; bgColor: string } => {
  if (readTime <= 3) {
    return {
      label: 'Quick Insight',
      icon: Lightbulb,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  } else if (readTime <= 8) {
    return {
      label: 'Guided Path',
      icon: Compass,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    }
  } else {
    return {
      label: 'Deep Study',
      icon: GraduationCap,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10'
    }
  }
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
  const [showContributorInvite, setShowContributorInvite] = useState(false)
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Check if first-time visitor (no articles read yet, no localStorage flag)
  useEffect(() => {
    const hasVisited = localStorage.getItem('library-visited')
    const hasDismissedInvite = localStorage.getItem('library-invite-dismissed')

    if (!hasVisited) {
      setShowWelcomeGuide(true)
      localStorage.setItem('library-visited', 'true')
    }

    if (!hasDismissedInvite && session) {
      setShowContributorInvite(true)
    }
  }, [session])

  const dismissContributorInvite = () => {
    setShowContributorInvite(false)
    localStorage.setItem('library-invite-dismissed', 'true')
  }

  const dismissWelcomeGuide = () => {
    setShowWelcomeGuide(false)
  }

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
      {/* Hero Header - The Library with One-Point Perspective */}
      <div className="relative bg-gradient-to-b from-[var(--primary)] via-[var(--primary)] to-amber-900/80 text-white overflow-hidden min-h-[70vh] sm:min-h-[75vh]">
        {/* One-Point Perspective Library Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Vanishing point at center-top, converging lines create library hallway effect */}
          <div className="absolute inset-0" style={{ perspective: '1000px', perspectiveOrigin: '50% 20%' }}>
            {/* Floor - warm wood tone */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-amber-900/60 via-amber-800/40 to-transparent"
              style={{
                transform: 'rotateX(60deg)',
                transformOrigin: 'center bottom',
              }}
            />

            {/* Ceiling beams effect */}
            <div
              className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-amber-950/40 to-transparent"
              style={{
                transform: 'rotateX(-45deg)',
                transformOrigin: 'center top',
              }}
            />
          </div>

          {/* Converging vertical bookshelf lines - Left side */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none">
            {/* Left converging lines - bookshelves receding into distance */}
            <line x1="0%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="2" className="text-amber-200"/>
            <line x1="5%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1.5" className="text-amber-200"/>
            <line x1="12%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1.5" className="text-amber-300"/>
            <line x1="20%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1" className="text-amber-200"/>
            <line x1="30%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1" className="text-amber-300"/>
            <line x1="40%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="0.5" className="text-amber-200"/>

            {/* Right converging lines - mirror */}
            <line x1="100%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="2" className="text-amber-200"/>
            <line x1="95%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1.5" className="text-amber-200"/>
            <line x1="88%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1.5" className="text-amber-300"/>
            <line x1="80%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1" className="text-amber-200"/>
            <line x1="70%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1" className="text-amber-300"/>
            <line x1="60%" y1="100%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="0.5" className="text-amber-200"/>

            {/* Horizontal shelf lines at different depths */}
            <line x1="5%" y1="85%" x2="95%" y2="85%" stroke="currentColor" strokeWidth="2" className="text-amber-400/50"/>
            <line x1="15%" y1="70%" x2="85%" y2="70%" stroke="currentColor" strokeWidth="1.5" className="text-amber-400/40"/>
            <line x1="25%" y1="55%" x2="75%" y2="55%" stroke="currentColor" strokeWidth="1" className="text-amber-400/30"/>
            <line x1="35%" y1="40%" x2="65%" y2="40%" stroke="currentColor" strokeWidth="0.5" className="text-amber-400/20"/>
          </svg>

          {/* Ambient library glow - warm light from vanishing point */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-48 h-16 bg-amber-100/10 rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Title Section - Positioned at the "entrance" */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/40 backdrop-blur-sm border border-amber-400/30 mb-3">
                <ScrollText className="w-4 h-4 text-amber-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-100">The Library</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tight drop-shadow-lg">
                Knowledge Shared
              </h1>
              <p className="text-sm sm:text-base font-medium opacity-90 px-4 max-w-lg mx-auto italic text-amber-100">
                "Wisdom is not consumed - it is received."
              </p>

              {/* Stats Pills */}
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="px-3 py-1.5 bg-amber-900/50 backdrop-blur-sm rounded-full border border-amber-400/30">
                  <span className="text-xs font-bold text-amber-100">
                    {totalArticles > 0 ? totalArticles : articles.length + (featuredArticle ? 1 : 0)} texts
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-amber-900/50 backdrop-blur-sm rounded-full border border-amber-400/30">
                  <span className="text-xs font-bold text-amber-100">
                    {totalViews.toLocaleString()} readers
                  </span>
                </div>
              </div>
            </div>

            {/* Bookshelf Display - Featured "Books" on perspective shelves */}
            {trendingArticles.length > 0 && !searchQuery && activeSort === 'all' && (
              <div className="relative mb-6">
                {/* Shelf Label */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-900/60 rounded-full border border-amber-500/40">
                    <Flame className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-xs font-bold text-amber-100 uppercase tracking-wide">Most Sought Volumes</span>
                  </div>
                  <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
                </div>

                {/* Books on Shelf - styled as book spines */}
                <div className="flex justify-center items-end gap-1 sm:gap-2 px-4" style={{ perspective: '800px' }}>
                  {trendingArticles.slice(0, 3).map((article, index) => {
                    const authorTheme = getAuthorTheme(article.author.guardianArchetype)
                    const bookColors = [
                      'from-amber-700 via-amber-600 to-amber-700',
                      'from-emerald-800 via-emerald-700 to-emerald-800',
                      'from-rose-800 via-rose-700 to-rose-800'
                    ]
                    const spineHeights = ['h-36 sm:h-44', 'h-32 sm:h-40', 'h-34 sm:h-42']

                    return (
                      <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                        <div
                          className={`relative ${spineHeights[index]} w-20 sm:w-28 bg-gradient-to-b ${bookColors[index]} rounded-sm shadow-xl cursor-pointer transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl`}
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: `rotateY(${index === 0 ? -5 : index === 2 ? 5 : 0}deg)`,
                          }}
                        >
                          {/* Book spine edge highlight */}
                          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-white/30 via-white/10 to-white/30 rounded-l-sm" />

                          {/* Rank badge on spine */}
                          <div className="absolute top-2 left-1/2 -translate-x-1/2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${index === 0 ? 'from-yellow-400 to-amber-500' : index === 1 ? 'from-gray-300 to-gray-400' : 'from-orange-400 to-amber-600'} flex items-center justify-center shadow-lg border border-white/30`}>
                              <span className="text-[10px] font-black text-white">#{index + 1}</span>
                            </div>
                          </div>

                          {/* Book title on spine - rotated */}
                          <div className="absolute inset-x-2 top-10 bottom-8 flex items-center justify-center overflow-hidden">
                            <span
                              className="text-[10px] sm:text-xs font-bold text-white/90 text-center leading-tight line-clamp-4 px-1"
                              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                            >
                              {article.title}
                            </span>
                          </div>

                          {/* Author at bottom */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                            <span className="text-[8px] text-white/70 font-medium truncate block max-w-16 sm:max-w-20">
                              {article.author.name.split(' ')[0]}
                            </span>
                          </div>

                          {/* Book page edges (right side) */}
                          <div className="absolute inset-y-1 -right-0.5 w-1 bg-gradient-to-r from-amber-100/50 to-amber-50/30 rounded-r-sm"
                               style={{ transform: 'translateZ(-2px)' }} />

                          {/* Hover tooltip */}
                          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-40 sm:w-48 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                            <div className="bg-black/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-xl">
                              <p className="text-[10px] text-white font-bold line-clamp-2">{article.title}</p>
                              <div className="flex items-center justify-center gap-2 mt-1 text-[9px] text-white/70">
                                <span className="flex items-center gap-0.5">
                                  <Eye className="w-2.5 h-2.5" />{article.views}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />{article.readTime}m
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Shelf surface */}
                <div className="relative h-3 mx-auto max-w-md mt-1">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-800 via-amber-700 to-amber-900 rounded-sm shadow-lg" />
                  <div className="absolute inset-x-0 top-0 h-px bg-amber-500/50" />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-950/50 rounded-b-sm" />
                </div>
              </div>
            )}

            {/* Card Catalog Search - The Baseboard */}
            <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
              {/* Catalog Cabinet Frame */}
              <div className="relative bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-lg p-1 shadow-2xl border-t-2 border-amber-600/50">
                {/* Catalog Label */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-700 rounded-full border border-amber-500/50 shadow-lg">
                  <span className="text-[10px] font-bold text-amber-100 uppercase tracking-widest">Card Catalog</span>
                </div>

                {/* Drawer front */}
                <div className="bg-gradient-to-b from-amber-700 via-amber-600 to-amber-700 rounded-lg p-3 sm:p-4 border border-amber-500/30">
                  {/* Drawer handle */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-3 w-2 h-8 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-inner border border-amber-300/50" />
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 w-2 h-8 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-inner border border-amber-300/50" />

                  {/* Search input styled as index card */}
                  <form onSubmit={handleSearch} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 bg-amber-50 rounded-lg shadow-inner" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search the catalog..."
                        className="relative w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-transparent text-amber-900 placeholder-amber-600/60 font-medium focus:outline-none text-sm sm:text-base border-2 border-amber-300/50 focus:border-amber-400"
                        style={{ fontFamily: 'Georgia, serif' }}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors shadow-md"
                      >
                        <Search className="w-4 h-4 text-amber-100" />
                      </button>
                    </div>
                    {session && (
                      <Link href="/articles/write" className="hidden sm:block">
                        <Button className="bg-emerald-700 text-white hover:bg-emerald-600 font-bold px-4 py-2.5 rounded-lg shadow-lg whitespace-nowrap border border-emerald-500/50">
                          <PenSquare className="w-4 h-4 mr-2" />
                          Contribute
                        </Button>
                      </Link>
                    )}
                  </form>
                </div>
              </div>

              {/* Catalog base/feet */}
              <div className="flex justify-between px-8">
                <div className="w-8 h-2 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-md" />
                <div className="w-8 h-2 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to content area */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      {/* Welcome Guide for First-Time Visitors */}
      {showWelcomeGuide && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-[var(--primary)]/10 to-violet-500/10 border-b border-[var(--border)]">
          <div className="container mx-auto px-4 py-4 sm:py-5">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--foreground)] mb-1">
                    Welcome to the Library
                  </h3>
                  <p className="text-xs sm:text-sm text-theme-muted font-medium mb-3">
                    These texts are sustainability case studies and personal journeys - written to be accessible regardless of your background.
                    Start anywhere. Every path leads somewhere meaningful.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                      <Lightbulb className="w-3 h-3" />
                      Quick Insight — 3 min or less
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 font-medium">
                      <Compass className="w-3 h-3" />
                      Guided Path — 4-8 min
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-500/10 text-violet-600 font-medium">
                      <GraduationCap className="w-3 h-3" />
                      Deep Study — 9+ min
                    </span>
                  </div>
                </div>
                <button
                  onClick={dismissWelcomeGuide}
                  className="shrink-0 p-1.5 rounded-full hover:bg-[var(--muted)] transition-colors"
                >
                  <X className="w-4 h-4 text-theme-muted" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contributor Invite Banner */}
      {showContributorInvite && session && !showWelcomeGuide && (
        <div className="bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 border-b border-[var(--border)]">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                    Your journey matters
                  </p>
                  <p className="text-[10px] sm:text-xs text-theme-muted font-medium">
                    Share a case study or lesson from your sustainability experience
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/articles/write">
                  <Button size="sm" className="bg-[var(--primary)] text-white hover:bg-[var(--accent)] font-bold text-xs px-3 py-1.5 rounded-lg">
                    Share Your Story
                  </Button>
                </Link>
                <button
                  onClick={dismissContributorInvite}
                  className="p-1.5 rounded-full hover:bg-[var(--muted)] transition-colors"
                >
                  <X className="w-4 h-4 text-theme-muted" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30 flex items-center justify-center">
              <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] mb-2">
              {searchQuery
                ? 'No Matching Texts'
                : activeSort === 'read'
                ? 'Your Journey Awaits'
                : 'The First Page'}
            </h2>
            <p className="text-sm sm:text-base text-theme-muted font-medium mb-2 max-w-md mx-auto">
              {searchQuery
                ? `No texts match "${searchQuery}" — try broader terms`
                : activeSort === 'read'
                ? "You haven't studied any texts yet. Every journey begins with curiosity."
                : 'This library grows through shared experience.'}
            </p>
            {!searchQuery && activeSort !== 'read' && (
              <p className="text-xs text-theme-muted font-medium mb-6 max-w-sm mx-auto opacity-70">
                Case studies, lessons learned, and sustainability journeys —
                your experience could help someone just starting out.
              </p>
            )}
            {activeSort === 'read' && (
              <p className="text-xs text-theme-muted font-medium mb-6 max-w-sm mx-auto opacity-70">
                Browse the library and find something that speaks to where you are right now.
              </p>
            )}
            {session ? (
              <Link href="/articles/write">
                <Button className="font-bold text-sm sm:text-base">
                  <PenSquare className="w-4 h-4 mr-2" />
                  Share Your Journey
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" className="font-bold text-sm sm:text-base">
                  Sign in to contribute
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Featured Article Hero */}
            {featuredArticle && (() => {
              const featuredDepth = getReadingDepth(featuredArticle.readTime)
              const FeaturedDepthIcon = featuredDepth.icon
              return (
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
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[var(--secondary)] text-white font-black text-xs sm:text-sm rounded-full shadow-lg">
                          FEATURED
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-1 ${featuredDepth.bgColor} backdrop-blur-sm ${featuredDepth.color} text-xs font-bold rounded-full border border-white/20`}>
                          <FeaturedDepthIcon className="w-3 h-3" />
                          <span className="hidden sm:inline">{featuredDepth.label}</span>
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
              )
            })()}

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {articles.map((article) => {
                const authorTheme = getAuthorTheme(article.author.guardianArchetype)
                const readingDepth = getReadingDepth(article.readTime)
                const DepthIcon = readingDepth.icon

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
                          {/* Reading Depth Badge */}
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                            <span className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 ${readingDepth.bgColor} backdrop-blur-sm ${readingDepth.color} text-[10px] sm:text-xs font-bold rounded-full border border-white/20`}>
                              <DepthIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span className="hidden sm:inline">{readingDepth.label}</span>
                            </span>
                          </div>
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
                        {/* Category + Reading Depth (when no cover image) */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 sm:py-1 bg-[var(--muted)] text-theme-muted font-bold text-[10px] sm:text-xs rounded-md sm:rounded-lg">
                              {article.category.name}
                            </span>
                            {!article.coverImage && (
                              <span className={`flex items-center gap-1 px-1.5 py-0.5 ${readingDepth.bgColor} ${readingDepth.color} text-[10px] font-medium rounded-full`}>
                                <DepthIcon className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
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
