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
        image: true,
        fishCustomization: true,
        _count: {
          select: {
            createdProjects: true,
            articles: true,
            moduleProgress: { where: { completed: true } },
            followers: true,
            sentConnections: { where: { status: 'ACCEPTED' } },
            receivedConnections: { where: { status: 'ACCEPTED' } },
          },
        },
      },
      take: 100,
    })

    // Compute stock scores dynamically (same formula as profile pages)
    const usersWithScores = users.map((u: any) => {
      const c = u._count || {}
      const stockScore =
        (c.createdProjects || 0) * 10 +
        (c.articles || 0) * 5 +
        (c.moduleProgress || 0) * 3 +
        (c.followers || 0) * 1 +
        ((c.sentConnections || 0) + (c.receivedConnections || 0)) * 2
      return {
        id: u.id,
        name: u.name,
        image: u.image,
        fishCustomization: u.fishCustomization,
        stockScore,
      }
    }).sort((a: any, b: any) => b.stockScore - a.stockScore)

    return NextResponse.json({ success: true, data: usersWithScores })
  } catch (error) {
    console.error('Error fetching fishbowl users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fishbowl data' },
      { status: 500 }
    )
  }
}
