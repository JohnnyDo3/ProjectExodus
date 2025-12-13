/**
 * Simple in-memory rate limiter for API endpoints
 * For production, consider using Redis-based rate limiting
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store - in production, use Redis
const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number
  /** Time window in milliseconds */
  windowMs: number
  /** Optional custom key generator */
  keyGenerator?: (identifier: string, action: string) => string
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
}

/**
 * Check if a request should be rate limited
 * @param identifier - User ID or IP address
 * @param action - The action being rate limited (e.g., 'follow', 'create-event')
 * @param config - Rate limit configuration
 */
export function checkRateLimit(
  identifier: string,
  action: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = config.keyGenerator
    ? config.keyGenerator(identifier, action)
    : `${action}:${identifier}`

  const entry = rateLimitStore.get(key)

  // No existing entry or window expired - create new entry
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    }
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000),
    }
  }

  // Increment counter
  entry.count++
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  }
}

// Pre-configured rate limits for common actions
export const RATE_LIMITS = {
  // Follow/unfollow actions: 30 per minute
  follow: { maxRequests: 30, windowMs: 60 * 1000 },

  // Connection requests: 20 per hour
  connectionRequest: { maxRequests: 20, windowMs: 60 * 60 * 1000 },

  // Event creation: 5 per hour
  createEvent: { maxRequests: 5, windowMs: 60 * 60 * 1000 },

  // Event RSVP: 30 per minute
  eventRsvp: { maxRequests: 30, windowMs: 60 * 1000 },

  // Message sending: 60 per minute
  sendMessage: { maxRequests: 60, windowMs: 60 * 1000 },

  // API general: 100 per minute
  apiGeneral: { maxRequests: 100, windowMs: 60 * 1000 },

  // Registration: 3 per hour per IP
  registration: { maxRequests: 3, windowMs: 60 * 60 * 1000 },

  // Password reset: 5 per hour
  passwordReset: { maxRequests: 5, windowMs: 60 * 60 * 1000 },

  // Article creation: 10 per hour
  createArticle: { maxRequests: 10, windowMs: 60 * 60 * 1000 },

  // Comments: 30 per minute
  createComment: { maxRequests: 30, windowMs: 60 * 1000 },
} as const

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  return 'unknown'
}
