# Mind Map API Documentation

## Overview

This document provides comprehensive documentation for the production-ready mind mapping system integrated into Project Exodus. The system supports real-time collaborative editing, comprehensive CRUD operations, permission management, and activity tracking.

## Architecture

### Components

1. **API Layer** (`/app/api/mindmaps`)
   - RESTful endpoints for all operations
   - Zod validation for request bodies
   - Comprehensive error handling
   - Permission-based access control

2. **Type System** (`/lib/types/mindmap.ts`)
   - TypeScript interfaces for all entities
   - Zod validation schemas
   - Custom error classes

3. **Permission Management** (`/lib/mindmap/permissions.ts`)
   - Role-based access control
   - Permission levels: VIEW, COMMENT, EDIT, ADMIN
   - Activity tracking

4. **Real-time Sync** (`/lib/mindmap/realtime.ts`)
   - Pusher integration for collaborative editing
   - Event broadcasting for all changes
   - Cursor and selection tracking

## API Endpoints

### Mind Maps

#### `GET /api/mindmaps/[id]`
Get mind map details.

**Permission Required:** VIEW

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "projectId": "string",
    "title": "string",
    "description": "string | null",
    "layout": "FORCE_GRAPH | INFINITE_CANVAS | TREE | RADIAL",
    "isCollaborative": boolean,
    "isPublic": boolean,
    "nodeCount": number,
    "connectionCount": number,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

#### `PATCH /api/mindmaps/[id]`
Update mind map settings.

**Permission Required:** EDIT

**Request Body:**
```json
{
  "title": "string (optional)",
  "description": "string | null (optional)",
  "layout": "FORCE_GRAPH | INFINITE_CANVAS | TREE | RADIAL (optional)",
  "isCollaborative": "boolean (optional)",
  "isPublic": "boolean (optional)",
  "allowComments": "boolean (optional)"
}
```

#### `DELETE /api/mindmaps/[id]`
Delete mind map and all associated data.

**Permission Required:** ADMIN

---

### Nodes

#### `GET /api/mindmaps/[id]/nodes`
Get all nodes with optional filtering and pagination.

