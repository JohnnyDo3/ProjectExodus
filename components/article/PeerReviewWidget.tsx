'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Star, Users, MessageSquare, ChevronRight, X, Send,
  ThumbsUp, Reply, Trash2, MoreHorizontal, User
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

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
  replies?: PeerReview[]
  likeCount?: number
  liked?: boolean
}

interface PeerReviewWidgetProps {
  articleId: string
  peerReviews: PeerReview[]
  onReviewsChange?: (reviews: PeerReview[]) => void
}

// Star Rating Component
function StarRating({ value, onChange, size = 'md', readonly = false }: {
  value: number
  onChange?: (v: number) => void
  size?: 'sm' | 'md'
  readonly?: boolean
}) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star === value ? 0 : star)}
          className={readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}
        >
          <Star
            className={`${sizeClass} ${
              star <= value
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export function PeerReviewWidget({ articleId, peerReviews: initialReviews, onReviewsChange }: PeerReviewWidgetProps) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [reviews, setReviews] = useState<PeerReview[]>(initialReviews)
  const [comment, setComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [ratingForm, setRatingForm] = useState({ rating: 0, accuracy: 0, clarity: 0, relevance: 0, content: '' })

  // Sync with parent
  useEffect(() => {
    setReviews(initialReviews)
  }, [initialReviews])

  useEffect(() => {
    onReviewsChange?.(reviews)
  }, [reviews, onReviewsChange])

  // Check if user has already posted a rated review
  const userRatedReview = session?.user?.id
    ? reviews.find(r => r.parentId === null && r.user.id === session.user.id && r.rating !== null && r.rating > 0)
    : null

  // Get top-level items (both rated reviews and comments)
  const topLevelItems = reviews.filter(r => r.parentId === null)
  const ratedReviews = topLevelItems.filter(r => r.rating !== null && r.rating > 0)
  const comments = topLevelItems.filter(r => r.rating === null || r.rating === 0)

  // Calculate average rating
  const avgRating = ratedReviews.length > 0
    ? ratedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / ratedReviews.length
    : 0

  // Build reply tree
  const buildTree = useCallback((items: PeerReview[], parentId: string | null = null): PeerReview[] => {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        replies: buildTree(items, item.id)
      }))
  }, [])

  const reviewTree = buildTree(reviews)

  // Submit a comment (no rating)
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session || !comment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment.trim() })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setReviews(prev => [{ ...data.data, replies: [] }, ...prev])
        setComment('')
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Submit a rated review
  const handleSubmitRatedReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session || !ratingForm.content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingForm)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setReviews(prev => [{ ...data.data, replies: [] }, ...prev])
        setRatingForm({ rating: 0, accuracy: 0, clarity: 0, relevance: 0, content: '' })
        setShowRatingForm(false)
      }
    } catch (error) {
      console.error('Failed to post review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Submit a reply
  const handleSubmitReply = async (parentId: string) => {
    if (!session || !replyContent.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent.trim(), parentId })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        // Add reply to tree
        const addReply = (items: PeerReview[]): PeerReview[] => {
          return items.map(item => {
            if (item.id === parentId) {
              return { ...item, replies: [...(item.replies || []), { ...data.data, replies: [] }] }
            }
            if (item.replies?.length) {
              return { ...item, replies: addReply(item.replies) }
            }
            return item
          })
        }
        setReviews(addReply)
        setReplyContent('')
        setReplyingTo(null)
      }
    } catch (error) {
      console.error('Failed to post reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Like a comment
  const handleLike = async (reviewId: string) => {
    if (!session) return
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        const updateLikes = (items: PeerReview[]): PeerReview[] => {
          return items.map(item => {
            if (item.id === reviewId) {
              return { ...item, liked: data.data.liked, likeCount: data.data.likeCount }
            }
            if (item.replies?.length) {
              return { ...item, replies: updateLikes(item.replies) }
            }
            return item
          })
        }
        setReviews(updateLikes)
      }
    } catch (error) {
      console.error('Failed to like:', error)
    }
  }

  // Delete a comment
  const handleDelete = async (reviewId: string) => {
    if (!confirm('Delete this?')) return
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews?reviewId=${reviewId}`, { method: 'DELETE' })
      if (res.ok) {
        const removeItem = (items: PeerReview[]): PeerReview[] => {
          return items.filter(item => item.id !== reviewId).map(item => ({
            ...item,
            replies: item.replies ? removeItem(item.replies) : []
          }))
        }
        setReviews(removeItem)
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  // Comment/Review Item Component
  const CommentItem = ({ item, depth = 0 }: { item: PeerReview; depth?: number }) => {
    const isOwn = session?.user?.id === item.user.id
    const hasRating = item.rating !== null && item.rating > 0
    const maxDepth = 3

    return (
      <div className={`${depth > 0 ? 'ml-8 pl-4 border-l-2 border-[var(--border)]' : ''}`}>
        <div className="py-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
              {item.user.image ? (
                <img src={item.user.image} alt="" className="w-8 h-8 rounded-full" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-[var(--foreground)]">
                  {item.user.name || 'Anonymous'}
                </span>
                {hasRating && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{item.rating}</span>
                  </div>
                )}
                <span className="text-xs text-[var(--foreground)]/50">
                  {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </span>
              </div>

              {/* Content */}
              <p className="mt-1 text-sm text-[var(--foreground)] whitespace-pre-wrap">{item.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    item.liked ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/50 hover:text-[var(--primary)]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${item.liked ? 'fill-current' : ''}`} />
                  {(item.likeCount || 0) > 0 && <span>{item.likeCount}</span>}
                </button>

                {depth < maxDepth && session && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === item.id ? null : item.id)}
                    className="flex items-center gap-1 text-xs text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    Reply
                  </button>
                )}

                {isOwn && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-xs text-[var(--foreground)]/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Reply Form */}
              {replyingTo === item.id && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)]"
                    autoFocus
                  />
                  <Button size="sm" onClick={() => handleSubmitReply(item.id)} disabled={isSubmitting || !replyContent.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Replies */}
        {item.replies && item.replies.length > 0 && (
          <div className="mt-1">
            {item.replies.map(reply => (
              <CommentItem key={reply.id} item={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Widget Card */}
      <Card className="border-2 border-[var(--border)] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between text-[var(--foreground)]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--primary)]" />
              Round Table Talk
            </div>
            {ratedReviews.length > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-sm">{avgRating.toFixed(1)}</span>
                <span className="text-xs text-[var(--foreground)]/50">({ratedReviews.length})</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-[var(--foreground)]/60">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              {ratedReviews.length} review{ratedReviews.length !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {comments.length + reviews.filter(r => r.parentId !== null).length} comment{comments.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Recent comments preview */}
          {topLevelItems.slice(0, 2).map(item => (
            <div key={item.id} className="flex gap-2 text-sm">
              <span className="font-medium text-[var(--foreground)] truncate">{item.user.name}:</span>
              <span className="text-[var(--foreground)]/70 truncate flex-1">{item.content}</span>
            </div>
          ))}

          {/* Open Panel Button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full"
            variant="outline"
          >
            <span>View Discussion</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Slideout Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop - click to close */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md h-full bg-[var(--card)] border-l-2 border-[var(--border)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--primary)]" />
                <h2 className="font-bold text-lg text-[var(--foreground)]">Round Table Talk</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating Summary */}
            {ratedReviews.length > 0 && (
              <div className="p-4 border-b border-[var(--border)] bg-[var(--muted)]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-black text-[var(--foreground)]">{avgRating.toFixed(1)}</span>
                      <StarRating value={Math.round(avgRating)} readonly size="md" />
                    </div>
                    <p className="text-xs text-[var(--foreground)]/60 mt-1">
                      Based on {ratedReviews.length} review{ratedReviews.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Write a Review CTA (if user hasn't reviewed) */}
              {session && !userRatedReview && (
                <div className="mb-4">
                  {!showRatingForm ? (
                    <button
                      onClick={() => setShowRatingForm(true)}
                      className="w-full p-3 border-2 border-dashed border-[var(--border)] rounded-lg text-center hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors"
                    >
                      <Star className="w-5 h-5 mx-auto mb-1 text-[var(--foreground)]/50" />
                      <span className="text-sm font-medium text-[var(--foreground)]">Write a Review</span>
                      <p className="text-xs text-[var(--foreground)]/50 mt-1">Rate and share your thoughts</p>
                    </button>
                  ) : (
                    <form onSubmit={handleSubmitRatedReview} className="p-4 bg-[var(--muted)] rounded-lg space-y-3">
                      <h3 className="font-bold text-sm text-[var(--foreground)]">Write Your Review</h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-[var(--foreground)]/70 mb-1">Overall</label>
                          <StarRating value={ratingForm.rating} onChange={(v) => setRatingForm(p => ({ ...p, rating: v }))} size="sm" />
                        </div>
                        <div>
                          <label className="block text-xs text-[var(--foreground)]/70 mb-1">Accuracy</label>
                          <StarRating value={ratingForm.accuracy} onChange={(v) => setRatingForm(p => ({ ...p, accuracy: v }))} size="sm" />
                        </div>
                        <div>
                          <label className="block text-xs text-[var(--foreground)]/70 mb-1">Clarity</label>
                          <StarRating value={ratingForm.clarity} onChange={(v) => setRatingForm(p => ({ ...p, clarity: v }))} size="sm" />
                        </div>
                        <div>
                          <label className="block text-xs text-[var(--foreground)]/70 mb-1">Relevance</label>
                          <StarRating value={ratingForm.relevance} onChange={(v) => setRatingForm(p => ({ ...p, relevance: v }))} size="sm" />
                        </div>
                      </div>

                      <textarea
                        value={ratingForm.content}
                        onChange={(e) => setRatingForm(p => ({ ...p, content: e.target.value }))}
                        placeholder="Share your thoughts about this article..."
                        className="w-full p-3 text-sm border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] resize-none"
                        rows={3}
                      />

                      <div className="flex gap-2">
                        <Button type="submit" size="sm" disabled={isSubmitting || !ratingForm.content.trim()}>
                          Post Review
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => setShowRatingForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Comments/Reviews List */}
              {reviewTree.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 mx-auto mb-2 text-[var(--foreground)]/20" />
                  <p className="text-sm text-[var(--foreground)]/50">No comments yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {reviewTree.map(item => (
                    <CommentItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Comment Input (always visible at bottom) */}
            {session ? (
              <form onSubmit={handleSubmitComment} className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 text-sm border border-[var(--border)] rounded-full bg-[var(--background)] text-[var(--foreground)]"
                  />
                  <Button type="submit" size="sm" disabled={isSubmitting || !comment.trim()} className="rounded-full px-4">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-4 border-t border-[var(--border)] text-center">
                <p className="text-sm text-[var(--foreground)]/60">
                  <a href="/auth/signin" className="text-[var(--primary)] font-medium hover:underline">Sign in</a> to join the discussion
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
