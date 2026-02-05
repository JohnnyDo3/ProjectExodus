import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/document-templates/[templateId] - Get a specific template
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ templateId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { templateId } = await context.params

    const template = await prisma.documentTemplate.findUnique({
      where: { id: templateId },
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

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
    }

    // Check access
    const isCreator = template.creatorId === session.user.id
    const isPublic = template.isPublic || template.isBuiltIn

    if (!isCreator && !isPublic) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Increment usage count
    await prisma.documentTemplate.update({
      where: { id: templateId },
      data: { usageCount: { increment: 1 } },
    })

    return NextResponse.json({ success: true, data: template })
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch template' },
      { status: 500 }
    )
  }
}

// PATCH /api/document-templates/[templateId] - Update a template
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ templateId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { templateId } = await context.params
    const body = await request.json()
    const { name, description, content, category, isPublic, tags } = body

    // Get template
    const template = await prisma.documentTemplate.findUnique({
      where: { id: templateId },
    })

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
    }

    // Only creator can update (built-in templates cannot be updated)
    if (template.creatorId !== session.user.id || template.isBuiltIn) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Build update data
    const updateData: any = {}
    if (name !== undefined) updateData.name = name.trim()
    if (description !== undefined) updateData.description = description?.trim() || null
    if (content !== undefined) updateData.content = content.trim()
    if (category !== undefined) updateData.category = category.trim()
    if (isPublic !== undefined) updateData.isPublic = isPublic
    if (tags !== undefined) updateData.tags = tags

    const updatedTemplate = await prisma.documentTemplate.update({
      where: { id: templateId },
      data: updateData,
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

    return NextResponse.json({ success: true, data: updatedTemplate })
  } catch (error) {
    console.error('Error updating template:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update template' },
      { status: 500 }
    )
  }
}

// DELETE /api/document-templates/[templateId] - Delete a template
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ templateId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { templateId } = await context.params

    // Get template
    const template = await prisma.documentTemplate.findUnique({
      where: { id: templateId },
    })

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
    }

    // Only creator can delete (built-in templates cannot be deleted)
    if (template.creatorId !== session.user.id || template.isBuiltIn) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    await prisma.documentTemplate.delete({
      where: { id: templateId },
    })

    return NextResponse.json({ success: true, message: 'Template deleted' })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete template' },
      { status: 500 }
    )
  }
}
