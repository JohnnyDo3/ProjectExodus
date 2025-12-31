import type { ArchitecturalElement } from '../../types';

export const FOLLY: ArchitecturalElement = {
  id: 'folly',
  slug: 'folly',
  name: 'Folly',
  alternativeNames: ['Ornamental Building', 'Eyecatcher', 'Sham Ruin', 'Fabrique'],
  pronunciation: {
    phonetic: 'FOL-ee',
    language: 'English',
  },
  etymology: {
    origin: 'French',
    meaning: 'Madness or foolishness',
    rootWord: 'From French "folie" (madness) - suggesting foolish extravagance',
  },
  category: 'GARDEN',
  subcategory: 'ornamental_structures',
  periods: ['BAROQUE', 'ROCOCO', 'PICTURESQUE', 'ROMANTIC', 'VICTORIAN', 'CONTEMPORARY'],
  regions: ['ENGLAND', 'FRANCE', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/folly-primary.jpg',
    gallery: [
      '/images/architecture/elements/folly-ruins.jpg',
      '/images/architecture/elements/folly-tower.jpg',
    ],
    diagram: '/images/architecture/diagrams/folly-types.svg',
  },

  description: {
    ELEMENTARY: 'A folly is a fun, decorative building in a garden or park that doesn\'t have any real use! Some look like fake castle ruins or towers. Some look like Greek temples or Egyptian pyramids. Rich people built them just to make their gardens more interesting and beautiful. They\'re like garden decorations, but building-sized!',
    MIDDLE_SCHOOL: 'A folly is an ornamental structure built primarily for visual effect rather than practical function. Types include sham ruins (fake medieval remains), towers, temples, pyramids, and exotic structures. Often positioned as "eyecatchers" terminating views in landscape gardens. While some have minimal function (shelter, viewpoint), their primary purpose is decorative and atmospheric. Follies range from small garden ornaments to substantial architectural constructions.',
    HIGH_SCHOOL: 'The folly is a genre of ornamental architecture characterized by primacy of visual effect over practical function. Categories include sham ruins (artificial medieval fragments), classical temples, Gothic towers, exotic structures (Turkish kiosks, Chinese pagodas), and whimsical creations. Follies serve as focal points in landscape composition, create picturesque or sublime effects, and demonstrate patron wealth and taste. The term itself acknowledges the "folly" of expensive construction without utilitarian purpose.',
    UNDERGRADUATE: 'Folly design engages aesthetic theory, landscape composition, and architectural pastiche. Sham ruins employed artificial weathering techniques to suggest antiquity. Stylistic borrowing ranged from Gothic romanticism to Orientalist fantasy. Site selection considered distant viewing angles and landscape narrative. The folly embodies Picturesque and Romantic aesthetic values-irregularity, historical association, emotional response. Philosophical questions arise about authenticity, architectural function, and the nature of ornament. Contemporary follies explore conceptual and sculptural possibilities.',
    GRADUATE: 'Folly analysis encompasses landscape history, architectural theory, and cultural studies. Research examines construction techniques (artificial aging methods, Gothic detail accuracy), patronage motivations, and landscape theory (Picturesque composition principles). The folly\'s relationship to architectural authenticity raises theoretical questions about simulation and experience. Conservation challenges include managing structures deliberately designed to appear ruined and interpreting cultural appropriation in exotic follies. Contemporary practice explores the folly tradition in art and architecture.',
    PHD: 'Research into follies engages landscape history, architectural theory, and cultural criticism. Scholarly investigation addresses aesthetic philosophy (Burke\'s sublime, Picturesque theory), the politics of sham ruins (nostalgia, class identity), and Orientalism in exotic follies. Methodologies include archival research (design sources, construction accounts), comparative analysis across European traditions, and theoretical examination of architectural fiction. Current research explores contemporary artist-architect engagement with folly traditions and heritage interpretation challenges.',
  },

  history: {
    ELEMENTARY: 'Starting in the 1700s, rich English landowners built follies to decorate their huge gardens. Some made fake castle ruins to make their land look old and romantic! Others built towers so tall they could see for miles. Some follies looked like buildings from faraway places like China or Egypt. Building follies was very popular for over 200 years.',
    MIDDLE_SCHOOL: 'Folly building flourished in 18th-19th century England. Picturesque landscape theory valued ruins and varied architecture as compositional elements. Landowners commissioned Gothic ruins, classical temples, and exotic structures. Some follies commemorated events; others simply ornamented views. The Victorian era continued the tradition. Economic motivations sometimes included providing employment during agricultural depressions. Contemporary artists and architects have revived folly building as conceptual practice.',
    HIGH_SCHOOL: 'Early follies appeared in Baroque gardens but proliferated with Picturesque landscape theory (1700s-1800s). William Kent pioneered naturalistic landscapes with architectural incidents. Batty Langley\'s pattern books provided Gothic details. Sham ruins satisfied Romantic fascination with antiquity without requiring actual medieval fragments. Exotic follies reflected colonial encounters and Orientalist taste. Victorian follies became increasingly whimsical. 20th-century modernism rejected follies; recent decades have seen artistic revival.',
    UNDERGRADUATE: 'Folly history reflects changing landscape aesthetics and cultural attitudes. French Baroque precedents (Désert de Retz) influenced English practice. Picturesque theory (Price, Knight) theorized the folly\'s role in landscape composition-creating variety, historical association, and emotional response. Gothic Revival\'s archaeological approach complicated relationships with sham ruins. Colonial expansion influenced exotic follies, raising questions about cultural appropriation. Contemporary follies engage with historical tradition while exploring conceptual and critical possibilities.',
    GRADUATE: 'Historical analysis of follies examines aesthetic theory, patronage networks, and building practice. Research addresses pattern book dissemination (Batty Langley, P.F. Robinson), construction techniques for sham ruins, and the economics of folly building. Conservation challenges include maintaining deliberately fragmentary structures and interpreting historically problematic cultural appropriations. Contemporary scholarship examines the folly\'s role in constructing national identity (medieval ruins and Englishness) and landscape narratives.',
    PHD: 'Folly scholarship engages landscape history, architectural theory, and postcolonial studies. Methodologies include archival research (design correspondence, construction accounts), comparative analysis (Continental fabriques, English follies), and theoretical examination of architectural authenticity and simulation. Current research addresses the politics of sham ruins (nostalgia and class identity), Orientalism in exotic follies, gender and patronage, and contemporary artists\' engagement with folly traditions as critical practice.',
  },

  characteristics: [
    'Primarily decorative, minimal function',
    'Often positioned as "eyecatcher"',
    'Diverse stylistic references',
    'Common types: ruins, towers, temples',
    'Ranges from small to substantial',
    'Often employs architectural pastiche',
    'May commemorate events or people',
  ],

  famousExamples: [
    { name: 'The Temple of Apollo', location: 'Stourhead, UK', year: '1765', description: 'Circular classical temple overlooking lake' },
    { name: 'Wainhouse Tower', location: 'Halifax, UK', year: '1875', description: 'Tallest folly in Britain at 275 feet' },
    { name: 'Désert de Retz Broken Column', location: 'Chambourcy, France', year: '1781', description: 'Enormous house disguised as ruined column' },
    { name: 'Folly Farm Tower', location: 'Sulhamstead, UK', year: '1906', description: 'Arts and Crafts tower by Edwin Lutyens' },
    { name: 'Broadway Tower', location: 'Worcestershire, UK', year: '1798', description: 'Romantic castle-style folly on Cotswolds hill' },
  ],

  confusionPairs: [
    {
      elementId: 'gazebo',
      reason: 'Both are ornamental garden structures',
      distinction: 'Gazebos are functional shelters with roofs and seating; follies are primarily decorative with little to no function',
    },
    {
      elementId: 'belvedere',
      reason: 'Both may be towers in landscapes',
      distinction: 'Belvederes are specifically viewing towers with practical function; follies prioritize decoration over function',
    },
    {
      elementId: 'grotto',
      reason: 'Both are ornamental garden features',
      distinction: 'Grottos are specifically cave-like structures with water; follies encompass all non-functional ornamental buildings',
    },
  ],

  searchTags: ['ornamental', 'eyecatcher', 'ruins', 'picturesque', 'romantic', 'tower', 'temple', 'decorative', 'landscape'],

  arMetadata: {
    modelPath: '/models/architecture/folly.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Ruined Tower', position: { x: 0, y: 2, z: 0 } },
      { label: 'Artificial Weathering', position: { x: 0.3, y: 1.5, z: 0.3 } },
      { label: 'Gothic Detail', position: { x: 0.5, y: 1, z: 0 } },
      { label: 'Fragmentary Walls', position: { x: 0.7, y: 0.5, z: 0.5 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
