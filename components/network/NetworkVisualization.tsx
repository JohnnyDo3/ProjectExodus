'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Users, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'
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
  branchPath: string // SVG path from parent to this node
}

interface Branch {
  interest: string
  nodes: BranchNode[]
  mainPath: string // Main branch curve
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

    // Find shared interest with current user, prioritize matches
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
      // Following users come first
      if (a.isFollowing && !b.isFollowing) return -1
      if (!a.isFollowing && b.isFollowing) return 1

      // Then sort by number of shared interests
      const aShared = a.interests.filter((i) => currentInterests.includes(i)).length
      const bShared = b.interests.filter((i) => currentInterests.includes(i)).length
      return bShared - aShared
    })
  })

  return groups
}

// Calculate tree layout
function calculateTreeLayout(
  interestGroups: Record<string, UserNode[]>,
  containerWidth: number,
  containerHeight: number
): Branch[] {
  const branches: Branch[] = []
  const entries = Object.entries(interestGroups)
  const numBranches = entries.length

  // Trunk position
  const trunkX = containerWidth / 2
  const trunkY = containerHeight - 100

  // Calculate branch spread
  const totalSpread = Math.min(containerWidth * 0.8, 900)
  const branchSpacing = numBranches > 1 ? totalSpread / (numBranches - 1) : 0
  const startX = trunkX - totalSpread / 2

  entries.forEach(([interest, users], branchIndex) => {
    // Main branch endpoint - spread horizontally, go up
    const branchEndX = numBranches > 1
      ? startX + branchIndex * branchSpacing
      : trunkX

    // Vary branch heights for organic look
    const heightVariation = Math.sin(branchIndex * 2.5) * 50
    const branchEndY = 180 + heightVariation

    // Generate main branch path with curve
    const mainPath = generateBranchPath(trunkX, trunkY, branchEndX, branchEndY, 0.4)

    // Position users along and around this branch
    const nodes: BranchNode[] = []
    const numUsers = users.length

    users.forEach((user, userIndex) => {
      // Position users in a cluster around the branch end
      // Following users are closer to the branch
      const isFollowing = user.isFollowing

      // Calculate position relative to branch end
      const angle = (userIndex / Math.max(numUsers - 1, 1)) * Math.PI - Math.PI / 2
      const radius = isFollowing ? 40 + userIndex * 15 : 60 + userIndex * 20

      // Spread users in a fan pattern from the branch end
      let nodeX: number
      let nodeY: number

      if (numUsers === 1) {
        // Single user - place at branch end
        nodeX = branchEndX
        nodeY = branchEndY - 50
      } else if (numUsers <= 3) {
        // Few users - horizontal spread
        const spreadWidth = 80
        const offset = (userIndex - (numUsers - 1) / 2) * spreadWidth / Math.max(numUsers - 1, 1)
        nodeX = branchEndX + offset
        nodeY = branchEndY - 40 - userIndex * 25
      } else {
        // Many users - semicircle arrangement
        const spreadAngle = Math.PI * 0.8
        const userAngle = -Math.PI / 2 - spreadAngle / 2 + (userIndex / (numUsers - 1)) * spreadAngle
        const distFromBranch = 50 + (userIndex % 2) * 30
        nodeX = branchEndX + Math.cos(userAngle) * distFromBranch
        nodeY = branchEndY + Math.sin(userAngle) * distFromBranch - 30
      }

      // Generate path from branch to user
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
  const [scale, setScale] = useState(1)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Mark which users are following
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

  const containerWidth = 1200
  const containerHeight = 700

  const branches = useMemo(
    () => calculateTreeLayout(interestGroups, containerWidth, containerHeight),
    [interestGroups]
  )

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleNodeClick = (userId: string) => {
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
  const trunkY = containerHeight - 100

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          onClick={() => setScale((s) => Math.min(s + 0.2, 2))}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setScale(1)}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-[var(--card)] hover:bg-[var(--primary)] hover:text-white"
          title="Reset"
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
        <div className="border-t border-[var(--border)] pt-2 mt-2 text-[9px] text-[var(--muted-foreground)]">
          Branches = Shared interests
        </div>
      </div>

      {/* SVG Tree Visualization */}
      <div className="bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--muted)]/50 rounded-xl border-2 border-[var(--border)] overflow-hidden shadow-2xl">
        <svg
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
          className="w-full h-[400px] md:h-[600px]"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          <defs>
            {/* Gradient for trunk */}
            <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--secondary)" />
              <stop offset="50%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>

            {/* Branch gradient */}
            <linearGradient id="branchGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
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

          {/* Tree trunk - thick line from bottom to center */}
          <path
            d={`M ${trunkX} ${containerHeight} L ${trunkX} ${trunkY + 40}`}
            stroke="url(#trunkGradient)"
            strokeWidth="20"
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
                strokeWidth={Math.max(8 - branchIdx, 4)}
                strokeLinecap="round"
                fill="none"
                opacity={0.6}
                className={`transition-all duration-700 ${animationComplete ? 'opacity-60' : 'opacity-0'}`}
                style={{ transitionDelay: `${branchIdx * 150}ms` }}
              />

              {/* Sub-branches to each user */}
              {branch.nodes.map((node, nodeIdx) => (
                <path
                  key={`subbranch-${node.user.id}`}
                  d={node.branchPath}
                  stroke={node.user.isFollowing ? 'var(--accent)' : 'var(--muted-foreground)'}
                  strokeWidth={node.user.isFollowing ? 3 : 2}
                  strokeLinecap="round"
                  fill="none"
                  opacity={node.user.isFollowing ? 0.7 : 0.3}
                  strokeDasharray={node.user.isFollowing ? 'none' : '4 4'}
                  className={`transition-all duration-500 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${branchIdx * 150 + nodeIdx * 80 + 200}ms` }}
                />
              ))}

              {/* Branch label */}
              <text
                x={branch.endX}
                y={branch.endY + 20}
                textAnchor="middle"
                className="fill-[var(--primary)] text-[10px] font-black uppercase tracking-wider"
                style={{
                  opacity: animationComplete ? 0.8 : 0,
                  transition: 'opacity 0.5s',
                  transitionDelay: `${branchIdx * 150 + 100}ms`
                }}
              >
                {branch.interest.length > 15 ? branch.interest.substring(0, 15) + '...' : branch.interest}
              </text>
            </g>
          ))}

          {/* User nodes */}
          {branches.map((branch, branchIdx) =>
            branch.nodes.map((node, nodeIdx) => {
              const { user, x, y } = node
              const isHovered = hoveredNode === user.id
              const nodeSize = user.isFollowing ? 24 : 18

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
                      r={nodeSize + 8}
                      fill="var(--accent)"
                      opacity={0.2}
                      className="animate-pulse"
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? nodeSize + 4 : nodeSize}
                    fill={user.isFollowing ? 'var(--accent)' : 'var(--card)'}
                    stroke={user.isFollowing ? 'var(--accent)' : 'var(--border)'}
                    strokeWidth={isHovered ? 3 : 2}
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
                      />
                    </>
                  ) : (
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      className={`text-sm font-bold ${user.isFollowing ? 'fill-white' : 'fill-[var(--foreground)]'}`}
                    >
                      {(user.name || 'U')[0].toUpperCase()}
                    </text>
                  )}

                  {/* Name label */}
                  {(isHovered || user.isFollowing) && (
                    <text
                      x={x}
                      y={y + nodeSize + 16}
                      textAnchor="middle"
                      className="fill-[var(--foreground)] text-[11px] font-bold"
                      style={{ textShadow: '0 1px 2px var(--background)' }}
                    >
                      {user.name?.split(' ')[0] || 'User'}
                    </text>
                  )}

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x - 90}
                        y={y - nodeSize - 65}
                        width={180}
                        height={55}
                        rx={10}
                        fill="var(--card)"
                        stroke="var(--border)"
                        strokeWidth={2}
                        filter="url(#nodeShadow)"
                      />
                      <text
                        x={x}
                        y={y - nodeSize - 42}
                        textAnchor="middle"
                        className="fill-[var(--foreground)] text-sm font-bold"
                      >
                        {user.name || 'User'}
                      </text>
                      <text
                        x={x}
                        y={y - nodeSize - 24}
                        textAnchor="middle"
                        className="fill-[var(--muted-foreground)] text-[11px]"
                      >
                        {user.followers} followers • {user.projects} projects
                      </text>
                      {user.interests.length > 0 && (
                        <text
                          x={x}
                          y={y - nodeSize - 8}
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
                r={55}
                fill="var(--primary)"
                opacity={0.15}
                className="animate-pulse"
              />
              <circle
                cx={trunkX}
                cy={trunkY}
                r={hoveredNode === currentUser.id ? 48 : 44}
                fill="url(#trunkGradient)"
                filter="url(#glow)"
                className="transition-all duration-300"
              />
              <circle
                cx={trunkX}
                cy={trunkY}
                r={38}
                fill="var(--primary)"
                stroke="white"
                strokeWidth={3}
              />

              {/* Current user image or initial */}
              {currentUser.image ? (
                <>
                  <clipPath id="clip-current">
                    <circle cx={trunkX} cy={trunkY} r={35} />
                  </clipPath>
                  <image
                    href={currentUser.image}
                    x={trunkX - 35}
                    y={trunkY - 35}
                    width={70}
                    height={70}
                    clipPath="url(#clip-current)"
                  />
                </>
              ) : (
                <text
                  x={trunkX}
                  y={trunkY + 8}
                  textAnchor="middle"
                  className="fill-white text-2xl font-black"
                >
                  {(currentUser.name || 'Y')[0].toUpperCase()}
                </text>
              )}

              {/* "YOU" label */}
              <text
                x={trunkX}
                y={trunkY + 60}
                textAnchor="middle"
                className="fill-[var(--foreground)] text-sm font-black"
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
          Click nodes to view profiles
        </p>
      </div>
    </div>
  )
}
