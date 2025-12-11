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
  }
]
