import type { ArchitecturalElement } from '../../types';

export const POCKET_DOOR: ArchitecturalElement = {
  id: 'pocket-door',
  slug: 'pocket-door',
  name: 'Pocket Door',
  alternativeNames: ['Sliding Pocket Door', 'Recessed Sliding Door', 'Disappearing Door'],
  pronunciation: {
    phonetic: 'PAH-kit door',
    language: 'English',
  },
  etymology: {
    origin: 'American English',
    meaning: 'Door that slides into a wall pocket or cavity',
    rootWord: 'pocket (concealed cavity)',
  },
  category: 'DOOR',
  subcategory: 'door_types',
  periods: ['neoclassical', 'beaux-arts', 'modern', 'contemporary'],
  regions: ['North America', 'Europe', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/pocket-door-primary.jpg',
    gallery: [
      '/images/architecture/elements/pocket-door-victorian.jpg',
      '/images/architecture/elements/pocket-door-modern.jpg',
      '/images/architecture/elements/pocket-door-double.jpg',
    ],
    diagram: '/images/architecture/diagrams/pocket-door-detail.svg',
  },

  description: {
    ELEMENTARY: 'A pocket door slides sideways into the wall instead of swinging open! It disappears into a hidden space in the wall called a "pocket." This is great for small rooms where a swinging door would take up too much space.',
    MIDDLE_SCHOOL: 'The pocket door operates on a track system, sliding horizontally into a concealed cavity within the wall structure. When fully open, the door disappears completely into the wall pocket, eliminating the floor space required by swinging doors. The system includes an overhead track, wheeled hangers, and a hollow wall section (pocket) to receive the door. Pocket doors became popular in Victorian homes for dividing parlors and dining rooms.',
    HIGH_SCHOOL: 'Pocket door mechanisms consist of an overhead track mounted to a header beam, wheeled hangers supporting the door panel, and a specially framed wall pocket typically requiring 2x6 or 2x4 wall construction with additional blocking. The door slides on metal wheels or roller bearings, guided by floor guides or bottom tracks. Installation requires careful framing to create the pocket cavity-a hollow space equal to the door width plus clearances. Victorian and Edwardian architecture popularized pocket doors for connecting formal rooms, allowing flexible space configuration. Modern variations include soft-close mechanisms and concealed tracks.',
    UNDERGRADUATE: 'Pocket door design addresses space efficiency through elimination of door swing radius, enabling room layout flexibility. The system requires specialized rough framing: a split header to support wall loads around the pocket opening, vertical framing creating the cavity, and additional blocking for track mounting. Hardware includes overhead tracks (single or double depending on door weight), wheeled or roller-bearing hangers, edge pulls or flush pulls, and optional soft-close dampers. Historically, pocket doors appeared in American architecture by the 1850s, proliferating during the late Victorian period (1870s-1900) when double parlors and dining room separation was fashionable. Decline occurred mid-20th century with open-plan preferences, followed by contemporary revival addressing accessibility and space optimization.',
    GRADUATE: 'The pocket door represents a mechanical solution to spatial efficiency that alternately aligned with and contradicted evolving domestic planning ideologies. Victorian-era adoption reflected formal space hierarchies requiring physical separation with occasional connection-pocket doors enabled parlors to merge for entertaining while maintaining daily separation. The technology demanded sophisticated millwork and hardware manufacturing, becoming affordable through industrial production. Modernist open-plan ideology rendered pocket doors obsolete by the 1950s-60s. Contemporary revival reflects contradictory forces: desires for flexible space in smaller urban dwellings, accessibility improvements over swinging doors, and aesthetic minimalism. Modern engineering addresses historical problems-poor sound isolation, difficult maintenance, tendency to derail-through improved hardware and construction techniques.',
    PHD: 'Scholarly analysis of pocket doors encompasses technological history, domestic space theory, and accessibility studies. Research examines hardware evolution from Victorian cast-iron systems through mid-century decline to contemporary stainless-steel mechanisms, investigates how pocket doors mediated Victorian spatial practices around gender, privacy, and social performance, and addresses acoustic performance deficiencies. Archaeological studies of historic houses document original installation techniques and hardware sources. Conservation practice grapples with appropriate restoration versus modernization. Contemporary research applies universal design principles to improve accessibility, develops sound-isolation strategies, and examines pocket doors within broader patterns of flexible domestic space. Material culture analysis interprets decorative hardware as status indicators and style markers.',
  },

  history: {
    ELEMENTARY: 'Pocket doors were invented about 170 years ago when houses started having more rooms. People wanted to separate rooms sometimes and connect them other times. Pocket doors let you slide the door into the wall when you needed more space!',
    MIDDLE_SCHOOL: 'Pocket doors appeared in American architecture around the 1850s as Victorian houses grew larger and more compartmentalized. The technology became affordable through industrial production of standardized hardware. Victorian and Edwardian homes (1850s-1910s) commonly used pocket doors between parlors, libraries, and dining rooms. Usage declined mid-20th century with open-plan designs, but pocket doors have returned in contemporary architecture.',
    HIGH_SCHOOL: 'The pocket door emerged in mid-19th century America as architectural planning grew more sophisticated and industrial production made complex hardware affordable. Patent records show pocket door mechanisms appearing in the 1840s-1850s. The form reached peak popularity during the Victorian era (1870s-1900) when double parlors-front and back parlors separated by pocket doors-became standard in middle-class homes. Edwardian architecture continued the tradition. Modernist preferences for open planning caused decline by the 1940s-1950s. Contemporary revival began in the 1980s-1990s, driven by urban space constraints and accessibility considerations.',
    UNDERGRADUATE: 'Pocket door development parallels industrialization of building components and evolving domestic spatial ideologies. Early examples required custom millwork and expensive imported hardware. By the 1870s, American manufacturers including P. & F. Corbin and Stanley Works produced standardized pocket door hardware through mass production, democratizing the technology. Victorian spatial planning valued flexible room division-pocket doors enabled formal parlors to merge for social events while maintaining daily separation. The technology\'s decline reflected shifting ideologies: mid-century modernism rejected Victorian compartmentalization, while construction cost pressures favored simpler swing doors. Late 20th century revival addressed urban density, accessibility requirements, and aesthetic minimalism, with manufacturers developing improved hardware addressing historical maintenance issues.',
    GRADUATE: 'The pocket door\'s historical arc reveals relationships between building technology, social practice, and architectural ideology. Victorian adoption reflected specific cultural formations: bourgeois domesticity requiring formal/informal space separation, gender-segregated spatial practices (separate parlors for mixed and female company), and industrial capacity enabling complex hardware production. The mechanism\'s material requirements-precise millwork, quality hardware, skilled installation-encoded class distinctions while mass production gradually democratized access. Modernist rejection of pocket doors represented ideological opposition to Victorian values and practical preferences for construction economy. Contemporary recovery reflects paradoxical contemporary forces: urban density demanding space efficiency, accessibility movements promoting sliding over swinging doors, and aesthetic preferences for concealed rather than exposed doors, alongside practical problems including poor sound isolation and maintenance difficulty.',
    PHD: 'Scholarly engagement with pocket doors employs multiple methodological approaches: technological history tracing hardware evolution through patent records and manufacturer catalogs, architectural history examining pocket doors within Victorian spatial planning, material culture studies interpreting decorative hardware as cultural artifacts, and feminist analysis investigating gendered spatial practices. Research addresses questions including: how did pocket door technology intersect with Victorian social performance and privacy norms? What relationships existed between hardware quality and social status? How did construction trades adapt to pocket door installation requirements? Contemporary scholarship applies building science to acoustic performance problems, employs conservation ethics to guide restoration decisions, and investigates pocket doors within universal design frameworks addressing accessibility and aging-in-place.',
  },

  characteristics: [
    'Slides horizontally into wall cavity',
    'Disappears when fully open',
    'Operates on overhead track system',
    'Requires special wall framing',
    'Space-saving alternative to swing door',
    'Often used in pairs (double pocket doors)',
    'Minimal floor and wall clearance needed',
  ],

  famousExamples: [
    { name: 'Carson Mansion', location: 'Eureka, California', year: '1884-1886', description: 'Elaborate Victorian mansion with ornate pocket doors throughout' },
    { name: 'Biltmore Estate', location: 'Asheville, North Carolina', year: '1889-1895', description: 'Gilded Age mansion featuring massive pocket doors in formal rooms' },
    { name: 'The Breakers', location: 'Newport, Rhode Island', year: '1893-1895', description: 'Vanderbilt mansion with elaborate carved pocket doors' },
    { name: 'Gamble House', location: 'Pasadena, California', year: '1908-1909', description: 'Arts and Crafts masterpiece with custom mahogany pocket doors' },
    { name: 'Glessner House', location: 'Chicago, Illinois', year: '1887', description: 'H.H. Richardson design with characteristic pocket doors' },
  ],

  confusionPairs: [
    {
      elementId: 'sliding-door',
      reason: 'Both doors slide rather than swing',
      distinction: 'Pocket doors slide into wall cavity and disappear; sliding doors remain visible, sliding along wall surface',
    },
    {
      elementId: 'barn-door',
      reason: 'Both are sliding door systems',
      distinction: 'Pocket doors conceal into wall pocket; barn doors slide on exposed track mounted on wall surface',
    },
  ],

  searchTags: ['door', 'pocket', 'sliding', 'Victorian', 'space-saving', 'concealed', 'track', 'parlor', 'cavity', 'disappearing'],

  arMetadata: {
    modelPath: '/models/architecture/pocket-door.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Overhead Track', position: { x: 0, y: 0.95, z: 0 } },
      { label: 'Door Panel', position: { x: -0.3, y: 0.5, z: 0 } },
      { label: 'Wall Pocket Cavity', position: { x: 0.4, y: 0.5, z: -0.1 } },
      { label: 'Wheeled Hanger', position: { x: -0.2, y: 0.9, z: 0 } },
      { label: 'Edge Pull', position: { x: -0.45, y: 0.5, z: 0.05 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
