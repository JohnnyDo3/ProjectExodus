import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

/**
 * GET /api/users/theme
 * Get the current user's theme preference
 */
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { themePreference: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      themePreference: user.themePreference || 'auto',
    })
  } catch (error) {
    console.error('Error fetching theme preference:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/users/theme
 * Update the current user's theme preference
 */
export async function PUT(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { themePreference } = body

    // Validate theme preference
    const validThemes = ['auto', 'light', 'dark', 'sunrise', 'sunset', 'dusk']
    if (!themePreference || !validThemes.includes(themePreference)) {
      return NextResponse.json(
        { error: 'Invalid theme preference. Must be one of: auto, light, dark, sunrise, sunset, dusk' },
        { status: 400 }
      )
    }

    // Update user's theme preference
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { themePreference },
      select: { themePreference: true },
    })

    return NextResponse.json({
      success: true,
      themePreference: updatedUser.themePreference,
    })
  } catch (error) {
    console.error('Error updating theme preference:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
