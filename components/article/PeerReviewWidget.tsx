'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star, BookCheck, MessageSquare, ChevronDown } from 'lucide-react'

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
  onScrollToReviews?: () => void
}

export function PeerReviewWidget({ articleId, peerReviews, onScrollToReviews }: PeerReviewWidgetProps) {
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

  const handleScrollToReviews = () => {
    if (onScrollToReviews) {
      onScrollToReviews()
    } else {
      // Fallback: scroll to reviews section
      const reviewsSection = document.getElementById('peer-reviews-section')
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Card className="border-4 border-moss-300 dark:border-moss-700 dark:bg-earth-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between text-earth-900 dark:text-sand-100">
          <div className="flex items-center gap-2">
            <BookCheck className="w-4 h-4 text-moss-600 dark:text-moss-400" />
            Peer Reviews
          </div>
          {topLevelReviews.length > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-terra-500 text-terra-500" />
              <span className="font-black text-sm">{averageRating.toFixed(1)}</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topLevelReviews.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-earth-500 dark:text-sand-400 mb-3">
              No peer reviews yet. Be the first to review!
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700"
              onClick={handleScrollToReviews}
            >
              Write a Review
            </Button>
          </div>
        ) : (
          <>
            {/* Rating Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-earth-600 dark:text-sand-400">Overall</span>
                <StarDisplay rating={averageRating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-earth-600 dark:text-sand-400">Accuracy</span>
                <StarDisplay rating={averageAccuracy} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-earth-600 dark:text-sand-400">Clarity</span>
                <StarDisplay rating={averageClarity} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-earth-600 dark:text-sand-400">Relevance</span>
                <StarDisplay rating={averageRelevance} />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 py-2 border-t border-sand-200 dark:border-earth-600">
              <div className="flex items-center gap-1 text-xs text-earth-500 dark:text-sand-400">
                <BookCheck className="w-3.5 h-3.5" />
                <span>{topLevelReviews.length} review{topLevelReviews.length !== 1 ? 's' : ''}</span>
              </div>
              {totalReplies > 0 && (
                <div className="flex items-center gap-1 text-xs text-earth-500 dark:text-sand-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{totalReplies} repl{totalReplies !== 1 ? 'ies' : 'y'}</span>
                </div>
              )}
            </div>

            {/* Preview of latest review */}
            {topLevelReviews[0] && (
              <div className="p-3 bg-moss-50 dark:bg-earth-700 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-earth-700 dark:text-sand-300">
                    {topLevelReviews[0].user.name || 'Anonymous'}
                  </span>
                  <StarDisplay rating={topLevelReviews[0].rating || 0} />
                </div>
                <p className="text-xs text-earth-600 dark:text-sand-400 line-clamp-2">
                  {topLevelReviews[0].content}
                </p>
              </div>
            )}

            {/* View All Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full dark:border-earth-600 dark:text-sand-200 dark:hover:bg-earth-700"
              onClick={handleScrollToReviews}
            >
              <span>View All Reviews</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
