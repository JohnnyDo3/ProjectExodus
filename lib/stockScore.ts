import { prisma } from '@/lib/db/prisma'

// ─── Stock Score Calculation & Persistence ───────────────────────────
// Recalculates a user's stockScore from all tracked activities and
// persists it to the database. Call this after any activity that should
// contribute to the user's score.
//
// Point values:
//   Project created ............. 10 pts each
//   Article published ........... 5 pts each
//   Learning module completed ... 3 pts each
//   Forum post created .......... 2 pts each
//   Social post created ......... 1 pt each
//   Follower gained ............. 1 pt each
//   Connection accepted ......... 2 pts each
//   Article reads completed ..... 1 pt per 5 articles read
//   Endorsement received ........ 2 pts each
//   Fish customized ............. 1 pt (one-time)

const POINTS = {
  PROJECT: 10,
  ARTICLE: 5,
  MODULE_COMPLETED: 3,
  FORUM_POST: 2,
  SOCIAL_POST: 1,
  FOLLOWER: 1,
  CONNECTION: 2,
  ARTICLE_READS_PER_5: 1,
  ENDORSEMENT: 2,
  FISH_CUSTOMIZED: 1,
} as const

export async function recalculateStockScore(userId: string): Promise<number> {
  const [
    projectCount,
    articleCount,
    moduleCount,
    forumPostCount,
    socialPostCount,
    followerCount,
    connectionCount,
    articleReadCount,
    endorsementCount,
    user,
  ] = await Promise.all([
    // Projects created by user
    prisma.project.count({ where: { creatorId: userId } }),
    // Articles published (only PUBLISHED status)
    prisma.article.count({ where: { authorId: userId, status: 'PUBLISHED' } }),
    // Learning modules completed
    prisma.userLearningProgress.count({ where: { userId, completed: true } }),
    // Forum posts (via SocialPost or dedicated forum — using Comment as forum proxy)
    prisma.comment.count({ where: { authorId: userId } }),
    // Social posts
    prisma.socialPost.count({ where: { authorId: userId } }),
    // Followers (people following this user)
    prisma.userFollow.count({ where: { followingId: userId } }),
    // Accepted connections
    prisma.connection.count({
      where: {
        OR: [
          { userId, status: 'ACCEPTED' },
          { connectedUserId: userId, status: 'ACCEPTED' },
        ],
      },
    }),
    // Articles the user has read
    prisma.articleRead.count({ where: { userId } }),
    // Endorsements received
    prisma.endorsement.count({ where: { endorsedId: userId } }),
    // Fish customization status
    prisma.user.findUnique({
      where: { id: userId },
      select: { fishCustomization: true },
    }),
  ])

  const score =
    projectCount * POINTS.PROJECT +
    articleCount * POINTS.ARTICLE +
    moduleCount * POINTS.MODULE_COMPLETED +
    forumPostCount * POINTS.FORUM_POST +
    socialPostCount * POINTS.SOCIAL_POST +
    followerCount * POINTS.FOLLOWER +
    connectionCount * POINTS.CONNECTION +
    Math.floor(articleReadCount / 5) * POINTS.ARTICLE_READS_PER_5 +
    endorsementCount * POINTS.ENDORSEMENT +
    (user?.fishCustomization ? POINTS.FISH_CUSTOMIZED : 0)

  // Persist to database
  await prisma.user.update({
    where: { id: userId },
    data: { stockScore: score },
  })

  return score
}

// Lightweight increment for common actions — avoids a full recalculation
// when we know exactly how many points to add.
export async function incrementStockScore(userId: string, points: number): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { stockScore: { increment: points } },
  })
}

export { POINTS as STOCK_POINTS }
