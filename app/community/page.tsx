import {
  Sparkles, Heart, Globe, Target, Shield, Eye, Flame
} from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { CommunityNewspaper } from '@/components/community/CommunityNewspaper'
import { CommunityHeartPage } from '@/components/community/CommunityHeartPage'

// Guardian archetype icons and colors
const archetypeConfig: Record<string, { icon: any, gradient: string, name: string }> = {
  GUARDIAN_OF_TEMPERANCE: { icon: Shield, gradient: 'from-blue-500 to-cyan-500', name: 'Guardian of Temperance' },
  GUARDIAN_OF_WISDOM: { icon: Eye, gradient: 'from-violet-500 to-purple-500', name: 'Guardian of Wisdom' },
  GUARDIAN_OF_COURAGE: { icon: Flame, gradient: 'from-orange-500 to-red-500', name: 'Guardian of Courage' },
  GUARDIAN_OF_JUSTICE: { icon: Target, gradient: 'from-amber-500 to-yellow-500', name: 'Guardian of Justice' },
  GUARDIAN_OF_HUMANITY: { icon: Heart, gradient: 'from-pink-500 to-rose-500', name: 'Guardian of Humanity' },
  GUARDIAN_OF_TRANSCENDENCE: { icon: Sparkles, gradient: 'from-indigo-500 to-blue-500', name: 'Guardian of Transcendence' },
  GUARDIAN_OF_NATURE: { icon: Globe, gradient: 'from-emerald-500 to-green-500', name: 'Guardian of Nature' },
}

async function getDashboardData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          take: 5,
          include: { badge: true },
          orderBy: { earnedAt: 'desc' }
        },
        createdProjects: {
          take: 3,
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            articles: true,
            followers: true,
            following: true,
            createdProjects: true
          }
        }
      }
    })

    const totalArticles = await prisma.article.count()
    const totalProjects = await prisma.project.count()

    const suggestedUsers = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
        followers: {
          some: {
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
          }
        }
      },
      take: 8,
      select: {
        id: true,
        name: true,
        image: true,
        guardianArchetype: true,
        _count: { select: { followers: true, articles: true } }
      },
      orderBy: { followers: { _count: 'desc' } }
    })

    const activeProjects = await prisma.project.findMany({
      where: { status: 'ACTIVE' },
      take: 12,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, slug: true, description: true,
        status: true, createdAt: true,
        creator: { select: { name: true, image: true } },
        _count: { select: { members: true } }
      }
    })

    const recentDiscussions = await prisma.socialPost.findMany({
      where: { visibility: 'PUBLIC' },
      take: 15,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, content: true, createdAt: true,
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { comments: true, likes: true } },
        likes: {
          where: { userId: userId },
          select: { id: true },
          take: 1
        }
      }
    })

    // Transform to include isLiked boolean
    const discussionsWithLikeStatus = recentDiscussions.map((d: typeof recentDiscussions[number]) => ({
      ...d,
      isLiked: d.likes.length > 0,
      likes: undefined // Remove the likes array, keep only isLiked
    }))

    const stats = await prisma.$transaction([
      prisma.user.count(),
      prisma.project.count({ where: { status: { in: ['ACTIVE', 'PLANNING'] } } }),
      prisma.article.count({ where: { status: 'PUBLISHED' } })
    ])

    // Get recent activity for "breaking news"
    const recentActivity = await prisma.$queryRaw<Array<{
      type: string
      message: string
      created_at: Date
    }>>`
      SELECT 'new_user' as type, CONCAT('New member joined: ', name) as message, "createdAt" as created_at
      FROM "User"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      UNION ALL
      SELECT 'new_project' as type, CONCAT('New project launched: ', name) as message, "createdAt" as created_at
      FROM "Project"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      UNION ALL
      SELECT 'new_article' as type, CONCAT('New article published: ', title) as message, "createdAt" as created_at
      FROM "Article"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      ORDER BY created_at DESC
      LIMIT 10
    `

    return {
      user,
      suggestedUsers,
      activeProjects,
      recentDiscussions: discussionsWithLikeStatus,
      recentActivity,
      communityStats: {
        totalMembers: stats[0],
        activeProjects: stats[1],
        knowledgeArticles: stats[2],
        totalArticles,
        totalProjects
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return null
  }
}

export default async function CommunityPage() {
  const session = await auth()

  // ============================================
  // NON-LOGGED IN VIEW - Community Heart Page with Flip Widgets
  // ============================================
  if (!session?.user?.id) {
    return <CommunityHeartPage isAuthenticated={false} />
  }

  // ============================================
  // LOGGED IN VIEW - Newspaper Layout
  // ============================================
  const dashboardData = await getDashboardData(session.user.id)

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl font-semibold text-theme-muted">Error loading dashboard</p>
      </div>
    )
  }

  const { user, suggestedUsers, activeProjects, recentDiscussions, recentActivity, communityStats } = dashboardData

  return (
    <CommunityNewspaper
      user={user}
      suggestedUsers={suggestedUsers}
      activeProjects={activeProjects}
      recentDiscussions={recentDiscussions}
      recentActivity={recentActivity}
      communityStats={communityStats}
    />
  )
}
