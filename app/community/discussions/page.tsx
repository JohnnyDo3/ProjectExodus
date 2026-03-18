'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDown, MessageSquare, Loader2, TrendingUp, Hash, Plus } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import { CreatePost } from '@/components/social/CreatePost'
import { FeedPost } from '@/components/social/FeedPost'
import { Button } from '@/components/ui/Button'

import { RoundTable } from '@/components/community/roundtable/RoundTable'
import { TablePostCard } from '@/components/community/roundtable/TablePostCard'
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
  const [showCreatePost, setShowCreatePost] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

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
    setShowCreatePost(false)
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchPosts(nextPage)
  }

  // Calculate how tall the table needs to be based on post content
  const postRows = Math.ceil(posts.length / 2)
  const minTableHeight = Math.max(600, 200 + postRows * 200 + 200)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation bar - floats above everything */}
      <div className="fixed top-20 left-4 sm:left-8 z-50">
        <BackButton label="Back to Community" fallbackUrl="/community" />
      </div>

      {/* ═══ HERO LANDING — full viewport title page ═══ */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6">
        {/* Background ambient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--primary)_6%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--primary)_4%,var(--background))]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4A54A]/60 mb-4">
            <span>⚜</span>
            <span>The Community</span>
            <span>⚜</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#D4A54A] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            ROUND TABLE
          </h1>

          <p className="text-sm sm:text-base text-[#D4A54A]/50 font-medium max-w-md mx-auto mt-3">
            Where every voice shapes the future
          </p>

          {/* Trending + stats */}
          <div className="mt-8 space-y-3">
            <div className="mx-auto px-5 py-2.5 rounded-xl bg-[#2E1D06]/60 border border-[#8B6914]/30 backdrop-blur-sm shadow-lg">
              <p className="text-[10px] text-[#8B6914] font-bold">
                {posts.length} discussions at the table
              </p>
            </div>

            {trendingHashtags.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-center gap-1 text-[9px] text-[#8B6914]/70">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-bold uppercase tracking-wider">Trending</span>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {trendingHashtags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-[#2E1D06]/50 border border-[#8B6914]/25 text-[#D4A54A]/80"
                    >
                      <Hash className="w-2.5 h-2.5 inline mr-0.5" />
                      {tag.hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Create post button */}
          {session?.user && (
            <button
              onClick={() => setShowCreatePost(true)}
              className="mt-8 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A54A]/20 hover:bg-[#D4A54A]/30 border border-[#D4A54A]/30 text-[#D4A54A] text-sm font-bold transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Start a Discussion
            </button>
          )}

          {/* Scroll indicator */}
          <div className="mt-10 animate-bounce">
            <ChevronDown className="w-7 h-7 text-[#D4A54A]/30" />
          </div>
        </div>
      </section>

      {/* ═══ THE TABLE — revealed as user scrolls past the hero ═══ */}
      <div className="relative flex justify-center">
        <div
          ref={tableRef}
          className="relative w-[88vw] max-w-[900px] z-10 -mt-20"
          style={{ minHeight: `${minTableHeight}px` }}
        >
          <RoundTable className="w-full h-full" >
            {/* ─── TABLE HEAD — divider with icon ─── */}
            <div className="flex items-center justify-center gap-3 px-[15%] pt-24 pb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#8B6914]/20 to-transparent" />
              <MessageSquare className="w-4 h-4 text-[#8B6914]/30" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#8B6914]/20 to-transparent" />
            </div>

            {/* ─── SEATS AROUND THE TABLE — posts alternate left/right ─── */}
            {loading && posts.length === 0 ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#D4A54A]/60" />
              </div>
            ) : posts.length > 0 ? (
              <div className="px-3 sm:px-4 pb-16">
                {posts.map((post, index) => {
                  const isLeft = index % 2 === 0

                  return (
                    <div
                      key={post.id}
                      className="flex items-start mb-4"
                      style={{
                        // Alternate: left-aligned or right-aligned
                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                      }}
                    >
                      {/* The "chair" — post card positioned at the table edge */}
                      <div
                        className="w-[48%] sm:w-[44%]"
                        style={{
                          // Slight inward offset so cards overlap the table edge
                          marginLeft: isLeft ? '2%' : undefined,
                          marginRight: !isLeft ? '2%' : undefined,
                        }}
                      >
                        <TablePostCard
                          post={post}
                          onClick={() => setSelectedPost(post)}
                        />
                      </div>
                    </div>
                  )
                })}

                {hasMore && (
                  <div className="text-center py-6">
                    <Button
                      onClick={loadMore}
                      disabled={loading}
                      size="lg"
                      className="font-black px-12 bg-[#D4A54A]/20 hover:bg-[#D4A54A]/30 border border-[#D4A54A]/30 text-[#D4A54A]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          LOADING...
                        </>
                      ) : (
                        'PULL UP MORE CHAIRS'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <MessageSquare className="w-14 h-14 text-[#8B6914]/25 mx-auto mb-3" />
                <h3 className="text-lg font-black text-[#D4A54A]/50 mb-1">
                  EMPTY TABLE
                </h3>
                <p className="text-xs text-[#8B6914]/40">
                  Be the first to take a seat
                </p>
              </div>
            )}
          </RoundTable>

          {/* Chair shadows along the sides — decorative */}
          <div className="absolute top-[140px] bottom-[10%] left-0 w-[6%] pointer-events-none opacity-30"
            style={{
              background: 'repeating-linear-gradient(180deg, transparent 0px, transparent 160px, rgba(46,29,6,0.15) 170px, rgba(46,29,6,0.08) 190px, transparent 200px)',
            }}
          />
          <div className="absolute top-[140px] bottom-[10%] right-0 w-[6%] pointer-events-none opacity-30"
            style={{
              background: 'repeating-linear-gradient(180deg, transparent 0px, transparent 160px, rgba(46,29,6,0.15) 170px, rgba(46,29,6,0.08) 190px, transparent 200px)',
            }}
          />
        </div>
      </div>

      {/* ═══ BELOW THE TABLE — full discussion feed ═══ */}
      <section className="relative py-16 bg-gradient-to-b from-[var(--background)] to-[color-mix(in_srgb,var(--primary)_5%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
              <MessageSquare className="w-5 h-5 text-[var(--foreground)]/30" />
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
            </div>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
              FULL DISCUSSION FEED
            </h2>
            <p className="text-sm text-[var(--foreground)]/50">
              All conversations in detail
            </p>
          </div>

          {posts.length > 0 ? (
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
          ) : !loading && (
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

      {/* Create Post Modal */}
      {showCreatePost && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCreatePost(false)}
        >
          <div
            className="bg-[var(--card)] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border-2 border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <CreatePost onPostCreated={handlePostCreated} />
            </div>
          </div>
        </div>
      )}

      {/* Post Preview Overlay */}
      <PostPreviewOverlay
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}
