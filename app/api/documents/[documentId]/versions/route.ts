import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/documents/[documentId]/versions - Get all versions
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await context.params

    // Check if user has access to document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        collaborators: {
          where: { userId: session.user.id },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    const isCreator = document.creatorId === session.user.id
    const isCollaborator = document.collaborators.length > 0

    if (!isCreator && !isCollaborator && !document.isPublic) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Get versions
    const versions = await prisma.documentVersion.findMany({
      where: { documentId },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { versionNumber: 'desc' },
    })

    return NextResponse.json({ success: true, data: versions })
  } catch (error) {
    console.error('Error fetching versions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch versions' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[documentId]/versions - Create a checkpoint version
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await context.params
    const body = await request.json()
    const { name, changeDescription, isMajorVersion = true } = body

    // Get document and check permission
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        collaborators: {
          where: { userId: session.user.id },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    const isCreator = document.creatorId === session.user.id
    const collaborator = document.collaborators[0]
    const canEdit = isCreator || (collaborator && ['EDIT', 'ADMIN'].includes(collaborator.permission))

    if (!canEdit) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Calculate word count
    const plainText = document.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const wordCount = plainText ? plainText.split(/\s+/).length : 0

    // Create version
    const version = await prisma.documentVersion.create({
      data: {
        documentId,
        versionNumber: document.version + 1,
        title: document.title,
        content: document.content,
        plainText,
        wordCount,
        createdById: session.user.id,
        changeDescription: changeDescription || null,
        name: name || null,
        isMajorVersion: isMajorVersion,
        isAutoSaved: false,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Update document version number
    await prisma.document.update({
      where: { id: documentId },
      data: { version: document.version + 1 },
    })

    return NextResponse.json({ success: true, data: version }, { status: 201 })
  } catch (error) {
    console.error('Error creating version:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create version' },
      { status: 500 }
    )
  }
}
