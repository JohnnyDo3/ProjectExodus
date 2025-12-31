import type { ArchitecturalElement } from '../../types';

export const PORTICO: ArchitecturalElement = {
  id: 'portico',
  slug: 'portico',
  name: 'Portico',
  alternativeNames: ['Pronaos', 'Covered Porch', 'Columned Entrance'],
  pronunciation: {
    phonetic: 'POR-ti-koh',
    language: 'English',
  },
  etymology: {
    origin: 'Latin/Italian',
    meaning: 'From "porta" meaning gate or entrance',
    rootWord: 'porticus',
  },
  category: 'FACADE',
  subcategory: 'entrance_elements',
  periods: ['CLASSICAL_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS', 'COLONIAL_AMERICAN'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/portico-primary.jpg',
    gallery: [
      '/images/architecture/elements/portico-pantheon.jpg',
      '/images/architecture/elements/portico-jefferson.jpg',
      '/images/architecture/elements/portico-colonial.jpg',
    ],
    diagram: '/images/architecture/diagrams/portico.svg',
  },

  description: {
    ELEMENTARY: 'A portico is like a fancy covered porch with columns! It\'s the part of a building where you can stand under a roof held up by tall columns before you go inside. Many important buildings have porticos to make the entrance look grand and special, and to keep you dry when it rains!',
    MIDDLE_SCHOOL: 'A portico is a covered entrance to a building consisting of a roof supported by columns. Classical porticos typically include a pediment above and may project from the building facade or be recessed within it. The portico serves both practical functions (weather protection, transition space) and symbolic purposes (marking the main entrance, conveying monumentality). Porticos are classified by the number of columns: tetrastyle (4), hexastyle (6), or octastyle (8).',
    HIGH_SCHOOL: 'The portico represents a fundamental element of Classical architecture, deriving from Greek temple design. Greek temples featured porticos (pronaos) at the entrance, with columns supporting an entablature and pediment. Roman architects expanded portico usage to civic buildings, residences, and public spaces. Porticos are classified by arrangement: prostyle (columns in front), in antis (columns between walls), and distyle in antis (two columns between wall ends). Renaissance and Neoclassical architects revived porticos as signifiers of importance and Classical learning, applying them to churches, government buildings, and grand residences.',
    UNDERGRADUATE: 'Portico design involves complex considerations of proportion, order selection, and spatial composition. Classical theory prescribed appropriate column orders for different building types and scales. The portico creates a liminal space between exterior and interior, public and private. Its depth affects both functional protection and spatial experience-shallow porticos provide minimal shelter while deep porticos create processional sequences. Structural systems vary from simple post-and-lintel to more complex arrangements with interior vaulting. The relationship between portico and building mass distinguishes applied porticos (attached to facade) from integral designs where the portico forms part of the building volume. American architecture extensively adopted porticos in Federal, Greek Revival, and Colonial Revival styles.',
    GRADUATE: 'Critical portico analysis addresses the element\'s evolution from religious to secular architecture and its role in architectural signification. Greek temple porticos established prototypes, with the Parthenon\'s octastyle Doric portico becoming paradigmatic. Roman adaptations included the combination of Greek portico forms with arch technology (Theatre of Marcellus) and the development of giant-order porticos spanning multiple stories. Theoretical discourse from Alberti through Palladio codified portico proportions and appropriate applications. The portico\'s semantic function as marker of importance led to its proliferation in institutional architecture-from Renaissance churches to 18th-century parliament buildings to 19th-century American state capitols. Analysis must address how porticos construct cultural authority through Classical reference and how different periods reinterpreted portico meanings.',
    PHD: 'Advanced portico scholarship engages the element\'s multiple functions across historical and cultural contexts. Research questions include: How did portico forms and meanings transform from Greek religious to Roman civic to Renaissance secular contexts? What role did porticos play in constructing institutional identity and authority? How did colonial and postcolonial contexts appropriate or resist portico usage? Methodological approaches encompass archaeological reconstruction of ancient examples; analysis of theoretical texts prescribing portico usage; examination of porticos as sites of social interaction and ritual; and investigation of porticos within broader systems of architectural signification. The portico serves as crucial evidence for understanding how architectural elements accrue meanings through historical usage and cultural association. Contemporary theoretical frameworks examine porticos through phenomenology (portico as spatial threshold), semiotics (portico as sign of importance/classicism), and postcolonial critique (portico as instrument of cultural authority).',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks built the first porticos on their temples about 2,500 years ago. The tall columns held up a triangular roof at the entrance. The Romans loved this idea and put porticos on all kinds of buildings-not just temples! Today, you can see porticos on government buildings, museums, universities, and even some houses. They make buildings look important and keep visitors dry!',
    MIDDLE_SCHOOL: 'Porticos originated in Greek temple architecture (6th-5th century BCE), where they marked sacred entrances and provided gathering spaces. The Parthenon\'s octastyle (8-column) Doric portico exemplifies Classical Greek design. Romans adapted porticos for civic buildings like the Pantheon (hexastyle portico, rebuilt 113-125 CE). Renaissance architects studied ancient examples and revived portico usage for churches (Palladio\'s San Giorgio Maggiore, 1566) and villas. Neoclassical architecture made extensive use of porticos on government buildings, and American architecture adopted porticos for both public buildings and private residences in the Federal and Greek Revival styles.',
    HIGH_SCHOOL: 'The portico\'s development reflects changing architectural functions and cultural meanings. Greek temples featured porticos (pronaos) with columns in the appropriate order for the deity-Doric for masculine gods, Ionic for feminine deities. Roman innovations included giant-order porticos spanning multiple stories and the combination of porticos with arch arcades. Renaissance theorists like Alberti (De re aedificatoria, 1450s) and Palladio (I Quattro Libri, 1570) codified portico design principles and appropriate applications. Palladio\'s villa and church designs popularized temple-front porticos on secular buildings. British Palladianism (early 18th century) brought porticos to country houses, while Neoclassicism applied them to civic buildings worldwide. American architecture extensively employed porticos from Thomas Jefferson\'s designs through 19th-century Greek Revival and into 20th-century institutional buildings.',
    UNDERGRADUATE: 'Portico evolution demonstrates the transformation of religious architectural forms to secular applications. Greek temple porticos established proportional systems relating column height, intercolumniation, and pediment dimensions. The Temple of Zeus at Olympia (470-456 BCE) and the Parthenon (447-432 BCE) represent canonical Greek porticos. Roman adaptations addressed different scales and functions: the Pantheon\'s monumental octastyle portico, the Maison Carrée\'s prostyle hexastyle portico, and portico applications to basilicas and thermae. Renaissance reception involved archaeological study and theoretical codification. Alberti prescribed portico usage for churches and distinguished appropriate column orders. Palladio\'s systematic application of temple-front porticos to villas (Villa Rotonda, 1567-1591) established influential precedents. English Palladianism (Burlington, Kent) developed the portico as essential element of country house design. Neoclassical architects employed porticos to signify civic importance-from Soufflot\'s Panthéon (1758-1790) to von Klenze\'s Walhalla (1830-1842). American examples range from Jefferson\'s Monticello and University of Virginia to countless Greek Revival houses and state capitols.',
    GRADUATE: 'Critical portico studies examine the element\'s journey from sacred to secular architecture and its role in constructing cultural authority. Archaeological evidence reveals Greek portico construction techniques, including the relationship between structural necessity and aesthetic refinement. The portico\'s meaning shifted from marking sacred boundaries (temple entrance) to signifying civic importance (Roman forums) to expressing humanist ideals (Renaissance villas) to constructing democratic associations (Neoclassical government buildings). Theoretical discourse reveals evolving attitudes: Vitruvius emphasized propriety in portico design, Alberti stressed dignity and magnificence, Palladio systematized proportional relationships, and Neoclassical theorists debated archaeological accuracy versus modern adaptation. The proliferation of porticos in colonial architecture (British India, American South) raises questions about cultural appropriation and the politics of Classical forms. Analysis must address how porticos function as signs within architectural systems-conveying importance, Classical learning, institutional authority-and how these meanings vary across contexts.',
    PHD: 'Advanced portico scholarship addresses complex questions of form, meaning, and cultural politics. Research methodologies include: archaeological investigation of construction techniques and proportional systems; analysis of theoretical texts prescribing portico usage and meaning; examination of porticos as social spaces (gathering, ritual, display); iconographic study of portico decorative programs; and critical investigation of portico symbolism across historical contexts. Key debates include: What meanings did porticos carry in different periods and cultures? How did portico forms and functions transform from religious to secular applications? What role did porticos play in constructing institutional identity and cultural legitimacy? How should we understand portico usage in colonial and postcolonial contexts? Theoretical frameworks encompass phenomenology (portico as threshold space), semiotics (portico as architectural sign), reception theory (how different periods reinterpreted porticos), and postcolonial critique (porticos as instruments of cultural hegemony). The portico exemplifies how architectural elements function as carriers of cultural meaning, accruing associations through historical usage and conscious appropriation.',
  },

  characteristics: [
    'Covered entrance with roof supported by columns',
    'Typically includes pediment above',
    'May be prostyle (projecting) or in antis (recessed)',
    'Classified by column count: tetrastyle (4), hexastyle (6), octastyle (8)',
    'Uses Classical column orders (Doric, Ionic, Corinthian)',
    'Creates transitional space between exterior and interior',
    'Often marks main entrance of important buildings',
  ],

  famousExamples: [
    { name: 'Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'Octastyle Doric portico, Classical Greek prototype' },
    { name: 'Pantheon', location: 'Rome, Italy', year: '113-125 CE', description: 'Octastyle Corinthian portico on Roman temple' },
    { name: 'Maison Carrée', location: 'Nîmes, France', year: '16 BCE', description: 'Hexastyle Corinthian Roman temple portico' },
    { name: 'Villa Rotonda', location: 'Vicenza, Italy', year: '1567-1591', description: 'Palladio\'s temple-front porticos on four facades' },
    { name: 'St. Paul\'s Cathedral Portico', location: 'London, England', year: '1675-1710', description: 'Baroque hexastyle portico by Christopher Wren' },
    { name: 'United States Capitol', location: 'Washington D.C., USA', year: '1800-1866', description: 'Neoclassical central portico with Corinthian columns' },
    { name: 'Monticello', location: 'Charlottesville, Virginia, USA', year: '1768-1809', description: 'Jefferson\'s temple-front portico on private residence' },
  ],

  confusionPairs: [
    {
      elementId: 'porch',
      reason: 'Both are covered entrance spaces',
      distinction: 'Portico has Classical columns and formal proportions; porch is more general term',
    },
    {
      elementId: 'colonnade',
      reason: 'Both feature rows of columns',
      distinction: 'Portico is specifically an entrance; colonnade is an extended row of columns',
    },
    {
      elementId: 'loggia',
      reason: 'Both are covered columned spaces',
      distinction: 'Loggia is open gallery along a facade; portico is a projecting entrance',
    },
  ],

  searchTags: ['portico', 'columns', 'entrance', 'porch', 'classical', 'greek', 'temple', 'pediment', 'covered', 'facade', 'neoclassical'],

  arMetadata: {
    modelPath: '/models/architecture/portico.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Pediment', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Entablature', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Columns', position: { x: -0.3, y: 0.4, z: 0 } },
      { label: 'Stylobate', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
