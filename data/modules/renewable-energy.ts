// Renewable Energy Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const renewableEnergyModules: Module[] = [
  // Module 1: Solar Power Basics
  {
    id: 'renewable-solar',
    slug: 'solar-power-basics',
    title: 'Solar Power Basics',
    description: {
      ELEMENTARY: 'Learn how sunshine becomes electricity to power our homes!',
      MIDDLE_SCHOOL: 'Discover how solar panels convert sunlight into usable energy.',
      HIGH_SCHOOL: 'Explore photovoltaic technology, solar cell chemistry, and system design.',
      UNDERGRADUATE: 'Analyze PV system engineering, grid integration, and economic factors.',
      GRADUATE: 'Examine advanced PV technologies, degradation mechanisms, and policy impacts.',
      PHD: 'Research next-generation solar materials, tandem cells, and theoretical efficiency limits.'
    },
    topic: 'renewable-energy',
    category: 'SOLAR',
    icon: 'Sun',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 're-solar-1',
        title: 'Sunshine to Electricity',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>☀️ Power from the Sun!</h2><p>The sun sends us free energy every day! Solar panels catch this energy and turn it into electricity.</p><h3>How It Works</h3><ul><li>☀️ Sunlight hits the solar panel</li><li>⚡ Special materials make electricity</li><li>🔌 Wires carry power to your home</li><li>💡 Lights turn on!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Photovoltaic Energy</h2><h3>Solar Panel Basics</h3><p>Solar panels contain photovoltaic (PV) cells made of silicon. When light hits them, electrons start moving - that's electricity!</p><h3>Key Components</h3><ul><li><strong>Solar cells:</strong> Convert light to DC electricity</li><li><strong>Inverter:</strong> Changes DC to AC for your home</li><li><strong>Mounting:</strong> Holds panels at the right angle</li><li><strong>Meter:</strong> Tracks energy produced</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>PV Technology</h2><h3>The Photovoltaic Effect</h3><p>When photons hit silicon, they knock electrons loose, creating current. P-N junctions create an electric field that directs electron flow.</p><h3>Cell Types</h3><ul><li><strong>Monocrystalline:</strong> 20-22% efficiency, highest cost</li><li><strong>Polycrystalline:</strong> 15-17% efficiency, lower cost</li><li><strong>Thin-film:</strong> 10-13% efficiency, flexible</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>PV System Engineering</h2><h3>System Design</h3><ul><li>Load analysis and sizing</li><li>Orientation and tilt optimization</li><li>String and inverter configuration</li><li>Shading analysis</li></ul><h3>Performance Metrics</h3><ul><li>Capacity factor (typically 15-25%)</li><li>Performance ratio</li><li>Levelized cost of energy (LCOE)</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced PV Systems</h2><h3>Emerging Technologies</h3><ul><li>Bifacial modules</li><li>Tracking systems</li><li>Building-integrated PV (BIPV)</li><li>Floating solar</li></ul><h3>Grid Integration</h3><p>Variability management, curtailment, and storage pairing.</p></div>`,
          PHD: `<div class="lesson-content"><h2>PV Research Frontiers</h2><h3>Next-Generation Materials</h3><ul><li>Perovskites and stability challenges</li><li>Tandem cells approaching 30%</li><li>Quantum dots and hot carriers</li></ul><h3>Theoretical Limits</h3><p>Shockley-Queisser limit and strategies to exceed it.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 're-solar-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Solar House!',
          MIDDLE_SCHOOL: 'Design a Solar System',
          HIGH_SCHOOL: 'Calculate Panel Output',
          UNDERGRADUATE: 'System Sizing Tool',
          GRADUATE: 'Grid Integration Model',
          PHD: 'Cell Efficiency Analysis'
        },
        description: {
          ELEMENTARY: 'Place solar panels on a house to power different rooms!',
          MIDDLE_SCHOOL: 'Design a solar system for a home and see how much power it makes.',
          HIGH_SCHOOL: 'Calculate energy output based on location and panel specs.',
          UNDERGRADUATE: 'Size a complete PV system for a commercial building.',
          GRADUATE: 'Model grid impacts of high PV penetration.',
          PHD: 'Analyze efficiency losses in multi-junction cells.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 're-solar-game',
      type: 'simulation',
      title: 'Solar Engineer',
      description: 'Design and optimize solar power systems!',
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
      id: 're-solar-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rsq1',
          question: {
            ELEMENTARY: 'What do solar panels turn into electricity?',
            MIDDLE_SCHOOL: 'What material are most solar cells made from?',
            HIGH_SCHOOL: 'Which solar cell type has the highest efficiency?',
            UNDERGRADUATE: 'What is a typical capacity factor for solar PV?',
            GRADUATE: 'What technology can capture light on both sides of a panel?',
            PHD: 'What is the Shockley-Queisser limit for single junction cells?'
          },
          options: {
            ELEMENTARY: ['Sunlight', 'Wind', 'Water', 'Rocks'],
            MIDDLE_SCHOOL: ['Silicon', 'Plastic', 'Glass', 'Wood'],
            HIGH_SCHOOL: ['Monocrystalline', 'Polycrystalline', 'Thin-film', 'Organic'],
            UNDERGRADUATE: ['15-25%', '50-60%', '80-90%', '5-10%'],
            GRADUATE: ['Bifacial modules', 'Thin-film', 'Standard panels', 'Roof tiles'],
            PHD: ['About 33%', 'About 50%', 'About 75%', 'About 100%']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Solar panels turn sunlight into electricity we can use!',
            MIDDLE_SCHOOL: 'Most solar cells are made from silicon, a very common element.',
            HIGH_SCHOOL: 'Monocrystalline silicon cells achieve the highest commercial efficiencies (20-22%).',
            UNDERGRADUATE: 'Solar PV typically has a capacity factor of 15-25% depending on location.',
            GRADUATE: 'Bifacial modules can capture reflected light on their rear side.',
            PHD: 'The Shockley-Queisser limit is about 33% for single junction silicon cells.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'NREL Solar Research', url: 'https://www.nrel.gov/solar/', type: 'research' },
      { title: 'Solar Energy Industries Association', url: 'https://www.seia.org/', type: 'article' }
    ]
  },
  // Module 2: Wind Power
  {
    id: 'renewable-wind',
    slug: 'wind-power',
    title: 'Wind Power',
    description: {
      ELEMENTARY: 'Discover how wind turbines catch the breeze to make electricity!',
      MIDDLE_SCHOOL: 'Learn how modern wind farms generate clean energy from moving air.',
      HIGH_SCHOOL: 'Explore wind turbine engineering, site assessment, and energy calculations.',
      UNDERGRADUATE: 'Analyze wind resource assessment, turbine technology, and project development.',
      GRADUATE: 'Examine offshore wind, grid integration challenges, and advanced turbine design.',
      PHD: 'Research wake effects, atmospheric modeling, and next-generation turbine concepts.'
    },
    topic: 'renewable-energy',
    category: 'WIND',
    icon: 'Wind',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 're-wind-1',
        title: 'Catching the Wind',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>💨 Wind Power!</h2><p>Wind is moving air - and it can spin giant windmills called turbines to make electricity!</p><h3>How Wind Turbines Work</h3><ul><li>💨 Wind blows against the blades</li><li>🔄 Blades spin around and around</li><li>⚡ Spinning makes electricity</li><li>🏠 Power goes to homes!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Wind Energy Basics</h2><h3>Turbine Components</h3><ul><li><strong>Blades:</strong> Catch the wind (usually 3)</li><li><strong>Nacelle:</strong> Houses the generator</li><li><strong>Tower:</strong> Lifts blades high where wind is stronger</li><li><strong>Foundation:</strong> Keeps it standing</li></ul><h3>Why Height Matters</h3><p>Wind is faster and steadier higher up - that's why turbines are so tall!</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Wind Energy Engineering</h2><h3>Power in the Wind</h3><p>P = ½ρAv³ - Power increases with the cube of wind speed!</p><h3>Betz Limit</h3><p>Maximum theoretical efficiency is 59.3% - you can't capture all the wind's energy.</p><h3>Modern Turbines</h3><ul><li>Rotor diameters over 150m</li><li>Hub heights over 100m</li><li>Capacity: 3-15 MW</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Wind Project Development</h2><h3>Resource Assessment</h3><ul><li>Wind measurement campaigns</li><li>Met tower and SODAR/LIDAR data</li><li>Energy yield modeling</li><li>Uncertainty analysis</li></ul><h3>Economics</h3><p>Capacity factors 25-45%. LCOE competitive with fossil fuels in good sites.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Wind Technology</h2><h3>Offshore Wind</h3><ul><li>Fixed-bottom foundations</li><li>Floating platforms for deep water</li><li>Higher capacity factors (40-50%)</li></ul><h3>Grid Integration</h3><p>Forecasting, curtailment, storage pairing, and capacity markets.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Wind Research Frontiers</h2><h3>Wake Effects</h3><p>Downwind turbines produce less due to wake turbulence. Array optimization is critical.</p><h3>Advanced Concepts</h3><ul><li>Airborne wind energy</li><li>Multi-rotor systems</li><li>AI-optimized control</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 're-wind-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Wind Farm!',
          MIDDLE_SCHOOL: 'Place Wind Turbines',
          HIGH_SCHOOL: 'Calculate Wind Power',
          UNDERGRADUATE: 'Site Assessment',
          GRADUATE: 'Array Optimization',
          PHD: 'Wake Modeling'
        },
        description: {
          ELEMENTARY: 'Place wind turbines where the wind blows best!',
          MIDDLE_SCHOOL: 'Design a wind farm layout on a map.',
          HIGH_SCHOOL: 'Calculate energy output from wind speed data.',
          UNDERGRADUATE: 'Conduct a complete wind resource assessment.',
          GRADUATE: 'Optimize turbine placement to minimize wake losses.',
          PHD: 'Model complex wake interactions in large arrays.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 20 },
          GRADUATE: { complexity: 'expert', variables: 28 },
          PHD: { complexity: 'research', variables: 40 }
        }
      }
    ],
    game: {
      id: 're-wind-game',
      type: 'simulation',
      title: 'Wind Farm Designer',
      description: 'Design efficient wind farms across different terrains!',
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
      id: 're-wind-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rwq1',
          question: {
            ELEMENTARY: 'What makes wind turbine blades spin?',
            MIDDLE_SCHOOL: 'Why are wind turbines so tall?',
            HIGH_SCHOOL: 'What is the Betz limit?',
            UNDERGRADUATE: 'What is a typical onshore wind capacity factor?',
            GRADUATE: 'What advantage does offshore wind have?',
            PHD: 'What causes wake losses in wind farms?'
          },
          options: {
            ELEMENTARY: ['Wind', 'Sun', 'Water', 'Electricity'],
            MIDDLE_SCHOOL: ['Wind is stronger higher up', 'To look cool', 'Cheaper to build', 'No reason'],
            HIGH_SCHOOL: ['Maximum 59.3% efficiency', 'Maximum 100% efficiency', 'Minimum wind speed', 'Maximum blade size'],
            UNDERGRADUATE: ['25-45%', '60-70%', '80-90%', '10-15%'],
            GRADUATE: ['Higher and more consistent winds', 'Cheaper construction', 'No permits needed', 'Closer to cities'],
            PHD: ['Turbulence from upwind turbines', 'Ground friction', 'Temperature changes', 'Humidity']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Wind pushes against the blades and makes them spin!',
            MIDDLE_SCHOOL: 'Wind blows faster and more steadily at higher altitudes.',
            HIGH_SCHOOL: 'The Betz limit shows you can only capture up to 59.3% of wind energy theoretically.',
            UNDERGRADUATE: 'Onshore wind farms typically achieve capacity factors of 25-45%.',
            GRADUATE: 'Offshore wind benefits from stronger, more consistent winds over water.',
            PHD: 'Wake effects from upstream turbines create turbulence that reduces downwind turbine output.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'American Wind Energy Association', url: 'https://www.awea.org/', type: 'research' },
      { title: 'Wind Energy Technologies Office', url: 'https://www.energy.gov/eere/wind', type: 'article' }
    ]
  },
  // Module 3: Hydropower
  {
    id: 'renewable-hydro',
    slug: 'hydropower',
    title: 'Hydropower',
    description: {
      ELEMENTARY: 'Learn how flowing water makes electricity - nature is powerful!',
      MIDDLE_SCHOOL: 'Discover how dams and rivers generate clean, renewable power.',
      HIGH_SCHOOL: 'Explore hydroelectric systems, turbine types, and dam engineering.',
      UNDERGRADUATE: 'Analyze hydropower capacity factors, environmental impacts, and pumped storage.',
      GRADUATE: 'Examine hydropower grid services, run-of-river systems, and modernization.',
      PHD: 'Research fish passage technologies, sediment management, and climate impacts on hydrology.'
    },
    topic: 'renewable-energy',
    category: 'HYDRO',
    icon: 'Droplets',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 're-hydro-1',
        title: 'Power of Water',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>💧 Water Power!</h2><p>Water flowing downhill is super powerful! We can use it to make electricity.</p><h3>How Hydropower Works</h3><ul><li>🌧️ Rain fills rivers and lakes</li><li>🏔️ Water flows downhill</li><li>💨 Falling water spins turbines</li><li>⚡ Turbines make electricity!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Hydroelectric Power</h2><h3>How Dams Work</h3><p>Dams store water high up. When released through pipes, the falling water spins turbines connected to generators.</p><h3>Types of Hydropower</h3><ul><li><strong>Dam/Reservoir:</strong> Stores water for controlled release</li><li><strong>Run-of-river:</strong> Uses natural flow, less storage</li><li><strong>Pumped storage:</strong> Pumps water up to store energy</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Hydro Engineering</h2><h3>Power Equation</h3><p>P = ρgQHη where ρ=density, g=gravity, Q=flow, H=head, η=efficiency</p><h3>Turbine Types</h3><ul><li><strong>Pelton:</strong> High head, low flow</li><li><strong>Francis:</strong> Medium head (most common)</li><li><strong>Kaplan:</strong> Low head, high flow</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Hydropower Systems</h2><h3>System Analysis</h3><ul><li>Capacity factor 30-50%</li><li>Head and flow optimization</li><li>Seasonal variation management</li></ul><h3>Pumped Storage</h3><p>80% round-trip efficiency. Critical for grid-scale energy storage.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Grid Services</h2><h3>Flexibility Value</h3><ul><li>Peaking power on demand</li><li>Frequency regulation</li><li>Spinning reserve</li><li>Black start capability</li></ul><h3>Modernization</h3><p>Upgrading existing dams for efficiency and environmental performance.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Environmental Mitigation</h3><ul><li>Fish passage design</li><li>Sediment continuity</li><li>Downstream flow requirements</li></ul><h3>Climate Impacts</h3><p>Changing precipitation patterns affecting hydropower reliability.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 're-hydro-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Water Wheel!',
          MIDDLE_SCHOOL: 'Design a Dam',
          HIGH_SCHOOL: 'Turbine Selection',
          UNDERGRADUATE: 'Plant Optimization',
          GRADUATE: 'Grid Services Model',
          PHD: 'Environmental Flow Analysis'
        },
        description: {
          ELEMENTARY: 'See how flowing water can spin a wheel to make power!',
          MIDDLE_SCHOOL: 'Design a hydroelectric dam and see how much power it makes.',
          HIGH_SCHOOL: 'Select the right turbine type for different conditions.',
          UNDERGRADUATE: 'Optimize a hydropower plant for maximum output.',
          GRADUATE: 'Model hydropower contribution to grid stability.',
          PHD: 'Analyze environmental flow requirements and power tradeoffs.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 're-hydro-game',
      type: 'simulation',
      title: 'Hydro Engineer',
      description: 'Design and operate hydroelectric power plants!',
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
      id: 're-hydro-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rhq1',
          question: {
            ELEMENTARY: 'What spins to make electricity in a dam?',
            MIDDLE_SCHOOL: 'What is pumped storage hydropower?',
            HIGH_SCHOOL: 'Which turbine type is used for high head applications?',
            UNDERGRADUATE: 'What is the typical round-trip efficiency of pumped storage?',
            GRADUATE: 'What grid service can hydropower provide instantly?',
            PHD: 'What environmental factor do fish passage designs address?'
          },
          options: {
            ELEMENTARY: ['Turbines', 'Solar panels', 'Windmills', 'Batteries'],
            MIDDLE_SCHOOL: ['Pumping water uphill to store energy', 'Pumping fish over dams', 'Cleaning water', 'Making waves'],
            HIGH_SCHOOL: ['Pelton', 'Kaplan', 'Francis', 'Propeller'],
            UNDERGRADUATE: ['About 80%', 'About 50%', 'About 95%', 'About 30%'],
            GRADUATE: ['Frequency regulation', 'Baseload only', 'Solar backup', 'Wind smoothing'],
            PHD: ['Migration barriers', 'Water temperature', 'Turbine noise', 'Dam aesthetics']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Water spins turbines which are connected to generators that make electricity!',
            MIDDLE_SCHOOL: 'Pumped storage pumps water uphill when power is cheap, then releases it to generate power when needed.',
            HIGH_SCHOOL: 'Pelton turbines are designed for high head (tall drop) applications.',
            UNDERGRADUATE: 'Pumped storage typically achieves about 80% round-trip efficiency.',
            GRADUATE: 'Hydropower can provide instant frequency regulation due to its fast response time.',
            PHD: 'Fish passage designs help migratory fish move past dams that block their natural routes.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'International Hydropower Association', url: 'https://www.hydropower.org/', type: 'research' },
      { title: 'DOE Water Power Technologies', url: 'https://www.energy.gov/eere/water', type: 'article' }
    ]
  },
  // Module 4: Geothermal Energy
  {
    id: 'renewable-geothermal',
    slug: 'geothermal-energy',
    title: 'Geothermal Energy',
    description: {
      ELEMENTARY: 'Discover the heat hiding deep inside our Earth!',
      MIDDLE_SCHOOL: 'Learn how we use Earth\'s internal heat for power and heating.',
      HIGH_SCHOOL: 'Explore geothermal power plants, heat pumps, and resource assessment.',
      UNDERGRADUATE: 'Analyze enhanced geothermal systems, binary cycle plants, and resource sustainability.',
      GRADUATE: 'Examine induced seismicity management, reservoir engineering, and co-production.',
      PHD: 'Research supercritical geothermal systems and advanced drilling technologies.'
    },
    topic: 'renewable-energy',
    category: 'GEOTHERMAL',
    icon: 'Flame',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 're-geo-1',
        title: 'Earth\'s Inner Heat',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌋 Hot Earth!</h2><p>Deep underground, our Earth is super hot! We can use this heat to make electricity.</p><h3>Where's the Heat?</h3><ul><li>🌍 Earth's core is hotter than the sun's surface!</li><li>♨️ Hot springs and geysers show this heat</li><li>🔥 We can drill down to reach it</li><li>⚡ Steam from underground spins turbines</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Geothermal Basics</h2><h3>Earth's Heat Engine</h3><p>Earth's core is about 5,400°C! This heat flows outward. In some places, hot water and steam are close to the surface.</p><h3>Using Geothermal</h3><ul><li><strong>Power plants:</strong> Steam spins turbines</li><li><strong>Direct use:</strong> Heating buildings</li><li><strong>Heat pumps:</strong> Use stable ground temps</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Geothermal Technology</h2><h3>Power Plant Types</h3><ul><li><strong>Dry steam:</strong> Direct steam to turbine</li><li><strong>Flash steam:</strong> Hot water flashes to steam</li><li><strong>Binary cycle:</strong> Heat transfer fluid for lower temps</li></ul><h3>Resource Types</h3><p>Hydrothermal (natural), Enhanced Geothermal Systems (engineered).</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Geothermal Systems</h2><h3>Enhanced Geothermal (EGS)</h3><p>Creating reservoirs in hot dry rock by hydraulic stimulation. Potential to expand geothermal beyond volcanic areas.</p><h3>Binary Cycle Plants</h3><p>Work with lower temperatures (100-180°C) using secondary working fluid.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Geothermal</h2><h3>Reservoir Engineering</h3><ul><li>Sustainable extraction rates</li><li>Reinjection strategies</li><li>Tracer testing</li></ul><h3>Induced Seismicity</h3><p>Managing seismic risk from fluid injection and extraction.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Supercritical Systems</h3><p>Accessing supercritical fluids (>374°C) for dramatically higher power output per well.</p><h3>Advanced Drilling</h3><p>Millimeter-wave drilling, plasma drilling, and other technologies to reduce costs.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 're-geo-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Find the Hot Spots!',
          MIDDLE_SCHOOL: 'Drill for Heat',
          HIGH_SCHOOL: 'Plant Type Selection',
          UNDERGRADUATE: 'Reservoir Modeling',
          GRADUATE: 'EGS Design',
          PHD: 'Supercritical Analysis'
        },
        description: {
          ELEMENTARY: 'Explore a map to find where Earth is hot!',
          MIDDLE_SCHOOL: 'Drill wells to find geothermal resources.',
          HIGH_SCHOOL: 'Select the right plant type for different resources.',
          UNDERGRADUATE: 'Model geothermal reservoir performance.',
          GRADUATE: 'Design an enhanced geothermal system.',
          PHD: 'Analyze supercritical geothermal potential.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 're-geo-game',
      type: 'simulation',
      title: 'Geothermal Explorer',
      description: 'Find and develop geothermal resources!',
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
      id: 're-geo-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rgq1',
          question: {
            ELEMENTARY: 'Where does geothermal energy come from?',
            MIDDLE_SCHOOL: 'What are the three ways to use geothermal energy?',
            HIGH_SCHOOL: 'Which plant type works with lower temperature resources?',
            UNDERGRADUATE: 'What does Enhanced Geothermal Systems (EGS) create?',
            GRADUATE: 'What risk must be managed in geothermal operations?',
            PHD: 'What temperature defines supercritical water?'
          },
          options: {
            ELEMENTARY: ['Heat inside Earth', 'The Sun', 'Wind', 'Rain'],
            MIDDLE_SCHOOL: ['Power plants, direct heating, heat pumps', 'Only electricity', 'Only heating', 'Only cooling'],
            HIGH_SCHOOL: ['Binary cycle', 'Dry steam', 'Flash steam', 'Nuclear'],
            UNDERGRADUATE: ['Engineered reservoirs in hot rock', 'Natural hot springs', 'Volcanic vents', 'Ocean heat'],
            GRADUATE: ['Induced seismicity', 'Air pollution', 'Water pollution', 'Noise'],
            PHD: ['Above 374°C', 'Above 100°C', 'Above 200°C', 'Above 500°C']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Geothermal energy comes from the natural heat deep inside Earth!',
            MIDDLE_SCHOOL: 'Geothermal can generate electricity, directly heat buildings, or power heat pumps.',
            HIGH_SCHOOL: 'Binary cycle plants use a secondary fluid and work with temperatures as low as 100°C.',
            UNDERGRADUATE: 'EGS creates artificial reservoirs by fracturing hot dry rock and circulating water.',
            GRADUATE: 'Induced seismicity from fluid injection is a key risk that must be carefully managed.',
            PHD: 'Water becomes supercritical above 374°C and 22.1 MPa, dramatically increasing energy content.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Geothermal Energy Association', url: 'https://geo-energy.org/', type: 'research' },
      { title: 'DOE Geothermal Technologies', url: 'https://www.energy.gov/eere/geothermal', type: 'article' }
    ]
  },
  // Module 5: Energy Storage
  {
    id: 'renewable-storage',
    slug: 'energy-storage',
    title: 'Energy Storage',
    description: {
      ELEMENTARY: 'Learn how we save energy for later - like a battery for the whole city!',
      MIDDLE_SCHOOL: 'Discover different ways to store electricity for when we need it.',
      HIGH_SCHOOL: 'Explore batteries, pumped hydro, and other storage technologies.',
      UNDERGRADUATE: 'Analyze storage economics, sizing, and grid services.',
      GRADUATE: 'Examine long-duration storage, market design, and policy frameworks.',
      PHD: 'Research novel storage chemistries, degradation mechanisms, and system optimization.'
    },
    topic: 'renewable-energy',
    category: 'STORAGE',
    icon: 'Battery',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 're-storage-1',
        title: 'Saving Power',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🔋 Energy Piggy Bank!</h2><p>What if the sun goes down but you still need power? We can save energy for later!</p><h3>Storage is Like Saving</h3><ul><li>☀️ Make extra power when sunny</li><li>🔋 Store it in big batteries</li><li>🌙 Use it at night</li><li>💡 Lights stay on!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Why Storage Matters</h2><h3>The Challenge</h3><p>Sun shines by day, wind blows unpredictably. But we need power 24/7. Storage fills the gaps!</p><h3>Storage Types</h3><ul><li><strong>Batteries:</strong> Chemical storage</li><li><strong>Pumped hydro:</strong> Water in elevated reservoir</li><li><strong>Compressed air:</strong> Air in underground caverns</li><li><strong>Thermal:</strong> Heat in molten salt</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Storage Technologies</h2><h3>Battery Types</h3><ul><li><strong>Lithium-ion:</strong> 80%+ of new installations</li><li><strong>Flow batteries:</strong> Scalable duration</li><li><strong>Sodium-sulfur:</strong> High temperature</li></ul><h3>Pumped Hydro</h3><p>95% of global installed storage capacity. 80% round-trip efficiency.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Storage Economics</h2><h3>Key Metrics</h3><ul><li>Levelized cost of storage (LCOS)</li><li>Round-trip efficiency</li><li>Cycle life and degradation</li><li>Power vs energy capacity</li></ul><h3>Revenue Stacking</h3><p>Combining multiple services: arbitrage, capacity, ancillary services.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Long-Duration Storage</h2><h3>Beyond 4-Hour Lithium</h3><ul><li>Iron-air batteries</li><li>Green hydrogen</li><li>Compressed air (CAES)</li><li>Gravity storage</li></ul><h3>Seasonal Storage</h3><p>Addressing multi-day and seasonal variability.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Storage Research</h2><h3>Degradation Science</h3><ul><li>Calendar and cycle aging</li><li>Capacity fade mechanisms</li><li>Second-life applications</li></ul><h3>Novel Chemistries</h3><p>Solid-state batteries, zinc-based systems, and organic flow batteries.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 're-storage-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Fill the Battery!',
          MIDDLE_SCHOOL: 'Match Storage to Need',
          HIGH_SCHOOL: 'Technology Comparison',
          UNDERGRADUATE: 'Storage Sizing',
          GRADUATE: 'Market Analysis',
          PHD: 'Degradation Modeling'
        },
        description: {
          ELEMENTARY: 'Charge batteries during sunny times, use them when dark!',
          MIDDLE_SCHOOL: 'Match different storage types to different needs.',
          HIGH_SCHOOL: 'Compare storage technologies on key metrics.',
          UNDERGRADUATE: 'Size a storage system for a specific application.',
          GRADUATE: 'Analyze storage value in different market structures.',
          PHD: 'Model battery degradation under different usage patterns.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 're-storage-game',
      type: 'simulation',
      title: 'Grid Balancer',
      description: 'Use storage to keep the grid stable!',
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
      id: 're-storage-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rstq1',
          question: {
            ELEMENTARY: 'Why do we need to store energy?',
            MIDDLE_SCHOOL: 'What type makes up most global storage capacity?',
            HIGH_SCHOOL: 'What percentage of new battery installations are lithium-ion?',
            UNDERGRADUATE: 'What is revenue stacking in storage?',
            GRADUATE: 'What technology is promising for long-duration storage?',
            PHD: 'What causes capacity fade in lithium-ion batteries?'
          },
          options: {
            ELEMENTARY: ['To use power when the sun is not shining', 'For fun', 'To make more sun', 'To stop wind'],
            MIDDLE_SCHOOL: ['Pumped hydro', 'Lithium batteries', 'Flywheels', 'Compressed air'],
            HIGH_SCHOOL: ['Over 80%', 'About 50%', 'About 25%', 'About 10%'],
            UNDERGRADUATE: ['Earning from multiple grid services', 'Stacking batteries', 'Building tall', 'Tax benefits'],
            GRADUATE: ['Iron-air batteries', 'More lithium', 'Smaller cells', 'Faster charging'],
            PHD: ['SEI layer growth and lithium loss', 'External damage', 'Temperature only', 'Wire corrosion']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'We store energy so we can use it when the sun is not shining or wind is not blowing!',
            MIDDLE_SCHOOL: 'Pumped hydro makes up about 95% of global installed storage capacity.',
            HIGH_SCHOOL: 'Lithium-ion batteries represent over 80% of new grid storage installations.',
            UNDERGRADUATE: 'Revenue stacking means earning money from multiple services like arbitrage and ancillary services.',
            GRADUATE: 'Iron-air batteries offer promise for multi-day duration at lower cost than lithium.',
            PHD: 'Capacity fade is primarily caused by solid electrolyte interphase (SEI) growth and irreversible lithium loss.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Energy Storage Association', url: 'https://energystorage.org/', type: 'research' },
      { title: 'DOE Energy Storage', url: 'https://www.energy.gov/oe/energy-storage', type: 'article' }
    ]
  },
  // Module 6: Biomass Energy
  {
    id: 'renewable-biomass',
    slug: 'biomass-energy',
    title: 'Biomass Energy',
    description: {
      ELEMENTARY: 'Learn how plants and waste can become clean energy!',
      MIDDLE_SCHOOL: 'Discover how organic materials like wood and crops create renewable power.',
      HIGH_SCHOOL: 'Explore biomass conversion technologies, feedstocks, and sustainability considerations.',
      UNDERGRADUATE: 'Analyze biomass supply chains, conversion efficiency, and lifecycle emissions.',
      GRADUATE: 'Examine advanced biofuels, biorefinery concepts, and policy frameworks.',
      PHD: 'Research novel conversion pathways, negative emissions potential, and land use tradeoffs.'
    },
    topic: 'renewable-energy',
    category: 'BIOMASS',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 're-bio-1', title: 'Energy from Plants', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plant Power!</h2><p>Plants store energy from the sun. When we burn them or turn them into fuel, we release that energy!</p>', MIDDLE_SCHOOL: '<h2>Biomass Basics</h2><p>Biomass includes wood, crops, animal waste, and food scraps. These can be burned for heat or converted to biofuels.</p>', HIGH_SCHOOL: '<h2>Conversion Technologies</h2><p>Direct combustion, gasification, pyrolysis, and anaerobic digestion convert biomass to useful energy.</p>', UNDERGRADUATE: '<h2>Supply Chain Analysis</h2><p>Feedstock collection, transportation, storage, and processing affect overall biomass energy economics.</p>', GRADUATE: '<h2>Advanced Biofuels</h2><p>Cellulosic ethanol, renewable diesel, and sustainable aviation fuel from non-food feedstocks.</p>', PHD: '<h2>Research Frontiers</h2><p>BECCS (bioenergy with carbon capture), algal biofuels, and synthetic biology approaches.</p>' } }],
    activities: [{ id: 're-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Grow Fuel!', MIDDLE_SCHOOL: 'Biomass Sources', HIGH_SCHOOL: 'Conversion Pathways', UNDERGRADUATE: 'Supply Chain Design', GRADUATE: 'Lifecycle Analysis', PHD: 'Carbon Balance Model' }, description: { ELEMENTARY: 'See how plants become energy!', MIDDLE_SCHOOL: 'Match biomass sources to energy outputs.', HIGH_SCHOOL: 'Choose the best conversion technology for different feedstocks.', UNDERGRADUATE: 'Design an efficient biomass supply chain.', GRADUATE: 'Conduct a lifecycle analysis of biofuel systems.', PHD: 'Model carbon flows in bioenergy systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-bio-game', type: 'simulation', title: 'Bioenergy Manager', description: 'Manage a sustainable biomass energy system!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-bio-quiz', passingScore: 80, questions: [{ id: 'rbq1', question: { ELEMENTARY: 'What is biomass made from?', MIDDLE_SCHOOL: 'What process breaks down waste without oxygen?', HIGH_SCHOOL: 'Which conversion technology produces syngas?', UNDERGRADUATE: 'What is the main challenge for biomass supply chains?', GRADUATE: 'What does BECCS stand for?', PHD: 'What is a key advantage of algal biofuels?' }, options: { ELEMENTARY: ['Plants and organic waste', 'Rocks', 'Water', 'Metal'], MIDDLE_SCHOOL: ['Anaerobic digestion', 'Burning', 'Freezing', 'Drying'], HIGH_SCHOOL: ['Gasification', 'Direct combustion', 'Fermentation', 'Distillation'], UNDERGRADUATE: ['Collection and transportation costs', 'Too much supply', 'No technology exists', 'Unlimited land'], GRADUATE: ['Bioenergy with Carbon Capture and Storage', 'Basic Energy Carbon Capture System', 'Biomass Electricity Conversion Control', 'None of these'], PHD: ['High productivity per acre and no food competition', 'Low cost today', 'Simple harvesting', 'Works everywhere'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Biomass comes from plants, wood, crops, and organic waste - all things that once lived!', MIDDLE_SCHOOL: 'Anaerobic digestion breaks down organic matter without oxygen, producing biogas.', HIGH_SCHOOL: 'Gasification heats biomass with limited oxygen to produce syngas (synthesis gas).', UNDERGRADUATE: 'Biomass is bulky and expensive to collect and transport, affecting economics.', GRADUATE: 'BECCS combines bioenergy production with carbon capture for potential negative emissions.', PHD: 'Algae can produce far more biomass per acre than crops and do not compete with food production.' } }] },
    externalResources: [{ title: 'US Biomass Energy', url: 'https://www.energy.gov/eere/bioenergy', type: 'research' }]
  },
  // Module 7: Ocean Energy
  {
    id: 'renewable-ocean',
    slug: 'ocean-energy',
    title: 'Ocean Energy',
    description: {
      ELEMENTARY: 'Discover how the ocean\'s waves and tides can make electricity!',
      MIDDLE_SCHOOL: 'Learn how we harness the power of waves, tides, and ocean heat.',
      HIGH_SCHOOL: 'Explore wave energy converters, tidal systems, and ocean thermal energy.',
      UNDERGRADUATE: 'Analyze ocean energy technologies, resource assessment, and deployment challenges.',
      GRADUATE: 'Examine marine spatial planning, environmental impacts, and technology readiness.',
      PHD: 'Research hydrodynamic optimization, array interactions, and survivability engineering.'
    },
    topic: 'renewable-energy',
    category: 'OCEAN',
    icon: 'Waves',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 're-ocean-1', title: 'Power from the Sea', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Ocean Power!</h2><p>The ocean is always moving - waves crash, tides rise and fall. We can capture this motion to make electricity!</p>', MIDDLE_SCHOOL: '<h2>Types of Ocean Energy</h2><p>Wave energy uses surface motion. Tidal energy uses predictable water flow. Ocean thermal uses temperature differences.</p>', HIGH_SCHOOL: '<h2>Ocean Energy Technologies</h2><p>Point absorbers, oscillating water columns, attenuators for waves. Tidal barrages, stream turbines, and lagoons for tides.</p>', UNDERGRADUATE: '<h2>Resource Assessment</h2><p>Wave power depends on wave height and period. Tidal power depends on range and flow speed. Location is critical.</p>', GRADUATE: '<h2>Deployment Challenges</h2><p>Harsh marine environment, grid connection, environmental impacts, and high costs remain barriers.</p>', PHD: '<h2>Research Frontiers</h2><p>Array optimization, power take-off systems, materials science for marine conditions.</p>' } }],
    activities: [{ id: 're-ocean-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Catch the Waves!', MIDDLE_SCHOOL: 'Tidal Power', HIGH_SCHOOL: 'Device Selection', UNDERGRADUATE: 'Site Assessment', GRADUATE: 'Array Planning', PHD: 'Hydrodynamic Modeling' }, description: { ELEMENTARY: 'See how waves can power lights!', MIDDLE_SCHOOL: 'Harness the rising and falling tides for power.', HIGH_SCHOOL: 'Select the right device for different ocean conditions.', UNDERGRADUATE: 'Assess a site for ocean energy potential.', GRADUATE: 'Plan a marine energy array with environmental considerations.', PHD: 'Model wave-device-wave interactions in arrays.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ocean-game', type: 'simulation', title: 'Ocean Energy Pioneer', description: 'Build and operate ocean energy systems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ocean-quiz', passingScore: 80, questions: [{ id: 'roq1', question: { ELEMENTARY: 'What makes waves in the ocean?', MIDDLE_SCHOOL: 'What causes tides?', HIGH_SCHOOL: 'What is an oscillating water column?', UNDERGRADUATE: 'What determines wave power?', GRADUATE: 'What is a major deployment challenge for ocean energy?', PHD: 'What is array interaction in wave energy?' }, options: { ELEMENTARY: ['Wind blowing on water', 'Fish swimming', 'Boats moving', 'Rocks falling'], MIDDLE_SCHOOL: ['The moon\'s gravity', 'Wind', 'Earthquakes', 'Temperature'], HIGH_SCHOOL: ['A wave device using air compression', 'A type of submarine', 'A water pipe', 'An ocean current'], UNDERGRADUATE: ['Wave height and period', 'Water temperature only', 'Ocean color', 'Fish population'], GRADUATE: ['Harsh marine environment', 'Too much energy', 'Too many locations', 'Low costs'], PHD: ['How devices affect waves reaching other devices', 'Fish swimming patterns', 'Boat traffic', 'Temperature changes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wind blowing across the ocean surface creates waves!', MIDDLE_SCHOOL: 'The moon\'s gravitational pull creates the predictable rise and fall of tides.', HIGH_SCHOOL: 'An OWC captures waves in a chamber, compressing air to drive a turbine.', UNDERGRADUATE: 'Wave power is proportional to wave height squared and wave period.', GRADUATE: 'Surviving storms, biofouling, and maintenance in the ocean environment are major challenges.', PHD: 'Array interaction describes how energy extraction by one device affects wave energy available to others.' } }] },
    externalResources: [{ title: 'Marine Energy', url: 'https://www.energy.gov/eere/water/marine-energy', type: 'research' }]
  },
  // Module 8: Smart Grids
  {
    id: 'renewable-smart-grid',
    slug: 'smart-grids',
    title: 'Smart Grids',
    description: {
      ELEMENTARY: 'Learn about the super-smart power system that connects everything!',
      MIDDLE_SCHOOL: 'Discover how modern grids use computers to manage electricity better.',
      HIGH_SCHOOL: 'Explore smart grid technologies, sensors, and demand response systems.',
      UNDERGRADUATE: 'Analyze grid modernization, advanced metering, and distribution automation.',
      GRADUATE: 'Examine transactive energy, cybersecurity, and regulatory frameworks.',
      PHD: 'Research distributed optimization, market design, and resilience engineering.'
    },
    topic: 'renewable-energy',
    category: 'GRID',
    icon: 'Network',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 're-grid-1', title: 'The Smart Power Network', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Electricity!</h2><p>A smart grid is like the internet for electricity - it knows where power is needed and sends it there!</p>', MIDDLE_SCHOOL: '<h2>What Makes a Grid Smart?</h2><p>Sensors, smart meters, computers, and communication networks work together to manage electricity flow efficiently.</p>', HIGH_SCHOOL: '<h2>Smart Grid Components</h2><p>Advanced metering infrastructure (AMI), distribution automation, demand response, and distributed energy resources.</p>', UNDERGRADUATE: '<h2>Grid Modernization</h2><p>Integrating renewables, managing variability, enabling two-way power flow, and improving reliability.</p>', GRADUATE: '<h2>Transactive Energy</h2><p>Market-based coordination of distributed resources using price signals and automated transactions.</p>', PHD: '<h2>Research Frontiers</h2><p>Distributed optimization algorithms, cybersecurity for operational technology, and resilience quantification.</p>' } }],
    activities: [{ id: 're-grid-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Power the City!', MIDDLE_SCHOOL: 'Balance the Grid', HIGH_SCHOOL: 'Demand Response', UNDERGRADUATE: 'AMI Deployment', GRADUATE: 'Market Simulation', PHD: 'Resilience Modeling' }, description: { ELEMENTARY: 'Send power where it is needed in the city!', MIDDLE_SCHOOL: 'Balance electricity supply and demand in real-time.', HIGH_SCHOOL: 'Design a demand response program.', UNDERGRADUATE: 'Plan an advanced metering infrastructure rollout.', GRADUATE: 'Simulate transactive energy market dynamics.', PHD: 'Model grid resilience under cyber-physical threats.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-grid-game', type: 'simulation', title: 'Grid Operator', description: 'Manage a smart electricity grid!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-grid-quiz', passingScore: 80, questions: [{ id: 'rgdq1', question: { ELEMENTARY: 'What does a smart grid know?', MIDDLE_SCHOOL: 'What device measures your home electricity use in real-time?', HIGH_SCHOOL: 'What is demand response?', UNDERGRADUATE: 'What does AMI stand for?', GRADUATE: 'What is transactive energy?', PHD: 'What is a key cybersecurity concern for smart grids?' }, options: { ELEMENTARY: ['Where power is needed', 'What you ate for breakfast', 'Your favorite color', 'Tomorrow\'s weather'], MIDDLE_SCHOOL: ['Smart meter', 'Regular clock', 'Thermometer', 'Smoke detector'], HIGH_SCHOOL: ['Changing electricity use based on grid conditions', 'Using more power always', 'Ignoring the grid', 'Building more plants'], UNDERGRADUATE: ['Advanced Metering Infrastructure', 'Automatic Money Investing', 'Alternative Measurement Index', 'Annual Meter Inspection'], GRADUATE: ['Market-based coordination of distributed resources', 'Traditional utility billing', 'Manual grid control', 'Fossil fuel trading'], PHD: ['Attacks on operational technology systems', 'Email phishing', 'Website defacement', 'Social media hacking'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A smart grid knows where power is needed and can send it there efficiently!', MIDDLE_SCHOOL: 'Smart meters measure your electricity use in real-time and communicate with the utility.', HIGH_SCHOOL: 'Demand response programs incentivize customers to reduce or shift usage during peak times.', UNDERGRADUATE: 'AMI (Advanced Metering Infrastructure) includes smart meters, networks, and data systems.', GRADUATE: 'Transactive energy uses market mechanisms and price signals to coordinate distributed resources.', PHD: 'Attacks on SCADA and other operational technology can disrupt physical grid operations.' } }] },
    externalResources: [{ title: 'Smart Grid Information', url: 'https://www.smartgrid.gov/', type: 'research' }]
  },
  // Module 9: Microgrids
  {
    id: 'renewable-microgrid',
    slug: 'microgrids',
    title: 'Microgrids',
    description: {
      ELEMENTARY: 'Learn about small power systems that can work on their own!',
      MIDDLE_SCHOOL: 'Discover how communities can have their own mini power grids.',
      HIGH_SCHOOL: 'Explore microgrid design, islanding capability, and integration.',
      UNDERGRADUATE: 'Analyze microgrid economics, control systems, and business models.',
      GRADUATE: 'Examine networked microgrids, regulatory challenges, and resilience value.',
      PHD: 'Research hierarchical control, multi-agent systems, and optimal dispatch.'
    },
    topic: 'renewable-energy',
    category: 'MICROGRIDS',
    icon: 'Boxes',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 're-micro-1', title: 'Mini Power Systems', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Your Own Power Grid!</h2><p>A microgrid is like having your own small power system. If the big grid goes down, you still have power!</p>', MIDDLE_SCHOOL: '<h2>What is a Microgrid?</h2><p>A local energy system with generation, storage, and loads that can operate connected to or separate from the main grid.</p>', HIGH_SCHOOL: '<h2>Microgrid Components</h2><p>Distributed generation (solar, wind, generators), storage, smart controls, and the ability to island.</p>', UNDERGRADUATE: '<h2>Microgrid Design</h2><p>Sizing generation and storage, control architecture, grid interconnection, and economic optimization.</p>', GRADUATE: '<h2>Advanced Microgrids</h2><p>Networked microgrids, peer-to-peer energy trading, and grid services provision.</p>', PHD: '<h2>Research Frontiers</h2><p>Hierarchical and distributed control, stability analysis, and cyber-physical security.</p>' } }],
    activities: [{ id: 're-micro-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Mini Grid!', MIDDLE_SCHOOL: 'Design Your Microgrid', HIGH_SCHOOL: 'Islanding Exercise', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Networked Operation', PHD: 'Control Design' }, description: { ELEMENTARY: 'Create a small power system for a neighborhood!', MIDDLE_SCHOOL: 'Design a microgrid with solar, batteries, and loads.', HIGH_SCHOOL: 'Practice disconnecting from the main grid safely.', UNDERGRADUATE: 'Size a microgrid for a campus or community.', GRADUATE: 'Operate multiple microgrids in coordination.', PHD: 'Design hierarchical control for a microgrid.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-micro-game', type: 'simulation', title: 'Microgrid Builder', description: 'Design and operate a resilient microgrid!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-micro-quiz', passingScore: 80, questions: [{ id: 'rmgq1', question: { ELEMENTARY: 'What can a microgrid do when the big grid fails?', MIDDLE_SCHOOL: 'What is islanding?', HIGH_SCHOOL: 'What components does a microgrid need to island?', UNDERGRADUATE: 'What is a key economic driver for microgrids?', GRADUATE: 'What is peer-to-peer energy trading?', PHD: 'What is a challenge in hierarchical microgrid control?' }, options: { ELEMENTARY: ['Keep the power on', 'Turn everything off', 'Call for help', 'Wait for sun'], MIDDLE_SCHOOL: ['Operating independently from the main grid', 'Being on an island', 'Using only water power', 'Shutting down'], HIGH_SCHOOL: ['Generation, storage, and smart controls', 'Only solar panels', 'Only batteries', 'Only generators'], UNDERGRADUATE: ['Resilience and reliability value', 'Always cheaper than grid', 'No permits needed', 'Free energy'], GRADUATE: ['Direct energy exchange between prosumers', 'Trading electricity stocks', 'Bartering goods', 'Government distribution'], PHD: ['Coordinating local and global objectives', 'Too simple', 'No math needed', 'Single controller'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When the main power grid fails, a microgrid can keep the lights on by itself!', MIDDLE_SCHOOL: 'Islanding means a microgrid disconnects and operates independently from the main grid.', HIGH_SCHOOL: 'To island, a microgrid needs its own generation, storage, and smart controls to balance supply and demand.', UNDERGRADUATE: 'Resilience value - avoiding outage costs - is often the primary economic justification.', GRADUATE: 'Peer-to-peer trading allows households and businesses to buy/sell energy directly with each other.', PHD: 'Balancing local optimization with global objectives while maintaining stability is a key challenge.' } }] },
    externalResources: [{ title: 'Microgrid Knowledge', url: 'https://microgridknowledge.com/', type: 'research' }]
  },
  // Module 10: Electric Vehicles
  {
    id: 'renewable-ev',
    slug: 'electric-vehicles',
    title: 'Electric Vehicles',
    description: {
      ELEMENTARY: 'Learn about cars that run on electricity instead of gas!',
      MIDDLE_SCHOOL: 'Discover how electric vehicles work and why they help the planet.',
      HIGH_SCHOOL: 'Explore EV technology, charging infrastructure, and emissions comparisons.',
      UNDERGRADUATE: 'Analyze EV economics, grid impacts, and vehicle-to-grid technology.',
      GRADUATE: 'Examine transportation electrification policy, fleet management, and lifecycle analysis.',
      PHD: 'Research battery technology advancement, charging optimization, and system integration.'
    },
    topic: 'renewable-energy',
    category: 'TRANSPORTATION',
    icon: 'Car',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 're-ev-1', title: 'Cars That Plug In', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Electric Cars!</h2><p>Electric vehicles (EVs) use batteries instead of gas tanks. You charge them like a big phone!</p>', MIDDLE_SCHOOL: '<h2>How EVs Work</h2><p>A battery stores electricity. An electric motor turns the wheels. Regenerative braking recaptures energy when stopping.</p>', HIGH_SCHOOL: '<h2>EV Technology</h2><p>Lithium-ion batteries, permanent magnet motors, power electronics, and charging standards (Level 1/2/3).</p>', UNDERGRADUATE: '<h2>EV Economics</h2><p>Higher upfront cost, lower operating cost. Total cost of ownership often favors EVs over vehicle lifetime.</p>', GRADUATE: '<h2>Transportation Electrification</h2><p>Policy incentives, charging infrastructure planning, fleet electrification, and equity considerations.</p>', PHD: '<h2>Research Frontiers</h2><p>Solid-state batteries, ultra-fast charging, vehicle-to-grid integration, and autonomous EV fleets.</p>' } }],
    activities: [{ id: 're-ev-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Drive an EV!', MIDDLE_SCHOOL: 'Plan a Trip', HIGH_SCHOOL: 'Compare Costs', UNDERGRADUATE: 'Charging Network', GRADUATE: 'Fleet Analysis', PHD: 'V2G Optimization' }, description: { ELEMENTARY: 'See how far an electric car can go on a charge!', MIDDLE_SCHOOL: 'Plan a road trip with charging stops.', HIGH_SCHOOL: 'Compare EV and gas car costs over time.', UNDERGRADUATE: 'Design a charging network for a city.', GRADUATE: 'Analyze fleet electrification economics.', PHD: 'Optimize vehicle-to-grid energy flows.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ev-game', type: 'simulation', title: 'EV Road Trip', description: 'Plan efficient trips with electric vehicles!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ev-quiz', passingScore: 80, questions: [{ id: 'revq1', question: { ELEMENTARY: 'What powers an electric car?', MIDDLE_SCHOOL: 'What is regenerative braking?', HIGH_SCHOOL: 'What is Level 3 charging?', UNDERGRADUATE: 'What is total cost of ownership?', GRADUATE: 'What is vehicle-to-grid (V2G)?', PHD: 'What is a key challenge for solid-state batteries?' }, options: { ELEMENTARY: ['A battery', 'Gasoline', 'Coal', 'Water'], MIDDLE_SCHOOL: ['Recapturing energy when slowing down', 'Braking really hard', 'Using new brakes', 'Braking slowly'], HIGH_SCHOOL: ['DC fast charging (50+ kW)', 'Regular outlet (120V)', 'Home charger (240V)', 'Solar charging'], UNDERGRADUATE: ['All costs over vehicle lifetime', 'Just purchase price', 'Only fuel costs', 'Insurance only'], GRADUATE: ['Using EV batteries to supply grid power', 'A video game', 'Virtual driving', 'Voice to garage'], PHD: ['Manufacturing scalability and cost', 'Too much energy', 'Too heavy', 'Wrong color'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electric cars run on large batteries that you charge with electricity!', MIDDLE_SCHOOL: 'Regenerative braking captures energy when you slow down and puts it back in the battery.', HIGH_SCHOOL: 'Level 3 DC fast charging can add hundreds of miles of range in under an hour.', UNDERGRADUATE: 'Total cost of ownership includes purchase, fuel, maintenance, and other costs over the vehicle\'s life.', GRADUATE: 'V2G allows parked EVs to discharge power back to the grid during peak demand.', PHD: 'Manufacturing solid-state batteries at scale with competitive cost remains the primary challenge.' } }] },
    externalResources: [{ title: 'EV Charging', url: 'https://www.energy.gov/eere/electricvehicles', type: 'research' }]
  }
]
