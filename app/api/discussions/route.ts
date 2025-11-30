import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    console.log('[API /discussions] Request received')

    const session = await auth()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    console.log('[API /discussions] Session user ID:', session?.user?.id)
    console.log('[API /discussions] Requested user ID:', userId)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Forum has been removed - return empty array
    console.log('[API /discussions] Forum removed - returning empty discussions array')

    return NextResponse.json({
      success: true,
      data: [],
    })
  } catch (error) {
    console.error('[API /discussions] ERROR:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}
