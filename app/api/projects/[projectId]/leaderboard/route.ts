import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { getProjectLeaderboard } from '@/lib/projects/recognition'

// GET - Get project leaderboard
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const period = searchParams.get('period') || 'all' // all, month, week

    // For time-based leaderboards, we'd filter contributions by date
    // For now, just return overall leaderboard

    const leaderboard = await getProjectLeaderboard(projectId, limit)

    // Get project stats
    const stats = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        _count: {
          select: {
            members: true,
            discussions: true,
            researchPosts: true,
          },
        },
      },
    })

    // Get total contributions
    const totalContributions = await prisma.projectContribution.aggregate({
      where: { projectId },
      _sum: { points: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        leaderboard,
        stats: {
          totalMembers: stats?._count.members || 0,
          totalDiscussions: stats?._count.discussions || 0,
          totalResearch: stats?._count.researchPosts || 0,
          totalContributionPoints: totalContributions._sum.points || 0,
        },
        period,
      },
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
