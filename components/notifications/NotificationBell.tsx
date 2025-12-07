'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Bell } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { getPusherClient } from '@/lib/pusher'

type NotificationType =
  | 'PRODUCT_APPROVED'
  | 'ARTICLE_PUBLISHED'
  | 'COMMENT_REPLY'
  | 'FORUM_REPLY'
  | 'NEW_FOLLOWER'
  | 'BADGE_EARNED'
  | 'PROJECT_INVITE'
  | 'NEW_MESSAGE'
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
    unreadCount: number
  }
}

const getNotificationIcon = (type: NotificationType): string => {
  const iconMap: Record<NotificationType, string> = {
    PRODUCT_APPROVED: '🎉',
    ARTICLE_PUBLISHED: '📝',
    COMMENT_REPLY: '💬',
    FORUM_REPLY: '🗣️',
    NEW_FOLLOWER: '👤',
    BADGE_EARNED: '🏆',
    PROJECT_INVITE: '📋',
    NEW_MESSAGE: '✉️',
    SYSTEM: '🔔',
  }
  return iconMap[type] || '🔔'
}

export default function NotificationBell() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen && session?.user) {
      fetchNotifications()
    }
  }, [isOpen, session])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  // Fetch unread count on mount
  useEffect(() => {
    if (session?.user) {
      fetchUnreadCount()
    }
  }, [session])

  // Subscribe to real-time notifications via Pusher
  useEffect(() => {
    if (!session?.user?.id) return

    const pusher = getPusherClient()
    if (!pusher) return

    const channelName = `private-notifications-${session.user.id}`
    const channel = pusher.subscribe(channelName)

    channel.bind('new-notification', (data: { notification: Notification }) => {
      // Add new notification to the top of the list
      setNotifications(prev => [data.notification, ...prev].slice(0, 10))
      setUnreadCount(prev => prev + 1)

      // Optional: Play a subtle notification sound
      try {
        const audio = new Audio('/sounds/notification.mp3')
        audio.volume = 0.3
        audio.play().catch(() => {}) // Ignore if autoplay blocked
      } catch {
        // Audio not available
      }
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(channelName)
    }
  }, [session?.user?.id])

  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications?limit=5')
      const data: NotificationsResponse = await response.json()

      if (data.success) {
        setNotifications(data.data.notifications)
        setUnreadCount(data.data.unreadCount)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/notifications?limit=1')
      const data: NotificationsResponse = await response.json()

      if (data.success) {
        setUnreadCount(data.data.unreadCount)
      }
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
      })

      if (response.ok) {
        // Update local state
        setNotifications(prev =>
          prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH',
      })

      if (response.ok) {
        // Update local state
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      await markAsRead(notification.id)
    }

    // Close dropdown
    setIsOpen(false)

    // Navigate to link if available
    if (notification.link) {
      router.push(notification.link)
    }
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-bell-button"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="mark-all-read-button"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {isLoading ? (
              <div className="notification-loading">
                <div className="loading-spinner"></div>
                <p>Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="notification-empty">
                <Bell size={48} className="empty-icon" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notification => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="notification-unread-indicator"></div>
                  )}
                </button>
              ))
            )}
          </div>

          <div className="notification-footer">
            <button
              onClick={() => {
                setIsOpen(false)
                router.push('/notifications')
              }}
              className="view-all-button"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .notification-bell-container {
          position: relative;
        }

        .notification-bell-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: var(--foreground);
          transition: all 0.2s ease;
        }

        .notification-bell-button:hover {
          background: var(--muted);
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          background: #ef4444;
          color: white;
          font-size: 11px;
          font-weight: 600;
          border-radius: 9px;
          line-height: 1;
        }

        .notification-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 380px;
          max-height: 600px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .notification-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
        }

        .notification-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--foreground);
        }

        .mark-all-read-button {
          padding: 6px 12px;
          background: transparent;
          color: var(--primary);
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mark-all-read-button:hover {
          background: var(--muted);
        }

        .notification-list {
          flex: 1;
          overflow-y: auto;
          max-height: 480px;
        }

        .notification-loading,
        .notification-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          color: var(--muted-foreground);
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--muted);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .empty-icon {
          opacity: 0.3;
          margin-bottom: 12px;
        }

        .notification-empty p,
        .notification-loading p {
          margin: 0;
          font-size: 14px;
        }

        .notification-item {
          display: flex;
          gap: 12px;
          padding: 16px 20px;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-item:hover {
          background: var(--muted);
        }

        .notification-item.unread {
          background: var(--muted);
        }

        .notification-icon {
          font-size: 24px;
          line-height: 1;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .notification-message {
          font-size: 13px;
          color: var(--muted-foreground);
          margin-bottom: 6px;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .notification-time {
          font-size: 12px;
          color: var(--muted-foreground);
          opacity: 0.7;
        }

        .notification-unread-indicator {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .notification-footer {
          padding: 12px 20px;
          border-top: 1px solid var(--border);
        }

        .view-all-button {
          width: 100%;
          padding: 10px;
          background: transparent;
          color: var(--primary);
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-all-button:hover {
          background: var(--muted);
        }

        @media (max-width: 640px) {
          .notification-dropdown {
            width: calc(100vw - 32px);
            max-width: 380px;
          }
        }
      `}</style>
    </div>
  )
}
