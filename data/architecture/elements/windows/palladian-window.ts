import type { ArchitecturalElement } from '../../types';

export const PALLADIAN_WINDOW: ArchitecturalElement = {
  id: 'palladian-window',
  slug: 'palladian-window',
  name: 'Palladian Window',
  alternativeNames: ['Serlian Window', 'Venetian Window', 'Thermal Window'],
  pronunciation: {
    phonetic: 'puh-LAY-dee-an WIN-doh',
    language: 'English',
  },
  etymology: {
    origin: 'Named after Andrea Palladio',
    meaning: 'Window design popularized by the Renaissance architect Andrea Palladio',
    rootWord: 'Palladio (architect\'s name)',
  },
  category: 'WINDOW',
  subcategory: 'classical_windows',
  periods: ['RENAISSANCE', 'MANNERISM', 'BAROQUE', 'NEOCLASSICAL', 'GEORGIAN', 'FEDERAL', 'COLONIAL_AMERICAN'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/palladian-window-primary.jpg',
    gallery: [
      '/images/architecture/elements/palladian-window-villa.jpg',
      '/images/architecture/elements/palladian-window-monticello.jpg',
      '/images/architecture/elements/palladian-window-facade.jpg',
    ],
    diagram: '/images/architecture/diagrams/palladian-window.svg',
  },

  description: {
    ELEMENTARY: 'A Palladian window is a fancy three-part window where the middle section is taller and has a curved arch on top, while the two side windows are shorter with flat tops. It looks like a big window in the center with two smaller windows standing guard on either side! You\'ll see these elegant windows on important buildings and fancy old houses, especially over doorways or in the center of a building.',
    MIDDLE_SCHOOL: 'The Palladian window (also called a Serlian or Venetian window) consists of three vertical sections: a wide central arch-topped opening flanked by two narrower rectangular side lights. Small columns or pilasters separate the three sections. This window type became a signature element of Classical and Neoclassical architecture, providing both visual grandeur and abundant light. The design combines round and rectangular forms, creating elegant proportional relationships. Palladian windows typically mark important locations on facades-centered over main entrances or highlighting principal rooms.',
    HIGH_SCHOOL: 'The Palladian window features a tripartite composition: a central arched opening (typically semicircular) flanked by two narrower trabeated (flat-topped) openings, with the divisions marked by columns, pilasters, or piers supporting an entablature. While often called a Palladian window after Andrea Palladio who popularized the form, it was actually first illustrated by Sebastiano Serlio in his treatise (1537), leading to the alternative name "Serliana." The form derives from Roman precedents, particularly the openings in ancient bath (thermae) buildings. Palladio employed this window type extensively in his villa designs, establishing it as a hallmark of Classical architecture. British Palladianism in the 18th century widely adopted the motif, which then spread to colonial America and became a standard feature in Georgian, Federal, and Neoclassical architecture.',
    UNDERGRADUATE: 'The Palladian window represents the Renaissance reinterpretation of ancient Roman precedents through Classical architectural theory. Structurally, the composition combines two distinct lintel systems-the central arch spring from impost blocks atop the flanking columns, while the side openings employ simple post-and-lintel construction. This creates a sophisticated interplay of structural and geometric forms. Serlio\'s illustration (Libro Quarto, 1537) showed the motif as applicable to various scales from small windows to monumental archways. Palladio\'s systematic application in villa designs (Villa Godi, Villa Barbaro, Palazzo Chiericati) established canonical proportions-the central opening typically twice the width of side lights, with the arch radius equal to central opening width. The window serves multiple functions: providing abundant light, creating vertical emphasis on facades, marking hierarchical importance (principal rooms, ceremonial spaces), and demonstrating Classical knowledge. British Palladianism (Burlington, Campbell, Kent) made Palladian windows essential elements of country house design. American adoption ranged from Jefferson\'s sophisticated applications to vernacular simplifications in Federal-era houses.',
    GRADUATE: 'Critical analysis of the Palladian window addresses its classical origins, theoretical codification, and semantic evolution. Roman precedents include bath building windows (Baths of Diocletian) and triumphal arch compositions. Renaissance reception began with Serlio\'s illustration presenting the motif as a Roman architectural element applicable to various contexts. Palladio\'s systematic deployment established proportional relationships and appropriate applications-villas (marking principal salons), palazzi (creating facade rhythm), and bridges (Ponte Vecchio). Theoretical discourse established the window\'s associations with antiquity, Classical learning, and architectural sophistication. British Palladian revival (early 18th century) elevated the motif to canonical status, codified in pattern books and architects\' portfolios. Analysis must address the window\'s multiple functions: practical (light admission, ventilation), compositional (vertical emphasis, symmetrical organization), and symbolic (Classical reference, cultural authority). Regional variations developed-Italian applications within comprehensive Palladian systems, British emphasis on the window as focal element, American adaptations ranging from accurate Neoclassical reproductions to vernacular interpretations. The window\'s persistence in revivalist architecture demonstrates its status as essential Classical signifier.',
    PHD: 'Advanced Palladian window scholarship engages questions of classical precedent, architectural theory, and cultural transmission. Research methodologies include: archaeological investigation of Roman prototypes; analysis of Renaissance theoretical texts; examination of built examples across periods and regions; pattern book studies tracking design dissemination; and cultural interpretation of the window\'s symbolic meanings. Key questions include: How did Renaissance architects reconstruct Roman window types from fragmentary evidence? What role did theoretical treatises play in codifying the motif? How did the window\'s meanings transform across different cultural contexts? What relationships existed between high-style and vernacular applications? Primary sources include Serlio\'s treatise, Palladio\'s Quattro Libri, British Palladian publications (Campbell\'s Vitruvius Britannicus, Burlington\'s works), American pattern books (Benjamin, Lafever), and building archaeology. Theoretical frameworks encompass design history (motif evolution and transmission), semiotics (the window as architectural sign), reception theory (reinterpretation across periods), and social history (the window as marker of taste and status). Critical approaches examine the gap between theoretical ideals and built realities, mechanisms of design transmission (treatises, pattern books, builder practices), and the window\'s role in constructing cultural authority through Classical reference. Contemporary analysis addresses the window in postmodern appropriation and continuing Classical traditions.',
  },

  history: {
    ELEMENTARY: 'The Palladian window is named after Andrea Palladio, a famous Italian architect who lived about 450 years ago. He didn\'t invent this window style-the ancient Romans used something similar-but Palladio loved it so much that he used it in many beautiful buildings! When people saw his elegant designs, they wanted to copy them. The window design spread to England, then to America, where founding father Thomas Jefferson used Palladian windows on his home, Monticello. Today, you can still see this classic window on government buildings, universities, and fancy houses!',
    MIDDLE_SCHOOL: 'The window type originated in ancient Roman architecture, particularly in bath buildings (thermae). Renaissance architect Sebastiano Serlio first illustrated the motif in his treatise (1537), leading to the alternative name "Serliana." Andrea Palladio (1508-1580) extensively employed the design in his villas and palazzi, popularizing it to the degree that it became known as the "Palladian window." British architects in the early 18th century revived Palladian\'s designs (Burlington, Campbell, Kent), making this window a hallmark of Georgian architecture. The design spread to colonial America, appearing in buildings by Thomas Jefferson (Monticello) and many Federal-era houses. Neoclassical and Greek Revival architects continued using Palladian windows through the 19th century.',
    HIGH_SCHOOL: 'The Palladian window\'s development traces from Roman precedent through Renaissance codification to widespread Neoclassical adoption. Roman bath buildings (Baths of Caracalla, Baths of Diocletian, early 3rd century CE) featured large arched openings flanked by smaller trabeated openings-the likely inspiration for the Renaissance motif. Sebastiano Serlio\'s Libro Quarto (1537) first illustrated the "Serliana" as a Roman architectural element. Andrea Palladio\'s systematic application in his villas (Villa Godi 1537-1542, Villa Barbaro 1554-1560) and urban buildings (Palazzo Chiericati 1550-1580, Basilica Palladiana 1549-1614) established canonical proportions and appropriate uses. Palladio\'s Quattro Libri (1570) disseminated the designs widely. After relative disuse during the Baroque period, British architects revived Palladio\'s works in the early 18th century. Lord Burlington, Colen Campbell, and William Kent made Palladian windows essential elements of Palladian country houses. American architecture adopted the motif through British pattern books and Jefferson\'s direct study of Palladio, appearing in countless Federal and Greek Revival buildings.',
    UNDERGRADUATE: 'Palladian window evolution demonstrates the complex relationship between ancient precedent, Renaissance interpretation, and later revival. Roman prototypes in bath architecture provided visual precedent but lacked theoretical documentation. Serlio\'s 1537 illustration presented the motif as applicable to various scales and contexts, though without prescriptive proportions. Palladio\'s systematic deployment established design principles: proportional relationships between central and side openings, appropriate column orders (typically Ionic or Composite), integration with facade compositions. Specific applications varied-Villa Barbaro uses the window to mark the central salon, Palazzo Chiericati employs multiple Palladian openings in the loggia. Palladio\'s Quattro Libri provided measured drawings enabling precise reproduction. Post-Palladian development included Baroque variations (curved rather than semicircular arches) and Neoclassical returns to Palladian models. British Palladian revival involved archaeological approach to Palladio\'s works-Burlington\'s Chiswick House closely follows Palladian precedents. Pattern books (Campbell, Ware, Gibbs) codified the window for wider dissemination. American adoption ranged from sophisticated Neoclassical applications (Jefferson) to vernacular builder interpretations. Regional variations emerged in proportion, detail, and material-stone in formal examples, wood in vernacular applications.',
    GRADUATE: 'Critical Palladian window scholarship addresses classical precedent reconstruction, theoretical codification, and cultural dissemination across architectural traditions. Archaeological evidence for Roman prototypes includes bath building fenestration and triumphal arch compositions, though direct connections to Renaissance applications remain interpretive. Serlio\'s presentation of the Serliana involved both archaeological study and design innovation, creating a motif that became canonical despite limited ancient documentation. Palladio\'s systematic application demonstrates the window\'s compositional versatility-marking piano nobile principal rooms, creating facade rhythm, emphasizing symmetry. Theoretical analysis of Palladio\'s proportional systems reveals sophisticated geometric relationships. British Palladian revival involved selective reading of Palladio\'s works, emphasizing specific elements (including the window) while departing from others. Pattern book transmission enabled wide dissemination divorced from theoretical understanding. American adoption shows complex transmission mechanisms-Jefferson\'s direct Palladio study contrasts with builders\' pattern book dependence. Analysis must examine the window\'s multiple significations: practical light provision, compositional device, reference to antiquity, demonstration of Classical knowledge. Regional studies reveal distinctive traditions-Veneto Palladian applications, British Palladian country house usage, American Federal-era adaptations. Revival movements maintained the window as essential Classical element, demonstrating its status as recognized architectural signifier.',
    PHD: 'Advanced Palladian window scholarship employs multiple methodological approaches: archaeological investigation of Roman precedents and Renaissance interpretations; textual analysis of architectural treatises and pattern books; examination of built examples across periods and regions; digital reconstruction of proportional systems; and cultural history investigating the window\'s symbolic meanings and social functions. Research questions include: How did Renaissance architects construct the motif from limited Roman evidence? What roles did Serlio and Palladio play in establishing the window\'s canonical form? How did theoretical prescriptions relate to built examples? What mechanisms transmitted the design across cultures and periods? What meanings did the window carry in different contexts? Primary sources include Renaissance treatises (Serlio, Palladio, Scamozzi), British Palladian publications (Campbell, Burlington, Ware), American pattern books (Asher Benjamin, Minard Lafever), and building archaeology. Theoretical frameworks encompass design history (motif evolution), classical reception (Renaissance and Neoclassical reinterpretation of antiquity), semiotics (the window as sign of Classical culture), book history (pattern book transmission), and social history (the window marking taste, education, and status). Contemporary approaches examine digital reconstruction of proportional systems, network analysis of design transmission, and critical interpretation of Classical quotation in various cultural and political contexts.',
  },

  characteristics: [
    'Three-part composition',
    'Central arched opening (typically semicircular)',
    'Two narrower flat-topped side openings',
    'Columns or pilasters dividing the sections',
    'Entablature over side sections supporting arch',
    'Central opening typically twice width of side lights',
    'Often marks important facade locations',
    'Associated with Classical and Neoclassical architecture',
  ],

  famousExamples: [
    { name: 'Villa Barbaro', location: 'Maser, Italy', year: '1554-1560', description: 'Palladio\'s villa featuring signature Palladian windows' },
    { name: 'Palazzo Chiericati', location: 'Vicenza, Italy', year: '1550-1580', description: 'Palladio\'s palazzo with multiple Palladian openings' },
    { name: 'Chiswick House', location: 'London, England', year: '1726-1729', description: 'Lord Burlington\'s Palladian villa revival' },
    { name: 'Monticello', location: 'Charlottesville, Virginia, USA', year: '1768-1809', description: 'Jefferson\'s Palladian windows on iconic American house' },
    { name: 'University of Virginia Rotunda', location: 'Charlottesville, Virginia, USA', year: '1822-1826', description: 'Jefferson\'s academic building with Palladian windows' },
  ],

  confusionPairs: [
    {
      elementId: 'triple-window',
      reason: 'Both have three window sections',
      distinction: 'Palladian window has central arch and specific proportions; triple window has three similar openings',
    },
    {
      elementId: 'tripartite-window',
      reason: 'Both divide window into three parts',
      distinction: 'Palladian window specifically combines arch and flat-topped openings with columns; tripartite is more general',
    },
  ],

  searchTags: ['palladian window', 'serliana', 'venetian window', 'thermal window', 'arch', 'three-part', 'classical', 'renaissance', 'palladio', 'neoclassical', 'jefferson'],

  arMetadata: {
    modelPath: '/models/architecture/palladian-window.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Central Arch', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Side Light', position: { x: -0.4, y: 0.5, z: 0 } },
      { label: 'Column', position: { x: -0.25, y: 0.3, z: 0 } },
      { label: 'Entablature', position: { x: -0.4, y: 0.65, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
