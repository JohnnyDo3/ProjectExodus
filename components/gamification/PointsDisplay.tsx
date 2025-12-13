'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Sparkles, Star, TrendingUp, ChevronUp, Gift } from 'lucide-react'

interface PointsData {
  totalPoints: number
  currentPoints: number
  weeklyPoints: number
  monthlyPoints: number
  level: number
  levelProgress: number
  pointsToNextLevel: number
  transactions: Array<{
    id: string
    amount: number
    reason: string
    description: string
    createdAt: string
  }>
  breakdown: Record<string, number>
}

interface PointsDisplayProps {
  className?: string
  compact?: boolean
  showTransactions?: boolean
}

export function PointsDisplay({ className, compact = false, showTransactions = false }: PointsDisplayProps) {
  const [points, setPoints] = useState<PointsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    async function fetchPoints() {
      try {
        const res = await fetch('/api/gamification/points')
        const data = await res.json()
        if (data.success) {
          setPoints(data.data)
        }
      } catch (error) {
        console.error('Error fetching points:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPoints()
  }, [])

  if (isLoading) {
    return (
      <div className={cn('animate-pulse bg-[var(--muted)] rounded-xl h-16', className)} />
    )
  }

  if (!points) return null

  const getLevelTitle = (level: number) => {
    const titles = [
      'Novice Reader',
      'Apprentice Scholar',
      'Journeyman Learner',
      'Adept Reader',
      'Expert Scholar',
      'Master Reader',
      'Grand Scholar',
      'Sage',
      'Enlightened One',
      'Library Guardian'
    ]
    return titles[Math.min(level - 1, titles.length - 1)]
  }

  const getReasonLabel = (reason: string) => {
    const labels: Record<string, string> = {
      ARTICLE_READ: 'Article Read',
      ARTICLE_COMPLETED: 'Article Completed',
      REVIEW_WRITTEN: 'Review Written',
      REVIEW_HELPFUL: 'Helpful Review',
      COMMENT_POSTED: 'Comment Posted',
      ACHIEVEMENT_EARNED: 'Achievement',
      STREAK_BONUS: 'Streak Bonus',
      DAILY_LOGIN: 'Daily Login',
      FIRST_OF_DAY: 'First Read',
      COLLECTION_CREATED: 'Collection Created',
      ARTICLE_PUBLISHED: 'Article Published',
      BOOKMARK_ADDED: 'Bookmark',
      HIGHLIGHT_ADDED: 'Highlight'
    }
    return labels[reason] || reason
  }

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="font-bold text-[var(--foreground)]">{points.totalPoints}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-[var(--muted)] rounded-full">
          <Star className="w-3 h-3 text-purple-500" />
          <span className="text-sm font-medium">Lv.{points.level}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-purple-500/10 rounded-xl p-4 border border-yellow-500/20',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="font-bold text-[var(--foreground)]">Points & Level</h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-[var(--primary)] hover:underline"
        >
          {showDetails ? 'Hide' : 'Details'}
        </button>
      </div>

      {/* Main Display */}
      <div className="flex items-center gap-6 mb-4">
        {/* Total Points */}
        <div className="text-center">
          <motion.div
            className="text-3xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
            key={points.totalPoints}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            {points.totalPoints.toLocaleString()}
          </motion.div>
          <div className="text-xs text-[var(--muted-foreground)]">Total Points</div>
        </div>

        {/* Level Badge */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <div className="w-14 h-14 rounded-full bg-[var(--card)] flex flex-col items-center justify-center">
              <span className="text-xl font-black text-purple-500">{points.level}</span>
              <span className="text-[8px] text-[var(--muted-foreground)]">LEVEL</span>
            </div>
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronUp className="w-3 h-3 text-white" />
          </motion.div>
        </div>

        {/* Level Info */}
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--foreground)]">{getLevelTitle(points.level)}</p>
          <div className="mt-1">
            <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-1">
              <span>Level {points.level}</span>
              <span>Level {points.level + 1}</span>
            </div>
            <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${points.levelProgress}%` }}
              />
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              {points.pointsToNextLevel} points to next level
            </p>
          </div>
        </div>
      </div>

      {/* Weekly/Monthly Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="p-2 bg-[var(--muted)]/50 rounded-lg">
          <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] mb-1">
            <TrendingUp className="w-3 h-3" />
            This Week
          </div>
          <span className="font-bold text-green-500">+{points.weeklyPoints}</span>
        </div>
        <div className="p-2 bg-[var(--muted)]/50 rounded-lg">
          <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] mb-1">
            <TrendingUp className="w-3 h-3" />
            This Month
          </div>
          <span className="font-bold text-blue-500">+{points.monthlyPoints}</span>
        </div>
      </div>

      {/* Details Section */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {/* Points Breakdown */}
            <div className="mb-4 p-3 bg-[var(--muted)]/30 rounded-lg">
              <h4 className="text-xs font-bold text-[var(--muted-foreground)] uppercase mb-2">
                Points Breakdown
              </h4>
              <div className="space-y-1">
                {Object.entries(points.breakdown)
                  .filter(([, value]) => value > 0)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([reason, amount]) => (
                    <div key={reason} className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">{getReasonLabel(reason)}</span>
                      <span className="font-medium text-[var(--foreground)]">+{amount}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Transactions */}
            {showTransactions && points.transactions.length > 0 && (
              <div className="p-3 bg-[var(--muted)]/30 rounded-lg">
                <h4 className="text-xs font-bold text-[var(--muted-foreground)] uppercase mb-2">
                  Recent Activity
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {points.transactions.slice(0, 10).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-[var(--foreground)]">{getReasonLabel(tx.reason)}</span>
                        {tx.description && (
                          <p className="text-xs text-[var(--muted-foreground)] truncate max-w-[150px]">
                            {tx.description}
                          </p>
                        )}
                      </div>
                      <span className={cn(
                        'font-bold',
                        tx.amount > 0 ? 'text-green-500' : 'text-red-500'
                      )}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Floating Points Animation (for when points are earned)
export function PointsAnimation({
  amount,
  position,
  onComplete
}: {
  amount: number
  position: { x: number; y: number }
  onComplete: () => void
}) {
  return (
    <motion.div
      className="fixed z-[100] pointer-events-none"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -50, scale: 1.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white rounded-full font-bold shadow-lg">
        <Sparkles className="w-4 h-4" />
        +{amount}
      </div>
    </motion.div>
  )
}
