import type { ArchitecturalElement } from '../../../types';

export const CURTAIN_WALL_MODERN: ArchitecturalElement = {
  id: 'curtain-wall-modern',
  slug: 'curtain-wall-modern',
  name: 'Curtain Wall (Modern)',
  alternativeNames: ['Glass Curtain Wall', 'Metal and Glass Facade', 'Non-load-bearing Wall'],
  pronunciation: {
    phonetic: 'KUR-tin WAWL',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'A wall that hangs like a curtain from the structural frame',
    rootWord: 'curtain (from Latin cortina)',
  },
  category: 'FACADE',
  subcategory: 'modernist_systems',
  periods: ['international-style', 'brutalism', 'high-tech', 'sustainable'],
  regions: ['NORTH_AMERICA', 'WESTERN_EUROPE', 'ASIA', 'MIDDLE_EAST'],

  images: {
    primary: '/images/architecture/elements/curtain-wall-primary.jpg',
    gallery: [
      '/images/architecture/elements/curtain-wall-seagram.jpg',
      '/images/architecture/elements/curtain-wall-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/curtain-wall.svg',
  },

  description: {
    ELEMENTARY: 'A curtain wall is when the outside of a building is mostly made of glass and metal, like a giant window! It doesn\'t hold up the building-the frame inside does that. The glass "curtain" just hangs on the outside to keep out weather while letting in lots of light.',
    MIDDLE_SCHOOL: 'A curtain wall is a non-structural, lightweight outer wall system made primarily of glass panels set in metal frames (usually aluminum). Unlike traditional walls that support the building\'s weight, curtain walls simply hang from the structural frame like a curtain. This allows for extensive glazing, creating transparent facades that characterize modern skyscrapers and office buildings.',
    HIGH_SCHOOL: 'Curtain wall systems represent a fundamental innovation of Modern architecture, separating the building\'s structural and enclosure functions. Prefabricated panels of glass and metal are attached to the concrete or steel frame, creating a weatherproof envelope without bearing any structural load. This technology enables floor-to-ceiling glazing, flexible interior layouts, rapid construction, and the transparent aesthetic that defined International Style and contemporary architecture.',
    UNDERGRADUATE: 'Curtain wall technology evolved from the structural frame\'s liberation of the facade from load-bearing requirements. The system consists of mullions (vertical members) and transoms (horizontal members) forming a grid that supports glazing units. Critical innovations include: thermal breaks to reduce heat transfer, gaskets and sealants for weatherproofing, and integration of operable windows and ventilation. The technology enabled new building typologies (glass towers) while creating challenges including thermal performance, maintenance, and the urban heat island effect.',
    GRADUATE: 'The curtain wall embodies Modernism\'s technological optimism and aesthetic of transparency while revealing tensions between appearance and performance. Analysis must address: structural engineering (transfer of loads, wind resistance, seismic movement), material science (thermal expansion, glass technology, aluminum extrusion), and environmental performance (solar gain, thermal bridging, embodied energy). The system\'s global adoption transformed urban skylines but generated critiques regarding energy consumption, lack of climate responsiveness, and the homogenization of architectural expression across cultures.',
    PHD: 'Scholarly examination of curtain walls requires interdisciplinary engagement with architectural history, building science, urbanism, and environmental studies. Key research areas include: the technology\'s development from Chicago School precedents through Mies\'s refinements to contemporary high-performance systems; the aesthetic and ideological implications of transparency and dematerialization; the relationship between corporate capitalism and glass tower proliferation; performance failures and lessons learned; and contemporary innovations addressing sustainability concerns (double-skin facades, integrated photovoltaics, adaptive shading). Critical assessment must balance the system\'s architectural significance with its environmental and social impacts.',
  },

  history: {
    ELEMENTARY: 'The first glass curtain walls appeared on skyscrapers in the 1950s. The Lever House in New York (1952) and the Seagram Building (1958) showed how beautiful these all-glass buildings could be. Now you see glass buildings in cities all around the world!',
    MIDDLE_SCHOOL: 'While early curtain walls appeared in 19th-century buildings like the Crystal Palace, the modern curtain wall developed in the 1950s with buildings like Lever House (1952) and the Seagram Building (1958). These established the glass-and-metal aesthetic of corporate Modernism. Technological advances in aluminum extrusion, glass manufacturing, and sealants made curtain walls the dominant facade system for large buildings worldwide.',
    HIGH_SCHOOL: 'The modern curtain wall evolved from precedents including Paxton\'s Crystal Palace (1851) and the Chicago School\'s wide windows, but achieved canonical form in Mies van der Rohe\'s post-war work. The Lake Shore Drive Apartments (1949-51), Lever House (1952), and Seagram Building (1958) established aesthetic and technical standards. The 1960s-70s saw global proliferation, though energy crises revealed thermal deficiencies. Recent decades brought innovations: structural glazing, double-skin systems, and integration with building management systems.',
    UNDERGRADUATE: 'Curtain wall history encompasses multiple strands: 19th-century glass and iron construction (Crystal Palace, Oriel Chambers), early 20th-century experiments (Hallidie Building, Bauhaus), and post-WWII standardization (Lever House, Inland Steel Building). Mies van der Rohe\'s refinement of the mullion-and-glass aesthetic provided an influential model. The 1970s energy crisis prompted reassessment, leading to tinted glass, reflective coatings, and insulated glazing units. Contemporary developments include parametric design enabling complex geometries (Beijing CCTV) and high-performance systems integrating shading and ventilation.',
    GRADUATE: 'The historiography of curtain walls must address technological innovation, aesthetic theory, and socio-economic context. Key developments include: aluminum availability post-WWII enabling lightweight systems, float glass process (1959) producing large, uniform panels, and silicone sealants replacing mechanical fasteners. The technology became synonymous with corporate architecture, embodying values of transparency, efficiency, and modernity. Critical responses emerged from environmental concerns (thermal performance), cultural critiques (Western hegemony), and preservation challenges (aging 1960s-70s systems). Recent scholarship examines curtain walls through sustainability lenses and computational design possibilities.',
    PHD: 'Academic analysis of curtain walls encompasses architectural history, building technology, urban studies, and cultural criticism. Research questions include: How did curtain wall technology co-evolve with corporate organizational structures and real estate development patterns? What are the environmental costs and benefits across the building lifecycle? How do curtain walls perform in different climatic zones? What cultural meanings attach to transparent architecture in various contexts? Contemporary research addresses: aging infrastructure and retrofit strategies, next-generation materials (aerogel, electrochromic glass, integrated photovoltaics), computational design methods, and the role of curtain walls in achieving carbon-neutral buildings. The technology remains contentious, praised for architectural possibilities while criticized for environmental impacts.',
  },

  characteristics: [
    'Non-load-bearing facade system',
    'Aluminum mullions and transoms creating grid',
    'Extensive glazing (50-100% of facade)',
    'Attached to building\'s structural frame',
    'Prefabricated panels for rapid installation',
    'Provides weather protection and thermal insulation',
  ],

  famousExamples: [
    { name: 'Seagram Building', location: 'New York City, USA', year: '1954-1958', description: 'Mies van der Rohe\'s masterpiece establishing curtain wall aesthetics' },
    { name: 'Lever House', location: 'New York City, USA', year: '1950-1952', description: 'SOM\'s pioneering glass tower with full curtain wall' },
    { name: 'Lake Shore Drive Apartments', location: 'Chicago, USA', year: '1949-1951', description: 'Mies van der Rohe\'s influential glass and steel residential towers' },
    { name: 'Willis Tower (Sears Tower)', location: 'Chicago, USA', year: '1970-1973', description: 'SOM\'s bundled tube supertall with black aluminum curtain wall' },
    { name: 'Apple Park', location: 'Cupertino, California, USA', year: '2011-2017', description: 'Norman Foster\'s curved glass curtain wall forming a complete ring' },
  ],

  confusionPairs: [
    {
      elementId: 'ribbon-window',
      reason: 'Both involve extensive modern glazing',
      distinction: 'Ribbon windows are horizontal bands with solid walls above/below; curtain walls cover entire facades continuously',
    },
    {
      elementId: 'curtain-wall',
      reason: 'Same name but different historical context',
      distinction: 'Medieval curtain walls are thick defensive stone walls; modern curtain walls are lightweight glass and metal facades',
    },
  ],

  searchTags: ['curtain wall', 'glass facade', 'modern', 'skyscraper', 'mies', 'aluminum', 'glazing', 'non-structural', 'international style', 'corporate'],

  arMetadata: {
    modelPath: '/models/architecture/curtain-wall-modern.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Glass Panels', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Vertical Mullions', position: { x: 0.2, y: 0.5, z: 0.05 } },
      { label: 'Horizontal Transoms', position: { x: 0, y: 0.3, z: 0.05 } },
      { label: 'Structural Frame (behind)', position: { x: 0, y: 0.5, z: -0.2 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
