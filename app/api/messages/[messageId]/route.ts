import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'

const editMessageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message cannot exceed 5000 characters')
    .transform((val) => val.trim()),
})

/**
 * PATCH /api/messages/[messageId] - Edit a message
 */
export async function PATCH(
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

    // Validate content
    const validation = editMessageSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || 'Invalid content' },
        { status: 400 }
      )
    }

    const { content } = validation.data

    // Find the message and verify ownership
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

    if (message.senderId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only edit your own messages' },
        { status: 403 }
      )
    }

    // Update the message
    const updatedMessage = await prisma.directMessage.update({
      where: { id: messageId },
      data: {
        content,
        editedAt: new Date(),
      },
      include: {
        sender: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } },
      },
    })

    // Notify the recipient via Pusher
    await pusherServer.trigger(
      `private-chat-${message.receiverId}`,
      'message-edited',
      { message: updatedMessage }
    )

    return NextResponse.json({ success: true, data: updatedMessage })
  } catch (error) {
    console.error('Error editing message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to edit message' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/messages/[messageId] - Soft delete a message
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

    // Find the message and verify ownership
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

    if (message.senderId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only delete your own messages' },
        { status: 403 }
      )
    }

    // Soft delete by updating content and setting deletedAt
    const deletedMessage = await prisma.directMessage.update({
      where: { id: messageId },
      data: {
        content: '[Message deleted]',
        deletedAt: new Date(),
      },
    })

    // Notify the recipient via Pusher
    await pusherServer.trigger(
      `private-chat-${message.receiverId}`,
      'message-deleted',
      { messageId }
    )

    return NextResponse.json({ success: true, data: deletedMessage })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
