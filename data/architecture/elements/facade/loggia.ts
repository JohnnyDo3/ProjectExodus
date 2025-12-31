import type { ArchitecturalElement } from '../../types';

export const LOGGIA: ArchitecturalElement = {
  id: 'loggia',
  slug: 'loggia',
  name: 'Loggia',
  alternativeNames: ['Arcaded Gallery', 'Covered Arcade', 'Colonnade Gallery'],
  pronunciation: {
    phonetic: 'LOH-jah',
    language: 'Italian',
  },
  etymology: {
    origin: 'Italian',
    meaning: 'From Old French "loge" meaning covered area or lodge',
    rootWord: 'loggia',
  },
  category: 'FACADE',
  subcategory: 'exterior_gallery',
  periods: ['roman', 'romanesque', 'renaissance', 'baroque', 'neoclassical', 'beaux-arts'],
  regions: ['MEDITERRANEAN', 'ITALY', 'WESTERN_EUROPE', 'EASTERN_EUROPE'],

  images: {
    primary: '/images/architecture/elements/loggia-primary.jpg',
    gallery: [
      '/images/architecture/elements/loggia-renaissance.jpg',
      '/images/architecture/elements/loggia-dei-lanzi.jpg',
      '/images/architecture/elements/loggia-palazzo.jpg',
    ],
    diagram: '/images/architecture/diagrams/loggia-structure.svg',
  },

  description: {
    ELEMENTARY: 'A loggia is like a fancy covered porch on a building! It has a roof and open sides with columns or arches, creating a shady outdoor room. Imagine a hallway that\'s open to the outside-you can walk through it and feel the breeze, but you\'re protected from the sun and rain. Italian palaces often have beautiful loggias where people could enjoy fresh air while staying in the shade!',
    MIDDLE_SCHOOL: 'A loggia is a covered exterior gallery or corridor, open to the air on one or more sides, typically supported by columns or arches. Unlike a simple porch, a loggia is usually recessed into the building\'s volume rather than projecting from it. Loggias provide transitional spaces between interior and exterior, offering shelter from sun and rain while maintaining connection to outdoor spaces. They appear on multiple building types: palaces (for outdoor living and ceremonies), churches (for public addresses), and civic buildings (for gatherings). Famous examples include the Loggia dei Lanzi in Florence, which serves as an open-air sculpture gallery.',
    HIGH_SCHOOL: 'Loggias are covered arcaded or colonnaded galleries integral to building facades, creating semi-outdoor spaces that mediate between interior and exterior environments. These architectural elements evolved from Roman porticoes and medieval arcades into sophisticated Renaissance design features. Loggias serve multiple functions: providing shaded outdoor living spaces in hot climates, creating opportunities for display and ceremony, offering covered circulation, and articulating facade composition. Architecturally, loggias can be recessed into the building volume or project slightly, and they typically occupy one or more full stories. Renaissance architects employed loggias extensively-Brunelleschi\'s Ospedale degli Innocenti features a ground-floor loggia creating public/institutional interface. Loggias also appear in villa design, connecting buildings to gardens.',
    UNDERGRADUATE: 'Loggias function as sophisticated architectural devices addressing climatic response, social practice, and compositional strategy. Climatically, loggias provide shade while enabling air circulation, essential in Mediterranean climates. Socially, they create semi-public spaces suitable for ceremony, display, and transition between private and public realms. Compositionally, loggias articulate facades through rhythm of arches or columns, create depth and shadow, and establish vertical or horizontal emphasis. Roman precedents include villa porticoes and forum colonnades. Renaissance systematization elevated loggias to key design elements-Palazzo Rucellai incorporates a ground-floor loggia (later enclosed); Ospedale degli Innocenti\'s loggia creates iconic urban facade. Villa design featured prominent loggias connecting buildings to landscape-Palladio\'s Villa Cornaro and Villa Foscari. Urban loggias served civic functions-Loggia dei Lanzi in Florence. Theoretical discourse from Alberti through Palladio addressed loggia design within proportional systems and decorum.',
    GRADUATE: 'Critical loggia analysis addresses climatic function, social meaning, and architectural representation. Loggias exemplify architecture\'s mediation between environmental conditions and cultural practices. Roman precedents established loggias as environmental moderators and social spaces-villa designs incorporated loggia-like porticoes for otium (leisure). Medieval loggias appeared on civic buildings and religious structures. Renaissance theorization began with Alberti, who discussed loggias within palazzo design. Built examples demonstrate diverse applications: Brunelleschi\'s Ospedale degli Innocenti pioneered the Renaissance loggia as urban interface; Palazzo della Ragione in Padua features a massive upper loggia; Palladio\'s villas employ loggias as primary architectural elements connecting buildings to landscape. Theoretical questions include: How do loggias mediate public/private boundaries? What climatic and social functions do they serve? How do they articulate facade composition? Baroque architects employed loggias in palace design and urban contexts. Analysis must address loggia variations across building types, regional climate adaptations, and changing social practices.',
    PHD: 'Advanced loggia scholarship engages environmental, social, and formal dimensions across historical and geographic contexts. Research questions include: How did loggias evolve from climatic necessity to sophisticated architectural element? What social practices did loggias enable and how did these vary culturally? How did theoretical discourse shape loggia design and interpretation? Methodological approaches encompass environmental analysis (solar shading, ventilation, thermal comfort); ethnographic investigation of social practices (ceremony, display, leisure); formal analysis of compositional strategies; and reception studies of evolving meanings. Primary sources include Vitruvius (limited portico discussion), Alberti (De re aedificatoria), Palladio (I quattro libri), and treatises addressing climate-responsive design. Comparative analysis reveals regional variations-Italian loggias for hot summers versus northern European adaptations. Critical frameworks address loggias through environmental determinism debates, social space theory (public/private/semi-public gradations), and phenomenology (embodied experience of threshold spaces). Contemporary research examines loggias within sustainable design discourse-passive cooling strategies, bioclimatic architecture-and cultural landscape studies addressing changing relationships between interior and exterior living.',
  },

  history: {
    ELEMENTARY: 'Loggias started in ancient Rome over 2,000 years ago, where wealthy Romans built covered porches on their villas. During the Renaissance in Italy (about 500 years ago), loggias became super popular! Architects designed beautiful loggias with graceful arches and columns on palaces and public buildings. The Loggia dei Lanzi in Florence, built in 1382, is a famous open-air gallery where beautiful statues are displayed. People still visit it today!',
    MIDDLE_SCHOOL: 'Ancient Romans built covered colonnades and porticoes on villas and public buildings, establishing the loggia precedent. Medieval Italian cities featured loggias on civic buildings for public gatherings and commerce. The Loggia dei Lanzi in Florence (1376-1382) became an iconic civic loggia for ceremonies and now houses sculptures. Renaissance architects made loggias central design features-Brunelleschi\'s Ospedale degli Innocenti (1419-1445) features a revolutionary ground-floor loggia with graceful arches. Palladio used loggias extensively in villa designs (1540s-1570s), creating seamless indoor-outdoor connections. Baroque architects continued loggia usage in palace design. The element spread beyond Italy to other European countries and eventually to colonial architecture worldwide.',
    HIGH_SCHOOL: 'Loggia development traces from Roman porticoes through medieval civic arcades to Renaissance systematization. Roman villas featured covered colonnades providing shade and outdoor living spaces-Pliny the Younger described villa loggias in his letters. Medieval Italian cities developed civic loggias for commerce and public functions-Loggia dei Lanzi in Florence (Benci di Cione and Simone di Francesco Talenti, 1376-1382) exemplifies this type. Renaissance architects theorized and refined loggia design. Brunelleschi\'s Ospedale degli Innocenti (1419-1445) created an iconic street-facing loggia. Alberti discussed loggias in palazzo design. Bramante\'s Cortile del Belvedere featured multi-story loggias. Raphael designed the Vatican Loggias (1517-1519). Palladio systematically employed loggias in villa architecture-Villa Cornaro, Villa Foscari, Villa Rotonda-integrating them into temple-front compositions. Baroque architects used loggias in palace design-Palazzo Barberini features a monumental loggia. The element spread throughout Europe and colonial territories.',
    UNDERGRADUATE: 'Loggia evolution demonstrates the transformation of climatic response into sophisticated architectural language. Roman precedents include villa porticoes described by Pliny and Vitruvius, and urban colonnades providing shade in fora. Medieval Italian communes developed civic loggias-Loggia dei Lanzi in Florence, Loggia del Capitanio in Vicenza. Renaissance theorization began with Alberti\'s discussion of palace loggias in De re aedificatoria. Brunelleschi\'s Ospedale degli Innocenti (1419-1445) created paradigmatic Renaissance loggia-nine bays of Corinthian arches on columns creating urban interface and charitable institution symbol. Bramante\'s Belvedere courtyard featured multi-story loggias connecting Vatican palace to villa. Raphael\'s Vatican Loggias (1517-1519) provided covered circulation and display spaces. Palladio\'s villa designs elevated loggias to primary architectural elements-Villa Cornaro features double-height loggias; Villa Rotonda employs four temple-front loggias. I quattro libri dell\'architettura systematically illustrated loggia applications. Baroque architects employed loggias in palace complexes-Carlo Maderno\'s Palazzo Barberini. Analysis must address loggia functions: environmental moderation, social practices, compositional articulation.',
    GRADUATE: 'Critical loggia studies address environmental performance, social functions, and formal strategies across contexts. Roman precedents established loggias as environmental moderators and leisure spaces-Vitruvius discussed portico orientations; Pliny described seasonal loggias at Laurentine and Tuscan villas. Medieval civic loggias served commercial and governmental functions-Loggia dei Lanzi as governmental ceremonial space; Padua\'s Palazzo della Ragione loggia. Renaissance reception involved archaeological study and theoretical systematization. Alberti\'s De re aedificatoria addressed loggias within palazzo typology. Built examples demonstrate diverse applications: Brunelleschi\'s hospital loggia as urban/institutional interface; Bramante\'s Belvedere as circulation and transition; Raphael\'s Vatican Loggias as display spaces. Palladio\'s theoretical and built work integrated loggias into comprehensive villa systems-environmental function, social practice, aesthetic composition. Quattro libri illustrated loggia variations and proportional systems. Baroque elaborations included multi-story palace loggias. Theoretical questions include: How do loggias mediate interior/exterior boundaries? What social practices do they enable? How do environmental and formal considerations interact? Comparative regional analysis reveals variations in loggia usage based on climate and culture.',
    PHD: 'Advanced loggia scholarship employs multiple disciplinary approaches: environmental science (thermal comfort, daylighting, ventilation); architectural history (typological evolution, theoretical discourse); social history (domestic practices, civic ceremonies); and critical theory (space production, environmental determinism). Research questions include: How did loggias evolve from practical environmental response to complex architectural element? What relationships existed between climatic conditions, social practices, and formal solutions? How did theoretical discourse shape design? Primary sources include Vitruvius (De architectura), Pliny (villa letters), Alberti (De re aedificatoria), Serlio, Palladio (Quattro libri), and later treatises. Methodological frameworks encompass environmental analysis using contemporary climate science; ethnographic approaches to social space usage; reception theory examining how different periods interpreted precedents; and phenomenological investigation of threshold space experience. Critical analysis reveals loggias functioning simultaneously as climatic devices, social enablers, and compositional elements. Contemporary research engages sustainable design discourse-passive cooling, bioclimatic architecture-and cultural landscape studies examining changing interior/exterior relationships in Mediterranean architecture. Comparative studies address regional variations: Italian loggias versus Spanish galleries versus Ottoman revaks.',
  },

  characteristics: [
    'Covered exterior gallery open on one or more sides',
    'Supported by columns, arches, or arcades',
    'Usually recessed into building volume',
    'Creates transitional space between interior and exterior',
    'Provides shade and weather protection',
    'Enables outdoor living and ceremonies',
    'Often spans one or more full stories',
    'Integral to facade composition, not an addition',
  ],

  famousExamples: [
    {
      name: 'Loggia dei Lanzi',
      location: 'Florence, Italy',
      year: '1376-1382',
      description: 'Civic loggia now housing outdoor sculpture gallery',
    },
    {
      name: 'Ospedale degli Innocenti',
      location: 'Florence, Italy',
      year: '1419-1445',
      description: 'Brunelleschi\'s revolutionary Renaissance loggia facade',
    },
    {
      name: 'Vatican Loggias',
      location: 'Vatican City',
      year: '1517-1519',
      description: 'Raphael\'s frescoed covered galleries',
    },
    {
      name: 'Villa Rotonda',
      location: 'Vicenza, Italy',
      year: '1567-1571',
      description: 'Palladio\'s villa with four temple-front loggias',
    },
    {
      name: 'Palazzo Barberini',
      location: 'Rome, Italy',
      year: '1626-1633',
      description: 'Carlo Maderno\'s palace with monumental central loggia',
    },
  ],

  confusionPairs: [
    {
      elementId: 'portico',
      reason: 'Both are covered columned spaces',
      distinction: 'Porticos project from the building and cover entrances; loggias are recessed galleries providing outdoor rooms',
    },
    {
      elementId: 'colonnade',
      reason: 'Both feature rows of columns',
      distinction: 'Colonnades are freestanding rows of columns; loggias are integral galleries recessed into building facades',
    },
    {
      elementId: 'arcade',
      reason: 'Both feature series of arches',
      distinction: 'Arcades can be simple covered walkways; loggias are architectural features integral to major facades',
    },
  ],

  searchTags: [
    'loggia',
    'gallery',
    'arcade',
    'covered porch',
    'colonnade',
    'Italian architecture',
    'Renaissance',
    'outdoor room',
    'shaded space',
    'villa',
  ],

  arMetadata: {
    modelPath: '/models/architecture/loggia.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Supporting Columns', position: { x: -0.5, y: -0.3, z: 0 } },
      { label: 'Arched Opening', position: { x: 0, y: 0.2, z: 0 } },
      { label: 'Vaulted Ceiling', position: { x: 0, y: 0.5, z: -0.2 } },
      { label: 'Recessed Space', position: { x: 0, y: 0, z: -0.5 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
