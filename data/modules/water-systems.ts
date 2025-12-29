// Water Systems Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const waterSystemsModules: Module[] = [
  // Module 1: Rainwater Harvesting
  {
    id: 'water-rainwater',
    slug: 'rainwater-harvesting',
    title: 'Rainwater Harvesting',
    description: {
      ELEMENTARY: 'Learn how to catch rain and save it for later!',
      MIDDLE_SCHOOL: 'Discover systems to collect and store rainwater for home use.',
      HIGH_SCHOOL: 'Explore rainwater collection, storage, filtration, and uses.',
      UNDERGRADUATE: 'Analyze rainwater harvesting system design, sizing, and water quality.',
      GRADUATE: 'Examine policy frameworks, large-scale systems, and climate resilience.',
      PHD: 'Research optimal harvesting strategies, water quality modeling, and integrated systems.'
    },
    topic: 'water-systems',
    category: 'COLLECTION',
    icon: 'CloudRain',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-rain-1',
        title: 'Catching the Rain',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>Drip's Amazing Adventure</h2>

<p>High up in the clouds, a little raindrop named Drip was getting ready for the most exciting journey of her life!</p>

<p>"Today I'm going to help a garden grow!" Drip said to her cloud friends. Then—WHOOOOSH—she fell from the sky!</p>

<div class="image-placeholder" data-caption="Drip the raindrop falling from a cloud toward a house">
[Image: A friendly cartoon raindrop with a smile falling from a fluffy cloud toward a house with a garden]
</div>

<h3>The Journey Begins</h3>

<p>Drip landed on a rooftop—SPLAT! But instead of sitting there, she started sliding down into a gutter.</p>

<p>"Wheeeee!" Drip shouted as she slid along with thousands of other raindrops. They all rushed down a pipe and into... a big blue barrel!</p>

<blockquote class="scavenger-quote" data-quote-id="ws-elem-q1">
<p>"Every drop of rain is a tiny gift from the sky. When we catch it, we save it for thirsty plants!"</p>
<cite>— Grandpa Water Wise</cite>
</blockquote>

<h3>What is Rainwater Harvesting?</h3>

<p><strong>Rainwater harvesting</strong> means catching rain and saving it for later! Here's how it works:</p>

<ol>
<li><strong>Rain falls on the roof</strong> — This is called the "catchment"</li>
<li><strong>Gutters collect the water</strong> — Like tiny rivers on your house</li>
<li><strong>Pipes carry it down</strong> — Into a storage container</li>
<li><strong>A barrel or tank saves it</strong> — For when you need it!</li>
</ol>

<div class="image-placeholder" data-caption="Simple rainwater harvesting system on a house">
[Image: Colorful diagram showing rain falling on a roof, flowing through gutters, and collecting in a rain barrel next to a garden]
</div>

<h3>Why Catch Rain?</h3>

<p>Drip learned that saved rainwater can do amazing things:</p>
<ul>
<li>Water gardens and flowers</li>
<li>Fill birdbaths for thirsty birds</li>
<li>Wash outdoor toys and bikes</li>
<li>Help during dry, sunny days when plants need extra water</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="ws-elem-q2">
<p>"Rain is free water falling from the sky. Catching it is one of the smartest things we can do!"</p>
<cite>— Kids Water Conservation Club</cite>
</blockquote>

<h3>Drip's Happy Ending</h3>

<p>Drip waited in the barrel for a sunny day. Then a little girl named Sofia turned on the spigot. Drip flowed out and landed on a tomato plant's roots.</p>

<p>"I did it!" Drip cheered. "I helped grow food!"</p>

<div class="key-concept">
<h4>Remember!</h4>
<p>Rainwater harvesting = Catching rain + Saving it + Using it wisely!</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Ancient Wisdom, Modern Solution</h2>

<p>Imagine living 4,000 years ago in a desert. There's no faucet to turn on, no pipes bringing water to your home. Yet ancient civilizations thrived in some of the driest places on Earth. Their secret? Rainwater harvesting.</p>

<div class="image-placeholder" data-caption="Ancient rainwater cistern from the Middle East">
[Image: Archaeological photo of an ancient stone cistern with modern diagram overlay explaining the system]
</div>

<h3>A System as Old as Civilization</h3>

<p>From the Roman Empire's aqueducts to ancient India's step wells, humans have harvested rain for millennia. Today, this ancient practice is more important than ever.</p>

<blockquote class="scavenger-quote" data-quote-id="ws-mid-q1">
<p>"Rainwater harvesting isn't new technology—it's old wisdom we're finally remembering. Ancient civilizations survived droughts by capturing every precious drop."</p>
<cite>— World Water Council</cite>
</blockquote>

<h3>How Modern Systems Work</h3>

<p>A complete rainwater harvesting system has five main components:</p>

<table class="component-table">
<tr><th>Component</th><th>Function</th><th>Example</th></tr>
<tr><td>Catchment</td><td>Surface that collects rain</td><td>Roof, paved area</td></tr>
<tr><td>Conveyance</td><td>Moves water to storage</td><td>Gutters, pipes</td></tr>
<tr><td>First Flush Diverter</td><td>Removes initial dirty water</td><td>Diverter valve</td></tr>
<tr><td>Storage</td><td>Holds harvested water</td><td>Tanks, cisterns, barrels</td></tr>
<tr><td>Distribution</td><td>Delivers water for use</td><td>Pumps, gravity feed</td></tr>
</table>

<div class="image-placeholder" data-caption="Modern rainwater harvesting system components">
[Image: Labeled diagram showing all five components of a home rainwater system]
</div>

<h3>The First Flush: Why It Matters</h3>

<p>When rain first hits your roof, it washes away dust, bird droppings, leaves, and pollution. This "first flush" of dirty water needs to be diverted away from your storage.</p>

<blockquote class="scavenger-quote" data-quote-id="ws-mid-q2">
<p>"The first flush diverter is the unsung hero of rainwater systems. It ensures only clean water reaches your storage tank."</p>
<cite>— Texas Water Development Board</cite>
</blockquote>

<h3>How Much Can You Collect?</h3>

<p>You might be surprised how much rain a roof can catch! A simple formula:</p>

<p><strong>Gallons = Roof Area (sq ft) × Rainfall (inches) × 0.623</strong></p>

<p>For example, a 1,000 square foot roof with just 1 inch of rain collects about 623 gallons—enough to fill 12 bathtubs!</p>

<h3>Uses for Harvested Rainwater</h3>

<ul>
<li><strong>Garden irrigation</strong> — Plants love rainwater (no chlorine!)</li>
<li><strong>Lawn watering</strong> — Reduces water bills</li>
<li><strong>Car washing</strong> — Soft water means no spots</li>
<li><strong>Toilet flushing</strong> — With proper plumbing</li>
<li><strong>Drinking</strong> — With advanced filtration and treatment</li>
</ul>

<div class="key-concept">
<h4>Key Takeaway</h4>
<p>Rainwater harvesting turns every rainstorm into an opportunity. With proper collection and storage, your roof becomes a water source that can supply thousands of gallons each year.</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Engineering Water Security: The Science of Rainwater Harvesting</h2>

<p>In 2018, Cape Town, South Africa nearly became the first major city to run out of water. "Day Zero"—when taps would run dry—was avoided partly through emergency rainwater collection. This crisis highlighted what engineers have long known: rainwater harvesting isn't just eco-friendly, it's essential infrastructure.</p>

<div class="image-placeholder" data-caption="Cape Town Day Zero water crisis response">
[Image: Split image showing empty reservoir and residents collecting rainwater during the crisis]
</div>

<h3>The Physics of Collection</h3>

<p>Understanding rainwater harvesting requires basic hydrology:</p>

<blockquote class="scavenger-quote" data-quote-id="ws-high-q1">
<p>"The theoretical harvest from any catchment equals precipitation times area. But real-world efficiency rarely exceeds 85% due to evaporation, splash loss, absorption, and system inefficiencies."</p>
<cite>— American Rainwater Catchment Systems Association</cite>
</blockquote>

<h4>The Collection Equation</h4>
<p><code>V = R × A × Ce</code></p>
<p>Where:</p>
<ul>
<li>V = Volume collected (gallons or liters)</li>
<li>R = Rainfall depth</li>
<li>A = Catchment area</li>
<li>Ce = Collection efficiency (typically 0.75-0.85)</li>
</ul>

<h3>Roof Materials and Water Quality</h3>

<table class="comparison-table">
<thead>
<tr><th>Roof Type</th><th>Collection Efficiency</th><th>Water Quality Concerns</th></tr>
</thead>
<tbody>
<tr><td>Metal (galvanized)</td><td>90-95%</td><td>Zinc leaching initially</td></tr>
<tr><td>Metal (coated/painted)</td><td>90-95%</td><td>Minimal if food-safe coating</td></tr>
<tr><td>Asphalt shingles</td><td>75-85%</td><td>Petroleum compounds, granules</td></tr>
<tr><td>Clay/concrete tiles</td><td>80-90%</td><td>Alkalinity, possible lead in old glazes</td></tr>
<tr><td>Wooden shakes</td><td>70-80%</td><td>Tannins, possible preservatives</td></tr>
</tbody>
</table>

<div class="image-placeholder" data-caption="Comparison of roof materials for rainwater harvesting">
[Image: Side-by-side photos of different roof types with efficiency ratings]
</div>

<h3>First Flush Systems: Engineering Cleaner Water</h3>

<blockquote class="scavenger-quote" data-quote-id="ws-high-q2">
<p>"The first 0.5-1.0 mm of rainfall—approximately 10 gallons per 1,000 square feet of roof—should be diverted. This 'first flush' contains 70-90% of the total contaminant load from the catchment surface."</p>
<cite>— EPA Rainwater Harvesting Guide</cite>
</blockquote>

<h4>First Flush Diverter Types:</h4>
<ul>
<li><strong>Standpipe:</strong> Simple vertical pipe that fills first, then overflows to tank</li>
<li><strong>Ball valve:</strong> Floating ball seals diverter pipe after filling</li>
<li><strong>Tipping bucket:</strong> Mechanical device diverts set volume</li>
<li><strong>Volume-based:</strong> Calculated diversion based on roof area</li>
</ul>

<h3>Treatment for Different Uses</h3>

<table class="treatment-table">
<thead>
<tr><th>End Use</th><th>Treatment Required</th><th>Quality Standard</th></tr>
</thead>
<tbody>
<tr><td>Irrigation</td><td>Debris screen only</td><td>No standard</td></tr>
<tr><td>Toilet flushing</td><td>Screen + sediment filter</td><td>Non-potable</td></tr>
<tr><td>Laundry</td><td>Sediment + carbon filter</td><td>Non-potable</td></tr>
<tr><td>Potable (drinking)</td><td>Sediment + carbon + UV/chlorine</td><td>EPA drinking water</td></tr>
</tbody>
</table>

<h3>System Sizing: Matching Supply and Demand</h3>

<blockquote class="scavenger-quote" data-quote-id="ws-high-q3">
<p>"Optimal tank sizing depends not just on total rainfall, but on its distribution throughout the year. A system designed for average annual rainfall will fail during the months that matter most—the dry season."</p>
<cite>— University of Arizona Water Resources Research Center</cite>
</blockquote>

<div class="key-concept">
<h4>Critical Thinking</h4>
<p>Rainwater harvesting demonstrates how engineering intersects with environmental science, public health, and policy. As climate change intensifies droughts, these systems become critical infrastructure—not just green features.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Rainwater Harvesting Systems Engineering: Design, Analysis, and Optimization</h2>

<p>As freshwater resources face increasing pressure from population growth and climate change, rainwater harvesting has evolved from simple barrel collection to sophisticated engineered systems. Understanding system design requires integrating hydrology, water quality engineering, and economic analysis.</p>

<h3>Hydrological Analysis for System Design</h3>

<blockquote class="scavenger-quote" data-quote-id="ws-undergrad-q1">
<p>"Rainwater harvesting system design must account for stochastic rainfall variability. Using average precipitation leads to undersized systems that fail precisely when needed most—during dry periods."</p>
<cite>— ASCE Journal of Water Resources Planning and Management</cite>
</blockquote>

<h4>Design Rainfall Analysis</h4>
<p>System design requires statistical analysis of precipitation data:</p>
<ul>
<li><strong>Annual exceedance probability:</strong> What rainfall can be expected in X% of years?</li>
<li><strong>Dry period analysis:</strong> Maximum consecutive days without significant rain</li>
<li><strong>Monthly distribution:</strong> Seasonal patterns affecting supply</li>
<li><strong>Return period events:</strong> Design for overflow management</li>
</ul>

<div class="image-placeholder" data-caption="Rainfall probability distribution and dry period analysis">
[Image: Statistical charts showing rainfall probability distributions and dry period analysis for system sizing]
</div>

<h3>Mass Balance Modeling</h3>

<p>Tank sizing requires daily or monthly mass balance simulation:</p>

<p><code>S(t) = S(t-1) + Q(t) - D(t) - O(t)</code></p>

<p>Where:</p>
<ul>
<li>S(t) = Storage volume at time t</li>
<li>Q(t) = Inflow from catchment</li>
<li>D(t) = Demand withdrawal</li>
<li>O(t) = Overflow (when S > capacity)</li>
</ul>

<h4>Reliability Analysis</h4>
<p>System reliability is typically expressed as:</p>
<ul>
<li><strong>Volumetric reliability:</strong> % of demand met over analysis period</li>
<li><strong>Time-based reliability:</strong> % of time periods with full supply</li>
<li><strong>Design reliability:</strong> Target performance level (e.g., 90%)</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="ws-undergrad-q2">
<p>"A 90% reliable system will, on average, fail to meet full demand in 36.5 days per year. Whether this is acceptable depends entirely on the consequences of shortage and availability of backup supply."</p>
<cite>— Water Resources Engineering, Mays 2010</cite>
</blockquote>

<h3>Water Quality Engineering</h3>

<h4>Contaminant Sources and Treatment</h4>
<table class="technical-table">
<thead>
<tr><th>Contaminant Category</th><th>Sources</th><th>Treatment Approach</th></tr>
</thead>
<tbody>
<tr><td>Particulates</td><td>Dust, leaves, roof debris</td><td>Screening, sedimentation, filtration</td></tr>
<tr><td>Microbiological</td><td>Bird/animal feces, biofilms</td><td>UV disinfection, chlorination</td></tr>
<tr><td>Chemical (organic)</td><td>Roof coatings, atmospheric deposition</td><td>Activated carbon adsorption</td></tr>
<tr><td>Chemical (inorganic)</td><td>Metal roofs, acid rain</td><td>pH adjustment, ion exchange</td></tr>
</tbody>
</table>

<h4>Treatment Train Design</h4>
<p>For potable use, typical treatment sequence:</p>
<ol>
<li>First flush diversion (10-25 gallons per 1000 sq ft)</li>
<li>Inlet screen (≥1mm mesh)</li>
<li>Sedimentation (in-tank or separate)</li>
<li>Particulate filtration (5 micron nominal)</li>
<li>Activated carbon (taste, odor, organics)</li>
<li>Disinfection (UV: 40 mJ/cm², or chlorine: 0.2 mg/L residual)</li>
</ol>

<div class="image-placeholder" data-caption="Treatment train schematic for potable rainwater">
[Image: Process flow diagram showing complete treatment train with equipment specifications]
</div>

<h3>Economic Analysis</h3>

<blockquote class="scavenger-quote" data-quote-id="ws-undergrad-q3">
<p>"Life cycle cost analysis of rainwater harvesting must include not only system capital and O&M costs but also the avoided costs of municipal water, stormwater management fees, and the value of supply resilience."</p>
<cite>— Journal of Environmental Management</cite>
</blockquote>

<h4>Key Economic Parameters:</h4>
<ul>
<li><strong>Capital costs:</strong> Tank, treatment, plumbing, installation</li>
<li><strong>Operating costs:</strong> Pump energy, filter replacement, maintenance</li>
<li><strong>Avoided costs:</strong> Water purchase, stormwater fees, infrastructure sizing</li>
<li><strong>Externalities:</strong> Reduced CSO events, aquifer recharge credits</li>
</ul>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Optimal rainwater harvesting design requires balancing reliability requirements against capital costs. Oversized tanks provide security but increase costs; undersized systems fail during droughts. Monte Carlo simulation with historical rainfall data enables probabilistic design that quantifies performance uncertainty.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Rainwater Harvesting: Policy Frameworks, Urban Integration, and Climate Adaptation</h2>

<p>Graduate-level analysis of rainwater harvesting extends beyond technical design to examine institutional frameworks, urban water cycle integration, and the role of decentralized systems in climate adaptation strategies.</p>

<h3>Regulatory and Policy Landscape</h3>

<h4>The Water Rights Question</h4>
<blockquote class="scavenger-quote" data-quote-id="ws-grad-q1">
<p>"In prior appropriation states of the American West, rainwater that falls on your roof is not legally 'yours' until it percolates to groundwater or flows to a stream. Colorado only legalized residential rain barrels in 2016, and still limits collection to two 55-gallon barrels."</p>
<cite>— Colorado Water Law Review</cite>
</blockquote>

<p>Water rights frameworks affecting rainwater harvesting:</p>
<ul>
<li><strong>Prior appropriation:</strong> Historical rights to water flows may technically include rainwater</li>
<li><strong>Riparian rights:</strong> Generally more permissive of on-site harvesting</li>
<li><strong>Public trust doctrine:</strong> State interests in water resources</li>
<li><strong>International frameworks:</strong> Human right to water considerations</li>
</ul>

<div class="image-placeholder" data-caption="Map of rainwater harvesting regulations across US states">
[Image: US map showing varying state regulations from unrestricted to prohibited rainwater collection]
</div>

<h3>Incentive Program Design</h3>

<h4>Policy Instrument Options:</h4>
<table class="policy-table">
<thead>
<tr><th>Instrument</th><th>Mechanism</th><th>Effectiveness Evidence</th></tr>
</thead>
<tbody>
<tr><td>Direct rebates</td><td>Cash back on system purchase</td><td>High uptake, cost-effective per gallon</td></tr>
<tr><td>Tax credits</td><td>Income tax deduction</td><td>Benefits higher-income households</td></tr>
<tr><td>Stormwater fee credits</td><td>Reduced utility fees</td><td>Ongoing incentive for maintenance</td></tr>
<tr><td>Development requirements</td><td>Mandates for new construction</td><td>High compliance, increased development costs</td></tr>
<tr><td>Expedited permitting</td><td>Fast-track for green buildings</td><td>Developer preference, variable uptake</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="ws-grad-q2">
<p>"Austin's rainwater harvesting rebate program achieved 85% higher adoption rates than neighboring cities with similar rainfall—demonstrating that policy design, not just incentive amount, drives uptake."</p>
<cite>— Journal of the American Planning Association</cite>
</blockquote>

<h3>Urban Water Cycle Integration</h3>

<h4>Rainwater Harvesting in Integrated Urban Water Management:</h4>
<p>Modern urban water planning increasingly views rainwater as a resource within the urban water cycle:</p>
<ul>
<li><strong>Supply diversification:</strong> Reducing dependence on centralized sources</li>
<li><strong>Stormwater management:</strong> Peak flow reduction, CSO mitigation</li>
<li><strong>Groundwater recharge:</strong> Infiltration from overflow</li>
<li><strong>Urban heat island mitigation:</strong> Through irrigation use</li>
</ul>

<div class="image-placeholder" data-caption="Integrated urban water cycle with rainwater harvesting">
[Image: Systems diagram showing rainwater harvesting integrated with stormwater, potable supply, and wastewater systems]
</div>

<h3>Climate Adaptation Role</h3>

<blockquote class="scavenger-quote" data-quote-id="ws-grad-q3">
<p>"Climate projections suggest intensification of the hydrological cycle—more intense precipitation events separated by longer dry periods. Rainwater harvesting addresses both challenges: capturing intense rainfall while providing storage to bridge extended droughts."</p>
<cite>— IPCC Special Report on Climate Change and Water</cite>
</blockquote>

<h4>Adaptation Considerations:</h4>
<ul>
<li>System design for non-stationary climate (changing rainfall patterns)</li>
<li>Integration with other adaptive measures (efficiency, reuse, desalination)</li>
<li>Vulnerability assessment for existing systems</li>
<li>Adaptive management frameworks</li>
</ul>

<h3>Community-Scale Systems</h3>

<p>Beyond individual buildings, district-scale rainwater harvesting offers advantages:</p>
<ul>
<li>Economies of scale in treatment and storage</li>
<li>Catchment diversity reducing supply variability</li>
<li>Professional operation and maintenance</li>
<li>Integration with other water sources</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="ws-grad-q4">
<p>"Singapore's ABC Waters program demonstrates that urban rainwater management can simultaneously address water supply, flood control, and urban livability—transforming drainage infrastructure into community amenities."</p>
<cite>— Singapore PUB, National Water Agency</cite>
</blockquote>

<div class="key-concept">
<h4>Research Directions</h4>
<p>Graduate research on rainwater harvesting increasingly focuses on systems integration—how decentralized collection interacts with centralized infrastructure, how policy can accelerate adoption equitably, and how systems must adapt to climate change uncertainty.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Rainwater Harvesting: Advanced Research Frontiers and Systemic Analysis</h2>

<p>Doctoral engagement with rainwater harvesting requires moving beyond system design to examine fundamental research questions in hydrology, water quality science, sociotechnical systems, and transitions theory.</p>

<h3>Stochastic Hydrology and System Reliability</h3>

<h4>Non-Stationary Design Challenges</h4>
<blockquote class="scavenger-quote" data-quote-id="ws-phd-q1">
<p>"Traditional hydrological design assumes stationarity—that statistical properties of rainfall remain constant. Climate change invalidates this assumption, requiring new frameworks that explicitly incorporate non-stationary processes and deep uncertainty."</p>
<cite>— Milly et al., "Stationarity is Dead," Science, 2008</cite>
</blockquote>

<p>Research frontiers in system reliability:</p>
<ul>
<li><strong>Climate model downscaling:</strong> Translating GCM outputs to local rainfall scenarios</li>
<li><strong>Ensemble methods:</strong> Designing for multiple climate futures</li>
<li><strong>Adaptive design:</strong> Systems that can be modified as climate evolves</li>
<li><strong>Decision scaling:</strong> Identifying system vulnerabilities to climate stressors</li>
</ul>

<div class="image-placeholder" data-caption="Non-stationary rainfall analysis for system design">
[Image: Statistical plots showing shifting rainfall distributions under climate change scenarios]
</div>

<h3>Emerging Contaminants and Water Quality Research</h3>

<h4>Research Questions:</h4>
<ul>
<li><strong>Atmospheric deposition:</strong> Microplastics, PFAS, emerging organic contaminants</li>
<li><strong>Roof-water interactions:</strong> Leaching dynamics, biofilm development</li>
<li><strong>Storage water quality:</strong> Stratification, residence time effects</li>
<li><strong>Treatment efficacy:</strong> Novel contaminants and conventional treatment</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="ws-phd-q2">
<p>"Microplastic contamination in rainwater harvesting systems remains largely uncharacterized. Preliminary studies suggest atmospheric deposition and roof runoff contribute significant microplastic loads, with implications for treatment design and human health risk assessment."</p>
<cite>— Environmental Science & Technology, 2022</cite>
</blockquote>

<h3>Smart Systems and IoT Integration</h3>

<h4>Cyber-Physical Rainwater Systems:</h4>
<p>Emerging research on intelligent rainwater management:</p>
<ul>
<li><strong>Real-time control:</strong> Forecast-based storage management</li>
<li><strong>Networked systems:</strong> Coordinated operation across buildings</li>
<li><strong>Predictive maintenance:</strong> Sensor-based system monitoring</li>
<li><strong>Digital twins:</strong> Simulation-based optimization</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="ws-phd-q3">
<p>"Real-time controlled rainwater tanks that discharge before forecast storms can provide 40-60% greater stormwater detention benefit than passive systems of the same size, while maintaining equivalent supply reliability."</p>
<cite>— Water Research, 2021</cite>
</blockquote>

<div class="image-placeholder" data-caption="Smart rainwater harvesting system architecture">
[Image: Technical diagram showing sensors, controllers, cloud connectivity, and optimization algorithms]
</div>

<h3>Sociotechnical Transitions and Adoption</h3>

<h4>Multi-Level Perspective Analysis</h4>
<p>Understanding rainwater harvesting adoption through transitions theory:</p>
<ul>
<li><strong>Landscape pressures:</strong> Climate change, water scarcity, sustainability discourse</li>
<li><strong>Regime resistance:</strong> Water utility business models, regulatory frameworks</li>
<li><strong>Niche innovations:</strong> Technology development, demonstration projects</li>
<li><strong>Transition pathways:</strong> Transformation, reconfiguration, substitution</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="ws-phd-q4">
<p>"The transition to decentralized water systems faces significant regime resistance from utilities whose revenue models depend on volumetric sales. Research must examine not just technical feasibility but the political economy of infrastructure transitions."</p>
<cite>— Environmental Innovation and Societal Transitions</cite>
</blockquote>

<h3>Life Cycle Assessment and Sustainability</h3>

<h4>Research Gaps in LCA:</h4>
<ul>
<li>Comparative LCA with alternative supply sources</li>
<li>Spatial variation in environmental impacts</li>
<li>Dynamic LCA under climate change</li>
<li>Social LCA and equity considerations</li>
</ul>

<h3>Methodological Considerations</h3>

<table class="methodology-table">
<thead>
<tr><th>Research Domain</th><th>Key Methods</th><th>Data Requirements</th></tr>
</thead>
<tbody>
<tr><td>System reliability</td><td>Monte Carlo simulation, copulas</td><td>Long-term daily precipitation records</td></tr>
<tr><td>Water quality</td><td>Event-based sampling, qPCR</td><td>Roof runoff characterization</td></tr>
<tr><td>Adoption dynamics</td><td>Agent-based modeling, surveys</td><td>Household decision factors</td></tr>
<tr><td>Policy analysis</td><td>Comparative case studies, QCA</td><td>Program outcomes data</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Doctoral Research Orientation</h4>
<p>Impactful doctoral research on rainwater harvesting bridges disciplines—connecting hydrological science to policy analysis, water quality engineering to public health, and technology development to sociotechnical transitions. The field demands researchers who can navigate between rigorous technical analysis and systems-level thinking about water infrastructure transformation.</p>
</div>
</div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-rain-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Rain Barrel!',
          MIDDLE_SCHOOL: 'Design Your System',
          HIGH_SCHOOL: 'Calculate Collection',
          UNDERGRADUATE: 'System Optimization',
          GRADUATE: 'Policy Analysis',
          PHD: 'Research Design'
        },
        description: {
          ELEMENTARY: 'Set up a rain barrel to collect water!',
          MIDDLE_SCHOOL: 'Design a complete rainwater collection system.',
          HIGH_SCHOOL: 'Calculate potential harvest for your location.',
          UNDERGRADUATE: 'Optimize system sizing for reliability.',
          GRADUATE: 'Analyze policy options for rainwater incentives.',
          PHD: 'Design research on system performance.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-rain-game',
      type: 'simulation',
      title: 'Rain Catcher',
      description: 'Design and manage rainwater harvesting systems!',
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
      id: 'ws-rain-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wrq1',
          question: {
            ELEMENTARY: 'Where does rainwater get collected from?',
            MIDDLE_SCHOOL: 'What does first flush diversion do?',
            HIGH_SCHOOL: 'What affects collection efficiency?',
            UNDERGRADUATE: 'What is supply-demand analysis for?',
            GRADUATE: 'What policy challenge exists for rainwater harvesting?',
            PHD: 'How does climate change affect rainwater harvesting?'
          },
          options: {
            ELEMENTARY: ['Rooftops', 'Underground', 'Lakes', 'Oceans'],
            MIDDLE_SCHOOL: ['Removes dirty first rain', 'Collects more water', 'Heats the water', 'Filters air'],
            HIGH_SCHOOL: ['Roof material, gutters, first flush', 'Color of house', 'Time of year only', 'Nothing'],
            UNDERGRADUATE: ['Tank sizing optimization', 'Choosing roof color', 'Selecting plants', 'Weather prediction'],
            GRADUATE: ['Water rights in some jurisdictions', 'Always encouraged', 'No challenges exist', 'Too expensive everywhere'],
            PHD: ['Changes rainfall patterns and reliability', 'No effect', 'Only positive effects', 'Eliminates need for systems']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Rain falls on rooftops and we collect it through gutters!',
            MIDDLE_SCHOOL: 'First flush diverts the initial dirty rainwater away from storage.',
            HIGH_SCHOOL: 'Collection efficiency depends on roof material, gutter design, and first flush systems.',
            UNDERGRADUATE: 'Supply-demand analysis matches storage size to rainfall patterns and water needs.',
            GRADUATE: 'Some areas have water rights laws that complicate rainwater collection.',
            PHD: 'Climate change alters precipitation patterns, affecting system reliability and design.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'American Rainwater Catchment Association', url: 'https://www.arcsa.org/', type: 'research' },
      { title: 'EPA Rainwater Harvesting', url: 'https://www.epa.gov/watersense', type: 'article' }
    ]
  },
  // Module 2: Greywater Systems
  {
    id: 'water-greywater',
    slug: 'greywater-systems',
    title: 'Greywater Systems',
    description: {
      ELEMENTARY: 'Learn how to reuse water from sinks and showers to water plants!',
      MIDDLE_SCHOOL: 'Discover how greywater recycling works in homes and buildings.',
      HIGH_SCHOOL: 'Explore greywater treatment, regulations, and landscape irrigation.',
      UNDERGRADUATE: 'Analyze greywater system design, treatment options, and health considerations.',
      GRADUATE: 'Examine greywater policy, public acceptance, and integrated reuse strategies.',
      PHD: 'Research advanced greywater treatment, pathogen risk assessment, and water quality modeling.'
    },
    topic: 'water-systems',
    category: 'REUSE',
    icon: 'Recycle',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-grey-1',
        title: 'Water Gets a Second Life',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>Splash's Second Adventure</h2>

<p>Splash the water droplet had just finished helping Maya wash her hands. Now he was sliding down the drain, heading for the sewers.</p>

<p>"Wait!" called a friendly pipe. "You don't have to go to the sewer! You can have a second adventure in the garden!"</p>

<div class="image-placeholder" data-caption="Splash the water droplet going on a second adventure">
[Image: A cartoon water droplet being redirected from a drain to a garden through special pipes]
</div>

<h3>What is Greywater?</h3>

<p>Greywater is the name for water that's been used once but is still clean enough to help plants grow! It comes from:</p>

<ul>
<li><strong>Showers and baths</strong> — After you get clean, the water can clean something else!</li>
<li><strong>Bathroom sinks</strong> — Hand-washing water is still good for gardens</li>
<li><strong>Washing machines</strong> — Laundry water can water your lawn</li>
<li><strong>Kitchen sinks</strong> — Sometimes, if there's no grease</li>
</ul>

<div class="warning-box">
<h4>Important!</h4>
<p>Toilet water is NOT greywater. It's called "blackwater" and needs special treatment. We never use toilet water in gardens!</p>
</div>

<h3>Why Give Water a Second Chance?</h3>

<p>Splash learned that reusing water is really smart:</p>

<ul>
<li>We save clean drinking water for drinking</li>
<li>Plants get extra water they love</li>
<li>We use less water overall</li>
<li>It's better for the environment</li>
</ul>

<h3>How Does It Work?</h3>

<p>Instead of going to the sewer, greywater goes through special pipes to your garden:</p>

<ol>
<li>Water goes down the drain as usual</li>
<li>A special pipe catches it</li>
<li>It flows outside to thirsty plants</li>
<li>Plants drink it up through their roots</li>
</ol>

<h3>Being Safe with Greywater</h3>

<p>To keep everyone healthy, we follow these rules:</p>

<ul>
<li>Use plant-safe soaps (grown-ups can check the labels)</li>
<li>Never drink greywater or play in it</li>
<li>Let it soak into the ground, not puddle on top</li>
<li>Wash your hands after gardening</li>
</ul>

<div class="key-concept">
<h4>Remember!</h4>
<p>Greywater gives water a second life! Instead of going to the sewer, it can help your garden grow. That's being water-smart!</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Greywater: Giving Water a Second Life</h2>

<p>Every day, the average American uses about 80-100 gallons of water. Most of that water goes straight down the drain after a single use. But what if we could use some of that water twice?</p>

<div class="image-placeholder" data-caption="Household water use breakdown">
[Image: Pie chart showing where household water goes - showers, toilets, laundry, sinks, etc.]
</div>

<h3>Understanding Greywater vs. Blackwater</h3>

<p>Not all wastewater is the same:</p>

<table class="comparison-table">
<tr><th>Greywater</th><th>Blackwater</th></tr>
<tr><td>From showers, sinks, laundry</td><td>From toilets</td></tr>
<tr><td>Contains soap, dirt, some bacteria</td><td>Contains human waste, pathogens</td></tr>
<tr><td>Can be reused for irrigation</td><td>Requires sewage treatment</td></tr>
<tr><td>50-80% of household wastewater</td><td>20-30% of household wastewater</td></tr>
</table>

<h3>Why Reuse Greywater?</h3>

<ul>
<li><strong>Water conservation:</strong> Reduce household water use by 30-50%</li>
<li><strong>Save money:</strong> Lower water and sewer bills</li>
<li><strong>Drought resilience:</strong> Keep gardens alive during water restrictions</li>
<li><strong>Reduce treatment load:</strong> Less water going to treatment plants</li>
<li><strong>Plants love it:</strong> Slight nutrients in greywater can help plants</li>
</ul>

<h3>Simple Greywater Systems</h3>

<h4>Laundry to Landscape</h4>
<p>The simplest system sends washing machine water directly to your yard:</p>

<ol>
<li>Washing machine pumps water out</li>
<li>Hose directs water to mulched basins around plants</li>
<li>Water soaks into soil and feeds plant roots</li>
<li>No storage—use it right away!</li>
</ol>

<h4>Bucket System</h4>
<p>While waiting for shower water to warm up, collect the cool water in a bucket. Use it to water houseplants or flush toilets.</p>

<h3>Greywater-Safe Products</h3>

<p>Plants are sensitive to some chemicals in soaps and cleaners. For greywater systems:</p>

<ul>
<li><strong>Do use:</strong> Biodegradable, plant-friendly soaps</li>
<li><strong>Avoid:</strong> Bleach, borax, and chlorine products</li>
<li><strong>Check labels for:</strong> "Greywater safe" or low sodium</li>
<li><strong>Salt matters:</strong> High-sodium products can damage soil</li>
</ul>

<div class="did-you-know">
<h4>Did You Know?</h4>
<p>California changed its greywater regulations in 2009, making laundry-to-landscape systems legal without a permit. This simple change allowed thousands of people to start reusing water!</p>
</div>

<div class="key-concept">
<h4>Key Takeaway</h4>
<p>Greywater reuse turns waste into a resource. By directing shower, sink, and laundry water to landscapes instead of the sewer, we can dramatically reduce household water consumption while keeping gardens healthy.</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Greywater Systems: Engineering Water Reuse</h2>

<p>In an era of growing water scarcity, greywater reuse represents one of the most practical approaches to household water conservation. Understanding the engineering principles, health considerations, and regulatory frameworks enables effective system design and implementation.</p>

<div class="image-placeholder" data-caption="Residential greywater system schematic">
[Image: Technical diagram of a complete residential greywater system with labeled components]
</div>

<h3>System Classifications</h3>

<table class="system-table">
<tr><th>Type</th><th>Components</th><th>Treatment Level</th><th>Permitted Uses</th></tr>
<tr><td>Laundry to Landscape</td><td>Washing machine, 1" pipe, mulch basins</td><td>None</td><td>Subsurface irrigation only</td></tr>
<tr><td>Branched Drain</td><td>Gravity distribution, multiple outlets</td><td>None</td><td>Subsurface irrigation only</td></tr>
<tr><td>Pumped System</td><td>Surge tank, pump, filter, distribution</td><td>Filtration</td><td>Subsurface/drip irrigation</td></tr>
<tr><td>Treatment System</td><td>Tank, filter, disinfection, storage</td><td>Filtration + disinfection</td><td>Surface irrigation</td></tr>
</table>

<h3>Water Quality Considerations</h3>

<p>Greywater contains various constituents that affect reuse potential:</p>

<ul>
<li><strong>Pathogens:</strong> Bacteria levels typically 10²-10⁶ CFU/100mL; lower than blackwater</li>
<li><strong>Nutrients:</strong> Phosphorus and nitrogen from detergents and body waste</li>
<li><strong>Surfactants:</strong> Soap residues that can affect soil infiltration</li>
<li><strong>Sodium:</strong> From water softeners and detergents; can harm soil and plants</li>
<li><strong>pH:</strong> Can be elevated from cleaning products; affects plant health</li>
</ul>

<h3>Design Principles</h3>

<h4>Sizing Calculations</h4>

<p>System sizing balances supply and demand:</p>

<ul>
<li><strong>Supply:</strong> 15-25 gallons per person per day from showers/baths</li>
<li><strong>Supply:</strong> 15-20 gallons per load from washing machines</li>
<li><strong>Demand:</strong> Varies by plant type, climate, season</li>
<li><strong>Storage:</strong> Minimize—greywater should be used within 24 hours</li>
</ul>

<h4>Distribution Methods</h4>

<ul>
<li><strong>Mulch basins:</strong> 2-3" layer of mulch allows water to infiltrate without ponding</li>
<li><strong>Drip irrigation:</strong> Requires filtration; can clog without maintenance</li>
<li><strong>Subsurface chambers:</strong> Prefabricated infiltration units</li>
</ul>

<h3>Regulatory Framework</h3>

<p>Greywater regulations vary significantly by jurisdiction:</p>

<ul>
<li><strong>Arizona, California:</strong> Permissive—simple systems often permit-exempt</li>
<li><strong>Texas:</strong> Statewide code allows greywater with registration</li>
<li><strong>Florida, some states:</strong> More restrictive—permits required</li>
<li><strong>Some jurisdictions:</strong> Prohibition still in place</li>
</ul>

<h3>Health and Safety</h3>

<ul>
<li>Never use greywater on edible parts of vegetable plants</li>
<li>No human contact—subsurface application prevents exposure</li>
<li>24-hour storage limit prevents bacterial growth</li>
<li>Diverter valve allows switching to sewer when needed</li>
</ul>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Effective greywater system design matches water supply with irrigation demand while ensuring public health protection. The simplest systems—like laundry to landscape—often perform best because they minimize storage time and maintenance requirements.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Greywater Systems Engineering: Design, Treatment, and Integration</h2>

<p>Greywater reuse systems range from simple gravity-fed distribution to sophisticated treatment trains approaching potable reuse quality. Professional design requires understanding water quality dynamics, treatment technologies, and system integration with broader water management.</p>

<h3>Greywater Characterization</h3>

<table class="quality-table">
<tr><th>Parameter</th><th>Light Greywater</th><th>Dark Greywater</th><th>Treatment Target</th></tr>
<tr><td>BOD₅ (mg/L)</td><td>50-100</td><td>100-400</td><td><30 (irrigation)</td></tr>
<tr><td>TSS (mg/L)</td><td>50-100</td><td>100-300</td><td><30</td></tr>
<tr><td>Total coliforms (CFU/100mL)</td><td>10²-10⁶</td><td>10⁴-10⁸</td><td><2.2 (unrestricted)</td></tr>
<tr><td>pH</td><td>6.5-8.0</td><td>5.0-9.0</td><td>6.0-9.0</td></tr>
<tr><td>SAR</td><td>2-10</td><td>2-15</td><td><10 (irrigation)</td></tr>
</table>

<p>Light greywater (bathroom) is generally higher quality than dark greywater (kitchen, laundry).</p>

<h3>Treatment Technologies</h3>

<h4>Physical Treatment</h4>
<ul>
<li><strong>Screening/settling:</strong> Removes hair, lint, large particles</li>
<li><strong>Sand filtration:</strong> 0.25-0.5mm media removes TSS</li>
<li><strong>Membrane filtration:</strong> MF/UF for pathogen removal</li>
</ul>

<h4>Biological Treatment</h4>
<ul>
<li><strong>Constructed wetlands:</strong> Subsurface flow systems effective for BOD/nutrient removal</li>
<li><strong>Rotating biological contactors:</strong> Compact aerobic treatment</li>
<li><strong>Membrane bioreactors:</strong> High-quality effluent for demanding applications</li>
</ul>

<h4>Disinfection</h4>
<ul>
<li><strong>UV:</strong> Effective for pathogens; no residual</li>
<li><strong>Chlorine:</strong> Provides residual; potential DBP formation</li>
<li><strong>Ozone:</strong> Strong oxidant; no residual</li>
</ul>

<h3>System Hydraulics</h3>

<h4>Surge Tank Design</h4>
<p>Greywater generation is intermittent; surge tanks buffer peaks:</p>
<ul>
<li>Minimum volume: 50-100 gallons for residential</li>
<li>Maximum retention: 24 hours to prevent odors and bacterial growth</li>
<li>Overflow to sewer required</li>
<li>Access for cleaning essential</li>
</ul>

<h4>Distribution Design</h4>
<ul>
<li>Drip systems require 100-200 mesh filtration minimum</li>
<li>Pressure compensating emitters handle elevation changes</li>
<li>Flushing capability prevents biofilm accumulation</li>
</ul>

<h3>Integration with Building Systems</h3>

<ul>
<li><strong>Plumbing separation:</strong> Dual-plumb new construction; retrofit challenges</li>
<li><strong>Cross-connection control:</strong> Air gaps, reduced pressure backflow</li>
<li><strong>Monitoring:</strong> Flow meters, pressure sensors, quality indicators</li>
<li><strong>Controls:</strong> Automated diversion during maintenance or quality exceedance</li>
</ul>

<div class="key-concept">
<h4>Professional Practice</h4>
<p>Greywater system design balances treatment complexity against end-use requirements. For landscape irrigation, minimal treatment may suffice. For toilet flushing or other indoor uses, more sophisticated treatment trains ensure public health protection while maintaining system reliability.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Greywater Reuse: Policy, Risk Assessment, and System Optimization</h2>

<p>Graduate-level analysis of greywater systems requires integration of public health risk assessment, policy analysis, behavioral factors, and lifecycle considerations. As water stress intensifies globally, greywater represents a significant decentralized water source requiring sophisticated governance approaches.</p>

<h3>Quantitative Microbial Risk Assessment (QMRA)</h3>

<p>QMRA provides a scientific basis for greywater regulations:</p>

<h4>Framework</h4>
<ol>
<li><strong>Hazard identification:</strong> Key pathogens (E. coli, Salmonella, enteric viruses)</li>
<li><strong>Exposure assessment:</strong> Contact scenarios (accidental ingestion, dermal)</li>
<li><strong>Dose-response:</strong> Probability of infection given exposure dose</li>
<li><strong>Risk characterization:</strong> Annual infection probability, DALYs</li>
</ol>

<h4>Key Findings</h4>
<ul>
<li>Subsurface irrigation: Risk typically acceptable (10⁻⁴ to 10⁻⁶ annual infection)</li>
<li>Surface irrigation: Higher risk; treatment or restricted access needed</li>
<li>Toilet flushing: Aerosol concerns; UV disinfection recommended</li>
</ul>

<h3>Policy Analysis</h3>

<h4>Regulatory Approaches</h4>

<table class="policy-table">
<tr><th>Approach</th><th>Examples</th><th>Advantages</th><th>Challenges</th></tr>
<tr><td>Prohibition</td><td>Some US states, countries</td><td>Simple enforcement</td><td>Ignores potential benefits</td></tr>
<tr><td>Permit required</td><td>Florida, some EU</td><td>Quality control</td><td>Cost/complexity barriers</td></tr>
<tr><td>Tiered permits</td><td>California, Arizona</td><td>Proportional oversight</td><td>Administrative complexity</td></tr>
<tr><td>Exemption</td><td>AZ (under 400 gpd)</td><td>Enables adoption</td><td>Limited oversight</td></tr>
</table>

<h4>Policy Design Considerations</h4>
<ul>
<li>Risk-proportionate regulation matching treatment to end use</li>
<li>Enabling provisions for simple systems to increase adoption</li>
<li>Professional requirements for complex systems</li>
<li>Integration with plumbing codes and building permits</li>
</ul>

<h3>Social and Behavioral Dimensions</h3>

<h4>Acceptance Factors</h4>
<ul>
<li><strong>Disgust response:</strong> "Yuck factor" for reused water, even when treated</li>
<li><strong>Trust:</strong> Confidence in treatment system reliability</li>
<li><strong>Knowledge:</strong> Understanding of risk and treatment processes</li>
<li><strong>Visibility:</strong> Seeing system operation builds confidence</li>
</ul>

<h4>Adoption Determinants</h4>
<ul>
<li>Water price sensitivity</li>
<li>Environmental values</li>
<li>Drought experience</li>
<li>Ease of installation and maintenance</li>
</ul>

<h3>Lifecycle Assessment</h3>

<p>Environmental evaluation of greywater systems considers:</p>
<ul>
<li>Embedded energy in treatment equipment vs. avoided municipal treatment</li>
<li>Chemical inputs (disinfection, cleaning) vs. reduced water extraction</li>
<li>System longevity and maintenance requirements</li>
<li>End-of-life disposal of treatment components</li>
</ul>

<div class="key-concept">
<h4>Research Directions</h4>
<p>Key research frontiers include developing simplified risk assessment tools for regulators, understanding long-term soil impacts of greywater irrigation, designing behavior-change interventions to increase adoption, and optimizing treatment for emerging contaminants like pharmaceuticals and personal care products.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Greywater Research Frontiers: Advanced Treatment, Contaminants of Emerging Concern, and System Integration</h2>

<p>Doctoral-level greywater research addresses fundamental questions about contaminant fate, treatment optimization, and the role of decentralized water reuse in sustainable urban water systems. This work integrates environmental engineering, public health, social science, and systems analysis.</p>

<h3>Contaminants of Emerging Concern</h3>

<h4>Pharmaceuticals and Personal Care Products (PPCPs)</h4>
<ul>
<li>Antimicrobials (triclosan, triclocarban) in soaps</li>
<li>Fragrances and preservatives</li>
<li>Pharmaceutical metabolites from bathing/handwashing</li>
<li>Endocrine-disrupting compounds</li>
</ul>

<h4>Research Questions</h4>
<ul>
<li>Fate and transport in soil during greywater irrigation</li>
<li>Plant uptake and food chain implications</li>
<li>Microbial community impacts</li>
<li>Treatment technology efficacy for PPCP removal</li>
</ul>

<h3>Advanced Treatment Technologies</h3>

<h4>Electrochemical Treatment</h4>
<p>Emerging approaches for decentralized greywater treatment:</p>
<ul>
<li>Electrooxidation for organic degradation</li>
<li>Electrocoagulation for particle removal</li>
<li>In-situ disinfectant generation</li>
<li>Energy efficiency optimization</li>
</ul>

<h4>Photocatalytic Treatment</h4>
<ul>
<li>TiO2 for organic contaminant degradation</li>
<li>Solar-powered systems for off-grid applications</li>
<li>Catalyst recovery and regeneration</li>
<li>Byproduct formation and toxicity</li>
</ul>

<h3>Integrated Urban Water Management</h3>

<h4>Fit-for-Purpose Frameworks</h4>
<p>Research on matching water quality to end use:</p>
<ul>
<li>Multi-criteria decision analysis for reuse options</li>
<li>Dynamic allocation based on quality and demand</li>
<li>Network optimization for distributed reuse</li>
</ul>

<h4>Urban Metabolism Modeling</h4>
<ul>
<li>Mass balance approaches at neighborhood/city scale</li>
<li>Integration with stormwater and blackwater management</li>
<li>Climate change scenarios and adaptation</li>
<li>Equity implications of decentralized systems</li>
</ul>

<h3>Methodological Approaches</h3>

<table class="methods-table">
<tr><th>Research Question</th><th>Methods</th><th>Key Considerations</th></tr>
<tr><td>Treatment efficacy</td><td>Bench/pilot studies, analytical chemistry</td><td>Representative water quality, detection limits</td></tr>
<tr><td>Health risk</td><td>QMRA, epidemiological studies</td><td>Exposure scenario accuracy, vulnerable populations</td></tr>
<tr><td>Adoption barriers</td><td>Surveys, interviews, experimental economics</td><td>Representative samples, hypothetical bias</td></tr>
<tr><td>System integration</td><td>Agent-based modeling, LCA</td><td>Model validation, uncertainty propagation</td></tr>
</table>

<h3>Research Ethics and Practice</h3>

<ul>
<li>Community engagement in decentralized water projects</li>
<li>Environmental justice considerations in system siting</li>
<li>Technology transfer to developing contexts</li>
<li>Open data and reproducibility</li>
</ul>

<div class="key-concept">
<h4>Doctoral Research Orientation</h4>
<p>Greywater research sits at the intersection of engineering, public health, and social science. Impactful work addresses both fundamental science (contaminant fate, treatment mechanisms) and practical implementation (policy design, adoption barriers). The urgency of water scarcity demands research that accelerates safe, equitable deployment of decentralized reuse systems.</p>
</div>
</div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-grey-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Save Shower Water!',
          MIDDLE_SCHOOL: 'Plan Greywater Reuse',
          HIGH_SCHOOL: 'System Selection',
          UNDERGRADUATE: 'Treatment Design',
          GRADUATE: 'Policy Development',
          PHD: 'Risk Assessment'
        },
        description: {
          ELEMENTARY: 'See how shower water can help your garden!',
          MIDDLE_SCHOOL: 'Plan how to reuse household greywater.',
          HIGH_SCHOOL: 'Select appropriate greywater systems for different homes.',
          UNDERGRADUATE: 'Design a greywater treatment system.',
          GRADUATE: 'Develop greywater policy recommendations.',
          PHD: 'Conduct microbial risk assessment.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-grey-game',
      type: 'simulation',
      title: 'Water Recycler',
      description: 'Design and manage greywater reuse systems!',
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
      id: 'ws-grey-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wgq1',
          question: {
            ELEMENTARY: 'What is NOT greywater?',
            MIDDLE_SCHOOL: 'What must you use with greywater for irrigation?',
            HIGH_SCHOOL: 'What is the simplest greywater system?',
            UNDERGRADUATE: 'What is a surge tank for?',
            GRADUATE: 'What social factor affects greywater adoption?',
            PHD: 'What is QMRA used for in greywater research?'
          },
          options: {
            ELEMENTARY: ['Toilet water', 'Shower water', 'Sink water', 'Laundry water'],
            MIDDLE_SCHOOL: ['Plant-safe soaps', 'Any soap', 'Bleach', 'Nothing special'],
            HIGH_SCHOOL: ['Laundry to landscape', 'Full treatment plant', 'Bottling system', 'Reverse osmosis'],
            UNDERGRADUATE: ['Temporary storage of variable flows', 'Heating water', 'Adding chemicals', 'Filtration'],
            GRADUATE: ['Perception of used water', 'Cost only', 'Availability only', 'No social factors exist'],
            PHD: ['Quantitative microbial risk assessment', 'Quality material review analysis', 'Quick monitoring rapid assessment', 'None of these']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Toilet water is called blackwater, not greywater - it needs special treatment!',
            MIDDLE_SCHOOL: 'Plant-safe soaps without harsh chemicals are needed for greywater irrigation.',
            HIGH_SCHOOL: 'Laundry to landscape is the simplest - direct from washer to mulch basins.',
            UNDERGRADUATE: 'Surge tanks handle variable greywater generation throughout the day.',
            GRADUATE: 'Public perception of "used" water significantly affects adoption rates.',
            PHD: 'QMRA (Quantitative Microbial Risk Assessment) evaluates pathogen exposure risks.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Greywater Action', url: 'https://greywateraction.org/', type: 'research' },
      { title: 'EPA Water Reuse', url: 'https://www.epa.gov/waterreuse', type: 'article' }
    ]
  },
  // Module 3: Drip Irrigation
  {
    id: 'water-drip',
    slug: 'drip-irrigation',
    title: 'Drip Irrigation',
    description: {
      ELEMENTARY: 'Learn about watering plants one drop at a time!',
      MIDDLE_SCHOOL: 'Discover efficient irrigation that saves water for farms and gardens.',
      HIGH_SCHOOL: 'Explore drip system design, components, and water savings.',
      UNDERGRADUATE: 'Analyze emitter hydraulics, scheduling, and system optimization.',
      GRADUATE: 'Examine precision irrigation, sensor integration, and deficit irrigation strategies.',
      PHD: 'Research variable rate irrigation, crop modeling, and climate-adaptive systems.'
    },
    topic: 'water-systems',
    category: 'IRRIGATION',
    icon: 'Droplets',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-drip-1',
        title: 'One Drop at a Time',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>Dewdrop's Special Delivery</h2>

<p>Dewdrop was a tiny water drop who had a very important job. While other water drops liked to spray everywhere and make puddles, Dewdrop was different.</p>

<p>"I like to go right where I'm needed!" Dewdrop said proudly.</p>

<div class="image-placeholder" data-caption="Dewdrop delivering water directly to a plant's roots">
[Image: A cheerful water droplet character traveling through a small tube directly to a plant's roots underground]
</div>

<h3>What is Drip Irrigation?</h3>

<p>Drip irrigation is like giving plants a drink through a tiny straw! Instead of spraying water everywhere, it delivers water drop by drop, right to where plants need it most—their roots.</p>

<h3>How Does It Work?</h3>

<ol>
<li><strong>Water flows through a hose</strong> — A long, thin tube carries water from the faucet</li>
<li><strong>Tiny holes let drops out</strong> — Little openings called "emitters" release water slowly</li>
<li><strong>Drops fall near the plant</strong> — The water drips right at the base of each plant</li>
<li><strong>Roots drink it up</strong> — Plant roots absorb the water underground</li>
</ol>

<h3>Why is Drip Irrigation So Cool?</h3>

<ul>
<li><strong>Saves water:</strong> Almost every drop goes to the plant—no waste!</li>
<li><strong>Healthy plants:</strong> Roots get exactly what they need</li>
<li><strong>No wet leaves:</strong> Dry leaves mean fewer plant diseases</li>
<li><strong>Less weeds:</strong> Only plants get water, not the spaces between</li>
<li><strong>Works while you're away:</strong> A timer can run it automatically</li>
</ul>

<h3>Where Do We Use Drip Irrigation?</h3>

<p>Dewdrop works in lots of places:</p>

<ul>
<li>Vegetable gardens with tomatoes, peppers, and squash</li>
<li>Flower beds and planters</li>
<li>Trees and shrubs</li>
<li>Farms growing fruits and vegetables</li>
<li>Greenhouses and nurseries</li>
</ul>

<div class="fun-fact">
<h4>Fun Fact!</h4>
<p>Ancient farmers in China used clay pots buried in the ground to slowly release water to plants. That's an early version of drip irrigation from over 2,000 years ago!</p>
</div>

<h3>Making Your Own Mini Drip System</h3>

<p>You can make a simple drip irrigator with a grown-up's help:</p>

<ol>
<li>Take a clean plastic bottle</li>
<li>Poke tiny holes in the cap</li>
<li>Fill with water and flip it upside down</li>
<li>Bury it slightly next to a plant</li>
<li>Watch it slowly drip water to the roots!</li>
</ol>

<div class="key-concept">
<h4>Remember!</h4>
<p>Drip irrigation delivers water one drop at a time, right to where plants need it. It saves water and keeps plants happy and healthy!</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Precision Watering: The Science of Drip Irrigation</h2>

<p>While sprinklers shoot water into the air hoping some lands on plants, drip irrigation takes a smarter approach: deliver water exactly where plants need it, exactly when they need it.</p>

<div class="image-placeholder" data-caption="Comparison of sprinkler vs drip irrigation efficiency">
[Image: Side-by-side comparison showing water waste from sprinklers versus targeted delivery from drip irrigation]
</div>

<h3>How Drip Systems Work</h3>

<p>A drip irrigation system has several key parts working together:</p>

<table class="components-table">
<tr><th>Part</th><th>What It Does</th></tr>
<tr><td>Water source</td><td>Faucet, well, or storage tank</td></tr>
<tr><td>Backflow preventer</td><td>Keeps dirty water from going back into drinking water</td></tr>
<tr><td>Filter</td><td>Removes particles that could clog emitters</td></tr>
<tr><td>Pressure regulator</td><td>Reduces water pressure to drip-friendly levels</td></tr>
<tr><td>Main line tubing</td><td>Carries water from source to garden areas</td></tr>
<tr><td>Drip tubing</td><td>Distributes water along plant rows</td></tr>
<tr><td>Emitters</td><td>Release water at controlled rates (usually 0.5-2 gallons per hour)</td></tr>
</table>

<h3>Water Savings: The Numbers</h3>

<p>Drip irrigation is incredibly efficient:</p>

<ul>
<li><strong>Drip irrigation:</strong> 90-95% of water reaches plant roots</li>
<li><strong>Sprinklers:</strong> Only 50-75% reaches plants (rest evaporates or lands on paths)</li>
<li><strong>Flood irrigation:</strong> Only 40-50% is used by plants</li>
</ul>

<p>That means drip can use 30-50% less water to grow the same plants!</p>

<h3>Types of Emitters</h3>

<ul>
<li><strong>Inline emitters:</strong> Built into the tubing at regular intervals</li>
<li><strong>Button emitters:</strong> Individual drippers you punch into tubing</li>
<li><strong>Micro-sprays:</strong> Tiny sprinklers for ground cover or dense plantings</li>
<li><strong>Soaker hose:</strong> Porous tubing that seeps water along its length</li>
</ul>

<h3>Benefits Beyond Water Savings</h3>

<ul>
<li><strong>Healthier plants:</strong> Consistent moisture reduces stress</li>
<li><strong>Less disease:</strong> Dry leaves mean fewer fungal problems</li>
<li><strong>Fewer weeds:</strong> Only watered areas grow plants</li>
<li><strong>Usable during windy conditions:</strong> Water doesn't blow away</li>
<li><strong>Lower water bills:</strong> Less water = less money spent</li>
<li><strong>Automation:</strong> Timers handle watering automatically</li>
</ul>

<h3>When to Water</h3>

<p>The best times for drip irrigation are:</p>

<ul>
<li><strong>Early morning:</strong> Less evaporation, plants absorb water before heat</li>
<li><strong>Evening:</strong> Cooler temperatures reduce water loss</li>
<li><strong>Avoid midday:</strong> Hot sun evaporates water quickly</li>
</ul>

<div class="did-you-know">
<h4>Did You Know?</h4>
<p>Israel is a world leader in drip irrigation technology. With limited water resources, Israeli engineers developed advanced drip systems that are now used to grow food in deserts around the world!</p>
</div>

<div class="key-concept">
<h4>Key Takeaway</h4>
<p>Drip irrigation delivers water directly to plant roots through small emitters, wasting almost nothing. It's one of the most efficient ways to water gardens and farms, saving water, money, and keeping plants healthier.</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Drip Irrigation Engineering: System Design and Optimization</h2>

<p>Modern drip irrigation systems represent sophisticated water delivery networks that balance hydraulic engineering, plant biology, and practical economics. Understanding system components and design principles enables effective installation and management.</p>

<div class="image-placeholder" data-caption="Complete drip irrigation system schematic">
[Image: Technical diagram showing all components of a professional drip irrigation system]
</div>

<h3>System Components in Detail</h3>

<table class="specs-table">
<tr><th>Component</th><th>Function</th><th>Specifications</th></tr>
<tr><td>Backflow preventer</td><td>Prevents contamination of water supply</td><td>RPZ or double-check valve</td></tr>
<tr><td>Filter</td><td>Removes particles</td><td>120-200 mesh for most emitters</td></tr>
<tr><td>Pressure regulator</td><td>Reduces pressure</td><td>Typically 15-30 PSI output</td></tr>
<tr><td>Main line</td><td>Water transport</td><td>1/2" - 1" polyethylene</td></tr>
<tr><td>Drip tubing</td><td>Distribution</td><td>1/4" - 1/2" with emitters</td></tr>
<tr><td>Emitters</td><td>Controlled water release</td><td>0.5-4 GPH flow rates</td></tr>
</table>

<h3>Emitter Technology</h3>

<h4>Pressure-Compensating vs. Non-Compensating</h4>

<ul>
<li><strong>Pressure-compensating:</strong> Maintain constant flow across pressure variations; essential for sloped terrain or long runs</li>
<li><strong>Non-compensating:</strong> Simpler, cheaper; flow varies with pressure; suitable for flat areas with short runs</li>
</ul>

<h4>Emitter Spacing</h4>
<p>Proper spacing ensures root zone coverage:</p>
<ul>
<li>Sandy soil: 12-18" (water spreads less)</li>
<li>Loam: 18-24"</li>
<li>Clay: 24-36" (water spreads more)</li>
</ul>

<h3>Hydraulic Calculations</h3>

<h4>Friction Loss</h4>
<p>Water loses pressure as it flows through tubing. Calculate using the Hazen-Williams equation:</p>

<code>h_f = (10.67 × Q^1.85 × L) / (C^1.85 × D^4.87)</code>

<p>Where: h_f = head loss, Q = flow rate, L = length, C = pipe coefficient, D = diameter</p>

<h4>Maximum Run Length</h4>
<p>Longer runs mean more friction loss and less uniform water distribution. Design guidelines:</p>
<ul>
<li>1/4" tubing: Maximum 30-50 feet</li>
<li>1/2" tubing: Maximum 200-400 feet</li>
<li>Maintain flow variation under 10% across the system</li>
</ul>

<h3>Scheduling Irrigation</h3>

<p>Irrigation scheduling balances water needs with system capacity:</p>

<ul>
<li><strong>ET-based:</strong> Match irrigation to evapotranspiration rates</li>
<li><strong>Soil moisture-based:</strong> Water when sensors indicate dryness</li>
<li><strong>Time-based:</strong> Fixed schedule adjusted seasonally</li>
</ul>

<h4>Calculating Runtime</h4>
<code>Runtime (hours) = Plant water need (gallons) / Emitter flow rate (GPH) / Number of emitters</code>

<h3>Maintenance Requirements</h3>

<ul>
<li>Clean filters monthly during growing season</li>
<li>Flush lines periodically to remove sediment</li>
<li>Check emitters for clogging or damage</li>
<li>Inspect for leaks, especially at connections</li>
<li>Winterize in cold climates</li>
</ul>

<div class="key-concept">
<h4>Engineering Insight</h4>
<p>Effective drip system design requires balancing hydraulic efficiency with practical installation and maintenance considerations. Pressure-compensating emitters and proper zone sizing ensure uniform water distribution across varying terrain and run lengths.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Drip Irrigation Systems Engineering: Hydraulics, Scheduling, and Optimization</h2>

<p>Professional drip system design integrates fluid mechanics, soil physics, and plant science to deliver water efficiently while minimizing infrastructure costs and operational complexity. This requires systematic approaches to hydraulic design, scheduling algorithms, and performance evaluation.</p>

<h3>Hydraulic Design Principles</h3>

<h4>Distribution Uniformity</h4>
<p>Uniformity metrics quantify irrigation consistency:</p>

<ul>
<li><strong>Emission Uniformity (EU):</strong> EU = 100 × (1 - (q_lq / q_avg))</li>
<li>Where q_lq = average of lowest quartile flows, q_avg = overall average</li>
<li>Target EU > 85% for drip systems</li>
</ul>

<h4>Manifold Sizing</h4>
<table class="hydraulic-table">
<tr><th>Parameter</th><th>Design Criterion</th><th>Calculation Method</th></tr>
<tr><td>Manifold diameter</td><td>Limit flow velocity < 5 fps</td><td>Q = V × A</td></tr>
<tr><td>Lateral length</td><td>Pressure variation < 20%</td><td>Hazen-Williams</td></tr>
<tr><td>Emitter spacing</td><td>Overlap for full coverage</td><td>Soil wetting patterns</td></tr>
</table>

<h4>Pressure Management</h4>
<ul>
<li>Operating pressure typically 15-30 psi for drip</li>
<li>Pressure compensating emitters for elevation changes > 3 feet</li>
<li>Pressure regulators sized for zone flow requirements</li>
</ul>

<h3>Soil-Water-Plant Relations</h3>

<h4>Wetting Patterns</h4>
<p>Emitter wetting patterns depend on:</p>
<ul>
<li>Soil texture (sand vs. clay)</li>
<li>Emitter flow rate</li>
<li>Application duration</li>
<li>Initial soil moisture</li>
</ul>

<h4>Root Zone Management</h4>
<ul>
<li>Match wetted volume to active root zone</li>
<li>Avoid waterlogging (maintain aeration)</li>
<li>Manage salinity by maintaining leaching fraction</li>
</ul>

<h3>Irrigation Scheduling</h3>

<h4>ET-Based Scheduling</h4>
<p>Reference ET (ET₀) from weather data × crop coefficient (Kc) = crop ET</p>

<ul>
<li>Daily or weekly scheduling based on cumulative ET</li>
<li>Soil water balance: θ_new = θ_old + I - ET - D</li>
<li>Trigger irrigation at management allowable depletion (MAD)</li>
</ul>

<h4>Sensor-Based Scheduling</h4>
<ul>
<li>Soil moisture sensors (capacitance, TDR, gypsum block)</li>
<li>Plant-based sensing (dendrometers, leaf temperature)</li>
<li>Closed-loop control systems</li>
</ul>

<h3>Fertigation</h3>

<p>Injecting fertilizers through drip systems:</p>

<ul>
<li><strong>Injection methods:</strong> Venturi, positive displacement, pressure differential</li>
<li><strong>Compatibility:</strong> Soluble fertilizers only; check chemical interactions</li>
<li><strong>Uniformity:</strong> Injection rate matched to irrigation flow</li>
<li><strong>Flushing:</strong> Clear lines after fertigation to prevent precipitation</li>
</ul>

<h3>System Evaluation</h3>

<h4>Field Testing Protocol</h4>
<ol>
<li>Measure emitter flow rates at multiple points</li>
<li>Calculate statistical uniformity</li>
<li>Identify clogged or malfunctioning emitters</li>
<li>Assess pressure distribution</li>
<li>Recommend adjustments or maintenance</li>
</ol>

<div class="key-concept">
<h4>Professional Practice</h4>
<p>Drip irrigation design balances hydraulic performance with practical constraints of cost, maintenance, and operator capabilities. Proper system evaluation and adjustment over time ensures the designed uniformity is maintained in the field.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Advanced Drip Irrigation: Precision Agriculture and Deficit Strategies</h2>

<p>Graduate-level drip irrigation analysis addresses the integration of sensing technologies, crop modeling, and optimization algorithms for precision water management. Advanced applications include deficit irrigation strategies, variable rate application, and decision support systems.</p>

<h3>Precision Irrigation Technologies</h3>

<h4>Sensor Networks</h4>
<table class="sensor-table">
<tr><th>Sensor Type</th><th>Measurement</th><th>Advantages</th><th>Limitations</th></tr>
<tr><td>TDR</td><td>Soil water content</td><td>Accurate, fast</td><td>Expensive, installation</td></tr>
<tr><td>Capacitance</td><td>Soil dielectric</td><td>Lower cost, logging</td><td>Calibration needed</td></tr>
<tr><td>Tensiometer</td><td>Soil water potential</td><td>Direct measure</td><td>Maintenance, range</td></tr>
<tr><td>Thermal</td><td>Plant stress</td><td>Non-contact</td><td>Weather dependent</td></tr>
</table>

<h4>Variable Rate Irrigation (VRI)</h4>
<ul>
<li>Spatially variable application based on zone maps</li>
<li>Integration with GPS and prescription maps</li>
<li>Pulse-width modulation for flow control</li>
<li>Economic optimization of water allocation</li>
</ul>

<h3>Deficit Irrigation Strategies</h3>

<h4>Regulated Deficit Irrigation (RDI)</h4>
<p>Controlled water stress during specific growth stages:</p>
<ul>
<li>Identify stress-tolerant growth periods</li>
<li>Reduce irrigation during vegetative growth</li>
<li>Maintain full irrigation during critical reproductive stages</li>
<li>Potential water savings 20-40% with minimal yield impact</li>
</ul>

<h4>Partial Root Zone Drying (PRD)</h4>
<ul>
<li>Alternate wetting and drying of root system halves</li>
<li>Induces physiological responses (stomatal closure, ABA signaling)</li>
<li>Maintains plant water status while signaling drought</li>
<li>Requires dual-drip line systems</li>
</ul>

<h3>Crop Modeling Integration</h3>

<h4>Water Production Functions</h4>
<p>Relating water application to yield:</p>
<ul>
<li>Linear: Y/Ymax = a × (ET/ETmax)</li>
<li>Curvilinear models capture diminishing returns</li>
<li>Stage-specific sensitivity coefficients</li>
</ul>

<h4>Decision Support Systems</h4>
<ul>
<li>Integration of weather forecasts, crop models, economics</li>
<li>Optimization algorithms for irrigation scheduling</li>
<li>Mobile/web interfaces for farmer access</li>
<li>Machine learning for adaptive management</li>
</ul>

<h3>Water Quality and Clogging</h3>

<h4>Clogging Agents</h4>
<ul>
<li><strong>Physical:</strong> Suspended solids, sand, silt</li>
<li><strong>Chemical:</strong> Calcium carbonate, iron precipitation</li>
<li><strong>Biological:</strong> Algae, bacterial slimes, root intrusion</li>
</ul>

<h4>Prevention and Treatment</h4>
<ul>
<li>Filtration matched to water quality</li>
<li>Chemical treatment (chlorination, acidification)</li>
<li>Flushing protocols</li>
<li>Pressure compensation to detect blockages</li>
</ul>

<div class="key-concept">
<h4>Research Directions</h4>
<p>Key frontiers include sensor fusion and machine learning for irrigation decisions, crop model parameterization for diverse genotypes and environments, economic optimization under water scarcity, and integration with precision nutrient management for sustainable intensification.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Drip Irrigation Research: Soil-Water Dynamics, Optimization, and System Innovation</h2>

<p>Doctoral research in drip irrigation spans fundamental soil physics, advanced control theory, and systems engineering. This work addresses both the physics of water movement and the practical challenges of implementing precision irrigation at scale.</p>

<h3>Soil Water Flow Under Drip</h3>

<h4>Richards Equation</h4>
<p>Governing equation for unsaturated flow:</p>
<code>∂θ/∂t = ∇·[K(θ)∇(h + z)]</code>

<ul>
<li>Nonlinear due to K(θ) and h(θ) relationships</li>
<li>Numerical solutions (finite element, finite difference)</li>
<li>HYDRUS and similar models for design and analysis</li>
</ul>

<h4>Modeling Challenges</h4>
<ul>
<li>Soil heterogeneity at field scale</li>
<li>Hysteresis in wetting-drying cycles</li>
<li>Root water uptake representation</li>
<li>Coupled water-solute transport</li>
</ul>

<h3>Optimization Theory</h3>

<h4>Objective Functions</h4>
<ul>
<li>Maximize yield given water constraint</li>
<li>Minimize water use for target yield</li>
<li>Maximize profit considering water and yield prices</li>
<li>Multi-objective optimization (yield, water, quality)</li>
</ul>

<h4>Optimization Approaches</h4>
<table class="optimization-table">
<tr><th>Method</th><th>Application</th><th>Considerations</th></tr>
<tr><td>Dynamic programming</td><td>Seasonal allocation</td><td>Curse of dimensionality</td></tr>
<tr><td>Genetic algorithms</td><td>System design</td><td>Convergence, computational cost</td></tr>
<tr><td>Model predictive control</td><td>Real-time scheduling</td><td>Model accuracy, horizon length</td></tr>
<tr><td>Reinforcement learning</td><td>Adaptive control</td><td>Training data, generalization</td></tr>
</table>

<h3>Remote Sensing for Irrigation</h3>

<h4>Vegetation Indices</h4>
<ul>
<li>NDVI, NDWI for crop status monitoring</li>
<li>Thermal imaging for water stress detection</li>
<li>Multispectral imagery for variable rate prescription</li>
</ul>

<h4>ET Estimation</h4>
<ul>
<li>Surface energy balance models (SEBAL, METRIC)</li>
<li>Integration with weather station networks</li>
<li>Validation against lysimeter and flux tower data</li>
</ul>

<h3>Emerging Technologies</h3>

<ul>
<li><strong>Subsurface drip irrigation (SDI):</strong> Buried emitters for perennial and annual crops</li>
<li><strong>Micro-irrigation automation:</strong> IoT-enabled systems with cloud analytics</li>
<li><strong>Solar-powered systems:</strong> Photovoltaic pumping for remote areas</li>
<li><strong>Biodegradable drip tape:</strong> Reducing plastic waste in annual crops</li>
</ul>

<h3>Methodological Considerations</h3>

<ul>
<li>Field experimental design for variable spatial conditions</li>
<li>Statistical approaches for non-normal, spatially correlated data</li>
<li>Model validation protocols</li>
<li>Transferability of results across environments</li>
</ul>

<div class="key-concept">
<h4>Doctoral Research Orientation</h4>
<p>Drip irrigation research integrates physics-based modeling with data-driven approaches, field experimentation with remote sensing, and engineering design with economic analysis. The challenge is developing methods that work robustly in real-world conditions while advancing fundamental understanding of soil-water-plant systems.</p>
</div>
</div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-drip-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Water the Garden!',
          MIDDLE_SCHOOL: 'Design a Drip System',
          HIGH_SCHOOL: 'Calculate Water Needs',
          UNDERGRADUATE: 'Hydraulic Design',
          GRADUATE: 'Sensor Integration',
          PHD: 'Optimization Model'
        },
        description: {
          ELEMENTARY: 'Place drip lines to water all the plants!',
          MIDDLE_SCHOOL: 'Design a simple drip system for a garden.',
          HIGH_SCHOOL: 'Calculate emitter spacing and flow rates.',
          UNDERGRADUATE: 'Design system hydraulics for uniform distribution.',
          GRADUATE: 'Integrate sensors for automated scheduling.',
          PHD: 'Develop optimization model for water productivity.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-drip-game',
      type: 'simulation',
      title: 'Drip Designer',
      description: 'Design efficient drip irrigation systems!',
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
      id: 'ws-drip-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wdq1',
          question: {
            ELEMENTARY: 'How does drip irrigation water plants?',
            MIDDLE_SCHOOL: 'How much water can drip save vs sprinklers?',
            HIGH_SCHOOL: 'What prevents emitter clogging?',
            UNDERGRADUATE: 'What ensures even water distribution in drip?',
            GRADUATE: 'What is deficit irrigation?',
            PHD: 'What does variable rate irrigation optimize?'
          },
          options: {
            ELEMENTARY: ['One drop at a time to the roots', 'Big sprays in the air', 'Flooding the whole area', 'Only when it rains'],
            MIDDLE_SCHOOL: ['30-50% less water', 'Same amount', 'More water', '10% less'],
            HIGH_SCHOOL: ['A filter', 'Nothing', 'Hot water', 'Fast flow'],
            UNDERGRADUATE: ['Pressure compensation and uniform emitters', 'Long tubing only', 'No design needed', 'High pressure only'],
            GRADUATE: ['Purposely applying less than full crop water needs', 'Giving extra water', 'No irrigation', 'Flood irrigation'],
            PHD: ['Water application matching spatial crop needs', 'Uniform application everywhere', 'Random application', 'Manual scheduling only']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Drip irrigation slowly drips water right at plant roots!',
            MIDDLE_SCHOOL: 'Drip irrigation uses 30-50% less water than sprinklers.',
            HIGH_SCHOOL: 'Filters remove particles that could clog small emitter openings.',
            UNDERGRADUATE: 'Pressure-compensating emitters ensure uniform flow despite pressure changes.',
            GRADUATE: 'Deficit irrigation strategically under-waters to improve water productivity.',
            PHD: 'Variable rate irrigation optimizes application based on spatial variability in crop needs.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Irrigation Association', url: 'https://www.irrigation.org/', type: 'research' },
      { title: 'USDA NRCS Irrigation', url: 'https://www.nrcs.usda.gov/', type: 'article' }
    ]
  },
  // Module 4: Wetland Restoration
  {
    id: 'water-wetlands',
    slug: 'wetland-restoration',
    title: 'Wetland Restoration',
    description: {
      ELEMENTARY: 'Discover amazing wetland ecosystems that clean water naturally!',
      MIDDLE_SCHOOL: 'Learn how wetlands filter water and provide wildlife habitat.',
      HIGH_SCHOOL: 'Explore wetland ecology, ecosystem services, and restoration techniques.',
      UNDERGRADUATE: 'Analyze wetland hydrology, biogeochemistry, and restoration design.',
      GRADUATE: 'Examine constructed wetlands, mitigation banking, and policy frameworks.',
      PHD: 'Research wetland carbon dynamics, long-term restoration trajectories, and climate adaptation.'
    },
    topic: 'water-systems',
    category: 'ECOSYSTEMS',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-wet-1',
        title: 'Nature\'s Sponges',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🐸 Wonderful Wetlands!</h2><p>Wetlands are like giant sponges that clean water and provide homes for wildlife!</p><h3>What Wetlands Do</h3><ul><li>🧹 Clean dirty water</li><li>🐸 Home for frogs and birds</li><li>🌊 Stop floods</li><li>🌿 Grow amazing plants</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Wetland Ecosystem Services</h2><h3>Water Quality</h3><p>Wetlands filter pollutants, trap sediments, and transform nutrients through natural processes.</p><h3>Other Benefits</h3><ul><li>Flood control and storage</li><li>Groundwater recharge</li><li>Wildlife habitat</li><li>Carbon storage</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Wetland Ecology</h2><h3>Types of Wetlands</h3><ul><li><strong>Marshes:</strong> Herbaceous plants, standing water</li><li><strong>Swamps:</strong> Tree-dominated</li><li><strong>Bogs:</strong> Acidic, peat-forming</li><li><strong>Fens:</strong> Groundwater-fed</li></ul><h3>Restoration</h3><p>Reconnecting hydrology, planting natives, removing invasives.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Wetland Science</h2><h3>Hydrology</h3><ul><li>Hydroperiod (timing and duration)</li><li>Water sources and sinks</li><li>Hydrologic restoration</li></ul><h3>Biogeochemistry</h3><p>Nutrient cycling, denitrification, carbon sequestration.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Constructed Wetlands</h2><h3>Treatment Wetlands</h3><ul><li>Free water surface</li><li>Subsurface flow</li><li>Hybrid systems</li></ul><h3>Mitigation Banking</h3><p>Credit systems for wetland protection and restoration.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Key Questions</h3><ul><li>Long-term restoration trajectories</li><li>Carbon and greenhouse gases</li><li>Climate change impacts</li><li>Restoration outcome prediction</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-wet-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Wetland!',
          MIDDLE_SCHOOL: 'Ecosystem Explorer',
          HIGH_SCHOOL: 'Restoration Planning',
          UNDERGRADUATE: 'Hydrologic Design',
          GRADUATE: 'Treatment System',
          PHD: 'Carbon Modeling'
        },
        description: {
          ELEMENTARY: 'Create a wetland habitat for wildlife!',
          MIDDLE_SCHOOL: 'Explore wetland ecosystems and their services.',
          HIGH_SCHOOL: 'Plan a wetland restoration project.',
          UNDERGRADUATE: 'Design wetland hydrology for restoration.',
          GRADUATE: 'Design a constructed treatment wetland.',
          PHD: 'Model wetland carbon dynamics.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-wet-game',
      type: 'simulation',
      title: 'Wetland Builder',
      description: 'Restore and manage healthy wetland ecosystems!',
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
      id: 'ws-wet-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wwq1',
          question: {
            ELEMENTARY: 'What do wetlands do for water?',
            MIDDLE_SCHOOL: 'What ecosystem service do wetlands provide for climate?',
            HIGH_SCHOOL: 'What is a marsh?',
            UNDERGRADUATE: 'What is hydroperiod?',
            GRADUATE: 'What is mitigation banking?',
            PHD: 'What greenhouse gas concern exists for wetlands?'
          },
          options: {
            ELEMENTARY: ['Clean it like a filter', 'Make it dirty', 'Heat it up', 'Freeze it'],
            MIDDLE_SCHOOL: ['Carbon storage', 'Heat production', 'Ozone creation', 'No climate services'],
            HIGH_SCHOOL: ['Herbaceous plants with standing water', 'Desert ecosystem', 'Mountain top', 'Ocean'],
            UNDERGRADUATE: ['Timing and duration of flooding', 'Water temperature', 'Water color', 'Fish population'],
            GRADUATE: ['Credit system for wetland protection', 'Bank near wetlands', 'Water storage', 'Fish farming'],
            PHD: ['Methane emissions from anaerobic conditions', 'Too much oxygen', 'No concerns', 'Only CO2 uptake']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Wetlands clean water by filtering out dirt and pollution naturally!',
            MIDDLE_SCHOOL: 'Wetlands store large amounts of carbon in their soils and plants.',
            HIGH_SCHOOL: 'Marshes are wetlands dominated by herbaceous plants with standing water.',
            UNDERGRADUATE: 'Hydroperiod describes when and how long a wetland is flooded.',
            GRADUATE: 'Mitigation banking creates credits for wetland restoration to offset impacts elsewhere.',
            PHD: 'Wetlands can emit methane under anaerobic conditions, complicating carbon benefits.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Society of Wetland Scientists', url: 'https://www.sws.org/', type: 'research' },
      { title: 'EPA Wetlands', url: 'https://www.epa.gov/wetlands', type: 'article' }
    ]
  },
  // Module 5: Water Conservation
  {
    id: 'water-conservation',
    slug: 'water-conservation',
    title: 'Water Conservation',
    description: {
      ELEMENTARY: 'Learn simple ways to save water every day!',
      MIDDLE_SCHOOL: 'Discover household and community water conservation strategies.',
      HIGH_SCHOOL: 'Explore water efficiency, demand management, and conservation technologies.',
      UNDERGRADUATE: 'Analyze water use efficiency, pricing, and conservation program design.',
      GRADUATE: 'Examine water demand management, behavioral economics, and policy tools.',
      PHD: 'Research conservation effectiveness, long-term behavioral change, and system optimization.'
    },
    topic: 'water-systems',
    category: 'CONSERVATION',
    icon: 'Shield',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-cons-1',
        title: 'Every Drop Counts',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>💧 Save Water!</h2><p>Water is precious! Here's how to save it every day.</p><h3>Easy Ways to Save</h3><ul><li>🚿 Short showers</li><li>🦷 Turn off while brushing</li><li>🚽 Don't flush unnecessarily</li><li>🌧️ Catch rain for plants</li><li>🚰 Fix leaky faucets</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Water Conservation at Home</h2><h3>Indoor Savings</h3><ul><li>Low-flow showerheads</li><li>Efficient toilets</li><li>Full loads only (washer, dishwasher)</li><li>Fix leaks promptly</li></ul><h3>Outdoor Savings</h3><ul><li>Water early morning</li><li>Mulch gardens</li><li>Choose native plants</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Conservation Technologies</h2><h3>Efficient Fixtures</h3><ul><li>WaterSense certification</li><li>1.28 GPF toilets (vs 3.5 GPF old)</li><li>1.5 GPM faucet aerators</li></ul><h3>Smart Systems</h3><ul><li>Leak detection sensors</li><li>Smart irrigation controllers</li><li>Real-time monitoring</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Conservation Economics</h2><h3>Pricing Strategies</h3><ul><li>Tiered/block pricing</li><li>Seasonal pricing</li><li>Water budgets</li></ul><h3>Program Design</h3><p>Rebates, audits, education, regulations.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Demand Management</h2><h3>Behavioral Approaches</h3><ul><li>Social norms messaging</li><li>Real-time feedback</li><li>Gamification</li></ul><h3>Policy Integration</h3><p>Building codes, landscaping ordinances, utility programs.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Key Questions</h3><ul><li>Long-term behavior persistence</li><li>Conservation vs. efficiency rebound</li><li>Equity implications</li><li>Climate adaptation integration</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-cons-act-1',
        type: 'STEP_GUIDED',
        title: {
          ELEMENTARY: 'Water Saving Challenge!',
          MIDDLE_SCHOOL: 'Home Water Audit',
          HIGH_SCHOOL: 'Efficiency Calculator',
          UNDERGRADUATE: 'Program Design',
          GRADUATE: 'Behavioral Study',
          PHD: 'Impact Assessment'
        },
        description: {
          ELEMENTARY: 'Find ways to save water around your home!',
          MIDDLE_SCHOOL: 'Conduct a water audit of your household.',
          HIGH_SCHOOL: 'Calculate savings from efficiency upgrades.',
          UNDERGRADUATE: 'Design a water conservation program.',
          GRADUATE: 'Design a behavioral conservation study.',
          PHD: 'Assess long-term conservation program impact.'
        },
        config: {
          ELEMENTARY: { steps: 5, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { steps: 8, hints: true, timeLimit: 180 },
          HIGH_SCHOOL: { steps: 10, hints: false, timeLimit: 150 },
          UNDERGRADUATE: { steps: 12, hints: false, timeLimit: 180 },
          GRADUATE: { steps: 15, hints: false, timeLimit: 120 },
          PHD: { steps: 20, hints: false, timeLimit: 90 }
        }
      }
    ],
    game: {
      id: 'ws-cons-game',
      type: 'puzzle',
      title: 'Water Saver',
      description: 'Find all the ways to conserve water!',
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
      id: 'ws-cons-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wcq1',
          question: {
            ELEMENTARY: 'What is an easy way to save water?',
            MIDDLE_SCHOOL: 'What does low-flow mean for showerheads?',
            HIGH_SCHOOL: 'What certification indicates water-efficient fixtures?',
            UNDERGRADUATE: 'What is tiered water pricing?',
            GRADUATE: 'What behavioral technique uses peer comparison?',
            PHD: 'What is the efficiency rebound effect?'
          },
          options: {
            ELEMENTARY: ['Turn off tap while brushing teeth', 'Leave water running always', 'Take hour-long showers', 'Water grass at noon'],
            MIDDLE_SCHOOL: ['Uses less water per minute', 'Uses more water', 'Hot water only', 'No difference'],
            HIGH_SCHOOL: ['WaterSense', 'EnergyStar', 'USDA Organic', 'Fair Trade'],
            UNDERGRADUATE: ['Higher prices for more use', 'Same price for all', 'Lower prices for more use', 'Free water'],
            GRADUATE: ['Social norms messaging', 'No peer information', 'Price only', 'Random feedback'],
            PHD: ['Savings offset by increased use', 'No change', 'Always more savings', 'Immediate success']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Turning off the tap while brushing saves gallons every day!',
            MIDDLE_SCHOOL: 'Low-flow showerheads use fewer gallons per minute while maintaining pressure.',
            HIGH_SCHOOL: 'WaterSense is the EPA program certifying water-efficient fixtures.',
            UNDERGRADUATE: 'Tiered pricing charges higher rates as usage increases, encouraging conservation.',
            GRADUATE: 'Social norms messaging shows how your use compares to neighbors.',
            PHD: 'Efficiency rebound occurs when savings from efficiency are offset by increased consumption.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'EPA WaterSense', url: 'https://www.epa.gov/watersense', type: 'research' },
      { title: 'Alliance for Water Efficiency', url: 'https://www.allianceforwaterefficiency.org/', type: 'article' }
    ]
  },
  // Module 6: Groundwater Management
  {
    id: 'water-groundwater',
    slug: 'groundwater-management',
    title: 'Groundwater Management',
    description: {
      ELEMENTARY: 'Discover the hidden water underground that we drink!',
      MIDDLE_SCHOOL: 'Learn about aquifers and how we use groundwater sustainably.',
      HIGH_SCHOOL: 'Explore groundwater hydrology, wells, and aquifer management.',
      UNDERGRADUATE: 'Analyze groundwater modeling, sustainable yield, and contamination.',
      GRADUATE: 'Examine conjunctive use, managed aquifer recharge, and governance.',
      PHD: 'Research groundwater-surface water interactions, modeling uncertainty, and policy.'
    },
    topic: 'water-systems',
    category: 'GROUNDWATER',
    icon: 'Layers',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-gw-1', title: 'Water Underground', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Hidden Water!</h2><p>Under the ground, there is water hiding in rocks and sand called groundwater!</p>', MIDDLE_SCHOOL: '<h2>What is Groundwater?</h2><p>Water that fills spaces between underground rocks is called groundwater. Aquifers are layers that hold lots of this water.</p>', HIGH_SCHOOL: '<h2>Groundwater Hydrology</h2><p>Aquifers, water tables, recharge zones, and flow paths. Wells tap into this underground resource.</p>', UNDERGRADUATE: '<h2>Aquifer Management</h2><p>Sustainable yield, pumping tests, drawdown analysis, and contamination risk assessment.</p>', GRADUATE: '<h2>Managed Aquifer Recharge</h2><p>Intentionally recharging aquifers with surface water or treated wastewater for storage.</p>', PHD: '<h2>Research Frontiers</h2><p>Groundwater-surface water interactions, transboundary aquifers, and climate impacts.</p>' } }],
    activities: [{ id: 'ws-gw-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Dig a Well!', MIDDLE_SCHOOL: 'Explore Aquifers', HIGH_SCHOOL: 'Well Design', UNDERGRADUATE: 'Yield Analysis', GRADUATE: 'Recharge Planning', PHD: 'Model Development' }, description: { ELEMENTARY: 'Find water underground!', MIDDLE_SCHOOL: 'Explore how aquifers store and move water.', HIGH_SCHOOL: 'Design a well for a community.', UNDERGRADUATE: 'Analyze sustainable pumping rates.', GRADUATE: 'Plan a managed aquifer recharge project.', PHD: 'Develop a groundwater flow model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-gw-game', type: 'simulation', title: 'Aquifer Manager', description: 'Manage groundwater sustainably!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-gw-quiz', passingScore: 80, questions: [{ id: 'wgwq1', question: { ELEMENTARY: 'Where is groundwater found?', MIDDLE_SCHOOL: 'What is an aquifer?', HIGH_SCHOOL: 'What is the water table?', UNDERGRADUATE: 'What is sustainable yield?', GRADUATE: 'What is MAR?', PHD: 'What complicates groundwater modeling?' }, options: { ELEMENTARY: ['Underground in rocks and sand', 'In clouds', 'On top of mountains', 'In the ocean only'], MIDDLE_SCHOOL: ['An underground layer holding water', 'A type of fish', 'A water tank', 'A river'], HIGH_SCHOOL: ['Top of saturated zone', 'Bottom of ocean', 'Surface of lakes', 'Cloud level'], UNDERGRADUATE: ['Pumping rate aquifer can sustain', 'Maximum possible pumping', 'Zero pumping', 'Unlimited pumping'], GRADUATE: ['Managed Aquifer Recharge', 'Maximum Annual Rainfall', 'Minimum Aquifer Recovery', 'Major Aquifer Region'], PHD: ['Heterogeneity and data uncertainty', 'Too simple', 'Perfect data available', 'No complications'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Groundwater is found underground in spaces between rocks, sand, and soil!', MIDDLE_SCHOOL: 'An aquifer is an underground layer of rock or sediment that holds water.', HIGH_SCHOOL: 'The water table is the top of the saturated zone where all pores are filled with water.', UNDERGRADUATE: 'Sustainable yield is the pumping rate an aquifer can support without long-term depletion.', GRADUATE: 'MAR (Managed Aquifer Recharge) intentionally stores water underground for later use.', PHD: 'Aquifer heterogeneity and limited subsurface data create significant modeling uncertainty.' } }] },
    externalResources: [{ title: 'USGS Groundwater', url: 'https://www.usgs.gov/mission-areas/water-resources', type: 'research' }]
  },
  // Module 7: Stormwater Management
  {
    id: 'water-stormwater',
    slug: 'stormwater-management',
    title: 'Stormwater Management',
    description: {
      ELEMENTARY: 'Learn what happens to rain when it lands on streets and parking lots!',
      MIDDLE_SCHOOL: 'Discover how cities manage rainwater runoff to prevent pollution and flooding.',
      HIGH_SCHOOL: 'Explore green infrastructure, detention systems, and low impact development.',
      UNDERGRADUATE: 'Analyze stormwater modeling, BMP design, and regulatory compliance.',
      GRADUATE: 'Examine integrated stormwater management, MS4 permits, and green-gray integration.',
      PHD: 'Research urban hydrology, climate adaptation, and multi-objective optimization.'
    },
    topic: 'water-systems',
    category: 'STORMWATER',
    icon: 'CloudRain',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-sw-1', title: 'Where Rain Goes', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Rain in the City!</h2><p>In cities, rain lands on hard surfaces like roads and parking lots and has to go somewhere!</p>', MIDDLE_SCHOOL: '<h2>Stormwater Runoff</h2><p>Hard surfaces prevent rain from soaking in. It runs off, picking up pollutants and causing flooding.</p>', HIGH_SCHOOL: '<h2>Green Infrastructure</h2><p>Rain gardens, bioswales, permeable pavement, and green roofs slow and filter stormwater naturally.</p>', UNDERGRADUATE: '<h2>BMP Design</h2><p>Best Management Practices sized for storm events, soil conditions, and pollutant removal targets.</p>', GRADUATE: '<h2>Integrated Management</h2><p>Combining green and gray infrastructure, regulatory requirements, and urban planning.</p>', PHD: '<h2>Research Frontiers</h2><p>Urban hydrology modeling, climate change adaptation, and ecosystem services valuation.</p>' } }],
    activities: [{ id: 'ws-sw-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Stop the Flood!', MIDDLE_SCHOOL: 'Design a Rain Garden', HIGH_SCHOOL: 'BMP Selection', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Permit Compliance', PHD: 'Multi-Objective Design' }, description: { ELEMENTARY: 'Help rain soak into the ground instead of flooding!', MIDDLE_SCHOOL: 'Design a rain garden to capture runoff.', HIGH_SCHOOL: 'Select BMPs for a development site.', UNDERGRADUATE: 'Size a stormwater system for design storms.', GRADUATE: 'Develop a stormwater management program for compliance.', PHD: 'Optimize green infrastructure for multiple objectives.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-sw-game', type: 'simulation', title: 'Stormwater Engineer', description: 'Design systems to manage urban runoff!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-sw-quiz', passingScore: 80, questions: [{ id: 'wswq1', question: { ELEMENTARY: 'Why does rain cause problems in cities?', MIDDLE_SCHOOL: 'What is a rain garden?', HIGH_SCHOOL: 'What does permeable pavement do?', UNDERGRADUATE: 'What does BMP stand for?', GRADUATE: 'What is an MS4 permit?', PHD: 'What is LID?' }, options: { ELEMENTARY: ['Hard surfaces prevent it from soaking in', 'Rain is always bad', 'Cities have no rain', 'Rain only falls on grass'], MIDDLE_SCHOOL: ['A planted area that collects and filters runoff', 'A flower garden', 'An indoor garden', 'A vegetable garden'], HIGH_SCHOOL: ['Allows water to soak through', 'Blocks all water', 'Heats up water', 'Only for cars'], UNDERGRADUATE: ['Best Management Practice', 'Big Management Project', 'Building Material Permit', 'Basic Monitoring Plan'], GRADUATE: ['Municipal Separate Storm Sewer permit', 'Main Street 4 permit', 'Monitoring System 4', 'Maximum Storm 4'], PHD: ['Low Impact Development', 'Large Industrial Design', 'Limited Interior Drainage', 'Local Improvement District'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Rain causes problems because hard surfaces like roads prevent it from soaking into the ground!', MIDDLE_SCHOOL: 'Rain gardens are planted depressions that collect runoff and let it soak in slowly while filtering pollutants.', HIGH_SCHOOL: 'Permeable pavement has gaps that allow water to pass through and infiltrate into the ground.', UNDERGRADUATE: 'BMP stands for Best Management Practice - techniques to manage stormwater quantity and quality.', GRADUATE: 'MS4 (Municipal Separate Storm Sewer System) permits regulate stormwater discharges from cities.', PHD: 'LID (Low Impact Development) mimics natural hydrology to manage stormwater at its source.' } }] },
    externalResources: [{ title: 'EPA Stormwater', url: 'https://www.epa.gov/npdes/stormwater-discharges-municipal-sources', type: 'research' }]
  },
  // Module 8: Water Quality Monitoring
  {
    id: 'water-quality',
    slug: 'water-quality-monitoring',
    title: 'Water Quality Monitoring',
    description: {
      ELEMENTARY: 'Learn how scientists check if water is clean and safe!',
      MIDDLE_SCHOOL: 'Discover the tests used to measure water quality in streams and lakes.',
      HIGH_SCHOOL: 'Explore water quality parameters, testing methods, and indicator species.',
      UNDERGRADUATE: 'Analyze monitoring program design, QA/QC, and data interpretation.',
      GRADUATE: 'Examine regulatory standards, TMDL development, and adaptive management.',
      PHD: 'Research sensor networks, real-time monitoring, and predictive modeling.'
    },
    topic: 'water-systems',
    category: 'MONITORING',
    icon: 'TestTube',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-wq-1', title: 'Is the Water Clean?', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Detectives!</h2><p>Scientists test water to make sure it is safe for drinking, swimming, and fish!</p>', MIDDLE_SCHOOL: '<h2>Testing Water Quality</h2><p>pH, dissolved oxygen, temperature, turbidity, and nutrients tell us about water health.</p>', HIGH_SCHOOL: '<h2>Water Quality Parameters</h2><p>Physical (temp, turbidity), chemical (pH, DO, nutrients), and biological (bacteria, macroinvertebrates) indicators.</p>', UNDERGRADUATE: '<h2>Monitoring Programs</h2><p>Sampling design, QA/QC protocols, chain of custody, and data management.</p>', GRADUATE: '<h2>Regulatory Framework</h2><p>Water quality standards, designated uses, TMDLs, and impaired waters listings.</p>', PHD: '<h2>Research Frontiers</h2><p>Real-time sensor networks, machine learning for prediction, and emerging contaminants.</p>' } }],
    activities: [{ id: 'ws-wq-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Test the Water!', MIDDLE_SCHOOL: 'Stream Survey', HIGH_SCHOOL: 'Parameter Analysis', UNDERGRADUATE: 'Program Design', GRADUATE: 'TMDL Development', PHD: 'Sensor Network' }, description: { ELEMENTARY: 'Test water samples to see if they are clean!', MIDDLE_SCHOOL: 'Conduct a stream water quality survey.', HIGH_SCHOOL: 'Analyze multiple water quality parameters.', UNDERGRADUATE: 'Design a monitoring program for a watershed.', GRADUATE: 'Develop a TMDL for an impaired stream.', PHD: 'Design a real-time water quality sensor network.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-wq-game', type: 'puzzle', title: 'Water Detective', description: 'Solve water quality mysteries!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-wq-quiz', passingScore: 80, questions: [{ id: 'wwqq1', question: { ELEMENTARY: 'Why do we test water?', MIDDLE_SCHOOL: 'What does dissolved oxygen tell us?', HIGH_SCHOOL: 'What are macroinvertebrates used for?', UNDERGRADUATE: 'What is QA/QC in monitoring?', GRADUATE: 'What is a TMDL?', PHD: 'What is a key challenge for real-time monitoring?' }, options: { ELEMENTARY: ['To make sure it is safe', 'For fun', 'To make it blue', 'To heat it up'], MIDDLE_SCHOOL: ['How much oxygen fish can breathe', 'Water color', 'Water taste', 'Water weight'], HIGH_SCHOOL: ['Biological indicators of water quality', 'Food for fish only', 'Decoration', 'Not used'], UNDERGRADUATE: ['Quality assurance and control', 'Questions and answers', 'Quick and quiet', 'Quantity and quality'], GRADUATE: ['Total Maximum Daily Load for pollutants', 'Temperature Maximum Daily Limit', 'Total Minimum Drainage Level', 'Test Method Development Lab'], PHD: ['Sensor fouling and calibration', 'Too easy', 'No power needed', 'Perfect accuracy always'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We test water to make sure it is safe for people, animals, and plants!', MIDDLE_SCHOOL: 'Dissolved oxygen tells us how much oxygen is available for fish and other aquatic life.', HIGH_SCHOOL: 'Macroinvertebrates like insects and snails indicate long-term water quality conditions.', UNDERGRADUATE: 'QA/QC ensures data quality through protocols, calibration, and verification.', GRADUATE: 'A TMDL sets the maximum amount of a pollutant a water body can receive and still meet standards.', PHD: 'Sensor fouling from biofouling and sediment requires frequent maintenance and calibration.' } }] },
    externalResources: [{ title: 'EPA Water Quality Standards', url: 'https://www.epa.gov/wqs-tech', type: 'research' }]
  },
  // Module 9: Aquaponics
  {
    id: 'water-aquaponics',
    slug: 'aquaponics-systems',
    title: 'Aquaponics Systems',
    description: {
      ELEMENTARY: 'Discover how fish and plants can grow together in one system!',
      MIDDLE_SCHOOL: 'Learn how aquaponics combines fish farming and plant growing.',
      HIGH_SCHOOL: 'Explore the nitrogen cycle, system types, and water chemistry in aquaponics.',
      UNDERGRADUATE: 'Analyze aquaponic system design, fish-plant ratios, and economic viability.',
      GRADUATE: 'Examine commercial aquaponics, food safety, and integrated production systems.',
      PHD: 'Research nutrient dynamics, microbial communities, and system optimization.'
    },
    topic: 'water-systems',
    category: 'AQUACULTURE',
    icon: 'Fish',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-ap-1', title: 'Fish Feed Plants!', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Fish and Plants Together!</h2><p>In aquaponics, fish waste feeds plants, and plants clean the water for fish!</p>', MIDDLE_SCHOOL: '<h2>How Aquaponics Works</h2><p>Fish produce ammonia waste. Bacteria convert it to nitrates. Plants absorb nitrates as food. Clean water returns to fish.</p>', HIGH_SCHOOL: '<h2>The Nitrogen Cycle</h2><p>Ammonia → Nitrite → Nitrate through nitrifying bacteria. This cycle is the heart of aquaponics.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Fish tank sizing, biofilter capacity, grow bed ratios, and water flow calculations.</p>', GRADUATE: '<h2>Commercial Systems</h2><p>Scale-up challenges, food safety regulations, and economic feasibility analysis.</p>', PHD: '<h2>Research Frontiers</h2><p>Microbial ecology, nutrient optimization, and coupled system modeling.</p>' } }],
    activities: [{ id: 'ws-ap-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Fish Garden!', MIDDLE_SCHOOL: 'Balance the System', HIGH_SCHOOL: 'Nitrogen Cycle', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Business Planning', PHD: 'Nutrient Modeling' }, description: { ELEMENTARY: 'Create an aquaponics system with fish and plants!', MIDDLE_SCHOOL: 'Balance fish and plants in an aquaponic system.', HIGH_SCHOOL: 'Manage the nitrogen cycle in aquaponics.', UNDERGRADUATE: 'Size an aquaponic system for a school.', GRADUATE: 'Develop a business plan for commercial aquaponics.', PHD: 'Model nutrient dynamics in coupled systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-ap-game', type: 'simulation', title: 'Aquaponics Farmer', description: 'Manage a thriving aquaponics system!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-ap-quiz', passingScore: 80, questions: [{ id: 'wapq1', question: { ELEMENTARY: 'What do fish provide for plants in aquaponics?', MIDDLE_SCHOOL: 'What bacteria are essential in aquaponics?', HIGH_SCHOOL: 'What is the final form of nitrogen plants absorb?', UNDERGRADUATE: 'What determines fish tank to grow bed ratio?', GRADUATE: 'What is a key commercial challenge?', PHD: 'What microbial group converts ammonia?' }, options: { ELEMENTARY: ['Nutrients from their waste', 'Sunlight', 'Soil', 'Seeds'], MIDDLE_SCHOOL: ['Nitrifying bacteria', 'Harmful bacteria', 'No bacteria needed', 'Yeast'], HIGH_SCHOOL: ['Nitrate', 'Ammonia', 'Nitrogen gas', 'Protein'], UNDERGRADUATE: ['Fish feeding rate and plant uptake', 'Random selection', 'Tank color', 'Fish species only'], GRADUATE: ['Achieving consistent profitability', 'Too much demand', 'Too easy', 'No regulations'], PHD: ['Nitrosomonas and Nitrobacter', 'E. coli', 'Yeast', 'Algae only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Fish waste contains nutrients that plants use as food to grow!', MIDDLE_SCHOOL: 'Nitrifying bacteria convert toxic ammonia into plant-usable nitrates.', HIGH_SCHOOL: 'Plants absorb nitrogen as nitrate (NO3-) through their roots.', UNDERGRADUATE: 'The ratio balances fish waste production with plant nutrient uptake capacity.', GRADUATE: 'Consistent profitability is challenging due to energy costs and market access.', PHD: 'Nitrosomonas converts ammonia to nitrite; Nitrobacter converts nitrite to nitrate.' } }] },
    externalResources: [{ title: 'Aquaponics Association', url: 'https://aquaponicsassociation.org/', type: 'research' }]
  },
  // Module 10: Desalination
  {
    id: 'water-desalination',
    slug: 'desalination',
    title: 'Desalination',
    description: {
      ELEMENTARY: 'Learn how we turn salty ocean water into fresh drinking water!',
      MIDDLE_SCHOOL: 'Discover the technologies that remove salt from seawater.',
      HIGH_SCHOOL: 'Explore reverse osmosis, thermal desalination, and energy requirements.',
      UNDERGRADUATE: 'Analyze desalination plant design, energy optimization, and brine management.',
      GRADUATE: 'Examine desalination policy, environmental impacts, and integration strategies.',
      PHD: 'Research novel membranes, renewable energy integration, and zero liquid discharge.'
    },
    topic: 'water-systems',
    category: 'TREATMENT',
    icon: 'Waves',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-desal-1', title: 'Fresh from Salt', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Making Fresh Water!</h2><p>The ocean is salty, but we can remove the salt to make water we can drink!</p>', MIDDLE_SCHOOL: '<h2>Desalination Methods</h2><p>Boiling water and collecting steam (thermal) or pushing water through special filters (reverse osmosis).</p>', HIGH_SCHOOL: '<h2>Reverse Osmosis</h2><p>High pressure forces water through membranes that block salt. Energy intensive but most common method today.</p>', UNDERGRADUATE: '<h2>Plant Design</h2><p>Pretreatment, RO arrays, energy recovery devices, and post-treatment for distribution.</p>', GRADUATE: '<h2>Sustainability Challenges</h2><p>Energy consumption, brine disposal, intake impacts, and cost relative to other supplies.</p>', PHD: '<h2>Research Frontiers</h2><p>Graphene membranes, forward osmosis, and renewable energy powered systems.</p>' } }],
    activities: [{ id: 'ws-desal-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Remove the Salt!', MIDDLE_SCHOOL: 'Compare Methods', HIGH_SCHOOL: 'RO System', UNDERGRADUATE: 'Plant Design', GRADUATE: 'Impact Assessment', PHD: 'Innovation Analysis' }, description: { ELEMENTARY: 'See how salt gets removed from ocean water!', MIDDLE_SCHOOL: 'Compare different desalination technologies.', HIGH_SCHOOL: 'Design a reverse osmosis system.', UNDERGRADUATE: 'Design a desalination plant for a coastal city.', GRADUATE: 'Assess environmental impacts of desalination.', PHD: 'Analyze emerging desalination technologies.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-desal-game', type: 'simulation', title: 'Desalination Engineer', description: 'Design and operate desalination plants!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-desal-quiz', passingScore: 80, questions: [{ id: 'wdslq1', question: { ELEMENTARY: 'What does desalination remove from water?', MIDDLE_SCHOOL: 'What are the two main desalination methods?', HIGH_SCHOOL: 'What does reverse osmosis use to separate salt?', UNDERGRADUATE: 'What recovers energy in RO plants?', GRADUATE: 'What is brine?', PHD: 'What emerging membrane material shows promise?' }, options: { ELEMENTARY: ['Salt', 'Fish', 'Sand', 'Color'], MIDDLE_SCHOOL: ['Thermal and membrane (RO)', 'Freezing and heating', 'Mixing and settling', 'Filtering and boiling only'], HIGH_SCHOOL: ['Pressure and membranes', 'Chemicals only', 'Magnets', 'Electricity only'], UNDERGRADUATE: ['Energy recovery devices (pressure exchangers)', 'Nothing - energy is lost', 'Solar panels', 'Wind turbines'], GRADUATE: ['Concentrated salt waste stream', 'Fresh water output', 'Clean air', 'Fish food'], PHD: ['Graphene', 'Paper', 'Cotton', 'Glass'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Desalination removes salt from ocean water to make it drinkable!', MIDDLE_SCHOOL: 'The two main methods are thermal (boiling) and membrane (reverse osmosis).', HIGH_SCHOOL: 'RO uses high pressure to force water through semi-permeable membranes that block salt.', UNDERGRADUATE: 'Pressure exchangers and other ERDs recover energy from the high-pressure brine stream.', GRADUATE: 'Brine is the concentrated salt waste that must be carefully disposed of.', PHD: 'Graphene membranes promise higher flux and lower energy requirements.' } }] },
    externalResources: [{ title: 'International Desalination Association', url: 'https://idadesal.org/', type: 'research' }]
  },
  // Module 11: Fog Harvesting
  {
    id: 'water-fog-harvesting',
    slug: 'fog-harvesting',
    title: 'Fog Harvesting',
    description: {
      ELEMENTARY: 'Learn how people catch water from clouds and fog!',
      MIDDLE_SCHOOL: 'Discover how special nets collect water from foggy air.',
      HIGH_SCHOOL: 'Explore fog collection technology, site selection, and water yields.',
      UNDERGRADUATE: 'Analyze fog harvesting systems, mesh optimization, and community implementation.',
      GRADUATE: 'Examine fog water potential, climate factors, and integrated water management.',
      PHD: 'Research biomimetic collectors, atmospheric water dynamics, and scaling challenges.'
    },
    topic: 'water-systems',
    category: 'COLLECTION',
    icon: 'Cloud',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-fog-1', title: 'Catching Clouds', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water from Air!</h2><p>In foggy places, special nets can catch tiny water drops from the air to give people drinking water!</p>', MIDDLE_SCHOOL: '<h2>How Fog Harvesting Works</h2><p>Mesh nets stretched on frames catch fog droplets. The water drips down into collection troughs and storage tanks.</p>', HIGH_SCHOOL: '<h2>Fog Collection Systems</h2><p>Location selection based on fog frequency, wind patterns, and topography. Mesh density and materials affect yield.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Standard Fog Collectors (SFC), Large Fog Collectors (LFC), mesh materials, and water quality considerations.</p>', GRADUATE: '<h2>Implementation</h2><p>Community engagement, maintenance requirements, integration with other water sources, and sustainability.</p>', PHD: '<h2>Research Frontiers</h2><p>Biomimetic surfaces inspired by desert beetles and spider webs, atmospheric modeling, and hybrid systems.</p>' } }],
    activities: [{ id: 'ws-fog-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Catch the Fog!', MIDDLE_SCHOOL: 'Build a Fog Net', HIGH_SCHOOL: 'Site Selection', UNDERGRADUATE: 'System Design', GRADUATE: 'Community Project', PHD: 'Biomimetic Design' }, description: { ELEMENTARY: 'See how fog turns into drinking water!', MIDDLE_SCHOOL: 'Design a fog collecting net.', HIGH_SCHOOL: 'Find the best location for fog harvesting.', UNDERGRADUATE: 'Design a fog collection system for a village.', GRADUATE: 'Plan a community fog harvesting project.', PHD: 'Design biomimetic fog collection surfaces.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-fog-game', type: 'simulation', title: 'Fog Catcher', description: 'Harvest water from fog to supply a village!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-fog-quiz', passingScore: 80, questions: [{ id: 'wfogq1', question: { ELEMENTARY: 'What does fog harvesting catch?', MIDDLE_SCHOOL: 'What material catches fog?', HIGH_SCHOOL: 'What factors affect fog harvesting success?', UNDERGRADUATE: 'What is an SFC?', GRADUATE: 'Why is community engagement important?', PHD: 'What organism inspires biomimetic fog collectors?' }, options: { ELEMENTARY: ['Water droplets from the air', 'Rain from clouds', 'Snow', 'Dust'], MIDDLE_SCHOOL: ['Mesh or net material', 'Solid walls', 'Glass', 'Plastic sheets'], HIGH_SCHOOL: ['Fog frequency, wind, and topography', 'Only temperature', 'Only altitude', 'Only rainfall'], UNDERGRADUATE: ['Standard Fog Collector', 'Special Fog Container', 'Super Fog Catcher', 'Small Fan Cooler'], GRADUATE: ['For maintenance and long-term success', 'Not important', 'Only for funding', 'For decoration'], PHD: ['Namib desert beetle', 'Polar bear', 'Camel', 'Cactus flower'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Fog harvesters catch tiny water droplets floating in the foggy air!', MIDDLE_SCHOOL: 'Special mesh nets have small holes that catch fog droplets as they blow through.', HIGH_SCHOOL: 'Frequent fog, consistent wind direction, and elevation on ridgelines maximize collection.', UNDERGRADUATE: 'Standard Fog Collector (SFC) is a 1m² test unit used to measure fog water potential.', GRADUATE: 'Community ownership ensures maintenance and protects against vandalism for long-term success.', PHD: 'The Namib desert beetle has bumps and grooves that efficiently capture and channel fog water.' } }] },
    externalResources: [{ title: 'FogQuest', url: 'https://fogquest.org/', type: 'research' }]
  },
  // Module 12: Wetland Conservation
  {
    id: 'water-wetlands',
    slug: 'wetland-conservation',
    title: 'Wetland Conservation',
    description: {
      ELEMENTARY: 'Learn about special places where water and land meet!',
      MIDDLE_SCHOOL: 'Discover why wetlands are so important for water and wildlife.',
      HIGH_SCHOOL: 'Explore wetland ecosystem services, threats, and restoration methods.',
      UNDERGRADUATE: 'Analyze wetland hydrology, ecology, and regulatory frameworks.',
      GRADUATE: 'Examine wetland policy, mitigation banking, and ecosystem valuation.',
      PHD: 'Research wetland carbon dynamics, restoration ecology, and climate resilience.'
    },
    topic: 'water-systems',
    category: 'ECOSYSTEMS',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-wet-1', title: 'Water Wonderlands', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Magical Wetlands!</h2><p>Wetlands are where water meets land. They are home to frogs, birds, and fish, and they help clean our water!</p>', MIDDLE_SCHOOL: '<h2>Wetland Types</h2><p>Marshes, swamps, bogs, and fens. Each has different plants, water sources, and wildlife.</p>', HIGH_SCHOOL: '<h2>Ecosystem Services</h2><p>Wetlands filter water, store floods, sequester carbon, provide habitat, and support fisheries.</p>', UNDERGRADUATE: '<h2>Wetland Science</h2><p>Hydrology, biogeochemistry, and ecology interact to create wetland functions.</p>', GRADUATE: '<h2>Policy and Management</h2><p>Clean Water Act protections, mitigation requirements, and ecosystem service valuation.</p>', PHD: '<h2>Research Frontiers</h2><p>Blue carbon, restoration success metrics, and climate adaptation role of wetlands.</p>' } }],
    activities: [{ id: 'ws-wet-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Explore a Wetland!', MIDDLE_SCHOOL: 'Wetland Types', HIGH_SCHOOL: 'Service Valuation', UNDERGRADUATE: 'Restoration Plan', GRADUATE: 'Mitigation Banking', PHD: 'Carbon Accounting' }, description: { ELEMENTARY: 'Visit a virtual wetland and meet its creatures!', MIDDLE_SCHOOL: 'Identify different types of wetlands.', HIGH_SCHOOL: 'Calculate the value of wetland services.', UNDERGRADUATE: 'Design a wetland restoration project.', GRADUATE: 'Set up a wetland mitigation bank.', PHD: 'Account for wetland carbon sequestration.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-wet-game', type: 'simulation', title: 'Wetland Guardian', description: 'Protect and restore wetland ecosystems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-wet-quiz', passingScore: 80, questions: [{ id: 'wwetq1', question: { ELEMENTARY: 'What do wetlands help clean?', MIDDLE_SCHOOL: 'Name a type of wetland.', HIGH_SCHOOL: 'How do wetlands reduce flooding?', UNDERGRADUATE: 'What law protects US wetlands?', GRADUATE: 'What is mitigation banking?', PHD: 'What is blue carbon?' }, options: { ELEMENTARY: ['Water', 'Air only', 'Clothes', 'Cars'], MIDDLE_SCHOOL: ['Marsh, swamp, or bog', 'Desert', 'Mountain', 'Ocean'], HIGH_SCHOOL: ['They absorb and slowly release water', 'They block water', 'They evaporate water', 'They freeze water'], UNDERGRADUATE: ['Clean Water Act', 'Clean Air Act', 'Wetland Law', 'Water Rights Act'], GRADUATE: ['Trading credits for wetland protection', 'Banking fish', 'Water savings accounts', 'Mud collection'], PHD: ['Carbon stored in coastal/marine ecosystems', 'Blue-colored carbon', 'Ocean pollution', 'Sky carbon'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wetlands act like natural filters, cleaning water as it flows through!', MIDDLE_SCHOOL: 'Wetland types include marshes (grassy), swamps (trees), bogs (peat), and fens (groundwater-fed).', HIGH_SCHOOL: 'Wetlands act as sponges, absorbing floodwaters and releasing them slowly.', UNDERGRADUATE: 'The Clean Water Act Section 404 regulates activities that affect wetlands.', GRADUATE: 'Mitigation banking allows developers to purchase credits from restored wetlands elsewhere.', PHD: 'Blue carbon is carbon captured by coastal ecosystems like salt marshes and mangroves.' } }] },
    externalResources: [{ title: 'Ramsar Convention', url: 'https://www.ramsar.org/', type: 'research' }]
  },
  // Module 13: Water Pricing and Economics
  {
    id: 'water-economics',
    slug: 'water-economics',
    title: 'Water Pricing and Economics',
    description: {
      ELEMENTARY: 'Learn why water costs money and how to use it wisely!',
      MIDDLE_SCHOOL: 'Discover how water prices encourage conservation.',
      HIGH_SCHOOL: 'Explore water rate structures, affordability, and conservation pricing.',
      UNDERGRADUATE: 'Analyze water utility finance, rate design, and economic efficiency.',
      GRADUATE: 'Examine water markets, pricing theory, and equity considerations.',
      PHD: 'Research optimal pricing, behavioral economics, and water market design.'
    },
    topic: 'water-systems',
    category: 'ECONOMICS',
    icon: 'DollarSign',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-econ-1', title: 'Water Has Value', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Costs Money!</h2><p>It takes work to clean water and bring it to your home. Thats why we pay for water and should not waste it!</p>', MIDDLE_SCHOOL: '<h2>Why Price Water?</h2><p>Water prices cover treatment, pipes, and pumping. Higher prices for more use encourage conservation.</p>', HIGH_SCHOOL: '<h2>Rate Structures</h2><p>Flat rates, uniform volumetric, increasing block rates, and seasonal pricing each have different effects.</p>', UNDERGRADUATE: '<h2>Utility Finance</h2><p>Revenue requirements, cost of service, rate design, and balancing objectives.</p>', GRADUATE: '<h2>Water Markets</h2><p>Water rights trading, scarcity pricing, and market-based allocation mechanisms.</p>', PHD: '<h2>Research Frontiers</h2><p>Behavioral responses to pricing, optimal tariff design, and equity-efficiency tradeoffs.</p>' } }],
    activities: [{ id: 'ws-econ-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save Water, Save Money!', MIDDLE_SCHOOL: 'Read Your Bill', HIGH_SCHOOL: 'Design Rates', UNDERGRADUATE: 'Utility Budget', GRADUATE: 'Water Market', PHD: 'Optimal Pricing' }, description: { ELEMENTARY: 'See how saving water saves money!', MIDDLE_SCHOOL: 'Understand a water bill.', HIGH_SCHOOL: 'Design a water rate structure.', UNDERGRADUATE: 'Balance a water utility budget.', GRADUATE: 'Simulate a water market.', PHD: 'Design optimal water pricing.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-econ-game', type: 'simulation', title: 'Water Economist', description: 'Set water prices to balance conservation and affordability!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-econ-quiz', passingScore: 80, questions: [{ id: 'weconq1', question: { ELEMENTARY: 'Why do we pay for water?', MIDDLE_SCHOOL: 'What happens when water costs more?', HIGH_SCHOOL: 'What are increasing block rates?', UNDERGRADUATE: 'What is cost of service?', GRADUATE: 'What are water markets?', PHD: 'What is the equity-efficiency tradeoff?' }, options: { ELEMENTARY: ['To pay for cleaning and delivering it', 'Because water is rare', 'For fun', 'No reason'], MIDDLE_SCHOOL: ['People tend to use less', 'People use more', 'No change', 'People get angry'], HIGH_SCHOOL: ['Higher prices for higher use levels', 'Lower prices for more use', 'Same price always', 'Random prices'], UNDERGRADUATE: ['Calculating what utility services cost', 'Free service', 'No cost tracking', 'Customer surveys'], GRADUATE: ['Systems for trading water rights', 'Fish markets', 'Bottled water stores', 'Swimming pools'], PHD: ['Balancing fairness and economic efficiency', 'No tradeoff exists', 'Only efficiency matters', 'Only equity matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We pay for water because it costs money to clean it and pump it through pipes to our homes!', MIDDLE_SCHOOL: 'When water costs more, people are more careful about how much they use.', HIGH_SCHOOL: 'Increasing block rates charge more per gallon as usage increases, encouraging conservation.', UNDERGRADUATE: 'Cost of service analysis determines what it actually costs to provide water to different customers.', GRADUATE: 'Water markets allow trading of water rights between users, allocating water to highest-value uses.', PHD: 'Efficient pricing may burden low-income households; lifeline rates and assistance programs address equity.' } }] },
    externalResources: [{ title: 'AWWA Water Rates', url: 'https://www.awwa.org/Resources-Tools/Resource-Topics/Rates-Charges', type: 'research' }]
  },
  // Module 14: Water Rights and Law
  {
    id: 'water-law',
    slug: 'water-rights-law',
    title: 'Water Rights and Law',
    description: {
      ELEMENTARY: 'Learn about rules that help people share water fairly!',
      MIDDLE_SCHOOL: 'Discover how laws decide who can use water.',
      HIGH_SCHOOL: 'Explore water rights doctrines, permits, and interstate compacts.',
      UNDERGRADUATE: 'Analyze riparian and prior appropriation systems, water law evolution.',
      GRADUATE: 'Examine international water law, transboundary disputes, and reform efforts.',
      PHD: 'Research water governance, institutional design, and adaptive management.'
    },
    topic: 'water-systems',
    category: 'GOVERNANCE',
    icon: 'Scale',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-law-1', title: 'Sharing Water Fairly', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Rules!</h2><p>When many people want the same water, we need fair rules so everyone can share!</p>', MIDDLE_SCHOOL: '<h2>Water Rights Basics</h2><p>Laws determine who can take water from rivers and groundwater. Rights can be based on land ownership or first use.</p>', HIGH_SCHOOL: '<h2>Water Law Doctrines</h2><p>Riparian rights (eastern US) vs. prior appropriation (western US). First in time, first in right.</p>', UNDERGRADUATE: '<h2>Legal Frameworks</h2><p>Permits, beneficial use, transfers, and the public trust doctrine.</p>', GRADUATE: '<h2>Transboundary Water</h2><p>Interstate compacts, international treaties, and dispute resolution mechanisms.</p>', PHD: '<h2>Research Frontiers</h2><p>Adaptive governance, climate adaptation in water law, and indigenous water rights.</p>' } }],
    activities: [{ id: 'ws-law-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Share the River!', MIDDLE_SCHOOL: 'Who Gets Water?', HIGH_SCHOOL: 'Water Court', UNDERGRADUATE: 'Rights Analysis', GRADUATE: 'Treaty Negotiation', PHD: 'Governance Design' }, description: { ELEMENTARY: 'Help neighbors share water from a river!', MIDDLE_SCHOOL: 'Decide who has rights to use water.', HIGH_SCHOOL: 'Simulate a water rights case.', UNDERGRADUATE: 'Analyze water rights in a basin.', GRADUATE: 'Negotiate a transboundary water treaty.', PHD: 'Design adaptive water governance.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-law-game', type: 'simulation', title: 'Water Judge', description: 'Resolve water disputes and allocate rights fairly!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-law-quiz', passingScore: 80, questions: [{ id: 'wlawq1', question: { ELEMENTARY: 'Why do we need water rules?', MIDDLE_SCHOOL: 'What are water rights?', HIGH_SCHOOL: 'What does first in time, first in right mean?', UNDERGRADUATE: 'What is beneficial use?', GRADUATE: 'What is an interstate compact?', PHD: 'What is adaptive governance?' }, options: { ELEMENTARY: ['To share water fairly', 'For fun', 'To make water blue', 'No reason'], MIDDLE_SCHOOL: ['Legal permission to use water', 'Water opinions', 'Water facts', 'Water wishes'], HIGH_SCHOOL: ['Earlier users have priority', 'Fastest user wins', 'Biggest user wins', 'Random selection'], UNDERGRADUATE: ['Water must be used for approved purposes', 'Any use is fine', 'Wasteful use allowed', 'No rules'], GRADUATE: ['Agreement between states on shared water', 'Company contract', 'Personal promise', 'City law'], PHD: ['Governance that evolves with conditions', 'Fixed rules forever', 'No rules', 'Random changes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Water rules help everyone share water fairly so no one takes too much!', MIDDLE_SCHOOL: 'Water rights are legal permissions that say who can use water and how much.', HIGH_SCHOOL: 'Prior appropriation gives older water rights priority over newer ones during shortages.', UNDERGRADUATE: 'Beneficial use requires water to be used for recognized purposes, not wasted.', GRADUATE: 'Interstate compacts are binding agreements between states for managing shared water resources.', PHD: 'Adaptive governance allows institutions to learn and adjust as conditions and knowledge change.' } }] },
    externalResources: [{ title: 'Water Law Overview', url: 'https://www.americanbar.org/groups/environment_energy_resources/publications/', type: 'research' }]
  },
  // Module 15: Climate Adaptation for Water
  {
    id: 'water-climate-adaptation',
    slug: 'climate-adaptation-water',
    title: 'Climate Adaptation for Water',
    description: {
      ELEMENTARY: 'Learn how to prepare for changes in rain and weather!',
      MIDDLE_SCHOOL: 'Discover how communities adapt their water systems to climate change.',
      HIGH_SCHOOL: 'Explore climate impacts on water resources and adaptation strategies.',
      UNDERGRADUATE: 'Analyze vulnerability assessments, adaptation planning, and resilience measures.',
      GRADUATE: 'Examine integrated water resources management under climate uncertainty.',
      PHD: 'Research climate modeling for water, decision making under uncertainty, and transformation.'
    },
    topic: 'water-systems',
    category: 'RESILIENCE',
    icon: 'CloudRain',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-clim-1', title: 'Weather is Changing', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Preparing for Change!</h2><p>The weather is changing. Some places get more floods, others get more droughts. We need to be ready!</p>', MIDDLE_SCHOOL: '<h2>Climate and Water</h2><p>Climate change affects rainfall, snowpack, sea level, and extreme events. Water systems must adapt.</p>', HIGH_SCHOOL: '<h2>Climate Impacts</h2><p>More intense storms, changing precipitation patterns, earlier snowmelt, sea level rise, and increased droughts.</p>', UNDERGRADUATE: '<h2>Vulnerability Assessment</h2><p>Exposure, sensitivity, and adaptive capacity determine system vulnerability to climate impacts.</p>', GRADUATE: '<h2>Adaptation Planning</h2><p>No-regrets strategies, flexible pathways, and decision making under deep uncertainty.</p>', PHD: '<h2>Research Frontiers</h2><p>Downscaled climate projections, robust decision making, and transformative adaptation.</p>' } }],
    activities: [{ id: 'ws-clim-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Get Ready!', MIDDLE_SCHOOL: 'Plan Ahead', HIGH_SCHOOL: 'Assess Risks', UNDERGRADUATE: 'Vulnerability Analysis', GRADUATE: 'Adaptation Pathways', PHD: 'Scenario Planning' }, description: { ELEMENTARY: 'Prepare your town for weather changes!', MIDDLE_SCHOOL: 'Plan how to adapt to climate change.', HIGH_SCHOOL: 'Assess climate risks to water supply.', UNDERGRADUATE: 'Conduct a climate vulnerability assessment.', GRADUATE: 'Develop climate adaptation pathways.', PHD: 'Plan under deep climate uncertainty.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-clim-game', type: 'simulation', title: 'Climate Adapter', description: 'Prepare water systems for a changing climate!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-clim-quiz', passingScore: 80, questions: [{ id: 'wclimq1', question: { ELEMENTARY: 'What should we do about weather changes?', MIDDLE_SCHOOL: 'What does climate adaptation mean?', HIGH_SCHOOL: 'What is a climate vulnerability?', UNDERGRADUATE: 'What is adaptive capacity?', GRADUATE: 'What is a no-regrets strategy?', PHD: 'What is deep uncertainty?' }, options: { ELEMENTARY: ['Prepare and adapt', 'Ignore it', 'Stop drinking water', 'Move to space'], MIDDLE_SCHOOL: ['Changing to handle new climate conditions', 'Stopping climate', 'Predicting weather', 'Making rain'], HIGH_SCHOOL: ['Susceptibility to climate harm', 'Weather forecast', 'Climate prediction', 'Temperature reading'], UNDERGRADUATE: ['Ability to adjust to changes', 'Ignoring problems', 'Moving away', 'Building walls'], GRADUATE: ['Actions beneficial regardless of climate outcome', 'Risky investments', 'Doing nothing', 'Hoping for best'], PHD: ['Uncertainty where probabilities are unknown', 'Small uncertainty', 'No uncertainty', 'Certain outcomes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We need to prepare our water systems to handle different weather patterns!', MIDDLE_SCHOOL: 'Climate adaptation means changing how we manage water to handle new climate conditions.', HIGH_SCHOOL: 'Vulnerability is how likely a system is to be harmed by climate impacts.', UNDERGRADUATE: 'Adaptive capacity is the ability of systems to adjust to change and cope with variability.', GRADUATE: 'No-regrets strategies provide benefits under any climate scenario, like improving efficiency.', PHD: 'Deep uncertainty means we cannot reliably assign probabilities to future outcomes.' } }] },
    externalResources: [{ title: 'Climate Adaptation', url: 'https://www.epa.gov/climate-adaptation', type: 'research' }]
  },
  // Module 16: Water Conservation
  {
    id: 'water-conservation',
    slug: 'water-conservation',
    title: 'Water Conservation',
    description: {
      ELEMENTARY: 'Learn easy ways to save water every day!',
      MIDDLE_SCHOOL: 'Discover how to use less water at home and school.',
      HIGH_SCHOOL: 'Explore indoor and outdoor conservation strategies and technologies.',
      UNDERGRADUATE: 'Analyze conservation program design, behavior change, and water-use efficiency.',
      GRADUATE: 'Examine conservation pricing, demand management, and long-term savings.',
      PHD: 'Research conservation potential, price elasticity, and behavioral interventions.'
    },
    topic: 'water-systems',
    category: 'CONSERVATION',
    icon: 'Droplet',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-cons-1', title: 'Saving Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Save Every Drop!</h2><p>Turn off the tap while brushing, take shorter showers, and fix leaky faucets to save water!</p>', MIDDLE_SCHOOL: '<h2>Water-Saving Habits</h2><p>Low-flow fixtures, efficient appliances, and smart irrigation can cut water use dramatically.</p>', HIGH_SCHOOL: '<h2>Conservation Technology</h2><p>High-efficiency toilets, smart irrigation controllers, and water audits identify savings.</p>', UNDERGRADUATE: '<h2>Program Design</h2><p>Rebates, education, pricing, and regulations drive conservation adoption.</p>', GRADUATE: '<h2>Demand Management</h2><p>Long-term conservation vs. short-term curtailment. Price signals and behavioral approaches.</p>', PHD: '<h2>Research Frontiers</h2><p>Conservation potential studies, behavioral economics, and persistent savings.</p>' } }],
    activities: [{ id: 'ws-cons-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Water Saver Hero!', MIDDLE_SCHOOL: 'Home Water Audit', HIGH_SCHOOL: 'Conservation Plan', UNDERGRADUATE: 'Program Design', GRADUATE: 'Demand Modeling', PHD: 'Behavioral Study' }, description: { ELEMENTARY: 'Find ways to save water at home!', MIDDLE_SCHOOL: 'Audit water use in a home.', HIGH_SCHOOL: 'Design a water conservation plan.', UNDERGRADUATE: 'Design a conservation program.', GRADUATE: 'Model water demand management.', PHD: 'Design a conservation behavior study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-cons-game', type: 'simulation', title: 'Conservation Champion', description: 'Save water and protect resources!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-cons-quiz', passingScore: 80, questions: [{ id: 'wconsq1', question: { ELEMENTARY: 'How can you save water when brushing teeth?', MIDDLE_SCHOOL: 'What is a low-flow fixture?', HIGH_SCHOOL: 'What does a water audit find?', UNDERGRADUATE: 'What drives conservation adoption?', GRADUATE: 'What is demand management?', PHD: 'What is price elasticity of water demand?' }, options: { ELEMENTARY: ['Turn off the tap while brushing', 'Leave tap running', 'Use more water', 'Brush longer'], MIDDLE_SCHOOL: ['A faucet or showerhead using less water', 'A slow drain', 'A water fountain', 'A swimming pool'], HIGH_SCHOOL: ['Where water is being used and wasted', 'Financial records', 'Customer names', 'Water sources only'], UNDERGRADUATE: ['Rebates, education, pricing, and rules', 'Nothing works', 'Only rules', 'Only price'], GRADUATE: ['Strategies to reduce water demand', 'Increasing supply', 'Ignoring use', 'Adding more pipes'], PHD: ['How much demand changes with price', 'Fixed demand', 'Elastic bands', 'Water pressure'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Turning off the tap while brushing saves gallons of water every day!', MIDDLE_SCHOOL: 'Low-flow fixtures deliver less water per minute while still working well.', HIGH_SCHOOL: 'Water audits identify where water is being used and opportunities for savings.', UNDERGRADUATE: 'Conservation programs use incentives, education, pricing, and regulations to drive adoption.', GRADUATE: 'Demand management includes strategies to reduce or shift water demand over time.', PHD: 'Price elasticity measures how much water demand decreases when prices increase.' } }] },
    externalResources: [{ title: 'WaterSense', url: 'https://www.epa.gov/watersense', type: 'research' }]
  },
  // Module 17: Water Reuse and Recycling
  {
    id: 'water-reuse',
    slug: 'water-reuse-recycling',
    title: 'Water Reuse and Recycling',
    description: {
      ELEMENTARY: 'Learn how we can use water more than once!',
      MIDDLE_SCHOOL: 'Discover how treated wastewater becomes a resource.',
      HIGH_SCHOOL: 'Explore water recycling, reuse applications, and treatment requirements.',
      UNDERGRADUATE: 'Analyze direct and indirect potable reuse, regulations, and public acceptance.',
      GRADUATE: 'Examine advanced treatment, one water planning, and reuse economics.',
      PHD: 'Research emerging contaminants, risk assessment, and fit-for-purpose treatment.'
    },
    topic: 'water-systems',
    category: 'REUSE',
    icon: 'RefreshCcw',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-reuse-1', title: 'Using Water Again', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Goes Round!</h2><p>After we use water, it can be cleaned and used again! This helps when fresh water is scarce.</p>', MIDDLE_SCHOOL: '<h2>Recycled Water</h2><p>Treated wastewater can irrigate parks, cool power plants, or even become drinking water with advanced treatment.</p>', HIGH_SCHOOL: '<h2>Reuse Types</h2><p>Non-potable reuse (irrigation, industrial), indirect potable reuse (aquifer recharge), and direct potable reuse.</p>', UNDERGRADUATE: '<h2>Treatment Requirements</h2><p>Multiple barriers, advanced oxidation, and monitoring for different reuse applications.</p>', GRADUATE: '<h2>One Water Approach</h2><p>Integrating all water sources - fresh, recycled, storm - into unified management.</p>', PHD: '<h2>Research Frontiers</h2><p>Emerging contaminants, CECs, and fit-for-purpose treatment optimization.</p>' } }],
    activities: [{ id: 'ws-reuse-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Clean and Reuse!', MIDDLE_SCHOOL: 'Reuse Matching', HIGH_SCHOOL: 'Treatment Train', UNDERGRADUATE: 'Reuse Planning', GRADUATE: 'One Water Design', PHD: 'Risk Assessment' }, description: { ELEMENTARY: 'See how water gets cleaned and reused!', MIDDLE_SCHOOL: 'Match reuse water to appropriate uses.', HIGH_SCHOOL: 'Design a treatment train for reuse.', UNDERGRADUATE: 'Plan a water reuse program.', GRADUATE: 'Design a one water system.', PHD: 'Assess health risks for reuse.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-reuse-game', type: 'simulation', title: 'Reuse Master', description: 'Turn wastewater into a valuable resource!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-reuse-quiz', passingScore: 80, questions: [{ id: 'wreuseq1', question: { ELEMENTARY: 'Can we use water more than once?', MIDDLE_SCHOOL: 'What can recycled water be used for?', HIGH_SCHOOL: 'What is indirect potable reuse?', UNDERGRADUATE: 'What is a multiple barrier approach?', GRADUATE: 'What is one water?', PHD: 'What are CECs?' }, options: { ELEMENTARY: ['Yes, after cleaning it', 'No, never', 'Only once', 'Water disappears'], MIDDLE_SCHOOL: ['Irrigation, cooling, or even drinking', 'Nothing', 'Only drinking', 'Only for fish'], HIGH_SCHOOL: ['Adding treated water to natural buffer before drinking', 'Drinking directly', 'No reuse', 'Ocean discharge'], UNDERGRADUATE: ['Multiple treatment steps ensuring safety', 'Single treatment', 'No barriers', 'Physical barriers only'], GRADUATE: ['Integrated management of all water sources', 'Only fresh water', 'Only wastewater', 'One water bottle'], PHD: ['Contaminants of Emerging Concern', 'Customer Experience Centers', 'Clean Energy Credits', 'Carbon Emission Controls'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Water can be cleaned and used again and again!', MIDDLE_SCHOOL: 'Recycled water can irrigate landscapes, cool power plants, or become drinking water with treatment.', HIGH_SCHOOL: 'Indirect potable reuse puts treated water into an aquifer or reservoir before drinking water treatment.', UNDERGRADUATE: 'Multiple barriers use several treatment steps so no single failure compromises safety.', GRADUATE: 'One water integrates freshwater, recycled water, and stormwater into unified resource management.', PHD: 'CECs (Contaminants of Emerging Concern) include pharmaceuticals and personal care products in wastewater.' } }] },
    externalResources: [{ title: 'Water Reuse', url: 'https://www.epa.gov/waterreuse', type: 'research' }]
  },
  // Module 18: Green Infrastructure
  {
    id: 'water-green-infrastructure',
    slug: 'green-infrastructure',
    title: 'Green Infrastructure',
    description: {
      ELEMENTARY: 'Learn how plants and nature help manage water!',
      MIDDLE_SCHOOL: 'Discover rain gardens, green roofs, and natural water management.',
      HIGH_SCHOOL: 'Explore green infrastructure design, performance, and maintenance.',
      UNDERGRADUATE: 'Analyze green infrastructure economics, modeling, and co-benefits.',
      GRADUATE: 'Examine green infrastructure policy, financing, and program implementation.',
      PHD: 'Research green infrastructure performance, optimization, and climate resilience.'
    },
    topic: 'water-systems',
    category: 'GREEN',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-gi-1', title: 'Nature Helps!', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plants Clean Water!</h2><p>Gardens and trees soak up rain and help clean water naturally!</p>', MIDDLE_SCHOOL: '<h2>Green Infrastructure</h2><p>Rain gardens, bioswales, green roofs, and permeable pavement manage stormwater naturally.</p>', HIGH_SCHOOL: '<h2>GI Design</h2><p>Sizing, plant selection, soil media, and maintenance for rain gardens and bioretention.</p>', UNDERGRADUATE: '<h2>GI Analysis</h2><p>Hydrologic modeling, volume reduction, pollutant removal, and lifecycle costs.</p>', GRADUATE: '<h2>GI Implementation</h2><p>Policies, incentives, maintenance agreements, and tracking performance.</p>', PHD: '<h2>Research Frontiers</h2><p>Long-term performance, climate resilience, and optimization under uncertainty.</p>' } }],
    activities: [{ id: 'ws-gi-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Rain Garden!', MIDDLE_SCHOOL: 'GI Types', HIGH_SCHOOL: 'Design Practice', UNDERGRADUATE: 'Model Performance', GRADUATE: 'Program Design', PHD: 'Optimization' }, description: { ELEMENTARY: 'Create a garden that catches rain!', MIDDLE_SCHOOL: 'Learn about different green infrastructure types.', HIGH_SCHOOL: 'Design a green infrastructure practice.', UNDERGRADUATE: 'Model green infrastructure performance.', GRADUATE: 'Design a green infrastructure program.', PHD: 'Optimize green infrastructure networks.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-gi-game', type: 'simulation', title: 'Green Builder', description: 'Design green infrastructure to manage stormwater!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-gi-quiz', passingScore: 80, questions: [{ id: 'wgiq1', question: { ELEMENTARY: 'What can a rain garden do?', MIDDLE_SCHOOL: 'What is a bioswale?', HIGH_SCHOOL: 'What is bioretention?', UNDERGRADUATE: 'What are GI co-benefits?', GRADUATE: 'What is a common GI barrier?', PHD: 'What is stormwater performance uncertainty?' }, options: { ELEMENTARY: ['Soak up rain and filter water', 'Make more rain', 'Stop all water', 'Nothing'], MIDDLE_SCHOOL: ['A vegetated channel that filters runoff', 'A type of plant', 'A rain barrel', 'A pond'], HIGH_SCHOOL: ['A practice using soil and plants to filter runoff', 'Water retention only', 'No filtration', 'Concrete structure'], UNDERGRADUATE: ['Heat reduction, habitat, and aesthetics', 'No other benefits', 'Only water', 'Only cost'], GRADUATE: ['Long-term maintenance responsibility', 'No barriers', 'Too easy', 'Perfect technology'], PHD: ['Variability in how practices perform over time', 'Perfect prediction', 'No uncertainty', 'Certain performance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Rain gardens soak up rainwater and filter out pollution naturally!', MIDDLE_SCHOOL: 'A bioswale is a vegetated channel that slows and filters stormwater runoff.', HIGH_SCHOOL: 'Bioretention uses engineered soil media and plants to capture and treat stormwater.', UNDERGRADUATE: 'GI provides co-benefits including urban heat reduction, habitat, air quality, and aesthetics.', GRADUATE: 'Ensuring long-term maintenance is a common barrier to green infrastructure success.', PHD: 'GI performance varies with soil conditions, weather patterns, and maintenance quality.' } }] },
    externalResources: [{ title: 'Green Infrastructure', url: 'https://www.epa.gov/green-infrastructure', type: 'research' }]
  },
  // Module 19: Water Security
  {
    id: 'water-security',
    slug: 'water-security',
    title: 'Water Security',
    description: {
      ELEMENTARY: 'Learn why clean water for everyone is important!',
      MIDDLE_SCHOOL: 'Discover challenges to water access around the world.',
      HIGH_SCHOOL: 'Explore water security dimensions, threats, and solutions.',
      UNDERGRADUATE: 'Analyze water security frameworks, indicators, and assessment methods.',
      GRADUATE: 'Examine water security policy, conflict, and governance.',
      PHD: 'Research water security measurement, transboundary challenges, and future scenarios.'
    },
    topic: 'water-systems',
    category: 'SECURITY',
    icon: 'Shield',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-sec-1', title: 'Safe Water for All', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Everyone Needs Water!</h2><p>Clean, safe water is something everyone needs. We must protect water for all people!</p>', MIDDLE_SCHOOL: '<h2>Global Water Challenges</h2><p>Billions lack safe water. Climate change, pollution, and growing populations increase pressure.</p>', HIGH_SCHOOL: '<h2>Water Security</h2><p>Having reliable access to adequate water of acceptable quality for health, livelihoods, and ecosystems.</p>', UNDERGRADUATE: '<h2>Security Framework</h2><p>Availability, access, quality, and stability. Physical, economic, and institutional dimensions.</p>', GRADUATE: '<h2>Water Conflict</h2><p>Water scarcity can cause conflict, but more often cooperation. Transboundary water management.</p>', PHD: '<h2>Research Frontiers</h2><p>Water security indices, scenario planning, and transboundary water governance.</p>' } }],
    activities: [{ id: 'ws-sec-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Water for Everyone!', MIDDLE_SCHOOL: 'Global Challenges', HIGH_SCHOOL: 'Security Assessment', UNDERGRADUATE: 'Framework Analysis', GRADUATE: 'Conflict Scenario', PHD: 'Index Development' }, description: { ELEMENTARY: 'Help bring water to those who need it!', MIDDLE_SCHOOL: 'Explore global water challenges.', HIGH_SCHOOL: 'Assess water security in a region.', UNDERGRADUATE: 'Apply a water security framework.', GRADUATE: 'Analyze a transboundary water conflict.', PHD: 'Develop a water security index.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-sec-game', type: 'simulation', title: 'Water Guardian', description: 'Ensure water security for all!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-sec-quiz', passingScore: 80, questions: [{ id: 'wsecq1', question: { ELEMENTARY: 'Does everyone have clean water?', MIDDLE_SCHOOL: 'How many people lack safe water?', HIGH_SCHOOL: 'What is water security?', UNDERGRADUATE: 'What are water security dimensions?', GRADUATE: 'Does water scarcity cause wars?', PHD: 'What is a water security index?' }, options: { ELEMENTARY: ['No, many people need help getting clean water', 'Yes, everyone does', 'Water doesnt matter', 'Only rich people need water'], MIDDLE_SCHOOL: ['Billions of people', 'Nobody', 'Only ten people', 'Everyone has water'], HIGH_SCHOOL: ['Reliable access to adequate quality water', 'Locked water', 'Private water', 'Water guards'], UNDERGRADUATE: ['Availability, access, quality, stability', 'Only amount', 'Only quality', 'Only access'], GRADUATE: ['More often cooperation than conflict', 'Always war', 'Never conflict', 'No relationship'], PHD: ['A measure combining water security indicators', 'A simple count', 'A water list', 'A security camera'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Many people around the world dont have access to clean, safe water.', MIDDLE_SCHOOL: 'About 2 billion people lack access to safely managed drinking water.', HIGH_SCHOOL: 'Water security means having reliable access to enough water of acceptable quality.', UNDERGRADUATE: 'Water security has physical, economic, and institutional dimensions affecting availability, access, quality, and stability.', GRADUATE: 'Shared water resources more often lead to cooperation and treaties than armed conflict.', PHD: 'Water security indices combine multiple indicators into aggregate measures for comparison.' } }] },
    externalResources: [{ title: 'UN Water Security', url: 'https://www.unwater.org/water-facts/water-security', type: 'research' }]
  },
  // Module 20: Integrated Water Management
  {
    id: 'water-integrated',
    slug: 'integrated-water-management',
    title: 'Integrated Water Management',
    description: {
      ELEMENTARY: 'Learn how we manage all types of water together!',
      MIDDLE_SCHOOL: 'Discover how cities connect water, wastewater, and stormwater.',
      HIGH_SCHOOL: 'Explore integrated water resources management principles and practice.',
      UNDERGRADUATE: 'Analyze IWRM frameworks, stakeholder engagement, and implementation.',
      GRADUATE: 'Examine water governance, basin planning, and institutional coordination.',
      PHD: 'Research integrated water modeling, adaptive management, and system transformation.'
    },
    topic: 'water-systems',
    category: 'INTEGRATED',
    icon: 'GitMerge',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-iwm-1', title: 'All Water Together', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Works Together!</h2><p>All water is connected - rain, rivers, drinking water, and wastewater. We manage them all together!</p>', MIDDLE_SCHOOL: '<h2>Connected Water</h2><p>Cities manage drinking water, wastewater, and stormwater. Smart cities connect these systems.</p>', HIGH_SCHOOL: '<h2>IWRM Principles</h2><p>Coordinated development of water, land, and resources. Maximizing welfare without compromising sustainability.</p>', UNDERGRADUATE: '<h2>IWRM Implementation</h2><p>Stakeholder participation, basin planning, and balancing competing uses.</p>', GRADUATE: '<h2>Water Governance</h2><p>Institutions, policies, and coordination mechanisms for integrated management.</p>', PHD: '<h2>Research Frontiers</h2><p>Integrated modeling, adaptive governance, and socio-hydrological systems.</p>' } }],
    activities: [{ id: 'ws-iwm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Connect the Water!', MIDDLE_SCHOOL: 'System Links', HIGH_SCHOOL: 'Basin Planning', UNDERGRADUATE: 'Stakeholder Balance', GRADUATE: 'Governance Design', PHD: 'Integrated Model' }, description: { ELEMENTARY: 'See how all water connects together!', MIDDLE_SCHOOL: 'Find connections between water systems.', HIGH_SCHOOL: 'Develop an integrated basin plan.', UNDERGRADUATE: 'Balance stakeholder water interests.', GRADUATE: 'Design water governance structure.', PHD: 'Build an integrated water model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-iwm-game', type: 'simulation', title: 'Water Integrator', description: 'Manage all water resources together!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-iwm-quiz', passingScore: 80, questions: [{ id: 'wiwmq1', question: { ELEMENTARY: 'Are different types of water connected?', MIDDLE_SCHOOL: 'What systems do cities manage together?', HIGH_SCHOOL: 'What is IWRM?', UNDERGRADUATE: 'Why is stakeholder participation important?', GRADUATE: 'What is water governance?', PHD: 'What is a socio-hydrological system?' }, options: { ELEMENTARY: ['Yes, all water is connected', 'No, water is separate', 'Only rivers', 'Only rain'], MIDDLE_SCHOOL: ['Drinking water, wastewater, and stormwater', 'Only drinking water', 'Only rain', 'Nothing'], HIGH_SCHOOL: ['Integrated Water Resources Management', 'International Water Rules Meeting', 'Indoor Water Recycling Method', 'Irrigation Water Regulation Ministry'], UNDERGRADUATE: ['Different users have competing needs and knowledge', 'Not important', 'Only experts matter', 'No participation needed'], GRADUATE: ['Rules and institutions for managing water', 'Water police', 'Water companies only', 'No governance exists'], PHD: ['Coupled human-water systems with feedback', 'Only water models', 'Only social models', 'Separate systems'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Rain becomes river water, drinking water, wastewater, and back again - all connected!', MIDDLE_SCHOOL: 'Smart cities integrate drinking water supply, wastewater treatment, and stormwater management.', HIGH_SCHOOL: 'IWRM coordinates development of water, land, and resources to maximize welfare sustainably.', UNDERGRADUATE: 'Stakeholders have different needs and local knowledge essential for effective water management.', GRADUATE: 'Water governance includes the rules, institutions, and processes for making water decisions.', PHD: 'Socio-hydrological systems model coupled feedbacks between human behavior and water systems.' } }] },
    externalResources: [{ title: 'IWRM', url: 'https://www.gwp.org/en/learn/iwrm/', type: 'research' }]
  },
  {
    id: 'water-desalination',
    slug: 'desalination',
    title: 'Desalination Technology',
    description: {
      ELEMENTARY: 'Learn how we can turn salty ocean water into fresh drinking water!',
      MIDDLE_SCHOOL: 'Discover how desalination removes salt from seawater for drinking.',
      HIGH_SCHOOL: 'Explore desalination technologies, energy requirements, and environmental impacts.',
      UNDERGRADUATE: 'Analyze reverse osmosis, thermal processes, and desalination economics.',
      GRADUATE: 'Examine desalination sustainability, brine management, and renewable integration.',
      PHD: 'Research advanced membranes, energy recovery, and desalination system optimization.'
    },
    topic: 'water-systems',
    category: 'TECHNOLOGY',
    icon: 'Flask',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-desal-1', title: 'Fresh from Salt', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Making Seawater Drinkable!</h2><p>We can remove the salt from ocean water to make fresh water for people to drink!</p>', MIDDLE_SCHOOL: '<h2>How Desalination Works</h2><p>Desalination removes dissolved salts from seawater using membranes or evaporation to create fresh water.</p>', HIGH_SCHOOL: '<h2>Desalination Methods</h2><p>Reverse osmosis pushes water through membranes. Thermal methods evaporate and condense water.</p>', UNDERGRADUATE: '<h2>System Engineering</h2><p>Pretreatment, membrane arrays, energy recovery, and post-treatment for desalination plants.</p>', GRADUATE: '<h2>Sustainability Challenges</h2><p>Energy intensity, brine disposal, marine impacts, and renewable energy integration.</p>', PHD: '<h2>Research Frontiers</h2><p>Graphene membranes, forward osmosis, and solar-powered desalination.</p>' } }],
    activities: [{ id: 'ws-desal-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Remove the Salt!', MIDDLE_SCHOOL: 'Desalination Lab', HIGH_SCHOOL: 'System Comparison', UNDERGRADUATE: 'Plant Design', GRADUATE: 'Sustainability Analysis', PHD: 'Membrane Research' }, description: { ELEMENTARY: 'Turn salty water into fresh water!', MIDDLE_SCHOOL: 'Test desalination methods.', HIGH_SCHOOL: 'Compare RO and thermal systems.', UNDERGRADUATE: 'Design a desalination plant.', GRADUATE: 'Analyze sustainability tradeoffs.', PHD: 'Research advanced membranes.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-desal-game', type: 'simulation', title: 'Desalination Engineer', description: 'Turn seawater into fresh water!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-desal-quiz', passingScore: 80, questions: [{ id: 'wdesalq1', question: { ELEMENTARY: 'What does desalination remove?', MIDDLE_SCHOOL: 'What is reverse osmosis?', HIGH_SCHOOL: 'Why is desalination energy-intensive?', UNDERGRADUATE: 'What is energy recovery?', GRADUATE: 'What is brine?', PHD: 'What is forward osmosis?' }, options: { ELEMENTARY: ['Salt from seawater', 'Dirt from rivers', 'Fish from oceans', 'Sand from beaches'], MIDDLE_SCHOOL: ['Pushing water through special filters', 'Reversing water flow', 'Cleaning fish', 'Boiling water'], HIGH_SCHOOL: ['Overcoming osmotic pressure requires energy', 'Its not energy intensive', 'Salt is heavy', 'Machines are inefficient'], UNDERGRADUATE: ['Recapturing pressure from brine stream', 'Recovering lost water', 'Energy storage', 'Power generation'], GRADUATE: ['Concentrated salt water discharge', 'Fish brine', 'Pickled water', 'Fresh water'], PHD: ['Natural osmotic flow through membranes', 'Backward osmosis', 'Side osmosis', 'No such thing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Desalination removes salt from seawater to make fresh water we can drink!', MIDDLE_SCHOOL: 'Reverse osmosis pushes water through membranes that let water through but block salt.', HIGH_SCHOOL: 'Significant energy is needed to overcome the natural osmotic pressure of salty water.', UNDERGRADUATE: 'Energy recovery devices capture pressure from concentrated brine to reduce energy needs.', GRADUATE: 'Brine is the concentrated salt water left after freshwater is extracted.', PHD: 'Forward osmosis uses natural osmotic gradients to draw water through membranes.' } }] },
    externalResources: [{ title: 'Desalination', url: 'https://www.water.usgs.gov/ogw/gwrp/desalination/', type: 'research' }]
  },
  {
    id: 'water-monitoring',
    slug: 'water-quality-monitoring',
    title: 'Water Quality Monitoring',
    description: {
      ELEMENTARY: 'Learn how scientists test water to make sure it is safe and clean!',
      MIDDLE_SCHOOL: 'Discover how water quality is measured and monitored.',
      HIGH_SCHOOL: 'Explore water quality parameters, testing methods, and monitoring systems.',
      UNDERGRADUATE: 'Analyze monitoring networks, data management, and regulatory compliance.',
      GRADUATE: 'Examine real-time monitoring, sensor networks, and early warning systems.',
      PHD: 'Research remote sensing, machine learning for water quality, and citizen science.'
    },
    topic: 'water-systems',
    category: 'MONITORING',
    icon: 'Search',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-mon-1', title: 'Testing the Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Is the Water Safe?</h2><p>Scientists test water to check for germs, chemicals, and other things that could make people sick.</p>', MIDDLE_SCHOOL: '<h2>Water Quality Tests</h2><p>Testing measures temperature, pH, dissolved oxygen, bacteria, and pollutants.</p>', HIGH_SCHOOL: '<h2>Monitoring Systems</h2><p>Regular sampling, continuous sensors, and biological indicators track water quality over time.</p>', UNDERGRADUATE: '<h2>Monitoring Networks</h2><p>Sampling design, laboratory analysis, QA/QC, and database management.</p>', GRADUATE: '<h2>Real-Time Systems</h2><p>Sensor networks, SCADA integration, and automated response to quality events.</p>', PHD: '<h2>Research Frontiers</h2><p>Satellite monitoring, AI-powered analysis, and participatory monitoring.</p>' } }],
    activities: [{ id: 'ws-mon-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Test the Water!', MIDDLE_SCHOOL: 'Quality Lab', HIGH_SCHOOL: 'Monitoring Design', UNDERGRADUATE: 'Network Plan', GRADUATE: 'Real-Time System', PHD: 'AI Analysis' }, description: { ELEMENTARY: 'Test water samples for safety!', MIDDLE_SCHOOL: 'Measure water quality parameters.', HIGH_SCHOOL: 'Design a monitoring program.', UNDERGRADUATE: 'Plan a monitoring network.', GRADUATE: 'Design real-time monitoring.', PHD: 'Apply AI to water quality data.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-mon-game', type: 'simulation', title: 'Water Quality Detective', description: 'Monitor and protect water quality!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-mon-quiz', passingScore: 80, questions: [{ id: 'wmonq1', question: { ELEMENTARY: 'Why do we test water?', MIDDLE_SCHOOL: 'What does pH measure?', HIGH_SCHOOL: 'What are biological indicators?', UNDERGRADUATE: 'What is QA/QC?', GRADUATE: 'What is SCADA?', PHD: 'How can satellites monitor water?' }, options: { ELEMENTARY: ['To make sure it is safe', 'For fun', 'Water doesnt need testing', 'To make it wet'], MIDDLE_SCHOOL: ['How acidic or basic water is', 'Water temperature', 'Water color', 'Water taste'], HIGH_SCHOOL: ['Organisms showing water quality', 'Biological studies', 'Lab biology', 'No indicators'], UNDERGRADUATE: ['Quality Assurance / Quality Control', 'Questions and Answers', 'Quick and Cheap', 'Quantity Check'], GRADUATE: ['Supervisory Control and Data Acquisition', 'Science Control', 'System Check', 'Safety Control'], PHD: ['Detecting color, temperature, and chlorophyll from space', 'They cannot', 'Taking samples', 'Sending divers'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We test water to make sure it is safe and does not have things that could make people sick!', MIDDLE_SCHOOL: 'pH measures how acidic or basic (alkaline) the water is on a scale from 0 to 14.', HIGH_SCHOOL: 'Biological indicators are organisms whose presence or absence indicates water quality conditions.', UNDERGRADUATE: 'QA/QC procedures ensure monitoring data is accurate and reliable.', GRADUATE: 'SCADA systems collect and display real-time data from sensors for system control.', PHD: 'Satellites detect water color, temperature, and algae to indicate water quality from space.' } }] },
    externalResources: [{ title: 'Water Quality', url: 'https://www.epa.gov/national-aquatic-resource-surveys', type: 'research' }]
  },
  {
    id: 'water-aquifer',
    slug: 'aquifer-management',
    title: 'Aquifer and Groundwater Management',
    description: {
      ELEMENTARY: 'Learn about the underground lakes and rivers that hold our water!',
      MIDDLE_SCHOOL: 'Discover how groundwater forms and why we need to protect it.',
      HIGH_SCHOOL: 'Explore aquifer types, recharge, and sustainable groundwater management.',
      UNDERGRADUATE: 'Analyze groundwater hydrology, pumping impacts, and management strategies.',
      GRADUATE: 'Examine aquifer governance, conjunctive use, and managed aquifer recharge.',
      PHD: 'Research groundwater modeling, contamination remediation, and transboundary aquifers.'
    },
    topic: 'water-systems',
    category: 'GROUNDWATER',
    icon: 'Layers',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-aq-1', title: 'Underground Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Under the Ground!</h2><p>There is lots of water stored underground in rocks and soil. We pump it up through wells!</p>', MIDDLE_SCHOOL: '<h2>Aquifers</h2><p>Aquifers are underground layers of rock and sediment that hold groundwater. Rain soaks down to recharge them.</p>', HIGH_SCHOOL: '<h2>Groundwater Management</h2><p>Sustainable pumping must not exceed recharge. Over-pumping causes land subsidence and saltwater intrusion.</p>', UNDERGRADUATE: '<h2>Groundwater Hydrology</h2><p>Flow dynamics, well hydraulics, aquifer testing, and safe yield estimation.</p>', GRADUATE: '<h2>Aquifer Governance</h2><p>Rights systems, pumping regulations, groundwater markets, and conjunctive surface-groundwater use.</p>', PHD: '<h2>Research Frontiers</h2><p>Numerical modeling, contamination transport, and transboundary aquifer management.</p>' } }],
    activities: [{ id: 'ws-aq-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Pump the Well!', MIDDLE_SCHOOL: 'Aquifer Model', HIGH_SCHOOL: 'Balance Pumping', UNDERGRADUATE: 'Well Design', GRADUATE: 'Governance Plan', PHD: 'Groundwater Model' }, description: { ELEMENTARY: 'See how we get water from underground!', MIDDLE_SCHOOL: 'Build a model aquifer.', HIGH_SCHOOL: 'Balance pumping with recharge.', UNDERGRADUATE: 'Design a pumping well.', GRADUATE: 'Design aquifer governance.', PHD: 'Build a groundwater flow model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-aq-game', type: 'simulation', title: 'Aquifer Guardian', description: 'Protect and manage groundwater sustainably!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-aq-quiz', passingScore: 80, questions: [{ id: 'waqq1', question: { ELEMENTARY: 'Where is groundwater?', MIDDLE_SCHOOL: 'What is an aquifer?', HIGH_SCHOOL: 'What is over-pumping?', UNDERGRADUATE: 'What is safe yield?', GRADUATE: 'What is conjunctive use?', PHD: 'What is saltwater intrusion?' }, options: { ELEMENTARY: ['Underground in rocks and soil', 'In the sky', 'Only in lakes', 'On mountains'], MIDDLE_SCHOOL: ['Underground layer holding water', 'A fish tank', 'A water bottle', 'A swimming pool'], HIGH_SCHOOL: ['Pumping more than natural recharge', 'Pumping enough', 'Not pumping', 'Over exercising'], UNDERGRADUATE: ['Maximum sustainable pumping rate', 'Unsafe amount', 'No pumping', 'Random rate'], GRADUATE: ['Coordinated surface and groundwater use', 'Only groundwater', 'Only surface water', 'No coordination'], PHD: ['Saltwater moving into freshwater aquifers', 'Fresh water becoming salty magically', 'Ocean overflow', 'Salt deposits'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Groundwater is stored underground in spaces between rocks and in soil!', MIDDLE_SCHOOL: 'An aquifer is an underground layer of rock or sediment that holds and transmits groundwater.', HIGH_SCHOOL: 'Over-pumping extracts groundwater faster than it can be recharged, depleting the aquifer.', UNDERGRADUATE: 'Safe yield is the maximum pumping rate that can be sustained without depleting the aquifer.', GRADUATE: 'Conjunctive use coordinates surface water and groundwater to optimize overall water supply.', PHD: 'Saltwater intrusion occurs when over-pumping near coasts draws seawater into freshwater aquifers.' } }] },
    externalResources: [{ title: 'Groundwater', url: 'https://www.usgs.gov/special-topic/water-science-school/science/groundwater', type: 'research' }]
  },
  {
    id: 'water-watershed',
    slug: 'watershed-protection',
    title: 'Watershed Protection',
    description: {
      ELEMENTARY: 'Learn about the land areas that collect water for rivers and lakes!',
      MIDDLE_SCHOOL: 'Discover how everything in a watershed affects water quality downstream.',
      HIGH_SCHOOL: 'Explore watershed management, land use impacts, and protection strategies.',
      UNDERGRADUATE: 'Analyze watershed hydrology, BMPs, and nonpoint source pollution control.',
      GRADUATE: 'Examine watershed planning, stakeholder coordination, and funding mechanisms.',
      PHD: 'Research watershed modeling, ecosystem services, and payments for watershed services.'
    },
    topic: 'water-systems',
    category: 'ECOSYSTEMS',
    icon: 'Mountain',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-shed-1', title: 'Our Watersheds', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Catchers!</h2><p>A watershed is all the land that catches rain and sends it to one stream or lake. We all live in a watershed!</p>', MIDDLE_SCHOOL: '<h2>Watershed Systems</h2><p>Everything on the land - farms, cities, forests - affects the water flowing through the watershed.</p>', HIGH_SCHOOL: '<h2>Watershed Management</h2><p>Protecting forests, managing farms, and controlling development keeps watershed water clean.</p>', UNDERGRADUATE: '<h2>Best Management Practices</h2><p>Buffer strips, cover crops, detention ponds, and erosion control reduce nonpoint source pollution.</p>', GRADUATE: '<h2>Watershed Planning</h2><p>Multi-stakeholder planning, TMDL development, and financing watershed protection.</p>', PHD: '<h2>Research Frontiers</h2><p>Watershed modeling, ecosystem service valuation, and payments for watershed services.</p>' } }],
    activities: [{ id: 'ws-shed-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Watershed!', MIDDLE_SCHOOL: 'Pollution Path', HIGH_SCHOOL: 'Protection Plan', UNDERGRADUATE: 'BMP Selection', GRADUATE: 'Watershed Plan', PHD: 'Service Valuation' }, description: { ELEMENTARY: 'See how rain flows through your watershed!', MIDDLE_SCHOOL: 'Track how pollution moves through watersheds.', HIGH_SCHOOL: 'Design a watershed protection plan.', UNDERGRADUATE: 'Select BMPs for pollution control.', GRADUATE: 'Develop a watershed management plan.', PHD: 'Value watershed ecosystem services.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-shed-game', type: 'simulation', title: 'Watershed Protector', description: 'Keep your watershed healthy and clean!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-shed-quiz', passingScore: 80, questions: [{ id: 'wshedq1', question: { ELEMENTARY: 'What is a watershed?', MIDDLE_SCHOOL: 'How does land affect water?', HIGH_SCHOOL: 'What is nonpoint source pollution?', UNDERGRADUATE: 'What is a buffer strip?', GRADUATE: 'What is a TMDL?', PHD: 'What are payments for watershed services?' }, options: { ELEMENTARY: ['Land that sends rain to one stream', 'A water storage shed', 'A place to wash', 'A water store'], MIDDLE_SCHOOL: ['Pollution and soil wash into streams', 'Land does not affect water', 'Only rain matters', 'Water affects land only'], HIGH_SCHOOL: ['Pollution from many diffuse sources', 'Pollution from one pipe', 'No pollution', 'Point source pollution'], UNDERGRADUATE: ['Vegetated strip between fields and water', 'A buffer zone', 'A strip mall', 'A paper strip'], GRADUATE: ['Total Maximum Daily Load - pollution limit', 'Too Many Dirty Lakes', 'Total Measurement', 'No meaning'], PHD: ['Paying landowners for watershed protection', 'Water bills', 'Tax payments', 'No such payments'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A watershed is all the land that catches rain and sends it to one stream, river, or lake!', MIDDLE_SCHOOL: 'Pollution, fertilizers, and soil from the land wash into streams, affecting water quality.', HIGH_SCHOOL: 'Nonpoint source pollution comes from many diffuse sources across the landscape, not one pipe.', UNDERGRADUATE: 'Buffer strips are vegetated areas along waterways that filter pollutants from runoff.', GRADUATE: 'TMDL sets the maximum amount of a pollutant a water body can receive and still meet standards.', PHD: 'PES programs compensate upstream landowners for practices that protect downstream water quality.' } }] },
    externalResources: [{ title: 'Watershed Protection', url: 'https://www.epa.gov/hwp', type: 'research' }]
  },
  {
    id: 'water-traditional',
    slug: 'traditional-water-harvesting',
    title: 'Traditional Water Harvesting',
    description: {
      ELEMENTARY: 'Learn about ancient ways people collected and saved water!',
      MIDDLE_SCHOOL: 'Discover traditional water harvesting techniques from around the world.',
      HIGH_SCHOOL: 'Explore qanats, johads, and other indigenous water management systems.',
      UNDERGRADUATE: 'Analyze traditional water systems, modern adaptations, and cultural contexts.',
      GRADUATE: 'Examine indigenous water rights, traditional ecological knowledge, and revitalization.',
      PHD: 'Research traditional system hydrology, integration with modern infrastructure, and governance.'
    },
    topic: 'water-systems',
    category: 'TRADITIONAL',
    icon: 'History',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-trad-1', title: 'Ancient Water Wisdom', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Old Ways of Getting Water!</h2><p>Long ago, people invented clever ways to collect rain, find underground water, and share it fairly!</p>', MIDDLE_SCHOOL: '<h2>Traditional Systems</h2><p>Qanats in Persia, johads in India, and acequias in the Americas - ancient technologies that still work today.</p>', HIGH_SCHOOL: '<h2>Indigenous Water Management</h2><p>Traditional systems combined engineering with social organization for equitable, sustainable water use.</p>', UNDERGRADUATE: '<h2>System Analysis</h2><p>Hydrology of traditional systems, community management, and opportunities for revival and adaptation.</p>', GRADUATE: '<h2>Indigenous Rights</h2><p>Legal recognition of traditional water rights, knowledge integration, and co-management.</p>', PHD: '<h2>Research Frontiers</h2><p>Documenting traditional knowledge, hybrid system design, and governance lessons.</p>' } }],
    activities: [{ id: 'ws-trad-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Ancient Water Ways!', MIDDLE_SCHOOL: 'Build a Qanat', HIGH_SCHOOL: 'System Comparison', UNDERGRADUATE: 'Adaptation Plan', GRADUATE: 'Rights Analysis', PHD: 'Knowledge Documentation' }, description: { ELEMENTARY: 'Try ancient water collection methods!', MIDDLE_SCHOOL: 'Design a traditional water system.', HIGH_SCHOOL: 'Compare traditional and modern systems.', UNDERGRADUATE: 'Plan traditional system adaptation.', GRADUATE: 'Analyze indigenous water rights.', PHD: 'Document traditional water knowledge.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-trad-game', type: 'simulation', title: 'Water Heritage', description: 'Learn from ancient water wisdom!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-trad-quiz', passingScore: 80, questions: [{ id: 'wtradq1', question: { ELEMENTARY: 'Did ancient people know about water?', MIDDLE_SCHOOL: 'What is a qanat?', HIGH_SCHOOL: 'What is an acequia?', UNDERGRADUATE: 'Why revive traditional systems?', GRADUATE: 'What are indigenous water rights?', PHD: 'What is traditional ecological knowledge?' }, options: { ELEMENTARY: ['Yes, they were very clever with water', 'No, they had no water', 'Water was invented recently', 'Only we know about water'], MIDDLE_SCHOOL: ['Underground tunnel bringing mountain water', 'A type of boat', 'A water bottle', 'A swimming pool'], HIGH_SCHOOL: ['Community-managed irrigation ditch system', 'A river', 'A modern pipe', 'A water fountain'], UNDERGRADUATE: ['Sustainable, locally appropriate, and community-based', 'Just for history', 'They do not work', 'No reason'], GRADUATE: ['Legal recognition of traditional water use', 'No such rights', 'Only modern rights', 'Government rights'], PHD: ['Indigenous understanding of ecosystems and resources', 'Book knowledge', 'No knowledge', 'Only modern science'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Ancient people invented amazing ways to find, collect, store, and share water!', MIDDLE_SCHOOL: 'Qanats are underground tunnels that bring groundwater from mountains to dry areas.', HIGH_SCHOOL: 'Acequias are community-managed irrigation systems brought to the Americas from Spain.', UNDERGRADUATE: 'Traditional systems are sustainable, culturally appropriate, and managed by communities.', GRADUATE: 'Indigenous water rights recognize traditional uses that predate modern water law.', PHD: 'TEK is accumulated knowledge about ecosystems held by indigenous and local communities.' } }] },
    externalResources: [{ title: 'Traditional Water', url: 'https://www.unesco.org/en/articles/traditional-water-knowledge', type: 'research' }]
  },
  {
    id: 'water-conservation-tech',
    slug: 'water-conservation-technology',
    title: 'Water Conservation Technology',
    description: {
      ELEMENTARY: 'Learn about cool gadgets and tricks that help save water!',
      MIDDLE_SCHOOL: 'Discover technologies that reduce water waste in homes and businesses.',
      HIGH_SCHOOL: 'Explore water-efficient fixtures, smart irrigation, and leak detection.',
      UNDERGRADUATE: 'Analyze water conservation technologies, cost-effectiveness, and implementation.',
      GRADUATE: 'Examine conservation program design, rebate strategies, and behavioral approaches.',
      PHD: 'Research conservation technology performance, adoption barriers, and water demand modeling.'
    },
    topic: 'water-systems',
    category: 'TECHNOLOGY',
    icon: 'Settings',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-cons-1', title: 'Water-Saving Gadgets', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Water Savers!</h2><p>Special showerheads, toilets, and faucets use less water but work just as well!</p>', MIDDLE_SCHOOL: '<h2>Efficient Fixtures</h2><p>Low-flow fixtures, dual-flush toilets, and smart irrigation save thousands of gallons per year.</p>', HIGH_SCHOOL: '<h2>Conservation Technologies</h2><p>WaterSense fixtures, weather-based irrigation, leak detection, and submetering.</p>', UNDERGRADUATE: '<h2>Technology Assessment</h2><p>Water savings verification, payback periods, and program cost-effectiveness analysis.</p>', GRADUATE: '<h2>Program Design</h2><p>Rebate programs, rate structures, and combining technology with behavioral approaches.</p>', PHD: '<h2>Research Frontiers</h2><p>Real-world performance vs. rated efficiency, adoption dynamics, and demand elasticity.</p>' } }],
    activities: [{ id: 'ws-cons-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save Water!', MIDDLE_SCHOOL: 'Fixture Upgrade', HIGH_SCHOOL: 'Audit Plan', UNDERGRADUATE: 'Cost-Benefit Analysis', GRADUATE: 'Program Design', PHD: 'Demand Modeling' }, description: { ELEMENTARY: 'Use gadgets to save water!', MIDDLE_SCHOOL: 'Upgrade fixtures to save water.', HIGH_SCHOOL: 'Conduct a water audit.', UNDERGRADUATE: 'Analyze conservation cost-effectiveness.', GRADUATE: 'Design a conservation program.', PHD: 'Model water demand response.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-cons-game', type: 'simulation', title: 'Conservation Champion', description: 'Save water with smart technology!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-cons-quiz', passingScore: 80, questions: [{ id: 'wconsq1', question: { ELEMENTARY: 'What do low-flow fixtures do?', MIDDLE_SCHOOL: 'What is a dual-flush toilet?', HIGH_SCHOOL: 'What is WaterSense?', UNDERGRADUATE: 'What is submetering?', GRADUATE: 'What is demand elasticity?', PHD: 'What affects real-world savings?' }, options: { ELEMENTARY: ['Use less water but work well', 'Use more water', 'Dont work', 'Cost more water'], MIDDLE_SCHOOL: ['Toilet with two flush options', 'Double toilet', 'Two toilets', 'Broken toilet'], HIGH_SCHOOL: ['EPA program certifying efficient products', 'Water sensor', 'Rain sensor', 'No program'], UNDERGRADUATE: ['Individual water meters for units', 'One meter', 'No meters', 'Speed meters'], GRADUATE: ['How much demand changes with price', 'Fixed demand', 'No elasticity', 'Only supply'], PHD: ['User behavior, installation quality, system pressure', 'Only technology', 'Nothing varies', 'Perfect performance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Low-flow fixtures use less water but work just as well for washing and flushing!', MIDDLE_SCHOOL: 'Dual-flush toilets have two buttons - one for liquid waste (less water) and one for solid waste.', HIGH_SCHOOL: 'WaterSense is an EPA program that labels water-efficient products meeting specific criteria.', UNDERGRADUATE: 'Submetering provides individual water meters, enabling accountability and leak detection.', GRADUATE: 'Demand elasticity measures how much water use changes when prices or conditions change.', PHD: 'Real-world savings vary with user behavior, installation quality, and system conditions.' } }] },
    externalResources: [{ title: 'WaterSense', url: 'https://www.epa.gov/watersense', type: 'research' }]
  },
  {
    id: 'water-urban',
    slug: 'urban-water-management',
    title: 'Urban Water Management',
    description: {
      ELEMENTARY: 'Learn how cities get water to homes and keep streets from flooding!',
      MIDDLE_SCHOOL: 'Discover how cities manage water supply, drainage, and wastewater.',
      HIGH_SCHOOL: 'Explore integrated urban water management and green infrastructure.',
      UNDERGRADUATE: 'Analyze urban water systems, asset management, and One Water approaches.',
      GRADUATE: 'Examine water utility management, rate design, and system resilience.',
      PHD: 'Research urban hydrology, decentralized systems, and urban water sustainability.'
    },
    topic: 'water-systems',
    category: 'URBAN',
    icon: 'Building2',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-urban-1', title: 'City Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water in the City!</h2><p>Cities have pipes that bring clean water in and take dirty water away. Storm drains catch rain!</p>', MIDDLE_SCHOOL: '<h2>Urban Water Systems</h2><p>Water supply, wastewater, and stormwater are three connected systems that cities must manage together.</p>', HIGH_SCHOOL: '<h2>Integrated Management</h2><p>One Water approach manages supply, wastewater, and stormwater together with green infrastructure.</p>', UNDERGRADUATE: '<h2>System Challenges</h2><p>Aging infrastructure, combined sewers, water loss, and funding gaps challenge urban water.</p>', GRADUATE: '<h2>Utility Management</h2><p>Rate design, asset management, workforce development, and financial sustainability.</p>', PHD: '<h2>Research Frontiers</h2><p>Decentralized systems, nature-based solutions, and urban water metabolism.</p>' } }],
    activities: [{ id: 'ws-urban-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'City Water Pipes!', MIDDLE_SCHOOL: 'System Map', HIGH_SCHOOL: 'Green Infrastructure', UNDERGRADUATE: 'Asset Planning', GRADUATE: 'Rate Design', PHD: 'System Modeling' }, description: { ELEMENTARY: 'See how water moves through cities!', MIDDLE_SCHOOL: 'Map an urban water system.', HIGH_SCHOOL: 'Design green infrastructure.', UNDERGRADUATE: 'Plan infrastructure renewal.', GRADUATE: 'Design water utility rates.', PHD: 'Model urban water systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-urban-game', type: 'simulation', title: 'City Water Manager', description: 'Keep the city water system running!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-urban-quiz', passingScore: 80, questions: [{ id: 'wurbanq1', question: { ELEMENTARY: 'What carries water in cities?', MIDDLE_SCHOOL: 'What are the three urban water systems?', HIGH_SCHOOL: 'What is green infrastructure?', UNDERGRADUATE: 'What is a combined sewer?', GRADUATE: 'What is asset management?', PHD: 'What is urban water metabolism?' }, options: { ELEMENTARY: ['Pipes underground', 'Rivers only', 'Trucks', 'Buckets'], MIDDLE_SCHOOL: ['Supply, wastewater, and stormwater', 'Only drinking water', 'Just sewers', 'Rivers only'], HIGH_SCHOOL: ['Using plants and nature for water management', 'Green painted pipes', 'Garden hoses', 'No such thing'], UNDERGRADUATE: ['Single system carrying sewage and stormwater', 'Separate systems', 'Only sewage', 'Only stormwater'], GRADUATE: ['Planning infrastructure maintenance and replacement', 'Counting assets', 'No planning', 'Random fixes'], PHD: ['Flows of water through urban systems', 'City eating water', 'No metabolism', 'Only natural systems'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Pipes underground carry clean water to buildings and dirty water away to be cleaned!', MIDDLE_SCHOOL: 'Cities manage water supply, wastewater collection, and stormwater drainage as connected systems.', HIGH_SCHOOL: 'Green infrastructure uses vegetation, soils, and natural processes for water management.', UNDERGRADUATE: 'Combined sewers carry both sewage and stormwater, causing overflow problems during storms.', GRADUATE: 'Asset management plans the maintenance, repair, and replacement of infrastructure over time.', PHD: 'Urban water metabolism studies water flows through cities like nutrients through ecosystems.' } }] },
    externalResources: [{ title: 'Urban Water', url: 'https://www.awwa.org/', type: 'research' }]
  },
  {
    id: 'water-policy',
    slug: 'water-policy-law',
    title: 'Water Policy and Law',
    description: {
      ELEMENTARY: 'Learn about rules that help share water fairly with everyone!',
      MIDDLE_SCHOOL: 'Discover laws and policies that protect water and decide who uses it.',
      HIGH_SCHOOL: 'Explore water rights, regulations, and international water agreements.',
      UNDERGRADUATE: 'Analyze water law doctrines, regulatory frameworks, and water markets.',
      GRADUATE: 'Examine water governance, transboundary management, and policy reform.',
      PHD: 'Research water law evolution, adaptive governance, and human right to water.'
    },
    topic: 'water-systems',
    category: 'POLICY',
    icon: 'Scale',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-pol-1', title: 'Water Rules', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Fair Water Sharing!</h2><p>Rules help make sure everyone gets water they need and nobody wastes or pollutes it!</p>', MIDDLE_SCHOOL: '<h2>Water Laws</h2><p>Laws decide who can use water, how much they can take, and require water to be kept clean.</p>', HIGH_SCHOOL: '<h2>Water Rights</h2><p>Riparian rights, prior appropriation, and regulated permits - different systems allocate water differently.</p>', UNDERGRADUATE: '<h2>Legal Frameworks</h2><p>Clean Water Act, Safe Drinking Water Act, water markets, and state allocation systems.</p>', GRADUATE: '<h2>Water Governance</h2><p>Multi-level governance, stakeholder participation, and adaptive management.</p>', PHD: '<h2>Research Frontiers</h2><p>Human right to water, environmental flows, and governance under climate change.</p>' } }],
    activities: [{ id: 'ws-pol-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Share Water Fairly!', MIDDLE_SCHOOL: 'Water Court', HIGH_SCHOOL: 'Rights Analysis', UNDERGRADUATE: 'Policy Design', GRADUATE: 'Governance Planning', PHD: 'Reform Analysis' }, description: { ELEMENTARY: 'Make rules for fair water sharing!', MIDDLE_SCHOOL: 'Decide a water rights case.', HIGH_SCHOOL: 'Analyze water rights systems.', UNDERGRADUATE: 'Design water policy.', GRADUATE: 'Plan water governance.', PHD: 'Analyze water law reform.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'ws-pol-game', type: 'simulation', title: 'Water Policy Maker', description: 'Create fair water rules for everyone!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-pol-quiz', passingScore: 80, questions: [{ id: 'wpolq1', question: { ELEMENTARY: 'Why have water rules?', MIDDLE_SCHOOL: 'What do water laws do?', HIGH_SCHOOL: 'What is prior appropriation?', UNDERGRADUATE: 'What is the Clean Water Act?', GRADUATE: 'What is adaptive management?', PHD: 'What is the human right to water?' }, options: { ELEMENTARY: ['So everyone gets fair water', 'No reason', 'To waste water', 'For fun'], MIDDLE_SCHOOL: ['Decide who can use water and keep it clean', 'Nothing', 'Make water expensive', 'Only for fish'], HIGH_SCHOOL: ['First in time, first in right', 'Share equally', 'Random allocation', 'No allocation'], UNDERGRADUATE: ['Federal law protecting water quality', 'State law only', 'No law', 'Only for drinking water'], GRADUATE: ['Adjusting management based on outcomes', 'Never changing', 'Random management', 'No management'], PHD: ['Recognizing water as fundamental human right', 'No such right', 'Only property right', 'Commodity only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Water rules help make sure everyone gets the water they need fairly!', MIDDLE_SCHOOL: 'Water laws allocate water among users and set standards for water quality protection.', HIGH_SCHOOL: 'Prior appropriation allocates water based on who claimed it first - first in time, first in right.', UNDERGRADUATE: 'The Clean Water Act is the main federal law protecting surface water quality in the US.', GRADUATE: 'Adaptive management adjusts policies based on monitoring and learning from outcomes.', PHD: 'The human right to water recognizes access to water as essential for life and dignity.' } }] },
    externalResources: [{ title: 'Water Law', url: 'https://www.americanbar.org/groups/environment_energy_resources/publications/waterlaw/', type: 'research' }]
  },
  {
    id: 'water-energy',
    slug: 'water-energy-nexus',
    title: 'Water-Energy Nexus',
    description: {
      ELEMENTARY: 'Learn how water and energy need each other!',
      MIDDLE_SCHOOL: 'Discover the connections between water systems and energy systems.',
      HIGH_SCHOOL: 'Explore energy for water treatment and water for power generation.',
      UNDERGRADUATE: 'Analyze water-energy interdependencies, efficiency opportunities, and tradeoffs.',
      GRADUATE: 'Examine nexus planning, embedded resources, and climate impacts.',
      PHD: 'Research nexus optimization, life cycle assessment, and integrated resource planning.'
    },
    topic: 'water-systems',
    category: 'NEXUS',
    icon: 'Zap',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-nexus-1', title: 'Water and Energy Together', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Best Friends!</h2><p>We need energy to pump and clean water, and we need water to make electricity. They work together!</p>', MIDDLE_SCHOOL: '<h2>Connected Systems</h2><p>Water systems use energy for pumping and treatment. Power plants need water for cooling.</p>', HIGH_SCHOOL: '<h2>Nexus Challenges</h2><p>Water scarcity affects power generation. Energy costs affect water prices. Climate change impacts both.</p>', UNDERGRADUATE: '<h2>Efficiency Opportunities</h2><p>Energy recovery in water systems, dry cooling, and renewable energy for water.</p>', GRADUATE: '<h2>Integrated Planning</h2><p>Joint water-energy planning, embedded energy in water, and nexus policy.</p>', PHD: '<h2>Research Frontiers</h2><p>Life cycle assessment, optimization modeling, and climate resilience.</p>' } }],
    activities: [{ id: 'ws-nexus-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Energy and Water!', MIDDLE_SCHOOL: 'Nexus Map', HIGH_SCHOOL: 'Efficiency Hunt', UNDERGRADUATE: 'Tradeoff Analysis', GRADUATE: 'Integrated Plan', PHD: 'System Optimization' }, description: { ELEMENTARY: 'See how water and energy connect!', MIDDLE_SCHOOL: 'Map water-energy connections.', HIGH_SCHOOL: 'Find efficiency opportunities.', UNDERGRADUATE: 'Analyze nexus tradeoffs.', GRADUATE: 'Develop an integrated plan.', PHD: 'Optimize water-energy systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-nexus-game', type: 'simulation', title: 'Nexus Manager', description: 'Balance water and energy systems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-nexus-quiz', passingScore: 80, questions: [{ id: 'wnexusq1', question: { ELEMENTARY: 'Why do water and energy need each other?', MIDDLE_SCHOOL: 'What uses energy in water systems?', HIGH_SCHOOL: 'Why do power plants need water?', UNDERGRADUATE: 'What is embedded energy?', GRADUATE: 'What is integrated resource planning?', PHD: 'What is nexus optimization?' }, options: { ELEMENTARY: ['Water needs pumping, energy needs cooling', 'They dont need each other', 'Only water needs energy', 'Only energy needs water'], MIDDLE_SCHOOL: ['Pumping and treatment', 'Nothing', 'Only pumping', 'Only at home'], HIGH_SCHOOL: ['For cooling steam after generating power', 'They dont need water', 'Only for drinking', 'For decoration'], UNDERGRADUATE: ['Energy used to collect, treat, and deliver water', 'No energy in water', 'Only electricity', 'Visible energy'], GRADUATE: ['Planning water and energy together', 'Separate planning', 'No planning', 'Only energy planning'], PHD: ['Finding best water-energy system configurations', 'Random choices', 'No optimization', 'Only energy optimization'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We need energy to pump and clean water, and power plants need water to cool down!', MIDDLE_SCHOOL: 'Water systems use significant energy for pumping water and treating it for drinking.', HIGH_SCHOOL: 'Most power plants use water to cool steam after it spins turbines to generate electricity.', UNDERGRADUATE: 'Embedded energy is all the energy used to collect, treat, deliver, heat, and dispose of water.', GRADUATE: 'IRP considers water and energy resources together to find efficient, resilient solutions.', PHD: 'Nexus optimization finds system configurations that minimize combined water and energy use.' } }] },
    externalResources: [{ title: 'Water-Energy Nexus', url: 'https://www.energy.gov/eere/water-energy-nexus', type: 'research' }]
  },
  {
    id: 'water-climate',
    slug: 'climate-and-water',
    title: 'Climate and Water',
    description: {
      ELEMENTARY: 'Learn how weather changes affect water all around us!',
      MIDDLE_SCHOOL: 'Discover how climate change impacts floods, droughts, and water supply.',
      HIGH_SCHOOL: 'Explore climate impacts on water cycles and adaptation strategies.',
      UNDERGRADUATE: 'Analyze climate projections, water system vulnerabilities, and resilience planning.',
      GRADUATE: 'Examine climate adaptation planning, uncertainty management, and infrastructure resilience.',
      PHD: 'Research climate-water modeling, decision making under uncertainty, and transformation.'
    },
    topic: 'water-systems',
    category: 'CLIMATE',
    icon: 'CloudRain',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-clim-1', title: 'Changing Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Weather is Changing!</h2><p>As the Earth gets warmer, some places get more floods while others get more droughts!</p>', MIDDLE_SCHOOL: '<h2>Climate Impacts</h2><p>Climate change brings more intense storms, longer droughts, melting glaciers, and rising seas.</p>', HIGH_SCHOOL: '<h2>Water Cycle Changes</h2><p>Warming intensifies evaporation, changes precipitation patterns, and shifts snowmelt timing.</p>', UNDERGRADUATE: '<h2>Vulnerability Assessment</h2><p>Identifying climate risks to water supply, flooding, and water quality.</p>', GRADUATE: '<h2>Adaptation Planning</h2><p>Flexible strategies, scenario planning, and decision making under deep uncertainty.</p>', PHD: '<h2>Research Frontiers</h2><p>Downscaled climate modeling, compound events, and transformative adaptation.</p>' } }],
    activities: [{ id: 'ws-clim-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Weather Changes!', MIDDLE_SCHOOL: 'Climate Impacts', HIGH_SCHOOL: 'Vulnerability Map', UNDERGRADUATE: 'Risk Assessment', GRADUATE: 'Adaptation Plan', PHD: 'Scenario Modeling' }, description: { ELEMENTARY: 'See how weather changes affect water!', MIDDLE_SCHOOL: 'Explore climate impacts on water.', HIGH_SCHOOL: 'Map water system vulnerabilities.', UNDERGRADUATE: 'Assess climate risks to water.', GRADUATE: 'Develop an adaptation plan.', PHD: 'Model climate-water scenarios.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-clim-game', type: 'simulation', title: 'Climate Water Planner', description: 'Prepare water systems for climate change!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-clim-quiz', passingScore: 80, questions: [{ id: 'wclimq1', question: { ELEMENTARY: 'What is climate change doing to water?', MIDDLE_SCHOOL: 'What climate impacts affect water?', HIGH_SCHOOL: 'How does warming affect snowpack?', UNDERGRADUATE: 'What is a vulnerability assessment?', GRADUATE: 'What is deep uncertainty?', PHD: 'What are compound events?' }, options: { ELEMENTARY: ['More floods and more droughts', 'Nothing', 'Same weather', 'Only good changes'], MIDDLE_SCHOOL: ['More storms, droughts, and sea level rise', 'No impacts', 'Better weather', 'Only floods'], HIGH_SCHOOL: ['Earlier melting reduces summer water', 'More snow', 'No change', 'Later melting'], UNDERGRADUATE: ['Identifying risks to water systems', 'No risks exist', 'Random guessing', 'Only benefits'], GRADUATE: ['Uncertainty that cannot be quantified with probabilities', 'Normal uncertainty', 'No uncertainty', 'Certain outcomes'], PHD: ['Multiple hazards occurring together', 'Single events only', 'No such thing', 'Separate events'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Climate change makes some places get more floods while others get more droughts!', MIDDLE_SCHOOL: 'Climate change brings more intense storms, longer droughts, and rising sea levels.', HIGH_SCHOOL: 'Warmer temperatures cause snow to melt earlier, reducing water availability in summer.', UNDERGRADUATE: 'Vulnerability assessment identifies climate risks to water supply, quality, and infrastructure.', GRADUATE: 'Deep uncertainty means we cannot assign probabilities to future climate scenarios.', PHD: 'Compound events are multiple hazards occurring together, like drought plus heat wave.' } }] },
    externalResources: [{ title: 'Climate and Water', url: 'https://www.ipcc.ch/', type: 'research' }]
  },
  {
    id: 'water-blue-economy',
    slug: 'blue-economy',
    title: 'Blue Economy',
    description: {
      ELEMENTARY: 'Learn how water helps people make a living in healthy ways!',
      MIDDLE_SCHOOL: 'Discover how sustainable use of water creates jobs and protects ecosystems.',
      HIGH_SCHOOL: 'Explore the blue economy: sustainable fishing, aquaculture, and water tourism.',
      UNDERGRADUATE: 'Analyze blue economy sectors, valuation, and governance frameworks.',
      GRADUATE: 'Examine blue growth policy, marine spatial planning, and ocean governance.',
      PHD: 'Research natural capital accounting, blue finance, and ocean sustainability.'
    },
    topic: 'water-systems',
    category: 'ECONOMY',
    icon: 'Fish',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-blue-1', title: 'Water and Work', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Jobs from Water!</h2><p>Many people fish, farm, and work with water. We need to keep water healthy so these jobs last!</p>', MIDDLE_SCHOOL: '<h2>Blue Economy</h2><p>The blue economy includes sustainable fishing, aquaculture, shipping, tourism, and renewable ocean energy.</p>', HIGH_SCHOOL: '<h2>Sustainable Ocean Use</h2><p>Balancing economic activity with ecosystem health to ensure long-term productivity.</p>', UNDERGRADUATE: '<h2>Blue Sectors</h2><p>Fisheries, aquaculture, shipping, coastal tourism, and marine renewables create jobs.</p>', GRADUATE: '<h2>Ocean Governance</h2><p>Marine protected areas, spatial planning, and international ocean agreements.</p>', PHD: '<h2>Research Frontiers</h2><p>Natural capital accounting, blue bonds, and measuring ocean sustainability.</p>' } }],
    activities: [{ id: 'ws-blue-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Water Jobs!', MIDDLE_SCHOOL: 'Blue Business', HIGH_SCHOOL: 'Sector Analysis', UNDERGRADUATE: 'Value Assessment', GRADUATE: 'Governance Design', PHD: 'Capital Accounting' }, description: { ELEMENTARY: 'Explore jobs from water!', MIDDLE_SCHOOL: 'Design a blue economy business.', HIGH_SCHOOL: 'Analyze blue economy sectors.', UNDERGRADUATE: 'Assess blue economy value.', GRADUATE: 'Design ocean governance.', PHD: 'Account for natural capital.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-blue-game', type: 'simulation', title: 'Blue Economy Builder', description: 'Build sustainable water-based livelihoods!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-blue-quiz', passingScore: 80, questions: [{ id: 'wblueq1', question: { ELEMENTARY: 'What jobs come from water?', MIDDLE_SCHOOL: 'What is the blue economy?', HIGH_SCHOOL: 'What is sustainable fishing?', UNDERGRADUATE: 'What is marine spatial planning?', GRADUATE: 'What is a blue bond?', PHD: 'What is natural capital?' }, options: { ELEMENTARY: ['Fishing, farming, and tourism', 'No water jobs', 'Only swimming', 'Nothing'], MIDDLE_SCHOOL: ['Sustainable economic use of water and oceans', 'Blue colored economy', 'Only fishing', 'No such thing'], HIGH_SCHOOL: ['Catching fish without depleting populations', 'Catching all fish', 'No fishing', 'Random fishing'], UNDERGRADUATE: ['Planning ocean uses to avoid conflicts', 'Space in the ocean', 'No planning', 'Only land planning'], GRADUATE: ['Financing for ocean conservation and sustainable use', 'Blue paper bonds', 'No such thing', 'Only green bonds'], PHD: ['Economic value of natural ecosystems', 'Only human-made capital', 'No value in nature', 'Only financial capital'] }, correctIndex: 0, explanation: { ELEMENTARY: 'People work fishing, farming fish, taking tourists on boats, and many other water jobs!', MIDDLE_SCHOOL: 'Blue economy is sustainable economic activity based on oceans, coasts, and freshwater.', HIGH_SCHOOL: 'Sustainable fishing catches fish at rates allowing populations to reproduce and recover.', UNDERGRADUATE: 'Marine spatial planning coordinates ocean uses to minimize conflicts and protect ecosystems.', GRADUATE: 'Blue bonds raise capital specifically for ocean-related sustainability projects.', PHD: 'Natural capital is the stock of natural resources providing valuable ecosystem services.' } }] },
    externalResources: [{ title: 'Blue Economy', url: 'https://www.worldbank.org/en/programs/problue', type: 'research' }]
  },
  {
    id: 'water-innovation',
    slug: 'water-technology-innovation',
    title: 'Water Technology Innovation',
    description: {
      ELEMENTARY: 'Learn about cool new inventions that help save and clean water!',
      MIDDLE_SCHOOL: 'Discover new technologies making water management smarter.',
      HIGH_SCHOOL: 'Explore water tech innovation: smart sensors, AI, and advanced treatment.',
      UNDERGRADUATE: 'Analyze water technology trends, startups, and commercialization pathways.',
      GRADUATE: 'Examine water innovation policy, technology transfer, and scaling strategies.',
      PHD: 'Research emerging technologies, adoption barriers, and innovation systems.'
    },
    topic: 'water-systems',
    category: 'TECHNOLOGY',
    icon: 'Lightbulb',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-innov-1', title: 'New Water Tech', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Cool Water Gadgets!</h2><p>Scientists invent new ways to find water, clean it, and make sure we dont waste any!</p>', MIDDLE_SCHOOL: '<h2>Smart Water</h2><p>Sensors, apps, and smart meters help track and manage water more efficiently.</p>', HIGH_SCHOOL: '<h2>Emerging Technologies</h2><p>AI for leak detection, membrane filtration, atmospheric water generation, and more.</p>', UNDERGRADUATE: '<h2>Innovation Ecosystem</h2><p>Water startups, accelerators, and paths from research to commercialization.</p>', GRADUATE: '<h2>Technology Transfer</h2><p>Moving innovations from lab to market and scaling successful technologies.</p>', PHD: '<h2>Research Frontiers</h2><p>Nanotechnology, bio-inspired materials, and adoption of water innovations.</p>' } }],
    activities: [{ id: 'ws-innov-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Invent Water Tech!', MIDDLE_SCHOOL: 'Smart Water', HIGH_SCHOOL: 'Tech Assessment', UNDERGRADUATE: 'Startup Analysis', GRADUATE: 'Transfer Strategy', PHD: 'Innovation Research' }, description: { ELEMENTARY: 'Create water inventions!', MIDDLE_SCHOOL: 'Design smart water systems.', HIGH_SCHOOL: 'Assess water technologies.', UNDERGRADUATE: 'Analyze water startups.', GRADUATE: 'Design transfer strategies.', PHD: 'Research water innovation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-innov-game', type: 'simulation', title: 'Water Innovator', description: 'Invent solutions to water challenges!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-innov-quiz', passingScore: 80, questions: [{ id: 'winnovq1', question: { ELEMENTARY: 'What do water sensors do?', MIDDLE_SCHOOL: 'What is a smart meter?', HIGH_SCHOOL: 'What is atmospheric water generation?', UNDERGRADUATE: 'What is a water accelerator?', GRADUATE: 'What is technology transfer?', PHD: 'What are bio-inspired materials?' }, options: { ELEMENTARY: ['Tell us about water - how much, how clean', 'Nothing useful', 'Make water', 'Sense fish'], MIDDLE_SCHOOL: ['Meter that tracks water use and sends data', 'Intelligent meter', 'Regular meter', 'No such thing'], HIGH_SCHOOL: ['Making water from air moisture', 'Weather prediction', 'Atmosphere study', 'No such technology'], UNDERGRADUATE: ['Program helping water startups grow', 'Faster water', 'No such thing', 'Water speed'], GRADUATE: ['Moving technology from research to practice', 'Moving water', 'No transfer', 'Only information'], PHD: ['Materials designed by copying nature', 'Only natural materials', 'No inspiration', 'Biological materials only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Water sensors tell us how much water we have, how clean it is, and where its going!', MIDDLE_SCHOOL: 'Smart meters measure water use in real time and send data for analysis and billing.', HIGH_SCHOOL: 'Atmospheric water generators extract water from humid air, creating freshwater.', UNDERGRADUATE: 'Water accelerators are programs that mentor and fund early-stage water technology companies.', GRADUATE: 'Technology transfer moves research innovations into commercial products and widespread use.', PHD: 'Bio-inspired materials mimic natural structures like lotus leaves or desert beetle shells for water applications.' } }] },
    externalResources: [{ title: 'Water Innovation', url: 'https://www.iwahq.org/', type: 'research' }]
  },
  {
    id: 'water-future',
    slug: 'water-future-masterclass',
    title: 'Water Future: Masterclass',
    description: {
      ELEMENTARY: 'Imagine what water will be like when you grow up!',
      MIDDLE_SCHOOL: 'Explore what the future of water might look like.',
      HIGH_SCHOOL: 'Examine water futures, scenarios, and pathways to water security.',
      UNDERGRADUATE: 'Analyze water scenarios, emerging challenges, and transformation pathways.',
      GRADUATE: 'Examine water foresight, governance innovation, and systemic change.',
      PHD: 'Research water transformation, scenario methodology, and long-term water futures.'
    },
    topic: 'water-systems',
    category: 'FUTURES',
    icon: 'Rocket',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: true,
    lessons: [{ id: 'ws-future-1', title: 'Water Tomorrow', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Future Water!</h2><p>In the future, we might get water from new places and keep our rivers and oceans healthier!</p>', MIDDLE_SCHOOL: '<h2>Water Futures</h2><p>Population growth, climate change, and technology will shape how we use and share water.</p>', HIGH_SCHOOL: '<h2>Scenarios</h2><p>Different futures are possible depending on choices we make about water management today.</p>', UNDERGRADUATE: '<h2>Transformation Pathways</h2><p>Fundamental changes in water governance, technology, and behavior needed for water security.</p>', GRADUATE: '<h2>Governance Innovation</h2><p>New institutions, participation models, and adaptive approaches for water management.</p>', PHD: '<h2>Research Frontiers</h2><p>Long-term water scenarios, transformation theory, and shaping water futures.</p>' } }],
    activities: [{ id: 'ws-future-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Dream Water Future!', MIDDLE_SCHOOL: 'Scenario Explorer', HIGH_SCHOOL: 'Pathway Analysis', UNDERGRADUATE: 'Transformation Plan', GRADUATE: 'Governance Design', PHD: 'Futures Research' }, description: { ELEMENTARY: 'Imagine the water future!', MIDDLE_SCHOOL: 'Explore water scenarios.', HIGH_SCHOOL: 'Analyze transformation pathways.', UNDERGRADUATE: 'Plan water transformation.', GRADUATE: 'Design future governance.', PHD: 'Research water futures.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'ws-future-game', type: 'simulation', title: 'Water Futurist', description: 'Shape the water future!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-future-quiz', passingScore: 80, questions: [{ id: 'wfutureq1', question: { ELEMENTARY: 'What might water be like in the future?', MIDDLE_SCHOOL: 'What shapes water futures?', HIGH_SCHOOL: 'What is a water scenario?', UNDERGRADUATE: 'What is water transformation?', GRADUATE: 'What is adaptive governance?', PHD: 'What is water foresight?' }, options: { ELEMENTARY: ['We might get it from new places and keep it cleaner!', 'Same as today', 'No more water', 'Only bad changes'], MIDDLE_SCHOOL: ['Population, climate, and technology', 'Nothing changes', 'Only weather', 'Only politics'], HIGH_SCHOOL: ['A possible future story about water', 'Guaranteed prediction', 'Movie scene', 'No such thing'], UNDERGRADUATE: ['Fundamental change in how we manage water', 'Small adjustments', 'No change possible', 'Only technology'], GRADUATE: ['Flexible governance that learns and adjusts', 'Fixed rules only', 'No governance', 'Random changes'], PHD: ['Methods to explore and shape water futures', 'Predicting the future', 'No foresight possible', 'Only history'] }, correctIndex: 0, explanation: { ELEMENTARY: 'In the future, we might get water from new sources and keep our rivers and oceans much cleaner!', MIDDLE_SCHOOL: 'Population growth, climate change, and new technology will shape how we use water.', HIGH_SCHOOL: 'A water scenario is a plausible story about how water systems might develop in the future.', UNDERGRADUATE: 'Water transformation involves fundamental changes in institutions, technology, and behavior.', GRADUATE: 'Adaptive governance uses flexible approaches that learn from experience and adjust over time.', PHD: 'Water foresight uses scenarios and other methods to explore and intentionally shape water futures.' } }] },
    externalResources: [{ title: 'Water Futures', url: 'https://www.worldwatercouncil.org/', type: 'research' }]
  }
]
