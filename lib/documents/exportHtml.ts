/**
 * HTML Export Utility
 * Generates standalone HTML documents with embedded styles
 */

export interface HtmlExportOptions {
  title?: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
  includeMetadata?: boolean
  includeTableOfContents?: boolean
  theme?: 'light' | 'dark' | 'auto'
  pageSize?: 'a4' | 'letter' | 'legal'
  customCss?: string
}

/**
 * Generates a standalone HTML document from content
 */
export function generateStandaloneHtml(
  content: string,
  options: HtmlExportOptions = {}
): string {
  const {
    title = 'Document',
    author = '',
    createdAt,
    updatedAt,
    includeMetadata = true,
    includeTableOfContents = false,
    theme = 'light',
    pageSize = 'a4',
    customCss = '',
  } = options

  const sanitizedContent = sanitizeHtml(content)
  const toc = includeTableOfContents ? generateTableOfContents(sanitizedContent) : ''
  const metadataSection = includeMetadata ? generateMetadataSection(author, createdAt, updatedAt) : ''

  const pageSizes: Record<string, string> = {
    a4: '210mm 297mm',
    letter: '8.5in 11in',
    legal: '8.5in 14in',
  }

  const themeColors = getThemeColors(theme)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="Project Exodus Document Export">
  ${author ? `<meta name="author" content="${escapeHtml(author)}">` : ''}
  ${createdAt ? `<meta name="created" content="${createdAt.toISOString()}">` : ''}
  <title>${escapeHtml(title)}</title>
  <style>
    /* Reset and base styles */
    *, *::before, *::after {
      box-sizing: border-box;
    }

    :root {
      --text-color: ${themeColors.text};
      --bg-color: ${themeColors.background};
      --heading-color: ${themeColors.heading};
      --link-color: ${themeColors.link};
      --border-color: ${themeColors.border};
      --code-bg: ${themeColors.codeBg};
      --blockquote-border: ${themeColors.quoteBorder};
      --table-border: ${themeColors.tableBorder};
      --table-header-bg: ${themeColors.tableHeaderBg};
    }

    @media (prefers-color-scheme: dark) {
      ${theme === 'auto' ? `
      :root {
        --text-color: #e4e4e7;
        --bg-color: #18181b;
        --heading-color: #fafafa;
        --link-color: #60a5fa;
        --border-color: #3f3f46;
        --code-bg: #27272a;
        --blockquote-border: #3f3f46;
        --table-border: #3f3f46;
        --table-header-bg: #27272a;
      }
      ` : ''}
    }

    @page {
      size: ${pageSizes[pageSize]};
      margin: 2.5cm 2cm;
    }

    html {
      font-size: 16px;
      line-height: 1.6;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      color: var(--text-color);
      background-color: var(--bg-color);
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      color: var(--heading-color);
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      line-height: 1.3;
    }

    h1 {
      font-size: 2.25rem;
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 0.3em;
      margin-top: 0;
    }

    h2 {
      font-size: 1.75rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.2em;
    }

    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.125rem; }
    h6 { font-size: 1rem; }

    p {
      margin: 1em 0;
    }

    /* Links */
    a {
      color: var(--link-color);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Lists */
    ul, ol {
      margin: 1em 0;
      padding-left: 2em;
    }

    li {
      margin: 0.25em 0;
    }

    li > ul, li > ol {
      margin: 0.25em 0;
    }

    /* Task lists */
    ul[data-type="taskList"] {
      list-style: none;
      padding-left: 0;
    }

    ul[data-type="taskList"] li {
      display: flex;
      align-items: flex-start;
      gap: 0.5em;
    }

    ul[data-type="taskList"] input[type="checkbox"] {
      margin-top: 0.3em;
    }

    /* Code */
    code {
      font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
      font-size: 0.875em;
      background-color: var(--code-bg);
      padding: 0.2em 0.4em;
      border-radius: 4px;
    }

    pre {
      background-color: var(--code-bg);
      padding: 1em;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1em 0;
    }

    pre code {
      background: none;
      padding: 0;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    /* Blockquotes */
    blockquote {
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 4px solid var(--blockquote-border);
      background-color: var(--code-bg);
      border-radius: 0 4px 4px 0;
    }

    blockquote p {
      margin: 0.5em 0;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
      font-size: 0.9375rem;
    }

    th, td {
      border: 1px solid var(--table-border);
      padding: 0.75em 1em;
      text-align: left;
    }

    th {
      background-color: var(--table-header-bg);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: var(--code-bg);
    }

    /* Images */
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1em 0;
    }

    figure {
      margin: 1.5em 0;
      text-align: center;
    }

    figcaption {
      font-size: 0.875rem;
      color: var(--text-color);
      opacity: 0.8;
      margin-top: 0.5em;
    }

    /* Horizontal rule */
    hr {
      border: none;
      border-top: 2px solid var(--border-color);
      margin: 2em 0;
    }

    /* Text formatting */
    strong, b {
      font-weight: 600;
    }

    em, i {
      font-style: italic;
    }

    u {
      text-decoration: underline;
    }

    s, strike, del {
      text-decoration: line-through;
    }

    mark {
      background-color: #fef08a;
      padding: 0 0.2em;
      border-radius: 2px;
    }

    sub {
      font-size: 0.75em;
      vertical-align: sub;
    }

    sup {
      font-size: 0.75em;
      vertical-align: super;
    }

    /* Metadata section */
    .document-metadata {
      font-size: 0.875rem;
      color: var(--text-color);
      opacity: 0.7;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1em;
      margin-bottom: 2em;
    }

    .document-metadata p {
      margin: 0.25em 0;
    }

    /* Table of contents */
    .table-of-contents {
      background-color: var(--code-bg);
      border-radius: 8px;
      padding: 1.5em;
      margin: 1.5em 0;
    }

    .table-of-contents h2 {
      margin-top: 0;
      border: none;
      font-size: 1.25rem;
    }

    .table-of-contents ul {
      list-style: none;
      padding-left: 0;
    }

    .table-of-contents li {
      margin: 0.5em 0;
    }

    .table-of-contents a {
      color: var(--text-color);
    }

    .table-of-contents .toc-level-2 { padding-left: 1.5em; }
    .table-of-contents .toc-level-3 { padding-left: 3em; }
    .table-of-contents .toc-level-4 { padding-left: 4.5em; }

    /* Print styles */
    @media print {
      body {
        max-width: none;
        padding: 0;
      }

      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
      }

      pre, blockquote, table, img {
        page-break-inside: avoid;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      a[href^="http"]::after {
        content: " (" attr(href) ")";
        font-size: 0.875em;
        opacity: 0.7;
      }
    }

    /* Custom CSS */
    ${customCss}
  </style>
</head>
<body>
  <article>
    <h1>${escapeHtml(title)}</h1>
    ${metadataSection}
    ${toc}
    <div class="document-content">
      ${sanitizedContent}
    </div>
  </article>
</body>
</html>`
}

/**
 * Generates metadata section HTML
 */
function generateMetadataSection(
  author: string,
  createdAt?: Date,
  updatedAt?: Date
): string {
  if (!author && !createdAt && !updatedAt) {
    return ''
  }

  const parts: string[] = []

  if (author) {
    parts.push(`<p><strong>Author:</strong> ${escapeHtml(author)}</p>`)
  }

  if (createdAt) {
    parts.push(`<p><strong>Created:</strong> ${formatDate(createdAt)}</p>`)
  }

  if (updatedAt) {
    parts.push(`<p><strong>Last updated:</strong> ${formatDate(updatedAt)}</p>`)
  }

  return `<div class="document-metadata">${parts.join('\n')}</div>`
}

/**
 * Generates table of contents from headings
 */
function generateTableOfContents(html: string): string {
  const headings: { level: number; text: string; id: string }[] = []
  const headingRegex = /<h([1-6])[^>]*(?:id="([^"]*)")?[^>]*>([\s\S]*?)<\/h[1-6]>/gi
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10)
    const existingId = match[2]
    const text = match[3].replace(/<[^>]+>/g, '').trim()
    const id = existingId || generateSlug(text)

    if (level >= 2 && level <= 4) {
      headings.push({ level, text, id })
    }
  }

  if (headings.length === 0) {
    return ''
  }

  const tocItems = headings.map(h =>
    `<li class="toc-level-${h.level}"><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`
  ).join('\n')

  return `
<nav class="table-of-contents">
  <h2>Table of Contents</h2>
  <ul>
    ${tocItems}
  </ul>
</nav>`
}

/**
 * Sanitizes HTML content for safe embedding
 */
function sanitizeHtml(html: string): string {
  if (!html) return ''

  // Remove script tags
  let safe = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers
  safe = safe.replace(/\s*on\w+\s*=\s*"[^"]*"/gi, '')
  safe = safe.replace(/\s*on\w+\s*=\s*'[^']*'/gi, '')

  // Remove javascript: URLs
  safe = safe.replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"')
  safe = safe.replace(/href\s*=\s*'javascript:[^']*'/gi, "href='#'")

  // Add IDs to headings for TOC links
  safe = safe.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h[1-6]>/gi, (match, level, attrs, content) => {
    if (attrs.includes('id=')) {
      return match
    }
    const text = content.replace(/<[^>]+>/g, '').trim()
    const id = generateSlug(text)
    return `<h${level} id="${id}"${attrs}>${content}</h${level}>`
  })

  return safe
}

/**
 * Escapes HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, char => map[char])
}

/**
 * Generates a URL-safe slug from text
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

/**
 * Formats a date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Gets theme color values
 */
function getThemeColors(theme: 'light' | 'dark' | 'auto'): Record<string, string> {
  if (theme === 'dark') {
    return {
      text: '#e4e4e7',
      background: '#18181b',
      heading: '#fafafa',
      link: '#60a5fa',
      border: '#3f3f46',
      codeBg: '#27272a',
      quoteBorder: '#3f3f46',
      tableBorder: '#3f3f46',
      tableHeaderBg: '#27272a',
    }
  }

  // Light or auto (starts with light)
  return {
    text: '#1f2937',
    background: '#ffffff',
    heading: '#111827',
    link: '#2563eb',
    border: '#e5e7eb',
    codeBg: '#f3f4f6',
    quoteBorder: '#d1d5db',
    tableBorder: '#e5e7eb',
    tableHeaderBg: '#f9fafb',
  }
}

export default generateStandaloneHtml
