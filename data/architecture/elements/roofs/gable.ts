import type { ArchitecturalElement } from '../../types';

export const GABLE: ArchitecturalElement = {
  id: 'gable',
  slug: 'gable',
  name: 'Gable',
  alternativeNames: ['Gable End', 'Gable Wall', 'Pediment (when classical)'],
  pronunciation: {
    phonetic: 'GAY-bul',
    language: 'Old Norse',
  },
  etymology: {
    origin: 'Old Norse',
    meaning: 'Triangular wall section',
    rootWord: 'gafl (gable end)',
  },
  category: 'ROOF',
  subcategory: 'roof_forms',
  periods: ['classical-greek', 'medieval', 'gothic', 'renaissance', 'colonial-american', 'vernacular'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/gable-primary.jpg',
    gallery: [
      '/images/architecture/elements/gable-dutch.jpg',
      '/images/architecture/elements/gable-stepped.jpg',
      '/images/architecture/elements/gable-classical.jpg',
    ],
    diagram: '/images/architecture/diagrams/gable-types.svg',
  },

  description: {
    ELEMENTARY: 'A gable is the triangular wall you see at the end of a house with a pointy roof! It looks like a triangle sitting on top of a rectangle. Many houses have gables at both ends of the roof.',
    MIDDLE_SCHOOL: 'A gable is the triangular upper portion of a wall at the end of a ridged roof, formed by the sloping roof lines meeting at a peak. Gable roofs are one of the most common roof types, shedding water and snow efficiently while providing attic space.',
    HIGH_SCHOOL: 'The gable represents the triangular wall section formed between the sloping edges of a dual-pitched roof. Gable forms vary significantly-simple triangular gables, Dutch gables with curved sides, stepped (crow-stepped) gables common in Northern Europe, and classical pediments which are formalized gable treatments. The gable\'s shape and decoration often define regional architectural character, from steeply pitched Northern European gables designed to shed snow to lower-pitched Mediterranean versions.',
    UNDERGRADUATE: 'The gable constitutes a fundamental architectural element resulting from pitched roof construction, with significant typological variation across cultures and periods. Classical architecture formalized the gable as the pediment, with specific proportional relationships and ornamental programs. Northern European traditions developed distinctive gable treatments including stepped gables, Dutch gables with scrolled sides, and elaborate Hanseatic gables with decorative brickwork. The gable\'s angle reflects climate (steep for snow regions, lower for milder climates) while its treatment articulates architectural style and regional identity.',
    GRADUATE: 'The gable embodies fundamental relationships between climate, structure, and aesthetics in architectural design. Analysis reveals how gable forms encode climatic responses-Northern European steep gables shedding snow and rain, while also providing fire breaks between adjacent buildings in dense urban contexts. Stylistic development shows evolution from functional necessity through decorative elaboration, with Dutch and Flemish Renaissance gables becoming vehicles for urban display. The gable\'s geometric simplicity made it adaptable across socioeconomic levels, from vernacular cottages to monumental churches, with scale and decoration marking hierarchical distinctions.',
    PHD: 'The gable represents a rich field for architectural research spanning structural analysis, climatic determinism, stylistic evolution, and cultural geography. Scholarly work examines how gable forms reveal technological capabilities (timber framing systems, roof trusses), respond to environmental factors (pitch angles, overhang dimensions), and express cultural identity (regional gable typologies as markers of ethnic settlement patterns). Contemporary debates address the gable\'s role in architectural regionalism versus internationalism, with traditional gable forms persisting in vernacular contexts while modernist architecture often rejected pitched roofs entirely, creating ongoing tensions in suburban development and heritage conservation.',
  },

  history: {
    ELEMENTARY: 'People have been building gable roofs for thousands of years because they work so well! The Greeks used fancy triangular gables called pediments on their temples. Settlers in America often built houses with simple gable roofs.',
    MIDDLE_SCHOOL: 'Ancient Greeks formalized the gable as the pediment, the triangular section within temple roof ends. Medieval European builders developed varied gable types suited to different climates and building methods. Dutch traders spread distinctive curved gables to their colonial holdings. American colonial architecture adapted gable roof forms from European traditions.',
    HIGH_SCHOOL: 'The gable\'s history parallels roofing technology development. Greek temples featured low-pitched gables (pediments) with specific proportional relationships codified in classical theory. Medieval European architecture developed steeper gables suited to timber framing and northern climates, with regional variations including stepped gables in the Netherlands and Germany, jetties and half-timbering in England, and elaborately decorated Renaissance gables. Colonial American architecture simplified European gable forms, creating distinctive regional types like the saltbox and Cape Cod house.',
    UNDERGRADUATE: 'Gable development reveals complex interactions between structural systems, climate, materials, and aesthetic traditions. Classical pediments served both structural (protecting timber roof elements) and symbolic (housing sculptural programs) functions. Northern European gable evolution traces from simple medieval forms through late Gothic elaboration to Renaissance decorative exuberance, with Amsterdam and Lübeck developing characteristic urban gable streetscapes. The gable\'s transmission to colonial contexts shows both direct transplantation (Dutch gables in New York) and creative adaptation (Caribbean gable-end ventilation strategies). The modern movement\'s rejection of pitched roofs temporarily suppressed gable construction, though postmodern and contemporary vernacular design revived traditional gable forms.',
    GRADUATE: 'The gable\'s history encompasses multiple analytical frameworks: technological (evolution of roof framing systems enabling different pitches and spans), environmental (pitch angles optimized for local precipitation and snow loads), economic (cost implications of different gable treatments), and symbolic (gable decoration signaling status and identity). Regional schools developed distinctive gable languages-Hanseatic stepped gables, Dutch curved gables, English tumbled brickwork-each with specific construction techniques and ornamental vocabularies. The gable\'s decline during high modernism and subsequent revival reveals shifting attitudes toward tradition, regional identity, and environmental appropriateness in architectural culture.',
    PHD: 'Scholarly engagement with gable history addresses vernacular architecture theory, examining how gable forms transmit across cultures while adapting to local conditions. Research employs multiple methodologies: archaeological analysis revealing construction sequences, dendrochronology dating timber framing, climate modeling testing performance hypotheses, and cultural geography mapping gable type distributions. Recent work challenges technological determinism, showing how gable forms persist as cultural markers even when environmental conditions change. Studies of colonial gable transmission examine power dynamics in architectural transfer, while conservation research develops appropriate interventions for historic gable structures facing climate change impacts.',
  },

  characteristics: [
    'Triangular wall section at roof end',
    'Formed by sloping roof lines meeting at ridge',
    'Pitch varies by climate and style',
    'May be simple or elaborately decorated',
    'Common types: simple, Dutch, stepped, Flemish',
    'Provides attic ventilation and space',
  ],

  famousExamples: [
    { name: 'Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'Classical pediment gables with sculpture' },
    { name: 'Amsterdam Canal Houses', location: 'Amsterdam, Netherlands', year: '16th-17th century', description: 'Distinctive Dutch stepped and curved gables' },
    { name: 'Canterbury Cathedral', location: 'Canterbury, England', year: '1070-1834', description: 'Gothic gable ends on transepts' },
    { name: 'Paul Revere House', location: 'Boston, Massachusetts', year: '1680', description: 'Colonial American gable roof' },
    { name: 'Lübeck Town Houses', location: 'Lübeck, Germany', year: 'Medieval-Renaissance', description: 'Hanseatic stepped brick gables' },
  ],

  confusionPairs: [
    {
      elementId: 'pediment',
      reason: 'Both are triangular end sections',
      distinction: 'Pediment is the classical formalized gable with cornice moldings; gable is the general triangular wall form',
    },
    {
      elementId: 'hip-roof',
      reason: 'Both are pitched roof types',
      distinction: 'Gable roof has vertical triangular ends; hip roof slopes on all four sides with no vertical walls',
    },
  ],

  searchTags: ['roof', 'triangular', 'pitched', 'end wall', 'pediment', 'dutch', 'stepped', 'vernacular', 'colonial', 'house'],

  arMetadata: {
    modelPath: '/models/architecture/gable.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Ridge Line', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Gable Triangle', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Roof Slope', position: { x: 0.3, y: 0.8, z: 0 } },
      { label: 'Eaves', position: { x: 0.4, y: 0.4, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
