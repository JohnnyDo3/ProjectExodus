/**
 * Bot detection utilities
 * Helps identify potentially automated/malicious requests
 */

/**
 * Known bot user agent patterns
 */
const BOT_PATTERNS = [
  /bot/i,
  /spider/i,
  /crawl/i,
  /slurp/i,
  /scrape/i,
  /fetch/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /python-urllib/i,
  /java\//i,
  /libwww/i,
  /httpunit/i,
  /nutch/i,
  /phpcrawl/i,
  /msnbot/i,
  /adscanner/i,
  /headlesschrome/i,
  /phantomjs/i,
  /slimerjs/i,
  /casperjs/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
]

/**
 * Legitimate bot patterns (search engines, etc.)
 */
const LEGITIMATE_BOTS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /slackbot/i,
  /twitterbot/i,
  /facebookexternalhit/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
]

export interface BotDetectionResult {
  isBot: boolean
  isLegitimateBot: boolean
  confidence: 'low' | 'medium' | 'high'
  reasons: string[]
}

/**
 * Analyze request headers for bot indicators
 */
export function detectBot(request: Request): BotDetectionResult {
  const reasons: string[] = []
  let botScore = 0

  const userAgent = request.headers.get('user-agent') || ''
  const acceptLanguage = request.headers.get('accept-language')
  const accept = request.headers.get('accept')
  const referer = request.headers.get('referer')
  const secFetchSite = request.headers.get('sec-fetch-site')
  const secFetchMode = request.headers.get('sec-fetch-mode')

  // Check user agent patterns
  for (const pattern of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      botScore += 3
      reasons.push('Bot pattern in user agent')
      break
    }
  }

  // Check for legitimate bots
  for (const pattern of LEGITIMATE_BOTS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isLegitimateBot: true,
        confidence: 'high',
        reasons: ['Legitimate bot detected'],
      }
    }
  }

  // Check for missing headers that browsers typically send
  if (!acceptLanguage) {
    botScore += 1
    reasons.push('Missing Accept-Language header')
  }

  if (!accept) {
    botScore += 1
    reasons.push('Missing Accept header')
  }

  // Empty or very short user agent
  if (!userAgent || userAgent.length < 20) {
    botScore += 2
    reasons.push('Missing or short user agent')
  }

  // Check for suspicious patterns
  if (userAgent.includes('HeadlessChrome') || userAgent.includes('Headless')) {
    botScore += 3
    reasons.push('Headless browser detected')
  }

  // No sec-fetch headers (modern browsers send these)
  if (!secFetchSite && !secFetchMode) {
    botScore += 1
    reasons.push('Missing Sec-Fetch headers')
  }

  // Determine confidence level
  let confidence: 'low' | 'medium' | 'high'
  if (botScore >= 5) {
    confidence = 'high'
  } else if (botScore >= 3) {
    confidence = 'medium'
  } else {
    confidence = 'low'
  }

  return {
    isBot: botScore >= 3,
    isLegitimateBot: false,
    confidence,
    reasons,
  }
}

/**
 * Check for rapid-fire requests (honeypot timing)
 * Returns true if the form was submitted too quickly (likely a bot)
 */
export function checkSubmitTiming(
  formLoadTime: number,
  submitTime: number,
  minTimeMs: number = 1500
): boolean {
  const timeDiff = submitTime - formLoadTime
  return timeDiff < minTimeMs
}

/**
 * Generate a honeypot field name
 * Returns a random-looking but consistent field name for forms
 */
export function getHoneypotFieldName(): string {
  // Use a consistent name so it can be checked on server
  return 'website_url_field'
}

/**
 * Check if honeypot field was filled (indicates bot)
 */
export function checkHoneypot(honeypotValue: string | undefined | null): boolean {
  // If the hidden field has any value, it's likely a bot
  return !!honeypotValue && honeypotValue.trim().length > 0
}

/**
 * Generate a simple challenge token
 * This can be used for lightweight bot protection
 */
export function generateChallengeToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return Buffer.from(`${timestamp}:${random}`).toString('base64')
}

/**
 * Validate a challenge token
 * Returns true if token is valid and not expired
 */
export function validateChallengeToken(token: string, maxAgeMs: number = 30 * 60 * 1000): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString()
    const [timestamp] = decoded.split(':')
    const tokenTime = parseInt(timestamp, 10)

    if (isNaN(tokenTime)) return false

    const now = Date.now()
    const age = now - tokenTime

    // Token must be at least 500ms old (too fast = bot) and not expired
    return age >= 500 && age <= maxAgeMs
  } catch {
    return false
  }
}

/**
 * Get a risk score for a request (0-100)
 * Higher score = more likely to be malicious
 */
export function calculateRiskScore(
  request: Request,
  options?: {
    hasValidSession?: boolean
    requestsInLastMinute?: number
    failedAttemptsInLastHour?: number
  }
): number {
  let score = 0

  // Bot detection
  const botResult = detectBot(request)
  if (botResult.isBot && !botResult.isLegitimateBot) {
    score += botResult.confidence === 'high' ? 40 : botResult.confidence === 'medium' ? 25 : 10
  }

  // No valid session
  if (options?.hasValidSession === false) {
    score += 10
  }

  // High request rate
  if (options?.requestsInLastMinute) {
    if (options.requestsInLastMinute > 50) score += 30
    else if (options.requestsInLastMinute > 20) score += 15
    else if (options.requestsInLastMinute > 10) score += 5
  }

  // Failed attempts
  if (options?.failedAttemptsInLastHour) {
    if (options.failedAttemptsInLastHour > 10) score += 25
    else if (options.failedAttemptsInLastHour > 5) score += 15
    else if (options.failedAttemptsInLastHour > 2) score += 5
  }

  return Math.min(score, 100)
}
