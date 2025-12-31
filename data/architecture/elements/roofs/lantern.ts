import type { ArchitecturalElement } from '../../types';

export const LANTERN: ArchitecturalElement = {
  id: 'lantern',
  slug: 'lantern',
  name: 'Lantern',
  alternativeNames: ['Dome Lantern', 'Roof Lantern', 'Skylight Lantern', 'Lanterne'],
  pronunciation: {
    phonetic: 'LAN-tern',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Lamp or light-admitting structure',
    rootWord: 'lanterna (from Greek lampter, torch)',
  },
  category: 'ROOF',
  subcategory: 'roof_features',
  periods: ['roman', 'byzantine', 'gothic', 'renaissance', 'baroque', 'neoclassical', 'modern'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/lantern-primary.jpg',
    gallery: [
      '/images/architecture/elements/lantern-renaissance.jpg',
      '/images/architecture/elements/lantern-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/lantern-section.svg',
  },

  description: {
    ELEMENTARY: 'A lantern is a windowed tower on top of a dome or roof that lets light pour down into the building below, like a lighthouse bringing sunshine inside! The windows go all around so light comes from every direction.',
    MIDDLE_SCHOOL: 'A lantern is a windowed structure built on top of a dome, roof, or ceiling to admit light and air. The vertical windows around all sides allow natural light to flood the space below while providing ventilation. Lanterns are common features on church domes, capitol buildings, and modern atriums.',
    HIGH_SCHOOL: 'The lantern is an architectural element consisting of a vertical, windowed structure crowning a dome, roof, or ceiling void, serving to admit natural light and ventilation to interior spaces. Structurally, the lantern rests on the dome or roof structure, with its weight requiring careful engineering, especially in masonry construction. The element features glazed openings on multiple sides, often with decorative framing, and is typically crowned with its own smaller dome or roof. Lanterns serve both functional (daylighting, ventilation) and symbolic purposes, marking significant spaces and completing vertical compositions.',
    UNDERGRADUATE: 'The lantern represents a sophisticated architectural solution integrating structural, environmental, and aesthetic considerations. Derived from the Roman oculus (Pantheon), the lantern evolved to provide weatherproof daylighting through glazed openings. Renaissance architects developed elaborate lanterns crowning domes, with Brunelleschi\'s Florence Cathedral lantern (1436-1461) establishing canonical proportions and details. The lantern\'s structural challenge-adding weight at the crown of a dome-requires careful engineering, with Renaissance builders using internal iron chains to contain lateral thrust. The element\'s environmental performance-admitting zenithal light while creating stack-effect ventilation-made it valuable for churches and public buildings.',
    GRADUATE: 'The lantern embodies complex relationships between structure, light, and symbolism in architectural design. Structural analysis reveals how lantern weight influences dome stability-Wren\'s St. Paul\'s Cathedral employs a complex three-shell dome system partly to support the heavy lantern. The element\'s daylighting function evolved from the simple oculus through Byzantine glazed windows to Renaissance and Baroque elaborate lanterns with multiple tiers. Symbolic dimensions include the lantern as heavenly light source, architectural crown completing vertical progression, and technical achievement demonstrating engineering prowess. Contemporary applications extend beyond domes to roof lanterns admitting light to single-story spaces and multi-story atriums.',
    PHD: 'The lantern constitutes a significant research area encompassing structural mechanics, building science, and architectural history. Scholarly work addresses the structural evolution from Roman oculi through Gothic tower lanterns to Renaissance dome crowns, examining how builders managed the competing requirements of maximum light admission and structural stability. Building performance research quantifies lantern daylighting and ventilation contributions using computational simulations, informing both conservation and new design. Historical studies document pattern transmission-how lantern designs spread through prints and builder training. Conservation research addresses common lantern problems including water infiltration, structural movement, and glass deterioration, developing appropriate interventions. Contemporary research examines smart glass integration, automated ventilation control, and energy modeling for passive climate control through lantern design.',
  },

  history: {
    ELEMENTARY: 'Ancient Romans made a big hole (oculus) at the top of the Pantheon dome to let in light. Later builders added windows and covers to keep out rain while still letting light in-creating the lantern!',
    MIDDLE_SCHOOL: 'The lantern evolved from the Roman oculus (open hole at a dome\'s top, like in the Pantheon). Byzantine builders began glazing these openings. Renaissance architects developed elaborate lanterns crowning domes. Christopher Wren and other Baroque architects created monumental lanterns, while modern architecture uses roof lanterns for daylighting in various building types.',
    HIGH_SCHOOL: 'Lantern development traces from the Roman oculus through Byzantine and medieval innovations to Renaissance codification. The Pantheon\'s 9-meter oculus (126 CE) provided dramatic top-lighting but admitted rain. Byzantine architecture began covering openings with windows, while Gothic churches developed tower-like lanterns over crossings. Brunelleschi\'s Florence Cathedral lantern (1436-1461) established Renaissance prototypes combining structural expression, classical details, and optimal proportions. Wren\'s St. Paul\'s (1675-1710) and Hardouin-Mansart\'s Invalides (1680-1691) created Baroque lantern masterpieces. Modern architecture adopted flat roof lanterns for industrial and residential daylighting.',
    UNDERGRADUATE: 'The lantern\'s history reveals evolving solutions to the challenge of top-lighting interior spaces. Roman precedents established the principle but left spaces exposed to weather. Byzantine developments including Hagia Sophia\'s fenestrated dome base presage later lanterns. Gothic crossing towers functioned as lanterns while serving structural purposes. Renaissance systematization produced canonical lantern types with specific proportional relationships to dome dimensions-typically lantern height equals dome radius. Baroque elaboration increased lantern height for external impact, sometimes requiring structural compromise (St. Paul\'s triple-shell dome). Industrial revolution glass and iron technology enabled larger glazed areas and new typologies including Victorian glass roof lanterns. Modern movement embrace of daylighting revived lantern use in flat-roofed buildings.',
    GRADUATE: 'Lantern history encompasses technological evolution, environmental performance development, and symbolic interpretation. Structural innovations trace from Roman concrete through Gothic stone vaulting to Renaissance iron chains and modern steel frames, each enabling different lantern configurations. Environmental analysis reveals sophisticated daylighting strategies-lantern height and window proportions control light quality and quantity, while openable windows create natural ventilation through stack effect. The lantern\'s symbolic resonance-celestial light, divine presence, architectural culmination-explains its persistence across periods and building types. Pattern book dissemination standardized lantern designs, though regional variations emerged based on climate and materials. Recent historical research employs digital reconstruction to understand lost lanterns, while building archaeology documents construction sequences.',
    PHD: 'Scholarly engagement with lantern history addresses multiple research questions: the mechanics of daylighting in pre-electric buildings, the evolution of structural systems supporting increasingly elaborate lanterns, the transmission of design knowledge through treatises and built examples, and the social meanings of light in sacred and secular contexts. Interdisciplinary research combines architectural history with building physics, using simulation tools to test historical performance claims. Studies examine specific lantern traditions-Byzantine, Renaissance Italian, French Baroque, English Georgian-revealing both continuities and innovations. Conservation research addresses lantern deterioration mechanisms including thermal movement, condensation, glass degradation, and structural settlement. Contemporary scholarship examines lantern revival in sustainable architecture, analyzing both traditional passive strategies and hybrid systems combining historic forms with modern technologies.',
  },

  characteristics: [
    'Windowed structure atop dome or roof',
    'Vertical glazed openings on sides',
    'Provides daylighting from above',
    'Creates stack-effect ventilation',
    'Often has miniature dome or roof',
    'Structural loads require careful engineering',
  ],

  famousExamples: [
    { name: 'Florence Cathedral', location: 'Florence, Italy', year: '1436-1461', description: 'Brunelleschi\'s octagonal marble lantern' },
    { name: 'St. Paul\'s Cathedral', location: 'London, England', year: '1675-1710', description: 'Wren\'s lantern atop triple dome' },
    { name: 'Les Invalides', location: 'Paris, France', year: '1680-1691', description: 'Hardouin-Mansart\'s gilded lantern' },
    { name: 'US Capitol', location: 'Washington D.C., USA', year: '1863', description: 'Thomas U. Walter\'s cast iron lantern' },
    { name: 'Panthéon', location: 'Paris, France', year: '1758-1790', description: 'Soufflot\'s neoclassical lantern' },
  ],

  confusionPairs: [
    {
      elementId: 'cupola',
      reason: 'Both are windowed structures on roofs',
      distinction: 'Lantern specifically crowns a dome and admits light; cupola is broader term for various roof-top structures',
    },
    {
      elementId: 'oculus',
      reason: 'Both provide overhead light',
      distinction: 'Oculus is an open or glazed circular opening; lantern is a vertical windowed structure',
    },
  ],

  searchTags: ['dome', 'roof', 'skylight', 'light', 'window', 'tower', 'crown', 'daylighting', 'ventilation', 'renaissance'],

  arMetadata: {
    modelPath: '/models/architecture/lantern.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Crown/Top', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Glazed Windows', position: { x: 0.2, y: 0.7, z: 0 } },
      { label: 'Structural Frame', position: { x: 0.25, y: 0.6, z: 0 } },
      { label: 'Base (on dome)', position: { x: 0, y: 0.3, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
