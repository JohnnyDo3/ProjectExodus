import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get project discussions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const skip = (page - 1) * limit

    const whereClause: any = { projectId }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      whereClause.category = category
    }

    const [discussions, total] = await Promise.all([
      prisma.projectDiscussion.findMany({
        where: whereClause,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
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
      prisma.projectDiscussion.count({ where: whereClause }),
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

// POST - Create discussion (Contributors only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const body = await request.json()
    const { title, content, category } = body

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    // Check membership
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

    const isOwner = project?.creatorId === session.user.id
    const canPost =
      isOwner ||
      membership?.role === 'CONTRIBUTOR' ||
      membership?.role === 'MODERATOR' ||
      membership?.role === 'ADMIN' ||
      membership?.role === 'OWNER'

    if (!canPost) {
      return NextResponse.json(
        { success: false, error: 'Only contributors can post discussions' },
        { status: 403 }
      )
    }

    const discussion = await prisma.projectDiscussion.create({
      data: {
        projectId,
        authorId: session.user.id,
        title: title.trim(),
        content: content?.trim() || null,
        category: category || 'GENERAL',
      },
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

    // Award contribution points
    if (membership) {
      await prisma.projectContribution.create({
        data: {
          projectId,
          userId: session.user.id,
          type: 'DISCUSSION',
          description: `Started discussion: ${title.substring(0, 50)}`,
          points: 5,
          referenceId: discussion.id,
        },
      })

      await prisma.projectMember.update({
        where: { id: membership.id },
        data: {
          contributionScore: { increment: 5 },
        },
      })
    }

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
