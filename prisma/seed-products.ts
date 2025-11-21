import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting product seeding...')

  // Create vendors
  const ecoTech = await prisma.vendor.upsert({
    where: { slug: 'eco-tech-solutions' },
    update: {},
    create: {
      name: 'EcoTech Solutions',
      slug: 'eco-tech-solutions',
      description: 'Leading provider of solar-powered technology and renewable energy products',
      website: 'https://ecotechsolutions.com'
    }
  })

  const greenHome = await prisma.vendor.upsert({
    where: { slug: 'green-home-essentials' },
    update: {},
    create: {
      name: 'Green Home Essentials',
      slug: 'green-home-essentials',
      description: 'Sustainable home products for eco-conscious living',
      website: 'https://greenhomeessentials.com'
    }
  })

  const sustainableFashion = await prisma.vendor.upsert({
    where: { slug: 'sustainable-threads' },
    update: {},
    create: {
      name: 'Sustainable Threads',
      slug: 'sustainable-threads',
      description: 'Organic and ethical fashion for a better planet',
      website: 'https://sustainablethreads.com'
    }
  })

  const earthCare = await prisma.vendor.upsert({
    where: { slug: 'earth-care-products' },
    update: {},
    create: {
      name: 'Earth Care Products',
      slug: 'earth-care-products',
      description: 'Eco-friendly household and garden products',
      website: 'https://earthcareproducts.com'
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

  console.log('✅ Categories created')

  // ENERGY PRODUCTS
  const products = []

  products.push(await prisma.product.upsert({
    where: { slug: 'portable-solar-panel-100w' },
    update: {},
    create: {
      name: '100W Portable Solar Panel',
      slug: 'portable-solar-panel-100w',
      description: 'High-efficiency monocrystalline solar panel perfect for camping, RVs, and off-grid applications. Foldable design with kickstand for easy setup. Weather-resistant and durable construction. Includes MC4 connectors for easy connection to solar generators and batteries.',
      price: 199.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: energy.id,
      vendorId: ecoTech.id,
      purchaseLink: 'https://ecotechsolutions.com/solar-panel-100w',
      publishedAt: new Date(),
      specifications: {
        power: '100W',
        efficiency: '23%',
        weight: '9.5 lbs',
        dimensions: '26.8 x 20.5 x 0.2 inches (folded)',
        warranty: '25 years'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'solar-power-bank-30000mah' },
    update: {},
    create: {
      name: 'Solar Power Bank 30000mAh',
      slug: 'solar-power-bank-30000mah',
      description: 'Ultra-high capacity portable charger with built-in solar panels. Features fast charging technology, dual USB ports, and wireless charging pad. Perfect for outdoor adventures, emergencies, and daily use. Waterproof and shockproof design with LED flashlight.',
      price: 49.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: energy.id,
      vendorId: ecoTech.id,
      purchaseLink: 'https://ecotechsolutions.com/solar-power-bank',
      publishedAt: new Date(),
      specifications: {
        capacity: '30000mAh',
        solarPanel: '1.5W',
        outputs: '2x USB-A, 1x USB-C, Wireless',
        features: 'Waterproof IP66, LED flashlight',
        chargingTime: '6-8 hours (wall), 40-50 hours (solar)'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'solar-garden-lights-8pack' },
    update: {},
    create: {
      name: 'Solar Garden Pathway Lights (8-Pack)',
      slug: 'solar-garden-lights-8pack',
      description: 'Beautiful LED pathway lights powered entirely by the sun. No wiring required - simply stake into the ground. Automatic dusk-to-dawn operation. Weather-resistant stainless steel and glass construction. Provides warm, ambient lighting for gardens, walkways, and patios.',
      price: 59.99,
      status: 'PUBLISHED',
      categoryId: energy.id,
      vendorId: ecoTech.id,
      purchaseLink: 'https://ecotechsolutions.com/garden-lights',
      publishedAt: new Date(),
      specifications: {
        quantity: '8 lights',
        lumens: '15 lumens per light',
        runtime: '8-10 hours on full charge',
        solarPanel: 'Monocrystalline',
        material: 'Stainless steel, tempered glass'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'home-solar-starter-kit' },
    update: {},
    create: {
      name: 'Home Solar Starter Kit 400W',
      slug: 'home-solar-starter-kit',
      description: 'Complete plug-and-play solar system for beginners. Includes 4x100W solar panels, charge controller, mounting hardware, and all necessary cables. Perfect for powering small appliances, lights, and electronics. Expandable design allows you to add more panels later.',
      price: 699.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: energy.id,
      vendorId: ecoTech.id,
      purchaseLink: 'https://ecotechsolutions.com/starter-kit',
      publishedAt: new Date(),
      specifications: {
        totalPower: '400W',
        panels: '4x100W monocrystalline',
        controller: '40A MPPT charge controller',
        includes: 'Mounting hardware, MC4 cables, manual',
        estimatedOutput: '1.6-2.0 kWh per day'
      }
    }
  }))

  // HOME & KITCHEN PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'stainless-steel-food-containers-set' },
    update: {},
    create: {
      name: 'Stainless Steel Food Container Set (5-Pack)',
      slug: 'stainless-steel-food-containers-set',
      description: 'Durable, plastic-free food storage solution. Premium 304 stainless steel construction is dishwasher safe and won\'t retain odors or stains. Leak-proof silicone lids keep food fresh. Perfect for meal prep, leftovers, and packed lunches. Replaces single-use plastic containers.',
      price: 44.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: homeKitchen.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/food-containers',
      publishedAt: new Date(),
      specifications: {
        material: '304 stainless steel',
        sizes: '3 cups, 4 cups, 6 cups, 8 cups, 10 cups',
        features: 'Leak-proof, stackable, dishwasher safe',
        lids: 'BPA-free silicone',
        warranty: 'Lifetime'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'bamboo-cutlery-travel-set' },
    update: {},
    create: {
      name: 'Bamboo Cutlery Travel Set with Case',
      slug: 'bamboo-cutlery-travel-set',
      description: 'Say goodbye to single-use plastic utensils! This reusable bamboo cutlery set includes knife, fork, spoon, chopsticks, and metal straw with cleaning brush. Comes in a portable cotton carrying case. Perfect for work, travel, camping, and everyday use. 100% biodegradable bamboo.',
      price: 18.99,
      status: 'PUBLISHED',
      categoryId: homeKitchen.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/bamboo-cutlery',
      publishedAt: new Date(),
      specifications: {
        includes: 'Fork, knife, spoon, chopsticks, metal straw, brush',
        material: '100% organic bamboo, stainless steel straw',
        caseSize: '8.5 x 2.5 inches',
        weight: '3.5 oz',
        dishwasher: 'Hand wash recommended'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'beeswax-food-wraps-assorted' },
    update: {},
    create: {
      name: 'Organic Beeswax Food Wraps (Assorted 6-Pack)',
      slug: 'beeswax-food-wraps-assorted',
      description: 'Natural alternative to plastic wrap and aluminum foil. Made from organic cotton, sustainably harvested beeswax, jojoba oil, and tree resin. Moldable, reusable, and compostable. Use for covering bowls, wrapping sandwiches, cheese, vegetables, and more. Lasts up to one year with proper care.',
      price: 24.99,
      status: 'PUBLISHED',
      categoryId: homeKitchen.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/beeswax-wraps',
      publishedAt: new Date(),
      specifications: {
        sizes: '2 small (7x7"), 3 medium (10x10"), 1 large (13x13")',
        materials: 'Organic cotton, beeswax, jojoba oil, tree resin',
        care: 'Hand wash with cold water',
        lifespan: '1 year with proper care',
        endOfLife: '100% compostable'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'silicone-storage-bags-reusable' },
    update: {},
    create: {
      name: 'Reusable Silicone Storage Bags (10-Pack)',
      slug: 'silicone-storage-bags-reusable',
      description: 'Premium food-grade silicone bags replace disposable plastic bags. Leak-proof, freezer-safe, microwave-safe, and dishwasher-safe. Perfect for snacks, sandwiches, fruits, vegetables, and meal prep. Airtight seal keeps food fresh longer. BPA-free, PVC-free, and free of harmful chemicals.',
      price: 34.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: homeKitchen.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/silicone-bags',
      publishedAt: new Date(),
      specifications: {
        quantity: '10 bags (4 small, 4 medium, 2 large)',
        material: '100% food-grade silicone',
        temperature: '-40°F to 425°F',
        features: 'Leak-proof, air-tight, dishwasher safe',
        certification: 'FDA approved, BPA-free'
      }
    }
  }))

  // FASHION PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'organic-cotton-tshirt-unisex' },
    update: {},
    create: {
      name: 'Organic Cotton T-Shirt (Unisex)',
      slug: 'organic-cotton-tshirt-unisex',
      description: 'Soft, breathable t-shirt made from 100% GOTS-certified organic cotton. Grown without pesticides, herbicides, or synthetic fertilizers. Fair Trade certified with ethical manufacturing practices. Classic fit suitable for all genders. Available in multiple colors. Durable and gets softer with every wash.',
      price: 28.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: fashion.id,
      vendorId: sustainableFashion.id,
      purchaseLink: 'https://sustainablethreads.com/organic-tshirt',
      publishedAt: new Date(),
      specifications: {
        material: '100% GOTS-certified organic cotton',
        weight: '5.3 oz',
        fit: 'Classic unisex',
        sizes: 'XS-3XL',
        certifications: 'GOTS, Fair Trade',
        care: 'Machine washable'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'bamboo-socks-6pack' },
    update: {},
    create: {
      name: 'Bamboo Fiber Socks (6-Pack)',
      slug: 'bamboo-socks-6pack',
      description: 'Ultra-soft and naturally moisture-wicking socks made from sustainable bamboo fiber. Antibacterial properties keep feet fresh all day. More sustainable than cotton - bamboo grows quickly without pesticides and requires 1/3 the water. Reinforced heel and toe for durability. Perfect for everyday wear.',
      price: 32.99,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: sustainableFashion.id,
      purchaseLink: 'https://sustainablethreads.com/bamboo-socks',
      publishedAt: new Date(),
      specifications: {
        material: '80% bamboo viscose, 15% nylon, 5% spandex',
        features: 'Moisture-wicking, antibacterial, odor-resistant',
        sizes: 'S/M (5-9), L/XL (9-13)',
        care: 'Machine wash cold, tumble dry low',
        sustainability: 'Bamboo grows 3x faster than cotton'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'recycled-polyester-hoodie' },
    update: {},
    create: {
      name: 'Recycled Polyester Fleece Hoodie',
      slug: 'recycled-polyester-hoodie',
      description: 'Cozy hoodie made entirely from recycled plastic bottles. Each hoodie diverts approximately 20 plastic bottles from landfills and oceans. Soft fleece interior, kangaroo pocket, and adjustable drawstring hood. Carbon-neutral shipping. Unisex sizing with a relaxed fit.',
      price: 59.99,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: sustainableFashion.id,
      purchaseLink: 'https://sustainablethreads.com/recycled-hoodie',
      publishedAt: new Date(),
      specifications: {
        material: '100% recycled polyester (from plastic bottles)',
        bottles: '~20 bottles per hoodie',
        features: 'Fleece-lined, kangaroo pocket, hood with drawstring',
        sizes: 'XS-3XL',
        impact: 'Carbon-neutral shipping, saves 0.5 kg CO2'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'hemp-canvas-tote-bag' },
    update: {},
    create: {
      name: 'Heavy-Duty Hemp Canvas Tote Bag',
      slug: 'hemp-canvas-tote-bag',
      description: 'Super strong reusable shopping bag made from 100% organic hemp canvas. Hemp is one of the most sustainable fibers - it requires no pesticides, little water, and actually improves soil health. This tote can hold up to 50 lbs and will last for years. Large main compartment with interior pocket.',
      price: 24.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: fashion.id,
      vendorId: sustainableFashion.id,
      purchaseLink: 'https://sustainablethreads.com/hemp-tote',
      publishedAt: new Date(),
      specifications: {
        material: '100% organic hemp canvas',
        capacity: '50 lbs weight limit',
        dimensions: '16 x 14 x 6 inches',
        features: 'Reinforced handles, interior pocket',
        sustainability: 'Hemp requires 50% less water than cotton'
      }
    }
  }))

  // GARDEN & OUTDOORS PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'kitchen-compost-bin-countertop' },
    update: {},
    create: {
      name: 'Countertop Kitchen Compost Bin with Filter',
      slug: 'kitchen-compost-bin-countertop',
      description: 'Stylish stainless steel compost pail with odor-blocking carbon filters. Perfect size for kitchen countertops. Includes 3 replacement filters. Removable inner bucket makes emptying easy. Reduces food waste and creates nutrient-rich compost for your garden. Tight-fitting lid prevents fruit flies.',
      price: 39.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: garden.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/compost-bin',
      publishedAt: new Date(),
      specifications: {
        capacity: '1.3 gallons',
        material: 'Stainless steel',
        includes: '3 carbon filters (6-month supply)',
        features: 'Odor-blocking, removable bucket, dishwasher safe',
        dimensions: '7.5 x 7.5 x 10.5 inches'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'rain-barrel-50-gallon' },
    update: {},
    create: {
      name: '50-Gallon Rain Barrel with Diverter Kit',
      slug: 'rain-barrel-50-gallon',
      description: 'Collect free rainwater for watering your garden! This durable rain barrel connects to your downspout with included diverter kit. Features brass spigot for easy hose connection, overflow valve, and debris screen. Made from recycled plastic. Save money on water bills while conserving precious resources.',
      price: 89.99,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/rain-barrel',
      publishedAt: new Date(),
      specifications: {
        capacity: '50 gallons',
        material: '100% recycled plastic',
        includes: 'Diverter kit, brass spigot, overflow valve, screen',
        dimensions: '23 x 23 x 34 inches',
        savings: 'Save up to 1,300 gallons of water per season'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'electric-composter-foodcycler' },
    update: {},
    create: {
      name: 'Electric Food Composter',
      slug: 'electric-composter-foodcycler',
      description: 'Transform food scraps into nutrient-rich compost in just 4-8 hours! This electric composter uses heat and agitation to break down food waste with virtually no odor. Reduces food waste volume by up to 90%. Perfect for apartments and homes without outdoor composting space. Quiet operation.',
      price: 299.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: garden.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/electric-composter',
      publishedAt: new Date(),
      specifications: {
        capacity: '2.5 liters',
        cycleTime: '4-8 hours',
        reduction: 'Up to 90% volume reduction',
        features: 'Odorless, quiet, automatic shut-off',
        power: '120V, energy efficient',
        warranty: '2 years'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'garden-tool-set-bamboo' },
    update: {},
    create: {
      name: 'Ergonomic Bamboo Garden Tool Set (6-Piece)',
      slug: 'garden-tool-set-bamboo',
      description: 'Complete gardening kit with sustainable bamboo handles. Includes trowel, transplanter, cultivator, weeder, and pruning shears. Stainless steel heads won\'t rust. Ergonomic design reduces hand and wrist strain. Bamboo is naturally antibacterial and more sustainable than hardwood. Includes canvas storage bag.',
      price: 44.99,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/garden-tools',
      publishedAt: new Date(),
      specifications: {
        includes: 'Trowel, transplanter, cultivator, weeder, pruners, gloves',
        handles: 'Sustainable bamboo',
        heads: 'Rust-resistant stainless steel',
        features: 'Ergonomic grip, hanging holes',
        storage: 'Canvas carrying bag included'
      }
    }
  }))

  // WATER SOLUTIONS PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'stainless-steel-water-bottle-32oz' },
    update: {},
    create: {
      name: 'Insulated Stainless Steel Water Bottle 32oz',
      slug: 'stainless-steel-water-bottle-32oz',
      description: 'Double-wall vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. Made from premium 18/8 stainless steel. BPA-free, leak-proof lid. Wide mouth design for easy cleaning and ice cubes. Replaces hundreds of single-use plastic bottles. Fits most cup holders.',
      price: 29.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: water.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/water-bottle',
      publishedAt: new Date(),
      specifications: {
        capacity: '32 oz (946 ml)',
        material: '18/8 food-grade stainless steel',
        insulation: 'Double-wall vacuum',
        coldFor: '24 hours',
        hotFor: '12 hours',
        features: 'BPA-free, leak-proof, dishwasher safe'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'gravity-water-filter-system' },
    update: {},
    create: {
      name: 'Gravity-Fed Water Filter System (2.25 Gal)',
      slug: 'gravity-water-filter-system',
      description: 'Countertop water filtration system requires no electricity or plumbing. Removes 99.9% of contaminants including bacteria, viruses, chlorine, fluoride, heavy metals, and more. Black ceramic filters last for up to 3,000 gallons. Perfect for home, camping, or emergency preparedness. BPA-free construction.',
      price: 249.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/water-filter',
      publishedAt: new Date(),
      specifications: {
        capacity: '2.25 gallons',
        filtration: '99.9% contaminants removed',
        filterLife: 'Up to 3,000 gallons',
        removes: 'Bacteria, viruses, chlorine, fluoride, heavy metals',
        material: 'BPA-free stainless steel',
        power: 'Gravity-fed, no electricity needed'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'shower-head-water-saver' },
    update: {},
    create: {
      name: 'High-Pressure Water-Saving Shower Head',
      slug: 'shower-head-water-saver',
      description: 'Save water without sacrificing pressure! This innovative shower head reduces water usage by 40% while maintaining strong, comfortable pressure. WaterSense certified. Easy tool-free installation fits any standard shower arm. Three spray settings. Saves average household $200+ per year on water and energy bills.',
      price: 34.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/shower-head',
      publishedAt: new Date(),
      specifications: {
        flowRate: '1.8 GPM (vs standard 2.5 GPM)',
        savings: '40% water reduction',
        spraySettings: '3 modes',
        installation: 'Tool-free, universal fit',
        certification: 'WaterSense certified',
        annualSavings: '$200+ on water/energy bills'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'collapsible-water-bottle-silicone' },
    update: {},
    create: {
      name: 'Collapsible Silicone Water Bottle 20oz',
      slug: 'collapsible-water-bottle-silicone',
      description: 'Ultra-portable bottle collapses to half its size when empty - perfect for travel, hiking, and commuting. Food-grade silicone is BPA-free and safe for hot or cold beverages. Leak-proof cap with carabiner clip. Dishwasher safe. Comes in multiple colors. Takes up minimal space in bags and pockets.',
      price: 19.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: greenHome.id,
      purchaseLink: 'https://greenhomeessentials.com/collapsible-bottle',
      publishedAt: new Date(),
      specifications: {
        capacity: '20 oz (590 ml)',
        material: '100% food-grade silicone',
        collapsed: '2.5 inches tall',
        expanded: '8 inches tall',
        temperature: '-40°F to 450°F',
        features: 'Leak-proof, carabiner clip, dishwasher safe'
      }
    }
  }))

  // CLEANING PRODUCTS
  products.push(await prisma.product.upsert({
    where: { slug: 'biodegradable-cleaning-tablets' },
    update: {},
    create: {
      name: 'Biodegradable Multi-Surface Cleaning Tablets (30-Pack)',
      slug: 'biodegradable-cleaning-tablets',
      description: 'Eco-friendly cleaning tablets dissolve in water to create powerful, non-toxic cleaner. Each tablet makes one 16oz bottle of cleaner - just add water! Eliminates plastic waste from traditional cleaning products. Plant-based, biodegradable formula is safe for kids, pets, and the planet. Fresh lemon scent.',
      price: 24.99,
      status: 'PUBLISHED',
      featured: true,
      categoryId: cleaning.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/cleaning-tablets',
      publishedAt: new Date(),
      specifications: {
        quantity: '30 tablets',
        yield: '30 x 16oz bottles',
        formula: 'Plant-based, biodegradable',
        safe: 'Kids, pets, septic systems',
        scent: 'Natural lemon',
        packaging: 'Compostable wrapper'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'reusable-paper-towels-bamboo' },
    update: {},
    create: {
      name: 'Reusable Bamboo Paper Towels (20-Pack)',
      slug: 'reusable-paper-towels-bamboo',
      description: 'Say goodbye to disposable paper towels! These ultra-absorbent bamboo towels can be washed and reused 100+ times. More absorbent than traditional paper towels. Machine washable and naturally antibacterial. Each set replaces up to 60 rolls of disposable paper towels. Snaps together for convenient storage on standard paper towel holders.',
      price: 29.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/bamboo-towels',
      publishedAt: new Date(),
      specifications: {
        quantity: '20 sheets',
        reuses: '100+ washes per sheet',
        replaces: 'Up to 60 rolls of paper towels',
        material: '100% bamboo rayon',
        size: '11 x 10 inches',
        features: 'Antibacterial, machine washable, snap-together'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'natural-dish-soap-refill' },
    update: {},
    create: {
      name: 'Natural Dish Soap Concentrate (64oz Refill)',
      slug: 'natural-dish-soap-refill',
      description: 'Ultra-concentrated plant-based dish soap cuts through grease naturally. Makes up to 8 bottles of dish soap - just dilute with water. Free from harsh chemicals, synthetic fragrances, and dyes. Biodegradable formula is safe for septic systems. Comes in recyclable aluminum bottle. Gentle on hands, tough on dishes.',
      price: 18.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/dish-soap',
      publishedAt: new Date(),
      specifications: {
        size: '64 oz concentrate',
        yield: 'Makes 8 x 16oz bottles',
        formula: 'Plant-based, biodegradable',
        free: 'Sulfates, parabens, phthalates, synthetic fragrances',
        packaging: 'Recyclable aluminum bottle',
        scent: 'Unscented or lavender'
      }
    }
  }))

  products.push(await prisma.product.upsert({
    where: { slug: 'compostable-sponges-cellulose' },
    update: {},
    create: {
      name: 'Compostable Cellulose Sponges (12-Pack)',
      slug: 'compostable-sponges-cellulose',
      description: 'Eco-friendly alternative to synthetic sponges. Made from 100% plant-based cellulose and natural coconut fibers. Just as effective as traditional sponges but completely biodegradable and compostable. Non-scratching, highly absorbent, and durable. When worn out, simply toss in compost bin instead of landfill.',
      price: 16.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: earthCare.id,
      purchaseLink: 'https://earthcareproducts.com/sponges',
      publishedAt: new Date(),
      specifications: {
        quantity: '12 sponges',
        material: '100% cellulose and coconut fiber',
        size: '4.5 x 3 x 0.5 inches',
        features: 'Non-scratching, highly absorbent',
        lifespan: '4-6 weeks per sponge',
        endOfLife: '100% compostable and biodegradable'
      }
    }
  }))

  console.log(`✅ Created ${products.length} products across 6 categories`)
  console.log('🌱 Product seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
