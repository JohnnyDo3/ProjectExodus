import type { ArchitecturalElement } from '../../types';

export const PERGOLA: ArchitecturalElement = {
  id: 'pergola',
  slug: 'pergola',
  name: 'Pergola',
  alternativeNames: ['Arbor', 'Trellis Structure', 'Garden Colonnade'],
  pronunciation: {
    phonetic: 'PER-guh-luh',
    language: 'Italian',
  },
  etymology: {
    origin: 'Italian/Latin',
    meaning: 'Projecting roof or vine arbor',
    rootWord: 'From Latin "pergula" (projecting roof)',
  },
  category: 'GARDEN',
  subcategory: 'garden_structures',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'ARTS_AND_CRAFTS', 'MODERN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/pergola-primary.jpg',
    gallery: [
      '/images/architecture/elements/pergola-wisteria.jpg',
      '/images/architecture/elements/pergola-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/pergola-construction.svg',
  },

  description: {
    ELEMENTARY: 'A pergola is like an outdoor room with a roof made of beams and no walls! Vines like grapes or wisteria grow up the posts and across the top, making a shady green ceiling. Pergolas are perfect for walking through gardens or sitting outside on hot days.',
    MIDDLE_SCHOOL: 'A pergola is an outdoor structure with columns or posts supporting an open roof of beams and rafters. Unlike a gazebo, it has no solid roof-just cross-beams that create dappled shade. Climbing plants are often grown over pergolas to create a leafy canopy. They define pathways or outdoor living spaces.',
    HIGH_SCHOOL: 'The pergola is an open garden structure consisting of columns or posts supporting a framework of beams and cross-rafters. The open lattice roof provides partial shade while supporting climbing plants. Pergolas function as transitional elements between building and landscape, framing views and defining outdoor rooms. They can be freestanding or attached to buildings.',
    UNDERGRADUATE: 'Pergola design integrates structural clarity, horticultural support, and spatial definition. Post spacing typically relates to comfortable walking rhythm (6-10 feet). Beam dimensions must support plant weight at maturity. Material selection-wood (traditional), metal, composite-affects durability and aesthetic character. The pergola\'s role as threshold between architecture and nature engages questions of indoor-outdoor relationships.',
    GRADUATE: 'Pergola analysis encompasses structural engineering, landscape architecture, and environmental performance. Loading includes self-weight, plant mass, and potential snow loads. Environmental benefits include microclimate modification through evapotranspiration and shade. Contemporary research examines the pergola\'s role in bioclimatic design, comparing performance with and without plant coverage and evaluating species selection for optimal cooling.',
    PHD: 'Research into pergolas engages garden history, environmental science, and bioclimatic design. Historical investigation examines the pergola\'s development from Roman precedents through Renaissance garden theory to Arts and Crafts integration of architecture and landscape. Current research quantifies environmental benefits-temperature reduction, air quality improvement-and develops guidelines for plant-architecture integration.',
  },

  history: {
    ELEMENTARY: 'Ancient Romans grew grapes on pergolas to have shade and fresh fruit! Italian Renaissance gardens had beautiful pergolas for walking. In the early 1900s, famous architects like Greene and Greene designed gorgeous wooden pergolas for California houses.',
    MIDDLE_SCHOOL: 'Romans built pergolas for grape cultivation and garden shade. Renaissance Italian villas featured elaborate pergolas connecting garden rooms. The Arts and Crafts movement (1880s-1920s) embraced pergolas as romantic connections between house and garden. Today pergolas range from simple home projects to designer outdoor living structures.',
    HIGH_SCHOOL: 'Roman villas incorporated pergolas for viticulture and recreational shade. Renaissance garden design theorized the pergola as a connecting element-Alberti discussed its proper proportions. The Picturesque movement romanticized pergolas as rustic features. Arts and Crafts architects (Greene and Greene, Lutyens) integrated pergolas into residential design. Contemporary pergolas serve both traditional and modernist aesthetics.',
    UNDERGRADUATE: 'Pergola history reveals changing concepts of the relationship between architecture and nature. Roman functional pergolas supported productive vines. Renaissance theorization established the pergola as an architectural element requiring proportional study. The English Picturesque tradition valued pergolas for their romantic associations. Arts and Crafts integration emphasized material honesty and craft. Modernist examples (Neutra, Schindler) abstracted the type.',
    GRADUATE: 'Historical analysis of pergolas examines garden theory, construction practice, and cultural meaning. Research addresses Renaissance proportional systems (Alberti, Serlio), the transmission of pergola design through pattern books, and regional variations in materials and forms. Conservation challenges include structural assessment of historic pergolas and compatible repair of deteriorated members while maintaining plant coverage.',
    PHD: 'Pergola scholarship engages multiple disciplines: art history (garden theory and iconography), horticulture (plant-structure relationships), and environmental science (microclimate effects). Current research examines the pergola\'s contribution to urban heat island mitigation, the comparative performance of traditional and engineered materials, and the revival of productive pergolas (grapes, kiwis) in edible landscape design.',
  },

  characteristics: [
    'Columns or posts supporting open roof',
    'Cross-beam and rafter structure',
    'Open lattice provides partial shade',
    'Supports climbing plants',
    'Defines outdoor rooms or pathways',
    'Freestanding or building-attached',
    'Various materials: wood, metal, composite',
  ],

  famousExamples: [
    { name: 'Gamble House Pergolas', location: 'Pasadena, USA', year: '1909', description: 'Greene and Greene\'s Arts and Crafts masterpiece' },
    { name: 'Villa Lante Gardens', location: 'Bagnaia, Italy', year: '1566', description: 'Renaissance garden with historic pergola walks' },
    { name: 'Hestercombe Gardens', location: 'Somerset, UK', year: '1906', description: 'Lutyens and Jekyll collaboration with pergola' },
    { name: 'Getty Villa', location: 'Malibu, USA', year: '1974', description: 'Roman-style pergola in recreated villa garden' },
    { name: 'High Line', location: 'New York City, USA', year: '2009-2014', description: 'Contemporary steel pergola sections along park' },
  ],

  confusionPairs: [
    {
      elementId: 'arbor',
      reason: 'Both are garden structures for plants',
      distinction: 'Pergolas are larger walkway structures; arbors are smaller, often framing gates or benches',
    },
    {
      elementId: 'gazebo',
      reason: 'Both are freestanding garden structures',
      distinction: 'Pergolas have open beam roofs; gazebos have solid roofs and are typically octagonal',
    },
  ],

  searchTags: ['garden', 'outdoor', 'vines', 'shade', 'trellis', 'arbor', 'landscape', 'patio', 'beams'],

  arMetadata: {
    modelPath: '/models/architecture/pergola.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Column/Post', position: { x: 0.5, y: 0, z: 0.5 } },
      { label: 'Main Beam', position: { x: 0, y: 2, z: 0 } },
      { label: 'Cross Rafters', position: { x: 0, y: 2.2, z: 0.3 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
