/**
 * Architectural Element Categories for Architecture Learning Platform
 * Comprehensive categorization of architectural elements
 */

import { ElementCategory, LearningLevel } from './types';

export interface SubcategoryDefinition {
  id: string;
  name: string;
  description: string;
  exampleElements: string[];
}

export interface CategoryDefinition {
  id: ElementCategory;
  name: string;
  shortName: string;
  description: Record<LearningLevel, string>;
  icon: string;
  color: string;
  subcategories: SubcategoryDefinition[];
  commonlyConfusedWith: ElementCategory[];
  studyTips: string[];
}

export const CATEGORY_DEFINITIONS: Record<ElementCategory, CategoryDefinition> = {
  STRUCTURAL: {
    id: 'STRUCTURAL',
    name: 'Structural Elements',
    shortName: 'Structural',
    description: {
      ELEMENTARY: 'These are the parts of a building that hold it up, like the bones in your body! Columns, beams, and arches all work together to keep buildings standing.',
      MIDDLE_SCHOOL: 'Structural elements are the load-bearing components that support a building\'s weight and transfer forces to the ground. They include columns, beams, arches, and foundations.',
      HIGH_SCHOOL: 'Structural elements form the skeletal framework of buildings, managing gravitational loads, lateral forces, and other stresses. Key elements include columns (compression), beams (bending), arches (curved compression), and various truss configurations.',
      UNDERGRADUATE: 'Structural systems represent the primary means by which buildings resist gravitational and lateral loads. Historical development ranges from post-and-lintel systems through arch and vault construction to modern frame structures, each embodying specific structural logics.',
      GRADUATE: 'Structural elements embody fundamental principles of statics and material behavior, with historical evolution reflecting both technological innovation and aesthetic ambitions. Analysis requires understanding of load paths, moment distribution, and the interplay of compression and tension.',
      PHD: 'The study of structural elements encompasses historical analysis of building technology, theoretical understanding of structural mechanics, and contemporary investigation of novel materials and computational design methods that expand the possibilities of structural expression.',
    },
    icon: '🏗️',
    color: '#3498db',
    subcategories: [
      {
        id: 'columns',
        name: 'Columns & Pillars',
        description: 'Vertical structural members that transfer loads through compression',
        exampleElements: ['Doric column', 'Ionic column', 'Corinthian column', 'Pier', 'Pilaster', 'Caryatid'],
      },
      {
        id: 'beams',
        name: 'Beams & Lintels',
        description: 'Horizontal structural members that span openings and support loads',
        exampleElements: ['Architrave', 'Lintel', 'Girder', 'Tie beam', 'Collar beam'],
      },
      {
        id: 'arches',
        name: 'Arches',
        description: 'Curved structural elements that span openings using compression',
        exampleElements: ['Round arch', 'Pointed arch', 'Horseshoe arch', 'Ogee arch', 'Trefoil arch', 'Tudor arch'],
      },
      {
        id: 'vaults',
        name: 'Vaults',
        description: 'Arched ceilings or roofs, extensions of arch principles',
        exampleElements: ['Barrel vault', 'Groin vault', 'Rib vault', 'Fan vault', 'Domical vault'],
      },
      {
        id: 'domes',
        name: 'Domes',
        description: 'Hemispherical roof structures rotating an arch around its axis',
        exampleElements: ['Pendentive dome', 'Onion dome', 'Saucer dome', 'Geodesic dome', 'Double dome'],
      },
      {
        id: 'trusses',
        name: 'Trusses & Frames',
        description: 'Triangulated structural systems for spanning and load distribution',
        exampleElements: ['King post truss', 'Queen post truss', 'Hammer beam', 'Warren truss', 'Space frame'],
      },
      {
        id: 'foundations',
        name: 'Foundations',
        description: 'Elements that transfer building loads to the ground',
        exampleElements: ['Spread footing', 'Pile foundation', 'Raft foundation', 'Stylobate', 'Stereobate'],
      },
    ],
    commonlyConfusedWith: ['DECORATIVE'],
    studyTips: [
      'Remember: structural elements WORK to hold things up',
      'Look for load paths—how does weight travel to the ground?',
      'Columns push down (compression), beams bend, arches curve',
      'If you remove it and the building falls, it\'s structural!',
    ],
  },

  DECORATIVE: {
    id: 'DECORATIVE',
    name: 'Decorative Elements',
    shortName: 'Decorative',
    description: {
      ELEMENTARY: 'These are the pretty parts that make buildings beautiful! Like jewelry on a building, they add patterns, shapes, and fancy details.',
      MIDDLE_SCHOOL: 'Decorative elements add beauty and visual interest to buildings. They include moldings, carvings, ornamental patterns, and artistic details that aren\'t necessary for structure but make buildings special.',
      HIGH_SCHOOL: 'Decorative or ornamental elements serve aesthetic rather than structural purposes, though they often articulate structural relationships. They range from classical moldings and sculptural programs to abstract patterns and material textures.',
      UNDERGRADUATE: 'Ornamental elements occupy contested theoretical territory—from Sullivan\'s organic ornament through Loos\'s critique to postmodern reappropriation. Historically, decoration communicated meaning, status, and cultural identity while articulating tectonic expression.',
      GRADUATE: 'Architectural ornament engages fundamental questions of meaning, craft, and the relationship between structure and surface. Critical analysis examines historical programs of decoration, modernist rejection, and contemporary reconsiderations through digital fabrication.',
      PHD: 'The discourse on architectural ornament encompasses semiotics of building, theories of tectonic expression, socioeconomic analyses of craft production, and contemporary investigations of ornament\'s potential through computational design and advanced manufacturing.',
    },
    icon: '🎨',
    color: '#9b59b6',
    subcategories: [
      {
        id: 'moldings',
        name: 'Moldings & Profiles',
        description: 'Linear decorative elements with shaped profiles',
        exampleElements: ['Cornice', 'Dentil', 'Egg and dart', 'Bead and reel', 'Cavetto', 'Cyma recta', 'Astragal'],
      },
      {
        id: 'carvings',
        name: 'Sculptural Elements',
        description: 'Three-dimensional carved or cast decorations',
        exampleElements: ['Gargoyle', 'Grotesque', 'Finial', 'Acroterion', 'Antefix', 'Boss'],
      },
      {
        id: 'patterns',
        name: 'Surface Patterns',
        description: 'Repeating decorative motifs on surfaces',
        exampleElements: ['Fretwork', 'Arabesque', 'Guilloche', 'Lattice', 'Diaper pattern', 'Chevron'],
      },
      {
        id: 'medallions',
        name: 'Medallions & Roundels',
        description: 'Circular or oval decorative elements',
        exampleElements: ['Medallion', 'Roundel', 'Patera', 'Rosette', 'Ceiling rose'],
      },
      {
        id: 'inlay',
        name: 'Inlay & Mosaic',
        description: 'Decorative elements created by inserting materials',
        exampleElements: ['Pietra dura', 'Cosmati work', 'Opus sectile', 'Marquetry', 'Intarsia'],
      },
      {
        id: 'metalwork',
        name: 'Decorative Metalwork',
        description: 'Ornamental metal elements and fixtures',
        exampleElements: ['Wrought iron scrollwork', 'Bronze doors', 'Gilded details', 'Finials', 'Grilles'],
      },
    ],
    commonlyConfusedWith: ['STRUCTURAL', 'FACADE'],
    studyTips: [
      'Decorative elements could be removed without the building falling',
      'Look for repetition and pattern—decoration often repeats',
      'Many decorative elements have symbolic meanings',
      'Classical decoration often imitates natural forms',
    ],
  },

  FACADE: {
    id: 'FACADE',
    name: 'Façade Elements',
    shortName: 'Façade',
    description: {
      ELEMENTARY: 'The façade is the "face" of the building—the front that everyone sees! It includes windows, doors, and all the features that make a building\'s face.',
      MIDDLE_SCHOOL: 'Façade elements make up the exterior face of a building, especially the main entrance side. This includes how windows and doors are arranged, the materials used, and special entrance features.',
      HIGH_SCHOOL: 'Façade elements compose the exterior enclosure and public presentation of buildings. Key components include fenestration (window arrangements), entrance compositions, and the articulation of wall surfaces through materials, textures, and applied orders.',
      UNDERGRADUATE: 'The façade mediates between interior and exterior, functioning as both environmental envelope and communicative surface. Historical analysis reveals evolving relationships between structure, enclosure, and representation from classical composition through modern curtain walls.',
      GRADUATE: 'Façade design engages questions of representation, environmental performance, and the relationship between surface and structure. Contemporary practice navigates tensions between expressive form, energy performance, and constructional logic.',
      PHD: 'Façade studies encompass historical evolution of enclosure systems, theoretical frameworks for understanding representational and performative roles, and contemporary research in advanced envelopes, responsive systems, and computational design of building skins.',
    },
    icon: '🏛️',
    color: '#e74c3c',
    subcategories: [
      {
        id: 'entrances',
        name: 'Entrances & Portals',
        description: 'Doorways and entrance compositions',
        exampleElements: ['Portal', 'Tympanum', 'Portico', 'Narthex', 'Propylaea', 'Porte cochère'],
      },
      {
        id: 'windows',
        name: 'Windows & Openings',
        description: 'Window types and configurations',
        exampleElements: ['Rose window', 'Palladian window', 'Oriel window', 'Clerestory', 'Dormer', 'Oculus'],
      },
      {
        id: 'projections',
        name: 'Wall Projections',
        description: 'Elements projecting from the wall plane',
        exampleElements: ['Bay window', 'Balcony', 'Loggia', 'Bow window', 'Juliet balcony', 'Cantilevered projection'],
      },
      {
        id: 'wall_treatments',
        name: 'Wall Treatments',
        description: 'Surface treatments and articulations',
        exampleElements: ['Rustication', 'Quoins', 'String course', 'Belt course', 'Banding', 'Vermiculation'],
      },
      {
        id: 'screening',
        name: 'Screening Elements',
        description: 'Elements that filter or screen',
        exampleElements: ['Jali', 'Mashrabiya', 'Brise-soleil', 'Louvers', 'Perforated screen'],
      },
      {
        id: 'signage',
        name: 'Signage & Graphics',
        description: 'Lettering and graphic elements integrated into façades',
        exampleElements: ['Cartouche', 'Date stone', 'Inscription tablet', 'Facade signage'],
      },
    ],
    commonlyConfusedWith: ['DECORATIVE', 'STRUCTURAL'],
    studyTips: [
      'The façade is always about how the building presents itself to the street',
      'Think of windows and doors as organized into a composition',
      'Façade elements often combine structural AND decorative functions',
      'Modern buildings often have "curtain walls"—facades that don\'t bear weight',
    ],
  },

  ROOF: {
    id: 'ROOF',
    name: 'Roof Elements',
    shortName: 'Roof',
    description: {
      ELEMENTARY: 'Roofs protect buildings from rain and snow! They come in many shapes—some are flat, some pointy, some curved like a hat on a building\'s head.',
      MIDDLE_SCHOOL: 'Roof elements cover and protect buildings from weather. Different cultures developed different roof shapes, from steep European roofs that shed snow to curved Asian roofs with decorative ridge tiles.',
      HIGH_SCHOOL: 'Roof systems combine structural spanning with weather protection. Typologies range from flat roofs through various pitched forms to curved shells, each with specific structural, drainage, and aesthetic characteristics.',
      UNDERGRADUATE: 'Roofing systems represent the intersection of structure, enclosure, and symbolic expression. Historical analysis reveals how roof forms respond to climate, materials, structural capacity, and cultural meaning from vernacular solutions through monumental compositions.',
      GRADUATE: 'Roof design engages complex negotiations between structural spanning, environmental performance, and architectural expression. Analysis encompasses historical typologies, contemporary membrane and shell structures, and emerging sustainable roofing technologies.',
      PHD: 'Roof studies address structural logic of spanning systems, environmental and thermal performance, acoustic considerations, and the cultural significance of roof forms across architectural traditions and periods.',
    },
    icon: '🏠',
    color: '#e67e22',
    subcategories: [
      {
        id: 'roof_forms',
        name: 'Roof Forms',
        description: 'Overall roof shapes and configurations',
        exampleElements: ['Gable roof', 'Hip roof', 'Mansard roof', 'Gambrel roof', 'Barrel roof', 'Butterfly roof'],
      },
      {
        id: 'roof_features',
        name: 'Roof Features',
        description: 'Elements that punctuate or articulate roofs',
        exampleElements: ['Dormer', 'Cupola', 'Lantern', 'Skylight', 'Chimney', 'Ridge vent'],
      },
      {
        id: 'eaves',
        name: 'Eaves & Edges',
        description: 'The edges and overhangs of roofs',
        exampleElements: ['Eaves', 'Soffit', 'Fascia', 'Bargeboard', 'Verge', 'Rafter tails'],
      },
      {
        id: 'roof_ornament',
        name: 'Roof Ornament',
        description: 'Decorative elements on roofs',
        exampleElements: ['Finial', 'Cresting', 'Ridge tile', 'Acroterion', 'Weathervane', 'Lightning rod'],
      },
      {
        id: 'drainage',
        name: 'Drainage Elements',
        description: 'Elements managing water runoff',
        exampleElements: ['Gutter', 'Downspout', 'Gargoyle', 'Scupper', 'Parapet gutter'],
      },
      {
        id: 'coverings',
        name: 'Roof Coverings',
        description: 'Materials and systems covering roofs',
        exampleElements: ['Slate', 'Tile', 'Thatch', 'Shingle', 'Standing seam', 'Green roof'],
      },
    ],
    commonlyConfusedWith: ['STRUCTURAL'],
    studyTips: [
      'Climate heavily influences roof shape—steep for snow, flat for hot dry areas',
      'The roof silhouette often defines a building\'s character',
      'Asian and Western roofs evolved very differently',
      'Modern architecture often makes a statement by hiding or flattening roofs',
    ],
  },

  FLOOR: {
    id: 'FLOOR',
    name: 'Floor & Stair Elements',
    shortName: 'Floor/Stair',
    description: {
      ELEMENTARY: 'Floors are what we walk on, and stairs help us go up and down! Some floors have beautiful patterns, and some stairs spiral like a seashell.',
      MIDDLE_SCHOOL: 'Floor and stair elements include the surfaces we walk on and the ways we move between levels. Historic buildings often have beautifully patterned floors and ornate staircases.',
      HIGH_SCHOOL: 'Floor and circulation elements organize horizontal movement and vertical connection within buildings. They range from structural floor systems to decorative pavements and from simple stairs to monumental ceremonial sequences.',
      UNDERGRADUATE: 'Floor and stair elements structure spatial experience through level changes, material transitions, and processional sequences. Historical analysis reveals how circulation strategies communicate hierarchy, guide movement, and create spatial drama.',
      GRADUATE: 'Vertical and horizontal circulation systems embody both functional requirements and experiential choreography. Analysis examines structural systems, accessibility, and the architectonic expression of movement through buildings.',
      PHD: 'Floor and circulation studies address structural floor systems, accessible design, and phenomenological analyses of movement through buildings, examining how circulation orchestrates spatial experience and social interaction.',
    },
    icon: '🪜',
    color: '#1abc9c',
    subcategories: [
      {
        id: 'paving',
        name: 'Paving & Flooring',
        description: 'Floor surfaces and patterns',
        exampleElements: ['Terrazzo', 'Parquet', 'Mosaic floor', 'Flagstone', 'Opus sectile', 'Tatami'],
      },
      {
        id: 'stairs',
        name: 'Stairs & Steps',
        description: 'Vertical circulation elements',
        exampleElements: ['Spiral stair', 'Grand staircase', 'Cantilevered stair', 'Perron', 'Escalier', 'Newel stair'],
      },
      {
        id: 'stair_parts',
        name: 'Stair Components',
        description: 'Parts that make up staircases',
        exampleElements: ['Baluster', 'Handrail', 'Newel post', 'Tread', 'Riser', 'Stringer', 'Landing'],
      },
      {
        id: 'floor_structure',
        name: 'Floor Structures',
        description: 'Structural systems supporting floors',
        exampleElements: ['Floor joists', 'Concrete slab', 'Rib slab', 'Coffered floor', 'Waffle slab'],
      },
      {
        id: 'ramps',
        name: 'Ramps & Inclines',
        description: 'Sloped circulation surfaces',
        exampleElements: ['Accessibility ramp', 'Ceremonial ramp', 'Promenade architecturale', 'Helical ramp'],
      },
    ],
    commonlyConfusedWith: ['STRUCTURAL'],
    studyTips: [
      'Stairs can be functional OR ceremonial (grand staircases!)',
      'Floor patterns often have symbolic meanings',
      'Le Corbusier\'s "promenade architecturale" made circulation an art form',
      'Accessibility has revolutionized how we think about vertical circulation',
    ],
  },

  WALL: {
    id: 'WALL',
    name: 'Wall Elements',
    shortName: 'Wall',
    description: {
      ELEMENTARY: 'Walls divide spaces and keep the inside separate from outside! Some walls are thick for protection, others are thin and let in light.',
      MIDDLE_SCHOOL: 'Wall elements include both exterior walls that protect buildings and interior walls that divide spaces. Walls can be structural (load-bearing) or just partitions.',
      HIGH_SCHOOL: 'Wall systems range from load-bearing masonry through frame-with-infill constructions to modern curtain walls. Wall elements include structural components, openings, and surface treatments.',
      UNDERGRADUATE: 'Wall systems mediate between structure, enclosure, and spatial division. Historical evolution traces from mass masonry through frame structures to the modern separation of structure and envelope, each embodying distinct spatial and constructional logics.',
      GRADUATE: 'Wall construction represents fundamental building technology, with historical development revealing evolving relationships between structural capacity, environmental performance, and spatial flexibility. Contemporary practice navigates complex performance requirements.',
      PHD: 'Wall studies encompass structural analysis of masonry and frame systems, building physics of thermal and moisture behavior, and historical research on construction practices and their evolution across cultures and periods.',
    },
    icon: '🧱',
    color: '#95a5a6',
    subcategories: [
      {
        id: 'wall_types',
        name: 'Wall Types',
        description: 'Overall wall systems and constructions',
        exampleElements: ['Curtain wall', 'Load-bearing wall', 'Cavity wall', 'Partition', 'Retaining wall', 'Shear wall'],
      },
      {
        id: 'wall_bases',
        name: 'Bases & Plinths',
        description: 'Bottom portions of walls',
        exampleElements: ['Plinth', 'Dado', 'Wainscot', 'Base molding', 'Water table'],
      },
      {
        id: 'wall_features',
        name: 'Wall Features',
        description: 'Elements within or on walls',
        exampleElements: ['Niche', 'Alcove', 'Recess', 'Built-in cupboard', 'Fireplace', 'Inglenook'],
      },
      {
        id: 'wall_openings',
        name: 'Wall Openings',
        description: 'Openings through walls',
        exampleElements: ['Door frame', 'Window frame', 'Arch opening', 'Reveal', 'Jamb', 'Sill'],
      },
      {
        id: 'wall_caps',
        name: 'Wall Caps & Coping',
        description: 'Top finishes of walls',
        exampleElements: ['Coping', 'Parapet', 'Battlement', 'Cornice', 'Cap molding'],
      },
    ],
    commonlyConfusedWith: ['STRUCTURAL', 'FACADE'],
    studyTips: [
      'Ask: does this wall carry load, or just divide space?',
      'The thickness of walls tells you a lot about construction method',
      'Modern buildings often separate structure from walls (curtain walls)',
      'Historic wall construction varies hugely by available materials',
    ],
  },

  DOOR: {
    id: 'DOOR',
    name: 'Door Elements',
    shortName: 'Door',
    description: {
      ELEMENTARY: 'Doors let us in and out of rooms and buildings! They can be huge like castle gates or small like a cupboard door. Some have beautiful carvings.',
      MIDDLE_SCHOOL: 'Door elements control entry and exit, provide security, and often serve as focal points of architectural design. Important doors can be highly decorated and symbolize transition between spaces.',
      HIGH_SCHOOL: 'Doors and their surrounds function as both practical thresholds and symbolic markers of transition. Door design encompasses structural frames, operating hardware, and often elaborate decorative programs emphasizing entry and passage.',
      UNDERGRADUATE: 'The door as architectural element embodies threshold symbolism while addressing practical requirements of access, security, and environmental separation. Historical analysis reveals evolving technologies and rich ornamental traditions surrounding points of entry.',
      GRADUATE: 'Door design engages questions of threshold, transition, and the phenomenology of entry. Analysis encompasses hardware technology, accessibility, security, and the symbolic and representational aspects of doorways across cultures.',
      PHD: 'Door studies address the anthropology and phenomenology of thresholds, technical evolution of door construction and hardware, and cultural analyses of entry rituals and their architectural expression.',
    },
    icon: '🚪',
    color: '#8e44ad',
    subcategories: [
      {
        id: 'door_types',
        name: 'Door Types',
        description: 'Overall door configurations',
        exampleElements: ['Paneled door', 'Dutch door', 'Pocket door', 'Revolving door', 'Sliding door', 'Double door'],
      },
      {
        id: 'door_surrounds',
        name: 'Door Surrounds',
        description: 'Frames and decorative elements around doors',
        exampleElements: ['Door frame', 'Architrave', 'Pediment', 'Aedicule', 'Door hood', 'Transom'],
      },
      {
        id: 'door_parts',
        name: 'Door Components',
        description: 'Parts that make up doors',
        exampleElements: ['Panel', 'Stile', 'Rail', 'Mullion', 'Muntin', 'Glazing bar'],
      },
      {
        id: 'door_hardware',
        name: 'Door Hardware',
        description: 'Functional and decorative door fittings',
        exampleElements: ['Door knocker', 'Door handle', 'Escutcheon', 'Hinge', 'Lock', 'Door pull'],
      },
      {
        id: 'monumental_doors',
        name: 'Monumental Doors',
        description: 'Grand and ceremonial doorways',
        exampleElements: ['Portal', 'Bronze doors', 'Gates', 'Triumphal entrance', 'Temple doors'],
      },
    ],
    commonlyConfusedWith: ['FACADE', 'WALL'],
    studyTips: [
      'Doors are about transition—leaving one space, entering another',
      'The grander the door, the more important what\'s beyond it',
      'Medieval cathedrals tell whole stories in their door carvings',
      'Door hardware evolved from simple to incredibly sophisticated',
    ],
  },

  WINDOW: {
    id: 'WINDOW',
    name: 'Window Elements',
    shortName: 'Window',
    description: {
      ELEMENTARY: 'Windows let light and air into buildings! They can be round, square, or fancy shapes. Stained glass windows tell stories with colored light.',
      MIDDLE_SCHOOL: 'Window elements control light, ventilation, and views. Windows evolved from simple openings to elaborate designs, including stained glass masterpieces that fill churches with colorful light.',
      HIGH_SCHOOL: 'Windows mediate between interior and exterior, managing light, views, ventilation, and thermal comfort. Window typologies range from simple punched openings to elaborate tracery and modern curtain wall systems.',
      UNDERGRADUATE: 'Window design negotiates competing requirements of light, view, ventilation, thermal comfort, and structural expression. Historical development traces from Roman clerestories through Gothic tracery to modern curtain walls and climate-responsive facades.',
      GRADUATE: 'Windows represent complex building elements addressing illumination, ventilation, thermal performance, and view. Analysis encompasses historical typologies, structural glazing systems, and contemporary high-performance envelope technologies.',
      PHD: 'Window studies engage daylighting science, thermal physics, structural glazing, and historical research on fenestration practices, examining windows as key mediators of environmental, visual, and symbolic relationships between interior and exterior.',
    },
    icon: '🪟',
    color: '#3498db',
    subcategories: [
      {
        id: 'window_types',
        name: 'Window Types',
        description: 'Overall window configurations',
        exampleElements: ['Casement', 'Sash window', 'Awning window', 'Fixed window', 'Pivot window', 'Clerestory'],
      },
      {
        id: 'special_windows',
        name: 'Special Windows',
        description: 'Distinctive window forms',
        exampleElements: ['Rose window', 'Palladian window', 'Oriel window', 'Bay window', 'Dormer window', 'Lunette'],
      },
      {
        id: 'window_parts',
        name: 'Window Components',
        description: 'Parts that make up windows',
        exampleElements: ['Sill', 'Lintel', 'Jamb', 'Mullion', 'Transom bar', 'Glazing bar'],
      },
      {
        id: 'tracery',
        name: 'Tracery',
        description: 'Ornamental stonework in windows',
        exampleElements: ['Plate tracery', 'Bar tracery', 'Perpendicular tracery', 'Flamboyant tracery', 'Geometric tracery'],
      },
      {
        id: 'glazing',
        name: 'Glazing Types',
        description: 'Glass and glazing systems',
        exampleElements: ['Stained glass', 'Leaded glass', 'Crown glass', 'Float glass', 'Double glazing', 'Smart glass'],
      },
      {
        id: 'window_accessories',
        name: 'Window Accessories',
        description: 'Elements associated with windows',
        exampleElements: ['Shutter', 'Blind', 'Window box', 'Window guard', 'Grille'],
      },
    ],
    commonlyConfusedWith: ['FACADE', 'DECORATIVE'],
    studyTips: [
      'Gothic windows pushed glass technology to its limits',
      'Window proportions define architectural style (tall and thin = Gothic, square = modern)',
      'Before glass, windows were just openings with shutters',
      'Modern curtain walls are essentially all window',
    ],
  },

  CEILING: {
    id: 'CEILING',
    name: 'Ceiling Elements',
    shortName: 'Ceiling',
    description: {
      ELEMENTARY: 'Ceilings are the "roofs" of rooms! Some are flat and simple, others have fancy patterns, paintings, or are shaped like the inside of an egg.',
      MIDDLE_SCHOOL: 'Ceiling elements form the upper enclosure of interior spaces. They can be flat, vaulted, domed, or coffered, and often feature decorative plasterwork, paintings, or exposed structural elements.',
      HIGH_SCHOOL: 'Ceilings define the upper boundary of interior space, with treatments ranging from flat planes through vaulted and domed forms to exposed structural systems. Ceiling design addresses acoustics, lighting, and spatial character.',
      UNDERGRADUATE: 'Ceiling systems mediate between structure and interior space, providing finished surfaces, concealing services, and shaping spatial experience. Historical development encompasses structural vaults, decorative plaster ceilings, and modern suspended systems.',
      GRADUATE: 'Ceiling design engages structural expression, acoustic performance, lighting integration, and spatial definition. Analysis examines the relationship between spanning structures and interior surfaces, and contemporary approaches to integrated ceiling systems.',
      PHD: 'Ceiling studies encompass structural analysis of vaulting, acoustic design, historical research on decorative ceiling traditions, and contemporary investigation of integrated ceiling systems addressing multiple performance requirements.',
    },
    icon: '🏫',
    color: '#f1c40f',
    subcategories: [
      {
        id: 'ceiling_types',
        name: 'Ceiling Types',
        description: 'Overall ceiling forms',
        exampleElements: ['Flat ceiling', 'Coved ceiling', 'Coffered ceiling', 'Tray ceiling', 'Vaulted ceiling', 'Dropped ceiling'],
      },
      {
        id: 'ceiling_structure',
        name: 'Exposed Structure',
        description: 'Visible structural ceiling elements',
        exampleElements: ['Exposed beams', 'Exposed joists', 'Open web joists', 'Hammer beam', 'Trussed ceiling'],
      },
      {
        id: 'ceiling_ornament',
        name: 'Ceiling Ornament',
        description: 'Decorative ceiling elements',
        exampleElements: ['Ceiling rose', 'Cornice', 'Medallion', 'Plasterwork', 'Fresco', 'Stalactite (muqarnas)'],
      },
      {
        id: 'ceiling_features',
        name: 'Ceiling Features',
        description: 'Functional ceiling elements',
        exampleElements: ['Skylight', 'Lantern', 'Oculus', 'Coffer', 'Lacunar', 'Light well'],
      },
    ],
    commonlyConfusedWith: ['ROOF', 'STRUCTURAL'],
    studyTips: [
      'The ceiling IS the interior expression of the roof/floor above',
      'Coffered ceilings both decorate AND reduce weight',
      'Baroque ceilings used painting to dissolve boundaries',
      'Modern ceilings often hide all the building systems',
    ],
  },

  COLUMN: {
    id: 'COLUMN',
    name: 'Column & Capital Elements',
    shortName: 'Column',
    description: {
      ELEMENTARY: 'Columns are tall posts that hold up buildings! The top part (capital) often has special decorations—some look like scrolls, some like leaves.',
      MIDDLE_SCHOOL: 'The classical orders (Doric, Ionic, Corinthian) define column design with specific proportions, fluting patterns, and decorative capitals. These have been used for over 2,500 years!',
      HIGH_SCHOOL: 'The classical orders constitute a systematic vocabulary of column design, specifying proportions, base profiles, shaft treatment, and capital forms. Understanding the orders is fundamental to reading Western architectural tradition.',
      UNDERGRADUATE: 'The classical orders represent codified systems relating column design to broader architectural composition. Analysis encompasses ancient Greek origins, Roman adaptations, Renaissance theorization, and modern reinterpretations.',
      GRADUATE: 'Column and order systems embody Western architectural theory, from Vitruvian codification through Renaissance treatises to neoclassical revivals and modernist rejection. Analysis addresses questions of rule, proportion, and the relationship between structure and expression.',
      PHD: 'Order systems constitute a rich field for examining architectural theory, the transmission of formal knowledge, the relationship between structure and ornament, and the cultural meanings invested in column vocabularies across periods.',
    },
    icon: '🏛️',
    color: '#2ecc71',
    subcategories: [
      {
        id: 'column_orders',
        name: 'Classical Orders',
        description: 'The systematic column types of classical architecture',
        exampleElements: ['Doric', 'Ionic', 'Corinthian', 'Tuscan', 'Composite'],
      },
      {
        id: 'column_parts',
        name: 'Column Parts',
        description: 'Components of columns',
        exampleElements: ['Base', 'Shaft', 'Capital', 'Fluting', 'Entasis', 'Necking'],
      },
      {
        id: 'capitals',
        name: 'Capital Types',
        description: 'The crowning elements of columns',
        exampleElements: ['Abacus', 'Echinus', 'Volute', 'Acanthus', 'Lotus capital', 'Palm capital'],
      },
      {
        id: 'column_variations',
        name: 'Column Variations',
        description: 'Special column forms',
        exampleElements: ['Engaged column', 'Pilaster', 'Caryatid', 'Atlantes', 'Solomonic column', 'Cluster column'],
      },
      {
        id: 'non_western',
        name: 'Non-Western Columns',
        description: 'Column traditions beyond classical orders',
        exampleElements: ['Egyptian column', 'Persian column', 'Indian pillar', 'Chinese column', 'Buddhist pillar'],
      },
    ],
    commonlyConfusedWith: ['STRUCTURAL'],
    studyTips: [
      'Doric = simple (think "D" for plain), Ionic = scrolls, Corinthian = leafy',
      'The orders aren\'t just decoration—they\'re complete design systems',
      'Proportion is everything: column height relates to diameter',
      'Non-Western traditions have their own column languages',
    ],
  },

  RELIGIOUS: {
    id: 'RELIGIOUS',
    name: 'Religious & Sacred Elements',
    shortName: 'Religious',
    description: {
      ELEMENTARY: 'Religious buildings like churches, mosques, and temples have special parts for worship! Altars, minarets, and prayer spaces help people connect with their beliefs.',
      MIDDLE_SCHOOL: 'Religious architecture has unique elements specific to each faith—church altars and spires, mosque minarets and mihrabs, temple sanctuaries and pagoda tiers. Each element has deep spiritual meaning.',
      HIGH_SCHOOL: 'Sacred architecture employs specialized elements expressing theological programs and facilitating liturgical practices. These include spatial organizations (nave, sanctuary), focal points (altar, qibla), and symbolic elements specific to each tradition.',
      UNDERGRADUATE: 'Religious architectural elements embody theological concepts and serve liturgical functions. Analysis requires understanding religious practice and belief systems that generate specific spatial organizations and symbolic elements.',
      GRADUATE: 'Sacred architecture represents the intersection of theological meaning and spatial practice. Analysis examines how religious elements encode doctrine, guide worship, and create experiences of transcendence across different faith traditions.',
      PHD: 'Religious architectural studies engage theology, ritual studies, and architectural history to analyze how built elements embody and enable religious experience across cultures and periods.',
    },
    icon: '⛪',
    color: '#9b59b6',
    subcategories: [
      {
        id: 'christian',
        name: 'Christian Elements',
        description: 'Elements specific to Christian architecture',
        exampleElements: ['Altar', 'Nave', 'Apse', 'Transept', 'Baptistery', 'Bell tower', 'Rood screen'],
      },
      {
        id: 'islamic',
        name: 'Islamic Elements',
        description: 'Elements specific to Islamic architecture',
        exampleElements: ['Minaret', 'Mihrab', 'Minbar', 'Qibla wall', 'Ablution fountain', 'Muqarnas'],
      },
      {
        id: 'hindu_buddhist',
        name: 'Hindu & Buddhist Elements',
        description: 'Elements from Hindu and Buddhist traditions',
        exampleElements: ['Shikhara', 'Gopuram', 'Garbhagriha', 'Stupa', 'Torana', 'Mandapa'],
      },
      {
        id: 'jewish',
        name: 'Jewish Elements',
        description: 'Elements specific to Jewish architecture',
        exampleElements: ['Ark (aron kodesh)', 'Bimah', 'Menorah', 'Eternal light', 'Women\'s gallery'],
      },
      {
        id: 'east_asian',
        name: 'East Asian Religious',
        description: 'Elements from East Asian religious architecture',
        exampleElements: ['Pagoda', 'Torii gate', 'Stone lantern', 'Offering hall', 'Sanctuary'],
      },
    ],
    commonlyConfusedWith: ['DECORATIVE', 'STRUCTURAL'],
    studyTips: [
      'Every religious element has meaning—nothing is just decoration',
      'Orientation matters: churches face east, mosques face Mecca',
      'Similar elements serve different purposes in different faiths',
      'Sacred geometry underlies many religious buildings',
    ],
  },

  FORTIFICATION: {
    id: 'FORTIFICATION',
    name: 'Fortification Elements',
    shortName: 'Fortification',
    description: {
      ELEMENTARY: 'Castles and forts were built to protect people! They have thick walls, tall towers, moats, and special openings for defending against attackers.',
      MIDDLE_SCHOOL: 'Fortification elements helped defend against attack—walls, towers, moats, battlements, and arrow slits all worked together as military architecture. Castles were basically military machines made of stone!',
      HIGH_SCHOOL: 'Fortification architecture developed in response to weapons technology, from medieval walls and towers through star forts designed for cannon warfare. Elements include defensive walls, entry controls, and positions for defenders.',
      UNDERGRADUATE: 'Military architecture represents a dialogue between offensive and defensive technologies. Analysis traces evolution from classical and medieval fortification through trace italienne star forts to modern bunkers, examining the relationship between threat and response.',
      GRADUATE: 'Fortification studies engage military history, technology, and architectural typology. Analysis examines the logic of defensive systems, the impact of gunpowder, and the archaeology of conflict as manifested in built form.',
      PHD: 'Fortification architecture constitutes a specialized field examining the interplay of military technology, engineering practice, and spatial organization, from ancient defensive works through contemporary security architecture.',
    },
    icon: '🏰',
    color: '#7f8c8d',
    subcategories: [
      {
        id: 'walls_towers',
        name: 'Walls & Towers',
        description: 'Primary defensive structures',
        exampleElements: ['Curtain wall', 'Keep', 'Barbican', 'Watchtower', 'Bastion', 'Round tower'],
      },
      {
        id: 'wall_top',
        name: 'Wall Top Elements',
        description: 'Elements atop defensive walls',
        exampleElements: ['Battlement', 'Merlon', 'Crenel', 'Machicolation', 'Parapet walk', 'Hoarding'],
      },
      {
        id: 'entry',
        name: 'Entry & Control',
        description: 'Elements controlling access',
        exampleElements: ['Gatehouse', 'Portcullis', 'Drawbridge', 'Murder hole', 'Sally port', 'Postern'],
      },
      {
        id: 'defensive_features',
        name: 'Defensive Features',
        description: 'Elements aiding defense',
        exampleElements: ['Arrow slit', 'Moat', 'Glacis', 'Ditch', 'Talus', 'Berm'],
      },
      {
        id: 'artillery',
        name: 'Artillery Age',
        description: 'Elements from the gunpowder era',
        exampleElements: ['Star fort', 'Ravelin', 'Caponier', 'Gun loop', 'Casemate', 'Counterscarp'],
      },
    ],
    commonlyConfusedWith: ['STRUCTURAL', 'WALL'],
    studyTips: [
      'Every fortification element exists to solve a specific defensive problem',
      'The shape of forts changed dramatically with cannons (round to star)',
      'Layers of defense: moat, outer wall, inner wall, keep',
      'Medieval castles are as much about display of power as defense',
    ],
  },

  GARDEN: {
    id: 'GARDEN',
    name: 'Garden & Landscape Elements',
    shortName: 'Garden',
    description: {
      ELEMENTARY: 'Gardens have buildings too! Gazebos to sit in, fountains to enjoy, paths to walk on, and walls to make outdoor "rooms."',
      MIDDLE_SCHOOL: 'Garden architecture includes structures in designed landscapes—gazebos, pergolas, fountains, walls, and follies. Different cultures created unique garden styles, from French formal to Japanese zen.',
      HIGH_SCHOOL: 'Landscape architecture employs a vocabulary of built elements within designed outdoor spaces. These range from functional structures (walls, paths, water features) to ornamental buildings (pavilions, follies, grottoes).',
      UNDERGRADUATE: 'Garden and landscape architecture represents the intersection of building and nature. Analysis examines how architectural elements structure outdoor space, manage water and topography, and create designed experiences in dialogue with natural elements.',
      GRADUATE: 'Landscape architecture engages questions of nature and culture, with built elements mediating between architectural and natural systems. Analysis encompasses historical garden traditions and contemporary sustainable design approaches.',
      PHD: 'Garden architecture studies engage cultural geography, environmental history, and design theory to analyze how built elements in landscapes express cultural values, manage ecological systems, and create experiential narratives.',
    },
    icon: '🏛️',
    color: '#27ae60',
    subcategories: [
      {
        id: 'garden_structures',
        name: 'Garden Structures',
        description: 'Built structures in gardens',
        exampleElements: ['Gazebo', 'Pavilion', 'Pergola', 'Arbor', 'Belvedere', 'Folly', 'Grotto'],
      },
      {
        id: 'water_features',
        name: 'Water Features',
        description: 'Built water elements',
        exampleElements: ['Fountain', 'Pool', 'Canal', 'Cascade', 'Nymphaeum', 'Water chain'],
      },
      {
        id: 'boundaries',
        name: 'Boundaries & Enclosures',
        description: 'Elements defining garden spaces',
        exampleElements: ['Ha-ha', 'Garden wall', 'Hedged room', 'Fence', 'Gate', 'Balustrade'],
      },
      {
        id: 'circulation',
        name: 'Garden Circulation',
        description: 'Paths and movement elements',
        exampleElements: ['Garden path', 'Terrace', 'Steps', 'Bridge', 'Allee', 'Promenade'],
      },
      {
        id: 'ornament',
        name: 'Garden Ornament',
        description: 'Decorative garden elements',
        exampleElements: ['Statue', 'Urn', 'Sundial', 'Obelisk', 'Stone lantern', 'Topiary frame'],
      },
    ],
    commonlyConfusedWith: ['DECORATIVE'],
    studyTips: [
      'Gardens are outdoor architecture—same principles apply',
      'Water features were the original status symbols',
      'The ha-ha is brilliant: a hidden ditch that\'s an invisible wall',
      'Japanese and Western gardens have very different philosophies',
    ],
  },

  INTERIOR: {
    id: 'INTERIOR',
    name: 'Interior Elements',
    shortName: 'Interior',
    description: {
      ELEMENTARY: 'Inside buildings have special parts too! Fireplaces to keep warm, fancy wall panels, and built-in furniture that\'s part of the building.',
      MIDDLE_SCHOOL: 'Interior architecture includes built-in features like fireplaces, wall paneling, built-in cabinets, and decorative plasterwork. These elements shape how rooms feel and function.',
      HIGH_SCHOOL: 'Interior architectural elements define the character and function of indoor spaces. These include fixed features (fireplaces, paneling, built-in furniture) and decorative treatments (plasterwork, wall coverings) that establish spatial quality.',
      UNDERGRADUATE: 'Interior architecture addresses the design of inhabited space through fixed elements that define spatial character, support functions, and express style. Analysis examines the relationship between architectural shell and interior elaboration.',
      GRADUATE: 'Interior architectural elements mediate between building structure and inhabitation. Analysis encompasses historical approaches to interior design, the relationship between architecture and decoration, and contemporary approaches to spatial flexibility.',
      PHD: 'Interior architecture studies examine the social history of domestic space, the material culture of interiors, and theoretical frameworks for understanding the relationship between architectural space and its furnishing and decoration.',
    },
    icon: '🛋️',
    color: '#e67e22',
    subcategories: [
      {
        id: 'fireplaces',
        name: 'Fireplaces & Heating',
        description: 'Hearth and heating elements',
        exampleElements: ['Fireplace', 'Mantelpiece', 'Chimney breast', 'Inglenook', 'Stove', 'Hearth'],
      },
      {
        id: 'paneling',
        name: 'Wall Treatments',
        description: 'Fixed wall finishes',
        exampleElements: ['Wainscot', 'Boiserie', 'Linenfold', 'Raised panel', 'Wall fabric', 'Stucco lustro'],
      },
      {
        id: 'built_ins',
        name: 'Built-in Elements',
        description: 'Fixed furniture and storage',
        exampleElements: ['Built-in bookcase', 'Window seat', 'Cupboard', 'Closet', 'Niche', 'Alcove bed'],
      },
      {
        id: 'millwork',
        name: 'Millwork & Trim',
        description: 'Finished woodwork elements',
        exampleElements: ['Baseboard', 'Crown molding', 'Chair rail', 'Picture rail', 'Door casing', 'Window casing'],
      },
      {
        id: 'screens',
        name: 'Screens & Dividers',
        description: 'Interior space dividers',
        exampleElements: ['Shoji screen', 'Room divider', 'Folding screen', 'Curtain', 'Portière'],
      },
    ],
    commonlyConfusedWith: ['DECORATIVE', 'WALL'],
    studyTips: [
      'The fireplace was the heart of the home—literally and socially',
      'Wall paneling protects walls AND insulates',
      'Built-ins make furniture part of the architecture',
      'Millwork profiles tell you a lot about period and style',
    ],
  },

  URBAN: {
    id: 'URBAN',
    name: 'Urban Elements',
    shortName: 'Urban',
    description: {
      ELEMENTARY: 'Cities have special architecture too! Town squares for gatherings, monuments to remember heroes, and arcades that let you walk without getting wet.',
      MIDDLE_SCHOOL: 'Urban architecture shapes public spaces—plazas, arcades, monuments, and street furniture. These elements create the shared spaces where people meet, gather, and move through cities.',
      HIGH_SCHOOL: 'Urban architectural elements structure public space and collective life. These include spatial types (plaza, square, arcade), monuments and memorials, and infrastructure elements that shape the experience of cities.',
      UNDERGRADUATE: 'Urban architecture addresses the design of public realm through spatial types, built elements, and their relationships to buildings. Analysis examines how urban elements create places for social life and express collective identity.',
      GRADUATE: 'Urban architecture engages questions of public space, collective memory, and urban experience. Analysis examines historical urban typologies, monument traditions, and contemporary challenges of designing inclusive public realms.',
      PHD: 'Urban architecture studies engage urban morphology, public space theory, and cultural geography to analyze how built elements shape collective life, express political order, and create urban experience.',
    },
    icon: '🏙️',
    color: '#34495e',
    subcategories: [
      {
        id: 'public_spaces',
        name: 'Public Spaces',
        description: 'Types of urban gathering spaces',
        exampleElements: ['Plaza', 'Square', 'Forum', 'Agora', 'Piazza', 'Courtyard'],
      },
      {
        id: 'covered_spaces',
        name: 'Covered Public Spaces',
        description: 'Sheltered urban spaces',
        exampleElements: ['Arcade', 'Colonnade', 'Gallery', 'Passage', 'Loggia', 'Stoa'],
      },
      {
        id: 'monuments',
        name: 'Monuments & Memorials',
        description: 'Commemorative structures',
        exampleElements: ['Obelisk', 'Column monument', 'Triumphal arch', 'War memorial', 'Statue', 'Cenotaph'],
      },
      {
        id: 'infrastructure',
        name: 'Urban Infrastructure',
        description: 'Built elements serving cities',
        exampleElements: ['Bridge', 'Aqueduct', 'City gate', 'Tower', 'Clock tower', 'Market hall'],
      },
      {
        id: 'street_furniture',
        name: 'Street Furniture',
        description: 'Small-scale urban elements',
        exampleElements: ['Bench', 'Lamp post', 'Drinking fountain', 'Kiosk', 'Bollard', 'Wayfinding'],
      },
    ],
    commonlyConfusedWith: ['FACADE', 'GARDEN'],
    studyTips: [
      'Urban spaces are outdoor rooms defined by building faces',
      'Scale matters hugely—a plaza can feel intimate or overwhelming',
      'Monuments often mark the center of power in a city',
      'Arcades created the original shopping experience',
    ],
  },
};

