import type { ArchitecturalElement } from '../../types';

export const PERRON: ArchitecturalElement = {
  id: 'perron',
  slug: 'perron',
  name: 'Perron',
  alternativeNames: ['Exterior Stair Platform', 'Stoop', 'External Staircase', 'Monumental Stair'],
  pronunciation: {
    phonetic: 'peh-ROHN',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Large stone or exterior stair',
    rootWord: 'From Old French "perron" (large stone block)',
  },
  category: 'FLOOR',
  subcategory: 'stairs',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/perron-primary.jpg',
    gallery: [
      '/images/architecture/elements/perron-versailles.jpg',
      '/images/architecture/elements/perron-chateau.jpg',
    ],
    diagram: '/images/architecture/diagrams/perron-composition.svg',
  },

  description: {
    ELEMENTARY: 'A perron is a grand outdoor staircase leading up to the main entrance of an important building like a palace or mansion. It often has wide steps, fancy railings, and a big platform at the top where people can stand. Perrons make buildings look impressive and welcoming!',
    MIDDLE_SCHOOL: 'A perron is an exterior ceremonial staircase, typically symmetrical and monumental, leading to a building\'s principal entrance. Common in European palaces and estates, perrons feature broad steps, balustraded landings, and often split or curved configurations. They serve both functional (access) and symbolic (status, ceremony) purposes, creating an impressive approach to important buildings.',
    HIGH_SCHOOL: 'The perron is an architectural element consisting of an exterior staircase with landings, typically constructed of stone, providing ceremonial access to a building\'s piano nobile or main floor. Characteristic features include symmetrical double-branched configurations (bifurcating or converging), balustraded parapets, sculptural ornament, and integration with the facade composition. The perron mediates between landscape and architecture, creating a transitional zone for formal entrances and public gatherings.',
    UNDERGRADUATE: 'Perron design integrates architectural composition, structural engineering, and ceremonial function. Typological analysis reveals configurations: straight runs, bifurcated (diverging arms), converging (horseshoe), or imperial (central flight splitting to lateral returns). Structural systems-masonry vaults, stone cantilevers, iron-reinforced construction-evolved with technology. The perron operates scenographically: it stages social ritual, provides viewing platform, and articulates the building\'s hierarchical organization. Renaissance and Baroque examples emphasize symmetry and plastic modeling. Neoclassical designs reference ancient temple platforms (stereobate, crepidoma).',
    GRADUATE: 'Advanced analysis of perrons addresses their role in architectural representation, spatial sequence, and social performance. The element operates at multiple scales: urban (forecourt composition), architectural (facade articulation), and experiential (processional ascent). Historical examination reveals the perron\'s development from fortified medieval stairs to Renaissance ceremonial platforms to Baroque theater. Technical investigation includes engineering challenges (cantilevered stone steps, weathering of exterior masonry), material selection (frost-resistant limestone, granite), and deterioration mechanisms. Conservation addresses structural stability, stone replacement, and balustrade safety upgrades.',
    PHD: 'Perron research encompasses architectural history, landscape architecture, and performance studies. Scholarly investigation examines the element\'s classical precedents (Greek temple platforms, Roman podia), Renaissance recovery through treatises (Palladio, Scamozzi), and Baroque elaboration (Versailles, Würzburg). Social history analysis addresses how perrons staged power-aristocratic arrivals, public addresses, military reviews. Technical research investigates construction methods, stone-cutting technology, and the integration of sculptural programs. Conservation science develops assessment methodologies for structural stability and material deterioration. Contemporary relevance includes accessibility challenges and adaptive reuse of historic buildings.',
  },

  history: {
    ELEMENTARY: 'Kings and queens built grand staircases outside their palaces to show how important they were. The most famous perron is at the Palace of Versailles in France, where Louis XIV, the "Sun King," would appear before his subjects. Today, many government buildings and museums still have impressive outdoor stairs at their entrances.',
    MIDDLE_SCHOOL: 'Medieval castles had exterior stairs to elevated entrances (for defense). The Renaissance transformed this functional element into ceremonial architecture. Italian palazzi featured elegant exterior stairs connecting to piano nobile levels. French châteaux developed elaborate perrons as focal points of garden facades. The form reached baroque splendor at Versailles (1670s) and German palaces like Würzburg. Neoclassical and Beaux-Arts movements continued the tradition for civic buildings, museums, and institutions.',
    HIGH_SCHOOL: 'The perron evolved from medieval fortification to Renaissance ceremony to Baroque spectacle. Medieval exterior stairs served defensive functions-removable access, elevated entries. Renaissance architects (Bramante, Palladio) formalized the perron as architectural element, citing classical temple platforms. Baroque development emphasized theatrical effect: Versailles\'s Marble Staircase (destroyed 1752), Würzburg Residenz (Neumann, 1720s). The 18th-19th centuries saw perrons adopted for civic architecture-museums, parliaments, universities-symbolizing public access and institutional dignity. 20th-century modernism largely rejected such overt hierarchical expression.',
    UNDERGRADUATE: 'Perron historiography reveals architecture\'s mediation of social structure and spatial practice. Medieval precedents (Château de Blois) provided functional models transformed by Renaissance humanism into regulated compositions. Architectural treatises codified proportions and configurations. French classical architecture made the perron a signature element, particularly in garden-facing facades where it mediated building and landscape. Baroque multiplication of staircases created dynamic circulation and viewing sequences. The perron\'s decline correlates with changing social orders-democratic ideals challenged overt hierarchy. Contemporary examples often reference historical forms ironically or engage accessibility requirements.',
    GRADUATE: 'Historical analysis of perrons addresses representation, technology, and social practice. Research examines how perrons staged political theater: royal appearances, diplomatic receptions, military reviews. The element\'s formal development-from simple flights to complex geometries-reflects evolving compositional systems and structural capabilities. Stone-cutting technology enabled increasingly daring cantilevers and sculptural integration. Conservation challenges include structural assessment (thrust of vaulted stairs, cantilever stability), material deterioration (frost damage, pollution), and code compliance (railings, accessibility). Contemporary scholarship examines the perron\'s role in architectural semiotics and public space.',
    PHD: 'Scholarly investigation of perrons encompasses architectural theory, court history, and conservation science. Research addresses classical precedents and their Renaissance interpretation, the role of treatises in disseminating perron types, and regional variations in form and material. Court ceremonial studies illuminate how perrons functioned in social ritual-spacing and rhythm controlling procession, platform providing stage for display. Technical research examines construction methods through archaeological investigation, structural behavior through monitoring, and deterioration mechanisms through materials science. Contemporary relevance includes questions of accessibility (retrofitting historic perrons), public gathering (civic space activation), and architectural representation (meaning of monumentality today).',
  },

  characteristics: [
    'Exterior ceremonial staircase',
    'Typically stone construction (limestone, marble, granite)',
    'Symmetrical, often bifurcated configuration',
    'Balustraded landings and parapets',
    'Leads to piano nobile or main entrance',
    'Integrates with building facade composition',
    'May include sculptural ornament',
  ],

  famousExamples: [
    { name: 'Palace of Versailles Garden Facade', location: 'Versailles, France', year: '1670s', description: 'Iconic perrons connecting palace to formal gardens' },
    { name: 'Würzburg Residenz', location: 'Würzburg, Germany', year: '1720-1744', description: 'Baroque perron by Balthasar Neumann with Tiepolo frescoes' },
    { name: 'Château de Fontainebleau', location: 'Fontainebleau, France', year: '16th century', description: 'Famous horseshoe-shaped perron (Escalier du Fer-à-Cheval)' },
    { name: 'Philadelphia Museum of Art', location: 'Philadelphia, USA', year: '1928', description: 'Neoclassical perron with 72 steps (famous from "Rocky")' },
    { name: 'Schönbrunn Palace', location: 'Vienna, Austria', year: '1696-1712', description: 'Baroque perrons connecting palace to terraced gardens' },
  ],

  confusionPairs: [
    {
      elementId: 'grand-staircase',
      reason: 'Both are monumental stairs in important buildings',
      distinction: 'Perrons are exterior ceremonial stairs; grand staircases are interior principal stairs',
    },
    {
      elementId: 'portico',
      reason: 'Both are prominent entrance features',
      distinction: 'Perrons are exterior stairs with platforms; porticos are covered colonnaded entrance structures',
    },
    {
      elementId: 'terrace',
      reason: 'Both are exterior platforms at building entrances',
      distinction: 'Perrons include the staircase accessing the platform; terraces are level platforms or garden areas',
    },
  ],

  searchTags: ['stairs', 'exterior', 'ceremonial', 'baroque', 'palace', 'entrance', 'monumental', 'french', 'platform'],

  arMetadata: {
    modelPath: '/models/architecture/perron.glb',
    scale: 0.6,
    rotatable: true,
    annotations: [
      { label: 'Bifurcated Stair Arms', position: { x: -0.5, y: 0.3, z: 0 } },
      { label: 'Upper Landing Platform', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Balustraded Parapet', position: { x: 0.6, y: 0.5, z: 0 } },
      { label: 'Stone Steps', position: { x: -0.3, y: 0.2, z: 0.3 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
