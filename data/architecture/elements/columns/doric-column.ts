import type { ArchitecturalElement } from '../../types';

export const DORIC_COLUMN: ArchitecturalElement = {
  id: 'doric-column',
  slug: 'doric-column',
  name: 'Doric Column',
  alternativeNames: ['Doric Order', 'Greek Doric', 'Roman Doric'],
  pronunciation: {
    phonetic: 'DOR-ik',
    language: 'English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Named after the Dorian Greeks who developed this style',
    rootWord: 'Dōrikos (Δωρικός)',
  },
  category: 'COLUMN',
  subcategory: 'column_orders',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/doric-column-primary.jpg',
    gallery: [
      '/images/architecture/elements/doric-parthenon.jpg',
      '/images/architecture/elements/doric-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/doric-order.svg',
  },

  description: {
    ELEMENTARY: 'The Doric column is the simplest and oldest type of Greek column. It\'s thick and strong-looking, with no fancy base at the bottom-it sits right on the floor! The top has a plain, cushion-like part called a capital. Think of it as the "strong and simple" column.',
    MIDDLE_SCHOOL: 'The Doric order is the earliest and most basic of the three main Greek column styles. It has no base, sitting directly on the stylobate (platform). Its capital is plain with a round cushion (echinus) topped by a square slab (abacus). The shaft has 20 shallow grooves called flutes and gets slightly thinner toward the top.',
    HIGH_SCHOOL: 'The Doric order, originating around the 7th century BCE, represents the oldest and most austere of the Classical orders. Characterized by its lack of a base, its stocky proportions (height typically 4-6 times the base diameter), and its simple capital consisting of an echinus and abacus, the Doric order embodies ideals of strength and masculinity in Greek architectural theory.',
    UNDERGRADUATE: 'The Doric order emerged in the Archaic period as a translation of wooden construction into stone. Its proportional system, canonized by the 5th century BCE, establishes a height-to-diameter ratio of approximately 5.5:1. The triglyphs and metopes of the Doric frieze derive from the ends of wooden ceiling beams and the spaces between them, demonstrating the order\'s tectonic origins.',
    GRADUATE: 'The Doric order presents significant historiographical challenges regarding its origins and meaning. While Vitruvius associated it with masculine proportions and the Doric tribe, modern scholarship emphasizes its technological origins in timber-to-stone translation and its symbolic functions in Greek civic and religious contexts. The "corner problem" of Doric design-reconciling triglyph placement at corners-reveals the tensions between structural logic and aesthetic ideals.',
    PHD: 'The Doric order constitutes a rich field for examining the relationship between form and meaning in Greek architecture. From its emergence in the 7th century BCE through its Roman adaptations and Renaissance reinterpretations, the order embodies evolving theories of proportion, expression, and architectural propriety. Critical analysis must address both ancient sources (Vitruvius, Pausanias) and modern theoretical frameworks examining the order\'s semiotic functions.',
  },

  history: {
    ELEMENTARY: 'The Doric column was invented by ancient Greeks over 2,500 years ago! The most famous Doric building is the Parthenon in Athens, a temple for the goddess Athena. The Romans later used Doric columns too, but made them a bit fancier.',
    MIDDLE_SCHOOL: 'The Doric order developed in Greece around 700-600 BCE, possibly evolving from earlier wooden temples. The Parthenon (447-432 BCE) represents the perfection of Greek Doric. Romans adopted and modified the order, often adding a base. During the Renaissance and Neoclassical periods, architects revived Doric design for buildings meant to convey strength and authority.',
    HIGH_SCHOOL: 'The Doric order\'s development can be traced from early wooden structures to the mature stone temples of the Classical period. Key monuments include the Temple of Hera at Olympia (600 BCE), the Temple of Zeus at Olympia, and the Parthenon. Roman adaptations introduced bases and modified proportions. Renaissance theorists like Alberti and Palladio codified Doric as appropriate for fortifications and masculine dedications.',
    UNDERGRADUATE: 'The emergence of the Doric order represents a critical moment in Greek architectural history, marking the translation of timber construction into permanent stone form. The Temple of Hera I at Paestum (c. 550 BCE) demonstrates early Doric characteristics, while the Parthenon represents the culmination of optical refinements including entasis, column inclination, and stylobate curvature. Roman modifications, documented by Vitruvius, standardized the mutular Doric form.',
    GRADUATE: 'The historiography of Doric origins remains contested, with debates between evolutionary models (from Mycenaean megaron) and revolutionary models (influenced by Egyptian or Near Eastern prototypes). Analysis of specific monuments reveals the order\'s flexibility: the Temple of Apollo at Bassae combines Doric exterior with Ionic and Corinthian interiors. Post-antique reception, from Bramante\'s Tempietto to Schinkel\'s Altes Museum, demonstrates continuous reinterpretation of Doric significance.',
    PHD: 'Scholarly approaches to the Doric order encompass archaeological reconstruction, proportional analysis, theoretical interpretation, and reception studies. Key debates include: the chronology of order development, the symbolic meanings attributed to Doric in antiquity, the relationship between prescriptive texts (Vitruvius) and built examples, and the ideological deployments of Doric in various historical contexts from Greek civic identity to 18th-century democratic associations.',
  },

  characteristics: [
    'No base - sits directly on stylobate',
    'Stocky proportions (height 4-6× diameter)',
    '20 shallow flutes with sharp arrises',
    'Simple capital: echinus + abacus',
    'Entablature with triglyphs and metopes',
    'Subtle entasis (convex curve) on shaft',
  ],

  famousExamples: [
    { name: 'The Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'The pinnacle of Greek Doric design' },
    { name: 'Temple of Hephaestus', location: 'Athens, Greece', year: '449-415 BCE', description: 'Best-preserved ancient Greek temple' },
    { name: 'Temple of Poseidon', location: 'Sounion, Greece', year: '444-440 BCE', description: 'Dramatic clifftop temple' },
    { name: 'Panthéon', location: 'Paris, France', year: '1758-1790', description: 'Neoclassical French landmark' },
    { name: 'Lincoln Memorial', location: 'Washington D.C., USA', year: '1914-1922', description: 'Greek Doric revival in America' },
  ],

  confusionPairs: [
    {
      elementId: 'tuscan-column',
      reason: 'Both are simple orders without ornate capitals',
      distinction: 'Tuscan has a base and unfluted shaft; Doric has no base and 20 flutes',
    },
    {
      elementId: 'ionic-column',
      reason: 'Both are Greek orders',
      distinction: 'Ionic has volute scrolls on capital and a base; Doric is simpler',
    },
  ],

  searchTags: ['column', 'greek', 'order', 'classical', 'parthenon', 'temple', 'fluted', 'ancient', 'doric', 'simple'],

  arMetadata: {
    modelPath: '/models/architecture/doric-column.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Capital', position: { x: 0, y: 0.95, z: 0 } },
      { label: 'Echinus', position: { x: 0.1, y: 0.9, z: 0 } },
      { label: 'Fluting', position: { x: 0.15, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 1, // Very recognizable, good for beginners
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
