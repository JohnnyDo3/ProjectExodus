import type { ArchitecturalElement } from '../../types';

export const VOLUTE: ArchitecturalElement = {
  id: 'volute',
  slug: 'volute',
  name: 'Volute',
  alternativeNames: ['Spiral Scroll', 'Ionic Scroll', 'Helical Scroll'],
  pronunciation: {
    phonetic: 'voh-LOOT',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Spiral, scroll, or turning',
    rootWord: 'Volutus (rolled), from volvere (to roll)',
  },
  category: 'DECORATIVE',
  subcategory: 'classical_ornament',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/volute-primary.jpg',
    gallery: [
      '/images/architecture/elements/volute-ionic.jpg',
      '/images/architecture/elements/volute-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/volute-geometry.svg',
  },

  description: {
    ELEMENTARY: 'A volute is a spiral scroll design, like a rolled-up piece of paper or a curled ram\'s horn. It\'s the most recognizable part of Ionic columns - those columns have big scrolls on both sides at the top! The ancient Greeks made these beautiful spirals to decorate their temples.',
    MIDDLE_SCHOOL: 'The volute is a spiral scroll ornament that forms the defining feature of the Ionic capital. Each Ionic capital has two pairs of volutes - one pair on the front, one on the back. The volute spirals inward to a central "eye" and creates an elegant, flowing form. Volutes also appear on Corinthian and Composite capitals in smaller forms, and on brackets and console decorations.',
    HIGH_SCHOOL: 'The volute represents one of the most mathematically sophisticated ornamental forms in classical architecture. As the signature element of the Ionic order, volutes appear as large spiral scrolls emerging from the capital\'s sides. The spiral follows a precise geometric construction based on diminishing radii, creating a logarithmic-like curve that spirals inward to a circular eye. This mathematical precision combined with organic flowing form exemplifies classical architecture\'s fusion of reason and beauty.',
    UNDERGRADUATE: 'The volute constitutes the defining ornament of the Ionic capital, with complex geometric and symbolic dimensions. Classical construction methods employed successive arcs of diminishing radii to create the spiral, with the "eye" (oculus) typically measuring one module in diameter. The volute\'s origins may relate to Egyptian or Near Eastern palmette capitals, though Greek architects transformed the motif into a distinctive spiral form. The Ionic capital\'s four volutes create a directional problem at building corners, historically solved through angular capitals or compromise four-sided designs.',
    GRADUATE: 'Volute design embodies the classical fusion of mathematical rigor and aesthetic refinement. Renaissance architects from Serlio to Vignola devoted extensive analysis to volute construction, developing systems of diminishing circles and quarter-arcs that could be reproduced by craftsmen. The proportional relationships between eye diameter, spiral development, and capital height follow sophisticated ratios. Research into ancient Greek volutes reveals both the consistency of geometric principles and surprising variations in execution. The "corner problem" of Ionic design, where the four-sided building corner contradicts the two-sided capital, generated centuries of theoretical debate.',
    PHD: 'The volute presents rich research opportunities spanning geometry, symbolism, and technical practice. Geometric analysis addresses the precise construction methods used by ancient craftsmen before modern mathematical understanding of logarithmic spirals. Symbolic interpretation examines possible meanings - from ram\'s horns to papyrus scrolls to abstract expressions of growth and generation. Technical research investigates carving methods, from Greek outlining and drilling to Roman use of mechanical pointing. Cross-cultural studies compare Greek volutes with superficially similar forms in Egyptian, Mesopotamian, and Aeolic capitals. Contemporary theoretical work addresses the volute\'s role in architectural language and its continued resonance in contemporary design.',
  },

  history: {
    ELEMENTARY: 'The ancient Greeks invented the volute scroll around 2,600 years ago when they created the Ionic style of column. They might have gotten the idea from ram\'s horns, scrolls of paper, or other curly decorations. The Romans loved these scrolls too and used them on buildings all over their empire. Artists still carve these beautiful spirals today!',
    MIDDLE_SCHOOL: 'The volute emerged with the Ionic order in ancient Greek Asia Minor around the 6th century BCE. Early examples show the form already fully developed, suggesting possible influences from earlier cultures. The Erechtheion in Athens (421-406 BCE) displays masterfully carved volutes. Romans adopted Ionic volutes and added them to Composite capitals. Renaissance architects studied ancient examples and developed geometric systems for constructing volutes, ensuring their continued use through modern times.',
    HIGH_SCHOOL: 'The volute\'s origins trace to 6th-century BCE Ionic architecture in Greek Asia Minor, though the precise genesis remains debated. Some scholars see connections to Aeolic capitals or Egyptian palmette forms, while others emphasize original Greek development. The Temple of Artemis at Ephesus featured early volute capitals. By the 5th century BCE, Athens produced refined examples like the Erechtheion. Roman architects incorporated volutes into Composite capitals and console brackets. Renaissance theorists developed detailed geometric construction systems documented in architectural treatises.',
    UNDERGRADUATE: 'The volute\'s development intersects questions of cultural transmission and formal innovation. Aeolic capitals from 7th-century BCE sites show spiral elements, possibly influencing Greek Ionic development. The earliest mature Ionic volutes appear in 6th-century Asia Minor temples. The geometric complexity of volute construction suggests sophisticated mathematical knowledge. The "corner problem" - reconciling directional volutes with building corners - received various ancient solutions: angular capitals (showing volutes on adjacent faces), compromise capitals (with diagonal volutes), and continuous volutes wrapping the corner. Renaissance architects from Palladio to Scamozzi proposed systematic solutions.',
    GRADUATE: 'Scholarly examination of volute design addresses technical, aesthetic, and theoretical dimensions. Geometric analysis reveals that ancient volutes, while appearing logarithmic, actually employ concatenated circular arcs - a construction method Renaissance architects systematized. Archaeological research on Greek Asia Minor sites continues to refine understanding of early Ionic development and possible Near Eastern influences. The volute\'s symbolic meanings remain speculative but likely include associations with organic growth, water, and sacred scrolls. Conservation challenges include repairing damaged volutes while maintaining historical authenticity and understanding ancient piecing and doweling techniques.',
    PHD: 'The volute offers fertile ground for interdisciplinary research. Mathematical analysis examines the relationship between ancient empirical construction methods and modern understanding of spiral geometry. Archaeological work addresses questions of workshop practice, including the use of templates and compasses. Art historical research traces the volute\'s evolution from Archaic experiments through Classical refinement, Hellenistic elaboration, and Roman standardization. Renaissance reception studies explore how architects reconstructed volute geometry from fragmentary remains. Contemporary research employs 3D scanning to analyze historical volutes, revealing construction techniques invisible to earlier scholars. Theoretical inquiry addresses the volute\'s semiotic function and its role in contemporary classical practice.',
  },

  characteristics: [
    'Spiral scroll curving inward to central "eye"',
    'Defining feature of Ionic capitals',
    'Constructed geometrically using successive arcs',
    'Appears in pairs on Ionic capitals',
    'Creates directional emphasis',
    'Also used on Composite capitals and brackets',
  ],

  famousExamples: [
    { name: 'Erechtheion', location: 'Athens, Greece', year: '421-406 BCE', description: 'Masterful Greek Ionic volutes' },
    { name: 'Temple of Portunus', location: 'Rome, Italy', year: '120-80 BCE', description: 'Roman Ionic volutes with deeper carving' },
    { name: 'Villa Rotonda', location: 'Vicenza, Italy', year: '1567-1571', description: 'Palladio\'s Renaissance interpretation' },
    { name: 'Louvre Colonnade', location: 'Paris, France', year: '1667-1674', description: 'French Baroque giant order with volutes' },
    { name: 'National Gallery', location: 'Washington D.C., USA', year: '1937-1941', description: 'Neoclassical Ionic volutes in America' },
  ],

  confusionPairs: [
    {
      elementId: 'cauliculus',
      reason: 'Both are spiral elements on capitals',
      distinction: 'Volutes are large dominant spirals on Ionic capitals; caulicoli are small supporting scrolls on Corinthian capitals',
    },
    {
      elementId: 'helix',
      reason: 'Both are spiral scroll forms',
      distinction: 'Volutes are the large main scrolls; helices are smaller secondary scrolls on Corinthian capitals',
    },
  ],

  searchTags: ['spiral', 'scroll', 'ionic', 'capital', 'classical', 'ornament', 'volute', 'curl', 'decoration', 'greek'],

  arMetadata: {
    modelPath: '/models/architecture/volute.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Eye (Oculus)', position: { x: 0, y: 0, z: 0.05 } },
      { label: 'Spiral Turn', position: { x: 0.05, y: 0.03, z: 0.05 } },
      { label: 'Outer Curve', position: { x: 0.1, y: 0.08, z: 0.03 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
