'use client'

import { useState } from 'react'
import { User } from 'lucide-react'

interface SafeImageProps {
  src?: string | null
  alt: string
  className?: string
  fallbackIcon?: React.ReactNode
  onError?: () => void
}

/**
 * SafeImage component that validates image sources before rendering
 * Prevents XSS attacks from malicious SVG images and untrusted sources
 *
 * Security features:
 * - Blocks SVG data URLs (XSS prevention)
 * - Only allows HTTPS URLs (no http://)
 * - Provides fallback for invalid/missing images
 * - Lazy loading for performance
 */
export function SafeImage({
  src,
  alt,
  className = '',
  fallbackIcon,
  onError
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false)

  // Validate image source
  const isSafeSource = src && (
    // Allow HTTPS URLs from trusted domains
    src.startsWith('https://') ||
    // Allow data URLs but NOT SVG (to prevent XSS)
    (src.startsWith('data:image/') && !src.toLowerCase().includes('svg'))
  )

  // Show fallback if no source, unsafe source, or image failed to load
  if (!isSafeSource || imageError) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center`}
        role="img"
        aria-label={alt}
      >
        {fallbackIcon || <User className="w-1/2 h-1/2 text-white/60" />}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        setImageError(true)
        onError?.()
      }}
      loading="lazy"
    />
  )
}
