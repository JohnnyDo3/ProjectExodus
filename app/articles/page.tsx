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

  // Horizontal bookshelf category filters (per-shelf filtering)
  const [shelf1Category, setShelf1Category] = useState<string | null>(null)
  const [shelf2Category, setShelf2Category] = useState<string | null>(null)
  const [shelf3Category, setShelf3Category] = useState<string | null>(null)

  // Scroll highlight state - glows scrolls when user clicks stat display
  const [highlightScrolls, setHighlightScrolls] = useState(false)

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

  // Get unique categories that have published articles
  const availableCategories = useMemo(() => {
    const cats = new Set<string>()
    articles.forEach(article => {
      if (article.category?.slug) cats.add(article.category.slug)
    })
    return Array.from(cats)
  }, [articles])

  // Filter articles for each horizontal shelf based on category selection
  const getShelfArticles = useCallback((shelfIndex: number, categoryFilter: string | null) => {
    const filteredArticles = categoryFilter
      ? articles.filter(a => a.category?.slug === categoryFilter)
      : articles

    // Each shelf shows 12 articles, offset by shelf index
    const start = shelfIndex * 12
    return filteredArticles.slice(start, start + 12)
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

  // Auto-dismiss scroll highlight after 3 seconds
  useEffect(() => {
    if (highlightScrolls) {
      const timer = setTimeout(() => {
        setHighlightScrolls(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [highlightScrolls])

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

            {/* Stone pillars - wood-carved tan look */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-[10%] w-[3px] h-full bg-gradient-to-b from-amber-700/80 via-amber-600/60 to-amber-700/80" />
              <div className="absolute top-0 left-[20%] w-[2px] h-full bg-gradient-to-b from-amber-700/60 via-amber-600/40 to-amber-700/60" />
              <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-amber-700/40 via-amber-600/20 to-amber-700/40" />
              <div className="absolute top-0 right-[10%] w-[3px] h-full bg-gradient-to-b from-amber-700/80 via-amber-600/60 to-amber-700/80" />
              <div className="absolute top-0 right-[20%] w-[2px] h-full bg-gradient-to-b from-amber-700/60 via-amber-600/40 to-amber-700/60" />
              <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-amber-700/40 via-amber-600/20 to-amber-700/40" />
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

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
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

                {/* Stats preview - clickable to highlight scrolls */}
                <div
                  className={`flex items-center justify-center gap-4 mt-4 cursor-pointer group transition-all duration-300 ${highlightScrolls ? 'scale-105' : 'hover:scale-102'}`}
                  onClick={() => setHighlightScrolls(prev => !prev)}
                  title="Click to highlight article scrolls on the shelves"
                >
                  <div className={`relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border rounded-sm transition-all duration-300 ${highlightScrolls ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'border-amber-600/40 group-hover:border-amber-500/60'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
                    <span className="text-xs font-bold text-amber-200 relative">{totalArticles || '???'} Articles</span>
                  </div>
                  <div className={`relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border rounded-sm transition-all duration-300 ${highlightScrolls ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'border-amber-600/40 group-hover:border-amber-500/60'}`}>
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
                The Archives
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

      {/* Hero Header - U-Shaped Bookshelf Frame */}
      <div className="relative bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pb-8">
        {/* Ancient Chamber Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stone texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

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

          {/* Original parallel vertical lines as stone pillars/columns - wood-carved tan look */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Left side pillars */}
            <div className="absolute top-0 left-[10%] w-[3px] h-full bg-gradient-to-b from-amber-700/80 via-amber-600/60 to-amber-700/80" />
            <div className="absolute top-0 left-[20%] w-[2px] h-full bg-gradient-to-b from-amber-700/60 via-amber-600/40 to-amber-700/60" />
            <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-amber-700/40 via-amber-600/20 to-amber-700/40" />
            {/* Right side pillars */}
            <div className="absolute top-0 right-[10%] w-[3px] h-full bg-gradient-to-b from-amber-700/80 via-amber-600/60 to-amber-700/80" />
            <div className="absolute top-0 right-[20%] w-[2px] h-full bg-gradient-to-b from-amber-700/60 via-amber-600/40 to-amber-700/60" />
            <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-amber-700/40 via-amber-600/20 to-amber-700/40" />
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
              {/* Refined wood panel background with enhanced carving details */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Outer panel frame with chamfered edges */}
                <div className="absolute inset-6 border-2 border-amber-700/40 rounded-sm" style={{
                  boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.25), inset -2px -2px 4px rgba(251,191,36,0.15), 0 0 8px rgba(0,0,0,0.2)'
                }}>
                  {/* Inner bevel with refined edges */}
                  <div className="absolute inset-2 border border-amber-800/50 rounded-sm" style={{
                    boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.15)'
                  }} />
                  {/* Secondary inner frame */}
                  <div className="absolute inset-4 border border-amber-700/25 rounded-sm" />

                  {/* Vertical carved accent lines */}
                  <div className="absolute left-1/3 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-amber-600/25 to-transparent" />
                  <div className="absolute left-2/3 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-amber-600/25 to-transparent" />

                  {/* Horizontal carved accent lines */}
                  <div className="absolute top-1/4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
                  <div className="absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                  <div className="absolute top-3/4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
                </div>

                {/* ====== AMBIENT CANDLELIGHT AWARENESS ====== */}
                {/* Warm light pools cast from sconces at 20%, 40%, 60%, 80% */}
                {[20, 40, 60, 80].map((topPercent, i) => (
                  <div key={`left-ambient-light-${i}`} className="absolute right-0 pointer-events-none" style={{ top: `${topPercent}%`, transform: 'translateY(-50%)' }}>
                    {/* Primary warm glow pool - spreads across shelf area */}
                    <div
                      className={`absolute right-0 w-48 h-32 ${isNightTime ? 'opacity-45' : 'opacity-20'}`}
                      style={{
                        background: 'radial-gradient(ellipse 100% 80% at 100% 50%, rgba(251,191,36,0.35) 0%, rgba(245,158,11,0.2) 30%, rgba(217,119,6,0.1) 50%, transparent 70%)',
                        filter: 'blur(8px)',
                        transform: 'translateX(10%)',
                      }}
                    />
                    {/* Secondary softer ambient fill */}
                    <div
                      className={`absolute right-0 w-64 h-48 ${isNightTime ? 'opacity-30' : 'opacity-12'}`}
                      style={{
                        background: 'radial-gradient(ellipse 120% 100% at 100% 50%, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.1) 40%, transparent 65%)',
                        filter: 'blur(16px)',
                        transform: 'translateX(15%)',
                      }}
                    />
                    {/* Flickering highlight - subtle animation */}
                    <div
                      className={`absolute right-0 w-24 h-20 animate-pulse ${isNightTime ? 'opacity-50' : 'opacity-25'}`}
                      style={{
                        background: 'radial-gradient(ellipse 80% 70% at 100% 50%, rgba(253,224,71,0.4) 0%, rgba(251,191,36,0.2) 40%, transparent 70%)',
                        filter: 'blur(4px)',
                        animationDuration: `${1.2 + i * 0.15}s`,
                      }}
                    />
                    {/* Hot spot near flame source */}
                    <div
                      className={`absolute right-0 w-12 h-12 ${isNightTime ? 'opacity-60' : 'opacity-30'}`}
                      style={{
                        background: 'radial-gradient(circle at 100% 50%, rgba(253,224,71,0.5) 0%, rgba(251,191,36,0.3) 30%, transparent 60%)',
                        filter: 'blur(2px)',
                      }}
                    />
                    {/* Floating dust motes in candlelight - only visible at night */}
                    {isNightTime && (
                      <>
                        {[0, 1, 2, 3, 4].map((moteIndex) => (
                          <div
                            key={`left-dust-${i}-${moteIndex}`}
                            className="absolute dust-mote pointer-events-none"
                            style={{
                              right: `${10 + moteIndex * 15}px`,
                              top: `${30 + (moteIndex * 17) % 40}%`,
                              width: `${2 + (moteIndex % 3)}px`,
                              height: `${2 + (moteIndex % 3)}px`,
                              background: 'radial-gradient(circle, rgba(253,224,71,0.8), rgba(251,191,36,0.4))',
                              borderRadius: '50%',
                              '--dust-dx': `${5 + moteIndex * 3}px`,
                              '--dust-dy': `${-15 - moteIndex * 5}px`,
                              '--dust-duration': `${6 + moteIndex * 1.5 + i}s`,
                              '--dust-delay': `${moteIndex * 1.2 + i * 0.5}s`,
                            } as React.CSSProperties}
                          />
                        ))}
                      </>
                    )}
                  </div>
                ))}

                {/* Warm ambient wash over entire bookshelf - environmental awareness */}
                <div
                  className={`absolute inset-0 pointer-events-none ${isNightTime ? 'opacity-35' : 'opacity-15'}`}
                  style={{
                    background: 'linear-gradient(to left, rgba(251,191,36,0.15) 0%, rgba(245,158,11,0.08) 40%, transparent 70%)',
                  }}
                />
              </div>

              {/* ====== OUTER ORNATE PILASTER BORDER (Left Edge) - Enhanced ====== */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 z-10 border-r-2 border-amber-600/60 shadow-xl">
                {/* Enhanced Corinthian capital with detailed acanthus leaves */}
                <div className={`absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-500/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 56" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`}>
                    {/* Volutes (spiral scrolls) at top */}
                    <ellipse cx="6" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M6 9 Q6 12 10 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <ellipse cx="26" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M26 9 Q26 12 22 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Abacus plate */}
                    <rect x="2" y="1" width="28" height="3" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5"/>
                    {/* Acanthus leaves - main */}
                    <path d="M16 52 Q6 40 6 28 Q11 34 16 28 Q21 34 26 28 Q26 40 16 52" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M16 16 Q10 26 10 38 M16 16 Q22 26 22 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    {/* Caulicoli (leaf stems) */}
                    <path d="M8 22 Q12 28 12 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M24 22 Q20 28 20 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Central rosette */}
                    <circle cx="16" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <circle cx="16" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                    {/* Leaf tip details */}
                    <path d="M10 44 Q13 40 16 44 Q19 40 22 44" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                  </svg>
                  {/* Light-aware highlight on capital */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent ${isNightTime ? 'opacity-40' : 'opacity-20'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 overflow-hidden bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`left-outer-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-amber-500/30 to-transparent ${isNightTime ? 'opacity-60' : 'opacity-30'}`} />
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-amber-700/30 to-transparent" />
                </div>
                {/* Enhanced Attic base with torus and scotia moldings */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-700 via-amber-750 to-amber-800 border-t-2 border-amber-500/40">
                  {/* Upper torus */}
                  <div className="absolute top-1.5 left-0.5 right-0.5 h-2 bg-gradient-to-b from-amber-600/60 via-amber-500/40 to-amber-700/50 rounded-full" />
                  {/* Scotia (concave) */}
                  <div className="absolute top-4 left-1 right-1 h-2 bg-gradient-to-b from-amber-800/60 to-amber-700/40" style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.2)' }} />
                  {/* Lower torus */}
                  <div className="absolute top-7 left-0 right-0 h-2 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 rounded-full" />
                  {/* Plinth */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-amber-800 to-amber-750 border-t border-amber-600/30" />
                </div>
              </div>

              {/* ====== INNER ORNATE BORDER (Right Edge - facing content) with INTEGRATED SCONCES - Enhanced ====== */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-800 via-amber-700 to-amber-800 z-10 border-l-2 border-amber-500/50 shadow-xl overflow-visible">
                {/* Enhanced Corinthian capital with detailed acanthus leaves */}
                <div className={`absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-500/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 56" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`}>
                    {/* Volutes (spiral scrolls) at top */}
                    <ellipse cx="6" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M6 9 Q6 12 10 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <ellipse cx="26" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M26 9 Q26 12 22 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Abacus plate */}
                    <rect x="2" y="1" width="28" height="3" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5"/>
                    {/* Acanthus leaves - main */}
                    <path d="M16 52 Q6 40 6 28 Q11 34 16 28 Q21 34 26 28 Q26 40 16 52" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M16 16 Q10 26 10 38 M16 16 Q22 26 22 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    {/* Caulicoli (leaf stems) */}
                    <path d="M8 22 Q12 28 12 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M24 22 Q20 28 20 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Central rosette */}
                    <circle cx="16" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <circle cx="16" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                    {/* Leaf tip details */}
                    <path d="M10 44 Q13 40 16 44 Q19 40 22 44" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                  </svg>
                  {/* Light-aware highlight on capital */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent ${isNightTime ? 'opacity-40' : 'opacity-20'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750 overflow-hidden">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`left-inner-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-amber-500/30 to-transparent ${isNightTime ? 'opacity-60' : 'opacity-30'}`} />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-amber-700/30 to-transparent" />
                </div>

                {/* Integrated sconces - built into pilaster border */}
                {[20, 40, 60, 80].map((topPercent, i) => (
                  <div key={`left-sconce-${i}`} className="absolute left-0 z-30 overflow-visible" style={{ top: `${topPercent}%`, transform: 'translateY(-50%) translateX(-100%)' }}>
                    <div className="relative w-12 h-16">
                      {/* Brass bracket emerging from pilaster */}
                      <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-l from-yellow-600 via-amber-600 to-amber-700 rounded-l-sm shadow-lg border-l border-y border-yellow-500/60 ${isNightTime ? 'brightness-110' : ''}`}>
                        {/* Decorative rosette - night-time aware */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3">
                          <svg viewBox="0 0 12 12" className={`w-full h-full ${isNightTime ? 'text-yellow-300/80' : 'text-yellow-400/70'}`}>
                            <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                            <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.5"/>
                          </svg>
                        </div>
                      </div>

                      {/* Curved arm extending from bracket - night-time aware */}
                      <div className={`absolute right-3 top-1/2 w-4 h-2 bg-gradient-to-b from-yellow-500 via-amber-600 to-amber-700 rounded-full shadow-md ${isNightTime ? 'brightness-110' : ''}`} style={{ transform: 'translateY(-50%)' }} />

                      {/* Candle holder cup (bobeche) with candle sitting inside */}
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 w-4 flex flex-col items-center">
                        {/* Candle - positioned to sit in the bobeche, varying heights for realism */}
                        <div className="relative w-2.5 -mb-1.5 z-10">
                          {/* Candle body - height varies by position (4.5-5.5 range) */}
                          <div
                            className="w-2.5 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 rounded-t-sm shadow-md"
                            style={{ height: `${1.25 + (i % 3) * 0.125}rem` }}
                          />
                          {/* Wax drip details */}
                          <svg className="absolute top-1 -right-0.5 w-1.5 h-3 text-amber-100/80" viewBox="0 0 6 12">
                            <path d="M3 0 Q4 3 3 6 Q2 8 3 10 Q3.5 11 3 12" fill="currentColor" />
                          </svg>
                          {i % 2 === 0 && (
                            <svg className="absolute top-2 -left-0.5 w-1 h-2 text-amber-100/70" viewBox="0 0 4 8">
                              <path d="M2 0 Q3 2 2 4 Q1.5 6 2 8" fill="currentColor" />
                            </svg>
                          )}
                          {/* Wax pool in bobeche */}
                          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-amber-100/50 rounded-full blur-[0.5px]" />
                          {/* Wick */}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 to-gray-500" />
                          {/* Flame - sits on wick */}
                          <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-60'}`}>
                            <div className="absolute -inset-2 bg-gradient-radial from-orange-400/30 via-orange-300/15 to-transparent rounded-full blur-md" />
                            <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-200 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: `${i * 0.3}s`, animationDuration: '0.7s' }} />
                            {/* Smoke wisps - subtle, more visible during day when flames are dimmer */}
                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 pointer-events-none ${isNightTime ? 'opacity-15' : 'opacity-30'}`}>
                              <div
                                className="absolute w-1.5 h-3 rounded-full"
                                style={{
                                  background: 'linear-gradient(to top, rgba(180,180,180,0.3), rgba(200,200,200,0.1), transparent)',
                                  animation: `smoke-rise ${2.5 + i * 0.3}s ease-out infinite`,
                                  animationDelay: `${i * 0.4}s`,
                                }}
                              />
                              <div
                                className="absolute left-0.5 w-1 h-2.5 rounded-full"
                                style={{
                                  background: 'linear-gradient(to top, rgba(180,180,180,0.2), transparent)',
                                  animation: `smoke-rise ${3 + i * 0.2}s ease-out infinite`,
                                  animationDelay: `${0.5 + i * 0.3}s`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Bobeche (cup) - candle sits into this - night-time aware */}
                        <div className={`w-4 h-2.5 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm border-t-2 border-yellow-300/60 shadow-lg ${isNightTime ? 'brightness-110' : ''}`} />
                      </div>

                      {/* Flickering shadow cast on pilaster */}
                      <div
                        className={`absolute right-0 top-1/2 w-3 h-8 candle-shadow pointer-events-none ${isNightTime ? 'opacity-25' : 'opacity-10'}`}
                        style={{
                          background: 'linear-gradient(to left, rgba(0,0,0,0.3), transparent)',
                          transform: 'translateY(-50%)',
                          '--shadow-delay': `${i * 0.2}s`,
                          '--shadow-duration': `${1.8 + i * 0.15}s`,
                        } as React.CSSProperties}
                      />

                      {/* Ambient light - positioned relative to flame */}
                      <div className={`absolute right-3 w-12 h-12 bg-gradient-radial from-orange-400/40 via-amber-500/20 to-transparent rounded-full blur-xl ${isNightTime ? 'opacity-100' : 'opacity-40'}`} style={{ top: '15%' }} />
                    </div>
                  </div>
                ))}

                {/* Attic base */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-amber-700 via-amber-750 to-amber-800 border-t-2 border-amber-500/40">
                  <div className="absolute top-2 left-1 right-1 h-1 bg-gradient-to-b from-amber-500/40 to-transparent rounded-full" />
                  <div className="absolute bottom-2 left-1 right-1 h-1 bg-gradient-to-t from-amber-600/30 to-transparent rounded-full" />
                </div>
              </div>

              {/* Shelves with actual article scrolls - adjusted positions for better spacing */}
              {[20, 40, 60, 80].map((top, shelfIndex) => {
                // Get articles for this shelf (2 per shelf from left side)
                const shelfArticles = articles.slice(shelfIndex * 2, shelfIndex * 2 + 2)
                const scrollColors = [
                  { wood: 'from-amber-700 to-amber-900', parchment: 'from-amber-100 to-amber-50', seal: 'from-red-600 to-red-800' },
                  { wood: 'from-emerald-700 to-emerald-900', parchment: 'from-emerald-50 to-stone-50', seal: 'from-emerald-600 to-emerald-800' },
                ]

                return (
                  <div key={`left-shelf-${shelfIndex}`} className="absolute left-8 right-8" style={{ top: `${top}%` }}>
                    {/* Shelf surface */}
                    <div className="h-4 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/20 to-transparent" />
                    </div>

                    {/* Interactive article scrolls */}
                    <div className="absolute bottom-4 left-1 right-1 flex items-end justify-center gap-1 h-16">
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
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''} ${highlightScrolls ? 'scroll-highlight-glow' : ''}`}
                            style={{ transform: `rotate(${(i % 2 - 0.5) * 3}deg)` }}
                            onMouseEnter={() => handleScrollHover(article)}
                            onMouseLeave={handleScrollLeave}
                            onClick={() => setPreviewArticle(article)}
                          >
                            {/* Highlight glow halo */}
                            {highlightScrolls && (
                              <div className="absolute -inset-1 bg-amber-400/40 rounded-lg blur-md animate-pulse" />
                            )}
                            {/* Candlelight reflection from nearby sconces (right side for left shelf) */}
                            <div className={`absolute right-0 top-1 bottom-1 w-1.5 rounded-r-sm pointer-events-none transition-opacity duration-500 ${isNightTime ? 'opacity-50' : 'opacity-20'}`}
                              style={{
                                background: 'linear-gradient(to left, rgba(251,191,36,0.4), transparent)',
                              }}
                            />
                            {/* Candlelight catch on hover */}
                            {isHovered && (
                              <div className="absolute inset-0 rounded-sm pointer-events-none scroll-candlelight-hover"
                                style={{
                                  background: 'radial-gradient(ellipse at right center, rgba(253,224,71,0.35), transparent 70%)',
                                }}
                              />
                            )}
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
                      {/* Ghost scrolls - transparent tan, filling the shelf */}
                      {Array.from({ length: Math.max(0, 6 - shelfArticles.length) }).map((_, i) => (
                        <div key={`ghost-left-${shelfIndex}-${i}`} className="w-4 h-12 relative opacity-20 hover:opacity-30 transition-opacity">
                          {/* Ghost scroll body */}
                          <div className="absolute inset-x-0.5 top-2 bottom-2 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                          {/* Top rod */}
                          <div className="absolute top-0 left-0 right-0 h-2 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                          {/* Bottom rod */}
                          <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                          {/* Subtle text lines */}
                          <div className="absolute inset-x-1 top-3 bottom-3 flex flex-col justify-center gap-0.5">
                            <div className="h-px bg-amber-600/20" />
                            <div className="h-px bg-amber-600/15 w-3/4" />
                            <div className="h-px bg-amber-600/20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

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
              {/* Refined wood panel background with enhanced carving details */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Outer panel frame with chamfered edges */}
                <div className="absolute inset-6 border-2 border-amber-700/40 rounded-sm" style={{
                  boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.25), inset -2px -2px 4px rgba(251,191,36,0.15), 0 0 8px rgba(0,0,0,0.2)'
                }}>
                  {/* Inner bevel with refined edges */}
                  <div className="absolute inset-2 border border-amber-800/50 rounded-sm" style={{
                    boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.15)'
                  }} />
                  {/* Secondary inner frame */}
                  <div className="absolute inset-4 border border-amber-700/25 rounded-sm" />

                  {/* Vertical carved accent lines */}
                  <div className="absolute left-1/3 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-amber-600/25 to-transparent" />
                  <div className="absolute left-2/3 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-amber-600/25 to-transparent" />

                  {/* Horizontal carved accent lines */}
                  <div className="absolute top-1/4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
                  <div className="absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                  <div className="absolute top-3/4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
                </div>

                {/* ====== AMBIENT CANDLELIGHT AWARENESS (Mirrored) ====== */}
                {/* Warm light pools cast from sconces at 20%, 40%, 60%, 80% */}
                {[20, 40, 60, 80].map((topPercent, i) => (
                  <div key={`right-ambient-light-${i}`} className="absolute left-0 pointer-events-none" style={{ top: `${topPercent}%`, transform: 'translateY(-50%)' }}>
                    {/* Primary warm glow pool - spreads across shelf area */}
                    <div
                      className={`absolute left-0 w-48 h-32 ${isNightTime ? 'opacity-45' : 'opacity-20'}`}
                      style={{
                        background: 'radial-gradient(ellipse 100% 80% at 0% 50%, rgba(251,191,36,0.35) 0%, rgba(245,158,11,0.2) 30%, rgba(217,119,6,0.1) 50%, transparent 70%)',
                        filter: 'blur(8px)',
                        transform: 'translateX(-10%)',
                      }}
                    />
                    {/* Secondary softer ambient fill */}
                    <div
                      className={`absolute left-0 w-64 h-48 ${isNightTime ? 'opacity-30' : 'opacity-12'}`}
                      style={{
                        background: 'radial-gradient(ellipse 120% 100% at 0% 50%, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.1) 40%, transparent 65%)',
                        filter: 'blur(16px)',
                        transform: 'translateX(-15%)',
                      }}
                    />
                    {/* Flickering highlight - subtle animation - timing aligned with left bookshelf */}
                    <div
                      className={`absolute left-0 w-24 h-20 animate-pulse ${isNightTime ? 'opacity-50' : 'opacity-25'}`}
                      style={{
                        background: 'radial-gradient(ellipse 80% 70% at 0% 50%, rgba(253,224,71,0.4) 0%, rgba(251,191,36,0.2) 40%, transparent 70%)',
                        filter: 'blur(4px)',
                        animationDuration: `${1.2 + i * 0.15}s`,
                      }}
                    />
                    {/* Hot spot near flame source */}
                    <div
                      className={`absolute left-0 w-12 h-12 ${isNightTime ? 'opacity-60' : 'opacity-30'}`}
                      style={{
                        background: 'radial-gradient(circle at 0% 50%, rgba(253,224,71,0.5) 0%, rgba(251,191,36,0.3) 30%, transparent 60%)',
                        filter: 'blur(2px)',
                      }}
                    />
                    {/* Floating dust motes in candlelight - only visible at night (mirrored) */}
                    {isNightTime && (
                      <>
                        {[0, 1, 2, 3, 4].map((moteIndex) => (
                          <div
                            key={`right-dust-${i}-${moteIndex}`}
                            className="absolute dust-mote pointer-events-none"
                            style={{
                              left: `${10 + moteIndex * 15}px`,
                              top: `${25 + (moteIndex * 19) % 45}%`,
                              width: `${2 + (moteIndex % 3)}px`,
                              height: `${2 + (moteIndex % 3)}px`,
                              background: 'radial-gradient(circle, rgba(253,224,71,0.8), rgba(251,191,36,0.4))',
                              borderRadius: '50%',
                              '--dust-dx': `${-5 - moteIndex * 3}px`,
                              '--dust-dy': `${-12 - moteIndex * 4}px`,
                              '--dust-duration': `${7 + moteIndex * 1.3 + i * 0.8}s`,
                              '--dust-delay': `${moteIndex * 1.1 + i * 0.6}s`,
                            } as React.CSSProperties}
                          />
                        ))}
                      </>
                    )}
                  </div>
                ))}

                {/* Warm ambient wash over entire bookshelf - environmental awareness */}
                <div
                  className={`absolute inset-0 pointer-events-none ${isNightTime ? 'opacity-35' : 'opacity-15'}`}
                  style={{
                    background: 'linear-gradient(to right, rgba(251,191,36,0.15) 0%, rgba(245,158,11,0.08) 40%, transparent 70%)',
                  }}
                />
              </div>

              {/* ====== OUTER ORNATE PILASTER BORDER (Right Edge) - Enhanced ====== */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-800 via-amber-700 to-amber-800 z-10 border-l-2 border-amber-600/60 shadow-xl">
                {/* Enhanced Corinthian capital with detailed acanthus leaves */}
                <div className={`absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-500/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 56" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`}>
                    {/* Volutes (spiral scrolls) at top */}
                    <ellipse cx="6" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M6 9 Q6 12 10 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <ellipse cx="26" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M26 9 Q26 12 22 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Abacus plate */}
                    <rect x="2" y="1" width="28" height="3" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5"/>
                    {/* Acanthus leaves - main */}
                    <path d="M16 52 Q6 40 6 28 Q11 34 16 28 Q21 34 26 28 Q26 40 16 52" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M16 16 Q10 26 10 38 M16 16 Q22 26 22 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    {/* Caulicoli (leaf stems) */}
                    <path d="M8 22 Q12 28 12 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M24 22 Q20 28 20 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Central rosette */}
                    <circle cx="16" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <circle cx="16" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                    {/* Leaf tip details */}
                    <path d="M10 44 Q13 40 16 44 Q19 40 22 44" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                  </svg>
                  {/* Light-aware highlight on capital */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent ${isNightTime ? 'opacity-40' : 'opacity-20'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 overflow-hidden bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`right-outer-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-amber-500/30 to-transparent ${isNightTime ? 'opacity-60' : 'opacity-30'}`} />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-amber-700/30 to-transparent" />
                </div>
                {/* Enhanced Attic base with torus and scotia moldings */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-700 via-amber-750 to-amber-800 border-t-2 border-amber-500/40">
                  {/* Upper torus */}
                  <div className="absolute top-1.5 left-0.5 right-0.5 h-2 bg-gradient-to-b from-amber-600/60 via-amber-500/40 to-amber-700/50 rounded-full" />
                  {/* Scotia (concave) */}
                  <div className="absolute top-4 left-1 right-1 h-2 bg-gradient-to-b from-amber-800/60 to-amber-700/40" style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.2)' }} />
                  {/* Lower torus */}
                  <div className="absolute top-7 left-0 right-0 h-2 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 rounded-full" />
                  {/* Plinth */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-amber-800 to-amber-750 border-t border-amber-600/30" />
                </div>
              </div>

              {/* ====== INNER ORNATE BORDER (Left Edge - facing content) with INTEGRATED SCONCES - Enhanced ====== */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 z-10 border-r-2 border-amber-500/50 shadow-xl overflow-visible">
                {/* Enhanced Corinthian capital with detailed acanthus leaves */}
                <div className={`absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-500/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 56" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`}>
                    {/* Volutes (spiral scrolls) at top */}
                    <ellipse cx="6" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M6 9 Q6 12 10 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <ellipse cx="26" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M26 9 Q26 12 22 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Abacus plate */}
                    <rect x="2" y="1" width="28" height="3" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5"/>
                    {/* Acanthus leaves - main */}
                    <path d="M16 52 Q6 40 6 28 Q11 34 16 28 Q21 34 26 28 Q26 40 16 52" fill="none" stroke="currentColor" strokeWidth="0.9"/>
                    <path d="M16 16 Q10 26 10 38 M16 16 Q22 26 22 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    {/* Caulicoli (leaf stems) */}
                    <path d="M8 22 Q12 28 12 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M24 22 Q20 28 20 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* Central rosette */}
                    <circle cx="16" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <circle cx="16" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                    {/* Leaf tip details */}
                    <path d="M10 44 Q13 40 16 44 Q19 40 22 44" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                  </svg>
                  {/* Light-aware highlight on capital */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent ${isNightTime ? 'opacity-40' : 'opacity-20'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750 overflow-hidden">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`right-inner-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600/50 via-amber-500/30 to-amber-700/40 border-y border-amber-500/30" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-amber-500/30 to-transparent ${isNightTime ? 'opacity-60' : 'opacity-30'}`} />
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-amber-700/30 to-transparent" />
                </div>

                {/* Integrated sconces - built into pilaster border (mirrored) */}
                {[20, 40, 60, 80].map((topPercent, i) => (
                  <div key={`right-sconce-${i}`} className="absolute right-0 z-30 overflow-visible" style={{ top: `${topPercent}%`, transform: 'translateY(-50%) translateX(100%)' }}>
                    <div className="relative w-12 h-16">
                      {/* Brass bracket emerging from pilaster */}
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-r from-yellow-600 via-amber-600 to-amber-700 rounded-r-sm shadow-lg border-r border-y border-yellow-500/60 ${isNightTime ? 'brightness-110' : ''}`}>
                        {/* Decorative rosette - night-time aware */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3">
                          <svg viewBox="0 0 12 12" className={`w-full h-full ${isNightTime ? 'text-yellow-300/80' : 'text-yellow-400/70'}`}>
                            <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                            <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.5"/>
                          </svg>
                        </div>
                      </div>

                      {/* Curved arm extending from bracket - night-time aware */}
                      <div className={`absolute left-3 top-1/2 w-4 h-2 bg-gradient-to-b from-yellow-500 via-amber-600 to-amber-700 rounded-full shadow-md ${isNightTime ? 'brightness-110' : ''}`} style={{ transform: 'translateY(-50%)' }} />

                      {/* Candle holder cup (bobeche) with candle sitting inside */}
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 w-4 flex flex-col items-center">
                        {/* Candle - positioned to sit in the bobeche, varying heights for realism */}
                        <div className="relative w-2.5 -mb-1.5 z-10">
                          {/* Candle body - height varies by position (slightly different pattern than left) */}
                          <div
                            className="w-2.5 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 rounded-t-sm shadow-md"
                            style={{ height: `${1.375 - (i % 3) * 0.1}rem` }}
                          />
                          {/* Wax drip details (mirrored) */}
                          <svg className="absolute top-1 -left-0.5 w-1.5 h-3 text-amber-100/80" viewBox="0 0 6 12">
                            <path d="M3 0 Q2 3 3 6 Q4 8 3 10 Q2.5 11 3 12" fill="currentColor" />
                          </svg>
                          {i % 2 === 1 && (
                            <svg className="absolute top-2 -right-0.5 w-1 h-2 text-amber-100/70" viewBox="0 0 4 8">
                              <path d="M2 0 Q1 2 2 4 Q2.5 6 2 8" fill="currentColor" />
                            </svg>
                          )}
                          {/* Wax pool in bobeche */}
                          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-amber-100/50 rounded-full blur-[0.5px]" />
                          {/* Wick */}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 to-gray-500" />
                          {/* Flame - sits on wick */}
                          <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-60'}`}>
                            <div className="absolute -inset-2 bg-gradient-radial from-orange-400/30 via-orange-300/15 to-transparent rounded-full blur-md" />
                            <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-200 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: `${i * 0.3 + 0.5}s`, animationDuration: '0.7s' }} />
                            {/* Smoke wisps - subtle, more visible during day when flames are dimmer */}
                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 pointer-events-none ${isNightTime ? 'opacity-15' : 'opacity-30'}`}>
                              <div
                                className="absolute w-1.5 h-3 rounded-full"
                                style={{
                                  background: 'linear-gradient(to top, rgba(180,180,180,0.3), rgba(200,200,200,0.1), transparent)',
                                  animation: `smoke-rise ${2.7 + i * 0.25}s ease-out infinite`,
                                  animationDelay: `${0.2 + i * 0.35}s`,
                                }}
                              />
                              <div
                                className="absolute left-0.5 w-1 h-2.5 rounded-full"
                                style={{
                                  background: 'linear-gradient(to top, rgba(180,180,180,0.2), transparent)',
                                  animation: `smoke-rise ${3.2 + i * 0.18}s ease-out infinite`,
                                  animationDelay: `${0.7 + i * 0.28}s`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Bobeche (cup) - candle sits into this - night-time aware */}
                        <div className={`w-4 h-2.5 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm border-t-2 border-yellow-300/60 shadow-lg ${isNightTime ? 'brightness-110' : ''}`} />
                      </div>

                      {/* Flickering shadow cast on pilaster (mirrored direction) */}
                      <div
                        className={`absolute left-0 top-1/2 w-3 h-8 candle-shadow pointer-events-none ${isNightTime ? 'opacity-25' : 'opacity-10'}`}
                        style={{
                          background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)',
                          transform: 'translateY(-50%)',
                          '--shadow-delay': `${i * 0.2 + 0.1}s`,
                          '--shadow-duration': `${1.9 + i * 0.12}s`,
                        } as React.CSSProperties}
                      />

                      {/* Ambient light - positioned relative to flame */}
                      <div className={`absolute left-3 w-12 h-12 bg-gradient-radial from-orange-400/40 via-amber-500/20 to-transparent rounded-full blur-xl ${isNightTime ? 'opacity-100' : 'opacity-40'}`} style={{ top: '15%' }} />
                    </div>
                  </div>
                ))}

                {/* Attic base */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-amber-700 via-amber-750 to-amber-800 border-t-2 border-amber-500/40">
                  <div className="absolute top-2 left-1 right-1 h-1 bg-gradient-to-b from-amber-500/40 to-transparent rounded-full" />
                  <div className="absolute bottom-2 left-1 right-1 h-1 bg-gradient-to-t from-amber-600/30 to-transparent rounded-full" />
                </div>
              </div>

              {/* Shelves with actual article scrolls - adjusted positions for better spacing */}
              {[20, 40, 60, 80].map((top, shelfIndex) => {
                // Get articles for this shelf (2 per shelf from right side, offset by 8)
                const shelfArticles = articles.slice(8 + shelfIndex * 2, 8 + shelfIndex * 2 + 2)
                const scrollColors = [
                  { wood: 'from-violet-700 to-violet-900', parchment: 'from-violet-50 to-rose-50', seal: 'from-violet-600 to-violet-800' },
                  { wood: 'from-teal-700 to-teal-900', parchment: 'from-teal-50 to-stone-50', seal: 'from-teal-600 to-teal-800' },
                ]

                return (
                  <div key={`right-shelf-${shelfIndex}`} className="absolute left-8 right-8" style={{ top: `${top}%` }}>
                    {/* Shelf surface */}
                    <div className="h-4 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/20 to-transparent" />
                    </div>

                    {/* Interactive article scrolls */}
                    <div className="absolute bottom-4 left-1 right-1 flex items-end justify-center gap-1 h-16">
                      {/* Ghost scrolls - transparent tan, filling the shelf */}
                      {Array.from({ length: Math.max(0, 6 - shelfArticles.length) }).map((_, i) => (
                        <div key={`ghost-right-${shelfIndex}-${i}`} className="w-4 h-12 relative opacity-20 hover:opacity-30 transition-opacity">
                          {/* Ghost scroll body */}
                          <div className="absolute inset-x-0.5 top-2 bottom-2 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                          {/* Top rod */}
                          <div className="absolute top-0 left-0 right-0 h-2 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                          {/* Bottom rod */}
                          <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                          {/* Subtle text lines */}
                          <div className="absolute inset-x-1 top-3 bottom-3 flex flex-col justify-center gap-0.5">
                            <div className="h-px bg-amber-600/20" />
                            <div className="h-px bg-amber-600/15 w-3/4" />
                            <div className="h-px bg-amber-600/20" />
                          </div>
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
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''} ${highlightScrolls ? 'scroll-highlight-glow' : ''}`}
                            style={{ transform: `rotate(${(i % 2 - 0.5) * -3}deg)` }}
                            onMouseEnter={() => handleScrollHover(article)}
                            onMouseLeave={handleScrollLeave}
                            onClick={() => setPreviewArticle(article)}
                          >
                            {/* Highlight glow halo */}
                            {highlightScrolls && (
                              <div className="absolute -inset-1 bg-amber-400/40 rounded-lg blur-md animate-pulse" />
                            )}
                            {/* Candlelight reflection from nearby sconces (left side for right shelf) */}
                            <div className={`absolute left-0 top-1 bottom-1 w-1.5 rounded-l-sm pointer-events-none transition-opacity duration-500 ${isNightTime ? 'opacity-50' : 'opacity-20'}`}
                              style={{
                                background: 'linear-gradient(to right, rgba(251,191,36,0.4), transparent)',
                              }}
                            />
                            {/* Candlelight catch on hover */}
                            {isHovered && (
                              <div className="absolute inset-0 rounded-sm pointer-events-none scroll-candlelight-hover"
                                style={{
                                  background: 'radial-gradient(ellipse at left center, rgba(253,224,71,0.35), transparent 70%)',
                                }}
                              />
                            )}
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
          {/* ENTABLATURE - Classical horizontal beam spanning between vertical bookshelves */}
          {/* Covers from top of page down to its bottom border */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={libraryEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className="hidden lg:block absolute left-[18%] right-[18%] top-0 z-10 pointer-events-none"
          >
            {/* Main Entablature Structure - Refined Classical Roman */}
            <div className="relative">
              {/* ===== SIMA (Crown Molding) - Decorative top edge ===== */}
              <div className="relative h-3 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-650 overflow-hidden">
                {/* Lion head water spouts pattern */}
                <div className="absolute inset-x-0 top-0 flex justify-around px-12">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <svg key={`lion-${i}`} viewBox="0 0 16 12" className="w-4 h-3 text-amber-400/50">
                      <circle cx="8" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                      <circle cx="6" cy="4" r="1" fill="currentColor" opacity="0.4"/>
                      <circle cx="10" cy="4" r="1" fill="currentColor" opacity="0.4"/>
                      <path d="M6 7 Q8 9 10 7" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </svg>
                  ))}
                </div>
                {/* Top gold edge */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-400/30 via-yellow-400/60 to-amber-400/30" />
              </div>

              {/* ===== CORONA (Projecting Cornice) ===== */}
              <div className="relative h-4 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-750 shadow-md">
                {/* Cavetto molding (concave profile) */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-amber-550 to-amber-650 border-b border-amber-500/40" />
                {/* Ovolo molding with egg-and-dart pattern */}
                <div className="absolute inset-x-0 bottom-0 h-2.5 flex justify-center items-center overflow-hidden">
                  <div className="flex items-center gap-2 px-4">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={`egg-${i}`} className="flex items-center gap-0.5">
                        {/* Egg */}
                        <div className="w-2 h-2.5 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full border border-amber-400/30" />
                        {/* Dart */}
                        <svg viewBox="0 0 4 8" className="w-1 h-2 text-amber-600/60">
                          <path d="M2 0 L4 8 L0 8 Z" fill="currentColor"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Drip edge shadow line */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-amber-900/40" />
              </div>

              {/* ===== DENTIL COURSE ===== */}
              <div className="relative h-4 bg-gradient-to-b from-amber-750 via-amber-800 to-amber-800 flex justify-center items-center">
                {/* Dentil blocks */}
                <div className="flex items-end gap-1.5 px-6">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={`dentil-${i}`} className="w-2 h-3 bg-gradient-to-b from-amber-650 via-amber-700 to-amber-800 border-x border-amber-500/20 shadow-sm" style={{
                      boxShadow: 'inset 1px 0 0 rgba(251,191,36,0.15), inset -1px 0 0 rgba(0,0,0,0.2)'
                    }} />
                  ))}
                </div>
                {/* Top shadow from corona */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-amber-900/30 to-transparent" />
              </div>

              {/* ===== FRIEZE - THE ARCHIVES Title Band ===== */}
              <div className="relative h-14 bg-gradient-to-b from-amber-800 via-amber-850 to-amber-900 overflow-hidden">
                {/* Carved relief background texture */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q40 15 30 25 Q20 15 30 5' fill='none' stroke='%23fbbf24' stroke-width='0.3'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23fbbf24' stroke-width='0.2'/%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }} />

                {/* Left decorative scroll/acanthus carvings */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <svg viewBox="0 0 40 28" className="w-10 h-7 text-amber-500/50">
                    <path d="M38 14 Q30 8 25 14 Q30 20 38 14" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <path d="M25 14 Q18 6 10 14 Q18 22 25 14" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <circle cx="6" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <circle cx="6" cy="14" r="2" fill="currentColor" opacity="0.3"/>
                  </svg>
                  <svg viewBox="0 0 20 24" className="w-5 h-6 text-amber-400/40">
                    <path d="M10 2 Q16 8 10 14 Q4 8 10 2" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M10 10 L10 22" stroke="currentColor" strokeWidth="0.4"/>
                    <path d="M6 18 Q10 22 14 18" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                  </svg>
                </div>

                {/* Right decorative scroll/acanthus carvings (mirrored) */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 scale-x-[-1]">
                  <svg viewBox="0 0 40 28" className="w-10 h-7 text-amber-500/50">
                    <path d="M38 14 Q30 8 25 14 Q30 20 38 14" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <path d="M25 14 Q18 6 10 14 Q18 22 25 14" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                    <circle cx="6" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <circle cx="6" cy="14" r="2" fill="currentColor" opacity="0.3"/>
                  </svg>
                  <svg viewBox="0 0 20 24" className="w-5 h-6 text-amber-400/40">
                    <path d="M10 2 Q16 8 10 14 Q4 8 10 2" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M10 10 L10 22" stroke="currentColor" strokeWidth="0.4"/>
                    <path d="M6 18 Q10 22 14 18" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                  </svg>
                </div>

                {/* Classical Roman inscription - Latin motto above, The Archives below */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-0.5">
                  {/* Latin inscription */}
                  <span
                    className="text-[10px] font-semibold tracking-[0.4em] text-amber-400/70 uppercase"
                    style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.5em' }}
                  >
                    SAPIENTIA • VERITAS • SCIENTIA
                  </span>

                  <div className="flex items-center gap-3 px-6 py-0.5 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent">
                    {/* Left flourish */}
                    <svg viewBox="0 0 24 8" className="w-6 h-2 text-amber-400/60">
                      <path d="M0 4 Q6 2 12 4 Q18 6 24 4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                      <circle cx="22" cy="4" r="1.5" fill="currentColor" opacity="0.5"/>
                    </svg>

                    {/* Scroll icon */}
                    <ScrollText className="w-4 h-4 text-amber-400/80" />

                    {/* The Archives text */}
                    <span
                      className="text-sm font-bold tracking-[0.3em] text-amber-200 uppercase"
                      style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 0 20px rgba(251,191,36,0.3)' }}
                    >
                      The Archives
                    </span>

                    {/* Right flourish */}
                    <svg viewBox="0 0 24 8" className="w-6 h-2 text-amber-400/60 scale-x-[-1]">
                      <path d="M0 4 Q6 2 12 4 Q18 6 24 4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                      <circle cx="22" cy="4" r="1.5" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>
                </div>

                {/* Top carved bead molding */}
                <div className="absolute inset-x-0 top-0 h-1.5 flex justify-center items-center">
                  <div className="flex items-center gap-1 px-8">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div key={`bead-t-${i}`} className="w-1.5 h-1.5 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full border border-amber-500/20" />
                    ))}
                  </div>
                </div>
                {/* Bottom carved bead molding */}
                <div className="absolute inset-x-0 bottom-0 h-1.5 flex justify-center items-center">
                  <div className="flex items-center gap-1 px-8">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div key={`bead-b-${i}`} className="w-1.5 h-1.5 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full border border-amber-600/20" />
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== ARCHITRAVE - Three Fascia Bands ===== */}
              <div className="relative h-6 bg-gradient-to-b from-amber-800 to-amber-850">
                {/* First fascia (largest, bottom) */}
                <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-b from-amber-750 to-amber-850 border-t border-amber-600/30">
                  {/* Carved leaf pattern */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-30">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <svg key={`leaf-${i}`} viewBox="0 0 16 12" className="w-4 h-3 text-amber-500">
                        <path d="M8 1 Q12 4 8 11 Q4 4 8 1" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        <path d="M8 3 L8 9" stroke="currentColor" strokeWidth="0.3"/>
                      </svg>
                    ))}
                  </div>
                </div>
                {/* Second fascia (middle) */}
                <div className="absolute inset-x-0 top-1 h-2 bg-gradient-to-b from-amber-700 to-amber-800 border-b border-amber-600/20" />
                {/* Third fascia (smallest, top) */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-amber-650 to-amber-750 border-b border-amber-500/30" />
                {/* Gold accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              </div>

              {/* ===== TAENIA & REGULAE (Bottom trim with drops) ===== */}
              <div className="relative h-3 bg-gradient-to-b from-amber-850 via-amber-900 to-amber-950">
                {/* Taenia band */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-amber-800 to-amber-900 border-t border-amber-600/30" />
                {/* Regulae blocks */}
                <div className="absolute inset-x-0 bottom-0 flex justify-around px-12">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={`regula-${i}`} className="w-5 h-1.5 bg-gradient-to-b from-amber-750 to-amber-900 rounded-b-sm shadow-sm border-x border-amber-600/20" />
                  ))}
                </div>
              </div>

              {/* Guttae (drops below regulae) */}
              <div className="absolute -bottom-2 inset-x-0 flex justify-around px-12 z-10">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={`guttae-${i}`} className="flex gap-1">
                    {[0, 1, 2].map((g) => (
                      <div key={`gutta-${i}-${g}`} className="w-1.5 h-1.5 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full shadow-md" />
                    ))}
                  </div>
                ))}
              </div>

              {/* Bottom shadow for depth */}
              <div className="absolute -bottom-3 inset-x-0 h-6 bg-gradient-to-b from-amber-950/70 to-transparent blur-sm" />
            </div>
          </motion.div>

        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10 lg:px-[20%]">
          <div className="max-w-6xl mx-auto lg:pt-40">
            {/* Title Section - Below the entablature */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
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

              {/* Stats in ornate frames - clickable to highlight scrolls */}
              <div
                className={`flex items-center justify-center gap-4 mt-4 cursor-pointer group transition-all duration-300 ${highlightScrolls ? 'scale-105' : 'hover:scale-102'}`}
                onClick={() => setHighlightScrolls(prev => !prev)}
                title="Click to highlight article scrolls on the shelves"
              >
                <div className={`relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border rounded-sm transition-all duration-300 ${highlightScrolls ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'border-amber-600/40 group-hover:border-amber-500/60'}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
                  <span className="text-xs font-bold text-amber-200 relative">
                    {totalArticles > 0 ? totalArticles : articles.length + (featuredArticle ? 1 : 0)} Articles
                  </span>
                </div>
                <div className={`relative px-4 py-2 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border rounded-sm transition-all duration-300 ${highlightScrolls ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'border-amber-600/40 group-hover:border-amber-500/60'}`}>
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

          </div>
        </div>

        {/* ========================================== */}
        {/* BOTTOM CONNECTING SHELF - Forms bottom of U */}
        {/* Full-width shelf connecting the side bookshelves */}
        {/* ========================================== */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-8 z-25">
          {/* Main shelf surface */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-t-2 border-amber-500/40 shadow-lg overflow-hidden">
            {/* Wood grain texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
            }} />
            {/* Top highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/30 to-transparent" />
          </div>
          {/* Decorative brass brackets */}
          <div className="absolute left-[10%] top-0 bottom-0 w-4 bg-gradient-to-b from-yellow-600 via-yellow-700 to-amber-800 rounded-b-sm shadow-md" />
          <div className="absolute right-[10%] top-0 bottom-0 w-4 bg-gradient-to-b from-yellow-600 via-yellow-700 to-amber-800 rounded-b-sm shadow-md" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-6 bg-gradient-to-b from-yellow-500 via-yellow-600 to-amber-700 rounded-b-sm shadow-md border-x border-yellow-400/30" />
        </div>
      </div>
      {/* END OF HERO U-FRAME */}

      {/* ========================================== */}
      {/* GRAND LIBRARY - HORIZONTAL BOOKSHELVES    */}
      {/* Roman-inspired design with category filters */}
      {/* ========================================== */}
      <div className="hidden lg:block relative bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 overflow-visible">
        {/* Wood grain texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 Q30 100 20 200 Q10 300 20 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M50 0 Q60 100 50 200 Q40 300 50 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M80 0 Q70 100 80 200 Q90 300 80 400' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
        }} />

        {/* Roman pilaster columns on sides - LARGE pillars supporting the library above */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 z-10 border-r-4 border-amber-600/60 shadow-2xl">
          {/* Ornate Corinthian capital with acanthus leaves - enlarged */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-700 via-amber-750 to-amber-800 border-b-2 border-amber-600/40">
            <svg viewBox="0 0 64 80" className="w-full h-full text-amber-400/60">
              {/* Volutes (scrolls at top) */}
              <ellipse cx="10" cy="12" rx="7" ry="5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <ellipse cx="54" cy="12" rx="7" ry="5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 17 Q10 22 16 24" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <path d="M54 17 Q54 22 48 24" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              {/* Large acanthus leaves */}
              <path d="M32 72 Q16 58 16 44 Q24 52 32 44 Q40 52 48 44 Q48 58 32 72" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M32 18 Q24 30 24 42 M32 18 Q40 30 40 42" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <path d="M20 28 Q28 36 28 48 M44 28 Q36 36 36 48" fill="none" stroke="currentColor" strokeWidth="0.6"/>
              {/* Central rosette */}
              <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.4"/>
              <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.6"/>
              {/* Decorative spirals */}
              <path d="M6 20 Q14 28 10 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M58 20 Q50 28 54 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
              {/* Additional leaf details */}
              <path d="M24 56 Q28 52 32 56 Q36 52 40 56" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
          {/* Column shaft with fluting - more channels */}
          <div className="absolute top-24 bottom-12 left-0 right-0 overflow-hidden">
            {/* Fluting channels - more grooves for larger column */}
            <div className="absolute inset-2 flex justify-around opacity-40">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={`left-hshelf-flute-${i}`} className="w-1.5 h-full bg-gradient-to-r from-amber-950/50 via-amber-800/20 to-amber-950/50 rounded-full" />
              ))}
            </div>
            {/* Highlight reflection */}
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-amber-400/15 to-transparent" />
            {/* Inner shadow */}
            <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-amber-950/20 to-transparent" />
          </div>
          {/* Attic base (bottom) - larger */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-800 via-amber-750 to-amber-700 border-t-2 border-amber-600/40">
            <div className="absolute top-2 left-2 right-2 h-1.5 bg-gradient-to-b from-amber-600/50 to-transparent rounded-full" />
            <div className="absolute top-5 left-3 right-3 h-1 bg-gradient-to-b from-amber-500/30 to-transparent rounded-full" />
            <div className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-t from-amber-900 to-transparent" />
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-amber-800 via-amber-700 to-amber-800 z-10 border-l-4 border-amber-600/60 shadow-2xl">
          {/* Ornate Corinthian capital with acanthus leaves - enlarged */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-700 via-amber-750 to-amber-800 border-b-2 border-amber-600/40">
            <svg viewBox="0 0 64 80" className="w-full h-full text-amber-400/60">
              {/* Volutes (scrolls at top) */}
              <ellipse cx="10" cy="12" rx="7" ry="5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <ellipse cx="54" cy="12" rx="7" ry="5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 17 Q10 22 16 24" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <path d="M54 17 Q54 22 48 24" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              {/* Large acanthus leaves */}
              <path d="M32 72 Q16 58 16 44 Q24 52 32 44 Q40 52 48 44 Q48 58 32 72" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M32 18 Q24 30 24 42 M32 18 Q40 30 40 42" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <path d="M20 28 Q28 36 28 48 M44 28 Q36 36 36 48" fill="none" stroke="currentColor" strokeWidth="0.6"/>
              {/* Central rosette */}
              <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.4"/>
              <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.6"/>
              {/* Decorative spirals */}
              <path d="M6 20 Q14 28 10 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M58 20 Q50 28 54 38" fill="none" stroke="currentColor" strokeWidth="0.6"/>
              {/* Additional leaf details */}
              <path d="M24 56 Q28 52 32 56 Q36 52 40 56" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
          {/* Column shaft with fluting - more channels */}
          <div className="absolute top-24 bottom-12 left-0 right-0 overflow-hidden">
            {/* Fluting channels - more grooves for larger column */}
            <div className="absolute inset-2 flex justify-around opacity-40">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={`right-hshelf-flute-${i}`} className="w-1.5 h-full bg-gradient-to-r from-amber-950/50 via-amber-800/20 to-amber-950/50 rounded-full" />
              ))}
            </div>
            {/* Highlight reflection */}
            <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-amber-400/15 to-transparent" />
            {/* Inner shadow */}
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-amber-950/20 to-transparent" />
          </div>
          {/* Attic base (bottom) - larger */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-800 via-amber-750 to-amber-700 border-t-2 border-amber-600/40">
            <div className="absolute top-2 left-2 right-2 h-1.5 bg-gradient-to-b from-amber-600/50 to-transparent rounded-full" />
            <div className="absolute top-5 left-3 right-3 h-1 bg-gradient-to-b from-amber-500/30 to-transparent rounded-full" />
            <div className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-t from-amber-900 to-transparent" />
          </div>
        </div>

        {/* Standalone wall candle sconces - Left side */}
        {[18, 50, 82].map((topPercent, i) => (
          <div key={`hshelf-left-candle-${i}`} className="absolute left-[72px] z-20" style={{ top: `${topPercent}%`, transform: 'translateY(-50%)' }}>
            <div className="relative w-8 h-12">
              {/* Decorative backplate with carved flame motif - night-time aware */}
              <div className={`absolute inset-0 bg-gradient-to-b from-yellow-500 via-amber-600 to-amber-800 rounded-t-full rounded-b-lg shadow-xl border border-yellow-400/40 overflow-hidden ${isNightTime ? 'brightness-110' : ''}`}>
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-5">
                  <svg viewBox="0 0 20 20" className={`w-full h-full ${isNightTime ? 'text-yellow-200/70' : 'text-yellow-300/60'}`}>
                    <path d="M10 2 Q15 6 10 12 Q5 6 10 2" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="10" cy="6" r="1.5" fill="currentColor" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              {/* Bobeche (candle cup) - matches pilaster sconce style */}
              <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-5 h-2.5 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm border-t-2 border-yellow-300/60 shadow-lg ${isNightTime ? 'brightness-110' : ''}`} />
              {/* Candle body - standardized h-5 to match pilaster sconces */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2.5 h-5 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 rounded-t-sm shadow-md" />
              {/* Wick - standardized color to match pilaster sconces */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 to-gray-500" />
              {/* Flame assembly - standardized to match pilaster sconces */}
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-60'}`}>
                {/* Flame halo - now present to match pilaster sconces */}
                <div className="absolute -inset-2 bg-gradient-radial from-orange-400/30 via-orange-300/15 to-transparent rounded-full blur-md" />
                {/* Flame - standardized h-4 and timing to match pilaster sconces */}
                <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-200 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: `${i * 0.3}s`, animationDuration: '0.7s' }} />
              </div>
              {/* Ambient glow - standardized blur-xl and opacity to match pilaster sconces */}
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-radial from-orange-400/40 via-amber-500/20 to-transparent rounded-full blur-xl ${isNightTime ? 'opacity-100' : 'opacity-40'}`} />
            </div>
          </div>
        ))}

        {/* Standalone wall candle sconces - Right side */}
        {[18, 50, 82].map((topPercent, i) => (
          <div key={`hshelf-right-candle-${i}`} className="absolute right-[72px] z-20" style={{ top: `${topPercent}%`, transform: 'translateY(-50%)' }}>
            <div className="relative w-8 h-12">
              {/* Decorative backplate with carved flame motif - night-time aware */}
              <div className={`absolute inset-0 bg-gradient-to-b from-yellow-500 via-amber-600 to-amber-800 rounded-t-full rounded-b-lg shadow-xl border border-yellow-400/40 overflow-hidden ${isNightTime ? 'brightness-110' : ''}`}>
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-5">
                  <svg viewBox="0 0 20 20" className={`w-full h-full ${isNightTime ? 'text-yellow-200/70' : 'text-yellow-300/60'}`}>
                    <path d="M10 2 Q15 6 10 12 Q5 6 10 2" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="10" cy="6" r="1.5" fill="currentColor" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              {/* Bobeche (candle cup) - matches pilaster sconce style */}
              <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-5 h-2.5 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm border-t-2 border-yellow-300/60 shadow-lg ${isNightTime ? 'brightness-110' : ''}`} />
              {/* Candle body - standardized h-5 to match pilaster sconces */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2.5 h-5 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 rounded-t-sm shadow-md" />
              {/* Wick - standardized color to match pilaster sconces */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 to-gray-500" />
              {/* Flame assembly - standardized to match pilaster sconces */}
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-60'}`}>
                {/* Flame halo - now present to match pilaster sconces */}
                <div className="absolute -inset-2 bg-gradient-radial from-orange-400/30 via-orange-300/15 to-transparent rounded-full blur-md" />
                {/* Flame - standardized h-4 and timing; offset +0.5s for organic variation like right pilaster */}
                <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-200 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: `${i * 0.3 + 0.5}s`, animationDuration: '0.7s' }} />
              </div>
              {/* Ambient glow - standardized blur-xl and opacity to match pilaster sconces */}
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-radial from-orange-400/40 via-amber-500/20 to-transparent rounded-full blur-xl ${isNightTime ? 'opacity-100' : 'opacity-40'}`} />
            </div>
          </div>
        ))}

        {/* ============ KEYSTONE DIVIDER - Grand ornate Roman shelf between vertical bookshelves and horizontal shelves ============ */}
        <div className="h-20 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border-t-2 border-amber-400/60 shadow-2xl relative overflow-hidden mx-10">
          {/* Top surface highlight band */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-amber-500/40 via-amber-600/20 to-transparent" />

          {/* Enhanced wood grain texture across full depth */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8 Q50 5 100 8 Q150 11 200 8' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M0 16 Q50 14 100 16 Q150 18 200 16' fill='none' stroke='%23000' stroke-width='0.4'/%3E%3Cpath d='M0 24 Q60 22 120 24 Q180 26 200 24' fill='none' stroke='%23000' stroke-width='0.4'/%3E%3Cpath d='M0 32 Q40 30 80 32 Q120 34 160 32 Q200 30 200 32' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3C/svg%3E")`,
          }} />

          {/* === CENTRAL DIAMOND INLAY === */}
          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-35 z-20" viewBox="0 0 48 48">
            <path d="M24 4 L44 24 L24 44 L4 24 Z" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
            <path d="M24 12 L36 24 L24 36 L12 24 Z" fill="none" stroke="#f59e0b" strokeWidth="0.8"/>
            <circle cx="24" cy="24" r="5" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
            <circle cx="24" cy="24" r="2.5" fill="#fbbf24" opacity="0.4"/>
          </svg>

          {/* === CORNER ROSETTES with acanthus detail === */}
          <svg className={`absolute top-2 left-3 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'} z-10`} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.7"/>
            <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5"/>
            {/* Petal details */}
            <path d="M12 2 Q14 6 12 10 Q10 6 12 2" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M22 12 Q18 14 14 12 Q18 10 22 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M12 22 Q10 18 12 14 Q14 18 12 22" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M2 12 Q6 10 10 12 Q6 14 2 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
          </svg>
          <svg className={`absolute top-2 right-3 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'} z-10`} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.7"/>
            <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5"/>
            <path d="M12 2 Q14 6 12 10 Q10 6 12 2" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M22 12 Q18 14 14 12 Q18 10 22 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M12 22 Q10 18 12 14 Q14 18 12 22" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M2 12 Q6 10 10 12 Q6 14 2 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
          </svg>
          <svg className={`absolute bottom-2 left-3 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'} z-10`} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.7"/>
            <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5"/>
            <path d="M12 2 Q14 6 12 10 Q10 6 12 2" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M22 12 Q18 14 14 12 Q18 10 22 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M12 22 Q10 18 12 14 Q14 18 12 22" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M2 12 Q6 10 10 12 Q6 14 2 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
          </svg>
          <svg className={`absolute bottom-2 right-3 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'} z-10`} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.7"/>
            <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5"/>
            <path d="M12 2 Q14 6 12 10 Q10 6 12 2" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M22 12 Q18 14 14 12 Q18 10 22 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M12 22 Q10 18 12 14 Q14 18 12 22" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M2 12 Q6 10 10 12 Q6 14 2 12" fill="none" stroke="currentColor" strokeWidth="0.4"/>
          </svg>

          {/* === UPPER DECORATIVE BAND - Guilloche pattern === */}
          <div className="absolute top-1 left-4 right-4 h-4 overflow-hidden">
            <svg className="w-full h-full opacity-50" preserveAspectRatio="none">
              <defs>
                <pattern id="keystoneDividerGuilloche" x="0" y="0" width="32" height="16" patternUnits="userSpaceOnUse">
                  {/* Interlocking wave pattern */}
                  <path d="M0 8 Q8 0 16 8 Q24 16 32 8" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
                  <path d="M0 8 Q8 16 16 8 Q24 0 32 8" fill="none" stroke="#d97706" strokeWidth="0.6"/>
                  {/* Center beads */}
                  <circle cx="8" cy="8" r="1.5" fill="#fbbf24" opacity="0.4"/>
                  <circle cx="24" cy="8" r="1.5" fill="#fbbf24" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneDividerGuilloche)"/>
            </svg>
          </div>

          {/* Gold inlay accent line below guilloche */}
          <div className="absolute top-5 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

          {/* === CENTRAL CARVED FRIEZE - Acanthus scrollwork === */}
          <div className="absolute top-6 left-0 right-0 h-6">
            <svg className="w-full h-full opacity-60" preserveAspectRatio="none">
              <defs>
                {/* Acanthus scroll pattern */}
                <pattern id="keystoneDividerAcanthus" x="0" y="0" width="80" height="24" patternUnits="userSpaceOnUse">
                  {/* Flowing acanthus leaves with spirals */}
                  <path d="M0 12 Q10 6 20 12 Q30 18 40 12 Q50 6 60 12 Q70 18 80 12" fill="none" stroke="#fbbf24" strokeWidth="0.9"/>
                  {/* Leaf curls */}
                  <path d="M10 8 Q12 4 16 6" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
                  <path d="M30 16 Q32 20 36 18" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
                  <path d="M50 8 Q52 4 56 6" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
                  <path d="M70 16 Q72 20 76 18" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
                  {/* Spiral tendrils */}
                  <circle cx="20" cy="12" r="3" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
                  <circle cx="60" cy="12" r="3" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
                  {/* Small leaf details */}
                  <ellipse cx="40" cy="10" rx="2" ry="3" fill="none" stroke="#d97706" strokeWidth="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneDividerAcanthus)"/>
            </svg>
          </div>

          {/* === LION HEAD MEDALLIONS - Evenly spaced across shelf === */}
          {[8, 25, 42, 58, 75, 92].map((pos, i) => (
            <div key={`keystone-divider-lion-${i}`} className="absolute top-6 -translate-x-1/2 z-10" style={{ left: `${pos}%` }}>
              <div className="w-5 h-5 bg-gradient-to-br from-yellow-500 via-amber-600 to-amber-800 rounded-full shadow-lg border border-yellow-400/50 relative overflow-hidden">
                {/* Lion face detail */}
                <svg viewBox="0 0 20 20" className="w-full h-full text-amber-900/70">
                  {/* Mane suggestion */}
                  <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                  {/* Eyes */}
                  <circle cx="7" cy="8" r="1" fill="currentColor"/>
                  <circle cx="13" cy="8" r="1" fill="currentColor"/>
                  {/* Snout */}
                  <ellipse cx="10" cy="12" rx="2.5" ry="2" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                  {/* Nose */}
                  <circle cx="10" cy="11" r="0.8" fill="currentColor"/>
                </svg>
                {/* Shine highlight */}
                <div className="absolute top-0.5 left-1 w-2 h-1.5 bg-gradient-to-br from-yellow-300/60 to-transparent rounded-full" />
              </div>
            </div>
          ))}

          {/* === DENTIL COURSE === */}
          <div className="absolute top-[52px] left-2 right-2 h-2">
            <svg className="w-full h-full opacity-50" preserveAspectRatio="none">
              <defs>
                <pattern id="keystoneDividerDentil" x="0" y="0" width="12" height="8" patternUnits="userSpaceOnUse">
                  <rect x="1" y="0" width="5" height="7" fill="#fbbf24" opacity="0.3"/>
                  <rect x="1" y="0" width="5" height="7" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneDividerDentil)"/>
            </svg>
          </div>

          {/* === BEADED MOLDING STRIP === */}
          <div className="absolute top-[60px] left-0 right-0 h-1.5 bg-gradient-to-b from-amber-700 to-amber-800">
            <svg className="w-full h-full opacity-60" preserveAspectRatio="none">
              <defs>
                <pattern id="keystoneDividerBeads" x="0" y="0" width="8" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="3" r="2" fill="#fbbf24" opacity="0.4"/>
                  <circle cx="4" cy="3" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneDividerBeads)"/>
            </svg>
          </div>

          {/* === BOTTOM CARVED EDGE - Enhanced egg-and-dart with palmettes === */}
          <svg className="absolute bottom-0 left-0 right-0 h-4 opacity-65" preserveAspectRatio="none">
            <defs>
              <pattern id="keystoneDividerEdge" x="0" y="0" width="40" height="16" patternUnits="userSpaceOnUse">
                {/* Egg */}
                <ellipse cx="10" cy="8" rx="6" ry="5" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
                <ellipse cx="10" cy="8" rx="3" ry="2.5" fill="#fbbf24" opacity="0.25"/>
                {/* Dart/Palmette */}
                <path d="M26 2 L28 14 L30 2" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
                <path d="M24 4 L28 12" fill="none" stroke="#d97706" strokeWidth="0.5"/>
                <path d="M32 4 L28 12" fill="none" stroke="#d97706" strokeWidth="0.5"/>
                {/* Small leaf flourish */}
                <path d="M34 6 Q36 8 34 10" fill="none" stroke="#f59e0b" strokeWidth="0.4"/>
                <path d="M22 6 Q20 8 22 10" fill="none" stroke="#f59e0b" strokeWidth="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#keystoneDividerEdge)"/>
          </svg>

          {/* Bottom shadow for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-950 via-amber-900/60 to-transparent" />

          {/* === CORNER PALMETTE ACCENTS === */}
          <svg className="absolute left-2 top-2 w-6 h-10 opacity-50" viewBox="0 0 24 40">
            <path d="M12 38 Q4 30 4 20 Q8 25 12 20 Q16 25 20 20 Q20 30 12 38" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <path d="M12 4 Q8 12 8 22 M12 4 Q16 12 16 22" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
            <circle cx="12" cy="8" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
          </svg>
          <svg className="absolute right-2 top-2 w-6 h-10 opacity-50 scale-x-[-1]" viewBox="0 0 24 40">
            <path d="M12 38 Q4 30 4 20 Q8 25 12 20 Q16 25 20 20 Q20 30 12 38" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <path d="M12 4 Q8 12 8 22 M12 4 Q16 12 16 22" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
            <circle cx="12" cy="8" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* ============ SHELF 1 ============ */}
        <div className="relative pt-6 pb-2">
          {/* Centered Category filter bar with Roman styling */}
          <div className="flex items-center justify-center px-12 mb-3">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-gradient-to-r from-amber-900/40 via-amber-800/60 to-amber-900/40 rounded-sm border-y border-amber-600/30">
              {/* Left decorative element */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 8" className="w-4 h-2 text-amber-500/50">
                  <path d="M0 4 L6 4 M8 0 L8 8" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
                <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-[0.15em]" style={{ fontFamily: 'Georgia, serif' }}>Shelf I</span>
              </div>
              {/* Divider */}
              <div className="w-px h-4 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
              {/* Category buttons - icon only style matching Shelf 3 */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShelf1Category(null)}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-sm transition-all border ${!shelf1Category ? 'bg-amber-700/70 text-amber-100 border-amber-500/50 shadow-inner' : 'text-amber-400/70 border-transparent hover:text-amber-300 hover:bg-amber-800/30'}`}
                >
                  All
                </button>
                {BOOK_CATEGORIES.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setShelf1Category(shelf1Category === cat.slug ? null : cat.slug)}
                    className={`p-1.5 rounded-sm transition-all border ${shelf1Category === cat.slug ? 'bg-amber-700/70 text-amber-100 border-amber-500/50 shadow-inner' : 'text-amber-400/70 border-transparent hover:text-amber-300 hover:bg-amber-800/30'}`}
                    title={cat.name}
                  >
                    <cat.icon className="w-3 h-3" />
                  </button>
                ))}
              </div>
              {/* Right decorative element */}
              <svg viewBox="0 0 16 8" className="w-4 h-2 text-amber-500/50 scale-x-[-1]">
                <path d="M0 4 L6 4 M8 0 L8 8" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Scrolls container - sits ON the shelf */}
          <div className="relative mx-10">
            <div className="flex items-end justify-center gap-2.5 px-6 pb-0 min-h-[85px] flex-wrap overflow-hidden">
              {getShelfArticles(0, shelf1Category).map((article, idx) => {
                const categorySlug = article.category?.slug || 'default'
                const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability
                const articleProgress = readingProgress[article.id]
                const progressPercent = articleProgress?.scrollProgress || 0
                const isCompleted = articleProgress?.completed || false
                const isHovered = hoveredBook === article.id
                const rotation = ((idx * 17) % 5) - 2

                return (
                  <div
                    key={`shelf1-${article.id}`}
                    className={`flex-shrink-0 relative w-8 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-4 z-30' : 'z-10'} ${highlightScrolls ? 'scroll-highlight-glow' : ''}`}
                    style={{ marginBottom: '0px' }}
                    onMouseEnter={() => handleScrollHover(article)}
                    onMouseLeave={handleScrollLeave}
                    onClick={() => setPreviewArticle(article)}
                  >
                    {/* Highlight glow halo */}
                    {highlightScrolls && (
                      <div className="absolute -inset-2 bg-amber-400/40 rounded-lg blur-md animate-pulse" />
                    )}
                    {/* Scroll shadow on shelf */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-t from-amber-950/60 to-transparent blur-sm rounded-full" />
                    {/* Scroll sitting on shelf */}
                    <div className="relative h-[75px]" style={{ transform: `rotate(${rotation}deg)` }}>
                      {/* Parchment body with texture */}
                      <div className={`absolute inset-x-0.5 top-4 bottom-4 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-lg overflow-hidden`}>
                        {/* Parchment texture */}
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='1' height='1' fill='%23000' opacity='0.1'/%3E%3Crect x='12' y='8' width='1' height='1' fill='%23000' opacity='0.08'/%3E%3Crect x='6' y='14' width='1' height='1' fill='%23000' opacity='0.12'/%3E%3C/svg%3E")`,
                        }} />
                        {/* Reading progress fill */}
                        {progressPercent > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-400/50 via-emerald-300/30 to-emerald-200/10 transition-all duration-500" style={{ height: `${progressPercent}%` }} />
                        )}
                        {/* Center line detail */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-px bg-gradient-to-b from-amber-600/20 via-amber-500/10 to-amber-600/20" />
                      </div>
                      {/* Top rod with ornate finial */}
                      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 rounded-t-sm shadow-lg">
                        {/* Rod highlight */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/40 to-transparent rounded-t-sm" />
                        {/* Finial with detail */}
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40">
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
                        </div>
                      </div>
                      {/* Bottom rod with ornate finial */}
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-500 via-amber-600 to-amber-800 rounded-b-sm shadow-lg">
                        {/* Rod shadow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-amber-900/40 to-transparent rounded-b-sm" />
                        {/* Finial with detail */}
                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40">
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
                        </div>
                      </div>
                      {/* Wax seal with detailed design */}
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6">
                        {/* Seal shadow */}
                        <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-amber-950/50 rounded-full blur-sm" />
                        {/* Main seal */}
                        <div className={`relative w-full h-full bg-gradient-to-br ${isCompleted ? 'from-emerald-400 via-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-lg border border-white/20 flex items-center justify-center overflow-hidden`}>
                          {/* Wax texture */}
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                          }} />
                          {/* Seal impression */}
                          {isCompleted ? (
                            <svg className="w-3 h-3 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="w-2.5 h-2.5 border border-white/30 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* Ghost scrolls - transparent tan, filling the shelf */}
              {Array.from({ length: Math.max(0, 16 - getShelfArticles(0, shelf1Category).length) }).map((_, i) => (
                <div key={`ghost-shelf1-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                  <div className="h-[75px] relative">
                    {/* Ghost scroll body */}
                    <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                    {/* Top rod */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                    {/* Bottom rod */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                    {/* Subtle text lines */}
                    <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-4/5" />
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-3/5" />
                    </div>
                    {/* Ghost seal */}
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Roman shelf surface - matching Shelf 2/3 style */}
            <div className="h-10 bg-gradient-to-b from-amber-650 via-amber-750 to-amber-950 border-t-2 border-amber-400/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-500/30 to-transparent" />
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8 Q50 5 100 8 Q150 11 200 8' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M0 14 Q50 12 100 14 Q150 16 200 14' fill='none' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
              }} />
              <div className="absolute top-1.5 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              {/* Acanthus leaf corner decorations - matching Shelf 2/3 */}
              <svg className={`absolute left-2 top-0.5 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'}`} viewBox="0 0 32 32">
                <path d="M4 28 Q10 20 16 16 Q10 12 4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 22 Q12 18 16 15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M8 16 Q12 14 14 13" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3"/>
              </svg>
              <svg className={`absolute right-2 top-0.5 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'} scale-x-[-1]`} viewBox="0 0 32 32">
                <path d="M4 28 Q10 20 16 16 Q10 12 4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 22 Q12 18 16 15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M8 16 Q12 14 14 13" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3"/>
              </svg>
              {/* Symmetric rosettes */}
              {[4, 15, 26, 37, 50, 63, 74, 85, 96].map((pos, i) => (
                <div key={`shelf1-rosette-${i}`} className="absolute top-3.5 -translate-x-1/2" style={{ left: `${pos}%` }}>
                  <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40 relative overflow-hidden">
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-gradient-to-br from-yellow-200/70 to-transparent rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-amber-700/50 rounded-full" />
                  </div>
                </div>
              ))}
              <svg className="absolute bottom-0 left-0 right-0 h-2.5 opacity-50" preserveAspectRatio="none">
                <pattern id="shelf1EdgePattern" x="0" y="0" width="24" height="10" patternUnits="userSpaceOnUse">
                  <ellipse cx="7" cy="5" rx="5" ry="4" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                  <ellipse cx="7" cy="5" rx="2.5" ry="2" fill="#fbbf24" opacity="0.2"/>
                  <path d="M17 1 L18.5 8 L20 1" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#shelf1EdgePattern)"/>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-amber-950 to-transparent" />
            </div>
          </div>
        </div>

        {/* ============ SHELF 2 ============ */}
        <div className="relative pt-6 pb-2">
          {/* Centered Category filter bar with Roman styling */}
          <div className="flex items-center justify-center px-12 mb-3">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-gradient-to-r from-amber-900/40 via-amber-800/60 to-amber-900/40 rounded-sm border-y border-amber-600/30">
              {/* Left decorative element */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 8" className="w-4 h-2 text-amber-500/50">
                  <path d="M0 4 L6 4 M8 0 L8 8" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
                <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-[0.15em]" style={{ fontFamily: 'Georgia, serif' }}>Shelf II</span>
              </div>
              {/* Divider */}
              <div className="w-px h-4 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
              {/* Category buttons - icon only style matching Shelf 3 */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShelf2Category(null)}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-sm transition-all border ${!shelf2Category ? 'bg-amber-700/70 text-amber-100 border-amber-500/50 shadow-inner' : 'text-amber-400/70 border-transparent hover:text-amber-300 hover:bg-amber-800/30'}`}
                >
                  All
                </button>
                {BOOK_CATEGORIES.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setShelf2Category(shelf2Category === cat.slug ? null : cat.slug)}
                    className={`p-1.5 rounded-sm transition-all border ${shelf2Category === cat.slug ? 'bg-amber-700/70 text-amber-100 border-amber-500/50 shadow-inner' : 'text-amber-400/70 border-transparent hover:text-amber-300 hover:bg-amber-800/30'}`}
                    title={cat.name}
                  >
                    <cat.icon className="w-3 h-3" />
                  </button>
                ))}
              </div>
              {/* Right decorative element */}
              <svg viewBox="0 0 16 8" className="w-4 h-2 text-amber-500/50 scale-x-[-1]">
                <path d="M0 4 L6 4 M8 0 L8 8" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Scrolls container */}
          <div className="relative mx-10">
            <div className="flex items-end justify-center gap-2.5 px-6 pb-0 min-h-[85px] flex-wrap overflow-hidden">
              {getShelfArticles(1, shelf2Category).map((article, idx) => {
                const categorySlug = article.category?.slug || 'default'
                const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability
                const articleProgress = readingProgress[article.id]
                const progressPercent = articleProgress?.scrollProgress || 0
                const isCompleted = articleProgress?.completed || false
                const isHovered = hoveredBook === article.id
                const rotation = ((idx * 13 + 5) % 5) - 2

                return (
                  <div
                    key={`shelf2-${article.id}`}
                    className={`flex-shrink-0 relative w-8 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-4 z-30' : 'z-10'} ${highlightScrolls ? 'scroll-highlight-glow' : ''}`}
                    style={{ marginBottom: '0px' }}
                    onMouseEnter={() => handleScrollHover(article)}
                    onMouseLeave={handleScrollLeave}
                    onClick={() => setPreviewArticle(article)}
                  >
                    {/* Highlight glow halo */}
                    {highlightScrolls && (
                      <div className="absolute -inset-2 bg-amber-400/40 rounded-lg blur-md animate-pulse" />
                    )}
                    {/* Scroll shadow on shelf */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-t from-amber-950/60 to-transparent blur-sm rounded-full" />
                    <div className="relative h-[75px]" style={{ transform: `rotate(${rotation}deg)` }}>
                      {/* Parchment body with texture */}
                      <div className={`absolute inset-x-0.5 top-4 bottom-4 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-lg overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='1' height='1' fill='%23000' opacity='0.1'/%3E%3Crect x='12' y='8' width='1' height='1' fill='%23000' opacity='0.08'/%3E%3Crect x='6' y='14' width='1' height='1' fill='%23000' opacity='0.12'/%3E%3C/svg%3E")`,
                        }} />
                        {progressPercent > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-400/50 via-emerald-300/30 to-emerald-200/10 transition-all duration-500" style={{ height: `${progressPercent}%` }} />
                        )}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-px bg-gradient-to-b from-amber-600/20 via-amber-500/10 to-amber-600/20" />
                      </div>
                      {/* Top rod with ornate finial */}
                      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 rounded-t-sm shadow-lg">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/40 to-transparent rounded-t-sm" />
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40">
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
                        </div>
                      </div>
                      {/* Bottom rod with ornate finial */}
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-500 via-amber-600 to-amber-800 rounded-b-sm shadow-lg">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-amber-900/40 to-transparent rounded-b-sm" />
                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40">
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
                        </div>
                      </div>
                      {/* Wax seal with detailed design */}
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6">
                        <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-amber-950/50 rounded-full blur-sm" />
                        <div className={`relative w-full h-full bg-gradient-to-br ${isCompleted ? 'from-emerald-400 via-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-lg border border-white/20 flex items-center justify-center overflow-hidden`}>
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                          }} />
                          {isCompleted ? (
                            <svg className="w-3 h-3 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="w-2.5 h-2.5 border border-white/30 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* Ghost scrolls - transparent tan, filling the shelf */}
              {Array.from({ length: Math.max(0, 16 - getShelfArticles(1, shelf2Category).length) }).map((_, i) => (
                <div key={`ghost-shelf2-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                  <div className="h-[75px] relative">
                    {/* Ghost scroll body */}
                    <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                    {/* Top rod */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                    {/* Bottom rod */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                    {/* Subtle text lines */}
                    <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-4/5" />
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-3/5" />
                    </div>
                    {/* Ghost seal */}
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                  </div>
                </div>
              ))}
            </div>

            {/* Center decorative medallion - enhanced */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-12 h-12 z-30">
              {/* Medallion shadow */}
              <div className="absolute inset-0 translate-y-1 bg-amber-950/50 rounded-full blur-md" />
              <div className="relative w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-700 rounded-full shadow-xl border-2 border-yellow-300/50 flex items-center justify-center overflow-hidden">
                {/* Hammered texture */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='5' cy='5' r='2' fill='%23fff' opacity='0.3'/%3E%3Ccircle cx='15' cy='10' r='1.5' fill='%23fff' opacity='0.2'/%3E%3C/svg%3E")`,
                }} />
                <div className="w-6 h-6 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full border-2 border-yellow-400/40 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 16 16" className="w-4 h-4 text-yellow-400/70">
                    <path d="M8 1 L9.5 5.5 L14 7 L9.5 8.5 L8 13 L6.5 8.5 L2 7 L6.5 5.5 Z" fill="currentColor"/>
                    <circle cx="8" cy="7" r="1.5" fill="currentColor" opacity="0.5"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Ornate Roman shelf surface - Enhanced */}
            <div className="h-10 bg-gradient-to-b from-amber-650 via-amber-750 to-amber-950 border-t-2 border-amber-400/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-500/30 to-transparent" />
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8 Q50 5 100 8 Q150 11 200 8' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M0 14 Q50 12 100 14 Q150 16 200 14' fill='none' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
              }} />
              <div className="absolute top-1.5 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              {/* Acanthus leaf corner decorations - matching Shelf 1/3 */}
              <svg className={`absolute left-2 top-0.5 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'}`} viewBox="0 0 32 32">
                <path d="M4 28 Q10 20 16 16 Q10 12 4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 22 Q12 18 16 15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M8 16 Q12 14 14 13" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3"/>
              </svg>
              <svg className={`absolute right-2 top-0.5 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'} scale-x-[-1]`} viewBox="0 0 32 32">
                <path d="M4 28 Q10 20 16 16 Q10 12 4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 22 Q12 18 16 15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M8 16 Q12 14 14 13" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3"/>
              </svg>
              {/* Symmetric rosettes */}
              {[4, 15, 26, 37, 50, 63, 74, 85, 96].map((pos, i) => (
                <div key={`shelf2-rosette-${i}`} className="absolute top-3.5 -translate-x-1/2" style={{ left: `${pos}%` }}>
                  <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40 relative overflow-hidden">
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-gradient-to-br from-yellow-200/70 to-transparent rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-amber-700/50 rounded-full" />
                  </div>
                </div>
              ))}
              <svg className="absolute bottom-0 left-0 right-0 h-2.5 opacity-50" preserveAspectRatio="none">
                <pattern id="shelf2EdgePattern" x="0" y="0" width="24" height="10" patternUnits="userSpaceOnUse">
                  <ellipse cx="7" cy="5" rx="5" ry="4" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                  <ellipse cx="7" cy="5" rx="2.5" ry="2" fill="#fbbf24" opacity="0.2"/>
                  <path d="M17 1 L18.5 8 L20 1" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#shelf2EdgePattern)"/>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-amber-950 to-transparent" />
            </div>
          </div>
        </div>

        {/* ============ SHELF 3 ============ */}
        <div className="relative pt-6 pb-2">
          {/* Centered Category filter bar with Roman styling */}
          <div className="flex items-center justify-center px-12 mb-3">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-gradient-to-r from-amber-900/40 via-amber-800/60 to-amber-900/40 rounded-sm border-y border-amber-600/30">
              {/* Left decorative element */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 8" className="w-4 h-2 text-amber-500/50">
                  <path d="M0 4 L6 4 M8 0 L8 8" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
                <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-[0.15em]" style={{ fontFamily: 'Georgia, serif' }}>Shelf III</span>
              </div>
              {/* Divider */}
              <div className="w-px h-4 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
              {/* Category buttons - all icons for this row */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShelf3Category(null)}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-sm transition-all border ${!shelf3Category ? 'bg-amber-700/70 text-amber-100 border-amber-500/50 shadow-inner' : 'text-amber-400/70 border-transparent hover:text-amber-300 hover:bg-amber-800/30'}`}
                >
                  All
                </button>
                {BOOK_CATEGORIES.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setShelf3Category(shelf3Category === cat.slug ? null : cat.slug)}
                    className={`p-1.5 rounded-sm transition-all border ${shelf3Category === cat.slug ? 'bg-amber-700/70 text-amber-100 border-amber-500/50 shadow-inner' : 'text-amber-400/70 border-transparent hover:text-amber-300 hover:bg-amber-800/30'}`}
                    title={cat.name}
                  >
                    <cat.icon className="w-3 h-3" />
                  </button>
                ))}
              </div>
              {/* Right decorative element */}
              <svg viewBox="0 0 16 8" className="w-4 h-2 text-amber-500/50 scale-x-[-1]">
                <path d="M0 4 L6 4 M8 0 L8 8" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Scrolls container */}
          <div className="relative mx-10">
            <div className="flex items-end justify-center gap-2.5 px-6 pb-0 min-h-[85px] flex-wrap overflow-hidden">
              {getShelfArticles(2, shelf3Category).map((article, idx) => {
                const categorySlug = article.category?.slug || 'default'
                const categoryTheme = CATEGORY_SCROLL_THEMES[categorySlug] || CATEGORY_SCROLL_THEMES.sustainability
                const articleProgress = readingProgress[article.id]
                const progressPercent = articleProgress?.scrollProgress || 0
                const isCompleted = articleProgress?.completed || false
                const isHovered = hoveredBook === article.id
                const rotation = ((idx * 11 + 3) % 5) - 2

                return (
                  <div
                    key={`shelf3-${article.id}`}
                    className={`flex-shrink-0 relative w-8 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 -translate-y-4 z-30' : 'z-10'} ${highlightScrolls ? 'scroll-highlight-glow' : ''}`}
                    style={{ marginBottom: '0px' }}
                    onMouseEnter={() => handleScrollHover(article)}
                    onMouseLeave={handleScrollLeave}
                    onClick={() => setPreviewArticle(article)}
                  >
                    {/* Highlight glow halo */}
                    {highlightScrolls && (
                      <div className="absolute -inset-2 bg-amber-400/40 rounded-lg blur-md animate-pulse" />
                    )}
                    {/* Scroll shadow on shelf */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-t from-amber-950/60 to-transparent blur-sm rounded-full" />
                    <div className="relative h-[75px]" style={{ transform: `rotate(${rotation}deg)` }}>
                      {/* Parchment body with texture */}
                      <div className={`absolute inset-x-0.5 top-4 bottom-4 bg-gradient-to-r ${categoryTheme.parchment} rounded-sm shadow-lg overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='1' height='1' fill='%23000' opacity='0.1'/%3E%3Crect x='12' y='8' width='1' height='1' fill='%23000' opacity='0.08'/%3E%3Crect x='6' y='14' width='1' height='1' fill='%23000' opacity='0.12'/%3E%3C/svg%3E")`,
                        }} />
                        {progressPercent > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-400/50 via-emerald-300/30 to-emerald-200/10 transition-all duration-500" style={{ height: `${progressPercent}%` }} />
                        )}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-px bg-gradient-to-b from-amber-600/20 via-amber-500/10 to-amber-600/20" />
                      </div>
                      {/* Top rod with ornate finial */}
                      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 rounded-t-sm shadow-lg">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-400/40 to-transparent rounded-t-sm" />
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40">
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
                        </div>
                      </div>
                      {/* Bottom rod with ornate finial */}
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-500 via-amber-600 to-amber-800 rounded-b-sm shadow-lg">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-amber-900/40 to-transparent rounded-b-sm" />
                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40">
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
                        </div>
                      </div>
                      {/* Wax seal with detailed design */}
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6">
                        <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-amber-950/50 rounded-full blur-sm" />
                        <div className={`relative w-full h-full bg-gradient-to-br ${isCompleted ? 'from-emerald-400 via-emerald-500 to-emerald-700' : categoryTheme.seal} rounded-full shadow-lg border border-white/20 flex items-center justify-center overflow-hidden`}>
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                          }} />
                          {isCompleted ? (
                            <svg className="w-3 h-3 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="w-2.5 h-2.5 border border-white/30 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* Ghost scrolls - transparent tan, filling the shelf */}
              {Array.from({ length: Math.max(0, 16 - getShelfArticles(2, shelf3Category).length) }).map((_, i) => (
                <div key={`ghost-shelf3-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                  <div className="h-[75px] relative">
                    {/* Ghost scroll body */}
                    <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                    {/* Top rod */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                    {/* Bottom rod */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                    {/* Subtle text lines */}
                    <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-4/5" />
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-3/5" />
                    </div>
                    {/* Ghost seal */}
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                  </div>
                </div>
              ))}
            </div>

            {/* Ornate Roman shelf surface with acanthus leaf corners - Enhanced */}
            <div className="h-10 bg-gradient-to-b from-amber-650 via-amber-750 to-amber-950 border-t-2 border-amber-400/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-500/30 to-transparent" />
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8 Q50 5 100 8 Q150 11 200 8' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M0 14 Q50 12 100 14 Q150 16 200 14' fill='none' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
              }} />
              <div className="absolute top-1.5 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              {/* Acanthus leaf corner decorations - matching Shelf 1/2 with night-time awareness */}
              <svg className={`absolute left-2 top-0.5 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'}`} viewBox="0 0 32 32">
                <path d="M4 28 Q10 20 16 16 Q10 12 4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 22 Q12 18 16 15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M8 16 Q12 14 14 13" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3"/>
              </svg>
              <svg className={`absolute right-2 top-0.5 w-8 h-8 ${isNightTime ? 'text-amber-400/50' : 'text-amber-500/40'} scale-x-[-1]`} viewBox="0 0 32 32">
                <path d="M4 28 Q10 20 16 16 Q10 12 4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 22 Q12 18 16 15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M8 16 Q12 14 14 13" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3"/>
              </svg>
              {/* Symmetric rosettes */}
              {[4, 15, 26, 37, 50, 63, 74, 85, 96].map((pos, i) => (
                <div key={`shelf3-rosette-${i}`} className="absolute top-3.5 -translate-x-1/2" style={{ left: `${pos}%` }}>
                  <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full shadow-md border border-yellow-300/40 relative overflow-hidden">
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-gradient-to-br from-yellow-200/70 to-transparent rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-amber-700/50 rounded-full" />
                  </div>
                </div>
              ))}
              <svg className="absolute bottom-0 left-0 right-0 h-2.5 opacity-50" preserveAspectRatio="none">
                <pattern id="shelf3EdgePattern" x="0" y="0" width="24" height="10" patternUnits="userSpaceOnUse">
                  <ellipse cx="7" cy="5" rx="5" ry="4" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                  <ellipse cx="7" cy="5" rx="2.5" ry="2" fill="#fbbf24" opacity="0.2"/>
                  <path d="M17 1 L18.5 8 L20 1" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#shelf3EdgePattern)"/>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-amber-950 to-transparent" />
            </div>
          </div>
        </div>

        {/* Roman-inspired bottom plinth with dentil molding - Enhanced */}
        <div className="h-12 bg-gradient-to-t from-amber-800 via-amber-850 to-amber-900 border-t-2 border-amber-600/40 relative overflow-hidden">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-amber-600/30 to-transparent" />
          {/* Dentil molding row - full width */}
          <div className="absolute top-1 left-0 right-0 h-3 overflow-hidden">
            <div className="flex justify-center">
              <div className="flex gap-0.5">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={`dentil-${i}`} className="w-2 h-3 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 shadow-sm rounded-b-sm" />
                ))}
              </div>
            </div>
          </div>
          {/* Carved wave pattern - refined */}
          <svg className="absolute bottom-0 left-0 right-0 h-5 opacity-50" preserveAspectRatio="none">
            <pattern id="bottomWaveRefined" x="0" y="0" width="48" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q12 4 24 10 Q36 16 48 10" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
              <path d="M0 15 Q12 10 24 15 Q36 20 48 15" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#bottomWaveRefined)"/>
          </svg>
          {/* Center ornament - enhanced */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 w-8 h-4 flex items-center justify-center">
            <div className="w-6 h-3 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent rounded-full" />
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* CONTENT SECTION - Below the bookshelf     */}
      {/* Search, Categories, and more              */}
      {/* ========================================== */}
      <div className="relative bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950">
        <div className="container mx-auto px-4 py-8 relative z-10 lg:px-[20%]">
          <div className="max-w-6xl mx-auto">

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

            {/* Scroll Preview Content - Unrolling ancient scroll */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full max-w-2xl mx-4 max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scroll container with rolled ends */}
              <div className="relative">
                {/* Top scroll roller - wooden rod */}
                <div className="relative h-8 z-20">
                  <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 rounded-t-full shadow-lg border-t-2 border-amber-600/60">
                    {/* Wood grain texture */}
                    <div className="absolute inset-0 opacity-30 rounded-t-full overflow-hidden" style={{
                      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)`,
                    }} />
                  </div>
                  {/* Brass end caps */}
                  <div className="absolute left-2 top-0 w-8 h-6 bg-gradient-to-b from-yellow-500 via-yellow-600 to-amber-700 rounded-t-lg shadow-md border-t border-yellow-400/50" />
                  <div className="absolute right-2 top-0 w-8 h-6 bg-gradient-to-b from-yellow-500 via-yellow-600 to-amber-700 rounded-t-lg shadow-md border-t border-yellow-400/50" />
                  {/* Close button on roller */}
                  <button
                    onClick={closePreview}
                    className="absolute right-14 top-0.5 w-5 h-5 bg-amber-600/80 hover:bg-amber-500 text-amber-100 rounded-full flex items-center justify-center transition-colors shadow z-30"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Parchment body */}
                <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 shadow-2xl overflow-hidden"
                  style={{ boxShadow: '0 25px 80px -15px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(139, 69, 19, 0.08)' }}
                >
                  {/* Aged parchment texture */}
                  <div className="absolute inset-0 opacity-40" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='parchmentNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.35 0 0 0 0 0.2 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23parchmentNoise)'/%3E%3C/svg%3E")`,
                  }} />
                  {/* Edge wear/aging */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-amber-300/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-amber-300/30 to-transparent pointer-events-none" />
                  {/* Scroll shadow from rollers */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-amber-900/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none" />

                  {/* Content area - WYSIWYG, no internal scroll */}
                  <div className="relative p-6 sm:p-8">
                    {/* Category seal */}
                    <div className="flex items-center justify-center mb-5">
                      <span className="px-4 py-1.5 text-[10px] font-bold text-amber-800 uppercase tracking-[0.2em] border-2 border-amber-600/50 bg-amber-200/60 rounded-sm shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
                        {previewArticle.category?.name || 'Article'}
                      </span>
                    </div>

                    {/* Cover image with parchment frame */}
                    {previewArticle.coverImage && (
                      <div className="relative w-full h-48 sm:h-56 overflow-hidden mb-6 border-4 border-amber-700/40 shadow-lg">
                        <img
                          src={previewArticle.coverImage}
                          alt={previewArticle.title}
                          className="w-full h-full object-cover sepia-[20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                      </div>
                    )}

                    {/* Title - rich sepia ink */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 text-center mb-4 leading-tight tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                      {previewArticle.title}
                    </h2>

                    {/* Decorative scroll divider */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
                      <svg className="w-6 h-6 text-amber-600/70" viewBox="0 0 24 24">
                        <path d="M12 4 L16 8 L12 12 L8 8 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.5"/>
                      </svg>
                      <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
                    </div>

                    {/* Excerpt - elegant calligraphy style */}
                    <p className="text-sm sm:text-base text-amber-900/90 text-center mb-6 leading-relaxed italic" style={{ fontFamily: 'Georgia, serif', lineHeight: '1.9' }}>
                      "{previewArticle.excerpt}"
                    </p>

                    {/* Author attribution - manuscript style */}
                    <div className="flex items-center justify-center gap-4 mb-6 py-4 border-y-2 border-amber-600/30">
                      <div className="w-12 h-12 rounded-full bg-amber-200 border-2 border-amber-600/50 flex items-center justify-center shadow-md overflow-hidden">
                        {previewArticle.author?.image ? (
                          <img src={previewArticle.author.image} alt={previewArticle.author.name} className="w-full h-full rounded-full object-cover sepia-[15%]" />
                        ) : (
                          <User className="w-6 h-6 text-amber-700" />
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-amber-900 text-base" style={{ fontFamily: 'Georgia, serif' }}>
                          {previewArticle.author?.name || 'Anonymous Scribe'}
                        </p>
                        <p className="text-xs text-amber-700" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                          {new Date(previewArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Stats - parchment ink style */}
                    <div className="flex items-center justify-center gap-6 mb-6 text-amber-800">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium" style={{ fontFamily: 'Georgia, serif' }}>{previewArticle.readTime} min</span>
                      </div>
                      <div className="w-1.5 h-1.5 bg-amber-600/60 rounded-full" />
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-medium" style={{ fontFamily: 'Georgia, serif' }}>{previewArticle.views} views</span>
                      </div>
                      <div className="w-1.5 h-1.5 bg-amber-600/60 rounded-full" />
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs font-medium" style={{ fontFamily: 'Georgia, serif' }}>{previewArticle._count?.comments || 0}</span>
                      </div>
                    </div>

                    {/* Reading progress if exists */}
                    {readingProgress[previewArticle.id] && (
                      <div className="mb-6 p-3 bg-amber-200/50 border-2 border-amber-600/40 rounded-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-amber-800 italic" style={{ fontFamily: 'Georgia, serif' }}>Your Progress</span>
                          <span className="text-xs font-bold text-amber-900">
                            {readingProgress[previewArticle.id].completed ? 'Completed' : `${Math.round(readingProgress[previewArticle.id].scrollProgress)}%`}
                          </span>
                        </div>
                        <div className="h-2 bg-amber-300/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-700 transition-all rounded-full"
                            style={{ width: `${readingProgress[previewArticle.id].scrollProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action buttons - brass/wood style */}
                    <div className="flex items-center justify-center gap-4">
                      <Link href={`/articles/${previewArticle.slug}`} onClick={closePreview}>
                        <Button className="bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 text-amber-100 font-bold px-8 py-3 rounded-sm shadow-lg border border-amber-600/60" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Unroll Scroll
                        </Button>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSaveArticle(previewArticle.id)
                        }}
                        className={`p-3 rounded-sm shadow-md transition-colors border-2 ${
                          savedArticles.includes(previewArticle.id)
                            ? 'bg-gradient-to-b from-amber-600 to-amber-800 text-amber-100 border-amber-500/60'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-500/50'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${savedArticles.includes(previewArticle.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom scroll roller - wooden rod */}
                <div className="relative h-8 z-20">
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-amber-700 via-amber-800 to-amber-900 rounded-b-full shadow-lg border-b-2 border-amber-600/60">
                    {/* Wood grain texture */}
                    <div className="absolute inset-0 opacity-30 rounded-b-full overflow-hidden" style={{
                      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)`,
                    }} />
                  </div>
                  {/* Brass end caps */}
                  <div className="absolute left-2 bottom-0 w-8 h-6 bg-gradient-to-t from-yellow-500 via-yellow-600 to-amber-700 rounded-b-lg shadow-md border-b border-yellow-400/50" />
                  <div className="absolute right-2 bottom-0 w-8 h-6 bg-gradient-to-t from-yellow-500 via-yellow-600 to-amber-700 rounded-b-lg shadow-md border-b border-yellow-400/50" />
                  {/* Decorative center medallion */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-10 h-5 bg-gradient-to-t from-yellow-500 to-yellow-600 rounded-b-full flex items-center justify-center border-b border-yellow-400/50">
                    <div className="w-3 h-3 rounded-full bg-amber-800/50 border border-yellow-400/60" />
                  </div>
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
            {/* ARTICLE GRID - Modern Card Layout         */}
            {/* Clean, theme-aware article display        */}
            {/* ========================================== */}
            <div className="space-y-8">

              {/* ========================================== */}
              {/* YOUR COLLECTION - Modern Card Row         */}
              {/* ========================================== */}
              {savedArticles.length > 0 && (
                <div className="bg-[var(--card)]/50 backdrop-blur-sm rounded-xl p-6 border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg">
                        <Bookmark className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">Your Collection</h3>
                        <p className="text-sm text-theme-muted">{savedArticles.length} saved articles</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {articles
                      .filter(a => savedArticles.includes(a.id))
                      .slice(0, 4)
                      .map((article) => {
                        const articleProg = readingProgress[article.id]
                        const progPercent = articleProg?.scrollProgress || 0
                        const isCompleted = articleProg?.completed || false
                        return (
                          <div
                            key={article.id}
                            onClick={() => setPreviewArticle(article)}
                            className="group cursor-pointer bg-[var(--card)] rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all hover:shadow-lg hover:-translate-y-1"
                          >
                            {article.coverImage && (
                              <div className="relative h-32 overflow-hidden">
                                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                {isCompleted && (
                                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="p-4">
                              <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">{article.category?.name || 'Article'}</span>
                              <h4 className="font-bold text-[var(--foreground)] mt-1 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">{article.title}</h4>
                              {progPercent > 0 && !isCompleted && (
                                <div className="mt-2 h-1 bg-[var(--muted)] rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 transition-all" style={{ width: `${progPercent}%` }} />
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* RECOMMENDED FOR YOU - Modern Card Row     */}
              {/* ========================================== */}
              {session && getRecommendedArticles().length > 0 && (
                <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-violet-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">Recommended For You</h3>
                        <p className="text-sm text-theme-muted">Based on your reading history</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {getRecommendedArticles().slice(0, 4).map((article) => (
                      <div
                        key={article.id}
                        onClick={() => setPreviewArticle(article)}
                        className="group cursor-pointer bg-[var(--card)] rounded-lg overflow-hidden border border-[var(--border)] hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1"
                      >
                        {article.coverImage && (
                          <div className="relative h-32 overflow-hidden">
                            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-violet-500/90 rounded-full">
                              <span className="text-[10px] font-bold text-white flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Recommended
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-4">
                          <span className="text-xs font-semibold text-violet-500 uppercase tracking-wide">{article.category?.name || 'Article'}</span>
                          <h4 className="font-bold text-[var(--foreground)] mt-1 line-clamp-2 group-hover:text-violet-500 transition-colors">{article.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* ALL ARTICLES - Responsive Card Grid       */}
              {/* ========================================== */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[var(--foreground)]">All Articles</h3>
                  <span className="text-sm text-theme-muted">{articles.length} articles</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {articles.map((article) => {
                    const articleProg = readingProgress[article.id]
                    const progPercent = articleProg?.scrollProgress || 0
                    const isCompleted = articleProg?.completed || false
                    const isSaved = savedArticles.includes(article.id)
                    const scrollAge = getScrollAge(article.publishedAt)
                    const category = BOOK_CATEGORIES.find(c => c.slug === article.category?.slug)

                    return (
                      <div
                        key={article.id}
                        onClick={() => setPreviewArticle(article)}
                        className="group cursor-pointer bg-[var(--card)] rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all hover:shadow-xl hover:-translate-y-1"
                      >
                        {/* Cover Image */}
                        <div className="relative h-40 overflow-hidden bg-[var(--muted)]">
                          {article.coverImage ? (
                            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${category?.color || 'from-emerald-500 to-emerald-700'} flex items-center justify-center`}>
                              {category && <category.icon className="w-12 h-12 text-white/30" />}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            {scrollAge === 'new' && (
                              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">NEW</span>
                            )}
                          </div>
                          <div className="absolute top-3 right-3 flex items-center gap-2">
                            {isSaved && (
                              <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                                <Bookmark className="w-3.5 h-3.5 text-white fill-current" />
                              </div>
                            )}
                            {isCompleted && (
                              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Category badge at bottom of image */}
                          <div className="absolute bottom-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${category?.color || 'from-emerald-500 to-emerald-700'} shadow-lg`}>
                              {article.category?.name || 'Article'}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h4 className="font-bold text-[var(--foreground)] text-lg leading-tight line-clamp-2 group-hover:text-[var(--primary)] transition-colors mb-2">{article.title}</h4>
                          <p className="text-sm text-theme-muted line-clamp-2 mb-4">{article.excerpt}</p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-theme-muted">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {article.readTime} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" />
                                {article.views}
                              </span>
                            </div>
                            {article.author && (
                              <span className="font-medium truncate max-w-[100px]">{article.author.name}</span>
                            )}
                          </div>

                          {/* Reading Progress */}
                          {progPercent > 0 && !isCompleted && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-emerald-500 font-medium">{Math.round(progPercent)}% read</span>
                              </div>
                              <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all rounded-full" style={{ width: `${progPercent}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {/* End Article Grid */}

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
