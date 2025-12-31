import type { ArchitecturalElement } from '../../types';

export const INGLENOOK: ArchitecturalElement = {
  id: 'inglenook',
  slug: 'inglenook',
  name: 'Inglenook',
  alternativeNames: ['Chimney corner', 'Ingle-neuk', 'Fireside nook'],
  pronunciation: {
    phonetic: 'ING-guhl-nook',
    language: 'English',
  },
  etymology: {
    origin: 'Scottish/Northern English',
    meaning: 'Fire corner',
    rootWord: 'ingle (Scots Gaelic "aingeal" meaning fire) + nook (corner)',
  },
  category: 'INTERIOR',
  subcategory: 'fireplaces',
  periods: ['MEDIEVAL', 'TUDOR', 'JACOBEAN', 'ARTS_AND_CRAFTS', 'COLONIAL_REVIVAL'],
  regions: ['BRITISH_ISLES', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/inglenook-primary.jpg',
    gallery: [
      '/images/architecture/elements/inglenook-tudor.jpg',
      '/images/architecture/elements/inglenook-arts-crafts.jpg',
      '/images/architecture/elements/inglenook-colonial.jpg',
    ],
    diagram: '/images/architecture/diagrams/inglenook-plan.svg',
  },

  description: {
    ELEMENTARY: 'An inglenook is a cozy little room inside a bigger room, built around a fireplace. It has seats on both sides of the fire where people can sit and stay warm. The seats are often built right into the wall, making a perfect reading spot or place to chat with friends on cold days.',
    MIDDLE_SCHOOL: 'The inglenook is a recessed seating area flanking a large fireplace, typically enclosed by walls or partial walls creating an intimate space within a larger room. Common in medieval halls and revived by Arts and Crafts architects, inglenooks feature built-in benches, often with storage beneath, creating a warm social space focused on the hearth.',
    HIGH_SCHOOL: 'Inglenooks represent an architectural strategy for creating intimate scale within large spaces while maximizing heat retention. The alcove configuration, with benches flanking a substantial fireplace, creates a semi-enclosed microenvironment warmed by radiant heat and protected from drafts. Medieval examples in great halls provided privileged seating; Arts and Crafts revivals emphasized domestic coziness and traditional craft.',
    UNDERGRADUATE: 'Inglenook design addresses thermal comfort, social organization, and architectural character. The recessed alcove with flanking seats creates a thermal pocket where radiant heat from the fireplace is retained by enclosing walls. Spatial analysis reveals hierarchical seating (positions closer to fire indicating higher status) and the inglenook\'s role in defining circulation patterns. Arts and Crafts architects like Voysey and Baillie Scott employed inglenooks to evoke vernacular tradition and create human-scaled spaces within modern plans.',
    GRADUATE: 'Analysis of inglenooks engages building science, social history, and design theory. Thermal performance studies examine radiant heat distribution, convective patterns, and the effectiveness of alcove enclosure. Historical research addresses the inglenook\'s evolution from medieval necessity to Arts and Crafts symbol of domestic authenticity. The revival\'s relationship to anti-industrial sentiment, vernacular revivalism, and Romantic medievalism reveals broader cultural attitudes toward modernity, domesticity, and tradition.',
    PHD: 'Inglenook research encompasses environmental history, cultural geography, and architectural meaning. Investigations include archaeological evidence of medieval seating arrangements, thermal modeling of historical configurations, and ethnographic study of fireplace-centered social practices. The Arts and Crafts revival raises questions about invented traditions, the commodification of coziness, and the role of architectural elements in constructing national identity. Contemporary applications address heritage interpretation, thermal comfort in sustainable design, and the continuing cultural appeal of hearth-centered spaces.',
  },

  history: {
    ELEMENTARY: 'Hundreds of years ago in cold castles and big houses, people built special cozy corners around their fireplaces. These inglenooks had benches where you could sit close to the fire and stay warm. Later, when architects wanted to make houses feel old-fashioned and cozy again, they started building inglenooks in new homes too.',
    MIDDLE_SCHOOL: 'Inglenooks originated in medieval British architecture, particularly in Scotland and Northern England, where large hall fireplaces were flanked by stone benches. Tudor and Jacobean periods featured elaborate wood-paneled inglenooks in manor houses. The feature largely disappeared with changing heating technology but was enthusiastically revived by Arts and Crafts architects (1880s-1920s) as a symbol of domestic warmth and traditional craft.',
    HIGH_SCHOOL: 'The inglenook evolved from practical medieval heating arrangements to symbolic architectural feature. Medieval great halls used massive fireplaces with flanking stone seats for high-status occupants. As heating technology advanced and rooms became smaller, inglenooks disappeared from mainstream architecture. The Arts and Crafts movement, led by architects like Philip Webb, Edwin Lutyens, and C.F.A. Voysey, revived the inglenook as embodiment of vernacular tradition, honest craftsmanship, and domestic coziness, influencing American Colonial Revival and Craftsman styles.',
    UNDERGRADUATE: 'Inglenook history reflects changing relationships between thermal technology, social hierarchy, and architectural meaning. Medieval examples demonstrate spatial organization around heat sources, with proximity to fire indicating status. The Tudor elaboration with oak paneling and carved details transformed functional necessity into status display. The Victorian abandonment of inglenooks (due to central heating and stylistic preference) preceded the Arts and Crafts revival, which reinterpreted the feature as anti-industrial statement and connection to pre-modern domesticity. American adaptation through Craftsman style democratized the feature.',
    GRADUATE: 'Historical analysis of inglenooks illuminates the construction of tradition and the role of architectural elements in cultural discourse. Research addresses the archaeological evidence for medieval forms, pattern book dissemination of revival designs, and the inglenook\'s role in Arts and Crafts ideology. The revival\'s success despite functional obsolescence (in centrally heated homes) reveals the power of architectural symbolism. Studies examine how inglenooks communicated values-authenticity, domesticity, anti-modernism-and how this symbolism transcended national boundaries through publications and architectural tourism.',
    PHD: 'Inglenook scholarship engages invention of tradition theory, environmental history, and cultural studies. Research questions include: How did medieval functional arrangements transform into symbolic features? What role did architectural publications play in standardizing "traditional" forms? How did inglenooks contribute to national identity construction in Britain and cultural aspiration in America? Contemporary investigations examine the persistence of inglenook appeal, heritage designation of Arts and Crafts examples, and the feature\'s relevance to contemporary questions about domestic comfort, sustainability, and connection to architectural history.',
  },

  characteristics: [
    'Recessed alcove flanking fireplace',
    'Built-in seating on both sides of fire',
    'Partial enclosure creating intimate space',
    'Often includes storage beneath benches',
    'Massive fireplace with wide opening',
    'Creates thermal pocket retaining heat',
    'Social focus within larger room',
    'Associated with vernacular and Arts and Crafts design',
  ],

  famousExamples: [
    { name: 'Great Hall Inglenook, Haddon Hall', location: 'Derbyshire, UK', year: '14th century', description: 'Medieval stone inglenook with original benches in Tudor manor' },
    { name: 'Living Hall, Standen', location: 'East Grinstead, UK', year: '1894', description: 'Philip Webb\'s Arts and Crafts masterpiece with brick and tile inglenook' },
    { name: 'Great Parlour, Wightwick Manor', location: 'Wolverhampton, UK', year: '1887', description: 'Edward Ould design with carved oak and William Morris tiles' },
    { name: 'Drawing Room, Tigbourne Court', location: 'Surrey, UK', year: '1899', description: 'Edwin Lutyens inglenook with massive brick fireplace and oak settle' },
    { name: 'Gamble House Living Room', location: 'Pasadena, USA', year: '1908', description: 'Greene & Greene\'s Craftsman interpretation with redwood and clinker brick' },
  ],

  confusionPairs: [
    {
      elementId: 'fireplace',
      reason: 'Both involve hearth spaces',
      distinction: 'A fireplace is the fire-containing structure; an inglenook is the recessed seating alcove built around the fireplace',
    },
    {
      elementId: 'chimney-corner',
      reason: 'Nearly synonymous terms',
      distinction: 'Chimney corner is a more general term for space beside fireplace; inglenook specifically refers to the recessed alcove with built-in seating',
    },
  ],

  searchTags: ['fireplace', 'seating', 'alcove', 'cozy', 'medieval', 'Arts and Crafts', 'vernacular', 'hearth', 'bench'],

  arMetadata: {
    modelPath: '/models/architecture/inglenook.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Fireplace', position: { x: 0, y: 0.8, z: 0.4 } },
      { label: 'Built-in Bench', position: { x: -0.8, y: 0.3, z: 0 } },
      { label: 'Enclosing Wall', position: { x: -1.2, y: 1, z: -0.2 } },
      { label: 'Alcove Ceiling', position: { x: 0, y: 2, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
