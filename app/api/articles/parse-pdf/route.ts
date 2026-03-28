import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { CONTENT_LIMITS } from '@/lib/article/contentSecurity'
import { PDFParse } from 'pdf-parse'

export const runtime = 'nodejs'
export const maxDuration = 120 // 2 minutes for large PDFs

export async function POST(request: NextRequest) {
  let parser: PDFParse | null = null

  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('pdf') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No PDF file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { success: false, error: 'File must be a PDF' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > CONTENT_LIMITS.MAX_PDF_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `PDF is too large (max ${CONTENT_LIMITS.MAX_PDF_FILE_SIZE / (1024 * 1024)}MB)` },
        { status: 400 }
      )
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Validate PDF magic bytes (%PDF-)
    if (buffer.length < 5 || buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
      return NextResponse.json(
        { success: false, error: 'File does not appear to be a valid PDF' },
        { status: 400 }
      )
    }

    // Parse PDF using pdf-parse v2 API
    parser = new PDFParse({ data: buffer })

    // Extract text — getText() returns TextResult { text, pages, total }
    const textResult = await parser.getText({
      lineEnforce: true,
      lineThreshold: 4.6,
      pageJoiner: '\n\n',
    })

    const text = textResult.text || ''
    const numPages = textResult.total || 0

    if (!text.trim()) {
      return NextResponse.json(
        { success: false, error: 'Could not extract text from PDF. The file may be image-only or corrupted. Try copying and pasting your content instead.' },
        { status: 400 }
      )
    }

    // Get metadata if available — sanitize string values to prevent XSS
    const info: Record<string, string> = {}
    try {
      const infoResult = await parser.getInfo()
      const rawInfo = infoResult.info || {}
      // Only extract known safe string fields, strip any HTML
      const safeFields = ['Title', 'Author', 'Subject', 'Creator', 'Producer']
      for (const field of safeFields) {
        if (rawInfo[field] && typeof rawInfo[field] === 'string') {
          info[field] = rawInfo[field].replace(/<[^>]*>/g, '').slice(0, 500)
        }
      }
    } catch {
      // Info extraction is optional
    }

    return NextResponse.json({
      success: true,
      data: {
        text,
        numPages,
        info,
      },
    })
  } catch (error) {
    console.error('PDF parse error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to parse PDF. Please try copying and pasting your content instead.' },
      { status: 500 }
    )
  } finally {
    // Clean up parser resources
    if (parser) {
      try {
        await parser.destroy()
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}
