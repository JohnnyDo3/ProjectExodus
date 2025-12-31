import type { ArchitecturalElement } from '../../types';

export const DADO: ArchitecturalElement = {
  id: 'dado',
  slug: 'dado',
  name: 'Dado',
  alternativeNames: ['Die', 'Wall Dado', 'Lower Wall Zone', 'Chair Rail Height'],
  pronunciation: {
    phonetic: 'DAY-doh',
    language: 'English',
  },
  etymology: {
    origin: 'Italian',
    meaning: 'Cube or die',
    rootWord: 'From Italian "dado" (cube, die), referring to the cubic middle section of a pedestal',
  },
  category: 'WALL',
  subcategory: 'wall_features',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'VICTORIAN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/dado-primary.jpg',
    gallery: [
      '/images/architecture/elements/dado-painted.jpg',
      '/images/architecture/elements/dado-tiled.jpg',
    ],
    diagram: '/images/architecture/diagrams/dado-proportions.svg',
  },

  description: {
    ELEMENTARY: 'The dado is the lower part of a wall, usually about waist-high or a bit higher. Imagine your wall divided into three parts like a sandwich: the bottom part is the dado! People often paint it a different color or cover it with wood panels or wallpaper. This makes rooms look fancier and protects the wall from getting bumped and dirty.',
    MIDDLE_SCHOOL: 'In interior architecture, the dado is the lower section of a wall, typically extending from the floor to about 3-4 feet (roughly chair-back height). The wall is conceptually divided into three zones: dado (bottom), field (middle), and frieze/cornice (top). The dado is often treated differently from the upper wall-painted a darker color, covered with paneling (wainscoting), or protected with a dado rail (chair rail) at its top edge.',
    HIGH_SCHOOL: 'The dado represents the systematic tripartite division of interior walls, analogous to the base-shaft-capital organization of classical columns. Proportionally, the dado typically occupies the lower 1/3 to 2/5 of wall height. Material treatments vary: painted finishes (often darker than the field), wall paneling, tile, or fabric. The dado rail (chair rail molding) caps the dado and protects the wall from chair backs. In classical interiors, this division followed proportional systems derived from the orders. Contemporary design uses dado divisions for visual interest and practical protection.',
    UNDERGRADUATE: 'Dado design integrates proportional theory, material durability, and interior composition. The term derives from pedestal design (base-dado-cap), applied metaphorically to wall treatment. Renaissance theorists (Serlio, Palladio) codified proportional relationships between dado, field, and cornice heights, often relating them to room dimensions and classical orders. Material differentiation serves both protective (lower wall receives more wear) and compositional (visual weight, color contrast) functions. Victorian practice developed elaborate dado schemes with multiple moldings. Modernist universal surfaces rejected the dado division, though contemporary practice revives it.',
    GRADUATE: 'Dado analysis encompasses proportional systems, material culture, and conservation practice. Historical research examines evolving proportional canons-how dado heights related to furniture dimensions, classical orders, and room proportions. Material investigations address historic finishes: faux marbling, specialty paints, gilded leather, and fabric wall coverings. Conservation challenges include documenting layered paint schemes, preserving fragile finishes, and adapting historic interiors to accessibility requirements (handrails often installed at dado rail height). Contemporary research examines the dado\'s role in defining interior character and managing maintenance in high-traffic zones.',
    PHD: 'Dado scholarship engages architectural theory, decorative arts history, and conservation science. Research programs investigate the transmission of proportional systems across periods and regions, the social meaning of elaborate dado treatments, and the economics of interior finishing trades. Scientific analysis includes paint stratigraphy (revealing chronology of finishes), substrate analysis (plaster composition), and performance testing (durability, cleanability). Current scholarship addresses sustainable approaches to dado treatment, balancing traditional aesthetics with low-VOC materials, and the dado\'s potential in contemporary interior design for defining space and managing wear.',
  },

  history: {
    ELEMENTARY: 'The idea of dividing walls into sections came from ancient Rome, where they decorated different parts of walls with different colors and patterns. During the Renaissance, architects studied Roman buildings and brought back this idea. Victorian homes had very fancy dados with wallpaper, wood panels, and special moldings. Today, many people use dados to add style and protect their walls.',
    MIDDLE_SCHOOL: 'Roman wall paintings (Pompeii) demonstrated tripartite wall division: dado, main field, and upper frieze. Renaissance architects revived this, connecting wall proportions to classical column orders. Baroque and Rococo periods developed elaborate dado treatments with marble, painting, or carving. Victorian era popularized dados in middle-class homes-practical (protecting wallpaper from damage) and fashionable. Modernism rejected decorative divisions for plain surfaces. Contemporary traditional design continues dado treatments.',
    HIGH_SCHOOL: 'The dado\'s history traces from Roman precedent through Renaissance codification to widespread Victorian adoption. Pompeian frescoes showed clear dado-field-frieze divisions. Renaissance theorists (Serlio\'s architectural treatise, 1537) formalized proportional relationships. English Georgian architecture refined dado rail profiles and proportions. Victorian industrialization enabled mass-produced moldings and wallpapers, democratizing dado treatments. Arts and Crafts movement developed integrated wall schemes with dados. Modernism eliminated applied ornament, including dados. Postmodern and traditional architecture revived dado divisions.',
    UNDERGRADUATE: 'Dado history reveals evolving design theory and changing domestic practices. Ancient Roman wall divisions (four-style Pompeian fresco systems) influenced Renaissance revival. Palladio\'s treatise (1570) related wall divisions to room proportions and orders. Eighteenth-century English pattern books disseminated dado designs. Victorian chromolithography enabled elaborate wallpaper dados. The dado rail emerged partially from chair-back protection needs (hence "chair rail"), though historical evidence suggests symbolic and compositional roles dominated. Modernist rejection of decoration eliminated dados from progressive design. Contemporary revival engages both preservation and new traditional design.',
    GRADUATE: 'Historical analysis of dados examines the interplay of proportional theory, material technology, and social aspiration. Research addresses how Renaissance theorists transmitted Roman precedents, how the dado related to furniture heights and room proportions, and how industrialization transformed dado treatments from bespoke craft to catalog products. Conservation scholarship investigates original dado treatments-paint analysis reveals multiple campaigns, material analysis identifies historic substrates. Contemporary research examines the dado\'s continued relevance in defining interior character, managing wear in circulation spaces, and creating visual interest in contemporary interiors.',
    PHD: 'Dado historiography engages design theory, material culture studies, and conservation science. Research programs investigate the social construction of domestic interiors-how dado treatments signaled status and fashion-and the circulation of design ideas through pattern books, trade catalogs, and artisan networks. Scientific investigation employs paint stratigraphy, fiber analysis (wallpaper, fabrics), and adhesive characterization. Current scholarship addresses sustainable dado treatments using low-impact materials, the dado\'s role in contemporary accessible design (as handrail location), and evidence-based approaches to historic dado reconstruction in museum and heritage settings.',
  },

  characteristics: [
    'Lower zone of a tripartite wall division',
    'Typically 1/3 to 2/5 of wall height (3-4 feet)',
    'Capped by dado rail or chair rail',
    'Often treated differently than upper wall',
    'Common treatments: paneling, paint, tile, wallpaper',
    'Protects wall from furniture and traffic',
    'Follows proportional relationships to room and orders',
  ],

  famousExamples: [
    { name: 'House of the Vettii', location: 'Pompeii, Italy', year: '1st century CE', description: 'Roman frescoed walls with clear dado-field-frieze divisions' },
    { name: 'Palazzo Farnese', location: 'Rome, Italy', year: '1534-1589', description: 'Renaissance dado zones with painted grotesques' },
    { name: 'Palace of Versailles Royal Apartments', location: 'Versailles, France', year: '17th century', description: 'Marble dados in state rooms' },
    { name: 'Linley Sambourne House', location: 'London, England', year: '1874-1910', description: 'Victorian aesthetic movement dado with wallpaper and panels' },
    { name: 'The Morgan Library', location: 'New York City, USA', year: '1906', description: 'Neoclassical wood-paneled dados by McKim, Mead & White' },
  ],

  confusionPairs: [
    {
      elementId: 'wainscot',
      reason: 'Both refer to lower wall treatments',
      distinction: 'Dado is the architectural zone (lower wall area); wainscoting is the wood paneling material applied to the dado',
    },
    {
      elementId: 'plinth',
      reason: 'Both are base elements',
      distinction: 'Plinth is the bottom block of columns or buildings; dado is the lower zone of interior walls',
    },
    {
      elementId: 'baseboard',
      reason: 'Both are at the bottom of walls',
      distinction: 'Baseboard is the trim molding at floor level; dado is the entire lower wall zone extending up to chair rail height',
    },
  ],

  searchTags: ['wall', 'lower', 'zone', 'chair-rail', 'wainscot', 'paint', 'interior', 'proportion', 'classical'],

  arMetadata: {
    modelPath: '/models/architecture/dado.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Dado Rail / Chair Rail', position: { x: 0, y: 1.0, z: 0.05 } },
      { label: 'Dado Zone', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Baseboard', position: { x: 0, y: 0.05, z: 0.05 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
