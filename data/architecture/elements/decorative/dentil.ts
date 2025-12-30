import type { ArchitecturalElement } from '../../types';

export const DENTIL: ArchitecturalElement = {
  id: 'dentil',
  slug: 'dentil',
  name: 'Dentil',
  alternativeNames: ['Dentil Band', 'Tooth Ornament', 'Dental Molding'],
  pronunciation: {
    phonetic: 'DEN-til',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Little tooth',
    rootWord: 'Dens (tooth) + diminutive suffix -iculus',
  },
  category: 'DECORATIVE',
  subcategory: 'classical_ornament',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/dentil-primary.jpg',
    gallery: [
      '/images/architecture/elements/dentil-detail.jpg',
      '/images/architecture/elements/dentil-pattern.jpg',
    ],
    diagram: '/images/architecture/diagrams/dentil-spacing.svg',
  },

  description: {
    ELEMENTARY: 'Dentils are small square blocks that look like teeth lined up in a row. You usually find them under the roof edge of fancy buildings. They\'re called dentils because "dent" means tooth, and they look like a row of square teeth!',
    MIDDLE_SCHOOL: 'Dentils are small rectangular blocks arranged in a series, typically found in the bed molding of a cornice in classical architecture. They\'re characteristic of the Ionic, Corinthian, and Composite orders, though they also appear in some Roman Doric work. The blocks are evenly spaced with gaps between them.',
    HIGH_SCHOOL: 'Dentils represent a distinctive ornamental feature of classical architecture, consisting of small, tooth-like rectangular blocks arranged in a horizontal band, typically in the cornice\'s bed molding. Originating in Ionic architecture, dentils likely represent the ends of ceiling rafters translated into stone. Their spacing and proportions are carefully calculated to create rhythmic visual interest.',
    UNDERGRADUATE: 'The dentil course constitutes a key ornamental element in the Ionic and Corinthian orders, with specific proportional relationships governing block size and spacing. Ancient practice established dentil height at approximately half the width, with interdental spaces equaling half the dentil width. The origin theory suggesting dentils represent rafter ends in timber construction parallels broader debates about ornament\'s relationship to tectonic truth.',
    GRADUATE: 'Dentil articulation demonstrates the classical system\'s sophisticated approach to architectural scaling and visual rhythm. Vitruvius\'s prohibition against combining dentils with modillions (based on structural incompatibility in timber construction) was widely debated by Renaissance theorists and often violated in practice. Analysis of dentil spacing reveals architects\' responses to the "corner problem" - maintaining visual rhythm while turning corners and accommodating varying intercolumniation.',
    PHD: 'The dentil presents significant research questions regarding the relationship between ornamental convention and structural rationalism in classical architecture. Archaeological evidence from 4th-century BCE Ionic temples challenges assumptions about standardized proportions. The Renaissance revival required reinterpretation of fragmentary ancient examples, leading to codified systems that sometimes contradicted archaeological reality. Contemporary research examines dentils through lenses including structural symbolism, craft practice, and semiotic theory.',
  },

  history: {
    ELEMENTARY: 'The ancient Greeks invented dentils over 2,500 years ago when they built beautiful temples. The Romans liked them too and used them on many buildings. Architects have been copying this "teeth" pattern ever since, especially on important buildings like banks and government offices.',
    MIDDLE_SCHOOL: 'Dentils first appeared in Greek Ionic architecture around the 5th century BCE, possibly originating in Asia Minor. They became a standard feature of the Ionic and Corinthian orders. Romans adopted and spread dentil decoration throughout their empire. Renaissance architects revived dentils in the 1400s-1600s, and they remained popular through the Neoclassical period into the early 1900s.',
    HIGH_SCHOOL: 'The dentil\'s origins trace to Ionic temples in 5th-century BCE Asia Minor, possibly representing a translation of timber rafter ends into stone ornament. The Temple of Apollo at Bassae demonstrates early dentil use. Roman architects incorporated dentils widely, as seen in the Temple of Portunus. Renaissance architects studied Roman precedents and systematized dentil proportions in their treatises, ensuring continued use through various revival styles.',
    UNDERGRADUATE: 'Dentil development reveals the complex relationship between structural origins and ornamental convention. While likely deriving from exposed beam ends in timber construction, stone dentils became purely decorative elements divorced from structural logic. Hellenistic expansion of the Ionic order spread dentil use geographically. Roman adaptation included dentil application to Corinthian work, as seen in the Maison Carrée. Renaissance codification by Serlio, Vignola, and Palladio established proportional systems still influential today.',
    GRADUATE: 'Scholarly examination of dentils addresses multiple historical and theoretical questions. Vitruvius\'s critique of combining dentils and modillions reflected structural logic in timber construction but was often ignored in stone execution. Archaeological studies of Greek Asia Minor sites illuminate regional variations in dentil design. The Renaissance invention of standardized proportions, while claiming ancient authority, actually imposed uniformity foreign to ancient practice. Modern conservation research addresses deterioration patterns and replacement strategies.',
    PHD: 'The dentil serves as an exemplary case study for examining ornamental meaning and architectural theory. Research questions include: How did regional workshops develop distinct dentil traditions? What explains Renaissance architects\' selective adoption of ancient precedents? How did 19th-century archaeological discoveries impact dentil design? Contemporary scholarship also explores dentils through anthropological frameworks examining craft knowledge transmission and through conservation science addressing stone deterioration. The persistent appeal of dentils in contemporary classicism raises questions about ornamental meaning in modern contexts.',
  },

  characteristics: [
    'Small rectangular or square blocks',
    'Arranged in evenly spaced horizontal band',
    'Typically half as high as they are wide',
    'Spaces between blocks equal half the dentil width',
    'Usually located in cornice bed molding',
    'Characteristic of Ionic and Corinthian orders',
  ],

  famousExamples: [
    { name: 'Erechtheion', location: 'Athens, Greece', year: '421-406 BCE', description: 'Classic Greek Ionic dentils on north porch' },
    { name: 'Maison Carrée', location: 'Nîmes, France', year: '16 CE', description: 'Roman temple with prominent dentil course' },
    { name: 'Villa Rotonda', location: 'Vicenza, Italy', year: '1567-1571', description: 'Palladio\'s Renaissance interpretation of dentils' },
    { name: 'Monticello', location: 'Virginia, USA', year: '1768-1809', description: 'Jefferson\'s use of dentils in American Neoclassicism' },
    { name: 'British Museum', location: 'London, England', year: '1823-1852', description: 'Greek Revival dentils on main facade' },
  ],

  confusionPairs: [
    {
      elementId: 'modillion',
      reason: 'Both are decorative brackets in the cornice',
      distinction: 'Dentils are small rectangular blocks; modillions are larger ornate brackets with scrolls',
    },
    {
      elementId: 'triglyph',
      reason: 'Both are regularly spaced vertical elements',
      distinction: 'Triglyphs are larger vertical blocks with grooves in Doric friezes; dentils are tiny blocks in cornices',
    },
  ],

  searchTags: ['ornament', 'tooth', 'classical', 'cornice', 'ionic', 'block', 'molding', 'dentil', 'decoration', 'band'],

  arMetadata: {
    modelPath: '/models/architecture/dentil.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Dentil Block', position: { x: 0, y: 0, z: 0.1 } },
      { label: 'Interdental Space', position: { x: 0.05, y: 0, z: 0 } },
      { label: 'Dentil Band', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
