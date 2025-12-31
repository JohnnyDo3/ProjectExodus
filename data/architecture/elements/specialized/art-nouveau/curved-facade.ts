import type { ArchitecturalElement } from '../../../types';

export const CURVED_FACADE: ArchitecturalElement = {
  id: 'curved-facade',
  slug: 'curved-facade',
  name: 'Curved Facade',
  alternativeNames: ['Undulating Facade', 'Organic Facade', 'Flowing Front', 'Sculptural Facade'],
  pronunciation: {
    phonetic: 'KURVD fuh-SAHD',
    language: 'English',
  },
  etymology: {
    origin: 'English/French',
    meaning: 'Building front with flowing curves',
    rootWord: 'Latin "curvus" (bent) + French "façade" (front, face)',
  },
  category: 'FACADE',
  subcategory: 'wall_treatment',
  periods: ['art-nouveau'],
  regions: ['SPAIN', 'BELGIUM', 'FRANCE', 'CENTRAL_EUROPE'],

  images: {
    primary: '/images/architecture/elements/curved-facade-primary.jpg',
    gallery: [
      '/images/architecture/elements/curved-facade-gaudi.jpg',
      '/images/architecture/elements/curved-facade-detail.jpg',
      '/images/architecture/elements/curved-facade-street.jpg',
    ],
    diagram: '/images/architecture/diagrams/curved-facade-construction.svg',
  },

  description: {
    ELEMENTARY: 'A curved facade means the front of a building has wavy, flowing walls instead of being flat and straight. Instead of looking like a box, these buildings might look like ocean waves, melting wax, or growing plants! Antoni Gaudí in Spain was famous for making buildings with walls that curve and flow like nothing you\'ve ever seen. The curved walls make buildings look alive and moving, like they\'re breathing or dancing. This was very different from old buildings which always had straight, flat walls.',
    MIDDLE_SCHOOL: 'Curved facades in Art Nouveau architecture feature undulating, wave-like walls that replace traditional flat surfaces with organic, flowing forms. Architects achieved these curves through careful stonework, innovative structural systems, and sculptural design. The curves might be gentle waves across an entire building front or dramatic ripples that make walls seem to flow like liquid. Antoni Gaudí pushed this concept furthest in Barcelona, creating buildings like Casa Batlló where the facade undulates continuously. The curved facades served both aesthetic and structural purposes - curves could add strength while creating dynamic visual effects. This represented a radical break from centuries of flat-walled architecture.',
    HIGH_SCHOOL: 'The curved facade represents Art Nouveau\'s most dramatic architectural innovation, transforming static walls into dynamic sculptural surfaces. Rather than applying decoration to flat surfaces, architects conceived entire facades as three-dimensional organic forms. Achievement required both technical innovation and design vision. Structurally, curves demanded careful engineering - load-bearing walls couldn\'t simply undulate without consideration of forces. Gaudí addressed this through catenary arches and careful load distribution. Horta achieved curves through bay windows and projecting elements. Construction methods varied: carved stone blocks, molded concrete, or composite systems combining materials. The facades often integrated with organic ornament, so undulating walls supported flowing ironwork and botanical sculpture. The curves created practical effects - varied wall planes admitted different light angles, broke up street monotony, and provided visual interest from multiple viewpoints.',
    UNDERGRADUATE: 'Art Nouveau curved facades embody the movement\'s challenge to architectural conventions, particularly the assumption that walls must be flat and vertical. The innovation required synthesis of aesthetic vision, structural understanding, and construction capability. Gaudí\'s approach derived from studying natural structures - shells, bones, plant forms - that achieve strength through curved geometry. His Casa Batlló (1904-1906) and Casa Milà (1906-1912) demonstrate complete facade undulation, achieved through careful stone cutting and structural innovation. Horta\'s curves operated differently, projecting bay windows and balconies to create facade modulation while maintaining underlying flat walls. Guimard employed curved elements within overall rectilinear compositions. Technical challenges included water drainage on curved surfaces, window integration in non-planar walls, and structural load distribution. Material choices affected possibilities - stone required skilled carving, concrete enabled molded forms, and iron framing could support non-load-bearing curved walls. The facades\' phenomenological impact merits consideration - undulating surfaces created different visual experiences as viewers moved, challenging static Renaissance perspective conventions.',
    GRADUATE: 'Critical analysis of Art Nouveau curved facades addresses structural, aesthetic, and cultural dimensions. Research examines how architects achieved curves within contemporary construction technology constraints. Gaudí\'s methods combined empirical structural analysis (hanging chain models revealing optimal catenary curves) with innovative masonry techniques and iron reinforcement. Recent structural analysis using modern engineering software validates his intuitive approaches. The facades\' formal sources merit investigation - which natural precedents inspired specific curves, how did biological morphology influence design, what role did contemporary scientific illustration play? The curved facade\'s relationship to urban context requires examination - how did undulating buildings interact with orthogonal street grids, what social meanings did they carry? Conservation challenges are significant - curved surfaces weather differently than flat walls, repairs require matching complex geometries, and structural movement in organic forms differs from conventional buildings. Economic analysis reveals curved facades\' expense - they required exceptional craftsmanship and couldn\'t employ standard building elements. This largely limited application to wealthy clients, complicating Art Nouveau\'s democratic aspirations. Cross-cultural research examines how curved facades appeared in different contexts, from Barcelona to Brussels to Moscow.',
    PHD: 'Scholarly investigation of Art Nouveau curved facades offers interdisciplinary opportunities spanning architectural history, structural engineering, material science, and cultural studies. Structural engineering research employs modern analysis tools to understand historical achievements, revealing sophisticated intuitive understanding of forces and geometries. Gaudí\'s work particularly rewards analysis - his catenary structures, ruled surface geometries, and integration of natural forms demonstrate remarkable structural-aesthetic synthesis. Material science research investigates construction techniques, employing archaeological investigation of actual buildings to understand assembly methods, material combinations, and technical innovations. Conservation science addresses specific challenges of curved architecture - differential weathering, structural monitoring, and repair methodologies. Art historical research examines formal sources, tracing influences from natural observation, scientific illustration, and cross-cultural exchanges. The facades\' role in architectural phenomenology merits investigation - how did curved surfaces affect spatial experience, bodily movement, and meaning-making? Gender studies might examine whether curved facades carried gendered associations (feminine fluidity versus masculine geometric rigor). Economic and social analysis situates curved facades within broader questions of modernity, luxury, and urban transformation. Digital humanities approaches enable analysis of facade geometries, potentially revealing underlying mathematical principles or evolutionary patterns. Contemporary research examines the curved facade\'s influence on modern architecture, particularly with digital design and fabrication enabling complex curves.',
  },

  history: {
    ELEMENTARY: 'For thousands of years, almost all buildings had flat walls. Then in the 1890s, some brave architects started making curved walls! Antoni Gaudí in Barcelona was the boldest - he made buildings that looked like waves or melting stone. Victor Horta in Brussels made gentler curves with bay windows. These curved buildings amazed people who had never seen anything like them. After about 1910, most architects went back to straight walls because curved ones were hard and expensive to build. But today, people love these wavy old Art Nouveau buildings and protect them as special treasures.',
    MIDDLE_SCHOOL: 'The curved facade emerged in the 1890s as Art Nouveau architects sought alternatives to flat walls. Early examples like Horta\'s Hôtel Tassel (1893) achieved curves through projecting bay windows and balconies. Antoni Gaudí pushed the concept much further in Barcelona, creating buildings with truly undulating stone facades - Casa Batlló (1904-1906) and Casa Milà (1906-1912) featured walls that flowed like waves. These required innovative construction techniques and exceptional craftsmen. Other architects like Hector Guimard in Paris incorporated curved elements more selectively. The curved facades were expensive and difficult to build, limiting their use mostly to wealthy clients\' buildings. After World War I, the style fell out of favor as modernist architecture emphasized simple geometric forms. Today, Gaudí\'s curved buildings are UNESCO World Heritage sites.',
    HIGH_SCHOOL: 'Curved facade development reflects Art Nouveau\'s evolution from decorative innovation to structural transformation. Early examples (1893-1900) achieved curves through projecting elements - Horta\'s bay windows, balconies, and roof lines created facade modulation without fundamentally altering wall construction. Gaudí\'s work represented a quantum leap - Casa Batlló\'s continuously undulating facade and Casa Milà\'s complete rejection of straight lines required rethinking structural systems. Gaudí developed his approach through studying natural structures and using experimental models (hanging chains, weighted strings) to determine optimal curves. Technical innovations included improved stone-cutting techniques, iron reinforcement systems, and composite structural approaches. The facades\' reception was mixed - supporters praised their organic beauty and structural innovation, while critics condemned them as bizarre or impractical. Construction costs were high, requiring skilled craftsmen and custom approaches. After 1910, economic pressures, changing tastes, and modernist functionalism ended most curved facade construction. However, later twentieth-century architects including Frank Gehry acknowledged Art Nouveau curved facades as inspiration for contemporary sculptural architecture.',
    UNDERGRADUATE: 'Art Nouveau curved facades\' history illuminates tensions between aesthetic ambition, technical capability, and practical constraints. The innovation built on limited precedents - baroque facades employed shallow curves, and some vernacular traditions used curved walls - but Art Nouveau pursued systematic organic undulation. Horta\'s early buildings (1893-1900) demonstrated curves through projecting elements within conventional structural frameworks. Gaudí\'s approach evolved through multiple projects: Casa Calvet (1898-1900) employed conventional construction with curved details, Casa Batlló (1904-1906) achieved partial facade undulation, and Casa Milà (1906-1912) realized complete structural curves. His method synthesized empirical structural analysis, natural form study, and craftsmanship. Construction required skilled stonecutters who could shape complex curves, ironworkers who could create custom reinforcement, and masons who could assemble non-standard geometries. Material innovations supported the development - improved cements, iron availability, and better understanding of composite construction. The facades\' urban context varied - Barcelona\'s grid allowed Gaudí considerable freedom, while Brussels and Paris regulations constrained facade treatments. Economic factors limited application - curved facades required exceptional expense, restricting them to wealthy clients. The style\'s decline reflected multiple factors: World War I\'s disruption, changing aesthetic preferences toward geometric modernism, and economic pressures favoring standardization.',
    GRADUATE: 'Scholarly investigation of curved facades addresses technical, aesthetic, and cultural questions. Structural engineering research examines how architects achieved curves within contemporary technology - Gaudí\'s work particularly rewards analysis, revealing sophisticated understanding of catenary curves, ruled surfaces, and load distribution. Recent studies using finite element analysis validate his intuitive structural approaches and reveal optimization strategies. Material science research investigates construction techniques through archaeological study of actual buildings, materials analysis, and archival research. Comparative studies examine different architects\' approaches - Gaudí\'s complete structural curves versus Horta\'s projected elements versus Guimard\'s selective curves. Art historical research traces formal sources, examining influences from natural observation, Gothic precedents, and contemporary scientific understanding of organic structures. The facades\' relationship to urban context merits analysis - how did curved buildings interact with orthogonal street grids, what social meanings did they carry, how did regulations affect design? Conservation science tackles specific challenges: differential weathering on curved surfaces, structural monitoring of complex geometries, and repair methodologies. Economic analysis examines costs, client relationships, and the contradiction between Art Nouveau\'s democratic rhetoric and elite reality. Reception studies analyze critical discourse, examining how curved facades\' meanings shifted from innovative to bizarre to treasured heritage.',
    PHD: 'Curved facades present rich interdisciplinary research opportunities. Engineering research employs advanced structural analysis to understand historical achievements, potentially revealing optimization principles applicable to contemporary design. Material science investigation examines construction techniques in detail, employing archaeological approaches, materials analysis, and experimental reconstruction. Art historical research analyzes formal development and sources, examining relationships to natural observation, scientific illustration, and cross-cultural influences. The question of whether Gaudí knew advanced geometry or worked intuitively merits investigation - recent research suggests sophisticated geometric understanding. Phenomenological research investigates how curved facades affected spatial experience, examining relationships between bodily movement, visual perception, and architectural meaning. Gender studies might analyze whether curves carried gendered associations in contemporary discourse. Economic and social analysis situates curved facades within broader questions about modernity, luxury, and urban transformation - how did these expensive singular buildings relate to contemporary mass housing needs? Cross-cultural research examines curved facades globally, investigating how the concept appeared in different contexts from Brussels to Moscow to Buenos Aires. Digital humanities approaches enable geometric analysis of facade curves, potentially revealing underlying mathematical principles, evolutionary patterns, or specific natural influences. Contemporary research examines the curved facade\'s influence on modern architecture, particularly with digital design and fabrication technologies enabling complex geometries.',
  },

  characteristics: [
    'Undulating, wave-like wall surfaces',
    'Replaces flat facades with organic three-dimensional forms',
    'Integrates structure and sculptural expression',
    'Requires innovative construction techniques',
    'Often combines with organic ornament',
    'Creates varied light effects and visual interest',
    'Challenges orthogonal street grid conventions',
    'Demands exceptional craftsmanship',
  ],

  famousExamples: [
    { name: 'Casa Batlló', location: 'Barcelona, Spain', year: '1904-1906', description: 'Antoni Gaudí\'s undulating facade with bone-like balconies and scale-like roof, resembling a living organism' },
    { name: 'Casa Milà (La Pedrera)', location: 'Barcelona, Spain', year: '1906-1912', description: 'Gaudí\'s completely curved facade with no straight lines, resembling a stone quarry or sea waves' },
    { name: 'Hôtel Tassel', location: 'Brussels, Belgium', year: '1893-1894', description: 'Victor Horta\'s facade with curved bay window creating dynamic street presence' },
    { name: 'Hôtel van Eetvelde', location: 'Brussels, Belgium', year: '1895-1898', description: 'Horta\'s facade with projecting curved elements and organic ironwork' },
    { name: 'Immeuble Lavirotte', location: 'Paris, France', year: '1901', description: 'Jules Lavirotte\'s highly sculptural facade with ceramic curves and organic forms' },
  ],

  confusionPairs: [
    {
      elementId: 'baroque-facade',
      reason: 'Both can feature curved elements',
      distinction: 'Baroque facades use curves within symmetrical compositions; Art Nouveau curved facades emphasize organic asymmetry and continuous undulation',
    },
    {
      elementId: 'deconstructivist-facade',
      reason: 'Both challenge conventional orthogonal facades',
      distinction: 'Art Nouveau curves derive from organic nature; deconstructivist facades employ geometric fragmentation and angular distortion',
    },
  ],

  searchTags: ['art-nouveau', 'curved', 'undulating', 'facade', 'organic', 'wavy', 'sculptural', 'gaudi', 'horta', 'barcelona', 'belgium', 'dynamic'],

  arMetadata: {
    modelPath: '/models/architecture/curved-facade.glb',
    scale: 3.0,
    rotatable: true,
    annotations: [
      { label: 'Wave Crest', position: { x: -0.15, y: 0.1, z: 0.05 } },
      { label: 'Undulation', position: { x: 0, y: 0, z: 0.08 } },
      { label: 'Curved Balcony', position: { x: 0.1, y: -0.05, z: 0.06 } },
      { label: 'Organic Window Frame', position: { x: -0.08, y: -0.08, z: 0.04 } },
      { label: 'Flowing Roofline', position: { x: 0.12, y: 0.15, z: 0.03 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
