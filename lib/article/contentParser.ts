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
  // Standard URLs
  const urlPatterns = [
    /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi,  // Standard URLs
    /www\.[^\s<>"{}|\\^`\[\]]+/gi,         // www. URLs
    /doi\.org\/[^\s<>"{}|\\^`\[\]]+/gi,    // DOI URLs
    /doi:\s*([^\s<>"{}|\\^`\[\]]+)/gi,     // doi: format
  ]

  for (const pattern of urlPatterns) {
    const match = trimmed.match(pattern)
    if (match) {
      url = match[0]
        .replace(/[.,;:)\]]+$/, '') // Remove trailing punctuation
        .replace(/^doi:\s*/i, 'https://doi.org/') // Convert doi: to URL
      if (!url.startsWith('http')) {
        url = 'https://' + url
      }
      break
    }
  }

  // Also check for "Retrieved from" or "Available at" patterns
  if (!url) {
    const retrievedMatch = trimmed.match(/(?:Retrieved|Accessed|Available)\s+(?:from|at)[:\s]+([^\s]+)/i)
    if (retrievedMatch) {
      url = retrievedMatch[1].replace(/[.,;:)\]]+$/, '')
      if (!url.startsWith('http')) {
        url = 'https://' + url
      }
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

  // Find works cited section header - more flexible matching
  for (let i = 0; i < lines.length; i++) {
    const lineLower = lines[i].toLowerCase().trim()
    const lineClean = lineLower.replace(/[:#\-_*]+/g, '').trim()

    for (const header of WORKS_CITED_HEADERS) {
      if (lineClean === header ||
          lineLower.startsWith(header) ||
          lineLower.includes(header)) {
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

  // Parse references - handle various formats
  const references: ParsedReference[] = []
  let currentRef = ''

  // Detect if references use hanging indent (continuation lines start with spaces)
  const hasHangingIndent = refLines.some(line =>
    line.length > 0 && /^\s{2,}/.test(line) && line.trim().length > 0
  )

  for (let i = 0; i < refLines.length; i++) {
    const line = refLines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      // Empty line - save current reference if exists
      if (currentRef) {
        references.push(parseCitation(currentRef, references.length))
        currentRef = ''
      }
      continue
    }

    // Determine if this is a new reference or continuation
    let isNewRef = false

    if (hasHangingIndent) {
      // With hanging indent: new refs start at column 0, continuations are indented
      isNewRef = /^\S/.test(line) && line.trim().length > 0
    } else {
      // Without hanging indent: detect by content patterns
      isNewRef =
        // Author patterns
        /^[A-Z][a-zÀ-ÿ]+,\s*[A-Z]/.test(trimmed) ||           // Smith, J or Smith, John
        /^[A-Z][a-zÀ-ÿ]+\s+[A-Z][a-zÀ-ÿ]+\s*[,.]/.test(trimmed) || // John Smith,
        /^[A-Z][a-zÀ-ÿ]+\s+[A-Z]\.\s*[A-Z]?/.test(trimmed) || // Smith J. or Smith J. A.
        /^[A-Z][A-Z]+[,.]/.test(trimmed) ||                    // ALL CAPS org name
        // Numbered/bracketed references
        /^\d+[\.\)]\s/.test(trimmed) ||                        // 1. or 1)
        /^\[\d+\]/.test(trimmed) ||                            // [1]
        /^[@][\w]+/.test(trimmed) ||                           // @citation
        // Special starts
        /^"[A-Z]/.test(trimmed) ||                             // "Title (no author)
        /^The\s+[A-Z]/.test(trimmed) && trimmed.length < 100   // The Organization
    }

    if (isNewRef && currentRef) {
      references.push(parseCitation(currentRef, references.length))
      currentRef = trimmed
    } else if (currentRef) {
      // Continuation - add space if needed
      currentRef += (currentRef.endsWith('-') ? '' : ' ') + trimmed
    } else {
      currentRef = trimmed
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
 * Extract title from content
 */
function extractTitle(content: string): { title: string; bodyWithoutTitle: string } {
  const lines = content.split('\n').filter(l => l.trim())

  if (lines.length === 0) {
    return { title: 'Untitled', bodyWithoutTitle: content }
  }

  // First non-empty line is likely the title
  let title = lines[0].trim()

  // Remove common title markers
  title = title
    .replace(/^#\s*/, '') // Markdown heading
    .replace(/^Title:\s*/i, '')
    .replace(/^<h1>|<\/h1>$/gi, '') // HTML heading
    .trim()

  // If title is too long, it might not be a title
  if (title.length > 200) {
    // Try to find a shorter first sentence
    const firstSentence = title.match(/^[^.!?]+[.!?]/)
    if (firstSentence && firstSentence[0].length < 150) {
      title = firstSentence[0]
    } else {
      title = title.slice(0, 100) + '...'
    }
  }

  // Remove the title line from body
  const bodyWithoutTitle = lines.slice(1).join('\n').trim()

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
