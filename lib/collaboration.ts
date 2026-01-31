/**
 * Collaboration Server Configuration
 *
 * This file configures the real-time collaboration infrastructure using Y.js and Hocuspocus.
 *
 * For production deployment, you'll need to run a separate Hocuspocus server.
 * See: https://tiptap.dev/docs/hocuspocus/getting-started
 *
 * OPTION 1: Hosted Hocuspocus Cloud (Recommended for production)
 * - Sign up at https://cloud.tiptap.dev
 * - Set NEXT_PUBLIC_HOCUSPOCUS_URL in .env
 *
 * OPTION 2: Self-hosted Hocuspocus Server
 * - Create a separate Node.js server (see /server/collaboration.js example below)
 * - Deploy to a service that supports WebSocket (Railway, Render, Fly.io, etc.)
 * - Set NEXT_PUBLIC_HOCUSPOCUS_URL to your server URL
 *
 * OPTION 3: Development Mode (Y-WebSocket)
 * - Use y-websocket for local development
 * - Run: npx y-websocket-server
 * - Default port: 1234
 */

export const collaborationConfig = {
  // WebSocket URL for collaboration server
  // Default: ws://localhost:1234 for development
  // Production: wss://your-hocuspocus-server.com
  serverUrl:
    process.env.NEXT_PUBLIC_HOCUSPOCUS_URL ||
    process.env.NEXT_PUBLIC_COLLABORATION_URL ||
    'ws://localhost:1234',

  // Authentication token (if using Hocuspocus Cloud or custom auth)
  getToken: () => {
    return process.env.NEXT_PUBLIC_HOCUSPOCUS_TOKEN || null
  },

  // Reconnection settings
  maxAttempts: 10,
  delay: 1000,
  factor: 2,
  maxDelay: 30000,

  // Broadcasting settings
  broadcast: true,
  forceSyncInterval: 60000, // 60 seconds

  // Awareness settings (for cursor tracking)
  awarenessSettings: {
    timeout: 30000,
  },
}

/**
 * Get document name for collaboration
 * Format: document:{documentId} or mindmap:{mindmapId}
 */
export function getDocumentName(type: 'document' | 'mindmap', id: string): string {
  return `${type}:${id}`
}

/**
 * Get user info for awareness (cursor display)
 */
export function getUserAwarenessInfo(user: {
  id: string
  name: string | null
  image?: string | null
}) {
  return {
    user: {
      id: user.id,
      name: user.name || 'Anonymous',
      image: user.image,
      color: generateUserColor(user.id),
    },
  }
}

/**
 * Generate a consistent color for each user based on their ID
 */
function generateUserColor(userId: string): string {
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Orange
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
    '#85C1E2', // Sky Blue
    '#F8B88B', // Peach
    '#AAB7B8', // Gray
  ]

  // Generate a consistent index from user ID
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length

  return colors[index]
}

/**
 * Example Hocuspocus Server Setup
 * Create this file as /server/collaboration.js and deploy separately
 *
 * ```javascript
 * import { Server } from '@hocuspocus/server'
 * import { Database } from '@hocuspocus/extension-database'
 * import { Logger } from '@hocuspocus/extension-logger'
 * import { PrismaClient } from '@prisma/client'
 *
 * const prisma = new PrismaClient()
 *
 * const server = Server.configure({
 *   port: process.env.PORT || 1234,
 *
 *   extensions: [
 *     new Logger(),
 *     new Database({
 *       // Store documents in database
 *       fetch: async ({ documentName }) => {
 *         const [type, id] = documentName.split(':')
 *
 *         if (type === 'document') {
 *           const doc = await prisma.document.findUnique({
 *             where: { id },
 *             select: { content: true }
 *           })
 *           return doc?.content || null
 *         }
 *
 *         if (type === 'mindmap') {
 *           const mindmap = await prisma.mindMap.findUnique({
 *             where: { id },
 *             select: { data: true }
 *           })
 *           return mindmap?.data || null
 *         }
 *
 *         return null
 *       },
 *
 *       store: async ({ documentName, state }) => {
 *         const [type, id] = documentName.split(':')
 *
 *         if (type === 'document') {
 *           await prisma.document.update({
 *             where: { id },
 *             data: {
 *               content: state,
 *               updatedAt: new Date()
 *             }
 *           })
 *         }
 *
 *         if (type === 'mindmap') {
 *           await prisma.mindMap.update({
 *             where: { id },
 *             data: {
 *               data: state,
 *               updatedAt: new Date()
 *             }
 *           })
 *         }
 *       }
 *     })
 *   ],
 *
 *   async onAuthenticate({ token, documentName, socketId }) {
 *     // Verify JWT token and check permissions
 *     // Return user data if authenticated
 *     // Throw error if not authorized
 *   }
 * })
 *
 * server.listen()
 * ```
 */
