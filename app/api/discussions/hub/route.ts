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
      recentSocialComments,
      recentArticleComments,
      recentProjectDiscussions,
      recentModuleDiscussions,
    ] = await Promise.all([
      prisma.user.findMany({
        select: { id: true, name: true, image: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      prisma.socialPost.findMany({
        where: { visibility: 'PUBLIC' },
        select: {
          id: true, content: true, createdAt: true, hashtags: true,
          media: { select: { url: true }, take: 1 },
          user: { select: { id: true, name: true, image: true } },
          _count: { select: { comments: true, likes: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.project.findMany({
        select: {
          id: true, name: true, slug: true, description: true, createdAt: true,
          creator: { select: { id: true, name: true, image: true } },
          _count: { select: { members: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          id: true, title: true, slug: true, excerpt: true, coverImage: true, createdAt: true,
          author: { select: { id: true, name: true, image: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.event.findMany({
        select: {
          id: true, title: true, description: true, createdAt: true,
          creator: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      prisma.userFollow.findMany({
        select: {
          id: true, createdAt: true,
          follower: { select: { id: true, name: true, image: true } },
          following: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      prisma.socialComment.findMany({
        select: {
          id: true, content: true, createdAt: true,
          user: { select: { id: true, name: true, image: true } },
          post: { select: { id: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.comment.findMany({
        select: {
          id: true, content: true, createdAt: true,
          user: { select: { id: true, name: true, image: true } },
          article: { select: { id: true, slug: true, title: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.projectDiscussion.findMany({
        select: {
          id: true, title: true, content: true, createdAt: true,
          author: { select: { id: true, name: true, image: true } },
          project: { select: { slug: true, name: true } },
          _count: { select: { replies: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.moduleDiscussion.findMany({
        select: {
          id: true, title: true, content: true, createdAt: true,
          author: { select: { id: true, name: true, image: true } },
          article: { select: { slug: true, title: true } },
          _count: { select: { replies: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
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
      const firstMedia = p.media?.[0]?.url || null
      items.push({
        id: `post-${p.id}`, type: 'post', category: 'discussions',
        title: `${p.user.name || 'Someone'} shared a post`,
        preview: p.content.slice(0, 160),
        userName: p.user.name || 'Anonymous', userImage: p.user.image, userId: p.user.id,
        targetUrl: `/social`, imageUrl: firstMedia,
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
        engagement: a._count.comments,
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

    for (const c of recentSocialComments) {
      items.push({
        id: `comment-${c.id}`, type: 'comment', category: 'discussions',
        title: `${c.user.name || 'Someone'} commented on a post`,
        preview: c.content.slice(0, 120),
        userName: c.user.name || 'Anonymous', userImage: c.user.image, userId: c.user.id,
        targetUrl: `/social`, imageUrl: null,
        engagement: 0,
        createdAt: c.createdAt.toISOString(),
      })
    }

    for (const c of recentArticleComments) {
      items.push({
        id: `article-comment-${c.id}`, type: 'comment', category: 'articles',
        title: `${c.user.name || 'Someone'} commented on "${c.article.title}"`,
        preview: c.content.slice(0, 120),
        userName: c.user.name || 'Anonymous', userImage: c.user.image, userId: c.user.id,
        targetUrl: `/articles/${c.article.slug}`, imageUrl: null,
        engagement: 0,
        createdAt: c.createdAt.toISOString(),
      })
    }

    for (const d of recentProjectDiscussions) {
      items.push({
        id: `proj-disc-${d.id}`, type: 'forum_post', category: 'discussions',
        title: d.title,
        preview: d.content.replace(/<[^>]*>/g, '').slice(0, 160),
        userName: d.author.name || 'Anonymous', userImage: d.author.image, userId: d.author.id,
        targetUrl: `/community/projects/${d.project.slug}`, imageUrl: null,
        engagement: d._count.replies,
        createdAt: d.createdAt.toISOString(),
      })
    }

    for (const d of recentModuleDiscussions) {
      items.push({
        id: `mod-disc-${d.id}`, type: 'forum_post', category: 'discussions',
        title: d.title,
        preview: d.content.replace(/<[^>]*>/g, '').slice(0, 160),
        userName: d.author.name || 'Anonymous', userImage: d.author.image, userId: d.author.id,
        targetUrl: `/articles/${d.article.slug}`, imageUrl: null,
        engagement: d._count.replies,
        createdAt: d.createdAt.toISOString(),
      })
    }

    // ── Build trending from SocialPost hashtags ────────────────────────────

    const tagCounts: Record<string, number> = {}
    for (const p of recentPosts) {
      for (const tag of (p.hashtags || [])) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      }
    }
    const trending = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }))

    // ── Deduplicate: one card per unique item (keep most recent) ─────────

    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const seen = new Set<string>()
    const deduped: HubItem[] = []
    for (const item of items) {
      if (!seen.has(item.id)) {
        seen.add(item.id)
        deduped.push(item)
      }
    }

    // ── Filter by category if requested ──────────────────────────────────

    let filtered = deduped
    if (category && category !== 'all') {
      filtered = deduped.filter(i => i.category === category)
    }

    const limited = filtered.slice(0, limit)

    // ── Category counts for Archipelago ──────────────────────────────────

    const categoryCounts: Record<string, number> = {}
    for (const item of deduped) {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
    }

    // ── Hourly activity for Pulse heatmap (last 24h) ─────────────────────

    const hourlyActivity: number[] = new Array(24).fill(0)
    const now = Date.now()
    for (const item of deduped) {
      const hoursAgo = Math.floor((now - new Date(item.createdAt).getTime()) / (1000 * 60 * 60))
      if (hoursAgo >= 0 && hoursAgo < 24) {
        hourlyActivity[23 - hoursAgo]++
      }
    }

    // ── Weekly count & latest timestamp ──────────────────────────────────

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const weeklyActivity = deduped.filter(
      i => new Date(i.createdAt).getTime() >= sevenDaysAgo
    ).length
    const latestAt = deduped.length > 0 ? deduped[0].createdAt : null

    return NextResponse.json({
      success: true,
      data: {
        items: limited,
        categoryCounts,
        hourlyActivity,
        trending,
        totalActivity: deduped.length,
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
