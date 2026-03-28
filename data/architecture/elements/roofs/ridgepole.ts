import type { ArchitecturalElement } from '../../types';

export const RIDGEPOLE: ArchitecturalElement = {
  id: 'ridgepole',
  slug: 'ridgepole',
  name: 'Ridgepole',
  alternativeNames: ['Ridge Beam', 'Ridge Board', 'Ridge Piece', 'Rooftree'],
  pronunciation: {
    phonetic: 'RIJ-pohl',
    language: 'English',
  },
  etymology: {
    origin: 'Old English',
    meaning: 'The horizontal beam at the peak of a roof',
    rootWord: 'From Old English "hrycg" (ridge) and "pāl" (pole/stake)',
  },
  category: 'ROOF',
  subcategory: 'framing',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'COLONIAL', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/ridgepole-primary.jpg',
    gallery: [
      '/images/architecture/elements/ridgepole-timber-frame.jpg',
      '/images/architecture/elements/ridgepole-cathedral.jpg',
    ],
    diagram: '/images/architecture/diagrams/ridgepole-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'A ridgepole is the very top beam of a roof — the highest piece of wood that runs along the peak where the two sides of the roof meet. It\'s like the backbone of a roof, holding everything together at the top!',
    MIDDLE_SCHOOL: 'The ridgepole (or ridge beam) is the horizontal timber that runs along the apex of a pitched roof. Rafters attach to it from both sides, meeting at the peak. It\'s one of the most important structural members in traditional roof framing, distributing loads evenly down both slopes.',
    HIGH_SCHOOL: 'The ridgepole serves as the highest horizontal member in a roof system, running the full length of the building at the apex. In traditional timber framing, it receives the upper ends of opposing rafters and transfers their loads to gable-end walls or king posts. Ridge beams differ from ridge boards in their load-bearing capacity — beams carry structural loads while boards primarily provide alignment.',
    UNDERGRADUATE: 'Ridgepole construction represents fundamental structural logic in pitched-roof systems. The member functions differently across traditions: in common rafter systems, the ridge board merely aligns rafter pairs; in purlin-and-ridgepole systems (as in Japanese and Scandinavian traditions), the ridge beam carries significant gravity loads transmitted through purlins. Material selection — from hewn timber to engineered lumber to steel — reflects evolving structural demands and span requirements.',
    GRADUATE: 'Analysis of ridgepole systems reveals regional timber-framing traditions and their structural philosophies. Nordic stavkirke construction centers the entire roof system on a massive ridgepole supported by internal post-and-beam frames. Japanese traditional construction (wayō) uses the munagi (棟木) as a ceremonial and structural crown. Contemporary engineering distinguishes ridge beams (structural, supporting rafter loads) from ridge boards (non-structural, providing nailing surface), with implications for connection design and load paths.',
    PHD: 'Ridgepole research intersects structural engineering, ethnography, and architectural history. Cross-cultural studies reveal the symbolic significance of ridge-raising ceremonies (Scandinavian, Japanese, Germanic traditions) as markers of construction completion. Structural analysis examines load distribution in heavy timber ridgepole systems versus light-frame ridge board assemblies. Conservation challenges include assessment of historic timber ridgepoles for decay, insect damage, and structural adequacy under modern loading codes.',
  },

  history: {
    ELEMENTARY: 'People have been using ridgepoles for thousands of years — as long as they\'ve been building houses with pointed roofs! In many cultures, placing the ridgepole was celebrated with a special ceremony because it meant the building was almost finished.',
    MIDDLE_SCHOOL: 'Ridgepoles have been used since ancient times in virtually every culture that builds pitched roofs. Viking longhouses featured massive ridgepoles supported by interior posts. Japanese temples celebrate the raising of the ridgepole (muneage) with special ceremonies. Medieval European timber-frame buildings relied on ridgepoles as critical structural members.',
    HIGH_SCHOOL: 'The ridgepole is among the oldest structural elements in architecture. Neolithic longhouses used ridgepoles supported by forked posts. Norse and Germanic building traditions centered their construction sequence around the ridgepole, and "topping out" ceremonies marking its placement persist today. The transition from heavy timber ridgepoles to dimensional lumber ridge boards accompanied the shift to balloon and platform framing in the 19th century.',
    UNDERGRADUATE: 'Ridgepole evolution tracks the development of roof framing technology. Ancient and medieval systems relied on substantial ridge beams as primary structural members, often requiring complex joinery (scarf joints, lap joints) to achieve building length. The industrial revolution\'s standardized lumber enabled lighter ridge boards in rafter-pair systems. Regional variations persist: Japanese munagi, Scandinavian mønsås, and Germanic Firstpfette each reflect distinct structural and cultural traditions.',
    GRADUATE: 'Historical ridgepole analysis reveals the intersection of structural necessity and cultural meaning. The muneage (棟上げ) ceremony in Japanese architecture invests the ridgepole with spiritual significance as the building\'s crown. European "Richtfest" traditions similarly celebrate structural completion. Engineering evolution from massive hewn timbers to engineered wood products (glulam, LVL) has expanded span possibilities while maintaining the fundamental apex-beam concept.',
    PHD: 'Ridgepole scholarship engages material science (timber grading, connection mechanics), anthropology (topping-out rituals across cultures), and conservation science (non-destructive evaluation of historic timbers). Current research addresses the structural behavior of historic ridgepole connections under seismic loading, the performance of mass timber ridge beams in tall wood buildings, and the documentation of vernacular ridgepole traditions threatened by modernization.',
  },

  characteristics: [
    'Horizontal beam at the apex of a pitched roof',
    'Runs the full length of the building at the peak',
    'Receives and transfers rafter loads',
    'Can be structural (ridge beam) or non-structural (ridge board)',
    'Traditional material is hewn or sawn timber',
    'Modern versions may use engineered wood or steel',
    'Often the focus of topping-out ceremonies',
  ],

  famousExamples: [
    { name: 'Borgund Stave Church', location: 'Borgund, Norway', year: '1180', description: 'Medieval stave church with massive ridgepole on internal post system' },
    { name: 'Hōryū-ji Temple', location: 'Nara, Japan', year: '607', description: 'Oldest surviving wooden structure with traditional munagi ridgepole' },
    { name: 'Westminster Hall', location: 'London, England', year: '1097', description: 'Norman great hall with hammerbeam roof meeting at the ridge' },
    { name: 'Barley Hall', location: 'York, England', year: '1360', description: 'Restored medieval townhouse with exposed timber ridgepole' },
  ],

  confusionPairs: [
    {
      elementId: 'gable',
      reason: 'Both relate to the top of a roof',
      distinction: 'The ridgepole is the horizontal beam at the apex; the gable is the triangular wall section at the end of the roof',
    },
    {
      elementId: 'rafter',
      reason: 'Both are roof framing members',
      distinction: 'The ridgepole runs horizontally at the peak; rafters slope from the ridge down to the eaves',
    },
  ],

  searchTags: ['ridge', 'beam', 'roof', 'timber', 'framing', 'apex', 'peak', 'structural', 'topping-out'],

  arMetadata: {
    modelPath: '/models/architecture/ridgepole.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Ridge Beam', position: { x: 0, y: 1, z: 0 } },
      { label: 'Rafter Connection', position: { x: 0.5, y: 0.8, z: 0.3 } },
      { label: 'Supporting Post', position: { x: 0, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
