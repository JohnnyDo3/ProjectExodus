import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/gamification/points - Get user's points and transaction history
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let userPoints = await prisma.userPoints.findUnique({
      where: { userId: session.user.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset
        }
      }
    })

    // Create points record if doesn't exist
    if (!userPoints) {
      userPoints = await prisma.userPoints.create({
        data: {
          userId: session.user.id,
          totalPoints: 0,
          currentPoints: 0,
          weeklyPoints: 0,
          monthlyPoints: 0,
          allTimePoints: 0,
          level: 1,
          levelProgress: 0
        },
        include: {
          transactions: true
        }
      })
    }

    // Calculate level thresholds
    const currentLevel = userPoints.level
    const pointsForCurrentLevel = (currentLevel - 1) * 100
    const pointsForNextLevel = currentLevel * 100
    const progressInLevel = userPoints.totalPoints - pointsForCurrentLevel
    const levelProgressPercentage = Math.round((progressInLevel / 100) * 100)

    // Get total transaction count for pagination
    const totalTransactions = await prisma.pointTransaction.count({
      where: { userPointsId: userPoints.id }
    })

    // Calculate points breakdown by reason
    const pointsByReason = await prisma.pointTransaction.groupBy({
      by: ['reason'],
      where: { userPointsId: userPoints.id },
      _sum: { amount: true }
    })

    type PointsByReasonGroup = { reason: string; _sum: { amount: number | null } }
    const breakdown = pointsByReason.reduce((acc: Record<string, number>, item: PointsByReasonGroup) => {
      acc[item.reason] = item._sum.amount || 0
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      success: true,
      data: {
        totalPoints: userPoints.totalPoints,
        currentPoints: userPoints.currentPoints,
        weeklyPoints: userPoints.weeklyPoints,
        monthlyPoints: userPoints.monthlyPoints,
        allTimePoints: userPoints.allTimePoints,
        level: currentLevel,
        levelProgress: levelProgressPercentage,
        pointsToNextLevel: pointsForNextLevel - userPoints.totalPoints,
        transactions: userPoints.transactions,
        pagination: {
          total: totalTransactions,
          limit,
          offset,
          hasMore: offset + limit < totalTransactions
        },
        breakdown
      }
    })
  } catch (error) {
    console.error('Error fetching points:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch points' },
      { status: 500 }
    )
  }
}

// POST /api/gamification/points - Redeem points for rewards (future feature)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, rewardId, amount } = body

    // For now, just support point transfers for future features
    if (action === 'redeem') {
      // Placeholder for future reward redemption
      return NextResponse.json(
        { success: false, error: 'Reward redemption not yet implemented' },
        { status: 501 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error processing points action:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process points action' },
      { status: 500 }
    )
  }
}
