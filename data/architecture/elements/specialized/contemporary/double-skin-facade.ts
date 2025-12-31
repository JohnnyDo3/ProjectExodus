import type { ArchitecturalElement } from '../../../types';

export const DOUBLE_SKIN_FACADE: ArchitecturalElement = {
  id: 'double-skin-facade',
  slug: 'double-skin-facade',
  name: 'Double-Skin Facade',
  alternativeNames: ['Twin-Wall Facade', 'Climate Facade', 'Ventilated Facade', 'Double Envelope'],
  pronunciation: {
    phonetic: 'DUH-bul SKIN fuh-SAHD',
    language: 'English',
  },
  etymology: {
    origin: 'English + French',
    meaning: 'Building facade with two layers',
    rootWord: 'From French "façade" (face) + English "double" and "skin"',
  },
  category: 'FACADE',
  subcategory: 'environmental_systems',
  periods: ['HIGH_TECH', 'SUSTAINABLE', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/double-skin-facade-primary.jpg',
    gallery: [
      '/images/architecture/elements/double-skin-facade-section.jpg',
      '/images/architecture/elements/double-skin-facade-detail.jpg',
      '/images/architecture/elements/double-skin-facade-cavity.jpg',
    ],
    diagram: '/images/architecture/diagrams/double-skin-facade-airflow.svg',
  },

  description: {
    ELEMENTARY: 'A double-skin facade is like a building wearing two jackets instead of one! There\'s an outer glass layer and an inner glass layer with an air space between them. This space acts like a cushion that keeps the building warm in winter and cool in summer, while also blocking noise from outside.',
    MIDDLE_SCHOOL: 'Double-skin facades consist of two glass walls separated by a cavity (typically 20cm to 2m wide). Air can flow through this cavity, creating natural ventilation. In winter, the cavity traps heat like a greenhouse. In summer, hot air rises and exits through top vents, pulling in cooler air from below. Blinds in the cavity provide shade without getting dirty from rain. This system reduces heating and cooling costs.',
    HIGH_SCHOOL: 'The double-skin facade system comprises an outer skin (typically single glazing), a ventilated cavity with integrated shading devices, and an inner skin (usually insulated glazing). Cavity ventilation can be natural, mechanical, or hybrid. Airflow strategies vary: box-window (floor-by-floor), shaft-box (connecting multiple floors), or corridor (continuous vertical cavity). Performance benefits include solar heat gain control, noise reduction, and natural ventilation potential. Challenges include increased cost, maintenance access, and potential overheating.',
    UNDERGRADUATE: 'Double-skin facade analysis addresses thermal performance, airflow dynamics, and acoustic properties. The outer skin protects shading devices and enables facade access. Cavity widths affect airflow patterns-narrow cavities (20-60cm) facilitate stack effect ventilation; wider cavities (1-2m) can serve as circulation spaces or sky gardens. Computational fluid dynamics (CFD) models airflow and heat transfer. System typologies include: box window (independent units), corridor facade (continuous cavity), and multi-story facade (connecting multiple floors). Integration with building management systems enables responsive operation based on external conditions.',
    GRADUATE: 'Research on double-skin facades examines the complex interplay of thermal physics, airflow dynamics, and building integration. Detailed thermal modeling accounts for solar radiation, convective heat transfer in cavities, and thermal mass effects. Studies compare energy performance claims against measured data from post-occupancy evaluations. Innovations include phase-change materials in cavity elements, integrated photovoltaics in outer skin, and adaptive shading controlled by building automation. Critical assessment questions whether added complexity and cost yield proportional energy savings, examining lifecycle performance and maintenance requirements.',
    PHD: 'Scholarly investigation of double-skin facades encompasses building physics, environmental engineering, and architectural history. Research methodologies include long-term building performance monitoring, comparative energy modeling across climate zones, and occupant satisfaction studies. Theoretical work addresses the facade\'s role in sustainable architecture discourse, examining the gap between design intent and operational reality. Historical scholarship traces the technology from 1920s-30s precedents (Chareau\'s Maison de Verre) through German innovations of the 1990s to global proliferation. Contemporary research critically assesses whether double-skin facades represent genuine sustainability or technological complexity without proportional benefit.',
  },

  history: {
    ELEMENTARY: 'Double-skin facades were invented in Germany in the 1990s to save energy. Architects wanted buildings that could breathe naturally and stay comfortable without using as much air conditioning. The idea spread around the world, and now you can find double-skin buildings in many cities, especially in places that want to be environmentally friendly.',
    MIDDLE_SCHOOL: 'Early examples appeared in Europe in the 1980s-90s, particularly in Germany where energy efficiency became a priority. The Occidental Chemical Center in Niagara Falls (1980) was an early North American example. German buildings like the Debis Tower in Berlin (1997) demonstrated the technology. By the 2000s, double-skin facades appeared globally, particularly in Asia. However, some projects revealed problems-excessive heat buildup, high costs, and maintenance challenges.',
    HIGH_SCHOOL: 'Double-skin facade precedents include 19th-century winter gardens and early 20th-century experiments (Maison de Verre, 1932), but modern development occurred in 1980s-90s Germany driven by energy regulations. Key projects include Occidental Chemical Center (1980), RWE Tower Essen (1997), and GSW Headquarters Berlin (1999). The technology spread globally in the 2000s, particularly to Asia and Middle East. Post-occupancy studies revealed mixed performance-some buildings achieved energy savings, others experienced cavity overheating and higher-than-expected operational costs.',
    UNDERGRADUATE: 'Historical development of double-skin facades traces from historical precedents (conservatories, winter gardens) through modernist experiments (Le Corbusier\'s mur neutralisant concept, 1920s; Maison de Verre, 1932) to contemporary application. German energy crisis response (1970s-80s) drove research. Enabling technologies included computational fluid dynamics for airflow modeling, building automation for cavity ventilation control, and improved glazing technologies. 1990s German projects demonstrated possibilities; 2000s projects worldwide revealed limitations. Contemporary research focuses on climate-specific design, advanced controls, and integration with renewable energy systems.',
    GRADUATE: 'Double-skin facade historiography examines the interplay of energy policy, building technology, and architectural expression. German building regulations and research funding drove 1990s development. Technology transfer occurred through engineering conferences, specialized consultants, and architectural media. Critical analysis questions the technology\'s universal applicability-effective in temperate climates with moderate solar gain, problematic in hot climates or with inadequate control systems. Research comparing design predictions against measured performance reveals frequent shortfalls. Contemporary scholarship addresses the risk of technological determinism, examining cases where simpler, lower-tech solutions might achieve better performance per dollar invested.',
    PHD: 'Scholarly research on double-skin facades engages questions of sustainable design, technological complexity, and architectural practice. Studies examine the gap between theoretical performance potential and actual building operation, analyzing factors including occupant behavior, maintenance practices, and control system configuration. Comparative research across climate zones questions whether the system\'s added cost and complexity yield proportional benefits. Theoretical work addresses the facade as site of negotiation between inside and outside, examining phenomenological and cultural dimensions beyond energy performance. Historical investigation traces the global circulation of double-skin technology, examining how European innovations were adapted (and sometimes misapplied) in different climatic and cultural contexts.',
  },

  characteristics: [
    'Two glass skins separated by cavity',
    'Cavity width: typically 20cm to 2m',
    'Natural, mechanical, or hybrid ventilation',
    'Integrated shading devices in cavity',
    'Thermal buffer zone between inside and outside',
    'Noise reduction from double barriers',
    'Various configurations: box-window, corridor, shaft-box',
    'Enables operable windows in tall buildings',
  ],

  famousExamples: [
    { name: 'GSW Headquarters', location: 'Berlin, Germany', year: '1999', description: 'Sauerbruch Hutton\'s pioneering double-skin tower with colored glass' },
    { name: 'RWE Tower', location: 'Essen, Germany', year: '1997', description: 'Ingenhoven Architects\' cylindrical double-skin tower' },
    { name: 'Commerzbank Tower', location: 'Frankfurt, Germany', year: '1997', description: 'Foster + Partners\' tall building with sky gardens in cavity' },
    { name: 'KfW Westarkade', location: 'Frankfurt, Germany', year: '2010', description: 'Sauerbruch Hutton\'s energy-efficient office building' },
    { name: 'Shanghai Tower', location: 'Shanghai, China', year: '2015', description: 'World\'s tallest building with double-skin facade, 128 stories' },
  ],

  confusionPairs: [
    {
      elementId: 'curtain-wall',
      reason: 'Both are contemporary glass facade systems',
      distinction: 'Curtain walls have single skin; double-skin facades have two glass layers with ventilated cavity between',
    },
    {
      elementId: 'insulated-glass',
      reason: 'Both involve multiple glass layers',
      distinction: 'Insulated glass units are sealed windows (6-12mm gap); double-skin facades have wide ventilated cavities (20cm-2m) between separate wall systems',
    },
  ],

  searchTags: ['facade', 'glass', 'ventilation', 'sustainable', 'energy', 'cavity', 'thermal', 'climate', 'green-building'],

  arMetadata: {
    modelPath: '/models/architecture/double-skin-facade.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Outer Skin (Single Glazing)', position: { x: 0.6, y: 0.5, z: 0 } },
      { label: 'Ventilated Cavity', position: { x: 0.3, y: 0.5, z: 0 } },
      { label: 'Inner Skin (Insulated Glazing)', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Integrated Shading', position: { x: 0.3, y: 0.3, z: 0 } },
      { label: 'Air Inlet/Outlet', position: { x: 0.3, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
