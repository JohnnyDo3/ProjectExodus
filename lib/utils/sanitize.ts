'use client';

import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks while allowing safe formatting tags
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Return empty string on server-side since DOMPurify requires DOM
    return '';
  }

  // Configure DOMPurify to allow safe tags and attributes
  const config = {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'strong', 'em', 'b', 'i', 'u', 's',
      'ul', 'ol', 'li',
      'blockquote', 'cite', 'q',
      'br', 'hr', 'div', 'span',
      // Media — required for article body images. figure/figcaption
      // power journalism-style captioned photos with optional credit.
      'img', 'figure', 'figcaption',
      // Inline formatting often used in long-form journalism
      'sup', 'sub', 'mark', 'small',
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'class', 'id',
      // <img> attributes — src, alt, dimensions
      'src', 'alt', 'width', 'height', 'loading',
      // <a> outbound
      'target', 'rel',
      // Quote / cite metadata
      'cite', 'datetime',
    ],
    ALLOW_DATA_ATTR: false,
    // Block javascript: URLs and other dangerous protocols
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  };

  return DOMPurify.sanitize(html, config);
}
