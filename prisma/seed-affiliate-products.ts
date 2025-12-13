// ============================================
// PROJECT EXODUS AFFILIATE PRODUCTS SEED
// Sustainable companies with affiliate partnerships
// Includes Project Exodus Alignment Ratings
// ============================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================
// PROJECT EXODUS RATING SYSTEM
// Based on the Commandments of Sustainability
// ============================================
// Ratings 0-100 based on:
// - Environmental Impact (carbon, renewables, waste)
// - Social Responsibility (labor, community, equity)
// - Innovation (sustainable tech advancement)
// - Circular Economy (recyclability, longevity, repair)
// - Transparency (certifications, supply chain)
// ============================================

interface AffiliateVendor {
  name: string
  slug: string
  description: string
  website: string
  logo?: string
  affiliateProgram?: string
  exodusRating: number // 0-100
  ratingBreakdown: {
    environmental: number
    social: number
    innovation: number
    circular: number
    transparency: number
  }
}

interface AffiliateProduct {
  name: string
  slug: string
  description: string
  price?: number
  purchaseLink: string
  affiliateLink?: string
  vendorSlug: string
  categorySlug: string
  featured: boolean
  sustainabilityScore: number
  carbonSavings?: number
  tags: string[]
}

// ============================================
// AFFILIATE VENDORS - Categorized
// ============================================

