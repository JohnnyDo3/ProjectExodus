import type { ArchitecturalElement } from '../../types';

export const ACANTHUS: ArchitecturalElement = {
  id: 'acanthus',
  slug: 'acanthus',
  name: 'Acanthus',
  alternativeNames: ['Acanthus Leaf', 'Acanthus Ornament', 'Bear\'s Breeches'],
  pronunciation: {
    phonetic: 'uh-KAN-thus',
    language: 'English',
  },
  etymology: {
    origin: 'Greek/Latin',
    meaning: 'Thorn or spine',
    rootWord: 'Akanthos (ἄκανθος) from akantha (thorn)',
  },
  category: 'DECORATIVE',
  subcategory: 'classical_ornament',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'BYZANTINE', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'MIDDLE_EAST', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/acanthus-primary.jpg',
    gallery: [
      '/images/architecture/elements/acanthus-corinthian.jpg',
      '/images/architecture/elements/acanthus-leaf-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/acanthus-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'The acanthus is a decorative carving that looks like a leafy plant with jagged, curly edges. It\'s the most famous decoration in classical architecture! You\'ll see these carved leaves especially on fancy Corinthian columns at the top. The ancient Greeks based it on a real plant that grew in their gardens.',
    MIDDLE_SCHOOL: 'The acanthus leaf is a stylized representation of a Mediterranean plant used as ornament in classical architecture. It features deeply cut, curved lobes giving it a dramatic, flowing appearance. Acanthus leaves are the defining feature of Corinthian capitals, where they appear in two tiers surrounding the capital. They also decorate friezes, moldings, and furniture.',
    HIGH_SCHOOL: 'The acanthus motif represents one of the most enduring and recognizable ornamental elements in Western architectural history. Based on the Acanthus mollis or Acanthus spinosus plants native to the Mediterranean, the stylized leaf features deeply indented lobes with curved tips that create dramatic shadow play. The acanthus defines the Corinthian order, appearing in two rings of eight leaves each around the capital, but also enriches countless other architectural elements.',
    UNDERGRADUATE: 'The acanthus leaf constitutes the fundamental ornamental vocabulary of the Corinthian order, with specific conventions governing its representation. Classical examples show two overlapping tiers of leaves - the lower row emerging from the capital base, the upper row positioned between the volutes. Each leaf typically displays seven to nine lobes with naturalistic veining and curled tips. The acanthus\' popularity stems from its sculptural plasticity - the deeply undercut leaves create rich chiaroscuro effects that remain legible at great heights.',
    GRADUATE: 'The acanthus represents a complex intersection of natural observation and artistic convention. While deriving from actual Mediterranean plants (primarily Acanthus mollis and spinosus), architectural acanthus became increasingly stylized across periods. Greek sculptors achieved remarkable naturalism in early Corinthian capitals (e.g., the Tholos at Epidaurus), while Roman versions often became more geometric. Renaissance artists studied both ancient examples and living plants, producing interpretations ranging from archaeological precision to creative elaboration. The acanthus\' semantic associations - including triumph, endurance, and the arts - contributed to its symbolic resonance.',
    PHD: 'Critical analysis of acanthus ornament addresses fundamental questions in architectural theory: the relationship between natural forms and architectural abstraction, the transmission of ornamental conventions across cultures and periods, and the mechanics of stylistic evolution. Research examines how Greek artists transformed botanical observation into architectural convention, how Roman workshops standardized and varied the motif, and how post-antique cultures reinterpreted it. Technical studies investigate carving techniques, from Greek hand-chiseling to Roman running drills to Renaissance pointing systems. Contemporary scholarship also explores the acanthus through eco-critical lenses examining human-nature relationships in architectural symbolism.',
  },

  history: {
    ELEMENTARY: 'Over 2,400 years ago, a Greek sculptor named Callimachus noticed how beautiful acanthus plants looked growing around a basket on a girl\'s grave. He got the idea to carve these leaves into stone columns, creating the fancy Corinthian style. Romans loved these leafy columns and built them everywhere. Artists have been carving acanthus leaves ever since!',
    MIDDLE_SCHOOL: 'According to legend, the Greek sculptor Callimachus invented the Corinthian capital around 450 BCE after seeing an acanthus plant growing around a basket. The earliest confirmed Corinthian capitals appear in the 5th century BCE. Romans enthusiastically adopted acanthus decoration, using it on capitals, friezes, and ornamental panels. Renaissance artists revived acanthus ornament in the 1400s, and it remained popular through Neoclassicism into the 1900s.',
    HIGH_SCHOOL: 'The acanthus leaf entered architectural vocabulary through the development of the Corinthian order in 5th-century BCE Greece. While Vitruvius\'s story of Callimachus and the basket may be apocryphal, the earliest surviving Corinthian capitals (Temple of Apollo Epicurius at Bassae, c. 427 BCE) show fully developed acanthus ornament. Romans expanded acanthus use beyond capitals to friezes, altars, and furniture. Byzantine artists created distinctive stylized versions. Renaissance recovery of ancient examples through measured drawings enabled accurate reproductions and creative variations.',
    UNDERGRADUATE: 'The acanthus motif\'s development reveals the complex process by which natural forms become architectural conventions. Early Greek examples from the 5th-4th centuries BCE show careful observation of actual plants, with varying degrees of stylization. The Tholos at Epidaurus and the Choragic Monument of Lysicrates demonstrate mature Classical handling. Roman adoption led to both heightened naturalism (as in Augustan work) and increased schematization (in provincial examples). The Renaissance "rediscovery" relied on Roman models, as Greek examples were largely inaccessible. Systematic documentation by architects from Palladio to Desgodetz created canonical versions.',
    GRADUATE: 'Scholarly examination of acanthus ornament addresses multiple intersecting questions. Botanical studies identify the specific species (Acanthus mollis versus spinosus) inspiring different versions. Archaeological research traces regional variations in Greek and Roman practice, challenging notions of unified classical style. Art historical analysis examines Byzantine transformations, Romanesque reinterpretations, and Gothic departures from classical naturalism. Renaissance pattern books and treatises demonstrate how fragments and partial ancient examples were reconstructed into complete systems. Modern conservation science investigates deterioration patterns and cleaning methods for carved acanthus, balancing preservation with readability.',
    PHD: 'The acanthus presents rich opportunities for interdisciplinary research combining botany, archaeology, art history, and theory. Key research areas include: technical analysis of ancient carving methods using microscopy and 3D scanning; examination of Renaissance learning processes through workshop drawings and treatises; study of neo-classical archaeological accuracy versus creative interpretation; investigation of 19th-century cast ornament production; and theoretical inquiry into natural mimesis versus architectural abstraction. Contemporary research also addresses the acanthus through phenomenological approaches examining embodied responses to ornamental complexity and through digital humanities methods analyzing stylistic evolution across large datasets of examples.',
  },

  characteristics: [
    'Based on Mediterranean Acanthus mollis or spinosus plants',
    'Deeply indented lobes with curved tips',
    'Typically seven to nine lobes per leaf',
    'Defining ornament of Corinthian capitals',
    'Creates strong shadow patterns when deeply carved',
    'Appears in two tiers on Corinthian capitals',
  ],

  famousExamples: [
    { name: 'Choragic Monument of Lysicrates', location: 'Athens, Greece', year: '335/334 BCE', description: 'Earliest surviving Corinthian capitals with acanthus' },
    { name: 'Pantheon Interior', location: 'Rome, Italy', year: '113-125 CE', description: 'Magnificent Roman Corinthian capitals' },
    { name: 'Ara Pacis', location: 'Rome, Italy', year: '13-9 BCE', description: 'Elaborate acanthus scrollwork friezes' },
    { name: 'St. Peter\'s Basilica', location: 'Vatican City', year: '1506-1626', description: 'Renaissance acanthus on giant Corinthian capitals' },
    { name: 'U.S. Capitol', location: 'Washington D.C., USA', year: '1793-1866', description: 'American Corinthian capitals with distinctive tobacco leaf variant' },
  ],

  confusionPairs: [
    {
      elementId: 'palmette',
      reason: 'Both are stylized plant ornaments',
      distinction: 'Acanthus has deeply cut jagged lobes; palmette resembles a fan-shaped palm frond',
    },
    {
      elementId: 'anthemion',
      reason: 'Both are classical plant-based ornaments',
      distinction: 'Acanthus is naturalistic with irregular lobes; anthemion is geometric and symmetrical like a flower',
    },
  ],

  searchTags: ['leaf', 'corinthian', 'ornament', 'classical', 'carved', 'capital', 'plant', 'acanthus', 'decoration', 'foliage'],

  arMetadata: {
    modelPath: '/models/architecture/acanthus.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Leaf Lobe', position: { x: -0.08, y: 0.05, z: 0.05 } },
      { label: 'Central Vein', position: { x: 0, y: 0, z: 0.05 } },
      { label: 'Curled Tip', position: { x: 0.08, y: 0.08, z: 0.08 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
