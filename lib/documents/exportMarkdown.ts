/**
 * HTML to Markdown Export Utility
 * Converts TipTap HTML content to clean Markdown format
 */

interface MarkdownOptions {
  preserveImages?: boolean
  imageBasePath?: string
  includeTitle?: boolean
  documentTitle?: string
}

/**
 * Converts HTML content from TipTap editor to Markdown
 */
export function htmlToMarkdown(html: string, options: MarkdownOptions = {}): string {
  const { preserveImages = true, includeTitle = false, documentTitle = '' } = options

  if (!html || typeof html !== 'string') {
    return ''
  }

  let markdown = html

  // Pre-process: Handle TipTap-specific structures
  // Tables
  markdown = convertTables(markdown)

  // Task lists (checkboxes)
  markdown = markdown.replace(
    /<li[^>]*data-type="taskItem"[^>]*data-checked="true"[^>]*>([\s\S]*?)<\/li>/gi,
    '- [x] $1\n'
  )
  markdown = markdown.replace(
    /<li[^>]*data-type="taskItem"[^>]*data-checked="false"[^>]*>([\s\S]*?)<\/li>/gi,
    '- [ ] $1\n'
  )
  markdown = markdown.replace(
    /<li[^>]*data-type="taskItem"[^>]*>([\s\S]*?)<\/li>/gi,
    '- [ ] $1\n'
  )

  // Code blocks with language
  markdown = markdown.replace(
    /<pre><code[^>]*class="[^"]*language-(\w+)[^"]*"[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
    '```$1\n$2\n```\n\n'
  )
  markdown = markdown.replace(
    /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
    '```\n$1\n```\n\n'
  )

  // Inline code
  markdown = markdown.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')

  // Headings (h1-h6)
  markdown = markdown.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n\n')
  markdown = markdown.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n\n')
  markdown = markdown.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n\n')
  markdown = markdown.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n\n')
  markdown = markdown.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n\n')
  markdown = markdown.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n\n')

  // Bold and italic combinations
  markdown = markdown.replace(/<strong><em>([\s\S]*?)<\/em><\/strong>/gi, '***$1***')
  markdown = markdown.replace(/<em><strong>([\s\S]*?)<\/strong><\/em>/gi, '***$1***')
  markdown = markdown.replace(/<b><i>([\s\S]*?)<\/i><\/b>/gi, '***$1***')
  markdown = markdown.replace(/<i><b>([\s\S]*?)<\/b><\/i>/gi, '***$1***')

  // Bold
  markdown = markdown.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
  markdown = markdown.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')

  // Italic
  markdown = markdown.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
  markdown = markdown.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')

  // Underline (not standard markdown, use HTML)
  markdown = markdown.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, '<u>$1</u>')

  // Strikethrough
  markdown = markdown.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, '~~$1~~')
  markdown = markdown.replace(/<strike[^>]*>([\s\S]*?)<\/strike>/gi, '~~$1~~')
  markdown = markdown.replace(/<del[^>]*>([\s\S]*?)<\/del>/gi, '~~$1~~')

  // Subscript and superscript
  markdown = markdown.replace(/<sub[^>]*>([\s\S]*?)<\/sub>/gi, '<sub>$1</sub>')
  markdown = markdown.replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, '<sup>$1</sup>')

  // Links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')

  // Images
  if (preserveImages) {
    markdown = markdown.replace(
      /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi,
      '![$2]($1)'
    )
    markdown = markdown.replace(
      /<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi,
      '![$1]($2)'
    )
    markdown = markdown.replace(
      /<img[^>]*src="([^"]*)"[^>]*\/?>/gi,
      '![]($1)'
    )
  } else {
    markdown = markdown.replace(/<img[^>]*alt="([^"]*)"[^>]*\/?>/gi, '[Image: $1]')
    markdown = markdown.replace(/<img[^>]*\/?>/gi, '[Image]')
  }

  // Blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
    const lines = content
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n')
      .split('\n')
      .filter((line: string) => line.trim())
      .map((line: string) => `> ${line.trim()}`)
      .join('\n')
    return lines + '\n\n'
  })

  // Horizontal rule
  markdown = markdown.replace(/<hr[^>]*\/?>/gi, '\n---\n\n')

  // Unordered lists
  markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    return processListItems(content, '-') + '\n'
  })

  // Ordered lists
  markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
    return processOrderedListItems(content) + '\n'
  })

  // Paragraphs
  markdown = markdown.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')

  // Line breaks
  markdown = markdown.replace(/<br[^>]*\/?>/gi, '\n')

  // Divs (just extract content)
  markdown = markdown.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, '$1\n')

  // Spans (just extract content)
  markdown = markdown.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '$1')

  // Remove any remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, '')

  // Decode HTML entities
  markdown = decodeHtmlEntities(markdown)

  // Clean up whitespace
  markdown = markdown.replace(/\n{3,}/g, '\n\n')
  markdown = markdown.trim()

  // Add title if requested
  if (includeTitle && documentTitle) {
    markdown = `# ${documentTitle}\n\n${markdown}`
  }

  return markdown
}

