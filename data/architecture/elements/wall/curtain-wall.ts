import type { ArchitecturalElement } from '../../types';

export const CURTAIN_WALL: ArchitecturalElement = {
  id: 'curtain-wall',
  slug: 'curtain-wall',
  name: 'Curtain Wall',
  alternativeNames: ['Glass Wall', 'Non-Load-Bearing Wall', 'Glazed Facade', 'Skin'],
  pronunciation: {
    phonetic: 'KUR-tin WAWL',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Wall that hangs like a curtain from the structure',
    rootWord: 'From Latin "cortina" (curtain) and Germanic "wall"',
  },
  category: 'WALL',
  subcategory: 'wall_types',
  periods: ['MODERN', 'CONTEMPORARY'],
  regions: ['NORTH_AMERICA', 'WESTERN_EUROPE', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/curtain-wall-primary.jpg',
    gallery: [
      '/images/architecture/elements/curtain-wall-detail.jpg',
      '/images/architecture/elements/curtain-wall-corner.jpg',
    ],
    diagram: '/images/architecture/diagrams/curtain-wall-assembly.svg',
  },

  description: {
    ELEMENTARY: 'A curtain wall is the glass skin on tall buildings. Unlike normal walls, it doesn\'t hold up the building-it just hangs there like a curtain! The building\'s skeleton of steel or concrete does all the heavy lifting while the glass keeps out wind and rain.',
    MIDDLE_SCHOOL: 'Curtain walls are non-load-bearing exterior walls, typically made of glass and metal frames, that hang from the building\'s structural frame like a curtain. They don\'t support the building\'s weight-they only support their own weight and resist wind. This allows entire building facades to be transparent glass.',
    HIGH_SCHOOL: 'The curtain wall system separates the building\'s structure from its enclosure. Aluminum or steel frames support glass panels, attached to but not supported by floor slabs. Key considerations include thermal performance (insulated glazing), water infiltration (pressure-equalized design), and movement accommodation (thermal expansion, building sway). Types include stick-built, unitized, and structural glazing systems.',
    UNDERGRADUATE: 'Curtain wall technology represents the definitive expression of modern architecture\'s separation of structure and envelope. System types include stick-built (field-assembled mullions and rails), unitized (factory-assembled panels), and point-fixed structural glazing. Performance requirements address air infiltration, water penetration, thermal transmission, acoustic isolation, and blast resistance. Contemporary innovation focuses on energy performance and integrated photovoltaics.',
    GRADUATE: 'Curtain wall analysis encompasses structural mechanics, building physics, and manufacturing logistics. Structural considerations include wind load distribution, seismic movement accommodation, and differential movement between floors. Thermal analysis addresses U-values, solar heat gain coefficients, and thermal bridging at connections. Research examines emerging technologies: electrochromic glass, integrated shading, and building-integrated photovoltaics (BIPV).',
    PHD: 'Curtain wall research engages building science, construction management, and environmental performance. Current investigations include lifecycle assessment of curtain wall systems, optimization of thermal performance in various climates, and the role of curtain walls in net-zero energy buildings. Historical scholarship examines the technology\'s development from early experiments through postwar standardization to contemporary innovation.',
  },

  history: {
    ELEMENTARY: 'Curtain walls were invented about 100 years ago when architects wanted to make buildings with lots of glass. The first famous curtain wall buildings were in Germany. Now almost every tall building in cities around the world uses curtain walls!',
    MIDDLE_SCHOOL: 'Early curtain walls appeared in the 1900s-1920s, but the technology matured after World War II. Mies van der Rohe\'s Lake Shore Drive apartments (1951) and Lever House (1952) established the modern glass tower. Technical innovations addressed weatherproofing and thermal performance. Today\'s high-performance curtain walls are engineered for energy efficiency.',
    HIGH_SCHOOL: 'Crystal Palace (1851) pioneered large-scale glass construction. Early 20th-century examples (Hallidie Building, 1918) used glass set in steel frames. Post-WWII aluminum extrusion technology enabled standardized curtain wall systems. Mies van der Rohe\'s projects codified the aesthetic. Energy crises of the 1970s drove thermal performance improvements. Contemporary systems achieve remarkable environmental performance.',
    UNDERGRADUATE: 'Curtain wall development traces from Crystal Palace\'s experimental glazing through early skyscraper experiments (Reliance Building, 1895) to postwar standardization. Key innovations include aluminum extrusion (1930s), neoprene gaskets (1940s), structural silicone glazing (1970s), and unitized panel systems (1970s-80s). Contemporary development focuses on energy performance-low-e coatings, argon fill, thermal breaks-and integration of active environmental systems.',
    GRADUATE: 'Historical analysis of curtain walls examines the interplay of material technology, construction economics, and architectural ideology. The postwar aluminum industry sought new markets; curtain wall construction provided them. Standardization enabled the rapid proliferation of glass towers globally. Energy regulations (increasingly stringent since 1970s) have continuously driven technical innovation. Current challenges include deep energy retrofits of mid-century curtain walls.',
    PHD: 'Curtain wall historiography engages technology transfer, industry organization, and architectural culture. Research examines patent histories, industry standardization processes, and the global diffusion of curtain wall technology. Contemporary scholarship addresses the environmental impact of mid-century glazed buildings and strategies for upgrade or replacement, engaging questions of embodied energy, heritage value, and performance improvement.',
  },

  characteristics: [
    'Non-load-bearing exterior wall',
    'Hangs from structural frame',
    'Typically glass and aluminum',
    'Accommodates building movement',
    'Multiple systems: stick, unitized, structural',
    'Engineered for thermal and moisture performance',
    'Allows maximum daylight and views',
  ],

  famousExamples: [
    { name: 'Lake Shore Drive Apartments', location: 'Chicago, USA', year: '1951', description: 'Mies van der Rohe\'s influential glass-and-steel towers' },
    { name: 'Lever House', location: 'New York City, USA', year: '1952', description: 'SOM\'s pioneering glass curtain wall office building' },
    { name: 'Willis Tower (Sears Tower)', location: 'Chicago, USA', year: '1973', description: 'Bundled tube structure with black aluminum curtain wall' },
    { name: 'Hearst Tower', location: 'New York City, USA', year: '2006', description: 'Foster\'s diagrid with high-performance glazing' },
    { name: 'Shanghai Tower', location: 'Shanghai, China', year: '2015', description: 'Twisted form with double-skin curtain wall' },
  ],

  confusionPairs: [
    {
      elementId: 'load-bearing-wall',
      reason: 'Both are building walls',
      distinction: 'Curtain walls don\'t support the building-they hang from the structure; load-bearing walls carry building weight',
    },
    {
      elementId: 'storefront',
      reason: 'Both are glazed wall systems',
      distinction: 'Curtain walls span multiple floors and hang from structure; storefront is ground-level glazing within wall openings',
    },
  ],

  searchTags: ['facade', 'glass', 'modern', 'skyscraper', 'envelope', 'glazing', 'aluminum', 'non-structural'],

  arMetadata: {
    modelPath: '/models/architecture/curtain-wall.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Aluminum Mullion', position: { x: 0, y: 1, z: 0 } },
      { label: 'Insulated Glazing Unit', position: { x: 0.5, y: 0.5, z: 0.05 } },
      { label: 'Floor Slab Anchor', position: { x: 0, y: 0, z: -0.1 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
