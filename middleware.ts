import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',      // Protect all admin routes
    '/auth/:path*',       // Handle auth route redirects
    '/profile/:path*',    // Protect user profile routes
  ],
}
