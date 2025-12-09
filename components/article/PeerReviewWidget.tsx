'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star, Users, MessageSquare, Maximize2, Eye, Heart, Send } from 'lucide-react'

interface PeerReview {
  id: string
  rating: number | null
  accuracy: number | null
  clarity: number | null
  relevance: number | null
  content: string
  user: {
    id: string
    name: string | null
    image?: string | null
  }
  createdAt: string
  parentId: string | null
}

interface PeerReviewWidgetProps {
  articleId: string
  peerReviews: PeerReview[]
  onOpenPanel?: () => void
  onReviewAdded?: (review: PeerReview) => void
  stats?: {
    views?: number
    likes?: number
  }
}

export function PeerReviewWidget({ articleId, peerReviews, onOpenPanel, onReviewAdded, stats }: PeerReviewWidgetProps) {
  const { data: session } = useSession()
  const [quickComment, setQuickComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Filter to only top-level reviews (not replies)
  const topLevelReviews = peerReviews.filter(r => !r.parentId && r.rating !== null)
  const totalReplies = peerReviews.filter(r => r.parentId !== null).length

  const averageRating = topLevelReviews.length > 0
    ? topLevelReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / topLevelReviews.length
    : 0

  const averageAccuracy = topLevelReviews.length > 0
    ? topLevelReviews.reduce((sum, r) => sum + (r.accuracy || 0), 0) / topLevelReviews.length
    : 0

  const averageClarity = topLevelReviews.length > 0
    ? topLevelReviews.reduce((sum, r) => sum + (r.clarity || 0), 0) / topLevelReviews.length
    : 0

  const averageRelevance = topLevelReviews.length > 0
    ? topLevelReviews.reduce((sum, r) => sum + (r.relevance || 0), 0) / topLevelReviews.length
    : 0

  const StarDisplay = ({ rating, size = 'sm' }: { rating: number, size?: 'sm' | 'lg' }) => {
    const sizeClasses = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizeClasses} ${
              star <= Math.round(rating)
                ? 'fill-terra-500 text-terra-500'
                : 'text-sand-300 dark:text-earth-600'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleOpenPanel = () => {
    if (onOpenPanel) {
      onOpenPanel()
    }
  }

  const handleQuickComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session || !quickComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: quickComment.trim() })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setQuickComment('')
        if (onReviewAdded) {
          onReviewAdded(data.data)
        }
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-4 border-[var(--border)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between text-[var(--foreground)]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-moss-600 dark:text-moss-400" />
            Round Table Talk
          </div>
          <div className="flex items-center gap-2">
            {topLevelReviews.length > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-terra-500 text-terra-500" />
                <span className="font-black text-sm">{averageRating.toFixed(1)}</span>
              </div>
            )}
            {/* Expand button - always visible */}
            <button
              onClick={handleOpenPanel}
              className="p-1 rounded hover:bg-[var(--muted)] transition-colors"
              title="Expand discussion panel"
            >
              <Maximize2 className="w-4 h-4 text-[var(--foreground)]/60 hover:text-[var(--foreground)]" />
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topLevelReviews.length === 0 ? (
          // No reviews yet
          <div className="text-center py-4">
            <p className="text-sm text-[var(--foreground)]/60 mb-3">
              No discussions yet. Be the first to share your thoughts!
            </p>
            {/* Stats - views and likes even with no reviews */}
            {stats && (stats.views !== undefined || stats.likes !== undefined) && (
              <div className="flex items-center justify-center gap-4 py-2 mb-3 border-t border-b border-[var(--border)]">
                {stats.views !== undefined && (
                  <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{stats.views.toLocaleString()} view{stats.views !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {stats.likes !== undefined && (
                  <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{stats.likes.toLocaleString()} like{stats.likes !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            )}
            {/* Quick comment form */}
            {session ? (
              <form onSubmit={handleQuickComment} className="flex gap-2">
                <input
                  type="text"
                  value={quickComment}
                  onChange={(e) => setQuickComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/40"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !quickComment.trim()}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <p className="text-xs text-center text-[var(--foreground)]/60">
                <a href="/auth/signin" className="text-[var(--primary)] hover:underline">Sign in</a> to comment
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Rating Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--foreground)]/70">Overall</span>
                <StarDisplay rating={averageRating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--foreground)]/70">Accuracy</span>
                <StarDisplay rating={averageAccuracy} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--foreground)]/70">Clarity</span>
                <StarDisplay rating={averageClarity} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--foreground)]/70">Relevance</span>
                <StarDisplay rating={averageRelevance} />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 py-2 border-t border-[var(--border)]">
              {stats?.views !== undefined && (
                <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{stats.views.toLocaleString()}</span>
                </div>
              )}
              {stats?.likes !== undefined && (
                <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{stats.likes.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                <Users className="w-3.5 h-3.5" />
                <span>{topLevelReviews.length}</span>
              </div>
              {totalReplies > 0 && (
                <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{totalReplies}</span>
                </div>
              )}
            </div>

            {/* Quick comment form */}
            {session ? (
              <form onSubmit={handleQuickComment} className="flex gap-2">
                <input
                  type="text"
                  value={quickComment}
                  onChange={(e) => setQuickComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/40"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !quickComment.trim()}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <p className="text-xs text-center text-[var(--foreground)]/60">
                <a href="/auth/signin" className="text-[var(--primary)] hover:underline">Sign in</a> to comment
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
