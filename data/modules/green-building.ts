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
  },
  {
    id: 'green-daylight',
    slug: 'daylighting-design',
    title: 'Daylighting Design',
    description: {
      ELEMENTARY: 'Learn how buildings can use sunlight instead of electric lights!',
      MIDDLE_SCHOOL: 'Discover how architects bring natural light deep into buildings.',
      HIGH_SCHOOL: 'Explore daylighting strategies, glare control, and occupant wellbeing.',
      UNDERGRADUATE: 'Analyze daylighting metrics, simulation tools, and design integration.',
      GRADUATE: 'Examine advanced daylighting systems, controls, and circadian lighting.',
      PHD: 'Research daylighting performance, human factors, and visual comfort science.'
    },
    topic: 'green-building',
    category: 'LIGHTING',
    icon: 'Sun',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-day-1', title: 'Light from the Sky', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Sunlight Inside!</h2><p>Good buildings let sunlight in so you dont need electric lights during the day!</p>', MIDDLE_SCHOOL: '<h2>Natural Light</h2><p>Windows, skylights, and light shelves bring daylight deep into buildings, saving energy and making people happier.</p>', HIGH_SCHOOL: '<h2>Daylighting Design</h2><p>Balancing light levels, controlling glare, and integrating with electric lighting for optimal performance.</p>', UNDERGRADUATE: '<h2>Daylight Simulation</h2><p>Using software to predict daylight levels, including spatial daylight autonomy and useful daylight illuminance.</p>', GRADUATE: '<h2>Advanced Systems</h2><p>Light redirecting films, automated shades, and circadian lighting for health.</p>', PHD: '<h2>Research Frontiers</h2><p>Visual comfort models, glare prediction, and health outcomes research.</p>' } }],
    activities: [{ id: 'gb-day-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Let the Sun In!', MIDDLE_SCHOOL: 'Window Design', HIGH_SCHOOL: 'Glare Control', UNDERGRADUATE: 'Daylight Simulation', GRADUATE: 'Control Strategy', PHD: 'Comfort Research' }, description: { ELEMENTARY: 'Design a sunny room!', MIDDLE_SCHOOL: 'Place windows for best daylight.', HIGH_SCHOOL: 'Balance daylight and glare.', UNDERGRADUATE: 'Simulate daylight performance.', GRADUATE: 'Design automated daylighting controls.', PHD: 'Research visual comfort factors.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-day-game', type: 'simulation', title: 'Daylighting Designer', description: 'Maximize natural light in buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-day-quiz', passingScore: 80, questions: [{ id: 'gbdayq1', question: { ELEMENTARY: 'Why use sunlight in buildings?', MIDDLE_SCHOOL: 'What is a light shelf?', HIGH_SCHOOL: 'What is glare?', UNDERGRADUATE: 'What is spatial daylight autonomy?', GRADUATE: 'What is circadian lighting?', PHD: 'What affects visual comfort?' }, options: { ELEMENTARY: ['Saves energy and makes you happy', 'Wastes energy', 'Makes buildings dark', 'Nothing'], MIDDLE_SCHOOL: ['A shelf that bounces light deeper inside', 'A shelf for books', 'A light bulb holder', 'A window cleaner'], HIGH_SCHOOL: ['Uncomfortable brightness from light contrast', 'Good lighting', 'No light', 'Dark areas'], UNDERGRADUATE: ['Percent of floor meeting daylight target', 'Space for light', 'Automatic lights', 'Day time only'], GRADUATE: ['Lighting designed for human biological rhythms', 'Circle lights', 'Round fixtures', 'No timing'], PHD: ['Light levels, glare, view, and variability', 'Only brightness', 'Only color', 'Nothing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Sunlight saves electricity and makes people feel happier and healthier!', MIDDLE_SCHOOL: 'Light shelves are horizontal surfaces that reflect daylight deeper into rooms.', HIGH_SCHOOL: 'Glare is excessive brightness or contrast that causes visual discomfort.', UNDERGRADUATE: 'sDA measures the percentage of floor area that meets daylight targets for most of the year.', GRADUATE: 'Circadian lighting supports human biological rhythms by varying light spectrum and intensity.', PHD: 'Visual comfort depends on light levels, glare, view quality, and appropriate variability.' } }] },
    externalResources: [{ title: 'Daylighting', url: 'https://www.energy.gov/energysaver/daylighting', type: 'article' }]
  },
  {
    id: 'green-commissioning',
    slug: 'building-commissioning',
    title: 'Building Commissioning',
    description: {
      ELEMENTARY: 'Learn how buildings get tested to make sure everything works right!',
      MIDDLE_SCHOOL: 'Discover how commissioning ensures buildings perform as designed.',
      HIGH_SCHOOL: 'Explore commissioning processes, testing protocols, and quality assurance.',
      UNDERGRADUATE: 'Analyze commissioning scope, team roles, and documentation requirements.',
      GRADUATE: 'Examine ongoing commissioning, monitoring-based approaches, and portfolio strategies.',
      PHD: 'Research commissioning effectiveness, fault detection, and performance persistence.'
    },
    topic: 'green-building',
    category: 'QUALITY',
    icon: 'CheckCircle',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-cx-1', title: 'Testing Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Does Everything Work?</h2><p>Before people move in, experts test all the systems to make sure the building works correctly!</p>', MIDDLE_SCHOOL: '<h2>Commissioning</h2><p>Commissioning is a quality process ensuring building systems are installed correctly and perform as designed.</p>', HIGH_SCHOOL: '<h2>Commissioning Process</h2><p>Design review, functional testing, performance verification, and training for building operators.</p>', UNDERGRADUATE: '<h2>Commissioning Scope</h2><p>HVAC, lighting, envelope, controls, and energy systems. Team roles and documentation.</p>', GRADUATE: '<h2>Ongoing Commissioning</h2><p>Continuous monitoring, fault detection, and maintaining performance over building life.</p>', PHD: '<h2>Research Frontiers</h2><p>Automated fault detection, performance persistence studies, and commissioning ROI.</p>' } }],
    activities: [{ id: 'gb-cx-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Test the Building!', MIDDLE_SCHOOL: 'System Check', HIGH_SCHOOL: 'Functional Test', UNDERGRADUATE: 'Cx Plan', GRADUATE: 'Monitoring Design', PHD: 'Performance Analysis' }, description: { ELEMENTARY: 'Make sure building systems work!', MIDDLE_SCHOOL: 'Check if systems work correctly.', HIGH_SCHOOL: 'Conduct functional performance tests.', UNDERGRADUATE: 'Develop a commissioning plan.', GRADUATE: 'Design an ongoing commissioning program.', PHD: 'Analyze commissioning effectiveness.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-cx-game', type: 'simulation', title: 'Commissioning Agent', description: 'Ensure buildings perform as designed!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-cx-quiz', passingScore: 80, questions: [{ id: 'gbcxq1', question: { ELEMENTARY: 'Why test buildings?', MIDDLE_SCHOOL: 'What is commissioning?', HIGH_SCHOOL: 'What is functional testing?', UNDERGRADUATE: 'Who is a commissioning agent?', GRADUATE: 'What is ongoing commissioning?', PHD: 'What is fault detection?' }, options: { ELEMENTARY: ['To make sure everything works', 'For fun', 'Not needed', 'To break things'], MIDDLE_SCHOOL: ['Quality process for building systems', 'Selling a building', 'Building commission', 'Nothing'], HIGH_SCHOOL: ['Testing systems under various conditions', 'Functionality test', 'No testing', 'Visual inspection only'], UNDERGRADUATE: ['Independent party verifying performance', 'Real estate agent', 'Building owner', 'No one'], GRADUATE: ['Continuous monitoring and optimization', 'Only at construction', 'Never again', 'One time only'], PHD: ['Automatically identifying system problems', 'Finding faults in plans', 'No detection', 'Human inspection only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Testing makes sure all the building systems work correctly before people move in!', MIDDLE_SCHOOL: 'Commissioning is a quality assurance process for building systems.', HIGH_SCHOOL: 'Functional testing verifies that systems perform correctly under various operating conditions.', UNDERGRADUATE: 'A commissioning agent is an independent party who verifies building performance.', GRADUATE: 'Ongoing commissioning continuously monitors and optimizes building performance over time.', PHD: 'Automated fault detection uses data analysis to identify when systems arent working properly.' } }] },
    externalResources: [{ title: 'Building Commissioning', url: 'https://www.bcxa.org/', type: 'research' }]
  },
  {
    id: 'green-acoustic',
    slug: 'acoustic-design',
    title: 'Acoustic Design',
    description: {
      ELEMENTARY: 'Learn how buildings can be quiet or have great sound when you need it!',
      MIDDLE_SCHOOL: 'Discover how architects control sound in buildings.',
      HIGH_SCHOOL: 'Explore acoustic design principles, materials, and noise control.',
      UNDERGRADUATE: 'Analyze acoustic metrics, prediction methods, and design strategies.',
      GRADUATE: 'Examine soundscape design, noise regulations, and sustainable acoustics.',
      PHD: 'Research acoustic performance, occupant wellbeing, and environmental noise.'
    },
    topic: 'green-building',
    category: 'COMFORT',
    icon: 'Volume2',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ac-1', title: 'Sound in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Good Sounds, Not Bad!</h2><p>Buildings should block noisy sounds from outside but let you hear clearly inside!</p>', MIDDLE_SCHOOL: '<h2>Acoustic Control</h2><p>Walls, ceilings, and special materials control how sound travels in buildings.</p>', HIGH_SCHOOL: '<h2>Acoustic Principles</h2><p>Sound absorption, transmission loss, and background noise levels for comfortable spaces.</p>', UNDERGRADUATE: '<h2>Acoustic Design</h2><p>Reverberation time, speech privacy, and impact isolation for various building types.</p>', GRADUATE: '<h2>Soundscapes</h2><p>Beyond noise control to positive acoustic environments. Sustainable acoustic materials.</p>', PHD: '<h2>Research Frontiers</h2><p>Acoustic comfort, cognitive performance, and acoustic metrics beyond noise.</p>' } }],
    activities: [{ id: 'gb-ac-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Quiet Room!', MIDDLE_SCHOOL: 'Sound Control', HIGH_SCHOOL: 'Material Selection', UNDERGRADUATE: 'Acoustic Analysis', GRADUATE: 'Soundscape Design', PHD: 'Wellbeing Research' }, description: { ELEMENTARY: 'Make a room with good sound!', MIDDLE_SCHOOL: 'Use materials to control sound.', HIGH_SCHOOL: 'Select acoustic materials.', UNDERGRADUATE: 'Analyze acoustic performance.', GRADUATE: 'Design positive soundscapes.', PHD: 'Research acoustic wellbeing.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ac-game', type: 'simulation', title: 'Acoustic Designer', description: 'Create buildings with great sound!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ac-quiz', passingScore: 80, questions: [{ id: 'gbacq1', question: { ELEMENTARY: 'What makes a room too noisy?', MIDDLE_SCHOOL: 'What does absorption do?', HIGH_SCHOOL: 'What is reverberation?', UNDERGRADUATE: 'What is STC?', GRADUATE: 'What is a soundscape?', PHD: 'How does noise affect health?' }, options: { ELEMENTARY: ['Sounds bouncing around', 'Quiet sounds', 'No sound', 'Soft materials'], MIDDLE_SCHOOL: ['Stops sound from bouncing', 'Makes sound louder', 'Creates echoes', 'Nothing'], HIGH_SCHOOL: ['Sound persisting after source stops', 'Vibration', 'Silence', 'Echo only'], UNDERGRADUATE: ['Sound Transmission Class - wall sound blocking', 'Sound Testing Check', 'Simple Transmission', 'No meaning'], GRADUATE: ['The acoustic environment as experienced', 'Only noise', 'Visual landscape', 'No concept'], PHD: ['Stress, sleep disruption, cardiovascular effects', 'No effects', 'Only hearing loss', 'Only annoyance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When sound bounces off hard surfaces, it makes rooms noisy and hard to hear in!', MIDDLE_SCHOOL: 'Absorptive materials stop sound from bouncing, reducing echoes and noise.', HIGH_SCHOOL: 'Reverberation is sound that lingers after the source stops due to reflections.', UNDERGRADUATE: 'STC rates how well a wall blocks airborne sound transmission between spaces.', GRADUATE: 'A soundscape considers the full acoustic experience, not just noise levels.', PHD: 'Noise exposure causes stress responses, disrupts sleep, and increases cardiovascular risk.' } }] },
    externalResources: [{ title: 'Acoustic Design', url: 'https://www.wbdg.org/resources/acoustic-comfort', type: 'article' }]
  },
  {
    id: 'green-renewable',
    slug: 'building-renewables',
    title: 'Building-Integrated Renewables',
    description: {
      ELEMENTARY: 'Learn how buildings can make their own electricity from sun and wind!',
      MIDDLE_SCHOOL: 'Discover how solar panels and other renewables work on buildings.',
      HIGH_SCHOOL: 'Explore building-integrated photovoltaics, solar thermal, and small wind.',
      UNDERGRADUATE: 'Analyze renewable system sizing, integration, and economic analysis.',
      GRADUATE: 'Examine net-zero energy buildings, storage integration, and grid interaction.',
      PHD: 'Research building-grid integration, advanced technologies, and community systems.'
    },
    topic: 'green-building',
    category: 'ENERGY',
    icon: 'Zap',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ren-1', title: 'Buildings Make Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Power from Your Roof!</h2><p>Solar panels on roofs can make electricity from sunlight to power the building!</p>', MIDDLE_SCHOOL: '<h2>Building Renewables</h2><p>Rooftop solar, solar water heating, and even small wind turbines can generate energy on site.</p>', HIGH_SCHOOL: '<h2>Integration Options</h2><p>Roof-mounted PV, building-integrated PV in facades, solar thermal, and hybrid systems.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Load matching, system sizing, inverter selection, and financial analysis.</p>', GRADUATE: '<h2>Net-Zero Buildings</h2><p>Achieving net-zero energy through efficiency plus on-site renewables. Storage and grid services.</p>', PHD: '<h2>Research Frontiers</h2><p>Building-integrated PV materials, community energy sharing, and transactive buildings.</p>' } }],
    activities: [{ id: 'gb-ren-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Solar Roof!', MIDDLE_SCHOOL: 'System Selection', HIGH_SCHOOL: 'Array Design', UNDERGRADUATE: 'Economic Analysis', GRADUATE: 'Net-Zero Path', PHD: 'Advanced Integration' }, description: { ELEMENTARY: 'Put solar panels on a building!', MIDDLE_SCHOOL: 'Choose renewable systems.', HIGH_SCHOOL: 'Design a solar array.', UNDERGRADUATE: 'Analyze renewable economics.', GRADUATE: 'Plan a net-zero building.', PHD: 'Research advanced integration.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ren-game', type: 'simulation', title: 'Renewable Builder', description: 'Power buildings with clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ren-quiz', passingScore: 80, questions: [{ id: 'gbrenq1', question: { ELEMENTARY: 'How do solar panels help buildings?', MIDDLE_SCHOOL: 'What is solar thermal?', HIGH_SCHOOL: 'What is BIPV?', UNDERGRADUATE: 'What is load matching?', GRADUATE: 'What is a net-zero energy building?', PHD: 'What is a transactive building?' }, options: { ELEMENTARY: ['Make electricity from sunlight', 'Block the sun', 'Cool the building only', 'Nothing'], MIDDLE_SCHOOL: ['Using sun to heat water', 'Solar for electricity only', 'Thermal means cold', 'No such thing'], HIGH_SCHOOL: ['Building-Integrated Photovoltaics', 'Big Inside Power Vault', 'Building Interior PV', 'No meaning'], UNDERGRADUATE: ['Matching generation timing to building loads', 'Loading matches', 'No matching', 'Random sizing'], GRADUATE: ['Produces as much energy as it uses annually', 'Uses no energy', 'Zero cost', 'No power needed'], PHD: ['Building participating in energy markets', 'Trade building', 'Transaction building', 'No such concept'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar panels turn sunlight into electricity to power lights, computers, and more!', MIDDLE_SCHOOL: 'Solar thermal systems use the suns heat to warm water for the building.', HIGH_SCHOOL: 'BIPV replaces conventional building materials with solar panels in facades or roofs.', UNDERGRADUATE: 'Load matching aligns renewable generation timing with when the building uses energy.', GRADUATE: 'Net-zero energy buildings produce as much renewable energy as they consume annually.', PHD: 'Transactive buildings actively participate in energy markets, buying and selling power.' } }] },
    externalResources: [{ title: 'Building Renewables', url: 'https://www.energy.gov/eere/solar/solar-energy-and-buildings', type: 'article' }]
  },
  {
    id: 'green-adaptive',
    slug: 'adaptive-reuse',
    title: 'Adaptive Reuse and Historic Preservation',
    description: {
      ELEMENTARY: 'Learn how old buildings get new lives instead of being torn down!',
      MIDDLE_SCHOOL: 'Discover how historic buildings are transformed for new uses.',
      HIGH_SCHOOL: 'Explore adaptive reuse strategies, preservation standards, and sustainability.',
      UNDERGRADUATE: 'Analyze building assessment, code compliance, and energy upgrades.',
      GRADUATE: 'Examine preservation economics, embodied carbon, and heritage sustainability.',
      PHD: 'Research lifecycle assessment, cultural value integration, and climate adaptation.'
    },
    topic: 'green-building',
    category: 'PRESERVATION',
    icon: 'Landmark',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-adapt-1', title: 'New Life for Old Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Old Buildings, New Uses!</h2><p>Instead of tearing down old buildings, we can fix them up for new purposes!</p>', MIDDLE_SCHOOL: '<h2>Adaptive Reuse</h2><p>Factories become apartments, churches become restaurants. Old buildings get new life.</p>', HIGH_SCHOOL: '<h2>Reuse vs Demolition</h2><p>Reuse preserves embodied energy and cultural heritage while often costing less than new construction.</p>', UNDERGRADUATE: '<h2>Technical Challenges</h2><p>Building assessment, structural upgrades, code compliance, and integrating modern systems.</p>', GRADUATE: '<h2>Heritage Sustainability</h2><p>Balancing preservation values with energy performance. Standards and incentives.</p>', PHD: '<h2>Research Frontiers</h2><p>Lifecycle carbon, cultural value quantification, and climate adaptation for historic buildings.</p>' } }],
    activities: [{ id: 'gb-adapt-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Transform a Building!', MIDDLE_SCHOOL: 'Reuse Planning', HIGH_SCHOOL: 'Code Compliance', UNDERGRADUATE: 'System Integration', GRADUATE: 'Preservation Standards', PHD: 'Lifecycle Research' }, description: { ELEMENTARY: 'Give an old building a new purpose!', MIDDLE_SCHOOL: 'Plan a building transformation.', HIGH_SCHOOL: 'Meet codes while preserving character.', UNDERGRADUATE: 'Integrate modern systems sensitively.', GRADUATE: 'Apply preservation standards.', PHD: 'Research historic building lifecycle.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-adapt-game', type: 'simulation', title: 'Building Transformer', description: 'Give old buildings new purpose!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-adapt-quiz', passingScore: 80, questions: [{ id: 'gbadaptq1', question: { ELEMENTARY: 'Why save old buildings?', MIDDLE_SCHOOL: 'What is adaptive reuse?', HIGH_SCHOOL: 'What is embodied energy?', UNDERGRADUATE: 'What are code challenges?', GRADUATE: 'What are the Standards?', PHD: 'Why assess lifecycle carbon?' }, options: { ELEMENTARY: ['They have history and can be reused', 'No reason', 'Always tear down', 'Old is bad'], MIDDLE_SCHOOL: ['Transforming buildings for new purposes', 'Adapting to weather', 'Reusing materials only', 'No such thing'], HIGH_SCHOOL: ['Energy used to make the building originally', 'Current energy use', 'Embodied water', 'No energy'], UNDERGRADUATE: ['Accessibility, fire safety, and structure', 'No challenges', 'Easy compliance', 'Only paint'], GRADUATE: ['Secretary of Interiors Standards for Rehabilitation', 'No standards', 'Random rules', 'Any standards'], PHD: ['Reuse often saves carbon vs new construction', 'Always build new', 'No carbon difference', 'Carbon not important'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old buildings tell our history and can often be fixed up for new uses instead of wasted!', MIDDLE_SCHOOL: 'Adaptive reuse transforms existing buildings for new purposes while preserving character.', HIGH_SCHOOL: 'Embodied energy is all the energy used to build the structure originally.', UNDERGRADUATE: 'Historic buildings may not meet modern codes for accessibility, fire safety, and structure.', GRADUATE: 'The Standards provide guidance for sensitive rehabilitation of historic buildings.', PHD: 'Lifecycle carbon analysis often shows reuse is better than demolition and new construction.' } }] },
    externalResources: [{ title: 'Adaptive Reuse', url: 'https://www.nps.gov/tps/standards.htm', type: 'research' }]
  },
  {
    id: 'green-certification',
    slug: 'green-building-certification',
    title: 'Green Building Certification',
    description: {
      ELEMENTARY: 'Learn about special awards buildings get for being green!',
      MIDDLE_SCHOOL: 'Discover how buildings earn green certifications like LEED.',
      HIGH_SCHOOL: 'Explore LEED, WELL, Passive House, and other certification systems.',
      UNDERGRADUATE: 'Analyze certification requirements, documentation, and market impacts.',
      GRADUATE: 'Examine certification effectiveness, policy linkages, and system design.',
      PHD: 'Research certification outcomes, behavioral aspects, and future directions.'
    },
    topic: 'green-building',
    category: 'CERTIFICATION',
    icon: 'Award',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-cert-1', title: 'Green Building Awards', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Green Building Badges!</h2><p>Buildings can earn special badges like LEED for being kind to the environment!</p>', MIDDLE_SCHOOL: '<h2>Green Certifications</h2><p>LEED, ENERGY STAR, and other programs rate buildings on their environmental performance.</p>', HIGH_SCHOOL: '<h2>Certification Systems</h2><p>LEED, WELL, Living Building Challenge, and Passive House each focus on different aspects of green building.</p>', UNDERGRADUATE: '<h2>Certification Process</h2><p>Credits, prerequisites, documentation, and third-party verification.</p>', GRADUATE: '<h2>Market Transformation</h2><p>How certifications drive market change, policy integration, and value creation.</p>', PHD: '<h2>Research Frontiers</h2><p>Performance gaps, certification effectiveness, and next-generation rating systems.</p>' } }],
    activities: [{ id: 'gb-cert-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Earn Green Badges!', MIDDLE_SCHOOL: 'LEED Points', HIGH_SCHOOL: 'System Comparison', UNDERGRADUATE: 'Documentation', GRADUATE: 'Policy Analysis', PHD: 'Effectiveness Study' }, description: { ELEMENTARY: 'Help a building earn green badges!', MIDDLE_SCHOOL: 'Earn LEED certification points.', HIGH_SCHOOL: 'Compare certification systems.', UNDERGRADUATE: 'Document certification requirements.', GRADUATE: 'Analyze certification policy.', PHD: 'Study certification effectiveness.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-cert-game', type: 'simulation', title: 'Certification Expert', description: 'Guide buildings to green certification!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-cert-quiz', passingScore: 80, questions: [{ id: 'gbcertq1', question: { ELEMENTARY: 'What is LEED?', MIDDLE_SCHOOL: 'How does LEED work?', HIGH_SCHOOL: 'What is the Living Building Challenge?', UNDERGRADUATE: 'What is third-party verification?', GRADUATE: 'How do certifications affect markets?', PHD: 'What is the performance gap?' }, options: { ELEMENTARY: ['A green building award', 'A type of plant', 'A building material', 'A tool'], MIDDLE_SCHOOL: ['Buildings earn points for green features', 'Random selection', 'Only new buildings', 'No requirements'], HIGH_SCHOOL: ['Rigorous standard requiring net-positive impact', 'Easy certification', 'Only energy', 'No such thing'], UNDERGRADUATE: ['Independent review of claims', 'Self-certification', 'No verification', 'Government review only'], GRADUATE: ['Create demand for green buildings and professionals', 'No market effect', 'Lower prices', 'Less construction'], PHD: ['Actual performance differs from design predictions', 'Perfect performance', 'No gap', 'Only in old buildings'] }, correctIndex: 0, explanation: { ELEMENTARY: 'LEED is like a gold star that buildings earn for being good to the environment!', MIDDLE_SCHOOL: 'Buildings earn points for energy savings, water efficiency, materials, and other green features.', HIGH_SCHOOL: 'Living Building Challenge requires buildings to generate more energy and water than they use.', UNDERGRADUATE: 'Third-party verification means an independent organization reviews documentation and confirms compliance.', GRADUATE: 'Certifications create market signals, differentiate buildings, and drive professional training.', PHD: 'The performance gap shows certified buildings often use more energy than predicted in design.' } }] },
    externalResources: [{ title: 'LEED', url: 'https://www.usgbc.org/leed', type: 'research' }]
  },
  {
    id: 'green-healthy-materials',
    slug: 'healthy-building-materials',
    title: 'Healthy Building Materials',
    description: {
      ELEMENTARY: 'Learn about building materials that keep people healthy!',
      MIDDLE_SCHOOL: 'Discover how to choose materials that are safe for people.',
      HIGH_SCHOOL: 'Explore material health, transparency labels, and red list chemicals.',
      UNDERGRADUATE: 'Analyze material health assessment, product transparency, and specification.',
      GRADUATE: 'Examine material health research, policy frameworks, and market transformation.',
      PHD: 'Research toxicology, exposure pathways, and advancing material health science.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Heart',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-healthy-1', title: 'Safe Building Materials', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Healthy Materials!</h2><p>Some building materials can make people sick. We choose safe materials to keep everyone healthy!</p>', MIDDLE_SCHOOL: '<h2>Material Safety</h2><p>Some paints, flooring, and furniture can release harmful chemicals. Healthy materials avoid these.</p>', HIGH_SCHOOL: '<h2>Chemical Concerns</h2><p>VOCs, flame retardants, and other chemicals in materials affect indoor air quality and health.</p>', UNDERGRADUATE: '<h2>Material Assessment</h2><p>Declare labels, HPDs, and Cradle to Cradle certification reveal material ingredients.</p>', GRADUATE: '<h2>Market Transformation</h2><p>Driving healthier products through specification, policy, and consumer demand.</p>', PHD: '<h2>Research Frontiers</h2><p>Exposure science, health outcome studies, and advancing safer chemistry.</p>' } }],
    activities: [{ id: 'gb-healthy-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Choose Safe Materials!', MIDDLE_SCHOOL: 'Material Check', HIGH_SCHOOL: 'Label Reading', UNDERGRADUATE: 'Specification', GRADUATE: 'Policy Design', PHD: 'Exposure Research' }, description: { ELEMENTARY: 'Pick healthy materials for buildings!', MIDDLE_SCHOOL: 'Check materials for safety.', HIGH_SCHOOL: 'Read and compare product labels.', UNDERGRADUATE: 'Specify healthy materials.', GRADUATE: 'Design material health policy.', PHD: 'Research exposure pathways.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-healthy-game', type: 'simulation', title: 'Material Health Detective', description: 'Find the healthiest building materials!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-healthy-quiz', passingScore: 80, questions: [{ id: 'gbhealthyq1', question: { ELEMENTARY: 'What are healthy materials?', MIDDLE_SCHOOL: 'What are VOCs?', HIGH_SCHOOL: 'What is a Declare label?', UNDERGRADUATE: 'What is an HPD?', GRADUATE: 'What is red list?', PHD: 'What is exposure science?' }, options: { ELEMENTARY: ['Materials that dont make people sick', 'Any materials', 'Only expensive materials', 'Old materials'], MIDDLE_SCHOOL: ['Chemicals that evaporate into air', 'Vitamins', 'Only outdoor chemicals', 'Voice Over Chemicals'], HIGH_SCHOOL: ['Product ingredient transparency label', 'A declaration', 'Government label', 'No such thing'], UNDERGRADUATE: ['Health Product Declaration', 'Home Product Details', 'Hazard Prevention Document', 'No meaning'], GRADUATE: ['List of chemicals to avoid in buildings', 'List of red materials', 'Fire danger list', 'No such list'], PHD: ['Studying how people contact chemicals', 'Only exposure to sun', 'No such field', 'Photography'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Healthy materials are building products that dont have chemicals that can make people sick!', MIDDLE_SCHOOL: 'VOCs (Volatile Organic Compounds) are chemicals that evaporate from materials into the air we breathe.', HIGH_SCHOOL: 'Declare labels disclose product ingredients so designers can choose healthier materials.', UNDERGRADUATE: 'HPDs are standardized reports of product contents and health hazards.', GRADUATE: 'The Red List identifies chemicals to avoid due to health or environmental harm.', PHD: 'Exposure science studies how, when, and how much people come into contact with chemicals.' } }] },
    externalResources: [{ title: 'Material Health', url: 'https://living-future.org/declare/', type: 'research' }]
  },
  {
    id: 'green-living-roof',
    slug: 'green-roofs-walls',
    title: 'Green Roofs and Living Walls',
    description: {
      ELEMENTARY: 'Learn how plants can grow on roofs and walls of buildings!',
      MIDDLE_SCHOOL: 'Discover green roofs and living walls that bring nature to buildings.',
      HIGH_SCHOOL: 'Explore green roof types, benefits, and design considerations.',
      UNDERGRADUATE: 'Analyze green infrastructure design, stormwater management, and thermal benefits.',
      GRADUATE: 'Examine urban ecology, policy incentives, and maintenance programs.',
      PHD: 'Research ecosystem services, performance modeling, and climate adaptation.'
    },
    topic: 'green-building',
    category: 'LANDSCAPE',
    icon: 'Sprout',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-living-1', title: 'Gardens in the Sky', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Rooftop Gardens!</h2><p>Plants can grow on building roofs, keeping buildings cool and giving homes to birds and bees!</p>', MIDDLE_SCHOOL: '<h2>Green Roofs</h2><p>Green roofs are covered with plants. They absorb rain, insulate buildings, and create wildlife habitat.</p>', HIGH_SCHOOL: '<h2>Types and Design</h2><p>Extensive green roofs have shallow soil; intensive roofs can support trees. Living walls add vertical greenery.</p>', UNDERGRADUATE: '<h2>Performance Benefits</h2><p>Stormwater retention, urban heat island reduction, energy savings, and biodiversity.</p>', GRADUATE: '<h2>Policy and Programs</h2><p>Green roof requirements, incentives, and maintenance for long-term success.</p>', PHD: '<h2>Research Frontiers</h2><p>Ecosystem service quantification, substrate innovation, and climate adaptation.</p>' } }],
    activities: [{ id: 'gb-living-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Roof!', MIDDLE_SCHOOL: 'Green Roof Design', HIGH_SCHOOL: 'System Selection', UNDERGRADUATE: 'Performance Analysis', GRADUATE: 'Policy Development', PHD: 'Research Design' }, description: { ELEMENTARY: 'Create a garden on a roof!', MIDDLE_SCHOOL: 'Design a green roof.', HIGH_SCHOOL: 'Select green roof systems.', UNDERGRADUATE: 'Analyze performance benefits.', GRADUATE: 'Develop green roof policy.', PHD: 'Design green roof research.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-living-game', type: 'simulation', title: 'Green Roof Designer', description: 'Create living roofs and walls!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-living-quiz', passingScore: 80, questions: [{ id: 'gblivingq1', question: { ELEMENTARY: 'What is a green roof?', MIDDLE_SCHOOL: 'How do green roofs help?', HIGH_SCHOOL: 'What is an extensive green roof?', UNDERGRADUATE: 'What is urban heat island?', GRADUATE: 'What makes green roofs last?', PHD: 'What are ecosystem services?' }, options: { ELEMENTARY: ['A roof with plants growing on it', 'A green painted roof', 'A roof made of plants', 'No such thing'], MIDDLE_SCHOOL: ['Absorb rain, insulate, and support wildlife', 'No benefits', 'Only look nice', 'Just expensive'], HIGH_SCHOOL: ['Shallow soil and hardy plants', 'Deep soil for trees', 'No plants', 'Just rocks'], UNDERGRADUATE: ['Cities being hotter than surroundings', 'A heat island', 'Only in tropics', 'No such effect'], GRADUATE: ['Proper design, installation, and maintenance', 'No maintenance needed', 'Replace often', 'Random factors'], PHD: ['Benefits nature provides to people', 'Ecosystem destruction', 'Only plants', 'No services'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A green roof is covered with plants that grow right on top of a building!', MIDDLE_SCHOOL: 'Green roofs absorb rainwater, keep buildings cooler, and provide habitat for birds and insects.', HIGH_SCHOOL: 'Extensive green roofs have 2-6 inches of soil and hardy plants requiring little maintenance.', UNDERGRADUATE: 'Urban heat island effect makes cities significantly warmer than surrounding rural areas.', GRADUATE: 'Long-lasting green roofs require proper waterproofing, drainage, substrate, and maintenance programs.', PHD: 'Ecosystem services are the benefits people get from nature: clean air, water filtration, pollination.' } }] },
    externalResources: [{ title: 'Green Roofs', url: 'https://www.greenroofs.org/', type: 'research' }]
  },
  {
    id: 'green-performance',
    slug: 'building-performance-monitoring',
    title: 'Building Performance Monitoring',
    description: {
      ELEMENTARY: 'Learn how we check if buildings are using energy wisely!',
      MIDDLE_SCHOOL: 'Discover how buildings are monitored to save energy.',
      HIGH_SCHOOL: 'Explore energy monitoring, benchmarking, and building automation.',
      UNDERGRADUATE: 'Analyze building analytics, fault detection, and continuous commissioning.',
      GRADUATE: 'Examine performance policy, disclosure requirements, and portfolio management.',
      PHD: 'Research machine learning applications, occupant feedback, and advanced analytics.'
    },
    topic: 'green-building',
    category: 'OPERATIONS',
    icon: 'Activity',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-perf-1', title: 'Watching Building Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Detectives!</h2><p>We can watch how much energy buildings use and find ways to save more!</p>', MIDDLE_SCHOOL: '<h2>Building Monitoring</h2><p>Meters, sensors, and dashboards track energy, water, and comfort in real time.</p>', HIGH_SCHOOL: '<h2>Benchmarking</h2><p>Comparing building energy use to similar buildings reveals opportunities for improvement.</p>', UNDERGRADUATE: '<h2>Building Analytics</h2><p>Data analysis identifies faults, optimizes operations, and enables predictive maintenance.</p>', GRADUATE: '<h2>Policy Frameworks</h2><p>Benchmarking laws, disclosure requirements, and performance standards.</p>', PHD: '<h2>Research Frontiers</h2><p>Machine learning, digital twins, and advanced fault detection.</p>' } }],
    activities: [{ id: 'gb-perf-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Track Energy!', MIDDLE_SCHOOL: 'Dashboard Design', HIGH_SCHOOL: 'Benchmarking', UNDERGRADUATE: 'Fault Detection', GRADUATE: 'Policy Analysis', PHD: 'ML Application' }, description: { ELEMENTARY: 'Watch how buildings use energy!', MIDDLE_SCHOOL: 'Design an energy dashboard.', HIGH_SCHOOL: 'Benchmark building energy.', UNDERGRADUATE: 'Detect system faults.', GRADUATE: 'Analyze performance policy.', PHD: 'Apply machine learning.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-perf-game', type: 'simulation', title: 'Performance Monitor', description: 'Optimize building performance!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-perf-quiz', passingScore: 80, questions: [{ id: 'gbperfq1', question: { ELEMENTARY: 'Why monitor building energy?', MIDDLE_SCHOOL: 'What does a dashboard show?', HIGH_SCHOOL: 'What is benchmarking?', UNDERGRADUATE: 'What is fault detection?', GRADUATE: 'What is energy disclosure?', PHD: 'What is a digital twin?' }, options: { ELEMENTARY: ['To find ways to save energy', 'No reason', 'To use more energy', 'Just for fun'], MIDDLE_SCHOOL: ['Energy use in real time', 'Only car dashboards', 'Nothing useful', 'Stock prices'], HIGH_SCHOOL: ['Comparing to similar buildings', 'Making benches', 'Random comparison', 'No comparison'], UNDERGRADUATE: ['Finding problems in building systems', 'Finding human faults', 'No detection', 'Only major faults'], GRADUATE: ['Requiring buildings to report energy use', 'Hiding energy use', 'No requirements', 'Only new buildings'], PHD: ['Virtual model of a building', 'Twin buildings', 'Two dashboards', 'No such thing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'By watching energy use, we can find problems and save energy!', MIDDLE_SCHOOL: 'Dashboards show energy use, water use, and comfort conditions in real time.', HIGH_SCHOOL: 'Benchmarking compares a buildings energy use to similar buildings to find improvement opportunities.', UNDERGRADUATE: 'Fault detection analytics identify equipment problems and operational issues from data.', GRADUATE: 'Energy disclosure laws require buildings to report energy use for transparency.', PHD: 'Digital twins are virtual models of buildings that enable simulation and optimization.' } }] },
    externalResources: [{ title: 'Building Performance', url: 'https://www.energystar.gov/buildings/benchmark', type: 'research' }]
  },
  {
    id: 'green-resilient',
    slug: 'climate-resilient-buildings',
    title: 'Climate-Resilient Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings stay safe during storms, floods, and heat waves!',
      MIDDLE_SCHOOL: 'Discover how buildings are designed to handle extreme weather.',
      HIGH_SCHOOL: 'Explore climate risk assessment and resilient design strategies.',
      UNDERGRADUATE: 'Analyze building vulnerability, adaptation measures, and resilience standards.',
      GRADUATE: 'Examine climate risk disclosure, resilience policy, and insurance implications.',
      PHD: 'Research climate projections, damage functions, and adaptation pathways.'
    },
    topic: 'green-building',
    category: 'RESILIENCE',
    icon: 'Shield',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-resil-1', title: 'Weather-Ready Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Strong Buildings!</h2><p>Buildings can be made to handle storms, floods, and very hot days to keep people safe!</p>', MIDDLE_SCHOOL: '<h2>Climate Resilience</h2><p>Resilient buildings can survive and recover from floods, storms, heat waves, and other climate impacts.</p>', HIGH_SCHOOL: '<h2>Climate Risks</h2><p>Rising seas, stronger storms, heat waves, and flooding require new design approaches.</p>', UNDERGRADUATE: '<h2>Resilience Measures</h2><p>Flood protection, wind resistance, passive survivability, and backup systems.</p>', GRADUATE: '<h2>Policy and Finance</h2><p>Building codes, insurance, disclosure, and investment in resilience.</p>', PHD: '<h2>Research Frontiers</h2><p>Climate projections, vulnerability modeling, and adaptation effectiveness.</p>' } }],
    activities: [{ id: 'gb-resil-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Storm-Proof Building!', MIDDLE_SCHOOL: 'Risk Assessment', HIGH_SCHOOL: 'Resilience Design', UNDERGRADUATE: 'Vulnerability Analysis', GRADUATE: 'Policy Development', PHD: 'Adaptation Research' }, description: { ELEMENTARY: 'Make buildings safe from storms!', MIDDLE_SCHOOL: 'Assess climate risks.', HIGH_SCHOOL: 'Design for resilience.', UNDERGRADUATE: 'Analyze building vulnerability.', GRADUATE: 'Develop resilience policy.', PHD: 'Research adaptation measures.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-resil-game', type: 'simulation', title: 'Resilience Builder', description: 'Design climate-ready buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-resil-quiz', passingScore: 80, questions: [{ id: 'gbresillq1', question: { ELEMENTARY: 'What is a resilient building?', MIDDLE_SCHOOL: 'What climate risks affect buildings?', HIGH_SCHOOL: 'What is passive survivability?', UNDERGRADUATE: 'What is a vulnerability assessment?', GRADUATE: 'Why disclose climate risk?', PHD: 'What are damage functions?' }, options: { ELEMENTARY: ['A building that stays safe in bad weather', 'A bouncy building', 'A weak building', 'Any building'], MIDDLE_SCHOOL: ['Floods, storms, and extreme heat', 'No risks', 'Only cold', 'Only rain'], HIGH_SCHOOL: ['Maintaining livable conditions without power', 'Passive heating', 'No survivability', 'Active systems only'], UNDERGRADUATE: ['Identifying climate risks to a building', 'No assessment needed', 'Random guessing', 'Only new buildings'], GRADUATE: ['Inform decisions and price risk', 'Hide problems', 'No benefit', 'Only for insurance'], PHD: ['Relationships between hazards and building damage', 'Random damage', 'No functions', 'Only structural'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Resilient buildings are designed to stay safe and working during storms, floods, and heat waves!', MIDDLE_SCHOOL: 'Buildings face risks from flooding, high winds, extreme heat, and other climate impacts.', HIGH_SCHOOL: 'Passive survivability means a building maintains safe temperatures even without power.', UNDERGRADUATE: 'Vulnerability assessments identify which climate hazards pose risks to a specific building.', GRADUATE: 'Climate risk disclosure informs investment decisions and helps price insurance accurately.', PHD: 'Damage functions model how hazard intensity relates to physical damage and economic loss.' } }] },
    externalResources: [{ title: 'Climate Resilience', url: 'https://www.usgbc.org/resources/resilience', type: 'research' }]
  },
  {
    id: 'green-netzero',
    slug: 'net-zero-carbon-buildings',
    title: 'Net Zero Carbon Buildings',
    description: {
      ELEMENTARY: 'Learn about buildings that dont add any bad stuff to the air!',
      MIDDLE_SCHOOL: 'Discover buildings that produce zero carbon emissions.',
      HIGH_SCHOOL: 'Explore net zero carbon strategies, embodied carbon, and operational carbon.',
      UNDERGRADUATE: 'Analyze whole-life carbon assessment, reduction strategies, and offsetting.',
      GRADUATE: 'Examine net zero policy, carbon accounting standards, and decarbonization pathways.',
      PHD: 'Research carbon modeling, reduction verification, and building sector decarbonization.'
    },
    topic: 'green-building',
    category: 'CARBON',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-nz-1', title: 'Zero Carbon Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clean Air Buildings!</h2><p>Net zero buildings dont add pollution to the air because they use clean energy and smart design!</p>', MIDDLE_SCHOOL: '<h2>Net Zero Carbon</h2><p>Net zero carbon buildings eliminate or offset all carbon emissions from energy and materials.</p>', HIGH_SCHOOL: '<h2>Carbon Strategies</h2><p>Reducing operational energy, using renewable energy, and choosing low-carbon materials.</p>', UNDERGRADUATE: '<h2>Whole-Life Carbon</h2><p>Accounting for embodied carbon in materials plus operational carbon over building lifespan.</p>', GRADUATE: '<h2>Policy and Standards</h2><p>Net zero commitments, carbon accounting frameworks, and verification requirements.</p>', PHD: '<h2>Research Frontiers</h2><p>Carbon modeling accuracy, reduction pathway optimization, and sector decarbonization.</p>' } }],
    activities: [{ id: 'gb-nz-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Zero Carbon Design!', MIDDLE_SCHOOL: 'Carbon Calculator', HIGH_SCHOOL: 'Reduction Strategy', UNDERGRADUATE: 'Life Cycle Assessment', GRADUATE: 'Policy Analysis', PHD: 'Decarbonization Model' }, description: { ELEMENTARY: 'Design a clean air building!', MIDDLE_SCHOOL: 'Calculate building carbon.', HIGH_SCHOOL: 'Plan carbon reductions.', UNDERGRADUATE: 'Assess whole-life carbon.', GRADUATE: 'Analyze net zero policies.', PHD: 'Model decarbonization pathways.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-nz-game', type: 'simulation', title: 'Carbon Zero Builder', description: 'Eliminate building carbon!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-nz-quiz', passingScore: 80, questions: [{ id: 'gbnzq1', question: { ELEMENTARY: 'What is a net zero building?', MIDDLE_SCHOOL: 'What are the two types of building carbon?', HIGH_SCHOOL: 'What is embodied carbon?', UNDERGRADUATE: 'What is whole-life carbon?', GRADUATE: 'What is carbon accounting?', PHD: 'What is sectoral decarbonization?' }, options: { ELEMENTARY: ['A building that doesnt add pollution to the air', 'A building with no numbers', 'A building with no walls', 'Any building'], MIDDLE_SCHOOL: ['Embodied carbon and operational carbon', 'Black and white carbon', 'No carbon types', 'Only one type'], HIGH_SCHOOL: ['Carbon released making building materials', 'Carbon in the building', 'Operational carbon', 'No such thing'], UNDERGRADUATE: ['Total carbon from materials and operations over building life', 'Only construction', 'Only operations', 'Short-term carbon'], GRADUATE: ['Measuring and tracking carbon emissions', 'Counting money', 'No accounting', 'Random tracking'], PHD: ['Reducing emissions across an entire sector', 'Single building', 'Only energy', 'No reduction'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Net zero buildings use clean energy and smart design so they dont add pollution to the air!', MIDDLE_SCHOOL: 'Buildings have embodied carbon from materials and operational carbon from energy use.', HIGH_SCHOOL: 'Embodied carbon is the emissions from making, transporting, and installing building materials.', UNDERGRADUATE: 'Whole-life carbon includes embodied carbon plus all operational carbon over the building lifespan.', GRADUATE: 'Carbon accounting systematically measures and tracks emissions to enable management and reduction.', PHD: 'Sectoral decarbonization develops pathways to eliminate emissions across the entire building sector.' } }] },
    externalResources: [{ title: 'Net Zero Buildings', url: 'https://architecture2030.org/', type: 'research' }]
  },
  {
    id: 'green-biophilic',
    slug: 'biophilic-design',
    title: 'Biophilic Design',
    description: {
      ELEMENTARY: 'Learn how buildings can bring nature inside to make people happy!',
      MIDDLE_SCHOOL: 'Discover how connecting with nature in buildings improves wellbeing.',
      HIGH_SCHOOL: 'Explore biophilic design principles, patterns, and health benefits.',
      UNDERGRADUATE: 'Analyze biophilic design frameworks, implementation strategies, and research evidence.',
      GRADUATE: 'Examine biophilic urbanism, economic benefits, and organizational applications.',
      PHD: 'Research biophilia science, design effectiveness, and human-nature relationships.'
    },
    topic: 'green-building',
    category: 'WELLNESS',
    icon: 'Flower',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-bio-1', title: 'Nature in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Bringing Nature Inside!</h2><p>Buildings with plants, sunlight, water, and nature views make people feel happy and healthy!</p>', MIDDLE_SCHOOL: '<h2>Biophilic Design</h2><p>Biophilic design brings nature into buildings through plants, natural light, water, and organic shapes.</p>', HIGH_SCHOOL: '<h2>Design Patterns</h2><p>Fourteen patterns of biophilic design including nature in space, natural analogues, and nature of space.</p>', UNDERGRADUATE: '<h2>Implementation</h2><p>Integrating biophilic elements into building design, operations, and renovation.</p>', GRADUATE: '<h2>Business Case</h2><p>Productivity, health, and property value benefits of biophilic design.</p>', PHD: '<h2>Research Frontiers</h2><p>Biophilia hypothesis, dose-response relationships, and design effectiveness.</p>' } }],
    activities: [{ id: 'gb-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Nature Room!', MIDDLE_SCHOOL: 'Biophilic Plan', HIGH_SCHOOL: 'Pattern Application', UNDERGRADUATE: 'Design Integration', GRADUATE: 'Business Analysis', PHD: 'Research Design' }, description: { ELEMENTARY: 'Add nature to a room!', MIDDLE_SCHOOL: 'Plan biophilic elements.', HIGH_SCHOOL: 'Apply design patterns.', UNDERGRADUATE: 'Integrate biophilic design.', GRADUATE: 'Analyze economic benefits.', PHD: 'Design biophilia research.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-bio-game', type: 'simulation', title: 'Biophilic Builder', description: 'Design spaces that connect with nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-bio-quiz', passingScore: 80, questions: [{ id: 'gbbioq1', question: { ELEMENTARY: 'What is biophilic design?', MIDDLE_SCHOOL: 'How does nature help in buildings?', HIGH_SCHOOL: 'What are natural analogues?', UNDERGRADUATE: 'What is prospect and refuge?', GRADUATE: 'What is the productivity benefit?', PHD: 'What is the biophilia hypothesis?' }, options: { ELEMENTARY: ['Design that brings nature into buildings', 'Fear of nature', 'Keeping nature out', 'Robot design'], MIDDLE_SCHOOL: ['Makes people healthier and happier', 'No benefit', 'Makes buildings weak', 'Only looks nice'], HIGH_SCHOOL: ['Design elements that mimic nature', 'Actual nature only', 'Nothing natural', 'Technology'], UNDERGRADUATE: ['Views with both openness and shelter', 'Only open views', 'Only enclosed spaces', 'No views'], GRADUATE: ['Workers are more productive in biophilic spaces', 'No difference', 'Less productive', 'Same productivity'], PHD: ['Humans have innate need to connect with nature', 'Humans avoid nature', 'No connection needed', 'Only cultural'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Biophilic design brings nature into buildings with plants, light, water, and natural materials!', MIDDLE_SCHOOL: 'Connecting with nature in buildings reduces stress, improves focus, and boosts happiness.', HIGH_SCHOOL: 'Natural analogues are design elements like organic shapes and natural materials that evoke nature.', UNDERGRADUATE: 'Prospect and refuge combines open views (prospect) with protected spaces (refuge) for psychological comfort.', GRADUATE: 'Research shows 6-12% productivity gains in biophilic workplaces from reduced stress and better focus.', PHD: 'The biophilia hypothesis proposes that humans have an evolved, innate affinity for nature and living systems.' } }] },
    externalResources: [{ title: 'Biophilic Design', url: 'https://www.terrapinbrightgreen.com/report/14-patterns/', type: 'research' }]
  },
  {
    id: 'green-future',
    slug: 'green-building-future',
    title: 'Green Building Future',
    description: {
      ELEMENTARY: 'Explore how buildings of the future will be super green and amazing!',
      MIDDLE_SCHOOL: 'Discover the future of buildings that help the planet and people.',
      HIGH_SCHOOL: 'Examine emerging trends and transformative potential of green building.',
      UNDERGRADUATE: 'Analyze innovation trajectories, market transformation, and scaling strategies.',
      GRADUATE: 'Evaluate policy pathways, investment trends, and sector transformation.',
      PHD: 'Synthesize research frontiers, modeling approaches, and built environment decarbonization.'
    },
    topic: 'green-building',
    category: 'FUTURE',
    icon: 'Sparkles',
    color: 'ocean',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 45, HIGH_SCHOOL: 60, UNDERGRADUATE: 90, GRADUATE: 120, PHD: 180 },
    isMasterclass: true,
    lessons: [{ id: 'gb-fut-1', title: 'Buildings of Tomorrow', order: 1, duration: 20, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Amazing Future Buildings!</h2><p>Future buildings will make their own energy, clean the air, and be wonderful places to live and work!</p>', MIDDLE_SCHOOL: '<h2>Green Building Future</h2><p>Buildings will become net positive - generating more energy, cleaning air, and enhancing nature.</p>', HIGH_SCHOOL: '<h2>Transformation Trends</h2><p>Mass timber, building-integrated renewables, smart systems, and regenerative design are reshaping construction.</p>', UNDERGRADUATE: '<h2>Market Transformation</h2><p>Policy drivers, technology innovation, and market demand accelerating green building adoption.</p>', GRADUATE: '<h2>Sector Decarbonization</h2><p>Pathways to zero-carbon buildings, retrofit strategies, and embodied carbon reduction.</p>', PHD: '<h2>Research Synthesis</h2><p>Integrating building science, policy analysis, and economics for built environment transformation.</p>' } }],
    activities: [{ id: 'gb-fut-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Future Building Dream!', MIDDLE_SCHOOL: 'Vision Design', HIGH_SCHOOL: 'Trend Analysis', UNDERGRADUATE: 'Market Strategy', GRADUATE: 'Policy Design', PHD: 'Synthesis Research' }, description: { ELEMENTARY: 'Design buildings of the future!', MIDDLE_SCHOOL: 'Create a green building vision.', HIGH_SCHOOL: 'Analyze transformation trends.', UNDERGRADUATE: 'Develop market strategy.', GRADUATE: 'Design transformative policies.', PHD: 'Synthesize research for transformation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-fut-game', type: 'simulation', title: 'Building Revolution', description: 'Transform the built environment!', rounds: 7, timeLimit: 60, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-fut-quiz', passingScore: 80, questions: [{ id: 'gfutq1', question: { ELEMENTARY: 'What will future buildings do?', MIDDLE_SCHOOL: 'What is a net positive building?', HIGH_SCHOOL: 'What is mass timber?', UNDERGRADUATE: 'What drives market transformation?', GRADUATE: 'What is deep retrofit?', PHD: 'What is technology forcing?' }, options: { ELEMENTARY: ['Make energy, clean air, and help nature', 'Pollute more', 'Use more resources', 'Stay the same'], MIDDLE_SCHOOL: ['A building that gives back more than it takes', 'A building that takes more', 'A normal building', 'A negative building'], HIGH_SCHOOL: ['Large engineered wood products for construction', 'Very heavy timber', 'Timber from massive trees', 'Any wood'], UNDERGRADUATE: ['Policy, technology, and consumer demand', 'Only price', 'Only regulations', 'Random factors'], GRADUATE: ['Comprehensive renovation to very high performance', 'Minor repairs', 'Cosmetic updates', 'Demolition'], PHD: ['Policy that drives technology development', 'Technology driving policy', 'No connection', 'Random development'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Future buildings will make clean energy, purify air, and create homes for plants and animals!', MIDDLE_SCHOOL: 'Net positive buildings produce more energy, clean more air, and provide more benefits than they consume.', HIGH_SCHOOL: 'Mass timber is large-scale engineered wood that can replace steel and concrete in construction.', UNDERGRADUATE: 'Market transformation requires aligned policy drivers, technological innovation, and consumer demand.', GRADUATE: 'Deep retrofits comprehensively upgrade existing buildings to achieve dramatic energy reductions.', PHD: 'Technology forcing policies set standards beyond current capability, driving innovation to meet them.' } }] },
    externalResources: [{ title: 'Future of Buildings', url: 'https://www.wgbc.org/', type: 'research' }]
  }
]
