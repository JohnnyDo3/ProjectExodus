import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '40'), 80)
    const category = searchParams.get('category') // optional filter

    // ── Parallel fetch all activity sources (most recent, no date cutoff) ─

    const [
      recentUsers,
      recentPosts,
      recentProjects,
      recentArticles,
      recentEvents,
      recentFollows,
      recentComments,
      forumPosts,
      trending,
    ] = await Promise.all([
      prisma.user.findMany({
        select: { id: true, name: true, image: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.socialPost.findMany({
        where: { visibility: 'PUBLIC' },
        select: {
          id: true, content: true, createdAt: true, mediaUrl: true,
          user: { select: { id: true, name: true, image: true } },
          _count: { select: { comments: true, likes: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 15,
      }),
      prisma.project.findMany({
        select: {
          id: true, name: true, slug: true, description: true, createdAt: true,
          creator: { select: { id: true, name: true, image: true } },
          _count: { select: { members: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          id: true, title: true, slug: true, excerpt: true, coverImage: true, createdAt: true,
          author: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.event.findMany({
        select: {
          id: true, title: true, description: true, createdAt: true,
          creator: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.userFollow.findMany({
        select: {
          id: true, createdAt: true,
          follower: { select: { id: true, name: true, image: true } },
          following: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.socialComment.findMany({
        select: {
          id: true, content: true, createdAt: true,
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.forumPost.findMany({
        select: {
          id: true, title: true, content: true, createdAt: true,
          author: { select: { id: true, name: true, image: true } },
          category: { select: { name: true } },
          _count: { select: { replies: true, likes: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.hashtag.findMany({
        orderBy: { postCount: 'desc' },
        take: 10,
        select: { id: true, tag: true, postCount: true },
      }),
    ])

    // ── Build unified activity items ─────────────────────────────────────

    type HubItem = {
      id: string
      type: string
      category: string
      title: string
      preview: string
      userName: string
      userImage: string | null
      userId: string
      targetUrl: string
      imageUrl: string | null
      engagement: number
      createdAt: string
    }

    const items: HubItem[] = []

    for (const u of recentUsers) {
      items.push({
        id: `user-${u.id}`, type: 'new_member', category: 'members',
        title: `${u.name || 'Someone'} joined`,
        preview: 'Welcome to the community!',
        userName: u.name || 'Anonymous', userImage: u.image, userId: u.id,
        targetUrl: `/profile/${u.id}`, imageUrl: u.image,
        engagement: 0, createdAt: u.createdAt.toISOString(),
      })
    }

    for (const p of recentPosts) {
      items.push({
        id: `post-${p.id}`, type: 'post', category: 'discussions',
        title: `${p.user.name || 'Someone'} shared a post`,
        preview: p.content.slice(0, 160),
        userName: p.user.name || 'Anonymous', userImage: p.user.image, userId: p.user.id,
        targetUrl: `/social`, imageUrl: p.mediaUrl,
        engagement: p._count.comments + p._count.likes,
        createdAt: p.createdAt.toISOString(),
      })
    }

    for (const p of recentProjects) {
      items.push({
        id: `project-${p.id}`, type: 'project', category: 'projects',
        title: p.name,
        preview: p.description?.slice(0, 160) || '',
        userName: p.creator.name || 'Anonymous', userImage: p.creator.image, userId: p.creator.id,
        targetUrl: `/community/projects/${p.slug}`, imageUrl: null,
        engagement: p._count.members,
        createdAt: p.createdAt.toISOString(),
      })
    }

    for (const a of recentArticles) {
      items.push({
        id: `article-${a.id}`, type: 'article', category: 'articles',
        title: a.title,
        preview: a.excerpt?.slice(0, 160) || '',
        userName: a.author.name || 'Anonymous', userImage: a.author.image, userId: a.author.id,
        targetUrl: `/articles/${a.slug}`, imageUrl: a.coverImage,
        engagement: 0,
        createdAt: a.createdAt.toISOString(),
      })
    }

    for (const e of recentEvents) {
      items.push({
        id: `event-${e.id}`, type: 'event', category: 'events',
        title: e.title,
        preview: e.description?.slice(0, 160) || '',
        userName: e.creator.name || 'Anonymous', userImage: e.creator.image, userId: e.creator.id,
        targetUrl: `/community/events`, imageUrl: null,
        engagement: 0,
        createdAt: e.createdAt.toISOString(),
      })
    }

    for (const f of recentFollows) {
      items.push({
        id: `follow-${f.id}`, type: 'follow', category: 'members',
        title: `${f.follower.name || 'Someone'} followed ${f.following.name || 'someone'}`,
        preview: '',
        userName: f.follower.name || 'Anonymous', userImage: f.follower.image, userId: f.follower.id,
        targetUrl: `/profile/${f.following.id}`, imageUrl: null,
        engagement: 0,
        createdAt: f.createdAt.toISOString(),
      })
    }

    for (const c of recentComments) {
      items.push({
        id: `comment-${c.id}`, type: 'comment', category: 'discussions',
        title: `${c.user.name || 'Someone'} commented`,
        preview: c.content.slice(0, 120),
        userName: c.user.name || 'Anonymous', userImage: c.user.image, userId: c.user.id,
        targetUrl: `/social`, imageUrl: null,
        engagement: 0,
        createdAt: c.createdAt.toISOString(),
      })
    }

    for (const fp of forumPosts) {
      items.push({
        id: `forum-${fp.id}`, type: 'forum_post', category: 'forums',
        title: fp.title,
        preview: fp.content.replace(/<[^>]*>/g, '').slice(0, 160),
        userName: fp.author.name || 'Anonymous', userImage: fp.author.image, userId: fp.author.id,
        targetUrl: `/community/forum/${fp.id}`, imageUrl: null,
        engagement: fp._count.replies + fp._count.likes,
        createdAt: fp.createdAt.toISOString(),
      })
    }

    // ── Filter by category if requested ──────────────────────────────────

    let filtered = items
    if (category && category !== 'all') {
      filtered = items.filter(i => i.category === category)
    }

    // Sort by date, limit
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const limited = filtered.slice(0, limit)

    // ── Category counts for Archipelago ──────────────────────────────────

    const categoryCounts: Record<string, number> = {}
    for (const item of items) {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
    }

    // ── Hourly activity for Pulse heatmap (last 24h) ─────────────────────

    const hourlyActivity: number[] = new Array(24).fill(0)
    const now = Date.now()
    for (const item of items) {
      const hoursAgo = Math.floor((now - new Date(item.createdAt).getTime()) / (1000 * 60 * 60))
      if (hoursAgo >= 0 && hoursAgo < 24) {
        hourlyActivity[23 - hoursAgo]++
      }
    }

    // ── Weekly count & latest timestamp ──────────────────────────────────

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const weeklyActivity = items.filter(
      i => new Date(i.createdAt).getTime() >= sevenDaysAgo
    ).length
    const latestAt = items.length > 0 ? items[0].createdAt : null

    return NextResponse.json({
      success: true,
      data: {
        items: limited,
        categoryCounts,
        hourlyActivity,
        trending: trending.map((t: { tag: string; postCount: number }) => ({ tag: t.tag, count: t.postCount })),
        totalActivity: items.length,
        weeklyActivity,
        latestAt,
      },
    })
  } catch (error) {
    console.error('Error fetching discussions hub:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hub data' },
      { status: 500 }
    )
  }
}
