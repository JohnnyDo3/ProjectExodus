/**
 * Mind Map Export API - GET
 *
 * /api/mindmaps/[id]/export
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  ExportOptionsSchema,
  type ApiResponse,
  NotFoundError,
  UnauthorizedError
} from '@/lib/types/mindmap'
import { assertMindMapAccess } from '@/lib/mindmap/permissions'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/export - Export mind map
 * Supports multiple formats: JSON, MARKDOWN
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to export mind maps')
    }

    await assertMindMapAccess(params.id, session.user.id, 'VIEW')

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'JSON'
    const includeComments = searchParams.get('includeComments') === 'true'
    const includeActivity = searchParams.get('includeActivity') === 'true'

    // Validate options
    const options = ExportOptionsSchema.parse({
      format,
      includeComments,
      includeActivity
    })

    // Fetch mind map with all data
    const mindMap = await prisma.mindMap.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        nodes: {
          include: {
            assignedTo: {
              select: {
                id: true,
                name: true
              }
            },
            comments: includeComments
              ? {
                  include: {
                    author: {
                      select: {
                        id: true,
                        name: true
                      }
                    }
                  }
                }
              : false
          },
          orderBy: { createdAt: 'asc' }
        },
        connections: {
          include: {
            fromNode: {
              select: {
                id: true,
                label: true,
                type: true
              }
            },
            toNode: {
              select: {
                id: true,
                label: true,
                type: true
              }
            },
            comments: includeComments
              ? {
                  include: {
                    author: {
                      select: {
                        id: true,
                        name: true
                      }
                    }
                  }
                }
              : false
          },
          orderBy: { createdAt: 'asc' }
        },
        contributors: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: { joinedAt: 'asc' }
        },
        activities: includeActivity
          ? {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              },
              orderBy: { createdAt: 'desc' },
              take: 100
            }
          : false
      }
    })

    if (!mindMap) {
      throw new NotFoundError('Mind map')
    }

    // Export based on format
    switch (options.format) {
      case 'JSON': {
        const jsonData = {
          mindMap: {
            id: mindMap.id,
            title: mindMap.title,
            description: mindMap.description,
            layout: mindMap.layout,
            createdAt: mindMap.createdAt,
            updatedAt: mindMap.updatedAt
          },
          project: mindMap.project,
          creator: mindMap.creator,
          nodes: mindMap.nodes,
          connections: mindMap.connections,
          contributors: mindMap.contributors,
          ...(includeActivity && { activities: mindMap.activities }),
          metadata: {
            exportedAt: new Date().toISOString(),
            exportedBy: session.user.name,
            version: '1.0'
          }
        }

        return NextResponse.json(jsonData, {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="mindmap-${mindMap.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.json"`
          }
        })
      }

      case 'MARKDOWN': {
        let markdown = `# ${mindMap.title}\n\n`

        if (mindMap.description) {
          markdown += `${mindMap.description}\n\n`
        }

        markdown += `**Project:** ${mindMap.project.name}\n`
        markdown += `**Created by:** ${mindMap.creator.name}\n`
        markdown += `**Created at:** ${new Date(mindMap.createdAt).toLocaleDateString()}\n`
        markdown += `**Last updated:** ${new Date(mindMap.updatedAt).toLocaleDateString()}\n\n`

        markdown += `---\n\n`

        // Group nodes by type
        const nodesByType = mindMap.nodes.reduce((acc, node) => {
          if (!acc[node.type]) acc[node.type] = []
          acc[node.type].push(node)
          return acc
        }, {} as Record<string, typeof mindMap.nodes>)

        markdown += `## Nodes\n\n`
        for (const [type, nodes] of Object.entries(nodesByType)) {
          markdown += `### ${type.charAt(0) + type.slice(1).toLowerCase()}s\n\n`
          for (const node of nodes) {
            markdown += `- **${node.label}**`
            if (node.description) {
              markdown += `: ${node.description}`
            }
            if (node.status) {
              markdown += ` [${node.status}]`
            }
            if (node.assignedTo) {
              markdown += ` (Assigned to: ${node.assignedTo.name})`
            }
            markdown += `\n`

            if (includeComments && node.comments && node.comments.length > 0) {
              markdown += `  - Comments:\n`
              for (const comment of node.comments) {
                markdown += `    - ${comment.author.name}: ${comment.content}\n`
              }
            }
          }
          markdown += `\n`
        }

        // Connections
        if (mindMap.connections.length > 0) {
          markdown += `## Connections\n\n`
          const connectionsByType = mindMap.connections.reduce((acc, conn) => {
            if (!acc[conn.type]) acc[conn.type] = []
            acc[conn.type].push(conn)
            return acc
          }, {} as Record<string, typeof mindMap.connections>)

          for (const [type, connections] of Object.entries(connectionsByType)) {
            markdown += `### ${type.charAt(0) + type.slice(1).toLowerCase().replace(/_/g, ' ')}\n\n`
            for (const conn of connections) {
              markdown += `- ${conn.fromNode.label} → ${conn.toNode.label}`
              if (conn.label) {
                markdown += `: ${conn.label}`
              }
              markdown += `\n`
            }
            markdown += `\n`
          }
        }

        // Contributors
        if (mindMap.contributors.length > 0) {
          markdown += `## Contributors\n\n`
          for (const contrib of mindMap.contributors) {
            markdown += `- ${contrib.user.name} (${contrib.permission})`
            markdown += ` - ${contrib.nodesCreated} nodes, ${contrib.connectionsCreated} connections, ${contrib.commentsAdded} comments\n`
          }
          markdown += `\n`
        }

        markdown += `---\n\n`
        markdown += `*Exported on ${new Date().toLocaleDateString()} by ${session.user.name}*\n`

        return new NextResponse(markdown, {
          headers: {
            'Content-Type': 'text/markdown',
            'Content-Disposition': `attachment; filename="mindmap-${mindMap.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.md"`
          }
        })
      }

      case 'SVG':
      case 'PNG':
      case 'PDF': {
        // These would require canvas/image generation libraries
        // For now, return a not implemented error
        return NextResponse.json(
          {
            success: false,
            error: `${options.format} export is not yet implemented. Please use JSON or MARKDOWN format.`,
            message: 'Feature coming soon!'
          },
          { status: 501 }
        )
      }

      default: {
        return NextResponse.json(
          { success: false, error: 'Invalid export format' },
          { status: 400 }
        )
      }
    }
  } catch (error) {
    console.error('Error exporting mind map:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to export mind map' },
      { status: 500 }
    )
  }
}
