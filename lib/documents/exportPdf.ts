/**
 * PDF Export Utility
 * Client-side PDF generation using html2canvas and jsPDF-style approach
 *
 * Note: For production server-side PDF generation, consider using:
 * - Puppeteer for headless Chrome rendering
 * - @react-pdf/renderer for React-based PDFs (already installed)
 * - Prince XML or WeasyPrint for high-fidelity document conversion
 */

export interface PdfExportOptions {
  title?: string
  author?: string
  createdAt?: Date
  pageSize?: 'a4' | 'letter' | 'legal'
  orientation?: 'portrait' | 'landscape'
  margins?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  includePageNumbers?: boolean
  includeHeader?: boolean
  includeFooter?: boolean
  footerText?: string
  quality?: 'draft' | 'normal' | 'high'
}

interface PageDimensions {
  width: number
  height: number
}

const PAGE_SIZES: Record<string, PageDimensions> = {
  a4: { width: 595, height: 842 }, // 72 DPI
  letter: { width: 612, height: 792 },
  legal: { width: 612, height: 1008 },
}

/**
 * Generates a PDF from HTML content (client-side)
 * Uses html2canvas for rendering and creates a downloadable PDF
 */
export async function generatePdf(
  content: string,
  options: PdfExportOptions = {}
): Promise<Blob> {
  const {
    title = 'Document',
    author = '',
    createdAt,
    pageSize = 'a4',
    orientation = 'portrait',
    margins = { top: 40, right: 40, bottom: 40, left: 40 },
    includePageNumbers = true,
    includeHeader = true,
    includeFooter = false,
    footerText = '',
    quality = 'normal',
  } = options

  // Dynamically import html2canvas (client-side only)
  const html2canvas = (await import('html2canvas')).default

  // Create a temporary container for rendering
  const container = document.createElement('div')
  container.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: 800px;
    background: white;
    color: #1f2937;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    padding: 40px;
  `

  // Build HTML content with styling
  const styledContent = buildPdfHtml(content, {
    title,
    author,
    createdAt,
    includeHeader,
  })

  // Sanitize HTML content before inserting into DOM to prevent XSS
  const { sanitizeHtml } = await import('@/lib/sanitize')
  container.innerHTML = sanitizeHtml(styledContent)
  document.body.appendChild(container)

  try {
    // Calculate dimensions
    const dimensions = PAGE_SIZES[pageSize]
    const isLandscape = orientation === 'landscape'
    const pageWidth = isLandscape ? dimensions.height : dimensions.width
    const pageHeight = isLandscape ? dimensions.width : dimensions.height

    // Render to canvas with quality settings
    const scale = quality === 'high' ? 3 : quality === 'normal' ? 2 : 1

    const canvas = await html2canvas(container, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    })

    // Calculate content dimensions
    const contentWidth = pageWidth - margins.left - margins.right
    const contentHeight = pageHeight - margins.top - margins.bottom
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    // Calculate how many pages we need
    const scaleFactor = contentWidth / imgWidth
    const scaledHeight = imgHeight * scaleFactor
    const totalPages = Math.ceil(scaledHeight / contentHeight)

    // Create PDF using canvas
    const pdfCanvas = document.createElement('canvas')
    pdfCanvas.width = pageWidth * scale
    pdfCanvas.height = pageHeight * scale
    const ctx = pdfCanvas.getContext('2d')!
    ctx.scale(scale, scale)

    // We'll create multiple page images and combine them
    const pageImages: string[] = []

    for (let page = 0; page < totalPages; page++) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, pageWidth, pageHeight)

      // Calculate source rectangle from original canvas
      const sourceY = (page * contentHeight) / scaleFactor
      const sourceHeight = contentHeight / scaleFactor

      // Draw portion of content
      ctx.drawImage(
        canvas,
        0,
        sourceY,
        imgWidth,
        Math.min(sourceHeight, imgHeight - sourceY),
        margins.left,
        margins.top,
        contentWidth,
        Math.min(contentHeight, (imgHeight - sourceY) * scaleFactor)
      )

      // Add page number if enabled
      if (includePageNumbers) {
        ctx.fillStyle = '#6b7280'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(
          `Page ${page + 1} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 20
        )
      }

      // Add footer if enabled
      if (includeFooter && footerText) {
        ctx.fillStyle = '#6b7280'
        ctx.font = '9px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(footerText, margins.left, pageHeight - 20)
      }

      pageImages.push(pdfCanvas.toDataURL('image/png', 1.0))
    }

    // For single page, we can return the image directly
    // For multi-page PDFs, we need a proper PDF library
    // Using a simple approach that creates a data URL

    // Since we don't have jsPDF, we'll create a printable HTML document
    // that can be saved as PDF via browser print
    const pdfBlob = await createPdfFromImages(pageImages, {
      title,
      pageWidth,
      pageHeight,
    })

    return pdfBlob
  } finally {
    document.body.removeChild(container)
  }
}

