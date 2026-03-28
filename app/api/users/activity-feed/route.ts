import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'

interface FeedItem {
  id: string
  type: 'article' | 'post' | 'project' | 'follower' | 'learning'
  title: string
  author: { name: string | null; image: string | null }
  createdAt: Date
  href: string
}

// GET /api/users/activity-feed - Chronological feed of recent activity
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get list of people the current user follows
    const follows = await prisma.userFollow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    })

    const followingIds: string[] = follows.map(
      (f: { followingId: string }) => f.followingId
    )

    const feedItems: FeedItem[] = []

    // 1. Articles published by people the user follows
    if (followingIds.length > 0) {
      const articles = await prisma.article.findMany({
        where: {
          authorId: { in: followingIds },
          status: 'PUBLISHED',
          publishedAt: { not: null },
        },
        select: {
          id: true,
          title: true,
          slug: true,
          publishedAt: true,
          createdAt: true,
          author: {
            select: { name: true, image: true },
          },
        },
        orderBy: { publishedAt: 'desc' },
        take: 20,
      })

      for (const a of articles) {
        feedItems.push({
          id: `article-${a.id}`,
          type: 'article',
          title: a.title,
          author: a.author,
          createdAt: a.publishedAt ?? a.createdAt,
          href: `/articles/${a.slug}`,
        })
      }

      // 2. Social posts by people the user follows
      const posts = await prisma.socialPost.findMany({
        where: {
          userId: { in: followingIds },
          visibility: 'PUBLIC',
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })

      for (const p of posts) {
        const preview =
          p.content.length > 120
            ? p.content.slice(0, 120) + '...'
            : p.content
        feedItems.push({
          id: `post-${p.id}`,
          type: 'post',
          title: preview,
          author: p.user,
          createdAt: p.createdAt,
          href: `/social/post/${p.id}`,
        })
      }

      // 3. Projects created by people the user follows
      const projects = await prisma.project.findMany({
        where: {
          creatorId: { in: followingIds },
          visibility: 'PUBLIC',
        },
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
          creator: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })

      for (const proj of projects) {
        feedItems.push({
          id: `project-${proj.id}`,
          type: 'project',
          title: proj.name,
          author: proj.creator,
          createdAt: proj.createdAt,
          href: `/projects/${proj.slug}`,
        })
      }
    }

    // 4. New followers (people who recently followed the current user)
    const newFollowers = await prisma.userFollow.findMany({
      where: { followingId: userId },
      select: {
        id: true,
        createdAt: true,
        follower: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    for (const nf of newFollowers) {
      feedItems.push({
        id: `follower-${nf.id}`,
        type: 'follower',
        title: `${nf.follower.name || 'Someone'} started following you`,
        author: nf.follower,
        createdAt: nf.createdAt,
        href: `/profile/${nf.follower.id}`,
      })
    }

    // 5. User's own completed learning modules
    const completedModules = await prisma.userLearningProgress.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        completedAt: { not: null },
      },
      select: {
        id: true,
        completedAt: true,
        article: {
          select: { title: true, slug: true },
        },
      },
      orderBy: { completedAt: 'desc' },
      take: 10,
    })

    for (const lm of completedModules) {
      feedItems.push({
        id: `learning-${lm.id}`,
        type: 'learning',
        title: `Completed: ${lm.article.title}`,
        author: { name: 'You', image: null },
        createdAt: lm.completedAt!,
        href: `/learn/${lm.article.slug}`,
      })
    }

    // Sort all items by date descending, take top 20
    feedItems.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const limited = feedItems.slice(0, 20)

    return NextResponse.json({
      success: true,
      data: limited,
    })
  } catch (error) {
    console.error('Error fetching activity feed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity feed' },
      { status: 500 }
    )
  }
}
