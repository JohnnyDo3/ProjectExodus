import type { ArchitecturalElement } from '../../types';

export const CROWN_MOLDING: ArchitecturalElement = {
  id: 'crown-molding',
  slug: 'crown-molding',
  name: 'Crown Molding',
  alternativeNames: ['Cornice', 'Ceiling molding', 'Cove molding'],
  pronunciation: {
    phonetic: 'KROWN MOL-ding',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Crowning or topmost molding',
    rootWord: 'crown (top) + molding (shaped strip)',
  },
  category: 'INTERIOR',
  subcategory: 'moldings',
  periods: ['CLASSICAL', 'RENAISSANCE', 'BAROQUE', 'GEORGIAN', 'VICTORIAN', 'BEAUX_ARTS', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/crown-molding-primary.jpg',
    gallery: [
      '/images/architecture/elements/crown-molding-classical.jpg',
      '/images/architecture/elements/crown-molding-ornate.jpg',
      '/images/architecture/elements/crown-molding-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/crown-molding-profiles.svg',
  },

  description: {
    ELEMENTARY: 'Crown molding is the decorative trim where the wall meets the ceiling. It\'s like a fancy border that goes all around the top of the room, making the space look finished and elegant. Some crown molding is simple and some has beautiful patterns and curves.',
    MIDDLE_SCHOOL: 'Crown molding is the decorative trim installed at the junction of walls and ceilings. Typically made from wood, plaster, or polyurethane, it serves both aesthetic functions (completing room proportions, adding architectural character) and practical purposes (concealing gaps, protecting wall-ceiling joints). Profile complexity varies from simple coves to elaborate classical compositions.',
    HIGH_SCHOOL: 'Crown molding represents the interior application of classical cornice design principles, translating exterior architectural orders to domestic scale. Profiles derive from combinations of cyma recta, cyma reversa, ovolo, and cavetto curves, often incorporating flat bands (fascia) and decorative elements like dentils or egg-and-dart. Size and complexity typically correspond to ceiling height and room importance. Installation requires precise miter cuts at corners and coping joints along runs.',
    UNDERGRADUATE: 'Crown molding design engages classical proportion theory, craft tradition, and spatial perception. The relationship between molding profile, room dimensions, and ceiling height follows loosely standardized ratios, though contemporary practice often violates historical norms. Material choices-solid wood, MDF, plaster, composition, or polymer-affect appearance, durability, and installation methods. The transition from hand-planed to router-cut to extruded production democratized elaborate profiles while standardizing designs. Contemporary minimalist architecture often eliminates crown molding, creating stark wall-ceiling junctions.',
    GRADUATE: 'Analysis of crown molding encompasses architectural theory, manufacturing history, and aesthetic discourse. Research addresses the translation of exterior classical orders to interior application, the role of pattern books in standardizing profiles, and regional variations in traditional forms. The industrialization of molding production-from hand planes through circular saws to continuous extrusion-transformed accessibility and design possibilities. Conservation challenges include matching historic profiles, understanding original materials and finishes, and deciding whether to retain or remove later additions. The debate over crown molding in modern design reflects broader tensions between ornament and simplicity.',
    PHD: 'Crown molding scholarship engages architectural history, material culture, and design theory. Investigations include analysis of historical profile evolution, documentation of regional craft traditions, and examination of pattern book influences on vernacular practice. Technical research addresses wood molding plane technology, plaster running techniques, and polymer formulation. Theoretical questions concern the meaning of classical references in domestic contexts, the role of ornamental detail in spatial perception, and the social signaling functions of architectural elaboration. Contemporary research examines sustainability implications of different materials and the heritage value of historic plasterwork.',
  },

  history: {
    ELEMENTARY: 'Crown molding started thousands of years ago in ancient Greece and Rome, where buildings had fancy decorations at the tops of columns. When people built houses later, they copied these designs but made them smaller for rooms. Carpenters learned special tricks to make beautiful molding, and today you can still see crown molding in many houses.',
    MIDDLE_SCHOOL: 'Crown molding derives from classical cornices that topped ancient Greek and Roman columns and buildings. Renaissance architecture adapted these exterior forms to interior applications. Georgian and Federal periods established standardized profiles distributed through builders\' guides. Victorian era produced highly ornate plaster compositions. The 20th century saw simplified profiles in Arts and Crafts and Modern styles. Contemporary crown molding ranges from traditional reproductions to minimalist reveals.',
    HIGH_SCHOOL: 'The evolution of crown molding reflects changing production technology and aesthetic preferences. Ancient examples used stone; Renaissance and Georgian periods favored carved wood or molded plaster. Pattern books like those by Asher Benjamin and Minard Lafever (early 19th century) standardized American profiles. Industrial production enabled middle-class homes to afford elaborate moldings through machine milling and composition materials. Modernist rejection of ornament in the mid-20th century eliminated crown molding from progressive architecture, though traditional and revival styles maintained its use.',
    UNDERGRADUATE: 'Crown molding history illuminates the democratization of architectural ornament. The hand-plane era required skilled craftsmen to create custom profiles; planes themselves were specialized tools representing significant investment. Steam-powered milling enabled factory production of standardized profiles at reduced cost. The invention of composition materials (mixtures of whiting, glue, and rosin) allowed complex ornamental moldings to be cast and applied. Contemporary polymer moldings continue this trajectory of accessibility. The parallel history of taste-from Georgian restraint through Victorian elaboration to Modernist rejection and Postmodern revival-demonstrates changing attitudes toward architectural decoration.',
    GRADUATE: 'Historical analysis of crown molding engages craft history, architectural theory, and social aspiration. Research addresses the technology of molding planes and their specialized makers, the dissemination of designs through pattern books and architectural publications, and the role of crown molding in signaling domestic refinement. The conservation of historic plasterwork requires understanding original materials and running techniques. Theoretical questions concern the relationship between crown molding and ceiling height (proportional systems), the meaning of classical references in vernacular contexts, and the role of finishing details in spatial quality.',
    PHD: 'Crown molding scholarship contributes to broader understanding of architectural ornament, craft technology, and cultural meaning. Research areas include: technical analysis of historic materials and construction methods, documentation of regional profile variations, examination of pattern book influence on vernacular building, and theoretical investigation of ornament\'s role in architectural experience. Conservation science addresses deterioration mechanisms, appropriate repair materials, and documentation standards. Contemporary research questions include the environmental implications of different materials, the role of traditional details in heritage building, and the relationship between crown molding and ceiling plane in spatial perception.',
  },

  characteristics: [
    'Installed at wall-ceiling junction',
    'Profiles based on classical molding types',
    'Size proportional to ceiling height and room scale',
    'Requires precise miter joints at corners',
    'Made from wood, plaster, polymer, or composite materials',
    'Can incorporate carved or applied ornament',
    'Completes room\'s architectural envelope',
    'Signals formality and architectural finish',
  ],

  famousExamples: [
    { name: 'State Dining Room Crown, The White House', location: 'Washington DC, USA', year: '1902', description: 'Elaborate plaster cornice in neoclassical design by McKim, Mead & White' },
    { name: 'Marble Hall Cornice, Kedleston Hall', location: 'Derbyshire, UK', year: '1765', description: 'Robert Adam\'s classical plaster enrichment with modillions and egg-and-dart' },
    { name: 'Drawing Room, Drayton Hall', location: 'Charleston, USA', year: '1742', description: 'Georgian modillion cornice with original plaster ornament' },
    { name: 'Salon de la Princesse, Hôtel de Soubise', location: 'Paris, France', year: '1735-1740', description: 'Rococo gilded cornice integrating with ceiling decoration' },
    { name: 'Great Hall, Blenheim Palace', location: 'Oxfordshire, UK', year: '1722', description: 'Baroque plaster cornice by Nicholas Hawksmoor' },
  ],

  confusionPairs: [
    {
      elementId: 'cornice',
      reason: 'Often used interchangeably',
      distinction: 'Cornice can refer to both exterior building elements and interior ceiling molding; crown molding specifically refers to interior wall-ceiling trim',
    },
    {
      elementId: 'baseboard',
      reason: 'Both are room perimeter moldings',
      distinction: 'Crown molding is at the ceiling; baseboard is at the floor',
    },
  ],

  searchTags: ['molding', 'ceiling', 'trim', 'cornice', 'classical', 'interior', 'finish carpentry', 'decoration'],

  arMetadata: {
    modelPath: '/models/architecture/crown-molding.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Crown Profile', position: { x: 0, y: 0.1, z: 0.05 } },
      { label: 'Ceiling', position: { x: 0.1, y: 0.15, z: 0 } },
      { label: 'Wall', position: { x: 0, y: 0, z: 0.1 } },
      { label: 'Miter Joint', position: { x: 0.3, y: 0.1, z: 0.05 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
