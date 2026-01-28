import type { ArchitecturalElement } from '../../types';

export const REFLECTED_CEILING_PLAN: ArchitecturalElement = {
  id: 'reflected-ceiling-plan',
  slug: 'reflected-ceiling-plan',
  name: 'Reflected Ceiling Plan',
  alternativeNames: ['RCP', 'Ceiling Plan', 'Overhead Plan', 'Mirror Ceiling Plan'],
  pronunciation: {
    phonetic: 'rih-FLEK-ted SEE-ling PLAN',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'A ceiling plan shown as if reflected in a mirror on the floor',
    rootWord: 'Latin "reflectere" (to bend back) + "planum" (flat surface)',
  },
  category: 'CEILING',
  subcategory: 'technical_drawing',
  periods: ['MODERNIST', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/reflected-ceiling-plan-primary.jpg',
    gallery: [
      '/images/architecture/elements/rcp-office-example.jpg',
      '/images/architecture/elements/rcp-residential-example.jpg',
      '/images/architecture/elements/rcp-symbols-guide.jpg',
    ],
    diagram: '/images/architecture/diagrams/rcp-mirror-concept.svg',
  },

  description: {
    ELEMENTARY: 'A Reflected Ceiling Plan (RCP) is a special drawing that shows everything on the ceiling - like lights, air vents, and sprinklers. It\'s called "reflected" because you draw it as if you\'re looking down at a mirror on the floor that shows the ceiling! This helps builders know exactly where to put lights, fans, and other things on the ceiling. The drawing uses special symbols - circles for lights, squares for air vents, and crosses for sprinklers. It\'s like a map of the ceiling!',
    MIDDLE_SCHOOL: 'A Reflected Ceiling Plan (RCP) is a technical drawing used by architects and engineers to show the layout of all ceiling-mounted elements. The name comes from imagining a mirror placed on the floor - you look down at this mirror to see the ceiling reflected back. RCPs include symbols for recessed lights, chandeliers, HVAC diffusers and grilles, sprinkler heads, smoke detectors, speakers, and the ceiling grid system. Different symbols represent different fixtures: downlights appear as circles with cross-hatching, linear diffusers as elongated rectangles, and sprinkler heads as circles with radiating lines. RCPs prevent floor plans from becoming too cluttered and ensure proper coordination between electrical, mechanical, and structural systems.',
    HIGH_SCHOOL: 'The Reflected Ceiling Plan is an essential architectural drawing convention that documents ceiling-mounted building systems. The "reflected" terminology derives from the visualization technique: imagine standing in a space with a mirror positioned horizontally at floor level; looking down, you see the ceiling reflected with the same spatial orientation as a floor plan. This maintains consistent directionality across construction documents. RCPs show lighting fixtures (recessed, surface-mounted, pendant, emergency), HVAC components (supply diffusers, return grilles, linear slots), life safety systems (sprinkler heads with coverage patterns, smoke detectors, exit signs), ceiling construction (grid lines for acoustical tile, drywall control joints, coffers), and specialty items (speakers, security cameras, access panels). Standard architectural symbols ensure universal readability. RCPs coordinate with electrical lighting plans and mechanical drawings, with circuits often shown as curved lines connecting fixtures to switches.',
    UNDERGRADUATE: 'Reflected Ceiling Plan development requires integration of multiple building systems within spatial and code constraints. The drawing convention emerged from practical necessity - ceiling-mounted systems became increasingly complex in modern buildings, and separating this information from floor plans improved document clarity. RCP creation involves coordinating fixture layouts with structural grids, maintaining required clearances, meeting code-mandated spacing (sprinklers, smoke detectors), and ensuring maintenance access. Lighting design principles guide fixture placement - uniform illumination levels, task lighting positioning, emergency egress lighting, architectural accent lighting. HVAC coordination addresses air distribution patterns, avoiding short-circuiting between supply and return, and maintaining temperature control zones. Symbol standardization follows industry conventions (ANSI, CSI) with variations for specific systems. Scale typically matches floor plans (1/8" or 1/4" = 1\'-0"). Professional practice uses BIM (Building Information Modeling) tools where 3D coordination automatically generates RCPs, detecting clashes between systems.',
    GRADUATE: 'Reflected Ceiling Plan methodology encompasses technical coordination, regulatory compliance, and construction communication. Research addresses optimal symbol systems for clarity and information density, investigating cognitive load in document reading and error reduction. BIM integration enables parametric relationships - fixture families with embedded performance data, automated code compliance checking, quantity takeoffs, and 4D construction sequencing. Coordination studies examine clash detection algorithms, tolerance analysis, and constructability review protocols. Sustainability considerations include lighting power density calculations (ASHRAE 90.1), daylight integration, and circadian rhythm-responsive systems. Advanced RCPs document complex assemblies - multi-layer clouds, curved and non-planar surfaces, kinetic ceilings. Research also addresses representation challenges for emerging technologies - integrated LED systems, smart building sensors, wireless control networks. Professional liability issues concern accuracy requirements, change management, and as-built documentation. Academic inquiry investigates the evolution from hand-drafted documents to digital workflows and emerging AR/VR coordination tools.',
    PHD: 'Scholarly research on Reflected Ceiling Plans intersects architectural theory, building science, digital practice, and construction history. Historical investigation traces the emergence of RCPs as a distinct drawing type in early 20th century practice, correlating with electrification, mechanical climate control, and life safety code development. Comparative analysis examines international variations in conventions and symbol systems. Epistemological research addresses how RCPs construct architectural knowledge - the "mirror" metaphor as cognitive scaffolding, orthographic projection theory, and the relationship between representation and built reality. Building performance research utilizes RCPs as data sources - lighting quality studies, acoustic performance modeling, indoor environmental quality assessment. Digital practice research investigates computational workflows - algorithmic layout optimization, generative design for fixture distribution, machine learning for code compliance verification, automated coordination between disciplines. Professional practice research examines RCP use in project delivery - information exchange protocols, liability allocation, contractor interpretation and shop drawing development. Emerging research addresses post-occupancy sensing data integration - actual versus designed performance, adaptive building systems, and the evolution toward "digital twin" models where RCPs become dynamic rather than static documents.',
  },

  history: {
    ELEMENTARY: 'Before there were RCPs, builders had to figure out where ceiling lights and vents went by just guessing or writing notes! As buildings got more complicated with electricity, air conditioning, and fire sprinklers (around 100 years ago), architects needed better drawings. They invented the reflected ceiling plan to keep track of all these ceiling things without making the regular floor plans too messy. Today, architects use computers to draw RCPs and make sure nothing bumps into each other in the ceiling!',
    MIDDLE_SCHOOL: 'Reflected Ceiling Plans emerged in the early 20th century as buildings became more technologically complex. Before electricity and mechanical systems, ceilings were relatively simple decorative surfaces. As electric lighting, forced air HVAC, fire suppression systems, and telecommunications became standard, the ceiling transformed into a dense infrastructure zone. Early architectural drawings included ceiling information on floor plans, but this created cluttered, difficult-to-read documents. Separating ceiling information into dedicated RCPs improved clarity and coordination. The "reflected" convention standardized by mid-century, providing consistent orientation across drawing sets. Computer-aided design (CAD) in the 1980s-90s made RCP production more efficient, and current Building Information Modeling (BIM) technology enables automatic generation and three-dimensional coordination.',
    HIGH_SCHOOL: 'The development of Reflected Ceiling Plans parallels the evolution of building services and construction documentation practices. Nineteenth-century buildings featured primarily decorative ceilings with limited technical systems - gas lighting fixtures and perhaps ventilation grilles. Electrification (1880s-1920s) initiated the shift, as wiring requirements and fixture locations needed documentation. Mechanical air conditioning (1920s onward) added ductwork, diffusers, and grilles. Automatic fire sprinkler systems (mandated in many building types from mid-20th century) required precise head spacing and coverage documentation. The proliferation of systems made ceiling coordination critical. Early practice included ceiling information on floor plans with extensive notation, but complexity drove the separation of ceiling documentation. Professional standardization occurred through architectural institutes and code bodies, establishing conventional symbols and representation methods. The CAD revolution (1980s) automated RCP production. Contemporary BIM practice creates coordinated 3D models where RCPs are extracted views rather than separate drawings, enabling automated clash detection and system integration verification.',
    UNDERGRADUATE: 'RCP history reflects broader narratives in architectural technology, professional practice, and building code development. Pre-modern ceilings primarily served aesthetic and acoustic functions - coffered ceilings in classical architecture, ornate plasterwork in Baroque interiors, exposed timber in vernacular construction. Building system integration began with gaslight (mid-19th century), evolved through electric lighting (Edison\'s systems, 1880s), and accelerated with mechanical climate control (carrier\'s air conditioning, 1902). Each technological layer added coordination complexity. Professional practice responded through enhanced documentation methods. Early 20th century texts on architectural drafting show ceiling information annotated on floor plans. The separation into distinct RCPs emerged through professional consensus, codified in architectural standards by mid-century (AIA, CSI). Symbol standardization facilitated inter-firm communication and contractor interpretation. The liability environment also drove precision - as building systems grew more complex and expensive, coordination failures became costly. Computer-aided documentation transformed production methods - early 2D CAD (1980s-90s), then parametric BIM (2000s-present) where systems are modeled in 3D and RCPs are generated views. Current research addresses automated layout algorithms, performance-based design, and integration of operational data.',
    GRADUATE: 'Academic investigation of RCP development encompasses technical history, professional practice evolution, and epistemological dimensions. Documentary research analyzes historical construction documents, professional publications, and code archives to trace the emergence and standardization of RCP conventions. This reveals how professional consensus formed around representation methods and how regional or national variations developed. Material culture analysis examines how different reproduction technologies (blueprint, diazo, photocopy, digital printing) influenced drawing conventions and information density. Professional practice research investigates how organizational structures (design-bid-build vs. design-build vs. integrated project delivery) affect RCP development and coordination responsibilities. Technical research addresses the growing complexity of ceiling-mounted systems and corresponding documentation challenges - early systems were relatively simple (lights, grilles), while contemporary buildings integrate lighting, HVAC, fire suppression, life safety, security, communications, acoustical systems, and now smart building sensors and IoT devices. BIM research examines how parametric modeling changes the RCP from a static drawing to a database query of a comprehensive building model, enabling dynamic coordination and performance analysis. Future directions include augmented reality on-site coordination and the integration of post-occupancy sensing data to validate design assumptions.',
    PHD: 'Scholarly research on Reflected Ceiling Plans offers insights into architectural knowledge production, construction technology, and professional practice. Historical epistemology examines how the "reflected" convention constructs spatial understanding - the mirror metaphor as cognitive framework, the maintenance of consistent orientation across orthographic projections, and implications for design thinking and contractor interpretation. Science and technology studies approaches investigate RCPs as boundary objects facilitating coordination among disciplines (architectural, electrical, mechanical engineering) with different knowledge systems and priorities. Archival research examining professional association records (AIA, NCARB), standards development organizations (ANSI, ISO), and educational curricula traces the institutionalization of RCP conventions. Comparative international research reveals variations in practice - European vs. North American conventions, differences in symbol systems and information hierarchies. Building science research utilizes historical RCPs as data sources for longitudinal studies of lighting technology evolution, energy consumption patterns, and indoor environmental quality. Digital humanities approaches enable large-scale analysis of RCP repositories, revealing patterns in fixture density, layout strategies, and design evolution. Contemporary research addresses emerging challenges - representing adaptive and responsive systems, integrating operational data from building management systems, developing AR/VR coordination tools, and evolving toward "digital twin" paradigms where RCPs become interfaces to dynamic building models rather than static construction documents.',
  },

  characteristics: [
    'Mirror-view convention (looking down at floor to see ceiling reflected)',
    'Shows all ceiling-mounted elements (lighting, HVAC, fire safety)',
    'Uses standardized architectural symbols',
    'Coordinates with floor plans and mechanical/electrical drawings',
    'Includes ceiling grid layout and material specifications',
    'Shows circuits connecting fixtures to switches (curved dashed lines)',
    'Displays furniture and walls as dashed lines for context',
    'Documents ceiling heights and changes in elevation',
    'Critical for building code compliance (life safety systems)',
    'Generated from BIM models in contemporary practice',
  ],

  famousExamples: [
    {
      name: 'Seagram Building',
      location: 'New York, USA',
      year: '1958',
      description: 'Ludwig Mies van der Rohe\'s modernist tower featured innovative integrated ceiling systems coordinated through detailed RCPs, pioneering the suspended ceiling with integrated lighting and HVAC.',
    },
    {
      name: 'Willis Tower (Sears Tower)',
      location: 'Chicago, USA',
      year: '1973',
      description: 'Complex RCPs coordinated high-rise mechanical systems across 110 floors, including innovative sky lobby arrangements and zone-specific HVAC distribution.',
    },
    {
      name: 'Pompidou Centre',
      location: 'Paris, France',
      year: '1977',
      description: 'Renzo Piano and Richard Rogers\' "inside-out" design still required extensive RCPs for interior spaces, demonstrating that even exposed-systems architecture needs ceiling coordination.',
    },
    {
      name: 'Apple Park',
      location: 'Cupertino, USA',
      year: '2017',
      description: 'Foster + Partners\' circular headquarters features extensive curved ceiling systems requiring advanced BIM-generated RCPs for coordinating radial lighting, HVAC, and acoustical treatments.',
    },
    {
      name: 'Shed at Hudson Yards',
      location: 'New York, USA',
      year: '2019',
      description: 'Diller Scofidio + Renfro\'s movable structure required dynamic RCPs accounting for different ceiling configurations and deployable systems.',
    },
  ],

  confusionPairs: [
    {
      elementId: 'floor-plan',
      reason: 'Both show room layout from above',
      distinction: 'Floor plans show walls, doors, and floor-mounted elements looking down; RCPs show the ceiling as if reflected in a floor mirror, displaying ceiling-mounted fixtures and systems.',
    },
    {
      elementId: 'electrical-plan',
      reason: 'Both show electrical fixtures and circuits',
      distinction: 'Electrical plans show all electrical components including outlets, switches, and panels; RCPs specifically focus on ceiling-mounted electrical elements (lighting) coordinated with mechanical systems.',
    },
    {
      elementId: 'lighting-plan',
      reason: 'Both show lighting fixture locations',
      distinction: 'Lighting plans focus exclusively on illumination design and photometric calculations; RCPs show lighting integrated with all other ceiling systems (HVAC, sprinklers, structure) for comprehensive coordination.',
    },
    {
      elementId: 'coffered-ceiling',
      reason: 'Both relate to ceiling design',
      distinction: 'Coffered ceilings are a decorative architectural feature with recessed panels; RCPs are technical drawings documenting all ceiling-mounted systems regardless of ceiling style.',
    },
  ],

  searchTags: [
    'ceiling',
    'plan',
    'RCP',
    'reflected',
    'lighting',
    'HVAC',
    'sprinkler',
    'technical drawing',
    'architectural documentation',
    'building systems',
    'ceiling grid',
    'diffuser',
    'smoke detector',
    'construction documents',
    'coordination drawing',
  ],

  arMetadata: {
    modelPath: '/models/architecture/reflected-ceiling-plan.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Recessed Light', position: { x: 0.2, y: 0.3, z: 0 } },
      { label: 'Supply Diffuser', position: { x: -0.2, y: 0.3, z: 0 } },
      { label: 'Sprinkler Head', position: { x: 0.2, y: -0.3, z: 0 } },
      { label: 'Smoke Detector', position: { x: -0.2, y: -0.3, z: 0 } },
      { label: 'Ceiling Grid', position: { x: 0, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-28'),
  lastUpdated: new Date('2024-01-28'),
};
