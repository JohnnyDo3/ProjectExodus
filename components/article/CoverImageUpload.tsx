'use client'

import { useState, useCallback } from 'react'
import { ImagePlus, X, Upload, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface CoverImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function CoverImageUpload({
  value,
  onChange,
}: CoverImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null)
      setIsUploading(true)

      try {
        // Validate file
        if (!file.type.startsWith('image/')) {
          throw new Error('Please upload an image file')
        }

        if (file.size > 4 * 1024 * 1024) {
          throw new Error('Image must be less than 4MB')
        }

        // Convert to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = e => resolve(e.target?.result as string)
          reader.onerror = () => reject(new Error('Failed to read file'))
          reader.readAsDataURL(file)
        })

        // Upload to Cloudinary via our API
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, folder: 'article-covers' }),
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Upload failed')
        }

        onChange(data.data.url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setIsUploading(false)
      }
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleUpload(file)
      }
    },
    [handleUpload]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleUpload(file)
      }
    },
    [handleUpload]
  )

  const handleUrlInput = useCallback(() => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      onChange(url)
    }
  }, [onChange])

  const handleRemove = useCallback(() => {
    onChange('')
    setError(null)
  }, [onChange])

  if (value) {
    return (
      <div className="cover-preview">
        <div className="preview-image-container">
          <Image
            src={value}
            alt="Cover preview"
            fill
            className="preview-image"
            style={{ objectFit: 'cover' }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="remove-button"
            aria-label="Remove image"
          >
            <X size={20} />
          </button>
        </div>

        <style jsx>{`
          .cover-preview {
            width: 100%;
          }

          .preview-image-container {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border);
          }

          .preview-image-container :global(.preview-image) {
            transition: transform 0.3s ease;
          }

          .preview-image-container:hover :global(.preview-image) {
            transform: scale(1.02);
          }

          .remove-button {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(4px);
          }

          .remove-button:hover {
            background: rgba(239, 68, 68, 0.9);
            transform: scale(1.1);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="cover-upload">
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isUploading ? (
          <div className="upload-loading">
            <div className="loading-spinner"></div>
            <p>Uploading to Cloudinary...</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <ImagePlus size={48} strokeWidth={1.5} />
            </div>
            <p className="upload-text">
              Drag and drop an image here, or click to browse
            </p>
            <p className="upload-hint">Recommended: 1200 x 675px (16:9 ratio)</p>

            <div className="upload-actions">
              <label className="upload-button primary">
                <Upload size={18} />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden-input"
                />
              </label>
              <button
                type="button"
                onClick={handleUrlInput}
                className="upload-button secondary"
              >
                Use URL
              </button>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="upload-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <style jsx>{`
        .cover-upload {
          width: 100%;
        }

        .upload-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 24px;
          background: var(--muted);
          border: 2px dashed var(--border);
          border-radius: 12px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .upload-zone.dragging {
          border-color: var(--primary);
          background: rgba(var(--primary-rgb), 0.05);
        }

        .upload-zone.uploading {
          opacity: 0.7;
          pointer-events: none;
        }

        .upload-icon {
          color: var(--muted-foreground);
        }

        .upload-text {
          font-size: 16px;
          font-weight: 500;
          color: var(--foreground);
          margin: 0;
        }

        .upload-hint {
          font-size: 13px;
          color: var(--muted-foreground);
          margin: 0;
        }

        .upload-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .upload-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .upload-button.primary {
          background: var(--primary);
          color: white;
          border: none;
        }

        .upload-button.primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .upload-button.secondary {
          background: transparent;
          color: var(--foreground);
          border: 1px solid var(--border);
        }

        .upload-button.secondary:hover {
          background: var(--muted);
        }

        .hidden-input {
          display: none;
        }

        .upload-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--muted);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .upload-loading p {
          margin: 0;
          color: var(--muted-foreground);
        }

        .upload-error {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 12px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-radius: 8px;
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .upload-zone {
            padding: 32px 16px;
          }

          .upload-actions {
            flex-direction: column;
            width: 100%;
          }

          .upload-button {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
