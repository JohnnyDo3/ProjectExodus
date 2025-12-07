import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'

const reactionSchema = z.object({
  emoji: z.string().min(1).max(10), // Emoji character(s)
})

/**
 * POST /api/messages/[messageId]/reactions - Add a reaction to a message
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { messageId } = await params
    const body = await request.json()

    // Validate emoji
    const validation = reactionSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid emoji' },
        { status: 400 }
      )
    }

    const { emoji } = validation.data

    // Verify the message exists and user is part of conversation
    const message = await prisma.directMessage.findUnique({
      where: { id: messageId },
      select: { senderId: true, receiverId: true },
    })

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    // User must be sender or receiver
    if (message.senderId !== session.user.id && message.receiverId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to react to this message' },
        { status: 403 }
      )
    }

    // Create or toggle reaction (if exists, remove it; otherwise add it)
    const existingReaction = await prisma.messageReaction.findUnique({
      where: {
        messageId_userId_emoji: {
          messageId,
          userId: session.user.id,
          emoji,
        },
      },
    })

    if (existingReaction) {
      // Remove the reaction (toggle off)
      await prisma.messageReaction.delete({
        where: { id: existingReaction.id },
      })

      // Notify participants
      const otherUserId = message.senderId === session.user.id ? message.receiverId : message.senderId
      await pusherServer.trigger(
        `private-chat-${otherUserId}`,
        'reaction-removed',
        { messageId, emoji, userId: session.user.id }
      )

      return NextResponse.json({ success: true, action: 'removed' })
    } else {
      // Add the reaction
      const reaction = await prisma.messageReaction.create({
        data: {
          messageId,
          userId: session.user.id,
          emoji,
        },
        include: {
          user: { select: { id: true, name: true } },
        },
      })

      // Notify participants
      const otherUserId = message.senderId === session.user.id ? message.receiverId : message.senderId
      await pusherServer.trigger(
        `private-chat-${otherUserId}`,
        'reaction-added',
        { messageId, reaction }
      )

      return NextResponse.json({ success: true, action: 'added', data: reaction })
    }
  } catch (error) {
    console.error('Error handling reaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to handle reaction' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/messages/[messageId]/reactions - Remove a reaction from a message
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { messageId } = await params
    const { searchParams } = new URL(request.url)
    const emoji = searchParams.get('emoji')

    if (!emoji) {
      return NextResponse.json(
        { success: false, error: 'Emoji required' },
        { status: 400 }
      )
    }

    // Find and delete the reaction
    const reaction = await prisma.messageReaction.findUnique({
      where: {
        messageId_userId_emoji: {
          messageId,
          userId: session.user.id,
          emoji,
        },
      },
    })

    if (!reaction) {
      return NextResponse.json(
        { success: false, error: 'Reaction not found' },
        { status: 404 }
      )
    }

    await prisma.messageReaction.delete({
      where: { id: reaction.id },
    })

    // Get message to notify the other user
    const message = await prisma.directMessage.findUnique({
      where: { id: messageId },
      select: { senderId: true, receiverId: true },
    })

    if (message) {
      const otherUserId = message.senderId === session.user.id ? message.receiverId : message.senderId
      await pusherServer.trigger(
        `private-chat-${otherUserId}`,
        'reaction-removed',
        { messageId, emoji, userId: session.user.id }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing reaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove reaction' },
      { status: 500 }
    )
  }
}
