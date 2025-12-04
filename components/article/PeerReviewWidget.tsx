'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ChevronDown, ChevronUp, Star, BookCheck, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface PeerReview {
  id: string
  rating: number
  accuracy: number
  clarity: number
  relevance: number
  comment?: string
  user: {
    name: string | null
    image?: string | null
  }
  createdAt: string
}

interface PeerReviewWidgetProps {
  articleId: string
  peerReviews: PeerReview[]
}

export function PeerReviewWidget({ articleId, peerReviews }: PeerReviewWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { data: session } = useSession()

  const [formData, setFormData] = useState({
    rating: 0,
    accuracy: 0,
    clarity: 0,
    relevance: 0,
    comment: ''
  })

  const averageRating = peerReviews.length > 0
    ? peerReviews.reduce((sum, r) => sum + r.rating, 0) / peerReviews.length
    : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setShowReviewForm(false)
        setFormData({ rating: 0, accuracy: 0, clarity: 0, relevance: 0, comment: '' })
        // Refresh the page to show new review
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const StarRating = ({ value, onChange, readonly = false }: { value: number, onChange?: (v: number) => void, readonly?: boolean }) => (
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
            className={`w-4 h-4 ${star <= value ? 'fill-terra-500 text-terra-500' : 'text-sand-300 dark:text-earth-600'}`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <Card className="border-4 border-moss-300 dark:border-moss-700 dark:bg-earth-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between text-earth-900 dark:text-sand-100">
          <div className="flex items-center gap-2">
            <BookCheck className="w-4 h-4 text-moss-600 dark:text-moss-400" />
            Peer Reviews
          </div>
          {peerReviews.length > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-terra-500 text-terra-500" />
              <span className="font-black text-sm">{averageRating.toFixed(1)}</span>
              <span className="text-xs text-earth-500 dark:text-sand-400">({peerReviews.length})</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {peerReviews.length === 0 ? (
          <p className="text-sm text-earth-500 dark:text-sand-400 text-center py-2">
            No peer reviews yet. Be the first!
          </p>
        ) : (
          <>
            {/* Show reviews */}
            <div className={`space-y-3 ${isExpanded ? 'max-h-none' : 'max-h-48 overflow-hidden'}`}>
              {peerReviews.map((review) => (
                <div key={review.id} className="p-3 bg-moss-50 dark:bg-earth-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-moss-200 dark:bg-moss-800 flex items-center justify-center">
                      <User className="w-3 h-3 text-moss-600 dark:text-moss-400" />
                    </div>
                    <span className="text-sm font-bold text-earth-800 dark:text-sand-200">
                      {review.user.name || 'Anonymous'}
                    </span>
                    <StarRating value={review.rating} readonly />
                  </div>
                  {review.comment && (
                    <p className="text-sm text-earth-600 dark:text-sand-300 line-clamp-3">
                      {review.comment}
                    </p>
                  )}
                  <div className="flex gap-4 mt-2 text-xs text-earth-500 dark:text-sand-400">
                    <span>Accuracy: {review.accuracy}/5</span>
                    <span>Clarity: {review.clarity}/5</span>
                  </div>
                </div>
              ))}
            </div>

            {peerReviews.length > 2 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-moss-600 dark:text-moss-400 hover:text-moss-800 dark:hover:text-moss-300 transition-colors"
              >
                {isExpanded ? (
                  <>
                    Collapse <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Expand Reviews <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </>
        )}

        {/* Add Review Section */}
        {session ? (
          showReviewForm ? (
            <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-sand-200 dark:border-earth-600">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-earth-700 dark:text-sand-300">Overall Rating</label>
                  <StarRating value={formData.rating} onChange={(v) => setFormData(prev => ({ ...prev, rating: v }))} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-earth-700 dark:text-sand-300">Accuracy</label>
                  <StarRating value={formData.accuracy} onChange={(v) => setFormData(prev => ({ ...prev, accuracy: v }))} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-earth-700 dark:text-sand-300">Clarity</label>
                  <StarRating value={formData.clarity} onChange={(v) => setFormData(prev => ({ ...prev, clarity: v }))} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-earth-700 dark:text-sand-300">Relevance</label>
                  <StarRating value={formData.relevance} onChange={(v) => setFormData(prev => ({ ...prev, relevance: v }))} />
                </div>
              </div>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Add your review comment..."
                className="w-full p-2 text-sm border-2 border-sand-200 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-sand-100 placeholder-earth-400 dark:placeholder-sand-500"
                rows={3}
              />
              <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={submitting || formData.rating === 0} className="flex-1">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Peer Review
            </Button>
          )
        ) : (
          <p className="text-xs text-center text-earth-500 dark:text-sand-400 py-2">
            Sign in to submit a peer review
          </p>
        )}
      </CardContent>
    </Card>
  )
}
