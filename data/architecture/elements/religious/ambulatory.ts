import type { ArchitecturalElement } from '../../types';

export const AMBULATORY: ArchitecturalElement = {
  id: 'ambulatory',
  slug: 'ambulatory',
  name: 'Ambulatory',
  alternativeNames: ['Deambulatory', 'Processional Aisle', 'Chevet Aisle', 'Walking Place'],
  pronunciation: {
    phonetic: 'AM-byuh-luh-tor-ee',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'A place for walking, especially a covered walkway',
    rootWord: 'From Latin "ambulatorium", from "ambulare" (to walk)',
  },
  category: 'RELIGIOUS',
  subcategory: 'church_plan',
  periods: ['ROMANESQUE', 'GOTHIC', 'RENAISSANCE', 'BAROQUE'],
  regions: ['WESTERN_EUROPE', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/ambulatory-primary.jpg',
    gallery: [
      '/images/architecture/elements/ambulatory-gothic.jpg',
      '/images/architecture/elements/ambulatory-romanesque.jpg',
    ],
    diagram: '/images/architecture/diagrams/ambulatory-plan.svg',
  },

  description: {
    ELEMENTARY: 'An ambulatory is a covered walkway that goes around the back of a church behind the main altar. In medieval times, people would walk through the ambulatory to visit small chapels and see holy objects called relics without disturbing the main church service happening nearby.',
    MIDDLE_SCHOOL: 'The ambulatory is a semicircular or polygonal aisle that wraps around the apse (curved end) of a church behind the main altar. It developed in medieval churches to allow pilgrims to circulate past radiating chapels containing relics without entering the main worship space. The ambulatory is a key feature of Romanesque and Gothic cathedral architecture.',
    HIGH_SCHOOL: 'The ambulatory is an aisle encircling the apse of a church, typically at the east end behind the high altar. Developed in Carolingian and Romanesque architecture to manage pilgrim traffic, it connects to radiating chapels (chapelles rayonnantes) housing relics. The ambulatory-and-radiating-chapel plan became standard in major French Gothic cathedrals. Structurally, the ambulatory required sophisticated vaulting to cover the curved, trapezoidal bays.',
    UNDERGRADUATE: 'The ambulatory represents a masterful solution to liturgical, structural, and circulatory demands. Its development from the Early Christian apse through Carolingian experimentation (Saint-Martin de Tours, c. 470) to the mature French Gothic chevet reflects evolving pilgrimage practices and architectural ambition. Structurally, ambulatory vaulting presents unique challenges — the trapezoidal plan of ambulatory bays requires geometric sophistication, solved through rib vaults with variable curvature. Double ambulatories (as at Notre-Dame de Paris) multiply both spatial complexity and structural achievement.',
    GRADUATE: 'Ambulatory analysis engages liturgical history, structural mechanics, and art-historical interpretation. The ambulatory\'s role in organizing pilgrimage circulation — controlling access to relics while maintaining liturgical separation — reveals the medieval church as a carefully choreographed social space. Structural analysis examines the transmission of vault thrusts through curved plans, the role of ambulatory columns as integral buttressing for the choir, and the geometric procedures used to lay out radiating chapels.',
    PHD: 'Current ambulatory scholarship addresses archaeological evidence for early ambulatory plans, computational structural analysis of curved vault systems, and the cultural geography of ambulatory adoption across regions. The question of the ambulatory\'s origin — whether it derived from the Roman practice of circumambulation or from practical pilgrimage needs — remains debated. Comparative studies examine analogous circulatory spaces in Buddhist and Hindu temple architecture, questioning the assumed uniqueness of the Western ambulatory type.',
  },

  history: {
    ELEMENTARY: 'The ambulatory was invented about 1,500 years ago when churches became popular pilgrimage destinations. So many people wanted to see the holy relics that churches needed a special walkway so visitors could move through without blocking the prayers. The great Gothic cathedrals of France, like Notre-Dame, have beautiful ambulatories with stained glass and small chapels.',
    MIDDLE_SCHOOL: 'The ambulatory developed in the 5th-6th centuries as pilgrimage to saints\' relics grew. Early examples appeared at Saint-Martin de Tours and Old Saint Peter\'s in Rome. Romanesque churches (Saint-Sernin de Toulouse, Santiago de Compostela) standardized the ambulatory-with-radiating-chapels plan along pilgrimage routes. Gothic cathedrals elaborated the form — Chartres, Amiens, and Beauvais feature soaring ambulatories with tall stained-glass windows. The form spread across Europe with regional variations.',
    HIGH_SCHOOL: 'The ambulatory evolved from Late Antique apse design through Carolingian experimentation to its mature Romanesque and Gothic forms. The pilgrimage church plan — exemplified by Saint-Sernin de Toulouse — established the ambulatory as a circulation device around relics. Abbot Suger\'s rebuilding of Saint-Denis (1140-44) transformed the Gothic ambulatory into a luminous space with thin walls and large windows. The English, German, and Iberian traditions adapted the French model to local liturgical and structural preferences.',
    UNDERGRADUATE: 'Ambulatory history illuminates the relationship between liturgical practice and architectural form. The development from simple curved aisles (Early Christian) through single ambulatories with radiating chapels (Romanesque) to double ambulatories with elaborate chevet compositions (Gothic) parallels the intensification of relic veneration and pilgrimage culture. Suger\'s ambulatory at Saint-Denis — with its revolutionary application of rib vaults and pointed arches to curved plan geometry — is conventionally cited as the birth of Gothic architecture.',
    GRADUATE: 'Historical ambulatory analysis reveals the complex interplay of liturgical program, structural innovation, and patronage politics. The adoption of the ambulatory plan was neither universal nor inevitable — major churches (Cluny III, Canterbury pre-1174) initially developed alternative apse arrangements. Regional variations — the English preference for square east ends, the Germanic Hallenchor — challenge teleological narratives of ambulatory development. Archaeological and documentary evidence increasingly complicates simple evolutionary models.',
    PHD: 'Ambulatory research engages archaeological methodology (excavation interpretation of foundation traces), liturgical studies (spatial analysis of processional practices), structural engineering (finite element analysis of curved vault systems), and comparative religion (circumambulatory spaces across traditions). The ambulatory\'s development provides a case study in the material mediation of spiritual practice — how architectural form shapes and is shaped by religious experience.',
  },

  characteristics: [
    'Semicircular or polygonal aisle around the apse',
    'Located behind the high altar at the east end',
    'Connects to radiating chapels housing relics',
    'Allows pilgrim circulation without disrupting worship',
    'Vaulted with rib vaults over trapezoidal bays',
    'May be single or double (inner and outer aisles)',
    'Key feature of Romanesque and Gothic church plans',
  ],

  famousExamples: [
    { name: 'Basilica of Saint-Denis', location: 'Paris, France', year: '1144', description: 'Suger\'s revolutionary Gothic ambulatory with luminous stained glass' },
    { name: 'Notre-Dame de Paris', location: 'Paris, France', year: '1163', description: 'Double ambulatory with radiating chapels in the iconic Gothic cathedral' },
    { name: 'Santiago de Compostela', location: 'Santiago, Spain', year: '1075', description: 'Major pilgrimage church with ambulatory for relic veneration' },
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1220', description: 'Gothic chevet with double ambulatory and seven radiating chapels' },
    { name: 'Canterbury Cathedral', location: 'Canterbury, England', year: '1175', description: 'William of Sens\'s Gothic ambulatory around the shrine of Thomas Becket' },
  ],

  confusionPairs: [
    {
      elementId: 'nave',
      reason: 'Both are aisled spaces in a church',
      distinction: 'The nave is the main longitudinal space for the congregation; the ambulatory curves around the apse behind the altar',
    },
    {
      elementId: 'apse',
      reason: 'Both are at the east end of a church',
      distinction: 'The apse is the semicircular termination of the choir; the ambulatory is the aisle that wraps around the apse',
    },
  ],

  searchTags: ['church', 'cathedral', 'gothic', 'romanesque', 'pilgrimage', 'apse', 'chevet', 'aisle', 'chapel'],

  arMetadata: {
    modelPath: '/models/architecture/ambulatory.glb',
    scale: 0.2,
    rotatable: true,
    annotations: [
      { label: 'Ambulatory Aisle', position: { x: 0.5, y: 0.5, z: 0.3 } },
      { label: 'Radiating Chapel', position: { x: 0.8, y: 0.5, z: 0 } },
      { label: 'High Altar', position: { x: 0, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
