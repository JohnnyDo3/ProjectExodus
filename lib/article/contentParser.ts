/**
 * Content Parser for Article Uploads
 *
 * Parses pasted content (research papers, essays, articles) to extract:
 * - Title
 * - Body content
 * - Works Cited / References / Bibliography
 * - Citation format detection (MLA, APA, Chicago)
 */

export interface ParsedReference {
  id: string
  raw: string
  title: string
  authors?: string
  year?: string
  url?: string
  publisher?: string
  format: 'MLA' | 'APA' | 'Chicago' | 'Unknown'
}

export interface ParsedContent {
  title: string
  body: string
  excerpt: string
  references: ParsedReference[]
  suggestedCategory?: string
  wordCount: number
  estimatedReadTime: number
}

// Common section headers for works cited
const WORKS_CITED_HEADERS = [
  'works cited',
  'references',
  'bibliography',
  'sources',
  'works consulted',
  'literature cited',
  'citations',
  'reference list',
]

// Category keywords for auto-suggestion
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  sustainability: ['sustainable', 'sustainability', 'eco-friendly', 'green', 'environmental', 'climate'],
  water: ['water', 'hydration', 'ocean', 'river', 'aquatic', 'watershed', 'irrigation'],
  energy: ['energy', 'solar', 'wind', 'renewable', 'electricity', 'power', 'grid'],
  waste: ['waste', 'recycling', 'compost', 'landfill', 'pollution', 'plastic', 'zero-waste'],
  nature: ['nature', 'biodiversity', 'wildlife', 'forest', 'ecosystem', 'conservation', 'species'],
  building: ['building', 'architecture', 'construction', 'housing', 'urban', 'infrastructure', 'LEED'],
  food: ['food', 'agriculture', 'farming', 'organic', 'nutrition', 'diet', 'crop'],
  community: ['community', 'social', 'local', 'neighborhood', 'civic', 'collective', 'grassroots'],
}

/**
 * Detect citation format based on patterns
 */
function detectCitationFormat(citation: string): 'MLA' | 'APA' | 'Chicago' | 'Unknown' {
  const trimmed = citation.trim()

  // APA: Author, A. A. (Year). Title...
  if (/^[A-Z][a-z]+,\s*[A-Z]\.\s*[A-Z]?\.*\s*\(\d{4}\)/.test(trimmed)) {
    return 'APA'
  }

  // MLA: Author. "Title." Container, ...
  if (/^[A-Z][a-z]+,\s*[A-Z][a-z]+\.?\s*"/.test(trimmed) ||
      /^[A-Z][a-z]+,\s*[A-Z][a-z]+\.?\s*[A-Z]/.test(trimmed)) {
    return 'MLA'
  }

  // Chicago: Author. Title. Place: Publisher, Year.
  if (/^[A-Z][a-z]+,\s*[A-Z][a-z]+\.\s*[A-Z]/.test(trimmed) &&
      /:\s*[A-Z][a-z]+.*,\s*\d{4}\.?$/.test(trimmed)) {
    return 'Chicago'
  }

  return 'Unknown'
}

/**
 * Parse a single citation into structured data
 */
