/**
 * Document Export Utilities
 * Central export point for all document export functionality
 */

export { htmlToMarkdown, htmlToPlainText } from './exportMarkdown'
export type { default as MarkdownOptions } from './exportMarkdown'

export { generateStandaloneHtml } from './exportHtml'
export type { HtmlExportOptions } from './exportHtml'

export { generatePdf, printToPdf } from './exportPdf'
export type { PdfExportOptions } from './exportPdf'

export { generateDocx } from './exportDocx'
export type { DocxExportOptions } from './exportDocx'

/**
 * Export format types
 */
export type ExportFormat = 'pdf' | 'docx' | 'md' | 'html' | 'txt'

/**
 * Unified export options
 */
export interface DocumentExportOptions {
  format: ExportFormat
  title?: string
  author?: string
  createdAt?: Date
  updatedAt?: Date

  // PDF-specific
  pageSize?: 'a4' | 'letter' | 'legal'
  orientation?: 'portrait' | 'landscape'
  margins?: { top: number; right: number; bottom: number; left: number }
  includePageNumbers?: boolean

  // HTML-specific
  theme?: 'light' | 'dark' | 'auto'
  includeMetadata?: boolean
  includeTableOfContents?: boolean

  // Markdown-specific
  preserveImages?: boolean
}

/**
 * Sanitizes a filename for download
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '') // Remove invalid characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .substring(0, 200) // Limit length
    || 'document' // Fallback
}

/**
 * Gets the file extension for an export format
 */
export function getFileExtension(format: ExportFormat): string {
  const extensions: Record<ExportFormat, string> = {
    pdf: 'pdf',
    docx: 'docx',
    md: 'md',
    html: 'html',
    txt: 'txt',
  }
  return extensions[format]
}

/**
 * Gets the MIME type for an export format
 */
export function getMimeType(format: ExportFormat): string {
  const mimeTypes: Record<ExportFormat, string> = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    md: 'text/markdown',
    html: 'text/html',
    txt: 'text/plain',
  }
  return mimeTypes[format]
}

/**
 * Triggers a file download in the browser
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
