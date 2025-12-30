import type { ArchitecturalElement } from '../../types';

export const NAVE: ArchitecturalElement = {
  id: 'nave',
  slug: 'nave',
  name: 'Nave',
  alternativeNames: ['Church Nave', 'Central Aisle', 'Main Vessel'],
  pronunciation: {
    phonetic: 'NAYV',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Ship',
    rootWord: 'navis (ship - symbolic of Church as vessel of salvation)',
  },
  category: 'RELIGIOUS',
  subcategory: 'christian',
  periods: ['roman', 'byzantine', 'romanesque', 'gothic', 'renaissance', 'baroque', 'neoclassical'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/nave-primary.jpg',
    gallery: [
      '/images/architecture/elements/nave-gothic.jpg',
      '/images/architecture/elements/nave-romanesque.jpg',
    ],
    diagram: '/images/architecture/diagrams/nave-section.svg',
  },

  description: {
    ELEMENTARY: 'The nave is the main middle part of a church where people sit during services. It\'s like a long hallway that goes from the front door toward the altar. The word "nave" comes from the Latin word for ship because the upside-down ceiling looks like the bottom of a boat!',
    MIDDLE_SCHOOL: 'The nave is the central, main body of a church, extending from the entrance to the chancel or altar area. It\'s typically flanked by side aisles separated by rows of columns or piers. The nave is where the congregation gathers for worship. In large churches, the nave is often tall with windows high up (clerestory windows) that bring light into the space. The ceiling can be flat, vaulted, or have exposed wooden beams.',
    HIGH_SCHOOL: 'The nave is the principal longitudinal space of a church, typically rectangular, extending from the main entrance (west end) to the crossing or chancel (east end), and flanked by aisles. In cross-section, the nave rises higher than the side aisles, creating a basilican profile with clerestory windows illuminating the central space. The nave\'s width, height, and length establish a church\'s scale and spatial character. Structural systems vary: Early Christian and Romanesque churches used timber roofs or barrel vaults, Gothic churches developed ribbed vaults achieving unprecedented heights, and later periods employed various ceiling treatments. The nave typically accommodates the congregation, in contrast to the chancel (clergy area) and aisles (circulation and additional seating).',
    UNDERGRADUATE: 'The nave constitutes the primary congregational space in Christian basilical church architecture, with its design reflecting liturgical requirements, structural capabilities, and aesthetic ambitions across periods. Proportional systems governing nave dimensions evolved historically: Early Christian basilicas established length-to-width ratios (typically 3:1 or 4:1), Romanesque churches developed relationships between nave height and width, Gothic architecture pushed vertical proportions to extremes (Beauvais nave height equals three times its width). The nave\'s structural treatment varied: Roman basilicas used timber roofs on column arcades, Romanesque churches employed stone barrel or groin vaults requiring thick walls and limited windows, Gothic innovation with ribbed vaults, pointed arches, and flying buttresses enabled thin walls with extensive glazing. The nave\'s liturgical function—housing the congregation—influenced design including sight lines to the altar, acoustics for preaching and music, and processional axes. Regional variations emerged in nave treatment, from Italian relatively low-proportioned bright spaces to French Gothic extreme vertical emphasis.',
    GRADUATE: 'The nave embodies fundamental relationships between liturgical function, structural innovation, and spatial experience in Christian architecture. Analysis reveals how nave design reflects theological concepts—the basilican longitudinal axis creates processional movement toward the altar symbolizing spiritual journey, vertical emphasis suggests aspiration toward heaven, and light symbolizes divine presence. Structural evolution shows progressive refinement: Early Christian timber-roofed basilicas accepted fire risk for ease of construction, Romanesque stone vaulting solved fire problems while creating dark interiors, Gothic structural systems reunited height with light through skeletal construction. The nave\'s acoustic properties received attention—reverberation time affects music and speech intelligibility, with different periods valuing different acoustic qualities. Regional traditions developed distinctive nave characteristics: Byzantine churches often employed domed central spaces rather than longitudinal naves, Italian churches maintained classical horizontal emphasis, French Gothic achieved vertical dominance, English Gothic emphasized length, German hall churches eliminated height distinction between nave and aisles. Liturgical reforms at various periods prompted nave reconfigurations.',
    PHD: 'The nave constitutes a central element for examining Christian architectural evolution, liturgical practice, structural engineering, and spatial phenomenology. Scholarly research addresses multiple dimensions: architectural archaeology documenting nave development from Roman basilicas through medieval elaborations, structural analysis examining vault construction and lateral thrust systems, liturgical studies analyzing how nave space accommodates worship practices, acoustic research testing performance characteristics, and phenomenological investigations of spatial experience. Recent work employs digital modeling reconstructing lost or altered naves, enabling analysis of original spatial qualities and lighting conditions. Comparative studies examine variations across Christian traditions—Catholic, Orthodox, Protestant—revealing how theological and liturgical differences manifest spatially. Research on medieval construction documents reveals nave building processes, workforce organization, and technical challenges. Conservation science addresses nave-specific issues including vault stability, foundation settlement affecting columnar arcades, and environmental conditions for preservation. Contemporary scholarship examines how historic naves adapt to modern liturgical practices (particularly post-Vatican II reforms), challenges of nave accessibility and modern building codes, and the role of naves in church buildings adapted for secular uses.',
  },

  history: {
    ELEMENTARY: 'Early Christians borrowed the nave design from Roman buildings called basilicas, which were like big meeting halls. Over centuries, builders made church naves taller and taller, with Gothic cathedrals having amazingly high naves that made people feel closer to heaven!',
    MIDDLE_SCHOOL: 'The Christian nave developed from Roman basilicas, which were public halls with a central space flanked by aisles. Early Christian churches (4th-5th centuries) adopted this form. Romanesque churches (11th-12th centuries) built higher naves with stone vaults. Gothic architects (12th-15th centuries) achieved dramatic nave heights using new structural systems—some Gothic naves reach over 150 feet tall! Renaissance and later periods continued the basilican nave plan with varying treatments.',
    HIGH_SCHOOL: 'Nave development traces from Roman civic architecture through Christian adaptation and medieval elaboration. Roman basilicas provided the prototype with central hall and side aisles. Constantine-era churches (4th century) including Old St. Peter\'s established the Christian basilica with timber-roofed nave. Byzantine architecture often substituted domed central spaces for longitudinal naves. Romanesque architecture (11th-12th centuries) introduced stone vaulting over naves, requiring thick walls and buttresses (Durham Cathedral). Gothic innovation (12th-16th centuries) enabled unprecedented nave heights through ribbed vaults, pointed arches, and flying buttresses (Amiens Cathedral nave: 139 feet high). Renaissance churches often simplified nave vaulting. Baroque architecture created theatrical nave spaces with elaborate decoration. Neoclassical architecture revived basilican clarity. Modern movements variously embraced or rejected traditional nave forms.',
    UNDERGRADUATE: 'The nave\'s history reveals evolving understanding of structural engineering, changing liturgical practices, and shifting aesthetic values. Early Christian adoption of the basilican nave (4th-5th centuries) adapted Roman civic architecture for Christian worship, maintaining the central congregational space while reorienting symbolically toward the altar. Byzantine architectural traditions often favored centralized plans over longitudinal naves, reflecting different liturgical and theological emphases. Western medieval development shows progressive structural ambition: Romanesque barrel and groin vaults demonstrated mastery of stone construction while limiting height and window area, transitional periods experimented with combinations, Gothic ribbed vaulting revolutionized possibilities enabling height and light (Chartres nave: 121 feet; Beauvais: 157 feet before collapse). Regional variations emerged: Italian churches maintained relatively modest nave heights with horizontal emphasis, French Gothic pursued vertical drama, English Gothic emphasized length, German hall churches created unified spatial volumes. Post-medieval periods engaged the basilican nave tradition variously—Renaissance classicism, Baroque theatricality, neoclassical rationalism, Gothic Revival historicism, and modernist rejection or reinterpretation.',
    GRADUATE: 'The nave\'s evolution encompasses liturgical development, structural innovation, theological expression, and cultural identity formation. Research reveals complex adoption processes transforming Roman civic space into Christian sacred space, with debates about continuity versus innovation in early church architecture. Regional traditions developed distinctive nave characteristics reflecting theological emphases, structural capabilities, and aesthetic values: Byzantine preference for domed central spaces, Romanesque massive stone vaulting, Gothic skeletal construction achieving extreme vertical proportions, Renaissance mathematical harmony, Baroque spatial drama. Structural analysis reveals sophisticated empirical understanding predating formal engineering—Gothic builders pushed stone construction to limits through proportional systems and structural refinements. The nave\'s acoustic properties shaped by proportions, materials, and vaulting influenced musical and liturgical development. Liturgical reforms at various periods prompted nave modifications—Counter-Reformation visibility requirements, Protestant preaching emphasis, Vatican II communal worship models. Conservation challenges include vault stability, foundation movement, and environmental control. Contemporary nave design negotiates tradition and innovation, with some projects referencing historical forms while others seek contemporary spatial expressions of Christian worship.',
    PHD: 'Scholarly engagement with nave history employs multiple methodologies: archaeological investigation documenting development from Roman to Christian forms, structural engineering analysis examining vault construction and stability, liturgical studies relating spatial organization to worship practices, acoustic research assessing performance characteristics, phenomenological investigation analyzing spatial experience, and cultural studies examining naves as expressions of religious and social identity. Recent work applies digital reconstruction to lost or heavily modified naves, enabling analysis of original proportions, lighting, and decoration. Comparative research examines nave variations across Christian traditions and regions. Studies of medieval construction documents reveal building processes, design decision-making, and resource mobilization. Conservation science addresses specific challenges in historic nave structures including vault movement, moisture issues, and appropriate interventions. Contemporary scholarship examines how historic naves adapt to modern liturgical practices and building codes, the role of naves in church adaptive reuse, and debates about appropriate design approaches for contemporary church naves balancing tradition and innovation.',
  },

  characteristics: [
    'Central longitudinal space of church',
    'Extends from entrance to chancel',
    'Flanked by side aisles',
    'Higher than aisles (clerestory windows)',
    'Houses the congregation',
    'Vaulted or timber-roofed ceiling',
  ],

  famousExamples: [
    { name: 'St. Peter\'s Basilica (old)', location: 'Rome, Italy (demolished)', year: 'c. 326-333', description: 'Prototypical Early Christian nave' },
    { name: 'Durham Cathedral', location: 'Durham, England', year: '1093-1133', description: 'Romanesque ribbed vault nave' },
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1194-1220', description: 'High Gothic nave (121 feet high)' },
    { name: 'Amiens Cathedral', location: 'Amiens, France', year: '1220-1270', description: 'Tallest Gothic nave (139 feet)' },
    { name: 'St. Paul\'s Cathedral', location: 'London, England', year: '1675-1710', description: 'Baroque classical nave' },
  ],

  confusionPairs: [
    {
      elementId: 'aisle',
      reason: 'Both are longitudinal spaces in churches',
      distinction: 'Nave is the central main space; aisles are the side passages flanking the nave',
    },
    {
      elementId: 'chancel',
      reason: 'Both are major church spaces',
      distinction: 'Nave is where congregation sits; chancel is the altar area for clergy (usually east of nave)',
    },
  ],

  searchTags: ['church', 'cathedral', 'basilica', 'central', 'aisle', 'congregation', 'vault', 'gothic', 'romanesque', 'christian', 'space'],

  arMetadata: {
    modelPath: '/models/architecture/nave.glb',
    scale: 3.0,
    rotatable: true,
    annotations: [
      { label: 'Vault/Ceiling', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Clerestory Windows', position: { x: 0.3, y: 0.8, z: 0 } },
      { label: 'Arcade/Columns', position: { x: 0.4, y: 0.5, z: 0 } },
      { label: 'Side Aisle', position: { x: 0.5, y: 0.4, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
