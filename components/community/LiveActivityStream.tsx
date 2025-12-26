'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserPlus, MessageSquare, Rocket, BookOpen, Calendar,
  UserCheck, Reply, Activity, Leaf, Sparkles
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'new_user' | 'new_post' | 'new_project' | 'new_article' | 'new_event' | 'new_follow' | 'new_comment'
  message: string
  userName: string
  userImage: string | null
  targetName?: string
  createdAt: string
}

// Daily wisdom quotes about sustainability
const dailyWisdom = [
  { quote: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan" },
  { quote: "We do not inherit the earth from our ancestors; we borrow it from our children.", author: "Native American Proverb" },
  { quote: "In every walk with nature, one receives far more than they seek.", author: "John Muir" },
  { quote: "The Earth does not belong to us. We belong to the Earth.", author: "Chief Seattle" },
  { quote: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves.", author: "Mahatma Gandhi" },
  { quote: "Nature always wears the colors of the spirit.", author: "Ralph Waldo Emerson" },
  { quote: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
]

// Get a quote based on the day of year for consistency
function getDailyQuote() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return dailyWisdom[dayOfYear % dailyWisdom.length]
}

const activityConfig: Record<string, { icon: typeof Activity; color: string; bgColor: string }> = {
  new_user: { icon: UserPlus, color: 'text-[var(--primary)]', bgColor: 'bg-[var(--primary)]/10' },
  new_post: { icon: MessageSquare, color: 'text-[var(--accent)]', bgColor: 'bg-[var(--accent)]/10' },
  new_project: { icon: Rocket, color: 'text-[var(--primary)]', bgColor: 'bg-[var(--primary)]/10' },
  new_article: { icon: BookOpen, color: 'text-[var(--accent)]', bgColor: 'bg-[var(--accent)]/10' },
  new_event: { icon: Calendar, color: 'text-[var(--primary)]', bgColor: 'bg-[var(--primary)]/10' },
  new_follow: { icon: UserCheck, color: 'text-[var(--accent)]', bgColor: 'bg-[var(--accent)]/10' },
  new_comment: { icon: Reply, color: 'text-[var(--primary)]', bgColor: 'bg-[var(--primary)]/10' },
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

function getActivityText(type: string, targetName?: string): string {
  switch (type) {
    case 'new_user': return 'joined'
    case 'new_post': return 'posted'
    case 'new_project': return 'created project'
    case 'new_article': return 'published'
    case 'new_event': return 'created event'
    case 'new_follow': return 'followed'
    case 'new_comment': return 'commented'
    default: return ''
  }
}

export function LiveActivityStream() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch activity data
  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('/api/activity/feed?limit=10')
        const data = await res.json()

        if (data.success && data.data) {
          // Sort by createdAt descending (newest first)
          const sorted = [...data.data].sort((a: ActivityItem, b: ActivityItem) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          setActivities(sorted)
        }
      } catch (error) {
        console.error('Error fetching activity:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
    // Refresh every 30 seconds to get new updates
    const interval = setInterval(fetchActivity, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="h-full flex flex-col p-2">
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[var(--border)]">
          <div className="w-2 h-2 rounded-full bg-[var(--muted)] animate-pulse" />
          <span className="text-[10px] font-medium text-[var(--muted-foreground)]">Loading...</span>
        </div>
        <div className="flex-1 p-2 space-y-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 p-1.5 rounded bg-[var(--muted)]/30"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            >
              <div className="w-5 h-5 rounded bg-[var(--muted)]" />
              <div className="flex-1 h-2.5 bg-[var(--muted)] rounded" />
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (activities.length === 0) {
    const wisdom = getDailyQuote()

    return (
      <div className="h-full flex flex-col relative overflow-hidden">
        {/* Floating leaves animation background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[var(--primary)]"
              style={{
                left: `${15 + i * 18}%`,
                top: -20,
              }}
              animate={{
                y: ['0%', '400%'],
                x: [0, Math.sin(i) * 20, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.5, 0.3, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'linear',
              }}
            >
              <Leaf className="w-3 h-3" />
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] relative z-10">
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[10px] font-semibold text-[var(--foreground)]">Community Pulse</span>
          </div>
          <span className="text-[9px] text-[var(--muted-foreground)]">Daily wisdom</span>
        </div>

        {/* Main content - Daily Wisdom */}
        <div className="flex-1 flex flex-col items-center justify-center p-3 relative z-10">
          {/* Decorative sparkle */}
          <motion.div
            className="mb-2"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
          </motion.div>

          {/* Quote */}
          <motion.div
            className="text-center px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[11px] italic text-[var(--foreground)] leading-relaxed mb-2">
              "{wisdom.quote}"
            </p>
            <p className="text-[9px] text-[var(--muted-foreground)] font-medium">
              — {wisdom.author}
            </p>
          </motion.div>

          {/* Subtle call to action */}
          <motion.div
            className="mt-3 px-3 py-1.5 rounded-full bg-[var(--muted)]/40 border border-[var(--border)]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-[8px] text-[var(--muted-foreground)] text-center">
              Be the first to share today ✨
            </p>
          </motion.div>
        </div>

        {/* Ambient pulse rings */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full border border-[var(--primary)]/20"
              style={{ left: -16, top: -16 }}
              animate={{
                scale: [1, 2.5],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Show up to 6 most recent activities (newest first, no cycling)
  const recentActivities = activities.slice(0, 6)

  return (
    <div className="h-full flex flex-col">
      {/* Header - compact */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)]">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[10px] font-semibold text-[var(--foreground)]">Live Activity</span>
        </div>
        <span className="text-[9px] text-[var(--muted-foreground)]">Latest updates</span>
      </div>

      {/* Activity list - newest first, static display */}
      <div className="flex-1 overflow-y-auto p-1.5">
        <AnimatePresence mode="popLayout">
          {recentActivities.map((activity, index) => {
            const config = activityConfig[activity.type] || activityConfig.new_post
            const Icon = config.icon

            return (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.05 }}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[var(--muted)]/30 transition-colors"
              >
                {/* Icon */}
                <motion.div
                  className={`w-5 h-5 rounded ${config.bgColor} flex items-center justify-center flex-shrink-0`}
                  animate={index === 0 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className={`w-2.5 h-2.5 ${config.color}`} />
                </motion.div>

                {/* Content - single line */}
                <div className="flex-1 min-w-0 flex items-center gap-1">
                  <span className="text-[10px] font-medium text-[var(--foreground)] truncate max-w-[80px]">
                    {activity.userName}
                  </span>
                  <span className="text-[10px] text-[var(--muted-foreground)]">
                    {getActivityText(activity.type)}
                  </span>
                </div>

                {/* Time */}
                <span className="text-[9px] text-[var(--muted-foreground)] flex-shrink-0">
                  {formatTimeAgo(activity.createdAt)}
                </span>

                {/* NEW badge for first item (most recent) */}
                {index === 0 && (
                  <motion.span
                    className="text-[8px] px-1 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    NEW
                  </motion.span>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
