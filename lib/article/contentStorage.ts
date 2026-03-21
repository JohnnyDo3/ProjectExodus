/**
 * Cloud Content Storage for Articles
 *
 * Offloads article HTML content to Cloudinary (raw file upload) so the
 * database only stores a URL reference. This keeps the DB lean and lets
 * Cloudinary's CDN serve article content fast.
 *
 * Fallback: If Cloudinary is not configured, content is stored directly
 * in the database (existing behavior). Articles created before cloud
 * storage was enabled continue to work via the DB `content` field.
 *
 * Flow:
 *   Save:  HTML string → upload to Cloudinary as raw file → store URL in DB
 *   Read:  Check contentUrl → fetch from CDN (cached) → fall back to DB content
 */

import { v2 as cloudinary } from 'cloudinary'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const CLOUDINARY_FOLDER = 'project-exodus/articles/content'

/** Whether cloud content storage is available (Cloudinary configured) */
export function isCloudStorageAvailable(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
}

// ---------------------------------------------------------------------------
// Upload article content to cloud
// ---------------------------------------------------------------------------

/**
 * Upload article HTML content to Cloudinary as a raw text file.
 * Returns the secure URL for the uploaded content.
 *
 * The file is stored as: project-exodus/articles/content/{slug}-{timestamp}.html
 * Cloudinary's CDN automatically caches and serves the file globally.
 */
export async function uploadArticleContent(
  slug: string,
  htmlContent: string
): Promise<{ contentUrl: string; publicId: string }> {
  if (!isCloudStorageAvailable()) {
    throw new Error('Cloud storage is not configured')
  }

  // Ensure cloudinary is configured (uses env vars set in lib/cloudinary.ts)
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const timestamp = Date.now()
  const publicId = `${CLOUDINARY_FOLDER}/${slug}-${timestamp}`

  // Upload as raw file (not image) using a data URI
  const base64Content = Buffer.from(htmlContent, 'utf-8').toString('base64')
  const dataUri = `data:text/html;base64,${base64Content}`

  const result = await cloudinary.uploader.upload(dataUri, {
    public_id: publicId,
    resource_type: 'raw',
    overwrite: true,
    // No transformation needed for text content
  })

  return {
    contentUrl: result.secure_url,
    publicId: result.public_id,
  }
}

// ---------------------------------------------------------------------------
// Update existing article content in cloud
// ---------------------------------------------------------------------------

/**
 * Replace an existing article's cloud content.
 * Deletes the old file and uploads the new content.
 */
export async function updateArticleContent(
  slug: string,
  htmlContent: string,
  oldPublicId?: string | null
): Promise<{ contentUrl: string; publicId: string }> {
  // Delete old content if it exists
  if (oldPublicId) {
    await deleteArticleContent(oldPublicId).catch((err) => {
      console.warn('Failed to delete old article content:', err.message)
    })
  }

  return uploadArticleContent(slug, htmlContent)
}

// ---------------------------------------------------------------------------
// Fetch article content from cloud
// ---------------------------------------------------------------------------

/**
 * Fetch article content from a cloud URL.
 * Returns the HTML string, or null if the fetch fails.
 *
 * Uses a simple fetch with cache headers — Cloudinary CDN handles
 * edge caching automatically.
 */
export async function fetchArticleContent(contentUrl: string): Promise<string | null> {
  try {
    const res = await fetch(contentUrl, {
      // Next.js fetch cache: revalidate every 5 minutes
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      console.warn(`Failed to fetch article content: ${res.status} ${res.statusText}`)
      return null
    }

    return await res.text()
  } catch (err) {
    console.warn('Error fetching article content from cloud:', err)
    return null
  }
}

// ---------------------------------------------------------------------------
// Delete article content from cloud
// ---------------------------------------------------------------------------

/**
 * Delete article content from Cloudinary.
 */
export async function deleteArticleContent(publicId: string): Promise<void> {
  if (!isCloudStorageAvailable()) return

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' })
}

// ---------------------------------------------------------------------------
// Helper: Resolve article content (cloud-first, DB fallback)
// ---------------------------------------------------------------------------

/**
 * Resolve the full article content given an article record.
 * Tries cloud URL first, falls back to DB content field.
 *
 * Use this everywhere you need the article body to ensure
 * consistent behavior for both cloud-stored and legacy articles.
 */
export async function resolveArticleContent(article: {
  content: string | null
  contentUrl?: string | null
}): Promise<string> {
  // If there's a cloud URL, fetch from CDN
  if (article.contentUrl) {
    const cloudContent = await fetchArticleContent(article.contentUrl)
    if (cloudContent) return cloudContent
    // Fall through to DB content if cloud fetch fails
  }

  // Fallback: return DB content
  return article.content || ''
}
