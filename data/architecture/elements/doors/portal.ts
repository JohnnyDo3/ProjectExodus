import type { ArchitecturalElement } from '../../types';

export const PORTAL: ArchitecturalElement = {
  id: 'portal',
  slug: 'portal',
  name: 'Portal',
  alternativeNames: ['Grand Entrance', 'Monumental Doorway', 'Ceremonial Entrance', 'Gateway'],
  pronunciation: {
    phonetic: 'POR-tul',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Gate or entrance',
    rootWord: 'porta (gate, door)',
  },
  category: 'DOOR',
  subcategory: 'monumental_entrance',
  periods: ['romanesque', 'gothic', 'renaissance', 'baroque', 'neoclassical', 'beaux-arts'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/portal-primary.jpg',
    gallery: [
      '/images/architecture/elements/portal-gothic.jpg',
      '/images/architecture/elements/portal-romanesque.jpg',
      '/images/architecture/elements/portal-baroque.jpg',
    ],
    diagram: '/images/architecture/diagrams/portal-detail.svg',
  },

  description: {
    ELEMENTARY: 'A portal is a very fancy, important doorway! It\'s much bigger and more decorated than a regular door. Churches, palaces, and important buildings have beautiful portals with carvings of people, animals, and plants. Walking through a portal makes you feel like you\'re entering somewhere special!',
    MIDDLE_SCHOOL: 'The architectural portal is a monumental entrance composition that integrates the door with elaborate surrounding ornamentation and structural elements. Portals typically feature multiple receding arched frames (called orders or archivaults in Romanesque and Gothic architecture), sculptural decoration including tympana with carved reliefs, jamb figures, and decorative columns or pilasters. Portals serve ceremonial and symbolic functions, marking important thresholds and expressing the building\'s significance and purpose.',
    HIGH_SCHOOL: 'The portal represents architectural composition at the scale of entrance, combining structural elements (arches, lintels, columns), decorative sculpture, and iconographic programs into unified designs. Romanesque portals feature semicircular arches with multiple concentric orders, carved tympana depicting religious narratives, and jamb sculptures. Gothic portals elaborate this system with pointed arches, increasingly complex tracery, extensive jamb figure programs, and architectural sculpture integrated into the structural logic. Renaissance and Baroque portals employ classical vocabulary-engaged columns, entablatures, pediments-while varying scale and decorative richness. The portal\'s proportions, materials, and iconography communicate the building\'s function, patron\'s status, and cultural values.',
    UNDERGRADUATE: 'Portal design synthesizes architecture, sculpture, and meaning-making into threshold experiences. Structural analysis reveals how portals manage forces-Romanesque semicircular arches transfer loads through thick walls, Gothic pointed arches reduce lateral thrust while enabling greater height, and classical trabeated systems employ lintels supported by columns or pilasters. Sculptural programs follow iconographic hierarchies: Gothic portals organize biblical narratives from outer archivaults (Old Testament, prophets) to tympanum (Last Judgment, Christ in Majesty), with jamb figures representing apostles, saints, or virtues. Renaissance portals draw on classical precedent and humanist learning, while Baroque examples create dramatic spatial and sculptural effects. Portal construction required coordination among architects, sculptors, and masons, with design transmitted through drawings, models, and templates.',
    GRADUATE: 'The portal embodies architectural representation and spatial transition, operating simultaneously as structural necessity, sculptural composition, iconographic program, and phenomenological threshold. Medieval portals encoded theological concepts through spatial organization and sculptural hierarchies-Romanesque Moissac tympanum (1115-1130) presents apocalyptic vision, while Gothic Chartres Royal Portal (1145-1155) manifests scholastic organization of biblical history. Renaissance portals transformed this tradition through classical language-Alberti\'s Sant\'Andrea (1472-1494) applies triumphal arch motif. Baroque portals theatricalize entrance through sculptural motion and spatial compression/expansion. Beyond formal analysis, portals structured social practices: processions, liturgical entries, civic ceremonies. Their position at building-city interface made them sites of public art, legal pronouncement, and political demonstration. Contemporary preservation addresses weathering, pollution damage, and appropriate restoration approaches.',
    PHD: 'Scholarly engagement with portals encompasses art history, architectural theory, theology, and social history. Research examines medieval portals as theological texts in stone, analyzing iconographic programs through scriptural sources, liturgical practices, and theological treatises. Studies investigate workshop organization, sculptural production, and design transmission through drawings and templates. Structural analysis addresses medieval engineering knowledge, while material studies employ petrology and tool mark analysis to understand quarrying and carving techniques. Social historical approaches examine portals within urban contexts, investigating relationships to processional routes, markets, and civic space. Phenomenological analysis addresses embodied experience of portal transition-scale shifts, compression and release, threshold crossing. Conservation science develops methodologies for stone consolidation, cleaning protocols, and environmental protection. Contemporary research applies digital documentation techniques, investigates climate change impacts on stone weathering, and examines how portals constructed institutional and civic identities.',
  },

  history: {
    ELEMENTARY: 'Grand portals have been built for over 1,000 years! Medieval churches had the most amazing carved portals showing stories from the Bible. Every person walking through these doorways could see and learn these important stories. Some famous portals took many years to carve and are still beautiful today!',
    MIDDLE_SCHOOL: 'Monumental portals developed in Romanesque architecture (c. 1000-1200 CE), with major examples at French monasteries like Moissac and Vézelay. Gothic architecture (1140s-1500s) expanded portal complexity and scale, exemplified by Chartres, Reims, and Notre-Dame cathedrals. Renaissance architecture (1400s-1600s) adapted classical elements for portals. Baroque period (1600s-1700s) created dramatic entrance compositions. Neoclassical and Beaux-Arts movements (1700s-1900s) revived monumental portal traditions.',
    HIGH_SCHOOL: 'Portal history reflects evolving architectural, sculptural, and theological ideas. Early Romanesque portals (c. 1000-1100) feature relatively simple carved tympana-Moissac Abbey (1115-1130) presents complex apocalyptic imagery. Gothic development from Early (1140s-1200) through High (1200-1300) to Late (1300-1500) periods shows increasing architectural and sculptural elaboration-Chartres Royal Portal (1145-1155), Reims west facade (1230s-1275). Italian Renaissance developed portal types combining classical elements-Alberti\'s Sant\'Andrea (Mantua, 1470s) adapts triumphal arch form. French and German Renaissance maintained Gothic influence. Baroque portals achieved dramatic sculptural and spatial effects-Borromini\'s San Carlo alle Quattro Fontane (1638-1677). Neoclassical and Beaux-Arts movements (1700s-1900s) created monumental civic and institutional portals.',
    UNDERGRADUATE: 'Portal evolution demonstrates changing relationships among structure, ornament, and meaning. Romanesque portals emerged as monasticism expanded, creating didactic programs for pilgrims-Moissac, Vézelay, Autun feature elaborate tympana with apocalyptic and salvational themes. Gothic portals integrated architecture and sculpture more completely, with jamb figures seeming to support archivolt structure while maintaining iconographic coherence. Chartres Royal Portal established influential model, with column-figures and systematic theological program. Thirteenth-century developments at Reims and Amiens achieved increasing naturalism and architectural integration. Pattern transmission occurred through master mason mobility and drawing circulation. Renaissance transformed portal composition through classical vocabulary and humanist content, though religious portals maintained Christian iconography. Baroque portals dissolved clear boundaries between architecture and sculpture, creating undulating facades and dynamic entrance sequences. Neoclassical portals referenced ancient architecture while serving modern institutional programs.',
    GRADUATE: 'Portal history reveals intersections of architectural patronage, theological discourse, artistic production, and urban development. Romanesque monastic portals addressed pilgrimage culture and monastic reform movements, with iconographic programs derived from apocalyptic literature and patristic theology. Gothic cathedral portals embodied scholastic systematization of knowledge and episcopal authority, their encyclopedic sculptural programs paralleling contemporary theological summae. Workshop organization combined architectural masons and specialized sculptors, with design coordination through full-scale drawings (tracings) and templates. Renaissance portals negotiated between classical precedent and Christian purpose, sometimes uncomfortably-humanist learning and religious orthodoxy coexisted tensely. Baroque portals served Counter-Reformation theatrical liturgy and absolutist political representation. Portal positioning within urban fabrics made them stages for civic ritual, legal pronouncement, and political contestation. Their public nature invited multiple interpretations and uses beyond designers\' intentions.',
    PHD: 'Scholarly engagement with portals employs diverse methodological approaches: iconographic analysis decoding sculptural programs through textual sources, formal analysis tracing stylistic development, workshop studies examining production through archival sources and material evidence, structural analysis investigating engineering knowledge, and reception studies exploring how portals were experienced and interpreted. Recent research applies digital photogrammetry for documentation, investigates gender representation in portal sculpture, examines relationships between portal programs and liturgical practices, and addresses conservation ethics regarding cleaning, consolidation, and replacement of deteriorated sculpture. Theological studies contextualize iconography within contemporary religious thought. Social history investigates portals as sites of urban life, examining markets, legal proceedings, and political demonstrations occurring at cathedral entrances. Comparative studies examine portal traditions across regions, revealing circulation of ideas and local innovations.',
  },

  characteristics: [
    'Monumental entrance composition',
    'Integrates door with architectural frame',
    'Multiple receding orders or archivaults',
    'Sculptural decoration including tympanum',
    'Jamb figures or decorated pilasters',
    'Expresses building importance',
    'Often features iconographic program',
  ],

  famousExamples: [
    { name: 'Chartres Cathedral Royal Portal', location: 'Chartres, France', year: '1145-1155', description: 'Masterpiece of Gothic portal sculpture with column-figures' },
    { name: 'Moissac Abbey Portal', location: 'Moissac, France', year: '1115-1130', description: 'Romanesque portal with apocalyptic tympanum' },
    { name: 'Notre-Dame de Paris Portal', location: 'Paris, France', year: '1210-1250', description: 'Triple portal with Last Judgment and Virgin Mary themes' },
    { name: 'Reims Cathedral West Facade', location: 'Reims, France', year: '1230s-1275', description: 'Gothic portals with extensive sculptural program' },
    { name: 'St. Peter\'s Basilica Bronze Door', location: 'Vatican City', year: '1433-1445', description: 'Renaissance portal by Antonio Averulino (Filarete)' },
  ],

  confusionPairs: [
    {
      elementId: 'door',
      reason: 'Portal includes a door',
      distinction: 'Portal is the entire monumental entrance composition; door is the movable element within it',
    },
    {
      elementId: 'archway',
      reason: 'Both create openings',
      distinction: 'Portal is a decorated entrance composition typically with a door; archway is an open passage without door',
    },
  ],

  searchTags: ['portal', 'entrance', 'doorway', 'monumental', 'Gothic', 'Romanesque', 'tympanum', 'archivolt', 'sculptural', 'cathedral'],

  arMetadata: {
    modelPath: '/models/architecture/portal.glb',
    scale: 2.0,
    rotatable: true,
    annotations: [
      { label: 'Tympanum (Carved Relief)', position: { x: 0, y: 0.75, z: 0 } },
      { label: 'Archivolt (Decorated Arch)', position: { x: 0.3, y: 0.7, z: 0 } },
      { label: 'Jamb Figures', position: { x: -0.35, y: 0.4, z: 0 } },
      { label: 'Trumeau (Central Column)', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Door Opening', position: { x: 0, y: 0.25, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
