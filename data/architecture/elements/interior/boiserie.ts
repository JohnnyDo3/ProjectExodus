import type { ArchitecturalElement } from '../../types';

export const BOISERIE: ArchitecturalElement = {
  id: 'boiserie',
  slug: 'boiserie',
  name: 'Boiserie',
  alternativeNames: ['Paneling', 'Wainscoting', 'Wood paneling'],
  pronunciation: {
    phonetic: 'bwah-zuh-REE',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Woodwork',
    rootWord: 'bois (French for "wood")',
  },
  category: 'INTERIOR',
  subcategory: 'wall-treatments',
  periods: ['RENAISSANCE', 'BAROQUE', 'ROCOCO', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['FRANCE', 'WESTERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/boiserie-primary.jpg',
    gallery: [
      '/images/architecture/elements/boiserie-rococo.jpg',
      '/images/architecture/elements/boiserie-neoclassical.jpg',
      '/images/architecture/elements/boiserie-painted.jpg',
    ],
    diagram: '/images/architecture/diagrams/boiserie-detail.svg',
  },

  description: {
    ELEMENTARY: 'Boiserie is fancy wood paneling on walls, like a beautiful wooden puzzle covering the whole wall. French palaces and fancy houses have walls covered with carved wooden panels decorated with flowers, ribbons, and swirls. Sometimes the wood is painted white or gold to make it even more elegant.',
    MIDDLE_SCHOOL: 'Boiserie refers to ornate wood paneling that covers interior walls, particularly the elaborate carved and often gilded or painted panels characteristic of French architecture from the 17th-18th centuries. These panels typically feature classical moldings, carved ornament, and integrated door and window surrounds, creating unified decorative schemes in prestigious rooms.',
    HIGH_SCHOOL: 'Boiserie represents a comprehensive system of interior architectural woodwork, integrating wall panels, moldings, doors, and sometimes ceilings into coherent decorative compositions. French examples from Louis XIV through Louis XVI periods demonstrate evolving ornamental vocabularies-from Baroque grandeur through Rococo asymmetry to Neoclassical restraint. Panels are often painted in light colors (whites, grays, pastels) with gilded highlights, though natural wood finishes also appear. Complete rooms were sometimes removed from châteaux and installed in museums.',
    UNDERGRADUATE: 'Boiserie analysis engages furniture making, interior architecture, and decorative arts. Construction involves precise joinery creating frame-and-panel systems that accommodate wood movement while maintaining ornamental continuity. Design elements-molding profiles, carved ornament, proportional systems-follow period conventions and room hierarchies. The integration of paintings, mirrors, and decorative objects into paneling schemes reveals careful coordination between trades. Conservation challenges include structural movement, finish deterioration, and authentication of heavily restored examples.',
    GRADUATE: 'Boiserie scholarship addresses craft technology, patronage networks, and aesthetic theory. Research examines workshop organization (master carvers, journeymen, guilders), design transmission through drawings and models, and the economics of prestigious commissions. The relationship between boiserie design and contemporary furniture, the role of pattern books in disseminating French styles internationally, and regional variations in execution and ornament reveal broader patterns in artistic production and cultural exchange. Conservation science addresses wood species identification, original finish analysis, and appropriate restoration techniques.',
    PHD: 'Research into boiserie encompasses art history, material culture, and conservation science. Investigations include archival research on original commissions and workshop practices, dendrochronological analysis for dating, and technical examination of construction and finishing techniques. The market for salvaged boiserie (particularly during French Revolution and 19th-century demolitions) created global distribution of historic interiors, raising questions about authenticity, context, and cultural patrimony. Contemporary research addresses ethical considerations in period room installations, the role of boiserie in defining French national identity, and technical challenges in preserving historic woodwork.',
  },

  history: {
    ELEMENTARY: 'French kings and queens loved to decorate their palaces with beautiful wooden walls. Talented carvers spent years creating panels covered with flowers, cherubs, and fancy designs. The most famous boiserie was at the Palace of Versailles, where every room had different carved decorations. Some of these wooden rooms were so valuable that they were later taken apart and moved to museums.',
    MIDDLE_SCHOOL: 'Boiserie developed in French Renaissance châteaux, reaching peak elaboration during the Baroque (Louis XIV) and Rococo (Louis XV) periods. Versailles established standards of magnificence that spread throughout Europe. The French Revolution led to dispersal of many boiseries from aristocratic houses. The 19th century saw both historic preservation efforts and creation of revival designs. Many complete boiserie rooms are now in American museums, removed from demolished French buildings.',
    HIGH_SCHOOL: 'The evolution of boiserie reflects changing aesthetic priorities and technical capabilities. Renaissance panels featured architectural moldings and classical ornament. Louis XIV Baroque style emphasized grandeur and symmetry. Louis XV Rococo introduced asymmetrical shell-work, naturalistic flowers, and sinuous curves. Louis XVI Neoclassicism returned to geometric order with restrained classical motifs. Technical advances in carving, gilding, and painting supported increasingly sophisticated designs. The Revolutionary period\'s dispersal of boiseries created an international market, with many panels reaching America through dealers and collectors.',
    UNDERGRADUATE: 'Boiserie history illuminates the intersection of craft, patronage, and taste. The development of specialized workshops in Paris, the role of designers like Oppenord and Pineau in creating ornamental vocabularies, and the transmission of styles through court appointment and published designs shaped European interior decoration. Technical developments-improved joinery, refined carving techniques, advances in water and oil gilding-enabled increasingly delicate work. The 19th-century fashion for 18th-century interiors created both authentic salvage market and revival production. American millionaires\' acquisition of complete rooms demonstrated cultural aspiration and established museum collections.',
    GRADUATE: 'Historical analysis of boiserie examines production systems, aesthetic discourse, and cultural meaning. Research addresses guild regulations governing woodworkers, the relationship between architects and menuisiers (joiners), and the role of royal patronage in establishing standards. The documentation of specific commissions through drawings, contracts, and payment records enables reconstruction of design and execution processes. The meaning of ornamental programs-allegorical, seasonal, or simply decorative-and their relationship to room function reveals contemporary understanding of appropriate decoration. Conservation archives document restoration campaigns and changing attitudes toward historic finishes.',
    PHD: 'Boiserie scholarship engages multiple disciplines: art history (style evolution and attribution), material science (wood technology and finish chemistry), social history (patronage and workshop organization), and conservation theory (authenticity, restoration ethics). Current research examines technical analysis methods (non-destructive examination, finish stratigraphy), provenance research for displaced panels, and theoretical questions about period rooms in museums. The study of boiserie contributes to broader understanding of decorative arts production, international style transmission, and the formation of taste in ancien régime and modern contexts.',
  },

  characteristics: [
    'Comprehensive wall covering in carved wood',
    'Integrated panels, moldings, and ornament',
    'Often painted in light colors with gilding',
    'Classical proportions and molding profiles',
    'Incorporates doors, windows, mirrors',
    'Frame-and-panel construction for stability',
    'Period-specific ornamental vocabularies',
    'Associated with French aristocratic interiors',
  ],

  famousExamples: [
    { name: 'Queen\'s Bedroom, Versailles', location: 'Versailles, France', year: '1730s', description: 'Rococo boiserie with gilded carving and silk wall coverings' },
    { name: 'Hôtel de Varengeville Room, Metropolitan Museum', location: 'New York, USA (from Paris)', year: '1736-1752', description: 'Complete Louis XV salon with painted and gilded boiserie by Nicolas Pineau' },
    { name: 'Paar Room, Frick Collection', location: 'New York, USA (from Paris)', year: '1765', description: 'Louis XVI neoclassical boiserie from Hôtel de Paar' },
    { name: 'Salon Doré, Palace of Fontainebleau', location: 'Fontainebleau, France', year: '1751-1754', description: 'Golden salon with Rococo boiserie and integrated paintings' },
    { name: 'Tessé Room, Metropolitan Museum', location: 'New York, USA (from Paris)', year: '1768-1772', description: 'Neoclassical boiserie from Château de Tessé by Claude-Nicolas Ledoux' },
  ],

  confusionPairs: [
    {
      elementId: 'wainscoting',
      reason: 'Both are wood wall paneling',
      distinction: 'Wainscoting typically covers lower wall portion with simpler design; boiserie is comprehensive room treatment with elaborate carved ornament',
    },
    {
      elementId: 'paneling',
      reason: 'Generic term for wood wall covering',
      distinction: 'Paneling is general term for any wood wall treatment; boiserie specifically refers to ornate French-style carved and decorated panels',
    },
  ],

  searchTags: ['French', 'paneling', 'carved wood', 'gilded', 'Rococo', 'ornament', 'walls', 'interior decoration', 'luxury'],

  arMetadata: {
    modelPath: '/models/architecture/boiserie.glb',
    scale: 0.6,
    rotatable: true,
    annotations: [
      { label: 'Carved Panel', position: { x: 0, y: 1.2, z: 0.02 } },
      { label: 'Molding', position: { x: 0.3, y: 0.8, z: 0.01 } },
      { label: 'Gilded Ornament', position: { x: -0.2, y: 1.5, z: 0.03 } },
      { label: 'Frame', position: { x: 0.5, y: 1, z: 0 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
