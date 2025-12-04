'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  User,
  MessageCircle,
  ExternalLink,
  Users,
  Calendar,
  MessageSquare,
  Briefcase,
  Clock
} from 'lucide-react'
import { formatTimeAgo } from '@/lib/utils/formatTime'

interface ActivityUser {
  id: string
  name: string | null
  image: string | null
}

interface ActivityCardProps {
  activity: {
    id: string
    type: string
    user: ActivityUser
    createdAt: Date | string
    project?: {
      id: string
      name: string
      slug: string
      description?: string
      memberCount?: number
    }
    event?: {
      id: string
      title: string
      slug: string
      type: string
      startDate: Date | string
      attendeeCount?: number
    }
  }
  currentUserId?: string
}

export function ActivityCard({ activity, currentUserId }: ActivityCardProps) {
  const { type, user, createdAt } = activity

  const getActivityIcon = () => {
    switch (type) {
      case 'PROJECT_JOIN':
      case 'PROJECT_CREATE':
        return <Briefcase className="w-4 h-4" />
      case 'EVENT_CREATE':
      case 'EVENT_RSVP':
        return <Calendar className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const getActivityColor = () => {
    switch (type) {
      case 'PROJECT_JOIN':
      case 'PROJECT_CREATE':
        return 'border-theme-primary bg-[color-mix(in_srgb,var(--primary)_5%,var(--muted))]'
      case 'EVENT_CREATE':
      case 'EVENT_RSVP':
        return 'border-theme-secondary bg-[color-mix(in_srgb,var(--secondary)_5%,var(--muted))]'
      default:
        return 'border-[var(--border)] bg-[var(--muted)]'
    }
  }

  const renderActivityContent = () => {
    switch (type) {
      case 'PROJECT_JOIN':
        return (
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-1">
              <Link href={`/profile/${user.id}`} className="hover:text-theme-primary transition-colors">
                {user.name || 'Someone'}
              </Link>
              {' '}joined{' '}
              <Link href={`/community/projects/${activity.project?.slug}`} className="text-theme-primary hover:underline font-black">
                {activity.project?.name}
              </Link>
            </p>
            {activity.project?.memberCount !== undefined && (
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-1 rounded-full bg-[var(--background)] text-xs font-bold text-theme-muted flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {activity.project.memberCount} members
                </div>
                <Link href={`/community/projects/${activity.project?.slug}`}>
                  <Button size="sm" variant="outline" className="h-6 text-xs font-bold">
                    View Project
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )

      case 'PROJECT_CREATE':
        return (
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-1">
              <Link href={`/profile/${user.id}`} className="hover:text-theme-primary transition-colors">
                {user.name || 'Someone'}
              </Link>
              {' '}created{' '}
              <Link href={`/community/projects/${activity.project?.slug}`} className="text-theme-primary hover:underline font-black">
                {activity.project?.name}
              </Link>
            </p>
            {activity.project?.description && (
              <p className="text-xs font-medium text-theme-muted mt-1 line-clamp-1">
                {activity.project.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              {activity.project?.memberCount !== undefined && (
                <div className="px-2 py-1 rounded-full bg-[var(--background)] text-xs font-bold text-theme-muted flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {activity.project.memberCount} members
                </div>
              )}
              <Link href={`/community/projects/${activity.project?.slug}`}>
                <Button size="sm" className="h-6 text-xs font-bold">
                  Join Project
                </Button>
              </Link>
            </div>
          </div>
        )

      case 'EVENT_CREATE':
        return (
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-1">
              <Link href={`/profile/${user.id}`} className="hover:text-theme-primary transition-colors">
                {user.name || 'Someone'}
              </Link>
              {' '}created event{' '}
              <Link href={`/events/${activity.event?.slug}`} className="text-theme-secondary hover:underline font-black">
                {activity.event?.title}
              </Link>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="px-2 py-1 rounded-full bg-[var(--background)] text-xs font-bold text-theme-muted">
                {activity.event?.type || 'VIRTUAL'}
              </div>
              {activity.event?.startDate && (
                <div className="px-2 py-1 rounded-full bg-[var(--background)] text-xs font-medium text-theme-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(activity.event.startDate).toLocaleDateString()}
                </div>
              )}
              <Link href={`/events/${activity.event?.slug}`}>
                <Button size="sm" className="h-6 text-xs font-bold">
                  RSVP
                </Button>
              </Link>
            </div>
          </div>
        )

      case 'EVENT_RSVP':
        return (
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-1">
              <Link href={`/profile/${user.id}`} className="hover:text-theme-primary transition-colors">
                {user.name || 'Someone'}
              </Link>
              {' '}is attending{' '}
              <Link href={`/events/${activity.event?.slug}`} className="text-theme-secondary hover:underline font-black">
                {activity.event?.title}
              </Link>
            </p>
            <div className="flex items-center gap-2 mt-2">
              {activity.event?.startDate && (
                <div className="px-2 py-1 rounded-full bg-[var(--background)] text-xs font-medium text-theme-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(activity.event.startDate).toLocaleDateString()}
                </div>
              )}
              <Link href={`/events/${activity.event?.slug}`}>
                <Button size="sm" variant="outline" className="h-6 text-xs font-bold">
                  View Event
                </Button>
              </Link>
            </div>
          </div>
        )

      default:
        return (
          <p className="text-sm font-semibold text-[var(--foreground)] leading-tight">
            <Link href={`/profile/${user.id}`} className="hover:text-theme-primary transition-colors">
              {user.name || 'Someone'}
            </Link>
            {' '}did something
          </p>
        )
    }
  }

  return (
    <div className={`flex gap-3 p-3 rounded-lg border-2 ${getActivityColor()} hover:shadow-md transition-all`}>
      {/* User Avatar */}
      <Link href={`/profile/${user.id}`} className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
          {user.image ? (
            <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-[var(--primary-foreground)]" />
          )}
        </div>
      </Link>

      {/* Activity Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          {renderActivityContent()}
        </div>

        {/* Footer with timestamp and actions */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-medium text-theme-muted">
            <div className="flex items-center gap-1">
              {getActivityIcon()}
              <span className="capitalize">{type.replace('_', ' ').toLowerCase()}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(createdAt)}
            </div>
          </div>

          {/* Quick Actions */}
          {user.id !== currentUserId && (
            <div className="flex items-center gap-1">
              <Link href={`/messages?user=${user.id}`}>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Message">
                  <MessageCircle className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href={`/profile/${user.id}`}>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="View Profile">
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
