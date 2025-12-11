// Zero Waste Living Modules - Complete Content for All Learning Levels
import { Module, LearningLevel } from './index'

// Module 4: Plastic Reduction Strategies
export const plasticReduction: Module = {
  id: 'zw-plastic-reduction', slug: 'plastic-reduction', title: 'Plastic Reduction Strategies',
  description: { [LearningLevel.ELEMENTARY]: 'Learn to say goodbye to plastic and hello to nature-friendly choices!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover practical ways to reduce plastic use in daily life.', [LearningLevel.HIGH_SCHOOL]: 'Analyze plastic pollution sources and implement reduction strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate plastic alternatives, lifecycle impacts, and policy approaches.', [LearningLevel.GRADUATE]: 'Research microplastics, degradation pathways, and systemic solutions.', [LearningLevel.PHD]: 'Investigate plastic polymer science, environmental fate, and circular solutions.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'plastic-1', title: 'Plastic-Free Living', content: { [LearningLevel.ELEMENTARY]: '<h2>Plastic Is Everywhere!</h2><p>Plastic takes hundreds of years to break down. Let\'s use less!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Understanding Plastic Pollution</h2><p>8 million tons of plastic enter oceans yearly. Small changes make big impacts.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Plastic Lifecycle Analysis</h2><p>From petroleum extraction to microplastic pollution - understanding the full impact.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Alternative Materials Assessment</h2><p>Comparing bioplastics, glass, metal, and paper alternatives across environmental metrics.</p>', [LearningLevel.GRADUATE]: '<h2>Microplastics Research</h2><p>Distribution in ecosystems, food chains, and human health implications.</p>', [LearningLevel.PHD]: '<h2>Polymer Science Solutions</h2><p>Developing truly biodegradable polymers and chemical recycling processes.</p>' } }],
  activities: [{ id: 'plastic-act-1', title: 'Plastic Audit', type: 'SIMULATION', description: 'Count plastics in your home and find alternatives', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'plastic-game', title: 'Plastic-Free Challenge', type: 'simulation', description: 'Navigate a week avoiding single-use plastics', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'plastic-q1', question: 'How long can plastic take to decompose?', options: ['Hundreds of years', 'A few weeks', 'One year', 'It disappears quickly'], correctAnswer: 0, explanation: 'Plastic can persist in the environment for hundreds of years.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 5: Sustainable Packaging
export const sustainablePackaging: Module = {
  id: 'zw-sustainable-packaging', slug: 'sustainable-packaging', title: 'Sustainable Packaging',
  description: { [LearningLevel.ELEMENTARY]: 'Discover packaging that helps the Earth instead of hurting it!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn about eco-friendly packaging options and their benefits.', [LearningLevel.HIGH_SCHOOL]: 'Evaluate packaging materials, design principles, and environmental impacts.', [LearningLevel.UNDERGRADUATE]: 'Analyze packaging lifecycle assessment, regulations, and innovation.', [LearningLevel.GRADUATE]: 'Research packaging system optimization and circular design strategies.', [LearningLevel.PHD]: 'Investigate novel packaging materials and end-of-life system design.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'packaging-1', title: 'Better Packaging Choices', content: { [LearningLevel.ELEMENTARY]: '<h2>Package Parade!</h2><p>Some packages can be composted, recycled, or reused. Look for earth-friendly options!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Packaging Materials</h2><p>Paper, glass, metal, and compostable materials each have pros and cons.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Design for Sustainability</h2><p>Right-sizing, material reduction, and recyclability in packaging design.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>LCA of Packaging</h2><p>Full lifecycle comparison of packaging options including production and disposal.</p>', [LearningLevel.GRADUATE]: '<h2>Packaging Systems</h2><p>Reusable packaging systems, deposit schemes, and reverse logistics.</p>', [LearningLevel.PHD]: '<h2>Advanced Packaging Research</h2><p>Edible packaging, active packaging, and biomaterial development.</p>' } }],
  activities: [{ id: 'packaging-act-1', title: 'Package Redesign', type: 'PUZZLE', description: 'Redesign products with sustainable packaging', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'packaging-game', title: 'Package Designer', type: 'puzzle', description: 'Create sustainable packaging solutions', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'packaging-q1', question: 'Which packaging is best for the planet?', options: ['Reusable containers', 'Single-use plastic', 'Styrofoam', 'Excessive packaging'], correctAnswer: 0, explanation: 'Reusable containers reduce waste the most.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 6: Minimalism and Decluttering
export const minimalism: Module = {
  id: 'zw-minimalism', slug: 'minimalism-decluttering', title: 'Minimalism and Decluttering',
  description: { [LearningLevel.ELEMENTARY]: 'Learn that less stuff can mean more happiness!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover the freedom of owning fewer things and living simply.', [LearningLevel.HIGH_SCHOOL]: 'Explore minimalist philosophy, psychology of consumption, and practical strategies.', [LearningLevel.UNDERGRADUATE]: 'Analyze consumer culture, materialism research, and alternative lifestyles.', [LearningLevel.GRADUATE]: 'Research voluntary simplicity movements, well-being economics, and sufficiency.', [LearningLevel.PHD]: 'Investigate consumption-happiness relationships and post-growth economics.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'minimalism-1', title: 'Living With Less', content: { [LearningLevel.ELEMENTARY]: '<h2>Less is More!</h2><p>When you have fewer toys, you play more with each one. Quality over quantity!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>The Minimalist Mindset</h2><p>Focus on experiences over things, needs over wants.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Consumer Psychology</h2><p>Understanding why we accumulate and how to break the cycle.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Materialism Research</h2><p>Studies show more stuff doesn\'t increase happiness after basic needs are met.</p>', [LearningLevel.GRADUATE]: '<h2>Voluntary Simplicity</h2><p>Historical and contemporary movements choosing sufficiency over excess.</p>', [LearningLevel.PHD]: '<h2>Post-Growth Economics</h2><p>Economic models that decouple well-being from material throughput.</p>' } }],
  activities: [{ id: 'minimalism-act-1', title: 'Declutter Challenge', type: 'STEP_GUIDED', description: 'Identify items to donate or recycle', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'minimalism-game', title: 'Simple Living Simulator', type: 'simulation', description: 'Experience life with less stuff', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'minimalism-q1', question: 'What does minimalism teach us?', options: ['Less stuff can mean more happiness', 'Buy everything you want', 'Keep all your old things', 'More is always better'], correctAnswer: 0, explanation: 'Minimalism shows that having less can lead to a happier, simpler life.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 7: Repair and Maintenance
export const repairMaintenance: Module = {
  id: 'zw-repair-maintenance', slug: 'repair-maintenance', title: 'Repair and Maintenance',
  description: { [LearningLevel.ELEMENTARY]: 'Learn to fix things instead of throwing them away!', [LearningLevel.MIDDLE_SCHOOL]: 'Master basic repair skills to extend the life of your belongings.', [LearningLevel.HIGH_SCHOOL]: 'Develop practical repair skills and understand planned obsolescence.', [LearningLevel.UNDERGRADUATE]: 'Analyze right-to-repair movements, repairability design, and circular economy.', [LearningLevel.GRADUATE]: 'Research repair economics, policy instruments, and business model innovation.', [LearningLevel.PHD]: 'Investigate repair culture, product longevity research, and design for repair.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'repair-1', title: 'Fix It First', content: { [LearningLevel.ELEMENTARY]: '<h2>Be a Fixer!</h2><p>Before throwing something away, ask: Can this be fixed? A loose button? A torn book?</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Basic Repair Skills</h2><p>Learn to sew, glue, tighten screws, and make simple fixes.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Planned Obsolescence</h2><p>Products designed to fail? Understanding and resisting throwaway culture.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Right to Repair</h2><p>Legal battles for repair access, parts availability, and repair manuals.</p>', [LearningLevel.GRADUATE]: '<h2>Repair Economics</h2><p>Cost-benefit of repair vs. replacement, repair service business models.</p>', [LearningLevel.PHD]: '<h2>Product Longevity Research</h2><p>Design strategies for durability, modularity, and ease of repair.</p>' } }],
  activities: [{ id: 'repair-act-1', title: 'Virtual Repair Workshop', type: 'STEP_GUIDED', description: 'Practice repairing common household items', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'repair-game', title: 'Repair Hero', type: 'puzzle', description: 'Fix broken items before they hit the landfill', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'repair-q1', question: 'What should you do before throwing something away?', options: ['Try to fix it first', 'Always throw it away', 'Buy a new one immediately', 'Ignore the problem'], correctAnswer: 0, explanation: 'Trying to repair items extends their life and reduces waste.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 8: Upcycling and DIY Projects
export const upcyclingDIY: Module = {
  id: 'zw-upcycling-diy', slug: 'upcycling-diy', title: 'Upcycling and DIY Projects',
  description: { [LearningLevel.ELEMENTARY]: 'Turn trash into treasure with creative projects!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn to transform old items into new useful things.', [LearningLevel.HIGH_SCHOOL]: 'Explore upcycling techniques, maker culture, and creative reuse.', [LearningLevel.UNDERGRADUATE]: 'Analyze upcycling economics, design thinking, and material value recovery.', [LearningLevel.GRADUATE]: 'Research creative reuse systems, material banks, and upcycling innovation.', [LearningLevel.PHD]: 'Investigate upcycling as industrial strategy and value creation from waste streams.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'upcycle-1', title: 'Creative Transformation', content: { [LearningLevel.ELEMENTARY]: '<h2>Trash to Treasure!</h2><p>An old jar becomes a pencil holder! A t-shirt becomes a bag! Use your imagination!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Upcycling Projects</h2><p>Turn old clothes into new fashion, furniture from pallets, art from scraps.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Maker Culture</h2><p>DIY movement, makerspaces, and the skills to create instead of consume.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Design for Upcycling</h2><p>How products can be designed for creative second lives.</p>', [LearningLevel.GRADUATE]: '<h2>Material Banks</h2><p>Systems for collecting, cataloging, and redistributing materials for reuse.</p>', [LearningLevel.PHD]: '<h2>Industrial Upcycling</h2><p>Large-scale value recovery from waste streams into new products.</p>' } }],
  activities: [{ id: 'upcycle-act-1', title: 'Upcycle Creator', type: 'PUZZLE', description: 'Design upcycled products from common waste items', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'upcycle-game', title: 'Upcycle Master', type: 'puzzle', description: 'Transform waste items into valuable products', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'upcycle-q1', question: 'What is upcycling?', options: ['Turning old things into new useful items', 'Throwing things in the trash', 'Buying new things', 'Breaking things down'], correctAnswer: 0, explanation: 'Upcycling transforms waste into new products of higher value.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 9: Sustainable Shopping
export const sustainableShopping: Module = {
  id: 'zw-sustainable-shopping', slug: 'sustainable-shopping', title: 'Sustainable Shopping',
  description: { [LearningLevel.ELEMENTARY]: 'Learn to be a smart shopper who helps the planet!', [LearningLevel.MIDDLE_SCHOOL]: 'Make purchasing decisions that reduce waste and support sustainability.', [LearningLevel.HIGH_SCHOOL]: 'Analyze consumer choices, eco-labels, and sustainable consumption strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate sustainable supply chains, certification systems, and consumer behavior.', [LearningLevel.GRADUATE]: 'Research sustainable consumption policy, green marketing, and behavior change.', [LearningLevel.PHD]: 'Investigate consumption patterns, sustainable lifestyles research, and system change.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'shopping-1', title: 'Shopping Smart', content: { [LearningLevel.ELEMENTARY]: '<h2>Be a Smart Shopper!</h2><p>Ask yourself: Do I really need this? Can I borrow it? Can I buy it used?</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Conscious Consumer</h2><p>Research products, choose quality over quantity, support sustainable brands.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Eco-Labels Decoded</h2><p>Understanding certifications, greenwashing, and making informed choices.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Supply Chain Impacts</h2><p>Tracing products from raw materials to disposal - hidden environmental costs.</p>', [LearningLevel.GRADUATE]: '<h2>Consumer Behavior Change</h2><p>Strategies for shifting purchasing patterns at scale.</p>', [LearningLevel.PHD]: '<h2>Sustainable Consumption Research</h2><p>Modeling consumption impacts and pathways to sufficiency.</p>' } }],
  activities: [{ id: 'shopping-act-1', title: 'Smart Shopping Simulator', type: 'SCENARIO', description: 'Make sustainable choices while shopping', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'shopping-game', title: 'Eco-Shopper', type: 'simulation', description: 'Navigate shopping decisions sustainably', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'shopping-q1', question: 'What should you ask before buying something?', options: ['Do I really need this?', 'Is it the newest model?', 'Is it on sale?', 'Does everyone have one?'], correctAnswer: 0, explanation: 'Asking if you really need something prevents unnecessary purchases.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 10: Food Waste Reduction
export const foodWasteReduction: Module = {
  id: 'zw-food-waste', slug: 'food-waste-reduction', title: 'Food Waste Reduction',
  description: { [LearningLevel.ELEMENTARY]: 'Learn to save food and stop it from going to waste!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how food waste happens and what we can do about it.', [LearningLevel.HIGH_SCHOOL]: 'Analyze food waste across the supply chain and implement reduction strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate food loss at different stages, prevention strategies, and policy tools.', [LearningLevel.GRADUATE]: 'Research food waste quantification, redistribution systems, and systemic solutions.', [LearningLevel.PHD]: 'Investigate food waste drivers, intervention effectiveness, and system transformation.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'foodwaste-1', title: 'Save That Food!', content: { [LearningLevel.ELEMENTARY]: '<h2>Don\'t Waste Food!</h2><p>Eat your leftovers! Take only what you can eat! Help save food from the trash!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Where Food Waste Happens</h2><p>From farms to stores to homes - food is lost at every step.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Food Waste Statistics</h2><p>1/3 of food is wasted globally. Causes, impacts, and solutions.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Supply Chain Food Loss</h2><p>Harvest loss, processing waste, retail disposal, and consumer behavior.</p>', [LearningLevel.GRADUATE]: '<h2>Food Redistribution</h2><p>Food banks, apps, gleaning, and systems to redirect surplus food.</p>', [LearningLevel.PHD]: '<h2>Food Waste Research</h2><p>Measurement methods, intervention studies, and policy effectiveness.</p>' } }],
  activities: [{ id: 'foodwaste-act-1', title: 'Meal Planner', type: 'STEP_GUIDED', description: 'Plan meals to minimize food waste', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'foodwaste-game', title: 'Food Saver', type: 'simulation', description: 'Manage a kitchen to minimize food waste', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'foodwaste-q1', question: 'How can you reduce food waste?', options: ['Eat leftovers and take only what you need', 'Throw away food you don\'t like', 'Buy more than you need', 'Let food spoil'], correctAnswer: 0, explanation: 'Eating leftovers and taking appropriate portions reduces food waste.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 11: Sustainable Fashion
export const sustainableFashion: Module = {
  id: 'zw-sustainable-fashion', slug: 'sustainable-fashion', title: 'Sustainable Fashion',
  description: { [LearningLevel.ELEMENTARY]: 'Learn to love your clothes longer and help the planet!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover the impact of fast fashion and sustainable alternatives.', [LearningLevel.HIGH_SCHOOL]: 'Analyze textile industry impacts and sustainable fashion strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate fashion supply chains, certification systems, and circular models.', [LearningLevel.GRADUATE]: 'Research textile waste, sustainable fibers, and industry transformation.', [LearningLevel.PHD]: 'Investigate fashion system change, material innovation, and business model transition.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'fashion-1', title: 'Clothes That Last', content: { [LearningLevel.ELEMENTARY]: '<h2>Love Your Clothes!</h2><p>Take care of your clothes so they last longer. Donate what you outgrow!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Fast Fashion Problems</h2><p>Cheap clothes have high environmental costs. Quality matters!</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Textile Industry Impacts</h2><p>Water use, chemicals, carbon emissions, and labor conditions.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Sustainable Materials</h2><p>Organic cotton, recycled fibers, and innovative sustainable textiles.</p>', [LearningLevel.GRADUATE]: '<h2>Circular Fashion</h2><p>Clothing rental, resale, recycling, and design for longevity.</p>', [LearningLevel.PHD]: '<h2>Fashion System Research</h2><p>Industry transformation pathways and consumer behavior change.</p>' } }],
  activities: [{ id: 'fashion-act-1', title: 'Wardrobe Audit', type: 'STEP_GUIDED', description: 'Evaluate your clothing for sustainability', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'fashion-game', title: 'Sustainable Stylist', type: 'puzzle', description: 'Create outfits from sustainable sources', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'fashion-q1', question: 'What should you do with clothes you outgrow?', options: ['Donate them to others', 'Throw them in the trash', 'Leave them in your closet', 'Burn them'], correctAnswer: 0, explanation: 'Donating clothes gives them a second life and keeps them out of landfills.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 12: Electronic Waste
export const electronicWaste: Module = {
  id: 'zw-e-waste', slug: 'electronic-waste', title: 'Electronic Waste Management',
  description: { [LearningLevel.ELEMENTARY]: 'Learn what happens to old phones and computers!', [LearningLevel.MIDDLE_SCHOOL]: 'Understand e-waste problems and how to dispose of electronics responsibly.', [LearningLevel.HIGH_SCHOOL]: 'Analyze e-waste composition, health hazards, and recycling processes.', [LearningLevel.UNDERGRADUATE]: 'Evaluate e-waste policy, extended producer responsibility, and urban mining.', [LearningLevel.GRADUATE]: 'Research e-waste flows, informal recycling, and formalization strategies.', [LearningLevel.PHD]: 'Investigate e-waste recovery technologies, global flows, and circular electronics.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'ewaste-1', title: 'Old Electronics', content: { [LearningLevel.ELEMENTARY]: '<h2>What Happens to Old Gadgets?</h2><p>Electronics have special materials that need special recycling. Never throw them in the trash!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>E-Waste Problems</h2><p>Toxic materials, valuable metals, and the importance of proper disposal.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>E-Waste Composition</h2><p>Precious metals, rare earths, hazardous substances, and recycling challenges.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Urban Mining</h2><p>Recovering valuable materials from e-waste as an alternative to primary mining.</p>', [LearningLevel.GRADUATE]: '<h2>Global E-Waste Flows</h2><p>International movement of e-waste, informal recycling, and environmental justice.</p>', [LearningLevel.PHD]: '<h2>E-Waste Research</h2><p>Recovery technologies, design for recycling, and circular electronics systems.</p>' } }],
  activities: [{ id: 'ewaste-act-1', title: 'E-Waste Sorter', type: 'PUZZLE', description: 'Identify proper disposal methods for electronics', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'ewaste-game', title: 'E-Waste Expert', type: 'puzzle', description: 'Sort and recycle electronic components', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'ewaste-q1', question: 'Where should you take old electronics?', options: ['To a special e-waste recycling center', 'In the regular trash', 'Bury them in the yard', 'Throw them in a lake'], correctAnswer: 0, explanation: 'Electronics contain special materials and must be recycled at designated centers.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 13: Green Cleaning
export const greenCleaning: Module = {
  id: 'zw-green-cleaning', slug: 'green-cleaning', title: 'Green Cleaning Products',
  description: { [LearningLevel.ELEMENTARY]: 'Make your own safe cleaning supplies from simple ingredients!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn about non-toxic cleaning alternatives and DIY recipes.', [LearningLevel.HIGH_SCHOOL]: 'Analyze cleaning product ingredients, health impacts, and sustainable alternatives.', [LearningLevel.UNDERGRADUATE]: 'Evaluate green cleaning chemistry, certification standards, and market trends.', [LearningLevel.GRADUATE]: 'Research cleaning product impacts on indoor air quality and aquatic systems.', [LearningLevel.PHD]: 'Investigate green chemistry principles and safer chemical design for cleaning.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'cleaning-1', title: 'Natural Cleaners', content: { [LearningLevel.ELEMENTARY]: '<h2>Nature\'s Cleaners!</h2><p>Vinegar, baking soda, and lemon can clean almost anything! No scary chemicals needed!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>DIY Cleaning Recipes</h2><p>All-purpose cleaners, window wash, and scrubs from simple ingredients.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Cleaning Chemistry</h2><p>How cleaners work, what makes them effective, and safer alternatives.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Green Chemistry Principles</h2><p>Designing cleaning products that are effective and environmentally safe.</p>', [LearningLevel.GRADUATE]: '<h2>Indoor Air Quality</h2><p>How cleaning products affect the air we breathe indoors.</p>', [LearningLevel.PHD]: '<h2>Safer Chemical Design</h2><p>Molecular design for effective, biodegradable, non-toxic cleaners.</p>' } }],
  activities: [{ id: 'cleaning-act-1', title: 'DIY Cleaner Lab', type: 'STEP_GUIDED', description: 'Make eco-friendly cleaning products', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'cleaning-game', title: 'Green Clean Challenge', type: 'puzzle', description: 'Match cleaning needs with natural solutions', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'cleaning-q1', question: 'What natural ingredients can clean your home?', options: ['Vinegar, baking soda, and lemon', 'Only expensive chemicals', 'Nothing natural works', 'Magic potions'], correctAnswer: 0, explanation: 'Common kitchen ingredients like vinegar and baking soda are great cleaners.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 14: Zero Waste Kitchen
export const zeroWasteKitchen: Module = {
  id: 'zw-kitchen', slug: 'zero-waste-kitchen', title: 'Zero Waste Kitchen',
  description: { [LearningLevel.ELEMENTARY]: 'Make your kitchen a waste-free zone!', [LearningLevel.MIDDLE_SCHOOL]: 'Transform your kitchen into a zero waste hub.', [LearningLevel.HIGH_SCHOOL]: 'Implement comprehensive kitchen waste reduction strategies.', [LearningLevel.UNDERGRADUATE]: 'Analyze kitchen systems for waste prevention and resource efficiency.', [LearningLevel.GRADUATE]: 'Research household waste patterns and behavioral interventions.', [LearningLevel.PHD]: 'Investigate kitchen waste dynamics and intervention effectiveness.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'kitchen-1', title: 'Kitchen Without Waste', content: { [LearningLevel.ELEMENTARY]: '<h2>Zero Waste Kitchen!</h2><p>Use cloth napkins, reusable containers, and compost food scraps!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Kitchen Swaps</h2><p>Replace disposables with reusables: beeswax wraps, cloth bags, glass containers.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Kitchen Systems</h2><p>Meal planning, bulk buying, proper storage to minimize waste.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Kitchen Efficiency</h2><p>Resource flow analysis, waste stream mapping, optimization strategies.</p>', [LearningLevel.GRADUATE]: '<h2>Household Behavior</h2><p>Understanding and changing waste-generating behaviors in households.</p>', [LearningLevel.PHD]: '<h2>Kitchen Waste Research</h2><p>Intervention studies, measurement methods, and behavior persistence.</p>' } }],
  activities: [{ id: 'kitchen-act-1', title: 'Kitchen Makeover', type: 'STEP_GUIDED', description: 'Transform your kitchen to zero waste', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'kitchen-game', title: 'Zero Waste Chef', type: 'simulation', description: 'Run a kitchen with zero waste', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'kitchen-q1', question: 'What can replace plastic wrap?', options: ['Beeswax wraps or containers with lids', 'More plastic wrap', 'Aluminum foil only', 'Nothing works as well'], correctAnswer: 0, explanation: 'Beeswax wraps and reusable containers are great plastic wrap alternatives.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 15: Zero Waste Bathroom
export const zeroWasteBathroom: Module = {
  id: 'zw-bathroom', slug: 'zero-waste-bathroom', title: 'Zero Waste Bathroom',
  description: { [LearningLevel.ELEMENTARY]: 'Keep your bathroom clean and green!', [LearningLevel.MIDDLE_SCHOOL]: 'Eliminate plastic and waste from your bathroom routine.', [LearningLevel.HIGH_SCHOOL]: 'Analyze bathroom product impacts and sustainable alternatives.', [LearningLevel.UNDERGRADUATE]: 'Evaluate personal care product supply chains and green chemistry.', [LearningLevel.GRADUATE]: 'Research cosmetics industry sustainability and regulatory frameworks.', [LearningLevel.PHD]: 'Investigate personal care product formulation and environmental fate.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'bathroom-1', title: 'Green Bathroom', content: { [LearningLevel.ELEMENTARY]: '<h2>Bathroom Without Waste!</h2><p>Bamboo toothbrushes, bar soap, and reusable containers make bathrooms earth-friendly!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Bathroom Swaps</h2><p>Shampoo bars, safety razors, and plastic-free alternatives.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Personal Care Impacts</h2><p>Microplastics, chemicals, and packaging - understanding bathroom product footprints.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Green Personal Care</h2><p>Formulation, certification, and supply chain considerations.</p>', [LearningLevel.GRADUATE]: '<h2>Cosmetics Regulation</h2><p>Safety testing, environmental assessment, and policy frameworks.</p>', [LearningLevel.PHD]: '<h2>Personal Care Research</h2><p>Product environmental fate, aquatic toxicity, and safer formulations.</p>' } }],
  activities: [{ id: 'bathroom-act-1', title: 'Bathroom Audit', type: 'STEP_GUIDED', description: 'Evaluate and improve bathroom sustainability', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'bathroom-game', title: 'Green Bathroom Builder', type: 'puzzle', description: 'Build a zero waste bathroom', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'bathroom-q1', question: 'What is a plastic-free alternative to liquid shampoo bottles?', options: ['Shampoo bars', 'Bigger bottles', 'Use less shampoo', 'Nothing'], correctAnswer: 0, explanation: 'Shampoo bars work great and eliminate plastic bottles entirely.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 16: Bulk Shopping
export const bulkShopping: Module = {
  id: 'zw-bulk-shopping', slug: 'bulk-shopping', title: 'Bulk Shopping Basics',
  description: { [LearningLevel.ELEMENTARY]: 'Bring your own containers and buy just what you need!', [LearningLevel.MIDDLE_SCHOOL]: 'Master the art of package-free bulk shopping.', [LearningLevel.HIGH_SCHOOL]: 'Analyze bulk shopping systems, economics, and environmental benefits.', [LearningLevel.UNDERGRADUATE]: 'Evaluate bulk retail models, supply chains, and consumer behavior.', [LearningLevel.GRADUATE]: 'Research package-free retail systems and scaling challenges.', [LearningLevel.PHD]: 'Investigate bulk retail innovation and systemic packaging reduction.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'bulk-1', title: 'Bulk Shopping 101', content: { [LearningLevel.ELEMENTARY]: '<h2>Bring Your Own!</h2><p>Bring jars and bags to the store. Fill them with pasta, rice, nuts, and more!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>How to Bulk Shop</h2><p>Find bulk stores, bring containers, weigh before filling, save packaging!</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Bulk Economics</h2><p>Cost comparison, food waste reduction, and quality considerations.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Bulk Retail Models</h2><p>Store design, supply chain, hygiene requirements, and business viability.</p>', [LearningLevel.GRADUATE]: '<h2>Scaling Bulk Systems</h2><p>Infrastructure, consumer acceptance, and mainstreaming challenges.</p>', [LearningLevel.PHD]: '<h2>Package-Free Retail Research</h2><p>System innovation, behavior change, and environmental impact assessment.</p>' } }],
  activities: [{ id: 'bulk-act-1', title: 'Bulk Shopping Planner', type: 'STEP_GUIDED', description: 'Plan a package-free shopping trip', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'bulk-game', title: 'Bulk Shopping Pro', type: 'simulation', description: 'Complete a shopping trip with zero packaging', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'bulk-q1', question: 'What should you bring to a bulk store?', options: ['Reusable containers and bags', 'Nothing, use store bags', 'Extra plastic bags', 'Disposable containers'], correctAnswer: 0, explanation: 'Bringing your own containers is the key to package-free bulk shopping.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 17: Second-Hand Shopping
export const secondHandShopping: Module = {
  id: 'zw-secondhand', slug: 'secondhand-shopping', title: 'Second-Hand Shopping',
  description: { [LearningLevel.ELEMENTARY]: 'Find treasures that someone else loved first!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover the benefits and joy of buying second-hand.', [LearningLevel.HIGH_SCHOOL]: 'Analyze second-hand markets, environmental benefits, and quality assessment.', [LearningLevel.UNDERGRADUATE]: 'Evaluate resale economy, platform economics, and sustainability impacts.', [LearningLevel.GRADUATE]: 'Research circular retail, product lifetime extension, and market dynamics.', [LearningLevel.PHD]: 'Investigate second-hand market effects on production and consumption patterns.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'secondhand-1', title: 'Pre-Loved Treasures', content: { [LearningLevel.ELEMENTARY]: '<h2>Second-Hand is First-Rate!</h2><p>Thrift stores and garage sales have amazing finds that save resources!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Thrifting Tips</h2><p>Where to shop, what to look for, and how to find great deals.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Resale Benefits</h2><p>Environmental savings, cost savings, and unique finds through second-hand.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Resale Economy</h2><p>Platform business models, authentication, and market growth.</p>', [LearningLevel.GRADUATE]: '<h2>Circular Retail</h2><p>Take-back programs, resale integration, and brand strategies.</p>', [LearningLevel.PHD]: '<h2>Resale Research</h2><p>Market effects on new production, consumer behavior, and sustainability claims.</p>' } }],
  activities: [{ id: 'secondhand-act-1', title: 'Thrift Hunt', type: 'SIMULATION', description: 'Find items second-hand instead of new', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'secondhand-game', title: 'Thrift Master', type: 'simulation', description: 'Score the best second-hand finds', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'secondhand-q1', question: 'Why is buying second-hand good for the planet?', options: ['It gives items a longer life and saves resources', 'New things are always better', 'It doesn\'t make a difference', 'Second-hand things are dirty'], correctAnswer: 0, explanation: 'Buying second-hand extends product life and reduces demand for new production.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 18: Zero Waste Events
export const zeroWasteEvents: Module = {
  id: 'zw-events', slug: 'zero-waste-events', title: 'Zero Waste Events',
  description: { [LearningLevel.ELEMENTARY]: 'Have parties that are fun AND earth-friendly!', [LearningLevel.MIDDLE_SCHOOL]: 'Plan celebrations that create minimal waste.', [LearningLevel.HIGH_SCHOOL]: 'Design and execute zero waste events and gatherings.', [LearningLevel.UNDERGRADUATE]: 'Analyze event sustainability certification and management systems.', [LearningLevel.GRADUATE]: 'Research large-scale event sustainability and waste diversion strategies.', [LearningLevel.PHD]: 'Investigate event waste systems and behavioral interventions at scale.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'events-1', title: 'Party Green', content: { [LearningLevel.ELEMENTARY]: '<h2>Parties Without Trash!</h2><p>Use real plates, cloth napkins, and decorations you can reuse!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Zero Waste Celebrations</h2><p>Reusable decorations, digital invites, sustainable food service.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Event Planning</h2><p>Venue selection, vendor requirements, and waste diversion at events.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Event Certification</h2><p>ISO 20121, green event standards, and third-party verification.</p>', [LearningLevel.GRADUATE]: '<h2>Large Event Management</h2><p>Stadium events, festivals, and mass gathering waste strategies.</p>', [LearningLevel.PHD]: '<h2>Event Waste Research</h2><p>Crowd behavior, signage effectiveness, and infrastructure optimization.</p>' } }],
  activities: [{ id: 'events-act-1', title: 'Party Planner', type: 'SCENARIO', description: 'Plan a zero waste celebration', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'events-game', title: 'Green Party Host', type: 'simulation', description: 'Host events with minimal waste', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'events-q1', question: 'How can you have a zero waste party?', options: ['Use real dishes and reusable decorations', 'Use lots of disposable items', 'Buy new decorations each time', 'Use paper plates only'], correctAnswer: 0, explanation: 'Reusable dishes and decorations dramatically reduce party waste.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 19: Recycling Right
export const recyclingRight: Module = {
  id: 'zw-recycling', slug: 'recycling-right', title: 'Recycling Right',
  description: { [LearningLevel.ELEMENTARY]: 'Learn the rules of recycling to do it right!', [LearningLevel.MIDDLE_SCHOOL]: 'Understand what can and cannot be recycled and why.', [LearningLevel.HIGH_SCHOOL]: 'Analyze recycling systems, contamination issues, and market dynamics.', [LearningLevel.UNDERGRADUATE]: 'Evaluate material recovery facilities, sorting technology, and economics.', [LearningLevel.GRADUATE]: 'Research recycling policy, extended producer responsibility, and markets.', [LearningLevel.PHD]: 'Investigate recycling system optimization and material quality preservation.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'recycling-1', title: 'Recycle Like a Pro', content: { [LearningLevel.ELEMENTARY]: '<h2>Recycling Rules!</h2><p>Clean, dry, and loose - that\'s how recyclables should go in the bin!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>What Goes Where</h2><p>Paper, plastic, metal, glass - learn what your community recycles.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Recycling Systems</h2><p>Single-stream vs source-separated, contamination issues, and end markets.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>MRF Operations</h2><p>Material recovery facility technology, sorting efficiency, and residue rates.</p>', [LearningLevel.GRADUATE]: '<h2>Recycling Policy</h2><p>EPR schemes, deposit systems, and recycled content mandates.</p>', [LearningLevel.PHD]: '<h2>Recycling Research</h2><p>Material quality, closed-loop systems, and infrastructure optimization.</p>' } }],
  activities: [{ id: 'recycling-act-1', title: 'Sorting Challenge', type: 'PUZZLE', description: 'Sort items into correct recycling bins', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'recycling-game', title: 'Recycling Expert', type: 'puzzle', description: 'Master recycling categories', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'recycling-q1', question: 'How should recyclables go in the bin?', options: ['Clean, dry, and loose', 'Dirty is fine', 'In plastic bags', 'Crushed together'], correctAnswer: 0, explanation: 'Clean, dry, loose recyclables prevent contamination and enable proper sorting.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 20: Waste Auditing
export const wasteAuditing: Module = {
  id: 'zw-auditing', slug: 'waste-auditing', title: 'Waste Auditing',
  description: { [LearningLevel.ELEMENTARY]: 'Become a waste detective and find out what you throw away!', [LearningLevel.MIDDLE_SCHOOL]: 'Conduct a waste audit to understand and reduce your trash.', [LearningLevel.HIGH_SCHOOL]: 'Design and execute waste characterization studies.', [LearningLevel.UNDERGRADUATE]: 'Analyze waste audit methodology, data analysis, and improvement planning.', [LearningLevel.GRADUATE]: 'Research organizational waste management and measurement systems.', [LearningLevel.PHD]: 'Investigate waste characterization methods and intervention effectiveness.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'audit-1', title: 'Waste Detective', content: { [LearningLevel.ELEMENTARY]: '<h2>What\'s in Your Trash?</h2><p>Look at what you throw away for a week. You might be surprised!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Conducting an Audit</h2><p>Sort, weigh, and categorize your waste to find reduction opportunities.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Audit Methods</h2><p>Sampling strategies, categorization systems, and data collection.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Waste Characterization</h2><p>Statistical methods, composition analysis, and trend identification.</p>', [LearningLevel.GRADUATE]: '<h2>Organizational Audits</h2><p>Facility-wide assessments, stakeholder engagement, and improvement planning.</p>', [LearningLevel.PHD]: '<h2>Audit Research</h2><p>Methodology development, comparability issues, and predictive modeling.</p>' } }],
  activities: [{ id: 'audit-act-1', title: 'Home Waste Audit', type: 'STEP_GUIDED', description: 'Audit your household waste', estimatedMinutes: 30, interactiveContent: {} }],
  game: { id: 'audit-game', title: 'Waste Detective', type: 'simulation', description: 'Analyze waste and recommend solutions', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'audit-q1', question: 'Why should you audit your waste?', options: ['To see what you throw away and find ways to reduce', 'To make more trash', 'For no reason', 'To keep trash longer'], correctAnswer: 0, explanation: 'Waste audits reveal patterns and opportunities for reduction.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 21: Zero Waste Travel
export const zeroWasteTravel: Module = {
  id: 'zw-travel', slug: 'zero-waste-travel', title: 'Zero Waste Travel',
  description: { [LearningLevel.ELEMENTARY]: 'Explore the world without leaving trash behind!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn to travel light and waste-free.', [LearningLevel.HIGH_SCHOOL]: 'Plan and execute low-waste travel adventures.', [LearningLevel.UNDERGRADUATE]: 'Analyze sustainable tourism, transportation emissions, and accommodation impacts.', [LearningLevel.GRADUATE]: 'Research tourism sustainability, certification systems, and destination management.', [LearningLevel.PHD]: 'Investigate sustainable tourism transitions and carrying capacity models.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'travel-1', title: 'Travel Light', content: { [LearningLevel.ELEMENTARY]: '<h2>Eco-Travelers!</h2><p>Bring a water bottle, reusable bags, and snack containers on trips!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Zero Waste Travel Kit</h2><p>Essential items for waste-free adventures: bottles, utensils, bags.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Sustainable Tourism</h2><p>Transportation choices, accommodation, and destination impacts.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Tourism Impacts</h2><p>Carbon footprint, waste generation, and local community effects.</p>', [LearningLevel.GRADUATE]: '<h2>Destination Management</h2><p>Overtourism, carrying capacity, and sustainability certification.</p>', [LearningLevel.PHD]: '<h2>Tourism Research</h2><p>Sustainability transitions, behavior change, and policy effectiveness.</p>' } }],
  activities: [{ id: 'travel-act-1', title: 'Trip Planner', type: 'SCENARIO', description: 'Plan a zero waste vacation', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'travel-game', title: 'Eco-Traveler', type: 'simulation', description: 'Travel the world waste-free', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'travel-q1', question: 'What should you pack for zero waste travel?', options: ['Reusable water bottle, bags, and utensils', 'Disposable everything', 'Nothing extra', 'Only plastic items'], correctAnswer: 0, explanation: 'A zero waste travel kit with reusables prevents single-use waste on trips.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 22: Sustainable Gifts
export const sustainableGifts: Module = {
  id: 'zw-gifts', slug: 'sustainable-gifts', title: 'Sustainable Gift Giving',
  description: { [LearningLevel.ELEMENTARY]: 'Give gifts that are good for people AND the planet!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn creative, sustainable alternatives to typical gifts.', [LearningLevel.HIGH_SCHOOL]: 'Analyze gift-giving culture and sustainable alternatives.', [LearningLevel.UNDERGRADUATE]: 'Evaluate experiential vs material gifts, wrapping alternatives, and behavior.', [LearningLevel.GRADUATE]: 'Research gift economy, social norms, and sustainable consumption patterns.', [LearningLevel.PHD]: 'Investigate gift-giving behavior change and cultural consumption patterns.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'gifts-1', title: 'Thoughtful Giving', content: { [LearningLevel.ELEMENTARY]: '<h2>Gifts That Care!</h2><p>Homemade gifts, experiences, and presents wrapped in fabric show extra love!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Green Gift Ideas</h2><p>Experiences, consumables, second-hand, homemade, and donations.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Gift Culture</h2><p>Why we give, environmental impacts, and meaningful alternatives.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Experience vs Things</h2><p>Research on happiness, memories, and the hedonic treadmill.</p>', [LearningLevel.GRADUATE]: '<h2>Gift Economy</h2><p>Social exchange, reciprocity norms, and sustainable transitions.</p>', [LearningLevel.PHD]: '<h2>Consumption Research</h2><p>Cultural practices, behavior change, and sustainability transitions.</p>' } }],
  activities: [{ id: 'gifts-act-1', title: 'Gift Generator', type: 'PUZZLE', description: 'Create sustainable gift ideas', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'gifts-game', title: 'Green Gift Giver', type: 'puzzle', description: 'Match gifts to recipients sustainably', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'gifts-q1', question: 'What is a sustainable gift idea?', options: ['An experience like a trip or class', 'More plastic toys', 'Heavily packaged items', 'Disposable items'], correctAnswer: 0, explanation: 'Experiences create memories without generating physical waste.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 23: Municipal Waste Systems
export const municipalWaste: Module = {
  id: 'zw-municipal', slug: 'municipal-waste-systems', title: 'Municipal Waste Systems',
  description: { [LearningLevel.ELEMENTARY]: 'Where does trash go after the truck picks it up?', [LearningLevel.MIDDLE_SCHOOL]: 'Understand how your community manages waste.', [LearningLevel.HIGH_SCHOOL]: 'Analyze municipal solid waste management systems and options.', [LearningLevel.UNDERGRADUATE]: 'Evaluate integrated solid waste management, technology, and planning.', [LearningLevel.GRADUATE]: 'Research waste system optimization, policy instruments, and governance.', [LearningLevel.PHD]: 'Investigate waste system transitions, modeling, and infrastructure planning.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'municipal-1', title: 'Waste Journey', content: { [LearningLevel.ELEMENTARY]: '<h2>Where Does Trash Go?</h2><p>Trucks take trash to sorting facilities, recycling plants, or landfills.</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Waste Infrastructure</h2><p>Collection, transfer stations, MRFs, landfills, and WTE facilities.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Waste Management Options</h2><p>Landfilling, incineration, recycling, composting - comparing approaches.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>ISWM Planning</h2><p>Integrated solid waste management hierarchy and system design.</p>', [LearningLevel.GRADUATE]: '<h2>Waste Governance</h2><p>Public vs private, contracts, regulation, and stakeholder engagement.</p>', [LearningLevel.PHD]: '<h2>Waste Systems Research</h2><p>System dynamics modeling, infrastructure optimization, and transitions.</p>' } }],
  activities: [{ id: 'municipal-act-1', title: 'Waste Journey Map', type: 'SIMULATION', description: 'Track waste through your city system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'municipal-game', title: 'Waste System Manager', type: 'simulation', description: 'Design and run a city waste system', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'municipal-q1', question: 'Where does trash go first after pickup?', options: ['To a sorting or transfer facility', 'Directly to space', 'It disappears', 'Into the ocean'], correctAnswer: 0, explanation: 'Waste is typically taken to sorting or transfer facilities before final processing.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 24: Waste-to-Energy
export const wasteToEnergy: Module = {
  id: 'zw-waste-energy', slug: 'waste-to-energy', title: 'Waste-to-Energy Systems',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how some trash can become electricity!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how waste can be converted to energy.', [LearningLevel.HIGH_SCHOOL]: 'Analyze waste-to-energy technologies, benefits, and controversies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate WTE technology, emissions, and role in waste management.', [LearningLevel.GRADUATE]: 'Research WTE integration, lifecycle impacts, and policy debates.', [LearningLevel.PHD]: 'Investigate WTE optimization, emissions control, and system role.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'wte-1', title: 'Energy from Waste', content: { [LearningLevel.ELEMENTARY]: '<h2>Trash Power!</h2><p>Some facilities burn waste safely to make electricity. Less trash, more power!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>WTE Basics</h2><p>Incineration with energy recovery, gasification, and pyrolysis technologies.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>WTE Technologies</h2><p>Mass burn, RDF, gasification - comparing efficiency and emissions.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>WTE Analysis</h2><p>Energy balance, emissions control, ash management, and economics.</p>', [LearningLevel.GRADUATE]: '<h2>WTE Integration</h2><p>Role in waste hierarchy, recycling impacts, and climate considerations.</p>', [LearningLevel.PHD]: '<h2>WTE Research</h2><p>Emerging technologies, carbon capture, and system optimization.</p>' } }],
  activities: [{ id: 'wte-act-1', title: 'WTE Plant Tour', type: 'SIMULATION', description: 'Virtual tour of a waste-to-energy facility', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'wte-game', title: 'Energy Recovery Manager', type: 'simulation', description: 'Operate a waste-to-energy facility', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'wte-q1', question: 'What does waste-to-energy do?', options: ['Turns trash into electricity', 'Makes more waste', 'Stores waste forever', 'Nothing useful'], correctAnswer: 0, explanation: 'Waste-to-energy facilities convert waste into usable electricity.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 25: Extended Producer Responsibility
export const producerResponsibility: Module = {
  id: 'zw-epr', slug: 'producer-responsibility', title: 'Extended Producer Responsibility',
  description: { [LearningLevel.ELEMENTARY]: 'Learn why companies should help clean up their products!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how manufacturers can be responsible for product end-of-life.', [LearningLevel.HIGH_SCHOOL]: 'Analyze EPR policies, implementation, and effectiveness.', [LearningLevel.UNDERGRADUATE]: 'Evaluate EPR program design, funding mechanisms, and outcomes.', [LearningLevel.GRADUATE]: 'Research EPR policy effectiveness, design principles, and evolution.', [LearningLevel.PHD]: 'Investigate EPR system optimization and innovation incentives.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'epr-1', title: 'Producer Responsibility', content: { [LearningLevel.ELEMENTARY]: '<h2>Who Cleans Up?</h2><p>Companies should help recycle the things they make. It\'s only fair!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>EPR Basics</h2><p>Manufacturers pay for collection and recycling of their products.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>EPR Programs</h2><p>Packaging EPR, electronics take-back, tire recycling, and more.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>EPR Design</h2><p>Fee structures, collection targets, eco-modulation, and governance.</p>', [LearningLevel.GRADUATE]: '<h2>EPR Effectiveness</h2><p>Recycling rates, design changes, and free-rider problems.</p>', [LearningLevel.PHD]: '<h2>EPR Research</h2><p>Innovation incentives, system optimization, and policy evolution.</p>' } }],
  activities: [{ id: 'epr-act-1', title: 'EPR Program Designer', type: 'SCENARIO', description: 'Design an EPR program for a product category', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'epr-game', title: 'EPR Policy Maker', type: 'simulation', description: 'Create effective producer responsibility policies', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'epr-q1', question: 'What is extended producer responsibility?', options: ['Companies help recycle their products', 'Customers do everything', 'No one is responsible', 'Only landfills matter'], correctAnswer: 0, explanation: 'EPR makes producers responsible for the end-of-life of their products.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 26: Hazardous Waste Handling
export const hazardousWaste: Module = {
  id: 'zw-hazardous', slug: 'hazardous-waste', title: 'Hazardous Waste Handling',
  description: { [LearningLevel.ELEMENTARY]: 'Some waste is dangerous - learn how to handle it safely!', [LearningLevel.MIDDLE_SCHOOL]: 'Understand hazardous household waste and proper disposal.', [LearningLevel.HIGH_SCHOOL]: 'Analyze hazardous waste categories, handling, and disposal methods.', [LearningLevel.UNDERGRADUATE]: 'Evaluate hazardous waste regulation, treatment, and management.', [LearningLevel.GRADUATE]: 'Research hazardous waste remediation, liability, and technology.', [LearningLevel.PHD]: 'Investigate hazardous waste chemistry, treatment innovation, and risk.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'hazardous-1', title: 'Dangerous Waste', content: { [LearningLevel.ELEMENTARY]: '<h2>Be Careful!</h2><p>Batteries, paint, and chemicals need special disposal. Never put them in regular trash!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Household Hazardous Waste</h2><p>Paints, cleaners, pesticides, batteries - what makes them hazardous.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>HHW Categories</h2><p>Ignitable, corrosive, reactive, toxic - RCRA hazardous waste characteristics.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>HazWaste Regulation</h2><p>RCRA, cradle-to-grave tracking, TSDFs, and manifest systems.</p>', [LearningLevel.GRADUATE]: '<h2>Remediation</h2><p>Brownfield cleanup, treatment technologies, and liability frameworks.</p>', [LearningLevel.PHD]: '<h2>HazWaste Research</h2><p>Treatment innovation, risk assessment, and emerging contaminants.</p>' } }],
  activities: [{ id: 'hazardous-act-1', title: 'HazWaste Identifier', type: 'PUZZLE', description: 'Identify and sort hazardous household items', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'hazardous-game', title: 'HazWaste Handler', type: 'puzzle', description: 'Properly dispose of hazardous materials', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'hazardous-q1', question: 'Where should batteries and paint go?', options: ['To special hazardous waste collection', 'In the regular trash', 'Down the drain', 'In the recycling bin'], correctAnswer: 0, explanation: 'Batteries and paint are hazardous and need special collection.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 27: Industrial Waste Reduction
export const industrialWaste: Module = {
  id: 'zw-industrial', slug: 'industrial-waste', title: 'Industrial Waste Reduction',
  description: { [LearningLevel.ELEMENTARY]: 'Factories can be clean too - learn how!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how businesses reduce their waste.', [LearningLevel.HIGH_SCHOOL]: 'Analyze industrial waste streams and reduction strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate industrial ecology, cleaner production, and waste minimization.', [LearningLevel.GRADUATE]: 'Research industrial waste exchanges and eco-industrial parks.', [LearningLevel.PHD]: 'Investigate industrial metabolism and systemic waste prevention.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'industrial-1', title: 'Clean Factories', content: { [LearningLevel.ELEMENTARY]: '<h2>Green Factories!</h2><p>Smart factories use everything and waste nothing. They\'re like nature!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Business Waste</h2><p>Office waste, manufacturing scrap, and commercial waste reduction.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Waste Streams</h2><p>Mapping industrial waste flows and finding reduction opportunities.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Cleaner Production</h2><p>Process optimization, material substitution, and closed-loop systems.</p>', [LearningLevel.GRADUATE]: '<h2>Industrial Symbiosis</h2><p>Waste exchanges, eco-industrial parks, and collaborative networks.</p>', [LearningLevel.PHD]: '<h2>Industrial Ecology</h2><p>Material flow analysis, industrial metabolism, and system design.</p>' } }],
  activities: [{ id: 'industrial-act-1', title: 'Factory Optimizer', type: 'SIMULATION', description: 'Reduce waste in a virtual factory', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'industrial-game', title: 'Industrial Ecologist', type: 'simulation', description: 'Design zero-waste industrial systems', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'industrial-q1', question: 'What is industrial symbiosis?', options: ['Factories sharing waste as resources', 'Factories making more waste', 'Factories competing', 'Factories closing down'], correctAnswer: 0, explanation: 'Industrial symbiosis means one factory\'s waste becomes another\'s resource.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 28: Waste Policy and Advocacy
export const wastePolicy: Module = {
  id: 'zw-policy', slug: 'waste-policy-advocacy', title: 'Waste Policy and Advocacy',
  description: { [LearningLevel.ELEMENTARY]: 'Your voice matters - speak up for less waste!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn how to advocate for better waste policies.', [LearningLevel.HIGH_SCHOOL]: 'Analyze waste policy instruments and effective advocacy.', [LearningLevel.UNDERGRADUATE]: 'Evaluate waste policy frameworks, implementation, and effectiveness.', [LearningLevel.GRADUATE]: 'Research policy innovation, stakeholder dynamics, and governance.', [LearningLevel.PHD]: 'Investigate policy effectiveness, behavior change, and institutional factors.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'policy-1', title: 'Be an Advocate', content: { [LearningLevel.ELEMENTARY]: '<h2>Speak Up!</h2><p>Write letters, talk to leaders, and help make rules that protect our planet!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Advocacy Basics</h2><p>How to contact representatives, sign petitions, and join campaigns.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Policy Tools</h2><p>Bans, taxes, mandates, incentives - how policy shapes waste behavior.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Policy Analysis</h2><p>Comparing policy instruments, implementation challenges, and outcomes.</p>', [LearningLevel.GRADUATE]: '<h2>Policy Innovation</h2><p>Policy diffusion, experimentation, and learning across jurisdictions.</p>', [LearningLevel.PHD]: '<h2>Policy Research</h2><p>Effectiveness evaluation, institutional analysis, and policy design.</p>' } }],
  activities: [{ id: 'policy-act-1', title: 'Advocate Training', type: 'SCENARIO', description: 'Practice advocacy for waste reduction policies', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'policy-game', title: 'Policy Champion', type: 'simulation', description: 'Pass waste reduction policies', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'policy-q1', question: 'How can you help change waste rules?', options: ['Write letters and talk to leaders', 'Do nothing', 'Make more trash', 'Ignore the problem'], correctAnswer: 0, explanation: 'Advocacy like writing letters helps change policies for the better.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 29: Package-Free Living
export const packageFreeLiving: Module = {
  id: 'zw-package-free', slug: 'package-free-living', title: 'Package-Free Living',
  description: { [LearningLevel.ELEMENTARY]: 'Imagine life with no packaging to throw away!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn strategies for living without disposable packaging.', [LearningLevel.HIGH_SCHOOL]: 'Implement comprehensive package-free lifestyle strategies.', [LearningLevel.UNDERGRADUATE]: 'Analyze packaging-free systems, challenges, and market alternatives.', [LearningLevel.GRADUATE]: 'Research packaging prevention, behavioral barriers, and system design.', [LearningLevel.PHD]: 'Investigate packaging-free transitions and infrastructure requirements.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'packagefree-1', title: 'No Packaging Needed', content: { [LearningLevel.ELEMENTARY]: '<h2>Bye Bye Packaging!</h2><p>Buy loose produce, bring your own bags, and skip the packaging!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Going Package-Free</h2><p>Farmers markets, bulk stores, and refill stations make it possible.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Package-Free Strategies</h2><p>DIY products, refillables, and finding unpackaged alternatives.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Package-Free Systems</h2><p>Reuse systems, deposit schemes, and delivery innovations.</p>', [LearningLevel.GRADUATE]: '<h2>Packaging Prevention</h2><p>Upstream solutions, business model shifts, and infrastructure needs.</p>', [LearningLevel.PHD]: '<h2>Packaging Research</h2><p>System transitions, consumer acceptance, and scaling challenges.</p>' } }],
  activities: [{ id: 'packagefree-act-1', title: 'Package-Free Week', type: 'SCENARIO', description: 'Plan a week of package-free living', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'packagefree-game', title: 'Package-Free Pro', type: 'simulation', description: 'Live life without disposable packaging', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'packagefree-q1', question: 'How can you avoid packaging?', options: ['Buy loose items and bring your own bags', 'Only buy packaged items', 'Never go shopping', 'Buy more packages'], correctAnswer: 0, explanation: 'Bringing your own containers and buying loose items avoids packaging.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 30: School and Workplace Zero Waste
export const institutionalZeroWaste: Module = {
  id: 'zw-institutional', slug: 'institutional-zero-waste', title: 'School and Workplace Zero Waste',
  description: { [LearningLevel.ELEMENTARY]: 'Make your school a zero waste champion!', [LearningLevel.MIDDLE_SCHOOL]: 'Lead zero waste initiatives at school and beyond.', [LearningLevel.HIGH_SCHOOL]: 'Design and implement institutional zero waste programs.', [LearningLevel.UNDERGRADUATE]: 'Analyze institutional sustainability programs and behavior change.', [LearningLevel.GRADUATE]: 'Research organizational sustainability and change management.', [LearningLevel.PHD]: 'Investigate institutional sustainability transitions and effectiveness.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'institutional-1', title: 'Green Institutions', content: { [LearningLevel.ELEMENTARY]: '<h2>Zero Waste School!</h2><p>Start a green team, set up recycling, and have waste-free lunches!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Leading Change</h2><p>Form clubs, petition for changes, and lead by example.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Program Design</h2><p>Waste audits, infrastructure, signage, and engagement strategies.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Campus Sustainability</h2><p>Zero waste certification, dining sustainability, and procurement.</p>', [LearningLevel.GRADUATE]: '<h2>Change Management</h2><p>Stakeholder engagement, behavior change, and sustainability culture.</p>', [LearningLevel.PHD]: '<h2>Institutional Research</h2><p>Effectiveness measurement, barriers, and success factors.</p>' } }],
  activities: [{ id: 'institutional-act-1', title: 'Green Team Planner', type: 'SCENARIO', description: 'Start a zero waste program at your school', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'institutional-game', title: 'Green Leader', type: 'simulation', description: 'Lead institutional zero waste transformation', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'institutional-q1', question: 'How can you help your school go zero waste?', options: ['Start a green team and set up recycling', 'Do nothing', 'Create more waste', 'Only focus on yourself'], correctAnswer: 0, explanation: 'Starting green initiatives helps entire schools reduce waste.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 31: Ocean Plastic and Marine Debris
export const oceanPlastic: Module = {
  id: 'zw-ocean-plastic', slug: 'ocean-plastic', title: 'Ocean Plastic and Marine Debris',
  description: { [LearningLevel.ELEMENTARY]: 'Help keep plastic out of the ocean!', [LearningLevel.MIDDLE_SCHOOL]: 'Understand how plastic enters oceans and what we can do.', [LearningLevel.HIGH_SCHOOL]: 'Analyze ocean plastic sources, impacts, and prevention strategies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate marine debris science, cleanup efforts, and prevention policy.', [LearningLevel.GRADUATE]: 'Research plastic fate in oceans, ecological impacts, and solutions.', [LearningLevel.PHD]: 'Investigate microplastic dynamics, ecosystem effects, and intervention effectiveness.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'ocean-1', title: 'Protect Our Oceans', content: { [LearningLevel.ELEMENTARY]: '<h2>Save the Seas!</h2><p>Plastic hurts fish, turtles, and birds. Let\'s keep it out of the ocean!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Plastic in the Ocean</h2><p>How plastic gets there, the garbage patches, and impacts on wildlife.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Marine Debris Science</h2><p>Sources, transport pathways, accumulation zones, and degradation.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Cleanup and Prevention</h2><p>Beach cleanups, ocean cleanups, and source reduction strategies.</p>', [LearningLevel.GRADUATE]: '<h2>Ecological Impacts</h2><p>Entanglement, ingestion, habitat effects, and food chain transfer.</p>', [LearningLevel.PHD]: '<h2>Microplastics Research</h2><p>Distribution, fate, biological uptake, and human health implications.</p>' } }],
  activities: [{ id: 'ocean-act-1', title: 'Beach Cleanup Simulator', type: 'SIMULATION', description: 'Organize and conduct a beach cleanup', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'ocean-game', title: 'Ocean Protector', type: 'simulation', description: 'Stop plastic before it reaches the ocean', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'ocean-q1', question: 'How does plastic hurt ocean animals?', options: ['They can eat it or get tangled in it', 'It helps them swim', 'It gives them food', 'It doesn\'t affect them'], correctAnswer: 0, explanation: 'Animals mistake plastic for food or get entangled in it.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 32: Zero Waste Careers
export const zeroWasteCareers: Module = {
  id: 'zw-careers', slug: 'zero-waste-careers', title: 'Zero Waste Careers',
  description: { [LearningLevel.ELEMENTARY]: 'Grow up to help the planet - explore green jobs!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover careers in waste reduction and sustainability.', [LearningLevel.HIGH_SCHOOL]: 'Explore career paths in waste management and circular economy.', [LearningLevel.UNDERGRADUATE]: 'Analyze sustainability career opportunities and required skills.', [LearningLevel.GRADUATE]: 'Research emerging roles in circular economy and waste innovation.', [LearningLevel.PHD]: 'Investigate workforce development for sustainability transitions.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'careers-1', title: 'Green Jobs', content: { [LearningLevel.ELEMENTARY]: '<h2>Jobs That Help!</h2><p>Recycling coordinators, composters, and eco-designers help reduce waste!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Waste Careers</h2><p>Sustainability officers, waste auditors, and environmental educators.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Career Paths</h2><p>Engineering, policy, education, business - many paths to sustainability work.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Skills Development</h2><p>Technical skills, communication, systems thinking for sustainability careers.</p>', [LearningLevel.GRADUATE]: '<h2>Emerging Roles</h2><p>Circular economy specialists, materials scientists, and policy innovators.</p>', [LearningLevel.PHD]: '<h2>Workforce Research</h2><p>Skills gaps, training needs, and workforce transition strategies.</p>' } }],
  activities: [{ id: 'careers-act-1', title: 'Career Explorer', type: 'SIMULATION', description: 'Explore different zero waste career paths', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'careers-game', title: 'Green Career Builder', type: 'simulation', description: 'Build your sustainability career path', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'careers-q1', question: 'What is a job that helps reduce waste?', options: ['Sustainability coordinator', 'Waste maker', 'Trash collector only', 'None of these'], correctAnswer: 0, explanation: 'Sustainability coordinators help organizations reduce waste.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 33: Zero Waste Future
export const zeroWasteFuture: Module = {
  id: 'zw-future', slug: 'zero-waste-future', title: 'Zero Waste Future',
  description: { [LearningLevel.ELEMENTARY]: 'Imagine a world with no waste at all!', [LearningLevel.MIDDLE_SCHOOL]: 'Envision and work toward a zero waste future.', [LearningLevel.HIGH_SCHOOL]: 'Analyze pathways to achieving zero waste societies.', [LearningLevel.UNDERGRADUATE]: 'Evaluate zero waste targets, timelines, and transformation strategies.', [LearningLevel.GRADUATE]: 'Research zero waste city initiatives and success factors.', [LearningLevel.PHD]: 'Investigate systemic pathways to zero waste and transformation dynamics.' },
  topic: 'zero-waste',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'future-1', title: 'Tomorrow\'s World', content: { [LearningLevel.ELEMENTARY]: '<h2>Zero Waste World!</h2><p>Imagine: everything is reused, recycled, or composted. No more landfills!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>The Vision</h2><p>Cities and communities working toward zero waste - it\'s happening now!</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Zero Waste Goals</h2><p>City targets, national policies, and progress toward elimination of waste.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Transformation Strategies</h2><p>Roadmaps, milestones, and key interventions for zero waste transitions.</p>', [LearningLevel.GRADUATE]: '<h2>Zero Waste Cities</h2><p>Case studies, success factors, and replication strategies.</p>', [LearningLevel.PHD]: '<h2>Systems Transformation</h2><p>Deep transitions, lock-in dynamics, and acceleration strategies.</p>' } }],
  activities: [{ id: 'future-act-1', title: 'Future Designer', type: 'SCENARIO', description: 'Design your zero waste community', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'future-game', title: 'Zero Waste World Builder', type: 'simulation', description: 'Build a community with zero waste', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: null, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 300, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 180, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 120, hints: false } } },
  quiz: { questions: [{ id: 'future-q1', question: 'What is the zero waste goal?', options: ['Everything is reused, recycled, or composted', 'Make more trash', 'Only recycle half', 'Give up trying'], correctAnswer: 0, explanation: 'Zero waste means nothing goes to landfill - everything has a next use.', difficulty: LearningLevel.ELEMENTARY }] }
}

export const zeroWasteModules: Module[] = [
  // Standalone modules (4-33)
  plasticReduction,
  sustainablePackaging,
  minimalism,
  repairMaintenance,
  upcyclingDIY,
  sustainableShopping,
  foodWasteReduction,
  sustainableFashion,
  electronicWaste,
  greenCleaning,
  zeroWasteKitchen,
  zeroWasteBathroom,
  bulkShopping,
  secondHandShopping,
  zeroWasteEvents,
  recyclingRight,
  wasteAuditing,
  zeroWasteTravel,
  sustainableGifts,
  municipalWaste,
  wasteToEnergy,
  producerResponsibility,
  hazardousWaste,
  industrialWaste,
  wastePolicy,
  packageFreeLiving,
  institutionalZeroWaste,
  oceanPlastic,
  zeroWasteCareers,
  zeroWasteFuture,
  // Inline modules (1-3)
  // Module 1: Composting Fundamentals
  {
    id: 'zero-waste-composting',
    slug: 'composting-fundamentals',
    title: 'Composting Fundamentals',
    description: {
      ELEMENTARY: 'Turn food scraps into garden gold! Learn how nature recycles everything.',
      MIDDLE_SCHOOL: 'Master the science and art of composting to reduce waste and create rich soil.',
      HIGH_SCHOOL: 'Understand decomposition chemistry, composting methods, and applications at various scales.',
      UNDERGRADUATE: 'Analyze composting systems design, process optimization, and integration with waste management.',
      GRADUATE: 'Evaluate industrial composting, anaerobic digestion, and circular bioeconomy strategies.',
      PHD: 'Research microbial ecology of decomposition, emissions management, and novel organic processing.'
    },
    topic: 'zero-waste',
    category: 'COMPOSTING',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 40, HIGH_SCHOOL: 55, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'compost-lesson-1',
        title: 'What is Composting?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🍂 Nature's Recycling!</h2><div class="intro"><p>In nature, nothing is wasted. When leaves fall and fruits drop, tiny creatures turn them back into soil. Composting is how we help this happen!</p></div><h3>What Can You Compost?</h3><div class="yes-no-grid"><div class="yes"><h4>✅ YES!</h4><ul><li>🍎 Fruit and veggie scraps</li><li>🥚 Eggshells</li><li>🍂 Leaves</li><li>🌱 Grass clippings</li><li>☕ Coffee grounds</li></ul></div><div class="no"><h4>❌ NO!</h4><ul><li>🥩 Meat</li><li>🧀 Dairy</li><li>🛢️ Oils</li><li>🐕 Pet waste</li></ul></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>The Science of Decomposition</h2><h3>What Happens in a Compost Pile?</h3><p>Billions of microorganisms break down organic matter through aerobic (with oxygen) decomposition.</p><h3>The Key Ingredients</h3><ul><li><strong>Greens (Nitrogen):</strong> Food scraps, grass, coffee grounds</li><li><strong>Browns (Carbon):</strong> Leaves, cardboard, straw</li><li><strong>Water:</strong> Moisture for microbes</li><li><strong>Air:</strong> Oxygen for aerobic decomposition</li></ul><h3>The Magic Ratio</h3><p>Aim for roughly 3 parts brown to 1 part green by volume for optimal composting.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Composting Chemistry</h2><h3>C:N Ratio</h3><p>The carbon to nitrogen ratio drives microbial activity:</p><ul><li>Ideal range: 25-30:1</li><li>Too high (>40:1): Slow decomposition</li><li>Too low (<20:1): Nitrogen loss, odors</li></ul><h3>Temperature Phases</h3><ol><li><strong>Mesophilic (20-40°C):</strong> Initial breakdown</li><li><strong>Thermophilic (40-70°C):</strong> Rapid decomposition, pathogen kill</li><li><strong>Cooling:</strong> Slower decomposition continues</li><li><strong>Curing:</strong> Stabilization and maturation</li></ol><h3>Common C:N Ratios</h3><table><tr><th>Material</th><th>C:N</th></tr><tr><td>Food scraps</td><td>15:1</td></tr><tr><td>Grass clippings</td><td>20:1</td></tr><tr><td>Leaves</td><td>50:1</td></tr><tr><td>Cardboard</td><td>350:1</td></tr></table></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Composting Systems Engineering</h2><h3>System Types</h3><ul><li><strong>Windrow:</strong> Long rows, periodic turning, large scale</li><li><strong>Aerated static pile:</strong> Forced aeration, less turning</li><li><strong>In-vessel:</strong> Enclosed systems, process control</li><li><strong>Vermicomposting:</strong> Worm-mediated, lower temperature</li></ul><h3>Process Parameters</h3><ul><li>Moisture: 50-60% optimal</li><li>Oxygen: >5% in pile</li><li>Temperature: 55-65°C for pathogen reduction</li><li>Time: Weeks to months depending on system</li></ul><h3>Quality Standards</h3><p>EPA 40 CFR Part 503 defines Class A (unrestricted use) and Class B compost standards.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Industrial Organic Processing</h2><h3>Anaerobic Digestion</h3><p>Biogas production from organic waste:</p><ul><li>Methane yield: 200-400 m³/ton VS</li><li>Digestate as fertilizer</li><li>Energy balance considerations</li></ul><h3>Emissions Management</h3><ul><li>Methane from anaerobic zones</li><li>Nitrous oxide from nitrogen cycling</li><li>VOCs and odor control</li><li>Biofilter and cover systems</li></ul><h3>Integration with Waste Systems</h3><p>Source separation, contamination management, end-market development.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Organic Processing Research</h2><h3>Microbial Ecology</h3><ul><li>Succession during composting phases</li><li>Functional metagenomics of decomposition</li><li>Inoculant development</li></ul><h3>Emissions Quantification</h3><ul><li>Chamber and mass balance methods</li><li>Flux modeling</li><li>Climate impact assessment</li></ul><h3>Novel Technologies</h3><ul><li>Black soldier fly processing</li><li>Hydrothermal carbonization</li><li>Biorefinery integration</li></ul></div>`
        }
      },
      {
        id: 'compost-lesson-2',
        title: 'Building Your Compost System',
        order: 2,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🏗️ Make Your Own Compost Bin!</h2><h3>Simple Steps</h3><ol><li>Find a spot in your yard (ask a grown-up!)</li><li>Start with a layer of sticks for air</li><li>Add brown stuff (leaves, cardboard)</li><li>Add green stuff (food scraps)</li><li>Keep it moist like a sponge</li><li>Wait and watch the magic happen!</li></ol><div class="tip-box"><p>🐛 You might see worms - they're helpers!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Composting Methods</h2><h3>Bin Composting</h3><p>Enclosed containers keep materials contained and can speed decomposition.</p><h3>Pile Composting</h3><p>Open piles work well for larger quantities of yard waste.</p><h3>Tumbler Composting</h3><p>Rotating drums make turning easy and can produce compost faster.</p><h3>Vermicomposting</h3><p>Red wiggler worms process food scraps indoors - great for apartments!</p><h3>Troubleshooting</h3><ul><li><strong>Smelly?</strong> Too wet or too many greens - add browns</li><li><strong>Not decomposing?</strong> Too dry or too many browns - add water and greens</li><li><strong>Pests?</strong> Bury food scraps, avoid meat/dairy</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Optimizing Your Compost</h2><h3>Monitoring Parameters</h3><ul><li><strong>Temperature:</strong> Use compost thermometer, target 130-150°F</li><li><strong>Moisture:</strong> Squeeze test - should feel like wrung sponge</li><li><strong>Aeration:</strong> Turn every 1-2 weeks or use passive aeration</li></ul><h3>Accelerating Decomposition</h3><ul><li>Smaller particle size increases surface area</li><li>Proper C:N ratio fuels microbes</li><li>Adequate moisture and oxygen</li><li>Larger pile retains heat better</li></ul><h3>Finished Compost Indicators</h3><ul><li>Dark, crumbly texture</li><li>Earthy smell</li><li>Original materials unrecognizable</li><li>Temperature stable near ambient</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>System Design and Management</h2><h3>Site Selection</h3><ul><li>Drainage and runoff management</li><li>Access for materials and equipment</li><li>Buffer zones and neighbors</li><li>Regulatory requirements</li></ul><h3>Process Control</h3><ul><li>Recipe development for feedstock mix</li><li>Monitoring and documentation</li><li>PFRP (Process to Further Reduce Pathogens) compliance</li></ul><h3>End Product Quality</h3><ul><li>Maturity testing (germination, respiration)</li><li>Stability assessment</li><li>Contaminant screening</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Commercial Composting Operations</h2><h3>Facility Design</h3><ul><li>Throughput and retention time calculations</li><li>Equipment selection</li><li>Leachate management</li><li>Odor control systems</li></ul><h3>Economics</h3><ul><li>Tipping fees vs. product sales</li><li>Operating cost structures</li><li>Market development</li></ul><h3>Regulatory Compliance</h3><ul><li>Permit requirements</li><li>Testing and reporting</li><li>Neighbor relations</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Advanced Composting Research</h2><h3>Process Optimization</h3><ul><li>Real-time monitoring systems</li><li>Predictive modeling</li><li>Automation and control</li></ul><h3>Emerging Applications</h3><ul><li>Compost as biofilter medium</li><li>Disease suppressive composts</li><li>Biochar-compost combinations</li></ul><h3>Life Cycle Assessment</h3><p>Comparing composting with other organic waste options across environmental impact categories.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'compost-activity-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Sort the Scraps!',
          MIDDLE_SCHOOL: 'Build a Balanced Pile',
          HIGH_SCHOOL: 'Calculate C:N Ratio',
          UNDERGRADUATE: 'Design a Recipe',
          GRADUATE: 'Facility Layout',
          PHD: 'Process Optimization'
        },
        description: {
          ELEMENTARY: 'Drag items to the compost bin or trash!',
          MIDDLE_SCHOOL: 'Balance greens and browns in your compost.',
          HIGH_SCHOOL: 'Mix materials to achieve optimal C:N ratio.',
          UNDERGRADUATE: 'Design a feedstock recipe for target output.',
          GRADUATE: 'Layout a commercial composting facility.',
          PHD: 'Optimize process parameters for multiple objectives.'
        },
        config: {
          ELEMENTARY: { items: 10, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 12, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 15, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 18, hints: false, timeLimit: 120 },
          GRADUATE: { items: 22, hints: false, timeLimit: 90 },
          PHD: { items: 25, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'compost-game',
      type: 'sorting',
      title: 'Compost Master',
      description: 'Sort materials and build the perfect compost pile!',
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
      id: 'compost-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'cq1',
          question: {
            ELEMENTARY: 'Which of these can go in the compost?',
            MIDDLE_SCHOOL: 'What is the ideal ratio of browns to greens?',
            HIGH_SCHOOL: 'What is the optimal C:N ratio for composting?',
            UNDERGRADUATE: 'What temperature is needed for pathogen reduction (PFRP)?',
            GRADUATE: 'What is the typical methane yield from anaerobic digestion?',
            PHD: 'What microbial phase dominates the thermophilic stage?'
          },
          options: {
            ELEMENTARY: ['Apple cores and leaves', 'Plastic bags', 'Glass bottles', 'Metal cans'],
            MIDDLE_SCHOOL: ['3 parts brown to 1 part green', '1 to 1', 'All browns', 'All greens'],
            HIGH_SCHOOL: ['25-30:1', '100:1', '5:1', '1:1'],
            UNDERGRADUATE: ['55°C for 3+ days', '30°C for 1 day', '80°C for 1 hour', '20°C for 1 week'],
            GRADUATE: ['200-400 m³/ton VS', '10-20 m³/ton VS', '1000+ m³/ton VS', '50 m³/ton VS'],
            PHD: ['Thermophilic bacteria and actinomycetes', 'Psychrophilic fungi', 'Mesophilic protozoa', 'Cryophilic archaea']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Fruit scraps and leaves are perfect for composting!',
            MIDDLE_SCHOOL: 'About 3 parts brown materials to 1 part green gives the right carbon-nitrogen balance.',
            HIGH_SCHOOL: 'A C:N ratio of 25-30:1 provides optimal conditions for microbial decomposition.',
            UNDERGRADUATE: '55°C (131°F) for at least 3 days is required by EPA for pathogen reduction.',
            GRADUATE: 'Typical biogas yields are 200-400 cubic meters per ton of volatile solids.',
            PHD: 'Thermophilic bacteria and actinomycetes dominate at high temperatures (40-70°C).'
          }
        }
      ]
    },
    externalResources: [
      { title: 'EPA Composting Guide', url: 'https://www.epa.gov/recycle/composting-home', type: 'article' },
      { title: 'US Composting Council', url: 'https://www.compostingcouncil.org/', type: 'research' }
    ]
  },
  // Module 2: Circular Economy Principles
  {
    id: 'zero-waste-circular',
    slug: 'circular-economy',
    title: 'Circular Economy Principles',
    description: {
      ELEMENTARY: 'Imagine if nothing was ever thrown away! Learn about the circle of stuff.',
      MIDDLE_SCHOOL: 'Discover how we can design waste out of our systems entirely.',
      HIGH_SCHOOL: 'Understand circular economy frameworks, business models, and design principles.',
      UNDERGRADUATE: 'Analyze circular economy implementation, metrics, and policy frameworks.',
      GRADUATE: 'Evaluate systemic approaches to circularity across sectors and scales.',
      PHD: 'Research circular economy transitions, material flow analysis, and transformation pathways.'
    },
    topic: 'zero-waste',
    category: 'CIRCULAR ECONOMY',
    icon: 'RefreshCw',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'circular-lesson-1',
        title: 'From Linear to Circular',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>♻️ The Circle of Stuff!</h2><h3>The Old Way (Linear)</h3><p>Take → Make → Use → Throw Away 😢</p><h3>The New Way (Circular)</h3><p>Make → Use → Reuse → Remake → Use Again! 😊</p><div class="example"><p>Think of a glass jar: You buy jam, eat it, then use the jar for storage, then recycle it into a new jar!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Linear vs Circular Economy</h2><h3>Linear Economy Problems</h3><ul><li>Resource depletion</li><li>Pollution and waste</li><li>Climate emissions</li><li>Ecosystem destruction</li></ul><h3>Circular Economy Solutions</h3><ul><li><strong>Design out waste:</strong> Products made to last and be reused</li><li><strong>Keep materials in use:</strong> Repair, reuse, recycle</li><li><strong>Regenerate nature:</strong> Return nutrients to ecosystems</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Circular Economy Framework</h2><h3>The Butterfly Diagram</h3><p>Ellen MacArthur Foundation's model shows two cycles:</p><ul><li><strong>Technical cycle:</strong> Products maintained, reused, refurbished, recycled</li><li><strong>Biological cycle:</strong> Organic materials return to biosphere</li></ul><h3>Value Retention Hierarchy</h3><ol><li>Maintain/prolong (highest value)</li><li>Reuse/redistribute</li><li>Refurbish/remanufacture</li><li>Recycle (lowest value retention)</li></ol><h3>Design Principles</h3><ul><li>Design for durability</li><li>Design for disassembly</li><li>Design for recyclability</li><li>Use safe, circular materials</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Circular Business Models</h2><h3>Model Types</h3><ul><li><strong>Product-as-Service:</strong> Access over ownership</li><li><strong>Product Life Extension:</strong> Repair, upgrade services</li><li><strong>Resource Recovery:</strong> Take-back and recycling</li><li><strong>Sharing Platforms:</strong> Collaborative consumption</li><li><strong>Circular Supply:</strong> Renewable/recycled inputs</li></ul><h3>Implementation Challenges</h3><ul><li>Reverse logistics complexity</li><li>Quality and consistency of secondary materials</li><li>Consumer acceptance and behavior change</li><li>Economic viability vs. linear alternatives</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Systemic Circularity</h2><h3>Industrial Symbiosis</h3><p>Waste from one industry becomes feedstock for another (e.g., Kalundborg, Denmark).</p><h3>Urban Metabolism</h3><p>Material and energy flows through cities - opportunities for circular urban systems.</p><h3>Policy Instruments</h3><ul><li>Extended Producer Responsibility</li><li>Green public procurement</li><li>Material taxes and virgin material levies</li><li>Right to repair legislation</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Circular Economy Research</h2><h3>Material Flow Analysis</h3><p>Tracking materials through economy to identify intervention points.</p><h3>Circularity Metrics</h3><ul><li>Material Circularity Indicator</li><li>Circular Economy Index</li><li>Resource efficiency metrics</li><li>Value retention measures</li></ul><h3>Transition Research</h3><ul><li>Socio-technical transitions</li><li>Business model innovation</li><li>Consumer practice change</li><li>Policy coherence</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'circular-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Follow the Circle!',
          MIDDLE_SCHOOL: 'Design a Circular Product',
          HIGH_SCHOOL: 'Business Model Canvas',
          UNDERGRADUATE: 'Circular System Design',
          GRADUATE: 'Industrial Symbiosis Network',
          PHD: 'Material Flow Model'
        },
        description: {
          ELEMENTARY: 'Help products go around the circle instead of to trash!',
          MIDDLE_SCHOOL: 'Design a product that can be reused and recycled.',
          HIGH_SCHOOL: 'Create a circular business model for a product.',
          UNDERGRADUATE: 'Design a circular system for a product category.',
          GRADUATE: 'Map industrial symbiosis opportunities in a region.',
          PHD: 'Build a material flow analysis model.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 8 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 12 },
          GRADUATE: { complexity: 'expert', variables: 18 },
          PHD: { complexity: 'research', variables: 25 }
        }
      }
    ],
    game: {
      id: 'circular-game',
      type: 'puzzle',
      title: 'Circular Challenge',
      description: 'Complete the circular economy loops!',
      rounds: 5,
      timeLimit: 35,
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
      id: 'circular-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'cirq1',
          question: {
            ELEMENTARY: 'In a circular economy, what happens to old products?',
            MIDDLE_SCHOOL: 'What are the three principles of circular economy?',
            HIGH_SCHOOL: 'In the value retention hierarchy, what preserves the most value?',
            UNDERGRADUATE: 'What is a product-as-service business model?',
            GRADUATE: 'What is industrial symbiosis?',
            PHD: 'What metric measures material circularity at product level?'
          },
          options: {
            ELEMENTARY: ['They get reused or recycled', 'They all go to landfill', 'They disappear', 'They go to space'],
            MIDDLE_SCHOOL: ['Design out waste, keep materials in use, regenerate nature', 'Take, make, dispose', 'Buy, use, throw', 'Mine, manufacture, dump'],
            HIGH_SCHOOL: ['Maintain/prolong', 'Recycle', 'Incinerate', 'Landfill'],
            UNDERGRADUATE: ['Customers pay for access/use rather than ownership', 'Selling products as fast as possible', 'Only selling services', 'Free products'],
            GRADUATE: ['Waste from one industry becomes input for another', 'Industries competing for resources', 'Factories working alone', 'Outsourcing production'],
            PHD: ['Material Circularity Indicator (MCI)', 'GDP', 'Carbon footprint', 'Water footprint']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'In a circular economy, things are reused, repaired, and recycled instead of thrown away!',
            MIDDLE_SCHOOL: 'The three principles are: design out waste, keep materials in use, and regenerate natural systems.',
            HIGH_SCHOOL: 'Maintaining and prolonging product use preserves the most embedded value.',
            UNDERGRADUATE: 'Product-as-service means customers pay for the function/outcome rather than owning the product.',
            GRADUATE: 'Industrial symbiosis creates networks where one facility\'s waste becomes another\'s resource.',
            PHD: 'The Material Circularity Indicator measures how restorative material flows are for a product.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Ellen MacArthur Foundation', url: 'https://ellenmacarthurfoundation.org/', type: 'research' },
      { title: 'Circular Economy Club', url: 'https://www.circulareconomyclub.com/', type: 'article' }
    ]
  },
  // MASTERCLASS: Zero Waste Lifestyle Transformation
  {
    id: 'zero-waste-masterclass',
    slug: 'zero-waste-masterclass',
    title: 'Zero Waste Lifestyle Masterclass',
    description: {
      ELEMENTARY: 'Become a zero waste superhero! Learn to make almost no trash.',
      MIDDLE_SCHOOL: 'Master the art of reducing, reusing, and living with less waste.',
      HIGH_SCHOOL: 'Comprehensive guide to zero waste living, from personal choices to systemic change.',
      UNDERGRADUATE: 'Advanced analysis of waste reduction strategies, behavior change, and policy.',
      GRADUATE: 'Expert examination of waste systems transformation and circular transitions.',
      PHD: 'Research synthesis of waste prevention, behavior science, and system innovation.'
    },
    topic: 'zero-waste',
    category: 'MASTERCLASS',
    icon: 'Award',
    color: 'moss',
    duration: { ELEMENTARY: 45, MIDDLE_SCHOOL: 60, HIGH_SCHOOL: 90, UNDERGRADUATE: 120, GRADUATE: 150, PHD: 180 },
    isMasterclass: true,
    hasVideo: true,
    lessons: [
      {
        id: 'master-zw-1',
        title: 'The Zero Waste Journey',
        order: 1,
        duration: 20,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌟 Your Zero Waste Adventure!</h2><h3>The 5 R's</h3><ol><li><strong>Refuse</strong> - Say no to things you don't need</li><li><strong>Reduce</strong> - Use less stuff</li><li><strong>Reuse</strong> - Use things again and again</li><li><strong>Recycle</strong> - Turn old into new</li><li><strong>Rot</strong> - Compost food scraps</li></ol><div class="challenge"><p>Can you go one whole day without making any trash?</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Zero Waste Fundamentals</h2><h3>The Waste Hierarchy</h3><ol><li>Prevention (best)</li><li>Minimization</li><li>Reuse</li><li>Recycling</li><li>Energy recovery</li><li>Disposal (worst)</li></ol><h3>Starting Your Journey</h3><ul><li>Audit your trash - what do you throw away most?</li><li>Start with easy swaps (reusable bags, bottles)</li><li>Progress to harder changes over time</li><li>Don't aim for perfection - progress matters!</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Zero Waste Systems Thinking</h2><h3>Personal vs Systemic</h3><p>Individual actions matter, but systemic change is essential:</p><ul><li>Producer responsibility for packaging</li><li>Infrastructure for reuse and repair</li><li>Policy to internalize waste costs</li></ul><h3>Life Cycle Perspective</h3><p>Consider full impacts: production, use, and end-of-life.</p><h3>Effective Interventions</h3><ul><li>High-impact swaps (e.g., eliminating single-use plastics)</li><li>Behavior change that sticks</li><li>Advocacy for systemic solutions</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Waste Prevention Science</h2><h3>Behavioral Economics</h3><ul><li>Default effects</li><li>Social norms</li><li>Commitment devices</li><li>Feedback and salience</li></ul><h3>Policy Instruments</h3><ul><li>Bans and restrictions</li><li>Economic incentives (taxes, fees)</li><li>Information and labeling</li><li>Infrastructure investment</li></ul><h3>Measuring Success</h3><ul><li>Per capita waste generation</li><li>Diversion rates</li><li>Material recovery quality</li><li>Upstream indicators</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Waste System Transformation</h2><h3>Transition Management</h3><p>Long-term, multi-stakeholder approach to system change.</p><h3>Innovation Systems</h3><ul><li>Niche experiments and scaling</li><li>Regime destabilization</li><li>Landscape pressures</li></ul><h3>Justice Considerations</h3><ul><li>Waste worker impacts</li><li>Community burden distribution</li><li>Access to alternatives</li><li>Global waste trade</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Waste Research Frontiers</h2><h3>Behavioral Research</h3><ul><li>Long-term behavior persistence</li><li>Spillover effects</li><li>Identity and values</li></ul><h3>Systems Modeling</h3><ul><li>Agent-based models of waste behavior</li><li>System dynamics of waste flows</li><li>Scenario analysis</li></ul><h3>Innovation Research</h3><ul><li>Business model experimentation</li><li>Policy innovation</li><li>Social innovation</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'master-zw-activity-1',
        type: 'SCENARIO',
        title: {
          ELEMENTARY: 'A Day Without Trash',
          MIDDLE_SCHOOL: 'Zero Waste Week',
          HIGH_SCHOOL: 'Household Audit',
          UNDERGRADUATE: 'Campus Zero Waste Plan',
          GRADUATE: 'City Waste Strategy',
          PHD: 'Transition Pathway Design'
        },
        description: {
          ELEMENTARY: 'Make choices throughout a day to avoid creating trash!',
          MIDDLE_SCHOOL: 'Plan a week of zero waste living.',
          HIGH_SCHOOL: 'Audit household waste and design reduction strategies.',
          UNDERGRADUATE: 'Develop a zero waste plan for a campus.',
          GRADUATE: 'Design a city-wide waste reduction strategy.',
          PHD: 'Model transition pathways to zero waste systems.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', choices: 8 },
          MIDDLE_SCHOOL: { complexity: 'simple', choices: 12 },
          HIGH_SCHOOL: { complexity: 'intermediate', choices: 16 },
          UNDERGRADUATE: { complexity: 'advanced', choices: 20 },
          GRADUATE: { complexity: 'expert', choices: 25 },
          PHD: { complexity: 'research', choices: 30 }
        }
      }
    ],
    game: {
      id: 'master-zw-game',
      type: 'timed_challenge',
      title: 'Zero Waste Master Challenge',
      description: 'Test your comprehensive zero waste knowledge!',
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
      id: 'master-zw-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mzwq1',
          question: {
            ELEMENTARY: 'What is the first R in the 5 R\'s?',
            MIDDLE_SCHOOL: 'What is at the top of the waste hierarchy?',
            HIGH_SCHOOL: 'What type of change is most impactful for waste reduction?',
            UNDERGRADUATE: 'What behavioral economics concept involves pre-set options?',
            GRADUATE: 'What approach involves long-term multi-stakeholder system change?',
            PHD: 'What research method models individual waste decisions?'
          },
          options: {
            ELEMENTARY: ['Refuse', 'Recycle', 'Reuse', 'Reduce'],
            MIDDLE_SCHOOL: ['Prevention', 'Recycling', 'Landfill', 'Incineration'],
            HIGH_SCHOOL: ['Systemic change', 'Individual recycling', 'Buying green products', 'Wishcycling'],
            UNDERGRADUATE: ['Default effects', 'Loss aversion', 'Anchoring', 'Framing'],
            GRADUATE: ['Transition management', 'Command and control', 'Market forces', 'Technology push'],
            PHD: ['Agent-based modeling', 'Regression analysis', 'Case studies', 'Focus groups']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Refuse comes first - say no to things you don\'t need before they become waste!',
            MIDDLE_SCHOOL: 'Prevention is at the top - the best waste is waste that\'s never created.',
            HIGH_SCHOOL: 'Systemic change (policy, infrastructure, producer responsibility) has the greatest impact.',
            UNDERGRADUATE: 'Default effects shape choices through pre-set options (e.g., opt-out vs. opt-in).',
            GRADUATE: 'Transition management coordinates stakeholders toward long-term system transformation.',
            PHD: 'Agent-based models simulate how individual decisions aggregate to system-level patterns.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Zero Waste International Alliance', url: 'https://zwia.org/', type: 'research' },
      { title: 'Story of Stuff Project', url: 'https://www.storyofstuff.org/', type: 'video' }
    ]
  }
]
