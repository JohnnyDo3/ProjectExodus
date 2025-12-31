import type { ArchitecturalElement } from '../../types';

export const WAINSCOT: ArchitecturalElement = {
  id: 'wainscot',
  slug: 'wainscot',
  name: 'Wainscot',
  alternativeNames: ['Wainscoting', 'Wall Paneling', 'Dado Panel', 'Chair Rail with Panels'],
  pronunciation: {
    phonetic: 'WAYNE-skaht or WAYNE-skut',
    language: 'English',
  },
  etymology: {
    origin: 'Dutch/German',
    meaning: 'Wagon oak or wall oak',
    rootWord: 'From Dutch "wagenschot" (wagon partition) or Middle Low German "wagenschot"',
  },
  category: 'WALL',
  subcategory: 'wall_features',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'GEORGIAN', 'VICTORIAN', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'COLONIAL_TERRITORIES'],

  images: {
    primary: '/images/architecture/elements/wainscot-primary.jpg',
    gallery: [
      '/images/architecture/elements/wainscot-raised-panel.jpg',
      '/images/architecture/elements/wainscot-beadboard.jpg',
    ],
    diagram: '/images/architecture/diagrams/wainscot-types.svg',
  },

  description: {
    ELEMENTARY: 'Wainscoting is wood paneling that covers the lower part of a wall, usually about waist-high. It\'s like giving the bottom half of your wall a wooden coat! Originally it protected walls from chairs bumping into them and made rooms warmer. Today people use it to make rooms look fancy and traditional.',
    MIDDLE_SCHOOL: 'Wainscoting consists of decorative wood panels installed on the lower portion of interior walls, typically 3-4 feet high. Types include raised panel (traditional), flat panel (Shaker style), beadboard (vertical grooves), and board-and-batten. A chair rail molding usually caps the wainscoting. Originally practical (wall protection, insulation), wainscoting is now primarily decorative.',
    HIGH_SCHOOL: 'Wainscot design integrates panel construction, proportional relationships, and interior character. Traditional raised-panel wainscoting features frame-and-panel construction allowing wood movement. The dado (lower wall zone) typically rises 1/3 to 2/5 of wall height, capped by a chair rail. Panel proportions follow classical ratios. Installation requires understanding wood expansion, proper backing, and integration with baseboards and cornices. Contemporary applications include MDF and vinyl alternatives.',
    UNDERGRADUATE: 'Wainscoting represents the architectural articulation of the wall\'s lower zone (dado) through paneling systems. Historical precedents include English oak paneling (medieval great halls), French boiserie (elaborate carved panels), and American colonial simplicity. Construction methods evolved from solid wood frame-and-panel (accommodating seasonal movement) to modern sheet materials. Design considerations include scale relationships, panel proportions, molding profiles, and integration with room architecture. Contemporary practice ranges from traditional reproduction to minimalist reinterpretation.',
    GRADUATE: 'Wainscot analysis encompasses joinery technology, spatial proportion, and interior preservation. Research examines historical construction techniques-mortise-and-tenon frames, floating panels, applied moldings-and regional stylistic variations. Contemporary investigations address moisture management, sustainable materials, and the role of wainscoting in defining interior character. Conservation work confronts paint archaeology (revealing historic finishes), structural repairs, and balancing preservation with accessibility and building systems integration.',
    PHD: 'Wainscoting scholarship engages material culture studies, architectural conservation, and craft history. Research programs examine the social meaning of paneled interiors, the economics of joinery trades, and the transmission of decorative vocabularies across regions. Current investigations address conservation science (paint analysis, wood species identification), the environmental performance of paneling systems, and the contemporary role of traditional millwork in sustainable interior design. Digital humanities approaches analyze pattern books and trade catalogs.',
  },

  history: {
    ELEMENTARY: 'Long ago in Europe, people covered their walls with wood panels to keep rooms warm and protect the walls from damage. Rich people had fancy carved panels while regular people had simpler ones. When Europeans came to America, they brought wainscoting with them. Today people still use it to make rooms look traditional and elegant.',
    MIDDLE_SCHOOL: 'Medieval European great halls featured oak wainscoting for warmth and protection. Renaissance and Baroque periods developed elaborate carved and painted panels (boiserie). English Georgian architecture established raised-panel wainscoting proportions. American colonists adapted European styles with available woods. Victorian era saw mass-production of milled wainscoting. Modern movement rejected applied ornament, but traditional wainscoting revived in postmodern and traditional architecture.',
    HIGH_SCHOOL: 'Wainscoting evolved from medieval functional wall protection to Renaissance decorative art. English Tudor and Jacobean oak paneling established frame-and-panel construction. French Louis XIV boiserie achieved sculptural complexity. English Georgian architecture codified proportional relationships between dado, field, and cornice. American colonists developed regional variations-simple raised panels in New England, more elaborate in Southern plantation houses. Industrial revolution enabled mass-produced millwork. Arts and Crafts movement revived handcraft. Contemporary practice spans reproduction and abstraction.',
    UNDERGRADUATE: 'Wainscoting history traces evolving joinery technology, changing stylistic vocabularies, and shifting social meanings. Medieval linenfold panels imitated draped fabric. Renaissance panels incorporated classical motifs-pilasters, cartouches, grotesques. Palladio and subsequent theorists codified proportional systems. Industrial mechanization transformed production from bespoke craft to catalog products. Modernist rejection of applied ornament eliminated wainscoting from progressive design. Postmodernism and New Urbanism revived traditional millwork as part of broader historical engagement.',
    GRADUATE: 'Historical analysis of wainscoting examines craft organization, pattern transmission, and cultural meaning. Research addresses guild training systems, the role of pattern books in standardizing designs, and regional variations reflecting wood availability and ethnic traditions. Conservation scholarship investigates original finishes (oils, waxes, paints), structural repairs for damaged frames, and documentation of significant interiors. Contemporary research examines sustainable alternatives to tropical hardwoods and the role of millwork in defining interior character.',
    PHD: 'Wainscoting historiography engages material culture, craft history, and architectural conservation. Research programs examine the social construction of domestic interiors, the economics of millwork trades, and the circulation of designs through pattern books and artisan migration. Scientific analysis addresses wood species identification, paint stratigraphy, and adhesive technology. Current scholarship investigates the environmental impact of millwork production and explores how traditional paneling systems can contribute to sustainable, healthy interiors through material selection and craft durability.',
  },

  characteristics: [
    'Wood paneling on lower wall section',
    'Typically 3-4 feet (36-48 inches) high',
    'Capped with chair rail molding',
    'Common types: raised panel, flat panel, beadboard',
    'Frame-and-panel construction accommodates wood movement',
    'Traditionally oak, pine, or walnut',
    'Protects walls and adds insulation',
  ],

  famousExamples: [
    { name: 'Hampton Court Palace Great Hall', location: 'London, England', year: '1532-1535', description: 'Tudor oak linenfold paneling throughout' },
    { name: 'Palace of Versailles Hall of Mirrors', location: 'Versailles, France', year: '1678-1684', description: 'Elaborate gilded boiserie panels' },
    { name: 'Drayton Hall', location: 'Charleston, South Carolina, USA', year: '1738-1742', description: 'Georgian raised-panel wainscoting in American Palladian house' },
    { name: 'Morris-Jumel Mansion', location: 'New York City, USA', year: '1765', description: 'Colonial-era wainscoting with original paint finishes' },
    { name: 'Gamble House', location: 'Pasadena, California, USA', year: '1908', description: 'Arts and Crafts teak and oak paneling by Greene and Greene' },
  ],

  confusionPairs: [
    {
      elementId: 'dado',
      reason: 'Both refer to the lower wall zone',
      distinction: 'Dado is the architectural zone (lower third of wall); wainscoting is the wood paneling applied to that zone',
    },
    {
      elementId: 'chair-rail',
      reason: 'Both are horizontal wall elements',
      distinction: 'Chair rail is the horizontal molding capping the wainscoting; wainscoting is the full panel system below it',
    },
    {
      elementId: 'paneling',
      reason: 'Both involve wood panels on walls',
      distinction: 'Wainscoting specifically covers the lower wall portion; paneling can cover entire walls from floor to ceiling',
    },
  ],

  searchTags: ['panel', 'wood', 'interior', 'wall', 'traditional', 'chair-rail', 'dado', 'millwork', 'joinery'],

  arMetadata: {
    modelPath: '/models/architecture/wainscot.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Chair Rail Cap', position: { x: 0, y: 1.0, z: 0.05 } },
      { label: 'Raised Panels', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Baseboard', position: { x: 0, y: 0.1, z: 0.05 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
