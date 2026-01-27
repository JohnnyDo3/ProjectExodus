import { prisma } from '@/lib/db'

// Temporary type definition until Prisma client is regenerated
export enum UserRole {
  USER = 'USER',
  EDITOR = 'EDITOR',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

/**
 * All available permissions in the system
 */
export const PERMISSIONS = {
  // User Management
  'users.view': 'View user list and details',
  'users.edit': 'Edit user profiles and roles',
  'users.ban': 'Ban/suspend users',
  'users.delete': 'Delete user accounts',

  // Content Management - Products
  'products.view': 'View all products',
  'products.create': 'Create new products',
  'products.approve': 'Approve/reject products',
  'products.edit': 'Edit any product',
  'products.delete': 'Delete products',

  // Content Management - Articles
  'articles.view': 'View all articles',
  'articles.create': 'Create articles',
  'articles.publish': 'Publish/unpublish articles',
  'articles.edit': 'Edit any article',
  'articles.delete': 'Delete articles',

  // Content Management - Categories/Tags/Vendors
  'categories.manage': 'Create, edit, delete categories',
  'tags.manage': 'Create, edit, delete tags',
  'vendors.manage': 'Create, edit, delete vendors',

  // Moderation
  'reports.view': 'View reports',
  'reports.resolve': 'Resolve/dismiss reports',
  'comments.delete': 'Delete any comment',
  'content.flag': 'Flag content for review',

  // System Administration
  'audit.view': 'View audit logs',
  'settings.view': 'View system settings',
  'settings.edit': 'Change system settings',
  'permissions.view': 'View role permissions',
  'permissions.manage': 'Manage role permissions',
  'alerts.manage': 'Manage admin alerts',
  'analytics.view': 'View analytics dashboard',
  'export.data': 'Export data (CSV/PDF)',
} as const

export type Permission = keyof typeof PERMISSIONS

/**
 * Default permissions for each role
 * These are used when no custom permissions are set
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  USER: [],
  EDITOR: [
    'articles.view',
    'articles.create',
    'articles.edit',
    'products.view',
    'products.create',
    'tags.manage',
  ],
  MODERATOR: [
    'users.view',
    'reports.view',
    'reports.resolve',
    'comments.delete',
    'content.flag',
    'products.view',
    'articles.view',
    'audit.view',
  ],
  ADMIN: [
    'users.view',
    'users.edit',
    'users.ban',
    'products.view',
    'products.create',
    'products.approve',
    'products.edit',
    'products.delete',
    'articles.view',
    'articles.create',
    'articles.publish',
    'articles.edit',
    'articles.delete',
    'categories.manage',
    'tags.manage',
    'vendors.manage',
    'reports.view',
    'reports.resolve',
    'comments.delete',
    'content.flag',
    'audit.view',
    'settings.view',
    'settings.edit',
    'permissions.view',
    'alerts.manage',
    'analytics.view',
    'export.data',
  ],
  SUPER_ADMIN: Object.keys(PERMISSIONS) as Permission[],
}

/**
 * Check if a role has a specific permission
 */
export async function hasPermission(
  userId: string,
  permission: Permission
): Promise<boolean> {
  try {
    // Get user's role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user) return false

    // SUPER_ADMIN has all permissions
    if (user.role === UserRole.SUPER_ADMIN) return true

    // Check for custom permission override
    const customPermission = await prisma.rolePermission.findUnique({
      where: {
        role_permission: {
          role: user.role,
          permission
        }
      }
    })

    // If custom permission exists, use it
    if (customPermission) return true

    // Fall back to default permissions
    return DEFAULT_ROLE_PERMISSIONS[user.role as UserRole]?.includes(permission) ?? false
  } catch (error) {
    console.error('Permission check failed:', error)
    return false
  }
}

/**
 * Check multiple permissions at once
 */
export async function hasPermissions(
  userId: string,
  permissions: Permission[]
): Promise<Record<Permission, boolean>> {
  const results: Record<string, boolean> = {}

  for (const permission of permissions) {
    results[permission] = await hasPermission(userId, permission)
  }

  return results as Record<Permission, boolean>
}

/**
 * Check if user has any of the specified permissions
 */
export async function hasAnyPermission(
  userId: string,
  permissions: Permission[]
): Promise<boolean> {
  for (const permission of permissions) {
    if (await hasPermission(userId, permission)) {
      return true
    }
  }
  return false
}

/**
 * Check if user has all of the specified permissions
 */
export async function hasAllPermissions(
  userId: string,
  permissions: Permission[]
): Promise<boolean> {
  for (const permission of permissions) {
    if (!(await hasPermission(userId, permission))) {
      return false
    }
  }
  return true
}

/**
 * Get all permissions for a role
 */
export async function getRolePermissions(role: UserRole): Promise<Permission[]> {
  try {
    // Get custom permissions
    const customPermissions = await prisma.rolePermission.findMany({
      where: { role },
      select: { permission: true }
    })

    if (customPermissions.length > 0) {
      return customPermissions.map((p: { permission: string }) => p.permission as Permission)
    }

    // Return default permissions
    return DEFAULT_ROLE_PERMISSIONS[role] || []
  } catch (error) {
    console.error('Failed to get role permissions:', error)
    return DEFAULT_ROLE_PERMISSIONS[role] || []
  }
}

/**
 * Set permissions for a role (replaces all existing permissions)
 */
export async function setRolePermissions(
  role: UserRole,
  permissions: Permission[]
): Promise<void> {
  // Don't allow modifying SUPER_ADMIN permissions
  if (role === UserRole.SUPER_ADMIN) {
    throw new Error('Cannot modify SUPER_ADMIN permissions')
  }

  await prisma.$transaction(async (tx: any) => {
    // Delete existing custom permissions for this role
    await tx.rolePermission.deleteMany({
      where: { role }
    })

    // Create new permissions
    if (permissions.length > 0) {
      await tx.rolePermission.createMany({
        data: permissions.map(permission => ({
          role,
          permission
        }))
      })
    }
  })
}

/**
 * Add a permission to a role
 */
export async function addRolePermission(
  role: UserRole,
  permission: Permission
): Promise<void> {
  if (role === UserRole.SUPER_ADMIN) return // SUPER_ADMIN already has all permissions

  await prisma.rolePermission.upsert({
    where: {
      role_permission: { role, permission }
    },
    create: { role, permission },
    update: {}
  })
}

/**
 * Remove a permission from a role
 */
export async function removeRolePermission(
  role: UserRole,
  permission: Permission
): Promise<void> {
  if (role === UserRole.SUPER_ADMIN) return

  await prisma.rolePermission.deleteMany({
    where: { role, permission }
  })
}

/**
 * Check if user is at least a certain role level
 */
export function isRoleAtLeast(userRole: UserRole, minimumRole: UserRole): boolean {
  const roleHierarchy: UserRole[] = [UserRole.USER, UserRole.EDITOR, UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPER_ADMIN]
  const userLevel = roleHierarchy.indexOf(userRole)
  const minLevel = roleHierarchy.indexOf(minimumRole)
  return userLevel >= minLevel
}

/**
 * Helper to require a permission in an API route
 */
export async function requirePermission(
  userId: string,
  permission: Permission
): Promise<{ authorized: boolean; error?: string }> {
  const hasAccess = await hasPermission(userId, permission)

  if (!hasAccess) {
    return {
      authorized: false,
      error: `Permission denied: ${permission}`
    }
  }

  return { authorized: true }
}
