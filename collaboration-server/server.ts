/**
 * Hocuspocus Collaboration Server
 *
 * This is a standalone WebSocket server for real-time collaboration.
 * Deploy this separately from the Next.js app on platforms like:
 * - Railway (recommended)
 * - Render
 * - Fly.io
 * - Hocuspocus Cloud
 * - Your own VPS
 */

import { Server } from '@hocuspocus/server'
import { Database } from '@hocuspocus/extension-database'
import { Logger } from '@hocuspocus/extension-logger'

// PostgreSQL connection for persistence (optional but recommended)
const DATABASE_URL = process.env.DATABASE_URL

const server = new Server({
  port: process.env.PORT ? parseInt(process.env.PORT) : 1234,

  extensions: [
    // Logger for debugging
    new Logger({
      log: (message: string) => {
        console.log(`[Hocuspocus] ${message}`)
      },
      onChange: true,
      onConnect: true,
      onDisconnect: true,
    }),

    // Database persistence (stores Y.js documents in PostgreSQL)
    ...(DATABASE_URL
      ? [
          new Database({
            fetch: async ({ documentName }) => {
              // Fetch document from database
              // This is called when a user connects
              try {
                const { PrismaClient } = await import('@prisma/client')
                const prisma = new PrismaClient()

                // Parse document name: "document:id" or "mindmap:id"
                const [type, id] = documentName.split(':')

                if (type === 'document') {
                  const doc = await prisma.document.findUnique({
                    where: { id },
                    select: { yjsState: true },
                  })
                  return doc?.yjsState || null
                } else if (type === 'mindmap') {
                  const mindMap = await prisma.mindMap.findUnique({
                    where: { id },
                    select: { yjsState: true },
                  })
                  return mindMap?.yjsState || null
                }

                return null
              } catch (error) {
                console.error('Error fetching document:', error)
                return null
              }
            },

            store: async ({ documentName, state }) => {
              // Store document in database
              // This is called periodically as users edit
              try {
                const { PrismaClient } = await import('@prisma/client')
                const prisma = new PrismaClient()

                const [type, id] = documentName.split(':')

                if (type === 'document') {
                  await prisma.document.update({
                    where: { id },
                    data: { yjsState: new Uint8Array(state) },
                  })
                } else if (type === 'mindmap') {
                  await prisma.mindMap.update({
                    where: { id },
                    data: { yjsState: new Uint8Array(state) },
                  })
                }
              } catch (error) {
                console.error('Error storing document:', error)
              }
            },
          }),
        ]
      : []),
  ],

  // Authentication (optional but recommended)
  async onAuthenticate({ token, documentName }) {
    // Verify token and check permissions
    // Return user data if authenticated, throw error if not

    if (process.env.HOCUSPOCUS_SECRET && token !== process.env.HOCUSPOCUS_SECRET) {
      // If you want to implement JWT authentication:
      // const decoded = await verifyJWT(token)
      // return { user: decoded }

      // For now, we'll allow connections with the secret
      throw new Error('Authentication required')
    }

    return {
      user: {
        id: 'authenticated',
        name: 'User',
      },
    }
  },

  // Rate limiting (optional)
  async onRequest({ request, response }) {
    // Add CORS headers if needed
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (request.method === 'OPTIONS') {
      response.writeHead(200)
      response.end()
      return
    }
  },
})

// Start the server
server.listen(() => {
  console.log(`🚀 Hocuspocus collaboration server running on port ${server.configuration.port}`)
  console.log(`📡 WebSocket URL: ws://localhost:${server.configuration.port}`)

  if (DATABASE_URL) {
    console.log('💾 Database persistence enabled')
  } else {
    console.log('⚠️  Database persistence disabled (documents stored in memory only)')
  }
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...')
  server.destroy()
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...')
  server.destroy()
  process.exit(0)
})
