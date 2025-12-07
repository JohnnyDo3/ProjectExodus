import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'

/**
 * POST /api/messages/typing - Send typing indicator
 * Broadcasts typing status to the recipient via Pusher
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { recipientId, typing } = await request.json()

    if (!recipientId) {
      return NextResponse.json(
        { success: false, error: 'Recipient ID required' },
        { status: 400 }
      )
    }

    // Send typing indicator to recipient's channel
    await pusherServer.trigger(
      `private-chat-${recipientId}`,
      'typing',
      {
        senderId: session.user.id,
        typing: !!typing,
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending typing indicator:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send typing indicator' },
      { status: 500 }
    )
  }
}
