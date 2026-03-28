import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // --- Articles ---
    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      userArticles,
      totalArticleReads,
      totalArticleSaves,
    ] = await Promise.all([
      prisma.article.count({ where: { authorId: userId } }),
      prisma.article.count({ where: { authorId: userId, status: 'PUBLISHED' } }),
      prisma.article.count({ where: { authorId: userId, status: 'DRAFT' } }),
      prisma.article.findMany({
        where: { authorId: userId },
        select: { id: true, views: true },
      }),
      prisma.articleRead.count({
        where: { article: { authorId: userId } },
      }),
      prisma.savedArticle.count({
        where: { article: { authorId: userId } },
      }),
    ])

    const totalViews = userArticles.reduce((sum: number, a: { id: string; views: number }) => sum + a.views, 0)
    const articleIds = userArticles.map((a: { id: string; views: number }) => a.id)

    // --- Projects ---
    const [createdProjects, memberOfProjects] = await Promise.all([
      prisma.project.count({ where: { creatorId: userId } }),
      prisma.projectMember.count({ where: { userId } }),
    ])

    // --- Social Posts ---
    const [totalPosts, totalPostLikes] = await Promise.all([
      prisma.socialPost.count({ where: { userId } }),
      prisma.socialLike.count({ where: { post: { userId } } }),
    ])

    // --- Connections (followers/following via UserFollow) ---
    const [followersCount, followingCount] = await Promise.all([
      prisma.userFollow.count({ where: { followingId: userId } }),
      prisma.userFollow.count({ where: { followerId: userId } }),
    ])

    // Mutual: users who follow the current user AND whom the current user follows
    const followingIds = await prisma.userFollow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    })
    const followingIdSet = new Set(followingIds.map((f: { followingId: string }) => f.followingId))

    const followerIds = await prisma.userFollow.findMany({
      where: { followingId: userId },
      select: { followerId: true },
    })
    const mutualCount = followerIds.filter((f: { followerId: string }) => followingIdSet.has(f.followerId)).length

    // --- Learning ---
    const [modulesStarted, modulesCompleted, learningRecords] = await Promise.all([
      prisma.userLearningProgress.count({ where: { userId } }),
      prisma.userLearningProgress.count({ where: { userId, status: 'COMPLETED' } }),
      prisma.userLearningProgress.findMany({
        where: { userId },
        select: { progressPercentage: true },
      }),
    ])

    const totalProgress =
      learningRecords.length > 0
        ? Math.round(
            learningRecords.reduce((sum: number, r: { progressPercentage: number }) => sum + r.progressPercentage, 0) /
              learningRecords.length
          )
        : 0

    // --- Engagement: last 7 days ---
    const [
      articleViews7d,
      newFollowers7d,
      postLikes7d,
    ] = await Promise.all([
      prisma.articleRead.count({
        where: {
          article: { authorId: userId },
          readAt: { gte: sevenDaysAgo },
        },
      }),
      prisma.userFollow.count({
        where: {
          followingId: userId,
          createdAt: { gte: sevenDaysAgo },
        },
      }),
      prisma.socialLike.count({
        where: {
          post: { userId },
          createdAt: { gte: sevenDaysAgo },
        },
      }),
    ])

    // --- Engagement: last 30 days ---
    const [
      articleViews30d,
      newFollowers30d,
      postLikes30d,
    ] = await Promise.all([
      prisma.articleRead.count({
        where: {
          article: { authorId: userId },
          readAt: { gte: thirtyDaysAgo },
        },
      }),
      prisma.userFollow.count({
        where: {
          followingId: userId,
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
      prisma.socialLike.count({
        where: {
          post: { userId },
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
    ])

    // --- Stock Score ---
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stockScore: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        articles: {
          total: totalArticles,
          published: publishedArticles,
          drafts: draftArticles,
          totalViews,
          totalLikes: totalArticleSaves,
        },
        projects: {
          total: createdProjects + memberOfProjects,
          created: createdProjects,
          memberOf: memberOfProjects,
        },
        posts: {
          total: totalPosts,
          totalLikes: totalPostLikes,
        },
        connections: {
          followers: followersCount,
          following: followingCount,
          mutual: mutualCount,
        },
        learning: {
          modulesStarted,
          modulesCompleted,
          totalProgress,
        },
        engagement: {
          last7days: {
            articleViews: articleViews7d,
            newFollowers: newFollowers7d,
            postLikes: postLikes7d,
          },
          last30days: {
            articleViews: articleViews30d,
            newFollowers: newFollowers30d,
            postLikes: postLikes30d,
          },
        },
        stockScore: user?.stockScore ?? 0,
      },
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
