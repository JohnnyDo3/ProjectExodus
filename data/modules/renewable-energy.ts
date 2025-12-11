// Renewable Energy Modules - Complete Content for All Learning Levels
import { Module, LearningLevel } from './index'

// Module 4: Hydropower Basics
export const hydropowerBasics: Module = {
  id: 'renewable-hydro', slug: 'hydropower-basics', title: 'Hydropower Basics',
  description: { ELEMENTARY: 'Learn how flowing water makes electricity!', MIDDLE_SCHOOL: 'Discover how dams and rivers generate clean power.', HIGH_SCHOOL: 'Explore hydroelectric systems, turbine types, and dam engineering.', UNDERGRADUATE: 'Analyze hydropower capacity factors, environmental impacts, and pumped storage.', GRADUATE: 'Examine hydropower\'s role in grid flexibility and run-of-river systems.', PHD: 'Research fish passage technologies, sediment management, and climate impacts.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'hydro-1', title: 'Power of Water', content: { ELEMENTARY: '<h2>Water Power!</h2><p>Water flowing downhill can spin wheels to make electricity!</p>', MIDDLE_SCHOOL: '<h2>Hydroelectric Power</h2><p>Dams store water high up. When released, falling water spins turbines connected to generators.</p>', HIGH_SCHOOL: '<h2>Hydro Engineering</h2><p>Power = ρ × g × Q × H × η. Types: Pelton, Francis, Kaplan turbines for different head heights.</p>', UNDERGRADUATE: '<h2>System Analysis</h2><p>Capacity factor 30-50%. Pumped storage provides grid-scale energy storage.</p>', GRADUATE: '<h2>Flexibility Services</h2><p>Hydro provides peaking power, frequency regulation, and spinning reserve.</p>', PHD: '<h2>Environmental Research</h2><p>Fish passage, sediment continuity, and downstream temperature impacts.</p>' } }],
  activities: [{ id: 'hydro-act-1', title: 'Build a Dam', type: 'SIMULATION', description: 'Design a hydroelectric system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'hydro-game', title: 'Hydro Engineer', type: 'simulation', description: 'Manage a hydroelectric dam', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'hydro-q1', question: 'What spins to generate electricity in hydropower?', options: ['Solar cells', 'Turbines', 'Wind vanes', 'Batteries'], correctAnswer: 1, explanation: 'Water spins turbines which are connected to generators.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 5: Geothermal Energy
export const geothermalEnergy: Module = {
  id: 'renewable-geothermal', slug: 'geothermal-energy', title: 'Geothermal Energy',
  description: { ELEMENTARY: 'Learn about heat energy from deep inside the Earth!', MIDDLE_SCHOOL: 'Discover how we use Earth\'s internal heat for power and heating.', HIGH_SCHOOL: 'Explore geothermal power plants, heat pumps, and resource assessment.', UNDERGRADUATE: 'Analyze EGS systems, binary cycle plants, and resource sustainability.', GRADUATE: 'Examine induced seismicity, reservoir engineering, and co-production.', PHD: 'Research supercritical geothermal systems and advanced drilling technologies.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'geo-1', title: 'Earth\'s Heat', content: { ELEMENTARY: '<h2>Hot Earth!</h2><p>Deep underground, Earth is very hot! We can use this heat to make electricity.</p>', MIDDLE_SCHOOL: '<h2>Geothermal Basics</h2><p>Earth\'s core is 5,400°C! Hot water/steam from underground spins turbines.</p>', HIGH_SCHOOL: '<h2>Geothermal Plants</h2><p>Dry steam, flash steam, and binary cycle plants for different resource temperatures.</p>', UNDERGRADUATE: '<h2>Enhanced Geothermal</h2><p>EGS creates reservoirs in hot dry rock. Binary plants work with lower temps (100-180°C).</p>', GRADUATE: '<h2>Reservoir Engineering</h2><p>Sustainable extraction rates, reinjection strategies, induced seismicity management.</p>', PHD: '<h2>Supercritical Systems</h2><p>Accessing supercritical fluids (>374°C) for dramatically higher power output.</p>' } }],
  activities: [{ id: 'geo-act-1', title: 'Tap the Heat', type: 'SIMULATION', description: 'Design a geothermal power plant', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'geo-game', title: 'Geothermal Driller', type: 'simulation', description: 'Find and tap geothermal resources', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'geo-q1', question: 'Where does geothermal energy come from?', options: ['The Sun', 'Deep inside Earth', 'The Moon', 'Wind'], correctAnswer: 1, explanation: 'Geothermal energy comes from heat deep inside the Earth.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 6: Biomass Energy
export const biomassEnergy: Module = {
  id: 'renewable-biomass', slug: 'biomass-energy', title: 'Biomass Energy',
  description: { ELEMENTARY: 'Learn how plants and waste can make energy!', MIDDLE_SCHOOL: 'Discover how organic matter becomes fuel and electricity.', HIGH_SCHOOL: 'Explore biofuels, biogas, and biomass power generation.', UNDERGRADUATE: 'Analyze lifecycle emissions, land use, and sustainability of bioenergy.', GRADUATE: 'Examine BECCS, advanced biofuels, and bioenergy policy debates.', PHD: 'Research cellulosic conversion, algae systems, and carbon accounting.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'bio-1', title: 'Energy from Plants', content: { ELEMENTARY: '<h2>Plant Power!</h2><p>Plants store sunshine as energy. We can burn plants or turn them into fuel!</p>', MIDDLE_SCHOOL: '<h2>Biomass Basics</h2><p>Wood, crops, waste → direct burning, biogas, or biofuels like ethanol and biodiesel.</p>', HIGH_SCHOOL: '<h2>Bioenergy Pathways</h2><p>Combustion, gasification, anaerobic digestion, fermentation, transesterification.</p>', UNDERGRADUATE: '<h2>Sustainability Analysis</h2><p>Land use change emissions can negate benefits. Sustainable sourcing critical.</p>', GRADUATE: '<h2>BECCS</h2><p>Bioenergy with carbon capture potentially carbon-negative, but scalability debated.</p>', PHD: '<h2>Advanced Biofuels</h2><p>Cellulosic ethanol, algal biodiesel, synthetic biology approaches.</p>' } }],
  activities: [{ id: 'bio-act-1', title: 'Biogas Digester', type: 'SIMULATION', description: 'Build a biogas system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'bio-game', title: 'Biofuel Creator', type: 'simulation', description: 'Convert biomass to energy', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'bio-q1', question: 'What is biomass energy made from?', options: ['Rocks', 'Plants and organic waste', 'Water', 'Air'], correctAnswer: 1, explanation: 'Biomass energy comes from plants and organic materials.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 7: Ocean Energy
export const oceanEnergy: Module = {
  id: 'renewable-ocean', slug: 'ocean-energy', title: 'Ocean Energy',
  description: { ELEMENTARY: 'Learn how ocean waves and tides can make electricity!', MIDDLE_SCHOOL: 'Discover wave energy converters and tidal power systems.', HIGH_SCHOOL: 'Explore tidal barrages, stream turbines, and wave energy technologies.', UNDERGRADUATE: 'Analyze ocean thermal, salinity gradient, and marine energy economics.', GRADUATE: 'Examine array effects, environmental impacts, and grid integration.', PHD: 'Research survivability, power take-off systems, and resource assessment.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'ocean-1', title: 'Power from the Sea', content: { ELEMENTARY: '<h2>Wave Power!</h2><p>Ocean waves go up and down. We can use this motion to make electricity!</p>', MIDDLE_SCHOOL: '<h2>Ocean Energy Types</h2><p>Wave energy, tidal energy, ocean thermal (OTEC), and salinity gradient.</p>', HIGH_SCHOOL: '<h2>Tidal Systems</h2><p>Tidal barrages: predictable but high impact. Tidal stream: like underwater wind turbines.</p>', UNDERGRADUATE: '<h2>Wave Technologies</h2><p>Oscillating water column, point absorbers, attenuators, overtopping devices.</p>', GRADUATE: '<h2>Array Optimization</h2><p>Hydrodynamic interactions, cable routing, O&M strategies in harsh environments.</p>', PHD: '<h2>Survivability Research</h2><p>Designing for extreme waves, biofouling, corrosion in marine environment.</p>' } }],
  activities: [{ id: 'ocean-act-1', title: 'Wave Catcher', type: 'SIMULATION', description: 'Design a wave energy device', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'ocean-game', title: 'Tidal Engineer', type: 'simulation', description: 'Harness the power of tides', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ocean-q1', question: 'What causes tides?', options: ['Wind', 'The Moon\'s gravity', 'Rain', 'Sunlight'], correctAnswer: 1, explanation: 'Tides are caused by the Moon\'s gravitational pull on Earth\'s oceans.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 8: Energy Storage Fundamentals
export const energyStorageFundamentals: Module = {
  id: 'renewable-storage', slug: 'energy-storage-fundamentals', title: 'Energy Storage Fundamentals',
  description: { ELEMENTARY: 'Learn how we save energy for later, like a battery!', MIDDLE_SCHOOL: 'Discover different ways to store electricity for when we need it.', HIGH_SCHOOL: 'Explore batteries, pumped hydro, and other storage technologies.', UNDERGRADUATE: 'Analyze storage economics, sizing, and grid services.', GRADUATE: 'Examine long-duration storage, market design, and policy frameworks.', PHD: 'Research novel storage chemistries, aging mechanisms, and system optimization.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 25, MIDDLE_SCHOOL: 40, HIGH_SCHOOL: 55, UNDERGRADUATE: 75, GRADUATE: 100, PHD: 130 },
  lessons: [{ id: 'storage-1', title: 'Saving Power', content: { ELEMENTARY: '<h2>Energy Piggy Bank!</h2><p>Batteries store electricity like a piggy bank stores coins. Use it later when you need it!</p>', MIDDLE_SCHOOL: '<h2>Why Storage Matters</h2><p>Sun shines by day, wind blows unpredictably. Storage fills gaps between generation and demand.</p>', HIGH_SCHOOL: '<h2>Storage Technologies</h2><p>Lithium-ion (80% market), flow batteries, pumped hydro (95% of installed storage).</p>', UNDERGRADUATE: '<h2>Storage Economics</h2><p>LCOS (levelized cost of storage), revenue stacking from multiple services.</p>', GRADUATE: '<h2>Long-Duration Storage</h2><p>Beyond 4-hour Li-ion: iron-air, hydrogen, compressed air for seasonal shifting.</p>', PHD: '<h2>Degradation Science</h2><p>Calendar and cycle aging, capacity fade mechanisms, second-life applications.</p>' } }],
  activities: [{ id: 'storage-act-1', title: 'Battery Manager', type: 'SIMULATION', description: 'Optimize storage dispatch', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'storage-game', title: 'Grid Balancer', type: 'simulation', description: 'Use storage to balance the grid', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'storage-q1', question: 'What type of storage makes up 95% of installed capacity globally?', options: ['Lithium-ion', 'Pumped hydro', 'Compressed air', 'Hydrogen'], correctAnswer: 1, explanation: 'Pumped hydro storage accounts for about 95% of global installed storage capacity.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 9: Solar Thermal Systems
export const solarThermalSystems: Module = {
  id: 'renewable-solar-thermal', slug: 'solar-thermal-systems', title: 'Solar Thermal Systems',
  description: { ELEMENTARY: 'Learn how sunshine can heat water for your home!', MIDDLE_SCHOOL: 'Discover how solar collectors capture heat for hot water and buildings.', HIGH_SCHOOL: 'Explore concentrating solar power (CSP) and solar water heating systems.', UNDERGRADUATE: 'Analyze thermal storage, hybrid systems, and industrial process heat.', GRADUATE: 'Examine CSP dispatch strategies, molten salt storage, and grid integration.', PHD: 'Research high-temperature receivers, thermochemical cycles, and solar fuels.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'thermal-1', title: 'Heat from Sun', content: { ELEMENTARY: '<h2>Solar Hot Water!</h2><p>Dark panels on roofs absorb sunshine and heat water for showers and dishes!</p>', MIDDLE_SCHOOL: '<h2>Solar Thermal Basics</h2><p>Flat plate collectors heat water directly. Evacuated tubes work even in cold weather.</p>', HIGH_SCHOOL: '<h2>CSP Technology</h2><p>Parabolic troughs, power towers, dish systems concentrate sunlight to generate steam.</p>', UNDERGRADUATE: '<h2>Thermal Storage</h2><p>Molten salt stores heat for hours. Enables CSP to generate power after sunset.</p>', GRADUATE: '<h2>Hybrid Systems</h2><p>CSP + PV, CSP + natural gas for dispatchable solar electricity.</p>', PHD: '<h2>High-Temperature Applications</h2><p>Solar thermochemistry for hydrogen production and industrial decarbonization.</p>' } }],
  activities: [{ id: 'thermal-act-1', title: 'Solar Heater Design', type: 'SIMULATION', description: 'Design a solar water heating system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'thermal-game', title: 'Sun Catcher', type: 'simulation', description: 'Concentrate solar heat', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'thermal-q1', question: 'What does CSP stand for?', options: ['Cold Solar Power', 'Concentrating Solar Power', 'Clean Solar Panels', 'Central Sun Plant'], correctAnswer: 1, explanation: 'CSP stands for Concentrating Solar Power, which uses mirrors to focus sunlight.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 10: Small-Scale Wind
export const smallScaleWind: Module = {
  id: 'renewable-small-wind', slug: 'small-scale-wind', title: 'Small-Scale Wind',
  description: { ELEMENTARY: 'Learn about small wind turbines for homes and farms!', MIDDLE_SCHOOL: 'Discover how small wind turbines can power individual properties.', HIGH_SCHOOL: 'Explore residential wind turbine design, siting, and economics.', UNDERGRADUATE: 'Analyze micro-wind resource assessment and hybrid system design.', GRADUATE: 'Examine urban wind, building-integrated systems, and policy barriers.', PHD: 'Research vertical axis turbines, diffuser augmentation, and low-wind designs.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'small-wind-1', title: 'Wind at Home', content: { ELEMENTARY: '<h2>Backyard Wind!</h2><p>Small wind turbines can power your house if you live somewhere windy!</p>', MIDDLE_SCHOOL: '<h2>Small Wind Systems</h2><p>Typically 1-10 kW. Need average winds >5 m/s. Tower height matters!</p>', HIGH_SCHOOL: '<h2>Site Assessment</h2><p>Wind maps, anemometer data, obstacle analysis. Power ∝ v³ makes site crucial.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Tower height optimization, battery vs grid-tied, hybrid with solar.</p>', GRADUATE: '<h2>Urban Challenges</h2><p>Turbulence from buildings, noise concerns, aesthetic objections.</p>', PHD: '<h2>Novel Designs</h2><p>VAWT advantages in turbulent flow, shrouded turbines, building integration.</p>' } }],
  activities: [{ id: 'small-wind-act-1', title: 'Site Selection', type: 'SCENARIO', description: 'Evaluate sites for small wind', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'small-wind-game', title: 'Wind Scout', type: 'simulation', description: 'Find the best wind site', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'small-wind-q1', question: 'Why does tower height matter for wind turbines?', options: ['Looks nicer', 'Wind is stronger and steadier higher up', 'Easier to maintain', 'Cheaper'], correctAnswer: 1, explanation: 'Wind speed increases with height due to less ground friction.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 11: Microgrids
export const microgrids: Module = {
  id: 'renewable-microgrids', slug: 'microgrids', title: 'Microgrids',
  description: { ELEMENTARY: 'Learn about small power systems that work on their own!', MIDDLE_SCHOOL: 'Discover how local energy systems can power communities independently.', HIGH_SCHOOL: 'Explore microgrid architecture, islanding, and resilience benefits.', UNDERGRADUATE: 'Analyze microgrid control strategies, protection schemes, and economics.', GRADUATE: 'Examine networked microgrids, transactive energy, and regulatory frameworks.', PHD: 'Research multi-agent control, blockchain integration, and optimal sizing.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'micro-1', title: 'Local Power', content: { ELEMENTARY: '<h2>Neighborhood Power!</h2><p>A microgrid is like having your own small power station for your neighborhood!</p>', MIDDLE_SCHOOL: '<h2>What is a Microgrid?</h2><p>Local generation + storage + loads. Can disconnect from main grid during outages.</p>', HIGH_SCHOOL: '<h2>Microgrid Benefits</h2><p>Resilience, renewable integration, reduced losses, energy independence.</p>', UNDERGRADUATE: '<h2>Control Architecture</h2><p>Hierarchical control: primary (droop), secondary (restoration), tertiary (optimization).</p>', GRADUATE: '<h2>Networked Microgrids</h2><p>Multiple microgrids trading energy, mutual support during emergencies.</p>', PHD: '<h2>Advanced Control</h2><p>Multi-agent systems, distributed optimization, cyber-physical security.</p>' } }],
  activities: [{ id: 'micro-act-1', title: 'Build a Microgrid', type: 'SIMULATION', description: 'Design a community microgrid', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'micro-game', title: 'Grid Manager', type: 'simulation', description: 'Keep your microgrid running', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'micro-q1', question: 'What is a key benefit of microgrids?', options: ['Cheaper electricity always', 'Can work when main grid fails', 'No maintenance needed', 'Uses only solar'], correctAnswer: 1, explanation: 'Microgrids can island from the main grid and keep operating during outages.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 12: Grid Integration
export const gridIntegration: Module = {
  id: 'renewable-grid', slug: 'grid-integration', title: 'Grid Integration',
  description: { ELEMENTARY: 'Learn how renewable energy connects to our power grid!', MIDDLE_SCHOOL: 'Discover how solar and wind are added to the electricity network.', HIGH_SCHOOL: 'Explore inverter technology, interconnection, and grid stability.', UNDERGRADUATE: 'Analyze power electronics, grid codes, and ancillary services.', GRADUATE: 'Examine high-penetration challenges, flexibility options, and market design.', PHD: 'Research grid-forming inverters, synthetic inertia, and 100% inverter-based grids.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 55, UNDERGRADUATE: 75, GRADUATE: 100, PHD: 130 },
  lessons: [{ id: 'grid-1', title: 'Connecting Clean Power', content: { ELEMENTARY: '<h2>Power Network!</h2><p>The grid is like a highway for electricity. Renewable power joins in!</p>', MIDDLE_SCHOOL: '<h2>How Renewables Connect</h2><p>Inverters convert DC to AC. Must match grid frequency (50/60 Hz) and voltage.</p>', HIGH_SCHOOL: '<h2>Grid Challenges</h2><p>Variability, ramp rates, voltage regulation, frequency stability.</p>', UNDERGRADUATE: '<h2>Ancillary Services</h2><p>Frequency regulation, voltage support, spinning reserve from renewables + storage.</p>', GRADUATE: '<h2>High Penetration</h2><p>Duck curve, curtailment, negative prices, flexibility requirements.</p>', PHD: '<h2>Grid-Forming Inverters</h2><p>Black start capability, synthetic inertia, stable 100% IBR grids.</p>' } }],
  activities: [{ id: 'grid-act-1', title: 'Balance the Grid', type: 'SIMULATION', description: 'Match supply and demand', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'grid-game', title: 'Grid Operator', type: 'simulation', description: 'Keep frequency stable', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'grid-q1', question: 'What device converts solar DC to grid AC?', options: ['Battery', 'Inverter', 'Transformer', 'Generator'], correctAnswer: 1, explanation: 'Inverters convert DC electricity from solar panels to AC for the grid.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 13: Energy Efficiency
export const energyEfficiency: Module = {
  id: 'renewable-efficiency', slug: 'energy-efficiency', title: 'Energy Efficiency',
  description: { ELEMENTARY: 'Learn how to use less energy while still having fun!', MIDDLE_SCHOOL: 'Discover ways to save energy at home and school.', HIGH_SCHOOL: 'Explore energy auditing, appliance efficiency, and building performance.', UNDERGRADUATE: 'Analyze demand-side management, ESCO models, and policy mechanisms.', GRADUATE: 'Examine rebound effects, behavioral economics, and efficiency standards.', PHD: 'Research energy-GDP decoupling, efficiency frontiers, and sufficiency debates.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'eff-1', title: 'Save Energy', content: { ELEMENTARY: '<h2>Energy Detective!</h2><p>Turn off lights, unplug chargers, use less hot water. Small actions add up!</p>', MIDDLE_SCHOOL: '<h2>Efficiency Basics</h2><p>LED lights use 75% less energy. Efficient appliances have ENERGY STAR labels.</p>', HIGH_SCHOOL: '<h2>Energy Auditing</h2><p>Thermal imaging, blower door tests, utility bill analysis identify savings.</p>', UNDERGRADUATE: '<h2>DSM Programs</h2><p>Utility rebates, time-of-use rates, demand response programs.</p>', GRADUATE: '<h2>Rebound Effects</h2><p>Efficiency savings partly offset by increased consumption. Policy implications.</p>', PHD: '<h2>Sufficiency</h2><p>Beyond efficiency: questioning energy service demands and absolute consumption.</p>' } }],
  activities: [{ id: 'eff-act-1', title: 'Home Energy Audit', type: 'SCENARIO', description: 'Find energy waste in a home', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'eff-game', title: 'Efficiency Hunter', type: 'puzzle', description: 'Find and fix energy waste', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'eff-q1', question: 'What label shows energy-efficient appliances?', options: ['ECO POWER', 'ENERGY STAR', 'GREEN SEAL', 'POWER PLUS'], correctAnswer: 1, explanation: 'ENERGY STAR is the EPA label for energy-efficient products.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 14: Off-Grid Systems
export const offGridSystems: Module = {
  id: 'renewable-offgrid', slug: 'off-grid-systems', title: 'Off-Grid Systems',
  description: { ELEMENTARY: 'Learn how to have electricity without power lines!', MIDDLE_SCHOOL: 'Discover how remote homes and cabins generate their own power.', HIGH_SCHOOL: 'Explore off-grid system design, sizing, and component selection.', UNDERGRADUATE: 'Analyze hybrid off-grid systems, reliability metrics, and economics.', GRADUATE: 'Examine rural electrification models and mini-grid development.', PHD: 'Research distributed generation optimization and energy access pathways.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'offgrid-1', title: 'Power Independence', content: { ELEMENTARY: '<h2>No Power Lines!</h2><p>Some homes make all their own electricity with solar panels and batteries!</p>', MIDDLE_SCHOOL: '<h2>Off-Grid Basics</h2><p>Solar + wind + batteries + generator backup. Must size for worst case.</p>', HIGH_SCHOOL: '<h2>System Sizing</h2><p>Daily load analysis, days of autonomy, battery bank sizing, array sizing.</p>', UNDERGRADUATE: '<h2>Reliability Analysis</h2><p>Loss of load probability, system availability, optimal component sizing.</p>', GRADUATE: '<h2>Mini-Grids</h2><p>Serving multiple households, tariff design, community ownership models.</p>', PHD: '<h2>Energy Access</h2><p>1 billion without electricity. Pathways to universal access by 2030.</p>' } }],
  activities: [{ id: 'offgrid-act-1', title: 'Design Off-Grid Home', type: 'SIMULATION', description: 'Size an off-grid system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'offgrid-game', title: 'Off-Grid Survivor', type: 'simulation', description: 'Keep your cabin powered', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'offgrid-q1', question: 'What stores power for off-grid homes at night?', options: ['Solar panels', 'Wind turbines', 'Batteries', 'Generators'], correctAnswer: 2, explanation: 'Batteries store solar/wind power for use when the sun isn\'t shining.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 15: Electric Vehicles & Renewables
export const electricVehiclesRenewables: Module = {
  id: 'renewable-ev', slug: 'electric-vehicles-renewables', title: 'Electric Vehicles & Renewables',
  description: { ELEMENTARY: 'Learn how cars can run on sunshine and wind!', MIDDLE_SCHOOL: 'Discover how electric vehicles connect to renewable energy.', HIGH_SCHOOL: 'Explore EV charging infrastructure and renewable integration.', UNDERGRADUATE: 'Analyze V2G technology, fleet electrification, and lifecycle emissions.', GRADUATE: 'Examine EV grid impacts, managed charging, and transport decarbonization.', PHD: 'Research autonomous EVs, mobility-as-a-service, and system optimization.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'ev-1', title: 'Clean Driving', content: { ELEMENTARY: '<h2>Sun-Powered Cars!</h2><p>Electric cars can charge from solar panels - driving on sunshine!</p>', MIDDLE_SCHOOL: '<h2>EV + Solar</h2><p>Charge EVs during sunny hours. Home solar can power your commute!</p>', HIGH_SCHOOL: '<h2>Charging Infrastructure</h2><p>Level 1, 2, DC fast charging. Workplace and public charging networks.</p>', UNDERGRADUATE: '<h2>Vehicle-to-Grid</h2><p>EV batteries as distributed storage. Bidirectional charging technology.</p>', GRADUATE: '<h2>Fleet Electrification</h2><p>Buses, delivery vehicles, heavy trucks. Charging depot optimization.</p>', PHD: '<h2>System Integration</h2><p>Transport + electricity coupling, autonomous ride-sharing, urban planning.</p>' } }],
  activities: [{ id: 'ev-act-1', title: 'EV Charging Plan', type: 'SCENARIO', description: 'Plan EV charging from solar', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'ev-game', title: 'EV Fleet Manager', type: 'simulation', description: 'Manage electric vehicle charging', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ev-q1', question: 'What does V2G stand for?', options: ['Vehicle 2 Go', 'Vehicle to Grid', 'Very 2 Green', 'Voltage 2 Gauge'], correctAnswer: 1, explanation: 'V2G means Vehicle-to-Grid, where EVs can send power back to the grid.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 16: Green Hydrogen
export const greenHydrogen: Module = {
  id: 'renewable-hydrogen', slug: 'green-hydrogen', title: 'Green Hydrogen',
  description: { ELEMENTARY: 'Learn how water can become clean fuel!', MIDDLE_SCHOOL: 'Discover how renewable electricity splits water into hydrogen fuel.', HIGH_SCHOOL: 'Explore electrolysis technology, hydrogen storage, and fuel cells.', UNDERGRADUATE: 'Analyze green hydrogen economics, efficiency, and applications.', GRADUATE: 'Examine hydrogen\'s role in hard-to-electrify sectors and P2X pathways.', PHD: 'Research advanced electrolyzers, hydrogen carriers, and system integration.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 55, UNDERGRADUATE: 75, GRADUATE: 100, PHD: 130 },
  lessons: [{ id: 'h2-1', title: 'Hydrogen Power', content: { ELEMENTARY: '<h2>Water to Fuel!</h2><p>We can split water (H2O) into hydrogen gas using electricity. Clean fuel!</p>', MIDDLE_SCHOOL: '<h2>Electrolysis</h2><p>Electricity splits water: 2H2O → 2H2 + O2. Green hydrogen uses renewable electricity.</p>', HIGH_SCHOOL: '<h2>Hydrogen Technologies</h2><p>PEM and alkaline electrolyzers. Compressed/liquid storage. PEM fuel cells.</p>', UNDERGRADUATE: '<h2>Hydrogen Economics</h2><p>~60-70% round-trip efficiency. Cost declining but higher than batteries for most uses.</p>', GRADUATE: '<h2>Hard-to-Abate Sectors</h2><p>Steel, shipping, aviation, long-haul trucking where batteries struggle.</p>', PHD: '<h2>P2X Pathways</h2><p>Power-to-hydrogen-to-ammonia/methanol/synthetic fuels. Global trade implications.</p>' } }],
  activities: [{ id: 'h2-act-1', title: 'Hydrogen System', type: 'SIMULATION', description: 'Design a green hydrogen system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'h2-game', title: 'Hydrogen Factory', type: 'simulation', description: 'Produce and use green hydrogen', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'h2-q1', question: 'What makes hydrogen "green"?', options: ['It\'s colored green', 'Made using renewable electricity', 'From plants', 'Natural color'], correctAnswer: 1, explanation: 'Green hydrogen is made by electrolysis using renewable electricity.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 17: Heat Pumps
export const heatPumps: Module = {
  id: 'renewable-heat-pumps', slug: 'heat-pumps', title: 'Heat Pumps',
  description: { ELEMENTARY: 'Learn about magical machines that move heat!', MIDDLE_SCHOOL: 'Discover how heat pumps heat and cool buildings efficiently.', HIGH_SCHOOL: 'Explore heat pump thermodynamics, types, and efficiency metrics.', UNDERGRADUATE: 'Analyze air-source, ground-source, and industrial heat pumps.', GRADUATE: 'Examine heat pump integration, sector coupling, and high-temp applications.', PHD: 'Research natural refrigerants, ultra-low-temp operation, and system optimization.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'hp-1', title: 'Moving Heat', content: { ELEMENTARY: '<h2>Heat Movers!</h2><p>Heat pumps move heat from outside to inside - even when it\'s cold out!</p>', MIDDLE_SCHOOL: '<h2>How Heat Pumps Work</h2><p>Like a refrigerator in reverse. Use electricity to move heat, not create it.</p>', HIGH_SCHOOL: '<h2>Efficiency Metrics</h2><p>COP (Coefficient of Performance) typically 3-4. Means 3-4x heat output vs electric input.</p>', UNDERGRADUATE: '<h2>Heat Pump Types</h2><p>Air-source (most common), ground-source (highest efficiency), water-source.</p>', GRADUATE: '<h2>Building Decarbonization</h2><p>Heat pumps key to electrifying heating. Cold climate performance improving.</p>', PHD: '<h2>Industrial Heat</h2><p>High-temperature heat pumps for process heat. Up to 150°C+ emerging.</p>' } }],
  activities: [{ id: 'hp-act-1', title: 'Heat Pump Sizing', type: 'SCENARIO', description: 'Size a heat pump for a home', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'hp-game', title: 'Heat Mover', type: 'puzzle', description: 'Keep the building comfortable', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'hp-q1', question: 'What does COP of 3 mean for a heat pump?', options: ['3 speed settings', '3x heat output vs electricity input', '3 years warranty', '3 refrigerants'], correctAnswer: 1, explanation: 'COP of 3 means 3 units of heat delivered for every 1 unit of electricity.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 18: Renewable Energy Policy
export const renewableEnergyPolicy: Module = {
  id: 'renewable-policy', slug: 'renewable-energy-policy', title: 'Renewable Energy Policy',
  description: { ELEMENTARY: 'Learn how governments help clean energy grow!', MIDDLE_SCHOOL: 'Discover policies that encourage solar, wind, and other clean energy.', HIGH_SCHOOL: 'Explore tax credits, renewable standards, and carbon pricing.', UNDERGRADUATE: 'Analyze policy instruments, their effectiveness, and design considerations.', GRADUATE: 'Examine policy interactions, political economy, and international frameworks.', PHD: 'Research policy modeling, innovation systems, and governance transitions.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'policy-1', title: 'Clean Energy Rules', content: { ELEMENTARY: '<h2>Helping Clean Energy!</h2><p>Governments make rules that help solar and wind grow faster!</p>', MIDDLE_SCHOOL: '<h2>Policy Tools</h2><p>Tax credits, rebates, renewable standards, net metering help clean energy compete.</p>', HIGH_SCHOOL: '<h2>Policy Mechanisms</h2><p>Feed-in tariffs, RPS, ITC/PTC, carbon pricing, green bonds.</p>', UNDERGRADUATE: '<h2>Policy Design</h2><p>Technology-neutral vs. specific. Quantity-based vs. price-based. Federal vs. state.</p>', GRADUATE: '<h2>Political Economy</h2><p>Incumbent resistance, coalition building, just transition considerations.</p>', PHD: '<h2>Policy Modeling</h2><p>Agent-based models, policy feedback, innovation systems approaches.</p>' } }],
  activities: [{ id: 'policy-act-1', title: 'Design a Policy', type: 'SCENARIO', description: 'Create renewable energy incentives', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'policy-game', title: 'Policy Maker', type: 'simulation', description: 'Grow renewable energy with policy', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'policy-q1', question: 'What does RPS stand for?', options: ['Renewable Power Standard', 'Renewable Portfolio Standard', 'Real Power System', 'Regional Power Supply'], correctAnswer: 1, explanation: 'RPS stands for Renewable Portfolio Standard, requiring utilities to source a percentage from renewables.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 19: Community Energy
export const communityEnergy: Module = {
  id: 'renewable-community', slug: 'community-energy', title: 'Community Energy',
  description: { ELEMENTARY: 'Learn how neighborhoods can make clean energy together!', MIDDLE_SCHOOL: 'Discover how communities own and share renewable energy projects.', HIGH_SCHOOL: 'Explore community solar, wind cooperatives, and shared ownership models.', UNDERGRADUATE: 'Analyze community energy business models, financing, and social benefits.', GRADUATE: 'Examine energy democracy, cooperative structures, and equity considerations.', PHD: 'Research community energy as sociotechnical transition and grassroots innovation.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'comm-1', title: 'Power Together', content: { ELEMENTARY: '<h2>Neighbors Sharing Power!</h2><p>A whole neighborhood can share a big solar project!</p>', MIDDLE_SCHOOL: '<h2>Community Models</h2><p>Community solar lets renters participate. Wind co-ops share ownership and profits.</p>', HIGH_SCHOOL: '<h2>Ownership Structures</h2><p>Cooperatives, community benefit societies, municipal utilities, shared ownership.</p>', UNDERGRADUATE: '<h2>Business Models</h2><p>Subscription vs ownership. Third-party vs community-led. Virtual net metering.</p>', GRADUATE: '<h2>Energy Democracy</h2><p>Community ownership challenges incumbent utility model. Distributes benefits locally.</p>', PHD: '<h2>Grassroots Innovation</h2><p>Community energy as niche innovation. Scaling challenges and mainstream integration.</p>' } }],
  activities: [{ id: 'comm-act-1', title: 'Start Community Solar', type: 'SCENARIO', description: 'Plan a community solar project', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'comm-game', title: 'Community Organizer', type: 'simulation', description: 'Build community energy support', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'comm-q1', question: 'Who can benefit from community solar?', options: ['Only homeowners', 'Only wealthy people', 'Renters and homeowners', 'Only farmers'], correctAnswer: 2, explanation: 'Community solar allows renters and those without suitable roofs to access solar benefits.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 20: Carbon Footprint & Climate
export const carbonFootprintClimate: Module = {
  id: 'renewable-carbon', slug: 'carbon-footprint-climate', title: 'Carbon Footprint & Climate',
  description: { ELEMENTARY: 'Learn how clean energy helps stop climate change!', MIDDLE_SCHOOL: 'Discover how renewable energy reduces greenhouse gas emissions.', HIGH_SCHOOL: 'Explore lifecycle carbon analysis and climate mitigation through renewables.', UNDERGRADUATE: 'Analyze embodied carbon, scope emissions, and renewable\'s role in decarbonization.', GRADUATE: 'Examine carbon accounting frameworks, net-zero pathways, and remaining emissions.', PHD: 'Research carbon budgets, negative emissions, and integrated assessment modeling.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'carbon-1', title: 'Clean vs Dirty Energy', content: { ELEMENTARY: '<h2>Saving the Planet!</h2><p>Coal and gas make pollution. Solar and wind are clean!</p>', MIDDLE_SCHOOL: '<h2>Carbon Emissions</h2><p>Burning fossil fuels releases CO2. Renewable generation is nearly carbon-free.</p>', HIGH_SCHOOL: '<h2>Lifecycle Analysis</h2><p>Solar: ~20-50 gCO2/kWh. Coal: ~800-1200 gCO2/kWh. Include manufacturing.</p>', UNDERGRADUATE: '<h2>Scope Emissions</h2><p>Scope 1: direct. Scope 2: purchased electricity. Scope 3: supply chain.</p>', GRADUATE: '<h2>Net-Zero Pathways</h2><p>Electricity first, then heat, transport. Residual emissions need removal.</p>', PHD: '<h2>Carbon Budgets</h2><p>IPCC remaining budget for 1.5°C. Implications for renewable deployment rates.</p>' } }],
  activities: [{ id: 'carbon-act-1', title: 'Carbon Calculator', type: 'SIMULATION', description: 'Calculate your energy footprint', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'carbon-game', title: 'Carbon Cutter', type: 'puzzle', description: 'Reduce emissions with renewables', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'carbon-q1', question: 'How much CO2 does solar produce per kWh?', options: ['Same as coal', '~20-50 grams', '500 grams', 'Zero ever'], correctAnswer: 1, explanation: 'Solar produces about 20-50 gCO2/kWh when including manufacturing.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 21: Renewable Energy Careers
export const renewableEnergyCareers: Module = {
  id: 'renewable-careers', slug: 'renewable-energy-careers', title: 'Renewable Energy Careers',
  description: { ELEMENTARY: 'Learn about cool jobs working with clean energy!', MIDDLE_SCHOOL: 'Discover careers in the growing renewable energy industry.', HIGH_SCHOOL: 'Explore education pathways and job opportunities in renewables.', UNDERGRADUATE: 'Analyze renewable energy job markets, skills, and career planning.', GRADUATE: 'Examine workforce development, just transition, and labor market dynamics.', PHD: 'Research green jobs, skill gaps, and socioeconomic transition impacts.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 15, MIDDLE_SCHOOL: 25, HIGH_SCHOOL: 40, UNDERGRADUATE: 60, GRADUATE: 85, PHD: 110 },
  lessons: [{ id: 'career-1', title: 'Green Jobs', content: { ELEMENTARY: '<h2>Energy Heroes!</h2><p>Solar installers, wind technicians, and engineers build our clean energy future!</p>', MIDDLE_SCHOOL: '<h2>Career Options</h2><p>Solar installer, wind turbine tech, electrical engineer, energy auditor, project manager.</p>', HIGH_SCHOOL: '<h2>Pathways</h2><p>Trade school, community college, university degrees. Apprenticeships available.</p>', UNDERGRADUATE: '<h2>Job Market</h2><p>Solar installer is fastest-growing US occupation. Median wages, job projections.</p>', GRADUATE: '<h2>Just Transition</h2><p>Retraining fossil fuel workers. Geographic distribution of new jobs.</p>', PHD: '<h2>Workforce Research</h2><p>Skills taxonomy, labor market modeling, equity in green job access.</p>' } }],
  activities: [{ id: 'career-act-1', title: 'Career Explorer', type: 'SCENARIO', description: 'Plan your renewable energy career', estimatedMinutes: 15, interactiveContent: {} }],
  game: { id: 'career-game', title: 'Career Builder', type: 'puzzle', description: 'Match skills to careers', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'career-q1', question: 'What is one of the fastest-growing US jobs?', options: ['Coal miner', 'Solar installer', 'Oil driller', 'Gas station attendant'], correctAnswer: 1, explanation: 'Solar installer is consistently one of the fastest-growing occupations in the US.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 22: Passive Solar Design
export const passiveSolarDesign: Module = {
  id: 'renewable-passive-solar', slug: 'passive-solar-design', title: 'Passive Solar Design',
  description: { ELEMENTARY: 'Learn how buildings can use sunshine without any machines!', MIDDLE_SCHOOL: 'Discover how building design captures free heat and light from the sun.', HIGH_SCHOOL: 'Explore passive solar heating, daylighting, and thermal mass principles.', UNDERGRADUATE: 'Analyze passive solar design strategies, climate considerations, and performance.', GRADUATE: 'Examine advanced passive techniques, retrofit strategies, and design optimization.', PHD: 'Research adaptive facades, predictive control, and climate-responsive design.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'passive-1', title: 'Free Solar Heat', content: { ELEMENTARY: '<h2>Smart Buildings!</h2><p>Big south windows let sunshine warm the house for free!</p>', MIDDLE_SCHOOL: '<h2>Passive Solar Basics</h2><p>South-facing windows, thermal mass (concrete/tile), overhangs for summer shade.</p>', HIGH_SCHOOL: '<h2>Design Elements</h2><p>Aperture (windows), absorber, thermal mass, distribution, control (overhangs, vents).</p>', UNDERGRADUATE: '<h2>Climate Adaptation</h2><p>Different strategies for heating vs cooling climates. Glass-to-mass ratios.</p>', GRADUATE: '<h2>Advanced Techniques</h2><p>Trombe walls, sunspaces, earth tubes, phase change materials.</p>', PHD: '<h2>Adaptive Systems</h2><p>Electrochromic glazing, automated shading, model predictive control.</p>' } }],
  activities: [{ id: 'passive-act-1', title: 'Design Passive Home', type: 'SIMULATION', description: 'Orient a home for passive solar', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'passive-game', title: 'Sun Architect', type: 'puzzle', description: 'Design an efficient building', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'passive-q1', question: 'In the Northern Hemisphere, which direction should passive solar windows face?', options: ['North', 'South', 'East', 'West'], correctAnswer: 1, explanation: 'South-facing windows receive the most direct sunlight in the Northern Hemisphere.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 23: Net-Zero Buildings
export const netZeroBuildings: Module = {
  id: 'renewable-net-zero', slug: 'net-zero-buildings', title: 'Net-Zero Buildings',
  description: { ELEMENTARY: 'Learn about buildings that make as much energy as they use!', MIDDLE_SCHOOL: 'Discover how buildings can produce all their own energy.', HIGH_SCHOOL: 'Explore net-zero energy building design and verification.', UNDERGRADUATE: 'Analyze net-zero strategies, costs, and certification systems.', GRADUATE: 'Examine net-zero districts, grid interactions, and policy frameworks.', PHD: 'Research zero-carbon buildings, embodied carbon, and whole-life carbon approaches.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'netzero-1', title: 'Zero Energy', content: { ELEMENTARY: '<h2>Energy Balance!</h2><p>Some buildings make ALL the energy they need with solar panels!</p>', MIDDLE_SCHOOL: '<h2>Net-Zero Concept</h2><p>Reduce energy use first (efficiency), then generate the rest with renewables on site.</p>', HIGH_SCHOOL: '<h2>Net-Zero Design</h2><p>Super-insulation, air sealing, efficient systems, right-sized solar. Annual energy balance.</p>', UNDERGRADUATE: '<h2>Definitions</h2><p>Net-zero site energy, source energy, cost, emissions. Different accounting methods.</p>', GRADUATE: '<h2>District Scale</h2><p>Net-zero neighborhoods and campuses. Shared resources, load diversity benefits.</p>', PHD: '<h2>Whole-Life Carbon</h2><p>Embodied carbon often rivals operational. Lifecycle approaches needed.</p>' } }],
  activities: [{ id: 'netzero-act-1', title: 'Zero Energy Design', type: 'SIMULATION', description: 'Design a net-zero building', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'netzero-game', title: 'Zero Builder', type: 'simulation', description: 'Achieve net-zero energy', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'netzero-q1', question: 'What comes first in net-zero building design?', options: ['Add more solar', 'Reduce energy use', 'Paint it green', 'Add batteries'], correctAnswer: 1, explanation: 'Net-zero design prioritizes reducing energy use through efficiency before adding renewables.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 24: Smart Grid Systems
export const smartGridSystems: Module = {
  id: 'renewable-smart-grid', slug: 'smart-grid-systems', title: 'Smart Grid Systems',
  description: { ELEMENTARY: 'Learn how computers help manage our electricity!', MIDDLE_SCHOOL: 'Discover how smart technology makes the power grid work better.', HIGH_SCHOOL: 'Explore smart meters, demand response, and grid automation.', UNDERGRADUATE: 'Analyze smart grid architecture, communications, and cybersecurity.', GRADUATE: 'Examine distribution automation, DER management, and market platforms.', PHD: 'Research transactive energy, grid-edge intelligence, and emergent behavior.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'smart-1', title: 'Intelligent Grids', content: { ELEMENTARY: '<h2>Smart Electricity!</h2><p>Smart grids use computers to make sure electricity goes where it\'s needed!</p>', MIDDLE_SCHOOL: '<h2>Smart Grid Basics</h2><p>Two-way communication, smart meters, automatic fault detection, demand response.</p>', HIGH_SCHOOL: '<h2>Smart Technologies</h2><p>AMI, SCADA, distribution automation, phasor measurement units, DERMS.</p>', UNDERGRADUATE: '<h2>Communication Layers</h2><p>HAN, NAN, WAN. Standards: IEEE 2030, IEC 61850. Cybersecurity challenges.</p>', GRADUATE: '<h2>DER Integration</h2><p>Distributed energy resource management systems. Aggregation and virtual power plants.</p>', PHD: '<h2>Transactive Energy</h2><p>Market-based coordination of distributed resources. Emergent grid behavior.</p>' } }],
  activities: [{ id: 'smart-act-1', title: 'Smart Grid Simulator', type: 'SIMULATION', description: 'Manage a smart grid', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'smart-game', title: 'Grid Controller', type: 'simulation', description: 'Optimize smart grid operations', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'smart-q1', question: 'What enables two-way communication in a smart grid?', options: ['Bigger wires', 'Smart meters', 'More power plants', 'Faster turbines'], correctAnswer: 1, explanation: 'Smart meters enable two-way communication between utilities and customers.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 25: Battery Technology
export const batteryTechnology: Module = {
  id: 'renewable-battery', slug: 'battery-technology', title: 'Battery Technology',
  description: { ELEMENTARY: 'Learn how batteries store electricity for later!', MIDDLE_SCHOOL: 'Discover how different batteries work for renewable energy storage.', HIGH_SCHOOL: 'Explore battery chemistry, performance, and applications.', UNDERGRADUATE: 'Analyze battery systems, BMS design, and degradation mechanisms.', GRADUATE: 'Examine advanced chemistries, safety, and recycling challenges.', PHD: 'Research solid-state, metal-air, and beyond lithium technologies.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 55, UNDERGRADUATE: 75, GRADUATE: 100, PHD: 130 },
  lessons: [{ id: 'battery-1', title: 'Storing Power', content: { ELEMENTARY: '<h2>Electricity Banks!</h2><p>Batteries store electricity like a piggy bank stores money - for when you need it!</p>', MIDDLE_SCHOOL: '<h2>Battery Types</h2><p>Lithium-ion most common. Flow batteries for long duration. Lead-acid still used in some applications.</p>', HIGH_SCHOOL: '<h2>Battery Chemistry</h2><p>Anode, cathode, electrolyte. Li-ion: LFP vs NMC. Energy vs power density tradeoffs.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Battery management systems, thermal management, cell balancing, state estimation.</p>', GRADUATE: '<h2>Degradation</h2><p>Calendar and cycle aging. SEI growth, lithium plating, capacity fade mechanisms.</p>', PHD: '<h2>Next Generation</h2><p>Solid-state, lithium-sulfur, sodium-ion, iron-air. Materials research frontiers.</p>' } }],
  activities: [{ id: 'battery-act-1', title: 'Battery Lab', type: 'SIMULATION', description: 'Test different battery chemistries', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'battery-game', title: 'Battery Designer', type: 'puzzle', description: 'Build the best battery system', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'battery-q1', question: 'What is the most common battery chemistry for grid storage?', options: ['Lead-acid', 'Lithium-ion', 'Nickel-cadmium', 'Zinc-carbon'], correctAnswer: 1, explanation: 'Lithium-ion batteries dominate grid storage due to high energy density and declining costs.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 26: Solar Installation & Maintenance
export const solarInstallationMaintenance: Module = {
  id: 'renewable-solar-install', slug: 'solar-installation-maintenance', title: 'Solar Installation & Maintenance',
  description: { ELEMENTARY: 'Learn how workers put solar panels on roofs!', MIDDLE_SCHOOL: 'Discover how solar systems are installed and maintained.', HIGH_SCHOOL: 'Explore installation best practices, codes, and O&M procedures.', UNDERGRADUATE: 'Analyze commissioning, performance monitoring, and troubleshooting.', GRADUATE: 'Examine fleet management, predictive maintenance, and repowering.', PHD: 'Research degradation analytics, reliability modeling, and O&M optimization.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'install-1', title: 'Installing Solar', content: { ELEMENTARY: '<h2>Solar Workers!</h2><p>Trained workers safely install solar panels on rooftops!</p>', MIDDLE_SCHOOL: '<h2>Installation Steps</h2><p>Site survey, permits, mounting rails, panels, wiring, inverter, inspection.</p>', HIGH_SCHOOL: '<h2>Codes & Safety</h2><p>NEC requirements, rapid shutdown, grounding, fire setbacks, electrical permits.</p>', UNDERGRADUATE: '<h2>Commissioning</h2><p>I-V curve tracing, thermal imaging, performance verification, monitoring setup.</p>', GRADUATE: '<h2>O&M Programs</h2><p>Preventive vs corrective maintenance. Fleet analytics and benchmarking.</p>', PHD: '<h2>Performance Analytics</h2><p>Machine learning for fault detection. Degradation modeling and prediction.</p>' } }],
  activities: [{ id: 'install-act-1', title: 'Plan an Installation', type: 'STEP_GUIDED', description: 'Walk through solar installation steps', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'install-game', title: 'Solar Installer', type: 'simulation', description: 'Install a solar system safely', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'install-q1', question: 'What code governs solar electrical installations in the US?', options: ['Building Code', 'NEC (National Electrical Code)', 'Fire Code', 'Plumbing Code'], correctAnswer: 1, explanation: 'The National Electrical Code (NEC) contains requirements for solar PV installations.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 27: Wind Farm Design
export const windFarmDesign: Module = {
  id: 'renewable-wind-farm', slug: 'wind-farm-design', title: 'Wind Farm Design',
  description: { ELEMENTARY: 'Learn how wind farms are planned and built!', MIDDLE_SCHOOL: 'Discover what goes into building a wind farm.', HIGH_SCHOOL: 'Explore wind resource assessment, layout design, and environmental review.', UNDERGRADUATE: 'Analyze wind farm optimization, wake effects, and project development.', GRADUATE: 'Examine offshore design, foundation types, and transmission planning.', PHD: 'Research wind farm control, data-driven optimization, and hybrid plants.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 55, UNDERGRADUATE: 75, GRADUATE: 100, PHD: 130 },
  lessons: [{ id: 'windfarm-1', title: 'Building Wind Farms', content: { ELEMENTARY: '<h2>Wind Power Places!</h2><p>Engineers pick windy spots and plan where to put each turbine!</p>', MIDDLE_SCHOOL: '<h2>Wind Farm Planning</h2><p>Measure wind for 1-2 years. Check environmental impacts. Design turbine layout.</p>', HIGH_SCHOOL: '<h2>Site Development</h2><p>Met masts, Lidar, wind resource analysis. Noise setbacks, bird/bat studies.</p>', UNDERGRADUATE: '<h2>Layout Optimization</h2><p>Wake effects reduce output 10-20%. Spacing, staggered rows, wind rose analysis.</p>', GRADUATE: '<h2>Offshore Challenges</h2><p>Monopile, jacket, floating foundations. Submarine cables, O&M logistics.</p>', PHD: '<h2>Advanced Control</h2><p>Wake steering, dynamic yaw control, coordinated operation for load reduction.</p>' } }],
  activities: [{ id: 'windfarm-act-1', title: 'Design a Wind Farm', type: 'SIMULATION', description: 'Layout a wind farm for maximum output', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'windfarm-game', title: 'Wind Farm Planner', type: 'simulation', description: 'Build an efficient wind farm', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'windfarm-q1', question: 'How long is wind typically measured before building a wind farm?', options: ['1 day', '1-2 years', '10 years', '1 hour'], correctAnswer: 1, explanation: 'Wind resource assessment typically requires 1-2 years of measurements.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 28: Industrial Decarbonization
export const industrialDecarbonization: Module = {
  id: 'renewable-industrial', slug: 'industrial-decarbonization', title: 'Industrial Decarbonization',
  description: { ELEMENTARY: 'Learn how factories can use clean energy too!', MIDDLE_SCHOOL: 'Discover how industries are switching to renewable energy.', HIGH_SCHOOL: 'Explore industrial energy use, efficiency, and electrification.', UNDERGRADUATE: 'Analyze industrial heat, process emissions, and decarbonization pathways.', GRADUATE: 'Examine steel, cement, chemicals and hard-to-abate sector strategies.', PHD: 'Research breakthrough technologies, CCUS, and industrial ecosystem transformation.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'ind-1', title: 'Clean Factories', content: { ELEMENTARY: '<h2>Green Factories!</h2><p>Factories can use solar, wind, and other clean energy instead of burning fuels!</p>', MIDDLE_SCHOOL: '<h2>Industrial Energy</h2><p>Factories use lots of energy for heat and machines. Many are switching to renewables.</p>', HIGH_SCHOOL: '<h2>Decarbonization Options</h2><p>Energy efficiency, electrification, green hydrogen, sustainable fuels.</p>', UNDERGRADUATE: '<h2>Process Heat</h2><p>Low (<150°C), medium (150-400°C), high (>400°C) temp heat have different solutions.</p>', GRADUATE: '<h2>Hard-to-Abate Sectors</h2><p>Steel: hydrogen-DRI. Cement: carbon capture. Chemicals: electrification + feedstock.</p>', PHD: '<h2>Industrial Ecosystems</h2><p>Industrial symbiosis, circular economy, system-level optimization approaches.</p>' } }],
  activities: [{ id: 'ind-act-1', title: 'Decarbonize a Factory', type: 'SCENARIO', description: 'Plan industrial decarbonization', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'ind-game', title: 'Factory Transformer', type: 'simulation', description: 'Make industry carbon-free', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ind-q1', question: 'Which industrial process is hardest to decarbonize?', options: ['Lighting', 'Cooling', 'High-temperature heat', 'Office equipment'], correctAnswer: 2, explanation: 'High-temperature industrial heat (>400°C) is difficult to electrify and often needs hydrogen or CCUS.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 29: Sustainable Transportation
export const sustainableTransportation: Module = {
  id: 'renewable-transport', slug: 'sustainable-transportation', title: 'Sustainable Transportation',
  description: { ELEMENTARY: 'Learn about clean ways to travel - bikes, buses, and electric cars!', MIDDLE_SCHOOL: 'Discover how transportation can be powered by renewable energy.', HIGH_SCHOOL: 'Explore electric vehicles, public transit, and transportation emissions.', UNDERGRADUATE: 'Analyze transport decarbonization pathways, mode shift, and infrastructure.', GRADUATE: 'Examine aviation, shipping, and long-distance transport challenges.', PHD: 'Research transport system transformation, behavior change, and policy integration.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'trans-1', title: 'Clean Travel', content: { ELEMENTARY: '<h2>Green Ways to Go!</h2><p>Walking, biking, buses, and trains are cleaner than driving alone!</p>', MIDDLE_SCHOOL: '<h2>Transport Options</h2><p>Electric cars, e-bikes, public transit, walking, biking all reduce emissions.</p>', HIGH_SCHOOL: '<h2>Transport Emissions</h2><p>Transport is ~25% of global CO2. Light-duty EVs, heavy-duty challenges.</p>', UNDERGRADUATE: '<h2>Decarbonization Pathways</h2><p>Avoid (reduce travel), shift (to clean modes), improve (efficiency and fuels).</p>', GRADUATE: '<h2>Hard-to-Abate Transport</h2><p>Aviation: SAFs, hydrogen. Shipping: ammonia, methanol. Long-haul trucks: hydrogen.</p>', PHD: '<h2>System Transformation</h2><p>Urban planning integration, shared mobility, autonomous vehicles, behavior change.</p>' } }],
  activities: [{ id: 'trans-act-1', title: 'Clean Commute Plan', type: 'SCENARIO', description: 'Plan sustainable transportation', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'trans-game', title: 'Transport Planner', type: 'simulation', description: 'Decarbonize transportation', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'trans-q1', question: 'What percentage of global CO2 comes from transport?', options: ['About 5%', 'About 25%', 'About 50%', 'About 75%'], correctAnswer: 1, explanation: 'Transportation accounts for approximately 25% of global CO2 emissions.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 30: Energy Economics
export const energyEconomics: Module = {
  id: 'renewable-economics', slug: 'energy-economics', title: 'Energy Economics',
  description: { ELEMENTARY: 'Learn how much clean energy costs and saves!', MIDDLE_SCHOOL: 'Discover why solar and wind are becoming cheaper than fossil fuels.', HIGH_SCHOOL: 'Explore levelized cost of energy, payback periods, and energy markets.', UNDERGRADUATE: 'Analyze LCOE, capacity factors, learning curves, and investment analysis.', GRADUATE: 'Examine electricity market design, wholesale pricing, and investment risk.', PHD: 'Research energy system modeling, optimal investment, and transition economics.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'econ-1', title: 'Energy Costs', content: { ELEMENTARY: '<h2>Clean Energy Deals!</h2><p>Solar and wind are now cheaper than burning coal and gas!</p>', MIDDLE_SCHOOL: '<h2>Cost Comparison</h2><p>Solar costs fell 89% since 2010. Wind fell 70%. Now cheapest new electricity.</p>', HIGH_SCHOOL: '<h2>LCOE</h2><p>Levelized Cost of Energy = total costs / total energy over project lifetime.</p>', UNDERGRADUATE: '<h2>Investment Analysis</h2><p>NPV, IRR, payback period, capacity factor, discount rate, PPA structures.</p>', GRADUATE: '<h2>Market Design</h2><p>Energy markets, capacity markets, ancillary services. Revenue stacking.</p>', PHD: '<h2>Transition Economics</h2><p>Stranded assets, optimal phase-out, carbon pricing, green finance.</p>' } }],
  activities: [{ id: 'econ-act-1', title: 'Calculate LCOE', type: 'SIMULATION', description: 'Compare energy costs', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'econ-game', title: 'Energy Investor', type: 'simulation', description: 'Build a profitable clean energy portfolio', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'econ-q1', question: 'How much did solar costs fall from 2010-2020?', options: ['10%', '30%', '60%', '89%'], correctAnswer: 3, explanation: 'Solar PV costs fell by approximately 89% from 2010 to 2020.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 31: Agrivoltaics
export const agrivoltaics: Module = {
  id: 'renewable-agrivoltaics', slug: 'agrivoltaics', title: 'Agrivoltaics',
  description: { ELEMENTARY: 'Learn how solar panels and farms can share the same land!', MIDDLE_SCHOOL: 'Discover how solar panels can be combined with farming.', HIGH_SCHOOL: 'Explore dual-use solar installations for agriculture and energy.', UNDERGRADUATE: 'Analyze agrivoltaic system design, crop selection, and yield impacts.', GRADUATE: 'Examine water savings, microclimate effects, and economic models.', PHD: 'Research optimal configurations, ecosystem services, and land use policy.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'agri-1', title: 'Solar + Farming', content: { ELEMENTARY: '<h2>Farm Under Panels!</h2><p>Crops can grow under solar panels, getting shade and rain!</p>', MIDDLE_SCHOOL: '<h2>Agrivoltaics</h2><p>Solar panels over crops provide shade, reduce water needs, and make electricity!</p>', HIGH_SCHOOL: '<h2>System Design</h2><p>Elevated panels for equipment access. Crop selection matters - shade-tolerant best.</p>', UNDERGRADUATE: '<h2>Yield Effects</h2><p>Some crops yield more under panels (lettuce, tomatoes). Reduced water evaporation.</p>', GRADUATE: '<h2>Economic Models</h2><p>Dual revenue streams. Higher installation cost vs. higher total land productivity.</p>', PHD: '<h2>Optimization Research</h2><p>Panel spacing, height, transparency. Crop-specific microclimate modeling.</p>' } }],
  activities: [{ id: 'agri-act-1', title: 'Design Agrivoltaic Farm', type: 'SIMULATION', description: 'Combine solar and farming', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'agri-game', title: 'Solar Farmer', type: 'simulation', description: 'Run an agrivoltaic farm', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'agri-q1', question: 'What do agrivoltaic systems combine?', options: ['Wind and water', 'Solar panels and farming', 'Batteries and buildings', 'Geothermal and greenhouses'], correctAnswer: 1, explanation: 'Agrivoltaics combines solar panels with agricultural land use.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 32: Floating Solar
export const floatingSolar: Module = {
  id: 'renewable-floating', slug: 'floating-solar', title: 'Floating Solar',
  description: { ELEMENTARY: 'Learn about solar panels that float on water!', MIDDLE_SCHOOL: 'Discover how solar panels can be installed on lakes and reservoirs.', HIGH_SCHOOL: 'Explore floating PV system design, benefits, and applications.', UNDERGRADUATE: 'Analyze floating solar economics, performance, and environmental impacts.', GRADUATE: 'Examine offshore floating solar, hybrid hydro-solar, and system optimization.', PHD: 'Research wave loading, degradation in marine environments, and ecosystem effects.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'float-1', title: 'Solar on Water', content: { ELEMENTARY: '<h2>Floating Panels!</h2><p>Solar panels on big floats can make electricity from lakes!</p>', MIDDLE_SCHOOL: '<h2>Floating PV</h2><p>Panels on pontoons float on reservoirs. Saves land, cools panels for better efficiency.</p>', HIGH_SCHOOL: '<h2>Floating Solar Benefits</h2><p>No land needed, water cooling boosts output ~5%, reduces evaporation from reservoirs.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>HDPE floats, anchoring systems, cable management, inverter platforms.</p>', GRADUATE: '<h2>Hydro-Solar Hybrid</h2><p>Combine with hydropower for complementary generation and shared infrastructure.</p>', PHD: '<h2>Marine Applications</h2><p>Offshore floating solar. Wave loading, corrosion, marine growth challenges.</p>' } }],
  activities: [{ id: 'float-act-1', title: 'Design Floating Array', type: 'SIMULATION', description: 'Plan a floating solar installation', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'float-game', title: 'Float Builder', type: 'simulation', description: 'Build floating solar arrays', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'float-q1', question: 'Why are floating solar panels more efficient?', options: ['They catch more wind', 'Water cooling improves performance', 'They move with the sun', 'They are waterproof'], correctAnswer: 1, explanation: 'Water cooling keeps floating panels cooler, improving electrical efficiency.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 33: Renewable Energy Masterclass (Capstone)
export const renewableEnergyMasterclassModule: Module = {
  id: 'renewable-masterclass-new', slug: 'renewable-energy-masterclass-full', title: 'Renewable Energy Masterclass',
  description: { ELEMENTARY: 'Become a renewable energy expert by combining everything you learned!', MIDDLE_SCHOOL: 'Master the complete picture of renewable energy systems.', HIGH_SCHOOL: 'Synthesize renewable energy concepts into comprehensive understanding.', UNDERGRADUATE: 'Integrate technical, economic, and policy aspects of energy transition.', GRADUATE: 'Develop advanced strategies for 100% renewable energy systems.', PHD: 'Conduct original research on energy system transformation pathways.' },
  topic: 'renewable-energy',
  estimatedMinutes: { ELEMENTARY: 30, MIDDLE_SCHOOL: 50, HIGH_SCHOOL: 75, UNDERGRADUATE: 100, GRADUATE: 140, PHD: 180 },
  lessons: [{ id: 'master-1', title: 'Energy Integration', content: { ELEMENTARY: '<h2>Energy Expert!</h2><p>You now know about sun, wind, water, and earth power. Together they can power everything!</p>', MIDDLE_SCHOOL: '<h2>Putting It Together</h2><p>Combine solar + wind + storage + efficiency for reliable clean energy anywhere.</p>', HIGH_SCHOOL: '<h2>System Thinking</h2><p>Generation, storage, transmission, distribution, demand. All must work together.</p>', UNDERGRADUATE: '<h2>Transition Pathways</h2><p>From 30% to 100% renewables. Flexibility, storage, interconnection, demand response.</p>', GRADUATE: '<h2>100% RE Systems</h2><p>Sector coupling, seasonal storage, long-distance transmission, demand flexibility.</p>', PHD: '<h2>Research Frontiers</h2><p>Ultra-high RE penetration, negative emissions, social dimensions, just transition.</p>' } }],
  activities: [{ id: 'master-act-1', title: 'Design RE System', type: 'SCENARIO', description: 'Create a 100% renewable energy system', estimatedMinutes: 35, interactiveContent: {} }],
  game: { id: 'master-game', title: 'Energy Mastermind', type: 'simulation', description: 'Build the ultimate clean energy system', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'master-q1', question: 'What enables high renewable penetration?', options: ['More coal plants', 'Storage, flexibility, and interconnection', 'Reducing electricity use to zero', 'Only using solar'], correctAnswer: 1, explanation: 'High renewable penetration requires storage, grid flexibility, and interconnection.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

export const renewableEnergyModules: Module[] = [
  hydropowerBasics,
  geothermalEnergy,
  biomassEnergy,
  oceanEnergy,
  energyStorageFundamentals,
  solarThermalSystems,
  smallScaleWind,
  microgrids,
  gridIntegration,
  energyEfficiency,
  offGridSystems,
  electricVehiclesRenewables,
  greenHydrogen,
  heatPumps,
  renewableEnergyPolicy,
  communityEnergy,
  carbonFootprintClimate,
  renewableEnergyCareers,
  passiveSolarDesign,
  netZeroBuildings,
  smartGridSystems,
  batteryTechnology,
  solarInstallationMaintenance,
  windFarmDesign,
  industrialDecarbonization,
  sustainableTransportation,
  energyEconomics,
  agrivoltaics,
  floatingSolar,
  renewableEnergyMasterclassModule,
  // Module 1: Solar Energy Basics
  {
    id: 'renewable-solar-basics',
    slug: 'solar-energy-basics',
    title: 'Solar Energy Basics',
    description: {
      ELEMENTARY: 'Learn how the sun gives us energy! Discover how solar panels turn sunlight into electricity that powers our homes.',
      MIDDLE_SCHOOL: 'Explore how solar panels convert sunlight into electricity. Learn about photovoltaic cells and how solar energy can power homes and schools.',
      HIGH_SCHOOL: 'Understand the physics of photovoltaic cells, solar panel efficiency, and the economics of residential solar installations.',
      UNDERGRADUATE: 'Analyze photovoltaic technology, solar cell materials, system design considerations, and grid integration challenges.',
      GRADUATE: 'Evaluate advanced solar technologies, policy frameworks, lifecycle analysis, and emerging innovations in photovoltaics.',
      PHD: 'Research cutting-edge developments in perovskite cells, quantum dot solar cells, and next-generation photovoltaic materials.'
    },
    topic: 'renewable-energy',
    category: 'SOLAR POWER',
    icon: 'Sun',
    color: 'moss',
    duration: {
      ELEMENTARY: 30,
      MIDDLE_SCHOOL: 40,
      HIGH_SCHOOL: 55,
      UNDERGRADUATE: 70,
      GRADUATE: 90,
      PHD: 120
    },
    isMasterclass: false,
    lessons: [
      {
        id: 'solar-lesson-1',
        title: 'What is Solar Energy?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `
            <div class="lesson-content">
              <h2>☀️ The Sun is Our Friend!</h2>
              <div class="intro-box">
                <p>Did you know the sun sends us <strong>free energy</strong> every single day? It's like getting a present from space!</p>
              </div>

              <div class="fun-fact">
                <span class="icon">🌟</span>
                <p><strong>Fun Fact:</strong> The sun is so powerful that the energy it sends to Earth in just ONE HOUR could power the whole world for a whole year!</p>
              </div>

              <h3>How Does Solar Energy Work?</h3>
              <div class="step-by-step">
                <div class="step">
                  <span class="step-number">1</span>
                  <p>The sun shines bright rays of light down to Earth</p>
                </div>
                <div class="step">
                  <span class="step-number">2</span>
                  <p>Special panels called <strong>solar panels</strong> catch the sunlight</p>
                </div>
                <div class="step">
                  <span class="step-number">3</span>
                  <p>The panels turn the light into electricity</p>
                </div>
                <div class="step">
                  <span class="step-number">4</span>
                  <p>The electricity powers our lights, TVs, and computers!</p>
                </div>
              </div>

              <div class="activity-preview">
                <h4>🎮 Activity Time!</h4>
                <p>Drag the sunlight to the solar panel and watch what happens!</p>
              </div>
            </div>
          `,
          MIDDLE_SCHOOL: `
            <div class="lesson-content">
              <h2>Understanding Solar Energy</h2>
              <div class="intro-box">
                <p>Solar energy is <strong>radiant light and heat from the Sun</strong> that we can capture and convert into useful electricity. It's one of the most abundant energy sources on our planet!</p>
              </div>

              <h3>The Science Behind Solar Power</h3>
              <p>The sun produces energy through <strong>nuclear fusion</strong> - hydrogen atoms combine to form helium, releasing enormous amounts of energy. This energy travels 93 million miles to reach Earth as light and heat.</p>

              <div class="key-concept">
                <h4>Photovoltaic Effect</h4>
                <p>Solar panels use something called the <strong>photovoltaic effect</strong>. When sunlight hits special materials in the panel, it knocks electrons loose, creating an electrical current.</p>
              </div>

              <h3>Types of Solar Technology</h3>
              <ul class="tech-list">
                <li><strong>Solar Panels (PV):</strong> Convert light directly to electricity</li>
                <li><strong>Solar Thermal:</strong> Use heat to warm water or air</li>
                <li><strong>Concentrated Solar:</strong> Use mirrors to focus sunlight</li>
              </ul>

              <div class="stats-box">
                <h4>📊 By the Numbers</h4>
                <ul>
                  <li>Sun's energy reaching Earth: 173,000 terawatts</li>
                  <li>Global electricity demand: ~18 terawatts</li>
                  <li>Solar panel efficiency: 15-22% typically</li>
                </ul>
              </div>
            </div>
          `,
          HIGH_SCHOOL: `
            <div class="lesson-content">
              <h2>Solar Energy: Physics and Applications</h2>

              <div class="learning-objectives">
                <h4>Learning Objectives</h4>
                <ul>
                  <li>Understand the electromagnetic spectrum and solar radiation</li>
                  <li>Explain the photovoltaic effect at the atomic level</li>
                  <li>Compare different solar cell technologies</li>
                  <li>Calculate basic solar panel requirements</li>
                </ul>
              </div>

              <h3>Solar Radiation and the Electromagnetic Spectrum</h3>
              <p>The sun emits energy across the electromagnetic spectrum. About 43% of solar radiation is visible light (400-700nm wavelength), while infrared (heat) and ultraviolet make up most of the remainder.</p>

              <div class="equation-box">
                <h4>Solar Constant</h4>
                <p>The solar constant (energy received at Earth's atmosphere) is approximately:</p>
                <code>S = 1,361 W/m²</code>
                <p>After atmospheric absorption and reflection, about 1,000 W/m² reaches the surface on a clear day.</p>
              </div>

              <h3>The Photovoltaic Effect Explained</h3>
              <p>Photovoltaic cells are made of <strong>semiconductor materials</strong>, typically silicon. Here's the process:</p>

              <ol class="process-list">
                <li><strong>Photon Absorption:</strong> Sunlight photons strike the silicon crystal</li>
                <li><strong>Electron Excitation:</strong> Photons with sufficient energy (>1.1eV for silicon) excite electrons from the valence band to the conduction band</li>
                <li><strong>Charge Separation:</strong> The p-n junction creates an electric field that separates electrons and holes</li>
                <li><strong>Current Flow:</strong> Electrons flow through an external circuit, generating electricity</li>
              </ol>

              <div class="tech-comparison">
                <h4>Solar Cell Technologies</h4>
                <table>
                  <tr><th>Type</th><th>Efficiency</th><th>Cost</th><th>Use Case</th></tr>
                  <tr><td>Monocrystalline</td><td>20-22%</td><td>High</td><td>Residential</td></tr>
                  <tr><td>Polycrystalline</td><td>15-17%</td><td>Medium</td><td>Commercial</td></tr>
                  <tr><td>Thin-Film</td><td>10-13%</td><td>Low</td><td>Large-scale</td></tr>
                </table>
              </div>
            </div>
          `,
          UNDERGRADUATE: `
            <div class="lesson-content">
              <h2>Photovoltaic Systems: Engineering Fundamentals</h2>

              <div class="learning-objectives">
                <h4>Learning Objectives</h4>
                <ul>
                  <li>Analyze semiconductor physics underlying PV operation</li>
                  <li>Model I-V characteristics of solar cells</li>
                  <li>Design basic PV systems with proper component sizing</li>
                  <li>Evaluate economic factors affecting solar deployment</li>
                </ul>
              </div>

              <h3>Semiconductor Physics of Solar Cells</h3>
              <p>Photovoltaic energy conversion relies on the quantum mechanical behavior of electrons in semiconductor materials. The bandgap energy (Eg) determines which photons can generate electron-hole pairs.</p>

              <div class="equation-box">
                <h4>Shockley-Queisser Limit</h4>
                <p>The theoretical maximum efficiency for a single-junction solar cell:</p>
                <code>η_max ≈ 33.7% (for Eg ≈ 1.34 eV)</code>
                <p>This limit arises from:</p>
                <ul>
                  <li>Sub-bandgap photons (not absorbed)</li>
                  <li>Thermalization losses (excess photon energy → heat)</li>
                  <li>Radiative recombination</li>
                </ul>
              </div>

              <h3>I-V Characteristics and Cell Parameters</h3>
              <p>The current-voltage relationship of an ideal solar cell follows:</p>
              <div class="equation-box">
                <code>I = I_L - I_0[exp(qV/nkT) - 1]</code>
                <p>Where:</p>
                <ul>
                  <li>I_L = photogenerated current</li>
                  <li>I_0 = reverse saturation current</li>
                  <li>n = ideality factor (1-2)</li>
                  <li>q = electron charge, k = Boltzmann constant, T = temperature</li>
                </ul>
              </div>

              <h3>Key Performance Parameters</h3>
              <ul class="parameter-list">
                <li><strong>Open Circuit Voltage (Voc):</strong> Maximum voltage at zero current</li>
                <li><strong>Short Circuit Current (Isc):</strong> Maximum current at zero voltage</li>
                <li><strong>Fill Factor (FF):</strong> Ratio of max power to Voc × Isc (typically 0.7-0.85)</li>
                <li><strong>Power Conversion Efficiency:</strong> η = Pmax / Pin = (Voc × Isc × FF) / (G × A)</li>
              </ul>

              <div class="case-study">
                <h4>System Design Example</h4>
                <p>For a 5kW residential system in a location with 5 peak sun hours/day:</p>
                <ul>
                  <li>Daily energy production: 5kW × 5h × 0.8 (derating) = 20 kWh</li>
                  <li>Panel requirement: ~15-20 panels (300-400W each)</li>
                  <li>Inverter sizing: 5kW minimum (consider oversizing 10-20%)</li>
                </ul>
              </div>
            </div>
          `,
          GRADUATE: `
            <div class="lesson-content">
              <h2>Advanced Photovoltaic Technologies and Systems Integration</h2>

              <div class="learning-objectives">
                <h4>Learning Objectives</h4>
                <ul>
                  <li>Critically evaluate emerging PV technologies and their potential</li>
                  <li>Analyze grid integration challenges and solutions</li>
                  <li>Assess lifecycle environmental impacts of solar technologies</li>
                  <li>Design optimization strategies for utility-scale installations</li>
                </ul>
              </div>

              <h3>Beyond Silicon: Emerging Technologies</h3>

              <div class="tech-deep-dive">
                <h4>Perovskite Solar Cells</h4>
                <p>Hybrid organic-inorganic perovskites (general formula ABX₃) have achieved remarkable efficiency gains:</p>
                <ul>
                  <li>Lab efficiency: >25% (single junction), >29% (tandem with Si)</li>
                  <li>Advantages: Low-cost processing, tunable bandgap, high absorption coefficient</li>
                  <li>Challenges: Stability (moisture, heat, light), lead toxicity, scaling</li>
                </ul>
              </div>

              <div class="tech-deep-dive">
                <h4>Multi-Junction Cells</h4>
                <p>Stacking multiple p-n junctions with different bandgaps captures more of the solar spectrum:</p>
                <ul>
                  <li>III-V semiconductors (GaAs, InGaP, Ge) achieve >47% under concentration</li>
                  <li>Perovskite/silicon tandems: promising low-cost high-efficiency pathway</li>
                  <li>Theoretical limit for infinite junctions: ~68% (unconcentrated)</li>
                </ul>
              </div>

              <h3>Grid Integration and Storage</h3>
              <p>High solar penetration presents technical challenges:</p>
              <ul>
                <li><strong>Duck Curve:</strong> Steep ramping requirements as solar drops off</li>
                <li><strong>Voltage Regulation:</strong> Distributed generation affects grid voltage profiles</li>
                <li><strong>Frequency Response:</strong> Inverter-based resources lack inherent inertia</li>
              </ul>

              <div class="research-highlight">
                <h4>Smart Inverter Functions (IEEE 1547-2018)</h4>
                <ul>
                  <li>Volt-VAR optimization</li>
                  <li>Frequency-watt control</li>
                  <li>Ramp rate limits</li>
                  <li>Ride-through capabilities</li>
                </ul>
              </div>

              <h3>Lifecycle Assessment</h3>
              <p>Environmental impact considerations:</p>
              <ul>
                <li>Energy payback time: 1-3 years (varies by technology and location)</li>
                <li>Carbon footprint: 20-50 gCO₂eq/kWh (vs. 400-1000 for fossil fuels)</li>
                <li>End-of-life: Recycling infrastructure developing, ~90% material recovery possible</li>
              </ul>
            </div>
          `,
          PHD: `
            <div class="lesson-content">
              <h2>Frontiers in Photovoltaic Research</h2>

              <div class="research-context">
                <p>This module examines cutting-edge developments in photovoltaic science, focusing on theoretical advances, novel materials, and emerging device architectures that may define the next generation of solar technology.</p>
              </div>

              <h3>Quantum Approaches to Exceeding Shockley-Queisser</h3>

              <div class="research-topic">
                <h4>Hot Carrier Solar Cells</h4>
                <p>Extracting carriers before thermalization could dramatically increase efficiency:</p>
                <ul>
                  <li>Requires slowing carrier cooling (phonon bottleneck engineering)</li>
                  <li>Energy-selective contacts for hot carrier extraction</li>
                  <li>Theoretical efficiency: >65%</li>
                  <li>Current research: quantum wells, nanostructures, novel absorber materials</li>
                </ul>
              </div>

              <div class="research-topic">
                <h4>Multiple Exciton Generation (MEG)</h4>
                <p>High-energy photons generating multiple electron-hole pairs:</p>
                <ul>
                  <li>Demonstrated in quantum dots (PbSe, PbS, Si)</li>
                  <li>Threshold typically 2-3× bandgap energy</li>
                  <li>Device integration challenges: carrier extraction before recombination</li>
                </ul>
              </div>

              <div class="research-topic">
                <h4>Intermediate Band Solar Cells</h4>
                <p>Additional energy levels within the bandgap enable sub-bandgap photon absorption:</p>
                <ul>
                  <li>Theoretical efficiency: >63% (single IB), higher with multiple IBs</li>
                  <li>Approaches: quantum dots, highly mismatched alloys, deep-level impurities</li>
                  <li>Challenge: achieving sufficient IB absorption while maintaining transport</li>
                </ul>
              </div>

              <h3>Emerging Material Systems</h3>

              <div class="materials-analysis">
                <h4>Lead-Free Perovskites</h4>
                <p>Addressing toxicity concerns while maintaining performance:</p>
                <ul>
                  <li>Tin-based (MASnI₃): Oxidation stability issues</li>
                  <li>Bismuth-based (Cs₃Bi₂I₉): Wide bandgap, lower efficiency</li>
                  <li>Double perovskites (Cs₂AgBiBr₆): Indirect bandgap limitations</li>
                  <li>Antimony chalcogenides (Sb₂Se₃): Emerging candidate</li>
                </ul>
              </div>

              <div class="materials-analysis">
                <h4>Organic and Molecular Systems</h4>
                <p>Non-fullerene acceptors have revolutionized organic PV:</p>
                <ul>
                  <li>Single-junction efficiencies >18%</li>
                  <li>Reduced voltage losses through energy level engineering</li>
                  <li>Morphology control via molecular design</li>
                </ul>
              </div>

              <h3>Integration and Applications Research</h3>
              <ul>
                <li><strong>Building-Integrated PV:</strong> Transparent, colored, and flexible modules</li>
                <li><strong>Agrivoltaics:</strong> Optimizing co-location of solar and agriculture</li>
                <li><strong>Space Applications:</strong> Radiation tolerance, ultra-lightweight designs</li>
                <li><strong>Artificial Photosynthesis:</strong> Direct solar fuel production</li>
              </ul>
            </div>
          `
        }
      },
      {
        id: 'solar-lesson-2',
        title: 'How Solar Panels Work',
        order: 2,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `
            <div class="lesson-content">
              <h2>🔋 Solar Panels are Like Magic!</h2>

              <div class="story-box">
                <p>Imagine you have a special blanket that can catch sunlight and turn it into power for your toys! That's kind of what a solar panel does!</p>
              </div>

              <h3>Parts of a Solar Panel</h3>
              <div class="visual-diagram">
                <div class="part">
                  <span class="icon">🔲</span>
                  <h4>Solar Cells</h4>
                  <p>Tiny squares that catch the light</p>
                </div>
                <div class="part">
                  <span class="icon">🪟</span>
                  <h4>Glass Cover</h4>
                  <p>Protects the cells from rain and dirt</p>
                </div>
                <div class="part">
                  <span class="icon">🔌</span>
                  <h4>Wires</h4>
                  <p>Carry the electricity to your home</p>
                </div>
              </div>

              <div class="fun-activity">
                <h4>🎮 Try the Simulation!</h4>
                <p>Move the sun across the sky and see how much electricity the solar panel makes!</p>
              </div>

              <div class="did-you-know">
                <h4>Did You Know? 🤔</h4>
                <p>Solar panels work best when they face the sun directly - just like how you feel warmest when you face the sun!</p>
              </div>
            </div>
          `,
          MIDDLE_SCHOOL: `
            <div class="lesson-content">
              <h2>Inside a Solar Panel</h2>

              <h3>The Building Blocks: Solar Cells</h3>
              <p>A typical solar panel contains <strong>60-72 individual solar cells</strong> connected together. Each cell is made of silicon, the same material used in computer chips!</p>

              <div class="cross-section">
                <h4>Layers of a Solar Cell</h4>
                <ol>
                  <li><strong>Anti-reflective coating:</strong> Helps absorb more light</li>
                  <li><strong>N-type silicon:</strong> Has extra electrons</li>
                  <li><strong>P-N junction:</strong> Where the magic happens!</li>
                  <li><strong>P-type silicon:</strong> Has "holes" for electrons</li>
                  <li><strong>Back contact:</strong> Collects the electricity</li>
                </ol>
              </div>

              <h3>The Journey of Sunlight to Electricity</h3>
              <div class="process-flow">
                <div class="step">
                  <span class="number">1</span>
                  <p>Sunlight (photons) hits the solar cell</p>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <span class="number">2</span>
                  <p>Photons knock electrons loose from silicon atoms</p>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <span class="number">3</span>
                  <p>The P-N junction creates a one-way flow</p>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <span class="number">4</span>
                  <p>Electrons flow through wires as electricity!</p>
                </div>
              </div>

              <div class="simulation-intro">
                <h4>🔬 Interactive Simulation</h4>
                <p>Adjust the sunlight intensity and angle to see how it affects power output!</p>
              </div>
            </div>
          `,
          HIGH_SCHOOL: `
            <div class="lesson-content">
              <h2>Photovoltaic Cell Operation</h2>

              <h3>Semiconductor Fundamentals</h3>
              <p>Solar cells exploit the unique properties of semiconductors - materials with conductivity between metals and insulators.</p>

              <div class="concept-box">
                <h4>Silicon Crystal Structure</h4>
                <p>Pure silicon has 4 valence electrons, forming covalent bonds with neighboring atoms in a crystal lattice. This creates:</p>
                <ul>
                  <li><strong>Valence Band:</strong> Electrons bound to atoms</li>
                  <li><strong>Conduction Band:</strong> Free electrons that can carry current</li>
                  <li><strong>Band Gap (1.1 eV for Si):</strong> Energy needed to promote electrons</li>
                </ul>
              </div>

              <h3>Doping and the P-N Junction</h3>
              <div class="two-column">
                <div class="column">
                  <h4>N-type Silicon</h4>
                  <p>Doped with phosphorus (5 valence electrons)</p>
                  <p>Extra electrons = negative charge carriers</p>
                </div>
                <div class="column">
                  <h4>P-type Silicon</h4>
                  <p>Doped with boron (3 valence electrons)</p>
                  <p>"Holes" = positive charge carriers</p>
                </div>
              </div>

              <div class="process-detail">
                <h4>At the P-N Junction</h4>
                <ol>
                  <li>Electrons diffuse from N to P region</li>
                  <li>Holes diffuse from P to N region</li>
                  <li>Creates a "depletion zone" with built-in electric field</li>
                  <li>Field prevents further diffusion - equilibrium reached</li>
                </ol>
              </div>

              <h3>Photovoltaic Action</h3>
              <p>When photons with energy ≥ band gap are absorbed:</p>
              <ol>
                <li>Electron-hole pairs are generated</li>
                <li>Built-in field separates charges</li>
                <li>Electrons pushed to N-side, holes to P-side</li>
                <li>External circuit allows electron flow = current</li>
              </ol>

              <div class="simulation-advanced">
                <h4>🔬 Advanced Simulation</h4>
                <p>Explore how temperature, light intensity, and angle affect the I-V curve and power output.</p>
              </div>
            </div>
          `,
          UNDERGRADUATE: `
            <div class="lesson-content">
              <h2>Solar Cell Device Physics</h2>

              <h3>Carrier Generation and Transport</h3>

              <div class="physics-section">
                <h4>Absorption and Generation</h4>
                <p>The generation rate G(x) follows Beer-Lambert absorption:</p>
                <code>G(x) = α(λ) × Φ₀ × exp(-αx)</code>
                <p>Where α is the absorption coefficient (wavelength-dependent) and Φ₀ is incident photon flux.</p>
              </div>

              <div class="physics-section">
                <h4>Minority Carrier Transport</h4>
                <p>The continuity equation for minority carriers:</p>
                <code>∂n/∂t = G - (n-n₀)/τ + (1/q)∇·Jn</code>
                <p>At steady state, carrier profiles determined by:</p>
                <ul>
                  <li>Generation profile</li>
                  <li>Diffusion length L = √(Dτ)</li>
                  <li>Surface recombination velocities</li>
                </ul>
              </div>

              <h3>Loss Mechanisms</h3>
              <div class="loss-analysis">
                <h4>Optical Losses</h4>
                <ul>
                  <li>Reflection: Minimized with ARC (anti-reflective coating)</li>
                  <li>Shading: Front contacts, cell spacing</li>
                  <li>Incomplete absorption: Photons with E < Eg pass through</li>
                </ul>

                <h4>Recombination Losses</h4>
                <ul>
                  <li><strong>Radiative:</strong> Fundamental, related to Voc limit</li>
                  <li><strong>Auger:</strong> Three-particle process, significant at high injection</li>
                  <li><strong>SRH:</strong> Trap-assisted, depends on material quality</li>
                  <li><strong>Surface:</strong> Dangling bonds, minimized with passivation</li>
                </ul>

                <h4>Resistive Losses</h4>
                <ul>
                  <li>Series resistance: Contacts, busbars, emitter sheet resistance</li>
                  <li>Shunt resistance: Manufacturing defects, edge effects</li>
                </ul>
              </div>

              <div class="simulation-engineering">
                <h4>🔧 Engineering Simulation</h4>
                <p>Model a complete solar cell: adjust doping profiles, layer thicknesses, and contact geometry to optimize efficiency.</p>
              </div>
            </div>
          `,
          GRADUATE: `
            <div class="lesson-content">
              <h2>Advanced Device Architectures</h2>

              <h3>High-Efficiency Cell Designs</h3>

              <div class="architecture">
                <h4>PERC (Passivated Emitter Rear Cell)</h4>
                <p>Key innovations over standard Al-BSF cells:</p>
                <ul>
                  <li>Dielectric rear passivation (Al₂O₃/SiNx stack)</li>
                  <li>Local rear contacts through laser-opened vias</li>
                  <li>Improved internal reflection at rear</li>
                  <li>Efficiency gain: 1-1.5% absolute over Al-BSF</li>
                </ul>
              </div>

              <div class="architecture">
                <h4>HJT (Heterojunction Technology)</h4>
                <p>a-Si:H/c-Si heterojunction architecture:</p>
                <ul>
                  <li>Excellent surface passivation (i-a-Si:H layers)</li>
                  <li>Low temperature processing (<200°C)</li>
                  <li>Bifacial capability with symmetric structure</li>
                  <li>Lower temperature coefficient than PERC</li>
                  <li>Record efficiency: >26% for both contacts on rear</li>
                </ul>
              </div>

              <div class="architecture">
                <h4>IBC (Interdigitated Back Contact)</h4>
                <p>All contacts on rear surface:</p>
                <ul>
                  <li>Zero front shading losses</li>
                  <li>Complex patterning requirements</li>
                  <li>Requires excellent bulk lifetime (>1ms)</li>
                  <li>SunPower achieved >25% production efficiency</li>
                </ul>
              </div>

              <h3>Tandem and Multi-Junction Approaches</h3>
              <div class="tandem-analysis">
                <h4>Perovskite/Silicon Tandems</h4>
                <p>Current matching considerations:</p>
                <ul>
                  <li>Optimal top cell bandgap: 1.7-1.8 eV</li>
                  <li>2-terminal: Simple but requires current matching</li>
                  <li>4-terminal: No current matching but more complex</li>
                  <li>Record efficiency: >33% (4-terminal)</li>
                </ul>
              </div>
            </div>
          `,
          PHD: `
            <div class="lesson-content">
              <h2>Device Physics at the Nanoscale</h2>

              <h3>Quantum Confinement Effects</h3>

              <div class="quantum-section">
                <h4>Size-Dependent Properties</h4>
                <p>In quantum dots (QDs), confinement energy adds to bulk bandgap:</p>
                <code>E_g(R) ≈ E_g(bulk) + ℏ²π²/2μR² - 1.8e²/εR</code>
                <p>This tunability enables:</p>
                <ul>
                  <li>Spectrum matching for multi-junction cells</li>
                  <li>Hot carrier extraction windows</li>
                  <li>Multiple exciton generation thresholds</li>
                </ul>
              </div>

              <div class="quantum-section">
                <h4>Carrier Dynamics in Nanostructures</h4>
                <p>Ultrafast spectroscopy reveals:</p>
                <ul>
                  <li>Hot carrier cooling: 100fs - 1ps in bulk, potentially slower in QDs</li>
                  <li>MEG dynamics: Impact ionization vs. coherent superposition models</li>
                  <li>Auger recombination: Size-dependent, major loss in QD solar cells</li>
                </ul>
              </div>

              <h3>Interface Engineering</h3>

              <div class="interface-section">
                <h4>Perovskite Interfaces</h4>
                <p>Critical for performance and stability:</p>
                <ul>
                  <li>Energy level alignment: Minimize Voc losses</li>
                  <li>Defect passivation: Reduce non-radiative recombination</li>
                  <li>Ion migration blocking: Improve operational stability</li>
                  <li>2D/3D heterostructures: Surface passivation with dimensionality engineering</li>
                </ul>
              </div>

              <h3>Characterization Frontiers</h3>
              <ul>
                <li><strong>Kelvin probe force microscopy:</strong> Nanoscale potential mapping</li>
                <li><strong>Time-resolved photoluminescence:</strong> Carrier lifetime mapping</li>
                <li><strong>Lock-in thermography:</strong> Shunt and defect detection</li>
                <li><strong>Synchrotron techniques:</strong> In-situ structural evolution</li>
              </ul>
            </div>
          `
        }
      },
      {
        id: 'solar-lesson-3',
        title: 'Solar Energy in Your Home',
        order: 3,
        duration: 12,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `
            <div class="lesson-content">
              <h2>🏠 Solar Power at Home!</h2>

              <div class="story-intro">
                <p>Let's see how families use solar energy to power their homes!</p>
              </div>

              <h3>Things Solar Can Power</h3>
              <div class="power-grid">
                <div class="item"><span>💡</span><p>Lights</p></div>
                <div class="item"><span>📺</span><p>TV</p></div>
                <div class="item"><span>🖥️</span><p>Computer</p></div>
                <div class="item"><span>❄️</span><p>Refrigerator</p></div>
                <div class="item"><span>🎮</span><p>Video Games</p></div>
                <div class="item"><span>📱</span><p>Tablet Charging</p></div>
              </div>

              <div class="scenario-intro">
                <h4>🎮 Your Turn!</h4>
                <p>Help the Johnson family decide where to put their solar panels and what to power first!</p>
              </div>
            </div>
          `,
          MIDDLE_SCHOOL: `
            <div class="lesson-content">
              <h2>Residential Solar Systems</h2>

              <h3>Components of a Home Solar System</h3>
              <div class="component-list">
                <div class="component">
                  <h4>Solar Panels</h4>
                  <p>Usually mounted on the roof facing south (in Northern Hemisphere)</p>
                </div>
                <div class="component">
                  <h4>Inverter</h4>
                  <p>Converts DC electricity from panels to AC for home use</p>
                </div>
                <div class="component">
                  <h4>Meter</h4>
                  <p>Tracks electricity produced and consumed</p>
                </div>
                <div class="component">
                  <h4>Battery (Optional)</h4>
                  <p>Stores excess energy for nighttime use</p>
                </div>
              </div>

              <h3>How Much Energy Do You Need?</h3>
              <div class="calculation">
                <p>Average US home uses about <strong>30 kWh per day</strong></p>
                <p>A typical solar panel produces about <strong>1.5 kWh per day</strong></p>
                <p>So most homes need <strong>15-25 panels</strong></p>
              </div>
            </div>
          `,
          HIGH_SCHOOL: `
            <div class="lesson-content">
              <h2>Designing a Residential PV System</h2>

              <h3>Site Assessment Factors</h3>
              <ul>
                <li><strong>Solar Resource:</strong> Peak sun hours, weather patterns</li>
                <li><strong>Roof Analysis:</strong> Orientation, tilt, shading, structural capacity</li>
                <li><strong>Electrical:</strong> Panel capacity, meter type, utility requirements</li>
              </ul>

              <h3>System Sizing Methodology</h3>
              <div class="sizing-steps">
                <ol>
                  <li>Analyze 12 months of electricity bills</li>
                  <li>Determine target offset percentage</li>
                  <li>Account for system losses (15-20%)</li>
                  <li>Calculate required system size in kW</li>
                  <li>Select appropriate equipment</li>
                </ol>
              </div>

              <h3>Financial Analysis</h3>
              <table>
                <tr><th>Factor</th><th>Typical Value</th></tr>
                <tr><td>System Cost</td><td>$2.50-3.50/watt installed</td></tr>
                <tr><td>Federal Tax Credit</td><td>30% (through 2032)</td></tr>
                <tr><td>Payback Period</td><td>6-10 years</td></tr>
                <tr><td>System Lifetime</td><td>25-30 years</td></tr>
              </table>
            </div>
          `,
          UNDERGRADUATE: `
            <div class="lesson-content">
              <h2>PV System Engineering and Economics</h2>

              <h3>Detailed System Design</h3>
              <div class="design-section">
                <h4>String Sizing</h4>
                <p>Inverter input voltage window constrains string length:</p>
                <ul>
                  <li>Voc at lowest temperature must not exceed max input</li>
                  <li>Vmp at highest temperature must exceed min MPPT voltage</li>
                  <li>Temperature coefficients: typically -0.3%/°C for Voc</li>
                </ul>
              </div>

              <h3>Energy Yield Modeling</h3>
              <p>Annual energy production estimation:</p>
              <code>E = P_STC × PSH × PR × 365</code>
              <ul>
                <li>P_STC: Nameplate DC capacity</li>
                <li>PSH: Peak sun hours (location-specific)</li>
                <li>PR: Performance ratio (typically 0.75-0.85)</li>
              </ul>

              <h3>Economic Metrics</h3>
              <ul>
                <li><strong>LCOE:</strong> Levelized Cost of Energy ($/kWh)</li>
                <li><strong>NPV:</strong> Net Present Value of investment</li>
                <li><strong>IRR:</strong> Internal Rate of Return</li>
                <li><strong>Simple Payback:</strong> Years to recover investment</li>
              </ul>
            </div>
          `,
          GRADUATE: `
            <div class="lesson-content">
              <h2>Grid Integration and Market Dynamics</h2>

              <h3>Distributed Generation Impacts</h3>
              <ul>
                <li>Voltage rise on distribution feeders</li>
                <li>Reverse power flow conditions</li>
                <li>Protection coordination challenges</li>
                <li>Hosting capacity analysis methods</li>
              </ul>

              <h3>Rate Design and Value of Solar</h3>
              <div class="policy-analysis">
                <h4>Net Metering Evolution</h4>
                <ul>
                  <li>Traditional: Full retail credit for exports</li>
                  <li>Net billing: Export rate < retail rate</li>
                  <li>Time-of-use: Value varies by time period</li>
                  <li>Value of solar tariffs: Location-specific compensation</li>
                </ul>
              </div>

              <h3>Storage Integration</h3>
              <p>Battery sizing considerations:</p>
              <ul>
                <li>Self-consumption optimization</li>
                <li>Demand charge management</li>
                <li>Backup power requirements</li>
                <li>Grid services revenue potential</li>
              </ul>
            </div>
          `,
          PHD: `
            <div class="lesson-content">
              <h2>Distributed Energy Resource Optimization</h2>

              <h3>Stochastic Optimization</h3>
              <p>Accounting for uncertainty in:</p>
              <ul>
                <li>Solar resource forecasting</li>
                <li>Load prediction</li>
                <li>Price volatility</li>
                <li>Equipment degradation</li>
              </ul>

              <h3>Transactive Energy Systems</h3>
              <ul>
                <li>Peer-to-peer energy trading</li>
                <li>Blockchain applications in energy markets</li>
                <li>Automated demand response integration</li>
              </ul>

              <h3>Research Frontiers</h3>
              <ul>
                <li>Machine learning for forecasting and control</li>
                <li>Digital twin modeling of distribution systems</li>
                <li>Resilience quantification methods</li>
              </ul>
            </div>
          `
        }
      },
      {
        id: 'solar-lesson-4',
        title: 'The Future of Solar Energy',
        order: 4,
        duration: 13,
        hasActivity: false,
        content: {
          ELEMENTARY: `
            <div class="lesson-content">
              <h2>🚀 Solar Energy of Tomorrow!</h2>

              <div class="future-vision">
                <h3>Cool Solar Ideas!</h3>
                <div class="idea-cards">
                  <div class="card">
                    <span>🚗</span>
                    <h4>Solar Cars</h4>
                    <p>Cars that drive using sunshine!</p>
                  </div>
                  <div class="card">
                    <span>🛣️</span>
                    <h4>Solar Roads</h4>
                    <p>Roads that make electricity!</p>
                  </div>
                  <div class="card">
                    <span>🎒</span>
                    <h4>Solar Backpacks</h4>
                    <p>Charge your devices while walking!</p>
                  </div>
                  <div class="card">
                    <span>🏢</span>
                    <h4>Solar Windows</h4>
                    <p>Windows that power buildings!</p>
                  </div>
                </div>
              </div>

              <div class="conclusion">
                <h3>You Can Help!</h3>
                <p>When you grow up, maybe YOU will invent the next big solar invention!</p>
              </div>
            </div>
          `,
          MIDDLE_SCHOOL: `
            <div class="lesson-content">
              <h2>Innovations in Solar Technology</h2>

              <h3>Emerging Technologies</h3>
              <ul>
                <li><strong>Transparent Solar Cells:</strong> Turn windows into power generators</li>
                <li><strong>Floating Solar Farms:</strong> Panels on lakes and reservoirs</li>
                <li><strong>Solar Skins:</strong> Panels that look like regular roof tiles</li>
                <li><strong>Space-Based Solar:</strong> Collecting solar power in orbit</li>
              </ul>

              <h3>Growing Global Impact</h3>
              <p>Solar is now the cheapest form of electricity in history in many regions. By 2050, solar could provide over 40% of global electricity!</p>
            </div>
          `,
          HIGH_SCHOOL: `
            <div class="lesson-content">
              <h2>The Solar Energy Transition</h2>

              <h3>Technology Trends</h3>
              <ul>
                <li>Continued cost reductions (Swanson's Law)</li>
                <li>Efficiency improvements approaching theoretical limits</li>
                <li>Integration with storage and smart grids</li>
                <li>Building-integrated photovoltaics (BIPV)</li>
              </ul>

              <h3>Policy and Market Drivers</h3>
              <ul>
                <li>Carbon pricing and clean energy mandates</li>
                <li>Corporate renewable procurement</li>
                <li>Developing world electrification</li>
              </ul>

              <h3>Challenges Remaining</h3>
              <ul>
                <li>Intermittency and grid integration</li>
                <li>Land use and siting conflicts</li>
                <li>Supply chain sustainability</li>
                <li>End-of-life recycling infrastructure</li>
              </ul>
            </div>
          `,
          UNDERGRADUATE: `
            <div class="lesson-content">
              <h2>Solar in the Global Energy Transition</h2>

              <h3>Modeling Deep Decarbonization</h3>
              <p>Integrated assessment models project solar deployment scenarios:</p>
              <ul>
                <li>IEA Net Zero: 630 GW annual additions by 2030</li>
                <li>IRENA 1.5°C pathway: 8,500 GW by 2050</li>
                <li>Key enablers: storage, transmission, sector coupling</li>
              </ul>

              <h3>System Integration Challenges</h3>
              <ul>
                <li>Flexibility requirements at high VRE penetration</li>
                <li>Transmission expansion needs</li>
                <li>Market design for zero-marginal-cost resources</li>
              </ul>
            </div>
          `,
          GRADUATE: `
            <div class="lesson-content">
              <h2>Strategic Analysis of Solar Deployment</h2>

              <h3>Industrial Policy Considerations</h3>
              <ul>
                <li>Supply chain diversification</li>
                <li>Domestic manufacturing incentives</li>
                <li>Trade policy and tariffs</li>
                <li>Critical mineral dependencies</li>
              </ul>

              <h3>Sociotechnical Transitions</h3>
              <p>Multi-level perspective on energy transitions:</p>
              <ul>
                <li>Niche innovations challenging regimes</li>
                <li>Landscape pressures (climate, geopolitics)</li>
                <li>Incumbent resistance and adaptation</li>
              </ul>
            </div>
          `,
          PHD: `
            <div class="lesson-content">
              <h2>Research Agenda for Solar-Dominant Systems</h2>

              <h3>Fundamental Questions</h3>
              <ul>
                <li>Ultimate efficiency limits and pathways to approach them</li>
                <li>100% renewable grid stability and economics</li>
                <li>Circular economy for PV materials</li>
                <li>Social acceptance and energy justice</li>
              </ul>

              <h3>Interdisciplinary Opportunities</h3>
              <ul>
                <li>Materials science × device engineering</li>
                <li>Power systems × market design</li>
                <li>Environmental science × policy analysis</li>
                <li>Data science × operations optimization</li>
              </ul>
            </div>
          `
        }
      }
    ],
    activities: [
      {
        id: 'solar-activity-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Build a Solar Power System!',
          MIDDLE_SCHOOL: 'Assemble the Solar Energy Chain',
          HIGH_SCHOOL: 'Connect the PV System Components',
          UNDERGRADUATE: 'Design a Grid-Tied System',
          GRADUATE: 'Optimize System Architecture',
          PHD: 'Configure Advanced Monitoring'
        },
        description: {
          ELEMENTARY: 'Drag the sun, panel, wires, and house to make electricity flow!',
          MIDDLE_SCHOOL: 'Connect components in the right order from sunlight to home appliances.',
          HIGH_SCHOOL: 'Arrange PV system components and identify voltage/current at each stage.',
          UNDERGRADUATE: 'Design a complete residential system with proper component specifications.',
          GRADUATE: 'Optimize a commercial installation for maximum performance ratio.',
          PHD: 'Configure a research-grade monitoring and characterization setup.'
        },
        config: {
          ELEMENTARY: { items: 4, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 6, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 8, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 12, hints: false, timeLimit: 120 },
          GRADUATE: { items: 15, hints: false, timeLimit: 90 },
          PHD: { items: 20, hints: false, timeLimit: 60 }
        }
      },
      {
        id: 'solar-activity-2',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Sun Position Game',
          MIDDLE_SCHOOL: 'Solar Panel Angle Optimizer',
          HIGH_SCHOOL: 'I-V Curve Explorer',
          UNDERGRADUATE: 'System Performance Simulator',
          GRADUATE: 'Grid Integration Modeler',
          PHD: 'Advanced Cell Characterization'
        },
        description: {
          ELEMENTARY: 'Move the sun and watch the solar panel make electricity!',
          MIDDLE_SCHOOL: 'Find the best angle for your solar panel throughout the day.',
          HIGH_SCHOOL: 'Explore how irradiance and temperature affect the I-V curve.',
          UNDERGRADUATE: 'Model annual energy production with weather data inputs.',
          GRADUATE: 'Analyze grid impacts of varying solar penetration levels.',
          PHD: 'Characterize cell parameters from experimental I-V-T data.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 1 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 2 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 4 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 8 },
          GRADUATE: { complexity: 'expert', variables: 12 },
          PHD: { complexity: 'research', variables: 20 }
        }
      }
    ],
    game: {
      id: 'solar-game',
      type: 'matching',
      title: 'Solar Energy Challenge',
      description: 'Test your solar knowledge with this fast-paced matching game!',
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
      id: 'solar-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'sq1',
          question: {
            ELEMENTARY: 'What do solar panels turn sunlight into?',
            MIDDLE_SCHOOL: 'What is the process called when solar panels convert light to electricity?',
            HIGH_SCHOOL: 'What is the typical efficiency range of commercial monocrystalline solar panels?',
            UNDERGRADUATE: 'What is the Shockley-Queisser limit for a single-junction solar cell?',
            GRADUATE: 'What is the primary advantage of PERC over Al-BSF cell architecture?',
            PHD: 'In hot carrier solar cells, what is the primary mechanism for exceeding the Shockley-Queisser limit?'
          },
          options: {
            ELEMENTARY: ['Electricity', 'Water', 'Food', 'Wind'],
            MIDDLE_SCHOOL: ['Photovoltaic effect', 'Magnetism', 'Gravity', 'Friction'],
            HIGH_SCHOOL: ['20-22%', '50-60%', '5-10%', '80-90%'],
            UNDERGRADUATE: ['~33.7%', '~50%', '~75%', '~100%'],
            GRADUATE: ['Improved rear passivation', 'Thicker wafers', 'Higher doping', 'Larger cells'],
            PHD: ['Carrier extraction before thermalization', 'Increased absorption', 'Reduced reflection', 'Lower resistance']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Solar panels turn sunlight into electricity that powers our homes!',
            MIDDLE_SCHOOL: 'The photovoltaic effect is how solar cells convert light energy into electrical energy.',
            HIGH_SCHOOL: 'Modern monocrystalline panels typically achieve 20-22% efficiency in commercial products.',
            UNDERGRADUATE: 'The Shockley-Queisser limit of ~33.7% is the theoretical maximum for single-junction cells under standard conditions.',
            GRADUATE: 'PERC cells use dielectric passivation at the rear, reducing surface recombination and improving voltage.',
            PHD: 'Hot carrier cells aim to extract high-energy carriers before they lose energy to phonons, capturing energy above the bandgap.'
          }
        },
        {
          id: 'sq2',
          question: {
            ELEMENTARY: 'When do solar panels make the MOST electricity?',
            MIDDLE_SCHOOL: 'What type of current do solar panels produce?',
            HIGH_SCHOOL: 'What component converts DC from solar panels to AC for home use?',
            UNDERGRADUATE: 'What is the typical temperature coefficient for silicon solar cell Voc?',
            GRADUATE: 'What is the primary challenge in scaling perovskite solar cells?',
            PHD: 'What is the theoretical efficiency limit for an intermediate band solar cell with optimal band positioning?'
          },
          options: {
            ELEMENTARY: ['Sunny days', 'Rainy days', 'Night time', 'Snowy days'],
            MIDDLE_SCHOOL: ['Direct current (DC)', 'Alternating current (AC)', 'Static electricity', 'No current'],
            HIGH_SCHOOL: ['Inverter', 'Battery', 'Transformer', 'Capacitor'],
            UNDERGRADUATE: ['-0.3%/°C', '-0.1%/°C', '+0.3%/°C', '-1.0%/°C'],
            GRADUATE: ['Long-term stability', 'High efficiency', 'Low cost', 'Easy processing'],
            PHD: ['~63%', '~45%', '~33%', '~85%']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Solar panels work best on sunny days when there is lots of sunlight!',
            MIDDLE_SCHOOL: 'Solar panels produce DC (direct current) electricity, which flows in one direction.',
            HIGH_SCHOOL: 'The inverter is essential for converting DC power from panels to AC power used by home appliances.',
            UNDERGRADUATE: 'Silicon cells typically lose about 0.3% of their Voc per degree Celsius temperature increase.',
            GRADUATE: 'Perovskite stability under heat, moisture, and light remains the key barrier to commercialization.',
            PHD: 'Theoretical analysis shows ~63% efficiency possible with optimally positioned intermediate band.'
          }
        },
        {
          id: 'sq3',
          question: {
            ELEMENTARY: 'Where is the best place to put solar panels on a house?',
            MIDDLE_SCHOOL: 'Why do solar panels need to face south in the Northern Hemisphere?',
            HIGH_SCHOOL: 'What is the bandgap energy of crystalline silicon?',
            UNDERGRADUATE: 'In the equivalent circuit model of a solar cell, what does increasing series resistance primarily affect?',
            GRADUATE: 'What is the Duck Curve in the context of grid integration?',
            PHD: 'What is the primary limiting factor for MEG (Multiple Exciton Generation) efficiency in quantum dot solar cells?'
          },
          options: {
            ELEMENTARY: ['On the roof', 'In the basement', 'Inside the house', 'Underground'],
            MIDDLE_SCHOOL: ['To face the sun\'s path', 'Because it looks better', 'To avoid rain', 'No special reason'],
            HIGH_SCHOOL: ['1.1 eV', '0.5 eV', '2.5 eV', '5.0 eV'],
            UNDERGRADUATE: ['Fill factor', 'Open circuit voltage', 'Short circuit current', 'Bandgap'],
            GRADUATE: ['Net load ramping profile with high solar', 'Power plant shape', 'Demand curve', 'Cost curve'],
            PHD: ['Auger recombination before extraction', 'Insufficient absorption', 'Band alignment', 'Carrier mobility']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'The roof is the best place because it gets the most sunlight without shade from trees or buildings!',
            MIDDLE_SCHOOL: 'In the Northern Hemisphere, the sun\'s path is always toward the south, so south-facing panels get the most sunlight.',
            HIGH_SCHOOL: 'Silicon has a bandgap of approximately 1.1 eV, which determines which photons can generate electron-hole pairs.',
            UNDERGRADUATE: 'Series resistance primarily reduces fill factor by causing the I-V curve to "droop" before reaching Voc.',
            GRADUATE: 'The Duck Curve shows how net load (demand minus solar) creates steep ramping requirements in late afternoon.',
            PHD: 'Auger recombination rates in QDs can be faster than carrier extraction, limiting the benefit of MEG.'
          }
        },
        {
          id: 'sq4',
          question: {
            ELEMENTARY: 'What is one way solar energy helps the Earth?',
            MIDDLE_SCHOOL: 'What is a benefit of using solar energy compared to fossil fuels?',
            HIGH_SCHOOL: 'What is the typical energy payback time for silicon PV modules?',
            UNDERGRADUATE: 'What determines the maximum power point (MPP) of a solar cell?',
            GRADUATE: 'What is the primary function of a Maximum Power Point Tracker (MPPT)?',
            PHD: 'In detailed balance calculations, what fundamental process sets the radiative efficiency limit?'
          },
          options: {
            ELEMENTARY: ['No pollution', 'Makes noise', 'Uses up the sun', 'Needs gasoline'],
            MIDDLE_SCHOOL: ['No greenhouse gas emissions', 'More expensive', 'Creates more waste', 'Uses more water'],
            HIGH_SCHOOL: ['1-3 years', '10-15 years', '25-30 years', '50+ years'],
            UNDERGRADUATE: ['Product of Vmp and Imp', 'Voc alone', 'Isc alone', 'Cell area'],
            GRADUATE: ['Continuously adjust operating point for maximum power', 'Convert DC to AC', 'Store excess energy', 'Protect from overvoltage'],
            PHD: ['Detailed balance between absorption and emission', 'Series resistance', 'Reflection losses', 'Thermalization']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Solar energy doesn\'t create pollution like cars or power plants that burn coal or gas!',
            MIDDLE_SCHOOL: 'Solar energy produces electricity without releasing CO2 or other greenhouse gases.',
            HIGH_SCHOOL: 'Modern silicon PV systems generate more energy than was used to make them within 1-3 years.',
            UNDERGRADUATE: 'MPP occurs at the voltage and current combination (Vmp × Imp) that maximizes power output.',
            GRADUATE: 'MPPT algorithms continuously track the optimal operating point as conditions change throughout the day.',
            PHD: 'Detailed balance shows that radiative recombination (emission) is the fundamental loss mechanism in an ideal cell.'
          }
        },
        {
          id: 'sq5',
          question: {
            ELEMENTARY: 'True or False: Solar panels can work on cloudy days.',
            MIDDLE_SCHOOL: 'What percentage of sunlight do typical solar panels convert to electricity?',
            HIGH_SCHOOL: 'What is the function of the anti-reflective coating on solar cells?',
            UNDERGRADUATE: 'What is the primary advantage of heterojunction (HJT) solar cells?',
            GRADUATE: 'What bifaciality factor is typically achievable with HJT cells?',
            PHD: 'In perovskite solar cells, what is the primary mechanism of hysteresis in I-V measurements?'
          },
          options: {
            ELEMENTARY: ['True', 'False', 'Maybe', 'Only at night'],
            MIDDLE_SCHOOL: ['15-22%', '50-75%', '1-5%', '90-100%'],
            HIGH_SCHOOL: ['Reduce reflection losses', 'Increase temperature', 'Add color', 'Protect from rain'],
            UNDERGRADUATE: ['Excellent passivation and low temperature coefficient', 'Lowest cost', 'Highest voltage', 'Thinnest design'],
            GRADUATE: ['85-95%', '50-60%', '100%+', '30-40%'],
            PHD: ['Ion migration and charge accumulation', 'Thermal effects', 'Series resistance', 'Shunt pathways']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'True! Solar panels still make electricity on cloudy days, just less than on sunny days.',
            MIDDLE_SCHOOL: 'Most commercial solar panels convert 15-22% of sunlight into electricity.',
            HIGH_SCHOOL: 'Anti-reflective coatings (typically silicon nitride) minimize light reflection, increasing absorption.',
            UNDERGRADUATE: 'HJT cells achieve excellent surface passivation with amorphous silicon layers and have better temperature performance.',
            GRADUATE: 'HJT cells can achieve 85-95% bifaciality due to their symmetric structure with TCO on both sides.',
            PHD: 'Mobile ions (I⁻, MA⁺) accumulate at interfaces, causing scan-rate-dependent I-V characteristics.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'How Solar Cells Work - DOE', url: 'https://www.energy.gov/eere/solar/how-does-solar-work', type: 'article' },
      { title: 'Solar Energy Basics - NREL', url: 'https://www.nrel.gov/research/re-solar.html', type: 'research' },
      { title: 'PV Education - PVEducation.org', url: 'https://www.pveducation.org/', type: 'article' }
    ]
  },
  // Module 2: Wind Power Fundamentals
  {
    id: 'renewable-wind-basics',
    slug: 'wind-power-fundamentals',
    title: 'Wind Power Fundamentals',
    description: {
      ELEMENTARY: 'Discover how wind can make electricity! Learn about windmills and wind turbines.',
      MIDDLE_SCHOOL: 'Explore how wind turbines convert moving air into electrical power for our communities.',
      HIGH_SCHOOL: 'Understand wind turbine aerodynamics, generator types, and wind farm design principles.',
      UNDERGRADUATE: 'Analyze wind resource assessment, turbine performance modeling, and project development.',
      GRADUATE: 'Evaluate offshore wind technology, grid integration challenges, and advanced control strategies.',
      PHD: 'Research floating offshore platforms, wake effects modeling, and next-generation turbine designs.'
    },
    topic: 'renewable-energy',
    category: 'WIND ENERGY',
    icon: 'Wind',
    color: 'ocean',
    duration: {
      ELEMENTARY: 30,
      MIDDLE_SCHOOL: 40,
      HIGH_SCHOOL: 55,
      UNDERGRADUATE: 70,
      GRADUATE: 90,
      PHD: 120
    },
    isMasterclass: false,
    lessons: [
      {
        id: 'wind-lesson-1',
        title: 'What is Wind Energy?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌬️ The Power of Wind!</h2><p>Wind is moving air, and it has lots of energy! People have used wind power for thousands of years - to sail boats and turn windmills.</p><div class="fun-fact"><p>Modern wind turbines are like giant pinwheels that make electricity!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Understanding Wind Energy</h2><p>Wind energy is a form of solar energy! The sun heats Earth unevenly, creating areas of different air pressure. Air moves from high pressure to low pressure, creating wind.</p><h3>How Wind Turbines Work</h3><ol><li>Wind pushes against turbine blades</li><li>Blades spin a shaft connected to a generator</li><li>Generator converts rotation into electricity</li></ol></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Wind Energy Physics</h2><p>Wind power is proportional to the cube of wind speed:</p><code>P = ½ρAv³</code><p>Where ρ is air density, A is swept area, and v is wind velocity.</p><h3>Betz Limit</h3><p>The theoretical maximum efficiency of a wind turbine is 59.3% (Betz limit).</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Wind Resource Assessment</h2><p>Key parameters for site evaluation:</p><ul><li>Wind speed distribution (Weibull parameters)</li><li>Wind direction (wind rose analysis)</li><li>Turbulence intensity</li><li>Wind shear profile</li></ul><h3>Capacity Factor</h3><p>Typical onshore: 25-35%, Offshore: 40-50%</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Wind Analysis</h2><h3>Wake Effects Modeling</h3><p>Jensen/PARK model for wake deficit:</p><code>u/u₀ = 1 - (1-√(1-Ct))/(1+kx/r₀)²</code><p>Where Ct is thrust coefficient, k is wake decay constant.</p><h3>Offshore Considerations</h3><ul><li>Higher and more consistent wind speeds</li><li>Reduced turbulence</li><li>Foundation design challenges</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers in Wind Energy</h2><h3>Large Eddy Simulation (LES)</h3><p>High-fidelity wake modeling for farm optimization.</p><h3>Floating Offshore Platforms</h3><ul><li>Spar-buoy, semi-submersible, TLP designs</li><li>Coupled aero-hydro-servo-elastic modeling</li><li>Dynamic cable systems</li></ul><h3>Extreme Scale Turbines</h3><p>15-20 MW designs with 200m+ rotors.</p></div>`
        }
      },
      {
        id: 'wind-lesson-2',
        title: 'Wind Turbine Components',
        order: 2,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>Parts of a Wind Turbine</h2><div class="parts-visual"><div class="part"><span>🔄</span><h4>Blades</h4><p>Catch the wind!</p></div><div class="part"><span>🏠</span><h4>Nacelle</h4><p>The "brain" of the turbine</p></div><div class="part"><span>🗼</span><h4>Tower</h4><p>Holds everything up high</p></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Inside a Wind Turbine</h2><h3>Main Components</h3><ul><li><strong>Rotor:</strong> Blades and hub that capture wind</li><li><strong>Nacelle:</strong> Contains gearbox, generator, and controls</li><li><strong>Tower:</strong> Steel or concrete structure (80-160m tall)</li><li><strong>Foundation:</strong> Anchors turbine to ground</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Turbine Engineering</h2><h3>Drive Train Options</h3><ul><li>Geared: High-speed generator with gearbox</li><li>Direct-drive: Low-speed generator, no gearbox</li><li>Hybrid: Medium-speed with simplified gearbox</li></ul><h3>Blade Design</h3><p>Airfoil profiles vary along blade length for optimal performance.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Turbine Systems Engineering</h2><h3>Generator Types</h3><ul><li>DFIG (Doubly-Fed Induction Generator)</li><li>PMG (Permanent Magnet Generator)</li><li>SCIG (Squirrel Cage Induction Generator)</li></ul><h3>Control Systems</h3><ul><li>Pitch control: Blade angle adjustment</li><li>Yaw control: Nacelle orientation</li><li>Converter control: Power electronics</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Turbine Design</h2><h3>Aeroelastic Considerations</h3><p>Coupled aerodynamic-structural analysis for large rotors.</p><h3>Load Mitigation</h3><ul><li>Individual pitch control (IPC)</li><li>Trailing edge flaps</li><li>Bend-twist coupling in blade design</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Next-Generation Turbine Research</h2><h3>Novel Concepts</h3><ul><li>Two-bladed downwind rotors</li><li>Vertical axis designs revisited</li><li>Airborne wind energy systems</li><li>Multi-rotor systems</li></ul><h3>Materials Research</h3><p>Carbon fiber, thermoplastic composites, recyclable blade materials.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'wind-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Wind Speed Game',
          MIDDLE_SCHOOL: 'Wind Turbine Simulator',
          HIGH_SCHOOL: 'Power Curve Explorer',
          UNDERGRADUATE: 'Wind Farm Designer',
          GRADUATE: 'Wake Effects Analyzer',
          PHD: 'LES Visualization Tool'
        },
        description: {
          ELEMENTARY: 'Blow wind at the turbine and see it spin!',
          MIDDLE_SCHOOL: 'Control wind speed and see how much power the turbine makes.',
          HIGH_SCHOOL: 'Explore the relationship between wind speed and power output.',
          UNDERGRADUATE: 'Design a wind farm layout optimizing for energy capture.',
          GRADUATE: 'Analyze wake effects on downstream turbines.',
          PHD: 'Visualize turbulent wake structures from LES data.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 1 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 2 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 4 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 8 },
          GRADUATE: { complexity: 'expert', variables: 12 },
          PHD: { complexity: 'research', variables: 20 }
        }
      }
    ],
    game: {
      id: 'wind-game',
      type: 'sorting',
      title: 'Wind Turbine Assembly',
      description: 'Put the turbine components together in the right order!',
      rounds: 4,
      timeLimit: 45,
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
      id: 'wind-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wq1',
          question: {
            ELEMENTARY: 'What makes wind turbine blades spin?',
            MIDDLE_SCHOOL: 'What is wind energy originally created by?',
            HIGH_SCHOOL: 'What is the Betz limit for wind turbine efficiency?',
            UNDERGRADUATE: 'What distribution is commonly used to model wind speeds?',
            GRADUATE: 'What is the primary advantage of direct-drive generators?',
            PHD: 'In LES wake modeling, what parameter describes the atmospheric stability?'
          },
          options: {
            ELEMENTARY: ['Wind', 'Rain', 'Sunlight', 'Snow'],
            MIDDLE_SCHOOL: ['The Sun heating Earth unevenly', 'The Moon', 'Ocean waves', 'Earthquakes'],
            HIGH_SCHOOL: ['59.3%', '100%', '25%', '80%'],
            UNDERGRADUATE: ['Weibull distribution', 'Normal distribution', 'Poisson distribution', 'Uniform distribution'],
            GRADUATE: ['No gearbox maintenance', 'Higher efficiency', 'Lower cost', 'Lighter weight'],
            PHD: ['Obukhov length', 'Reynolds number', 'Froude number', 'Mach number']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Wind pushes against the blades and makes them spin around!',
            MIDDLE_SCHOOL: 'Wind is created because the Sun heats different parts of Earth differently, causing air to move.',
            HIGH_SCHOOL: 'The Betz limit (59.3%) is the theoretical maximum energy extraction from wind.',
            UNDERGRADUATE: 'The Weibull distribution effectively models the variability of wind speeds at a site.',
            GRADUATE: 'Direct-drive eliminates the gearbox, a major source of maintenance issues.',
            PHD: 'Obukhov length characterizes atmospheric stability affecting wake behavior.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Wind Energy Basics - DOE', url: 'https://www.energy.gov/eere/wind/how-do-wind-turbines-work', type: 'article' },
      { title: 'Wind Resource Maps - NREL', url: 'https://www.nrel.gov/gis/wind.html', type: 'tool' }
    ]
  },
  // MASTERCLASS: Complete Renewable Energy Systems
  {
    id: 'renewable-masterclass',
    slug: 'renewable-energy-masterclass',
    title: 'Renewable Energy Systems Masterclass',
    description: {
      ELEMENTARY: 'Become an energy expert! Learn about all the ways we can make clean power from nature.',
      MIDDLE_SCHOOL: 'Master the full picture of renewable energy - from sun and wind to water and earth.',
      HIGH_SCHOOL: 'Comprehensive study of renewable energy technologies, integration, and system design.',
      UNDERGRADUATE: 'Advanced analysis of hybrid renewable systems, storage integration, and grid modernization.',
      GRADUATE: 'Expert-level examination of 100% renewable scenarios, sector coupling, and energy policy.',
      PHD: 'Research synthesis of renewable energy transitions, modeling approaches, and future pathways.'
    },
    topic: 'renewable-energy',
    category: 'MASTERCLASS',
    icon: 'Award',
    color: 'terra',
    duration: {
      ELEMENTARY: 45,
      MIDDLE_SCHOOL: 60,
      HIGH_SCHOOL: 90,
      UNDERGRADUATE: 120,
      GRADUATE: 150,
      PHD: 180
    },
    isMasterclass: true,
    hasVideo: true,
    lessons: [
      {
        id: 'master-re-1',
        title: 'The Renewable Energy Revolution',
        order: 1,
        duration: 20,
        hasActivity: false,
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌍 Clean Energy Heroes!</h2><p>All around the world, people are using clean energy from nature. Let's meet our renewable energy heroes!</p><div class="hero-cards"><div class="card"><span>☀️</span><h4>Solar</h4></div><div class="card"><span>💨</span><h4>Wind</h4></div><div class="card"><span>💧</span><h4>Water</h4></div><div class="card"><span>🌋</span><h4>Earth Heat</h4></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>The Global Energy Transition</h2><p>The world is changing how we make electricity. Renewable energy is now the cheapest source of new electricity in most of the world!</p><h3>Key Renewables</h3><ul><li>Solar: Fastest-growing energy source</li><li>Wind: Major contributor onshore and offshore</li><li>Hydropower: Largest renewable source globally</li><li>Geothermal: Heat from Earth's core</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Renewable Energy Economics</h2><h3>Levelized Cost of Energy (LCOE)</h3><p>Solar and wind are now cheaper than fossil fuels in most markets.</p><table><tr><th>Source</th><th>LCOE ($/MWh)</th></tr><tr><td>Solar PV</td><td>30-50</td></tr><tr><td>Onshore Wind</td><td>25-45</td></tr><tr><td>Natural Gas</td><td>45-75</td></tr><tr><td>Coal</td><td>65-150</td></tr></table></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>System Integration Economics</h2><h3>Value Deflation</h3><p>As renewable penetration increases, value decreases due to correlation of output.</p><h3>System Costs</h3><ul><li>Grid integration costs</li><li>Balancing costs</li><li>Profile costs</li><li>Curtailment losses</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>100% Renewable Energy Systems</h2><h3>Feasibility Studies</h3><p>Multiple peer-reviewed studies demonstrate technical feasibility of fully renewable systems.</p><h3>Key Enablers</h3><ul><li>Geographic diversity</li><li>Sector coupling</li><li>Long-duration storage</li><li>Demand flexibility</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Energy Transition Modeling</h2><h3>Model Comparison</h3><p>Integrated assessment models vs. energy system optimization models.</p><h3>Research Gaps</h3><ul><li>Spatial and temporal resolution</li><li>Technology learning uncertainties</li><li>Social and political constraints</li><li>Energy justice dimensions</li></ul></div>`
        }
      },
      {
        id: 'master-re-2',
        title: 'Hybrid Systems and Storage',
        order: 2,
        duration: 20,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🔋 Saving Energy for Later!</h2><p>Sometimes the sun isn't shining and the wind isn't blowing. That's why we save energy in batteries - like a piggy bank for electricity!</p></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Energy Storage Solutions</h2><h3>Why Storage Matters</h3><p>Solar works during the day, but we need power at night. Wind is variable. Storage fills the gaps!</p><h3>Storage Types</h3><ul><li>Batteries (lithium-ion, flow)</li><li>Pumped hydro</li><li>Compressed air</li><li>Hydrogen</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Storage Technologies Compared</h2><table><tr><th>Technology</th><th>Duration</th><th>Efficiency</th><th>Cost Trend</th></tr><tr><td>Li-ion</td><td>2-4 hrs</td><td>85-90%</td><td>Declining rapidly</td></tr><tr><td>Flow Battery</td><td>4-12 hrs</td><td>70-80%</td><td>Declining</td></tr><tr><td>Pumped Hydro</td><td>8-24+ hrs</td><td>75-85%</td><td>Stable</td></tr><tr><td>Hydrogen</td><td>Days-seasonal</td><td>30-40%</td><td>Declining</td></tr></table></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Hybrid System Design</h2><h3>Optimization Objectives</h3><ul><li>Minimize LCOE</li><li>Maximize reliability</li><li>Minimize curtailment</li></ul><h3>Sizing Methodology</h3><p>Time-series simulation with dispatch optimization.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Long-Duration Storage</h2><h3>The Storage Gap</h3><p>Li-ion addresses diurnal needs; seasonal storage requires different solutions.</p><h3>Emerging Options</h3><ul><li>Green hydrogen / ammonia</li><li>Iron-air batteries</li><li>Gravity storage</li><li>Thermal storage</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Storage Research Frontiers</h2><h3>Materials Research</h3><ul><li>Solid-state batteries</li><li>Novel flow battery chemistries</li><li>High-temperature electrolysis</li></ul><h3>System Integration</h3><ul><li>Vehicle-to-grid</li><li>Building thermal mass</li><li>Industrial demand flexibility</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'master-re-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Power the Town!',
          MIDDLE_SCHOOL: 'Balance the Grid',
          HIGH_SCHOOL: 'Dispatch Simulator',
          UNDERGRADUATE: 'System Optimizer',
          GRADUATE: 'Capacity Expansion Model',
          PHD: 'Multi-Sector Integration'
        },
        description: {
          ELEMENTARY: 'Use sun, wind, and batteries to keep the lights on!',
          MIDDLE_SCHOOL: 'Match renewable generation with demand throughout the day.',
          HIGH_SCHOOL: 'Optimize dispatch of renewables, storage, and backup generation.',
          UNDERGRADUATE: 'Design a least-cost hybrid system for given demand profile.',
          GRADUATE: 'Model capacity expansion for deep decarbonization scenario.',
          PHD: 'Integrate electricity, heat, and transport sectors in unified model.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 8 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 15 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 40 }
        }
      }
    ],
    game: {
      id: 'master-re-game',
      type: 'timed_challenge',
      title: 'Renewable Energy Master Challenge',
      description: 'Test your comprehensive knowledge of renewable energy systems!',
      rounds: 8,
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
      id: 'master-re-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mrq1',
          question: {
            ELEMENTARY: 'Which renewable energy comes from the sun?',
            MIDDLE_SCHOOL: 'What is the fastest-growing source of electricity globally?',
            HIGH_SCHOOL: 'What is the approximate global solar PV capacity as of 2023?',
            UNDERGRADUATE: 'What is the primary challenge of high renewable penetration?',
            GRADUATE: 'What storage duration is needed for seasonal balancing in 100% RE scenarios?',
            PHD: 'In IAMs, what is the primary driver of renewable deployment in mitigation scenarios?'
          },
          options: {
            ELEMENTARY: ['Solar', 'Wind', 'Water', 'All of them'],
            MIDDLE_SCHOOL: ['Solar', 'Coal', 'Nuclear', 'Natural Gas'],
            HIGH_SCHOOL: ['~1,200 GW', '~100 GW', '~5,000 GW', '~10,000 GW'],
            UNDERGRADUATE: ['Variability and intermittency', 'High cost', 'Land use', 'Noise pollution'],
            GRADUATE: ['Weeks to months', 'Hours', 'Minutes', 'Years'],
            PHD: ['Carbon price / policy constraints', 'Technology learning', 'Resource availability', 'Public acceptance']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Solar energy comes from sunshine - the big yellow sun in the sky!',
            MIDDLE_SCHOOL: 'Solar PV is the fastest-growing electricity source, with capacity doubling every 2-3 years.',
            HIGH_SCHOOL: 'Global solar PV capacity exceeded 1,200 GW in 2023, up from just 40 GW in 2010.',
            UNDERGRADUATE: 'Variability requires grid flexibility through storage, demand response, and interconnection.',
            GRADUATE: 'Seasonal storage needs span weeks to months to balance summer/winter generation differences.',
            PHD: 'Carbon pricing or equivalent policy constraints are the primary model drivers for RE deployment.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'IRENA Global Renewables Outlook', url: 'https://www.irena.org/publications', type: 'research' },
      { title: 'IEA World Energy Outlook', url: 'https://www.iea.org/reports/world-energy-outlook-2023', type: 'research' }
    ]
  }
]
