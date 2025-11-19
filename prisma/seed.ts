import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Project Exodus database...')

  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@projectexodus.com' },
    update: {},
    create: {
      email: 'admin@projectexodus.com',
      name: 'Project Exodus Team',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5ByJ7JkKWZ0yS', // "password123" - change in production!
      role: 'ADMIN',
      bio: 'Building sustainable infrastructure for Food, Water, and Energy',
    },
  })

  console.log('✓ Created admin user')

  // Create Categories
  const renewableEnergy = await prisma.category.upsert({
    where: { slug: 'renewable-energy' },
    update: {},
    create: {
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      description: 'Solar panels, wind turbines, and clean energy solutions for homes and businesses',
      icon: 'zap',
    },
  })

  const waterSystems = await prisma.category.upsert({
    where: { slug: 'water-systems' },
    update: {},
    create: {
      name: 'Water Systems',
      slug: 'water-systems',
      description: 'Filtration, conservation, and rainwater harvesting solutions',
      icon: 'droplet',
    },
  })

  const sustainableMaterials = await prisma.category.upsert({
    where: { slug: 'sustainable-materials' },
    update: {},
    create: {
      name: 'Sustainable Materials',
      slug: 'sustainable-materials',
      description: 'Eco-friendly building and crafting materials',
      icon: 'recycle',
    },
  })

  const organicProducts = await prisma.category.upsert({
    where: { slug: 'organic-products' },
    update: {},
    create: {
      name: 'Organic Products',
      slug: 'organic-products',
      description: 'Natural, chemical-free everyday items',
      icon: 'leaf',
    },
  })

  console.log('✓ Created categories')

  // Create Vendors
  const goalZero = await prisma.vendor.upsert({
    where: { slug: 'goal-zero' },
    update: {},
    create: {
      name: 'Goal Zero',
      slug: 'goal-zero',
      description: 'Portable power solutions and solar panels for off-grid living',
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

  console.log('✓ Created vendors')

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

  console.log('✓ Created tags')

  // Create Real Products
  const product1 = await prisma.product.upsert({
    where: { slug: 'goal-zero-yeti-1500x' },
    update: {},
    create: {
      name: 'Goal Zero Yeti 1500X Portable Power Station',
      slug: 'goal-zero-yeti-1500x',
      description: 'High-capacity portable power station with 1516Wh lithium battery. Perfect for off-grid living, emergency backup, or outdoor adventures. Can power refrigerators, power tools, and medical devices.',
      specifications: {
        capacity: '1516Wh (1.5kWh)',
        weight: '45.64 lbs (20.7 kg)',
        dimensions: '15.3 x 10.1 x 10.5 inches',
        outputs: '2x AC outlets, 4x USB-A, 2x USB-C, 12V car port',
        chargingTime: '25 hours (wall), 18-36 hours (solar)',
        lifespan: '500 cycles to 80% capacity',
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

  await prisma.sustainabilityMetric.upsert({
    where: { productId: product1.id },
    update: {},
    create: {
      productId: product1.id,
      carbonFootprint: 45.2,
      carbonSavings: 2500.0,
      recycledContent: 15,
      recyclable: true,
      biodegradable: false,
      renewableEnergy: true,
      lifespanYears: 10,
      repairability: 6,
      sustainabilityScore: 82,
      materialsBreakdown: {
        lithium: '35%',
        aluminum: '25%',
        plastic: '20%',
        copper: '15%',
        other: '5%',
      },
    },
  })

  // Create ProductTags (skip if already exist)
  await prisma.productTag.createMany({
    data: [
      { productId: product1.id, tagId: solarTag.id },
      { productId: product1.id, tagId: offGridTag.id },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Created Goal Zero Yeti 1500X')

  const product2 = await prisma.product.upsert({
    where: { slug: 'berkey-big-water-filter' },
    update: {},
    create: {
      name: 'Big Berkey Water Filtration System',
      slug: 'berkey-big-water-filter',
      description: 'Gravity-fed water purification system that removes 99.999% of viruses and 99.9999% of bacteria. No electricity required. Perfect for home use, camping, or emergency preparedness.',
      specifications: {
        capacity: '2.25 gallons',
        flowRate: '3.5 gallons per hour',
        filterLife: '6000 gallons (per pair of filters)',
        dimensions: '8.5" diameter x 19.25" height',
        materials: 'High-grade stainless steel',
        filters: '2x Black Berkey purification elements',
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

  await prisma.sustainabilityMetric.upsert({
    where: { productId: product2.id },
    update: {},
    create: {
      productId: product2.id,
      carbonFootprint: 8.5,
      carbonSavings: 450.0,
      waterSavings: 50000.0,
      recycledContent: 40,
      recyclable: true,
      biodegradable: false,
      renewableEnergy: false,
      lifespanYears: 20,
      repairability: 9,
      sustainabilityScore: 91,
      materialsBreakdown: {
        'stainless-steel': '70%',
        'ceramic': '20%',
        'rubber': '5%',
        'other': '5%',
      },
    },
  })

  // Create ProductTags (skip if already exist)
  await prisma.productTag.createMany({
    data: [
      { productId: product2.id, tagId: waterTag.id },
      { productId: product2.id, tagId: offGridTag.id },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Created Big Berkey Water Filter')

  // Create Article Categories
  const energyCategory = await prisma.articleCategory.upsert({
    where: { slug: 'energy-systems' },
    update: {},
    create: {
      name: 'Energy Systems',
      slug: 'energy-systems',
      description: 'Learn about renewable energy and sustainable power solutions',
      icon: 'zap',
    },
  })

  console.log('✓ Created article categories')

  // Create Sample Article
  const article1 = await prisma.article.create({
    data: {
      title: 'Solar Power for Beginners: A Complete Guide',
      slug: 'solar-power-beginners-guide',
      excerpt: 'Everything you need to know to start your solar journey, from understanding panels to calculating your energy needs.',
      content: `
# Solar Power for Beginners: A Complete Guide

Switching to solar power is one of the most impactful decisions you can make for both the environment and your wallet. This comprehensive guide will walk you through everything you need to know to get started.

## Understanding Solar Energy

Solar panels convert sunlight into electricity through photovoltaic (PV) cells. When photons from sunlight hit these cells, they knock electrons free, creating an electrical current. It's clean, renewable, and increasingly affordable.

## Types of Solar Systems

### 1. Grid-Tied Systems
Connected to the utility grid. Excess energy goes back to the grid, and you draw from it when needed.

### 2. Off-Grid Systems
Completely independent from the utility grid. Requires battery storage for nighttime use.

### 3. Hybrid Systems
Combines both grid connection and battery backup for maximum flexibility.

## Calculating Your Energy Needs

1. Check your electricity bills for average monthly usage (in kWh)
2. Divide by 30 to get daily usage
3. Account for peak sun hours in your location
4. Add 25% buffer for efficiency losses

## Getting Started

Start small with portable solar panels or a basic kit. Learn the system, understand your usage patterns, and scale up from there.

The sun is the most abundant energy source we have. Let's use it wisely.
      `,
      coverImage: null,
      readTime: 8,
      status: 'PUBLISHED',
      featured: true,
      publishedAt: new Date(),
      categoryId: energyCategory.id,
      authorId: adminUser.id,
      seoTitle: 'Solar Power for Beginners: Complete 2025 Guide',
      seoDescription: 'Learn everything about solar power from basics to installation. Perfect guide for beginners looking to switch to renewable energy.',
    },
  })

  // Create ArticleTags (skip if already exist)
  await prisma.articleTag.createMany({
    data: [
      { articleId: article1.id, tagId: solarTag.id },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Created sample article')

  // Create Badges
  const earlyAdopterBadge = await prisma.badge.upsert({
    where: { slug: 'early-adopter' },
    update: {},
    create: {
      name: 'Early Adopter',
      slug: 'early-adopter',
      description: 'Joined the community in its early days',
      icon: '🌱',
      criteria: { type: 'manual' },
    },
  })

  const helpfulBadge = await prisma.badge.upsert({
    where: { slug: 'helpful-contributor' },
    update: {},
    create: {
      name: 'Helpful Contributor',
      slug: 'helpful-contributor',
      description: 'Provided valuable insights and help to the community',
      icon: '🤝',
      criteria: { replies: 10 },
    },
  })

  console.log('✓ Created badges')

  // Award badge to admin user
  await prisma.userBadge.create({
    data: {
      userId: adminUser.id,
      badgeId: earlyAdopterBadge.id,
    },
  })

  // Create Forum Categories
  const sustainabilityTips = await prisma.forumCategory.upsert({
    where: { slug: 'sustainability-tips' },
    update: {},
    create: {
      name: 'Sustainability Tips',
      slug: 'sustainability-tips',
      description: 'Share and discover practical tips for sustainable living',
      icon: '💡',
    },
  })

  const productDiscussions = await prisma.forumCategory.upsert({
    where: { slug: 'product-discussions' },
    update: {},
    create: {
      name: 'Product Discussions',
      slug: 'product-discussions',
      description: 'Reviews, questions, and discussions about eco-friendly products',
      icon: '🛒',
    },
  })

  const communityProjects = await prisma.forumCategory.upsert({
    where: { slug: 'community-projects' },
    update: {},
    create: {
      name: 'Community Projects',
      slug: 'community-projects',
      description: 'Collaborate on local sustainability initiatives',
      icon: '🌍',
    },
  })

  console.log('✓ Created forum categories')

  // Create Forum Posts
  const post1 = await prisma.forumPost.create({
    data: {
      title: 'How to Start Your Solar Journey: My Experience',
      slug: 'how-to-start-your-solar-journey-my-experience',
      content: `After 6 months of research and planning, I finally installed solar panels on my home. Here's what I learned:\n\n1. Start with an energy audit - understand your current usage\n2. Get multiple quotes - prices vary significantly\n3. Check local incentives - many states offer tax credits\n4. Consider battery storage - great for energy independence\n\nHappy to answer any questions!`,
      categoryId: sustainabilityTips.id,
      userId: adminUser.id,
      pinned: true,
    },
  })

  const post2 = await prisma.forumPost.create({
    data: {
      title: 'Big Berkey Water Filter - 3 Month Review',
      slug: 'big-berkey-water-filter-3-month-review',
      content: `I've been using the Big Berkey for 3 months now and wanted to share my honest review.\n\n**Pros:**\n- Water tastes amazing\n- No electricity needed\n- Removes 99.9% of contaminants\n- Saves money on bottled water\n\n**Cons:**\n- Takes up counter space\n- Initial cost is high\n- Filters need replacing annually\n\nOverall: Absolutely worth it! Already recommended to 5 friends.`,
      categoryId: productDiscussions.id,
      userId: adminUser.id,
    },
  })

  const post3 = await prisma.forumPost.create({
    data: {
      title: 'Looking for Collaborators: Community Garden Project',
      slug: 'looking-for-collaborators-community-garden-project',
      content: `Hi everyone! I'm organizing a community garden in downtown Seattle and looking for volunteers.\n\n**What we need:**\n- People to help with planting/maintenance\n- Donors for seeds and tools\n- Someone with carpentry skills for raised beds\n\nInterested? Drop a comment below or DM me!`,
      categoryId: communityProjects.id,
      userId: adminUser.id,
    },
  })

  console.log('✓ Created forum posts')

  // Create Forum Replies
  await prisma.forumReply.create({
    data: {
      postId: post1.id,
      userId: adminUser.id,
      content: 'Great post! How much did your system cost in total?',
    },
  })

  await prisma.forumReply.create({
    data: {
      postId: post2.id,
      userId: adminUser.id,
      content: 'I\'ve been considering getting one. How often do you need to refill it?',
    },
  })

  console.log('✓ Created forum replies')

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Seattle Community Solar Initiative',
      slug: 'seattle-community-solar',
      description: 'Bringing affordable solar power to low-income neighborhoods through community-owned installations.',
      status: 'ACTIVE',
      goal: 'Install 50 community solar panels by end of year',
      creatorId: adminUser.id,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Zero-Waste Restaurant Network',
      slug: 'zero-waste-restaurant-network',
      description: 'Connecting local restaurants committed to zero-waste practices and helping new establishments transition.',
      status: 'ACTIVE',
      goal: 'Partner with 20 restaurants by Q2 2025',
      creatorId: adminUser.id,
    },
  })

  console.log('✓ Created projects')

  // Add project members
  await prisma.projectMember.create({
    data: {
      projectId: project1.id,
      userId: adminUser.id,
      role: 'OWNER',
    },
  })

  await prisma.projectMember.create({
    data: {
      projectId: project2.id,
      userId: adminUser.id,
      role: 'OWNER',
    },
  })

  console.log('✓ Created project memberships')

  console.log('\n✅ Seeding complete!')
  console.log(`   - ${await prisma.category.count()} product categories`)
  console.log(`   - ${await prisma.vendor.count()} vendors`)
  console.log(`   - ${await prisma.product.count()} products`)
  console.log(`   - ${await prisma.article.count()} articles`)
  console.log(`   - ${await prisma.tag.count()} tags`)
  console.log(`   - ${await prisma.forumCategory.count()} forum categories`)
  console.log(`   - ${await prisma.forumPost.count()} forum posts`)
  console.log(`   - ${await prisma.project.count()} projects`)
  console.log(`   - ${await prisma.badge.count()} badges`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
