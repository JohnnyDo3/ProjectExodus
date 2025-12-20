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
import { motion, AnimatePresence } from 'framer-motion'
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
  Droplets,
  Zap,
  Recycle,
  TreePine,
  Home,
  Lock,
  Feather,
} from 'lucide-react'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'

// Category data for interactive bookshelves
const BOOK_CATEGORIES = [
  { id: 'sustainability', name: 'Sustainability', color: 'from-emerald-700 to-emerald-900', icon: Leaf, slug: 'sustainability' },
  { id: 'water', name: 'Water', color: 'from-blue-700 to-blue-900', icon: Droplets, slug: 'water' },
  { id: 'energy', name: 'Energy', color: 'from-amber-600 to-amber-800', icon: Zap, slug: 'energy' },
  { id: 'waste', name: 'Waste', color: 'from-stone-600 to-stone-800', icon: Recycle, slug: 'waste' },
  { id: 'nature', name: 'Nature', color: 'from-green-700 to-green-900', icon: TreePine, slug: 'nature' },
  { id: 'building', name: 'Building', color: 'from-orange-700 to-orange-900', icon: Home, slug: 'building' },
  { id: 'food', name: 'Food', color: 'from-red-700 to-red-900', icon: Heart, slug: 'food' },
  { id: 'community', name: 'Community', color: 'from-purple-700 to-purple-900', icon: User, slug: 'community' },
]

