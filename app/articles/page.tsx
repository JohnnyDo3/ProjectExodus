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

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
  ArrowUpDown,
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

  // Grand Library state
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null)
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null)
  const [previewTimeout, setPreviewTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [openShelfDropdown, setOpenShelfDropdown] = useState<string | null>(null)
  const [shelfSortOptions, setShelfSortOptions] = useState<Record<string, string>>({
    personal: 'newest',
    recommended: 'newest',
  })

  // Time-based theme for dynamic lighting
  const { phase: timePhase } = useTimeTheme()
  const isNightTime = ['night', 'midnight', 'evening', 'dusk'].includes(timePhase)

  // Detect mobile for disabling dust particles
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll hover with 300ms delay for preview
  const handleScrollHover = (article: Article) => {
    if (previewTimeout) clearTimeout(previewTimeout)
    const timeout = setTimeout(() => {
      setPreviewArticle(article)
    }, 300)
    setPreviewTimeout(timeout)
    setHoveredBook(article.id)
  }

  const handleScrollLeave = () => {
    if (previewTimeout) clearTimeout(previewTimeout)
    setPreviewTimeout(null)
    setHoveredBook(null)
  }

  const closePreview = () => {
    setPreviewArticle(null)
  }

  // Get recommended articles based on reading history
  const getRecommendedArticles = useCallback(() => {
    if (!articles.length) return []

    // Get user's most-read categories from completed articles
    const readCategories: Record<string, number> = {}
    articles.forEach(article => {
      const progress = readingProgress[article.id]
      if (progress?.completed || progress?.scrollProgress > 50) {
        const cat = article.category?.slug || 'default'
        readCategories[cat] = (readCategories[cat] || 0) + 1
      }
    })

    // Sort by preference
    const sortedCategories = Object.entries(readCategories)
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat)

    // Get unread articles from preferred categories, then trending
    const unreadArticles = articles.filter(a => {
      const progress = readingProgress[a.id]
      return !progress?.completed && (progress?.scrollProgress || 0) < 50
    })

    // Prioritize preferred categories, then by views
    return unreadArticles
      .sort((a, b) => {
        const aCatIndex = sortedCategories.indexOf(a.category?.slug || '')
        const bCatIndex = sortedCategories.indexOf(b.category?.slug || '')
        if (aCatIndex !== -1 && bCatIndex === -1) return -1
        if (bCatIndex !== -1 && aCatIndex === -1) return 1
        if (aCatIndex !== bCatIndex) return aCatIndex - bCatIndex
        return (b.views || 0) - (a.views || 0)
      })
      .slice(0, 7)
  }, [articles, readingProgress])

  // Group articles by category
  const articlesByCategory = useMemo(() => {
    const grouped: Record<string, Article[]> = {}
    articles.forEach(article => {
      const cat = article.category?.slug || 'uncategorized'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push(article)
    })
    return grouped
  }, [articles])

  // Get scroll age (weathering effect based on publish date)
  const getScrollAge = (publishedAt: string): 'new' | 'recent' | 'aged' | 'ancient' => {
    const days = Math.floor((Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24))
    if (days < 7) return 'new'
    if (days < 30) return 'recent'
    if (days < 90) return 'aged'
    return 'ancient'
  }

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

              {/* Flipped Arch - Transition between hero text and Recent Articles */}
              <div className="relative h-12 my-4">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 48" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="archStoneFlipped" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#78350f" stopOpacity="0.8"/>
                      <stop offset="50%" stopColor="#451a03" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#1c0a00" stopOpacity="0.6"/>
                    </linearGradient>
                    <linearGradient id="archGoldFlipped" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2"/>
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2"/>
                    </linearGradient>
                  </defs>

                  {/* Flipped arch shape - curves at bottom */}
                  <path
                    d="M0 0 L0 25 Q0 48 30 48 L370 48 Q400 48 400 25 L400 0 L385 0 L385 22 Q385 38 360 38 L40 38 Q15 38 15 22 L15 0 Z"
                    fill="url(#archStoneFlipped)"
                  />

                  {/* Inner arch opening highlight */}
                  <path
                    d="M15 0 L15 18 Q15 34 45 34 L355 34 Q385 34 385 18 L385 0"
                    fill="none"
                    stroke="url(#archGoldFlipped)"
                    strokeWidth="1.5"
                  />

                  {/* Inverted keystone */}
                  <path
                    d="M185 48 L215 48 L218 36 L182 36 Z"
                    fill="#78350f"
                    stroke="#fbbf24"
                    strokeWidth="0.8"
                    opacity="0.7"
                  />

                  {/* Keystone emblem */}
                  <circle cx="200" cy="42" r="4" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5"/>
                  <circle cx="200" cy="42" r="2" fill="#fbbf24" opacity="0.3"/>
                </svg>
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

          {/* Ambient dust particles - subtle, hidden on mobile for performance */}
          {!isMobile && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`dust-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-amber-300/30"
                  initial={{
                    x: `${10 + (i * 6) % 80}%`,
                    y: `${5 + (i * 7) % 90}%`,
                    opacity: 0.1
                  }}
                  animate={{
                    y: [`${5 + (i * 7) % 90}%`, `${10 + (i * 7) % 85}%`, `${5 + (i * 7) % 90}%`],
                    x: [`${10 + (i * 6) % 80}%`, `${12 + (i * 6) % 78}%`, `${10 + (i * 6) % 80}%`],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4 + (i % 3) * 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          )}

          {/* Torch flicker shadow effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-[10%] left-[5%] w-40 h-60 bg-gradient-to-b from-black/5 to-transparent blur-lg"
              animate={{ opacity: [0.3, 0.5, 0.3], x: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-[10%] right-[5%] w-40 h-60 bg-gradient-to-b from-black/5 to-transparent blur-lg"
              animate={{ opacity: [0.3, 0.5, 0.3], x: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </div>

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
                        const isHovered = hoveredBook === article.id
                        const categorySlug = article.category?.slug || 'default'
                        const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability

                        const articleProgress = readingProgress[article.id]
                        const progressPercent = articleProgress?.scrollProgress || 0
                        const isCompleted = articleProgress?.completed || false

                        // Scroll age weathering effect
                        const scrollAge = getScrollAge(article.publishedAt)
                        const ageOpacity = scrollAge === 'new' ? 'opacity-0' : scrollAge === 'recent' ? 'opacity-10' : scrollAge === 'aged' ? 'opacity-20' : 'opacity-30'

                        return (
                          <div
                            key={article.id}
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''}`}
                            style={{ transform: `rotate(${(i % 2 - 0.5) * 3}deg)` }}
                            onMouseEnter={() => handleScrollHover(article)}
                            onMouseLeave={handleScrollLeave}
                            onClick={() => setPreviewArticle(article)}
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
                            {/* Age weathering overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-amber-900/0 via-amber-800/10 to-amber-900/20 pointer-events-none rounded-sm ${ageOpacity}`} />
                            {/* Hover tooltip with progress */}
                            {isHovered && !previewArticle && (
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-amber-900/95 text-amber-100 text-[8px] font-bold rounded whitespace-nowrap z-50 shadow-lg">
                                <div className="max-w-24 truncate">{article.title}</div>
                                {progressPercent > 0 && (
                                  <div className="text-[7px] text-emerald-300 mt-0.5">
                                    {isCompleted ? '✓ Complete' : `${Math.round(progressPercent)}% read`}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
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
                        const isHovered = hoveredBook === article.id
                        const categorySlug = article.category?.slug || 'default'
                        const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability

                        const articleProgress = readingProgress[article.id]
                        const progressPercent = articleProgress?.scrollProgress || 0
                        const isCompleted = articleProgress?.completed || false

                        // Scroll age weathering effect
                        const scrollAge = getScrollAge(article.publishedAt)
                        const ageOpacity = scrollAge === 'new' ? 'opacity-0' : scrollAge === 'recent' ? 'opacity-10' : scrollAge === 'aged' ? 'opacity-20' : 'opacity-30'

                        return (
                          <div
                            key={article.id}
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''}`}
                            style={{ transform: `rotate(${(i % 2 - 0.5) * -3}deg)` }}
                            onMouseEnter={() => handleScrollHover(article)}
                            onMouseLeave={handleScrollLeave}
                            onClick={() => setPreviewArticle(article)}
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
                            {/* Age weathering overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-amber-900/0 via-amber-800/10 to-amber-900/20 pointer-events-none rounded-sm ${ageOpacity}`} />
                            {/* Hover tooltip with progress */}
                            {isHovered && !previewArticle && (
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-amber-900/95 text-amber-100 text-[8px] font-bold rounded whitespace-nowrap z-50 shadow-lg">
                                <div className="max-w-24 truncate">{article.title}</div>
                                {progressPercent > 0 && (
                                  <div className="text-[7px] text-emerald-300 mt-0.5">
                                    {isCompleted ? '✓ Complete' : `${Math.round(progressPercent)}% read`}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
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
          {/* CONNECTING ARCH - Blends into side bookshelves */}
          {/* ========================================== */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={libraryEntered ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className="hidden lg:block absolute top-0 left-[16%] right-[16%] h-24 z-25 pointer-events-none"
          >
            {/* Wood/Stone arch structure - matches bookshelf color */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
              <defs>
                {/* Wood gradient matching side bookshelves */}
                <linearGradient id="archWood" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="1"/>
                  <stop offset="30%" stopColor="#92400e" stopOpacity="0.98"/>
                  <stop offset="70%" stopColor="#78350f" stopOpacity="0.95"/>
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.9"/>
                </linearGradient>
                {/* Gold accent gradient */}
                <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3"/>
                </linearGradient>
              </defs>

              {/* Main arch shape - extends to blend with side shelves */}
              <path
                d="M0 80 L0 0 L400 0 L400 80 L380 80 L380 35 Q380 15 350 15 L50 15 Q20 15 20 35 L20 80 Z"
                fill="url(#archWood)"
              />

              {/* Inner arch opening highlight */}
              <path
                d="M20 80 L20 40 Q20 20 55 20 L345 20 Q380 20 380 40 L380 80"
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

              {/* Wood grain texture lines */}
              <path d="M0 25 Q100 22 200 25 Q300 28 400 25" fill="none" stroke="#451a03" strokeWidth="0.5" opacity="0.3"/>
              <path d="M0 45 Q100 42 200 45 Q300 48 400 45" fill="none" stroke="#451a03" strokeWidth="0.5" opacity="0.3"/>

              {/* Decorative voussoirs (arch stones) */}
              {[40, 80, 120, 280, 320, 360].map((x, i) => (
                <line key={i} x1={x} y1="0" x2={x + (i < 3 ? 5 : -5)} y2="20" stroke="#451a03" strokeWidth="1" opacity="0.5"/>
              ))}
            </svg>

            {/* Carved border at bottom edge */}
            <div className="absolute bottom-0 left-5 right-5 h-1 bg-gradient-to-r from-amber-600/40 via-amber-500/60 to-amber-600/40" />

            {/* Arch inscription */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-6 py-1 bg-gradient-to-r from-transparent via-amber-900/60 to-transparent">
              <span className="text-[10px] font-bold text-amber-300/70 uppercase tracking-[0.3em]" style={{ fontFamily: 'Georgia, serif' }}>
                Wisdom Awaits Within
              </span>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* BOTTOM CONNECTING SHELF - Spans middle     */}
          {/* Connects left and right bookshelves        */}
          {/* ========================================== */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={libraryEntered ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
            className="hidden lg:block absolute bottom-0 left-[16%] right-[16%] h-6 z-25 pointer-events-none"
          >
            {/* Shelf surface - matching side bookshelves exactly */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg overflow-hidden">
              {/* Wood grain texture */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
              }} />
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/30 to-transparent" />
            </div>
            {/* Seamless blend into side shelves */}
            <div className="absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700" />
            <div className="absolute -right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-900 via-amber-800 to-amber-700" />
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

            {/* Flipped Arch - Transition between hero text and Recent Articles */}
            <div className="relative h-12 my-4">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 48" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="archStoneFlippedAuth" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#78350f" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#451a03" stopOpacity="0.7"/>
                    <stop offset="100%" stopColor="#1c0a00" stopOpacity="0.6"/>
                  </linearGradient>
                  <linearGradient id="archGoldFlippedAuth" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2"/>
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>

                {/* Flipped arch shape - curves at bottom */}
                <path
                  d="M0 0 L0 25 Q0 48 30 48 L370 48 Q400 48 400 25 L400 0 L385 0 L385 22 Q385 38 360 38 L40 38 Q15 38 15 22 L15 0 Z"
                  fill="url(#archStoneFlippedAuth)"
                />

                {/* Inner arch opening highlight */}
                <path
                  d="M15 0 L15 18 Q15 34 45 34 L355 34 Q385 34 385 18 L385 0"
                  fill="none"
                  stroke="url(#archGoldFlippedAuth)"
                  strokeWidth="1.5"
                />

                {/* Inverted keystone */}
                <path
                  d="M185 48 L215 48 L218 36 L182 36 Z"
                  fill="#78350f"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  opacity="0.7"
                />

                {/* Keystone emblem */}
                <circle cx="200" cy="42" r="4" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5"/>
                <circle cx="200" cy="42" r="2" fill="#fbbf24" opacity="0.3"/>
              </svg>
            </div>


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

      {/* ========================================== */}
      {/* 75% OVERLAY PREVIEW - Scroll Unfurling    */}
      {/* ========================================== */}
      <AnimatePresence>
        {previewArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            onClick={closePreview}
          >
            {/* Backdrop - 75% coverage with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Scroll Preview Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full max-w-2xl mx-4 max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Unfurling scroll visual */}
              <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 rounded-lg shadow-2xl overflow-hidden"
                style={{ boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(180, 83, 9, 0.4)' }}
              >
                {/* Parchment texture */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='parchPreview'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23parchPreview)'/%3E%3C/svg%3E")`,
                }} />

                {/* Top scroll rod with ornate details */}
                <div className="h-12 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 border-b-4 border-amber-600/50 relative flex items-center justify-center">
                  {/* Left finial */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border-2 border-yellow-300/50" />
                  {/* Center medallion */}
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg border-2 border-yellow-200/50 flex items-center justify-center">
                    <ScrollText className="w-4 h-4 text-amber-800" />
                  </div>
                  {/* Right finial */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border-2 border-yellow-300/50" />
                  {/* Close button */}
                  <button
                    onClick={closePreview}
                    className="absolute right-14 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-900/80 hover:bg-amber-800 text-amber-100 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content area */}
                <div className="relative p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
                  {/* Category badge */}
                  <div className="flex items-center justify-center mb-4">
                    <span className={`px-4 py-1.5 bg-gradient-to-r ${CATEGORY_SCROLL_THEMES[previewArticle.category?.slug || 'sustainability']?.seal || 'from-emerald-600 to-emerald-800'} text-white text-xs font-bold rounded-full shadow-lg`}>
                      {previewArticle.category?.name || 'Article'}
                    </span>
                  </div>

                  {/* Cover image if exists */}
                  {previewArticle.coverImage && (
                    <div className="relative w-full h-48 sm:h-56 rounded-lg overflow-hidden mb-6 shadow-lg border-2 border-amber-700/30">
                      <img
                        src={previewArticle.coverImage}
                        alt={previewArticle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent" />
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 text-center mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                    {previewArticle.title}
                  </h2>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-700/50" />
                    <div className="w-2 h-2 bg-amber-700 rotate-45" />
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-700/50" />
                  </div>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-amber-900/80 text-center mb-6 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    {previewArticle.excerpt}
                  </p>

                  {/* Author section */}
                  <div className="flex items-center justify-center gap-4 mb-6 py-4 border-y border-amber-700/20">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAuthorTheme(previewArticle.author?.guardianArchetype).gradient} flex items-center justify-center shadow-lg`}>
                      {previewArticle.author?.image ? (
                        <img src={previewArticle.author.image} alt={previewArticle.author.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-amber-950 text-base">{previewArticle.author?.name || 'Anonymous'}</p>
                      <p className="text-xs text-amber-800/70">
                        {new Date(previewArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-amber-800">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-bold">{previewArticle.readTime} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-800">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-bold">{previewArticle.views} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-800">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-bold">{previewArticle._count?.comments || 0}</span>
                    </div>
                  </div>

                  {/* Reading progress if exists */}
                  {readingProgress[previewArticle.id] && (
                    <div className="mb-6 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-800">Your Progress</span>
                        <span className="text-xs font-bold text-emerald-600">
                          {readingProgress[previewArticle.id].completed ? 'Completed' : `${Math.round(readingProgress[previewArticle.id].scrollProgress)}%`}
                        </span>
                      </div>
                      <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                          style={{ width: `${readingProgress[previewArticle.id].scrollProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center justify-center gap-4">
                    <Link href={`/articles/${previewArticle.slug}`} onClick={closePreview}>
                      <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Begin Reading
                      </Button>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveArticle(previewArticle.id)
                      }}
                      className={`p-3 rounded-lg shadow-lg transition-colors ${
                        savedArticles.includes(previewArticle.id)
                          ? 'bg-amber-500 text-white'
                          : 'bg-white hover:bg-amber-100 text-amber-700 border border-amber-300'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${savedArticles.includes(previewArticle.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Bottom scroll rod */}
                <div className="h-10 bg-gradient-to-t from-amber-700 via-amber-800 to-amber-900 border-t-4 border-amber-600/50 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border border-yellow-300/50" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border border-yellow-300/50" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg border-2 border-yellow-200/50" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Contributor Invite Banner with Animated Quill */}
      {showContributorInvite && session && !showWelcomeGuide && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-amber-900/10 via-amber-800/5 to-amber-900/10 border-b-2 border-amber-600/20 overflow-hidden relative"
        >
          {/* Parchment texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Ink splatter decorations */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-600/20 blur-sm" />
          <div className="absolute left-[15%] top-1/3 w-1 h-1 rounded-full bg-amber-700/30" />
          <div className="absolute right-[20%] bottom-1/4 w-1.5 h-1.5 rounded-full bg-amber-500/20 blur-sm" />

          <div className="container mx-auto px-4 py-3 sm:py-4 relative">
            <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Animated Quill Icon */}
                <div className="shrink-0 relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg border-2 border-amber-400/30">
                    {/* Animated quill SVG */}
                    <motion.svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-amber-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="m9 11-6 6v3h9l3-3" />
                      <path d="m22 2-1.5 1.5" />
                      <path d="M19 5.5 9.5 15" />
                      <path d="M22 2c-1.5 2-3.5 3-6 3" />
                      <path d="M2 22c2-1.5 3-3.5 3-6" />
                    </motion.svg>
                  </div>
                  {/* Writing animation effect */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-3 h-3"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg" />
                  </motion.div>
                </div>

                <div>
                  <p className="text-sm sm:text-base font-bold text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                    Become a Scribe of Wisdom
                  </p>
                  <p className="text-[10px] sm:text-xs text-theme-muted font-medium">
                    Your knowledge can illuminate paths for fellow seekers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/articles/write">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="sm" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-lg border border-amber-400/30 flex items-center gap-2">
                      <PenSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Begin Writing</span>
                      <span className="sm:hidden">Write</span>
                    </Button>
                  </motion.div>
                </Link>
                <button
                  onClick={dismissContributorInvite}
                  className="p-1.5 rounded-full hover:bg-amber-900/20 transition-colors"
                >
                  <X className="w-4 h-4 text-theme-muted" />
                </button>
              </div>
            </div>
          </div>

          {/* Decorative ink line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </motion.div>
      )}

      {/* Filter Bar - Styled as bookshelf drawer */}
      <div className="sticky top-16 sm:top-20 z-40 bg-gradient-to-b from-amber-950 to-stone-900 border-b-4 border-amber-700/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-3 sm:py-4 gap-2">
            {/* Decorative left bracket */}
            <div className="hidden sm:block w-8 h-8 border-l-2 border-t-2 border-amber-500/40 rounded-tl-lg" />

            {/* Sort Options - Styled as brass toggles */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 flex-1 scrollbar-hide -mx-1 px-1">
              {sortOptions.map((option) => {
                const Icon = option.icon
                const isActive = activeSort === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() => setActiveSort(option.value)}
                    disabled={option.value === 'read' && !session}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex-shrink-0 border-2 ${
                      isActive
                        ? 'bg-gradient-to-b from-amber-600 to-amber-800 border-yellow-500/50 text-amber-100 shadow-lg'
                        : 'bg-gradient-to-b from-stone-700 to-stone-800 border-amber-700/30 text-amber-300/70 hover:border-amber-500/50'
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

            {/* Decorative right bracket */}
            <div className="hidden sm:block w-8 h-8 border-r-2 border-t-2 border-amber-500/40 rounded-tr-lg" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* GRAND LIBRARY - Full Width Bookshelf Content Area         */}
      {/* ========================================================= */}
      <div className="relative bg-gradient-to-b from-stone-900 via-amber-950/50 to-stone-900 min-h-screen">
        {/* Wood panel background texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q100 45 200 50' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M0 100 Q100 95 200 100' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M0 150 Q100 145 200 150' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />

        {/* Ambient torch lighting from sides */}
        <div className="absolute top-20 left-0 w-32 h-64 bg-gradient-to-r from-amber-500/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-32 h-64 bg-gradient-to-l from-amber-500/20 to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-6 sm:py-8 relative">
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
              <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 animate-spin text-amber-500" />
              <p className="text-sm sm:text-base text-amber-300/70 font-medium">Loading the library...</p>
            </div>
          </div>
        ) : (
          <>
            {/* ========================================== */}
            {/* ORNATE TOGGLE SWITCH CATEGORY FILTERS     */}
            {/* ========================================== */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-center gap-3 px-4">
                {/* "All" filter toggle */}
                <div className="relative group/toggle">
                  <button
                    onClick={() => setActiveCategoryFilter(null)}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 ${
                      activeCategoryFilter === null
                        ? 'bg-gradient-to-b from-amber-600 to-amber-800 border-yellow-500/60 shadow-lg shadow-amber-500/30'
                        : 'bg-gradient-to-b from-stone-700 to-stone-800 border-amber-700/40 hover:border-amber-500/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      activeCategoryFilter === null
                        ? 'bg-yellow-400 border-yellow-300 shadow-inner'
                        : 'bg-stone-600 border-stone-500'
                    }`}>
                      {activeCategoryFilter === null && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                      )}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      activeCategoryFilter === null ? 'text-amber-100' : 'text-amber-300/70'
                    }`}>All</span>
                    <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-300/50" />
                    <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-300/50" />
                  </button>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-900/95 text-amber-100 text-[9px] font-bold rounded whitespace-nowrap opacity-0 group-hover/toggle:opacity-100 transition-opacity shadow-lg z-50">
                    View All Scrolls
                  </div>
                </div>

                {BOOK_CATEGORIES.map((category) => {
                  const isActive = activeCategoryFilter === category.slug
                  const CategoryIcon = category.icon
                  const categoryCount = articlesByCategory[category.slug]?.length || 0

                  return (
                    <div key={category.id} className="relative group/toggle">
                      <button
                        onClick={() => setActiveCategoryFilter(isActive ? null : category.slug)}
                        className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-b ${category.color} border-white/30 shadow-lg`
                            : 'bg-gradient-to-b from-stone-700 to-stone-800 border-amber-700/40 hover:border-amber-500/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-white/20 border-white/40 shadow-inner'
                            : 'bg-stone-600 border-stone-500'
                        }`}>
                          <CategoryIcon className={`w-2.5 h-2.5 ${isActive ? 'text-white' : 'text-amber-400/60'}`} />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider hidden sm:inline ${
                          isActive ? 'text-white' : 'text-amber-300/70'
                        }`}>{category.name}</span>
                        {categoryCount > 0 && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-amber-800/50 text-amber-300/70'
                          }`}>{categoryCount}</span>
                        )}
                        <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-300/50" />
                        <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-300/50" />
                      </button>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-900/95 text-amber-100 text-[9px] font-bold rounded whitespace-nowrap opacity-0 group-hover/toggle:opacity-100 transition-opacity shadow-lg z-50">
                        {category.name} ({categoryCount})
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ========================================== */}
            {/* GRAND BOOKSHELF STRUCTURE                 */}
            {/* Full-width wooden shelving with scrolls    */}
            {/* ========================================== */}
            <div className="relative bg-gradient-to-b from-amber-950/90 via-stone-900/95 to-amber-950/90 rounded-xl border-4 border-amber-700/50 shadow-2xl overflow-hidden"
              style={{ boxShadow: '0 0 60px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.3)' }}
            >
              {/* Ornate carved top trim */}
              <div className="h-8 bg-gradient-to-b from-amber-800 to-amber-900 border-b-4 border-amber-600/50 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
                  <pattern id="shelfCarving" x="0" y="0" width="60" height="32" patternUnits="userSpaceOnUse">
                    <path d="M0 16 Q15 8 30 16 Q45 24 60 16" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
                    <circle cx="30" cy="16" r="4" fill="none" stroke="#f59e0b" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#shelfCarving)"/>
                </svg>
                {/* Corner finials */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border-2 border-yellow-300/50" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg border-2 border-yellow-300/50" />
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg border-2 border-yellow-200/50 flex items-center justify-center">
                  <ScrollText className="w-3 h-3 text-amber-800" />
                </div>
              </div>

              {/* Torch sconces on sides */}
              <div className="absolute top-16 left-4 w-8 z-30">
                <div className="w-3 h-12 bg-gradient-to-b from-amber-700 to-amber-900 mx-auto rounded-b-sm" />
                <div className={`w-8 h-10 bg-gradient-to-t ${isNightTime ? 'from-orange-400/80 via-amber-300/60' : 'from-orange-500/50 via-amber-400/30'} to-transparent rounded-full blur-sm animate-pulse absolute -top-6 left-0`} />
              </div>
              <div className="absolute top-16 right-4 w-8 z-30">
                <div className="w-3 h-12 bg-gradient-to-b from-amber-700 to-amber-900 mx-auto rounded-b-sm" />
                <div className={`w-8 h-10 bg-gradient-to-t ${isNightTime ? 'from-orange-400/80 via-amber-300/60' : 'from-orange-500/50 via-amber-400/30'} to-transparent rounded-full blur-sm animate-pulse absolute -top-6 left-0`} style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Bookshelf content area - matching side bookshelf style */}
              <div className="py-6 space-y-2">

                {/* ========================================== */}
                {/* PERSONAL COLLECTION SHELF                  */}
                {/* Mini scrolls matching side bookshelf style */}
                {/* ========================================== */}
                {savedArticles.length > 0 && (
                  <div className="relative px-4">
                    {/* Shelf label with dropdown filter - carved wood style */}
                    <div className="flex items-center gap-2 mb-2 relative">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg border border-yellow-300/50">
                        <Bookmark className="w-3 h-3 text-amber-900" />
                      </div>

                      {/* Clickable label with dropdown */}
                      <button
                        onClick={() => setOpenShelfDropdown(openShelfDropdown === 'personal' ? null : 'personal')}
                        className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-amber-800/60 to-amber-900/60 border border-amber-600/40 rounded hover:border-amber-500/60 transition-colors group"
                      >
                        <span className="text-xs font-bold text-amber-100 uppercase tracking-[0.1em]" style={{ fontFamily: 'Georgia, serif' }}>
                          Your Collection
                        </span>
                        <span className="text-[10px] text-amber-300/60">({savedArticles.length})</span>
                        <ChevronDown className={`w-3 h-3 text-amber-300/60 transition-transform ${openShelfDropdown === 'personal' ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown menu - brass/wood themed */}
                      {openShelfDropdown === 'personal' && (
                        <div className="absolute top-full left-8 mt-1 z-50 min-w-32 bg-gradient-to-b from-amber-900 to-amber-950 border-2 border-amber-600/50 rounded-lg shadow-xl overflow-hidden">
                          {/* Dropdown header */}
                          <div className="px-3 py-1.5 bg-amber-800/50 border-b border-amber-600/30">
                            <span className="text-[9px] text-amber-300/60 uppercase tracking-wider font-bold">Sort By</span>
                          </div>
                          {/* Options */}
                          {[
                            { value: 'newest', label: 'Newest First', icon: Clock },
                            { value: 'oldest', label: 'Oldest First', icon: Clock },
                            { value: 'az', label: 'A → Z', icon: ArrowUpDown },
                            { value: 'za', label: 'Z → A', icon: ArrowUpDown },
                          ].map((opt) => {
                            const OptIcon = opt.icon
                            const isActive = shelfSortOptions.personal === opt.value
                            return (
                              <button
                                key={opt.value}
                                onClick={() => {
                                  setShelfSortOptions(prev => ({ ...prev, personal: opt.value }))
                                  setOpenShelfDropdown(null)
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${
                                  isActive
                                    ? 'bg-amber-700/50 text-amber-100'
                                    : 'text-amber-200/80 hover:bg-amber-800/40'
                                }`}
                              >
                                <OptIcon className="w-3 h-3" />
                                <span className="text-[10px] font-medium">{opt.label}</span>
                                {isActive && (
                                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Mini scrolls on shelf */}
                    <div className="flex items-end gap-1 overflow-x-auto pb-1 min-h-[60px] scrollbar-thin scrollbar-thumb-amber-600/50 scrollbar-track-amber-900/20">
                      {articles
                        .filter(a => savedArticles.includes(a.id))
                        .map((article, idx) => {
                          const categorySlug = article.category?.slug || 'default'
                          const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability
                          const articleProg = readingProgress[article.id]
                          const progPercent = articleProg?.scrollProgress || 0
                          const isRead = articleProg?.completed || false
                          const rotation = ((idx * 17) % 7) - 3

                          return (
                            <div
                              key={article.id}
                              className="flex-shrink-0 group/scroll cursor-pointer relative"
                              onMouseEnter={() => handleScrollHover(article)}
                              onMouseLeave={handleScrollLeave}
                              onClick={() => setPreviewArticle(article)}
                            >
                              <div className={`relative w-5 h-14 transition-all duration-300 group-hover/scroll:scale-110 group-hover/scroll:-translate-y-2`}
                                style={{ transform: `rotate(${rotation}deg)` }}
                              >
                                {/* Parchment body */}
                                <div className={`absolute inset-x-0.5 top-2 bottom-2 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-inner overflow-hidden`}>
                                  {progPercent > 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-300/40 to-emerald-200/20" style={{ height: `${progPercent}%` }} />
                                  )}
                                </div>
                                {/* Top rod */}
                                <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-t-sm shadow">
                                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                                </div>
                                {/* Bottom rod */}
                                <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-amber-600 via-amber-700 to-amber-800 rounded-b-sm shadow">
                                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                                </div>
                                {/* Wax seal */}
                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5">
                                  <div className={`w-full h-full bg-gradient-to-br ${isRead ? 'from-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-md border border-white/20 flex items-center justify-center`}>
                                    {isRead && <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                  </div>
                                </div>
                              </div>
                              {/* Hover tooltip */}
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-900/95 text-amber-100 text-[8px] font-bold rounded whitespace-nowrap opacity-0 group-hover/scroll:opacity-100 transition-opacity z-50 shadow-lg max-w-16 truncate pointer-events-none">
                                {article.title}
                              </div>
                            </div>
                          )
                        })}
                    </div>

                    {/* Shelf surface */}
                    <div className="h-4 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                    </div>
                  </div>
                )}

                {/* ========================================== */}
                {/* RECOMMENDED SHELF                          */}
                {/* Mini scrolls matching side bookshelf style */}
                {/* ========================================== */}
                {session && getRecommendedArticles().length > 0 && (
                  <div className="relative px-4 mt-4">
                    {/* Shelf label with dropdown filter - violet themed */}
                    <div className="flex items-center gap-2 mb-2 relative">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg border border-violet-300/50">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>

                      {/* Clickable label with dropdown */}
                      <button
                        onClick={() => setOpenShelfDropdown(openShelfDropdown === 'recommended' ? null : 'recommended')}
                        className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-violet-800/60 to-purple-900/60 border border-violet-500/40 rounded hover:border-violet-400/60 transition-colors group"
                      >
                        <span className="text-xs font-bold text-violet-100 uppercase tracking-[0.1em]" style={{ fontFamily: 'Georgia, serif' }}>
                          Recommended
                        </span>
                        <span className="text-[10px] text-violet-300/60">({getRecommendedArticles().length})</span>
                        <ChevronDown className={`w-3 h-3 text-violet-300/60 transition-transform ${openShelfDropdown === 'recommended' ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown menu - violet/wood themed */}
                      {openShelfDropdown === 'recommended' && (
                        <div className="absolute top-full left-8 mt-1 z-50 min-w-32 bg-gradient-to-b from-violet-900 to-purple-950 border-2 border-violet-500/50 rounded-lg shadow-xl overflow-hidden">
                          <div className="px-3 py-1.5 bg-violet-800/50 border-b border-violet-500/30">
                            <span className="text-[9px] text-violet-300/60 uppercase tracking-wider font-bold">Sort By</span>
                          </div>
                          {[
                            { value: 'newest', label: 'Newest First', icon: Clock },
                            { value: 'oldest', label: 'Oldest First', icon: Clock },
                            { value: 'az', label: 'A → Z', icon: ArrowUpDown },
                          ].map((opt) => {
                            const OptIcon = opt.icon
                            const isActive = shelfSortOptions.recommended === opt.value
                            return (
                              <button
                                key={opt.value}
                                onClick={() => {
                                  setShelfSortOptions(prev => ({ ...prev, recommended: opt.value }))
                                  setOpenShelfDropdown(null)
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${
                                  isActive
                                    ? 'bg-violet-700/50 text-violet-100'
                                    : 'text-violet-200/80 hover:bg-violet-800/40'
                                }`}
                              >
                                <OptIcon className="w-3 h-3" />
                                <span className="text-[10px] font-medium">{opt.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Mini scrolls on shelf */}
                    <div className="flex items-end gap-1 overflow-x-auto pb-1 min-h-[60px] scrollbar-thin scrollbar-thumb-violet-600/50 scrollbar-track-violet-900/20">
                      {getRecommendedArticles().map((article, idx) => {
                        const categorySlug = article.category?.slug || 'default'
                        const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability
                        const rotation = ((idx * 17 + 5) % 7) - 3

                        return (
                          <div
                            key={article.id}
                            className="flex-shrink-0 group/scroll cursor-pointer relative"
                            onMouseEnter={() => handleScrollHover(article)}
                            onMouseLeave={handleScrollLeave}
                            onClick={() => setPreviewArticle(article)}
                          >
                            <div className={`relative w-5 h-14 transition-all duration-300 group-hover/scroll:scale-110 group-hover/scroll:-translate-y-2`}
                              style={{ transform: `rotate(${rotation}deg)` }}
                            >
                              {/* Parchment body */}
                              <div className={`absolute inset-x-0.5 top-2 bottom-2 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-inner`} />
                              {/* Top rod - violet themed */}
                              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b from-violet-600 via-violet-700 to-purple-800 rounded-t-sm shadow">
                                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-violet-300/50 rounded-full" />
                              </div>
                              {/* Bottom rod */}
                              <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-violet-600 via-violet-700 to-purple-800 rounded-b-sm shadow">
                                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-violet-300/50 rounded-full" />
                              </div>
                              {/* Wax seal */}
                              <div className={`absolute -right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-gradient-to-br ${categoryTheme.seal} rounded-full shadow-md border border-white/20`} />
                              {/* Sparkle badge */}
                              <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center shadow border border-white/30">
                                <Sparkles className="w-1.5 h-1.5 text-white" />
                              </div>
                            </div>
                            {/* Hover tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-violet-900/95 text-violet-100 text-[8px] font-bold rounded whitespace-nowrap opacity-0 group-hover/scroll:opacity-100 transition-opacity z-50 shadow-lg max-w-16 truncate pointer-events-none">
                              {article.title}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Shelf surface - violet themed */}
                    <div className="h-4 bg-gradient-to-b from-violet-700 via-purple-800 to-violet-950 border-t-2 border-violet-400/40 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                    </div>
                  </div>
                )}

                {/* ========================================== */}
                {/* CATEGORY SHELVES                           */}
                {/* Mini scrolls matching side bookshelf style */}
                {/* ========================================== */}
                <div className="space-y-4 mt-4">
                  {BOOK_CATEGORIES.map((category, catIdx) => {
                    const categoryArticles = articles.filter(a => a.category?.slug === category.slug)
                    if (categoryArticles.length === 0) return null
                    const CategoryIcon = category.icon
                    const categoryTheme = CATEGORY_SCROLL_THEMES[category.slug] || CATEGORY_SCROLL_THEMES.sustainability

                    return (
                      <div key={category.id} className="relative px-4">
                        {/* Shelf label with dropdown filter */}
                        <div className="flex items-center gap-2 mb-2 relative">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg border border-white/30`}>
                            <CategoryIcon className="w-3 h-3 text-white" />
                          </div>

                          {/* Clickable label with dropdown */}
                          <button
                            onClick={() => setOpenShelfDropdown(openShelfDropdown === category.slug ? null : category.slug)}
                            className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-amber-800/60 to-amber-900/60 border border-amber-600/40 rounded hover:border-amber-500/60 transition-colors"
                          >
                            <span className="text-xs font-bold text-amber-100 uppercase tracking-[0.1em]" style={{ fontFamily: 'Georgia, serif' }}>
                              {category.name}
                            </span>
                            <span className="text-[10px] text-amber-300/60">({categoryArticles.length})</span>
                            <ChevronDown className={`w-3 h-3 text-amber-300/60 transition-transform ${openShelfDropdown === category.slug ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Dropdown menu */}
                          {openShelfDropdown === category.slug && (
                            <div className="absolute top-full left-8 mt-1 z-50 min-w-32 bg-gradient-to-b from-amber-900 to-amber-950 border-2 border-amber-600/50 rounded-lg shadow-xl overflow-hidden">
                              <div className="px-3 py-1.5 bg-amber-800/50 border-b border-amber-600/30">
                                <span className="text-[9px] text-amber-300/60 uppercase tracking-wider font-bold">Sort By</span>
                              </div>
                              {[
                                { value: 'newest', label: 'Newest', icon: Clock },
                                { value: 'oldest', label: 'Oldest', icon: Clock },
                                { value: 'az', label: 'A → Z', icon: ArrowUpDown },
                              ].map((opt) => {
                                const OptIcon = opt.icon
                                const currentSort = shelfSortOptions[category.slug] || 'newest'
                                const isActive = currentSort === opt.value
                                return (
                                  <button
                                    key={opt.value}
                                    onClick={() => {
                                      setShelfSortOptions(prev => ({ ...prev, [category.slug]: opt.value }))
                                      setOpenShelfDropdown(null)
                                    }}
                                    className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${
                                      isActive ? 'bg-amber-700/50 text-amber-100' : 'text-amber-200/80 hover:bg-amber-800/40'
                                    }`}
                                  >
                                    <OptIcon className="w-3 h-3" />
                                    <span className="text-[10px] font-medium">{opt.label}</span>
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>

                        {/* Mini scrolls on shelf */}
                        <div className="flex items-end gap-1 overflow-x-auto pb-1 min-h-[60px] scrollbar-thin scrollbar-thumb-amber-600/50 scrollbar-track-amber-900/20">
                          {categoryArticles.map((article, idx) => {
                            const articleProg = readingProgress[article.id]
                            const progPercent = articleProg?.scrollProgress || 0
                            const isRead = articleProg?.completed || false
                            const isSaved = savedArticles.includes(article.id)
                            const scrollAge = getScrollAge(article.publishedAt)
                            const rotation = ((idx * 17 + catIdx * 5) % 7) - 3

                            return (
                              <div
                                key={article.id}
                                className="flex-shrink-0 group/scroll cursor-pointer relative"
                                onMouseEnter={() => handleScrollHover(article)}
                                onMouseLeave={handleScrollLeave}
                                onClick={() => setPreviewArticle(article)}
                              >
                                <div className={`relative w-5 h-14 transition-all duration-300 group-hover/scroll:scale-110 group-hover/scroll:-translate-y-2 ${scrollAge === 'ancient' ? 'opacity-80' : scrollAge === 'aged' ? 'opacity-90' : ''}`}
                                  style={{ transform: `rotate(${rotation}deg)` }}
                                >
                                  {/* Parchment body */}
                                  <div className={`absolute inset-x-0.5 top-2 bottom-2 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-inner overflow-hidden`}>
                                    {progPercent > 0 && (
                                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-300/40 to-emerald-200/20" style={{ height: `${progPercent}%` }} />
                                    )}
                                  </div>
                                  {/* Top rod */}
                                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-t-sm shadow">
                                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                                  </div>
                                  {/* Bottom rod */}
                                  <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-amber-600 via-amber-700 to-amber-800 rounded-b-sm shadow">
                                    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
                                  </div>
                                  {/* Wax seal */}
                                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5">
                                    <div className={`w-full h-full bg-gradient-to-br ${isRead ? 'from-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-md border border-white/20 flex items-center justify-center`}>
                                      {isRead && <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                    </div>
                                  </div>
                                  {/* New badge */}
                                  {scrollAge === 'new' && (
                                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow border border-white/30">
                                      <Sparkles className="w-1.5 h-1.5 text-white" />
                                    </div>
                                  )}
                                  {/* Save indicator */}
                                  {isSaved && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow">
                                      <Bookmark className="w-1.5 h-1.5 text-amber-900 fill-current" />
                                    </div>
                                  )}
                                </div>
                                {/* Hover tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-900/95 text-amber-100 text-[8px] font-bold rounded whitespace-nowrap opacity-0 group-hover/scroll:opacity-100 transition-opacity z-50 shadow-lg max-w-16 truncate pointer-events-none">
                                  {article.title}
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Shelf surface */}
                        <div className="h-4 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg relative overflow-hidden">
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                          }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom bookshelf trim */}
              <div className="h-6 bg-gradient-to-t from-amber-800 to-amber-900 rounded-b-lg mt-4 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
                  <pattern id="shelfBottomCarving" x="0" y="0" width="60" height="24" patternUnits="userSpaceOnUse">
                    <path d="M0 12 Q15 6 30 12 Q45 18 60 12" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#shelfBottomCarving)"/>
                </svg>
              </div>
            </div>
            {/* End Grand Bookshelf Structure */}

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
