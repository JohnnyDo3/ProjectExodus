import type { ArchitecturalElement } from '../../types';

export const MANSARD: ArchitecturalElement = {
  id: 'mansard',
  slug: 'mansard',
  name: 'Mansard Roof',
  alternativeNames: ['French Roof', 'Curb Roof', 'Gambrel Roof (when two-sided)'],
  pronunciation: {
    phonetic: 'man-SARD',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Named after architect François Mansart',
    rootWord: 'Mansart (architect\'s name, 1598-1666)',
  },
  category: 'ROOF',
  subcategory: 'roof_forms',
  periods: ['baroque', 'rococo', 'neoclassical', 'victorian', 'second-empire'],
  regions: ['NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/mansard-primary.jpg',
    gallery: [
      '/images/architecture/elements/mansard-louvre.jpg',
      '/images/architecture/elements/mansard-victorian.jpg',
    ],
    diagram: '/images/architecture/diagrams/mansard-section.svg',
  },

  description: {
    ELEMENTARY: 'A mansard roof has two different slopes on each side-a steep lower part and a flatter top part. It looks like the roof has two steps on each side! This design creates extra room inside for an attic or upper floor.',
    MIDDLE_SCHOOL: 'The mansard roof features two slopes on each of its four sides, with the lower slope much steeper than the upper. This creates additional living space in the roof level while reducing the building\'s apparent height. Windows called dormers often punctuate the steep lower slope, providing light and ventilation to the attic rooms.',
    HIGH_SCHOOL: 'The mansard roof is a four-sided gambrel-style roof characterized by two distinct slopes on each side-a steep lower slope (often approaching vertical) and a shallower upper slope (sometimes nearly flat). This configuration maximizes usable attic space while maintaining a relatively low overall roof height. The form became synonymous with French Second Empire architecture (1852-1870) and spread internationally during the Victorian era. Mansard roofs typically incorporate dormer windows in the steep lower slope to provide light and habitability to the top floor.',
    UNDERGRADUATE: 'The mansard represents an architectural solution to urban space constraints and tax regulations, creating a full additional story within the roof envelope. Named for François Mansart (though he didn\'t invent it), the form gained prominence in 17th-century French architecture and reached its apotheosis under Napoleon III\'s rebuilding of Paris (1852-1870). The mansard\'s geometry allows nearly full-height interior spaces under the roof, effectively adding a story while complying with height restrictions based on eaves rather than ridge lines. Structural considerations include complex framing at the slope change and waterproofing challenges at the shallow upper slope.',
    GRADUATE: 'The mansard roof embodies the intersection of regulatory circumvention, spatial economy, and architectural expression. Historical research reveals the form\'s popularity partly derived from taxation policies measuring building height to eaves rather than ridge, making mansard-roofed structures appear smaller for tax purposes while gaining usable space. Baron Haussmann\'s Paris renovations standardized mansard roofs, creating the characteristic Parisian streetscape. The form\'s international dissemination, particularly in Victorian America, shows how architectural motifs travel independent of their original functional logic. Technical analysis addresses drainage problems inherent in the shallow upper slope, structural complexity of the slope transition, and contemporary energy performance challenges.',
    PHD: 'The mansard constitutes a significant case study in architectural history examining relationships between building regulations, economic incentives, and formal development. Scholarly work documents taxation systems that inadvertently promoted mansard adoption, social histories reveal mansard-roofed attics as servants\' quarters in grand houses, and urban morphology studies show how mansard-lined boulevards created unified streetscapes. Research challenges the attribution to François Mansart, documenting earlier precedents while examining how architectural forms become associated with individuals. Contemporary scholarship addresses mansard roofs in heritage conservation, examining appropriate restoration of deteriorated slate coverings and dormer details, and adaptive reuse converting mansion attics into apartments.',
  },

  history: {
    ELEMENTARY: 'A French architect named François Mansart made this roof style famous in the 1600s, which is why it\'s called a mansard roof! Later, it became super popular in fancy Victorian buildings all across America and Europe.',
    MIDDLE_SCHOOL: 'Though named after François Mansart (1598-1666), the mansard roof form appeared earlier. It became standard in French Baroque architecture and reached peak popularity during France\'s Second Empire period (1852-1870) under Napoleon III. The style spread internationally, becoming characteristic of Victorian architecture in America, Britain, and other countries.',
    HIGH_SCHOOL: 'The mansard roof evolved from 16th-century French precedents but became associated with François Mansart and his nephew Jules Hardouin-Mansart, both prominent Baroque architects. The form proliferated in 17th-century French châteaux and Parisian hôtels particuliers. Its greatest popularity came during the Second Empire, when Baron Haussmann\'s Paris renovations established mansard roofs as standard for new construction, creating the unified architectural character of central Paris. The 1867 Paris Exposition introduced the style globally, triggering widespread adoption in Victorian-era construction.',
    UNDERGRADUATE: 'Mansard development shows complex interactions between formal invention, regulatory environments, and cultural transmission. While earlier examples exist, François Mansart\'s sophisticated use at Château de Balleroy (1626) and other projects established the form\'s prestige associations. Pierre Lescot\'s Louvre additions under Henri II pioneered the steep-sided attic story that would evolve into the mansard. The form\'s Second Empire flourishing related to Parisian building codes limiting height to eaves, making mansard roofs economically advantageous. American adoption transformed the mansard from symbol of French sophistication into vernacular Victorian form, applied to buildings from urban brownstones to rural farmhouses.',
    GRADUATE: 'The mansard\'s history encompasses architectural innovation, regulatory arbitrage, and style diffusion. Research reveals pre-Mansart precedents including Pierre Lescot\'s Louvre work (1546) and 16th-century Loire Valley châteaux, complicating attribution narratives. The form\'s Second Empire standardization reflects systematic urban planning under centralized state power, with architectural uniformity serving political purposes. International dissemination shows how architectural forms acquire different meanings in translation-American mansards often simplified French prototypes while retaining prestige associations. The form\'s 20th-century decline followed modernist rejection of historicism, though postmodern architecture briefly revived mansard motifs. Contemporary scholarship examines mansard roofs through lenses of urban heritage, examining Paris\'s protected roof lines, and building performance, addressing insulation and waterproofing challenges.',
    PHD: 'Scholarly engagement with mansard history addresses multiple historiographical questions: the mechanics of architectural attribution and naming, the role of regulations in shaping built form, the processes of international style transmission, and the social meanings of architectural elements. Recent work employs tax records to document mansard adoption patterns, architectural guides and pattern books to trace design dissemination, and building archaeology to reveal construction techniques. Interdisciplinary research examines mansards through economic history (taxation incentives), social history (attic servants\' quarters), and building science (thermal and moisture performance). Conservation studies develop appropriate interventions for historic mansard structures, balancing authenticity with contemporary performance requirements.',
  },

  characteristics: [
    'Two slopes on each of four sides',
    'Steep lower slope, shallow upper slope',
    'Creates additional living space',
    'Often features dormer windows',
    'Lower slope may be nearly vertical',
    'Associated with French Second Empire style',
  ],

  famousExamples: [
    { name: 'Louvre Palace', location: 'Paris, France', year: '16th-17th century', description: 'Early mansard roof forms' },
    { name: 'Château de Maisons', location: 'Maisons-Laffitte, France', year: '1642-1651', description: 'François Mansart masterpiece' },
    { name: 'Paris Haussmann Buildings', location: 'Paris, France', year: '1852-1870', description: 'Standardized Second Empire mansards' },
    { name: 'Eisenhower Executive Office Building', location: 'Washington D.C., USA', year: '1871-1888', description: 'American Second Empire mansard' },
    { name: 'Philadelphia City Hall', location: 'Philadelphia, Pennsylvania', year: '1871-1901', description: 'Elaborate Victorian mansard roofs' },
  ],

  confusionPairs: [
    {
      elementId: 'gambrel',
      reason: 'Both have two slopes per side',
      distinction: 'Gambrel is two-sided (front and back); mansard is four-sided (all around the building)',
    },
    {
      elementId: 'hip-roof',
      reason: 'Both slope on all four sides',
      distinction: 'Hip roof has one slope per side; mansard has two slopes per side (steep and shallow)',
    },
  ],

  searchTags: ['roof', 'french', 'second-empire', 'victorian', 'double-slope', 'attic', 'dormer', 'baroque', 'paris', 'mansart'],

  arMetadata: {
    modelPath: '/models/architecture/mansard.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Upper Slope (Shallow)', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Lower Slope (Steep)', position: { x: 0.3, y: 0.6, z: 0 } },
      { label: 'Dormer Window', position: { x: 0.35, y: 0.7, z: 0 } },
      { label: 'Slope Transition', position: { x: 0.25, y: 0.8, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
