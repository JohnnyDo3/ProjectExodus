import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
import { sanitizeFilename } from '@/lib/article/contentSecurity'

// Allow up to 12MB per chunk (10MB chunk + overhead)
export const runtime = 'nodejs'
export const maxDuration = 60

const UPLOAD_DIR = join(tmpdir(), 'article-uploads')
const MAX_CHUNK_SIZE = 12 * 1024 * 1024 // 12MB
const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.odt', '.rtf', '.html', '.htm', '.txt', '.md', '.tex', '.latex']

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
    const chunk = formData.get('chunk') as File | null
    const uploadId = formData.get('uploadId') as string
    const chunkIndexStr = formData.get('chunkIndex') as string
    const totalChunksStr = formData.get('totalChunks') as string
    const fileName = formData.get('fileName') as string

    // Validate required fields
    if (!chunk || !uploadId || !chunkIndexStr || !totalChunksStr || !fileName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const chunkIndex = parseInt(chunkIndexStr, 10)
    const totalChunks = parseInt(totalChunksStr, 10)

    // Validate numeric values
    if (isNaN(chunkIndex) || isNaN(totalChunks) || chunkIndex < 0 || totalChunks < 1 || chunkIndex >= totalChunks) {
      return NextResponse.json(
        { success: false, error: 'Invalid chunk parameters' },
        { status: 400 }
      )
    }

    // Validate upload ID format (timestamp-random)
    if (!/^\d+-[a-z0-9]+$/.test(uploadId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid upload ID' },
        { status: 400 }
      )
    }

    // Validate file extension
    const lowerName = fileName.toLowerCase()
    const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => lowerName.endsWith(ext))
    if (!hasValidExtension) {
      return NextResponse.json(
        { success: false, error: 'Unsupported file type. Supported: PDF, Word, RTF, HTML, TXT, Markdown, LaTeX, ODT.' },
        { status: 400 }
      )
    }

    // Validate chunk size
    if (chunk.size > MAX_CHUNK_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Chunk too large' },
        { status: 400 }
      )
    }

    // Create upload directory: /tmp/article-uploads/{userId}/{uploadId}/
    const safeUploadId = sanitizeFilename(uploadId)
    const userUploadDir = join(UPLOAD_DIR, session.user.id, safeUploadId)
    await mkdir(userUploadDir, { recursive: true })

    // Write chunk to disk
    const chunkBuffer = Buffer.from(await chunk.arrayBuffer())
    const chunkPath = join(userUploadDir, `chunk-${String(chunkIndex).padStart(6, '0')}`)
    await writeFile(chunkPath, chunkBuffer)

    // Write metadata on first chunk
    if (chunkIndex === 0) {
      const metadata = JSON.stringify({
        fileName: sanitizeFilename(fileName),
        totalChunks,
        userId: session.user.id,
        createdAt: Date.now(),
      })
      await writeFile(join(userUploadDir, 'metadata.json'), metadata)
    }

    return NextResponse.json({
      success: true,
      chunkIndex,
      received: true,
    })
  } catch (error) {
    console.error('Chunk upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload chunk' },
      { status: 500 }
    )
  }
}
