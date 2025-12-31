import type { ArchitecturalElement } from '../../types';

export const CLOCK_TOWER: ArchitecturalElement = {
  id: 'clock-tower',
  slug: 'clock-tower',
  name: 'Clock Tower',
  alternativeNames: ['Bell Tower', 'Campanile with Clock', 'Tower Clock'],
  pronunciation: {
    phonetic: 'KLOK TOW-er',
    language: 'English',
  },
  etymology: {
    origin: 'Middle English',
    meaning: 'Tower housing timepiece',
    rootWord: 'From Middle English "clokke" (bell) and "tour" (tower)',
  },
  category: 'URBAN',
  subcategory: 'civic_structure',
  periods: ['medieval', 'renaissance', 'baroque', 'gothic-revival', 'beaux-arts', 'art-deco'],
  regions: ['WESTERN_EUROPE', 'BRITISH_ISLES', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/clock-tower-primary.jpg',
    gallery: [
      '/images/architecture/elements/clock-tower-bigben.jpg',
      '/images/architecture/elements/clock-tower-venice.jpg',
    ],
    diagram: '/images/architecture/diagrams/clock-tower-mechanism.svg',
  },

  description: {
    ELEMENTARY: 'A clock tower is a tall building with a big clock on it that everyone in town can see! Before people had watches and phones, the town clock told everyone what time it was. The tower is tall so people far away can see the clock. Many clock towers have bells that ring every hour. Big Ben in London is a famous clock tower.',
    MIDDLE_SCHOOL: 'A clock tower is a tower structure featuring one or more clock faces visible from public spaces. Medieval towns built clock towers in central locations so citizens could tell time before personal timepieces existed. The towers often housed bells that chimed the hours. Clock mechanisms required regular winding and maintenance. Clock towers became symbols of civic pride and technological advancement. They served as landmarks for navigation and meeting points.',
    HIGH_SCHOOL: 'The clock tower is a vertical structure featuring public-facing clock dials, typically incorporating bell-striking mechanisms and observation platforms. Medieval examples combined religious (church towers) and civic (town hall towers) functions. Clock faces required backlighting for night visibility. Architectural styles range from Gothic to Art Deco. Engineering challenges included supporting heavy clock mechanisms, ensuring accuracy despite temperature variations, and synchronizing multiple clock faces. Many towers serve as tourist attractions and heritage landmarks.',
    UNDERGRADUATE: 'Clock tower design integrates horology, structural engineering, and civic architecture. Mechanical considerations include supporting clockwork mechanisms (often multi-ton weights), providing access for maintenance, and ensuring structural stability for pendulum operation. Acoustic design addresses bell resonance and sound projection. Architectural expression varies from utilitarian to highly ornamental. Modern clock towers use electric or electronic movements, but many preserve mechanical systems as heritage technology. Urban planning considers sight lines and landmark visibility.',
    GRADUATE: 'Clock tower analysis addresses technological history, urban morphology, and heritage conservation. Research examines the evolution of public timekeeping systems, the social effects of standardized time, and the symbolic role of clock towers in civic identity. Contemporary challenges include maintaining historic mechanical movements, adapting towers for modern uses (telecommunications, observation), and addressing accessibility in heritage structures designed without elevators.',
    PHD: 'Clock tower scholarship engages history of technology, urban studies, and conservation science. Methodologies include archaeological investigation of clock mechanisms, social history of time standardization, and materials analysis of degraded components. Current research addresses the role of clock towers in colonial time discipline, community responses to decommissioned timepieces, conservation ethics regarding replacement versus restoration of mechanisms, and the phenomenology of public time perception.',
  },

  history: {
    ELEMENTARY: 'The first public clocks appeared in towers in medieval Europe about 700 years ago! Before that, only church bells told time. Towns built tall towers so everyone could see the clock. Big Ben in London started chiming in 1859. As cities grew, they built more clock towers. Today, we have phones to tell time, but people still love old clock towers!',
    MIDDLE_SCHOOL: 'Early mechanical clocks appeared in 14th-century Europe-the Salisbury Cathedral clock (1386) is among the oldest working. Medieval towns installed clocks in church towers and town halls. The Renaissance brought more elaborate astronomical clocks like Prague\'s (1410). Victorian Britain built many clock towers, including Big Ben (1859). American cities erected clock towers in train stations and civic buildings. The 20th century saw Art Deco examples like the Paramount Building in New York (1926). Many towers transitioned to electric movements in the mid-20th century.',
    HIGH_SCHOOL: 'Medieval clock tower development paralleled advances in horology-early weight-driven mechanisms evolved into more accurate verge escapements. The Strasbourg Cathedral astronomical clock (14th century) demonstrated advanced mechanical capabilities. Renaissance civic humanism promoted public timepieces as symbols of rational order. Industrial Revolution manufacturing enabled mass production of tower clock mechanisms. Victorian Britain made clock towers civic monuments-Big Ben represents national identity. Art Deco towers like the Wrigley Building (Chicago, 1921) combined clocks with commercial architecture. Digital technology enabled synchronized clocks but reduced the need for new towers.',
    UNDERGRADUATE: 'Clock tower history reveals technological innovation, changing time perception, and evolving civic functions. Medieval timekeeping served religious schedules (canonical hours). Renaissance astronomical clocks demonstrated scientific knowledge. Industrial capitalism required labor synchronization, driving clock tower proliferation. Railway time standardization (19th century) necessitated accurate public timepieces. Architectural styles evolved from Gothic church towers to purpose-built civic structures. Electric movements (early 20th century) reduced maintenance requirements but displaced traditional clockmaking skills. Contemporary preservation efforts balance mechanical heritage with operational efficiency.',
    GRADUATE: 'Historical analysis of clock towers examines technology diffusion, social construction of time, and urban symbolism. Research addresses the relationship between public timekeeping and labor discipline, the role of clock towers in time zone standardization, and the social meanings of mechanical versus digital time display. Contemporary challenges include conserving historic mechanisms while meeting accessibility standards, adapting decommissioned towers for new uses, and interpreting technological heritage for diverse audiences.',
    PHD: 'Clock tower scholarship engages history of science, labor history, and heritage studies. Methodologies include archaeological investigation of early clock mechanisms, social history of time measurement, and conservation science addressing metal fatigue in historic machinery. Current research examines clock towers in colonial contexts imposing Western time systems, the politics of heritage designation for industrial-era structures, and sensory history analyzing the role of clock bells in urban soundscapes.',
  },

  characteristics: [
    'Tall structure for visibility',
    'One or more prominent clock faces',
    'Often includes bells or chimes',
    'Serves as urban landmark',
    'Mechanical or electronic movement',
    'Illuminated for night visibility',
    'May include observation platform',
  ],

  famousExamples: [
    { name: 'Big Ben (Elizabeth Tower)', location: 'London, England', year: '1859', description: 'Gothic Revival tower with 13.5-ton bell, iconic British landmark' },
    { name: 'Zytglogge', location: 'Bern, Switzerland', year: '13th century (clock 1530)', description: 'Medieval tower with astronomical clock and moving figures' },
    { name: 'Makkah Royal Clock Tower', location: 'Mecca, Saudi Arabia', year: '2012', description: 'World\'s largest clock face, 601m tall' },
    { name: 'Rajabai Tower', location: 'Mumbai, India', year: '1878', description: 'Venetian Gothic tower in university complex' },
    { name: 'Spasskaya Tower', location: 'Moscow, Russia', year: '1491 (clock 1625)', description: 'Kremlin tower with chiming clock, Russian national symbol' },
  ],

  confusionPairs: [
    {
      elementId: 'bell-tower',
      reason: 'Both are tall towers with bells',
      distinction: 'Clock towers primarily display time with clock faces; bell towers (campaniles) primarily house bells for ringing, though many structures combine both functions',
    },
    {
      elementId: 'minaret',
      reason: 'Both are tall vertical structures',
      distinction: 'Minarets are Islamic religious towers for calling prayer; clock towers are secular civic structures for public timekeeping',
    },
  ],

  searchTags: ['clock', 'time', 'tower', 'bell', 'civic', 'landmark', 'urban', 'horology'],

  arMetadata: {
    modelPath: '/models/architecture/clock-tower.glb',
    scale: 0.08,
    rotatable: true,
    annotations: [
      { label: 'Clock Face', position: { x: 0, y: 4, z: 1 } },
      { label: 'Bell Chamber', position: { x: 0, y: 5, z: 0 } },
      { label: 'Clock Mechanism', position: { x: 0, y: 3, z: 0 } },
      { label: 'Spire', position: { x: 0, y: 6, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
