import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/document-templates - Get all templates
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const projectId = url.searchParams.get('projectId')
    const category = url.searchParams.get('category')
    const builtInOnly = url.searchParams.get('builtInOnly') === 'true'

    // Build where clause
    const where: any = {
      OR: [
        { isBuiltIn: true },
        { creatorId: session.user.id },
        { isPublic: true },
      ],
    }

    if (projectId) {
      where.OR.push({ projectId })
    }

    if (category) {
      where.category = category
    }

    if (builtInOnly) {
      where.isBuiltIn = true
    }

    const templates = await prisma.documentTemplate.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: [
        { isBuiltIn: 'desc' },
        { usageCount: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ success: true, data: templates })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

// POST /api/document-templates - Create a new template
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, content, category, projectId, isPublic = false, tags = [] } = body

    if (!name?.trim() || !content?.trim() || !category?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, content, and category are required' },
        { status: 400 }
      )
    }

    // If project-specific, check if user has access to project
    if (projectId) {
      const membership = await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId: session.user.id,
          },
        },
      })

      const project = await prisma.project.findUnique({
        where: { id: projectId },
      })

      const isProjectOwner = project?.creatorId === session.user.id
      const isContributor = membership && ['CONTRIBUTOR', 'MODERATOR', 'ADMIN', 'OWNER'].includes(membership.role)

      if (!isProjectOwner && !isContributor) {
        return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
      }
    }

    const template = await prisma.documentTemplate.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        content: content.trim(),
        category: category.trim(),
        creatorId: session.user.id,
        projectId: projectId || null,
        isPublic,
        tags,
        isBuiltIn: false,
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

    return NextResponse.json({ success: true, data: template }, { status: 201 })
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create template' },
      { status: 500 }
    )
  }
}
