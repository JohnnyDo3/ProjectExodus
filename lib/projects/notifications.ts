import { prisma } from '@/lib/db'

// Notification types
export type ProjectNotificationType =
  | 'NEW_DISCUSSION'
  | 'DISCUSSION_REPLY'
  | 'RESEARCH_POST'
  | 'RESEARCH_COMMENT'
  | 'WAIVER_APPROVED'
  | 'WAIVER_DENIED'
  | 'JOIN_REQUEST'
  | 'JOIN_APPROVED'
  | 'ROLE_CHANGED'
  | 'BADGE_EARNED'
  | 'SUBGROUP_ACTIVITY'
  | 'PROJECT_UPDATE'
  | 'MILESTONE_REACHED'

interface CreateNotificationParams {
  projectId: string
  userId: string
  type: ProjectNotificationType
  title: string
  message: string
  actionUrl?: string
  metadata?: Record<string, any>
}

/**
 * Create a notification for a user (respects opt-in preferences)
 */
export async function createProjectNotification({
  projectId,
  userId,
  type,
  title,
  message,
  actionUrl,
  metadata,
}: CreateNotificationParams): Promise<boolean> {
  try {
    // Check if user has opted in for this notification type
    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      select: {
        notificationPreferences: true,
      },
    })

    if (!membership) {
      return false // User is not a member
    }

    const prefs = membership.notificationPreferences as Record<string, boolean> | null

    // If preferences exist, check if this type is enabled
    // Default to enabled if no preferences set (opt-in by default for important notifications)
    const importantTypes: ProjectNotificationType[] = [
      'WAIVER_APPROVED',
      'WAIVER_DENIED',
      'JOIN_APPROVED',
      'ROLE_CHANGED',
      'BADGE_EARNED',
    ]

    if (prefs) {
      // Check specific preference
      const prefKey = type.toLowerCase()
      if (prefs[prefKey] === false) {
        return false // User has opted out
      }
    } else if (!importantTypes.includes(type)) {
      // No preferences set and not an important type - check global default
      // For now, allow all notifications by default
    }

    // Create the notification
    await prisma.projectNotification.create({
      data: {
        projectId,
        userId,
        type,
        title,
        message,
        actionUrl: actionUrl || null,
        metadata: metadata || {},
        read: false,
      },
    })

    return true
  } catch (error) {
    console.error('Error creating notification:', error)
    return false
  }
}

/**
 * Create notifications for all project members (bulk)
 */
export async function notifyProjectMembers({
  projectId,
  type,
  title,
  message,
  actionUrl,
  metadata,
  excludeUserId,
  roleFilter,
}: {
  projectId: string
  type: ProjectNotificationType
  title: string
  message: string
  actionUrl?: string
  metadata?: Record<string, any>
  excludeUserId?: string
  roleFilter?: ('CONTRIBUTOR' | 'MODERATOR' | 'ADMIN' | 'OWNER')[]
}): Promise<number> {
  try {
    // Get all members
    const whereClause: any = { projectId }

    if (roleFilter) {
      whereClause.role = { in: roleFilter }
    }

    const members = await prisma.projectMember.findMany({
      where: whereClause,
      select: {
        userId: true,
        notificationPreferences: true,
      },
    })

    let notifiedCount = 0

    for (const member of members) {
      if (excludeUserId && member.userId === excludeUserId) {
        continue
      }

      const success = await createProjectNotification({
        projectId,
        userId: member.userId,
        type,
        title,
        message,
        actionUrl,
        metadata,
      })

      if (success) {
        notifiedCount++
      }
    }

    return notifiedCount
  } catch (error) {
    console.error('Error notifying project members:', error)
    return 0
  }
}

/**
 * Create notifications for subgroup members
 */
export async function notifySubgroupMembers({
  subgroupId,
  type,
  title,
  message,
  actionUrl,
  metadata,
  excludeUserId,
}: {
  subgroupId: string
  type: ProjectNotificationType
  title: string
  message: string
  actionUrl?: string
  metadata?: Record<string, any>
  excludeUserId?: string
}): Promise<number> {
  try {
    const subgroup = await prisma.projectSubgroup.findUnique({
      where: { id: subgroupId },
      select: {
        projectId: true,
        members: {
          select: { userId: true },
        },
      },
    })

    if (!subgroup) {
      return 0
    }

    let notifiedCount = 0

    for (const member of subgroup.members) {
      if (excludeUserId && member.userId === excludeUserId) {
        continue
      }

      const success = await createProjectNotification({
        projectId: subgroup.projectId,
        userId: member.userId,
        type,
        title,
        message,
        actionUrl,
        metadata,
      })

      if (success) {
        notifiedCount++
      }
    }

    return notifiedCount
  } catch (error) {
    console.error('Error notifying subgroup members:', error)
    return 0
  }
}

/**
 * Update user's notification preferences
 */
export async function updateNotificationPreferences(
  projectId: string,
  userId: string,
  preferences: Record<string, boolean>
): Promise<boolean> {
  try {
    await prisma.projectMember.update({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      data: {
        notificationPreferences: preferences,
      },
    })

    return true
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    return false
  }
}

/**
 * Get available notification types for preferences UI
 */
export function getNotificationTypes(): {
  type: ProjectNotificationType
  label: string
  description: string
  defaultEnabled: boolean
}[] {
  return [
    {
      type: 'NEW_DISCUSSION',
      label: 'New Discussions',
      description: 'When a new discussion is posted in the project',
      defaultEnabled: true,
    },
    {
      type: 'DISCUSSION_REPLY',
      label: 'Discussion Replies',
      description: 'When someone replies to a discussion you\'re following',
      defaultEnabled: true,
    },
    {
      type: 'RESEARCH_POST',
      label: 'New Research',
      description: 'When new research is shared in the project',
      defaultEnabled: true,
    },
    {
      type: 'RESEARCH_COMMENT',
      label: 'Research Comments',
      description: 'When someone comments on research you posted',
      defaultEnabled: true,
    },
    {
      type: 'SUBGROUP_ACTIVITY',
      label: 'Subgroup Activity',
      description: 'Activity in subgroups you\'re a member of',
      defaultEnabled: true,
    },
    {
      type: 'PROJECT_UPDATE',
      label: 'Project Updates',
      description: 'Important updates from project admins',
      defaultEnabled: true,
    },
    {
      type: 'MILESTONE_REACHED',
      label: 'Milestones',
      description: 'When project milestones are reached',
      defaultEnabled: true,
    },
    // These are always enabled (important notifications)
    {
      type: 'WAIVER_APPROVED',
      label: 'Waiver Decisions',
      description: 'When your waiver request is reviewed',
      defaultEnabled: true,
    },
    {
      type: 'JOIN_APPROVED',
      label: 'Join Decisions',
      description: 'When your join request is reviewed',
      defaultEnabled: true,
    },
    {
      type: 'ROLE_CHANGED',
      label: 'Role Changes',
      description: 'When your role in the project changes',
      defaultEnabled: true,
    },
    {
      type: 'BADGE_EARNED',
      label: 'Badge Notifications',
      description: 'When you earn a new badge',
      defaultEnabled: true,
    },
  ]
}
