import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple authentication middleware
// In production, this would check session cookies or JWT tokens
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // Check for auth cookie (placeholder - will be implemented with NextAuth)
    const isAuthenticated = request.cookies.get('admin-session')?.value

    if (!isAuthenticated) {
      // Redirect to sign in page with return URL
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',  // Protect all admin routes
  ],
}
