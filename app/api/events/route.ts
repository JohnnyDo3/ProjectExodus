import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import {
  checkRateLimit,
  RATE_LIMITS,
  getClientIP,
  sanitizeForDatabase,
  validateMeetingLink,
  validateLength,
  validateDate,
  detectBot,
} from '@/lib/security'

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    console.log('[API /events] Request received')
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // Filter by VIRTUAL/IN_PERSON/HYBRID
    const upcoming = searchParams.get('upcoming') === 'true'
    console.log('[API /events] Query params:', { type, upcoming })

    console.log('[API /events] Fetching events from database...')
    const events = await prisma.event.findMany({
      where: {
        AND: [
          type ? { type: type as any } : {},
          upcoming ? { startDate: { gte: new Date() } } : {},
        ],
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
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
        },
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      orderBy: { startDate: 'asc' },
    })

    console.log('[API /events] Found', events.length, 'events')
    console.log('[API /events] Returning success response')

    return NextResponse.json({
      success: true,
      data: events,
    })
  } catch (error) {
    console.error('[API /events] ERROR:', error)
    console.error('[API /events] Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    // Bot detection
    const botCheck = detectBot(request)
    if (botCheck.isBot && !botCheck.isLegitimateBot && botCheck.confidence === 'high') {
      return NextResponse.json(
        { success: false, error: 'Request blocked' },
        { status: 403 }
      )
    }

    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to create events' },
        { status: 401 }
      )
    }

    // Rate limiting - 5 events per hour per user
    const rateLimitResult = checkRateLimit(session.user.id, 'create-event', RATE_LIMITS.createEvent)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many events created. Please try again in ${rateLimitResult.retryAfter} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    const body = await request.json()
    const {
      title,
      description,
      type,
      location,
      meetingLink,
      startDate,
      endDate,
      maxCapacity,
      coverImage,
    } = body

    // Input validation with length limits
    const titleValidation = validateLength(title, { min: 3, max: 200 })
    if (!titleValidation.valid) {
      return NextResponse.json(
        { success: false, error: `Title: ${titleValidation.error}` },
        { status: 400 }
      )
    }

    const descValidation = validateLength(description, { min: 10, max: 5000 })
    if (!descValidation.valid) {
      return NextResponse.json(
        { success: false, error: `Description: ${descValidation.error}` },
        { status: 400 }
      )
    }

    // Validate event type
    if (!['VIRTUAL', 'IN_PERSON', 'HYBRID'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid event type' },
        { status: 400 }
      )
    }

    // Validate start date
    const startDateValidation = validateDate(startDate)
    if (!startDateValidation.valid) {
      return NextResponse.json(
        { success: false, error: startDateValidation.error },
        { status: 400 }
      )
    }

    // Ensure start date is in the future
    if (startDateValidation.date && startDateValidation.date < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Event start date must be in the future' },
        { status: 400 }
      )
    }

    if (type === 'IN_PERSON' && !location) {
      return NextResponse.json(
        { success: false, error: 'Location is required for in-person events' },
        { status: 400 }
      )
    }

    // Validate meeting link for virtual/hybrid events
    let validatedMeetingLink: string | null = null
    if (type === 'VIRTUAL' || type === 'HYBRID') {
      if (!meetingLink) {
        return NextResponse.json(
          { success: false, error: 'Meeting link is required for virtual events' },
          { status: 400 }
        )
      }

      const meetingValidation = validateMeetingLink(meetingLink)
      if (!meetingValidation.valid) {
        return NextResponse.json(
          { success: false, error: 'Invalid meeting link. Please provide a valid URL.' },
          { status: 400 }
        )
      }
      validatedMeetingLink = meetingValidation.url
    }

    if (type === 'HYBRID' && !location) {
      return NextResponse.json(
        { success: false, error: 'Location is required for hybrid events' },
        { status: 400 }
      )
    }

    // Sanitize inputs for database storage
    const sanitizedTitle = sanitizeForDatabase(title)
    const sanitizedDescription = sanitizeForDatabase(description)
    const sanitizedLocation = location ? sanitizeForDatabase(location) : null

    // Generate slug from title
    const slug = sanitizedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Math.random().toString(36).substring(2, 9)

    const event = await prisma.event.create({
      data: {
        title: sanitizedTitle,
        slug,
        description: sanitizedDescription,
        type,
        location: sanitizedLocation,
        meetingLink: validatedMeetingLink,
        startDate: startDateValidation.date!,
        endDate: endDate ? new Date(endDate) : null,
        maxCapacity: maxCapacity ? Math.min(parseInt(maxCapacity), 10000) : null, // Cap at 10k
        coverImage: coverImage || null,
        creatorId: session.user.id,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Automatically RSVP the creator as GOING
    await prisma.eventAttendee.create({
      data: {
        eventId: event.id,
        userId: session.user.id,
        status: 'GOING',
      },
    })

    return NextResponse.json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
