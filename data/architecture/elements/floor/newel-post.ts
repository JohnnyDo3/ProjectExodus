import type { ArchitecturalElement } from '../../types';

export const NEWEL_POST: ArchitecturalElement = {
  id: 'newel-post',
  slug: 'newel-post',
  name: 'Newel Post',
  alternativeNames: ['Newel', 'Post', 'Starting Post', 'Landing Newel'],
  pronunciation: {
    phonetic: 'NOO-uhl POHST',
    language: 'English',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'Kernel or nut (referring to the central core)',
    rootWord: 'From Old French "noel" via Latin "nucalis" (nut-like)',
  },
  category: 'FLOOR',
  subcategory: 'stair_parts',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'VICTORIAN', 'ARTS_AND_CRAFTS', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/newel-post-primary.jpg',
    gallery: [
      '/images/architecture/elements/newel-post-victorian.jpg',
      '/images/architecture/elements/newel-post-carved.jpg',
    ],
    diagram: '/images/architecture/diagrams/newel-post-parts.svg',
  },

  description: {
    ELEMENTARY: 'A newel post is the big, strong post at the bottom and top of stairs where the handrail begins or ends. It\'s much bigger than the little balusters in between. Some newel posts are carved with fancy shapes, and old ones sometimes had hollow tops where people hid treasures!',
    MIDDLE_SCHOOL: 'Newel posts are the main structural posts of a stair balustrade, located at the top, bottom, and turns of a staircase. They anchor the handrail and are typically larger and more decorative than the balusters between them. Victorian newels often featured elaborate turning, carving, and decorative finials.',
    HIGH_SCHOOL: 'The newel post provides principal structural support for the stair balustrade, anchoring the handrail at starting points, landings, and terminations. Construction types include box newels (hollow, built-up construction) and solid turned newels. Design traditions range from medieval simplicity through Renaissance classicism to Victorian exuberance. The term derives from the central column of a spiral stair.',
    UNDERGRADUATE: 'Newel post design addresses structural function, craft expression, and spatial marking. Structurally, newels must resist the accumulated lateral loads transferred through handrails-typically requiring substantial bolting to floor framing. Box newel construction enables hollow forms and raised panels, while solid newels showcase turning skills. Historically, the newel marks spatial transition and often incorporates symbolic ornament.',
    GRADUATE: 'Newel analysis encompasses structural mechanics, woodworking technology, and decorative vocabulary. Load calculations must account for code-specified lateral forces at handrail height. Historical investigation examines regional turning traditions, guild practices, and pattern book influence. The newel\'s symbolic role-guardian of the threshold-engages anthropological perspectives on domestic ritual and spatial hierarchy.',
    PHD: 'Research into newel posts engages craft history, material culture, and domestic spatial theory. Analysis examines the transmission of turning patterns through apprenticeship and published sources, the economics of custom versus catalog newels, and the newel\'s role in domestic ritual. Conservation challenges include structural repair methods and matching historic wood species and finishes.',
  },

  history: {
    ELEMENTARY: 'Newel posts have been around since medieval times when they were often just simple wooden posts. Over time, craftsmen started carving them into beautiful shapes. In Victorian times, they became super fancy with lots of decoration. The hollow ones sometimes hid the house deed!',
    MIDDLE_SCHOOL: 'Medieval spiral stairs gave us the term "newel" for their central posts. Wooden domestic newels developed through the Renaissance, becoming increasingly decorative. Georgian and Federal styles established classical proportions. Victorian technology-improved lathes and carving machines-enabled elaborate production. The 20th century saw both simplified modern newels and revival of traditional forms.',
    HIGH_SCHOOL: 'The newel evolved from the structural necessity of spiral stair central columns. Domestic wooden stairs developed separate post-and-baluster systems by the 15th century. Renaissance design applied classical orders. Georgian standardization created reproducible patterns. Industrial-era machinery enabled complex turned and carved forms at reduced cost. Arts and Crafts movement favored simpler, craft-based designs.',
    UNDERGRADUATE: 'Newel post history illuminates the intersection of structural necessity and decorative aspiration. The term\'s migration from spiral stair core to balustrade post reflects changing stair types. Pattern book dissemination-from Batty Langley through Asher Benjamin to Victorian catalogs-standardized forms while enabling regional variation. Industrial production challenged craft tradition while enabling middle-class access to ornamental work.',
    GRADUATE: 'Historical analysis of newels examines craft organization, technological change, and stylistic transmission. Guild regulation of stair building, the impact of pattern books on design, and the transition from craft to industrial production constitute key research areas. Regional variations-New England vs. Southern, English vs. Continental-reveal cultural attitudes toward domestic display.',
    PHD: 'Newel post research engages multiple methodologies: documentary analysis (probate inventories, trade catalogs), material investigation (species identification, tool marks), and spatial theory (threshold marking, domestic hierarchy). Current scholarship examines the newel\'s role in domestic ritual, gender and staircase space, and the survival of craft knowledge in industrial contexts.',
  },

  characteristics: [
    'Principal structural post of balustrade',
    'Located at stair start, turns, and end',
    'Larger than intermediate balusters',
    'Anchors handrail and supports lateral loads',
    'Box construction or solid turned',
    'Often topped with decorative finial',
    'May include raised panels or carving',
  ],

  famousExamples: [
    { name: 'Hardwick Hall Newels', location: 'Derbyshire, UK', year: '1590s', description: 'Elizabethan oak newels with carved heraldry' },
    { name: 'Drayton Hall', location: 'Charleston, USA', year: '1742', description: 'Georgian mahogany newels with classical details' },
    { name: 'Carson Mansion', location: 'Eureka, California, USA', year: '1886', description: 'Elaborate Victorian Queen Anne newels' },
    { name: 'Gamble House', location: 'Pasadena, USA', year: '1909', description: 'Greene & Greene Arts and Crafts newel design' },
    { name: 'Hill House', location: 'Helensburgh, Scotland', year: '1904', description: 'Mackintosh\'s geometric modernist newels' },
  ],

  confusionPairs: [
    {
      elementId: 'baluster',
      reason: 'Both are vertical balustrade elements',
      distinction: 'Newel posts are the larger structural posts at ends and turns; balusters are the smaller repetitive infill supports',
    },
    {
      elementId: 'column',
      reason: 'Both are vertical structural elements',
      distinction: 'Newel posts support handrails at staircases; columns are larger elements supporting beams and roofs',
    },
  ],

  searchTags: ['staircase', 'balustrade', 'post', 'Victorian', 'turned', 'carved', 'finial', 'structural'],

  arMetadata: {
    modelPath: '/models/architecture/newel-post.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Finial Cap', position: { x: 0, y: 1.2, z: 0 } },
      { label: 'Turned Body', position: { x: 0, y: 0.6, z: 0.15 } },
      { label: 'Base Block', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
