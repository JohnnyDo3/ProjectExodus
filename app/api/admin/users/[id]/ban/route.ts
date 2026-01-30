import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hasPermission } from '@/lib/permissions'
import { logUserBan, logUserUnban, createAdminAlert } from '@/lib/audit'
import { z } from 'zod'

// SECURITY FIX: Add input validation for ban requests
const banRequestSchema = z.object({
  reason: z.string().min(10, 'Ban reason must be at least 10 characters').max(500, 'Ban reason must not exceed 500 characters').trim(),
  duration: z.number().positive().optional().nullable(),
})

// Ban a user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canBan = await hasPermission(session.user.id, 'users.ban')
    if (!canBan) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    // SECURITY FIX: Validate and sanitize input
    const validationResult = banRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { reason, duration } = validationResult.data // duration in days, null = permanent

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id },
      select: { name: true, email: true, role: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent banning admins unless you're SUPER_ADMIN
    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (
      (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') &&
      adminUser?.role !== 'SUPER_ADMIN'
    ) {
      return NextResponse.json(
        { error: 'Cannot ban admin users' },
        { status: 403 }
      )
    }

    // Prevent self-ban
    if (id === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot ban yourself' },
        { status: 400 }
      )
    }

    // Check if already banned
    const existingBan = await prisma.userBan.findFirst({
      where: { userId: id, active: true }
    })

    if (existingBan) {
      return NextResponse.json(
        { error: 'User is already banned' },
        { status: 400 }
      )
    }

    // Calculate expiration date
    const expiresAt = duration
      ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
      : null

    // Create ban record
    const ban = await prisma.userBan.create({
      data: {
        userId: id,
        bannedById: session.user.id,
        reason,
        expiresAt,
        active: true,
      }
    })

    // Log the action
    await logUserBan(
      session.user.id,
      id,
      reason,
      !duration,
      request.headers.get('x-forwarded-for') || undefined
    )

    return NextResponse.json({
      success: true,
      ban: {
        id: ban.id,
        reason: ban.reason,
        expiresAt: ban.expiresAt,
        createdAt: ban.createdAt,
      }
    })
  } catch (error) {
    console.error('Failed to ban user:', error)
    return NextResponse.json(
      { error: 'Failed to ban user' },
      { status: 500 }
    )
  }
}

// Unban a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canBan = await hasPermission(session.user.id, 'users.ban')
    if (!canBan) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Find active ban
    const ban = await prisma.userBan.findFirst({
      where: { userId: id, active: true }
    })

    if (!ban) {
      return NextResponse.json(
        { error: 'User is not banned' },
        { status: 400 }
      )
    }

    // Deactivate the ban
    await prisma.userBan.update({
      where: { id: ban.id },
      data: {
        active: false,
        unbannedAt: new Date(),
        unbannedById: session.user.id,
      }
    })

    // Log the action
    await logUserUnban(
      session.user.id,
      id,
      request.headers.get('x-forwarded-for') || undefined
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to unban user:', error)
    return NextResponse.json(
      { error: 'Failed to unban user' },
      { status: 500 }
    )
  }
}
