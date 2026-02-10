/**
 * Content Security Module for Article Uploads
 *
 * Validates, sanitizes, and secures user-submitted content
 * to prevent XSS, injection attacks, and abuse.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

export const CONTENT_LIMITS = {
  // Word count limits
  MIN_WORDS: 50,           // Minimum words for an article
  MAX_WORDS: 50000,        // Maximum words (roughly 100 pages)

  // Character limits
  MAX_TITLE_LENGTH: 200,
  MAX_EXCERPT_LENGTH: 500,
  MAX_CONTENT_LENGTH: 500000,  // ~500KB of text
  MAX_REFERENCE_TITLE: 300,
  MAX_REFERENCE_URL: 2000,
  MAX_REFERENCES: 100,

  // Rate limiting hints (implement in API)
  MAX_ARTICLES_PER_DAY: 10,
  MAX_DRAFTS: 20,
} as const

// =============================================================================
// DANGEROUS PATTERNS - Block these outright
// =============================================================================

const DANGEROUS_PATTERNS = [
  // Script injection
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /data:text\/html/gi,

  // Event handlers
  /\bon\w+\s*=/gi,  // onclick=, onerror=, onload=, etc.

  // Expression injection
  /expression\s*\(/gi,
  /url\s*\(\s*['"]?\s*javascript:/gi,

  // Import/include attacks (CSS)
  /@import\s+url/gi,

  // PHP/Server-side injection
  /<\?php/gi,
  /<\?=/gi,
  /<%/gi,

  // Null bytes
  /\x00/g,
]

const SUSPICIOUS_PATTERNS = [
  // Excessive special characters (potential obfuscation)
  /&#x?[0-9a-f]+;/gi,  // HTML entities used excessively

  // Base64 encoded content (could hide malicious code)
  /base64,/gi,

  // Iframe embedding
  /<iframe/gi,

  // Object/embed tags
  /<object/gi,
  /<embed/gi,

  // Form elements (phishing risk)
  /<form/gi,
  /<input/gi,

  // Meta refresh (redirects)
  /<meta[^>]+http-equiv\s*=\s*['"]?refresh/gi,
]

// =============================================================================
// ALLOWED HTML TAGS (whitelist approach)
// =============================================================================

const ALLOWED_TAGS = new Set([
  // Structure
  'p', 'div', 'span', 'br', 'hr',

  // Headings
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',

  // Text formatting
  'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del', 'ins',
  'sub', 'sup', 'mark', 'small', 'big',

  // Lists
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',

  // Links (href will be validated)
  'a',

  // Quotes
  'blockquote', 'q', 'cite',

  // Code
  'pre', 'code', 'kbd', 'samp', 'var',

  // Tables
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',

  // Media (src will be validated)
  'img', 'figure', 'figcaption',

  // Semantic
  'article', 'section', 'aside', 'header', 'footer', 'main', 'nav',
  'address', 'time', 'abbr', 'dfn', 'details', 'summary',
])

const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  'a': new Set(['href', 'title', 'target', 'rel']),
  'img': new Set(['src', 'alt', 'title', 'width', 'height']),
  'td': new Set(['colspan', 'rowspan']),
  'th': new Set(['colspan', 'rowspan', 'scope']),
  'time': new Set(['datetime']),
  'abbr': new Set(['title']),
  'blockquote': new Set(['cite']),
  'q': new Set(['cite']),
  // Global attributes allowed on all elements
  '*': new Set(['class', 'id', 'lang', 'dir']),
}

// =============================================================================
// VALIDATION RESULT TYPE
// =============================================================================

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  sanitizedContent?: string
  stats: {
    wordCount: number
    characterCount: number
    referenceCount: number
    suspiciousPatternsFound: number
  }
}

// =============================================================================
// CORE SECURITY FUNCTIONS
// =============================================================================

/**
 * Check for dangerous patterns that indicate malicious intent
 */
function containsDangerousPatterns(content: string): string[] {
  const found: string[] = []

  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(content)) {
      found.push(`Dangerous pattern detected: ${pattern.source.slice(0, 30)}...`)
      // Reset lastIndex for global patterns
      pattern.lastIndex = 0
    }
  }

  return found
}

/**
 * Check for suspicious patterns that may need review
 */
