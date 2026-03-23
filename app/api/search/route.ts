import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

const SEARCH_RATE_LIMIT = {
  id: 'search',
  limit: 30,
  windowSeconds: 60,
}

type SearchType = 'all' | 'articles' | 'products' | 'projects' | 'people' | 'discussions' | 'learning'

// GET /api/search - Global site-wide search
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, SEARCH_RATE_LIMIT)
    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.trim()
    const type = (searchParams.get('type') || 'all') as SearchType
    const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1)
    const limit = Math.min(Math.max(1, parseInt(searchParams.get('limit') || '10') || 10), 50)
    const skip = (page - 1) * limit

    if (!query || query.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      )
    }

    if (query.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Search query must be at least 2 characters' },
        { status: 400 }
      )
    }

    const searchFilter = { contains: query, mode: 'insensitive' as const }

    // Build all search promises based on requested type
    const shouldSearch = (t: SearchType) => type === 'all' || type === t

    // Articles (published only)
    const articlesPromise = shouldSearch('articles')
      ? Promise.all([
          prisma.article.findMany({
            where: {
              status: 'PUBLISHED',
              moduleType: null,
              OR: [
                { title: searchFilter },
                { excerpt: searchFilter },
              ],
            },
            select: {
              id: true,
              title: true,
              slug: true,
              excerpt: true,
              coverImage: true,
              readTime: true,
              views: true,
              publishedAt: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
            take: limit,
            skip,
            orderBy: { publishedAt: 'desc' },
          }),
          prisma.article.count({
            where: {
              status: 'PUBLISHED',
              moduleType: null,
              OR: [
                { title: searchFilter },
                { excerpt: searchFilter },
              ],
            },
          }),
        ])
      : Promise.resolve([[], 0] as [any[], number])

    // Products (published only)
    const productsPromise = shouldSearch('products')
      ? Promise.all([
          prisma.product.findMany({
            where: {
              status: 'PUBLISHED',
              OR: [
                { name: searchFilter },
                { description: searchFilter },
              ],
            },
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              price: true,
              purchaseLink: true,
              featured: true,
              images: {
                select: { url: true },
                take: 1,
              },
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
            take: limit,
            skip,
            orderBy: { createdAt: 'desc' },
          }),
          prisma.product.count({
            where: {
              status: 'PUBLISHED',
              OR: [
                { name: searchFilter },
                { description: searchFilter },
              ],
            },
          }),
        ])
      : Promise.resolve([[], 0] as [any[], number])

    // Projects (public and active/completed only)
    const projectsPromise = shouldSearch('projects')
      ? Promise.all([
          prisma.project.findMany({
            where: {
              visibility: 'PUBLIC',
              status: { in: ['ACTIVE', 'COMPLETED'] },
              OR: [
                { name: searchFilter },
                { description: searchFilter },
              ],
            },
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              status: true,
              coverImage: true,
              creator: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              _count: {
                select: {
                  members: true,
                },
              },
            },
            take: limit,
            skip,
            orderBy: { createdAt: 'desc' },
          }),
          prisma.project.count({
            where: {
              visibility: 'PUBLIC',
              status: { in: ['ACTIVE', 'COMPLETED'] },
              OR: [
                { name: searchFilter },
                { description: searchFilter },
              ],
            },
          }),
        ])
      : Promise.resolve([[], 0] as [any[], number])

    // People (users)
    const peoplePromise = shouldSearch('people')
      ? Promise.all([
          prisma.user.findMany({
            where: {
              OR: [
                { name: searchFilter },
                { headline: searchFilter },
                { bio: searchFilter },
              ],
            },
            select: {
              id: true,
              name: true,
              image: true,
              headline: true,
              guardianArchetype: true,
              stockScore: true,
            },
            take: limit,
            skip,
            orderBy: { stockScore: 'desc' },
          }),
          prisma.user.count({
            where: {
              OR: [
                { name: searchFilter },
                { headline: searchFilter },
                { bio: searchFilter },
              ],
            },
          }),
        ])
      : Promise.resolve([[], 0] as [any[], number])

    // Discussions (social posts, public only)
    const discussionsPromise = shouldSearch('discussions')
      ? Promise.all([
          prisma.socialPost.findMany({
            where: {
              visibility: 'PUBLIC',
              content: searchFilter,
            },
            select: {
              id: true,
              content: true,
              createdAt: true,
              shares: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              _count: {
                select: {
                  comments: true,
                  likes: true,
                },
              },
            },
            take: limit,
            skip,
            orderBy: { createdAt: 'desc' },
          }),
          prisma.socialPost.count({
            where: {
              visibility: 'PUBLIC',
              content: searchFilter,
            },
          }),
        ])
      : Promise.resolve([[], 0] as [any[], number])

    // Learning modules (articles with moduleType set, published only)
    const learningPromise = shouldSearch('learning')
      ? Promise.all([
          prisma.article.findMany({
            where: {
              status: 'PUBLISHED',
              moduleType: { not: null },
              OR: [
                { title: searchFilter },
                { excerpt: searchFilter },
              ],
            },
            select: {
              id: true,
              title: true,
              slug: true,
              excerpt: true,
              coverImage: true,
              moduleType: true,
              difficulty: true,
              estimatedTime: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
            take: limit,
            skip,
            orderBy: { publishedAt: 'desc' },
          }),
          prisma.article.count({
            where: {
              status: 'PUBLISHED',
              moduleType: { not: null },
              OR: [
                { title: searchFilter },
                { excerpt: searchFilter },
              ],
            },
          }),
        ])
      : Promise.resolve([[], 0] as [any[], number])

    // Execute all searches in parallel
    const [
      [articles, articlesTotal],
      [products, productsTotal],
      [projects, projectsTotal],
      [people, peopleTotal],
      [discussions, discussionsTotal],
      [learning, learningTotal],
    ] = await Promise.all([
      articlesPromise,
      productsPromise,
      projectsPromise,
      peoplePromise,
      discussionsPromise,
      learningPromise,
    ])

    const totalResults = articlesTotal + productsTotal + projectsTotal + peopleTotal + discussionsTotal + learningTotal

    return NextResponse.json({
      success: true,
      data: {
        articles: {
          results: articles,
          total: articlesTotal,
        },
        products: {
          results: products,
          total: productsTotal,
        },
        projects: {
          results: projects,
          total: projectsTotal,
        },
        people: {
          results: people,
          total: peopleTotal,
        },
        discussions: {
          results: discussions,
          total: discussionsTotal,
        },
        learning: {
          results: learning,
          total: learningTotal,
        },
      },
      pagination: {
        query,
        type,
        page,
        limit,
        totalResults,
      },
    })
  } catch (error) {
    console.error('Error performing search:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to perform search' },
      { status: 500 }
    )
  }
}
