'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { X, Users, Star, Reply, ThumbsUp, Trash2, Award, User, ChevronDown, ChevronUp } from 'lucide-react'
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
  likeCount?: number
  liked?: boolean
}

interface RoundTablePanelProps {
  isOpen: boolean
  onClose: () => void
  articleId: string
  articleAuthorId: string
  reviews: PeerReview[]
  onReviewsChange: (reviews: PeerReview[]) => void
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

export function RoundTablePanel({
  isOpen,
  onClose,
  articleId,
  articleAuthorId,
  reviews: initialReviews,
  onReviewsChange
}: RoundTablePanelProps) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<PeerReview[]>(initialReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [likingReviewId, setLikingReviewId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    rating: 0,
    accuracy: 0,
    clarity: 0,
    relevance: 0,
    content: ''
  })

  const [replyContent, setReplyContent] = useState('')

  // Update reviews when initialReviews change
  useEffect(() => {
    setReviews(initialReviews)
  }, [initialReviews])

  // Sync reviews back to parent
  useEffect(() => {
    onReviewsChange(reviews)
  }, [reviews, onReviewsChange])

  // Handle like toggle
  const handleLikeToggle = async (reviewId: string) => {
    if (!session) return
    setLikingReviewId(reviewId)

    try {
      const res = await fetch(`/api/articles/${articleId}/reviews/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setReviews(prev => updateLikeInTree(prev, reviewId, data.data.liked, data.data.likeCount))
      }
    } catch (err) {
      console.error('Failed to toggle like:', err)
    } finally {
      setLikingReviewId(null)
    }
  }

  const updateLikeInTree = (reviews: PeerReview[], reviewId: string, liked: boolean, likeCount: number): PeerReview[] => {
    return reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, liked, likeCount }
      }
      if (review.replies && review.replies.length > 0) {
        return { ...review, replies: updateLikeInTree(review.replies, reviewId, liked, likeCount) }
      }
      return review
    })
  }

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
    if (!confirm('Are you sure you want to delete this?')) return

    try {
      const res = await fetch(`/api/articles/${articleId}/reviews?reviewId=${reviewId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setReviews(prev => removeFromTree(prev, reviewId))
      }
    } catch (err) {
      console.error('Failed to delete review:', err)
    }
  }

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
              className={`${sizeClasses} ${star <= value ? 'fill-terra-500 text-terra-500' : 'text-[var(--foreground)]/30'}`}
            />
          </button>
        ))}
      </div>
    )
  }

  // Review Thread Component
  const ReviewThread = ({ review, depth = 0 }: { review: PeerReview, depth?: number }) => {
    const [collapsed, setCollapsed] = useState(false)
    const isAuthor = review.user.id === articleAuthorId
    const isOwnReview = session?.user?.id === review.user.id
    const isTopLevel = review.parentId === null
    const hasReplies = review.replies && review.replies.length > 0

    return (
      <div className={`${depth > 0 ? 'ml-4 pl-4 border-l-2 border-[var(--border)]' : ''}`}>
        <div className="py-3">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0">
              {review.user.image ? (
                <img
                  src={review.user.image}
                  alt={review.user.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAuthor ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-[var(--primary)]/20'
                }`}>
                  <User className={`w-4 h-4 ${isAuthor ? 'text-white' : 'text-[var(--primary)]'}`} />
                </div>
              )}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-[var(--foreground)]">
                  {review.user.name || 'Anonymous'}
                </span>
                {isAuthor && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full text-[10px] font-bold text-white">
                    <Award className="w-2.5 h-2.5" />
                    Author
                  </span>
                )}
                {isTopLevel && review.rating && (
                  <StarRating value={review.rating} readonly size="sm" />
                )}
                <span className="text-[10px] text-theme-muted">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>

              {/* Content with quote formatting */}
              <div className="mt-1 text-sm text-[var(--foreground)] whitespace-pre-wrap">
                {review.content.split('\n').map((line, i) => (
                  line.startsWith('> ') ? (
                    <blockquote key={i} className="border-l-2 border-[var(--primary)] pl-2 my-1 text-theme-muted italic">
                      {line.substring(2)}
                    </blockquote>
                  ) : (
                    <span key={i}>{line}{i < review.content.split('\n').length - 1 && <br />}</span>
                  )
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={() => handleLikeToggle(review.id)}
                  disabled={!session || likingReviewId === review.id}
                  className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${
                    review.liked ? 'text-theme-primary' : 'text-theme-muted hover:text-theme-primary'
                  } ${!session ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ThumbsUp className={`w-3 h-3 ${review.liked ? 'fill-current' : ''}`} />
                  {(review.likeCount || 0) > 0 && <span>{review.likeCount}</span>}
                </button>
                {session && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    className="flex items-center gap-1 text-[10px] font-medium text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    <Reply className="w-3 h-3" />
                    Reply
                  </button>
                )}
                {isOwnReview && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="flex items-center gap-1 text-[10px] font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                {hasReplies && (
                  <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-1 text-[10px] font-medium text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    {collapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                    {collapsed ? `${review.replies!.length}` : ''}
                  </button>
                )}
              </div>

              {/* Reply Form */}
              {replyingTo === review.id && (
                <div className="mt-2 p-2 bg-[var(--muted)] rounded-lg">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full p-2 text-xs border border-[var(--border)] rounded bg-white dark:bg-earth-800 text-[var(--foreground)]"
                    rows={2}
                  />
                  <div className="flex gap-2 mt-1">
                    <Button size="sm" onClick={() => handleSubmitReply(review.id)} disabled={submitting || !replyContent.trim()}>
                      {submitting ? '...' : 'Reply'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setReplyingTo(null); setReplyContent('') }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

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

  const topLevelReviews = reviews.filter(r => r.parentId === null)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[var(--card)] border-l-2 border-[var(--border)] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-theme-primary" />
            <h2 className="font-bold text-[var(--foreground)]">Round Table Talk</h2>
            <span className="text-sm text-theme-muted">({topLevelReviews.length})</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-65px)] overflow-y-auto p-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Review Form */}
          {session && (
            <div className="mb-4">
              {!showReviewForm ? (
                <Button className="w-full" onClick={() => setShowReviewForm(true)}>
                  Join the Discussion
                </Button>
              ) : (
                <form onSubmit={handleSubmitReview} className="p-3 bg-[var(--muted)] rounded-lg">
                  <h3 className="font-bold text-sm text-[var(--foreground)] mb-3">Share Your Thoughts</h3>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
                        Overall <span className="text-red-500">*</span>
                      </label>
                      <StarRating value={formData.rating} onChange={(v) => setFormData(prev => ({ ...prev, rating: v }))} size="sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground)] mb-1">Accuracy</label>
                      <StarRating value={formData.accuracy} onChange={(v) => setFormData(prev => ({ ...prev, accuracy: v }))} size="sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground)] mb-1">Clarity</label>
                      <StarRating value={formData.clarity} onChange={(v) => setFormData(prev => ({ ...prev, clarity: v }))} size="sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground)] mb-1">Relevance</label>
                      <StarRating value={formData.relevance} onChange={(v) => setFormData(prev => ({ ...prev, relevance: v }))} size="sm" />
                    </div>
                  </div>

                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Share your thoughts..."
                    className="w-full p-2 text-sm border border-[var(--border)] rounded bg-white dark:bg-earth-800 text-[var(--foreground)]"
                    rows={3}
                  />

                  <div className="flex gap-2 mt-2">
                    <Button type="submit" size="sm" disabled={submitting}>
                      {submitting ? 'Sharing...' : 'Share'}
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      setShowReviewForm(false)
                      setFormData({ rating: 0, accuracy: 0, clarity: 0, relevance: 0, content: '' })
                      setError(null)
                    }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {!session && (
            <div className="mb-4 p-3 bg-[var(--muted)] rounded-lg text-center">
              <p className="text-sm text-theme-muted">
                <a href="/auth/signin" className="text-theme-primary font-medium hover:underline">Sign in</a> to join
              </p>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 mx-auto mb-2 text-[var(--foreground)]/30" />
              <p className="text-sm text-theme-muted">No discussions yet. Be the first!</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {reviews.filter(r => !r.parentId).map(review => (
                <ReviewThread key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
