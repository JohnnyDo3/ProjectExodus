import type { ArchitecturalElement } from '../../types';

export const GAZEBO: ArchitecturalElement = {
  id: 'gazebo',
  slug: 'gazebo',
  name: 'Gazebo',
  alternativeNames: ['Garden Pavilion', 'Summerhouse', 'Belvedere'],
  pronunciation: {
    phonetic: 'guh-ZEE-boh',
    language: 'English',
  },
  etymology: {
    origin: 'Possibly English/Latin hybrid',
    meaning: 'Uncertain - possibly "gaze about" or from Latin "gazeboa"',
    rootWord: 'Etymology debated: possibly humorous formation from "gaze" + Latin suffix',
  },
  category: 'GARDEN',
  subcategory: 'garden_structures',
  periods: ['RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'VICTORIAN', 'ARTS_AND_CRAFTS', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/gazebo-primary.jpg',
    gallery: [
      '/images/architecture/elements/gazebo-victorian.jpg',
      '/images/architecture/elements/gazebo-asian.jpg',
    ],
    diagram: '/images/architecture/diagrams/gazebo-construction.svg',
  },

  description: {
    ELEMENTARY: 'A gazebo is a little house in the garden with a roof and open sides! It\'s usually round or has many sides, like an octagon. You can sit inside and look out at the garden while staying dry when it rains. Gazebos are perfect places for tea parties or reading a book outside!',
    MIDDLE_SCHOOL: 'A gazebo is a freestanding, roofed garden structure with open or partially open sides. Most are octagonal or hexagonal, elevated on a platform or foundation. Unlike pergolas, gazebos have solid roofs providing complete weather protection. They serve as garden focal points and outdoor seating areas, often positioned to frame views or terminate garden paths.',
    HIGH_SCHOOL: 'The gazebo is a pavilion structure combining solid roofing with open or screened sides, typically featuring centralized, symmetrical plans-octagonal being most common. Structural elements include corner posts or columns supporting roof rafters radiating from a central point. Gazebos function as garden destinations, viewpoints, and gathering places. Design ranges from rustic wooden structures to elaborate Victorian cast-iron confections.',
    UNDERGRADUATE: 'Gazebo design integrates structural engineering, site planning, and aesthetic tradition. The centralized plan creates 360-degree viewing while the elevated platform establishes prominence. Roof design must address complex geometry-hip rafters converging at a central point. Material selection affects character: wood (traditional), metal (Victorian), composite (contemporary). Site placement considers views, circulation, and relationship to larger garden composition.',
    GRADUATE: 'Gazebo analysis encompasses structural geometry, landscape theory, and cultural history. The octagonal plan presents complex roof framing geometry requiring precise hip and valley rafter calculations. Historical research examines the gazebo\'s role in garden design theory-as terminating feature, viewing platform, and social space. Conservation challenges include structural assessment of aging roof systems and historically appropriate repair of deteriorated ornament.',
    PHD: 'Research into gazebos engages garden history, vernacular architecture, and landscape theory. Scholarly investigation traces the gazebo\'s evolution from classical garden pavilions through romantic picturesque follies to Victorian mass-produced structures. Current research examines regional variations in form and construction, the relationship between gazebos and tea house traditions, and the gazebo\'s role in public park design and social gathering.',
  },

  history: {
    ELEMENTARY: 'Gazebos have been garden favorites for hundreds of years! Rich families built fancy gazebos in their gardens where they could sit and enjoy the view. Victorian times especially loved gazebos with fancy wooden decorations. Today, you can find gazebos in parks, gardens, and backyards all over the world.',
    MIDDLE_SCHOOL: 'Garden pavilions appeared in ancient and medieval gardens, but the gazebo as a specific type emerged in the 17th-18th centuries. English landscape gardens featured gazebos as viewpoints. Victorian era (1837-1901) popularized ornate wooden gazebos with decorative trim. The Arts and Crafts movement offered simpler, more rustic versions. Today gazebos remain popular for residential and public gardens.',
    HIGH_SCHOOL: 'Classical pavilions influenced European gazebo development. English landscape theory positioned gazebos as prospect points within picturesque compositions. Victorian industrialization enabled mass production of decorative millwork, popularizing ornate gazebo designs. Pattern books disseminated designs widely. Asian garden traditions featured analogous pavilion structures (Chinese ting, Japanese azumaya). Contemporary gazebos range from traditional reproductions to modern minimalist interpretations.',
    UNDERGRADUATE: 'Gazebo history reflects changing concepts of garden experience and outdoor leisure. Renaissance pavilions served elite contemplation. Picturesque theory valued gazebos as viewing platforms within carefully composed scenes. Victorian suburbanization brought gazebos to middle-class gardens as symbols of refined domesticity. The gazebo\'s relationship to similar structures across cultures-Turkish kiosks, Chinese pavilions-suggests universal human desire for sheltered outdoor observation.',
    GRADUATE: 'Historical analysis of gazebos examines garden theory, pattern book dissemination, and manufacturing history. Research addresses the influence of William Chambers\' Chinese designs on European gazebos, the industrialization of decorative millwork production, and regional variations in vernacular gazebo construction. Conservation includes structural assessment of aging structures and appropriate restoration of lost ornamental elements while maintaining structural integrity.',
    PHD: 'Gazebo scholarship engages landscape history, architectural pattern books, and cultural geography. Methodologies include analysis of garden treatises (Chambers, Repton), examination of Victorian trade catalogs, and comparative study of pavilion traditions across cultures. Current research investigates the gazebo\'s social function in Victorian courtship, its commodification through mail-order catalogs, and its contemporary revival in planned communities and resorts.',
  },

  characteristics: [
    'Freestanding roofed structure',
    'Typically octagonal or hexagonal plan',
    'Solid roof (unlike pergola)',
    'Open or screened sides',
    'Elevated on platform or foundation',
    'Central plan with 360-degree views',
    'Often positioned as garden focal point',
  ],

  famousExamples: [
    { name: 'Peterhof Palace Gazebos', location: 'St. Petersburg, Russia', year: '1714-1755', description: 'Baroque garden pavilions in imperial gardens' },
    { name: 'Stow Gardens Chinese House', location: 'Buckinghamshire, UK', year: '1738', description: 'Early Chinese-inspired garden gazebo' },
    { name: 'Golden Gate Park Victorian Gazebo', location: 'San Francisco, USA', year: '1890s', description: 'Ornate Victorian cast-iron gazebo' },
    { name: 'Central Park Ladies Pavilion', location: 'New York City, USA', year: '1871', description: 'Cast-iron Victorian gazebo overlooking the lake' },
    { name: 'Singapore Botanic Gardens Bandstand', location: 'Singapore', year: '1930', description: 'Colonial-era octagonal performance gazebo' },
  ],

  confusionPairs: [
    {
      elementId: 'pergola',
      reason: 'Both are freestanding garden structures',
      distinction: 'Gazebos have solid roofs and are typically octagonal; pergolas have open beam roofs and support climbing plants',
    },
    {
      elementId: 'belvedere',
      reason: 'Both are viewing structures',
      distinction: 'Gazebos are ground-level pavilions; belvederes are elevated towers or rooftop structures built specifically for panoramic views',
    },
    {
      elementId: 'folly',
      reason: 'Both appear in ornamental gardens',
      distinction: 'Gazebos are functional garden shelters; follies are purely decorative with no practical purpose',
    },
  ],

  searchTags: ['garden', 'pavilion', 'octagonal', 'Victorian', 'summerhouse', 'shelter', 'outdoor', 'viewing'],

  arMetadata: {
    modelPath: '/models/architecture/gazebo.glb',
    scale: 0.35,
    rotatable: true,
    annotations: [
      { label: 'Central Post/Column', position: { x: 0.5, y: 0, z: 0 } },
      { label: 'Hip Roof', position: { x: 0, y: 2.5, z: 0 } },
      { label: 'Open Railing', position: { x: 0.8, y: 1, z: 0 } },
      { label: 'Platform/Floor', position: { x: 0, y: -0.2, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
