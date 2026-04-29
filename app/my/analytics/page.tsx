'use client'

import { useSession } from 'next-auth/react'
import { useHasMounted } from '@/lib/hooks/useHasMounted'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Eye,
  BookOpen,
  Clock,
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  ArrowLeft,
  RefreshCw,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/navigation/BackButton'

interface AnalyticsOverview {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalViews: number
  totalReads: number
  totalTimeSpent: number
  avgReadCompletion: number | null
  avgRating: number | null
  totalReviews: number
  totalComments: number
  followerCount: number
}

interface TopArticle {
  id: string
  title: string
  slug: string
  views: number
  comments: number
  reviews: number
  category: string | null
}

interface CategoryBreakdown {
  categoryId: string
  categoryName: string
  articleCount: number
  views: number
}

interface EngagementTrend {
  date: string
  views: number
  reads: number
  timeSpent: number
}

interface AnalyticsData {
  overview: AnalyticsOverview
  topArticles: TopArticle[]
  topCategories: CategoryBreakdown[]
  engagementTrend: EngagementTrend[]
  period: number
}

export default function AuthorAnalyticsPage() {
  const { data: session, status } = useSession()
  const hasMounted = useHasMounted()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [period, setPeriod] = useState(30)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin')
    }
  }, [status])

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch(`/api/author/analytics?period=${period}`)
        const data = await res.json()
        if (data.success) {
          setAnalytics(data.data)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchAnalytics()
    }
  }, [status, period])

  const refresh = async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch(`/api/author/analytics?period=${period}`)
      const data = await res.json()
      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error('Error refreshing analytics:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
  }

  if ((hasMounted && status === 'loading') || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-[var(--muted-foreground)]">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <BarChart3 className="w-16 h-16 text-[var(--muted-foreground)] mx-auto" />
          <p className="text-lg font-bold text-[var(--foreground)]">No analytics data yet</p>
          <p className="text-[var(--muted-foreground)]">Start publishing articles to see your analytics</p>
          <Link href="/articles/write">
            <Button>Write Your First Article</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <BackButton label="Back" fallbackUrl="/my/volition" />
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-black text-[var(--foreground)]">Author Analytics</h1>
              <p className="text-[var(--muted-foreground)]">
                Track your article performance and reader engagement
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Period Selector */}
              <select
                value={period}
                onChange={(e) => setPeriod(parseInt(e.target.value))}
                className="px-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <Button
                variant="outline"
                onClick={refresh}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">Total Views</p>
                    <p className="text-2xl font-black text-blue-500">
                      {analytics.overview.totalViews.toLocaleString()}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">Completed Reads</p>
                    <p className="text-2xl font-black text-green-500">
                      {analytics.overview.totalReads.toLocaleString()}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-500/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">Time Spent</p>
                    <p className="text-2xl font-black text-purple-500">
                      {formatDuration(analytics.overview.totalTimeSpent)}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">Avg Rating</p>
                    <p className="text-2xl font-black text-amber-500">
                      {analytics.overview.avgRating?.toFixed(1) || 'N/A'}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-amber-500/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-5 h-5 mx-auto mb-2 text-[var(--primary)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {analytics.overview.publishedArticles}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Published</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-5 h-5 mx-auto mb-2 text-[var(--muted-foreground)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {analytics.overview.draftArticles}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Drafts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-5 h-5 mx-auto mb-2 text-[var(--primary)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {analytics.overview.totalComments}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Comments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-5 h-5 mx-auto mb-2 text-amber-500" />
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {analytics.overview.totalReviews}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-5 h-5 mx-auto mb-2 text-[var(--primary)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {analytics.overview.followerCount}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Followers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Top Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                Top Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.topArticles.length === 0 ? (
                <p className="text-[var(--muted-foreground)] text-center py-4">
                  No articles yet
                </p>
              ) : (
                <div className="space-y-3">
                  {analytics.topArticles.map((article, index) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                    >
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                        ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                          index === 1 ? 'bg-gray-400/20 text-gray-400' :
                          index === 2 ? 'bg-orange-500/20 text-orange-500' :
                          'bg-[var(--muted)] text-[var(--muted-foreground)]'}
                      `}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--foreground)] truncate group-hover:text-[var(--primary)]">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {article.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {article.reviews}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
                Category Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.topCategories.length === 0 ? (
                <p className="text-[var(--muted-foreground)] text-center py-4">
                  No category data yet
                </p>
              ) : (
                <div className="space-y-4">
                  {analytics.topCategories.map((category) => {
                    const maxViews = Math.max(...analytics.topCategories.map(c => c.views))
                    const percentage = (category.views / maxViews) * 100

                    return (
                      <div key={category.categoryId}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-[var(--foreground)]">
                            {category.categoryName}
                          </span>
                          <span className="text-[var(--muted-foreground)]">
                            {category.articleCount} articles • {category.views} views
                          </span>
                        </div>
                        <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
              Engagement Trend ({period} days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.engagementTrend.length === 0 ? (
              <p className="text-[var(--muted-foreground)] text-center py-8">
                Not enough data to show trends
              </p>
            ) : (
              <div className="h-48">
                {/* Simple bar chart */}
                <div className="flex items-end justify-between h-full gap-1">
                  {analytics.engagementTrend.slice(-14).map((day, index) => {
                    const maxViews = Math.max(...analytics.engagementTrend.map(d => d.views)) || 1
                    const height = (day.views / maxViews) * 100

                    return (
                      <div
                        key={day.date}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <motion.div
                          className="w-full bg-gradient-to-t from-[var(--primary)] to-[var(--accent)] rounded-t"
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(height, 4)}%` }}
                          transition={{ delay: index * 0.05 }}
                          title={`${day.date}: ${day.views} views`}
                        />
                        <span className="text-[8px] text-[var(--muted-foreground)] rotate-45 origin-left whitespace-nowrap">
                          {new Date(day.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/articles/write">
            <Button className="gap-2">
              <FileText className="w-4 h-4" />
              Write New Article
            </Button>
          </Link>
          <Link href="/articles">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
