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

  // Non-authenticated view - WYSIWYG Frozen Hero Page (shows exactly what users see, just non-interactive)
  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        {/* Frozen Hero Header - Same as authenticated but with overlay */}
        <div className="relative bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden min-h-[70vh] sm:min-h-[75vh]">
          {/* Ancient Chamber Background - Same as authenticated */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Stone texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Torch glow effects */}
            <div className="absolute top-[15%] left-[8%] w-24 h-32 bg-gradient-to-b from-amber-500/30 via-orange-500/20 to-transparent rounded-full blur-2xl animate-pulse" />
            <div className="absolute top-[15%] right-[8%] w-24 h-32 bg-gradient-to-b from-amber-500/30 via-orange-500/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-amber-400/20 to-transparent rounded-full blur-3xl" />

            {/* Stone pillars */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-[10%] w-[3px] h-full bg-gradient-to-b from-amber-200/80 via-amber-100/60 to-amber-200/80" />
              <div className="absolute top-0 left-[20%] w-[2px] h-full bg-gradient-to-b from-amber-200/60 via-amber-100/40 to-amber-200/60" />
              <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-amber-200/40 via-amber-100/20 to-amber-200/40" />
              <div className="absolute top-0 right-[10%] w-[3px] h-full bg-gradient-to-b from-amber-200/80 via-amber-100/60 to-amber-200/80" />
              <div className="absolute top-0 right-[20%] w-[2px] h-full bg-gradient-to-b from-amber-200/60 via-amber-100/40 to-amber-200/60" />
              <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-amber-200/40 via-amber-100/20 to-amber-200/40" />
            </div>

            {/* Ornate top border */}
            <svg className="absolute top-0 left-0 right-0 h-8 opacity-30" preserveAspectRatio="none">
              <defs>
                <pattern id="greekKey" x="0" y="0" width="32" height="16" patternUnits="userSpaceOnUse">
                  <path d="M0 8 L8 8 L8 0 L16 0 L16 8 L24 8 L24 16 L32 16 L32 8" fill="none" stroke="url(#goldGradient)" strokeWidth="2"/>
                </pattern>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24"/>
                  <stop offset="50%" stopColor="#f59e0b"/>
                  <stop offset="100%" stopColor="#fbbf24"/>
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100%" height="16" fill="url(#greekKey)"/>
            </svg>

            {/* Decorative vines */}
            <div className="absolute top-20 left-4 bottom-20 w-6 opacity-15">
              <svg viewBox="0 0 24 200" className="h-full w-full" preserveAspectRatio="none">
                <path d="M12 0 Q18 25 12 50 Q6 75 12 100 Q18 125 12 150 Q6 175 12 200" fill="none" stroke="#10b981" strokeWidth="2"/>
                <circle cx="12" cy="50" r="4" fill="#10b981"/>
                <circle cx="12" cy="100" r="4" fill="#10b981"/>
                <circle cx="12" cy="150" r="4" fill="#10b981"/>
              </svg>
            </div>
            <div className="absolute top-20 right-4 bottom-20 w-6 opacity-15" style={{ transform: 'scaleX(-1)' }}>
              <svg viewBox="0 0 24 200" className="h-full w-full" preserveAspectRatio="none">
                <path d="M12 0 Q18 25 12 50 Q6 75 12 100 Q18 125 12 150 Q6 175 12 200" fill="none" stroke="#10b981" strokeWidth="2"/>
                <circle cx="12" cy="50" r="4" fill="#10b981"/>
                <circle cx="12" cy="100" r="4" fill="#10b981"/>
                <circle cx="12" cy="150" r="4" fill="#10b981"/>
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Title Section - Same as authenticated */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-gradient-to-r from-amber-900/60 via-amber-800/80 to-amber-900/60 border-y-2 border-amber-500/50 mb-4 relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500/30 rotate-45 border border-amber-400/50" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500/30 rotate-45 border border-amber-400/50" />
                  <ScrollText className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">The Ancient Library</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
                  Knowledge Shared
                </h1>

                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
                  <div className="w-2 h-2 bg-amber-500 rotate-45" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
                </div>

                <p className="text-sm sm:text-base font-medium opacity-90 px-4 max-w-lg mx-auto" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#fde68a' }}>
                  "Wisdom is not consumed — it is received."
                </p>

                {/* Stats preview - same as authenticated */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-amber-600/40 rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
                    <span className="text-xs font-bold text-amber-200 relative">??? Scrolls</span>
                  </div>
                  <div className="relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-amber-600/40 rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
                    <span className="text-xs font-bold text-amber-200 relative">??? Readers</span>
                  </div>
                </div>

                {/* Author Button Preview - disabled state */}
                <div className="mt-6">
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-slate-400 font-bold text-base rounded-lg shadow-lg border-2 border-slate-500/40 cursor-not-allowed opacity-60">
                    <PenSquare className="w-5 h-5" />
                    <span className="tracking-wide">Inscribe Your Wisdom</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400/60 font-medium">
                    Sign in to share your case study or sustainability journey
                  </p>
                </div>
              </div>

              {/* Scroll Library Preview - Same layout but static */}
              <div className="relative mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
                    <div className="w-1.5 h-1.5 bg-amber-500 rotate-45" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-900/60 via-amber-800/80 to-amber-900/60 border-y border-amber-500/40">
                    <Flame className="w-3 h-3 text-amber-300" />
                    <span className="text-[10px] font-bold text-amber-200 uppercase tracking-[0.15em]">Most Sought Scrolls</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rotate-45" />
                    <div className="w-10 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
                  </div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 bg-gradient-to-b from-slate-700/40 via-slate-800/60 to-slate-900/40 rounded-lg" />

                  {/* Static scrolls - same visual as authenticated */}
                  <div className="relative flex items-center justify-center gap-3 sm:gap-4 py-4 px-4">
                    {[0, 1, 2, 3, 4].map((i) => {
                      const scrollThemes = [
                        { end: 'from-amber-600 via-amber-500 to-amber-700', parchment: 'bg-amber-100' },
                        { end: 'from-emerald-700 via-emerald-600 to-emerald-800', parchment: 'bg-emerald-50' },
                        { end: 'from-rose-700 via-rose-600 to-rose-800', parchment: 'bg-rose-50' },
                        { end: 'from-slate-600 via-slate-500 to-slate-700', parchment: 'bg-slate-200' },
                        { end: 'from-slate-600 via-slate-500 to-slate-700', parchment: 'bg-slate-200' },
                      ]
                      const theme = scrollThemes[i]
                      const isEmptySlot = i >= 3

                      return (
                        <div key={i} className={`relative w-12 h-20 ${isEmptySlot ? 'opacity-40' : 'opacity-70'}`}>
                          <div className={`absolute inset-x-1 top-3 bottom-3 ${theme.parchment} rounded-sm shadow-inner`} />
                          <div className={`absolute top-0 left-0 right-0 h-4 bg-gradient-to-b ${theme.end} rounded-t-sm shadow-md`}>
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-300/60 rounded-full" />
                          </div>
                          <div className={`absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t ${theme.end} rounded-b-sm shadow-md`}>
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-300/60 rounded-full" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Search Preview - disabled state */}
              <div className="relative max-w-3xl mx-auto px-4 sm:px-0 mb-8">
                <div className="relative bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-lg p-1 shadow-2xl border border-amber-600/30 opacity-60">
                  <div className="absolute -top-1 left-4 right-4 h-2 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-b from-slate-600 to-slate-800 rounded border border-amber-500/40 shadow-lg">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-[0.15em]">Search the Archives</span>
                  </div>
                  <div className="bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 rounded-md p-4 border border-slate-600/50">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          disabled
                          placeholder="Sign in to search ancient texts..."
                          className="w-full px-5 py-3 rounded-md bg-slate-900/80 text-slate-500 placeholder-slate-600 font-medium text-sm border border-slate-600/50 cursor-not-allowed"
                          style={{ fontFamily: 'Georgia, serif' }}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-md">
                          <Search className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </div>

        {/* CTA Section - Below the fold */}
        <div className="bg-[var(--background)] py-16">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] mb-4">
              Ready to Enter the Library?
            </h2>
            <p className="text-base text-theme-muted font-medium mb-8">
              Join a community of seekers. Access case studies, sustainability journeys, and wisdom from practitioners around the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-xl border border-amber-400/30">
                  <Star className="w-5 h-5 mr-2" />
                  Join Free & Start Reading
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" className="border-2 border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] font-bold px-8 py-6 text-lg rounded-lg">
                  Already a Member? Sign In
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-theme-muted">
              Free to join • Contribute your own wisdom • Learn from fellow practitioners
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated view - Full interactive page
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Header - Ancient Library Chamber */}
      <div className="relative bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden min-h-[70vh] sm:min-h-[75vh]">
        {/* Ancient Chamber Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stone texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Torch glow effects - warm ambient lighting */}
          <div className="absolute top-[15%] left-[8%] w-24 h-32 bg-gradient-to-b from-amber-500/30 via-orange-500/20 to-transparent rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-[15%] right-[8%] w-24 h-32 bg-gradient-to-b from-amber-500/30 via-orange-500/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-amber-400/20 to-transparent rounded-full blur-3xl" />

          {/* Original parallel vertical lines as stone pillars/columns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Left side pillars */}
            <div className="absolute top-0 left-[10%] w-[3px] h-full bg-gradient-to-b from-amber-200/80 via-amber-100/60 to-amber-200/80" />
            <div className="absolute top-0 left-[20%] w-[2px] h-full bg-gradient-to-b from-amber-200/60 via-amber-100/40 to-amber-200/60" />
            <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-amber-200/40 via-amber-100/20 to-amber-200/40" />
            {/* Right side pillars */}
            <div className="absolute top-0 right-[10%] w-[3px] h-full bg-gradient-to-b from-amber-200/80 via-amber-100/60 to-amber-200/80" />
            <div className="absolute top-0 right-[20%] w-[2px] h-full bg-gradient-to-b from-amber-200/60 via-amber-100/40 to-amber-200/60" />
            <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-amber-200/40 via-amber-100/20 to-amber-200/40" />
          </div>

          {/* Ornate top border - Greek key pattern */}
          <svg className="absolute top-0 left-0 right-0 h-8 opacity-30" preserveAspectRatio="none">
            <defs>
              <pattern id="greekKey" x="0" y="0" width="32" height="16" patternUnits="userSpaceOnUse">
                <path d="M0 8 L8 8 L8 0 L16 0 L16 8 L24 8 L24 16 L32 16 L32 8" fill="none" stroke="url(#goldGradient)" strokeWidth="2"/>
              </pattern>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24"/>
                <stop offset="50%" stopColor="#f59e0b"/>
                <stop offset="100%" stopColor="#fbbf24"/>
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="16" fill="url(#greekKey)"/>
          </svg>

          {/* Ornate corner flourishes */}
          <svg className="absolute top-2 left-2 w-16 h-16 opacity-20" viewBox="0 0 64 64">
            <path d="M8 8 Q32 8 32 32 Q8 32 8 8" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="3" fill="#fbbf24"/>
            <path d="M4 16 Q16 16 16 4" fill="none" stroke="#f59e0b" strokeWidth="1"/>
          </svg>
          <svg className="absolute top-2 right-2 w-16 h-16 opacity-20" viewBox="0 0 64 64" style={{ transform: 'scaleX(-1)' }}>
            <path d="M8 8 Q32 8 32 32 Q8 32 8 8" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="3" fill="#fbbf24"/>
            <path d="M4 16 Q16 16 16 4" fill="none" stroke="#f59e0b" strokeWidth="1"/>
          </svg>

          {/* Decorative vine motif along sides */}
          <div className="absolute top-20 left-4 bottom-20 w-6 opacity-15">
            <svg viewBox="0 0 24 200" className="h-full w-full" preserveAspectRatio="none">
              <path d="M12 0 Q18 25 12 50 Q6 75 12 100 Q18 125 12 150 Q6 175 12 200" fill="none" stroke="#10b981" strokeWidth="2"/>
              <circle cx="12" cy="50" r="4" fill="#10b981"/>
              <circle cx="12" cy="100" r="4" fill="#10b981"/>
              <circle cx="12" cy="150" r="4" fill="#10b981"/>
            </svg>
          </div>
          <div className="absolute top-20 right-4 bottom-20 w-6 opacity-15" style={{ transform: 'scaleX(-1)' }}>
            <svg viewBox="0 0 24 200" className="h-full w-full" preserveAspectRatio="none">
              <path d="M12 0 Q18 25 12 50 Q6 75 12 100 Q18 125 12 150 Q6 175 12 200" fill="none" stroke="#10b981" strokeWidth="2"/>
              <circle cx="12" cy="50" r="4" fill="#10b981"/>
              <circle cx="12" cy="100" r="4" fill="#10b981"/>
              <circle cx="12" cy="150" r="4" fill="#10b981"/>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Title Section - Chamber entrance */}
            <div className="text-center mb-6 sm:mb-8">
              {/* Ornate header badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-gradient-to-r from-amber-900/60 via-amber-800/80 to-amber-900/60 border-y-2 border-amber-500/50 mb-4 relative">
                {/* Decorative end caps */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500/30 rotate-45 border border-amber-400/50" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500/30 rotate-45 border border-amber-400/50" />
                <ScrollText className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">The Ancient Library</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
                Knowledge Shared
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
                <div className="w-2 h-2 bg-amber-500 rotate-45" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>

              <p className="text-sm sm:text-base font-medium opacity-90 px-4 max-w-lg mx-auto" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#fde68a' }}>
                "Wisdom is not consumed — it is received."
              </p>

              {/* Stats in ornate frames */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-amber-600/40 rounded-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
                  <span className="text-xs font-bold text-amber-200 relative">
                    {totalArticles > 0 ? totalArticles : articles.length + (featuredArticle ? 1 : 0)} Scrolls
                  </span>
                </div>
                <div className="relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-amber-600/40 rounded-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
                  <span className="text-xs font-bold text-amber-200 relative">
                    {totalViews.toLocaleString()} Readers
                  </span>
                </div>
              </div>

              {/* Prominent Author Button */}
              <div className="mt-6">
                <Link href="/articles/write">
                  <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-600 text-white font-bold text-base rounded-lg shadow-2xl border-2 border-emerald-400/40 hover:border-emerald-300/60 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/30">
                    {/* Decorative quill icon */}
                    <div className="relative">
                      <PenSquare className="w-5 h-5" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    </div>
                    <span className="tracking-wide">Inscribe Your Wisdom</span>
                    {/* Decorative corner accents */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-emerald-300/50" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-emerald-300/50" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-emerald-300/50" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-emerald-300/50" />
                  </button>
                </Link>
                <p className="mt-2 text-xs text-amber-300/60 font-medium">
                  Share a case study, lesson, or sustainability journey
                </p>
              </div>
            </div>

            {/* Ancient Scroll Library - Featured Articles */}
            {!searchQuery && activeSort === 'all' && (
              <div className="relative mb-8">
                {/* Section header - Ancient Tomb Library style */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
                    <div className="w-1.5 h-1.5 bg-amber-500 rotate-45" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-900/60 via-amber-800/80 to-amber-900/60 border-y border-amber-500/40">
                    <Flame className="w-3 h-3 text-amber-300" />
                    <span className="text-[10px] font-bold text-amber-200 uppercase tracking-[0.15em]">Most Sought Scrolls</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rotate-45" />
                    <div className="w-10 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
                  </div>
                </div>

                {/* Ancient Library Shelf - Horizontal scrolls in alcoves */}
                <div className="relative max-w-4xl mx-auto">
                  {/* Stone shelf background */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 bg-gradient-to-b from-slate-700/40 via-slate-800/60 to-slate-900/40 rounded-lg" />

                  {/* Scrolls container */}
                  <div className="relative flex items-center justify-center gap-3 sm:gap-4 py-4 px-4">
                    {/* Create array with 5 slots - 3 for articles, 2 for empty */}
                    {[0, 1, 2, 3, 4].map((slotIndex) => {
                      const article = trendingArticles[slotIndex]
                      const isEmptySlot = !article

                      // Scroll colors with better legibility
                      const scrollThemes = [
                        { end: 'from-amber-600 via-amber-500 to-amber-700', parchment: 'bg-amber-100', text: 'text-amber-950', seal: 'bg-gradient-to-br from-red-600 to-red-800' },
                        { end: 'from-emerald-700 via-emerald-600 to-emerald-800', parchment: 'bg-emerald-50', text: 'text-emerald-950', seal: 'bg-gradient-to-br from-silver-400 to-gray-500' },
                        { end: 'from-rose-700 via-rose-600 to-rose-800', parchment: 'bg-rose-50', text: 'text-rose-950', seal: 'bg-gradient-to-br from-amber-500 to-amber-700' },
                        { end: 'from-slate-600 via-slate-500 to-slate-700', parchment: 'bg-slate-200', text: 'text-slate-700', seal: 'bg-gradient-to-br from-slate-400 to-slate-600' },
                        { end: 'from-slate-600 via-slate-500 to-slate-700', parchment: 'bg-slate-200', text: 'text-slate-700', seal: 'bg-gradient-to-br from-slate-400 to-slate-600' },
                      ]
                      const theme = scrollThemes[slotIndex]

                      if (isEmptySlot) {
                        // Empty scroll slot - ghost placeholder
                        return (
                          <div key={`empty-${slotIndex}`} className="group relative">
                            {/* Compact rolled scroll - empty slot */}
                            <div className="relative w-12 h-20 opacity-40">
                              {/* Rolled parchment cylinder */}
                              <div className={`absolute inset-x-1 top-3 bottom-3 ${theme.parchment} rounded-sm opacity-50`} />
                              {/* Top end cap */}
                              <div className={`absolute top-0 left-0 right-0 h-4 bg-gradient-to-b ${theme.end} rounded-t-sm shadow-md`}>
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-300/40 rounded-full" />
                              </div>
                              {/* Bottom end cap */}
                              <div className={`absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t ${theme.end} rounded-b-sm shadow-md`}>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-300/40 rounded-full" />
                              </div>
                            </div>
                            {/* Empty slot label */}
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              <span className="text-[8px] text-amber-400/50 font-medium">Empty</span>
                            </div>
                          </div>
                        )
                      }

                      // Filled scroll with article
                      return (
                        <div key={article.id} className="group relative">
                          {/* Compact rolled scroll */}
                          <div className="relative w-12 h-20 cursor-pointer transition-all duration-300 group-hover:scale-110">
                            {/* Rolled parchment cylinder */}
                            <div className={`absolute inset-x-1 top-3 bottom-3 ${theme.parchment} rounded-sm shadow-inner`}>
                              {/* Parchment texture */}
                              <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
                              }} />
                            </div>
                            {/* Top end cap with decorative knob */}
                            <div className={`absolute top-0 left-0 right-0 h-4 bg-gradient-to-b ${theme.end} rounded-t-sm shadow-md`}>
                              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-300/60 rounded-full" />
                            </div>
                            {/* Bottom end cap with decorative knob */}
                            <div className={`absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t ${theme.end} rounded-b-sm shadow-md`}>
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-300/60 rounded-full" />
                            </div>
                            {/* Wax seal with rank */}
                            <div className={`absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.seal} rounded-full shadow-lg flex items-center justify-center border border-white/20 z-10`}>
                              <span className="text-[8px] font-black text-white">#{slotIndex + 1}</span>
                            </div>
                          </div>

                          {/* Hover overlay - Expanded scroll widget */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                            <Link href={`/articles/${article.slug}`}>
                              <div className="relative bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-lg shadow-2xl border border-amber-500/30 overflow-hidden">
                                {/* Ornate top border */}
                                <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

                                <div className="p-4">
                                  {/* Category */}
                                  <span className="inline-block px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-bold rounded mb-2 border border-amber-500/30">
                                    {article.category.name}
                                  </span>

                                  {/* Title */}
                                  <h3 className="text-sm font-bold text-amber-100 leading-snug mb-2 line-clamp-2 hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                                    {article.title}
                                  </h3>

                                  {/* Author & stats */}
                                  <div className="flex items-center justify-between text-[10px] text-amber-200/70">
                                    <span className="font-medium truncate max-w-[100px]">{article.author.name}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="flex items-center gap-0.5">
                                        <Eye className="w-2.5 h-2.5" />{article.views}
                                      </span>
                                      <span className="flex items-center gap-0.5">
                                        <Clock className="w-2.5 h-2.5" />{article.readTime}m
                                      </span>
                                    </div>
                                  </div>

                                  {/* Read prompt */}
                                  <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-center gap-1 text-amber-400 text-[10px] font-bold">
                                    <BookOpen className="w-3 h-3" />
                                    <span>Unroll & Read</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </div>
                                </div>

                                {/* Decorative corners */}
                                <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-amber-500/30" />
                                <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-amber-500/30" />
                                <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-amber-500/30" />
                                <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-amber-500/30" />
                              </div>
                            </Link>
                          </div>

                          {/* Scroll label underneath */}
                          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap max-w-[60px]">
                            <span className="text-[8px] text-amber-300/80 font-medium truncate block text-center">{article.category.name}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Dust particles effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-amber-300 rounded-full animate-pulse"
                        style={{
                          left: `${15 + i * 14}%`,
                          top: `${30 + (i % 3) * 20}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: '3s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Catalog - Ancient stone tablet style */}
            <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
              {/* Stone tablet frame */}
              <div className="relative bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-lg p-1 shadow-2xl border border-amber-600/30">
                {/* Ornate top edge */}
                <div className="absolute -top-1 left-4 right-4 h-2 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                {/* Carved label */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-b from-slate-600 to-slate-800 rounded border border-amber-500/40 shadow-lg">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-[0.15em]">Search the Archives</span>
                </div>

                {/* Inner carved area */}
                <div className="bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 rounded-md p-4 border border-slate-600/50">
                  {/* Decorative corner gems */}
                  <div className="absolute top-3 left-3 w-2 h-2 bg-emerald-500/60 rounded-full shadow-lg shadow-emerald-500/30" />
                  <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500/60 rounded-full shadow-lg shadow-rose-500/30" />
                  <div className="absolute bottom-3 left-3 w-2 h-2 bg-amber-500/60 rounded-full shadow-lg shadow-amber-500/30" />
                  <div className="absolute bottom-3 right-3 w-2 h-2 bg-violet-500/60 rounded-full shadow-lg shadow-violet-500/30" />

                  <form onSubmit={handleSearch} className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ancient texts..."
                        className="w-full px-5 py-3 rounded-md bg-slate-900/80 text-amber-100 placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm border border-slate-600/50"
                        style={{ fontFamily: 'Georgia, serif' }}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 rounded-md transition-all shadow-lg"
                      >
                        <Search className="w-4 h-4 text-amber-100" />
                      </button>
                    </div>
                    {session && (
                      <Link href="/articles/write" className="hidden sm:block">
                        <Button className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white hover:from-emerald-600 hover:to-emerald-800 font-bold px-5 py-3 rounded-md shadow-lg whitespace-nowrap border border-emerald-500/30">
                          <PenSquare className="w-4 h-4 mr-2" />
                          Inscribe
                        </Button>
                      </Link>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to content area */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
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
