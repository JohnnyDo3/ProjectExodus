'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Users, ZoomIn, ZoomOut, Maximize2, Crown, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

interface TeamMember {
  id: string
  userId: string
  name: string
  image: string | null
  role: string
  isCreator: boolean
  messageCount?: number
}

interface TeamCollaborationVisualizationProps {
  projectId: string
  projectName: string
  members: TeamMember[]
  currentUserId: string | null
  messages?: any[]
}

export default function TeamCollaborationVisualization({
  projectId,
  projectName,
  members,
  currentUserId,
  messages = [],
}: TeamCollaborationVisualizationProps) {
  const router = useRouter()
  const graphRef = useRef<any>(null)
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  })
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 })

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 100, 1400)
      const height = 600
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Transform data into graph format
  useEffect(() => {
    const nodes: any[] = []
    const links: any[] = []

    // Add project as center node
    nodes.push({
      id: `project-${projectId}`,
      name: projectName,
      type: 'project',
      val: 35, // Large size for project
    })

    // Add team members as nodes
    members.forEach((member) => {
      const nodeSize = member.isCreator ? 25 : member.role === 'ADMIN' ? 20 : member.role === 'MODERATOR' ? 16 : 12

      nodes.push({
        id: member.userId,
        name: member.name,
        image: member.image,
        role: member.role,
        isCreator: member.isCreator,
        isCurrentUser: member.userId === currentUserId,
        messageCount: member.messageCount || 0,
        type: 'member',
        val: nodeSize,
      })

      // Create link from project to member
      links.push({
        source: `project-${projectId}`,
        target: member.userId,
        strength: member.isCreator ? 4 : member.role === 'ADMIN' ? 3 : 2,
        isLeadership: member.isCreator || member.role === 'ADMIN',
      })
    })

    // Create member-to-member connections based on message interactions
    if (messages && messages.length > 0) {
      const interactions: Map<string, Map<string, number>> = new Map()

      // Count interactions between users
      for (let i = 0; i < messages.length - 1; i++) {
        const msg1 = messages[i]
        const msg2 = messages[i + 1]
        if (msg1.userId !== msg2.userId) {
          const key = [msg1.userId, msg2.userId].sort().join('-')
          const user1 = msg1.userId
          const user2 = msg2.userId

          if (!interactions.has(key)) {
            interactions.set(key, new Map())
          }
          const pairMap = interactions.get(key)!
          pairMap.set('count', (pairMap.get('count') || 0) + 1)
          pairMap.set('user1', user1)
          pairMap.set('user2', user2)
        }
      }

      // Create links for pairs with significant interactions
      interactions.forEach((data) => {
        const count = data.get('count') || 0
        if (count >= 2) {
          // At least 2 back-and-forth messages
          links.push({
            source: data.get('user1'),
            target: data.get('user2'),
            strength: Math.min(count / 2, 3),
            isCollaboration: true,
          })
        }
      })
    }

    setGraphData({ nodes, links })
  }, [projectId, projectName, members, currentUserId, messages])

  // Handle node click
  const handleNodeClick = useCallback(
    (node: any) => {
      if (node.type === 'member') {
        router.push(`/profile/${node.id}`)
      }
    },
    [router]
  )

  // Zoom controls
  const handleZoomIn = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() * 1.2, 400)
    }
  }

  const handleZoomOut = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() / 1.2, 400)
    }
  }

  const handleFitView = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400, 50)
    }
  }

  if (members.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-[var(--muted)] rounded-xl border-4 border-theme-secondary">
        <div className="text-center space-y-4">
          <Users className="w-16 h-16 text-theme-muted mx-auto opacity-50" />
          <h3 className="text-2xl font-black text-theme-muted">NO TEAM MEMBERS YET</h3>
          <p className="text-lg font-semibold text-theme-muted max-w-md">
            Be the first to join this project and start collaborating!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleFitView}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--primary)] hover:text-white"
          title="Fit View"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-[var(--card)] border-2 border-theme-primary rounded-lg p-4 space-y-2 shadow-xl">
        <h4 className="text-xs font-black text-[var(--foreground)] mb-2">TEAM LEGEND</h4>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
          <span className="text-[10px] font-bold text-theme-muted">Project</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center">
            <Crown className="w-3 h-3 text-white" />
          </div>
          <span className="text-[10px] font-bold text-theme-muted">Owner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--primary)]" />
          <span className="text-[10px] font-bold text-theme-muted">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[var(--secondary)]" />
          <span className="text-[10px] font-bold text-theme-muted">Moderator</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[10px] font-bold text-theme-muted">Member</span>
        </div>
        <div className="border-t border-theme-muted pt-2 mt-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-0.5 bg-theme-primary" />
            <span className="text-[10px] font-bold text-theme-muted">Leadership</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-theme-accent opacity-50" />
            <span className="text-[10px] font-bold text-theme-muted">Collaboration</span>
          </div>
        </div>
      </div>

      {/* Force Graph */}
      <div className="bg-[var(--background)] rounded-xl border-4 border-theme-primary overflow-hidden shadow-2xl">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel={(node: any) => {
            if (node.type === 'project') {
              return `
                <div style="
                  background: linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(139, 92, 246, 0.95));
                  color: white;
                  padding: 10px 16px;
                  border-radius: 8px;
                  font-family: system-ui;
                  font-size: 14px;
                  font-weight: bold;
                  border: 2px solid white;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                ">
                  <div style="font-size: 12px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">Project</div>
                  <div style="font-size: 16px; margin-top: 4px;">${node.name}</div>
                </div>
              `
            }
            return `
              <div style="
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-family: system-ui;
                font-size: 12px;
                font-weight: bold;
                border: 2px solid ${node.isCreator ? 'rgb(168, 85, 247)' : node.role === 'ADMIN' ? 'rgb(99, 102, 241)' : node.role === 'MODERATOR' ? 'rgb(139, 92, 246)' : 'rgb(168, 85, 247)'};
              ">
                <div style="font-size: 14px; margin-bottom: 4px;">${node.name}${node.isCurrentUser ? ' (You)' : ''}</div>
                <div style="opacity: 0.7; font-size: 11px;">
                  ${node.isCreator ? '👑 Owner' : node.role === 'ADMIN' ? '🛡️ Admin' : node.role === 'MODERATOR' ? '🛡️ Moderator' : 'Member'}
                </div>
                ${node.messageCount > 0 ? `<div style="margin-top: 4px; font-size: 10px; opacity: 0.6;">${node.messageCount} messages</div>` : ''}
              </div>
            `
          }}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const size = node.val || 10

            if (node.type === 'project') {
              // Draw project node as a square/diamond
              ctx.save()
              ctx.translate(node.x, node.y)
              ctx.rotate(Math.PI / 4) // Rotate 45 degrees
              ctx.beginPath()
              ctx.rect(-size / 1.5, -size / 1.5, size * 1.3, size * 1.3)
              const gradient = ctx.createLinearGradient(-size, -size, size, size)
              gradient.addColorStop(0, 'rgb(168, 85, 247)') // accent
              gradient.addColorStop(1, 'rgb(139, 92, 246)') // secondary
              ctx.fillStyle = gradient
              ctx.fill()
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
              ctx.lineWidth = 3
              ctx.stroke()
              ctx.restore()
              return
            }

            // Draw member node as circle
            ctx.beginPath()
            ctx.arc(node.x, node.y, size, 0, 2 * Math.PI)

            if (node.isCreator) {
              const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size)
              gradient.addColorStop(0, 'rgb(168, 85, 247)') // accent
              gradient.addColorStop(1, 'rgb(99, 102, 241)') // primary
              ctx.fillStyle = gradient
            } else if (node.role === 'ADMIN') {
              ctx.fillStyle = 'rgb(99, 102, 241)' // primary
            } else if (node.role === 'MODERATOR') {
              ctx.fillStyle = 'rgb(139, 92, 246)' // secondary
            } else {
              ctx.fillStyle = 'rgb(168, 85, 247)' // accent
            }

            ctx.fill()

            // Draw border
            ctx.strokeStyle = node.isCurrentUser
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(255, 255, 255, 0.4)'
            ctx.lineWidth = node.isCurrentUser ? 3 : 1.5
            ctx.stroke()

            // Draw role icon for owners/admins
            if (node.isCreator && size > 15) {
              ctx.fillStyle = 'white'
              ctx.font = `${size * 0.6}px Arial`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillText('👑', node.x, node.y)
            }

            // Draw name label
            if (size > 10) {
              ctx.font = `${node.isCreator ? 'bold 11px' : '9px'} system-ui`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillStyle = 'white'
              ctx.fillText(node.name, node.x, node.y + size + 12)
            }
          }}
          linkColor={(link: any) =>
            link.isLeadership
              ? 'rgba(99, 102, 241, 0.6)'
              : link.isCollaboration
              ? 'rgba(168, 85, 247, 0.4)'
              : 'rgba(156, 163, 175, 0.3)'
          }
          linkWidth={(link: any) =>
            link.isLeadership ? 3 : link.isCollaboration ? 2 : 1.5
          }
          onNodeClick={handleNodeClick}
          cooldownTicks={100}
          d3VelocityDecay={0.3}
          d3AlphaDecay={0.02}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          backgroundColor="transparent"
        />
      </div>

      {/* Info */}
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-theme-muted">
          <span className="font-black text-theme-primary">{members.length}</span> team members
          {messages && messages.length > 0 && (
            <>
              {' • '}
              <span className="font-black text-theme-accent">{messages.length}</span> messages
            </>
          )}
          • Click members to view profiles • Drag to rearrange
        </p>
      </div>
    </div>
  )
}
