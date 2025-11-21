import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/projects/[projectId]/messages - Get all messages for a project
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params

    const messages = await prisma.projectMessage.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error('Error fetching project messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST /api/projects/[projectId]/messages - Post a new message
export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to post messages' },
        { status: 401 }
      )
    }

    const { projectId } = params
    const body = await request.json()
    const { content } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message content is required' },
        { status: 400 }
      )
    }

    // Check if user is a member of the project
    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    if (!membership) {
      return NextResponse.json(
        { success: false, error: 'You must be a project member to post messages' },
        { status: 403 }
      )
    }

    const message = await prisma.projectMessage.create({
      data: {
        content: content.trim(),
        projectId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: message,
    })
  } catch (error) {
    console.error('Error posting project message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to post message' },
      { status: 500 }
    )
  }
}
