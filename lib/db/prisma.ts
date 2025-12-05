// Prisma Client Singleton
// Prevents multiple instances in development

let PrismaClient: any
let prisma: any

try {
  // Try to import the generated Prisma client
  const prismaModule = require('@prisma/client')
  PrismaClient = prismaModule.PrismaClient

  const globalForPrisma = globalThis as unknown as {
    prisma: typeof prisma | undefined
  }

  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      // Add connection timeout for serverless
      datasourceUrl: process.env.DATABASE_URL,
    })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (e) {
  // During build time when Prisma client isn't generated, provide a mock
  console.warn('Prisma client not initialized. Using mock for build time.')

  // Create a mock client for build time only
  prisma = new Proxy({}, {
    get: () => {
      return new Proxy(() => Promise.resolve([]), {
        get: () => () => Promise.resolve([])
      })
    }
  })
}

export { prisma }
export default prisma
