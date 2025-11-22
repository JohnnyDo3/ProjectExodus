import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'

// GET /api/messages/[userId] - Get conversation with a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to view messages' },
        { status: 401 }
      )
    }

    const { userId } = await params

    // SECURITY: Only return messages where current user is sender OR receiver
    const messages = await prisma.directMessage.findMany({
      where: {
        OR: [
          {
            senderId: session.user.id,
            receiverId: userId,
          },
          {
            senderId: userId,
            receiverId: session.user.id,
          },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    // SECURITY: Mark all messages from this user as read
    await prisma.directMessage.updateMany({
      where: {
        senderId: userId,
        receiverId: session.user.id,
        read: false,
      },
      data: {
        read: true,
      },
    })

    // Get the other user's info
    const otherUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        location: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        messages,
        otherUser,
      },
    })
  } catch (error) {
    console.error('Error fetching conversation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch conversation' },
      { status: 500 }
    )
  }
}

// POST /api/messages/[userId] - Send a message to a specific user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to send messages' },
        { status: 401 }
      )
    }

    const { userId } = await params
    const body = await request.json()
    const { content } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message content is required' },
        { status: 400 }
      )
    }

    // SECURITY: Prevent sending messages to yourself
    if (userId === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot send messages to yourself' },
        { status: 400 }
      )
    }

    // Verify the recipient exists
    const recipient = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    })

    if (!recipient) {
      return NextResponse.json(
        { success: false, error: 'Recipient not found' },
        { status: 404 }
      )
    }

    // Create the message
    const message = await prisma.directMessage.create({
      data: {
        content: content.trim(),
        senderId: session.user.id,
        receiverId: userId,
        read: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // ⚡ REAL-TIME: Trigger Pusher event for instant delivery
    await pusherServer.trigger(
      `private-chat-${userId}`,
      'new-message',
      {
        message,
        timestamp: new Date().toISOString(),
      }
    )

    return NextResponse.json({
      success: true,
      data: message,
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