const affiliateVendors: AffiliateVendor[] = [
  // ==========================================
  // INDOOR GARDENING & HYDROPONICS
  // ==========================================
  {
    name: 'Gardyn',
    slug: 'gardyn',
    description: 'AI-powered indoor garden systems that grow 30+ varieties of plants year-round. Uses 95% less water than traditional gardening with no soil, pesticides, or GMOs.',
    website: 'https://www.mygardyn.com',
    affiliateProgram: 'https://www.mygardyn.com/pages/affiliate',
    exodusRating: 92,
    ratingBreakdown: { environmental: 95, social: 88, innovation: 98, circular: 85, transparency: 94 }
  },
  {
    name: 'AUK Smart Gardens',
    slug: 'auk-smart-gardens',
    description: 'Premium smart indoor gardens with automated watering, lighting, and nutrient delivery. Designed for urban apartments and small spaces.',
    website: 'https://www.aukofficial.com',
    exodusRating: 88,
    ratingBreakdown: { environmental: 90, social: 85, innovation: 92, circular: 82, transparency: 91 }
  },
  {
    name: 'Click & Grow',
    slug: 'click-and-grow',
    description: 'Smart indoor gardens using NASA-inspired Smart Soil technology. Grow fresh herbs, fruits, and vegetables with zero effort.',
    website: 'https://www.clickandgrow.com',
    affiliateProgram: 'https://www.clickandgrow.com/pages/affiliate',
    exodusRating: 90,
    ratingBreakdown: { environmental: 92, social: 87, innovation: 95, circular: 85, transparency: 91 }
  },
  {
    name: 'AeroGarden',
    slug: 'aerogarden',
    description: 'Pioneering indoor gardening since 2002. Hydroponic systems that grow plants 5x faster than soil with built-in LED grow lights.',
    website: 'https://www.aerogarden.com',
    affiliateProgram: 'https://www.aerogarden.com/affiliate-program',
    exodusRating: 85,
    ratingBreakdown: { environmental: 88, social: 82, innovation: 90, circular: 78, transparency: 87 }
  },
  {
    name: 'Lettuce Grow',
    slug: 'lettuce-grow',
    description: 'Vertical hydroponic Farmstand that grows 200+ varieties of vegetables and herbs. Founded by the creators of sweetgreen.',
    website: 'https://www.lettucegrow.com',
    affiliateProgram: 'https://www.lettucegrow.com/pages/affiliate-program',
    exodusRating: 94,
    ratingBreakdown: { environmental: 96, social: 92, innovation: 95, circular: 90, transparency: 97 }
  },
  {
    name: 'TevePlanter',
    slug: 'tevaplanter',
    description: 'Self-watering planters using innovative wicking technology. Reduces water waste and simplifies plant care for beginners.',
    website: 'https://tevaplanter.com',
    exodusRating: 82,
    ratingBreakdown: { environmental: 85, social: 78, innovation: 82, circular: 80, transparency: 85 }
  },
  {
    name: 'Plantaform',
    slug: 'plantaform',
    description: 'Modular smart plant growing systems designed for homes and commercial spaces. Combines vertical farming with elegant design.',
    website: 'https://www.plantaform.com',
    exodusRating: 86,
    ratingBreakdown: { environmental: 88, social: 84, innovation: 90, circular: 82, transparency: 86 }
  },
  {
    name: 'Indoor Garden Works',
    slug: 'indoor-garden-works',
    description: 'Complete indoor gardening solutions from seed to harvest. Specializing in organic and heirloom varieties.',
    website: 'https://indoorgardenworks.com',
    exodusRating: 80,
    ratingBreakdown: { environmental: 82, social: 78, innovation: 78, circular: 80, transparency: 82 }
  },
  {
    name: 'GoMicro Fresh',
    slug: 'gomicro-fresh',
    description: 'Microgreens growing systems for home and restaurant use. Nutrient-dense greens ready in 7-14 days.',
    website: 'https://gomicrofresh.com',
    exodusRating: 84,
    ratingBreakdown: { environmental: 86, social: 82, innovation: 85, circular: 82, transparency: 85 }
  },
  {
    name: 'Nature Tech Hydroponics',
    slug: 'nature-tech-hydroponics',
    description: 'Professional-grade hydroponic systems for serious growers. NFT, DWC, and vertical systems for maximum yield.',
    website: 'https://naturetechhydroponics.com',
    exodusRating: 83,
    ratingBreakdown: { environmental: 85, social: 80, innovation: 88, circular: 78, transparency: 84 }
  },
  {
    name: 'Instafarm',
    slug: 'instafarm',
    description: 'Container farming solutions bringing year-round agriculture to any location. Climate-controlled growing environments.',
    website: 'https://instafarm.com',
    exodusRating: 89,
    ratingBreakdown: { environmental: 92, social: 86, innovation: 94, circular: 82, transparency: 91 }
  },
  {
    name: 'Farm.One',
    slug: 'farm-one',
    description: 'Vertical farming company specializing in rare herbs, edible flowers, and microgreens for restaurants and consumers.',
    website: 'https://farm.one',
    exodusRating: 91,
    ratingBreakdown: { environmental: 94, social: 88, innovation: 93, circular: 86, transparency: 94 }
  },
  {
    name: 'TrueHarvest Farms',
    slug: 'trueharvest-farms',
    description: 'Sustainable indoor farming with a mission to provide fresh, local produce year-round using renewable energy.',
    website: 'https://trueharvestfarms.com',
    exodusRating: 88,
    ratingBreakdown: { environmental: 91, social: 86, innovation: 88, circular: 84, transparency: 91 }
  },

  // ==========================================
  // OUTDOOR GARDENING & FARMING
  // ==========================================
  {
    name: 'Vego Garden',
    slug: 'vego-garden',
    description: 'Premium metal raised garden beds made from Aluzinc-coated steel. Durable, safe, and designed for decade-long growing.',
    website: 'https://vegogarden.com',
    affiliateProgram: 'https://vegogarden.com/pages/affiliate-program',
    exodusRating: 87,
    ratingBreakdown: { environmental: 88, social: 85, innovation: 82, circular: 92, transparency: 88 }
  },
  {
    name: 'Neversink Farm Tools',
    slug: 'neversink-farm-tools',
    description: 'Professional market garden tools designed by farmers, for farmers. Ergonomic, durable tools for sustainable agriculture.',
    website: 'https://neversinktools.com',
    exodusRating: 93,
    ratingBreakdown: { environmental: 90, social: 95, innovation: 88, circular: 96, transparency: 96 }
  },
  {
    name: 'Leaf Landscape Supply',
    slug: 'leaf-landscape-supply',
    description: 'Organic mulch, compost, and landscaping materials sourced locally. Supporting regenerative land management practices.',
    website: 'https://leaflandscapesupply.com',
    exodusRating: 85,
    ratingBreakdown: { environmental: 90, social: 82, innovation: 75, circular: 92, transparency: 86 }
  },

  // ==========================================
  // COMPOSTING & FOOD WASTE
  // ==========================================
  {
    name: 'Lomi',
    slug: 'lomi',
    description: 'Revolutionary electric composter that turns food waste into nutrient-rich dirt in just 4 hours. Reduces household waste by up to 80%.',
    website: 'https://lfrombyla.com',
    affiliateProgram: 'https://lomi.com/pages/affiliate',
    exodusRating: 95,
    ratingBreakdown: { environmental: 98, social: 90, innovation: 98, circular: 95, transparency: 94 }
  },
  {
    name: 'FoodCycler',
    slug: 'foodcycler',
    description: 'Compact electric food waste recycler that transforms scraps into nutrient-rich fertilizer in hours, not months.',
    website: 'https://foodcycler.com',
    affiliateProgram: 'https://foodcycler.com/pages/affiliate-program',
    exodusRating: 93,
    ratingBreakdown: { environmental: 96, social: 88, innovation: 96, circular: 94, transparency: 91 }
  },
  {
    name: 'Dairy4Good',
    slug: 'dairy4good',
    description: 'Transforming dairy waste into valuable resources. Sustainable dairy alternatives and upcycled dairy ingredients.',
    website: 'https://dairy4good.com',
    exodusRating: 86,
    ratingBreakdown: { environmental: 92, social: 84, innovation: 88, circular: 82, transparency: 84 }
  },

  // ==========================================
  // SOLAR & RENEWABLE ENERGY
  // ==========================================
  {
    name: 'Bluetti',
    slug: 'bluetti',
    description: 'Premium portable power stations and solar generators. Reliable off-grid power for home backup, camping, and emergencies.',
    website: 'https://www.bluettipower.com',
    affiliateProgram: 'https://www.bluettipower.com/pages/affiliate',
    exodusRating: 91,
    ratingBreakdown: { environmental: 94, social: 86, innovation: 95, circular: 88, transparency: 92 }
  },
  {
    name: 'Jackery',
    slug: 'jackery',
    description: 'Industry-leading portable power stations and solar panels. Powering outdoor adventures and emergency preparedness sustainably.',
    website: 'https://www.jackery.com',
    affiliateProgram: 'https://www.jackery.com/pages/affiliate',
    exodusRating: 89,
    ratingBreakdown: { environmental: 92, social: 85, innovation: 92, circular: 85, transparency: 91 }
  },
  {
    name: 'SunGold Power',
    slug: 'sungold-power',
    description: 'Professional solar panels, inverters, and complete off-grid systems. High-efficiency solutions for homes and RVs.',
    website: 'https://www.sungoldpower.com',
    affiliateProgram: 'https://www.sungoldpower.com/pages/affiliate-program',
    exodusRating: 87,
    ratingBreakdown: { environmental: 92, social: 82, innovation: 88, circular: 82, transparency: 91 }
  },
  {
    name: 'Mango Power',
    slug: 'mango-power',
    description: 'Next-generation home energy storage systems. Split-phase power solutions for whole-home backup with smart management.',
    website: 'https://www.mangopower.com',
    affiliateProgram: 'https://www.mangopower.com/pages/affiliate',
    exodusRating: 90,
    ratingBreakdown: { environmental: 94, social: 85, innovation: 95, circular: 85, transparency: 91 }
  },
  {
    name: 'Kora Power',
    slug: 'kora-power',
    description: 'Innovative solar energy solutions combining portable power with sustainable design. Clean energy for modern lifestyles.',
    website: 'https://korapower.com',
    exodusRating: 85,
    ratingBreakdown: { environmental: 90, social: 80, innovation: 88, circular: 80, transparency: 87 }
  },
  {
    name: 'SunHub Solar',
    slug: 'sunhub-solar',
    description: 'Comprehensive solar solutions from residential to commercial scale. Expert installation and long-term support.',
    website: 'https://sunhubsolar.com',
    exodusRating: 88,
    ratingBreakdown: { environmental: 94, social: 84, innovation: 86, circular: 82, transparency: 94 }
  },

  // ==========================================
  // WATER SYSTEMS
  // ==========================================
  {
    name: 'Rorra Water',
    slug: 'rorra-water',
    description: 'Advanced water filtration and rainwater harvesting systems. Clean water solutions for homes and communities.',
    website: 'https://rorrawater.com',
    exodusRating: 89,
    ratingBreakdown: { environmental: 94, social: 86, innovation: 90, circular: 85, transparency: 90 }
  },

  // ==========================================
  // SMART HOME & ENERGY MANAGEMENT
  // ==========================================
  {
    name: 'Elfsys',
    slug: 'elfsys',
    description: 'Smart home energy management systems that optimize consumption and integrate renewable sources seamlessly.',
    website: 'https://elfsys.com',
    exodusRating: 86,
    ratingBreakdown: { environmental: 90, social: 82, innovation: 92, circular: 78, transparency: 88 }
  },

  // ==========================================
  // SUSTAINABLE FASHION & TEXTILES
  // ==========================================
  {
    name: 'PAKA',
    slug: 'paka',
    description: 'Premium alpaca wool apparel that\'s warmer than sheep wool, softer than cashmere, and supports Peruvian farming communities.',
    website: 'https://pakaapparel.com',
    affiliateProgram: 'https://pakaapparel.com/pages/affiliate-program',
    exodusRating: 96,
    ratingBreakdown: { environmental: 95, social: 98, innovation: 92, circular: 96, transparency: 99 }
  },
  {
    name: 'Live Sans',
    slug: 'live-sans',
    description: 'Minimalist sustainable lifestyle products. Thoughtfully designed essentials that reduce consumption and waste.',
    website: 'https://livesans.com',
    exodusRating: 88,
    ratingBreakdown: { environmental: 90, social: 86, innovation: 85, circular: 92, transparency: 87 }
  },
  {
    name: 'Cardiff Cashmere',
    slug: 'cardiff-cashmere',
    description: 'Ethically sourced cashmere yarn from sustainable Mongolian herding communities. Supporting traditional livelihoods.',
    website: 'https://cardiffcashmere.com',
    exodusRating: 91,
    ratingBreakdown: { environmental: 88, social: 96, innovation: 85, circular: 92, transparency: 94 }
  },
  {
    name: 'Nero Fabric',
    slug: 'nero-fabric',
    description: 'Innovative sustainable textiles made from recycled and plant-based materials. Fashion-forward eco-friendly fabrics.',
    website: 'https://nerofabric.com',
    exodusRating: 89,
    ratingBreakdown: { environmental: 94, social: 85, innovation: 92, circular: 88, transparency: 86 }
  },

  // ==========================================
  // SUSTAINABLE HOUSING
  // ==========================================
  {
    name: 'Type Five Homes',
    slug: 'type-five-homes',
    description: 'Sustainable prefab homes designed for energy efficiency and minimal environmental impact. Modern living, lighter footprint.',
    website: 'https://typefivehomes.com',
    exodusRating: 94,
    ratingBreakdown: { environmental: 96, social: 90, innovation: 98, circular: 90, transparency: 96 }
  },

  // ==========================================
  // SUSTAINABLE ELECTRONICS
  // ==========================================
  {
    name: 'RE:TV',
    slug: 'retv',
    description: 'Professionally refurbished televisions with warranty. Extending product lifecycle and reducing e-waste.',
    website: 'https://retv.com',
    exodusRating: 87,
    ratingBreakdown: { environmental: 92, social: 82, innovation: 80, circular: 98, transparency: 83 }
  },

  // ==========================================
  // SPECIALTY
  // ==========================================
  {
    name: 'Mons Master',
    slug: 'mons-master',
    description: 'Premium sustainable outdoor gear and equipment. Adventure-ready products with environmental responsibility.',
    website: 'https://monsmaster.com',
    exodusRating: 82,
    ratingBreakdown: { environmental: 85, social: 78, innovation: 82, circular: 82, transparency: 83 }
  },
]

