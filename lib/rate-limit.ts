import { NextRequest, NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 10 * 60 * 1000)

export interface RateLimitConfig {
  /**
   * Unique identifier for this rate limit (e.g., 'api', 'auth', 'upload')
   */
  id: string
  /**
   * Maximum number of requests allowed in the window
   */
  limit: number
  /**
   * Time window in seconds
   */
  windowSeconds: number
}

/**
 * Rate limiter using in-memory store
 * For production, consider using Redis or similar
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  // Get identifier (IP address or user ID)
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

  const key = `${config.id}:${ip}`
  const now = Date.now()
  const windowMs = config.windowSeconds * 1000

  if (!store[key] || store[key].resetTime < now) {
    // First request or window expired
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    }

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: store[key].resetTime,
    }
  }

  store[key].count++

  if (store[key].count > config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: store[key].resetTime,
    }
  }

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - store[key].count,
    reset: store[key].resetTime,
  }
}

/**
 * Helper to create rate limit response
 */
export function rateLimitResponse(resetTime: number): NextResponse {
  const resetDate = new Date(resetTime)

  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
    },
    {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
        'X-RateLimit-Reset': resetDate.toISOString(),
      },
    }
  )
}