**Permission Required:** VIEW

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 100)
- `type`: Filter by node type
- `status`: Filter by node status
- `assignedToId`: Filter by assignee

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [/* array of nodes */],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number,
      "hasMore": boolean
    }
  }
}
```

#### `POST /api/mindmaps/[id]/nodes`
Create one or more nodes.

**Permission Required:** EDIT

**Single Node Request:**
```json
{
  "type": "IDEA | TASK | MILESTONE | RESOURCE | NOTE | DECISION | RISK | OPPORTUNITY | PERSON | QUESTION",
  "label": "string",
  "description": "string | null (optional)",
  "x": number,
  "y": number,
  "width": number (default: 200),
  "height": number (default: 120),
  "color": "#RRGGBB (optional)",
  "priority": "LOW | MEDIUM | HIGH | CRITICAL (optional)",
  "status": "NOT_STARTED | IN_PROGRESS | BLOCKED | COMPLETED | CANCELLED (optional)",
  "assigneeId": "string (optional)",
  "dueDate": "ISO date (optional)",
  "tags": ["string"] (optional)
}
```

**Bulk Creation Request:**
```json
{
  "nodes": [/* array of node objects */]
}
```

#### `PUT /api/mindmaps/[id]/nodes`
Bulk update nodes.

**Permission Required:** EDIT

**Request Body:**
```json
{
  "updates": [
    {
      "id": "string",
      "data": {/* partial node object */}
    }
  ]
}
```

#### `DELETE /api/mindmaps/[id]/nodes`
Bulk delete nodes.

**Permission Required:** EDIT

**Request Body:**
```json
{
  "nodeIds": ["string"]
}
```

#### `GET /api/mindmaps/[id]/nodes/[nodeId]`
Get individual node details.

#### `PATCH /api/mindmaps/[id]/nodes/[nodeId]`
Update individual node.

#### `DELETE /api/mindmaps/[id]/nodes/[nodeId]`
Delete individual node.

---

### Connections

#### `GET /api/mindmaps/[id]/connections`
Get all connections with optional filtering.

**Permission Required:** VIEW

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `type`: Filter by connection type
- `nodeId`: Filter by connected node

#### `POST /api/mindmaps/[id]/connections`
Create one or more connections.

**Permission Required:** EDIT

**Request Body:**
```json
{
  "sourceNodeId": "string",
  "targetNodeId": "string",
  "type": "RELATED | DEPENDS | LEADS_TO | BLOCKS | SUPPORTS | CONFLICTS | PART_OF | SIMILAR_TO",
  "label": "string (optional)",
  "description": "string (optional)",
  "style": "SOLID | DASHED | DOTTED | THICK (default: SOLID)",
  "bidirectional": "boolean (default: false)",
  "showArrow": "boolean (default: true)",
  "color": "#RRGGBB (optional)"
}
```

**Bulk Creation:**
```json
{
  "connections": [/* array of connection objects */]
}
```

#### `DELETE /api/mindmaps/[id]/connections`
Bulk delete connections.

#### `GET /api/mindmaps/[id]/connections/[connectionId]`
Get individual connection.

#### `PATCH /api/mindmaps/[id]/connections/[connectionId]`
Update individual connection.

#### `DELETE /api/mindmaps/[id]/connections/[connectionId]`
Delete individual connection.

---

### Comments

#### `GET /api/mindmaps/[id]/comments`
Get comments with filtering.

**Permission Required:** VIEW

**Query Parameters:**
- `nodeId`: Filter by node
- `connectionId`: Filter by connection
- `isResolved`: Filter by resolution status

#### `POST /api/mindmaps/[id]/comments`
Add a comment to a node or connection.

**Permission Required:** COMMENT

**Request Body:**
```json
{
  "content": "string",
  "nodeId": "string (optional)",
  "connectionId": "string (optional)"
}
```

**Note:** Must provide either `nodeId` OR `connectionId`, not both.

#### `GET /api/mindmaps/[id]/comments/[commentId]`
Get individual comment.

#### `PATCH /api/mindmaps/[id]/comments/[commentId]`
Update comment (author only) or mark as resolved.

#### `DELETE /api/mindmaps/[id]/comments/[commentId]`
Delete comment (author or admin).

---

### Contributors

#### `GET /api/mindmaps/[id]/contributors`
Get all contributors.

**Permission Required:** VIEW

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "userId": "string",
      "permission": "VIEW | COMMENT | EDIT | ADMIN",
      "nodesCreated": number,
      "nodesEdited": number,
      "connectionsCreated": number,
      "lastActiveAt": "ISO date | null",
      "addedAt": "ISO date",
      "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "image": "string"
      }
    }
  ]
}
```

#### `POST /api/mindmaps/[id]/contributors`
Add a contributor.

**Permission Required:** ADMIN

**Request Body:**
```json
{
  "userId": "string",
  "permission": "VIEW | COMMENT | EDIT | ADMIN"
}
```

#### `PATCH /api/mindmaps/[id]/contributors/[userId]`
Update contributor permission.

**Permission Required:** ADMIN

#### `DELETE /api/mindmaps/[id]/contributors/[userId]`
Remove contributor.

**Permission Required:** ADMIN

---

### Activity

#### `GET /api/mindmaps/[id]/activity`
Get activity log with pagination.

**Permission Required:** VIEW

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `type`: Filter by activity type
- `userId`: Filter by user

**Activity Types:**
- NODE_CREATED
- NODE_UPDATED
- NODE_DELETED
- CONNECTION_CREATED
- CONNECTION_DELETED
- COMMENT_ADDED
- COMMENT_UPDATED
- COMMENT_DELETED
- CONTRIBUTOR_ADDED
- CONTRIBUTOR_REMOVED
- SETTINGS_UPDATED

---

### Export

#### `GET /api/mindmaps/[id]/export`
Export mind map in various formats.

**Permission Required:** VIEW

**Query Parameters:**
- `format`: JSON | MARKDOWN (default: JSON)
- `includeComments`: boolean (default: false)
- `includeActivity`: boolean (default: false)

**Formats:**
- **JSON**: Full structured export with all data
- **MARKDOWN**: Human-readable markdown document
- **SVG, PNG, PDF**: Coming soon

---

## Real-time Events

When connected to the Pusher channel `mindmap-{mindMapId}`, you'll receive real-time events:

### Event Types

