'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPusherClient } from '@/lib/pusher'
import {
  Users, Wifi, WifiOff, MousePointer2, Activity, Eye,
  Radio, Clock, MessageCircle, AlertCircle, Plus, Trash2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { InfiniteCanvasWorkspace, CanvasNode, CanvasConnection } from './InfiniteCanvasWorkspace'
import type { Channel } from 'pusher-js'

interface CollaborativeUser {
  id: string
  name: string
  email: string
  avatar?: string
  color: string
  cursor?: { x: number, y: number }
  lastSeen: number
  isTyping?: boolean
  selectedNodeId?: string | null
}

interface CollaborativeEvent {
  type: 'node-update' | 'node-create' | 'node-delete' | 'connection-create' | 'connection-delete' | 'cursor-move' | 'selection-change'
  userId: string
  data: any
  timestamp: number
}

interface CollaborativeCanvasWorkspaceProps {
  projectId: string
  currentUser: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  initialNodes?: CanvasNode[]
  initialConnections?: CanvasConnection[]
  onSave?: (nodes: CanvasNode[], connections: CanvasConnection[]) => void
  readOnly?: boolean
}

// Generate a consistent color for each user
const getUserColor = (userId: string): string => {
  const colors = [
    '#EF4444', // red
    '#F59E0B', // amber
    '#10B981', // emerald
    '#3B82F6', // blue
    '#8B5CF6', // violet
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F97316', // orange
  ]

  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

export function CollaborativeCanvasWorkspace({
  projectId,
  currentUser,
  initialNodes = [],
  initialConnections = [],
  onSave,
  readOnly = false
}: CollaborativeCanvasWorkspaceProps) {
  // Collaboration state
  const [collaborators, setCollaborators] = useState<Map<string, CollaborativeUser>>(new Map())
  const [isConnected, setIsConnected] = useState(false)
  const [activityFeed, setActivityFeed] = useState<CollaborativeEvent[]>([])
  const [showPresence, setShowPresence] = useState(true)
  const [showActivity, setShowActivity] = useState(false)

  // Canvas state
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes)
  const [connections, setConnections] = useState<CanvasConnection[]>(initialConnections)

  // Pusher refs
  const channelRef = useRef<Channel | null>(null)
  const cursorTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const userColor = getUserColor(currentUser.id)

  // Initialize Pusher connection
  useEffect(() => {
    const pusher = getPusherClient()
    if (!pusher) return

    const channelName = `presence-canvas-${projectId}`
    const channel = pusher.subscribe(channelName) as Channel

    channelRef.current = channel

    // Connection status
    channel.bind('pusher:subscription_succeeded', () => {
      setIsConnected(true)
    })

    channel.bind('pusher:subscription_error', () => {
      setIsConnected(false)
    })

    // Presence events
    channel.bind('pusher:member_added', (member: any) => {
      const user: CollaborativeUser = {
        id: member.id,
        name: member.info.name,
        email: member.info.email,
        avatar: member.info.avatar,
        color: getUserColor(member.id),
        lastSeen: Date.now()
      }

      setCollaborators(prev => new Map(prev).set(member.id, user))

      // Add to activity feed
      addActivity({
        type: 'cursor-move',
        userId: member.id,
        data: { joined: true },
        timestamp: Date.now()
      })
    })

    channel.bind('pusher:member_removed', (member: any) => {
      setCollaborators(prev => {
        const next = new Map(prev)
        next.delete(member.id)
        return next
      })

      addActivity({
        type: 'cursor-move',
        userId: member.id,
        data: { left: true },
        timestamp: Date.now()
      })
    })

    // Node events
    channel.bind('node-created', (event: CollaborativeEvent) => {
      if (event.userId === currentUser.id) return // Ignore own events

      setNodes(prev => [...prev, event.data.node])
      addActivity(event)
    })

    channel.bind('node-updated', (event: CollaborativeEvent) => {
      if (event.userId === currentUser.id) return

      setNodes(prev => prev.map(n =>
        n.id === event.data.nodeId ? { ...n, ...event.data.updates } : n
      ))
      addActivity(event)
    })

    channel.bind('node-deleted', (event: CollaborativeEvent) => {
      if (event.userId === currentUser.id) return

      setNodes(prev => prev.filter(n => n.id !== event.data.nodeId))
      setConnections(prev => prev.filter(c =>
        c.from !== event.data.nodeId && c.to !== event.data.nodeId
      ))
      addActivity(event)
    })

    // Connection events
    channel.bind('connection-created', (event: CollaborativeEvent) => {
      if (event.userId === currentUser.id) return

      setConnections(prev => [...prev, event.data.connection])
      addActivity(event)
    })

    channel.bind('connection-deleted', (event: CollaborativeEvent) => {
      if (event.userId === currentUser.id) return

      setConnections(prev => prev.filter(c => c.id !== event.data.connectionId))
      addActivity(event)
    })

    // Cursor movement
    channel.bind('cursor-moved', (event: { userId: string, x: number, y: number }) => {
      if (event.userId === currentUser.id) return

      setCollaborators(prev => {
        const next = new Map(prev)
        const user = next.get(event.userId)
        if (user) {
          next.set(event.userId, {
            ...user,
            cursor: { x: event.x, y: event.y },
            lastSeen: Date.now()
          })
        }
        return next
      })
    })

    // Selection change
    channel.bind('selection-changed', (event: { userId: string, nodeId: string | null }) => {
      if (event.userId === currentUser.id) return

      setCollaborators(prev => {
        const next = new Map(prev)
        const user = next.get(event.userId)
        if (user) {
          next.set(event.userId, { ...user, selectedNodeId: event.nodeId })
        }
        return next
      })
    })

    // Cleanup
    return () => {
      if (channel) {
        channel.unbind_all()
        pusher.unsubscribe(channelName)
      }
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current)
      }
    }
  }, [projectId, currentUser.id])

  // Add activity to feed
  const addActivity = (event: CollaborativeEvent) => {
    setActivityFeed(prev => {
      const next = [event, ...prev].slice(0, 50) // Keep last 50 events
      return next
    })
  }

  // Broadcast cursor movement
  const broadcastCursor = useCallback((x: number, y: number) => {
    if (!channelRef.current || readOnly) return

    // Throttle cursor updates
    if (cursorTimeoutRef.current) {
      clearTimeout(cursorTimeoutRef.current)
    }

    cursorTimeoutRef.current = setTimeout(() => {
      channelRef.current?.trigger('client-cursor-moved', {
        userId: currentUser.id,
        x,
        y
      })
    }, 50)
  }, [currentUser.id, readOnly])

  // Broadcast events
  const broadcastEvent = useCallback((type: CollaborativeEvent['type'], data: any) => {
    if (!channelRef.current || readOnly) return

    const event: CollaborativeEvent = {
      type,
      userId: currentUser.id,
      data,
      timestamp: Date.now()
    }

    const eventMap: Record<CollaborativeEvent['type'], string> = {
      'node-create': 'client-node-created',
      'node-update': 'client-node-updated',
      'node-delete': 'client-node-deleted',
      'connection-create': 'client-connection-created',
      'connection-delete': 'client-connection-deleted',
      'cursor-move': 'client-cursor-moved',
      'selection-change': 'client-selection-changed'
    }

    const eventName = eventMap[type]
    channelRef.current?.trigger(eventName, event)

    addActivity(event)
  }, [currentUser.id, readOnly])

  // Handle canvas save
  const handleSave = useCallback((updatedNodes: CanvasNode[], updatedConnections: CanvasConnection[]) => {
    setNodes(updatedNodes)
    setConnections(updatedConnections)
    onSave?.(updatedNodes, updatedConnections)
  }, [onSave])

  // Track mouse movement for cursor broadcast
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      broadcastCursor(e.clientX, e.clientY)
    }

    if (!readOnly) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [broadcastCursor, readOnly])

  const activeCollaborators = Array.from(collaborators.values()).filter(
    c => c.id !== currentUser.id && Date.now() - c.lastSeen < 30000 // Active in last 30s
  )

  return (
    <div className="relative w-full h-screen">
      {/* Collaboration Status Bar */}
      <div className="absolute top-20 left-4 z-30 space-y-2">
        {/* Connection status */}
        <Card className={`border-2 ${isConnected ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
          <CardContent className="p-3 flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-600"/>
                <span className="text-xs font-bold text-green-600">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-600"/>
                <span className="text-xs font-bold text-red-600">Offline</span>
              </>
            )}
          </CardContent>
        </Card>

        {/* Active collaborators */}
        {showPresence && activeCollaborators.length > 0 && (
          <Card>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5"/>
                  Active ({activeCollaborators.length})
                </h4>
                <button
                  onClick={() => setShowPresence(false)}
                  className="text-xs text-theme-muted hover:text-[var(--foreground)]"
                >
                  <Eye className="w-3 h-3"/>
                </button>
              </div>

              <div className="space-y-1.5">
                {activeCollaborators.map(user => (
                  <div key={user.id} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: user.color }}
                    />
                    <span className="text-xs font-medium truncate flex-1">
                      {user.name}
                    </span>
                    {user.selectedNodeId && (
                      <MousePointer2 className="w-3 h-3" style={{ color: user.color }}/>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activity toggle */}
        <button
          onClick={() => setShowActivity(!showActivity)}
          className="w-full"
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-2 flex items-center justify-center gap-1">
              <Activity className="w-3.5 h-3.5"/>
              <span className="text-xs font-bold">Activity</span>
              {activityFeed.length > 0 && (
                <Badge size="sm" variant="primary" className="ml-1">
                  {activityFeed.length}
                </Badge>
              )}
            </CardContent>
          </Card>
        </button>

        {/* Activity feed */}
        <AnimatePresence>
          {showActivity && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="max-h-96 overflow-y-auto">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold">Recent Activity</h4>
                    <button
                      onClick={() => setActivityFeed([])}
                      className="text-xs text-theme-muted hover:text-[var(--foreground)]"
                    >
                      Clear
                    </button>
                  </div>

                  {activityFeed.length === 0 ? (
                    <p className="text-xs text-theme-muted text-center py-4">
                      No recent activity
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {activityFeed.map((event, idx) => (
                        <ActivityItem key={idx} event={event} collaborators={collaborators}/>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live cursors */}
      <AnimatePresence>
        {activeCollaborators.map(user => {
          if (!user.cursor) return null

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute pointer-events-none z-50"
              style={{
                left: user.cursor.x,
                top: user.cursor.y,
                color: user.color
              }}
            >
              <MousePointer2 className="w-5 h-5" fill={user.color} stroke="white" strokeWidth={1}/>
              <div
                className="mt-1 px-2 py-0.5 rounded text-xs font-bold text-white shadow-lg whitespace-nowrap"
                style={{ backgroundColor: user.color }}
              >
                {user.name}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Canvas Workspace */}
      <InfiniteCanvasWorkspace
        projectId={projectId}
        initialNodes={nodes}
        initialConnections={connections}
        onSave={handleSave}
        readOnly={readOnly}
      />

      {/* Floating "You" indicator */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="border-2" style={{ borderColor: userColor }}>
          <CardContent className="p-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: userColor }}/>
            <div>
              <div className="text-xs font-bold">You</div>
              <div className="text-[10px] text-theme-muted">{currentUser.name}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Activity feed item component
function ActivityItem({
  event,
  collaborators
}: {
  event: CollaborativeEvent
  collaborators: Map<string, CollaborativeUser>
}) {
  const user = collaborators.get(event.userId)
  const userName = user?.name || 'Someone'
  const userColor = user?.color || '#94A3B8'

  const getActivityText = () => {
    if (event.data?.joined) return `${userName} joined`
    if (event.data?.left) return `${userName} left`

    switch (event.type) {
      case 'node-create':
        return `${userName} created a node`
      case 'node-update':
        return `${userName} updated a node`
      case 'node-delete':
        return `${userName} deleted a node`
      case 'connection-create':
        return `${userName} created a connection`
      case 'connection-delete':
        return `${userName} deleted a connection`
      default:
        return `${userName} made a change`
    }
  }

  const getIcon = () => {
    if (event.data?.joined) return <Users className="w-3 h-3 text-green-600"/>
    if (event.data?.left) return <Users className="w-3 h-3 text-red-600"/>

    switch (event.type) {
      case 'node-create':
        return <Plus className="w-3 h-3 text-blue-600"/>
      case 'node-delete':
        return <Trash2 className="w-3 h-3 text-red-600"/>
      default:
        return <Activity className="w-3 h-3 text-purple-600"/>
    }
  }

  const timeAgo = () => {
    const seconds = Math.floor((Date.now() - event.timestamp) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <div className="flex items-start gap-2 text-xs">
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">
          <span style={{ color: userColor }}>{userName}</span>
          {' '}
          {getActivityText().replace(userName, '').trim()}
        </p>
        <p className="text-[10px] text-theme-muted">{timeAgo()}</p>
      </div>
    </div>
  )
}

// Re-export for convenience
export { type CanvasNode, type CanvasConnection }
