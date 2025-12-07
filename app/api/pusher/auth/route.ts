import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'

/**
 * Pusher Private Channel Authentication
 *
 * This endpoint validates that users can only subscribe to their own private channels.
 * Without this, anyone could potentially listen to any user's messages.
 *
 * Channel format: private-chat-{userId}
 * A user can ONLY subscribe to private-chat-{their-own-id}
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      )
    }

    const data = await request.formData()
    const socketId = data.get('socket_id') as string
    const channel = data.get('channel_name') as string

    if (!socketId || !channel) {
      return NextResponse.json(
        { error: 'Missing socket_id or channel_name' },
        { status: 400 }
      )
    }

    // Security check: Verify user can only subscribe to their own private channels
    // Allowed channel formats:
    // - private-chat-{userId} - for receiving direct messages
    // - private-notifications-{userId} - for receiving real-time notifications
    const allowedChannels = [
      `private-chat-${session.user.id}`,
      `private-notifications-${session.user.id}`,
    ]

    if (!allowedChannels.includes(channel)) {
      console.warn(
        `[Pusher Auth] User ${session.user.id} attempted to subscribe to unauthorized channel: ${channel}`
      )
      return NextResponse.json(
        { error: 'Forbidden - Cannot subscribe to this channel' },
        { status: 403 }
      )
    }

    // Generate auth signature for Pusher
    const authResponse = pusherServer.authorizeChannel(socketId, channel)

    return NextResponse.json(authResponse)
  } catch (error) {
    console.error('[Pusher Auth] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
