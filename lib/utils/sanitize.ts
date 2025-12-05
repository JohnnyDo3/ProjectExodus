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
      'a', 'strong', 'em', 'ul', 'ol', 'li',
      'br', 'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'class', 'id'
    ],
    ALLOW_DATA_ATTR: false,
    // Block javascript: URLs and other dangerous protocols
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  };

  return DOMPurify.sanitize(html, config);
}
