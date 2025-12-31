import type { ArchitecturalElement } from '../../types';

export const CITY_GATE: ArchitecturalElement = {
  id: 'city-gate',
  slug: 'city-gate',
  name: 'City Gate',
  alternativeNames: ['Town Gate', 'Fortified Gate', 'Gateway', 'Porta'],
  pronunciation: {
    phonetic: 'SIT-ee GAYT',
    language: 'English',
  },
  etymology: {
    origin: 'Old English/Latin',
    meaning: 'Fortified urban entrance',
    rootWord: 'From Old English "geat" (opening) and Latin "porta" (gate)',
  },
  category: 'URBAN',
  subcategory: 'fortification',
  periods: ['ancient-egyptian', 'mesopotamian', 'classical-greek', 'roman', 'byzantine', 'medieval', 'renaissance'],
  regions: ['MESOPOTAMIA', 'MEDITERRANEAN', 'WESTERN_EUROPE', 'CENTRAL_EUROPE', 'MIDDLE_EAST', 'EAST_ASIA'],

  images: {
    primary: '/images/architecture/elements/city-gate-primary.jpg',
    gallery: [
      '/images/architecture/elements/city-gate-brandenburg.jpg',
      '/images/architecture/elements/city-gate-ishtar.jpg',
    ],
    diagram: '/images/architecture/diagrams/city-gate-components.svg',
  },

  description: {
    ELEMENTARY: 'A city gate is like a big, strong door built into a city wall! In old times, cities had walls all around them for protection, and gates were the only way in or out. Guards would watch from towers on each side. During the day, the gates opened so people could come and go. At night, they closed the gates to keep the city safe.',
    MIDDLE_SCHOOL: 'A city gate is a fortified entrance through defensive walls surrounding a settlement. Gates typically featured heavy wooden or iron doors, flanking towers for defense, and a passage that could be blocked with a portcullis (dropping grate). Beyond defense, gates served as customs points for collecting taxes, symbols of civic power, and architectural showpieces. Famous examples include the Brandenburg Gate in Berlin and the Ishtar Gate from ancient Babylon.',
    HIGH_SCHOOL: 'The city gate is a controlled passage through fortification walls, combining defensive, administrative, and symbolic functions. Typical elements include gate towers, murder holes for defensive projectiles, turning passages to slow attackers, portcullis mechanisms, and ceremonial facades. Roman gates followed standardized designs with flanking round or square towers. Medieval gates grew more complex with barbicans (outer defenses) and multiple barriers. Renaissance gates emphasized artistic display over pure defense.',
    UNDERGRADUATE: 'City gate design integrates military engineering, traffic management, and architectural representation. Defensive features include enfilading fire positions, indirect approaches forcing attackers to expose their flanks, and layered barriers (outer gate, portcullis, inner gate). Structural systems must support heavy masonry towers while spanning carriage passages. Urban planning considerations include traffic flow, customs administration, and symbolic representation of civic authority. Post-fortification examples maintain the gateway form as monumental urban markers.',
    GRADUATE: 'City gate analysis addresses military architecture, urban morphology, and civic identity. Research examines defensive effectiveness through historical siege accounts, evolution of gate design in response to artillery, and the transformation from functional to symbolic structures. Contemporary issues include preserving historic gates while accommodating modern traffic, adaptive reuse of defensive structures, and the role of gates in defining historic city centers versus modern urban expansion.',
    PHD: 'City gate scholarship engages military history, architectural conservation, and urban studies. Methodologies include archaeological investigation of gate construction sequences, analysis of siege technology evolution, and social history of gate use and control. Current research addresses gates in colonial contexts, the phenomenology of passing through defended thresholds, digital reconstruction of destroyed gates, and the politics of preservation in contested urban landscapes.',
  },

  history: {
    ELEMENTARY: 'Ancient cities built strong gates in their walls over 5,000 years ago! The Ishtar Gate in Babylon was covered in beautiful blue tiles with pictures of dragons and bulls. Roman cities had gates at the ends of their main streets. Medieval castles and cities built tall towers beside their gates. After cannons were invented, thick walls weren\'t as useful, so cities stopped building defensive gates.',
    MIDDLE_SCHOOL: 'Mesopotamian cities like Babylon featured monumental gates-the Ishtar Gate (575 BCE) was decorated with glazed bricks. Greek cities had simple but strong gates integrated into walls. Roman castra (military camps) used standardized gate designs, later adopted for cities. Byzantine walls featured complex gate systems with multiple barriers. Medieval European cities developed elaborate barbican systems. Renaissance fortifications used low, thick gates resistant to cannon fire. Many gates were demolished in the 19th century for urban expansion.',
    HIGH_SCHOOL: 'Ancient Near Eastern gates combined defense with religious symbolism-Babylon\'s Ishtar Gate honored the goddess Ishtar. Roman gates followed Vitruvian principles, with examples like the Porta Nigra in Trier (2nd century CE). Byzantine Constantinople\'s gates featured Greek fire positions. Medieval gates evolved from simple passages to complex systems: the Holstentor in Lübeck (1464) exemplifies late-medieval design. Star fort systems integrated gates into bastioned defenses. Neoclassical gates like Berlin\'s Brandenburg Gate (1791) served symbolic rather than defensive functions.',
    UNDERGRADUATE: 'City gate history reveals military technology evolution and changing urban concepts. Ancient gates defended against infantry assault. Roman standardization spread gate design across the empire. Byzantine innovations addressed siege warfare. Medieval gate complexity responded to siege engines and early gunpowder. Renaissance fortification theory transformed gate design completely-low profiles, flanking bastions, and indirect approaches. The obsolescence of city walls in the industrial era transformed gates into heritage monuments and traffic bottlenecks, leading to preservation conflicts.',
    GRADUATE: 'Historical analysis of city gates examines military innovation, administrative systems, and urban identity. Research addresses the relationship between gate design and siege technology, the social geography of gate control and access, and the symbolic meanings of passing through defended thresholds. Contemporary challenges include integrating preserved gates into modern urban fabric, interpreting defensive architecture for tourism, and addressing the colonial histories of gates in disputed territories.',
    PHD: 'City gate scholarship engages archaeology, military history, and heritage studies. Methodologies include archaeological excavation revealing construction phases, computational modeling of defensive effectiveness, and social history of gate tolls and access restrictions. Current research examines gates in cross-cultural contexts, the transformation of military architecture into heritage assets, the phenomenology of fortified spaces, and digital reconstruction of destroyed gates for historical understanding.',
  },

  characteristics: [
    'Fortified passage through defensive walls',
    'Flanking towers for defense',
    'Heavy doors and portcullis',
    'Defensive features (murder holes, arrow slits)',
    'Passage often with turns or barriers',
    'Administrative and symbolic functions',
    'Architectural embellishment on facades',
  ],

  famousExamples: [
    { name: 'Brandenburg Gate', location: 'Berlin, Germany', year: '1788-1791', description: 'Neoclassical gate symbolizing German unity and division' },
    { name: 'Ishtar Gate', location: 'Babylon (now Berlin Museum)', year: 'c. 575 BCE', description: 'Glazed brick gate with dragon and bull reliefs' },
    { name: 'Porta Nigra', location: 'Trier, Germany', year: 'c. 170 CE', description: 'Best-preserved Roman city gate north of the Alps' },
    { name: 'Holstentor', location: 'Lübeck, Germany', year: '1464-1478', description: 'Late Gothic brick gate with twin towers' },
    { name: 'India Gate', location: 'New Delhi, India', year: '1921-1931', description: 'War memorial arch inspired by Arc de Triomphe' },
  ],

  confusionPairs: [
    {
      elementId: 'triumphal-arch',
      reason: 'Both are monumental gateways',
      distinction: 'City gates are functional fortified entrances in defensive walls; triumphal arches are freestanding commemorative monuments',
    },
    {
      elementId: 'portico',
      reason: 'Both are covered entrances',
      distinction: 'Porticos are building entrances with columns; city gates are fortified passages through defensive walls',
    },
  ],

  searchTags: ['gate', 'fortification', 'defense', 'wall', 'tower', 'urban', 'entrance', 'medieval'],

  arMetadata: {
    modelPath: '/models/architecture/city-gate.glb',
    scale: 0.12,
    rotatable: true,
    annotations: [
      { label: 'Gate Tower', position: { x: 2, y: 3, z: 0 } },
      { label: 'Portcullis', position: { x: 0, y: 2, z: 0 } },
      { label: 'Gate Passage', position: { x: 0, y: 1, z: 0 } },
      { label: 'Murder Hole', position: { x: 0, y: 2.5, z: 0.5 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
