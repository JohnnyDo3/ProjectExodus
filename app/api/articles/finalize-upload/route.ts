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

// ---------------------------------------------------------------------------
// File type detection
// ---------------------------------------------------------------------------

type FileType = 'pdf' | 'docx' | 'rtf' | 'html' | 'text' | 'latex'

function getFileType(lowerName: string): FileType | null {
  const map: Record<string, FileType> = {
    '.pdf': 'pdf',
    '.docx': 'docx',
    '.rtf': 'rtf',
    '.html': 'html',
    '.htm': 'html',
    '.txt': 'text',
    '.md': 'text',
    '.tex': 'latex',
    '.latex': 'latex',
  }
  for (const [ext, type] of Object.entries(map)) {
    if (lowerName.endsWith(ext)) return type
  }
  return null
}

// ---------------------------------------------------------------------------
// Text format strippers
// ---------------------------------------------------------------------------

/** Strip HTML tags, keep text content */
function stripHtmlToText(html: string): string {
  return html
    // Remove script/style blocks entirely
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Convert block elements to newlines
    .replace(/<\/(?:p|div|h[1-6]|li|tr|br|hr)[^>]*>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // Strip remaining tags
    .replace(/<[^>]+>/g, '')
    // Decode common HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Strip RTF control words, keep text content */
function stripRtf(rtf: string): string {
  return rtf
    // Remove RTF header/groups
    .replace(/\{\\[^{}]*\}/g, '')
    // Remove control words (e.g., \par, \b, \fs24)
    .replace(/\\[a-z]+[0-9]*\s?/gi, ' ')
    // Remove escaped special chars
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    .replace(/\\\\/g, '\\')
    // Remove remaining braces
    .replace(/[{}]/g, '')
    // Convert \par to newlines
    .replace(/\\par\s*/gi, '\n')
    // Clean up whitespace
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Strip LaTeX commands, keep text content */
function stripLatex(latex: string): string {
  return latex
    // Remove comments
    .replace(/%.*$/gm, '')
    // Remove common preamble commands
    .replace(/\\(?:documentclass|usepackage|begin|end|maketitle|tableofcontents|newcommand|renewcommand|setlength|pagestyle|thispagestyle|bibliographystyle|bibliography)\b[^]*?(?:\n|$)/g, '\n')
    // Remove \begin{...} and \end{...} but keep content between
    .replace(/\\(?:begin|end)\{[^}]+\}/g, '')
    // Convert sectioning commands to plain text
    .replace(/\\(?:section|subsection|subsubsection|chapter|part)\*?\{([^}]+)\}/g, '\n\n$1\n\n')
    // Convert \title, \author, \date
    .replace(/\\(?:title|author|date)\{([^}]+)\}/g, '$1\n')
    // Convert formatting commands — keep content
    .replace(/\\(?:textbf|textit|emph|underline|textsc|texttt)\{([^}]+)\}/g, '$1')
    // Remove simple commands like \newpage, \clearpage, \noindent
    .replace(/\\(?:newpage|clearpage|noindent|bigskip|medskip|smallskip|hfill|vfill|centering|raggedright|raggedleft)\b/g, '')
    // Remove \label, \ref, \cite
    .replace(/\\(?:label|ref|cite|pageref|eqref)\{[^}]+\}/g, '')
    // Remove remaining unknown commands but keep content in braces
    .replace(/\\[a-zA-Z]+\{([^}]*)\}/g, '$1')
    // Remove remaining backslash commands
    .replace(/\\[a-zA-Z]+/g, '')
    // Remove math delimiters
    .replace(/\$\$?/g, '')
    // Clean up
    .replace(/[{}]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

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

    const info: Record<string, string> = {}
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
    const fileType = getFileType(lowerName)

    if (!fileType) {
      const lower = lowerName
      const friendly =
        lower.endsWith('.doc') ? 'Older .doc files aren\'t supported. Re-save as .docx, or paste the contents directly.' :
        lower.endsWith('.odt') ? 'OpenDocument (.odt) files aren\'t supported. Save as .docx or .pdf, or paste the contents directly.' :
        'Unsupported file type. Supported: PDF, Word (.docx), RTF, HTML, TXT, Markdown, LaTeX.'
      return NextResponse.json(
        { success: false, error: friendly },
        { status: 400 }
      )
    }

    // Assemble chunks into a single file
    const safeFileName = sanitizeFilename(fileName)
    const assembledPath = join(uploadDir, `assembled-${safeFileName}`)
    await assembleChunks(uploadDir, assembledPath, totalChunks)

    // Process based on file type
    let result: any

    if (fileType === 'text' || fileType === 'latex') {
      const { text } = await processTextFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'File appears to be empty' },
          { status: 400 }
        )
      }
      // Strip LaTeX commands for cleaner text
      const finalText = fileType === 'latex' ? stripLatex(text) : text
      result = { text: finalText }
    } else if (fileType === 'html') {
      const { text } = await processTextFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'File appears to be empty' },
          { status: 400 }
        )
      }
      const plainText = stripHtmlToText(text)
      result = { text: plainText, html: text }
    } else if (fileType === 'rtf') {
      const { text } = await processTextFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'File appears to be empty' },
          { status: 400 }
        )
      }
      const plainText = stripRtf(text)
      result = { text: plainText }
    } else if (fileType === 'pdf') {
      const { text, numPages, info } = await processPdfFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'Could not extract text from PDF. The file may be image-only or corrupted. Try copying and pasting your content directly.' },
          { status: 400 }
        )
      }
      result = { text, numPages, info }
    } else if (fileType === 'docx') {
      const { text, html, warnings } = await processDocxFile(assembledPath)
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: 'Could not extract text from document. The file may be empty or corrupted. Try pasting content directly.' },
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
