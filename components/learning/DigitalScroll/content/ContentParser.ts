// ============================================
// CONTENT PARSER
// Parses HTML content into structured segments
// for intentional learning presentation
// ============================================

export type ContentSegmentType =
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'quote'
  | 'key-concept'
  | 'image'
  | 'table'
  | 'reflection'
  | 'divider'

export type ContentComplexity = 1 | 2 | 3 // Quick read, Moderate, Deep dive

export interface ContentSegment {
  id: string
  type: ContentSegmentType
  content: string
  level?: number // For headings (h2=2, h3=3, etc)
  metadata?: {
    author?: string
    source?: string
    caption?: string
    quoteId?: string
    term?: string
    definition?: string
  }
}

export interface ParsedContent {
  segments: ContentSegment[]
  totalWords: number
  complexity: ContentComplexity
  hasImages: boolean
  hasQuotes: boolean
  hasTables: boolean
  keyTerms: Array<{ term: string; definition: string }>
}

/**
 * Parse HTML content string into structured segments
 */
export function parseContent(htmlContent: string): ParsedContent {
  const segments: ContentSegment[] = []
  const keyTerms: Array<{ term: string; definition: string }> = []
  let totalWords = 0
  let hasImages = false
  let hasQuotes = false
  let hasTables = false

  // Create a DOM parser (works in browser)
  if (typeof window === 'undefined') {
    // Server-side: return minimal parsed content
    return {
      segments: [{ id: 'raw-1', type: 'paragraph', content: htmlContent }],
      totalWords: htmlContent.split(/\s+/).length,
      complexity: 2,
      hasImages: false,
      hasQuotes: false,
      hasTables: false,
      keyTerms: [],
    }
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const contentRoot = doc.body.querySelector('.lesson-content') || doc.body

  let segmentIndex = 0

  // Process each child element
  Array.from(contentRoot.children).forEach((element) => {
    const tagName = element.tagName.toLowerCase()
    const id = `seg-${segmentIndex++}`

    switch (tagName) {
      case 'h2':
      case 'h3':
      case 'h4':
        segments.push({
          id,
          type: 'heading',
          content: element.textContent || '',
          level: parseInt(tagName.charAt(1)),
        })
        break

      case 'p':
        const text = element.textContent || ''
        totalWords += text.split(/\s+/).length
        segments.push({
          id,
          type: 'paragraph',
          content: element.innerHTML,
        })
        break

      case 'ul':
      case 'ol':
        segments.push({
          id,
          type: 'list',
          content: element.outerHTML,
        })
        totalWords += (element.textContent || '').split(/\s+/).length
        break

      case 'blockquote':
        hasQuotes = true
        const quoteP = element.querySelector('p')
        const cite = element.querySelector('cite')
        const quoteId = element.getAttribute('data-quote-id')

        // Parse author from cite (format: "— Author, Source")
        let author = ''
        let source = ''
        if (cite) {
          const citeText = cite.textContent || ''
          const match = citeText.match(/—\s*(.+?)(?:,\s*(.+))?$/)
          if (match) {
            author = match[1]?.trim() || ''
            source = match[2]?.trim() || ''
          }
        }

        segments.push({
          id,
          type: 'quote',
          content: quoteP?.textContent || element.textContent || '',
          metadata: { author, source, quoteId: quoteId || undefined },
        })
        break

      case 'div':
        if (element.classList.contains('key-concept')) {
          const h4 = element.querySelector('h4')
          const p = element.querySelector('p')
          segments.push({
            id,
            type: 'key-concept',
            content: p?.innerHTML || element.innerHTML,
            metadata: { caption: h4?.textContent || 'Key Concept' },
          })
        } else if (element.classList.contains('image-placeholder')) {
          hasImages = true
          segments.push({
            id,
            type: 'image',
            content: element.textContent || '',
            metadata: { caption: element.getAttribute('data-caption') || '' },
          })
        } else if (element.classList.contains('reflection-prompt')) {
          segments.push({
            id,
            type: 'reflection',
            content: element.textContent || '',
          })
        } else {
          // Generic div - treat as paragraph
          segments.push({
            id,
            type: 'paragraph',
            content: element.innerHTML,
          })
        }
        break

      case 'table':
        hasTables = true
        segments.push({
          id,
          type: 'table',
          content: element.outerHTML,
        })
        break

      case 'hr':
        segments.push({
          id,
          type: 'divider',
          content: '',
        })
        break

      default:
        // Unknown element - include as paragraph
        if (element.textContent?.trim()) {
          segments.push({
            id,
            type: 'paragraph',
            content: element.innerHTML || element.textContent || '',
          })
        }
    }
  })

  // Extract key terms (strong tags within paragraphs)
  doc.querySelectorAll('strong').forEach((strong) => {
    const term = strong.textContent?.trim()
    if (term && term.length > 2 && term.length < 50) {
      // Try to find a definition (text after the term in the same paragraph)
      const parent = strong.parentElement
      if (parent) {
        const fullText = parent.textContent || ''
        const termIndex = fullText.indexOf(term)
        if (termIndex !== -1) {
          // Get text after the term, up to the next sentence or 100 chars
          const afterTerm = fullText.slice(termIndex + term.length)
          const definition = afterTerm.match(/^[^.!?]*[.!?]/)?.[0]?.trim() || ''
          if (definition && !keyTerms.find(kt => kt.term === term)) {
            keyTerms.push({ term, definition })
          }
        }
      }
    }
  })

  // Calculate complexity based on word count and structure
  let complexity: ContentComplexity = 1
  if (totalWords > 200 || hasTables) {
    complexity = 3
  } else if (totalWords > 100 || hasImages) {
    complexity = 2
  }

  return {
    segments,
    totalWords,
    complexity,
    hasImages,
    hasQuotes,
    hasTables,
    keyTerms,
  }
}

/**
 * Group segments into logical page chunks
 * Each chunk should be roughly one "thought" or concept
 */
export function chunkContent(
  parsed: ParsedContent,
  targetWordsPerPage: number = 150
): ContentSegment[][] {
  const chunks: ContentSegment[][] = []
  let currentChunk: ContentSegment[] = []
  let currentWordCount = 0

  parsed.segments.forEach((segment, index) => {
    const segmentWords = segment.content.split(/\s+/).length

    // Start new chunk on major headings
    if (segment.type === 'heading' && segment.level === 2 && currentChunk.length > 0) {
      chunks.push(currentChunk)
      currentChunk = [segment]
      currentWordCount = segmentWords
      return
    }

    // Start new chunk if we exceed word target and hit a natural break
    const isNaturalBreak =
      segment.type === 'heading' ||
      segment.type === 'quote' ||
      segment.type === 'key-concept' ||
      segment.type === 'divider'

    if (currentWordCount >= targetWordsPerPage && isNaturalBreak && currentChunk.length > 0) {
      chunks.push(currentChunk)
      currentChunk = [segment]
      currentWordCount = segmentWords
      return
    }

    currentChunk.push(segment)
    currentWordCount += segmentWords
  })

  // Push remaining content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }

  return chunks
}

/**
 * Determine the best page template for a chunk of content
 */
export function determinePageTemplate(
  chunk: ContentSegment[]
): 'concept-intro' | 'deep-dive' | 'insight' | 'example' | 'reflection' {
  // Check for reflection prompts
  if (chunk.some(s => s.type === 'reflection')) {
    return 'reflection'
  }

  // Check for key concept as main focus
  if (chunk.length <= 2 && chunk.some(s => s.type === 'key-concept')) {
    return 'insight'
  }

  // Check for quote-heavy content
  if (chunk.filter(s => s.type === 'quote').length >= 2) {
    return 'insight'
  }

  // Check for h2 heading (new section intro)
  if (chunk[0]?.type === 'heading' && chunk[0]?.level === 2) {
    return 'concept-intro'
  }

  // Default to deep-dive for dense content
  return 'deep-dive'
}
