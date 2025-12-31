import type { ArchitecturalElement } from '../../../types';

export const RAMP_CIRCULATION: ArchitecturalElement = {
  id: 'ramp-circulation',
  slug: 'ramp-circulation',
  name: 'Ramp Circulation',
  alternativeNames: ['Promenade Architecturale', 'Architectural Promenade', 'Ramped Circulation'],
  pronunciation: {
    phonetic: 'RAMP sir-kyoo-LAY-shun',
    language: 'English',
  },
  etymology: {
    origin: 'French',
    meaning: 'Architectural walk or journey through space via ramps',
    rootWord: 'promenade architecturale (French)',
  },
  category: 'FLOOR',
  subcategory: 'modernist_circulation',
  periods: ['international-style', 'brutalism', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'SOUTH_AMERICA', 'ASIA'],

  images: {
    primary: '/images/architecture/elements/ramp-circulation-primary.jpg',
    gallery: [
      '/images/architecture/elements/ramp-savoye.jpg',
      '/images/architecture/elements/ramp-carpenter.jpg',
    ],
    diagram: '/images/architecture/diagrams/ramp-circulation.svg',
  },

  description: {
    ELEMENTARY: 'A ramp circulation is when a building uses gentle slopes instead of stairs to move between floors. You walk up a ramp that curves or zigzags through the building, letting you see different views as you go. It\'s like taking a scenic walk through the building instead of just climbing stairs.',
    MIDDLE_SCHOOL: 'Ramp circulation refers to using ramps as the primary means of moving between levels in a building, creating what Le Corbusier called the "promenade architecturale"-an architectural walk. Unlike stairs that move you vertically quickly, ramps create a gradual journey through space, offering changing views and spatial experiences. The ramp becomes both functional circulation and an architectural feature that shapes how you experience the building.',
    HIGH_SCHOOL: 'The architectural ramp represents a Modern reinterpretation of circulation as experiential journey rather than merely functional connection. Le Corbusier pioneered the concept of "promenade architecturale"-a carefully choreographed sequence of spatial experiences created by ramps that gradually reveal views, create diagonal sightlines, and establish dynamic relationships between levels. The ramp\'s gentle slope enables continuous movement while providing opportunities for pause, observation, and spatial understanding impossible with stairs.',
    UNDERGRADUATE: 'Ramp circulation embodies multiple Modernist principles: continuous space (flowing from level to level), dynamic movement (diagonal rather than vertical), and experiential design (architecture as choreographed sequence). The ramp\'s shallow slope (typically 1:12 to 1:20) creates extended travel distances, transforming circulation from utilitarian necessity into spatial promenade. This strategy enables: overlapping spatial volumes, changing perspectives, controlled revelation of views, and integration of indoor/outdoor spaces. The ramp also provides accessibility, though this was often incidental to aesthetic intentions in early Modernism.',
    GRADUATE: 'Analysis of ramped circulation must address phenomenological dimensions (embodied movement, temporal experience), formal implications (diagonal geometries, spatial layering), and functional considerations (accessibility, egress, efficiency). Le Corbusier\'s promenade architecturale created carefully orchestrated spatial narratives, while later architects explored different approaches: monumental ramps (Wright\'s Guggenheim), infrastructural ramps (Metabolism), landscape ramps (Holl, MVRDV). The ramp\'s extended path length becomes a design opportunity-for social encounter, artwork display, or spatial surprise-though it also creates challenges for compact plans and rapid circulation.',
    PHD: 'Scholarly examination of ramp circulation requires engagement with architectural theory (spatial sequence, movement), phenomenology (embodied experience, duration), accessibility studies (universal design), and structural analysis (cantilevers, supports). Research areas include: genealogies tracing ramps from baroque staircases to Modernist promenades, comparative analysis of circulation strategies, performance in emergency egress, and social behaviors on ramps vs. stairs. Critical questions: Does ramped circulation genuinely enhance spatial experience or primarily serve formal/ideological goals? How do ramps affect building efficiency and cost? What are implications for elderly or mobility-impaired users? Contemporary research examines: landscape-building integrations, multi-story atriums with ramped galleries, and parametric ramp design. The element remains significant as architecture addresses accessibility and experiential quality.',
  },

  history: {
    ELEMENTARY: 'Le Corbusier made ramps famous in buildings like Villa Savoye (1929), where you walk up a gentle ramp through the house seeing different rooms and views. Frank Lloyd Wright later designed the spiral ramp at the Guggenheim Museum (1959) in New York, where you walk down a curved ramp to see art.',
    MIDDLE_SCHOOL: 'While ramps existed in ancient architecture (Roman buildings, fortifications), Le Corbusier developed the concept of "promenade architecturale" in the 1920s-30s, using ramps to create spatial experiences (Villa Savoye, Villa Church). Frank Lloyd Wright\'s Guggenheim Museum (1959) made the ramp the organizing principle of the entire building. Post-war architects continued exploring ramps as both circulation and spatial device in museums, schools, and public buildings.',
    HIGH_SCHOOL: 'Modern ramp circulation evolved from functional precedents (industrial ramps, parking structures) to Le Corbusier\'s theoretical concept of promenade architecturale. Key projects include Villa Savoye (1929-31, central ramp as spatial organizer), Carpenter Center (1963, outdoor ramp penetrating the building), and Wright\'s Guggenheim (1943-59, spiral ramp as gallery space). Later examples demonstrate diverse approaches: Louis Kahn\'s Kimbell Art Museum (1972, subtle ramps), Steven Holl\'s Simmons Hall (2002, ramped circulation spine), and MVRDV\'s Market Hall Rotterdam (2014, apartment-lined ramp).',
    UNDERGRADUATE: 'Ramp circulation development encompasses multiple strands: baroque theatrical staircases, industrial utilitarian ramps, and Modernist spatial promenades. Le Corbusier\'s theorization (1920s) established ramps as generators of architectural experience, demonstrated in Villa Church (1927), Villa Savoye (1929-31), and later Carpenter Center (1961-63). Wright\'s Guggenheim (1943-59) reimagined the museum as continuous ramped gallery. Post-war examples include Oscar Niemeyer\'s National Congress (1958-60), Le Corbusier\'s Carpenter Center (1963), and Arata Isozaki\'s Gunma Museum (1974). Contemporary architects employ ramps for: landscape integration (BIG), social space (OMA), and circulation as experience (Diller Scofidio + Renfro).',
    GRADUATE: 'The historiography of ramped circulation must distinguish functional precedents (ancient ramps, Renaissance palazzo ramps) from experiential Modernist applications. Le Corbusier\'s concept emerged from multiple influences: automobile culture (gradual ascent), modern spatial thinking (continuous space), and painterly composition (controlled viewpoints). Critical analysis reveals diverse implementations: the intimate domestic scale of Villa Savoye, the public grandeur of Carpenter Center, the monumental spiral of Guggenheim. Post-war developments include Brazilian integration with landscape (Niemeyer), Metabolist infrastructure (Kurokawa), and contemporary large-scale applications (Museo Jumex, High Line). Scholarly assessment addresses both spatial richness and practical limitations (extended path length, structural complexity).',
    PHD: 'Academic research on ramp circulation encompasses architectural history (concept genealogy), phenomenology (movement and perception), disability studies (accessibility politics), and building performance (egress analysis). Key topics: Le Corbusier\'s theoretical development of the promenade architecturale, comparative studies of circulation strategies, structural innovations enabling cantilevered ramps, and social behaviors on ramped spaces. Critical questions: When does ramped circulation enhance experience vs. complicate function? How have accessibility requirements reshaped ramp design? What cultural meanings attach to ramps vs. stairs (processional, democratic, etc.)? Contemporary research areas include: computational circulation analysis, landscape-building hybrids, ramped public spaces, and accessible design beyond minimum compliance. The ramp persists as both functional solution and spatial generator.',
  },

  characteristics: [
    'Gentle slope (typically 1:12 to 1:20) connecting levels',
    'Extended path length creating journey through space',
    'Enables continuous movement without steps',
    'Provides changing views and perspectives',
    'Can be interior or exterior',
    'Often becomes defining architectural feature',
  ],

  famousExamples: [
    { name: 'Villa Savoye', location: 'Poissy, France', year: '1929-1931', description: 'Le Corbusier\'s iconic ramp creating promenade architecturale through the house' },
    { name: 'Guggenheim Museum', location: 'New York City, USA', year: '1943-1959', description: 'Frank Lloyd Wright\'s continuous spiral ramp as gallery space' },
    { name: 'Carpenter Center for the Visual Arts', location: 'Cambridge, Massachusetts, USA', year: '1961-1963', description: 'Le Corbusier\'s only U.S. building with exterior ramp piercing through' },
    { name: 'National Congress of Brazil', location: 'Brasília, Brazil', year: '1958-1960', description: 'Oscar Niemeyer\'s monumental ramps to legislative chambers' },
    { name: 'Whitney Museum of American Art', location: 'New York City, USA', year: '2015', description: 'Renzo Piano\'s exterior ramps connecting to High Line park' },
  ],

  confusionPairs: [
    {
      elementId: 'grand-staircase',
      reason: 'Both are monumental circulation elements',
      distinction: 'Ramps have gradual slopes for continuous walking; grand staircases use steps for vertical movement',
    },
  ],

  searchTags: ['ramp', 'promenade architecturale', 'circulation', 'corbusier', 'wright', 'guggenheim', 'modern', 'accessibility', 'spatial sequence'],

  arMetadata: {
    modelPath: '/models/architecture/ramp-circulation.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Gentle Slope', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Upper Level Connection', position: { x: 0.3, y: 0.6, z: 0.3 } },
      { label: 'Lower Level Connection', position: { x: -0.3, y: 0, z: -0.3 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
