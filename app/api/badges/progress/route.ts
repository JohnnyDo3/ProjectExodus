import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Fetch user data with counts
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          include: {
            badge: true
          }
        },
        _count: {
          select: {
            articles: true,
            forumPosts: true,
            followers: true,
            following: true,
            createdProjects: true,
            forumReplies: true,
            reviews: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate profile completion
    const profileFields = [
      user.name,
      user.bio,
      user.headline,
      user.location,
      user.image,
      user.jobTitle,
      user.company,
      user.interests?.length > 0,
      user.expertise?.length > 0
    ]
    const completedFields = profileFields.filter(Boolean).length
    const profileCompletion = Math.round((completedFields / profileFields.length) * 100)

    // Calculate badge progress
    const badgeProgress = [
      {
        id: 'green-starter',
        name: 'GREEN STARTER',
        icon: '🌱',
        description: 'Complete your profile',
        progress: profileCompletion,
        current: completedFields,
        target: profileFields.length,
        color: 'accent',
        earned: profileCompletion === 100
      },
      {
        id: 'knowledge-sharer',
        name: 'KNOWLEDGE SHARER',
        icon: '📚',
        description: 'Write 5 articles',
        progress: Math.min(100, Math.round((user._count.articles / 5) * 100)),
        current: user._count.articles,
        target: 5,
        color: 'secondary',
        earned: user._count.articles >= 5
      },
      {
        id: 'community-builder',
        name: 'COMMUNITY BUILDER',
        icon: '💬',
        description: 'Make 50 forum posts',
        progress: Math.min(100, Math.round((user._count.forumPosts / 50) * 100)),
        current: user._count.forumPosts,
        target: 50,
        color: 'primary',
        earned: user._count.forumPosts >= 50
      },
      {
        id: 'connector',
        name: 'CONNECTOR',
        icon: '🤝',
        description: 'Get 100 followers',
        progress: Math.min(100, Math.round((user._count.followers / 100) * 100)),
        current: user._count.followers,
        target: 100,
        color: 'accent',
        earned: user._count.followers >= 100
      },
      {
        id: 'conversation-starter',
        name: 'CONVERSATION STARTER',
        icon: '💭',
        description: 'Make 100 forum replies',
        progress: Math.min(100, Math.round((user._count.forumReplies / 100) * 100)),
        current: user._count.forumReplies,
        target: 100,
        color: 'secondary',
        earned: user._count.forumReplies >= 100
      },
      {
        id: 'project-leader',
        name: 'PROJECT LEADER',
        icon: '🚀',
        description: 'Create 3 projects',
        progress: Math.min(100, Math.round((user._count.createdProjects / 3) * 100)),
        current: user._count.createdProjects,
        target: 3,
        color: 'primary',
        earned: user._count.createdProjects >= 3
      },
      {
        id: 'super-connector',
        name: 'SUPER CONNECTOR',
        icon: '⭐',
        description: 'Get 500 followers',
        progress: Math.min(100, Math.round((user._count.followers / 500) * 100)),
        current: user._count.followers,
        target: 500,
        color: 'accent',
        earned: user._count.followers >= 500
      },
      {
        id: 'author',
        name: 'AUTHOR',
        icon: '✍️',
        description: 'Write 25 articles',
        progress: Math.min(100, Math.round((user._count.articles / 25) * 100)),
        current: user._count.articles,
        target: 25,
        color: 'secondary',
        earned: user._count.articles >= 25
      }
    ]

    // Calculate impact stats
    const goalsCompleted = badgeProgress.filter(b => b.earned).length
    const totalGoals = badgeProgress.length
    const badgesEarned = user.userBadges.length

    return NextResponse.json({
      badgeProgress,
      stats: {
        badgesEarned,
        goalsCompleted,
        totalGoals,
        profileCompletion
      },
      earnedBadges: user.userBadges.map(ub => ({
        id: ub.badge.id,
        name: ub.badge.name,
        icon: ub.badge.icon,
        earnedAt: ub.earnedAt
      }))
    })
  } catch (error) {
    console.error('Error fetching badge progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch badge progress' },
      { status: 500 }
    )
  }
}
