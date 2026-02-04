import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get subgroup discussions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    const { projectId, subgroupId } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Check subgroup exists
    const subgroup = await prisma.projectSubgroup.findUnique({
      where: { id: subgroupId },
    })

    if (!subgroup || subgroup.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Subgroup not found' },
        { status: 404 }
      )
    }

    // For private subgroups, check membership
    if (subgroup.isPrivate && session?.user?.id) {
      const membership = await prisma.subgroupMember.findUnique({
        where: {
          subgroupId_userId: {
            subgroupId,
            userId: session.user.id,
          },
        },
      })

      if (!membership) {
        return NextResponse.json(
          { success: false, error: 'Access denied to private subgroup' },
          { status: 403 }
        )
      }
    } else if (subgroup.isPrivate) {
      return NextResponse.json(
        { success: false, error: 'Login required for private subgroup' },
        { status: 401 }
      )
    }

    const [discussions, total] = await Promise.all([
      prisma.subgroupDiscussion.findMany({
        where: { subgroupId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              
              image: true,
            },
          },
          _count: {
            select: {
              replies: true,
            },
          },
        },
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.subgroupDiscussion.count({
        where: { subgroupId },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        discussions,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching discussions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

// POST - Create discussion (Members only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, subgroupId } = await params
    const body = await request.json()
    const { title, content } = body

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    // Check subgroup exists
    const subgroup = await prisma.projectSubgroup.findUnique({
      where: { id: subgroupId },
    })

    if (!subgroup || subgroup.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Subgroup not found' },
        { status: 404 }
      )
    }

    // Check membership
    const membership = await prisma.subgroupMember.findUnique({
      where: {
        subgroupId_userId: {
          subgroupId,
          userId: session.user.id,
        },
      },
    })

    if (!membership) {
      return NextResponse.json(
        { success: false, error: 'You must be a member to post discussions' },
        { status: 403 }
      )
    }

    const discussion = await prisma.subgroupDiscussion.create({
      data: {
        subgroupId,
        authorId: session.user.id,
        title: title.trim(),
        content: content?.trim() || null,
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

    return NextResponse.json({
      success: true,
      data: discussion,
    })
  } catch (error) {
    console.error('Error creating discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create discussion' },
      { status: 500 }
    )
  }
}

// PUT - Update discussion (Author or leader only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { subgroupId } = await params
    const body = await request.json()
    const { discussionId, title, content, isPinned } = body

    if (!discussionId) {
      return NextResponse.json(
        { success: false, error: 'Discussion ID required' },
        { status: 400 }
      )
    }

    const discussion = await prisma.subgroupDiscussion.findUnique({
      where: { id: discussionId },
    })

    if (!discussion || discussion.subgroupId !== subgroupId) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    const isAuthor = discussion.authorId === session.user.id

    // Check if leader for pin functionality
    const isLeader = await prisma.subgroupLeader.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        isLeader: true,
      },
    })

    if (!isAuthor && !isLeader) {
      return NextResponse.json(
        { success: false, error: 'Only the author or leaders can edit discussions' },
        { status: 403 }
      )
    }

    // Authors can edit content, leaders can pin
    const updateData: any = {}

    if (isAuthor) {
      if (title) updateData.title = title.trim()
      if (content !== undefined) updateData.content = content?.trim() || null
    }

    if (isLeader && isPinned !== undefined) {
      updateData.isPinned = isPinned
    }

    const updatedDiscussion = await prisma.subgroupDiscussion.update({
      where: { id: discussionId },
      data: updateData,
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
      data: updatedDiscussion,
    })
  } catch (error) {
    console.error('Error updating discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update discussion' },
      { status: 500 }
    )
  }
}

// DELETE - Delete discussion (Author or leader only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { subgroupId } = await params
    const { searchParams } = new URL(request.url)
    const discussionId = searchParams.get('id')

    if (!discussionId) {
      return NextResponse.json(
        { success: false, error: 'Discussion ID required' },
        { status: 400 }
      )
    }

    const discussion = await prisma.subgroupDiscussion.findUnique({
      where: { id: discussionId },
    })

    if (!discussion || discussion.subgroupId !== subgroupId) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    const isAuthor = discussion.authorId === session.user.id

    const isLeader = await prisma.subgroupLeader.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        isLeader: true,
      },
    })

    if (!isAuthor && !isLeader) {
      return NextResponse.json(
        { success: false, error: 'Only the author or leaders can delete discussions' },
        { status: 403 }
      )
    }

    // Delete replies first, then discussion
    await prisma.$transaction([
      prisma.subgroupDiscussionReply.deleteMany({
        where: { discussionId },
      }),
      prisma.subgroupDiscussion.delete({
        where: { id: discussionId },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Discussion deleted',
    })
  } catch (error) {
    console.error('Error deleting discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete discussion' },
      { status: 500 }
    )
  }
}
