import type { ArchitecturalElement } from '../../types';

export const MASONRY: ArchitecturalElement = {
  id: 'masonry',
  slug: 'masonry',
  name: 'Masonry',
  alternativeNames: ['Stonework', 'Brickwork', 'Opus', 'Stone Masonry'],
  pronunciation: {
    phonetic: 'MAY-sun-ree',
    language: 'English',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'The craft and product of building with stone or brick',
    rootWord: 'From Old French "maçonerie", from "maçon" (mason), possibly from Frankish "makjō" (to make)',
  },
  category: 'WALL',
  subcategory: 'construction_method',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/masonry-primary.jpg',
    gallery: [
      '/images/architecture/elements/masonry-ashlar.jpg',
      '/images/architecture/elements/masonry-rubble.jpg',
    ],
    diagram: '/images/architecture/diagrams/masonry-bond-patterns.svg',
  },

  description: {
    ELEMENTARY: 'Masonry is the art of building walls by stacking stones or bricks together with mortar (a special paste that hardens). It\'s one of the oldest ways humans have built things — from the pyramids of Egypt to the buildings in your town!',
    MIDDLE_SCHOOL: 'Masonry is a construction technique where individual units — stones, bricks, or concrete blocks — are laid in courses and bonded together with mortar. Different patterns of laying (bonds) give walls different strengths and appearances. Ashlar masonry uses precisely cut stones, while rubble masonry uses irregularly shaped stones.',
    HIGH_SCHOOL: 'Masonry construction encompasses a range of techniques from rough rubble to precisely cut ashlar. Key concepts include bond patterns (stretcher, header, Flemish, English), mortar types, and load-bearing behavior. Masonry walls resist compression well but are weak in tension, which historically limited openings and spans. Reinforced masonry addresses this limitation with embedded steel.',
    UNDERGRADUATE: 'Masonry represents humanity\'s most enduring construction material system. Structural behavior is governed by the interaction between units and mortar — compressive strength, bond strength, and joint characteristics. Classification systems distinguish by material (stone, brick, block), unit preparation (ashlar vs. rubble), and bonding pattern (coursed, random, polygonal). Roman innovations in concrete masonry (opus caementicium) and brick standardization (opus testaceum) established techniques still influential today.',
    GRADUATE: 'Masonry analysis addresses material mechanics, conservation science, and construction history. The composite behavior of unit-mortar systems produces complex stress distributions under load. Historical mortar analysis (lime vs. Portland cement) informs conservation strategies — inappropriate repointing with hard cement mortars remains a primary cause of historic masonry deterioration. Computational modeling of masonry structures uses discrete element methods to capture joint behavior and progressive failure.',
    PHD: 'Current masonry research spans computational mechanics (homogenization techniques for anisotropic unit-mortar composites), seismic engineering (behavior of unreinforced masonry under cyclic loading), materials science (nano-lime consolidants, compatible repair mortars), and archaeometry (provenance studies using thin-section petrography and chemical analysis). The field bridges heritage conservation and contemporary structural design, with mass masonry structures experiencing renewed interest for thermal mass and embodied carbon advantages.',
  },

  history: {
    ELEMENTARY: 'Masonry is one of the oldest building methods in the world! The ancient Egyptians built the pyramids with massive stone blocks over 4,500 years ago. The Romans invented a type of concrete masonry that let them build enormous structures like the Colosseum. People still build with brick and stone today!',
    MIDDLE_SCHOOL: 'Masonry dates to the earliest permanent settlements — Jericho\'s walls (c. 8000 BCE) used sun-dried mud bricks. Ancient Egypt perfected stone cutting for pyramids. Romans developed standardized bricks and concrete masonry (opus caementicium). Medieval builders created soaring Gothic cathedrals using advanced stone masonry. The Industrial Revolution mechanized brick production, making masonry affordable for mass housing.',
    HIGH_SCHOOL: 'The history of masonry parallels the history of civilization. Mesopotamian ziggurats used sun-dried and fired bricks. Egyptian pyramid construction required precise stone cutting and placement at enormous scale. Greek temples perfected ashlar masonry with minimal mortar. Roman innovations — standardized bricks, pozzolanic mortar, concrete cores with masonry facings (opus techniques) — enabled unprecedented structural achievements. Medieval Gothic pushed stone masonry to its structural limits.',
    UNDERGRADUATE: 'Masonry history reveals a continuous dialogue between material properties, structural ambition, and craft knowledge. Ancient dry-stone traditions (Inca, Mycenaean) achieved remarkable precision without mortar. Roman opus classifications (incertum, reticulatum, testaceum, mixtum) document systematic material experimentation. Medieval masonic lodges transmitted cutting and setting techniques through apprenticeship. The 19th-century shift from structural masonry to steel/concrete frames relegated masonry to cladding — a transformation with profound implications for craft knowledge preservation.',
    GRADUATE: 'Historical masonry analysis reveals the evolution of structural understanding from empirical rules to engineering science. Medieval builder\'s geometry — the transmission of proportioning systems through lodge traditions — encoded structural knowledge in geometric procedures. The emergence of elastic analysis in the 19th century (Rankine, Moseley) reframed masonry design from craft to calculation. Contemporary structural masonry research recovers empirical wisdom through computational and experimental investigation.',
    PHD: 'Masonry historiography engages construction archaeology, materials science, and the history of structural engineering. Current research examines the relationship between mortar technology and structural form — how Roman pozzolanic mortars enabled the Pantheon\'s dome, and how the loss of this technology constrained early medieval construction. Digital documentation (photogrammetry, laser scanning) enables quantitative analysis of historic masonry fabric, wall thickness ratios, and construction sequences.',
  },

  characteristics: [
    'Construction using discrete units (stone, brick, block)',
    'Units laid in courses and bonded with mortar',
    'High compressive strength, low tensile strength',
    'Various bond patterns for strength and aesthetics',
    'Ranges from rough rubble to precisely cut ashlar',
    'Thermal mass provides natural temperature regulation',
    'Durable — masonry structures can last millennia',
  ],

  famousExamples: [
    { name: 'Great Pyramid of Giza', location: 'Giza, Egypt', year: '2560 BCE', description: 'Precision-cut limestone blocks in the largest ancient masonry structure' },
    { name: 'Colosseum', location: 'Rome, Italy', year: '80 CE', description: 'Roman masonry and concrete construction supporting 50,000 spectators' },
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1220', description: 'Gothic stone masonry achieving unprecedented height and lightness' },
    { name: 'Monadnock Building', location: 'Chicago, USA', year: '1891', description: 'Last major load-bearing masonry skyscraper with 6-foot-thick base walls' },
  ],

  confusionPairs: [
    {
      elementId: 'curtain-wall',
      reason: 'Both form the outer envelope of buildings',
      distinction: 'Masonry walls are load-bearing structural elements; curtain walls are non-structural cladding hung from a structural frame',
    },
    {
      elementId: 'plinth',
      reason: 'Both involve stone or masonry construction',
      distinction: 'Masonry is the overall construction method; a plinth is a specific base element at the bottom of a wall or column',
    },
  ],

  searchTags: ['stone', 'brick', 'mortar', 'wall', 'ashlar', 'rubble', 'bond', 'construction', 'structural'],

  arMetadata: {
    modelPath: '/models/architecture/masonry.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Header Course', position: { x: 0, y: 0.8, z: 0.5 } },
      { label: 'Mortar Joint', position: { x: 0.3, y: 0.5, z: 0.5 } },
      { label: 'Stretcher Bond', position: { x: 0.5, y: 0.3, z: 0.5 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
