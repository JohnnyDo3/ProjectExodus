import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { readFile, readdir, unlink, rmdir, stat } from 'fs/promises'
import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import { pipeline } from 'stream/promises'
import { sanitizeFilename, CONTENT_LIMITS } from '@/lib/article/contentSecurity'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5 minutes for processing large files

const UPLOAD_DIR = join(tmpdir(), 'article-uploads')

interface FinalizeRequest {
  uploadId: string
  fileName: string
  totalChunks: number
  fileSize: number
}

async function assembleChunks(chunksDir: string, outputPath: string, totalChunks: number): Promise<void> {
  const writeStream = createWriteStream(outputPath)

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = join(chunksDir, `chunk-${String(i).padStart(6, '0')}`)
    const readStream = createReadStream(chunkPath)
    await pipeline(readStream, writeStream, { end: false })
  }

  writeStream.end()
  await new Promise<void>((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
}

async function cleanupUpload(dirPath: string): Promise<void> {
  try {
    const files = await readdir(dirPath)
    await Promise.all(files.map(f => unlink(join(dirPath, f))))
    await rmdir(dirPath)
  } catch {
    // Ignore cleanup errors
  }
}

async function processTextFile(filePath: string): Promise<{ text: string }> {
  // Stream-read text file in chunks to avoid loading entire file into memory
  const fileStats = await stat(filePath)
  // For text extraction, read up to MAX_CONTENT_LENGTH characters
  const maxBytes = CONTENT_LIMITS.MAX_CONTENT_LENGTH
  const readSize = Math.min(fileStats.size, maxBytes)

  const buffer = Buffer.alloc(readSize)
  const stream = createReadStream(filePath, { start: 0, end: readSize - 1 })
  let offset = 0

  for await (const chunk of stream) {
    const buf = chunk as Buffer
    buf.copy(buffer, offset)
    offset += buf.length
  }

  return { text: buffer.toString('utf-8', 0, offset) }
}

async function processPdfFile(filePath: string): Promise<{
  text: string
  numPages: number
  info: Record<string, string>
}> {
  // pdf-parse requires the full buffer - read from assembled file
  const { PDFParse } = await import('pdf-parse')
  const buffer = await readFile(filePath)

  // Validate PDF magic bytes
  if (buffer.length < 5 || buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
    throw new Error('File does not appear to be a valid PDF')
  }

  const parser = new PDFParse({ data: buffer })

  try {
    const textResult = await parser.getText({
      lineEnforce: true,
      lineThreshold: 4.6,
      pageJoiner: '\n\n',
    })

    const text = textResult.text || ''
    const numPages = textResult.total || 0

    let info: Record<string, string> = {}
    try {
      const infoResult = await parser.getInfo()
      const rawInfo = infoResult.info || {}
      const safeFields = ['Title', 'Author', 'Subject', 'Creator', 'Producer']
      for (const field of safeFields) {
        if (rawInfo[field] && typeof rawInfo[field] === 'string') {
          info[field] = rawInfo[field].replace(/<[^>]*>/g, '').slice(0, 500)
        }
      }
    } catch {
      // Info extraction is optional
    }

    return { text, numPages, info }
  } finally {
    try {
      await parser.destroy()
    } catch {
      // Ignore cleanup errors
    }
  }
}

async function processDocxFile(filePath: string): Promise<{
  text: string
  html: string
  warnings: string[]
}> {
  const mammoth = await import('mammoth')
  const buffer = await readFile(filePath)

  // Validate DOCX magic bytes (ZIP/PK signature)
  if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4B || buffer[2] !== 0x03 || buffer[3] !== 0x04) {
    throw new Error('File does not appear to be a valid .docx document')
  }

  const result = await mammoth.convertToHtml({ buffer })
  const html = result.value || ''

  const textResult = await mammoth.extractRawText({ buffer })
  const text = textResult.value || ''

  const warnings = result.messages
    .filter((m: any) => m.type === 'warning')
    .map((m: any) => m.message)
    .slice(0, 10)

  return { text, html, warnings }
}

export async function POST(request: NextRequest) {
  let uploadDir = ''

  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: FinalizeRequest = await request.json()
    const { uploadId, fileName, totalChunks, fileSize } = body

    // Validate inputs
    if (!uploadId || !fileName || !totalChunks) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!/^\d+-[a-z0-9]+$/.test(uploadId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid upload ID' },
        { status: 400 }
      )
    }

    const safeUploadId = sanitizeFilename(uploadId)
    uploadDir = join(UPLOAD_DIR, session.user.id, safeUploadId)

    // Verify metadata exists
    let metadata: any
    try {
      const metaRaw = await readFile(join(uploadDir, 'metadata.json'), 'utf-8')
      metadata = JSON.parse(metaRaw)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Upload not found or expired' },
        { status: 404 }
      )
    }

    // Verify user owns this upload
    if (metadata.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Verify all chunks are present
    const files = await readdir(uploadDir)
    const chunkFiles = files.filter(f => f.startsWith('chunk-'))
    if (chunkFiles.length !== totalChunks) {
      return NextResponse.json(
        { success: false, error: `Missing chunks: expected ${totalChunks}, found ${chunkFiles.length}` },
        { status: 400 }
      )
    }

    // Determine file type
    const lowerName = fileName.toLowerCase()
    const isPdf = lowerName.endsWith('.pdf')
    const isDocx = lowerName.endsWith('.docx')
    const isText = lowerName.endsWith('.txt') || lowerName.endsWith('.md')

    if (!isPdf && !isDocx && !isText) {
      return NextResponse.json(
        { success: false, error: 'Unsupported file type' },
        { status: 400 }
      )
    }

    // Assemble chunks into a single file
    const safeFileName = sanitizeFilename(fileName)
    const assembledPath = join(uploadDir, `assembled-${safeFileName}`)
    await assembleChunks(uploadDir, assembledPath, totalChunks)

    // Process based on file type
    let result: any

    if (isText) {
      const { text } = await processTextFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'File appears to be empty' },
          { status: 400 }
        )
      }
      result = { text }
    } else if (isPdf) {
      const { text, numPages, info } = await processPdfFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'Could not extract text from PDF. The file may be image-only or corrupted.' },
          { status: 400 }
        )
      }
      result = { text, numPages, info }
    } else if (isDocx) {
      const { text, html, warnings } = await processDocxFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'Could not extract text from document. The file may be empty or corrupted.' },
          { status: 400 }
        )
      }
      result = { text, html, warnings }
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error('Finalize upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process file' },
      { status: 500 }
    )
  } finally {
    // Clean up uploaded chunks
    if (uploadDir) {
      cleanupUpload(uploadDir).catch(() => {})
    }
  }
}
