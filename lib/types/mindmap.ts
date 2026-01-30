/**
 * Mind Map Type Definitions
 *
 * Comprehensive TypeScript types and Zod validation schemas
 * for the mind mapping system.
 */

import { z } from 'zod'

// ============================================================================
// Enums (matching Prisma schema)
// ============================================================================

export const MindMapLayoutEnum = z.enum(['FORCE_GRAPH', 'INFINITE_CANVAS', 'TREE', 'RADIAL'])
export type MindMapLayout = z.infer<typeof MindMapLayoutEnum>

export const NodeTypeEnum = z.enum([
  'IDEA',
  'TASK',
  'MILESTONE',
  'RESOURCE',
  'NOTE',
  'DECISION',
  'RISK',
  'OPPORTUNITY',
  'PERSON',
  'QUESTION'
])
export type NodeType = z.infer<typeof NodeTypeEnum>

export const ConnectionTypeEnum = z.enum([
  'RELATED',
  'DEPENDS',
  'LEADS_TO',
  'BLOCKS',
  'SUPPORTS',
  'CONFLICTS',
  'PART_OF',
  'SIMILAR_TO'
])
export type ConnectionType = z.infer<typeof ConnectionTypeEnum>

export const ConnectionStyleEnum = z.enum(['SOLID', 'DASHED', 'DOTTED', 'THICK'])
export type ConnectionStyle = z.infer<typeof ConnectionStyleEnum>

export const PriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
export type Priority = z.infer<typeof PriorityEnum>

export const NodeStatusEnum = z.enum([
  'NOT_STARTED',
  'IN_PROGRESS',
  'BLOCKED',
  'COMPLETED',
  'CANCELLED'
])
export type NodeStatus = z.infer<typeof NodeStatusEnum>

export const PermissionEnum = z.enum(['VIEW', 'COMMENT', 'EDIT', 'ADMIN'])
export type Permission = z.infer<typeof PermissionEnum>

export const ActivityTypeEnum = z.enum([
  'NODE_CREATED',
  'NODE_UPDATED',
  'NODE_DELETED',
  'CONNECTION_CREATED',
  'CONNECTION_DELETED',
  'COMMENT_ADDED',
  'COMMENT_UPDATED',
  'COMMENT_DELETED',
  'CONTRIBUTOR_ADDED',
  'CONTRIBUTOR_REMOVED',
  'SETTINGS_UPDATED'
])
export type ActivityType = z.infer<typeof ActivityTypeEnum>

// ============================================================================
// Validation Schemas
// ============================================================================

// Mind Map Schemas
export const CreateMindMapSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional().nullable(),
  projectId: z.string().cuid('Invalid project ID'),
  layout: MindMapLayoutEnum.default('FORCE_GRAPH'),
  isCollaborative: z.boolean().default(true),
  isPublic: z.boolean().default(false),
  allowComments: z.boolean().default(true),
  canvasWidth: z.number().int().positive().default(3000),
  canvasHeight: z.number().int().positive().default(2000),
  centerX: z.number().default(0),
  centerY: z.number().default(0),
  zoomLevel: z.number().min(0.1).max(10).default(1)
})

export const UpdateMindMapSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  layout: MindMapLayoutEnum.optional(),
  isCollaborative: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  allowComments: z.boolean().optional(),
  canvasWidth: z.number().int().positive().optional(),
  canvasHeight: z.number().int().positive().optional(),
  centerX: z.number().optional(),
  centerY: z.number().optional(),
  zoomLevel: z.number().min(0.1).max(10).optional()
})

