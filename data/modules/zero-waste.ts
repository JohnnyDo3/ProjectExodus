// Zero Waste Living Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const zeroWasteModules: Module[] = [
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
          ELEMENTARY: `<div class="lesson-content">
<h2>The Amazing Banana Peel Adventure</h2>

<p>Bella Banana Peel was feeling sad. Her family had finished eating the banana, and now she was being thrown away!</p>

<p>"Is this the end for me?" Bella wondered. But then she landed somewhere special—a compost bin!</p>

<div class="image-placeholder" data-caption="Bella the banana peel landing in a compost bin">
[Image: A friendly cartoon banana peel falling into a compost bin surrounded by happy decomposers]
</div>

<h3>Welcome to the Compost Party!</h3>

<p>"Hello, new friend!" said a tiny bacteria named Barry. "You're not garbage—you're going to become something amazing!"</p>

<p>Bella met all kinds of new friends in the compost:</p>
<ul>
<li><strong>Barry Bacteria</strong> — billions of tiny helpers eating food scraps</li>
<li><strong>Freddy Fungus</strong> — fuzzy friends breaking down tough stuff</li>
<li><strong>Wally Worm</strong> — wiggling through and mixing everything up</li>
<li><strong>Betty Beetle</strong> — chomping on big pieces</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="zw-elem-q1">
<p>"In nature, nothing is wasted. Everything that was once alive becomes food for new life!"</p>
<cite>— Planet Earth Recycling Team</cite>
</blockquote>

<h3>What Can Join the Compost Party?</h3>

<table class="yes-no-table">
<tr><th>YES! Welcome!</th><th>NO! Stay Out!</th></tr>
<tr><td>Fruit and veggie scraps</td><td>Meat and bones</td></tr>
<tr><td>Eggshells</td><td>Cheese and dairy</td></tr>
<tr><td>Leaves and grass</td><td>Cooking oils</td></tr>
<tr><td>Coffee grounds</td><td>Pet waste</td></tr>
<tr><td>Paper and cardboard</td><td>Plastic and metal</td></tr>
</table>

<div class="image-placeholder" data-caption="What goes in compost vs. trash">
[Image: Colorful illustration showing items sorted into compost-friendly and not compost-friendly categories]
</div>

<h3>Bella's Transformation</h3>

<p>Weeks passed. Bella and her friends worked together, getting smaller and smaller. One day, she couldn't recognize herself anymore—she had become beautiful, dark, rich soil!</p>

<blockquote class="scavenger-quote" data-quote-id="zw-elem-q2">
<p>"Compost is like magic! Throw in scraps, wait a while, and out comes food for plants!"</p>
<cite>— Kids Composting Club</cite>
</blockquote>

<p>A gardener scooped up the compost and spread it on a garden. Soon, new banana plants were growing!</p>

<p>"I'm part of a new banana now!" Bella cheered. "The circle continues!"</p>

<div class="key-concept">
<h4>Remember!</h4>
<p>Composting turns food scraps into plant food. It's nature's way of recycling!</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>The Science of Rot: How Composting Really Works</h2>

<p>Every year, Americans throw away about 40 million tons of food. But here's the thing—food isn't really "waste." It's packed with nutrients that can feed new plants. Composting is how we unlock those nutrients.</p>

<div class="image-placeholder" data-caption="The scale of food waste in America">
[Image: Infographic showing food waste statistics with comparison visuals]
</div>

<h3>The Decomposition Dream Team</h3>

<p>Composting isn't magic—it's biology! Billions of tiny organisms work together to break down organic matter:</p>

<blockquote class="scavenger-quote" data-quote-id="zw-mid-q1">
<p>"A single gram of compost can contain over a billion bacteria, 100,000 protozoa, and thousands of feet of fungal threads—all working to recycle nutrients."</p>
<cite>— US Composting Council</cite>
</blockquote>

<h3>The Four Essential Ingredients</h3>

<table class="ingredient-table">
<tr><th>Ingredient</th><th>Purpose</th><th>Examples</th></tr>
<tr><td>Greens (Nitrogen)</td><td>Fuel for microbes, building proteins</td><td>Food scraps, grass, coffee</td></tr>
<tr><td>Browns (Carbon)</td><td>Energy source, creates air pockets</td><td>Leaves, cardboard, straw</td></tr>
<tr><td>Water</td><td>Microbes need moisture to live</td><td>Rain, hose, wet materials</td></tr>
<tr><td>Air (Oxygen)</td><td>Aerobic decomposition needs O2</td><td>Turning, pipe systems</td></tr>
</table>

<h3>The Golden Ratio</h3>

<p>The secret to good compost is balance:</p>

<blockquote class="scavenger-quote" data-quote-id="zw-mid-q2">
<p>"Think of browns as the bread and greens as the filling. You want about 3 parts brown to 1 part green—like a really boring sandwich that microbes love!"</p>
<cite>— Master Composter Training Program</cite>
</blockquote>

<div class="image-placeholder" data-caption="The brown-to-green ratio visualized">
[Image: Visual showing 3:1 ratio of browns to greens with example materials]
</div>

<h3>What's Happening Inside the Pile?</h3>

<ol>
<li><strong>Day 1-7:</strong> Bacteria start breaking down easy stuff, pile heats up</li>
<li><strong>Week 2-4:</strong> Temperature rises to 140°F+ killing weed seeds and pathogens</li>
<li><strong>Month 2-3:</strong> Fungi take over, breaking down tough materials</li>
<li><strong>Month 3-6:</strong> Cooling and curing, becoming stable compost</li>
</ol>

<h3>Troubleshooting Common Problems</h3>

<ul>
<li><strong>Smells bad?</strong> Too wet or too many greens—add dry browns and turn</li>
<li><strong>Not heating up?</strong> Too dry or too many browns—add water and greens</li>
<li><strong>Attracting pests?</strong> Bury food scraps deep, avoid meat/dairy</li>
</ul>

<div class="key-concept">
<h4>Key Takeaway</h4>
<p>Composting is controlled decomposition. Balance greens and browns, keep it moist, and let billions of microorganisms do the work of turning waste into garden gold.</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Composting Chemistry: The Science of Controlled Decomposition</h2>

<p>Composting has been practiced for thousands of years, but it wasn't until the 20th century that scientists understood the chemistry behind it. Sir Albert Howard, often called the father of modern composting, developed scientific methods in India in the 1930s that are still used today.</p>

<div class="image-placeholder" data-caption="Sir Albert Howard's Indore composting method">
[Image: Historical diagram of Howard's layered composting system alongside modern equivalent]
</div>

<h3>The C:N Ratio: The Master Variable</h3>

<p>The single most important factor in composting is the carbon-to-nitrogen ratio (C:N). This ratio determines how fast decomposition occurs and what problems might arise.</p>

<blockquote class="scavenger-quote" data-quote-id="zw-high-q1">
<p>"Microorganisms need about 25-30 parts carbon for every part nitrogen. Carbon provides energy; nitrogen builds proteins. Get this ratio wrong, and your compost either stalls or smells terrible."</p>
<cite>— Cornell Waste Management Institute</cite>
</blockquote>

<table class="cn-ratio-table">
<thead>
<tr><th>Material</th><th>C:N Ratio</th><th>Category</th></tr>
</thead>
<tbody>
<tr><td>Food scraps</td><td>15:1</td><td>High N (green)</td></tr>
<tr><td>Fresh grass</td><td>20:1</td><td>High N (green)</td></tr>
<tr><td>Coffee grounds</td><td>20:1</td><td>High N (green)</td></tr>
<tr><td>Dry leaves</td><td>50:1</td><td>High C (brown)</td></tr>
<tr><td>Straw</td><td>80:1</td><td>High C (brown)</td></tr>
<tr><td>Cardboard</td><td>350:1</td><td>Very high C</td></tr>
<tr><td>Wood chips</td><td>400:1</td><td>Very high C</td></tr>
</tbody>
</table>

<h3>Temperature Phases of Composting</h3>

<p>A well-managed compost pile goes through distinct temperature phases:</p>

<ol>
<li><strong>Mesophilic Phase (20-40°C / 68-104°F):</strong> Initial colonization by bacteria, 1-3 days</li>
<li><strong>Thermophilic Phase (40-70°C / 104-158°F):</strong> Rapid decomposition, pathogen and weed seed destruction, 1-4 weeks</li>
<li><strong>Cooling Phase:</strong> Activity slows, fungi become more active</li>
<li><strong>Curing Phase:</strong> Stabilization, development of humic substances, 1-3 months</li>
</ol>

<blockquote class="scavenger-quote" data-quote-id="zw-high-q2">
<p>"The thermophilic phase is critical for sanitation. At 55°C (131°F) for three days, most human pathogens, plant diseases, and weed seeds are destroyed. This is why temperature monitoring matters."</p>
<cite>— EPA Composting Guidelines</cite>
</blockquote>

<div class="image-placeholder" data-caption="Temperature profile of active composting">
[Image: Graph showing temperature changes through composting phases over 8-12 weeks]
</div>

<h3>Aerobic vs. Anaerobic Decomposition</h3>

<table class="comparison-table">
<thead>
<tr><th>Factor</th><th>Aerobic (with O2)</th><th>Anaerobic (without O2)</th></tr>
</thead>
<tbody>
<tr><td>Speed</td><td>Faster</td><td>Slower</td></tr>
<tr><td>Odor</td><td>Earthy, minimal</td><td>Foul, sulfurous</td></tr>
<tr><td>Temperature</td><td>High (thermophilic)</td><td>Lower</td></tr>
<tr><td>End products</td><td>CO2, water, humus</td><td>Methane, organic acids</td></tr>
<tr><td>Best for</td><td>Traditional composting</td><td>Biogas production</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="zw-high-q3">
<p>"Turning your compost isn't about mixing—it's about introducing oxygen. Without oxygen, anaerobic bacteria take over, producing methane and hydrogen sulfide. That's why bad compost smells like rotten eggs."</p>
<cite>— BioCycle Journal</cite>
</blockquote>

<div class="key-concept">
<h4>Critical Thinking</h4>
<p>Composting is applied microbiology and chemistry. Understanding C:N ratios, temperature phases, and oxygen requirements allows you to troubleshoot problems and optimize the process for any scale.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Composting Systems: Engineering Organic Waste Processing</h2>

<p>Organic waste represents approximately 30% of the municipal solid waste stream in developed countries. Diverting this material from landfills through composting reduces methane emissions, produces valuable soil amendments, and closes nutrient loops. Understanding composting system design requires integrating biology, engineering, and economics.</p>

<h3>System Selection Framework</h3>

<blockquote class="scavenger-quote" data-quote-id="zw-undergrad-q1">
<p>"There is no single 'best' composting system. Optimal design depends on feedstock characteristics, throughput requirements, available land, capital constraints, and end-product markets. Technology selection requires systematic analysis."</p>
<cite>— Solid Waste Association of North America (SWANA)</cite>
</blockquote>

<table class="system-comparison-table">
<thead>
<tr><th>System</th><th>Scale</th><th>Capital Cost</th><th>Land Needs</th><th>Process Time</th></tr>
</thead>
<tbody>
<tr><td>Windrow</td><td>Medium-Large</td><td>Low</td><td>High</td><td>3-6 months</td></tr>
<tr><td>Aerated Static Pile</td><td>Medium-Large</td><td>Medium</td><td>Medium</td><td>2-4 months</td></tr>
<tr><td>In-Vessel</td><td>Any</td><td>High</td><td>Low</td><td>1-3 months</td></tr>
<tr><td>Vermicomposting</td><td>Small-Medium</td><td>Low-Medium</td><td>Low</td><td>2-4 months</td></tr>
</tbody>
</table>

<div class="image-placeholder" data-caption="Comparison of composting system designs">
[Image: Technical diagrams of windrow, ASP, and in-vessel systems with key components labeled]
</div>

<h3>Process Engineering Parameters</h3>

<h4>Critical Control Points:</h4>
<ul>
<li><strong>Moisture content:</strong> 50-60% optimal; below 40% microbes inactive, above 65% anaerobic</li>
<li><strong>Oxygen concentration:</strong> >5% in pile interstitial air for aerobic conditions</li>
<li><strong>Temperature:</strong> 55-65°C for PFRP (Process to Further Reduce Pathogens) compliance</li>
<li><strong>Particle size:</strong> 1-3 inches optimal; smaller increases surface area, larger improves porosity</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="zw-undergrad-q2">
<p>"The 'squeeze test' for moisture—material should feel like a wrung-out sponge, releasing only a few drops when squeezed hard—remains surprisingly effective even compared to laboratory methods."</p>
<cite>— On-Farm Composting Handbook, NRAES</cite>
</blockquote>

<h3>Regulatory Framework</h3>

<p>Composting operations must comply with various regulations:</p>

<ul>
<li><strong>EPA 40 CFR Part 503:</strong> Biosolids composting standards</li>
<li><strong>State solid waste regulations:</strong> Permitting, setbacks, operating requirements</li>
<li><strong>Air quality permits:</strong> VOC, odor, and dust controls</li>
<li><strong>Water quality permits:</strong> Stormwater and leachate management</li>
</ul>

<h4>Class A Compost Requirements (Unrestricted Use):</h4>
<ul>
<li>Fecal coliform: <1000 MPN/g dry weight</li>
<li>Salmonella: <3 MPN/4g dry weight</li>
<li>Either: 55°C for 15 days with 5 turnings, OR enclosed system at 55°C for 3 days</li>
</ul>

<div class="image-placeholder" data-caption="Composting facility regulatory compliance flowchart">
[Image: Decision flowchart showing regulatory pathways and compliance requirements]
</div>

<blockquote class="scavenger-quote" data-quote-id="zw-undergrad-q3">
<p>"Contamination—plastics, glass, metals—is the Achilles heel of compost quality. Source separation is far more cost-effective than post-processing contamination removal."</p>
<cite>— Institute for Local Self-Reliance</cite>
</blockquote>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Composting facility design requires balancing biological process requirements with practical constraints of land, capital, labor, and markets. The most elegant engineering often involves the simplest systems that reliably achieve process objectives.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Industrial Organic Processing: Technologies, Emissions, and Circular Bioeconomy</h2>

<p>Graduate-level analysis of organic waste processing extends beyond composting to examine the full spectrum of technologies, their environmental implications, and integration within circular economy frameworks.</p>

<h3>Technology Spectrum</h3>

<blockquote class="scavenger-quote" data-quote-id="zw-grad-q1">
<p>"The choice between composting, anaerobic digestion, and other organic processing technologies should be based on life cycle assessment, not ideology. Each has appropriate applications depending on feedstock, energy context, and end-product needs."</p>
<cite>— Journal of Cleaner Production</cite>
</blockquote>

<table class="technology-table">
<thead>
<tr><th>Technology</th><th>Primary Output</th><th>Energy Balance</th><th>Best Feedstocks</th></tr>
</thead>
<tbody>
<tr><td>Aerobic Composting</td><td>Soil amendment</td><td>Net consumer</td><td>Yard waste, wood, mixed organics</td></tr>
<tr><td>Anaerobic Digestion</td><td>Biogas + digestate</td><td>Net producer</td><td>Food waste, manure, wastewater solids</td></tr>
<tr><td>Vermicomposting</td><td>High-value castings</td><td>Net consumer</td><td>Pre-consumer food, paper</td></tr>
<tr><td>Black Soldier Fly</td><td>Protein + frass</td><td>Variable</td><td>Food waste, manure</td></tr>
</tbody>
</table>

<div class="image-placeholder" data-caption="Organic waste processing technology comparison">
[Image: System diagram showing inputs, processes, and outputs for each technology]
</div>

<h3>Greenhouse Gas Implications</h3>

<h4>Emissions Sources and Mitigation:</h4>
<ul>
<li><strong>Methane (CH4):</strong> Anaerobic pockets in compost; mitigated by adequate aeration</li>
<li><strong>Nitrous oxide (N2O):</strong> Nitrogen cycling; increases at high temperatures and moisture</li>
<li><strong>Ammonia (NH3):</strong> Nitrogen volatilization; managed through C:N ratio and pH</li>
<li><strong>VOCs:</strong> Odorous compounds; biofilters and covers for control</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="zw-grad-q2">
<p>"Well-managed aerobic composting avoids the methane emissions of landfilling, but poorly managed composting can be a significant GHG source. Process control matters enormously for climate outcomes."</p>
<cite>— IPCC Guidelines for National Greenhouse Gas Inventories</cite>
</blockquote>

<h3>Circular Bioeconomy Integration</h3>

<p>Organic processing within broader material cycles:</p>

<ul>
<li><strong>Nutrient recovery:</strong> Phosphorus and nitrogen returned to agriculture</li>
<li><strong>Carbon sequestration:</strong> Stable carbon in soil from compost application</li>
<li><strong>Energy systems:</strong> Biogas as renewable natural gas or electricity</li>
<li><strong>Product cascading:</strong> Sequential value extraction (protein → energy → nutrients)</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="zw-grad-q3">
<p>"The circular bioeconomy reframes 'waste' as misplaced resources. Organic materials cycle through use, processing, and return to biological systems—but the design of these cycles determines whether they're sustainable."</p>
<cite>— Ellen MacArthur Foundation</cite>
</blockquote>

<div class="image-placeholder" data-caption="Circular bioeconomy flows for organic materials">
[Image: Circular flow diagram showing organic materials moving through production, consumption, processing, and return to land]
</div>

<h3>Policy and Market Drivers</h3>

<ul>
<li><strong>Landfill bans:</strong> Increasingly common for organic waste</li>
<li><strong>Mandatory collection:</strong> California SB 1383, EU requirements</li>
<li><strong>Carbon markets:</strong> Emerging credits for composting and soil carbon</li>
<li><strong>Extended producer responsibility:</strong> Food industry responsibilities</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="zw-grad-q4">
<p>"California's SB 1383 mandates 75% organic waste diversion by 2025. This single policy is driving more investment in composting and digestion infrastructure than any market force."</p>
<cite>— CalRecycle</cite>
</blockquote>

<div class="key-concept">
<h4>Research Directions</h4>
<p>Graduate research in organic processing increasingly focuses on systems integration—how processing technologies fit within broader material and energy systems, how policy can drive circular outcomes, and how to quantify environmental benefits across full life cycles.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Organic Waste Processing: Microbial Ecology, Emissions Science, and Novel Technologies</h2>

<p>Doctoral engagement with organic waste processing spans microbial ecology, atmospheric chemistry, process engineering, and sustainability science. This lesson examines research frontiers across these interconnected domains.</p>

<h3>Microbial Ecology of Decomposition</h3>

<blockquote class="scavenger-quote" data-quote-id="zw-phd-q1">
<p>"Composting microbial communities undergo dramatic succession—from mesophilic bacteria to thermophilic specialists to fungal-dominated cooling phases. Understanding these dynamics enables process optimization and product engineering."</p>
<cite>— Applied and Environmental Microbiology</cite>
</blockquote>

<h4>Research Frontiers:</h4>
<ul>
<li><strong>Functional metagenomics:</strong> Linking community composition to process function</li>
<li><strong>Thermophilic enzymology:</strong> Heat-stable enzymes for industrial applications</li>
<li><strong>Inoculant development:</strong> Designed communities for specific outcomes</li>
<li><strong>Suppressive composts:</strong> Disease-preventing microbial communities</li>
</ul>

<div class="image-placeholder" data-caption="Microbial succession during composting">
[Image: Temporal diagram showing microbial community shifts through composting phases with key functional groups highlighted]
</div>

<h3>Emissions Quantification and Modeling</h3>

<h4>Methodological Challenges:</h4>
<table class="methods-table">
<thead>
<tr><th>Method</th><th>Advantages</th><th>Limitations</th></tr>
</thead>
<tbody>
<tr><td>Static chambers</td><td>Simple, inexpensive</td><td>Point measurements, disturbance</td></tr>
<tr><td>Dynamic chambers</td><td>Continuous, controlled</td><td>Artificial conditions</td></tr>
<tr><td>Mass balance</td><td>Integrated assessment</td><td>Requires complete accounting</td></tr>
<tr><td>Micrometeorological</td><td>Non-intrusive, spatial integration</td><td>Complex, expensive, site requirements</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="zw-phd-q2">
<p>"Emission factors for composting vary by orders of magnitude in the literature—from 0.1 to 10 kg CH4 per ton processed. This uncertainty reflects both methodological differences and genuine process variability. Improving emission inventories requires standardized protocols."</p>
<cite>— Waste Management</cite>
</blockquote>

<h4>Process-Based Modeling:</h4>
<ul>
<li>Heat and mass transfer models</li>
<li>Kinetic models of decomposition</li>
<li>Coupled C and N cycling</li>
<li>Integration with atmospheric transport</li>
</ul>

<h3>Novel Processing Technologies</h3>

<blockquote class="scavenger-quote" data-quote-id="zw-phd-q3">
<p>"Insect-mediated bioconversion—particularly Black Soldier Fly larvae—represents a paradigm shift in organic processing. Unlike microbial composting, insect systems produce protein suitable for animal feed while generating processing residue comparable to compost."</p>
<cite>— Annual Review of Entomology</cite>
</blockquote>

<h4>Emerging Technologies:</h4>
<ul>
<li><strong>Hydrothermal carbonization:</strong> Pressure + heat → hydrochar (biocoal)</li>
<li><strong>Pyrolysis:</strong> Anaerobic heating → biochar + bio-oil + syngas</li>
<li><strong>Torrefaction:</strong> Low-temperature thermal treatment</li>
<li><strong>Enzymatic processing:</strong> Targeted decomposition of specific materials</li>
</ul>

<div class="image-placeholder" data-caption="Novel organic processing technologies comparison">
[Image: Process flow diagrams for BSF, HTC, pyrolysis, and enzymatic systems]
</div>

<h3>Life Cycle Assessment Considerations</h3>

<blockquote class="scavenger-quote" data-quote-id="zw-phd-q4">
<p>"LCA of organic waste processing must consider displaced impacts—what would have happened to the waste otherwise, and what products the process outputs displace. A composting system that produces soil amendment displacing synthetic fertilizer has different impacts than one serving disposal functions only."</p>
<cite>— International Journal of Life Cycle Assessment</cite>
</blockquote>

<h4>Methodological Issues:</h4>
<ul>
<li>System boundary definition</li>
<li>Allocation procedures for multi-output processes</li>
<li>Consequential vs. attributional approaches</li>
<li>Carbon accounting and biogenic CO2</li>
<li>Soil carbon dynamics and permanence</li>
</ul>

<div class="key-concept">
<h4>Doctoral Research Orientation</h4>
<p>Impactful doctoral research in organic waste processing bridges scales—from molecular mechanisms to facility operations to societal material flows. The field demands integration of microbiology, engineering, and sustainability assessment, with an eye toward both fundamental understanding and practical application in the urgent context of climate change and resource scarcity.</p>
</div>
</div>`
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
      },
      {
        id: 'compost-lesson-3',
        title: 'Using Your Finished Compost',
        order: 3,
        duration: 15,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>Garden Treasure Time!</h2>

<p>Remember how Bella the banana peel turned into dark, yummy soil? Now it is time to use that wonderful compost to help plants grow big and strong!</p>

<h3>How Do You Know Compost is Ready?</h3>
<p>Finished compost looks and smells like this:</p>
<ul>
<li>Dark brown or black color like chocolate cake</li>
<li>Smells like a forest after rain (earthy and nice!)</li>
<li>Crumbly like cookie crumbs</li>
<li>You cannot see the original food anymore</li>
</ul>

<h3>Ways to Use Your Garden Gold</h3>

<h4>Feed Your Garden</h4>
<p>Spread compost around your plants like a cozy blanket:</p>
<ul>
<li>Put 1-2 inches around vegetables</li>
<li>Circle it around trees (not touching the trunk!)</li>
<li>Mix it into flower beds</li>
</ul>

<h4>Start New Plants</h4>
<p>Mix compost with regular soil when planting seeds:</p>
<ul>
<li>Fill pots with half compost, half soil</li>
<li>Seeds love the nutrients!</li>
<li>Plants grow faster and healthier</li>
</ul>

<h4>Feed the Lawn</h4>
<p>Sprinkle compost on grass in spring or fall:</p>
<ul>
<li>Use a thin layer (about half an inch)</li>
<li>Rain will wash it down to the roots</li>
<li>Your grass will be greener!</li>
</ul>

<h3>The Circle of Life</h3>
<p>When you use compost, you complete the cycle:</p>
<ol>
<li>Plants grow using nutrients from the soil</li>
<li>We eat the plants (yum!)</li>
<li>Food scraps go to compost</li>
<li>Compost returns nutrients to the soil</li>
<li>New plants grow... and it starts again!</li>
</ol>

<div class="key-concept">
<h4>You Are a Planet Helper!</h4>
<p>Every time you compost, you are reducing trash and making plants happy. That makes YOU a superhero for Earth!</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Harvesting and Applying Compost</h2>

<p>You have put in the work—balancing greens and browns, keeping it moist, turning the pile. Now comes the reward: using your finished compost to supercharge your garden!</p>

<h3>Is Your Compost Ready?</h3>

<h4>Signs of Finished Compost:</h4>
<ul>
<li><strong>Appearance:</strong> Dark brown to black, uniform texture</li>
<li><strong>Smell:</strong> Pleasant, earthy aroma (like forest floor)</li>
<li><strong>Temperature:</strong> Near ambient (not hot anymore)</li>
<li><strong>Texture:</strong> Crumbly, original materials unrecognizable</li>
</ul>

<h4>Simple Tests:</h4>
<ul>
<li><strong>Bag test:</strong> Seal compost in plastic bag for 3 days—no bad smell means it is ready</li>
<li><strong>Seed test:</strong> Plant seeds in compost—if they sprout normally, it is mature</li>
</ul>

<h3>Application Methods</h3>

<table>
<tr><th>Method</th><th>How To</th><th>Best For</th></tr>
<tr><td>Top dressing</td><td>Spread 1-3 inches on surface</td><td>Established beds, trees</td></tr>
<tr><td>Soil amendment</td><td>Mix into top 6-12 inches</td><td>New beds, poor soil</td></tr>
<tr><td>Potting mix</td><td>Combine with perlite, peat</td><td>Containers, seedlings</td></tr>
<tr><td>Lawn topdressing</td><td>Spread quarter inch, rake in</td><td>Improving lawn health</td></tr>
<tr><td>Compost tea</td><td>Steep in water, apply as spray</td><td>Quick nutrient boost</td></tr>
</table>

<h3>Benefits of Compost in Soil</h3>

<ul>
<li><strong>Improves soil structure:</strong> Better drainage in clay, more retention in sand</li>
<li><strong>Adds nutrients:</strong> Slow-release nitrogen, phosphorus, potassium</li>
<li><strong>Feeds soil life:</strong> Bacteria, fungi, worms all thrive</li>
<li><strong>Holds water:</strong> Reduces watering needs</li>
<li><strong>Suppresses disease:</strong> Healthy soil fights plant pathogens</li>
</ul>

<h3>How Much to Apply</h3>

<ul>
<li><strong>Vegetable gardens:</strong> 2-4 inches annually, worked into soil</li>
<li><strong>Perennial beds:</strong> 1-2 inches as mulch yearly</li>
<li><strong>Trees and shrubs:</strong> 2-3 inches under canopy, away from trunk</li>
<li><strong>Lawns:</strong> Quarter to half inch, sifted fine</li>
<li><strong>Potting mixes:</strong> 20-30 percent compost by volume</li>
</ul>

<div class="key-concept">
<h4>The Payoff</h4>
<p>Quality compost can replace synthetic fertilizers, reduce water needs by 20 percent or more, and build soil that improves year after year. Your trash really does become treasure!</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Compost Quality Assessment and Application Science</h2>

<p>Not all compost is created equal. The quality of finished compost determines its value and appropriate uses. Understanding quality parameters enables optimal application and prevents problems.</p>

<h3>Quality Parameters</h3>

<table>
<thead>
<tr><th>Parameter</th><th>Optimal Range</th><th>Why It Matters</th></tr>
</thead>
<tbody>
<tr><td>pH</td><td>6.0-7.5</td><td>Affects nutrient availability to plants</td></tr>
<tr><td>C:N Ratio</td><td>15:1 to 20:1</td><td>Lower means more available nitrogen</td></tr>
<tr><td>Moisture</td><td>40-50 percent</td><td>Too dry or wet affects handling</td></tr>
<tr><td>Organic Matter</td><td>greater than 50 percent</td><td>The valuable component</td></tr>
<tr><td>Soluble Salts (EC)</td><td>less than 4 dS per m</td><td>High salts damage plants</td></tr>
<tr><td>Maturity (Solvita)</td><td>7-8</td><td>Immature compost harms plants</td></tr>
</tbody>
</table>

<h3>Maturity vs. Stability</h3>

<p>These terms describe different aspects of compost readiness:</p>
<ul>
<li><strong>Stability:</strong> Resistance to further decomposition (measured by respiration rate)</li>
<li><strong>Maturity:</strong> Absence of phytotoxic compounds (tested with plant bioassays)</li>
</ul>

<p>Compost can be stable but immature if high in salts or ammonia. Always test before using on sensitive plants.</p>

<h3>Matching Compost to Use</h3>

<table>
<tr><th>Use</th><th>Quality Requirements</th><th>Application Rate</th></tr>
<tr><td>Potting media</td><td>Mature, low salts, fine texture</td><td>20-40 percent by volume</td></tr>
<tr><td>Vegetable gardens</td><td>Mature, low heavy metals</td><td>1-2 inches per season</td></tr>
<tr><td>Landscaping</td><td>Stable, weed-free</td><td>2-4 inches incorporated</td></tr>
<tr><td>Erosion control</td><td>Stable, coarse texture</td><td>2-6 inches as blanket</td></tr>
<tr><td>Turf topdressing</td><td>Fine screened, mature</td><td>Quarter inch or less</td></tr>
</table>

<h3>Compost Tea</h3>

<p>Compost tea extracts beneficial microorganisms and soluble nutrients:</p>
<ul>
<li><strong>Aerated Compost Tea (ACT):</strong> Brewed with air pumps, maximizes microbial growth</li>
<li><strong>Non-aerated Extract:</strong> Simple steeping, mostly nutrients not microbes</li>
<li><strong>Application:</strong> Foliar spray or soil drench</li>
<li><strong>Caution:</strong> Use within 4-6 hours to prevent pathogen growth</li>
</ul>

<h3>Calculating Application Rates</h3>

<p>To determine how much compost you need:</p>
<ol>
<li>Calculate area in square feet</li>
<li>Determine desired depth in inches</li>
<li>Multiply: (Area x Depth) divided by 324 = cubic yards needed</li>
</ol>

<p>Example: 500 sq ft bed with 2 inch application: (500 x 2) divided by 324 = 3.1 cubic yards</p>

<div class="key-concept">
<h4>Quality Matters</h4>
<p>Immature or contaminated compost can damage plants, introduce pathogens, or add pollutants to soil. Always assess quality before application, especially for food production.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Compost Utilization: Agronomic, Environmental, and Market Considerations</h2>

<p>Compost application science integrates soil physics, plant nutrition, microbial ecology, and market economics. Optimal utilization maximizes value while preventing environmental harm.</p>

<h3>Agronomic Benefits Quantified</h3>

<table>
<thead>
<tr><th>Benefit</th><th>Mechanism</th><th>Magnitude</th></tr>
</thead>
<tbody>
<tr><td>Nutrient supply</td><td>Mineralization of organic N, P, K</td><td>10-50 percent of crop needs</td></tr>
<tr><td>Water retention</td><td>Increased organic matter and aggregation</td><td>Plus 10-20 percent plant available water</td></tr>
<tr><td>Cation exchange capacity</td><td>Humic substances hold nutrients</td><td>Increase of 1-3 meq per 100g</td></tr>
<tr><td>Biological activity</td><td>Food source for soil organisms</td><td>2-5x increase in microbial biomass</td></tr>
<tr><td>Disease suppression</td><td>Competition, antibiosis, induced resistance</td><td>Variable, research-dependent</td></tr>
</tbody>
</table>

<h3>Nutrient Availability and Timing</h3>

<p>Compost nutrients release differently than synthetic fertilizers:</p>
<ul>
<li><strong>First year availability:</strong> 10-25 percent of N, 30-50 percent of P, 50-70 percent of K</li>
<li><strong>Subsequent years:</strong> Cumulative mineralization adds 5-15 percent annually</li>
<li><strong>Nutrient credits:</strong> Account for residual release when planning fertilization</li>
</ul>

<h3>Environmental Considerations</h3>

<h4>Potential Concerns:</h4>
<ul>
<li><strong>Nutrient runoff:</strong> Over-application can contribute to eutrophication</li>
<li><strong>Heavy metals:</strong> Some feedstocks accumulate cadmium, lead, copper</li>
<li><strong>Organic contaminants:</strong> Herbicide carryover (aminopyralids) can damage gardens</li>
<li><strong>Salts:</strong> Excessive application raises soil EC</li>
</ul>

<h4>Best Management Practices:</h4>
<ul>
<li>Soil test before application to determine needs</li>
<li>Match application rate to crop uptake</li>
<li>Maintain buffer zones near water</li>
<li>Source compost from reputable facilities with testing</li>
</ul>

<h3>Market Development</h3>

<h4>Compost Markets by Sector:</h4>
<table>
<tr><th>Sector</th><th>Volume</th><th>Price Sensitivity</th><th>Quality Requirements</th></tr>
<tr><td>Agriculture</td><td>High</td><td>Very price sensitive</td><td>Moderate (nutrients, weed-free)</td></tr>
<tr><td>Landscaping</td><td>Medium</td><td>Moderate</td><td>High (appearance, texture)</td></tr>
<tr><td>Erosion control</td><td>Variable</td><td>Moderate</td><td>Moderate (stability)</td></tr>
<tr><td>Retail/bagged</td><td>Low</td><td>Lowest</td><td>Highest (consistency, appearance)</td></tr>
<tr><td>Remediation</td><td>Variable</td><td>Project-dependent</td><td>Specific to application</td></tr>
</table>

<h3>Economic Analysis</h3>

<p>Value proposition for farmers:</p>
<ul>
<li>Compare compost cost per unit nutrient vs. fertilizer</li>
<li>Account for soil health improvements (reduced irrigation, tillage)</li>
<li>Consider yield increases in degraded soils</li>
<li>Factor in carbon sequestration credits where available</li>
</ul>

<div class="key-concept">
<h4>Market Reality</h4>
<p>Despite proven benefits, compost markets remain underdeveloped. Successful market development requires consistent quality, reliable supply, and education on long-term soil health value.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Compost in Circular Bioeconomy and Soil Carbon Management</h2>

<p>Graduate analysis positions compost within broader frameworks of circular economy, climate mitigation, and sustainable resource management.</p>

<h3>Circular Economy Integration</h3>

<h4>Compost as Nutrient Cycle Closer</h4>
<p>Modern agriculture operates linear nutrient flows: mine or synthesize nutrients, grow crops, consume in cities, discharge to waterways. Composting closes this loop.</p>

<table>
<tr><th>Element</th><th>Linear Loss Pathway</th><th>Composting Recovery</th></tr>
<tr><td>Nitrogen</td><td>Wastewater, landfill emissions</td><td>Captures organic N for soil return</td></tr>
<tr><td>Phosphorus</td><td>Sewage, landfill sequestration</td><td>Returns P to agricultural land</td></tr>
<tr><td>Potassium</td><td>Wastewater discharge</td><td>Recovers K from food waste</td></tr>
<tr><td>Micronutrients</td><td>Various waste streams</td><td>Maintains diverse trace elements</td></tr>
</table>

<h3>Carbon Sequestration Potential</h3>

<p>Compost application affects soil carbon in multiple ways:</p>
<ul>
<li><strong>Direct addition:</strong> Stable organic matter (humus) persists for decades to centuries</li>
<li><strong>Priming effects:</strong> Can accelerate or retard decomposition of native SOM</li>
<li><strong>Aggregation:</strong> Physical protection of carbon in soil aggregates</li>
<li><strong>Microbial necromass:</strong> Dead microbial biomass becomes stable carbon</li>
</ul>

<h4>Quantifying Climate Benefits:</h4>
<p>Net carbon benefit depends on:</p>
<ul>
<li>Alternative fate of organic waste (landfill methane avoided)</li>
<li>Composting process emissions (CO2, N2O, CH4)</li>
<li>Soil carbon storage persistence</li>
<li>Reduced fertilizer production emissions</li>
</ul>

<h3>Policy Frameworks</h3>

<h4>Regulations Affecting Compost Markets:</h4>
<table>
<tr><th>Policy Type</th><th>Examples</th><th>Market Impact</th></tr>
<tr><td>Landfill bans</td><td>State organic waste bans</td><td>Drives feedstock to composting</td></tr>
<tr><td>Procurement mandates</td><td>Government purchase requirements</td><td>Creates guaranteed markets</td></tr>
<tr><td>Carbon markets</td><td>Soil carbon protocols</td><td>Additional revenue stream</td></tr>
<tr><td>Agricultural programs</td><td>USDA EQIP, CSP</td><td>Cost-share for farmers</td></tr>
<tr><td>Product standards</td><td>USCC STA certification</td><td>Quality assurance for buyers</td></tr>
</table>

<h3>System-Level Optimization</h3>

<p>Regional organic waste management optimization considers:</p>
<ul>
<li>Feedstock availability and collection logistics</li>
<li>Processing capacity and technology options</li>
<li>Market demand by sector and quality tier</li>
<li>Transportation distances and costs</li>
<li>Infrastructure investment requirements</li>
</ul>

<div class="key-concept">
<h4>Systems Perspective</h4>
<p>Maximizing compost benefits requires coordinating waste collection, processing, and utilization as an integrated system—connecting urban organic waste to rural soil health needs while creating viable business models.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Compost Science Research Frontiers</h2>

<p>Doctoral research on compost utilization engages fundamental questions in soil science, microbial ecology, and sustainable systems, while addressing practical challenges in scaling compost benefits.</p>

<h3>Soil Carbon Dynamics Research</h3>

<h4>Key Research Questions:</h4>
<ul>
<li>What fraction of compost carbon persists in soil, and for how long?</li>
<li>How do compost additions affect native soil organic matter (priming)?</li>
<li>Can we engineer compost for maximum stable carbon contribution?</li>
<li>How do soil type, climate, and management affect carbon persistence?</li>
</ul>

<h4>Methodological Approaches:</h4>
<table>
<tr><th>Method</th><th>What It Measures</th><th>Limitations</th></tr>
<tr><td>C isotope tracing (13C, 14C)</td><td>Fate of compost-derived carbon</td><td>Expensive, requires isotope-labeled material</td></tr>
<tr><td>Density fractionation</td><td>Carbon in different soil pools</td><td>Does not directly track origin</td></tr>
<tr><td>Molecular markers</td><td>Specific compound persistence</td><td>Limited to traceable molecules</td></tr>
<tr><td>Long-term field trials</td><td>Net carbon change over years</td><td>Slow, expensive, variable</td></tr>
</table>

<h3>Microbiome Engineering</h3>

<p>Emerging research on designing compost microbial communities:</p>
<ul>
<li><strong>Disease suppression:</strong> Identifying and enriching suppressive organisms</li>
<li><strong>Nutrient cycling:</strong> Inoculating with efficient mineralizers</li>
<li><strong>Plant growth promotion:</strong> Including PGPR and mycorrhizae</li>
<li><strong>Challenges:</strong> Survival and establishment in diverse soil environments</li>
</ul>

<h3>Contaminant Research</h3>

<h4>Emerging Contaminants of Concern:</h4>
<ul>
<li><strong>PFAS:</strong> Persistent fluorinated compounds in biosolids and food packaging</li>
<li><strong>Microplastics:</strong> Accumulation from contaminated feedstocks</li>
<li><strong>Antibiotic resistance genes:</strong> Transfer from waste-derived compost</li>
<li><strong>Pharmaceutical residues:</strong> Persistence through composting</li>
</ul>

<h4>Research Needs:</h4>
<ul>
<li>Fate and transport of contaminants through composting</li>
<li>Bioavailability and uptake in crops</li>
<li>Risk assessment frameworks for compost use</li>
<li>Treatment technologies for contaminant reduction</li>
</ul>

<h3>Systems Modeling</h3>

<p>Integrating compost into larger systems requires modeling approaches:</p>
<ul>
<li><strong>Life cycle assessment:</strong> Comparing environmental impacts of organic waste options</li>
<li><strong>Material flow analysis:</strong> Tracking nutrients and carbon through regional systems</li>
<li><strong>Agent-based modeling:</strong> Adoption dynamics among farmers and haulers</li>
<li><strong>Optimization:</strong> Infrastructure siting and capacity planning</li>
</ul>

<h3>Transdisciplinary Integration</h3>

<table>
<tr><th>Discipline</th><th>Research Contribution</th></tr>
<tr><td>Soil science</td><td>Carbon dynamics, soil health indicators</td></tr>
<tr><td>Microbiology</td><td>Community ecology, functional traits</td></tr>
<tr><td>Agronomy</td><td>Crop response, nutrient management</td></tr>
<tr><td>Environmental engineering</td><td>Process optimization, emissions</td></tr>
<tr><td>Economics</td><td>Market development, policy analysis</td></tr>
<tr><td>Sociology</td><td>Adoption barriers, behavior change</td></tr>
</table>

<div class="key-concept">
<h4>Research Orientation</h4>
<p>Impactful doctoral research on compost utilization bridges fundamental science with practical application—understanding microbial ecology and carbon chemistry while addressing real-world barriers to scaling sustainable organic waste management.</p>
</div>
</div>`
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
  },
  // Module 4: Composting
  {
    id: 'zw-composting',
    slug: 'composting-fundamentals',
    title: 'Composting Fundamentals',
    description: {
      ELEMENTARY: 'Learn how food scraps become soil!',
      MIDDLE_SCHOOL: 'Discover the science of turning waste into compost.',
      HIGH_SCHOOL: 'Explore composting methods, carbon-nitrogen ratios, and troubleshooting.',
      UNDERGRADUATE: 'Analyze composting systems, facility design, and end-product quality.',
      GRADUATE: 'Examine municipal composting, policy frameworks, and contamination management.',
      PHD: 'Research microbial dynamics, process optimization, and climate implications.'
    },
    topic: 'zero-waste',
    category: 'COMPOSTING',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-comp-1', title: 'Nature\'s Recyclers', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Magic Dirt!</h2><p>Banana peels, apple cores, and leaves can turn into rich soil for growing plants!</p>', MIDDLE_SCHOOL: '<h2>How Composting Works</h2><p>Microorganisms break down organic matter into humus. Greens (nitrogen) + Browns (carbon) + air + water = compost!</p>', HIGH_SCHOOL: '<h2>Composting Science</h2><p>C:N ratio (25-30:1 ideal), oxygen, moisture, and temperature control. Hot composting vs. cold composting.</p>', UNDERGRADUATE: '<h2>Composting Systems</h2><p>Windrow, aerated static pile, in-vessel, and vermicomposting. Scale, feedstocks, and end-use considerations.</p>', GRADUATE: '<h2>Municipal Programs</h2><p>Collection logistics, processing capacity, contamination, and compost markets.</p>', PHD: '<h2>Research Frontiers</h2><p>Microbial community dynamics, greenhouse gas emissions, and emerging contaminants (PFAS, microplastics).</p>' } }],
    activities: [{ id: 'zw-comp-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Compost Pile!', MIDDLE_SCHOOL: 'Balance the Recipe', HIGH_SCHOOL: 'Troubleshoot Problems', UNDERGRADUATE: 'Design a Facility', GRADUATE: 'Program Planning', PHD: 'Process Optimization' }, description: { ELEMENTARY: 'Layer materials to make compost!', MIDDLE_SCHOOL: 'Balance greens and browns for perfect compost.', HIGH_SCHOOL: 'Diagnose and fix composting problems.', UNDERGRADUATE: 'Design a community composting facility.', GRADUATE: 'Plan a municipal composting program.', PHD: 'Optimize composting for emissions and quality.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-comp-game', type: 'simulation', title: 'Compost Master', description: 'Create perfect compost!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-comp-quiz', passingScore: 80, questions: [{ id: 'zwcq1', question: { ELEMENTARY: 'What breaks down food scraps into compost?', MIDDLE_SCHOOL: 'What ratio of carbon to nitrogen is ideal?', HIGH_SCHOOL: 'What causes a compost pile to smell bad?', UNDERGRADUATE: 'What is vermicomposting?', GRADUATE: 'What is the biggest challenge for municipal composting?', PHD: 'What emerging contaminant concerns exist for compost?' }, options: { ELEMENTARY: ['Tiny living things (microorganisms)', 'Magic', 'Sunlight alone', 'Water alone'], MIDDLE_SCHOOL: ['25-30:1', '1:1', '100:1', '5:1'], HIGH_SCHOOL: ['Too much nitrogen or not enough air', 'Too much carbon', 'Perfect balance', 'Too dry'], UNDERGRADUATE: ['Using worms to make compost', 'Using machines', 'Burning waste', 'Landfilling'], GRADUATE: ['Contamination in feedstocks', 'Too much supply', 'No demand', 'Weather'], PHD: ['PFAS and microplastics', 'Too much nitrogen', 'Good bacteria', 'Moisture'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Microorganisms - tiny living things like bacteria and fungi - break down organic matter!', MIDDLE_SCHOOL: 'A carbon to nitrogen ratio of 25-30:1 provides ideal conditions for composting microbes.', HIGH_SCHOOL: 'Odors usually indicate excess nitrogen (ammonia) or anaerobic conditions (not enough oxygen).', UNDERGRADUATE: 'Vermicomposting uses earthworms to process organic matter into nutrient-rich castings.', GRADUATE: 'Contamination (plastics, glass, non-compostables) is the biggest challenge for municipal programs.', PHD: 'PFAS (forever chemicals) and microplastics in compost feedstocks raise quality and safety concerns.' } }] },
    externalResources: [{ title: 'US Composting Council', url: 'https://www.compostingcouncil.org/', type: 'research' }]
  },
  // Module 5: Recycling Systems
  {
    id: 'zw-recycling',
    slug: 'recycling-systems',
    title: 'Recycling Systems',
    description: {
      ELEMENTARY: 'Learn how to recycle the right way!',
      MIDDLE_SCHOOL: 'Discover what happens to recyclables after collection.',
      HIGH_SCHOOL: 'Explore MRFs, material markets, and recycling challenges.',
      UNDERGRADUATE: 'Analyze recycling economics, contamination, and system design.',
      GRADUATE: 'Examine global recycling markets, policy tools, and circular economy.',
      PHD: 'Research recycling system optimization, material flows, and future scenarios.'
    },
    topic: 'zero-waste',
    category: 'RECYCLING',
    icon: 'Recycle',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-rec-1', title: 'The Recycling Journey', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Recycling Right!</h2><p>When we recycle correctly, bottles become new bottles, paper becomes new paper!</p>', MIDDLE_SCHOOL: '<h2>What Gets Recycled?</h2><p>Paper, cardboard, metal cans, glass, and certain plastics (#1, #2). Check local rules - they vary!</p>', HIGH_SCHOOL: '<h2>Recycling Infrastructure</h2><p>MRFs (Material Recovery Facilities) sort recyclables. Contamination and "wishcycling" cause problems.</p>', UNDERGRADUATE: '<h2>Recycling Economics</h2><p>Commodity markets, processing costs, and the economics of recycled vs. virgin materials.</p>', GRADUATE: '<h2>System Design</h2><p>Single-stream vs. source-separated, EPR, deposit return systems, and market development.</p>', PHD: '<h2>Research Frontiers</h2><p>Chemical recycling, material flow analysis, and modeling circular systems.</p>' } }],
    activities: [{ id: 'zw-rec-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Sort the Recycling!', MIDDLE_SCHOOL: 'Follow the Material', HIGH_SCHOOL: 'MRF Simulation', UNDERGRADUATE: 'Economic Analysis', GRADUATE: 'System Design', PHD: 'Flow Modeling' }, description: { ELEMENTARY: 'Put items in the right recycling bins!', MIDDLE_SCHOOL: 'Follow materials from bin to new product.', HIGH_SCHOOL: 'Run a material recovery facility.', UNDERGRADUATE: 'Analyze recycling economics for a city.', GRADUATE: 'Design an improved recycling system.', PHD: 'Model material flows in a circular economy.' }, config: { ELEMENTARY: { items: 10, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 12, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 15, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 18, hints: false, timeLimit: 120 }, GRADUATE: { items: 20, hints: false, timeLimit: 90 }, PHD: { items: 25, hints: false, timeLimit: 60 } } }],
    game: { id: 'zw-rec-game', type: 'matching', title: 'Recycling Sorter', description: 'Sort materials correctly and efficiently!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-rec-quiz', passingScore: 80, questions: [{ id: 'zwrq1', question: { ELEMENTARY: 'What can usually be recycled?', MIDDLE_SCHOOL: 'What is wishcycling?', HIGH_SCHOOL: 'What is a MRF?', UNDERGRADUATE: 'What drives recycling economics?', GRADUATE: 'What is EPR?', PHD: 'What is chemical recycling?' }, options: { ELEMENTARY: ['Clean bottles, cans, paper, cardboard', 'Dirty diapers', 'Food waste', 'Plastic bags'], MIDDLE_SCHOOL: ['Putting non-recyclables in hoping they get recycled', 'Wishing for less waste', 'Recycling correctly', 'A type of sorting'], HIGH_SCHOOL: ['Material Recovery Facility', 'Main Recycling Facility', 'Metal Reclamation Fund', 'Municipal Refuse Factory'], UNDERGRADUATE: ['Commodity prices for materials', 'Collection convenience', 'Public desire', 'Government mandates only'], GRADUATE: ['Extended Producer Responsibility', 'Environmental Protection Regulation', 'Energy Production Requirement', 'Excess Packaging Rules'], PHD: ['Breaking polymers into monomers for re-polymerization', 'Traditional mechanical recycling', 'Composting plastics', 'Burning for energy'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Clean bottles, cans, paper, and cardboard can usually be recycled!', MIDDLE_SCHOOL: 'Wishcycling is putting non-recyclables in the recycling bin hoping they will be recycled - it causes contamination.', HIGH_SCHOOL: 'A MRF (Material Recovery Facility) is where recyclables are sorted into separate material streams.', UNDERGRADUATE: 'Commodity prices for recycled materials determine whether recycling is economically viable.', GRADUATE: 'EPR (Extended Producer Responsibility) makes producers responsible for end-of-life product management.', PHD: 'Chemical recycling breaks polymers back into monomers that can be re-polymerized into new plastics.' } }] },
    externalResources: [{ title: 'EPA Recycling', url: 'https://www.epa.gov/recycle', type: 'research' }]
  },
  // Module 6: Product Lifecycle Design
  {
    id: 'zw-lifecycle',
    slug: 'product-lifecycle-design',
    title: 'Product Lifecycle Design',
    description: {
      ELEMENTARY: 'Learn how products can be made to last and not become waste!',
      MIDDLE_SCHOOL: 'Discover how design choices affect whether things become waste.',
      HIGH_SCHOOL: 'Explore design for environment, durability, and repairability.',
      UNDERGRADUATE: 'Analyze lifecycle assessment, eco-design principles, and material selection.',
      GRADUATE: 'Examine circular design strategies, business model innovation, and policy.',
      PHD: 'Research design for circularity, system dynamics, and transition pathways.'
    },
    topic: 'zero-waste',
    category: 'DESIGN',
    icon: 'Pencil',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-life-1', title: 'Designing Out Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Design!</h2><p>Some products are designed to be fixed and used for a long time. Others are designed to be thrown away quickly.</p>', MIDDLE_SCHOOL: '<h2>Design Matters</h2><p>Designers choose materials, durability, and whether products can be repaired. These choices determine waste.</p>', HIGH_SCHOOL: '<h2>Design for Environment</h2><p>DfE principles: durability, repairability, recyclability, non-toxicity, and minimal materials.</p>', UNDERGRADUATE: '<h2>Lifecycle Assessment</h2><p>LCA evaluates environmental impacts from raw material extraction through disposal. Guides design decisions.</p>', GRADUATE: '<h2>Circular Design</h2><p>Designing for multiple use cycles, component recovery, and closed-loop systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Design for circular economy, material passports, and system-level optimization.</p>' } }],
    activities: [{ id: 'zw-life-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design a Toy!', MIDDLE_SCHOOL: 'Compare Products', HIGH_SCHOOL: 'Redesign Challenge', UNDERGRADUATE: 'LCA Study', GRADUATE: 'Business Model', PHD: 'System Design' }, description: { ELEMENTARY: 'Design a toy that lasts a long time!', MIDDLE_SCHOOL: 'Compare short-lived vs. durable products.', HIGH_SCHOOL: 'Redesign a disposable product to be reusable.', UNDERGRADUATE: 'Conduct a lifecycle assessment of a product.', GRADUATE: 'Design a circular business model.', PHD: 'Design a system for circular material flows.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-life-game', type: 'puzzle', title: 'Product Designer', description: 'Design products that minimize waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-life-quiz', passingScore: 80, questions: [{ id: 'zwlq1', question: { ELEMENTARY: 'What makes a good product design for reducing waste?', MIDDLE_SCHOOL: 'What is planned obsolescence?', HIGH_SCHOOL: 'What does DfE stand for?', UNDERGRADUATE: 'What does LCA measure?', GRADUATE: 'What is a product-service system?', PHD: 'What is a material passport?' }, options: { ELEMENTARY: ['Made to last and be fixed', 'Made to break quickly', 'Made with lots of different parts', 'Made to be thrown away'], MIDDLE_SCHOOL: ['Designing products to break or become outdated', 'Making products last forever', 'Recycling old products', 'Using recycled materials'], HIGH_SCHOOL: ['Design for Environment', 'Direct Factory Export', 'Durable Finished Equipment', 'Design for Excellence'], UNDERGRADUATE: ['Environmental impacts across a product\'s life', 'Only manufacturing impacts', 'Only disposal impacts', 'Product cost'], GRADUATE: ['Selling services instead of products', 'Selling more products', 'Planned obsolescence', 'Lower quality'], PHD: ['Digital record of materials in a product', 'Travel document', 'Manufacturing date', 'Brand certification'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Products designed to last a long time and be repaired create less waste!', MIDDLE_SCHOOL: 'Planned obsolescence is intentionally designing products to break or become outdated quickly.', HIGH_SCHOOL: 'DfE (Design for Environment) is designing products to minimize environmental impact.', UNDERGRADUATE: 'LCA (Lifecycle Assessment) measures environmental impacts from raw materials through disposal.', GRADUATE: 'Product-service systems sell outcomes (e.g., lighting) instead of products (e.g., lightbulbs).', PHD: 'Material passports are digital records of materials in products to enable recovery and reuse.' } }] },
    externalResources: [{ title: 'Ellen MacArthur Foundation', url: 'https://ellenmacarthurfoundation.org/', type: 'research' }]
  },
  // Module 7: Food Waste Reduction
  {
    id: 'zw-food-waste',
    slug: 'food-waste-reduction',
    title: 'Food Waste Reduction',
    description: {
      ELEMENTARY: 'Learn why wasting food is bad and how to waste less!',
      MIDDLE_SCHOOL: 'Discover the impacts of food waste and solutions.',
      HIGH_SCHOOL: 'Explore food waste across the supply chain and reduction strategies.',
      UNDERGRADUATE: 'Analyze food loss measurement, causes, and intervention design.',
      GRADUATE: 'Examine food waste policy, food recovery hierarchy, and system change.',
      PHD: 'Research food system modeling, behavior change, and climate implications.'
    },
    topic: 'zero-waste',
    category: 'FOOD WASTE',
    icon: 'Apple',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-food-1', title: 'Don\'t Waste Food!', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Food is Precious!</h2><p>When we throw away food, we waste the water, energy, and work that made it. Let us eat what we take!</p>', MIDDLE_SCHOOL: '<h2>Food Waste Facts</h2><p>About 1/3 of food is wasted globally. In homes, we waste food by buying too much, not eating leftovers, and confusion about dates.</p>', HIGH_SCHOOL: '<h2>Supply Chain Waste</h2><p>Food is lost on farms, in processing, retail, and homes. Different solutions needed at each stage.</p>', UNDERGRADUATE: '<h2>Measuring Food Waste</h2><p>Quantification methods, waste characterization, and identifying intervention points.</p>', GRADUATE: '<h2>Food Recovery Hierarchy</h2><p>Prevention > Feed people > Feed animals > Industrial uses > Composting > Disposal.</p>', PHD: '<h2>Research Frontiers</h2><p>Food-climate modeling, behavior intervention design, and system optimization.</p>' } }],
    activities: [{ id: 'zw-food-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Food!', MIDDLE_SCHOOL: 'Meal Planning', HIGH_SCHOOL: 'Supply Chain Analysis', UNDERGRADUATE: 'Intervention Design', GRADUATE: 'Policy Development', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Make choices to waste less food!', MIDDLE_SCHOOL: 'Plan meals to use all the food you buy.', HIGH_SCHOOL: 'Analyze food waste across the supply chain.', UNDERGRADUATE: 'Design a food waste intervention.', GRADUATE: 'Develop food waste reduction policy.', PHD: 'Model food system waste dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-food-game', type: 'simulation', title: 'Food Saver', description: 'Reduce food waste at home and beyond!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-food-quiz', passingScore: 80, questions: [{ id: 'zwfq1', question: { ELEMENTARY: 'Why is wasting food bad?', MIDDLE_SCHOOL: 'How much food is wasted globally?', HIGH_SCHOOL: 'Where does most household food waste occur?', UNDERGRADUATE: 'What is the best way to handle surplus food?', GRADUATE: 'What is the food recovery hierarchy?', PHD: 'What is a key challenge in food waste research?' }, options: { ELEMENTARY: ['It wastes water, energy, and work', 'It does not matter', 'Food grows on trees easily', 'There is always more'], MIDDLE_SCHOOL: ['About 1/3', 'Almost none', 'About 1/10', '90%'], HIGH_SCHOOL: ['In the kitchen - preparation and leftovers', 'In the store', 'On the farm', 'In the factory'], UNDERGRADUATE: ['Prevent it or feed hungry people', 'Send to landfill', 'Burn it', 'Flush it'], GRADUATE: ['Prioritized uses from prevention to disposal', 'All options are equal', 'Landfill is best', 'No hierarchy exists'], PHD: ['Accurate measurement and behavior change', 'Too simple', 'No challenges', 'Technology only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wasting food wastes all the water, energy, and work that went into growing and making it!', MIDDLE_SCHOOL: 'About one-third of all food produced globally is lost or wasted.', HIGH_SCHOOL: 'Most household food waste happens in the kitchen during preparation and from uneaten leftovers.', UNDERGRADUATE: 'The best options are preventing waste or donating edible surplus to feed people.', GRADUATE: 'The food recovery hierarchy prioritizes options from prevention (best) through disposal (worst).', PHD: 'Accurately measuring food waste and designing effective behavior change interventions remain challenging.' } }] },
    externalResources: [{ title: 'EPA Food Waste', url: 'https://www.epa.gov/sustainable-management-food', type: 'research' }]
  },
  // Module 8: Plastic-Free Living
  {
    id: 'zw-plastic-free',
    slug: 'plastic-free-living',
    title: 'Plastic-Free Living',
    description: {
      ELEMENTARY: 'Learn how to use less plastic!',
      MIDDLE_SCHOOL: 'Discover alternatives to single-use plastics.',
      HIGH_SCHOOL: 'Explore the plastic pollution problem and solutions.',
      UNDERGRADUATE: 'Analyze plastic lifecycle, alternatives assessment, and policy options.',
      GRADUATE: 'Examine global plastic agreements, corporate responsibility, and system change.',
      PHD: 'Research plastic fate, microplastics, and sociotechnical transitions.'
    },
    topic: 'zero-waste',
    category: 'PLASTICS',
    icon: 'Ban',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-pf-1', title: 'Beyond Plastic', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Plastic Problems!</h2><p>Plastic lasts for hundreds of years. Using reusable bottles, bags, and containers helps protect nature!</p>', MIDDLE_SCHOOL: '<h2>Single-Use Plastics</h2><p>Bags, bottles, straws, and packaging are used once then thrown away. Most are not recycled.</p>', HIGH_SCHOOL: '<h2>Plastic Pollution</h2><p>Ocean plastic, microplastics, and chemical additives. Only 9% of plastic ever made has been recycled.</p>', UNDERGRADUATE: '<h2>Alternatives Assessment</h2><p>Evaluating alternatives requires lifecycle thinking. Paper is not always better than plastic.</p>', GRADUATE: '<h2>Policy Approaches</h2><p>Bans, fees, EPR, plastic treaties, and voluntary commitments from companies.</p>', PHD: '<h2>Research Frontiers</h2><p>Microplastic fate and effects, degradation pathways, and sociotechnical transition.</p>' } }],
    activities: [{ id: 'zw-pf-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Swap the Plastic!', MIDDLE_SCHOOL: 'Plastic Audit', HIGH_SCHOOL: 'Alternatives Analysis', UNDERGRADUATE: 'LCA Comparison', GRADUATE: 'Policy Design', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Find reusable alternatives to plastic items!', MIDDLE_SCHOOL: 'Audit plastics in your daily life.', HIGH_SCHOOL: 'Analyze alternatives to common plastics.', UNDERGRADUATE: 'Compare lifecycles of plastic vs. alternatives.', GRADUATE: 'Design plastic reduction policy.', PHD: 'Model plastic system transitions.' }, config: { ELEMENTARY: { items: 8, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 12, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 15, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 18, hints: false, timeLimit: 120 }, GRADUATE: { items: 20, hints: false, timeLimit: 90 }, PHD: { items: 25, hints: false, timeLimit: 60 } } }],
    game: { id: 'zw-pf-game', type: 'matching', title: 'Plastic Swapper', description: 'Find alternatives to single-use plastics!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-pf-quiz', passingScore: 80, questions: [{ id: 'zwpfq1', question: { ELEMENTARY: 'What is better than a plastic bag?', MIDDLE_SCHOOL: 'What percentage of plastic has been recycled?', HIGH_SCHOOL: 'What are microplastics?', UNDERGRADUATE: 'Why is paper not always better than plastic?', GRADUATE: 'What is a plastic treaty?', PHD: 'What is a key microplastics research question?' }, options: { ELEMENTARY: ['A reusable bag', 'More plastic bags', 'Throwing it on the ground', 'Nothing'], MIDDLE_SCHOOL: ['About 9%', '90%', '50%', '75%'], HIGH_SCHOOL: ['Tiny plastic pieces under 5mm', 'Big plastic items', 'Recycled plastic', 'Clean plastic'], UNDERGRADUATE: ['Paper has its own impacts (forests, water, energy)', 'Paper is always better', 'Plastic is always better', 'They are identical'], GRADUATE: ['International agreement to address plastic pollution', 'A type of plastic', 'A recycling program', 'A plastic ban'], PHD: ['Health effects of microplastic exposure', 'Too simple', 'All questions answered', 'No concerns'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Reusable bags can be used hundreds of times instead of throwing away plastic bags!', MIDDLE_SCHOOL: 'Only about 9% of all plastic ever made has been recycled. Most ends up in landfills or nature.', HIGH_SCHOOL: 'Microplastics are tiny plastic pieces smaller than 5mm that are found in water, air, and organisms.', UNDERGRADUATE: 'Paper production requires forests, water, and energy - LCA shows tradeoffs between materials.', GRADUATE: 'A global plastic treaty is being negotiated to address plastic pollution internationally.', PHD: 'Understanding human and ecological health effects of microplastic exposure is a key research gap.' } }] },
    externalResources: [{ title: 'Plastic Free Foundation', url: 'https://www.plasticfreefoundation.org/', type: 'research' }]
  },
  // Module 9: Community Waste Solutions
  {
    id: 'zw-community',
    slug: 'community-waste-solutions',
    title: 'Community Waste Solutions',
    description: {
      ELEMENTARY: 'Learn how communities can work together to reduce waste!',
      MIDDLE_SCHOOL: 'Discover sharing, repair, and reuse programs in communities.',
      HIGH_SCHOOL: 'Explore community-based waste reduction models and social enterprise.',
      UNDERGRADUATE: 'Analyze community waste systems, social capital, and collaborative consumption.',
      GRADUATE: 'Examine community-based social marketing, collective action, and scaling.',
      PHD: 'Research community transition dynamics, social innovation, and intervention design.'
    },
    topic: 'zero-waste',
    category: 'COMMUNITY',
    icon: 'Users',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-comm-1', title: 'Together for Zero Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Sharing is Caring!</h2><p>When neighbors share tools, toys, and things they don\'t use, we need to buy less and throw away less!</p>', MIDDLE_SCHOOL: '<h2>Community Programs</h2><p>Tool libraries, repair cafes, swap meets, and community gardens help people share and reuse.</p>', HIGH_SCHOOL: '<h2>Collaborative Consumption</h2><p>Sharing economy, library of things, and community reuse centers extend product life.</p>', UNDERGRADUATE: '<h2>Social Infrastructure</h2><p>Building social capital, trust, and networks that enable sharing and collective action.</p>', GRADUATE: '<h2>Scaling Solutions</h2><p>Community-based social marketing, network effects, and replicating successful models.</p>', PHD: '<h2>Research Frontiers</h2><p>Community transition dynamics, social innovation, and measuring collective impact.</p>' } }],
    activities: [{ id: 'zw-comm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Start a Swap!', MIDDLE_SCHOOL: 'Plan a Repair Cafe', HIGH_SCHOOL: 'Design a Tool Library', UNDERGRADUATE: 'Community Assessment', GRADUATE: 'Program Scaling', PHD: 'Intervention Design' }, description: { ELEMENTARY: 'Organize a toy and book swap!', MIDDLE_SCHOOL: 'Plan a community repair event.', HIGH_SCHOOL: 'Design a tool lending library.', UNDERGRADUATE: 'Assess community readiness for sharing programs.', GRADUATE: 'Plan to scale a community program.', PHD: 'Design a community-based intervention study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-comm-game', type: 'simulation', title: 'Community Builder', description: 'Build sharing and reuse programs!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-comm-quiz', passingScore: 80, questions: [{ id: 'zwcmq1', question: { ELEMENTARY: 'How can sharing help reduce waste?', MIDDLE_SCHOOL: 'What is a repair cafe?', HIGH_SCHOOL: 'What is a tool library?', UNDERGRADUATE: 'What enables community sharing programs?', GRADUATE: 'What is community-based social marketing?', PHD: 'What is a key challenge in scaling community programs?' }, options: { ELEMENTARY: ['We buy less when we share', 'It creates more waste', 'It does not help', 'Sharing is bad'], MIDDLE_SCHOOL: ['A place where volunteers help fix broken items', 'A coffee shop', 'A place to buy tools', 'A recycling center'], HIGH_SCHOOL: ['A place to borrow tools instead of buying', 'A tool store', 'A workshop', 'A factory'], UNDERGRADUATE: ['Social capital, trust, and networks', 'Just money', 'Only government', 'Technology alone'], GRADUATE: ['Using social science to promote sustainable behaviors', 'Advertising', 'Regulations only', 'Market competition'], PHD: ['Maintaining fidelity while adapting to context', 'Too easy to scale', 'No challenges', 'One size fits all'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When we share things, we do not each need to buy our own, so less stuff gets made and thrown away!', MIDDLE_SCHOOL: 'A repair cafe is an event where volunteers help people fix broken items like clothes, electronics, and furniture.', HIGH_SCHOOL: 'A tool library lets people borrow tools they need occasionally instead of buying them.', UNDERGRADUATE: 'Social capital - trust, networks, and norms of reciprocity - enables community sharing programs.', GRADUATE: 'CBSM uses behavioral science to design community-level interventions for sustainable behaviors.', PHD: 'Maintaining program fidelity while adapting to different community contexts is a key scaling challenge.' } }] },
    externalResources: [{ title: 'Repair Cafe Foundation', url: 'https://www.repaircafe.org/', type: 'research' }]
  },
  // Module 10: Extended Producer Responsibility
  {
    id: 'zw-epr',
    slug: 'extended-producer-responsibility',
    title: 'Extended Producer Responsibility',
    description: {
      ELEMENTARY: 'Learn why companies should help deal with their products when we are done!',
      MIDDLE_SCHOOL: 'Discover how producers can be responsible for product end-of-life.',
      HIGH_SCHOOL: 'Explore EPR programs for packaging, electronics, and other products.',
      UNDERGRADUATE: 'Analyze EPR policy design, fee structures, and governance.',
      GRADUATE: 'Examine EPR effectiveness, international models, and design incentives.',
      PHD: 'Research EPR system dynamics, design optimization, and policy innovation.'
    },
    topic: 'zero-waste',
    category: 'POLICY',
    icon: 'Building',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-epr-1', title: 'Producer Responsibility', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Companies Should Help!</h2><p>Companies that make things should help collect and recycle them when we are finished using them.</p>', MIDDLE_SCHOOL: '<h2>What is EPR?</h2><p>Extended Producer Responsibility makes companies responsible for their products through the whole lifecycle, including disposal.</p>', HIGH_SCHOOL: '<h2>EPR Programs</h2><p>Deposit return systems, packaging EPR, electronics take-back, and tire recycling are common EPR programs.</p>', UNDERGRADUATE: '<h2>EPR Design</h2><p>Fee structures, eco-modulation, governance models, and performance targets shape EPR effectiveness.</p>', GRADUATE: '<h2>International Models</h2><p>European EPR frameworks, comparative policy analysis, and lessons learned.</p>', PHD: '<h2>Research Frontiers</h2><p>EPR effectiveness evaluation, design incentives for circularity, and system optimization.</p>' } }],
    activities: [{ id: 'zw-epr-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Return the Bottles!', MIDDLE_SCHOOL: 'Design Take-Back', HIGH_SCHOOL: 'Compare Programs', UNDERGRADUATE: 'Fee Structure Design', GRADUATE: 'Policy Evaluation', PHD: 'System Optimization' }, description: { ELEMENTARY: 'Return bottles to get your deposit back!', MIDDLE_SCHOOL: 'Design a product take-back program.', HIGH_SCHOOL: 'Compare EPR programs for different products.', UNDERGRADUATE: 'Design EPR fee structures.', GRADUATE: 'Evaluate EPR policy effectiveness.', PHD: 'Optimize EPR system design.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-epr-game', type: 'simulation', title: 'Policy Designer', description: 'Design effective producer responsibility!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-epr-quiz', passingScore: 80, questions: [{ id: 'zweprq1', question: { ELEMENTARY: 'What happens when you return a bottle with a deposit?', MIDDLE_SCHOOL: 'What does EPR stand for?', HIGH_SCHOOL: 'What products commonly have EPR programs?', UNDERGRADUATE: 'What is eco-modulation?', GRADUATE: 'Where did EPR policy originate?', PHD: 'What is a key EPR research question?' }, options: { ELEMENTARY: ['You get money back', 'Nothing happens', 'You pay more', 'It goes to landfill'], MIDDLE_SCHOOL: ['Extended Producer Responsibility', 'Extra Packaging Required', 'Environmental Protection Rules', 'Energy Power Reduction'], HIGH_SCHOOL: ['Packaging, electronics, tires', 'Only food', 'Only paper', 'Nothing'], UNDERGRADUATE: ['Adjusting fees based on environmental design', 'Same fee for everything', 'No fees', 'Only government pays'], GRADUATE: ['Europe, especially Germany and Sweden', 'United States', 'China', 'No specific origin'], PHD: ['How to design fees that incentivize circularity', 'Too simple', 'All questions answered', 'No research needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When you return a bottle with a deposit, you get your money back and the bottle gets recycled!', MIDDLE_SCHOOL: 'EPR stands for Extended Producer Responsibility - making producers responsible for end-of-life.', HIGH_SCHOOL: 'Packaging, electronics (e-waste), tires, batteries, and paint commonly have EPR programs.', UNDERGRADUATE: 'Eco-modulation adjusts producer fees based on product design - lower fees for recyclable designs.', GRADUATE: 'EPR policy originated in Europe, particularly Germany and Scandinavian countries in the 1990s.', PHD: 'Designing fee structures that effectively incentivize design for circularity is a key research question.' } }] },
    externalResources: [{ title: 'Product Stewardship Institute', url: 'https://www.productstewardship.us/', type: 'research' }]
  },
  // Module 11: Textile Waste
  {
    id: 'zw-textiles',
    slug: 'textile-waste',
    title: 'Textile Waste',
    description: {
      ELEMENTARY: 'Learn why throwing away clothes hurts the planet!',
      MIDDLE_SCHOOL: 'Discover the problem with fast fashion and textile waste.',
      HIGH_SCHOOL: 'Explore textile recycling, upcycling, and sustainable fashion.',
      UNDERGRADUATE: 'Analyze textile industry impacts, circular fashion, and innovation.',
      GRADUATE: 'Examine textile policy, fiber recycling technology, and business models.',
      PHD: 'Research textile system transformation, material innovation, and consumer behavior.'
    },
    topic: 'zero-waste',
    category: 'TEXTILES',
    icon: 'Shirt',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-tex-1', title: 'Fashion and Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clothes Waste!</h2><p>Many clothes are worn just a few times then thrown away. Thats a lot of waste! Wearing clothes longer helps.</p>', MIDDLE_SCHOOL: '<h2>Fast Fashion</h2><p>Cheap clothes made quickly are often thrown away after a few wears. Most textiles are not recycled.</p>', HIGH_SCHOOL: '<h2>Textile Impacts</h2><p>Water pollution, carbon emissions, microfibers, and landfill volume. Only 1% of textiles are recycled into new clothes.</p>', UNDERGRADUATE: '<h2>Circular Fashion</h2><p>Design for durability, take-back programs, resale platforms, and fiber-to-fiber recycling.</p>', GRADUATE: '<h2>Policy and Innovation</h2><p>Textile EPR, fiber sorting technology, and new business models like rental and subscription.</p>', PHD: '<h2>Research Frontiers</h2><p>Chemical recycling, fiber identification, and sociotechnical transition of fashion system.</p>' } }],
    activities: [{ id: 'zw-tex-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save Your Clothes!', MIDDLE_SCHOOL: 'Fashion Footprint', HIGH_SCHOOL: 'Upcycling Workshop', UNDERGRADUATE: 'Business Model', GRADUATE: 'Policy Design', PHD: 'System Analysis' }, description: { ELEMENTARY: 'Learn to take care of clothes so they last!', MIDDLE_SCHOOL: 'Calculate your fashion footprint.', HIGH_SCHOOL: 'Design an upcycling project.', UNDERGRADUATE: 'Design a circular fashion business.', GRADUATE: 'Design textile EPR policy.', PHD: 'Analyze textile system transformation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-tex-game', type: 'simulation', title: 'Fashion Saver', description: 'Reduce textile waste through smart choices!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-tex-quiz', passingScore: 80, questions: [{ id: 'zwtexq1', question: { ELEMENTARY: 'What can we do with old clothes?', MIDDLE_SCHOOL: 'What is fast fashion?', HIGH_SCHOOL: 'What percent of textiles become new clothes?', UNDERGRADUATE: 'What is fiber-to-fiber recycling?', GRADUATE: 'What is textile EPR?', PHD: 'What is a textile recycling challenge?' }, options: { ELEMENTARY: ['Donate, repair, or upcycle them', 'Always throw them away', 'Burn them', 'Nothing'], MIDDLE_SCHOOL: ['Cheap clothes made quickly, often thrown away soon', 'Slow fashion', 'Expensive clothes', 'Old fashion'], HIGH_SCHOOL: ['About 1%', '50%', '90%', '25%'], UNDERGRADUATE: ['Recycling fabric into new fabric', 'Burning fabric', 'Only downcycling', 'No recycling possible'], GRADUATE: ['Producer responsibility for end-of-life textiles', 'Textile tax', 'Fashion police', 'Clothing bank'], PHD: ['Sorting blended fiber materials', 'Too easy', 'No challenges', 'All solved'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old clothes can be donated to others, repaired to last longer, or turned into something new!', MIDDLE_SCHOOL: 'Fast fashion is cheap, trendy clothes designed to be worn a few times then discarded.', HIGH_SCHOOL: 'Only about 1% of textiles are recycled into new clothing - most are downcycled or landfilled.', UNDERGRADUATE: 'Fiber-to-fiber recycling breaks down old textiles into fibers that become new fabric.', GRADUATE: 'Textile EPR makes fashion brands responsible for collecting and recycling their products.', PHD: 'Sorting blended materials (cotton-polyester) for recycling is a major technical challenge.' } }] },
    externalResources: [{ title: 'Ellen MacArthur Fashion', url: 'https://ellenmacarthurfoundation.org/topics/fashion/overview', type: 'research' }]
  },
  // Module 12: E-Waste
  {
    id: 'zw-ewaste',
    slug: 'e-waste',
    title: 'Electronic Waste',
    description: {
      ELEMENTARY: 'Learn what happens to old phones and computers!',
      MIDDLE_SCHOOL: 'Discover why e-waste is a growing problem and how to recycle electronics.',
      HIGH_SCHOOL: 'Explore e-waste composition, hazards, and recycling processes.',
      UNDERGRADUATE: 'Analyze e-waste flows, urban mining, and circular electronics design.',
      GRADUATE: 'Examine e-waste policy, informal sector, and extended producer responsibility.',
      PHD: 'Research e-waste system dynamics, material recovery optimization, and justice issues.'
    },
    topic: 'zero-waste',
    category: 'ELECTRONICS',
    icon: 'Smartphone',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-ew-1', title: 'Old Electronics', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>E-Waste!</h2><p>Old phones, tablets, and computers have valuable metals inside. We should recycle them, not throw them away!</p>', MIDDLE_SCHOOL: '<h2>Growing E-Waste</h2><p>E-waste is the fastest growing waste stream. It contains valuable and hazardous materials.</p>', HIGH_SCHOOL: '<h2>E-Waste Composition</h2><p>Gold, copper, rare earths, but also lead, mercury, and flame retardants. Proper recycling is essential.</p>', UNDERGRADUATE: '<h2>Urban Mining</h2><p>Recovering valuable materials from e-waste. Higher concentrations than natural ore in some cases.</p>', GRADUATE: '<h2>Global E-Waste</h2><p>Transboundary flows, informal recycling, health impacts, and international regulations.</p>', PHD: '<h2>Research Frontiers</h2><p>Automated disassembly, material recovery efficiency, and environmental justice.</p>' } }],
    activities: [{ id: 'zw-ew-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Recycle Electronics!', MIDDLE_SCHOOL: 'E-Waste Audit', HIGH_SCHOOL: 'Material Recovery', UNDERGRADUATE: 'Urban Mining', GRADUATE: 'Policy Analysis', PHD: 'System Optimization' }, description: { ELEMENTARY: 'Find the right place to recycle electronics!', MIDDLE_SCHOOL: 'Audit electronics in your home.', HIGH_SCHOOL: 'Simulate material recovery from e-waste.', UNDERGRADUATE: 'Analyze urban mining economics.', GRADUATE: 'Analyze international e-waste policy.', PHD: 'Optimize e-waste recovery systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-ew-game', type: 'simulation', title: 'E-Waste Expert', description: 'Properly manage electronic waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-ew-quiz', passingScore: 80, questions: [{ id: 'zwewq1', question: { ELEMENTARY: 'Why should we recycle old phones?', MIDDLE_SCHOOL: 'What is the fastest growing waste stream?', HIGH_SCHOOL: 'What valuable material is in electronics?', UNDERGRADUATE: 'What is urban mining?', GRADUATE: 'What is the Basel Convention?', PHD: 'What is a key e-waste justice issue?' }, options: { ELEMENTARY: ['They have valuable metals inside', 'They are boring', 'No reason', 'They should go in trash'], MIDDLE_SCHOOL: ['E-waste', 'Food waste', 'Paper waste', 'Plastic waste'], HIGH_SCHOOL: ['Gold and rare earth elements', 'Just plastic', 'Only glass', 'Nothing valuable'], UNDERGRADUATE: ['Recovering materials from waste products', 'Mining in cities', 'Video game', 'Building cities'], GRADUATE: ['Treaty controlling hazardous waste trade', 'Swiss city', 'A company', 'A recycling method'], PHD: ['Informal workers exposed to toxics', 'Too much recycling', 'No issues', 'Perfect system'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old phones and computers contain gold, silver, and other valuable metals that can be recovered!', MIDDLE_SCHOOL: 'E-waste (electronic waste) is the fastest growing waste stream globally.', HIGH_SCHOOL: 'Electronics contain gold, silver, copper, platinum, and rare earth elements.', UNDERGRADUATE: 'Urban mining recovers valuable materials from waste - e-waste has higher gold concentration than ore.', GRADUATE: 'The Basel Convention controls transboundary movement of hazardous wastes including e-waste.', PHD: 'Informal recyclers in developing countries face serious health risks from primitive e-waste processing.' } }] },
    externalResources: [{ title: 'E-Waste World', url: 'https://ewastemonitor.info/', type: 'research' }]
  },
  // Module 13: Upcycling and Repair
  {
    id: 'zw-upcycling',
    slug: 'upcycling-repair',
    title: 'Upcycling and Repair',
    description: {
      ELEMENTARY: 'Learn how to turn old things into new treasures!',
      MIDDLE_SCHOOL: 'Discover the art of repairing and upcycling instead of throwing away.',
      HIGH_SCHOOL: 'Explore repair skills, upcycling techniques, and right to repair.',
      UNDERGRADUATE: 'Analyze repair economy, product longevity, and design for repair.',
      GRADUATE: 'Examine repair cafes, maker movement, and policy for repairability.',
      PHD: 'Research repair culture, skill development, and systemic barriers to repair.'
    },
    topic: 'zero-waste',
    category: 'REUSE',
    icon: 'Hammer',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-up-1', title: 'Fix It, Dont Trash It', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Fix and Make New!</h2><p>Broken things can often be fixed! Old things can become new things with creativity!</p>', MIDDLE_SCHOOL: '<h2>Repair and Upcycle</h2><p>Repair keeps things working longer. Upcycling turns old items into something better or different.</p>', HIGH_SCHOOL: '<h2>Right to Repair</h2><p>Companies sometimes make products hard to repair. Right to repair laws help consumers fix things.</p>', UNDERGRADUATE: '<h2>Design for Repair</h2><p>Modular design, available parts, and repair documentation enable product longevity.</p>', GRADUATE: '<h2>Repair Movement</h2><p>Repair cafes, makerspaces, and iFixit are building repair culture and skills.</p>', PHD: '<h2>Research Frontiers</h2><p>Repair skills, cultural attitudes, and systemic barriers to repair economy.</p>' } }],
    activities: [{ id: 'zw-up-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Upcycle Art!', MIDDLE_SCHOOL: 'Learn to Fix', HIGH_SCHOOL: 'Repair Guide', UNDERGRADUATE: 'Design Review', GRADUATE: 'Start a Repair Cafe', PHD: 'Barrier Analysis' }, description: { ELEMENTARY: 'Turn old things into art!', MIDDLE_SCHOOL: 'Learn basic repair skills.', HIGH_SCHOOL: 'Create a repair guide for a product.', UNDERGRADUATE: 'Review product design for repairability.', GRADUATE: 'Plan a community repair cafe.', PHD: 'Analyze barriers to repair culture.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-up-game', type: 'simulation', title: 'Repair Hero', description: 'Fix things and create from old materials!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-up-quiz', passingScore: 80, questions: [{ id: 'zwupq1', question: { ELEMENTARY: 'What is upcycling?', MIDDLE_SCHOOL: 'Why is repair better than replacing?', HIGH_SCHOOL: 'What is right to repair?', UNDERGRADUATE: 'What is modular design?', GRADUATE: 'What is a repair cafe?', PHD: 'What limits repair culture?' }, options: { ELEMENTARY: ['Making new things from old things', 'Throwing things away', 'Buying new things', 'Breaking things'], MIDDLE_SCHOOL: ['Uses less resources and creates less waste', 'Costs more', 'Takes too long', 'Not possible'], HIGH_SCHOOL: ['Laws allowing consumers to fix their products', 'Right to throw away', 'Company rights', 'No such thing'], UNDERGRADUATE: ['Components that can be individually replaced', 'One piece design', 'Glued together', 'Disposable design'], GRADUATE: ['Community event where volunteers help fix items', 'Coffee shop', 'Tool store', 'Recycling center'], PHD: ['Lack of skills, parts, information, and time', 'Too easy to repair', 'Everyone repairs', 'No barriers'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Upcycling is taking something old and making it into something new and useful!', MIDDLE_SCHOOL: 'Repairing uses fewer resources than making new products and keeps items out of landfills.', HIGH_SCHOOL: 'Right to repair laws require manufacturers to make parts and repair information available.', UNDERGRADUATE: 'Modular design allows individual components to be replaced, extending product life.', GRADUATE: 'Repair cafes are community events where skilled volunteers help people fix broken items.', PHD: 'Barriers include lost repair skills, unavailable parts, proprietary designs, and time pressures.' } }] },
    externalResources: [{ title: 'iFixit', url: 'https://www.ifixit.com/', type: 'research' }]
  },
  // Module 14: Industrial Ecology
  {
    id: 'zw-industrial',
    slug: 'industrial-ecology',
    title: 'Industrial Ecology',
    description: {
      ELEMENTARY: 'Learn how factories can work like nature!',
      MIDDLE_SCHOOL: 'Discover how industries can share and reuse materials.',
      HIGH_SCHOOL: 'Explore industrial symbiosis, eco-industrial parks, and material flows.',
      UNDERGRADUATE: 'Analyze material flow analysis, industrial symbiosis networks, and lifecycle thinking.',
      GRADUATE: 'Examine eco-industrial development, circular economy policy, and systems optimization.',
      PHD: 'Research industrial ecosystem dynamics, network analysis, and transition pathways.'
    },
    topic: 'zero-waste',
    category: 'INDUSTRY',
    icon: 'Factory',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-ind-1', title: 'Factories Like Nature', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Factories!</h2><p>In nature, nothing is wasted - one creature\'s waste is another\'s food. Factories can work the same way!</p>', MIDDLE_SCHOOL: '<h2>Industrial Symbiosis</h2><p>One factory\'s waste can be another factory\'s raw material. This is called industrial symbiosis.</p>', HIGH_SCHOOL: '<h2>Eco-Industrial Parks</h2><p>Companies co-locate to exchange materials, energy, and water. Kalundborg, Denmark is a famous example.</p>', UNDERGRADUATE: '<h2>Material Flow Analysis</h2><p>Tracking materials through industrial systems reveals opportunities for efficiency and symbiosis.</p>', GRADUATE: '<h2>Circular Economy</h2><p>Moving from linear take-make-waste to circular systems that keep materials in use.</p>', PHD: '<h2>Research Frontiers</h2><p>Industrial ecosystem emergence, network resilience, and sociotechnical transitions.</p>' } }],
    activities: [{ id: 'zw-ind-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Connect the Factories!', MIDDLE_SCHOOL: 'Waste Exchange', HIGH_SCHOOL: 'Design an Eco-Park', UNDERGRADUATE: 'Material Flow Map', GRADUATE: 'Network Analysis', PHD: 'Transition Pathway' }, description: { ELEMENTARY: 'Help factories share their waste!', MIDDLE_SCHOOL: 'Match wastes with uses.', HIGH_SCHOOL: 'Design an eco-industrial park.', UNDERGRADUATE: 'Map material flows in an industry.', GRADUATE: 'Analyze an industrial symbiosis network.', PHD: 'Model industrial system transition.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-ind-game', type: 'simulation', title: 'Industrial Ecologist', description: 'Create industrial symbiosis networks!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-ind-quiz', passingScore: 80, questions: [{ id: 'zwindq1', question: { ELEMENTARY: 'How can factories work like nature?', MIDDLE_SCHOOL: 'What is industrial symbiosis?', HIGH_SCHOOL: 'What is Kalundborg?', UNDERGRADUATE: 'What is material flow analysis?', GRADUATE: 'What is a circular economy?', PHD: 'What makes industrial ecosystems stable?' }, options: { ELEMENTARY: ['Use each other\'s waste', 'Make more pollution', 'Work alone', 'Throw everything away'], MIDDLE_SCHOOL: ['Factories sharing waste as resources', 'Factories competing', 'Making more waste', 'Industrial war'], HIGH_SCHOOL: ['A famous eco-industrial park in Denmark', 'A type of factory', 'A recycling bin', 'A city in Sweden'], UNDERGRADUATE: ['Tracking materials through systems', 'Water flow only', 'Money flow', 'Air flow only'], GRADUATE: ['Systems that keep materials in use', 'Linear economy', 'More consumption', 'Waste economy'], PHD: ['Diversity and redundancy in exchanges', 'Single connections', 'No diversity', 'Random connections'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Factories can use each other\'s waste materials, just like nature does!', MIDDLE_SCHOOL: 'Industrial symbiosis is when companies exchange waste materials that become resources for others.', HIGH_SCHOOL: 'Kalundborg, Denmark is the world\'s most famous example of industrial symbiosis.', UNDERGRADUATE: 'MFA tracks materials through industrial systems to find efficiency and recycling opportunities.', GRADUATE: 'A circular economy keeps materials in use through reuse, repair, and recycling instead of disposal.', PHD: 'Diverse connections and redundant pathways make industrial ecosystems more resilient.' } }] },
    externalResources: [{ title: 'Industrial Ecology', url: 'https://is4ie.org/', type: 'research' }]
  },
  // Module 15: Circular Economy
  {
    id: 'zw-circular',
    slug: 'circular-economy',
    title: 'Circular Economy',
    description: {
      ELEMENTARY: 'Learn how to keep using things again and again!',
      MIDDLE_SCHOOL: 'Discover the circular economy where nothing is wasted.',
      HIGH_SCHOOL: 'Explore circular business models, design strategies, and system change.',
      UNDERGRADUATE: 'Analyze circular economy frameworks, metrics, and implementation.',
      GRADUATE: 'Examine circular economy policy, investment, and transformation strategies.',
      PHD: 'Research circular economy transition, rebound effects, and systemic change.'
    },
    topic: 'zero-waste',
    category: 'CIRCULAR',
    icon: 'RefreshCcw',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-circ-1', title: 'Round and Round', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Going in Circles!</h2><p>Instead of use-and-throw-away, we can use-repair-reuse-recycle in a circle, forever!</p>', MIDDLE_SCHOOL: '<h2>Circular vs Linear</h2><p>Linear: take-make-waste. Circular: design out waste, keep materials in use, regenerate nature.</p>', HIGH_SCHOOL: '<h2>Circular Business Models</h2><p>Product-as-service, sharing platforms, take-back programs, and remanufacturing.</p>', UNDERGRADUATE: '<h2>Circular Design</h2><p>Design for durability, repair, disassembly, and material recovery. Biomimicry principles.</p>', GRADUATE: '<h2>Circular Policy</h2><p>EU Circular Economy Action Plan, metrics, and enabling conditions for transition.</p>', PHD: '<h2>Research Frontiers</h2><p>Circularity metrics, rebound effects, and sociotechnical transition pathways.</p>' } }],
    activities: [{ id: 'zw-circ-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Close the Loop!', MIDDLE_SCHOOL: 'Linear to Circular', HIGH_SCHOOL: 'Business Model', UNDERGRADUATE: 'Design Challenge', GRADUATE: 'Policy Framework', PHD: 'Transition Modeling' }, description: { ELEMENTARY: 'Keep materials going in circles!', MIDDLE_SCHOOL: 'Convert a linear process to circular.', HIGH_SCHOOL: 'Design a circular business model.', UNDERGRADUATE: 'Design a circular product.', GRADUATE: 'Develop a circular economy policy.', PHD: 'Model circular economy transition.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-circ-game', type: 'simulation', title: 'Circular Designer', description: 'Create circular systems that eliminate waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-circ-quiz', passingScore: 80, questions: [{ id: 'zwcircq1', question: { ELEMENTARY: 'What shape is better than a line for stuff?', MIDDLE_SCHOOL: 'What are the 3 principles of circular economy?', HIGH_SCHOOL: 'What is product-as-service?', UNDERGRADUATE: 'What is design for disassembly?', GRADUATE: 'What is the EU Circular Economy Action Plan?', PHD: 'What is a circularity rebound effect?' }, options: { ELEMENTARY: ['A circle', 'A line', 'A square', 'A triangle'], MIDDLE_SCHOOL: ['Design out waste, keep materials in use, regenerate nature', 'Take, make, waste', 'Buy, use, throw', 'Dig, burn, dump'], HIGH_SCHOOL: ['Paying for use instead of ownership', 'Buying products', 'Service station', 'Product store'], UNDERGRADUATE: ['Designing products to be easily taken apart', 'Gluing everything', 'Making it harder to open', 'Single material only'], GRADUATE: ['EU policy framework for circular transition', 'A recycling program', 'A product', 'A company'], PHD: ['Efficiency gains leading to increased consumption', 'Perfect circles', 'No rebounds', 'Only positive effects'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A circle keeps things going around and around instead of ending up in the trash!', MIDDLE_SCHOOL: 'Circular economy: 1) Design out waste, 2) Keep materials in use, 3) Regenerate natural systems.', HIGH_SCHOOL: 'Product-as-service means paying for the use of a product rather than owning it.', UNDERGRADUATE: 'Design for disassembly enables easy separation of components for repair, reuse, and recycling.', GRADUATE: 'The EU CEAP is a comprehensive policy package to accelerate circular economy transition.', PHD: 'Rebound effects occur when efficiency gains lead to increased consumption, partially offsetting benefits.' } }] },
    externalResources: [{ title: 'Ellen MacArthur Foundation', url: 'https://ellenmacarthurfoundation.org/', type: 'research' }]
  },
  {
    id: 'zw-packaging',
    slug: 'packaging-innovation',
    title: 'Packaging Innovation',
    description: {
      ELEMENTARY: 'Learn about cool new packaging that doesnt make trash!',
      MIDDLE_SCHOOL: 'Discover innovative packaging solutions from reusable to edible.',
      HIGH_SCHOOL: 'Explore sustainable packaging materials, design strategies, and refill systems.',
      UNDERGRADUATE: 'Analyze packaging lifecycle assessment, material selection, and circular design.',
      GRADUATE: 'Examine packaging policy, extended producer responsibility, and system innovation.',
      PHD: 'Research packaging material science, end-of-life systems, and behavior change.'
    },
    topic: 'zero-waste',
    category: 'DESIGN',
    icon: 'Package',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-pack-1', title: 'Better Packaging', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>No More Trash Packaging!</h2><p>Some packaging can be eaten, planted, or used again and again. No more throwing away!</p>', MIDDLE_SCHOOL: '<h2>Packaging Solutions</h2><p>Refill systems, compostable materials, edible packaging, and concentrated products reduce packaging waste.</p>', HIGH_SCHOOL: '<h2>Sustainable Packaging</h2><p>Lifecycle thinking, material selection, and design for recycling. Reuse systems are often better than recycling.</p>', UNDERGRADUATE: '<h2>Packaging LCA</h2><p>Comparing packaging options requires full lifecycle assessment - material production, transport, and end-of-life.</p>', GRADUATE: '<h2>System Change</h2><p>Extended producer responsibility, deposit return schemes, and reuse infrastructure.</p>', PHD: '<h2>Research Frontiers</h2><p>Novel bio-based materials, chemical recycling, and consumer behavior research.</p>' } }],
    activities: [{ id: 'zw-pack-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design Cool Packaging!', MIDDLE_SCHOOL: 'Package Makeover', HIGH_SCHOOL: 'Sustainable Design', UNDERGRADUATE: 'Packaging LCA', GRADUATE: 'System Redesign', PHD: 'Material Innovation' }, description: { ELEMENTARY: 'Create packaging that doesnt make trash!', MIDDLE_SCHOOL: 'Redesign wasteful packaging.', HIGH_SCHOOL: 'Design sustainable packaging.', UNDERGRADUATE: 'Compare packaging lifecycle impacts.', GRADUATE: 'Design a reuse system.', PHD: 'Develop new packaging materials.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-pack-game', type: 'simulation', title: 'Packaging Designer', description: 'Create innovative zero-waste packaging!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-pack-quiz', passingScore: 80, questions: [{ id: 'zwpackq1', question: { ELEMENTARY: 'What can some cool packaging do?', MIDDLE_SCHOOL: 'What is a refill system?', HIGH_SCHOOL: 'Why is reuse better than recycling?', UNDERGRADUATE: 'What is packaging LCA?', GRADUATE: 'What is EPR?', PHD: 'What is chemical recycling?' }, options: { ELEMENTARY: ['Be eaten or planted', 'Last forever', 'Fly away', 'Disappear by magic'], MIDDLE_SCHOOL: ['Bringing containers to fill again', 'Throwing away and buying new', 'Using once', 'Making more trash'], HIGH_SCHOOL: ['Uses less energy and materials', 'Makes more waste', 'Costs more', 'Is impossible'], UNDERGRADUATE: ['Full lifecycle impact assessment', 'Just the package', 'Only production', 'Only disposal'], GRADUATE: ['Extended Producer Responsibility', 'Extra Plastic Recycling', 'Emergency Package Response', 'Early Product Rejection'], PHD: ['Breaking polymers into monomers', 'Regular recycling', 'Burning plastic', 'Landfilling'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Some amazing packaging can be eaten like food or planted to grow flowers!', MIDDLE_SCHOOL: 'Refill systems let you bring your container back to fill it up again instead of buying new packaging.', HIGH_SCHOOL: 'Reuse keeps the whole package, while recycling requires energy to process and often degrades materials.', UNDERGRADUATE: 'Packaging LCA evaluates environmental impacts from raw material extraction through disposal.', GRADUATE: 'EPR makes producers responsible for end-of-life management of their packaging.', PHD: 'Chemical recycling breaks plastics back into chemical building blocks for new materials.' } }] },
    externalResources: [{ title: 'Sustainable Packaging', url: 'https://www.sustainablepackaging.org/', type: 'research' }]
  },
  {
    id: 'zw-construction',
    slug: 'construction-waste',
    title: 'Construction and Demolition Waste',
    description: {
      ELEMENTARY: 'Learn how building projects can make less trash!',
      MIDDLE_SCHOOL: 'Discover how construction sites reduce and recycle waste.',
      HIGH_SCHOOL: 'Explore construction waste management, deconstruction, and material recovery.',
      UNDERGRADUATE: 'Analyze C&D waste streams, diversion strategies, and economic factors.',
      GRADUATE: 'Examine deconstruction economics, material marketplaces, and policy frameworks.',
      PHD: 'Research construction circular economy, building material passports, and urban mining.'
    },
    topic: 'zero-waste',
    category: 'INDUSTRY',
    icon: 'HardHat',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-const-1', title: 'Building Without Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Less Trash from Building!</h2><p>When people build or tear down buildings, they can save materials instead of throwing them away!</p>', MIDDLE_SCHOOL: '<h2>Construction Recycling</h2><p>Wood, metal, concrete, and other building materials can be recycled or reused instead of landfilled.</p>', HIGH_SCHOOL: '<h2>Deconstruction</h2><p>Deconstruction carefully takes buildings apart to save materials. Its better than demolition which destroys everything.</p>', UNDERGRADUATE: '<h2>C&D Waste Management</h2><p>Source separation, material recovery facilities, and markets for recycled construction materials.</p>', GRADUATE: '<h2>Urban Mining</h2><p>Existing buildings are resource banks. Material passports track embedded materials for future recovery.</p>', PHD: '<h2>Research Frontiers</h2><p>Automated deconstruction, material tracking systems, and construction circular economy transitions.</p>' } }],
    activities: [{ id: 'zw-const-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Building Parts!', MIDDLE_SCHOOL: 'Construction Sort', HIGH_SCHOOL: 'Deconstruction Plan', UNDERGRADUATE: 'Waste Diversion', GRADUATE: 'Material Passport', PHD: 'Urban Mining Model' }, description: { ELEMENTARY: 'Keep building materials out of trash!', MIDDLE_SCHOOL: 'Sort construction waste for recycling.', HIGH_SCHOOL: 'Plan a building deconstruction.', UNDERGRADUATE: 'Design a C&D waste diversion plan.', GRADUATE: 'Create a building material passport.', PHD: 'Model urban mining potential.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-const-game', type: 'simulation', title: 'Deconstruction Expert', description: 'Recover valuable materials from buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-const-quiz', passingScore: 80, questions: [{ id: 'zwconstq1', question: { ELEMENTARY: 'What can we save from old buildings?', MIDDLE_SCHOOL: 'What can be recycled from construction?', HIGH_SCHOOL: 'Why is deconstruction better?', UNDERGRADUATE: 'What is source separation?', GRADUATE: 'What is a material passport?', PHD: 'What is urban mining?' }, options: { ELEMENTARY: ['Wood, metal, and bricks', 'Nothing useful', 'Only the paint', 'Just the windows'], MIDDLE_SCHOOL: ['Wood, metal, concrete, bricks', 'Nothing', 'Only paper', 'Only plastic'], HIGH_SCHOOL: ['Saves more materials than demolition', 'Its faster', 'Its cheaper always', 'Makes more noise'], UNDERGRADUATE: ['Sorting waste at the job site', 'Mixing everything together', 'Burning on site', 'Ignoring waste'], GRADUATE: ['Document of materials in a building', 'Travel document', 'Building permit', 'Insurance policy'], PHD: ['Extracting resources from the built environment', 'Digging underground', 'Mining mountains', 'Ocean mining'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old buildings have lots of useful stuff like wood, metal, and bricks that can be used again!', MIDDLE_SCHOOL: 'Construction waste includes recyclable wood, metal, concrete, bricks, cardboard, and more.', HIGH_SCHOOL: 'Deconstruction carefully removes materials intact for reuse, while demolition destroys them.', UNDERGRADUATE: 'Source separation at construction sites improves recycling rates and material quality.', GRADUATE: 'Material passports document what materials are in a building for future recovery.', PHD: 'Urban mining treats the built environment as a resource bank for material extraction.' } }] },
    externalResources: [{ title: 'C&D Recycling', url: 'https://www.cdrecycling.org/', type: 'research' }]
  },
  {
    id: 'zw-bio',
    slug: 'biomaterials',
    title: 'Biomaterials and Bioplastics',
    description: {
      ELEMENTARY: 'Learn about materials made from plants that go back to nature!',
      MIDDLE_SCHOOL: 'Discover materials made from plants and algae that can replace plastic.',
      HIGH_SCHOOL: 'Explore bio-based and biodegradable materials, applications, and limitations.',
      UNDERGRADUATE: 'Analyze biomaterial feedstocks, production, and end-of-life pathways.',
      GRADUATE: 'Examine biomaterial lifecycle impacts, certification, and market development.',
      PHD: 'Research advanced biomaterials, marine biodegradation, and systemic impacts.'
    },
    topic: 'zero-waste',
    category: 'MATERIALS',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-bio-1', title: 'Materials from Nature', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plant-Based Materials!</h2><p>We can make things from plants that return to the earth when were done, instead of plastic that lasts forever!</p>', MIDDLE_SCHOOL: '<h2>Bioplastics</h2><p>Bioplastics are made from plants like corn or sugarcane. Some can compost, while others just have plant-based origins.</p>', HIGH_SCHOOL: '<h2>Bio-based vs Biodegradable</h2><p>Bio-based means plant-derived. Biodegradable means it breaks down. These are different properties - a material can be one, both, or neither.</p>', UNDERGRADUATE: '<h2>Biomaterial Systems</h2><p>Feedstock sourcing, production pathways, properties, applications, and end-of-life infrastructure requirements.</p>', GRADUATE: '<h2>Critical Assessment</h2><p>Land use competition, industrial composting requirements, and lifecycle environmental impacts.</p>', PHD: '<h2>Research Frontiers</h2><p>Algae-based materials, marine biodegradation standards, and systems-level sustainability analysis.</p>' } }],
    activities: [{ id: 'zw-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Grow Your Materials!', MIDDLE_SCHOOL: 'Bioplastic Lab', HIGH_SCHOOL: 'Material Comparison', UNDERGRADUATE: 'LCA Analysis', GRADUATE: 'System Design', PHD: 'Research Protocol' }, description: { ELEMENTARY: 'Make materials from plants!', MIDDLE_SCHOOL: 'Create a simple bioplastic.', HIGH_SCHOOL: 'Compare bio vs fossil materials.', UNDERGRADUATE: 'Analyze biomaterial lifecycle.', GRADUATE: 'Design an end-of-life system.', PHD: 'Develop research protocols.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-bio-game', type: 'simulation', title: 'Biomaterial Designer', description: 'Create sustainable materials from nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-bio-quiz', passingScore: 80, questions: [{ id: 'zwbioq1', question: { ELEMENTARY: 'What are plant materials good at?', MIDDLE_SCHOOL: 'What are bioplastics made from?', HIGH_SCHOOL: 'Does bio-based mean biodegradable?', UNDERGRADUATE: 'What is needed for industrial composting?', GRADUATE: 'What is a land use concern?', PHD: 'Why is marine biodegradation important?' }, options: { ELEMENTARY: ['Going back to nature', 'Lasting forever', 'Being super hard', 'Floating in water'], MIDDLE_SCHOOL: ['Plants like corn and sugarcane', 'Oil', 'Rocks', 'Metal'], HIGH_SCHOOL: ['Not necessarily - they are different properties', 'Yes always', 'They mean the same thing', 'Bio-based never biodegrades'], UNDERGRADUATE: ['High heat and specific microbes', 'Just time', 'Ocean water', 'Regular landfill'], GRADUATE: ['Food vs material feedstock competition', 'Land is unlimited', 'No concerns', 'Only benefits'], PHD: ['Much plastic ends up in oceans', 'Oceans are clean', 'No plastic in oceans', 'Marine life eats plastic safely'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Materials from plants can break down and return to the earth, making less trash!', MIDDLE_SCHOOL: 'Bioplastics are made from plant materials like corn, sugarcane, or other biomass.', HIGH_SCHOOL: 'Bio-based means plant-derived; biodegradable means it breaks down. A material can be one without the other.', UNDERGRADUATE: 'Industrial composting requires controlled temperature, moisture, and specific microbial communities.', GRADUATE: 'Growing crops for materials may compete with food production for agricultural land.', PHD: 'Most plastic pollution reaches oceans, making marine biodegradation crucial for reducing impacts.' } }] },
    externalResources: [{ title: 'Bioplastics', url: 'https://www.european-bioplastics.org/', type: 'research' }]
  },
  {
    id: 'zw-lifecycle',
    slug: 'product-lifecycle',
    title: 'Product Lifecycle Thinking',
    description: {
      ELEMENTARY: 'Learn to think about where things come from and where they go!',
      MIDDLE_SCHOOL: 'Discover how to trace products from creation to disposal.',
      HIGH_SCHOOL: 'Explore lifecycle assessment, cradle-to-cradle design, and environmental footprints.',
      UNDERGRADUATE: 'Analyze LCA methodology, impact categories, and decision-making applications.',
      GRADUATE: 'Examine consequential LCA, uncertainty analysis, and policy applications.',
      PHD: 'Research LCA methodology advances, social LCA, and absolute sustainability assessment.'
    },
    topic: 'zero-waste',
    category: 'DESIGN',
    icon: 'GitBranch',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-life-1', title: 'Following the Journey', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Where Does Stuff Come From?</h2><p>Everything we use has a story - where it came from, how it was made, and where it goes when were done!</p>', MIDDLE_SCHOOL: '<h2>Product Stories</h2><p>Products travel from raw materials, through factories, to stores, to your home, and finally to disposal or recycling.</p>', HIGH_SCHOOL: '<h2>Lifecycle Assessment</h2><p>LCA tracks environmental impacts at every stage: raw materials, manufacturing, transport, use, and end-of-life.</p>', UNDERGRADUATE: '<h2>LCA Methodology</h2><p>Goal and scope, inventory analysis, impact assessment, and interpretation. ISO 14040/14044 standards.</p>', GRADUATE: '<h2>Advanced LCA</h2><p>Consequential vs attributional LCA, uncertainty analysis, and integration with decision-making.</p>', PHD: '<h2>Research Frontiers</h2><p>Social LCA, planetary boundaries integration, and absolute sustainability metrics.</p>' } }],
    activities: [{ id: 'zw-life-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Track Your Stuff!', MIDDLE_SCHOOL: 'Product Journey', HIGH_SCHOOL: 'Simple LCA', UNDERGRADUATE: 'Full LCA', GRADUATE: 'Uncertainty Analysis', PHD: 'Method Development' }, description: { ELEMENTARY: 'Follow where your things come from!', MIDDLE_SCHOOL: 'Map a products journey.', HIGH_SCHOOL: 'Conduct a simplified LCA.', UNDERGRADUATE: 'Perform a complete LCA study.', GRADUATE: 'Analyze LCA uncertainty.', PHD: 'Advance LCA methodology.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-life-game', type: 'simulation', title: 'Lifecycle Detective', description: 'Trace products through their entire journey!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-life-quiz', passingScore: 80, questions: [{ id: 'zwlifeq1', question: { ELEMENTARY: 'What is a products story?', MIDDLE_SCHOOL: 'What stages does a product go through?', HIGH_SCHOOL: 'What is LCA?', UNDERGRADUATE: 'What are LCA impact categories?', GRADUATE: 'What is consequential LCA?', PHD: 'What is social LCA?' }, options: { ELEMENTARY: ['Where it comes from and goes', 'Just its name', 'Only its color', 'How much it costs'], MIDDLE_SCHOOL: ['Raw materials, making, using, disposal', 'Just buying it', 'Only the store', 'Only at home'], HIGH_SCHOOL: ['Lifecycle Assessment of environmental impacts', 'Life changing adventure', 'Large container area', 'Last call alert'], UNDERGRADUATE: ['Types of environmental effects measured', 'Product categories', 'Store sections', 'No categories'], GRADUATE: ['Assessing system-wide change effects', 'Following one product', 'No consequences', 'Simple accounting'], PHD: ['Assessing social and labor impacts', 'Only environment', 'No people', 'Technology only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Every product has a story of where it came from, how it was made, and where it goes!', MIDDLE_SCHOOL: 'Products go from raw materials, through manufacturing, to stores, homes, and finally disposal or recycling.', HIGH_SCHOOL: 'LCA (Lifecycle Assessment) measures environmental impacts across a products entire life.', UNDERGRADUATE: 'Impact categories include climate change, water use, toxicity, resource depletion, and more.', GRADUATE: 'Consequential LCA models the system-wide effects of decisions, including market responses.', PHD: 'Social LCA extends lifecycle thinking to human rights, labor conditions, and community impacts.' } }] },
    externalResources: [{ title: 'LCA Resources', url: 'https://www.lifecycleinitiative.org/', type: 'research' }]
  },
  {
    id: 'zw-community',
    slug: 'zero-waste-communities',
    title: 'Zero Waste Communities',
    description: {
      ELEMENTARY: 'Learn how whole towns can work together to make almost no trash!',
      MIDDLE_SCHOOL: 'Discover how communities are achieving zero waste goals together.',
      HIGH_SCHOOL: 'Explore zero waste city strategies, community programs, and behavior change.',
      UNDERGRADUATE: 'Analyze municipal waste systems, diversion metrics, and implementation strategies.',
      GRADUATE: 'Examine zero waste policy, informal sector integration, and just transitions.',
      PHD: 'Research urban metabolism, waste governance, and social practice change.'
    },
    topic: 'zero-waste',
    category: 'COMMUNITY',
    icon: 'Users',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-comm-1', title: 'Towns Without Trash', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Whole Towns Going Zero Waste!</h2><p>When everyone in a town works together, they can recycle and compost almost everything!</p>', MIDDLE_SCHOOL: '<h2>Zero Waste Cities</h2><p>Cities like San Francisco and Kamikatsu, Japan are working to send nothing to landfills through recycling, composting, and reducing waste.</p>', HIGH_SCHOOL: '<h2>Community Programs</h2><p>Pay-as-you-throw, curbside composting, repair cafes, tool libraries, and education campaigns.</p>', UNDERGRADUATE: '<h2>Municipal Systems</h2><p>Waste characterization, collection systems, processing infrastructure, and measuring diversion rates.</p>', GRADUATE: '<h2>Policy and Justice</h2><p>Zero waste policy frameworks, waste picker integration, and ensuring just transitions.</p>', PHD: '<h2>Research Frontiers</h2><p>Urban metabolism, waste governance models, and social practice theory applications.</p>' } }],
    activities: [{ id: 'zw-comm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Zero Waste Town!', MIDDLE_SCHOOL: 'Community Plan', HIGH_SCHOOL: 'City Strategy', UNDERGRADUATE: 'System Design', GRADUATE: 'Policy Framework', PHD: 'Governance Model' }, description: { ELEMENTARY: 'Help a town make no trash!', MIDDLE_SCHOOL: 'Create a community waste plan.', HIGH_SCHOOL: 'Design a zero waste city strategy.', UNDERGRADUATE: 'Design a municipal waste system.', GRADUATE: 'Develop zero waste policy.', PHD: 'Model waste governance systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-comm-game', type: 'simulation', title: 'Zero Waste Mayor', description: 'Lead your community to zero waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-comm-quiz', passingScore: 80, questions: [{ id: 'zwcommq1', question: { ELEMENTARY: 'How do towns make less trash?', MIDDLE_SCHOOL: 'What city is famous for zero waste?', HIGH_SCHOOL: 'What is pay-as-you-throw?', UNDERGRADUATE: 'What is waste characterization?', GRADUATE: 'Why integrate informal waste workers?', PHD: 'What is urban metabolism?' }, options: { ELEMENTARY: ['Everyone works together to recycle', 'They make more trash', 'They hide the trash', 'They burn everything'], MIDDLE_SCHOOL: ['San Francisco and Kamikatsu', 'Only big cities', 'No cities do this', 'Only rich cities'], HIGH_SCHOOL: ['Paying based on trash amount', 'Free trash service', 'Pay for recycling', 'No payment needed'], UNDERGRADUATE: ['Studying whats in the waste stream', 'Describing trash cans', 'Naming landfills', 'Counting trucks'], GRADUATE: ['They already do valuable work and deserve rights', 'They dont help', 'Ignore them', 'Replace with machines'], PHD: ['Flows of materials and energy through cities', 'City eating habits', 'Building metabolism', 'Traffic flow only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When everyone in a town recycles, composts, and reduces together, almost no trash goes to landfills!', MIDDLE_SCHOOL: 'San Francisco, USA and Kamikatsu, Japan are famous for their zero waste achievements.', HIGH_SCHOOL: 'Pay-as-you-throw charges based on trash volume, encouraging waste reduction.', UNDERGRADUATE: 'Waste characterization analyzes what materials are in the waste stream to guide programs.', GRADUATE: 'Informal waste workers provide recycling services and deserve dignified integration into formal systems.', PHD: 'Urban metabolism studies how materials and energy flow through cities like nutrients through ecosystems.' } }] },
    externalResources: [{ title: 'Zero Waste Cities', url: 'https://zerowasteworld.org/', type: 'research' }]
  },
  {
    id: 'zw-food-waste',
    slug: 'food-waste-prevention',
    title: 'Food Waste Prevention',
    description: {
      ELEMENTARY: 'Learn how to save food from becoming trash and help the planet!',
      MIDDLE_SCHOOL: 'Discover strategies to reduce food waste at home, school, and in your community.',
      HIGH_SCHOOL: 'Explore food waste causes, prevention strategies, and the food recovery hierarchy.',
      UNDERGRADUATE: 'Analyze food loss across supply chains, measurement methodologies, and intervention strategies.',
      GRADUATE: 'Examine behavioral economics of food waste, policy instruments, and systemic solutions.',
      PHD: 'Research food waste quantification, multi-stakeholder governance, and transformative interventions.'
    },
    topic: 'zero-waste',
    category: 'PREVENTION',
    icon: 'Apple',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-food-1', title: 'Saving Our Food', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Food Heroes!</h2><p>So much good food gets thrown away! We can be food heroes by eating leftovers, planning meals, and sharing extra food.</p>', MIDDLE_SCHOOL: '<h2>Food Waste Crisis</h2><p>About one-third of all food is wasted globally. This wastes water, land, and energy while creating methane in landfills.</p>', HIGH_SCHOOL: '<h2>Food Recovery Hierarchy</h2><p>Source reduction, feeding hungry people, feeding animals, industrial uses, composting, and landfill - in that order of priority.</p>', UNDERGRADUATE: '<h2>Supply Chain Loss</h2><p>Food loss occurs at production, handling, processing, distribution, and consumption. Different interventions target each stage.</p>', GRADUATE: '<h2>Behavioral Interventions</h2><p>Nudges, information campaigns, food labeling, and institutional changes that address psychological drivers of waste.</p>', PHD: '<h2>Systems Transformation</h2><p>Multi-level governance, retailer-producer-consumer dynamics, and pathways to structural food system change.</p>' } }],
    activities: [{ id: 'zw-food-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Food Rescue!', MIDDLE_SCHOOL: 'Waste Audit', HIGH_SCHOOL: 'Prevention Plan', UNDERGRADUATE: 'Supply Chain Analysis', GRADUATE: 'Intervention Design', PHD: 'Systems Modeling' }, description: { ELEMENTARY: 'Save food from being wasted!', MIDDLE_SCHOOL: 'Audit and reduce your food waste.', HIGH_SCHOOL: 'Create a food waste prevention plan.', UNDERGRADUATE: 'Analyze food loss points.', GRADUATE: 'Design behavioral interventions.', PHD: 'Model food system transformation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-food-game', type: 'simulation', title: 'Food Rescue Hero', description: 'Save food from going to waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-food-quiz', passingScore: 80, questions: [{ id: 'zwfoodq1', question: { ELEMENTARY: 'How can we save food?', MIDDLE_SCHOOL: 'How much food is wasted globally?', HIGH_SCHOOL: 'What is the top food recovery priority?', UNDERGRADUATE: 'Where does food loss occur?', GRADUATE: 'What are behavioral nudges?', PHD: 'What is multi-level governance?' }, options: { ELEMENTARY: ['Eat leftovers and plan meals', 'Throw away old food', 'Buy lots of extra food', 'Hide food in the trash'], MIDDLE_SCHOOL: ['About one-third', 'Almost none', 'All of it', 'Only spoiled food'], HIGH_SCHOOL: ['Source reduction - prevent waste first', 'Composting', 'Landfilling', 'Burning'], UNDERGRADUATE: ['At every supply chain stage', 'Only in homes', 'Only in stores', 'Only on farms'], GRADUATE: ['Small changes that influence decisions', 'Pushing people', 'Forcing behavior', 'No changes'], PHD: ['Coordination across scales', 'Single level rules', 'No governance', 'Top-down only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We can save food by eating leftovers, planning our meals, and not buying more than we need!', MIDDLE_SCHOOL: 'About one-third of all food produced globally is lost or wasted each year.', HIGH_SCHOOL: 'The food recovery hierarchy prioritizes preventing waste first, then feeding people, then other uses.', UNDERGRADUATE: 'Food loss occurs throughout the supply chain from farm to fork, requiring targeted interventions.', GRADUATE: 'Nudges are small environmental changes that make sustainable choices easier and more automatic.', PHD: 'Multi-level governance coordinates food waste policy across international, national, and local scales.' } }] },
    externalResources: [{ title: 'WRAP Food Waste', url: 'https://wrap.org.uk/food-drink', type: 'research' }]
  },
  {
    id: 'zw-plastic-alternatives',
    slug: 'plastic-alternatives',
    title: 'Plastic Alternatives',
    description: {
      ELEMENTARY: 'Discover amazing materials that can replace plastic and protect our oceans!',
      MIDDLE_SCHOOL: 'Learn about alternatives to plastic and how to choose better materials.',
      HIGH_SCHOOL: 'Explore plastic substitutes, their properties, applications, and environmental trade-offs.',
      UNDERGRADUATE: 'Analyze alternative material systems, performance characteristics, and life cycle implications.',
      GRADUATE: 'Examine plastic substitution pathways, systems effects, and transition strategies.',
      PHD: 'Research material innovation, systemic plastic reduction, and post-plastic futures.'
    },
    topic: 'zero-waste',
    category: 'MATERIALS',
    icon: 'Package',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-plastic-1', title: 'Beyond Plastic', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Better Than Plastic!</h2><p>We can use glass, metal, paper, bamboo, and other natural materials instead of plastic. They are safer for animals and oceans!</p>', MIDDLE_SCHOOL: '<h2>Plastic Replacements</h2><p>Glass, metal, bamboo, paper, beeswax wraps, silicone, and natural fibers can replace many plastic items.</p>', HIGH_SCHOOL: '<h2>Material Trade-offs</h2><p>Each alternative has pros and cons: weight, durability, recyclability, production impacts, and end-of-life options.</p>', UNDERGRADUATE: '<h2>Material Systems</h2><p>Functional analysis, material properties, supply chains, infrastructure needs, and true lifecycle comparisons.</p>', GRADUATE: '<h2>Transition Pathways</h2><p>Substitution cascades, rebound effects, and managing transitions away from plastic dependence.</p>', PHD: '<h2>Post-Plastic Futures</h2><p>Radical material innovation, systemic redesign, and imagining economies beyond petrochemical materials.</p>' } }],
    activities: [{ id: 'zw-plastic-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Swap the Plastic!', MIDDLE_SCHOOL: 'Material Match', HIGH_SCHOOL: 'Trade-off Analysis', UNDERGRADUATE: 'System Comparison', GRADUATE: 'Transition Plan', PHD: 'Future Scenarios' }, description: { ELEMENTARY: 'Find better materials than plastic!', MIDDLE_SCHOOL: 'Match plastic items with alternatives.', HIGH_SCHOOL: 'Analyze material trade-offs.', UNDERGRADUATE: 'Compare material systems.', GRADUATE: 'Design plastic reduction pathways.', PHD: 'Model post-plastic scenarios.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-plastic-game', type: 'simulation', title: 'Plastic-Free Challenge', description: 'Find alternatives to plastic products!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-plastic-quiz', passingScore: 80, questions: [{ id: 'zwplastq1', question: { ELEMENTARY: 'What can replace plastic bags?', MIDDLE_SCHOOL: 'What is a plastic alternative for wrapping food?', HIGH_SCHOOL: 'Why consider material trade-offs?', UNDERGRADUATE: 'What is functional analysis?', GRADUATE: 'What is a rebound effect?', PHD: 'What are post-plastic futures?' }, options: { ELEMENTARY: ['Cloth bags and paper bags', 'More plastic bags', 'Nothing', 'Throwing things away'], MIDDLE_SCHOOL: ['Beeswax wraps', 'More plastic wrap', 'Foil only', 'Nothing works'], HIGH_SCHOOL: ['Each alternative has different impacts', 'All alternatives are perfect', 'Plastic is always worse', 'No need to think'], UNDERGRADUATE: ['Studying what function a material serves', 'Checking if it works', 'Random testing', 'No analysis needed'], GRADUATE: ['When alternatives cause new problems', 'Only positive effects', 'No effects', 'Simple replacement'], PHD: ['Economies and cultures beyond petrochemical materials', 'Same as today', 'More plastic', 'No change possible'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Cloth bags are reusable and paper bags are recyclable - much better than plastic!', MIDDLE_SCHOOL: 'Beeswax wraps are reusable, natural, and can replace plastic wrap for many foods.', HIGH_SCHOOL: 'Each material alternative has different production impacts, durability, and end-of-life options.', UNDERGRADUATE: 'Functional analysis identifies what purpose a material serves, enabling appropriate substitution.', GRADUATE: 'Rebound effects occur when alternatives create new environmental problems or increase consumption.', PHD: 'Post-plastic futures envision economic and social systems designed without petrochemical dependencies.' } }] },
    externalResources: [{ title: 'Plastic Free Foundation', url: 'https://www.plasticfreefoundation.org/', type: 'research' }]
  },
  {
    id: 'zw-sharing-economy',
    slug: 'sharing-economy',
    title: 'Sharing Economy',
    description: {
      ELEMENTARY: 'Learn how sharing things means we need fewer things and make less waste!',
      MIDDLE_SCHOOL: 'Discover sharing libraries, tool shares, and how sharing reduces consumption.',
      HIGH_SCHOOL: 'Explore sharing platforms, collaborative consumption, and access over ownership models.',
      UNDERGRADUATE: 'Analyze sharing economy business models, platform dynamics, and sustainability impacts.',
      GRADUATE: 'Examine sharing economy governance, labor implications, and systemic environmental effects.',
      PHD: 'Research platform cooperativism, commons-based peer production, and post-ownership transitions.'
    },
    topic: 'zero-waste',
    category: 'SYSTEMS',
    icon: 'Share2',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-share-1', title: 'Sharing is Caring', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Sharing Power!</h2><p>When we share things like toys, tools, and books, we dont all need to buy our own. Less buying means less waste!</p>', MIDDLE_SCHOOL: '<h2>Sharing Systems</h2><p>Tool libraries, toy swaps, clothing exchanges, and ride sharing let many people use things instead of each buying their own.</p>', HIGH_SCHOOL: '<h2>Access Over Ownership</h2><p>Instead of owning rarely-used items, access-based models let us use things when needed without the waste of individual ownership.</p>', UNDERGRADUATE: '<h2>Platform Dynamics</h2><p>Two-sided markets, network effects, trust mechanisms, and the business models driving collaborative consumption.</p>', GRADUATE: '<h2>Critical Analysis</h2><p>Labor conditions, regulatory challenges, true environmental impacts, and when sharing actually reduces consumption.</p>', PHD: '<h2>Alternative Models</h2><p>Platform cooperativism, commons governance, and building sharing systems that prioritize sustainability over growth.</p>' } }],
    activities: [{ id: 'zw-share-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Share Swap!', MIDDLE_SCHOOL: 'Tool Library', HIGH_SCHOOL: 'Sharing Platform', UNDERGRADUATE: 'Business Model', GRADUATE: 'Impact Assessment', PHD: 'Cooperative Design' }, description: { ELEMENTARY: 'Share and swap to reduce waste!', MIDDLE_SCHOOL: 'Create a sharing system.', HIGH_SCHOOL: 'Design a sharing platform.', UNDERGRADUATE: 'Analyze sharing business models.', GRADUATE: 'Assess environmental impacts.', PHD: 'Design cooperative platforms.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-share-game', type: 'simulation', title: 'Share Economy Builder', description: 'Build a community sharing network!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-share-quiz', passingScore: 80, questions: [{ id: 'zwshareq1', question: { ELEMENTARY: 'Why is sharing good for the planet?', MIDDLE_SCHOOL: 'What is a tool library?', HIGH_SCHOOL: 'What is access over ownership?', UNDERGRADUATE: 'What are network effects?', GRADUATE: 'What is a sharing economy concern?', PHD: 'What is platform cooperativism?' }, options: { ELEMENTARY: ['Less buying means less waste', 'More buying is better', 'Keep everything for yourself', 'Throw away more'], MIDDLE_SCHOOL: ['A place to borrow tools instead of buying', 'A place to read about tools', 'A store that sells tools', 'A tool factory'], HIGH_SCHOOL: ['Using things when needed without owning', 'Owning everything possible', 'Never using things', 'Only renting cars'], UNDERGRADUATE: ['Platforms become more valuable with more users', 'Fewer users is better', 'Size doesnt matter', 'No effects'], GRADUATE: ['Labor conditions and actual impact', 'Everything is perfect', 'No concerns', 'Only benefits'], PHD: ['Worker-owned platforms', 'Investor-owned only', 'Government platforms', 'No platforms'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When we share, fewer things need to be made, which means less waste and a happier planet!', MIDDLE_SCHOOL: 'A tool library lets people borrow tools they only need occasionally, reducing waste.', HIGH_SCHOOL: 'Access-based models provide benefits of use without waste of individual ownership.', UNDERGRADUATE: 'Network effects mean platforms become more valuable as more users join, creating growth dynamics.', GRADUATE: 'Critical analysis examines labor practices, regulatory gaps, and whether sharing truly reduces environmental impact.', PHD: 'Platform cooperativism develops sharing platforms owned and governed by workers and users.' } }] },
    externalResources: [{ title: 'Shareable', url: 'https://www.shareable.net/', type: 'research' }]
  },
  {
    id: 'zw-waste-energy',
    slug: 'waste-to-energy',
    title: 'Waste-to-Energy',
    description: {
      ELEMENTARY: 'Learn how some trash can be turned into energy instead of sitting in a dump!',
      MIDDLE_SCHOOL: 'Discover how waste can generate electricity and heat through different technologies.',
      HIGH_SCHOOL: 'Explore incineration, anaerobic digestion, gasification, and their role in waste management.',
      UNDERGRADUATE: 'Analyze waste-to-energy technologies, efficiency metrics, emissions, and system integration.',
      GRADUATE: 'Examine waste hierarchy conflicts, carbon accounting, and waste-to-energy policy debates.',
      PHD: 'Research advanced conversion technologies, lock-in effects, and circular economy compatibility.'
    },
    topic: 'zero-waste',
    category: 'TECHNOLOGY',
    icon: 'Flame',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-wte-1', title: 'Energy From Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Trash Power!</h2><p>Some trash that cant be recycled can be safely burned to make electricity. Its better than just burying it!</p>', MIDDLE_SCHOOL: '<h2>Waste-to-Energy Systems</h2><p>Incinerators burn waste to make electricity. Anaerobic digesters use bacteria to make biogas from food waste.</p>', HIGH_SCHOOL: '<h2>Conversion Technologies</h2><p>Mass burn incineration, refuse-derived fuel, anaerobic digestion, gasification, and pyrolysis each have different applications.</p>', UNDERGRADUATE: '<h2>Technical Analysis</h2><p>Energy efficiency, emissions control, residue management, and grid integration of waste-to-energy facilities.</p>', GRADUATE: '<h2>Policy Debates</h2><p>Waste hierarchy conflicts, renewable energy classification, carbon accounting, and infrastructure lock-in concerns.</p>', PHD: '<h2>Future Directions</h2><p>Chemical recycling, carbon capture integration, and waste-to-energy role in circular economy transitions.</p>' } }],
    activities: [{ id: 'zw-wte-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Power Plant!', MIDDLE_SCHOOL: 'Biogas Maker', HIGH_SCHOOL: 'Technology Compare', UNDERGRADUATE: 'Facility Design', GRADUATE: 'Policy Analysis', PHD: 'Systems Integration' }, description: { ELEMENTARY: 'Turn trash into electricity!', MIDDLE_SCHOOL: 'Generate biogas from waste.', HIGH_SCHOOL: 'Compare WTE technologies.', UNDERGRADUATE: 'Design a WTE facility.', GRADUATE: 'Analyze WTE policy debates.', PHD: 'Model circular economy integration.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-wte-game', type: 'simulation', title: 'Waste Energy Manager', description: 'Turn waste into clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-wte-quiz', passingScore: 80, questions: [{ id: 'zwwteq1', question: { ELEMENTARY: 'What can we make from trash?', MIDDLE_SCHOOL: 'What is anaerobic digestion?', HIGH_SCHOOL: 'What is gasification?', UNDERGRADUATE: 'What are WTE emissions concerns?', GRADUATE: 'What is infrastructure lock-in?', PHD: 'How does WTE fit circular economy?' }, options: { ELEMENTARY: ['Electricity', 'More trash', 'Nothing useful', 'Gold'], MIDDLE_SCHOOL: ['Bacteria breaking down waste to make biogas', 'Burning trash', 'Burying waste', 'Washing waste'], HIGH_SCHOOL: ['Heating waste with limited oxygen to make syngas', 'Open burning', 'Regular burning', 'Freezing waste'], UNDERGRADUATE: ['Air pollutants and residue toxicity', 'No concerns', 'Only benefits', 'Perfect process'], GRADUATE: ['Long-term dependence on waste supply', 'Free to change', 'No lock-in', 'Flexible systems'], PHD: ['Controversial - may compete with recycling', 'Perfect fit', 'No relationship', 'Always helpful'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Trash that cant be recycled can be safely burned to make electricity for homes and schools!', MIDDLE_SCHOOL: 'Anaerobic digestion uses bacteria to break down organic waste and produce biogas fuel.', HIGH_SCHOOL: 'Gasification heats waste with limited oxygen to produce synthesis gas for energy.', UNDERGRADUATE: 'WTE facilities must control air emissions and safely manage toxic ash residues.', GRADUATE: 'Large WTE investments may create dependency on waste streams, competing with reduction goals.', PHD: 'WTE relationship to circular economy is contested - it diverts from landfill but may discourage recycling.' } }] },
    externalResources: [{ title: 'Energy Recovery Council', url: 'https://energyrecoverycouncil.org/', type: 'research' }]
  },
  {
    id: 'zw-epr',
    slug: 'extended-producer-responsibility',
    title: 'Extended Producer Responsibility',
    description: {
      ELEMENTARY: 'Learn how companies should help clean up the packaging and products they make!',
      MIDDLE_SCHOOL: 'Discover how Extended Producer Responsibility makes companies responsible for their products end of life.',
      HIGH_SCHOOL: 'Explore EPR policy design, producer responsibility organizations, and fee structures.',
      UNDERGRADUATE: 'Analyze EPR economics, system design, performance metrics, and international comparisons.',
      GRADUATE: 'Examine EPR governance models, fee modulation, and integration with circular economy policy.',
      PHD: 'Research EPR effectiveness evaluation, political economy, and next-generation policy design.'
    },
    topic: 'zero-waste',
    category: 'POLICY',
    icon: 'FileCheck',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-epr-1', title: 'Maker Responsibility', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Companies Clean Up!</h2><p>If a company makes something with packaging, they should help recycle it! Thats called producer responsibility.</p>', MIDDLE_SCHOOL: '<h2>Extended Producer Responsibility</h2><p>EPR laws make companies pay for recycling their products and packaging. This encourages them to design for recyclability.</p>', HIGH_SCHOOL: '<h2>EPR Systems</h2><p>Producer responsibility organizations, eco-fees, collection networks, and the incentives created by different EPR designs.</p>', UNDERGRADUATE: '<h2>EPR Economics</h2><p>Cost internalization, fee structures, competition effects, and measuring EPR system performance.</p>', GRADUATE: '<h2>Policy Design</h2><p>Fee modulation for eco-design, governance models, free-rider prevention, and harmonization challenges.</p>', PHD: '<h2>Effectiveness Research</h2><p>Causal evaluation, political economy of EPR adoption, and designing next-generation producer responsibility.</p>' } }],
    activities: [{ id: 'zw-epr-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Clean Up Game!', MIDDLE_SCHOOL: 'EPR Designer', HIGH_SCHOOL: 'Fee Calculator', UNDERGRADUATE: 'System Analysis', GRADUATE: 'Policy Design', PHD: 'Evaluation Study' }, description: { ELEMENTARY: 'Help companies clean up!', MIDDLE_SCHOOL: 'Design an EPR system.', HIGH_SCHOOL: 'Calculate EPR fees.', UNDERGRADUATE: 'Analyze EPR effectiveness.', GRADUATE: 'Design EPR policy.', PHD: 'Evaluate EPR outcomes.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-epr-game', type: 'simulation', title: 'EPR Policy Maker', description: 'Design producer responsibility systems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-epr-quiz', passingScore: 80, questions: [{ id: 'zweprq1', question: { ELEMENTARY: 'Who should help recycle packaging?', MIDDLE_SCHOOL: 'What does EPR stand for?', HIGH_SCHOOL: 'What is a PRO?', UNDERGRADUATE: 'What is cost internalization?', GRADUATE: 'What is fee modulation?', PHD: 'What is EPR political economy?' }, options: { ELEMENTARY: ['The companies that made it', 'Only the people who buy it', 'Nobody', 'The garbage truck'], MIDDLE_SCHOOL: ['Extended Producer Responsibility', 'Extra Plastic Recycling', 'Everyone Pays Regularly', 'Easy Product Returns'], HIGH_SCHOOL: ['Producer Responsibility Organization', 'Public Relations Office', 'Product Return Office', 'Plastic Recycling Only'], UNDERGRADUATE: ['Making producers pay for end-of-life costs', 'Hiding costs', 'Government pays all', 'No costs'], GRADUATE: ['Varying fees based on recyclability', 'Flat fees only', 'No fee variation', 'Random fees'], PHD: ['How interests shape EPR adoption and design', 'No politics involved', 'Pure technical design', 'Only economics'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Companies that make products and packaging should help pay for recycling them!', MIDDLE_SCHOOL: 'EPR stands for Extended Producer Responsibility - making producers responsible for their products entire lifecycle.', HIGH_SCHOOL: 'PROs are Producer Responsibility Organizations that manage collection and recycling on behalf of companies.', UNDERGRADUATE: 'Cost internalization means making producers pay the true environmental costs of their products.', GRADUATE: 'Fee modulation charges lower fees for recyclable products, incentivizing eco-design.', PHD: 'Political economy examines how industry lobbying, bureaucratic interests, and public pressure shape EPR policy.' } }] },
    externalResources: [{ title: 'OECD EPR Guide', url: 'https://www.oecd.org/environment/extended-producer-responsibility.htm', type: 'research' }]
  },
  {
    id: 'zw-textiles',
    slug: 'textile-waste-fashion',
    title: 'Textile Waste and Sustainable Fashion',
    description: {
      ELEMENTARY: 'Learn why fast fashion creates waste and how to make clothes last longer!',
      MIDDLE_SCHOOL: 'Discover the problem of textile waste and sustainable fashion choices.',
      HIGH_SCHOOL: 'Explore clothing lifecycle, textile recycling, and fashion sustainability.',
      UNDERGRADUATE: 'Analyze textile industry impacts, circular fashion, and fiber-to-fiber recycling.',
      GRADUATE: 'Examine fashion policy, supply chain transparency, and business model innovation.',
      PHD: 'Research textile systems transformation, chemical recycling, and consumer behavior.'
    },
    topic: 'zero-waste',
    category: 'MATERIALS',
    icon: 'Shirt',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-text-1', title: 'Fashion and Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clothes That Last!</h2><p>Buying fewer, better clothes and taking care of them reduces waste!</p>', MIDDLE_SCHOOL: '<h2>Textile Waste Problem</h2><p>Fast fashion produces cheap clothes people throw away quickly. This creates mountains of textile waste.</p>', HIGH_SCHOOL: '<h2>Fashion Lifecycle</h2><p>Most clothes end up in landfills. Recycling, resale, and rental can extend their life.</p>', UNDERGRADUATE: '<h2>Circular Fashion</h2><p>Design for durability, take-back programs, resale platforms, and fiber-to-fiber recycling.</p>', GRADUATE: '<h2>System Change</h2><p>Extended producer responsibility, transparency requirements, and sustainable business models.</p>', PHD: '<h2>Research Frontiers</h2><p>Chemical recycling technology, consumer behavior, and textile systems transformation.</p>' } }],
    activities: [{ id: 'zw-text-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Care for Clothes!', MIDDLE_SCHOOL: 'Wardrobe Audit', HIGH_SCHOOL: 'Lifecycle Analysis', UNDERGRADUATE: 'Circular Design', GRADUATE: 'Policy Development', PHD: 'Systems Research' }, description: { ELEMENTARY: 'Make clothes last longer!', MIDDLE_SCHOOL: 'Audit your wardrobe impact.', HIGH_SCHOOL: 'Analyze clothing lifecycle.', UNDERGRADUATE: 'Design circular fashion.', GRADUATE: 'Develop fashion policy.', PHD: 'Research textile systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-text-game', type: 'simulation', title: 'Fashion Saver', description: 'Build a sustainable wardrobe!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-text-quiz', passingScore: 80, questions: [{ id: 'zwtextq1', question: { ELEMENTARY: 'How can we waste less clothing?', MIDDLE_SCHOOL: 'What is fast fashion?', HIGH_SCHOOL: 'Where do most old clothes go?', UNDERGRADUATE: 'What is fiber-to-fiber recycling?', GRADUATE: 'What is textile EPR?', PHD: 'What is chemical recycling?' }, options: { ELEMENTARY: ['Buy less and take care of clothes', 'Buy lots of new clothes', 'Throw clothes away', 'Only wear new things'], MIDDLE_SCHOOL: ['Cheap trendy clothes made to throw away', 'Quickly made quality clothes', 'Athletic clothing', 'No such thing'], HIGH_SCHOOL: ['Landfills', 'All recycled', 'All donated', 'All composted'], UNDERGRADUATE: ['Breaking textiles down to make new fibers', 'Cutting up clothes', 'Fiber optics', 'No such process'], GRADUATE: ['Producers responsible for clothing end-of-life', 'No responsibility', 'Only consumers', 'Government pays'], PHD: ['Using chemicals to break polymers into monomers', 'Physical recycling', 'Chemical dyeing', 'No such technology'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We can waste less by buying fewer, better clothes and taking good care of them!', MIDDLE_SCHOOL: 'Fast fashion produces cheap trendy clothes meant to be worn briefly then discarded.', HIGH_SCHOOL: 'Most discarded clothing ends up in landfills because textile recycling is limited.', UNDERGRADUATE: 'Fiber-to-fiber recycling breaks down textiles to create new fibers for clothing.', GRADUATE: 'Textile EPR makes fashion brands responsible for collecting and recycling old clothes.', PHD: 'Chemical recycling breaks polymers into building blocks to create virgin-quality fibers.' } }] },
    externalResources: [{ title: 'Sustainable Fashion', url: 'https://www.ellenmacarthurfoundation.org/topics/fashion/overview', type: 'research' }]
  },
  {
    id: 'zw-ewaste',
    slug: 'electronic-waste',
    title: 'Electronic Waste',
    description: {
      ELEMENTARY: 'Learn why old phones and computers should not go in the trash!',
      MIDDLE_SCHOOL: 'Discover e-waste problems and proper electronics disposal.',
      HIGH_SCHOOL: 'Explore e-waste composition, toxicity, and recycling challenges.',
      UNDERGRADUATE: 'Analyze e-waste flows, precious metal recovery, and informal recycling.',
      GRADUATE: 'Examine e-waste policy, international trade, and extended producer responsibility.',
      PHD: 'Research urban mining, critical materials, and e-waste system transformation.'
    },
    topic: 'zero-waste',
    category: 'TECHNOLOGY',
    icon: 'Smartphone',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-ew-1', title: 'Electronics Recycling', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Recycle Electronics!</h2><p>Old phones, computers, and TVs have valuable materials inside. They need special recycling, not the trash!</p>', MIDDLE_SCHOOL: '<h2>E-Waste Problem</h2><p>Electronics contain hazardous materials and valuable metals. Improper disposal wastes resources and harms health.</p>', HIGH_SCHOOL: '<h2>E-Waste Composition</h2><p>Circuit boards contain gold, copper, and rare earths. Batteries and screens contain toxic materials.</p>', UNDERGRADUATE: '<h2>Recovery Systems</h2><p>Collection programs, disassembly, precious metal recovery, and the economics of e-waste recycling.</p>', GRADUATE: '<h2>Global Flows</h2><p>International e-waste trade, informal sector recycling, and policy approaches.</p>', PHD: '<h2>Research Frontiers</h2><p>Urban mining, critical material recovery, and designing for recyclability.</p>' } }],
    activities: [{ id: 'zw-ew-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Recycle Devices!', MIDDLE_SCHOOL: 'E-Waste Hunt', HIGH_SCHOOL: 'Material Recovery', UNDERGRADUATE: 'System Design', GRADUATE: 'Policy Analysis', PHD: 'Urban Mining' }, description: { ELEMENTARY: 'Learn to recycle electronics!', MIDDLE_SCHOOL: 'Find e-waste in your home.', HIGH_SCHOOL: 'Recover valuable materials.', UNDERGRADUATE: 'Design e-waste systems.', GRADUATE: 'Analyze e-waste policy.', PHD: 'Research urban mining.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-ew-game', type: 'simulation', title: 'E-Waste Manager', description: 'Properly handle electronic waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-ew-quiz', passingScore: 80, questions: [{ id: 'zwewq1', question: { ELEMENTARY: 'Why not throw phones in trash?', MIDDLE_SCHOOL: 'What is in electronics?', HIGH_SCHOOL: 'What makes e-waste valuable?', UNDERGRADUATE: 'What is urban mining?', GRADUATE: 'What is informal recycling?', PHD: 'What are critical materials?' }, options: { ELEMENTARY: ['They need special recycling', 'They belong in trash', 'They disappear', 'Trash is fine'], MIDDLE_SCHOOL: ['Valuable metals and hazardous materials', 'Only plastic', 'Nothing special', 'Just glass'], HIGH_SCHOOL: ['Gold, copper, and rare earth metals', 'No value', 'Only plastic', 'Just weight'], UNDERGRADUATE: ['Recovering materials from waste instead of mining', 'Mining in cities', 'Virtual mining', 'No such concept'], GRADUATE: ['Unregulated e-waste processing', 'Professional recycling', 'No recycling', 'Government recycling'], PHD: ['Materials essential for technology with supply risks', 'Any materials', 'Dangerous materials', 'Cheap materials'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electronics have valuable materials and need special recycling, not regular trash!', MIDDLE_SCHOOL: 'Electronics contain valuable metals like gold and copper plus hazardous materials.', HIGH_SCHOOL: 'E-waste is valuable because it contains gold, silver, copper, and rare earth metals.', UNDERGRADUATE: 'Urban mining recovers materials from electronics and other waste rather than mining ore.', GRADUATE: 'Informal recycling is unregulated processing, often with health and environmental risks.', PHD: 'Critical materials are essential for technology but have concentrated supply and geopolitical risks.' } }] },
    externalResources: [{ title: 'E-Waste', url: 'https://www.epa.gov/recycle/electronics-donation-and-recycling', type: 'research' }]
  },
  {
    id: 'zw-hazardous',
    slug: 'hazardous-waste-management',
    title: 'Hazardous Waste Management',
    description: {
      ELEMENTARY: 'Learn why some waste is dangerous and needs special handling!',
      MIDDLE_SCHOOL: 'Discover household hazardous waste and safe disposal methods.',
      HIGH_SCHOOL: 'Explore hazardous waste classification, treatment, and regulations.',
      UNDERGRADUATE: 'Analyze hazardous waste management systems, liability, and remediation.',
      GRADUATE: 'Examine hazardous waste policy, site cleanup, and environmental justice.',
      PHD: 'Research waste characterization, treatment technology, and risk assessment.'
    },
    topic: 'zero-waste',
    category: 'SAFETY',
    icon: 'AlertTriangle',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-haz-1', title: 'Dangerous Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Handle With Care!</h2><p>Some waste like batteries and paint is dangerous and needs to go to special places, not regular trash!</p>', MIDDLE_SCHOOL: '<h2>Household Hazards</h2><p>Batteries, paint, cleaners, and pesticides are hazardous waste that needs special collection.</p>', HIGH_SCHOOL: '<h2>Hazardous Characteristics</h2><p>Waste is hazardous if ignitable, corrosive, reactive, or toxic. Regulations ensure proper handling.</p>', UNDERGRADUATE: '<h2>Management Systems</h2><p>Cradle-to-grave tracking, treatment technologies, and liability frameworks.</p>', GRADUATE: '<h2>Policy and Justice</h2><p>Environmental justice concerns, Superfund cleanup, and international waste trade.</p>', PHD: '<h2>Research Frontiers</h2><p>Emerging contaminants, treatment innovation, and risk assessment methods.</p>' } }],
    activities: [{ id: 'zw-haz-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Find Hazards!', MIDDLE_SCHOOL: 'Safe Disposal', HIGH_SCHOOL: 'Classification', UNDERGRADUATE: 'System Design', GRADUATE: 'Justice Analysis', PHD: 'Risk Assessment' }, description: { ELEMENTARY: 'Identify dangerous waste!', MIDDLE_SCHOOL: 'Learn safe disposal methods.', HIGH_SCHOOL: 'Classify hazardous waste.', UNDERGRADUATE: 'Design management systems.', GRADUATE: 'Analyze environmental justice.', PHD: 'Conduct risk assessment.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-haz-game', type: 'simulation', title: 'Hazard Handler', description: 'Safely manage hazardous waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-haz-quiz', passingScore: 80, questions: [{ id: 'zwhazq1', question: { ELEMENTARY: 'What is hazardous waste?', MIDDLE_SCHOOL: 'Name household hazardous items.', HIGH_SCHOOL: 'What makes waste hazardous?', UNDERGRADUATE: 'What is cradle-to-grave?', GRADUATE: 'What is Superfund?', PHD: 'What are emerging contaminants?' }, options: { ELEMENTARY: ['Dangerous waste needing special handling', 'All trash', 'Nothing special', 'Food waste'], MIDDLE_SCHOOL: ['Batteries, paint, and cleaners', 'Food and paper', 'Plastic only', 'Nothing at home'], HIGH_SCHOOL: ['Ignitable, corrosive, reactive, or toxic', 'Only if explosive', 'All waste', 'Nothing is hazardous'], UNDERGRADUATE: ['Tracking waste from creation to disposal', 'Baby tracking', 'Only end tracking', 'No tracking'], GRADUATE: ['Program to clean up contaminated sites', 'Super financing', 'Super fund raising', 'No such program'], PHD: ['Newly identified chemicals of concern', 'Old chemicals', 'Safe chemicals', 'All contaminants'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Hazardous waste is dangerous and needs to go to special places for safe handling!', MIDDLE_SCHOOL: 'Common household hazardous waste includes batteries, paint, cleaners, and pesticides.', HIGH_SCHOOL: 'Waste is hazardous if it is ignitable, corrosive, reactive, or toxic to health.', UNDERGRADUATE: 'Cradle-to-grave tracking follows hazardous waste from generation through treatment and disposal.', GRADUATE: 'Superfund is the EPA program that cleans up abandoned hazardous waste sites.', PHD: 'Emerging contaminants are newly identified chemicals like PFAS with potential health effects.' } }] },
    externalResources: [{ title: 'Hazardous Waste', url: 'https://www.epa.gov/hw', type: 'research' }]
  },
  {
    id: 'zw-data',
    slug: 'waste-data-measurement',
    title: 'Waste Data and Measurement',
    description: {
      ELEMENTARY: 'Learn how we count and track our trash to reduce it!',
      MIDDLE_SCHOOL: 'Discover how waste is measured and why data matters.',
      HIGH_SCHOOL: 'Explore waste characterization, diversion rates, and performance metrics.',
      UNDERGRADUATE: 'Analyze waste accounting methods, data systems, and reporting frameworks.',
      GRADUATE: 'Examine waste statistics, material flow analysis, and policy indicators.',
      PHD: 'Research waste measurement methods, uncertainty, and modeling approaches.'
    },
    topic: 'zero-waste',
    category: 'DATA',
    icon: 'BarChart',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-data-1', title: 'Counting Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Measuring Trash!</h2><p>We count and weigh trash to understand where it comes from and how to reduce it!</p>', MIDDLE_SCHOOL: '<h2>Waste Data</h2><p>Tracking waste helps cities know what people throw away and how to recycle more.</p>', HIGH_SCHOOL: '<h2>Characterization Studies</h2><p>Waste audits reveal composition. Diversion rates measure recycling and composting success.</p>', UNDERGRADUATE: '<h2>Measurement Systems</h2><p>Scale houses, composition studies, and reporting standards for consistent data.</p>', GRADUATE: '<h2>Material Flow Analysis</h2><p>Tracking materials through the economy to identify waste reduction opportunities.</p>', PHD: '<h2>Research Frontiers</h2><p>Measurement uncertainty, modeling methods, and linking waste data to outcomes.</p>' } }],
    activities: [{ id: 'zw-data-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Count the Trash!', MIDDLE_SCHOOL: 'Waste Survey', HIGH_SCHOOL: 'Diversion Calculator', UNDERGRADUATE: 'Data System', GRADUATE: 'Flow Analysis', PHD: 'Measurement Study' }, description: { ELEMENTARY: 'Count and sort trash!', MIDDLE_SCHOOL: 'Survey waste in your school.', HIGH_SCHOOL: 'Calculate diversion rates.', UNDERGRADUATE: 'Design a data system.', GRADUATE: 'Conduct material flow analysis.', PHD: 'Study measurement methods.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-data-game', type: 'simulation', title: 'Waste Data Analyst', description: 'Track and analyze waste data!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-data-quiz', passingScore: 80, questions: [{ id: 'zwdataq1', question: { ELEMENTARY: 'Why count trash?', MIDDLE_SCHOOL: 'What is a waste audit?', HIGH_SCHOOL: 'What is diversion rate?', UNDERGRADUATE: 'What is waste characterization?', GRADUATE: 'What is material flow analysis?', PHD: 'Why does measurement uncertainty matter?' }, options: { ELEMENTARY: ['To learn how to reduce it', 'Just for fun', 'No reason', 'To make more'], MIDDLE_SCHOOL: ['Sorting and measuring waste to understand it', 'Auditing money', 'Checking garbage trucks', 'No such thing'], HIGH_SCHOOL: ['Percent of waste recycled or composted', 'Road diversion', 'Random number', 'All waste'], UNDERGRADUATE: ['Analyzing what is in the waste stream', 'Waste character', 'Personal character', 'No analysis'], GRADUATE: ['Tracking materials through the economy', 'Water flow', 'Traffic flow', 'No tracking'], PHD: ['Uncertainty affects conclusions and decisions', 'No uncertainty exists', 'Doesnt matter', 'Perfect data'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Counting trash helps us understand where it comes from so we can make less!', MIDDLE_SCHOOL: 'A waste audit sorts and weighs trash to see what materials people throw away.', HIGH_SCHOOL: 'Diversion rate is the percentage of waste kept out of landfills through recycling and composting.', UNDERGRADUATE: 'Waste characterization studies analyze samples to determine composition by material type.', GRADUATE: 'Material flow analysis tracks materials from extraction through use and disposal to find intervention points.', PHD: 'Measurement uncertainty affects the reliability of conclusions and policy decisions based on data.' } }] },
    externalResources: [{ title: 'Waste Data', url: 'https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling', type: 'research' }]
  },
  {
    id: 'zw-careers',
    slug: 'zero-waste-careers',
    title: 'Zero Waste Careers',
    description: {
      ELEMENTARY: 'Learn about jobs that help reduce waste and protect the environment!',
      MIDDLE_SCHOOL: 'Discover careers in recycling, waste reduction, and sustainability.',
      HIGH_SCHOOL: 'Explore education pathways and job opportunities in the waste sector.',
      UNDERGRADUATE: 'Analyze career paths, professional development, and industry trends.',
      GRADUATE: 'Examine leadership roles, consulting, and policy careers in waste management.',
      PHD: 'Research academic careers, industry innovation, and emerging opportunities.'
    },
    topic: 'zero-waste',
    category: 'CAREERS',
    icon: 'Briefcase',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-career-1', title: 'Waste Reduction Jobs', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Green Jobs!</h2><p>People have cool jobs helping reduce waste - recycling workers, compost farmers, and sustainability experts!</p>', MIDDLE_SCHOOL: '<h2>Waste Careers</h2><p>From recycling coordinators to sustainability managers, many careers focus on reducing waste.</p>', HIGH_SCHOOL: '<h2>Career Paths</h2><p>Environmental science, engineering, policy, business - many fields contribute to zero waste goals.</p>', UNDERGRADUATE: '<h2>Professional Development</h2><p>Certifications, networking, internships, and building expertise for waste careers.</p>', GRADUATE: '<h2>Leadership Roles</h2><p>Director positions, consulting, policy analysis, and entrepreneurship opportunities.</p>', PHD: '<h2>Research Careers</h2><p>Academic research, industry R&D, and policy research roles in waste systems.</p>' } }],
    activities: [{ id: 'zw-career-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Job Explorer!', MIDDLE_SCHOOL: 'Career Path', HIGH_SCHOOL: 'Education Planning', UNDERGRADUATE: 'Career Strategy', GRADUATE: 'Leadership Plan', PHD: 'Research Path' }, description: { ELEMENTARY: 'Explore green jobs!', MIDDLE_SCHOOL: 'Plan a waste career path.', HIGH_SCHOOL: 'Plan your education.', UNDERGRADUATE: 'Develop career strategy.', GRADUATE: 'Plan for leadership.', PHD: 'Plan research career.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'zw-career-game', type: 'simulation', title: 'Career Builder', description: 'Build your zero waste career!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-career-quiz', passingScore: 80, questions: [{ id: 'zwcareerq1', question: { ELEMENTARY: 'What is a green job?', MIDDLE_SCHOOL: 'What does a sustainability manager do?', HIGH_SCHOOL: 'What education helps with waste careers?', UNDERGRADUATE: 'What is professional certification?', GRADUATE: 'What do waste consultants do?', PHD: 'What do waste researchers study?' }, options: { ELEMENTARY: ['A job that helps the environment', 'A job wearing green', 'Gardening only', 'No such job'], MIDDLE_SCHOOL: ['Helps organizations reduce environmental impact', 'Only manages money', 'Nothing', 'Manages people only'], HIGH_SCHOOL: ['Environmental science, engineering, or policy', 'Only one path', 'No education needed', 'Only recycling degree'], UNDERGRADUATE: ['Credentials showing expertise', 'Any certificate', 'Not important', 'Only degrees matter'], GRADUATE: ['Advise organizations on waste reduction', 'Just give advice', 'Nothing specific', 'Only work for government'], PHD: ['Better ways to reduce and manage waste', 'Only trash', 'Nothing new', 'Only current systems'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green jobs help protect the environment, including jobs reducing waste!', MIDDLE_SCHOOL: 'Sustainability managers help organizations reduce waste, save energy, and protect the environment.', HIGH_SCHOOL: 'Environmental science, engineering, policy, and business all lead to waste reduction careers.', UNDERGRADUATE: 'Professional certifications demonstrate specialized expertise to employers.', GRADUATE: 'Waste consultants advise governments and businesses on programs, facilities, and policies.', PHD: 'Researchers study new technologies, policies, and approaches to improve waste systems.' } }] },
    externalResources: [{ title: 'Green Careers', url: 'https://www.bls.gov/green/home.htm', type: 'research' }]
  },
  {
    id: 'zw-symbiosis',
    slug: 'industrial-symbiosis',
    title: 'Industrial Symbiosis',
    description: {
      ELEMENTARY: 'Learn how factories can share and reuse waste like nature does!',
      MIDDLE_SCHOOL: 'Discover how industries can exchange waste to create value.',
      HIGH_SCHOOL: 'Explore industrial symbiosis, eco-industrial parks, and resource exchange networks.',
      UNDERGRADUATE: 'Analyze symbiosis development, business models, and implementation barriers.',
      GRADUATE: 'Examine symbiosis policy, network facilitation, and economic geography.',
      PHD: 'Research network dynamics, emergent properties, and symbiosis optimization.'
    },
    topic: 'zero-waste',
    category: 'INDUSTRY',
    icon: 'Network',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-symb-1', title: 'Sharing Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Factory Friends!</h2><p>Factories can share waste with each other so nothing is thrown away - one factorys trash becomes anothers treasure!</p>', MIDDLE_SCHOOL: '<h2>Industrial Symbiosis</h2><p>Industrial symbiosis connects companies so the waste from one becomes raw material for another.</p>', HIGH_SCHOOL: '<h2>Eco-Industrial Parks</h2><p>Companies co-located in eco-industrial parks share energy, water, and materials for mutual benefit.</p>', UNDERGRADUATE: '<h2>Network Development</h2><p>Identifying synergies, building relationships, and overcoming barriers to resource exchange.</p>', GRADUATE: '<h2>Policy and Facilitation</h2><p>Government programs, facilitator organizations, and enabling frameworks for symbiosis.</p>', PHD: '<h2>Research Frontiers</h2><p>Network dynamics, optimization algorithms, and emergence in industrial ecosystems.</p>' } }],
    activities: [{ id: 'zw-symb-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Connect the Factories!', MIDDLE_SCHOOL: 'Symbiosis Network', HIGH_SCHOOL: 'Exchange Planning', UNDERGRADUATE: 'Business Case', GRADUATE: 'Policy Design', PHD: 'Network Optimization' }, description: { ELEMENTARY: 'Connect factories to share waste!', MIDDLE_SCHOOL: 'Build a symbiosis network.', HIGH_SCHOOL: 'Plan resource exchanges.', UNDERGRADUATE: 'Develop business cases.', GRADUATE: 'Design enabling policies.', PHD: 'Optimize network dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-symb-game', type: 'simulation', title: 'Symbiosis Builder', description: 'Create industrial exchange networks!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-symb-quiz', passingScore: 80, questions: [{ id: 'zwsymbq1', question: { ELEMENTARY: 'What is industrial symbiosis?', MIDDLE_SCHOOL: 'Why do companies exchange waste?', HIGH_SCHOOL: 'What is an eco-industrial park?', UNDERGRADUATE: 'What is a symbiosis facilitator?', GRADUATE: 'What enables symbiosis networks?', PHD: 'What are emergent network properties?' }, options: { ELEMENTARY: ['Factories sharing waste so nothing is thrown away', 'Factories competing', 'Factories working alone', 'No sharing'], MIDDLE_SCHOOL: ['Saves money and reduces waste', 'No reason', 'More waste is better', 'Just a trend'], HIGH_SCHOOL: ['Industrial area where companies share resources', 'Regular industrial park', 'Shopping center', 'Nature park'], UNDERGRADUATE: ['Organization that helps companies find exchanges', 'No help needed', 'Government only', 'Random matching'], GRADUATE: ['Trust, information, and supportive policy', 'Nothing needed', 'Only technology', 'Only money'], PHD: ['System behaviors arising from network interactions', 'Sum of individual actions', 'Predictable outcomes', 'No emergence'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Industrial symbiosis is when factories share waste so one companys trash becomes anothers useful material!', MIDDLE_SCHOOL: 'Companies exchange waste because it saves money, reduces environmental impact, and creates new value.', HIGH_SCHOOL: 'Eco-industrial parks cluster companies that can exchange energy, water, and materials.', UNDERGRADUATE: 'Facilitators identify potential exchanges, build trust, and help overcome barriers between companies.', GRADUATE: 'Successful symbiosis requires trust between companies, shared information, and supportive policies.', PHD: 'Emergent properties are system-level behaviors like resilience that arise from network interactions.' } }] },
    externalResources: [{ title: 'Industrial Symbiosis', url: 'https://www.ellenmacarthurfoundation.org/', type: 'research' }]
  },
  {
    id: 'zw-circular-design',
    slug: 'circular-design-principles',
    title: 'Circular Design Principles',
    description: {
      ELEMENTARY: 'Learn how to design things so they never become trash!',
      MIDDLE_SCHOOL: 'Discover how smart design can eliminate waste from the start.',
      HIGH_SCHOOL: 'Explore design for disassembly, material selection, and product service systems.',
      UNDERGRADUATE: 'Analyze circular design strategies, business model integration, and innovation methods.',
      GRADUATE: 'Examine design policy, corporate circular strategy, and system-level design.',
      PHD: 'Research design methodology, behavioral integration, and transformative design approaches.'
    },
    topic: 'zero-waste',
    category: 'DESIGN',
    icon: 'Compass',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-circ-1', title: 'Design for Zero Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Design!</h2><p>Designers can make things that never become trash - they can be fixed, shared, or turned into something new!</p>', MIDDLE_SCHOOL: '<h2>Circular Design</h2><p>Circular design creates products that last longer, can be repaired, and have materials that cycle forever.</p>', HIGH_SCHOOL: '<h2>Design Strategies</h2><p>Design for disassembly, material passports, modularity, and product-service systems.</p>', UNDERGRADUATE: '<h2>Implementation</h2><p>Integrating circular design into product development, supply chains, and business models.</p>', GRADUATE: '<h2>Systems Design</h2><p>Designing for system-level circularity, reverse logistics, and value chain collaboration.</p>', PHD: '<h2>Research Frontiers</h2><p>Design methodology innovation, behavioral design, and transformative approaches.</p>' } }],
    activities: [{ id: 'zw-circ-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design Forever!', MIDDLE_SCHOOL: 'Circular Product', HIGH_SCHOOL: 'Disassembly Design', UNDERGRADUATE: 'Business Integration', GRADUATE: 'System Design', PHD: 'Methodology Research' }, description: { ELEMENTARY: 'Design things that never become trash!', MIDDLE_SCHOOL: 'Design a circular product.', HIGH_SCHOOL: 'Design for easy disassembly.', UNDERGRADUATE: 'Integrate circular design.', GRADUATE: 'Design at system level.', PHD: 'Research design methods.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-circ-game', type: 'simulation', title: 'Circular Designer', description: 'Design waste out of existence!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-circ-quiz', passingScore: 80, questions: [{ id: 'zwcircq1', question: { ELEMENTARY: 'What is circular design?', MIDDLE_SCHOOL: 'What is design for disassembly?', HIGH_SCHOOL: 'What is a material passport?', UNDERGRADUATE: 'What is a product service system?', GRADUATE: 'What is reverse logistics?', PHD: 'What is design for behavior?' }, options: { ELEMENTARY: ['Making things so they never become trash', 'Making round things', 'Normal design', 'Fast design'], MIDDLE_SCHOOL: ['Designing things to come apart easily for recycling', 'Breaking things', 'Gluing things together', 'No disassembly'], HIGH_SCHOOL: ['Record of materials in a product', 'A travel document', 'A brand label', 'Nothing'], UNDERGRADUATE: ['Selling use of products instead of ownership', 'Normal product sales', 'Service only', 'Products only'], GRADUATE: ['Moving products back for reuse or recycling', 'Forward shipping', 'No logistics', 'Disposal'], PHD: ['Designing to enable sustainable user behaviors', 'Ignoring users', 'Controlling behavior', 'No behavior aspect'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Circular design makes things that can be fixed, shared, or turned into something new instead of becoming trash!', MIDDLE_SCHOOL: 'Design for disassembly creates products that can easily be taken apart for repair, upgrade, or recycling.', HIGH_SCHOOL: 'Material passports document what materials are in products so they can be properly recovered.', UNDERGRADUATE: 'Product service systems sell access to products or their function rather than ownership, keeping materials cycling.', GRADUATE: 'Reverse logistics are systems to collect used products and move them back for reuse, repair, or recycling.', PHD: 'Design for behavior creates products and systems that make sustainable choices easy and attractive for users.' } }] },
    externalResources: [{ title: 'Circular Design', url: 'https://www.circulardesignguide.com/', type: 'research' }]
  },
  {
    id: 'zw-future',
    slug: 'zero-waste-future',
    title: 'Zero Waste Future',
    description: {
      ELEMENTARY: 'Explore a future world where nothing becomes trash!',
      MIDDLE_SCHOOL: 'Discover the future where waste disappears and everything gets reused.',
      HIGH_SCHOOL: 'Examine emerging trends and the transformative potential of zero waste.',
      UNDERGRADUATE: 'Analyze scaling strategies, policy pathways, and systemic change approaches.',
      GRADUATE: 'Evaluate investment trends, corporate commitments, and transformation scenarios.',
      PHD: 'Synthesize research frontiers, modeling approaches, and circular economy transitions.'
    },
    topic: 'zero-waste',
    category: 'FUTURE',
    icon: 'Sparkles',
    color: 'ocean',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 45, HIGH_SCHOOL: 60, UNDERGRADUATE: 90, GRADUATE: 120, PHD: 180 },
    isMasterclass: true,
    lessons: [{ id: 'zw-fut-1', title: 'A World Without Waste', order: 1, duration: 20, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>No More Trash!</h2><p>In the future, we wont have trash! Everything will be designed to be used again and again forever!</p>', MIDDLE_SCHOOL: '<h2>Zero Waste Future</h2><p>A zero waste future means everything is designed to cycle, landfills become unnecessary, and pollution ends.</p>', HIGH_SCHOOL: '<h2>Transformation Trends</h2><p>Extended producer responsibility, circular business models, and community initiatives are accelerating change.</p>', UNDERGRADUATE: '<h2>Scaling Zero Waste</h2><p>Policy frameworks, infrastructure investment, and business model innovation to achieve zero waste at scale.</p>', GRADUATE: '<h2>Systemic Transformation</h2><p>Economic restructuring, regulatory reform, and cultural shifts for circular economy transitions.</p>', PHD: '<h2>Research Synthesis</h2><p>Integrating materials science, economics, policy, and behavior for waste system transformation.</p>' } }],
    activities: [{ id: 'zw-fut-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Future World Dream!', MIDDLE_SCHOOL: 'Vision Planning', HIGH_SCHOOL: 'Scenario Analysis', UNDERGRADUATE: 'Scaling Strategy', GRADUATE: 'Policy Design', PHD: 'Synthesis Research' }, description: { ELEMENTARY: 'Imagine a world with no trash!', MIDDLE_SCHOOL: 'Create a zero waste vision.', HIGH_SCHOOL: 'Analyze transformation scenarios.', UNDERGRADUATE: 'Design scaling strategies.', GRADUATE: 'Design transformative policies.', PHD: 'Synthesize research for transformation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-fut-game', type: 'simulation', title: 'Waste Revolution', description: 'Transform the world to zero waste!', rounds: 7, timeLimit: 60, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-fut-quiz', passingScore: 80, questions: [{ id: 'zfutq1', question: { ELEMENTARY: 'What will a zero waste world be like?', MIDDLE_SCHOOL: 'Why is zero waste possible?', HIGH_SCHOOL: 'What drives zero waste transformation?', UNDERGRADUATE: 'What enables scaling?', GRADUATE: 'What is circular economy?', PHD: 'What is socio-technical transition?' }, options: { ELEMENTARY: ['Everything gets used again with no trash', 'More trash than ever', 'Same as now', 'Less recycling'], MIDDLE_SCHOOL: ['Everything can be designed to cycle', 'Waste is natural', 'Impossible', 'Only for some things'], HIGH_SCHOOL: ['Policy, business innovation, and community action', 'Only technology', 'Nothing can change', 'Random luck'], UNDERGRADUATE: ['Policy, infrastructure, and business model innovation', 'Only government', 'Only business', 'Only technology'], GRADUATE: ['Economic system where materials cycle continuously', 'Linear economy', 'No economy', 'Only recycling'], PHD: ['Fundamental change in both technology and society', 'Only technology change', 'Only social change', 'No change needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'In a zero waste world, everything is designed to be used again and again, so there is no trash!', MIDDLE_SCHOOL: 'Zero waste is possible because everything can be designed to cycle back as materials or nutrients.', HIGH_SCHOOL: 'Zero waste transformation is driven by supportive policies, circular business models, and community initiatives.', UNDERGRADUATE: 'Scaling requires aligned policy frameworks, adequate infrastructure, and innovative business models.', GRADUATE: 'Circular economy is an economic system designed to eliminate waste by keeping materials in productive use.', PHD: 'Socio-technical transitions involve co-evolution of technology, institutions, markets, and culture.' } }] },
    externalResources: [{ title: 'Zero Waste Future', url: 'https://zwia.org/', type: 'research' }]
  }
]