// ============================================
// AFFILIATE PRODUCTS
// ============================================

const affiliateProducts: AffiliateProduct[] = [
  // ==========================================
  // GARDYN PRODUCTS
  // ==========================================
  {
    name: 'Gardyn Home Kit 3.0',
    slug: 'gardyn-home-kit-3',
    description: 'The ultimate AI-powered indoor garden. Grows 30 plants at once with Hybriponic technology, automated care, and a companion app that manages everything.',
    price: 895,
    purchaseLink: 'https://www.mygardyn.com/products/gardyn-home-kit-3-0',
    affiliateLink: 'https://www.mygardyn.com?ref=projectexodus',
    vendorSlug: 'gardyn',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 95,
    carbonSavings: 180,
    tags: ['indoor-garden', 'hydroponic', 'smart-home', 'zero-pesticides']
  },
  {
    name: 'Gardyn Home Kit 2.0',
    slug: 'gardyn-home-kit-2',
    description: 'Compact AI-powered garden growing up to 15 plants. Perfect for apartments and small spaces with all the smart features.',
    price: 595,
    purchaseLink: 'https://www.mygardyn.com/products/gardyn-home-kit-2-0',
    affiliateLink: 'https://www.mygardyn.com?ref=projectexodus',
    vendorSlug: 'gardyn',
    categorySlug: 'garden-outdoors',
    featured: false,
    sustainabilityScore: 92,
    carbonSavings: 120,
    tags: ['indoor-garden', 'hydroponic', 'compact', 'smart-home']
  },

  // ==========================================
  // LETTUCE GROW PRODUCTS
  // ==========================================
  {
    name: 'Lettuce Grow Farmstand (36-Plant)',
    slug: 'lettuce-grow-farmstand-36',
    description: 'Vertical hydroponic system growing 36 plants in a 2x2 foot footprint. Self-watering, self-fertilizing with companion app.',
    price: 599,
    purchaseLink: 'https://www.lettucegrow.com/the-farmstand',
    affiliateLink: 'https://www.lettucegrow.com?ref=projectexodus',
    vendorSlug: 'lettuce-grow',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 96,
    carbonSavings: 200,
    tags: ['vertical-farming', 'hydroponic', 'outdoor', 'indoor']
  },
  {
    name: 'Lettuce Grow Farmstand (24-Plant)',
    slug: 'lettuce-grow-farmstand-24',
    description: 'Mid-size vertical farm for families. Grows 24 varieties simultaneously with 95% less water than traditional gardening.',
    price: 449,
    purchaseLink: 'https://www.lettucegrow.com/the-farmstand',
    affiliateLink: 'https://www.lettucegrow.com?ref=projectexodus',
    vendorSlug: 'lettuce-grow',
    categorySlug: 'garden-outdoors',
    featured: false,
    sustainabilityScore: 94,
    carbonSavings: 150,
    tags: ['vertical-farming', 'hydroponic', 'family-size']
  },

  // ==========================================
  // CLICK & GROW PRODUCTS
  // ==========================================
  {
    name: 'Click & Grow Smart Garden 9',
    slug: 'click-grow-smart-garden-9',
    description: 'Grow 9 plants simultaneously with NASA-inspired Smart Soil. Perfect herbs, vegetables, and flowers year-round.',
    price: 199,
    purchaseLink: 'https://www.clickandgrow.com/products/the-smart-garden-9',
    affiliateLink: 'https://www.clickandgrow.com?ref=projectexodus',
    vendorSlug: 'click-and-grow',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 90,
    carbonSavings: 80,
    tags: ['indoor-garden', 'smart-soil', 'herbs', 'countertop']
  },
  {
    name: 'Click & Grow Smart Garden 3',
    slug: 'click-grow-smart-garden-3',
    description: 'Compact 3-plant indoor garden perfect for windowsills and small kitchens. Starter kit includes basil pods.',
    price: 99,
    purchaseLink: 'https://www.clickandgrow.com/products/the-smart-garden-3',
    affiliateLink: 'https://www.clickandgrow.com?ref=projectexodus',
    vendorSlug: 'click-and-grow',
    categorySlug: 'garden-outdoors',
    featured: false,
    sustainabilityScore: 88,
    carbonSavings: 40,
    tags: ['indoor-garden', 'smart-soil', 'compact', 'beginner']
  },

  // ==========================================
  // AEROGARDEN PRODUCTS
  // ==========================================
  {
    name: 'AeroGarden Bounty Elite',
    slug: 'aerogarden-bounty-elite',
    description: 'Premium 9-pod hydroponic garden with Wi-Fi connectivity, touchscreen control, and 45W LED grow lights. Grows plants 5x faster.',
    price: 449,
    purchaseLink: 'https://www.aerogarden.com/bounty-elite',
    affiliateLink: 'https://www.aerogarden.com?ref=projectexodus',
    vendorSlug: 'aerogarden',
    categorySlug: 'garden-outdoors',
    featured: false,
    sustainabilityScore: 86,
    carbonSavings: 75,
    tags: ['hydroponic', 'wifi-enabled', 'led-grow-light', 'indoor']
  },
  {
    name: 'AeroGarden Harvest',
    slug: 'aerogarden-harvest',
    description: '6-pod indoor garden with 20W LED lights. Simple touchscreen controls and automatic light timer.',
    price: 149,
    purchaseLink: 'https://www.aerogarden.com/harvest',
    affiliateLink: 'https://www.aerogarden.com?ref=projectexodus',
    vendorSlug: 'aerogarden',
    categorySlug: 'garden-outdoors',
    featured: false,
    sustainabilityScore: 84,
    carbonSavings: 50,
    tags: ['hydroponic', 'led-grow-light', 'beginner', 'compact']
  },

  // ==========================================
  // LOMI COMPOSTER
  // ==========================================
  {
    name: 'Lomi Classic',
    slug: 'lomi-classic',
    description: 'Revolutionary electric composter that transforms food waste into nutrient-rich dirt in hours. Reduces waste by 80%, eliminates odors.',
    price: 499,
    purchaseLink: 'https://lfrombyla.com/products/lomi',
    affiliateLink: 'https://lomi.com?ref=projectexodus',
    vendorSlug: 'lomi',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 98,
    carbonSavings: 350,
    tags: ['composter', 'food-waste', 'electric', 'zero-waste']
  },
  {
    name: 'Lomi Bloom',
    slug: 'lomi-bloom',
    description: 'Next-generation Lomi with larger capacity and faster cycles. Smart sensors optimize composting for any food type.',
    price: 599,
    purchaseLink: 'https://lfrombyla.com/products/lomi-bloom',
    affiliateLink: 'https://lomi.com?ref=projectexodus',
    vendorSlug: 'lomi',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 98,
    carbonSavings: 420,
    tags: ['composter', 'food-waste', 'electric', 'smart-home']
  },

  // ==========================================
  // FOODCYCLER
  // ==========================================
  {
    name: 'FoodCycler FC-50',
    slug: 'foodcycler-fc50',
    description: 'Compact electric food recycler that turns scraps into fertilizer in 4-8 hours. Odorless operation with carbon filter.',
    price: 399,
    purchaseLink: 'https://foodcycler.com/products/foodcycler-fc-50',
    affiliateLink: 'https://foodcycler.com?ref=projectexodus',
    vendorSlug: 'foodcycler',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 95,
    carbonSavings: 280,
    tags: ['composter', 'food-waste', 'electric', 'compact']
  },

  // ==========================================
  // BLUETTI POWER STATIONS
  // ==========================================
  {
    name: 'BLUETTI AC200MAX',
    slug: 'bluetti-ac200max',
    description: 'Expandable power station with 2048Wh capacity and 2200W output. LiFePO4 battery with 3500+ cycle life.',
    price: 1899,
    purchaseLink: 'https://www.bluettipower.com/products/ac200max',
    affiliateLink: 'https://www.bluettipower.com?ref=projectexodus',
    vendorSlug: 'bluetti',
    categorySlug: 'energy',
    featured: true,
    sustainabilityScore: 92,
    carbonSavings: 500,
    tags: ['power-station', 'solar-generator', 'lifepo4', 'expandable']
  },
  {
    name: 'BLUETTI AC500 + B300S',
    slug: 'bluetti-ac500-b300s',
    description: 'Professional-grade power system with 5000W output. Expandable to 18,432Wh for whole-home backup.',
    price: 4299,
    purchaseLink: 'https://www.bluettipower.com/products/ac500-b300s',
    affiliateLink: 'https://www.bluettipower.com?ref=projectexodus',
    vendorSlug: 'bluetti',
    categorySlug: 'energy',
    featured: true,
    sustainabilityScore: 94,
    carbonSavings: 1200,
    tags: ['power-station', 'whole-home', 'professional', 'expandable']
  },
  {
    name: 'BLUETTI EB3A',
    slug: 'bluetti-eb3a',
    description: 'Portable 268Wh power station perfect for camping and small devices. Fast charging via solar or wall outlet.',
    price: 249,
    purchaseLink: 'https://www.bluettipower.com/products/eb3a',
    affiliateLink: 'https://www.bluettipower.com?ref=projectexodus',
    vendorSlug: 'bluetti',
    categorySlug: 'energy',
    featured: false,
    sustainabilityScore: 88,
    carbonSavings: 100,
    tags: ['power-station', 'portable', 'camping', 'budget']
  },

  // ==========================================
  // JACKERY PRODUCTS
  // ==========================================
  {
    name: 'Jackery Explorer 2000 Plus',
    slug: 'jackery-explorer-2000-plus',
    description: 'Expandable power station with 2042Wh capacity. LiFePO4 battery with 4000 cycles and 3000W output.',
    price: 2499,
    purchaseLink: 'https://www.jackery.com/products/explorer-2000-plus-portable-power-station',
    affiliateLink: 'https://www.jackery.com?ref=projectexodus',
    vendorSlug: 'jackery',
    categorySlug: 'energy',
    featured: true,
    sustainabilityScore: 91,
    carbonSavings: 480,
    tags: ['power-station', 'lifepo4', 'expandable', 'emergency']
  },
  {
    name: 'Jackery Solar Generator 1000 Plus',
    slug: 'jackery-solar-generator-1000-plus',
    description: 'Complete solar generator kit with 1264Wh station and 100W solar panels. Perfect for off-grid living.',
    price: 1499,
    purchaseLink: 'https://www.jackery.com/products/solar-generator-1000-plus',
    affiliateLink: 'https://www.jackery.com?ref=projectexodus',
    vendorSlug: 'jackery',
    categorySlug: 'energy',
    featured: false,
    sustainabilityScore: 90,
    carbonSavings: 350,
    tags: ['solar-generator', 'off-grid', 'bundle', 'outdoor']
  },

  // ==========================================
  // MANGO POWER
  // ==========================================
  {
    name: 'Mango Power E',
    slug: 'mango-power-e',
    description: 'Revolutionary split-phase home battery with 3.5kWh capacity. Smart energy management with app control.',
    price: 2999,
    purchaseLink: 'https://www.mangopower.com/products/mango-power-e',
    affiliateLink: 'https://www.mangopower.com?ref=projectexodus',
    vendorSlug: 'mango-power',
    categorySlug: 'energy',
    featured: true,
    sustainabilityScore: 93,
    carbonSavings: 600,
    tags: ['home-battery', 'split-phase', 'smart-home', 'backup']
  },

  // ==========================================
  // SUNGOLD POWER
  // ==========================================
  {
    name: 'SunGold 400W Monocrystalline Panel',
    slug: 'sungold-400w-mono-panel',
    description: 'High-efficiency 400W solar panel with 22% efficiency. PERC technology for superior performance in low light.',
    price: 329,
    purchaseLink: 'https://www.sungoldpower.com/products/400w-monocrystalline-solar-panel',
    affiliateLink: 'https://www.sungoldpower.com?ref=projectexodus',
    vendorSlug: 'sungold-power',
    categorySlug: 'energy',
    featured: false,
    sustainabilityScore: 90,
    carbonSavings: 400,
    tags: ['solar-panel', 'monocrystalline', 'high-efficiency', 'residential']
  },
  {
    name: 'SunGold 6000W Hybrid Inverter',
    slug: 'sungold-6000w-hybrid-inverter',
    description: 'All-in-one hybrid inverter for off-grid and grid-tie systems. MPPT charge controller built-in.',
    price: 1299,
    purchaseLink: 'https://www.sungoldpower.com/products/6000w-hybrid-inverter',
    affiliateLink: 'https://www.sungoldpower.com?ref=projectexodus',
    vendorSlug: 'sungold-power',
    categorySlug: 'energy',
    featured: false,
    sustainabilityScore: 88,
    carbonSavings: 300,
    tags: ['inverter', 'hybrid', 'off-grid', 'mppt']
  },

  // ==========================================
  // VEGO GARDEN
  // ==========================================
  {
    name: 'Vego Garden Raised Bed (17" Tall)',
    slug: 'vego-garden-raised-bed-17',
    description: 'Premium Aluzinc-coated steel raised bed lasting 20+ years. Modular design, no sharp edges, food-safe coating.',
    price: 159,
    purchaseLink: 'https://vegogarden.com/products/17-raised-garden-bed',
    affiliateLink: 'https://vegogarden.com?ref=projectexodus',
    vendorSlug: 'vego-garden',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 89,
    carbonSavings: 50,
    tags: ['raised-bed', 'metal', 'durable', 'modular']
  },
  {
    name: 'Vego Garden 9-in-1 Kit',
    slug: 'vego-garden-9-in-1-kit',
    description: 'Complete raised bed kit with bed, trellis, cover, and all accessories. Everything needed to start growing.',
    price: 389,
    purchaseLink: 'https://vegogarden.com/products/9-in-1-modular-raised-garden-bed-kit',
    affiliateLink: 'https://vegogarden.com?ref=projectexodus',
    vendorSlug: 'vego-garden',
    categorySlug: 'garden-outdoors',
    featured: false,
    sustainabilityScore: 88,
    carbonSavings: 75,
    tags: ['raised-bed', 'complete-kit', 'trellis', 'beginner']
  },

  // ==========================================
  // PAKA APPAREL
  // ==========================================
  {
    name: 'PAKA Everyday Hoodie',
    slug: 'paka-everyday-hoodie',
    description: 'Ultra-soft alpaca wool hoodie. Warmer than wool, softer than cashmere, supporting Peruvian herding communities.',
    price: 198,
    purchaseLink: 'https://pakaapparel.com/products/everyday-hoodie',
    affiliateLink: 'https://pakaapparel.com?ref=projectexodus',
    vendorSlug: 'paka',
    categorySlug: 'fashion',
    featured: true,
    sustainabilityScore: 97,
    carbonSavings: 25,
    tags: ['alpaca', 'hoodie', 'ethical', 'fair-trade']
  },
  {
    name: 'PAKA Ultralight Down Jacket',
    slug: 'paka-ultralight-down-jacket',
    description: 'Lightweight warmth with responsibly-sourced alpaca fill. Packable design for travel and outdoor adventures.',
    price: 298,
    purchaseLink: 'https://pakaapparel.com/products/ultralight-down-jacket',
    affiliateLink: 'https://pakaapparel.com?ref=projectexodus',
    vendorSlug: 'paka',
    categorySlug: 'fashion',
    featured: true,
    sustainabilityScore: 96,
    carbonSavings: 30,
    tags: ['alpaca', 'jacket', 'packable', 'outdoor']
  },

  // ==========================================
  // TYPE FIVE HOMES
  // ==========================================
  {
    name: 'Type Five Starter Home',
    slug: 'type-five-starter-home',
    description: 'Net-zero prefab home with passive solar design. 500 sq ft of sustainable living starting point.',
    price: 85000,
    purchaseLink: 'https://typefivehomes.com/starter',
    affiliateLink: 'https://typefivehomes.com?ref=projectexodus',
    vendorSlug: 'type-five-homes',
    categorySlug: 'home-kitchen',
    featured: true,
    sustainabilityScore: 98,
    carbonSavings: 15000,
    tags: ['prefab', 'net-zero', 'passive-solar', 'sustainable-housing']
  },

  // ==========================================
  // RE:TV
  // ==========================================
  {
    name: 'RE:TV 55" 4K Smart TV (Refurbished)',
    slug: 'retv-55-4k-refurbished',
    description: 'Professionally refurbished 55" 4K Smart TV with full warranty. Reduces e-waste while saving money.',
    price: 299,
    purchaseLink: 'https://retv.com/products/55-4k-smart-tv',
    affiliateLink: 'https://retv.com?ref=projectexodus',
    vendorSlug: 'retv',
    categorySlug: 'electronics-accessories',
    featured: false,
    sustainabilityScore: 92,
    carbonSavings: 200,
    tags: ['refurbished', 'tv', 'e-waste', 'circular']
  },

  // ==========================================
  // RORRA WATER
  // ==========================================
  {
    name: 'Rorra Whole-House Filtration System',
    slug: 'rorra-whole-house-filtration',
    description: 'Complete water filtration for your entire home. Removes 99% of contaminants while maintaining beneficial minerals.',
    price: 1299,
    purchaseLink: 'https://rorrawater.com/products/whole-house-system',
    affiliateLink: 'https://rorrawater.com?ref=projectexodus',
    vendorSlug: 'rorra-water',
    categorySlug: 'water-solutions',
    featured: true,
    sustainabilityScore: 91,
    carbonSavings: 400,
    tags: ['water-filtration', 'whole-house', 'clean-water', 'health']
  },
  {
    name: 'Rorra Rainwater Harvesting Kit',
    slug: 'rorra-rainwater-harvesting-kit',
    description: 'Complete rainwater collection system for garden irrigation. 275-gallon tank with filtration and pump.',
    price: 899,
    purchaseLink: 'https://rorrawater.com/products/rainwater-kit',
    affiliateLink: 'https://rorrawater.com?ref=projectexodus',
    vendorSlug: 'rorra-water',
    categorySlug: 'water-solutions',
    featured: false,
    sustainabilityScore: 94,
    carbonSavings: 250,
    tags: ['rainwater', 'harvesting', 'irrigation', 'conservation']
  },

  // ==========================================
  // NEVERSINK FARM TOOLS
  // ==========================================
  {
    name: 'Neversink Broadfork',
    slug: 'neversink-broadfork',
    description: 'Hand-forged broadfork for no-till soil aeration. Ergonomic design reduces back strain. Built to last generations.',
    price: 289,
    purchaseLink: 'https://neversinktools.com/products/broadfork',
    affiliateLink: 'https://neversinktools.com?ref=projectexodus',
    vendorSlug: 'neversink-farm-tools',
    categorySlug: 'garden-outdoors',
    featured: true,
    sustainabilityScore: 96,
    carbonSavings: 20,
    tags: ['broadfork', 'no-till', 'hand-tool', 'regenerative']
  },
  {
    name: 'Neversink Tilther',
    slug: 'neversink-tilther',
    description: 'Shallow cultivation tool for bed preparation. Gentle on soil biology while creating perfect seedbeds.',
    price: 549,
    purchaseLink: 'https://neversinktools.com/products/tilther',
    affiliateLink: 'https://neversinktools.com?ref=projectexodus',
    vendorSlug: 'neversink-farm-tools',
    categorySlug: 'garden-outdoors',
    featured: false,
    sustainabilityScore: 94,
    carbonSavings: 30,
    tags: ['tilther', 'cultivation', 'market-garden', 'professional']
  },

  // ==========================================
  // CARDIFF CASHMERE
  // ==========================================
  {
    name: 'Cardiff Single Cashmere Yarn (50g)',
    slug: 'cardiff-single-cashmere-50g',
    description: 'Ethically-sourced Mongolian cashmere yarn. Hand-combed from free-roaming goats, supporting nomadic communities.',
    price: 45,
    purchaseLink: 'https://cardiffcashmere.com/products/single-50g',
    affiliateLink: 'https://cardiffcashmere.com?ref=projectexodus',
    vendorSlug: 'cardiff-cashmere',
    categorySlug: 'fashion',
    featured: false,
    sustainabilityScore: 93,
    carbonSavings: 5,
    tags: ['cashmere', 'yarn', 'ethical', 'handcraft']
  },
]

