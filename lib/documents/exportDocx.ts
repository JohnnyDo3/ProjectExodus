/**
 * DOCX Export Utility
 * Generates Word documents from HTML content
 *
 * Uses the 'docx' npm package for document generation
 * Note: This package needs to be installed: npm install docx
 */

export interface DocxExportOptions {
  title?: string
  author?: string
  description?: string
  createdAt?: Date
  includeTableOfContents?: boolean
  pageSize?: 'a4' | 'letter' | 'legal'
  orientation?: 'portrait' | 'landscape'
}

interface ParsedElement {
  type: string
  content?: string
  children?: ParsedElement[]
  attrs?: Record<string, string>
  level?: number
  items?: ParsedElement[]
  ordered?: boolean
  checked?: boolean
}

/**
 * Generates a DOCX file from HTML content
 */
export async function generateDocx(
  content: string,
  options: DocxExportOptions = {}
): Promise<Blob> {
  // Dynamic import of docx library
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    Table,
    TableCell,
    TableRow,
    WidthType,
    BorderStyle,
    AlignmentType,
    ExternalHyperlink,
    ImageRun,
    TableOfContents,
    PageBreak,
  } = await import('docx')

  const {
    title = 'Document',
    author = '',
    description = '',
    createdAt,
    includeTableOfContents = false,
    pageSize = 'a4',
    orientation = 'portrait',
  } = options

  // Parse HTML to structured elements
  const elements = parseHtmlToElements(content)

  // Convert parsed elements to docx paragraphs
  const children: any[] = []

  // Add title
  children.push(
    new Paragraph({
      text: title,
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
    })
  )

  // Add metadata
  if (author || createdAt) {
    const metaParts: string[] = []
    if (author) metaParts.push(`Author: ${author}`)
    if (createdAt) metaParts.push(`Date: ${formatDate(createdAt)}`)

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: metaParts.join(' | '),
            size: 20,
            color: '666666',
            italics: true,
          }),
        ],
        spacing: { after: 400 },
      })
    )
  }

  // Add table of contents if requested
  if (includeTableOfContents) {
    children.push(
      new TableOfContents('Table of Contents', {
        hyperlink: true,
        headingStyleRange: '1-3',
      })
    )
    children.push(new Paragraph({ children: [new PageBreak()] }))
  }

  // Convert elements to docx
  for (const element of elements) {
    const docxElements = await elementToDocx(element, {
      Paragraph,
      TextRun,
      HeadingLevel,
      Table,
      TableCell,
      TableRow,
      WidthType,
      BorderStyle,
      AlignmentType,
      ExternalHyperlink,
      ImageRun,
    })
    children.push(...docxElements)
  }

  // Page size settings
  const pageSizes: Record<string, { width: number; height: number }> = {
    a4: { width: 11906, height: 16838 }, // twips (1/20 of a point)
    letter: { width: 12240, height: 15840 },
    legal: { width: 12240, height: 20160 },
  }

  const size = pageSizes[pageSize]

  // Create document
  const doc = new Document({
    creator: author || 'Project Exodus',
    title,
    description,
    sections: [
      {
        properties: {
          page: {
            size: {
              width: orientation === 'landscape' ? size.height : size.width,
              height: orientation === 'landscape' ? size.width : size.height,
              orientation: orientation === 'landscape' ? 'landscape' : 'portrait',
            },
            margin: {
              top: 1440, // 1 inch in twips
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  })

  // Generate blob
  const blob = await Packer.toBlob(doc)
  return blob
}

/**
 * Parses HTML string to structured elements
 */
function parseHtmlToElements(html: string): ParsedElement[] {
  if (!html || typeof html !== 'string') {
    return []
  }

  const elements: ParsedElement[] = []
  let remaining = html.trim()

  // Match block-level elements
  const blockRegex =
    /<(h[1-6]|p|div|blockquote|pre|ul|ol|table|hr|img|figure)([^>]*)>([\s\S]*?)<\/\1>|<(hr|br|img)([^>]*)\/?>/gi

  let match
  let lastIndex = 0

  while ((match = blockRegex.exec(html)) !== null) {
    // Handle text between elements
    if (match.index > lastIndex) {
      const textBetween = html.slice(lastIndex, match.index).trim()
      if (textBetween) {
        elements.push({ type: 'paragraph', content: textBetween })
      }
    }

    const tag = (match[1] || match[4]).toLowerCase()
    const attrs = parseAttributes(match[2] || match[5] || '')
    const content = match[3] || ''

    switch (tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        elements.push({
          type: 'heading',
          level: parseInt(tag[1], 10),
          content: stripHtml(content),
          attrs,
        })
        break

      case 'p':
      case 'div':
        elements.push({
          type: 'paragraph',
          content: content,
          attrs,
        })
        break

      case 'blockquote':
        elements.push({
          type: 'blockquote',
          content: stripHtml(content),
          attrs,
        })
        break

      case 'pre':
        elements.push({
          type: 'codeblock',
          content: stripHtml(content),
          attrs,
        })
        break

      case 'ul':
        elements.push({
          type: 'list',
          ordered: false,
          items: parseListItems(content),
          attrs,
        })
        break

      case 'ol':
        elements.push({
          type: 'list',
          ordered: true,
          items: parseListItems(content),
          attrs,
        })
        break

      case 'table':
        elements.push({
          type: 'table',
          content: content,
          attrs,
        })
        break

      case 'hr':
        elements.push({ type: 'hr', content: '' })
        break

      case 'img':
        elements.push({
          type: 'image',
          content: '',
          attrs,
        })
        break

      case 'figure':
        elements.push({
          type: 'figure',
          content: content,
          attrs,
        })
        break

      default:
        elements.push({
          type: 'paragraph',
          content: stripHtml(content),
        })
    }

    lastIndex = match.index + match[0].length
  }

  // Handle remaining text
  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex).trim()
    if (remaining) {
      elements.push({ type: 'paragraph', content: remaining })
    }
  }

  return elements
}

/**
 * Parses HTML attributes string to object
 */
function parseAttributes(attrsString: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const attrRegex = /(\w+)=["']([^"']*)["']/g
  let match

  while ((match = attrRegex.exec(attrsString)) !== null) {
    attrs[match[1]] = match[2]
  }

  return attrs
}

/**
 * Parses list items from HTML
 */
function parseListItems(html: string): ParsedElement[] {
  const items: ParsedElement[] = []
  const itemRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let match

  while ((match = itemRegex.exec(html)) !== null) {
    const content = match[1]
    const isTaskItem = match[0].includes('data-type="taskItem"')
    const isChecked = match[0].includes('data-checked="true"')

    items.push({
      type: 'listItem',
      content: stripHtml(content),
      checked: isTaskItem ? isChecked : undefined,
    })
  }

  return items
}

/**
 * Strips HTML tags from content
 */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

/**
 * Converts a parsed element to docx components
 */
async function elementToDocx(element: ParsedElement, docx: any): Promise<any[]> {
  const {
    Paragraph,
    TextRun,
    HeadingLevel,
    Table,
    TableCell,
    TableRow,
    WidthType,
    BorderStyle,
    AlignmentType,
    ExternalHyperlink,
  } = docx

  const headingLevels: Record<number, any> = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4,
    5: HeadingLevel.HEADING_5,
    6: HeadingLevel.HEADING_6,
  }

  switch (element.type) {
    case 'heading':
      return [
        new Paragraph({
          text: element.content,
          heading: headingLevels[element.level || 1],
          spacing: { before: 240, after: 120 },
        }),
      ]

    case 'paragraph':
      return [
        new Paragraph({
          children: parseInlineContent(element.content || '', docx),
          spacing: { after: 200 },
        }),
      ]

    case 'blockquote':
      return [
        new Paragraph({
          children: [
            new TextRun({
              text: element.content || '',
              italics: true,
              color: '666666',
            }),
          ],
          indent: { left: 720 }, // 0.5 inch
          border: {
            left: { style: BorderStyle.SINGLE, size: 24, color: 'CCCCCC' },
          },
          spacing: { before: 200, after: 200 },
        }),
      ]

    case 'codeblock':
      return [
        new Paragraph({
          children: [
            new TextRun({
              text: element.content || '',
              font: 'Courier New',
              size: 20,
            }),
          ],
          shading: { fill: 'F5F5F5' },
          spacing: { before: 200, after: 200 },
        }),
      ]

    case 'list':
      const listParagraphs: any[] = []
      const items = element.items || []
      items.forEach((item, index) => {
        const bullet = element.ordered ? `${index + 1}.` : '\u2022'
        const prefix = item.checked !== undefined ? (item.checked ? '\u2611' : '\u2610') : bullet

        listParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${prefix} ${item.content || ''}` }),
            ],
            indent: { left: 720 },
            spacing: { after: 100 },
          })
        )
      })
      return listParagraphs

    case 'table':
      return [parseTableToDocx(element.content || '', docx)]

    case 'hr':
      return [
        new Paragraph({
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' },
          },
          spacing: { before: 200, after: 200 },
        }),
      ]

    case 'image':
      // Note: Image handling would require fetching and embedding the image
      // For now, we'll add a placeholder
      const src = element.attrs?.src || ''
      const alt = element.attrs?.alt || 'Image'
      return [
        new Paragraph({
          children: [
            new TextRun({
              text: `[Image: ${alt}${src ? ` - ${src}` : ''}]`,
              italics: true,
              color: '666666',
            }),
          ],
          spacing: { before: 200, after: 200 },
        }),
      ]

    default:
      return [
        new Paragraph({
          text: element.content || '',
          spacing: { after: 200 },
        }),
      ]
  }
}

/**
 * Parses inline HTML content to TextRun elements
 */
function parseInlineContent(html: string, docx: any): any[] {
  const { TextRun, ExternalHyperlink } = docx
  const runs: any[] = []

  // Simple inline parsing - handles basic formatting
  let content = html
  const segments: { text: string; bold?: boolean; italic?: boolean; underline?: boolean; strike?: boolean; code?: boolean; link?: string }[] = []

  // Process inline tags
  const processText = (text: string, styles: any = {}) => {
    if (text.trim()) {
      segments.push({ text: text.replace(/<[^>]+>/g, ''), ...styles })
    }
  }

  // Extract and process formatted text
  let remaining = content

  // Handle links
  remaining = remaining.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    segments.push({ text: stripHtmlBasic(text), link: href })
    return ''
  })

  // Handle bold
  remaining = remaining.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, text) => {
    segments.push({ text: stripHtmlBasic(text), bold: true })
    return ''
  })

  // Handle italic
  remaining = remaining.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, text) => {
    segments.push({ text: stripHtmlBasic(text), italic: true })
    return ''
  })

  // Handle underline
  remaining = remaining.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, (_, text) => {
    segments.push({ text: stripHtmlBasic(text), underline: true })
    return ''
  })

  // Handle strikethrough
  remaining = remaining.replace(/<(s|strike|del)[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, text) => {
    segments.push({ text: stripHtmlBasic(text), strike: true })
    return ''
  })

  // Handle inline code
  remaining = remaining.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, text) => {
    segments.push({ text: stripHtmlBasic(text), code: true })
    return ''
  })

  // Handle remaining text
  const cleanRemaining = stripHtmlBasic(remaining)
  if (cleanRemaining.trim()) {
    // Insert at beginning since we processed special elements first
    segments.unshift({ text: cleanRemaining })
  }

  // Convert segments to TextRuns
  for (const segment of segments) {
    if (segment.link) {
      runs.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: segment.text,
              color: '2563EB',
              underline: {},
            }),
          ],
          link: segment.link,
        })
      )
    } else {
      runs.push(
        new TextRun({
          text: segment.text,
          bold: segment.bold,
          italics: segment.italic,
          underline: segment.underline ? {} : undefined,
          strike: segment.strike,
          font: segment.code ? 'Courier New' : undefined,
          shading: segment.code ? { fill: 'F5F5F5' } : undefined,
        })
      )
    }
  }

  // Return at least one empty run if nothing was parsed
  if (runs.length === 0) {
    const plainText = stripHtmlBasic(html)
    if (plainText.trim()) {
      runs.push(new TextRun({ text: plainText }))
    }
  }

  return runs
}

/**
 * Basic HTML stripping
 */
function stripHtmlBasic(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/**
 * Parses HTML table to docx Table
 */
function parseTableToDocx(tableHtml: string, docx: any): any {
  const { Table, TableCell, TableRow, WidthType, BorderStyle, Paragraph, TextRun } = docx

  const rows: any[] = []

  // Extract rows
  const rowMatches = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || []

  for (const rowHtml of rowMatches) {
    const cells: any[] = []
    const cellMatches = rowHtml.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi) || []
    const isHeader = rowHtml.includes('<th')

    for (const cellHtml of cellMatches) {
      const content = stripHtml(cellHtml.replace(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/i, '$1'))

      cells.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: content,
                  bold: isHeader,
                }),
              ],
            }),
          ],
          shading: isHeader ? { fill: 'F3F4F6' } : undefined,
        })
      )
    }

    if (cells.length > 0) {
      rows.push(new TableRow({ children: cells }))
    }
  }

  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
    },
  })
}

/**
 * Formats a date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default generateDocx
