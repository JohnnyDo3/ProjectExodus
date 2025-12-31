import type { ArchitecturalElement} from '../../types';

export const APSE: ArchitecturalElement = {
  id: 'apse',
  slug: 'apse',
  name: 'Apse',
  alternativeNames: ['Apsis', 'Chancel End', 'Sanctuary Recess'],
  pronunciation: {
    phonetic: 'APS',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Arch or vault',
    rootWord: 'apsis (from Greek hapsis, arch)',
  },
  category: 'RELIGIOUS',
  subcategory: 'christian',
  periods: ['roman', 'byzantine', 'romanesque', 'gothic', 'renaissance', 'baroque'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/apse-primary.jpg',
    gallery: [
      '/images/architecture/elements/apse-romanesque.jpg',
      '/images/architecture/elements/apse-gothic.jpg',
    ],
    diagram: '/images/architecture/diagrams/apse-plan.svg',
  },

  description: {
    ELEMENTARY: 'An apse is a rounded or half-circle shaped room at the end of a church where the altar is located. If you look at a church from above, the apse looks like a half-circle or semicircle bumping out from the main rectangle of the building!',
    MIDDLE_SCHOOL: 'The apse is a semicircular or polygonal recess, typically vaulted, projecting from the east end of a church and housing the altar. In plan, it appears as a rounded extension of the church, while in section, it\'s usually covered by a half-dome or vault. The apse became the focal point of Christian churches, often decorated with mosaics or paintings depicting Christ, the Virgin Mary, or saints.',
    HIGH_SCHOOL: 'The apse is a semicircular or polygonal projection, usually at the east end of a church, forming the sanctuary or chancel area containing the main altar. Structurally, apses are typically covered by semi-domes or conch vaults. The form derives from Roman basilicas, where the apse housed the magistrate\'s seat. Christian adaptation made the apse the most sacred space, oriented eastward toward Jerusalem. Apse variations include single apses, triple apses (main apse with smaller side apses), and radiating chapels arranged around the apse (chevet). The apse interior typically features elevated floors, special decoration (mosaics in Byzantine churches, paintings or sculpture in medieval and later periods), and architectural articulation through columns or pilasters.',
    UNDERGRADUATE: 'The apse represents a fundamental element of Christian church architecture, transforming the Roman basilical form for liturgical purposes. The element\'s development traces from simple semicircular Roman precedents through Byzantine elaboration with extensive mosaic programs to Romanesque and Gothic adaptations including ambulatories and radiating chapels. Structural considerations include vault construction over semicircular or polygonal plans, window placement for illumination (clerestory windows common), and the transition from rectangular nave to curved apse (typically handled through the chancel or choir). Regional variations emerged: Italian churches often retained simple semicircular apses, French Romanesque and Gothic developed complex eastern ends with ambulatories, English Gothic favored square east ends, and Byzantine architecture elaborated apse decoration with extensive mosaic programs. The apse\'s symbolic dimension-representing divine presence, heaven, or the head of Christ (with the nave as body)-influenced its architectural treatment.',
    GRADUATE: 'The apse embodies the intersection of liturgical function, structural innovation, and theological symbolism in Christian architecture. Analysis reveals how the element evolved from Roman secular precedent into distinctively Christian sacred space. Early Christian adaptation (4th-5th centuries) maintained Roman semicircular form while transforming symbolic content-the imperial throne became Christ\'s judgment seat. Byzantine development created canonical apse programs with Christ Pantocrator or Virgin and Child in conch decoration. Western medieval evolution produced distinctive regional approaches: French pilgrimage churches with ambulatories and radiating chapels enabling circulation around relics, English preference for square-ended chancels reflecting different liturgical practices, Italian retention of simple semicircular forms. The apse\'s structural relationship to the church body created design challenges addressed differently across periods and regions. Contemporary scholarship examines how apse design reflects theological emphases, accommodates liturgical practices, and expresses ecclesiastical authority.',
    PHD: 'The apse constitutes a crucial element for examining Christian architectural development, liturgical evolution, and the relationship between Roman and Christian building traditions. Scholarly research addresses multiple dimensions: architectural archaeology documenting early Christian apse adoption from Roman basilicas, liturgical studies examining how apse design accommodates evolving worship practices, art historical analysis of apse decorative programs and their theological meanings, and structural analysis of vault construction over curved plans. Recent work employs digital reconstruction visualizing lost apse mosaics and understanding original spatial experiences. Debates address the timing and mechanisms of Christian basilica adoption, regional variations in apse treatment, and changing liturgical uses reflected in architectural modifications. Conservation research addresses apse-specific challenges including foundation movement affecting curved walls, mosaic deterioration, and structural issues in vaulted construction. Contemporary scholarship examines how traditional apse forms translate to modern church design, Vatican II liturgical reforms affecting apse use, and the element\'s role in church building conservation and adaptive reuse.',
  },

  history: {
    ELEMENTARY: 'Romans built buildings called basilicas with rounded ends where judges sat. Early Christians liked this design and used it for their churches, putting the altar in the rounded part instead! This became the standard way to build churches for over 1,500 years.',
    MIDDLE_SCHOOL: 'The apse originated in Roman public basilicas, where a semicircular recess housed the magistrate\'s seat. When Christianity became legal (313 CE), Christians adapted the basilica form for churches, placing the altar in the apse. Byzantine churches covered apses with golden mosaics showing Christ and saints. Romanesque and Gothic churches elaborated the eastern end with multiple apses and radiating chapels. The apse remained central to church design through the Renaissance and Baroque periods.',
    HIGH_SCHOOL: 'Apse development traces from Roman precedents through Christian adaptation and medieval elaboration. Roman basilicas featured apses as spaces for authority figures. Early Christian churches (4th-5th centuries) adopted this form, creating iconic examples like Old St. Peter\'s Basilica (c. 326-333). Byzantine architecture developed elaborate apse mosaic programs (Hagia Sophia, 537; San Vitale, 547). Romanesque architecture often featured multiple apses-western German Ottonian churches sometimes had apses at both east and west ends. Gothic development created complex eastern ends with ambulatories and radiating chapels (Chartres, Reims). Renaissance and Baroque churches often simplified apse forms while elaborating decoration. Modern liturgical reforms have influenced contemporary apse design.',
    UNDERGRADUATE: 'The apse\'s history reveals adaptation of Roman secular architecture for Christian sacred purposes and subsequent evolution reflecting liturgical and theological developments. Early Christian adoption (4th century) transformed the Roman magistrate\'s space into the location of Christ\'s altar, maintaining the form while revolutionizing its meaning. Regional developments emerged: Byzantine churches developed iconographic programs for apse domes featuring Christ Pantocrator or the Virgin, Syrian churches sometimes employed square chancels, Ethiopian churches created distinctive circular sanctuaries. Western medieval evolution shows diverse approaches: French Romanesque pilgrimage churches developed ambulatories enabling circulation around eastern apses where relics were displayed (Saint-Sernin, Toulouse), Gothic elaboration created complex chevets with radiating chapels (Notre-Dame, Paris), English Gothic often preferred square-ended chancels (Canterbury Cathedral). Counter-Reformation architecture emphasized apse visibility while Baroque decoration created theatrical effects. Modern developments include liturgical renewal movements affecting apse arrangement and contemporary architectural reinterpretations.',
    GRADUATE: 'The apse\'s evolution encompasses transformations in liturgy, theology, architectural technology, and cultural expression. Research reveals complex adoption processes from Roman to Christian use, with debates about continuity versus innovation in fourth-century church building. Byzantine apse programs demonstrate sophisticated theological communication through visual imagery, with hierarchical arrangements expressing doctrinal positions. Western medieval developments reflect diverse liturgical practices: monastic churches with extended eastern arms, pilgrimage churches with relic circulation systems, cathedral liturgy requiring choir space. The apse\'s structural evolution shows progressive refinement in vault construction over curved plans, window integration, and articulation of interior surfaces. Regional variations reveal how universal Christian liturgical requirements adapted to local building traditions. The Reformation and Counter-Reformation impacted apse use, with Protestant traditions sometimes de-emphasizing apse distinctiveness while Catholic churches maintained and elaborated traditional forms. Modern liturgical movements, particularly Vatican II, prompted apse reconfiguration or new design approaches.',
    PHD: 'Scholarly engagement with apse history employs interdisciplinary approaches: archaeological investigation of early Christian churches establishing adoption patterns, liturgical studies analyzing spatial requirements, art historical research examining decorative programs, structural analysis studying vault construction, and theological interpretation addressing symbolic meanings. Recent work challenges linear diffusion models, revealing complex patterns of adoption and regional variation. Digital reconstruction techniques enable virtual restoration of lost apse programs, providing insights into original spatial and visual experiences. Epigraphic studies of apse inscriptions reveal patronage, dedication, and theological messages. Comparative research examines relationships between Christian apses and precedents in Jewish synagogues, Roman temples, and civil basilicas. Conservation science addresses apse-specific deterioration including foundation settlement affecting curved walls, mosaic and fresco deterioration, and structural issues in semi-dome construction. Contemporary scholarship examines how historic apses inform modern church design, challenges of liturgical renewal in historic churches, and apse roles in church building adaptive reuse for secular purposes.',
  },

  characteristics: [
    'Semicircular or polygonal recess',
    'Typically at east end of church',
    'Houses the altar',
    'Often vaulted with semi-dome',
    'Usually decorated with mosaics or painting',
    'May have radiating chapels',
  ],

  famousExamples: [
    { name: 'Hagia Sophia', location: 'Istanbul, Turkey', year: '532-537', description: 'Byzantine apse with later Islamic additions' },
    { name: 'San Vitale', location: 'Ravenna, Italy', year: '547', description: 'Octagonal church with elaborate apse mosaics' },
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1194-1220', description: 'Gothic apse with radiating chapels' },
    { name: 'St. Peter\'s Basilica', location: 'Vatican City', year: '1506-1626', description: 'Renaissance/Baroque monumental apse' },
    { name: 'Durham Cathedral', location: 'Durham, England', year: '1093-1133', description: 'Romanesque apse with ribbed vaults' },
  ],

  confusionPairs: [
    {
      elementId: 'mihrab',
      reason: 'Both are niches in religious buildings',
      distinction: 'Apse is a large semicircular room containing the altar in churches; mihrab is a smaller niche indicating prayer direction in mosques',
    },
    {
      elementId: 'chancel',
      reason: 'Both are eastern parts of churches',
      distinction: 'Chancel is the entire area around the altar including choir; apse is specifically the semicircular end portion',
    },
  ],

  searchTags: ['church', 'christian', 'altar', 'semicircular', 'sanctuary', 'dome', 'mosaic', 'byzantine', 'cathedral', 'basilica'],

  arMetadata: {
    modelPath: '/models/architecture/apse.glb',
    scale: 2.0,
    rotatable: true,
    annotations: [
      { label: 'Semi-dome', position: { x: 0, y: 0.9, z: -0.3 } },
      { label: 'Altar Location', position: { x: 0, y: 0.3, z: -0.4 } },
      { label: 'Clerestory Windows', position: { x: 0.2, y: 0.7, z: -0.2 } },
      { label: 'Curved Wall', position: { x: 0.3, y: 0.5, z: -0.3 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
