'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Activity,
  UserPlus,
  MessageSquare,
  Rocket,
  BookOpen,
  Calendar,
  Heart,
  MessageCircle,
  RefreshCw,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'new_user' | 'new_post' | 'new_project' | 'new_article' | 'new_event' | 'new_follow' | 'new_comment'
  message: string
  userId?: string
  userName?: string
  userImage?: string
  targetName?: string
  targetId?: string
  createdAt: string
}

const activityConfig = {
  new_user: {
    icon: UserPlus,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500',
  },
  new_post: {
    icon: MessageSquare,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/20',
    borderColor: 'border-sky-500',
  },
  new_project: {
    icon: Rocket,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/20',
    borderColor: 'border-violet-500',
  },
  new_article: {
    icon: BookOpen,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500',
  },
  new_event: {
    icon: Calendar,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/20',
    borderColor: 'border-pink-500',
  },
  new_follow: {
    icon: Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/20',
    borderColor: 'border-rose-500',
  },
  new_comment: {
    icon: MessageCircle,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/20',
    borderColor: 'border-indigo-500',
  },
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString()
}

function getActivityLink(activity: ActivityItem): string | null {
  switch (activity.type) {
    case 'new_user':
      return activity.userId ? `/profile/${activity.userId}` : null
    case 'new_post':
      return '/community/feed'
    case 'new_project':
      return activity.targetId ? `/community/projects/${activity.targetId}` : null
    case 'new_article':
      return activity.targetId ? `/learn/${activity.targetId}` : null
    case 'new_event':
      return activity.targetId ? `/events/${activity.targetId}` : null
    case 'new_follow':
      return activity.targetId ? `/profile/${activity.targetId}` : null
    case 'new_comment':
      return '/community/feed'
    default:
      return null
  }
}

export function NetworkActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [newActivityCount, setNewActivityCount] = useState(0)
  const lastFetchRef = useRef<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const fetchActivities = async (isAutoRefresh = false) => {
    if (isAutoRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      const res = await fetch('/api/activity/feed?limit=30')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          const newActivities = data.data as ActivityItem[]

          // Check for new activities since last fetch
          if (isAutoRefresh && lastFetchRef.current && newActivities.length > 0) {
            const newCount = newActivities.filter(
              a => new Date(a.createdAt) > new Date(lastFetchRef.current!)
            ).length
            if (newCount > 0) {
              setNewActivityCount(prev => prev + newCount)
            }
          }

          setActivities(newActivities)
          if (newActivities.length > 0) {
            lastFetchRef.current = newActivities[0].createdAt
          }
        }
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchActivities()

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchActivities(true)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setNewActivityCount(0)
    fetchActivities()
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const displayedActivities = isExpanded ? activities : activities.slice(0, 8)

  return (
    <div className="bg-[var(--card)] rounded-3xl border-3 border-theme-accent/40 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black">NETWORK ACTIVITY</h2>
              <p className="text-[10px] font-medium opacity-80">Real-time updates</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* New activity indicator */}
        {newActivityCount > 0 && (
          <button
            onClick={handleRefresh}
            className="mt-2 w-full py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-xs font-bold transition-colors"
          >
            {newActivityCount} new {newActivityCount === 1 ? 'update' : 'updates'} - Click to refresh
          </button>
        )}
      </div>

      {/* Activity List */}
      <div
        ref={scrollContainerRef}
        className={`overflow-y-auto transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-[320px]'}`}
      >
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="w-8 h-8 border-3 border-theme-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs font-bold text-theme-muted">Loading activity...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-6 text-center">
            <Users className="w-10 h-10 text-theme-muted mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold text-theme-muted">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {displayedActivities.map((activity, index) => {
              const config = activityConfig[activity.type]
              const Icon = config.icon
              const link = getActivityLink(activity)

              const content = (
                <div
                  className={`flex items-start gap-3 p-3 hover:bg-[var(--muted)]/50 transition-colors ${
                    index === 0 ? 'bg-[var(--muted)]/30' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--foreground)] leading-tight">
                      {activity.message}
                    </p>
                    <p className="text-[10px] font-medium text-theme-muted mt-0.5">
                      {getTimeAgo(activity.createdAt)}
                    </p>
                  </div>

                  {/* User avatar (if available) */}
                  {activity.userImage && (
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border)]">
                      <img
                        src={activity.userImage}
                        alt={activity.userName || 'User'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )

              return link ? (
                <Link key={activity.id} href={link}>
                  {content}
                </Link>
              ) : (
                <div key={activity.id}>{content}</div>
              )
            })}
          </div>
        )}
      </div>

      {/* Expand/Collapse Button */}
      {activities.length > 8 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2.5 bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors flex items-center justify-center gap-1 border-t border-[var(--border)]"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 text-theme-muted" />
              <span className="text-xs font-bold text-theme-muted">Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 text-theme-muted" />
              <span className="text-xs font-bold text-theme-muted">
                Show {activities.length - 8} More
              </span>
            </>
          )}
        </button>
      )}

      {/* Live indicator */}
      <div className="px-4 py-2 bg-[var(--muted)]/30 border-t border-[var(--border)] flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-[10px] font-bold text-theme-muted uppercase">Live • Updates every 30s</span>
      </div>
    </div>
  )
}
