/**
 * Chunked File Upload Utility
 *
 * Splits large files into chunks and uploads them sequentially
 * with progress tracking and retry logic.
 */

const DEFAULT_CHUNK_SIZE = 10 * 1024 * 1024 // 10MB per chunk

export interface ChunkedUploadOptions {
  file: File
  chunkSize?: number
  onProgress?: (progress: UploadProgress) => void
  signal?: AbortSignal
}

export interface UploadProgress {
  phase: 'uploading' | 'processing'
  /** 0-100 percentage */
  percent: number
  /** Bytes uploaded so far */
  bytesUploaded: number
  /** Total file size in bytes */
  totalBytes: number
  /** Current chunk index (0-based) */
  currentChunk: number
  /** Total number of chunks */
  totalChunks: number
}

export interface ChunkedUploadResult {
  success: boolean
  data?: {
    text: string
    numPages?: number
    info?: Record<string, string>
    html?: string
    warnings?: string[]
  }
  error?: string
}

function generateUploadId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

async function uploadChunk(
  uploadId: string,
  chunk: Blob,
  chunkIndex: number,
  totalChunks: number,
  fileName: string,
  fileSize: number,
  signal?: AbortSignal,
  retries = 3
): Promise<void> {
  const formData = new FormData()
  formData.append('chunk', chunk)
  formData.append('uploadId', uploadId)
  formData.append('chunkIndex', String(chunkIndex))
  formData.append('totalChunks', String(totalChunks))
  formData.append('fileName', fileName)
  formData.append('fileSize', String(fileSize))

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch('/api/articles/upload-chunk', {
        method: 'POST',
        body: formData,
        signal,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Upload failed' }))
        throw new Error(data.error || `Chunk upload failed (${res.status})`)
      }

      return
    } catch (err: any) {
      if (err.name === 'AbortError') throw err
      if (attempt === retries) throw err
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
    }
  }
}

export async function chunkedUpload({
  file,
  chunkSize = DEFAULT_CHUNK_SIZE,
  onProgress,
  signal,
}: ChunkedUploadOptions): Promise<ChunkedUploadResult> {
  const uploadId = generateUploadId()
  const totalChunks = Math.ceil(file.size / chunkSize)

  // Upload all chunks
  for (let i = 0; i < totalChunks; i++) {
    if (signal?.aborted) {
      throw new DOMException('Upload cancelled', 'AbortError')
    }

    const start = i * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const chunk = file.slice(start, end)

    await uploadChunk(uploadId, chunk, i, totalChunks, file.name, file.size, signal)

    onProgress?.({
      phase: 'uploading',
      percent: Math.round(((i + 1) / totalChunks) * 90), // 0-90% for upload
      bytesUploaded: end,
      totalBytes: file.size,
      currentChunk: i,
      totalChunks,
    })
  }

  // Finalize: assemble and process
  onProgress?.({
    phase: 'processing',
    percent: 92,
    bytesUploaded: file.size,
    totalBytes: file.size,
    currentChunk: totalChunks,
    totalChunks,
  })

  const res = await fetch('/api/articles/finalize-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uploadId,
      fileName: file.name,
      totalChunks,
      fileSize: file.size,
    }),
    signal,
  })

  const data = await res.json()

  onProgress?.({
    phase: 'processing',
    percent: 100,
    bytesUploaded: file.size,
    totalBytes: file.size,
    currentChunk: totalChunks,
    totalChunks,
  })

  if (!data.success) {
    return { success: false, error: data.error }
  }

  return { success: true, data: data.data }
}

/** Format bytes to human-readable string */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}
