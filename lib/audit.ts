import { prisma } from '@/lib/db'
import { AdminAction, AdminAlertType, AlertPriority } from '@prisma/client'
import { pusherServer } from '@/lib/pusher'

interface LogAdminActionParams {
  userId: string
  action: AdminAction
  description: string
  targetType?: 'user' | 'product' | 'article' | 'report' | 'setting' | 'comment' | 'other'
  targetId?: string
  metadata?: Record<string, any>
  ipAddress?: string
}

/**
 * Log an admin action to the audit trail
 * Also triggers real-time notification to admin dashboard
 */
export async function logAdminAction({
  userId,
  action,
  description,
  targetType,
  targetId,
  metadata = {},
  ipAddress,
}: LogAdminActionParams) {
  try {
    // Create audit log entry
    const log = await prisma.adminLog.create({
      data: {
        userId,
        action,
        description,
        metadata: {
          ...metadata,
          targetType,
          targetId,
          ipAddress,
          timestamp: new Date().toISOString(),
        },
      },
      include: {
        user: {
          select: { id: true, name: true, image: true }
        }
      }
    })

    // Trigger real-time update to admin dashboard
    try {
      await pusherServer.trigger('private-admin', 'admin-action', {
        action: log.action,
        adminName: log.user?.name || 'Unknown',
        targetType: targetType || 'other',
        targetId: targetId || '',
        description: log.description,
        createdAt: log.createdAt.toISOString(),
      })
    } catch (pusherError) {
      console.error('Failed to trigger Pusher event:', pusherError)
    }

    return { success: true, log }
  } catch (error) {
    console.error('Failed to log admin action:', error)
    return { success: false, error }
  }
}

/**
 * Create an admin alert
 */
export async function createAdminAlert({
  type,
  priority = 'MEDIUM',
  title,
  message,
  link,
  userId, // null = all admins
  metadata = {},
}: {
  type: AdminAlertType
  priority?: AlertPriority
  title: string
  message: string
  link?: string
  userId?: string | null
  metadata?: Record<string, any>
}) {
  try {
    const alert = await prisma.adminAlert.create({
      data: {
        type,
        priority,
        title,
        message,
        link,
        userId,
        metadata,
      }
    })

    // Trigger real-time notification to all admins
    try {
      await pusherServer.trigger('private-admin', 'alert', {
        id: alert.id,
        type: alert.type,
        priority: alert.priority,
        title: alert.title,
        message: alert.message,
        link: alert.link,
        createdAt: alert.createdAt.toISOString(),
      })
    } catch (pusherError) {
      console.error('Failed to trigger Pusher alert:', pusherError)
    }

    return { success: true, alert }
  } catch (error) {
    console.error('Failed to create admin alert:', error)
    return { success: false, error }
  }
}

/**
 * Log user ban action
 */
export async function logUserBan(
  adminId: string,
  targetUserId: string,
  reason: string,
  permanent: boolean,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'USER_BANNED',
    description: `Banned user ${targetUserId}${permanent ? ' permanently' : ''}`,
    targetType: 'user',
    targetId: targetUserId,
    metadata: { reason, permanent },
    ipAddress,
  })

  // Create admin alert
  await createAdminAlert({
    type: 'USER_BANNED',
    priority: 'MEDIUM',
    title: 'User Banned',
    message: `A user was ${permanent ? 'permanently ' : ''}banned: ${reason}`,
    link: `/admin/users?id=${targetUserId}`,
  })
}

/**
 * Log user unban action
 */
export async function logUserUnban(
  adminId: string,
  targetUserId: string,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'USER_UNBANNED',
    description: `Unbanned user ${targetUserId}`,
    targetType: 'user',
    targetId: targetUserId,
    ipAddress,
  })
}

/**
 * Log product approval
 */
export async function logProductApproval(
  adminId: string,
  productId: string,
  productName: string,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'PRODUCT_APPROVED',
    description: `Approved product: ${productName}`,
    targetType: 'product',
    targetId: productId,
    ipAddress,
  })
}

/**
 * Log product rejection
 */
export async function logProductRejection(
  adminId: string,
  productId: string,
  productName: string,
  reason: string,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'PRODUCT_REJECTED',
    description: `Rejected product: ${productName}`,
    targetType: 'product',
    targetId: productId,
    metadata: { reason },
    ipAddress,
  })
}

/**
 * Log article publish
 */
export async function logArticlePublish(
  adminId: string,
  articleId: string,
  articleTitle: string,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'ARTICLE_PUBLISHED',
    description: `Published article: ${articleTitle}`,
    targetType: 'article',
    targetId: articleId,
    ipAddress,
  })
}

/**
 * Log article unpublish
 */
export async function logArticleUnpublish(
  adminId: string,
  articleId: string,
  articleTitle: string,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'ARTICLE_UNPUBLISHED',
    description: `Unpublished article: ${articleTitle}`,
    targetType: 'article',
    targetId: articleId,
    ipAddress,
  })
}

/**
 * Log content deletion
 */
export async function logContentDeletion(
  adminId: string,
  contentType: string,
  contentId: string,
  contentTitle: string,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'CONTENT_DELETED',
    description: `Deleted ${contentType}: ${contentTitle}`,
    targetType: contentType as any,
    targetId: contentId,
    ipAddress,
  })
}

/**
 * Log report resolution
 */
export async function logReportResolution(
  adminId: string,
  reportId: string,
  action: 'resolved' | 'dismissed',
  notes?: string,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'REPORT_RESOLVED',
    description: `${action === 'resolved' ? 'Resolved' : 'Dismissed'} report`,
    targetType: 'report',
    targetId: reportId,
    metadata: { action, notes },
    ipAddress,
  })
}

/**
 * Log settings change
 */
export async function logSettingsChange(
  adminId: string,
  settingKey: string,
  oldValue: any,
  newValue: any,
  ipAddress?: string
) {
  await logAdminAction({
    userId: adminId,
    action: 'SETTINGS_CHANGED',
    description: `Changed setting: ${settingKey}`,
    targetType: 'setting',
    targetId: settingKey,
    metadata: { oldValue, newValue },
    ipAddress,
  })
}

/**
 * Get recent audit logs
 */
export async function getRecentAuditLogs(limit = 50, offset = 0) {
  return prisma.adminLog.findMany({
    take: limit,
    skip: offset,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, name: true, image: true, email: true }
      }
    }
  })
}

/**
 * Get audit logs for a specific target
 */
export async function getAuditLogsForTarget(targetId: string, targetType: string) {
  return prisma.adminLog.findMany({
    where: {
      metadata: {
        path: ['targetId'],
        equals: targetId
      }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, name: true, image: true }
      }
    }
  })
}
