import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hasPermission } from '@/lib/permissions'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check permission
    const canView = await hasPermission(session.user.id, 'users.view')
    if (!canView) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''
    const status = searchParams.get('status') || '' // 'active', 'banned'
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (role) {
      where.role = role
    }

    // Get banned user IDs if filtering by status
    let bannedUserIds: string[] = []
    if (status) {
      const bans = await prisma.userBan.findMany({
        where: { active: true },
        select: { userId: true }
      })
      bannedUserIds = bans.map((b: { userId: string }) => b.userId)

      if (status === 'banned') {
        where.id = { in: bannedUserIds }
      } else if (status === 'active') {
        where.id = { notIn: bannedUserIds }
      }
    }

    // Fetch users
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
          emailVerified: true,
          _count: {
            select: {
              articles: true,
              userProducts: true,
              createdProjects: true,
              followers: true,
            }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.user.count({ where })
    ])

    // Attach ban status to users
    const usersWithStatus = await Promise.all(
      users.map(async (user: any) => {
        const ban = await prisma.userBan.findFirst({
          where: { userId: user.id, active: true },
          select: { id: true, reason: true, expiresAt: true, createdAt: true }
        })

        return {
          ...user,
          isBanned: !!ban,
          ban: ban || null,
          stats: {
            articles: user._count.articles,
            products: user._count.userProducts,
            projects: user._count.createdProjects,
            followers: user._count.followers,
          }
        }
      })
    )

    return NextResponse.json({
      users: usersWithStatus,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check permission
    const canEdit = await hasPermission(session.user.id, 'users.edit')
    if (!canEdit) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, email, password, role } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER',
        emailVerified: new Date(), // Admin-created users are auto-verified
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json({
      success: true,
      user
    })
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
