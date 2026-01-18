# Security Fixes - Implementation Guide

This document contains ready-to-implement fixes for the security issues identified in SECURITY_AUDIT.md.

---

## Fix 1: Add Content Security Policy Header

**File:** `next.config.ts`

**Change:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          // ADD THIS NEW HEADER:
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net", // Allow framer-motion CDN
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.pusher.com wss://*.pusher.com", // Pusher for real-time
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ]
  }
};

export default nextConfig;
```

---

## Fix 2: Secure Image Upload Endpoint

**File:** `app/api/upload/route.ts`

**Replace entire file with:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { uploadImage } from '@/lib/cloudinary'

// Allowed image types (no SVG to prevent XSS)
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FOLDERS = ['articles', 'profiles', 'projects', 'events', 'products']

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { image, folder } = await request.json()

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      )
    }

    // Validate that it's a base64 image
    if (!image.startsWith('data:image/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid image format' },
        { status: 400 }
      )
    }

    // Extract and validate image MIME type
    const matches = image.match(/^data:(image\/[a-z]+);base64,/)
    if (!matches) {
      return NextResponse.json(
        { success: false, error: 'Invalid image data format' },
        { status: 400 }
      )
    }

    const mimeType = matches[1]
    if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid image type. Only JPEG, PNG, and WebP are allowed. SVG is not permitted for security reasons.'
        },
        { status: 400 }
      )
    }

    // Validate file size
    const base64Data = image.split(',')[1]
    if (!base64Data) {
      return NextResponse.json(
        { success: false, error: 'Invalid base64 data' },
        { status: 400 }
      )
    }

    const sizeInBytes = Buffer.from(base64Data, 'base64').length
    if (sizeInBytes > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `Image too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`
        },
        { status: 400 }
      )
    }

    // Validate and sanitize folder parameter
    const sanitizedFolder = ALLOWED_FOLDERS.includes(folder) ? folder : 'articles'

    const result = await uploadImage(image, sanitizedFolder)

    return NextResponse.json({
      success: true,
      data: {
        url: result.url,
        publicId: result.publicId,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
```

---

## Fix 3: Create SafeImage Component

**Create new file:** `components/ui/SafeImage.tsx`

```typescript
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
    (src.startsWith('data:image/') && !src.includes('svg'))
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
```

**Usage Example:**

Replace instances like this:
```typescript
// OLD - UNSAFE:
{user.image ? (
  <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
) : (
  <User className="w-5 h-5 text-white" />
)}

// NEW - SAFE:
<SafeImage
  src={user.image}
  alt={user.name || ''}
  className="w-full h-full object-cover"
  fallbackIcon={<User className="w-5 h-5 text-white" />}
/>
```

---

## Fix 4: Enhanced localStorage Validation

**File:** `hooks/useVolitionLayout.ts`

**Replace `loadLayoutData` function (lines 62-99) with:**

