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
