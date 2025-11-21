import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/events/[eventId] - Get a specific event
export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = params

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { joinedAt: 'asc' },
        },
        _count: {
          select: {
            attendees: true,
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}
