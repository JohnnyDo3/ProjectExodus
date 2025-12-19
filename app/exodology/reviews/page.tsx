'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle2,
  Lightbulb, Brain, Calendar, Flame, RefreshCw, Loader2,
  Award, Play, Compass, Map, Target, Star, ThumbsUp
} from 'lucide-react'
import Link from 'next/link'

// Path metadata for display
const pathMeta = {
  foundations: {
    title: 'Foundations of Exodology',
    icon: Compass,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600'
  },
  applied: {
    title: 'Applied Exodology',
    icon: Map,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600'
  },
  strategic: {
    title: 'Strategic Exodology',
    icon: Target,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600'
  }
}

type ReviewItem = {
  id: string
  pathId: string
  lessonId: string
  nextReviewDate: string
  interval: number
  easeFactor: number
  reviewCount: number
  lastReviewDate: string | null
}

export default function ReviewsPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [dueReviews, setDueReviews] = useState<ReviewItem[]>([])
  const [upcomingReviews, setUpcomingReviews] = useState<ReviewItem[]>([])
  const [stats, setStats] = useState({ due: 0, upcoming: 0, total: 0 })
  const [activeReview, setActiveReview] = useState<ReviewItem | null>(null)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)

  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      if (!session?.user) {
        setLoading(false)
        return
      }

      try {
        // Fetch due and upcoming reviews
        const [dueRes, upcomingRes] = await Promise.all([
          fetch('/api/exodology/reviews?filter=due'),
          fetch('/api/exodology/reviews?filter=upcoming')
        ])

        if (dueRes.ok) {
          const dueData = await dueRes.json()
          setDueReviews(dueData.reviews || [])
          setStats(dueData.stats || { due: 0, upcoming: 0, total: 0 })
        }

        if (upcomingRes.ok) {
          const upcomingData = await upcomingRes.json()
          setUpcomingReviews(upcomingData.reviews || [])
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [session])

  // Handle review quality submission
  const submitReview = async (quality: number) => {
    if (!activeReview) return

    setReviewSubmitting(true)
    try {
      const res = await fetch('/api/exodology/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pathId: activeReview.pathId,
          lessonId: activeReview.lessonId,
          quality,
          action: 'review'
        })
      })

      if (res.ok) {
        // Remove from due list
        setDueReviews(prev => prev.filter(r => r.id !== activeReview.id))
        setStats(prev => ({ ...prev, due: prev.due - 1 }))
        setActiveReview(null)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setReviewSubmitting(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-[var(--primary)]" />
            <h1 className="text-2xl font-bold mb-2">Sign In to Access Reviews</h1>
            <p className="text-[var(--muted-foreground)] mb-6">
              Track your spaced repetition reviews to reinforce your learning.
            </p>
            <Link href="/auth/signin">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  // Active review mode
  if (activeReview) {
    const meta = pathMeta[activeReview.pathId as keyof typeof pathMeta]
    const Icon = meta?.icon || BookOpen

    return (
      <div className="min-h-screen bg-[var(--background)]">
        {/* Header */}
        <header className={`py-6 bg-gradient-to-r ${meta?.gradient || 'from-amber-500 to-orange-600'} text-white`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setActiveReview(null)}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Reviews
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20">
                    REVIEW
                  </span>
                  <h1 className="text-2xl font-black">Review: {activeReview.lessonId.replace(/-/g, ' ')}</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-[var(--border)]">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-[var(--primary)]" />
                </div>

                <h2 className="text-2xl font-black text-[var(--foreground)] mb-4">
                  How well do you remember this lesson?
                </h2>

                <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
                  Think about the key concepts from "{activeReview.lessonId.replace(/-/g, ' ')}" and rate your recall.
                </p>

                <Link
                  href={`/exodology/paths/${activeReview.pathId}/lessons/${activeReview.lessonId}`}
                  className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline mb-8"
                >
                  <BookOpen className="w-4 h-4" />
                  Review the lesson material first
                </Link>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
                    Rate Your Recall
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => submitReview(0)}
                      disabled={reviewSubmitting}
                      className="p-4 h-auto flex flex-col items-center gap-2 border-red-500/50 hover:bg-red-500/10"
                    >
                      <span className="text-red-500 font-bold">Complete Blackout</span>
                      <span className="text-xs text-[var(--muted-foreground)]">No recall at all</span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => submitReview(2)}
                      disabled={reviewSubmitting}
                      className="p-4 h-auto flex flex-col items-center gap-2 border-orange-500/50 hover:bg-orange-500/10"
                    >
                      <span className="text-orange-500 font-bold">Hard</span>
                      <span className="text-xs text-[var(--muted-foreground)]">Struggled to remember</span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => submitReview(3)}
                      disabled={reviewSubmitting}
                      className="p-4 h-auto flex flex-col items-center gap-2 border-yellow-500/50 hover:bg-yellow-500/10"
                    >
                      <span className="text-yellow-600 font-bold">Okay</span>
                      <span className="text-xs text-[var(--muted-foreground)]">Remembered with effort</span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => submitReview(4)}
                      disabled={reviewSubmitting}
                      className="p-4 h-auto flex flex-col items-center gap-2 border-green-500/50 hover:bg-green-500/10"
                    >
                      <span className="text-green-500 font-bold">Good</span>
                      <span className="text-xs text-[var(--muted-foreground)]">Clear recall</span>
                    </Button>

                    <Button
                      onClick={() => submitReview(5)}
                      disabled={reviewSubmitting}
                      className="col-span-2 p-4 h-auto flex flex-col items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500"
                    >
                      {reviewSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span className="font-bold flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Easy
                          </span>
                          <span className="text-xs text-white/80">Perfect recall, no hesitation</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-12 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exodology
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                  <RefreshCw className="w-10 h-10" />
                  Spaced Repetition
                </h1>
                <p className="text-white/80">
                  Review lessons at optimal intervals to strengthen long-term retention.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-300">{stats.due}</div>
                  <div className="text-xs text-white/70">Due Now</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">{stats.upcoming}</div>
                  <div className="text-xs text-white/70">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">{stats.total}</div>
                  <div className="text-xs text-white/70">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Due Reviews */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              Due for Review
              {stats.due > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-500 text-white text-sm">
                  {stats.due}
                </span>
              )}
            </h2>

            {dueReviews.length === 0 ? (
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">All Caught Up!</h3>
                  <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
                    You have no reviews due right now. Keep learning and reviews will be scheduled automatically.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dueReviews.map((review) => {
                  const meta = pathMeta[review.pathId as keyof typeof pathMeta]
                  const Icon = meta?.icon || BookOpen

                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="border-2 border-orange-500/30 hover:border-orange-500/50 transition-colors cursor-pointer"
                            onClick={() => setActiveReview(review)}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${meta?.gradient || 'from-gray-500 to-gray-600'} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-[var(--foreground)] truncate">
                                {review.lessonId.replace(/-/g, ' ')}
                              </p>
                              <p className="text-xs text-[var(--muted-foreground)]">
                                {meta?.title || review.pathId}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 font-medium">
                                  Due now
                                </span>
                                <span className="text-xs text-[var(--muted-foreground)]">
                                  {review.reviewCount} reviews
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full mt-4" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Review Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Upcoming Reviews */}
          <section>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[var(--primary)]" />
              Upcoming Reviews
            </h2>

            {upcomingReviews.length === 0 ? (
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)]" />
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">No Upcoming Reviews</h3>
                  <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
                    Complete more lessons to start building your review schedule.
                  </p>
                  <Link href="/exodology/paths/foundations">
                    <Button className="mt-4">
                      Start Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {upcomingReviews.slice(0, 10).map((review) => {
                  const meta = pathMeta[review.pathId as keyof typeof pathMeta]
                  const Icon = meta?.icon || BookOpen
                  const daysUntil = Math.ceil((new Date(review.nextReviewDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

                  return (
                    <Card key={review.id} className="border border-[var(--border)]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${meta?.gradient || 'from-gray-500 to-gray-600'} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[var(--foreground)] truncate">
                              {review.lessonId.replace(/-/g, ' ')}
                            </p>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {meta?.title || review.pathId}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-[var(--foreground)]">
                              {daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                            </p>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {new Date(review.nextReviewDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                {upcomingReviews.length > 10 && (
                  <p className="text-sm text-[var(--muted-foreground)] text-center py-2">
                    And {upcomingReviews.length - 10} more scheduled...
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Info Card */}
          <Card className="mt-12 border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-black text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[var(--primary)]" />
                How Spaced Repetition Works
              </h3>
              <p className="text-[var(--muted-foreground)] mb-4">
                Spaced repetition is a learning technique that schedules reviews at increasing intervals.
                When you remember something easily, the next review is scheduled further in the future.
                If you struggle, you'll review it sooner.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-[var(--background)]">
                  <p className="text-2xl font-black text-[var(--primary)]">1</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Day after first learning</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--background)]">
                  <p className="text-2xl font-black text-[var(--primary)]">6</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Days after good recall</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--background)]">
                  <p className="text-2xl font-black text-[var(--primary)]">∞</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Growing intervals forever</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
