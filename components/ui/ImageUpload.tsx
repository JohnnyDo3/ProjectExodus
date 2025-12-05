'use client'

import { useState, useCallback, useRef } from 'react'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { Button } from './Button'
import { Card, CardContent } from './Card'

interface ImageUploadProps {
  onUpload: (files: File[]) => void
  maxFiles?: number
  maxSizeInMB?: number
  acceptedFormats?: string[]
  existingImages?: Array<{ url: string; alt?: string }>
  onRemove?: (url: string) => void
  className?: string
}

export function ImageUpload({
  onUpload,
  maxFiles = 5,
  maxSizeInMB = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  existingImages = [],
  onRemove,
  className = ''
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return

    setError(null)
    const fileArray = Array.from(files)

    // Validate number of files
    const totalFiles = existingImages.length + previews.length + fileArray.length
    if (totalFiles > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`)
      return
    }

    // Validate file types and sizes
    const validFiles: File[] = []
    for (const file of fileArray) {
      if (!acceptedFormats.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Accepted: JPEG, PNG, WebP, GIF`)
        continue
      }

      const sizeInMB = file.size / (1024 * 1024)
      if (sizeInMB > maxSizeInMB) {
        setError(`File too large: ${file.name}. Maximum ${maxSizeInMB}MB`)
        continue
      }

      validFiles.push(file)
    }

    if (validFiles.length === 0) return

    // Create previews
    const newPreviews: string[] = []
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        if (newPreviews.length === validFiles.length) {
          setPreviews(prev => [...prev, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })

    onUpload(validFiles)
  }, [existingImages.length, previews.length, maxFiles, acceptedFormats, maxSizeInMB, onUpload])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const handleRemovePreview = useCallback((index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-4 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-[var(--primary)] bg-[var(--muted)] scale-105'
            : 'border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--primary)] flex items-center justify-center shadow-xl">
            <Upload className="w-10 h-10 text-white" />
          </div>

          <div>
            <h3 className="text-2xl font-black mb-2 text-[var(--foreground)]">
              UPLOAD IMAGES
            </h3>
            <p className="text-base font-bold text-[var(--muted-foreground)]">
              Drag and drop or click to browse
            </p>
          </div>

          <div className="text-sm font-semibold text-[var(--muted-foreground)]">
            <p>Maximum {maxFiles} files • Up to {maxSizeInMB}MB each</p>
            <p>JPEG, PNG, WebP, or GIF</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-4 border-[var(--destructive)] bg-[var(--muted)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[var(--destructive)] flex-shrink-0" />
              <p className="text-base font-bold text-[var(--destructive)]">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-[var(--destructive)] hover:opacity-80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="text-lg font-black mb-4 text-[var(--foreground)]">
            EXISTING IMAGES ({existingImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImages.map((img, index) => (
              <Card
                key={index}
                className="relative group overflow-hidden border-4 border-[var(--border)] hover:border-[var(--primary)] transition-all"
              >
                <div className="aspect-square relative">
                  <img
                    src={img.url}
                    alt={img.alt || `Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {onRemove && (
                    <button
                      onClick={() => onRemove(img.url)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--destructive)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:opacity-90"
                      aria-label="Remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New Image Previews */}
      {previews.length > 0 && (
        <div>
          <h4 className="text-lg font-black mb-4 text-[var(--foreground)]">
            NEW IMAGES ({previews.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <Card
                key={index}
                className="relative group overflow-hidden border-4 border-[var(--border)] hover:border-[var(--primary)] transition-all"
              >
                <div className="aspect-square relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemovePreview(index)
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--destructive)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:opacity-90"
                    aria-label="Remove preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 text-white font-black text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    NEW
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upload Summary */}
      <div className="flex items-center justify-between text-sm font-bold text-[var(--muted-foreground)]">
        <div>
          {existingImages.length + previews.length} of {maxFiles} images
        </div>
        {previews.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviews([])}
            className="border-2"
          >
            Clear New Images
          </Button>
        )}
      </div>
    </div>
  )
}
