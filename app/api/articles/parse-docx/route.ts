import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { CONTENT_LIMITS } from '@/lib/article/contentSecurity'
import mammoth from 'mammoth'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('docx') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No DOCX file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.docx')) {
      return NextResponse.json(
        { success: false, error: 'File must be a .docx file' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > CONTENT_LIMITS.MAX_DOCX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File is too large (max ${CONTENT_LIMITS.MAX_DOCX_FILE_SIZE / (1024 * 1024)}MB)` },
        { status: 400 }
      )
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Validate DOCX magic bytes (ZIP/PK signature)
    if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4B || buffer[2] !== 0x03 || buffer[3] !== 0x04) {
      return NextResponse.json(
        { success: false, error: 'File does not appear to be a valid .docx document' },
        { status: 400 }
      )
    }

    // Extract HTML from docx using mammoth
    const result = await mammoth.convertToHtml({ buffer })
    const html = result.value || ''

    // Also extract plain text for the paste area fallback
    const textResult = await mammoth.extractRawText({ buffer })
    const text = textResult.value || ''

    if (!text.trim()) {
      return NextResponse.json(
        { success: false, error: 'Could not extract text from document. The file may be empty or corrupted.' },
        { status: 400 }
      )
    }

    // Collect any conversion warnings
    const warnings = result.messages
      .filter(m => m.type === 'warning')
      .map(m => m.message)
      .slice(0, 10)

    return NextResponse.json({
      success: true,
      data: {
        text,
        html,
        warnings,
      },
    })
  } catch (error) {
    console.error('DOCX parse error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to parse document. Please try copying and pasting your content instead.' },
      { status: 500 }
    )
  }
}
