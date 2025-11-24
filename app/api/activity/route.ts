import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/activity - Get activity feed from users you follow
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')

    // Get users you're following
    const following = await prisma.userFollow.findMany({
      where: { followerId: session.user.id },
      select: { followingId: true },
    })

    const followingIds = following.map((f: { followingId: string }) => f.followingId)

    // If not following anyone, return empty feed
    if (followingIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      })
    }

    // Fetch recent activities from followed users
    const activities: any[] = []

    // 1. New project memberships
    const projectJoins = await prisma.projectMember.findMany({
      where: {
        userId: { in: followingIds },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
          },
        },
      },
      take: limit,
    })

    // Filter to recent joins (use project creation as proxy since ProjectMember doesn't have createdAt)
    const recentProjectJoins = projectJoins.filter(
      (pj: { project: { createdAt: Date } }) => new Date(pj.project.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    )

    activities.push(
      ...recentProjectJoins.map((pj: any) => ({
        id: `project-join-${pj.id}`,
        type: 'PROJECT_JOIN',
        user: pj.user,
        project: pj.project,
        createdAt: pj.project.createdAt,
      }))
    )

    // 2. New forum posts
    const forumPosts = await prisma.forumPost.findMany({
      where: {
        userId: { in: followingIds },
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        user: {
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
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    activities.push(
      ...forumPosts.map((post: any) => ({
        id: `forum-post-${post.id}`,
        type: 'FORUM_POST',
        user: post.user,
        forumPost: {
          id: post.id,
          title: post.title,
          content: post.content,
          slug: post.slug,
          commentCount: post._count.replies,
        },
        createdAt: post.createdAt,
      }))
    )

    // 3. New events created
    const events = await prisma.event.findMany({
      where: {
        creatorId: { in: followingIds },
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    activities.push(
      ...events.map((event: any) => ({
        id: `event-create-${event.id}`,
        type: 'EVENT_CREATE',
        user: event.creator,
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          type: event.type,
          startDate: event.startDate,
          attendeeCount: event._count.attendees,
        },
        createdAt: event.createdAt,
      }))
    )

    // 4. Event RSVPs
    const eventRSVPs = await prisma.eventAttendee.findMany({
      where: {
        userId: { in: followingIds },
        status: 'GOING',
        joinedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            startDate: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
      take: limit,
    })

    activities.push(
      ...eventRSVPs.map((rsvp: any) => ({
        id: `event-rsvp-${rsvp.id}`,
        type: 'EVENT_RSVP',
        user: rsvp.user,
        event: {
          id: rsvp.event.id,
          title: rsvp.event.title,
          slug: rsvp.event.slug,
          type: rsvp.event.type,
          startDate: rsvp.event.startDate,
        },
        createdAt: rsvp.joinedAt,
      }))
    )

    // 5. New projects created
    const projects = await prisma.project.findMany({
      where: {
        creatorId: { in: followingIds },
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    activities.push(
      ...projects.map((project: any) => ({
        id: `project-create-${project.id}`,
        type: 'PROJECT_CREATE',
        user: project.creator,
        project: {
          id: project.id,
          name: project.name,
          slug: project.slug,
          description: project.description,
          memberCount: project._count.members,
        },
        createdAt: project.createdAt,
      }))
    )

    // Sort all activities by date and limit
    activities.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    const limitedActivities = activities.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedActivities,
    })
  } catch (error) {
    console.error('Error fetching activity feed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity feed' },
      { status: 500 }
    )
  }
}
