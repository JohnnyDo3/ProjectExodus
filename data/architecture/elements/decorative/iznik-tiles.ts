import type { ArchitecturalElement } from '../../types';

export const IZNIK_TILES: ArchitecturalElement = {
  id: 'iznik-tiles',
  slug: 'iznik-tiles',
  name: 'Iznik Tiles',
  alternativeNames: ['Iznik Ceramics', 'Ottoman Tiles', 'Turkish Tiles'],
  pronunciation: {
    phonetic: 'IZ-nik tiles',
    language: 'Turkish',
  },
  etymology: {
    origin: 'Turkish',
    meaning: 'Named after Iznik (ancient Nicaea), Turkish city where tiles were produced',
    rootWord: 'İznik (city name)',
  },
  category: 'DECORATIVE',
  subcategory: 'ceramic_tiles',
  periods: ['ottoman-classical', 'OTTOMAN'],
  regions: ['TURKEY', 'MIDDLE_EAST', 'BALKANS'],

  images: {
    primary: '/images/architecture/elements/iznik-tiles-primary.jpg',
    gallery: [
      '/images/architecture/elements/iznik-tiles-topkapi.jpg',
      '/images/architecture/elements/iznik-tiles-detail.jpg',
      '/images/architecture/elements/iznik-tiles-baghdad-pavilion.jpg',
    ],
    diagram: '/images/architecture/diagrams/iznik-tiles-construction.svg',
  },

  description: {
    ELEMENTARY: 'Iznik tiles (say "IZ-nik") are beautiful ceramic tiles made in Turkey over 400 years ago! They\'re famous for their bright blue color and pictures of flowers like tulips, carnations, and roses. The tiles were used to decorate palaces and mosques, making walls look like colorful gardens. The city of Iznik made the best tiles in the Ottoman Empire!',
    MIDDLE_SCHOOL: 'Iznik tiles are distinctive Ottoman ceramic tiles produced in the Turkish city of Iznik (ancient Nicaea) from the 15th-17th centuries. They\'re characterized by brilliant cobalt blue on white backgrounds, with red (Armenian bole) and yellow-green accents. Designs feature elaborate floral motifs (tulips, carnations, roses, hyacinths) and geometric patterns. The tiles have a hard, colorless glaze creating a luminous surface. Iznik tiles became the premier decorative element in Ottoman architecture, adorning imperial mosques, palaces (especially Topkapi Palace), tombs, and fountains. The "new style" emerged in the 16th century with the addition of vivid red pigment.',
    HIGH_SCHOOL: 'Iznik tiles represent the pinnacle of Ottoman ceramic art, produced in Iznik (northwestern Turkey) primarily during the 16th-17th centuries. The production technique involved painting designs on white slip coating, then applying transparent glaze before high-temperature firing. Color palette evolved from early blue-and-white (influenced by Chinese porcelain) to polychrome schemes including the distinctive Armenian bole red, emerald green, turquoise, and black. Floral designs dominated: tulips (symbol of Ottoman dynasty), carnations, roses, hyacinths, and composite floral motifs called "saz" style. Applications ranged from individual decorative panels to complete wall coverings. At Topkapi Palace, the Baghdad Pavilion (1638-1639) showcases blue-and-white Iznik tile facade. The industry declined after 1700 due to economic factors and competition from European ceramics.',
    UNDERGRADUATE: 'Iznik ceramic production evolved from early Ottoman centers at Iznik (ancient Nicaea) beginning in the late 15th century, reaching artistic and technical peak in the 16th century under imperial patronage. The production process required specialized knowledge: clay preparation, slip application, underglaze painting, glazing, and controlled high-temperature firing (approximately 900-950°C). The characteristic color palette developed chronologically: early blue-and-white phase (1490s-1520s) inspired by Chinese Ming porcelain; addition of turquoise and sage green (1520s-1550s); introduction of Armenian bole red raised relief (1550s onward), creating the "classic" Iznik palette. Design vocabulary integrated Persian artistic traditions (saz leaves, composite floral scrolls) with distinctively Ottoman motifs (tulips, carnations, hyacinths). Major architectural applications include Süleymaniye Mosque, Rüstem Pasha Mosque, and Topkapi Palace pavilions. Signed tiles (like those by Osman İznikli Mehmetoğlu) provide rare documentation of individual craftsmen. The industry\'s decline after 1650 resulted from diminishing imperial patronage, economic disruption, and loss of technical knowledge. Recent revival efforts attempt to recreate historical techniques.',
    GRADUATE: 'Iznik ceramic scholarship addresses technological, artistic, economic, and cultural dimensions of Ottoman tile production. Technical analysis reveals sophisticated understanding of ceramic chemistry: the brilliant cobalt blue derives from cobalt oxide, the distinctive red from Armenian bole (iron-rich red clay) applied in raised relief, the emerald green from copper oxide. The transparent lead-alkaline glaze provided luminous surface quality distinguishing Iznik from other Islamic ceramics. Artistic development shows complex negotiations between Chinese, Persian, and indigenous Ottoman influences: early blue-and-white designs directly quote Chinese porcelain motifs (clouds, waves, lotus), while later work develops distinctively Ottoman repertoire emphasizing garden flowers (tulips as dynasty symbol, carnations, roses). The "new style" emergence (mid-16th century) with raised red represented technical breakthrough and aesthetic shift toward more naturalistic floral representation. Architectural applications varied: individual panels with calligraphic inscriptions or figural scenes; complete wall programs creating unified decorative environments; mihrab surrounds in mosques; pavilion facades (Baghdad Pavilion at Topkapi). Economic analysis examines imperial workshop (nakkaşhane) organization, relationships between court designers and Iznik producers, patronage networks, and the industry\'s 17th-century collapse. Conservation challenges include adhesive deterioration, structural settlement causing tile displacement, surface deterioration from environmental exposure, and distinguishing original tiles from later repairs.',
    PHD: 'Scholarly engagement with Iznik tiles encompasses art history, material science, economic history, and conservation science. Recent technical analysis using X-ray fluorescence, neutron activation, and thermoluminescence enables provenance determination, chronological refinement, and understanding of technological changes. Research questions include: the precise chemical composition enabling distinctive color palette; the relationship between court design and workshop production (did imperial designers provide patterns, or did Iznik workshops develop independent design traditions?); the mechanisms of Chinese influence transmission (direct observation of imported porcelain, pattern books, intermediary Persian ceramics?); the causes of industry decline (economic disruption, loss of patronage, technical knowledge loss, competition from European ceramics, or combination?). Comparative research examines Iznik within broader Islamic ceramic traditions, revealing both continuities with earlier Seljuk and Timurid ceramics and innovations specific to Ottoman context. Archival research in Ottoman court records documents patronage, pricing, workshop organization, and designer-craftsman relationships. The question of attribution remains complex: while some tiles bear signatures (Osman İznikli Mehmetoğlu), most are anonymous, raising questions about individual versus collective production, workshop organization, and authorship concepts in Ottoman decorative arts. Conservation science addresses deterioration mechanisms specific to architectural tile applications: differential thermal expansion between tiles and substrate, moisture infiltration, structural movement, atmospheric pollution effects, and biological growth. Modern revival attempts raise theoretical questions about authenticity, traditional knowledge transmission, and distinctions between historical reproduction and contemporary interpretation. Digital humanities approaches enable large-scale pattern analysis, revealing design evolution, workshop signatures, and stylistic regional variations across Ottoman territories.',
  },

  history: {
    ELEMENTARY: 'The city of Iznik in Turkey started making beautiful tiles about 500 years ago. The Ottoman sultans loved these tiles so much they used them to decorate their palaces and mosques. The tiles showed tulips (the sultan\'s favorite flower!), roses, and other beautiful designs. Iznik became famous across the world for making the most beautiful tiles in bright blue, red, and green colors.',
    MIDDLE_SCHOOL: 'Iznik ceramic production began in the late 15th century in the Turkish city of Iznik (ancient Nicaea). Early production focused on blue-and-white designs inspired by Chinese porcelain. By the mid-16th century, Iznik potters developed their distinctive style with the addition of brilliant red (Armenian bole) to the color palette, creating the "classic" Iznik look. Sultan Süleyman the Magnificent (1520-1566) was a major patron, commissioning tiles for imperial mosques and palaces. The industry reached its peak in the late 16th century, with tiles adorning major buildings like the Süleymaniye Mosque and Topkapi Palace. Production declined after 1700 due to economic problems and loss of imperial patronage. Modern Turkey has revived Iznik tile production using traditional techniques.',
    HIGH_SCHOOL: 'Iznik ceramic industry development paralleled Ottoman imperial expansion and consolidation. Early production (1490s-1520s) imitated imported Chinese blue-and-white porcelain, reflecting Ottoman participation in global luxury goods trade. The distinctive Iznik style emerged during Süleyman the Magnificent\'s reign (1520-1566) with addition of new colors and development of Ottoman floral vocabulary. Major architectural commissions drove production: Süleymaniye Mosque (1550-1557) required thousands of tiles; Rüstem Pasha Mosque (1560s) features complete tile interior; Topkapi Palace pavilions employed tiles as exterior cladding (Baghdad Pavilion, 1638-1639). The "new style" with raised red pigment appeared around 1550, possibly developed by Iznik master potters responding to court demand for more vibrant decoration. Production organization involved imperial design office (nakkaşhane) creating patterns, which Iznik workshops translated into ceramic. Industry decline began in late 17th century: reduced imperial patronage (financial pressures, shift in architectural tastes), disruption from warfare, competition from European ceramics. By 1800, techniques were largely lost. 20th-century revival began with Turkish government support.',
    UNDERGRADUATE: 'Iznik ceramic history reveals complex relationships between imperial patronage, artistic innovation, technological development, and economic organization. Production emerged in context of Ottoman expansion and cultural consolidation under Mehmed II and successors, with Iznik selected due to clay quality, proximity to Istanbul, and existing pottery tradition. Early phase (1490s-1520s) demonstrates Ottoman engagement with international artistic currents, particularly Chinese porcelain imported via Silk Road trade. The transition to distinctive Ottoman style involved both technological innovation (developing red pigment, expanding color palette) and iconographic development (garden flowers replacing abstract patterns). Imperial architectural patronage shaped production: major mosque commissions required industrial-scale output, standardization of sizes and designs, quality control. The nakkaşhane (imperial design office) relationship to Iznik workshops remains debated-whether court artists provided detailed patterns or general specifications allowing workshop interpretation. Signed tiles suggest individual master craftsmen possessed creative autonomy. Regional variation in Iznik products (tiles for Istanbul buildings versus provincial mosques) reveals market segmentation. The industry\'s 17th-century decline demonstrates vulnerability of specialized craft production dependent on concentrated patronage. Multiple factors contributed: Ottoman economic crisis (inflation, debasement), reduced imperial building programs, architectural taste shifts (increasing use of painted decoration versus tiles), and possible technical knowledge loss as master craftsmen died without training successors. Modern revival (beginning 1960s) faced challenges recreating historical techniques, particularly the distinctive red pigment formula.',
    GRADUATE: 'Critical analysis of Iznik ceramic history addresses technological evolution, artistic development, patronage systems, and cultural meaning. Recent archaeological excavations at Iznik production sites reveal workshop organization, firing techniques, and production scale. Technical analysis enables precise chronological attribution based on clay composition and pigment chemistry. The Chinese influence question requires nuanced examination: while early Iznik clearly quotes Ming porcelain motifs, the mechanism of transmission remains unclear-direct observation of imported porcelain, intermediary pattern books, or influence filtered through Persian ceramics? The development of distinctive Ottoman iconographic vocabulary (tulips, carnations) during Süleyman\'s reign coincides with political consolidation and cultural confidence, suggesting tiles participated in constructing Ottoman imperial identity. The relationship between two-dimensional design arts (illuminated manuscripts, textiles) and ceramic decoration reveals shared motifs and possibly shared designers. Economic analysis examines pricing (imperial account books document costs), workshop organization (family operations, guild structures), and market segmentation (imperial commissions versus commercial sales). The question of artistic agency-were Iznik potters executing court designs or developing independent creative traditions?-merits investigation. Some scholars argue workshop masters possessed significant creative freedom, evidenced by signed tiles and stylistic variations. Conservation research addresses deterioration mechanisms and restoration ethics: should replaced tiles match historical examples exactly, or be distinguished as modern interventions? The modern revival raises questions about authenticity and cultural heritage: can contemporary production using traditional techniques be considered "Iznik tiles," or are they reproductions? What role does historical continuity versus technical accuracy play in cultural authenticity?',
    PHD: 'Scholarly investigation of Iznik tiles employs interdisciplinary methodologies spanning art history, archaeology, material science, economic history, and cultural studies. Archaeological research at Iznik production sites documents workshop locations, kiln structures, production waste, and chronological sequences. Material science analysis using X-ray fluorescence, neutron activation analysis, and thermoluminescence provides data on clay sources, pigment composition, firing temperatures, and chronological attribution. Key research questions include: the precise chemical composition enabling Iznik\'s distinctive color palette (particularly the brilliant red); the technological relationship to earlier Islamic ceramics and Chinese porcelain; the mechanisms of design transmission from imperial court to workshops; the organization of production (individual masters, workshop collectives, guild structures); and the causes of industry collapse. Archival research in Ottoman court records (particularly palace account books) documents patronage, commissions, pricing, and designer-craftsman relationships. Comparative research situates Iznik within broader Islamic ceramic traditions (Timurid, Safavid Persian) while identifying distinctively Ottoman innovations. The Chinese influence debate continues: recent research proposes Ottoman ceramic development as creative adaptation rather than direct imitation, selectively adopting certain Chinese motifs while developing independent iconographic vocabulary. Research on imperial design office (nakkaşhane) organization reveals court painters provided designs for multiple media (manuscripts, textiles, ceramics), but the translation from paper to ceramic required specialist knowledge. The question of whether Iznik workshops possessed creative autonomy or strictly executed court designs remains debated. Signed tiles suggest individual masters had recognized status, but most tiles are anonymous. Conservation science investigates deterioration mechanisms specific to architectural applications: tile-substrate adhesive failure, differential thermal expansion, moisture damage, atmospheric pollution. Ethics of restoration remain contested: replacement of missing/damaged tiles with modern reproductions, visibility of interventions, and documentation standards. The modern Iznik revival (beginning 1960s) raises heritage questions: Turkish government efforts to reconstruct historical techniques involved experimental archaeology, chemical analysis of historical tiles, and training programs. Research examines whether contemporary production constitutes cultural continuity, revival, or reproduction. Digital humanities methodologies enable large-scale pattern analysis across thousands of tiles, revealing design evolution, workshop attribution possibilities, and distribution patterns across Ottoman territories.',
  },

  characteristics: [
    'Brilliant cobalt blue on white ground',
    'Raised red (Armenian bole) relief',
    'Yellow-green and turquoise accents',
    'Hard, transparent colorless glaze',
    'Floral motifs: tulips, carnations, roses, hyacinths',
    'Geometric and "saz" style patterns',
    'Underglaze painting technique',
    'Square or rectangular tile formats',
  ],

  famousExamples: [
    { name: 'Baghdad Pavilion, Topkapi Palace', location: 'Istanbul, Turkey', year: '1638-1639', description: 'Blue-and-white Iznik tile facade on octagonal pavilion, masterpiece of classical Ottoman architecture' },
    { name: 'Rüstem Pasha Mosque', location: 'Istanbul, Turkey', year: '1560s', description: 'Interior completely covered with Iznik tiles in classic polychrome palette' },
    { name: 'Süleymaniye Mosque', location: 'Istanbul, Turkey', year: '1550-1557', description: 'Imperial mosque with extensive Iznik tile panels' },
    { name: 'Yerevan Pavilion, Topkapi Palace', location: 'Istanbul, Turkey', year: '1635-1636', description: 'Intricate Iznik tile panels in domed hall' },
    { name: 'Topkapi Palace Wall Panels', location: 'Istanbul, Turkey', year: '16th-17th century', description: 'Wall decorations above windows, including signed works by Osman İznikli Mehmetoğlu' },
  ],

  confusionPairs: [
    {
      elementId: 'kütahya-tiles',
      reason: 'Both are Ottoman ceramic tiles',
      distinction: 'Iznik tiles have distinctive raised red, brilliant blue, and superior glaze quality; Kütahya tiles are later production with different palette',
    },
    {
      elementId: 'persian-tiles',
      reason: 'Both are Islamic ceramic traditions with floral motifs',
      distinction: 'Iznik uses underglaze technique with transparent glaze; Persian tiles often use cuerda seca or mosaic techniques with different color palette',
    },
  ],

  searchTags: [
    'ottoman',
    'tiles',
    'ceramic',
    'iznik',
    'turkish',
    'topkapi',
    'blue-and-white',
    'floral',
    'decorative',
    'palace',
    'mosque',
    'armenian bole',
    'tulips',
  ],

  arMetadata: {
    modelPath: '/models/architecture/iznik-tiles.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Cobalt Blue Floral Motif', position: { x: 0, y: 0.3, z: 0.1 } },
      { label: 'Raised Red Relief', position: { x: 0.2, y: 0.5, z: 0.1 } },
      { label: 'Transparent Glaze Surface', position: { x: -0.2, y: 0.4, z: 0.1 } },
      { label: 'White Ground', position: { x: 0, y: 0.6, z: 0.1 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2026-01-29'),
  lastUpdated: new Date('2026-01-29'),
};
