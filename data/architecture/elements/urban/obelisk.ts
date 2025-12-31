import type { ArchitecturalElement } from '../../types';

export const OBELISK: ArchitecturalElement = {
  id: 'obelisk',
  slug: 'obelisk',
  name: 'Obelisk',
  alternativeNames: ['Tekhenu', 'Monolith', 'Needle'],
  pronunciation: {
    phonetic: 'OB-uh-lisk',
    language: 'Greek',
  },
  etymology: {
    origin: 'Greek/Egyptian',
    meaning: 'Pointed pillar',
    rootWord: 'From Greek "obeliskos" (small spit), diminutive of "obelos" (spit), describing the pointed shape',
  },
  category: 'URBAN',
  subcategory: 'monumental_structure',
  periods: ['ancient-egyptian', 'roman', 'renaissance', 'neoclassical', 'modern'],
  regions: ['EGYPT', 'MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/obelisk-primary.jpg',
    gallery: [
      '/images/architecture/elements/obelisk-washington.jpg',
      '/images/architecture/elements/obelisk-luxor.jpg',
    ],
    diagram: '/images/architecture/diagrams/obelisk-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'An obelisk is a very tall, thin monument shaped like a giant pencil pointing toward the sky! It has four flat sides that get narrower as they go up, ending in a pyramid-shaped point called a pyramidion. Ancient Egyptians carved these from single pieces of stone. The Washington Monument in Washington, D.C. is a famous American obelisk.',
    MIDDLE_SCHOOL: 'An obelisk is a tall, four-sided, tapering monument that ends in a pyramid-shaped top. Ancient Egyptians carved them from single granite blocks and erected them at temple entrances to honor the sun god Ra. The sides often feature hieroglyphic inscriptions. Romans brought many Egyptian obelisks to Italy. Later civilizations built new obelisks to commemorate important people and events. They serve as dramatic vertical accents in urban spaces.',
    HIGH_SCHOOL: 'The obelisk is a monolithic or constructed tower with square or rectangular cross-section, tapering sides, and pyramidal apex (pyramidion). Egyptian obelisks were cut from Aswan granite quarries, transported hundreds of miles, and erected using ramps and levers. Hieroglyphs typically dedicate the monument to pharaohs and deities. Roman appropriation spread obelisks throughout the empire. Renaissance popes re-erected fallen obelisks. Modern examples use various materials and construction techniques while maintaining the essential form.',
    UNDERGRADUATE: 'Obelisk design integrates structural principles, symbolic geometry, and quarrying technology. Egyptian examples were true monoliths, requiring sophisticated cutting, transport, and erection engineering. The taper (batter) provides structural stability while emphasizing vertical thrust. The pyramidion cap relates to solar symbolism and the benben stone. Roman engineers developed lifting techniques for re-erection. Contemporary obelisks range from stone monoliths to steel-framed structures clad in various materials, maintaining the iconic silhouette.',
    GRADUATE: 'Obelisk analysis addresses ancient engineering, symbolic systems, and cultural appropriation. Research examines quarrying techniques through archaeological evidence, transport logistics via experimental archaeology, and erection methods through structural analysis. Contemporary practice explores the obelisk as urban marker, memorial form, and symbol of power. Studies include seismic performance of monolithic structures, conservation of weathered surfaces, and cultural politics of Egyptian monument appropriation.',
    PHD: 'Obelisk scholarship engages Egyptology, engineering history, and semiotics. Methodologies include archaeological investigation of quarry sites, epigraphic analysis of inscriptions, and structural modeling of erection techniques. Current research addresses the obelisk in colonial and imperial contexts, the transformation of religious symbols into secular monuments, and the technical achievements of ancient engineering compared to modern capabilities.',
  },

  history: {
    ELEMENTARY: 'Ancient Egyptians built the first obelisks over 4,000 years ago to honor their gods, especially the sun god Ra! They carved them from one huge piece of stone and covered them with hieroglyphics. The Romans liked them so much they took many to Rome. Later, America built the Washington Monument as an obelisk to honor George Washington.',
    MIDDLE_SCHOOL: 'Pharaoh Senusret I erected the first known obelisks around 1950 BCE. Egyptians placed pairs of obelisks at temple entrances, often capped with electrum (gold-silver alloy) to catch sunlight. Romans transported 13 Egyptian obelisks to Italy, re-erecting them as imperial symbols. After rediscovery during the Renaissance, European cities raised fallen obelisks. The Washington Monument (1848-1884) became the world\'s tallest obelisk. The 20th century saw modern interpretations worldwide.',
    HIGH_SCHOOL: 'Old Kingdom Egyptians developed the obelisk form, but New Kingdom pharaohs like Hatshepsut and Thutmose III created the largest examples. The Lateran Obelisk (32m tall, 455 tons) remains the largest ancient obelisk. Roman emperors, particularly Augustus, systematically removed Egyptian obelisks. Pope Sixtus V\'s 1585-1590 program re-erected eight obelisks as Christian symbols. The Washington Monument adapted Egyptian forms using modern construction. Contemporary obelisks include the San Jacinto Monument and the Buenos Aires Obelisk.',
    UNDERGRADUATE: 'Obelisk history reveals engineering capabilities, religious symbolism, and cultural transmission. Egyptian quarrying at Aswan demonstrates sophisticated stone-working knowledge. The Unfinished Obelisk shows ancient techniques. Roman engineering developed the castello lifting tower for re-erection. Renaissance interest in Egyptian wisdom motivated obelisk projects. Neoclassical movements deployed obelisks for national monuments. Modern obelisks use steel frames and stone cladding, maintaining symbolic form while adapting structural methods.',
    GRADUATE: 'Historical analysis of obelisks examines technological innovation, symbolic appropriation, and political meaning. Research addresses the evolution of quarrying and transport techniques, the reinterpretation of Egyptian religious symbols in Roman and Christian contexts, and the role of obelisks in nationalist iconography. Contemporary challenges include conserving ancient granite surfaces degraded by pollution, stabilizing foundations affected by groundwater changes, and addressing the colonial histories of displaced monuments.',
    PHD: 'Obelisk scholarship engages engineering history, religious studies, and postcolonial theory. Methodologies include experimental archaeology reconstructing ancient techniques, archaeoastronomical analysis of solar alignments, and critical analysis of cultural appropriation. Current research examines the obelisk as technology transfer between cultures, the politics of repatriation for displaced monuments, and computational modeling of ancient engineering achievements.',
  },

  characteristics: [
    'Tall, four-sided tapering monument',
    'Square or rectangular cross-section',
    'Pyramidal cap (pyramidion)',
    'Often monolithic construction',
    'May feature inscribed text',
    'Dramatic vertical emphasis',
    'Functions as urban landmark',
  ],

  famousExamples: [
    { name: 'Washington Monument', location: 'Washington, D.C., USA', year: '1848-1884', description: 'World\'s tallest stone structure at 555 feet' },
    { name: 'Lateran Obelisk', location: 'Rome, Italy', year: 'c. 1450 BCE (Egypt), 357 CE (Rome)', description: 'Largest standing ancient Egyptian obelisk, 32.18 meters' },
    { name: 'Luxor Obelisk', location: 'Paris, France', year: '1250 BCE (Egypt), 1836 (Paris)', description: 'Gift from Egypt, stands in Place de la Concorde' },
    { name: 'Cleopatra\'s Needle', location: 'London, England', year: 'c. 1450 BCE (Egypt), 1878 (London)', description: 'One of a pair, the other in New York City' },
    { name: 'Buenos Aires Obelisk', location: 'Buenos Aires, Argentina', year: '1936', description: 'Modern obelisk marking 400th anniversary of city founding' },
  ],

  confusionPairs: [
    {
      elementId: 'column',
      reason: 'Both are vertical structural elements',
      distinction: 'Columns support roofs or entablatures; obelisks are freestanding monuments with no structural function',
    },
    {
      elementId: 'minaret',
      reason: 'Both are tall vertical monuments',
      distinction: 'Minarets are functional towers for calling prayer; obelisks are solid commemorative monuments',
    },
  ],

  searchTags: ['monument', 'Egyptian', 'needle', 'vertical', 'memorial', 'monolith', 'pyramid cap', 'urban'],

  arMetadata: {
    modelPath: '/models/architecture/obelisk.glb',
    scale: 0.05,
    rotatable: true,
    annotations: [
      { label: 'Pyramidion', position: { x: 0, y: 5, z: 0 } },
      { label: 'Shaft', position: { x: 0, y: 2.5, z: 0 } },
      { label: 'Base', position: { x: 0, y: 0.2, z: 0 } },
      { label: 'Hieroglyphics', position: { x: 0.3, y: 3, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
