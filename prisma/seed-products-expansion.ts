import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting MASSIVE product expansion...')

  // Get existing categories
  const energy = await prisma.category.findUnique({ where: { slug: 'energy' } })
  const homeKitchen = await prisma.category.findUnique({ where: { slug: 'home-kitchen' } })
  const fashion = await prisma.category.findUnique({ where: { slug: 'fashion' } })
  const garden = await prisma.category.findUnique({ where: { slug: 'garden' } })
  const water = await prisma.category.findUnique({ where: { slug: 'water' } })
  const cleaning = await prisma.category.findUnique({ where: { slug: 'cleaning' } })
  const electronics = await prisma.category.findUnique({ where: { slug: 'electronics' } })

  if (!energy || !homeKitchen || !fashion || !garden || !water || !cleaning || !electronics) {
    throw new Error('Categories not found. Run main seed first.')
  }

  // ===== NEW VENDORS =====
  const goalZero = await prisma.vendor.upsert({
    where: { slug: 'goal-zero' },
    update: {},
    create: {
      name: 'Goal Zero',
      slug: 'goal-zero',
      description: 'Portable solar power solutions and battery systems for off-grid living. B Corporation certified.',
      website: 'https://www.goalzero.com'
    }
  })

  const renogy = await prisma.vendor.upsert({
    where: { slug: 'renogy' },
    update: {},
    create: {
      name: 'Renogy',
      slug: 'renogy',
      description: 'Complete solar power systems and renewable energy products. 15+ years experience, 2M+ customers',
      website: 'https://www.renogy.com'
    }
  })

  const ecoflo = await prisma.vendor.upsert({
    where: { slug: 'ecoflow' },
    update: {},
    create: {
      name: 'EcoFlow',
      slug: 'ecoflow',
      description: 'Portable power stations with fast charging and renewable energy integration',
      website: 'https://www.ecoflow.com'
    }
  })

  const patagonia = await prisma.vendor.upsert({
    where: { slug: 'patagonia' },
    update: {},
    create: {
      name: 'Patagonia',
      slug: 'patagonia',
      description: '1% For The Planet founding member. Fair Trade Certified™. Climate Neutral Certified. Using 100% renewable energy.',
      website: 'https://www.patagonia.com'
    }
  })

  const allbirds = await prisma.vendor.upsert({
    where: { slug: 'allbirds' },
    update: {},
    create: {
      name: 'Allbirds',
      slug: 'allbirds',
      description: 'Carbon neutral shoes made from merino wool, eucalyptus, and sugarcane. Public Benefit Corporation.',
      website: 'https://www.allbirds.com'
    }
  })

  const prana = await prisma.vendor.upsert({
    where: { slug: 'prana' },
    update: {},
    create: {
      name: 'prAna',
      slug: 'prana',
      description: 'Fair Trade Certified™ organic cotton and recycled materials. Climate Neutral Certified.',
      website: 'https://www.prana.com'
    }
  })

  const ecosia = await prisma.vendor.upsert({
    where: { slug: 'tentree' },
    update: {},
    create: {
      name: 'tentree',
      slug: 'tentree',
      description: 'Plants 10 trees for every item purchased. Over 86 million trees planted. B Corporation certified.',
      website: 'https://www.tentree.com'
    }
  })

  const drBronner = await prisma.vendor.upsert({
    where: { slug: 'dr-bronner' },
    update: {},
    create: {
      name: 'Dr. Bronner\'s',
      slug: 'dr-bronner',
      description: 'USDA Organic, Fair Trade certified soaps and body care. Family-owned since 1948.',
      website: 'https://www.drbronner.com'
    }
  })

  const berkey = await prisma.vendor.upsert({
    where: { slug: 'berkey' },
    update: {},
    create: {
      name: 'Berkey',
      slug: 'berkey',
      description: 'Gravity-fed water filtration systems. Removes 99.9% contaminants without electricity.',
      website: 'https://www.berkeyfilters.com'
    }
  })

  const hydroflask = await prisma.vendor.upsert({
    where: { slug: 'hydro-flask' },
    update: {},
    create: {
      name: 'Hydro Flask',
      slug: 'hydro-flask',
      description: 'Insulated stainless steel bottles. Parks For All™ partnership. Climate Neutral Certified.',
      website: 'https://www.hydroflask.com'
    }
  })

  const fullCircle = await prisma.vendor.upsert({
    where: { slug: 'full-circle' },
    update: {},
    create: {
      name: 'Full Circle',
      slug: 'full-circle',
      description: 'Home essentials from plant-based and recycled materials. Zero waste mission.',
      website: 'https://www.fullcirclehome.com'
    }
  })

  const subpod = await prisma.vendor.upsert({
    where: { slug: 'subpod' },
    update: {},
    create: {
      name: 'Subpod',
      slug: 'subpod',
      description: 'In-garden composting system. Odor-free, pest-proof, Australian designed.',
      website: 'https://www.subpod.com'
    }
  })

  const joraCompost = await prisma.vendor.upsert({
    where: { slug: 'jora-composter' },
    update: {},
    create: {
      name: 'JORA Composter',
      slug: 'jora-composter',
      description: 'Insulated tumbling composters from Sweden. Year-round composting even in freezing temps.',
      website: 'https://www.joraform.com'
    }
  })

  const fairphone = await prisma.vendor.upsert({
    where: { slug: 'fairphone' },
    update: {},
    create: {
      name: 'Fairphone',
      slug: 'fairphone',
      description: 'Modular, repairable smartphones. Fair sourced materials. B Corporation certified.',
      website: 'https://www.fairphone.com'
    }
  })

  console.log('✅ New vendors created')

  // ===== RENEWABLE ENERGY PRODUCTS =====
  const energyProducts = []

  energyProducts.push(await prisma.product.upsert({
    where: { slug: 'renogy-400w-solar-panel-kit' },
    update: {},
    create: {
      name: 'Renogy 400W 12V Solar Panel Kit',
      slug: 'renogy-400w-solar-panel-kit',
      description: 'Complete off-grid solar system with 4x100W monocrystalline panels, 40A MPPT charge controller, adapters, and mounting brackets. Perfect for RVs, cabins, boats. 25-year performance guarantee.',
      price: 599.99,
      status: 'PUBLISHED',
      categoryId: energy.id,
      vendorId: renogy.id,
      purchaseLink: 'https://www.renogy.com/400-watt-12-volt-solar-premium-kit/',
      publishedAt: new Date(),
      specifications: {
        power: '400W (4x100W panels)',
        efficiency: '21% monocrystalline',
        controller: '40A MPPT (97% efficiency)',
        warranty: '25 years performance, 5 years materials',
        use: 'Off-grid, RV, marine, cabin',
        output: '1,600-2,000 Wh/day average'
      }
    }
  }))

  energyProducts.push(await prisma.product.upsert({
    where: { slug: 'ecoflow-delta-pro' },
    update: {},
    create: {
      name: 'EcoFlow DELTA Pro Portable Power Station',
      slug: 'ecoflow-delta-pro',
      description: 'Professional-grade 3,600Wh expandable battery. Powers entire home during outages. Solar input up to 1,600W. Fast charge to 80% in 50 minutes. Expandable to 25kWh with extra batteries.',
      price: 3699.00,
      status: 'PUBLISHED',
      categoryId: energy.id,
      vendorId: ecoflo.id,
      purchaseLink: 'https://www.ecoflow.com/products/delta-pro-portable-power-station',
      publishedAt: new Date(),
      specifications: {
        capacity: '3,600Wh (expandable to 25kWh)',
        output: '3,600W (7,200W surge)',
        solar: 'Up to 1,600W solar input',
        charging: '0-80% in 50 min AC, 0-80% in 2.8hr solar',
        ports: '5 AC, 4 USB-A, 2 USB-C, 2 DC, 1 car port',
        lifespan: '3,500 cycles to 80% (10 years daily use)'
      }
    }
  }))

  energyProducts.push(await prisma.product.upsert({
    where: { slug: 'goal-zero-yeti-1500x' },
    update: {},
    create: {
      name: 'Goal Zero Yeti 1500X Portable Power Station',
      slug: 'goal-zero-yeti-1500x',
      description: 'Lithium power station for backup power and off-grid living. 1,516Wh capacity powers fridges, power tools, medical devices. Chainable with up to 3 units. WiFi app monitoring.',
      price: 1999.95,
      status: 'PUBLISHED',
      categoryId: energy.id,
      vendorId: goalZero.id,
      purchaseLink: 'https://www.goalzero.com/products/goal-zero-yeti-1500x-portable-power-station',
      publishedAt: new Date(),
      specifications: {
        capacity: '1,516Wh lithium',
        output: '2,000W AC (3,500W surge)',
        solar: 'Up to 600W solar input',
        runtime: 'Fridge: 60+ hours, Lights: 120+ hours',
        weight: '45.6 lbs',
        warranty: '2 years'
      }
    }
  }))

  energyProducts.push(await prisma.product.upsert({
    where: { slug: 'renogy-2000w-inverter' },
    update: {},
    create: {
      name: 'Renogy 2000W Pure Sine Wave Inverter',
      slug: 'renogy-2000w-inverter',
      description: 'High-efficiency pure sine wave inverter. Converts 12V DC to 120V AC. Powers sensitive electronics safely. 90%+ efficiency. LCD display, remote control capable.',
      price: 369.99,
      status: 'PUBLISHED',
      categoryId: energy.id,
      vendorId: renogy.id,
      purchaseLink: 'https://www.renogy.com/2000w-12v-pure-sine-wave-inverter/',
      publishedAt: new Date(),
      specifications: {
        power: '2,000W continuous, 4,000W surge',
        waveform: 'Pure sine wave',
        efficiency: '90% peak',
        input: '12V DC',
        output: '120V AC 60Hz',
        protection: 'Overload, short circuit, over temp, low/high voltage'
      }
    }
  }))

  energyProducts.push(await prisma.product.upsert({
    where: { slug: 'goal-zero-nomad-200-solar-panel' },
    update: {},
    create: {
      name: 'Goal Zero Nomad 200 Folding Solar Panel',
      slug: 'goal-zero-nomad-200-solar-panel',
      description: 'Portable 200W solar panel for charging power stations on the go. Built-in kickstand, weather-resistant. Folds to briefcase size. Perfect for overlanding, emergencies.',
      price: 549.95,
      status: 'PUBLISHED',
      categoryId: energy.id,
      vendorId: goalZero.id,
      purchaseLink: 'https://www.goalzero.com/products/nomad-200-solar-panel',
      publishedAt: new Date(),
      specifications: {
        power: '200W',
        efficiency: 'Monocrystalline cells',
        weight: '36.8 lbs',
        folded: '26.4 x 24.8 x 3.5 inches',
        unfolded: '89.4 x 26.4 x 0.2 inches',
        durability: 'Water-resistant, rugged design'
      }
    }
  }))

  // ===== SUSTAINABLE FASHION =====
  const fashionProducts = []

  fashionProducts.push(await prisma.product.upsert({
    where: { slug: 'patagonia-better-sweater' },
    update: {},
    create: {
      name: 'Patagonia Better Sweater® Fleece Jacket',
      slug: 'patagonia-better-sweater',
      description: 'Cozy fleece jacket made from 100% recycled polyester. Fair Trade Certified™ sewn. Sweater-knit exterior, fleece interior. Lifetime guarantee. Climate Neutral Certified.',
      price: 139.00,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: patagonia.id,
      purchaseLink: 'https://www.patagonia.com/product/mens-better-sweater-fleece-jacket/',
      publishedAt: new Date(),
      specifications: {
        materials: '100% recycled polyester fleece',
        certifications: 'Fair Trade Certified, Climate Neutral',
        features: 'Full-zip, two handwarmer pockets',
        care: 'Machine washable',
        warranty: 'Lifetime Ironclad Guarantee',
        impact: 'Saves 14 plastic bottles per jacket'
      }
    }
  }))

  fashionProducts.push(await prisma.product.upsert({
    where: { slug: 'allbirds-wool-runners' },
    update: {},
    create: {
      name: 'Allbirds Wool Runners',
      slug: 'allbirds-wool-runners',
      description: 'Carbon neutral sneakers made from ZQ-certified merino wool, eucalyptus tree fiber, and sugarcane-based foam. Machine washable. Silky-smooth, naturally odor-resistant.',
      price: 98.00,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: allbirds.id,
      purchaseLink: 'https://www.allbirds.com/products/mens-wool-runners',
      publishedAt: new Date(),
      specifications: {
        upper: 'ZQ merino wool (superfine 17.5 micron)',
        lining: 'Eucalyptus tree fiber (TENCEL™)',
        sole: 'SweetFoam® (sugarcane-based)',
        carbon: '9.92 kg CO2e (fully offset to carbon neutral)',
        care: 'Machine washable, air dry',
        durability: '2+ years daily wear'
      }
    }
  }))

  fashionProducts.push(await prisma.product.upsert({
    where: { slug: 'prana-stretch-zion-pants' },
    update: {},
    create: {
      name: 'prAna Stretch Zion Pants',
      slug: 'prana-stretch-zion-pants',
      description: 'Durable outdoor pants made from recycled nylon with incredible stretch. Fair Trade Certified™. Quick-drying, water-repellent. Perfect for hiking, climbing, travel.',
      price: 89.00,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: prana.id,
      purchaseLink: 'https://www.prana.com/p/stretch-zion-pant/',
      publishedAt: new Date(),
      specifications: {
        materials: '97% recycled nylon, 3% spandex',
        certifications: 'Fair Trade Certified, bluesign® approved',
        features: 'UPF 50+, DWR water-repellent, roll-up legs',
        fit: 'Standard, straight leg',
        durability: 'Reinforced knees, abrasion-resistant',
        weight: '11.5 oz'
      }
    }
  }))

  fashionProducts.push(await prisma.product.upsert({
    where: { slug: 'tentree-classic-t-shirt' },
    update: {},
    create: {
      name: 'tentree Classic Organic Cotton T-Shirt',
      slug: 'tentree-classic-t-shirt',
      description: 'Soft organic cotton tee. Every purchase plants 10 trees (track your forest via app). GOTS certified organic, Fair Trade. Climate Neutral Certified. B Corp.',
      price: 36.00,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: ecosia.id,
      purchaseLink: 'https://www.tentree.com/products/classic-t-shirt',
      publishedAt: new Date(),
      specifications: {
        materials: '100% organic cotton (GOTS certified)',
        trees: '10 trees planted per purchase',
        certifications: 'Fair Trade, Climate Neutral, B Corp',
        impact: 'Total: 86M+ trees planted',
        fit: 'Relaxed fit, crew neck',
        care: 'Machine wash cold, hang dry'
      }
    }
  }))

  fashionProducts.push(await prisma.product.upsert({
    where: { slug: 'patagonia-nano-puff-jacket' },
    update: {},
    create: {
      name: 'Patagonia Nano Puff® Jacket',
      slug: 'patagonia-nano-puff-jacket',
      description: 'Lightweight insulated jacket from 100% recycled materials. PrimaLoft® Gold Insulation Eco (55% recycled). Fair Trade Certified™. Highly compressible. Water-resistant.',
      price: 249.00,
      status: 'PUBLISHED',
      categoryId: fashion.id,
      vendorId: patagonia.id,
      purchaseLink: 'https://www.patagonia.com/product/mens-nano-puff-jacket/',
      publishedAt: new Date(),
      specifications: {
        shell: '100% recycled polyester ripstop',
        insulation: 'PrimaLoft Gold Eco (55% recycled)',
        certifications: 'Fair Trade Certified, bluesign® approved',
        weight: '12.2 oz',
        features: 'DWR finish, internal chest pocket doubles as stuffsack',
        warmth: 'Warm down to 30-40°F'
      }
    }
  }))

  // ===== WATER CONSERVATION =====
  const waterProducts = []

  waterProducts.push(await prisma.product.upsert({
    where: { slug: 'berkey-big-water-filter' },
    update: {},
    create: {
      name: 'Big Berkey Water Filter System',
      slug: 'berkey-big-water-filter',
      description: 'Gravity-fed water purification. Removes 99.9% viruses, bacteria, heavy metals, pharmaceuticals. No electricity. 2.25 gal capacity. Filters 6,000 gallons. Perfect for emergencies.',
      price: 348.00,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: berkey.id,
      purchaseLink: 'https://www.berkeyfilters.com/products/big-berkey-water-filter',
      publishedAt: new Date(),
      specifications: {
        capacity: '2.25 gallons',
        filtration: '99.999% bacteria, 99.9% viruses',
        removes: 'Heavy metals, chlorine, fluoride (w/ add-on), VOCs, pharmaceuticals',
        lifespan: '6,000 gallons per filter (2 included = 12,000 gal)',
        speed: '3-4 gallons per hour',
        power: 'None required (gravity-fed)'
      }
    }
  }))

  waterProducts.push(await prisma.product.upsert({
    where: { slug: 'hydro-flask-40oz' },
    update: {},
    create: {
      name: 'Hydro Flask 40oz Wide Mouth Bottle',
      slug: 'hydro-flask-40oz',
      description: 'Insulated stainless steel bottle keeps drinks cold 24 hours, hot 12 hours. TempShield™ double-wall vacuum insulation. BPA-free, 18/8 pro-grade stainless steel. Lifetime warranty.',
      price: 44.95,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: hydroflask.id,
      purchaseLink: 'https://www.hydroflask.com/40-oz-wide-mouth',
      publishedAt: new Date(),
      specifications: {
        capacity: '40 oz (1.18 L)',
        insulation: 'TempShield™ double-wall vacuum',
        performance: 'Cold 24 hours, hot 12 hours',
        materials: '18/8 pro-grade stainless steel, BPA-free',
        mouth: 'Wide (2.81 inch) - fits ice cubes',
        warranty: 'Lifetime warranty',
        impact: 'Replaces 500+ plastic bottles per year'
      }
    }
  }))

  waterProducts.push(await prisma.product.upsert({
    where: { slug: 'rain-barrel-50-gallon' },
    update: {},
    create: {
      name: 'RainWizard 50 Gallon Rain Barrel',
      slug: 'rain-barrel-50-gallon',
      description: 'UV-resistant rain barrel for rainwater harvesting. Saves 1,300 gallons per 1" rain on 1,000 sq ft roof. Overflow valve, brass spigot, mosquito screen. Made from recycled materials.',
      price: 119.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.rainwizard.com/50-gallon-rain-barrel',
      publishedAt: new Date(),
      specifications: {
        capacity: '50 gallons',
        materials: 'Recycled plastic (HDPE)',
        features: 'Brass spigot, overflow valve, mosquito screen',
        savings: '1,300 gallons per inch of rain (1,000 sq ft roof)',
        height: '36 inches',
        diameter: '24 inches',
        weight: '10 lbs empty'
      }
    }
  }))

  waterProducts.push(await prisma.product.upsert({
    where: { slug: 'watersense-showerhead' },
    update: {},
    create: {
      name: 'High Sierra WaterSense Low Flow Showerhead',
      slug: 'watersense-showerhead',
      description: 'EPA WaterSense certified 1.5 GPM showerhead. Saves 2,900 gallons per person per year vs. standard 2.5 GPM. Nozzle technology maintains strong pressure. Easy DIY install.',
      price: 29.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.highsierrashowerheads.com/products/low-flow-showerheads',
      publishedAt: new Date(),
      specifications: {
        flow: '1.5 gallons per minute',
        certification: 'EPA WaterSense',
        savings: '2,900 gallons per person per year',
        pressure: 'Nozzle technology maintains strong flow',
        installation: 'Tool-free, fits standard shower arms',
        finish: 'Chrome plated brass',
        warranty: '5 years'
      }
    }
  }))

  waterProducts.push(await prisma.product.upsert({
    where: { slug: 'drip-irrigation-kit' },
    update: {},
    create: {
      name: 'Raindrip Complete Drip Irrigation Kit',
      slug: 'drip-irrigation-kit',
      description: 'Efficient garden watering system. Saves 50% water vs. sprinklers. 90-95% efficiency delivers water directly to roots. Waters up to 75 plants. Timer-compatible.',
      price: 79.99,
      status: 'PUBLISHED',
      categoryId: water.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.raindrip.com/drip-irrigation-kits',
      publishedAt: new Date(),
      specifications: {
        coverage: 'Up to 75 plants',
        efficiency: '90-95% (vs 50-70% sprinklers)',
        savings: '50% water reduction',
        includes: '100ft tubing, emitters, stakes, fittings',
        timer: 'Compatible with hose timers',
        warranty: '1 year'
      }
    }
  }))

  // ===== COMPOSTING & GARDEN =====
  const gardenProducts = []

  gardenProducts.push(await prisma.product.upsert({
    where: { slug: 'subpod-classic' },
    update: {},
    create: {
      name: 'Subpod Classic In-Garden Composter',
      slug: 'subpod-classic',
      description: 'Revolutionary in-ground composting system. Odor-free, pest-proof. Worms + microbes create nutrient-rich soil. Composts 15L per week. Aerates garden, improves drainage. Seats 2 as garden bench.',
      price: 349.00,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: subpod.id,
      purchaseLink: 'https://www.subpod.com/products/subpod-classic',
      publishedAt: new Date(),
      specifications: {
        capacity: '15 liters per week (30 lbs food waste)',
        method: 'Vermicomposting (worms) + aerobic decomposition',
        features: 'Odor-free, pest-proof, doubles as seat',
        installation: 'Bury in garden bed',
        dimensions: '26.4 x 16.5 x 12.2 inches',
        warranty: '5 years',
        impact: 'Diverts 780 lbs waste per year from landfill'
      }
    }
  }))

  gardenProducts.push(await prisma.product.upsert({
    where: { slug: 'jora-jk270' },
    update: {},
    create: {
      name: 'JORA JK270 Insulated Composter',
      slug: 'jora-jk270',
      description: 'Swedish-engineered tumbling composter. Insulated for year-round composting (even -20°F). Dual chambers for continuous composting. Hot composting in 4-6 weeks. Galvanized steel, 20+ year lifespan.',
      price: 599.00,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: joraCompost.id,
      purchaseLink: 'https://www.joraform.com/product/jk270/',
      publishedAt: new Date(),
      specifications: {
        capacity: '70 gallons (9.25 cubic feet)',
        chambers: 'Dual chamber for continuous composting',
        insulation: 'Year-round use, works to -20°F',
        speed: 'Hot compost in 4-6 weeks',
        construction: 'Galvanized steel, powder-coated',
        lifespan: '20+ years',
        warranty: '5 years'
      }
    }
  }))

  gardenProducts.push(await prisma.product.upsert({
    where: { slug: 'worm-factory-360' },
    update: {},
    create: {
      name: 'Worm Factory 360 Composting Bin',
      slug: 'worm-factory-360',
      description: 'Multi-tray vermicomposter. Worms process 6 lbs food scraps per week. Liquid fertilizer tea collection. Odorless, compact. Made from recycled materials. Includes 1 lb Red Wiggler worms.',
      price: 139.95,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.vermiculture.com/worm-factory-360',
      publishedAt: new Date(),
      specifications: {
        capacity: '6 lbs food waste per week',
        worms: '1 lb Red Wigglers included (1,000 worms)',
        trays: '4 stacking trays (expandable to 8)',
        byproducts: 'Rich vermicompost + liquid fertilizer tea',
        size: '18" x 18" x 26" tall',
        materials: 'Recycled plastic',
        indoor: 'Odorless, perfect for indoor/outdoor'
      }
    }
  }))

  gardenProducts.push(await prisma.product.upsert({
    where: { slug: 'dr-earth-organic-fertilizer' },
    update: {},
    create: {
      name: 'Dr. Earth Home Grown Organic Fertilizer',
      slug: 'dr-earth-organic-fertilizer',
      description: 'OMRI organic certified fertilizer. Feeds plants AND soil microbes. Fish bone meal, feather meal, alfalfa. Probiotics + mycorrhizae boost nutrient uptake 300%. No synthetic chemicals. 4 lb bag.',
      price: 18.99,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://drearth.com/product/home-grown-fertilizer/',
      publishedAt: new Date(),
      specifications: {
        npk: '4-6-3 + calcium + beneficial microbes',
        certifications: 'OMRI Organic, Non-GMO',
        ingredients: 'Fish bone, feather meal, alfalfa, kelp, probiotics',
        microbes: '7 strains beneficial bacteria + mycorrhizae',
        coverage: 'Up to 60 sq ft',
        use: 'Vegetables, fruits, herbs, flowers',
        safety: 'People & pet safe'
      }
    }
  }))

  gardenProducts.push(await prisma.product.upsert({
    where: { slug: 'raised-garden-bed-cedar' },
    update: {},
    create: {
      name: 'Cedar Raised Garden Bed 4x8 ft',
      slug: 'raised-garden-bed-cedar',
      description: 'Premium cedar raised bed. Naturally rot-resistant for 20+ years. Chemical-free, safe for organic gardening. 11" deep holds 21 cubic feet soil. Ergonomic height reduces back strain. Easy assembly.',
      price: 189.99,
      status: 'PUBLISHED',
      categoryId: garden.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.gardeners.com/cedar-raised-bed',
      publishedAt: new Date(),
      specifications: {
        size: '4 ft x 8 ft x 11 inches deep',
        materials: 'Premium Western Red Cedar (untreated)',
        capacity: '21 cubic feet of soil',
        durability: '20+ years (naturally rot-resistant)',
        assembly: 'Tool-free, 15 minutes',
        plants: 'Holds 32 plants (16" spacing)',
        organic: 'Chemical-free, USDA organic compatible'
      }
    }
  }))

  // ===== CLEANING PRODUCTS =====
  const cleaningProducts = []

  cleaningProducts.push(await prisma.product.upsert({
    where: { slug: 'dr-bronner-castile-soap' },
    update: {},
    create: {
      name: 'Dr. Bronner\'s Pure-Castile Liquid Soap 32oz',
      slug: 'dr-bronner-castile-soap',
      description: '18-in-1 multi-purpose soap. USDA Organic, Fair Trade certified organic oils. Biodegradable, no synthetics. Concentrated formula (dilute for 18 uses). Vegan, cruelty-free. Family-owned since 1948.',
      price: 19.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: drBronner.id,
      purchaseLink: 'https://www.drbronner.com/products/peppermint-pure-castile-liquid-soap',
      publishedAt: new Date(),
      specifications: {
        size: '32 fl oz (dilutes to 384 oz)',
        certifications: 'USDA Organic, Fair Trade, Non-GMO, Vegan',
        ingredients: 'Organic coconut, palm, olive, hemp, jojoba oils',
        uses: '18 uses: body, hair, dishes, laundry, floors, windows, etc.',
        biodegradable: '100% biodegradable in 28 days',
        packaging: 'Recycled plastic bottle (100% PCR)'
      }
    }
  }))

  cleaningProducts.push(await prisma.product.upsert({
    where: { slug: 'blueland-cleaning-kit' },
    update: {},
    create: {
      name: 'Blueland Complete Clean Kit',
      slug: 'blueland-cleaning-kit',
      description: 'Zero waste cleaning system. 3 reusable bottles + tablet refills. EPA Safer Choice certified. Multi-surface, glass, bathroom cleaners. Eliminates single-use plastic. Non-toxic, biodegradable.',
      price: 59.00,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.blueland.com/products/the-clean-essentials-kit',
      publishedAt: new Date(),
      specifications: {
        includes: '3 forever bottles + 9 cleaning tablets',
        products: 'Multi-surface, glass, bathroom cleaners',
        certifications: 'EPA Safer Choice, Cradle to Cradle Certified',
        refills: 'Tablets only, reuse bottles forever',
        plastic: 'Eliminates 9 plastic bottles per kit',
        ingredients: 'Plant-based, biodegradable, non-toxic',
        savings: 'Saves $100+ per year vs bottled cleaners'
      }
    }
  }))

  cleaningProducts.push(await prisma.product.upsert({
    where: { slug: 'full-circle-scrub-brush' },
    update: {},
    create: {
      name: 'Full Circle Bubble Up Dish Brush & Soap Dispenser',
      slug: 'full-circle-scrub-brush',
      description: 'Innovative dish brush with built-in soap dispenser. Recycled plastic handle, plant-based bristles. Replaceable heads reduce waste. Ergonomic design. Refillable reservoir.',
      price: 9.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.fullcirclehome.com/products/bubble-up',
      publishedAt: new Date(),
      specifications: {
        materials: 'Recycled plastic handle, plant-based bristles',
        refillable: 'Built-in soap dispenser',
        replaceable: 'Brush heads available (extends life)',
        durability: '6+ months per brush head',
        ergonomic: 'Non-slip grip',
        packaging: 'Plastic-free, recyclable cardboard'
      }
    }
  }))

  cleaningProducts.push(await prisma.product.upsert({
    where: { slug: 'unpaper-towels' },
    update: {},
    create: {
      name: 'Reusable Unpaper Towels 12-Pack',
      slug: 'unpaper-towels',
      description: 'Replace 60 rolls of paper towels. Organic cotton flannel, highly absorbent. Machine washable 500+ times. Snap together on roll. Zero waste, saves trees and money. Made in USA.',
      price: 32.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.etsy.com/listing/unpaper-towels',
      publishedAt: new Date(),
      specifications: {
        quantity: '12 reusable towels',
        materials: 'Organic cotton flannel (GOTS certified)',
        absorbency: '3x more absorbent than paper towels',
        durability: '500+ washes (3-5 years)',
        size: '10 x 12 inches each',
        impact: 'Replaces 60+ rolls paper towels, saves $300+',
        care: 'Machine wash warm, tumble dry low'
      }
    }
  }))

  cleaningProducts.push(await prisma.product.upsert({
    where: { slug: 'swedish-dishcloths' },
    update: {},
    create: {
      name: 'Swedish Dishcloths 10-Pack',
      slug: 'swedish-dishcloths',
      description: 'Eco-friendly sponge alternative. Cellulose + cotton blend absorbs 20x its weight. Replaces 17 rolls paper towels each. Compostable, biodegradable. Dishwasher safe. Lint-free, streak-free.',
      price: 19.99,
      status: 'PUBLISHED',
      categoryId: cleaning.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.swedishwholesale.com/swedish-dishcloths',
      publishedAt: new Date(),
      specifications: {
        quantity: '10 cloths',
        materials: '70% cellulose, 30% cotton',
        absorbency: 'Absorbs 20x its weight',
        lifespan: '6-12 months per cloth (100+ uses)',
        replacement: 'Each replaces 17 rolls paper towels',
        care: 'Dishwasher safe, air dry between uses',
        disposal: '100% biodegradable, home compostable'
      }
    }
  }))

  // ===== ELECTRONICS =====
  const electronicsProducts = []

  electronicsProducts.push(await prisma.product.upsert({
    where: { slug: 'fairphone-5' },
    update: {},
    create: {
      name: 'Fairphone 5 Modular Smartphone',
      slug: 'fairphone-5',
      description: 'Ethical, modular smartphone designed to last. User-replaceable battery, screen, cameras. Fair sourced materials. 5-year warranty. Electronic waste reduction. B Corporation certified. Runs Android.',
      price: 699.00,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: fairphone.id,
      purchaseLink: 'https://www.fairphone.com/en/fairphone-5',
      publishedAt: new Date(),
      specifications: {
        repairability: '10/10 iFixit score - highest ever',
        battery: 'User-replaceable, 4,200 mAh',
        modular: 'Replaceable screen, cameras, speakers, USB-C port',
        warranty: '5 years (vs 1-2 typical)',
        materials: 'Fair trade gold, recycled plastics, conflict-free minerals',
        os: 'Android 13, updates to Android 18',
        impact: 'E-waste reduction, fair labor practices'
      }
    }
  }))

  electronicsProducts.push(await prisma.product.upsert({
    where: { slug: 'nimh-rechargeable-batteries' },
    update: {},
    create: {
      name: 'Eneloop Pro Rechargeable Batteries 8-Pack AA',
      slug: 'nimh-rechargeable-batteries',
      description: 'Premium NiMH rechargeable batteries. Recharge 500+ times. Pre-charged with solar energy. Low self-discharge holds charge 1 year. Replaces 4,000+ disposable batteries. -4°F performance.',
      price: 29.99,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.amazon.com/Panasonic-Eneloop-Rechargeable-Batteries/dp/B00JHKSMJU',
      publishedAt: new Date(),
      specifications: {
        quantity: '8 AA batteries',
        recharges: '500 cycles minimum',
        capacity: '2550 mAh (high capacity)',
        replacement: 'Replaces 4,000+ alkaline batteries',
        storage: 'Retains 85% charge after 1 year',
        temperature: 'Performs to -4°F',
        precharged: 'Solar energy in Japan',
        savings: '$800+ over battery lifetime'
      }
    }
  }))

  electronicsProducts.push(await prisma.product.upsert({
    where: { slug: 'universal-charger' },
    update: {},
    create: {
      name: 'Anker PowerPort Atom III 4-Port USB Charger',
      slug: 'universal-charger',
      description: 'GaN technology ultra-efficient charging. 65W total, 45W USB-C PD. 90% energy efficient vs 75% silicon chargers. Charges 4 devices simultaneously. Foldable plug, compact design.',
      price: 54.99,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.anker.com/products/a2045',
      publishedAt: new Date(),
      specifications: {
        power: '65W total (45W USB-C PD + 3x USB-A)',
        efficiency: '90% (vs 75% typical)',
        technology: 'GaN (Gallium Nitride) - smaller, cooler',
        ports: '1x USB-C PD, 3x USB-A',
        devices: 'Charges 4 devices simultaneously',
        size: '40% smaller than standard 61W chargers',
        safety: 'MultiProtect (surge, temperature, current)'
      }
    }
  }))

  electronicsProducts.push(await prisma.product.upsert({
    where: { slug: 'laptop-stand-aluminum' },
    update: {},
    create: {
      name: 'Rain Design mStand Laptop Stand - Recycled Aluminum',
      slug: 'laptop-stand-aluminum',
      description: 'Ergonomic laptop stand from single piece recycled aluminum. Elevates screen to eye level, improves posture. Cooling design increases airflow. Fits all laptops. Cable management. Designed in USA.',
      price: 49.99,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.raindesigninc.com/mstand.html',
      publishedAt: new Date(),
      specifications: {
        materials: '100% recycled aluminum (single piece)',
        compatibility: 'Fits all laptops up to 15"',
        height: 'Raises screen 5.9 inches',
        cooling: 'Open design improves airflow 20%',
        cable: 'Built-in cable management',
        weight: '3 lbs (solid, stable)',
        lifespan: 'Lifetime durability'
      }
    }
  }))

  electronicsProducts.push(await prisma.product.upsert({
    where: { slug: 'solar-phone-charger' },
    update: {},
    create: {
      name: 'BigBlue 28W Folding Solar Charger',
      slug: 'solar-phone-charger',
      description: 'Portable solar panel charges phones, tablets, power banks. 23.5% efficiency SunPower cells. Dual USB ports (5V/4A max). Waterproof, rugged. Perfect for camping, emergencies, off-grid.',
      price: 69.96,
      status: 'PUBLISHED',
      categoryId: electronics.id,
      vendorId: fullCircle.id,
      purchaseLink: 'https://www.bigbluetech.com/28w-solar-charger',
      publishedAt: new Date(),
      specifications: {
        power: '28W max output',
        efficiency: '23.5% (SunPower cells)',
        ports: '2x USB (5V/4A max total)',
        charging: 'iPhone 2-3 hours full charge',
        folded: '11.1 x 6.3 x 2.2 inches',
        unfolded: '33.1 x 11.1 inches',
        durability: 'IPX4 waterproof, canvas construction',
        weight: '1.3 lbs'
      }
    }
  }))

  console.log('✅ All products created!')

  const allProducts = [
    ...energyProducts,
    ...fashionProducts,
    ...waterProducts,
    ...gardenProducts,
    ...cleaningProducts,
    ...electronicsProducts
  ]

  console.log(`🌟 EXPANSION COMPLETE: ${allProducts.length} new products added!`)
  console.log('📊 Breakdown:')
  console.log(`   ⚡ Energy: ${energyProducts.length}`)
  console.log(`   👕 Fashion: ${fashionProducts.length}`)
  console.log(`   💧 Water: ${waterProducts.length}`)
  console.log(`   🌱 Garden: ${gardenProducts.length}`)
  console.log(`   🧼 Cleaning: ${cleaningProducts.length}`)
  console.log(`   📱 Electronics: ${electronicsProducts.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Expansion seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
