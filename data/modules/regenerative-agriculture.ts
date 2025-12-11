// Regenerative Agriculture Modules - Complete Content for All Learning Levels
import { Module, LearningLevel } from './index'

// Module 4: Cover Crops
export const coverCrops: Module = {
  id: 'regen-cover-crops', slug: 'cover-crops', title: 'Cover Crops',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about plants that protect the soil like a blanket!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how farmers grow plants just to help the soil.', [LearningLevel.HIGH_SCHOOL]: 'Explore cover crop species, benefits, and management strategies.', [LearningLevel.UNDERGRADUATE]: 'Analyze cover crop selection, termination methods, and system integration.', [LearningLevel.GRADUATE]: 'Examine cover crop impacts on soil health, nutrient cycling, and economics.', [LearningLevel.PHD]: 'Research cover crop breeding, microbiome interactions, and ecosystem services.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'cover-1', title: 'Soil Blankets', content: { [LearningLevel.ELEMENTARY]: '<h2>Plant Blankets!</h2><p>Cover crops are plants that cover the soil to protect it from sun, wind, and rain!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Cover Crop Benefits</h2><p>Prevent erosion, add organic matter, fix nitrogen, suppress weeds, provide habitat.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Cover Crop Types</h2><p>Grasses (rye, oats), legumes (clover, vetch), brassicas (radish, turnip). Choose based on goals.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Management</h2><p>Planting timing, seeding rates, species mixes, termination (tillage, crimping, herbicide, winterkill).</p>', [LearningLevel.GRADUATE]: '<h2>Systems Integration</h2><p>Cash crop effects, nutrient credits, water dynamics, pest/disease considerations.</p>', [LearningLevel.PHD]: '<h2>Research Frontiers</h2><p>Breeding for dual-purpose, root exudate chemistry, ecosystem service quantification.</p>' } }],
  activities: [{ id: 'cover-act-1', title: 'Cover Crop Selector', type: 'SIMULATION', description: 'Choose cover crops for your goals', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'cover-game', title: 'Cover Crop Farmer', type: 'simulation', description: 'Manage cover crops through the year', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'cover-q1', question: 'What do cover crops do?', options: ['Protect and feed the soil', 'Get harvested for food', 'Use up nutrients', 'Nothing useful'], correctAnswer: 0, explanation: 'Cover crops protect soil and add organic matter and nutrients.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 5: No-Till Farming
export const noTillFarming: Module = {
  id: 'regen-no-till', slug: 'no-till-farming', title: 'No-Till Farming',
  description: { [LearningLevel.ELEMENTARY]: 'Learn why not digging up soil can be good for farms!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how farmers grow crops without plowing.', [LearningLevel.HIGH_SCHOOL]: 'Explore no-till systems, equipment, and soil health benefits.', [LearningLevel.UNDERGRADUATE]: 'Analyze no-till transition, weed management, and soil biology.', [LearningLevel.GRADUATE]: 'Examine no-till economics, regional adaptation, and carbon implications.', [LearningLevel.PHD]: 'Research tillage effects on soil microbiome, carbon dynamics, and scaling.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'notill-1', title: 'Don\'t Dig It!', content: { [LearningLevel.ELEMENTARY]: '<h2>Leave the Soil Alone!</h2><p>Plowing breaks up the underground homes of helpful creatures. No-till farming leaves them in peace!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Why No-Till?</h2><p>Protects soil structure, saves fuel, reduces erosion, keeps carbon in ground, supports soil life.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>No-Till Systems</h2><p>Direct seeding into residue. Requires specialized planters, cover crops, different weed strategies.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Transition Challenges</h2><p>3-5 year soil adjustment, initial yield dip, equipment investment, weed management learning curve.</p>', [LearningLevel.GRADUATE]: '<h2>Regional Considerations</h2><p>Climate adaptation, soil type effects, organic vs conventional no-till, integration with other practices.</p>', [LearningLevel.PHD]: '<h2>Research Questions</h2><p>Stratification of nutrients, compaction management, N immobilization, long-term carbon sequestration.</p>' } }],
  activities: [{ id: 'notill-act-1', title: 'Tillage Comparison', type: 'SIMULATION', description: 'Compare tilled vs no-till fields', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'notill-game', title: 'No-Till Challenge', type: 'simulation', description: 'Farm without tilling', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'notill-q1', question: 'What does no-till farming avoid?', options: ['Plowing the soil', 'Planting seeds', 'Using water', 'Growing crops'], correctAnswer: 0, explanation: 'No-till farming plants seeds without plowing or disturbing the soil.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 6: Composting
export const composting: Module = {
  id: 'regen-composting', slug: 'composting', title: 'Composting',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how dead plants turn into super soil food!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover the science of decomposition and making compost.', [LearningLevel.HIGH_SCHOOL]: 'Explore composting methods, C:N ratios, and farm-scale systems.', [LearningLevel.UNDERGRADUATE]: 'Analyze compost chemistry, biology, and application strategies.', [LearningLevel.GRADUATE]: 'Examine commercial composting, regulations, and compost tea.', [LearningLevel.PHD]: 'Research compost microbiome, disease suppression, and soil amendment optimization.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'compost-1', title: 'Black Gold', content: { [LearningLevel.ELEMENTARY]: '<h2>Magic Transformation!</h2><p>Leaves, food scraps, and manure become dark, crumbly compost that plants love!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>How Composting Works</h2><p>Microbes break down organic matter. Need carbon (browns), nitrogen (greens), water, and air.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Composting Science</h2><p>C:N ratio of 25-30:1 ideal. Thermophilic (hot) phase kills pathogens. Curing stabilizes nutrients.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Compost Systems</h2><p>Windrows, static piles, in-vessel, vermicompost. Temperature monitoring, turning schedules, maturity testing.</p>', [LearningLevel.GRADUATE]: '<h2>Commercial Operations</h2><p>Feedstock sourcing, regulatory compliance, odor control, product markets, quality standards.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Pathogen reduction modeling, ARG fate, biochar-compost synergies, disease suppressive compost.</p>' } }],
  activities: [{ id: 'compost-act-1', title: 'Build a Compost Pile', type: 'STEP_GUIDED', description: 'Layer ingredients for compost', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'compost-game', title: 'Compost Chef', type: 'puzzle', description: 'Mix the perfect compost recipe', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'compost-q1', question: 'What do you need to make compost?', options: ['Browns, greens, water, and air', 'Just water', 'Only leaves', 'Chemicals'], correctAnswer: 0, explanation: 'Good compost needs carbon (browns), nitrogen (greens), moisture, and oxygen.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 7: Crop Rotation
export const cropRotation: Module = {
  id: 'regen-crop-rotation', slug: 'crop-rotation', title: 'Crop Rotation',
  description: { [LearningLevel.ELEMENTARY]: 'Learn why farmers plant different crops in different years!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how changing crops keeps soil and plants healthy.', [LearningLevel.HIGH_SCHOOL]: 'Explore rotation design, pest cycles, and nutrient management.', [LearningLevel.UNDERGRADUATE]: 'Analyze rotation economics, duration effects, and system optimization.', [LearningLevel.GRADUATE]: 'Examine complex rotations, cover crop integration, and modeling.', [LearningLevel.PHD]: 'Research rotation effects on microbiome, disease dynamics, and long-term productivity.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'rotation-1', title: 'Taking Turns', content: { [LearningLevel.ELEMENTARY]: '<h2>Plants Take Turns!</h2><p>Growing different crops each year keeps soil happy and pests confused!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Why Rotate Crops?</h2><p>Break pest/disease cycles, balance nutrients (legumes add N), improve soil structure, manage weeds.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Rotation Design</h2><p>Alternate families, deep vs shallow roots, high vs low residue, cash crops with cover crops.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Complex Rotations</h2><p>5-7 year rotations, enterprise integration, economic optimization, flexibility principles.</p>', [LearningLevel.GRADUATE]: '<h2>System Effects</h2><p>Long-term trial data, rotation legacy effects, soil health trajectories, modeling approaches.</p>', [LearningLevel.PHD]: '<h2>Research Frontiers</h2><p>Microbiome succession, allelopathy, cover crop placement, climate adaptation.</p>' } }],
  activities: [{ id: 'rotation-act-1', title: 'Design a Rotation', type: 'SIMULATION', description: 'Plan a multi-year rotation', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'rotation-game', title: 'Rotation Planner', type: 'puzzle', description: 'Create balanced crop rotations', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'rotation-q1', question: 'Why do farmers rotate crops?', options: ['To break pest cycles and balance nutrients', 'Because they\'re bored', 'To confuse neighbors', 'No reason'], correctAnswer: 0, explanation: 'Rotation breaks pest cycles, manages nutrients, and improves soil health.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 8: Agroforestry
export const agroforestry: Module = {
  id: 'regen-agroforestry', slug: 'agroforestry', title: 'Agroforestry',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how trees and crops can grow together like friends!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover farming systems that combine trees with crops or animals.', [LearningLevel.HIGH_SCHOOL]: 'Explore agroforestry types: alley cropping, silvopasture, forest farming.', [LearningLevel.UNDERGRADUATE]: 'Analyze agroforestry design, species selection, and economics.', [LearningLevel.GRADUATE]: 'Examine carbon sequestration, ecosystem services, and policy frameworks.', [LearningLevel.PHD]: 'Research tree-crop interactions, below-ground dynamics, and landscape integration.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'agrofor-1', title: 'Trees + Farms', content: { [LearningLevel.ELEMENTARY]: '<h2>Forest Farms!</h2><p>Trees give shade, food, and homes for birds while crops grow below!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Agroforestry Types</h2><p>Alley cropping (tree rows with crops), silvopasture (trees + grazing), forest farming (crops under trees).</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Benefits</h2><p>Diversified income, carbon storage, wildlife habitat, windbreaks, microclimate moderation.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Design Principles</h2><p>Species compatibility, spacing, light competition, root interactions, succession planning.</p>', [LearningLevel.GRADUATE]: '<h2>Carbon Accounting</h2><p>Above and belowground biomass, soil carbon, avoided emissions, permanence considerations.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Hydraulic redistribution, nutrient pumping, biodiversity metrics, landscape connectivity.</p>' } }],
  activities: [{ id: 'agrofor-act-1', title: 'Design Agroforestry', type: 'SIMULATION', description: 'Plan a tree-crop system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'agrofor-game', title: 'Forest Farmer', type: 'simulation', description: 'Manage trees and crops together', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'agrofor-q1', question: 'What is agroforestry?', options: ['Combining trees with crops or animals', 'Only growing trees', 'Removing all trees', 'Indoor farming'], correctAnswer: 0, explanation: 'Agroforestry integrates trees with crops and/or livestock.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 9: Silvopasture
export const silvopasture: Module = {
  id: 'regen-silvopasture', slug: 'silvopasture', title: 'Silvopasture',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how cows and trees can share the same land!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover grazing systems with trees for shade and food.', [LearningLevel.HIGH_SCHOOL]: 'Explore silvopasture design, tree species, and animal welfare benefits.', [LearningLevel.UNDERGRADUATE]: 'Analyze silvopasture economics, forage production, and establishment.', [LearningLevel.GRADUATE]: 'Examine carbon sequestration potential and climate resilience.', [LearningLevel.PHD]: 'Research tree-animal interactions, microclimate effects, and productivity optimization.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'silvo-1', title: 'Shady Pastures', content: { [LearningLevel.ELEMENTARY]: '<h2>Happy Animals!</h2><p>Cows love shade from trees on hot days, and trees get fertilizer from the cows!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Silvopasture Benefits</h2><p>Animal welfare, drought resilience, timber/fruit income, carbon storage, habitat.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>System Design</h2><p>Tree spacing, species selection, grazing management, tree protection from animals.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Establishment</h2><p>Existing woodlands vs new plantings, costs, timeline to productivity, grazing deferrals.</p>', [LearningLevel.GRADUATE]: '<h2>Climate Benefits</h2><p>High carbon sequestration (1-10 Mg C/ha/yr), methane considerations, adaptation co-benefits.</p>', [LearningLevel.PHD]: '<h2>Research Frontiers</h2><p>Thermal comfort quantification, below-ground carbon, optimal tree density, multi-species grazing.</p>' } }],
  activities: [{ id: 'silvo-act-1', title: 'Design Silvopasture', type: 'SIMULATION', description: 'Plan trees with grazing', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'silvo-game', title: 'Silvopasture Manager', type: 'simulation', description: 'Balance trees, grass, and animals', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'silvo-q1', question: 'What is silvopasture?', options: ['Trees combined with livestock grazing', 'Silver-colored fields', 'Indoor barns', 'Only fruit trees'], correctAnswer: 0, explanation: 'Silvopasture combines trees with livestock grazing on the same land.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 10: Holistic Grazing
export const holisticGrazing: Module = {
  id: 'regen-holistic-grazing', slug: 'holistic-grazing', title: 'Holistic Grazing',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how moving animals around helps grass grow better!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover planned grazing that mimics wild herds.', [LearningLevel.HIGH_SCHOOL]: 'Explore adaptive multi-paddock grazing, recovery periods, and land restoration.', [LearningLevel.UNDERGRADUATE]: 'Analyze grazing planning, monitoring, and ecosystem recovery.', [LearningLevel.GRADUATE]: 'Examine holistic management framework, land regeneration claims and evidence.', [LearningLevel.PHD]: 'Research grazing impacts on soil carbon, biodiversity, and landscape function.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'graze-1', title: 'Moving Herds', content: { [LearningLevel.ELEMENTARY]: '<h2>Follow the Herd!</h2><p>Moving animals often gives grass time to rest and regrow tall and strong!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Rotational Grazing</h2><p>Move animals frequently, give pastures recovery time, mimic natural herd movement.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Adaptive Management</h2><p>Stock density, recovery periods (30-90 days), monitoring plant response, adjusting plan.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Planning Tools</h2><p>Grazing charts, stocking rate calculations, carrying capacity, drought reserves.</p>', [LearningLevel.GRADUATE]: '<h2>Evidence Base</h2><p>Mixed research results, context dependency, management intensity effects, carbon claims.</p>', [LearningLevel.PHD]: '<h2>Research Questions</h2><p>Optimal rest periods, trampling effects, biodiversity responses, soil health indicators.</p>' } }],
  activities: [{ id: 'graze-act-1', title: 'Grazing Planner', type: 'SIMULATION', description: 'Plan paddock rotations', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'graze-game', title: 'Herd Manager', type: 'simulation', description: 'Move animals for healthy pastures', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'graze-q1', question: 'Why move grazing animals frequently?', options: ['To let grass recover and regrow', 'To confuse them', 'They like walking', 'No reason'], correctAnswer: 0, explanation: 'Moving animals lets pastures rest and regrow between grazing.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 11: Permaculture Design
export const permacultureDesign: Module = {
  id: 'regen-permaculture', slug: 'permaculture-design', title: 'Permaculture Design',
  description: { [LearningLevel.ELEMENTARY]: 'Learn to design gardens that work like nature!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover design principles for sustainable food systems.', [LearningLevel.HIGH_SCHOOL]: 'Explore permaculture ethics, principles, and design methodology.', [LearningLevel.UNDERGRADUATE]: 'Analyze whole-system design, zones, sectors, and pattern application.', [LearningLevel.GRADUATE]: 'Examine permaculture in professional design, critiques, and evidence.', [LearningLevel.PHD]: 'Research permaculture systems performance, scaling challenges, and integration.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'perma-1', title: 'Design Like Nature', content: { [LearningLevel.ELEMENTARY]: '<h2>Copy Nature!</h2><p>Permaculture designs gardens that work like forests - many plants helping each other!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Permaculture Ethics</h2><p>Earth care, people care, fair share. Design with nature, not against it.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Design Principles</h2><p>Observe and interact, catch and store energy, obtain a yield, apply self-regulation, value diversity.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Zone Planning</h2><p>Zone 0 (home) to Zone 5 (wild). Place elements by frequency of use and care needs.</p>', [LearningLevel.GRADUATE]: '<h2>Professional Application</h2><p>Site analysis, client goals, design documentation, implementation phasing.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Productivity comparisons, labor requirements, scaling limitations, hybrid approaches.</p>' } }],
  activities: [{ id: 'perma-act-1', title: 'Design a Permaculture Site', type: 'SIMULATION', description: 'Apply permaculture principles', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'perma-game', title: 'Permaculture Designer', type: 'puzzle', description: 'Create integrated designs', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'perma-q1', question: 'What are the permaculture ethics?', options: ['Earth care, people care, fair share', 'Make money fast', 'Use lots of chemicals', 'Ignore nature'], correctAnswer: 0, explanation: 'Permaculture is based on caring for earth, caring for people, and sharing fairly.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 12: Polycultures
export const polycultures: Module = {
  id: 'regen-polycultures', slug: 'polycultures', title: 'Polycultures',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how growing many plants together helps them all!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover the benefits of growing multiple crops together.', [LearningLevel.HIGH_SCHOOL]: 'Explore intercropping, companion planting, and guild design.', [LearningLevel.UNDERGRADUATE]: 'Analyze polyculture productivity, competition, and facilitation.', [LearningLevel.GRADUATE]: 'Examine commercial polycultures, mechanization, and market integration.', [LearningLevel.PHD]: 'Research polyculture optimization, ecological mechanisms, and breeding implications.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'poly-1', title: 'Plants as Friends', content: { [LearningLevel.ELEMENTARY]: '<h2>Plant Communities!</h2><p>Some plants help each other grow - like corn, beans, and squash (the Three Sisters)!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Companion Planting</h2><p>Plants can share nutrients, repel pests, attract pollinators, and provide support for each other.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Intercropping Types</h2><p>Strip intercropping, relay cropping, mixed intercropping. Land Equivalent Ratio (LER) measures efficiency.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Ecological Mechanisms</h2><p>Complementary resource use, facilitation, reduced pest pressure, enhanced pollination.</p>', [LearningLevel.GRADUATE]: '<h2>Commercial Systems</h2><p>Mechanical harvesting challenges, market complexity, risk reduction, insurance considerations.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Functional trait matching, below-ground interactions, breeding for polycultures, modeling.</p>' } }],
  activities: [{ id: 'poly-act-1', title: 'Design a Polyculture', type: 'SIMULATION', description: 'Combine compatible plants', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'poly-game', title: 'Polyculture Planner', type: 'puzzle', description: 'Match plants that help each other', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'poly-q1', question: 'What are the Three Sisters?', options: ['Corn, beans, and squash', 'Three farmers', 'Types of tractors', 'Soil layers'], correctAnswer: 0, explanation: 'The Three Sisters is a Native American polyculture of corn, beans, and squash.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 13: Integrated Pest Management
export const integratedPestManagement: Module = {
  id: 'regen-ipm', slug: 'integrated-pest-management', title: 'Integrated Pest Management',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how to manage pests without hurting nature!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover smart ways to control pests using nature\'s helpers.', [LearningLevel.HIGH_SCHOOL]: 'Explore IPM strategies: prevention, monitoring, and intervention thresholds.', [LearningLevel.UNDERGRADUATE]: 'Analyze biological control, cultural practices, and economic thresholds.', [LearningLevel.GRADUATE]: 'Examine landscape-level IPM, resistance management, and organic systems.', [LearningLevel.PHD]: 'Research ecological pest management, push-pull strategies, and gene drive implications.' },
  topic: 'regenerative-agriculture',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'ipm-1', title: 'Smart Pest Control', content: { [LearningLevel.ELEMENTARY]: '<h2>Nature\'s Pest Patrol!</h2><p>Ladybugs eat aphids, birds eat caterpillars - nature has its own pest control!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>IPM Pyramid</h2><p>Prevention first, then monitoring, biological control, cultural practices, and chemicals as last resort.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>IPM Components</h2><p>Pest identification, scouting, economic thresholds, beneficial insects, resistant varieties, targeted treatments.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Biological Control</h2><p>Conservation, augmentation, and classical biological control. Natural enemies, parasitoids, pathogens.</p>', [LearningLevel.GRADUATE]: '<h2>Systems Approach</h2><p>Habitat management, field borders, landscape composition, resistance evolution prevention.</p>', [LearningLevel.PHD]: '<h2>Research Frontiers</h2><p>RNAi pesticides, microbiome manipulation, precision application, climate change effects.</p>' } }],
  activities: [{ id: 'ipm-act-1', title: 'IPM Scout', type: 'SIMULATION', description: 'Monitor and manage pests', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'ipm-game', title: 'Pest Manager', type: 'simulation', description: 'Balance pest control naturally', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ipm-q1', question: 'What should be tried LAST in IPM?', options: ['Chemical pesticides', 'Prevention', 'Beneficial insects', 'Monitoring'], correctAnswer: 0, explanation: 'In IPM, chemical pesticides are a last resort after other methods.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 14: Beneficial Insects
export const beneficialInsects: Module = {
  id: 'regen-beneficial-insects', slug: 'beneficial-insects', title: 'Beneficial Insects',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about helpful bugs that protect gardens!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover insects that help farmers by eating pests and pollinating.', [LearningLevel.HIGH_SCHOOL]: 'Explore beneficial insect ecology, habitat, and conservation.', [LearningLevel.UNDERGRADUATE]: 'Analyze insectary establishment, augmentation strategies, and monitoring.', [LearningLevel.GRADUATE]: 'Examine landscape ecology of beneficials and on-farm management.', [LearningLevel.PHD]: 'Research pollinator-pest interactions, ecosystem services, and conservation biological control.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'bugs-1', title: 'Good Bugs', content: { [LearningLevel.ELEMENTARY]: '<h2>Bug Heroes!</h2><p>Ladybugs, lacewings, and bees are garden superheroes that help plants!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Beneficial Types</h2><p>Predators (ladybugs, spiders), parasitoids (wasps), pollinators (bees, butterflies), decomposers.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Habitat Needs</h2><p>Flower strips, hedgerows, overwintering sites, water, diverse plantings for year-round resources.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Conservation</h2><p>Reducing pesticides, providing habitat, augmentation releases, banker plants.</p>', [LearningLevel.GRADUATE]: '<h2>Landscape Effects</h2><p>Field margins, landscape complexity, source populations, spillover dynamics.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Ecosystem service quantification, trait-based approaches, climate effects on phenology.</p>' } }],
  activities: [{ id: 'bugs-act-1', title: 'Beneficial ID', type: 'PUZZLE', description: 'Identify helpful insects', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'bugs-game', title: 'Bug Sanctuary', type: 'simulation', description: 'Create habitat for beneficial insects', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'bugs-q1', question: 'Which insect eats aphids?', options: ['Ladybug', 'Mosquito', 'Fly', 'Ant'], correctAnswer: 0, explanation: 'Ladybugs eat hundreds of aphids and other pests.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 15: Organic Fertilizers
export const organicFertilizers: Module = {
  id: 'regen-organic-fert', slug: 'organic-fertilizers', title: 'Organic Fertilizers',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how plants get food from nature!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover natural ways to feed plants and soil.', [LearningLevel.HIGH_SCHOOL]: 'Explore organic nutrient sources, application, and soil biology.', [LearningLevel.UNDERGRADUATE]: 'Analyze nutrient release dynamics, timing, and system integration.', [LearningLevel.GRADUATE]: 'Examine organic fertility management, nutrient budgets, and regulations.', [LearningLevel.PHD]: 'Research mineralization kinetics, soil biology interactions, and circular systems.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'orgfert-1', title: 'Natural Plant Food', content: { [LearningLevel.ELEMENTARY]: '<h2>Nature\'s Vitamins!</h2><p>Compost, manure, and bone meal give plants the nutrients they need to grow strong!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Organic Sources</h2><p>Compost, manures, green manures, bone meal, blood meal, kelp, rock phosphate.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Nutrient Release</h2><p>Slow release as microbes break down organic matter. Timing, temperature, and moisture matter.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Fertility Planning</h2><p>Soil testing, nutrient budgets, source selection, application rates and timing.</p>', [LearningLevel.GRADUATE]: '<h2>System Integration</h2><p>Cover crop nitrogen, manure management, nutrient cycling, regulatory compliance.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>C:N ratio effects, priming, micronutrient availability, circular economy approaches.</p>' } }],
  activities: [{ id: 'orgfert-act-1', title: 'Fertilizer Selector', type: 'SIMULATION', description: 'Choose organic fertilizers', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'orgfert-game', title: 'Nutrient Manager', type: 'puzzle', description: 'Feed plants naturally', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'orgfert-q1', question: 'What is an organic fertilizer?', options: ['Compost from plants and animals', 'Synthetic chemicals', 'Plastic pellets', 'Just water'], correctAnswer: 0, explanation: 'Organic fertilizers come from natural plant and animal sources.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 16: Biochar
export const biochar: Module = {
  id: 'regen-biochar', slug: 'biochar', title: 'Biochar',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how charcoal can help soil!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover biochar - ancient soil magic for modern farms.', [LearningLevel.HIGH_SCHOOL]: 'Explore biochar production, properties, and soil applications.', [LearningLevel.UNDERGRADUATE]: 'Analyze biochar effects on soil properties, nutrients, and carbon storage.', [LearningLevel.GRADUATE]: 'Examine biochar economics, lifecycle assessment, and carbon markets.', [LearningLevel.PHD]: 'Research biochar-microbiome interactions, aging, and mechanism elucidation.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'biochar-1', title: 'Super Charcoal', content: { [LearningLevel.ELEMENTARY]: '<h2>Magic Black Stuff!</h2><p>Biochar is like charcoal that helps soil hold water and nutrients!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>What is Biochar?</h2><p>Charcoal made for soil. Holds water, nutrients, and microbe homes. Lasts hundreds of years.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Production</h2><p>Pyrolysis (heating without oxygen). Feedstock affects properties. Terra preta inspiration.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Soil Effects</h2><p>CEC increase, water retention, pH buffering, microbial habitat, nutrient retention.</p>', [LearningLevel.GRADUATE]: '<h2>Carbon Storage</h2><p>Stable carbon form, MRV challenges, lifecycle emissions, co-product value.</p>', [LearningLevel.PHD]: '<h2>Research Frontiers</h2><p>Designer biochar, functionalization, aging effects, context-specific responses.</p>' } }],
  activities: [{ id: 'biochar-act-1', title: 'Biochar Application', type: 'SIMULATION', description: 'Apply biochar to soil', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'biochar-game', title: 'Biochar Maker', type: 'simulation', description: 'Produce and apply biochar', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'biochar-q1', question: 'What does biochar do for soil?', options: ['Holds water and nutrients', 'Makes it dry', 'Kills plants', 'Nothing'], correctAnswer: 0, explanation: 'Biochar helps soil hold water and nutrients for plants.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 17: Keyline Design
export const keylineDesign: Module = {
  id: 'regen-keyline', slug: 'keyline-design', title: 'Keyline Design',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how farmers follow hills to save water!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how landforms guide water management.', [LearningLevel.HIGH_SCHOOL]: 'Explore keyline principles for water distribution and soil building.', [LearningLevel.UNDERGRADUATE]: 'Analyze keyline surveying, plow patterns, and landscape hydrology.', [LearningLevel.GRADUATE]: 'Examine keyline integration with other practices and economic analysis.', [LearningLevel.PHD]: 'Research landscape-scale water management and soil development.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'key-1', title: 'Following the Land', content: { [LearningLevel.ELEMENTARY]: '<h2>Water Paths!</h2><p>Keyline design helps water spread across fields instead of running away!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Keyline Basics</h2><p>Find key points on ridges, plow parallel lines to spread water from valleys to ridges.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Keyline System</h2><p>Key point, keyline, parallel cultivation, tree lines, dams. Water harvesting and distribution.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Implementation</h2><p>Surveying methods, plow design, cultivation patterns, integration with grazing.</p>', [LearningLevel.GRADUATE]: '<h2>Landscape Effects</h2><p>Soil building rates, water infiltration, drought resilience, carbon sequestration.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Hydrological modeling, soil formation rates, scaling principles, economic returns.</p>' } }],
  activities: [{ id: 'key-act-1', title: 'Map Keylines', type: 'SIMULATION', description: 'Find keylines on a landscape', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'key-game', title: 'Keyline Planner', type: 'puzzle', description: 'Design keyline water systems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'key-q1', question: 'What does keyline design help with?', options: ['Spreading water across land', 'Removing water', 'Building roads', 'Nothing'], correctAnswer: 0, explanation: 'Keyline design helps distribute water across the landscape.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 18: Seed Saving
export const seedSaving: Module = {
  id: 'regen-seed-saving', slug: 'seed-saving', title: 'Seed Saving',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how to save seeds from your plants!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover the art of collecting and storing seeds.', [LearningLevel.HIGH_SCHOOL]: 'Explore seed biology, isolation, and selection techniques.', [LearningLevel.UNDERGRADUATE]: 'Analyze genetic diversity, population genetics, and seed system design.', [LearningLevel.GRADUATE]: 'Examine participatory plant breeding and seed sovereignty.', [LearningLevel.PHD]: 'Research genetic erosion, in-situ conservation, and farmer-led innovation.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'seed-1', title: 'Saving Seeds', content: { [LearningLevel.ELEMENTARY]: '<h2>Seeds for Next Year!</h2><p>Plants make seeds that grow into new plants - save them to grow more!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Seed Basics</h2><p>Let fruits ripen, collect seeds, dry them, store cool and dry. Open-pollinated vs hybrid.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Selection & Isolation</h2><p>Choose best plants, maintain isolation distances to prevent crossing, population size for diversity.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Genetic Considerations</h2><p>Inbreeding depression, outcrossing, selection pressure, founder effects, population size.</p>', [LearningLevel.GRADUATE]: '<h2>Seed Systems</h2><p>Formal vs informal, seed sovereignty, community seed banks, participatory breeding.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Genetic diversity assessment, adaptation to local conditions, climate resilience breeding.</p>' } }],
  activities: [{ id: 'seed-act-1', title: 'Save Seeds', type: 'STEP_GUIDED', description: 'Collect and store seeds', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'seed-game', title: 'Seed Keeper', type: 'simulation', description: 'Build a seed collection', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'seed-q1', question: 'Why save seeds?', options: ['To plant next year', 'To throw away', 'To eat only', 'No reason'], correctAnswer: 0, explanation: 'Saving seeds lets you plant crops year after year.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 19: Heritage Breeds
export const heritageBreeds: Module = {
  id: 'regen-heritage-breeds', slug: 'heritage-breeds', title: 'Heritage Breeds',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about special old animal breeds!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover heritage livestock and why they matter.', [LearningLevel.HIGH_SCHOOL]: 'Explore breed conservation, traits, and agricultural importance.', [LearningLevel.UNDERGRADUATE]: 'Analyze genetic diversity, conservation breeding, and market development.', [LearningLevel.GRADUATE]: 'Examine breed conservation policy, genetic resource management.', [LearningLevel.PHD]: 'Research conservation genetics, adaptation traits, and climate resilience.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'heritage-1', title: 'Old Breeds', content: { [LearningLevel.ELEMENTARY]: '<h2>Special Animals!</h2><p>Heritage breeds are old types of farm animals that our grandparents raised!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Why Heritage?</h2><p>Unique traits, hardiness, flavor, genetic diversity, cultural heritage. Many are endangered.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Conservation</h2><p>Breed characteristics, registry systems, conservation priority, niche markets, pasture-based systems.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Genetics</h2><p>Effective population size, inbreeding, outcrossing, trait selection, breed standards.</p>', [LearningLevel.GRADUATE]: '<h2>Policy & Markets</h2><p>Conservation funding, slow food movement, direct marketing, farm-to-table.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Genomic characterization, adaptive traits, functional diversity, climate resilience potential.</p>' } }],
  activities: [{ id: 'heritage-act-1', title: 'Breed Explorer', type: 'PUZZLE', description: 'Learn heritage breeds', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'heritage-game', title: 'Heritage Farmer', type: 'simulation', description: 'Raise heritage animals', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'heritage-q1', question: 'What are heritage breeds?', options: ['Traditional animal breeds', 'Wild animals', 'New inventions', 'Robots'], correctAnswer: 0, explanation: 'Heritage breeds are traditional livestock developed over generations.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 20: Carbon Farming
export const carbonFarming: Module = {
  id: 'regen-carbon-farming', slug: 'carbon-farming', title: 'Carbon Farming',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how farms can capture carbon like trees!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how farming practices store carbon in soil.', [LearningLevel.HIGH_SCHOOL]: 'Explore carbon sequestration practices, measurement, and markets.', [LearningLevel.UNDERGRADUATE]: 'Analyze carbon farming protocols, MRV, and economic incentives.', [LearningLevel.GRADUATE]: 'Examine carbon credit markets, additionality, and permanence.', [LearningLevel.PHD]: 'Research soil carbon dynamics, verification methods, and policy design.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'carbon-1', title: 'Storing Carbon', content: { [LearningLevel.ELEMENTARY]: '<h2>Carbon Catchers!</h2><p>Plants grab carbon from the air and put it in the soil where it helps things grow!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>How It Works</h2><p>Photosynthesis captures CO2, roots deposit carbon in soil. Practices: cover crops, no-till, trees.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Carbon Markets</h2><p>Farmers can sell carbon credits. Requires measurement, verification, permanence.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Protocols</h2><p>Verra, Gold Standard, ACR. Baseline, additionality, leakage, permanence requirements.</p>', [LearningLevel.GRADUATE]: '<h2>Market Issues</h2><p>Crediting periods, reversal buffers, stacking, methodology evolution, buyer requirements.</p>', [LearningLevel.PHD]: '<h2>Research Questions</h2><p>Detection of change, uncertainty quantification, remote sensing verification, modeling approaches.</p>' } }],
  activities: [{ id: 'carbon-act-1', title: 'Carbon Calculator', type: 'SIMULATION', description: 'Calculate farm carbon storage', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'carbon-game', title: 'Carbon Farmer', type: 'simulation', description: 'Maximize carbon storage', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'carbon-q1', question: 'How do plants capture carbon?', options: ['Through photosynthesis', 'From fertilizer', 'From water', 'They don\'t'], correctAnswer: 0, explanation: 'Plants capture CO2 from air through photosynthesis.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 21: Soil Testing
export const soilTesting: Module = {
  id: 'regen-soil-testing', slug: 'soil-testing', title: 'Soil Testing',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how scientists check if soil is healthy!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how to test soil for nutrients and health.', [LearningLevel.HIGH_SCHOOL]: 'Explore soil test interpretation and management decisions.', [LearningLevel.UNDERGRADUATE]: 'Analyze soil testing methods, labs, and recommendations.', [LearningLevel.GRADUATE]: 'Examine advanced soil health indicators and precision agriculture.', [LearningLevel.PHD]: 'Research novel soil health metrics and rapid assessment tools.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'test-1', title: 'Testing Soil', content: { [LearningLevel.ELEMENTARY]: '<h2>Soil Check-Up!</h2><p>Just like going to the doctor, soil needs check-ups to see if it\'s healthy!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>What Tests Show</h2><p>pH, nutrients (N, P, K), organic matter, texture. Helps decide what soil needs.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Testing Types</h2><p>Standard fertility, soil health (HANEY, Solvita), biological assessments, micronutrients.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Interpretation</h2><p>Understanding results, regional calibrations, economic thresholds, recommendation systems.</p>', [LearningLevel.GRADUATE]: '<h2>Advanced Metrics</h2><p>Soil protein, respiration, aggregate stability, infiltration, biologicalindicators.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Spectroscopic methods, in-field sensors, eDNA, health index development.</p>' } }],
  activities: [{ id: 'test-act-1', title: 'Soil Sampling', type: 'STEP_GUIDED', description: 'Collect and interpret soil tests', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'test-game', title: 'Soil Detective', type: 'puzzle', description: 'Diagnose soil problems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'test-q1', question: 'Why test soil?', options: ['To know what it needs', 'Just for fun', 'To make it dirty', 'No reason'], correctAnswer: 0, explanation: 'Soil tests tell us what nutrients the soil needs.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 22: Nitrogen Fixation
export const nitrogenFixation: Module = {
  id: 'regen-nitrogen-fix', slug: 'nitrogen-fixation', title: 'Nitrogen Fixation',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how special plants make their own fertilizer!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how legumes and bacteria create nitrogen.', [LearningLevel.HIGH_SCHOOL]: 'Explore biological nitrogen fixation and legume management.', [LearningLevel.UNDERGRADUATE]: 'Analyze N fixation rates, inoculants, and system integration.', [LearningLevel.GRADUATE]: 'Examine N credits, measurement methods, and cropping systems.', [LearningLevel.PHD]: 'Research symbiotic efficiency, free-living fixers, and genetic improvement.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'nfix-1', title: 'Free Fertilizer', content: { [LearningLevel.ELEMENTARY]: '<h2>Plant Partnerships!</h2><p>Peas, beans, and clovers team up with tiny bacteria to make their own fertilizer!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>How It Works</h2><p>Rhizobia bacteria live in root nodules. They turn air nitrogen into plant food. Legumes give bacteria sugars.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Managing Legumes</h2><p>Inoculation, variety selection, rotational placement, estimating N contribution to following crops.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Fixation Rates</h2><p>50-300 kg N/ha depending on species, conditions. Measuring with isotopes or difference methods.</p>', [LearningLevel.GRADUATE]: '<h2>Systems Integration</h2><p>Cover crop N, pasture renovation, intercrops, timing of incorporation, N credits.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Engineering fixation in non-legumes, improving efficiency, free-living fixers, climate effects.</p>' } }],
  activities: [{ id: 'nfix-act-1', title: 'Nodule Hunter', type: 'SIMULATION', description: 'Find nitrogen-fixing nodules', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'nfix-game', title: 'Nitrogen Farmer', type: 'simulation', description: 'Grow nitrogen for your farm', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'nfix-q1', question: 'Which plants fix nitrogen?', options: ['Beans and peas (legumes)', 'Corn and wheat', 'Tomatoes', 'Carrots'], correctAnswer: 0, explanation: 'Legumes like beans and peas partner with bacteria to fix nitrogen.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 23: Mulching
export const mulching: Module = {
  id: 'regen-mulching', slug: 'mulching', title: 'Mulching',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how to tuck soil in with a blanket!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how mulch protects soil and saves water.', [LearningLevel.HIGH_SCHOOL]: 'Explore mulch types, application, and effects on soil.', [LearningLevel.UNDERGRADUATE]: 'Analyze mulching in different systems and economic returns.', [LearningLevel.GRADUATE]: 'Examine mulch decomposition, nutrient dynamics, and weed suppression.', [LearningLevel.PHD]: 'Research mulch effects on soil biology, microclimate, and carbon.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 25, [LearningLevel.HIGH_SCHOOL]: 40, [LearningLevel.UNDERGRADUATE]: 55, [LearningLevel.GRADUATE]: 75, [LearningLevel.PHD]: 100 },
  lessons: [{ id: 'mulch-1', title: 'Soil Blankets', content: { [LearningLevel.ELEMENTARY]: '<h2>Cozy Soil!</h2><p>Mulch is like a blanket for soil - it keeps it cool in summer and warm in winter!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Mulch Benefits</h2><p>Keeps moisture in, stops weeds, adds organic matter, protects from erosion, moderates temperature.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Mulch Types</h2><p>Organic (straw, wood chips, leaves), living (cover crops), synthetic. Depth and timing matter.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>System Integration</h2><p>No-till, perennials, tree crops, vegetable production, economic analysis.</p>', [LearningLevel.GRADUATE]: '<h2>Decomposition</h2><p>C:N effects, nutrient immobilization, allelopathy, soil biology changes.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Microclimate modification, soil fauna, long-term soil carbon, regional appropriateness.</p>' } }],
  activities: [{ id: 'mulch-act-1', title: 'Mulch Application', type: 'STEP_GUIDED', description: 'Apply mulch properly', estimatedMinutes: 15, interactiveContent: {} }],
  game: { id: 'mulch-game', title: 'Mulch Master', type: 'puzzle', description: 'Choose the right mulch', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'mulch-q1', question: 'What does mulch do?', options: ['Protects soil and saves water', 'Makes soil dry', 'Hurts plants', 'Nothing'], correctAnswer: 0, explanation: 'Mulch protects soil and helps it retain moisture.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 24: Hedgerows & Windbreaks
export const hedgerowsWindbreaks: Module = {
  id: 'regen-hedgerows', slug: 'hedgerows-windbreaks', title: 'Hedgerows & Windbreaks',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how rows of trees protect farms!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how hedgerows and windbreaks help farms and wildlife.', [LearningLevel.HIGH_SCHOOL]: 'Explore windbreak design, species selection, and ecosystem benefits.', [LearningLevel.UNDERGRADUATE]: 'Analyze windbreak effects on microclimate, yield, and biodiversity.', [LearningLevel.GRADUATE]: 'Examine landscape-level hedgerow networks and ecosystem services.', [LearningLevel.PHD]: 'Research connectivity, habitat corridors, and climate adaptation.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'hedge-1', title: 'Living Fences', content: { [LearningLevel.ELEMENTARY]: '<h2>Tree Walls!</h2><p>Rows of trees and bushes protect crops from wind and give homes to birds!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Windbreak Benefits</h2><p>Reduce wind speed, prevent erosion, wildlife habitat, snow management, microclimate.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Design Principles</h2><p>Height, density, orientation, species mix, porosity. Protection extends 10-20x height downwind.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Ecosystem Services</h2><p>Carbon storage, pest control, pollinator habitat, water quality, aesthetic value.</p>', [LearningLevel.GRADUATE]: '<h2>Landscape Planning</h2><p>Network connectivity, habitat corridors, landscape ecology, policy incentives.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Microclimate modeling, biodiversity assessment, carbon accounting, economic valuation.</p>' } }],
  activities: [{ id: 'hedge-act-1', title: 'Design a Windbreak', type: 'SIMULATION', description: 'Plan hedgerow placement', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'hedge-game', title: 'Windbreak Designer', type: 'puzzle', description: 'Create effective windbreaks', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'hedge-q1', question: 'What do windbreaks do?', options: ['Protect crops from wind', 'Speed up wind', 'Remove trees', 'Nothing'], correctAnswer: 0, explanation: 'Windbreaks slow wind and protect crops.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 25: Farm Biodiversity
export const farmBiodiversity: Module = {
  id: 'regen-biodiversity', slug: 'farm-biodiversity', title: 'Farm Biodiversity',
  description: { [LearningLevel.ELEMENTARY]: 'Learn why farms need many different plants and animals!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how biodiversity makes farms healthier and more productive.', [LearningLevel.HIGH_SCHOOL]: 'Explore on-farm biodiversity management and ecosystem services.', [LearningLevel.UNDERGRADUATE]: 'Analyze agrobiodiversity assessment, conservation, and functional diversity.', [LearningLevel.GRADUATE]: 'Examine biodiversity-ecosystem function relationships in agriculture.', [LearningLevel.PHD]: 'Research biodiversity metrics, landscape genetics, and conservation strategies.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'bio-1', title: 'Variety is Life', content: { [LearningLevel.ELEMENTARY]: '<h2>Nature\'s Team!</h2><p>Farms with many different plants and animals are healthier and grow better food!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Why Biodiversity?</h2><p>Pest control, pollination, resilience, soil health, beauty. Monocultures are vulnerable.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Types of Diversity</h2><p>Genetic, species, ecosystem. Planned vs associated biodiversity. Wild vs cultivated.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Functional Diversity</h2><p>Traits that provide services: pollinators, predators, decomposers, nitrogen fixers.</p>', [LearningLevel.GRADUATE]: '<h2>Assessment</h2><p>Biodiversity indices, monitoring protocols, indicators, response to management.</p>', [LearningLevel.PHD]: '<h2>Research Frontiers</h2><p>eDNA, landscape genetics, trait-based ecology, BEF relationships.</p>' } }],
  activities: [{ id: 'bio-act-1', title: 'Biodiversity Survey', type: 'SIMULATION', description: 'Assess farm biodiversity', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'bio-game', title: 'Diversity Builder', type: 'simulation', description: 'Increase farm biodiversity', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'bio-q1', question: 'Why is biodiversity good for farms?', options: ['Healthier farms and pest control', 'Makes farming harder', 'No benefit', 'Only looks nice'], correctAnswer: 0, explanation: 'Biodiversity provides pest control, pollination, and resilience.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 26: Local Food Systems
export const localFoodSystems: Module = {
  id: 'regen-local-food', slug: 'local-food-systems', title: 'Local Food Systems',
  description: { [LearningLevel.ELEMENTARY]: 'Learn why eating local food helps farmers and the planet!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how local food connects farmers and communities.', [LearningLevel.HIGH_SCHOOL]: 'Explore local food economics, marketing, and sustainability.', [LearningLevel.UNDERGRADUATE]: 'Analyze food system localization, supply chains, and food security.', [LearningLevel.GRADUATE]: 'Examine food sovereignty, alternative food networks, and policy.', [LearningLevel.PHD]: 'Research food system transformation, metrics, and just transitions.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'local-1', title: 'Food from Nearby', content: { [LearningLevel.ELEMENTARY]: '<h2>Know Your Farmer!</h2><p>Food from nearby farms is fresher and helps farmers in your community!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Local Food Benefits</h2><p>Fresher food, less transport pollution, supports local economy, seasonal eating, connection.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Direct Marketing</h2><p>Farmers markets, CSA, farm stands, restaurants, institutions. Building relationships.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Food Systems Analysis</h2><p>Supply chains, food miles, embedded energy, regional food assessments, food hubs.</p>', [LearningLevel.GRADUATE]: '<h2>Policy & Planning</h2><p>Food policy councils, procurement policy, land use, food access, infrastructure.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Food system resilience, equity analysis, scaling strategies, transformation pathways.</p>' } }],
  activities: [{ id: 'local-act-1', title: 'Map Local Food', type: 'SIMULATION', description: 'Find local food sources', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'local-game', title: 'Local Food Builder', type: 'simulation', description: 'Build local food connections', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'local-q1', question: 'Why buy local food?', options: ['Supports farmers and is fresher', 'More expensive always', 'Worse quality', 'No reason'], correctAnswer: 0, explanation: 'Local food supports farmers and is often fresher.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 27: Regenerative Ranching
export const regenerativeRanching: Module = {
  id: 'regen-ranching', slug: 'regenerative-ranching', title: 'Regenerative Ranching',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how cattle can help grasslands!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how well-managed grazing improves land.', [LearningLevel.HIGH_SCHOOL]: 'Explore regenerative grazing systems and rangeland ecology.', [LearningLevel.UNDERGRADUATE]: 'Analyze stocking rates, grazing management, and ecosystem recovery.', [LearningLevel.GRADUATE]: 'Examine landscape-scale ranching, economics, and climate implications.', [LearningLevel.PHD]: 'Research grazing-carbon-biodiversity interactions and evidence synthesis.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'ranch-1', title: 'Cattle as Tools', content: { [LearningLevel.ELEMENTARY]: '<h2>Helpful Herds!</h2><p>Cows can help grasslands grow better when moved around properly!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Regenerative Grazing</h2><p>High density, short duration, long recovery. Mimics wild herds. Builds soil.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Rangeland Management</h2><p>Carrying capacity, stocking rate, rest periods, plant succession, water development.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Systems Approach</h2><p>Adaptive management, monitoring, planning, economics, marketing premiums.</p>', [LearningLevel.GRADUATE]: '<h2>Landscape Scale</h2><p>Large ranch management, ecosystem services, carbon programs, biodiversity.</p>', [LearningLevel.PHD]: '<h2>Research Questions</h2><p>Carbon sequestration rates, methane balance, biodiversity outcomes, scaling evidence.</p>' } }],
  activities: [{ id: 'ranch-act-1', title: 'Ranch Manager', type: 'SIMULATION', description: 'Manage a regenerative ranch', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'ranch-game', title: 'Regenerative Rancher', type: 'simulation', description: 'Build healthy rangelands', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ranch-q1', question: 'How can cattle help grasslands?', options: ['Through managed grazing with rest', 'By never moving', 'Overgrazing', 'Staying in barns'], correctAnswer: 0, explanation: 'Managed grazing with rest periods helps grasslands recover and thrive.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 28: Perennial Grains
export const perennialGrains: Module = {
  id: 'regen-perennial-grains', slug: 'perennial-grains', title: 'Perennial Grains',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about grain plants that grow back every year!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover crops that don\'t need replanting annually.', [LearningLevel.HIGH_SCHOOL]: 'Explore perennial crop development and agricultural benefits.', [LearningLevel.UNDERGRADUATE]: 'Analyze perennial grain breeding, agronomy, and systems.', [LearningLevel.GRADUATE]: 'Examine ecosystem services, adoption barriers, and commercialization.', [LearningLevel.PHD]: 'Research perennial polycultures, breeding approaches, and transformation potential.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'peren-1', title: 'Crops That Stay', content: { [LearningLevel.ELEMENTARY]: '<h2>Plants That Come Back!</h2><p>Imagine grain plants that grow back every year without replanting!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Why Perennials?</h2><p>No tillage needed, deep roots, erosion control, carbon storage, reduced inputs.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Current Crops</h2><p>Kernza (perennial wheat relative), perennial rice, perennial sorghum. Under development.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Breeding Approaches</h2><p>Domestication of wild perennials, perennialization of annuals, wide hybridization.</p>', [LearningLevel.GRADUATE]: '<h2>System Design</h2><p>Stand longevity, management, markets, policy support, transition strategies.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Yield-longevity tradeoffs, resource allocation, polycultures, landscape integration.</p>' } }],
  activities: [{ id: 'peren-act-1', title: 'Perennial Farm Design', type: 'SIMULATION', description: 'Plan with perennial grains', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'peren-game', title: 'Perennial Planner', type: 'simulation', description: 'Grow perennial grain systems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'peren-q1', question: 'What makes perennial grains special?', options: ['They grow back each year', 'They die after one year', 'They need more plowing', 'Nothing'], correctAnswer: 0, explanation: 'Perennial grains regrow each year without replanting.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 29: Urban Regenerative Agriculture
export const urbanRegenAg: Module = {
  id: 'regen-urban', slug: 'urban-regenerative-ag', title: 'Urban Regenerative Agriculture',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how to grow food in cities!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover urban farming and city food production.', [LearningLevel.HIGH_SCHOOL]: 'Explore urban agriculture systems, challenges, and benefits.', [LearningLevel.UNDERGRADUATE]: 'Analyze urban farm economics, policy, and community development.', [LearningLevel.GRADUATE]: 'Examine urban food systems, land access, and social equity.', [LearningLevel.PHD]: 'Research urban agroecology, ecosystem services, and food justice.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'urban-1', title: 'City Farms', content: { [LearningLevel.ELEMENTARY]: '<h2>Growing in Cities!</h2><p>You can grow food anywhere - rooftops, vacant lots, backyards, even indoors!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Urban Ag Types</h2><p>Community gardens, rooftop farms, vertical farms, backyard gardens, school gardens.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Challenges & Solutions</h2><p>Space, soil contamination, water access, zoning. Raised beds, soil testing, policy change.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Economics</h2><p>High-value crops, direct marketing, grants, enterprise models, land tenure.</p>', [LearningLevel.GRADUATE]: '<h2>Social Dimensions</h2><p>Food access, gentrification, community building, workforce development, equity.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Urban soil remediation, ecosystem services in cities, food justice frameworks.</p>' } }],
  activities: [{ id: 'urban-act-1', title: 'Urban Farm Design', type: 'SIMULATION', description: 'Plan an urban farm', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'urban-game', title: 'City Farmer', type: 'simulation', description: 'Grow food in the city', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'urban-q1', question: 'Where can you farm in cities?', options: ['Rooftops, lots, backyards', 'Nowhere', 'Only underground', 'Only in parks'], correctAnswer: 0, explanation: 'Urban farming happens on rooftops, vacant lots, backyards, and more.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 30: Climate-Resilient Farming
export const climateResilientFarming: Module = {
  id: 'regen-climate-resilient', slug: 'climate-resilient-farming', title: 'Climate-Resilient Farming',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how farms can handle wild weather!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover farming practices that survive floods, droughts, and storms.', [LearningLevel.HIGH_SCHOOL]: 'Explore climate adaptation strategies for agriculture.', [LearningLevel.UNDERGRADUATE]: 'Analyze climate risk assessment and adaptation planning.', [LearningLevel.GRADUATE]: 'Examine climate-smart agriculture, policy frameworks, and transformation.', [LearningLevel.PHD]: 'Research adaptation pathways, tipping points, and system transformation.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'climate-1', title: 'Weather-Ready Farms', content: { [LearningLevel.ELEMENTARY]: '<h2>Strong Farms!</h2><p>Healthy soil and diverse plants help farms survive droughts, floods, and heat!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Building Resilience</h2><p>Soil organic matter holds water, diversity spreads risk, perennials survive extremes.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Adaptation Strategies</h2><p>Drought-tolerant varieties, water harvesting, diversification, insurance, timing shifts.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Risk Assessment</h2><p>Climate projections, vulnerability analysis, scenario planning, decision support tools.</p>', [LearningLevel.GRADUATE]: '<h2>Climate-Smart Ag</h2><p>Triple wins: productivity, adaptation, mitigation. Policy integration, finance mechanisms.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Transformation pathways, maladaptation risks, limits to adaptation, equity dimensions.</p>' } }],
  activities: [{ id: 'climate-act-1', title: 'Climate Plan', type: 'SCENARIO', description: 'Plan for climate challenges', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'climate-game', title: 'Climate Farmer', type: 'simulation', description: 'Build a resilient farm', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'climate-q1', question: 'How does healthy soil help in drought?', options: ['Holds more water', 'Holds less water', 'Makes it hotter', 'No effect'], correctAnswer: 0, explanation: 'Healthy soil with organic matter holds more water for plants during drought.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 31: Regenerative Certification
export const regenCertification: Module = {
  id: 'regen-certification', slug: 'regenerative-certification', title: 'Regenerative Certification',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about special labels for earth-friendly farms!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how farms prove they help the environment.', [LearningLevel.HIGH_SCHOOL]: 'Explore certification programs, standards, and verification.', [LearningLevel.UNDERGRADUATE]: 'Analyze certification scheme design, market development, and impacts.', [LearningLevel.GRADUATE]: 'Examine certification governance, chain of custody, and effectiveness.', [LearningLevel.PHD]: 'Research certification impacts, standard-setting, and market transformation.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 15, [LearningLevel.MIDDLE_SCHOOL]: 25, [LearningLevel.HIGH_SCHOOL]: 40, [LearningLevel.UNDERGRADUATE]: 55, [LearningLevel.GRADUATE]: 75, [LearningLevel.PHD]: 100 },
  lessons: [{ id: 'cert-1', title: 'Farm Labels', content: { [LearningLevel.ELEMENTARY]: '<h2>Special Stickers!</h2><p>Some foods have labels showing they come from farms that help the Earth!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>What Certification Means</h2><p>Third-party verification of practices. Organic, Regenerative Organic Certified, etc.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Certification Programs</h2><p>ROC, Land to Market, A Greener World. Standards, audits, premiums, market access.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Scheme Design</h2><p>Standard development, assurance systems, chain of custody, claims, premiums.</p>', [LearningLevel.GRADUATE]: '<h2>Effectiveness</h2><p>Impact assessment, additionality, smallholder inclusion, competing standards.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Governance, standard harmonization, outcome-based approaches, behavioral effects.</p>' } }],
  activities: [{ id: 'cert-act-1', title: 'Certification Navigator', type: 'SCENARIO', description: 'Choose certifications for a farm', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'cert-game', title: 'Certification Manager', type: 'puzzle', description: 'Navigate farm certifications', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'cert-q1', question: 'What does farm certification prove?', options: ['The farm follows certain practices', 'Nothing', 'The farm is big', 'The food is cheap'], correctAnswer: 0, explanation: 'Certification verifies farms meet specific environmental standards.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 32: Farming Careers
export const farmingCareers: Module = {
  id: 'regen-careers', slug: 'farming-careers', title: 'Farming Careers',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about jobs on regenerative farms!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover careers in sustainable agriculture.', [LearningLevel.HIGH_SCHOOL]: 'Explore farming career paths and education requirements.', [LearningLevel.UNDERGRADUATE]: 'Analyze agricultural career opportunities and professional development.', [LearningLevel.GRADUATE]: 'Examine farm business development, succession, and leadership.', [LearningLevel.PHD]: 'Research agricultural labor, new farmer support, and workforce development.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 15, [LearningLevel.MIDDLE_SCHOOL]: 25, [LearningLevel.HIGH_SCHOOL]: 40, [LearningLevel.UNDERGRADUATE]: 55, [LearningLevel.GRADUATE]: 75, [LearningLevel.PHD]: 100 },
  lessons: [{ id: 'career-1', title: 'Farm Jobs', content: { [LearningLevel.ELEMENTARY]: '<h2>Farm Work!</h2><p>Farmers grow food, but there are many other jobs too - soil scientists, vets, and more!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Career Options</h2><p>Farmer, farm manager, agronomist, extension agent, researcher, educator, marketer.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Getting Started</h2><p>Apprenticeships, WWOOF, internships, ag degrees, beginning farmer programs.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Professional Paths</h2><p>Consulting, extension, research, policy, nonprofit, agribusiness, entrepreneurship.</p>', [LearningLevel.GRADUATE]: '<h2>Leadership</h2><p>Farm business planning, succession, mentorship, advocacy, thought leadership.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Workforce studies, training effectiveness, new farmer support, labor economics.</p>' } }],
  activities: [{ id: 'career-act-1', title: 'Career Explorer', type: 'SCENARIO', description: 'Explore farming careers', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'career-game', title: 'Career Builder', type: 'puzzle', description: 'Plan your farm career', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'career-q1', question: 'What careers are in farming?', options: ['Farmers, scientists, educators', 'Only tractor drivers', 'None', 'Only office jobs'], correctAnswer: 0, explanation: 'Agriculture has many careers from farming to science to education.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 33: Water on Farms
export const waterOnFarms: Module = {
  id: 'regen-water-farms', slug: 'water-on-farms', title: 'Water on Farms',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how farms use and save water!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover smart water management for agriculture.', [LearningLevel.HIGH_SCHOOL]: 'Explore irrigation efficiency, water harvesting, and conservation.', [LearningLevel.UNDERGRADUATE]: 'Analyze farm water budgets, efficiency technologies, and regulations.', [LearningLevel.GRADUATE]: 'Examine water-agriculture nexus, allocation, and sustainability.', [LearningLevel.PHD]: 'Research agricultural water footprints, reuse, and climate adaptation.' },
  topic: 'regenerative-agriculture', estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'farmwater-1', title: 'Farm Water', content: { [LearningLevel.ELEMENTARY]: '<h2>Watering Wisely!</h2><p>Farms need lots of water, but regenerative farms use it carefully and catch rainwater!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Water Strategies</h2><p>Drip irrigation, rainwater harvesting, swales, ponds, soil health for water holding.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Efficiency</h2><p>Irrigation scheduling, soil moisture monitoring, mulching, drought-tolerant crops.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Water Management</h2><p>Crop water requirements, ET-based scheduling, water budgets, technology adoption.</p>', [LearningLevel.GRADUATE]: '<h2>Policy & Rights</h2><p>Water allocation, agricultural vs urban, groundwater governance, markets.</p>', [LearningLevel.PHD]: '<h2>Research</h2><p>Water productivity, virtual water, managed aquifer recharge, agricultural wastewater.</p>' } }],
  activities: [{ id: 'farmwater-act-1', title: 'Water Planner', type: 'SIMULATION', description: 'Plan farm water management', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'farmwater-game', title: 'Water Farmer', type: 'simulation', description: 'Manage farm water wisely', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'farmwater-q1', question: 'How can farms save water?', options: ['Drip irrigation and soil health', 'Flooding fields', 'Wasting it', 'Not using any'], correctAnswer: 0, explanation: 'Drip irrigation and healthy soil help farms use water efficiently.', difficulty: LearningLevel.ELEMENTARY }] }
}

export const regenerativeAgricultureModules: Module[] = [
  coverCrops,
  noTillFarming,
  composting,
  cropRotation,
  agroforestry,
  silvopasture,
  holisticGrazing,
  permacultureDesign,
  polycultures,
  integratedPestManagement,
  beneficialInsects,
  organicFertilizers,
  biochar,
  keylineDesign,
  seedSaving,
  heritageBreeds,
  carbonFarming,
  soilTesting,
  nitrogenFixation,
  mulching,
  hedgerowsWindbreaks,
  farmBiodiversity,
  localFoodSystems,
  regenerativeRanching,
  perennialGrains,
  urbanRegenAg,
  climateResilientFarming,
  regenCertification,
  farmingCareers,
  waterOnFarms,
  // Module 1: Regenerative Principles
  {
    id: 'regen-principles',
    slug: 'regenerative-principles',
    title: 'Regenerative Agriculture Principles',
    description: {
      ELEMENTARY: 'Learn how farmers can help the Earth heal by growing food in special ways!',
      MIDDLE_SCHOOL: 'Discover farming practices that restore soil health and help fight climate change.',
      HIGH_SCHOOL: 'Understand the science behind regenerative agriculture and its environmental benefits.',
      UNDERGRADUATE: 'Analyze regenerative farming systems, soil carbon dynamics, and ecosystem services.',
      GRADUATE: 'Evaluate regenerative agriculture as climate mitigation strategy and food system transformation.',
      PHD: 'Research soil-plant-atmosphere interactions, carbon sequestration measurement, and scaling challenges.'
    },
    topic: 'regenerative-agriculture',
    category: 'FUNDAMENTALS',
    icon: 'Sprout',
    color: 'terra',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 40, HIGH_SCHOOL: 55, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'regen-lesson-1',
        title: 'What is Regenerative Agriculture?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌱 Farming That Heals the Earth!</h2><div class="intro-box"><p>Regular farming can sometimes hurt the soil. But <strong>regenerative farming</strong> actually makes the soil better and healthier!</p></div><h3>The Magic of Healthy Soil</h3><p>Healthy soil is alive! It's full of tiny creatures like:</p><div class="creature-cards"><div class="card"><span>🐛</span><p>Earthworms</p></div><div class="card"><span>🦠</span><p>Tiny bacteria</p></div><div class="card"><span>🍄</span><p>Fungi</p></div></div><div class="fun-fact"><p>One teaspoon of healthy soil has more living things than there are people on Earth!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Understanding Regenerative Agriculture</h2><h3>Core Principles</h3><ol><li><strong>Minimize soil disturbance:</strong> Less tilling means healthier soil</li><li><strong>Keep soil covered:</strong> Mulch and cover crops protect soil</li><li><strong>Maintain living roots:</strong> Plants feed soil life year-round</li><li><strong>Maximize diversity:</strong> Many plant types support ecosystem health</li><li><strong>Integrate animals:</strong> Grazing mimics natural systems</li></ol><h3>Why It Matters</h3><p>Regenerative practices can rebuild topsoil, increase biodiversity, and capture carbon from the atmosphere.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>The Science of Regeneration</h2><h3>Soil Carbon Cycle</h3><p>Plants capture CO₂ through photosynthesis and transfer carbon to soil through root exudates and decomposition. Healthy soils can store 2-3x more carbon than the atmosphere.</p><h3>Soil Food Web</h3><ul><li><strong>Primary producers:</strong> Plants, algae</li><li><strong>Primary decomposers:</strong> Bacteria, fungi</li><li><strong>Secondary consumers:</strong> Protozoa, nematodes</li><li><strong>Higher predators:</strong> Arthropods, earthworms</li></ul><h3>Ecosystem Services</h3><ul><li>Carbon sequestration: 0.4-1.2 tons C/ha/year</li><li>Water infiltration: 10-100x improvement</li><li>Reduced erosion: Up to 90% reduction</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Regenerative Systems Analysis</h2><h3>Soil Organic Matter Dynamics</h3><p>SOM consists of living biomass (5%), fresh residues (10%), and humus (85%). Regenerative practices target all three pools:</p><ul><li>Particulate organic matter (fast cycling)</li><li>Mineral-associated organic matter (stable)</li><li>Pyrogenic carbon (very stable)</li></ul><h3>Carbon Sequestration Potential</h3><p>Meta-analyses suggest 0.4-1.2 Mg C/ha/year with large variability based on climate, soil type, and management intensity.</p><h3>Economic Considerations</h3><ul><li>Transition costs and timeline (3-5 years)</li><li>Yield impacts during transition</li><li>Premium market access</li><li>Ecosystem service payments</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Regenerative Agriculture in Climate Strategy</h2><h3>Mitigation Potential</h3><p>Global technical potential: 2-5 Gt CO₂e/year, but economic and adoption constraints reduce realizable potential significantly.</p><h3>Additionality and Permanence</h3><ul><li>Baseline definition challenges</li><li>Reversal risk with land use change</li><li>Saturation of soil carbon stocks</li><li>MRV (Measurement, Reporting, Verification) costs</li></ul><h3>Policy Landscape</h3><ul><li>USDA Climate-Smart Commodities</li><li>EU Carbon Farming Initiative</li><li>Voluntary carbon markets</li><li>Conservation program integration</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers in Regenerative Agriculture</h2><h3>Measurement Challenges</h3><ul><li>Spatial heterogeneity of soil carbon</li><li>Detection of change vs. natural variability</li><li>Cost-effective MRV approaches</li><li>Remote sensing and modeling integration</li></ul><h3>Mechanistic Understanding</h3><ul><li>Root exudate-microbiome interactions</li><li>Mycorrhizal carbon transfer pathways</li><li>Aggregate formation and protection</li><li>Priming effects and SOM persistence</li></ul><h3>Scaling Questions</h3><ul><li>Knowledge transfer and extension</li><li>Financial mechanism design</li><li>Supply chain transformation</li><li>Just transition considerations</li></ul></div>`
        }
      },
      {
        id: 'regen-lesson-2',
        title: 'Building Healthy Soil',
        order: 2,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🏗️ Building Super Soil!</h2><h3>Ingredients for Amazing Soil</h3><div class="ingredients"><div class="item"><span>🪨</span><p>Minerals from rocks</p></div><div class="item"><span>🍂</span><p>Dead leaves and plants</p></div><div class="item"><span>💧</span><p>Water</p></div><div class="item"><span>🌬️</span><p>Air</p></div><div class="item"><span>🐛</span><p>Living creatures</p></div></div><h3>The Soil Recipe</h3><p>Mix together with time and you get rich, dark, healthy soil that grows amazing plants!</p></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Soil Health Practices</h2><h3>Cover Crops</h3><p>Plants grown between main crops to protect and feed the soil. Examples: clover, rye, vetch.</p><h3>No-Till Farming</h3><p>Planting without plowing preserves soil structure and life.</p><h3>Composting</h3><p>Adding organic matter returns nutrients and builds soil carbon.</p><h3>Crop Rotation</h3><p>Changing crops each season prevents pest buildup and balances soil nutrients.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Soil Biology and Structure</h2><h3>Soil Aggregation</h3><p>Soil particles bind together into aggregates through:</p><ul><li>Fungal hyphae (physical binding)</li><li>Bacterial polysaccharides (glue)</li><li>Root exudates (carbon source)</li><li>Earthworm activity (mixing)</li></ul><h3>Benefits of Good Structure</h3><ul><li>Water infiltration and retention</li><li>Aeration for roots and microbes</li><li>Erosion resistance</li><li>Carbon protection in aggregates</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Soil Biological Engineering</h2><h3>Rhizosphere Interactions</h3><p>Root exudates (sugars, organic acids, amino acids) fuel microbial activity, with plants allocating 20-40% of photosynthate belowground.</p><h3>Mycorrhizal Networks</h3><p>Arbuscular mycorrhizal fungi extend root surface area 100x, improving nutrient uptake and carbon transfer to soil.</p><h3>Management for Biology</h3><ul><li>Diverse rotations for diverse microbiomes</li><li>Reduced chemical inputs</li><li>Living roots as long as possible</li><li>Organic matter additions</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Soil Science</h2><h3>Carbon Stabilization Mechanisms</h3><ul><li>Physical protection in aggregates</li><li>Chemical bonding to minerals (MAOM)</li><li>Biochemical recalcitrance</li></ul><h3>Priming Effects</h3><p>Fresh carbon inputs can stimulate decomposition of existing SOM (positive priming) or suppress it (negative priming).</p><h3>Soil Health Assessment</h3><ul><li>Physical: Aggregate stability, infiltration, compaction</li><li>Chemical: pH, nutrients, CEC, SOM</li><li>Biological: Respiration, enzyme activity, microbial biomass</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Soil Carbon Research</h2><h3>Measurement Methods</h3><ul><li>Direct sampling and analysis (dry combustion)</li><li>Spectroscopic methods (FTIR, NMR)</li><li>Remote sensing (hyperspectral)</li><li>Eddy covariance flux towers</li></ul><h3>Modeling Approaches</h3><ul><li>Process-based models (Century, RothC)</li><li>Machine learning predictions</li><li>Digital soil mapping</li></ul><h3>Emerging Questions</h3><ul><li>Deep soil carbon dynamics</li><li>Microbial carbon use efficiency</li><li>Climate feedbacks from soil C</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'regen-activity-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Build a Healthy Soil!',
          MIDDLE_SCHOOL: 'Match Practices to Benefits',
          HIGH_SCHOOL: 'Soil Food Web Connections',
          UNDERGRADUATE: 'Carbon Flow Diagram',
          GRADUATE: 'Management System Design',
          PHD: 'MRV Protocol Design'
        },
        description: {
          ELEMENTARY: 'Drag ingredients to make healthy soil!',
          MIDDLE_SCHOOL: 'Connect regenerative practices with their benefits.',
          HIGH_SCHOOL: 'Build the soil food web by connecting organisms.',
          UNDERGRADUATE: 'Map carbon flows through the agricultural system.',
          GRADUATE: 'Design a regenerative management system.',
          PHD: 'Design a measurement and verification protocol.'
        },
        config: {
          ELEMENTARY: { items: 5, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 8, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 },
          GRADUATE: { items: 20, hints: false, timeLimit: 90 },
          PHD: { items: 25, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'regen-game',
      type: 'matching',
      title: 'Regenerative Farming Challenge',
      description: 'Match practices, benefits, and soil organisms!',
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
      id: 'regen-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rgq1',
          question: {
            ELEMENTARY: 'What makes soil healthy?',
            MIDDLE_SCHOOL: 'What is a core principle of regenerative agriculture?',
            HIGH_SCHOOL: 'How much carbon can regenerative practices sequester annually?',
            UNDERGRADUATE: 'What percentage of photosynthate do plants typically allocate belowground?',
            GRADUATE: 'What is the primary challenge for soil carbon credits?',
            PHD: 'What stabilization mechanism provides the most persistent soil carbon storage?'
          },
          options: {
            ELEMENTARY: ['Living things like worms and bacteria', 'Lots of rocks', 'Plastic pieces', 'Only water'],
            MIDDLE_SCHOOL: ['Minimize soil disturbance', 'Plow as much as possible', 'Remove all plants', 'Use only chemicals'],
            HIGH_SCHOOL: ['0.4-1.2 tons C/ha/year', '10-20 tons C/ha/year', '0.01 tons C/ha/year', '100 tons C/ha/year'],
            UNDERGRADUATE: ['20-40%', '1-5%', '80-90%', '50-60%'],
            GRADUATE: ['Permanence and reversal risk', 'Too much carbon stored', 'Practices too easy', 'No interest from farmers'],
            PHD: ['Mineral-associated organic matter (MAOM)', 'Particulate organic matter', 'Fresh residues', 'Dissolved organic carbon']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Healthy soil is full of living things that help plants grow!',
            MIDDLE_SCHOOL: 'Minimizing disturbance protects soil structure and the organisms living in it.',
            HIGH_SCHOOL: 'Research shows regenerative practices can sequester 0.4-1.2 tons of carbon per hectare per year.',
            UNDERGRADUATE: 'Plants allocate 20-40% of photosynthate belowground through root exudates and turnover.',
            GRADUATE: 'Carbon stored in soil can be released if management changes, creating permanence risk.',
            PHD: 'MAOM (carbon bonded to mineral surfaces) provides the most stable, long-term storage.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Rodale Institute', url: 'https://rodaleinstitute.org/', type: 'research' },
      { title: 'Regeneration International', url: 'https://regenerationinternational.org/', type: 'article' }
    ]
  },
  // Module 2: Soil Health & Microbiome
  {
    id: 'regen-soil-health',
    slug: 'soil-health-microbiome',
    title: 'Soil Health & Microbiome',
    description: {
      ELEMENTARY: 'Meet the tiny creatures that live underground and help plants grow!',
      MIDDLE_SCHOOL: 'Explore the invisible world of soil bacteria, fungi, and other organisms.',
      HIGH_SCHOOL: 'Understand soil biology, the rhizosphere, and plant-microbe interactions.',
      UNDERGRADUATE: 'Analyze soil microbiome composition, function, and management implications.',
      GRADUATE: 'Evaluate microbiome engineering approaches and soil biological indicators.',
      PHD: 'Research metagenomics, functional ecology, and synthetic community approaches.'
    },
    topic: 'regenerative-agriculture',
    category: 'SOIL BIOLOGY',
    icon: 'Bug',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'soil-health-1',
        title: 'The Underground World',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'PUZZLE',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🔬 Tiny Helpers Underground!</h2><p>Under our feet is a whole world of tiny creatures we can't see!</p><h3>Meet the Soil Team</h3><div class="creature-profiles"><div class="profile"><span>🦠</span><h4>Bacteria</h4><p>Super tiny! Break down dead stuff into plant food</p></div><div class="profile"><span>🍄</span><h4>Fungi</h4><p>Make underground highways that share food between plants</p></div><div class="profile"><span>🐛</span><h4>Worms</h4><p>Mix and aerate the soil, make tunnels for water</p></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Soil Organisms and Their Roles</h2><h3>Bacteria</h3><p>Most numerous - billions per gram of soil. Decompose organic matter, cycle nutrients, some fix nitrogen.</p><h3>Fungi</h3><p>Form networks through soil. Mycorrhizae partner with plant roots. Decompose tough materials like lignin.</p><h3>Protozoa</h3><p>Single-celled organisms that eat bacteria, releasing nutrients in plant-available forms.</p><h3>Nematodes</h3><p>Microscopic worms - some beneficial (eat pests), some problematic (attack roots).</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Rhizosphere Biology</h2><h3>The Rhizosphere Effect</h3><p>The zone around roots has 10-1000x more microbial activity than bulk soil due to root exudates.</p><h3>Plant-Microbe Signaling</h3><ul><li>Plants release compounds that attract beneficial microbes</li><li>Microbes produce hormones affecting plant growth</li><li>Chemical communication establishes symbioses</li></ul><h3>Mycorrhizal Symbiosis</h3><p>~80% of plant species form mycorrhizal associations, trading carbon for phosphorus and other nutrients.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Soil Microbiome Analysis</h2><h3>Methods</h3><ul><li>16S rRNA sequencing (bacteria/archaea)</li><li>ITS sequencing (fungi)</li><li>Metagenomics (whole community function)</li><li>Metatranscriptomics (active functions)</li></ul><h3>Functional Groups</h3><ul><li>Decomposers (carbon cycling)</li><li>Nitrogen cyclers (N-fixers, nitrifiers, denitrifiers)</li><li>Plant growth promoters (PGPR)</li><li>Disease suppressors</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Microbiome Management</h2><h3>Indicators of Soil Health</h3><ul><li>Microbial biomass carbon</li><li>Fungal:bacterial ratios</li><li>Enzyme activities</li><li>Microbial diversity indices</li></ul><h3>Management Impacts</h3><p>Tillage, fertilizers, pesticides, and crop diversity all shape microbiome composition and function.</p><h3>Biocontrol and Biofertilization</h3><p>Harnessing beneficial microbes for pest suppression and nutrient provision.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Microbiome Research Frontiers</h2><h3>Synthetic Communities</h3><p>Designing simplified microbial communities to study interactions and functions.</p><h3>Functional Metagenomics</h3><p>Linking genes to functions across complex communities.</p><h3>Microbiome Engineering</h3><ul><li>Soil probiotics and inoculants</li><li>Phage therapy for pathogens</li><li>CRISPR-based approaches</li></ul><h3>Open Questions</h3><ul><li>Predictability of microbiome responses</li><li>Persistence of introduced organisms</li><li>Scaling from lab to field</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'soil-health-activity-1',
        type: 'PUZZLE',
        title: {
          ELEMENTARY: 'Build the Soil Food Web!',
          MIDDLE_SCHOOL: 'Who Eats Whom?',
          HIGH_SCHOOL: 'Rhizosphere Interactions',
          UNDERGRADUATE: 'Microbiome Analysis',
          GRADUATE: 'Health Indicator Dashboard',
          PHD: 'Functional Gene Mapping'
        },
        description: {
          ELEMENTARY: 'Connect soil creatures in a food web puzzle!',
          MIDDLE_SCHOOL: 'Build the soil food web by connecting who eats whom.',
          HIGH_SCHOOL: 'Map interactions between roots and microbes.',
          UNDERGRADUATE: 'Analyze microbiome data and interpret diversity metrics.',
          GRADUATE: 'Build a soil health indicator dashboard.',
          PHD: 'Map functional genes to ecosystem processes.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', pieces: 8 },
          MIDDLE_SCHOOL: { complexity: 'simple', pieces: 12 },
          HIGH_SCHOOL: { complexity: 'intermediate', pieces: 16 },
          UNDERGRADUATE: { complexity: 'advanced', pieces: 20 },
          GRADUATE: { complexity: 'expert', pieces: 25 },
          PHD: { complexity: 'research', pieces: 30 }
        }
      }
    ],
    game: {
      id: 'soil-health-game',
      type: 'matching',
      title: 'Microbe Match',
      description: 'Match organisms with their functions!',
      rounds: 5,
      timeLimit: 25,
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
      id: 'soil-health-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'shq1',
          question: {
            ELEMENTARY: 'Which soil creature makes tunnels for water?',
            MIDDLE_SCHOOL: 'What do mycorrhizal fungi do for plants?',
            HIGH_SCHOOL: 'What percentage of plant species form mycorrhizal associations?',
            UNDERGRADUATE: 'What sequencing method targets bacterial diversity?',
            GRADUATE: 'What does a high fungal:bacterial ratio typically indicate?',
            PHD: 'What is the primary challenge in soil microbiome engineering?'
          },
          options: {
            ELEMENTARY: ['Earthworms', 'Bacteria', 'Seeds', 'Rocks'],
            MIDDLE_SCHOOL: ['Help them get nutrients', 'Eat their roots', 'Block water', 'Nothing'],
            HIGH_SCHOOL: ['About 80%', 'About 10%', 'About 50%', 'About 1%'],
            UNDERGRADUATE: ['16S rRNA sequencing', 'ITS sequencing', 'Whole genome sequencing', 'RNA-seq'],
            GRADUATE: ['Less disturbed, more fungal-dominated system', 'Degraded soil', 'Very wet conditions', 'High nitrogen'],
            PHD: ['Persistence and establishment in field conditions', 'Finding beneficial organisms', 'Lab cultivation', 'Cost of sequencing']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Earthworms dig tunnels that help water soak into the soil!',
            MIDDLE_SCHOOL: 'Mycorrhizal fungi extend root reach and help plants absorb nutrients, especially phosphorus.',
            HIGH_SCHOOL: 'About 80% of all plant species form mycorrhizal associations.',
            UNDERGRADUATE: '16S rRNA gene sequencing is the standard for bacterial/archaeal community profiling.',
            GRADUATE: 'Fungal-dominated soils typically indicate less disturbance and more perennial/woody vegetation.',
            PHD: 'Introduced organisms often fail to persist in complex field communities.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Soil Health Institute', url: 'https://soilhealthinstitute.org/', type: 'research' }
    ]
  },
  // MASTERCLASS: Complete Regenerative Farm Design
  {
    id: 'regen-masterclass',
    slug: 'regenerative-farm-masterclass',
    title: 'Regenerative Farm Design Masterclass',
    description: {
      ELEMENTARY: 'Design your own dream farm that helps nature!',
      MIDDLE_SCHOOL: 'Learn to plan a farm that grows food while healing the land.',
      HIGH_SCHOOL: 'Comprehensive study of regenerative farm system design and management.',
      UNDERGRADUATE: 'Advanced whole-farm planning integrating crops, livestock, and ecosystems.',
      GRADUATE: 'Expert-level farm system optimization, economics, and transition planning.',
      PHD: 'Research synthesis of regenerative systems, landscape ecology, and transformation pathways.'
    },
    topic: 'regenerative-agriculture',
    category: 'MASTERCLASS',
    icon: 'Award',
    color: 'terra',
    duration: { ELEMENTARY: 45, MIDDLE_SCHOOL: 60, HIGH_SCHOOL: 90, UNDERGRADUATE: 120, GRADUATE: 150, PHD: 180 },
    isMasterclass: true,
    hasVideo: true,
    lessons: [
      {
        id: 'master-regen-1',
        title: 'Whole Farm Systems',
        order: 1,
        duration: 25,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌾 Planning Your Dream Farm!</h2><p>A regenerative farm has many parts working together like a team!</p><h3>Farm Parts</h3><div class="farm-parts"><div class="part"><span>🌽</span><p>Crops</p></div><div class="part"><span>🐄</span><p>Animals</p></div><div class="part"><span>🌳</span><p>Trees</p></div><div class="part"><span>💧</span><p>Water</p></div><div class="part"><span>🏠</span><p>Buildings</p></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Integrated Farm Design</h2><h3>Key Elements</h3><ul><li><strong>Diverse crops:</strong> Rotations and polycultures</li><li><strong>Livestock integration:</strong> Grazing in crop rotations</li><li><strong>Perennial systems:</strong> Orchards, silvopasture, alley cropping</li><li><strong>Water management:</strong> Ponds, swales, irrigation</li><li><strong>Habitat areas:</strong> Hedgerows, wetlands, wildlife corridors</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Farm System Design Principles</h2><h3>Permaculture Zones</h3><p>Organizing the farm by frequency of use and management intensity.</p><h3>Keyline Design</h3><p>Water management following landscape contours for optimal distribution.</p><h3>Enterprise Stacking</h3><p>Multiple products from the same land area (e.g., silvopasture = trees + livestock + understory).</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Whole-Farm Planning</h2><h3>Assessment Phase</h3><ul><li>Resource inventory (soil, water, climate)</li><li>Market analysis</li><li>Infrastructure evaluation</li><li>Ecological baseline</li></ul><h3>Design Phase</h3><ul><li>Enterprise selection and integration</li><li>Spatial layout optimization</li><li>Temporal sequencing (rotations, transitions)</li><li>Financial modeling</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Farm System Optimization</h2><h3>Multi-Objective Optimization</h3><p>Balancing productivity, profitability, and ecosystem services.</p><h3>Transition Economics</h3><ul><li>Transition cost modeling</li><li>Risk management strategies</li><li>Diversified revenue streams</li><li>Ecosystem service payments</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Regenerative Systems Research</h2><h3>Landscape-Scale Integration</h3><p>Coordinating practices across farms and watersheds.</p><h3>Transformation Pathways</h3><ul><li>Socio-technical transition frameworks</li><li>Innovation system approaches</li><li>Policy and market co-evolution</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'master-regen-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build Your Farm!',
          MIDDLE_SCHOOL: 'Farm Planner',
          HIGH_SCHOOL: 'Rotation Designer',
          UNDERGRADUATE: 'Whole-Farm Optimizer',
          GRADUATE: 'Transition Simulator',
          PHD: 'Landscape Modeler'
        },
        description: {
          ELEMENTARY: 'Place animals, crops, and trees on your farm!',
          MIDDLE_SCHOOL: 'Design a balanced farm with multiple elements.',
          HIGH_SCHOOL: 'Create a multi-year crop rotation plan.',
          UNDERGRADUATE: 'Optimize a whole-farm system for multiple goals.',
          GRADUATE: 'Simulate a transition from conventional to regenerative.',
          PHD: 'Model landscape-scale regenerative transformation.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 8 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 20 },
          GRADUATE: { complexity: 'expert', variables: 30 },
          PHD: { complexity: 'research', variables: 45 }
        }
      }
    ],
    game: {
      id: 'master-regen-game',
      type: 'timed_challenge',
      title: 'Farm Design Master Challenge',
      description: 'Test your regenerative farming knowledge!',
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
      id: 'master-regen-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mrgq1',
          question: {
            ELEMENTARY: 'What animals can help on a regenerative farm?',
            MIDDLE_SCHOOL: 'What is silvopasture?',
            HIGH_SCHOOL: 'What is keyline design used for?',
            UNDERGRADUATE: 'What is enterprise stacking?',
            GRADUATE: 'What is the primary financial challenge in regenerative transition?',
            PHD: 'What framework best describes food system transformation?'
          },
          options: {
            ELEMENTARY: ['Cows, chickens, and sheep', 'Only robots', 'No animals', 'Just fish'],
            MIDDLE_SCHOOL: ['Trees with grazing animals', 'Only silver-colored pastures', 'Indoor farming', 'Concrete pastures'],
            HIGH_SCHOOL: ['Water management following contours', 'Drawing keys on land', 'Making straight lines', 'Removing trees'],
            UNDERGRADUATE: ['Multiple enterprises on same land', 'Stacking hay bales', 'Single crop focus', 'Vertical farming'],
            GRADUATE: ['Cash flow during transition period', 'Too much profit', 'No market demand', 'Excessive labor availability'],
            PHD: ['Socio-technical transitions', 'Simple technology adoption', 'Market forces alone', 'Top-down policy']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Many animals like cows, chickens, and sheep can help by eating weeds and fertilizing soil!',
            MIDDLE_SCHOOL: 'Silvopasture combines trees with livestock grazing for multiple benefits.',
            HIGH_SCHOOL: 'Keyline design manages water by following the natural contours of the landscape.',
            UNDERGRADUATE: 'Enterprise stacking generates multiple revenue streams from the same land area.',
            GRADUATE: 'The transition period typically involves reduced yields before regenerative benefits emerge.',
            PHD: 'Socio-technical transitions capture the co-evolution of technology, practices, and institutions.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Savory Institute', url: 'https://savory.global/', type: 'research' },
      { title: 'NRCS Conservation Practice Standards', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/conservation-practice-standards', type: 'tool' }
    ]
  }
]
