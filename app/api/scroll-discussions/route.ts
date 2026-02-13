import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { pusherServer } from '@/lib/pusher'

// GET: Fetch discussions for a topic (optionally filtered by chapter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const topicId = searchParams.get('topicId')
    const chapterId = searchParams.get('chapterId')
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const cursor = searchParams.get('cursor')

    if (!topicId) {
      return NextResponse.json(
        { error: 'topicId is required' },
        { status: 400 }
      )
    }

    const where = {
      topicId,
      ...(chapterId !== null && { chapterId: parseInt(chapterId, 10) }),
    }

    const discussions = await prisma.scrollDiscussion.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    })

    const nextCursor = discussions.length === limit
      ? discussions[discussions.length - 1].id
      : null

    return NextResponse.json({
      discussions,
      nextCursor,
    })
  } catch (error) {
    console.error('Error fetching scroll discussions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

// POST: Create a new discussion message
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { topicId, chapterId, content } = body

    if (!topicId || !content?.trim()) {
      return NextResponse.json(
        { error: 'topicId and content are required' },
        { status: 400 }
      )
    }

    // Sanitize content (basic - remove HTML)
    const sanitizedContent = content
      .trim()
      .slice(0, 2000) // Max 2000 chars
      .replace(/<[^>]*>/g, '') // Remove HTML tags

    const discussion = await prisma.scrollDiscussion.create({
      data: {
        topicId,
        chapterId: chapterId !== undefined ? parseInt(chapterId, 10) : null,
        userId: session.user.id,
        content: sanitizedContent,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Broadcast via Pusher
    const channelName = `scroll-discussion-${topicId}`
    await pusherServer.trigger(channelName, 'new-message', discussion)

    return NextResponse.json(discussion, { status: 201 })
  } catch (error) {
    console.error('Error creating scroll discussion:', error)
    return NextResponse.json(
      { error: 'Failed to create discussion' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a discussion message (own messages only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const topicId = searchParams.get('topicId')

    if (!id) {
      return NextResponse.json(
        { error: 'id is required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const discussion = await prisma.scrollDiscussion.findUnique({
      where: { id },
      select: { userId: true, topicId: true },
    })

    if (!discussion) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    if (discussion.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Not authorized to delete this message' },
        { status: 403 }
      )
    }

    await prisma.scrollDiscussion.delete({
      where: { id },
    })

    // Broadcast deletion via Pusher
    if (topicId) {
      const channelName = `scroll-discussion-${topicId}`
      await pusherServer.trigger(channelName, 'message-deleted', { id })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting scroll discussion:', error)
    return NextResponse.json(
      { error: 'Failed to delete discussion' },
      { status: 500 }
    )
  }
}
