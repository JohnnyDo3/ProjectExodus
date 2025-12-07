import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { createNotification } from '@/lib/notifications'

// Zod schema for message validation
const messageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message cannot exceed 5000 characters')
    .transform((val) => val.trim()),
})

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
        reactions: {
          select: {
            id: true,
            emoji: true,
            userId: true,
            user: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    // SECURITY: Mark all messages from this user as read
    const unreadMessages = await prisma.directMessage.findMany({
      where: {
        senderId: userId,
        receiverId: session.user.id,
        read: false,
      },
      select: { id: true },
    })

    if (unreadMessages.length > 0) {
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

      // Notify sender that their messages were read via Pusher
      const messageIds = unreadMessages.map((m: { id: string }) => m.id)
      await pusherServer.trigger(
        `private-chat-${userId}`,
        'message-read',
        {
          messageIds,
          readerId: session.user.id,
        }
      )
    }

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

    // Rate limiting: 30 messages per minute per user
    const rateLimitResult = await rateLimit(request, {
      id: `messages:${session.user.id}`,
      limit: 30,
      windowSeconds: 60,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const { userId } = await params
    const body = await request.json()

    // Validate message content with Zod
    const validation = messageSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0]?.message || 'Invalid message content'
        },
        { status: 400 }
      )
    }

    const { content } = validation.data

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
        content, // Already trimmed by Zod
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

    // Create notification for the recipient
    const senderName = message.sender?.name || 'Someone'
    const previewText = content.length > 50 ? content.substring(0, 50) + '...' : content
    await createNotification({
      userId: userId,
      type: 'NEW_MESSAGE',
      title: `New message from ${senderName}`,
      message: previewText,
      link: `/messages?user=${session.user.id}`,
    })

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
