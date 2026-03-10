import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: { not: null },
      },
      select: {
        id: true,
        name: true,
        stockScore: true,
        image: true,
        fishCustomization: true,
      },
      orderBy: {
        stockScore: 'desc',
      },
      take: 100,
    })

    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error('Error fetching fishbowl users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fishbowl data' },
      { status: 500 }
    )
  }
}
