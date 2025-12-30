import type { ArchitecturalElement } from '../../types';

export const CUPOLA: ArchitecturalElement = {
  id: 'cupola',
  slug: 'cupola',
  name: 'Cupola',
  alternativeNames: ['Belvedere', 'Lantern', 'Roof Dome', 'Turret'],
  pronunciation: {
    phonetic: 'KYOO-puh-luh',
    language: 'Italian',
  },
  etymology: {
    origin: 'Italian',
    meaning: 'Small cup or dome',
    rootWord: 'cupola (diminutive of Latin cupa, cup)',
  },
  category: 'ROOF',
  subcategory: 'roof_features',
  periods: ['roman', 'byzantine', 'renaissance', 'baroque', 'neoclassical', 'victorian'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/cupola-primary.jpg',
    gallery: [
      '/images/architecture/elements/cupola-barn.jpg',
      '/images/architecture/elements/cupola-capitol.jpg',
    ],
    diagram: '/images/architecture/diagrams/cupola-structure.svg',
  },

  description: {
    ELEMENTARY: 'A cupola is like a little house sitting on top of a roof! It\'s a small dome or tower that lets light and air into the building below. Many barns have cupolas to help keep the hay dry by letting hot air escape.',
    MIDDLE_SCHOOL: 'A cupola is a small dome-like structure built on top of a roof, often with windows or openings on the sides. Cupolas serve both practical purposes (ventilation, natural light, or housing bells) and decorative purposes, adding visual interest to rooflines. They\'re common on barns, churches, courthouses, and other prominent buildings.',
    HIGH_SCHOOL: 'The cupola is a small, domed structure rising above a main roof, typically square, circular, or polygonal in plan, crowned with its own miniature dome or roof. Functionally, cupolas provide natural ventilation through stack effect, admit daylight into interior spaces below, serve as bell towers, or house clocks. Structurally, cupolas require careful integration with the main roof structure to transfer loads. The cupola became a characteristic feature of Renaissance and Baroque architecture, later adopted in American vernacular architecture for barns and public buildings.',
    UNDERGRADUATE: 'The cupola represents a multifunctional architectural element combining practical ventilation, daylighting, and symbolic functions with formal composition. Derived from ancient precedents including Roman lanterns atop domes, the cupola evolved through Byzantine and Renaissance architecture into a standard architectural feature. The element\'s geometry—typically a windowed drum supporting a small dome or pyramidal roof—creates natural ventilation through thermal buoyancy while crowning the composition. American adoption transformed the cupola from monumental architectural feature into vernacular element, with barn cupolas providing critical hay-loft ventilation preventing spontaneous combustion of fermenting hay.',
    GRADUATE: 'The cupola embodies the intersection of environmental control, structural integration, and architectural expression. Analysis reveals sophisticated understanding of natural ventilation—cupola openings create pressure differentials driving air circulation throughout buildings. Structural considerations include wind loads on exposed elements and thermal movement where cupolas penetrate roof membranes. The cupola\'s symbolic dimension—crowning and completing compositions while suggesting authority or sanctity—explains its prevalence on capitol buildings, courthouses, and churches. The element\'s scaling from monumental (St. Peter\'s lantern) to vernacular (barn cupolas) demonstrates remarkable typological flexibility. Contemporary applications include daylighting strategies and passive cooling systems.',
    PHD: 'The cupola constitutes a significant element for examining relationships between environmental performance, structural innovation, and symbolic meaning in architecture. Scholarly research addresses multiple dimensions: building science studies quantifying ventilation performance through computational fluid dynamics, structural engineering examining lateral load resistance and connection details, architectural history tracing cupola typologies from Roman thermae through Renaissance villas to American vernacular buildings, and cultural analysis interpreting symbolic meanings. Recent work employs thermal imaging to document historic cupola performance, develops conservation strategies for deteriorating historic cupolas, and examines contemporary adaptations incorporating photovoltaics and active ventilation systems while maintaining traditional forms.',
  },

  history: {
    ELEMENTARY: 'Romans put little domed towers (cupolas) on top of their bathhouses long ago. Later, fancy Renaissance buildings had beautiful cupolas, and American farmers discovered that cupolas kept their barns cool and dry!',
    MIDDLE_SCHOOL: 'The cupola developed from Roman architecture, where small domes crowned interior spaces. Renaissance architects like Brunelleschi incorporated cupolas (lanterns) atop major domes. The element spread to northern Europe and eventually to America, where cupolas became standard features on barns, providing essential ventilation for stored hay and grain.',
    HIGH_SCHOOL: 'Cupola history traces from Roman precedents through Byzantine, Renaissance, and Baroque elaborations to vernacular American adoption. Roman baths featured cupolas for light and ventilation. Renaissance architecture developed the lantern—a windowed cupola crowning domes, exemplified by Brunelleschi\'s Florence Cathedral lantern (1436-1461). Baroque architects emphasized cupolas as compositional culminations. American architecture adopted cupolas widely—Thomas Jefferson designed cupolas for Monticello and the University of Virginia. Agricultural cupolas became standard on 19th-century barns, where they prevented hay fires by ventilating moist fermenting hay.',
    UNDERGRADUATE: 'The cupola\'s development reveals parallel evolution in monumental and vernacular contexts. Monumental cupolas evolved from Roman precedents (Pantheon oculus, bath cupolas) through Byzantine and Renaissance lanterns to Baroque compositional crowns. Renaissance theorists codified cupola design—Palladio\'s villas feature carefully proportioned cupolas integrating with overall compositions. Simultaneously, vernacular traditions developed practical cupolas for ventilation in diverse building types. American cupola proliferation in the 19th century served multiple functions: symbolic (capitol and courthouse cupolas marking civic authority), practical (barn ventilation), and aesthetic (completing residential compositions). Pattern books disseminated cupola designs widely, standardizing proportions and details.',
    GRADUATE: 'Cupola history encompasses technological, environmental, and symbolic dimensions. Ancient precedents demonstrate empirical understanding of natural ventilation and daylighting—Roman bath cupolas oriented to capture prevailing breezes. Renaissance development shows sophisticated integration of cupola design with overall compositional systems, with precise proportional relationships governing cupola sizing. The element\'s transmission to vernacular contexts involved functional reinterpretation—American barn cupolas addressed specific agricultural needs while maintaining aesthetic appeal. Scientific investigation of barn cupolas in the late 19th century quantified ventilation performance, informing design improvements. The cupola\'s 20th-century decline followed mechanical ventilation adoption, though recent sustainability interests have revived passive cupola strategies.',
    PHD: 'Scholarly analysis of cupola history employs diverse methodologies: building archaeology documenting construction techniques, environmental history examining changing ventilation strategies, cultural geography mapping cupola type distributions, and building performance simulation testing historical design assumptions. Research challenges simplistic functionalism, revealing how cupolas simultaneously served practical, aesthetic, and symbolic purposes. Studies of pattern book dissemination trace how standardized cupola designs spread nationally while local builders adapted them to regional materials and climates. Conservation research addresses common cupola deterioration patterns—water infiltration at roof penetrations, structural failure of exposed framing—developing appropriate intervention strategies. Contemporary work examines cupola integration with modern building systems, including natural ventilation enhancement and renewable energy harvesting.',
  },

  characteristics: [
    'Small domed structure on roof',
    'Windowed or louvered sides',
    'Provides ventilation and light',
    'Square, circular, or octagonal base',
    'Often crowned with dome or weathervane',
    'Can house bells or clocks',
  ],

  famousExamples: [
    { name: 'Florence Cathedral', location: 'Florence, Italy', year: '1436-1461', description: 'Brunelleschi\'s lantern crowning the dome' },
    { name: 'St. Peter\'s Basilica', location: 'Vatican City', year: '1590', description: 'Della Porta\'s lantern atop Michelangelo\'s dome' },
    { name: 'US Capitol', location: 'Washington D.C., USA', year: '1863', description: 'Cast iron cupola by Thomas U. Walter' },
    { name: 'Monticello', location: 'Charlottesville, Virginia', year: '1772-1809', description: 'Jefferson\'s octagonal cupola' },
    { name: 'Traditional American Barns', location: 'USA', year: '19th century', description: 'Vernacular ventilation cupolas' },
  ],

  confusionPairs: [
    {
      elementId: 'lantern',
      reason: 'Both are structures atop roofs or domes',
      distinction: 'Lantern specifically refers to windowed towers on domes; cupola is broader term including free-standing roof features',
    },
    {
      elementId: 'dome',
      reason: 'Cupolas have dome-shaped tops',
      distinction: 'Dome is a large hemispheric roof; cupola is a small structure sitting on top of a roof',
    },
  ],

  searchTags: ['roof', 'dome', 'tower', 'ventilation', 'barn', 'capitol', 'lantern', 'belvedere', 'top', 'crowning'],

  arMetadata: {
    modelPath: '/models/architecture/cupola.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Dome/Roof', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Windowed Drum', position: { x: 0, y: 0.6, z: 0 } },
      { label: 'Base', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Opening/Louvers', position: { x: 0.2, y: 0.6, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
