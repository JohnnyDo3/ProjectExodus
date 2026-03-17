'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDown, MessageSquare, Loader2 } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import { CreatePost } from '@/components/social/CreatePost'
import { FeedPost } from '@/components/social/FeedPost'
import { Button } from '@/components/ui/Button'

import { RoundTable } from '@/components/community/roundtable/RoundTable'
import { PostOrbit } from '@/components/community/roundtable/PostOrbit'
import { TableCenterpiece } from '@/components/community/roundtable/TableCenterpiece'
import { PostPreviewOverlay } from '@/components/community/roundtable/PostPreviewOverlay'

interface TrendingHashtag {
  hashtag: string
  count: number
}

export default function DiscussionsPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([])
  const [selectedPost, setSelectedPost] = useState<any | null>(null)

  const fetchPosts = useCallback(async (pageNum: number = 1) => {
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
  }, [])

  const fetchTrendingHashtags = useCallback(async () => {
    try {
      const res = await fetch('/api/social/trending')
      const data = await res.json()
      if (data.success) setTrendingHashtags(data.data)
    } catch (error) {
      console.error('Error fetching trending:', error)
    }
  }, [])

  useEffect(() => {
    fetchPosts(1)
    fetchTrendingHashtags()
  }, [fetchPosts, fetchTrendingHashtags])

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
      {/* ═══ HERO - above the fold ═══ */}
      <section className="h-[100svh] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--primary)_8%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--accent)_3%,var(--background))]" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <BackButton label="Back to Community" fallbackUrl="/community" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="space-y-4 mb-16">
            <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--foreground)]/40">
              <span>⚜</span>
              <span>The Community</span>
              <span>⚜</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[var(--foreground)] tracking-tight">
              ROUND TABLE
            </h1>
            <p className="text-lg sm:text-xl text-[var(--foreground)]/50 font-medium max-w-lg mx-auto">
              Where every voice shapes the future. Join the discussion.
            </p>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-[var(--foreground)]/30" />
          </div>
        </div>

        {/* Table edge peeking from bottom */}
        <div className="relative z-10 flex justify-center">
          <div
            className="w-[80vw] max-w-[900px] h-[50px] rounded-t-full -mb-1"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, #8B6914 0%, #5C3D0E 60%, #3A2508 100%)',
              border: '6px solid #2E1D06',
              borderBottom: 'none',
              boxShadow: '0 -8px 30px rgba(0,0,0,0.3), inset 0 4px 12px rgba(139,105,20,0.2)',
            }}
          />
        </div>
      </section>

      {/* ═══ THE ROUND TABLE — bird's eye with orbiting posts ═══ */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
        {/* Dark ambient bg behind table */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--accent)_3%,var(--background))] via-[var(--background)] to-[var(--background)]" />

        <div className="relative z-10">
          {loading && posts.length === 0 ? (
            <div className="flex justify-center py-32">
              <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
            </div>
          ) : (
            <RoundTable className="w-[min(85vw,700px)] sm:w-[min(80vw,800px)]">
              {/* Center content */}
              <TableCenterpiece
                trending={trendingHashtags}
                totalPosts={posts.length}
              />
              {/* Orbiting post cards */}
              <PostOrbit
                posts={posts}
                onSelectPost={setSelectedPost}
              />
            </RoundTable>
          )}
        </div>
      </section>

      {/* ═══ FULL FEED BELOW ═══ */}
      <section className="relative py-12 bg-gradient-to-b from-[var(--background)] to-[color-mix(in_srgb,var(--primary)_5%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
              <MessageSquare className="w-5 h-5 text-[var(--foreground)]/30" />
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
            </div>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
              ALL DISCUSSIONS
            </h2>
            <p className="text-sm text-[var(--foreground)]/50">
              Full feed with all community posts
            </p>
          </div>

          {session?.user && (
            <div className="mb-8">
              <CreatePost onPostCreated={handlePostCreated} />
            </div>
          )}

          {loading && page === 1 ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  onLike={() => {}}
                  onComment={() => {}}
                />
              ))}

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
                      'LOAD MORE'
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <MessageSquare className="w-16 h-16 text-[var(--foreground)]/20 mx-auto mb-4" />
              <h3 className="text-xl font-black text-[var(--foreground)]/50 mb-2">
                NO DISCUSSIONS YET
              </h3>
              <p className="text-sm text-[var(--foreground)]/40">
                Be the first to start a conversation!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Post Preview Overlay */}
      <PostPreviewOverlay
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}
