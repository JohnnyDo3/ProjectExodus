/**
 * Security utilities for the application
 */

export * from './rateLimit'
export * from './validation'
export * from './botDetection'

// Re-export commonly used functions
export {
  checkRateLimit,
  RATE_LIMITS,
  getClientIP,
} from './rateLimit'

export {
  sanitizeString,
  sanitizeForDatabase,
  validateURL,
  validateMeetingLink,
  isValidEmail,
  validateLength,
  detectSpamPatterns,
  isValidUUID,
  validateDate,
} from './validation'

export {
  detectBot,
  checkHoneypot,
  calculateRiskScore,
  generateChallengeToken,
  validateChallengeToken,
} from './botDetection'
