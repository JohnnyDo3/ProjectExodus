import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('📸 Starting product image seeding...')

  // Delete existing product images to avoid duplicates
  await prisma.productImage.deleteMany({})
  console.log('✅ Cleared existing product images')

  // Helper function to add images to a product
  async function addImages(slug: string, images: { url: string; alt: string; order: number }[]) {
    const product = await prisma.product.findUnique({ where: { slug } })
    if (!product) {
      console.log(`⚠️  Product not found: ${slug}`)
      return
    }

    for (const img of images) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: img.url,
          alt: img.alt,
          order: img.order
        }
      })
    }
    console.log(`  ✓ Added ${images.length} image(s) to ${product.name}`)
  }

  // ENERGY PRODUCTS
  await addImages('goal-zero-nomad-100-solar-panel', [
    { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop', alt: 'Goal Zero Nomad 100 Solar Panel unfolded in outdoor setting', order: 1 },
    { url: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=600&fit=crop', alt: 'Close-up of solar panel cells showing high efficiency design', order: 2 }
  ])

  await addImages('biolite-solarpanel-10-plus', [
    { url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop', alt: 'BioLite SolarPanel 10+ with sundial positioning system', order: 1 },
    { url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop', alt: 'Portable solar panel charging devices outdoors', order: 2 }
  ])

  await addImages('solar-garden-lights-set', [
    { url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop', alt: 'LED solar garden pathway lights illuminating walkway at dusk', order: 1 },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', alt: 'Solar garden lights set arranged along garden path', order: 2 }
  ])

  await addImages('renogy-100w-solar-kit', [
    { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop', alt: 'Renogy 100W solar starter kit components', order: 1 },
    { url: 'https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=800&h=600&fit=crop', alt: 'Solar panel kit installed on RV roof', order: 2 }
  ])

  // HOME & KITCHEN
  await addImages('stasher-silicone-bag-set', [
    { url: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&h=600&fit=crop', alt: 'Stasher reusable silicone storage bags in various sizes', order: 1 },
    { url: 'https://images.unsplash.com/photo-1621944069725-8c9c7d1b4a5e?w=800&h=600&fit=crop', alt: 'Colorful silicone bags with fresh produce', order: 2 }
  ])

  await addImages('klean-kanteen-food-box-set', [
    { url: 'https://images.unsplash.com/photo-1610465299993-e6675c8f5a44?w=800&h=600&fit=crop', alt: 'Klean Kanteen stainless steel food boxes stacked', order: 1 },
    { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop', alt: 'Stainless steel food containers with healthy meals', order: 2 }
  ])

  await addImages('bee-wraps-organic-food-wraps', [
    { url: 'https://images.unsplash.com/photo-1618517820098-9bb53a95bb8f?w=800&h=600&fit=crop', alt: "Bee's Wrap organic food wraps with colorful patterns", order: 1 },
    { url: 'https://images.unsplash.com/photo-1620288474618-aca7fa9bc93e?w=800&h=600&fit=crop', alt: 'Beeswax wraps covering fresh produce and bowls', order: 2 }
  ])

  await addImages('eparé-glass-meal-prep-containers', [
    { url: 'https://images.unsplash.com/photo-1591299550635-9ce1f9a5f98e?w=800&h=600&fit=crop', alt: 'Eparé glass meal prep containers filled with healthy food', order: 1 },
    { url: 'https://images.unsplash.com/photo-1600073701011-5b87be0a0c70?w=800&h=600&fit=crop', alt: 'Glass food storage containers with airtight lids', order: 2 }
  ])

  // FASHION
  await addImages('reformation-organic-cotton-tee', [
    { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop', alt: 'Reformation organic cotton relaxed tee in neutral color', order: 1 },
    { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=600&fit=crop', alt: 'Sustainable organic cotton t-shirt flat lay', order: 2 }
  ])

  await addImages('quince-mongolian-cashmere-sweater', [
    { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=600&fit=crop', alt: 'Quince Mongolian cashmere crewneck sweater', order: 1 },
    { url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e41f5?w=800&h=600&fit=crop', alt: 'Luxurious cashmere sweater detail showing soft texture', order: 2 }
  ])

  await addImages('reformation-linen-jumpsuit', [
    { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop', alt: 'Reformation linen utility jumpsuit', order: 1 },
    { url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=600&fit=crop', alt: 'Sustainable linen jumpsuit with utility pockets', order: 2 }
  ])

  await addImages('quince-organic-cotton-tee-3pack', [
    { url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=600&fit=crop', alt: 'Quince organic cotton crew neck t-shirts 3-pack', order: 1 },
    { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=600&fit=crop', alt: 'Set of organic cotton t-shirts in neutral colors', order: 2 }
  ])

  // GARDEN & OUTDOORS
  await addImages('full-circle-countertop-compost-bin', [
    { url: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&h=600&fit=crop', alt: 'Full Circle Fresh Air compost collector on countertop', order: 1 },
    { url: 'https://images.unsplash.com/photo-1591845150474-c5f418cf0303?w=800&h=600&fit=crop', alt: 'Countertop compost bin with fresh food scraps', order: 2 }
  ])

  await addImages('gardeners-supply-rain-barrel', [
    { url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop', alt: 'Rain barrel water collection system in garden', order: 1 },
    { url: 'https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=800&h=600&fit=crop', alt: '50 gallon rain barrel with spigot and overflow valve', order: 2 }
  ])

  await addImages('bamboo-garden-tool-set', [
    { url: 'https://images.unsplash.com/photo-1592373897062-089a66bbd2db?w=800&h=600&fit=crop', alt: 'Bamboo garden tool set with stainless steel heads', order: 1 },
    { url: 'https://images.unsplash.com/photo-1617576683142-f90df20bfc0e?w=800&h=600&fit=crop', alt: 'Sustainable bamboo handle garden tools in carrying case', order: 2 }
  ])

  await addImages('electric-kitchen-composter', [
    { url: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&h=600&fit=crop', alt: 'Lomi electric kitchen composter on countertop', order: 1 },
    { url: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=800&h=600&fit=crop', alt: 'Electric composter turning food waste into soil', order: 2 }
  ])

  // WATER SOLUTIONS
  await addImages('klean-kanteen-insulated-bottle', [
    { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop', alt: 'Klean Kanteen insulated stainless steel water bottle', order: 1 },
    { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop', alt: 'Insulated water bottle keeping drinks cold', order: 2 }
  ])

  await addImages('berkey-gravity-water-filter', [
    { url: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop', alt: 'Big Berkey gravity water filter system', order: 1 },
    { url: 'https://images.unsplash.com/photo-1563472779-7d174e01fa4b?w=800&h=600&fit=crop', alt: 'Gravity-fed water purification system in kitchen', order: 2 }
  ])

  await addImages('high-sierra-low-flow-shower-head', [
    { url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop', alt: 'High Sierra low-flow shower head with chrome finish', order: 1 },
    { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop', alt: 'Water-saving shower head installed in bathroom', order: 2 }
  ])

  await addImages('hydaway-collapsible-bottle', [
    { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop', alt: 'Hydaway collapsible water bottle expanded', order: 1 },
    { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=600&fit=crop', alt: 'Collapsible silicone bottle collapsed to pocket size', order: 2 }
  ])

  // CLEANING PRODUCTS
  await addImages('blueland-cleaning-starter-set', [
    { url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&h=600&fit=crop', alt: 'Blueland Clean Essentials Kit with reusable bottles', order: 1 },
    { url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=600&fit=crop', alt: 'Cleaning tablet system with Forever Bottles', order: 2 }
  ])

  await addImages('marley-reusable-paper-towels', [
    { url: 'https://images.unsplash.com/photo-1612852098516-55d01c75769a?w=800&h=600&fit=crop', alt: "Marley's Monsters reusable paper towels rolled up", order: 1 },
    { url: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?w=800&h=600&fit=crop', alt: 'Cotton flannel reusable towels snapped together', order: 2 }
  ])

  await addImages('ecover-dish-soap-refill', [
    { url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&h=600&fit=crop', alt: 'Ecover Zero dish soap concentrate refill bottle', order: 1 },
    { url: 'https://images.unsplash.com/photo-1600633489937-0cf7e275e724?w=800&h=600&fit=crop', alt: 'Plant-based dish soap being dispensed onto dishes', order: 2 }
  ])

  await addImages('full-circle-compostable-sponges', [
    { url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=600&fit=crop', alt: 'Full Circle Refresh compostable kitchen sponges', order: 1 },
    { url: 'https://images.unsplash.com/photo-1600633690556-1c5e34f67e69?w=800&h=600&fit=crop', alt: 'Plant-based compostable sponges with walnut shell scrubber', order: 2 }
  ])

  // ELECTRONICS
  await addImages('pela-iphone-case', [
    { url: 'https://images.unsplash.com/photo-1606041011872-596597976b25?w=800&h=600&fit=crop', alt: 'Pela 100% compostable iPhone case', order: 1 },
    { url: 'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=800&h=600&fit=crop', alt: 'Eco-friendly compostable phone case showing texture', order: 2 }
  ])

  await addImages('pela-airpods-case', [
    { url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=600&fit=crop', alt: 'Pela compostable AirPods case', order: 1 },
    { url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop', alt: 'Sustainable AirPods case made from plant materials', order: 2 }
  ])

  console.log('\n✅ Product image seeding complete!')
  console.log(`📸 Added images to ${Object.keys(await prisma.productImage.groupBy({ by: ['productId'] })).length} products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
