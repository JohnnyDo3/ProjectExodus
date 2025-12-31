import type { ArchitecturalElement } from '../../types';

export const CEILING_ROSE: ArchitecturalElement = {
  id: 'ceiling-rose',
  slug: 'ceiling-rose',
  name: 'Ceiling Rose',
  alternativeNames: ['Ceiling Medallion', 'Rosette', 'Ceiling Centerpiece', 'Plaster Rose'],
  pronunciation: {
    phonetic: 'SEE-ling ROHZ',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Rose-shaped ornament (from decorative flower patterns)',
    rootWord: 'Latin "rosa" (rose) via Old French',
  },
  category: 'CEILING',
  subcategory: 'ceiling_ornament',
  periods: ['BAROQUE', 'ROCOCO', 'NEOCLASSICAL', 'VICTORIAN', 'EDWARDIAN', 'ART_NOUVEAU', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'AUSTRALIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/ceiling-rose-primary.jpg',
    gallery: [
      '/images/architecture/elements/ceiling-rose-victorian.jpg',
      '/images/architecture/elements/ceiling-rose-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/ceiling-rose-styles.svg',
  },

  description: {
    ELEMENTARY: 'A ceiling rose is a fancy decorative circle on the ceiling, usually right in the middle of a room where a chandelier hangs. It looks like a flower with petals and leaves carved or molded into it. Ceiling roses can be simple or super detailed with swirls, flowers, and other pretty patterns. They make plain ceilings look much fancier! Most are white, but some are painted or have gold on them.',
    MIDDLE_SCHOOL: 'A ceiling rose (or ceiling medallion) is an ornamental plaster or composition element mounted on the ceiling, typically at the center of a room where a chandelier or light fixture attaches. Designs range from simple circular rings to elaborate compositions featuring foliage, flowers, geometric patterns, or classical motifs. Traditional ceiling roses were hand-crafted plaster, while modern versions may be lightweight polyurethane or resin. They serve both decorative and practical purposes-enhancing room elegance and concealing the ceiling penetration for electrical fixtures. Sizes range from small (12 inches) to very large (36+ inches) depending on room scale.',
    HIGH_SCHOOL: 'Ceiling roses are ornamental medallions positioned at ceiling centers, historically serving both aesthetic and practical functions. Aesthetically, they provide focal points drawing the eye upward and establishing room hierarchy. Practically, they frame and emphasize chandeliers while concealing ceiling electrical penetrations. Traditional roses featured molded plaster ornamentation-classical patterns (acanthus leaves, egg-and-dart), naturalistic motifs (flowers, vines), or geometric designs. Installation involved adhesive bonding to ceiling surfaces, sometimes with mechanical fastening for large examples. Period styles are distinctive: Neoclassical roses emphasized symmetrical classical ornament; Victorian roses featured elaborate high-relief decoration; Art Nouveau roses incorporated flowing organic forms. Modern production methods include casting in lightweight polymers, though traditional fibrous plaster techniques persist in restoration and high-end work.',
    UNDERGRADUATE: 'Ceiling rose design reflects period aesthetic values while addressing functional requirements. Classical theory established principles for ceiling decoration, with roses functioning as architectural "jewelry" marking significant points. Scale relationships to room dimensions followed proportional conventions. Ornamental programs drew from established vocabularies-classical (anthemion, palmette, rosette), naturalistic (botanical studies), or geometric. Material technology influenced design possibilities-fibrous plaster enabled large-scale, high-relief compositions; composition (compressed pulp) allowed mass production of affordable ornament; modern polymers permit complex undercut details. Installation considerations include structural attachment methods, electrical integration, and painted finish. Conservation challenges involve addressing deterioration (water damage, settlement cracks, surface soiling) and inappropriate modifications (over-painting, amateur repairs).',
    GRADUATE: 'Analysis of ceiling roses integrates art historical research, material science, and conservation methodology. Scholarly investigation examines the evolution of ceiling ornament from Baroque and Rococo precedents through mass-production industrialization. Pattern books and trade catalogs document available designs and reveal distribution networks. Regional variations reflect local workshop traditions and material availability. Technical research addresses traditional making methods-running plaster moldings, enriching with modeled details, casting in piece molds. Material analysis distinguishes traditional lime plaster from later gypsum compositions and modern synthetic materials. Conservation research develops methodology for condition assessment, cleaning protocols, and repair techniques. Contemporary practice includes documentation through photogrammetry and 3D scanning, enabling reproduction and archival preservation.',
    PHD: 'Ceiling rose research encompasses multiple scholarly dimensions. Art historical investigation situates roses within broader decorative programs and examines pattern evolution and transmission. Analysis of trade catalogs and manufacturer records reveals production methods, marketing strategies, and consumption patterns. Material science research characterizes traditional and modern materials, addressing deterioration mechanisms and conservation requirements. Technical art history investigates workshop practices-molding techniques, casting methods, installation procedures. Conservation science develops evidence-based intervention protocols and addresses ethical questions in restoration-reproduction versus preservation, material substitution criteria. Digital humanities approaches enable morphological analysis of large rose populations, revealing chronological and regional patterns. Contemporary research also examines ceiling roses in modern design-historical reference, ironic pastiche, or sincere ornamental tradition.',
  },

  history: {
    ELEMENTARY: 'Ceiling roses became popular in grand European homes about 300 years ago when people loved fancy decorations everywhere! They became even more common in the 1800s (Victorian times) when factories could make them cheaply, so even regular homes could have them. Almost every nice house built between 1850 and 1920 had ceiling roses. Many old ceiling roses still exist in historic houses today. Modern homes sometimes add ceiling roses to make rooms look more elegant and traditional.',
    MIDDLE_SCHOOL: 'Ceiling roses evolved from earlier ceiling decoration traditions in Baroque and Rococo architecture. They became widely popular in Neoclassical and Georgian interiors (late 18th-early 19th centuries) featuring classical ornamental motifs. The Victorian era saw explosion in ceiling rose use as industrial production methods made ornamental plasterwork affordable for middle-class homes. Manufacturers offered catalogs with hundreds of designs. Edwardian and Art Nouveau periods developed distinctive styles. The Modern Movement largely rejected such ornament, causing decline in new installation. Late 20th-century historical revival renewed interest, and ceiling roses remain popular in traditional and transitional interior design.',
    HIGH_SCHOOL: 'The ceiling rose tradition emerged from Renaissance and Baroque ceiling decoration, where elaborately painted and sculptural ceilings marked significant spaces. Neoclassical architecture (late 18th century) developed the ceiling rose as a discrete ornamental element, often featuring classical motifs like acanthus, anthemion, and guilloche patterns. The Industrial Revolution transformed ceiling rose production-fibrous plaster techniques and composition molding enabled mass production. Victorian-era catalogs offered vast selections, democratizing architectural ornament. Arts and Crafts and Art Nouveau movements created distinctive organic designs. Modernist rejection of applied ornament caused mid-20th century decline. Postmodern historicism and continued traditional design preferences maintain ceiling rose production and installation.',
    UNDERGRADUATE: 'Ceiling rose history reflects broader trajectories in architectural ornament, craft industrialization, and aesthetic theory. Eighteenth-century pattern books (e.g., Chippendale, Adam) established design vocabularies. Neoclassical practice emphasized archaeological correctness in ornamental forms. Industrial-era production separated design from execution-manufacturers designed patterns, craftsmen produced molds, workers cast and installed roses. This democratization of ornament raised aesthetic debates about authenticity and taste. Victorian eclecticism produced vast stylistic variety. Arts and Crafts ideology criticized mass production while ironically using similar methods. Modernist theory condemned applied ornament as dishonest, relegating ceiling roses to historical contexts. Preservation movements documented and conserved historic roses, while market demand maintained craft traditions.',
    GRADUATE: 'Scholarly analysis of ceiling roses addresses social, economic, and aesthetic dimensions. Research examines the relationship between pattern book publication and ornamental dissemination. Economic history investigates the plaster industry-production organization, labor relations, marketing strategies. Trade catalogs reveal consumer choice and taste formation. Architectural history situates roses within period design theory and room hierarchy systems. Conservation research addresses documentation methods, condition assessment protocols, and intervention strategies. Material science examines composition evolution and deterioration mechanisms. Cultural studies approaches analyze ceiling roses as markers of social aspiration and class identity. Regional studies document local traditions and workshop practices. The persistence of ceiling roses despite modernist critique raises questions about ornamental desire and traditional aesthetics.',
    PHD: 'Ceiling rose research offers interdisciplinary opportunities spanning art history, material culture studies, and conservation science. Documentary research analyzes pattern books, trade catalogs, and manufacturers\' archives to understand design evolution, production methods, and distribution networks. Technical art history reconstructs making processes through analysis of historical examples-mold techniques, casting methods, material formulations. Material science characterizes traditional and modern compositions, investigating deterioration patterns and conservation requirements. Social history examines ceiling roses as material culture markers indicating class, taste, and cultural identity. Preservation studies develop methodology for documentation (photogrammetry, 3D scanning), assessment, and intervention. Contemporary research addresses the continuing production and installation of ceiling roses in traditional design contexts, examining relationships between historical reference and modern practice.',
  },

  characteristics: [
    'Circular or radial ornamental design',
    'Positioned at ceiling center',
    'Frames chandeliers or light fixtures',
    'Features relief decoration (flowers, leaves, classical motifs)',
    'Typically plaster, polyurethane, or resin',
    'Size proportional to room dimensions',
    'May be painted or gilded',
  ],

  famousExamples: [
    { name: 'Palace of Versailles Salons', location: 'Versailles, France', year: '17th-18th century', description: 'Elaborate gilded ceiling roses in state rooms' },
    { name: 'Brighton Pavilion', location: 'Brighton, England', year: '1815-1823', description: 'Exotic Indo-Islamic inspired ceiling roses' },
    { name: 'Victorian Townhouses', location: 'London, England', year: '1850-1900', description: 'Mass-produced ornamental plaster roses' },
    { name: 'Biltmore Estate', location: 'Asheville, USA', year: '1895', description: 'Elaborate ceiling medallions in Gilded Age mansion' },
    { name: 'Art Nouveau Buildings', location: 'Brussels, Belgium', year: '1890-1910', description: 'Organic flowing ceiling rose designs' },
  ],

  confusionPairs: [
    {
      elementId: 'rosette',
      reason: 'Both are circular decorative ornaments',
      distinction: 'Ceiling roses are large ceiling centerpieces; rosettes are smaller decorative elements used in various locations',
    },
    {
      elementId: 'corbel',
      reason: 'Both are ceiling/wall ornaments',
      distinction: 'Ceiling roses are flat decorative medallions; corbels are projecting structural/decorative brackets',
    },
  ],

  searchTags: ['ceiling', 'medallion', 'rose', 'ornament', 'plaster', 'chandelier', 'victorian', 'neoclassical', 'decoration'],

  arMetadata: {
    modelPath: '/models/architecture/ceiling-rose.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Central Rosette', position: { x: 0, y: 0, z: 0 } },
      { label: 'Acanthus Leaf', position: { x: 0.08, y: 0.08, z: 0.01 } },
      { label: 'Outer Ring', position: { x: 0.12, y: 0, z: 0.01 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
