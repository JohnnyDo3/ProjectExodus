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

  // Count empty lines to detect if refs are separated by blank lines
  const emptyLineCount = refLines.filter(l => !l.trim()).length
  const nonEmptyCount = refLines.filter(l => l.trim()).length
  const separatedByBlankLines = emptyLineCount >= nonEmptyCount * 0.3 // ~30% empty lines suggests separation

  for (let i = 0; i < refLines.length; i++) {
    const line = refLines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      // Empty line - save current reference if using blank line separation
      if (currentRef && separatedByBlankLines) {
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
    } else if (separatedByBlankLines) {
      // If blank-line separated, each non-empty section is a new ref
      isNewRef = !currentRef
    } else {
      // Without clear separation: detect by content patterns
      isNewRef =
        // Author patterns
        /^[A-Z][a-zÀ-ÿ]+,\s*[A-Z]/.test(trimmed) ||           // Smith, J or Smith, John
        /^[A-Z][a-zÀ-ÿ]+\s+[A-Z][a-zÀ-ÿ]+\s*[,.]/.test(trimmed) || // John Smith,
        /^[A-Z][a-zÀ-ÿ]+\s+[A-Z]\.\s*[A-Z]?/.test(trimmed) || // Smith J. or Smith J. A.
        /^[A-Z][A-Z]+[,.\s]/.test(trimmed) ||                  // ALL CAPS org name
        // Numbered/bracketed references
        /^\d+[\.\)]\s/.test(trimmed) ||                        // 1. or 1)
        /^\[\d+\]/.test(trimmed) ||                            // [1]
        /^[@][\w]+/.test(trimmed) ||                           // @citation
        // Special starts
        /^"[A-Z]/.test(trimmed) ||                             // "Title (no author)
        (/^The\s+[A-Z]/.test(trimmed) && trimmed.length < 100) || // The Organization
        // Website citation patterns
        /^"[^"]+"\.\s*[A-Z]/.test(trimmed) ||                  // "Article Title". Website
        /^[A-Z][a-z]+\s+[A-Z][a-z]+\.\s*"/.test(trimmed) ||    // Website Name. "Title"
        /^[A-Z][a-zA-Z]+\.[a-z]{2,}/.test(trimmed) ||          // Domain.com style
        (/^[A-Z]/.test(trimmed) && /https?:\/\//.test(trimmed)) // Any line starting with cap letter and has URL
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
 * Detect if a line looks like an author name (for MLA header detection)
 */
function looksLikeAuthorName(line: string): boolean {
  const trimmed = line.trim()
  // Short line with 2-4 words, capitalized, no special formatting
  const words = trimmed.split(/\s+/)
  if (words.length < 1 || words.length > 5) return false
  if (trimmed.length > 50) return false

  // Check for name patterns: "John Smith" or "Smith, John" or "John A. Smith"
  const namePattern = /^[A-Z][a-zÀ-ÿ]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-zÀ-ÿ]+$/
  const lastFirstPattern = /^[A-Z][a-zÀ-ÿ]+,\s*[A-Z][a-zÀ-ÿ]+/

  return namePattern.test(trimmed) || lastFirstPattern.test(trimmed)
}

/**
 * Detect if a line looks like a professor/instructor line
 */
function looksLikeProfessorLine(line: string): boolean {
  const trimmed = line.trim().toLowerCase()
  return /^(professor|prof\.|dr\.|instructor|mr\.|mrs\.|ms\.)\s+/i.test(line.trim()) ||
         trimmed.includes('professor') ||
         /^[A-Z][a-z]+\s+[A-Z][a-z]+$/.test(line.trim()) // Could be just a name
}

/**
 * Detect if a line looks like a class/course name
 */
function looksLikeClassName(line: string): boolean {
  const trimmed = line.trim()
  // Class patterns: "ENG 101", "English Composition", "HIST-201", "Biology 101"
  const courseCodePattern = /^[A-Z]{2,4}[-\s]?\d{2,4}/
  const courseNamePattern = /^[A-Z][a-z]+\s+(Composition|Literature|Studies|History|Science|Writing|Analysis|Theory|Introduction|Fundamentals)/i
  const genericCoursePattern = /\b(101|102|201|202|1010|1020|2010)\b/

  return courseCodePattern.test(trimmed) ||
         courseNamePattern.test(trimmed) ||
         (trimmed.length < 40 && genericCoursePattern.test(trimmed))
}

/**
 * Detect if a line looks like a date
 */
