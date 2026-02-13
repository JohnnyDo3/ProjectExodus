import type { LearningLevel } from '@/types/learning'

// Fun facts for each topic, organized by learning level
// Each level has 5+ facts that are age-appropriate and engaging

export const TOPIC_FUN_FACTS: Record<string, Record<LearningLevel, string[]>> = {
  'renewable-energy': {
    ELEMENTARY: [
      "The sun gives Earth more energy in one hour than the whole world uses in a year!",
      "Wind turbines can be taller than the Statue of Liberty!",
      "Solar panels work even on cloudy days - they just make less electricity.",
      "Some toys and calculators run on solar power from tiny solar cells.",
      "Wind power has been used for over 1,000 years - first for windmills that ground grain into flour!",
    ],
    MIDDLE_SCHOOL: [
      "One wind turbine can power about 500 homes for an entire year.",
      "Solar panels have no moving parts, so they can last 25-30 years with little maintenance.",
      "Iceland gets nearly 100% of its electricity from renewable sources like geothermal and hydropower.",
      "The world's largest solar farm is in India and covers an area bigger than 10,000 football fields.",
      "Offshore wind turbines can be placed in the ocean where winds are stronger and more consistent.",
    ],
    HIGH_SCHOOL: [
      "Photovoltaic cells convert sunlight directly into electricity using the photoelectric effect.",
      "Modern wind turbines can generate up to 15 megawatts of power - enough to power 15,000 homes.",
      "Concentrated Solar Power (CSP) uses mirrors to focus sunlight and generate steam for turbines.",
      "The capacity factor of offshore wind farms can exceed 50%, compared to 25-35% for onshore.",
      "Battery storage technology is crucial for managing the intermittent nature of solar and wind power.",
    ],
    UNDERGRADUATE: [
      "Perovskite solar cells have achieved lab efficiencies over 25% and could be much cheaper to produce.",
      "Grid parity - when renewable electricity costs the same as conventional power - has been achieved in many regions.",
      "Floating offshore wind platforms can access wind resources in waters too deep for fixed-bottom turbines.",
      "Vehicle-to-grid (V2G) technology allows electric cars to supply power back to the grid during peak demand.",
      "Green hydrogen produced from renewable electricity could decarbonize heavy industry and shipping.",
    ],
    GRADUATE: [
      "The levelized cost of electricity (LCOE) for utility-scale solar fell 89% between 2010 and 2020.",
      "Power electronics and smart inverters are essential for integrating high penetrations of renewables.",
      "Sector coupling links electricity, heat, and transport sectors to maximize renewable energy utilization.",
      "Advanced forecasting using AI can predict solar and wind output hours or days in advance.",
      "Virtual power plants aggregate distributed energy resources to provide grid services.",
    ],
    PHD: [
      "Tandem solar cells stacking perovskites on silicon have achieved >29% efficiency in lab settings.",
      "High-voltage direct current (HVDC) transmission minimizes losses when moving renewable power long distances.",
      "Capacity markets and ancillary services markets must evolve to properly value renewable energy attributes.",
      "Thermochemical energy storage using redox reactions can achieve round-trip efficiencies above 80%.",
      "Superconducting magnetic energy storage (SMES) offers near-instantaneous response for grid stabilization.",
    ],
  },

  'zero-waste': {
    ELEMENTARY: [
      "Americans throw away enough garbage every day to fill 63,000 garbage trucks!",
      "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
      "Composting food scraps turns waste into food for plants - like magic soil!",
      "Plastic bottles can be recycled into playground equipment, park benches, and even clothes!",
      "A glass bottle can be recycled over and over again forever without losing quality.",
    ],
    MIDDLE_SCHOOL: [
      "The Great Pacific Garbage Patch is twice the size of Texas and contains 80,000 tons of plastic.",
      "Landfills produce methane gas, which is 25 times more powerful than CO2 as a greenhouse gas.",
      "Sweden recycles so well that it imports garbage from other countries to fuel its power plants.",
      "E-waste is the fastest growing waste stream - over 50 million tons are produced globally each year.",
      "Only 9% of all plastic ever made has been recycled - the rest is in landfills or the environment.",
    ],
    HIGH_SCHOOL: [
      "Extended Producer Responsibility (EPR) laws make companies responsible for the entire lifecycle of their products.",
      "The circular economy model aims to eliminate waste by designing products for reuse, repair, and recycling.",
      "Anaerobic digestion can convert organic waste into biogas for energy and digestate for fertilizer.",
      "Single-stream recycling makes recycling easier but can lead to higher contamination rates.",
      "Industrial symbiosis networks use one company's waste as another company's raw material.",
    ],
    UNDERGRADUATE: [
      "Life cycle assessment (LCA) quantifies environmental impacts from raw material extraction to disposal.",
      "Mechanical recycling degrades polymer chains, while chemical recycling can produce virgin-quality materials.",
      "Pay-as-you-throw (PAYT) pricing schemes effectively reduce waste generation by 25-45%.",
      "Waste-to-energy facilities with advanced emission controls can meet strict air quality standards.",
      "Design for disassembly (DfD) principles make products easier to repair and recycle at end-of-life.",
    ],
    GRADUATE: [
      "Material flow analysis (MFA) tracks resource flows through the economy to identify waste reduction opportunities.",
      "Deposit return schemes for beverage containers achieve return rates above 90% in some countries.",
      "Blockchain technology can improve supply chain transparency and verify recycled content claims.",
      "Urban mining recovers valuable metals from e-waste at concentrations higher than virgin ore.",
      "Behavioral economics insights improve recycling program design and participation rates.",
    ],
    PHD: [
      "Thermodynamic analysis reveals that perfect material recycling is theoretically impossible due to entropy.",
      "Multi-objective optimization balances environmental, economic, and social factors in waste management.",
      "Agent-based modeling simulates consumer behavior and policy impacts on waste generation patterns.",
      "Hybrid LCA-MFA models capture both cradle-to-grave impacts and economy-wide material flows.",
      "Circular economy indicators beyond recycling rates measure resource productivity and circularity gaps.",
    ],
  },

  'water-conservation': {
    ELEMENTARY: [
      "Only 1% of Earth's water is fresh water we can use - most is salty ocean water or frozen ice!",
      "A leaky faucet dripping once per second wastes 5 gallons of water every day.",
      "Taking a shower uses about 2 gallons of water per minute.",
      "Plants and trees release water into the air through their leaves - it's called transpiration!",
      "A single tree can drink up to 100 gallons of water from the ground every day.",
    ],
    MIDDLE_SCHOOL: [
      "It takes 2,700 liters of water to make one cotton t-shirt.",
      "Agriculture uses about 70% of all freshwater withdrawn from rivers and aquifers.",
      "Drip irrigation can reduce water use by 30-70% compared to traditional flood irrigation.",
      "Aquifers - underground water storage - take thousands of years to refill naturally.",
      "Desalination removes salt from seawater but requires significant energy.",
    ],
    HIGH_SCHOOL: [
      "Virtual water or water footprint measures all water used to produce goods and services.",
      "Water stress occurs when annual water supplies drop below 1,700 cubic meters per person.",
      "Watershed management protects water quality by controlling pollution at the source.",
      "Gray water systems reuse water from sinks and showers for irrigation.",
      "Atmospheric water generation extracts moisture from humid air using condensation.",
    ],
    UNDERGRADUATE: [
      "Integrated Water Resources Management (IWRM) coordinates water use across sectors and stakeholders.",
      "Constructed wetlands use natural processes to treat wastewater without chemicals or electricity.",
      "Deficit irrigation strategically stresses crops during non-critical growth stages to save water.",
      "Remote sensing and GIS enable precision agriculture that matches irrigation to crop needs.",
      "Membrane bioreactors combine biological treatment with ultrafiltration for water reuse.",
    ],
    GRADUATE: [
      "Water-energy nexus analysis reveals that energy production consumes 15% of global freshwater withdrawals.",
      "Hydro-economic models optimize water allocation considering economic value and opportunity costs.",
      "Transboundary water governance requires international cooperation on shared river basins.",
      "Payments for ecosystem services compensate landowners for protecting water resources.",
      "Nature-based solutions like floodplain restoration provide water management benefits with co-benefits.",
    ],
    PHD: [
      "Coupled human-natural systems models capture feedbacks between water availability and human behavior.",
      "Deep uncertainty in climate projections complicates long-term water infrastructure planning.",
      "Real options analysis values flexibility in water supply investments under uncertainty.",
      "Water rights and allocation mechanisms vary widely across legal and institutional contexts.",
      "Distributed sensor networks and machine learning improve real-time water system management.",
    ],
  },

  'green-building': {
    ELEMENTARY: [
      "Green buildings can save enough energy to power thousands of homes every year!",
      "Some buildings have gardens on their roofs that help clean the air and cool the building.",
      "Windows that face the sun can help heat a building in winter without using electricity.",
      "Buildings made from recycled materials help reduce waste and save natural resources.",
      "Special paint colors on roofs can reflect sunlight and keep buildings cooler in summer.",
    ],
    MIDDLE_SCHOOL: [
      "Buildings account for about 40% of global energy consumption and 33% of greenhouse gas emissions.",
      "LEED certification rates buildings on energy efficiency, water use, materials, and indoor air quality.",
      "Passive solar design uses building orientation and windows to capture natural light and heat.",
      "Green roofs reduce stormwater runoff, lower urban temperatures, and provide wildlife habitat.",
      "Triple-pane windows with argon gas filling provide better insulation than single-pane windows.",
    ],
    HIGH_SCHOOL: [
      "Net-zero energy buildings produce as much renewable energy as they consume over a year.",
      "Building Information Modeling (BIM) helps architects optimize energy performance during design.",
      "Cross-laminated timber (CLT) stores carbon and can replace concrete and steel in mid-rise buildings.",
      "Heat pumps move heat rather than generating it, achieving 300-400% efficiency ratios.",
      "Daylighting design reduces artificial lighting needs and improves occupant well-being.",
    ],
    UNDERGRADUATE: [
      "Whole-building life cycle assessment accounts for embodied carbon in materials and construction.",
      "Building envelope commissioning verifies that air barriers and insulation perform as designed.",
      "Displacement ventilation delivers fresh air at floor level for better indoor air quality.",
      "Radiant heating and cooling systems in floors and ceilings improve thermal comfort and efficiency.",
      "Phase-change materials store and release thermal energy to moderate temperature swings.",
    ],
    GRADUATE: [
      "Integrated design processes bring all stakeholders together early to optimize building performance.",
      "Building performance simulation tools predict energy use, daylight, thermal comfort, and airflow.",
      "Circularity in construction requires design for deconstruction and material passports.",
      "Post-occupancy evaluation measures actual performance against design predictions.",
      "Adaptive reuse of existing buildings often has lower lifecycle carbon than new construction.",
    ],
    PHD: [
      "Urban building energy modeling (UBEM) simulates energy use across entire city building stocks.",
      "Stochastic occupant behavior models improve the accuracy of building energy predictions.",
      "Multi-objective optimization balances energy, cost, comfort, and carbon in building design.",
      "Grid-interactive efficient buildings can provide demand flexibility services to the electricity grid.",
      "Regenerative design aims for buildings that restore and enhance their ecosystems.",
    ],
  },

  'sustainable-agriculture': {
    ELEMENTARY: [
      "Worms help make soil healthy by eating dead plants and making nutrient-rich castings!",
      "Ladybugs eat aphids and other pests, helping farmers without using chemicals.",
      "Some farmers plant different crops together because they help each other grow better.",
      "Bees pollinate about one-third of all the food we eat - they're very important!",
      "Cover crops protect soil from erosion and add nutrients when they decompose.",
    ],
    MIDDLE_SCHOOL: [
      "Organic farming avoids synthetic pesticides and fertilizers, relying on natural processes.",
      "Crop rotation breaks pest cycles and maintains soil fertility without chemicals.",
      "Agroforestry combines trees with crops or livestock for multiple benefits.",
      "No-till farming leaves soil undisturbed, reducing erosion and preserving soil structure.",
      "Integrated Pest Management (IPM) uses multiple strategies to control pests sustainably.",
    ],
    HIGH_SCHOOL: [
      "Regenerative agriculture aims to restore soil health and sequester carbon in the ground.",
      "Precision agriculture uses GPS and sensors to apply inputs exactly where needed.",
      "Silvopasture integrates trees into grazing systems, providing shade for animals and storing carbon.",
      "Biological nitrogen fixation by legumes reduces the need for synthetic fertilizers.",
      "Food miles only account for 5-10% of food's carbon footprint - production methods matter more.",
    ],
    UNDERGRADUATE: [
      "Soil organic matter is a key indicator of soil health and carbon sequestration potential.",
      "Life cycle assessment compares environmental impacts of conventional versus organic systems.",
      "Agroecology applies ecological principles to design sustainable farming systems.",
      "Participatory plant breeding develops crop varieties adapted to local conditions and needs.",
      "Payment for ecosystem services can reward farmers for carbon sequestration and water quality.",
    ],
    GRADUATE: [
      "Soil carbon measurement methods include direct sampling, remote sensing, and modeling.",
      "True cost accounting reveals the hidden environmental and social costs of food production.",
      "Landscape approaches coordinate conservation and agriculture across multiple landowners.",
      "Climate-smart agriculture adapts to climate change while reducing emissions.",
      "Food system transformation requires coordinated policy across agriculture, health, and environment.",
    ],
    PHD: [
      "Soil microbiome research reveals complex interactions that influence plant health and carbon cycling.",
      "Agent-based models simulate farmer decision-making and adoption of sustainable practices.",
      "Land use change and agricultural expansion drive biodiversity loss and carbon emissions.",
      "Nutrition-sensitive agriculture links food production to public health outcomes.",
      "Territorial food systems analysis captures flows of food, nutrients, and emissions at regional scale.",
    ],
  },

  'sustainable-fashion': {
    ELEMENTARY: [
      "Your clothes travel a long way - a t-shirt might visit 3-5 countries before you buy it!",
      "Cotton plants need lots of water - one t-shirt needs about 700 gallons to grow and make.",
      "You can give old clothes new life by donating them or swapping with friends!",
      "Some clothes are made from recycled plastic bottles - turning trash into fashion.",
      "Natural dyes from plants can color clothes without harmful chemicals.",
    ],
    MIDDLE_SCHOOL: [
      "The fashion industry produces 10% of global carbon emissions - more than aviation and shipping combined.",
      "Fast fashion encourages buying cheap clothes that are worn only a few times before being thrown away.",
      "Synthetic fabrics like polyester release microplastics into the ocean when washed.",
      "Thrift shopping and vintage clothing extend the life of garments and reduce waste.",
      "Certifications like GOTS and Fair Trade ensure environmental and social standards.",
    ],
    HIGH_SCHOOL: [
      "The Rana Plaza collapse in 2013 killed over 1,100 garment workers and sparked industry reforms.",
      "Circular fashion aims to keep materials in use through repair, resale, rental, and recycling.",
      "Textile recycling is challenging because most clothes contain blended fibers.",
      "Living wages in garment factories would add only 1-3% to the retail price of clothes.",
      "Capsule wardrobes promote quality over quantity with versatile, timeless pieces.",
    ],
    UNDERGRADUATE: [
      "Extended producer responsibility can shift the cost of textile waste to brands and manufacturers.",
      "Digital product passports could track a garment's materials, origin, and environmental footprint.",
      "Chemical recycling breaks down textile fibers into raw materials for new fabric production.",
      "Supply chain transparency tools like blockchain can verify sustainability claims.",
      "Business models like rental, subscription, and resale are growing faster than traditional retail.",
    ],
    GRADUATE: [
      "Multi-stakeholder initiatives coordinate action on complex supply chain issues.",
      "Carbon accounting for fashion must include Scope 3 emissions from supply chains and product use.",
      "Behavioral interventions can encourage consumers to buy less, choose better, and care for clothes.",
      "Policy options range from labeling requirements to bans on destroying unsold inventory.",
      "Just transition principles ensure garment workers benefit from sustainability improvements.",
    ],
    PHD: [
      "System dynamics models reveal feedback loops in fashion consumption and production.",
      "Degrowth in fashion challenges the assumption that industry growth is necessary or desirable.",
      "Colonial histories shape global garment supply chains and labor conditions today.",
      "Intersectional analysis reveals how fashion's impacts fall disproportionately on women and minorities.",
      "Anticipatory governance prepares for emerging materials like lab-grown leather and spider silk.",
    ],
  },

  'food-sovereignty': {
    ELEMENTARY: [
      "Seeds are like tiny treasure boxes - they hold everything needed to grow a plant!",
      "Community gardens let neighbors grow food together and share with each other.",
      "Farmers markets let you buy food directly from the people who grew it.",
      "Some plants grow better when planted next to certain other plants - they're friends!",
      "Saving seeds from your garden lets you grow the same plants next year for free.",
    ],
    MIDDLE_SCHOOL: [
      "Food sovereignty means communities have the right to define their own food systems.",
      "Food deserts are areas where it's hard to find affordable, healthy food nearby.",
      "Urban farms and rooftop gardens can grow fresh food in cities where land is limited.",
      "Indigenous peoples have been seed keepers for thousands of years, preserving plant diversity.",
      "Farm-to-school programs connect kids with local farmers and teach where food comes from.",
    ],
    HIGH_SCHOOL: [
      "Corporate consolidation means just a few companies control most of the global seed market.",
      "Agroecological methods combine traditional knowledge with ecological science.",
      "Land grabbing threatens small farmers' access to land for food production.",
      "Food hubs aggregate products from small farms for distribution to larger buyers.",
      "Community Supported Agriculture (CSA) shares risks and rewards between farmers and members.",
    ],
    UNDERGRADUATE: [
      "La Via Campesina coined the term 'food sovereignty' at the 1996 World Food Summit.",
      "Participatory guarantee systems offer alternatives to expensive third-party certification.",
      "Food policy councils bring together stakeholders to address local food system challenges.",
      "Right to food frameworks establish government obligations to ensure food security.",
      "Seed libraries and community seed banks preserve heirloom and locally adapted varieties.",
    ],
    GRADUATE: [
      "Peasant agroecology movements challenge industrial agriculture's social and environmental impacts.",
      "Food regime analysis traces historical shifts in global food production and trade.",
      "Gender analysis reveals women's central but often unrecognized roles in food systems.",
      "Indigenous food sovereignty reclaims traditional foods, practices, and governance.",
      "Food justice connects food access to racial equity and environmental justice.",
    ],
    PHD: [
      "Decolonial food studies examine how colonial legacies shape contemporary food systems.",
      "Political ecology of food analyzes power relations in access to land, water, and seeds.",
      "Transnational agrarian movements build solidarity across borders for food sovereignty.",
      "Nutritional anthropology studies cultural meanings and practices around food.",
      "Legal pluralism recognizes multiple overlapping systems governing land and food.",
    ],
  },

  'circular-economy': {
    ELEMENTARY: [
      "In a circular economy, trash becomes treasure - old things become new things!",
      "Nature has no trash - everything gets recycled by plants, animals, and tiny organisms.",
      "Repairing broken toys and clothes helps them last longer and creates less waste.",
      "Some companies rent products instead of selling them, so they can reuse parts later.",
      "Sharing things like tools, books, and bikes means fewer things need to be made.",
    ],
    MIDDLE_SCHOOL: [
      "The circular economy is inspired by natural ecosystems where nothing is wasted.",
      "Product-as-a-service models keep ownership with manufacturers who maintain and upgrade products.",
      "Industrial symbiosis networks connect companies so one's waste becomes another's resource.",
      "Modular design makes products easy to repair, upgrade, and recycle.",
      "Take-back programs ensure products return to manufacturers for proper recycling.",
    ],
    HIGH_SCHOOL: [
      "The Ellen MacArthur Foundation has promoted circular economy principles since 2010.",
      "Cradle-to-cradle design distinguishes biological nutrients that decompose from technical nutrients that recycle.",
      "Remanufacturing restores used products to like-new condition, saving 85% of embodied energy.",
      "Digital platforms enable sharing, renting, and reselling of goods at scale.",
      "Policy tools like eco-design requirements and right-to-repair laws support circularity.",
    ],
    UNDERGRADUATE: [
      "Circular business models include sharing, leasing, repair, refurbishment, and recycling.",
      "Material passports document what products contain to facilitate end-of-life recovery.",
      "Urban metabolism studies track resource flows through cities to identify circular opportunities.",
      "Reverse logistics systems collect used products and materials for reprocessing.",
      "Behavioral economics insights help design interventions that encourage circular behaviors.",
    ],
    GRADUATE: [
      "Transition theory examines how sociotechnical systems shift from linear to circular models.",
      "Input-output analysis traces material and energy flows across economic sectors.",
      "Circular economy indicators measure material recirculation, resource productivity, and waste prevention.",
      "Multi-stakeholder governance coordinates action across value chain actors.",
      "Just transition principles ensure circular economy benefits workers and communities.",
    ],
    PHD: [
      "Thermodynamic limits constrain perfect material recycling due to entropy and energy requirements.",
      "Rebound effects may offset circular economy gains if efficiency leads to increased consumption.",
      "Post-growth and degrowth perspectives question whether circularity can sustain economic growth.",
      "Political economy analysis reveals winners and losers from circular transitions.",
      "Anticipatory governance prepares for emerging circular technologies and business models.",
    ],
  },
}

