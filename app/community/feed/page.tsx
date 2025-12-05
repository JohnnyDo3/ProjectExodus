'use client'

import { useEffect, useState } from 'react'
import { CreatePost } from '@/components/social/CreatePost'
import { FeedPost } from '@/components/social/FeedPost'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Loader2, TrendingUp, Users, Sparkles } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface TrendingHashtag {
  hashtag: string
  count: number
}

export default function SocialFeedPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filter, setFilter] = useState<'all' | 'newest' | 'oldest' | 'popular'>('all')
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([])
  const [loadingTrending, setLoadingTrending] = useState(true)

  const fetchPosts = async (pageNum: number = 1) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/social/feed?page=${pageNum}&limit=50`)
      const data = await res.json()

      if (data.success) {
        if (pageNum === 1) {
          setPosts(data.data.posts)
        } else {
          setPosts(prev => [...prev, ...data.data.posts])
        }
        setHasMore(data.data.pagination.page < data.data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTrendingHashtags = async () => {
    try {
      setLoadingTrending(true)
      const res = await fetch('/api/social/trending')
      const data = await res.json()

      if (data.success) {
        setTrendingHashtags(data.data)
      }
    } catch (error) {
      console.error('Error fetching trending hashtags:', error)
    } finally {
      setLoadingTrending(false)
    }
  }

  useEffect(() => {
    fetchPosts(1)
    fetchTrendingHashtags()
  }, [])

  useEffect(() => {
    // Apply filter
    let sorted = [...posts]

    if (filter === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (filter === 'oldest') {
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (filter === 'popular') {
      sorted.sort((a, b) => {
        const popularityA = (a._count?.likes || 0) + (a._count?.comments || 0)
        const popularityB = (b._count?.likes || 0) + (b._count?.comments || 0)
        return popularityB - popularityA
      })
    }

    setFilteredPosts(sorted)
  }, [posts, filter])

  const handlePostCreated = () => {
    fetchPosts(1)
    setPage(1)
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchPosts(nextPage)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Community" fallbackUrl="/community" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <h1 className="text-5xl font-black text-[var(--foreground)]">
              COMMUNITY ROUND TABLE
            </h1>
            <p className="text-xl font-semibold text-theme-muted">
              Share your sustainability journey, connect with like-minded people
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - User Stats */}
            <div className="lg:col-span-1 space-y-6">
              {session?.user && (
                <Card className="border-4 border-theme-primary">
                  <CardContent className="p-6">
                    <div className="text-center">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl font-black text-white">
                            {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-black text-[var(--foreground)] mb-1">
                        {session.user.name || 'Anonymous User'}
                      </h3>
                      <Link href="/profile/edit">
                        <Button variant="outline" size="sm" className="mt-3 font-black">
                          EDIT PROFILE
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Links */}
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-theme-accent" />
                    EXPLORE
                  </h3>
                  <div className="space-y-2">
                    <Link href="/community/projects">
                      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[var(--muted)] transition-colors font-bold text-[var(--foreground)]">
                        Community Projects
                      </button>
                    </Link>
                    <Link href="/products">
                      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[var(--muted)] transition-colors font-bold text-[var(--foreground)]">
                        Sustainable Products
                      </button>
                    </Link>
                    <Link href="/learn">
                      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[var(--muted)] transition-colors font-bold text-[var(--foreground)]">
                        Learn & Resources
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-theme-secondary" />
                    TRENDING
                  </h3>
                  <div className="space-y-3">
                    {loadingTrending ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin text-theme-secondary" />
                      </div>
                    ) : trendingHashtags.length > 0 ? (
                      trendingHashtags.slice(0, 5).map((tag, i) => (
                        <button
                          key={i}
                          className="block w-full text-left px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                        >
                          <div className="font-black text-theme-primary">{tag.hashtag}</div>
                          <div className="text-xs font-semibold text-theme-muted">{tag.count} {tag.count === 1 ? 'post' : 'posts'}</div>
                        </button>
                      ))
                    ) : (
                      <p className="text-sm font-semibold text-theme-muted text-center py-4">
                        No trending hashtags yet. Be the first to use #hashtags!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <CreatePost onPostCreated={handlePostCreated} />

              {/* Filter Buttons */}
              <Card className="border-2 border-theme-primary">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[var(--foreground)] mr-2">FILTER:</span>
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                        filter === 'all'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      All Posts
                    </button>
                    <button
                      onClick={() => setFilter('newest')}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                        filter === 'newest'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => setFilter('oldest')}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                        filter === 'oldest'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Oldest
                    </button>
                    <button
                      onClick={() => setFilter('popular')}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                        filter === 'popular'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                      }`}
                    >
                      Most Popular
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              {loading && page === 1 ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-12 h-12 animate-spin text-theme-primary" />
                </div>
              ) : filteredPosts.length > 0 ? (
                <>
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <FeedPost
                        key={post.id}
                        post={post}
                        onLike={() => {}}
                        onComment={() => {}}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="text-center py-6">
                      <Button
                        onClick={loadMore}
                        disabled={loading}
                        size="lg"
                        className="font-black px-12"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            LOADING...
                          </>
                        ) : (
                          'LOAD MORE POSTS'
                        )}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Card className="border-4 border-theme-secondary">
                  <CardContent className="p-16 text-center">
                    <Users className="w-20 h-20 text-theme-secondary mx-auto mb-6" />
                    <h3 className="text-3xl font-black mb-4 text-theme-muted">
                      NO POSTS YET
                    </h3>
                    <p className="text-lg font-semibold mb-8 text-theme-muted">
                      Be the first to share your sustainability story!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
