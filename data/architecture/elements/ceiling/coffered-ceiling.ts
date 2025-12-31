import type { ArchitecturalElement } from '../../types';

export const COFFERED_CEILING: ArchitecturalElement = {
  id: 'coffered-ceiling',
  slug: 'coffered-ceiling',
  name: 'Coffered Ceiling',
  alternativeNames: ['Caisson Ceiling', 'Lacunar', 'Sunken Panel Ceiling'],
  pronunciation: {
    phonetic: 'KOF-erd SEE-ling',
    language: 'English',
  },
  etymology: {
    origin: 'Old French/Latin',
    meaning: 'Chest or coffer (referring to the sunken panels)',
    rootWord: 'From Latin "cophinus" (basket) via Old French "cofre"',
  },
  category: 'CEILING',
  subcategory: 'ceiling_types',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/coffered-ceiling-primary.jpg',
    gallery: [
      '/images/architecture/elements/coffered-ceiling-pantheon.jpg',
      '/images/architecture/elements/coffered-ceiling-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/coffered-ceiling-construction.svg',
  },

  description: {
    ELEMENTARY: 'A coffered ceiling has a pattern of sunken squares or other shapes, like a waffle! The squares are called coffers. The most famous one is in the Pantheon in Rome-it looks like a huge bowl with square dents all over it. Coffered ceilings make rooms look very grand.',
    MIDDLE_SCHOOL: 'Coffered ceilings feature a grid of recessed panels (coffers) framed by beams. The Pantheon\'s dome has the most famous coffered ceiling in history. Besides looking impressive, the coffers reduce weight-important for large spans. Traditional coffers were stone or plaster; modern ones might be wood, metal, or acoustic panels.',
    HIGH_SCHOOL: 'The coffered ceiling divides a surface into a grid of sunken panels through intersecting beams or ribs. Roman examples (Pantheon) reduced concrete dome weight while creating decorative pattern. Renaissance and Baroque ceilings often painted coffer interiors with decorative programs. Modern coffered ceilings provide acoustic control, conceal services, and continue the visual tradition.',
    UNDERGRADUATE: 'Coffered ceiling design addresses structural efficiency, acoustic performance, and visual organization. Roman concrete coffering simultaneously decorated and lightened dome construction. Renaissance wood coffering in secular palaces referenced ancient authority while accommodating beam spans. Contemporary applications include acoustic absorption (perforated coffers), lighting integration, and HVAC distribution. Grid geometry can be orthogonal, radial, or parametric.',
    GRADUATE: 'Coffered ceiling analysis integrates structural mechanics, acoustic science, and art historical interpretation. Research examines coffer proportions in classical theory (Vitruvius, Palladio), the structural role of coffering in thin-shell construction, and the iconographic programs of painted coffers. Contemporary practice explores coffered ceilings as integrated environmental systems addressing lighting, acoustics, and air distribution.',
    PHD: 'Research into coffered ceilings addresses Roman construction technology, Renaissance design theory, and contemporary environmental performance. Archaeological investigation examines formwork traces in Roman concrete coffering. Art historical analysis situates painted coffer programs within patronage contexts. Building science research optimizes acoustic and thermal performance of modern coffered systems.',
  },

  history: {
    ELEMENTARY: 'The ancient Romans built the most famous coffered ceiling ever-the Pantheon dome, almost 2,000 years ago! They discovered that the waffle pattern made the heavy stone roof lighter. People have copied this idea ever since for important buildings like libraries and government buildings.',
    MIDDLE_SCHOOL: 'Greek and Roman builders developed coffered ceilings for both structural and decorative reasons. The Pantheon\'s dome (126 CE) features five rings of 28 coffers each. Renaissance architects revived the technique in wood for palace rooms. Beaux-Arts buildings (late 1800s-early 1900s) featured elaborate plaster coffering. Modern architecture continues the tradition in new materials.',
    HIGH_SCHOOL: 'Greek stone coffering in temples (Propylaea, Athens) established precedent. Roman innovation applied coffering to concrete construction, reducing dome weight while enabling larger spans. Medieval practice declined, but Renaissance revival transformed coffering into vehicles for painted programs (Sistine Chapel ceiling relates conceptually). Neoclassical and Beaux-Arts traditions elaborated plaster coffering. Contemporary practice abstracts the pattern for acoustic ceilings.',
    UNDERGRADUATE: 'Coffered ceiling history reveals the interplay of structure and ornament. Greek stone coffers were essentially structural, formed by crossing beams. Roman concrete coffering exploited plastic material properties to reduce mass while creating pattern. Renaissance wood coffering in secular buildings-often painted by major artists-created autonomous design fields. Industrial-era plaster casting enabled mass reproduction of classical profiles.',
    GRADUATE: 'Historical analysis of coffering examines technical development, design theory, and cultural meaning. Research addresses construction sequences (Roman concrete formwork, Renaissance wood joinery), proportional systems (module relationships), and iconographic programs (cosmological ceiling paintings). Conservation challenges include structural assessment of historic ceilings and appropriate intervention methods.',
    PHD: 'Coffered ceiling research engages multiple methodologies: archaeological investigation of Roman construction, documentary analysis of Renaissance workshop practice, and technical analysis of historic materials. Current scholarship examines the cultural significance of classical revival coffering, the adaptation of the type for modern materials and construction systems, and performance optimization for acoustic and environmental applications.',
  },

  characteristics: [
    'Grid of sunken panels (coffers)',
    'Created by crossing beams or ribs',
    'Reduces weight in masonry construction',
    'Provides visual rhythm and scale',
    'Can house lighting fixtures',
    'May feature painted decoration',
    'Various materials: concrete, wood, plaster, metal',
  ],

  famousExamples: [
    { name: 'Pantheon Dome', location: 'Rome, Italy', year: '126 CE', description: 'Most famous coffered ceiling with diminishing coffer sizes toward oculus' },
    { name: 'St. Peter\'s Basilica Nave', location: 'Vatican City', year: '1626', description: 'Gilded barrel-vault coffering by Maderno' },
    { name: 'Library of Congress', location: 'Washington D.C., USA', year: '1897', description: 'Beaux-Arts coffering with elaborate painted decoration' },
    { name: 'Union Station', location: 'Washington D.C., USA', year: '1907', description: 'Grand hall with octagonal coffers' },
    { name: 'National Gallery East Building', location: 'Washington D.C., USA', year: '1978', description: 'I.M. Pei\'s modern concrete coffered ceiling' },
  ],

  confusionPairs: [
    {
      elementId: 'waffle-slab',
      reason: 'Both feature grid patterns of recesses',
      distinction: 'Coffered ceilings are the finished underside; waffle slabs are structural concrete floor systems',
    },
    {
      elementId: 'exposed-beams',
      reason: 'Both show ceiling structure',
      distinction: 'Coffered ceilings have regular recessed panels; exposed beams show structural members without panel pattern',
    },
  ],

  searchTags: ['ceiling', 'coffers', 'panels', 'roman', 'dome', 'pantheon', 'beams', 'grid', 'acoustic'],

  arMetadata: {
    modelPath: '/models/architecture/coffered-ceiling.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Coffer Panel', position: { x: 0, y: -0.1, z: 0 } },
      { label: 'Beam/Rib', position: { x: 0.25, y: 0, z: 0 } },
      { label: 'Rosette', position: { x: 0, y: -0.15, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
