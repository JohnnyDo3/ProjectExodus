import type { ArchitecturalElement } from '../../types';

export const TERRAZZO: ArchitecturalElement = {
  id: 'terrazzo',
  slug: 'terrazzo',
  name: 'Terrazzo',
  alternativeNames: ['Venetian Terrazzo', 'Palladiana', 'Seminato'],
  pronunciation: {
    phonetic: 'teh-RAT-zoh',
    language: 'Italian',
  },
  etymology: {
    origin: 'Italian',
    meaning: 'Terrace or balcony',
    rootWord: 'From Latin "terra" (earth)',
  },
  category: 'FLOOR',
  subcategory: 'paving',
  periods: ['RENAISSANCE', 'BAROQUE', 'ART_DECO', 'MODERN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/terrazzo-primary.jpg',
    gallery: [
      '/images/architecture/elements/terrazzo-pattern.jpg',
      '/images/architecture/elements/terrazzo-installation.jpg',
    ],
    diagram: '/images/architecture/diagrams/terrazzo-composition.svg',
  },

  description: {
    ELEMENTARY: 'Terrazzo is a colorful floor made by mixing little pieces of marble, glass, or stone into cement. When it\'s polished, it shines like a mirror and shows beautiful speckled patterns. You might see it in schools, airports, or fancy buildings!',
    MIDDLE_SCHOOL: 'Terrazzo is a composite flooring material made by embedding chips of marble, quartz, granite, or glass in a cement or epoxy binder. The surface is then ground and polished to reveal the aggregate pattern. Invented in 15th-century Venice, it remains popular for its durability and decorative versatility.',
    HIGH_SCHOOL: 'Terrazzo flooring consists of marble, granite, quartz, or glass chips set in a cementitious or resinous matrix, ground flat, and polished to a smooth finish. The technique originated with Venetian workers recycling marble remnants. Modern terrazzo offers unlimited color combinations and can incorporate decorative patterns, logos, and directional markers.',
    UNDERGRADUATE: 'Terrazzo represents an early example of composite material innovation, emerging from the Venetian marble industry\'s economy of recycling. Traditional cementitious terrazzo uses Portland cement as a binder, while epoxy terrazzo (developed mid-20th century) offers greater design flexibility and faster curing. The material\'s seamless installation and integration with radiant heating systems maintain its relevance in contemporary architecture.',
    GRADUATE: 'The terrazzo system encompasses both material technology and craft tradition. Analysis includes aggregate selection (marble grades, recycled glass, mother-of-pearl), binder chemistry, divider strip design (brass, zinc, plastic), and finishing protocols. Contemporary practice negotiates between artisanal Venetian methods and industrial precast systems, while addressing sustainability through recycled content and low-VOC epoxies.',
    PHD: 'Terrazzo studies engage material science, conservation methodology, and design history. Research addresses the chemistry of binder-aggregate interfaces, failure mechanisms in historic terrazzo, and the cultural significance of regional variations from Venetian palazzi to American Art Deco. Contemporary scholarship examines terrazzo\'s role in sustainable design discourse, including lifecycle analysis and circular economy applications.',
  },

  history: {
    ELEMENTARY: 'Terrazzo was invented about 500 years ago in Venice, Italy. Workers had leftover marble chips from building fancy palaces, so they mixed them with clay to make their own floors at home. The technique became so beautiful that rich people wanted it too!',
    MIDDLE_SCHOOL: 'Venetian construction workers in the 15th century invented terrazzo by recycling marble remnants into flooring for their own terraces and patios. The technique spread throughout Italy and Europe. In the early 1900s, Italian immigrants brought terrazzo craftsmanship to America, where it became popular in Art Deco buildings and public spaces.',
    HIGH_SCHOOL: 'Terrazzo emerged in 15th-century Venice when mosaic workers discovered that marble chips could be set in terrace flooring. Goat\'s milk was originally used as a sealant. By the 18th century, terrazzo was standard in Venetian palazzi. Italian immigrants introduced the craft to America in the 1890s, and terrazzo became synonymous with the Art Deco era. The invention of electric grinding machines revolutionized production.',
    UNDERGRADUATE: 'The development of terrazzo traces from Venetian vernacular innovation through industrialization to contemporary revival. Seventeenth-century innovations included the "seminato" technique of random chip scattering versus "palladiana" large-piece setting. American terrazzo peaked during the 1920s-1960s, declined with competition from cheaper materials, and revived in the 2000s as architects rediscovered its sustainability and design potential.',
    GRADUATE: 'Historical analysis of terrazzo reveals the material\'s role in transmitting craft knowledge through immigration and colonialism. The National Terrazzo and Mosaic Association (founded 1924) standardized American practice while negotiating tensions between union craft traditions and industrial rationalization. Mid-century decline correlates with the rise of synthetic flooring, while contemporary revival reflects both heritage appreciation and sustainable design priorities.',
    PHD: 'Terrazzo historiography engages labor history, material culture, and architectural preservation. Research examines the craft\'s transmission from Venice through the terrazzieri guilds, its transformation in American industrial contexts, and contemporary recovery of traditional techniques. Conservation challenges include matching historic cement formulations, addressing iron staining from divider strips, and developing compatible repair protocols.',
  },

  characteristics: [
    'Composite material with aggregate in binder matrix',
    'Ground and polished to smooth finish',
    'Highly durable with 75+ year lifespan',
    'Seamless installation with metal divider strips',
    'Unlimited color and pattern possibilities',
    'Low maintenance and easily refinished',
    'Compatible with radiant floor heating',
  ],

  famousExamples: [
    { name: 'Hollywood Walk of Fame', location: 'Los Angeles, USA', year: '1960-present', description: 'Iconic terrazzo sidewalk with brass star inlays' },
    { name: 'Palazzo Ducale', location: 'Venice, Italy', year: '14th-15th century', description: 'Historic Venetian terrazzo floors in the Doge\'s Palace' },
    { name: 'Chrysler Building Lobby', location: 'New York City, USA', year: '1930', description: 'Art Deco terrazzo with geometric patterns' },
    { name: 'Los Angeles Union Station', location: 'Los Angeles, USA', year: '1939', description: 'Elaborate terrazzo floors in Mission Revival style' },
    { name: 'Schiphol Airport', location: 'Amsterdam, Netherlands', year: '1967', description: 'Modern terrazzo with directional patterns' },
  ],

  confusionPairs: [
    {
      elementId: 'mosaic-floor',
      reason: 'Both use small pieces set in a matrix',
      distinction: 'Terrazzo uses random aggregate chips; mosaic arranges tesserae in deliberate patterns',
    },
    {
      elementId: 'polished-concrete',
      reason: 'Both have a smooth, polished appearance',
      distinction: 'Terrazzo has decorative aggregate; polished concrete exposes the natural concrete aggregate',
    },
  ],

  searchTags: ['flooring', 'venetian', 'marble chips', 'composite', 'polished', 'aggregate', 'art deco', 'sustainable', 'paving'],

  arMetadata: {
    modelPath: '/models/architecture/terrazzo.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Marble Aggregate', position: { x: 0.1, y: 0, z: 0.1 } },
      { label: 'Brass Divider Strip', position: { x: 0.3, y: 0, z: 0 } },
      { label: 'Cement Matrix', position: { x: -0.1, y: 0, z: 0.2 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
