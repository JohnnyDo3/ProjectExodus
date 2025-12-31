import type { ArchitecturalElement } from '../../types';

export const BUILT_IN_BOOKCASE: ArchitecturalElement = {
  id: 'built-in-bookcase',
  slug: 'built-in-bookcase',
  name: 'Built-in Bookcase',
  alternativeNames: ['Fixed shelving', 'Library shelving', 'Wall of books'],
  pronunciation: {
    phonetic: 'BILT-in BOOK-kayss',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Permanently installed book storage',
    rootWord: 'built-in (integrated into structure) + bookcase (case for books)',
  },
  category: 'INTERIOR',
  subcategory: 'storage',
  periods: ['RENAISSANCE', 'BAROQUE', 'GEORGIAN', 'VICTORIAN', 'ARTS_AND_CRAFTS', 'CRAFTSMAN', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/built-in-bookcase-primary.jpg',
    gallery: [
      '/images/architecture/elements/bookcase-library.jpg',
      '/images/architecture/elements/bookcase-craftsman.jpg',
      '/images/architecture/elements/bookcase-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/bookcase-construction.svg',
  },

  description: {
    ELEMENTARY: 'A built-in bookcase is a set of shelves for books that is attached to the wall like it\'s part of the house. Unlike a bookcase you can move around, these shelves are built right into the room and can\'t be taken away. They often have fancy woodwork and can hold hundreds of books, making a whole wall into a library.',
    MIDDLE_SCHOOL: 'Built-in bookcases are permanent shelving systems integrated into a room\'s architecture, typically extending from floor to ceiling and fitted precisely to wall dimensions. Unlike freestanding furniture, they\'re constructed as part of the building, often featuring architectural details like crown molding, base trim, and decorative elements matching the room\'s style. They maximize storage efficiency, create architectural interest, and signal the room\'s function as a library or study.',
    HIGH_SCHOOL: 'Built-in bookcases represent the integration of furniture and architecture, transforming functional storage into spatial design. Construction typically involves floor-to-ceiling cabinetry with adjustable shelves, face frames creating visual rhythm, and architectural details (pilasters, cornices, bases) relating to room proportions. Material choices-solid wood, veneers, painted finishes-align with period styles and room formality. Design considerations include shelf span (preventing sag), depth (accommodating book sizes), and access (ladders for upper shelves). Prestigious examples incorporate specialized features like hidden doors, rotating sections, or climate control for rare books.',
    UNDERGRADUATE: 'Built-in bookcase design engages cabinetry, architectural composition, and spatial organization. Structural analysis addresses shelf support methods (dado joints, adjustable standards, concealed brackets), preventing deflection over spans, and attachment to walls. Proportional systems relate shelf module dimensions to room scale and classical orders. Material selection considers appearance, stability (solid wood vs. engineered products), and long-term performance. The relationship between bookcase design and room function-private study vs. public library, working collection vs. display-shapes design decisions. Contemporary practice ranges from traditional millwork to minimalist floating shelves and modular systems.',
    GRADUATE: 'Analysis of built-in bookcases encompasses furniture history, interior architecture, and cultural history of reading. Research addresses the evolution from monastic book cupboards through Renaissance studioli to Georgian libraries and Victorian domestic studies. Technical investigations examine joinery methods, material performance, and conservation challenges (shelf sag, finish deterioration, attachment failures). The social dimension-books as status symbols, libraries as masculine retreats, the decline of home libraries-reveals changing domestic practices. Conservation issues include maintaining historic millwork, accommodating contemporary needs (electrical outlets, task lighting), and preservation of book collections in historic settings.',
    PHD: 'Built-in bookcase scholarship engages multiple disciplines: furniture history (construction techniques and stylistic evolution), architectural history (the library as building type and room), social history (literacy, book ownership, domestic culture), and conservation science (material analysis and preservation strategies). Research questions include: How did book storage influence room design and house planning? What role did bookcases play in displaying learning and taste? How did mass-produced books and changing reading practices affect library design? Technical research addresses historic joinery methods, finish analysis, and structural assessment. Contemporary work examines the future of built-in bookcases in digital age, their heritage value, and their adaptation for contemporary mixed-media storage.',
  },

  history: {
    ELEMENTARY: 'Long ago, books were very expensive and rare, so only rich people and monasteries had them. They kept books in special locked boxes. As more books were made and more people learned to read, they needed shelves to hold their growing collections. Carpenters started building beautiful wooden bookcases right into the walls of libraries and studies, creating entire rooms dedicated to reading and learning.',
    MIDDLE_SCHOOL: 'Medieval books were stored in chests or on lecterns. Renaissance scholars developed studioli with book storage integrated into paneled rooms. The 18th century saw the development of the gentleman\'s library with floor-to-ceiling bookcases as architectural features. Victorian era expanded home libraries to middle-class houses. Arts and Crafts and Craftsman movements emphasized handcrafted built-in bookcases as architectural elements. Modernism sometimes eliminated traditional libraries, though contemporary design often includes built-in shelving for mixed media.',
    HIGH_SCHOOL: 'The evolution of built-in bookcases parallels the history of book ownership and literacy. Monastic libraries featured lecterns and armaria (wall cupboards). Renaissance private libraries integrated book storage with architectural paneling. The Enlightenment\'s expansion of learning created demand for larger personal libraries, leading to floor-to-ceiling bookcases as standard features in gentleman\'s studies. Pattern books by Chippendale, Sheraton, and others published library designs. The 19th century democratization of books led to built-in bookcases in middle-class homes. Arts and Crafts architects like Greene & Greene created bookcases as integrated architectural elements. Modernist architects sometimes relegated books to freestanding furniture, but contemporary design often features custom built-ins for books and media.',
    UNDERGRADUATE: 'Built-in bookcase history reflects changing technologies of book production, expanding literacy, and evolving domestic culture. The transition from manuscript to printed book (15th century) enabled larger personal collections. The development of architectural libraries as distinct room types (16th-17th centuries) established conventions for bookcase design. Georgian standardization created proportional systems relating shelf heights to classical orders. Victorian eclecticism produced elaborate carved and painted bookcases. The Arts and Crafts movement emphasized honest construction and visible joinery. Modern architects\' ambivalence toward traditional libraries (books as clutter vs. culture) produced varied approaches. Contemporary challenges include adapting historic libraries for digital age and designing flexible built-ins for changing media.',
    GRADUATE: 'Historical analysis of built-in bookcases illuminates intersections of material culture, social practice, and architectural design. Research addresses the development of specialized library furniture, the influence of pattern books on vernacular bookcases, and the relationship between book formats and shelf dimensions. The social history of reading-private study, family education, status display-shaped library design. Conservation research documents historic construction techniques, finish materials, and alteration histories. The economics of book ownership and library furniture production reveals class dimensions of architectural features. Theoretical work examines the library\'s role in domestic space, the tension between display and use in bookcase design, and the persistence of traditional library forms despite technological change.',
    PHD: 'Built-in bookcase scholarship encompasses architectural history, book history, social history, and conservation science. Research areas include: technical documentation of historic cabinetry methods, analysis of library planning and furniture design through pattern books and estate inventories, examination of the library\'s role in country house architecture, and investigation of reading practices and domestic culture. Conservation studies address structural assessment of historic millwork, appropriate restoration techniques, and environmental control for book preservation. Contemporary research questions include: What is the future of built-in bookcases in increasingly digital culture? How should historic libraries be adapted for contemporary use? What role do built-in bookcases play in residential character and property value? Cross-cultural studies examine library traditions in different architectural contexts.',
  },

  characteristics: [
    'Permanently attached to walls',
    'Typically floor-to-ceiling construction',
    'Custom-fitted to room dimensions',
    'Incorporates architectural details and moldings',
    'Multiple shelves, often adjustable',
    'May include cabinet base or glass-front upper sections',
    'Sometimes features library ladder access',
    'Signals room function as library or study',
  ],

  famousExamples: [
    { name: 'Long Room Library, Trinity College', location: 'Dublin, Ireland', year: '1732', description: 'Baroque library hall with two-story oak bookcases' },
    { name: 'George Peabody Library', location: 'Baltimore, USA', year: '1878', description: 'Five-tier cast iron and gilt bookcases in neo-Grec style' },
    { name: 'Gamble House Living Room', location: 'Pasadena, USA', year: '1908', description: 'Greene & Greene\'s Craftsman built-in bookcases with art glass and teak' },
    { name: 'Biltmore Estate Library', location: 'Asheville, USA', year: '1895', description: 'Walnut bookcases with spiral staircase and painted ceiling' },
    { name: 'Strahov Monastery Library', location: 'Prague, Czech Republic', year: '1679', description: 'Baroque library with ornate built-in walnut bookcases and frescoed ceiling' },
  ],

  confusionPairs: [
    {
      elementId: 'freestanding-bookcase',
      reason: 'Both are book storage furniture',
      distinction: 'Built-in bookcases are permanently attached to walls and custom-fitted; freestanding bookcases are movable furniture pieces',
    },
    {
      elementId: 'shelving',
      reason: 'Both provide shelf storage',
      distinction: 'Built-in bookcases are formal architectural cabinetry with finished details; shelving is more utilitarian storage',
    },
  ],

  searchTags: ['books', 'library', 'shelves', 'storage', 'study', 'reading room', 'cabinetry', 'millwork', 'literature'],

  arMetadata: {
    modelPath: '/models/architecture/built-in-bookcase.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Crown Molding', position: { x: 0, y: 2.4, z: 0.1 } },
      { label: 'Shelves', position: { x: 0, y: 1.2, z: 0.15 } },
      { label: 'Face Frame', position: { x: -0.6, y: 1.2, z: 0.02 } },
      { label: 'Base Cabinet', position: { x: 0, y: 0.3, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
