import type { ArchitecturalElement } from '../../../types';

export const BUSH_HAMMERED_CONCRETE: ArchitecturalElement = {
  id: 'bush-hammered-concrete',
  slug: 'bush-hammered-concrete',
  name: 'Bush-Hammered Concrete',
  alternativeNames: ['Hammered Concrete', 'Tooled Concrete', 'Textured Concrete Finish'],
  pronunciation: {
    phonetic: 'BUSH-ham-erd kon-KREET',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Concrete surface roughened with a bush hammer tool - a hammer with pyramidal or pointed teeth',
    rootWord: 'Bush hammer (stoneworking tool)',
  },
  category: 'FACADE',
  subcategory: 'concrete_finish',
  periods: ['brutalism'],
  regions: ['EUROPE', 'NORTH_AMERICA', 'ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/bush-hammered-primary.jpg',
    gallery: [
      '/images/architecture/elements/bush-hammered-close.jpg',
      '/images/architecture/elements/bush-hammered-barbican.jpg',
      '/images/architecture/elements/bush-hammered-texture.jpg',
    ],
    diagram: '/images/architecture/diagrams/bush-hammered.svg',
  },

  description: {
    ELEMENTARY: 'Bush-hammered concrete is when workers hit hardened concrete with a special hammer that has lots of little points on it. This chips away the surface and makes it rough and bumpy. It feels and looks like rough sandpaper. Architects used this to make concrete buildings more interesting to touch and see.',
    MIDDLE_SCHOOL: 'Bush-hammering is a finishing technique where a special hammer with multiple pointed or pyramidal teeth strikes the concrete surface after it has hardened. This chips away the smooth outer layer, exposing the aggregate (stones) within and creating a uniformly rough, pitted texture. Brutalist architects used this to add visual interest and hide weathering stains.',
    HIGH_SCHOOL: 'Bush-hammered concrete involves mechanically striking cured concrete with a pneumatic or manual bush hammer, creating a controlled roughened surface by fracturing and removing the cement paste to expose aggregate. This technique, adapted from traditional stone finishing, became popular in Brutalist architecture (1960s-80s) to achieve textural variation, reduce glare, minimize visible weathering, and provide a tactile, human-scaled surface on massive buildings.',
    UNDERGRADUATE: 'Bush-hammering represents a post-casting treatment that modifies concrete\'s surface characteristics through controlled mechanical fracture. The technique uses hammers with 9-25 pyramidal points striking at 1,800-3,600 blows per minute, removing 3-6mm of surface material to expose aggregate particles. Brutalist architects employed bush-hammering to: 1) differentiate facade zones, 2) reduce maintenance visibility, 3) create haptic engagement, and 4) reference traditional masonry craftsmanship. The Barbican Estate exemplifies strategic bush-hammering at pedestrian levels.',
    GRADUATE: 'Bush-hammered concrete emerges from a complex interplay of technical, aesthetic, and phenomenological considerations in mid-century modernism. The technique\'s specification requires careful coordination between mix design (aggregate size/type), curing schedules, and finishing operations. Critical analysis reveals tensions between industrial production methods and artisanal surface finishing. The process creates differential weathering characteristics compared to smooth concrete, with environmental performance implications for water absorption and cleaning.',
    PHD: 'Scholarly examination of bush-hammered concrete must address multiple dimensions: material science (fracture mechanics, surface porosity), craft practice (skilled labor in ostensibly industrial construction), aesthetic theory (texture and scale), and conservation methodology. Research questions include: How did bush-hammering practices vary regionally? What role did labor costs play in its deployment? How does weathering differ from smooth béton brut? Contemporary restoration debates center on whether to replicate original texture or accept patina and loss.',
  },

  history: {
    ELEMENTARY: 'In the 1960s, architects building large concrete buildings wanted to make them less boring and gray. They remembered how stoneworkers used special hammers to make rough stone surfaces. So they started using the same technique on concrete! The Barbican in London is a famous example where they hammered the concrete to make it bumpy.',
    MIDDLE_SCHOOL: 'Bush-hammering adapted traditional stone-finishing techniques to concrete in the 1960s. As Brutalist buildings faced criticism for appearing harsh, architects used bush-hammering to add warmth and texture, especially at ground level where people could touch the walls. The Barbican Estate (1965-76) extensively used bush-hammering, as did many university buildings and housing projects of the era.',
    HIGH_SCHOOL: 'The bush-hammering technique transferred from stone masonry to concrete finishing during the height of Brutalism (1960s-70s). While béton brut showed formwork marks, bush-hammering provided active post-casting control over texture. British architects particularly favored this technique for housing estates, believing it reduced visual staining and provided tactile warmth. Boston City Hall (1968) contrasts smooth and bush-hammered zones to articulate the building\'s hierarchy.',
    UNDERGRADUATE: 'Bush-hammering\'s application to concrete emerged as Brutalist architects sought to mitigate the style\'s perceived coldness. Technical developments in pneumatic tools made the process economically feasible at architectural scale. Key projects include the Barbican Estate (systematic application), Yale Art and Architecture Building (1963, textural experiments), and Habitat 67 (selective deployment). By 1975, maintenance costs and changing aesthetics led to decline, though revival interest emerged in 2000s conservation work.',
    GRADUATE: 'The historiography of bush-hammered concrete intersects with debates about craft versus industry in modern architecture. While ostensibly mechanized, the technique required skilled operators and quality control uncommon in speculative construction. Regional variations appear significant: British applications emphasized uniformity; American work often showed more expressive variation. Archival research reveals specification challenges-architects struggled to communicate desired texture through drawings, requiring extensive mockups.',
    PHD: 'Critical scholarship on bush-hammered concrete addresses several themes: the persistence of craft in industrial building, the phenomenology of architectural texture, and the unintended consequences of surface modification. Recent material science research demonstrates that bush-hammering increases surface area and porosity, altering weathering patterns and potentially accelerating deterioration. Conservation theory grapples with losses: should worn bush-hammered surfaces be re-treated, patched, or accepted as evolved material? Oral histories with skilled workers provide crucial insights into actual construction practices.',
  },

  characteristics: [
    'Uniformly roughened surface texture',
    'Exposed aggregate particles visible',
    'Pitted, crater-like surface pattern',
    'Typically 3-6mm material removal depth',
    'Matte finish with reduced glare',
    'Tactile, grainy texture',
  ],

  famousExamples: [
    { name: 'Barbican Estate', location: 'London, UK', year: '1965-1976', description: 'Extensive use of bush-hammered concrete at pedestrian levels' },
    { name: 'Boston City Hall', location: 'Boston, USA', year: '1968', description: 'Contrasting smooth and textured concrete zones' },
    { name: 'Habitat 67', location: 'Montreal, Canada', year: '1967', description: 'Textured concrete surfaces on modular units' },
    { name: 'Economist Building', location: 'London, UK', year: '1964', description: 'Alison and Peter Smithson\'s refined concrete textures' },
    { name: 'University of East Anglia', location: 'Norwich, UK', year: '1962-1968', description: 'Denys Lasdun\'s ziggurat with varied concrete finishes' },
  ],

  confusionPairs: [
    {
      elementId: 'beton-brut',
      reason: 'Both are textured concrete surfaces',
      distinction: 'Béton brut shows formwork marks from casting; bush-hammered is mechanically roughened after curing',
    },
    {
      elementId: 'exposed-aggregate',
      reason: 'Both expose aggregate in concrete',
      distinction: 'Bush-hammering chips the surface mechanically; exposed-aggregate removes cement chemically before full cure',
    },
  ],

  searchTags: ['concrete', 'brutalist', 'texture', 'roughened', 'aggregate', 'finish', 'tactile', 'hammered'],

  arMetadata: {
    modelPath: '/models/architecture/bush-hammered-concrete.glb',
    scale: 2.0,
    rotatable: true,
    annotations: [
      { label: 'Roughened Surface', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Exposed Aggregate', position: { x: 0.15, y: 0.3, z: 0.1 } },
      { label: 'Crater Pattern', position: { x: -0.15, y: 0.7, z: 0.1 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
