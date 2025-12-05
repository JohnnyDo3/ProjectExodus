'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star, MessageSquare, Reply, Trash2, User, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
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
}

interface ArticleReviewSectionProps {
  articleId: string
  articleAuthorId: string
  initialReviews: PeerReview[]
}

// Recursive function to build tree from flat list
function buildReviewTree(reviews: PeerReview[], parentId: string | null = null): PeerReview[] {
  return reviews
    .filter(review => review.parentId === parentId)
    .map(review => ({
      ...review,
      replies: buildReviewTree(reviews, review.id)
    }))
}

export function ArticleReviewSection({ articleId, articleAuthorId, initialReviews }: ArticleReviewSectionProps) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<PeerReview[]>(() => buildReviewTree(initialReviews))
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    rating: 0,
    accuracy: 0,
    clarity: 0,
    relevance: 0,
    content: ''
  })

  const [replyContent, setReplyContent] = useState('')

  // Check if user has already reviewed
  const userHasReviewed = reviews.some(r => r.user.id === session?.user?.id)

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return
    setError(null)

    if (formData.rating === 0) {
      setError('Please select an overall rating')
      return
    }

    if (!formData.content.trim()) {
      setError('Please add a comment to your review')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Add new review to state
        setReviews(prev => [{ ...data.data, replies: [] }, ...prev])
        setShowReviewForm(false)
        setFormData({ rating: 0, accuracy: 0, clarity: 0, relevance: 0, content: '' })
      } else {
        setError(data.error || 'Failed to submit review')
      }
    } catch (err) {
      setError('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentId: string) => {
    if (!session || !replyContent.trim()) return
    setError(null)

    setSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent, parentId })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Add reply to the parent review
        setReviews(prev => addReplyToTree(prev, parentId, { ...data.data, replies: [] }))
        setReplyingTo(null)
        setReplyContent('')
      } else {
        setError(data.error || 'Failed to submit reply')
      }
    } catch (err) {
      setError('Failed to submit reply. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Helper to add reply to nested tree
  const addReplyToTree = (reviews: PeerReview[], parentId: string, newReply: PeerReview): PeerReview[] => {
    return reviews.map(review => {
      if (review.id === parentId) {
        return { ...review, replies: [...(review.replies || []), newReply] }
      }
      if (review.replies && review.replies.length > 0) {
        return { ...review, replies: addReplyToTree(review.replies, parentId, newReply) }
      }
      return review
    })
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const res = await fetch(`/api/articles/${articleId}/reviews?reviewId=${reviewId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        // Remove from state
        setReviews(prev => removeFromTree(prev, reviewId))
      }
    } catch (err) {
      console.error('Failed to delete review:', err)
    }
  }

  // Helper to remove review from nested tree
  const removeFromTree = (reviews: PeerReview[], reviewId: string): PeerReview[] => {
    return reviews
      .filter(r => r.id !== reviewId)
      .map(review => ({
        ...review,
        replies: review.replies ? removeFromTree(review.replies, reviewId) : []
      }))
  }

  const StarRating = ({ value, onChange, readonly = false, size = 'md' }: { value: number, onChange?: (v: number) => void, readonly?: boolean, size?: 'sm' | 'md' }) => {
    const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              className={`${sizeClasses} ${star <= value ? 'fill-terra-500 text-terra-500' : 'text-sand-300 dark:text-earth-600'}`}
            />
          </button>
        ))}
      </div>
    )
  }

  // Recursive Review Thread Component
  const ReviewThread = ({ review, depth = 0 }: { review: PeerReview, depth?: number }) => {
    const [collapsed, setCollapsed] = useState(false)
    const isAuthor = review.user.id === articleAuthorId
    const isOwnReview = session?.user?.id === review.user.id
    const isTopLevel = review.parentId === null
    const hasReplies = review.replies && review.replies.length > 0

    return (
      <div className={`${depth > 0 ? 'ml-4 sm:ml-8 pl-4 border-l-2 border-sand-200 dark:border-earth-600' : ''}`}>
        <div className="py-4">
          {/* User Info */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {review.user.image ? (
                <img
                  src={review.user.image}
                  alt={review.user.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isAuthor
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                    : 'bg-moss-200 dark:bg-moss-800'
                }`}>
                  <User className={`w-5 h-5 ${isAuthor ? 'text-white' : 'text-moss-600 dark:text-moss-400'}`} />
                </div>
              )}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[var(--foreground)]">
                  {review.user.name || 'Anonymous'}
                </span>
                {isAuthor && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full text-xs font-bold text-white">
                    <Award className="w-3 h-3" />
                    Author
                  </span>
                )}
                {isTopLevel && review.rating && (
                  <StarRating value={review.rating} readonly size="sm" />
                )}
                <span className="text-xs text-theme-muted">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>

              {/* Rating Details for top-level reviews */}
              {isTopLevel && review.accuracy && review.clarity && review.relevance && (
                <div className="flex gap-4 mt-1 text-xs text-theme-muted">
                  <span>Accuracy: {review.accuracy}/5</span>
                  <span>Clarity: {review.clarity}/5</span>
                  <span>Relevance: {review.relevance}/5</span>
                </div>
              )}

              {/* Content */}
              <p className="mt-2 text-[var(--foreground)] whitespace-pre-wrap">{review.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2">
                {session && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    className="flex items-center gap-1 text-xs font-medium text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    Reply
                  </button>
                )}
                {isOwnReview && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                )}
                {hasReplies && (
                  <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-1 text-xs font-medium text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    {collapsed ? `Show ${review.replies!.length} replies` : 'Hide replies'}
                  </button>
                )}
              </div>

              {/* Reply Form */}
              {replyingTo === review.id && (
                <div className="mt-3 p-3 bg-sand-50 dark:bg-earth-700 rounded-lg">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full p-2 text-sm border-2 border-sand-200 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-800 text-[var(--foreground)] placeholder-earth-400 dark:placeholder-sand-500"
                    rows={2}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleSubmitReply(review.id)}
                      disabled={submitting || !replyContent.trim()}
                    >
                      {submitting ? 'Posting...' : 'Post Reply'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setReplyingTo(null)
                        setReplyContent('')
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nested Replies */}
        {!collapsed && hasReplies && (
          <div>
            {review.replies!.map(reply => (
              <ReviewThread key={reply.id} review={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Count total reviews and replies
  const countItems = (items: PeerReview[]): { reviews: number, replies: number } => {
    let reviews = 0
    let replies = 0
    items.forEach(item => {
      if (item.parentId === null) reviews++
      else replies++
      if (item.replies) {
        const counts = countItems(item.replies)
        reviews += counts.reviews
        replies += counts.replies
      }
    })
    return { reviews, replies }
  }

  const topLevelReviews = reviews.filter(r => r.parentId === null && r.rating !== null)

  return (
    <div id="peer-reviews-section" className="scroll-mt-20">
      <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-[var(--foreground)]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Peer Reviews ({topLevelReviews.length})
            </div>
            {session && !userHasReviewed && !showReviewForm && (
              <Button size="sm" onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && session && (
            <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-sand-50 dark:bg-earth-700 rounded-lg border-2 border-sand-200 dark:border-earth-600">
              <h3 className="font-bold text-[var(--foreground)] mb-4">Write Your Review</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Overall Rating <span className="text-red-500">*</span>
                  </label>
                  <StarRating value={formData.rating} onChange={(v) => setFormData(prev => ({ ...prev, rating: v }))} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Accuracy</label>
                  <StarRating value={formData.accuracy} onChange={(v) => setFormData(prev => ({ ...prev, accuracy: v }))} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Clarity</label>
                  <StarRating value={formData.clarity} onChange={(v) => setFormData(prev => ({ ...prev, clarity: v }))} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Relevance</label>
                  <StarRating value={formData.relevance} onChange={(v) => setFormData(prev => ({ ...prev, relevance: v }))} />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts on this article..."
                  className="w-full p-3 border-2 border-sand-200 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-800 text-[var(--foreground)] placeholder-earth-400 dark:placeholder-sand-500"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowReviewForm(false)
                  setFormData({ rating: 0, accuracy: 0, clarity: 0, relevance: 0, content: '' })
                  setError(null)
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Already Reviewed Notice */}
          {session && userHasReviewed && !showReviewForm && (
            <div className="mb-4 p-3 bg-moss-50 dark:bg-moss-900/20 border border-moss-200 dark:border-moss-800 rounded-lg text-moss-700 dark:text-moss-400 text-sm">
              You have already submitted a review for this article.
            </div>
          )}

          {/* Sign in prompt */}
          {!session && (
            <div className="mb-6 p-4 bg-sand-50 dark:bg-earth-700 rounded-lg text-center">
              <p className="text-theme-muted">
                <a href="/auth/signin" className="text-theme-primary font-medium hover:underline">Sign in</a> to write a review or reply
              </p>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-sand-300 dark:text-earth-600" />
              <p className="text-theme-muted">No reviews yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="divide-y divide-sand-200 dark:divide-earth-600">
              {reviews.map(review => (
                <ReviewThread key={review.id} review={review} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
