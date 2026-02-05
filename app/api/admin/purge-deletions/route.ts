import { NextRequest, NextResponse } from 'next/server'
import { purgeScheduledDeletions } from '@/lib/privacy/purge'

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.CRON_SECRET
    if (!secret) {
      return NextResponse.json(
        { success: false, error: 'CRON secret not configured' },
        { status: 500 }
      )
    }

    const authHeader = request.headers.get('authorization') || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    const queryToken = new URL(request.url).searchParams.get('token')
    const provided = token || queryToken

    if (provided !== secret) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await purgeScheduledDeletions()

    return NextResponse.json({
      success: true,
      deleted: result.deleted,
    })
  } catch (error) {
    console.error('Purge deletions error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to purge deletions' },
      { status: 500 }
    )
  }
}
