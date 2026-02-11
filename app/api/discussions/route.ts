import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Forum has been removed - return empty array

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
