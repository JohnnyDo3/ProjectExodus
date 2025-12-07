'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Bell, BookOpen, Briefcase, Users, MessageCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface SpotlightItem {
  id: string
  type: 'notification' | 'learning' | 'project' | 'connection' | 'discussion'
  title: string
  message: string
  link?: string
  timestamp: Date
  priority: number
}

interface DynamicSpotlightProps {
  notifications?: any[]
  learningModules?: any[]
  projects?: any[]
  connectionRequests?: any[]
  onDismiss?: (itemId: string) => void
  className?: string
}

const typeConfig = {
  notification: {
    icon: Bell,
    gradient: 'from-[var(--primary)] to-[var(--accent)]',
    label: 'NOTIFICATION',
  },
  learning: {
    icon: BookOpen,
    gradient: 'from-[var(--accent)] to-[var(--secondary)]',
    label: 'CONTINUE LEARNING',
  },
  project: {
    icon: Briefcase,
    gradient: 'from-[var(--secondary)] to-[var(--primary)]',
    label: 'PROJECT UPDATE',
  },
  connection: {
    icon: Users,
    gradient: 'from-[var(--primary)] to-[var(--secondary)]',
    label: 'CONNECTION REQUEST',
  },
  discussion: {
    icon: MessageCircle,
    gradient: 'from-[var(--accent)] to-[var(--primary)]',
    label: 'NEW REPLY',
  },
}

export function DynamicSpotlight({
  notifications = [],
  learningModules = [],
  projects = [],
  connectionRequests = [],
  onDismiss,
  className = '',
}: DynamicSpotlightProps) {
  const [currentItem, setCurrentItem] = useState<SpotlightItem | null>(null)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [isVisible, setIsVisible] = useState(true)

  // Build priority queue of spotlight items
  const buildSpotlightQueue = useCallback((): SpotlightItem[] => {
    const items: SpotlightItem[] = []

    // Add unread notifications (highest priority)
    const notifArray = Array.isArray(notifications) ? notifications : []
    notifArray
      .filter((n) => !n.read && !dismissedIds.has(n.id))
      .forEach((n) => {
        items.push({
          id: n.id,
          type: 'notification',
          title: n.title || 'New Notification',
          message: n.message || '',
          link: n.link,
          timestamp: new Date(n.createdAt),
          priority: 100,
        })
      })

    // Add in-progress learning modules
    const learningArray = Array.isArray(learningModules) ? learningModules : []
    learningArray
      .filter((m) => m.progress > 0 && m.progress < 100 && !dismissedIds.has(m.id))
      .forEach((m) => {
        items.push({
          id: m.id,
          type: 'learning',
          title: m.title || m.module?.title || 'Continue Learning',
          message: `${m.progress}% complete`,
          link: `/learn/${m.moduleId || m.id}`,
          timestamp: new Date(m.updatedAt || m.createdAt),
          priority: 80,
        })
      })

    // Add recent project updates (last 24 hours)
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const projectsArray = Array.isArray(projects) ? projects : []
    projectsArray
      .filter((p) => new Date(p.updatedAt) > dayAgo && !dismissedIds.has(p.id))
      .forEach((p) => {
        items.push({
          id: p.id,
          type: 'project',
          title: p.name,
          message: 'Recently updated',
          link: `/community/projects/${p.slug}`,
          timestamp: new Date(p.updatedAt),
          priority: 60,
        })
      })

    // Add connection requests
    const connectionsArray = Array.isArray(connectionRequests) ? connectionRequests : []
    connectionsArray
      .filter((c) => !dismissedIds.has(c.id))
      .forEach((c) => {
        items.push({
          id: c.id,
          type: 'connection',
          title: c.sender?.name || 'Someone',
          message: 'wants to connect with you',
          link: '/network',
          timestamp: new Date(c.createdAt),
          priority: 70,
        })
      })

    // Sort by priority, then by timestamp (newest first)
    return items.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority
      return b.timestamp.getTime() - a.timestamp.getTime()
    })
  }, [notifications, learningModules, projects, connectionRequests, dismissedIds])

  // Update current item when data changes
  useEffect(() => {
    const queue = buildSpotlightQueue()
    if (queue.length > 0) {
      setCurrentItem(queue[0])
      setIsVisible(true)
    } else {
      setCurrentItem(null)
    }
  }, [buildSpotlightQueue])

  const handleDismiss = useCallback(() => {
    if (currentItem) {
      setDismissedIds((prev) => new Set([...prev, currentItem.id]))
      onDismiss?.(currentItem.id)
    }
  }, [currentItem, onDismiss])

  const handleDismissAll = useCallback(() => {
    setIsVisible(false)
  }, [])

  if (!currentItem || !isVisible) {
    return null
  }

  const config = typeConfig[currentItem.type]
  const Icon = config.icon

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${config.gradient} p-[2px]`}>
        <div className="relative bg-[var(--card)] rounded-2xl p-4 md:p-5">
          {/* Dismiss buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={handleDismissAll}
              className="text-xs font-medium text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80 transition-colors"
            >
              Hide all
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg bg-[var(--muted)] hover:bg-[var(--muted)]/80 transition-colors"
            >
              <X className="w-4 h-4 text-[var(--foreground)]/60" />
            </button>
          </div>

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-16">
              <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide bg-gradient-to-r ${config.gradient} text-white mb-2`}>
                {config.label}
              </div>
              <h3 className="text-base md:text-lg font-bold text-[var(--foreground)] truncate">
                {currentItem.title}
              </h3>
              <p className="text-sm text-[var(--foreground)]/60 truncate">
                {currentItem.message}
              </p>
            </div>

            {/* Action button */}
            {currentItem.link && (
              <Link
                href={currentItem.link}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
              >
                View
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Queue indicator */}
          {buildSpotlightQueue().length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {buildSpotlightQueue().slice(0, 5).map((item, idx) => (
                <div
                  key={item.id}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === 0 ? 'w-4 bg-[var(--primary)]' : 'bg-[var(--foreground)]/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
