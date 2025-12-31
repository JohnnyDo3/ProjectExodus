import type { ArchitecturalElement } from '../../types';

export const DROPPED_CEILING: ArchitecturalElement = {
  id: 'dropped-ceiling',
  slug: 'dropped-ceiling',
  name: 'Dropped Ceiling',
  alternativeNames: ['Suspended Ceiling', 'Drop Ceiling', 'False Ceiling', 'T-Bar Ceiling', 'Lay-In Ceiling'],
  pronunciation: {
    phonetic: 'DROPT SEE-ling',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Ceiling suspended or "dropped" below structural ceiling',
    rootWord: 'English "drop" (to fall, hang down)',
  },
  category: 'CEILING',
  subcategory: 'ceiling_systems',
  periods: ['MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/dropped-ceiling-primary.jpg',
    gallery: [
      '/images/architecture/elements/dropped-ceiling-office.jpg',
      '/images/architecture/elements/dropped-ceiling-acoustic.jpg',
    ],
    diagram: '/images/architecture/diagrams/dropped-ceiling-construction.svg',
  },

  description: {
    ELEMENTARY: 'A dropped ceiling (also called a suspended ceiling) is like a second ceiling that hangs below the real ceiling! It\'s made of a metal grid (like a checkerboard frame) with light square panels that sit in the spaces. You see dropped ceilings everywhere-schools, offices, stores, hospitals. They\'re super practical because they hide all the pipes, wires, and air ducts above them, and you can easily lift out a panel to reach things. They also help with sound and can have lights built right in!',
    MIDDLE_SCHOOL: 'Dropped ceilings consist of a metal grid framework suspended below the structural ceiling, with lightweight panels (typically 2\'×2\' or 2\'×4\') resting in the grid. The plenum (space above the dropped ceiling) contains mechanical, electrical, and plumbing systems. Panels are easily removable for maintenance access. Common in commercial, institutional, and industrial buildings, dropped ceilings provide multiple functions: concealing services, acoustic control (sound-absorbing panels), fire protection, lighting integration (recessed fixtures fit within the grid), and thermal insulation. Panel materials include mineral fiber, fiberglass, metal, and wood. The system\'s modularity enables easy reconfiguration, maintenance access, and component replacement.',
    HIGH_SCHOOL: 'Dropped ceiling systems employ suspended metal grid frameworks supporting modular panels, creating a secondary ceiling plane below structural slabs or roof decks. The suspension system uses wires or rods attached to the structure above, hanging a grid of main runners and cross-tees at the desired elevation. Standard panel modules (commonly 600mm × 600mm or 600mm × 1200mm / 2\'×2\' or 2\'×4\') rest within grid openings. The plenum space accommodates building services-HVAC ductwork, electrical conduit, plumbing, data cabling, sprinkler systems-while maintaining access through removable panels. Primary functions include: service concealment, acoustic treatment (sound absorption and blocking), fire resistance (rated ceiling assemblies), lighting integration (recessed troffers, LED panels), thermal performance, and aesthetic finish. Panel types vary: mineral fiber (acoustic absorption), metal (durability, cleanability), gypsum (fire resistance), wood (aesthetics). System advantages include installation speed, maintenance access, flexibility, and cost-effectiveness. Limitations include reduced ceiling height and aesthetic character.',
    UNDERGRADUATE: 'Dropped ceiling system design addresses structural, environmental, and functional requirements. Structural design determines suspension wire spacing, grid member sizing, and attachment methods based on panel weight and imposed loads (light fixtures, diffusers). Seismic zones require bracing systems preventing ceiling collapse. Acoustic design selects panel materials and configurations achieving target sound absorption (NRC ratings) and blocking (CAC ratings). Fire protection design specifies rated ceiling assemblies contributing to floor-ceiling fire resistance. Lighting integration coordinates recessed fixtures with grid layout, addressing photometric requirements and energy codes. Thermal performance considers plenum insulation and air leakage. Aesthetic considerations include grid finish (exposed, concealed, or tegular panel profiles), panel appearance, and integration with architectural elements. System specifications address panel composition, grid finish, suspension hardware, and installation standards. Maintenance planning ensures access to services while maintaining ceiling integrity.',
    GRADUATE: 'Scholarly analysis of dropped ceiling systems examines technological development, performance optimization, and architectural integration. Historical research traces system evolution from early 20th-century concealment strategies through post-WWII standardization and contemporary innovations. Building science research addresses acoustic performance-sound absorption mechanisms in porous panels, airborne sound transmission through plenum spaces, structure-borne vibration isolation. Fire research investigates ceiling assembly behavior in fire conditions, contribution to compartmentation, and protection of structural elements. Environmental research optimizes material selection for lifecycle impacts, recycled content, and indoor air quality. Lighting research develops integrated ceiling-lighting systems improving energy efficiency and visual comfort. Structural research addresses seismic performance and progressive collapse prevention. Architectural research explores aesthetic integration strategies transcending utilitarian appearance. Industry studies examine standardization processes and economic factors in system adoption.',
    PHD: 'Dropped ceiling research engages building technology, material science, and architectural history. Historical scholarship examines the development of suspended ceiling systems in early 20th-century commercial architecture, standardization through industry associations, and global dissemination. Acoustic research employs physical testing and computational modeling to optimize panel microstructure and macro-configuration for sound absorption and blocking. Fire safety research investigates ceiling system performance in realistic fire scenarios, including structure protection and evacuation safety. Material science research develops advanced panel compositions-improved acoustic performance, lower environmental impact, enhanced durability, antimicrobial properties. Structural research addresses earthquake resilience through advanced bracing systems and connection details. Building physics research optimizes thermal and moisture performance of ceiling assemblies. Lighting research integrates LED technology with ceiling systems, addressing circadian rhythms and energy efficiency. Architectural research investigates strategies for aesthetic integration-concealed grid systems, custom panel designs, hybrid approaches. Sustainability research examines lifecycle assessment, circular economy potential, and health impacts of ceiling materials. Digital fabrication research explores mass customization possibilities for ceiling panel design.',
  },

  history: {
    ELEMENTARY: 'Before dropped ceilings were invented about 100 years ago, offices and stores just had open ceilings or plain plaster, and all the pipes and wires showed-not very pretty! In the 1940s-1950s, companies started making suspended ceiling systems with metal grids and panels that could hide everything neatly and be changed easily. They became super popular for offices, schools, and stores because they were cheap, practical, and easy to install. Today, nearly every office building and school has dropped ceilings!',
    MIDDLE_SCHOOL: 'Suspended ceiling systems emerged in the early 20th century as commercial buildings required solutions for concealing increasingly complex mechanical and electrical systems. Early systems used plaster on metal lath suspended from structure. The modern modular grid-and-panel system developed in the 1940s-1950s, with companies like Armstrong and USG creating standardized products. Post-WWII commercial building boom drove widespread adoption-suspended ceilings offered economical installation, maintenance access, acoustic control, and lighting integration. Continuous development improved panel acoustics, fire resistance, and aesthetics. Environmental movements promoted recycled content and low-emission materials. Contemporary systems integrate LED lighting, air distribution, and digital controls while exploring improved aesthetics.',
    HIGH_SCHOOL: 'Dropped ceiling history reflects the evolution of commercial building systems and construction industrialization. Early 20th-century commercial buildings employed various ceiling concealment strategies-plaster on suspended metal lath, wood slats, or exposed structure. The need for improved acoustic control, lighting integration, and service access drove innovation. Donald Brown\'s 1919 Acoustone tile represented early acoustic ceiling development. The modern modular suspended ceiling system emerged in the 1940s, with Chicago Metallic, Armstrong, and USG developing standardized grid-and-panel systems. Post-WWII commercial construction boom (office buildings, schools, hospitals) created enormous market. System standardization through industry associations (ASTM, CISCA) ensured interoperability. Continuous improvement addressed acoustic performance, fire resistance, seismic safety, and environmental impact. Late 20th-century trends included concealed grid systems and higher-end finishes. Contemporary development focuses on sustainability, integrated services (lighting, HVAC, data), and aesthetic diversity.',
    UNDERGRADUATE: 'Dropped ceiling development illustrates the industrialization and standardization of building systems. Early precedents include suspended plaster ceilings in theaters (acoustic improvement) and utilitarian installations in industrial buildings. The critical innovation was modular standardization-interchangeable components from multiple manufacturers. Chicago Metallic Manufacturing Company\'s 1948 introduction of the concealed "Z" suspension system represented a key advance. Industry standardization through ASTM specifications and CISCA guidelines enabled component interoperability and quality assurance. Market expansion accompanied post-war commercial building types-corporate offices, suburban schools, shopping centers-where dropped ceilings addressed multiple functional requirements economically. Technological development improved panel acoustics (mineral fiber formulations), fire performance (gypsum and mineral fiber compositions), and structural behavior (seismic bracing systems). Environmental movements drove recycled content incorporation and low-VOC formulations. Contemporary challenges include improving aesthetic perception, integrating advanced building systems, and addressing sustainability through lifecycle thinking.',
    GRADUATE: 'Scholarly examination of dropped ceiling systems addresses technological innovation, industry development, and architectural implications. Historical research investigates early ceiling concealment strategies and the emergence of modular systems in mid-20th century. Industry studies examine standardization processes, manufacturer competition, and market development. Building science research traces performance improvement trajectories-acoustic optimization through material science, fire resistance through composition development, seismic safety through bracing innovation. Environmental research documents the incorporation of sustainability criteria-recycled content, low emissions, disassembly and reuse. Architectural discourse examines the tension between functional efficiency and aesthetic aspiration-suspended ceilings as utilitarian necessity versus architectural opportunity. Cultural studies analyze dropped ceilings as markers of institutional and commercial space, examining their role in creating particular spatial experiences. Conservation research addresses treatment of mid-century modern buildings where exposed structure was original design intent. Contemporary research explores integration with smart building systems and aesthetic innovations challenging conventional appearances.',
    PHD: 'Dropped ceiling research encompasses technological history, material science, building performance, and architectural criticism. Historical scholarship examines the development of suspended ceiling systems within broader building industrialization narratives, analyzing innovation processes, standardization mechanisms, and global technology transfer. Material science research investigates acoustic material development, fire-resistant compositions, and contemporary advanced materials addressing multiple performance criteria. Building science research employs experimental and computational methods to optimize acoustic performance, fire behavior, seismic resilience, and environmental impacts. Industry studies analyze market structures, competitive dynamics, and innovation patterns in the ceiling industry. Architectural research examines the cultural meanings and aesthetic implications of suspended ceilings-as symbols of bureaucratic modernism, as pragmatic building solutions, and as opportunities for architectural innovation. Conservation scholarship addresses the treatment of historically significant ceilings and the challenges of maintaining mid-century modern buildings. Sustainability research employs lifecycle assessment methodology and circular economy concepts to reimagine ceiling system design, materials, and end-of-life scenarios. Digital technology research explores integration of sensors, actuators, and communications in "smart ceilings" contributing to building performance and occupant experience.',
  },

  characteristics: [
    'Metal grid framework suspended below structure',
    'Modular removable panels (typically 2\'×2\' or 2\'×4\')',
    'Conceals mechanical, electrical, and plumbing systems',
    'Provides acoustic absorption and sound blocking',
    'Integrates lighting fixtures and HVAC diffusers',
    'Easy maintenance access through removable panels',
    'Fire-rated assemblies available',
    'Rapid installation and reconfiguration',
  ],

  famousExamples: [
    { name: 'Lever House', location: 'New York, USA', year: '1952', description: 'Early corporate office building with suspended ceilings' },
    { name: 'UNESCO Headquarters', location: 'Paris, France', year: '1958', description: 'International Modern building with integrated ceiling systems' },
    { name: 'Corporate Office Buildings', location: 'Global', year: '1950s-present', description: 'Ubiquitous application in commercial architecture' },
    { name: 'Educational Institutions', location: 'Global', year: '1960s-present', description: 'Standard application in schools and universities' },
    { name: 'Healthcare Facilities', location: 'Global', year: '1950s-present', description: 'Critical for acoustic control and service access in hospitals' },
  ],

  confusionPairs: [
    {
      elementId: 'coffered-ceiling',
      reason: 'Both create ceiling patterns with recesses',
      distinction: 'Dropped ceilings are suspended systems concealing services; coffered ceilings are decorative architectural features with sunken panels',
    },
    {
      elementId: 'exposed-beams',
      reason: 'Both relate to ceiling structure visibility',
      distinction: 'Dropped ceilings conceal structure and services; exposed beams intentionally reveal structural members',
    },
  ],

  searchTags: ['ceiling', 'suspended', 'dropped', 'false', 't-bar', 'grid', 'acoustic', 'commercial', 'office', 'modular'],

  arMetadata: {
    modelPath: '/models/architecture/dropped-ceiling.glb',
    scale: 0.8,
    rotatable: true,
    annotations: [
      { label: 'Main Runner', position: { x: 0, y: 0.05, z: 0 } },
      { label: 'Cross Tee', position: { x: 0.15, y: 0.05, z: 0 } },
      { label: 'Ceiling Panel', position: { x: 0.08, y: 0, z: 0 } },
      { label: 'Suspension Wire', position: { x: 0, y: 0.12, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
