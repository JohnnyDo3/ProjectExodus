import type { ArchitecturalElement } from '../../types';

export const BASEBOARD: ArchitecturalElement = {
  id: 'baseboard',
  slug: 'baseboard',
  name: 'Baseboard',
  alternativeNames: ['Skirting board', 'Base molding', 'Mopboard'],
  pronunciation: {
    phonetic: 'BAYSS-bord',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Board at base of wall',
    rootWord: 'base (bottom) + board (flat piece of wood)',
  },
  category: 'INTERIOR',
  subcategory: 'moldings',
  periods: ['GEORGIAN', 'FEDERAL', 'VICTORIAN', 'EDWARDIAN', 'CRAFTSMAN', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/baseboard-primary.jpg',
    gallery: [
      '/images/architecture/elements/baseboard-traditional.jpg',
      '/images/architecture/elements/baseboard-victorian.jpg',
      '/images/architecture/elements/baseboard-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/baseboard-profiles.svg',
  },

  description: {
    ELEMENTARY: 'A baseboard is the strip of wood or plastic that runs along the bottom of walls where they meet the floor. It protects the wall from getting kicked or bumped by furniture and vacuum cleaners. It also hides the gap between the wall and floor, making rooms look neat and finished.',
    MIDDLE_SCHOOL: 'Baseboard is the protective and decorative trim installed along the base of interior walls at floor level. Typically 3-8 inches tall, it serves practical functions-protecting walls from impacts, covering the wall-floor junction, and concealing flooring expansion gaps-while providing visual completion to room finishes. Profiles range from simple flat boards to complex molded designs incorporating multiple curves and flat sections.',
    HIGH_SCHOOL: 'Baseboard represents the interior application of classical base design principles, protecting walls while creating visual transition from floor to wall plane. Profiles combine functional elements (flat face for wall protection) with decorative moldings (cap, base shoe) derived from classical orders. Height and complexity typically correspond to ceiling height and room formality. Materials include solid wood, MDF, finger-jointed pine, or polymer. Installation requires scribed joints at corners, proper backing attachment, and coordination with flooring materials. The base shoe (small quarter-round at floor) accommodates floor irregularities and material movement.',
    UNDERGRADUATE: 'Baseboard design engages architectural proportion, material technology, and construction practice. The relationship between baseboard height, room dimensions, and other trim elements (door casings, crown molding) follows proportional conventions, though contemporary practice often deviates from historical norms. Material choices affect appearance, durability, and installation methods-solid wood allows shaping and refinishing; MDF provides stability and paint-grade surface; polymers enable complex profiles at low cost. Technical considerations include attachment methods (nails vs. adhesive), joint types (mitered vs. coped), and integration with flooring (installed before or after baseboard). Modern minimalist architecture often eliminates baseboard, creating flush wall-floor junctions requiring precise construction.',
    GRADUATE: 'Analysis of baseboard encompasses architectural theory, construction history, and material science. Research addresses the evolution of base moldings from classical architecture, the dissemination of standardized profiles through pattern books and millwork catalogs, and regional variations in traditional designs. The industrialization of molding production-from hand planes through steam-powered mills to continuous extrusion-transformed accessibility and standardized designs. Conservation challenges include matching historic profiles, understanding original materials and finishes, and addressing deterioration from moisture and mechanical damage. The debate over baseboard in contemporary design reflects broader tensions between traditional finish carpentry and minimalist aesthetics. Economic analysis reveals baseboard\'s role in construction budgets and finish quality perception.',
    PHD: 'Baseboard scholarship engages architectural history, material culture, and construction technology. Research areas include: documentation of historical profile evolution and regional variations, analysis of pattern book influences on vernacular practice, examination of molding production technology and its impact on design, and investigation of baseboard\'s role in architectural proportion and spatial perception. Technical research addresses wood molding plane technology, MDF formulation and performance, and polymer extrusion methods. Conservation science contributes understanding of historic finishes, deterioration mechanisms, and appropriate restoration approaches. Theoretical work examines the meaning of architectural finish, the social signaling functions of trim elaboration, and the role of baseboard in defining residential character. Contemporary research addresses sustainability implications of different materials and the future of traditional millwork in changing building practices.',
  },

  history: {
    ELEMENTARY: 'People started putting baseboards on walls hundreds of years ago to protect them. Walls were made of plaster that could break easily, and baseboards kept furniture, brooms, and feet from damaging them. As houses got fancier, baseboards became more decorative with curves and designs. Today, even though walls are stronger, we still use baseboards because they make rooms look complete and professional.',
    MIDDLE_SCHOOL: 'Baseboard evolved from simple protective boards in medieval buildings to decorative architectural elements. Georgian and Federal periods established classical proportions and molding profiles. Victorian era produced tall, elaborate baseboards with complex profiles. Arts and Crafts emphasized simpler, broader boards. Modern architecture often reduced or eliminated baseboards, though traditional styles maintained their use. Contemporary baseboards range from minimalist reveals to historically-inspired replicas, with materials including wood, MDF, and polyurethane.',
    HIGH_SCHOOL: 'The baseboard\'s development reflects changing construction methods and aesthetic preferences. Early examples were simple flat boards protecting plaster walls. Classical revival styles applied architectural base molding principles to interior trim. Georgian pattern books like those by William Pain established proportional relationships between baseboard, door trim, and room height. Victorian elaboration created tall baseboards (8-12 inches) with multiple molding profiles. The Craftsman movement simplified designs while maintaining substantial height. Mid-century modernism eliminated baseboards in favor of flush details, though this required precise construction. Contemporary construction typically includes baseboard for practical and aesthetic reasons, with big-box stores offering standardized profiles in various materials.',
    UNDERGRADUATE: 'Baseboard history illuminates the intersection of protection, proportion, and production technology. The element\'s evolution from functional necessity (protecting friable plaster and lime-wash finishes) to decorative convention reveals changing priorities. Pattern book publication standardized designs, enabling provincial builders to achieve fashionable effects. The relationship between baseboard height and ceiling height followed loosely understood proportional systems. Industrialization democratized elaborate moldings through machine milling and later composite materials. The modernist critique of applied ornament created alternatives-flush reveals, shadow gaps-requiring different construction techniques. Contemporary practice navigates between efficiency (standard profiles in economical materials) and character (custom millwork in traditional materials). Conservation challenges include matching historic profiles and finishes in renovation work.',
    GRADUATE: 'Historical analysis of baseboard addresses architectural theory, craft technology, and economic factors. Research examines the translation of exterior classical base moldings to interior application, the role of pattern books and millwork catalogs in standardizing designs, and regional variations in traditional profiles. The industrialization of molding production transformed accessibility-hand-planing required skilled labor and specialized tools; steam-powered mills enabled factory production; contemporary extrusion creates consistent profiles in various materials. The economics of baseboard in construction budgets reveals its role in finish quality perception. Conservation research documents historic profiles, materials, and finishes, informing appropriate restoration. Theoretical work addresses baseboard\'s contribution to architectural proportion, the meaning of finish quality, and the role of trim in defining period authenticity.',
    PHD: 'Baseboard scholarship encompasses architectural history, material science, and construction economics. Research questions include: How did functional protection evolve into decorative convention? What role did production technology play in shaping design? How do baseboards affect spatial perception and finish quality assessment? Technical investigations address historic molding plane technology (cutters, profiles, manufacturers), MDF and polymer formulation, and production methods. Conservation science examines deterioration mechanisms (moisture, mechanical damage, finish failure) and restoration approaches. Contemporary research addresses sustainability considerations (material sources, embodied energy, durability), the role of baseboard in heritage buildings and period authenticity, and changing practices in residential construction. Cross-cultural studies examine different approaches to wall-floor junctions in architectural traditions worldwide.',
  },

  characteristics: [
    'Installed at base of walls at floor level',
    'Typically 3-8 inches tall',
    'Protects walls from impacts and moisture',
    'Covers wall-floor junction and gaps',
    'Profiles combine flat faces with molded edges',
    'Often includes base shoe (quarter-round at floor)',
    'Made from wood, MDF, or polymer materials',
    'Height proportional to ceiling and room formality',
  ],

  famousExamples: [
    { name: 'Georgian Rooms, Winterthur Museum', location: 'Delaware, USA', year: '1730s-1760s', description: 'Period rooms with original tall molded baseboards' },
    { name: 'Mount Vernon Mansion', location: 'Virginia, USA', year: '1758', description: 'George Washington\'s home with original painted pine baseboards' },
    { name: 'Victorian Parlor, Pittock Mansion', location: 'Portland, USA', year: '1914', description: 'Eight-inch baseboards with complex molding profiles' },
    { name: 'Gamble House', location: 'Pasadena, USA', year: '1908', description: 'Greene & Greene Craftsman baseboards in teak and mahogany' },
    { name: 'Farnsworth House', location: 'Illinois, USA', year: '1951', description: 'Mies van der Rohe\'s modernist house with no traditional baseboard' },
  ],

  confusionPairs: [
    {
      elementId: 'chair-rail',
      reason: 'Both are horizontal wall moldings',
      distinction: 'Baseboard runs along the floor; chair rail is at mid-wall height (typically 32-36 inches up)',
    },
    {
      elementId: 'shoe-molding',
      reason: 'Often installed together',
      distinction: 'Baseboard is the main wall protection trim; shoe molding (base shoe) is the small quarter-round at floor level covering the baseboard-floor junction',
    },
  ],

  searchTags: ['trim', 'molding', 'floor', 'wall protection', 'finish carpentry', 'interior', 'base', 'skirting'],

  arMetadata: {
    modelPath: '/models/architecture/baseboard.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Cap Molding', position: { x: 0, y: 0.15, z: 0.02 } },
      { label: 'Flat Face', position: { x: 0, y: 0.08, z: 0.03 } },
      { label: 'Base Shoe', position: { x: 0, y: 0.01, z: 0.04 } },
      { label: 'Floor', position: { x: 0.1, y: 0, z: 0.05 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
