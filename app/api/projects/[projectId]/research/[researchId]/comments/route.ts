import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET - Get comments for a research post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; researchId: string }> }
) {
  try {
    const { projectId, researchId } = await params

    // Verify research post exists
    const post = await prisma.projectResearch.findUnique({
      where: { id: researchId },
    })

    if (!post || post.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Research post not found' },
        { status: 404 }
      )
    }

    const comments = await prisma.projectResearchComment.findMany({
      where: { researchId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: comments,
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST - Add comment to research post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; researchId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, researchId } = await params
    const body = await request.json()
    const { content } = body

    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Comment content is required' },
        { status: 400 }
      )
    }

    // Verify research post exists
    const post = await prisma.projectResearch.findUnique({
      where: { id: researchId },
    })

    if (!post || post.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Research post not found' },
        { status: 404 }
      )
    }

    // Anyone can comment (for now - could restrict to members)
    const comment = await prisma.projectResearchComment.create({
      data: {
        researchId,
        authorId: session.user.id,
        content: content.trim(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            
            image: true,
          },
        },
      },
    })

    // Award contribution points for commenting (smaller amount)
    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    if (membership) {
      await prisma.projectContribution.create({
        data: {
          projectId,
          userId: session.user.id,
          type: 'COMMENT',
          description: `Commented on research post`,
          points: 2,
          referenceId: comment.id,
        },
      })

      await prisma.projectMember.update({
        where: { id: membership.id },
        data: {
          contributionScore: { increment: 2 },
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: comment,
    })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

// PUT - Update comment (Author only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; researchId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { researchId } = await params
    const body = await request.json()
    const { commentId, content } = body

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: 'Comment ID required' },
        { status: 400 }
      )
    }

    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Comment content is required' },
        { status: 400 }
      )
    }

    const comment = await prisma.projectResearchComment.findUnique({
      where: { id: commentId },
    })

    if (!comment || comment.researchId !== researchId) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      )
    }

    if (comment.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Only the author can edit this comment' },
        { status: 403 }
      )
    }

    const updatedComment = await prisma.projectResearchComment.update({
      where: { id: commentId },
      data: { content: content.trim() },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            
            image: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedComment,
    })
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}

// DELETE - Delete comment (Author or admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; researchId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, researchId } = await params
    const { searchParams } = new URL(request.url)
    const commentId = searchParams.get('id')

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: 'Comment ID required' },
        { status: 400 }
      )
    }

    const comment = await prisma.projectResearchComment.findUnique({
      where: { id: commentId },
    })

    if (!comment || comment.researchId !== researchId) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      )
    }

    const isAuthor = comment.authorId === session.user.id

    // Check if admin
    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true },
    })

    const isAdmin =
      project?.creatorId === session.user.id ||
      membership?.role === 'ADMIN' ||
      membership?.role === 'OWNER' ||
      membership?.role === 'MODERATOR'

    if (!isAuthor && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only the author or admins can delete this comment' },
        { status: 403 }
      )
    }

    await prisma.$transaction([
      prisma.projectContribution.deleteMany({
        where: { referenceId: commentId, type: 'COMMENT' },
      }),
      prisma.projectResearchComment.delete({
        where: { id: commentId },
      }),
    ])

    // Deduct contribution points if author is deleting
    if (isAuthor && membership) {
      await prisma.projectMember.update({
        where: { id: membership.id },
        data: {
          contributionScore: { decrement: 2 },
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Comment deleted',
    })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
