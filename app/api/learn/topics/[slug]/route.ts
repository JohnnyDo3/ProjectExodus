import { NextRequest, NextResponse } from 'next/server'
import { getTopic, CoreTopic } from '@/data/modules'

// GET /api/learn/topics/[slug]
// Returns full topic data with all its modules
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const topic = getTopic(slug as CoreTopic)

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: topic
    })
  } catch (error) {
    console.error('Error fetching topic:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch topic' },
      { status: 500 }
    )
  }
}