function looksLikeDateLine(line: string): boolean {
  const trimmed = line.trim()
  // Date patterns: "15 February 2026", "February 15, 2026", "2/15/2026", "15/02/2026"
  const monthNames = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i
  const numericDate = /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}$/
  const writtenDate = /^\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}$/i
  const americanDate = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}$/i

  return (trimmed.length < 30 && monthNames.test(trimmed)) ||
         numericDate.test(trimmed) ||
         writtenDate.test(trimmed) ||
         americanDate.test(trimmed)
}

/**
 * Detect MLA-style header and find where the actual title starts
 * MLA format: Author, Professor, Class, Date, then Title
 * Only detects if we have strong evidence of all 4 header elements
 */
function detectMlaHeader(lines: string[]): { headerLineCount: number; isMlaFormat: boolean } {
  if (lines.length < 6) {
    // Need at least 6 lines: 4 header + title + some body content
    return { headerLineCount: 0, isMlaFormat: false }
  }

  // Check first 4 lines for MLA pattern - require ALL 4 to match
  const line1 = lines[0].trim()
  const line2 = lines[1].trim()
  const line3 = lines[2].trim()
  const line4 = lines[3].trim()

  // All lines must be short (typical header lines are brief)
  if (line1.length > 60 || line2.length > 60 || line3.length > 60 || line4.length > 30) {
    return { headerLineCount: 0, isMlaFormat: false }
  }

  // Score how likely this is MLA format - require strong match
  let mlaScore = 0

  // Line 1: Author name (must match)
  if (looksLikeAuthorName(line1)) mlaScore += 2

  // Line 2: Professor (must match)
  if (looksLikeProfessorLine(line2)) mlaScore += 2

  // Line 3: Class name (must match)
  if (looksLikeClassName(line3)) mlaScore += 2

  // Line 4: Date (must match exactly - strict date patterns only)
  const strictDatePattern = /^(\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}|(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})$/i
  if (strictDatePattern.test(line4)) mlaScore += 2

  // Only detect MLA if we have ALL 4 elements (score = 8)
  if (mlaScore >= 8) {
    return { headerLineCount: 4, isMlaFormat: true }
  }

  return { headerLineCount: 0, isMlaFormat: false }
}

/**
 * Extract title from content
 */
function extractTitle(content: string): { title: string; bodyWithoutTitle: string } {
  // Keep original content for body extraction
  const originalLines = content.split('\n')
  const nonEmptyLines = originalLines.filter(l => l.trim())

  if (nonEmptyLines.length === 0) {
    return { title: 'Untitled', bodyWithoutTitle: content }
  }

  // Check for MLA-style header (author, professor, class, date before title)
  const { headerLineCount, isMlaFormat } = detectMlaHeader(nonEmptyLines)

  let titleLineIndex = 0

  if (isMlaFormat && headerLineCount > 0) {
    // Skip the header lines to find the actual title
    titleLineIndex = headerLineCount

    // Make sure we have a line after the header
    if (titleLineIndex >= nonEmptyLines.length) {
      titleLineIndex = 0 // Fall back to first line if no title after header
    }
  }

  // Get the title from the identified line
  let title = nonEmptyLines[titleLineIndex].trim()

  // Remove common title markers
  title = title
    .replace(/^#\s*/, '') // Markdown heading
    .replace(/^Title:\s*/i, '')
    .replace(/^<h1>|<\/h1>$/gi, '') // HTML heading
    .trim()

  // If title is too long, it's probably not the title - truncate
  if (title.length > 200) {
    const firstSentence = title.match(/^[^.!?]+[.!?]/)
    if (firstSentence && firstSentence[0].length < 150) {
      title = firstSentence[0]
    } else {
      title = title.slice(0, 100) + '...'
    }
  }

  // Build body: find where the title line is in original content and skip to there
  // First, find the title text in original lines
  let foundTitleInOriginal = -1
  for (let i = 0; i < originalLines.length; i++) {
    if (originalLines[i].trim() === nonEmptyLines[titleLineIndex].trim()) {
      foundTitleInOriginal = i
      break
    }
  }

  // Body is everything after the title line (preserving original formatting)
  let bodyWithoutTitle: string
  if (foundTitleInOriginal >= 0) {
    bodyWithoutTitle = originalLines.slice(foundTitleInOriginal + 1).join('\n').trim()
  } else {
    // Fallback: just remove the first non-empty line content
    bodyWithoutTitle = nonEmptyLines.slice(titleLineIndex + 1).join('\n').trim()
  }

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
