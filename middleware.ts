import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  // Protected admin routes
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')

  // Public authentication routes
  const isAuthRoute = nextUrl.pathname.startsWith('/auth/')

  // If trying to access admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      // Redirect to sign in with callback URL
      const signInUrl = new URL('/auth/signin', nextUrl.origin)
      signInUrl.searchParams.set('callbackUrl', nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Check if user has admin role
    const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN'
    if (!isAdmin) {
      // Redirect to home if not admin
      return NextResponse.redirect(new URL('/', nextUrl.origin))
    }
  }

  // If logged in and trying to access auth routes, redirect to home
  if (isLoggedIn && isAuthRoute && !nextUrl.pathname.includes('/signout')) {
    return NextResponse.redirect(new URL('/', nextUrl.origin))
  }

  return NextResponse.next()
})

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',      // Protect all admin routes
    '/auth/:path*',       // Handle auth route redirects
    '/profile/:path*',    // Protect user profile routes
  ],
}
