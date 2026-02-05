import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/documents/[documentId]/collaborators - Get all collaborators
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

    // Get all collaborators
    const collaborators = await prisma.documentCollaborator.findMany({
      where: { documentId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { joinedAt: 'asc' },
    })

    return NextResponse.json({ success: true, data: collaborators })
  } catch (error) {
    console.error('Error fetching collaborators:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collaborators' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[documentId]/collaborators - Add a collaborator
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
    const { userId, permission = 'EDIT' } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Validate permission
    const validPermissions = ['VIEW', 'COMMENT', 'SUGGEST', 'EDIT', 'ADMIN']
    if (!validPermissions.includes(permission)) {
      return NextResponse.json(
        { success: false, error: 'Invalid permission' },
        { status: 400 }
      )
    }

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
    const canManage = isCreator || (collaborator && collaborator.permission === 'ADMIN')

    if (!canManage) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Check if user exists
    const userToAdd = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userToAdd) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    // Check if already a collaborator
    const existingCollaborator = await prisma.documentCollaborator.findUnique({
      where: {
        documentId_userId: {
          documentId,
          userId,
        },
      },
    })

    if (existingCollaborator) {
      return NextResponse.json(
        { success: false, error: 'User is already a collaborator' },
        { status: 409 }
      )
    }

    // Cannot add document creator as collaborator
    if (userId === document.creatorId) {
      return NextResponse.json(
        { success: false, error: 'Cannot add document owner as collaborator' },
        { status: 400 }
      )
    }

    // Add collaborator
    const newCollaborator = await prisma.documentCollaborator.create({
      data: {
        documentId,
        userId,
        permission,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: newCollaborator }, { status: 201 })
  } catch (error) {
    console.error('Error adding collaborator:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add collaborator' },
      { status: 500 }
    )
  }
}

// PATCH /api/documents/[documentId]/collaborators - Update collaborator permission
export async function PATCH(
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
    const { collaboratorId, permission } = body

    if (!collaboratorId || !permission) {
      return NextResponse.json(
        { success: false, error: 'Collaborator ID and permission are required' },
        { status: 400 }
      )
    }

    // Validate permission
    const validPermissions = ['VIEW', 'COMMENT', 'SUGGEST', 'EDIT', 'ADMIN']
    if (!validPermissions.includes(permission)) {
      return NextResponse.json(
        { success: false, error: 'Invalid permission' },
        { status: 400 }
      )
    }

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
    const currentUserCollaborator = document.collaborators[0]
    const canManage = isCreator || (currentUserCollaborator && currentUserCollaborator.permission === 'ADMIN')

    if (!canManage) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Update collaborator
    const updatedCollaborator = await prisma.documentCollaborator.update({
      where: { id: collaboratorId },
      data: { permission },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: updatedCollaborator })
  } catch (error) {
    console.error('Error updating collaborator:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update collaborator' },
      { status: 500 }
    )
  }
}

// DELETE /api/documents/[documentId]/collaborators - Remove a collaborator
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await context.params
    const url = new URL(request.url)
    const collaboratorId = url.searchParams.get('collaboratorId')

    if (!collaboratorId) {
      return NextResponse.json(
        { success: false, error: 'Collaborator ID is required' },
        { status: 400 }
      )
    }

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
    const currentUserCollaborator = document.collaborators[0]
    const canManage = isCreator || (currentUserCollaborator && currentUserCollaborator.permission === 'ADMIN')

    // Users can remove themselves
    const collaboratorToRemove = await prisma.documentCollaborator.findUnique({
      where: { id: collaboratorId },
    })

    const isSelf = collaboratorToRemove?.userId === session.user.id

    if (!canManage && !isSelf) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Remove collaborator
    await prisma.documentCollaborator.delete({
      where: { id: collaboratorId },
    })

    return NextResponse.json({ success: true, message: 'Collaborator removed' })
  } catch (error) {
    console.error('Error removing collaborator:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove collaborator' },
      { status: 500 }
    )
  }
}
