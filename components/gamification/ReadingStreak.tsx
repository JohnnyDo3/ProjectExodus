'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Flame, Snowflake, Calendar, Trophy, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface StreakData {
  currentStreak: number
  longestStreak: number
  totalDaysRead: number
  lastReadDate: string | null
  freezesUsed: number
  freezesAvailable: number
  freezesRemaining: number
  streakBroken: boolean
  daysUntilBreak: number | null
  readToday: boolean
  completionRing: {
    current: number
    target: number
    percentage: number
  }
  milestone: {
    next: number
    progress: number
    remaining: number
  }
}

interface ReadingStreakProps {
  className?: string
  compact?: boolean
}

export function ReadingStreak({ className, compact = false }: ReadingStreakProps) {
  const [streak, setStreak] = useState<StreakData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [usingFreeze, setUsingFreeze] = useState(false)

  useEffect(() => {
    async function fetchStreak() {
      try {
        const res = await fetch('/api/gamification/streaks')
        const data = await res.json()
        if (data.success) {
          setStreak(data.data)
        }
      } catch (error) {
        console.error('Error fetching streak:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStreak()
  }, [])

  const useFreeze = async () => {
    setUsingFreeze(true)
    try {
      const res = await fetch('/api/gamification/streaks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'use_freeze' })
      })
      const data = await res.json()
      if (data.success) {
        // Refetch streak data
        const refreshRes = await fetch('/api/gamification/streaks')
        const refreshData = await refreshRes.json()
        if (refreshData.success) {
          setStreak(refreshData.data)
        }
      }
    } catch (error) {
      console.error('Error using freeze:', error)
    } finally {
      setUsingFreeze(false)
    }
  }

  if (isLoading) {
    return (
      <div className={cn('animate-pulse bg-[var(--muted)] rounded-xl h-24', className)} />
    )
  }

  if (!streak) return null

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="relative">
          <Flame className={cn(
            'w-5 h-5',
            streak.currentStreak > 0 ? 'text-orange-500' : 'text-[var(--muted-foreground)]'
          )} />
          {streak.currentStreak > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
        <span className="font-bold text-[var(--foreground)]">{streak.currentStreak}</span>
        <span className="text-xs text-[var(--muted-foreground)]">day streak</span>
      </div>
    )
  }

  return (
    <div className={cn(
      'bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Flame className={cn(
              'w-6 h-6',
              streak.currentStreak > 0 ? 'text-orange-500' : 'text-[var(--muted-foreground)]'
            )} />
            {streak.currentStreak > 0 && (
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Flame className="w-6 h-6 text-orange-400 blur-[2px]" />
              </motion.div>
            )}
          </div>
          <h3 className="font-bold text-[var(--foreground)]">Reading Streak</h3>
        </div>
        {streak.freezesRemaining > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
            <Snowflake className="w-3 h-3 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">{streak.freezesRemaining}</span>
          </div>
        )}
      </div>

      {/* Main Streak Display */}
      <div className="flex items-center gap-6 mb-4">
        {/* Current Streak */}
        <div className="text-center">
          <motion.div
            className="text-4xl font-black text-orange-500"
            key={streak.currentStreak}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {streak.currentStreak}
          </motion.div>
          <div className="text-xs text-[var(--muted-foreground)]">Current Streak</div>
        </div>

        {/* Progress Ring */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              className="stroke-orange-500/20"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              className="stroke-orange-500"
              strokeWidth="4"
              fill="none"
              strokeDasharray={176}
              initial={{ strokeDashoffset: 176 }}
              animate={{ strokeDashoffset: 176 - (streak.completionRing.percentage / 100) * 176 }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold">{streak.currentStreak}</span>
            <span className="text-[10px] text-[var(--muted-foreground)]">/{streak.completionRing.target}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-[var(--muted-foreground)]">Best:</span>
            <span className="font-bold">{streak.longestStreak}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="text-[var(--muted-foreground)]">Total:</span>
            <span className="font-bold">{streak.totalDaysRead}</span>
          </div>
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[var(--muted-foreground)]">Next milestone: {streak.milestone.next} days</span>
          <span className="font-bold text-orange-500">{streak.milestone.remaining} to go</span>
        </div>
        <div className="h-2 bg-orange-500/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${streak.milestone.progress}%` }}
          />
        </div>
      </div>

      {/* Status */}
      {streak.streakBroken ? (
        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
          <p className="text-sm text-red-500 font-medium">
            Streak broken! Start a new one today.
          </p>
        </div>
      ) : !streak.readToday && streak.daysUntilBreak === 0 ? (
        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              Read today to keep your streak!
            </p>
            {streak.freezesRemaining > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={useFreeze}
                disabled={usingFreeze}
                className="gap-1 text-xs"
              >
                <Snowflake className="w-3 h-3" />
                Use Freeze
              </Button>
            )}
          </div>
        </div>
      ) : streak.readToday ? (
        <div className="flex items-center gap-2 text-sm text-green-500">
          <TrendingUp className="w-4 h-4" />
          <span>You've read today! Great job!</span>
        </div>
      ) : null}
    </div>
  )
}
