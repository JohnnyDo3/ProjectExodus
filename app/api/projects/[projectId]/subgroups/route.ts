import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Fetch all subgroups for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const includePrivate = searchParams.get('includePrivate') === 'true'

    // Build where clause based on visibility
    const whereClause: any = { projectId }

    // If not logged in or not requesting private, only show public
    if (!session?.user?.id || !includePrivate) {
      whereClause.isPrivate = false
    }

    const subgroups = await prisma.projectSubgroup.findMany({
      where: whereClause,
      include: {
        leaders: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            discussions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // If logged in, add user's membership status
    let subgroupsWithMembership = subgroups

    if (session?.user?.id) {
      const userMemberships = await prisma.subgroupMember.findMany({
        where: {
          userId: session.user.id,
          subgroupId: { in: subgroups.map((s: { id: string }) => s.id) },
        },
      })

      const membershipMap = new Map(
        userMemberships.map((m: { subgroupId: string }) => [m.subgroupId, m])
      )

      subgroupsWithMembership = subgroups.map((sg: typeof subgroups[number]) => ({
        ...sg,
        userMembership: membershipMap.get(sg.id) || null,
      })) as typeof subgroups
    }

    return NextResponse.json({
      success: true,
      data: subgroupsWithMembership,
    })
  } catch (error) {
    console.error('Error fetching subgroups:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subgroups' },
      { status: 500 }
    )
  }
}

// POST - Create new subgroup (Admin or approved member only)
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
    const { name, description, goal, isPrivate, entryRequirements } = body

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Subgroup name is required' },
        { status: 400 }
      )
    }

    // Check if user is a contributor or admin of the project
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
    const canCreate =
      isOwner ||
      membership?.role === 'ADMIN' ||
      membership?.role === 'OWNER' ||
      membership?.role === 'CONTRIBUTOR' ||
      membership?.role === 'MODERATOR'

    if (!canCreate) {
      return NextResponse.json(
        { success: false, error: 'Only project contributors can create subgroups' },
        { status: 403 }
      )
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Check if slug is unique within project
    const existingSubgroup = await prisma.projectSubgroup.findFirst({
      where: { projectId, slug },
    })

    const finalSlug = existingSubgroup
      ? `${slug}-${Date.now().toString(36)}`
      : slug

    // Create subgroup with creator as first leader
    const subgroup = await prisma.projectSubgroup.create({
      data: {
        projectId,
        name: name.trim(),
        slug: finalSlug,
        description: description?.trim() || null,
        goal: goal?.trim() || null,
        isPrivate: isPrivate || false,
        entryRequirements: entryRequirements?.trim() || null,
        leaders: {
          create: {
            userId: session.user.id,
          },
        },
        members: {
          create: {
            userId: session.user.id,
          },
        },
      },
      include: {
        leaders: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            discussions: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: subgroup,
    })
  } catch (error) {
    console.error('Error creating subgroup:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create subgroup' },
      { status: 500 }
    )
  }
}
