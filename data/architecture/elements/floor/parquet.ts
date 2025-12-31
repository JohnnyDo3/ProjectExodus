import type { ArchitecturalElement } from '../../types';

export const PARQUET: ArchitecturalElement = {
  id: 'parquet',
  slug: 'parquet',
  name: 'Parquet',
  alternativeNames: ['Parquetry', 'Parquet Flooring', 'Wood Block Floor'],
  pronunciation: {
    phonetic: 'par-KAY',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Small enclosed space or compartment',
    rootWord: 'From Old French "parc" (enclosure)',
  },
  category: 'FLOOR',
  subcategory: 'paving',
  periods: ['BAROQUE', 'ROCOCO', 'NEOCLASSICAL', 'VICTORIAN', 'ART_DECO', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/parquet-primary.jpg',
    gallery: [
      '/images/architecture/elements/parquet-herringbone.jpg',
      '/images/architecture/elements/parquet-versailles.jpg',
    ],
    diagram: '/images/architecture/diagrams/parquet-patterns.svg',
  },

  description: {
    ELEMENTARY: 'Parquet is a fancy wooden floor made of small wood pieces arranged in beautiful patterns. The most common pattern looks like a zigzag called herringbone. Kings and queens had parquet floors in their palaces because they\'re so pretty!',
    MIDDLE_SCHOOL: 'Parquet flooring uses small wood blocks or strips arranged in geometric patterns like herringbone, chevron, or basket weave. Developed in 17th-century France for royal palaces, parquet replaced cold marble floors and became a symbol of luxury. Different wood species create color contrasts.',
    HIGH_SCHOOL: 'Parquet consists of wood pieces cut into geometric shapes and assembled into decorative patterns. Classic patterns include herringbone (parallel diagonal pieces), chevron (angled joints), Versailles (interlocking squares), and basket weave. The technique emerged in French palace architecture as an alternative to marble, offering warmth and elaborate artistry.',
    UNDERGRADUATE: 'Parquet flooring represents the intersection of woodworking craft and geometric design. French palace floors established the vocabulary: parquet de Versailles (complex interlocking panels), parquet en point de Hongrie (Hungarian point/chevron), and parquet en fougère (herringbone). Technical considerations include wood species selection, grain orientation for stability, and substrate preparation.',
    GRADUATE: 'Parquet analysis encompasses material science, craft history, and conservation practice. Wood behavior-seasonal expansion, wear patterns, UV degradation-determines installation protocols and maintenance regimes. Historical research examines the transition from site-fitted blocks to factory-produced panels, while conservation addresses challenges of matching historic species and finishes.',
    PHD: 'Parquet studies engage woodworking technology, social history of luxury interiors, and material degradation science. Research topics include the organization of menuisier guilds, the development of standardized block dimensions, and the chemistry of historic finishes from beeswax to shellac. Contemporary investigation addresses lifecycle assessment and reclaimed wood sourcing.',
  },

  history: {
    ELEMENTARY: 'Parquet floors were invented in France about 400 years ago for the Palace of Versailles. The king wanted something warmer than stone floors, so craftsmen created these beautiful wooden patterns. Now parquet floors are used in homes all around the world!',
    MIDDLE_SCHOOL: 'French craftsmen developed parquet in the 1600s for royal palaces, most famously Versailles. The technique replaced marble floors that were cold and required constant maintenance. Parquet became standard in European aristocratic homes and spread globally during the colonial era. Mass production in the 1900s made it accessible to middle-class homes.',
    HIGH_SCHOOL: 'Parquet emerged in 17th-century France when the Galerie d\'Apollon at the Louvre (1661) pioneered wood floors in palace architecture. The Hall of Mirrors at Versailles (1678-1684) showcased elaborate parquet patterns. Industrial-era innovations included steam-bending techniques and factory-cut blocks. The 20th century saw both decline (competition from carpet) and revival (appreciation of natural materials).',
    UNDERGRADUATE: 'The history of parquet traces from French court luxury through industrial democratization. Royal manufactories like Riesener\'s workshop established canonical patterns, while guild regulations ensured quality. The 19th century brought mechanization-circular saws, standardized thicknesses-transforming parquet from aristocratic luxury to bourgeois aspiration. Post-WWII decline reversed in the 1990s with sustainable forestry awareness.',
    GRADUATE: 'Parquet historiography examines technological innovation, social aspiration, and craft transmission. Key developments include the shift from site-fitted "menuiserie" to factory "parqueterie," the impact of New World tropical hardwoods, and the standardization of installation methods. Conservation challenges address historic wood species identification, adhesive residue removal, and finish matching.',
    PHD: 'Research into parquet history engages material culture, labor history, and building archaeology. Dendrochronological dating supports attribution of historic floors. Chemical analysis of finishes reveals maintenance histories. Social history examines parquet as marker of class distinction, from aristocratic display through middle-class imitation to contemporary heritage appreciation.',
  },

  characteristics: [
    'Geometric patterns from wood blocks or strips',
    'Classic patterns: herringbone, chevron, Versailles',
    'Multiple wood species for color contrast',
    'Tongue-and-groove or glued installation',
    'Can be refinished multiple times',
    'Provides warmth and acoustic comfort',
    'Expands and contracts with humidity',
  ],

  famousExamples: [
    { name: 'Hall of Mirrors', location: 'Versailles, France', year: '1678-1684', description: 'Original parquet de Versailles pattern' },
    { name: 'Galerie d\'Apollon', location: 'Louvre, Paris', year: '1661', description: 'First major palace parquet installation' },
    { name: 'Schönbrunn Palace', location: 'Vienna, Austria', year: '18th century', description: 'Elaborate Rococo parquet patterns' },
    { name: 'Winter Palace', location: 'St. Petersburg, Russia', year: '1754-1762', description: 'Imperial Russian parquet with exotic woods' },
    { name: 'Hermès Flagship Store', location: 'Paris, France', year: '2010', description: 'Contemporary interpretation of classic parquet' },
  ],

  confusionPairs: [
    {
      elementId: 'hardwood-flooring',
      reason: 'Both are wooden floors',
      distinction: 'Parquet uses small pieces in geometric patterns; hardwood flooring uses long planks',
    },
    {
      elementId: 'marquetry',
      reason: 'Both involve wood pieces in patterns',
      distinction: 'Parquet is flooring with geometric patterns; marquetry is decorative inlay for furniture or walls',
    },
  ],

  searchTags: ['flooring', 'wood', 'herringbone', 'chevron', 'versailles', 'pattern', 'french', 'palace', 'luxury'],

  arMetadata: {
    modelPath: '/models/architecture/parquet.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Herringbone Pattern', position: { x: 0, y: 0, z: 0 } },
      { label: 'Oak Strips', position: { x: 0.2, y: 0, z: 0.1 } },
      { label: 'Tongue Joint', position: { x: -0.1, y: 0, z: 0.15 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