// Helper function to get fun facts for a topic and level
export function getFunFacts(topicId: string, level: LearningLevel): string[] {
  const topicFacts = TOPIC_FUN_FACTS[topicId]
  if (!topicFacts) {
    // Return generic facts if topic not found
    return [
      "Learning about sustainability helps us protect our planet for future generations.",
      "Small actions add up - every sustainable choice makes a difference.",
      "Nature has been solving problems for billions of years - we can learn from it.",
      "Collaboration and sharing ideas accelerate progress toward sustainability.",
      "Innovation and creativity are key to solving environmental challenges.",
    ]
  }
  return topicFacts[level] || topicFacts.HIGH_SCHOOL
}

// Helper function to get real-world examples for a topic
export function getRealWorldExamples(topicId: string): Array<{
  title: string
  description: string
  icon: string
}> {
  const examples: Record<string, Array<{ title: string; description: string; icon: string }>> = {
    'renewable-energy': [
      { title: 'Install Solar', description: 'Explore rooftop solar panels for your home', icon: '☀️' },
      { title: 'Green Energy', description: 'Switch to a renewable energy provider', icon: '💚' },
      { title: 'Reduce Usage', description: 'Turn off lights and unplug devices', icon: '🔌' },
    ],
    'zero-waste': [
      { title: 'Start Composting', description: 'Turn food scraps into garden gold', icon: '🌱' },
      { title: 'Refuse Single-Use', description: 'Bring reusable bags and bottles', icon: '♻️' },
      { title: 'Buy Secondhand', description: 'Shop thrift stores and swap meets', icon: '👕' },
    ],
    'water-conservation': [
      { title: 'Fix Leaks', description: 'Check faucets and toilets for drips', icon: '🔧' },
      { title: 'Shorter Showers', description: 'Set a timer to reduce water use', icon: '⏱️' },
      { title: 'Rain Collection', description: 'Catch rainwater for your garden', icon: '🌧️' },
    ],
    'green-building': [
      { title: 'Energy Audit', description: 'Find where your home loses energy', icon: '🔍' },
      { title: 'LED Lighting', description: 'Replace old bulbs with LEDs', icon: '💡' },
      { title: 'Seal Drafts', description: 'Weatherstrip doors and windows', icon: '🚪' },
    ],
    'sustainable-agriculture': [
      { title: 'Start a Garden', description: 'Grow your own herbs and vegetables', icon: '🌿' },
      { title: 'Buy Local', description: 'Support farmers at markets', icon: '🥕' },
      { title: 'Learn to Compost', description: 'Return nutrients to the soil', icon: '🪱' },
    ],
    'sustainable-fashion': [
      { title: 'Capsule Wardrobe', description: 'Build a versatile collection', icon: '👗' },
      { title: 'Care for Clothes', description: 'Wash less, mend more', icon: '🧵' },
      { title: 'Swap or Donate', description: 'Give clothes a second life', icon: '🔄' },
    ],
    'food-sovereignty': [
      { title: 'Save Seeds', description: 'Preserve varieties for next season', icon: '🌻' },
      { title: 'Join a CSA', description: 'Support local farmers directly', icon: '🧺' },
      { title: 'Share Knowledge', description: 'Teach others to grow food', icon: '📚' },
    ],
    'circular-economy': [
      { title: 'Repair First', description: 'Fix things before replacing', icon: '🔧' },
      { title: 'Share & Borrow', description: 'Use libraries and tool shares', icon: '🤝' },
      { title: 'Buy Quality', description: 'Choose durable over disposable', icon: '⭐' },
    ],
  }

  return examples[topicId] || [
    { title: 'Take Action', description: 'Apply what you learn in daily life', icon: '🌍' },
    { title: 'Share Knowledge', description: 'Teach others about sustainability', icon: '📢' },
    { title: 'Stay Curious', description: 'Keep learning and asking questions', icon: '🔬' },
  ]
}

