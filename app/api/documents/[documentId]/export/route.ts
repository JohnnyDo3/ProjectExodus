import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { htmlToMarkdown, htmlToPlainText } from '@/lib/documents/exportMarkdown'
import { generateStandaloneHtml } from '@/lib/documents/exportHtml'
import { generateDocx } from '@/lib/documents/exportDocx'
import { sanitizeFilename, getFileExtension, getMimeType, type ExportFormat } from '@/lib/documents'

/**
 * GET /api/documents/[documentId]/export
 * Export a document in various formats
 *
 * Query params:
 * - format: 'pdf' | 'docx' | 'md' | 'html' | 'txt' (required)
 * - includeMetadata: 'true' | 'false' (optional, default true)
 * - theme: 'light' | 'dark' | 'auto' (optional, for HTML export)
 * - pageSize: 'a4' | 'letter' | 'legal' (optional, for PDF/DOCX)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { documentId } = await params
    const { searchParams } = new URL(req.url)

    const format = searchParams.get('format') as ExportFormat
    const includeMetadata = searchParams.get('includeMetadata') !== 'false'
    const theme = (searchParams.get('theme') as 'light' | 'dark' | 'auto') || 'light'
    const pageSize = (searchParams.get('pageSize') as 'a4' | 'letter' | 'legal') || 'a4'
    const includeTableOfContents = searchParams.get('toc') === 'true'

    // Validate format
    if (!format || !['pdf', 'docx', 'md', 'html', 'txt'].includes(format)) {
      return NextResponse.json(
        { success: false, error: 'Invalid export format. Supported: pdf, docx, md, html, txt' },
        { status: 400 }
      )
    }

    // Fetch document with permissions check
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            members: {
              where: { userId: session.user.id },
              select: { role: true },
            },
          },
        },
        collaborators: {
          where: { userId: session.user.id },
          select: { permission: true },
        },
      },
    })

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    // Check permissions
    const isCreator = document.creatorId === session.user.id
    const isMember = document.project.members.length > 0
    const collaborator = document.collaborators[0]
    const canView =
      isCreator ||
      collaborator ||
      isMember ||
      (document.isPublic && document.status === 'PUBLISHED')

    if (!canView) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to export this document' },
        { status: 403 }
      )
    }

    const content = document.content || ''
    const title = document.title || 'Untitled Document'
    const author = document.creator?.name || ''
    const createdAt = document.createdAt
    const updatedAt = document.updatedAt

    let blob: Blob
    let contentType: string
    let filename: string

    switch (format) {
      case 'md': {
        const markdown = htmlToMarkdown(content, {
          includeTitle: includeMetadata,
          documentTitle: title,
          preserveImages: true,
        })
        blob = new Blob([markdown], { type: 'text/markdown; charset=utf-8' })
        contentType = 'text/markdown'
        filename = `${sanitizeFilename(title)}.md`
        break
      }

      case 'txt': {
        let text = htmlToPlainText(content)
        if (includeMetadata) {
          const header = [
            title,
            '='.repeat(title.length),
            '',
            author ? `Author: ${author}` : '',
            createdAt ? `Created: ${createdAt.toLocaleDateString()}` : '',
            updatedAt ? `Updated: ${updatedAt.toLocaleDateString()}` : '',
            '',
            '-'.repeat(40),
            '',
          ]
            .filter(Boolean)
            .join('\n')
          text = header + text
        }
        blob = new Blob([text], { type: 'text/plain; charset=utf-8' })
        contentType = 'text/plain'
        filename = `${sanitizeFilename(title)}.txt`
        break
      }

      case 'html': {
        const html = generateStandaloneHtml(content, {
          title,
          author,
          createdAt,
          updatedAt,
          includeMetadata,
          includeTableOfContents,
          theme,
          pageSize,
        })
        blob = new Blob([html], { type: 'text/html; charset=utf-8' })
        contentType = 'text/html'
        filename = `${sanitizeFilename(title)}.html`
        break
      }

      case 'docx': {
        try {
          blob = await generateDocx(content, {
            title,
            author,
            createdAt,
            includeTableOfContents,
            pageSize,
          })
          contentType = getMimeType('docx')
          filename = `${sanitizeFilename(title)}.docx`
        } catch (error) {
          console.error('DOCX generation error:', error)
          return NextResponse.json(
            {
              success: false,
              error: 'Failed to generate Word document. The docx package may not be installed.',
            },
            { status: 500 }
          )
        }
        break
      }

      case 'pdf': {
        // PDF generation typically requires client-side rendering or a headless browser
        // Return HTML that can be printed to PDF, with instructions
        const pdfHtml = generateStandaloneHtml(content, {
          title,
          author,
          createdAt,
          updatedAt,
          includeMetadata,
          includeTableOfContents,
          theme: 'light',
          pageSize,
        })

        // Add print-optimized styles and auto-print script
        const printableHtml = pdfHtml.replace(
          '</body>',
          `
          <script>
            // For server-side PDF generation, use Puppeteer:
            // const puppeteer = require('puppeteer');
            // const browser = await puppeteer.launch();
            // const page = await browser.newPage();
            // await page.setContent(html);
            // await page.pdf({ path: 'output.pdf', format: 'A4' });

            // Client-side: trigger print dialog
            if (typeof window !== 'undefined') {
              window.onload = function() {
                window.print();
              };
            }
          </script>
          </body>`
        )

        blob = new Blob([printableHtml], { type: 'text/html; charset=utf-8' })
        contentType = 'text/html'
        filename = `${sanitizeFilename(title)}-print.html`

        // Note: For true PDF output, consider using:
        // 1. Puppeteer (server-side headless Chrome)
        // 2. @react-pdf/renderer (React-based PDF generation)
        // 3. pdf-lib (PDF manipulation library)
        // 4. External services like Browserless.io or API-based solutions
        break
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Unsupported export format' },
          { status: 400 }
        )
    }

    // Return the file as a download
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
    headers.set('Content-Length', blob.size.toString())

    return new NextResponse(blob, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export document' },
      { status: 500 }
    )
  }
}
