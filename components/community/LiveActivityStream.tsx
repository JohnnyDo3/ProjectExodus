'use client'

import { useState, useEffect, useRef } from 'react'
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
  new_user: {
    icon: UserPlus,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  new_post: {
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  new_project: {
    icon: Rocket,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  new_article: {
    icon: BookOpen,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  new_event: {
    icon: Calendar,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  new_follow: {
    icon: UserCheck,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  new_comment: {
    icon: Reply,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export function LiveActivityStream() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleIndex, setVisibleIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch activity data
  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('/api/activity/feed?limit=20')
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

    // Refresh every 30 seconds
    const interval = setInterval(fetchActivity, 30000)
    return () => clearInterval(interval)
  }, [])

  // Auto-cycle through activities (showing new items sliding in)
  useEffect(() => {
    if (activities.length === 0) return

    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % activities.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [activities.length])

  if (isLoading) {
    return (
      <div className="h-full flex flex-col gap-2 p-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 p-2 rounded-lg bg-[var(--muted)]/50"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--muted)]" />
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-[var(--muted)] rounded w-3/4" />
              <div className="h-2 bg-[var(--muted)] rounded w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--muted-foreground)] text-sm">
        <div className="text-center">
          <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Activity stream loading...</p>
        </div>
      </div>
    )
  }

  // Show 6 activities at a time, cycling through
  const visibleActivities = []
  for (let i = 0; i < 6; i++) {
    const index = (visibleIndex + i) % activities.length
    visibleActivities.push({ ...activities[index], displayIndex: i })
  }

  return (
    <div ref={containerRef} className="h-full flex flex-col relative overflow-hidden">
      {/* Live indicator */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]">
        <motion.div
          className="w-2 h-2 rounded-full bg-emerald-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="text-xs font-medium text-[var(--foreground)]">Live Activity</span>
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-hidden p-2">
        <AnimatePresence mode="popLayout">
          {visibleActivities.map((activity) => {
            const config = activityConfig[activity.type] || activityConfig.new_post
            const Icon = config.icon

            return (
              <motion.div
                key={`${activity.id}-${activity.displayIndex}`}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{
                  opacity: activity.displayIndex === 0 ? 1 : 0.7 - activity.displayIndex * 0.1,
                  x: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-[var(--muted)]/50 transition-colors mb-1"
              >
                {/* Activity icon */}
                <motion.div
                  className={`w-7 h-7 rounded-lg ${config.bgColor} flex items-center justify-center flex-shrink-0`}
                  animate={
                    activity.displayIndex === 0
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--foreground)] leading-tight line-clamp-2">
                    <span className="font-medium">{activity.userName}</span>{' '}
                    <span className="text-[var(--muted-foreground)]">
                      {activity.type === 'new_user' && 'joined the community'}
                      {activity.type === 'new_post' && 'started a discussion'}
                      {activity.type === 'new_project' && `created "${activity.targetName || 'a project'}"`}
                      {activity.type === 'new_article' && `published "${activity.targetName || 'an article'}"`}
                      {activity.type === 'new_event' && `created "${activity.targetName || 'an event'}"`}
                      {activity.type === 'new_follow' && `followed ${activity.targetName || 'someone'}`}
                      {activity.type === 'new_comment' && 'added a comment'}
                    </span>
                  </p>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                    {formatTimeAgo(activity.createdAt)}
                  </p>
                </div>

                {/* New badge for first item */}
                {activity.displayIndex === 0 && (
                  <motion.div
                    className="px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[8px] font-medium text-[var(--primary)]"
                    animate={{
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    NEW
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Fade gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--card)] to-transparent pointer-events-none" />
    </div>
  )
}
