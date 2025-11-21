import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// POST /api/events/[eventId]/rsvp - RSVP to an event
export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to RSVP' },
        { status: 401 }
      )
    }

    const { eventId } = params
    const body = await request.json()
    const { status } = body // GOING, MAYBE, NOT_GOING

    if (!status || !['GOING', 'MAYBE', 'NOT_GOING'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Valid RSVP status required (GOING, MAYBE, NOT_GOING)' },
        { status: 400 }
      )
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
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

    // Check capacity for GOING status
    if (status === 'GOING' && event.maxCapacity) {
      const goingCount = await prisma.eventAttendee.count({
        where: {
          eventId,
          status: 'GOING',
        },
      })

      if (goingCount >= event.maxCapacity) {
        return NextResponse.json(
          { success: false, error: 'Event is at full capacity' },
          { status: 400 }
        )
      }
    }

    // Check if already RSVP'd
    const existing = await prisma.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: session.user.id,
        },
      },
    })

    if (existing) {
      // Update existing RSVP
      const updated = await prisma.eventAttendee.update({
        where: {
          eventId_userId: {
            eventId,
            userId: session.user.id,
          },
        },
        data: {
          status,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'RSVP updated successfully',
        data: updated,
      })
    }

    // Create new RSVP
    const rsvp = await prisma.eventAttendee.create({
      data: {
        eventId,
        userId: session.user.id,
        status,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'RSVP created successfully',
      data: rsvp,
    })
  } catch (error) {
    console.error('Error creating RSVP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create RSVP' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[eventId]/rsvp - Cancel RSVP
export async function DELETE(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { eventId } = params

    await prisma.eventAttendee.delete({
      where: {
        eventId_userId: {
          eventId,
          userId: session.user.id,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'RSVP cancelled successfully',
    })
  } catch (error) {
    console.error('Error cancelling RSVP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to cancel RSVP' },
      { status: 500 }
    )
  }
}
