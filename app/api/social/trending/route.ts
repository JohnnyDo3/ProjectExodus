import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get posts from the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const posts = await prisma.socialPost.findMany({
      where: {
        visibility: 'PUBLIC',
        createdAt: { gte: thirtyDaysAgo }
      },
      select: {
        hashtags: true,
        content: true
      }
    })

    // Count hashtags from the hashtags array field
    const hashtagCounts: Record<string, number> = {}

    posts.forEach(post => {
      // Count from hashtags array
      if (post.hashtags && Array.isArray(post.hashtags)) {
        post.hashtags.forEach(tag => {
          const normalizedTag = tag.toLowerCase().startsWith('#') ? tag.toLowerCase() : `#${tag.toLowerCase()}`
          hashtagCounts[normalizedTag] = (hashtagCounts[normalizedTag] || 0) + 1
        })
      }

      // Also extract hashtags from content (in case they weren't stored in the array)
      const contentHashtags = post.content.match(/#\w+/g)
      if (contentHashtags) {
        contentHashtags.forEach(tag => {
          const normalizedTag = tag.toLowerCase()
          // Only count if not already counted from the array
          if (!post.hashtags?.some(h => h.toLowerCase() === normalizedTag || `#${h.toLowerCase()}` === normalizedTag)) {
            hashtagCounts[normalizedTag] = (hashtagCounts[normalizedTag] || 0) + 1
          }
        })
      }
    })

    // Sort by count and get top 10
    const trending = Object.entries(hashtagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([hashtag, count]) => ({
        hashtag: hashtag.startsWith('#') ? hashtag : `#${hashtag}`,
        count
      }))

    return NextResponse.json({
      success: true,
      data: trending
    })
  } catch (error) {
    console.error('Error fetching trending hashtags:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trending hashtags' },
      { status: 500 }
    )
  }
}
