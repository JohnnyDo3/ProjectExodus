'use client'

// ============================================
// LEARNING JOURNEY SUMMARY
// Digital Scroll experience activity tracker for Volition page
// Shows all topic books, reading progress, and learning achievements
// ============================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import {
  BookOpen,
  Bookmark,
  Clock,
  CheckCircle,
  PlayCircle,
  ChevronRight,
  Award,
  Flame,
  Zap,
  Star,
} from 'lucide-react'

// Import scroll state utilities
import {
  STORAGE_KEYS,
  GUARDIAN_RIBBONS,
  RIBBON_ORDER,
  CORE_TOPIC_ICONS,
} from '@/components/learning/DigitalScroll/scrollConstants'

// ============================================
// TYPES
// ============================================

interface TopicProgress {
  topicId: string
  topicTitle: string
  chaptersCompleted: number
  totalChapters: number
  versesCompleted: number
  totalVerses: number
  lastReadChapter: number
  lastReadVerse: number
  lastReadPage: number
  lastReadDate: string | null
  progressPercent: number
}

interface LearningStats {
  totalBooksOpened: number
  totalChaptersCompleted: number
  totalVersesCompleted: number
  currentStreak: number
  longestStreak: number
  totalTimeSpent: number // minutes
  isBookUnlocked: boolean
}

interface LearningJourneySummaryProps {
  className?: string
  isCompact?: boolean
}

// ============================================
// TOPIC BOOK CARD
// ============================================

