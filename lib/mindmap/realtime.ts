/**
 * Mind Map Real-time Synchronization
 *
 * Handles Pusher integration for real-time collaborative editing.
 */

import { pusherServer } from '@/lib/pusher'
import type {
  RealtimeEvent,
  RealtimeNodeEvent,
  RealtimeConnectionEvent,
  RealtimeCommentEvent,
  RealtimeCursorEvent,
  RealtimeSelectionEvent,
  NodeResponse,
  ConnectionResponse,
  CommentResponse
} from '@/lib/types/mindmap'

/**
 * Get Pusher channel name for a mind map
 */
export function getMindMapChannel(mindMapId: string): string {
  return `mindmap-${mindMapId}`
}

/**
 * Broadcast a real-time event to all connected clients
 */
export async function broadcastEvent(
  mindMapId: string,
  event: RealtimeEvent
): Promise<void> {
  if (!pusherServer) {
    console.warn('Pusher server not configured, skipping real-time broadcast')
    return
  }

  try {
    await pusherServer.trigger(
      getMindMapChannel(mindMapId),
      'mindmap-event',
      event
    )
  } catch (error) {
    console.error('Failed to broadcast real-time event:', error)
    // Don't throw - real-time sync failures shouldn't break the API
  }
}

/**
 * Broadcast node creation
 */
export async function broadcastNodeCreated(
  mindMapId: string,
  node: NodeResponse,
  userId: string,
  userName: string | null
): Promise<void> {
  const event: RealtimeNodeEvent = {
    type: 'node_created',
    mindMapId,
    node,
    userId,
    userName
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Broadcast node update
 */
export async function broadcastNodeUpdated(
  mindMapId: string,
  node: NodeResponse,
  userId: string,
  userName: string | null
): Promise<void> {
  const event: RealtimeNodeEvent = {
    type: 'node_updated',
    mindMapId,
    node,
    userId,
    userName
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Broadcast node deletion
 */
export async function broadcastNodeDeleted(
  mindMapId: string,
  node: NodeResponse,
  userId: string,
  userName: string | null
): Promise<void> {
  const event: RealtimeNodeEvent = {
    type: 'node_deleted',
    mindMapId,
    node,
    userId,
    userName
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Broadcast connection creation
 */
export async function broadcastConnectionCreated(
  mindMapId: string,
  connection: ConnectionResponse,
  userId: string,
  userName: string | null
): Promise<void> {
  const event: RealtimeConnectionEvent = {
    type: 'connection_created',
    mindMapId,
    connection,
    userId,
    userName
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Broadcast connection deletion
 */
export async function broadcastConnectionDeleted(
  mindMapId: string,
  connection: ConnectionResponse,
  userId: string,
  userName: string | null
): Promise<void> {
  const event: RealtimeConnectionEvent = {
    type: 'connection_deleted',
    mindMapId,
    connection,
    userId,
    userName
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Broadcast comment addition
 */
export async function broadcastCommentAdded(
  mindMapId: string,
  comment: CommentResponse,
  userId: string,
  userName: string | null
): Promise<void> {
  const event: RealtimeCommentEvent = {
    type: 'comment_added',
    mindMapId,
    comment,
    userId,
    userName
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Broadcast cursor movement (throttled on client side)
 */
export async function broadcastCursorMoved(
  mindMapId: string,
  userId: string,
  userName: string | null,
  userColor: string,
  x: number,
  y: number
): Promise<void> {
  const event: RealtimeCursorEvent = {
    type: 'cursor_moved',
    mindMapId,
    userId,
    userName,
    userColor,
    x,
    y
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Broadcast selection change
 */
export async function broadcastSelectionChanged(
  mindMapId: string,
  userId: string,
  userName: string | null,
  selectedNodeIds: string[]
): Promise<void> {
  const event: RealtimeSelectionEvent = {
    type: 'selection_changed',
    mindMapId,
    userId,
    userName,
    selectedNodeIds
  }
  await broadcastEvent(mindMapId, event)
}

/**
 * Authenticate Pusher channel subscription
 * Used for private channels
 */
export async function authenticateChannel(
  socketId: string,
  channelName: string,
  userId: string
): Promise<{ auth: string; channel_data?: string }> {
  if (!pusherServer) {
    throw new Error('Pusher server not configured')
  }

  // For presence channels, include user data
  if (channelName.startsWith('presence-')) {
    return pusherServer.authorizeChannel(socketId, channelName, {
      user_id: userId,
      user_info: {
        id: userId
      }
    })
  }

  // For private channels
  return pusherServer.authorizeChannel(socketId, channelName)
}
