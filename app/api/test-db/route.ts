import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Simple test endpoint to check if database connection works
export async function GET() {
  const startTime = Date.now()

  try {
    console.log('[Test DB] Starting connection test...')

    // Simple query - just count articles
    const count = await prisma.article.count()

    const duration = Date.now() - startTime
    console.log(`[Test DB] Success! Found ${count} articles in ${duration}ms`)

    return NextResponse.json({
      success: true,
      articleCount: count,
      duration: `${duration}ms`,
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error('[Test DB] Error:', error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration}ms`,
    }, { status: 500 })
  }
}
