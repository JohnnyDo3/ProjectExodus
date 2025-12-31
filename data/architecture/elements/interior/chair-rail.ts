import type { ArchitecturalElement } from '../../types';

export const CHAIR_RAIL: ArchitecturalElement = {
  id: 'chair-rail',
  slug: 'chair-rail',
  name: 'Chair Rail',
  alternativeNames: ['Dado rail', 'Wall rail', 'Surbase'],
  pronunciation: {
    phonetic: 'CHAIR RAYL',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Rail protecting wall from chairs',
    rootWord: 'chair + rail (horizontal bar)',
  },
  category: 'INTERIOR',
  subcategory: 'moldings',
  periods: ['GEORGIAN', 'FEDERAL', 'VICTORIAN', 'EDWARDIAN', 'COLONIAL_REVIVAL', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'BRITISH_COLONIES'],

  images: {
    primary: '/images/architecture/elements/chair-rail-primary.jpg',
    gallery: [
      '/images/architecture/elements/chair-rail-georgian.jpg',
      '/images/architecture/elements/chair-rail-victorian.jpg',
      '/images/architecture/elements/chair-rail-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/chair-rail-installation.svg',
  },

  description: {
    ELEMENTARY: 'A chair rail is a strip of wood that runs along the wall about three feet up from the floor. It was invented to protect walls from getting scratched when people pushed their chairs back. It also makes rooms look nicer by dividing the wall into two parts that can be painted different colors.',
    MIDDLE_SCHOOL: 'The chair rail is a horizontal molding installed on interior walls typically 32-36 inches above the floor, originally serving to protect wall surfaces from chair backs. Beyond this practical function, chair rails provide visual proportion by dividing walls into distinct zones-the dado (lower portion) and the field (upper portion)-which can receive different treatments such as paint colors, wallpaper, or paneling.',
    HIGH_SCHOOL: 'Chair rails represent the interior application of classical base-shaft-capital proportioning systems. Positioned at approximately one-third of wall height, they create horizontal datum lines that organize wall compositions. The molding itself typically combines ovolo, cyma, and flat elements in profiles derived from larger architectural orders. Below the chair rail, the dado often features paneling or different surface treatment; above, the field extends to the crown molding or picture rail. Proper installation requires level placement and careful joinery at corners.',
    UNDERGRADUATE: 'Chair rail design engages proportion theory, interior architecture, and material culture. The standard 32-36 inch height derives from typical chair back dimensions, though actual placement often responds to window sill heights, door proportions, and desired visual effect. The chair rail\'s role in organizing wall surface enables hierarchical decoration-humble materials below, prestigious above-and facilitates maintenance by protecting vulnerable lower walls. Pattern books established standard profiles, though regional and stylistic variations exist. Contemporary design sometimes employs chair rails for purely visual purposes in spaces without furniture contact risk.',
    GRADUATE: 'Analysis of chair rails encompasses architectural theory, social history, and craft tradition. The element\'s evolution from protective barrier to decorative convention reveals changing priorities in interior design. Research addresses the relationship between chair rail height and historical furniture dimensions, the economics of protecting costly wall finishes, and the dissemination of standardized molding profiles through builders\' guides. Conservation challenges include matching historic profiles and finishes, understanding original wall surface treatments, and deciding whether to retain or remove later alterations. The persistent use of chair rails in traditional and revival styles demonstrates the power of architectural convention.',
    PHD: 'Chair rail scholarship engages architectural history, material culture, and design psychology. Research questions include: How did a functional protection device become a canonical interior element? What role did pattern books play in standardizing chair rail design and placement? How do chair rails affect spatial perception and wall proportions? Technical investigations address historic molding profiles, installation methods, and the relationship between chair rails and other wall divisions. Conservation research examines original surface treatments in dado and field zones. Contemporary theoretical work considers chair rails\' continuing appeal despite functional obsolescence, their role in defining period authenticity, and their contribution to residential character.',
  },

  history: {
    ELEMENTARY: 'Hundreds of years ago, when people ate dinner, they would push their heavy wooden chairs back from the table. The chairs would bump into the wall and make scratches and marks. Someone invented the chair rail-a tough piece of wood on the wall-to protect it. Even though we have lighter chairs now, people still use chair rails because they make rooms look traditional and elegant.',
    MIDDLE_SCHOOL: 'Chair rails developed in Georgian architecture (18th century) when formal dining rooms featured chairs arranged against walls between meals. The molding protected plaster and wallpaper from damage. Federal and Victorian periods maintained the feature, often combining it with wainscoting below. The Arts and Crafts movement used chair rails to divide walls with different treatments. Modernism generally eliminated the feature, but Colonial Revival and Traditional styles preserved it. Contemporary use is often decorative rather than protective.',
    HIGH_SCHOOL: 'The chair rail evolved from practical necessity to conventional architectural element. Georgian interiors established standard placement and profiles, documented in pattern books by authors like Batty Langley and William Pain. American builders\' guides (Asher Benjamin, Minard Lafever) adapted British precedents. Victorian elaboration created more complex profiles, often with additional moldings. The feature\'s persistence through changing furniture styles (even as chairs became lighter and less likely to damage walls) demonstrates its success as proportioning device. Craftsman and Colonial Revival styles in early 20th century employed simplified chair rails; Modernism eliminated them; Postmodernism revived them.',
    UNDERGRADUATE: 'Chair rail history reflects the intersection of functional design, aesthetic convention, and craft practice. The element\'s origins in preventing damage to expensive wall finishes (hand-painted papers, fabric hangings, decorative plasters) served real economic purposes. The standardization of heights and profiles through pattern book publication enabled vernacular builders to achieve fashionable effects. The dado-field division facilitated practical maintenance strategies-durable, washable materials below, decorative treatments above. The chair rail\'s survival as design element after the protective function became obsolete reveals the power of proportioning systems and stylistic expectation in interior architecture.',
    GRADUATE: 'Historical analysis of chair rails illuminates the creation and transmission of architectural conventions. Research addresses the technology of molding production, the economics of interior finishes, and the social practices that shaped formal interiors. Pattern book analysis reveals how designs disseminated from metropolitan centers to provincial practice. Archaeological evidence from historic interiors documents original treatments of dado and field zones. Conservation studies examine the relationship between chair rails and other wall elements, investigating layered surface treatments that reveal changing decorative campaigns. Theoretical work addresses the chair rail\'s role in creating domestic formality and its persistence in traditional design.',
    PHD: 'Chair rail scholarship engages architectural history, psychology of space, and design theory. Research areas include: documentation of regional profile variations, analysis of pattern book influences, examination of the relationship between furniture dimensions and architectural elements, and investigation of wall proportion systems. Technical research addresses historic molding plane technology and installation methods. Conservation science contributes understanding of historic finishes and appropriate restoration approaches. Contemporary theoretical work examines why chair rails persist in traditional residential design, their role in communicating period authenticity, and their contribution to spatial experience despite functional obsolescence.',
  },

  characteristics: [
    'Horizontal molding at mid-wall height',
    'Typically placed 32-36 inches above floor',
    'Divides wall into dado (lower) and field (upper)',
    'Protects walls from furniture damage',
    'Creates visual proportion and rhythm',
    'Profiles combine ovolo, cyma, and flat elements',
    'Often accompanies wainscoting or paneling',
    'Signals traditional or formal interior treatment',
  ],

  famousExamples: [
    { name: 'Mount Vernon Dining Room', location: 'Virginia, USA', year: '1775', description: 'George Washington\'s formal dining room with original Georgian chair rail' },
    { name: 'Hammond-Harwood House Parlors', location: 'Annapolis, USA', year: '1774', description: 'William Buckland\'s refined Federal-period chair rails with carved details' },
    { name: 'Drayton Hall Drawing Room', location: 'Charleston, USA', year: '1742', description: 'Georgian paneled dado with molded chair rail' },
    { name: 'Morris-Jumel Mansion Parlors', location: 'New York, USA', year: '1765', description: 'Colonial-era chair rails with original paint treatments' },
    { name: 'Wightwick Manor Great Parlour', location: 'Wolverhampton, UK', year: '1887', description: 'Arts and Crafts chair rail dividing painted and papered wall sections' },
  ],

  confusionPairs: [
    {
      elementId: 'baseboard',
      reason: 'Both are horizontal wall moldings',
      distinction: 'Baseboard runs along the floor; chair rail is at mid-wall height (typically 32-36 inches up)',
    },
    {
      elementId: 'picture-rail',
      reason: 'Both are horizontal moldings on walls',
      distinction: 'Chair rail is at mid-wall for protection; picture rail is near ceiling for hanging artwork',
    },
  ],

  searchTags: ['molding', 'dado', 'wall protection', 'wainscoting', 'traditional', 'interior', 'proportion', 'dining room'],

  arMetadata: {
    modelPath: '/models/architecture/chair-rail.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Rail Profile', position: { x: 0, y: 0.9, z: 0.05 } },
      { label: 'Dado Zone', position: { x: 0, y: 0.45, z: 0.1 } },
      { label: 'Field Zone', position: { x: 0, y: 1.5, z: 0.1 } },
      { label: 'Floor', position: { x: 0, y: 0, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
