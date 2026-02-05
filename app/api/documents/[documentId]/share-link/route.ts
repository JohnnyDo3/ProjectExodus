import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { randomBytes } from 'crypto'

// GET /api/documents/[documentId]/share-link - Get current share link
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

    // Get document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: {
        id: true,
        shareToken: true,
        shareExpiry: true,
        publicAccess: true,
        creatorId: true,
        collaborators: {
          where: { userId: session.user.id },
          select: { permission: true },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    const isCreator = document.creatorId === session.user.id
    const collaborator = document.collaborators[0]
    const canView = isCreator || !!collaborator

    if (!canView) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      data: {
        shareToken: document.shareToken,
        shareExpiry: document.shareExpiry,
        publicAccess: document.publicAccess,
      },
    })
  } catch (error) {
    console.error('Error fetching share link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch share link' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[documentId]/share-link - Generate a new share link
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
    const { permission = 'VIEW', expiresInDays } = body

    // Validate permission
    const validPermissions = ['VIEW', 'COMMENT', 'SUGGEST', 'EDIT']
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

    // Generate unique token
    const shareToken = randomBytes(32).toString('hex')

    // Calculate expiry if specified
    const shareExpiry = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
      : null

    // Update document with share settings
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        shareToken,
        shareExpiry,
        publicAccess: permission,
      },
      select: {
        shareToken: true,
        shareExpiry: true,
        publicAccess: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedDocument,
    })
  } catch (error) {
    console.error('Error generating share link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate share link' },
      { status: 500 }
    )
  }
}

// PATCH /api/documents/[documentId]/share-link - Update share link permission
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
    const { permission } = body

    // Validate permission
    const validPermissions = ['VIEW', 'COMMENT', 'SUGGEST', 'EDIT']
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

    if (!document.shareToken) {
      return NextResponse.json(
        { success: false, error: 'No share link exists' },
        { status: 400 }
      )
    }

    // Update permission
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: { publicAccess: permission },
      select: {
        shareToken: true,
        shareExpiry: true,
        publicAccess: true,
      },
    })

    return NextResponse.json({ success: true, data: updatedDocument })
  } catch (error) {
    console.error('Error updating share link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update share link' },
      { status: 500 }
    )
  }
}

// DELETE /api/documents/[documentId]/share-link - Revoke share link
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

    // Remove share settings
    await prisma.document.update({
      where: { id: documentId },
      data: {
        shareToken: null,
        shareExpiry: null,
        publicAccess: null,
      },
    })

    return NextResponse.json({ success: true, message: 'Share link revoked' })
  } catch (error) {
    console.error('Error revoking share link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to revoke share link' },
      { status: 500 }
    )
  }
}
