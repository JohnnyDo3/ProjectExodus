import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface ActivityItem {
  id: string
  type: 'new_user' | 'new_post' | 'new_project' | 'new_article' | 'new_event' | 'new_follow' | 'new_comment'
  message: string
  userId?: string
  userName?: string
  userImage?: string
  targetName?: string
  targetId?: string
  createdAt: Date
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')

    // Fetch recent activity from multiple sources in parallel
    const [
      recentUsers,
      recentPosts,
      recentProjects,
      recentArticles,
      recentEvents,
      recentFollows,
      recentComments
    ] = await Promise.all([
      // New users (last 7 days)
      prisma.user.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          id: true,
          name: true,
          image: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // New posts
      prisma.socialPost.findMany({
        where: {
          visibility: 'PUBLIC',
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // New projects
      prisma.project.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
          creator: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // New articles
      prisma.article.findMany({
        where: {
          status: 'PUBLISHED',
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // New events
      prisma.event.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          creator: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // New follows
      prisma.userFollow.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          id: true,
          createdAt: true,
          follower: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          following: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // New comments
      prisma.socialComment.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ])

    // Transform into unified activity items
    const activities: ActivityItem[] = []

    // Add new users
    recentUsers.forEach(user => {
      activities.push({
        id: `user-${user.id}`,
        type: 'new_user',
        message: `${user.name || 'Someone'} joined the community`,
        userId: user.id,
        userName: user.name || 'Anonymous',
        userImage: user.image || undefined,
        createdAt: user.createdAt
      })
    })

    // Add new posts
    recentPosts.forEach(post => {
      activities.push({
        id: `post-${post.id}`,
        type: 'new_post',
        message: `${post.user.name || 'Someone'} shared a post`,
        userId: post.user.id,
        userName: post.user.name || 'Anonymous',
        userImage: post.user.image || undefined,
        targetId: post.id,
        createdAt: post.createdAt
      })
    })

    // Add new projects
    recentProjects.forEach(project => {
      activities.push({
        id: `project-${project.id}`,
        type: 'new_project',
        message: `${project.creator.name || 'Someone'} created "${project.name}"`,
        userId: project.creator.id,
        userName: project.creator.name || 'Anonymous',
        userImage: project.creator.image || undefined,
        targetName: project.name,
        targetId: project.slug,
        createdAt: project.createdAt
      })
    })

    // Add new articles
    recentArticles.forEach(article => {
      activities.push({
        id: `article-${article.id}`,
        type: 'new_article',
        message: `${article.author.name || 'Someone'} published "${article.title}"`,
        userId: article.author.id,
        userName: article.author.name || 'Anonymous',
        userImage: article.author.image || undefined,
        targetName: article.title,
        targetId: article.slug,
        createdAt: article.createdAt
      })
    })

    // Add new events
    recentEvents.forEach(event => {
      activities.push({
        id: `event-${event.id}`,
        type: 'new_event',
        message: `${event.creator.name || 'Someone'} created event "${event.title}"`,
        userId: event.creator.id,
        userName: event.creator.name || 'Anonymous',
        userImage: event.creator.image || undefined,
        targetName: event.title,
        targetId: event.id,
        createdAt: event.createdAt
      })
    })

    // Add new follows
    recentFollows.forEach(follow => {
      activities.push({
        id: `follow-${follow.id}`,
        type: 'new_follow',
        message: `${follow.follower.name || 'Someone'} followed ${follow.following.name || 'someone'}`,
        userId: follow.follower.id,
        userName: follow.follower.name || 'Anonymous',
        userImage: follow.follower.image || undefined,
        targetName: follow.following.name || 'Anonymous',
        targetId: follow.following.id,
        createdAt: follow.createdAt
      })
    })

    // Add new comments
    recentComments.forEach(comment => {
      activities.push({
        id: `comment-${comment.id}`,
        type: 'new_comment',
        message: `${comment.user.name || 'Someone'} left a comment`,
        userId: comment.user.id,
        userName: comment.user.name || 'Anonymous',
        userImage: comment.user.image || undefined,
        createdAt: comment.createdAt
      })
    })

    // Sort by createdAt (most recent first) and limit
    activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const limitedActivities = activities.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedActivities
    })
  } catch (error) {
    console.error('Error fetching activity feed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity feed' },
      { status: 500 }
    )
  }
}
