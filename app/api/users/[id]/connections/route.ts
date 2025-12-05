import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const connections = await prisma.userFollow.findMany({
      where: {
        followerId: id
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: connections
    })
  } catch (error) {
    console.error('Error fetching connections:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch connections' },
      { status: 500 }
    )
  }
}
