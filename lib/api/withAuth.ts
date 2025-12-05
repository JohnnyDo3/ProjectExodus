import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"
import type { Session } from "next-auth"

/**
 * Authentication options for the withAuth wrapper
 */
export type AuthOptions = {
  /**
   * Required roles for accessing the route
   * User must have at least one of these roles
   */
  roles?: string[]

  /**
   * Field name to check for resource ownership
   * If provided, the handler will receive the request body/params
   * and should implement ownership check logic
   */
  ownerField?: string
}

/**
 * Handler function type with authenticated session
 */
type AuthenticatedHandler<T = any> = (
  req: NextRequest,
  session: Session,
  context?: T
) => Promise<NextResponse>

/**
 * Error response helper
 */
function errorResponse(message: string, status: number) {
  return NextResponse.json(
    {
      error: message,
      status,
    },
    { status }
  )
}

/**
 * Higher-order function that wraps API route handlers with authentication
 *
 * @param handler - The API route handler to wrap
 * @param options - Authentication options (roles, ownerField)
 * @returns Wrapped handler with authentication checks
 *
 * @example
 * // Basic authentication
 * export const GET = withAuth(async (req, session) => {
 *   return NextResponse.json({ userId: session.user.id })
 * })
 *
 * @example
 * // Role-based authentication
 * export const DELETE = withAuth(async (req, session) => {
 *   // Only ADMIN can access
 *   return NextResponse.json({ message: "Deleted" })
 * }, { roles: ['ADMIN'] })
 *
 * @example
 * // Multiple roles
 * export const PUT = withAuth(async (req, session) => {
 *   return NextResponse.json({ message: "Updated" })
 * }, { roles: ['ADMIN', 'EDITOR'] })
 */
export function withAuth<T = any>(
  handler: AuthenticatedHandler<T>,
  options?: AuthOptions
) {
  return async (req: NextRequest, context?: T): Promise<NextResponse> => {
    // Get session
    const session = await auth()

    // Check if user is authenticated
    if (!session || !session.user) {
      return errorResponse("Unauthorized - Please sign in", 401)
    }

    // Check role-based authorization if roles are specified
    if (options?.roles && options.roles.length > 0) {
      const userRole = session.user.role

      if (!userRole || !options.roles.includes(userRole)) {
        return errorResponse(
          `Forbidden - Required role: ${options.roles.join(" or ")}`,
          403
        )
      }
    }

    // If ownerField is specified, note it in the response (ownership check is delegated to handler)
    // This is because we need the resource data to compare ownership,
    // which the handler has access to via params/body
    if (options?.ownerField) {
      // The handler is responsible for checking if session.user.id matches the resource's ownerField
      // Example in handler:
      // const resource = await prisma.post.findUnique({ where: { id: params.id } })
      // if (resource.userId !== session.user.id && session.user.role !== 'ADMIN') {
      //   return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      // }
    }

    // Call the actual handler with the session
    return handler(req, session, context)
  }
}

/**
 * Helper function to check if a user owns a resource
 * Use this in your handler when using ownerField option
 *
 * @param session - The user session
 * @param resourceOwnerId - The ID of the resource owner
 * @returns boolean - true if user owns the resource or is an admin
 *
 * @example
 * export const DELETE = withAuth(async (req, session, { params }) => {
 *   const post = await prisma.post.findUnique({ where: { id: params.id } })
 *
 *   if (!post) {
 *     return NextResponse.json({ error: "Not found" }, { status: 404 })
 *   }
 *
 *   if (!checkOwnership(session, post.userId)) {
 *     return NextResponse.json({ error: "Forbidden" }, { status: 403 })
 *   }
 *
 *   await prisma.post.delete({ where: { id: params.id } })
 *   return NextResponse.json({ message: "Deleted" })
 * }, { ownerField: 'userId' })
 */
export function checkOwnership(
  session: Session,
  resourceOwnerId: string
): boolean {
  // Admins can access any resource
  if (session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") {
    return true
  }

  // Check if user owns the resource
  return session.user.id === resourceOwnerId
}
