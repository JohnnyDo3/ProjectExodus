import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'

// POST /api/learning/discussions/[discussionId]/replies
// Add a reply to a discussion
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ discussionId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { discussionId } = await params
    const body = await request.json()
    const { content, parentReplyId } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    // Get discussion to check it exists and get level info
    const discussion = await prisma.moduleDiscussion.findUnique({
      where: { id: discussionId },
      select: {
        id: true,
        articleId: true,
        level: true
      }
    })

    if (!discussion) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Check if parent reply exists (if provided)
    if (parentReplyId) {
      const parentReply = await prisma.moduleDiscussionReply.findUnique({
        where: { id: parentReplyId }
      })
      if (!parentReply || parentReply.discussionId !== discussionId) {
        return NextResponse.json(
          { success: false, error: 'Parent reply not found' },
          { status: 404 }
        )
      }
    }

    // Check if user has completed the module at this level
    const progress = await prisma.userLearningProgress.findFirst({
      where: {
        userId: session.user.id,
        articleId: discussion.articleId,
        selectedLevel: discussion.level,
        status: 'COMPLETED'
      }
    })
    const isFromCompleter = !!progress

    // Create reply
    const reply = await prisma.moduleDiscussionReply.create({
      data: {
        discussionId,
        authorId: session.user.id,
        content: content.trim(),
        parentReplyId: parentReplyId || null,
        isFromCompleter
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    // Update reply count on discussion
    await prisma.moduleDiscussion.update({
      where: { id: discussionId },
      data: { replyCount: { increment: 1 } }
    })

    return NextResponse.json({
      success: true,
      data: {
        id: reply.id,
        discussionId: reply.discussionId,
        parentReplyId: reply.parentReplyId,
        author: {
          ...reply.author,
          hasCompletedModule: isFromCompleter
        },
        content: reply.content,
        isFromCompleter: reply.isFromCompleter,
        isAcceptedAnswer: reply.isAcceptedAnswer,
        helpfulCount: reply.helpfulCount,
        hasUserVotedHelpful: false,
        childReplies: [],
        createdAt: reply.createdAt.toISOString(),
        updatedAt: reply.updatedAt.toISOString()
      },
      message: 'Reply added successfully'
    })

  } catch (error) {
    console.error('Error creating reply:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create reply' },
      { status: 500 }
    )
  }
}
