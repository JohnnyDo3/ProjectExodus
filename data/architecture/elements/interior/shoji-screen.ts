import type { ArchitecturalElement } from '../../types';

export const SHOJI_SCREEN: ArchitecturalElement = {
  id: 'shoji-screen',
  slug: 'shoji-screen',
  name: 'Shoji Screen',
  alternativeNames: ['Shoji', 'Paper screen', 'Japanese sliding door'],
  pronunciation: {
    phonetic: 'SHOW-jee',
    language: 'Japanese',
  },
  etymology: {
    origin: 'Japanese',
    meaning: 'Barrier or screen',
    rootWord: '障子 (shōji) meaning "screen" or "barrier"',
  },
  category: 'INTERIOR',
  subcategory: 'partitions',
  periods: ['HEIAN', 'MUROMACHI', 'EDO', 'MEIJI', 'MODERN_JAPANESE', 'CONTEMPORARY'],
  regions: ['JAPAN', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/shoji-primary.jpg',
    gallery: [
      '/images/architecture/elements/shoji-traditional.jpg',
      '/images/architecture/elements/shoji-pattern.jpg',
      '/images/architecture/elements/shoji-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/shoji-construction.svg',
  },

  description: {
    ELEMENTARY: 'A shoji screen is a Japanese sliding door or room divider made from a wooden frame with white paper stretched over it. The paper lets soft light come through but you can\'t see through it clearly, giving people privacy. You can slide the screens open to make one big room or close them to make separate small rooms.',
    MIDDLE_SCHOOL: 'Shoji are traditional Japanese sliding doors or movable walls consisting of a wooden lattice framework covered with translucent washi paper. Unlike solid walls, shoji filter natural light while providing privacy, creating soft, diffused illumination. They slide on wooden tracks, allowing flexible space division-rooms can be opened into larger areas or subdivided as needed. This adaptability reflects Japanese architectural philosophy emphasizing flexibility and connection to nature.',
    HIGH_SCHOOL: 'Shoji screens represent fundamental principles of Japanese architecture: flexibility, lightness, and refined simplicity. Construction involves precise joinery creating a grid of wooden muntins (usually cypress or cedar) over which handmade washi paper is adhered. The translucent paper transforms harsh sunlight into gentle, even illumination while maintaining visual privacy. Tracks (kamoi and shikii) at top and bottom enable smooth sliding operation. Shoji work in conjunction with fusuma (opaque sliding panels) to create fluid, reconfigurable interior spaces, reflecting concepts of ma (negative space) and the relationship between interior and exterior.',
    UNDERGRADUATE: 'Shoji design integrates material properties, craft techniques, and spatial philosophy. The wooden framework requires precise joinery-traditionally mortise-and-tenon without nails-creating a resilient structure that accommodates seasonal wood movement. Washi paper, made from mulberry bark fibers, possesses strength, translucency, and ability to absorb moisture, moderating interior humidity. The grid pattern (kumiko) varies by region and period, from simple rectangles to complex geometric compositions. Shoji\'s role in creating flexible space enables the same footprint to serve multiple functions-sleeping, dining, reception-reflecting limited urban space and aesthetic preference for simplicity. Contemporary applications range from traditional construction to modern interpretations using alternative materials.',
    GRADUATE: 'Analysis of shoji encompasses material science, craft tradition, and architectural theory. Research addresses the technology of washi papermaking and its properties (light transmission, hygroscopic behavior, durability), the joinery techniques enabling precise yet flexible frameworks, and the relationship between shoji design and spatial organization. The sliding panel system creates architectural experiences unavailable in rigid-wall buildings: continuous spatial flow, adjustable privacy, and changing light conditions. Conservation challenges include paper replacement (traditional vs. synthetic), framework restoration, and adaptation to contemporary building systems (insulation, air-tightness). The global influence of shoji on modernist architecture (particularly through Japanese-inspired minimalism) demonstrates the power of its aesthetic and functional principles.',
    PHD: 'Shoji scholarship engages architecture history, material culture, and design philosophy. Research areas include: technical analysis of traditional construction methods and their contemporary adaptations, documentation of regional variations in kumiko patterns, examination of washi production and its decline, and theoretical investigation of shoji\'s role in Japanese spatial concepts. The relationship between shoji and Japanese aesthetics-wabi-sabi, ma, kanso (simplicity)-reveals deeper cultural values. Contemporary research addresses conservation of historic shoji, development of durable modern materials maintaining traditional appearance, and the influence of shoji principles on sustainable architecture (natural lighting, adaptable spaces, renewable materials). Cross-cultural studies examine how shoji concepts have been adapted in non-Japanese contexts.',
  },

  history: {
    ELEMENTARY: 'Japanese people invented shoji screens hundreds of years ago when they wanted lighter, more flexible walls than heavy wood or stone. They made delicate wooden frames and covered them with special strong paper made from tree bark. Shoji helped bring soft, beautiful light into dark rooms and could be moved to make rooms bigger or smaller depending on what people needed to do.',
    MIDDLE_SCHOOL: 'Shoji developed during the Heian period (794-1185) as Japanese architecture evolved toward lighter, more flexible structures. Early versions were simpler; Muromachi period (1336-1573) saw refinement of joinery and paper application techniques. Edo period (1603-1868) established regional patterns and standardized proportions. Traditional Japanese homes used shoji in combination with fusuma and tatami mats to create modular, adaptable spaces. Western influence during Meiji era introduced glass panes. Modern and contemporary architects have reinterpreted shoji principles using new materials.',
    HIGH_SCHOOL: 'The shoji screen\'s evolution reflects Japanese architectural philosophy and craft development. Heian-period aristocratic architecture introduced sliding panels as lighter alternatives to solid walls, enabled by advances in papermaking. Zen Buddhist influence during Muromachi period emphasized simplicity and natural materials, refining shoji design toward elegant restraint. Edo-period craft specialization produced regional variations in kumiko patterns and paper types. The introduction of glass (garasu shoji) during Meiji modernization allowed light without sacrificing insulation. 20th-century architects like Taniguchi and Ando adapted shoji principles to contemporary materials while maintaining spatial philosophy. Global influence began with Frank Lloyd Wright and continues through minimalist design.',
    UNDERGRADUATE: 'Shoji history illuminates the relationship between material innovation, craft technique, and spatial theory. The development of strong, translucent washi enabled the lightweight architecture that characterizes Japanese building. Joinery refinement created frameworks that maintain precision while allowing seasonal wood movement. The modular design system (based on ken, a measurement unit) enabled prefabrication and standardization centuries before Western industrialization. The philosophical dimension-flexibility, impermanence, connection between inside and outside-reflects Buddhist influence and climatic response (earthquakes, typhoons). Conservation challenges include maintaining traditional craft skills as practitioners age, sourcing quality materials (specific woods, handmade washi), and adapting traditional construction to contemporary building codes.',
    GRADUATE: 'Historical analysis of shoji addresses craft technology, spatial theory, and cultural meaning. Research examines the evolution of papermaking techniques and their regional variations, the development of joinery methods specific to shoji construction, and the standardization of proportional systems. The relationship between shoji and other architectural elements (fusuma, ranma, tokonoma) reveals comprehensive design thinking. Documentation of historic examples enables understanding of original construction and material properties. The global dissemination of shoji influence-through publications, exhibitions, and architect travel-shaped international modernism. Contemporary research addresses the sustainability of traditional materials and methods, the economics of craft preservation, and adaptation strategies for different climates and building systems.',
    PHD: 'Shoji scholarship encompasses multiple disciplines: architectural history (development and dissemination), material science (washi and wood properties), craft studies (joinery and paper application techniques), and philosophy (spatial concepts and aesthetic theory). Research questions include: How did material properties shape architectural forms? What role did pattern books play in standardizing regional variations? How do shoji contribute to architectural experience and spatial perception? Technical investigations address traditional construction methods, conservation approaches, and development of contemporary alternatives maintaining aesthetic qualities. Theoretical work examines shoji\'s influence on modernist architecture, their role in Japanese cultural identity, and their relevance to contemporary sustainability concerns (natural lighting, adaptive reuse, renewable materials).',
  },

  characteristics: [
    'Wooden lattice framework with paper covering',
    'Translucent, filtering light while providing privacy',
    'Slides on tracks for flexible space division',
    'Lightweight, easily removable panels',
    'Grid patterns (kumiko) vary by region and style',
    'Made with traditional joinery (no nails)',
    'Typically uses washi paper and cypress or cedar wood',
    'Creates soft, diffused interior lighting',
  ],

  famousExamples: [
    { name: 'Katsura Imperial Villa Shoin', location: 'Kyoto, Japan', year: '1615-1662', description: 'Exemplary traditional shoji in refined sukiya-style architecture' },
    { name: 'Ryoan-ji Temple Hojo', location: 'Kyoto, Japan', year: '1499 (rebuilt 1797)', description: 'Zen temple featuring classic shoji overlooking famous rock garden' },
    { name: 'Yoshijima Heritage House', location: 'Takayama, Japan', year: '1907', description: 'Merchant house with intact traditional shoji and architectural elements' },
    { name: 'Benesse House Museum', location: 'Naoshima, Japan', year: '1992', description: 'Tadao Ando\'s contemporary interpretation of shoji principles' },
    { name: 'Portland Japanese Garden Pavilion', location: 'Portland, USA', year: '2017', description: 'Kengo Kuma\'s modern design incorporating traditional shoji elements' },
  ],

  confusionPairs: [
    {
      elementId: 'fusuma',
      reason: 'Both are Japanese sliding panels',
      distinction: 'Shoji are translucent with paper over wooden lattice; fusuma are opaque with paper or fabric over solid panels, used between interior rooms',
    },
    {
      elementId: 'sudare',
      reason: 'Both are traditional Japanese screens',
      distinction: 'Shoji are paper-covered sliding panels; sudare are bamboo or reed blinds that roll up, used for exterior sun shading',
    },
  ],

  searchTags: ['Japanese', 'sliding door', 'paper', 'translucent', 'partition', 'flexible space', 'traditional', 'washi', 'minimalist'],

  arMetadata: {
    modelPath: '/models/architecture/shoji-screen.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Wooden Frame', position: { x: -0.4, y: 1, z: 0.02 } },
      { label: 'Washi Paper', position: { x: 0, y: 1, z: 0 } },
      { label: 'Kumiko Grid', position: { x: 0.3, y: 0.6, z: 0.01 } },
      { label: 'Track', position: { x: 0, y: 0, z: 0.05 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
