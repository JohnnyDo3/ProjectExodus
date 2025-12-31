import type { ArchitecturalElement } from '../../../types';

export const DEEP_WINDOW_RECESS: ArchitecturalElement = {
  id: 'deep-window-recess',
  slug: 'deep-window-recess',
  name: 'Deep Window Recess',
  alternativeNames: ['Thick Wall Opening', 'Recessed Window', 'Deep Reveal', 'Fortress Window'],
  pronunciation: {
    phonetic: 'DEEP WIN-doh ree-SES',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Deep (extending far back) + window (wall opening for light) + recess (set back space)',
    rootWord: 'Latin recessus (withdrawal, retreat)',
  },
  category: 'WINDOW',
  subcategory: 'window_treatment',
  periods: ['brutalism'],
  regions: ['EUROPE', 'NORTH_AMERICA', 'ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/deep-window-recess-primary.jpg',
    gallery: [
      '/images/architecture/elements/window-recess-barbican.jpg',
      '/images/architecture/elements/window-recess-interior.jpg',
      '/images/architecture/elements/window-recess-shadow.jpg',
    ],
    diagram: '/images/architecture/diagrams/deep-window-recess.svg',
  },

  description: {
    ELEMENTARY: 'A deep window recess is when a window is set back really far into a thick concrete wall, like a tunnel! The walls around the window are so thick (sometimes 2-3 feet!) that you could almost sit in the opening. This creates cool shadows and makes the building look strong and fortress-like.',
    MIDDLE_SCHOOL: 'Deep window recesses occur when windows are set far back into massive concrete walls, creating dramatic reveals (the visible thickness of the wall). In Brutalist buildings, walls might be 60-90cm (2-3 feet) thick, making windows appear like deep caves or tunnels. This emphasizes the building\'s mass, creates strong shadow patterns, provides weather protection, and gives a fortress-like character.',
    HIGH_SCHOOL: 'Deep window recesses in Brutalist architecture result from genuinely thick structural walls (often 50-100cm) combined with windows set back from the facade plane. This creates deep reveals that: 1) express structural mass and material honesty, 2) generate dramatic light and shadow effects, 3) provide solar shading and weather protection, 4) create defendable-looking forms referencing fortifications. The interior experience includes thick sills usable as seating and controlled daylight penetration.',
    UNDERGRADUATE: 'Deep window recesses represent a key tectonic strategy in Brutalist design, where wall thickness serves multiple functions: structural (load-bearing concrete), thermal (mass for temperature modulation), and expressive (monumentality and protection). Recess depths of 30-90cm are common, with the reveal thickness becoming a primary facade articulation element. The Barbican Estate exemplifies this: structural concrete walls 60cm thick create deeply set windows that modulate harsh light while expressing material mass. Interior reveals often receive contrasting finishes or colors.',
    GRADUATE: 'Deep window recesses emerge from the intersection of structural necessity, environmental performance, and architectural symbolism in Brutalist practice. Unlike thin curtain walls requiring applied sun shading, thick concrete walls provide integral environmental modification through thermal mass and self-shading. Critical analysis reveals tensions between functional benefits and perceptual effects-deep recesses can create cave-like interiors while expressing fortress aesthetics potentially at odds with democratic architectural rhetoric. Detailing of recess junctions involves complex waterproofing and thermal bridge management.',
    PHD: 'Scholarly examination of deep window recesses must address multiple dimensions: environmental performance (daylight factors, thermal bridging, acoustic buffering), phenomenological experience (psychological effects of thick enclosure), and cultural meaning (fortress imagery in social housing contexts). Research questions include: How did thick-wall construction costs compare to alternative curtain wall systems? What role did perceived security play in design decisions? How do deep recesses perform under contemporary energy codes? Conservation challenges involve water infiltration at recess joints, concrete spalling at edges, and potential condensation issues.',
  },

  history: {
    ELEMENTARY: 'When Brutalist architects designed buildings in the 1960s, they made really thick walls out of concrete. Instead of putting windows flush with the outside wall, they pushed them way back. This made buildings look strong like castles. Famous buildings like the Barbican in London and many university buildings have these deep window openings that create cool shadows.',
    MIDDLE_SCHOOL: 'Deep window recesses became a signature feature of Brutalism in the 1960s-70s. As architects designed buildings with thick concrete structural walls (rather than steel frames with thin skins), windows naturally recessed into this mass. Le Corbusier\'s Unité d\'Habitation (1952) pioneered this approach. British architects particularly embraced deep recesses in housing estates like Park Hill (1961) and the Barbican (1965-76), creating distinctive facade patterns.',
    HIGH_SCHOOL: 'The development of deep window recesses paralleled Brutalism\'s commitment to structural expression and material honesty (1955-1980). Thick load-bearing concrete walls-necessary for tall buildings before refined frame systems-created opportunities for deep recesses. Architects like Ernő Goldfinger, Denys Lasdun, and the Smithsons emphasized recess depth to articulate wall thickness. Environmental benefits (solar shading, thermal mass) provided functional justification for aesthetic choices. By 1975, energy concerns made thin, highly insulated walls more common.',
    UNDERGRADUATE: 'Deep window recesses emerged from multiple factors: structural concrete wall construction, modernist principles of honest material expression, environmental performance considerations, and symbolic associations with strength/protection. Key precedents include Le Corbusier\'s later works, Louis Kahn\'s heavy wall architecture, and medieval fortification references. Regional variations appeared: British social housing emphasized uniformity and repetition, American institutional buildings showed more expressive variation. Technical developments in concrete construction (post-tensioning, better formwork) enabled thinner walls by 1975, reducing recess popularity.',
    GRADUATE: 'The historiography of deep window recesses intersects with debates about technological determinism, environmental performance, and architectural symbolism. While often presented as inevitable expressions of concrete construction, archival research reveals aesthetic choices-some architects specified recesses deeper than structurally necessary. The environmental performance narrative requires scrutiny: some deep-recess buildings show poor thermal performance due to concrete thermal bridging. Social critique examines whether fortress-like recesses in housing projects communicated security or created institutional bleakness.',
    PHD: 'Critical scholarship on deep window recesses addresses structural practice, environmental science, phenomenology, and cultural meaning. Recent building performance evaluations reveal complex thermal behaviors-recesses provide solar shading but concrete reveals can be thermal bridges requiring retrofit insulation. Phenomenological research examines occupant responses: some appreciate recess seats and controlled light; others report feeling enclosed or oppressed. Conservation theory grapples with water damage at recess edges and whether to retrofit thermal improvements that alter original appearance.',
  },

  characteristics: [
    'Windows set back 30-90cm from facade plane',
    'Thick concrete reveals visible',
    'Strong shadow patterns on facade',
    'Deep interior sills (often usable for seating)',
    'Fortress-like, defensive appearance',
    'Integral solar shading effect',
  ],

  famousExamples: [
    { name: 'Barbican Estate', location: 'London, UK', year: '1965-1976', description: 'Residential towers with uniform deep window recesses in concrete walls' },
    { name: 'Boston City Hall', location: 'Boston, USA', year: '1968', description: 'Deeply recessed windows in massive concrete facade' },
    { name: 'Habitat 67', location: 'Montreal, Canada', year: '1967', description: 'Modular units with deeply set windows in thick concrete modules' },
    { name: 'Trellick Tower', location: 'London, UK', year: '1972', description: 'Ernő Goldfinger\'s tower with consistent deep reveals' },
    { name: 'University of Massachusetts Dartmouth', location: 'Dartmouth, USA', year: '1963-1966', description: 'Paul Rudolph\'s campus with varied window depths in thick walls' },
  ],

  confusionPairs: [
    {
      elementId: 'curtain-wall',
      reason: 'Both are window systems in modern buildings',
      distinction: 'Curtain walls are thin, non-structural skins; deep recesses are openings in thick structural walls',
    },
    {
      elementId: 'clerestory',
      reason: 'Both are window types admitting light',
      distinction: 'Clerestories are high windows for daylighting; deep recesses emphasize wall thickness regardless of height',
    },
  ],

  searchTags: ['window', 'brutalist', 'concrete', 'recess', 'reveal', 'thick-wall', 'shadow', 'fortress'],

  arMetadata: {
    modelPath: '/models/architecture/deep-window-recess.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Window Glass', position: { x: 0, y: 0.5, z: -0.3 } },
      { label: 'Deep Reveal', position: { x: 0.2, y: 0.5, z: 0 } },
      { label: 'Wall Thickness', position: { x: 0.3, y: 0.5, z: 0.1 } },
      { label: 'Shadow Line', position: { x: 0.25, y: 0.7, z: 0.15 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