function parseCitation(raw: string, index: number): ParsedReference {
  const trimmed = raw.trim()
  const format = detectCitationFormat(trimmed)

  let authors = ''
  let year = ''
  let title = ''
  let url = ''
  let publisher = ''

  // Extract URL if present - handle various formats
  // Use a comprehensive regex that captures URLs in many contexts
  const urlPatterns = [
    // Standard URLs - more permissive to catch full URLs
    /https?:\/\/[^\s<>"{}|\\^`\[\]()]+(?:\([^\s<>"{}|\\^`\[\]]*\))?[^\s<>"{}|\\^`\[\]()]*/gi,
    // URLs in parentheses or angle brackets
    /[<(](https?:\/\/[^\s<>()]+)[>)]/gi,
    // www. URLs
    /www\.[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}[^\s<>"{}|\\^`\[\]]*/gi,
    // DOI URLs
    /doi\.org\/[^\s<>"{}|\\^`\[\]]+/gi,
    // doi: format
    /doi:\s*10\.[^\s<>"{}|\\^`\[\]]+/gi,
  ]

  for (const pattern of urlPatterns) {
    // Reset lastIndex for global patterns
    pattern.lastIndex = 0
    const match = trimmed.match(pattern)
    if (match) {
      url = match[0]
        // Remove surrounding brackets/parens if captured
        .replace(/^[<(]|[>)]$/g, '')
        // Remove trailing punctuation that's not part of URL
        .replace(/[.,;:)\]>'"]+$/, '')
        // Convert doi: to URL
        .replace(/^doi:\s*/i, 'https://doi.org/')
      if (!url.startsWith('http')) {
        url = 'https://' + url
      }
      break
    }
  }

  // Check for "Retrieved from", "Available at", or "Accessed" patterns
  if (!url) {
    const retrievedPatterns = [
      /(?:Retrieved|Accessed|Available)\s+(?:from|at)[:\s]+(\S+)/i,
      /(?:Retrieved|Accessed)\s+\w+\s+\d+,?\s+\d{4},?\s+from\s+(\S+)/i, // "Retrieved January 15, 2024, from URL"
      /URL:\s*(\S+)/i,
      /Link:\s*(\S+)/i,
    ]

    for (const pattern of retrievedPatterns) {
      const match = trimmed.match(pattern)
      if (match) {
        url = match[1].replace(/[.,;:)\]>'"]+$/, '')
        if (!url.startsWith('http') && !url.startsWith('www.')) {
          // Skip if it doesn't look like a URL
          if (url.includes('.') && url.length > 5) {
            url = 'https://' + url
          } else {
            url = ''
          }
        } else if (url.startsWith('www.')) {
          url = 'https://' + url
        }
        if (url) break
      }
    }
  }

  // Check if citation ends with a URL (common in website citations)
  if (!url) {
    // Look for URL at end of citation after common separators
    const endUrlMatch = trimmed.match(/(?:,|\.|;)\s*(https?:\/\/[^\s<>"]+)\s*\.?$/i)
    if (endUrlMatch) {
      url = endUrlMatch[1].replace(/[.,;:)\]>'"]+$/, '')
    }
  }

  // Extract year - multiple patterns
  const yearPatterns = [
    /\((\d{4})\)/,                    // (2020)
    /\((\d{4}),/,                     // (2020,
    /,\s*(\d{4})\./,                  // , 2020.
    /\b(19|20)\d{2}\b/,               // standalone year
  ]

  for (const pattern of yearPatterns) {
    const match = trimmed.match(pattern)
    if (match) {
      year = match[1] || match[0]
      break
    }
  }

  // Extract authors (usually first part before period, parenthesis, or year)
  const authorPatterns = [
    /^([^.(]+?)\s*\(\d{4}\)/,         // Authors (Year)
    /^([^.]+?)\.\s*["(]/,             // Authors. "Title or (Year
    /^([^.]+?)\.\s*[A-Z]/,            // Authors. Title
  ]

  for (const pattern of authorPatterns) {
    const match = trimmed.match(pattern)
    if (match) {
      authors = match[1].trim().replace(/,$/, '').replace(/\s+/g, ' ')
      break
    }
  }

  // Fallback: first part before period
  if (!authors) {
    const fallbackMatch = trimmed.match(/^([^.]+)/)
    if (fallbackMatch) {
      authors = fallbackMatch[1].trim().replace(/,$/, '')
    }
  }

  // Extract title - try multiple patterns
  const titlePatterns = [
    /"([^"]+)"/,                       // "Quoted title"
    /''([^']+)''/,                     // ''Single quoted''
    /<i>([^<]+)<\/i>/i,               // <i>Italic title</i>
    /<em>([^<]+)<\/em>/i,             // <em>Italic title</em>
    /\*([^*]+)\*/,                     // *Markdown italic*
    /\(\d{4}\)\.\s*([^.]+\.)/,        // (Year). Title.
  ]

  for (const pattern of titlePatterns) {
    const match = trimmed.match(pattern)
    if (match) {
      title = match[1].trim()
      break
    }
  }

  // Fallback: try to extract title after first period (skip author)
  if (!title) {
    const parts = trimmed.split(/\.\s+/)
    if (parts.length > 1) {
      for (let i = 1; i < parts.length; i++) {
        const part = parts[i].trim()
        // Skip if it's just initials, year, or very short
        if (part.length > 15 &&
            !part.match(/^\d{4}$/) &&
            !part.match(/^[A-Z]\.$/) &&
            !part.match(/^[A-Z]\.\s*[A-Z]\.$/)) {
          title = part.replace(/\.$/, '')
          break
        }
      }
    }
  }

  // If still no title, use a cleaned portion of raw text
  if (!title) {
    // Remove URL and author portion, use what's left
    let remaining = trimmed
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/^[^.]+\.\s*/, '')
      .trim()
    title = remaining.slice(0, 100) + (remaining.length > 100 ? '...' : '')
  }

  // Extract publisher
  const publisherPatterns = [
    /:\s*([^,]+),\s*\d{4}/,                                    // Place: Publisher, Year
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s*(?:Press|Publishing|Publications|Books|University|Inc\.|Ltd\.))/,
    /In\s+([^(]+)\s*\(/,                                        // In Journal Name (
  ]

  for (const pattern of publisherPatterns) {
    const match = trimmed.match(pattern)
    if (match) {
      publisher = match[1].trim()
      break
    }
  }

  return {
    id: `ref-${index}-${Date.now()}`,
    raw: trimmed,
    title: title || 'Unknown Title',
    authors: authors || 'Unknown Author',
    year,
    url,
    publisher,
    format,
  }
}

/**
 * Find and extract the works cited section from content
 */
function extractWorksCited(content: string): { body: string; references: ParsedReference[] } {
  const lines = content.split('\n')
  let worksCitedIndex = -1

  // Find works cited section header - MUST be a standalone header line (short, mostly just the header text)
  for (let i = 0; i < lines.length; i++) {
    const lineLower = lines[i].toLowerCase().trim()
    const lineClean = lineLower.replace(/[:#\-_*]+/g, '').trim()

    // Only match if it's a SHORT line that's basically just the header
    // This prevents matching "According to various sources, the data shows..."
    if (lineClean.length > 30) continue

    for (const header of WORKS_CITED_HEADERS) {
      // Must be exact match or very close (header with minimal extra chars)
      if (lineClean === header ||
          (lineClean.startsWith(header) && lineClean.length <= header.length + 5)) {
        worksCitedIndex = i
        break
      }
    }
    if (worksCitedIndex !== -1) break
  }

  // No works cited section found
  if (worksCitedIndex === -1) {
    return { body: content, references: [] }
  }

  // Split content into body and references
  const bodyLines = lines.slice(0, worksCitedIndex)
  const refLines = lines.slice(worksCitedIndex + 1)

  // Parse references - SIMPLE APPROACH: each non-empty line/block is a reference
  const references: ParsedReference[] = []
  let currentRef = ''

  // First, check if refs have URLs - if so, we'll use URL-based splitting
  const linesWithUrls = refLines.filter(l => /https?:\/\/|www\./i.test(l))

  if (linesWithUrls.length >= 2) {
    // Multiple lines have URLs - each URL-containing line (with surrounding context) is a reference
    let inRef = false

    for (let i = 0; i < refLines.length; i++) {
      const line = refLines[i]
      const trimmed = line.trim()
      const hasUrl = /https?:\/\/|www\./i.test(trimmed)

      if (!trimmed) {
        // Empty line - save current ref
        if (currentRef) {
          references.push(parseCitation(currentRef, references.length))
          currentRef = ''
        }
        inRef = false
        continue
      }

      // If this line has a URL, or previous line started a ref
      if (hasUrl || inRef) {
        if (currentRef && hasUrl && !inRef) {
          // Starting new ref with URL, save previous
          references.push(parseCitation(currentRef, references.length))
          currentRef = trimmed
        } else {
          currentRef += (currentRef ? ' ' : '') + trimmed
        }
        inRef = true

        // If this line has URL, it might be end of this ref
        if (hasUrl) {
          references.push(parseCitation(currentRef, references.length))
          currentRef = ''
          inRef = false
        }
      } else {
        // No URL, start accumulating
        currentRef += (currentRef ? ' ' : '') + trimmed
      }
    }
  } else {
    // Simple: split by blank lines or detect new refs by author patterns
    for (let i = 0; i < refLines.length; i++) {
      const line = refLines[i]
      const trimmed = line.trim()

      if (!trimmed) {
        if (currentRef) {
          references.push(parseCitation(currentRef, references.length))
          currentRef = ''
        }
        continue
      }

      // Check if this looks like a new reference start
      const isNewRef = !currentRef ||
        /^[A-Z][a-z]+,/.test(trimmed) ||  // Author, ...
        /^\d+[\.\)]/.test(trimmed) ||      // 1. or 1)
        /^\[/.test(trimmed) ||             // [1] or ["Title"]
        /^"/.test(trimmed)                 // "Title...

      if (isNewRef && currentRef) {
        references.push(parseCitation(currentRef, references.length))
        currentRef = trimmed
      } else {
        currentRef += (currentRef ? ' ' : '') + trimmed
      }
    }
  }

  // Don't forget the last reference
  if (currentRef) {
    references.push(parseCitation(currentRef, references.length))
  }

  return {
    body: bodyLines.join('\n').trim(),
    references,
  }
}

/**
 * Extract title from content - SIMPLE VERSION
 * Title = first non-empty line, Body = everything after
 */
function extractTitle(content: string): { title: string; bodyWithoutTitle: string } {
  const lines = content.split('\n')

  // Find first non-empty line - that's the title
  let titleIndex = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) {
      titleIndex = i
      break
    }
  }

  if (titleIndex === -1) {
    return { title: 'Untitled', bodyWithoutTitle: content }
  }

  let title = lines[titleIndex].trim()

  // Remove common title markers
  title = title
    .replace(/^#\s*/, '')
    .replace(/^Title:\s*/i, '')
    .replace(/^<h1>|<\/h1>$/gi, '')
    .trim()

  // If title is too long, truncate
  if (title.length > 200) {
    title = title.slice(0, 100) + '...'
  }

  // Body = everything after the title line
  const bodyWithoutTitle = lines.slice(titleIndex + 1).join('\n').trim()

  return { title, bodyWithoutTitle }
}

/**
 * Generate excerpt from body content
 */
function generateExcerpt(body: string, maxLength: number = 200): string {
  // Strip HTML tags
  const plainText = body.replace(/<[^>]*>/g, '').trim()

  // Get first paragraph or first N characters
  const firstParagraph = plainText.split('\n\n')[0]

  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }

  // Truncate at word boundary
  const truncated = firstParagraph.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return truncated.slice(0, lastSpace) + '...'
}

/**
 * Suggest category based on content keywords
 */
function suggestCategory(content: string): string | undefined {
  const lowerContent = content.toLowerCase()
  let bestMatch = ''
  let bestScore = 0

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      const matches = lowerContent.match(regex)
      if (matches) {
        score += matches.length
      }
    }

    if (score > bestScore) {
      bestScore = score
      bestMatch = category
    }
  }

  return bestScore >= 3 ? bestMatch : undefined
}

/**
 * Convert plain text to basic HTML
 */
function textToHtml(text: string): string {
  // Already has HTML? Return as-is
  if (/<[^>]+>/.test(text)) {
    return text
  }

  // Convert line breaks to paragraphs
  const paragraphs = text.split(/\n\s*\n/)

  return paragraphs
    .map(p => {
      const trimmed = p.trim()
      if (!trimmed) return ''

      // Check if it's a heading (short line followed by longer content)
      if (trimmed.length < 100 && !trimmed.endsWith('.')) {
        // Could be a subheading
        return `<h2>${trimmed}</h2>`
      }

      // Regular paragraph - preserve single line breaks as <br>
      const withBreaks = trimmed.replace(/\n/g, '<br>')
      return `<p>${withBreaks}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

/**
 * Main parsing function - takes raw pasted content and extracts all parts
 */
export function parseContent(rawContent: string): ParsedContent {
  // Normalize line endings
  const normalized = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // Extract works cited section
  const { body: bodyWithRefs, references } = extractWorksCited(normalized)

  // Extract title
  const { title, bodyWithoutTitle } = extractTitle(bodyWithRefs)

  // Convert to HTML if needed
  const htmlBody = textToHtml(bodyWithoutTitle)

  // Generate excerpt
  const excerpt = generateExcerpt(bodyWithoutTitle)

  // Calculate word count
  const plainText = bodyWithoutTitle.replace(/<[^>]*>/g, '')
  const wordCount = plainText.split(/\s+/).filter(Boolean).length

  // Estimate read time (average 200 words per minute)
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200))

  // Suggest category
  const suggestedCategory = suggestCategory(normalized)

  return {
    title,
    body: htmlBody,
    excerpt,
    references,
    suggestedCategory,
    wordCount,
    estimatedReadTime,
  }
}

/**
 * Re-export for backwards compatibility with existing code
 */
export { parseCitation as parseSingleCitation }
