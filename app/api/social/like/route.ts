import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { handlePrismaError } from '@/lib/utils/prisma-errors'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { postId } = body

    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Check if already liked
    const existingLike = await prisma.socialLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.user.id
        }
      }
    })

    if (existingLike) {
      // Unlike
      await prisma.socialLike.delete({
        where: { id: existingLike.id }
      })

      return NextResponse.json({
        success: true,
        liked: false,
        message: 'Post unliked'
      })
    } else {
      // Like
      await prisma.socialLike.create({
        data: {
          postId,
          userId: session.user.id
        }
      })

      return NextResponse.json({
        success: true,
        liked: true,
        message: 'Post liked'
      })
    }
  } catch (error) {
    return handlePrismaError(error, 'toggle like')
  }
}
