import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// PATCH /api/connections/[id] - Accept or reject connection request
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const connectionId = params.id
    const currentUserId = session.user.id
    const body = await request.json()
    const { action } = body // 'accept' or 'reject'

    // Find the connection request
    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: 'Connection request not found' },
        { status: 404 }
      )
    }

    // Verify user is the recipient
    if (connection.connectedUserId !== currentUserId) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to modify this request' },
        { status: 403 }
      )
    }

    // Verify connection is pending
    if (connection.status !== 'PENDING') {
      return NextResponse.json(
        { success: false, error: 'Connection request is not pending' },
        { status: 400 }
      )
    }

    if (action === 'accept') {
      // Accept the connection
      const updatedConnection = await prisma.connection.update({
        where: { id: connectionId },
        data: {
          status: 'ACCEPTED',
          acceptedAt: new Date(),
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
          connectedUser: {
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
        data: updatedConnection,
        message: 'Connection request accepted',
      })
    } else if (action === 'reject') {
      // Reject and delete the connection request
      await prisma.connection.delete({
        where: { id: connectionId },
      })

      return NextResponse.json({
        success: true,
        message: 'Connection request rejected',
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "accept" or "reject"' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error handling connection request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to handle connection request' },
      { status: 500 }
    )
  }
}

// GET /api/connections/[id] - Get connection details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const connectionId = params.id
    const currentUserId = session.user.id

    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            headline: true,
            location: true,
          },
        },
        connectedUser: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            headline: true,
            location: true,
          },
        },
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: 'Connection not found' },
        { status: 404 }
      )
    }

    // Verify user is involved in this connection
    if (connection.userId !== currentUserId && connection.connectedUserId !== currentUserId) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to view this connection' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      data: connection,
    })
  } catch (error) {
    console.error('Error getting connection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get connection' },
      { status: 500 }
    )
  }
}
