import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'
import { getNotificationTypes, updateNotificationPreferences } from '@/lib/projects/notifications'

// GET - Get user's notification preferences for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params

    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
      select: {
        notificationPreferences: true,
      },
    })

    if (!membership) {
      return NextResponse.json(
        { success: false, error: 'Not a member of this project' },
        { status: 403 }
      )
    }

    // Get available notification types
    const availableTypes = getNotificationTypes()

    // Merge with user's preferences
    const userPrefs = membership.notificationPreferences as Record<string, boolean> | null

    const preferences = availableTypes.map((type: typeof availableTypes[number]) => ({
      ...type,
      enabled: userPrefs?.[type.type.toLowerCase()] ?? type.defaultEnabled,
    }))

    return NextResponse.json({
      success: true,
      data: {
        preferences,
        rawPreferences: userPrefs || {},
      },
    })
  } catch (error) {
    console.error('Error fetching notification preferences:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preferences' },
      { status: 500 }
    )
  }
}

// PUT - Update notification preferences
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const body = await request.json()
    const { preferences } = body

    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid preferences format' },
        { status: 400 }
      )
    }

    const success = await updateNotificationPreferences(
      projectId,
      session.user.id,
      preferences
    )

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to update preferences' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Preferences updated',
    })
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}

// POST - Enable/disable all notifications
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const body = await request.json()
    const { enableAll } = body

    const availableTypes = getNotificationTypes()

    // Create preferences object with all types set to the enableAll value
    const preferences: Record<string, boolean> = {}
    for (const type of availableTypes) {
      preferences[type.type.toLowerCase()] = enableAll
    }

    const success = await updateNotificationPreferences(
      projectId,
      session.user.id,
      preferences
    )

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to update preferences' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: enableAll ? 'All notifications enabled' : 'All notifications disabled',
    })
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
