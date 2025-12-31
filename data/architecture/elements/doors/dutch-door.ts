import type { ArchitecturalElement } from '../../types';

export const DUTCH_DOOR: ArchitecturalElement = {
  id: 'dutch-door',
  slug: 'dutch-door',
  name: 'Dutch Door',
  alternativeNames: ['Split Door', 'Half Door', 'Stable Door', 'Double-Hung Door'],
  pronunciation: {
    phonetic: 'DUHCH door',
    language: 'English',
  },
  etymology: {
    origin: 'Dutch',
    meaning: 'Door divided horizontally to operate independently',
    rootWord: 'Named after Dutch architectural tradition',
  },
  category: 'DOOR',
  subcategory: 'door_types',
  periods: ['colonial-american', 'vernacular', 'arts-and-crafts', 'modern'],
  regions: ['Netherlands', 'North America', 'Europe'],

  images: {
    primary: '/images/architecture/elements/dutch-door-primary.jpg',
    gallery: [
      '/images/architecture/elements/dutch-door-farmhouse.jpg',
      '/images/architecture/elements/dutch-door-colonial.jpg',
      '/images/architecture/elements/dutch-door-stable.jpg',
    ],
    diagram: '/images/architecture/diagrams/dutch-door-detail.svg',
  },

  description: {
    ELEMENTARY: 'A Dutch door is split in the middle so the top and bottom can open separately! You can open just the top part to let in air and sunlight while keeping animals or small children from going outside. It\'s like having two doors in one!',
    MIDDLE_SCHOOL: 'The Dutch door consists of two horizontal sections that operate independently on separate hinges. The upper half can open while the lower half remains closed, providing ventilation and visibility while maintaining a barrier. A sliding bolt typically allows both halves to be locked together to function as a single door. Originally used in farmhouses and stables, Dutch doors combine practicality with traditional charm.',
    HIGH_SCHOOL: 'The Dutch door employs a horizontal division at approximately mid-height, with each section mounted on independent hinges. This configuration enables the upper section to open for ventilation and communication while the closed lower section prevents entry by animals or children. Hardware includes separate latches for each section plus a connecting bolt allowing unified operation. The design originated in the Netherlands during the 17th century, spreading to Dutch colonial settlements in North America. Construction may use traditional frame-and-panel or modern flush panel methods.',
    UNDERGRADUATE: 'Dutch door design reflects practical responses to domestic and agricultural needs in northern European climate and farming contexts. The horizontal division typically occurs at 36-42 inches from the floor, optimizing ventilation while maintaining security. Each section requires independent hinge sets, weather stripping, and latching mechanisms. When joined, a sliding or rotating bolt aligns both halves, with hardware concealed within meeting rails. Dutch doors became prominent in Hudson Valley Dutch Colonial architecture (1630s-1830s), where they addressed needs for climate control, livestock management, and social interaction. Revival periods have reinterpreted Dutch doors for contemporary residential use.',
    GRADUATE: 'The Dutch door represents a vernacular building type that evolved from specific cultural practices and environmental conditions. Originating in the Netherlands where controlling interior climate while maintaining visual connection to street or farmyard was valued, the form migrated with Dutch colonists to New Netherland (New York region). The horizontal division created a liminal threshold enabling housewives to monitor street activities, converse with neighbors, and ventilate homes while preventing animal entry and supervising children. American Colonial Revival (1880s-1950s) romanticized Dutch doors as symbols of rustic domesticity. Contemporary applications range from literal historical reproduction to modern reinterpretations using innovative materials and hardware.',
    PHD: 'Scholarly analysis of Dutch doors addresses vernacular architecture theory, cultural geography, and domestic space negotiation. Research examines how this building element encoded Dutch cultural values regarding threshold mediation and social interaction, traces its transmission and adaptation in colonial contexts, and analyzes its revival as architectural signifier. Studies employ archaeological evidence from Dutch colonial sites, comparative analysis of European and American examples, and material culture approaches examining hardware and construction details. Contemporary research investigates Dutch doors within larger patterns of cultural landscape formation, examines how gender-specific spatial practices shaped threshold design, and considers modern applications addressing accessibility and climate control.',
  },

  history: {
    ELEMENTARY: 'Dutch doors were invented in the Netherlands over 400 years ago. Farmers used them to keep farm animals outside while letting in fresh air. When Dutch people came to America, they brought this clever door design with them!',
    MIDDLE_SCHOOL: 'Dutch doors originated in the Netherlands during the 17th century, serving practical needs in farmhouses and shops. Dutch colonists brought the design to New Netherland (now New York and New Jersey) in the 1600s. The doors became characteristic features of Dutch Colonial architecture in the Hudson Valley. In the 20th century, Colonial Revival and Farmhouse styles revived Dutch door popularity.',
    HIGH_SCHOOL: 'The Dutch door emerged in the Low Countries during the early modern period (c. 1600-1700) as a pragmatic solution for ventilation and animal control in agrarian settings. Dutch colonization of New Netherland (1614-1674) introduced the form to North America, where it became integral to Hudson Valley Dutch Colonial architecture. Examples appear in stone houses throughout the region, often painted in traditional Dutch colors. The form persisted in American rural architecture through the 19th century, declining with Victorian stylistic preferences. Colonial Revival architecture (1880s-1960s) rediscovered Dutch doors as symbols of American colonial heritage.',
    UNDERGRADUATE: 'Dutch door development reflects cultural practices surrounding domestic thresholds and vernacular building traditions. In the Netherlands, the split door facilitated street-facing sociability while maintaining household boundaries-upper sections opened for conversation and display while lower sections remained closed. This threshold negotiation reflected Dutch urban planning with houses directly fronting streets. In colonial New York and New Jersey, Dutch doors served agricultural functions-ventilating while excluding livestock-while maintaining cultural identity. The form\'s decline coincided with industrialization and changing domestic privacy norms. Arts and Crafts movement appreciated Dutch doors\' honest functionality, while Colonial Revival employed them as heritage markers.',
    GRADUATE: 'The Dutch door\'s historical trajectory illustrates vernacular form migration, cultural persistence, and architectural revival. Originating within specific Dutch cultural contexts valuing controlled street interaction and practical climate management, the form encoded social practices around gendered domestic labor and neighborhood sociability. Colonial transmission to New Netherland created modified contexts-less urban density, different climate, agricultural emphasis-producing functional continuity with adjusted cultural meaning. Post-Colonial period saw gradual abandonment as Anglo-American building traditions dominated and Victorian privacy ideals displaced threshold sociability. Twentieth-century revivals reinterpreted Dutch doors through romantic nostalgia (Colonial Revival) and craft values (Arts and Crafts), creating heritage signifiers divorced from original cultural contexts.',
    PHD: 'Scholarly engagement with Dutch door history encompasses material culture studies, vernacular architecture theory, and cultural landscape analysis. Research examines how door form reflects cultural attitudes toward domestic/public boundaries, traces design transmission through colonial networks, and analyzes revival movements\' ideological dimensions. Archaeological investigations of Dutch colonial sites provide material evidence of original construction techniques and hardware. Comparative studies examine Dutch doors within broader European threshold traditions-German half-doors, English cottage doors-revealing shared functions with divergent cultural meanings. Recent scholarship applies feminist analysis to examine gendered spatial practices encoded in threshold design, employs digital documentation techniques for preservation, and investigates contemporary adaptations addressing modern environmental performance requirements.',
  },

  characteristics: [
    'Horizontal division at mid-height',
    'Independent operation of sections',
    'Separate hinges for each half',
    'Connecting bolt for unified use',
    'Ventilation while maintaining barrier',
    'Typically residential or agricultural',
    'Associated with Dutch Colonial style',
  ],

  famousExamples: [
    { name: 'Van Cortlandt Manor', location: 'Croton-on-Hudson, New York', year: '1748', description: 'Dutch Colonial manor with original Dutch doors' },
    { name: 'Philipsburg Manor', location: 'Sleepy Hollow, New York', year: '1693', description: 'Historic Dutch trading post with characteristic split doors' },
    { name: 'Wyckoff House', location: 'Brooklyn, New York', year: '1652', description: 'Oldest structure in New York City, features Dutch doors' },
    { name: 'Historic Huguenot Street', location: 'New Paltz, New York', year: '1678-1712', description: 'Collection of stone houses with Dutch doors' },
    { name: 'Bronck House Museum', location: 'Coxsackie, New York', year: '1663', description: 'Early Dutch Colonial home with period Dutch doors' },
  ],

  confusionPairs: [
    {
      elementId: 'double-door',
      reason: 'Both involve two sections',
      distinction: 'Dutch doors divide horizontally; double doors are two vertical panels opening from center',
    },
    {
      elementId: 'stable-door',
      reason: 'Stable door is another name for Dutch door',
      distinction: 'These are the same element; "stable door" emphasizes agricultural use',
    },
  ],

  searchTags: ['door', 'split', 'Dutch', 'half', 'stable', 'colonial', 'farmhouse', 'divided', 'horizontal', 'ventilation'],

  arMetadata: {
    modelPath: '/models/architecture/dutch-door.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Upper Half', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Horizontal Division', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Lower Half', position: { x: 0, y: 0.25, z: 0 } },
      { label: 'Connecting Bolt', position: { x: 0.35, y: 0.5, z: 0.05 } },
      { label: 'Upper Hinge', position: { x: -0.4, y: 0.7, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
