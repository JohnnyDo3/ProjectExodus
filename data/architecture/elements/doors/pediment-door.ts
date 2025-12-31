import type { ArchitecturalElement } from '../../types';

export const PEDIMENT_DOOR: ArchitecturalElement = {
  id: 'pediment-door',
  slug: 'pediment-door',
  name: 'Pediment Door',
  alternativeNames: ['Door with Pediment', 'Pedimented Doorway', 'Classical Door', 'Temple Front Door'],
  pronunciation: {
    phonetic: 'PED-ih-ment door',
    language: 'English',
  },
  etymology: {
    origin: 'Latin/Greek',
    meaning: 'Door crowned with triangular or curved pediment',
    rootWord: 'pediment (from Latin pes, foot)',
  },
  category: 'DOOR',
  subcategory: 'door_types',
  periods: ['classical-greek', 'roman', 'renaissance', 'baroque', 'neoclassical', 'beaux-arts', 'colonial-american'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/pediment-door-primary.jpg',
    gallery: [
      '/images/architecture/elements/pediment-door-triangular.jpg',
      '/images/architecture/elements/pediment-door-segmental.jpg',
      '/images/architecture/elements/pediment-door-broken.jpg',
    ],
    diagram: '/images/architecture/diagrams/pediment-door-detail.svg',
  },

  description: {
    ELEMENTARY: 'A pediment door has a fancy triangle or curved shape above it, like a little roof! It makes the doorway look important and grand. You see pediment doors on fancy old houses, especially on the front entrance. The triangular part is called a pediment and was first used on ancient Greek temples.',
    MIDDLE_SCHOOL: 'The pediment door features a triangular or curved pediment mounted above the door opening, typically supported by decorative columns, pilasters, or an entablature. This classical architectural element derives from ancient Greek temple fronts. Types include triangular (most common), segmental (curved), broken (with gap at apex), and open pediments. The door surround often includes pilasters or engaged columns flanking the opening, with the pediment resting on an entablature. This treatment elevates the entrance, signaling importance and classical taste.',
    HIGH_SCHOOL: 'Pediment door design applies classical temple architecture vocabulary to residential and institutional entrances. The composition typically includes: flanking pilasters or columns in one of the classical orders (Doric, Ionic, Corinthian); an entablature comprising architrave, frieze, and cornice; and a crowning pediment (triangular, segmental, or broken). Proportions follow classical principles derived from Greek and Roman precedents and codified in Renaissance treatises (Vitruvius, Palladio, Vignola). Triangular pediments create acute angles (typically 15-20 degrees); segmental pediments use curved profiles; broken pediments interrupt the raking cornice at the apex or base, creating space for decorative elements like urns or finials. The treatment transforms a functional door into an architectural statement referencing antiquity and learning.',
    UNDERGRADUATE: 'Pediment door development reflects classical architecture\'s transmission and reinterpretation across historical periods. Greek temple pediments (6th-4th centuries BCE) established the triangular form, though temples used full-building-width pediments rather than door-scale applications. Roman architecture adapted pediments to aediculae (shrine niches), establishing the scaled-down door surround precedent. Renaissance architects applied archaeological knowledge and treatise study to create door pediments following ancient proportions-Palladio\'s Quattro Libri (1570) codified rules governing order selection, entablature proportions, and pediment angles. Baroque architecture manipulated classical elements for dramatic effect, developing broken pediments and segmental forms. Neoclassical movements (18th-19th centuries) returned to purer classical models. American Colonial and Federal architecture adapted English Georgian precedents, making pediment doors standard for important entrances in wood construction, often simplifying details for carpenter execution.',
    GRADUATE: 'The pediment door embodies classical architecture\'s cultural transmission and ideological deployment. Renaissance recovery of Vitruvian texts and archaeological study of Roman remains established normative classical vocabulary. Palladio\'s synthesis of ancient precedent, proportional theory, and practical building in the Quattro Libri created the canonical reference transmitted throughout Europe and colonies via pattern books. The application of temple-derived elements to domestic architecture encoded social aspirations and cultural values-classical learning, rational order, connection to ancient Republican/Democratic ideals. Baroque period\'s invention of broken and segmental pediments reflected changing aesthetic priorities and desire for novelty within classical framework. English Palladian revival (1710s-1760s) reacted against Baroque excess, influencing Georgian architecture throughout Britain and America. Federal and Greek Revival movements employed pediment doors as explicit references to ancient democracy. Victorian eclecticism offered historical alternatives (Gothic pointed arches), while Beaux-Arts training (1830s-1930s) maintained classical pediment traditions in monumental architecture.',
    PHD: 'Scholarly analysis of pediment doors addresses cultural transmission of classical architecture, social semiotics of architectural choice, and craft knowledge documentation. Research examines how Renaissance architects reconstructed ancient practice through fragmentary textual and material evidence, producing codifications (Serlio, Vignola, Palladio) that became authoritative despite being interpretations. Studies investigate pattern book circulation as mechanism for transmitting classical knowledge to provincial builders-Asher Benjamin\'s American Builder\'s Companion (1806) adapted English Palladianism for New England carpenters. Social historical analysis examines pediment doors as class and taste markers-their presence signaling educational attainment, cultural sophistication, and social status. Architectural history traces stylistic variations: English Baroque broken pediments, Georgian restrained triangular forms, American Federal delicate proportions, Greek Revival monumental scale. Material culture studies investigate regional variations in construction techniques, wood species selection, and decorative detailing. Conservation research addresses appropriate restoration and reconstruction methods, while contemporary scholarship examines how pediment doors participated in constructing national identities through architectural references to ancient democracy.',
  },

  history: {
    ELEMENTARY: 'Pediment doors started with the ancient Greeks over 2,500 years ago! They built beautiful temples with big triangular roofs called pediments. Later, people began putting smaller versions of these triangles above their front doors to make them look fancy and important. This tradition continued through history and many old American houses have pediment doors!',
    MIDDLE_SCHOOL: 'Pediment doors derive from ancient Greek temples (500s-300s BCE), which featured triangular pediments. Romans adapted pediments to smaller architectural elements including door surrounds. Renaissance architects (1400s-1500s) revived classical forms based on ancient ruins and Vitruvius\'s treatise. Andrea Palladio (1508-1580) codified pediment door designs in his influential pattern books. Georgian architecture (1714-1830) brought pediment doors to England and American colonies. Federal and Greek Revival periods (1780s-1850s) emphasized classical references.',
    HIGH_SCHOOL: 'The pediment door\'s evolution traces classical architecture\'s transmission from antiquity through Renaissance to modern periods. Greek temples (Parthenon, 447-432 BCE) used building-scale pediments; Romans applied the form to aediculae and monuments. Renaissance study of Roman remains, particularly Vitruvius\'s De Architectura (c. 15 BCE, rediscovered 1414), informed architects including Bramante, Raphael, and Palladio. Palladio\'s Quattro Libri dell\'Architettura (1570) established canonical door pediment designs, widely disseminated through translations and derivative pattern books. English Palladian movement (1710s-1760s, led by Lord Burlington and Colen Campbell) influenced Georgian architecture (1714-1830), standardizing pediment doors for important entrances. American Colonial architecture (1600s-1770s) initially used simpler forms, but Federal period (1780-1820) adopted refined classical details. Greek Revival (1825-1860) emphasized archaeological accuracy.',
    UNDERGRADUATE: 'Pediment door development reflects complex transmission of classical architectural knowledge through texts, archaeological study, and built precedent. Renaissance architects lacked comprehensive ancient building examples but possessed Vitruvius\'s text, requiring imaginative reconstruction of ancient practice. Sebastiano Serlio\'s Architettura (1537-1575) and Giacomo Barozzi da Vignola\'s Regola delli cinque ordini (1562) attempted systematic codification, but Palladio\'s Quattro Libri (1570) achieved greatest influence through combining theoretical rigor with practical illustrations. English editions (1715 Isaac Ware translation) and derivative pattern books (William Kent, James Gibbs) transmitted Palladian principles to British architecture. American builder\'s guides (Asher Benjamin, Minard Lafever) adapted English sources for New World carpentry traditions, translating stone classical forms into wood construction. Federal period pediment doors typically feature slender proportions and delicate details, while Greek Revival versions employed more robust forms referencing specific Greek precedents. Victorian eclecticism offered stylistic alternatives, though classical pediment doors persisted in conservative institutional architecture.',
    GRADUATE: 'The pediment door\'s historical trajectory reveals processes of cultural authentication and social distinction through architectural form. Renaissance reconstruction of classical architecture from incomplete textual and material evidence produced normative systems that, despite being interpretive, achieved authoritative status. Palladio\'s synthesis of ancient precedent, mathematical proportion, and practical building created a vocabulary that could be endlessly recombined while remaining recognizably "Palladian." The form\'s geographic and social transmission through pattern books created hierarchies of knowledge-architects possessed theoretical understanding, builders followed practical guides, patrons signaled cultural capital through commissioning classical details. English Palladian revival (1710s onward) carried political connotations, associating Whig values with Roman Republican architecture versus Baroque absolutist associations. American adoption encoded multiple meanings: Federal period emphasized refined taste and commercial success, while Greek Revival explicitly referenced Athenian democracy as model for American Republic. Regional variations reflected local craft traditions, material availability, and cultural priorities-southern plantation architecture favored monumental temple-front porticos, while northeastern urban architecture employed more restrained door pediments.',
    PHD: 'Scholarly engagement with pediment doors employs multiple approaches: architectural history tracing stylistic transmission through treatises, pattern books, and built examples; social history examining architectural choice as cultural practice and status signification; material culture analyzing regional building traditions and craft knowledge; and intellectual history investigating relationships between classical architecture and political ideology. Research addresses questions including: How did Renaissance architects reconstruct ancient practice from fragmentary evidence? What mechanisms transmitted architectural knowledge across geographic and social boundaries? How did classical references function within specific cultural and political contexts? Studies employ archival research examining architectural libraries, builder accounts, and patron correspondence; material analysis documenting construction techniques and wood species; and comparative analysis examining regional variations. Conservation research addresses appropriate restoration approaches for historic pediment doors. Contemporary scholarship investigates how classical architectural elements participated in constructing national and regional identities, examines gender and class dimensions of architectural taste, and applies digital humanities methods to pattern book analysis.',
  },

  characteristics: [
    'Classical pediment above door',
    'Flanking pilasters or columns',
    'Entablature supporting pediment',
    'Triangular, segmental, or broken forms',
    'Follows classical proportional rules',
    'Signals importance and classical taste',
    'Common in Georgian and Federal architecture',
  ],

  famousExamples: [
    { name: 'Monticello', location: 'Virginia, USA', year: '1768-1809', description: 'Thomas Jefferson\'s home features pediment doors throughout' },
    { name: 'Mount Vernon', location: 'Virginia, USA', year: '1757-1778', description: 'Washington\'s mansion has elaborate pediment entrance' },
    { name: 'The White House', location: 'Washington, D.C.', year: '1792-1800', description: 'North entrance features classical pediment door' },
    { name: 'Independence Hall', location: 'Philadelphia, USA', year: '1753', description: 'Georgian building with characteristic pediment entrance' },
    { name: 'Drayton Hall', location: 'Charleston, South Carolina', year: '1738-1742', description: 'Palladian plantation house with pedimented entrance' },
  ],

  confusionPairs: [
    {
      elementId: 'portico',
      reason: 'Both use pediments and classical elements',
      distinction: 'Pediment door is a door surround; portico is a projecting porch with roof and columns',
    },
    {
      elementId: 'pediment',
      reason: 'Pediment is part of pediment door',
      distinction: 'Pediment is the triangular element alone; pediment door is the entire door composition including pediment',
    },
  ],

  searchTags: ['door', 'pediment', 'classical', 'Georgian', 'Federal', 'neoclassical', 'Palladian', 'triangular', 'entablature', 'pilaster'],

  arMetadata: {
    modelPath: '/models/architecture/pediment-door.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Pediment', position: { x: 0, y: 0.85, z: 0 } },
      { label: 'Entablature', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Pilaster', position: { x: -0.35, y: 0.4, z: 0 } },
      { label: 'Door Opening', position: { x: 0, y: 0.35, z: 0 } },
      { label: 'Base/Plinth', position: { x: -0.35, y: 0.05, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
