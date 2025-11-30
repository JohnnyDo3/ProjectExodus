import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    console.log('[API /connections/requests] Request received')

    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('[API /connections/requests] Fetching pending requests for user:', session.user.id)

    // Fetch pending connection requests where the current user is the recipient
    const pendingRequests = await prisma.connection.findMany({
      where: {
        connectedUserId: session.user.id,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            headline: true,
            company: true,
            jobTitle: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log('[API /connections/requests] Found', pendingRequests.length, 'pending requests')

    return NextResponse.json({
      success: true,
      data: {
        requests: pendingRequests,
      },
    })
  } catch (error) {
    console.error('[API /connections/requests] ERROR:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch connection requests' },
      { status: 500 }
    )
  }
}