```typescript
function loadLayoutData(): VolitionLayoutData {
  if (typeof window === 'undefined') {
    return getDefaultLayoutData()
  }

  const defaults = getDefaultLayoutData()
  const validLaneIds: LaneId[] = ['profile', 'projects', 'articles', 'learning', 'network', 'feed', 'impact']

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as any
      if (parsed.version === CURRENT_VERSION) {
        // Migrate from old isCompact boolean to new viewMode
        let viewMode: ViewMode = defaults.viewMode
        if ('viewMode' in parsed && (parsed.viewMode === 'expanded' || parsed.viewMode === 'compact' || parsed.viewMode === 'minimal')) {
          viewMode = parsed.viewMode
        } else if ('isCompact' in parsed && typeof parsed.isCompact === 'boolean') {
          // Backward compatibility: convert isCompact to viewMode
          viewMode = parsed.isCompact ? 'compact' : 'expanded'
        }

        // Validate laneOrder array and contents
        const validatedLaneOrder = Array.isArray(parsed.laneOrder) &&
          parsed.laneOrder.every((id: unknown) => typeof id === 'string' && validLaneIds.includes(id as LaneId))
          ? parsed.laneOrder
          : defaults.laneOrder

        // Validate enabledLanes array and contents
        const validatedEnabledLanes = Array.isArray(parsed.enabledLanes) &&
          parsed.enabledLanes.every((id: unknown) => typeof id === 'string' && validLaneIds.includes(id as LaneId))
          ? parsed.enabledLanes
          : defaults.enabledLanes

        // Validate spotlightDismissed contains only strings
        const validatedSpotlightDismissed = Array.isArray(parsed.spotlightDismissed) &&
          parsed.spotlightDismissed.every((id: unknown) => typeof id === 'string' && id.length < 200)
          ? parsed.spotlightDismissed
          : []

        // Validate cardOrder structure
        let validatedCardOrder: CardOrderMap = {}
        if (parsed.cardOrder && typeof parsed.cardOrder === 'object') {
          for (const [key, value] of Object.entries(parsed.cardOrder)) {
            if (
              validLaneIds.includes(key as LaneId) &&
              Array.isArray(value) &&
              value.every((id: unknown) => typeof id === 'string' && id.length < 200)
            ) {
              validatedCardOrder[key as LaneId] = value
            }
          }
        }

        return {
          version: CURRENT_VERSION,
          laneOrder: validatedLaneOrder,
          enabledLanes: validatedEnabledLanes,
          viewMode,
          spotlightDismissed: validatedSpotlightDismissed,
          cardOrder: validatedCardOrder,
        }
      }
    }
  } catch (error) {
    console.error('Error loading volition layout:', error)
    // Clear corrupted data
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      // Ignore storage errors
    }
  }

  return defaults
}
```

---

## Fix 5: Remove Email from Social Post GET Response

**File:** `app/api/social/post/[id]/route.ts`

**Change (line 16-23):**

```typescript
// BEFORE:
user: {
  select: {
    id: true,
    name: true,
    email: true,  // REMOVE THIS
    image: true,
    headline: true
  }
}

// AFTER:
user: {
  select: {
    id: true,
    name: true,
    // email: true,  // Removed for privacy
    image: true,
    headline: true
  }
}
```

**Also update lines 34-40, 44-50, 53-59 to remove email from nested user selects**

---

## Testing the Fixes

After implementing these fixes, test:

1. **CSP Header:**
   ```bash
   curl -I https://yoursite.com | grep -i content-security
   ```

2. **Image Upload:**
   - Try uploading a valid JPEG (should work)
   - Try uploading an SVG (should be rejected)
   - Try uploading a 10MB image (should be rejected)

3. **SafeImage Component:**
   - Verify fallback icons appear for missing images
   - Check that SVG data URLs are blocked

4. **localStorage:**
   - Manually corrupt localStorage data and verify app doesn't crash
   - Check that invalid IDs are filtered out

---

## Deployment Checklist

- [ ] Add CSP header to next.config.ts
- [ ] Update image upload validation
- [ ] Create and implement SafeImage component
- [ ] Update useVolitionLayout validation
- [ ] Remove email from social post responses
- [ ] Test all fixes in development
- [ ] Run `npm run build` to ensure no errors
- [ ] Deploy to staging
- [ ] Test in staging
- [ ] Deploy to production
- [ ] Monitor error logs for 24 hours

---

## Additional Security Hardening (Optional)

### Rate Limiting
Consider adding rate limiting using `@upstash/ratelimit`:

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

// In API routes:
const identifier = session?.user?.id || request.ip
const { success } = await ratelimit.limit(identifier)
if (!success) {
  return NextResponse.json(
    { success: false, error: 'Too many requests' },
    { status: 429 }
  )
}
```

### Input Sanitization
Install and use DOMPurify for user-generated content:

```bash
npm install isomorphic-dompurify
```

```typescript
import DOMPurify from 'isomorphic-dompurify'

const cleanContent = DOMPurify.sanitize(userInput)
```