/**
 * Converts HTML tables to Markdown tables
 */
function convertTables(html: string): string {
  return html.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, tableContent) => {
    const rows: string[][] = []
    let headerRow: string[] | null = null

    // Extract header row
    const theadMatch = tableContent.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i)
    if (theadMatch) {
      const headerCells = theadMatch[1].match(/<th[^>]*>([\s\S]*?)<\/th>/gi)
      if (headerCells) {
        headerRow = headerCells.map((cell: string) =>
          cell.replace(/<th[^>]*>([\s\S]*?)<\/th>/i, '$1').replace(/<[^>]+>/g, '').trim()
        )
      }
    }

    // Extract body rows
    const tbodyMatch = tableContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
    const bodyContent = tbodyMatch ? tbodyMatch[1] : tableContent

    const rowMatches = bodyContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)
    if (rowMatches) {
      rowMatches.forEach((row: string) => {
        const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)
        if (cells) {
          const rowCells = cells.map((cell: string) =>
            cell.replace(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/i, '$1').replace(/<[^>]+>/g, '').trim()
          )
          // Check if this is a header row (first row without explicit thead)
          if (!headerRow && row.includes('<th')) {
            headerRow = rowCells
          } else {
            rows.push(rowCells)
          }
        }
      })
    }

    // Generate Markdown table
    if (!headerRow && rows.length > 0) {
      headerRow = rows.shift()!
    }

    if (!headerRow || headerRow.length === 0) {
      return ''
    }

    const colWidths = headerRow.map((_, i) => {
      const maxWidth = Math.max(
        headerRow![i]?.length || 0,
        ...rows.map(row => row[i]?.length || 0)
      )
      return Math.max(maxWidth, 3)
    })

    let markdown = '\n'
    markdown += '| ' + headerRow.map((cell, i) => cell.padEnd(colWidths[i])).join(' | ') + ' |\n'
    markdown += '| ' + colWidths.map(w => '-'.repeat(w)).join(' | ') + ' |\n'
    rows.forEach(row => {
      markdown += '| ' + row.map((cell, i) => (cell || '').padEnd(colWidths[i])).join(' | ') + ' |\n'
    })
    markdown += '\n'

    return markdown
  })
}

/**
 * Processes unordered list items
 */
function processListItems(content: string, bullet: string): string {
  const items: string[] = []
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let match

  while ((match = regex.exec(content)) !== null) {
    let itemContent = match[1]
    // Handle nested lists
    itemContent = itemContent.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, nested) => {
      return '\n' + processListItems(nested, bullet).split('\n').map(line => '  ' + line).join('\n')
    })
    itemContent = itemContent.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, nested) => {
      return '\n' + processOrderedListItems(nested).split('\n').map(line => '  ' + line).join('\n')
    })
    itemContent = itemContent.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1')
    itemContent = itemContent.replace(/<[^>]+>/g, '').trim()
    if (itemContent) {
      items.push(`${bullet} ${itemContent}`)
    }
  }

  return items.join('\n')
}

/**
 * Processes ordered list items
 */
function processOrderedListItems(content: string): string {
  const items: string[] = []
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let match
  let index = 1

  while ((match = regex.exec(content)) !== null) {
    let itemContent = match[1]
    // Handle nested lists
    itemContent = itemContent.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, nested) => {
      return '\n' + processListItems(nested, '-').split('\n').map(line => '   ' + line).join('\n')
    })
    itemContent = itemContent.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, nested) => {
      return '\n' + processOrderedListItems(nested).split('\n').map(line => '   ' + line).join('\n')
    })
    itemContent = itemContent.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1')
    itemContent = itemContent.replace(/<[^>]+>/g, '').trim()
    if (itemContent) {
      items.push(`${index}. ${itemContent}`)
      index++
    }
  }

  return items.join('\n')
}

/**
 * Decodes HTML entities to their character equivalents
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&ndash;': '-',
    '&mdash;': '--',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&hellip;': '...',
    '&copy;': '(c)',
    '&reg;': '(R)',
    '&trade;': '(TM)',
  }

  let decoded = text
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char)
  }

  // Handle numeric entities
  decoded = decoded.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
  decoded = decoded.replace(/&#x([a-fA-F0-9]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))

  return decoded
}

/**
 * Extracts plain text from HTML (strips all formatting)
 */
export function htmlToPlainText(html: string): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  let text = html

  // Replace block-level elements with newlines
  text = text.replace(/<\/?(p|div|h[1-6]|li|tr|blockquote)[^>]*>/gi, '\n')
  text = text.replace(/<br[^>]*\/?>/gi, '\n')
  text = text.replace(/<hr[^>]*\/?>/gi, '\n---\n')

  // Remove all remaining tags
  text = text.replace(/<[^>]+>/g, '')

  // Decode entities
  text = decodeHtmlEntities(text)

  // Clean up whitespace
  text = text.replace(/\n{3,}/g, '\n\n')
  text = text.replace(/[ \t]+/g, ' ')
  text = text.trim()

  return text
}

export default htmlToMarkdown
