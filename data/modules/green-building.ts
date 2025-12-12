// Green Building Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const greenBuildingModules: Module[] = [
  // Module 1: Passive Solar Design
  {
    id: 'green-passive-solar',
    slug: 'passive-solar-design',
    title: 'Passive Solar Design',
    description: {
      ELEMENTARY: 'Build houses that stay warm in winter and cool in summer using just the sun!',
      MIDDLE_SCHOOL: 'Learn how buildings can use sunlight for heating and cooling without machines.',
      HIGH_SCHOOL: 'Understand passive solar design principles, thermal mass, and natural ventilation.',
      UNDERGRADUATE: 'Analyze passive solar systems, heat transfer, and building energy modeling.',
      GRADUATE: 'Evaluate advanced passive strategies, climate-responsive design, and performance optimization.',
      PHD: 'Research building physics, thermal comfort modeling, and next-generation passive technologies.'
    },
    topic: 'green-building',
    category: 'PASSIVE DESIGN',
    icon: 'Sun',
    color: 'ocean',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 40, HIGH_SCHOOL: 55, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'passive-lesson-1',
        title: 'Buildings and the Sun',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>☀️ Sun-Powered Houses!</h2><div class="intro"><p>Did you know houses can stay warm using just sunshine? No heater needed!</p></div><h3>How It Works</h3><div class="steps"><div class="step"><span>🪟</span><p>Big windows face the sun</p></div><div class="step"><span>🧱</span><p>Thick walls store the warmth</p></div><div class="step"><span>🏠</span><p>The house stays cozy!</p></div></div><div class="fun-fact"><p>In summer, a roof overhang blocks the high sun to keep the house cool!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Passive Solar Basics</h2><h3>Key Principles</h3><ul><li><strong>Orientation:</strong> Main windows face south (Northern Hemisphere)</li><li><strong>Glazing:</strong> Large south windows, fewer on north</li><li><strong>Thermal mass:</strong> Heavy materials store heat</li><li><strong>Insulation:</strong> Keeps heat in (winter) or out (summer)</li><li><strong>Shading:</strong> Overhangs block summer sun</li></ul><h3>Sun Angles</h3><p>The sun is low in winter (more light enters) and high in summer (shading works).</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Passive Solar Engineering</h2><h3>Direct Gain Systems</h3><p>Sunlight enters through windows and heats floor/wall mass directly.</p><h3>Indirect Gain</h3><ul><li><strong>Trombe wall:</strong> Mass wall behind glazing</li><li><strong>Sunspace:</strong> Attached greenhouse space</li><li><strong>Water wall:</strong> Water containers for thermal storage</li></ul><h3>Design Calculations</h3><ul><li>Solar heat gain: Q = I × A × SHGC × τ</li><li>Thermal mass sizing: m × c × ΔT = Q_stored</li><li>Heat loss: Q = U × A × ΔT</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Building Energy Analysis</h2><h3>Heat Transfer Modes</h3><ul><li>Conduction through envelope</li><li>Convection (air movement)</li><li>Radiation (solar, infrared)</li></ul><h3>Energy Balance</h3><p>Q_gains = Q_losses at equilibrium:</p><ul><li>Solar gains + Internal gains = Envelope losses + Ventilation losses</li></ul><h3>Modeling Tools</h3><ul><li>EnergyPlus</li><li>PHPP (Passive House Planning Package)</li><li>DesignBuilder</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Passive Strategies</h2><h3>Climate-Responsive Design</h3><p>Strategies vary by climate zone:</p><ul><li>Heating-dominated: Maximize solar gain, minimize losses</li><li>Cooling-dominated: Minimize gain, maximize ventilation</li><li>Mixed: Seasonal strategies needed</li></ul><h3>Natural Ventilation</h3><ul><li>Cross ventilation</li><li>Stack effect</li><li>Night cooling</li></ul><h3>Daylighting Integration</h3><p>Balancing light, heat, and glare.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Building Physics Research</h2><h3>Advanced Modeling</h3><ul><li>CFD for airflow</li><li>Coupled thermal-airflow models</li><li>Occupant behavior integration</li></ul><h3>Emerging Technologies</h3><ul><li>Thermochromic glazing</li><li>Phase change materials</li><li>Dynamic insulation</li></ul><h3>Comfort Research</h3><ul><li>Adaptive comfort models</li><li>Local thermal comfort</li><li>Non-energy benefits</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'passive-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Design a Sun House!',
          MIDDLE_SCHOOL: 'Orient Your Building',
          HIGH_SCHOOL: 'Optimize Window Placement',
          UNDERGRADUATE: 'Energy Balance Model',
          GRADUATE: 'Climate Optimization',
          PHD: 'Parametric Analysis'
        },
        description: {
          ELEMENTARY: 'Place windows and walls to keep your house warm!',
          MIDDLE_SCHOOL: 'Rotate and design a building for best solar orientation.',
          HIGH_SCHOOL: 'Size and place windows to optimize heating and cooling.',
          UNDERGRADUATE: 'Model annual energy balance of a passive solar building.',
          GRADUATE: 'Optimize passive design for different climate zones.',
          PHD: 'Run parametric simulations to identify optimal design solutions.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 8 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 15 },
          GRADUATE: { complexity: 'expert', variables: 22 },
          PHD: { complexity: 'research', variables: 30 }
        }
      }
    ],
    game: {
      id: 'passive-game',
      type: 'puzzle',
      title: 'Solar House Designer',
      description: 'Design the perfect passive solar home!',
      rounds: 5,
      timeLimit: 40,
      difficultyByLevel: {
        ELEMENTARY: 'easy',
        MIDDLE_SCHOOL: 'easy',
        HIGH_SCHOOL: 'medium',
        UNDERGRADUATE: 'medium',
        GRADUATE: 'hard',
        PHD: 'expert'
      }
    },
    quiz: {
      id: 'passive-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'pq1',
          question: {
            ELEMENTARY: 'Which direction should big windows face to get sun in winter?',
            MIDDLE_SCHOOL: 'What is thermal mass?',
            HIGH_SCHOOL: 'What does a Trombe wall do?',
            UNDERGRADUATE: 'What software is commonly used for building energy simulation?',
            GRADUATE: 'What passive strategy works best in hot-humid climates?',
            PHD: 'What emerging technology enables dynamic control of solar heat gain?'
          },
          options: {
            ELEMENTARY: ['South', 'North', 'Down', 'Up'],
            MIDDLE_SCHOOL: ['Heavy materials that store heat', 'Light curtains', 'Thin walls', 'Open windows'],
            HIGH_SCHOOL: ['Absorbs and releases solar heat slowly', 'Blocks all light', 'Only works in summer', 'Creates electricity'],
            UNDERGRADUATE: ['EnergyPlus', 'Microsoft Word', 'Photoshop', 'Excel'],
            GRADUATE: ['Natural ventilation and shading', 'Maximum solar gain', 'No windows', 'Heavy thermal mass'],
            PHD: ['Thermochromic/electrochromic glazing', 'Standard double glazing', 'Brick walls', 'Ceiling fans']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'In the Northern Hemisphere, big windows facing south get the most winter sun!',
            MIDDLE_SCHOOL: 'Thermal mass is heavy materials like concrete or brick that store heat and release it slowly.',
            HIGH_SCHOOL: 'A Trombe wall is a south-facing mass wall that absorbs solar heat and releases it into the building.',
            UNDERGRADUATE: 'EnergyPlus is the DOE\'s flagship building energy simulation engine.',
            GRADUATE: 'Hot-humid climates need ventilation and shading more than thermal mass.',
            PHD: 'Thermochromic and electrochromic glazing can dynamically change their solar heat gain properties.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Passive House Institute', url: 'https://passivehouse.com/', type: 'research' },
      { title: 'DOE Building Technologies Office', url: 'https://www.energy.gov/eere/buildings', type: 'article' }
    ]
  },
  // Module 2: Sustainable Building Materials
  {
    id: 'green-materials',
    slug: 'sustainable-materials',
    title: 'Sustainable Building Materials',
    description: {
      ELEMENTARY: 'Discover amazing materials for building - from bamboo to recycled bottles!',
      MIDDLE_SCHOOL: 'Learn about eco-friendly building materials and why they matter.',
      HIGH_SCHOOL: 'Understand embodied carbon, material lifecycle, and sustainable alternatives.',
      UNDERGRADUATE: 'Analyze material selection, LCA, and specification for green buildings.',
      GRADUATE: 'Evaluate advanced materials, circular construction, and decarbonization pathways.',
      PHD: 'Research novel bio-based materials, carbon storage, and material innovation.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Layers',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'materials-lesson-1',
        title: 'Building with Nature',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🏗️ Cool Building Stuff!</h2><h3>Natural Materials</h3><div class="material-cards"><div class="card"><span>🎋</span><h4>Bamboo</h4><p>Super strong grass!</p></div><div class="card"><span>🌾</span><h4>Straw</h4><p>Makes warm walls!</p></div><div class="card"><span>🪵</span><h4>Wood</h4><p>From trees we plant!</p></div><div class="card"><span>🧱</span><h4>Earth</h4><p>Mud bricks are ancient!</p></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Sustainable Material Options</h2><h3>Natural Materials</h3><ul><li><strong>Wood:</strong> Renewable, stores carbon, low embodied energy</li><li><strong>Bamboo:</strong> Fast-growing, strong, versatile</li><li><strong>Straw bale:</strong> Agricultural waste, excellent insulation</li><li><strong>Adobe/rammed earth:</strong> Local, low-energy, thermal mass</li></ul><h3>Recycled Materials</h3><ul><li>Recycled steel and aluminum</li><li>Recycled plastic lumber</li><li>Fly ash concrete</li><li>Reclaimed wood</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Material Life Cycle</h2><h3>Embodied Carbon</h3><p>The carbon emissions from extracting, manufacturing, transporting, and installing materials:</p><table><tr><th>Material</th><th>kgCO₂e/kg</th></tr><tr><td>Concrete</td><td>0.1-0.2</td></tr><tr><td>Steel</td><td>1.5-2.0</td></tr><tr><td>Aluminum</td><td>8-12</td></tr><tr><td>Timber</td><td>-1 to +0.5*</td></tr></table><p>*Timber can be carbon-negative when sustainably sourced.</p><h3>Operational vs Embodied</h3><p>As buildings become more efficient, embodied carbon becomes a larger share of lifetime emissions.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Material Selection and LCA</h2><h3>Life Cycle Assessment</h3><p>Cradle-to-grave analysis:</p><ul><li>Raw material extraction (A1)</li><li>Manufacturing (A2-A3)</li><li>Construction (A4-A5)</li><li>Use phase (B1-B7)</li><li>End of life (C1-C4)</li><li>Beyond building life (D)</li></ul><h3>EPDs (Environmental Product Declarations)</h3><p>Standardized reporting of environmental impacts for comparison.</p><h3>Selection Criteria</h3><ul><li>Performance requirements</li><li>Environmental impacts</li><li>Cost and availability</li><li>Durability and maintenance</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Decarbonizing Construction</h2><h3>Material Decarbonization Pathways</h3><ul><li><strong>Concrete:</strong> SCMs, alternative cements, carbon cure</li><li><strong>Steel:</strong> Electric arc furnace, green hydrogen</li><li><strong>Mass timber:</strong> CLT, glulam for structural applications</li></ul><h3>Circular Construction</h3><ul><li>Design for disassembly</li><li>Material passports</li><li>Reuse and recycling</li></ul><h3>Biogenic Carbon</h3><p>Accounting for carbon stored in bio-based materials.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Material Innovation Research</h2><h3>Novel Bio-Based Materials</h3><ul><li>Mycelium composites</li><li>Hempcrete and other plant fibers</li><li>Algae-based materials</li></ul><h3>Carbon-Negative Construction</h3><ul><li>Biochar concrete additives</li><li>Enhanced weathering</li><li>Carbon mineralization</li></ul><h3>Research Questions</h3><ul><li>Scaling challenges</li><li>Performance verification</li><li>Standards development</li><li>Market transformation</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'materials-activity-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Match Materials to Uses!',
          MIDDLE_SCHOOL: 'Build with Green Materials',
          HIGH_SCHOOL: 'Compare Embodied Carbon',
          UNDERGRADUATE: 'Material Selection Matrix',
          GRADUATE: 'LCA Comparison',
          PHD: 'Innovation Assessment'
        },
        description: {
          ELEMENTARY: 'Drag eco-friendly materials to the right building parts!',
          MIDDLE_SCHOOL: 'Select sustainable materials for different building elements.',
          HIGH_SCHOOL: 'Compare materials based on their embodied carbon.',
          UNDERGRADUATE: 'Create a material selection matrix balancing multiple criteria.',
          GRADUATE: 'Compare full life cycle impacts of material options.',
          PHD: 'Assess emerging materials for potential and barriers.'
        },
        config: {
          ELEMENTARY: { items: 8, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 10, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 },
          GRADUATE: { items: 18, hints: false, timeLimit: 90 },
          PHD: { items: 22, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'materials-game',
      type: 'matching',
      title: 'Material Match',
      description: 'Match materials with their properties and impacts!',
      rounds: 5,
      timeLimit: 30,
      difficultyByLevel: {
        ELEMENTARY: 'easy',
        MIDDLE_SCHOOL: 'easy',
        HIGH_SCHOOL: 'medium',
        UNDERGRADUATE: 'medium',
        GRADUATE: 'hard',
        PHD: 'expert'
      }
    },
    quiz: {
      id: 'materials-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mq1',
          question: {
            ELEMENTARY: 'Which material comes from tall grass?',
            MIDDLE_SCHOOL: 'Why is wood considered a sustainable material?',
            HIGH_SCHOOL: 'Which material has the highest embodied carbon per kg?',
            UNDERGRADUATE: 'What document provides standardized environmental data for materials?',
            GRADUATE: 'What is the primary decarbonization pathway for steel production?',
            PHD: 'What novel bio-based material uses fungal growth?'
          },
          options: {
            ELEMENTARY: ['Bamboo', 'Steel', 'Glass', 'Plastic'],
            MIDDLE_SCHOOL: ['It is renewable and stores carbon', 'It is heaviest', 'It comes from mines', 'It is cheapest'],
            HIGH_SCHOOL: ['Aluminum', 'Concrete', 'Wood', 'Brick'],
            UNDERGRADUATE: ['Environmental Product Declaration (EPD)', 'Material Safety Data Sheet', 'Building permit', 'User manual'],
            GRADUATE: ['Electric arc furnace with renewable electricity', 'More coal', 'Larger blast furnaces', 'Offshore production'],
            PHD: ['Mycelium composites', 'Concrete additives', 'Steel alloys', 'Plastic films']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Bamboo is actually a type of grass - the fastest-growing plant on Earth!',
            MIDDLE_SCHOOL: 'Wood is renewable (trees can be replanted) and stores carbon from the atmosphere.',
            HIGH_SCHOOL: 'Aluminum has very high embodied carbon (8-12 kgCO₂e/kg) due to energy-intensive smelting.',
            UNDERGRADUATE: 'EPDs (Environmental Product Declarations) provide standardized, third-party verified environmental data.',
            GRADUATE: 'Electric arc furnaces using renewable electricity and scrap steel can dramatically reduce emissions.',
            PHD: 'Mycelium composites use fungal root networks grown on agricultural waste.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Carbon Leadership Forum', url: 'https://carbonleadershipforum.org/', type: 'research' },
      { title: 'Building Transparency EC3', url: 'https://buildingtransparency.org/', type: 'tool' }
    ]
  },
  // MASTERCLASS: Complete Green Building Design
  {
    id: 'green-masterclass',
    slug: 'green-building-masterclass',
    title: 'Green Building Design Masterclass',
    description: {
      ELEMENTARY: 'Design the ultimate eco-friendly building from the ground up!',
      MIDDLE_SCHOOL: 'Master all aspects of green building from energy to materials.',
      HIGH_SCHOOL: 'Comprehensive guide to sustainable building design and certification.',
      UNDERGRADUATE: 'Advanced integrated design process for high-performance buildings.',
      GRADUATE: 'Expert-level whole-building optimization and performance verification.',
      PHD: 'Research synthesis of building science, design integration, and performance gaps.'
    },
    topic: 'green-building',
    category: 'MASTERCLASS',
    icon: 'Award',
    color: 'ocean',
    duration: { ELEMENTARY: 45, MIDDLE_SCHOOL: 60, HIGH_SCHOOL: 90, UNDERGRADUATE: 120, GRADUATE: 150, PHD: 180 },
    isMasterclass: true,
    hasVideo: true,
    lessons: [
      {
        id: 'master-gb-1',
        title: 'Integrated Green Design',
        order: 1,
        duration: 25,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🏢 Design Your Dream Green Building!</h2><h3>What Makes a Building Green?</h3><ul><li>☀️ Uses sunshine for light and warmth</li><li>💧 Saves water</li><li>♻️ Made from eco-friendly stuff</li><li>🌱 Has plants inside and outside</li><li>⚡ Uses very little energy</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Green Building Systems</h2><h3>Key Systems</h3><ul><li><strong>Energy:</strong> Efficient HVAC, lighting, renewables</li><li><strong>Water:</strong> Low-flow fixtures, rainwater, greywater</li><li><strong>Materials:</strong> Sustainable, recycled, local</li><li><strong>Indoor Quality:</strong> Air, light, comfort</li><li><strong>Site:</strong> Location, landscape, transport</li></ul><h3>Certification Systems</h3><ul><li>LEED (most common)</li><li>Passive House (energy-focused)</li><li>Living Building Challenge (most ambitious)</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Integrated Design Process</h2><h3>Whole Building Approach</h3><p>All systems interact - optimize the whole, not just parts:</p><ul><li>Better envelope → smaller HVAC</li><li>Daylighting → less electric lighting → less cooling</li><li>Thermal mass + natural ventilation → passive comfort</li></ul><h3>Design Process</h3><ol><li>Set performance targets</li><li>Charrette with all disciplines</li><li>Energy modeling early and often</li><li>Iterate and optimize</li><li>Commissioning and verification</li></ol></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>High-Performance Building Design</h2><h3>Performance Targets</h3><ul><li>Net zero energy</li><li>Net zero carbon</li><li>Net zero water</li><li>Net positive (regenerative)</li></ul><h3>Energy Modeling</h3><p>Parametric analysis to optimize:</p><ul><li>Envelope (R-values, glazing ratios)</li><li>Systems (efficiency, controls)</li><li>Renewables (PV sizing)</li></ul><h3>Commissioning</h3><p>Verification that systems perform as designed.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Building Performance</h2><h3>Performance Gap</h3><p>Measured performance often differs from modeled:</p><ul><li>Occupant behavior</li><li>Construction quality</li><li>Controls and operations</li><li>Model assumptions</li></ul><h3>Measurement and Verification</h3><ul><li>Sub-metering</li><li>Fault detection</li><li>Continuous commissioning</li></ul><h3>Occupant Engagement</h3><p>Feedback systems, dashboards, behavioral programs.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Building Performance Research</h2><h3>Performance Gap Studies</h3><ul><li>Quantifying discrepancies</li><li>Root cause analysis</li><li>Improvement strategies</li></ul><h3>Building-Grid Integration</h3><ul><li>Demand response</li><li>Thermal storage</li><li>Vehicle-to-building</li></ul><h3>Regenerative Design</h3><ul><li>Net positive frameworks</li><li>Ecosystem services</li><li>Biophilic design research</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'master-gb-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Green Building!',
          MIDDLE_SCHOOL: 'Earn LEED Points',
          HIGH_SCHOOL: 'Design to Target',
          UNDERGRADUATE: 'Net Zero Designer',
          GRADUATE: 'Performance Optimizer',
          PHD: 'Regenerative Building Model'
        },
        description: {
          ELEMENTARY: 'Add eco-friendly features to make the greenest building!',
          MIDDLE_SCHOOL: 'Make design choices to earn green building certification.',
          HIGH_SCHOOL: 'Design a building to meet energy performance targets.',
          UNDERGRADUATE: 'Design a net zero energy building.',
          GRADUATE: 'Optimize building systems to close performance gaps.',
          PHD: 'Model a regenerative, net-positive building.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 5 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 10 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 15 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 25 },
          GRADUATE: { complexity: 'expert', variables: 35 },
          PHD: { complexity: 'research', variables: 50 }
        }
      }
    ],
    game: {
      id: 'master-gb-game',
      type: 'timed_challenge',
      title: 'Green Building Master Challenge',
      description: 'Test your comprehensive green building knowledge!',
      rounds: 10,
      timeLimit: 20,
      difficultyByLevel: {
        ELEMENTARY: 'easy',
        MIDDLE_SCHOOL: 'medium',
        HIGH_SCHOOL: 'medium',
        UNDERGRADUATE: 'hard',
        GRADUATE: 'hard',
        PHD: 'expert'
      }
    },
    quiz: {
      id: 'master-gb-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mgbq1',
          question: {
            ELEMENTARY: 'What kind of building uses very little energy?',
            MIDDLE_SCHOOL: 'What is the most common green building certification?',
            HIGH_SCHOOL: 'What is the benefit of an integrated design process?',
            UNDERGRADUATE: 'What does net zero energy mean?',
            GRADUATE: 'What is the "performance gap" in buildings?',
            PHD: 'What characterizes regenerative building design?'
          },
          options: {
            ELEMENTARY: ['A green building', 'A black building', 'A tall building', 'An old building'],
            MIDDLE_SCHOOL: ['LEED', 'SPEED', 'NEED', 'FEED'],
            HIGH_SCHOOL: ['Optimizes whole system, not just parts', 'Only architects are involved', 'No need for energy modeling', 'Slower and more expensive'],
            UNDERGRADUATE: ['Building produces as much energy as it uses annually', 'Building uses no electricity', 'Building has no windows', 'Building is made of metal'],
            GRADUATE: ['Difference between modeled and actual performance', 'Gap in building envelope', 'Space between buildings', 'Construction delay'],
            PHD: ['Net positive impact on environment and community', 'Carbon neutral', 'Energy efficient', 'LEED certified']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Green buildings are designed to use very little energy and help the planet!',
            MIDDLE_SCHOOL: 'LEED (Leadership in Energy and Environmental Design) is the most widely used certification.',
            HIGH_SCHOOL: 'Integrated design optimizes the whole building as a system, finding synergies between elements.',
            UNDERGRADUATE: 'Net zero energy buildings produce (usually via renewables) as much energy as they consume annually.',
            GRADUATE: 'The performance gap is the often-significant difference between predicted and measured energy use.',
            PHD: 'Regenerative design goes beyond net zero to create net positive impacts on ecosystems and communities.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'US Green Building Council', url: 'https://www.usgbc.org/', type: 'research' },
      { title: 'Living Building Challenge', url: 'https://living-future.org/lbc/', type: 'article' }
    ]
  },
  // Module 4: Sustainable Materials
  {
    id: 'green-materials',
    slug: 'sustainable-materials',
    title: 'Sustainable Materials',
    description: {
      ELEMENTARY: 'Learn about eco-friendly materials for building!',
      MIDDLE_SCHOOL: 'Discover materials that are better for the environment.',
      HIGH_SCHOOL: 'Explore embodied carbon, life cycle assessment, and material selection.',
      UNDERGRADUATE: 'Analyze material LCA, EPDs, and sustainable procurement strategies.',
      GRADUATE: 'Examine circular economy in construction, bio-based materials, and supply chains.',
      PHD: 'Research novel sustainable materials, carbon storage potential, and system-level impacts.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Boxes',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-mat-1', title: 'Building Better', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Earth-Friendly Building!</h2><p>Some building materials are better for our planet - like bamboo, recycled wood, and natural stone!</p>', MIDDLE_SCHOOL: '<h2>Material Choices Matter</h2><p>Every building material takes energy to make and transport. Choosing wisely helps the environment.</p>', HIGH_SCHOOL: '<h2>Embodied Carbon</h2><p>The carbon emitted to manufacture, transport, install, and eventually dispose of materials. Often 20-50% of a building lifecycle carbon.</p>', UNDERGRADUATE: '<h2>Life Cycle Assessment</h2><p>Cradle-to-grave analysis of material environmental impacts. EPDs (Environmental Product Declarations) standardize reporting.</p>', GRADUATE: '<h2>Circular Construction</h2><p>Design for disassembly, material passports, and reuse markets to keep materials in use.</p>', PHD: '<h2>Research Frontiers</h2><p>Bio-based materials, carbon-storing concrete, and system-level material flow modeling.</p>' } }],
    activities: [{ id: 'gb-mat-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Sort the Materials!', MIDDLE_SCHOOL: 'Compare Impacts', HIGH_SCHOOL: 'Calculate Embodied Carbon', UNDERGRADUATE: 'EPD Analysis', GRADUATE: 'Circular Design', PHD: 'LCA Modeling' }, description: { ELEMENTARY: 'Sort materials into eco-friendly and not!', MIDDLE_SCHOOL: 'Compare environmental impacts of different materials.', HIGH_SCHOOL: 'Calculate embodied carbon for a building.', UNDERGRADUATE: 'Analyze EPDs to select materials.', GRADUATE: 'Design for material circularity.', PHD: 'Model system-level material impacts.' }, config: { ELEMENTARY: { items: 8, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 10, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 }, GRADUATE: { items: 18, hints: false, timeLimit: 90 }, PHD: { items: 22, hints: false, timeLimit: 60 } } }],
    game: { id: 'gb-mat-game', type: 'matching', title: 'Material Master', description: 'Choose the best materials for green buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-mat-quiz', passingScore: 80, questions: [{ id: 'gbmq1', question: { ELEMENTARY: 'Which is an eco-friendly building material?', MIDDLE_SCHOOL: 'What does "embodied" mean for materials?', HIGH_SCHOOL: 'What percentage of building carbon is embodied?', UNDERGRADUATE: 'What is an EPD?', GRADUATE: 'What is design for disassembly?', PHD: 'What are bio-based materials?' }, options: { ELEMENTARY: ['Bamboo', 'Plastic', 'Styrofoam', 'Oil'], MIDDLE_SCHOOL: ['Carbon used to make and transport it', 'How it looks', 'Its weight', 'Its color'], HIGH_SCHOOL: ['20-50%', '1-5%', '90-100%', '0%'], UNDERGRADUATE: ['Environmental Product Declaration', 'Energy Power Distribution', 'Electric Product Design', 'None of these'], GRADUATE: ['Designing so buildings can be taken apart for reuse', 'Building to last forever', 'Random construction', 'Using glue everywhere'], PHD: ['Materials derived from biological sources', 'Only metal materials', 'Only concrete', 'Synthetic only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Bamboo grows fast and is a sustainable, eco-friendly building material!', MIDDLE_SCHOOL: 'Embodied carbon is the carbon emissions from making and transporting a material.', HIGH_SCHOOL: 'Embodied carbon typically accounts for 20-50% of a building\'s total lifecycle carbon.', UNDERGRADUATE: 'EPDs (Environmental Product Declarations) standardize environmental impact reporting for materials.', GRADUATE: 'Design for disassembly allows buildings to be taken apart so materials can be reused.', PHD: 'Bio-based materials are derived from biological sources like wood, bamboo, or hemp.' } }] },
    externalResources: [{ title: 'Building Transparency', url: 'https://www.buildingtransparency.org/', type: 'research' }]
  },
  // Module 5: Water Efficient Buildings
  {
    id: 'green-water',
    slug: 'water-efficient-buildings',
    title: 'Water Efficient Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings can save water!',
      MIDDLE_SCHOOL: 'Discover fixtures and systems that use less water.',
      HIGH_SCHOOL: 'Explore water-efficient technologies, rainwater harvesting, and greywater reuse.',
      UNDERGRADUATE: 'Analyze water balance, net-zero water strategies, and system integration.',
      GRADUATE: 'Examine water-energy nexus, regulatory frameworks, and building-scale treatment.',
      PHD: 'Research integrated water management, emerging technologies, and resilience.'
    },
    topic: 'green-building',
    category: 'WATER',
    icon: 'Droplets',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-water-1', title: 'Saving Every Drop', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water-Smart Buildings!</h2><p>Buildings can save water with special toilets, faucets, and by collecting rain!</p>', MIDDLE_SCHOOL: '<h2>Water Efficiency</h2><p>Low-flow fixtures, efficient appliances, and smart irrigation can cut water use by 30-50%.</p>', HIGH_SCHOOL: '<h2>Water Systems</h2><p>Rainwater harvesting, greywater reuse, and on-site treatment can dramatically reduce municipal water demand.</p>', UNDERGRADUATE: '<h2>Net Zero Water</h2><p>Buildings that capture, treat, and reuse water to eliminate net water withdrawal from offsite.</p>', GRADUATE: '<h2>Water-Energy Nexus</h2><p>Water and energy are interconnected. Saving water saves energy; efficient treatment saves both.</p>', PHD: '<h2>Research Frontiers</h2><p>Building-scale water treatment, atmospheric water harvesting, and climate resilience.</p>' } }],
    activities: [{ id: 'gb-water-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fix the Leaks!', MIDDLE_SCHOOL: 'Water Audit', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Water Balance', GRADUATE: 'Integrated Design', PHD: 'Resilience Modeling' }, description: { ELEMENTARY: 'Find and fix water waste in a building!', MIDDLE_SCHOOL: 'Conduct a water audit of a building.', HIGH_SCHOOL: 'Design rainwater and greywater systems.', UNDERGRADUATE: 'Create a building water balance.', GRADUATE: 'Design an integrated water-energy system.', PHD: 'Model water system resilience.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-water-game', type: 'puzzle', title: 'Water Saver', description: 'Design water-efficient buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-water-quiz', passingScore: 80, questions: [{ id: 'gbwq1', question: { ELEMENTARY: 'How can buildings save water?', MIDDLE_SCHOOL: 'How much can efficient fixtures save?', HIGH_SCHOOL: 'What is greywater?', UNDERGRADUATE: 'What is net zero water?', GRADUATE: 'How are water and energy connected?', PHD: 'What is atmospheric water harvesting?' }, options: { ELEMENTARY: ['Low-flow toilets and faucets', 'Running water constantly', 'Bigger pipes', 'More faucets'], MIDDLE_SCHOOL: ['30-50%', '5%', '90%', '0%'], HIGH_SCHOOL: ['Water from sinks and showers', 'Toilet water', 'Drinking water', 'Rain water'], UNDERGRADUATE: ['No net withdrawal from offsite sources', 'Using only municipal water', 'Maximum water use', 'No water at all'], GRADUATE: ['Treating and moving water requires energy', 'No connection', 'Water makes electricity', 'Energy makes water'], PHD: ['Capturing water from humid air', 'Collecting rain', 'Well water', 'Ocean water'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Low-flow toilets and faucets use much less water than regular ones!', MIDDLE_SCHOOL: 'Efficient fixtures and appliances can reduce water use by 30-50%.', HIGH_SCHOOL: 'Greywater is relatively clean wastewater from sinks, showers, and laundry.', UNDERGRADUATE: 'Net zero water buildings capture and treat enough water to eliminate net withdrawal.', GRADUATE: 'Water and energy are interconnected - pumping, heating, and treating water requires significant energy.', PHD: 'Atmospheric water harvesting captures water vapor from humid air for drinking water.' } }] },
    externalResources: [{ title: 'Alliance for Water Efficiency', url: 'https://www.allianceforwaterefficiency.org/', type: 'research' }]
  },
  // Module 6: Indoor Air Quality
  {
    id: 'green-iaq',
    slug: 'indoor-air-quality',
    title: 'Indoor Air Quality',
    description: {
      ELEMENTARY: 'Learn why fresh air in buildings is so important!',
      MIDDLE_SCHOOL: 'Discover what makes indoor air healthy or unhealthy.',
      HIGH_SCHOOL: 'Explore ventilation, filtration, and source control strategies.',
      UNDERGRADUATE: 'Analyze IAQ standards, monitoring, and HVAC system design.',
      GRADUATE: 'Examine health impacts, productivity research, and building performance.',
      PHD: 'Research IAQ-health relationships, emerging contaminants, and ventilation optimization.'
    },
    topic: 'green-building',
    category: 'HEALTH',
    icon: 'Wind',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-iaq-1', title: 'Breathing Easy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clean Air Inside!</h2><p>We spend most of our time indoors. Fresh, clean air keeps us healthy and happy!</p>', MIDDLE_SCHOOL: '<h2>What is Indoor Air Quality?</h2><p>IAQ measures how clean and healthy the air inside buildings is. Good ventilation and few pollutants make good IAQ.</p>', HIGH_SCHOOL: '<h2>IAQ Factors</h2><p>Ventilation rates, filtration, source control (low-emitting materials), humidity, and CO2 levels.</p>', UNDERGRADUATE: '<h2>IAQ Engineering</h2><p>ASHRAE standards, ACH rates, filtration (MERV ratings), and demand-controlled ventilation.</p>', GRADUATE: '<h2>Health and Productivity</h2><p>Research shows better IAQ improves cognitive function, reduces illness, and increases productivity.</p>', PHD: '<h2>Research Frontiers</h2><p>Personalized exposure, real-time monitoring networks, and ventilation-infection relationships.</p>' } }],
    activities: [{ id: 'gb-iaq-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fresh Air Hunt!', MIDDLE_SCHOOL: 'Pollutant Detective', HIGH_SCHOOL: 'Ventilation Design', UNDERGRADUATE: 'System Optimization', GRADUATE: 'Health Impact Study', PHD: 'Monitoring Network' }, description: { ELEMENTARY: 'Find ways to bring fresh air into rooms!', MIDDLE_SCHOOL: 'Identify indoor air pollutants and sources.', HIGH_SCHOOL: 'Design ventilation for a building.', UNDERGRADUATE: 'Optimize HVAC for IAQ and energy.', GRADUATE: 'Study IAQ impacts on health and productivity.', PHD: 'Design an IAQ monitoring network.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-iaq-game', type: 'puzzle', title: 'Air Quality Manager', description: 'Keep indoor air clean and healthy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-iaq-quiz', passingScore: 80, questions: [{ id: 'gbiaq1', question: { ELEMENTARY: 'What makes indoor air healthy?', MIDDLE_SCHOOL: 'What is a common indoor air pollutant?', HIGH_SCHOOL: 'What does MERV rate?', UNDERGRADUATE: 'What does ACH stand for?', GRADUATE: 'How does IAQ affect productivity?', PHD: 'What is demand-controlled ventilation?' }, options: { ELEMENTARY: ['Fresh air from outside', 'Keeping windows sealed', 'Using air fresheners', 'Ignoring it'], MIDDLE_SCHOOL: ['Dust and VOCs', 'Only outdoor pollution', 'Nothing - indoor air is clean', 'Pure oxygen'], HIGH_SCHOOL: ['Filter efficiency', 'Air speed', 'Humidity', 'Temperature'], UNDERGRADUATE: ['Air Changes per Hour', 'Air Control Handler', 'Automatic Cooling and Heating', 'None of these'], GRADUATE: ['Better IAQ improves cognitive function', 'No effect', 'Decreases productivity', 'Only affects comfort'], PHD: ['Adjusting ventilation based on occupancy/CO2', 'Fixed ventilation always', 'No ventilation', 'Random adjustment'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Fresh air from outside helps keep indoor air healthy and clean!', MIDDLE_SCHOOL: 'Dust, VOCs (volatile organic compounds), and CO2 are common indoor pollutants.', HIGH_SCHOOL: 'MERV (Minimum Efficiency Reporting Value) rates how well filters capture particles.', UNDERGRADUATE: 'ACH (Air Changes per Hour) measures how many times room air is replaced per hour.', GRADUATE: 'Research shows improved IAQ increases cognitive function and productivity significantly.', PHD: 'Demand-controlled ventilation adjusts airflow based on real-time CO2 or occupancy sensing.' } }] },
    externalResources: [{ title: 'EPA Indoor Air Quality', url: 'https://www.epa.gov/indoor-air-quality-iaq', type: 'research' }]
  },
  // Module 7: Building-Integrated Renewables
  {
    id: 'green-renewables',
    slug: 'building-integrated-renewables',
    title: 'Building-Integrated Renewables',
    description: {
      ELEMENTARY: 'Learn how buildings can make their own energy!',
      MIDDLE_SCHOOL: 'Discover solar panels, wind turbines, and other renewables on buildings.',
      HIGH_SCHOOL: 'Explore BIPV, small wind, and building-scale renewable systems.',
      UNDERGRADUATE: 'Analyze renewable system sizing, integration, and grid connection.',
      GRADUATE: 'Examine net-zero energy buildings, storage integration, and policy incentives.',
      PHD: 'Research advanced BIPV, building-to-grid integration, and optimization.'
    },
    topic: 'green-building',
    category: 'ENERGY',
    icon: 'Sun',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ren-1', title: 'Power from Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Make Energy!</h2><p>Solar panels on roofs can make electricity from sunlight. Some buildings make all the energy they need!</p>', MIDDLE_SCHOOL: '<h2>Renewables on Buildings</h2><p>Rooftop solar is most common. Some buildings also use small wind, solar thermal, or ground-source heat pumps.</p>', HIGH_SCHOOL: '<h2>Building-Integrated PV</h2><p>BIPV replaces conventional materials - solar shingles, facade panels, and solar glass that generate power.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Load matching, sizing for net-zero, inverter selection, and grid interconnection requirements.</p>', GRADUATE: '<h2>Net-Zero Energy</h2><p>Buildings that produce as much energy as they consume annually through efficiency and on-site renewables.</p>', PHD: '<h2>Research Frontiers</h2><p>Advanced BIPV materials, building-grid interaction optimization, and distributed energy systems.</p>' } }],
    activities: [{ id: 'gb-ren-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Add Solar Panels!', MIDDLE_SCHOOL: 'Design a Solar Roof', HIGH_SCHOOL: 'System Sizing', UNDERGRADUATE: 'Grid Integration', GRADUATE: 'Net-Zero Design', PHD: 'Optimization Model' }, description: { ELEMENTARY: 'Add solar panels to power a building!', MIDDLE_SCHOOL: 'Design a rooftop solar system.', HIGH_SCHOOL: 'Size a renewable system for building loads.', UNDERGRADUATE: 'Design grid-connected building renewables.', GRADUATE: 'Design a net-zero energy building.', PHD: 'Optimize building-grid energy flows.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ren-game', type: 'simulation', title: 'Renewable Builder', description: 'Power buildings with renewable energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ren-quiz', passingScore: 80, questions: [{ id: 'gbrq1', question: { ELEMENTARY: 'What do solar panels on buildings do?', MIDDLE_SCHOOL: 'What is the most common building renewable?', HIGH_SCHOOL: 'What is BIPV?', UNDERGRADUATE: 'What is load matching?', GRADUATE: 'What is a net-zero energy building?', PHD: 'What is advanced BIPV?' }, options: { ELEMENTARY: ['Make electricity from sunlight', 'Make the building taller', 'Provide shade only', 'Nothing'], MIDDLE_SCHOOL: ['Rooftop solar PV', 'Nuclear', 'Coal', 'Natural gas'], HIGH_SCHOOL: ['Building-Integrated Photovoltaics', 'Big Industrial Power Vault', 'Building Interior Power View', 'None of these'], UNDERGRADUATE: ['Aligning generation with building demand', 'Maximum output always', 'No connection to load', 'Random generation'], GRADUATE: ['Produces as much energy as it consumes annually', 'Uses no energy', 'Produces maximum energy', 'Uses maximum energy'], PHD: ['Solar materials integrated into building surfaces', 'Larger panels', 'Only rooftop', 'No integration'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar panels convert sunlight into electricity to power the building!', MIDDLE_SCHOOL: 'Rooftop solar PV is by far the most common renewable technology on buildings.', HIGH_SCHOOL: 'BIPV (Building-Integrated Photovoltaics) replaces building materials with power-generating surfaces.', UNDERGRADUATE: 'Load matching aligns renewable generation timing with building electricity demand.', GRADUATE: 'Net-zero energy buildings produce as much energy as they consume over a year.', PHD: 'Advanced BIPV integrates solar cells into facades, windows, and surfaces as building materials.' } }] },
    externalResources: [{ title: 'NREL Buildings', url: 'https://www.nrel.gov/buildings/', type: 'research' }]
  },
  // Module 8: Green Roofs and Walls
  {
    id: 'green-roofs-walls',
    slug: 'green-roofs-and-walls',
    title: 'Green Roofs and Walls',
    description: {
      ELEMENTARY: 'Learn about plants growing on buildings!',
      MIDDLE_SCHOOL: 'Discover how rooftop gardens and living walls help buildings.',
      HIGH_SCHOOL: 'Explore green roof types, benefits, and installation considerations.',
      UNDERGRADUATE: 'Analyze green infrastructure performance, stormwater benefits, and thermal impacts.',
      GRADUATE: 'Examine urban heat island mitigation, biodiversity, and policy incentives.',
      PHD: 'Research plant-building interactions, performance modeling, and long-term outcomes.'
    },
    topic: 'green-building',
    category: 'LANDSCAPING',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-gr-1', title: 'Living Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Gardens in the Sky!</h2><p>Some buildings have gardens on their roofs! Plants keep buildings cool and give birds and bees a home.</p>', MIDDLE_SCHOOL: '<h2>Green Roofs and Walls</h2><p>Living plants on buildings reduce heat, capture rainwater, clean air, and provide habitat.</p>', HIGH_SCHOOL: '<h2>Green Roof Types</h2><p>Extensive (shallow, low maintenance), intensive (deeper, more plants), and semi-intensive (in between).</p>', UNDERGRADUATE: '<h2>Performance Analysis</h2><p>Stormwater retention, thermal performance, energy savings, and maintenance requirements.</p>', GRADUATE: '<h2>Urban Benefits</h2><p>Heat island mitigation, air quality improvement, biodiversity corridors, and property values.</p>', PHD: '<h2>Research Frontiers</h2><p>Long-term performance data, plant selection optimization, and integrated systems.</p>' } }],
    activities: [{ id: 'gb-gr-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Rooftop Garden!', MIDDLE_SCHOOL: 'Design Green Infrastructure', HIGH_SCHOOL: 'System Selection', UNDERGRADUATE: 'Performance Analysis', GRADUATE: 'Urban Planning', PHD: 'Long-Term Modeling' }, description: { ELEMENTARY: 'Create a garden on top of a building!', MIDDLE_SCHOOL: 'Design green roofs and walls for a building.', HIGH_SCHOOL: 'Select appropriate green roof systems.', UNDERGRADUATE: 'Analyze green roof stormwater performance.', GRADUATE: 'Plan green infrastructure at city scale.', PHD: 'Model long-term green roof performance.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-gr-game', type: 'simulation', title: 'Rooftop Gardener', description: 'Design green roofs and living walls!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-gr-quiz', passingScore: 80, questions: [{ id: 'gbgrq1', question: { ELEMENTARY: 'What grows on a green roof?', MIDDLE_SCHOOL: 'What do green roofs do for rain?', HIGH_SCHOOL: 'What is an extensive green roof?', UNDERGRADUATE: 'How do green roofs save energy?', GRADUATE: 'What is the heat island effect?', PHD: 'What is a key research gap for green roofs?' }, options: { ELEMENTARY: ['Plants', 'Cars', 'Houses', 'Nothing'], MIDDLE_SCHOOL: ['Absorb and slow it down', 'Make more rain', 'Ignore it', 'Speed it up'], HIGH_SCHOOL: ['Shallow with low-maintenance plants', 'Deep with trees', 'No plants', 'Only grass'], UNDERGRADUATE: ['Insulation and evaporative cooling', 'Using more energy', 'No energy effect', 'Heating the building'], GRADUATE: ['Cities being hotter than surrounding areas', 'Islands getting hot', 'No effect', 'Cities being cooler'], PHD: ['Long-term performance data', 'Too much data', 'No questions left', 'Easy installation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green roofs have living plants growing on them!', MIDDLE_SCHOOL: 'Green roofs absorb rainwater like a sponge, reducing runoff.', HIGH_SCHOOL: 'Extensive green roofs are shallow (2-6 inches) with hardy, low-maintenance plants.', UNDERGRADUATE: 'Green roofs provide insulation and evaporative cooling, reducing heating and cooling energy.', GRADUATE: 'Urban heat island effect makes cities significantly hotter than surrounding rural areas.', PHD: 'Long-term performance data under different climates remains a key research gap.' } }] },
    externalResources: [{ title: 'Green Roofs for Healthy Cities', url: 'https://greenroofs.org/', type: 'research' }]
  },
  // Module 9: Building Retrofits
  {
    id: 'green-retrofits',
    slug: 'building-retrofits',
    title: 'Building Retrofits',
    description: {
      ELEMENTARY: 'Learn how to make old buildings green!',
      MIDDLE_SCHOOL: 'Discover ways to improve existing buildings.',
      HIGH_SCHOOL: 'Explore energy audits, weatherization, and system upgrades.',
      UNDERGRADUATE: 'Analyze deep retrofits, cost-benefit, and project planning.',
      GRADUATE: 'Examine portfolio approaches, financing mechanisms, and policy drivers.',
      PHD: 'Research retrofit effectiveness, decision support, and scaling strategies.'
    },
    topic: 'green-building',
    category: 'RENOVATION',
    icon: 'Wrench',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ret-1', title: 'Making Buildings Better', order: 1, duration: 15, hasActivity: true, activityType: 'STEP_GUIDED', content: { ELEMENTARY: '<h2>Fix Up, Green Up!</h2><p>Old buildings can become green buildings! Adding insulation, better windows, and efficient appliances helps.</p>', MIDDLE_SCHOOL: '<h2>Building Improvements</h2><p>Most buildings already exist. Retrofitting them is essential - insulation, air sealing, efficient HVAC, and lighting.</p>', HIGH_SCHOOL: '<h2>Energy Audits</h2><p>Assessments identify improvement opportunities. Blower door tests, thermal imaging, and utility analysis guide retrofits.</p>', UNDERGRADUATE: '<h2>Deep Retrofits</h2><p>Comprehensive improvements achieving 50%+ energy reduction. Envelope, systems, and controls all upgraded together.</p>', GRADUATE: '<h2>Scaling Retrofits</h2><p>Portfolio approaches, PACE financing, energy service agreements, and building performance standards.</p>', PHD: '<h2>Research Frontiers</h2><p>Retrofit effectiveness studies, decision support tools, and scaling barriers.</p>' } }],
    activities: [{ id: 'gb-ret-act-1', type: 'STEP_GUIDED', title: { ELEMENTARY: 'Fix the Building!', MIDDLE_SCHOOL: 'Plan Improvements', HIGH_SCHOOL: 'Energy Audit', UNDERGRADUATE: 'Deep Retrofit', GRADUATE: 'Portfolio Strategy', PHD: 'Decision Tool' }, description: { ELEMENTARY: 'Help make an old building more efficient!', MIDDLE_SCHOOL: 'Plan energy improvements for a building.', HIGH_SCHOOL: 'Conduct an energy audit.', UNDERGRADUATE: 'Design a deep retrofit project.', GRADUATE: 'Develop a portfolio retrofit strategy.', PHD: 'Create a retrofit decision support tool.' }, config: { ELEMENTARY: { steps: 5, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { steps: 8, hints: true, timeLimit: 180 }, HIGH_SCHOOL: { steps: 10, hints: false, timeLimit: 150 }, UNDERGRADUATE: { steps: 12, hints: false, timeLimit: 180 }, GRADUATE: { steps: 15, hints: false, timeLimit: 120 }, PHD: { steps: 20, hints: false, timeLimit: 90 } } }],
    game: { id: 'gb-ret-game', type: 'puzzle', title: 'Retrofit Master', description: 'Upgrade buildings for efficiency!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ret-quiz', passingScore: 80, questions: [{ id: 'gbretq1', question: { ELEMENTARY: 'How can you make an old building greener?', MIDDLE_SCHOOL: 'What is the first step in a retrofit?', HIGH_SCHOOL: 'What does a blower door test measure?', UNDERGRADUATE: 'What is a deep retrofit?', GRADUATE: 'What is PACE financing?', PHD: 'What limits retrofit scaling?' }, options: { ELEMENTARY: ['Add insulation and efficient appliances', 'Tear it down', 'Paint it green', 'Ignore it'], MIDDLE_SCHOOL: ['Energy audit to find opportunities', 'Tear down walls', 'Add more rooms', 'Change the address'], HIGH_SCHOOL: ['Building air leakage', 'Water pressure', 'Foundation strength', 'Roof height'], UNDERGRADUATE: ['50%+ energy reduction through comprehensive upgrades', 'Minor changes only', 'Only lighting', 'Only HVAC'], GRADUATE: ['Property tax-based repayment for improvements', 'Personal loan', 'Grant only', 'No financing needed'], PHD: ['Split incentives, upfront costs, disruption', 'Too easy', 'No limits', 'Technology only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Adding insulation, better windows, and efficient appliances makes old buildings greener!', MIDDLE_SCHOOL: 'An energy audit identifies the best opportunities for improving building efficiency.', HIGH_SCHOOL: 'Blower door tests pressurize buildings to measure air leakage rates.', UNDERGRADUATE: 'Deep retrofits achieve 50%+ energy reduction through comprehensive envelope and system upgrades.', GRADUATE: 'PACE (Property Assessed Clean Energy) allows repayment through property tax bills.', PHD: 'Split incentives (tenant/owner), high upfront costs, and occupant disruption limit retrofit scaling.' } }] },
    externalResources: [{ title: 'Energy Star Buildings', url: 'https://www.energystar.gov/buildings', type: 'research' }]
  },
  // Module 10: Green Building Certifications
  {
    id: 'green-certifications',
    slug: 'green-building-certifications',
    title: 'Green Building Certifications',
    description: {
      ELEMENTARY: 'Learn about special awards for green buildings!',
      MIDDLE_SCHOOL: 'Discover how buildings earn green certifications.',
      HIGH_SCHOOL: 'Explore LEED, BREEAM, and other rating systems.',
      UNDERGRADUATE: 'Analyze certification requirements, costs, and market impacts.',
      GRADUATE: 'Examine certification effectiveness, policy integration, and market transformation.',
      PHD: 'Research certification outcomes, system comparison, and next-generation frameworks.'
    },
    topic: 'green-building',
    category: 'CERTIFICATION',
    icon: 'Award',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-cert-1', title: 'Green Awards', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Green Building Badges!</h2><p>Buildings can earn special badges to show they are good for the environment - like getting a gold star!</p>', MIDDLE_SCHOOL: '<h2>Green Certifications</h2><p>LEED, BREEAM, and other systems rate buildings on energy, water, materials, and health. Higher levels mean greener buildings.</p>', HIGH_SCHOOL: '<h2>LEED Rating System</h2><p>Categories: Location, Energy, Water, Materials, Indoor Quality, Innovation. Points earn Certified, Silver, Gold, or Platinum.</p>', UNDERGRADUATE: '<h2>Certification Process</h2><p>Registration, documentation, verification, and ongoing performance reporting for some systems.</p>', GRADUATE: '<h2>Market Impact</h2><p>Green certifications command rent premiums, attract tenants, and may be required by policy or investors.</p>', PHD: '<h2>Research Questions</h2><p>Do certified buildings actually perform better? Cost-effectiveness and market transformation.</p>' } }],
    activities: [{ id: 'gb-cert-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Earn the Badge!', MIDDLE_SCHOOL: 'LEED Categories', HIGH_SCHOOL: 'Certification Path', UNDERGRADUATE: 'Cost-Benefit Analysis', GRADUATE: 'Policy Design', PHD: 'Performance Verification' }, description: { ELEMENTARY: 'Help a building earn its green badge!', MIDDLE_SCHOOL: 'Match LEED categories to building features.', HIGH_SCHOOL: 'Plan a path to LEED certification.', UNDERGRADUATE: 'Analyze certification costs and benefits.', GRADUATE: 'Design certification policy for a city.', PHD: 'Design performance verification study.' }, config: { ELEMENTARY: { items: 6, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 10, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 }, GRADUATE: { items: 18, hints: false, timeLimit: 90 }, PHD: { items: 22, hints: false, timeLimit: 60 } } }],
    game: { id: 'gb-cert-game', type: 'matching', title: 'Certification Expert', description: 'Guide buildings to green certifications!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-cert-quiz', passingScore: 80, questions: [{ id: 'gbcertq1', question: { ELEMENTARY: 'What do green buildings earn?', MIDDLE_SCHOOL: 'What is LEED?', HIGH_SCHOOL: 'What are LEED certification levels?', UNDERGRADUATE: 'What drives certification demand?', GRADUATE: 'Do certified buildings rent for more?', PHD: 'What is a key research question about certifications?' }, options: { ELEMENTARY: ['Special badges showing they are green', 'Money prizes', 'Paint', 'Nothing'], MIDDLE_SCHOOL: ['A green building rating system', 'A type of plant', 'A building material', 'An architect'], HIGH_SCHOOL: ['Certified, Silver, Gold, Platinum', 'A, B, C, D', 'First, Second, Third', 'Good, Better, Best'], UNDERGRADUATE: ['Tenant demand, policy, and investor requirements', 'No demand exists', 'Only cost savings', 'Only marketing'], GRADUATE: ['Yes, studies show rental premiums', 'No premium', 'Lower rents', 'No data'], PHD: ['Do certified buildings actually perform better operationally?', 'Too many questions', 'All answered', 'No questions'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green buildings earn special badges or certifications showing they help the environment!', MIDDLE_SCHOOL: 'LEED (Leadership in Energy and Environmental Design) is the most widely used green building rating system.', HIGH_SCHOOL: 'LEED has four certification levels based on points earned: Certified, Silver, Gold, and Platinum.', UNDERGRADUATE: 'Tenant preferences, policy requirements, and investor ESG criteria drive certification demand.', GRADUATE: 'Studies consistently show certified buildings command 3-10% rental premiums.', PHD: 'Whether certified buildings actually achieve predicted performance in operation is a key research question.' } }] },
    externalResources: [{ title: 'USGBC LEED', url: 'https://www.usgbc.org/leed', type: 'research' }]
  },
  // Module 11: Net Zero Buildings
  {
    id: 'green-net-zero',
    slug: 'net-zero-buildings',
    title: 'Net Zero Buildings',
    description: {
      ELEMENTARY: 'Learn about buildings that make their own energy!',
      MIDDLE_SCHOOL: 'Discover how buildings can produce as much energy as they use.',
      HIGH_SCHOOL: 'Explore net zero energy design strategies and technologies.',
      UNDERGRADUATE: 'Analyze net zero pathways, economics, and grid interactions.',
      GRADUATE: 'Examine net zero carbon definitions, policy, and portfolio approaches.',
      PHD: 'Research net zero measurement, verification, and scalability challenges.'
    },
    topic: 'green-building',
    category: 'NET ZERO',
    icon: 'Zap',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-nz-1', title: 'Zero Energy Building', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Make Energy!</h2><p>Some buildings have solar panels that make all the electricity they need. They are called net zero buildings!</p>', MIDDLE_SCHOOL: '<h2>What is Net Zero?</h2><p>A net zero energy building produces as much energy as it uses over a year. Super efficient + renewable energy = net zero.</p>', HIGH_SCHOOL: '<h2>Net Zero Strategies</h2><p>First reduce energy demand through efficiency, then generate renewable energy on-site or nearby to meet remaining needs.</p>', UNDERGRADUATE: '<h2>Net Zero Economics</h2><p>First costs, operating savings, incentives, and payback periods. Grid interactions and net metering value.</p>', GRADUATE: '<h2>Net Zero Carbon</h2><p>Beyond energy: embodied carbon, refrigerants, and full lifecycle emissions. Definitions and accounting boundaries.</p>', PHD: '<h2>Research Frontiers</h2><p>Performance gaps, measurement protocols, and scalability to existing building stock.</p>' } }],
    activities: [{ id: 'gb-nz-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make Energy!', MIDDLE_SCHOOL: 'Balance Energy', HIGH_SCHOOL: 'Design Net Zero', UNDERGRADUATE: 'Economic Model', GRADUATE: 'Carbon Accounting', PHD: 'Verification Protocol' }, description: { ELEMENTARY: 'Help a building make its own energy!', MIDDLE_SCHOOL: 'Balance energy use and production.', HIGH_SCHOOL: 'Design a net zero energy building.', UNDERGRADUATE: 'Model net zero project economics.', GRADUATE: 'Account for building lifecycle carbon.', PHD: 'Design net zero verification protocol.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-nz-game', type: 'simulation', title: 'Net Zero Builder', description: 'Design buildings that produce all their energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-nz-quiz', passingScore: 80, questions: [{ id: 'gbnzq1', question: { ELEMENTARY: 'What does a net zero building do?', MIDDLE_SCHOOL: 'What makes a building net zero?', HIGH_SCHOOL: 'What is the first step to net zero?', UNDERGRADUATE: 'What is grid interaction?', GRADUATE: 'What is embodied carbon?', PHD: 'What is the performance gap?' }, options: { ELEMENTARY: ['Makes all the energy it needs', 'Uses no electricity', 'Has no windows', 'Is painted green'], MIDDLE_SCHOOL: ['Produces as much energy as it uses', 'Uses only candles', 'Has no heating', 'Is underground'], HIGH_SCHOOL: ['Reduce energy demand through efficiency', 'Add solar first', 'Ignore insulation', 'Use more energy'], UNDERGRADUATE: ['Exporting and importing energy from grid', 'No grid connection', 'Only importing', 'Only exporting'], GRADUATE: ['Carbon emissions from materials and construction', 'Operational carbon only', 'No carbon', 'Carbon in the ground'], PHD: ['Difference between predicted and actual performance', 'No gap exists', 'Only design gap', 'Perfect prediction'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Net zero buildings have solar panels and other features that make all the energy they need!', MIDDLE_SCHOOL: 'A net zero building produces as much renewable energy as it consumes over a year.', HIGH_SCHOOL: 'First reduce demand through efficiency, then meet remaining needs with renewables.', UNDERGRADUATE: 'Grid interaction involves exporting surplus energy and importing when needed.', GRADUATE: 'Embodied carbon is the emissions from extracting materials, manufacturing, and construction.', PHD: 'The performance gap is the difference between design predictions and actual measured performance.' } }] },
    externalResources: [{ title: 'Net Zero Buildings', url: 'https://newbuildings.org/code_policy/zeronetzero/', type: 'research' }]
  },
  // Module 12: Biophilic Design
  {
    id: 'green-biophilic',
    slug: 'biophilic-design',
    title: 'Biophilic Design',
    description: {
      ELEMENTARY: 'Learn how nature inside buildings makes us happy!',
      MIDDLE_SCHOOL: 'Discover how connecting buildings to nature improves health.',
      HIGH_SCHOOL: 'Explore biophilic design principles and their health benefits.',
      UNDERGRADUATE: 'Analyze biophilic design patterns, implementation, and evidence base.',
      GRADUATE: 'Examine workplace productivity, health outcomes, and economic impacts.',
      PHD: 'Research biophilia mechanisms, measurement methods, and optimal applications.'
    },
    topic: 'green-building',
    category: 'WELLNESS',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-bio-1', title: 'Nature in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Bringing Nature Inside!</h2><p>Plants, sunlight, and natural materials in buildings make us feel good. Our brains love nature!</p>', MIDDLE_SCHOOL: '<h2>Biophilic Design</h2><p>Biophilia means love of nature. Biophilic buildings include plants, water, natural light, and nature views.</p>', HIGH_SCHOOL: '<h2>Design Patterns</h2><p>Direct nature (plants, water), indirect nature (materials, colors), and space conditions (prospect, refuge).</p>', UNDERGRADUATE: '<h2>Implementation</h2><p>Living walls, daylighting, natural materials, nature imagery, and spatial configurations.</p>', GRADUATE: '<h2>Evidence Base</h2><p>Research shows productivity gains, reduced stress, faster healing, and improved wellbeing.</p>', PHD: '<h2>Research Frontiers</h2><p>Mechanisms of biophilic response, dose-response relationships, and optimal applications.</p>' } }],
    activities: [{ id: 'gb-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Add Nature!', MIDDLE_SCHOOL: 'Biophilic Elements', HIGH_SCHOOL: 'Design Patterns', UNDERGRADUATE: 'Office Design', GRADUATE: 'ROI Calculation', PHD: 'Research Design' }, description: { ELEMENTARY: 'Add nature to make a room feel better!', MIDDLE_SCHOOL: 'Choose biophilic elements for a building.', HIGH_SCHOOL: 'Apply biophilic design patterns.', UNDERGRADUATE: 'Design a biophilic office space.', GRADUATE: 'Calculate biophilic design ROI.', PHD: 'Design biophilic research study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-bio-game', type: 'simulation', title: 'Nature Designer', description: 'Create spaces that connect people with nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-bio-quiz', passingScore: 80, questions: [{ id: 'gbbioq1', question: { ELEMENTARY: 'What makes us feel good inside buildings?', MIDDLE_SCHOOL: 'What does biophilia mean?', HIGH_SCHOOL: 'What is a biophilic design pattern?', UNDERGRADUATE: 'What is a living wall?', GRADUATE: 'What workplace benefit does biophilic design provide?', PHD: 'What is the stress reduction mechanism?' }, options: { ELEMENTARY: ['Plants, sunlight, and nature', 'Concrete walls', 'No windows', 'Loud machines'], MIDDLE_SCHOOL: ['Love of nature', 'Fear of plants', 'Building code', 'Type of plant'], HIGH_SCHOOL: ['A way to incorporate nature into design', 'A blueprint', 'A construction method', 'A plant species'], UNDERGRADUATE: ['A vertical garden on a wall', 'A moving wall', 'A concrete wall', 'A wall with screens'], GRADUATE: ['Increased productivity and reduced stress', 'No benefit', 'Higher costs only', 'More meetings'], PHD: ['Attention restoration and parasympathetic activation', 'Only visual', 'No mechanism known', 'Pure placebo'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Plants, sunlight, water sounds, and natural materials help us feel calm and happy!', MIDDLE_SCHOOL: 'Biophilia means love of nature - humans naturally feel good around natural elements.', HIGH_SCHOOL: 'Biophilic design patterns are ways to incorporate natural elements and spatial qualities.', UNDERGRADUATE: 'Living walls are vertical surfaces covered with plants, bringing nature into indoor spaces.', GRADUATE: 'Studies show 6-15% productivity gains and significant stress reduction from biophilic design.', PHD: 'Biophilic responses involve attention restoration theory and parasympathetic nervous system activation.' } }] },
    externalResources: [{ title: 'Biophilic Design', url: 'https://www.terrapinbrightgreen.com/reports/14-patterns/', type: 'research' }]
  },
  // Module 13: Healthy Buildings
  {
    id: 'green-healthy',
    slug: 'healthy-buildings',
    title: 'Healthy Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings can keep us healthy!',
      MIDDLE_SCHOOL: 'Discover what makes buildings good for our health.',
      HIGH_SCHOOL: 'Explore ventilation, lighting, acoustics, and wellness design.',
      UNDERGRADUATE: 'Analyze WELL certification, health metrics, and design strategies.',
      GRADUATE: 'Examine health-focused building standards and post-pandemic design.',
      PHD: 'Research building-health relationships, measurement, and intervention effectiveness.'
    },
    topic: 'green-building',
    category: 'HEALTH',
    icon: 'Heart',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-health-1', title: 'Buildings for Health', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Healthy Buildings!</h2><p>Good buildings have fresh air, natural light, and clean water. They help us stay healthy!</p>', MIDDLE_SCHOOL: '<h2>Indoor Health</h2><p>We spend 90% of time indoors. Air quality, lighting, temperature, and acoustics affect our health.</p>', HIGH_SCHOOL: '<h2>Health Factors</h2><p>Ventilation and air filtration, daylighting and views, thermal comfort, acoustics, and active design.</p>', UNDERGRADUATE: '<h2>WELL Building Standard</h2><p>Rating system focused on human health: air, water, nourishment, light, fitness, comfort, mind.</p>', GRADUATE: '<h2>Post-Pandemic Design</h2><p>Enhanced ventilation, touchless systems, flexible spaces, and infectious disease resilience.</p>', PHD: '<h2>Research Frontiers</h2><p>Building-health causal pathways, real-time monitoring, and intervention effectiveness.</p>' } }],
    activities: [{ id: 'gb-health-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make it Healthy!', MIDDLE_SCHOOL: 'Health Check', HIGH_SCHOOL: 'WELL Features', UNDERGRADUATE: 'Certification Path', GRADUATE: 'Pandemic Design', PHD: 'Health Study' }, description: { ELEMENTARY: 'Add features to make a building healthy!', MIDDLE_SCHOOL: 'Check a building for health features.', HIGH_SCHOOL: 'Select WELL certification features.', UNDERGRADUATE: 'Plan a path to WELL certification.', GRADUATE: 'Design for infectious disease resilience.', PHD: 'Design a building health study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-health-game', type: 'simulation', title: 'Health Builder', description: 'Design buildings that promote health!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-health-quiz', passingScore: 80, questions: [{ id: 'gbhealthq1', question: { ELEMENTARY: 'What do healthy buildings have?', MIDDLE_SCHOOL: 'How much time do we spend indoors?', HIGH_SCHOOL: 'What is the WELL standard?', UNDERGRADUATE: 'What are WELL concepts?', GRADUATE: 'What post-pandemic feature is key?', PHD: 'What is a building health biomarker?' }, options: { ELEMENTARY: ['Fresh air and natural light', 'Loud noises', 'No windows', 'Dark rooms'], MIDDLE_SCHOOL: ['About 90%', 'About 10%', 'About 50%', 'Never indoors'], HIGH_SCHOOL: ['A health-focused building rating system', 'A water company', 'A lighting brand', 'A paint color'], UNDERGRADUATE: ['Air, water, nourishment, light, fitness, comfort, mind', 'Only air', 'Only light', 'Only water'], GRADUATE: ['Enhanced ventilation', 'Smaller spaces', 'No changes needed', 'Less air'], PHD: ['Measurable health indicators linked to building conditions', 'Building size', 'Construction cost', 'Wall color'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Healthy buildings have fresh air, natural light, clean water, and comfortable temperatures!', MIDDLE_SCHOOL: 'We spend about 90% of our time indoors, so building quality really affects our health.', HIGH_SCHOOL: 'WELL is a rating system that focuses on human health and wellness in buildings.', UNDERGRADUATE: 'WELL has concepts covering Air, Water, Nourishment, Light, Movement, Thermal Comfort, Sound, Materials, Mind, and Community.', GRADUATE: 'Enhanced ventilation with better filtration is key for airborne disease resilience.', PHD: 'Biomarkers are measurable indicators like cortisol, heart rate variability, or cognitive performance linked to building conditions.' } }] },
    externalResources: [{ title: 'WELL Building Standard', url: 'https://www.wellcertified.com/', type: 'research' }]
  },
  // Module 14: Embodied Carbon
  {
    id: 'green-embodied-carbon',
    slug: 'embodied-carbon',
    title: 'Embodied Carbon',
    description: {
      ELEMENTARY: 'Learn about the hidden carbon in building materials!',
      MIDDLE_SCHOOL: 'Discover how materials used in buildings affect climate.',
      HIGH_SCHOOL: 'Explore lifecycle carbon, material choices, and carbon accounting.',
      UNDERGRADUATE: 'Analyze whole building lifecycle assessment and carbon reduction strategies.',
      GRADUATE: 'Examine embodied carbon policy, benchmarks, and supply chain decarbonization.',
      PHD: 'Research carbon accounting methods, data quality, and systemic reduction pathways.'
    },
    topic: 'green-building',
    category: 'CARBON',
    icon: 'Factory',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ec-1', title: 'Hidden Carbon', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Carbon in Materials!</h2><p>Making cement and steel creates carbon pollution. Choosing different materials can help the planet!</p>', MIDDLE_SCHOOL: '<h2>What is Embodied Carbon?</h2><p>Carbon is released when we mine, manufacture, and transport building materials. This is called embodied carbon.</p>', HIGH_SCHOOL: '<h2>Lifecycle Stages</h2><p>Product stage (mining, manufacturing), construction, use phase, and end of life. Upfront carbon matters now.</p>', UNDERGRADUATE: '<h2>Whole Building LCA</h2><p>Lifecycle assessment quantifies embodied carbon. Material selection, structural optimization, and design strategies.</p>', GRADUATE: '<h2>Policy and Markets</h2><p>Buy Clean policies, EPDs, carbon benchmarks, and supply chain engagement.</p>', PHD: '<h2>Research Frontiers</h2><p>Data uncertainty, biogenic carbon accounting, and industry decarbonization pathways.</p>' } }],
    activities: [{ id: 'gb-ec-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Choose Low-Carbon!', MIDDLE_SCHOOL: 'Material Comparison', HIGH_SCHOOL: 'LCA Basics', UNDERGRADUATE: 'Whole Building LCA', GRADUATE: 'Policy Analysis', PHD: 'Data Quality' }, description: { ELEMENTARY: 'Pick materials with less hidden carbon!', MIDDLE_SCHOOL: 'Compare carbon in different materials.', HIGH_SCHOOL: 'Learn lifecycle assessment basics.', UNDERGRADUATE: 'Conduct a whole building LCA.', GRADUATE: 'Analyze embodied carbon policy.', PHD: 'Assess LCA data quality and uncertainty.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ec-game', type: 'simulation', title: 'Carbon Detective', description: 'Find and reduce hidden carbon in buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ec-quiz', passingScore: 80, questions: [{ id: 'gbecq1', question: { ELEMENTARY: 'Where is hidden carbon in buildings?', MIDDLE_SCHOOL: 'What is embodied carbon?', HIGH_SCHOOL: 'What is upfront carbon?', UNDERGRADUATE: 'What is an EPD?', GRADUATE: 'What is Buy Clean policy?', PHD: 'What is biogenic carbon?' }, options: { ELEMENTARY: ['In the materials like cement and steel', 'In the air', 'In the water', 'In the paint color'], MIDDLE_SCHOOL: ['Carbon from making and transporting materials', 'Carbon in the air', 'Carbon from breathing', 'Carbon from cars only'], HIGH_SCHOOL: ['Carbon released before building is used', 'Carbon from using building', 'Carbon after demolition', 'No such thing'], UNDERGRADUATE: ['Environmental Product Declaration', 'Electric Power Device', 'Energy Performance Design', 'Emission Prevention Document'], GRADUATE: ['Procurement preference for low-carbon materials', 'Cleaning products', 'Air cleaning', 'Water treatment'], PHD: ['Carbon stored in biological materials like wood', 'Carbon from fossils', 'Carbon dioxide', 'No carbon'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Making cement and steel creates lots of carbon pollution - this is hidden in the building!', MIDDLE_SCHOOL: 'Embodied carbon is the carbon released when mining, manufacturing, and transporting building materials.', HIGH_SCHOOL: 'Upfront carbon is released before the building is even used - in material production and construction.', UNDERGRADUATE: 'An EPD (Environmental Product Declaration) discloses the environmental impacts of a product.', GRADUATE: 'Buy Clean policies require or prefer low-carbon materials in public construction projects.', PHD: 'Biogenic carbon is carbon stored in biological materials that was recently captured from the atmosphere.' } }] },
    externalResources: [{ title: 'Embodied Carbon', url: 'https://carbonleadershipforum.org/', type: 'research' }]
  },
  // Module 15: Resilient Design
  {
    id: 'green-resilient',
    slug: 'resilient-design',
    title: 'Resilient Design',
    description: {
      ELEMENTARY: 'Learn how buildings can be strong against storms and heat!',
      MIDDLE_SCHOOL: 'Discover how to design buildings that handle extreme weather.',
      HIGH_SCHOOL: 'Explore climate adaptation, passive survivability, and hazard resistance.',
      UNDERGRADUATE: 'Analyze resilience assessment, design strategies, and community-level approaches.',
      GRADUATE: 'Examine resilience metrics, financial tools, and policy integration.',
      PHD: 'Research resilience quantification, cascading failures, and transformative adaptation.'
    },
    topic: 'green-building',
    category: 'RESILIENCE',
    icon: 'Shield',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-res-1', title: 'Strong Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings that Stay Strong!</h2><p>Some buildings can handle big storms, floods, and heat waves. They protect people inside!</p>', MIDDLE_SCHOOL: '<h2>Climate Resilience</h2><p>Climate change brings more extreme weather. Resilient buildings can withstand and recover from these events.</p>', HIGH_SCHOOL: '<h2>Resilience Strategies</h2><p>Passive survivability (habitable without power), hazard resistance, redundancy, and rapid recovery.</p>', UNDERGRADUATE: '<h2>Resilience Assessment</h2><p>Hazard identification, vulnerability analysis, and adaptation options. RELi rating system.</p>', GRADUATE: '<h2>Community Resilience</h2><p>Buildings as resilience hubs, district approaches, and insurance/financing integration.</p>', PHD: '<h2>Research Frontiers</h2><p>Resilience metrics, cascading infrastructure failures, and transformative adaptation.</p>' } }],
    activities: [{ id: 'gb-res-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Storm-Proof It!', MIDDLE_SCHOOL: 'Prepare for Weather', HIGH_SCHOOL: 'Resilience Design', UNDERGRADUATE: 'Hazard Assessment', GRADUATE: 'Resilience Hub', PHD: 'Failure Analysis' }, description: { ELEMENTARY: 'Make a building safe from storms!', MIDDLE_SCHOOL: 'Prepare a building for extreme weather.', HIGH_SCHOOL: 'Design for climate resilience.', UNDERGRADUATE: 'Assess building climate hazards.', GRADUATE: 'Design a community resilience hub.', PHD: 'Analyze cascading failure scenarios.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-res-game', type: 'simulation', title: 'Resilience Engineer', description: 'Design buildings that withstand any challenge!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-res-quiz', passingScore: 80, questions: [{ id: 'gbresq1', question: { ELEMENTARY: 'What can resilient buildings handle?', MIDDLE_SCHOOL: 'Why do we need resilient buildings?', HIGH_SCHOOL: 'What is passive survivability?', UNDERGRADUATE: 'What is RELi?', GRADUATE: 'What is a resilience hub?', PHD: 'What is cascading failure?' }, options: { ELEMENTARY: ['Big storms and heat waves', 'Nothing special', 'Only sunshine', 'Only calm weather'], MIDDLE_SCHOOL: ['Climate change brings more extreme weather', 'No reason needed', 'Just for looks', 'To save money only'], HIGH_SCHOOL: ['Building stays habitable without power', 'Passive people', 'No activity', 'Survival games'], UNDERGRADUATE: ['A resilience rating system', 'A building material', 'A construction company', 'A type of insulation'], GRADUATE: ['A building supporting community during emergencies', 'A strong hub', 'A wheel hub', 'A computer hub'], PHD: ['One failure triggering others across systems', 'Waterfall', 'Normal operations', 'Single failure only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Resilient buildings can handle big storms, floods, heat waves, and other extreme weather!', MIDDLE_SCHOOL: 'Climate change is causing more extreme weather, so buildings need to be able to handle it.', HIGH_SCHOOL: 'Passive survivability means the building remains safe and habitable even without power or fuel.', UNDERGRADUATE: 'RELi is a resilience rating system for buildings and communities.', GRADUATE: 'Resilience hubs are buildings that serve communities during emergencies with power, shelter, and resources.', PHD: 'Cascading failure is when one system failure triggers failures in dependent systems.' } }] },
    externalResources: [{ title: 'Resilient Design', url: 'https://www.resilientdesign.org/', type: 'research' }]
  },
  {
    id: 'green-smart',
    slug: 'smart-buildings',
    title: 'Smart Building Technology',
    description: {
      ELEMENTARY: 'Learn how buildings can think and save energy automatically!',
      MIDDLE_SCHOOL: 'Discover how sensors and computers make buildings smarter and more efficient.',
      HIGH_SCHOOL: 'Explore building automation systems, IoT integration, and intelligent controls.',
      UNDERGRADUATE: 'Analyze smart building architectures, data analytics, and occupant-centric design.',
      GRADUATE: 'Examine advanced control strategies, machine learning, and grid-interactive buildings.',
      PHD: 'Research autonomous building systems, predictive controls, and human-building interaction.'
    },
    topic: 'green-building',
    category: 'TECHNOLOGY',
    icon: 'Cpu',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-sm-1', title: 'Thinking Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Think!</h2><p>Smart buildings use sensors to turn lights on and off, keep us comfortable, and save energy automatically!</p>', MIDDLE_SCHOOL: '<h2>Building Brains</h2><p>Building automation systems connect sensors, controllers, and equipment. They adjust lighting, heating, and cooling based on conditions.</p>', HIGH_SCHOOL: '<h2>Building Automation</h2><p>BAS integrates HVAC, lighting, security, and other systems. Sensors provide data for optimized control and fault detection.</p>', UNDERGRADUATE: '<h2>Smart Building Design</h2><p>System architecture, communication protocols, cybersecurity, and integration with grid signals and renewables.</p>', GRADUATE: '<h2>Advanced Controls</h2><p>Model predictive control, machine learning for optimization, and grid-interactive efficient buildings.</p>', PHD: '<h2>Research Frontiers</h2><p>Autonomous building systems, digital twins, and co-adaptive human-building interaction.</p>' } }],
    activities: [{ id: 'gb-sm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Smart Room!', MIDDLE_SCHOOL: 'Sensor Network', HIGH_SCHOOL: 'BAS Design', UNDERGRADUATE: 'System Integration', GRADUATE: 'Control Optimization', PHD: 'Digital Twin' }, description: { ELEMENTARY: 'Add sensors to make a smart room!', MIDDLE_SCHOOL: 'Design a building sensor network.', HIGH_SCHOOL: 'Configure a building automation system.', UNDERGRADUATE: 'Integrate smart building systems.', GRADUATE: 'Optimize building controls.', PHD: 'Build a digital twin model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-sm-game', type: 'simulation', title: 'Smart Building Engineer', description: 'Make buildings intelligent and efficient!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-sm-quiz', passingScore: 80, questions: [{ id: 'gbsmq1', question: { ELEMENTARY: 'What do smart buildings use to see?', MIDDLE_SCHOOL: 'What is building automation?', HIGH_SCHOOL: 'What is BAS?', UNDERGRADUATE: 'Why is cybersecurity important?', GRADUATE: 'What is model predictive control?', PHD: 'What is a digital twin?' }, options: { ELEMENTARY: ['Sensors', 'Eyes', 'Glasses', 'Windows only'], MIDDLE_SCHOOL: ['Connecting systems to work together automatically', 'Manual controls', 'No technology', 'Paper systems'], HIGH_SCHOOL: ['Building Automation System', 'Big Air System', 'Best Application Software', 'Building Art Studio'], UNDERGRADUATE: ['Connected systems can be attacked', 'No risk exists', 'Only locks matter', 'Security not needed'], GRADUATE: ['Uses building model to predict and optimize', 'Old fashioned control', 'Manual adjustment', 'No control'], PHD: ['Virtual model of physical building', 'Identical building', 'Twin towers', 'Double insulation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Smart buildings use sensors to see temperature, light, motion, and more!', MIDDLE_SCHOOL: 'Building automation connects all building systems so they can work together and save energy.', HIGH_SCHOOL: 'BAS (Building Automation System) integrates and controls building systems automatically.', UNDERGRADUATE: 'Smart buildings are connected to networks, making cybersecurity essential to prevent attacks.', GRADUATE: 'MPC uses a model of building physics to predict optimal control actions ahead of time.', PHD: 'A digital twin is a virtual replica of the physical building used for simulation and optimization.' } }] },
    externalResources: [{ title: 'Smart Buildings', url: 'https://www.energy.gov/eere/buildings/smart-buildings', type: 'article' }]
  },
  {
    id: 'green-timber',
    slug: 'mass-timber',
    title: 'Mass Timber Construction',
    description: {
      ELEMENTARY: 'Learn how tall buildings can be made from super strong wood!',
      MIDDLE_SCHOOL: 'Discover how engineered wood products are changing modern construction.',
      HIGH_SCHOOL: 'Explore cross-laminated timber, glulam, and tall wood building design.',
      UNDERGRADUATE: 'Analyze mass timber structural systems, fire safety, and lifecycle benefits.',
      GRADUATE: 'Examine timber building codes, connection design, and hybrid structural systems.',
      PHD: 'Research timber mechanics, biogenic carbon accounting, and forestry sustainability.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Trees',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-tm-1', title: 'Super Strong Wood', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Amazing Wooden Buildings!</h2><p>Engineers make super strong wood by gluing layers together. Now we can build tall buildings from wood!</p>', MIDDLE_SCHOOL: '<h2>Engineered Wood</h2><p>Mass timber products like CLT and glulam are made by gluing wood layers together. They are strong, fire-resistant, and store carbon.</p>', HIGH_SCHOOL: '<h2>Mass Timber Systems</h2><p>CLT panels, glulam beams, and connections enable mid-rise and tall wood buildings. Fire performance through charring behavior.</p>', UNDERGRADUATE: '<h2>Structural Design</h2><p>Load paths, connection design, fire protection strategies, and code compliance for tall wood buildings.</p>', GRADUATE: '<h2>Advanced Topics</h2><p>Timber-concrete composites, seismic design, moisture management, and building code development.</p>', PHD: '<h2>Research Frontiers</h2><p>Long-term creep behavior, connection ductility, and sustainable forestry certification.</p>' } }],
    activities: [{ id: 'gb-tm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build with Wood!', MIDDLE_SCHOOL: 'Layer It Up', HIGH_SCHOOL: 'Design CLT Building', UNDERGRADUATE: 'Structural Analysis', GRADUATE: 'Connection Design', PHD: 'Long-term Behavior' }, description: { ELEMENTARY: 'Stack wood layers to make a strong building!', MIDDLE_SCHOOL: 'Create engineered wood products.', HIGH_SCHOOL: 'Design a mass timber building.', UNDERGRADUATE: 'Analyze mass timber structures.', GRADUATE: 'Design timber connections.', PHD: 'Model long-term timber behavior.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-tm-game', type: 'simulation', title: 'Timber Tower Builder', description: 'Design and build tall wooden buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-tm-quiz', passingScore: 80, questions: [{ id: 'gbtmq1', question: { ELEMENTARY: 'How is super strong wood made?', MIDDLE_SCHOOL: 'What is CLT?', HIGH_SCHOOL: 'How does mass timber handle fire?', UNDERGRADUATE: 'What is a timber connection?', GRADUATE: 'What is timber-concrete composite?', PHD: 'What is creep in timber?' }, options: { ELEMENTARY: ['Gluing layers together', 'Painting it', 'Heating it', 'Freezing it'], MIDDLE_SCHOOL: ['Cross-Laminated Timber', 'Cool Light Tube', 'Clean Little Tree', 'Colored Lumber Type'], HIGH_SCHOOL: ['Forms protective char layer', 'Burns immediately', 'Melts', 'Explodes'], UNDERGRADUATE: ['Where timber elements join together', 'Wireless link', 'Social connection', 'Internet connection'], GRADUATE: ['Timber combined with concrete for strength', 'Concrete only', 'Timber only', 'No combination'], PHD: ['Long-term deformation under load', 'Fast movement', 'Color change', 'No change'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Mass timber is made by gluing many wood layers together, making it super strong!', MIDDLE_SCHOOL: 'CLT (Cross-Laminated Timber) is wood panels with layers glued at right angles for strength.', HIGH_SCHOOL: 'Mass timber chars predictably in fire, protecting the inner wood and maintaining structure.', UNDERGRADUATE: 'Connections transfer loads between timber elements and are critical for structural performance.', GRADUATE: 'Timber-concrete composites combine floor timber panels with concrete toppings for stiffness.', PHD: 'Creep is the gradual increase in deformation over time under sustained load.' } }] },
    externalResources: [{ title: 'Mass Timber', url: 'https://www.thinkwood.com/mass-timber', type: 'article' }]
  },
  {
    id: 'green-retrofit',
    slug: 'green-retrofits',
    title: 'Green Building Retrofits',
    description: {
      ELEMENTARY: 'Learn how old buildings can become green and save energy!',
      MIDDLE_SCHOOL: 'Discover how to upgrade existing buildings for better efficiency and comfort.',
      HIGH_SCHOOL: 'Explore deep energy retrofits, envelope improvements, and system upgrades.',
      UNDERGRADUATE: 'Analyze retrofit assessment, financing, and implementation strategies.',
      GRADUATE: 'Examine portfolio-scale retrofits, performance contracts, and policy incentives.',
      PHD: 'Research retrofit optimization, staged approaches, and decarbonization pathways.'
    },
    topic: 'green-building',
    category: 'EFFICIENCY',
    icon: 'Wrench',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-rt-1', title: 'Make Old Buildings New', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Upgrading Old Buildings!</h2><p>We can make old buildings better with new windows, insulation, and efficient systems. Its like giving them a green makeover!</p>', MIDDLE_SCHOOL: '<h2>Building Upgrades</h2><p>Retrofits add insulation, replace windows, upgrade HVAC, and seal air leaks. This saves energy and improves comfort.</p>', HIGH_SCHOOL: '<h2>Deep Energy Retrofits</h2><p>Major retrofits can reduce energy use by 50% or more. Envelope first approach addresses insulation and windows before systems.</p>', UNDERGRADUATE: '<h2>Retrofit Planning</h2><p>Energy audits, cost-benefit analysis, financing options, and phased implementation for existing buildings.</p>', GRADUATE: '<h2>Portfolio Scale</h2><p>Managing retrofits across building portfolios, ESCOs, performance contracts, and utility incentives.</p>', PHD: '<h2>Research Frontiers</h2><p>Optimal retrofit sequencing, embodied vs operational carbon tradeoffs, and deep decarbonization.</p>' } }],
    activities: [{ id: 'gb-rt-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fix Up the Building!', MIDDLE_SCHOOL: 'Upgrade Plan', HIGH_SCHOOL: 'Deep Retrofit', UNDERGRADUATE: 'Retrofit Analysis', GRADUATE: 'Portfolio Strategy', PHD: 'Optimization Model' }, description: { ELEMENTARY: 'Choose upgrades to make a building green!', MIDDLE_SCHOOL: 'Plan building improvements.', HIGH_SCHOOL: 'Design a deep energy retrofit.', UNDERGRADUATE: 'Analyze retrofit cost-effectiveness.', GRADUATE: 'Develop portfolio retrofit strategy.', PHD: 'Optimize retrofit sequencing.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-rt-game', type: 'simulation', title: 'Retrofit Expert', description: 'Transform old buildings into green ones!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-rt-quiz', passingScore: 80, questions: [{ id: 'gbrtq1', question: { ELEMENTARY: 'How can we make old buildings greener?', MIDDLE_SCHOOL: 'What does a retrofit do?', HIGH_SCHOOL: 'What is envelope first approach?', UNDERGRADUATE: 'What is an energy audit?', GRADUATE: 'What is an ESCO?', PHD: 'What is retrofit sequencing?' }, options: { ELEMENTARY: ['Add insulation and better windows', 'Paint them green', 'Add plants only', 'Make them smaller'], MIDDLE_SCHOOL: ['Upgrades buildings to save energy', 'Tears buildings down', 'Makes buildings bigger', 'Adds more rooms'], HIGH_SCHOOL: ['Fix insulation and windows before systems', 'Only upgrade HVAC', 'Only add solar', 'Systems first'], UNDERGRADUATE: ['Assessment of building energy use', 'Sound check', 'Safety inspection only', 'Color review'], GRADUATE: ['Energy Service Company providing retrofits', 'Emergency Services', 'Electrical Supply', 'Equipment Storage'], PHD: ['Optimal order of retrofit measures', 'Random order', 'Any order', 'No planning needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Adding insulation, better windows, and efficient systems makes old buildings green and comfortable!', MIDDLE_SCHOOL: 'Retrofits upgrade existing buildings with energy-saving improvements like insulation and efficient HVAC.', HIGH_SCHOOL: 'Envelope first fixes the building shell so you can install smaller, more efficient HVAC systems.', UNDERGRADUATE: 'An energy audit assesses how a building uses energy and identifies improvement opportunities.', GRADUATE: 'An ESCO (Energy Service Company) provides retrofit services often paid through guaranteed energy savings.', PHD: 'Retrofit sequencing optimizes the order of measures for maximum savings and lifecycle value.' } }] },
    externalResources: [{ title: 'Building Retrofits', url: 'https://www.energy.gov/eere/buildings/building-retrofits', type: 'article' }]
  },
  {
    id: 'green-interiors',
    slug: 'sustainable-interiors',
    title: 'Sustainable Interiors',
    description: {
      ELEMENTARY: 'Learn how to make rooms healthy and good for the Earth!',
      MIDDLE_SCHOOL: 'Discover how interior materials affect air quality and the environment.',
      HIGH_SCHOOL: 'Explore low-emitting materials, sustainable furniture, and indoor environmental quality.',
      UNDERGRADUATE: 'Analyze material health, transparency tools, and circular interior design.',
      GRADUATE: 'Examine Declare labels, Health Product Declarations, and material impact assessment.',
      PHD: 'Research chemical exposure pathways, material chemistry, and health outcome studies.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Sofa',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-in-1', title: 'Healthy Rooms', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Making Rooms Healthy!</h2><p>Some paints and furniture can make the air yucky. Choosing good materials keeps us healthy!</p>', MIDDLE_SCHOOL: '<h2>Indoor Air Quality</h2><p>Interior materials release chemicals into the air. Low-VOC paints, natural materials, and good ventilation create healthier spaces.</p>', HIGH_SCHOOL: '<h2>Material Selection</h2><p>VOCs, formaldehyde, and flame retardants affect health. Green certifications help identify safer materials.</p>', UNDERGRADUATE: '<h2>Material Transparency</h2><p>Health Product Declarations, Declare labels, and databases reveal chemical content for informed selection.</p>', GRADUATE: '<h2>Circular Interiors</h2><p>Design for disassembly, material reuse, and lifecycle thinking in interior fit-outs.</p>', PHD: '<h2>Research Frontiers</h2><p>Chemical migration, combined exposure effects, and building-health outcome correlations.</p>' } }],
    activities: [{ id: 'gb-in-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design a Healthy Room!', MIDDLE_SCHOOL: 'Material Hunt', HIGH_SCHOOL: 'Certification Check', UNDERGRADUATE: 'HPD Analysis', GRADUATE: 'Circular Design', PHD: 'Exposure Assessment' }, description: { ELEMENTARY: 'Pick healthy materials for a room!', MIDDLE_SCHOOL: 'Find low-VOC materials.', HIGH_SCHOOL: 'Evaluate material certifications.', UNDERGRADUATE: 'Analyze Health Product Declarations.', GRADUATE: 'Design for material circularity.', PHD: 'Assess occupant chemical exposure.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-in-game', type: 'simulation', title: 'Interior Designer', description: 'Create healthy sustainable interiors!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-in-quiz', passingScore: 80, questions: [{ id: 'gbinq1', question: { ELEMENTARY: 'What makes indoor air healthy?', MIDDLE_SCHOOL: 'What are VOCs?', HIGH_SCHOOL: 'What does low-VOC mean?', UNDERGRADUATE: 'What is an HPD?', GRADUATE: 'What is design for disassembly?', PHD: 'What is chemical migration?' }, options: { ELEMENTARY: ['Good materials that dont smell bad', 'Dirty carpets', 'Old paint', 'Dusty furniture'], MIDDLE_SCHOOL: ['Chemicals that evaporate from materials', 'Video games', 'Very old cars', 'Vegetables'], HIGH_SCHOOL: ['Materials that release few harmful chemicals', 'Very loud colors', 'No paint allowed', 'Light only'], UNDERGRADUATE: ['Health Product Declaration', 'High Performance Device', 'Heavy Plastic Door', 'Heat Protection Design'], GRADUATE: ['Making things easy to take apart and reuse', 'Breaking things', 'Permanent assembly', 'No design'], PHD: ['Chemicals moving from materials into air or dust', 'Bird migration', 'People moving', 'No movement'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Using good materials without yucky chemicals keeps the air healthy for us to breathe!', MIDDLE_SCHOOL: 'VOCs (Volatile Organic Compounds) are chemicals that evaporate from paints, carpets, and furniture.', HIGH_SCHOOL: 'Low-VOC products release fewer harmful chemicals, creating healthier indoor air.', UNDERGRADUATE: 'HPDs (Health Product Declarations) disclose chemical ingredients in building products.', GRADUATE: 'Design for disassembly allows materials to be easily separated and reused at end of life.', PHD: 'Chemical migration is how substances move from products into air, dust, or contact with occupants.' } }] },
    externalResources: [{ title: 'Healthy Materials', url: 'https://living-future.org/declare/', type: 'research' }]
  },
  {
    id: 'green-water',
    slug: 'water-efficient-buildings',
    title: 'Water-Efficient Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings can save water and help rivers and fish!',
      MIDDLE_SCHOOL: 'Discover how buildings can use less water through efficient fixtures and reuse.',
      HIGH_SCHOOL: 'Explore water-efficient fixtures, rainwater harvesting, and greywater systems.',
      UNDERGRADUATE: 'Analyze building water budgets, alternative water sources, and net zero water.',
      GRADUATE: 'Examine water reuse regulations, treatment technologies, and district water systems.',
      PHD: 'Research water-energy nexus, decentralized treatment, and climate adaptation.'
    },
    topic: 'green-building',
    category: 'WATER',
    icon: 'Droplet',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-wt-1', title: 'Saving Water in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Save Water!</h2><p>Special toilets, faucets, and showers use less water. Some buildings even collect rain and use water twice!</p>', MIDDLE_SCHOOL: '<h2>Water Efficiency</h2><p>Low-flow fixtures, rainwater collection, and reusing water can reduce building water use by half or more.</p>', HIGH_SCHOOL: '<h2>Water Strategies</h2><p>High-efficiency fixtures, rainwater harvesting, greywater reuse, and landscape irrigation reduction.</p>', UNDERGRADUATE: '<h2>Water Systems Design</h2><p>Water budgets, alternative sources, treatment requirements, and net zero water buildings.</p>', GRADUATE: '<h2>Advanced Water Systems</h2><p>On-site treatment, regulatory compliance, district systems, and blackwater recycling.</p>', PHD: '<h2>Research Frontiers</h2><p>Water-energy nexus, decentralized water infrastructure, and climate resilience.</p>' } }],
    activities: [{ id: 'gb-wt-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Water!', MIDDLE_SCHOOL: 'Efficient Fixtures', HIGH_SCHOOL: 'Rainwater System', UNDERGRADUATE: 'Water Budget', GRADUATE: 'Treatment Design', PHD: 'Nexus Analysis' }, description: { ELEMENTARY: 'Choose fixtures that save water!', MIDDLE_SCHOOL: 'Select efficient water fixtures.', HIGH_SCHOOL: 'Design a rainwater system.', UNDERGRADUATE: 'Calculate building water budget.', GRADUATE: 'Design water treatment system.', PHD: 'Analyze water-energy tradeoffs.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-wt-game', type: 'simulation', title: 'Water Saver', description: 'Design buildings that conserve every drop!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-wt-quiz', passingScore: 80, questions: [{ id: 'gbwtq1', question: { ELEMENTARY: 'How do buildings save water?', MIDDLE_SCHOOL: 'What is greywater?', HIGH_SCHOOL: 'What is rainwater harvesting?', UNDERGRADUATE: 'What is net zero water?', GRADUATE: 'What is blackwater?', PHD: 'What is the water-energy nexus?' }, options: { ELEMENTARY: ['Using special toilets and faucets', 'Using more water', 'Leaving taps running', 'Taking long showers'], MIDDLE_SCHOOL: ['Used water from sinks and showers', 'Ocean water', 'Drinking water', 'Rain water'], HIGH_SCHOOL: ['Collecting and storing rain for use', 'Stopping rain', 'Wasting rain', 'Ignoring rain'], UNDERGRADUATE: ['Building supplies own water needs', 'No water used', 'Unlimited water', 'Zero cost water'], GRADUATE: ['Wastewater from toilets', 'Clean water', 'Grey water', 'No water'], PHD: ['Connection between water and energy use', 'No connection', 'Separate systems', 'Only energy matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Special low-flow toilets and faucets use much less water to do the same job!', MIDDLE_SCHOOL: 'Greywater is gently used water from sinks and showers that can be reused for toilets or irrigation.', HIGH_SCHOOL: 'Rainwater harvesting collects rain from roofs for non-potable uses or treatment for drinking.', UNDERGRADUATE: 'Net zero water buildings supply their water needs through efficiency, reuse, and rainwater.', GRADUATE: 'Blackwater is wastewater from toilets requiring treatment before reuse.', PHD: 'The water-energy nexus describes how water treatment/pumping needs energy and energy production needs water.' } }] },
    externalResources: [{ title: 'Water Efficiency', url: 'https://www.epa.gov/watersense', type: 'article' }]
  }
]
