import type { ArchitecturalElement } from '../../types';

export const HORSESHOE_ARCH: ArchitecturalElement = {
  id: 'horseshoe-arch',
  slug: 'horseshoe-arch',
  name: 'Horseshoe Arch',
  alternativeNames: ['Moorish Arch', 'Keyhole Arch', 'Arco de Herradura'],
  pronunciation: {
    phonetic: 'HORS-shoo arch',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'An arch shaped like a horseshoe, curving inward at the base',
    rootWord: 'Descriptive term from shape similarity',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['VISIGOTHIC', 'ISLAMIC_GOLDEN_AGE', 'MOORISH'],
  regions: ['MEDITERRANEAN', 'MIDDLE_EAST', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/horseshoe-arch-primary.jpg',
    gallery: [
      '/images/architecture/elements/alhambra-horseshoe.jpg',
      '/images/architecture/elements/cordoba-mosque.jpg',
    ],
    diagram: '/images/architecture/diagrams/horseshoe-arch.svg',
  },

  description: {
    ELEMENTARY: 'A horseshoe arch looks just like its name—shaped like a horseshoe! The curve goes past a half-circle, curving inward at the bottom. You\'ll see these beautiful arches in Spain and Morocco, especially in the famous Alhambra palace.',
    MIDDLE_SCHOOL: 'The horseshoe arch extends past a semicircle, with the sides curving inward below the widest point. It\'s a signature element of Islamic architecture in Spain and North Africa. The Great Mosque of Córdoba features stunning red-and-white striped horseshoe arches.',
    HIGH_SCHOOL: 'The horseshoe arch, where the arc exceeds a semicircle, developed in Visigothic Spain before Islamic conquest. Islamic builders adopted and refined it, creating the iconic red-and-white voussoir arches of the Great Mosque of Córdoba. The form became synonymous with Moorish architecture in Al-Andalus.',
    UNDERGRADUATE: 'The horseshoe arch presents complex questions of origin and transmission. While found in Visigothic Spanish churches predating Islamic conquest, its elaboration under Umayyad patrons in Al-Andalus created distinctive formal and chromatic systems. The arch\'s appearance in Syrian Umayyad architecture suggests possible eastern precedents as well.',
    GRADUATE: 'Horseshoe arch analysis addresses cultural transmission, regional variation, and symbolic meaning. The relationship between Visigothic and Islamic examples, the distinctive Córdoban treatment, and the arch\'s role in expressing Islamic identity all require examination. Post-Reconquista persistence in Mudéjar architecture reveals complex cultural negotiations.',
    PHD: 'Advanced horseshoe arch scholarship engages archaeological evidence for pre-Islamic precedents, analysis of Umayyad design sources, and post-medieval reception. The arch\'s role in 19th-century Orientalist architecture and 20th-century identity politics (especially in Spain) extends investigation into modern cultural history.',
  },

  history: {
    ELEMENTARY: 'Horseshoe arches were used by Visigoths in Spain before Muslim armies arrived in 711 CE. When the Moors took over, they loved this arch shape and made it their signature style! The Great Mosque of Córdoba has hundreds of beautiful horseshoe arches.',
    MIDDLE_SCHOOL: 'Visigothic churches in Spain used horseshoe arches before 711 CE. When Umayyad Muslims conquered Iberia, they adopted and transformed this form. The Great Mosque of Córdoba (784 CE onward) showcases dramatic red-and-white horseshoe arches. The style spread across North Africa and influenced architecture throughout the Islamic world.',
    HIGH_SCHOOL: 'The horseshoe arch appears in pre-Islamic Visigothic architecture, challenging simple narratives of Islamic origin. Umayyad builders in Al-Andalus adopted the form, elaborating it with polychrome voussoirs at Córdoba. The arch became a marker of Islamic identity in Iberia, persisting in Mudéjar architecture after Christian reconquest.',
    UNDERGRADUATE: 'Horseshoe arch development in Iberia reflects complex cultural exchanges. Visigothic examples (San Juan de Baños, 661 CE) predate Islamic conquest, while Umayyad examples show connections to Syrian prototypes. The Great Mosque of Córdoba\'s double-arch system—horseshoe over horseshoe—represents innovative structural and aesthetic solutions. Post-Reconquista Mudéjar persistence indicates the form\'s naturalization across religious boundaries.',
    GRADUATE: 'Critical analysis of the horseshoe arch addresses questions of origin, transmission, and cultural identity. The interplay of Visigothic precedent, Syrian Umayyad influence, and local Andalusian innovation creates a complex picture. The arch\'s role in articulating Islamic identity—and its persistence under Christian rule—reveals architecture\'s entanglement with politics and religion.',
    PHD: 'Horseshoe arch scholarship engages debates about cultural hybridity, the mechanics of artistic transmission, and the politics of heritage. Questions include: the relationship between Iberian and eastern Islamic examples, the arch\'s changing meanings across political contexts, and modern deployments in both Spanish national identity and Islamic revivalism.',
  },

  characteristics: [
    'Arc exceeds a semicircle (more than 180°)',
    'Sides curve inward below widest point',
    'Often with alternating colored voussoirs',
    'Can be round or pointed horseshoe',
    'Signature of Moorish/Islamic architecture',
    'Pre-dates Islamic use in Visigothic Spain',
  ],

  famousExamples: [
    { name: 'Great Mosque of Córdoba', location: 'Córdoba, Spain', year: '784-987 CE', description: 'Forest of red-and-white horseshoe arches' },
    { name: 'Alhambra Palace', location: 'Granada, Spain', year: '13th-14th century', description: 'Nasrid horseshoe arches' },
    { name: 'San Juan de Baños', location: 'Palencia, Spain', year: '661 CE', description: 'Pre-Islamic Visigothic horseshoe arches' },
    { name: 'Koutoubia Mosque', location: 'Marrakech, Morocco', year: '1147-1195', description: 'Almohad horseshoe arches' },
  ],

  confusionPairs: [
    {
      elementId: 'round-arch',
      reason: 'Both are curved arch types',
      distinction: 'Horseshoe extends past semicircle and curves inward; Round arch is exactly half a circle',
    },
    {
      elementId: 'pointed-arch',
      reason: 'Islamic architecture uses both',
      distinction: 'Horseshoe has rounded top (extends past semicircle); Pointed comes to a peak',
    },
  ],

  searchTags: ['arch', 'horseshoe', 'moorish', 'islamic', 'spanish', 'alhambra', 'cordoba', 'keyhole', 'umayyad'],

  arMetadata: {
    modelPath: '/models/architecture/horseshoe-arch.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Crown', position: { x: 0, y: 0.95, z: 0 } },
      { label: 'Inward Curve', position: { x: 0.45, y: 0.2, z: 0 } },
      { label: 'Impost', position: { x: 0.4, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
