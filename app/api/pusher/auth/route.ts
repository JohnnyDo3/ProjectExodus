import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'
import { prisma } from '@/lib/db'

/**
 * Pusher Private Channel Authentication
 *
 * This endpoint validates that users can only subscribe to their own private channels.
 * Without this, anyone could potentially listen to any user's messages.
 *
 * Channel formats:
 * - private-chat-{userId} - for receiving direct messages
 * - private-notifications-{userId} - for receiving real-time notifications
 * - private-admin - for admin-only real-time updates (requires admin role)
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

    // User-specific private channels
    const allowedChannels = [
      `private-chat-${session.user.id}`,
      `private-notifications-${session.user.id}`,
    ]

    // Check if it's an admin channel
    if (channel === 'private-admin') {
      // Verify user is admin
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
      })

      const adminRoles = ['ADMIN', 'SUPER_ADMIN', 'MODERATOR']
      if (!user || !adminRoles.includes(user.role)) {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      }
      // Admin is allowed to subscribe to admin channel
    } else if (!allowedChannels.includes(channel)) {
      return NextResponse.json(
        { error: 'Forbidden - Cannot subscribe to this channel' },
        { status: 403 }
      )
    }

    // Generate auth signature for Pusher
    const authResponse = pusherServer.authorizeChannel(socketId, channel)

    return NextResponse.json(authResponse)
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
