import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting product seeding...')

  // Create real sustainable vendors
  const earthHero = await prisma.vendor.upsert({
    where: { slug: 'earthhero' },
    update: {},
    create: {
      name: 'EarthHero',
      slug: 'earthhero',
      description: 'Certified sustainable products marketplace. Every purchase helps create a more sustainable planet. 1% For The Planet member.',
      website: 'https://earthhero.com'
    }
  })

  const reformation = await prisma.vendor.upsert({
    where: { slug: 'reformation' },
    update: {},
    create: {
      name: 'Reformation',
      slug: 'reformation',
      description: 'Climate Neutral Certified sustainable fashion brand using organic cotton, TENCEL™, and deadstock fabrics',
      website: 'https://www.thereformation.com'
    }
  })

  const stasher = await prisma.vendor.upsert({
    where: { slug: 'stasher' },
    update: {},
    create: {
      name: 'Stasher',
      slug: 'stasher',
      description: 'Reusable storage solutions made from pure platinum silicone. Plastic-free, non-toxic, and endlessly reusable',
      website: 'https://www.stasherbag.com'
    }
  })

  const pelaCase = await prisma.vendor.upsert({
    where: { slug: 'pela-case' },
    update: {},
    create: {
      name: 'Pela Case',
      slug: 'pela-case',
      description: 'Compostable phone cases and accessories. 30% fewer carbon emissions and 34% less water than conventional cases',
      website: 'https://pelacase.com'
    }
  })

  const blueland = await prisma.vendor.upsert({
    where: { slug: 'blueland' },
    update: {},
    create: {
      name: 'Blueland',
      slug: 'blueland',
      description: 'Innovative cleaning products that eliminate single-use plastic. EPA Safer Choice certified tablets',
      website: 'https://www.blueland.com'
    }
  })

  const quince = await prisma.vendor.upsert({
    where: { slug: 'quince' },
    update: {},
    create: {
      name: 'Quince',
      slug: 'quince',
      description: 'Affordable sustainable fashion with OEKO-TEX certified, virgin plastic-free materials',
      website: 'https://www.onequince.com'
    }
  })

  console.log('✅ Vendors created')

  // Create categories
  const energy = await prisma.category.upsert({
    where: { slug: 'energy' },
    update: {},
    create: {
      name: 'Energy',
      slug: 'energy',
      description: 'Solar panels, renewable energy systems, and energy-efficient solutions',
      icon: '⚡'
    }
  })

  const homeKitchen = await prisma.category.upsert({
    where: { slug: 'home-kitchen' },
    update: {},
    create: {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      description: 'Sustainable home essentials and eco-friendly kitchen products',
      icon: '🏠'
    }
  })

  const fashion = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Organic clothing, sustainable apparel, and ethical fashion',
      icon: '👕'
    }
  })

  const garden = await prisma.category.upsert({
    where: { slug: 'garden' },
    update: {},
    create: {
      name: 'Garden & Outdoors',
      slug: 'garden',
      description: 'Composting, gardening tools, and outdoor sustainability products',
      icon: '🌱'
    }
  })

  const water = await prisma.category.upsert({
    where: { slug: 'water' },
    update: {},
    create: {
      name: 'Water Solutions',
      slug: 'water',
      description: 'Water filters, reusable bottles, and water conservation products',
      icon: '💧'
    }
  })

  const cleaning = await prisma.category.upsert({
    where: { slug: 'cleaning' },
    update: {},
    create: {
      name: 'Cleaning',
      slug: 'cleaning',
      description: 'Biodegradable cleaners and eco-friendly cleaning supplies',
      icon: '🧼'
    }
  })

  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics & Accessories',
      slug: 'electronics',
      description: 'Sustainable tech accessories and eco-friendly electronics',
      icon: '📱'
    }
  })

  console.log('✅ Categories created')

  // ENERGY PRODUCTS
  const products = []

  products.push(await prisma.product.upsert({
    where: { slug: 'goal-zero-nomad-100-solar-panel' },
    update: {},
    create: {
      name: 'Goal Zero Nomad 100 Solar Panel',
      slug: 'goal-zero-nomad-100-solar-panel',
      description: 'High-efficiency monocrystalline solar panel perfect for camping, RVs, and off-grid applications. Foldable design with kickstand for easy setup. Weather-resistant and durable construction.',
      price: 299.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: energy.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/goal-zero-nomad-100-solar-panel/',
      publishedAt: new Date(),
      specifications: {
        power: '100W',
        efficiency: '22-25%',
        weight: '9.5 lbs',
        dimensions: '42 x 26.5 x 2.5 inches',
        warranty: '12 months'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'biolite-solarpanel-10-plus' },
    update: {},
    create: {
      name: 'BioLite SolarPanel 10+',
      slug: 'biolite-solarpanel-10-plus',
      description: 'Portable solar panel with integrated sundial and 3000mAh battery. Optimal sun system positions panel at the perfect angle. USB ports for charging devices on the go.',
      price: 129.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: energy.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/travel/biolite-solarpanel-10-plus/',
      publishedAt: new Date(),
      specifications: {
        power: '10W',
        battery: '3000mAh integrated',
        outputs: '2x USB',
        features: 'Sundial alignment, kickstand',
        weight: '1.2 lbs'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'solar-garden-lights-set' },
    update: {},
    create: {
      name: 'LED Solar Garden Pathway Lights (6-Pack)',
      slug: 'solar-garden-lights-set',
      description: 'Beautiful LED pathway lights powered entirely by the sun. No wiring required. Automatic dusk-to-dawn operation. Weather-resistant construction provides warm, ambient lighting for gardens and walkways.',
      price: 49.99,
      status: 'PUBLISHED',
      categoryId: energy.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/solar-pathway-lights/',
      publishedAt: new Date(),
      specifications: {
        quantity: '6 lights',
        lumens: '10 lumens per light',
        runtime: '8 hours on full charge',
        solarPanel: 'Monocrystalline',
        material: 'Stainless steel, plastic'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'renogy-100w-solar-kit' },
    update: {},
    create: {
      name: 'Renogy 100W Solar Starter Kit',
      slug: 'renogy-100w-solar-kit',
      description: 'Complete solar starter kit perfect for RVs, trailers, boats, and cabins. Includes 100W monocrystalline panel, 30A charge controller, mounting brackets, and cables. Easy installation.',
      price: 189.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: energy.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/renogy-solar-starter-kit/',
      publishedAt: new Date(),
      specifications: {
        totalPower: '100W',
        controller: '30A PWM charge controller',
        includes: 'Mounting Z-brackets, MC4 cables, manual',
        efficiency: '21%',
        warranty: '25 year power output'
      }
    }
  }))

  // HOME & KITCHEN PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'stasher-silicone-bag-set' },
    update: {},
    create: {
      name: 'Stasher Reusable Silicone Storage Bags (4-Pack)',
      slug: 'stasher-silicone-bag-set',
      description: 'Endlessly reusable bags made from 100% pure platinum food-grade silicone. Plastic-free, non-toxic, and dishwasher safe. Perfect for food storage, meal prep, sous vide cooking, and travel.',
      price: 54.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: homeKitchen.id,
      vendorId: stasher.id,
      purchaseLink: 'https://www.stasherbag.com/collections/bundles',
      publishedAt: new Date(),
      specifications: {
        material: '100% pure platinum silicone',
        sizes: '2 Snack (9.9oz), 1 Sandwich (15oz), 1 Half-Gallon (64oz)',
        features: 'Dishwasher safe, microwave safe, freezer safe',
        temperature: '-40°F to 425°F',
        warranty: 'Limited lifetime'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'klean-kanteen-food-box-set' },
    update: {},
    create: {
      name: 'Klean Kanteen Food Box Set (3-Pack)',
      slug: 'klean-kanteen-food-box-set',
      description: 'Durable stainless steel food containers with leak-proof lids. Plastic-free solution for meal prep and leftovers. Dishwasher safe and won\'t retain odors. Built to last a lifetime.',
      price: 49.99,
      status: 'PUBLISHED',
      categoryId: homeKitchen.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/kitchen-dining/klean-kanteen-food-box-set/',
      publishedAt: new Date(),
      specifications: {
        material: '18/8 stainless steel',
        sizes: '8oz, 16oz, 32oz',
        features: 'Leak-proof, stackable, dishwasher safe',
        lids: 'Polypropylene #5',
        warranty: 'Strong as steel guarantee'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'bee-wraps-organic-food-wraps' },
    update: {},
    create: {
      name: "Bee's Wrap Organic Reusable Food Wraps (Variety Pack)",
      slug: 'bee-wraps-organic-food-wraps',
      description: 'Sustainable alternative to plastic wrap made from organic cotton, beeswax, jojoba oil, and tree resin. Washable, reusable for up to a year. Naturally antibacterial. Covers bowls, wraps produce, and stores snacks.',
      price: 24.99,
      status: 'PUBLISHED',
      categoryId: homeKitchen.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/kitchen-dining/bees-wrap-variety-pack/',
      publishedAt: new Date(),
      specifications: {
        material: 'Organic cotton, beeswax, jojoba oil, tree resin',
        sizes: '2 Small (7x8"), 2 Medium (10x11"), 2 Large (13x14")',
        care: 'Hand wash in cool water',
        lifespan: '1 year with regular use',
        certification: 'GOTS certified organic cotton'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'eparé-glass-meal-prep-containers' },
    update: {},
    create: {
      name: 'Eparé Glass Meal Prep Containers (5-Pack)',
      slug: 'eparé-glass-meal-prep-containers',
      description: 'Airtight borosilicate glass containers perfect for meal prep. BPA-free locking lids. Oven, microwave, freezer, and dishwasher safe. Won\'t stain or absorb odors. Plastic-free food storage.',
      price: 39.99,
      status: 'PUBLISHED',
      categoryId: homeKitchen.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/kitchen-dining/glass-meal-prep-containers/',
      publishedAt: new Date(),
      specifications: {
        material: 'Borosilicate glass',
        capacity: '32oz per container',
        features: 'Airtight, leak-proof, stackable',
        temperature: 'Oven safe to 520°F (without lid)',
        lids: 'BPA-free plastic with silicone seal'
      }
    }
  }))

  // FASHION PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'reformation-organic-cotton-tee' },
    update: {},
    create: {
      name: 'Reformation Organic Cotton Relaxed Tee',
      slug: 'reformation-organic-cotton-tee',
      description: 'Classic relaxed-fit t-shirt made from 100% organic cotton. Climate Neutral Certified. Soft, breathable, and sustainable. Perfect everyday essential that\'s kind to the planet.',
      price: 48.00,
      status: 'PUBLISHED',
      featured: true,
      categoryId: fashion.id,
      vendorId: reformation.id,
      purchaseLink: 'https://www.thereformation.com/categories/tops',
      publishedAt: new Date(),
      specifications: {
        material: '100% organic cotton',
        fit: 'Relaxed',
        care: 'Machine wash cold',
        certification: 'GOTS certified organic, Climate Neutral',
        madeIn: 'Responsibly manufactured'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'quince-mongolian-cashmere-sweater' },
    update: {},
    create: {
      name: 'Quince Mongolian Cashmere Crewneck Sweater',
      slug: 'quince-mongolian-cashmere-sweater',
      description: 'Luxurious 100% Mongolian cashmere sweater at an accessible price. OEKO-TEX certified. Grade-A cashmere is incredibly soft and warm. Timeless design built to last.',
      price: 49.90,
      status: 'PUBLISHED',
      featured: true,
      categoryId: fashion.id,
      vendorId: quince.id,
      purchaseLink: 'https://www.onequince.com/women/cashmere-sweaters',
      publishedAt: new Date(),
      specifications: {
        material: '100% Grade-A Mongolian cashmere',
        ply: '2-ply',
        care: 'Dry clean or hand wash',
        certification: 'OEKO-TEX Standard 100',
        sustainabilityFeatures: 'Traceable supply chain, no virgin plastic packaging'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'reformation-linen-jumpsuit' },
    update: {},
    create: {
      name: 'Reformation Linen Utility Jumpsuit',
      slug: 'reformation-linen-jumpsuit',
      description: 'Versatile jumpsuit crafted from sustainable linen. Breathable, durable, and gets softer with each wash. Climate Neutral Certified. Perfect for warm weather and effortless style.',
      price: 178.00,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: reformation.id,
      purchaseLink: 'https://www.thereformation.com/categories/jumpsuits-rompers',
      publishedAt: new Date(),
      specifications: {
        material: '100% linen',
        features: 'Button front, utility pockets, adjustable waist',
        care: 'Machine wash cold',
        sustainability: 'Linen uses less water than cotton',
        certification: 'Climate Neutral Certified'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'quince-organic-cotton-tee-3pack' },
    update: {},
    create: {
      name: 'Quince Organic Cotton Crew Neck T-Shirts (3-Pack)',
      slug: 'quince-organic-cotton-tee-3pack',
      description: 'Essential organic cotton t-shirts at an unbeatable price. OEKO-TEX certified. Soft, breathable, and durable. Perfect layering piece or standalone basic. No virgin plastic packaging.',
      price: 29.90,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: quince.id,
      purchaseLink: 'https://www.onequince.com/men/t-shirts',
      publishedAt: new Date(),
      specifications: {
        material: '100% organic cotton',
        weight: 'Medium weight jersey',
        fit: 'Classic fit',
        certification: 'OEKO-TEX Standard 100',
        packaging: 'Virgin plastic-free'
      }
    }
  }))

  // GARDEN & OUTDOORS
  products.push(await prisma.product.upsert({
    where: { slug: 'full-circle-countertop-compost-bin' },
    update: {},
    create: {
      name: 'Full Circle Fresh Air Compost Collector',
      slug: 'full-circle-countertop-compost-bin',
      description: 'Sleek countertop compost bin with dual charcoal filter system to eliminate odors. Easy-carry handle and smooth interior prevents buildup. Perfect for collecting food scraps for composting.',
      price: 29.99,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/full-circle-compost-collector/',
      publishedAt: new Date(),
      specifications: {
        capacity: '1.5 gallons',
        filters: 'Dual charcoal filters included',
        material: 'BPA-free plastic',
        features: 'Odor-free, easy to clean, carry handle',
        dimensions: '9 x 7.5 x 6.5 inches'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'gardeners-supply-rain-barrel' },
    update: {},
    create: {
      name: 'Rain Barrel Water Collection System (50 Gallon)',
      slug: 'gardeners-supply-rain-barrel',
      description: 'Collect rainwater for your garden and reduce water bills. Includes spigot, overflow valve, and screen to keep debris out. Made from recycled materials. Easy to install and maintain.',
      price: 89.99,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/yard-garden/rain-barrel-50-gallon/',
      publishedAt: new Date(),
      specifications: {
        capacity: '50 gallons',
        material: 'Recycled polyethylene',
        features: 'Brass spigot, overflow valve, mesh screen',
        dimensions: '23 x 23 x 34 inches',
        savings: 'Save up to 1,300 gallons of water during peak summer'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'bamboo-garden-tool-set' },
    update: {},
    create: {
      name: 'Bamboo Garden Tool Set (5-Piece)',
      slug: 'bamboo-garden-tool-set',
      description: 'Ergonomic garden tools with sustainable bamboo handles and durable stainless steel heads. Includes trowel, transplanter, cultivator, weeder, and pruning shears. Built to last and gentle on hands.',
      price: 44.99,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/yard-garden/bamboo-garden-tools/',
      publishedAt: new Date(),
      specifications: {
        handles: 'FSC certified bamboo',
        heads: 'Stainless steel',
        includes: 'Trowel, transplanter, cultivator, weeder, pruning shears',
        features: 'Ergonomic grip, rust-resistant',
        storage: 'Includes canvas carrying case'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'electric-kitchen-composter' },
    update: {},
    create: {
      name: 'Lomi Electric Kitchen Composter',
      slug: 'electric-kitchen-composter',
      description: 'Turn food waste into nutrient-rich compost in just 4 hours. Eliminates odors and pests. Quiet operation. Reduces waste by up to 80%. Perfect for apartments and homes without outdoor space.',
      price: 499.00,
      status: 'PUBLISHED',
      featured: true,
      categoryId: garden.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/lomi-electric-composter/',
      publishedAt: new Date(),
      specifications: {
        capacity: '3 liters',
        cycleTime: '4-16 hours depending on mode',
        features: 'Odor-free, quiet, multiple modes',
        power: '500W',
        warranty: '1 year'
      }
    }
  }))

  // WATER SOLUTIONS
  products.push(await prisma.product.upsert({
    where: { slug: 'klean-kanteen-insulated-bottle' },
    update: {},
    create: {
      name: 'Klean Kanteen Insulated Water Bottle (32oz)',
      slug: 'klean-kanteen-insulated-bottle',
      description: 'Double-wall vacuum insulated stainless steel bottle keeps drinks cold for 145 hours or hot for 47 hours. BPA-free, chip-resistant. Climate Lock double-wall vacuum insulation.',
      price: 44.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: water.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/travel/klean-kanteen-insulated-32oz/',
      publishedAt: new Date(),
      specifications: {
        material: '18/8 food-grade stainless steel',
        capacity: '32 fl oz (946ml)',
        insulation: 'Climate Lock double-wall vacuum',
        coldRetention: '145 hours',
        hotRetention: '47 hours'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'berkey-gravity-water-filter' },
    update: {},
    create: {
      name: 'Big Berkey Gravity Water Filter System',
      slug: 'berkey-gravity-water-filter',
      description: 'Powerful gravity-fed water purification for home use. Removes 99.9% of contaminants including bacteria, viruses, heavy metals, and chemicals. No electricity required. Filters 6,000 gallons.',
      price: 349.00,
      status: 'PUBLISHED',
      featured: true,
      categoryId: water.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/berkey-water-filter-system/',
      publishedAt: new Date(),
      specifications: {
        capacity: '2.25 gallons',
        filterLife: '6,000 gallons (2 filters)',
        removes: '99.9% bacteria, viruses, heavy metals, pharmaceuticals',
        flowRate: '7 gallons per hour',
        power: 'Gravity-fed, no electricity needed'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'high-sierra-low-flow-shower-head' },
    update: {},
    create: {
      name: 'High Sierra Low-Flow Shower Head',
      slug: 'high-sierra-low-flow-shower-head',
      description: 'Save water without sacrificing pressure. Uses only 1.5 GPM while delivering a powerful spray. Can save a family of four up to 20,000 gallons per year. Easy installation, universal fit.',
      price: 39.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/high-sierra-showerhead/',
      publishedAt: new Date(),
      specifications: {
        flowRate: '1.5 GPM',
        savings: 'Up to 70% less water than standard',
        features: 'Self-cleaning nozzles, all-metal construction',
        finish: 'Chrome',
        warranty: '10 years'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'hydaway-collapsible-bottle' },
    update: {},
    create: {
      name: 'Hydaway Collapsible Water Bottle (20oz)',
      slug: 'hydaway-collapsible-bottle',
      description: 'Ultra-portable collapsible bottle that fits in your pocket when empty. BPA-free silicone. Expands to 20oz, collapses to 1.5 inches. Perfect for travel, hiking, and everyday carry.',
      price: 29.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/travel/hydaway-collapsible-bottle/',
      publishedAt: new Date(),
      specifications: {
        material: 'Food-grade silicone',
        capacity: '20 fl oz expanded',
        collapsed: '1.5 inches tall',
        features: 'Leak-proof, dishwasher safe',
        weight: '5.3 oz'
      }
    }
  }))

  // CLEANING PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'blueland-cleaning-starter-set' },
    update: {},
    create: {
      name: 'Blueland Clean Essentials Kit',
      slug: 'blueland-cleaning-starter-set',
      description: 'Complete cleaning system that eliminates single-use plastic. Includes 3 reusable bottles and tablets for multi-surface cleaner, glass cleaner, and bathroom cleaner. EPA Safer Choice certified.',
      price: 39.00,
      status: 'PUBLISHED',
      featured: true,
      categoryId: cleaning.id,
      vendorId: blueland.id,
      purchaseLink: 'https://www.blueland.com/products/the-clean-essentials-kit',
      publishedAt: new Date(),
      specifications: {
        includes: '3 Forever Bottles, 3 tablet sets',
        formulas: 'Multi-Surface, Glass + Mirror, Bathroom',
        certification: 'EPA Safer Choice, Cradle to Cradle',
        refills: 'One tablet makes 24oz of cleaner',
        plasticSaved: 'Eliminates 3+ plastic bottles'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'marley-reusable-paper-towels' },
    update: {},
    create: {
      name: "Marley's Monsters Reusable Paper Towels (20-Pack)",
      slug: 'marley-reusable-paper-towels',
      description: 'Replace 60 rolls of paper towels with these washable, reusable cloths. Made from 100% cotton flannel. Snaps together for easy storage. Machine washable and dryable. Soft, absorbent, and durable.',
      price: 44.00,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/marleys-monsters-reusable-paper-towels/',
      publishedAt: new Date(),
      specifications: {
        material: '100% cotton flannel',
        quantity: '20 towels',
        size: '12 x 10 inches each',
        replaces: '60 rolls of paper towels',
        care: 'Machine wash and dry'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'ecover-dish-soap-refill' },
    update: {},
    create: {
      name: 'Ecover Zero Dish Soap Concentrate (64oz)',
      slug: 'ecover-dish-soap-refill',
      description: 'Plant-based dish soap that\'s tough on grease but gentle on hands. Free from fragrances and dyes. Biodegradable formula. Concentrated refill reduces plastic waste. Perfect for sensitive skin.',
      price: 18.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/ecover-zero-dish-soap/',
      publishedAt: new Date(),
      specifications: {
        volume: '64 fl oz (half gallon)',
        formula: 'Plant-based, biodegradable',
        features: 'Fragrance-free, dye-free, hypoallergenic',
        concentrated: 'Makes multiple bottles',
        certifications: 'EPA Safer Choice, Leaping Bunny (cruelty-free)'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'full-circle-compostable-sponges' },
    update: {},
    create: {
      name: 'Full Circle Refresh Compostable Sponges (6-Pack)',
      slug: 'full-circle-compostable-sponges',
      description: 'Fully compostable kitchen sponges made from plant-based materials. Durable scrubbing power without plastic. Walnut shell scouring pad and cellulose sponge. Compost when worn out.',
      price: 16.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/home/full-circle-compostable-sponges/',
      publishedAt: new Date(),
      specifications: {
        material: 'Plant-based cellulose, walnut shells',
        quantity: '6 sponges',
        biodegradable: '100% compostable',
        scrubbing: 'Non-scratch walnut shell scourer',
        lifespan: '4-6 weeks per sponge'
      }
    }
  }))

  // ELECTRONICS & ACCESSORIES
  products.push(await prisma.product.upsert({
    where: { slug: 'pela-iphone-case' },
    update: {},
    create: {
      name: 'Pela 100% Compostable iPhone Case',
      slug: 'pela-iphone-case',
      description: 'World\'s first 100% compostable phone case. Made from flax shive and biopolymer that creates 30% fewer emissions. Protective, slim design. Will break down in home or industrial compost in 3-6 months.',
      price: 49.00,
      status: 'PUBLISHED',
      featured: true,
      categoryId: electronics.id,
      vendorId: pelaCase.id,
      purchaseLink: 'https://pelacase.com/products/iphone-case/',
      publishedAt: new Date(),
      specifications: {
        material: 'Flax shive + plant-based biopolymer',
        protection: '6ft drop protection',
        features: 'Slim, precise fit, compostable',
        emissions: '30% fewer vs conventional cases',
        waterUsage: '34% less water vs conventional cases'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'pela-airpods-case' },
    update: {},
    create: {
      name: 'Pela Compostable AirPods Case',
      slug: 'pela-airpods-case',
      description: 'Protective AirPods case that\'s 100% compostable. Made from sustainable materials with zero waste philosophy. Durable protection with eco-friendly impact. Compatible with wireless charging.',
      price: 39.00,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: pelaCase.id,
      purchaseLink: 'https://pelacase.com/products/airpods-case/',
      publishedAt: new Date(),
      specifications: {
        material: '100% compostable biopolymer',
        compatibility: 'AirPods, AirPods Pro',
        features: 'Wireless charging compatible, carabiner loop',
        protection: 'Shock-absorbing, scratch-resistant',
        endOfLife: 'Compostable in 3-6 months'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'nimble-eco-charging-cables' },
    update: {},
    create: {
      name: 'Nimble Eco-Friendly Charging Cable Set',
      slug: 'nimble-eco-charging-cables',
      description: 'Certified plastic-neutral and carbon-neutral charging cables made from recycled materials. Durable braided design. Compatible with iPhone, iPad, and iPod. Includes cable and wall charger.',
      price: 34.99,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/travel/nimble-charging-cable/',
      publishedAt: new Date(),
      specifications: {
        material: '72.5% certified recycled plastic',
        length: '6 feet',
        certifications: 'Plastic Neutral, Carbon Neutral',
        compatibility: 'Lightning connector',
        warranty: 'Limited lifetime'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'house-of-marley-earbuds' },
    update: {},
    create: {
      name: 'House of Marley Eco-Friendly Wireless Earbuds',
      slug: 'house-of-marley-earbuds',
      description: 'Premium wireless earbuds crafted from sustainable materials including FSC certified wood, recycled aluminum, and REWIND fabric. Superior sound with eco-conscious design. 20-hour battery life.',
      price: 79.99,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: earthHero.id,
      purchaseLink: 'https://earthhero.com/products/travel/house-of-marley-earbuds/',
      publishedAt: new Date(),
      specifications: {
        materials: 'FSC wood, recycled aluminum, REWIND fabric',
        battery: '20 hours total (5hr + 15hr case)',
        features: 'Bluetooth 5.0, IPX4 water resistance',
        sound: 'Signature Marley sound, 6mm drivers',
        sustainability: 'Plastic-free packaging'
      }
    }
  }))

  console.log(`✅ ${products.length} products created`)
  console.log('🌟 Product seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
