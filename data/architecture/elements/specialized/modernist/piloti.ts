import type { ArchitecturalElement } from '../../../types';

export const PILOTI: ArchitecturalElement = {
  id: 'piloti',
  slug: 'piloti',
  name: 'Piloti',
  alternativeNames: ['Pilotis', 'Stilts', 'Ground-level Columns'],
  pronunciation: {
    phonetic: 'pih-LOH-tee',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Stilts or piles',
    rootWord: 'pilotis',
  },
  category: 'STRUCTURAL',
  subcategory: 'modernist_principles',
  periods: ['international-style', 'brutalism', 'sustainable'],
  regions: ['WESTERN_EUROPE', 'SOUTH_AMERICA', 'ASIA', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/piloti-primary.jpg',
    gallery: [
      '/images/architecture/elements/piloti-villa-savoye.jpg',
      '/images/architecture/elements/piloti-unite.jpg',
    ],
    diagram: '/images/architecture/diagrams/piloti.svg',
  },

  description: {
    ELEMENTARY: 'Piloti are strong columns that lift a building up off the ground, like a house on stilts! This creates a covered area underneath where people can walk, play, or park cars. It\'s like the building is floating above the ground.',
    MIDDLE_SCHOOL: 'Piloti are reinforced concrete or steel columns that elevate the main body of a building above ground level, creating a free, open space below. This was one of Le Corbusier\'s "Five Points of Architecture" and allows the ground to remain open for circulation, parking, or gardens while maximizing usable space.',
    HIGH_SCHOOL: 'Piloti represent a fundamental principle of Modern architecture, liberating the ground plane from the building\'s mass. By using reinforced concrete columns to elevate the structure, architects created covered outdoor spaces while maintaining visual and physical transparency. This technique also improved ventilation, protected against flooding, and expressed the structural honesty central to Modernist ideology.',
    UNDERGRADUATE: 'The piloti system, codified by Le Corbusier in his 1927 Five Points of New Architecture, exploits the structural capabilities of reinforced concrete to separate the building from the ground. This solution addresses multiple concerns: liberating the ground for circulation and greenery, elevating living spaces away from moisture and pests, creating covered public spaces, and expressing the structural frame independently from enclosure walls.',
    GRADUATE: 'Piloti embody the Modernist rejection of massive masonry bases in favor of a skeletal frame system. The technique demonstrates the structural logic of post-and-beam construction, where columns carry loads to the foundation while freeing the ground plane. Beyond functional advantages, piloti create phenomenological experiences of lightness and transparency, while their deployment in social housing (Unité d\'Habitation) reflects ideological commitments to communal space and rational urbanism.',
    PHD: 'The piloti system represents a convergence of technological innovation, formal exploration, and social theory in Modern architecture. Analysis must consider both its technical precedents (19th-century iron construction, Hennebique\'s concrete systems) and its theoretical implications (urban planning, public/private boundaries, the "free plan"). Critical examination reveals tensions between the utopian promise of liberated ground space and practical realities of security, climate control, and maintenance. The global dissemination of piloti raises questions about technological transfer and cultural adaptation.',
  },

  history: {
    ELEMENTARY: 'The famous architect Le Corbusier invented piloti in the 1920s when he wanted to make buildings that were healthier and gave people more space to enjoy. His most famous building on piloti is Villa Savoye in France, built in 1929.',
    MIDDLE_SCHOOL: 'Le Corbusier developed the piloti concept in the 1920s as part of his revolutionary approach to architecture. The Villa Savoye (1929) demonstrated how piloti could lift a house above the landscape. After World War II, piloti became common in apartment buildings and institutional structures worldwide, especially in tropical climates where the elevated design improved ventilation.',
    HIGH_SCHOOL: 'Piloti emerged from Le Corbusier\'s theoretical work in the 1920s, first realized in projects like the Villa Stein (1927) and perfected in Villa Savoye (1929-31). The concept spread through CIAM (Congrès Internationaux d\'Architecture Moderne) and became fundamental to International Style architecture. Post-war reconstruction saw piloti applied to mass housing, notably in Le Corbusier\'s Unité d\'Habitation (1952) and Oscar Niemeyer\'s work in Brasília.',
    UNDERGRADUATE: 'The piloti emerged from Le Corbusier\'s engagement with Dom-ino House (1914-15), which established the reinforced concrete frame as basis for architectural freedom. The technique was theorized in "Vers une architecture" (1923) and the Five Points (1927), then demonstrated in a series of villas. Post-war applications expanded the scale from individual houses to large housing blocks (Unité d\'Habitation, 1947-52) and entire cities (Chandigarh, Brasília), though these experiments revealed both possibilities and problems of elevated urbanism.',
    GRADUATE: 'Historiographically, piloti must be situated within broader developments in reinforced concrete technology (Perret, Maillart) and functionalist theory. Le Corbusier\'s formulation synthesized structural rationalism with formal experimentation and social vision. The dissemination of piloti through CIAM and architectural education created a global Modern language, though regional adaptations varied significantly-from the climatic responses of tropical Modernism to the monumental deployments in Brasília. Critical assessment must address both successes (ventilation, flexibility) and failures (dead spaces, security issues).',
    PHD: 'Scholarly analysis of piloti encompasses multiple dimensions: technological history of reinforced concrete, formal analysis of spatial effects, social history of collective housing, and critical examination of Modernist urbanism. Key questions include: the relationship between structural necessity and formal expression, the success of piloti in creating genuinely public space, the cultural specificity of a supposedly universal technique, and the long-term performance of elevated buildings. Reception studies trace both orthodox implementations and critical reinterpretations (New Brutalism, Metabolism, contemporary sustainability).',
  },

  characteristics: [
    'Reinforced concrete or steel columns elevating building',
    'Free, open ground plane beneath structure',
    'Visual lightness and structural transparency',
    'Creates covered outdoor space',
    'Separates building from ground moisture',
    'Allows circulation and landscape to flow under building',
  ],

  famousExamples: [
    { name: 'Villa Savoye', location: 'Poissy, France', year: '1929-1931', description: 'Le Corbusier\'s canonical example of the Five Points including piloti' },
    { name: 'Unité d\'Habitation', location: 'Marseille, France', year: '1947-1952', description: 'Massive housing block elevated on piloti with communal spaces below' },
    { name: 'Ministry of Education and Health', location: 'Rio de Janeiro, Brazil', year: '1936-1943', description: 'Le Corbusier, Niemeyer, Costa - tropical Modernism on piloti' },
    { name: 'Secretariat Building', location: 'Chandigarh, India', year: '1952-1958', description: 'Le Corbusier\'s government building elevated on monumental piloti' },
    { name: 'National Congress of Brazil', location: 'Brasília, Brazil', year: '1958-1960', description: 'Niemeyer\'s iconic design with towers on piloti flanking domed chambers' },
  ],

  confusionPairs: [
    {
      elementId: 'colonnade',
      reason: 'Both involve series of columns',
      distinction: 'Piloti specifically elevate the building mass, creating open ground; colonnade is a covered walkway with columns supporting a roof',
    },
  ],

  searchTags: ['piloti', 'corbusier', 'modern', 'columns', 'elevated', 'stilts', 'five points', 'international style', 'concrete', 'open ground'],

  arMetadata: {
    modelPath: '/models/architecture/piloti.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Elevated Building Mass', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Piloti Columns', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Free Ground Plane', position: { x: 0, y: 0.05, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
