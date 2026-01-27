import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hasPermission } from '@/lib/permissions'
import { logAdminAction, AdminAction } from '@/lib/audit'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canView = await hasPermission(session.user.id, 'users.view')
    if (!canView) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        bio: true,
        headline: true,
        location: true,
        company: true,
        jobTitle: true,
        website: true,
        linkedin: true,
        twitter: true,
        createdAt: true,
        emailVerified: true,
        guardianArchetype: true,
        _count: {
          select: {
            articles: true,
            userProducts: true,
            createdProjects: true,
            followers: true,
            following: true,
            comments: true,
            reviews: true,
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get ban status
    const ban = await prisma.userBan.findFirst({
      where: { userId: id, active: true },
      select: {
        id: true,
        reason: true,
        expiresAt: true,
        createdAt: true,
        bannedById: true
      }
    })

    // Get recent activity (admin logs related to this user)
    const recentActivity = await prisma.adminLog.findMany({
      where: {
        metadata: {
          path: ['targetId'],
          equals: id
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    })

    return NextResponse.json({
      user: {
        ...user,
        isBanned: !!ban,
        ban,
        stats: {
          articles: user._count.articles,
          products: user._count.userProducts,
          projects: user._count.createdProjects,
          followers: user._count.followers,
          following: user._count.following,
          comments: user._count.comments,
          reviews: user._count.reviews,
        }
      },
      activity: recentActivity
    })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canEdit = await hasPermission(session.user.id, 'users.edit')
    if (!canEdit) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { role, name, email } = body

    // Get current user data for logging
    const currentUser = await prisma.user.findUnique({
      where: { id },
      select: { role: true, name: true, email: true }
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent changing SUPER_ADMIN role unless you are SUPER_ADMIN
    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (currentUser.role === 'SUPER_ADMIN' && adminUser?.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Cannot modify SUPER_ADMIN users' },
        { status: 403 }
      )
    }

    // Prevent promoting to SUPER_ADMIN unless you are SUPER_ADMIN
    if (role === 'SUPER_ADMIN' && adminUser?.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Only SUPER_ADMIN can promote to SUPER_ADMIN' },
        { status: 403 }
      )
    }

    // Update user
    const updateData: any = {}
    if (role) updateData.role = role
    if (name) updateData.name = name
    if (email) updateData.email = email

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    // Log the action
    if (role && role !== currentUser.role) {
      await logAdminAction({
        userId: session.user.id,
        action: AdminAction.OTHER,
        description: `Changed role of ${currentUser.name} from ${currentUser.role} to ${role}`,
        targetType: 'user',
        targetId: id,
        metadata: {
          oldRole: currentUser.role,
          newRole: role
        }
      })
    }

    return NextResponse.json({
      success: true,
      user: updatedUser
    })
  } catch (error) {
    console.error('Failed to update user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

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

    const canDelete = await hasPermission(session.user.id, 'users.delete')
    if (!canDelete) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get user info for logging
    const user = await prisma.user.findUnique({
      where: { id },
      select: { name: true, email: true, role: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent deleting SUPER_ADMIN
    if (user.role === 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Cannot delete SUPER_ADMIN users' },
        { status: 403 }
      )
    }

    // Prevent self-deletion
    if (id === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    // Delete user (cascades will handle related data)
    await prisma.user.delete({
      where: { id }
    })

    // Log the action
    await logAdminAction({
      userId: session.user.id,
      action: AdminAction.CONTENT_DELETED,
      description: `Deleted user account: ${user.name} (${user.email})`,
      targetType: 'user',
      targetId: id,
      metadata: {
        deletedUserEmail: user.email,
        deletedUserRole: user.role
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
