import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'

// POST /api/learning/replies/[replyId]/helpful
// Toggle helpful vote on a reply
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ replyId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { replyId } = await params

    // Check if reply exists
    const reply = await prisma.moduleDiscussionReply.findUnique({
      where: { id: replyId }
    })

    if (!reply) {
      return NextResponse.json(
        { success: false, error: 'Reply not found' },
        { status: 404 }
      )
    }

    // Can't vote on your own reply
    if (reply.authorId === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot vote on your own reply' },
        { status: 400 }
      )
    }

    // Check if user has already voted
    const existingVote = await prisma.discussionHelpfulVote.findUnique({
      where: {
        replyId_voterId: {
          replyId,
          voterId: session.user.id
        }
      }
    })

    let helpfulCount: number
    let hasUserVotedHelpful: boolean

    if (existingVote) {
      // Remove vote
      await prisma.discussionHelpfulVote.delete({
        where: { id: existingVote.id }
      })

      // Decrement count
      const updated = await prisma.moduleDiscussionReply.update({
        where: { id: replyId },
        data: { helpfulCount: { decrement: 1 } }
      })

      helpfulCount = updated.helpfulCount
      hasUserVotedHelpful = false
    } else {
      // Add vote
      await prisma.discussionHelpfulVote.create({
        data: {
          replyId,
          voterId: session.user.id
        }
      })

      // Increment count
      const updated = await prisma.moduleDiscussionReply.update({
        where: { id: replyId },
        data: { helpfulCount: { increment: 1 } }
      })

      helpfulCount = updated.helpfulCount
      hasUserVotedHelpful = true
    }

    return NextResponse.json({
      success: true,
      data: {
        helpfulCount,
        hasUserVotedHelpful
      }
    })

  } catch (error) {
    console.error('Error toggling helpful vote:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to toggle helpful vote' },
      { status: 500 }
    )
  }
}
