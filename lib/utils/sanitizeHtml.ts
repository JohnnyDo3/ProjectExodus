import DOMPurify from 'dompurify'

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Allows only safe tags and attributes for learning content.
 */
export function sanitizeHtml(html: string): string {
  // Only run on client side
  if (typeof window === 'undefined') {
    return html
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      // Text formatting
      'p', 'br', 'hr',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'small', 'sub', 'sup',
      // Lists
      'ul', 'ol', 'li',
      // Links and media
      'a', 'img',
      // Code
      'code', 'pre', 'kbd',
      // Quotes and blocks
      'blockquote', 'q', 'cite',
      // Tables
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
      // Semantic
      'article', 'section', 'aside', 'header', 'footer', 'nav', 'main',
      'figure', 'figcaption',
      // Inline containers
      'span', 'div',
      // Definition lists
      'dl', 'dt', 'dd',
      // Details/summary
      'details', 'summary',
    ],
    ALLOWED_ATTR: [
      // Global attributes
      'id', 'class', 'title', 'lang', 'dir',
      // Link attributes
      'href', 'target', 'rel',
      // Image attributes
      'src', 'alt', 'width', 'height', 'loading',
      // Table attributes
      'colspan', 'rowspan', 'scope',
      // Accessibility
      'role', 'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-hidden',
      // Data attributes (for custom styling)
      'data-*',
    ],
    // Force all links to open in new tab and be secure
    ADD_ATTR: ['target', 'rel'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
  })
}