function containsSuspiciousPatterns(content: string): string[] {
  const found: string[] = []

  for (const pattern of SUSPICIOUS_PATTERNS) {
    const matches = content.match(pattern)
    if (matches && matches.length > 0) {
      found.push(`Suspicious pattern: ${pattern.source.slice(0, 20)}... (${matches.length} occurrences)`)
    }
  }

  return found
}

/**
 * Validate URL for safe protocols
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    // Only allow safe protocols
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol)
  } catch {
    // Relative URLs are OK
    return url.startsWith('/') || url.startsWith('#') || url.startsWith('.')
  }
}

/**
 * Sanitize HTML content - remove dangerous tags and attributes
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''

  // First, remove all script tags and their contents
  let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers
  cleaned = cleaned.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
  cleaned = cleaned.replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '')

  // Remove javascript: and other dangerous protocols from href/src
  cleaned = cleaned.replace(/href\s*=\s*["']?\s*javascript:[^"'\s>]*/gi, 'href="#blocked"')
  cleaned = cleaned.replace(/src\s*=\s*["']?\s*javascript:[^"'\s>]*/gi, 'src=""')
  cleaned = cleaned.replace(/src\s*=\s*["']?\s*data:text\/html[^"'\s>]*/gi, 'src=""')

  // Remove style attributes (can contain expressions)
  cleaned = cleaned.replace(/\s+style\s*=\s*["'][^"']*["']/gi, '')

  // Remove dangerous tags entirely
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'select', 'textarea', 'meta', 'link', 'base']
  for (const tag of dangerousTags) {
    const regex = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi')
    cleaned = cleaned.replace(regex, '')
    // Also remove self-closing versions
    cleaned = cleaned.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi'), '')
  }

  return cleaned
}

/**
 * Escape HTML entities for safe display
 */
export function escapeHtml(text: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  }

  return text.replace(/[&<>"'`=/]/g, (char) => entities[char] || char)
}

/**
 * Validate title
 */
function validateTitle(title: string): string[] {
  const errors: string[] = []

  if (!title || title.trim().length === 0) {
    errors.push('Title is required')
  } else if (title.length > CONTENT_LIMITS.MAX_TITLE_LENGTH) {
    errors.push(`Title exceeds maximum length of ${CONTENT_LIMITS.MAX_TITLE_LENGTH} characters`)
  }

  // Check for HTML in title
  if (/<[^>]+>/.test(title)) {
    errors.push('Title cannot contain HTML tags')
  }

  return errors
}

/**
 * Validate excerpt
 */
function validateExcerpt(excerpt: string): string[] {
  const errors: string[] = []

  if (excerpt && excerpt.length > CONTENT_LIMITS.MAX_EXCERPT_LENGTH) {
    errors.push(`Excerpt exceeds maximum length of ${CONTENT_LIMITS.MAX_EXCERPT_LENGTH} characters`)
  }

  // Check for HTML in excerpt
  if (/<[^>]+>/.test(excerpt)) {
    errors.push('Excerpt cannot contain HTML tags')
  }

  return errors
}

/**
 * Validate content body
 */
function validateContent(content: string): { errors: string[]; warnings: string[]; wordCount: number } {
  const errors: string[] = []
  const warnings: string[] = []

  if (!content || content.trim().length === 0) {
    errors.push('Content is required')
    return { errors, warnings, wordCount: 0 }
  }

  if (content.length > CONTENT_LIMITS.MAX_CONTENT_LENGTH) {
    errors.push(`Content exceeds maximum length of ${CONTENT_LIMITS.MAX_CONTENT_LENGTH} characters`)
  }

  // Calculate word count (strip HTML first)
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = plainText.split(/\s+/).filter(Boolean).length

  if (wordCount < CONTENT_LIMITS.MIN_WORDS) {
    errors.push(`Article must have at least ${CONTENT_LIMITS.MIN_WORDS} words (currently ${wordCount})`)
  }

  if (wordCount > CONTENT_LIMITS.MAX_WORDS) {
    errors.push(`Article exceeds maximum of ${CONTENT_LIMITS.MAX_WORDS} words (currently ${wordCount})`)
  }

  // Check for dangerous patterns
  const dangerous = containsDangerousPatterns(content)
  if (dangerous.length > 0) {
    errors.push(...dangerous.map(d => `Security violation: ${d}`))
  }

  // Check for suspicious patterns (warnings only)
  const suspicious = containsSuspiciousPatterns(content)
  if (suspicious.length > 0) {
    warnings.push(...suspicious)
  }

  return { errors, warnings, wordCount }
}

/**
 * Validate references
 */
function validateReferences(references: Array<{ title?: string; url?: string }>): string[] {
  const errors: string[] = []

  if (references.length > CONTENT_LIMITS.MAX_REFERENCES) {
    errors.push(`Too many references (maximum ${CONTENT_LIMITS.MAX_REFERENCES})`)
  }

  for (let i = 0; i < references.length; i++) {
    const ref = references[i]

    if (ref.title && ref.title.length > CONTENT_LIMITS.MAX_REFERENCE_TITLE) {
      errors.push(`Reference #${i + 1} title is too long`)
    }

    if (ref.url) {
      if (ref.url.length > CONTENT_LIMITS.MAX_REFERENCE_URL) {
        errors.push(`Reference #${i + 1} URL is too long`)
      }

      if (!isValidUrl(ref.url)) {
        errors.push(`Reference #${i + 1} has an invalid or unsafe URL`)
      }
    }
  }

  return errors
}

// =============================================================================
// MAIN VALIDATION FUNCTION
// =============================================================================

/**
 * Comprehensive validation of article content
 */
export function validateArticleContent(data: {
  title: string
  excerpt?: string
  content: string
  references?: Array<{ title?: string; url?: string }>
}): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate title
  errors.push(...validateTitle(data.title))

  // Validate excerpt
  if (data.excerpt) {
    errors.push(...validateExcerpt(data.excerpt))
  }

  // Validate content
  const contentValidation = validateContent(data.content)
  errors.push(...contentValidation.errors)
  warnings.push(...contentValidation.warnings)

  // Validate references
  if (data.references) {
    errors.push(...validateReferences(data.references))
  }

  // Sanitize content if no critical errors
  let sanitizedContent: string | undefined
  if (errors.filter(e => e.includes('Security violation')).length === 0) {
    sanitizedContent = sanitizeHtml(data.content)
  }

  // Count suspicious patterns
  const suspiciousPatternsFound = warnings.filter(w => w.includes('Suspicious')).length

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    sanitizedContent,
    stats: {
      wordCount: contentValidation.wordCount,
      characterCount: data.content.length,
      referenceCount: data.references?.length || 0,
      suspiciousPatternsFound,
    },
  }
}

/**
 * Quick validation for pasted content (before full processing)
 */
export function quickValidatePastedContent(content: string): {
  isValid: boolean
  error?: string
} {
  if (!content || content.trim().length === 0) {
    return { isValid: false, error: 'No content provided' }
  }

  if (content.length > CONTENT_LIMITS.MAX_CONTENT_LENGTH) {
    return { isValid: false, error: 'Content is too large. Please reduce the size and try again.' }
  }

  // Check for obvious malicious patterns
  const dangerous = containsDangerousPatterns(content)
  if (dangerous.length > 0) {
    return { isValid: false, error: 'Content contains potentially harmful code and cannot be processed.' }
  }

  return { isValid: true }
}

/**
 * Sanitize filename for uploads
 */
export function sanitizeFilename(filename: string): string {
  // Remove path components
  const basename = filename.split(/[/\\]/).pop() || 'file'

  // Remove dangerous characters
  const sanitized = basename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .slice(0, 100)  // Limit length

  return sanitized || 'file'
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: {
  name: string
  size: number
  type: string
}): { isValid: boolean; error?: string } {
  // Allowed file types
  const allowedTypes = [
    'text/plain',
    'text/markdown',
    'application/octet-stream',  // Some .md files
  ]

  const allowedExtensions = ['.txt', '.md']

  // Check extension
  const hasValidExtension = allowedExtensions.some(ext =>
    file.name.toLowerCase().endsWith(ext)
  )

  if (!hasValidExtension) {
    return {
      isValid: false,
      error: 'Only .txt and .md files are allowed. Please copy and paste your content instead.'
    }
  }

  // Check size (max 1MB)
  const maxSize = 1024 * 1024  // 1MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File is too large (max 1MB). Please copy and paste your content instead.'
    }
  }

  return { isValid: true }
}
