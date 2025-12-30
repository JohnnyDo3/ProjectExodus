import type { ArchitecturalElement } from '../../types';

export const LINTEL: ArchitecturalElement = {
  id: 'lintel',
  slug: 'lintel',
  name: 'Lintel',
  alternativeNames: ['Horizontal Beam', 'Header', 'Head Beam', 'Supercilium'],
  pronunciation: {
    phonetic: 'LIN-tul',
    language: 'Old French',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'Threshold or doorstep',
    rootWord: 'lintel (from Latin limen, threshold)',
  },
  category: 'DOOR',
  subcategory: 'door_parts',
  periods: ['ancient-egyptian', 'mesopotamian', 'classical-greek', 'roman', 'medieval', 'renaissance', 'modern'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/lintel-primary.jpg',
    gallery: [
      '/images/architecture/elements/lintel-stone.jpg',
      '/images/architecture/elements/lintel-timber.jpg',
      '/images/architecture/elements/lintel-steel.jpg',
    ],
    diagram: '/images/architecture/diagrams/lintel-detail.svg',
  },

  description: {
    ELEMENTARY: 'A lintel is the strong beam that goes across the top of a door or window. It holds up all the heavy wall above the opening so the wall doesn\'t fall down! Without lintels, we couldn\'t have doors or windows in our walls.',
    MIDDLE_SCHOOL: 'The lintel is a horizontal structural beam that spans an opening in a wall, such as a door or window, supporting the weight of the wall above. Lintels can be made of stone, wood, steel, or reinforced concrete. They transfer the load from above to the vertical supports on either side of the opening.',
    HIGH_SCHOOL: 'The lintel represents one of architecture\'s most fundamental structural elements, functioning as a beam in pure bending to span openings while supporting superincumbent loads. Material choice determines appropriate span—stone lintels are limited to relatively short spans due to stone\'s poor tensile strength, while timber, steel, and reinforced concrete enable longer spans. The lintel\'s visible face may remain plain or receive decorative treatment, from carved inscriptions to elaborate molding profiles.',
    UNDERGRADUATE: 'The lintel embodies the post-and-lintel structural system that dominated architecture before the development of the arch. Structural analysis reveals the lintel works in flexure, with the upper portion in compression and lower portion in tension, explaining stone\'s span limitations (typically under 3 meters for monolithic lintels). Ancient builders developed techniques to extend spans including corbeling, multiple stones with joints offset from opening center, and placement of relieving arches above to redirect loads. The lintel\'s structural limitations helped drive development of arched construction in Roman architecture.',
    GRADUATE: 'The lintel represents a fundamental tectonic element whose material limitations shaped architectural development. Greek temples employed monolithic marble lintels in architraves, accepting span limitations that determined intercolumniation. Roman builders increasingly used arches for wider spans, reducing lintels to non-structural elements or flat arches (platbands). Timber lintels enabled vernacular traditions with wider openings, while modern steel and reinforced concrete lintels permit spans previously impossible, fundamentally altering façade design possibilities and enabling the modern curtain wall.',
    PHD: 'The lintel constitutes a crucial element for examining relationships between material properties, structural behavior, and architectural form. Scholarly analysis addresses ancient construction techniques (Egyptian obelisk quarrying and transport reveal stone-handling capabilities), the transition from post-and-lintel to arched construction systems, and modern developments enabling wide-span openings. Archaeological studies document lintel failures and ancient repairs, revealing builders\' understanding of structural behavior. Contemporary research examines thermal bridging in modern lintels, develops innovative materials (fiber-reinforced polymers), and addresses sustainability through adaptive reuse rather than replacement.',
  },

  history: {
    ELEMENTARY: 'People have been using lintels for over 5,000 years! Ancient Egyptians made huge stone lintels for their temples. Every building with doors or windows has lintels, even if you can\'t see them.',
    MIDDLE_SCHOOL: 'Lintels appeared in the earliest monumental architecture—ancient Egypt and Mesopotamia used massive stone lintels in temples and palaces. Greek temples featured stone lintels as architraves spanning between columns. Medieval builders used both stone and timber lintels. Modern construction introduced steel and reinforced concrete lintels capable of spanning much greater distances.',
    HIGH_SCHOOL: 'The lintel\'s history parallels architectural development across cultures. Egyptian architecture featured monolithic granite lintels spanning temple entrances, some weighing over 100 tons (Temple of Karnak). Greek and Roman architecture refined stone lintel use in post-and-lintel systems while developing arches for longer spans. Medieval architecture employed stone lintels for smaller openings and timber for wider spans in vernacular construction. The Industrial Revolution introduced cast iron, wrought iron, and eventually steel lintels, while 20th-century reinforced concrete enabled modern wide-span openings.',
    UNDERGRADUATE: 'Lintel development reveals evolving understanding of structural mechanics and material properties. Ancient builders empirically determined safe spans, often incorporating relieving features above lintels to reduce loads—corbelling, stepped construction, or true relieving arches. The Romans\' arch development gradually supplanted lintels for major openings, though lintels persisted in domestic architecture. Medieval master builders understood that pointed arches reduced lateral thrust compared to semicircular arches but continued using lintels for smaller openings. Modern structural theory enabled precise calculation of required lintel dimensions, while new materials expanded possible spans exponentially.',
    GRADUATE: 'The lintel\'s evolution demonstrates fundamental shifts in building technology and architectural possibility. Ancient monolithic stone lintels limited opening widths while demanding sophisticated quarrying and transport infrastructure—the logistics of moving 100-ton granite beams shaped entire economies. Medieval masons developed techniques to extend stone lintel spans through multiple stones with complex jointing, while vernacular builders exploited timber\'s superior tensile strength. The introduction of iron and steel lintels in the 19th century fundamentally altered façade design, enabling modern large-scale glazing. Contemporary practice addresses thermal performance, with thermally broken lintels reducing energy loss.',
    PHD: 'Scholarly engagement with lintel history encompasses multiple disciplinary perspectives: archaeological studies revealing ancient construction techniques and logistics, structural analysis explaining material limitations and historical failures, architectural history tracing lintel design within broader stylistic evolution, and building science addressing contemporary performance requirements. Recent research employs finite element analysis to understand ancient masonry lintels\' structural behavior, examines historical failures to inform conservation practice, and develops sustainable alternatives to conventional steel lintels through materials like engineered timber and basalt fiber reinforcement.',
  },

  characteristics: [
    'Horizontal beam spanning opening',
    'Structural element working in bending',
    'Material determines maximum span',
    'Supports wall weight above opening',
    'May be exposed or concealed',
    'Can incorporate decorative elements',
  ],

  famousExamples: [
    { name: 'Temple of Karnak', location: 'Luxor, Egypt', year: 'c. 2055-100 BCE', description: 'Massive granite lintels over 100 tons' },
    { name: 'Stonehenge', location: 'Wiltshire, England', year: 'c. 2500 BCE', description: 'Prehistoric stone lintels forming continuous ring' },
    { name: 'Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'Marble lintels as part of architrave' },
    { name: 'Pont du Gard', location: 'Nîmes, France', year: 'c. 19 BCE', description: 'Roman aqueduct with stone lintels' },
    { name: 'Alhambra', location: 'Granada, Spain', year: '1238-1391', description: 'Decoratively carved stone lintels' },
  ],

  confusionPairs: [
    {
      elementId: 'architrave',
      reason: 'Both are horizontal elements above doors',
      distinction: 'Lintel is the structural beam; architrave is the decorative molding frame around the entire opening',
    },
    {
      elementId: 'arch',
      reason: 'Both span openings',
      distinction: 'Lintel is straight and works in bending; arch is curved and works in compression',
    },
  ],

  searchTags: ['structural', 'beam', 'door', 'window', 'opening', 'horizontal', 'support', 'stone', 'wood', 'steel', 'header'],

  arMetadata: {
    modelPath: '/models/architecture/lintel.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Compression Zone (Top)', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Neutral Axis', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Tension Zone (Bottom)', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Bearing Point', position: { x: -0.5, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