// Node Schemas
export const CreateNodeSchema = z.object({
  type: NodeTypeEnum,
  label: z.string().min(1, 'Label is required').max(200, 'Label too long'),
  description: z.string().max(2000, 'Description too long').optional().nullable(),
  x: z.number(),
  y: z.number(),
  width: z.number().int().positive().default(200),
  height: z.number().int().positive().default(120),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional().nullable(),
  emoji: z.string().max(10).optional().nullable(),
  fontSize: z.number().int().min(8).max(72).default(14),
  priority: PriorityEnum.optional().nullable(),
  status: NodeStatusEnum.optional().nullable(),
  assignedToId: z.string().cuid().optional().nullable(),
  dueDate: z.string().datetime().optional().nullable(),
  tags: z.array(z.string().max(50)).max(20).default([])
})

export const UpdateNodeSchema = z.object({
  type: NodeTypeEnum.optional(),
  label: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional().nullable(),
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional().nullable(),
  emoji: z.string().max(10).optional().nullable(),
  fontSize: z.number().int().min(8).max(72).optional(),
  priority: PriorityEnum.optional().nullable(),
  status: NodeStatusEnum.optional().nullable(),
  assignedToId: z.string().cuid().optional().nullable(),
  dueDate: z.string().datetime().optional().nullable(),
  tags: z.array(z.string().max(50)).max(20).optional()
})

export const BulkCreateNodesSchema = z.object({
  nodes: z.array(CreateNodeSchema).min(1).max(100)
})

export const BulkUpdateNodesSchema = z.object({
  updates: z.array(z.object({
    id: z.string().cuid(),
    data: UpdateNodeSchema
  })).min(1).max(100)
})

export const BulkDeleteNodesSchema = z.object({
  nodeIds: z.array(z.string().cuid()).min(1).max(100)
})

// Connection Schemas
export const CreateConnectionSchema = z.object({
  sourceNodeId: z.string().cuid('Invalid source node ID'),
  targetNodeId: z.string().cuid('Invalid target node ID'),
  type: ConnectionTypeEnum,
  label: z.string().max(100).optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  style: ConnectionStyleEnum.default('SOLID'),
  bidirectional: z.boolean().default(false),
  showArrow: z.boolean().default(true),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional().nullable()
})

export const UpdateConnectionSchema = z.object({
  type: ConnectionTypeEnum.optional(),
  label: z.string().max(100).optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  style: ConnectionStyleEnum.optional(),
  bidirectional: z.boolean().optional(),
  showArrow: z.boolean().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional().nullable()
})

export const BulkCreateConnectionsSchema = z.object({
  connections: z.array(CreateConnectionSchema).min(1).max(100)
})

export const BulkDeleteConnectionsSchema = z.object({
  connectionIds: z.array(z.string().cuid()).min(1).max(100)
})

// Comment Schemas
export const CreateCommentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(2000, 'Comment too long'),
  nodeId: z.string().cuid().optional().nullable(),
  connectionId: z.string().cuid().optional().nullable()
})

export const UpdateCommentSchema = z.object({
  content: z.string().min(1).max(2000),
  isResolved: z.boolean().optional()
})

// Contributor Schemas
export const AddContributorSchema = z.object({
  userId: z.string().cuid('Invalid user ID'),
  permission: PermissionEnum
})

export const UpdateContributorSchema = z.object({
  permission: PermissionEnum
})

// Export Schemas
export const ExportFormatEnum = z.enum(['JSON', 'SVG', 'PNG', 'PDF', 'MARKDOWN'])
export type ExportFormat = z.infer<typeof ExportFormatEnum>

export const ExportOptionsSchema = z.object({
  format: ExportFormatEnum,
  includeComments: z.boolean().default(false),
  includeActivity: z.boolean().default(false),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  backgroundColor: z.string().optional()
})

// ============================================================================
// Response Types
// ============================================================================

export interface MindMapResponse {
  id: string
  projectId: string
  title: string
  description: string | null
  layout: MindMapLayout
  isCollaborative: boolean
  isPublic: boolean
  allowComments: boolean
  canvasWidth: number
  canvasHeight: number
  centerX: number
  centerY: number
  zoomLevel: number
  nodeCount: number
  connectionCount: number
  creatorId: string
  lastEditedById: string | null
  createdAt: Date
  updatedAt: Date
  project?: {
    id: string
    name: string
    slug: string
  }
  creator?: {
    id: string
    name: string | null
    image: string | null
  }
  lastEditedBy?: {
    id: string
    name: string | null
    image: string | null
  }
}

