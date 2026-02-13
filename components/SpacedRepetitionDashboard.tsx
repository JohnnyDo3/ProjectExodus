'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Brain, Clock, Target, TrendingUp, Calendar, Zap,
  CheckCircle2, AlertCircle, BookOpen, Flame, BarChart3,
  RefreshCw, ChevronRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  type CardProgress,
  getStudyStats,
  getDueCards,
  getUpcomingCards,
  calculateMastery,
} from '@/lib/spacedRepetition'

interface SpacedRepetitionDashboardProps {
  cards: CardProgress[]
  onStartReview?: () => void
  showDetailedView?: boolean
}

// Storage key for persistence
const STORAGE_KEY = 'srs-study-history'

interface StudySession {
  date: string // ISO date string
  cardsReviewed: number
  correctCount: number
}

export function SpacedRepetitionDashboard({
  cards,
  onStartReview,
  showDetailedView = false
}: SpacedRepetitionDashboardProps) {
  const [studyHistory, setStudyHistory] = useState<StudySession[]>([])

  // Load study history from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setStudyHistory(JSON.parse(stored))
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, [])

  // Calculate stats from cards
  const stats = useMemo(() => getStudyStats(cards), [cards])
  const dueCards = useMemo(() => getDueCards(cards), [cards])
  const upcomingCards = useMemo(() => getUpcomingCards(cards, 7), [cards])
  const masteryPercent = useMemo(() => calculateMastery(cards), [cards])

  // Calculate study streak
  const studyStreak = useMemo(() => {
    if (studyHistory.length === 0) return 0

    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    let streak = 0
    let checkDate = today

    // Check if studied today
    const studiedToday = studyHistory.some(s => s.date === today)
    if (studiedToday) {
      streak = 1
      checkDate = yesterday
    }

    // Count consecutive days before
    const sortedHistory = [...studyHistory].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    for (const session of sortedHistory) {
      if (session.date === checkDate) {
        streak++
        const prevDate = new Date(checkDate)
        prevDate.setDate(prevDate.getDate() - 1)
        checkDate = prevDate.toISOString().split('T')[0]
      }
    }

    return streak
  }, [studyHistory])

  // Calculate weekly stats
  const weeklyStats = useMemo(() => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const weekSessions = studyHistory.filter(s =>
      new Date(s.date).getTime() > oneWeekAgo
    )

    const totalReviewed = weekSessions.reduce((sum, s) => sum + s.cardsReviewed, 0)
    const totalCorrect = weekSessions.reduce((sum, s) => sum + s.correctCount, 0)

    return {
      sessionsCount: weekSessions.length,
      cardsReviewed: totalReviewed,
      accuracy: totalReviewed > 0 ? Math.round((totalCorrect / totalReviewed) * 100) : 0,
    }
  }, [studyHistory])

  // Format next review time
  const formatNextReview = (timestamp: number) => {
    const now = Date.now()
    const diff = timestamp - now

    if (diff <= 0) return 'Now'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d`
    if (hours > 0) return `${hours}h`
    return 'Soon'
  }

  return (
    <div className="space-y-6" role="region" aria-label="Spaced Repetition Dashboard">
      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border border-[var(--border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <AlertCircle className="w-5 h-5 text-amber-500" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{stats.due}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Due Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10">
                <Flame className="w-5 h-5 text-rose-500" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{studyStreak}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Target className="w-5 h-5 text-green-500" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{stats.accuracy}%</p>
                <p className="text-xs text-[var(--muted-foreground)]">Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Brain className="w-5 h-5 text-purple-500" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{masteryPercent}%</p>
                <p className="text-xs text-[var(--muted-foreground)]">Mastery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Start Review CTA */}
      {stats.due > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-amber-500/50 bg-amber-500/5">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/20">
                  <RefreshCw className="w-8 h-8 text-amber-500" aria-hidden="true" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-[var(--foreground)]">
                    {stats.due} cards ready for review
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Keep your streak going! Review now to strengthen your memory.
                  </p>
                </div>
                {onStartReview ? (
                  <Button
                    onClick={onStartReview}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
                  >
                    <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                    Start Review
                  </Button>
                ) : (
                  <Link href="/architecture/play/flashcard">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold">
                      <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                      Start Review
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Card Status Breakdown */}
      <Card className="border border-[var(--border)]">
        <CardContent className="p-6">
          <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-500" aria-hidden="true" />
            Card Progress
          </h3>

          <div className="space-y-4">
            {/* Mastered */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                  <span className="font-semibold text-green-600">Mastered</span>
                </span>
                <span className="text-[var(--muted-foreground)]">{stats.mastered} cards</span>
              </div>
              <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
            </div>

            {/* Learning */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  <span className="font-semibold text-amber-600">Learning</span>
                </span>
                <span className="text-[var(--muted-foreground)]">{stats.learning} cards</span>
              </div>
              <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total > 0 ? (stats.learning / stats.total) * 100 : 0}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>

            {/* New */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" aria-hidden="true" />
                  <span className="font-semibold text-blue-600">New</span>
                </span>
                <span className="text-[var(--muted-foreground)]">{stats.new} cards</span>
              </div>
              <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total > 0 ? (stats.new / stats.total) * 100 : 0}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-4">
            {stats.total} total cards in your study set
          </p>
        </CardContent>
      </Card>

      {/* Upcoming Reviews */}
      {showDetailedView && upcomingCards.length > 0 && (
        <Card className="border border-[var(--border)]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" aria-hidden="true" />
              Upcoming Reviews (Next 7 Days)
            </h3>

            <div className="space-y-2">
              {upcomingCards.slice(0, 5).map((card) => (
                <div
                  key={card.cardId}
                  className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--background)] flex items-center justify-center">
                      <Brain className="w-4 h-4 text-[var(--muted-foreground)]" aria-hidden="true" />
                    </div>
                    <span className="font-medium text-[var(--foreground)] truncate max-w-[200px]">
                      {card.cardId}
                    </span>
                  </div>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {formatNextReview(card.nextReview)}
                  </span>
                </div>
              ))}
            </div>

            {upcomingCards.length > 5 && (
              <p className="text-center text-sm text-[var(--muted-foreground)] mt-3">
                +{upcomingCards.length - 5} more cards upcoming
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Weekly Summary */}
      {showDetailedView && (
        <Card className="border border-[var(--border)]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-500" aria-hidden="true" />
              This Week
            </h3>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {weeklyStats.sessionsCount}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">Study Sessions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {weeklyStats.cardsReviewed}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">Cards Reviewed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {weeklyStats.accuracy}%
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">Weekly Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Explanation for new users */}
      {stats.total === 0 && (
        <Card className="border border-[var(--border)]">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-[var(--muted-foreground)]/50" aria-hidden="true" />
            <h3 className="font-bold text-lg text-[var(--foreground)] mb-2">
              Start Learning with Spaced Repetition
            </h3>
            <p className="text-[var(--muted-foreground)] mb-4">
              Play flashcard games to build your study deck. The system will automatically
              schedule reviews at optimal intervals to maximize your retention.
            </p>
            <Link href="/architecture/play/flashcard">
              <Button>
                Start Learning
                <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Compact version for embedding in other pages
export function SpacedRepetitionMiniDashboard({ cards }: { cards: CardProgress[] }) {
  const stats = useMemo(() => getStudyStats(cards), [cards])
  const masteryPercent = useMemo(() => calculateMastery(cards), [cards])

  return (
    <div
      className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 border border-purple-500/20"
      role="region"
      aria-label="Study Progress Summary"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-[var(--foreground)] flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-500" aria-hidden="true" />
          Study Progress
        </h4>
        <Link
          href="/architecture/dashboard"
          className="text-xs text-purple-500 hover:underline flex items-center gap-1"
        >
          View Details
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-lg font-bold text-amber-500">{stats.due}</p>
          <p className="text-[10px] text-[var(--muted-foreground)]">Due</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green-500">{stats.mastered}</p>
          <p className="text-[10px] text-[var(--muted-foreground)]">Mastered</p>
        </div>
        <div>
          <p className="text-lg font-bold text-blue-500">{stats.learning}</p>
          <p className="text-[10px] text-[var(--muted-foreground)]">Learning</p>
        </div>
        <div>
          <p className="text-lg font-bold text-purple-500">{masteryPercent}%</p>
          <p className="text-[10px] text-[var(--muted-foreground)]">Mastery</p>
        </div>
      </div>

      {stats.due > 0 && (
        <Link href="/architecture/play/flashcard">
          <Button
            size="sm"
            className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white text-xs"
          >
            <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
            Review {stats.due} cards
          </Button>
        </Link>
      )}
    </div>
  )
}
