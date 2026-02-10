import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

/**
 * GET /api/documents/[documentId]
 * Retrieve a specific document by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await params

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
            members: {
              where: { userId: session.user.id },
              select: { role: true },
            },
          },
        },
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            collaborators: true,
            comments: true,
            versions: true,
          },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    // Check permissions
    const isCreator = document.creatorId === session.user.id
    const isMember = document.project.members.length > 0
    const collaborator = document.collaborators.find((c: any) => c.userId === session.user.id)
    const canView =
      isCreator ||
      collaborator ||
      isMember ||
      (document.isPublic && document.status === 'PUBLISHED')

    if (!canView) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to view this document' },
        { status: 403 }
      )
    }

    // Increment read count
    await prisma.document.update({
      where: { id: documentId },
      data: { readCount: { increment: 1 } },
    })

    return NextResponse.json({ success: true, data: document })
  } catch (error) {
    console.error('Error fetching document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch document' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/documents/[documentId]
 * Update a document
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await params
    const body = await req.json()
    const { title, description, content, status, type, isPublic, allowComments, allowSuggestions } =
      body

    // Fetch document to check permissions
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        project: {
          select: {
            members: {
              where: { userId: session.user.id },
              select: { role: true },
            },
          },
        },
        collaborators: {
          where: { userId: session.user.id },
          select: { permission: true },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    // Check edit permissions
    const isCreator = document.creatorId === session.user.id
    const collaborator = document.collaborators[0]
    const canEdit =
      isCreator ||
      collaborator?.permission === 'EDIT' ||
      collaborator?.permission === 'ADMIN' ||
      document.project.members.length > 0

    if (!canEdit) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to edit this document' },
        { status: 403 }
      )
    }

    // Create version snapshot if content changed
    const shouldCreateVersion = content && content !== document.content
    if (shouldCreateVersion) {
      await prisma.documentVersion.create({
        data: {
          documentId,
          title: document.title,
          content: document.content,
          versionNumber: document.version,
          createdById: session.user.id,
          changeDescription: 'Auto-saved version',
          isAutoSave: true,
        },
      })
    }

    // Update document
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(status !== undefined && { status }),
        ...(type !== undefined && { type }),
        ...(isPublic !== undefined && { isPublic }),
        ...(allowComments !== undefined && { allowComments }),
        ...(allowSuggestions !== undefined && { allowSuggestions }),
        ...(content !== undefined && { wordCount: content.split(/\s+/).length }),
        ...(shouldCreateVersion && { version: { increment: 1 } }),
        lastEditedById: session.user.id,
        lastEditedAt: new Date(),
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            collaborators: true,
            comments: true,
            versions: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: updatedDocument })
  } catch (error) {
    console.error('Error updating document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update document' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/documents/[documentId]
 * Delete a document
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await params

    // Fetch document to check permissions
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        collaborators: {
          where: { userId: session.user.id },
          select: { permission: true },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    // Only creator or ADMIN collaborators can delete
    const isCreator = document.creatorId === session.user.id
    const isAdmin = document.collaborators[0]?.permission === 'ADMIN'

    if (!isCreator && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to delete this document' },
        { status: 403 }
      )
    }

    // Delete document (cascade will handle versions, comments, etc.)
    await prisma.document.delete({
      where: { id: documentId },
    })

    return NextResponse.json({ success: true, message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Error deleting document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}
