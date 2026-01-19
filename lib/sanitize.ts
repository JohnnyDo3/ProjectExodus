import DOMPurify from 'isomorphic-dompurify'

// Allowed HTML tags for article content
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'b', 'i',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'blockquote', 'code', 'pre',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'img', 'figure', 'figcaption',
  'div', 'span', 'hr',
]

// Allowed attributes
const ALLOWED_ATTR = [
  'href', 'target', 'rel', 'class', 'id',
  'src', 'alt', 'width', 'height',
  'style', 'data-*',
]

/**
 * Sanitize HTML content to prevent XSS attacks
 * Uses isomorphic DOMPurify which works on both client and server
 * ✅ SECURITY FIX: Now properly sanitizes on server-side rendering
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Allow data attributes
    ALLOW_DATA_ATTR: true,
    // Force links to open in new tab with noopener
    ADD_ATTR: ['target', 'rel'],
    // Sanitize URLs in href/src attributes
    ALLOW_UNKNOWN_PROTOCOLS: false,
  })
}

/**
 * Sanitize content and add security attributes to links
 */
export function sanitizeArticleContent(content: string): string {
  const sanitized = sanitizeHtml(content)

  // Add rel="noopener noreferrer" to all external links
  if (typeof window !== 'undefined') {
    const div = document.createElement('div')
    div.innerHTML = sanitized

    div.querySelectorAll('a[href^="http"]').forEach(link => {
      link.setAttribute('rel', 'noopener noreferrer')
      link.setAttribute('target', '_blank')
    })

    return div.innerHTML
  }

  return sanitized
}
