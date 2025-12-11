// Green Building Modules - Complete Content for All Learning Levels
import { Module, LearningLevel } from './index'

// Module 4: Energy Efficiency and Insulation
export const energyEfficiency: Module = {
  id: 'gb-energy-efficiency', slug: 'energy-efficiency-insulation', title: 'Energy Efficiency and Insulation',
  description: { [LearningLevel.ELEMENTARY]: 'Keep your house cozy like a warm blanket!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how insulation saves energy and money.', [LearningLevel.HIGH_SCHOOL]: 'Understand R-values, thermal bridging, and building envelope principles.', [LearningLevel.UNDERGRADUATE]: 'Analyze heat transfer, insulation materials, and energy code compliance.', [LearningLevel.GRADUATE]: 'Research super-insulation strategies and advanced envelope systems.', [LearningLevel.PHD]: 'Investigate vacuum insulation, aerogels, and dynamic envelope research.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'insulation-1', title: 'Building Blankets', content: { [LearningLevel.ELEMENTARY]: '<h2>Wrap Your House!</h2><p>Insulation is like a cozy blanket for your house. It keeps warm air in during winter and hot air out during summer!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>How Insulation Works</h2><p>Heat always moves from warm to cold. Insulation slows this movement, keeping indoor temperatures comfortable.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>R-Values and U-Values</h2><p>R-value measures thermal resistance. Higher R = better insulation. U-value is the inverse (lower is better).</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Building Science</h2><p>Heat transfer occurs via conduction, convection, and radiation. Effective insulation addresses all three.</p>', [LearningLevel.GRADUATE]: '<h2>Advanced Envelopes</h2><p>Super-insulated buildings use continuous insulation to eliminate thermal bridging.</p>', [LearningLevel.PHD]: '<h2>Insulation Research</h2><p>Vacuum insulation panels and aerogels offer unprecedented R-values per inch.</p>' } }],
  activities: [{ id: 'insulation-act-1', title: 'Insulation Inspector', type: 'SIMULATION', description: 'Find and fix insulation problems', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'insulation-game', title: 'Energy Saver', type: 'simulation', description: 'Insulate a building to reduce energy use', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'insulation-q1', question: 'What does insulation do for a building?', options: ['Keeps it warm in winter and cool in summer', 'Makes it taller', 'Changes its color', 'Nothing important'], correctAnswer: 0, explanation: 'Insulation slows heat transfer, maintaining comfortable indoor temperatures.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 5: Green Roofs and Living Walls
export const greenRoofs: Module = {
  id: 'gb-green-roofs', slug: 'green-roofs-living-walls', title: 'Green Roofs and Living Walls',
  description: { [LearningLevel.ELEMENTARY]: 'Imagine grass and flowers growing on your roof!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how plants on buildings help the environment.', [LearningLevel.HIGH_SCHOOL]: 'Analyze green roof systems, benefits, and installation requirements.', [LearningLevel.UNDERGRADUATE]: 'Evaluate green roof hydrology, structural requirements, and performance metrics.', [LearningLevel.GRADUATE]: 'Research urban heat island mitigation and stormwater management with green infrastructure.', [LearningLevel.PHD]: 'Investigate biodiversity, ecosystem services, and long-term performance of vegetated systems.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'greenroof-1', title: 'Rooftop Gardens', content: { [LearningLevel.ELEMENTARY]: '<h2>Gardens in the Sky!</h2><p>Green roofs have plants growing on top of buildings. They make cities prettier and help birds and bees!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Green Roof Benefits</h2><p>They absorb rainwater, cool buildings, provide habitat, and look beautiful.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Types of Green Roofs</h2><p>Extensive (shallow, low maintenance) vs intensive (deeper, garden-like). Each has different requirements.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Engineering Requirements</h2><p>Waterproofing, root barriers, drainage layers, growing medium, and structural capacity.</p>', [LearningLevel.GRADUATE]: '<h2>Urban Systems</h2><p>Green roofs as part of urban stormwater management and heat island mitigation strategies.</p>', [LearningLevel.PHD]: '<h2>Ecosystem Research</h2><p>Biodiversity assessments, pollinator habitat, and long-term vegetation dynamics.</p>' } }],
  activities: [{ id: 'greenroof-act-1', title: 'Design a Green Roof', type: 'SIMULATION', description: 'Create a green roof system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'greenroof-game', title: 'Rooftop Gardener', type: 'simulation', description: 'Build and maintain a green roof', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'greenroof-q1', question: 'What grows on a green roof?', options: ['Plants and flowers', 'More buildings', 'Cars', 'Nothing'], correctAnswer: 0, explanation: 'Green roofs have living plants growing on them.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 6: Water Conservation in Buildings
export const waterConservation: Module = {
  id: 'gb-water-conservation', slug: 'water-conservation-buildings', title: 'Water Conservation in Buildings',
  description: { [LearningLevel.ELEMENTARY]: 'Save water in your home - every drop counts!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn techniques to reduce water use in buildings.', [LearningLevel.HIGH_SCHOOL]: 'Analyze water-efficient fixtures, greywater, and rainwater systems.', [LearningLevel.UNDERGRADUATE]: 'Evaluate building water balance, recycling systems, and net-zero water strategies.', [LearningLevel.GRADUATE]: 'Research integrated water management and district-scale water systems.', [LearningLevel.PHD]: 'Investigate water-energy nexus and regenerative water systems.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'watercons-1', title: 'Save Every Drop', content: { [LearningLevel.ELEMENTARY]: '<h2>Water Savers!</h2><p>Turn off taps, take shorter showers, and use water-saving toilets to help save our precious water!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Water-Efficient Fixtures</h2><p>Low-flow showerheads, dual-flush toilets, and aerators use less water without sacrificing comfort.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Alternative Water Sources</h2><p>Rainwater harvesting for irrigation, greywater recycling for toilets, and condensate capture.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Water Balance</h2><p>Calculating building water use, identifying reduction opportunities, and achieving water certifications.</p>', [LearningLevel.GRADUATE]: '<h2>Net-Zero Water</h2><p>Buildings that capture, treat, and reuse all water on-site through closed-loop systems.</p>', [LearningLevel.PHD]: '<h2>Water-Energy Research</h2><p>Energy required for water treatment and the co-optimization of water and energy systems.</p>' } }],
  activities: [{ id: 'watercons-act-1', title: 'Water Audit', type: 'STEP_GUIDED', description: 'Find water waste and install efficient fixtures', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'watercons-game', title: 'Water Saver', type: 'simulation', description: 'Reduce building water use', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'watercons-q1', question: 'How can you save water at home?', options: ['Take shorter showers and turn off taps', 'Leave water running', 'Use more water', 'Ignore leaks'], correctAnswer: 0, explanation: 'Simple actions like shorter showers save lots of water.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 7: Indoor Air Quality
export const indoorAirQuality: Module = {
  id: 'gb-indoor-air', slug: 'indoor-air-quality', title: 'Indoor Air Quality',
  description: { [LearningLevel.ELEMENTARY]: 'Breathe clean air inside your home!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn what affects the air we breathe indoors.', [LearningLevel.HIGH_SCHOOL]: 'Analyze pollutant sources, ventilation, and filtration strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate IAQ standards, measurement methods, and HVAC design for healthy air.', [LearningLevel.GRADUATE]: 'Research sick building syndrome, VOCs, and advanced air purification.', [LearningLevel.PHD]: 'Investigate exposure assessment, health outcomes, and emerging contaminants.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'iaq-1', title: 'Clean Air Inside', content: { [LearningLevel.ELEMENTARY]: '<h2>Fresh Air!</h2><p>Opening windows, using air filters, and choosing natural materials help keep indoor air clean and healthy!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Air Pollutants</h2><p>Dust, mold, chemicals from furniture, and CO2 from breathing can make indoor air unhealthy.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Ventilation Strategies</h2><p>Natural ventilation, mechanical systems, and air filtration work together for healthy indoor air.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>IAQ Standards</h2><p>ASHRAE 62.1 ventilation requirements, MERV ratings, and CO2-based demand control.</p>', [LearningLevel.GRADUATE]: '<h2>Advanced IAQ</h2><p>HEPA and ULPA filtration, UV germicidal irradiation, and bipolar ionization.</p>', [LearningLevel.PHD]: '<h2>IAQ Research</h2><p>Emerging contaminants, real-time monitoring, and health outcome studies.</p>' } }],
  activities: [{ id: 'iaq-act-1', title: 'Air Quality Inspector', type: 'SIMULATION', description: 'Identify and solve indoor air problems', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'iaq-game', title: 'Fresh Air Expert', type: 'puzzle', description: 'Improve indoor air quality', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'iaq-q1', question: 'What helps keep indoor air clean?', options: ['Opening windows and air filters', 'Keeping windows closed forever', 'Adding more chemicals', 'Ignoring dust'], correctAnswer: 0, explanation: 'Fresh air and filtration help maintain good indoor air quality.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 8: Daylighting Design
export const daylighting: Module = {
  id: 'gb-daylighting', slug: 'daylighting-design', title: 'Daylighting Design',
  description: { [LearningLevel.ELEMENTARY]: 'Let the sunshine in to light your room!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how buildings can use natural light effectively.', [LearningLevel.HIGH_SCHOOL]: 'Analyze daylighting strategies, glare control, and energy savings.', [LearningLevel.UNDERGRADUATE]: 'Evaluate daylight metrics, simulation tools, and integrated lighting design.', [LearningLevel.GRADUATE]: 'Research circadian lighting, dynamic facades, and advanced daylighting systems.', [LearningLevel.PHD]: 'Investigate non-visual effects of light and human-centric lighting research.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'daylight-1', title: 'Natural Light', content: { [LearningLevel.ELEMENTARY]: '<h2>Sunshine Inside!</h2><p>Windows let in natural light. It makes us happy and saves electricity!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Designing with Light</h2><p>Window placement, skylights, and light shelves bring daylight deep into buildings.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Balancing Light</h2><p>Too much direct sun causes glare and overheating. Diffusers and shading help.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Daylight Metrics</h2><p>Daylight autonomy, spatial daylight autonomy, and annual sunlight exposure calculations.</p>', [LearningLevel.GRADUATE]: '<h2>Dynamic Systems</h2><p>Automated blinds, electrochromic glazing, and integrated controls optimize daylight.</p>', [LearningLevel.PHD]: '<h2>Circadian Research</h2><p>Light\'s effects on sleep, mood, and health - designing for human wellbeing.</p>' } }],
  activities: [{ id: 'daylight-act-1', title: 'Daylight Designer', type: 'SIMULATION', description: 'Position windows for optimal daylighting', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'daylight-game', title: 'Light Architect', type: 'puzzle', description: 'Design spaces with natural light', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'daylight-q1', question: 'Why is natural light good for buildings?', options: ['It makes us happy and saves electricity', 'It makes everything dark', 'It uses more energy', 'It has no benefits'], correctAnswer: 0, explanation: 'Natural daylight improves mood and reduces the need for electric lights.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 9: Efficient HVAC Systems
export const efficientHVAC: Module = {
  id: 'gb-hvac', slug: 'efficient-hvac-systems', title: 'Efficient HVAC Systems',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how buildings stay comfortable in any weather!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover efficient heating and cooling technologies.', [LearningLevel.HIGH_SCHOOL]: 'Analyze HVAC system types, efficiency ratings, and controls.', [LearningLevel.UNDERGRADUATE]: 'Evaluate system selection, load calculations, and energy optimization.', [LearningLevel.GRADUATE]: 'Research variable refrigerant flow, radiant systems, and decarbonization.', [LearningLevel.PHD]: 'Investigate next-generation cooling, thermal storage, and grid integration.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'hvac-1', title: 'Heating and Cooling', content: { [LearningLevel.ELEMENTARY]: '<h2>Stay Comfy!</h2><p>Furnaces keep us warm, air conditioners keep us cool. New ones use less energy!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>HVAC Efficiency</h2><p>Heat pumps move heat instead of making it, using much less energy than traditional systems.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>System Types</h2><p>Central air, mini-splits, VRF, and radiant systems each have advantages for different buildings.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Load Calculations</h2><p>Manual J for residential, ASHRAE methods for commercial - proper sizing is critical.</p>', [LearningLevel.GRADUATE]: '<h2>Decarbonization</h2><p>Electrification, heat pumps, and renewable integration for zero-carbon HVAC.</p>', [LearningLevel.PHD]: '<h2>HVAC Research</h2><p>Solid-state cooling, thermal batteries, and smart grid integration.</p>' } }],
  activities: [{ id: 'hvac-act-1', title: 'HVAC Selector', type: 'SCENARIO', description: 'Choose the right HVAC system for a building', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'hvac-game', title: 'Climate Controller', type: 'simulation', description: 'Design efficient HVAC systems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'hvac-q1', question: 'What does HVAC stand for?', options: ['Heating, Ventilation, and Air Conditioning', 'Heavy Vehicles And Cars', 'High Voltage Air Control', 'Hot and Very Air Cold'], correctAnswer: 0, explanation: 'HVAC stands for Heating, Ventilation, and Air Conditioning.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 10: Smart Building Technology
export const smartBuilding: Module = {
  id: 'gb-smart-tech', slug: 'smart-building-technology', title: 'Smart Building Technology',
  description: { [LearningLevel.ELEMENTARY]: 'Buildings that think and save energy automatically!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how sensors and computers make buildings smarter.', [LearningLevel.HIGH_SCHOOL]: 'Analyze building automation, IoT sensors, and energy management.', [LearningLevel.UNDERGRADUATE]: 'Evaluate BAS architecture, protocols, and cybersecurity considerations.', [LearningLevel.GRADUATE]: 'Research machine learning for buildings, predictive control, and digital twins.', [LearningLevel.PHD]: 'Investigate occupancy-driven control, fault detection, and autonomous building systems.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'smart-1', title: 'Clever Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Smart Homes!</h2><p>Lights turn off when you leave, thermostats learn what you like - smart buildings save energy!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Building Automation</h2><p>Sensors detect occupancy, temperature, and light to automatically adjust systems.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>IoT in Buildings</h2><p>Internet of Things connects sensors, controls, and analytics for optimization.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>BAS Design</h2><p>Building automation system architecture, protocols (BACnet, Modbus), and integration.</p>', [LearningLevel.GRADUATE]: '<h2>Predictive Control</h2><p>Machine learning predicts loads and optimizes operation proactively.</p>', [LearningLevel.PHD]: '<h2>Smart Building Research</h2><p>Digital twins, autonomous systems, and advanced fault detection diagnostics.</p>' } }],
  activities: [{ id: 'smart-act-1', title: 'Smart Controller', type: 'SIMULATION', description: 'Program building automation scenarios', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'smart-game', title: 'Building Brain', type: 'simulation', description: 'Automate a building for efficiency', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'smart-q1', question: 'What can smart buildings do?', options: ['Turn off lights when rooms are empty', 'Use more energy', 'Ignore what\'s happening', 'Stay the same forever'], correctAnswer: 0, explanation: 'Smart buildings automatically adjust to save energy and improve comfort.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 11: Windows and Glazing
export const windowsGlazing: Module = {
  id: 'gb-windows', slug: 'windows-glazing', title: 'Windows and Glazing',
  description: { [LearningLevel.ELEMENTARY]: 'Windows aren\'t just for looking out - they\'re important!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how windows affect building energy and comfort.', [LearningLevel.HIGH_SCHOOL]: 'Analyze glazing types, U-factors, SHGC, and visible transmittance.', [LearningLevel.UNDERGRADUATE]: 'Evaluate window selection, frame materials, and performance optimization.', [LearningLevel.GRADUATE]: 'Research dynamic glazing, vacuum glazing, and facade engineering.', [LearningLevel.PHD]: 'Investigate transparent photovoltaics and next-generation glazing technologies.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'windows-1', title: 'Amazing Windows', content: { [LearningLevel.ELEMENTARY]: '<h2>Window Power!</h2><p>Special windows keep heat in during winter and out during summer while letting in light!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Window Technology</h2><p>Double and triple pane windows with gas fills and coatings dramatically improve efficiency.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Glazing Properties</h2><p>U-factor (insulation), SHGC (solar heat gain), and VT (visible light) must be balanced.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Window Selection</h2><p>Matching glazing properties to climate and orientation for optimal performance.</p>', [LearningLevel.GRADUATE]: '<h2>Dynamic Glazing</h2><p>Electrochromic and thermochromic glass that changes properties on demand.</p>', [LearningLevel.PHD]: '<h2>Glazing Research</h2><p>Transparent PV, vacuum insulated glass, and switchable smart windows.</p>' } }],
  activities: [{ id: 'windows-act-1', title: 'Window Selector', type: 'PUZZLE', description: 'Choose the right windows for each climate', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'windows-game', title: 'Glazing Expert', type: 'puzzle', description: 'Select optimal windows for buildings', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'windows-q1', question: 'Why do good windows have multiple layers of glass?', options: ['To keep heat in or out better', 'To make them heavier', 'For no reason', 'To block all light'], correctAnswer: 0, explanation: 'Multiple glass layers with air or gas in between provide better insulation.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 12: Geothermal Systems
export const geothermalSystems: Module = {
  id: 'gb-geothermal', slug: 'geothermal-systems', title: 'Geothermal Systems',
  description: { [LearningLevel.ELEMENTARY]: 'Use the Earth\'s heat to warm and cool your home!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how ground-source heat pumps work.', [LearningLevel.HIGH_SCHOOL]: 'Analyze geothermal system types, design, and efficiency.', [LearningLevel.UNDERGRADUATE]: 'Evaluate ground loop sizing, equipment selection, and economic analysis.', [LearningLevel.GRADUATE]: 'Research advanced configurations, district systems, and hybrid approaches.', [LearningLevel.PHD]: 'Investigate ground thermal properties, long-term performance, and geo-exchange research.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'geo-1', title: 'Earth Energy', content: { [LearningLevel.ELEMENTARY]: '<h2>Underground Heat!</h2><p>The ground stays the same temperature all year. We can use pipes to heat and cool buildings!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Ground-Source Heat Pumps</h2><p>Pipes in the ground exchange heat with the earth - cooler than air in summer, warmer in winter.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>System Types</h2><p>Horizontal, vertical, and pond loops each suit different sites and budgets.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Loop Design</h2><p>Ground conductivity testing, bore field sizing, and heat exchanger selection.</p>', [LearningLevel.GRADUATE]: '<h2>District Geothermal</h2><p>Shared bore fields serving multiple buildings for economy of scale.</p>', [LearningLevel.PHD]: '<h2>Geothermal Research</h2><p>Thermal response testing, long-term ground temperature changes, and optimization.</p>' } }],
  activities: [{ id: 'geo-act-1', title: 'Geothermal Designer', type: 'SIMULATION', description: 'Design a geothermal heating and cooling system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'geo-game', title: 'Earth Energy Engineer', type: 'simulation', description: 'Install geothermal systems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'geo-q1', question: 'Where do geothermal systems get their energy?', options: ['From the constant temperature underground', 'From the sun directly', 'From burning fuel', 'From the wind'], correctAnswer: 0, explanation: 'Geothermal systems use the stable temperature of the ground.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 13: Building-Integrated Solar
export const buildingSolar: Module = {
  id: 'gb-solar', slug: 'building-integrated-solar', title: 'Building-Integrated Solar',
  description: { [LearningLevel.ELEMENTARY]: 'Turn your roof into a power plant!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how buildings can generate their own electricity.', [LearningLevel.HIGH_SCHOOL]: 'Analyze rooftop PV, BIPV products, and system sizing.', [LearningLevel.UNDERGRADUATE]: 'Evaluate solar resource assessment, inverter selection, and grid connection.', [LearningLevel.GRADUATE]: 'Research building-integrated photovoltaics and solar thermal integration.', [LearningLevel.PHD]: 'Investigate transparent solar, solar facades, and advanced cell technologies.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'solar-1', title: 'Solar Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Power from the Sun!</h2><p>Solar panels on roofs turn sunshine into electricity to power your home!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Rooftop Solar</h2><p>Photovoltaic panels convert sunlight to electricity, offsetting grid power use.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>BIPV</h2><p>Building-integrated photovoltaics replace conventional materials - solar shingles, facades, windows.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>System Design</h2><p>Resource assessment, panel layout, inverter sizing, and utility interconnection.</p>', [LearningLevel.GRADUATE]: '<h2>Advanced Integration</h2><p>Solar thermal, PVT hybrids, and facade-integrated systems for net-zero buildings.</p>', [LearningLevel.PHD]: '<h2>Solar Research</h2><p>Perovskites, transparent cells, and solar windows for maximum integration.</p>' } }],
  activities: [{ id: 'solar-act-1', title: 'Solar System Designer', type: 'SIMULATION', description: 'Design a building solar installation', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'solar-game', title: 'Solar Architect', type: 'simulation', description: 'Maximize building solar potential', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'solar-q1', question: 'What do solar panels on buildings do?', options: ['Turn sunshine into electricity', 'Block all sunlight', 'Use more energy', 'Nothing useful'], correctAnswer: 0, explanation: 'Solar panels convert sunlight into electricity for the building.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 14: Rainwater Harvesting
export const rainwaterHarvesting: Module = {
  id: 'gb-rainwater', slug: 'rainwater-harvesting', title: 'Rainwater Harvesting',
  description: { [LearningLevel.ELEMENTARY]: 'Catch rain from the sky to use in your home!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how to collect and use rainwater.', [LearningLevel.HIGH_SCHOOL]: 'Analyze rainwater harvesting system design and water quality.', [LearningLevel.UNDERGRADUATE]: 'Evaluate collection, storage, treatment, and distribution systems.', [LearningLevel.GRADUATE]: 'Research integrated rainwater management and building water resilience.', [LearningLevel.PHD]: 'Investigate urban water cycles and rainwater quality dynamics.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'rain-1', title: 'Catching Rain', content: { [LearningLevel.ELEMENTARY]: '<h2>Free Water from the Sky!</h2><p>Roofs collect rainwater into barrels. Use it to water plants!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Rainwater Systems</h2><p>Gutters, filters, and storage tanks collect and store rainwater for later use.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>System Components</h2><p>Catchment area, conveyance, first-flush diverters, storage, and treatment.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>System Sizing</h2><p>Calculating catchment yield, storage capacity, and demand matching.</p>', [LearningLevel.GRADUATE]: '<h2>Water Resilience</h2><p>Rainwater as part of building water security and climate adaptation.</p>', [LearningLevel.PHD]: '<h2>Rainwater Research</h2><p>Quality modeling, treatment optimization, and health risk assessment.</p>' } }],
  activities: [{ id: 'rain-act-1', title: 'Rainwater System Designer', type: 'SIMULATION', description: 'Design a rainwater harvesting system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'rain-game', title: 'Rain Collector', type: 'simulation', description: 'Build rainwater harvesting systems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'rain-q1', question: 'What can you use collected rainwater for?', options: ['Watering plants and flushing toilets', 'Nothing at all', 'Only drinking', 'Throwing it away'], correctAnswer: 0, explanation: 'Harvested rainwater is great for irrigation and non-potable uses.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 15: Biophilic Design
export const biophilicDesign: Module = {
  id: 'gb-biophilic', slug: 'biophilic-design', title: 'Biophilic Design',
  description: { [LearningLevel.ELEMENTARY]: 'Bring nature inside buildings to feel happier!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how nature in buildings improves wellbeing.', [LearningLevel.HIGH_SCHOOL]: 'Analyze biophilic design principles and implementation strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate biophilic patterns, evidence base, and design integration.', [LearningLevel.GRADUATE]: 'Research health outcomes, productivity impacts, and biophilic urbanism.', [LearningLevel.PHD]: 'Investigate human-nature connection, restorative environments, and quantification methods.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'biophilic-1', title: 'Nature in Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Green Buildings!</h2><p>Plants, natural light, and nature views inside buildings make people feel happier and healthier!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Biophilia</h2><p>Humans evolved with nature. We feel better when buildings include natural elements.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Design Patterns</h2><p>Visual nature connection, natural light, natural materials, and nature patterns.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Evidence Base</h2><p>Research shows biophilic design reduces stress, improves cognition, and enhances wellbeing.</p>', [LearningLevel.GRADUATE]: '<h2>Implementation</h2><p>Integrating biophilic elements across building types and climates.</p>', [LearningLevel.PHD]: '<h2>Biophilic Research</h2><p>Measuring outcomes, dose-response relationships, and optimal implementation.</p>' } }],
  activities: [{ id: 'biophilic-act-1', title: 'Biophilic Designer', type: 'PUZZLE', description: 'Add nature elements to building designs', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'biophilic-game', title: 'Nature Architect', type: 'puzzle', description: 'Create nature-connected spaces', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'biophilic-q1', question: 'How does nature in buildings help people?', options: ['Makes them happier and healthier', 'Makes them tired', 'Has no effect', 'Makes them sad'], correctAnswer: 0, explanation: 'Nature elements in buildings improve mood, reduce stress, and boost health.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 16: Green Building Certifications
export const greenCertifications: Module = {
  id: 'gb-certifications', slug: 'green-certifications', title: 'Green Building Certifications',
  description: { [LearningLevel.ELEMENTARY]: 'Buildings can earn gold stars for being green!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn about systems that certify sustainable buildings.', [LearningLevel.HIGH_SCHOOL]: 'Compare LEED, Passive House, WELL, and other certification systems.', [LearningLevel.UNDERGRADUATE]: 'Evaluate certification requirements, credits, and documentation.', [LearningLevel.GRADUATE]: 'Research certification effectiveness, market impacts, and evolution.', [LearningLevel.PHD]: 'Investigate certification outcomes, performance verification, and system improvement.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'cert-1', title: 'Building Awards', content: { [LearningLevel.ELEMENTARY]: '<h2>Green Building Stars!</h2><p>LEED and other programs give awards to buildings that help the planet!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Certification Systems</h2><p>LEED, Passive House, BREEAM, and Living Building Challenge each measure sustainability differently.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>LEED Categories</h2><p>Energy, water, materials, indoor quality, site, innovation - points in each category.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Documentation</h2><p>Submitting credits, calculations, and evidence for certification.</p>', [LearningLevel.GRADUATE]: '<h2>Market Impact</h2><p>Certification effects on rent, value, and occupant satisfaction.</p>', [LearningLevel.PHD]: '<h2>Certification Research</h2><p>Performance gap studies, outcome measurement, and system evolution.</p>' } }],
  activities: [{ id: 'cert-act-1', title: 'Certification Navigator', type: 'SCENARIO', description: 'Choose the right certification for a project', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'cert-game', title: 'Green Building Certifier', type: 'simulation', description: 'Earn green building certifications', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'cert-q1', question: 'What does LEED certification mean?', options: ['The building is environmentally friendly', 'The building is very tall', 'The building is old', 'The building is red'], correctAnswer: 0, explanation: 'LEED certifies that buildings meet sustainability standards.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 17: Natural Building Methods
export const naturalBuilding: Module = {
  id: 'gb-natural-building', slug: 'natural-building-methods', title: 'Natural Building Methods',
  description: { [LearningLevel.ELEMENTARY]: 'Build with earth, straw, and other natural stuff!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover traditional and modern natural building techniques.', [LearningLevel.HIGH_SCHOOL]: 'Analyze straw bale, cob, rammed earth, and earthbag construction.', [LearningLevel.UNDERGRADUATE]: 'Evaluate structural performance, code compliance, and modern applications.', [LearningLevel.GRADUATE]: 'Research thermal performance, moisture dynamics, and scaling challenges.', [LearningLevel.PHD]: 'Investigate natural building science, code development, and performance optimization.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'natural-1', title: 'Earth Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Houses from the Earth!</h2><p>People build houses from mud, straw, and earth. They\'re natural and cozy!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Natural Methods</h2><p>Straw bale, cob, adobe, rammed earth - ancient techniques updated for modern buildings.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Building Systems</h2><p>Each method has unique properties for insulation, thermal mass, and moisture management.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Modern Applications</h2><p>Code compliance, structural engineering, and professional natural building.</p>', [LearningLevel.GRADUATE]: '<h2>Performance Analysis</h2><p>Hygrothermal modeling, durability studies, and climate adaptation.</p>', [LearningLevel.PHD]: '<h2>Natural Building Research</h2><p>Material science, testing standards, and scalable applications.</p>' } }],
  activities: [{ id: 'natural-act-1', title: 'Natural Builder', type: 'SIMULATION', description: 'Choose natural building methods for a project', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'natural-game', title: 'Earth Builder', type: 'simulation', description: 'Construct natural buildings', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'natural-q1', question: 'What materials are used in natural building?', options: ['Earth, straw, and natural materials', 'Only plastic', 'Only steel', 'Only glass'], correctAnswer: 0, explanation: 'Natural building uses earth, straw, and other materials from nature.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 18: Building Retrofits
export const buildingRetrofits: Module = {
  id: 'gb-retrofits', slug: 'building-retrofits', title: 'Building Retrofits',
  description: { [LearningLevel.ELEMENTARY]: 'Make old buildings green and efficient!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how to improve existing buildings for sustainability.', [LearningLevel.HIGH_SCHOOL]: 'Analyze energy audit processes and retrofit strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate deep energy retrofits, financing, and project delivery.', [LearningLevel.GRADUATE]: 'Research mass retrofit strategies and building stock transformation.', [LearningLevel.PHD]: 'Investigate retrofit economics, policy effectiveness, and scaling approaches.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'retrofit-1', title: 'Green Makeovers', content: { [LearningLevel.ELEMENTARY]: '<h2>Building Makeovers!</h2><p>Old buildings can get upgrades like better insulation and new windows to save energy!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Retrofit Options</h2><p>Insulation, air sealing, window upgrades, and HVAC improvements.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Energy Audits</h2><p>Blower door tests, infrared scans, and analysis identify improvement opportunities.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Deep Retrofits</h2><p>Whole-building approaches that achieve 50%+ energy reduction.</p>', [LearningLevel.GRADUATE]: '<h2>Mass Retrofits</h2><p>Scaling strategies, industrialized approaches, and policy drivers.</p>', [LearningLevel.PHD]: '<h2>Retrofit Research</h2><p>Cost-effectiveness, performance measurement, and market transformation.</p>' } }],
  activities: [{ id: 'retrofit-act-1', title: 'Retrofit Planner', type: 'SCENARIO', description: 'Plan energy improvements for an old building', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'retrofit-game', title: 'Building Upgrader', type: 'simulation', description: 'Retrofit buildings for efficiency', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'retrofit-q1', question: 'What is a building retrofit?', options: ['Upgrading an old building to be more efficient', 'Tearing down buildings', 'Building new', 'Painting walls'], correctAnswer: 0, explanation: 'Retrofits improve existing buildings for better energy performance.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 19: Net Zero Buildings
export const netZeroBuildings: Module = {
  id: 'gb-net-zero', slug: 'net-zero-buildings', title: 'Net Zero Buildings',
  description: { [LearningLevel.ELEMENTARY]: 'Buildings that make as much energy as they use!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how buildings can produce their own energy.', [LearningLevel.HIGH_SCHOOL]: 'Analyze net zero energy design strategies and calculations.', [LearningLevel.UNDERGRADUATE]: 'Evaluate net zero definitions, metrics, and design approaches.', [LearningLevel.GRADUATE]: 'Research net zero policy, grid interaction, and carbon accounting.', [LearningLevel.PHD]: 'Investigate net zero scalability, temporal matching, and embodied carbon.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'netzero-1', title: 'Energy Balance', content: { [LearningLevel.ELEMENTARY]: '<h2>Zero Energy!</h2><p>Super-efficient buildings with solar panels can make all the energy they need!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Net Zero Concept</h2><p>Reduce energy use dramatically, then generate enough renewable energy to cover the rest.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Net Zero Design</h2><p>Efficiency first, then renewables. Annual energy production equals consumption.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Definitions</h2><p>Net zero energy, net zero carbon, source vs site energy, and boundary issues.</p>', [LearningLevel.GRADUATE]: '<h2>Grid Interaction</h2><p>Time-of-use considerations, storage, and grid carbon intensity.</p>', [LearningLevel.PHD]: '<h2>Net Zero Research</h2><p>Embodied carbon, temporal matching, and whole-life carbon assessment.</p>' } }],
  activities: [{ id: 'netzero-act-1', title: 'Net Zero Designer', type: 'SIMULATION', description: 'Design a net zero energy building', estimatedMinutes: 30, interactiveContent: {} }],
  game: { id: 'netzero-game', title: 'Zero Energy Builder', type: 'simulation', description: 'Create a net zero building', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'netzero-q1', question: 'What is a net zero energy building?', options: ['It produces as much energy as it uses', 'It uses no electricity at all', 'It only uses coal', 'It wastes energy'], correctAnswer: 0, explanation: 'Net zero buildings balance their energy use with on-site generation.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 20: Healthy Building Design
export const healthyBuilding: Module = {
  id: 'gb-healthy', slug: 'healthy-building-design', title: 'Healthy Building Design',
  description: { [LearningLevel.ELEMENTARY]: 'Buildings that help keep you healthy!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how buildings affect our health and wellbeing.', [LearningLevel.HIGH_SCHOOL]: 'Analyze health-focused design strategies and WELL certification.', [LearningLevel.UNDERGRADUATE]: 'Evaluate evidence-based design for health, comfort, and productivity.', [LearningLevel.GRADUATE]: 'Research building health impacts, measurement methods, and interventions.', [LearningLevel.PHD]: 'Investigate dose-response relationships and building health outcomes research.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'healthy-1', title: 'Buildings for Health', content: { [LearningLevel.ELEMENTARY]: '<h2>Healthy Spaces!</h2><p>Good buildings have fresh air, natural light, and spaces to move around!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Health Factors</h2><p>Air quality, lighting, temperature, acoustics, and access to nature affect health.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>WELL Building Standard</h2><p>Certification focused on human health through air, water, nourishment, light, fitness, comfort, and mind.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Evidence-Based Design</h2><p>Using research to inform design decisions that improve occupant health.</p>', [LearningLevel.GRADUATE]: '<h2>Health Measurement</h2><p>Surveys, sensors, and biomarkers for assessing building health impacts.</p>', [LearningLevel.PHD]: '<h2>Health Research</h2><p>Quantifying health benefits, long-term studies, and intervention effectiveness.</p>' } }],
  activities: [{ id: 'healthy-act-1', title: 'Healthy Space Designer', type: 'PUZZLE', description: 'Design spaces for occupant health', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'healthy-game', title: 'Health Building Expert', type: 'puzzle', description: 'Create healthy building environments', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'healthy-q1', question: 'What makes a building healthy?', options: ['Fresh air, natural light, and comfortable temperature', 'Dark rooms', 'Stuffy air', 'No windows'], correctAnswer: 0, explanation: 'Good air, light, and comfort are key to healthy buildings.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 21: Building Acoustics
export const buildingAcoustics: Module = {
  id: 'gb-acoustics', slug: 'building-acoustics', title: 'Building Acoustics',
  description: { [LearningLevel.ELEMENTARY]: 'Make buildings quieter and sound better!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how buildings control sound.', [LearningLevel.HIGH_SCHOOL]: 'Analyze sound transmission, absorption, and acoustic design.', [LearningLevel.UNDERGRADUATE]: 'Evaluate STC ratings, NRC values, and acoustic design strategies.', [LearningLevel.GRADUATE]: 'Research acoustic comfort, speech privacy, and sustainable acoustics.', [LearningLevel.PHD]: 'Investigate psychoacoustics, acoustic modeling, and innovative materials.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'acoustics-1', title: 'Sound Control', content: { [LearningLevel.ELEMENTARY]: '<h2>Quiet Please!</h2><p>Good buildings keep noise out and help sounds be clear inside!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Sound Basics</h2><p>Sound travels through air and materials. Design can block, absorb, or shape sound.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Acoustic Principles</h2><p>Sound transmission loss, absorption coefficients, and reverberation time.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Acoustic Design</h2><p>STC ratings for walls, NRC for finishes, and room acoustics optimization.</p>', [LearningLevel.GRADUATE]: '<h2>Advanced Acoustics</h2><p>Speech privacy, background noise control, and sustainable materials.</p>', [LearningLevel.PHD]: '<h2>Acoustics Research</h2><p>Computational acoustics, novel absorbers, and human response studies.</p>' } }],
  activities: [{ id: 'acoustics-act-1', title: 'Sound Designer', type: 'PUZZLE', description: 'Control sound in building spaces', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'acoustics-game', title: 'Acoustic Engineer', type: 'puzzle', description: 'Design for good acoustics', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'acoustics-q1', question: 'Why is acoustic design important in buildings?', options: ['To control noise and make spaces comfortable', 'To make everything louder', 'Sound doesn\'t matter', 'To create echoes'], correctAnswer: 0, explanation: 'Good acoustics make buildings comfortable and functional.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 22: Sustainable Lighting
export const sustainableLighting: Module = {
  id: 'gb-lighting', slug: 'sustainable-lighting', title: 'Sustainable Lighting Design',
  description: { [LearningLevel.ELEMENTARY]: 'Light up buildings while saving energy!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn about energy-efficient lighting options.', [LearningLevel.HIGH_SCHOOL]: 'Analyze LED technology, controls, and lighting design principles.', [LearningLevel.UNDERGRADUATE]: 'Evaluate lighting power density, controls, and daylighting integration.', [LearningLevel.GRADUATE]: 'Research human-centric lighting and advanced control strategies.', [LearningLevel.PHD]: 'Investigate lighting quality metrics, spectral optimization, and health effects.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'lighting-1', title: 'Smart Lights', content: { [LearningLevel.ELEMENTARY]: '<h2>Bright Ideas!</h2><p>LED lights use less energy and last longer than old bulbs!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Efficient Lighting</h2><p>LEDs, occupancy sensors, and daylight dimming cut lighting energy use dramatically.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Lighting Design</h2><p>Footcandle requirements, color temperature, and lamp selection.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Lighting Power</h2><p>Watts per square foot limits, controls credits, and daylighting integration.</p>', [LearningLevel.GRADUATE]: '<h2>Human-Centric</h2><p>Tunable lighting, circadian support, and individual control.</p>', [LearningLevel.PHD]: '<h2>Lighting Research</h2><p>Spectral power distribution, melanopic metrics, and long-term health effects.</p>' } }],
  activities: [{ id: 'lighting-act-1', title: 'Lighting Designer', type: 'SIMULATION', description: 'Design efficient lighting systems', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'lighting-game', title: 'Light Master', type: 'simulation', description: 'Create efficient lighting designs', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'lighting-q1', question: 'Why are LED lights better for the environment?', options: ['They use less energy and last longer', 'They use more energy', 'They break quickly', 'They are dimmer'], correctAnswer: 0, explanation: 'LEDs are efficient and durable, reducing energy use and waste.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 23: Resilient Building Design
export const resilientBuilding: Module = {
  id: 'gb-resilient', slug: 'resilient-building-design', title: 'Resilient Building Design',
  description: { [LearningLevel.ELEMENTARY]: 'Build strong buildings that can handle storms!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how buildings can resist natural disasters.', [LearningLevel.HIGH_SCHOOL]: 'Analyze resilient design strategies for climate adaptation.', [LearningLevel.UNDERGRADUATE]: 'Evaluate passive survivability, backup systems, and hazard mitigation.', [LearningLevel.GRADUATE]: 'Research climate adaptation, infrastructure interdependencies, and community resilience.', [LearningLevel.PHD]: 'Investigate resilience metrics, risk assessment, and adaptive capacity.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'resilient-1', title: 'Strong Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Weather-Proof!</h2><p>Strong buildings protect people during storms, heat waves, and other extreme weather!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Resilient Design</h2><p>Buildings designed to withstand floods, hurricanes, earthquakes, and power outages.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Climate Adaptation</h2><p>Designing for future climate conditions including extreme heat, flooding, and storms.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Passive Survivability</h2><p>Buildings that maintain habitable conditions during extended power outages.</p>', [LearningLevel.GRADUATE]: '<h2>System Integration</h2><p>Backup power, water storage, and community resilience hubs.</p>', [LearningLevel.PHD]: '<h2>Resilience Research</h2><p>Quantifying resilience, performance under stress, and adaptation pathways.</p>' } }],
  activities: [{ id: 'resilient-act-1', title: 'Resilience Planner', type: 'SCENARIO', description: 'Design a building to resist hazards', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'resilient-game', title: 'Storm Builder', type: 'simulation', description: 'Build resilient structures', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'resilient-q1', question: 'What makes a building resilient?', options: ['It can withstand storms and emergencies', 'It falls down easily', 'It only works in good weather', 'It needs constant power'], correctAnswer: 0, explanation: 'Resilient buildings protect people during emergencies and extreme weather.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 24: Adaptive Reuse
export const adaptiveReuse: Module = {
  id: 'gb-adaptive-reuse', slug: 'adaptive-reuse', title: 'Adaptive Reuse',
  description: { [LearningLevel.ELEMENTARY]: 'Give old buildings exciting new lives!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how old buildings can become something new.', [LearningLevel.HIGH_SCHOOL]: 'Analyze adaptive reuse strategies, challenges, and benefits.', [LearningLevel.UNDERGRADUATE]: 'Evaluate historic preservation, code compliance, and design integration.', [LearningLevel.GRADUATE]: 'Research embodied carbon benefits, policy incentives, and market factors.', [LearningLevel.PHD]: 'Investigate reuse versus new construction lifecycle impacts and decision frameworks.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'adaptive-1', title: 'New Life for Old Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Building Transformations!</h2><p>Old factories become apartments! Churches become restaurants! It\'s recycling for buildings!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Creative Reuse</h2><p>Instead of demolishing, transform buildings for new purposes while keeping their character.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Reuse Strategies</h2><p>Assessing buildings for reuse potential, addressing code compliance, and preserving character.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Design Integration</h2><p>Balancing preservation with modern performance requirements.</p>', [LearningLevel.GRADUATE]: '<h2>Carbon Benefits</h2><p>Avoided embodied carbon from reuse versus demolition and new construction.</p>', [LearningLevel.PHD]: '<h2>Reuse Research</h2><p>Decision frameworks, lifecycle comparisons, and policy effectiveness.</p>' } }],
  activities: [{ id: 'adaptive-act-1', title: 'Building Transformer', type: 'SCENARIO', description: 'Reimagine an old building for a new use', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'adaptive-game', title: 'Reuse Master', type: 'simulation', description: 'Transform old buildings for new purposes', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'adaptive-q1', question: 'What is adaptive reuse?', options: ['Using old buildings for new purposes', 'Tearing down everything', 'Only building new', 'Leaving buildings empty'], correctAnswer: 0, explanation: 'Adaptive reuse gives old buildings new functions instead of demolishing them.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 25: Green Building Economics
export const greenBuildingEconomics: Module = {
  id: 'gb-economics', slug: 'green-building-economics', title: 'Green Building Economics',
  description: { [LearningLevel.ELEMENTARY]: 'Green buildings can save money too!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how sustainable buildings make financial sense.', [LearningLevel.HIGH_SCHOOL]: 'Analyze lifecycle costs, payback periods, and financial incentives.', [LearningLevel.UNDERGRADUATE]: 'Evaluate ROI, discount rates, and value of non-energy benefits.', [LearningLevel.GRADUATE]: 'Research green premium, financing mechanisms, and market valuation.', [LearningLevel.PHD]: 'Investigate total value proposition, externalities, and economic modeling.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'economics-1', title: 'Green Saves Green', content: { [LearningLevel.ELEMENTARY]: '<h2>Saving Money!</h2><p>Energy-efficient buildings cost less to run. Lower bills mean more money for other things!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Cost and Savings</h2><p>Green buildings may cost more upfront but save money through lower energy and water bills.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Lifecycle Costing</h2><p>Looking beyond first cost to include operating, maintenance, and replacement costs.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Financial Analysis</h2><p>NPV, IRR, simple payback, and making the business case for green building.</p>', [LearningLevel.GRADUATE]: '<h2>Green Value</h2><p>Rent premiums, higher occupancy, and asset value of green-certified buildings.</p>', [LearningLevel.PHD]: '<h2>Economic Research</h2><p>Externality valuation, split incentives, and policy economic analysis.</p>' } }],
  activities: [{ id: 'economics-act-1', title: 'Cost Calculator', type: 'SIMULATION', description: 'Calculate green building costs and savings', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'economics-game', title: 'Green Budget Builder', type: 'simulation', description: 'Balance costs and savings for green buildings', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'economics-q1', question: 'How do green buildings save money?', options: ['Lower energy and water bills', 'They cost nothing to build', 'They use more energy', 'They don\'t save money'], correctAnswer: 0, explanation: 'Green buildings reduce ongoing costs through efficiency.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 26: Embodied Carbon
export const embodiedCarbon: Module = {
  id: 'gb-embodied-carbon', slug: 'embodied-carbon', title: 'Embodied Carbon',
  description: { [LearningLevel.ELEMENTARY]: 'Buildings have carbon hiding inside them!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn about the carbon in building materials.', [LearningLevel.HIGH_SCHOOL]: 'Analyze embodied carbon sources, measurement, and reduction strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate whole building lifecycle carbon and reduction pathways.', [LearningLevel.GRADUATE]: 'Research decarbonization, carbon neutral buildings, and policy approaches.', [LearningLevel.PHD]: 'Investigate carbon accounting methods, uncertainty, and system boundaries.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'embodied-1', title: 'Hidden Carbon', content: { [LearningLevel.ELEMENTARY]: '<h2>Carbon in Materials!</h2><p>Making cement and steel releases carbon. Choosing wood and recycled materials helps!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Embodied vs Operating</h2><p>Embodied carbon comes from making materials. Operating carbon comes from running buildings.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Carbon Sources</h2><p>Concrete and steel account for most embodied carbon. Low-carbon alternatives exist.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Carbon Accounting</h2><p>Stages A1-A5, B, C, and D in whole building lifecycle carbon assessment.</p>', [LearningLevel.GRADUATE]: '<h2>Decarbonization</h2><p>Material substitution, optimization, and carbon-negative approaches.</p>', [LearningLevel.PHD]: '<h2>Carbon Research</h2><p>Methodology comparison, data quality, and whole-life carbon optimization.</p>' } }],
  activities: [{ id: 'embodied-act-1', title: 'Carbon Calculator', type: 'SIMULATION', description: 'Calculate embodied carbon in building designs', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'embodied-game', title: 'Carbon Reducer', type: 'simulation', description: 'Minimize embodied carbon in buildings', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'embodied-q1', question: 'What is embodied carbon?', options: ['Carbon released making building materials', 'Carbon from running buildings', 'Carbon in the air', 'There is no such thing'], correctAnswer: 0, explanation: 'Embodied carbon is from manufacturing and transporting building materials.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 27: Building Commissioning
export const buildingCommissioning: Module = {
  id: 'gb-commissioning', slug: 'building-commissioning', title: 'Building Commissioning',
  description: { [LearningLevel.ELEMENTARY]: 'Make sure buildings work the way they should!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how buildings are tested to work properly.', [LearningLevel.HIGH_SCHOOL]: 'Analyze commissioning processes, benefits, and requirements.', [LearningLevel.UNDERGRADUATE]: 'Evaluate commissioning scope, methods, and documentation.', [LearningLevel.GRADUATE]: 'Research continuous commissioning and monitoring-based Cx.', [LearningLevel.PHD]: 'Investigate commissioning effectiveness, automation, and performance assurance.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'cx-1', title: 'Testing Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Does It Work?</h2><p>Before moving in, experts test everything to make sure the building works right!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Commissioning Basics</h2><p>Testing HVAC, lighting, controls, and other systems to verify proper operation.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Cx Process</h2><p>Design review, functional testing, training, and documentation for building systems.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Cx Requirements</h2><p>Scope, specifications, and LEED/ASHRAE commissioning requirements.</p>', [LearningLevel.GRADUATE]: '<h2>Continuous Cx</h2><p>Ongoing monitoring and optimization through building lifespan.</p>', [LearningLevel.PHD]: '<h2>Cx Research</h2><p>Automated fault detection, machine learning, and performance guarantees.</p>' } }],
  activities: [{ id: 'cx-act-1', title: 'System Tester', type: 'SIMULATION', description: 'Commission building systems', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'cx-game', title: 'Building Tester', type: 'simulation', description: 'Test and verify building systems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'cx-q1', question: 'What is building commissioning?', options: ['Testing to make sure systems work properly', 'Painting the building', 'Building faster', 'Ignoring problems'], correctAnswer: 0, explanation: 'Commissioning verifies that all building systems operate correctly.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 28: Urban Green Buildings
export const urbanGreenBuildings: Module = {
  id: 'gb-urban', slug: 'urban-green-buildings', title: 'Urban Green Buildings',
  description: { [LearningLevel.ELEMENTARY]: 'Make cities greener with smart buildings!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how green buildings fit into cities.', [LearningLevel.HIGH_SCHOOL]: 'Analyze site selection, transit access, and urban context.', [LearningLevel.UNDERGRADUATE]: 'Evaluate urban heat islands, district systems, and walkability.', [LearningLevel.GRADUATE]: 'Research urban metabolism, green infrastructure integration, and district energy.', [LearningLevel.PHD]: 'Investigate building-city interactions and urban sustainability transitions.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'urban-1', title: 'City Green', content: { [LearningLevel.ELEMENTARY]: '<h2>Green Cities!</h2><p>Buildings near buses and trains help people drive less. That\'s good for the air!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Location Matters</h2><p>Where a building is located affects transportation, energy, and community.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Urban Context</h2><p>Transit access, walkability, mixed use, and sustainable site design.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Urban Systems</h2><p>Heat islands, stormwater, and building impacts on urban environment.</p>', [LearningLevel.GRADUATE]: '<h2>District Approaches</h2><p>District energy, shared infrastructure, and neighborhood-scale sustainability.</p>', [LearningLevel.PHD]: '<h2>Urban Research</h2><p>Building-urban interactions, policy levers, and transition pathways.</p>' } }],
  activities: [{ id: 'urban-act-1', title: 'Site Selector', type: 'SCENARIO', description: 'Choose sustainable building locations', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'urban-game', title: 'City Planner', type: 'simulation', description: 'Plan green building locations in cities', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'urban-q1', question: 'Why is building location important?', options: ['It affects transportation and energy use', 'Location doesn\'t matter', 'Only looks matter', 'Buildings should be far from transit'], correctAnswer: 0, explanation: 'Good locations reduce driving and enable sustainable transportation.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 29: Mass Timber Construction
export const massTimber: Module = {
  id: 'gb-mass-timber', slug: 'mass-timber-construction', title: 'Mass Timber Construction',
  description: { [LearningLevel.ELEMENTARY]: 'Build tall buildings with wood!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how wood can replace steel and concrete.', [LearningLevel.HIGH_SCHOOL]: 'Analyze CLT, glulam, and mass timber structural systems.', [LearningLevel.UNDERGRADUATE]: 'Evaluate mass timber design, fire safety, and code compliance.', [LearningLevel.GRADUATE]: 'Research mass timber carbon benefits and market transformation.', [LearningLevel.PHD]: 'Investigate mass timber performance, innovation, and sustainable forestry.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'timber-1', title: 'Wooden Towers', content: { [LearningLevel.ELEMENTARY]: '<h2>Tall Wooden Buildings!</h2><p>Engineers figured out how to build skyscrapers from wood. Trees store carbon!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Mass Timber</h2><p>CLT (cross-laminated timber) panels are strong enough for tall buildings.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Timber Systems</h2><p>CLT, glulam, NLT - different mass timber products for different applications.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Design Considerations</h2><p>Fire safety, connections, acoustics, and code requirements for mass timber.</p>', [LearningLevel.GRADUATE]: '<h2>Carbon Storage</h2><p>Wood sequesters carbon, offering climate benefits versus concrete and steel.</p>', [LearningLevel.PHD]: '<h2>Timber Research</h2><p>Fire performance, tall timber, and sustainable forest management.</p>' } }],
  activities: [{ id: 'timber-act-1', title: 'Timber Designer', type: 'SIMULATION', description: 'Design a mass timber building', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'timber-game', title: 'Timber Tower Builder', type: 'simulation', description: 'Build with mass timber', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'timber-q1', question: 'What is mass timber?', options: ['Large wooden panels for building', 'Regular 2x4 boards', 'A type of concrete', 'Steel beams'], correctAnswer: 0, explanation: 'Mass timber uses engineered wood panels strong enough for tall buildings.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 30: Building Energy Modeling
export const buildingEnergyModeling: Module = {
  id: 'gb-energy-modeling', slug: 'building-energy-modeling', title: 'Building Energy Modeling',
  description: { [LearningLevel.ELEMENTARY]: 'Computer programs help design efficient buildings!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how computers simulate building energy use.', [LearningLevel.HIGH_SCHOOL]: 'Analyze energy modeling software, inputs, and outputs.', [LearningLevel.UNDERGRADUATE]: 'Evaluate modeling methodology, calibration, and design optimization.', [LearningLevel.GRADUATE]: 'Research uncertainty analysis, parametric studies, and advanced modeling.', [LearningLevel.PHD]: 'Investigate model accuracy, calibration methods, and simulation research.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'modeling-1', title: 'Virtual Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Computer Building Design!</h2><p>Computers can test thousands of design options to find the most efficient building!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Energy Simulation</h2><p>Software predicts how much energy a building will use before it\'s built.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Modeling Basics</h2><p>Weather data, building geometry, systems, and schedules feed into simulations.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Modeling Practice</h2><p>EnergyPlus, OpenStudio, and other tools for energy analysis.</p>', [LearningLevel.GRADUATE]: '<h2>Advanced Modeling</h2><p>Parametric analysis, optimization algorithms, and uncertainty quantification.</p>', [LearningLevel.PHD]: '<h2>Modeling Research</h2><p>Model accuracy, calibration to measured data, and emerging capabilities.</p>' } }],
  activities: [{ id: 'modeling-act-1', title: 'Energy Modeler', type: 'SIMULATION', description: 'Run building energy simulations', estimatedMinutes: 30, interactiveContent: {} }],
  game: { id: 'modeling-game', title: 'Virtual Designer', type: 'simulation', description: 'Optimize buildings through simulation', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'modeling-q1', question: 'What does building energy modeling do?', options: ['Predicts how much energy a building will use', 'Builds actual buildings', 'Uses more energy', 'Nothing useful'], correctAnswer: 0, explanation: 'Energy modeling simulates building performance to optimize design.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 31: Regenerative Design
export const regenerativeDesign: Module = {
  id: 'gb-regenerative', slug: 'regenerative-design', title: 'Regenerative Design',
  description: { [LearningLevel.ELEMENTARY]: 'Buildings that help nature instead of hurting it!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover buildings that give back to the environment.', [LearningLevel.HIGH_SCHOOL]: 'Analyze regenerative design principles and Living Building Challenge.', [LearningLevel.UNDERGRADUATE]: 'Evaluate net positive design, ecosystem services, and restorative development.', [LearningLevel.GRADUATE]: 'Research regenerative frameworks, place-based design, and whole systems.', [LearningLevel.PHD]: 'Investigate regenerative theory, metrics, and transformation pathways.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'regen-1', title: 'Buildings That Give Back', content: { [LearningLevel.ELEMENTARY]: '<h2>Helpful Buildings!</h2><p>Some buildings clean water, create habitat, and give more than they take!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Beyond Green</h2><p>Regenerative buildings restore ecosystems instead of just reducing harm.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Living Building Challenge</h2><p>The most ambitious standard: net positive energy, water, and materials.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Net Positive</h2><p>Producing more energy, treating more water, and enhancing biodiversity.</p>', [LearningLevel.GRADUATE]: '<h2>Regenerative Frameworks</h2><p>Place-based design, story of place, and whole systems thinking.</p>', [LearningLevel.PHD]: '<h2>Regenerative Research</h2><p>Theory development, outcome measurement, and scaling approaches.</p>' } }],
  activities: [{ id: 'regen-act-1', title: 'Regenerative Designer', type: 'SIMULATION', description: 'Design a building that gives back', estimatedMinutes: 30, interactiveContent: {} }],
  game: { id: 'regen-game', title: 'Living Building Creator', type: 'simulation', description: 'Create regenerative buildings', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'regen-q1', question: 'What makes a building regenerative?', options: ['It gives back more than it takes', 'It only reduces harm', 'It uses fossil fuels', 'It ignores the environment'], correctAnswer: 0, explanation: 'Regenerative buildings have a positive impact on the environment.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 32: Green Building Careers
export const greenBuildingCareers: Module = {
  id: 'gb-careers', slug: 'green-building-careers', title: 'Green Building Careers',
  description: { [LearningLevel.ELEMENTARY]: 'Jobs that help build a greener world!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover careers in sustainable building.', [LearningLevel.HIGH_SCHOOL]: 'Explore professional paths in green building design and construction.', [LearningLevel.UNDERGRADUATE]: 'Analyze credentials, skills, and career development in sustainable building.', [LearningLevel.GRADUATE]: 'Research emerging roles, interdisciplinary skills, and leadership paths.', [LearningLevel.PHD]: 'Investigate workforce development, research careers, and industry transformation.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'careers-1', title: 'Green Building Jobs', content: { [LearningLevel.ELEMENTARY]: '<h2>Build a Green Future!</h2><p>Architects, engineers, and builders create sustainable buildings. You could too!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Career Options</h2><p>Sustainable architects, energy analysts, LEED consultants, and commissioning agents.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Education Paths</h2><p>Architecture, engineering, construction management, and sustainability programs.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Credentials</h2><p>LEED AP, Passive House, WELL AP, and other professional certifications.</p>', [LearningLevel.GRADUATE]: '<h2>Leadership Roles</h2><p>Sustainability directors, research scientists, and policy advocates.</p>', [LearningLevel.PHD]: '<h2>Academic Careers</h2><p>Research faculty, industry research, and thought leadership.</p>' } }],
  activities: [{ id: 'careers-act-1', title: 'Career Explorer', type: 'SIMULATION', description: 'Explore green building career paths', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'careers-game', title: 'Career Builder', type: 'simulation', description: 'Build your green building career', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'careers-q1', question: 'What is a green building career?', options: ['A job helping create sustainable buildings', 'Only painting buildings green', 'Regular construction', 'Nothing special'], correctAnswer: 0, explanation: 'Green building professionals design and build sustainable structures.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 33: Future of Green Building
export const greenBuildingFuture: Module = {
  id: 'gb-future', slug: 'green-building-future', title: 'Future of Green Building',
  description: { [LearningLevel.ELEMENTARY]: 'Imagine the amazing buildings of tomorrow!', [LearningLevel.MIDDLE_SCHOOL]: 'Explore future innovations in sustainable building.', [LearningLevel.HIGH_SCHOOL]: 'Analyze emerging technologies and trends in green building.', [LearningLevel.UNDERGRADUATE]: 'Evaluate industry trajectories, disruptions, and future scenarios.', [LearningLevel.GRADUATE]: 'Research transformation pathways and innovation systems.', [LearningLevel.PHD]: 'Investigate building sector decarbonization and systemic change.' },
  topic: 'green-building',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'future-1', title: 'Tomorrow\'s Buildings', content: { [LearningLevel.ELEMENTARY]: '<h2>Future Buildings!</h2><p>Buildings that grow, heal themselves, and work with nature - the future is exciting!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Emerging Tech</h2><p>3D printing, self-healing concrete, and smart materials are changing construction.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Innovation Trends</h2><p>Robotics, AI design, biomimicry, and circular construction.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Industry Change</h2><p>Digitalization, prefabrication, and decarbonization transforming construction.</p>', [LearningLevel.GRADUATE]: '<h2>Transformation</h2><p>Policy drivers, market forces, and pathways to sustainable building sector.</p>', [LearningLevel.PHD]: '<h2>Future Research</h2><p>Grand challenges, moonshots, and transformative research agenda.</p>' } }],
  activities: [{ id: 'future-act-1', title: 'Future Designer', type: 'SCENARIO', description: 'Envision the buildings of tomorrow', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'future-game', title: 'Future Architect', type: 'simulation', description: 'Design buildings of the future', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'future-q1', question: 'What might future buildings be like?', options: ['Self-healing, growing, and working with nature', 'Exactly the same as today', 'Using more fossil fuels', 'Less efficient'], correctAnswer: 0, explanation: 'Future buildings will use amazing new technologies and work with nature.', difficulty: LearningLevel.ELEMENTARY }] }
}

export const greenBuildingModules: Module[] = [
  // Standalone modules (4-33)
  energyEfficiency,
  greenRoofs,
  waterConservation,
  indoorAirQuality,
  daylighting,
  efficientHVAC,
  smartBuilding,
  windowsGlazing,
  geothermalSystems,
  buildingSolar,
  rainwaterHarvesting,
  biophilicDesign,
  greenCertifications,
  naturalBuilding,
  buildingRetrofits,
  netZeroBuildings,
  healthyBuilding,
  buildingAcoustics,
  sustainableLighting,
  resilientBuilding,
  adaptiveReuse,
  greenBuildingEconomics,
  embodiedCarbon,
  buildingCommissioning,
  urbanGreenBuildings,
  massTimber,
  buildingEnergyModeling,
  regenerativeDesign,
  greenBuildingCareers,
  greenBuildingFuture,
  // Inline modules (1-3)
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
