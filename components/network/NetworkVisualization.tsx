'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Users, User, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'
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

// Group users by their primary interest
function groupUsersByInterest(users: UserNode[], currentUser: UserNode | undefined) {
  const groups: Record<string, UserNode[]> = {}
  const currentInterests = currentUser?.interests || []

  users.forEach((user) => {
    if (user.isCurrentUser) return

    // Find shared interest with current user, or use first interest
    const sharedInterest = user.interests.find((i) => currentInterests.includes(i))
    const primaryInterest = sharedInterest || user.interests[0] || 'Other'

    if (!groups[primaryInterest]) {
      groups[primaryInterest] = []
    }
    groups[primaryInterest].push(user)
  })

  // Sort users within each group by number of shared interests (more = closer to trunk)
  Object.keys(groups).forEach((interest) => {
    groups[interest].sort((a, b) => {
      const aShared = a.interests.filter((i) => currentInterests.includes(i)).length
      const bShared = b.interests.filter((i) => currentInterests.includes(i)).length
      return bShared - aShared
    })
  })

  return groups
}

// Calculate position on a branch
function getPositionOnBranch(
  branchIndex: number,
  totalBranches: number,
  nodeIndex: number,
  totalNodes: number,
  containerWidth: number,
  containerHeight: number,
  scale: number
) {
  // Trunk is at bottom center
  const trunkX = containerWidth / 2
  const trunkY = containerHeight - 80

  // Branches spread upward in a fan shape
  const angleSpread = Math.PI * 0.7 // 126 degrees spread
  const startAngle = Math.PI / 2 + angleSpread / 2 // Start from upper-left
  const branchAngle = startAngle - (branchIndex / Math.max(totalBranches - 1, 1)) * angleSpread

  // Branch length increases for nodes further from trunk
  const baseLength = 120 * scale
  const nodeDistance = baseLength + nodeIndex * (60 * scale)

  // Add slight randomness for organic feel
  const jitter = Math.sin(branchIndex * 7 + nodeIndex * 13) * 15

  const x = trunkX + Math.cos(branchAngle) * nodeDistance + jitter
  const y = trunkY - Math.sin(branchAngle) * nodeDistance + jitter / 2

  return { x, y, branchAngle }
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
      <div className="flex items-center justify-center h-[400px] md:h-[600px] bg-[var(--muted)] rounded-xl border-2 border-theme-secondary">
        <div className="text-center space-y-4 px-4">
          <Users className="w-12 h-12 md:w-16 md:h-16 text-theme-muted mx-auto opacity-50" />
          <h3 className="text-xl md:text-2xl font-black text-theme-muted">SIGN IN TO VIEW YOUR NETWORK</h3>
          <p className="text-sm md:text-base font-semibold text-theme-muted max-w-md">
            Log in to see your connections visualized as an interactive network tree
          </p>
        </div>
      </div>
    )
  }

  const containerWidth = 1200
  const containerHeight = 700
  const branches = Object.entries(interestGroups)
  const totalConnections = processedUsers.filter((u) => !u.isCurrentUser).length

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
      <div className="absolute top-4 left-4 z-10 bg-[var(--card)] border-2 border-theme-primary rounded-lg p-4 space-y-2 shadow-xl">
        <h4 className="text-xs font-black text-[var(--foreground)] mb-2">LEGEND</h4>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
          <span className="text-[10px] font-bold text-theme-muted">You (Root)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/30" />
          <span className="text-[10px] font-bold text-theme-muted">Following</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[var(--muted)] border-2 border-dashed border-[var(--border)]" />
          <span className="text-[10px] font-bold text-theme-muted">Suggested</span>
        </div>
        <div className="border-t border-theme-muted pt-2 mt-2 text-[9px] text-theme-muted">
          Closer = More shared interests
        </div>
      </div>

      {/* SVG Tree Visualization */}
      <div className="bg-gradient-to-b from-[var(--background)] to-[var(--muted)] rounded-xl border-4 border-theme-primary overflow-hidden shadow-2xl">
        <svg
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
          className="w-full h-[400px] md:h-[600px]"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          <defs>
            {/* Gradient for trunk */}
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
            </linearGradient>
            {/* Glow filter for following nodes */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Draw branches (lines from trunk to nodes) */}
          {branches.map(([interest, groupUsers], branchIdx) =>
            groupUsers.map((user, nodeIdx) => {
              const { x, y, branchAngle } = getPositionOnBranch(
                branchIdx,
                branches.length,
                nodeIdx,
                groupUsers.length,
                containerWidth,
                containerHeight,
                scale
              )
              const trunkX = containerWidth / 2
              const trunkY = containerHeight - 80

              // Calculate control point for curved branch
              const midX = (trunkX + x) / 2
              const midY = (trunkY + y) / 2 - 30

              return (
                <path
                  key={`branch-${user.id}`}
                  d={`M ${trunkX} ${trunkY} Q ${midX} ${midY} ${x} ${y}`}
                  fill="none"
                  stroke={user.isFollowing ? 'var(--accent)' : 'var(--muted)'}
                  strokeWidth={user.isFollowing ? 3 : 1.5}
                  strokeOpacity={user.isFollowing ? 0.6 : 0.3}
                  strokeDasharray={user.isFollowing ? 'none' : '4 4'}
                  className={`transition-all duration-700 ${
                    animationComplete ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${branchIdx * 100 + nodeIdx * 50}ms` }}
                />
              )
            })
          )}

          {/* Draw interest labels on branches */}
          {branches.map(([interest], branchIdx) => {
            const { x, y } = getPositionOnBranch(
              branchIdx,
              branches.length,
              0,
              1,
              containerWidth,
              containerHeight,
              scale
            )
            const trunkX = containerWidth / 2
            const trunkY = containerHeight - 80
            const labelX = (trunkX + x) / 2
            const labelY = (trunkY + y) / 2

            return (
              <text
                key={`label-${interest}`}
                x={labelX}
                y={labelY - 10}
                textAnchor="middle"
                className="fill-theme-muted text-[9px] font-bold uppercase tracking-wider"
                style={{ opacity: animationComplete ? 0.5 : 0 }}
              >
                {interest.length > 12 ? interest.substring(0, 12) + '...' : interest}
              </text>
            )
          })}

          {/* Draw user nodes */}
          {branches.map(([interest, groupUsers], branchIdx) =>
            groupUsers.map((user, nodeIdx) => {
              const { x, y } = getPositionOnBranch(
                branchIdx,
                branches.length,
                nodeIdx,
                groupUsers.length,
                containerWidth,
                containerHeight,
                scale
              )
              const isHovered = hoveredNode === user.id
              const nodeSize = user.isFollowing ? 22 : 16

              return (
                <g
                  key={user.id}
                  className={`cursor-pointer transition-all duration-500 ${
                    animationComplete ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${branchIdx * 100 + nodeIdx * 50 + 200}ms` }}
                  onClick={() => handleNodeClick(user.id)}
                  onMouseEnter={() => setHoveredNode(user.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? nodeSize + 4 : nodeSize}
                    fill={user.isFollowing ? 'var(--accent)' : 'var(--muted)'}
                    stroke={isHovered ? 'var(--primary)' : 'rgba(255,255,255,0.3)'}
                    strokeWidth={isHovered ? 3 : 1.5}
                    filter={user.isFollowing ? 'url(#glow)' : 'none'}
                    className="transition-all duration-200"
                  />

                  {/* User image or icon */}
                  {user.image ? (
                    <clipPath id={`clip-${user.id}`}>
                      <circle cx={x} cy={y} r={nodeSize - 2} />
                    </clipPath>
                  ) : null}

                  {user.image ? (
                    <image
                      href={user.image}
                      x={x - nodeSize + 2}
                      y={y - nodeSize + 2}
                      width={(nodeSize - 2) * 2}
                      height={(nodeSize - 2) * 2}
                      clipPath={`url(#clip-${user.id})`}
                      className="rounded-full"
                    />
                  ) : (
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      className="fill-white text-xs font-bold"
                    >
                      {(user.name || 'U')[0].toUpperCase()}
                    </text>
                  )}

                  {/* Name label (visible on hover or for followed users) */}
                  {(isHovered || user.isFollowing) && (
                    <text
                      x={x}
                      y={y + nodeSize + 14}
                      textAnchor="middle"
                      className="fill-[var(--foreground)] text-[10px] font-bold"
                    >
                      {user.name || 'User'}
                    </text>
                  )}

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x - 80}
                        y={y - nodeSize - 55}
                        width={160}
                        height={45}
                        rx={8}
                        fill="var(--card)"
                        stroke="var(--border)"
                        strokeWidth={1}
                        className="drop-shadow-lg"
                      />
                      <text
                        x={x}
                        y={y - nodeSize - 35}
                        textAnchor="middle"
                        className="fill-[var(--foreground)] text-xs font-bold"
                      >
                        {user.name || 'User'}
                      </text>
                      <text
                        x={x}
                        y={y - nodeSize - 20}
                        textAnchor="middle"
                        className="fill-theme-muted text-[10px]"
                      >
                        {user.followers} followers • {user.projects} projects
                      </text>
                    </g>
                  )}
                </g>
              )
            })
          )}

          {/* Draw current user (trunk/root) */}
          {currentUser && (
            <g
              className="cursor-pointer"
              onClick={() => handleNodeClick(currentUser.id)}
              onMouseEnter={() => setHoveredNode(currentUser.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Root glow */}
              <circle
                cx={containerWidth / 2}
                cy={containerHeight - 80}
                r={hoveredNode === currentUser.id ? 45 : 40}
                fill="url(#trunkGradient)"
                filter="url(#glow)"
                className="transition-all duration-300"
              />
              <circle
                cx={containerWidth / 2}
                cy={containerHeight - 80}
                r={35}
                fill="var(--primary)"
                stroke="white"
                strokeWidth={3}
              />

              {/* Current user image or initial */}
              {currentUser.image ? (
                <>
                  <clipPath id="clip-current">
                    <circle cx={containerWidth / 2} cy={containerHeight - 80} r={32} />
                  </clipPath>
                  <image
                    href={currentUser.image}
                    x={containerWidth / 2 - 32}
                    y={containerHeight - 80 - 32}
                    width={64}
                    height={64}
                    clipPath="url(#clip-current)"
                  />
                </>
              ) : (
                <text
                  x={containerWidth / 2}
                  y={containerHeight - 75}
                  textAnchor="middle"
                  className="fill-white text-2xl font-black"
                >
                  {(currentUser.name || 'Y')[0].toUpperCase()}
                </text>
              )}

              {/* "YOU" label */}
              <text
                x={containerWidth / 2}
                y={containerHeight - 30}
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
        <p className="text-sm font-semibold text-theme-muted">
          <span className="font-black text-theme-primary">{branches.length}</span> interest branches •{' '}
          <span className="font-black text-theme-accent">{totalConnections}</span> connections •{' '}
          Click nodes to view profiles
        </p>
      </div>
    </div>
  )
}
