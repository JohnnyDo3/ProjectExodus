import type { ArchitecturalElement } from '../../types';

export const MARKET_HALL: ArchitecturalElement = {
  id: 'market-hall',
  slug: 'market-hall',
  name: 'Market Hall',
  alternativeNames: ['Covered Market', 'Market House', 'Halle', 'Mercado Cubierto'],
  pronunciation: {
    phonetic: 'MAR-kit HAWL',
    language: 'English',
  },
  etymology: {
    origin: 'Old English/Latin',
    meaning: 'Covered trading space',
    rootWord: 'From Old English "market" (from Latin "mercatus") + "hall" (covered space)',
  },
  category: 'URBAN',
  subcategory: 'commercial_structure',
  periods: ['medieval', 'renaissance', 'industrial-revolution', 'art-nouveau', 'modern'],
  regions: ['WESTERN_EUROPE', 'BRITISH_ISLES', 'MEDITERRANEAN', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/market-hall-primary.jpg',
    gallery: [
      '/images/architecture/elements/market-hall-leadenhall.jpg',
      '/images/architecture/elements/market-hall-boqueria.jpg',
    ],
    diagram: '/images/architecture/diagrams/market-hall-layout.svg',
  },

  description: {
    ELEMENTARY: 'A market hall is a big building where people buy and sell food and goods under one roof! Instead of shopping outside in the rain or sun, everyone comes inside where there are many stalls. Some market halls are very old with beautiful roofs made of iron and glass. Others are modern buildings. People love market halls because they can find fresh food and interesting things all in one place!',
    MIDDLE_SCHOOL: 'A market hall is a covered structure housing multiple vendor stalls for selling food, goods, and crafts. Medieval market halls protected traders and customers from weather. The Industrial Revolution brought iron and glass construction, creating large column-free spaces with natural light. Famous examples include Les Halles in Paris and La Boqueria in Barcelona. Modern market halls combine traditional trading functions with restaurants and social spaces, serving as community gathering places and tourist attractions.',
    HIGH_SCHOOL: 'The market hall is an enclosed or semi-enclosed structure providing covered trading space organized around circulation aisles and vendor stalls. Architectural elements include large-span roof systems, natural ventilation, daylighting, and separate loading/delivery zones. Medieval examples used timber construction with open ground floors. Victorian-era halls employed cast iron columns and glass roofs for maximum light and span. Contemporary designs address food safety regulations, climate control, waste management, and integration with urban food systems.',
    UNDERGRADUATE: 'Market hall design integrates structural systems, environmental performance, and spatial organization. Large-span roofs eliminate interior columns for flexible stall arrangements-19th-century examples used iron trusses, contemporary halls use steel space frames or laminated timber. Environmental strategies include natural ventilation through stack effect, daylighting through skylights or clerestories, and thermal mass for temperature moderation. Planning addresses vendor access, cold storage, waste handling, and customer circulation. Contemporary practice explores market halls as anchors for urban regeneration and local food systems.',
    GRADUATE: 'Market hall analysis addresses building performance, social function, and urban economics. Research examines the evolution of market building types, the relationship between market hall design and trading practices, and the role of markets in neighborhood identity and gentrification. Contemporary challenges include adapting historic market halls for modern food safety standards, balancing traditional vendors with restaurant uses, designing for climate resilience, and ensuring equitable access for diverse vendors and customers.',
    PHD: 'Market hall scholarship engages architectural history, urban economics, and food systems research. Methodologies include historical analysis of market regulation and design, ethnographic study of vendor and customer practices, and building performance monitoring. Current research addresses markets in gentrifying neighborhoods, the role of market halls in sustainable urban food systems, gender and labor in market economies, and comparative studies of market traditions across cultures.',
  },

  history: {
    ELEMENTARY: 'In medieval times, towns built covered market buildings so people could trade goods protected from rain! The buildings had big roofs held up by columns. In the 1800s, engineers learned to build market halls with iron and glass, making them bright and spacious. Paris had huge market halls called Les Halles. Today, old market halls are popular places to visit, and new ones are being built in cities around the world.',
    MIDDLE_SCHOOL: 'Medieval European towns built market halls as covered trading spaces-many combined ground-floor markets with upper-floor meeting halls. The Industrial Revolution transformed market architecture: the Quincy Market in Boston (1826) used granite and metal. Paris\' Les Halles (1852-1936) featured iron and glass pavilions. Victorian Britain built cast-iron market halls in cities like Leeds (1904). 20th-century modernism often replaced historic markets with concrete structures. Contemporary movements revive traditional market halls as sustainable local food infrastructure and social spaces.',
    HIGH_SCHOOL: 'Medieval market halls served commercial and civic functions-ground floors for trade, upper floors for guilds or town councils. Renaissance examples combined arcaded loggias with enclosed spaces. The 19th century revolutionized market architecture: Baltard\'s Les Halles pavilions (1852) demonstrated iron construction potential. The market hall became an industrial building type deploying new materials and engineering. Art Nouveau markets like Valencia\'s Mercado Central (1914) added decorative programs. Modernist planning often demolished markets for traffic flow. Recent decades have seen market revival as places of authenticity and community.',
    UNDERGRADUATE: 'Market hall history reveals evolving construction technology, changing food distribution systems, and urban planning priorities. Medieval halls used timber framing with restricted spans. Iron technology enabled column-free spaces and glazed roofs-Labrouste, Baltard, and Paxton pioneered applications. Refrigeration and modern sanitation drove 20th-century market design. Supermarket development displaced traditional markets in many cities. Contemporary revival reflects desires for local food systems, social interaction, and authentic urban experiences. Adaptive reuse of industrial market buildings demonstrates heritage value.',
    GRADUATE: 'Historical analysis of market halls examines technological innovation, food system evolution, and contested urban space. Research addresses the relationship between market architecture and hygiene reform movements, the role of markets in working-class life and food access, and the politics of market closures and redevelopment. Contemporary challenges include gentrification pressures on traditional markets, balancing heritage preservation with operational requirements, and designing markets that support rather than displace existing vendors and communities.',
    PHD: 'Market hall scholarship engages economic history, urban sociology, and food studies. Methodologies include archaeological investigation of medieval market sites, historical analysis of market regulations and design standards, and ethnographic research on contemporary market cultures. Current research examines markets in postcolonial cities, the role of market halls in food sovereignty, labor and gender dynamics in market economies, and comparative studies of market preservation strategies across different political contexts.',
  },

  characteristics: [
    'Large covered trading space',
    'Multiple vendor stalls or stands',
    'Central circulation aisles',
    'Natural light from skylights or clerestories',
    'Large-span roof structure',
    'Ventilation for air quality',
    'Loading zones for goods delivery',
  ],

  famousExamples: [
    { name: 'La Boqueria', location: 'Barcelona, Spain', year: '1217 (current structure 1840)', description: 'Famous covered market on Las Ramblas with iron structure' },
    { name: 'Borough Market', location: 'London, England', year: '1014 (current structure 1851)', description: 'Historic market under Victorian roof structures' },
    { name: 'Les Halles de Lyon', location: 'Lyon, France', year: '1859-1960', description: 'Famous food market, nicknamed "belly of Lyon"' },
    { name: 'Mercado Central', location: 'Valencia, Spain', year: '1914-1928', description: 'Art Nouveau market with ornate iron and tile work' },
    { name: 'Pike Place Market', location: 'Seattle, USA', year: '1907', description: 'Continuous market operation, tourist destination' },
  ],

  confusionPairs: [
    {
      elementId: 'arcade',
      reason: 'Both provide covered shopping spaces',
      distinction: 'Arcades are linear passages with shops on sides; market halls are large open spaces with vendor stalls',
    },
    {
      elementId: 'bazaar',
      reason: 'Both are marketplaces',
      distinction: 'Bazaars are traditional Middle Eastern/Asian covered markets with maze-like passages; market halls are Western single-space structures',
    },
  ],

  searchTags: ['market', 'hall', 'covered market', 'vendors', 'food', 'commercial', 'iron', 'glass', 'urban'],

  arMetadata: {
    modelPath: '/models/architecture/market-hall.glb',
    scale: 0.1,
    rotatable: true,
    annotations: [
      { label: 'Roof Structure', position: { x: 0, y: 4, z: 0 } },
      { label: 'Skylight', position: { x: 1, y: 3.5, z: 1 } },
      { label: 'Vendor Stall', position: { x: 2, y: 1, z: 2 } },
      { label: 'Central Aisle', position: { x: 0, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
