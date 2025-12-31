import type { ArchitecturalElement } from '../../../types';

export const EXTERNAL_DUCTWORK: ArchitecturalElement = {
  id: 'external-ductwork',
  slug: 'external-ductwork',
  name: 'External Ductwork',
  alternativeNames: ['Exposed Services', 'Visible Mechanical Systems', 'External MEP', 'Service Towers'],
  pronunciation: {
    phonetic: 'eks-TUR-nul DUKT-wurk',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Mechanical ventilation pipes placed outside the building envelope',
    rootWord: 'From Latin "externus" (outside) and "ductus" (conduit)',
  },
  category: 'FACADE',
  subcategory: 'high_tech',
  periods: ['high-tech', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/external-ductwork-primary.jpg',
    gallery: [
      '/images/architecture/elements/external-ductwork-pompidou.jpg',
      '/images/architecture/elements/external-ductwork-lloyds.jpg',
      '/images/architecture/elements/external-ductwork-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/external-ductwork-system.svg',
  },

  description: {
    ELEMENTARY: 'External ductwork is when all the building\'s "guts"-the pipes for air conditioning, water, and elevators-are put on the outside instead of hidden inside walls. It looks like a giant colorful machine! The Centre Pompidou in Paris has all its pipes on the outside painted in bright colors: blue for air, green for water, yellow for electricity, and red for elevators.',
    MIDDLE_SCHOOL: 'In High-Tech architecture, mechanical, electrical, and plumbing (MEP) systems are deliberately placed on the building exterior rather than concealed within walls and ceilings. This "serviced shed" approach maximizes usable interior space and expresses the building\'s functional systems. Ductwork, pipes, and utility risers become prominent architectural features, often color-coded by function.',
    HIGH_SCHOOL: 'External servicing represents a core High-Tech strategy: separating served spaces from servant spaces by externalizing mechanical systems. Benefits include flexible column-free interiors, easier maintenance access, and reduced floor-to-floor heights. Technical challenges include weatherproofing, thermal insulation of services, condensation management, and acoustic treatment. The approach draws from Archigram\'s "plug-in" architecture and Louis Kahn\'s served/servant space concepts.',
    UNDERGRADUATE: 'The externalization of building services reflects both functional and ideological positions. Functionally, external services reduce interstitial space, improve accessibility, and facilitate system replacement. Ideologically, it expresses technological optimism and architectural honesty. Engineering considerations include thermal expansion of long duct runs, vibration isolation, fire compartmentation, and corrosion protection. Contemporary applications balance service expression with energy performance-external services can become thermal liabilities. Analysis of aging High-Tech buildings reveals maintenance challenges.',
    GRADUATE: 'External servicing engages theories of architectural legibility, flexibility, and obsolescence. The strategy assumes building services have shorter lifespans than structure, enabling replacement without core disruption. Research examines actual service replacement patterns-evidence suggests external services are rarely upgraded as theorized. Energy analysis reveals thermal penalties-uninsulated or poorly insulated external ducts increase HVAC loads. Contemporary sustainable design often internalizes services for thermal mass benefits, representing a theoretical reversal from 1970s High-Tech principles.',
    PHD: 'Critical scholarship interrogates the gap between High-Tech theory (flexibility, adaptability, honesty) and realized performance. External services require significant maintenance investment, weather protection, and thermal compensation. Historical research examines the influence of megastructure theory, systems thinking, and industrial aesthetics on service externalization. Contemporary preservation challenges include upgrading aging mechanical systems while respecting High-Tech design intent. Environmental assessment questions whether the spatial efficiency gains offset thermal performance losses and increased material exposure.',
  },

  history: {
    ELEMENTARY: 'In the 1970s, architects had a new idea: instead of hiding all the building\'s pipes and tubes inside the walls, why not put them on the outside where you can see them? The Centre Pompidou (1977) shocked people by looking like a factory, but it became one of Paris\'s most famous buildings. Now many modern buildings show off their colorful pipes!',
    MIDDLE_SCHOOL: 'External services emerged from 1960s architectural theory-Archigram\'s Plug-in City, Cedric Price\'s Fun Palace, and Louis Kahn\'s served/servant space distinction. The Centre Pompidou (Rogers/Piano, 1977) made external servicing famous with its color-coded systems. Lloyd\'s of London (Rogers, 1986) refined the approach with external service towers. While initially shocking, the aesthetic influenced commercial architecture worldwide, though often as stylistic gesture rather than functional strategy.',
    HIGH_SCHOOL: 'The externalization of services has roots in industrial architecture and engineering structures. Team 4\'s Reliance Controls Factory (1967) pioneered the serviced shed. Theoretical influences include Archigram\'s throwaway architecture, Reyner Banham\'s environmental architecture, and megastructure concepts. Centre Pompidou (1977) synthesized these ideas into a cultural building. Critics attacked it as inside-out and machine-like; supporters celebrated its honesty and flexibility. The 1980s commercial adoption (Lloyd\'s, Channel 4 HQ) demonstrated mainstream acceptance.',
    UNDERGRADUATE: 'External servicing\'s development parallels computing technology and flexible workplace concepts. The "office landscape" movement (1960s) sought adaptable interiors; external services enabled this by removing fixed service cores. Engineering advances in ductwork, elevators, and modular services made externalization technically feasible. Centre Pompidou\'s 50-year history reveals the strategy\'s strengths (interior flexibility achieved) and weaknesses (high maintenance, thermal performance issues). Contemporary High-Tech buildings often selectively externalize services rather than total externalization.',
    GRADUATE: 'Historical analysis reveals external servicing as both pragmatic and symbolic. The 1970s energy crisis made flexibility valuable-buildings might need repurposing. Information technology suggested rapidly changing workspace needs. External services promised adaptability. Realized history shows limited service replacement-most external ductwork remains original. Maintenance costs and weathering exceed predictions. The aesthetic legacy exceeds functional legacy-external services became a High-Tech signature even when pragmatically unjustified. Research examines the performance of aging external service systems.',
    PHD: 'Scholarship on external services engages architecture theory, building performance, and cultural studies. Theoretical work examines the concept\'s origins in systems theory, cybernetics, and architectural autonomy debates. Performance research documents thermal penalties, maintenance requirements, and actual vs. theoretical flexibility. Cultural analysis explores how industrial aesthetics moved from radical to mainstream, ultimately becoming corporate signature style. Contemporary preservation faces paradox-upgrading services threatens design integrity, but maintaining 50-year-old systems is increasingly impractical and inefficient.',
  },

  characteristics: [
    'MEP systems located on building exterior',
    'Mechanical ductwork, pipes, and risers visible',
    'Often color-coded by system function',
    'Creates column-free interior spaces',
    'Service towers or external shafts',
    'Industrial/technological aesthetic',
    'Requires weatherproofing and insulation',
  ],

  famousExamples: [
    {
      name: 'Centre Pompidou',
      location: 'Paris, France',
      year: '1977',
      description: 'Rogers/Piano\'s cultural center with color-coded external services (blue=air, green=water, yellow=electric, red=circulation)'
    },
    {
      name: 'Lloyd\'s Building',
      location: 'London, UK',
      year: '1986',
      description: 'Richard Rogers\' headquarters with six external service towers containing ducts and elevators'
    },
    {
      name: 'Channel 4 Headquarters',
      location: 'London, UK',
      year: '1994',
      description: 'Rogers\' office building with external glass service towers and exposed ductwork'
    },
    {
      name: 'Inmos Microprocessor Factory',
      location: 'Newport, Wales',
      year: '1982',
      description: 'Rogers\' factory with external service spine separating production spaces'
    },
    {
      name: 'PA Technology Centre',
      location: 'Princeton, USA',
      year: '1985',
      description: 'Rogers\' research facility with external mechanical services and structural masts'
    },
  ],

  confusionPairs: [
    {
      elementId: 'exposed-structure',
      reason: 'Both involve external building systems',
      distinction: 'Exposed structure shows structural frame (beams, columns); external ductwork shows mechanical systems (pipes, ducts, services)',
    },
    {
      elementId: 'service-core',
      reason: 'Both relate to building services',
      distinction: 'Service cores are internal vertical shafts containing services; external ductwork places services visibly on the building exterior',
    },
  ],

  searchTags: ['high-tech', 'services', 'MEP', 'ductwork', 'pipes', 'mechanical', 'pompidou', 'industrial', 'rogers', 'color-coded'],

  arMetadata: {
    modelPath: '/models/architecture/external-ductwork.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Air Duct (Blue)', position: { x: -0.5, y: 1.5, z: 0.3 } },
      { label: 'Water Pipe (Green)', position: { x: 0.5, y: 1, z: 0.3 } },
      { label: 'Electrical Conduit (Yellow)', position: { x: 0, y: 0.5, z: 0.3 } },
      { label: 'Service Tower', position: { x: 0, y: 2, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-12-31'),
  lastUpdated: new Date('2024-12-31'),
};
