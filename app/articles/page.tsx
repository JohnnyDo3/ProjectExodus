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
  UserPlus,
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

  // ========== GRAND LIBRARY ENHANCED FEATURES ==========
  // Last read scroll tracking for feather bookmark
  const [lastReadScrollId, setLastReadScrollId] = useState<string | null>(null)

  // Dust puff particles on click
  const [dustPuffPosition, setDustPuffPosition] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false })


  // Adjacent scroll wobble tracking
  const [wobblingScrolls, setWobblingScrolls] = useState<Set<string>>(new Set())

  // Scroll unrolling animation state
  const [unrollingScroll, setUnrollingScroll] = useState<string | null>(null)

  // Parallax scroll position
  const [parallaxOffset, setParallaxOffset] = useState(0)

  // Get current season for decorations
  const getCurrentSeason = () => {
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) return 'spring'
    if (month >= 5 && month <= 7) return 'summer'
    if (month >= 8 && month <= 10) return 'autumn'
    return 'winter'
  }
  const currentSeason = getCurrentSeason()

  // Load last read scroll from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('lastReadScrollId')
    if (stored) setLastReadScrollId(stored)
  }, [])

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.3)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle dust puff on ancient scroll click
  const triggerDustPuff = (e: React.MouseEvent, scrollAge: string) => {
    if (scrollAge === 'ancient' || scrollAge === 'aged') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setDustPuffPosition({ x: rect.left + rect.width / 2, y: rect.top, active: true })
      setTimeout(() => setDustPuffPosition(prev => ({ ...prev, active: false })), 600)
    }
  }

  // Handle adjacent scroll wobble
  const triggerAdjacentWobble = (articleId: string, adjacentIds: string[]) => {
    const newWobbling = new Set(adjacentIds)
    setWobblingScrolls(newWobbling)
    setTimeout(() => setWobblingScrolls(new Set()), 400)
  }

  // Handle scroll click with unrolling animation
  const handleScrollClick = (article: Article, e: React.MouseEvent, scrollAge: string) => {
    triggerDustPuff(e, scrollAge)
    setUnrollingScroll(article.id)
    setLastReadScrollId(article.id)
    localStorage.setItem('lastReadScrollId', article.id)
    setTimeout(() => {
      setUnrollingScroll(null)
      setPreviewArticle(article)
    }, 400)
  }

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

  // Get mixed shelf items (articles interspersed with ghost scrolls randomly)
  const getShelfWithGhosts = useCallback((shelfIndex: number, categoryFilter: string | null, totalSlots: number = 16) => {
    const shelfArticles = getShelfArticles(shelfIndex, categoryFilter)
    const ghostCount = Math.max(0, totalSlots - shelfArticles.length)

    // Create array of items: articles and ghost placeholders
    const items: Array<{ type: 'article' | 'ghost', article?: typeof shelfArticles[0], ghostIndex?: number }> = []

    // Add all articles
    shelfArticles.forEach(article => {
      items.push({ type: 'article', article })
    })

    // Add ghost placeholders
    for (let i = 0; i < ghostCount; i++) {
      items.push({ type: 'ghost', ghostIndex: i })
    }

    // Shuffle using seeded random (consistent per shelf based on shelfIndex)
    // Use Fisher-Yates shuffle with deterministic seed
    const seed = shelfIndex * 1000 + items.length
    const shuffled = [...items]
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Use a simple seeded random: (seed * (i + 1) * 9301 + 49297) % 233280
      const randomValue = ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280
      const j = Math.floor(randomValue * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }, [getShelfArticles])

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

  // Full interactive page - now accessible to all users (authenticated and non-authenticated)
  // Non-authenticated users can interact with the bookshelf but must sign up to read articles
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
          {/* GRAND LIBRARY ARCHITECTURAL ELEMENTS      */}
          {/* ========================================== */}

          {/* Coffered Ceiling with ornate beams - parallax effect */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-5 overflow-hidden hidden lg:block"
            style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
          >
            {/* Main ceiling surface */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/95 via-amber-800/90 to-transparent">
              {/* Coffered grid pattern */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 60">
                {/* Horizontal beams */}
                <defs>
                  <linearGradient id="beamGradientH" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#92400e" />
                    <stop offset="40%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#451a03" />
                  </linearGradient>
                  <linearGradient id="beamHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(251,191,36,0.3)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {/* Main horizontal beams */}
                <rect x="0" y="10" width="400" height="8" fill="url(#beamGradientH)" />
                <rect x="0" y="10" width="400" height="2" fill="url(#beamHighlight)" />
                <rect x="0" y="40" width="400" height="6" fill="url(#beamGradientH)" />
                <rect x="0" y="40" width="400" height="1.5" fill="url(#beamHighlight)" />
                {/* Vertical beam segments creating coffers */}
                {[0, 50, 100, 150, 200, 250, 300, 350].map((x, i) => (
                  <g key={`coffer-${i}`}>
                    <rect x={x} y="10" width="6" height="36" fill="url(#beamGradientH)" />
                    <rect x={x} y="10" width="1.5" height="36" fill="url(#beamHighlight)" />
                    {/* Decorative rosette in each coffer */}
                    <circle cx={x + 25} cy="28" r="8" fill="none" stroke="#d97706" strokeWidth="0.5" opacity="0.4" />
                    <circle cx={x + 25} cy="28" r="4" fill="#b45309" opacity="0.3" />
                    <circle cx={x + 25} cy="28" r="1.5" fill="#fbbf24" opacity="0.4" />
                  </g>
                ))}
              </svg>
              {/* Candlelight glow on ceiling from below */}
              <div className={`absolute bottom-0 left-1/4 w-1/2 h-16 ${isNightTime ? 'opacity-40' : 'opacity-15'}`}
                style={{
                  background: 'radial-gradient(ellipse 100% 200% at 50% 100%, rgba(251,191,36,0.4), transparent)',
                  filter: 'blur(8px)',
                }}
              />
            </div>
            {/* Decorative crown molding */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 border-b border-amber-500/30">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 12">
                <path d="M0 6 Q10 2 20 6 Q30 10 40 6 Q50 2 60 6 Q70 10 80 6 Q90 2 100 6 Q110 10 120 6 Q130 2 140 6 Q150 10 160 6 Q170 2 180 6 Q190 10 200 6"
                  fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Marble Floor with mosaic pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-5 overflow-hidden hidden lg:block">
            {/* Floor surface with perspective */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-800/95 via-stone-700/85 to-transparent">
              {/* Marble veining pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 400 40">
                <defs>
                  <linearGradient id="marbleVein" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d6d3d1" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#a8a29e" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#78716c" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Marble tile grid */}
                {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => (
                  <g key={`tile-${i}`}>
                    <rect x={x} y="0" width="40" height="40" fill="none" stroke="#57534e" strokeWidth="0.5" />
                    {/* Veining in each tile */}
                    <path d={`M${x + 5} 5 Q${x + 20} 15 ${x + 35} 25`} fill="none" stroke="url(#marbleVein)" strokeWidth="1" />
                    <path d={`M${x + 10} 30 Q${x + 25} 20 ${x + 38} 8`} fill="none" stroke="url(#marbleVein)" strokeWidth="0.5" />
                  </g>
                ))}
              </svg>
              {/* Reflection of candlelight on floor */}
              <div className={`absolute top-0 left-1/3 w-1/3 h-8 ${isNightTime ? 'opacity-25' : 'opacity-10'}`}
                style={{
                  background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(251,191,36,0.3), transparent)',
                  filter: 'blur(4px)',
                }}
              />
            </div>
            {/* Decorative floor border */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-800 to-stone-700 border-t border-amber-600/30" />
          </div>

          {/* Spider Web in corner - subtle atmospheric detail */}
          <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-10 hidden lg:block opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Radial web strands from corner */}
              <defs>
                <linearGradient id="webStrand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Main radial strands */}
              <line x1="0" y1="0" x2="100" y2="100" stroke="url(#webStrand)" strokeWidth="0.5" className="web-sway" />
              <line x1="0" y1="0" x2="100" y2="50" stroke="url(#webStrand)" strokeWidth="0.5" className="web-sway" style={{ animationDelay: '0.5s' }} />
              <line x1="0" y1="0" x2="50" y2="100" stroke="url(#webStrand)" strokeWidth="0.5" className="web-sway" style={{ animationDelay: '1s' }} />
              <line x1="0" y1="0" x2="100" y2="25" stroke="url(#webStrand)" strokeWidth="0.4" className="web-sway" style={{ animationDelay: '1.5s' }} />
              <line x1="0" y1="0" x2="25" y2="100" stroke="url(#webStrand)" strokeWidth="0.4" className="web-sway" style={{ animationDelay: '2s' }} />
              {/* Spiral connecting strands */}
              <path d="M10 10 Q30 15 25 30 Q20 45 35 45 Q50 45 50 60 Q50 75 65 80"
                fill="none" stroke="url(#webStrand)" strokeWidth="0.3" className="web-sway" style={{ animationDelay: '0.3s' }} />
              <path d="M5 20 Q20 25 20 40 Q20 55 35 60 Q50 65 55 80"
                fill="none" stroke="url(#webStrand)" strokeWidth="0.3" className="web-sway" style={{ animationDelay: '0.7s' }} />
              <path d="M20 5 Q25 20 40 22 Q55 24 60 40 Q65 56 80 62"
                fill="none" stroke="url(#webStrand)" strokeWidth="0.3" className="web-sway" style={{ animationDelay: '1.2s' }} />
              {/* Tiny dew drops on web */}
              {isNightTime && (
                <>
                  <circle cx="25" cy="25" r="1" fill="#e5e7eb" opacity="0.6" />
                  <circle cx="45" cy="35" r="0.8" fill="#e5e7eb" opacity="0.5" />
                  <circle cx="60" cy="55" r="1.2" fill="#e5e7eb" opacity="0.4" />
                </>
              )}
            </svg>
          </div>

          {/* Seasonal Decorations */}
          {currentSeason === 'winter' && (
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden hidden lg:block">
              {/* Subtle snowflakes drifting */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`snowflake-${i}`}
                  className="absolute snowfall"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: '-20px',
                    '--snow-delay': `${i * 0.8}s`,
                    '--snow-duration': `${8 + i * 0.5}s`,
                    '--snow-drift': `${(i % 2 ? 1 : -1) * (10 + i * 5)}px`,
                  } as React.CSSProperties}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" className="text-white/30">
                    <path d="M12 0 L12 24 M0 12 L24 12 M3.5 3.5 L20.5 20.5 M20.5 3.5 L3.5 20.5"
                      stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
              ))}
              {/* Frost on edges */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-100/10 to-transparent" />
            </div>
          )}

          {currentSeason === 'autumn' && (
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden hidden lg:block">
              {/* Falling leaves */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={`leaf-${i}`}
                  className="absolute"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: '-30px',
                    animation: `leaf-fall ${10 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 2}s`,
                  }}
                >
                  <svg width="16" height="20" viewBox="0 0 16 20" className={i % 2 ? 'text-orange-600/40' : 'text-amber-700/40'}>
                    <path d="M8 0 Q12 5 12 10 Q12 18 8 20 Q4 18 4 10 Q4 5 8 0" fill="currentColor" />
                    <path d="M8 2 L8 18" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {currentSeason === 'spring' && (
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden hidden lg:block">
              {/* Floating pollen/petals */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`petal-${i}`}
                  className="absolute dust-mote"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i * 13) % 60}%`,
                    '--dust-dx': `${20 + i * 5}px`,
                    '--dust-dy': `${-30 - i * 10}px`,
                    '--dust-duration': `${12 + i * 2}s`,
                    '--dust-delay': `${i * 1.5}s`,
                  } as React.CSSProperties}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" className="text-pink-300/50">
                    <ellipse cx="4" cy="4" rx="3" ry="2" fill="currentColor" />
                  </svg>
                </div>
              ))}
            </div>
          )}

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
                {/* Architecturally Accurate Corinthian Capital */}
                <div className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-600/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 64" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`} preserveAspectRatio="xMidYMid meet">
                    {/* === ABACUS (Top plate with concave sides) === */}
                    <path d="M1 0 L31 0 L31 4 Q24 5 16 5 Q8 5 1 4 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M2 2 L30 2" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>

                    {/* === VOLUTES (Corner spirals) === */}
                    {/* Left volute */}
                    <path d="M3 6 Q1 6 1 8 Q1 10 3 10 Q5 10 5 8 Q5 7 4 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="3.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>
                    {/* Right volute */}
                    <path d="M29 6 Q31 6 31 8 Q31 10 29 10 Q27 10 27 8 Q27 7 28 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="28.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>

                    {/* === HELICES (Small spirals under volutes) === */}
                    <path d="M5 10 Q7 12 6 14 Q5 15 4 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M27 10 Q25 12 26 14 Q27 15 28 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>

                    {/* === CENTRAL FLEURON (Flower/rosette) === */}
                    <circle cx="16" cy="12" r="3.5" fill="currentColor" opacity="0.15"/>
                    <circle cx="16" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="12" r="1.2" fill="currentColor" opacity="0.5"/>
                    {/* Fleuron petals */}
                    <path d="M16 8.5 Q17 10 16 11 Q15 10 16 8.5" fill="currentColor" opacity="0.3"/>
                    <path d="M12.5 12 Q14 13 15 12 Q14 11 12.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M19.5 12 Q18 13 17 12 Q18 11 19.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M16 15.5 Q17 14 16 13 Q15 14 16 15.5" fill="currentColor" opacity="0.3"/>

                    {/* === CAULICOLI (Stems emerging from leaves) === */}
                    <path d="M7 14 Q8 18 6 22 Q5 24 6 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M25 14 Q24 18 26 22 Q27 24 26 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>

                    {/* === SECOND ROW ACANTHUS LEAVES (8 leaves) === */}
                    {/* Left outer leaf */}
                    <path d="M2 18 Q0 28 2 38 Q3 36 4 38 Q3 30 2 22" fill="currentColor" opacity="0.2"/>
                    <path d="M2 20 Q1 28 2 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M2 24 Q3.5 26 2 28 M2 30 Q3.5 32 2 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>

                    {/* Left-center leaf */}
                    <path d="M8 18 Q5 28 7 40 Q9 38 10 40 Q8 30 8 22" fill="currentColor" opacity="0.2"/>
                    <path d="M8 20 Q6 30 7 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M7 26 Q9 28 7 30 M7 32 Q9 34 7 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>

                    {/* Center-left leaf */}
                    <path d="M13 16 Q10 28 12 42 Q14 40 15 42 Q13 30 13 20" fill="currentColor" opacity="0.2"/>
                    <path d="M13 18 Q11 30 12 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M12 28 Q14 30 12 32 M12 34 Q14 36 12 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>

                    {/* Center-right leaf */}
                    <path d="M19 16 Q22 28 20 42 Q18 40 17 42 Q19 30 19 20" fill="currentColor" opacity="0.2"/>
                    <path d="M19 18 Q21 30 20 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M20 28 Q18 30 20 32 M20 34 Q18 36 20 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>

                    {/* Right-center leaf */}
                    <path d="M24 18 Q27 28 25 40 Q23 38 22 40 Q24 30 24 22" fill="currentColor" opacity="0.2"/>
                    <path d="M24 20 Q26 30 25 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M25 26 Q23 28 25 30 M25 32 Q23 34 25 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>

                    {/* Right outer leaf */}
                    <path d="M30 18 Q32 28 30 38 Q29 36 28 38 Q29 30 30 22" fill="currentColor" opacity="0.2"/>
                    <path d="M30 20 Q31 28 30 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M30 24 Q28.5 26 30 28 M30 30 Q28.5 32 30 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>

                    {/* === FIRST ROW ACANTHUS LEAVES (Lower, larger leaves) === */}
                    {/* Far left base leaf */}
                    <path d="M3 38 Q0 48 3 58 Q5 54 6 58 Q4 48 4 42" fill="currentColor" opacity="0.25"/>
                    <path d="M3 40 Q1 50 3 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M3 46 Q5 48 3 50 M3 52 Q5 54 3 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>

                    {/* Left base leaf */}
                    <path d="M10 36 Q6 48 9 60 Q11 56 13 60 Q10 48 10 40" fill="currentColor" opacity="0.25"/>
                    <path d="M10 38 Q7 50 9 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M9 46 Q11 48 9 50 M9 52 Q11 54 9 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>

                    {/* Center leaf (main) */}
                    <path d="M16 34 Q12 48 15 62 Q16 58 17 62 Q20 48 16 38" fill="currentColor" opacity="0.3"/>
                    <path d="M16 36 Q13 50 15 60" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <path d="M15 46 Q17 48 15 50 M15 52 Q17 54 15 56 M15 58 Q17 60 15 62" fill="none" stroke="currentColor" strokeWidth="0.4"/>

                    {/* Right base leaf */}
                    <path d="M22 36 Q26 48 23 60 Q21 56 19 60 Q22 48 22 40" fill="currentColor" opacity="0.25"/>
                    <path d="M22 38 Q25 50 23 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M23 46 Q21 48 23 50 M23 52 Q21 54 23 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>

                    {/* Far right base leaf */}
                    <path d="M29 38 Q32 48 29 58 Q27 54 26 58 Q28 48 28 42" fill="currentColor" opacity="0.25"/>
                    <path d="M29 40 Q31 50 29 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M29 46 Q27 48 29 50 M29 52 Q27 54 29 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>

                    {/* === BELL (Kalathos) outline visible between leaves === */}
                    <path d="M6 56 Q6 50 8 44 Q10 38 14 34 M26 56 Q26 50 24 44 Q22 38 18 34" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
                  </svg>
                  {/* Depth shadow at bottom of capital */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-900/40 to-transparent" />
                  {/* Light-aware highlight on capital */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-700/20 to-transparent ${isNightTime ? 'opacity-50' : 'opacity-25'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 overflow-hidden bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`left-outer-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600 via-amber-500/60 to-amber-700/80 border-y border-amber-600/60" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600 via-amber-500/60 to-amber-700/80 border-y border-amber-600/60" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-amber-600/60 to-transparent ${isNightTime ? 'opacity-80' : 'opacity-60'}`} />
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-amber-600/60 to-transparent" />
                </div>
                {/* Enhanced Attic base with torus and scotia moldings */}
                <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to top, #b45309, #a16207, #92400e)', borderTop: '2px solid rgba(245, 158, 11, 0.4)' }}>
                  {/* Upper torus */}
                  <div className="absolute top-1.5 left-0.5 right-0.5 h-2 bg-gradient-to-b from-amber-700/60 via-amber-600/40 to-amber-800/50 rounded-full" />
                  {/* Scotia (concave) */}
                  <div className="absolute top-4 left-1 right-1 h-2 bg-gradient-to-b from-amber-800/60 to-amber-700/40" style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.2)' }} />
                  {/* Lower torus */}
                  <div className="absolute top-7 left-0 right-0 h-2 bg-gradient-to-b from-amber-700/50 via-amber-600/30 to-amber-800/40 rounded-full" />
                  {/* Plinth */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-amber-800 to-amber-750 border-t border-amber-600/30" />
                </div>
              </div>

              {/* ====== INNER ORNATE BORDER (Right Edge - facing content) with INTEGRATED SCONCES - Enhanced ====== */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-800 via-amber-700 to-amber-800 z-10 border-l-2 border-amber-500/50 shadow-xl overflow-visible">
                {/* Architecturally Accurate Corinthian Capital */}
                <div className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-600/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 64" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`} preserveAspectRatio="xMidYMid meet">
                    {/* === ABACUS (Top plate with concave sides) === */}
                    <path d="M1 0 L31 0 L31 4 Q24 5 16 5 Q8 5 1 4 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M2 2 L30 2" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
                    {/* === VOLUTES (Corner spirals) === */}
                    <path d="M3 6 Q1 6 1 8 Q1 10 3 10 Q5 10 5 8 Q5 7 4 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="3.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>
                    <path d="M29 6 Q31 6 31 8 Q31 10 29 10 Q27 10 27 8 Q27 7 28 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="28.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>
                    {/* === HELICES === */}
                    <path d="M5 10 Q7 12 6 14 Q5 15 4 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M27 10 Q25 12 26 14 Q27 15 28 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* === CENTRAL FLEURON === */}
                    <circle cx="16" cy="12" r="3.5" fill="currentColor" opacity="0.15"/>
                    <circle cx="16" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="12" r="1.2" fill="currentColor" opacity="0.5"/>
                    <path d="M16 8.5 Q17 10 16 11 Q15 10 16 8.5" fill="currentColor" opacity="0.3"/>
                    <path d="M12.5 12 Q14 13 15 12 Q14 11 12.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M19.5 12 Q18 13 17 12 Q18 11 19.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M16 15.5 Q17 14 16 13 Q15 14 16 15.5" fill="currentColor" opacity="0.3"/>
                    {/* === CAULICOLI === */}
                    <path d="M7 14 Q8 18 6 22 Q5 24 6 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M25 14 Q24 18 26 22 Q27 24 26 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    {/* === SECOND ROW ACANTHUS === */}
                    <path d="M2 18 Q0 28 2 38 Q3 36 4 38 Q3 30 2 22" fill="currentColor" opacity="0.2"/>
                    <path d="M2 20 Q1 28 2 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M2 24 Q3.5 26 2 28 M2 30 Q3.5 32 2 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M8 18 Q5 28 7 40 Q9 38 10 40 Q8 30 8 22" fill="currentColor" opacity="0.2"/>
                    <path d="M8 20 Q6 30 7 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M7 26 Q9 28 7 30 M7 32 Q9 34 7 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M13 16 Q10 28 12 42 Q14 40 15 42 Q13 30 13 20" fill="currentColor" opacity="0.2"/>
                    <path d="M13 18 Q11 30 12 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M12 28 Q14 30 12 32 M12 34 Q14 36 12 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M19 16 Q22 28 20 42 Q18 40 17 42 Q19 30 19 20" fill="currentColor" opacity="0.2"/>
                    <path d="M19 18 Q21 30 20 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M20 28 Q18 30 20 32 M20 34 Q18 36 20 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M24 18 Q27 28 25 40 Q23 38 22 40 Q24 30 24 22" fill="currentColor" opacity="0.2"/>
                    <path d="M24 20 Q26 30 25 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M25 26 Q23 28 25 30 M25 32 Q23 34 25 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M30 18 Q32 28 30 38 Q29 36 28 38 Q29 30 30 22" fill="currentColor" opacity="0.2"/>
                    <path d="M30 20 Q31 28 30 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M30 24 Q28.5 26 30 28 M30 30 Q28.5 32 30 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    {/* === FIRST ROW ACANTHUS === */}
                    <path d="M3 38 Q0 48 3 58 Q5 54 6 58 Q4 48 4 42" fill="currentColor" opacity="0.25"/>
                    <path d="M3 40 Q1 50 3 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M3 46 Q5 48 3 50 M3 52 Q5 54 3 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M10 36 Q6 48 9 60 Q11 56 13 60 Q10 48 10 40" fill="currentColor" opacity="0.25"/>
                    <path d="M10 38 Q7 50 9 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M9 46 Q11 48 9 50 M9 52 Q11 54 9 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M16 34 Q12 48 15 62 Q16 58 17 62 Q20 48 16 38" fill="currentColor" opacity="0.3"/>
                    <path d="M16 36 Q13 50 15 60" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <path d="M15 46 Q17 48 15 50 M15 52 Q17 54 15 56 M15 58 Q17 60 15 62" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                    <path d="M22 36 Q26 48 23 60 Q21 56 19 60 Q22 48 22 40" fill="currentColor" opacity="0.25"/>
                    <path d="M22 38 Q25 50 23 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M23 46 Q21 48 23 50 M23 52 Q21 54 23 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M29 38 Q32 48 29 58 Q27 54 26 58 Q28 48 28 42" fill="currentColor" opacity="0.25"/>
                    <path d="M29 40 Q31 50 29 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M29 46 Q27 48 29 50 M29 52 Q27 54 29 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    {/* === BELL outline === */}
                    <path d="M6 56 Q6 50 8 44 Q10 38 14 34 M26 56 Q26 50 24 44 Q22 38 18 34" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-900/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-700/20 to-transparent ${isNightTime ? 'opacity-50' : 'opacity-25'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750 overflow-hidden">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`left-inner-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-700/50 via-amber-600/30 to-amber-800/40 border-y border-amber-700/30" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-700/50 via-amber-600/30 to-amber-800/40 border-y border-amber-700/30" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-amber-500/60 to-transparent ${isNightTime ? 'opacity-80' : 'opacity-60'}`} />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-amber-600/60 to-transparent" />
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
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-800" />
                          {/* Glowing wick tip - where flame meets wick */}
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-orange-500 rounded-full blur-[0.5px]" style={{ boxShadow: '0 0 2px 0.5px rgba(251, 191, 36, 0.8)' }} />
                          {/* Flame - sits directly on wick tip */}
                          <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-70'}`}>
                            {/* Outer ambient glow - largest, softest */}
                            <div className="absolute -inset-3 bg-gradient-radial from-orange-400/40 via-amber-400/20 to-transparent rounded-full blur-lg" />
                            {/* Secondary glow ring */}
                            <div className="absolute -inset-1.5 bg-gradient-radial from-yellow-400/50 via-orange-300/25 to-transparent rounded-full blur-md" />
                            {/* Outer flame - teardrop shape, bottom connects to wick */}
                            <div
                              className="relative w-2 h-3 rounded-full animate-pulse"
                              style={{
                                background: 'linear-gradient(to top, #dc2626 0%, #ea580c 20%, #f97316 40%, #fbbf24 70%, #fef3c7 95%)',
                                clipPath: 'ellipse(50% 50% at 50% 55%)',
                                filter: 'blur(0.3px)',
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: '0.6s'
                              }}
                            />
                            {/* Middle flame layer */}
                            <div
                              className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full"
                              style={{
                                background: 'linear-gradient(to top, #ea580c 0%, #f97316 30%, #fbbf24 60%, #fef9c3 100%)',
                                clipPath: 'ellipse(45% 50% at 50% 50%)',
                                filter: 'blur(0.2px)',
                                animation: `flame-dance ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                              }}
                            />
                            {/* Inner blue-white core - hottest part, sits at wick connection */}
                            <div
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1.5 rounded-full"
                              style={{
                                background: 'linear-gradient(to top, #60a5fa 0%, #93c5fd 30%, #fef3c7 60%, #fbbf24 100%)',
                                clipPath: 'ellipse(40% 50% at 50% 60%)',
                                filter: 'blur(0.2px)',
                                animation: `flame-core ${0.3 + i * 0.08}s ease-in-out infinite alternate`,
                              }}
                            />
                            {/* Flame tip - flickering point */}
                            <div
                              className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1"
                              style={{
                                background: 'linear-gradient(to top, #fef3c7, #ffffff)',
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                filter: 'blur(0.3px)',
                                animation: `flame-tip ${0.25 + i * 0.05}s ease-in-out infinite`,
                              }}
                            />
                            {/* Smoke wisps - subtle, more visible during day when flames are dimmer */}
                            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-4 pointer-events-none ${isNightTime ? 'opacity-15' : 'opacity-30'}`}>
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
                        {/* Bobeche (cup) - ornate candle holder with scalloped rim */}
                        <div className={`relative w-5 h-3.5 ${isNightTime ? 'brightness-110' : ''}`}>
                          {/* Scalloped decorative rim - top edge */}
                          <svg className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-2" viewBox="0 0 24 8">
                            <path d="M2 4 Q4 1 6 4 Q8 7 10 4 Q12 1 14 4 Q16 7 18 4 Q20 1 22 4" fill="none" stroke="#fef3c7" strokeWidth="1" opacity="0.6"/>
                            <path d="M3 5 Q5 3 7 5 Q9 7 11 5 Q13 3 15 5 Q17 7 19 5 Q21 3 23 5" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.4"/>
                          </svg>
                          {/* Main cup body with curved bowl shape */}
                          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-700 rounded-b-lg shadow-lg overflow-hidden" style={{ borderRadius: '0 0 50% 50% / 0 0 80% 80%' }}>
                            {/* Inner bowl shadow for depth */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-gradient-to-b from-amber-800/60 to-transparent rounded-b-full" />
                            {/* Decorative bead band */}
                            <div className="absolute top-1 left-0 right-0 flex justify-center gap-0.5">
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/70" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/70" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/70" />
                            </div>
                            {/* Engraved line detail */}
                            <div className="absolute top-2 left-0.5 right-0.5 h-px bg-gradient-to-r from-amber-800/30 via-amber-600/50 to-amber-800/30" />
                            {/* Inner glow from candle */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-1.5 bg-gradient-to-b from-orange-400/40 to-transparent rounded-b-full blur-[1px] ${isNightTime ? 'opacity-80' : 'opacity-40'}`} />
                          </div>
                          {/* Rim highlight */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/30 via-yellow-300/70 to-amber-500/30 rounded-t-sm" />
                          {/* Side highlights for 3D effect */}
                          <div className="absolute top-0.5 left-0 w-0.5 h-2 bg-gradient-to-b from-yellow-300/50 to-transparent rounded-l-full" />
                          <div className="absolute top-0.5 right-0 w-0.5 h-2 bg-gradient-to-b from-amber-800/40 to-transparent rounded-r-full" />
                        </div>
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
                <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: 'linear-gradient(to top, #b45309, #a16207, #92400e)', borderTop: '2px solid rgba(245, 158, 11, 0.4)' }}>
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
                    <div className="h-4 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #b45309, #92400e, #451a03)', borderTop: '2px solid rgba(245, 158, 11, 0.4)' }}>
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.2), transparent)' }} />
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

                        // Get adjacent scroll IDs for wobble effect
                        const adjacentIds = shelfArticles
                          .filter((_, idx) => Math.abs(idx - i) === 1)
                          .map(a => a.id)
                        const isWobbling = wobblingScrolls.has(article.id)
                        const isLastRead = lastReadScrollId === article.id
                        const isUnrolling = unrollingScroll === article.id

                        return (
                          <div
                            key={article.id}
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 quill-cursor ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''} ${highlightScrolls ? 'scroll-highlight-glow' : ''} ${isWobbling ? 'scroll-wobble' : ''} ${isUnrolling ? 'scale-105' : ''}`}
                            style={{
                              transform: `rotate(${(i % 2 - 0.5) * 3}deg)`,
                              '--base-rotation': `${(i % 2 - 0.5) * 3}deg`,
                            } as React.CSSProperties}
                            onMouseEnter={() => {
                              handleScrollHover(article)
                              triggerAdjacentWobble(article.id, adjacentIds)
                            }}
                            onMouseLeave={handleScrollLeave}
                            onClick={(e) => handleScrollClick(article, e, scrollAge)}
                          >
                            {/* Feather bookmark for last-read scroll */}
                            {isLastRead && (
                              <div className="absolute -top-4 -right-2 z-20 feather-bookmark pointer-events-none">
                                <svg width="16" height="20" viewBox="0 0 16 20" className="text-amber-600 drop-shadow-md">
                                  <path d="M8 0 Q12 4 12 10 Q12 16 8 20 Q8 14 4 10 Q4 6 8 0" fill="currentColor" />
                                  <path d="M8 2 Q10 5 10 10 Q10 14 8 18" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                                </svg>
                              </div>
                            )}
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
                          </div>
                        )
                      })}
                      {/* Ghost scrolls - transparent tan, filling the shelf (skip first one near candle) */}
                      {Array.from({ length: Math.max(0, 6 - shelfArticles.length) }).map((_, i) => {
                        // Skip the first ghost scroll on each shelf as it's near the candle
                        if (i === 0) return null
                        return (
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
                        )
                      })}
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
                {/* Architecturally Accurate Corinthian Capital */}
                <div className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-600/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 64" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`} preserveAspectRatio="xMidYMid meet">
                    {/* === ABACUS === */}
                    <path d="M1 0 L31 0 L31 4 Q24 5 16 5 Q8 5 1 4 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M2 2 L30 2" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
                    {/* === VOLUTES === */}
                    <path d="M3 6 Q1 6 1 8 Q1 10 3 10 Q5 10 5 8 Q5 7 4 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="3.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>
                    <path d="M29 6 Q31 6 31 8 Q31 10 29 10 Q27 10 27 8 Q27 7 28 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="28.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>
                    {/* === HELICES === */}
                    <path d="M5 10 Q7 12 6 14 Q5 15 4 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M27 10 Q25 12 26 14 Q27 15 28 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* === FLEURON === */}
                    <circle cx="16" cy="12" r="3.5" fill="currentColor" opacity="0.15"/>
                    <circle cx="16" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="12" r="1.2" fill="currentColor" opacity="0.5"/>
                    <path d="M16 8.5 Q17 10 16 11 Q15 10 16 8.5" fill="currentColor" opacity="0.3"/>
                    <path d="M12.5 12 Q14 13 15 12 Q14 11 12.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M19.5 12 Q18 13 17 12 Q18 11 19.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M16 15.5 Q17 14 16 13 Q15 14 16 15.5" fill="currentColor" opacity="0.3"/>
                    {/* === CAULICOLI === */}
                    <path d="M7 14 Q8 18 6 22 Q5 24 6 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M25 14 Q24 18 26 22 Q27 24 26 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    {/* === SECOND ROW ACANTHUS === */}
                    <path d="M2 18 Q0 28 2 38 Q3 36 4 38 Q3 30 2 22" fill="currentColor" opacity="0.2"/>
                    <path d="M2 20 Q1 28 2 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M2 24 Q3.5 26 2 28 M2 30 Q3.5 32 2 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M8 18 Q5 28 7 40" fill="currentColor" opacity="0.2"/>
                    <path d="M8 20 Q6 30 7 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M7 26 Q9 28 7 30 M7 32 Q9 34 7 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M13 16 Q10 28 12 42" fill="currentColor" opacity="0.2"/>
                    <path d="M13 18 Q11 30 12 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M12 28 Q14 30 12 32 M12 34 Q14 36 12 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M19 16 Q22 28 20 42" fill="currentColor" opacity="0.2"/>
                    <path d="M19 18 Q21 30 20 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M20 28 Q18 30 20 32 M20 34 Q18 36 20 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M24 18 Q27 28 25 40" fill="currentColor" opacity="0.2"/>
                    <path d="M24 20 Q26 30 25 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M25 26 Q23 28 25 30 M25 32 Q23 34 25 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M30 18 Q32 28 30 38" fill="currentColor" opacity="0.2"/>
                    <path d="M30 20 Q31 28 30 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M30 24 Q28.5 26 30 28 M30 30 Q28.5 32 30 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    {/* === FIRST ROW ACANTHUS === */}
                    <path d="M3 38 Q0 48 3 58" fill="currentColor" opacity="0.25"/>
                    <path d="M3 40 Q1 50 3 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M3 46 Q5 48 3 50 M3 52 Q5 54 3 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M10 36 Q6 48 9 60" fill="currentColor" opacity="0.25"/>
                    <path d="M10 38 Q7 50 9 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M9 46 Q11 48 9 50 M9 52 Q11 54 9 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M16 34 Q12 48 15 62 Q16 58 17 62 Q20 48 16 38" fill="currentColor" opacity="0.3"/>
                    <path d="M16 36 Q13 50 15 60" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <path d="M15 46 Q17 48 15 50 M15 52 Q17 54 15 56 M15 58 Q17 60 15 62" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                    <path d="M22 36 Q26 48 23 60" fill="currentColor" opacity="0.25"/>
                    <path d="M22 38 Q25 50 23 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M23 46 Q21 48 23 50 M23 52 Q21 54 23 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M29 38 Q32 48 29 58" fill="currentColor" opacity="0.25"/>
                    <path d="M29 40 Q31 50 29 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M29 46 Q27 48 29 50 M29 52 Q27 54 29 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    {/* === BELL outline === */}
                    <path d="M6 56 Q6 50 8 44 Q10 38 14 34 M26 56 Q26 50 24 44 Q22 38 18 34" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-900/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-700/20 to-transparent ${isNightTime ? 'opacity-50' : 'opacity-25'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 overflow-hidden bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`right-outer-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-700/50 via-amber-600/30 to-amber-800/40 border-y border-amber-700/30" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-700/50 via-amber-600/30 to-amber-800/40 border-y border-amber-700/30" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-amber-500/60 to-transparent ${isNightTime ? 'opacity-80' : 'opacity-60'}`} />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-amber-600/60 to-transparent" />
                </div>
                {/* Enhanced Attic base with torus and scotia moldings */}
                <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to top, #b45309, #a16207, #92400e)', borderTop: '2px solid rgba(245, 158, 11, 0.4)' }}>
                  {/* Upper torus */}
                  <div className="absolute top-1.5 left-0.5 right-0.5 h-2 bg-gradient-to-b from-amber-700/60 via-amber-600/40 to-amber-800/50 rounded-full" />
                  {/* Scotia (concave) */}
                  <div className="absolute top-4 left-1 right-1 h-2 bg-gradient-to-b from-amber-800/60 to-amber-700/40" style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.2)' }} />
                  {/* Lower torus */}
                  <div className="absolute top-7 left-0 right-0 h-2 bg-gradient-to-b from-amber-700/50 via-amber-600/30 to-amber-800/40 rounded-full" />
                  {/* Plinth */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-amber-800 to-amber-750 border-t border-amber-600/30" />
                </div>
              </div>

              {/* ====== INNER ORNATE BORDER (Left Edge - facing content) with INTEGRATED SCONCES - Enhanced ====== */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 z-10 border-r-2 border-amber-500/50 shadow-xl overflow-visible">
                {/* Architecturally Accurate Corinthian Capital */}
                <div className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-600/50 ${isNightTime ? 'brightness-110' : ''}`}>
                  <svg viewBox="0 0 32 64" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`} preserveAspectRatio="xMidYMid meet">
                    {/* === ABACUS === */}
                    <path d="M1 0 L31 0 L31 4 Q24 5 16 5 Q8 5 1 4 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M2 2 L30 2" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
                    {/* === VOLUTES === */}
                    <path d="M3 6 Q1 6 1 8 Q1 10 3 10 Q5 10 5 8 Q5 7 4 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="3.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>
                    <path d="M29 6 Q31 6 31 8 Q31 10 29 10 Q27 10 27 8 Q27 7 28 7" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <circle cx="28.5" cy="8" r="1" fill="currentColor" opacity="0.4"/>
                    {/* === HELICES === */}
                    <path d="M5 10 Q7 12 6 14 Q5 15 4 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M27 10 Q25 12 26 14 Q27 15 28 14" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    {/* === FLEURON === */}
                    <circle cx="16" cy="12" r="3.5" fill="currentColor" opacity="0.15"/>
                    <circle cx="16" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="16" cy="12" r="1.2" fill="currentColor" opacity="0.5"/>
                    <path d="M16 8.5 Q17 10 16 11 Q15 10 16 8.5" fill="currentColor" opacity="0.3"/>
                    <path d="M12.5 12 Q14 13 15 12 Q14 11 12.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M19.5 12 Q18 13 17 12 Q18 11 19.5 12" fill="currentColor" opacity="0.3"/>
                    <path d="M16 15.5 Q17 14 16 13 Q15 14 16 15.5" fill="currentColor" opacity="0.3"/>
                    {/* === CAULICOLI === */}
                    <path d="M7 14 Q8 18 6 22 Q5 24 6 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M25 14 Q24 18 26 22 Q27 24 26 26" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    {/* === SECOND ROW ACANTHUS === */}
                    <path d="M2 18 Q0 28 2 38 Q3 36 4 38 Q3 30 2 22" fill="currentColor" opacity="0.2"/>
                    <path d="M2 20 Q1 28 2 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M2 24 Q3.5 26 2 28 M2 30 Q3.5 32 2 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M8 18 Q5 28 7 40" fill="currentColor" opacity="0.2"/>
                    <path d="M8 20 Q6 30 7 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M7 26 Q9 28 7 30 M7 32 Q9 34 7 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M13 16 Q10 28 12 42" fill="currentColor" opacity="0.2"/>
                    <path d="M13 18 Q11 30 12 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M12 28 Q14 30 12 32 M12 34 Q14 36 12 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M19 16 Q22 28 20 42" fill="currentColor" opacity="0.2"/>
                    <path d="M19 18 Q21 30 20 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M20 28 Q18 30 20 32 M20 34 Q18 36 20 38" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M24 18 Q27 28 25 40" fill="currentColor" opacity="0.2"/>
                    <path d="M24 20 Q26 30 25 38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M25 26 Q23 28 25 30 M25 32 Q23 34 25 36" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    <path d="M30 18 Q32 28 30 38" fill="currentColor" opacity="0.2"/>
                    <path d="M30 20 Q31 28 30 36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M30 24 Q28.5 26 30 28 M30 30 Q28.5 32 30 34" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                    {/* === FIRST ROW ACANTHUS === */}
                    <path d="M3 38 Q0 48 3 58" fill="currentColor" opacity="0.25"/>
                    <path d="M3 40 Q1 50 3 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M3 46 Q5 48 3 50 M3 52 Q5 54 3 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M10 36 Q6 48 9 60" fill="currentColor" opacity="0.25"/>
                    <path d="M10 38 Q7 50 9 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M9 46 Q11 48 9 50 M9 52 Q11 54 9 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M16 34 Q12 48 15 62 Q16 58 17 62 Q20 48 16 38" fill="currentColor" opacity="0.3"/>
                    <path d="M16 36 Q13 50 15 60" fill="none" stroke="currentColor" strokeWidth="0.7"/>
                    <path d="M15 46 Q17 48 15 50 M15 52 Q17 54 15 56 M15 58 Q17 60 15 62" fill="none" stroke="currentColor" strokeWidth="0.4"/>
                    <path d="M22 36 Q26 48 23 60" fill="currentColor" opacity="0.25"/>
                    <path d="M22 38 Q25 50 23 58" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M23 46 Q21 48 23 50 M23 52 Q21 54 23 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    <path d="M29 38 Q32 48 29 58" fill="currentColor" opacity="0.25"/>
                    <path d="M29 40 Q31 50 29 56" fill="none" stroke="currentColor" strokeWidth="0.6"/>
                    <path d="M29 46 Q27 48 29 50 M29 52 Q27 54 29 56" fill="none" stroke="currentColor" strokeWidth="0.35"/>
                    {/* === BELL outline === */}
                    <path d="M6 56 Q6 50 8 44 Q10 38 14 34 M26 56 Q26 50 24 44 Q22 38 18 34" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-900/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-b from-amber-700/20 to-transparent ${isNightTime ? 'opacity-50' : 'opacity-25'}`} />
                </div>
                {/* Enhanced column shaft with deeper fluting */}
                <div className="absolute top-16 bottom-12 left-0 right-0 bg-gradient-to-b from-amber-750 via-amber-800 to-amber-750 overflow-hidden">
                  <div className="absolute inset-0.5 flex justify-around">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={`right-inner-flute-${i}`} className="w-1 h-full bg-gradient-to-r from-amber-950/60 via-amber-900/80 to-amber-950/60 rounded-full shadow-inner" />
                    ))}
                  </div>
                  {/* Astragal ring moldings */}
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600 via-amber-500/60 to-amber-700/80 border-y border-amber-600/60" />
                  <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-b from-amber-600 via-amber-500/60 to-amber-700/80 border-y border-amber-600/60" />
                  {/* Light reflections */}
                  <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-amber-600/60 to-transparent ${isNightTime ? 'opacity-80' : 'opacity-60'}`} />
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-amber-600/60 to-transparent" />
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
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-800" />
                          {/* Glowing wick tip - where flame meets wick */}
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-orange-500 rounded-full blur-[0.5px]" style={{ boxShadow: '0 0 2px 0.5px rgba(251, 191, 36, 0.8)' }} />
                          {/* Flame - sits directly on wick tip */}
                          <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-70'}`}>
                            {/* Outer ambient glow - largest, softest */}
                            <div className="absolute -inset-3 bg-gradient-radial from-orange-400/40 via-amber-400/20 to-transparent rounded-full blur-lg" />
                            {/* Secondary glow ring */}
                            <div className="absolute -inset-1.5 bg-gradient-radial from-yellow-400/50 via-orange-300/25 to-transparent rounded-full blur-md" />
                            {/* Outer flame - teardrop shape, bottom connects to wick */}
                            <div
                              className="relative w-2 h-3 rounded-full animate-pulse"
                              style={{
                                background: 'linear-gradient(to top, #dc2626 0%, #ea580c 20%, #f97316 40%, #fbbf24 70%, #fef3c7 95%)',
                                clipPath: 'ellipse(50% 50% at 50% 55%)',
                                filter: 'blur(0.3px)',
                                animationDelay: `${i * 0.3 + 0.5}s`,
                                animationDuration: '0.6s'
                              }}
                            />
                            {/* Middle flame layer */}
                            <div
                              className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full"
                              style={{
                                background: 'linear-gradient(to top, #ea580c 0%, #f97316 30%, #fbbf24 60%, #fef9c3 100%)',
                                clipPath: 'ellipse(45% 50% at 50% 50%)',
                                filter: 'blur(0.2px)',
                                animation: `flame-dance ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                              }}
                            />
                            {/* Inner blue-white core - hottest part, sits at wick connection */}
                            <div
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1.5 rounded-full"
                              style={{
                                background: 'linear-gradient(to top, #60a5fa 0%, #93c5fd 30%, #fef3c7 60%, #fbbf24 100%)',
                                clipPath: 'ellipse(40% 50% at 50% 60%)',
                                filter: 'blur(0.2px)',
                                animation: `flame-core ${0.3 + i * 0.08}s ease-in-out infinite alternate`,
                              }}
                            />
                            {/* Flame tip - flickering point */}
                            <div
                              className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1"
                              style={{
                                background: 'linear-gradient(to top, #fef3c7, #ffffff)',
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                filter: 'blur(0.3px)',
                                animation: `flame-tip ${0.25 + i * 0.05}s ease-in-out infinite`,
                              }}
                            />
                            {/* Smoke wisps - subtle, more visible during day when flames are dimmer */}
                            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-4 pointer-events-none ${isNightTime ? 'opacity-15' : 'opacity-30'}`}>
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
                        {/* Bobeche (cup) - ornate candle holder with scalloped rim */}
                        <div className={`relative w-5 h-3.5 ${isNightTime ? 'brightness-110' : ''}`}>
                          {/* Scalloped decorative rim - top edge */}
                          <svg className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-2" viewBox="0 0 24 8">
                            <path d="M2 4 Q4 1 6 4 Q8 7 10 4 Q12 1 14 4 Q16 7 18 4 Q20 1 22 4" fill="none" stroke="#fef3c7" strokeWidth="1" opacity="0.6"/>
                            <path d="M3 5 Q5 3 7 5 Q9 7 11 5 Q13 3 15 5 Q17 7 19 5 Q21 3 23 5" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.4"/>
                          </svg>
                          {/* Main cup body with curved bowl shape */}
                          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-700 rounded-b-lg shadow-lg overflow-hidden" style={{ borderRadius: '0 0 50% 50% / 0 0 80% 80%' }}>
                            {/* Inner bowl shadow for depth */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-gradient-to-b from-amber-800/60 to-transparent rounded-b-full" />
                            {/* Decorative bead band */}
                            <div className="absolute top-1 left-0 right-0 flex justify-center gap-0.5">
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/70" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/70" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                              <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/70" />
                            </div>
                            {/* Engraved line detail */}
                            <div className="absolute top-2 left-0.5 right-0.5 h-px bg-gradient-to-r from-amber-800/30 via-amber-600/50 to-amber-800/30" />
                            {/* Inner glow from candle */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-1.5 bg-gradient-to-b from-orange-400/40 to-transparent rounded-b-full blur-[1px] ${isNightTime ? 'opacity-80' : 'opacity-40'}`} />
                          </div>
                          {/* Rim highlight */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/30 via-yellow-300/70 to-amber-500/30 rounded-t-sm" />
                          {/* Side highlights for 3D effect */}
                          <div className="absolute top-0.5 left-0 w-0.5 h-2 bg-gradient-to-b from-yellow-300/50 to-transparent rounded-l-full" />
                          <div className="absolute top-0.5 right-0 w-0.5 h-2 bg-gradient-to-b from-amber-800/40 to-transparent rounded-r-full" />
                        </div>
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
                <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: 'linear-gradient(to top, #b45309, #a16207, #92400e)', borderTop: '2px solid rgba(245, 158, 11, 0.4)' }}>
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
                    <div className="h-4 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #b45309, #92400e, #451a03)', borderTop: '2px solid rgba(245, 158, 11, 0.4)' }}>
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      }} />
                      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.2), transparent)' }} />
                    </div>

                    {/* Interactive article scrolls */}
                    <div className="absolute bottom-4 left-1 right-1 flex items-end justify-center gap-1 h-16">
                      {/* Ghost scrolls - transparent tan, filling the shelf (skip first one near candle) */}
                      {Array.from({ length: Math.max(0, 6 - shelfArticles.length) }).map((_, i) => {
                        // Skip the first ghost scroll on each shelf as it's near the candle
                        if (i === 0) return null
                        return (
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
                        )
                      })}
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

                        // Get adjacent scroll IDs for wobble effect
                        const adjacentIds = shelfArticles
                          .filter((_, idx) => Math.abs(idx - i) === 1)
                          .map(a => a.id)
                        const isWobbling = wobblingScrolls.has(article.id)
                        const isLastRead = lastReadScrollId === article.id
                        const isUnrolling = unrollingScroll === article.id

                        return (
                          <div
                            key={article.id}
                            className={`relative w-5 h-14 cursor-pointer transition-all duration-300 quill-cursor ${isHovered ? 'scale-110 -translate-y-2 z-10' : ''} ${highlightScrolls ? 'scroll-highlight-glow' : ''} ${isWobbling ? 'scroll-wobble' : ''} ${isUnrolling ? 'scale-105' : ''}`}
                            style={{
                              transform: `rotate(${(i % 2 - 0.5) * -3}deg)`,
                              '--base-rotation': `${(i % 2 - 0.5) * -3}deg`,
                            } as React.CSSProperties}
                            onMouseEnter={() => {
                              handleScrollHover(article)
                              triggerAdjacentWobble(article.id, adjacentIds)
                            }}
                            onMouseLeave={handleScrollLeave}
                            onClick={(e) => handleScrollClick(article, e, scrollAge)}
                          >
                            {/* Feather bookmark for last-read scroll */}
                            {isLastRead && (
                              <div className="absolute -top-4 -left-2 z-20 feather-bookmark pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
                                <svg width="16" height="20" viewBox="0 0 16 20" className="text-amber-600 drop-shadow-md">
                                  <path d="M8 0 Q12 4 12 10 Q12 16 8 20 Q8 14 4 10 Q4 6 8 0" fill="currentColor" />
                                  <path d="M8 2 Q10 5 10 10 Q10 14 8 18" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                                </svg>
                              </div>
                            )}
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)', color: '#ffffff' }}>
                Knowledge Shared
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(245, 158, 11, 0.5))' }} />
                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#f59e0b' }} />
                <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(245, 158, 11, 0.5))' }} />
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
                {session ? (
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
                ) : (
                  <Link href="/auth/signup">
                    <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-700 text-white font-bold text-base rounded-lg shadow-2xl border-2 border-slate-400/40 hover:border-emerald-400/60 transition-all duration-300 hover:scale-105">
                      {/* Decorative quill icon */}
                      <div className="relative">
                        <PenSquare className="w-5 h-5" />
                      </div>
                      <span className="tracking-wide">Join to Contribute</span>
                      {/* Decorative corner accents */}
                      <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-slate-300/50" />
                      <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-slate-300/50" />
                      <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-slate-300/50" />
                      <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-slate-300/50" />
                    </button>
                  </Link>
                )}
                <p className="mt-2 text-xs text-amber-300/60 font-medium">
                  {session ? 'Share a case study, lesson, or sustainability journey' : 'Sign up free to share your wisdom'}
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
          <div className="absolute inset-0 shadow-lg overflow-hidden" style={{ background: 'linear-gradient(to bottom, #b45309, #92400e, #451a03)', borderTop: '2px solid rgba(245, 158, 11, 0.4)' }}>
            {/* Wood grain texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q25 3 50 5 Q75 7 100 5' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
            }} />
            {/* Top highlight */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.3), transparent)' }} />
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
          {/* Architecturally Accurate Corinthian Capital - Enlarged */}
          <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-600/50 ${isNightTime ? 'brightness-110' : ''}`}>
            <svg viewBox="0 0 64 80" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`} preserveAspectRatio="xMidYMid meet">
              {/* === ABACUS (Top plate with concave sides) === */}
              <path d="M2 0 L62 0 L62 5 Q48 7 32 7 Q16 7 2 5 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="0.4"/>
              <path d="M4 3 L60 3" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>

              {/* === VOLUTES (Corner spirals - larger) === */}
              {/* Left volute */}
              <path d="M6 8 Q2 8 2 12 Q2 16 6 16 Q10 16 10 12 Q10 10 8 10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="7" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
              {/* Right volute */}
              <path d="M58 8 Q62 8 62 12 Q62 16 58 16 Q54 16 54 12 Q54 10 56 10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="57" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>

              {/* === HELICES (Small spirals under volutes) === */}
              <path d="M10 16 Q14 20 12 24 Q10 26 8 24" fill="none" stroke="currentColor" strokeWidth="0.7"/>
              <path d="M54 16 Q50 20 52 24 Q54 26 56 24" fill="none" stroke="currentColor" strokeWidth="0.7"/>

              {/* === CENTRAL FLEURON (Flower/rosette - larger) === */}
              <circle cx="32" cy="16" r="6" fill="currentColor" opacity="0.15"/>
              <circle cx="32" cy="16" r="4.5" fill="none" stroke="currentColor" strokeWidth="0.7"/>
              <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.5"/>
              {/* Fleuron petals */}
              <path d="M32 9 Q34 13 32 15 Q30 13 32 9" fill="currentColor" opacity="0.3"/>
              <path d="M25 16 Q29 18 31 16 Q29 14 25 16" fill="currentColor" opacity="0.3"/>
              <path d="M39 16 Q35 18 33 16 Q35 14 39 16" fill="currentColor" opacity="0.3"/>
              <path d="M32 23 Q34 19 32 17 Q30 19 32 23" fill="currentColor" opacity="0.3"/>

              {/* === CAULICOLI (Stems emerging from leaves) === */}
              <path d="M14 22 Q16 30 12 38 Q10 42 12 46" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <path d="M50 22 Q48 30 52 38 Q54 42 52 46" fill="none" stroke="currentColor" strokeWidth="0.8"/>

              {/* === SECOND ROW ACANTHUS LEAVES (6 leaves) === */}
              {/* Left outer leaf */}
              <path d="M4 28 Q2 38 6 48 Q8 52 10 50 Q6 44 8 36 Q10 30 8 28 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Left-center leaf */}
              <path d="M18 26 Q14 36 18 46 Q20 50 22 48 Q18 42 20 34 Q22 28 20 26 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Center-left leaf */}
              <path d="M28 25 Q26 35 28 45 Q30 48 32 46 Q28 40 30 33 Q32 27 30 25 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Center-right leaf */}
              <path d="M36 25 Q38 35 36 45 Q34 48 32 46 Q36 40 34 33 Q32 27 34 25 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Right-center leaf */}
              <path d="M46 26 Q50 36 46 46 Q44 50 42 48 Q46 42 44 34 Q42 28 44 26 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Right outer leaf */}
              <path d="M60 28 Q62 38 58 48 Q56 52 54 50 Q58 44 56 36 Q54 30 56 28 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>

              {/* === FIRST ROW ACANTHUS LEAVES (5 larger base leaves) === */}
              {/* Far left leaf */}
              <path d="M2 48 Q0 58 4 68 Q6 74 10 72 Q4 64 6 56 Q8 50 6 48 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M6 58 Q4 62 6 66" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Left leaf */}
              <path d="M16 46 Q12 56 16 66 Q18 72 22 70 Q16 62 18 54 Q20 48 18 46 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M18 56 Q16 60 18 64" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Center leaf */}
              <path d="M32 44 Q26 54 30 66 Q32 72 34 66 Q38 54 32 44 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M30 56 Q32 52 34 56" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Right leaf */}
              <path d="M48 46 Q52 56 48 66 Q46 72 42 70 Q48 62 46 54 Q44 48 46 46 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M46 56 Q48 60 46 64" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Far right leaf */}
              <path d="M62 48 Q64 58 60 68 Q58 74 54 72 Q60 64 58 56 Q56 50 58 48 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M58 58 Q60 62 58 66" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>

              {/* === BELL (Kalathos) outline visible between leaves === */}
              <path d="M12 72 Q12 64 16 56 Q20 48 28 42 M52 72 Q52 64 48 56 Q44 48 36 42" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4"/>
            </svg>
            {/* Depth shadow at bottom of capital */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-amber-900/40 to-transparent" />
            {/* Light-aware highlight on capital */}
            <div className={`absolute inset-0 bg-gradient-to-b from-amber-700/20 to-transparent ${isNightTime ? 'opacity-50' : 'opacity-25'}`} />
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
          {/* Architecturally Accurate Corinthian Capital - Enlarged */}
          <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 border-b-2 border-amber-600/50 ${isNightTime ? 'brightness-110' : ''}`}>
            <svg viewBox="0 0 64 80" className={`w-full h-full ${isNightTime ? 'text-amber-400' : 'text-amber-500/80'}`} preserveAspectRatio="xMidYMid meet">
              {/* === ABACUS (Top plate with concave sides) === */}
              <path d="M2 0 L62 0 L62 5 Q48 7 32 7 Q16 7 2 5 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="0.4"/>
              <path d="M4 3 L60 3" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>

              {/* === VOLUTES (Corner spirals - larger) === */}
              {/* Left volute */}
              <path d="M6 8 Q2 8 2 12 Q2 16 6 16 Q10 16 10 12 Q10 10 8 10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="7" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
              {/* Right volute */}
              <path d="M58 8 Q62 8 62 12 Q62 16 58 16 Q54 16 54 12 Q54 10 56 10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="57" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>

              {/* === HELICES (Small spirals under volutes) === */}
              <path d="M10 16 Q14 20 12 24 Q10 26 8 24" fill="none" stroke="currentColor" strokeWidth="0.7"/>
              <path d="M54 16 Q50 20 52 24 Q54 26 56 24" fill="none" stroke="currentColor" strokeWidth="0.7"/>

              {/* === CENTRAL FLEURON (Flower/rosette - larger) === */}
              <circle cx="32" cy="16" r="6" fill="currentColor" opacity="0.15"/>
              <circle cx="32" cy="16" r="4.5" fill="none" stroke="currentColor" strokeWidth="0.7"/>
              <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.5"/>
              {/* Fleuron petals */}
              <path d="M32 9 Q34 13 32 15 Q30 13 32 9" fill="currentColor" opacity="0.3"/>
              <path d="M25 16 Q29 18 31 16 Q29 14 25 16" fill="currentColor" opacity="0.3"/>
              <path d="M39 16 Q35 18 33 16 Q35 14 39 16" fill="currentColor" opacity="0.3"/>
              <path d="M32 23 Q34 19 32 17 Q30 19 32 23" fill="currentColor" opacity="0.3"/>

              {/* === CAULICOLI (Stems emerging from leaves) === */}
              <path d="M14 22 Q16 30 12 38 Q10 42 12 46" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <path d="M50 22 Q48 30 52 38 Q54 42 52 46" fill="none" stroke="currentColor" strokeWidth="0.8"/>

              {/* === SECOND ROW ACANTHUS LEAVES (6 leaves) === */}
              {/* Left outer leaf */}
              <path d="M4 28 Q2 38 6 48 Q8 52 10 50 Q6 44 8 36 Q10 30 8 28 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Left-center leaf */}
              <path d="M18 26 Q14 36 18 46 Q20 50 22 48 Q18 42 20 34 Q22 28 20 26 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Center-left leaf */}
              <path d="M28 25 Q26 35 28 45 Q30 48 32 46 Q28 40 30 33 Q32 27 30 25 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Center-right leaf */}
              <path d="M36 25 Q38 35 36 45 Q34 48 32 46 Q36 40 34 33 Q32 27 34 25 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Right-center leaf */}
              <path d="M46 26 Q50 36 46 46 Q44 50 42 48 Q46 42 44 34 Q42 28 44 26 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
              {/* Right outer leaf */}
              <path d="M60 28 Q62 38 58 48 Q56 52 54 50 Q58 44 56 36 Q54 30 56 28 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>

              {/* === FIRST ROW ACANTHUS LEAVES (5 larger base leaves) === */}
              {/* Far left leaf */}
              <path d="M2 48 Q0 58 4 68 Q6 74 10 72 Q4 64 6 56 Q8 50 6 48 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M6 58 Q4 62 6 66" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Left leaf */}
              <path d="M16 46 Q12 56 16 66 Q18 72 22 70 Q16 62 18 54 Q20 48 18 46 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M18 56 Q16 60 18 64" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Center leaf */}
              <path d="M32 44 Q26 54 30 66 Q32 72 34 66 Q38 54 32 44 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M30 56 Q32 52 34 56" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Right leaf */}
              <path d="M48 46 Q52 56 48 66 Q46 72 42 70 Q48 62 46 54 Q44 48 46 46 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M46 56 Q48 60 46 64" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>
              {/* Far right leaf */}
              <path d="M62 48 Q64 58 60 68 Q58 74 54 72 Q60 64 58 56 Q56 50 58 48 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="0.6"/>
              <path d="M58 58 Q60 62 58 66" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6"/>

              {/* === BELL (Kalathos) outline visible between leaves === */}
              <path d="M12 72 Q12 64 16 56 Q20 48 28 42 M52 72 Q52 64 48 56 Q44 48 36 42" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4"/>
            </svg>
            {/* Depth shadow at bottom of capital */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-amber-900/40 to-transparent" />
            {/* Light-aware highlight on capital */}
            <div className={`absolute inset-0 bg-gradient-to-b from-amber-700/20 to-transparent ${isNightTime ? 'opacity-50' : 'opacity-25'}`} />
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
              {/* Candle assembly - using flex column so candle sits in bobeche */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                {/* Candle body with wick and flame - sits into bobeche with negative margin */}
                <div className="relative w-2.5 -mb-1.5 z-10">
                  {/* Candle body */}
                  <div className="w-2.5 h-5 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 rounded-t-sm shadow-md" />
                  {/* Wax pool in bobeche */}
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-amber-100/50 rounded-full blur-[0.5px]" />
                  {/* Wick */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-800" />
                  {/* Glowing wick tip - where flame meets wick */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-orange-500 rounded-full blur-[0.5px]" style={{ boxShadow: '0 0 2px 0.5px rgba(251, 191, 36, 0.8)' }} />
                  {/* Flame assembly - sits directly on wick tip */}
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-70'}`}>
                    {/* Outer ambient glow */}
                    <div className="absolute -inset-3 bg-gradient-radial from-orange-400/40 via-amber-400/20 to-transparent rounded-full blur-lg" />
                    {/* Secondary glow ring */}
                    <div className="absolute -inset-1.5 bg-gradient-radial from-yellow-400/50 via-orange-300/25 to-transparent rounded-full blur-md" />
                    {/* Outer flame - bottom connects to wick */}
                    <div
                      className="relative w-2 h-3 rounded-full animate-pulse"
                      style={{
                        background: 'linear-gradient(to top, #dc2626 0%, #ea580c 20%, #f97316 40%, #fbbf24 70%, #fef3c7 95%)',
                        clipPath: 'ellipse(50% 50% at 50% 55%)',
                        filter: 'blur(0.3px)',
                        animationDelay: `${i * 0.25}s`,
                        animationDuration: '0.6s'
                      }}
                    />
                    {/* Middle flame layer */}
                    <div
                      className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full"
                      style={{
                        background: 'linear-gradient(to top, #ea580c 0%, #f97316 30%, #fbbf24 60%, #fef9c3 100%)',
                        clipPath: 'ellipse(45% 50% at 50% 50%)',
                        filter: 'blur(0.2px)',
                        animation: `flame-dance ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                      }}
                    />
                    {/* Inner blue-white core - sits at wick connection */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(to top, #60a5fa 0%, #93c5fd 30%, #fef3c7 60%, #fbbf24 100%)',
                        clipPath: 'ellipse(40% 50% at 50% 60%)',
                        filter: 'blur(0.2px)',
                        animation: `flame-core ${0.3 + i * 0.08}s ease-in-out infinite alternate`,
                      }}
                    />
                    {/* Flame tip */}
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1"
                      style={{
                        background: 'linear-gradient(to top, #fef3c7, #ffffff)',
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        filter: 'blur(0.3px)',
                        animation: `flame-tip ${0.25 + i * 0.05}s ease-in-out infinite`,
                      }}
                    />
                  </div>
                </div>
                {/* Bobeche (cup) - ornate candle holder with Victorian details */}
                <div className={`relative w-6 h-4 ${isNightTime ? 'brightness-110' : ''}`}>
                  {/* Decorative scalloped rim */}
                  <svg className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-2.5" viewBox="0 0 28 10">
                    <path d="M2 5 Q4 1 7 5 Q10 9 13 5 Q16 1 19 5 Q22 9 25 5" fill="none" stroke="#fef3c7" strokeWidth="1.2" opacity="0.7"/>
                    <path d="M3 6 Q5.5 3 8 6 Q10.5 9 13 6 Q15.5 3 18 6 Q20.5 9 23 6" fill="none" stroke="#fbbf24" strokeWidth="0.6" opacity="0.5"/>
                    {/* Decorative dots on rim */}
                    <circle cx="7" cy="5" r="0.8" fill="#fef3c7" opacity="0.5"/>
                    <circle cx="13" cy="5" r="0.8" fill="#fef3c7" opacity="0.5"/>
                    <circle cx="19" cy="5" r="0.8" fill="#fef3c7" opacity="0.5"/>
                  </svg>
                  {/* Main bowl with elegant curved shape */}
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-700 shadow-lg overflow-hidden" style={{ borderRadius: '0 0 50% 50% / 0 0 100% 100%' }}>
                    {/* Inner bowl shadow for realistic depth */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gradient-to-b from-amber-800/50 to-transparent rounded-b-full" />
                    {/* Decorative bead pattern */}
                    <div className="absolute top-1.5 left-0 right-0 flex justify-center gap-0.5">
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                    </div>
                    {/* Engraved decorative lines */}
                    <div className="absolute top-2.5 left-1 right-1 h-px bg-gradient-to-r from-amber-800/20 via-amber-600/40 to-amber-800/20" />
                    {/* Inner candlelight glow */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-2 bg-gradient-to-b from-orange-400/50 to-transparent rounded-b-full blur-[1px] ${isNightTime ? 'opacity-90' : 'opacity-50'}`} />
                  </div>
                  {/* Polished rim highlight */}
                  <div className="absolute top-0 left-0.5 right-0.5 h-0.5 bg-gradient-to-r from-amber-400/20 via-yellow-200/80 to-amber-400/20 rounded-t-full" />
                  {/* 3D side lighting */}
                  <div className="absolute top-0.5 left-0 w-0.5 h-2.5 bg-gradient-to-b from-yellow-300/60 to-transparent rounded-l-full" />
                  <div className="absolute top-0.5 right-0 w-0.5 h-2.5 bg-gradient-to-b from-amber-900/50 to-transparent rounded-r-full" />
                </div>
              </div>
              {/* Enhanced ambient glow */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-radial from-orange-400/50 via-amber-500/25 to-transparent rounded-full blur-xl ${isNightTime ? 'opacity-100' : 'opacity-50'}`} />
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
              {/* Candle assembly - using flex column so candle sits in bobeche */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                {/* Candle body with wick and flame - sits into bobeche with negative margin */}
                <div className="relative w-2.5 -mb-1.5 z-10">
                  {/* Candle body */}
                  <div className="w-2.5 h-5 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 rounded-t-sm shadow-md" />
                  {/* Wax pool in bobeche */}
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-amber-100/50 rounded-full blur-[0.5px]" />
                  {/* Wick */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-800" />
                  {/* Glowing wick tip - where flame meets wick */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-orange-500 rounded-full blur-[0.5px]" style={{ boxShadow: '0 0 2px 0.5px rgba(251, 191, 36, 0.8)' }} />
                  {/* Flame assembly - sits directly on wick tip */}
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${isNightTime ? 'opacity-100' : 'opacity-70'}`}>
                    {/* Outer ambient glow */}
                    <div className="absolute -inset-3 bg-gradient-radial from-orange-400/40 via-amber-400/20 to-transparent rounded-full blur-lg" />
                    {/* Secondary glow ring */}
                    <div className="absolute -inset-1.5 bg-gradient-radial from-yellow-400/50 via-orange-300/25 to-transparent rounded-full blur-md" />
                    {/* Outer flame - bottom connects to wick */}
                    <div
                      className="relative w-2 h-3 rounded-full animate-pulse"
                      style={{
                        background: 'linear-gradient(to top, #dc2626 0%, #ea580c 20%, #f97316 40%, #fbbf24 70%, #fef3c7 95%)',
                        clipPath: 'ellipse(50% 50% at 50% 55%)',
                        filter: 'blur(0.3px)',
                        animationDelay: `${i * 0.25 + 0.4}s`,
                        animationDuration: '0.6s'
                      }}
                    />
                    {/* Middle flame layer */}
                    <div
                      className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full"
                      style={{
                        background: 'linear-gradient(to top, #ea580c 0%, #f97316 30%, #fbbf24 60%, #fef9c3 100%)',
                        clipPath: 'ellipse(45% 50% at 50% 50%)',
                        filter: 'blur(0.2px)',
                        animation: `flame-dance ${0.45 + i * 0.1}s ease-in-out infinite alternate`,
                      }}
                    />
                    {/* Inner blue-white core - sits at wick connection */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(to top, #60a5fa 0%, #93c5fd 30%, #fef3c7 60%, #fbbf24 100%)',
                        clipPath: 'ellipse(40% 50% at 50% 60%)',
                        filter: 'blur(0.2px)',
                        animation: `flame-core ${0.35 + i * 0.08}s ease-in-out infinite alternate`,
                      }}
                    />
                    {/* Flame tip */}
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1"
                      style={{
                        background: 'linear-gradient(to top, #fef3c7, #ffffff)',
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        filter: 'blur(0.3px)',
                        animation: `flame-tip ${0.28 + i * 0.05}s ease-in-out infinite`,
                      }}
                    />
                  </div>
                </div>
                {/* Bobeche (cup) - ornate candle holder with Victorian details */}
                <div className={`relative w-6 h-4 ${isNightTime ? 'brightness-110' : ''}`}>
                  {/* Decorative scalloped rim */}
                  <svg className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-2.5" viewBox="0 0 28 10">
                    <path d="M2 5 Q4 1 7 5 Q10 9 13 5 Q16 1 19 5 Q22 9 25 5" fill="none" stroke="#fef3c7" strokeWidth="1.2" opacity="0.7"/>
                    <path d="M3 6 Q5.5 3 8 6 Q10.5 9 13 6 Q15.5 3 18 6 Q20.5 9 23 6" fill="none" stroke="#fbbf24" strokeWidth="0.6" opacity="0.5"/>
                    {/* Decorative dots on rim */}
                    <circle cx="7" cy="5" r="0.8" fill="#fef3c7" opacity="0.5"/>
                    <circle cx="13" cy="5" r="0.8" fill="#fef3c7" opacity="0.5"/>
                    <circle cx="19" cy="5" r="0.8" fill="#fef3c7" opacity="0.5"/>
                  </svg>
                  {/* Main bowl with elegant curved shape */}
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-700 shadow-lg overflow-hidden" style={{ borderRadius: '0 0 50% 50% / 0 0 100% 100%' }}>
                    {/* Inner bowl shadow for realistic depth */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gradient-to-b from-amber-800/50 to-transparent rounded-b-full" />
                    {/* Decorative bead pattern */}
                    <div className="absolute top-1.5 left-0 right-0 flex justify-center gap-0.5">
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/60" />
                      <div className="w-0.5 h-0.5 rounded-full bg-yellow-300/80" />
                    </div>
                    {/* Engraved decorative lines */}
                    <div className="absolute top-2.5 left-1 right-1 h-px bg-gradient-to-r from-amber-800/20 via-amber-600/40 to-amber-800/20" />
                    {/* Inner candlelight glow */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-2 bg-gradient-to-b from-orange-400/50 to-transparent rounded-b-full blur-[1px] ${isNightTime ? 'opacity-90' : 'opacity-50'}`} />
                  </div>
                  {/* Polished rim highlight */}
                  <div className="absolute top-0 left-0.5 right-0.5 h-0.5 bg-gradient-to-r from-amber-400/20 via-yellow-200/80 to-amber-400/20 rounded-t-full" />
                  {/* 3D side lighting */}
                  <div className="absolute top-0.5 left-0 w-0.5 h-2.5 bg-gradient-to-b from-yellow-300/60 to-transparent rounded-l-full" />
                  <div className="absolute top-0.5 right-0 w-0.5 h-2.5 bg-gradient-to-b from-amber-900/50 to-transparent rounded-r-full" />
                </div>
              </div>
              {/* Enhanced ambient glow */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-radial from-orange-400/50 via-amber-500/25 to-transparent rounded-full blur-xl ${isNightTime ? 'opacity-100' : 'opacity-50'}`} />
            </div>
          </div>
        ))}

        {/* ============ KEYSTONE DIVIDER - Grand Ornate Roman Architectural Masterpiece ============ */}
        {/* mx-16 matches the pillar width (w-16) to prevent overflow into Corinthian columns */}
        <div className="h-24 shadow-2xl relative overflow-hidden mx-16" style={{ background: 'linear-gradient(to bottom, #d97706, #b45309, #78350f, #451a03)', borderTop: '3px solid rgba(251, 191, 36, 0.7)' }}>

          {/* === LAYER 1: TOP GREEK KEY MEANDER - Full Width === */}
          <div className="absolute top-0 left-0 right-0 h-5 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 20">
              <defs>
                <pattern id="keystoneGreekKey" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                  {/* Greek key / meander pattern - perfectly geometric */}
                  <path d="M0 10 L10 10 L10 5 L5 5 L5 15 L15 15 L15 5 L20 5 L20 10 L30 10 L30 15 L25 15 L25 5 L35 5 L35 15 L40 15"
                    fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
                  <path d="M0 10 L10 10 L10 5 L5 5 L5 15 L15 15 L15 5 L20 5 L20 10 L30 10 L30 15 L25 15 L25 5 L35 5 L35 15 L40 15"
                    fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2,2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneGreekKey)" opacity="0.6"/>
            </svg>
          </div>

          {/* Gold inlay line below Greek key */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600/40 via-amber-400/80 to-amber-600/40" />

          {/* === LAYER 2: CONTINUOUS GUILLOCHE BAND - Interlocking Circles === */}
          <div className="absolute top-6 left-0 right-0 h-4 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 16">
              <defs>
                <pattern id="keystoneGuilloche" x="0" y="0" width="32" height="16" patternUnits="userSpaceOnUse">
                  {/* Interlocking wave guilloche - symmetric */}
                  <path d="M0 8 Q8 0 16 8 Q24 16 32 8" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                  <path d="M0 8 Q8 16 16 8 Q24 0 32 8" fill="none" stroke="#d97706" strokeWidth="0.8"/>
                  {/* Intersection jewels */}
                  <circle cx="0" cy="8" r="2" fill="#fbbf24" opacity="0.5"/>
                  <circle cx="16" cy="8" r="2" fill="#fbbf24" opacity="0.5"/>
                  <circle cx="32" cy="8" r="2" fill="#fbbf24" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneGuilloche)" opacity="0.55"/>
            </svg>
          </div>

          {/* === LAYER 3: GRAND CENTRAL SUNBURST MEDALLION === */}
          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-30" viewBox="0 0 80 80">
            {/* Outer radiating sunburst */}
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={`ray-${i}`} x1="40" y1="40" x2={40 + 38 * Math.cos((i * 15 * Math.PI) / 180)} y2={40 + 38 * Math.sin((i * 15 * Math.PI) / 180)}
                stroke="#fbbf24" strokeWidth={i % 2 === 0 ? "1" : "0.5"} opacity={i % 2 === 0 ? "0.4" : "0.25"}/>
            ))}
            {/* Concentric circles */}
            <circle cx="40" cy="40" r="36" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.3"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4"/>
            <circle cx="40" cy="40" r="20" fill="none" stroke="#fbbf24" strokeWidth="1.2" opacity="0.5"/>
            {/* Inner diamond */}
            <path d="M40 18 L62 40 L40 62 L18 40 Z" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"/>
            <path d="M40 26 L54 40 L40 54 L26 40 Z" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4"/>
            {/* Central rosette */}
            <circle cx="40" cy="40" r="12" fill="url(#sunburstGradient)" stroke="#fbbf24" strokeWidth="1.5"/>
            <circle cx="40" cy="40" r="8" fill="none" stroke="#451a03" strokeWidth="0.8" opacity="0.5"/>
            <circle cx="40" cy="40" r="4" fill="#fbbf24" opacity="0.6"/>
            {/* Eight-point star in center */}
            <path d="M40 32 L42 38 L48 38 L43 42 L45 48 L40 44 L35 48 L37 42 L32 38 L38 38 Z" fill="#fbbf24" opacity="0.5"/>
            <defs>
              <radialGradient id="sunburstGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.3"/>
              </radialGradient>
            </defs>
          </svg>

          {/* === LAYER 4: SYMMETRIC ACANTHUS SCROLL FRIEZE - Spans Full Width === */}
          <div className="absolute top-10 left-0 right-0 h-5">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 20">
              <defs>
                <pattern id="keystoneAcanthus" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
                  {/* Symmetric acanthus scroll */}
                  <path d="M0 10 Q7.5 4 15 10 Q22.5 16 30 10 Q37.5 4 45 10 Q52.5 16 60 10" fill="none" stroke="#fbbf24" strokeWidth="1.1"/>
                  {/* Symmetric leaf curls - left and right mirror */}
                  <path d="M7.5 6 C10 3 14 5 15 8" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                  <path d="M22.5 14 C20 17 16 15 15 12" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                  <path d="M37.5 6 C40 3 44 5 45 8" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                  <path d="M52.5 14 C50 17 46 15 45 12" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                  {/* Center spiral rosettes */}
                  <circle cx="15" cy="10" r="2.5" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                  <circle cx="45" cy="10" r="2.5" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                  <circle cx="15" cy="10" r="1" fill="#fbbf24" opacity="0.4"/>
                  <circle cx="45" cy="10" r="1" fill="#fbbf24" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneAcanthus)" opacity="0.55"/>
            </svg>
          </div>

          {/* === LAYER 5: SYMMETRIC ROSETTE MEDALLIONS - Evenly Distributed === */}
          {[5, 20, 35, 65, 80, 95].map((pos, i) => (
            <div key={`keystone-rosette-${i}`} className="absolute top-11 -translate-x-1/2 z-20" style={{ left: `${pos}%` }}>
              <div className="w-6 h-6 rounded-full relative">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  {/* Outer ring */}
                  <circle cx="12" cy="12" r="11" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
                  {/* Petal pattern - 8 symmetric petals */}
                  {Array.from({ length: 8 }).map((_, j) => (
                    <ellipse key={`petal-${j}`} cx="12" cy="5" rx="2" ry="4" fill="none" stroke="#fbbf24" strokeWidth="0.6" opacity="0.5"
                      transform={`rotate(${j * 45} 12 12)`}/>
                  ))}
                  {/* Inner rings */}
                  <circle cx="12" cy="12" r="6" fill="none" stroke="#f59e0b" strokeWidth="0.7" opacity="0.5"/>
                  <circle cx="12" cy="12" r="3" fill="#fbbf24" opacity="0.4"/>
                </svg>
              </div>
            </div>
          ))}

          {/* === LAYER 6: DENTIL COURSE - Full Width Geometric === */}
          <div className="absolute top-[60px] left-0 right-0 h-2.5">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 10">
              <defs>
                <pattern id="keystoneDentil" x="0" y="0" width="14" height="10" patternUnits="userSpaceOnUse">
                  {/* Dentil block */}
                  <rect x="2" y="1" width="6" height="8" fill="#fbbf24" opacity="0.3"/>
                  <rect x="2" y="1" width="6" height="8" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                  {/* Shadow detail */}
                  <line x1="8" y1="2" x2="8" y2="8" stroke="#451a03" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneDentil)" opacity="0.6"/>
            </svg>
          </div>

          {/* Gold separator line */}
          <div className="absolute top-[72px] left-0 right-0 h-0.5 bg-gradient-to-r from-amber-700/30 via-amber-400/60 to-amber-700/30" />

          {/* === LAYER 7: EGG-AND-DART MOLDING - Full Width at Bottom === */}
          <div className="absolute bottom-2 left-0 right-0 h-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 16">
              <defs>
                <pattern id="keystoneEggDart" x="0" y="0" width="36" height="16" patternUnits="userSpaceOnUse">
                  {/* Egg - left */}
                  <ellipse cx="9" cy="8" rx="6" ry="5" fill="none" stroke="#fbbf24" strokeWidth="0.9"/>
                  <ellipse cx="9" cy="8" rx="3" ry="2.5" fill="#fbbf24" opacity="0.25"/>
                  {/* Dart - center */}
                  <path d="M18 3 L20 13 L22 3" fill="none" stroke="#fbbf24" strokeWidth="0.9"/>
                  <path d="M20 5 L20 11" stroke="#f59e0b" strokeWidth="0.5"/>
                  {/* Egg - right */}
                  <ellipse cx="27" cy="8" rx="6" ry="5" fill="none" stroke="#fbbf24" strokeWidth="0.9"/>
                  <ellipse cx="27" cy="8" rx="3" ry="2.5" fill="#fbbf24" opacity="0.25"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#keystoneEggDart)" opacity="0.6"/>
            </svg>
          </div>

          {/* === CORNER ANTHEMION PALMETTES - All Four Corners === */}
          {/* Top-left */}
          <svg className={`absolute top-1 left-1 w-10 h-14 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10`} viewBox="0 0 40 56">
            <path d="M20 54 Q6 44 6 28 Q12 36 20 28 Q28 36 34 28 Q34 44 20 54" fill="none" stroke="#fbbf24" strokeWidth="1"/>
            <path d="M20 8 Q12 20 12 32 M20 8 Q28 20 28 32" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <path d="M20 4 Q16 16 16 26 M20 4 Q24 16 24 26" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
            <circle cx="20" cy="8" r="3" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <circle cx="20" cy="8" r="1.5" fill="#fbbf24" opacity="0.5"/>
          </svg>
          {/* Top-right - mirrored */}
          <svg className={`absolute top-1 right-1 w-10 h-14 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10 scale-x-[-1]`} viewBox="0 0 40 56">
            <path d="M20 54 Q6 44 6 28 Q12 36 20 28 Q28 36 34 28 Q34 44 20 54" fill="none" stroke="#fbbf24" strokeWidth="1"/>
            <path d="M20 8 Q12 20 12 32 M20 8 Q28 20 28 32" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <path d="M20 4 Q16 16 16 26 M20 4 Q24 16 24 26" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
            <circle cx="20" cy="8" r="3" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <circle cx="20" cy="8" r="1.5" fill="#fbbf24" opacity="0.5"/>
          </svg>
          {/* Bottom-left */}
          <svg className={`absolute bottom-1 left-1 w-10 h-14 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10 scale-y-[-1]`} viewBox="0 0 40 56">
            <path d="M20 54 Q6 44 6 28 Q12 36 20 28 Q28 36 34 28 Q34 44 20 54" fill="none" stroke="#fbbf24" strokeWidth="1"/>
            <path d="M20 8 Q12 20 12 32 M20 8 Q28 20 28 32" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <path d="M20 4 Q16 16 16 26 M20 4 Q24 16 24 26" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
            <circle cx="20" cy="8" r="3" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <circle cx="20" cy="8" r="1.5" fill="#fbbf24" opacity="0.5"/>
          </svg>
          {/* Bottom-right - mirrored both ways */}
          <svg className={`absolute bottom-1 right-1 w-10 h-14 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10 scale-[-1]`} viewBox="0 0 40 56">
            <path d="M20 54 Q6 44 6 28 Q12 36 20 28 Q28 36 34 28 Q34 44 20 54" fill="none" stroke="#fbbf24" strokeWidth="1"/>
            <path d="M20 8 Q12 20 12 32 M20 8 Q28 20 28 32" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <path d="M20 4 Q16 16 16 26 M20 4 Q24 16 24 26" fill="none" stroke="#f59e0b" strokeWidth="0.6"/>
            <circle cx="20" cy="8" r="3" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
            <circle cx="20" cy="8" r="1.5" fill="#fbbf24" opacity="0.5"/>
          </svg>

          {/* === DECORATIVE SIDE BORDERS - Left and Right === */}
          <div className="absolute top-6 bottom-6 left-0 w-1 bg-gradient-to-b from-amber-400/40 via-amber-500/60 to-amber-400/40" />
          <div className="absolute top-6 bottom-6 right-0 w-1 bg-gradient-to-b from-amber-400/40 via-amber-500/60 to-amber-400/40" />

          {/* Bottom shadow for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-950 via-amber-900/70 to-transparent" />

          {/* Top surface shimmer */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
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
          <div className="relative mx-16">
            <div className="flex items-end justify-center gap-2.5 px-6 pb-0 min-h-[85px] flex-wrap overflow-hidden">
              {/* Leading ghost scrolls - add some before articles */}
              {Array.from({ length: Math.max(0, Math.floor((16 - getShelfArticles(0, shelf1Category).length) / 3)) }).map((_, i) => (
                <div key={`ghost-shelf1-leading-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                  <div className="h-[75px] relative">
                    <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                    <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                    <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-4/5" />
                    </div>
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                  </div>
                </div>
              ))}
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
              {/* Trailing ghost scrolls - remaining after leading and articles */}
              {(() => {
                const articleCount = getShelfArticles(0, shelf1Category).length
                const leadingCount = Math.max(0, Math.floor((16 - articleCount) / 3))
                const remainingGhosts = Math.max(0, 16 - articleCount - leadingCount)
                return Array.from({ length: remainingGhosts }).map((_, i) => (
                  <div key={`ghost-shelf1-trailing-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                    <div className="h-[75px] relative">
                      <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                      <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                      <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                        <div className="h-px bg-amber-600/25" />
                        <div className="h-px bg-amber-600/20 w-4/5" />
                        <div className="h-px bg-amber-600/25" />
                        <div className="h-px bg-amber-600/20 w-3/5" />
                      </div>
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                    </div>
                  </div>
                ))
              })()}
            </div>

            {/* Center decorative medallion - matching Shelf 2/3 */}
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

            {/* Ornate Roman shelf surface - Full Width Intricate Design */}
            <div className="h-12 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border-t-2 border-amber-400/60 shadow-2xl relative overflow-hidden">
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-400/50 to-amber-500/20" />

              {/* === FULL WIDTH GUILLOCHE BAND - Spans entire shelf === */}
              <div className="absolute top-1 left-0 right-0 h-3">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
                  <defs>
                    <pattern id="shelf1Guilloche" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
                      <path d="M0 6 Q6 0 12 6 Q18 12 24 6" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
                      <path d="M0 6 Q6 12 12 6 Q18 0 24 6" fill="none" stroke="#d97706" strokeWidth="0.5"/>
                      <circle cx="0" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                      <circle cx="12" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                      <circle cx="24" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf1Guilloche)" opacity="0.6"/>
                </svg>
              </div>

              {/* Gold inlay line */}
              <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-amber-600/30 via-amber-400/70 to-amber-600/30" />

              {/* === FULL WIDTH GEOMETRIC FRIEZE - Continuous pattern === */}
              <div className="absolute top-5 left-0 right-0 h-3">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
                  <defs>
                    <pattern id="shelf1Frieze" x="0" y="0" width="36" height="12" patternUnits="userSpaceOnUse">
                      {/* Diamond chain */}
                      <path d="M6 6 L12 2 L18 6 L12 10 Z" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      <path d="M24 6 L30 2 L36 6 L30 10 Z" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      {/* Connecting lines */}
                      <line x1="18" y1="6" x2="24" y2="6" stroke="#f59e0b" strokeWidth="0.5"/>
                      <line x1="0" y1="6" x2="6" y2="6" stroke="#f59e0b" strokeWidth="0.5"/>
                      {/* Center dots */}
                      <circle cx="12" cy="6" r="1" fill="#fbbf24" opacity="0.5"/>
                      <circle cx="30" cy="6" r="1" fill="#fbbf24" opacity="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf1Frieze)" opacity="0.55"/>
                </svg>
              </div>

              {/* === CORNER ACANTHUS DECORATIONS === */}
              <svg className={`absolute left-1 top-1 w-6 h-8 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10`} viewBox="0 0 24 32">
                <path d="M4 28 Q10 20 12 16 Q10 12 4 4" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                <path d="M6 20 Q10 16 12 14" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                <circle cx="12" cy="16" r="2" fill="#fbbf24" opacity="0.3"/>
              </svg>
              <svg className={`absolute right-1 top-1 w-6 h-8 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10 scale-x-[-1]`} viewBox="0 0 24 32">
                <path d="M4 28 Q10 20 12 16 Q10 12 4 4" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                <path d="M6 20 Q10 16 12 14" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                <circle cx="12" cy="16" r="2" fill="#fbbf24" opacity="0.3"/>
              </svg>

              {/* === FULL WIDTH EGG-AND-DART BOTTOM EDGE === */}
              <div className="absolute bottom-1 left-0 right-0 h-2.5">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 10">
                  <defs>
                    <pattern id="shelf1EggDart" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                      {/* Egg */}
                      <ellipse cx="5" cy="5" rx="3.5" ry="3" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      <ellipse cx="5" cy="5" rx="1.5" ry="1.2" fill="#fbbf24" opacity="0.25"/>
                      {/* Dart */}
                      <path d="M12 2 L14 8 L16 2" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                      <line x1="14" y1="3" x2="14" y2="7" stroke="#f59e0b" strokeWidth="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf1EggDart)" opacity="0.55"/>
                </svg>
              </div>

              {/* Bottom shadow */}
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
          <div className="relative mx-16">
            <div className="flex items-end justify-center gap-2.5 px-6 pb-0 min-h-[85px] flex-wrap overflow-hidden">
              {/* Leading ghost scrolls - add some before articles */}
              {Array.from({ length: Math.max(0, Math.floor((16 - getShelfArticles(1, shelf2Category).length) / 3)) }).map((_, i) => (
                <div key={`ghost-shelf2-leading-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                  <div className="h-[75px] relative">
                    <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                    <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                    <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-4/5" />
                    </div>
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                  </div>
                </div>
              ))}
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
              {/* Trailing ghost scrolls - remaining after leading and articles */}
              {(() => {
                const articleCount = getShelfArticles(1, shelf2Category).length
                const leadingCount = Math.max(0, Math.floor((16 - articleCount) / 3))
                const remainingGhosts = Math.max(0, 16 - articleCount - leadingCount)
                return Array.from({ length: remainingGhosts }).map((_, i) => (
                  <div key={`ghost-shelf2-trailing-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                    <div className="h-[75px] relative">
                      <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                      <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                      <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                        <div className="h-px bg-amber-600/25" />
                        <div className="h-px bg-amber-600/20 w-4/5" />
                        <div className="h-px bg-amber-600/25" />
                        <div className="h-px bg-amber-600/20 w-3/5" />
                      </div>
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                    </div>
                  </div>
                ))
              })()}
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

            {/* Ornate Roman shelf surface - Full Width Intricate Design */}
            <div className="h-12 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border-t-2 border-amber-400/60 shadow-2xl relative overflow-hidden">
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-400/50 to-amber-500/20" />

              {/* === FULL WIDTH GUILLOCHE BAND - Spans entire shelf === */}
              <div className="absolute top-1 left-0 right-0 h-3">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
                  <defs>
                    <pattern id="shelf2Guilloche" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
                      <path d="M0 6 Q6 0 12 6 Q18 12 24 6" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
                      <path d="M0 6 Q6 12 12 6 Q18 0 24 6" fill="none" stroke="#d97706" strokeWidth="0.5"/>
                      <circle cx="0" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                      <circle cx="12" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                      <circle cx="24" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf2Guilloche)" opacity="0.6"/>
                </svg>
              </div>

              {/* Gold inlay line */}
              <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-amber-600/30 via-amber-400/70 to-amber-600/30" />

              {/* === FULL WIDTH GEOMETRIC FRIEZE - Continuous pattern === */}
              <div className="absolute top-5 left-0 right-0 h-3">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
                  <defs>
                    <pattern id="shelf2Frieze" x="0" y="0" width="36" height="12" patternUnits="userSpaceOnUse">
                      {/* Diamond chain */}
                      <path d="M6 6 L12 2 L18 6 L12 10 Z" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      <path d="M24 6 L30 2 L36 6 L30 10 Z" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      {/* Connecting lines */}
                      <line x1="18" y1="6" x2="24" y2="6" stroke="#f59e0b" strokeWidth="0.5"/>
                      <line x1="0" y1="6" x2="6" y2="6" stroke="#f59e0b" strokeWidth="0.5"/>
                      {/* Center dots */}
                      <circle cx="12" cy="6" r="1" fill="#fbbf24" opacity="0.5"/>
                      <circle cx="30" cy="6" r="1" fill="#fbbf24" opacity="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf2Frieze)" opacity="0.55"/>
                </svg>
              </div>

              {/* === CORNER ACANTHUS DECORATIONS === */}
              <svg className={`absolute left-1 top-1 w-6 h-8 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10`} viewBox="0 0 24 32">
                <path d="M4 28 Q10 20 12 16 Q10 12 4 4" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                <path d="M6 20 Q10 16 12 14" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                <circle cx="12" cy="16" r="2" fill="#fbbf24" opacity="0.3"/>
              </svg>
              <svg className={`absolute right-1 top-1 w-6 h-8 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10 scale-x-[-1]`} viewBox="0 0 24 32">
                <path d="M4 28 Q10 20 12 16 Q10 12 4 4" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                <path d="M6 20 Q10 16 12 14" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                <circle cx="12" cy="16" r="2" fill="#fbbf24" opacity="0.3"/>
              </svg>

              {/* === FULL WIDTH EGG-AND-DART BOTTOM EDGE === */}
              <div className="absolute bottom-1 left-0 right-0 h-2.5">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 10">
                  <defs>
                    <pattern id="shelf2EggDart" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                      {/* Egg */}
                      <ellipse cx="5" cy="5" rx="3.5" ry="3" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      <ellipse cx="5" cy="5" rx="1.5" ry="1.2" fill="#fbbf24" opacity="0.25"/>
                      {/* Dart */}
                      <path d="M12 2 L14 8 L16 2" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                      <line x1="14" y1="3" x2="14" y2="7" stroke="#f59e0b" strokeWidth="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf2EggDart)" opacity="0.55"/>
                </svg>
              </div>

              {/* Bottom shadow */}
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
          <div className="relative mx-16">
            <div className="flex items-end justify-center gap-2.5 px-6 pb-0 min-h-[85px] flex-wrap overflow-hidden">
              {/* Leading ghost scrolls - add some before articles */}
              {Array.from({ length: Math.max(0, Math.floor((16 - getShelfArticles(2, shelf3Category).length) / 3)) }).map((_, i) => (
                <div key={`ghost-shelf3-leading-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                  <div className="h-[75px] relative">
                    <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                    <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                    <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                      <div className="h-px bg-amber-600/25" />
                      <div className="h-px bg-amber-600/20 w-4/5" />
                    </div>
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                  </div>
                </div>
              ))}
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
              {/* Trailing ghost scrolls - remaining after leading and articles */}
              {(() => {
                const articleCount = getShelfArticles(2, shelf3Category).length
                const leadingCount = Math.max(0, Math.floor((16 - articleCount) / 3))
                const remainingGhosts = Math.max(0, 16 - articleCount - leadingCount)
                return Array.from({ length: remainingGhosts }).map((_, i) => (
                  <div key={`ghost-shelf3-trailing-${i}`} className="flex-shrink-0 w-6 relative opacity-15 hover:opacity-25 transition-opacity" style={{ marginBottom: '0px' }}>
                    <div className="h-[75px] relative">
                      <div className="absolute inset-x-0.5 top-4 bottom-4 bg-amber-600/15 rounded-sm border border-amber-600/25" />
                      <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600/20 rounded-t-sm border border-amber-600/30" />
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600/20 rounded-b-sm border border-amber-600/30" />
                      <div className="absolute inset-x-1 top-5 bottom-5 flex flex-col justify-center gap-1">
                        <div className="h-px bg-amber-600/25" />
                        <div className="h-px bg-amber-600/20 w-4/5" />
                        <div className="h-px bg-amber-600/25" />
                        <div className="h-px bg-amber-600/20 w-3/5" />
                      </div>
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 border border-amber-600/30 rounded-full bg-amber-600/10" />
                    </div>
                  </div>
                ))
              })()}
            </div>

            {/* Center decorative medallion - matching Shelf 1/2 */}
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

            {/* Ornate Roman shelf surface - Full Width Intricate Design */}
            <div className="h-12 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border-t-2 border-amber-400/60 shadow-2xl relative overflow-hidden">
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-400/50 to-amber-500/20" />

              {/* === FULL WIDTH GUILLOCHE BAND - Spans entire shelf === */}
              <div className="absolute top-1 left-0 right-0 h-3">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
                  <defs>
                    <pattern id="shelf3Guilloche" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
                      <path d="M0 6 Q6 0 12 6 Q18 12 24 6" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
                      <path d="M0 6 Q6 12 12 6 Q18 0 24 6" fill="none" stroke="#d97706" strokeWidth="0.5"/>
                      <circle cx="0" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                      <circle cx="12" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                      <circle cx="24" cy="6" r="1.5" fill="#fbbf24" opacity="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf3Guilloche)" opacity="0.6"/>
                </svg>
              </div>

              {/* Gold inlay line */}
              <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-amber-600/30 via-amber-400/70 to-amber-600/30" />

              {/* === FULL WIDTH GEOMETRIC FRIEZE - Continuous pattern === */}
              <div className="absolute top-5 left-0 right-0 h-3">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
                  <defs>
                    <pattern id="shelf3Frieze" x="0" y="0" width="36" height="12" patternUnits="userSpaceOnUse">
                      {/* Diamond chain */}
                      <path d="M6 6 L12 2 L18 6 L12 10 Z" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      <path d="M24 6 L30 2 L36 6 L30 10 Z" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      {/* Connecting lines */}
                      <line x1="18" y1="6" x2="24" y2="6" stroke="#f59e0b" strokeWidth="0.5"/>
                      <line x1="0" y1="6" x2="6" y2="6" stroke="#f59e0b" strokeWidth="0.5"/>
                      {/* Center dots */}
                      <circle cx="12" cy="6" r="1" fill="#fbbf24" opacity="0.5"/>
                      <circle cx="30" cy="6" r="1" fill="#fbbf24" opacity="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf3Frieze)" opacity="0.55"/>
                </svg>
              </div>

              {/* === CORNER ACANTHUS DECORATIONS === */}
              <svg className={`absolute left-1 top-1 w-6 h-8 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10`} viewBox="0 0 24 32">
                <path d="M4 28 Q10 20 12 16 Q10 12 4 4" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                <path d="M6 20 Q10 16 12 14" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                <circle cx="12" cy="16" r="2" fill="#fbbf24" opacity="0.3"/>
              </svg>
              <svg className={`absolute right-1 top-1 w-6 h-8 ${isNightTime ? 'opacity-50' : 'opacity-40'} z-10 scale-x-[-1]`} viewBox="0 0 24 32">
                <path d="M4 28 Q10 20 12 16 Q10 12 4 4" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                <path d="M6 20 Q10 16 12 14" fill="none" stroke="#f59e0b" strokeWidth="0.7"/>
                <circle cx="12" cy="16" r="2" fill="#fbbf24" opacity="0.3"/>
              </svg>

              {/* === FULL WIDTH EGG-AND-DART BOTTOM EDGE === */}
              <div className="absolute bottom-1 left-0 right-0 h-2.5">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 10">
                  <defs>
                    <pattern id="shelf3EggDart" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                      {/* Egg */}
                      <ellipse cx="5" cy="5" rx="3.5" ry="3" fill="none" stroke="#fbbf24" strokeWidth="0.7"/>
                      <ellipse cx="5" cy="5" rx="1.5" ry="1.2" fill="#fbbf24" opacity="0.25"/>
                      {/* Dart */}
                      <path d="M12 2 L14 8 L16 2" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                      <line x1="14" y1="3" x2="14" y2="7" stroke="#f59e0b" strokeWidth="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shelf3EggDart)" opacity="0.55"/>
                </svg>
              </div>

              {/* Bottom shadow */}
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

      {/* Non-authenticated users see locked content message */}
      {!session ? (
        <div className="relative bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 min-h-[60vh]">
          {/* Decorative overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q100 45 200 50' fill='none' stroke='%23fff' stroke-width='0.3'/%3E%3Cpath d='M0 100 Q100 95 200 100' fill='none' stroke='%23fff' stroke-width='0.3'/%3E%3Cpath d='M0 150 Q100 145 200 150' fill='none' stroke='%23fff' stroke-width='0.3'/%3E%3C/svg%3E")`,
          }} />

          {/* Locked content message */}
          <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4">
            {/* Lock icon with glow */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-600/50">
                <Lock className="w-10 h-10 text-amber-200" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 text-center mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Unlock the Grand Library
            </h2>

            {/* Description */}
            <p className="text-amber-300/80 text-center max-w-md mb-8 leading-relaxed">
              Join our community to access the full collection of wisdom scrolls,
              contribute your own articles, and track your reading journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/auth/signup"
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 border-2 border-amber-500/50"
              >
                <UserPlus className="w-5 h-5" />
                Join Free
              </Link>
              <Link
                href="/auth/signin"
                className="flex items-center gap-2 px-8 py-3 bg-transparent hover:bg-amber-800/30 text-amber-200 font-bold rounded-xl transition-all border-2 border-amber-600/50"
              >
                Sign In
              </Link>
            </div>

            {/* Features preview */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
              <div className="flex flex-col items-center text-center p-4">
                <BookOpen className="w-8 h-8 text-amber-500 mb-2" />
                <p className="text-sm font-semibold text-amber-200">Browse All Articles</p>
                <p className="text-xs text-amber-400/70 mt-1">Access our full library</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <PenSquare className="w-8 h-8 text-amber-500 mb-2" />
                <p className="text-sm font-semibold text-amber-200">Write & Share</p>
                <p className="text-xs text-amber-400/70 mt-1">Contribute your wisdom</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <TrendingUp className="w-8 h-8 text-amber-500 mb-2" />
                <p className="text-sm font-semibold text-amber-200">Track Progress</p>
                <p className="text-xs text-amber-400/70 mt-1">Monitor your journey</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
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

                      {/* Read button - conditional for authenticated users */}
                      {session ? (
                        <Link href={`/articles/${article.slug}`} className="block">
                          <button className="w-full py-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-white font-bold rounded-lg shadow-lg border-2 border-amber-500/40 transition-all flex items-center justify-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            <span>Read Article Scroll</span>
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </Link>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-center text-sm text-amber-800 italic" style={{ fontFamily: 'Georgia, serif' }}>
                            Join to read this scroll
                          </p>
                          <div className="flex gap-2">
                            <Link href="/auth/signup" className="flex-1">
                              <button className="w-full py-2.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-white font-bold rounded-lg shadow-lg border-2 border-amber-500/40 transition-all flex items-center justify-center gap-2">
                                <Star className="w-4 h-4" />
                                <span>Join Free</span>
                              </button>
                            </Link>
                            <Link href="/auth/signin" className="flex-1">
                              <button className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-lg shadow border-2 border-amber-500/40 transition-all flex items-center justify-center gap-2">
                                <span>Sign In</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
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
      )}

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
              initial={{ scaleY: 0.1, scaleX: 0.95, opacity: 0, y: -50 }}
              animate={{ scaleY: 1, scaleX: 1, opacity: 1, y: 0 }}
              exit={{
                scaleY: 0.05,
                scaleX: 0.98,
                opacity: 0,
                y: -30,
                transition: {
                  duration: 0.35,
                  ease: [0.4, 0, 0.8, 0.2],
                  scaleY: { duration: 0.3, ease: [0.6, 0, 1, 0.4] }
                }
              }}
              transition={{
                duration: 0.5,
                ease: [0.2, 0.8, 0.3, 1],
                scaleY: { duration: 0.45, ease: [0.1, 0.9, 0.3, 1] }
              }}
              style={{ transformOrigin: 'top center', perspective: '1000px' }}
              className="relative w-full max-w-2xl mx-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scroll container with rolled ends */}
              <div className="relative flex flex-col">
                {/* Top scroll roller - wooden rod */}
                <div className="relative h-8 z-20 flex-shrink-0">
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

                {/* Parchment body - no scroll, show all content */}
                <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 shadow-2xl"
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

                  {/* Content area - compact padding for better fit */}
                  <div className="relative p-4 sm:p-6">
                    {/* Category seal - compact */}
                    <div className="flex items-center justify-center mb-3">
                      <span className="px-3 py-1 text-[9px] font-bold text-black uppercase tracking-[0.15em] border border-amber-600/50 bg-amber-200/60 rounded-sm shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
                        {previewArticle.category?.name || 'Article'}
                      </span>
                    </div>

                    {/* Cover image with parchment frame - compact height */}
                    {previewArticle.coverImage && (
                      <div className="relative w-full h-32 sm:h-40 overflow-hidden mb-4 border-3 border-amber-700/40 shadow-lg">
                        <img
                          src={previewArticle.coverImage}
                          alt={previewArticle.title}
                          className="w-full h-full object-cover sepia-[20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                      </div>
                    )}

                    {/* Title - rich sepia ink with ink fade-in effect */}
                    <h2 className="text-xl sm:text-2xl font-bold text-black text-center mb-3 leading-tight tracking-tight ink-text" style={{ fontFamily: 'Georgia, serif', animationDelay: '0.2s' }}>
                      {previewArticle.title}
                    </h2>

                    {/* Decorative scroll divider with ink fade */}
                    <div className="flex items-center justify-center gap-2 mb-3 ink-text" style={{ animationDelay: '0.4s' }}>
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600/50" />
                      <svg className="w-5 h-5 text-amber-600/70" viewBox="0 0 24 24">
                        <path d="M12 4 L16 8 L12 12 L8 8 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.5"/>
                      </svg>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600/50" />
                    </div>

                    {/* Excerpt - elegant calligraphy style with ink fade-in, line clamp for long excerpts */}
                    <p className="text-sm text-black text-center mb-4 leading-relaxed italic ink-text line-clamp-3" style={{ fontFamily: 'Georgia, serif', lineHeight: '1.7', animationDelay: '0.5s' }}>
                      "{previewArticle.excerpt}"
                    </p>

                    {/* Author attribution - manuscript style - compact */}
                    <div className="flex items-center justify-center gap-3 mb-4 py-3 border-y border-amber-600/30">
                      <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-amber-600/50 flex items-center justify-center shadow-md overflow-hidden">
                        {previewArticle.author?.image ? (
                          <img src={previewArticle.author.image} alt={previewArticle.author.name} className="w-full h-full rounded-full object-cover sepia-[15%]" />
                        ) : (
                          <User className="w-6 h-6 text-amber-700" />
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-black text-base" style={{ fontFamily: 'Georgia, serif' }}>
                          {previewArticle.author?.name || 'Anonymous Scribe'}
                        </p>
                        <p className="text-xs text-black/70" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                          {new Date(previewArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Stats - parchment ink style - compact */}
                    <div className="flex items-center justify-center gap-4 mb-4 text-black">
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

                    {/* Reading progress if exists - compact (only for authenticated users) */}
                    {session && readingProgress[previewArticle.id] && (
                      <div className="mb-4 p-2 bg-amber-200/50 border border-amber-600/40 rounded-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-black italic" style={{ fontFamily: 'Georgia, serif' }}>Your Progress</span>
                          <span className="text-xs font-bold text-black">
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
                    <div className="flex flex-col items-center gap-4">
                      {session ? (
                        /* Authenticated user - show read and save buttons */
                        <div className="flex items-center justify-center gap-4">
                          <Link href={`/articles/${previewArticle.slug}`} onClick={closePreview}>
                            <Button className="bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 text-amber-950 font-bold px-8 py-3 rounded-sm shadow-lg border border-amber-600/60" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
                              <BookOpen className="w-4 h-4 mr-2" />
                              Read Article Scroll
                            </Button>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaveArticle(previewArticle.id)
                            }}
                            className={`p-3 rounded-sm shadow-md transition-colors border-2 ${
                              savedArticles.includes(previewArticle.id)
                                ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-amber-950 border-amber-600/60'
                                : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-500/50'
                            }`}
                          >
                            <Bookmark className={`w-5 h-5 ${savedArticles.includes(previewArticle.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      ) : (
                        /* Non-authenticated user - show sign-up CTA */
                        <div className="text-center">
                          <p className="text-sm text-black mb-3 italic" style={{ fontFamily: 'Georgia, serif' }}>
                            Join our community to unlock this scroll
                          </p>
                          <div className="flex items-center justify-center gap-3">
                            <Link href="/auth/signup" onClick={closePreview}>
                              <Button className="bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 text-amber-950 font-bold px-6 py-3 rounded-sm shadow-lg border border-amber-600/60" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
                                <Star className="w-4 h-4 mr-2" />
                                Join Free
                              </Button>
                            </Link>
                            <Link href="/auth/signin" onClick={closePreview}>
                              <Button variant="outline" className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold px-6 py-3 rounded-sm shadow-md border-2 border-amber-600/50" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
                                Sign In
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom scroll roller - wooden rod */}
                <div className="relative h-8 z-20 flex-shrink-0">
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

      {/* Dust Puff Particles Portal - Fixed position particles for ancient scroll clicks */}
      {dustPuffPosition.active && (
        <div
          className="fixed pointer-events-none z-[100]"
          style={{
            left: dustPuffPosition.x,
            top: dustPuffPosition.y,
          }}
        >
          {/* Multiple dust particles exploding outward */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360
            const distance = 20 + (i % 3) * 15
            const radians = (angle * Math.PI) / 180
            const x = Math.cos(radians) * distance
            const y = Math.sin(radians) * distance - 20 // Bias upward

            return (
              <div
                key={`dust-puff-${i}`}
                className="absolute dust-puff-particle"
                style={{
                  '--puff-x': `${x}px`,
                  '--puff-y': `${y}px`,
                  '--puff-delay': `${i * 0.02}s`,
                  width: `${3 + (i % 4)}px`,
                  height: `${3 + (i % 4)}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(${180 + i * 5}, ${160 + i * 3}, ${120 + i * 2}, 0.9), rgba(161, 137, 99, 0.5))`,
                  boxShadow: '0 0 2px rgba(161, 137, 99, 0.5)',
                } as React.CSSProperties}
              />
            )
          })}
          {/* Larger central dust cloud */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 dust-puff-particle"
            style={{
              '--puff-x': '0px',
              '--puff-y': '-25px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(180, 160, 120, 0.6), transparent 70%)',
              filter: 'blur(3px)',
            } as React.CSSProperties}
          />
        </div>
      )}

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
