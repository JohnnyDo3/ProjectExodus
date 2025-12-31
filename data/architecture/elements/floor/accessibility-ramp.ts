import type { ArchitecturalElement } from '../../types';

export const ACCESSIBILITY_RAMP: ArchitecturalElement = {
  id: 'accessibility-ramp',
  slug: 'accessibility-ramp',
  name: 'Accessibility Ramp',
  alternativeNames: ['ADA Ramp', 'Wheelchair Ramp', 'Handicap Ramp', 'Accessible Ramp', 'Barrier-Free Ramp'],
  pronunciation: {
    phonetic: 'ak-ses-ih-BIL-ih-tee RAMP',
    language: 'English',
  },
  etymology: {
    origin: 'Latin/English',
    meaning: 'Ability to approach or enter',
    rootWord: 'From Latin "accessus" (approach) + "ramp" (inclined plane)',
  },
  category: 'FLOOR',
  subcategory: 'circulation',
  periods: ['MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/accessibility-ramp-primary.jpg',
    gallery: [
      '/images/architecture/elements/accessibility-ramp-switchback.jpg',
      '/images/architecture/elements/accessibility-ramp-integration.jpg',
    ],
    diagram: '/images/architecture/diagrams/accessibility-ramp-requirements.svg',
  },

  description: {
    ELEMENTARY: 'An accessibility ramp is a gentle slope that helps people in wheelchairs, using walkers, or pushing strollers go up or down where there are steps. The ramp can\'t be too steep, and it needs flat areas to rest. It also has railings on the sides to keep people safe!',
    MIDDLE_SCHOOL: 'Accessibility ramps are inclined surfaces designed to allow people with mobility limitations to navigate level changes without stairs. Building codes specify maximum slopes (typically 1:12 in the US, meaning 1 inch of rise for every 12 inches of length), required landings every 30 feet, handrail specifications, and edge protection. Ramps are required at building entrances and within public spaces.',
    HIGH_SCHOOL: 'Accessibility ramps provide barrier-free vertical circulation complying with regulations like the Americans with Disabilities Act (ADA). Design requirements include: maximum slope 1:12 (8.33%), minimum width 36 inches (48 inches preferred), landings at least 60 inches long every 30 feet of run, level landings at top and bottom (60×60 inches minimum), handrails on both sides 34-38 inches high, and edge protection (curbs or rails). Materials must provide slip-resistant surfaces. Switchback configurations address constrained sites.',
    UNDERGRADUATE: 'Accessibility ramp design integrates regulatory compliance, structural engineering, and inclusive design principles. Code analysis: ADA mandates 1:12 maximum slope, but 1:16 or 1:20 provides greater comfort and accommodates hand-powered wheelchairs more easily. Landing requirements ensure rest opportunities and maneuvering space. Structural considerations include drainage (2% cross-slope maximum), thermal movement joints, and support systems (slab-on-grade, elevated framing). Material selection balances slip resistance, durability, and maintenance-concrete, metal grating, composite decking each present advantages. Thoughtful integration into architectural design avoids stigmatizing separate circulation.',
    GRADUATE: 'Advanced accessibility ramp analysis addresses universal design philosophy, regulatory compliance nuances, and innovative solutions. Research examines international standards variations-European EN 81-70, Canadian CSA B651, Australian AS 1428-and their implications for global practice. Structural investigation includes long-span ramp systems, cantilevered designs, and seismically resilient connections. Universal design theory critiques the segregation implicit in "accessible" versus "standard" routes, advocating integrated solutions. Case studies examine exemplary designs that achieve regulatory compliance while enhancing architectural quality. Contemporary practice addresses temporality (construction site ramps, event access) and adaptability.',
    PHD: 'Accessibility ramp research encompasses disability studies, regulatory history, and design innovation. Scholarly investigation addresses the development of accessibility codes-architectural barriers legislation, disability rights activism, evolving technical standards. User research examines actual experiences beyond code minimums: slope preferences for different mobility aids, material surface preferences, wayfinding challenges. Engineering research investigates optimal structural systems, weathering performance, and slip resistance testing methodologies. Critical disability studies interrogate ableist assumptions in built environment design and advocate for universal design from conception rather than compliance-driven accommodation.',
  },

  history: {
    ELEMENTARY: 'Before the 1960s, many buildings had steps but no ramps, making them hard or impossible for people in wheelchairs to enter. People fought for laws requiring ramps. In 1990, the United States passed a law called the ADA that says most buildings must have ramps. Now ramps are common everywhere!',
    MIDDLE_SCHOOL: 'Accessibility ramps became widespread following disability rights advocacy in the mid-20th century. Early building codes rarely addressed accessibility. The Architectural Barriers Act (1968) first required federal buildings to be accessible. Disability rights activism culminated in the Americans with Disabilities Act (1990), mandating accessibility in public accommodations. International standards followed, transforming architectural practice globally.',
    HIGH_SCHOOL: 'The history of accessibility ramps parallels the disability rights movement. Pre-1960s architecture largely ignored mobility limitations. Wheelchair users, veterans\' advocates, and disability rights activists fought for legislative change. The Architectural Barriers Act (1968) applied only to federally funded buildings. State laws varied widely. The ADA (1990) established comprehensive national standards, including detailed ramp specifications. Subsequent revisions (2010 ADA Standards) refined requirements. International development varied-European standards emerged from different regulatory frameworks. Enforcement and cultural attitudes continue evolving.',
    UNDERGRADUATE: 'Accessibility ramp development reflects changing social values, legal frameworks, and design philosophies. Pre-ADA, accessibility accommodations were ad-hoc and often stigmatizing (rear entrances, service elevators). Disability rights activism reframed accessibility as civil right rather than charity. Legislative history: 1968 Architectural Barriers Act, 1973 Rehabilitation Act Section 504, 1990 ADA, 2010 ADA Standards revisions. Design philosophy evolved from "special needs" modifications to universal design-environments usable by all without adaptation. Contemporary practice addresses intersectionality (mobility, vision, hearing, cognitive access) and temporary disabilities (injuries, aging, caregiving).',
    GRADUATE: 'Accessibility ramp historiography engages disability studies, legal history, and design theory. Research examines activism\'s role in legislative change, the development of technical standards through consensus processes, and resistance from building industries citing costs. Comparative analysis addresses international regulatory frameworks and cultural attitudes toward disability. Scholarly investigation includes the tension between prescriptive codes (specific slope/dimension requirements) and performance-based standards (functional outcomes). Contemporary research examines enforcement mechanisms, litigation patterns, and the gap between legal compliance and usable design. Universal design theory critiques segregated accessibility, advocating integrated solutions from project inception.',
    PHD: 'Scholarly investigation of accessibility ramps addresses multiple frameworks: disability studies (social model of disability, crip theory), regulatory history (legislative development, code-making processes), and design research (universal design, inclusive design). Current research includes user experience studies examining preferences beyond code minimums, longitudinal analysis of ramp performance and maintenance, and cross-cultural comparative studies. Critical scholarship interrogates normative assumptions in built environment design and the medicalization of architectural response to disability. Engineering research develops innovative systems-adaptive slopes, weathering-resistant materials, integrated snow-melting-while addressing climate resilience and sustainability.',
  },

  characteristics: [
    'Maximum slope typically 1:12 (8.33%)',
    'Minimum width 36 inches (wider preferred)',
    'Level landings required every 30 feet',
    'Handrails on both sides, 34-38 inches high',
    'Edge protection (curb or extended rail)',
    'Slip-resistant surface required',
    'Proper drainage with max 2% cross-slope',
  ],

  famousExamples: [
    { name: 'Ed Roberts Campus', location: 'Berkeley, USA', year: '2011', description: 'Universal design showcase with integrated accessible circulation' },
    { name: 'High Line Park', location: 'New York City, USA', year: '2009-2019', description: 'Elevated park with integrated accessible ramps throughout' },
    { name: 'National Museum of African American History', location: 'Washington DC, USA', year: '2016', description: 'Thoughtfully integrated accessible routes within monumental design' },
    { name: 'Superkilen Park', location: 'Copenhagen, Denmark', year: '2012', description: 'Public park with playful, integrated accessible ramps' },
    { name: 'Olympic Sculpture Park', location: 'Seattle, USA', year: '2007', description: 'Z-shaped path with accessible ramps connecting levels' },
  ],

  confusionPairs: [
    {
      elementId: 'helical-ramp',
      reason: 'Both provide ramped accessible circulation',
      distinction: 'Accessibility ramps are typically straight runs with landings; helical ramps spiral continuously',
    },
    {
      elementId: 'loading-ramp',
      reason: 'Both are inclined surfaces',
      distinction: 'Accessibility ramps serve pedestrians with specific slope/dimension codes; loading ramps serve vehicles/cargo',
    },
  ],

  searchTags: ['ramp', 'accessibility', 'ADA', 'wheelchair', 'universal design', 'barrier-free', 'inclusive', 'circulation', 'code'],

  arMetadata: {
    modelPath: '/models/architecture/accessibility-ramp.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: '1:12 Slope Surface', position: { x: 0.5, y: 0.1, z: 0 } },
      { label: 'Level Landing', position: { x: 1.5, y: 0.2, z: 0 } },
      { label: 'Handrail 34-38"', position: { x: 0.3, y: 0.3, z: 0.2 } },
      { label: 'Edge Protection', position: { x: 0.3, y: 0, z: -0.2 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
