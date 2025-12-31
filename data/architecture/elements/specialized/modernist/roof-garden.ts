import type { ArchitecturalElement } from '../../../types';

export const ROOF_GARDEN: ArchitecturalElement = {
  id: 'roof-garden',
  slug: 'roof-garden',
  name: 'Roof Garden',
  alternativeNames: ['Toit-jardin', 'Rooftop Garden', 'Green Roof', 'Roof Terrace'],
  pronunciation: {
    phonetic: 'ROOF GAR-den',
    language: 'English',
  },
  etymology: {
    origin: 'English/French',
    meaning: 'A garden located on a building\'s roof',
    rootWord: 'toit-jardin (French: roof-garden)',
  },
  category: 'GARDEN',
  subcategory: 'modernist_principles',
  periods: ['art-deco', 'international-style', 'brutalism', 'sustainable'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'ASIA', 'MIDDLE_EAST'],

  images: {
    primary: '/images/architecture/elements/roof-garden-primary.jpg',
    gallery: [
      '/images/architecture/elements/roof-garden-savoye.jpg',
      '/images/architecture/elements/roof-garden-unite.jpg',
    ],
    diagram: '/images/architecture/diagrams/roof-garden.svg',
  },

  description: {
    ELEMENTARY: 'A roof garden is a garden built on top of a building! Instead of just having a regular roof, you have grass, trees, and plants up there. It\'s like having a park in the sky where people can walk around, relax, and enjoy nature even though they\'re on a building.',
    MIDDLE_SCHOOL: 'A roof garden is a landscaped outdoor space on top of a building, made possible by flat roofs and waterproofing technology. One of Le Corbusier\'s Five Points of Architecture, roof gardens transform unused roof space into gardens, terraces, or recreational areas. They provide environmental benefits (cooling, stormwater management) while returning to nature the ground area occupied by the building.',
    HIGH_SCHOOL: 'The modernist roof garden emerged from the functional possibilities of reinforced concrete flat roofs, which could support soil and vegetation unlike traditional pitched roofs. Le Corbusier theorized that roof gardens compensated for the land a building occupied, providing outdoor space for residents while offering insulation, water retention, and psychological benefits. The concept reflected Modernist ideals of rational design, health, and connection to nature within urban environments.',
    UNDERGRADUATE: 'Roof gardens represent both a technical achievement and a philosophical statement in Modern architecture. Reinforced concrete slab construction enables flat roofs capable of supporting substantial loads (soil, water, people). Waterproofing technologies (asphalt, membranes) protect the structure. Beyond functional benefits (thermal mass, stormwater management, urban heat island mitigation), roof gardens embody Modernist principles of maximizing site usage, providing healthful recreation, and integrating architecture with landscape. Applications range from accessible terraces to extensive green roof systems.',
    GRADUATE: 'The roof garden concept intersects technology, environmental design, and architectural theory. Technical requirements include: structural capacity for saturated soil loads, multi-layer waterproofing systems, drainage management, and plant selection for rooftop microclimates. Le Corbusier\'s advocacy positioned roof gardens as both practical (building protection, cooling) and ideological (returning nature to urban dwellers). Contemporary applications encompass intensive gardens (accessible, park-like) and extensive systems (ecological, often inaccessible). Research addresses thermal performance, biodiversity, social benefits, and integration with renewable energy systems. The concept bridges Modernist functionality with contemporary sustainability concerns.',
    PHD: 'Scholarly analysis of roof gardens requires interdisciplinary engagement with architectural history, landscape architecture, building science, and urban ecology. Historical research traces precedents (Hanging Gardens of Babylon, Roman roof gardens) and modern development (Rockefeller Center gardens, Derry & Toms). Le Corbusier\'s theorization must be examined in context of garden city movements and early environmental thinking. Critical questions include: What are actual vs. perceived environmental benefits? How do roof gardens affect building performance? What social and psychological impacts result from elevated green space? Contemporary research addresses: biodiversity potential, food production possibilities, stormwater management capacity, and integration with building management systems. The roof garden has evolved from Modernist principle to sustainability imperative.',
  },

  history: {
    ELEMENTARY: 'While people have put gardens on roofs for thousands of years, modern roof gardens became popular in the 1920s-30s when Le Corbusier included them as one of his important architectural ideas. His Villa Savoye (1929) has a famous roof garden where you can walk among plants while standing on top of the house.',
    MIDDLE_SCHOOL: 'Though ancient civilizations created roof gardens (Hanging Gardens of Babylon), the modern roof garden concept emerged in the 1920s with reinforced concrete flat roofs. Le Corbusier\'s Five Points (1927) included the "toit-jardin," demonstrated in Villa Savoye (1929) and Unité d\'Habitation (1952). The concept spread through International Style architecture, appeared in Art Deco buildings (Rockefeller Center), and resurged with environmental movements in the 1970s-2000s.',
    HIGH_SCHOOL: 'Modern roof garden development paralleled flat roof construction technology. Early examples include Berlin\'s Derry & Toms department store (1933) and Frank Lloyd Wright\'s Fallingwater terraces (1935). Le Corbusier\'s advocacy through his Five Points (1927) and built projects (Villa Savoye, Unité d\'Habitation) established roof gardens as a Modernist principle. Post-war applications included Moshe Safdie\'s Habitat 67 (1967). The sustainability movement renewed interest, with projects like California Academy of Sciences (2008) featuring extensive green roofs.',
    UNDERGRADUATE: 'Roof garden history encompasses ancient precedents (Mesopotamian ziggurat gardens, Roman roof plantings), technological prerequisites (concrete slabs, waterproofing), and modern theorization. Key projects include: Frank Lloyd Wright\'s Midway Gardens (1914), Le Corbusier\'s Villa Church (1927) and Villa Savoye (1929-31), Rockefeller Center (1933-39), and Unité d\'Habitation (1947-52). The 1960s-70s saw environmental advocacy from landscape architects like Ian McHarg. Germany pioneered green roof technology (1970s-80s). Contemporary examples like High Line (2009) and Bosco Verticale (2014) demonstrate diverse approaches from elevated parks to vegetated facades.',
    GRADUATE: 'The historiography of roof gardens must address technological development (waterproofing membranes, root barriers, drainage systems), architectural theory (Le Corbusier\'s Five Points, environmental design), and urban planning (green infrastructure strategies). Critical analysis reveals tensions between aesthetic intentions (accessible gardens) and environmental performance (extensive systems). Post-war examples demonstrate diverse approaches: Brutalist terraces (Barbican), commercial installations (Rockefeller Center), experimental projects (Metabolism). Contemporary scholarship examines: thermal and hydrological performance, biodiversity potential, economic costs/benefits, and policy mechanisms (incentives, requirements). The concept has evolved from modernist principle to sustainability tool while maintaining design significance.',
    PHD: 'Academic research on roof gardens encompasses multiple disciplines: architectural history (tracing concept evolution), building science (performance analysis), landscape architecture (design methods), ecology (habitat creation), and urban planning (green infrastructure). Key research questions: How effective are roof gardens for various environmental goals? What design approaches best balance multiple objectives? How do roof gardens affect property values and social behavior? What policy frameworks best promote adoption? Contemporary research areas include: biodiversity enhancement strategies, food production potential, integration with solar panels, climate adaptation benefits, and social equity in green roof access. The field continues evolving with developments in materials (lightweight soils, modular systems), monitoring technologies, and computational design tools.',
  },

  characteristics: [
    'Landscaped outdoor space on building roof',
    'Flat reinforced concrete roof structure',
    'Waterproofing and drainage systems',
    'Soil and vegetation varying from sedums to trees',
    'May be accessible (intensive) or inaccessible (extensive)',
    'Environmental benefits: cooling, stormwater retention, habitat',
  ],

  famousExamples: [
    { name: 'Villa Savoye', location: 'Poissy, France', year: '1929-1931', description: 'Le Corbusier\'s iconic roof garden as part of Five Points demonstration' },
    { name: 'Unité d\'Habitation', location: 'Marseille, France', year: '1947-1952', description: 'Le Corbusier\'s rooftop with sculptural elements, running track, and nursery' },
    { name: 'Rockefeller Center', location: 'New York City, USA', year: '1933-1939', description: 'Famous Art Deco roof gardens above the city' },
    { name: 'California Academy of Sciences', location: 'San Francisco, USA', year: '2008', description: 'Renzo Piano\'s 2.5-acre living roof with native plants' },
    { name: 'ACROS Fukuoka Prefectural Hall', location: 'Fukuoka, Japan', year: '1995', description: 'Emilio Ambasz\'s stepped roof garden integrating building with park' },
  ],

  confusionPairs: [
    {
      elementId: 'green-roof',
      reason: 'Terms often used interchangeably',
      distinction: 'Roof gardens are typically intensive (accessible, park-like); green roofs often refer to extensive systems (low-maintenance, ecological)',
    },
  ],

  searchTags: ['roof garden', 'green roof', 'corbusier', 'toit-jardin', 'modern', 'sustainable', 'landscape', 'rooftop', 'five points', 'flat roof'],

  arMetadata: {
    modelPath: '/models/architecture/roof-garden.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Planted Area', position: { x: 0, y: 0.95, z: 0 } },
      { label: 'Paved Terrace', position: { x: 0.3, y: 0.95, z: 0.3 } },
      { label: 'Drainage System', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Waterproof Membrane', position: { x: 0, y: 0.88, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
