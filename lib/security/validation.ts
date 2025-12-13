/**
 * Input validation and sanitization utilities
 */

/**
 * Sanitize a string to prevent XSS attacks
 * Removes or escapes potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return ''

  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Escape HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove potential script injections
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .trim()
}

/**
 * Sanitize string for database storage (lighter sanitization)
 * Preserves most characters but removes dangerous ones
 */
export function sanitizeForDatabase(input: string): string {
  if (!input || typeof input !== 'string') return ''

  return input
    .replace(/\0/g, '') // Remove null bytes
    .trim()
}

/**
 * Validate and sanitize a URL
 * Returns null if URL is invalid or potentially malicious
 */
export function validateURL(url: string): string | null {
  if (!url || typeof url !== 'string') return null

  try {
    const parsed = new URL(url.trim())

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null
    }

    // Block localhost and private IPs in production
    const hostname = parsed.hostname.toLowerCase()
    const blockedPatterns = [
      /^localhost$/i,
      /^127\.\d+\.\d+\.\d+$/,
      /^10\.\d+\.\d+\.\d+$/,
      /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/,
      /^192\.168\.\d+\.\d+$/,
      /^0\.0\.0\.0$/,
      /^::1$/,
    ]

    if (process.env.NODE_ENV === 'production') {
      for (const pattern of blockedPatterns) {
        if (pattern.test(hostname)) {
          return null
        }
      }
    }

    return parsed.toString()
  } catch {
    return null
  }
}

/**
 * Validate a meeting link from known platforms
 */
export function validateMeetingLink(url: string): { valid: boolean; platform: string | null; url: string | null } {
  const validatedUrl = validateURL(url)
  if (!validatedUrl) {
    return { valid: false, platform: null, url: null }
  }

  try {
    const parsed = new URL(validatedUrl)
    const hostname = parsed.hostname.toLowerCase()

    // Known meeting platforms
    const platforms: Record<string, string[]> = {
      'zoom': ['zoom.us', 'us02web.zoom.us', 'us04web.zoom.us', 'us05web.zoom.us', 'us06web.zoom.us'],
      'google-meet': ['meet.google.com'],
      'teams': ['teams.microsoft.com', 'teams.live.com'],
      'webex': ['webex.com', 'meetingsamer.webex.com', 'meetingsemea.webex.com'],
      'discord': ['discord.com', 'discord.gg'],
      'jitsi': ['meet.jit.si', 'jitsi.org'],
      'whereby': ['whereby.com'],
      'around': ['around.co'],
    }

    for (const [platform, domains] of Object.entries(platforms)) {
      if (domains.some(domain => hostname === domain || hostname.endsWith('.' + domain))) {
        return { valid: true, platform, url: validatedUrl }
      }
    }

    // Allow other URLs but mark as unknown platform
    return { valid: true, platform: 'other', url: validatedUrl }
  } catch {
    return { valid: false, platform: null, url: null }
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim()) && email.length <= 254
}

/**
 * Validate content length
 */
export function validateLength(
  input: string,
  options: { min?: number; max?: number }
): { valid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Input is required' }
  }

  const length = input.trim().length

  if (options.min !== undefined && length < options.min) {
    return { valid: false, error: `Must be at least ${options.min} characters` }
  }

  if (options.max !== undefined && length > options.max) {
    return { valid: false, error: `Must be no more than ${options.max} characters` }
  }

  return { valid: true }
}

/**
 * Check for spam-like content patterns
 */
export function detectSpamPatterns(text: string): { isSpam: boolean; reasons: string[] } {
  if (!text || typeof text !== 'string') {
    return { isSpam: false, reasons: [] }
  }

  const reasons: string[] = []
  const lowered = text.toLowerCase()

  // Check for excessive caps
  const capsRatio = (text.match(/[A-Z]/g)?.length || 0) / text.length
  if (capsRatio > 0.7 && text.length > 20) {
    reasons.push('Excessive capital letters')
  }

  // Check for repeated characters
  if (/(.)\1{5,}/i.test(text)) {
    reasons.push('Repeated characters detected')
  }

  // Check for spam keywords
  const spamKeywords = [
    'buy now', 'click here', 'free money', 'winner', 'congratulations',
    'act now', 'limited time', 'no obligation', 'risk free',
  ]
  for (const keyword of spamKeywords) {
    if (lowered.includes(keyword)) {
      reasons.push(`Spam keyword: "${keyword}"`)
      break
    }
  }

  // Check for excessive links
  const linkCount = (text.match(/https?:\/\//gi) || []).length
  if (linkCount > 3) {
    reasons.push('Too many links')
  }

  return {
    isSpam: reasons.length >= 2, // Mark as spam if 2+ indicators
    reasons,
  }
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  if (!uuid || typeof uuid !== 'string') return false

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid.trim())
}

/**
 * Validate and parse a date string
 */
export function validateDate(dateString: string): { valid: boolean; date: Date | null; error?: string } {
  if (!dateString || typeof dateString !== 'string') {
    return { valid: false, date: null, error: 'Date is required' }
  }

  try {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return { valid: false, date: null, error: 'Invalid date format' }
    }

    // Check if date is reasonable (not before 2020 or after 2100)
    const year = date.getFullYear()
    if (year < 2020 || year > 2100) {
      return { valid: false, date: null, error: 'Date is out of valid range' }
    }

    return { valid: true, date }
  } catch {
    return { valid: false, date: null, error: 'Invalid date format' }
  }
}