```typescript
// Node events
type: 'node_created' | 'node_updated' | 'node_deleted'
data: {
  mindMapId: string
  node: NodeResponse
  userId: string
  userName: string
}

// Connection events
type: 'connection_created' | 'connection_deleted'
data: {
  mindMapId: string
  connection: ConnectionResponse
  userId: string
  userName: string
}

// Comment events
type: 'comment_added' | 'comment_updated' | 'comment_deleted'
data: {
  mindMapId: string
  comment: CommentResponse
  userId: string
  userName: string
}

// Cursor events
type: 'cursor_moved'
data: {
  mindMapId: string
  userId: string
  userName: string
  userColor: string
  x: number
  y: number
}

// Selection events
type: 'selection_changed'
data: {
  mindMapId: string
  userId: string
  userName: string
  selectedNodeIds: string[]
}
```

---

## Permission System

### Permission Levels

1. **VIEW**: Can view mind map
2. **COMMENT**: Can view and add comments
3. **EDIT**: Can create, update, delete nodes and connections
4. **ADMIN**: Full control including contributor management and deletion

### Permission Rules

- Mind map creator automatically has ADMIN permission
- Public mind maps are viewable by anyone
- Project members automatically have VIEW permission
- Contributors have their assigned permission level
- Permission levels are hierarchical (ADMIN > EDIT > COMMENT > VIEW)

---

## Error Handling

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request (validation error)
- `401`: Unauthorized (not authenticated)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error
- `501`: Not Implemented

---

## Data Validation

All request bodies are validated using Zod schemas. Common validation rules:

- **Strings**: Min/max length constraints
- **IDs**: Must be valid CUIDs
- **Colors**: Must match `#RRGGBB` format
- **Enums**: Must be one of predefined values
- **Arrays**: Size limits (usually max 100 items for bulk operations)

---

## Best Practices

1. **Pagination**: Always use pagination for large datasets
2. **Bulk Operations**: Use bulk endpoints when creating/updating/deleting multiple items
3. **Real-time Sync**: Subscribe to Pusher events for collaborative editing
4. **Error Handling**: Always check `success` field in responses
5. **Permissions**: Check user permissions before attempting restricted operations
6. **Activity Logging**: All changes are automatically logged to activity feed
7. **Validation**: Validate data on client side before sending to API

---

## Examples

### Creating a Simple Mind Map

1. Create mind map (done during project creation)
2. Add nodes:
```javascript
await fetch('/api/mindmaps/{id}/nodes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nodes: [
      { type: 'IDEA', label: 'Main Idea', x: 0, y: 0 },
      { type: 'TASK', label: 'Action Item', x: 200, y: 0 }
    ]
  })
})
```

3. Connect nodes:
```javascript
await fetch('/api/mindmaps/{id}/connections', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sourceNodeId: 'node1',
    targetNodeId: 'node2',
    type: 'LEADS_TO'
  })
})
```

### Collaborative Editing

```javascript
import Pusher from 'pusher-js'

const pusher = new Pusher(PUSHER_KEY, { cluster: PUSHER_CLUSTER })
const channel = pusher.subscribe(`mindmap-${mindMapId}`)

channel.bind('mindmap-event', (event) => {
  switch (event.type) {
    case 'node_created':
      // Add node to local state
      break
    case 'node_updated':
      // Update node in local state
      break
    case 'connection_created':
      // Add connection to local state
      break
  }
})
```

---

## Security Considerations

1. **Authentication**: All endpoints require valid session
2. **Authorization**: Permission checks on every request
3. **Validation**: All inputs validated with Zod
4. **SQL Injection**: Protected by Prisma ORM
5. **XSS**: Client must sanitize rendered content
6. **Rate Limiting**: Consider implementing rate limits for production
7. **CORS**: Configure appropriately for your domain

---

## Performance Tips

1. Use pagination for large datasets
2. Bulk operations are more efficient than individual calls
3. Real-time events reduce polling needs
4. Database indexes are optimized for common queries
5. Consider caching for frequently accessed mind maps

---

## Future Enhancements

- [ ] SVG/PNG/PDF export
- [ ] Mind map templates
- [ ] Advanced search and filtering
- [ ] Undo/redo at API level
- [ ] Conflict resolution for simultaneous edits
- [ ] Rate limiting
- [ ] Webhook notifications
- [ ] GraphQL API option

---

## Support

For issues or questions:
- Check CLAUDE.md for project context
- Review DAY_NIGHT_SYSTEM.md for theme integration
- Consult DATABASE_SETUP.md for database configuration
