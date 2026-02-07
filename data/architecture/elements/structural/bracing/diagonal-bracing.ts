import type { ArchitecturalElement } from '../../../types';

export const DIAGONAL_BRACING: ArchitecturalElement = {
  id: 'diagonal-bracing',
  slug: 'diagonal-bracing',
  name: 'Diagonal Bracing',
  alternativeNames: ['Single Diagonal Brace', 'Diagonal Strut', 'Lean-To Brace'],
  pronunciation: {
    phonetic: 'dy-AG-uh-nul BRAY-sing',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'From "diagonalis" meaning slanting line, combined with bracing from Old French "bracier" (to embrace)',
    rootWord: 'diagonalis + bracier',
  },
  category: 'STRUCTURAL',
  subcategory: 'bracing_systems',
  periods: ['roman', 'gothic', 'renaissance', 'chicago-school', 'international-style', 'contemporary'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/diagonal-bracing-primary.jpg',
    gallery: [
      '/images/architecture/elements/diagonal-bracing-steel.jpg',
      '/images/architecture/elements/diagonal-bracing-timber.jpg',
    ],
    diagram: '/images/architecture/diagrams/diagonal-bracing.svg',
  },

  description: {
    ELEMENTARY: 'A diagonal brace is like a big stick that goes from one corner of a building frame to the opposite corner. It stops the building from swaying side to side, kind of like how you might lean against a wobbly table to keep it steady!',
    MIDDLE_SCHOOL: 'Diagonal bracing is the simplest form of lateral bracing. A single diagonal member connects opposite corners of a rectangular frame. When wind or earthquakes push against a building, the diagonal brace resists the force by either stretching (tension) or squashing (compression).',
    HIGH_SCHOOL: 'Diagonal bracing is a fundamental lateral force-resisting system where a single member spans diagonally across a structural bay. The brace works primarily in axial forces - either tension or compression depending on the direction of lateral load. Because it only resists forces in one direction effectively, buildings often use pairs of diagonal braces in an X-pattern.',
    UNDERGRADUATE: 'Single diagonal bracing represents the most elementary form of concentric braced frame (CBF). The brace carries lateral loads through axial action, with the member experiencing either tension or compression depending on load direction. Critical design considerations include effective length for compression buckling, connection capacity, and the asymmetric response under reversed cyclic loading typical of seismic events.',
    GRADUATE: 'The behavior of diagonal bracing under cyclic loading reveals fundamental limitations: compression braces may buckle before tension braces yield, creating asymmetric hysteretic response. Modern codes address this through capacity design principles, ensuring connections can develop brace capacity. Research on post-buckling behavior and low-cycle fatigue has informed current AISC 341 provisions for special concentrically braced frames.',
    PHD: 'Advanced analysis of diagonal bracing systems encompasses fracture mechanics of brace connections, cumulative damage models for low-cycle fatigue, and probabilistic assessment of brace fracture under seismic loading. Contemporary research examines self-centering braced frames using shape memory alloys, replaceable brace systems, and performance-based design methodologies accounting for brace fracture probability distributions.',
  },

  history: {
    ELEMENTARY: 'People have used diagonal braces for thousands of years! Ancient builders discovered that adding a slanted piece of wood to a rectangular frame made it much stronger. Old barns and timber-frame houses often show these diagonal braces.',
    MIDDLE_SCHOOL: 'Diagonal bracing has been used since ancient times in timber construction. Roman builders used diagonal members in roof trusses. Medieval timber-frame buildings prominently displayed diagonal braces. When steel construction emerged in the 1880s, diagonal bracing became essential for tall buildings to resist wind.',
    HIGH_SCHOOL: 'The evolution of diagonal bracing parallels structural engineering history. Ancient timber frames used diagonal bracing intuitively. The scientific understanding developed in the 18th century with truss analysis. The Chicago School (1880s-1890s) systematically applied steel diagonal bracing to high-rise construction, enabling the first skyscrapers.',
    UNDERGRADUATE: 'The theoretical foundation for diagonal bracing analysis was established through the development of structural mechanics in the 18th-19th centuries. Euler\'s buckling theory (1744) provided tools for compression member design. The 1906 San Francisco earthquake revealed the importance of ductile connections, while the 1994 Northridge earthquake exposed vulnerabilities in concentrically braced frames, leading to modern capacity design requirements.',
    GRADUATE: 'The evolution of diagonal bracing design reflects broader developments in earthquake engineering. Early seismic codes treated braced frames as elastic systems. The 1970s introduced ductility concepts, leading to the development of special concentrically braced frame provisions. Post-Northridge research on brace fracture, gusset plate design, and expected material properties fundamentally changed design philosophy.',
    PHD: 'Contemporary research on diagonal bracing addresses fundamental questions about system reliability and resilience. Probabilistic seismic hazard analysis combined with fragility functions enables risk-consistent design. Research on computational modeling of brace fracture, including voiding and void coalescence under cyclic loading, informs constitutive models for nonlinear analysis. The development of replaceable structural fuses and self-centering systems represents the frontier of brace design research.',
  },

  characteristics: [
    'Single diagonal member connecting opposite corners',
    'Resists lateral forces in one direction effectively',
    'Works primarily in tension or compression',
    'Simplest form of bracing system',
    'Often paired in X-pattern for bi-directional resistance',
    'Common in timber, steel, and concrete construction',
  ],

  famousExamples: [
    { name: 'Traditional Timber Barns', location: 'Global', year: 'Historic', description: 'Visible diagonal bracing in agricultural structures' },
    { name: 'Half-Timbered Houses', location: 'Europe', year: 'Medieval', description: 'Decorative and structural diagonal members' },
    { name: 'Home Insurance Building', location: 'Chicago, USA', year: '1885', description: 'Early skyscraper using diagonal wind bracing' },
    { name: 'Industrial Steel Frames', location: 'Global', year: '1900s-present', description: 'Common in warehouse and factory construction' },
  ],

  confusionPairs: [
    {
      elementId: 'x-bracing',
      reason: 'Both are diagonal bracing systems',
      distinction: 'Diagonal bracing uses ONE diagonal; X-bracing uses TWO crossing diagonals for bi-directional resistance',
    },
    {
      elementId: 'knee-bracing',
      reason: 'Both are diagonal structural members',
      distinction: 'Diagonal bracing spans the full bay; knee bracing is short and located at corners only',
    },
  ],

  searchTags: ['bracing', 'structural', 'lateral', 'diagonal', 'steel', 'timber', 'wind', 'earthquake', 'frame', 'tension', 'compression'],

  difficultyScore: 2,
  dateAdded: new Date('2026-02-07'),
  lastUpdated: new Date('2026-02-07'),
};
