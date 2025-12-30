import type { ArchitecturalElement } from '../../types';

export const GROTESQUE: ArchitecturalElement = {
  id: 'grotesque',
  slug: 'grotesque',
  name: 'Grotesque',
  alternativeNames: ['Chimera', 'Decorative Monster', 'Architectural Sculpture'],
  pronunciation: {
    phonetic: 'groh-TESK',
    language: 'English',
  },
  etymology: {
    origin: 'Italian/French',
    meaning: 'Grotto-like or cave painting',
    rootWord: 'Grottesco (Italian), from grotta (cave/grotto)',
  },
  category: 'DECORATIVE',
  subcategory: 'gothic_elements',
  periods: ['ANCIENT_ROMAN', 'ROMANESQUE', 'GOTHIC', 'RENAISSANCE', 'GOTHIC_REVIVAL'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/grotesque-primary.jpg',
    gallery: [
      '/images/architecture/elements/grotesque-notre-dame.jpg',
      '/images/architecture/elements/grotesque-varieties.jpg',
    ],
    diagram: '/images/architecture/diagrams/grotesque-vs-gargoyle.svg',
  },

  description: {
    ELEMENTARY: 'A grotesque is a carved monster or weird creature that decorates a building but doesn\'t do anything - it just sits there looking scary or funny! They\'re like gargoyles but without the water coming out. You\'ll see them on old churches and castles, watching over the building like stone guardians.',
    MIDDLE_SCHOOL: 'Grotesques are decorative sculptures of fantastic creatures - monsters, demons, hybrid animals, or distorted humans - that serve no functional purpose beyond ornamentation. Unlike gargoyles (which drain water), grotesques are purely decorative. They appear on Gothic buildings, especially cathedrals, positioned on parapets, balustrades, and cornices. The term "grotesque" originally referred to Roman decorative motifs discovered in underground ruins ("grottoes").',
    HIGH_SCHOOL: 'The grotesque represents purely ornamental sculpture featuring bizarre, fantastic, or monstrous imagery without functional purpose. While often confused with gargoyles, grotesques lack drainage channels and serve aesthetic, symbolic, or apotropaic functions. The term derives from Italian "grottesco," referring to Roman decorative schemes discovered in excavated ruins. In medieval architecture, grotesques populate building exteriors, particularly on Gothic structures where they complement architectural programs. Renaissance grotesque decoration drew on rediscovered Roman models, creating hybrid plant-animal-human compositions.',
    UNDERGRADUATE: 'Grotesque ornament encompasses two distinct traditions: the Roman decorative vocabulary of hybrid vegetal-figural compositions, and the medieval sculptural tradition of monstrous figures. Roman grotesques, discovered in Renaissance excavations of the Domus Aurea and other sites, featured fantastical combinations of human, animal, and plant elements in arabesque compositions. Medieval architectural grotesques typically depict monstrous creatures, demons, or satirical figures positioned on church exteriors. The relationship between these traditions is complex - while sharing the term "grotesque," they represent distinct aesthetic and cultural systems.',
    GRADUATE: 'Scholarly analysis of grotesques addresses iconographic, aesthetic, and cultural dimensions. Roman grotesque decoration, systematically studied during Renaissance excavations, represented a canonical ornamental vocabulary revived by artists from Raphael to Adam. The motif\'s "irrational" combinations of disparate elements challenged classical aesthetic principles, generating theoretical debate about artistic license versus natural truth. Medieval architectural grotesques raise different questions regarding theological justification for monstrous imagery on sacred buildings. Interpretations range from apotropaic protection to moral exempla to expressions of subversive popular culture. Modern conservation faces challenges including weathering of exposed sculptures and debates over appropriate replacement.',
    PHD: 'The grotesque presents fertile ground for interdisciplinary research spanning classical archaeology, medieval studies, Renaissance art history, and aesthetic theory. Roman grotesque decoration requires analysis of ancient sources (Vitruvius\'s critique), Renaissance reception (Raphael\'s Vatican loggias), and theoretical discourse (Hogarth, Ruskin). Medieval grotesques demand examination within theological frameworks addressing monstrous imagery, drawing on bestiary traditions, demon catalogues, and marginalia studies. Recent scholarship employs digital humanities methods to document and analyze large grotesque populations, revealing workshop practices and iconographic patterns. Theoretical work addresses the grotesque through frameworks including the uncanny, the carnivalesque, and liminality. Contemporary research also examines grotesque receptions in modern popular culture.',
  },

  history: {
    ELEMENTARY: 'The word "grotesque" comes from discoveries in Italy about 500 years ago, when people explored underground Roman ruins (called "grottoes") and found weird decorations on the walls - part plant, part animal, part human! But scary monster sculptures on buildings go back even further to medieval times, when carvers put strange creatures on churches to scare away evil or make people think about their faith.',
    MIDDLE_SCHOOL: 'The term "grotesque" emerged in Renaissance Italy when artists exploring underground Roman ruins discovered fantastical decorative paintings mixing humans, animals, and plants. However, grotesque sculpture has older roots in Romanesque and Gothic architecture (11th-16th centuries), where stone carvers created monstrous figures for church exteriors. The 19th-century Gothic Revival revived architectural grotesques, with architects like Viollet-le-Duc creating new medieval-style sculptures for restored cathedrals.',
    HIGH_SCHOOL: 'The grotesque has dual origins. Roman grotesque decoration, buried for centuries, was rediscovered during Renaissance excavations of Nero\'s Domus Aurea and other sites around 1480. Artists including Raphael studied and adapted these hybrid ornamental schemes. Separately, medieval grotesque sculpture developed in Romanesque and Gothic architecture (11th-16th centuries) as part of elaborate iconographic programs. These traditions merged during the Renaissance, with "grotesque" becoming an umbrella term. Gothic Revival architects of the 1800s enthusiastically reproduced and elaborated medieval grotesques, sometimes creating more fantastical designs than originals.',
    UNDERGRADUATE: 'Grotesque history encompasses distinct but intersecting traditions. Roman decorative grotesques, featuring impossible combinations of human, animal, and vegetal elements, flourished in Augustan interior decoration but were buried by time. Renaissance discovery around 1480, particularly in the Domus Aurea, sparked enthusiastic revival by Raphael, Pintoricchio, and others. This coincided with growing interest in medieval architecture\'s sculptural grotesques. The term "grotesque" gradually encompassed both traditions. Theoretical discourse debated grotesques\' propriety - Vitruvius had criticized such "monstrous" combinations, while Renaissance artists defended imaginative license. Victorian Gothic Revival produced extensive grotesque programs, often diverging significantly from medieval models.',
    GRADUATE: 'Grotesque historiography addresses complex questions of continuity, reception, and meaning. For Roman grotesques, research examines ancient precedents, Renaissance archaeological practices, and theoretical debates about artistic imagination versus natural truth. Key questions include: How did Renaissance artists reconstruct complete systems from fragmentary remains? How did northern European artists adapt Roman models? For medieval grotesques, scholarship analyzes theological justifications (or lack thereof) for monstrous imagery, workshop practices, and possible satirical or subversive meanings. The 19th-century revival raises questions about historical accuracy versus romantic invention. Conservation research addresses deterioration patterns and debates over restoration approaches.',
    PHD: 'Grotesque research offers rich interdisciplinary opportunities. Classical archaeology employs digital reconstruction to understand lost Roman decorative schemes. Art historical research traces Renaissance rediscovery and adaptation, examining artists\' notebooks and theoretical treatises. Medieval studies analyze grotesques within theological frameworks, drawing on bestiary traditions and marginalia scholarship. Comparative iconographic research examines grotesque motifs across cultures and periods. Digital humanities approaches employ machine learning to identify and classify grotesque types across large datasets. Conservation science investigates stone deterioration mechanisms and traditional carving techniques. Theoretical work addresses the grotesque through aesthetic philosophy, psychoanalytic theory, and cultural studies frameworks exploring boundary transgression and the monstrous.',
  },

  characteristics: [
    'Purely decorative - no functional purpose',
    'Features fantastic or monstrous imagery',
    'Positioned on building exteriors',
    'Does not include water drainage channel',
    'Often includes hybrid human-animal forms',
    'Common on Gothic and Revival architecture',
  ],

  famousExamples: [
    { name: 'Notre-Dame de Paris Chimeras', location: 'Paris, France', year: '1163-1345 (chimeras added 1845)', description: 'Famous grotesques added by Viollet-le-Duc, including "Le Stryge"' },
    { name: 'Domus Aurea Grotesques', location: 'Rome, Italy', year: '64-68 CE', description: 'Original Roman painted grotesques that inspired Renaissance' },
    { name: 'Raphael\'s Vatican Loggias', location: 'Vatican City', year: '1517-1519', description: 'Renaissance grotesque decoration inspired by Roman models' },
    { name: 'Lincoln Cathedral', location: 'Lincoln, England', year: '1072-1311', description: 'Medieval grotesques including the famous Lincoln Imp' },
    { name: 'Woolworth Building', location: 'New York City, USA', year: '1910-1913', description: 'Gothic Revival grotesques on early skyscraper' },
  ],

  confusionPairs: [
    {
      elementId: 'gargoyle',
      reason: 'Both are monster sculptures on Gothic buildings',
      distinction: 'Gargoyles are functional water spouts; grotesques are purely decorative with no water channel',
    },
    {
      elementId: 'boss',
      reason: 'Both are decorative sculptures on medieval buildings',
      distinction: 'Grotesques are exterior figures; bosses are decorative ceiling elements at vault intersections',
    },
  ],

  searchTags: ['gothic', 'sculpture', 'monster', 'decorative', 'medieval', 'chimera', 'creature', 'grotesque', 'ornament', 'fantasy'],

  arMetadata: {
    modelPath: '/models/architecture/grotesque.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Head', position: { x: 0, y: 0.1, z: 0.05 } },
      { label: 'Body', position: { x: 0, y: 0, z: 0 } },
      { label: 'Base', position: { x: 0, y: -0.05, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