// ============================================
// SEED FUNCTION
// ============================================

export async function seedAffiliateProducts() {
  console.log('🌱 Seeding affiliate vendors and products...')

  // Create categories if they don't exist
  const categoryData = [
    { name: 'Energy', slug: 'energy', icon: '⚡', description: 'Solar panels, batteries, and renewable energy solutions' },
    { name: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠', description: 'Sustainable home essentials and kitchen products' },
    { name: 'Fashion', slug: 'fashion', icon: '👕', description: 'Ethical clothing and sustainable textiles' },
    { name: 'Garden & Outdoors', slug: 'garden-outdoors', icon: '🌱', description: 'Gardening, composting, and outdoor living' },
    { name: 'Water Solutions', slug: 'water-solutions', icon: '💧', description: 'Water filtration and conservation' },
    { name: 'Cleaning', slug: 'cleaning', icon: '🧼', description: 'Eco-friendly cleaning products' },
    { name: 'Electronics & Accessories', slug: 'electronics-accessories', icon: '📱', description: 'Sustainable tech and gadgets' },
  ]

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: cat,
    })
  }
  console.log(`  ✓ Created ${categoryData.length} categories`)

  // Create vendors
  let vendorCount = 0
  for (const vendor of affiliateVendors) {
    await prisma.vendor.upsert({
      where: { slug: vendor.slug },
      create: {
        name: vendor.name,
        slug: vendor.slug,
        description: vendor.description,
        website: vendor.website,
        logo: vendor.logo,
      },
      update: {
        name: vendor.name,
        description: vendor.description,
        website: vendor.website,
      },
    })
    vendorCount++
  }
  console.log(`  ✓ Created ${vendorCount} affiliate vendors`)

  // Create products
  let productCount = 0
  for (const product of affiliateProducts) {
    const vendor = await prisma.vendor.findUnique({ where: { slug: product.vendorSlug } })
    const category = await prisma.category.findUnique({ where: { slug: product.categorySlug } })

    if (!vendor || !category) {
      console.warn(`  ⚠ Skipping ${product.name}: vendor or category not found`)
      continue
    }

    const existingProduct = await prisma.product.findUnique({ where: { slug: product.slug } })

    if (existingProduct) {
      // Update existing
      await prisma.product.update({
        where: { slug: product.slug },
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          purchaseLink: product.purchaseLink,
          featured: product.featured,
          vendorId: vendor.id,
          categoryId: category.id,
        },
      })
    } else {
      // Create new
      const newProduct = await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          purchaseLink: product.affiliateLink || product.purchaseLink,
          featured: product.featured,
          status: 'PUBLISHED',
          vendorId: vendor.id,
          categoryId: category.id,
        },
      })

      // Create sustainability metrics
      await prisma.sustainabilityMetric.create({
        data: {
          productId: newProduct.id,
          sustainabilityScore: product.sustainabilityScore,
          carbonSavings: product.carbonSavings,
        },
      })
    }
    productCount++
  }
  console.log(`  ✓ Created ${productCount} affiliate products`)

  console.log('✅ Affiliate products seeded successfully!')
}

// Export vendor data for reference
export { affiliateVendors, affiliateProducts }

export default seedAffiliateProducts
