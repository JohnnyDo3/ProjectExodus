import type { ArchitecturalElement } from '../../types';

export const TRIUMPHAL_ARCH: ArchitecturalElement = {
  id: 'triumphal-arch',
  slug: 'triumphal-arch',
  name: 'Triumphal Arch',
  alternativeNames: ['Victory Arch', 'Monumental Arch', 'Commemorative Arch', 'Arch of Triumph'],
  pronunciation: {
    phonetic: 'try-UM-ful ARCH',
    language: 'English',
  },
  etymology: {
    origin: 'Latin/English',
    meaning: 'Arch celebrating victory',
    rootWord: 'From Latin "arcus triumphalis" (triumphant arch)',
  },
  category: 'URBAN',
  subcategory: 'monumental_structure',
  periods: ['roman', 'renaissance', 'baroque', 'neoclassical', 'beaux-arts'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/triumphal-arch-primary.jpg',
    gallery: [
      '/images/architecture/elements/triumphal-arch-constantine.jpg',
      '/images/architecture/elements/triumphal-arch-paris.jpg',
    ],
    diagram: '/images/architecture/diagrams/triumphal-arch-parts.svg',
  },

  description: {
    ELEMENTARY: 'A triumphal arch is a giant archway built to celebrate important victories or events! It\'s like a huge doorway standing alone in a city, often decorated with statues and carvings that tell stories. Ancient Roman generals would march their armies through these arches when they won battles. Today, they remind us of important moments in history.',
    MIDDLE_SCHOOL: 'A triumphal arch is a freestanding monumental archway built to commemorate military victories, important rulers, or significant events. Roman emperors built them to celebrate conquests. The arches feature one or three openings, decorated with relief sculptures, inscriptions, and statues. Famous examples include the Arc de Triomphe in Paris and the Arch of Constantine in Rome. They often serve as focal points in urban planning.',
    HIGH_SCHOOL: 'The triumphal arch is a monumental structure featuring one or more arched openings, typically adorned with sculptural reliefs, inscriptions, and attic stories crowned with quadriga (chariot) sculptures. Roman arches commemorated military victories and served as symbolic gates marking important routes. Architectural elements include columns or pilasters framing the archway, entablature, and decorative programs narrating historical events. Later examples served nationalistic or civic purposes.',
    UNDERGRADUATE: 'Triumphal arch design integrates structural engineering, iconographic programs, and urban symbolism. Roman examples established the typology: single or triple openings, engaged columns on pedestals, rich sculptural decoration, and inscribed attics. Structural systems evolved from true arches to later reinforced concrete shells. Urban placement creates visual terminations for avenues or marks significant boundaries. Contemporary interpretations range from literal reproductions to abstract gateway concepts.',
    GRADUATE: 'Triumphal arch analysis addresses architectural symbolism, political iconography, and urban morphology. Research examines how arch programs construct historical narratives, how placement strategies create urban hierarchies, and how form evolution reflects changing political structures. Contemporary challenges include contextual insertion of new commemorative structures, reinterpretation of militaristic symbolism, and preservation of historic arches while accommodating modern urban functions.',
    PHD: 'Triumphal arch scholarship engages Roman archaeology, art history, and cultural memory studies. Methodologies include archaeological documentation of construction techniques, iconographic analysis of decorative programs, and reception studies examining changing interpretations. Current research addresses the arch in colonial contexts, gender and power in commemorative architecture, and digital reconstruction of lost arches for historical analysis.',
  },

  history: {
    ELEMENTARY: 'The Romans invented the triumphal arch over 2,000 years ago to celebrate their military victories! Winning generals would parade through them with their soldiers. When other countries wanted to look powerful, they built their own arches. Napoleon built the Arc de Triomphe in Paris to honor his army. Many cities around the world have triumphal arches today.',
    MIDDLE_SCHOOL: 'Romans built the first triumphal arches, like the Arch of Titus (81 CE) celebrating the conquest of Jerusalem. Emperors erected them throughout the empire to demonstrate power. After Rome fell, the tradition faded until the Renaissance revived classical forms. Napoleon commissioned the Arc de Triomphe (1806-1836) in Paris. The 19th century saw triumphal arches built worldwide, from London to New York, celebrating national achievements rather than just military victories.',
    HIGH_SCHOOL: 'The triumphal arch emerged from temporary wooden arches built for Roman triumphs-elaborate victory parades. Permanent stone arches began in the 2nd century BCE. The Arch of Titus established the single-opening type with relief panels. The Arch of Constantine (315 CE) exemplified the triple-opening form with spoliated decoration. Renaissance architects studied Roman arches but rarely built new ones. Napoleonic nationalism revived the type. Imperial powers erected arches in colonies, while revolutionary movements built them to mark new beginnings.',
    UNDERGRADUATE: 'Triumphal arch history reveals evolving commemorative practices and architectural expression. Roman arches served propaganda functions, visualizing military success and imperial legitimacy. Structural innovation enabled larger spans and more elaborate decorative programs. Medieval reuse of Roman arches maintained urban memory. Renaissance study influenced gate design more than freestanding arches. Neoclassical revival connected Enlightenment states to Roman precedent. Modern interpretations include Erich Mendelsohn\'s expressionist arches and Maya Lin\'s abstract memorial forms.',
    GRADUATE: 'Historical analysis of triumphal arches examines political ritual, architectural iconography, and urban meaning. Research addresses the relationship between arch programs and historical truth, the influence of Roman models on modern nationalism, and the social construction of collective memory through monuments. Contemporary challenges include addressing contested commemorations, adapting arch typology for non-militaristic purposes, and balancing preservation with traffic requirements.',
    PHD: 'Triumphal arch scholarship engages archaeology, political theory, and memory studies. Methodologies include archaeological investigation of construction sequences, epigraphic analysis of inscriptions, and comparative studies of commemorative strategies. Current research examines arches in postcolonial contexts, the deconstruction of triumphalist narratives, computational analysis of proportional systems, and the role of arches in contested urban landscapes.',
  },

  characteristics: [
    'Freestanding monumental gateway',
    'One or three arched openings',
    'Decorated with relief sculptures',
    'Inscriptions commemorating events',
    'Engaged columns or pilasters',
    'Attic story often with statuary',
    'Serves as urban focal point',
  ],

  famousExamples: [
    { name: 'Arch of Constantine', location: 'Rome, Italy', year: '315 CE', description: 'Triple arch celebrating Constantine\'s victory, reusing earlier sculptures' },
    { name: 'Arc de Triomphe', location: 'Paris, France', year: '1806-1836', description: 'Napoleon\'s arch honoring the Grande Armée, largest triumphal arch' },
    { name: 'Arch of Titus', location: 'Rome, Italy', year: '81 CE', description: 'Commemorates the Siege of Jerusalem, with famous relief panels' },
    { name: 'Wellington Arch', location: 'London, England', year: '1826-1830', description: 'Originally topped with equestrian statue of Wellington' },
    { name: 'Gateway Arch', location: 'St. Louis, Missouri, USA', year: '1963-1965', description: 'Eero Saarinen\'s modern catenary arch, 630 feet tall' },
  ],

  confusionPairs: [
    {
      elementId: 'city-gate',
      reason: 'Both are monumental archways',
      distinction: 'City gates are functional entrances in fortification walls; triumphal arches are freestanding commemorative monuments',
    },
    {
      elementId: 'portico',
      reason: 'Both use classical architectural elements',
      distinction: 'Porticos are covered entrances with columns and roofs; triumphal arches are freestanding structures with arched openings',
    },
  ],

  searchTags: ['arch', 'monument', 'victory', 'commemorative', 'Roman', 'gate', 'urban', 'classical'],

  arMetadata: {
    modelPath: '/models/architecture/triumphal-arch.glb',
    scale: 0.1,
    rotatable: true,
    annotations: [
      { label: 'Central Arch', position: { x: 0, y: 2, z: 0 } },
      { label: 'Attic Story', position: { x: 0, y: 4, z: 0 } },
      { label: 'Relief Panel', position: { x: 1, y: 2, z: 0 } },
      { label: 'Engaged Column', position: { x: 2, y: 1.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
