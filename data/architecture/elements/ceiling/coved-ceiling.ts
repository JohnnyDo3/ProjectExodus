import type { ArchitecturalElement } from '../../types';

export const COVED_CEILING: ArchitecturalElement = {
  id: 'coved-ceiling',
  slug: 'coved-ceiling',
  name: 'Coved Ceiling',
  alternativeNames: ['Cove Ceiling', 'Curved Cornice', 'Concave Ceiling'],
  pronunciation: {
    phonetic: 'KOHVD SEE-ling',
    language: 'English',
  },
  etymology: {
    origin: 'English/Middle English',
    meaning: 'From "cove" meaning a concave molding or curved recess',
    rootWord: 'Middle English "cove" (hollow, chamber)',
  },
  category: 'CEILING',
  subcategory: 'ceiling_types',
  periods: ['BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS', 'ART_DECO', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/coved-ceiling-primary.jpg',
    gallery: [
      '/images/architecture/elements/coved-ceiling-baroque.jpg',
      '/images/architecture/elements/coved-ceiling-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/coved-ceiling-construction.svg',
  },

  description: {
    ELEMENTARY: 'A coved ceiling has a smooth, curved section where the ceiling meets the walls, instead of a sharp corner. Imagine the ceiling bending gently down to meet the wall-it looks like a big, gentle slide! This curved part is called the cove. Coved ceilings make rooms feel taller and softer. Sometimes lights are hidden in the curve to make the room glow beautifully.',
    MIDDLE_SCHOOL: 'A coved ceiling features a concave, curved transition between the ceiling plane and the wall, eliminating the sharp 90-degree angle. The cove is typically a quarter-circle or similar smooth curve. This design creates a visually softer space and can make rooms appear larger and more elegant. Coved ceilings are often found in theaters, ballrooms, and upscale residences. The cove can be plain plaster or elaborately decorated, and frequently houses indirect lighting fixtures that wash light across the ceiling surface.',
    HIGH_SCHOOL: 'Coved ceilings employ a concave curved surface to transition from vertical wall to horizontal ceiling plane, creating visual continuity and spatial flow. The cove radius typically ranges from 6 inches to several feet depending on room scale. Historically, coved ceilings appeared in Baroque and Neoclassical interiors, often featuring painted decoration or ornamental plasterwork. Modern applications exploit the cove for indirect lighting-concealed fixtures within the curve bounce light off the ceiling, creating ambient illumination without visible sources. Construction methods include plaster-on-lath, drywall with flexible molding, and pre-formed foam or plaster cove sections.',
    UNDERGRADUATE: 'Coved ceiling design addresses visual, acoustic, and lighting considerations. The concave transition softens the ceiling-wall junction, reducing visual harshness and creating perception of greater height through continuous surface flow. Acoustic benefits include reduction of corner flutter echoes and more gradual sound reflection patterns. Lighting design exploits the cove as a concealed fixture location for indirect ambient illumination, with the curved surface providing gradual light diffusion. Historical examples feature painted illusionistic decoration extending architectural space. Construction requires careful geometric layout to maintain consistent curve radius, with material choices ranging from traditional wet plaster to contemporary lightweight systems.',
    GRADUATE: 'Analysis of coved ceiling design integrates spatial perception theory, lighting science, and construction methodology. Research examines how curved ceiling-wall transitions affect perceived room volume and proportion. Baroque and Rococo examples employed coved ceilings as surfaces for quadratura painting, creating illusionistic architectural extensions. Lighting design analysis addresses the photometric performance of cove lighting systems, including fixture selection, spacing, and reflection coefficients for optimal uniformity. Contemporary practice explores parametric cove profiles optimizing multiple performance criteria. Construction research addresses methods for achieving smooth curves in various materials and techniques for integrating services within cove cavities.',
    PHD: 'Coved ceiling research encompasses art historical analysis of decorative traditions, environmental performance optimization, and construction technology. Scholarly investigation examines the role of coved ceilings in Baroque spatial concepts and their revival in Art Deco cinema design. Building science research quantifies acoustic benefits of eliminating sharp ceiling-wall corners and optimizes cove geometry for sound diffusion. Lighting research develops computational models predicting illumination distribution from cove-mounted sources. Conservation studies address deterioration patterns in historic plaster coves and develop intervention strategies. Contemporary research explores digital fabrication methods for complex cove geometries and integration with building environmental systems.',
  },

  history: {
    ELEMENTARY: 'People have been making curved ceiling edges for hundreds of years! In fancy palaces and churches in Europe, builders created beautiful coved ceilings and painted them with colorful pictures. In the 1920s-1930s (Art Deco period), movie theaters had spectacular coved ceilings, often lit up with colored lights. Today, many modern buildings still use coved ceilings because they look elegant and can hide special lighting.',
    MIDDLE_SCHOOL: 'Coved ceilings have ancient precedents but became prominent in European Baroque architecture (17th-18th centuries), where they provided surfaces for elaborate painted decoration. Neoclassical interiors continued the tradition with more restrained ornament. The technique gained renewed popularity in Art Deco theater design (1920s-1930s), often incorporating dramatic indirect lighting. Modern architecture adopted coved ceilings for their spatial qualities and lighting advantages. Contemporary applications range from residential spaces to commercial interiors, with simplified construction methods making them more accessible.',
    HIGH_SCHOOL: 'While curved ceiling-wall transitions appeared in various historical contexts, the coved ceiling as a deliberate design element became prominent in European Baroque architecture. Italian and French Baroque interiors employed coves as surfaces for painted illusionistic architecture extending real space into fictive realms. Neoclassical practice continued coved ceilings with more classical ornamental programs. The Art Deco period (1920s-1930s) embraced coved ceilings in cinema design, using the curves for dramatic indirect lighting effects creating atmospheric experiences. Mid-century modern architecture occasionally employed coves for their spatial qualities. Contemporary practice values coved ceilings for visual softness and lighting integration.',
    UNDERGRADUATE: 'Coved ceiling history reveals evolving relationships between structure, decoration, and technology. Baroque examples served both spatial and iconographic purposes-the curved surface provided optimal geometry for quadratura painting while the cove itself mediated between earthly walls and celestial ceiling imagery. Neoclassical coves often featured classical ornamental programs. The introduction of electric lighting transformed cove function-Art Deco theaters exploited coves for concealed fixtures creating dramatic atmospheric effects. Modern Movement initially rejected decorative coves, but later architects recognized their functional value for lighting. Contemporary practice employs digital tools to design complex cove geometries optimizing acoustic and photometric performance.',
    GRADUATE: 'Scholarly analysis of coved ceilings examines technical, aesthetic, and cultural dimensions across periods. Research on Baroque examples addresses construction methods (timber framing, lath-and-plaster techniques), the relationship between cove geometry and painted programs, and the role of coves in spatial illusion. Art Deco cinema coves represent a transformation from decorative to technical element, with careful design of cove lighting for specific atmospheric effects. Conservation research addresses deterioration patterns in historic plaster coves-settlement cracks, water damage, paint layer instability. Contemporary research explores parametric cove design methods, acoustic optimization of curved surfaces, and photometric modeling of cove lighting systems.',
    PHD: 'Coved ceiling research engages multiple scholarly disciplines. Art historical investigation examines the evolution from structural-decorative element to technical-spatial device. Baroque scholarship analyzes the relationship between cove geometry and illusionistic painting programs, situating coves within broader spatial concepts. Architectural history traces the transformation of coves through stylistic periods and their adaptation to new lighting technologies. Conservation science develops methodology for assessing historic plaster coves and formulating appropriate intervention strategies. Building science research employs computational analysis to optimize cove geometry for acoustic diffusion and lighting distribution. Digital humanities approaches enable analysis of cove profiles across historical examples, revealing design conventions and regional variations.',
  },

  characteristics: [
    'Concave curved transition from wall to ceiling',
    'Eliminates sharp ceiling-wall corner',
    'Creates visual softness and spatial flow',
    'Often houses indirect lighting fixtures',
    'Can feature painted or ornamental decoration',
    'Typically quarter-circle or similar curve profile',
    'Makes rooms appear taller and more spacious',
  ],

  famousExamples: [
    { name: 'Salon de la Guerre, Versailles', location: 'Versailles, France', year: '1678-1686', description: 'Baroque coved ceiling with elaborate painted decoration' },
    { name: 'Radio City Music Hall', location: 'New York, USA', year: '1932', description: 'Art Deco auditorium with dramatic cove lighting' },
    { name: 'Grauman\'s Egyptian Theatre', location: 'Hollywood, USA', year: '1922', description: 'Egyptian Revival coved ceiling with ornamental plaster' },
    { name: 'Banqueting House', location: 'London, England', year: '1622', description: 'Inigo Jones design with painted coved ceiling by Rubens' },
    { name: 'The Breakers Music Room', location: 'Newport, USA', year: '1895', description: 'Gilded Age mansion with ornate coved ceiling' },
  ],

  confusionPairs: [
    {
      elementId: 'coffered-ceiling',
      reason: 'Both are ceiling treatment types',
      distinction: 'Coved ceilings have smooth curved transitions to walls; coffered ceilings have grid patterns of recessed panels',
    },
    {
      elementId: 'tray-ceiling',
      reason: 'Both create ceiling depth variation',
      distinction: 'Coved ceilings curve at wall junction; tray ceilings have raised central section with angled or vertical sides',
    },
  ],

  searchTags: ['ceiling', 'cove', 'curved', 'transition', 'plaster', 'lighting', 'indirect', 'baroque', 'art-deco'],

  arMetadata: {
    modelPath: '/models/architecture/coved-ceiling.glb',
    scale: 0.8,
    rotatable: true,
    annotations: [
      { label: 'Cove Curve', position: { x: 0, y: 0.15, z: 0 } },
      { label: 'Ceiling Plane', position: { x: 0, y: 0.25, z: 0 } },
      { label: 'Wall Junction', position: { x: 0, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
