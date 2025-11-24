import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// POST /api/users/[id]/connect - Send connection request
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const targetUserId = id
    const currentUserId = session.user.id
    const body = await request.json()
    const { message } = body

    // Can't connect with yourself
    if (targetUserId === currentUserId) {
      return NextResponse.json(
        { success: false, error: 'Cannot connect with yourself' },
        { status: 400 }
      )
    }

    // Check if already connected
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { userId: currentUserId, connectedUserId: targetUserId },
          { userId: targetUserId, connectedUserId: currentUserId },
        ],
        status: 'ACCEPTED',
      },
    })

    if (existingConnection) {
      return NextResponse.json(
        { success: false, error: 'Already connected with this user' },
        { status: 400 }
      )
    }

    // Check if pending request already exists
    const pendingRequest = await prisma.connection.findFirst({
      where: {
        OR: [
          { userId: currentUserId, connectedUserId: targetUserId },
          { userId: targetUserId, connectedUserId: currentUserId },
        ],
        status: 'PENDING',
      },
    })

    if (pendingRequest) {
      return NextResponse.json(
        { success: false, error: 'Connection request already pending' },
        { status: 400 }
      )
    }

    // Create connection request
    const connection = await prisma.connection.create({
      data: {
        userId: currentUserId,
        connectedUserId: targetUserId,
        status: 'PENDING',
        message: message || null,
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

    return NextResponse.json({
      success: true,
      data: connection,
      message: 'Connection request sent successfully',
    })
  } catch (error) {
    console.error('Error sending connection request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send connection request' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id]/connect - Cancel connection request or remove connection
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const targetUserId = id
    const currentUserId = session.user.id

    // Delete connection (pending or accepted)
    await prisma.connection.deleteMany({
      where: {
        OR: [
          { userId: currentUserId, connectedUserId: targetUserId },
          { userId: targetUserId, connectedUserId: currentUserId },
        ],
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Connection removed successfully',
    })
  } catch (error) {
    console.error('Error removing connection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove connection' },
      { status: 500 }
    )
  }
}

// GET /api/users/[id]/connect - Get connection status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const targetUserId = id
    const currentUserId = session.user.id

    // Find connection status
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { userId: currentUserId, connectedUserId: targetUserId },
          { userId: targetUserId, connectedUserId: currentUserId },
        ],
      },
    })

    let status = 'none'
    let requesterId = null

    if (connection) {
      if (connection.status === 'ACCEPTED') {
        status = 'connected'
      } else if (connection.status === 'PENDING') {
        status = connection.userId === currentUserId ? 'pending_sent' : 'pending_received'
        requesterId = connection.userId
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        status,
        requesterId,
        connectionId: connection?.id,
      },
    })
  } catch (error) {
    console.error('Error getting connection status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get connection status' },
      { status: 500 }
    )
  }
}