// Category color mapping for scrolls
const CATEGORY_SCROLL_THEMES: Record<string, { seal: string; ribbon: string; parchment: string }> = {
  sustainability: { seal: 'from-emerald-600 to-emerald-800', ribbon: 'bg-emerald-700', parchment: 'from-emerald-50 via-stone-50 to-emerald-50' },
  water: { seal: 'from-blue-600 to-blue-800', ribbon: 'bg-blue-700', parchment: 'from-blue-50 via-stone-50 to-blue-50' },
  energy: { seal: 'from-amber-500 to-amber-700', ribbon: 'bg-amber-600', parchment: 'from-amber-50 via-stone-50 to-amber-50' },
  waste: { seal: 'from-stone-500 to-stone-700', ribbon: 'bg-stone-600', parchment: 'from-stone-100 via-stone-50 to-stone-100' },
  nature: { seal: 'from-green-600 to-green-800', ribbon: 'bg-green-700', parchment: 'from-green-50 via-stone-50 to-green-50' },
  building: { seal: 'from-orange-600 to-orange-800', ribbon: 'bg-orange-700', parchment: 'from-orange-50 via-stone-50 to-orange-50' },
  food: { seal: 'from-red-600 to-red-800', ribbon: 'bg-red-700', parchment: 'from-red-50 via-stone-50 to-red-50' },
  community: { seal: 'from-purple-600 to-purple-800', ribbon: 'bg-purple-700', parchment: 'from-purple-50 via-stone-50 to-purple-50' },
}

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

  // New state for enhanced library features
  const [mobileDoorsOpen, setMobileDoorsOpen] = useState(false)
  const [libraryEntered, setLibraryEntered] = useState(false)
  const [savedArticles, setSavedArticles] = useState<string[]>([])
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)
  const [readingProgress, setReadingProgress] = useState<Record<string, { scrollProgress: number; completed: boolean }>>({})

  // Time-based theme for dynamic lighting
  const { phase: timePhase } = useTimeTheme()
  const isNightTime = ['night', 'midnight', 'evening', 'dusk'].includes(timePhase)

  // Trigger entrance animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setLibraryEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Load saved articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('saved-articles')
    if (saved) {
      try {
        setSavedArticles(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading saved articles:', e)
      }
    }
  }, [])

  // Save article to personal collection
  const toggleSaveArticle = (articleId: string) => {
    setSavedArticles(prev => {
      const newSaved = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
      localStorage.setItem('saved-articles', JSON.stringify(newSaved))
      return newSaved
    })
  }

  // Fetch reading progress for displayed articles
  useEffect(() => {
    if (!session) return

    const fetchReadingProgress = async () => {
      try {
        const response = await fetch('/api/articles/progress')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setReadingProgress(data.data)
          }
        }
      } catch (error) {
        console.error('Error fetching reading progress:', error)
      }
    }

    fetchReadingProgress()
  }, [session, articles])

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
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">Articles</span>
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
                    <span className="text-xs font-bold text-amber-200 relative">{totalArticles || '???'} Articles</span>
                  </div>
                  <div className="relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-amber-600/40 rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
                    <span className="text-xs font-bold text-amber-200 relative">{totalViews?.toLocaleString() || '???'} Readers</span>
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

              {/* Scroll Library Preview - Multi-shelf static preview */}
              <div className="relative mb-8">
                {/* Section header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/60" />
                    <div className="w-2 h-2 bg-amber-500 rotate-45 shadow-lg shadow-amber-500/50" />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-900/70 via-amber-800/90 to-amber-900/70 border-y-2 border-amber-500/50 shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[11px] font-bold text-amber-200 uppercase tracking-[0.2em]">Recent Articles</span>
                    <Flame className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-amber-500 rotate-45 shadow-lg shadow-amber-500/50" />
                    <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/60" />
                  </div>
                </div>

                {/* Simplified library cabinet preview */}
                <div className="relative max-w-4xl mx-auto">
                  <div className="relative bg-gradient-to-b from-amber-950/80 via-stone-900/90 to-stone-950/95 rounded-t-xl border-2 border-amber-700/40 shadow-2xl overflow-hidden opacity-70">
                    {/* Ornate top trim */}
                    <div className="h-5 bg-gradient-to-b from-amber-800/80 to-amber-900/60 border-b-2 border-amber-600/40 relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg" />
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-lg" />
                    </div>

                    {/* Top shelf with static scrolls */}
                    <div className="relative py-5 px-6">
                      <div className="flex items-end justify-center gap-5 sm:gap-8">
                        {[0, 1, 2].map((i) => {
                          const scrollThemes = [
                            { wood: 'from-amber-700 via-amber-600 to-amber-800', parchment: 'from-amber-100 via-amber-50 to-amber-100', seal: 'from-red-700 to-red-800' },
                            { wood: 'from-emerald-800 via-emerald-700 to-emerald-900', parchment: 'from-emerald-50 via-stone-50 to-emerald-50', seal: 'from-emerald-600 to-emerald-700' },
                            { wood: 'from-violet-800 via-violet-700 to-violet-900', parchment: 'from-violet-50 via-rose-50 to-violet-50', seal: 'from-violet-600 to-violet-700' },
                          ]
                          const theme = scrollThemes[i]
                          const tilt = i === 1 ? 0 : i === 0 ? -3 : 3

                          return (
                            <div key={i} className="relative w-12 sm:w-14 h-24 sm:h-28" style={{ transform: `rotate(${tilt}deg)` }}>
                              {/* Drop shadow */}
                              <div className="absolute -bottom-2 left-1 right-1 h-3 bg-black/30 blur-md rounded-full" />
                              {/* Parchment body */}
                              <div className={`absolute inset-x-1.5 top-4 bottom-4 bg-gradient-to-r ${theme.parchment} rounded-sm shadow-inner`} />
                              {/* Top rod */}
                              <div className={`absolute top-0 left-0 right-0 h-5 bg-gradient-to-b ${theme.wood} rounded-t-sm shadow-md`}>
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow border border-white/30" />
                              </div>
                              {/* Bottom rod */}
                              <div className={`absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t ${theme.wood} rounded-b-sm shadow-md`}>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow border border-white/30" />
                              </div>
                              {/* Wax seal */}
                              <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br ${theme.seal} rounded-full shadow-lg z-10 flex items-center justify-center border border-white/10`}>
                                <span className="text-[8px] font-black text-white">#{i + 1}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {/* Wooden shelf */}
                      <div className="mt-4 h-3 bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 border-t-2 border-amber-600/50 shadow-lg" />
                    </div>

                    {/* Middle shelf with ghost slots */}
                    <div className="relative py-4 px-6 bg-gradient-to-b from-stone-800/40 to-stone-900/60">
                      <div className="flex items-end justify-center gap-4 sm:gap-6">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="relative w-10 sm:w-12 h-20 sm:h-24 opacity-25">
                            <div className="absolute inset-x-1 top-3 bottom-3 border-2 border-dashed border-amber-400/40 rounded-sm bg-amber-900/10" />
                            <div className="absolute top-0 left-0 right-0 h-4 border-2 border-dashed border-amber-400/40 rounded-t-sm" />
                            <div className="absolute bottom-0 left-0 right-0 h-4 border-2 border-dashed border-amber-400/40 rounded-b-sm" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 h-2.5 bg-gradient-to-b from-amber-800/90 via-amber-900 to-amber-950 border-t border-amber-600/40" />
                    </div>

                    {/* Cabinet base */}
                    <div className="h-6 bg-gradient-to-b from-amber-950 to-stone-950">
                      <div className="absolute bottom-0 left-6 w-6 h-1.5 bg-amber-900 rounded-t-sm" />
                      <div className="absolute bottom-0 right-6 w-6 h-1.5 bg-amber-900 rounded-t-sm" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-amber-900 rounded-t-sm" />
                    </div>
                  </div>

                  {/* Overlay lock effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-2 bg-slate-900/80 rounded-lg border border-amber-500/30 backdrop-blur-sm">
                      <span className="text-xs font-bold text-amber-200/80">Sign in to explore the archives</span>
                    </div>
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
                          placeholder="Sign in to search articles..."
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
      {/* ========================================== */}
      {/* MOBILE LIBRARY DOORS - Entrance Experience */}
      {/* ========================================== */}
      <AnimatePresence>
        {!mobileDoorsOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950"
            onClick={() => setMobileDoorsOpen(true)}
          >
            {/* Library doors background texture */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood)'/%3E%3C/svg%3E")`,
            }} />

            {/* Left door */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-amber-900 to-amber-800 border-r-4 border-amber-600/50"
            >
              {/* Door panel details */}
              <div className="absolute inset-4 border-2 border-amber-600/30 rounded-sm">
                <div className="absolute inset-4 border border-amber-500/20 rounded-sm" />
              </div>
              {/* Door handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-lg border-2 border-amber-300/50" />
              {/* Decorative carvings */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-amber-500/30 rotate-45" />
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-amber-500/30 rotate-45" />
            </motion.div>

            {/* Right door */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-900 to-amber-800 border-l-4 border-amber-600/50"
            >
              {/* Door panel details */}
              <div className="absolute inset-4 border-2 border-amber-600/30 rounded-sm">
                <div className="absolute inset-4 border border-amber-500/20 rounded-sm" />
              </div>
              {/* Door handle */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-lg border-2 border-amber-300/50" />
              {/* Decorative carvings */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-amber-500/30 rotate-45" />
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-amber-500/30 rotate-45" />
            </motion.div>

            {/* Center content - above doors */}
            <div className="relative z-10 text-center px-6">
              {/* Library crest */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-2xl border-4 border-amber-400/50">
                <ScrollText className="w-10 h-10 text-amber-100" />
              </div>
              <h2 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                The Ancient Library
              </h2>
              <p className="text-amber-300/70 text-sm mb-6">
                Wisdom awaits within
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-amber-400/80"
              >
                <p className="text-xs uppercase tracking-widest mb-2">Tap to Enter</p>
                <ChevronDown className="w-6 h-6 mx-auto" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

          {/* ========================================== */}
          {/* GRAND LIBRARY ENTRANCE - Side Bookshelves */}
          {/* ========================================== */}

          {/* Left Vertical Bookshelf - Shows actual published articles as mini scrolls */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={libraryEntered ? { x: 0, opacity: 1 } : { x: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-[18%] z-20"
          >
            {/* Bookshelf frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-950/95 via-amber-900/90 to-amber-950/80 border-r-4 border-amber-700/60">
              {/* Wood grain texture */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 Q30 100 20 200 Q10 300 20 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M50 0 Q60 100 50 200 Q40 300 50 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M80 0 Q70 100 80 200 Q90 300 80 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
              }} />

              {/* Shelves with actual article scrolls */}
              {[15, 35, 55, 75].map((top, shelfIndex) => {
                // Get articles for this shelf (2 per shelf from left side)
                const shelfArticles = articles.slice(shelfIndex * 2, shelfIndex * 2 + 2)
                const scrollColors = [
                  { wood: 'from-amber-700 to-amber-900', parchment: 'from-amber-100 to-amber-50', seal: 'from-red-600 to-red-800' },
                  { wood: 'from-emerald-700 to-emerald-900', parchment: 'from-emerald-50 to-stone-50', seal: 'from-emerald-600 to-emerald-800' },
                ]

                return (
                  <div key={`left-shelf-${shelfIndex}`} className="absolute left-0 right-0" style={{ top: `${top}%` }}>
                    {/* Shelf surface */}
                    <div className="h-4 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/20 to-transparent" />
                    </div>

                    {/* Interactive article scrolls */}
                    <div className="absolute bottom-4 left-1 right-2 flex items-end justify-start gap-1 h-16">
                      {shelfArticles.map((article, i) => {
                        const colors = scrollColors[i % 2]
                        const isHovered = hoveredBook === `left-article-${article.id}`
                        const categorySlug = article.category?.slug || 'default'
                        const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability

                        const articleProgress = readingProgress[article.id]
                        const progressPercent = articleProgress?.scrollProgress || 0
                        const isCompleted = articleProgress?.completed || false

                        return (
                          <Link
                            key={article.id}
                            href={`/articles/${article.slug}`}
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''}`}
                            style={{ transform: `rotate(${(i % 2 - 0.5) * 3}deg)` }}
                            onMouseEnter={() => setHoveredBook(`left-article-${article.id}`)}
                            onMouseLeave={() => setHoveredBook(null)}
                          >
                            {/* Mini scroll */}
                            <div className="absolute inset-0">
                              {/* Parchment body with progress fill */}
                              <div className={`absolute inset-x-0.5 top-2 bottom-2 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-inner overflow-hidden`}>
                                {/* Progress fill from bottom */}
                                {progressPercent > 0 && (
                                  <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-300/40 to-emerald-200/20 transition-all duration-500"
                                    style={{ height: `${progressPercent}%` }}
                                  />
                                )}
                              </div>
                              {/* Top rod */}
                              <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b ${colors.wood} rounded-t-sm shadow`}>
                                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                              </div>
                              {/* Bottom rod */}
                              <div className={`absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t ${colors.wood} rounded-b-sm shadow`}>
                                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                              </div>
                              {/* Mini wax seal with progress ring */}
                              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4">
                                {/* Progress ring SVG */}
                                {progressPercent > 0 && !isCompleted && (
                                  <svg className="absolute inset-0 w-4 h-4 -rotate-90" viewBox="0 0 16 16">
                                    <circle
                                      cx="8"
                                      cy="8"
                                      r="6"
                                      fill="none"
                                      stroke="rgba(255,255,255,0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <circle
                                      cx="8"
                                      cy="8"
                                      r="6"
                                      fill="none"
                                      stroke="#10b981"
                                      strokeWidth="1.5"
                                      strokeDasharray={`${(progressPercent / 100) * 37.7} 37.7`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                )}
                                {/* Seal center */}
                                <div className={`absolute inset-0.5 bg-gradient-to-br ${isCompleted ? 'from-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-md border border-white/20 flex items-center justify-center`}>
                                  {isCompleted && (
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* Hover tooltip with progress */}
                            {isHovered && (
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-amber-900/95 text-amber-100 text-[8px] font-bold rounded whitespace-nowrap z-50 shadow-lg">
                                <div className="max-w-24 truncate">{article.title}</div>
                                {progressPercent > 0 && (
                                  <div className="text-[7px] text-emerald-300 mt-0.5">
                                    {isCompleted ? '✓ Complete' : `${Math.round(progressPercent)}% read`}
                                  </div>
                                )}
                              </div>
                            )}
                          </Link>
                        )
                      })}
                      {/* Ghost slots for empty positions */}
                      {Array.from({ length: Math.max(0, 2 - shelfArticles.length) }).map((_, i) => (
                        <div key={`ghost-left-${shelfIndex}-${i}`} className="w-5 h-12 relative opacity-30">
                          <div className="absolute inset-0 border border-dashed border-amber-400/40 rounded-sm bg-amber-900/10" />
                          <div className="absolute top-0 left-0 right-0 h-2 border border-dashed border-amber-500/30 rounded-t-sm" />
                          <div className="absolute bottom-0 left-0 right-0 h-2 border border-dashed border-amber-500/30 rounded-b-sm" />
                        </div>
                      ))}
                      {/* Decorative bookend */}
                      {shelfIndex === 0 && (
                        <div className="w-2 h-10 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-sm shadow-lg ml-1" />
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Decorative torch sconce with time-based lighting */}
              <div className="absolute top-[8%] right-2 w-6">
                <div className="w-3 h-10 bg-gradient-to-b from-amber-700 to-amber-900 mx-auto rounded-b-sm" />
                <div className={`w-6 h-8 bg-gradient-to-t ${isNightTime ? 'from-orange-400/80 via-amber-300/60' : 'from-orange-500/60 via-amber-400/40'} to-transparent rounded-full blur-sm animate-pulse absolute -top-4 left-0`} />
              </div>

              {/* Carved ornamental top */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-800 to-amber-900 border-b-2 border-amber-600/50">
                <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                  <pattern id="leftCarving" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
                    <path d="M0 8 Q6 4 12 8 Q18 12 24 8" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#leftCarving)"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Vertical Bookshelf - Shows actual published articles as mini scrolls */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={libraryEntered ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-[18%] z-20"
          >
            {/* Bookshelf frame */}
            <div className="absolute inset-0 bg-gradient-to-l from-amber-950/95 via-amber-900/90 to-amber-950/80 border-l-4 border-amber-700/60">
              {/* Wood grain texture */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 Q30 100 20 200 Q10 300 20 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M50 0 Q60 100 50 200 Q40 300 50 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M80 0 Q70 100 80 200 Q90 300 80 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
              }} />

              {/* Shelves with actual article scrolls */}
              {[15, 35, 55, 75].map((top, shelfIndex) => {
                // Get articles for this shelf (2 per shelf from right side, offset by 8)
                const shelfArticles = articles.slice(8 + shelfIndex * 2, 8 + shelfIndex * 2 + 2)
                const scrollColors = [
                  { wood: 'from-violet-700 to-violet-900', parchment: 'from-violet-50 to-rose-50', seal: 'from-violet-600 to-violet-800' },
                  { wood: 'from-teal-700 to-teal-900', parchment: 'from-teal-50 to-stone-50', seal: 'from-teal-600 to-teal-800' },
                ]

                return (
                  <div key={`right-shelf-${shelfIndex}`} className="absolute left-0 right-0" style={{ top: `${top}%` }}>
                    {/* Shelf surface */}
                    <div className="h-4 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/20 to-transparent" />
                    </div>

                    {/* Interactive article scrolls */}
                    <div className="absolute bottom-4 left-2 right-1 flex items-end justify-end gap-1 h-16">
                      {/* Decorative bookend on first shelf */}
                      {shelfIndex === 0 && (
                        <div className="w-2 h-10 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-sm shadow-lg mr-1" />
                      )}
                      {/* Ghost slots for empty positions */}
                      {Array.from({ length: Math.max(0, 2 - shelfArticles.length) }).map((_, i) => (
                        <div key={`ghost-right-${shelfIndex}-${i}`} className="w-5 h-12 relative opacity-30">
                          <div className="absolute inset-0 border border-dashed border-amber-400/40 rounded-sm bg-amber-900/10" />
                          <div className="absolute top-0 left-0 right-0 h-2 border border-dashed border-amber-500/30 rounded-t-sm" />
                          <div className="absolute bottom-0 left-0 right-0 h-2 border border-dashed border-amber-500/30 rounded-b-sm" />
                        </div>
                      ))}
                      {shelfArticles.map((article, i) => {
                        const colors = scrollColors[i % 2]
                        const isHovered = hoveredBook === `right-article-${article.id}`
                        const categorySlug = article.category?.slug || 'default'
                        const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability

                        const articleProgress = readingProgress[article.id]
                        const progressPercent = articleProgress?.scrollProgress || 0
                        const isCompleted = articleProgress?.completed || false

                        return (
                          <Link
                            key={article.id}
                            href={`/articles/${article.slug}`}
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''}`}
                            style={{ transform: `rotate(${(i % 2 - 0.5) * -3}deg)` }}
                            onMouseEnter={() => setHoveredBook(`right-article-${article.id}`)}
                            onMouseLeave={() => setHoveredBook(null)}
                          >
                            {/* Mini scroll */}
                            <div className="absolute inset-0">
                              {/* Parchment body with progress fill */}
                              <div className={`absolute inset-x-0.5 top-2 bottom-2 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-inner overflow-hidden`}>
                                {/* Progress fill from bottom */}
                                {progressPercent > 0 && (
                                  <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-300/40 to-emerald-200/20 transition-all duration-500"
                                    style={{ height: `${progressPercent}%` }}
                                  />
                                )}
                              </div>
                              {/* Top rod */}
                              <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b ${colors.wood} rounded-t-sm shadow`}>
                                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                              </div>
                              {/* Bottom rod */}
                              <div className={`absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t ${colors.wood} rounded-b-sm shadow`}>
                                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                              </div>
                              {/* Mini wax seal with progress ring */}
                              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4">
                                {/* Progress ring SVG */}
                                {progressPercent > 0 && !isCompleted && (
                                  <svg className="absolute inset-0 w-4 h-4 -rotate-90" viewBox="0 0 16 16">
                                    <circle
                                      cx="8"
                                      cy="8"
                                      r="6"
                                      fill="none"
                                      stroke="rgba(255,255,255,0.3)"
                                      strokeWidth="1.5"
                                    />
                                    <circle
                                      cx="8"
                                      cy="8"
                                      r="6"
                                      fill="none"
                                      stroke="#10b981"
                                      strokeWidth="1.5"
                                      strokeDasharray={`${(progressPercent / 100) * 37.7} 37.7`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                )}
                                {/* Seal center */}
                                <div className={`absolute inset-0.5 bg-gradient-to-br ${isCompleted ? 'from-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-md border border-white/20 flex items-center justify-center`}>
                                  {isCompleted && (
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* Hover tooltip with progress */}
                            {isHovered && (
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-amber-900/95 text-amber-100 text-[8px] font-bold rounded whitespace-nowrap z-50 shadow-lg">
                                <div className="max-w-24 truncate">{article.title}</div>
                                {progressPercent > 0 && (
                                  <div className="text-[7px] text-emerald-300 mt-0.5">
                                    {isCompleted ? '✓ Complete' : `${Math.round(progressPercent)}% read`}
                                  </div>
                                )}
                              </div>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {/* Decorative torch sconce with time-based lighting */}
              <div className="absolute top-[8%] left-2 w-6">
                <div className="w-3 h-10 bg-gradient-to-b from-amber-700 to-amber-900 mx-auto rounded-b-sm" />
                <div className={`w-6 h-8 bg-gradient-to-t ${isNightTime ? 'from-orange-400/80 via-amber-300/60' : 'from-orange-500/60 via-amber-400/40'} to-transparent rounded-full blur-sm animate-pulse absolute -top-4 left-0`} style={{ animationDelay: '0.7s' }} />
              </div>

              {/* Carved ornamental top */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-800 to-amber-900 border-b-2 border-amber-600/50">
                <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                  <pattern id="rightCarving" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
                    <path d="M0 8 Q6 4 12 8 Q18 12 24 8" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#rightCarving)"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* CONNECTING ARCH - Spans middle 60% with entrance animation */}
          {/* ========================================== */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={libraryEntered ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className="hidden lg:block absolute top-0 left-[18%] right-[18%] h-24 z-30 pointer-events-none"
          >
            {/* Stone arch structure */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
              <defs>
                {/* Stone gradient */}
                <linearGradient id="archStone" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="0.95"/>
                  <stop offset="50%" stopColor="#451a03" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#1c0a00" stopOpacity="0.85"/>
                </linearGradient>
                {/* Gold accent gradient */}
                <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3"/>
                </linearGradient>
              </defs>

              {/* Main arch shape */}
              <path
                d="M0 80 L0 35 Q0 0 40 0 L360 0 Q400 0 400 35 L400 80 L380 80 L380 40 Q380 15 350 15 L50 15 Q20 15 20 40 L20 80 Z"
                fill="url(#archStone)"
              />

              {/* Inner arch opening highlight */}
              <path
                d="M20 80 L20 45 Q20 20 55 20 L345 20 Q380 20 380 45 L380 80"
                fill="none"
                stroke="url(#archGold)"
                strokeWidth="2"
              />

              {/* Keystone */}
              <path
                d="M180 0 L220 0 L225 20 L175 20 Z"
                fill="#78350f"
                stroke="#fbbf24"
                strokeWidth="1"
                opacity="0.9"
              />

              {/* Keystone emblem */}
              <circle cx="200" cy="10" r="6" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
              <circle cx="200" cy="10" r="3" fill="#fbbf24" opacity="0.4"/>

              {/* Decorative voussoirs (arch stones) */}
              {[40, 80, 120, 280, 320, 360].map((x, i) => (
                <line key={i} x1={x} y1="0" x2={x + (i < 3 ? 5 : -5)} y2="20" stroke="#451a03" strokeWidth="1" opacity="0.5"/>
              ))}
            </svg>

            {/* Arch inscription */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-6 py-1 bg-gradient-to-r from-transparent via-amber-900/60 to-transparent">
              <span className="text-[10px] font-bold text-amber-300/70 uppercase tracking-[0.3em]" style={{ fontFamily: 'Georgia, serif' }}>
                Wisdom Awaits Within
              </span>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10 lg:px-[20%]">
          <div className="max-w-6xl mx-auto lg:pt-16">
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
                    {totalArticles > 0 ? totalArticles : articles.length + (featuredArticle ? 1 : 0)} Articles
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

            {/* Ancient Scroll Library - Multi-Shelf Design with Extreme Detail */}
            {!searchQuery && activeSort === 'all' && (
              <div className="relative mb-8">
                {/* Section header - Ancient Tomb Library style */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/60" />
                    <div className="w-2 h-2 bg-amber-500 rotate-45 shadow-lg shadow-amber-500/50" />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-900/70 via-amber-800/90 to-amber-900/70 border-y-2 border-amber-500/50 shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span className="text-[11px] font-bold text-amber-200 uppercase tracking-[0.2em]">Recent Articles</span>
                    <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-amber-500 rotate-45 shadow-lg shadow-amber-500/50" />
                    <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/60" />
                  </div>
                </div>

                {/* Grand Library Structure - Multi-level wooden shelving */}
                <div className="relative max-w-5xl mx-auto">
                  {/* Ambient lighting effects */}
                  <div className="absolute -top-8 left-1/4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -top-8 right-1/4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Main library cabinet structure */}
                  <div className="relative bg-gradient-to-b from-amber-950/80 via-stone-900/90 to-stone-950/95 rounded-t-xl border-2 border-amber-700/40 shadow-2xl overflow-hidden">
                    {/* Ornate top trim - carved wood pattern */}
                    <div className="h-6 bg-gradient-to-b from-amber-800/80 to-amber-900/60 border-b-2 border-amber-600/40 relative overflow-hidden">
                      {/* Carved pattern */}
                      <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
                        <defs>
                          <pattern id="woodCarving" x="0" y="0" width="48" height="24" patternUnits="userSpaceOnUse">
                            <path d="M0 12 Q12 6 24 12 Q36 18 48 12" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
                            <circle cx="24" cy="12" r="3" fill="none" stroke="#f59e0b" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#woodCarving)"/>
                      </svg>
                      {/* Decorative finials */}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg border border-amber-300/50" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg border border-amber-300/50" />
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-lg border-2 border-amber-200/50" />
                    </div>

                    {/* Shelf Row 1 - Top Shelf (Most Prestigious) */}
                    <div className="relative">
                      {/* Wooden shelf back panel */}
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-800/60 to-stone-900/80"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood)' opacity='0.15'/%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Scrolls on top shelf */}
                      <div className="relative flex items-end justify-center gap-4 sm:gap-6 py-6 px-6">
                        {[0, 1, 2].map((slotIndex) => {
                          const article = trendingArticles[slotIndex]
                          const isEmptySlot = !article

                          // Ultra-detailed scroll themes
                          const scrollThemes = [
                            {
                              wood: 'from-amber-700 via-amber-600 to-amber-800',
                              woodAccent: 'bg-amber-500',
                              parchment: 'from-amber-100 via-amber-50 to-amber-100',
                              seal: 'from-red-700 via-red-600 to-red-800',
                              sealAccent: 'bg-red-400',
                              leather: 'bg-amber-900',
                              metal: 'from-yellow-400 via-yellow-300 to-yellow-500',
                              ribbon: 'bg-red-800',
                              age: 'opacity-30'
                            },
                            {
                              wood: 'from-emerald-800 via-emerald-700 to-emerald-900',
                              woodAccent: 'bg-emerald-500',
                              parchment: 'from-emerald-50 via-stone-50 to-emerald-50',
                              seal: 'from-emerald-600 via-emerald-500 to-emerald-700',
                              sealAccent: 'bg-emerald-300',
                              leather: 'bg-emerald-950',
                              metal: 'from-gray-300 via-gray-200 to-gray-400',
                              ribbon: 'bg-emerald-900',
                              age: 'opacity-25'
                            },
                            {
                              wood: 'from-violet-800 via-violet-700 to-violet-900',
                              woodAccent: 'bg-violet-500',
                              parchment: 'from-violet-50 via-rose-50 to-violet-50',
                              seal: 'from-violet-600 via-violet-500 to-violet-700',
                              sealAccent: 'bg-violet-300',
                              leather: 'bg-violet-950',
                              metal: 'from-amber-400 via-amber-300 to-amber-500',
                              ribbon: 'bg-violet-900',
                              age: 'opacity-20'
                            },
                          ]
                          const theme = scrollThemes[slotIndex] || scrollThemes[0]
                          const tilt = slotIndex === 1 ? 0 : slotIndex === 0 ? -2 : 2

                          if (isEmptySlot) {
                            return (
                              <div key={`empty-top-${slotIndex}`} className="relative w-14 sm:w-16 h-28 sm:h-32 group/ghost">
                                {/* Realistic ghost scroll with holder */}
                                <div className="absolute inset-0 opacity-50 group-hover/ghost:opacity-70 transition-opacity">
                                  {/* Scroll holder cradle */}
                                  <div className="absolute bottom-0 left-1 right-1 h-3 bg-gradient-to-t from-amber-800/60 to-amber-700/40 rounded-t-sm border-t border-amber-500/30" />

                                  {/* Ghost parchment body */}
                                  <div className="absolute inset-x-2 top-5 bottom-5 border-2 border-dashed border-amber-400/50 rounded-sm bg-gradient-to-b from-amber-100/10 via-amber-50/5 to-amber-100/10">
                                    {/* Faint text lines */}
                                    <div className="absolute inset-2 space-y-1.5 opacity-30">
                                      <div className="h-px bg-amber-400/40 w-3/4" />
                                      <div className="h-px bg-amber-400/30 w-full" />
                                      <div className="h-px bg-amber-400/30 w-2/3" />
                                    </div>
                                  </div>

                                  {/* Ghost top rod */}
                                  <div className="absolute top-0 left-0.5 right-0.5 h-5 border-2 border-dashed border-amber-500/40 rounded-t-sm bg-amber-700/20">
                                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 border border-dashed border-amber-400/50 rounded-full" />
                                  </div>

                                  {/* Ghost bottom rod */}
                                  <div className="absolute bottom-0 left-0.5 right-0.5 h-5 border-2 border-dashed border-amber-500/40 rounded-b-sm bg-amber-700/20">
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border border-dashed border-amber-400/50 rounded-full" />
                                  </div>

                                  {/* Subtle glow pulse */}
                                  <div className="absolute inset-0 bg-amber-400/5 rounded-sm animate-pulse" style={{ animationDuration: '3s' }} />

                                  {/* "Your article here" hint */}
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] text-amber-400/60 font-medium whitespace-nowrap rotate-90">
                                    +
                                  </div>
                                </div>
                              </div>
                            )
                          }

                          return (
                            <div
                              key={article.id}
                              className="group relative cursor-pointer"
                              style={{ transform: `rotate(${tilt}deg)` }}
                              onClick={() => {
                                const modal = document.getElementById(`scroll-modal-${article.id}`)
                                if (modal) modal.classList.remove('hidden')
                              }}
                            >
                              {/* Ultra-detailed realistic scroll */}
                              <div className="relative w-14 sm:w-16 h-28 sm:h-32 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-0">
                                {/* Multi-layered drop shadow for depth */}
                                <div className="absolute -bottom-2 left-2 right-2 h-3 bg-black/50 blur-md rounded-full" />
                                <div className="absolute -bottom-1 left-1 right-1 h-2 bg-black/30 blur-sm rounded-full" />

                                {/* Scroll holder/cradle at bottom */}
                                <div className="absolute bottom-0 left-0.5 right-0.5 h-3 bg-gradient-to-t from-amber-800/80 to-amber-700/60 rounded-t-sm border-t border-amber-500/40 z-5" />

                                {/* Rolled parchment body with enhanced texture */}
                                <div className={`absolute inset-x-1.5 top-6 bottom-6 bg-gradient-to-r ${theme.parchment} rounded-sm shadow-inner overflow-hidden`}>
                                  {/* Parchment aged texture - more prominent */}
                                  <div className={`absolute inset-0 ${theme.age}`} style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
                                  }} />
                                  {/* Realistic age spots and wear */}
                                  <div className="absolute top-1/5 left-1/4 w-2.5 h-2.5 bg-amber-700/25 rounded-full blur-sm" />
                                  <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-amber-800/20 rounded-full blur-sm" />
                                  <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-amber-900/15 rounded-full blur-sm" />
                                  {/* Ink lines - text hints */}
                                  <div className="absolute inset-x-1.5 top-1/4 space-y-1">
                                    <div className="h-px bg-amber-900/15 w-4/5" />
                                    <div className="h-px bg-amber-900/12 w-full" />
                                    <div className="h-px bg-amber-900/12 w-3/5" />
                                    <div className="h-px bg-amber-900/10 w-4/5" />
                                  </div>
                                  {/* Parchment edge curl effect */}
                                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-amber-200/40 to-transparent" />
                                </div>

                                {/* Top wooden rod with extreme realistic detail */}
                                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b ${theme.wood} rounded-t-sm shadow-lg overflow-hidden`}>
                                  {/* Wood grain texture - enhanced */}
                                  <div className="absolute inset-0 opacity-40" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 8 50 10 Q75 12 100 10' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.4'/%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.3' opacity='0.25'/%3E%3Cpath d='M0 15 Q25 13 50 15 Q75 17 100 15' fill='none' stroke='%23000' stroke-width='0.3' opacity='0.25'/%3E%3C/svg%3E")`,
                                  }} />
                                  {/* Top edge highlight */}
                                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/20 to-transparent" />
                                  {/* Center decorative brass finial */}
                                  <div className={`absolute top-0.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-gradient-to-br ${theme.metal} rounded-full shadow-lg border border-white/40`}>
                                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
                                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-transparent to-black/10" />
                                  </div>
                                  {/* Ornate side caps */}
                                  <div className={`absolute top-1/2 -translate-y-1/2 -left-0.5 w-2 h-3 bg-gradient-to-r ${theme.metal} rounded-l-sm shadow-lg border-l border-white/30`} />
                                  <div className={`absolute top-1/2 -translate-y-1/2 -right-0.5 w-2 h-3 bg-gradient-to-l ${theme.metal} rounded-r-sm shadow-lg border-r border-white/30`} />
                                </div>

                                {/* Bottom wooden rod */}
                                <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t ${theme.wood} rounded-b-sm shadow-lg overflow-hidden`}>
                                  {/* Wood grain */}
                                  <div className="absolute inset-0 opacity-40" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 12 50 10 Q75 8 100 10' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E")`,
                                  }} />
                                  {/* Bottom edge shadow */}
                                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/20 to-transparent" />
                                  <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-gradient-to-br ${theme.metal} rounded-full shadow-lg border border-white/40`}>
                                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
                                  </div>
                                  <div className={`absolute top-1/2 -translate-y-1/2 -left-0.5 w-2 h-3 bg-gradient-to-r ${theme.metal} rounded-l-sm shadow`} />
                                  <div className={`absolute top-1/2 -translate-y-1/2 -right-0.5 w-2 h-3 bg-gradient-to-l ${theme.metal} rounded-r-sm shadow`} />
                                </div>

                                {/* Leather binding strap - enhanced */}
                                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-11 h-3 ${theme.leather} rounded-sm shadow-lg z-10 border border-black/20`}>
                                  {/* Stitching detail */}
                                  <div className="absolute top-0.5 left-1 right-3 h-px bg-amber-400/30" />
                                  <div className="absolute bottom-0.5 left-1 right-3 h-px bg-amber-400/30" />
                                  {/* Brass buckle with detail */}
                                  <div className={`absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-4 bg-gradient-to-r ${theme.metal} rounded-sm shadow-lg border border-white/30`}>
                                    <div className="absolute inset-0.5 rounded-sm bg-gradient-to-br from-white/30 to-transparent" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-black/20 rounded-sm" />
                                  </div>
                                </div>

                                {/* Ornate wax seal - enhanced with more detail */}
                                <div className={`absolute -right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br ${theme.seal} rounded-full shadow-xl z-20 border-2 border-white/15 overflow-hidden`}>
                                  {/* Seal rim detail */}
                                  <div className="absolute inset-0.5 rounded-full border border-white/10" />
                                  {/* Embossed pattern */}
                                  <div className="absolute inset-0" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='11' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.15'/%3E%3Ccircle cx='15' cy='15' r='7' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.25'/%3E%3Ccircle cx='15' cy='15' r='3' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.35'/%3E%3C/svg%3E")`,
                                  }} />
                                  {/* Rank number with embossed effect */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[11px] font-black text-white drop-shadow-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>#{slotIndex + 1}</span>
                                  </div>
                                  {/* Realistic wax drip */}
                                  <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-3 bg-gradient-to-b ${theme.seal} rounded-b-full`}>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/10 rounded-full blur-sm" />
                                  </div>
                                  {/* Secondary drip */}
                                  <div className={`absolute -bottom-0.5 left-1/3 w-1.5 h-2 bg-gradient-to-b ${theme.seal} rounded-b-full opacity-80`} />
                                </div>

                                {/* Decorative silk ribbon - enhanced */}
                                <div className={`absolute -left-1.5 top-1/3 w-7 h-1.5 ${theme.ribbon} rounded-sm shadow-md transform -rotate-15 opacity-90`}>
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-sm" />
                                  <div className="absolute -right-1 top-0 w-2 h-full bg-gradient-to-l from-transparent to-current opacity-50 transform skew-x-12" />
                                </div>
                              </div>

                              {/* Enhanced glow effect on hover */}
                              <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/25 rounded-lg transition-all duration-300 blur-xl -z-10" />
                              <div className="absolute -inset-2 bg-amber-300/0 group-hover:bg-amber-300/10 rounded-2xl transition-all duration-500 blur-2xl -z-20" />
                            </div>
                          )
                        })}
                      </div>

                      {/* Wooden shelf - detailed 3D effect */}
                      <div className="h-4 bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 border-t-2 border-amber-600/50 shadow-lg relative overflow-hidden">
                        {/* Wood grain on shelf */}
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q50 8 100 10 Q150 12 200 10' fill='none' stroke='%23000' stroke-width='1' opacity='0.4'/%3E%3C/svg%3E")`,
                        }} />
                        {/* Shelf edge highlight */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-500/30 to-transparent" />
                        {/* Decorative bracket hints */}
                        <div className="absolute bottom-0 left-8 w-6 h-2 bg-amber-950 rounded-b-sm" />
                        <div className="absolute bottom-0 right-8 w-6 h-2 bg-amber-950 rounded-b-sm" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-amber-950 rounded-b-sm" />
                      </div>
                    </div>

                    {/* Shelf Row 2 - Middle Shelf */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-800/50 to-stone-900/70"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood2)' opacity='0.12'/%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Enhanced ghost scroll slots - showing article positions */}
                      <div className="relative flex items-end justify-center gap-5 sm:gap-7 py-5 px-6">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={`empty-middle-${i}`} className="relative w-12 sm:w-14 h-24 sm:h-28 group/ghost">
                            <div className="absolute inset-0 opacity-35 group-hover/ghost:opacity-55 transition-opacity duration-300">
                              {/* Scroll holder cradle */}
                              <div className="absolute bottom-0 left-0.5 right-0.5 h-2.5 bg-gradient-to-t from-amber-700/50 to-amber-600/30 rounded-t-sm border-t border-amber-500/20" />

                              {/* Ghost parchment body */}
                              <div className="absolute inset-x-1.5 top-4 bottom-4 border-2 border-dashed border-amber-400/40 rounded-sm bg-gradient-to-b from-amber-100/8 via-amber-50/4 to-amber-100/8">
                                <div className="absolute inset-1.5 space-y-1 opacity-25">
                                  <div className="h-px bg-amber-400/30 w-2/3" />
                                  <div className="h-px bg-amber-400/20 w-full" />
                                  <div className="h-px bg-amber-400/20 w-1/2" />
                                </div>
                              </div>

                              {/* Ghost rods */}
                              <div className="absolute top-0 left-0 right-0 h-4 border-2 border-dashed border-amber-500/35 rounded-t-sm bg-amber-700/15">
                                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-dashed border-amber-400/40 rounded-full" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 h-4 border-2 border-dashed border-amber-500/35 rounded-b-sm bg-amber-700/15">
                                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-dashed border-amber-400/40 rounded-full" />
                              </div>

                              {/* Subtle awaiting glow */}
                              <div className="absolute inset-0 bg-amber-400/3 rounded-sm animate-pulse" style={{ animationDuration: '4s', animationDelay: `${i * 0.5}s` }} />

                              {/* + indicator */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] text-amber-400/50 font-bold">
                                +
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Wooden shelf */}
                      <div className="h-3 bg-gradient-to-b from-amber-800/90 via-amber-900 to-amber-950 border-t border-amber-600/40 shadow-md relative">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-b from-amber-500/20 to-transparent" />
                      </div>
                    </div>

                    {/* Shelf Row 3 - Bottom Shelf (Deepest, most mysterious) */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-black/40"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.06' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood3)' opacity='0.1'/%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Bottom shelf ghost slots - deepest, most mysterious */}
                      <div className="relative flex items-end justify-center gap-4 sm:gap-5 py-4 px-6">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div key={`empty-bottom-${i}`} className="relative w-10 sm:w-12 h-20 sm:h-24 group/ghost">
                            <div className="absolute inset-0 opacity-25 group-hover/ghost:opacity-40 transition-opacity duration-300">
                              {/* Mysterious deep shadow */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-sm" />

                              {/* Ghost parchment - faded with age */}
                              <div className="absolute inset-x-1 top-3 bottom-3 border border-dashed border-amber-500/25 rounded-sm bg-gradient-to-b from-amber-100/5 to-amber-200/3">
                                <div className="absolute inset-1 space-y-0.5 opacity-15">
                                  <div className="h-px bg-amber-400/20 w-1/2" />
                                  <div className="h-px bg-amber-400/15 w-3/4" />
                                </div>
                              </div>

                              {/* Ancient rods */}
                              <div className="absolute top-0 left-0 right-0 h-3 border border-dashed border-amber-500/25 rounded-t-sm bg-amber-800/10" />
                              <div className="absolute bottom-0 left-0 right-0 h-3 border border-dashed border-amber-500/25 rounded-b-sm bg-amber-800/10" />

                              {/* Very subtle pulse */}
                              <div className="absolute inset-0 bg-amber-400/2 rounded-sm animate-pulse" style={{ animationDuration: '5s', animationDelay: `${i * 0.7}s` }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom shelf */}
                      <div className="h-3 bg-gradient-to-b from-amber-900/80 to-amber-950 border-t border-amber-700/30 shadow relative">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-b from-amber-600/15 to-transparent" />
                      </div>
                    </div>

                    {/* Cabinet base with ornate details */}
                    <div className="h-8 bg-gradient-to-b from-amber-950 to-stone-950 relative overflow-hidden">
                      {/* Carved base pattern */}
                      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                        <defs>
                          <pattern id="baseCarving" x="0" y="0" width="60" height="32" patternUnits="userSpaceOnUse">
                            <path d="M0 16 L15 8 L30 16 L45 8 L60 16" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                            <circle cx="30" cy="16" r="4" fill="none" stroke="#f59e0b" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#baseCarving)"/>
                      </svg>
                      {/* Base feet */}
                      <div className="absolute bottom-0 left-6 w-8 h-2 bg-amber-900 rounded-t-sm shadow-inner" />
                      <div className="absolute bottom-0 right-6 w-8 h-2 bg-amber-900 rounded-t-sm shadow-inner" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-amber-900 rounded-t-sm shadow-inner" />
                    </div>
                  </div>

                  {/* Floating dust particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-amber-300/60 rounded-full animate-pulse"
                        style={{
                          left: `${10 + (i * 7)}%`,
                          top: `${20 + ((i * 17) % 60)}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${2 + (i % 3)}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Side torch effects */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-24 pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-sm" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-orange-500/60 via-amber-400/40 to-transparent rounded-full blur-sm animate-pulse" />
                  </div>
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-24 pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-sm" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-orange-500/60 via-amber-400/40 to-transparent rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-center text-[10px] text-amber-400/50 mt-4 font-medium tracking-wide">
                  Hover over a scroll to preview • Click to read
                </p>
              </div>
            )}

            {/* Centered Modal Popups for each scroll */}
            {trendingArticles.map((article, index) => (
              <div
                key={`modal-${article.id}`}
                id={`scroll-modal-${article.id}`}
                className="hidden fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    e.currentTarget.classList.add('hidden')
                  }
                }}
              >
                {/* Backdrop - clickable to close */}
                <div
                  className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                  onClick={() => document.getElementById(`scroll-modal-${article.id}`)?.classList.add('hidden')}
                />

                {/* Modal Content - Unrolled Scroll Style */}
                <div
                  className="relative w-full max-w-md animate-in fade-in zoom-in duration-300 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Scroll unfurl visual */}
                  <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 rounded-lg shadow-2xl overflow-hidden border-4 border-amber-700/60" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(180, 83, 9, 0.3)' }}>
                    {/* Parchment texture */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='parch'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23parch)'/%3E%3C/svg%3E")`,
                    }} />

                    {/* Top scroll rod */}
                    <div className="h-8 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 border-b-4 border-amber-600/50 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 left-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border border-yellow-300/50" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border border-yellow-300/50" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg border-2 border-yellow-200/50" />
                    </div>

                    {/* Content area */}
                    <div className="relative p-6">
                      {/* Close button */}
                      <button
                        onClick={() => document.getElementById(`scroll-modal-${article.id}`)?.classList.add('hidden')}
                        className="absolute top-2 right-2 w-8 h-8 bg-amber-800/80 hover:bg-amber-700 text-amber-100 rounded-full flex items-center justify-center transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Rank badge */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-xl flex items-center justify-center border-2 border-red-400/50 z-10">
                        <span className="text-sm font-black text-white">#{index + 1}</span>
                      </div>

                      {/* Category */}
                      <div className="flex items-center justify-center mb-4 pt-4">
                        <span className="px-3 py-1 bg-amber-700/20 text-amber-900 text-xs font-bold rounded-full border border-amber-700/30">
                          {article.category.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-amber-950 text-center mb-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        {article.title}
                      </h3>

                      {/* Decorative divider */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-700/50" />
                        <div className="w-1.5 h-1.5 bg-amber-700 rotate-45" />
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-700/50" />
                      </div>

                      {/* Excerpt */}
                      <p className="text-sm text-amber-900/80 text-center mb-4 leading-relaxed line-clamp-3" style={{ fontFamily: 'Georgia, serif' }}>
                        {article.excerpt}
                      </p>

                      {/* Author section */}
                      <div className="flex items-center justify-center gap-3 mb-4 py-3 border-y border-amber-700/20">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAuthorTheme(article.author.guardianArchetype).gradient} flex items-center justify-center shadow-lg`}>
                          {article.author.image ? (
                            <img src={article.author.image} alt={article.author.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-amber-950 text-sm">{article.author.name}</p>
                          <p className="text-[10px] text-amber-800/70">
                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-center gap-6 mb-6">
                        <div className="flex items-center gap-1.5 text-amber-800">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-bold">{article.views}</span>
                          <span className="text-xs opacity-70">views</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-800">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-bold">{article.readTime}</span>
                          <span className="text-xs opacity-70">min read</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-800">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-bold">{article._count.comments}</span>
                          <span className="text-xs opacity-70">comments</span>
                        </div>
                      </div>

                      {/* Read button */}
                      <Link href={`/articles/${article.slug}`} className="block">
                        <button className="w-full py-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-white font-bold rounded-lg shadow-lg border-2 border-amber-500/40 transition-all flex items-center justify-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          <span>Unroll & Begin Reading</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>

                    {/* Bottom scroll rod */}
                    <div className="h-6 bg-gradient-to-t from-amber-700 via-amber-800 to-amber-900 border-t-2 border-amber-600/40 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 left-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow border border-yellow-300/50" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow border border-yellow-300/50" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

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
                        placeholder="Search articles..."
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
                    Welcome to Articles
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

            {/* Personal Bookshelf - Saved Articles */}
            {savedArticles.length > 0 && (
              <div className="mb-8 sm:mb-12">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg border-2 border-amber-400/30">
                    <Bookmark className="w-6 h-6 text-amber-100" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                      Your Personal Bookshelf
                    </h2>
                    <p className="text-sm text-[var(--muted)]">
                      {savedArticles.length} scroll{savedArticles.length !== 1 ? 's' : ''} preserved for later reading
                    </p>
                  </div>
                </div>

                {/* Bookshelf Visual */}
                <div className="relative bg-gradient-to-b from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-lg border-2 border-amber-700/30 p-4 sm:p-6 overflow-hidden">
                  {/* Wood texture */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q50 15 100 20' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3Cpath d='M0 40 Q50 35 100 40' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3Cpath d='M0 60 Q50 55 100 60' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3Cpath d='M0 80 Q50 75 100 80' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3C/svg%3E")`,
                  }} />

                  {/* Shelf edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />

                  {/* Saved articles as horizontal scrolls */}
                  <div className="relative flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-600/50 scrollbar-track-amber-900/20">
                    {articles
                      .filter(a => savedArticles.includes(a.id))
                      .map((article) => {
                        const authorTheme = getAuthorTheme(article.author.guardianArchetype)
                        const categorySlug = article.category?.slug || 'default'
                        const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability
                        const articleProg = readingProgress[article.id]
                        const progPercent = articleProg?.scrollProgress || 0
                        const isRead = articleProg?.completed || false

                        return (
                          <Link
                            key={article.id}
                            href={`/articles/${article.slug}`}
                            className="flex-shrink-0 group"
                          >
                            <div className="relative w-24 sm:w-28 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                              {/* Scroll visual */}
                              <div className="relative h-32 sm:h-36">
                                {/* Parchment body */}
                                <div className={`absolute inset-x-1 top-3 bottom-3 bg-gradient-to-b ${categoryTheme.parchment} rounded shadow-lg border border-amber-600/20 overflow-hidden`}>
                                  {/* Progress fill */}
                                  {progPercent > 0 && (
                                    <div
                                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-400/30 to-emerald-300/10"
                                      style={{ height: `${progPercent}%` }}
                                    />
                                  )}
                                  {/* Text lines suggestion */}
                                  <div className="absolute inset-2 flex flex-col gap-1.5 opacity-30">
                                    <div className="h-1 bg-amber-900/40 rounded-full w-full" />
                                    <div className="h-1 bg-amber-900/40 rounded-full w-4/5" />
                                    <div className="h-1 bg-amber-900/40 rounded-full w-full" />
                                    <div className="h-1 bg-amber-900/40 rounded-full w-3/4" />
                                  </div>
                                </div>

                                {/* Top rod */}
                                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-t shadow-md">
                                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400/60 rounded-full" />
                                  <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-amber-400/40 rounded-full" />
                                  <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-amber-400/40 rounded-full" />
                                </div>

                                {/* Bottom rod */}
                                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-600 via-amber-700 to-amber-800 rounded-b shadow-md">
                                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400/60 rounded-full" />
                                </div>

                                {/* Wax seal */}
                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5">
                                  <div className={`w-full h-full bg-gradient-to-br ${isRead ? 'from-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-lg border border-white/30 flex items-center justify-center`}>
                                    {isRead ? (
                                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <Bookmark className="w-2.5 h-2.5 text-white/80" />
                                    )}
                                  </div>
                                </div>

                                {/* Remove from saved button */}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    toggleSaveArticle(article.id)
                                  }}
                                  className="absolute -top-1 -left-1 w-5 h-5 bg-red-500/80 hover:bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                  title="Remove from bookshelf"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Title below scroll */}
                              <p className="mt-2 text-[10px] sm:text-xs text-center font-medium text-[var(--foreground)] line-clamp-2 leading-tight px-1">
                                {article.title}
                              </p>

                              {/* Progress text */}
                              {progPercent > 0 && (
                                <p className="text-[9px] text-center text-emerald-600 mt-0.5">
                                  {isRead ? 'Completed' : `${Math.round(progPercent)}% read`}
                                </p>
                              )}
                            </div>
                          </Link>
                        )
                      })}

                    {/* Empty state if saved articles not in current list */}
                    {articles.filter(a => savedArticles.includes(a.id)).length === 0 && (
                      <div className="w-full py-8 text-center">
                        <Bookmark className="w-10 h-10 mx-auto text-amber-600/40 mb-3" />
                        <p className="text-sm text-[var(--muted)]">
                          Your saved scrolls will appear here once loaded
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {articles.map((article) => {
                const authorTheme = getAuthorTheme(article.author.guardianArchetype)
                const readingDepth = getReadingDepth(article.readTime)
                const DepthIcon = readingDepth.icon

                const isSaved = savedArticles.includes(article.id)

                return (
                  <div key={article.id} className="relative group/card">
                    <Link href={`/articles/${article.slug}`}>
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
                              <div className="absolute top-2 right-10 sm:top-3 sm:right-12">
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
                  {/* Save to Bookshelf Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleSaveArticle(article.id)
                    }}
                    className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      isSaved
                        ? 'bg-amber-500 text-white'
                        : 'bg-white/90 hover:bg-amber-500 text-amber-700 hover:text-white opacity-0 group-hover/card:opacity-100'
                    }`}
                    title={isSaved ? 'Remove from bookshelf' : 'Save to bookshelf'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
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
