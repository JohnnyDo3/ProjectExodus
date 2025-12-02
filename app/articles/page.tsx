'use client'

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
  Sword,
  MessageCircle as MessageIcon,
  Stethoscope,
  Lightbulb,
  HeartHandshake,
  Flower2,
  Scale,
  CheckCircle2,
  Loader2,
} from 'lucide-react'

// Guardian archetypes for author theming
const GUARDIAN_ARCHETYPES: Record<string, { gradient: string; icon: any; accentColor: string }> = {
  michael: { gradient: 'from-red-600 to-orange-500', icon: Sword, accentColor: 'text-red-500' },
  gabriel: { gradient: 'from-sky-500 to-blue-600', icon: MessageIcon, accentColor: 'text-sky-500' },
  raphael: { gradient: 'from-emerald-500 to-green-600', icon: Stethoscope, accentColor: 'text-emerald-500' },
  uriel: { gradient: 'from-amber-500 to-yellow-500', icon: Lightbulb, accentColor: 'text-amber-500' },
  camael: { gradient: 'from-pink-500 to-rose-600', icon: HeartHandshake, accentColor: 'text-pink-500' },
  jophiel: { gradient: 'from-violet-500 to-purple-600', icon: Flower2, accentColor: 'text-violet-500' },
  zadkiel: { gradient: 'from-indigo-500 to-blue-700', icon: Scale, accentColor: 'text-indigo-500' },
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

export default function ArticlesPage() {
  const { data: session } = useSession()
  const [articles, setArticles] = useState<Article[]>([])
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSort, setActiveSort] = useState<SortOption>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const sortOptions: { value: SortOption; label: string; icon: any }[] = [
    { value: 'all', label: 'All Articles', icon: BookOpen },
    { value: 'newest', label: 'Newest', icon: Sparkles },
    { value: 'oldest', label: 'Oldest', icon: History },
    { value: 'most_read', label: 'Most Read', icon: TrendingUp },
    { value: 'read', label: 'Already Read', icon: CheckCircle2 },
  ]

  const fetchArticles = useCallback(async (reset = false) => {
    try {
      const currentOffset = reset ? 0 : offset
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

      const res = await fetch(`/api/articles?${params}`)
      const data = await res.json()

      if (data.success) {
        if (reset) {
          // Set featured article from the first article if it exists and is actually featured
          // Show featured article for 'all' and 'newest' filters when not searching
          const featured = data.data.find((a: Article) => a.featured)
          if (featured && (activeSort === 'all' || activeSort === 'newest') && !searchQuery) {
            setFeaturedArticle(featured)
            setArticles(data.data.filter((a: Article) => a.id !== featured.id))
          } else {
            setFeaturedArticle(null)
            setArticles(data.data)
          }
          setOffset(12)
        } else {
          setArticles(prev => [...prev, ...data.data])
          setOffset(prev => prev + 12)
        }
        setHasMore(data.pagination.hasMore)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }, [activeSort, searchQuery, offset])

  useEffect(() => {
    setIsLoading(true)
    fetchArticles(true)
  }, [activeSort, searchQuery])

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
    return GUARDIAN_ARCHETYPES[archetype || 'michael'] || GUARDIAN_ARCHETYPES.michael
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
              FEATURED ARTICLES
            </h1>
            <p className="text-xl font-medium opacity-90 mb-4">
              Case studies, insights, and knowledge written by members of the Project Exodus community
            </p>
            <p className="text-base font-medium opacity-75 mb-8 max-w-2xl mx-auto">
              Articles are in-depth explorations of ideas, experiences, and lessons learned on our collective journey toward building a better future. Share your story and contribute to our growing body of knowledge.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 font-medium focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Write Article CTA */}
            {session && (
              <Link href="/articles/write">
                <Button className="mt-6 bg-white text-[var(--primary)] hover:bg-white/90 font-black text-lg px-8 py-6 rounded-xl shadow-lg">
                  <PenSquare className="w-5 h-5 mr-2" />
                  WRITE AN ARTICLE
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-[var(--card)] border-b-2 border-[var(--border)] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Sort Options */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {sortOptions.map((option) => {
                const Icon = option.icon
                const isActive = activeSort === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() => setActiveSort(option.value)}
                    disabled={option.value === 'read' && !session}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[var(--primary)] text-white shadow-lg'
                        : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                    } ${option.value === 'read' && !session ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={option.value === 'read' && !session ? 'Sign in to see read articles' : ''}
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </button>
                )
              })}
            </div>

            {/* Mobile Write Button */}
            {session && (
              <Link href="/articles/write" className="sm:hidden">
                <Button size="sm" className="font-bold">
                  <PenSquare className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && articles.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-theme-primary animate-spin mx-auto mb-4" />
              <p className="text-lg font-bold text-theme-muted">Loading articles...</p>
            </div>
          </div>
        ) : articles.length === 0 && !featuredArticle ? (
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-theme-muted mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">No Articles Yet</h2>
            <p className="text-theme-muted font-medium mb-6">
              {searchQuery
                ? `No articles found for "${searchQuery}"`
                : activeSort === 'read'
                ? "You haven't read any articles yet"
                : 'Be the first to share your knowledge!'}
            </p>
            {session && (
              <Link href="/articles/write">
                <Button className="font-black">
                  <PenSquare className="w-4 h-4 mr-2" />
                  Write the First Article
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Featured Article Hero */}
            {featuredArticle && (
              <Link href={`/articles/${featuredArticle.slug}`}>
                <Card className="mb-8 border-4 border-theme-primary overflow-hidden hover:shadow-theme-2xl transition-all group cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative h-64 md:h-auto min-h-[300px] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
                      {featuredArticle.coverImage ? (
                        <img
                          src={featuredArticle.coverImage}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-24 h-24 text-white/50" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-[var(--secondary)] text-white font-black text-sm rounded-full shadow-lg">
                          FEATURED
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[var(--primary)]/10 text-theme-primary font-bold text-xs rounded-full">
                          {featuredArticle.category.name}
                        </span>
                        {featuredArticle.hasRead && (
                          <span className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            Read
                          </span>
                        )}
                      </div>

                      <h2 className="text-3xl font-black text-[var(--foreground)] mb-3 group-hover:text-theme-primary transition-colors line-clamp-2">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-theme-muted font-medium mb-4 line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAuthorTheme(featuredArticle.author.guardianArchetype).gradient} flex items-center justify-center`}>
                          {featuredArticle.author.image ? (
                            <img src={featuredArticle.author.image} alt={featuredArticle.author.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--foreground)]">{featuredArticle.author.name}</p>
                          <p className="text-xs text-theme-muted">
                            {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-theme-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredArticle.readTime} min read
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {featuredArticle.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {featuredArticle._count.comments}
                        </span>
                      </div>

                      <div className="mt-6 flex items-center text-theme-primary font-bold group-hover:gap-3 gap-2 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )}

            {/* Article Grid - Innovative Masonry-style Layout */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => {
                const authorTheme = getAuthorTheme(article.author.guardianArchetype)
                const isLarge = index === 0 || index === 5 // Make some cards larger

                return (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className={isLarge ? 'sm:col-span-2 lg:col-span-1' : ''}
                  >
                    <Card className={`h-full border-2 border-[var(--border)] hover:border-theme-primary hover:shadow-theme-xl transition-all group cursor-pointer overflow-hidden ${article.hasRead ? 'opacity-75' : ''}`}>
                      {/* Cover Image */}
                      {article.coverImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {article.hasRead && (
                            <div className="absolute top-3 right-3">
                              <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                                Read
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <CardContent className="p-5">
                        {/* Category */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-1 bg-[var(--muted)] text-theme-muted font-bold text-xs rounded-lg">
                            {article.category.name}
                          </span>
                          {!article.coverImage && article.hasRead && (
                            <span className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              Read
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-black text-[var(--foreground)] mb-2 group-hover:text-theme-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-theme-muted font-medium mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* Author Row */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${authorTheme.gradient} flex items-center justify-center flex-shrink-0`}>
                            {article.author.image ? (
                              <img src={article.author.image} alt={article.author.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[var(--foreground)] truncate">{article.author.name}</p>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between text-xs text-theme-muted pt-3 border-t border-[var(--border)]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
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
            <div ref={loadMoreRef} className="py-8 flex justify-center">
              {isLoading && articles.length > 0 && (
                <div className="flex items-center gap-2 text-theme-muted">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Loading more articles...</span>
                </div>
              )}
              {!hasMore && articles.length > 0 && (
                <p className="text-theme-muted font-medium">
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
          className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-[var(--primary)] text-white rounded-full shadow-theme-xl flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
        >
          <PenSquare className="w-6 h-6" />
        </Link>
      )}
    </div>
  )
}
