import type { ArchitecturalElement } from '../../../types';

export const THATCH_ROOF: ArchitecturalElement = {
  id: 'thatch-roof',
  slug: 'thatch-roof',
  name: 'Thatch Roof',
  alternativeNames: ['Thatching', 'Reed Roof', 'Straw Roof'],
  pronunciation: {
    phonetic: 'THATCH ROOF',
    language: 'English',
  },
  etymology: {
    origin: 'Old English',
    meaning: 'From "þæc" meaning roof or covering; related to German "Dach" (roof)',
    rootWord: 'þæc (Old English)',
  },
  category: 'ROOF',
  subcategory: 'natural_roofing',
  periods: ['ANCIENT', 'MEDIEVAL', 'VERNACULAR', 'CONTEMPORARY'],
  regions: ['WORLDWIDE', 'EUROPE', 'AFRICA', 'ASIA', 'PACIFIC'],

  images: {
    primary: '/images/architecture/elements/thatch-roof-primary.jpg',
    gallery: [
      '/images/architecture/elements/thatch-roof-cottage.jpg',
      '/images/architecture/elements/thatch-roof-detail.jpg',
      '/images/architecture/elements/thatch-roof-construction.jpg',
    ],
    diagram: '/images/architecture/diagrams/thatch-roof-construction.svg',
  },

  description: {
    ELEMENTARY: 'A thatch roof is made from dried plant materials like straw, reeds, or grasses bundled together and layered on top of a house, like a thick blanket. People have been making thatch roofs for thousands of years by tying bundles of dried plants to wooden frames, starting at the bottom and working upward so rain runs off. When done right, thatch roofs are waterproof, keep houses cool in summer and warm in winter, and can last 20-60 years! They look beautiful with their golden color and rounded edges. Many storybook cottages have thatched roofs, and you can still see them in England, Ireland, and many other countries.',
    MIDDLE_SCHOOL: 'Thatch roofing uses dried vegetation - typically water reed, wheat straw, or long straw - bundled and layered to create a weatherproof roof covering. Traditional thatching requires skilled craftspeople who secure bundles to the roof structure using various techniques depending on region and materials. The bundles are laid in overlapping courses from eave to ridge, angled steeply (usually 45-55 degrees) to shed water. Properly installed thatch is waterproof because water runs down the outer surface without penetrating the densely-packed layers. Thatch provides excellent insulation (R-value approximately 2 per inch), natural ventilation, and biodegradable construction. Different materials last different periods - water reed 50-60 years, combed wheat straw 25-40 years, long straw 15-25 years. Fire resistance is a concern, though modern treatments can improve safety.',
    HIGH_SCHOOL: 'Thatch roofing represents one of humanity\'s oldest roofing technologies, employing dried vegetation arranged to shed water through steep pitch and overlapping layers. Material selection depends on regional availability and tradition - water reed (Phragmites australis) offers greatest durability, wheat or rye straw provides traditional alternatives, and various regional materials include palm fronds, heather, and sedge. Thatching techniques vary by region: English long straw uses entire stalks laid parallel; combed wheat reed uses stems with heads removed; Continental European reed thatching employs different fixing methods. The critical principle is creating a thick covering (typically 12-16 inches) at steep pitch (minimum 45 degrees, ideally 50-55 degrees) where water runs off the outer surface before penetrating. The roof structure requires appropriate support for thatch weight and fixing. Thatch offers several performance advantages: excellent insulation value, natural ventilation through breathability, acoustic dampening, and sustainable lifecycle. Fire risk is significant but manageable through ridge design, clearances, and modern treatments.',
    UNDERGRADUATE: 'Thatch roofing encompasses sophisticated vernacular technology varying significantly by region, material, and cultural tradition. Material science considerations include cellular structure of different plants affecting water-shedding and durability - hollow-stemmed reeds provide optimal performance through capillary action directing water downward. Deterioration mechanisms include ultraviolet degradation, microbial decomposition, bird damage, and moisture-related decay, primarily affecting outer surface layers. The thatching process involves complex interactions between material preparation, fixing methodology, pitch angle, and compression. English traditions distinguish between long straw (entire stalks butted and directionally laid), combed wheat reed (aligned stems), and water reed (premium material) - each requiring different techniques and producing different aesthetics and performance. Continental European and Asian traditions employ alternative methodologies. Structural considerations include dead load (typically 40-50 lb/sq ft), live load capacity, and appropriate roof pitch. Fire performance analysis reveals thatched roofs pose genuine hazards requiring mitigation through design (ridge detailing, chimney clearances) and potential chemical treatment, though treatments may reduce longevity. Thermal performance combines insulation value with natural ventilation, creating favorable interior conditions.',
    GRADUATE: 'Scholarly examination of thatch addresses material science, engineering performance, cultural geography, conservation science, and sustainability assessment. Materials research investigates the microstructural characteristics determining performance - scanning electron microscopy reveals surface structure and degradation mechanisms. Different species exhibit varying durability related to silica content, cellular structure, and natural preservatives. Some research examines how traditional harvesters selected optimal materials and timing. Engineering research addresses structural performance, fire behavior, and thermal-hygric properties. Fire research investigates ignition mechanisms, flame spread, and mitigation strategies - questions remain about optimal ridge detailing and effectiveness versus impacts of chemical treatments. Thermal research examines coupled heat-moisture transfer through thatch\'s complex porous structure. Cultural geography research documents regional traditions and examines thatch\'s changing social meanings - from vernacular necessity to heritage marker to luxury choice. Conservation research develops methodologies for preserving historical thatched structures, addressing challenges of material replacement while maintaining authenticity. Contemporary practice research examines economic and regulatory barriers to thatch construction. Sustainability assessment addresses lifecycle environmental performance, including cultivation impacts and end-of-life biodegradability.',
    PHD: 'Thatch research offers rich interdisciplinary opportunities spanning botany, materials science, architectural history, anthropology, and sustainability science. Botanical research investigates species characteristics affecting performance and examines how traditional management practices (harvest timing, storage, preparation) affected material quality - what empirical knowledge did traditional thatchers possess? Materials science research employs advanced characterization techniques (SEM, micro-CT, spectroscopy) to understand degradation mechanisms and develop performance prediction models. Some work investigates bio-based preservatives as alternatives to chemical treatments. Fire research employs bench-scale and full-scale testing to understand ignition and flame spread, informing both historical understanding and contemporary safety standards. Building science research investigates hygrothermal performance through coupled heat-moisture-air transport modeling. Archaeological and architectural history research traces thatch technology evolution across cultures - was development independent or diffused? How did thatching relate to social status across different societies and periods? Anthropological research examines traditional knowledge systems and craft transmission. Cultural geography research addresses contemporary meanings and changing practices. Conservation science develops evidence-based methodologies for heritage preservation, including documentation, condition assessment, and compatible repair. Sustainability research employs life-cycle assessment comparing thatch to alternative roofing materials, addressing cultivation impacts, transportation, installation, maintenance, and disposal. Contemporary practice research examines economic viability, training needs, and regulatory environments.',
  },

  history: {
    ELEMENTARY: 'Thatch roofs are probably one of the oldest types of roofs people ever made! Thousands of years ago, when people built the first houses, they used whatever plants grew nearby - reeds, straw, grasses, or palm leaves - to make roofs that kept them dry. In medieval Europe, most houses had thatched roofs. Even castles sometimes had thatch! In England and Ireland, beautiful thatched cottages have been built for centuries, and skilled thatchers still make new roofs using traditional methods today. Different countries developed their own styles - English cottages have thick, rounded thatch, while African and Pacific Island buildings use palm fronds in different patterns.',
    MIDDLE_SCHOOL: 'Thatch roofing dates to the earliest human settlements - Neolithic dwellings (6000-4000 BCE) show evidence of thatched roofs across Europe, Asia, and Africa. Viking longhouses, Anglo-Saxon halls, and medieval European buildings extensively used thatch. In 13th-century London, most buildings had thatched roofs until fire risks led to regulations. Rural vernacular architecture maintained thatching traditions even as urban areas shifted to tiles and slates. Different regions developed distinctive styles - England developed long straw and combed reed traditions; Northern Europe used rye straw; Africa and Pacific cultures employed palm, grass, and reed varieties. European colonization spread thatching to the Americas and Oceania. Industrialization and fire codes reduced thatch prevalence, but it persisted in rural areas. Late 20th century brought heritage-driven revival in Europe, particularly England, Denmark, and the Netherlands.',
    HIGH_SCHOOL: 'Thatch represents humanity\'s first roofing material, with archaeological evidence from early Neolithic settlements worldwide. Paleolithic shelters likely employed vegetable roofing, though evidence rarely survives. Bronze Age and Iron Age European roundhouses consistently show thatched roofs. Classical Mediterranean civilizations generally preferred tile roofing, though vernacular structures employed thatch. Northern European medieval architecture relied heavily on thatch - Viking longhouses, Anglo-Saxon buildings, and medieval peasant dwellings. Urban fire regulations increasingly restricted thatch - London\'s 1212 ordinance required tile or slate for new buildings after devastating fires. Regional thatching traditions evolved: English long straw and water reed traditions; Dutch and Danish reed thatching; German rye straw; Japanese rice straw; African grass and palm techniques; Pacific palm and pandanus traditions. European colonization spread techniques globally. Industrialization brought decline as manufactured roofing materials became available and fire insurance penalized thatch. Heritage movements from the 1970s revived interest, particularly in England, Netherlands, and Denmark where substantial thatched building stocks survive.',
    UNDERGRADUATE: 'Thatch historiography addresses technological origins, regional variations, social meanings, and cyclical decline and revival. The technique\'s universality across early agricultural societies reflects fundamental logic - dried vegetable materials provide readily-available, workable roofing requiring minimal tools. Regional material choices reflect local ecology - reeds in wetland areas, wheat/rye straw in grain-growing regions, palm in tropical zones. Technological variations emerged addressing local climates and cultural preferences. English traditions developed sophisticated distinctions between long straw, combed wheat reed, and water reed thatching, each with different technical requirements and aesthetic results. Northern European and Asian traditions developed parallel sophistication. Social meanings varied across contexts - in some societies thatch marked poverty or rural status, in others it carried no particular stigma. Fire risk consistently drove urban regulations restricting thatch, beginning with medieval ordinances and intensifying after major conflagrations (London 1212, 1666). Industrialization provided alternative materials (slate, tile, later corrugated metal) that were fire-safe, durable, and increasingly affordable, marginalizing thatch by the early 20th century. Contemporary revival reflects multiple factors: heritage preservation, romantic nostalgia, environmental consciousness, and in some regions, tourism economics.',
    GRADUATE: 'Scholarly examination of thatch addresses archaeological, technological, sociocultural, and environmental dimensions. Archaeological research investigates earliest roofing technologies through analysis of post-hole patterns, carbonized remains, and rare preservation events (waterlogged sites, volcanic burial). Questions persist about Paleolithic sheltering and early Neolithic roof construction. Architectural history research traces technological evolution and regional variation - what explains the development of sophisticated English thatching traditions versus simpler techniques elsewhere? How did knowledge transmission occur within and between craft communities? Social history examines changing meanings - when and why did thatch transition from universal norm to poverty marker to heritage asset? Fire history research documents the role of thatched roofs in urban conflagrations and resulting regulatory responses. Conservation research develops methodologies for preserving historical thatched buildings, addressing authenticity questions when materials require replacement. What constitutes authentic preservation when the material must be renewed every 20-60 years? Contemporary practice research examines craft survival and revival - how is traditional knowledge transmitted today? What economic, regulatory, and social factors affect thatch construction? Environmental research addresses sustainability claims through life-cycle assessment.',
    PHD: 'Thatch research presents exceptional opportunities for interdisciplinary investigation across archaeology, architectural history, anthropology, materials science, and sustainability studies. Archaeological research employs innovative analysis techniques to understand prehistoric roofing - phytolith analysis, carbonized remains, experimental archaeology - addressing questions about technological origins and early development. Architectural history research examines thatch\'s role across different building traditions and time periods, addressing style, technique, and cultural meaning. What explains sophisticated English thatching traditions? How do regional variations relate to each other? Anthropological research investigates traditional knowledge systems and craft transmission - how did thatchers acquire and transmit sophisticated empirical understanding without scientific frameworks? How did craft communities function economically and socially? Sociocultural research examines changing perceptions and meanings - from vernacular necessity to poverty marker to heritage symbol to environmental choice to luxury material. What drives these transformations? Materials science research characterizes performance properties and degradation mechanisms. Building physics research optimizes thermal and hygric performance. Fire safety research informs contemporary practice and regulations. Conservation science develops evidence-based preservation methodologies addressing unique challenges of renewable roofing material. Sustainability science employs life-cycle assessment, but questions remain about system boundaries, cultivation impacts, and comparison methodologies. Contemporary practice research examines economic viability, training pathways, and regulatory environments across different countries.',
  },

  characteristics: [
    'Roofing constructed from bundled dried vegetation (reeds, straw, grasses)',
    'Steep pitch (45-55 degrees) essential for water shedding',
    'Thick covering (12-16 inches) with layered, overlapping arrangement',
    'Excellent natural insulation and acoustic properties',
    'Biodegradable and renewable material',
    'Requires specialized craft knowledge and periodic renewal',
  ],

  famousExamples: [
    { name: 'Anne Hathaway\'s Cottage', location: 'Stratford-upon-Avon, England', year: '1463 (with later additions)', description: 'Iconic English thatched cottage, Shakespeare\'s wife\'s family home' },
    { name: 'Chysauster Ancient Village', location: 'Cornwall, England', year: 'c. 100 BCE-300 CE', description: 'Preserved Romano-British village with reconstructed thatched roundhouses' },
    { name: 'Shirakawa-go Village', location: 'Gifu Prefecture, Japan', year: '17th-20th centuries', description: 'UNESCO site with traditional gassho-zukuri thatched farmhouses' },
    { name: 'Adare Thatched Cottages', location: 'County Limerick, Ireland', year: '18th-19th centuries', description: 'Picturesque Irish thatched cottages' },
    { name: 'Great Zimbabwe (reconstructed)', location: 'Zimbabwe', year: '11th-15th centuries (reconstructed)', description: 'Traditional daga (clay) huts with grass thatch roofs' },
  ],

  confusionPairs: [
    {
      elementId: 'shingle',
      reason: 'Both are traditional roofing materials applied in overlapping layers',
      distinction: 'Thatch uses bundled dried vegetation (straw, reeds); shingles are individual wooden, slate, or tile pieces',
    },
    {
      elementId: 'living-roof',
      reason: 'Both use plant materials on roofs',
      distinction: 'Thatch uses dried dead vegetation bundled and layered; living/green roofs grow living plants in soil',
    },
  ],

  searchTags: ['vernacular', 'roofing', 'natural materials', 'sustainable', 'traditional', 'reed', 'straw', 'cottage', 'rural', 'biodegradable'],

  arMetadata: {
    modelPath: '/models/architecture/thatch-roof.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Reed Bundle', position: { x: 0, y: 0, z: 0 } },
      { label: 'Overlapping Layers', position: { x: 0.1, y: 0.05, z: 0 } },
      { label: 'Ridge Detail', position: { x: 0, y: 0.15, z: 0 } },
      { label: 'Eave Overhang', position: { x: 0.15, y: -0.05, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
