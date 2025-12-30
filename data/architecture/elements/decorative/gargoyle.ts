import type { ArchitecturalElement } from '../../types';

export const GARGOYLE: ArchitecturalElement = {
  id: 'gargoyle',
  slug: 'gargoyle',
  name: 'Gargoyle',
  alternativeNames: ['Water Spout', 'Grotesque Water Spout', 'Rain Spout'],
  pronunciation: {
    phonetic: 'GAR-goyl',
    language: 'English',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'Throat or gullet',
    rootWord: 'Gargouille (throat), from Latin gurgulio (gullet)',
  },
  category: 'DECORATIVE',
  subcategory: 'gothic_elements',
  periods: ['ROMANESQUE', 'GOTHIC', 'GOTHIC_REVIVAL'],
  regions: ['WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/gargoyle-primary.jpg',
    gallery: [
      '/images/architecture/elements/gargoyle-notre-dame.jpg',
      '/images/architecture/elements/gargoyle-variety.jpg',
    ],
    diagram: '/images/architecture/diagrams/gargoyle-function.svg',
  },

  description: {
    ELEMENTARY: 'A gargoyle is a water spout carved to look like a scary monster or animal. It sticks out from the side of a building (usually a church) and when it rains, water pours out of its mouth! Medieval builders made them look frightening and funny to scare away evil spirits and entertain people.',
    MIDDLE_SCHOOL: 'Gargoyles are decorative water spouts designed to carry rainwater away from building walls, typically carved as grotesque creatures - dragons, demons, animals, or hybrid beasts. They project from roof gutters so water exits through their mouths, preventing wall damage. While serving a practical drainage function, gargoyles were also believed to ward off evil. They\'re most associated with Gothic cathedrals from the 12th-16th centuries.',
    HIGH_SCHOOL: 'Gargoyles represent the functional-decorative synthesis characteristic of Gothic architecture. Technically, they are waterspouts with channels carved through their bodies to direct roof runoff away from masonry walls and foundations. The term strictly applies only to water-spouting figures; purely decorative creatures are "grotesques." Gargoyle imagery typically features fantastic creatures combining human, animal, and monstrous elements. Their apotropaic (evil-averting) function complemented practical drainage, embodying medieval beliefs about spiritual protection.',
    UNDERGRADUATE: 'The gargoyle exemplifies Gothic architecture\'s integration of utilitarian and symbolic functions. As drainage elements, gargoyles solved the practical problem of water management on buildings with large roof areas and stone walls vulnerable to moisture damage. The typical gargoyle includes an internal channel beginning at the gutter and exiting through the mouth, projecting water clear of the wall. The iconographic program often reflects contemporary theological concepts of the demonic and monstrous, though many gargoyles also display humor and satire, possibly reflecting craftsmen\'s creative license.',
    GRADUATE: 'Scholarly analysis of gargoyles addresses technical, iconographic, and social dimensions. Structural examination reveals sophisticated understanding of water flow and load distribution - gargoyles often cantilever significant distances requiring careful counterbalancing. Iconographic studies explore the theological justification for grotesque imagery on sacred buildings, drawing on medieval bestiaries, demon catalogues, and marginal manuscript illuminations. Social historical research examines gargoyles as expressions of craftsmen culture, potentially subverting official iconographic programs with satirical or profane imagery. Conservation challenges include stone deterioration, particularly in industrial environments, and debates over replacement versus preservation.',
    PHD: 'The gargoyle presents rich interdisciplinary research opportunities spanning architectural technology, medieval theology, art history, and cultural studies. Technical questions include hydraulic design principles, stone selection for weather resistance, and armature systems for complex projecting forms. Iconographic research addresses the theological paradox of grotesque imagery on churches, examining theories from apotropaic protection to pedagogical exempla of sin. Contemporary scholarship employs digital documentation to study gargoyle populations across buildings and regions, revealing workshop practices and stylistic evolution. Conservation science investigates deterioration mechanisms, traditional repair techniques, and appropriate replacement strategies. Theoretical work addresses gargoyles\' liminal status - occupying building margins and mixing sacred/profane, human/animal categories.',
  },

  history: {
    ELEMENTARY: 'People have been putting decorative spouts on buildings for thousands of years, but gargoyles became really popular in medieval Europe about 800-600 years ago. French churches, especially Notre-Dame Cathedral in Paris, had hundreds of scary gargoyles watching over the city. When it rained, water would pour out of all their mouths like they were spitting!',
    MIDDLE_SCHOOL: 'Ancient civilizations including Greeks, Romans, and Egyptians used animal-shaped water spouts, but the gargoyle as we know it developed in medieval Europe during the Romanesque (11th-12th centuries) and especially Gothic periods (12th-16th centuries). French Gothic cathedrals like Notre-Dame de Paris and Notre-Dame de Reims featured elaborate gargoyle programs. The tradition declined after the medieval period but was revived in the 19th-century Gothic Revival movement.',
    HIGH_SCHOOL: 'Water spout technology dates to ancient civilizations - Greek temples featured lion-head spouts, while Roman buildings used elaborate drainage systems. The medieval gargoyle emerged around the 11th century in Romanesque architecture, becoming increasingly elaborate during the Gothic period (c. 1150-1500). French Gothic cathedrals pioneered sophisticated gargoyle programs integrating drainage with theological iconography. The Renaissance generally rejected grotesque imagery, but Gothic Revival architects of the 1800s enthusiastically revived gargoyles, often creating more fantastical designs than medieval predecessors.',
    UNDERGRADUATE: 'The gargoyle\'s development from utilitarian spout to elaborate sculptural form reflects broader medieval architectural evolution. Early medieval buildings often used simple projecting stone channels. By the 12th century, Romanesque builders began shaping spouts as animals or monsters. The 13th-century Gothic style, with its extensive lead roofing and complex drainage requirements, saw the gargoyle flourish. Notre-Dame de Paris (begun 1163) featured an extensive gargoyle program restored and augmented by Viollet-le-Duc in the 19th century. Regional variations emerged - French gargoyles differ from English or German examples in form and iconography. The Protestant Reformation\'s rejection of elaborate church decoration contributed to the gargoyle\'s decline.',
    GRADUATE: 'Gargoyle historiography addresses multiple interpretive frameworks. Archaeological and architectural historical research documents gargoyle evolution from simple spouts to complex sculptures, examining regional variations and workshop practices. Art historical analysis interprets iconographic programs within medieval theological and cultural contexts, drawing on bestiaries, demon catalogues, and sermon literature. Recent scholarship challenges earlier assumptions about universal apotropaic meanings, suggesting diverse functions including satire, entertainment, and local reference. The 19th-century Gothic Revival\'s gargoyle enthusiasm created interpretive challenges - Viollet-le-Duc\'s Notre-Dame restorations included new gargoyles in "medieval" style, complicating authenticity questions. Conservation research addresses deterioration patterns specific to exposed, projecting elements.',
    PHD: 'Gargoyle research intersects multiple scholarly domains. Technical analysis employs hydraulic modeling to understand medieval drainage systems and structural analysis to examine cantilevering techniques. Iconographic research continues to debate theological meanings, with recent work challenging simplistic apotropaic interpretations and exploring gargoyles as expressions of marginal voices within official religious contexts. Comparative studies examine gargoyles across European regions, illuminating trade in ideas and craftsmen. Digital humanities approaches employ photogrammetry and 3D modeling to document endangered gargoyles and analyze stylistic relationships across large datasets. Theoretical work explores gargoyles through frameworks including the monstrous, the grotesque, and the carnivalesque. Contemporary reception studies examine gargoyle mythology in popular culture, from medieval legends to modern fantasy.',
  },

  characteristics: [
    'Projects outward from building walls',
    'Contains internal water channel',
    'Water exits through mouth opening',
    'Typically carved as grotesque creatures',
    'Found primarily on Gothic buildings',
    'Serves both functional and decorative purposes',
  ],

  famousExamples: [
    { name: 'Notre-Dame de Paris', location: 'Paris, France', year: '1163-1345 (restored 1845-1864)', description: 'Iconic gargoyles including the famous "Stryga" chimera' },
    { name: 'Notre-Dame de Reims', location: 'Reims, France', year: '1211-1427', description: 'Elaborate gargoyle program on Gothic cathedral' },
    { name: 'Canterbury Cathedral', location: 'Canterbury, England', year: '1070-1834', description: 'Medieval and Victorian gargoyles' },
    { name: 'Washington National Cathedral', location: 'Washington D.C., USA', year: '1907-1990', description: 'Gothic Revival gargoyles including Darth Vader' },
    { name: 'Basilica del Voto Nacional', location: 'Quito, Ecuador', year: '1892-present', description: 'Neo-Gothic gargoyles featuring native animals' },
  ],

  confusionPairs: [
    {
      elementId: 'grotesque',
      reason: 'Both are carved monsters on Gothic buildings',
      distinction: 'Gargoyles are functional water spouts with channels; grotesques are purely decorative sculptures',
    },
    {
      elementId: 'chimera',
      reason: 'Terms sometimes used interchangeably',
      distinction: 'Gargoyles specifically drain water; chimera/grotesques are decorative only',
    },
  ],

  searchTags: ['gothic', 'water spout', 'monster', 'sculpture', 'medieval', 'drainage', 'cathedral', 'gargoyle', 'creature', 'projection'],

  arMetadata: {
    modelPath: '/models/architecture/gargoyle.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Water Channel', position: { x: 0, y: 0, z: 0.1 } },
      { label: 'Mouth Opening', position: { x: 0, y: 0.05, z: 0.2 } },
      { label: 'Mounting Block', position: { x: 0, y: 0, z: -0.1 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
