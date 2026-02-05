import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/documents/[documentId]/versions/[versionId] - Get a specific version
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ documentId: string; versionId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, versionId } = await context.params

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

    // Get version
    const version = await prisma.documentVersion.findUnique({
      where: { id: versionId },
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

    if (!version || version.documentId !== documentId) {
      return NextResponse.json({ success: false, error: 'Version not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: version })
  } catch (error) {
    console.error('Error fetching version:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch version' },
      { status: 500 }
    )
  }
}

// PATCH /api/documents/[documentId]/versions/[versionId] - Update version name
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ documentId: string; versionId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, versionId } = await context.params
    const body = await request.json()
    const { name } = body

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

    // Update version
    const version = await prisma.documentVersion.update({
      where: { id: versionId },
      data: { name: name || null },
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

    return NextResponse.json({ success: true, data: version })
  } catch (error) {
    console.error('Error updating version:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update version' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[documentId]/versions/[versionId] - Restore to this version
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ documentId: string; versionId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, versionId } = await context.params
    const body = await request.json()
    const { createCheckpoint = true } = body

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

    // Get the version to restore
    const versionToRestore = await prisma.documentVersion.findUnique({
      where: { id: versionId },
    })

    if (!versionToRestore || versionToRestore.documentId !== documentId) {
      return NextResponse.json({ success: false, error: 'Version not found' }, { status: 404 })
    }

    // Optionally create checkpoint of current state first
    if (createCheckpoint) {
      const plainText = document.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      const wordCount = plainText ? plainText.split(/\s+/).length : 0

      await prisma.documentVersion.create({
        data: {
          documentId,
          versionNumber: document.version + 1,
          title: document.title,
          content: document.content,
          plainText,
          wordCount,
          createdById: session.user.id,
          changeDescription: `Checkpoint before restoring to v${versionToRestore.versionNumber}`,
          isMajorVersion: true,
          isAutoSaved: false,
        },
      })
    }

    // Calculate word count for restored content
    const restoredPlainText = versionToRestore.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const restoredWordCount = restoredPlainText ? restoredPlainText.split(/\s+/).length : 0

    // Update document with restored content
    const newVersion = document.version + (createCheckpoint ? 2 : 1)

    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        title: versionToRestore.title,
        content: versionToRestore.content,
        plainText: versionToRestore.plainText,
        wordCount: restoredWordCount,
        version: newVersion,
        lastEditedById: session.user.id,
      },
    })

    // Create a version record for the restore
    await prisma.documentVersion.create({
      data: {
        documentId,
        versionNumber: newVersion,
        title: versionToRestore.title,
        content: versionToRestore.content,
        plainText: versionToRestore.plainText,
        wordCount: restoredWordCount,
        createdById: session.user.id,
        changeDescription: `Restored from v${versionToRestore.versionNumber}`,
        isMajorVersion: true,
        isAutoSaved: false,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedDocument,
      message: `Restored to version ${versionToRestore.versionNumber}`,
    })
  } catch (error) {
    console.error('Error restoring version:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to restore version' },
      { status: 500 }
    )
  }
}
