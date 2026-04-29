'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useHasMounted } from '@/lib/hooks/useHasMounted'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { Bell, Trash2, CheckCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type NotificationType =
  | 'PRODUCT_APPROVED'
  | 'ARTICLE_PUBLISHED'
  | 'COMMENT_REPLY'
  | 'FORUM_REPLY'
  | 'NEW_FOLLOWER'
  | 'BADGE_EARNED'
  | 'PROJECT_INVITE'
  | 'SYSTEM'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  link: string | null
  read: boolean
  createdAt: string
}

interface NotificationsResponse {
  success: boolean
  data: {
    notifications: Notification[]
    pagination: {
      total: number
      limit: number
      offset: number
      hasMore: boolean
    }
    unreadCount: number
  }
}

// Icon mapping for notification types
const getNotificationIcon = (type: NotificationType): string => {
  const iconMap: Record<NotificationType, string> = {
    PRODUCT_APPROVED: '🎉',
    ARTICLE_PUBLISHED: '📝',
    COMMENT_REPLY: '💬',
    FORUM_REPLY: '💭',
    NEW_FOLLOWER: '👥',
    BADGE_EARNED: '🏆',
    PROJECT_INVITE: '📨',
    SYSTEM: '🔔',
  }
  return iconMap[type] || '🔔'
}

export default function NotificationsPage() {
  const { data: session, status } = useSession()
  const hasMounted = useHasMounted()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const [markingAllRead, setMarkingAllRead] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Fetch notifications
  useEffect(() => {
    if (status === 'authenticated') {
      fetchNotifications()
    }
  }, [status])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/notifications?limit=50')
      const data: NotificationsResponse = await response.json()

      if (data.success) {
        setNotifications(data.data.notifications)
        setUnreadCount(data.data.unreadCount)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      setMarkingAllRead(true)
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH',
      })

      if (response.ok) {
        // Update all notifications to read in state
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true }))
        )
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    } finally {
      setMarkingAllRead(false)
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read if unread
    if (!notification.read) {
      try {
        await fetch(`/api/notifications/${notification.id}`, {
          method: 'PATCH',
        })

        // Update state
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      } catch (error) {
        console.error('Error marking notification as read:', error)
      }
    }

    // Navigate if there's a link
    if (notification.link) {
      router.push(notification.link)
    }
  }

  const handleDeleteNotification = async (
    e: React.MouseEvent,
    notificationId: string,
    isRead: boolean
  ) => {
    e.stopPropagation()

    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove from state
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        if (!isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1))
        }
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  // Show loading state while checking auth
  if ((hasMounted && status === 'loading') || loading) {
    return (
      <div className="h-full flex flex-col overflow-hidden" style={{ background: 'var(--background)' }}>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="text-lg font-medium"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Loading notifications...
          </div>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null
  }

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto w-full px-4 flex flex-col h-full min-h-0">
        {/* Header - fixed at top */}
        <div className="py-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Bell
                className="w-8 h-8"
                style={{ color: 'var(--primary)' }}
                strokeWidth={2}
              />
              <h1
                className="text-3xl font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                Notifications
              </h1>
            </div>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={markingAllRead}
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          <p style={{ color: 'var(--muted-foreground)' }} className="text-sm">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
              : 'All caught up!'}
          </p>
        </div>

        {/* Notifications List - scrollable area */}
        <div className="flex-1 overflow-y-auto pb-4 min-h-0">
          {notifications.length === 0 ? (
            // Empty State
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
                  <Bell
                    className="w-10 h-10"
                    style={{ color: 'var(--muted-foreground)' }}
                    strokeWidth={1.5}
                  />
                </div>
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  No notifications yet
                </h2>
                <p style={{ color: 'var(--muted-foreground)' }}>
                  When you receive notifications, they'll appear here
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    !notification.read ? 'border-l-4' : ''
                  }`}
                  style={{
                    borderLeftColor: !notification.read
                      ? 'var(--primary)'
                      : undefined,
                    background: !notification.read
                      ? 'var(--muted)'
                      : 'var(--card)',
                  }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        background: 'var(--background)',
                        border: '2px solid var(--border)',
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3
                          className="font-semibold text-base"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {notification.title}
                        </h3>

                        {/* Delete Button */}
                        <button
                          onClick={(e) =>
                            handleDeleteNotification(
                              e,
                              notification.id,
                              notification.read
                            )
                          }
                          className="flex-shrink-0 p-1.5 rounded-lg transition-colors hover:bg-[var(--muted)]"
                          style={{ color: 'var(--muted-foreground)' }}
                          aria-label="Delete notification"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p
                        className="text-sm mb-2 line-clamp-2"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                          })}
                        </span>

                        {!notification.read && (
                          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--primary)' }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }}></span>
                            Unread
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
