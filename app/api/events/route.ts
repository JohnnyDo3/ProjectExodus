import { NextRequest, NextResponse } from 'next/server'
import { handlePrismaError } from '@/lib/utils/prisma-errors'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // Filter by VIRTUAL/IN_PERSON/HYBRID
    const upcoming = searchParams.get('upcoming') === 'true'
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
        _count: {
            attendees: true,
      orderBy: { startDate: 'asc' },
    })
    return NextResponse.json({
      success: true,
      data: events,
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to create events' },
        { status: 401 }
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
    // Validation
    if (!title || !description || !type || !startDate) {
        { success: false, error: 'Title, description, type, and start date are required' },
        { status: 400 }
    if (type === 'IN_PERSON' && !location) {
        { success: false, error: 'Location is required for in-person events' },
    if (type === 'VIRTUAL' && !meetingLink) {
        { success: false, error: 'Meeting link is required for virtual events' },
    if (type === 'HYBRID' && (!location || !meetingLink)) {
        { success: false, error: 'Both location and meeting link are required for hybrid events' },
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Math.random().toString(36).substring(2, 9)
    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        type,
        location: location || null,
        meetingLink: meetingLink || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        maxCapacity: maxCapacity ? parseInt(maxCapacity) : null,
        coverImage: coverImage || null,
        creatorId: session.user.id,
    // Automatically RSVP the creator as GOING
    await prisma.eventAttendee.create({
        eventId: event.id,
        userId: session.user.id,
        status: 'GOING',
      data: event,
    console.error('Error creating event:', error)
      { success: false, error: 'Failed to create event' },
