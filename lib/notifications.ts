import { prisma } from '@/lib/db'
import { NotificationType } from '@prisma/client'

interface CreateNotificationParams {
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
}

/**
 * Create a notification for a user
 * Use this helper to ensure consistent notification creation across the app
 */
export async function createNotification({
  userId,
  type,
  title,
  message,
  link
}: CreateNotificationParams) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
        read: false,
      }
    })
    return { success: true, notification }
  } catch (error) {
    console.error('Failed to create notification:', error)
    return { success: false, error }
  }
}

/**
 * Get unread notification count for a user
 */
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    return await prisma.notification.count({
      where: {
        userId,
        read: false
      }
    })
  } catch (error) {
    console.error('Failed to get unread count:', error)
    return 0
  }
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string, userId: string) {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
        userId, // Ensure user owns the notification
      },
      data: {
        read: true
      }
    })
    return { success: true, notification }
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
    return { success: false, error }
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllAsRead(userId: string) {
  try {
    const result = await prisma.notification.updateMany({
      where: {
        userId,
        read: false
      },
      data: {
        read: true
      }
    })
    return { success: true, count: result.count }
  } catch (error) {
    console.error('Failed to mark all as read:', error)
    return { success: false, error }
  }
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string, userId: string) {
  try {
    await prisma.notification.delete({
      where: {
        id: notificationId,
        userId, // Ensure user owns the notification
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to delete notification:', error)
    return { success: false, error }
  }
}

/**
 * Get notification icon based on type
 */
export function getNotificationIcon(type: NotificationType): string {
  switch (type) {
    case 'PRODUCT_APPROVED':
      return '🎉'
    case 'ARTICLE_PUBLISHED':
      return '📝'
    case 'COMMENT_REPLY':
      return '💬'
    case 'FORUM_REPLY':
      return '🗣️'
    case 'NEW_FOLLOWER':
      return '👤'
    case 'BADGE_EARNED':
      return '🏆'
    case 'PROJECT_INVITE':
      return '📋'
    case 'NEW_MESSAGE':
      return '✉️'
    case 'SYSTEM':
    default:
      return '🔔'
  }
}
