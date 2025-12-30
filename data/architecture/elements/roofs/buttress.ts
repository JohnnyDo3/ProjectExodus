import type { ArchitecturalElement } from '../../types';

export const BUTTRESS: ArchitecturalElement = {
  id: 'buttress',
  slug: 'buttress',
  name: 'Buttress',
  alternativeNames: ['Wall Pier', 'Projecting Pier', 'Counter-fort'],
  pronunciation: {
    phonetic: 'BUH-tris',
    language: 'Old French',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'To thrust against or support',
    rootWord: 'bouterez (to thrust, support)',
  },
  category: 'ROOF',
  subcategory: 'structural_support',
  periods: ['roman', 'romanesque', 'gothic', 'renaissance', 'medieval'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/buttress-primary.jpg',
    gallery: [
      '/images/architecture/elements/buttress-romanesque.jpg',
      '/images/architecture/elements/buttress-diagonal.jpg',
    ],
    diagram: '/images/architecture/diagrams/buttress-types.svg',
  },

  description: {
    ELEMENTARY: 'A buttress is like a thick pillar or wall built against the side of a building to hold it up and keep it strong. It\'s like when you push your hand against a leaning book to keep it from falling over!',
    MIDDLE_SCHOOL: 'A buttress is a projecting support built against an exterior wall to strengthen it and resist lateral forces, especially from the roof and ceiling pushing outward. Buttresses are typically made of brick or stone and project outward from the wall, getting thicker at the base. They\'re essential features of medieval churches and castles.',
    HIGH_SCHOOL: 'The buttress is a structural element consisting of masonry projecting from or built against a wall to give it additional stability and resist lateral thrust. Buttresses work by increasing the effective thickness of the wall, providing greater mass to resist overturning forces, and redirecting lateral thrust downward through the masonry. Types include flat buttresses (shallow projections), angle buttresses (at corners), diagonal buttresses (set diagonally at corners), and clasping buttresses (enclosing corners). Buttresses are essential in masonry construction, particularly for buildings with vaulted ceilings that generate significant lateral thrust.',
    UNDERGRADUATE: 'The buttress represents a fundamental structural solution in masonry architecture, addressing the material\'s weakness in tension. Lateral forces from vaults, arches, or wind loads create bending moments in walls that generate tension on one face. Buttresses resist these forces through increased wall thickness and mass at strategic locations, keeping all masonry in compression. The element\'s proportions reflect empirical rules developed over centuries—buttress projection typically ranges from one-third to one-half the wall thickness, while height varies with structural requirements. Romanesque architecture employed massive buttresses integrated with wall thickness, while Gothic development led to more slender buttresses working in concert with flying buttresses to create complete structural systems.',
    GRADUATE: 'The buttress embodies pre-modern structural thinking, revealing sophisticated empirical understanding of force transmission in masonry. Analysis shows buttresses function through multiple mechanisms: increasing wall section modulus to resist bending, adding mass to increase resistance to overturning, and providing pathways for force redirection to foundations. The element\'s evolution traces from ancient precedents (Egyptian temple pylons, Roman thick walls) through Romanesque development to Gothic refinement. Regional variations emerged based on materials and building traditions—England favored prominent external buttresses, France developed integrated systems with flying buttresses, and Mediterranean regions often minimized external projection. The buttress\'s aesthetic dimension evolved from utilitarian mass to sculpted expression, with Gothic examples featuring niches, statuary, and elaborate pinnacles.',
    PHD: 'The buttress constitutes a crucial element for examining relationships between structural necessity, material properties, and architectural form in pre-modern building. Scholarly research employs structural analysis to understand historical buttress design, revealing safety factors and design assumptions. Archaeological studies document construction sequences and later modifications, often finding buttresses added to resolve structural problems. Historical research traces buttress design knowledge transmission through workshop practices, pattern books, and built examples serving as teaching models. Recent work challenges functional determinism, showing how buttresses served symbolic purposes—expressing permanence, dividing façades into bays, providing locations for iconographic programs. Conservation research addresses buttress deterioration including foundation settlement, stone decay, and structural cracking, developing assessment methodologies and intervention strategies. Contemporary research examines buttress principles in sustainable architecture, including earth-built construction and experimental masonry structures.',
  },

  history: {
    ELEMENTARY: 'Ancient builders discovered that putting extra thick walls or supports on the outside of buildings made them stronger. Romans used buttresses, and medieval castle and church builders made them even bigger and more important!',
    MIDDLE_SCHOOL: 'Buttresses have been used since ancient times—Egyptian temples and Roman buildings incorporated them. Medieval Romanesque churches used massive buttresses to support stone vaults. Gothic architects refined buttress design, making them more slender and adding decorative elements. Renaissance and later architecture continued using buttresses when structural needs required them.',
    HIGH_SCHOOL: 'Buttress history traces from ancient precedents through medieval development to modern applications. Egyptian pylons and Roman walls incorporated buttress-like projections. Early Christian and Byzantine architecture used buttresses to support dome thrusts. Romanesque architecture developed buttresses systematically, with massive projections supporting barrel and groin vaults. Gothic architecture refined buttress design, making them thinner while combining them with flying buttresses for optimal efficiency. Post-medieval architecture employed buttresses less prominently as construction systems changed, though they remained necessary for masonry vaulted structures and Gothic Revival buildings.',
    UNDERGRADUATE: 'Buttress development reveals evolving understanding of structural mechanics in masonry construction. Roman thick-wall construction and the use of relieving arches represented early buttressing strategies. Romanesque architecture systematized buttress use—churches like Durham Cathedral (1093-1133) show careful buttress placement corresponding to internal vault ribs. Gothic development optimized buttress design through slenderer projections working with flying buttresses, as seen in the progression from early Gothic (Sens, Noyon) to High Gothic (Chartres, Reims). Renaissance architecture reduced buttress prominence through different structural approaches, though necessity dictated their use when vaulting large spaces. The industrial revolution\'s steel and reinforced concrete eventually eliminated structural need for buttresses in most construction, though revival styles continued their use decoratively.',
    GRADUATE: 'The buttress\'s history encompasses technological evolution, regional variation, and shifting aesthetic values. Early medieval buttresses evolved from Roman precedents, with Carolingian and Ottonian churches developing characteristic strip buttresses. Romanesque regional schools showed distinct approaches—Burgundian massive projections, Rhineland articulated systems, Italian minimal external expression. Gothic development varied regionally with French buildings emphasizing flying buttress systems and reduced traditional buttress mass, English cathedrals maintaining substantial buttresses with decorative elaboration, and Spanish interpretations combining both approaches. The element\'s decline followed structural system changes, though understanding of masonry behavior remained important for restoration work. Gothic Revival sparked renewed buttress design, though often without structural necessity.',
    PHD: 'Scholarly analysis of buttress history employs multiple frameworks: structural archaeology revealing construction techniques and modification sequences, engineering analysis assessing historical design adequacy, architectural history tracing typological development, and conservation science examining deterioration patterns. Research challenges simplistic progress narratives, showing how buttress design responded to multiple factors beyond pure structure—aesthetic preferences, building economics, material availability, and workshop capabilities. Studies of structural failures inform understanding of design limits and builder knowledge. Recent work applies photogrammetry and laser scanning to document buttress geometry, enabling precise structural modeling. Conservation research addresses common problems including differential settlement causing buttress separation from walls, stone decay from water infiltration, and inappropriate historical interventions. Contemporary investigations examine buttress principles in earth construction, dry-stone masonry, and experimental unreinforced masonry structures.',
  },

  characteristics: [
    'Projects from exterior wall',
    'Provides lateral support',
    'Made of masonry (brick or stone)',
    'Often wider at base',
    'Types: flat, angle, diagonal, clasping',
    'May include decorative elements',
  ],

  famousExamples: [
    { name: 'Durham Cathedral', location: 'Durham, England', year: '1093-1133', description: 'Early systematic buttress use' },
    { name: 'Canterbury Cathedral', location: 'Canterbury, England', year: '1070-1834', description: 'Romanesque and Gothic buttresses' },
    { name: 'Albi Cathedral', location: 'Albi, France', year: '1282-1480', description: 'Fortress-like brick buttresses' },
    { name: 'King\'s College Chapel', location: 'Cambridge, England', year: '1446-1515', description: 'Elaborate Tudor Gothic buttresses' },
    { name: 'Westminster Abbey', location: 'London, England', year: '1245-1517', description: 'Gothic buttress system with statuary' },
  ],

  confusionPairs: [
    {
      elementId: 'flying-buttress',
      reason: 'Both support walls against lateral forces',
      distinction: 'Buttress is solid masonry against the wall; flying buttress is an arched connection to a separate pier',
    },
    {
      elementId: 'pilaster',
      reason: 'Both project from walls',
      distinction: 'Pilaster is decorative (classical column applied to wall); buttress is structural support',
    },
  ],

  searchTags: ['support', 'wall', 'structural', 'medieval', 'gothic', 'romanesque', 'masonry', 'stone', 'pier', 'projection'],

  arMetadata: {
    modelPath: '/models/architecture/buttress.glb',
    scale: 2.0,
    rotatable: true,
    annotations: [
      { label: 'Top/Cap', position: { x: 0.3, y: 1.0, z: 0 } },
      { label: 'Projection', position: { x: 0.4, y: 0.6, z: 0 } },
      { label: 'Base (Wider)', position: { x: 0.5, y: 0.2, z: 0 } },
      { label: 'Wall Connection', position: { x: 0, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
