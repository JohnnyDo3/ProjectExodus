import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET - Fetch all research posts for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    const skip = (page - 1) * limit

    // Build where clause
    const whereClause: any = { projectId }

    if (tag) {
      whereClause.tags = { has: tag }
    }

    if (search) {
      whereClause.OR = [
        { heading: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [posts, total] = await Promise.all([
      prisma.projectResearch.findMany({
        where: whereClause,
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
              comments: true,
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
      prisma.projectResearch.count({ where: whereClause }),
    ])

    // Get all unique tags for filtering
    const allPosts = await prisma.projectResearch.findMany({
      where: { projectId },
      select: { tags: true },
    })

    const allTags = [...new Set(allPosts.flatMap((p: { tags: string[] | null }) => p.tags || []))]

    return NextResponse.json({
      success: true,
      data: {
        posts,
        tags: allTags,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching research posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch research posts' },
      { status: 500 }
    )
  }
}

// POST - Create new research post (Contributors only)
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
    const { heading, summary, fullContent, sourceUrl, sourceTitle, tags } = body

    if (!heading?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Heading is required' },
        { status: 400 }
      )
    }

    if (!summary?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Summary is required' },
        { status: 400 }
      )
    }

    // Check if user is a contributor or higher
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
        { success: false, error: 'Only contributors can post research' },
        { status: 403 }
      )
    }

    const post = await prisma.projectResearch.create({
      data: {
        projectId,
        authorId: session.user.id,
        heading: heading.trim(),
        summary: summary.trim(),
        fullContent: fullContent?.trim() || null,
        sourceUrl: sourceUrl?.trim() || null,
        sourceTitle: sourceTitle?.trim() || null,
        tags: tags || [],
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

    // Award contribution points
    await prisma.projectContribution.create({
      data: {
        projectId,
        userId: session.user.id,
        type: 'RESEARCH',
        description: `Posted research: ${heading.substring(0, 50)}`,
        points: 15, // Research posts are worth more
        referenceId: post.id,
      },
    })

    // Update member's contribution score
    if (membership) {
      await prisma.projectMember.update({
        where: { id: membership.id },
        data: {
          contributionScore: { increment: 15 },
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('Error creating research post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create research post' },
      { status: 500 }
    )
  }
}
