import type { ArchitecturalElement } from '../../types';

export const ALLEE: ArchitecturalElement = {
  id: 'allee',
  slug: 'allee',
  name: 'Allée',
  alternativeNames: ['Tree Avenue', 'Formal Walk', 'Tree Tunnel', 'Allée'],
  pronunciation: {
    phonetic: 'a-LAY',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'A going or walking',
    rootWord: 'From French "aller" (to go)',
  },
  category: 'GARDEN',
  subcategory: 'circulation_elements',
  periods: ['RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'ROMANTIC', 'MODERN', 'CONTEMPORARY'],
  regions: ['FRANCE', 'WESTERN_EUROPE', 'BRITAIN', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/allee-primary.jpg',
    gallery: [
      '/images/architecture/elements/allee-versailles.jpg',
      '/images/architecture/elements/allee-oak.jpg',
    ],
    diagram: '/images/architecture/diagrams/allee-plan.svg',
  },

  description: {
    ELEMENTARY: 'An allée is a fancy pathway with rows of trees planted on both sides! The trees are all the same type and planted evenly, like soldiers standing in line. When you walk down an allée, the tree branches often meet overhead to make a living tunnel. It feels magical and shady!',
    MIDDLE_SCHOOL: 'An allée is a formal garden or landscape feature consisting of parallel rows of evenly spaced trees defining a straight pathway. The trees are typically of a single species, planted at regular intervals and often pruned to create uniform canopies. Allées organize garden layouts, create dramatic perspectives, and provide shaded walkways. Famous examples include the tree-lined approaches to French châteaux.',
    HIGH_SCHOOL: 'The allée is a linear landscape element using parallel tree rows to define axial paths and organize spatial sequences. Key design parameters include tree spacing (typically 15-30 feet), path width, species selection, and canopy management. Allées create perspective effects-converging sight lines emphasize terminating features (buildings, sculptures, gates). They serve functional purposes (shade, wind protection) and aesthetic purposes (organizing views, creating rhythm). Trees may be pleached to form overhead canopies.',
    UNDERGRADUATE: 'Allée design integrates landscape architecture, horticulture, and spatial perception. Technical considerations include species selection for longevity and form, spacing calculations for desired perspective effects, and maintenance requirements for pruning and replacement. Environmental functions include microclimate modification, wildlife corridors, and carbon sequestration. The allée serves as compositional armature, organizing garden layouts along primary axes and creating sequential spatial experiences through compression and release.',
    GRADUATE: 'Allée analysis encompasses garden history, plant science, and environmental psychology. Research examines historical design theory (French formal garden tradition), the horticultural management of long-lived tree avenues, and the psychological effects of enclosed versus open tree canopies. Contemporary challenges include climate change adaptation (selecting resilient species), disease management (avoiding monoculture vulnerability), and balancing historical character with sustainable maintenance practices.',
    PHD: 'Research into allées addresses landscape history, spatial perception, and urban forestry. Investigations include the development of allée design in French formal garden theory, the management of historic tree avenues (Versailles, royal forests), and the environmental performance of tree corridors in urban contexts. Methodologies include archival research in garden treatises, dendrochronological dating of historic avenues, and environmental monitoring of microclimate effects. Current scholarship examines climate-adapted allée design, the integration of allées with green infrastructure systems, and the conservation of culturally significant tree avenues.',
  },

  history: {
    ELEMENTARY: 'French garden designers invented allées in the 1600s to make grand entrances to castles and palaces! The Palace of Versailles has amazing allées that go for miles. Rich people planted allées with chestnut trees, lime trees, and oak trees. Today you can find allées in parks and along city streets around the world.',
    MIDDLE_SCHOOL: 'Renaissance Italian gardens introduced regular tree planting. French baroque gardens (17th century) perfected the allée-Le Nôtre\'s work at Versailles and Vaux-le-Vicomte created monumental tree avenues. The tradition spread across Europe and to colonial America. English landscape tradition initially rejected formal allées, but later incorporated them selectively. Victorian era municipal parks adopted allées for grand approaches and promenades.',
    HIGH_SCHOOL: 'Medieval hunting forests had proto-allées as riding paths. Renaissance systematization of garden design introduced geometric tree planting. French classical garden theory (Le Nôtre, 1660s-1680s) developed the allée as fundamental compositional device-radiating avenues organized vast estates. The tradition influenced formal gardens across Europe. English naturalistic tradition critiqued rigid geometry but maintained allées as architectural elements. Modernist landscape architects both rejected and abstracted the allée concept.',
    UNDERGRADUATE: 'Allée history reveals evolving attitudes toward nature, geometry, and power. French absolutist gardens used allées to impose rational order on landscape, extending architectural control beyond buildings. The radiating avenues of Versailles symbolized royal power projecting across territory. English landscape tradition rejected this formality in favor of naturalistic planting. Victorian municipal design revived allées for urban parks, democratizing previously aristocratic features. Contemporary practice negotiates between historical references and ecological considerations.',
    GRADUATE: 'Historical analysis of allées examines garden theory, political symbolism, and silvicultural practice. Research addresses the design principles codified in French treatises (Boyceau, d\'Argenville), the symbolic meaning of radiating avenues in absolutist ideology, and the horticultural techniques for establishing and maintaining tree avenues. Conservation challenges include replacing failing trees while maintaining historical character, managing diseases affecting monoculture plantings, and adapting allées for contemporary use and safety requirements.',
    PHD: 'Allée scholarship engages multiple disciplines: landscape history (garden theory and royal symbolism), dendrochronology (dating historic plantings), and urban ecology (corridor functions). Methodologies include comparative analysis of garden treatises, archaeological investigation of lost allées through remote sensing, and long-term monitoring of tree health. Current research examines the adaptation of allée design for climate resilience, the role of tree avenues in urban wildlife corridors, the cultural landscape significance of historic allées, and strategies for maintaining genetic diversity while preserving visual uniformity.',
  },

  characteristics: [
    'Parallel rows of uniform trees',
    'Straight, axial alignment',
    'Regular tree spacing',
    'Single species or limited palette',
    'Creates perspective effects',
    'Often pruned or pleached',
    'Defines formal pathways',
  ],

  famousExamples: [
    { name: 'Grand Perspective at Versailles', location: 'Versailles, France', year: '1660s-1680s', description: 'Le Nôtre\'s iconic tree avenue extending from palace' },
    { name: 'Avenue of the Baobabs', location: 'Morondava, Madagascar', year: '800+ years old', description: 'Natural allée of ancient baobab trees' },
    { name: 'Oak Alley Plantation', location: 'Louisiana, USA', year: '1830s-1840s', description: 'Quarter-mile allée of 28 live oak trees' },
    { name: 'Unter den Linden', location: 'Berlin, Germany', year: '1647', description: 'Historic linden tree boulevard' },
    { name: 'Plane Tree Allée at Iford Manor', location: 'Wiltshire, UK', year: '1899', description: 'Harold Peto\'s Arts and Crafts allée' },
  ],

  confusionPairs: [
    {
      elementId: 'pergola',
      reason: 'Both create overhead canopies along pathways',
      distinction: 'Allées are formed by rows of living trees; pergolas are built structures with posts and beams',
    },
    {
      elementId: 'arbor',
      reason: 'Both involve plants creating overhead structure',
      distinction: 'Allées are long tree-lined avenues; arbors are smaller structures for vines over gates or benches',
    },
  ],

  searchTags: ['trees', 'avenue', 'pathway', 'formal', 'perspective', 'french', 'baroque', 'lined', 'tunnel'],

  arMetadata: {
    modelPath: '/models/architecture/allee.glb',
    scale: 0.7,
    rotatable: true,
    annotations: [
      { label: 'Tree Row', position: { x: 0.5, y: 1.5, z: 0 } },
      { label: 'Central Path', position: { x: 0, y: 0, z: 0 } },
      { label: 'Canopy Overhead', position: { x: 0, y: 2.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
