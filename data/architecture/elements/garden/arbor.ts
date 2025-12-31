import type { ArchitecturalElement } from '../../types';

export const ARBOR: ArchitecturalElement = {
  id: 'arbor',
  slug: 'arbor',
  name: 'Arbor',
  alternativeNames: ['Garden Arch', 'Bower', 'Trellis Arch', 'Rose Arch'],
  pronunciation: {
    phonetic: 'AR-bor',
    language: 'English/Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Tree or shaded garden place',
    rootWord: 'From Latin "arbor" (tree), later applied to garden structures supporting plants',
  },
  category: 'GARDEN',
  subcategory: 'garden_structures',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'VICTORIAN', 'ARTS_AND_CRAFTS', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'ENGLAND', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/arbor-primary.jpg',
    gallery: [
      '/images/architecture/elements/arbor-roses.jpg',
      '/images/architecture/elements/arbor-entrance.jpg',
    ],
    diagram: '/images/architecture/diagrams/arbor-construction.svg',
  },

  description: {
    ELEMENTARY: 'An arbor is like a doorway or tunnel in a garden covered with plants! It\'s usually an arch made of wood or metal where roses, vines, or other climbing plants grow. Walking under an arbor covered with flowers feels magical! Some arbors have benches inside where you can sit surrounded by blooms.',
    MIDDLE_SCHOOL: 'An arbor is a garden structure consisting of a framework-typically an arch or short tunnel-supporting climbing plants. Smaller and more specific than pergolas, arbors commonly mark entrances, frame gates, or shelter benches. Construction materials include wood (traditional), metal (wrought iron, steel), or vinyl. Roses are the classic arbor plant, but wisteria, clematis, and honeysuckle are also popular. Arbors create intimate, romantic garden moments.',
    HIGH_SCHOOL: 'The arbor is an arched or tunnel-like garden structure providing support for climbing plants while creating framed passages or seating alcoves. Scale distinguishes arbors from pergolas-arbors are typically single-arch or short-tunnel elements rather than extended walkways. Structural design must accommodate mature plant weight. Arbors function as thresholds between garden rooms, frames for gates or paths, and backdrops for benches. The plant-covered form creates intimate, shaded spaces.',
    UNDERGRADUATE: 'Arbor design integrates structural engineering, horticultural requirements, and spatial design. Structural considerations include arch geometry, lateral bracing, and foundation depth for plant-loaded structures. Material selection affects durability and aesthetic-rustic wood, formal ironwork, low-maintenance composites. Plant selection determines maintenance requirements and seasonal appearance. The arbor creates architectural definition in the garden-marking transitions, framing views, and establishing human-scale intimacy. Contemporary practice ranges from traditional to minimalist interpretations.',
    GRADUATE: 'Arbor analysis encompasses garden history, structural design, and horticultural science. Research examines historical precedents (medieval turf bowers, Renaissance garden arches), construction methods across materials, and plant-structure integration. The arbor\'s role in garden spatial organization-as threshold, frame, and room definition-engages landscape architectural theory. Conservation of historic arbors involves assessing structural integrity while managing long-established plant material. Contemporary research explores arbor roles in accessible garden design.',
    PHD: 'Research into arbors engages garden history, material culture, and landscape theory. Scholarly investigation examines literary and artistic representations of bower spaces, the evolution of garden arch forms through pattern books, and regional variations in construction and planting traditions. Current research addresses the arbor\'s symbolism in courtship and marriage customs, the relationship between arbors and medieval herber traditions, and engineering analysis of historic ironwork arbor structures.',
  },

  history: {
    ELEMENTARY: 'People have been making plant-covered arches and bowers for thousands of years! Medieval gardens had shady places covered with vines for sitting and relaxing. Victorian gardens loved rose arbors-special arches covered with climbing roses. Today, arbors are popular in gardens everywhere, often at entrances to make them feel special and welcoming.',
    MIDDLE_SCHOOL: 'Medieval gardens featured turf-benched bowers-plant-covered sitting areas. Renaissance gardens incorporated architectural trellis arches. The Victorian era popularized rose arbors, often made from rustic wood or elegant cast iron. Pattern books disseminated designs widely. Arts and Crafts gardens featured arbors as romantic elements. Contemporary landscape design continues the tradition, with materials expanded to include powder-coated steel and composite materials.',
    HIGH_SCHOOL: 'Medieval herbers (garden rooms) included plant-covered bowers for contemplation and courtship. Renaissance garden design formalized trellis structures. Victorian gardening enthusiasm-enabled by new rose cultivars and mass-produced ironwork-made arbors ubiquitous. Pattern books (J.C. Loudon) provided designs for home construction. Arts and Crafts designers (Jekyll, Lutyens) integrated arbors into total garden designs. Contemporary practice balances traditional forms with modern materials and design sensibilities.',
    UNDERGRADUATE: 'Arbor history reflects garden fashion, material technology, and social customs. Medieval bower traditions created private spaces within larger gardens. Renaissance architectural treatises incorporated garden structures. Victorian industrialization democratized arbor ownership-pattern books and pre-fabricated components made garden ornamentation accessible. The arbor\'s association with romance and courtship appears consistently across periods. Contemporary arbor design ranges from historical reproduction to minimalist abstraction.',
    GRADUATE: 'Historical analysis of arbors examines garden treatises, pattern books, and material culture. Research addresses medieval literary descriptions of bowers, Renaissance garden architectural programs, and Victorian manufacturing of cast-iron garden structures. Pattern book analysis reveals design dissemination and regional variations. Conservation challenges include preserving fragile ironwork and managing historic plant material. Contemporary scholarship examines arbors in wedding garden design and accessible landscape architecture.',
    PHD: 'Arbor scholarship engages garden history, material culture studies, and literary analysis. Methodologies include close reading of medieval romance literature (bower settings), analysis of pattern books and trade catalogs, and archaeological investigation of garden structures. Current research examines the arbor\'s role in gendered garden spaces, the relationship between arbor forms and courtship customs, comparative analysis with similar structures across cultures (Japanese torii-influenced garden gates), and conservation science for historic ironwork.',
  },

  characteristics: [
    'Arched or tunnel-like framework',
    'Smaller scale than pergola',
    'Supports climbing plants',
    'Often marks entrances or gates',
    'May shelter bench or seating',
    'Creates framed passage',
    'Materials: wood, metal, composite',
  ],

  famousExamples: [
    { name: 'Monet\'s Garden Rose Arches', location: 'Giverny, France', year: '1890s-1920s', description: 'Impressionist painter\'s famous rose-covered arbors' },
    { name: 'Sissinghurst White Garden Arbors', location: 'Kent, UK', year: '1930s', description: 'Vita Sackville-West\'s romantic garden arbors' },
    { name: 'Butchart Gardens Rose Arbor', location: 'British Columbia, Canada', year: '1920s', description: 'Extensive rose arbor pergola system' },
    { name: 'Brooklyn Botanic Garden Arbors', location: 'New York, USA', year: '1917-present', description: 'Historic wisteria and rose arbors' },
    { name: 'Alnwick Garden Poison Garden Arbor', location: 'Northumberland, UK', year: '2005', description: 'Contemporary arbor entrance to unique garden' },
  ],

  confusionPairs: [
    {
      elementId: 'pergola',
      reason: 'Both are structures for climbing plants',
      distinction: 'Arbors are smaller arch structures often at entrances; pergolas are larger walkway structures with open beam roofs',
    },
    {
      elementId: 'trellis',
      reason: 'Both support climbing plants',
      distinction: 'Arbors are three-dimensional arched structures you walk through; trellises are flat frameworks attached to walls',
    },
    {
      elementId: 'gazebo',
      reason: 'Both are garden structures',
      distinction: 'Arbors are open arches for plants; gazebos are enclosed pavilions with solid roofs',
    },
  ],

  searchTags: ['garden', 'arch', 'roses', 'entrance', 'bower', 'vines', 'climbing plants', 'trellis', 'romantic'],

  arMetadata: {
    modelPath: '/models/architecture/arbor.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Arch Frame', position: { x: 0, y: 2, z: 0 } },
      { label: 'Side Posts', position: { x: 0.8, y: 1, z: 0 } },
      { label: 'Plant Support Lattice', position: { x: 0.5, y: 1.5, z: 0.2 } },
      { label: 'Base/Foundation', position: { x: 0.8, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
