import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET - Fetch user's notes (optionally filtered by path/lesson)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pathId = searchParams.get('pathId')
    const lessonId = searchParams.get('lessonId')

    // Build query
    const where: {
      userId: string
      pathId?: string
      lessonId?: string
    } = { userId: session.user.id }

    if (pathId) where.pathId = pathId
    if (lessonId) where.lessonId = lessonId

    const notes = await prisma.exodologyNote.findMany({
      where,
      orderBy: { updatedAt: 'desc' }
    })

    // If getting a specific note
    if (pathId && lessonId) {
      const note = notes[0] || null
      return NextResponse.json({ note })
    }

    return NextResponse.json({ notes })

  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

// POST - Create or update a note
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { pathId, lessonId, content } = body

    if (!pathId || !lessonId) {
      return NextResponse.json({ error: 'pathId and lessonId are required' }, { status: 400 })
    }

    // If content is empty, delete the note
    if (!content || content.trim() === '') {
      await prisma.exodologyNote.deleteMany({
        where: {
          userId: session.user.id,
          pathId,
          lessonId
        }
      })
      return NextResponse.json({ note: null, deleted: true })
    }

    // Upsert the note
    const note = await prisma.exodologyNote.upsert({
      where: {
        userId_pathId_lessonId: {
          userId: session.user.id,
          pathId,
          lessonId
        }
      },
      update: {
        content: content.trim()
      },
      create: {
        userId: session.user.id,
        pathId,
        lessonId,
        content: content.trim()
      }
    })

    return NextResponse.json({ note })

  } catch (error) {
    console.error('Error saving note:', error)
    return NextResponse.json({ error: 'Failed to save note' }, { status: 500 })
  }
}

// DELETE - Delete a note
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pathId = searchParams.get('pathId')
    const lessonId = searchParams.get('lessonId')

    if (!pathId || !lessonId) {
      return NextResponse.json({ error: 'pathId and lessonId are required' }, { status: 400 })
    }

    await prisma.exodologyNote.deleteMany({
      where: {
        userId: session.user.id,
        pathId,
        lessonId
      }
    })

    return NextResponse.json({ deleted: true })

  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
