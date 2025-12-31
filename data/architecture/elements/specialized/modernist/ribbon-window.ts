import type { ArchitecturalElement } from '../../../types';

export const RIBBON_WINDOW: ArchitecturalElement = {
  id: 'ribbon-window',
  slug: 'ribbon-window',
  name: 'Ribbon Window',
  alternativeNames: ['Horizontal Window', 'Band Window', 'Fenêtre en longueur'],
  pronunciation: {
    phonetic: 'RIB-un WIN-doh',
    language: 'English',
  },
  etymology: {
    origin: 'English/French',
    meaning: 'Continuous horizontal band of windows like a ribbon',
    rootWord: 'fenêtre en longueur (French: window in length)',
  },
  category: 'WINDOW',
  subcategory: 'modernist_principles',
  periods: ['international-style', 'art-deco', 'brutalism'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'SOUTH_AMERICA', 'ASIA'],

  images: {
    primary: '/images/architecture/elements/ribbon-window-primary.jpg',
    gallery: [
      '/images/architecture/elements/ribbon-window-savoye.jpg',
      '/images/architecture/elements/ribbon-window-bauhaus.jpg',
    ],
    diagram: '/images/architecture/diagrams/ribbon-window.svg',
  },

  description: {
    ELEMENTARY: 'A ribbon window is a long, skinny window that stretches across a building like a ribbon! Instead of having separate windows with walls between them, it\'s one continuous window going from one side to the other. This lets in lots of light and gives great views.',
    MIDDLE_SCHOOL: 'Ribbon windows are continuous horizontal bands of windows that run along the facade of a building, uninterrupted by vertical structural elements. Made possible by modern structural frames that freed walls from load-bearing duties, ribbon windows became one of Le Corbusier\'s Five Points of Architecture, providing maximum natural light and panoramic views.',
    HIGH_SCHOOL: 'The ribbon window emerged as a direct consequence of reinforced concrete and steel frame construction, which transferred structural loads to internal columns rather than exterior walls. This liberation allowed architects to create continuous horizontal fenestration, fundamentally changing the relationship between interior and exterior, maximizing daylight, and creating a distinctive Modernist aesthetic that emphasized horizontal movement and transparency.',
    UNDERGRADUATE: 'Ribbon windows represent both a technical achievement and a formal principle of Modern architecture. The structural frame (concrete or steel) carries vertical loads, allowing the facade to become a non-load-bearing curtain. This enables continuous glazing systems that blur interior/exterior boundaries, provide uniform daylighting, and express the building\'s structural honesty. The horizontal emphasis counters traditional vertical proportions, creating dynamic visual effects and new spatial experiences.',
    GRADUATE: 'The ribbon window embodies multiple dimensions of Modernist theory: structural rationalism (expressing the frame), functionalism (optimal lighting), and formal innovation (new aesthetic language). Analysis must consider technical prerequisites (structural systems, glass technology), phenomenological effects (altered perception of enclosure, connection to landscape), and ideological implications (transparency as democracy, rejection of historical ornament). Regional variations reveal how this supposedly universal element adapted to different climatic and cultural contexts.',
    PHD: 'Critical examination of ribbon windows must address their position within the genealogy of glass architecture (Crystal Palace, Werkbund exhibition), their codification in Modernist theory (Le Corbusier, Gropius, Mies), and their diverse implementations and critiques. Scholarly debates encompass: the relationship between technological possibility and formal preference, thermal performance issues in various climates, the tension between transparency and privacy, and the window\'s role in establishing Modernism\'s visual language. Post-war critiques raised concerns about energy consumption and the homogenization of regional architectural expression.',
  },

  history: {
    ELEMENTARY: 'Ribbon windows became popular in the 1920s and 1930s when architects discovered that new building methods meant walls didn\'t have to hold up the building anymore. The Bauhaus school in Germany and Le Corbusier in France made buildings with beautiful long windows that became famous.',
    MIDDLE_SCHOOL: 'Ribbon windows developed in the 1920s as architects exploited new structural capabilities. Early examples include Walter Gropius\'s Bauhaus Dessau (1925-26) and Le Corbusier\'s Villa Savoye (1929). The technique spread globally through the International Style, appearing in factories, schools, offices, and houses. The horizontal emphasis contrasted dramatically with traditional vertical windows and became synonymous with modern architecture.',
    HIGH_SCHOOL: 'The ribbon window emerged from 1920s European avant-garde architecture, particularly the Bauhaus and Le Corbusier\'s work. The Bauhaus Dessau (1925-26) demonstrated continuous glazing in an educational building, while Villa Savoye (1929-31) showed its application to residential architecture. Post-WWII, the technique became standard in International Style corporate architecture (Lever House, 1952; Seagram Building, 1958) and modernist housing worldwide.',
    UNDERGRADUATE: 'Ribbon windows evolved from 19th-century precedents (Paxton\'s Crystal Palace, Chicago School\'s wide windows) but achieved theoretical definition in 1920s Modernism. Gropius\'s Fagus Factory (1911-13) and Bauhaus Dessau pioneered industrial applications, while Le Corbusier theorized the "fenêtre en longueur" as one of his Five Points (1927). Post-war developments included fully glazed curtain walls (extending the ribbon window to its logical conclusion) and regional adaptations using brise-soleil or other sun-shading devices in tropical climates.',
    GRADUATE: 'The historiography of ribbon windows encompasses technological history (Hennebique concrete, steel frames, float glass), formal analysis (horizontal vs. vertical emphasis, transparency effects), and theoretical interpretation (Modernist manifestos, functionalist ideology). Key monuments reveal diverse approaches: the industrial clarity of Gropius, the compositional sophistication of Le Corbusier, the absolute transparency of Mies. Post-war critiques emerged from multiple directions: energy crisis concerns, phenomenological emphasis on enclosure and protection, and postmodern rejection of Modernist universalism.',
    PHD: 'Scholarly analysis of ribbon windows requires interdisciplinary approaches encompassing architectural history, building technology, visual culture, and environmental design. Critical questions include: How did ribbon windows participate in constructing Modernism\'s utopian vision? What were the thermal and acoustic performances compared to traditional fenestration? How did different cultures and climates adapt or resist this element? Contemporary scholarship examines ribbon windows through lenses of sustainability (thermal bridging, solar gain), heritage conservation (deteriorating metal frames), and architectural theory (transparency, surface, boundary). The element\'s persistence in contemporary architecture suggests continued relevance despite known limitations.',
  },

  characteristics: [
    'Continuous horizontal band of glazing',
    'Minimal vertical interruptions',
    'Enabled by structural frame construction',
    'Maximizes natural light and views',
    'Emphasizes horizontal movement',
    'Non-load-bearing facade element',
  ],

  famousExamples: [
    { name: 'Bauhaus Dessau', location: 'Dessau, Germany', year: '1925-1926', description: 'Walter Gropius\'s iconic school with extensive ribbon glazing' },
    { name: 'Villa Savoye', location: 'Poissy, France', year: '1929-1931', description: 'Le Corbusier\'s demonstration of the fenêtre en longueur principle' },
    { name: 'Tugendhat House', location: 'Brno, Czech Republic', year: '1928-1930', description: 'Mies van der Rohe\'s masterpiece with floor-to-ceiling ribbon windows' },
    { name: 'Johnson Wax Building', location: 'Racine, Wisconsin, USA', year: '1936-1939', description: 'Frank Lloyd Wright\'s office building with distinctive Pyrex tube ribbon windows' },
    { name: 'Paimio Sanatorium', location: 'Paimio, Finland', year: '1929-1933', description: 'Alvar Aalto\'s tuberculosis sanatorium maximizing sunlight with ribbon windows' },
  ],

  confusionPairs: [
    {
      elementId: 'curtain-wall-modern',
      reason: 'Both involve extensive glazing in Modern buildings',
      distinction: 'Ribbon windows are horizontal bands with solid wall above/below; curtain walls cover the entire facade continuously',
    },
    {
      elementId: 'clerestory',
      reason: 'Both are horizontal window bands',
      distinction: 'Clerestory windows are high windows near the ceiling for light; ribbon windows run at any height emphasizing horizontal continuity',
    },
  ],

  searchTags: ['ribbon window', 'horizontal window', 'modern', 'corbusier', 'bauhaus', 'glass', 'five points', 'international style', 'continuous glazing'],

  arMetadata: {
    modelPath: '/models/architecture/ribbon-window.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Continuous Horizontal Glazing', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Solid Wall Above', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Solid Wall Below', position: { x: 0, y: 0.2, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