// Summary points by topic
export function getSummaryPoints(topicId: string, level: LearningLevel): string[] {
  const summaries: Record<string, string[]> = {
    'renewable-energy': [
      "Renewable energy comes from sources that naturally replenish: sun, wind, water, and earth.",
      "Transitioning to renewables reduces greenhouse gas emissions and air pollution.",
      "Energy storage and grid modernization are key to high renewable penetration.",
      "Costs have fallen dramatically, making renewables competitive with fossil fuels.",
    ],
    'zero-waste': [
      "Zero waste aims to redesign systems so all materials are reused or recycled.",
      "The waste hierarchy prioritizes prevention over recycling and disposal.",
      "Producer responsibility shifts waste management costs to manufacturers.",
      "Individual actions and systemic changes are both necessary for zero waste.",
    ],
    'water-conservation': [
      "Fresh water is a finite resource that must be managed sustainably.",
      "Agriculture is the largest water user, so food choices affect water footprints.",
      "Infrastructure investments and nature-based solutions improve water security.",
      "Water governance requires balancing competing uses and protecting ecosystems.",
    ],
    'green-building': [
      "Buildings consume significant energy and resources over their lifecycles.",
      "Passive design strategies reduce energy needs through orientation and insulation.",
      "Green building certifications provide frameworks for sustainable construction.",
      "Operational and embodied carbon must both be addressed for climate goals.",
    ],
    'sustainable-agriculture': [
      "Sustainable agriculture balances productivity with environmental stewardship.",
      "Soil health is foundational to sustainable food production.",
      "Diversification and ecological principles reduce reliance on external inputs.",
      "Food system transformation requires changes from farm to fork.",
    ],
    'sustainable-fashion': [
      "Fashion has significant environmental and social impacts across its supply chain.",
      "Circular approaches extend garment life through reuse, repair, and recycling.",
      "Consumer behavior change is as important as industry transformation.",
      "Policy and transparency can drive accountability and improvement.",
    ],
    'food-sovereignty': [
      "Food sovereignty centers communities' right to define their food systems.",
      "Seed saving and local food networks build resilience and autonomy.",
      "Food justice connects food access to broader social and environmental justice.",
      "Indigenous knowledge and practices offer models for sustainable food systems.",
    ],
    'circular-economy': [
      "Circular economy aims to eliminate waste through intentional design.",
      "Business models shift from selling products to providing services.",
      "System-level changes require collaboration across value chains.",
      "Circularity must be balanced with social equity and environmental limits.",
    ],
  }

  return summaries[topicId] || [
    "Sustainability integrates environmental, social, and economic considerations.",
    "Individual actions and systemic changes are both necessary.",
    "Collaboration and learning accelerate progress toward sustainability.",
    "Every choice is an opportunity to contribute to a better future.",
  ]
}
