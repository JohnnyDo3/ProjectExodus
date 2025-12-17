import prisma from '@/lib/db/prisma'
import { createProjectNotification } from './notifications'

// Badge types from Prisma schema
export type RecognitionBadge =
  | 'PIONEER'
  | 'ARCHITECT'
  | 'SCHOLAR'
  | 'MENTOR'
  | 'RESEARCHER'
  | 'PATHFINDER'
  | 'STEWARD'
  | 'CATALYST'
  | 'RISING_STAR'
  | 'TOP_CONTRIBUTOR'

interface BadgeCriteria {
  badge: RecognitionBadge
  name: string
  description: string
  check: (stats: MemberStats, projectId: string, userId: string) => Promise<boolean>
}

interface MemberStats {
  contributionScore: number
  discussionCount: number
  researchCount: number
  commentCount: number
  daysSinceJoin: number
  learningModulesCompleted: number
  totalMembers: number
  rank: number
}

/**
 * Badge criteria definitions
 */
export const BADGE_CRITERIA: BadgeCriteria[] = [
  {
    badge: 'PIONEER',
    name: 'Pioneer',
    description: 'Early contributor to the project',
    check: async (stats, projectId) => {
      // Check if user is within first 10 members
      return stats.rank <= 10
    },
  },
  {
    badge: 'ARCHITECT',
    name: 'Architect',
    description: 'Significant structural contributions',
    check: async (stats) => {
      // High contribution score with diverse activity
      return (
        stats.contributionScore >= 100 &&
        stats.discussionCount >= 5 &&
        stats.researchCount >= 3
      )
    },
  },
  {
    badge: 'SCHOLAR',
    name: 'Scholar',
    description: 'Completed all learning modules',
    check: async (stats, projectId, userId) => {
      // Check if user completed all project learning modules
      const totalModules = await prisma.projectLearningModule.count({
        where: { projectId },
      })

      return totalModules > 0 && stats.learningModulesCompleted >= totalModules
    },
  },
  {
    badge: 'MENTOR',
    name: 'Mentor',
    description: 'Helping others learn',
    check: async (stats) => {
      // Active in discussions with many helpful replies
      return stats.discussionCount >= 20 && stats.commentCount >= 30
    },
  },
  {
    badge: 'RESEARCHER',
    name: 'Researcher',
    description: 'Active in research sections',
    check: async (stats) => {
      // Posted multiple research articles
      return stats.researchCount >= 5
    },
  },
  {
    badge: 'PATHFINDER',
    name: 'Pathfinder',
    description: 'Finding and sharing new resources',
    check: async (stats) => {
      // Posted research with sources
      return stats.researchCount >= 3 && stats.contributionScore >= 50
    },
  },
  {
    badge: 'STEWARD',
    name: 'Steward',
    description: 'Long-term consistent contributor',
    check: async (stats) => {
      // Member for at least 90 days with consistent contributions
      return stats.daysSinceJoin >= 90 && stats.contributionScore >= 75
    },
  },
  {
    badge: 'CATALYST',
    name: 'Catalyst',
    description: 'Sparking productive discussions',
    check: async (stats) => {
      // Started many discussions that got engagement
      return stats.discussionCount >= 10
    },
  },
  {
    badge: 'RISING_STAR',
    name: 'Rising Star',
    description: 'Learning the process, showing growth',
    check: async (stats) => {
      // New member with early contributions
      return stats.daysSinceJoin <= 30 && stats.contributionScore >= 20
    },
  },
  {
    badge: 'TOP_CONTRIBUTOR',
    name: 'Top Contributor',
    description: 'Highest contribution score',
    check: async (stats) => {
      // Must be in top 3 contributors
      return stats.rank <= 3 && stats.contributionScore >= 50
    },
  },
]

/**
 * Get member statistics
 */
