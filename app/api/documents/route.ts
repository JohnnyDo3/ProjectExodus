/**
 * Documents API - GET (list) and POST (create)
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const CreateDocumentSchema = z.object({
  projectId: z.string(),
  title: z.string().min(1).max(200),
  content: z.string().default(''),
  type: z.enum(['GENERAL', 'MEETING_NOTES', 'PROPOSAL', 'REPORT', 'RESEARCH', 'PLAN', 'GUIDELINES', 'AGENDA']).default('GENERAL'),
  isPublic: z.boolean().default(false),
})

/**
 * GET /api/documents - List documents
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const where: any = {}

    if (projectId) {
      where.projectId = projectId
    }

    if (type) {
      where.type = type
    }

    if (status) {
      where.status = status
    }

    // Only show documents user has access to
    where.OR = [
      { creatorId: session.user.id },
      { collaborators: { some: { userId: session.user.id } } },
      { isPublic: true }
    ]

    const documents = await prisma.document.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        lastEditedBy: {
          select: {
            id: true,
            name: true
          }
        },
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json({ success: true, data: documents })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

/**
 * POST /api/documents - Create document
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CreateDocumentSchema.parse(body)

    // Check project access
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId },
      include: {
        members: {
          where: { userId: session.user.id }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check if user has permission to create documents
    const isCreator = project.creatorId === session.user.id
    const isMember = project.members.length > 0

    if (!isCreator && !isMember) {
      return NextResponse.json({ error: 'No permission to create documents' }, { status: 403 })
    }

    // Generate slug from title
    const baseSlug = validatedData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    let slug = baseSlug
    let counter = 1

    while (await prisma.document.findFirst({ where: { projectId: validatedData.projectId, slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Create document
    const document = await prisma.document.create({
      data: {
        title: validatedData.title,
        slug,
        content: validatedData.content,
        type: validatedData.type,
        isPublic: validatedData.isPublic,
        projectId: validatedData.projectId,
        creatorId: session.user.id,
        status: 'DRAFT',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    // Add creator as collaborator with ADMIN permission
    await prisma.documentCollaborator.create({
      data: {
        documentId: document.id,
        userId: session.user.id,
        permission: 'ADMIN'
      }
    })

    // Create initial version
    await prisma.documentVersion.create({
      data: {
        documentId: document.id,
        versionNumber: 1,
        title: document.title,
        content: document.content,
        plainText: '',
        wordCount: 0,
        createdById: session.user.id,
        isMajorVersion: true,
        changeDescription: 'Initial version'
      }
    })

    return NextResponse.json({ success: true, data: document }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error('Error creating document:', error)
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
  }
}
