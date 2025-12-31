import type { ArchitecturalElement } from '../../types';

export const TATAMI: ArchitecturalElement = {
  id: 'tatami',
  slug: 'tatami',
  name: 'Tatami',
  alternativeNames: ['Tatami Mat', 'Tatami Floor', 'Goza'],
  pronunciation: {
    phonetic: 'tah-TAH-mee',
    language: 'Japanese',
  },
  etymology: {
    origin: 'Japanese',
    meaning: 'To fold and pile',
    rootWord: 'From verb "tatamu" (畳む)',
  },
  category: 'FLOOR',
  subcategory: 'flooring',
  periods: ['MEDIEVAL_JAPANESE', 'EDO_PERIOD', 'MODERN_JAPANESE', 'CONTEMPORARY'],
  regions: ['JAPAN', 'EAST_ASIA'],

  images: {
    primary: '/images/architecture/elements/tatami-primary.jpg',
    gallery: [
      '/images/architecture/elements/tatami-room.jpg',
      '/images/architecture/elements/tatami-construction.jpg',
    ],
    diagram: '/images/architecture/diagrams/tatami-arrangement.svg',
  },

  description: {
    ELEMENTARY: 'Tatami are thick floor mats made of woven grass used in traditional Japanese homes. They smell nice, feel soft to walk on, and are arranged in special patterns. Japanese people often measure room sizes by counting how many tatami mats fit inside!',
    MIDDLE_SCHOOL: 'Tatami are traditional Japanese floor mats made from woven rush grass (igusa) over a rice straw core, bordered with cloth. Standardized in size (approximately 3 feet by 6 feet), they determine room dimensions and layouts. Tatami rooms require removing shoes, and the mats provide cushioning, insulation, and a distinctive fragrance.',
    HIGH_SCHOOL: 'Tatami are modular floor coverings constructed with a rice straw core, rush grass (igusa) surface, and fabric edging (heri). Standardized dimensions (roughly 90cm × 180cm, varying by region) created a measurement system-rooms are described by mat count (6-mat, 8-mat). Strict arrangement rules (tatami-jiki) prevent four corners meeting, which is considered unlucky. The material provides thermal and acoustic insulation while regulating humidity.',
    UNDERGRADUATE: 'Tatami represents an integrated system linking material culture, spatial measurement, and social practice. Manufacture involves layering rice straw into compression-resistant cores, weaving rush grass into surface matting, and binding edges with decorative cloth (color and pattern indicating room status). Regional variations exist in dimensions: Kyoto-size (191 × 95.5 cm), Edo-size (176 × 88 cm). Installation follows geometric rules derived from aesthetics and superstition. The module influenced Japanese architectural planning-posts, screens, and room proportions derive from tatami grids.',
    GRADUATE: 'Tatami analysis engages material science, vernacular architecture, and cultural practice. Technical investigation addresses rush grass cultivation (Kumamoto primary source), straw compression techniques, and deterioration mechanisms (UV degradation, moisture damage). Spatial analysis examines how the tatami module shaped Japanese room proportions, influenced by ken measurement systems. Conservation challenges include maintaining traditional craft knowledge, sourcing quality materials, and adapting to modern building standards. Contemporary practice negotiates tradition with alternatives-synthetic cores, chemical-free rush cultivation.',
    PHD: 'Tatami research encompasses agricultural history (rush grass cultivation), craft anthropology (artisan transmission), and architectural theory (modular design systems). Scholarly investigation addresses the historical development of standardization (from luxury item to ubiquitous flooring), regional production differences, and the tatami\'s role in Japanese spatial concepts (ma, oku). Materials science research examines rush grass cellular structure, optimal harvest timing, and natural dye chemistry. Contemporary studies address sustainability (pesticide use in rush farming), craft preservation, and cross-cultural adoption.',
  },

  history: {
    ELEMENTARY: 'Long ago in Japan, only nobles and samurai had tatami mats-they were expensive! Regular people slept on wooden floors. About 400 years ago, tatami became more common, and eventually most Japanese homes had tatami rooms. Today, many modern apartments still have at least one tatami room.',
    MIDDLE_SCHOOL: 'Tatami originated in the Heian period (794-1185) as portable seating for nobility. During the Muromachi period (1336-1573), entire floors began being covered with tatami in aristocratic residences. The tea ceremony\'s development standardized tatami room design. By the Edo period (1603-1868), tatami had spread to merchant and eventually commoner homes, becoming integral to Japanese domestic architecture.',
    HIGH_SCHOOL: 'Early tatami (Heian period) were thick, luxurious cushions for nobility-owning them indicated high status. The development of shoin-zukuri architecture in the Muromachi period established tatami as permanent flooring. Regional lords standardized dimensions for taxation and construction. The tea ceremony (chanoyu) codified 4.5-mat room dimensions and asymmetrical arrangements. Edo-period urbanization democratized tatami, though quality varied by class. Meiji modernization challenged tatami tradition, but it persisted in residential architecture.',
    UNDERGRADUATE: 'The evolution of tatami reflects changing Japanese social structure and building technology. Heian-period portability suited aristocratic multi-use spaces. Muromachi standardization enabled modular planning and prefabrication. Edo-period guild organization regulated production quality and dimensions. Regional variations emerged: Kyoto (larger), Nagoya (intermediate), Edo (smaller)-reflecting lumber dimensions and room proportions. Post-WWII construction industrialization created tension between traditional craft and efficient production. Contemporary revival addresses wellness trends and cultural preservation.',
    GRADUATE: 'Tatami historiography engages social history, craft studies, and architectural theory. Research examines the transition from luxury object to standard flooring, guild organization (tatami-ya), and the relationship between tatami dimensions and timber sizing. The tea ceremony\'s influence on residential design-tokonoma alcoves, asymmetrical arrangements-derives from tatami planning. Conservation challenges include declining craft knowledge (fewer than 300 traditional makers remain), rush grass farming abandonment, and competition from synthetic alternatives. Contemporary research addresses health benefits (air purification, humidity regulation) and sustainability.',
    PHD: 'Scholarly investigation of tatami addresses multiple dimensions: material culture (production techniques, trade networks), architectural theory (modular systems, proportional relationships), and social practice (ritual uses, status markers). Current research includes digital documentation of traditional techniques, chemical analysis of historical rush grass, and the anthropology of contemporary tatami craft. Conservation science examines deterioration mechanisms and develops compatible restoration materials. Cross-cultural studies investigate tatami\'s adoption in Western minimalist design and wellness contexts.',
  },

  characteristics: [
    'Woven rush grass (igusa) surface',
    'Rice straw or wood chip core',
    'Standardized dimensions (regional variations)',
    'Cloth border (heri) in various patterns',
    'Natural fragrance from rush grass',
    'Provides thermal and acoustic insulation',
    'Requires regular maintenance and eventual replacement',
  ],

  famousExamples: [
    { name: 'Katsura Imperial Villa', location: 'Kyoto, Japan', year: '1615-1662', description: 'Masterpiece of Japanese residential design with exquisite tatami rooms' },
    { name: 'Ryoan-ji Hojo', location: 'Kyoto, Japan', year: '15th century', description: 'Zen temple with traditional tatami meditation halls' },
    { name: 'Shugaku-in Imperial Villa', location: 'Kyoto, Japan', year: '1655-1659', description: 'Multiple tea houses with carefully proportioned tatami rooms' },
    { name: 'Nijo Castle Ninomaru Palace', location: 'Kyoto, Japan', year: '1603', description: 'Shogunate palace with ornate tatami rooms and "nightingale floors"' },
    { name: 'Todai-ji Temple Guest Hall', location: 'Nara, Japan', year: '8th century (rebuilt)', description: 'Historic temple complex with traditional tatami spaces' },
  ],

  confusionPairs: [
    {
      elementId: 'woven-mat',
      reason: 'Both are floor mats made from plant materials',
      distinction: 'Tatami are standardized Japanese mats with specific dimensions and construction; woven mats are more general category',
    },
    {
      elementId: 'rush-matting',
      reason: 'Both use rush grass',
      distinction: 'Tatami are thick, structured mats with straw cores; rush matting is thin woven surface only',
    },
  ],

  searchTags: ['flooring', 'japanese', 'traditional', 'mat', 'rush grass', 'modular', 'woven', 'asia', 'meditation'],

  arMetadata: {
    modelPath: '/models/architecture/tatami.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Rush Grass Surface', position: { x: 0.4, y: 0.02, z: 0 } },
      { label: 'Cloth Border (Heri)', position: { x: 0.9, y: 0.02, z: 0 } },
      { label: 'Rice Straw Core', position: { x: 0.4, y: -0.02, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
