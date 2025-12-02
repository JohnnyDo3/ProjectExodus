import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface ActivityItem {
  id: string
  type: 'new_user' | 'new_post' | 'new_project' | 'new_article' | 'new_event' | 'new_follow' | 'new_comment'
  message: string
  userId?: string
  userName?: string
  userImage?: string | null
  targetName?: string
  targetId?: string
  createdAt: Date
}

// Types for Prisma query results
interface RecentUser {
  id: string
  name: string | null
  image: string | null
  createdAt: Date
}

interface RecentPost {
  id: string
  content: string
  createdAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

interface RecentProject {
  id: string
  name: string
  slug: string
  createdAt: Date
  creator: {
    id: string
    name: string | null
    image: string | null
  }
}

interface RecentArticle {
  id: string
  title: string
  slug: string
  createdAt: Date
  author: {
    id: string
    name: string | null
    image: string | null
  }
}

interface RecentEvent {
  id: string
  title: string
  createdAt: Date
  creator: {
    id: string
    name: string | null
    image: string | null
  }
}

interface RecentFollow {
  id: string
  createdAt: Date
  follower: {
    id: string
    name: string | null
    image: string | null
  }
  following: {
    id: string
    name: string | null
  }
}

interface RecentComment {
  id: string
  content: string
  createdAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
  }
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
    (recentUsers as RecentUser[]).forEach((user: RecentUser) => {
      activities.push({
        id: `user-${user.id}`,
        type: 'new_user',
        message: `${user.name || 'Someone'} joined the community`,
        userId: user.id,
        userName: user.name || 'Anonymous',
        userImage: user.image,
        createdAt: user.createdAt
      })
    })

    // Add new posts
    (recentPosts as RecentPost[]).forEach((post: RecentPost) => {
      activities.push({
        id: `post-${post.id}`,
        type: 'new_post',
        message: `${post.user.name || 'Someone'} shared a post`,
        userId: post.user.id,
        userName: post.user.name || 'Anonymous',
        userImage: post.user.image,
        targetId: post.id,
        createdAt: post.createdAt
      })
    })

    // Add new projects
    (recentProjects as RecentProject[]).forEach((project: RecentProject) => {
      activities.push({
        id: `project-${project.id}`,
        type: 'new_project',
        message: `${project.creator.name || 'Someone'} created "${project.name}"`,
        userId: project.creator.id,
        userName: project.creator.name || 'Anonymous',
        userImage: project.creator.image,
        targetName: project.name,
        targetId: project.slug,
        createdAt: project.createdAt
      })
    })

    // Add new articles
    (recentArticles as RecentArticle[]).forEach((article: RecentArticle) => {
      activities.push({
        id: `article-${article.id}`,
        type: 'new_article',
        message: `${article.author.name || 'Someone'} published "${article.title}"`,
        userId: article.author.id,
        userName: article.author.name || 'Anonymous',
        userImage: article.author.image,
        targetName: article.title,
        targetId: article.slug,
        createdAt: article.createdAt
      })
    })

    // Add new events
    (recentEvents as RecentEvent[]).forEach((event: RecentEvent) => {
      activities.push({
        id: `event-${event.id}`,
        type: 'new_event',
        message: `${event.creator.name || 'Someone'} created event "${event.title}"`,
        userId: event.creator.id,
        userName: event.creator.name || 'Anonymous',
        userImage: event.creator.image,
        targetName: event.title,
        targetId: event.id,
        createdAt: event.createdAt
      })
    })

    // Add new follows
    (recentFollows as RecentFollow[]).forEach((follow: RecentFollow) => {
      activities.push({
        id: `follow-${follow.id}`,
        type: 'new_follow',
        message: `${follow.follower.name || 'Someone'} followed ${follow.following.name || 'someone'}`,
        userId: follow.follower.id,
        userName: follow.follower.name || 'Anonymous',
        userImage: follow.follower.image,
        targetName: follow.following.name || 'Anonymous',
        targetId: follow.following.id,
        createdAt: follow.createdAt
      })
    })

    // Add new comments
    (recentComments as RecentComment[]).forEach((comment: RecentComment) => {
      activities.push({
        id: `comment-${comment.id}`,
        type: 'new_comment',
        message: `${comment.user.name || 'Someone'} left a comment`,
        userId: comment.user.id,
        userName: comment.user.name || 'Anonymous',
        userImage: comment.user.image,
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
