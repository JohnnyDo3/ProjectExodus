import type { ArchitecturalElement } from '../../types';

export const MERLON: ArchitecturalElement = {
  id: 'merlon',
  slug: 'merlon',
  name: 'Merlon',
  alternativeNames: ['Cop', 'Battlement Tooth', 'Crenel Pier'],
  pronunciation: {
    phonetic: 'MER-lon',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Solid upright section of battlement',
    rootWord: 'merlon (from Italian merlone)',
  },
  category: 'FORTIFICATION',
  subcategory: 'wall_top',
  periods: ['medieval', 'romanesque', 'gothic', 'renaissance'],
  regions: ['NORTHERN_EUROPE', 'MIDDLE_EAST', 'MEDITERRANEAN'],

  images: {
    primary: '/images/architecture/elements/merlon-primary.jpg',
    gallery: [
      '/images/architecture/elements/merlon-simple.jpg',
      '/images/architecture/elements/merlon-decorative.jpg',
    ],
    diagram: '/images/architecture/diagrams/merlon-types.svg',
  },

  description: {
    ELEMENTARY: 'A merlon is one of the tall solid parts in a battlement—it\'s like the "tooth" sticking up from a castle wall! Soldiers hid behind merlons to stay safe from enemy arrows and rocks. The spaces between merlons are called crenels.',
    MIDDLE_SCHOOL: 'The merlon is the solid, upright section of a battlement, alternating with open crenels. Merlons provided protection for defenders on castle walls, allowing them to take cover between firing arrows or observing enemies. Merlons could be simple rectangular blocks or feature decorative tops and sometimes had arrow slits for additional firing positions.',
    HIGH_SCHOOL: 'The merlon is the raised solid portion of a crenellated parapet, forming the protective barrier between crenels (embrasures). Typically rectangular in cross-section and extending above the wall-walk, merlons shield defenders from projectiles while they reload or observe. Merlon design varied significantly: simple rectangular forms, merlons with crenellated tops, merlons with vertical arrow slits, and decorative variations including Ghibelline (swallow-tailed) merlons. Structural considerations included adequate thickness to resist projectile impact and sufficient height for effective protection while allowing defenders to fire over or through them.',
    UNDERGRADUATE: 'The merlon represents a fundamental defensive element whose design evolved through military experience and regional traditions. Proportions typically followed practical requirements—width sufficient to protect a defender (typically 3-5 feet), height from chest to head level (4-6 feet above wall-walk), and thickness adequate to resist stone projectiles and early gunfire (2-3 feet minimum). Variations reflect tactical considerations: plain merlons for maximum protection, merlons with arrow slits enabling firing while covered, and merlons with crenellated tops for additional defensive positions. Regional characteristics emerged—Italian Guelph (squared) versus Ghibelline (swallow-tailed) merlons reflected political allegiances, while Islamic architecture developed distinctive decorative patterns. The transition from functional to ornamental occurred as gunpowder weapons rendered traditional merlons ineffective.',
    GRADUATE: 'The merlon embodies practical military architecture shaped by weapon technology and combat experience. Analysis reveals sophisticated defensive thinking—merlon spacing (crenel width) balanced defender mobility against protected positions, while height and thickness reflected contemporary projectile capabilities. Archaeological evidence shows merlons strengthened through construction history as weapons evolved, with later additions including reinforced corners and thickened facing walls. The element\'s regional variations demonstrate cultural adaptation—Middle Eastern stepped merlons, European rectangular forms, and Italian political symbolism in merlon profiles. Material choices (stone, brick, sometimes timber facing) reflected regional availability and threat levels. The merlon\'s persistence in post-military architecture shows its symbolic power—Victorian and modern buildings employ decorative merlons signaling castle associations without defensive purpose.',
    PHD: 'The merlon constitutes a critical element for examining medieval military architecture, regional building traditions, and the relationship between function and form. Scholarly research employs experimental archaeology testing merlon effectiveness against period weapons, revealing both capabilities and vulnerabilities. Archaeological investigations document merlon construction techniques, damage patterns from actual combat, and later modifications. Regional studies trace distinctive merlon types—Romanesque simple forms, Gothic elaborations, Renaissance decorative variations—revealing both military and aesthetic evolution. The element\'s political dimension, particularly Italian Guelph-Ghibelline symbolism, demonstrates how architectural details encoded social meaning. Conservation research addresses merlon-specific deterioration including top surface weathering, corner spalling, and structural cracking from thermal movement. Contemporary scholarship examines merlon representations in heritage tourism and popular culture, analyzing how these elements shape medieval castle imagery.',
  },

  history: {
    ELEMENTARY: 'Ancient soldiers invented merlons thousands of years ago to hide behind while defending city walls. Medieval castle builders made them an important part of every fortress. Some merlons had special shapes that showed which side the castle was on in Italian wars!',
    MIDDLE_SCHOOL: 'Merlons appeared in ancient fortifications from Mesopotamia to Rome. Medieval European castles systematized their use from the Norman period onward. Italian city-states developed distinctive merlon shapes—squared tops for Guelphs (supporting the Pope), swallow-tails for Ghibellines (supporting the Emperor). As cannons made them obsolete for defense, merlons continued as decorative castle features.',
    HIGH_SCHOOL: 'Merlon history parallels fortification development from ancient prototypes through medieval refinement to decorative use. Ancient Near Eastern and Roman fortifications featured simple crenellations. Norman castle building (11th-12th centuries) established standard rectangular merlons. The 13th-14th centuries saw elaboration including arrow-slitted merlons and decorative tops. Italian merlons acquired political meanings: Guelph squared versus Ghibelline swallow-tailed. Tudor and later periods used merlons decoratively. Gothic Revival architecture revived medieval merlon forms for romantic effect.',
    UNDERGRADUATE: 'Merlon development reveals evolving defensive architecture responding to changing military technology. Early medieval simple rectangular forms proved adequate against arrows and early siege engines. Thirteenth-century developments included arrow-slitted merlons enabling more protected firing positions and reinforced construction resisting increasingly powerful projectile weapons. Regional variations emerged reflecting materials, threats, and traditions—French merlons often featured machicolations, English forms emphasized solid construction, Italian types incorporated political symbolism. The element\'s proportions stabilized around empirically derived optimal dimensions. Documentary evidence including medieval military manuals and building accounts reveals conscious design choices balancing protection, offensive capability, and construction economy. Transition to decorative use began in the 15th century as firearms reduced battlement effectiveness, though military merlons continued in some contexts into the 17th century.',
    GRADUATE: 'The merlon\'s history encompasses military architecture evolution, regional building traditions, and symbolic communication. Research reveals sophisticated medieval understanding of defensive design—merlon dimensions optimized for contemporary weapons, spacing facilitated defender movement, and construction techniques provided maximum protection within material and economic constraints. Archaeological evidence documents combat damage to merlons, informing understanding of actual medieval warfare. The element\'s regional variations demonstrate cultural diversity within medieval Europe—Italian political merlons, Islamic decorative patterns, French structural integration with machicolations, English solid defensive forms. Legal documents including building contracts and military ordinances reveal design specifications and quality control. The merlon\'s persistence in post-medieval architecture reflects its powerful symbolic associations, with Tudor, Victorian, and modern buildings employing merlon motifs divorced from military function.',
    PHD: 'Scholarly engagement with merlon history employs multiple methodologies: military archaeology analyzing combat effectiveness and battle damage, architectural history tracing typological development and regional variations, materials science examining construction techniques and deterioration patterns, and cultural history interpreting symbolic meanings. Recent work challenges functional determinism, revealing aesthetic considerations in medieval merlon design alongside military requirements. Studies employing computer modeling simulate projectile impacts on merlon structures, while experimental archaeology tests period weapons against replica merlons. Conservation research develops assessment protocols for deteriorating merlons, addressing characteristic problems including top surface erosion, freeze-thaw damage, and biological growth. Contemporary scholarship examines merlon roles in castle tourism and heritage interpretation, analyzing how these elements communicate "castle-ness" in popular imagination.',
  },

  characteristics: [
    'Solid upright parapet section',
    'Alternates with open crenels',
    'Typically 3-5 feet wide',
    'Height 4-6 feet above wall-walk',
    'May include arrow slits',
    'Simple or decorative tops',
  ],

  famousExamples: [
    { name: 'Tower of London', location: 'London, England', year: '1078-1399', description: 'Classic Norman square merlons' },
    { name: 'Palazzo Vecchio', location: 'Florence, Italy', year: '1299-1314', description: 'Guelph (square-topped) merlons' },
    { name: 'Castelvecchio', location: 'Verona, Italy', year: '1354-1356', description: 'Ghibelline (swallow-tailed) merlons' },
    { name: 'Caernarfon Castle', location: 'Wales', year: '1283-1330', description: 'Edwardian castle merlons' },
    { name: 'Alcázar of Segovia', location: 'Segovia, Spain', year: '12th-16th century', description: 'Spanish castle merlons' },
  ],

  confusionPairs: [
    {
      elementId: 'crenel',
      reason: 'Both are parts of battlements',
      distinction: 'Merlon is the solid upright section; crenel is the open gap between merlons',
    },
    {
      elementId: 'battlement',
      reason: 'Merlons are part of battlements',
      distinction: 'Battlement is the complete defensive parapet system; merlon is one solid element within it',
    },
  ],

  searchTags: ['battlement', 'castle', 'fortification', 'wall', 'defense', 'crenel', 'parapet', 'medieval', 'tooth', 'ghibelline', 'guelph'],

  arMetadata: {
    modelPath: '/models/architecture/merlon.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Top Surface', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Front Face', position: { x: 0, y: 0.5, z: 0.2 } },
      { label: 'Arrow Slit (optional)', position: { x: 0, y: 0.6, z: 0 } },
      { label: 'Base (Wall-Walk Level)', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
