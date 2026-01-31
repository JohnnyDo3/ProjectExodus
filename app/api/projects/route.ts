import { NextRequest, NextResponse } from 'next/server'
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
        },
        _count: {
          select: { members: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: projects
    })
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
  try {
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
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug, description' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        goal: body.goal || null,
        status: body.status || 'PLANNING',
        coverImage: body.coverImage || null,
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
        _count: {
          select: { members: true },
        },
      },
    })

    // Automatically add creator as ADMIN member
    await prisma.projectMember.create({
      data: {
        projectId: project.id,
        userId: session.user.id,
        role: 'ADMIN',
      },
    })

    // Create prerequisites if provided
    if (body.prerequisites && Array.isArray(body.prerequisites) && body.prerequisites.length > 0) {
      await prisma.projectPrerequisite.createMany({
        data: body.prerequisites.map((prereq: {
          type: string
          displayName: string
          description: string
          requiredTag?: string
          isRequired: boolean
        }, index: number) => ({
          projectId: project.id,
          type: prereq.type,
          displayName: prereq.displayName,
          description: prereq.description,
          requiredTag: prereq.requiredTag || null,
          isRequired: prereq.isRequired,
          order: index,
        })),
      })
    }

    // Create subgroups if provided
    if (body.subgroups && Array.isArray(body.subgroups) && body.subgroups.length > 0) {
      await prisma.projectSubgroup.createMany({
        data: body.subgroups.map((group: {
          name: string
          description: string
          memberLimit: number | null
        }) => ({
          projectId: project.id,
          name: group.name,
          description: group.description,
          memberLimit: group.memberLimit,
        })),
      })
    }

    // Create learning modules if provided
    if (body.learningModules && Array.isArray(body.learningModules) && body.learningModules.length > 0) {
      await prisma.projectLearningModule.createMany({
        data: body.learningModules.map((module: {
          title: string
          description: string
          contentType: string
          externalUrl?: string
        }, index: number) => ({
          projectId: project.id,
          title: module.title,
          description: module.description,
          contentType: module.contentType,
          externalUrl: module.externalUrl || null,
          order: index,
        })),
      })
    }

    // Create mind map with nodes if provided
    if (body.mindMap && body.mindMap.nodes && Array.isArray(body.mindMap.nodes) && body.mindMap.nodes.length > 0) {
      // Create the mind map first
      const mindMap = await prisma.mindMap.create({
        data: {
          projectId: project.id,
          title: `${body.name} Mind Map`,
          creatorId: session.user.id,
          isCollaborative: true,
          isPublic: body.visibility === 'PUBLIC',
          nodeCount: body.mindMap.nodes.length,
          connectionCount: body.mindMap.connections?.length || 0,
        },
      })

      // Create all nodes and store their IDs
      const createdNodesMap = new Map<string, string>() // Map temp IDs to real database IDs

      for (const node of body.mindMap.nodes) {
        const createdNode = await prisma.mindMapNode.create({
          data: {
            mindMapId: mindMap.id,
            type: node.type,
            label: node.label,
            description: node.description || null,
            x: node.x,
            y: node.y,
            createdById: session.user.id,
          },
        })
        // Store the mapping of temporary ID (from wizard) to real database ID
        if (node.id) {
          createdNodesMap.set(node.id, createdNode.id)
        }
      }

      // Create connections if provided
      if (body.mindMap.connections && Array.isArray(body.mindMap.connections) && body.mindMap.connections.length > 0) {
        await prisma.mindMapConnection.createMany({
          data: body.mindMap.connections.map((conn: {
            from: string
            to: string
            type: string
          }) => ({
            mindMapId: mindMap.id,
            fromNodeId: createdNodesMap.get(conn.from) || conn.from,
            toNodeId: createdNodesMap.get(conn.to) || conn.to,
            type: conn.type,
            createdById: session.user.id,
          })),
        })
      }

      // Add creator as contributor with ADMIN permission
      await prisma.mindMapContributor.create({
        data: {
          mindMapId: mindMap.id,
          userId: session.user.id,
          permission: 'ADMIN',
          nodesCreated: body.mindMap.nodes.length,
          connectionsCreated: body.mindMap.connections?.length || 0,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
