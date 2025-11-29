import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

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
    const file = formData.get('resume') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'resumes')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${session.user.id}_${timestamp}.pdf`
    const filepath = join(uploadsDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // Update user record with resume URL
    const resumeUrl = `/uploads/resumes/${filename}`
    await prisma.user.update({
      where: { id: session.user.id },
      data: { resume: resumeUrl }
    })

    return NextResponse.json({
      success: true,
      data: {
        url: resumeUrl,
        filename: file.name,
        size: file.size
      },
      message: 'Resume uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload resume' },
      { status: 500 }
    )
  }
}

// DELETE /api/resume/upload - Remove uploaded resume
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Remove resume URL from user record
    await prisma.user.update({
      where: { id: session.user.id },
      data: { resume: null }
    })

    // Note: We're not deleting the actual file for data retention/backup purposes
    // You can add file deletion logic here if needed

    return NextResponse.json({
      success: true,
      message: 'Resume removed successfully'
    })
  } catch (error) {
    console.error('Error removing resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove resume' },
      { status: 500 }
    )
  }
}
