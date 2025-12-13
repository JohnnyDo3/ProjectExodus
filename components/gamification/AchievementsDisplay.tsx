'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Trophy, Lock, Star, BookOpen, MessageSquare, Users, Flame, Compass, Crown, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Achievement {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  category: string
  points: number
  rarity: string
  secret: boolean
  userProgress?: {
    progress: number
    completed: boolean
    completedAt: string | null
    notified: boolean
  } | null
}

interface AchievementsData {
  achievements: Achievement[]
  grouped: Record<string, Achievement[]>
  stats: {
    total: number
    unlocked: number
    percentage: number
    pointsEarned: number
  }
}

interface AchievementsDisplayProps {
  className?: string
  compact?: boolean
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  READING: <BookOpen className="w-4 h-4" />,
  CONTRIBUTION: <Star className="w-4 h-4" />,
  ENGAGEMENT: <MessageSquare className="w-4 h-4" />,
  STREAK: <Flame className="w-4 h-4" />,
  EXPLORATION: <Compass className="w-4 h-4" />,
  SOCIAL: <Users className="w-4 h-4" />,
  MASTERY: <Crown className="w-4 h-4" />,
}

const RARITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  COMMON: { bg: 'bg-gray-500/20', text: 'text-gray-500', border: 'border-gray-500/30' },
  UNCOMMON: { bg: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500/30' },
  RARE: { bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500/30' },
  EPIC: { bg: 'bg-purple-500/20', text: 'text-purple-500', border: 'border-purple-500/30' },
  LEGENDARY: { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/30' },
}

export function AchievementsDisplay({ className, compact = false }: AchievementsDisplayProps) {
  const [data, setData] = useState<AchievementsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch('/api/gamification/achievements')
        const result = await res.json()
        if (result.success) {
          setData(result.data)
        }
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  if (isLoading) {
    return (
      <div className={cn('animate-pulse bg-[var(--muted)] rounded-xl h-32', className)} />
    )
  }

  if (!data) return null

  if (compact) {
    // Show recent/notable achievements
    const recentUnlocked = data.achievements
      .filter((a) => a.userProgress?.completed)
      .slice(0, 3)

    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Trophy className="w-4 h-4 text-yellow-500" />
        <div className="flex -space-x-2">
          {recentUnlocked.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-2 border-[var(--card)]',
                RARITY_COLORS[achievement.rarity]?.bg || RARITY_COLORS.COMMON.bg
              )}
              title={achievement.name}
            >
              <span className="text-sm">{achievement.icon}</span>
            </div>
          ))}
        </div>
        <span className="text-sm text-[var(--muted-foreground)]">
          {data.stats.unlocked}/{data.stats.total}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden', className)}>
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-[var(--foreground)]">Achievements</h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-[var(--primary)]">{data.stats.unlocked}</span>
            <span className="text-[var(--muted-foreground)]">/ {data.stats.total}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${data.stats.percentage}%` }}
          />
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          {data.stats.pointsEarned} points earned from achievements
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 p-2 border-b border-[var(--border)] overflow-x-auto">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap',
            selectedCategory === null
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
          )}
        >
          All
        </button>
        {Object.keys(data.grouped).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap',
              selectedCategory === category
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
            )}
          >
            {CATEGORY_ICONS[category]}
            {category.charAt(0) + category.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(selectedCategory ? data.grouped[selectedCategory] : data.achievements)?.map((achievement) => {
            const isUnlocked = achievement.userProgress?.completed
            const rarity = RARITY_COLORS[achievement.rarity] || RARITY_COLORS.COMMON

            return (
              <motion.button
                key={achievement.id}
                onClick={() => setSelectedAchievement(achievement)}
                className={cn(
                  'relative p-3 rounded-xl border transition-all text-left',
                  isUnlocked
                    ? `${rarity.bg} ${rarity.border} hover:scale-105`
                    : 'bg-[var(--muted)]/30 border-[var(--border)] opacity-60 hover:opacity-80'
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center text-xl',
                    isUnlocked ? rarity.bg : 'bg-[var(--muted)]'
                  )}>
                    {isUnlocked ? achievement.icon : <Lock className="w-4 h-4 text-[var(--muted-foreground)]" />}
                  </div>
                </div>
                <h4 className={cn(
                  'text-sm font-bold truncate',
                  isUnlocked ? rarity.text : 'text-[var(--muted-foreground)]'
                )}>
                  {achievement.name}
                </h4>
                <p className="text-xs text-[var(--muted-foreground)] truncate">
                  {achievement.description}
                </p>
                {/* Progress indicator for incomplete */}
                {!isUnlocked && achievement.userProgress && (
                  <div className="mt-2">
                    <div className="h-1 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)]"
                        style={{ width: `${achievement.userProgress.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {/* Rarity badge */}
                <div className={cn(
                  'absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold',
                  rarity.bg, rarity.text
                )}>
                  {achievement.rarity}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-2xl max-w-sm w-full overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={cn(
                'p-6 text-center',
                RARITY_COLORS[selectedAchievement.rarity]?.bg || RARITY_COLORS.COMMON.bg
              )}>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 p-1 rounded-lg hover:bg-black/10"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-5xl mb-3">{selectedAchievement.icon}</div>
                <h3 className={cn(
                  'text-xl font-bold',
                  RARITY_COLORS[selectedAchievement.rarity]?.text || RARITY_COLORS.COMMON.text
                )}>
                  {selectedAchievement.name}
                </h3>
                <p className={cn(
                  'text-xs font-bold uppercase tracking-wider mt-1',
                  RARITY_COLORS[selectedAchievement.rarity]?.text || RARITY_COLORS.COMMON.text
                )}>
                  {selectedAchievement.rarity}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[var(--foreground)] text-center mb-4">
                  {selectedAchievement.description}
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-[var(--primary)]">{selectedAchievement.points}</div>
                    <div className="text-[var(--muted-foreground)]">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{selectedAchievement.category}</div>
                    <div className="text-[var(--muted-foreground)]">Category</div>
                  </div>
                </div>
                {selectedAchievement.userProgress?.completed && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)] text-center">
                    <p className="text-green-500 font-medium">Unlocked!</p>
                    {selectedAchievement.userProgress.completedAt && (
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {new Date(selectedAchievement.userProgress.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
