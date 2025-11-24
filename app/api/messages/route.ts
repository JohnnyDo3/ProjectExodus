import { NextRequest, NextResponse } from 'next/server'
import { handlePrismaError } from '@/lib/utils/prisma-errors'
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
        sender: {
    // Combine and deduplicate conversation partners
    const conversationPartnerIds = new Set<string>()
    const conversations: any[] = []
    for (const msg of sentMessages) {
      if (!conversationPartnerIds.has(msg.receiverId)) {
        conversationPartnerIds.add(msg.receiverId)
        // Get latest message in this conversation
        const latestMessage = await prisma.directMessage.findFirst({
          where: {
            OR: [
              { senderId: session.user.id, receiverId: msg.receiverId },
              { senderId: msg.receiverId, receiverId: session.user.id },
            ],
          orderBy: { createdAt: 'desc' },
        })
        // Count unread messages from this user
        const unreadCount = await prisma.directMessage.count({
            senderId: msg.receiverId,
            receiverId: session.user.id,
            read: false,
        conversations.push({
          partner: msg.receiver,
          latestMessage,
          unreadCount,
      }
    for (const msg of receivedMessages) {
      if (!conversationPartnerIds.has(msg.senderId)) {
        conversationPartnerIds.add(msg.senderId)
              { senderId: session.user.id, receiverId: msg.senderId },
              { senderId: msg.senderId, receiverId: session.user.id },
            senderId: msg.senderId,
          partner: msg.sender,
    // Sort by latest message time
    conversations.sort((a, b) => {
      const aTime = new Date(a.latestMessage?.createdAt || 0).getTime()
      const bTime = new Date(b.latestMessage?.createdAt || 0).getTime()
      return bTime - aTime
    return NextResponse.json({
      success: true,
      data: conversations,
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}
