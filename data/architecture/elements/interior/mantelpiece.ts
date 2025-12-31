import type { ArchitecturalElement } from '../../types';

export const MANTELPIECE: ArchitecturalElement = {
  id: 'mantelpiece',
  slug: 'mantelpiece',
  name: 'Mantelpiece',
  alternativeNames: ['Mantel', 'Chimneypiece', 'Mantelshelf'],
  pronunciation: {
    phonetic: 'MAN-tuhl-peess',
    language: 'English',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'Cloak or covering',
    rootWord: 'mantel (Old French "mantel" meaning cloak)',
  },
  category: 'INTERIOR',
  subcategory: 'fireplaces',
  periods: ['RENAISSANCE', 'BAROQUE', 'GEORGIAN', 'VICTORIAN', 'EDWARDIAN', 'ARTS_AND_CRAFTS', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'AUSTRALIA'],

  images: {
    primary: '/images/architecture/elements/mantelpiece-primary.jpg',
    gallery: [
      '/images/architecture/elements/mantelpiece-georgian.jpg',
      '/images/architecture/elements/mantelpiece-victorian.jpg',
      '/images/architecture/elements/mantelpiece-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/mantelpiece-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'A mantelpiece is the decorative frame that goes around a fireplace. It usually has a shelf on top where people put pictures, candles, and other decorations. The mantel makes the fireplace look beautiful and gives you a special place to display your favorite things.',
    MIDDLE_SCHOOL: 'The mantelpiece is the decorative surround that frames a fireplace opening, typically including a horizontal shelf supported by vertical elements. Made from wood, stone, or marble, mantels serve both practical purposes (displaying objects, preventing sparks) and aesthetic functions (providing architectural focus to a room).',
    HIGH_SCHOOL: 'Mantelpieces combine architectural ornamentation with functional design, framing the fireplace opening while providing display space. Components include the mantelshelf (horizontal top), frieze (decorative panel below shelf), and legs or jambs (vertical supports). Styles evolved from medieval stone structures through Renaissance classical orders to Victorian eclecticism and modern minimalism.',
    UNDERGRADUATE: 'Mantelpiece design represents a primary vehicle for interior architectural expression, translating larger classical orders and ornamental vocabularies to domestic scale. Construction involves wood carving, stone sculpting, or cast plaster work. Design elements-pilasters, columns, pediments, consoles-follow architectural conventions while adapting to fireplace proportions. Period styles demonstrate evolving taste, from Palladian severity through Adam delicacy to Victorian elaboration.',
    GRADUATE: 'Mantelpiece analysis engages furniture history, decorative arts, and architectural theory. The chimneypiece served as a canvas for demonstrating design sophistication and material wealth, with craftsmen specializing in marble carving, wood turning, and ornamental composition. Pattern books disseminated designs across social classes and geographic regions. Conservation challenges include matching period materials, understanding structural integration, and preserving surface finishes.',
    PHD: 'Scholarly research on mantelpieces encompasses material culture, social history, and design transmission. Investigations examine the economics of mantel production and installation, the role of pattern books in standardizing designs, regional variations in form and ornament, and the relationship between mantel design and room proportion. Contemporary research addresses the heritage value of historic mantels, their role in defining period interiors, and authentication challenges in the antiques market.',
  },

  history: {
    ELEMENTARY: 'Long ago, fireplaces were just stone openings in walls. Then people started decorating them to make their homes prettier. They added carved wood and fancy stone around the fireplace. Rich families had the most beautiful mantels with sculptures and gold decorations. Today, even homes without working fireplaces sometimes have mantels because they look so nice.',
    MIDDLE_SCHOOL: 'Medieval fireplaces had simple stone surrounds. Renaissance Italy developed elaborate architectural mantels incorporating classical columns and pediments. This style spread across Europe, with regional variations emerging. Georgian England standardized proportions through pattern books. Victorian era saw eclectic revival styles. Many historic mantels were salvaged when buildings were demolished, creating an antiques market.',
    HIGH_SCHOOL: 'The mantelpiece evolved from functional necessity to decorative opportunity. Renaissance architects like Serlio published mantel designs based on classical orders. English pattern books (18th-19th centuries) by authors like Batty Langley and Robert Adam democratized sophisticated designs. Industrial production enabled middle-class homes to afford elaborate mantels through cast iron, pressed metal, and composition ornament. The Arts and Crafts movement rejected mass production, returning to handcrafted wood and tile.',
    UNDERGRADUATE: 'Mantelpiece development reflects broader shifts in architectural theory, manufacturing technology, and social aspiration. The application of classical orders to domestic furniture demonstrated architectural literacy. Pattern book publication enabled provincial craftsmen to execute metropolitan designs. Industrial materials-cast iron, pressed brass, ceramic tiles-transformed accessibility. The 20th century oscillated between modernist rejection of ornament and postmodern appreciation of historical reference. Contemporary practice ranges from salvaged antiques to minimalist limestone.',
    GRADUATE: 'Historical analysis of mantelpieces illuminates design transmission, craft practice, and social display. Research addresses the pattern book trade, workshop practices in carving and casting, the secondhand market in architectural salvage, and regional preferences in materials and ornament. Conservation studies examine original finishes, structural attachments, and appropriate restoration techniques. The mantelpiece serves as indicator of room status, building date, and owner\'s cultural aspirations.',
    PHD: 'Mantelpiece scholarship engages multiple disciplines: architectural history (design evolution and pattern dissemination), material science (stone, wood, and composite materials), social history (domestic display and status signaling), and conservation science (authentication, restoration ethics, and structural analysis). Current research examines globalization of mantel designs through colonial trade, the role of mantels in heritage interpretation, and theoretical questions about ornament, domesticity, and memory in interior spaces.',
  },

  characteristics: [
    'Frames fireplace opening architecturally',
    'Provides horizontal shelf for display',
    'Incorporates classical or period ornament',
    'Made from wood, stone, marble, or composite materials',
    'Sized proportionally to fireplace and room',
    'Often features pilasters, columns, or brackets',
    'Central focal point in traditional rooms',
    'Can exist independently of working fireplace',
  ],

  famousExamples: [
    { name: 'Marble Hall Chimneypiece, Kedleston Hall', location: 'Derbyshire, UK', year: '1765', description: 'Robert Adam\'s neoclassical masterpiece with Siena marble and alabaster' },
    { name: 'Drawing Room Mantel, Syon House', location: 'London, UK', year: '1761', description: 'Adam design with green marble and gilded ornament' },
    { name: 'Oak Parlour Mantel, Morris & Co.', location: 'Wightwick Manor, UK', year: '1893', description: 'Arts and Crafts carved oak with copper hood by William Morris' },
    { name: 'State Drawing Room, Versailles', location: 'Versailles, France', year: '1678', description: 'Baroque marble chimneypiece with royal emblems' },
    { name: 'East Room Mantels, White House', location: 'Washington DC, USA', year: '1902', description: 'McKim, Mead & White neoclassical carved wood mantels' },
  ],

  confusionPairs: [
    {
      elementId: 'fireplace',
      reason: 'Terms often used interchangeably',
      distinction: 'The fireplace is the entire fire-containing structure including firebox and chimney; the mantelpiece is specifically the decorative surround and shelf',
    },
    {
      elementId: 'overmantel',
      reason: 'Both relate to fireplace decoration',
      distinction: 'The mantelpiece is the surround and shelf; the overmantel is the decorative mirror or panel above the mantelpiece',
    },
  ],

  searchTags: ['fireplace', 'surround', 'shelf', 'decorative', 'classical', 'ornament', 'interior', 'focal point', 'display'],

  arMetadata: {
    modelPath: '/models/architecture/mantelpiece.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Mantelshelf', position: { x: 0, y: 1.4, z: 0.1 } },
      { label: 'Frieze', position: { x: 0, y: 1.2, z: 0.05 } },
      { label: 'Jamb/Leg', position: { x: -0.6, y: 0.6, z: 0.05 } },
      { label: 'Opening', position: { x: 0, y: 0.5, z: 0.15 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
