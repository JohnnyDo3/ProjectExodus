import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/messages - Get all conversations for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to view messages' },
        { status: 401 }
      )
    }

    // Get all unique conversation partners
    const sentMessages = await prisma.directMessage.findMany({
      where: { senderId: session.user.id },
      distinct: ['receiverId'],
      orderBy: { createdAt: 'desc' },
      include: {
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    const receivedMessages = await prisma.directMessage.findMany({
      where: { receiverId: session.user.id },
      distinct: ['senderId'],
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    // Build conversation partner map
    const conversationPartners = new Map<string, any>()

    for (const msg of sentMessages) {
      if (!conversationPartners.has(msg.receiverId)) {
        conversationPartners.set(msg.receiverId, msg.receiver)
      }
    }

    for (const msg of receivedMessages) {
      if (!conversationPartners.has(msg.senderId)) {
        conversationPartners.set(msg.senderId, msg.sender)
      }
    }

    const partnerIds = Array.from(conversationPartners.keys())

    if (partnerIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      })
    }

    // Fetch ALL messages for ALL conversations in ONE query
    const allMessages = await prisma.directMessage.findMany({
      where: {
        OR: [
          { senderId: session.user.id, receiverId: { in: partnerIds } },
          { senderId: { in: partnerIds }, receiverId: session.user.id },
        ],
      },
      orderBy: { createdAt: 'desc' },
    })

    // Get unread counts for ALL conversations in ONE aggregation query
    const unreadCounts = await prisma.directMessage.groupBy({
      by: ['senderId'],
      where: {
        senderId: { in: partnerIds },
        receiverId: session.user.id,
        read: false,
      },
      _count: {
        id: true,
      },
    })

    // Create a map of unread counts by partner ID
    const unreadMap = new Map<string, number>()
    for (const count of unreadCounts) {
      unreadMap.set(count.senderId, count._count.id)
    }

    // Build conversations with latest messages
    const conversations: any[] = []

    for (const [partnerId, partner] of conversationPartners) {
      // Find the latest message for this conversation
      const latestMessage = allMessages.find(
        (msg: typeof allMessages[number]) =>
          (msg.senderId === session.user.id && msg.receiverId === partnerId) ||
          (msg.senderId === partnerId && msg.receiverId === session.user.id)
      )

      conversations.push({
        partner,
        latestMessage: latestMessage || null,
        unreadCount: unreadMap.get(partnerId) || 0,
      })
    }

    // Sort by latest message time
    conversations.sort((a, b) => {
      const aTime = new Date(a.latestMessage?.createdAt || 0).getTime()
      const bTime = new Date(b.latestMessage?.createdAt || 0).getTime()
      return bTime - aTime
    })

    return NextResponse.json({
      success: true,
      data: conversations,
    })
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}
