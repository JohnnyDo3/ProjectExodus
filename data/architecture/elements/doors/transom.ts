import type { ArchitecturalElement } from '../../types';

export const TRANSOM: ArchitecturalElement = {
  id: 'transom',
  slug: 'transom',
  name: 'Transom',
  alternativeNames: ['Transom Window', 'Fanlight', 'Overlight', 'Transom Light'],
  pronunciation: {
    phonetic: 'TRAN-sum',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Horizontal crosspiece dividing an opening',
    rootWord: 'transtrum (crossbeam)',
  },
  category: 'DOOR',
  subcategory: 'door_parts',
  periods: ['colonial-american', 'neoclassical', 'gothic-revival', 'beaux-arts', 'art-deco', 'modern'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/transom-primary.jpg',
    gallery: [
      '/images/architecture/elements/transom-fanlight.jpg',
      '/images/architecture/elements/transom-rectangular.jpg',
      '/images/architecture/elements/transom-stained-glass.jpg',
    ],
    diagram: '/images/architecture/diagrams/transom-detail.svg',
  },

  description: {
    ELEMENTARY: 'A transom is a special window above a door! It lets extra light into the room even when the door is closed. Some transoms can open to let fresh air in. You often see pretty glass designs in transoms, especially in old buildings.',
    MIDDLE_SCHOOL: 'The transom is a window positioned above a door within the same frame opening, separated by a horizontal member called the transom bar. Transoms provide additional natural light and ventilation while maintaining door privacy and security. Common types include fixed transoms, operable (hinged) transoms, and decorative fanlights. Materials range from clear glass to stained glass, etched glass, or decorative muntins creating patterns.',
    HIGH_SCHOOL: 'The transom window occupies the space above a door, spanning the full width of the door frame and separated by a horizontal structural member (the transom bar or head). This arrangement serves multiple functions: supplementing natural light, providing ventilation when operable, and offering decorative opportunities. Transom configurations vary widely-simple rectangular glazing in utilitarian contexts, semicircular fanlights in Federal and Georgian architecture, elaborate stained glass in Victorian buildings. In commercial architecture, especially early 20th-century office buildings, transoms enabled cross-ventilation in interior offices before air conditioning. The transom bar must support glazing weight while transferring loads from above to the door frame\'s vertical members.',
    UNDERGRADUATE: 'Transom design addresses functional and aesthetic considerations within constrained architectural spaces. Structurally, the transom bar (a horizontal member, typically 2-4 inches tall) divides the overall opening, bearing glazing weight and distributing overhead loads to side jambs. Functional types include: fixed transoms providing only light transmission; pivoting or hinged transoms for ventilation; and specialized configurations like semicircular fanlights common in Federal-period domestic architecture. Glazing choices range from utilitarian wire glass in commercial settings to elaborate leaded or stained glass in ecclesiastical and high-style residential work. The transom\'s proportional relationship to door height follows period-specific conventions-Georgian architecture typically used transom heights approximately one-fifth to one-sixth of total opening height.',
    GRADUATE: 'The transom represents a multifunctional architectural element whose design evolved with changing lighting, ventilation, and aesthetic priorities. In pre-electric domestic architecture, transoms maximized daylight penetration to interior spaces-Federal-period fanlights exemplify this, with radiating muntins creating decorative patterns while optimizing light distribution. Commercial architecture employed transoms extensively for interior office ventilation before mechanical systems, creating operable units enabling cross-ventilation and stack-effect air movement. Transom design encoded status and spatial hierarchies: elaborate stained glass marked important entrances, while simple glazing sufficed for utilitarian spaces. Modernist architecture\'s embrace of continuous glazing and mechanical ventilation reduced functional need for separate transoms, though contemporary sustainable design has renewed interest in operable transoms for natural ventilation strategies.',
    PHD: 'Scholarly analysis of transoms encompasses building technology history, environmental performance, and decorative arts. Research examines how transom design responded to pre-mechanical environmental control needs, traces stylistic evolution of fanlight and transom patterns through architectural pattern books, and investigates decorative glass production and installation techniques. Studies of early 20th-century commercial buildings document transom-based ventilation systems, while building science research quantifies natural ventilation and daylighting contributions. Conservation practice addresses appropriate glazing repair and replacement, historically accurate hardware restoration, and adaptation to contemporary building codes. Material culture analysis interprets decorative transom designs within broader aesthetic movements-Federal-period geometric fanlights, Victorian stained glass programs, Art Deco geometries-while contemporary sustainable design research reconsiders operable transoms for passive environmental control.',
  },

  history: {
    ELEMENTARY: 'Transoms have been used for hundreds of years! Before people had electric lights, transoms helped bring sunlight into dark rooms. Before air conditioning, people could open transoms to let fresh air flow through buildings. Many old houses and buildings still have their original transom windows.',
    MIDDLE_SCHOOL: 'Transoms appeared in American architecture during the Colonial period (1700s), with semicircular fanlights becoming popular in Federal and Georgian styles (1780s-1830s). Victorian architecture (1840s-1900s) featured elaborate stained glass transoms. Commercial buildings from the 1890s-1930s widely used operable transoms for office ventilation. Air conditioning reduced functional need by the mid-20th century, but transoms remained decorative features.',
    HIGH_SCHOOL: 'Transom history reflects evolving approaches to daylighting and ventilation. American Georgian and Federal architecture (1720s-1830s) popularized semicircular fanlights with radiating muntins, derived from English Palladian precedents. Pattern books by Asher Benjamin and Minard Lafever (1820s-1840s) disseminated fanlight designs throughout America. Victorian Gothic Revival introduced pointed transoms echoing medieval forms, while Victorian Italianate and Second Empire styles featured rectangular transoms with elaborate glazing. Commercial architecture boom (1890s-1920s) made operable transoms standard in office buildings for natural ventilation. Art Deco period created geometric transom designs. Widespread air conditioning adoption (1950s-1960s) eliminated functional necessity, causing decline. Contemporary sustainable design has renewed interest in operable transoms.',
    UNDERGRADUATE: 'Transom development illustrates relationships between building technology, environmental control, and architectural aesthetics. Colonial American architecture adapted English precedents, with fanlights appearing by the mid-18th century. Federal period (1780s-1820s) refined fanlight design, establishing proportional relationships and decorative patterns codified in builder\'s guides. These publications specified construction details-muntin profiles, glazing techniques, hardware for operable units. Victorian era diversified transom styles across revival movements while stained glass industry growth enabled elaborate decorative programs. Late 19th-century commercial architecture integrated transoms into systematic natural ventilation, with building manuals specifying transom dimensions for optimal airflow. Electric lighting and mechanical ventilation gradually reduced functional importance while transoms persisted as traditional features. Contemporary passive design strategies reconsider transom ventilation capabilities.',
    GRADUATE: 'Transom history reveals evolving building performance strategies and cultural aesthetics. Federal-period fanlights encoded neoclassical design principles and craftsman capabilities, with semicircular forms requiring specialized sash construction techniques documented in period trade literature. Victorian transom diversity reflected eclectic aesthetic preferences and industrial glass production advances-stained glass transoms demonstrated wealth and taste while factory-produced decorative glazing made ornament accessible to middle classes. Early 20th-century commercial transom systems embodied pre-mechanical environmental control knowledge, with building engineers calculating transom areas for ventilation loads. Modern movement rejected transom-over-door composition as historically derivative, preferring continuous glazing. Contemporary sustainable architecture reassesses transoms within natural ventilation and daylighting strategies, addressing conflicts between historic forms and modern performance requirements including acoustic isolation and energy codes.',
    PHD: 'Scholarly engagement with transoms employs multiple methodological frameworks: architectural history tracing stylistic evolution through pattern books and built examples, building science analyzing environmental performance through computational fluid dynamics and daylighting simulations, decorative arts history examining stained glass production and iconography, and preservation practice addressing conservation ethics and technical interventions. Research questions include: How did transom design encode social status and room hierarchy? What relationships existed between pattern book dissemination and regional variations? How did commercial building engineers calculate transom-based ventilation? Recent scholarship applies digital documentation techniques to record historic transom designs, investigates relationships between transom glazing and interior lighting quality, and examines contemporary applications balancing historic precedent with performance requirements. Material culture studies interpret decorative transom programs within broader Victorian visual culture.',
  },

  characteristics: [
    'Window positioned above door',
    'Separated by horizontal transom bar',
    'Full width of door opening',
    'May be fixed or operable',
    'Provides light and ventilation',
    'Often decorative-fanlights, stained glass',
    'Common in historic architecture',
  ],

  famousExamples: [
    { name: 'Monticello', location: 'Virginia, USA', year: '1772-1809', description: 'Jefferson\'s home features Federal-style fanlights over entry doors' },
    { name: 'Independence Hall', location: 'Philadelphia, USA', year: '1753', description: 'Georgian architecture with characteristic transom windows' },
    { name: 'Rookery Building', location: 'Chicago, Illinois', year: '1888', description: 'Commercial building with extensive ornamental transoms' },
    { name: 'Boston Public Library', location: 'Boston, Massachusetts', year: '1895', description: 'McKim, Mead & White design with elaborate transoms' },
    { name: 'Wainwright Building', location: 'St. Louis, Missouri', year: '1890-1891', description: 'Louis Sullivan skyscraper with decorative transoms' },
  ],

  confusionPairs: [
    {
      elementId: 'fanlight',
      reason: 'Fanlight is a type of transom',
      distinction: 'Fanlight specifically refers to semicircular transoms with radiating muntins; transom is the general term for any window above a door',
    },
    {
      elementId: 'clerestory',
      reason: 'Both are elevated windows for light',
      distinction: 'Transoms are above doors; clerestory windows are high on walls, typically above eye level in tall spaces',
    },
  ],

  searchTags: ['window', 'transom', 'fanlight', 'door', 'ventilation', 'light', 'semicircular', 'stained glass', 'overlight'],

  arMetadata: {
    modelPath: '/models/architecture/transom.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Transom Window', position: { x: 0, y: 0.85, z: 0 } },
      { label: 'Transom Bar', position: { x: 0, y: 0.75, z: 0 } },
      { label: 'Door Below', position: { x: 0, y: 0.4, z: 0 } },
      { label: 'Glazing', position: { x: 0.2, y: 0.85, z: 0.02 } },
      { label: 'Muntins (if present)', position: { x: -0.15, y: 0.85, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
