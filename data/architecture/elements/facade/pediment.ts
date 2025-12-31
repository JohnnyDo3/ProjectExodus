import type { ArchitecturalElement } from '../../types';

export const PEDIMENT: ArchitecturalElement = {
  id: 'pediment',
  slug: 'pediment',
  name: 'Pediment',
  alternativeNames: ['Tympanum', 'Gable End', 'Frontal Triangle'],
  pronunciation: {
    phonetic: 'PED-i-ment',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'From "pes" (foot) - possibly referring to the base or foundation of the triangular form',
    rootWord: 'pedimentum',
  },
  category: 'FACADE',
  subcategory: 'classical_ornament',
  periods: ['CLASSICAL_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/pediment-primary.jpg',
    gallery: [
      '/images/architecture/elements/pediment-parthenon.jpg',
      '/images/architecture/elements/pediment-baroque.jpg',
      '/images/architecture/elements/pediment-broken.jpg',
    ],
    diagram: '/images/architecture/diagrams/pediment.svg',
  },

  description: {
    ELEMENTARY: 'A pediment is the triangle-shaped part you see above the entrance of many important buildings like temples and banks. It looks like a roof with a flat bottom and two slanted sides meeting at the top, forming a triangle. The Greeks put beautiful sculptures inside the triangle!',
    MIDDLE_SCHOOL: 'A pediment is a triangular architectural element positioned above a horizontal structure, typically a portico or entablature. In Classical Greek temples, the pediment crowned the front facade and often contained elaborate sculptural programs. The triangular field (tympanum) provided space for narrative scenes, while the sloping edges (raking cornices) framed the composition.',
    HIGH_SCHOOL: 'The pediment evolved from the functional gable ends of Greek temples into a highly symbolic architectural element. Classical pediments follow strict proportional rules, with height typically one-ninth to one-seventh of the width. The enclosed triangular field (tympanum) served as a primary location for sculptural decoration, often depicting mythological narratives related to the building\'s dedication. Roman and later architects developed variations including broken pediments and segmental pediments.',
    UNDERGRADUATE: 'The pediment represents the fusion of structural necessity and decorative opportunity in Classical architecture. Originally the gable end of a pitched roof system, the pediment became codified in Greek temple design with specific proportional relationships to the facade width and column height. The sculptural programs within pediments demonstrate sophisticated understanding of optical correction, with figures toward the apex carved at larger scale to compensate for viewing distance and angle. Post-Classical developments include the broken pediment (with interrupted apex or base), segmental pediment (curved rather than triangular), and swan-neck pediment.',
    GRADUATE: 'Pediment analysis encompasses structural origins, aesthetic development, and semantic functions. Archaeological evidence suggests evolution from timber prototypes, with the Doric order\'s painted terracotta decorations preceding marble sculptural programs. The pediment\'s triangular format created compositional challenges addressed through varying solutions across periods-from the hierarchical scaling of Archaic pediments to the naturalistic compositions of the High Classical period. Theoretical discourse from Alberti through Palladio codified appropriate pediment usage, while Baroque architects deliberately violated Classical norms through broken and curved variations.',
    PHD: 'Advanced pediment scholarship addresses the element\'s role in architectural signification and cultural memory. The pediment functions as both tectonic expression and semantic carrier, with its triangular form signifying temple/sacred architecture in Western tradition. Critical investigation examines how pediment sculpture programs construct narratives of civic identity, religious devotion, and political authority. The Renaissance and Neoclassical revivals of pediment usage raise questions about architectural quotation, historical consciousness, and the construction of cultural legitimacy through Classical reference. Contemporary theoretical approaches examine the pediment through semiotics, reception theory, and the social production of architectural meaning.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks invented pediments over 2,500 years ago when they built their beautiful temples. The most famous pediment is on the Parthenon in Athens, which had huge marble statues of gods and heroes. When other countries wanted their buildings to look important and grand, they copied the Greek style and added pediments too!',
    MIDDLE_SCHOOL: 'Pediments originated in Greek temple architecture around the 7th-6th centuries BCE, evolving from simple gable ends to elaborate sculptural displays. The Parthenon (447-432 BCE) featured pediments depicting the birth of Athena (east) and her contest with Poseidon (west). Romans adopted pediments for temples and later applied them to windows and niches. During the Renaissance, architects like Palladio revived Classical pediment usage, and Baroque architects created innovative broken and segmental variations. Neoclassical architecture of the 18th-19th centuries returned to stricter Classical models.',
    HIGH_SCHOOL: 'The pediment\'s development traces a path from structural necessity to decorative motif. Early Archaic pediments (7th-6th century BCE) featured rigid, hierarchically scaled compositions, as seen at the Temple of Artemis at Corfu. Classical period pediments (5th-4th century BCE) achieved naturalistic compositions within the triangular field, exemplified by the Parthenon and Temple of Zeus at Olympia. Roman applications expanded pediment usage to interior spaces and smaller-scale elements. Renaissance theorists codified pediment proportions and appropriate usage, while Baroque architects introduced dramatic variations including broken pediments (Villa Aldobrandini) and segmental forms. The Neoclassical revival emphasized archaeological accuracy in pediment design.',
    UNDERGRADUATE: 'Pediment evolution reflects changing artistic capabilities, religious practices, and architectural theories. Archaic pediments employed various strategies to fill the triangular field, including hierarchical scaling (larger central figures), reclining corner figures, and narrative compression. The Temple of Aphaia at Aegina demonstrates the transition toward naturalistic composition. Classical High period pediments achieved sophisticated narrative coherence and optical corrections. Roman adaptations included pediments over windows (aediculae) and the innovation of broken pediments. Renaissance reception, informed by Vitruvius and archaeological study, established rules for pediment proportion and placement. Mannerist and Baroque architects systematically violated these rules, creating broken pediments (Michelangelo\'s Laurentian Library), segmental pediments, and complex curved forms. Neoclassical architects like Soufflot and Schinkel returned to archaeological models while adapting them to modern building types.',
    GRADUATE: 'Critical pediment studies address the element\'s multiple functions and historical transformations. Archaeological investigation reveals construction techniques, including dowel systems for pediment sculpture and the relationship between architectural and sculptural workshops. Iconographic analysis examines how pediment programs construct religious, civic, and political meanings-from the Gigantomachy of the Parthenon to Renaissance papal imagery. The pediment\'s evolution from exclusively temple usage to application on secular buildings (palaces, government buildings) marks significant semantic shifts. Theoretical discourse from Alberti\'s insistence on appropriate pediment usage to Guarino Guarini\'s experimental curved forms reveals evolving attitudes toward Classical authority. Post-Classical pediment usage raises questions of quotation, historicism, and the construction of architectural authority through reference to antique prototypes.',
    PHD: 'Advanced pediment scholarship engages multiple methodological approaches: structural analysis of pediment evolution from timber prototypes; sculptural programs as texts requiring iconographic and contextual interpretation; pediment usage in architectural theory from Vitruvius through postmodern appropriation; and the pediment as sign within broader semiotic systems. Key research questions include: How did pediment sculpture programs construct civic and religious identities in antiquity? What meanings did pediment revival carry in different historical contexts? How did architects justify departures from Classical norms in Mannerist and Baroque pediment variations? Contemporary theoretical frameworks examine the pediment through reception aesthetics, the social production of architectural meaning, and the politics of Classical quotation. The pediment serves as a crucial site for examining how architectural elements accrue and transform meanings across historical contexts.',
  },

  characteristics: [
    'Triangular or curved form above entablature',
    'Enclosed field (tympanum) for sculpture or decoration',
    'Horizontal cornice at base',
    'Raking (sloped) cornices on sides',
    'Proportioned to facade width (typically 1:7 to 1:9 height ratio)',
    'Variations: broken, segmental, swan-neck',
    'Often contains sculptural programs or relief decoration',
  ],

  famousExamples: [
    { name: 'Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'Iconic Greek pediments with Athena birth and contest scenes' },
    { name: 'Pantheon', location: 'Rome, Italy', year: '113-125 CE', description: 'Roman temple pediment with original bronze decoration (lost)' },
    { name: 'Temple of Zeus at Olympia', location: 'Olympia, Greece', year: '470-456 BCE', description: 'Classical pediment sculptures depicting labors of Heracles' },
    { name: 'Villa Aldobrandini', location: 'Frascati, Italy', year: '1598-1603', description: 'Baroque broken pediment design' },
    { name: 'United States Capitol', location: 'Washington D.C., USA', year: '1800-1866', description: 'Neoclassical pediment with "Genius of America" sculpture' },
    { name: 'British Museum', location: 'London, England', year: '1823-1847', description: 'Greek Revival pediment depicting "Progress of Civilization"' },
  ],

  confusionPairs: [
    {
      elementId: 'tympanum',
      reason: 'Tympanum is the triangular field inside the pediment',
      distinction: 'Pediment is the whole triangular structure; tympanum is just the enclosed flat surface',
    },
    {
      elementId: 'gable',
      reason: 'Both are triangular roof ends',
      distinction: 'Gable is any triangular roof end; pediment is a formal Classical architectural element',
    },
  ],

  searchTags: ['pediment', 'triangle', 'greek', 'temple', 'facade', 'classical', 'tympanum', 'gable', 'sculpture', 'portico', 'entablature'],

  arMetadata: {
    modelPath: '/models/architecture/pediment.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Tympanum', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Raking Cornice', position: { x: 0.3, y: 0.7, z: 0 } },
      { label: 'Horizontal Cornice', position: { x: 0, y: 0.2, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
