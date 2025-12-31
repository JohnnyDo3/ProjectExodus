import type { ArchitecturalElement } from '../../types';

export const REVOLVING_DOOR: ArchitecturalElement = {
  id: 'revolving-door',
  slug: 'revolving-door',
  name: 'Revolving Door',
  alternativeNames: ['Rotating Door', 'Turnstile Door', 'Revolving Entrance'],
  pronunciation: {
    phonetic: 'rih-VAHL-ving door',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Door with rotating compartments around central axis',
    rootWord: 'revolve (from Latin revolvere, to roll back)',
  },
  category: 'DOOR',
  subcategory: 'door_types',
  periods: ['beaux-arts', 'art-deco', 'international-style', 'modern', 'contemporary'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/revolving-door-primary.jpg',
    gallery: [
      '/images/architecture/elements/revolving-door-artdeco.jpg',
      '/images/architecture/elements/revolving-door-modern.jpg',
      '/images/architecture/elements/revolving-door-brass.jpg',
    ],
    diagram: '/images/architecture/diagrams/revolving-door-detail.svg',
  },

  description: {
    ELEMENTARY: 'A revolving door spins around in a circle! It has three or four sections like a pinwheel that keep turning. You step into one section and walk forward as it rotates, and you come out on the other side. It keeps warm or cool air from escaping!',
    MIDDLE_SCHOOL: 'The revolving door consists of three or four door panels (wings) attached to a central shaft that rotates within a cylindrical enclosure. Users enter a compartment and push the door to rotate it, exiting on the opposite side. This design maintains a constant seal, preventing direct air exchange between interior and exterior environments. Revolving doors significantly reduce heating and cooling energy loss compared to traditional hinged doors.',
    HIGH_SCHOOL: 'Revolving door systems feature a central vertical shaft supporting three or four door wings arranged at equal angles (90° or 120°), rotating within a curved enclosure typically 6.5-7 feet in diameter. The constant barrier created by door wings prevents direct interior-exterior airflow, forming an air lock. Speed governors control rotation rate for safety. Materials range from bronze and brass frames with glass panels in historic installations to aluminum and stainless steel in modern applications. The design reduces HVAC energy consumption by 30-75% compared to swing doors in high-traffic buildings.',
    UNDERGRADUATE: 'Revolving door engineering addresses multiple performance criteria: energy efficiency through air lock function, traffic capacity through optimal compartment sizing, accessibility through speed control and alternative entrances, and safety through collapsible wing mechanisms. The system requires precise bearing assemblies supporting substantial weight while enabling smooth rotation, speed governors preventing dangerous rotation speeds, weather seals maintaining envelope integrity, and floor-to-ceiling enclosure creating the cylindrical form. Three-wing configurations (120° spacing) maximize throughput; four-wing configurations (90° spacing) provide better air seal. Automatic revolving doors incorporate sensors and motors, while manual versions rely on user power. Building codes require adjacent accessible entrances.',
    GRADUATE: 'The revolving door represents a technological response to early 20th-century building challenges: rising energy costs in tall buildings, increased pedestrian traffic in urban commercial architecture, and desire to maintain lobby environmental control while accommodating continuous flow. Theophilus Van Kannel\'s 1888 patent established the basic three-wing design. Art Deco and International Style periods embraced revolving doors as modern technological features, often featuring elaborate metalwork. Energy crises (1970s, subsequent decades) renewed interest in revolving doors\' efficiency advantages. Contemporary applications balance energy performance, accessibility requirements, security concerns, and aesthetic considerations. Modern variations include automatic operation, integration with building management systems, and emergency egress capabilities through collapsible or breakaway wing mechanisms.',
    PHD: 'Scholarly analysis of revolving doors encompasses technological history, energy performance research, and cultural studies of threshold experience. Research examines patent evolution from Van Kannel\'s original design through numerous improvements, quantifies energy savings through computational fluid dynamics and empirical studies, and investigates how revolving doors mediate between urban public space and controlled private interiors. Historical studies trace adoption in early skyscrapers and commercial buildings, examining specifications in architectural archives. Building science research addresses performance optimization, accessibility improvements, and integration with security systems. Cultural analysis explores revolving doors as symbols of modernity, efficiency, and corporate architecture, while phenomenological studies examine the spatial experience of threshold rotation. Contemporary research addresses balance between energy efficiency and universal design.',
  },

  history: {
    ELEMENTARY: 'Revolving doors were invented in 1888 by a man named Theophilus Van Kannel in Philadelphia. He didn\'t like how regular doors let cold air blow into buildings! His spinning door solved the problem and became very popular in big city buildings.',
    MIDDLE_SCHOOL: 'Theophilus Van Kannel patented the first revolving door in Philadelphia in 1888, inspired by the problem of doors creating drafts. Early installations appeared in hotels and office buildings. The 1899 installation at Rector\'s restaurant in New York\'s Times Square made revolving doors fashionable. By the 1920s-1930s, revolving doors became standard in commercial buildings, often featuring Art Deco metalwork. They remain common in high-rise buildings worldwide.',
    HIGH_SCHOOL: 'Revolving door development began with Theophilus Van Kannel\'s 1888 patent (US Patent 387,571), addressing draft problems in commercial buildings while accommodating high-traffic flow. Early manufacturers including the Van Kannel Revolving Door Company promoted energy and comfort benefits. Prestigious installations in major hotels and office buildings (Ritz-Carlton, Waldorf-Astoria) established the technology\'s commercial viability. The 1920s-1930s Art Deco period saw revolving doors as modern features, with elaborate bronze and brass frames. International Style architecture continued widespread adoption. Energy crises beginning in the 1970s reinforced revolving doors\' efficiency advantages, driving research and improved designs.',
    UNDERGRADUATE: 'The revolving door\'s emergence coincided with late 19th-century urbanization and commercial building evolution. Van Kannel\'s innovation addressed practical problems in increasingly tall buildings: maintaining lobby comfort and reducing heating costs while managing pedestrian flow. Technical refinement through the 1890s-1910s improved bearing systems, safety mechanisms, and manufacturing processes. Cultural acceptance required overcoming initial skepticism-some users found rotation disorienting or claustrophobic. Adoption by prestigious establishments normalized the technology. Art Deco period (1920s-1930s) celebrated revolving doors as expressions of modernity and efficiency, commissioning elaborate decorative metalwork. Post-WWII period saw standardization and cost reduction. Energy crises renewed emphasis on performance optimization. Recent developments address accessibility requirements, security integration, and sustainable design.',
    GRADUATE: 'Revolving door history illustrates relationships between building technology, energy consciousness, and urban commercial architecture. Van Kannel\'s invention emerged from specific urban contexts: dense commercial districts generating high pedestrian traffic, tall buildings experiencing stack effect draft problems, and rising heating costs. Patent records reveal competing designs through the 1890s-1910s before three-wing and four-wing configurations dominated. Architectural adoption reflected cultural values: efficiency, modernity, technological sophistication. Art Deco period integrated revolving doors into broader aesthetic programs, commissioning custom metalwork by leading artisans. Mid-century modernism treated revolving doors as functional necessities rather than decorative features. Late 20th-century developments balanced multiple concerns: energy efficiency driving performance improvements, accessibility movements requiring alternative entrances, security needs influencing design, and sustainable building certifications incentivizing installation.',
    PHD: 'Scholarly engagement with revolving doors addresses technological innovation, environmental performance, and cultural meaning. Historical research examines patent evolution, early manufacturer strategies, and architectural adoption patterns through building specifications and trade publications. Building science studies quantify energy performance through infrared thermography, tracer gas analysis, and computational modeling, demonstrating 30-75% reduction in air infiltration versus swing doors. Cultural analysis interprets revolving doors as threshold devices mediating public/private boundaries, symbols of corporate modernity, and participants in urban pedestrian experience. Accessibility studies critique conflicts between energy efficiency and universal design, proposing solutions balancing multiple performance criteria. Contemporary research investigates smart revolving doors with adaptive speed control, emergency egress improvements, and integration with building automation systems.',
  },

  characteristics: [
    'Central rotating shaft with radiating wings',
    'Three or four door panels',
    'Cylindrical enclosure',
    'Continuous air seal prevents drafts',
    'Accommodates simultaneous entry and exit',
    'Significant energy savings',
    'Typically 6.5-7 feet diameter',
    'Manual or automatic operation',
  ],

  famousExamples: [
    { name: 'Empire State Building', location: 'New York City', year: '1931', description: 'Art Deco revolving doors in Fifth Avenue lobby' },
    { name: 'Chrysler Building', location: 'New York City', year: '1930', description: 'Elaborate brass and marble revolving entrance' },
    { name: 'The Plaza Hotel', location: 'New York City', year: '1907', description: 'Historic revolving doors at Fifth Avenue entrance' },
    { name: 'Tribune Tower', location: 'Chicago, Illinois', year: '1925', description: 'Gothic Revival with brass revolving doors' },
    { name: 'Waldorf Astoria', location: 'New York City', year: '1931', description: 'Iconic Art Deco revolving entrance doors' },
  ],

  confusionPairs: [
    {
      elementId: 'turnstile',
      reason: 'Both involve rotation for entry control',
      distinction: 'Revolving doors are full-height enclosures for climate control; turnstiles are waist-height barriers for access control',
    },
    {
      elementId: 'vestibule',
      reason: 'Both create air locks at building entrances',
      distinction: 'Revolving doors create continuous rotating seal; vestibules use two sets of doors with space between',
    },
  ],

  searchTags: ['door', 'revolving', 'rotating', 'energy', 'commercial', 'lobby', 'Art Deco', 'entrance', 'air lock', 'efficiency'],

  arMetadata: {
    modelPath: '/models/architecture/revolving-door.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Central Shaft', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Door Wing', position: { x: 0.4, y: 0.5, z: 0 } },
      { label: 'Curved Enclosure', position: { x: 0.6, y: 0.5, z: 0.3 } },
      { label: 'Entry Compartment', position: { x: -0.3, y: 0.3, z: 0.3 } },
      { label: 'Floor Bearing', position: { x: 0, y: 0.05, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
