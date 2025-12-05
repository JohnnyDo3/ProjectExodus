'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Users, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

interface UserNode {
  id: string
  name: string
  image: string | null
  followers: number
  projects: number
  interests: string[]
  isCurrentUser?: boolean
  isFollowing?: boolean
}

interface NetworkLink {
  source: string
  target: string
  strength: number
}

interface NetworkVisualizationProps {
  currentUserId: string | null
  users: UserNode[]
  followingIds: Set<string>
  onNodeClick?: (userId: string) => void
}

export default function NetworkVisualization({
  currentUserId,
  users,
  followingIds,
  onNodeClick,
}: NetworkVisualizationProps) {
  const router = useRouter()
  const graphRef = useRef<any>(null)
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  })
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 })

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 100, 1400)
      const height = Math.min(window.innerHeight - 300, 800)
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Transform data into graph format
  useEffect(() => {
    if (!currentUserId) {
      setGraphData({ nodes: [], links: [] })
      return
    }

    const nodes: any[] = []
    const links: any[] = []

    // Add current user as center node
    const currentUser = users.find((u) => u.id === currentUserId)
    if (currentUser) {
      nodes.push({
        id: currentUser.id,
        name: currentUser.name || 'You',
        image: currentUser.image,
        followers: currentUser.followers,
        projects: currentUser.projects,
        interests: currentUser.interests,
        isCurrentUser: true,
        val: 30, // Larger size for current user
      })
    }

    // Add following users as connected nodes
    const followingUsers = users.filter((u) => followingIds.has(u.id) && u.id !== currentUserId)
    followingUsers.forEach((user) => {
      nodes.push({
        id: user.id,
        name: user.name || 'User',
        image: user.image,
        followers: user.followers,
        projects: user.projects,
        interests: user.interests,
        isFollowing: true,
        val: 15, // Medium size for following
      })

      // Create link from current user to following
      links.push({
        source: currentUserId,
        target: user.id,
        strength: 2,
      })
    })

    // Add suggested users (not following) as outer ring
    const suggestedUsers = users
      .filter((u) => !followingIds.has(u.id) && u.id !== currentUserId)
      .slice(0, 20) // Limit to prevent overcrowding

    suggestedUsers.forEach((user) => {
      nodes.push({
        id: user.id,
        name: user.name || 'User',
        image: user.image,
        followers: user.followers,
        projects: user.projects,
        interests: user.interests,
        isFollowing: false,
        val: 8, // Smaller size for suggested
      })

      // Create weaker connections for suggested users
      // Connect to current user with dashed line (visual distinction)
      links.push({
        source: currentUserId,
        target: user.id,
        strength: 0.5,
        isSuggested: true,
      })
    })

    // Create inter-connections between following users based on shared interests
    for (let i = 0; i < followingUsers.length; i++) {
      for (let j = i + 1; j < followingUsers.length; j++) {
        const user1 = followingUsers[i]
        const user2 = followingUsers[j]
        const sharedInterests = user1.interests.filter((int) =>
          user2.interests.includes(int)
        )

        if (sharedInterests.length >= 2) {
          links.push({
            source: user1.id,
            target: user2.id,
            strength: 1,
            isShared: true,
          })
        }
      }
    }

    setGraphData({ nodes, links })
  }, [currentUserId, users, followingIds])

  // Handle node click
  const handleNodeClick = useCallback(
    (node: any) => {
      if (onNodeClick) {
        onNodeClick(node.id)
      } else {
        router.push(`/profile/${node.id}`)
      }
    },
    [onNodeClick, router]
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

  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[600px] bg-[var(--muted)] rounded-xl border-2 sm:border-4 border-theme-secondary">
        <div className="text-center space-y-3 sm:space-y-4 px-4">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-theme-muted mx-auto opacity-50" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-theme-muted">SIGN IN TO VIEW YOUR NETWORK</h3>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-theme-muted max-w-md">
            Log in to see your connections visualized as an interactive network graph
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
        <h4 className="text-xs font-black text-[var(--foreground)] mb-2">LEGEND</h4>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
          <span className="text-[10px] font-bold text-theme-muted">You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--accent)]" />
          <span className="text-[10px] font-bold text-theme-muted">Following</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[var(--muted)]" />
          <span className="text-[10px] font-bold text-theme-muted">Suggested</span>
        </div>
        <div className="border-t border-theme-muted pt-2 mt-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-0.5 bg-theme-primary" />
            <span className="text-[10px] font-bold text-theme-muted">Your connections</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-theme-muted opacity-30 border-dashed border-t" />
            <span className="text-[10px] font-bold text-theme-muted">Suggested</span>
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
          nodeLabel={(node: any) => `
            <div style="
              background: rgba(0, 0, 0, 0.9);
              color: white;
              padding: 8px 12px;
              border-radius: 8px;
              font-family: system-ui;
              font-size: 12px;
              font-weight: bold;
              border: 2px solid ${node.isCurrentUser ? 'var(--primary)' : node.isFollowing ? 'var(--accent)' : 'var(--muted)'};
            ">
              <div style="font-size: 14px; margin-bottom: 4px;">${node.name}</div>
              <div style="opacity: 0.7; font-size: 11px;">
                ${node.followers} followers • ${node.projects} projects
              </div>
              ${node.interests.length > 0 ? `<div style="margin-top: 4px; font-size: 10px; opacity: 0.6;">${node.interests.slice(0, 3).join(', ')}</div>` : ''}
            </div>
          `}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const size = node.val || 10

            // Draw node circle
            ctx.beginPath()
            ctx.arc(node.x, node.y, size, 0, 2 * Math.PI)

            if (node.isCurrentUser) {
              // Gradient for current user
              const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size)
              gradient.addColorStop(0, 'rgb(99, 102, 241)') // primary
              gradient.addColorStop(1, 'rgb(168, 85, 247)') // accent
              ctx.fillStyle = gradient
            } else if (node.isFollowing) {
              ctx.fillStyle = 'rgb(168, 85, 247)' // accent
            } else {
              ctx.fillStyle = 'rgb(156, 163, 175)' // muted
            }

            ctx.fill()

            // Draw border
            ctx.strokeStyle = node.isCurrentUser ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)'
            ctx.lineWidth = node.isCurrentUser ? 3 : 1.5
            ctx.stroke()

            // Draw name label for larger nodes
            if (size > 10 || node.isCurrentUser) {
              ctx.font = `${node.isCurrentUser ? 'bold 12px' : '10px'} system-ui`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillStyle = node.isCurrentUser ? 'white' : 'rgba(255, 255, 255, 0.9)'
              ctx.fillText(node.name, node.x, node.y + size + 15)
            }
          }}
          linkColor={(link: any) =>
            link.isSuggested
              ? 'rgba(156, 163, 175, 0.15)'
              : link.isShared
              ? 'rgba(168, 85, 247, 0.3)'
              : 'rgba(99, 102, 241, 0.4)'
          }
          linkWidth={(link: any) => (link.isSuggested ? 1 : link.strength || 2)}
          linkLineDash={(link: any) => (link.isSuggested ? [5, 5] : null)}
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
          <span className="font-black text-theme-primary">{graphData.nodes.length}</span> nodes •{' '}
          <span className="font-black text-theme-accent">{graphData.links.length}</span> connections
          • Click nodes to view profiles • Drag to rearrange
        </p>
      </div>
    </div>
  )
}
