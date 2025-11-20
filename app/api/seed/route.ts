import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Protected seed endpoint for initial database setup
 *
 * IMPORTANT: Remove this endpoint after initial seeding or protect it with authentication!
 *
 * Usage:
 * POST /api/seed?secret=YOUR_SECRET
 *
 * Set SEED_SECRET in your Vercel environment variables
 */
export async function POST(req: NextRequest) {
  try {
    // Protection: Check for secret key
    const secret = req.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SEED_SECRET || 'change-me-in-production'

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if already seeded
    const existingProducts = await prisma.product.count()
    if (existingProducts > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database already seeded. Clear data first if you want to re-seed.',
          existingProducts
        },
        { status: 400 }
      )
    }

    console.log('🌱 Starting database seed via API...')

    // Create Admin User
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@projectexodus.com' },
      update: {},
      create: {
        email: 'admin@projectexodus.com',
        name: 'Project Exodus Team',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5ByJ7JkKWZ0yS',
        role: 'ADMIN',
        bio: 'Building sustainable infrastructure for Food, Water, and Energy',
      },
    })

    // Create Categories
    const renewableEnergy = await prisma.category.upsert({
      where: { slug: 'renewable-energy' },
      update: {},
      create: {
        name: 'Renewable Energy',
        slug: 'renewable-energy',
        description: 'Solar panels, wind turbines, and clean energy solutions',
        icon: 'zap',
      },
    })

    const waterSystems = await prisma.category.upsert({
      where: { slug: 'water-systems' },
      update: {},
      create: {
        name: 'Water Systems',
        slug: 'water-systems',
        description: 'Filtration, conservation, and rainwater harvesting',
        icon: 'droplet',
      },
    })

    // Create Vendors
    const goalZero = await prisma.vendor.upsert({
      where: { slug: 'goal-zero' },
      update: {},
      create: {
        name: 'Goal Zero',
        slug: 'goal-zero',
        description: 'Portable power solutions and solar panels',
        website: 'https://www.goalzero.com',
      },
    })

    const berkey = await prisma.vendor.upsert({
      where: { slug: 'berkey' },
      update: {},
      create: {
        name: 'Berkey Filters',
        slug: 'berkey',
        description: 'World-renowned gravity-fed water filtration systems',
        website: 'https://www.berkeyfilters.com',
      },
    })

    // Create Tags
    const solarTag = await prisma.tag.upsert({
      where: { slug: 'solar' },
      update: {},
      create: { name: 'Solar', slug: 'solar' },
    })

    const offGridTag = await prisma.tag.upsert({
      where: { slug: 'off-grid' },
      update: {},
      create: { name: 'Off-Grid', slug: 'off-grid' },
    })

    const waterTag = await prisma.tag.upsert({
      where: { slug: 'water-filtration' },
      update: {},
      create: { name: 'Water Filtration', slug: 'water-filtration' },
    })

    // Create Products
    const product1 = await prisma.product.create({
      data: {
        name: 'Goal Zero Yeti 1500X Portable Power Station',
        slug: 'goal-zero-yeti-1500x',
        description: 'High-capacity portable power station with 1516Wh lithium battery.',
        specifications: {
          capacity: '1516Wh (1.5kWh)',
          weight: '45.64 lbs (20.7 kg)',
          outputs: '2x AC outlets, 4x USB-A, 2x USB-C',
        },
        price: 1999.95,
        purchaseLink: 'https://www.goalzero.com/products/yeti-1500x-portable-power-station',
        status: 'PUBLISHED',
        featured: true,
        publishedAt: new Date(),
        categoryId: renewableEnergy.id,
        vendorId: goalZero.id,
      },
    })

    await prisma.sustainabilityMetric.create({
      data: {
        productId: product1.id,
        carbonFootprint: 45.2,
        carbonSavings: 2500.0,
        recyclable: true,
        renewableEnergy: true,
        lifespanYears: 10,
        sustainabilityScore: 82,
      },
    })

    await prisma.productTag.createMany({
      data: [
        { productId: product1.id, tagId: solarTag.id },
        { productId: product1.id, tagId: offGridTag.id },
      ],
      skipDuplicates: true,
    })

    const product2 = await prisma.product.create({
      data: {
        name: 'Big Berkey Water Filtration System',
        slug: 'berkey-big-water-filter',
        description: 'Gravity-fed water purification system. No electricity required.',
        specifications: {
          capacity: '2.25 gallons',
          flowRate: '3.5 gallons per hour',
          filterLife: '6000 gallons per pair',
        },
        price: 359.00,
        purchaseLink: 'https://www.berkeyfilters.com/products/big-berkey',
        status: 'PUBLISHED',
        featured: true,
        publishedAt: new Date(),
        categoryId: waterSystems.id,
        vendorId: berkey.id,
      },
    })

    await prisma.sustainabilityMetric.create({
      data: {
        productId: product2.id,
        carbonFootprint: 8.5,
        carbonSavings: 450.0,
        waterSavings: 50000.0,
        recyclable: true,
        lifespanYears: 20,
        sustainabilityScore: 91,
      },
    })

    await prisma.productTag.createMany({
      data: [
        { productId: product2.id, tagId: waterTag.id },
        { productId: product2.id, tagId: offGridTag.id },
      ],
      skipDuplicates: true,
    })

    // Create Article Category
    const energyCategory = await prisma.articleCategory.upsert({
      where: { slug: 'energy-systems' },
      update: {},
      create: {
        name: 'Energy Systems',
        slug: 'energy-systems',
        description: 'Learn about renewable energy solutions',
        icon: 'zap',
      },
    })

    // Create Article
    const article1 = await prisma.article.create({
      data: {
        title: 'Solar Power for Beginners: A Complete Guide',
        slug: 'solar-power-beginners-guide',
        excerpt: 'Everything you need to know to start your solar journey.',
        content: `# Solar Power for Beginners\n\nSwitching to solar power is one of the most impactful decisions you can make for both the environment and your wallet.\n\n## Understanding Solar Energy\n\nSolar panels convert sunlight into electricity through photovoltaic cells.\n\n## Getting Started\n\nStart small with portable solar panels and scale up from there.`,
        readTime: 8,
        status: 'PUBLISHED',
        featured: true,
        publishedAt: new Date(),
        categoryId: energyCategory.id,
        authorId: adminUser.id,
      },
    })

    await prisma.articleTag.create({
      data: { articleId: article1.id, tagId: solarTag.id },
    })

    // Get counts
    const counts = {
      categories: await prisma.category.count(),
      vendors: await prisma.vendor.count(),
      products: await prisma.product.count(),
      articles: await prisma.article.count(),
      tags: await prisma.tag.count(),
    }

    console.log('✅ Database seeded successfully via API')

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      data: counts,
    })
  } catch (error) {
    console.error('❌ Seed failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// GET endpoint to check seed status
export async function GET() {
  try {
    const counts = {
      products: await prisma.product.count(),
      articles: await prisma.article.count(),
      categories: await prisma.category.count(),
      vendors: await prisma.vendor.count(),
      tags: await prisma.tag.count(),
    }

    const isSeeded = counts.products > 0

    return NextResponse.json({
      success: true,
      isSeeded,
      counts,
      message: isSeeded
        ? 'Database has been seeded'
        : 'Database is empty - use POST /api/seed?secret=YOUR_SECRET to seed',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to check seed status' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
