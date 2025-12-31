import type { ArchitecturalElement } from '../../../types';

export const BETON_BRUT: ArchitecturalElement = {
  id: 'beton-brut',
  slug: 'beton-brut',
  name: 'Béton Brut',
  alternativeNames: ['Raw Concrete', 'Board-Marked Concrete', 'Unfinished Concrete'],
  pronunciation: {
    phonetic: 'bay-TOHN BROO',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Raw concrete - béton (concrete) + brut (raw/unfinished)',
    rootWord: 'béton brut',
  },
  category: 'FACADE',
  subcategory: 'concrete_finish',
  periods: ['brutalism'],
  regions: ['EUROPE', 'NORTH_AMERICA', 'ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/beton-brut-primary.jpg',
    gallery: [
      '/images/architecture/elements/beton-brut-barbican.jpg',
      '/images/architecture/elements/beton-brut-texture.jpg',
      '/images/architecture/elements/beton-brut-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/beton-brut.svg',
  },

  description: {
    ELEMENTARY: 'Béton brut is concrete that looks rough and unfinished on purpose! Instead of painting or covering it up, architects leave it just as it came out of the mold. You can see the marks from the wooden boards used to shape it. It\'s like showing the "bones" of a building.',
    MIDDLE_SCHOOL: 'Béton brut means "raw concrete" in French. It\'s concrete left exposed without any paint, plaster, or other covering. The surface shows impressions from the wooden forms (boards) used during construction, creating a textured, honest appearance. This became the signature look of Brutalist architecture in the 1950s-1970s.',
    HIGH_SCHOOL: 'Béton brut is raw, unfinished concrete left intentionally exposed as both structure and finish. The term, popularized by Le Corbusier in the 1950s, celebrates the honesty of materials by revealing construction marks, formwork patterns, and the inherent texture of poured concrete. This aesthetic choice rejected traditional decorative finishes in favor of expressing structural truth.',
    UNDERGRADUATE: 'Béton brut represents a philosophical approach to materiality in mid-20th century architecture. Pioneered by Le Corbusier at Unité d\'Habitation (1952), this technique involves casting concrete against rough timber formwork, then leaving it exposed without finishing treatments. The resulting surface displays board marks, pour lines, and aggregate texture, creating what Le Corbusier termed "noble rawness." This aesthetic influenced global Brutalist practice from 1955-1980.',
    GRADUATE: 'Béton brut emerged from post-war material scarcity and modernist ideology promoting structural honesty. The technique requires careful formwork design, concrete mix specification, and craftsmanship to achieve aesthetic quality despite appearing "unfinished." Critical analysis reveals tensions between the rhetoric of material truth and the highly controlled processes required. The weathering characteristics of exposed concrete-staining, efflorescence, spalling-have generated significant conservation challenges.',
    PHD: 'The béton brut aesthetic constitutes a complex intersection of material practice, architectural theory, and cultural meaning. Scholarly discourse must address Le Corbusier\'s theoretical writings (particularly "New Brutalism"), the influence of Japanese concrete work, labor practices in formwork construction, and the sociopolitical contexts of post-war reconstruction. Recent conservation theory grapples with whether weathering and staining represent authentic patina or degradation requiring intervention.',
  },

  history: {
    ELEMENTARY: 'In the 1950s, a famous architect named Le Corbusier built an apartment building in France where he left the concrete walls rough and unfinished. People were surprised at first, but it started a new style! Soon buildings all over the world were showing their concrete surfaces.',
    MIDDLE_SCHOOL: 'Le Corbusier pioneered béton brut at his Unité d\'Habitation in Marseille (1952), coining the term. This marked a shift from smooth, finished modernism to expressive, textured surfaces. The style spread internationally during the 1960s-70s as governments built public housing, universities, and civic buildings using exposed concrete to convey strength and honesty.',
    HIGH_SCHOOL: 'Béton brut emerged in post-war Europe when material shortages made expensive finishes impractical. Le Corbusier\'s Unité d\'Habitation (1952) demonstrated that raw concrete could be aesthetically powerful, not merely economical. British architects Alison and Peter Smithson popularized the term "Brutalism" (from béton brut) in 1954. The technique became standard for institutional architecture through the 1970s.',
    UNDERGRADUATE: 'The béton brut aesthetic developed through several influences: Le Corbusier\'s late work (1950s), Japanese concrete craftsmanship, and European reconstruction contexts. Key monuments include Chandigarh government buildings (1952-65), Park Hill housing Sheffield (1961), and Boston City Hall (1968). The technique required skilled formwork carpentry to control joint patterns and surface texture. By 1975, public reaction against concrete\'s weathering led to its decline.',
    GRADUATE: 'Béton brut\'s historiography involves multiple narratives: technological (concrete technology and formwork systems), aesthetic (texture and expression), ideological (honesty and anti-decoration), and social (mass housing and institutional authority). Critical scholarship examines the gap between architects\' rhetoric of democratic accessibility and public perception of harshness. Recent work explores regional variations: softer British approaches versus monumental Eastern European applications.',
    PHD: 'Scholarly analysis of béton brut encompasses material science, conservation ethics, social housing critique, and architectural phenomenology. Key research questions include: How did Japanese taishakei formwork influence Western practice? What role did skilled labor play in achieving "raw" effects? How has weathering transformed the aesthetic and cultural meaning of these surfaces? Contemporary conservation debates center on whether to preserve weathered patina or restore original appearance through cleaning and repair.',
  },

  characteristics: [
    'Exposed concrete left without paint or finish',
    'Visible wood grain impressions from formwork',
    'Pour lines and construction joints revealed',
    'Aggregate and texture variation shown',
    'Weathering and staining over time',
    'Honest expression of structural material',
  ],

  famousExamples: [
    { name: 'Unité d\'Habitation', location: 'Marseille, France', year: '1952', description: 'Le Corbusier\'s prototype for béton brut housing' },
    { name: 'Barbican Estate', location: 'London, UK', year: '1965-1976', description: 'Massive residential complex in board-marked concrete' },
    { name: 'Boston City Hall', location: 'Boston, USA', year: '1968', description: 'Monumental civic building with expressive concrete' },
    { name: 'Habitat 67', location: 'Montreal, Canada', year: '1967', description: 'Modular housing showcasing concrete texture' },
    { name: 'National Theatre', location: 'London, UK', year: '1976', description: 'Denys Lasdun\'s terraced concrete cultural center' },
  ],

  confusionPairs: [
    {
      elementId: 'bush-hammered-concrete',
      reason: 'Both are textured concrete finishes',
      distinction: 'Béton brut shows formwork impressions; bush-hammered is mechanically roughened after casting',
    },
    {
      elementId: 'precast-concrete',
      reason: 'Both are concrete building techniques',
      distinction: 'Béton brut is cast in place with texture; precast is factory-made and often smooth',
    },
  ],

  searchTags: ['concrete', 'brutalist', 'raw', 'unfinished', 'texture', 'formwork', 'le-corbusier', 'modernism'],

  arMetadata: {
    modelPath: '/models/architecture/beton-brut.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Board Marks', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Pour Line', position: { x: 0.2, y: 0.7, z: 0.1 } },
      { label: 'Aggregate Texture', position: { x: -0.2, y: 0.3, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
