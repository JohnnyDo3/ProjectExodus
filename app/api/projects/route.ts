import { NextRequest, NextResponse } from 'next/server'
import { handlePrismaError } from '@/lib/utils/prisma-errors'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          take: 5
        _count: {
          select: { members: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({
      success: true,
      data: projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to create projects' },
        { status: 401 }
      )
    }
    const body = await request.json()
    // Validate required fields
    if (!body.name || !body.slug || !body.description) {
        { success: false, error: 'Missing required fields: name, slug, description' },
        { status: 400 }
    const project = await prisma.project.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        goal: body.goal || null,
        status: body.status || 'PLANNING',
        coverImage: body.coverImage || null,
        creatorId: session.user.id,
            image: true,
          select: { members: true },
    // Automatically add creator as ADMIN member
    await prisma.projectMember.create({
        projectId: project.id,
        userId: session.user.id,
        role: 'ADMIN',
      data: project,
    console.error('Error creating project:', error)
      { success: false, error: 'Failed to create project' },