export interface NodeResponse {
  id: string
  mindMapId: string
  type: NodeType
  label: string
  description: string | null
  x: number
  y: number
  width: number
  height: number
  color: string | null
  emoji: string | null
  fontSize: number
  priority: Priority | null
  status: NodeStatus | null
  assignedToId: string | null
  dueDate: Date | null
  tags: string[]
  createdById: string
  lastEditedById: string | null
  createdAt: Date
  updatedAt: Date
  lastEditedAt: Date | null
  assignedTo?: {
    id: string
    name: string | null
    image: string | null
  }
  createdBy?: {
    id: string
    name: string | null
    image: string | null
  }
  _count?: {
    comments: number
  }
}

export interface ConnectionResponse {
  id: string
  mindMapId: string
  sourceNodeId: string
  targetNodeId: string
  type: ConnectionType
  label: string | null
  description: string | null
  style: ConnectionStyle
  bidirectional: boolean
  showArrow: boolean
  color: string | null
  createdAt: Date
  updatedAt: Date
  sourceNode?: {
    id: string
    label: string
    type: NodeType
  }
  targetNode?: {
    id: string
    label: string
    type: NodeType
  }
  _count?: {
    comments: number
  }
}

export interface CommentResponse {
  id: string
  content: string
  nodeId: string | null
  connectionId: string | null
  userId: string
  isResolved: boolean
  resolvedBy: string | null
  resolvedAt: Date | null
  createdAt: Date
  updatedAt: Date
  user?: {
    id: string
    name: string | null
    image: string | null
  }
}

export interface ContributorResponse {
  id: string
  mindMapId: string
  userId: string
  permission: Permission
  nodesCreated: number
  nodesEdited: number
  connectionsCreated: number
  lastActiveAt: Date | null
  addedAt: Date
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export interface ActivityResponse {
  id: string
  mindMapId: string
  userId: string
  activityType: ActivityType
  entityType: string | null
  entityId: string | null
  description: string
  changes: any
  createdAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

// ============================================================================
// Utility Types
// ============================================================================

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ============================================================================
// Realtime Event Types
// ============================================================================

export interface RealtimeNodeEvent {
  type: 'node_created' | 'node_updated' | 'node_deleted'
  mindMapId: string
  node: NodeResponse
  userId: string
  userName: string | null
}

export interface RealtimeConnectionEvent {
  type: 'connection_created' | 'connection_deleted'
  mindMapId: string
  connection: ConnectionResponse
  userId: string
  userName: string | null
}

export interface RealtimeCommentEvent {
  type: 'comment_added' | 'comment_updated' | 'comment_deleted'
  mindMapId: string
  comment: CommentResponse
  userId: string
  userName: string | null
}

export interface RealtimeCursorEvent {
  type: 'cursor_moved'
  mindMapId: string
  userId: string
  userName: string | null
  userColor: string
  x: number
  y: number
}

export interface RealtimeSelectionEvent {
  type: 'selection_changed'
  mindMapId: string
  userId: string
  userName: string | null
  selectedNodeIds: string[]
}

export type RealtimeEvent =
  | RealtimeNodeEvent
  | RealtimeConnectionEvent
  | RealtimeCommentEvent
  | RealtimeCursorEvent
  | RealtimeSelectionEvent

// ============================================================================
// Error Types
// ============================================================================

export class MindMapError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'MindMapError'
  }
}

export class NotFoundError extends MindMapError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends MindMapError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends MindMapError {
  constructor(message = 'Insufficient permissions') {
    super(message, 'FORBIDDEN', 403)
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends MindMapError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}
