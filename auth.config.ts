import type { NextAuthConfig } from "next-auth"

// This config is used in middleware (Edge Runtime compatible)
// Do NOT import Prisma, bcrypt, or other Node.js-only modules here
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnAuth = nextUrl.pathname.startsWith('/auth')

      // Require authentication for admin routes
      if (isOnAdmin) {
        if (!isLoggedIn) return false // Redirect to login page

        // Check admin role (ADMIN, SUPER_ADMIN, or MODERATOR can access admin panel)
        const userRole = auth.user?.role
        const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN' || userRole === 'MODERATOR'
        return isAdmin
      }

      // Redirect authenticated users away from auth pages
      if (isLoggedIn && isOnAuth && !nextUrl.pathname.includes('/signout')) {
        return Response.redirect(new URL('/', nextUrl))
      }

      return true
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig
