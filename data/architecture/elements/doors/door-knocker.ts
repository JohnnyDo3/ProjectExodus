import type { ArchitecturalElement } from '../../types';

export const DOOR_KNOCKER: ArchitecturalElement = {
  id: 'door-knocker',
  slug: 'door-knocker',
  name: 'Door Knocker',
  alternativeNames: ['Knocker', 'Door Rapper', 'Sanctuary Knocker', 'Lion\'s Head Knocker'],
  pronunciation: {
    phonetic: 'DOOR NAH-ker',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Metal device for knocking to announce arrival',
    rootWord: 'knock (to strike)',
  },
  category: 'DOOR',
  subcategory: 'door_hardware',
  periods: ['medieval', 'renaissance', 'baroque', 'neoclassical', 'gothic-revival', 'arts-and-crafts'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/door-knocker-primary.jpg',
    gallery: [
      '/images/architecture/elements/door-knocker-lion.jpg',
      '/images/architecture/elements/door-knocker-medieval.jpg',
      '/images/architecture/elements/door-knocker-georgian.jpg',
    ],
    diagram: '/images/architecture/diagrams/door-knocker-detail.svg',
  },

  description: {
    ELEMENTARY: 'A door knocker is a metal decoration on a door that you can lift and drop to make a loud knocking sound! Before doorbells were invented, this was how people let you know they were at your door. Many door knockers are shaped like animals, especially lions.',
    MIDDLE_SCHOOL: 'The door knocker is a hinged metal fixture mounted on a door, consisting of a decorative backplate and a movable striker that can be lifted and released to produce a distinctive knocking sound. Traditional designs include ring knockers, lion\'s head knockers, and various figural forms. Materials typically include brass, bronze, iron, or steel. Door knockers served as the primary door-answering notification device before electric doorbells.',
    HIGH_SCHOOL: 'Door knocker design combines functional and decorative purposes, consisting of a fixed mounting plate secured to the door and a pivoting striker element (often ring-shaped or hammer-style) that produces sound through impact. The fixture mounts via screws or bolts through the door, often with a strike plate or boss to protect the door surface and enhance resonance. Historical knockers range from simple iron rings on medieval doors to elaborate cast bronze sculptures in Renaissance and Baroque architecture. Common motifs include lion heads, grotesques, hands, and classical figures. Metallurgical considerations include corrosion resistance (brass and bronze preferred), weight providing satisfying impact sound, and patina development over time.',
    UNDERGRADUATE: 'Door knocker evolution reflects metalworking technology, social customs, and decorative arts traditions. Construction typically involves lost-wax casting for complex forms or forging for simpler designs, with the striker element pivoting on a pin or integrated hinge. Acoustic properties depend on striker mass, impact surface area, and mounting method-knockers on solid wood doors produce different tones than those on hollow-core modern doors. Medieval sanctuary knockers granted ecclesiastical asylum when grasped. Renaissance and Baroque periods developed elaborate iconographic programs-classical masks, mythological figures, family crests. Georgian architecture standardized simpler urn and ring forms. Victorian era revived ornate historical styles. Arts and Crafts movement emphasized hand-crafted metalwork. Modern doorbells largely supplanted knockers\' functional role, relegating them to decorative status, though traditional architecture and historic restoration maintain their use.',
    GRADUATE: 'The door knocker embodies intersections of functional hardware, decorative sculpture, and social ritual. Medieval examples served symbolic and practical purposes-sanctuary knockers at cathedral doors (Durham Cathedral, c. 1140) provided legal refuge, while the act of grasping the ring initiated juridical protection. Renaissance metalworkers elevated knockers to sculptural art, with workshops producing castings for wealthy patrons featuring complex iconography-grotesque masks to ward evil, classical references demonstrating erudition, or heraldic devices asserting lineage. The knocker\'s acoustic function required metallurgical knowledge-bronze\'s resonance, appropriate mass for satisfying impact, strike plate design for amplification. Social protocols governed knocker use-distinctive knocking patterns might identify expected visitors, while servant entrances received simpler hardware. Industrial production democratized ornamental knockers previously requiring artisan casting. Contemporary applications navigate tensions between historical authenticity, security requirements, and electronic communication systems.',
    PHD: 'Scholarly analysis of door knockers addresses decorative arts history, material culture, and socio-spatial practices. Art historical research examines knockers as sculptural objects, tracing stylistic evolution through surviving examples and documentary sources, analyzing iconographic programs within broader Renaissance and Baroque visual culture. Archaeological studies of medieval sanctuary knockers investigate relationships between architectural hardware and legal customs. Metallurgical analysis reveals production techniques, alloy compositions, and workshop practices through technical examination of castings. Social history explores knockers within protocols of visiting, class distinctions encoded in hardware quality, and threshold rituals. Conservation science addresses appropriate cleaning, corrosion stabilization, and reproduction techniques for missing elements. Contemporary research examines door knockers as vernacular sculpture, investigates regional variations in design traditions, and addresses authentication of purportedly historical examples in antique markets.',
  },

  history: {
    ELEMENTARY: 'Door knockers have been used for over 1,000 years! Ancient Romans had simple ring knockers on their doors. In the Middle Ages, big churches had special sanctuary knockers-if someone running from danger grabbed the knocker, they were safe! Door knockers were used until electric doorbells were invented about 150 years ago.',
    MIDDLE_SCHOOL: 'Door knockers appeared in ancient Rome and continued through medieval Europe. Medieval sanctuary knockers at churches (like Durham Cathedral\'s lion head, c. 1140) granted asylum. Renaissance Italy and France produced elaborate cast bronze knockers. Georgian England (1714-1830) developed standardized brass knockers in classical styles. Victorian era (1840-1900) revived ornate historical designs. Electric doorbells, introduced in the 1860s, gradually replaced knockers\' functional purpose.',
    HIGH_SCHOOL: 'Door knocker history spans from Roman iron rings through elaborate Renaissance bronzes to standardized Georgian brass fittings. Roman examples from Pompeii (79 CE) show ring knockers already established. Medieval period developed sanctuary knockers with legal significance-Durham Cathedral\'s bronze lion head (c. 1140) exemplifies this tradition. Renaissance workshops, particularly in Florence and Venice, created elaborate knockers featuring grotesque masks, mythological figures, and classical motifs. These required sophisticated lost-wax casting techniques. Georgian period (1720s-1830s) standardized simpler forms-urn-shaped knockers, plain rings-reflecting neoclassical taste. Victorian eclecticism revived historical styles. Arts and Crafts movement (1880s-1910s) emphasized hand-forged designs. Electric doorbell invention (1831) and widespread adoption (1860s-onward) reduced functional necessity.',
    UNDERGRADUATE: 'Door knocker development reflects metalworking evolution, social customs, and artistic movements. Roman iron knockers required basic forging skills, while medieval bronze sanctuary knockers demonstrated advanced casting capabilities. The legal significance of sanctuary knockers-granting asylum to fugitives grasping them-encoded sacred space boundaries in physical form, documented in ecclesiastical and legal records. Renaissance elevation of knockers to sculptural status paralleled broader artistic developments, with workshops producing models and multiples for merchant and noble clientele. Pattern books disseminated designs across Europe. Georgian standardization reflected neoclassical rationalization and emerging consumer goods manufacturing. Industrial Revolution enabled mass production of previously artisan-made items, with Birmingham foundries producing catalog hardware. Victorian revivalism sourced historical precedents, while Arts and Crafts rejected industrial production. Doorbells\' gradual displacement of knockers paralleled electrification and changing domestic service patterns.',
    GRADUATE: 'The door knocker\'s historical trajectory reveals relationships between material culture, social practice, and artistic production. Medieval sanctuary knockers embodied complex legal-religious concepts-physical contact initiating juridical protection, ecclesiastical metalwork asserting sacred authority. Renaissance transformation into decorative art form reflected changing patronage patterns, workshop specialization, and humanist iconographic programs. Venetian workshops produced elaborate knockers for palazzos, encoding family identity through heraldic devices and classical references. Georgian rationalization paralleled broader Enlightenment systematization, with pattern books (Chippendale, Adam brothers) codifying appropriate forms for architectural contexts. Industrial production democratized ornamental hardware, creating tensions between mechanized reproducibility and artisan uniqueness that Arts and Crafts ideology engaged. Doorbells\' technological displacement of knockers in late 19th-early 20th centuries relocated announcement function from visitor-initiated mechanical impact to button-activated electrical signal, fundamentally altering threshold interaction while reducing knockers to decorative vestige or heritage marker.',
    PHD: 'Scholarly engagement with door knockers employs interdisciplinary methodologies: art historical analysis of knockers as sculptural objects within decorative arts traditions, material culture studies interpreting hardware as encoding social practices and status, archaeological examination of excavated examples, metallurgical analysis revealing production techniques, and legal-historical investigation of sanctuary knocker traditions. Research addresses questions including: How did Renaissance workshop organization structure knocker production and distribution? What relationships existed between knocker iconography and broader visual culture? How did sanctuary knocker customs operate legally and spatially? Technical studies employ compositional analysis, casting technique examination, and corrosion pattern documentation. Conservation research develops appropriate cleaning and stabilization protocols. Contemporary scholarship investigates regional design traditions, examines knockers within vernacular architecture studies, and analyzes Victorian Gothic Revival adaptation of medieval precedents as heritage construction.',
  },

  characteristics: [
    'Hinged metal fixture on door',
    'Movable striker produces sound',
    'Mounted via backplate',
    'Common materials: brass, bronze, iron',
    'Often highly decorative',
    'Popular motifs: lions, grotesques, rings',
    'Preceded electric doorbells',
  ],

  famousExamples: [
    { name: 'Durham Cathedral', location: 'Durham, England', year: 'c. 1140', description: 'Medieval sanctuary knocker in form of grotesque lion head' },
    { name: 'Palazzo Strozzi', location: 'Florence, Italy', year: '1489-1538', description: 'Renaissance palace with elaborate bronze knockers' },
    { name: '10 Downing Street', location: 'London, England', year: '1735 (knocker)', description: 'Iconic lion\'s head knocker on Prime Minister\'s residence' },
    { name: 'Palazzo Vecchio', location: 'Florence, Italy', year: '15th century', description: 'Historic bronze door knockers with Medici associations' },
    { name: 'Historic Charleston', location: 'Charleston, South Carolina', year: '18th-19th century', description: 'Collection of Georgian and Federal-era brass knockers' },
  ],

  confusionPairs: [
    {
      elementId: 'doorbell',
      reason: 'Both announce arrivals at doors',
      distinction: 'Door knockers are mechanical, struck by hand; doorbells are electrical buttons triggering chimes',
    },
    {
      elementId: 'door-handle',
      reason: 'Both are door hardware',
      distinction: 'Door knockers are for announcing arrival; door handles/knobs are for opening doors',
    },
  ],

  searchTags: ['door', 'knocker', 'hardware', 'brass', 'bronze', 'lion', 'medieval', 'sanctuary', 'Georgian', 'decorative'],

  arMetadata: {
    modelPath: '/models/architecture/door-knocker.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Backplate/Boss', position: { x: 0, y: 0, z: -0.05 } },
      { label: 'Striker/Ring', position: { x: 0, y: -0.3, z: 0 } },
      { label: 'Hinge Pin', position: { x: 0, y: 0.15, z: 0 } },
      { label: 'Decorative Motif', position: { x: 0, y: 0.05, z: 0.05 } },
      { label: 'Strike Point', position: { x: 0, y: -0.35, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
