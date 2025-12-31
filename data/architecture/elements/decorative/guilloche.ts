import type { ArchitecturalElement } from '../../types';

export const GUILLOCHE: ArchitecturalElement = {
  id: 'guilloche',
  slug: 'guilloche',
  name: 'Guilloche',
  alternativeNames: ['Guilloche Pattern', 'Interlaced Band', 'Braided Ornament', 'Running Scroll'],
  pronunciation: {
    phonetic: 'gee-LOHSH',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Engine-turned pattern or tool for creating such patterns',
    rootWord: 'Guillaume (French proper name), possibly from the tool inventor',
  },
  category: 'DECORATIVE',
  subcategory: 'classical_ornament',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'BYZANTINE', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS', 'ART_DECO'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'MIDDLE_EAST', 'NORTH_AMERICA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/guilloche-primary.jpg',
    gallery: [
      '/images/architecture/elements/guilloche-detail.jpg',
      '/images/architecture/elements/guilloche-variations.jpg',
    ],
    diagram: '/images/architecture/diagrams/guilloche-pattern.svg',
  },

  description: {
    ELEMENTARY: 'A guilloche is a decorative pattern that looks like interwoven ribbons or ropes making circles and curves. Imagine braiding three strands together in a continuous pattern that goes around and around. This fancy design appears on borders of buildings, making them look elegant and flowing.',
    MIDDLE_SCHOOL: 'The guilloche is an ornamental pattern consisting of two or more interlacing curved bands forming a series of circular or oval spaces. This continuous running ornament creates a rhythmic, wave-like design often used in friezes, borders, and moldings. The pattern can be simple with two bands or complex with multiple interweaving strands, sometimes with rosettes or other ornaments filling the spaces.',
    HIGH_SCHOOL: 'The guilloche represents a sophisticated ornamental motif featuring interlaced bands that create a continuous pattern of oval or circular voids. This complex geometric ornament demonstrates mathematical precision in its repeating curves and intersections. Classical examples often incorporate three interwoven bands, with the spaces between filled with rosettes, palmettes, or other decorative elements. The guilloche\'s flowing rhythm makes it particularly effective for horizontal borders and curved surfaces.',
    UNDERGRADUATE: 'The guilloche pattern constitutes a fundamental element of classical ornamental vocabulary, characterized by precise geometric interlacing of curved bands. The pattern\'s construction follows mathematical principles governing the radius of curves, spacing of intersections, and proportions of interstitial spaces. Classical conventions typically specify two or three interlacing bands, though more complex variations exist. The guilloche\'s effectiveness derives from its combination of geometric precision with organic flowing movement, creating visual interest through repetition with variation.',
    GRADUATE: 'Guilloche ornament demonstrates sophisticated understanding of geometric pattern generation and visual rhythm in classical design. The pattern\'s construction requires careful calculation of curve radii, intersection points, and spatial relationships to maintain continuity and balance. Roman examples show various levels of complexity, from simple two-strand patterns to elaborate multi-band compositions with decorated interstitial spaces. Renaissance architects studied ancient examples and developed systematic approaches to guilloche design, often incorporating the pattern into broader ornamental schemes. The guilloche\'s adaptability to both rectilinear and curved surfaces made it valuable for diverse architectural applications.',
    PHD: 'The guilloche presents rich opportunities for research examining ornamental geometry, craft practice, and cultural transmission. Technical analysis investigates ancient layout methods, including compass-and-straightedge constructions and the potential use of templates. Cross-cultural studies trace guilloche-like patterns in Celtic, Islamic, and Asian art, raising questions about independent invention versus cultural exchange. The Renaissance codification of guilloche proportions through pattern books created standardized versions while ancient examples show considerable variation. Contemporary research applies computational geometry to analyze pattern generation, digital humanities methods to trace stylistic evolution, and conservation science to study tool marks and carving techniques.',
  },

  history: {
    ELEMENTARY: 'The guilloche pattern goes back thousands of years to ancient Greece and Rome. Artists carved these interwoven patterns into temples and palaces to make them beautiful. The pattern got its French name much later because French craftsmen used special tools to create similar designs. Architects loved this pattern so much they kept using it for over 2,000 years!',
    MIDDLE_SCHOOL: 'Guilloche patterns appeared in ancient Greek architecture by the 5th century BCE, used in temple friezes and altars. Romans adopted and elaborated the motif, applying it to buildings, monuments, and decorative arts. The pattern remained popular through Byzantine and Renaissance periods. The French name "guilloche" emerged in the 18th century, derived from engine-turning tools that created similar interlaced patterns on metalwork. Neoclassical and Art Deco movements both featured guilloche prominently.',
    HIGH_SCHOOL: 'The guilloche\'s origins trace to Classical Greek ornament, where it appeared on architectural friezes, altar bases, and pottery. The Erechtheion in Athens features sophisticated guilloche borders. Romans extensively employed guilloche on monuments like the Ara Pacis, often combining it with acanthus scrolls. Byzantine artists transformed the pattern into more stylized geometric versions. Renaissance architects revived classical guilloche through archaeological study, while 18th-century French decorative artists gave the pattern its modern name and applied it to furniture and metalwork.',
    UNDERGRADUATE: 'Guilloche development reveals the evolution of geometric ornament across periods. Early Greek examples show careful hand-laid-out patterns with subtle irregularities. Roman workshops developed more standardized approaches, as evidenced by the consistent guilloche bands on Augustan monuments. The pattern\'s mathematical properties made it suitable for teaching design principles in Renaissance architectural academies. Pattern books by Serlio and others documented various guilloche types. The 18th-century association with engine-turning in decorative arts influenced architectural applications, creating more precise, mechanically regular versions.',
    GRADUATE: 'Scholarly examination of guilloche addresses questions of pattern generation, workshop practice, and cultural meaning. Archaeological analysis of Greek and Roman examples reveals layout techniques, including compass marks and geometric constructions. The pattern\'s appearance across diverse cultures (Celtic knotwork, Islamic geometric patterns, Chinese interlace) raises questions about universal geometric principles versus cultural diffusion. Renaissance treatises show how architects reconstructed ancient guilloche from fragmentary evidence, sometimes creating "improved" versions. Modern studies examine guilloche through symmetry theory and fractal geometry, revealing mathematical properties that may explain the pattern\'s perennial appeal.',
    PHD: 'The guilloche serves as an exemplary subject for interdisciplinary research combining mathematics, archaeology, art history, and cognitive science. Key research areas include: geometric analysis of pattern generation algorithms; technical studies of ancient and Renaissance carving methods using tool mark analysis and experimental archaeology; cross-cultural examination of interlaced patterns exploring universals in human visual perception; investigation of pattern book transmission networks in early modern Europe; digital reconstruction of ancient guilloche using computational geometry; and cognitive studies of why interlaced patterns attract human attention. Contemporary research also explores guilloche through semiotic frameworks examining ornamental meaning and through conservation science addressing deterioration of carved patterns.',
  },

  characteristics: [
    'Two or more interlacing curved bands',
    'Creates continuous series of circular or oval spaces',
    'Mathematically precise geometric construction',
    'Often includes rosettes or ornaments in interstitial spaces',
    'Used primarily in horizontal borders and friezes',
    'Combines geometric precision with flowing organic movement',
  ],

  famousExamples: [
    { name: 'Erechtheion', location: 'Athens, Greece', year: '421-406 BCE', description: 'Elegant guilloche borders on the famous porch' },
    { name: 'Ara Pacis', location: 'Rome, Italy', year: '13-9 BCE', description: 'Complex guilloche with acanthus scrolls' },
    { name: 'Arch of Constantine', location: 'Rome, Italy', year: '315 CE', description: 'Guilloche bands in frieze decoration' },
    { name: 'Basilica of San Vitale', location: 'Ravenna, Italy', year: '547 CE', description: 'Byzantine stylized guilloche in mosaic borders' },
    { name: 'Library of Congress', location: 'Washington D.C., USA', year: '1897', description: 'Beaux-Arts guilloche in ornamental plasterwork' },
  ],

  confusionPairs: [
    {
      elementId: 'wave-scroll',
      reason: 'Both are flowing continuous ornamental bands',
      distinction: 'Guilloche features interlacing bands creating enclosed spaces; wave scroll is a single undulating vine or ribbon',
    },
    {
      elementId: 'celtic-knot',
      reason: 'Both feature interlaced patterns',
      distinction: 'Guilloche uses circular/oval rhythmic patterns; Celtic knots form closed loops with over-under weaving',
    },
  ],

  searchTags: ['interlace', 'geometric', 'pattern', 'band', 'ornament', 'classical', 'border', 'frieze', 'braided', 'guilloche'],

  arMetadata: {
    modelPath: '/models/architecture/guilloche.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Interlacing Band', position: { x: -0.1, y: 0, z: 0.05 } },
      { label: 'Oval Space', position: { x: 0, y: 0.05, z: 0 } },
      { label: 'Intersection Point', position: { x: 0.1, y: 0, z: 0.05 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
