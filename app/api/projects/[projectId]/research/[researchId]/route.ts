import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get single research post with comments
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; researchId: string }> }
) {
  try {
    const { projectId, researchId } = await params

    const post = await prisma.projectResearch.findUnique({
      where: { id: researchId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    if (!post || post.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Research post not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.projectResearch.update({
      where: { id: researchId },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('Error fetching research post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch research post' },
      { status: 500 }
    )
  }
}

// PUT - Update research post (Author or admin only)
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

    const { projectId, researchId } = await params
    const body = await request.json()
    const { heading, summary, fullContent, sourceUrl, sourceTitle, tags, isPinned } = body

    const post = await prisma.projectResearch.findUnique({
      where: { id: researchId },
    })

    if (!post || post.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Research post not found' },
        { status: 404 }
      )
    }

    const isAuthor = post.authorId === session.user.id

    // Check if admin for pin functionality
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
        { success: false, error: 'Only the author or admins can edit this post' },
        { status: 403 }
      )
    }

    // Build update data
    const updateData: any = {}

    // Authors can edit content
    if (isAuthor) {
      if (heading) updateData.heading = heading.trim()
      if (summary) updateData.summary = summary.trim()
      if (fullContent !== undefined) updateData.fullContent = fullContent?.trim() || null
      if (sourceUrl !== undefined) updateData.sourceUrl = sourceUrl?.trim() || null
      if (sourceTitle !== undefined) updateData.sourceTitle = sourceTitle?.trim() || null
      if (tags) updateData.tags = tags
    }

    // Admins can pin/unpin
    if (isAdmin && isPinned !== undefined) {
      updateData.isPinned = isPinned
    }

    const updatedPost = await prisma.projectResearch.update({
      where: { id: researchId },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedPost,
    })
  } catch (error) {
    console.error('Error updating research post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update research post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete research post (Author or admin only)
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

    const post = await prisma.projectResearch.findUnique({
      where: { id: researchId },
    })

    if (!post || post.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Research post not found' },
        { status: 404 }
      )
    }

    const isAuthor = post.authorId === session.user.id

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
        { success: false, error: 'Only the author or admins can delete this post' },
        { status: 403 }
      )
    }

    // Delete comments first, then post
    await prisma.$transaction([
      prisma.projectResearchComment.deleteMany({
        where: { researchId },
      }),
      prisma.projectContribution.deleteMany({
        where: { referenceId: researchId, type: 'RESEARCH' },
      }),
      prisma.projectResearch.delete({
        where: { id: researchId },
      }),
    ])

    // Deduct contribution points if author is deleting
    if (isAuthor && membership) {
      await prisma.projectMember.update({
        where: { id: membership.id },
        data: {
          contributionScore: { decrement: 15 },
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Research post deleted',
    })
  } catch (error) {
    console.error('Error deleting research post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete research post' },
      { status: 500 }
    )
  }
}
