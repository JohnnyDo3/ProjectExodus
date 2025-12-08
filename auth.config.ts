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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // JWT callback - runs on every request in middleware
    // This MUST be here for the middleware to see the role
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    // Session callback - makes role available in session
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
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
