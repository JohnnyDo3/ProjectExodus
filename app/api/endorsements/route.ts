import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { handlePrismaError } from '@/lib/utils/prisma-errors'
import { incrementStockScore, STOCK_POINTS } from '@/lib/stockScore'

// POST /api/endorsements - Give an endorsement
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { userId, skill } = await request.json()

    if (!userId || !skill) {
      return NextResponse.json(
        { success: false, error: 'User ID and skill are required' },
        { status: 400 }
      )
    }

    // Can't endorse yourself
    if (userId === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot endorse yourself' },
        { status: 400 }
      )
    }

    // Verify the user exists and has this skill
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { expertise: true }
    })

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    if (!targetUser.expertise || !targetUser.expertise.includes(skill)) {
      return NextResponse.json(
        { success: false, error: 'User does not have this skill listed' },
        { status: 400 }
      )
    }

    // Check if already endorsed
    const existing = await prisma.endorsement.findUnique({
      where: {
        userId_endorserId_skill: {
          userId,
          endorserId: session.user.id,
          skill
        }
      }
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'You have already endorsed this skill' },
        { status: 400 }
      )
    }

    // Create endorsement
    const endorsement = await prisma.endorsement.create({
      data: {
        userId,
        endorserId: session.user.id,
        skill
      }
    })

    // Award stock points to the endorsed user
    incrementStockScore(userId, STOCK_POINTS.ENDORSEMENT).catch(() => {})

    return NextResponse.json({
      success: true,
      data: endorsement,
      message: 'Endorsement added successfully'
    })
  } catch (error) {
    return handlePrismaError(error, 'create endorsement')
  }
}

// GET /api/endorsements - Get endorsements for a user (with optional skill filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const skill = searchParams.get('skill')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Build query
    const where: any = { userId }
    if (skill) {
      where.skill = skill
    }

    // Get endorsements with endorser details
    const endorsements = await prisma.endorsement.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    // Get endorser details
    const endorserIds = [...new Set(endorsements.map((e: any) => e.endorserId))]
    const endorsers = await prisma.user.findMany({
      where: { id: { in: endorserIds } },
      select: {
        id: true,
        name: true,
        image: true,
        headline: true
      }
    })

    const endorsersMap = Object.fromEntries(
      endorsers.map((e: any) => [e.id, e])
    )

    // Enrich endorsements with endorser details
    const enrichedEndorsements = endorsements.map((endorsement: any) => ({
      ...endorsement,
      endorser: endorsersMap[endorsement.endorserId]
    }))

    // Group by skill and count
    const skillCounts = endorsements.reduce((acc: any, endorsement: any) => {
      acc[endorsement.skill] = (acc[endorsement.skill] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      success: true,
      data: {
        endorsements: enrichedEndorsements,
        skillCounts,
        total: endorsements.length
      }
    })
  } catch (error) {
    return handlePrismaError(error, 'get endorsements')
  }
}
