/**
 * Mind Map Permission Management
 *
 * Handles authorization and permission checks for mind map operations.
 */

import { prisma } from '@/lib/db'
import type { Permission } from '@/lib/types/mindmap'
import { ForbiddenError, NotFoundError } from '@/lib/types/mindmap'

// Permission hierarchy
const PERMISSION_LEVELS: Record<Permission, number> = {
  VIEW: 1,
  COMMENT: 2,
  EDIT: 3,
  ADMIN: 4
}

/**
 * Check if a user has permission to access a mind map
 */
export async function checkMindMapAccess(
  mindMapId: string,
  userId: string,
  requiredPermission: Permission = 'VIEW'
): Promise<boolean> {
  const mindMap = await prisma.mindMap.findUnique({
    where: { id: mindMapId },
    include: {
      contributors: {
        where: { userId }
      },
      project: {
        include: {
          members: {
            where: { userId }
          }
        }
      }
    }
  })

  if (!mindMap) {
    throw new NotFoundError('Mind map')
  }

  // Public mind maps are viewable by anyone
  if (mindMap.isPublic && requiredPermission === 'VIEW') {
    return true
  }

  // Check if user is the creator
  if (mindMap.creatorId === userId) {
    return true
  }

  // Check contributor permissions
  const contributor = mindMap.contributors[0]
  if (contributor) {
    const hasPermission = PERMISSION_LEVELS[contributor.permission as Permission] >= PERMISSION_LEVELS[requiredPermission]
    return hasPermission
  }

  // Check if user is a project member (gets VIEW permission)
  if (mindMap.project.members.length > 0) {
    return PERMISSION_LEVELS['VIEW'] >= PERMISSION_LEVELS[requiredPermission]
  }

  return false
}

/**
 * Assert that a user has permission, throw error if not
 */
export async function assertMindMapAccess(
  mindMapId: string,
  userId: string,
  requiredPermission: Permission = 'VIEW'
): Promise<void> {
  const hasAccess = await checkMindMapAccess(mindMapId, userId, requiredPermission)
  if (!hasAccess) {
    throw new ForbiddenError(`You don't have ${requiredPermission} permission for this mind map`)
  }
}

/**
 * Get user's permission level for a mind map
 */
export async function getUserPermission(
  mindMapId: string,
  userId: string
): Promise<Permission | null> {
  const mindMap = await prisma.mindMap.findUnique({
    where: { id: mindMapId },
    include: {
      contributors: {
        where: { userId }
      },
      project: {
        include: {
          members: {
            where: { userId }
          }
        }
      }
    }
  })

  if (!mindMap) {
    return null
  }

  // Creator has ADMIN permission
  if (mindMap.creatorId === userId) {
    return 'ADMIN'
  }

  // Check contributor permissions
  const contributor = mindMap.contributors[0]
  if (contributor) {
    return contributor.permission
  }

  // Project members get VIEW permission
  if (mindMap.project.members.length > 0) {
    return 'VIEW'
  }

  // Public mind maps are viewable
  if (mindMap.isPublic) {
    return 'VIEW'
  }

  return null
}

/**
 * Check if a user can perform a specific action
 */
export async function canPerformAction(
  mindMapId: string,
  userId: string,
  action: 'view' | 'comment' | 'edit' | 'delete' | 'manage_contributors'
): Promise<boolean> {
  const permission = await getUserPermission(mindMapId, userId)

  if (!permission) {
    return false
  }

  const actionPermissions: Record<typeof action, Permission> = {
    view: 'VIEW',
    comment: 'COMMENT',
    edit: 'EDIT',
    delete: 'ADMIN',
    manage_contributors: 'ADMIN'
  }

  const requiredLevel = PERMISSION_LEVELS[actionPermissions[action]]
  const userLevel = PERMISSION_LEVELS[permission]

  return userLevel >= requiredLevel
}

/**
 * Get mind map with permission check
 */
export async function getMindMapWithPermission(
  mindMapId: string,
  userId: string,
  requiredPermission: Permission = 'VIEW'
) {
  await assertMindMapAccess(mindMapId, userId, requiredPermission)

  const mindMap = await prisma.mindMap.findUnique({
    where: { id: mindMapId },
    include: {
      project: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      creator: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      lastEditedBy: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  })

  return mindMap
}

/**
 * Update contributor activity stats
 */
export async function updateContributorActivity(
  mindMapId: string,
  userId: string,
  activity: {
    nodesCreated?: number
    nodesEdited?: number
    connectionsCreated?: number
  }
) {
  const contributor = await prisma.mindMapContributor.findUnique({
    where: {
      mindMapId_userId: {
        mindMapId,
        userId
      }
    }
  })

  if (contributor) {
    await prisma.mindMapContributor.update({
      where: {
        mindMapId_userId: {
          mindMapId,
          userId
        }
      },
      data: {
        nodesCreated: contributor.nodesCreated + (activity.nodesCreated || 0),
        nodesEdited: contributor.nodesEdited + (activity.nodesEdited || 0),
        connectionsCreated: contributor.connectionsCreated + (activity.connectionsCreated || 0),
        lastActiveAt: new Date()
      }
    })
  }
}

/**
 * Log activity to audit trail
 */
export async function logActivity(
  mindMapId: string,
  userId: string,
  activityType: string,
  changes?: any,
  entityType?: string,
  entityId?: string
) {
  // Generate description from activity type
  const description = activityType.toLowerCase().replace(/_/g, ' ')

  await prisma.mindMapActivity.create({
    data: {
      mindMapId,
      userId,
      activityType,
      entityType,
      entityId,
      description,
      changes: changes || {}
    }
  })
}