// Helper functions for categories

export function getCategoryById(id: ElementCategory): CategoryDefinition | undefined {
  return CATEGORY_DEFINITIONS[id];
}

export function getAllCategories(): CategoryDefinition[] {
  return Object.values(CATEGORY_DEFINITIONS);
}

export function getCategoryDescription(id: ElementCategory, level: LearningLevel): string {
  const category = CATEGORY_DEFINITIONS[id];
  return category?.description[level] || '';
}

export function getSubcategories(categoryId: ElementCategory): SubcategoryDefinition[] {
  return CATEGORY_DEFINITIONS[categoryId]?.subcategories || [];
}

export function findSubcategory(categoryId: ElementCategory, subcategoryId: string): SubcategoryDefinition | undefined {
  return CATEGORY_DEFINITIONS[categoryId]?.subcategories.find(sub => sub.id === subcategoryId);
}

export function searchCategories(query: string): CategoryDefinition[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(CATEGORY_DEFINITIONS).filter(category =>
    category.name.toLowerCase().includes(lowerQuery) ||
    category.subcategories.some(sub =>
      sub.name.toLowerCase().includes(lowerQuery) ||
      sub.exampleElements.some(el => el.toLowerCase().includes(lowerQuery))
    )
  );
}

// Category groupings for UI organization
export const CATEGORY_GROUPS = {
  STRUCTURAL_SYSTEMS: ['STRUCTURAL', 'COLUMN', 'ROOF', 'FLOOR', 'WALL', 'CEILING'] as ElementCategory[],
  OPENINGS: ['DOOR', 'WINDOW', 'FACADE'] as ElementCategory[],
  ORNAMENT: ['DECORATIVE', 'INTERIOR'] as ElementCategory[],
  SPECIALIZED: ['RELIGIOUS', 'FORTIFICATION', 'GARDEN', 'URBAN'] as ElementCategory[],
};

export const CATEGORY_COLORS = Object.fromEntries(
  Object.values(CATEGORY_DEFINITIONS).map(cat => [cat.id, cat.color])
) as Record<ElementCategory, string>;


// Alias exports for simpler imports
export const CATEGORIES = CATEGORY_DEFINITIONS;

