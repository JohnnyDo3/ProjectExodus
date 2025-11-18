import { auth } from "@/auth"
import { redirect } from "next/navigation"

/**
 * Get the current session
 * Returns null if not authenticated
 */
export async function getSession() {
  return await auth()
}

/**
 * Get the current user
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user ?? null
}

/**
 * Require authentication
 * Redirects to sign-in page if not authenticated
 */
export async function requireAuth(redirectTo?: string) {
  const session = await getSession()

  if (!session) {
    const callbackUrl = redirectTo || '/auth/signin'
    redirect(callbackUrl)
  }

  return session
}

/**
 * Require specific role
 * Redirects to home if user doesn't have the required role
 */
export async function requireRole(role: string | string[]) {
  const session = await requireAuth()
  const userRole = session.user?.role

  const allowedRoles = Array.isArray(role) ? role : [role]

  if (!userRole || !allowedRoles.includes(userRole)) {
    redirect('/')
  }

  return session
}

/**
 * Require admin role
 * Redirects to home if user is not an admin
 */
export async function requireAdmin() {
  return await requireRole(['ADMIN', 'SUPER_ADMIN'])
}

/**
 * Check if user has role
 * Returns true if user has the specified role
 */
export async function hasRole(role: string | string[]) {
  const session = await getSession()
  const userRole = session?.user?.role

  if (!userRole) return false

  const allowedRoles = Array.isArray(role) ? role : [role]
  return allowedRoles.includes(userRole)
}

/**
 * Check if user is admin
 * Returns true if user is ADMIN or SUPER_ADMIN
 */
export async function isAdmin() {
  return await hasRole(['ADMIN', 'SUPER_ADMIN'])
}

/**
 * Check if user is authenticated
 * Returns true if user is logged in
 */
export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}
