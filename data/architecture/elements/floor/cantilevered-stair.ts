import type { ArchitecturalElement } from '../../types';

export const CANTILEVERED_STAIR: ArchitecturalElement = {
  id: 'cantilevered-stair',
  slug: 'cantilevered-stair',
  name: 'Cantilevered Stair',
  alternativeNames: ['Floating Stair', 'Suspended Stair', 'Wall-Mounted Stair', 'Bracket Stair'],
  pronunciation: {
    phonetic: 'KAN-tih-lee-verd STAIR',
    language: 'English',
  },
  etymology: {
    origin: 'English/Latin',
    meaning: 'Stairs projecting from a wall without visible support below',
    rootWord: 'Cantilever from Latin "cantus" (edge) + "levare" (to raise)',
  },
  category: 'FLOOR',
  subcategory: 'circulation',
  periods: ['MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/cantilevered-stair-primary.jpg',
    gallery: [
      '/images/architecture/elements/cantilevered-stair-detail.jpg',
      '/images/architecture/elements/cantilevered-stair-underside.jpg',
    ],
    diagram: '/images/architecture/diagrams/cantilevered-stair-section.svg',
  },

  description: {
    ELEMENTARY: 'A cantilevered stair is a staircase that looks like it\'s floating! The steps stick out from the wall with no support underneath them. It seems like magic, but the steps are actually held very strongly inside the wall. These stairs look super modern and let you see through them, making rooms feel bigger and lighter.',
    MIDDLE_SCHOOL: 'Cantilevered stairs have treads that extend from a wall or central support without visible brackets or stringers underneath. Each step is anchored into the wall structure or spine, creating a floating appearance. The design requires strong structural connections and is typically made of concrete, steel, or heavy timber. These stairs became popular in modern architecture for their minimal aesthetic and space-saving qualities.',
    HIGH_SCHOOL: 'Cantilevered stair construction involves embedding steel reinforcement or structural brackets deep into a supporting wall or central spine. Treads must resist bending moments and deflection under loading. Material choices include reinforced concrete (monolithic with wall), steel plates with concealed connections, or engineered timber with steel inserts. Design must address tread deflection limits (typically L/360), vibration control, and code requirements for guardrails. The open design creates visual lightness while requiring precise engineering.',
    UNDERGRADUATE: 'Cantilevered stairs represent a structural and aesthetic synthesis where architectural minimalism demands rigorous engineering. Load paths transfer vertical loads and moments through cantilever action into supporting structure. Analysis includes bending stress, shear stress, deflection calculations, and dynamic loading considerations. Wall anchorage systems may use embedded steel channels, post-installed anchors, or cast-in plates. Contemporary practice integrates LED lighting within treads, glass guardrails for transparency, and innovative materials including carbon fiber composites.',
    GRADUATE: 'Design of cantilevered stairs encompasses structural analysis, fabrication methodology, and detailing precision. Critical considerations include cantilever span limitations (typically 1.2-1.8m), anchorage pullout strength, connection fatigue under repeated loading, and acoustic isolation to prevent structure-borne sound. Material innovations include ultra-high-performance concrete for thinner profiles, hybrid steel-timber composites, and glass treads with anti-slip treatments. Building code challenges include guardrail attachment without compromising visual lightness and tread deflection perception by users.',
    PHD: 'Cantilevered stair research addresses structural optimization, human factors, and fabrication innovation. Studies examine finite element modeling of complex load cases, long-term deflection behavior, and vibration serviceability criteria. Contemporary investigations include topology optimization for minimal material treads, development of transparent structural ceramics, and assessment of user comfort perception related to visible deflection. Interdisciplinary research connects structural expression to phenomenological experience of ascent, investigating how apparent structural risk affects spatial perception and movement psychology.',
  },

  history: {
    ELEMENTARY: 'Floating stairs are a modern invention from about 100 years ago. Before then, stairs always had supports underneath. Modern architects wanted to make buildings feel more open and light, so they invented ways to make stairs seem to float in the air. Today, you see them in fancy homes, museums, and modern buildings.',
    MIDDLE_SCHOOL: 'Cantilevered stairs emerged in the early 20th century with modernist architecture\'s emphasis on minimal structure and spatial transparency. Frank Lloyd Wright pioneered dramatic cantilevered stairs in the 1930s. The development of reinforced concrete and structural steel enabled longer cantilevers. Post-war modernism of the 1950s-1960s refined the type. Contemporary digital design and advanced materials have pushed cantilever limits further.',
    HIGH_SCHOOL: 'The cantilevered stair developed alongside modernist architectural philosophy rejecting ornament and celebrating structural honesty. Le Corbusier\'s Five Points of Architecture (1927) influenced spatial openness favoring cantilevered elements. Wright\'s Fallingwater (1935) featured bold cantilevered stairs demonstrating structural daring. Mies van der Rohe refined minimal detailing in the 1950s. Contemporary practice benefits from computer analysis enabling optimization and exotic materials like carbon fiber enabling unprecedented spans.',
    UNDERGRADUATE: 'Historical development of cantilevered stairs reflects technological advancement and shifting aesthetic values. Early examples required massive wall thickness for embedment. Mid-century innovations included precast concrete treads with steel plate connections and all-welded steel spine systems. The 1990s-2000s saw glass balustrades and concealed fixings becoming standard. Contemporary practice employs parametric design for complex geometries, 3D-printed connections, and structural transparency as a design driver rather than technical constraint.',
    GRADUATE: 'Cantilevered stair evolution illustrates the relationship between structural possibility and architectural ideology. Modernist rejection of applied ornament positioned structural expression as aesthetic generator. Analysis of seminal projects reveals iterative refinement of connection details and progressive reduction of visual mass. Regional building code variations significantly impacted development, with European practice achieving greater minimalism than North American equivalents due to different deflection and guardrail requirements. Contemporary scholarship examines the type\'s role in luxury residential markets and its democratization through parametric design tools.',
    PHD: 'Cantilevered stair historiography engages structural engineering history, phenomenology of movement, and cultural studies of domestic space. Research examines the stair\'s symbolic role in modernist spatial narrative, documentation of innovative engineering solutions in pioneering projects, and user experience studies of perceived safety versus actual structural performance. Conservation challenges for mid-century examples include connection corrosion, concrete carbonation, and code-compliance upgrades. Contemporary investigations address the stair as site of technological display in residential architecture and its role in contemporary spatial experience.',
  },

  characteristics: [
    'Treads extend from wall or spine without visible support below',
    'Creates floating appearance and visual lightness',
    'Requires robust structural anchorage into supporting wall',
    'Typical cantilever span 1.2-1.8 meters',
    'Materials: steel, reinforced concrete, or engineered timber',
    'Open risers enhance transparency',
    'Deflection control critical for user confidence',
    'Often combined with glass guardrails for maximum transparency',
  ],

  famousExamples: [
    { name: 'Fallingwater', location: 'Pennsylvania, USA', year: '1935', description: 'Frank Lloyd Wright\'s dramatic stone cantilevered interior stairs' },
    { name: 'Apple Store Fifth Avenue', location: 'New York City, USA', year: '2006', description: 'Iconic glass cube with floating glass and steel stair' },
    { name: 'Farnsworth House', location: 'Illinois, USA', year: '1951', description: 'Mies van der Rohe\'s minimalist steel cantilevered entry stairs' },
    { name: 'MAXXI Museum', location: 'Rome, Italy', year: '2010', description: 'Zaha Hadid\'s sculptural concrete cantilevered stairs' },
    { name: 'Heydar Aliyev Center', location: 'Baku, Azerbaijan', year: '2012', description: 'Zaha Hadid\'s fluid cantilevered stair integrated with building form' },
  ],

  confusionPairs: [
    {
      elementId: 'helical-stair',
      reason: 'Both are dramatic modern stair types',
      distinction: 'Cantilevered stairs project from a wall; helical stairs spiral around a central axis',
    },
    {
      elementId: 'open-riser-stair',
      reason: 'Both have visible space between treads',
      distinction: 'Cantilevered refers to structural support method; open-riser describes absence of vertical riser boards',
    },
  ],

  searchTags: ['floating', 'modern', 'minimal', 'steel', 'concrete', 'structural', 'contemporary', 'transparent', 'cantilever'],

  arMetadata: {
    modelPath: '/models/architecture/cantilevered-stair.glb',
    scale: 0.6,
    rotatable: true,
    annotations: [
      { label: 'Tread', position: { x: 0.3, y: 0.2, z: 0 } },
      { label: 'Wall Anchorage (Hidden)', position: { x: -0.4, y: 0.2, z: 0 } },
      { label: 'Open Below (No Support)', position: { x: 0.2, y: 0, z: 0 } },
      { label: 'Glass Guardrail', position: { x: 0.4, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
