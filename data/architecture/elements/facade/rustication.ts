import type { ArchitecturalElement } from '../../types';

export const RUSTICATION: ArchitecturalElement = {
  id: 'rustication',
  slug: 'rustication',
  name: 'Rustication',
  alternativeNames: ['Rustic Work', 'Rusticated Masonry', 'Bossage'],
  pronunciation: {
    phonetic: 'rus-ti-KAY-shun',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'From "rusticus" meaning rough, country, or rural',
    rootWord: 'rusticatio',
  },
  category: 'FACADE',
  subcategory: 'wall_treatment',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'MANNERISM', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/rustication-primary.jpg',
    gallery: [
      '/images/architecture/elements/rustication-palazzo-pitti.jpg',
      '/images/architecture/elements/rustication-diamond.jpg',
      '/images/architecture/elements/rustication-smooth.jpg',
    ],
    diagram: '/images/architecture/diagrams/rustication-types.svg',
  },

  description: {
    ELEMENTARY: 'Rustication makes a building\'s stone walls look extra strong and powerful! The stones stick out with deep lines between them, creating shadows. Sometimes the stones are left rough and bumpy, and sometimes they\'re cut into cool shapes like diamonds. This makes the bottom part of fancy buildings look like a fortress!',
    MIDDLE_SCHOOL: 'Rustication is a way of treating stone walls where the blocks are cut with deeply recessed joints and textured or projecting faces, creating bold shadows and visual texture. Different types include: smooth rustication (flat blocks with deep joints), rough rustication (natural rough surface), diamond rustication (blocks cut into pyramid shapes), and banded rustication (alternating smooth and rusticated bands). Rustication is typically used on lower floors to make buildings look solid and strong.',
    HIGH_SCHOOL: 'Rustication is a masonry technique emphasizing the joints between stone blocks through deep V-cuts or chamfers, often combined with projecting or textured block faces. This treatment creates pronounced shadow patterns and conveys impressions of strength and permanence. Renaissance architects revived Roman rustication practices, developing a vocabulary of types: smooth rustication (flat-faced blocks), vermiculated rustication (worm-eaten texture), diamond-point rustication (pyramidal projections), and cyclopean rustication (irregularly shaped massive blocks). Rustication typically appears on ground floors and corners, establishing a visual base and suggesting structural solidity.',
    UNDERGRADUATE: 'Rustication functions both technically and symbolically in architectural design. Technically, recessed joints emphasize individual stone blocks and can accommodate slight settling. Symbolically, rustication evokes fortifications, natural formations, and ancient ruins, conveying strength, permanence, and connection to earth. Renaissance architects systematically explored rustication variations: Palazzo Medici-Riccardi demonstrates graduated rustication (rough lower, smooth upper); Palazzo Pitti features massive rough rustication; Palazzo Rucellai combines rustication with pilaster orders. Mannerist architects like Giulio Romano experimented with rustication\'s expressive potential, using it to suggest architectural power and even violence (Palazzo del Te). Rustication establishes tectonic hierarchies—distinguishing basement from piano nobile, corners from central masses, structural from decorative elements.',
    GRADUATE: 'Critical rustication analysis addresses the technique\'s evolution from functional necessity to expressive device. Roman examples (Porta Maggiore, Claudian aqueducts) established rustication as expressing engineered strength. Renaissance reception transformed rustication into a sophisticated design language. Theoretical discourse from Alberti through Serlio codified rustication types and appropriate applications. Alberti associated rustication with magnificence and durability; Serlio systematically illustrated rustication variations. Mannerist experiments destabilized Classical decorum—Giulio Romano\'s Palazzo del Te employs rustication to suggest architectural distress and tectonic instability. Baroque architects refined rustication for urban contexts, using it to distinguish institutional buildings and create visual hierarchies within multi-building complexes. Analysis must address rustication\'s multiple significations: structural expression, reference to ancient ruins, suggestion of geological formations, and demonstration of masonry virtuosity.',
    PHD: 'Advanced rustication scholarship engages the technique\'s technical, aesthetic, and semantic dimensions across historical contexts. Research questions include: How did rustication evolve from practical construction to expressive architectural language? What meanings did different rustication types carry in various periods? How did theoretical discourse shape rustication usage and interpretation? Methodological approaches encompass technical analysis of rustication cutting and construction; examination of theoretical texts prescribing rustication usage; iconographic investigation of rustication\'s symbolic associations (fortification, nature, antiquity); and analysis of rustication within broader architectural systems of expression. Key texts include Alberti\'s discussion of opus isodomum and rusticum, Serlio\'s systematic rustication taxonomy, and Piranesi\'s polemical rustication imagery. Theoretical frameworks address rustication through tectonics (expression of construction), semiotics (rustication as architectural sign), and phenomenology (rustication\'s haptic and visual qualities). The technique exemplifies how architectural elements function simultaneously as structural solutions and carriers of cultural meaning.',
  },

  history: {
    ELEMENTARY: 'The Romans first used rustication over 2,000 years ago on strong buildings like aqueducts and city gates. During the Renaissance in Italy (about 500 years ago), architects fell in love with this style! They used rustication on beautiful palaces to make them look powerful. The Palazzo Pitti in Florence has huge rusticated stones that look like a giant\'s building blocks!',
    MIDDLE_SCHOOL: 'Ancient Romans used rustication on engineering structures like aqueducts and fortifications, where its rugged appearance expressed strength. Renaissance architects in 15th-century Florence revived rustication for palaces: Palazzo Medici-Riccardi (1444-1484) by Michelozzo used graduated rustication, while Palazzo Pitti (1458+) by Brunelleschi featured massive rough-hewn blocks. Architects developed various rustication types for different effects. Giulio Romano\'s Palazzo del Te (1524-1534) used rustication expressively to suggest architectural power. French Renaissance and Baroque architects adopted rustication for châteaux and urban palaces. Neoclassical architecture continued rustication usage on ground floors and institutional buildings.',
    HIGH_SCHOOL: 'Rustication\'s development traces from Roman engineering through Renaissance revival to Neoclassical refinement. Roman examples include the Porta Maggiore in Rome and rusticated bases of structures like the Colosseum. After relative disuse in the Medieval period, Florentine Renaissance architects reintroduced rustication: Leon Battista Alberti\'s Palazzo Rucellai (1446-1451) combined smooth rustication with pilaster orders; Giuliano da Sangallo\'s Palazzo Gondi (1490s) featured refined rustication. Sebastiano Serlio\'s treatise (1537-1551) codified rustication types. Mannerist architects explored rustication\'s expressive potential—Giulio Romano, Bartolomeo Ammannati. French architects adopted rustication for châteaux (Fontainebleau, Louvre). Baroque architects used rustication to create urban hierarchies. Neoclassical architects employed rustication on institutional buildings to convey permanence and authority.',
    UNDERGRADUATE: 'Rustication\'s evolution demonstrates the transformation of construction technique into sophisticated design language. Roman rustication appeared on infrastructure and fortifications, expressing engineered strength through visual mass. Renaissance architects studied Roman examples and developed systematic rustication applications. Alberti\'s Palazzo Rucellai pioneered combination of smooth rustication with Classical orders. Michelozzo\'s Palazzo Medici-Riccardi introduced graduated rustication—decreasing roughness on ascending floors. Brunelleschi\'s (attributed) Palazzo Pitti employed massive rough rustication suggesting primordial strength. Theoretical codification came through Serlio\'s Libro Quarto (1537), illustrating rustication variations and appropriate contexts. Mannerist experiments included Giulio Romano\'s expressive rustication at Palazzo del Te and Villa Lante, and Ammannati\'s Palazzo Pitti courtyard. French Renaissance (Pierre Lescot\'s Louvre) and Baroque (Jules Hardouin-Mansart) architects adapted rustication for royal architecture. Neoclassical architects employed rustication on ground floors and corners, establishing visual bases for urban buildings.',
    GRADUATE: 'Critical rustication studies address technical evolution, theoretical discourse, and semantic functions. Roman rustication practices (opus isodomum variations) provided Renaissance precedents, though Medieval rustication largely disappeared except in fortifications. Renaissance reception involved both archaeological study and experimental development. Alberti\'s theoretical framework associated rustication with magnificence and durability. Serlio\'s systematic taxonomy established rustication types: smooth, diamond-point, vermiculated, and irregular. Practical applications varied from Palazzo Medici\'s graduated hierarchy to Palazzo Pitti\'s aggressive massiveness. Mannerist departures from Classical decorum—Giulio Romano\'s Palazzo del Te uses rustication to suggest architectural violence and instability, challenging Renaissance rationality. Theoretical debates addressed rustication\'s propriety for different building types and its relationship to Classical orders. Baroque refinement integrated rustication into urban design systems. Neoclassical archaeology informed more "correct" applications, though interpretation of Roman precedents varied. Analysis must address rustication\'s multiple significations across contexts: structural expression, reference to antiquity, suggestion of natural formations, and demonstration of stone-cutting virtuosity.',
    PHD: 'Advanced rustication scholarship engages multiple disciplinary approaches: technical analysis of cutting techniques and construction methods; historical investigation of rustication development and transmission; theoretical examination of prescriptive texts and design principles; and critical interpretation of rustication\'s cultural meanings. Key research questions include: How did rustication transform from construction technique to expressive device? What relationships existed between theoretical prescriptions and built examples? How did rustication signify differently across historical and cultural contexts? Primary sources include Vitruvius (limited rustication discussion), Alberti (De re aedificatoria), Serlio (Tutte l\'opere d\'architettura), Palladio, and later theorists. Methodological frameworks encompass tectonics (rustication as expression of construction), semiotics (rustication as architectural sign system), reception theory (how periods reinterpreted rustication), and social history (rustication in construction of institutional identity). Critical analysis reveals rustication functioning simultaneously as structural logic, aesthetic choice, and cultural signifier. Contemporary theoretical approaches examine rustication through materiality studies, phenomenology of surface, and critical regionalism debates about appropriate expressions of construction.',
  },

  characteristics: [
    'Deeply recessed joints between stone blocks',
    'Projecting or textured block faces creating shadows',
    'Types: smooth, rough, diamond-point, vermiculated, cyclopean',
    'Typically on ground floors and corners',
    'Suggests strength, solidity, and permanence',
    'Can be graduated (rougher below, smoother above)',
    'Creates strong horizontal banding patterns',
  ],

  famousExamples: [
    { name: 'Palazzo Pitti', location: 'Florence, Italy', year: '1458-1464', description: 'Massive rough rustication suggesting primordial strength' },
    { name: 'Palazzo Medici-Riccardi', location: 'Florence, Italy', year: '1444-1484', description: 'Graduated rustication by Michelozzo' },
    { name: 'Palazzo Rucellai', location: 'Florence, Italy', year: '1446-1451', description: 'Alberti\'s smooth rustication with pilaster orders' },
    { name: 'Palazzo del Te', location: 'Mantua, Italy', year: '1524-1534', description: 'Giulio Romano\'s expressive Mannerist rustication' },
    { name: 'Louvre Palace', location: 'Paris, France', year: '1546+', description: 'French Renaissance rustication by Pierre Lescot' },
    { name: 'Somerset House', location: 'London, England', year: '1776-1796', description: 'Neoclassical rusticated ground floor by William Chambers' },
  ],

  confusionPairs: [
    {
      elementId: 'ashlar',
      reason: 'Both are cut stone masonry',
      distinction: 'Ashlar has smooth faces and tight joints; rustication has deep joints and textured/projecting faces',
    },
  ],

  searchTags: ['rustication', 'stone', 'masonry', 'texture', 'renaissance', 'palazzo', 'rough', 'joints', 'shadow', 'basement', 'facade'],

  arMetadata: {
    modelPath: '/models/architecture/rustication.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Deep Joint', position: { x: 0.2, y: 0.5, z: 0 } },
      { label: 'Projecting Face', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Chamfered Edge', position: { x: 0.15, y: 0.5, z: 0.05 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
