import type { ArchitecturalElement } from '../../types';

export const HIP_ROOF: ArchitecturalElement = {
  id: 'hip-roof',
  slug: 'hip-roof',
  name: 'Hip Roof',
  alternativeNames: ['Hipped Roof', 'Pavilion Roof (when pyramidal)', 'Four-Sided Roof'],
  pronunciation: {
    phonetic: 'HIP roof',
    language: 'English',
  },
  etymology: {
    origin: 'Middle English',
    meaning: 'Roof with sloped ends (hip = sloping)',
    rootWord: 'hippe (covering)',
  },
  category: 'ROOF',
  subcategory: 'roof_forms',
  periods: ['roman', 'renaissance', 'baroque', 'colonial-american', 'victorian', 'modern'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/hip-roof-primary.jpg',
    gallery: [
      '/images/architecture/elements/hip-roof-pyramidal.jpg',
      '/images/architecture/elements/hip-roof-compound.jpg',
    ],
    diagram: '/images/architecture/diagrams/hip-roof-structure.svg',
  },

  description: {
    ELEMENTARY: 'A hip roof slopes down on all four sides instead of having flat triangular ends like a gable roof. It looks like a tent sitting on top of a house, with all the sides slanting down!',
    MIDDLE_SCHOOL: 'A hip roof has slopes on all four sides that meet at a ridge at the top. The four sloped sides create a more enclosed, streamlined appearance compared to a gable roof. Hip roofs are very stable in high winds and work well in areas with hurricanes or strong storms.',
    HIGH_SCHOOL: 'The hip roof is characterized by sloped surfaces on all sides, with two triangular faces (the hipped ends) and two trapezoidal faces meeting at a central ridge. Hip roofs provide superior wind resistance compared to gable roofs due to their aerodynamic profile and self-bracing geometry. Variations include pyramidal (or pavilion) hip roofs where four triangular surfaces meet at a point, half-hipped roofs combining elements of both systems, and complex hip roofs with multiple intersecting planes.',
    UNDERGRADUATE: 'The hip roof represents an alternative structural and aesthetic solution to the gable roof, trading the simplicity of gable construction for enhanced structural stability and weather resistance. The hip roof\'s geometry creates a more complex framing system requiring hip rafters that bisect the roof corners and carry loads from jack rafters on each side. This complexity is offset by superior performance in extreme weather-the enclosed form provides better wind resistance while eliminating vulnerable gable ends. Hip roofs became standard for many building types from Roman villas through colonial plantation houses to modern ranch homes.',
    GRADUATE: 'The hip roof embodies a sophisticated structural solution balancing complexity against performance benefits. Structural analysis reveals the hip roof\'s self-bracing characteristics-the four sloped planes create inherent stability against lateral forces, explaining the form\'s prevalence in hurricane-prone regions. The geometry presents specific construction challenges including compound-angle hip rafter cuts and careful valley framing at intersections. Historically, hip roofs signaled substantial construction-the added complexity indicated resources for skilled carpentry. Regional preferences emerged, with British colonial architecture favoring hip roofs while German and Dutch traditions preferred gables, patterns that influenced global colonial architecture.',
    PHD: 'The hip roof constitutes a significant case study in the relationship between structural performance, construction complexity, and cultural preferences in vernacular architecture. Research employing wind tunnel testing and computational fluid dynamics demonstrates measurably superior wind resistance compared to gable forms, validating traditional practices in hurricane zones. Historical carpentry manuals reveal evolving framing techniques addressing the geometric complexity of hip construction, from empirical methods using roofing squares to contemporary engineering calculations. Cultural geography studies map hip versus gable roof distributions, revealing correlations with colonial origins, climate patterns, and building traditions. Contemporary research addresses hip roof applications in sustainable design, including optimal angles for solar panel integration and daylighting strategies.',
  },

  history: {
    ELEMENTARY: 'Romans used hip roofs on their buildings over 2,000 years ago. Later, European colonists built hip roofs in America, especially in areas with lots of storms because hip roofs handle strong winds better!',
    MIDDLE_SCHOOL: 'Hip roofs appeared in Roman architecture and remained common through medieval and Renaissance periods. British colonial architecture used hip roofs extensively in warm climates and coastal areas. In America, hip roofs became standard for Georgian and Federal style buildings, plantation houses in the South, and later for foursquare and American Craftsman homes.',
    HIGH_SCHOOL: 'Hip roof development shows steady use from Roman architecture through medieval European building, with particular prevalence in Mediterranean climates. The form became characteristic of British colonial architecture in India, Africa, and the Americas, where it proved effective in tropical storms and monsoons. American Georgian and Federal architecture adopted hip roofs as markers of sophistication. The Industrial Revolution enabled more complex hip roof framing through standardized lumber dimensions and improved fasteners, while pattern books disseminated construction details widely.',
    UNDERGRADUATE: 'The hip roof\'s history reveals how structural performance and cultural preferences interact. Roman villas employed hip roofs, with Vitruvius discussing their construction. Medieval European architecture used hip roofs selectively, often reserving them for towers and prominent buildings due to construction complexity. British imperial architecture standardized hip roofs for tropical climates, creating distinctive bungalow typologies combining hip roofs with deep verandas. American architectural development shows hip roof prevalence in formal architectural styles (Georgian, Federal) while vernacular traditions often preferred simpler gable construction. The 20th century saw hip roofs in Prairie School, Craftsman, and Ranch house styles.',
    GRADUATE: 'Hip roof history encompasses technological, environmental, and cultural dimensions. Archaeological and documentary evidence reveals Roman hip roof construction using timber framing techniques transmitted through medieval carpenter guilds. Colonial architecture shows sophisticated environmental reasoning-hip roofs reducing wind loads in storm-prone regions while providing shaded attic spaces in hot climates. The form\'s association with formal architecture created social distinctions, with hip roofs signaling higher-status construction. Twentieth-century developments included manufactured roof trusses simplifying hip construction, though at the cost of usable attic space. Contemporary hip roof design addresses energy performance through optimized ventilation and solar orientation.',
    PHD: 'Scholarly analysis of hip roof history employs multiple frameworks: structural archaeology revealing construction techniques, environmental history examining climate adaptations, social history analyzing hip roofs as status markers, and building science assessing performance claims. Research challenges simplistic environmental determinism, showing cultural preferences often override pure performance logic. Studies of colonial hip roof transmission examine knowledge transfer through pattern books and immigrant craftsmen. Recent work applies building information modeling to historic hip roof structures, revealing sophisticated geometric solutions predating formal trigonometry. Conservation research addresses appropriate repair techniques for historic hip roof structures, balancing historical authenticity with contemporary performance requirements.',
  },

  characteristics: [
    'All sides slope downward',
    'No vertical gable ends',
    'Superior wind resistance',
    'Complex framing with hip rafters',
    'Pyramidal form when square plan',
    'Variations: simple, pyramid, half-hip, cross-hip',
  ],

  famousExamples: [
    { name: 'Monticello', location: 'Charlottesville, Virginia', year: '1772-1809', description: 'Jefferson\'s home with complex hip roof' },
    { name: 'Drayton Hall', location: 'Charleston, South Carolina', year: '1738-1742', description: 'Georgian plantation house with hip roof' },
    { name: 'Robie House', location: 'Chicago, Illinois', year: '1910', description: 'Frank Lloyd Wright Prairie style with low hip roofs' },
    { name: 'Tropical Colonial Bungalows', location: 'India/Southeast Asia', year: '19th century', description: 'British colonial hip roof typology' },
    { name: 'American Foursquare Houses', location: 'USA', year: '1895-1930', description: 'Middle-class homes with pyramidal hip roofs' },
  ],

  confusionPairs: [
    {
      elementId: 'gable',
      reason: 'Both are common pitched roof types',
      distinction: 'Gable has vertical triangular ends; hip roof slopes on all sides with no vertical walls',
    },
    {
      elementId: 'mansard',
      reason: 'Both have slopes on all sides',
      distinction: 'Mansard has two slopes on each side (double-pitched); hip roof has single slope on each side',
    },
  ],

  searchTags: ['roof', 'four-sided', 'sloped', 'pyramidal', 'hipped', 'wind-resistant', 'colonial', 'pavilion', 'structure'],

  arMetadata: {
    modelPath: '/models/architecture/hip-roof.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Ridge', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Hip Rafter', position: { x: 0.4, y: 0.7, z: 0.4 } },
      { label: 'Sloped Face', position: { x: 0.3, y: 0.6, z: 0 } },
      { label: 'Eaves', position: { x: 0.5, y: 0.3, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
