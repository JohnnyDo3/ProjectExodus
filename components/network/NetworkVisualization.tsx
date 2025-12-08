'use client'

import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Users, ZoomIn, ZoomOut, RefreshCw, Move } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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

interface NetworkVisualizationProps {
  currentUserId: string | null
  users: UserNode[]
  followingIds: Set<string>
  onNodeClick?: (userId: string) => void
}

interface BranchNode {
  user: UserNode
  x: number
  y: number
  branchPath: string
}

interface Branch {
  interest: string
  nodes: BranchNode[]
  mainPath: string
  startX: number
  startY: number
  endX: number
  endY: number
}

// Generate a smooth bezier curve path for a branch
function generateBranchPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  curvature: number = 0.3
): string {
  const midY = startY - (startY - endY) * 0.5
  const controlX1 = startX
  const controlY1 = startY - (startY - endY) * curvature
  const controlX2 = endX
  const controlY2 = midY

  return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`
}

// Generate a curved sub-branch path from main branch to user node
function generateSubBranchPath(
  branchX: number,
  branchY: number,
  nodeX: number,
  nodeY: number
): string {
  const midX = (branchX + nodeX) / 2
  const midY = branchY - 20
  return `M ${branchX} ${branchY} Q ${midX} ${midY} ${nodeX} ${nodeY}`
}

// Group users by their primary shared interest with current user
function groupUsersByInterest(users: UserNode[], currentUser: UserNode | undefined) {
  const groups: Record<string, UserNode[]> = {}
  const currentInterests = currentUser?.interests || []

  users.forEach((user) => {
    if (user.isCurrentUser) return

    const sharedInterest = user.interests.find((i) => currentInterests.includes(i))
    const primaryInterest = sharedInterest || user.interests[0] || 'Other'

    if (!groups[primaryInterest]) {
      groups[primaryInterest] = []
    }
    groups[primaryInterest].push(user)
  })

  // Sort users within each group - following first, then by shared interests
  Object.keys(groups).forEach((interest) => {
    groups[interest].sort((a, b) => {
      if (a.isFollowing && !b.isFollowing) return -1
      if (!a.isFollowing && b.isFollowing) return 1

      const aShared = a.interests.filter((i) => currentInterests.includes(i)).length
      const bShared = b.interests.filter((i) => currentInterests.includes(i)).length
      return bShared - aShared
    })
  })

  return groups
}

// Calculate tree layout - adapts to network size
function calculateTreeLayout(
  interestGroups: Record<string, UserNode[]>,
  containerWidth: number,
  containerHeight: number,
  totalUsers: number
): Branch[] {
  const branches: Branch[] = []
  const entries = Object.entries(interestGroups)
  const numBranches = entries.length

  if (numBranches === 0) return branches

  // Trunk position - center bottom
  const trunkX = containerWidth / 2
  const trunkY = containerHeight - 120

  // Adapt spread based on number of branches and users
  // Smaller networks get more spread out, larger ones compress
  const baseSpread = containerWidth * 0.85
  const spreadFactor = Math.min(1, Math.max(0.4, numBranches / 8))
  const totalSpread = baseSpread * spreadFactor

  // For very small networks, spread branches more
  const minBranchSpacing = 150
  const actualSpread = Math.max(totalSpread, numBranches * minBranchSpacing)
  const clampedSpread = Math.min(actualSpread, containerWidth * 0.9)

  const branchSpacing = numBranches > 1 ? clampedSpread / (numBranches - 1) : 0
  const startX = trunkX - clampedSpread / 2

  // Adapt branch height based on network size
  // Smaller networks get taller trees to fill space
  const baseHeight = totalUsers < 10 ? 200 : totalUsers < 20 ? 250 : 300
  const heightRange = totalUsers < 10 ? 150 : totalUsers < 20 ? 100 : 80

  entries.forEach(([interest, users], branchIndex) => {
    // Calculate branch angle for more organic spread
    const normalizedIndex = numBranches > 1 ? branchIndex / (numBranches - 1) : 0.5
    const angleVariation = Math.sin(normalizedIndex * Math.PI) * 0.3

    // Main branch endpoint
    const branchEndX = numBranches > 1
      ? startX + branchIndex * branchSpacing
      : trunkX

    // Vary branch heights - middle branches go higher
    const heightFactor = Math.sin(normalizedIndex * Math.PI)
    const branchEndY = baseHeight - heightFactor * heightRange

    // Generate main branch path with curve
    const mainPath = generateBranchPath(trunkX, trunkY, branchEndX, branchEndY, 0.35 + angleVariation * 0.1)

    // Position users along and around this branch
    const nodes: BranchNode[] = []
    const numUsers = users.length

    // Adapt node spacing based on total network size
    const nodeSpacing = totalUsers < 15 ? 70 : totalUsers < 30 ? 50 : 40
    const nodeRadius = totalUsers < 15 ? 60 : totalUsers < 30 ? 50 : 40

    users.forEach((user, userIndex) => {
      let nodeX: number
      let nodeY: number

      if (numUsers === 1) {
        // Single user - place above branch end
        nodeX = branchEndX
        nodeY = branchEndY - nodeSpacing
      } else if (numUsers === 2) {
        // Two users - spread horizontally
        const offset = userIndex === 0 ? -nodeSpacing / 2 : nodeSpacing / 2
        nodeX = branchEndX + offset
        nodeY = branchEndY - nodeSpacing * 0.8
      } else if (numUsers <= 4) {
        // Few users - arc arrangement
        const spreadAngle = Math.PI * 0.6
        const userAngle = -Math.PI / 2 - spreadAngle / 2 + (userIndex / (numUsers - 1)) * spreadAngle
        nodeX = branchEndX + Math.cos(userAngle) * nodeRadius
        nodeY = branchEndY + Math.sin(userAngle) * nodeRadius - nodeSpacing * 0.5
      } else {
        // Many users - larger semicircle with staggered distances
        const spreadAngle = Math.PI * 0.75
        const userAngle = -Math.PI / 2 - spreadAngle / 2 + (userIndex / (numUsers - 1)) * spreadAngle
        const distFromBranch = nodeRadius + (userIndex % 2) * 25
        nodeX = branchEndX + Math.cos(userAngle) * distFromBranch
        nodeY = branchEndY + Math.sin(userAngle) * distFromBranch - nodeSpacing * 0.3
      }

      const branchPath = generateSubBranchPath(branchEndX, branchEndY, nodeX, nodeY)

      nodes.push({
        user,
        x: nodeX,
        y: nodeY,
        branchPath
      })
    })

    branches.push({
      interest,
      nodes,
      mainPath,
      startX: trunkX,
      startY: trunkY,
      endX: branchEndX,
      endY: branchEndY
    })
  })

  return branches
}

export default function NetworkVisualization({
  currentUserId,
  users,
  followingIds,
  onNodeClick,
}: NetworkVisualizationProps) {
  const router = useRouter()
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // View state
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Process users
  const processedUsers = useMemo(() => {
    return users.map((user) => ({
      ...user,
      isCurrentUser: user.id === currentUserId,
      isFollowing: followingIds.has(user.id),
    }))
  }, [users, currentUserId, followingIds])

  const currentUser = processedUsers.find((u) => u.isCurrentUser)
  const interestGroups = useMemo(
    () => groupUsersByInterest(processedUsers, currentUser),
    [processedUsers, currentUser]
  )

  const totalUsers = processedUsers.filter(u => !u.isCurrentUser).length
  const containerWidth = 1200
  const containerHeight = 700

  const branches = useMemo(
    () => calculateTreeLayout(interestGroups, containerWidth, containerHeight, totalUsers),
    [interestGroups, totalUsers]
  )

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Mouse/touch handlers for panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left click
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(s => Math.min(Math.max(s + delta, 0.3), 3))
  }, [])

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      })
    }
  }, [pan])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    })
  }, [isDragging, dragStart])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Reset view
  const resetView = useCallback(() => {
    setScale(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const handleNodeClick = (userId: string) => {
    if (isDragging) return // Don't navigate if we were dragging
    if (onNodeClick) {
      onNodeClick(userId)
    } else {
      router.push(`/profile/${userId}`)
    }
  }

  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[600px] bg-[var(--muted)] rounded-xl border-2 border-[var(--border)]">
        <div className="text-center space-y-4 px-4">
          <Users className="w-12 h-12 md:w-16 md:h-16 text-[var(--muted-foreground)] mx-auto opacity-50" />
          <h3 className="text-xl md:text-2xl font-black text-[var(--foreground)]">SIGN IN TO VIEW YOUR NETWORK</h3>
          <p className="text-sm md:text-base font-semibold text-[var(--muted-foreground)] max-w-md">
            Log in to see your connections visualized as an interactive network tree
          </p>
        </div>
      </div>
    )
  }

  const totalConnections = processedUsers.filter((u) => !u.isCurrentUser).length
  const trunkX = containerWidth / 2
  const trunkY = containerHeight - 120

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          onClick={() => setScale((s) => Math.min(s + 0.2, 3))}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setScale((s) => Math.max(s - 0.2, 0.3))}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          onClick={resetView}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--primary)] hover:text-white"
          title="Reset View"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-[var(--card)] border-2 border-[var(--primary)] rounded-lg p-4 space-y-2 shadow-xl">
        <h4 className="text-xs font-black text-[var(--foreground)] mb-2">LEGEND</h4>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
          <span className="text-[10px] font-bold text-[var(--muted-foreground)]">You (Root)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/30" />
          <span className="text-[10px] font-bold text-[var(--muted-foreground)]">Following</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[var(--muted)] border-2 border-dashed border-[var(--border)]" />
          <span className="text-[10px] font-bold text-[var(--muted-foreground)]">Suggested</span>
        </div>
        <div className="border-t border-[var(--border)] pt-2 mt-2 text-[9px] text-[var(--muted-foreground)] flex items-center gap-1">
          <Move className="w-3 h-3" />
          Drag to pan
        </div>
      </div>

      {/* SVG Tree Visualization */}
      <div
        ref={containerRef}
        className={`bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--muted)]/50 rounded-xl border-2 border-[var(--border)] overflow-hidden shadow-2xl ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
          className="w-full h-[400px] md:h-[600px]"
          style={{
            transform: `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <defs>
            {/* Gradient for trunk */}
            <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--secondary)" />
              <stop offset="50%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>

            {/* Glow filter for following nodes */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft shadow for nodes */}
            <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Tree trunk */}
          <path
            d={`M ${trunkX} ${containerHeight} L ${trunkX} ${trunkY + 40}`}
            stroke="url(#trunkGradient)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            className={`transition-all duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Main branches */}
          {branches.map((branch, branchIdx) => (
            <g key={`branch-${branch.interest}`}>
              {/* Main branch path */}
              <path
                d={branch.mainPath}
                stroke="var(--primary)"
                strokeWidth={Math.max(10 - branchIdx * 0.5, 5)}
                strokeLinecap="round"
                fill="none"
                opacity={0.7}
                className={`transition-all duration-700 ${animationComplete ? 'opacity-70' : 'opacity-0'}`}
                style={{ transitionDelay: `${branchIdx * 150}ms` }}
              />

              {/* Sub-branches to each user */}
              {branch.nodes.map((node, nodeIdx) => (
                <path
                  key={`subbranch-${node.user.id}`}
                  d={node.branchPath}
                  stroke={node.user.isFollowing ? 'var(--accent)' : 'var(--muted-foreground)'}
                  strokeWidth={node.user.isFollowing ? 4 : 2}
                  strokeLinecap="round"
                  fill="none"
                  opacity={node.user.isFollowing ? 0.8 : 0.4}
                  strokeDasharray={node.user.isFollowing ? 'none' : '6 4'}
                  className={`transition-all duration-500 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${branchIdx * 150 + nodeIdx * 80 + 200}ms` }}
                />
              ))}

              {/* Branch label */}
              <g
                style={{
                  opacity: animationComplete ? 1 : 0,
                  transition: 'opacity 0.5s',
                  transitionDelay: `${branchIdx * 150 + 100}ms`
                }}
              >
                <rect
                  x={branch.endX - 60}
                  y={branch.endY + 8}
                  width={120}
                  height={20}
                  rx={10}
                  fill="var(--primary)"
                  opacity={0.15}
                />
                <text
                  x={branch.endX}
                  y={branch.endY + 22}
                  textAnchor="middle"
                  className="fill-[var(--primary)] text-[10px] font-black uppercase tracking-wider"
                >
                  {branch.interest.length > 14 ? branch.interest.substring(0, 14) + '...' : branch.interest}
                </text>
              </g>
            </g>
          ))}

          {/* User nodes */}
          {branches.map((branch, branchIdx) =>
            branch.nodes.map((node, nodeIdx) => {
              const { user, x, y } = node
              const isHovered = hoveredNode === user.id
              // Larger nodes for smaller networks
              const baseSize = totalUsers < 15 ? 28 : totalUsers < 30 ? 24 : 20
              const nodeSize = user.isFollowing ? baseSize : baseSize - 6

              return (
                <g
                  key={user.id}
                  className={`cursor-pointer transition-all duration-500 ${
                    animationComplete ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${branchIdx * 150 + nodeIdx * 80 + 300}ms` }}
                  onClick={() => handleNodeClick(user.id)}
                  onMouseEnter={() => setHoveredNode(user.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Node glow for following */}
                  {user.isFollowing && (
                    <circle
                      cx={x}
                      cy={y}
                      r={nodeSize + 10}
                      fill="var(--accent)"
                      opacity={0.25}
                      className="animate-pulse"
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? nodeSize + 5 : nodeSize}
                    fill={user.isFollowing ? 'var(--accent)' : 'var(--card)'}
                    stroke={user.isFollowing ? 'var(--accent)' : 'var(--border)'}
                    strokeWidth={isHovered ? 4 : 2}
                    filter={user.isFollowing ? 'url(#glow)' : 'url(#nodeShadow)'}
                    className="transition-all duration-200"
                  />

                  {/* User image or initial */}
                  {user.image ? (
                    <>
                      <clipPath id={`clip-${user.id}`}>
                        <circle cx={x} cy={y} r={nodeSize - 3} />
                      </clipPath>
                      <image
                        href={user.image}
                        x={x - nodeSize + 3}
                        y={y - nodeSize + 3}
                        width={(nodeSize - 3) * 2}
                        height={(nodeSize - 3) * 2}
                        clipPath={`url(#clip-${user.id})`}
                        style={{ pointerEvents: 'none' }}
                      />
                    </>
                  ) : (
                    <text
                      x={x}
                      y={y + 6}
                      textAnchor="middle"
                      className={`text-base font-bold ${user.isFollowing ? 'fill-white' : 'fill-[var(--foreground)]'}`}
                      style={{ pointerEvents: 'none' }}
                    >
                      {(user.name || 'U')[0].toUpperCase()}
                    </text>
                  )}

                  {/* Name label - always show for small networks */}
                  {(isHovered || user.isFollowing || totalUsers < 15) && (
                    <text
                      x={x}
                      y={y + nodeSize + 18}
                      textAnchor="middle"
                      className="fill-[var(--foreground)] text-[11px] font-bold"
                      style={{
                        textShadow: '0 1px 3px var(--background), 0 1px 3px var(--background)',
                        pointerEvents: 'none'
                      }}
                    >
                      {user.name?.split(' ')[0] || 'User'}
                    </text>
                  )}

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g style={{ pointerEvents: 'none' }}>
                      <rect
                        x={x - 95}
                        y={y - nodeSize - 70}
                        width={190}
                        height={60}
                        rx={12}
                        fill="var(--card)"
                        stroke="var(--border)"
                        strokeWidth={2}
                        filter="url(#nodeShadow)"
                      />
                      <text
                        x={x}
                        y={y - nodeSize - 46}
                        textAnchor="middle"
                        className="fill-[var(--foreground)] text-sm font-bold"
                      >
                        {user.name || 'User'}
                      </text>
                      <text
                        x={x}
                        y={y - nodeSize - 28}
                        textAnchor="middle"
                        className="fill-[var(--muted-foreground)] text-[11px]"
                      >
                        {user.followers} followers • {user.projects} projects
                      </text>
                      {user.interests.length > 0 && (
                        <text
                          x={x}
                          y={y - nodeSize - 12}
                          textAnchor="middle"
                          className="fill-[var(--primary)] text-[10px] font-semibold"
                        >
                          {user.interests.slice(0, 2).join(', ')}
                        </text>
                      )}
                    </g>
                  )}
                </g>
              )
            })
          )}

          {/* Current user (trunk root) */}
          {currentUser && (
            <g
              className="cursor-pointer"
              onClick={() => handleNodeClick(currentUser.id)}
              onMouseEnter={() => setHoveredNode(currentUser.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Root glow */}
              <circle
                cx={trunkX}
                cy={trunkY}
                r={65}
                fill="var(--primary)"
                opacity={0.15}
                className="animate-pulse"
              />
              <circle
                cx={trunkX}
                cy={trunkY}
                r={hoveredNode === currentUser.id ? 55 : 50}
                fill="url(#trunkGradient)"
                filter="url(#glow)"
                className="transition-all duration-300"
              />
              <circle
                cx={trunkX}
                cy={trunkY}
                r={44}
                fill="var(--primary)"
                stroke="white"
                strokeWidth={4}
              />

              {/* Current user image or initial */}
              {currentUser.image ? (
                <>
                  <clipPath id="clip-current">
                    <circle cx={trunkX} cy={trunkY} r={40} />
                  </clipPath>
                  <image
                    href={currentUser.image}
                    x={trunkX - 40}
                    y={trunkY - 40}
                    width={80}
                    height={80}
                    clipPath="url(#clip-current)"
                    style={{ pointerEvents: 'none' }}
                  />
                </>
              ) : (
                <text
                  x={trunkX}
                  y={trunkY + 10}
                  textAnchor="middle"
                  className="fill-white text-3xl font-black"
                  style={{ pointerEvents: 'none' }}
                >
                  {(currentUser.name || 'Y')[0].toUpperCase()}
                </text>
              )}

              {/* "YOU" label */}
              <text
                x={trunkX}
                y={trunkY + 70}
                textAnchor="middle"
                className="fill-[var(--foreground)] text-base font-black"
              >
                YOU
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Info */}
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-[var(--muted-foreground)]">
          <span className="font-black text-[var(--primary)]">{branches.length}</span> interest branches •{' '}
          <span className="font-black text-[var(--accent)]">{totalConnections}</span> connections •{' '}
          Drag to pan • Scroll to zoom
        </p>
      </div>
    </div>
  )
}