function TopicBookCard({ topic, isCompact }: { topic: TopicProgress; isCompact?: boolean }) {
  const icon = CORE_TOPIC_ICONS[topic.topicId] || '📖'
  const hasStarted = topic.progressPercent > 0
  const isCompleted = topic.progressPercent >= 100

  // Get the current chapter's Guardian ribbon color
  const currentRibbon = RIBBON_ORDER[topic.lastReadChapter]
    ? GUARDIAN_RIBBONS[RIBBON_ORDER[topic.lastReadChapter]]
    : null

  if (isCompact) {
    return (
      <Link
        href={`/learn/topics/${topic.topicId}`}
        className={cn(
          'flex items-center gap-3 p-3 rounded-xl',
          'bg-[var(--muted)] hover:bg-[var(--muted)]/80',
          'transition-all group'
        )}
      >
        {/* Book icon with ribbon accent */}
        <div
          className="relative w-12 h-14 rounded-r-md shadow-md flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, #1a1612 0%, #2a2420 100%)`,
          }}
        >
          <span className="text-xl">{icon}</span>
          {/* Ribbon indicator */}
          {hasStarted && currentRibbon && (
            <div
              className="absolute -top-1 -right-1 w-2 h-6 rounded-b-sm"
              style={{ background: currentRibbon.colors.gradient }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[var(--foreground)] text-sm truncate">
            {topic.topicTitle}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: currentRibbon?.colors.gradient || 'var(--primary)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${topic.progressPercent}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <span className="text-xs font-bold text-[var(--muted-foreground)]">
              {topic.progressPercent}%
            </span>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
      </Link>
    )
  }

  return (
    <Link
      href={`/learn/topics/${topic.topicId}`}
      className={cn(
        'block p-4 rounded-xl',
        'bg-[var(--muted)] hover:bg-[var(--muted)]/80',
        'transition-all group',
        'border-2 border-transparent',
        hasStarted && 'border-[var(--primary)]/20'
      )}
    >
      {/* Book visualization */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="relative w-16 h-20 rounded-r-lg shadow-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, #1a1612 0%, #2a2420 100%)`,
            boxShadow: '4px 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-3xl">{icon}</span>

          {/* Multiple ribbon indicators for chapters */}
          <div className="absolute -top-2 left-1 flex gap-0.5">
            {Array.from({ length: Math.min(topic.chaptersCompleted + 1, 7) }).map((_, i) => {
              const ribbon = RIBBON_ORDER[i] ? GUARDIAN_RIBBONS[RIBBON_ORDER[i]] : null
              const isCompleted = i < topic.chaptersCompleted
              return ribbon ? (
                <div
                  key={i}
                  className="w-1.5 h-4 rounded-b-sm"
                  style={{
                    background: ribbon.colors.gradient,
                    opacity: isCompleted ? 1 : 0.3,
                  }}
                />
              ) : null
            })}
          </div>

          {/* Completion badge */}
          {isCompleted && (
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)] transition-colors">
            The Book of {topic.topicTitle}
          </h4>

          <div className="text-xs text-[var(--muted-foreground)] space-y-0.5">
            <p>
              {topic.chaptersCompleted} of {topic.totalChapters} chapters completed
            </p>
            <p>
              {topic.versesCompleted} of {topic.totalVerses} verses read
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[var(--muted-foreground)]">Journey Progress</span>
          <span className="font-bold" style={{ color: currentRibbon?.colors.from || 'var(--primary)' }}>
            {topic.progressPercent}%
          </span>
        </div>
        <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: currentRibbon?.colors.gradient || 'linear-gradient(to right, var(--primary), var(--accent))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${topic.progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Last read position */}
      {hasStarted && topic.lastReadDate && (
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <Bookmark className="w-3 h-3" />
          <span>
            Ch. {topic.lastReadChapter + 1}, V. {topic.lastReadVerse + 1}, P. {topic.lastReadPage + 1}
          </span>
          <span className="mx-1">·</span>
          <Clock className="w-3 h-3" />
          <span>{formatTimeAgo(topic.lastReadDate)}</span>
        </div>
      )}

      {/* Call to action */}
      <div className="mt-3 pt-3 border-t border-[var(--border)]">
        <span
          className={cn(
            'inline-flex items-center gap-2 text-sm font-bold',
            hasStarted ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
          )}
        >
          {isCompleted ? (
            <>
              <Star className="w-4 h-4" />
              Review Journey
            </>
          ) : hasStarted ? (
            <>
              <PlayCircle className="w-4 h-4" />
              Continue Reading
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              Begin Journey
            </>
          )}
        </span>
      </div>
    </Link>
  )
}

// ============================================
// ACHIEVEMENT BADGE
// ============================================

function AchievementBadge({ type, value }: { type: string; value: number | string }) {
  const configs: Record<string, { icon: any; label: string; color: string }> = {
    streak: { icon: Flame, label: 'Day Streak', color: '#f97316' },
    books: { icon: BookOpen, label: 'Books Opened', color: '#8b5cf6' },
    chapters: { icon: Bookmark, label: 'Chapters', color: '#10b981' },
    verses: { icon: CheckCircle, label: 'Verses', color: '#0ea5e9' },
    time: { icon: Clock, label: 'Hours Learned', color: '#ec4899' },
  }

  const config = configs[type] || configs.books
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center p-3 rounded-xl bg-[var(--muted)]">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
        style={{ background: `${config.color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color: config.color }} />
      </div>
      <span className="text-lg font-bold text-[var(--foreground)]">{value}</span>
      <span className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">
        {config.label}
      </span>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function LearningJourneySummary({ className, isCompact = false }: LearningJourneySummaryProps) {
  const [topics, setTopics] = useState<TopicProgress[]>([])
  const [stats, setStats] = useState<LearningStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  // Fetch learning data
  useEffect(() => {
    async function fetchLearningData() {
      try {
        // Fetch from API
        const response = await fetch('/api/learn/topic-progress')
        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          // Map API data to our format
          const mappedTopics: TopicProgress[] = data.data.map((p: any) => ({
            topicId: p.topicId,
            topicTitle: p.topicTitle || p.topicId.replace(/-/g, ' ').toUpperCase(),
            chaptersCompleted: p.chaptersCompleted || 0,
            totalChapters: p.totalChapters || 7,
            versesCompleted: p.versesCompleted || 0,
            totalVerses: p.totalVerses || 35,
            lastReadChapter: p.lastReadChapter || 0,
            lastReadVerse: p.lastReadVerse || 0,
            lastReadPage: p.lastReadPage || 0,
            lastReadDate: p.lastReadDate || null,
            progressPercent: Math.round((p.progressPercentage || 0) * 100) / 100,
          }))

          setTopics(mappedTopics)

          // Calculate stats
          const totalChapters = mappedTopics.reduce((acc, t) => acc + t.chaptersCompleted, 0)
          const totalVerses = mappedTopics.reduce((acc, t) => acc + t.versesCompleted, 0)
          const booksOpened = mappedTopics.filter(t => t.progressPercent > 0).length

          // Check local storage for book unlock status
          const isUnlocked = typeof window !== 'undefined'
            ? localStorage.getItem(STORAGE_KEYS.bookUnlocked) === 'true'
            : false

          setStats({
            totalBooksOpened: booksOpened,
            totalChaptersCompleted: totalChapters,
            totalVersesCompleted: totalVerses,
            currentStreak: 0, // Would need separate tracking
            longestStreak: 0,
            totalTimeSpent: 0,
            isBookUnlocked: isUnlocked,
          })
        }
      } catch (error) {
        console.error('Error fetching learning data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLearningData()
  }, [])

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="h-8 bg-[var(--muted)] rounded animate-pulse" />
        <div className="h-24 bg-[var(--muted)] rounded-xl animate-pulse" />
        <div className="h-24 bg-[var(--muted)] rounded-xl animate-pulse" />
      </div>
    )
  }

  const visibleTopics = showAll ? topics : topics.slice(0, 3)
  const hasProgress = topics.some(t => t.progressPercent > 0)

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header with unlock status */}
      {stats?.isBookUnlocked && (
        <motion.div
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[var(--foreground)]">
              Digital Scroll Experience Unlocked
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              You have access to the immersive learning scrolls
            </p>
          </div>
        </motion.div>
      )}

      {/* Quick stats */}
      {stats && hasProgress && !isCompact && (
        <div className="grid grid-cols-4 gap-2">
          <AchievementBadge type="books" value={stats.totalBooksOpened} />
          <AchievementBadge type="chapters" value={stats.totalChaptersCompleted} />
          <AchievementBadge type="verses" value={stats.totalVersesCompleted} />
          <AchievementBadge type="streak" value={stats.currentStreak} />
        </div>
      )}

      {/* Topic books */}
      {topics.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {visibleTopics.map((topic, index) => (
              <motion.div
                key={topic.topicId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TopicBookCard topic={topic} isCompact={isCompact} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Show more button */}
          {topics.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
            >
              {showAll ? 'Show Less' : `Show ${topics.length - 3} More Books`}
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[var(--muted)] flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-[var(--foreground)]/30" />
          </div>
          <p className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
            Your learning journey awaits
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-4 h-4" />
            Start Learning
          </Link>
        </div>
      )}

      {/* Browse all button */}
      {topics.length > 0 && (
        <Link
          href="/learn"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-bold hover:bg-[var(--primary)]/20 transition-colors"
        >
          <Zap className="w-4 h-4" />
          Browse All Learning Topics
        </Link>
      )}
    </div>
  )
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatTimeAgo(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return then.toLocaleDateString()
}

export default LearningJourneySummary
