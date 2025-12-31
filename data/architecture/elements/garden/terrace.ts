import type { ArchitecturalElement } from '../../types';

export const TERRACE: ArchitecturalElement = {
  id: 'terrace',
  slug: 'terrace',
  name: 'Terrace',
  alternativeNames: ['Garden Terrace', 'Platform Garden', 'Raised Level', 'Terrazza'],
  pronunciation: {
    phonetic: 'TAIR-iss',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Earth or level ground',
    rootWord: 'From Latin "terra" (earth) via Old French "terrasse"',
  },
  category: 'GARDEN',
  subcategory: 'spatial_organization',
  periods: ['ANCIENT_MESOPOTAMIAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['MESOPOTAMIA', 'ITALY', 'FRANCE', 'BRITAIN', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/terrace-primary.jpg',
    gallery: [
      '/images/architecture/elements/terrace-italian.jpg',
      '/images/architecture/elements/terrace-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/terrace-section.svg',
  },

  description: {
    ELEMENTARY: 'A terrace is like a flat outdoor floor built on a hillside! Imagine giant stairs where each step is big enough for a whole garden. Terraces make steep hills easier to walk on and create flat spaces for gardens, patios, or playing. You might have steps or ramps to go from one terrace to the next.',
    MIDDLE_SCHOOL: 'A garden terrace is a level platform created by excavating and/or building up earth, typically on sloped sites. Retaining walls hold the soil in place, creating distinct horizontal levels. Terraces serve multiple purposes-managing slope for cultivation, creating outdoor living spaces, organizing garden layouts, and providing views. The transition between terrace levels employs stairs, ramps, or cascading water features.',
    HIGH_SCHOOL: 'The terrace is a leveled platform carved from or built upon sloped terrain, creating horizontal surfaces for planting, circulation, or activity. Construction requires retaining walls to resist soil pressure, drainage systems to prevent water accumulation, and transitions between levels. Terracing enables cultivation on slopes (preventing erosion), creates distinct spatial zones, and choreographs sequential movement through gardens. Italian Renaissance gardens perfected the dramatic terraced hillside garden.',
    UNDERGRADUATE: 'Terrace design integrates geotechnical engineering, landscape architecture, and spatial composition. Technical considerations include retaining wall design (gravity walls, reinforced structures), drainage systems (weep holes, french drains), and slope stability calculations. Aesthetic considerations address level-to-level relationships, proportion of horizontal to vertical dimensions, and the integration of stairs, ramps, and water features. The terrace serves as spatial organizer, creating distinct garden rooms and controlling views through vertical separation.',
    GRADUATE: 'Terrace analysis encompasses civil engineering, garden history, and environmental science. Research examines historical construction techniques (dry-stone walls, hydraulic lime concrete), the evolution of terraced garden design from functional agriculture to ornamental display, and the environmental performance of terraces in erosion control and microclimate creation. Contemporary practice addresses sustainable retaining wall construction, stormwater management integration, and accessibility requirements for level transitions.',
    PHD: 'Research into terraces addresses agricultural history, construction technology, and landscape preservation. Investigations include the ancient development of terrace agriculture (Mesopotamian hanging gardens, Andean terraces), the Renaissance theorization of hillside garden design, and the engineering of large-scale terrace systems. Methodologies include archaeological investigation of ancient terrace structures, geotechnical analysis of retaining wall stability, and environmental monitoring of terrace microclimates. Current scholarship examines sustainable terrace construction, the conservation of historic terraced landscapes, and the revival of terrace agriculture for sustainable food production.',
  },

  history: {
    ELEMENTARY: 'Ancient people built terraces to grow food on mountains and hillsides-like the famous Machu Picchu in Peru! The Hanging Gardens of Babylon (one of the Seven Wonders) might have been amazing terraces with trees and flowers. Italian gardens like the Villa d\'Este have spectacular terraces with fountains flowing from one level down to the next.',
    MIDDLE_SCHOOL: 'Ancient civilizations developed terrace agriculture-Mesopotamian hanging gardens, Andean terraces, Asian rice paddies. Renaissance Italy transformed agricultural terracing into ornamental hillside gardens (Villa d\'Este, Villa Lante). French baroque gardens adapted terracing to flatter sites for spatial organization. English landscape tradition used terraces as architectural transitions between houses and parks. Modernist architects integrated terraces as outdoor rooms.',
    HIGH_SCHOOL: 'Ancient terrace agriculture enabled cultivation on steep terrain-Mesopotamian ziggurats may have featured terraced gardens. Renaissance Italy exploited hillside sites for dramatic villa gardens with cascading terraces (Villa d\'Este, 1560s). French terraces served more decorative purposes on gentler slopes. English landscape movement critiqued formal terracing but maintained terraces adjacent to architecture. Arts and Crafts designers (Jekyll, Lutyens) reintegrated terraces with vernacular walls and plantings.',
    UNDERGRADUATE: 'Terrace history reveals changing relationships between topography, engineering, and aesthetics. Ancient terracing primarily served agricultural productivity while creating monumental landscape forms. Renaissance garden theory exploited terraces for theatrical effects and spatial progression-ascending terraces increased status and revealed expanding views. French adaptation to flatter topography emphasized horizontal parterre terraces. English naturalistic tradition rejected terracing except near buildings. Modernist architecture integrated terraces as extensions of interior space.',
    GRADUATE: 'Historical analysis of terraces examines engineering practice, garden theory, and land use patterns. Research addresses the construction technology of ancient agricultural terraces, the design principles of Renaissance hillside gardens, and the social meaning of terraced landscapes (productive versus ornamental). Conservation challenges include stabilizing historic retaining walls, managing drainage in terraced gardens, and balancing preservation with accessibility requirements for steep sites.',
    PHD: 'Terrace scholarship engages multiple disciplines: agricultural history (terrace farming systems), geotechnical engineering (retaining wall analysis), and cultural landscape studies (preservation of terraced sites). Methodologies include archaeological investigation of ancient terrace structures, archival research in garden treatises and estate records, and geomorphological analysis of terrace landscape evolution. Current research examines the sustainability of terrace agriculture in climate change scenarios, the structural conservation of historic terraced gardens, and the cultural landscape significance of terraced sites as UNESCO World Heritage properties.',
  },

  characteristics: [
    'Level platforms on sloped terrain',
    'Retaining walls hold soil',
    'Creates distinct spatial levels',
    'Requires drainage systems',
    'Stairs or ramps connect levels',
    'Enables cultivation on slopes',
    'Organizes sequential garden spaces',
  ],

  famousExamples: [
    { name: 'Villa d\'Este Terraces', location: 'Tivoli, Italy', year: '1550-1572', description: 'Renaissance hillside garden with dramatic cascading terraces' },
    { name: 'Terraces at Versailles', location: 'Versailles, France', year: '1660s-1680s', description: 'Baroque palace terraces overlooking formal gardens' },
    { name: 'Hestercombe Gardens', location: 'Somerset, UK', year: '1906', description: 'Lutyens and Jekyll terraced Arts and Crafts garden' },
    { name: 'Machu Picchu Agricultural Terraces', location: 'Cusco Region, Peru', year: '1450s', description: 'Incan terraced agricultural complex at high altitude' },
    { name: 'Getty Center Gardens', location: 'Los Angeles, USA', year: '1997', description: 'Robert Irwin\'s modernist terraced garden design' },
  ],

  confusionPairs: [
    {
      elementId: 'cascade',
      reason: 'Both involve multiple levels in gardens',
      distinction: 'Terraces are horizontal platforms for planting and activity; cascades are water features flowing down steps',
    },
    {
      elementId: 'parterre',
      reason: 'Both are formal garden elements',
      distinction: 'Terraces are raised level platforms; parterres are ornamental garden beds, typically on a single level',
    },
  ],

  searchTags: ['platform', 'level', 'retaining wall', 'hillside', 'slope', 'renaissance', 'italian', 'steps', 'garden'],

  arMetadata: {
    modelPath: '/models/architecture/terrace.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Upper Terrace Level', position: { x: 0, y: 1, z: 0 } },
      { label: 'Retaining Wall', position: { x: 0, y: 0.5, z: 0.5 } },
      { label: 'Terrace Steps', position: { x: 0.5, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
