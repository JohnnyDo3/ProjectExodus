import type { ArchitecturalElement } from '../../types';

export const CORNICE: ArchitecturalElement = {
  id: 'cornice',
  slug: 'cornice',
  name: 'Cornice',
  alternativeNames: ['Crown Molding', 'Cornice Molding', 'Eaves Cornice'],
  pronunciation: {
    phonetic: 'KOR-nis',
    language: 'English',
  },
  etymology: {
    origin: 'Italian/Latin',
    meaning: 'Crown or projection',
    rootWord: 'Cornice (Italian) from Latin "coronis" (curved line)',
  },
  category: 'DECORATIVE',
  subcategory: 'classical_moldings',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/cornice-primary.jpg',
    gallery: [
      '/images/architecture/elements/cornice-detail.jpg',
      '/images/architecture/elements/cornice-profile.jpg',
    ],
    diagram: '/images/architecture/diagrams/cornice-parts.svg',
  },

  description: {
    ELEMENTARY: 'A cornice is like the fancy trim at the top of a building where the roof meets the walls. It sticks out from the building and often has decorative patterns. Think of it as the building\'s crown!',
    MIDDLE_SCHOOL: 'The cornice is the uppermost horizontal molding that projects from the top of a wall or building. In classical architecture, it\'s the top part of the entablature (the structure sitting on columns). Cornices can be simple or highly decorated with carved patterns.',
    HIGH_SCHOOL: 'The cornice represents the crowning horizontal element of classical architecture, projecting outward to protect walls from weather while providing visual completion to the facade. In the classical orders, the cornice forms the uppermost section of the entablature, above the frieze and architrave. Its design varies significantly between orders and periods.',
    UNDERGRADUATE: 'The cornice serves both functional and aesthetic purposes in classical architecture. Functionally, its projection creates shadow lines and protects the wall surface from water runoff. Aesthetically, it provides visual termination and proportional balance. The cornice profile typically includes multiple moldings - cyma recta, ovolo, corona (the projecting shelf), and supporting elements like modillions or dentils.',
    GRADUATE: 'The cornice constitutes a critical element in classical proportional theory, with its projection depth typically measuring one-fifth to one-quarter of the entablature height. Renaissance theorists from Alberti to Palladio codified cornice profiles for each order, though archaeological evidence reveals greater variation in ancient practice. The cornice\'s evolution from functional water management device to symbolic crown demonstrates architecture\'s synthesis of pragmatic and expressive imperatives.',
    PHD: 'Critical analysis of cornice design illuminates broader questions in architectural theory regarding the relationship between tectonic expression and ornamental convention. The debate over cornice origins - whether derived from timber eave construction or emerging as purely aesthetic elaboration - parallels larger discussions of architectural authenticity. Post-Renaissance developments, including the colossal cornice in Baroque architecture and stripped classical cornices in 20th-century work, demonstrate the element\'s continued significance in architectural discourse.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks and Romans used cornices on their temples over 2,000 years ago. They made them from stone with beautiful carvings. Later, builders all around the world copied this idea, even making cornices inside houses as decorative trim near ceilings.',
    MIDDLE_SCHOOL: 'The cornice evolved in ancient Greek temple architecture around the 7th-6th centuries BCE, initially serving to protect mud-brick walls from rain. Romans expanded cornice design with elaborate modillions and dentils. During the Renaissance (1400s-1600s), architects revived classical cornices, and they became standard features in Western architecture through the 1800s.',
    HIGH_SCHOOL: 'Greek temple architecture established the cornice as the terminal element of the entablature, with regional variations between Doric simplicity and Ionic elaboration. Roman architects expanded the vocabulary, applying cornices to triumphal arches, basilicas, and domestic architecture. Renaissance theorists systematized cornice design through treatises, while Baroque architects exploited dramatic cornices for shadow effects. Neoclassical revivals continued through the early 20th century.',
    UNDERGRADUATE: 'The cornice\'s development reveals changing attitudes toward architectural ornament and construction logic. Greek cornices emphasized horizontal termination through simple sima profiles. Roman innovation included the modillion (bracket) system supporting deeper projections. Renaissance systematization, particularly in Serlio\'s and Vignola\'s treatises, established canonical profiles still referenced today. The 19th century saw both archaeological precision in Greek Revival work and free adaptation in Beaux-Arts design.',
    GRADUATE: 'Scholarly examination of cornice evolution must address the tension between prescriptive theory and built reality. While Vitruvius described standardized proportions, surviving Roman examples show considerable variation. The Renaissance "invention of tradition" created idealized cornice profiles that influenced centuries of practice. Modern conservation challenges include understanding historical construction techniques - stone, timber, terracotta - and their deterioration patterns. Contemporary scholarship increasingly examines cornices as both structural and semiotic elements.',
    PHD: 'The cornice presents rich research opportunities in architectural historiography, material studies, and theoretical interpretation. Questions include: How did medieval builders reinterpret classical cornices? What role did printed architectural books play in standardizing cornice design? How did 19th-century cast iron and pressed metal cornices transform production and aesthetics? Contemporary research also addresses conservation methodology, particularly for deteriorating stone cornices, and the element\'s role in sustainable design discourse regarding thermal bridging and water management.',
  },

  characteristics: [
    'Projects outward from the wall face',
    'Topmost element of the entablature',
    'Includes multiple molding profiles',
    'Often features carved ornament (modillions, dentils)',
    'Creates strong horizontal shadow line',
    'Protects wall surfaces below from water',
  ],

  famousExamples: [
    { name: 'Parthenon Cornice', location: 'Athens, Greece', year: '447-432 BCE', description: 'Classic Greek Doric cornice with simple mutules' },
    { name: 'Pantheon Portico', location: 'Rome, Italy', year: '113-125 CE', description: 'Monumental Roman cornice with modillions' },
    { name: 'Palazzo Farnese', location: 'Rome, Italy', year: '1534-1589', description: 'Renaissance cornice designed by Michelangelo' },
    { name: 'St. Peter\'s Basilica', location: 'Vatican City', year: '1506-1626', description: 'Massive Baroque cornice crowning the facade' },
    { name: 'U.S. Capitol', location: 'Washington D.C., USA', year: '1793-1866', description: 'Neoclassical cornice on the main building' },
  ],

  confusionPairs: [
    {
      elementId: 'frieze',
      reason: 'Both are horizontal elements of the entablature',
      distinction: 'Cornice is at the top and projects outward; frieze is the middle band, usually flat or carved',
    },
    {
      elementId: 'architrave',
      reason: 'Both are parts of the classical entablature',
      distinction: 'Cornice crowns the top; architrave is the lowest part sitting directly on columns',
    },
  ],

  searchTags: ['molding', 'projection', 'entablature', 'crown', 'classical', 'eaves', 'horizontal', 'ornament', 'cornice'],

  arMetadata: {
    modelPath: '/models/architecture/cornice.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Corona', position: { x: 0, y: 0.5, z: 0.2 } },
      { label: 'Cyma Molding', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Modillions', position: { x: 0, y: 0.3, z: 0.15 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