async function getMemberStats(
  projectId: string,
  userId: string
): Promise<MemberStats> {
  // Get member info
  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: { projectId, userId },
    },
    select: {
      contributionScore: true,
      joinedAt: true,
    },
  })

  if (!member) {
    throw new Error('Member not found')
  }

  // Get contribution counts
  const contributions = await prisma.projectContribution.groupBy({
    by: ['type'],
    where: { projectId, userId },
    _count: { type: true },
  })

  const contribMap = new Map<string, number>(contributions.map((c: { type: string; _count: { type: number } }) => [c.type, c._count.type]))

  // Get learning progress
  const learningCompleted = await prisma.projectLearningProgress.count({
    where: {
      userId,
      module: { projectId },
      completedAt: { not: null },
    },
  })

  // Get total members and rank
  const allMembers = await prisma.projectMember.findMany({
    where: { projectId },
    orderBy: { joinedAt: 'asc' },
    select: {
      userId: true,
      contributionScore: true,
    },
  })

  const userIndex = allMembers.findIndex((m: { userId: string }) => m.userId === userId)
  const sortedByScore = [...allMembers].sort(
    (a: { contributionScore: number | null }, b: { contributionScore: number | null }) => (b.contributionScore || 0) - (a.contributionScore || 0)
  )
  const scoreRank = sortedByScore.findIndex((m: { userId: string }) => m.userId === userId) + 1

  const daysSinceJoin = Math.floor(
    (Date.now() - new Date(member.joinedAt).getTime()) / (1000 * 60 * 60 * 24)
  )

  return {
    contributionScore: member.contributionScore || 0,
    discussionCount: (contribMap.get('DISCUSSION') || 0) + (contribMap.get('REPLY') || 0),
    researchCount: contribMap.get('RESEARCH') || 0,
    commentCount: contribMap.get('COMMENT') || 0,
    daysSinceJoin,
    learningModulesCompleted: learningCompleted,
    totalMembers: allMembers.length,
    rank: userIndex + 1, // Join order rank (for Pioneer badge)
  }
}

/**
 * Check and award eligible badges to a member
 */
export async function checkAndAwardBadges(
  projectId: string,
  userId: string
): Promise<RecognitionBadge[]> {
  try {
    const stats = await getMemberStats(projectId, userId)

    // Get existing badges
    const existingBadges = await prisma.projectMemberRecognition.findMany({
      where: { projectId, userId },
      select: { badge: true },
    })

    const existingSet = new Set(existingBadges.map((b: { badge: string }) => b.badge))
    const newBadges: RecognitionBadge[] = []

    // Check each badge criteria
    for (const criteria of BADGE_CRITERIA) {
      if (existingSet.has(criteria.badge)) {
        continue // Already has this badge
      }

      const eligible = await criteria.check(stats, projectId, userId)

      if (eligible) {
        // Award the badge
        await prisma.projectMemberRecognition.create({
          data: {
            projectId,
            userId,
            badge: criteria.badge,
            awardedReason: criteria.description,
          },
        })

        newBadges.push(criteria.badge)

        // Send notification
        await createProjectNotification({
          projectId,
          userId,
          type: 'BADGE_EARNED',
          title: `Badge Earned: ${criteria.name}`,
          message: criteria.description,
          metadata: { badge: criteria.badge },
        })
      }
    }

    return newBadges
  } catch (error) {
    console.error('Error checking badges:', error)
    return []
  }
}

/**
 * Award a specific badge to a member (manual award by admin)
 */
export async function awardBadge(
  projectId: string,
  userId: string,
  badge: RecognitionBadge,
  reason?: string
): Promise<boolean> {
  try {
    // Check if already has badge
    const existing = await prisma.projectMemberRecognition.findFirst({
      where: { projectId, userId, badge },
    })

    if (existing) {
      return false // Already has badge
    }

    const criteria = BADGE_CRITERIA.find((c: { badge: string }) => c.badge === badge)

    await prisma.projectMemberRecognition.create({
      data: {
        projectId,
        userId,
        badge,
        awardedReason: reason || criteria?.description || 'Awarded by admin',
      },
    })

    // Send notification
    await createProjectNotification({
      projectId,
      userId,
      type: 'BADGE_EARNED',
      title: `Badge Earned: ${criteria?.name || badge}`,
      message: reason || criteria?.description || 'You\'ve been awarded a new badge!',
      metadata: { badge },
    })

    return true
  } catch (error) {
    console.error('Error awarding badge:', error)
    return false
  }
}

/**
 * Get member's badges with details
 */
export async function getMemberBadges(projectId: string, userId: string) {
  const badges = await prisma.projectMemberRecognition.findMany({
    where: { projectId, userId },
    orderBy: { earnedAt: 'desc' },
  })

  return badges.map((b: typeof badges[number]) => {
    const criteria = BADGE_CRITERIA.find((c: { badge: string }) => c.badge === b.badge)
    return {
      ...b,
      name: criteria?.name || b.badge,
      description: criteria?.description || b.awardedReason,
    }
  })
}

/**
 * Get project leaderboard
 */
export async function getProjectLeaderboard(
  projectId: string,
  limit: number = 10
) {
  const members = await prisma.projectMember.findMany({
    where: { projectId },
    orderBy: { contributionScore: 'desc' },
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      recognitions: {
        select: { badge: true },
      },
    },
  })

  return members.map((m: typeof members[number], index: number) => ({
    rank: index + 1,
    user: m.user,
    contributionScore: m.contributionScore || 0,
    role: m.role,
    badges: m.recognitions.map((r: { badge: string }) => r.badge),
  }))
}
