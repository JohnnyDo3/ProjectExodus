import type { ArchitecturalElement } from '../../types';

export const CARYATID: ArchitecturalElement = {
  id: 'caryatid',
  slug: 'caryatid',
  name: 'Caryatid',
  alternativeNames: ['Karyatid', 'Maiden Column', 'Figure Column'],
  pronunciation: {
    phonetic: 'kar-ee-AT-id',
    language: 'English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Maidens of Karyai, a town in Laconia whose women were enslaved',
    rootWord: 'Karyatis (Καρυάτις)',
  },
  category: 'COLUMN',
  subcategory: 'column_variations',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/caryatid-primary.jpg',
    gallery: [
      '/images/architecture/elements/erechtheion-caryatids.jpg',
    ],
    diagram: '/images/architecture/diagrams/caryatid.svg',
  },

  description: {
    ELEMENTARY: 'A caryatid is a column shaped like a woman! Instead of a plain post holding up the roof, it\'s a beautiful statue of a lady with the roof resting on her head. The most famous ones stand on the Erechtheion temple in Athens.',
    MIDDLE_SCHOOL: 'Caryatids are columns carved as standing female figures, with the entablature (roof structure) resting on their heads. The most famous examples are the six maidens of the Erechtheion on the Athenian Acropolis. Male versions are called Atlantes or Telamons.',
    HIGH_SCHOOL: 'Caryatids are sculpted female figures serving as architectural supports, replacing conventional columns. The term derives from Karyai, a town in Laconia. The Erechtheion caryatids (420-406 BCE) are the most celebrated examples, demonstrating how figurative sculpture could assume structural functions in Greek architecture.',
    UNDERGRADUATE: 'The caryatid represents the intersection of sculpture and architecture in Greek building practice. Vitruvius\'s explanation that caryatids commemorate the enslavement of Karyai\'s women is likely etiological myth. Analysis of the Erechtheion caryatids reveals careful attention to the structural logic of the female figure—the bent knee creating visual stability, the thick necks suggesting load-bearing capacity.',
    GRADUATE: 'Caryatid studies engage questions of gender representation, architectural sculpture, and the anthropomorphization of structural elements. The Erechtheion program, with caryatids facing the Parthenon, invites interpretation of their spatial and symbolic relationships. Post-antique reception, from Renaissance Vitruvian editions to 19th-century museum displays, reveals changing attitudes toward both antiquity and gender.',
    PHD: 'Advanced caryatid scholarship addresses the figures\' origins, meanings, and reception. The etymology connecting caryatids to enslaved women raises questions about ancient gender politics and architectural symbolism. Analysis extends to male counterparts (Atlantes), Persian captive figures, and the broader phenomenon of anthropomorphic architecture across cultures.',
  },

  history: {
    ELEMENTARY: 'The most famous caryatids were made over 2,400 years ago for a temple called the Erechtheion in Athens. Six beautiful stone ladies have been holding up the porch roof ever since! One was taken to a museum in London, but the others are still there (well, copies—the originals are in the Athens museum now).',
    MIDDLE_SCHOOL: 'Caryatids were used in ancient Greece from at least the 6th century BCE. The most famous are the six maidens of the Erechtheion (421-406 BCE) on the Athenian Acropolis. Lord Elgin took one to Britain in 1801, where it remains in the British Museum. Neoclassical architects revived caryatids for churches, museums, and grand homes.',
    HIGH_SCHOOL: 'The earliest known caryatids appear at the Siphnian Treasury at Delphi (525 BCE). The Erechtheion\'s Porch of the Maidens (caryatid porch) is the most celebrated example. Vitruvius explains their origin as commemorating enslaved women of Karyai, though this is likely later rationalization. Roman and Renaissance architects employed caryatids for both structural and decorative purposes.',
    UNDERGRADUATE: 'Caryatid development can be traced from Archaic korai-like figures through the Classical Erechtheion maidens to Roman and later examples. The Erechtheion caryatids demonstrate sophisticated understanding of how figurative form could suggest structural function—the engaged leg, thick hair, and sturdy necks all contributing to the impression of weight-bearing capacity. The figures\' subtle individuality within formal unity presents questions about workshop practice and artistic intention.',
    GRADUATE: 'Critical analysis of caryatids addresses their position at the intersection of architecture and sculpture, examining how gendered bodies were deployed as structural metaphors. The Vitruvian origin story, explaining caryatids as commemorating female enslavement, has been variously interpreted as historical memory, moral allegory, or post-hoc rationalization. The Erechtheion program\'s relationship to cult practice and urban context remains debated.',
    PHD: 'Caryatid scholarship engages feminist critiques of architectural figuration, archaeological investigation of workshop practices, and reception studies tracing the figures\' afterlives. Questions include: the relationship between caryatids and votive sculpture, the meaning of gender in architectural support systems, and the ethics of display (particularly regarding the Elgin caryatid). Comparative analysis with male Atlantes and non-Western anthropomorphic architecture expands the field.',
  },

  characteristics: [
    'Column shaped as standing female figure',
    'Entablature rests on figure\'s head',
    'Often wearing Greek robes (peplos/chiton)',
    'Bent knee creates visual stability',
    'Thick neck suggests load-bearing',
    'Male equivalent: Atlas/Telamon',
  ],

  famousExamples: [
    { name: 'Erechtheion Porch of the Maidens', location: 'Athens, Greece', year: '420-406 BCE', description: 'The most famous caryatids in the world' },
    { name: 'Siphnian Treasury', location: 'Delphi, Greece', year: '525 BCE', description: 'Earliest known caryatids' },
    { name: 'Musée du Louvre', location: 'Paris, France', year: '19th century', description: 'Neoclassical caryatid galleries' },
    { name: 'St Pancras New Church', location: 'London, UK', year: '1819-1822', description: 'Greek Revival caryatids' },
  ],

  confusionPairs: [
    {
      elementId: 'pilaster',
      reason: 'Both are column-like elements attached to walls',
      distinction: 'Caryatid is a sculpted female figure; Pilaster is a flat rectangular column',
    },
  ],

  searchTags: ['column', 'greek', 'sculpture', 'female', 'figure', 'caryatid', 'maiden', 'erechtheion', 'atlas', 'telamon'],

  arMetadata: {
    modelPath: '/models/architecture/caryatid.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Capital', position: { x: 0, y: 0.98, z: 0 } },
      { label: 'Hair/Support', position: { x: 0, y: 0.9, z: 0.1 } },
      { label: 'Bent Knee', position: { x: 0.05, y: 0.3, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
