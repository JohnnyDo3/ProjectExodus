import type { ArchitecturalElement } from '../../../types';

export const DOUBLE_HEIGHT_SPACE: ArchitecturalElement = {
  id: 'double-height-space',
  slug: 'double-height-space',
  name: 'Double-Height Space',
  alternativeNames: ['Two-Story Space', 'Void Space', 'Vertical Volume', 'Double-Height Room'],
  pronunciation: {
    phonetic: 'DUB-ul HITE SPAYS',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'An interior space with ceiling height equivalent to two standard floors',
    rootWord: 'double + height',
  },
  category: 'INTERIOR',
  subcategory: 'modernist_spatial',
  periods: ['international-style', 'brutalism', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/double-height-primary.jpg',
    gallery: [
      '/images/architecture/elements/double-height-savoye.jpg',
      '/images/architecture/elements/double-height-salk.jpg',
    ],
    diagram: '/images/architecture/diagrams/double-height.svg',
  },

  description: {
    ELEMENTARY: 'A double-height space is a room inside a building with a really tall ceiling-as tall as two regular floors! This makes the room feel big and grand, like a cathedral or a huge lobby. You might see balconies or windows on the upper level looking down into this tall space.',
    MIDDLE_SCHOOL: 'A double-height space is an interior volume where the ceiling height spans two standard floor levels instead of one, creating a dramatic vertical space. Common in Modern architecture, these spaces enhance the sense of openness, allow natural light to penetrate deeper into buildings, and create visual connections between levels. They\'re often used in living rooms, lobbies, atriums, and libraries to create impressive spatial experiences.',
    HIGH_SCHOOL: 'Double-height spaces emerged as a key strategy in Modern architecture, enabled by structural frames that freed floor plans from load-bearing wall constraints. These vertical volumes serve multiple functions: increasing perceived spaciousness, enabling clerestory windows for deeper light penetration, creating visual drama, and establishing social hierarchy (grand public spaces vs. intimate single-height rooms). The technique became central to Modernist spatial composition, from domestic scale (houses) to institutional (museums, libraries, corporate lobbies).',
    UNDERGRADUATE: 'Double-height spaces exploit the structural freedom of frame construction and the spatial principles of Modernism. By eliminating intermediate floor slabs in specific zones, architects create vertical voids that: enhance natural lighting (especially with clerestory windows), enable visual connectivity between levels, generate acoustic volume, and provide spatial hierarchy. The strategy involves trade-offs-sacrificing floor area for spatial quality, requiring larger heating/cooling volumes, and creating structural complexities (longer spans adjacent to void). Applications range from Le Corbusier\'s villas to contemporary office atriums.',
    GRADUATE: 'Analysis of double-height spaces must address spatial phenomenology (perception of volume, light, acoustic), structural implications (beam depths, lateral stability), environmental performance (thermal stratification, ventilation strategies), and programmatic appropriateness. Modern architecture deployed double-height spaces for diverse purposes: domestic drama (living halls), institutional presence (museum galleries), commercial impression (hotel lobbies), and social interaction (atrium offices). Critical examination reveals both successes (memorable spaces, daylight access) and challenges (energy consumption, acoustic issues, perceived emptiness). Contemporary applications increasingly integrate performance considerations: natural ventilation (stack effect), solar chimneys, and spatial flexibility.',
    PHD: 'Scholarly investigation of double-height spaces requires interdisciplinary engagement with architectural history, spatial theory, building physics, and social analysis. Research areas include: genealogies tracing from medieval great halls through baroque salons to Modernist voids, comparative analysis of spatial effects, thermal and acoustic performance modeling, and social behaviors in vertical volumes. Critical questions: When does vertical volume enhance spatial quality vs. waste resources? How do double-height spaces affect social interaction and building performance? What cultural meanings attach to vertical grandeur in different contexts? Contemporary research addresses: computational fluid dynamics for ventilation design, acoustic optimization strategies, adaptive reuse challenges, and integration with building energy systems. The element remains significant in contemporary architecture, increasingly justified through performance metrics alongside experiential qualities.',
  },

  history: {
    ELEMENTARY: 'Grand rooms with tall ceilings have existed for thousands of years in palaces and churches. In modern times, architects like Le Corbusier and Mies van der Rohe used double-height spaces in houses and buildings to make them feel more spacious and fill them with light. Now you see them everywhere from homes to shopping malls.',
    MIDDLE_SCHOOL: 'While double-height spaces have ancient precedents (Roman basilicas, medieval halls), Modernist architects theorized them as spatial devices. Le Corbusier used double-height living rooms in villas (Villa Savoye, 1929; Villa Church, 1927), while Mies van der Rohe created flowing vertical volumes. Post-war applications expanded to include corporate atriums (Ford Foundation, 1968), educational buildings, and museums. The technique became standard in contemporary architecture for creating impressive public spaces.',
    HIGH_SCHOOL: 'Modern double-height spaces evolved from historical precedents (baroque salons, Victorian conservatories) but achieved new significance through frame construction and Modernist spatial theory. Key early examples include Le Corbusier\'s villas (1920s-30s) with double-height living spaces, Mies\'s Barcelona Pavilion (1929) with flowing vertical space, and Frank Lloyd Wright\'s prairie houses with multi-story living halls. Post-war examples include Louis Kahn\'s libraries (light-filled reading rooms), Kevin Roche\'s Ford Foundation atrium (1968, pioneering office atrium), and countless museum galleries and corporate lobbies.',
    UNDERGRADUATE: 'Double-height space development encompasses diverse sources: Arts and Crafts movement halls (living hall concept), early Modernist villas (spatial drama), and post-war institutional architecture (public grandeur). Le Corbusier explored double-height spaces in Villa Church (1927), Villa Savoye (1929-31), and Unité d\'Habitation (1947-52). Mies van der Rohe\'s National Gallery Berlin (1962-68) demonstrates ultimate spatial openness. The 1960s-70s saw proliferation in commercial architecture (John Portman\'s atrium hotels, I.M. Pei\'s East Building). Contemporary applications include: residential lofts, retail spaces, tech company offices, and museum expansions. Recent trends emphasize environmental performance alongside spatial effects.',
    GRADUATE: 'The historiography of double-height spaces must address spatial theory (phenomenology of volume), structural innovation (enabling large clear spans), and cultural meaning (monumentality, luxury, social hierarchy). Critical analysis reveals diverse motivations: Modernist spatial flow, corporate image-making, retail spectacle, museum flexibility. Post-war examples demonstrate tensions between spatial generosity and energy efficiency. The 1970s energy crisis prompted reassessment, though double-height spaces persisted in commercial and institutional architecture. Contemporary scholarship examines: thermal stratification management, acoustic control strategies, daylight optimization, and social impacts (do dramatic spaces enhance public life or merely impress?). Preservation challenges emerge as aging modern buildings require environmental upgrades.',
    PHD: 'Academic research on double-height spaces encompasses architectural history (spatial genealogy), environmental building science (thermal/acoustic performance), social sciences (behavioral studies), and computational design (optimization methods). Key research questions: What spatial and psychological effects result from vertical volume? How do double-height spaces perform thermally and acoustically in various climates? What are lifecycle costs vs. benefits? How do design parameters (proportions, glazing, materials) affect outcomes? Contemporary research areas include: computational fluid dynamics for natural ventilation, parametric design of complex geometries, acoustic modeling, post-occupancy evaluation, and retrofit strategies for improved performance. The element persists in contemporary architecture but faces increasing scrutiny regarding sustainability, with renewed emphasis on passive strategies (stack ventilation, thermal mass, daylight harvesting) to justify spatial generosity.',
  },

  characteristics: [
    'Ceiling height spanning two standard floor levels',
    'Creates dramatic vertical volume',
    'Often features clerestory windows for daylighting',
    'May include balconies or mezzanines overlooking space',
    'Enhances sense of openness and grandeur',
    'Common in lobbies, living rooms, atriums, galleries',
  ],

  famousExamples: [
    { name: 'Villa Savoye', location: 'Poissy, France', year: '1929-1931', description: 'Le Corbusier\'s double-height living room with ribbon windows' },
    { name: 'Salk Institute', location: 'La Jolla, California, USA', year: '1959-1965', description: 'Louis Kahn\'s laboratories with double-height interstitial service floors' },
    { name: 'Ford Foundation Building', location: 'New York City, USA', year: '1963-1968', description: 'Kevin Roche\'s pioneering 12-story atrium office building' },
    { name: 'Hyatt Regency Atlanta', location: 'Atlanta, Georgia, USA', year: '1967', description: 'John Portman\'s revolutionary 22-story hotel atrium' },
    { name: 'Yale Center for British Art', location: 'New Haven, Connecticut, USA', year: '1969-1974', description: 'Louis Kahn\'s museum with double-height galleries lit from above' },
  ],

  confusionPairs: [
    {
      elementId: 'atrium',
      reason: 'Both involve vertical interior volumes',
      distinction: 'Double-height spaces span two floors; atriums are multi-story central courts often with skylights, spanning three or more floors',
    },
  ],

  searchTags: ['double-height', 'two-story space', 'vertical volume', 'atrium', 'void', 'modern', 'corbusier', 'mies', 'lobby', 'spatial'],

  arMetadata: {
    modelPath: '/models/architecture/double-height-space.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Double-Height Volume', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Upper Floor Level', position: { x: 0.4, y: 0.7, z: 0.4 } },
      { label: 'Ground Floor Level', position: { x: -0.4, y: 0.1, z: -0.4 } },
      { label: 'Clerestory Windows', position: { x: 0, y: 0.9, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
