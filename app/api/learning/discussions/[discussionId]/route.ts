import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// GET /api/learning/discussions/[discussionId]
// Get a discussion with all replies
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ discussionId: string }> }
) {
  try {
    const { discussionId } = await params
    const session = await auth()

    // Get discussion with replies
    const discussion = await prisma.moduleDiscussion.findUnique({
      where: { id: discussionId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        article: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        },
        replies: {
          where: { parentReplyId: null }, // Only top-level replies
          orderBy: [
            { isAcceptedAnswer: 'desc' },
            { helpfulCount: 'desc' },
            { createdAt: 'asc' }
          ],
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            childReplies: {
              orderBy: { createdAt: 'asc' },
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true
                  }
                },
                helpfulVotes: session?.user?.id ? {
                  where: { voterId: session.user.id }
                } : false
              }
            },
            helpfulVotes: session?.user?.id ? {
              where: { voterId: session.user.id }
            } : false
          }
        }
      }
    })

    if (!discussion) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.moduleDiscussion.update({
      where: { id: discussionId },
      data: { viewCount: { increment: 1 } }
    })

    // Check if user has completed the module at this level
    let userHasCompleted = false
    if (session?.user?.id) {
      const progress = await prisma.userLearningProgress.findFirst({
        where: {
          userId: session.user.id,
          articleId: discussion.articleId,
          selectedLevel: discussion.level,
          status: 'COMPLETED'
        }
      })
      userHasCompleted = !!progress
    }

    // Format replies with nested structure
    const formatReplies = (replies: typeof discussion.replies) => {
      return replies.map(reply => ({
        id: reply.id,
        discussionId: reply.discussionId,
        author: {
          ...reply.author,
          hasCompletedModule: reply.isFromCompleter
        },
        content: reply.content,
        isFromCompleter: reply.isFromCompleter,
        isAcceptedAnswer: reply.isAcceptedAnswer,
        helpfulCount: reply.helpfulCount,
        hasUserVotedHelpful: Array.isArray(reply.helpfulVotes) && reply.helpfulVotes.length > 0,
        childReplies: reply.childReplies ? reply.childReplies.map(child => ({
          id: child.id,
          discussionId: child.discussionId,
          parentReplyId: reply.id,
          author: {
            ...child.author,
            hasCompletedModule: child.isFromCompleter
          },
          content: child.content,
          isFromCompleter: child.isFromCompleter,
          isAcceptedAnswer: child.isAcceptedAnswer,
          helpfulCount: child.helpfulCount,
          hasUserVotedHelpful: Array.isArray(child.helpfulVotes) && child.helpfulVotes.length > 0,
          createdAt: child.createdAt.toISOString(),
          updatedAt: child.updatedAt.toISOString()
        })) : [],
        createdAt: reply.createdAt.toISOString(),
        updatedAt: reply.updatedAt.toISOString()
      }))
    }

    return NextResponse.json({
      success: true,
      data: {
        id: discussion.id,
        articleId: discussion.articleId,
        module: discussion.article,
        level: discussion.level,
        levelMeta: LEARNING_LEVELS[discussion.level as LearningLevel],
        author: {
          ...discussion.author,
          hasCompletedModule: userHasCompleted
        },
        title: discussion.title,
        content: discussion.content,
        isResolved: discussion.isResolved,
        isPinned: discussion.isPinned,
        viewCount: discussion.viewCount + 1,
        replyCount: discussion.replies.length,
        replies: formatReplies(discussion.replies),
        createdAt: discussion.createdAt.toISOString(),
        updatedAt: discussion.updatedAt.toISOString()
      }
    })

  } catch (error) {
    console.error('Error fetching discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussion' },
      { status: 500 }
    )
  }
}

// PUT /api/learning/discussions/[discussionId]
// Update a discussion (mark as resolved, edit content)
export async function PUT(
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

    // Get discussion
    const discussion = await prisma.moduleDiscussion.findUnique({
      where: { id: discussionId }
    })

    if (!discussion) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Only author can edit content, anyone can mark as resolved
    if (body.title !== undefined || body.content !== undefined) {
      if (discussion.authorId !== session.user.id) {
        return NextResponse.json(
          { success: false, error: 'Only the author can edit this discussion' },
          { status: 403 }
        )
      }
    }

    // Update discussion
    const updatedDiscussion = await prisma.moduleDiscussion.update({
      where: { id: discussionId },
      data: {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.content !== undefined && { content: body.content.trim() }),
        ...(body.isResolved !== undefined && { isResolved: body.isResolved })
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedDiscussion,
      message: 'Discussion updated successfully'
    })

  } catch (error) {
    console.error('Error updating discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update discussion' },
      { status: 500 }
    )
  }
}

// DELETE /api/learning/discussions/[discussionId]
// Delete a discussion
export async function DELETE(
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

    // Get discussion
    const discussion = await prisma.moduleDiscussion.findUnique({
      where: { id: discussionId }
    })

    if (!discussion) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Only author or admin can delete
    if (discussion.authorId !== session.user.id) {
      // Check if user is admin
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
      })
      if (!user || !['ADMIN', 'SUPER_ADMIN', 'MODERATOR'].includes(user.role)) {
        return NextResponse.json(
          { success: false, error: 'Not authorized to delete this discussion' },
          { status: 403 }
        )
      }
    }

    // Delete discussion (cascades to replies)
    await prisma.moduleDiscussion.delete({
      where: { id: discussionId }
    })

    return NextResponse.json({
      success: true,
      message: 'Discussion deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete discussion' },
      { status: 500 }
    )
  }
}
