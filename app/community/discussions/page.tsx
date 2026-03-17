'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDown, MessageSquare, TrendingUp, Hash, Loader2 } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import { CreatePost } from '@/components/social/CreatePost'
import { FeedPost } from '@/components/social/FeedPost'
import { Button } from '@/components/ui/Button'

import { RoundTable } from '@/components/community/roundtable/RoundTable'
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
        <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--primary)_8%,var(--background))] via-[var(--background)] to-[#3A2508]/20" />

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
            className="w-[85vw] max-w-[1100px] h-[60px] rounded-t-[50%] -mb-1"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, #8B6914 0%, #5C3D0E 60%, #3A2508 100%)',
              border: '6px solid #3A2508',
              borderBottom: 'none',
              boxShadow: '0 -8px 30px rgba(0,0,0,0.3), inset 0 4px 12px rgba(139,105,20,0.2)',
            }}
          />
        </div>
      </section>

      {/* ═══ THE TABLE - continues below the fold ═══ */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-2">
        <RoundTable>
          {/* Table nameplate */}
          <div className="text-center mb-10">
            <div className="inline-block px-6 py-2.5 rounded-lg bg-[#3A2508]/80 border border-[#8B6914]/40 shadow-lg mb-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#D4A54A]">
                Round Table
              </h2>
              <p className="text-[10px] text-[#8B6914] font-medium mt-0.5">
                {posts.length} discussions
              </p>
            </div>

            {/* Trending on table */}
            {trendingHashtags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <TrendingUp className="w-3.5 h-3.5 text-[#8B6914]" />
                {trendingHashtags.slice(0, 5).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#3A2508]/50 border border-[#8B6914]/25 text-[#D4A54A]"
                  >
                    <Hash className="w-2.5 h-2.5 inline mr-0.5" />
                    {tag.hashtag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Create post area */}
          {session?.user && (
            <div className="max-w-2xl mx-auto mb-8">
              <CreatePost onPostCreated={handlePostCreated} />
            </div>
          )}

          {/* Posts on the table */}
          {loading && page === 1 ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#D4A54A]" />
            </div>
          ) : posts.length > 0 ? (
            <div className="max-w-2xl mx-auto space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <FeedPost
                    post={post}
                    onLike={() => {}}
                    onComment={() => {}}
                  />
                </div>
              ))}

              {hasMore && (
                <div className="text-center py-8">
                  <Button
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation()
                      loadMore()
                    }}
                    disabled={loading}
                    size="lg"
                    className="font-black px-12 bg-[#5C3D0E] hover:bg-[#6B4F10] text-[#D4A54A] border border-[#8B6914]/40"
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
              <MessageSquare className="w-16 h-16 text-[#8B6914]/30 mx-auto mb-4" />
              <h3 className="text-xl font-black text-[#D4A54A]/60 mb-2">
                THE TABLE AWAITS
              </h3>
              <p className="text-sm text-[#8B6914]/60">
                Be the first to take a seat and start a discussion.
              </p>
            </div>
          )}
        </RoundTable>
      </section>

      {/* Post Preview Overlay */}
      <PostPreviewOverlay
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}