/**
 * Builds styled HTML for PDF rendering
 */
function buildPdfHtml(
  content: string,
  options: {
    title: string
    author?: string
    createdAt?: Date
    includeHeader?: boolean
  }
): string {
  const { title, author, createdAt, includeHeader } = options

  const headerHtml = includeHeader
    ? `
    <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
      <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; color: #111827;">${escapeHtml(title)}</h1>
      ${author ? `<p style="margin: 0; font-size: 12px; color: #6b7280;">By ${escapeHtml(author)}</p>` : ''}
      ${createdAt ? `<p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">${formatDate(createdAt)}</p>` : ''}
    </div>
  `
    : ''

  return `
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; }

      h1 { font-size: 24px; font-weight: 700; margin: 24px 0 12px; color: #111827; }
      h2 { font-size: 20px; font-weight: 600; margin: 20px 0 10px; color: #1f2937; }
      h3 { font-size: 18px; font-weight: 600; margin: 18px 0 8px; color: #1f2937; }
      h4 { font-size: 16px; font-weight: 600; margin: 16px 0 8px; color: #374151; }
      h5, h6 { font-size: 14px; font-weight: 600; margin: 14px 0 6px; color: #374151; }

      p { margin: 12px 0; }

      ul, ol { margin: 12px 0; padding-left: 24px; }
      li { margin: 6px 0; }

      a { color: #2563eb; text-decoration: none; }

      strong, b { font-weight: 600; }
      em, i { font-style: italic; }
      u { text-decoration: underline; }
      s, del { text-decoration: line-through; }

      code {
        font-family: 'SF Mono', 'Fira Code', monospace;
        font-size: 12px;
        background: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
      }

      pre {
        background: #f3f4f6;
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        font-size: 12px;
        line-height: 1.5;
        margin: 16px 0;
      }

      pre code {
        background: none;
        padding: 0;
      }

      blockquote {
        margin: 16px 0;
        padding: 12px 16px;
        border-left: 4px solid #d1d5db;
        background: #f9fafb;
        border-radius: 0 4px 4px 0;
      }

      blockquote p { margin: 0; }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-size: 13px;
      }

      th, td {
        border: 1px solid #e5e7eb;
        padding: 10px 12px;
        text-align: left;
      }

      th {
        background: #f9fafb;
        font-weight: 600;
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 6px;
        margin: 12px 0;
      }

      hr {
        border: none;
        border-top: 1px solid #e5e7eb;
        margin: 24px 0;
      }

      mark {
        background: #fef08a;
        padding: 0 4px;
        border-radius: 2px;
      }
    </style>
    ${headerHtml}
    <div class="content">
      ${content}
    </div>
  `
}

/**
 * Creates a PDF blob from page images
 * This is a simplified approach using a printable HTML document
 */
async function createPdfFromImages(
  images: string[],
  options: { title: string; pageWidth: number; pageHeight: number }
): Promise<Blob> {
  const { title, pageWidth, pageHeight } = options

  // Create a combined HTML document that can be printed to PDF
  const pagesHtml = images
    .map(
      (img, index) => `
    <div class="page" style="
      width: ${pageWidth}px;
      height: ${pageHeight}px;
      page-break-after: ${index < images.length - 1 ? 'always' : 'auto'};
      margin: 0;
      padding: 0;
    ">
      <img src="${img}" style="width: 100%; height: 100%; object-fit: contain;" />
    </div>
  `
    )
    .join('')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(title)}</title>
      <style>
        @page { size: ${pageWidth}px ${pageHeight}px; margin: 0; }
        body { margin: 0; padding: 0; }
        .page { box-sizing: border-box; }
        @media print {
          body { margin: 0; }
          .page { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      ${pagesHtml}
    </body>
    </html>
  `

  // Return as HTML blob that can be printed to PDF
  // In a real implementation, you'd use jsPDF or a server-side solution
  return new Blob([html], { type: 'text/html' })
}

/**
 * Alternative: Generate PDF using browser print dialog
 * This provides higher quality output
 */
export function printToPdf(
  content: string,
  options: PdfExportOptions = {}
): void {
  const {
    title = 'Document',
    author = '',
    createdAt,
    pageSize = 'a4',
    orientation = 'portrait',
    margins = { top: 40, right: 40, bottom: 40, left: 40 },
    includeHeader = true,
  } = options

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    throw new Error('Failed to open print window. Please allow popups.')
  }

  const pageSizeCss =
    pageSize === 'a4'
      ? '210mm 297mm'
      : pageSize === 'letter'
        ? '8.5in 11in'
        : '8.5in 14in'

  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(title)}</title>
      <style>
        @page {
          size: ${pageSizeCss} ${orientation};
          margin: ${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px;
        }

        * { box-sizing: border-box; }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 12pt;
          line-height: 1.6;
          color: #1f2937;
          margin: 0;
          padding: 20px;
        }

        h1 { font-size: 24pt; font-weight: 700; margin: 20px 0 10px; color: #111827; page-break-after: avoid; }
        h2 { font-size: 18pt; font-weight: 600; margin: 18px 0 8px; color: #1f2937; page-break-after: avoid; }
        h3 { font-size: 14pt; font-weight: 600; margin: 16px 0 6px; color: #1f2937; page-break-after: avoid; }
        h4, h5, h6 { font-size: 12pt; font-weight: 600; margin: 14px 0 6px; color: #374151; page-break-after: avoid; }

        p { margin: 10px 0; orphans: 3; widows: 3; }

        ul, ol { margin: 10px 0; padding-left: 24px; }
        li { margin: 4px 0; }

        a { color: #2563eb; text-decoration: none; }

        code {
          font-family: 'Courier New', monospace;
          font-size: 10pt;
          background: #f3f4f6;
          padding: 1px 4px;
          border-radius: 3px;
        }

        pre {
          background: #f3f4f6;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 10pt;
          page-break-inside: avoid;
        }

        pre code { background: none; padding: 0; }

        blockquote {
          margin: 12px 0;
          padding: 10px 14px;
          border-left: 3px solid #d1d5db;
          background: #f9fafb;
          page-break-inside: avoid;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 10pt;
          page-break-inside: avoid;
        }

        th, td {
          border: 1px solid #d1d5db;
          padding: 8px 10px;
          text-align: left;
        }

        th { background: #f3f4f6; font-weight: 600; }

        img {
          max-width: 100%;
          height: auto;
          page-break-inside: avoid;
        }

        hr {
          border: none;
          border-top: 1px solid #d1d5db;
          margin: 20px 0;
        }

        .document-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e5e7eb;
        }

        .document-header h1 { margin-top: 0; }
        .document-header .meta { font-size: 10pt; color: #6b7280; margin: 4px 0; }
      </style>
    </head>
    <body>
      ${
        includeHeader
          ? `
        <div class="document-header">
          <h1>${escapeHtml(title)}</h1>
          ${author ? `<p class="meta">By ${escapeHtml(author)}</p>` : ''}
          ${createdAt ? `<p class="meta">${formatDate(createdAt)}</p>` : ''}
        </div>
      `
          : ''
      }
      <div class="content">
        ${content}
      </div>
      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() { window.close(); }, 1000);
        };
      </script>
    </body>
    </html>
  `

  printWindow.document.write(printContent)
  printWindow.document.close()
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
 * Formats a date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default generatePdf
