import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import {
  DOCUMENT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  getDocumentTemplateById,
  getDocumentTemplatesByCategory,
  searchDocumentTemplates,
  TemplateCategory,
} from '@/data/document-templates'

// GET /api/document-templates - Get all templates (built-in + custom)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const projectId = url.searchParams.get('projectId')
    const category = url.searchParams.get('category') as TemplateCategory | null
    const builtInOnly = url.searchParams.get('builtInOnly') === 'true'
    const searchQuery = url.searchParams.get('search')

    // Start with built-in templates
    let builtInTemplates = [...DOCUMENT_TEMPLATES]

    // Filter built-in templates by category
    if (category) {
      builtInTemplates = getDocumentTemplatesByCategory(category)
    }

    // Search built-in templates
    if (searchQuery) {
      builtInTemplates = searchDocumentTemplates(searchQuery)
      // If also filtering by category, intersect the results
      if (category) {
        const categoryTemplates = getDocumentTemplatesByCategory(category)
        const categoryIds = new Set(categoryTemplates.map((t) => t.id))
        builtInTemplates = builtInTemplates.filter((t) => categoryIds.has(t.id))
      }
    }

    // Convert built-in templates to API format
    const formattedBuiltIn = builtInTemplates.map((template) => ({
      id: `builtin-${template.id}`,
      name: template.name,
      description: template.description,
      content: template.content,
      category: template.category,
      icon: template.icon,
      isBuiltIn: true,
      isPublic: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: null,
      projectId: null,
      tags: [],
    }))

    // If only built-in templates requested, return early
    if (builtInOnly) {
      return NextResponse.json({
        success: true,
        data: {
          templates: formattedBuiltIn,
          categories: TEMPLATE_CATEGORIES,
        },
      })
    }

    // Build where clause for custom templates
    const where: any = {
      OR: [
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

    // Fetch custom templates from database
    const customTemplates = await prisma.documentTemplate.findMany({
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
        { usageCount: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    // Filter custom templates by search if provided
    let filteredCustom = customTemplates
    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase()
      filteredCustom = customTemplates.filter(
        (t: { name: string; description: string | null; category: string }) =>
          t.name.toLowerCase().includes(lowerSearch) ||
          t.description?.toLowerCase().includes(lowerSearch) ||
          t.category.toLowerCase().includes(lowerSearch)
      )
    }

    // Format custom templates
    const formattedCustom = filteredCustom.map((template: typeof customTemplates[number]) => ({
      ...template,
      isBuiltIn: false,
    }))

    // Combine built-in and custom templates
    // Built-in templates first, then custom sorted by usage
    const allTemplates = [...formattedBuiltIn, ...formattedCustom]

    return NextResponse.json({
      success: true,
      data: {
        templates: allTemplates,
        categories: TEMPLATE_CATEGORIES,
        builtInCount: formattedBuiltIn.length,
        customCount: formattedCustom.length,
      },
    })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

// POST /api/document-templates - Create a new custom template
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, content, category, projectId, isPublic = false, tags = [], icon } = body

    if (!name?.trim() || !content?.trim() || !category?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, content, and category are required' },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories = TEMPLATE_CATEGORIES.map((c) => c.id)
    if (!validCategories.includes(category) && category !== 'Custom') {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
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
        icon: icon || 'FileText',
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
