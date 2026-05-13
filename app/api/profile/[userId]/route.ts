import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { loadProfile } from '@/lib/profile/loadProfile'

// GET /api/profile/[userId] - Get a user's public profile with privacy filters
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const session = await auth()
    const { user } = await loadProfile(userId, session?.user?.id)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}
