import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  checkAndAwardBadges,
  awardBadge,
  getMemberBadges,
  BADGE_CRITERIA,
  type RecognitionBadge,
} from '@/lib/projects/recognition'

// GET - Get member's badges
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; memberId: string }> }
) {
  try {
    const { projectId, memberId } = await params

    const badges = await getMemberBadges(projectId, memberId)

    // Get available badges for reference
    const availableBadges = BADGE_CRITERIA.map((c: { badge: string; name: string; description: string }) => ({
      badge: c.badge,
      name: c.name,
      description: c.description,
    }))

    return NextResponse.json({
      success: true,
      data: {
        earned: badges,
        available: availableBadges,
      },
    })
  } catch (error) {
    console.error('Error fetching badges:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch badges' },
      { status: 500 }
    )
  }
}

// POST - Award badge (admin) or check eligibility (self)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; memberId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, memberId } = await params
    const body = await request.json()
    const { action, badge, reason } = body

    // Check if self or admin
    const isSelf = memberId === session.user.id

    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true },
    })

    const isAdmin =
      project?.creatorId === session.user.id ||
      membership?.role === 'ADMIN' ||
      membership?.role === 'OWNER'

    if (action === 'check') {
      // Anyone can check their own eligibility
      if (!isSelf && !isAdmin) {
        return NextResponse.json(
          { success: false, error: 'Can only check your own badge eligibility' },
          { status: 403 }
        )
      }

      const newBadges = await checkAndAwardBadges(projectId, memberId)

      return NextResponse.json({
        success: true,
        data: {
          newBadges,
          message:
            newBadges.length > 0
              ? `Earned ${newBadges.length} new badge(s)!`
              : 'No new badges earned yet',
        },
      })
    }

    if (action === 'award') {
      // Only admins can manually award badges
      if (!isAdmin) {
        return NextResponse.json(
          { success: false, error: 'Only admins can award badges' },
          { status: 403 }
        )
      }

      if (!badge) {
        return NextResponse.json(
          { success: false, error: 'Badge type required' },
          { status: 400 }
        )
      }

      const success = await awardBadge(
        projectId,
        memberId,
        badge as RecognitionBadge,
        reason
      )

      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Failed to award badge (may already have it)' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Badge awarded successfully',
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error processing badge action:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process badge action' },
      { status: 500 }
    )
  }
}

// DELETE - Remove badge (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; memberId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, memberId } = await params
    const { searchParams } = new URL(request.url)
    const badgeId = searchParams.get('id')

    if (!badgeId) {
      return NextResponse.json(
        { success: false, error: 'Badge ID required' },
        { status: 400 }
      )
    }

    // Check if admin
    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true },
    })

    const isAdmin =
      project?.creatorId === session.user.id ||
      membership?.role === 'ADMIN' ||
      membership?.role === 'OWNER'

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can remove badges' },
        { status: 403 }
      )
    }

    await prisma.projectMemberRecognition.delete({
      where: { id: badgeId },
    })

    return NextResponse.json({
      success: true,
      message: 'Badge removed',
    })
  } catch (error) {
    console.error('Error removing badge:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove badge' },
      { status: 500 }
    )
  }
}
