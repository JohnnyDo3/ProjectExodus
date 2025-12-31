import type { ArchitecturalElement } from '../../types';

export const MOSAIC_FLOOR: ArchitecturalElement = {
  id: 'mosaic-floor',
  slug: 'mosaic-floor',
  name: 'Mosaic Floor',
  alternativeNames: ['Floor Mosaic', 'Opus Tessellatum', 'Pavement Mosaic'],
  pronunciation: {
    phonetic: 'moh-ZAY-ik FLOOR',
    language: 'English',
  },
  etymology: {
    origin: 'Greek/Latin',
    meaning: 'Work of the Muses',
    rootWord: 'From Greek "mouseion" via Latin "musaicum"',
  },
  category: 'FLOOR',
  subcategory: 'paving',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'BYZANTINE', 'MEDIEVAL', 'RENAISSANCE', 'VICTORIAN'],
  regions: ['MEDITERRANEAN', 'MIDDLE_EAST', 'NORTH_AFRICA', 'WESTERN_EUROPE'],

  images: {
    primary: '/images/architecture/elements/mosaic-floor-primary.jpg',
    gallery: [
      '/images/architecture/elements/mosaic-floor-roman.jpg',
      '/images/architecture/elements/mosaic-floor-geometric.jpg',
    ],
    diagram: '/images/architecture/diagrams/mosaic-techniques.svg',
  },

  description: {
    ELEMENTARY: 'A mosaic floor is like a giant puzzle made of tiny stone or glass pieces! Each little piece is called a tessera. Ancient Romans made beautiful pictures of animals, gods, and patterns on their floors using thousands of these tiny squares.',
    MIDDLE_SCHOOL: 'Mosaic floors are created by setting small pieces of stone, glass, or ceramic (tesserae) into mortar to form patterns or images. The Romans perfected this art, creating elaborate floors for homes, baths, and public buildings. Colors come from natural stone or colored glass (smalti).',
    HIGH_SCHOOL: 'Floor mosaics employ tesserae-small cubes of stone, glass, or ceramic-set into a mortar bed to create decorative surfaces. Roman opus tessellatum used standardized cubes for geometric patterns, while opus vermiculatum employed tiny tesserae for detailed pictorial work. Byzantine mosaics introduced gold glass tesserae and three-dimensional effects.',
    UNDERGRADUATE: 'Mosaic flooring represents sophisticated craft technology combining material science, geometric planning, and pictorial composition. Roman production involved quarrying colored stones, cutting tesserae, preparing lime mortar bedding layers (rudus, nucleus, supranucleus), and systematic installation. Workshop organization ranged from traveling specialists to local craftsmen following pattern books (exemplaria).',
    GRADUATE: 'Mosaic floor analysis integrates archaeological method, art historical interpretation, and conservation science. Setting bed stratigraphy reveals construction sequences. Tesserae petrography identifies material sources and trade networks. Iconographic analysis situates floor programs within cultural contexts. Conservation addresses lime mortar chemistry, tessera reattachment, and protective consolidation.',
    PHD: 'Mosaic floor research engages classical archaeology, Roman economy, and craft specialization. Scholarship examines workshop organization, pattern transmission, and regional stylistic development. Scientific analysis-petrography, isotope studies-reconstructs material sourcing. Conservation science develops in situ consolidation methods and addresses climate-related deterioration mechanisms.',
  },

  history: {
    ELEMENTARY: 'The oldest mosaic floors come from ancient Mesopotamia about 4,000 years ago! The Greeks started making fancy picture mosaics, and the Romans spread this art throughout their empire. Many Roman mosaic floors still survive under cities today.',
    MIDDLE_SCHOOL: 'Pebble mosaics appeared in the Near East around 3000 BCE. Greeks developed tessera mosaics in the 4th century BCE, with Macedonian royal floors showing remarkable artistry. Romans industrialized production, creating mosaic floors throughout their empire. Byzantine artists shifted focus to walls but maintained floor traditions. Medieval and Victorian revivals continued the craft.',
    HIGH_SCHOOL: 'Mosaic flooring evolved from simple pebble pavements (Gordion, 8th century BCE) through Greek tessellated work (Pella, 4th century BCE) to Roman industrial production. Roman workshops developed systematic techniques: opus signinum (mortar with crushed pottery), opus tessellatum (regular geometric tesserae), and opus vermiculatum (fine pictorial work). Post-Roman decline gave way to medieval revivals (Cosmati work) and 19th-century archaeological enthusiasm.',
    UNDERGRADUATE: 'The history of floor mosaics illuminates ancient craft organization and artistic development. Hellenistic innovations-vermiculatum technique, emblema panels-established pictorial sophistication. Roman expansion created demand filled by traveling workshops and pattern dissemination. Provincial variations reveal local adaptation of central models. Byzantine production maintained classical techniques while developing regional styles. Revival movements from Cosmati through Victorian reproductions reinterpreted ancient craft.',
    GRADUATE: 'Mosaic historiography examines technological transfer, workshop organization, and stylistic evolution across regions and periods. Research questions include: How did tessera production scale? What role did pattern books play in standardization? How do provincial mosaics reflect cultural hybridity? Conservation challenges address distinguishing original from restored areas, understanding ancient mortar chemistry, and developing compatible repair materials.',
    PHD: 'Floor mosaic scholarship represents an interdisciplinary field engaging archaeology, art history, materials science, and conservation. Research programs examine production economics (quarry to floor), iconographic programs in social context, and material deterioration mechanisms. Current investigations include digital documentation methods, non-invasive mortar analysis, and climate change impacts on in situ mosaics.',
  },

  characteristics: [
    'Tesserae set in mortar bedding',
    'Geometric or pictorial designs',
    'Durable surface for foot traffic',
    'Natural stone or glass tesserae',
    'Prepared mortar bed layers',
    'Can include figurative imagery',
    'Colors from natural materials',
  ],

  famousExamples: [
    { name: 'Alexander Mosaic', location: 'Naples Museum (from Pompeii)', year: 'c. 100 BCE', description: 'Detailed battle scene with tiny tesserae' },
    { name: 'Lod Mosaic', location: 'Lod, Israel', year: '3rd-4th century CE', description: 'Spectacular Roman villa floor with animals' },
    { name: 'Piazza Armerina', location: 'Sicily, Italy', year: '4th century CE', description: 'Extensive villa mosaics including bikini athletes' },
    { name: 'Hagia Sophia Floors', location: 'Istanbul, Turkey', year: '6th century CE', description: 'Byzantine geometric opus sectile and tessellatum' },
    { name: 'Westminster Abbey Chapter House', location: 'London, UK', year: '1250s', description: 'Medieval Cosmati pavement' },
  ],

  confusionPairs: [
    {
      elementId: 'terrazzo',
      reason: 'Both embed pieces in a matrix',
      distinction: 'Mosaic uses deliberately placed tesserae in patterns; terrazzo uses random aggregate chips',
    },
    {
      elementId: 'opus-sectile',
      reason: 'Both are ancient stone floor techniques',
      distinction: 'Mosaic uses small regular tesserae; opus sectile uses larger cut pieces fitted together',
    },
  ],

  searchTags: ['flooring', 'tesserae', 'roman', 'byzantine', 'pattern', 'ancient', 'paving', 'pictorial'],

  arMetadata: {
    modelPath: '/models/architecture/mosaic-floor.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Stone Tesserae', position: { x: 0, y: 0, z: 0.1 } },
      { label: 'Mortar Bed', position: { x: 0.2, y: -0.05, z: 0 } },
      { label: 'Border Pattern', position: { x: 0.4, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
