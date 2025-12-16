'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserPlus, MessageSquare, Rocket, BookOpen, Calendar,
  UserCheck, Reply, Activity
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

const activityConfig: Record<string, { icon: typeof Activity; color: string; bgColor: string }> = {
  new_user: { icon: UserPlus, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  new_post: { icon: MessageSquare, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  new_project: { icon: Rocket, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  new_article: { icon: BookOpen, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  new_event: { icon: Calendar, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  new_follow: { icon: UserCheck, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
  new_comment: { icon: Reply, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
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
  const [visibleIndex, setVisibleIndex] = useState(0)

  // Fetch activity data
  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('/api/activity/feed?limit=15')
        const data = await res.json()

        if (data.success && data.data) {
          setActivities(data.data)
        }
      } catch (error) {
        console.error('Error fetching activity:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
    const interval = setInterval(fetchActivity, 30000)
    return () => clearInterval(interval)
  }, [])

  // Auto-cycle through activities
  useEffect(() => {
    if (activities.length === 0) return

    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % Math.max(1, activities.length - 4))
    }, 4000)

    return () => clearInterval(interval)
  }, [activities.length])

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
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-6 h-6 mx-auto mb-1 text-[var(--muted-foreground)] opacity-50" />
          <p className="text-[10px] text-[var(--muted-foreground)]">No activity yet</p>
        </div>
      </div>
    )
  }

  // Show 5 activities at a time
  const visibleActivities = activities.slice(visibleIndex, visibleIndex + 5)

  return (
    <div className="h-full flex flex-col">
      {/* Header - compact */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)]">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[10px] font-semibold text-[var(--foreground)]">Live Activity</span>
        </div>
        <span className="text-[9px] text-[var(--muted-foreground)]">{activities.length} recent</span>
      </div>

      {/* Activity list - compact */}
      <div className="flex-1 overflow-hidden p-1.5">
        <AnimatePresence mode="popLayout">
          {visibleActivities.map((activity, index) => {
            const config = activityConfig[activity.type] || activityConfig.new_post
            const Icon = config.icon

            return (
              <motion.div
                key={`${activity.id}-${visibleIndex}`}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1 - index * 0.15, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
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

                {/* NEW badge for first item */}
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

      {/* Progress indicator */}
      <div className="px-3 py-1.5 border-t border-[var(--border)]">
        <div className="flex gap-0.5">
          {Array.from({ length: Math.ceil(activities.length / 5) }).map((_, i) => (
            <motion.div
              key={i}
              className="h-0.5 flex-1 rounded-full bg-[var(--muted)]"
              animate={{
                backgroundColor: i === Math.floor(visibleIndex / 5)
                  ? 'var(--primary)'
                  : 'var(--muted)',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
