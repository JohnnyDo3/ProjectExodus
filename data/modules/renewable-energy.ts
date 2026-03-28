// Renewable Energy Modules - Complete Content for All Learning Levels
// ACE Credit Recommendation Ready - Golisano Institute for Sustainability Partnership
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
    accreditation: {
      courseTitle: 'Solar Energy Systems: Photovoltaic Engineering and Grid Integration',
      courseDescription: 'This module provides a rigorous examination of photovoltaic technology from semiconductor physics through utility-scale system design and grid interconnection. Students analyze the Shockley-Queisser efficiency limit, loss mechanisms in crystalline silicon and thin-film cells, and emerging technologies including perovskite and tandem architectures. System engineering topics include string sizing, inverter selection, DC/AC ratio optimization, and performance modeling using industry-standard metrics (capacity factor, performance ratio, specific yield). Economic analysis covers LCOE methodology, capital recovery factors, and the impact of policy incentives on project viability. The module culminates in grid integration challenges at high solar penetration, including the duck curve phenomenon, curtailment economics, and the transition from grid-following to grid-forming inverter architectures. Students complete a capstone system design exercise integrating technical, economic, and regulatory constraints.',
      learningObjectives: [
        'Analyze the semiconductor physics governing photovoltaic conversion, including bandgap optimization and the Shockley-Queisser limit',
        'Evaluate loss mechanisms in PV systems and quantify their impact on system performance',
        'Apply string sizing, inverter matching, and DC/AC ratio optimization to real-world system design scenarios',
        'Calculate LCOE using capital recovery factor methodology and assess sensitivity to key variables',
        'Synthesize grid integration challenges for high-penetration solar scenarios including curtailment and ramping',
        'Assess emerging PV technologies (perovskite, bifacial, tandem cells) and their commercial readiness',
        'Design a complete PV system proposal incorporating site assessment, equipment selection, and financial modeling',
        'Evaluate the role of policy frameworks (ITC, RPS, net metering) in shaping solar deployment trajectories'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level physics (mechanics, electricity & magnetism)', 'Basic calculus or quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze the tradeoffs between monocrystalline, polycrystalline, and thin-film for a specific application',
          'Scenario question: Given site irradiance data, calculate expected annual energy production for a 100 kW system',
          'Mini-project: Size a residential PV system using real utility rate schedules and estimate payback period'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering PV physics, system design, and economic analysis',
          'System design deliverable: Complete PV system proposal for a commercial building'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Commercial PV System Design and Financial Analysis',
        description: 'Design a complete photovoltaic system for a commercial facility using real-world site conditions, equipment specifications, and utility rate structures. Deliver a professional proposal suitable for investor review.',
        deliverables: [
          'Site assessment with solar resource analysis (TMY data or PVWatts)',
          'System design with module selection, string configuration, and inverter sizing',
          'Single-line electrical diagram',
          'Energy production model with monthly yield estimates',
          'Financial pro forma with LCOE, payback period, NPV, and IRR',
          'Interconnection and permitting pathway summary'
        ],
        rubricCriteria: [
          'Technical accuracy of system design and component selection (25%)',
          'Rigor of energy production modeling methodology (20%)',
          'Completeness and accuracy of financial analysis (25%)',
          'Professional quality of deliverable presentation (15%)',
          'Integration of regulatory and grid interconnection considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate energy engineering coursework. Quantitative rigor includes semiconductor physics, system performance calculations, and financial modeling consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Licensed Professional Engineer (PE) with solar design experience for system design review',
          'Faculty member with semiconductor physics background for advanced PV concepts',
          'NABCEP-certified professional for industry practice alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [
      {
        id: 're-solar-1',
        title: 'Sunshine to Electricity',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>Sunny's Big Adventure</h2>

<p>High up in the sky, a tiny sunbeam named Sunny was getting ready for the most exciting trip ever—a journey all the way to Earth!</p>

<p>"Today's the day!" Sunny said to the other sunbeams. "I'm going to help power someone's home!"</p>

<div class="image-placeholder" data-caption="Sunny the sunbeam traveling from the sun to Earth">
[Image: A friendly animated sunbeam character traveling through space toward Earth]
</div>

<h3>The Amazing Journey</h3>

<p>Sunny zoomed through space for 8 whole minutes (that's how long it takes sunlight to reach Earth!). Then Sunny spotted something shiny on a rooftop—a <strong>solar panel</strong>!</p>

<blockquote class="scavenger-quote" data-quote-id="re-elem-q1">
<p>"Every hour, enough sunlight hits Earth to power the whole world for a year!"</p>
<cite>— Dr. Elena Rodriguez, Solar Scientist</cite>
</blockquote>

<h3>How Solar Panels Work</h3>

<p>When Sunny landed on the solar panel, something magical happened:</p>

<ol>
<li><strong>Sunny hits the panel</strong> — The shiny blue squares are called solar cells</li>
<li><strong>Electrons wake up</strong> — Tiny particles inside start moving around</li>
<li><strong>Electricity flows</strong> — The moving particles create electricity!</li>
<li><strong>Power travels home</strong> — Wires carry the electricity inside</li>
</ol>

<div class="image-placeholder" data-caption="Inside a solar panel showing electrons moving">
[Image: Cutaway diagram of a solar panel with animated electrons moving]
</div>

<h3>Meet Sunny's Friends</h3>

<p>Sunny wasn't alone! There were billions of sunbeams traveling together. Let's meet some of Sunny's special friends:</p>

<ul>
<li><strong>Ray</strong> — A super fast sunbeam who loves racing to Earth</li>
<li><strong>Goldie</strong> — She makes everything feel warm and cozy</li>
<li><strong>Spark</strong> — The tiniest sunbeam who works extra hard</li>
</ul>

<p>All of Sunny's friends work together as a team. When they all land on a solar panel at the same time, they can make even MORE electricity!</p>

<div class="fun-fact">
<h4>Fun Fact!</h4>
<p>The sun is so big that one MILLION Earths could fit inside it! That's a lot of sunbeams!</p>
</div>

<h3>What Can Solar Power Do?</h3>

<p>Thanks to Sunny and millions of other sunbeams, solar panels can power:</p>
<ul>
<li>Lights in your home</li>
<li>Your refrigerator to keep food cold</li>
<li>TVs, computers, and video games</li>
<li>Even electric cars!</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-elem-q2">
<p>"The sun gives us free energy every single day. We just need to catch it!"</p>
<cite>— Kids Solar Club</cite>
</blockquote>

<h3>Solar Power Around the World</h3>

<p>Solar panels aren't just on houses! You can find them in many cool places:</p>

<ul>
<li><strong>Schools</strong> — Some schools use solar power to run their lights and computers</li>
<li><strong>Farms</strong> — Farmers use solar panels to pump water for their animals</li>
<li><strong>Space!</strong> — Satellites and space stations use solar panels too</li>
<li><strong>Road signs</strong> — Those blinking lights on the road often use tiny solar panels</li>
<li><strong>Calculators</strong> — The little dark strip on your calculator is a mini solar panel!</li>
</ul>

<div class="image-placeholder" data-caption="Solar panels in different places around the world">
[Image: A collage showing solar panels on schools, farms, satellites, and everyday objects]
</div>

<h3>Day and Night: When Does Solar Power Work?</h3>

<p>Sunny and friends can only visit during the day when the sun is shining. So what happens at night?</p>

<p>That's where <strong>batteries</strong> come in! Think of batteries like a piggy bank for electricity:</p>

<ol>
<li>During the day, solar panels make more electricity than we need</li>
<li>The extra electricity gets saved in batteries</li>
<li>At night, we use the electricity from the batteries</li>
<li>When the sun comes up, we fill the batteries again!</li>
</ol>

<div class="think-about-it">
<h4>Think About It!</h4>
<p>On cloudy days, solar panels still work—just not as well. Even when clouds block the sun, some sunbeams still get through!</p>
</div>

<h3>Taking Care of Solar Panels</h3>

<p>Solar panels are like windows—they work best when they're clean! Here's how people take care of them:</p>

<ul>
<li>Rinse off dust and dirt with water</li>
<li>Clear away leaves that might fall on them</li>
<li>Check that nothing is blocking the sunlight</li>
<li>Make sure they're pointing toward the sun</li>
</ul>

<p>Solar panels don't need much work to keep running. That's one reason why solar power is so great!</p>

<h3>Sunny's Happy Ending</h3>

<p>That night, when a little girl named Maya turned on her bedroom light, she didn't know that Sunny the sunbeam had helped make it glow. Sunny felt so proud!</p>

<p>"See you tomorrow!" Sunny called as Maya fell asleep. And sure enough, the next day, more sunbeams made the same amazing journey.</p>

<h3>Be a Solar Detective!</h3>

<p>Now it's your turn to explore! Go on a solar scavenger hunt and try to find:</p>

<ul>
<li>A house or building with solar panels on the roof</li>
<li>A solar-powered calculator or small gadget</li>
<li>A road sign with a small solar panel</li>
<li>A toy that uses solar power</li>
</ul>

<p>Ask a grown-up if your school or home uses any solar power. You might be surprised!</p>

<div class="key-concept">
<h4>Remember!</h4>
<p>Solar panels turn sunlight into electricity—clean energy from our friend the sun! Every day, billions of sunbeams travel from the sun to help power our world.</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Capturing Starlight: The Science of Solar Energy</h2>

<p>Every second, the sun releases more energy than humans have used in all of history. This isn't magic—it's nuclear fusion, and we've learned how to capture a tiny fraction of it to power our world.</p>

<div class="image-placeholder" data-caption="The sun producing energy through nuclear fusion">
[Image: Diagram showing the sun with fusion reactions in its core and energy radiating outward]
</div>

<h3>The Sun: Our Giant Power Plant</h3>

<p>The sun is a massive ball of hydrogen gas, about 93 million miles from Earth. At its core, temperatures reach 27 million degrees Fahrenheit—hot enough to fuse hydrogen atoms together into helium.</p>

<p>This process, called <strong>nuclear fusion</strong>, releases enormous amounts of energy. The sun converts about 4 million tons of matter into energy every single second! This energy travels through space as light and heat, reaching Earth in about 8 minutes.</p>

<div class="did-you-know">
<h4>Did You Know?</h4>
<p>The sun is about 4.6 billion years old and is roughly halfway through its life. It has enough hydrogen fuel to keep shining for another 5 billion years!</p>
</div>

<h3>From Sunlight to Electricity</h3>

<p>Solar panels use the <strong>photovoltaic effect</strong>, discovered in 1839 by French physicist Edmond Becquerel when he was only 19 years old!</p>

<blockquote class="scavenger-quote" data-quote-id="re-mid-q1">
<p>"I was experimenting with metal electrodes in a liquid when I noticed they produced more electricity when exposed to light."</p>
<cite>— Edmond Becquerel, 1839</cite>
</blockquote>

<p>The word "photovoltaic" comes from two words:</p>
<ul>
<li><strong>Photo</strong> — from the Greek word for light</li>
<li><strong>Voltaic</strong> — relating to electricity (named after Alessandro Volta, inventor of the battery)</li>
</ul>

<h3>Inside a Solar Cell</h3>

<p>Most solar cells are made from <strong>silicon</strong>, the same element found in sand and computer chips. Here's how they work:</p>

<ol>
<li><strong>Photons arrive:</strong> Light particles from the sun hit the silicon</li>
<li><strong>Electrons escape:</strong> The light energy knocks electrons loose from silicon atoms</li>
<li><strong>Current flows:</strong> Special layers in the cell create a one-way path for electrons</li>
<li><strong>Electricity generated:</strong> Moving electrons = electric current!</li>
</ol>

<div class="image-placeholder" data-caption="Diagram of photovoltaic effect in a solar cell">
[Image: Cross-section of a solar cell showing photons hitting silicon and electrons flowing]
</div>

<h3>Types of Solar Panels</h3>

<p>Not all solar panels are the same. The three main types are:</p>

<table class="comparison-table">
<tr><th>Type</th><th>Appearance</th><th>Efficiency</th><th>Cost</th></tr>
<tr><td>Monocrystalline</td><td>Black, rounded corners</td><td>Highest (20-22%)</td><td>Most expensive</td></tr>
<tr><td>Polycrystalline</td><td>Blue, square cells</td><td>Medium (15-17%)</td><td>Moderate</td></tr>
<tr><td>Thin-Film</td><td>Uniform dark surface</td><td>Lower (10-13%)</td><td>Least expensive</td></tr>
</table>

<p>Monocrystalline panels are made from a single crystal of silicon, making them more efficient but more expensive. Polycrystalline panels use multiple silicon crystals melted together. Thin-film panels use a thin layer of photovoltaic material on glass or metal.</p>

<h3>The Complete Solar System</h3>

<p>A solar panel alone isn't enough. Here's what a home solar system includes:</p>

<table class="component-table">
<tr><th>Component</th><th>Purpose</th></tr>
<tr><td>Solar Panels</td><td>Convert sunlight to DC (direct current) electricity</td></tr>
<tr><td>Inverter</td><td>Converts DC to AC (alternating current) for home use</td></tr>
<tr><td>Mounting System</td><td>Secures panels at optimal angle</td></tr>
<tr><td>Meter</td><td>Tracks energy production and grid exchange</td></tr>
<tr><td>Battery (optional)</td><td>Stores energy for use at night</td></tr>
</table>

<h3>Understanding DC vs. AC Electricity</h3>

<p>Solar panels produce <strong>direct current (DC)</strong> electricity, where electrons flow in one direction—like water flowing through a pipe.</p>

<p>But our homes use <strong>alternating current (AC)</strong>, where electrons rapidly switch direction back and forth—about 60 times per second in the United States!</p>

<p>That's why we need an <strong>inverter</strong>. It takes the DC electricity from solar panels and converts it into AC electricity your appliances can use. Modern inverters are about 95-98% efficient, meaning very little energy is lost in the conversion.</p>

<h3>Net Metering: Selling Power Back</h3>

<p>What happens when your solar panels produce more electricity than you need? In many places, you can sell it back to the power company through a system called <strong>net metering</strong>.</p>

<ol>
<li>During sunny days, your panels might produce more than you use</li>
<li>The extra electricity flows back to the power grid</li>
<li>Your electric meter actually runs backwards!</li>
<li>At night, you draw power from the grid</li>
<li>You only pay for the "net" difference</li>
</ol>

<blockquote class="scavenger-quote" data-quote-id="re-mid-q2">
<p>"Solar energy is now the cheapest electricity in history in many parts of the world."</p>
<cite>— International Energy Agency, 2020</cite>
</blockquote>

<h3>Factors That Affect Solar Production</h3>

<p>Several factors determine how much electricity solar panels can generate:</p>

<ul>
<li><strong>Sunlight intensity:</strong> More direct sunlight = more power</li>
<li><strong>Panel angle:</strong> Panels work best when facing the sun directly</li>
<li><strong>Temperature:</strong> Surprisingly, panels work slightly better in cooler weather</li>
<li><strong>Shading:</strong> Even partial shade can significantly reduce output</li>
<li><strong>Weather:</strong> Clouds reduce production, but panels still generate some power</li>
<li><strong>Dust and dirt:</strong> Clean panels produce more electricity</li>
</ul>

<h3>Solar Power Today</h3>

<p>Solar energy has grown incredibly fast:</p>
<ul>
<li>Global solar capacity has grown over 40% per year since 2010</li>
<li>Solar panel costs have dropped 99% since 1976</li>
<li>Over 130 countries now have solar power plants</li>
<li>Solar employs over 4 million people worldwide</li>
</ul>

<h3>The Future of Solar</h3>

<p>Scientists are working on exciting new solar technologies:</p>

<ul>
<li><strong>Perovskite solar cells:</strong> A new material that could be cheaper and more efficient than silicon</li>
<li><strong>Bifacial panels:</strong> Panels that capture light on both sides, boosting output by 10-20%</li>
<li><strong>Building-integrated PV:</strong> Solar cells built into windows, roof tiles, and building materials</li>
<li><strong>Floating solar farms:</strong> Panels installed on lakes and reservoirs, saving land and reducing evaporation</li>
</ul>

<div class="key-concept">
<h4>Key Takeaway</h4>
<p>Solar power converts sunlight directly into electricity using the photovoltaic effect—a technology that's becoming cheaper and more efficient every year. A complete solar system includes panels, inverters, and often batteries to provide clean, renewable energy.</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Photovoltaic Technology: Engineering Electricity from Light</h2>

<p>In 1954, Bell Labs scientists Daryl Chapin, Calvin Fuller, and Gerald Pearson created the first practical silicon solar cell. It was only 6% efficient, but it proved that semiconductors could turn sunlight into useful electricity. Today, that same basic technology powers satellites, homes, and entire cities.</p>

<div class="image-placeholder" data-caption="Bell Labs scientists with the first practical solar cell, 1954">
[Image: Historical photo of the Bell Labs team with their silicon solar cell]
</div>

<h3>The History of Solar Power</h3>

<p>The journey from discovery to practical application took over a century:</p>

<table class="timeline-table">
<tr><td>1839</td><td>Edmond Becquerel discovers the photovoltaic effect at age 19</td></tr>
<tr><td>1883</td><td>Charles Fritts builds the first selenium solar cell (1% efficient)</td></tr>
<tr><td>1905</td><td>Einstein explains the photoelectric effect (wins 1921 Nobel Prize)</td></tr>
<tr><td>1954</td><td>Bell Labs creates first practical silicon cell (6% efficient)</td></tr>
<tr><td>1958</td><td>Vanguard 1 becomes first solar-powered satellite</td></tr>
<tr><td>1973</td><td>Oil crisis sparks interest in solar research</td></tr>
<tr><td>2000s</td><td>Government incentives drive rapid adoption</td></tr>
<tr><td>2020s</td><td>Solar becomes cheapest electricity source in many regions</td></tr>
</table>

<h3>The Photovoltaic Effect: Physics in Action</h3>

<p>Understanding solar cells requires understanding semiconductors and quantum mechanics:</p>

<blockquote class="scavenger-quote" data-quote-id="re-high-q1">
<p>"The photovoltaic effect occurs when photons with sufficient energy excite electrons from the valence band to the conduction band, creating electron-hole pairs that can be separated by an internal electric field."</p>
<cite>— Introduction to Semiconductor Physics</cite>
</blockquote>

<h4>Understanding the Bandgap</h4>

<p>Every semiconductor has a <strong>bandgap</strong>—the minimum energy required to free an electron. For silicon, this is about 1.1 electron volts (eV). Photons with:</p>

<ul>
<li><strong>Less energy than the bandgap:</strong> Pass through without effect (not absorbed)</li>
<li><strong>Equal energy to the bandgap:</strong> Perfectly absorbed, creating one electron-hole pair</li>
<li><strong>More energy than the bandgap:</strong> Absorbed, but excess energy becomes heat</li>
</ul>

<p>This is why solar cells can't be 100% efficient—they can only capture a portion of the solar spectrum effectively.</p>

<h4>The P-N Junction</h4>
<p>Solar cells are built around a <strong>P-N junction</strong>—the boundary between two types of silicon:</p>

<ul>
<li><strong>N-type silicon:</strong> Doped with phosphorus, has extra electrons (negative carriers)</li>
<li><strong>P-type silicon:</strong> Doped with boron, has "holes" (positive carriers)</li>
<li><strong>Depletion zone:</strong> Where P and N meet, creating an electric field</li>
</ul>

<p>When light creates electron-hole pairs in this zone, the electric field pushes electrons one way and holes the other—that's current!</p>

<div class="image-placeholder" data-caption="P-N junction in a solar cell showing electron flow">
[Image: Detailed diagram of P-N junction with labeled regions and electron movement]
</div>

<h3>Solar Cell Technologies Compared</h3>

<table class="comparison-table">
<thead>
<tr><th>Technology</th><th>Efficiency</th><th>Cost</th><th>Best Use</th></tr>
</thead>
<tbody>
<tr><td>Monocrystalline Silicon</td><td>20-22%</td><td>Highest</td><td>Residential roofs (space-limited)</td></tr>
<tr><td>Polycrystalline Silicon</td><td>15-17%</td><td>Medium</td><td>Large installations, cost-sensitive</td></tr>
<tr><td>Thin-Film (CdTe, CIGS)</td><td>10-13%</td><td>Lowest</td><td>Utility scale, building-integrated</td></tr>
<tr><td>Perovskite (emerging)</td><td>25%+ (lab)</td><td>Potentially low</td><td>Future: flexible, tandem cells</td></tr>
</tbody>
</table>

<h4>Manufacturing Process</h4>

<p>Monocrystalline silicon cells are made using the Czochralski process:</p>

<ol>
<li><strong>Purification:</strong> Sand (silicon dioxide) is refined to 99.9999% pure silicon</li>
<li><strong>Crystal growth:</strong> A seed crystal is dipped into molten silicon and slowly pulled up</li>
<li><strong>Slicing:</strong> The crystal ingot is sliced into thin wafers (about 0.2mm thick)</li>
<li><strong>Doping:</strong> Wafers are treated to create the P-N junction</li>
<li><strong>Coating:</strong> Anti-reflective coating is applied to capture more light</li>
<li><strong>Metallization:</strong> Metal contacts are added for electron collection</li>
</ol>

<h3>System Design Principles</h3>

<p>Designing a solar system involves optimizing several variables:</p>

<blockquote class="scavenger-quote" data-quote-id="re-high-q2">
<p>"Optimal panel orientation in the Northern Hemisphere is true south at a tilt angle roughly equal to latitude, though actual optimization depends on local weather patterns and time-of-use electricity rates."</p>
<cite>— Solar Energy Engineering Handbook</cite>
</blockquote>

<h4>Key Design Factors:</h4>
<ul>
<li><strong>Orientation:</strong> Compass direction panels face (azimuth)</li>
<li><strong>Tilt:</strong> Angle from horizontal (affects seasonal production)</li>
<li><strong>Shading:</strong> Even partial shade dramatically reduces output</li>
<li><strong>Temperature:</strong> Solar cells lose efficiency as they heat up</li>
</ul>

<h4>The Temperature Coefficient</h4>

<p>Solar panels are rated at Standard Test Conditions (STC): 25°C cell temperature and 1000 W/m² irradiance. But real-world conditions vary significantly.</p>

<p>Most silicon panels lose about 0.4-0.5% of their power for every degree Celsius above 25°C. So a panel rated at 400W might only produce 380W on a hot day when the cell temperature reaches 50°C.</p>

<h3>Power Electronics: From Panel to Plug</h3>

<h4>Inverter Types</h4>

<table class="inverter-table">
<tr><th>Type</th><th>How It Works</th><th>Pros</th><th>Cons</th></tr>
<tr><td>String Inverter</td><td>One inverter for multiple panels in series</td><td>Lower cost, proven technology</td><td>Shade affects entire string</td></tr>
<tr><td>Microinverters</td><td>One small inverter per panel</td><td>Panel-level optimization, monitoring</td><td>Higher cost, more components</td></tr>
<tr><td>Power Optimizers</td><td>DC-DC converters at each panel, central inverter</td><td>Best of both approaches</td><td>Moderate complexity</td></tr>
</table>

<h4>Maximum Power Point Tracking (MPPT)</h4>

<p>Solar panels have a specific voltage and current combination that produces maximum power—the "maximum power point." MPPT algorithms constantly adjust to find this point as conditions change throughout the day.</p>

<h3>Energy Calculations</h3>

<p>Solar energy output can be estimated using:</p>

<code>Energy (kWh) = Panel Capacity (kW) × Peak Sun Hours × System Efficiency</code>

<p>For example, a 6kW system in Phoenix (5.5 peak sun hours, 80% efficiency):</p>
<p>6 kW × 5.5 hours × 0.80 = 26.4 kWh/day ≈ 9,600 kWh/year</p>

<h4>System Losses</h4>

<p>That 80% efficiency accounts for various losses:</p>

<ul>
<li><strong>Inverter losses:</strong> 3-5%</li>
<li><strong>Wiring losses:</strong> 1-3%</li>
<li><strong>Soiling (dust/dirt):</strong> 2-5%</li>
<li><strong>Shading:</strong> 0-10% (site-dependent)</li>
<li><strong>Temperature:</strong> 2-10% (climate-dependent)</li>
<li><strong>Module mismatch:</strong> 1-2%</li>
<li><strong>Degradation:</strong> 0.5-1% per year</li>
</ul>

<h3>Economics of Solar</h3>

<h4>Levelized Cost of Energy (LCOE)</h4>

<p>LCOE represents the average cost of electricity over a system's lifetime:</p>

<code>LCOE = (Total Lifetime Cost) ÷ (Total Lifetime Energy Production)</code>

<p>As of 2023, utility-scale solar LCOE ranges from $25-50/MWh—competitive with or cheaper than fossil fuels in most locations.</p>

<h4>Payback Period</h4>

<p>Residential systems typically pay for themselves in 5-10 years, depending on local electricity rates, incentives, and solar resources. With systems lasting 25-30 years, this represents significant long-term savings.</p>

<div class="key-concept">
<h4>Critical Thinking</h4>
<p>Solar technology continues advancing rapidly. The efficiency record for lab cells now exceeds 47% using multi-junction designs. How might continued efficiency gains and cost reductions change our energy landscape? Consider the implications for grid stability, energy storage needs, and the economics of fossil fuel plants.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Photovoltaic Systems Engineering: From Cell Physics to Grid Integration</h2>

<p>The global solar industry installed over 230 GW of new capacity in 2022 alone—more than all other electricity sources combined. This unprecedented growth demands sophisticated engineering approaches that integrate semiconductor physics, power electronics, and systems design.</p>

<h3>Semiconductor Physics Fundamentals</h3>

<p>PV cell performance is governed by fundamental semiconductor physics:</p>

<blockquote class="scavenger-quote" data-quote-id="re-undergrad-q1">
<p>"The Shockley-Queisser limit establishes that a single-junction solar cell cannot exceed approximately 33.7% efficiency under standard solar illumination, due to thermodynamic constraints on photon absorption and carrier thermalization."</p>
<cite>— Shockley & Queisser, "Detailed Balance Limit of Efficiency," 1961</cite>
</blockquote>

<h4>Loss Mechanisms in Solar Cells</h4>
<ul>
<li><strong>Sub-bandgap losses:</strong> Photons with energy below the bandgap pass through</li>
<li><strong>Thermalization:</strong> Excess photon energy above bandgap is lost as heat</li>
<li><strong>Recombination:</strong> Electron-hole pairs recombine before collection</li>
<li><strong>Resistance:</strong> Ohmic losses in cell materials and contacts</li>
<li><strong>Reflection:</strong> Light reflected from cell surface</li>
</ul>

<div class="image-placeholder" data-caption="Loss mechanisms in photovoltaic conversion">
[Image: Sankey diagram showing energy losses from incident sunlight to electrical output]
</div>

<h3>System Design and Optimization</h3>

<h4>String Sizing and Configuration</h4>
<p>PV arrays are configured into strings that must match inverter specifications:</p>

<table class="technical-table">
<thead>
<tr><th>Parameter</th><th>Design Consideration</th><th>Typical Range</th></tr>
</thead>
<tbody>
<tr><td>V<sub>oc</sub> (string)</td><td>Must not exceed inverter max input voltage</td><td>200-600V (residential)</td></tr>
<tr><td>V<sub>mp</sub> (string)</td><td>Should match inverter MPPT range</td><td>Inverter-specific</td></tr>
<tr><td>I<sub>sc</sub> (parallel strings)</td><td>Must not exceed inverter max current</td><td>8-15A typical</td></tr>
<tr><td>DC/AC ratio</td><td>Oversizing DC improves capacity factor</td><td>1.1-1.3 typical</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-undergrad-q2">
<p>"Modern inverters with wide MPPT ranges and multiple string inputs provide flexibility, but optimal system design still requires careful matching of array characteristics to inverter specifications across all operating temperatures."</p>
<cite>— PV System Design Best Practices, NREL</cite>
</blockquote>

<h4>Performance Metrics</h4>
<ul>
<li><strong>Capacity Factor:</strong> Actual output / (Nameplate capacity × 8760 hours); typically 15-25% for fixed-tilt PV</li>
<li><strong>Performance Ratio:</strong> Actual output / Expected output under STC; typically 75-85%</li>
<li><strong>Specific Yield:</strong> Annual kWh per kW<sub>p</sub> installed; varies by location (1000-2000 kWh/kWp)</li>
<li><strong>LCOE:</strong> Levelized cost incorporating capital, O&M, and financing over system lifetime</li>
</ul>

<div class="image-placeholder" data-caption="Global solar irradiance map with capacity factor zones">
[Image: World map showing solar resource availability and typical capacity factors by region]
</div>

<h3>Economic Analysis Framework</h3>

<p>PV project economics require comprehensive financial modeling:</p>

<h4>LCOE Calculation:</h4>
<code>LCOE = (Capital Cost × CRF + Annual O&M) / Annual Energy Production</code>

<p>Where CRF (Capital Recovery Factor) = r(1+r)^n / ((1+r)^n - 1)</p>

<blockquote class="scavenger-quote" data-quote-id="re-undergrad-q3">
<p>"Utility-scale solar LCOE has fallen from $359/MWh in 2009 to $33/MWh in 2022—a 91% reduction driven by manufacturing scale, module efficiency gains, and soft cost reductions."</p>
<cite>— Lazard's Levelized Cost of Energy Analysis, 2022</cite>
</blockquote>

<h3>Grid Integration Considerations</h3>

<ul>
<li><strong>Interconnection requirements:</strong> Utility standards, protection settings, metering</li>
<li><strong>Power quality:</strong> Harmonic distortion, voltage regulation, power factor</li>
<li><strong>Variability management:</strong> Ramp rate limits, forecasting integration</li>
<li><strong>Curtailment risk:</strong> Grid constraints limiting energy delivery</li>
</ul>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>PV system design balances technical optimization (maximizing energy harvest) with economic constraints (minimizing LCOE). As technology costs continue declining, soft costs—permitting, labor, customer acquisition—increasingly dominate system pricing.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Advanced Photovoltaics: Technology Frontiers and Grid Transformation</h2>

<p>The photovoltaic industry is undergoing rapid technological evolution while simultaneously transforming grid architecture and electricity markets. Graduate-level analysis requires understanding both the physics of next-generation technologies and the systems-level implications of high renewable penetration.</p>

<h3>Emerging Cell Technologies</h3>

<h4>Perovskite Solar Cells</h4>
<p>Metal halide perovskites (typically methylammonium lead iodide, CH<sub>3</sub>NH<sub>3</sub>PbI<sub>3</sub>) have achieved remarkable efficiency gains since 2012:</p>

<blockquote class="scavenger-quote" data-quote-id="re-grad-q1">
<p>"Perovskite solar cells have progressed from 3.8% efficiency in 2009 to over 25% today—the fastest efficiency improvement of any PV technology in history. The key challenges now are stability and scaling."</p>
<cite>— Nature Energy Review, 2023</cite>
</blockquote>

<p>Key research challenges:</p>
<ul>
<li><strong>Degradation mechanisms:</strong> Moisture, oxygen, heat, and light-induced instability</li>
<li><strong>Lead toxicity:</strong> Encapsulation requirements and lead-free alternatives</li>
<li><strong>Scale-up:</strong> Transitioning from small-area spin-coating to industrial deposition</li>
<li><strong>Tandem integration:</strong> Perovskite-silicon tandems approaching 30% efficiency</li>
</ul>

<div class="image-placeholder" data-caption="Perovskite crystal structure and tandem cell architecture">
[Image: Crystal structure of perovskite and cross-section of perovskite-silicon tandem cell]
</div>

<h4>Multi-Junction Concentrator Systems</h4>
<p>III-V semiconductor multi-junction cells under concentration have achieved over 47% efficiency:</p>
<ul>
<li>GaInP/GaAs/Ge triple junction standard configuration</li>
<li>Lattice-matched vs. metamorphic approaches</li>
<li>Concentration ratios of 500-1000× using Fresnel lenses</li>
<li>Tracking requirements and thermal management challenges</li>
</ul>

<h3>Bifacial and Tracking Systems</h3>

<blockquote class="scavenger-quote" data-quote-id="re-grad-q2">
<p>"Bifacial modules can capture 5-30% additional energy from rear-side irradiance depending on albedo, mounting height, and ground cover. Combined with single-axis tracking, bifacial systems achieve capacity factors exceeding 30% in high-resource locations."</p>
<cite>— NREL Bifacial PV Workshop Proceedings</cite>
</blockquote>

<h3>Grid Integration at High Penetration</h3>

<p>As solar approaches significant grid share, new challenges emerge:</p>

<h4>The Duck Curve Problem</h4>
<p>California's "duck curve" illustrates how midday solar generation creates:</p>
<ul>
<li>Minimum net load during peak solar hours</li>
<li>Steep evening ramps as solar declines and demand increases</li>
<li>Potential overgeneration requiring curtailment</li>
<li>Reduced capacity factors for dispatchable generators</li>
</ul>

<div class="image-placeholder" data-caption="California duck curve showing net load evolution">
[Image: Graph showing California net load curves from 2012-2023 illustrating the deepening duck curve]
</div>

<h4>Grid Services from Inverter-Based Resources</h4>
<p>Modern smart inverters can provide grid-supportive functions:</p>

<table class="services-table">
<thead>
<tr><th>Service</th><th>Capability</th><th>Standard</th></tr>
</thead>
<tbody>
<tr><td>Volt-VAR</td><td>Reactive power for voltage regulation</td><td>IEEE 1547-2018</td></tr>
<tr><td>Frequency response</td><td>Fast power adjustment to frequency deviations</td><td>NERC reliability standards</td></tr>
<tr><td>Ramp rate control</td><td>Limiting output changes to specified rates</td><td>Utility-specific</td></tr>
<tr><td>Curtailment response</td><td>Rapid power reduction on command</td><td>Grid operator protocols</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-grad-q3">
<p>"The transition from grid-following to grid-forming inverters represents a fundamental shift in how renewable resources interact with the power system—from passive generators to active participants in maintaining grid stability."</p>
<cite>— IEEE Power Electronics Society</cite>
</blockquote>

<h3>Storage Integration and Hybrid Systems</h3>

<p>Solar-plus-storage systems are increasingly economically attractive:</p>
<ul>
<li>Investment tax credit (ITC) applicability to paired storage</li>
<li>Capacity firming and dispatchability value</li>
<li>Arbitrage between low-price solar hours and high-price evening hours</li>
<li>Resilience benefits for critical loads</li>
</ul>

<div class="key-concept">
<h4>Research Directions</h4>
<p>Graduate research in PV spans from materials science (novel absorbers, interface engineering) to power systems (stability with low inertia, market design) to policy (just transition, equity in solar access). Interdisciplinary approaches are essential as solar becomes a foundational grid resource.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Photovoltaic Science: Fundamental Limits, Novel Concepts, and Systemic Transformation</h2>

<p>Doctoral-level engagement with photovoltaics requires rigorous examination of thermodynamic limits, quantum phenomena, and the sociotechnical systems that shape energy transitions. This lesson explores fundamental physics, breakthrough concepts, and critical analyses of solar's role in decarbonization pathways.</p>

<h3>Thermodynamic Limits and Beyond</h3>

<h4>The Shockley-Queisser Framework</h4>
<p>The 1961 Shockley-Queisser analysis established efficiency limits using detailed balance:</p>

<blockquote class="scavenger-quote" data-quote-id="re-phd-q1">
<p>"The detailed balance limit assumes: (1) one electron-hole pair per absorbed photon, (2) radiative recombination only, (3) infinite carrier mobility, (4) step-function absorption at the bandgap. Real cells violate all these assumptions to varying degrees."</p>
<cite>— Würfel, "Physics of Solar Cells," 2016</cite>
</blockquote>

<p>For AM1.5G solar spectrum, optimal single-junction bandgap is ~1.34 eV, yielding 33.7% maximum efficiency. However, several mechanisms can theoretically exceed this limit:</p>

<h4>Third-Generation Concepts</h4>
<ul>
<li><strong>Multi-junction/tandem cells:</strong> Multiple bandgaps capture broader spectrum; current record 47.1%</li>
<li><strong>Hot carrier cells:</strong> Collect carriers before thermalization; requires carrier cooling <1 ps</li>
<li><strong>Multiple exciton generation:</strong> High-energy photons create multiple electron-hole pairs</li>
<li><strong>Intermediate band cells:</strong> Sub-bandgap absorption via impurity or quantum dot states</li>
<li><strong>Thermophotovoltaics:</strong> Thermal emitter + PV cell; can exceed Shockley-Queisser using selective emitters</li>
</ul>

<div class="image-placeholder" data-caption="Third-generation PV concepts and theoretical efficiency limits">
[Image: Diagram comparing efficiency limits of various advanced PV concepts against Shockley-Queisser]
</div>

<h3>Perovskite Physics and Engineering Challenges</h3>

<p>Halide perovskites exhibit exceptional optoelectronic properties:</p>

<blockquote class="scavenger-quote" data-quote-id="re-phd-q2">
<p>"The defect tolerance of lead halide perovskites—enabling high efficiency despite high defect densities—arises from their unusual band structure: antibonding states at the valence band maximum and a shallow nature of dominant intrinsic defects."</p>
<cite>— Stranks & Snaith, Nature Nanotechnology, 2015</cite>
</blockquote>

<h4>Open Research Questions:</h4>
<ul>
<li>Ion migration and hysteresis mechanisms</li>
<li>Phase stability in mixed-cation/mixed-halide compositions</li>
<li>Scalable deposition maintaining small-area performance</li>
<li>Environmental fate and lead sequestration strategies</li>
<li>Accelerated lifetime testing protocols</li>
</ul>

<h3>Techno-Economic and Energy Systems Analysis</h3>

<h4>Learning Curves and Technology Forecasting</h4>
<p>PV exhibits consistent learning rates of approximately 20% cost reduction per doubling of cumulative capacity:</p>

<blockquote class="scavenger-quote" data-quote-id="re-phd-q3">
<p>"Solar PV has followed a remarkably consistent learning curve for over four decades. The implications are profound: if current learning rates continue, solar becomes the cheapest electricity source virtually everywhere by 2030, fundamentally reshaping optimal decarbonization pathways."</p>
<cite>— Way et al., Joule, 2022</cite>
</blockquote>

<h4>Critical Systems Questions:</h4>
<ul>
<li>Grid architecture evolution with 50%+ renewable penetration</li>
<li>Storage requirements and optimal capacity mixes</li>
<li>Geographic and temporal complementarity</li>
<li>Sector coupling (electrification of transport, heat, industry)</li>
<li>Material constraints (silver, polysilicon, rare earths for magnets)</li>
</ul>

<div class="image-placeholder" data-caption="Solar learning curve and projected cost trajectories">
[Image: Log-log plot of solar PV cost versus cumulative deployment showing learning curve]
</div>

<h3>Critical Political Economy Perspectives</h3>

<p>Solar's expansion intersects with questions of justice, development, and power:</p>

<blockquote class="scavenger-quote" data-quote-id="re-phd-q4">
<p>"The geography of solar production—concentrated manufacturing in China, polysilicon from Xinjiang, cobalt from DRC—raises critical questions about whether the 'clean' energy transition reproduces extractive relationships and labor abuses."</p>
<cite>— Mulvaney, "Solar Power: Innovation, Sustainability, and Environmental Justice," 2019</cite>
</blockquote>

<h4>Research Frontiers:</h4>
<ul>
<li>Supply chain transparency and ethical sourcing</li>
<li>Circular economy: recycling, second-life applications</li>
<li>Energy justice: equitable access to solar benefits</li>
<li>Land use conflicts and agrivoltaics</li>
<li>Post-colonial perspectives on energy transitions</li>
</ul>

<h3>Methodological Considerations for PV Research</h3>

<table class="methodology-table">
<thead>
<tr><th>Research Domain</th><th>Key Methods</th><th>Emerging Tools</th></tr>
</thead>
<tbody>
<tr><td>Device physics</td><td>SCAPS, PC1D, Sentaurus</td><td>Machine learning potentials, high-throughput DFT</td></tr>
<tr><td>Systems modeling</td><td>SAM, PVSyst, REopt</td><td>Capacity expansion models with hourly resolution</td></tr>
<tr><td>Resource assessment</td><td>NSRDB, PVGIS, ground stations</td><td>Satellite-derived irradiance, ML downscaling</td></tr>
<tr><td>Social analysis</td><td>LCA, surveys, case studies</td><td>Agent-based adoption modeling, discourse analysis</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Doctoral Research Orientation</h4>
<p>PV research spans fundamental physics to global energy system transformation. Impactful doctoral work often bridges disciplines—connecting materials discovery to manufacturing scale-up, or device engineering to market and policy analysis. The urgency of climate change demands research that can accelerate deployment while critically examining whose interests are served.</p>
</div>
</div>`
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
        },
        {
          id: 'rsq2',
          question: {
            ELEMENTARY: 'In the story, how long did it take Sunny to travel from the sun to Earth?',
            MIDDLE_SCHOOL: 'Who discovered the photovoltaic effect in 1839?',
            HIGH_SCHOOL: 'What year did Bell Labs create the first practical solar cell?',
            UNDERGRADUATE: 'By what percentage has utility-scale solar LCOE fallen since 2009?',
            GRADUATE: 'What is California\'s "duck curve" problem?',
            PHD: 'What does "defect tolerance" in perovskites refer to?'
          },
          options: {
            ELEMENTARY: ['8 minutes', '8 hours', '8 days', '8 seconds'],
            MIDDLE_SCHOOL: ['Edmond Becquerel', 'Albert Einstein', 'Thomas Edison', 'Benjamin Franklin'],
            HIGH_SCHOOL: ['1954', '1839', '1990', '2000'],
            UNDERGRADUATE: ['91%', '50%', '25%', '10%'],
            GRADUATE: ['Steep evening ramps as solar declines', 'Too much wind power', 'Not enough solar', 'Battery failures'],
            PHD: ['High efficiency despite high defect densities', 'Zero defects required', 'Defects improve performance', 'Mechanical strength']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Light from the sun takes about 8 minutes to reach Earth!',
            MIDDLE_SCHOOL: 'French physicist Edmond Becquerel discovered the photovoltaic effect at age 19.',
            HIGH_SCHOOL: 'Bell Labs scientists created the first practical silicon solar cell in 1954.',
            UNDERGRADUATE: 'Solar LCOE fell 91% from $359/MWh in 2009 to $33/MWh in 2022.',
            GRADUATE: 'The duck curve shows steep evening ramps when solar production drops and demand increases.',
            PHD: 'Perovskites achieve high efficiency despite having many defects due to their unusual band structure.'
          }
        },
        {
          id: 'rsq3',
          question: {
            ELEMENTARY: 'What does an inverter do in a solar system?',
            MIDDLE_SCHOOL: 'According to the lesson, how much have solar panel costs dropped since 1976?',
            HIGH_SCHOOL: 'What is a P-N junction in a solar cell?',
            UNDERGRADUATE: 'What is LCOE?',
            GRADUATE: 'What is the difference between grid-following and grid-forming inverters?',
            PHD: 'What third-generation concept uses multiple electron-hole pairs from single photons?'
          },
          options: {
            ELEMENTARY: ['Changes DC to AC electricity', 'Stores sunlight', 'Makes panels spin', 'Cleans the panels'],
            MIDDLE_SCHOOL: ['99%', '50%', '25%', '10%'],
            HIGH_SCHOOL: ['Boundary between N-type and P-type silicon', 'The panel frame', 'The glass cover', 'The mounting brackets'],
            UNDERGRADUATE: ['Levelized cost of energy over system lifetime', 'Light conversion output efficiency', 'Low cost operating expenses', 'Load capacity optimization estimate'],
            GRADUATE: ['Grid-forming actively maintains stability', 'No difference', 'Grid-following is newer', 'Grid-forming is cheaper'],
            PHD: ['Multiple exciton generation', 'Hot carrier cells', 'Tandem cells', 'Thermophotovoltaics']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'The inverter changes DC (direct current) electricity to AC (alternating current) that your home uses!',
            MIDDLE_SCHOOL: 'Solar panel costs have dropped an amazing 99% since 1976.',
            HIGH_SCHOOL: 'A P-N junction is where N-type silicon (extra electrons) meets P-type silicon (electron "holes"), creating an electric field.',
            UNDERGRADUATE: 'LCOE is the levelized cost of energy, incorporating capital, operations, and financing over the system lifetime.',
            GRADUATE: 'Grid-forming inverters actively participate in maintaining grid stability, while grid-following inverters passively follow grid signals.',
            PHD: 'Multiple exciton generation creates multiple electron-hole pairs from single high-energy photons.'
          }
        },
        {
          id: 'rsq4',
          question: {
            ELEMENTARY: 'What can solar power run in your home?',
            MIDDLE_SCHOOL: 'What component stores solar energy for use at night?',
            HIGH_SCHOOL: 'What happens to solar cell efficiency when they get hot?',
            UNDERGRADUATE: 'What does DC/AC ratio mean in system design?',
            GRADUATE: 'What efficiency have perovskite-silicon tandem cells approached?',
            PHD: 'What critical supply chain concern does the lesson raise about solar manufacturing?'
          },
          options: {
            ELEMENTARY: ['Lights, refrigerators, TVs, and computers', 'Only outdoor lights', 'Nothing inside', 'Just the doorbell'],
            MIDDLE_SCHOOL: ['Battery', 'Inverter', 'Meter', 'Mounting system'],
            HIGH_SCHOOL: ['Efficiency decreases', 'Efficiency increases', 'No change', 'They stop working'],
            UNDERGRADUATE: ['Oversizing DC relative to AC inverter capacity', 'Direct current to alternating current conversion', 'Daily capacity versus annual capacity', 'Design complexity versus actual complexity'],
            GRADUATE: ['30%', '20%', '15%', '40%'],
            PHD: ['Concentrated manufacturing and potential labor issues', 'Panel colors', 'Shipping costs', 'Warranty lengths']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Solar power can run lights, refrigerators, TVs, computers, and even electric cars!',
            MIDDLE_SCHOOL: 'A battery (optional in many systems) stores solar energy so you can use it at night.',
            HIGH_SCHOOL: 'Solar cells lose efficiency as they heat up—that\'s why temperature is an important design factor.',
            UNDERGRADUATE: 'DC/AC ratio (typically 1.1-1.3) means oversizing the DC array relative to inverter capacity to improve capacity factor.',
            GRADUATE: 'Perovskite-silicon tandem cells are approaching 30% efficiency, combining the benefits of both technologies.',
            PHD: 'The lesson raises concerns about concentrated manufacturing in China and polysilicon sourcing, questioning whether clean energy transitions reproduce extractive relationships.'
          }
        },
        {
          id: 'rsq5',
          question: {
            ELEMENTARY: 'According to the scientist quote, how much sunlight hits Earth in one hour?',
            MIDDLE_SCHOOL: 'How many countries now have solar power plants?',
            HIGH_SCHOOL: 'What is the optimal panel orientation in the Northern Hemisphere?',
            UNDERGRADUATE: 'What is a typical performance ratio for a PV system?',
            GRADUATE: 'What IEEE standard covers smart inverter grid support functions?',
            PHD: 'What does the lesson say about solar learning curves?'
          },
          options: {
            ELEMENTARY: ['Enough to power the world for a year', 'Enough for one house', 'A tiny amount', 'No one knows'],
            MIDDLE_SCHOOL: ['Over 130', '10', '50', '5'],
            HIGH_SCHOOL: ['True south at tilt equal to latitude', 'East facing', 'Flat on the roof', 'North facing'],
            UNDERGRADUATE: ['75-85%', '50-60%', '90-100%', '30-40%'],
            GRADUATE: ['IEEE 1547-2018', 'IEEE 802.11', 'IEEE 1394', 'IEEE 754'],
            PHD: ['20% cost reduction per doubling of capacity', '10% reduction per year', '50% reduction per decade', 'Costs are increasing']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Every hour, enough sunlight hits Earth to power the whole world for an entire year!',
            MIDDLE_SCHOOL: 'Over 130 countries now have solar power plants.',
            HIGH_SCHOOL: 'In the Northern Hemisphere, optimal orientation is true south at a tilt angle roughly equal to your latitude.',
            UNDERGRADUATE: 'Performance ratio (actual vs. expected output under standard test conditions) typically ranges from 75-85%.',
            GRADUATE: 'IEEE 1547-2018 covers smart inverter functions including Volt-VAR support and other grid services.',
            PHD: 'Solar PV has followed a consistent learning curve of approximately 20% cost reduction per doubling of cumulative capacity for over four decades.'
          }
        },
        { id: 'rsq6', question: { ELEMENTARY: 'What color are most solar panels?', MIDDLE_SCHOOL: 'What does "photovoltaic" mean?', HIGH_SCHOOL: 'What is net metering?', UNDERGRADUATE: 'What is the typical degradation rate for crystalline silicon PV modules?', GRADUATE: 'What mechanism causes potential-induced degradation (PID) in PV modules?', PHD: 'How does the Auger recombination limit differ from the Shockley-Queisser limit?' }, options: { ELEMENTARY: ['Blue or black', 'Red', 'Green', 'Yellow'], MIDDLE_SCHOOL: ['Light-electricity', 'Photo-voltage', 'Power-vision', 'Panel-variety'], HIGH_SCHOOL: ['Selling excess power back to the grid', 'Measuring network speed', 'Counting solar panels', 'Testing battery levels'], UNDERGRADUATE: ['0.5-0.7% per year', '5% per year', '0.01% per year', '3% per year'], GRADUATE: ['Leakage current from high system voltage to grounded frame', 'Physical cracking from thermal cycling', 'UV degradation of encapsulant', 'Corrosion of bus bars'], PHD: ['Auger accounts for carrier-carrier interaction losses reducing max to ~29.4%', 'They are identical', 'Auger gives higher efficiency limits', 'Auger only applies to thin-film'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Most solar panels are blue or black because those colors absorb the most sunlight!', MIDDLE_SCHOOL: 'Photovoltaic comes from "photo" (light) and "voltaic" (electricity).', HIGH_SCHOOL: 'Net metering allows homeowners to sell excess solar electricity back to the utility grid for credit.', UNDERGRADUATE: 'Crystalline silicon modules typically degrade at 0.5-0.7% per year, with most manufacturers warranting 80% output at 25 years.', GRADUATE: 'PID occurs when high system voltage drives leakage current through the encapsulant to the grounded module frame, causing shunting in cells.', PHD: 'The Auger limit (~29.4% for silicon) accounts for three-particle carrier recombination that the radiative-only SQ limit (~33.7%) does not include.' } },
        { id: 'rsq7', question: { ELEMENTARY: 'Can solar panels work on cloudy days?', MIDDLE_SCHOOL: 'What is a solar farm?', HIGH_SCHOOL: 'What is the function of an MPPT charge controller?', UNDERGRADUATE: 'What is the ITC rate for commercial solar under the Inflation Reduction Act?', GRADUATE: 'What is the primary advantage of heterojunction (HJT) cell architecture?', PHD: 'What is the thermodynamic efficiency limit for a solar cell under maximum concentration?' }, options: { ELEMENTARY: ['Yes, but they make less electricity', 'No, they stop completely', 'They work better on cloudy days', 'Only if it rains'], MIDDLE_SCHOOL: ['A large area of many solar panels', 'A farm powered by solar', 'A place that grows solar panels', 'A sunny garden'], HIGH_SCHOOL: ['Finds optimal voltage to maximize power extraction', 'Controls maximum panel temperature', 'Prevents power theft', 'Measures panel performance'], UNDERGRADUATE: ['30%', '10%', '50%', '26%'], GRADUATE: ['Higher Voc from excellent surface passivation with amorphous silicon layers', 'Lower manufacturing cost', 'Thicker wafers improve durability', 'Better performance in shade'], PHD: ['About 86% (Landsberg limit)', 'About 50%', 'About 33%', 'About 95%'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar panels still work on cloudy days! They just make less electricity.', MIDDLE_SCHOOL: 'A solar farm is a large installation with thousands of solar panels that generates electricity for many homes.', HIGH_SCHOOL: 'MPPT (Maximum Power Point Tracking) continuously adjusts the operating voltage to extract maximum power under varying conditions.', UNDERGRADUATE: 'The IRA provides a 30% ITC for commercial solar, with potential adders for domestic content, energy communities, and low-income projects.', GRADUATE: 'HJT cells achieve higher open-circuit voltage (Voc > 740 mV) through excellent surface passivation using intrinsic amorphous silicon interlayers.', PHD: 'The Landsberg limit (~86%) represents the theoretical maximum under maximum concentration, accounting for entropy generation.' } },
        { id: 'rsq8', question: { ELEMENTARY: 'How long do solar panels usually last?', MIDDLE_SCHOOL: 'What is the environmental benefit of solar energy?', HIGH_SCHOOL: 'What is the difference between series and parallel connections in a PV array?', UNDERGRADUATE: 'What tool does NREL provide for estimating PV system performance?', GRADUATE: 'What is the significance of California NEM 3.0?', PHD: 'What is the Staebler-Wronski effect?' }, options: { ELEMENTARY: ['25-30 years', '1-2 years', '100 years', '5 years'], MIDDLE_SCHOOL: ['No air pollution or greenhouse gases', 'Makes rain', 'Creates more wind', 'Heats the ocean'], HIGH_SCHOOL: ['Series increases voltage; parallel increases current', 'They are the same', 'Series increases current; parallel increases voltage', 'Neither affects output'], UNDERGRADUATE: ['PVWatts Calculator', 'WindPro', 'HOMER', 'RETScreen'], GRADUATE: ['Shifts compensation from retail to avoided-cost rate', 'Increases solar incentives', 'Eliminates time-of-use pricing', 'Mandates battery storage'], PHD: ['Light-induced degradation in amorphous silicon causing 10-30% efficiency loss', 'Thermal degradation in perovskites', 'Moisture ingress in CdTe', 'Delamination in CIGS'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar panels are built to last 25-30 years! Some from the 1980s still work.', MIDDLE_SCHOOL: 'Solar energy produces no air pollution or greenhouse gases during operation.', HIGH_SCHOOL: 'Series connections add voltages while keeping current constant; parallel connections add currents while keeping voltage constant.', UNDERGRADUATE: 'NREL\'s PVWatts Calculator uses TMY weather data to estimate monthly and annual energy production for grid-connected PV systems.', GRADUATE: 'NEM 3.0 reduced export compensation to avoided-cost rates (~$0.05/kWh vs retail ~$0.30/kWh), changing behind-the-meter solar economics.', PHD: 'The Staebler-Wronski effect causes 10-30% efficiency degradation in a-Si cells upon initial light exposure due to metastable defect creation.' } },
        { id: 'rsq9', question: { ELEMENTARY: 'What happens to extra solar electricity your home doesn\'t use?', MIDDLE_SCHOOL: 'What time of day do solar panels produce the most energy?', HIGH_SCHOOL: 'What is the purpose of bypass diodes in a PV module?', UNDERGRADUATE: 'What is the typical system loss derating factor in PV performance modeling?', GRADUATE: 'How do bifacial gain factors vary with ground albedo?', PHD: 'What role does defect passivation play in high-efficiency perovskite cells?' }, options: { ELEMENTARY: ['It goes to the power grid for others to use', 'It disappears', 'It burns up', 'It gets too hot'], MIDDLE_SCHOOL: ['Around noon when the sun is highest', 'At sunrise', 'At sunset', 'At midnight'], HIGH_SCHOOL: ['Prevent reverse bias damage from shaded cells', 'Increase voltage output', 'Store excess energy', 'Connect to the inverter'], UNDERGRADUATE: ['14% total system losses (0.86 derate)', '2% losses', '50% losses', '30% losses'], GRADUATE: ['Higher albedo (0.5+) increases bifacial gain from 5% to 25-30%', 'Albedo has no effect', 'Lower albedo gives higher gain', 'Only works on snow'], PHD: ['Reduces non-radiative recombination at grain boundaries and interfaces', 'Increases bandgap', 'Improves mechanical strength', 'Changes crystal structure'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Extra electricity flows through the power lines to help power other homes nearby!', MIDDLE_SCHOOL: 'Solar panels produce the most energy around noon when the sun is at its highest point.', HIGH_SCHOOL: 'Bypass diodes allow current to flow around shaded cells, preventing hotspots and reverse-bias damage.', UNDERGRADUATE: 'Standard PV models apply ~14% total system loss derate (0.86 factor) for soiling, wiring, inverter, temperature, and mismatch losses.', GRADUATE: 'Bifacial gain increases with albedo: white surfaces (0.5-0.8) yield 20-30% rear gain versus 5-10% for grass (0.2).', PHD: 'Defect passivation at grain boundaries reduces Shockley-Read-Hall recombination, the dominant non-radiative loss mechanism.' } },
        { id: 'rsq10', question: { ELEMENTARY: 'Why is solar energy called "renewable"?', MIDDLE_SCHOOL: 'What is the federal solar tax credit called?', HIGH_SCHOOL: 'What is solar irradiance and how is it measured?', UNDERGRADUATE: 'What distinguishes a Tier 1 solar module manufacturer?', GRADUATE: 'What are the key differences between string inverters, microinverters, and power optimizers?', PHD: 'How does detailed balance constrain multi-junction tandem cell design?' }, options: { ELEMENTARY: ['The sun keeps shining and never runs out', 'Panels can be recycled', 'It renews your electricity bill', 'It only works once'], MIDDLE_SCHOOL: ['Investment Tax Credit (ITC)', 'Solar Savings Plan', 'Green Energy Bonus', 'Power Discount'], HIGH_SCHOOL: ['Solar power per unit area in W/m²', 'Panel temperature in degrees', 'Number of sunny days per year', 'Panel efficiency percentage'], UNDERGRADUATE: ['Bankable manufacturer with vertically integrated production and 5+ year track record', 'Cheapest manufacturer', 'Highest efficiency only', 'US-manufactured only'], GRADUATE: ['String: central; micro: module-level MPPT; optimizers: module-level DC-DC with central inverter', 'They are identical', 'Only microinverters work with batteries', 'String inverters are newest'], PHD: ['Each subcell bandgap must minimize thermalization while maintaining current matching', 'Any bandgap combination works', 'Only two junctions are useful', 'Detailed balance is irrelevant'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar energy is renewable because the sun keeps shining every day — we can never use it up!', MIDDLE_SCHOOL: 'The Investment Tax Credit (ITC) gives a 30% tax credit for installing solar panels.', HIGH_SCHOOL: 'Solar irradiance measures sunlight power per unit area in W/m². Standard Test Conditions use 1000 W/m².', UNDERGRADUATE: 'BNEF defines Tier 1 manufacturers as bankable, vertically integrated, with strong finances and 5+ years history.', GRADUATE: 'String inverters convert DC centrally; microinverters do module-level DC-AC with independent MPPT; optimizers provide module-level DC-DC optimization with a central inverter.', PHD: 'Detailed balance requires optimizing subcell bandgaps to divide the solar spectrum, minimizing thermalization while maintaining current or voltage matching constraints.' } }
      ]
    },
    externalResources: [
      { title: 'NREL Solar Research', url: 'https://www.nrel.gov/solar/', type: 'research' },
      { title: 'Solar Energy Industries Association', url: 'https://www.seia.org/', type: 'article' },
      { title: 'International Energy Agency - Solar PV', url: 'https://www.iea.org/energy-system/renewables/solar-pv', type: 'research' }
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
    accreditation: {
      courseTitle: 'Wind Energy Engineering: Resource Assessment, Turbine Design, and Grid Integration',
      courseDescription: 'This module examines wind energy from atmospheric boundary layer physics through utility-scale project development and grid integration. Students analyze wind resource characterization using Weibull distributions, vertical shear profiles, and measurement technologies (met towers, SODAR, LIDAR). Turbine engineering topics include aerodynamic performance limits (Betz law, blade element momentum theory), IEC wind class certification, and modern drivetrain architectures. Offshore wind technology is examined in depth, including fixed-bottom and floating foundation types, wake effects in large arrays, and emerging concepts such as airborne wind energy. Economic analysis covers capital cost structures, capacity factors, LCOE benchmarking, and PPA negotiation. Grid integration challenges at high penetration are explored through the lens of inertia reduction, synthetic frequency response, and wholesale market design. Students complete applied activities in site assessment methodology and array optimization.',
      learningObjectives: [
        'Apply Weibull distribution analysis and vertical wind shear modeling to characterize site-specific wind resources',
        'Evaluate turbine selection criteria using IEC wind class standards, power curves, and capacity factor analysis',
        'Analyze wake effects in wind farm arrays and assess mitigation strategies including layout optimization and wake steering',
        'Calculate Annual Energy Production (AEP) incorporating loss factors for availability, wake, electrical, and curtailment',
        'Synthesize offshore wind engineering challenges across fixed-bottom, floating, and emerging platform technologies',
        'Assess grid stability implications of high wind penetration including inertia reduction and frequency response',
        'Evaluate wind project economics using LCOE, IRR, and PPA frameworks',
        'Design a wind resource assessment plan incorporating measurement campaign specifications and uncertainty analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level physics', 'Basic fluid mechanics or physical science', 'Introductory statistics'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Compare the engineering tradeoffs between onshore and offshore wind development for a coastal region',
          'Scenario question: Given Weibull parameters k=2.1 and c=7.5 m/s, estimate AEP for a 3 MW turbine with known power curve',
          'Mini-project: Conduct a desktop wind resource assessment using publicly available wind atlas data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering wind physics, turbine engineering, and project economics',
          'Site assessment deliverable: Complete wind resource characterization report for a proposed project site'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Wind Farm Site Assessment and Preliminary Design',
        description: 'Conduct a comprehensive wind resource assessment and preliminary design for an onshore or offshore wind project using real-world site data, terrain analysis, and turbine specifications.',
        deliverables: [
          'Wind resource analysis with Weibull parameter estimation and wind rose',
          'Turbine selection justification with IEC class matching',
          'Preliminary array layout with wake loss estimation',
          'AEP calculation with itemized loss breakdown',
          'Economic analysis with LCOE and sensitivity to capacity factor',
          'Environmental and permitting considerations summary'
        ],
        rubricCriteria: [
          'Accuracy and rigor of wind resource characterization (25%)',
          'Appropriateness of turbine selection and array design (20%)',
          'Completeness of AEP calculation and loss analysis (25%)',
          'Quality of economic analysis and assumptions (15%)',
          'Professional presentation and communication (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content aligns with upper-division wind energy engineering curriculum. Quantitative methods include statistical resource analysis, aerodynamic theory, and financial modeling consistent with ABET-accredited programs.',
        identityVerification: 'Platform authentication with photo ID verification at enrollment and proctored assessments.',
        regularSubstantiveInteraction: 'Discussion forums with SME moderation, automated simulation feedback, optional synchronous sessions with wind industry professionals.',
        smeRecommendations: [
          'Certified wind resource analyst or atmospheric scientist for resource assessment content',
          'Mechanical or aerospace engineer with turbine design experience',
          'Grid integration specialist for high-penetration wind scenarios'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [
      {
        id: 're-wind-1',
        title: 'Catching the Wind',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>Wendy the Wind and the Dancing Giants</h2>

<p>Have you ever felt the wind blow on your face? That invisible force is powerful enough to spin giant machines called wind turbines!</p>

<p>Wendy the Wind loved to play. She would swirl through trees, fly kites high in the sky, and make flags wave. But her favorite thing was visiting the tall white towers on the hillside.</p>

<div class="image-placeholder" data-caption="A friendly wind character approaching wind turbines">
[Image: A cartoon wind character blowing toward spinning wind turbines on a green hill]
</div>

<h3>What is Wind?</h3>

<p>Wind is just air that is moving! When the sun heats up the ground, the air above it gets warm and rises up. Cooler air rushes in to take its place—and that moving air is what we call wind!</p>

<p>Different places get different amounts of wind:</p>
<ul>
<li><strong>Hilltops</strong> — Wind loves to blow over hills</li>
<li><strong>Coasts</strong> — Where land meets ocean, wind blows strong</li>
<li><strong>Plains</strong> — Flat, open areas let wind blow freely</li>
<li><strong>Mountains</strong> — Wind squeezes through mountain passes</li>
</ul>

<h3>How Wind Turbines Work</h3>

<p>When Wendy the Wind reaches the tall towers, here's what happens:</p>

<ol>
<li><strong>Wind blows against the blades</strong> — The blades are shaped like airplane wings to catch the wind</li>
<li><strong>Blades spin around and around</strong> — Just like a pinwheel or a fan running backwards</li>
<li><strong>Spinning turns a generator</strong> — Inside the box on top, magnets spin to make electricity</li>
<li><strong>Power travels through wires</strong> — Electricity flows down the tower and to homes!</li>
</ol>

<div class="image-placeholder" data-caption="Inside a wind turbine showing how it makes electricity">
[Image: Cutaway diagram of a wind turbine with labeled parts and arrows showing how wind becomes electricity]
</div>

<h3>Parts of a Wind Turbine</h3>

<p>Wind turbines have several important parts:</p>

<ul>
<li><strong>Blades</strong> — Usually 3 giant blades that catch the wind (some are longer than a football field!)</li>
<li><strong>Hub</strong> — The center piece that holds all the blades together</li>
<li><strong>Nacelle</strong> — The box behind the blades that contains the generator</li>
<li><strong>Tower</strong> — The tall pole that holds everything up high</li>
<li><strong>Foundation</strong> — Heavy concrete buried in the ground to keep it standing</li>
</ul>

<div class="fun-fact">
<h4>Amazing Fact!</h4>
<p>Some wind turbine blades are over 100 meters long—that's longer than a football field! And the towers can be as tall as a 30-story building!</p>
</div>

<h3>Wind Power Around the World</h3>

<p>Wind turbines are spinning all around the world:</p>

<ul>
<li><strong>On land</strong> — In open fields and on hilltops</li>
<li><strong>In the ocean</strong> — Offshore wind farms sit in the water</li>
<li><strong>On farms</strong> — Farmers can grow crops around turbines</li>
<li><strong>Near cities</strong> — Some small turbines power individual buildings</li>
</ul>

<h3>Why Wind Power is Great</h3>

<p>Wind power is one of the cleanest ways to make electricity:</p>

<ul>
<li>Wind is free—it keeps blowing and never runs out!</li>
<li>No smoke or pollution—just clean energy</li>
<li>Birds and bats can be protected with careful planning</li>
<li>Land under turbines can still be used for farming</li>
</ul>

<h3>When is it Windy?</h3>

<p>Wind doesn't blow all the time, but that's okay! Here's what happens:</p>

<ul>
<li>When it's windy, turbines make lots of electricity</li>
<li>When it's calm, we use electricity from other sources</li>
<li>Batteries can store extra wind energy for later</li>
<li>Having many turbines spread out helps—it's almost always windy somewhere!</li>
</ul>

<h3>Be a Wind Detective!</h3>

<p>Go outside and see if you can find signs of wind:</p>

<ul>
<li>Watch flags and see which way they point</li>
<li>Look at trees swaying in the breeze</li>
<li>Feel the wind on your face—is it strong or gentle?</li>
<li>Try to spot a wind turbine on a drive through the country</li>
</ul>

<div class="key-concept">
<h4>Remember!</h4>
<p>Wind turbines turn the invisible power of moving air into clean electricity! They're like giant pinwheels that help power our homes, schools, and cities.</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Harnessing the Wind: From Breeze to Electricity</h2>

<p>For thousands of years, humans have used wind power—from ancient sailing ships to traditional windmills grinding grain. Today, modern wind turbines are some of the most impressive machines ever built, turning invisible air currents into clean electricity.</p>

<div class="image-placeholder" data-caption="Evolution from traditional windmill to modern wind turbine">
[Image: Side-by-side comparison of a Dutch windmill and a modern wind turbine]
</div>

<h3>What Creates Wind?</h3>

<p>Wind is caused by uneven heating of Earth's surface by the sun:</p>

<ol>
<li>The sun heats land faster than water</li>
<li>Warm air over land rises (it's less dense)</li>
<li>Cooler air from over water rushes in to replace it</li>
<li>This moving air is what we call wind</li>
</ol>

<p>This is why coastal areas often have reliable wind—the constant temperature difference between land and sea keeps air moving.</p>

<h3>Anatomy of a Wind Turbine</h3>

<p>Modern wind turbines are engineering marvels with several key components:</p>

<table class="component-table">
<tr><th>Component</th><th>Function</th><th>Interesting Fact</th></tr>
<tr><td>Blades</td><td>Catch the wind and rotate</td><td>Made of fiberglass, can be 80m+ long</td></tr>
<tr><td>Hub</td><td>Connects blades to main shaft</td><td>Can weigh over 20 tons</td></tr>
<tr><td>Nacelle</td><td>Houses generator and gearbox</td><td>Size of a school bus</td></tr>
<tr><td>Tower</td><td>Supports the nacelle and blades</td><td>Usually 80-150m tall</td></tr>
<tr><td>Foundation</td><td>Anchors the turbine</td><td>Uses 1,000+ tons of concrete</td></tr>
<tr><td>Transformer</td><td>Steps up voltage for grid</td><td>Located at tower base</td></tr>
</table>

<h3>Why Height Matters</h3>

<p>Wind turbines are getting taller for a good reason: wind is faster and more consistent at higher altitudes.</p>

<ul>
<li>Near the ground, trees, buildings, and terrain slow down the wind</li>
<li>Higher up, there's less friction—wind flows more freely</li>
<li>A turbine at 100m height can capture 30% more energy than one at 50m</li>
</ul>

<div class="did-you-know">
<h4>Did You Know?</h4>
<p>If you double the wind speed, you get EIGHT times more power! That's why finding the windiest locations is so important.</p>
</div>

<h3>How Blades Capture Wind</h3>

<p>Wind turbine blades work like airplane wings:</p>

<ol>
<li>The blade shape creates different air pressures on each side</li>
<li>This pressure difference creates "lift" that pushes the blade</li>
<li>The blade rotates around the hub</li>
<li>Most turbines spin at 10-20 revolutions per minute</li>
</ol>

<p>Modern blades can "pitch" (rotate on their axis) to capture wind at different speeds and to protect the turbine during storms.</p>

<h3>Inside the Nacelle</h3>

<p>The nacelle contains the machinery that turns rotation into electricity:</p>

<ul>
<li><strong>Main shaft:</strong> Connects to the hub and rotates slowly</li>
<li><strong>Gearbox:</strong> Speeds up rotation (from ~15 rpm to ~1,500 rpm)</li>
<li><strong>Generator:</strong> Converts rotational energy to electricity</li>
<li><strong>Yaw motor:</strong> Rotates the nacelle to face the wind</li>
<li><strong>Controller:</strong> Brain of the turbine, optimizes performance</li>
<li><strong>Anemometer:</strong> Measures wind speed and direction</li>
</ul>

<h3>Types of Wind Farms</h3>

<table class="types-table">
<tr><th>Type</th><th>Location</th><th>Advantages</th><th>Challenges</th></tr>
<tr><td>Onshore</td><td>Land-based</td><td>Cheaper to build and maintain</td><td>Less consistent wind, visual impact</td></tr>
<tr><td>Offshore</td><td>In the ocean</td><td>Stronger, steadier winds</td><td>More expensive, harder to maintain</td></tr>
<tr><td>Nearshore</td><td>Close to coast</td><td>Balance of both</td><td>Can be visible from shore</td></tr>
</table>

<h3>Wind Power by the Numbers</h3>

<ul>
<li>A single large turbine can power 1,000-2,000 homes</li>
<li>Wind provides about 7% of global electricity</li>
<li>The largest offshore wind farm has over 100 turbines</li>
<li>Wind energy costs have dropped 70% since 2009</li>
<li>The wind industry employs over 1 million people worldwide</li>
</ul>

<h3>Environmental Considerations</h3>

<p>Wind power is very clean, but we still need to plan carefully:</p>

<ul>
<li><strong>Birds and bats:</strong> Careful siting and radar can reduce collisions</li>
<li><strong>Noise:</strong> Modern turbines are quieter, and setbacks from homes help</li>
<li><strong>Visual impact:</strong> Some people think they're beautiful; others prefer not to see them</li>
<li><strong>Land use:</strong> The actual turbine footprint is small—farming continues around them</li>
</ul>

<div class="key-concept">
<h4>Key Takeaway</h4>
<p>Wind turbines are sophisticated machines that convert the kinetic energy of moving air into clean electricity. As turbines grow taller and technology improves, wind is becoming one of our most important sources of renewable energy.</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Wind Energy Engineering: Physics, Technology, and Systems</h2>

<p>Wind energy has transformed from ancient sailing ships and grain mills to cutting-edge turbines that are among the largest rotating machines ever built. Understanding wind power requires knowledge of fluid dynamics, electrical engineering, and systems thinking.</p>

<div class="image-placeholder" data-caption="Size comparison of wind turbines through history">
[Image: Scale comparison showing turbine size evolution from 1980s to present day]
</div>

<h3>The Physics of Wind Power</h3>

<p>The power available in the wind is given by a fundamental equation:</p>

<code>P = ½ρAv³</code>

<p>Where:</p>
<ul>
<li><strong>P</strong> = Power (Watts)</li>
<li><strong>ρ</strong> = Air density (~1.225 kg/m³ at sea level)</li>
<li><strong>A</strong> = Swept area of the rotor (πr²)</li>
<li><strong>v</strong> = Wind speed (m/s)</li>
</ul>

<p>The cubic relationship with wind speed is crucial: doubling wind speed increases available power by 8 times! This explains why turbines are built so tall—to reach stronger, steadier winds aloft.</p>

<h3>The Betz Limit</h3>

<p>In 1919, German physicist Albert Betz proved that no turbine can capture more than 59.3% of the wind's kinetic energy. This is called the Betz Limit.</p>

<blockquote class="scavenger-quote" data-quote-id="re-wind-q1">
<p>"If a turbine extracted all the wind's energy, the air would stop moving and pile up behind it. The optimal extraction leaves enough energy for air to continue flowing through."</p>
<cite>— Albert Betz, 1919</cite>
</blockquote>

<p>Modern turbines achieve 35-45% efficiency—quite close to the theoretical maximum when accounting for real-world losses.</p>

<h3>Blade Aerodynamics</h3>

<p>Wind turbine blades are carefully engineered airfoils:</p>

<ul>
<li><strong>Root:</strong> Thick and strong to handle structural loads</li>
<li><strong>Tip:</strong> Thin and fast-moving, optimized for aerodynamics</li>
<li><strong>Twist:</strong> Blade angle changes along the length to maintain optimal attack angle</li>
<li><strong>Pitch control:</strong> Active systems rotate blades to optimize capture or limit power</li>
</ul>

<h4>Tip Speed Ratio</h4>

<p>The tip speed ratio (λ) is the ratio of blade tip speed to wind speed:</p>

<code>λ = (ω × r) / v</code>

<p>Optimal λ is typically 6-8 for modern three-blade turbines. Too slow and blades miss wind; too fast and blades create turbulence that reduces efficiency.</p>

<h3>Modern Turbine Specifications</h3>

<table class="specs-table">
<tr><th>Parameter</th><th>1990s Turbine</th><th>Modern Onshore</th><th>Modern Offshore</th></tr>
<tr><td>Capacity</td><td>0.5 MW</td><td>3-6 MW</td><td>10-15 MW</td></tr>
<tr><td>Rotor Diameter</td><td>40m</td><td>120-150m</td><td>180-220m</td></tr>
<tr><td>Hub Height</td><td>40m</td><td>80-120m</td><td>100-150m</td></tr>
<tr><td>Capacity Factor</td><td>20%</td><td>30-40%</td><td>45-55%</td></tr>
</table>

<h3>Power Electronics and Control</h3>

<p>Modern turbines use sophisticated electronics:</p>

<ul>
<li><strong>Variable speed operation:</strong> Turbines adjust rotation speed for optimal efficiency</li>
<li><strong>Power converters:</strong> Convert variable frequency AC to grid-compatible AC</li>
<li><strong>Pitch control:</strong> Blade angle adjusts continuously for power optimization</li>
<li><strong>Yaw control:</strong> Nacelle rotates to face changing wind direction</li>
</ul>

<h4>The Power Curve</h4>

<p>Each turbine has a characteristic power curve:</p>

<ul>
<li><strong>Cut-in speed:</strong> Minimum wind to start generating (typically 3-4 m/s)</li>
<li><strong>Rated speed:</strong> Wind speed at which turbine reaches maximum output (12-15 m/s)</li>
<li><strong>Cut-out speed:</strong> Maximum safe wind speed; turbine shuts down (25+ m/s)</li>
</ul>

<h3>Wind Resource Assessment</h3>

<p>Before building a wind farm, developers assess the resource:</p>

<ol>
<li><strong>Site screening:</strong> Identify promising locations using wind maps</li>
<li><strong>Met towers:</strong> Install 60-100m towers with anemometers for 1-2 years</li>
<li><strong>Data analysis:</strong> Calculate wind speed distribution, direction, and turbulence</li>
<li><strong>Energy modeling:</strong> Estimate annual energy production using turbine power curves</li>
<li><strong>Uncertainty analysis:</strong> Account for measurement and model uncertainties</li>
</ol>

<h3>Economics of Wind Energy</h3>

<p>Wind economics have improved dramatically:</p>

<ul>
<li>LCOE (levelized cost of energy) has dropped from $135/MWh in 2009 to under $40/MWh today</li>
<li>Capacity factors have increased from 25% to 40%+ with larger turbines</li>
<li>Typical project lifetime is 25-30 years</li>
<li>O&M costs are about 1-2% of capital cost per year</li>
</ul>

<div class="key-concept">
<h4>Engineering Insight</h4>
<p>Wind energy success depends on understanding the cubic relationship between wind speed and power. Every design decision—tower height, blade length, site selection—is driven by the need to capture faster, more consistent winds while managing structural loads and costs.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Wind Energy Systems: Resource Assessment, Design, and Integration</h2>

<p>Wind energy has become a cornerstone of global decarbonization efforts, with over 900 GW installed capacity worldwide as of 2023. Professional wind development requires rigorous resource assessment, sophisticated turbine selection, and careful integration with grid systems.</p>

<h3>Wind Resource Characterization</h3>

<h4>Measurement Techniques</h4>

<table class="measurement-table">
<tr><th>Technology</th><th>Height Range</th><th>Accuracy</th><th>Cost</th></tr>
<tr><td>Cup anemometer (met tower)</td><td>10-100m</td><td>±1% (calibrated)</td><td>$50-100k/year</td></tr>
<tr><td>SODAR (acoustic)</td><td>40-200m</td><td>±3-5%</td><td>$30-50k/year</td></tr>
<tr><td>LIDAR (scanning)</td><td>40-300m</td><td>±2-3%</td><td>$100-200k/year</td></tr>
<tr><td>Floating LIDAR</td><td>40-300m</td><td>±3-5%</td><td>$300-500k/year</td></tr>
</table>

<h4>Weibull Distribution</h4>

<p>Wind speeds at a site are typically characterized by the Weibull distribution:</p>

<code>f(v) = (k/c)(v/c)^(k-1) × exp(-(v/c)^k)</code>

<p>Where k is the shape parameter (typically 1.8-2.5) and c is the scale parameter (related to mean wind speed). Higher k values indicate more consistent wind.</p>

<h4>Vertical Wind Shear</h4>

<p>Wind speed increases with height according to the power law:</p>

<code>v₂/v₁ = (h₂/h₁)^α</code>

<p>The shear exponent α varies from 0.1 (unstable, daytime) to 0.3 (stable, nighttime). Accurate shear measurement is critical for extrapolating hub-height wind speeds.</p>

<h3>Energy Yield Estimation</h3>

<p>Annual Energy Production (AEP) is calculated by integrating the wind speed distribution with the turbine power curve:</p>

<code>AEP = 8760 × ∫ P(v) × f(v) dv</code>

<h4>Loss Factors</h4>

<table class="loss-table">
<tr><th>Loss Type</th><th>Typical Range</th><th>Mitigation</th></tr>
<tr><td>Wake losses</td><td>5-15%</td><td>Optimized array layout</td></tr>
<tr><td>Availability</td><td>2-5%</td><td>Preventive maintenance</td></tr>
<tr><td>Electrical losses</td><td>2-3%</td><td>Optimal cable sizing</td></tr>
<tr><td>Turbine performance</td><td>1-3%</td><td>Power curve verification</td></tr>
<tr><td>Environmental (icing, etc.)</td><td>0-5%</td><td>De-icing systems, site selection</td></tr>
<tr><td>Curtailment</td><td>0-10%</td><td>Grid development, storage</td></tr>
</table>

<h3>Turbine Selection and Siting</h3>

<h4>IEC Wind Classes</h4>

<table class="iec-table">
<tr><th>Class</th><th>V_ref (m/s)</th><th>V_ave (m/s)</th><th>Turbulence (A/B/C)</th></tr>
<tr><td>I (High wind)</td><td>50</td><td>10</td><td>16%/14%/12%</td></tr>
<tr><td>II (Medium wind)</td><td>42.5</td><td>8.5</td><td>16%/14%/12%</td></tr>
<tr><td>III (Low wind)</td><td>37.5</td><td>7.5</td><td>16%/14%/12%</td></tr>
</table>

<p>Matching turbine class to site conditions is essential for structural integrity and warranty coverage.</p>

<h3>Project Economics</h3>

<h4>Capital Cost Breakdown</h4>

<ul>
<li><strong>Turbine:</strong> 65-75% (nacelle, blades, tower)</li>
<li><strong>Balance of plant:</strong> 15-25% (foundations, roads, electrical)</li>
<li><strong>Development:</strong> 5-10% (permitting, engineering, interconnection)</li>
</ul>

<h4>Financial Metrics</h4>

<ul>
<li><strong>LCOE:</strong> $25-50/MWh for onshore, $50-80/MWh for offshore</li>
<li><strong>Capacity factor:</strong> 30-45% onshore, 45-55% offshore</li>
<li><strong>IRR targets:</strong> 8-12% equity returns typical</li>
<li><strong>PPA terms:</strong> 10-25 year power purchase agreements</li>
</ul>

<h3>Grid Integration Challenges</h3>

<ul>
<li><strong>Variability:</strong> Wind output varies with weather; forecasting essential</li>
<li><strong>Ramp rates:</strong> Some grids limit how fast wind can change output</li>
<li><strong>Curtailment:</strong> Grid constraints may require reducing output</li>
<li><strong>Capacity value:</strong> Contribution to system reliability is less than nameplate</li>
<li><strong>Ancillary services:</strong> Modern turbines can provide frequency response</li>
</ul>

<div class="key-concept">
<h4>Professional Practice</h4>
<p>Successful wind development integrates meteorological science, mechanical engineering, power systems, and finance. The trend toward larger turbines and offshore deployment continues to push technological boundaries while driving costs down through scale and learning.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Advanced Wind Energy: Technology Frontiers and System Integration</h2>

<p>Graduate-level wind energy analysis addresses the complex interactions between advanced turbine technologies, wake aerodynamics, grid stability challenges, and the economics of high renewable penetration. As wind approaches significant grid share, new technical and market challenges emerge.</p>

<h3>Offshore Wind Technology</h3>

<h4>Foundation Types</h4>

<table class="foundation-table">
<tr><th>Type</th><th>Water Depth</th><th>Advantages</th><th>Challenges</th></tr>
<tr><td>Monopile</td><td>0-30m</td><td>Simple, proven</td><td>Heavy, large vessels needed</td></tr>
<tr><td>Jacket</td><td>20-60m</td><td>Lighter, deeper water</td><td>Complex fabrication</td></tr>
<tr><td>Gravity base</td><td>0-30m</td><td>Local content, no piling</td><td>Very heavy, seabed prep</td></tr>
<tr><td>Floating (spar)</td><td>60-1000m+</td><td>Deep water access</td><td>Higher cost, mooring</td></tr>
<tr><td>Floating (semi-sub)</td><td>50-500m</td><td>Assembly onshore</td><td>Complex structure</td></tr>
<tr><td>Floating (TLP)</td><td>50-200m</td><td>Stable platform</td><td>Complex installation</td></tr>
</table>

<h4>Floating Wind Challenges</h4>

<ul>
<li><strong>Platform motion:</strong> Coupled dynamics of turbine and floater</li>
<li><strong>Mooring systems:</strong> Fatigue, anchor holding, cost</li>
<li><strong>Dynamic cables:</strong> Movement-tolerant power export</li>
<li><strong>Installation:</strong> Quayside assembly, wet tow to site</li>
</ul>

<h3>Wake Effects and Array Optimization</h3>

<p>Downwind turbines experience reduced wind speeds and increased turbulence from upstream wakes:</p>

<blockquote class="scavenger-quote" data-quote-id="re-wind-grad-q1">
<p>"Wake losses in large wind farms can exceed 15% of potential energy capture. Wake steering through yaw misalignment offers 1-3% recovery, while layout optimization remains the primary mitigation strategy."</p>
<cite>— Wind Energy Science, 2022</cite>
</blockquote>

<h4>Wake Modeling Approaches</h4>

<ul>
<li><strong>Jensen/PARK:</strong> Simple engineering model, linear wake expansion</li>
<li><strong>Gaussian:</strong> More accurate velocity deficit profile</li>
<li><strong>CFD/LES:</strong> High-fidelity but computationally expensive</li>
<li><strong>Dynamic wake meandering:</strong> Captures unsteady wake behavior</li>
</ul>

<h3>Grid Integration at High Penetration</h3>

<h4>System Stability Concerns</h4>

<ul>
<li><strong>Inertia reduction:</strong> Inverter-based resources don't inherently provide rotational inertia</li>
<li><strong>Frequency response:</strong> Synthetic inertia and fast frequency response needed</li>
<li><strong>Voltage control:</strong> Reactive power capability requirements increasing</li>
<li><strong>Fault ride-through:</strong> Turbines must remain connected during grid disturbances</li>
</ul>

<h4>Market Design Challenges</h4>

<ul>
<li>Zero marginal cost generation suppresses energy market prices</li>
<li>Capacity markets must value flexibility and reliability</li>
<li>Ancillary service markets need redesign for IBR participation</li>
<li>Locational pricing signals for transmission constraints</li>
</ul>

<h3>Hybrid Systems</h3>

<p>Wind-plus-storage and wind-solar hybrids are increasingly common:</p>

<ul>
<li><strong>Firming:</strong> Storage fills gaps in wind generation</li>
<li><strong>Time-shifting:</strong> Store low-price energy for high-price periods</li>
<li><strong>Grid services:</strong> Battery provides fast response, wind provides energy</li>
<li><strong>Complementarity:</strong> Wind often strongest at night when solar is zero</li>
</ul>

<h3>Operations and Maintenance</h3>

<h4>Predictive Maintenance</h4>

<p>Modern turbines generate terabytes of SCADA data enabling:</p>

<ul>
<li>Condition-based maintenance scheduling</li>
<li>Failure prediction using machine learning</li>
<li>Remote diagnostics and troubleshooting</li>
<li>Performance optimization through digital twins</li>
</ul>

<div class="key-concept">
<h4>Research Directions</h4>
<p>Key research frontiers include floating offshore technology, wake steering and control co-design, grid-forming inverters, and the economics of 100% renewable systems. Interdisciplinary approaches linking aerodynamics, structural mechanics, power electronics, and market design are essential.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Wind Energy Research: Fundamental Physics, System Dynamics, and Transition Pathways</h2>

<p>Doctoral-level engagement with wind energy spans fundamental fluid mechanics, complex systems analysis, and sociotechnical transition studies. This lesson explores theoretical foundations, open research questions, and the broader context of wind's role in energy system transformation.</p>

<h3>Turbine Aerodynamics</h3>

<h4>Blade Element Momentum Theory</h4>

<p>BEM theory combines 1D momentum theory with blade element analysis, iterating to find induced velocities:</p>

<ul>
<li>Axial induction factor: a = 1 - (U₁/U∞)</li>
<li>Tangential induction factor: a' = (ω_wake)/(2Ω)</li>
<li>Local angle of attack determines lift and drag</li>
<li>Corrections needed for tip losses, skewed flow, dynamic stall</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-wind-phd-q1">
<p>"While BEM remains the industry standard for design, its assumptions break down in complex inflow conditions, motivating ongoing development of vortex methods and actuator-line CFD approaches."</p>
<cite>— Wind Energy Handbook, Burton et al.</cite>
</blockquote>

<h4>Dynamic Stall</h4>

<p>Unsteady angle of attack leads to complex stall behavior:</p>

<ul>
<li>Vortex shedding delays stall onset</li>
<li>Hysteresis in lift and drag coefficients</li>
<li>Critical for fatigue loading in turbulent winds</li>
<li>Semi-empirical models (Beddoes-Leishman) widely used</li>
</ul>

<h3>Aeroelasticity and Control</h3>

<h4>Modal Analysis</h4>

<p>Modern large turbines exhibit complex coupled dynamics:</p>

<ul>
<li><strong>Flapwise blade modes:</strong> Out-of-plane bending, frequency 0.5-1.5 Hz</li>
<li><strong>Edgewise blade modes:</strong> In-plane, higher frequency</li>
<li><strong>Tower modes:</strong> Fore-aft and side-side, must avoid 1P and 3P</li>
<li><strong>Drivetrain modes:</strong> Torsional resonances</li>
</ul>

<h4>Control Strategies</h4>

<table class="control-table">
<tr><th>Objective</th><th>Strategy</th><th>Research Frontier</th></tr>
<tr><td>Load reduction</td><td>Individual pitch control</td><td>LIDAR-assisted preview</td></tr>
<tr><td>Wake steering</td><td>Intentional yaw misalignment</td><td>Closed-loop optimization</td></tr>
<tr><td>Grid support</td><td>Synthetic inertia</td><td>Grid-forming control</td></tr>
<tr><td>Lifetime extension</td><td>De-rating, sector management</td><td>Digital twin integration</td></tr>
</table>

<h3>Atmospheric Boundary Layer</h3>

<h4>Turbulence Modeling</h4>

<p>Turbine inflow is characterized by:</p>

<ul>
<li><strong>Turbulence intensity:</strong> σ_u / U, typically 5-20%</li>
<li><strong>Integral length scale:</strong> Characteristic eddy size, 50-200m</li>
<li><strong>Spectral content:</strong> Kaimal or von Kármán spectra</li>
<li><strong>Coherence:</strong> Spatial correlation affects rotor loading</li>
</ul>

<h4>Mesoscale-Microscale Coupling</h4>

<p>Weather Research and Forecasting (WRF) models linked to LES:</p>

<ul>
<li>Capture terrain effects and local circulations</li>
<li>Enable resource assessment without met campaigns</li>
<li>Support short-term forecasting for grid operations</li>
<li>Inform site selection and layout optimization</li>
</ul>

<h3>Systems and Transition Research</h3>

<h4>100% Renewable Systems</h4>

<p>Key research questions for very high wind penetration:</p>

<ul>
<li>How much storage and transmission is needed?</li>
<li>What role for hydrogen and sector coupling?</li>
<li>How do wholesale markets function with near-zero marginal cost?</li>
<li>Can synthetic inertia fully replace synchronous machines?</li>
</ul>

<h4>Just Transition</h4>

<p>Social science perspectives on wind development:</p>

<ul>
<li>Community ownership models and benefit sharing</li>
<li>Procedural justice in siting decisions</li>
<li>Labor transitions from fossil fuel industries</li>
<li>Indigenous rights and land use conflicts</li>
</ul>

<h3>Emerging Technologies</h3>

<ul>
<li><strong>Airborne wind energy:</strong> Kites and drones accessing high-altitude winds</li>
<li><strong>Multi-rotor systems:</strong> Disaggregated capacity for transport advantages</li>
<li><strong>Vertical axis turbines:</strong> Potential for floating and urban applications</li>
<li><strong>Superconducting generators:</strong> Higher power density, no gearbox</li>
</ul>

<div class="key-concept">
<h4>Research Orientation</h4>
<p>Wind energy research increasingly requires integration across scales—from nanoscale blade coatings to continental power systems—and across disciplines—from fluid mechanics to political science. The urgency of decarbonization demands research that accelerates deployment while attending to equity, reliability, and environmental protection.</p>
</div>
</div>`
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
        },
        { id: 'rwq6', question: { ELEMENTARY: 'What shape are wind turbine blades?', MIDDLE_SCHOOL: 'What is a wind farm?', HIGH_SCHOOL: 'What is the cut-in speed of a typical wind turbine?', UNDERGRADUATE: 'What is the Weibull distribution used for in wind energy?', GRADUATE: 'What is wake steering and how does it improve wind farm performance?', PHD: 'How does the Beddoes-Leishman model address dynamic stall?' }, options: { ELEMENTARY: ['Long and curved like airplane wings', 'Round like a circle', 'Square like a box', 'Flat like a pancake'], MIDDLE_SCHOOL: ['A group of many wind turbines together', 'A farm powered by wind', 'A place that makes wind', 'A windy field'], HIGH_SCHOOL: ['3-4 m/s', '0 m/s', '15 m/s', '25 m/s'], UNDERGRADUATE: ['Characterizing wind speed probability distribution at a site', 'Predicting turbine failures', 'Calculating electricity prices', 'Measuring blade stress'], GRADUATE: ['Intentional yaw misalignment to redirect wakes, recovering 1-3% farm energy', 'Physically moving turbines', 'Adding more blades', 'Changing tower height'], PHD: ['Semi-empirical model capturing dynamic stall hysteresis through attached and separated flow states', 'Simple linear stall model', 'CFD-only approach', 'Static stall curves'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wind turbine blades are long and curved, shaped like airplane wings to catch the wind!', MIDDLE_SCHOOL: 'A wind farm is a group of many wind turbines installed together to generate lots of electricity.', HIGH_SCHOOL: 'Most wind turbines start generating at 3-4 m/s (cut-in speed) and shut down above 25 m/s.', UNDERGRADUATE: 'The Weibull distribution characterizes the probability of different wind speeds using shape (k) and scale (c) parameters.', GRADUATE: 'Wake steering uses intentional yaw misalignment to redirect wakes away from downstream turbines, recovering 1-3% of farm energy.', PHD: 'Beddoes-Leishman captures the hysteresis loop in lift and drag during dynamic stall through tracking attached/separated flow state transitions.' } },
        { id: 'rwq7', question: { ELEMENTARY: 'Do wind turbines work at night?', MIDDLE_SCHOOL: 'How tall can modern wind turbines be?', HIGH_SCHOOL: 'What is the relationship between wind speed and power output?', UNDERGRADUATE: 'What are typical wake losses in a large wind farm?', GRADUATE: 'What challenges does floating offshore wind face?', PHD: 'How do mesoscale-microscale coupling models improve resource assessment?' }, options: { ELEMENTARY: ['Yes, wind blows day and night!', 'No, only during the day', 'Only on full moon nights', 'They sleep at night'], MIDDLE_SCHOOL: ['Over 260 meters (850+ feet)', '10 meters', '50 meters', '500 meters'], HIGH_SCHOOL: ['Power increases with the cube of wind speed', 'Power increases linearly', 'Power decreases with wind speed', 'No relationship'], UNDERGRADUATE: ['5-15%', '0-1%', '30-40%', '50-60%'], GRADUATE: ['Platform motion dynamics, mooring fatigue, dynamic cables, and higher costs', 'No significant challenges', 'Only water depth is different', 'Floating is simpler'], PHD: ['WRF models capture terrain effects informing microscale LES for high-resolution mapping', 'They are not useful', 'Only work in flat terrain', 'Replace need for measurements'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Wind turbines work whenever the wind blows — day or night, rain or shine!', MIDDLE_SCHOOL: 'The latest offshore wind turbines stand over 260 meters tall — taller than most skyscrapers!', HIGH_SCHOOL: 'Wind power is proportional to the cube of wind speed (P ∝ v³), meaning doubling wind speed increases power 8x.', UNDERGRADUATE: 'Wake losses typically range from 5-15%, with layout optimization being the primary mitigation strategy.', GRADUATE: 'Floating offshore faces coupled platform-turbine dynamics, mooring fatigue, dynamic cable movement, and higher LCOE.', PHD: 'WRF-LES coupling captures mesoscale weather patterns and terrain-driven flows for resource assessment without lengthy measurement campaigns.' } },
        { id: 'rwq8', question: { ELEMENTARY: 'What material are wind turbine blades made of?', MIDDLE_SCHOOL: 'What country has the most wind power?', HIGH_SCHOOL: 'What is the tip speed ratio?', UNDERGRADUATE: 'What are the main components of wind turbine capital cost?', GRADUATE: 'How does reduced system inertia from wind affect grid frequency stability?', PHD: 'What is the significance of 3P frequency in structural design?' }, options: { ELEMENTARY: ['Fiberglass and other strong, light materials', 'Wood', 'Metal', 'Paper'], MIDDLE_SCHOOL: ['China', 'United States', 'Germany', 'India'], HIGH_SCHOOL: ['Ratio of blade tip speed to wind speed', 'Maximum speed before shutdown', 'Speed of electricity generation', 'Rate of blade wear'], UNDERGRADUATE: ['Turbine 65-75%, balance of plant 15-25%, development 5-10%', 'All equal thirds', 'Foundation 80%', 'Development 60%'], GRADUATE: ['Faster frequency decline after disturbances, requiring synthetic inertia', 'No effect on frequency', 'Improves stability', 'Only affects voltage'], PHD: ['3P excitation from blade passage must not coincide with tower natural frequencies', 'It determines maximum power', 'It sets the cut-in speed', 'Only matters for two-bladed turbines'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wind turbine blades are made of fiberglass, carbon fiber, and other strong but lightweight materials.', MIDDLE_SCHOOL: 'China has the most installed wind power capacity, followed by the United States and Germany.', HIGH_SCHOOL: 'Tip speed ratio (TSR = ωR/v) is blade tip speed divided by wind speed. Optimal TSR is typically 6-8 for three-bladed turbines.', UNDERGRADUATE: 'Capital costs: turbine (nacelle, blades, tower) 65-75%, balance of plant 15-25%, development 5-10%.', GRADUATE: 'Reduced rotational inertia from wind means faster RoCoF after generator trips, requiring synthetic inertia control.', PHD: 'The 3P frequency creates periodic loading; tower natural frequencies must not coincide with 1P or 3P ranges to avoid resonance.' } },
        { id: 'rwq9', question: { ELEMENTARY: 'Where is the best place for a wind turbine?', MIDDLE_SCHOOL: 'How does a wind turbine generate electricity?', HIGH_SCHOOL: 'What is the difference between direct drive and geared turbines?', UNDERGRADUATE: 'What is a typical PPA term for a wind project?', GRADUATE: 'What is the role of LIDAR in modern wind turbine control?', PHD: 'How does control co-design optimize wind farm performance?' }, options: { ELEMENTARY: ['On a hilltop or open area where it is very windy', 'In a forest', 'Inside a building', 'Underground'], MIDDLE_SCHOOL: ['Wind spins blades connected to a generator', 'Wind pushes electricity through wires', 'Wind heats water to make steam', 'Wind charges batteries directly'], HIGH_SCHOOL: ['Direct drive eliminates gearbox; geared uses gearbox to increase speed', 'They are the same', 'Direct drive is always better', 'Geared have no generator'], UNDERGRADUATE: ['10-25 year fixed-price or escalating PPA', '1-year spot market', '50-year lease', 'Monthly variable pricing'], GRADUATE: ['Preview wind conditions for proactive pitch/yaw control, reducing loads 1-3%', 'Only for resource assessment', 'Measures blade temperature', 'Controls grid connection'], PHD: ['Simultaneously optimizes turbine design, controller, and farm layout for system-level performance', 'Only optimizes individual turbines', 'Focuses on control algorithms only', 'Only applies offshore'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wind turbines work best on hilltops, open plains, or offshore where the wind blows strong and steady!', MIDDLE_SCHOOL: 'Wind spins the blades, which turn a shaft connected to a generator that converts spinning into electricity.', HIGH_SCHOOL: 'Direct drive uses large low-speed generators eliminating the gearbox; geared turbines use a gearbox for smaller generators.', UNDERGRADUATE: 'Wind PPAs typically run 10-25 years with fixed or escalating price structures for revenue certainty.', GRADUATE: 'Forward-looking LIDAR enables proactive pitch and yaw adjustments that reduce structural loads and increase energy capture.', PHD: 'Control co-design simultaneously optimizes design parameters, control strategies, and farm layout for system-level rather than component-level performance.' } },
        { id: 'rwq10', question: { ELEMENTARY: 'How many blades do most wind turbines have?', MIDDLE_SCHOOL: 'What is offshore wind energy?', HIGH_SCHOOL: 'What is the rated power of the largest wind turbines?', UNDERGRADUATE: 'What are key environmental concerns with wind energy?', GRADUATE: 'How must wholesale markets adapt for high wind penetration?', PHD: 'What are the research challenges for airborne wind energy?' }, options: { ELEMENTARY: ['Three blades', 'One blade', 'Ten blades', 'No blades'], MIDDLE_SCHOOL: ['Wind turbines built in the ocean', 'Wind from shore blowing to sea', 'A fan over the ocean', 'A kite over water'], HIGH_SCHOOL: ['15-18 MW', '1 MW', '100 MW', '500 kW'], UNDERGRADUATE: ['Bird/bat mortality, noise, visual impact, and habitat disruption', 'Air pollution', 'Water contamination', 'Radiation exposure'], GRADUATE: ['Redesign capacity markets for flexibility and reform ancillary services for IBR participation', 'No changes needed', 'Eliminate all markets', 'Only increase prices'], PHD: ['Autonomous flight control, tether fatigue, regulatory framework, and scaling', 'Only aerodynamic optimization', 'Ground station design', 'Marketing challenges'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Most modern wind turbines have three blades for the best balance of power and smoothness!', MIDDLE_SCHOOL: 'Offshore wind energy comes from turbines built in the ocean where winds are stronger and more consistent.', HIGH_SCHOOL: 'The largest turbines are rated at 15-18 MW with rotor diameters exceeding 220 meters.', UNDERGRADUATE: 'Key concerns: bird/bat mortality (mitigated by radar), noise (setback requirements), visual impact, and temporary habitat disruption.', GRADUATE: 'High wind penetration requires capacity markets valuing flexibility, reformed ancillary services for IBR participation, and locational pricing.', PHD: 'Key challenges: autonomous flight control in turbulence, tether material fatigue, regulatory airspace approval, and scaling to commercial output.' } }
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
    accreditation: {
      courseTitle: 'Hydropower Engineering: Turbine Systems, Pumped Storage, and Environmental Integration',
      courseDescription: 'This module delivers a comprehensive examination of hydropower engineering from fundamental hydraulic principles through advanced turbine design and grid integration strategies. Students analyze the power equation P = ρgQHη with detailed variable optimization, turbine selection criteria across Pelton, Francis, and Kaplan architectures, and penstock design using Darcy-Weisbach hydraulic loss calculations. Pumped storage hydropower is examined in depth, including round-trip efficiency analysis, energy arbitrage economics, and ancillary grid services provision. Environmental impact assessment covers fish passage technologies, sediment transport disruption, downstream flow requirements, and reservoir greenhouse gas emissions. Dam safety instrumentation, monitoring protocols, and risk assessment frameworks are integrated throughout. Economic analysis addresses LCOE methodology for various hydropower configurations, capacity factor variation between run-of-river and storage facilities, and the role of hydropower in high-renewable grid scenarios. The module culminates in a capstone project requiring students to evaluate a proposed hydropower facility across technical, economic, and environmental dimensions.',
      learningObjectives: [
        'Derive and apply the hydropower equation P = ρgQHη to calculate generation capacity for diverse site conditions',
        'Evaluate turbine selection criteria including specific speed, application range, and efficiency characteristics for Pelton, Francis, and Kaplan designs',
        'Analyze penstock hydraulic losses using Darcy-Weisbach methodology and optimize conduit design parameters',
        'Assess pumped storage hydropower economics including round-trip efficiency, arbitrage revenue, and grid service valuation',
        'Synthesize environmental impact assessments addressing fish passage, sediment continuity, and downstream flow requirements',
        'Calculate LCOE for hydropower projects incorporating capital costs, capacity factors, and operational expenditures',
        'Design dam safety monitoring programs integrating instrumentation data with risk assessment frameworks',
        'Evaluate the role of hydropower flexibility services in grids with high variable renewable energy penetration'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level physics (fluid mechanics fundamentals)', 'Basic calculus or quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Compare turbine selection tradeoffs for a given head and flow rate combination using specific speed analysis',
          'Scenario question: Calculate annual energy production for a run-of-river facility given hydrological flow duration data',
          'Mini-project: Evaluate fish passage alternatives for an existing dam using FERC relicensing criteria'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering hydraulic engineering, turbine design, and environmental mitigation',
          'Hydropower facility evaluation: Complete technical-economic-environmental assessment of a proposed project'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Hydropower Facility Feasibility Assessment and Environmental Integration Plan',
        description: 'Conduct a comprehensive feasibility assessment for a proposed hydropower facility, integrating hydraulic engineering analysis, turbine selection, economic modeling, and environmental mitigation planning into a professional-grade evaluation report.',
        deliverables: [
          'Site hydraulic assessment with head, flow, and power calculations using historical hydrological data',
          'Turbine selection analysis with efficiency curves and specific speed justification',
          'Penstock design with hydraulic loss calculations and optimization',
          'Economic pro forma with LCOE, NPV, and sensitivity analysis across hydrological scenarios',
          'Environmental impact assessment with fish passage, sediment management, and flow release plans',
          'Dam safety monitoring plan with instrumentation specifications'
        ],
        rubricCriteria: [
          'Technical accuracy of hydraulic and turbine engineering calculations (25%)',
          'Rigor of hydrological analysis and energy production modeling (20%)',
          'Completeness and accuracy of economic and financial analysis (20%)',
          'Quality of environmental impact assessment and mitigation planning (20%)',
          'Professional presentation and integration of regulatory considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate hydraulic engineering and renewable energy coursework. Quantitative rigor includes fluid mechanics, turbine performance analysis, and financial modeling consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on hydraulic simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Licensed Professional Engineer (PE) with hydropower design experience for facility assessment review',
          'Faculty member with fluid mechanics and hydraulic engineering background for turbine analysis',
          'Fisheries biologist or environmental scientist for environmental impact assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
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
          UNDERGRADUATE: `<div class="lesson-content">
<h2>Hydropower Systems Engineering: Hydraulics, Turbines, and Grid Integration</h2>

<p>Hydropower provides approximately 16% of global electricity generation and remains the largest source of renewable energy worldwide. With over 1,300 GW of installed capacity, hydropower delivers critical baseload, peaking, and ancillary services that underpin grid stability in many regions. Understanding the engineering fundamentals is essential for optimizing existing assets and developing new capacity responsibly.</p>

<h3>Hydraulic Engineering Fundamentals</h3>

<p>The theoretical power available from a hydropower site is governed by the fundamental equation:</p>

<code>P = ρ × g × Q × H × η</code>

<p>Where:</p>
<ul>
<li><strong>P</strong> = Power output (Watts)</li>
<li><strong>ρ</strong> = Water density (1000 kg/m<sup>3</sup> for freshwater)</li>
<li><strong>g</strong> = Gravitational acceleration (9.81 m/s<sup>2</sup>)</li>
<li><strong>Q</strong> = Volumetric flow rate (m<sup>3</sup>/s)</li>
<li><strong>H</strong> = Net hydraulic head (m) — gross head minus hydraulic losses</li>
<li><strong>η</strong> = Overall system efficiency (turbine × generator × transformer, typically 0.80-0.90)</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-hydro-undergrad-q1">
<p>"Hydropower remains the most efficient large-scale electricity generation technology, with modern turbines achieving peak efficiencies of 90-95%, compared to 35-60% for thermal plants. The challenge lies in optimizing across variable hydrological conditions."</p>
<cite>— International Hydropower Association, Hydropower Status Report, 2023</cite>
</blockquote>

<h3>Turbine Selection Engineering</h3>

<h4>Specific Speed and Application Ranges</h4>
<p>Turbine selection is governed by the specific speed (N<sub>s</sub>), which relates rotational speed to head and flow conditions:</p>

<table class="technical-table">
<thead>
<tr><th>Turbine Type</th><th>Head Range</th><th>Flow Characteristics</th><th>Peak Efficiency</th><th>Best Application</th></tr>
</thead>
<tbody>
<tr><td>Pelton (impulse)</td><td>300-1800 m</td><td>Low flow, high pressure</td><td>90-92%</td><td>Alpine installations, high-head sites</td></tr>
<tr><td>Francis (reaction)</td><td>40-600 m</td><td>Medium flow, medium head</td><td>90-95%</td><td>Most common globally; storage dams</td></tr>
<tr><td>Kaplan (axial)</td><td>2-80 m</td><td>High flow, low head</td><td>90-93%</td><td>Run-of-river, tidal barrages</td></tr>
<tr><td>Crossflow (Banki)</td><td>5-200 m</td><td>Variable flow tolerance</td><td>80-85%</td><td>Small-scale, developing regions</td></tr>
</tbody>
</table>

<div class="image-placeholder" data-caption="Turbine application chart showing head vs. flow operating ranges">
[Image: Turbine selection chart plotting net head against volumetric flow rate with operating envelopes for each turbine type]
</div>

<h3>Penstock Design and Hydraulic Losses</h3>

<p>The penstock conveys water from the intake to the turbine. Hydraulic losses reduce the gross head to the net head available for power conversion:</p>

<code>h_f = f × (L/D) × (v^2 / 2g)  — Darcy-Weisbach equation</code>

<p>Where f is the friction factor (Moody chart), L is penstock length, D is diameter, and v is flow velocity. Additional minor losses arise from bends, valves, trash racks, and transitions. Typical design targets limit total hydraulic losses to 5-10% of gross head.</p>

<h4>Penstock Design Parameters</h4>
<ul>
<li><strong>Material selection:</strong> Steel (most common), HDPE (small-scale), concrete (low-head), fiberglass-reinforced plastic</li>
<li><strong>Velocity limits:</strong> 3-5 m/s to balance friction losses against pipe diameter costs</li>
<li><strong>Surge protection:</strong> Water hammer analysis; surge tanks or relief valves required for long penstocks</li>
<li><strong>Burial vs. surface:</strong> Surface exposure reduces cost but increases freeze risk and visual impact</li>
</ul>

<h3>Pumped Storage Hydropower</h3>

<p>Pumped storage hydropower (PSH) accounts for over 95% of global grid-scale energy storage capacity, with approximately 160 GW installed worldwide:</p>

<blockquote class="scavenger-quote" data-quote-id="re-hydro-undergrad-q2">
<p>"Pumped storage remains the most cost-effective form of large-scale, long-duration energy storage, with round-trip efficiencies of 70-85% and asset lifetimes exceeding 50 years. New closed-loop designs reduce environmental impact and expand siting options."</p>
<cite>— U.S. Department of Energy, Pumped Storage Hydropower Valuation Guidebook, 2022</cite>
</blockquote>

<h4>PSH Economics and Grid Services</h4>
<table class="technical-table">
<thead>
<tr><th>Service</th><th>Revenue Mechanism</th><th>Typical Value</th></tr>
</thead>
<tbody>
<tr><td>Energy arbitrage</td><td>Buy low (off-peak), sell high (on-peak)</td><td>$20-60/MWh spread</td></tr>
<tr><td>Frequency regulation</td><td>Automatic generation control (AGC)</td><td>$5-15/MW-hr</td></tr>
<tr><td>Spinning reserve</td><td>Capacity held for contingency response</td><td>$3-10/MW-hr</td></tr>
<tr><td>Black start</td><td>Grid restoration after outage</td><td>Contracted capacity payment</td></tr>
<tr><td>Capacity</td><td>Firm dispatchable capacity credit</td><td>$50-150/kW-year</td></tr>
</tbody>
</table>

<h3>Environmental Impact Assessment</h3>

<h4>Key Environmental Considerations</h4>
<ul>
<li><strong>Fish passage:</strong> Upstream (fish ladders, lifts, nature-like fishways) and downstream (screens, bypass systems, turbine design) passage</li>
<li><strong>Sediment transport:</strong> Dam trapping disrupts downstream geomorphology; flushing flows and bypass systems mitigate impacts</li>
<li><strong>Downstream flows:</strong> Minimum environmental flows (e-flows) maintain aquatic habitat; FERC requires flow studies for relicensing</li>
<li><strong>Reservoir emissions:</strong> Methane from decomposing organic matter, particularly in tropical reservoirs; varies widely by latitude and reservoir characteristics</li>
<li><strong>Terrestrial habitat:</strong> Reservoir inundation, access road construction, and transmission corridor impacts</li>
</ul>

<h3>Capacity Factors and LCOE Analysis</h3>

<table class="technical-table">
<thead>
<tr><th>Hydropower Type</th><th>Typical Capacity Factor</th><th>LCOE Range ($/MWh)</th><th>Key Cost Driver</th></tr>
</thead>
<tbody>
<tr><td>Large storage (>100 MW)</td><td>30-60%</td><td>$30-60</td><td>Civil works, dam construction</td></tr>
<tr><td>Run-of-river</td><td>25-50%</td><td>$40-80</td><td>Hydrological variability</td></tr>
<tr><td>Small hydro (<10 MW)</td><td>20-50%</td><td>$50-90</td><td>Per-kW costs at smaller scale</td></tr>
<tr><td>Pumped storage</td><td>15-30% (gen mode)</td><td>N/A (storage asset)</td><td>Reservoir and tunnel construction</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-hydro-undergrad-q3">
<p>"The levelized cost of electricity from hydropower ranges from $0.03/kWh to $0.09/kWh depending on project scale, site characteristics, and regulatory requirements. Existing facilities with paid-off capital represent some of the lowest-cost generation on any grid."</p>
<cite>— IRENA, Renewable Power Generation Costs in 2022</cite>
</blockquote>

<h3>Dam Safety and Instrumentation</h3>

<ul>
<li><strong>Seepage monitoring:</strong> Piezometers, weirs, and flow measurement at drain outlets</li>
<li><strong>Structural monitoring:</strong> Pendulums, joint meters, crack gauges, and geodetic surveys</li>
<li><strong>Seismic monitoring:</strong> Accelerographs and strong-motion sensors for dam response analysis</li>
<li><strong>Regulatory framework:</strong> FERC dam safety program, state dam safety offices, Emergency Action Plans (EAPs)</li>
</ul>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Hydropower engineering requires integrating fluid mechanics, structural analysis, electrical engineering, and environmental science. As the grid transitions to higher renewable penetration, existing hydropower assets become increasingly valuable for their dispatchability and flexibility services. Modernizing aging infrastructure—upgrading turbines, adding variable-speed capability, improving fish passage—can unlock significant additional value from existing sites without new dam construction.</p>
</div>
</div>`,
          GRADUATE: `<div class="lesson-content">
<h2>Advanced Hydropower: Grid Integration, Environmental Science, and System Modernization</h2>

<p>As electricity systems transition toward high renewable penetration, hydropower's role is evolving from bulk energy provider to flexible grid backbone. Graduate-level analysis examines advanced turbine technologies, hydropower's interaction with variable renewables, climate adaptation challenges, and the complex tradeoffs between dam modernization and removal.</p>

<h3>Advanced Turbine Technology and CFD Analysis</h3>

<h4>Variable-Speed Pump-Turbine Systems</h4>
<p>Conventional synchronous pump-turbines operate at fixed speed, limiting their flexibility. Variable-speed systems using doubly-fed induction generators (DFIG) or full-size frequency converters enable:</p>

<ul>
<li><strong>Wider operating range:</strong> Efficient generation and pumping across 60-100% of rated capacity</li>
<li><strong>Pump-mode power regulation:</strong> Adjustable power consumption during pumping (impossible with fixed-speed)</li>
<li><strong>Faster response:</strong> Sub-second frequency regulation in both generating and pumping modes</li>
<li><strong>Reduced cavitation:</strong> Optimal speed selection minimizes cavitation across operating points</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-hydro-grad-q1">
<p>"Variable-speed pumped storage technology represents a paradigm shift in grid flexibility services. The ability to regulate power in pump mode—impossible with conventional synchronous machines—provides critical balancing capability for grids with high wind and solar penetration."</p>
<cite>— IEEE Transactions on Power Systems, "Variable-Speed Pumped Storage in Future Power Systems," 2021</cite>
</blockquote>

<h4>Computational Fluid Dynamics in Turbine Design</h4>
<p>Modern turbine design relies on CFD simulation to optimize runner geometry, predict cavitation onset, and minimize hydraulic losses:</p>

<table class="technical-table">
<thead>
<tr><th>CFD Application</th><th>Analysis Type</th><th>Key Output</th></tr>
</thead>
<tbody>
<tr><td>Runner optimization</td><td>Steady-state RANS simulation</td><td>Efficiency maps across operating range</td></tr>
<tr><td>Cavitation prediction</td><td>Multiphase flow modeling</td><td>Sigma-plant vs sigma-required curves</td></tr>
<tr><td>Draft tube analysis</td><td>Transient simulation with vortex rope</td><td>Pressure pulsation and power swings</td></tr>
<tr><td>Sediment erosion</td><td>Particle tracking (Lagrangian)</td><td>Erosion rate maps on runner surfaces</td></tr>
</tbody>
</table>

<h3>Hydropower in 100% Renewable Grid Scenarios</h3>

<p>Capacity expansion models consistently identify hydropower as a critical flexibility resource in deeply decarbonized grids:</p>

<blockquote class="scavenger-quote" data-quote-id="re-hydro-grad-q2">
<p>"In scenarios achieving 90-100% renewable electricity, existing hydropower with reservoir storage provides 30-50% of required system flexibility, significantly reducing the need for battery storage and curtailment. Regions without hydropower face substantially higher decarbonization costs."</p>
<cite>— Nature Energy, "The Role of Hydropower in Deeply Decarbonized Electricity Systems," 2022</cite>
</blockquote>

<h4>Flexibility Services Portfolio</h4>
<ul>
<li><strong>Ramping capability:</strong> Hydropower ramps at 40-100% of rated capacity per minute, far exceeding thermal plants</li>
<li><strong>Inertial response:</strong> Synchronous generators provide physical inertia critical for frequency stability</li>
<li><strong>Seasonal energy shifting:</strong> Reservoir storage bridges multi-week wind and solar droughts</li>
<li><strong>Transmission congestion relief:</strong> Strategically located hydro reduces renewable curtailment</li>
</ul>

<h3>Climate Change Impacts on Hydrological Regimes</h3>

<p>Climate change is fundamentally altering the water cycle, with significant implications for hydropower:</p>

<table class="technical-table">
<thead>
<tr><th>Climate Impact</th><th>Hydrological Effect</th><th>Hydropower Consequence</th></tr>
</thead>
<tbody>
<tr><td>Glacier retreat</td><td>Initial flow increase, long-term decrease</td><td>Transitional surplus followed by reduced baseflow</td></tr>
<tr><td>Altered precipitation</td><td>Changed seasonal patterns, intensity</td><td>Shifted generation profiles, flood risk changes</td></tr>
<tr><td>Increased evaporation</td><td>Reduced reservoir storage efficiency</td><td>Lower net inflows, especially in arid regions</td></tr>
<tr><td>Extreme events</td><td>More intense floods and droughts</td><td>Dam safety concerns, revenue volatility</td></tr>
</tbody>
</table>

<h3>Dam Removal vs. Modernization Decision Frameworks</h3>

<p>Over 90,000 dams in the United States alone face relicensing, safety, or obsolescence decisions. A structured framework evaluates:</p>

<ul>
<li><strong>Generation value:</strong> Current and projected energy and capacity revenue vs. decommissioning and restoration costs</li>
<li><strong>Safety status:</strong> Dam condition assessment, rehabilitation costs, and downstream risk exposure</li>
<li><strong>Environmental benefit:</strong> River ecosystem restoration value, fish population recovery potential, sediment reconnection</li>
<li><strong>Cultural significance:</strong> Tribal treaty rights, recreational value, historical preservation</li>
<li><strong>Climate adaptation:</strong> Flood control value under changing hydrology vs. free-flowing river resilience</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-hydro-grad-q3">
<p>"The removal of four dams on the Klamath River—the largest dam removal project in U.S. history—demonstrates that dam removal can achieve ecological restoration at scale, but requires decade-long planning and multi-stakeholder negotiation frameworks."</p>
<cite>— Science, "Klamath River Dam Removal: Ecological and Social Dimensions," 2023</cite>
</blockquote>

<h3>Fish Passage Technologies</h3>

<h4>Upstream Passage</h4>
<ul>
<li><strong>Technical fish ladders:</strong> Pool-and-weir, vertical slot, Denil designs for specific species swimming capabilities</li>
<li><strong>Nature-like fishways:</strong> Roughened channels mimicking natural stream conditions; broader species effectiveness</li>
<li><strong>Fish lifts and locks:</strong> Mechanical transport for high dams where ladders are impractical</li>
<li><strong>Trap-and-haul:</strong> Active collection and transport; used when passage structures are infeasible</li>
</ul>

<h4>Downstream Passage</h4>
<ul>
<li><strong>Turbine passage:</strong> Fish-friendly turbine designs (Alden turbine, minimum gap runner) reduce mortality to less than 2%</li>
<li><strong>Bypass systems:</strong> Surface collectors, deep outlets, and guidance screens direct fish around turbines</li>
<li><strong>Operational measures:</strong> Spill programs, seasonal shutdowns, and night-time passage windows</li>
</ul>

<h3>Reservoir Greenhouse Gas Emissions</h3>

<p>Reservoirs emit CO2 and CH4 from decomposing organic matter, with emissions varying enormously by geography:</p>

<ul>
<li><strong>Tropical reservoirs:</strong> Can emit 100-1000+ g CO2eq/kWh due to high temperatures and biomass loading</li>
<li><strong>Boreal/temperate:</strong> Typically 5-50 g CO2eq/kWh, comparable to wind and solar lifecycle emissions</li>
<li><strong>Methane ebullition:</strong> Bubble flux from sediments dominates tropical reservoir emissions; highly spatially variable</li>
<li><strong>Degassing at spillways:</strong> Methane dissolved in deep water released during spilling; often unmeasured</li>
</ul>

<h3>Market Design for Hydropower Flexibility Services</h3>

<ul>
<li><strong>Scarcity pricing:</strong> High clearing prices during tight supply reward hydropower flexibility</li>
<li><strong>Capacity markets:</strong> Hydropower qualifies as firm capacity with high capacity credit (typically 90%+ for storage hydro)</li>
<li><strong>Ancillary service markets:</strong> Fast ramping and frequency regulation command premium prices</li>
<li><strong>Water value optimization:</strong> Stochastic dynamic programming optimizes reservoir dispatch under hydrological uncertainty</li>
</ul>

<div class="key-concept">
<h4>Graduate Research Perspective</h4>
<p>Hydropower sits at the intersection of engineering, ecology, climate science, and energy policy. As grids decarbonize, the flexibility value of existing hydropower assets is increasing even as climate change alters the hydrological regimes on which they depend. The discipline requires increasingly sophisticated modeling that couples hydrological forecasting, market simulation, and environmental constraint optimization to maximize the combined energy, flexibility, and ecological value of river systems.</p>
</div>
</div>`,
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
    accreditation: {
      courseTitle: 'Geothermal Energy Systems: Resource Assessment, Power Conversion, and Enhanced Geothermal Engineering',
      courseDescription: 'This module provides rigorous examination of geothermal energy from subsurface heat flow physics through power plant engineering and advanced resource development strategies. Students analyze geothermal resource classification by enthalpy, temperature gradient measurement, and well logging interpretation. Power conversion technologies are examined in depth, including dry steam, flash steam, and binary cycle plant thermodynamics with efficiency optimization. Enhanced Geothermal Systems (EGS) engineering covers hydraulic stimulation design, induced seismicity risk assessment, and reservoir characterization through tracer testing. Direct-use applications including district heating and ground-source heat pumps are analyzed for thermal efficiency and economic viability. Economic analysis addresses drilling cost structures, LCOE methodology for geothermal projects, and comparison with other baseload generation. The module integrates cutting-edge topics including supercritical geothermal resources, advanced drilling technologies, and mineral extraction from geothermal brines. Students complete a capstone project requiring comprehensive geothermal resource assessment and development planning.',
      learningObjectives: [
        'Classify geothermal resources by enthalpy and temperature characteristics and assess development potential using subsurface data',
        'Analyze thermodynamic cycles for flash steam, dry steam, and binary cycle power plants and calculate conversion efficiency',
        'Evaluate Enhanced Geothermal Systems engineering including stimulation design, reservoir creation, and sustainability assessment',
        'Interpret heat flow measurements, temperature gradient data, and well logging results for resource characterization',
        'Compare direct-use applications including district heating and ground-source heat pumps for thermal efficiency and economics',
        'Calculate LCOE for geothermal projects incorporating drilling costs, capacity factors, and operational expenditures',
        'Assess induced seismicity risk using traffic light protocols and magnitude-frequency analysis',
        'Synthesize geothermal development proposals integrating technical, economic, and environmental considerations'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level physics (thermodynamics fundamentals)', 'Basic calculus or quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Compare binary cycle and flash steam plant selection for a given resource temperature and chemistry',
          'Scenario question: Calculate thermal output and COP for a ground-source heat pump system given soil conductivity and loop design',
          'Mini-project: Evaluate an EGS site using temperature gradient data, stress regime analysis, and induced seismicity risk assessment'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering resource classification, power plant thermodynamics, and EGS engineering',
          'Resource development proposal: Complete geothermal feasibility assessment for a candidate site'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Geothermal Resource Assessment and Development Feasibility Study',
        description: 'Conduct a comprehensive feasibility study for a geothermal development site, integrating subsurface characterization, power plant selection, economic analysis, and environmental risk assessment into a professional development proposal.',
        deliverables: [
          'Subsurface resource characterization using temperature gradient, heat flow, and geological data',
          'Power plant technology selection with thermodynamic cycle analysis and efficiency calculations',
          'Well field design with production and injection well specifications',
          'Economic pro forma with drilling cost estimates, LCOE calculation, and sensitivity analysis',
          'Environmental risk assessment including induced seismicity mitigation protocol',
          'Regulatory pathway analysis and community engagement strategy'
        ],
        rubricCriteria: [
          'Technical accuracy of resource assessment and subsurface characterization (25%)',
          'Rigor of thermodynamic analysis and power plant design (20%)',
          'Completeness and accuracy of economic and financial modeling (25%)',
          'Quality of environmental risk assessment and mitigation planning (15%)',
          'Professional presentation and integration of regulatory considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate geothermal engineering and energy systems coursework. Quantitative rigor includes thermodynamic cycle analysis, subsurface characterization, and financial modeling consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on thermodynamic simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Licensed Professional Engineer (PE) or geoscientist with geothermal development experience for resource assessment review',
          'Faculty member with thermodynamics and heat transfer background for power plant analysis',
          'Seismologist or geomechanics specialist for induced seismicity risk assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
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
    accreditation: {
      courseTitle: 'Energy Storage Systems: Battery Technologies, Grid Integration, and Market Economics',
      courseDescription: 'This module provides comprehensive examination of energy storage technologies from electrochemistry fundamentals through utility-scale system design and electricity market integration. Students analyze lithium-ion battery chemistry variants (NMC, LFP, NCA) including energy density, cycle life, and safety characteristics. Battery degradation mechanisms—calendar aging, cycle aging, and temperature effects—are examined through equivalent circuit and physics-based models. Utility-scale battery energy storage system (BESS) design covers power conversion, thermal management, protection systems, and grid interconnection requirements. Mechanical and thermal storage technologies including pumped hydro, compressed air, and molten salt are analyzed for long-duration applications. Economic analysis addresses Levelized Cost of Storage (LCOS) methodology, revenue stacking across energy arbitrage, frequency regulation, and capacity markets. The module integrates emerging technologies including flow batteries, solid-state batteries, and green hydrogen for seasonal storage. Students complete a capstone project requiring comprehensive storage system sizing, technology selection, and economic optimization for a specific grid application.',
      learningObjectives: [
        'Compare lithium-ion battery chemistries (NMC, LFP, NCA) across energy density, cycle life, safety, and cost dimensions',
        'Analyze battery degradation mechanisms including calendar aging, cycle aging, and temperature dependencies',
        'Design utility-scale battery energy storage systems incorporating power conversion, thermal management, and protection',
        'Evaluate mechanical storage technologies (pumped hydro, CAES) for long-duration grid applications',
        'Calculate Levelized Cost of Storage using comprehensive methodology accounting for degradation and replacement',
        'Synthesize revenue stacking strategies across energy arbitrage, frequency regulation, and capacity markets',
        'Assess emerging storage technologies including flow batteries, solid-state batteries, and green hydrogen',
        'Design and optimize a storage system for a specific grid application integrating technical and economic constraints'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level chemistry or physics (electrochemistry fundamentals)', 'Basic calculus or quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Compare LFP and NMC battery chemistries for a utility-scale 4-hour storage application considering safety, cost, and degradation',
          'Scenario question: Calculate LCOS for a 100 MW / 400 MWh BESS given capital costs, degradation rates, and projected revenue streams',
          'Mini-project: Design a revenue stacking strategy for a grid-connected storage system using historical market price data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering battery chemistry, degradation, system design, and storage economics',
          'Storage system design deliverable: Complete BESS design and economic optimization for a specific grid application'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Grid-Scale Energy Storage System Design and Economic Optimization',
        description: 'Design a comprehensive energy storage system for a specific grid application, integrating technology selection, system sizing, degradation modeling, revenue analysis, and lifecycle economic optimization into a professional investment-grade proposal.',
        deliverables: [
          'Application requirements analysis with load data, market structure, and grid service opportunity assessment',
          'Technology selection with chemistry comparison, safety analysis, and vendor evaluation',
          'System design with power conversion, thermal management, and protection specifications',
          'Degradation model with capacity fade projections over project lifetime',
          'Revenue analysis with stacked value streams and market price sensitivity scenarios',
          'Lifecycle economic model with LCOS, NPV, IRR, and augmentation/replacement strategy'
        ],
        rubricCriteria: [
          'Technical accuracy of system design and technology selection (25%)',
          'Rigor of degradation modeling and performance projection methodology (20%)',
          'Completeness and accuracy of revenue and economic analysis (25%)',
          'Quality of lifecycle optimization and replacement strategy (15%)',
          'Professional presentation and integration of market and regulatory considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate energy storage and power systems coursework. Quantitative rigor includes electrochemistry, degradation modeling, and financial analysis consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on storage simulation and sizing activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Licensed Professional Engineer (PE) with battery storage or power systems experience for system design review',
          'Faculty member with electrochemistry or materials science background for battery technology analysis',
          'Energy market analyst or ISO/RTO specialist for market design and revenue stacking alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
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
          UNDERGRADUATE: `<div class="lesson-content">
<h2>Energy Storage Systems: Technologies, Degradation, and Grid Economics</h2>

<p>Energy storage deployment is accelerating exponentially, with global installations reaching over 45 GW / 100 GWh of cumulative capacity by 2023. Battery energy storage systems (BESS) are reshaping electricity markets, enabling higher renewable penetration, and creating entirely new grid service categories. Understanding the interplay between electrochemistry, degradation science, system design, and market economics is essential for modern power systems engineering.</p>

<h3>Lithium-Ion Battery Chemistry Comparison</h3>

<p>Lithium-ion dominates grid storage, but chemistry selection involves critical tradeoffs:</p>

<table class="technical-table">
<thead>
<tr><th>Chemistry</th><th>Energy Density (Wh/kg)</th><th>Cycle Life</th><th>Safety Profile</th><th>Cost ($/kWh)</th><th>Primary Application</th></tr>
</thead>
<tbody>
<tr><td>NMC (Nickel-Manganese-Cobalt)</td><td>150-250</td><td>1000-3000</td><td>Moderate (thermal runaway risk)</td><td>$130-180</td><td>EVs, shorter-duration grid</td></tr>
<tr><td>LFP (Lithium Iron Phosphate)</td><td>90-160</td><td>3000-7000</td><td>Excellent (thermally stable)</td><td>$100-140</td><td>Utility-scale grid storage</td></tr>
<tr><td>NCA (Nickel-Cobalt-Aluminum)</td><td>200-270</td><td>500-1500</td><td>Lower (high energy density risk)</td><td>$140-200</td><td>EVs (Tesla), niche grid</td></tr>
<tr><td>LTO (Lithium Titanate)</td><td>60-80</td><td>10000-20000</td><td>Excellent</td><td>$250-400</td><td>Fast-response frequency regulation</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-stor-undergrad-q1">
<p>"LFP batteries have become the dominant chemistry for utility-scale storage, commanding over 80% of new grid installations globally by 2023. The combination of lower cost, superior cycle life, elimination of cobalt supply chain concerns, and inherent thermal stability outweighs the lower energy density for stationary applications."</p>
<cite>— BloombergNEF, Energy Storage Market Outlook, 2023</cite>
</blockquote>

<h3>Battery Degradation Mechanisms</h3>

<p>Understanding degradation is critical for accurate lifetime modeling and economic analysis:</p>

<h4>Calendar Aging</h4>
<ul>
<li><strong>SEI layer growth:</strong> Solid electrolyte interphase thickens over time, consuming cyclable lithium and increasing impedance</li>
<li><strong>Temperature dependence:</strong> Arrhenius relationship; every 10 C increase roughly doubles calendar aging rate</li>
<li><strong>State-of-charge effect:</strong> Storage at high SOC accelerates calendar aging; optimal storage at 30-50% SOC</li>
</ul>

<h4>Cycle Aging</h4>
<ul>
<li><strong>Depth of discharge (DOD):</strong> Deeper cycles cause more mechanical stress on electrode particles; limiting DOD to 80% can double cycle life</li>
<li><strong>C-rate effects:</strong> Higher charge/discharge rates increase lithium plating risk and particle cracking</li>
<li><strong>Capacity fade:</strong> Typical warranty guarantees 70-80% retained capacity after stated cycle life (10-20 years)</li>
</ul>

<h4>Temperature Effects</h4>
<ul>
<li><strong>Operating range:</strong> 15-35 C optimal; thermal management systems (HVAC) essential for grid-scale installations</li>
<li><strong>Low temperature:</strong> Lithium plating risk during charging below 0 C; reduced power capability</li>
<li><strong>High temperature:</strong> Accelerated SEI growth, electrolyte decomposition, and thermal runaway risk</li>
</ul>

<div class="image-placeholder" data-caption="Battery degradation mechanisms showing calendar and cycle aging pathways">
[Image: Diagram illustrating SEI growth, lithium plating, particle cracking, and electrolyte decomposition mechanisms]
</div>

<h3>Utility-Scale BESS Design</h3>

<h4>System Architecture</h4>
<table class="technical-table">
<thead>
<tr><th>Component</th><th>Function</th><th>Key Specification</th></tr>
</thead>
<tbody>
<tr><td>Battery modules/racks</td><td>Energy storage (electrochemical)</td><td>Capacity (MWh), chemistry, cell format</td></tr>
<tr><td>Power conversion system (PCS)</td><td>DC-AC conversion, grid interface</td><td>Power rating (MW), efficiency (97-98%)</td></tr>
<tr><td>Battery management system (BMS)</td><td>Cell monitoring, balancing, protection</td><td>Voltage/temp monitoring, SOC estimation</td></tr>
<tr><td>Thermal management</td><td>Temperature control (HVAC or liquid cooling)</td><td>Operating range, parasitic load (2-5%)</td></tr>
<tr><td>Energy management system (EMS)</td><td>Dispatch optimization, market interface</td><td>Algorithms, SCADA integration</td></tr>
<tr><td>Transformer and switchgear</td><td>Grid interconnection, protection</td><td>Voltage level, fault current rating</td></tr>
</tbody>
</table>

<h3>Pumped Hydro and Compressed Air Energy Storage</h3>

<p>Mechanical storage technologies provide long-duration capability that batteries cannot yet match economically:</p>

<table class="technical-table">
<thead>
<tr><th>Technology</th><th>Duration</th><th>Round-Trip Efficiency</th><th>Capital Cost</th><th>Lifetime</th><th>Global Capacity</th></tr>
</thead>
<tbody>
<tr><td>Pumped hydro (PSH)</td><td>6-24+ hours</td><td>70-85%</td><td>$150-300/kWh</td><td>50-100 years</td><td>~160 GW</td></tr>
<tr><td>Compressed air (CAES)</td><td>8-24+ hours</td><td>40-70%</td><td>$100-250/kWh</td><td>30-40 years</td><td>~0.5 GW</td></tr>
<tr><td>Liquid air (LAES)</td><td>8-24+ hours</td><td>50-60%</td><td>$200-350/kWh</td><td>25-30 years</td><td>Demonstration</td></tr>
<tr><td>Gravity storage</td><td>4-12 hours</td><td>75-85%</td><td>$200-400/kWh</td><td>30-50 years</td><td>Pilot stage</td></tr>
</tbody>
</table>

<h3>Storage Duration Categories</h3>

<ul>
<li><strong>Short-duration (0-4 hours):</strong> Lithium-ion batteries dominate; frequency regulation, peak shaving, solar shifting</li>
<li><strong>Medium-duration (4-12 hours):</strong> Li-ion, flow batteries, PSH; renewable firming, load following</li>
<li><strong>Long-duration (12-100+ hours):</strong> PSH, CAES, hydrogen, iron-air; seasonal shifting, multi-day events, resource adequacy</li>
<li><strong>Seasonal (weeks to months):</strong> Green hydrogen, geological storage; bridging extended low-renewable periods</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-stor-undergrad-q2">
<p>"The need for long-duration energy storage grows non-linearly as renewable penetration exceeds 80%. At 60% renewables, 4-hour batteries address most variability. At 90%+, systems require 100+ hours of storage to maintain reliability during extended low-wind, low-solar events."</p>
<cite>— NREL, Storage Futures Study: The Role of Long-Duration Energy Storage, 2022</cite>
</blockquote>

<h3>Levelized Cost of Storage (LCOS)</h3>

<code>LCOS = (Capital Cost + PV(O&M) + PV(Charging) + PV(Replacement)) / PV(Discharged Energy)</code>

<p>Key variables affecting LCOS:</p>
<ul>
<li><strong>Capital cost:</strong> Battery modules + PCS + BOS + installation ($200-400/kWh total system cost for 4-hour Li-ion)</li>
<li><strong>Round-trip efficiency:</strong> Charging energy cost amplified by losses (85-90% for Li-ion, 70-80% for PSH)</li>
<li><strong>Cycle life:</strong> More cycles amortize capital over more discharged energy, reducing LCOS</li>
<li><strong>Augmentation strategy:</strong> Adding modules to offset degradation vs. accepting capacity decline</li>
<li><strong>Discount rate:</strong> Project financing cost significantly impacts LCOS for capital-intensive storage</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-stor-undergrad-q3">
<p>"The levelized cost of storage for utility-scale lithium-ion systems has declined from $1,100/MWh in 2012 to approximately $140-200/MWh in 2023, a reduction of over 80%. Further cost declines are expected as LFP chemistry scales and manufacturing capacity expands."</p>
<cite>— Lazard, Levelized Cost of Storage Analysis, Version 8.0, 2023</cite>
</blockquote>

<h3>Revenue Stacking for Grid Storage</h3>

<table class="technical-table">
<thead>
<tr><th>Revenue Stream</th><th>Service Description</th><th>Typical Value</th><th>Duration Requirement</th></tr>
</thead>
<tbody>
<tr><td>Energy arbitrage</td><td>Buy low, sell high (time-shifting)</td><td>$30-80/MWh spread</td><td>2-4+ hours</td></tr>
<tr><td>Frequency regulation</td><td>Automatic generation control response</td><td>$5-20/MW-hr (capacity + mileage)</td><td>15-30 min</td></tr>
<tr><td>Spinning reserve</td><td>Available capacity for contingency</td><td>$3-10/MW-hr</td><td>30-60 min</td></tr>
<tr><td>Capacity</td><td>Resource adequacy contribution</td><td>$30-150/kW-year</td><td>4+ hours (market-dependent)</td></tr>
<tr><td>Transmission deferral</td><td>Avoiding grid infrastructure upgrades</td><td>Site-specific (potentially high)</td><td>2-6 hours</td></tr>
<tr><td>Renewable firming</td><td>Smoothing VRE output variability</td><td>PPA premium or avoided curtailment</td><td>1-4 hours</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Energy storage system design requires integrating electrochemistry, power electronics, thermal engineering, and market economics into a unified optimization framework. The critical insight is that storage value is application-dependent—the same battery system generates vastly different returns depending on the market structure, grid location, and dispatch strategy. As battery costs continue declining and renewable penetration increases, storage transitions from a niche grid service to a foundational infrastructure asset that enables the clean energy transition.</p>
</div>
</div>`,
          GRADUATE: `<div class="lesson-content">
<h2>Advanced Energy Storage: Long-Duration Technologies, Market Design, and System Integration</h2>

<p>As electricity systems approach high renewable penetration, the limitations of 4-hour lithium-ion storage become increasingly apparent. Graduate-level analysis examines the full portfolio of storage technologies needed for deeply decarbonized grids—from flow batteries providing 8-12 hour duration to green hydrogen enabling seasonal energy shifting—alongside the market designs and regulatory frameworks required to unlock storage investment.</p>

<h3>Flow Batteries for Long-Duration Storage</h3>

<h4>Vanadium Redox Flow Batteries (VRFB)</h4>
<p>Flow batteries decouple power (cell stack) from energy (electrolyte volume), enabling independent scaling of duration:</p>

<table class="technical-table">
<thead>
<tr><th>Parameter</th><th>Vanadium Redox</th><th>Zinc-Bromine</th><th>Iron-Chromium</th><th>Organic (Quinone)</th></tr>
</thead>
<tbody>
<tr><td>Energy density (Wh/L)</td><td>15-30</td><td>30-65</td><td>10-20</td><td>10-25</td></tr>
<tr><td>Round-trip efficiency</td><td>65-80%</td><td>60-75%</td><td>55-70%</td><td>50-70%</td></tr>
<tr><td>Cycle life</td><td>10,000-20,000+</td><td>2,000-5,000</td><td>5,000-10,000</td><td>Under development</td></tr>
<tr><td>Duration scalability</td><td>4-12+ hours</td><td>4-8 hours</td><td>4-12+ hours</td><td>4-12+ hours</td></tr>
<tr><td>Key advantage</td><td>No capacity fade; electrolyte recyclable</td><td>Higher energy density</td><td>Earth-abundant materials</td><td>No toxic metals</td></tr>
<tr><td>Key challenge</td><td>Vanadium cost volatility</td><td>Dendrite formation</td><td>Hydrogen evolution</td><td>Membrane fouling</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-stor-grad-q1">
<p>"Flow batteries occupy a critical niche in the storage technology portfolio: durations of 6-12 hours where lithium-ion costs scale linearly with duration but flow battery costs plateau. For storage durations beyond 8 hours, flow batteries achieve lower LCOS than lithium-ion despite higher power costs."</p>
<cite>— Joule, "Techno-Economic Analysis of Flow Batteries for Grid-Scale Energy Storage," 2022</cite>
</blockquote>

<h3>Solid-State Battery Research and Commercialization</h3>

<p>Solid-state batteries replace the liquid electrolyte with a solid ion conductor, offering potential improvements in safety, energy density, and cycle life:</p>

<ul>
<li><strong>Solid electrolyte types:</strong> Oxide ceramics (LLZO), sulfide glass-ceramics (Li<sub>6</sub>PS<sub>5</sub>Cl), and polymer electrolytes (PEO-based)</li>
<li><strong>Energy density target:</strong> 400-500 Wh/kg (vs. 250-270 Wh/kg for current NMC Li-ion), enabled by lithium metal anodes</li>
<li><strong>Safety advantage:</strong> Non-flammable solid electrolyte eliminates thermal runaway risk from electrolyte combustion</li>
<li><strong>Manufacturing challenges:</strong> Solid-solid interface contact, high-pressure operation requirements, and scaling ceramic processing</li>
<li><strong>Commercialization timeline:</strong> Toyota, Samsung SDI, and QuantumScape targeting 2027-2030 for automotive applications; grid applications to follow</li>
</ul>

<h3>Green Hydrogen as Seasonal Storage</h3>

<blockquote class="scavenger-quote" data-quote-id="re-stor-grad-q2">
<p>"Green hydrogen produced via electrolysis during periods of renewable surplus offers the only proven pathway for seasonal energy storage at the terawatt-hour scale. While round-trip efficiency is low (25-40%), the ability to store energy for weeks or months addresses a grid reliability challenge that no battery technology can solve economically."</p>
<cite>— Nature Energy, "The Role of Hydrogen in Long-Duration Energy Storage," 2023</cite>
</blockquote>

<h4>Round-Trip Efficiency Analysis</h4>
<table class="technical-table">
<thead>
<tr><th>Process Step</th><th>Efficiency Range</th><th>Technology Options</th></tr>
</thead>
<tbody>
<tr><td>Electrolysis (power-to-H<sub>2</sub>)</td><td>60-80% (LHV)</td><td>Alkaline (60-70%), PEM (65-80%), SOEC (80-90%)</td></tr>
<tr><td>Compression/liquefaction</td><td>85-95% / 60-75%</td><td>Mechanical compression, cryogenic liquefaction</td></tr>
<tr><td>Storage</td><td>95-99%</td><td>Salt caverns, depleted gas fields, tanks</td></tr>
<tr><td>Re-electrification (H<sub>2</sub>-to-power)</td><td>40-60%</td><td>Gas turbine (40%), fuel cell (50-60%)</td></tr>
<tr><td><strong>Total round-trip</strong></td><td><strong>25-42%</strong></td><td>Pathway dependent</td></tr>
</tbody>
</table>

<h3>Vehicle-to-Grid (V2G) as Distributed Storage</h3>

<ul>
<li><strong>Available capacity:</strong> Average EV has 60-100 kWh battery; at 20% depth, 100 million EVs provide 1.2-2 TWh of distributed storage</li>
<li><strong>Bidirectional charging:</strong> CCS (bidirectional) and CHAdeMO support V2G; NACS standard adding bidirectional capability</li>
<li><strong>Battery degradation concern:</strong> Additional V2G cycles cause 1-3% extra capacity loss per year; compensation must exceed degradation cost</li>
<li><strong>Aggregation:</strong> Virtual power plant platforms aggregate thousands of EVs to participate in wholesale markets</li>
<li><strong>Regulatory barriers:</strong> Interconnection standards, metering requirements, and utility billing systems not yet fully adapted</li>
</ul>

<h3>Storage Market Design and Regulatory Frameworks</h3>

<h4>Key Market Design Questions</h4>
<ul>
<li><strong>Participation models:</strong> Should storage participate as generation, load, both, or a new category? (FERC Order 841 mandates market participation)</li>
<li><strong>Duration requirements:</strong> How many hours qualify for capacity credit? (4 hours standard in most ISOs, but insufficient for high-renewables grids)</li>
<li><strong>State-of-charge management:</strong> How to ensure storage is charged when needed for reliability services</li>
<li><strong>Co-location rules:</strong> How do solar+storage hybrids participate vs. standalone storage? (ITC implications)</li>
<li><strong>Transmission vs. distribution:</strong> Can storage assets provide services at both levels simultaneously?</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-stor-grad-q3">
<p>"FERC Order 841 removed most barriers to energy storage participation in wholesale electricity markets, but implementation varies significantly across ISOs. The order requires that market rules recognize the unique physical and operational characteristics of storage, including its ability to both inject and withdraw energy."</p>
<cite>— IEEE Transactions on Power Systems, "Market Design for Energy Storage: Current Practice and Future Directions," 2023</cite>
</blockquote>

<h3>Second-Life EV Batteries for Stationary Storage</h3>

<p>EV batteries retired at 70-80% state-of-health retain significant value for less demanding stationary applications:</p>

<ul>
<li><strong>Remaining capacity:</strong> 70-80% of original, typically 40-60 kWh per module at retirement</li>
<li><strong>Remaining life:</strong> 5-10 additional years at reduced cycling rates for grid applications</li>
<li><strong>Cost advantage:</strong> Acquisition at $30-60/kWh (vs. $100-140/kWh for new LFP), including testing and repackaging</li>
<li><strong>Testing requirements:</strong> State-of-health assessment, impedance spectroscopy, and capacity verification for grading and matching</li>
<li><strong>Applications:</strong> Behind-the-meter peak shaving, community resilience, EV charging station buffer, grid voltage support</li>
<li><strong>Circular economy:</strong> Extends total battery service life to 20-25 years before recycling, improving lifecycle sustainability</li>
</ul>

<h3>Thermal Energy Storage</h3>

<table class="technical-table">
<thead>
<tr><th>Technology</th><th>Temperature Range</th><th>Duration</th><th>Round-Trip Efficiency</th><th>Application</th></tr>
</thead>
<tbody>
<tr><td>Molten salt (concentrated solar)</td><td>290-565 C</td><td>6-15 hours</td><td>93-99% (thermal); 25-35% (thermal-to-electric)</td><td>CSP dispatchability</td></tr>
<tr><td>Ice storage</td><td>-5 to 0 C</td><td>4-8 hours</td><td>90-95% (thermal)</td><td>Commercial building cooling</td></tr>
<tr><td>Concrete/rock (sensible heat)</td><td>200-600 C</td><td>8-72+ hours</td><td>50-70% (thermal-to-electric)</td><td>Industrial process heat, electricity</td></tr>
<tr><td>Phase change materials</td><td>Application-specific</td><td>4-24 hours</td><td>85-95% (thermal)</td><td>Building HVAC, waste heat recovery</td></tr>
<tr><td>Carnot batteries (PTES)</td><td>-40 to 600 C</td><td>8-100+ hours</td><td>50-65% (round-trip electric)</td><td>Grid-scale long-duration</td></tr>
</tbody>
</table>

<ul>
<li><strong>Molten salt:</strong> Proven at GW-scale in concentrated solar power (CSP) plants; enables dispatchable solar generation</li>
<li><strong>Ice storage:</strong> Mature technology; produces ice during off-peak hours for daytime cooling load shifting in commercial buildings</li>
<li><strong>Concrete/rock:</strong> Startups (e.g., Antora Energy, Rondo Energy) developing high-temperature thermal batteries for industrial decarbonization</li>
<li><strong>Pumped thermal (Carnot batteries):</strong> Heat pump charges thermal stores; heat engine discharges; no geographic or resource constraints</li>
</ul>

<div class="key-concept">
<h4>Graduate Research Perspective</h4>
<p>The storage technology portfolio required for a fully decarbonized grid extends far beyond lithium-ion batteries. The research frontier spans materials science (solid-state electrolytes, earth-abundant flow battery chemistries), systems engineering (optimal technology portfolios across timescales), market design (valuing storage flexibility and duration), and circular economy (second-life repurposing and recycling). The central analytical challenge is that optimal storage deployment is highly context-dependent—varying with renewable resource mix, grid topology, market structure, and policy framework—requiring sophisticated multi-dimensional optimization rather than one-size-fits-all solutions.</p>
</div>
</div>`,
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
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
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
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
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
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
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
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
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
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-ev-1', title: 'Cars That Plug In', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Electric Cars!</h2><p>Electric vehicles (EVs) use batteries instead of gas tanks. You charge them like a big phone!</p>', MIDDLE_SCHOOL: '<h2>How EVs Work</h2><p>A battery stores electricity. An electric motor turns the wheels. Regenerative braking recaptures energy when stopping.</p>', HIGH_SCHOOL: '<h2>EV Technology</h2><p>Lithium-ion batteries, permanent magnet motors, power electronics, and charging standards (Level 1/2/3).</p>', UNDERGRADUATE: '<h2>EV Economics</h2><p>Higher upfront cost, lower operating cost. Total cost of ownership often favors EVs over vehicle lifetime.</p>', GRADUATE: '<h2>Transportation Electrification</h2><p>Policy incentives, charging infrastructure planning, fleet electrification, and equity considerations.</p>', PHD: '<h2>Research Frontiers</h2><p>Solid-state batteries, ultra-fast charging, vehicle-to-grid integration, and autonomous EV fleets.</p>' } }],
    activities: [{ id: 're-ev-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Drive an EV!', MIDDLE_SCHOOL: 'Plan a Trip', HIGH_SCHOOL: 'Compare Costs', UNDERGRADUATE: 'Charging Network', GRADUATE: 'Fleet Analysis', PHD: 'V2G Optimization' }, description: { ELEMENTARY: 'See how far an electric car can go on a charge!', MIDDLE_SCHOOL: 'Plan a road trip with charging stops.', HIGH_SCHOOL: 'Compare EV and gas car costs over time.', UNDERGRADUATE: 'Design a charging network for a city.', GRADUATE: 'Analyze fleet electrification economics.', PHD: 'Optimize vehicle-to-grid energy flows.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ev-game', type: 'simulation', title: 'EV Road Trip', description: 'Plan efficient trips with electric vehicles!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ev-quiz', passingScore: 80, questions: [{ id: 'revq1', question: { ELEMENTARY: 'What powers an electric car?', MIDDLE_SCHOOL: 'What is regenerative braking?', HIGH_SCHOOL: 'What is Level 3 charging?', UNDERGRADUATE: 'What is total cost of ownership?', GRADUATE: 'What is vehicle-to-grid (V2G)?', PHD: 'What is a key challenge for solid-state batteries?' }, options: { ELEMENTARY: ['A battery', 'Gasoline', 'Coal', 'Water'], MIDDLE_SCHOOL: ['Recapturing energy when slowing down', 'Braking really hard', 'Using new brakes', 'Braking slowly'], HIGH_SCHOOL: ['DC fast charging (50+ kW)', 'Regular outlet (120V)', 'Home charger (240V)', 'Solar charging'], UNDERGRADUATE: ['All costs over vehicle lifetime', 'Just purchase price', 'Only fuel costs', 'Insurance only'], GRADUATE: ['Using EV batteries to supply grid power', 'A video game', 'Virtual driving', 'Voice to garage'], PHD: ['Manufacturing scalability and cost', 'Too much energy', 'Too heavy', 'Wrong color'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electric cars run on large batteries that you charge with electricity!', MIDDLE_SCHOOL: 'Regenerative braking captures energy when you slow down and puts it back in the battery.', HIGH_SCHOOL: 'Level 3 DC fast charging can add hundreds of miles of range in under an hour.', UNDERGRADUATE: 'Total cost of ownership includes purchase, fuel, maintenance, and other costs over the vehicle\'s life.', GRADUATE: 'V2G allows parked EVs to discharge power back to the grid during peak demand.', PHD: 'Manufacturing solid-state batteries at scale with competitive cost remains the primary challenge.' } }] },
    externalResources: [{ title: 'EV Charging', url: 'https://www.energy.gov/eere/electricvehicles', type: 'research' }]
  },
  // Module 11: Hydrogen Energy
  {
    id: 'renewable-hydrogen',
    slug: 'hydrogen-energy',
    title: 'Hydrogen Energy',
    description: {
      ELEMENTARY: 'Learn about the lightest element that can power cars and homes!',
      MIDDLE_SCHOOL: 'Discover how hydrogen can store and deliver clean energy.',
      HIGH_SCHOOL: 'Explore hydrogen production methods, fuel cells, and storage challenges.',
      UNDERGRADUATE: 'Analyze green hydrogen economics, electrolyzer technology, and industrial applications.',
      GRADUATE: 'Examine hydrogen infrastructure, sector coupling, and international trade implications.',
      PHD: 'Research advanced electrolysis, hydrogen carriers, and system integration optimization.'
    },
    topic: 'renewable-energy',
    category: 'HYDROGEN',
    icon: 'Atom',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-h2-1', title: 'The Lightest Fuel', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Hydrogen Power!</h2><p>Hydrogen is the lightest thing in the universe. When it combines with oxygen, it makes electricity and water!</p>', MIDDLE_SCHOOL: '<h2>How Hydrogen Works</h2><p>We can split water into hydrogen and oxygen using electricity. Later, fuel cells recombine them to make electricity.</p>', HIGH_SCHOOL: '<h2>Hydrogen Production</h2><p>Green hydrogen uses renewable electricity for electrolysis. Gray hydrogen comes from natural gas. Blue hydrogen captures the CO2.</p>', UNDERGRADUATE: '<h2>Hydrogen Economics</h2><p>Electrolyzer costs, capacity factors, electricity prices, and transport/storage determine green hydrogen competitiveness.</p>', GRADUATE: '<h2>Hydrogen Systems</h2><p>Sector coupling links renewable electricity to hard-to-electrify sectors via hydrogen.</p>', PHD: '<h2>Research Frontiers</h2><p>High-temperature electrolysis, hydrogen carriers (ammonia, LOHC), and large-scale system optimization.</p>' } }],
    activities: [{ id: 're-h2-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make Hydrogen!', MIDDLE_SCHOOL: 'Split Water', HIGH_SCHOOL: 'Color the Hydrogen', UNDERGRADUATE: 'Cost Calculator', GRADUATE: 'Sector Coupling', PHD: 'System Optimization' }, description: { ELEMENTARY: 'See how water becomes hydrogen fuel!', MIDDLE_SCHOOL: 'Use electricity to split water molecules.', HIGH_SCHOOL: 'Compare green, blue, and gray hydrogen.', UNDERGRADUATE: 'Calculate levelized cost of hydrogen.', GRADUATE: 'Design a hydrogen sector coupling system.', PHD: 'Optimize a regional hydrogen network.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-h2-game', type: 'simulation', title: 'Hydrogen Highway', description: 'Build a hydrogen economy from production to use!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-h2-quiz', passingScore: 80, questions: [{ id: 'rh2q1', question: { ELEMENTARY: 'What do you get when hydrogen meets oxygen?', MIDDLE_SCHOOL: 'What is electrolysis?', HIGH_SCHOOL: 'What is green hydrogen?', UNDERGRADUATE: 'What determines green hydrogen cost?', GRADUATE: 'What is sector coupling?', PHD: 'What is a hydrogen carrier?' }, options: { ELEMENTARY: ['Electricity and water', 'Fire', 'Nothing', 'Smoke'], MIDDLE_SCHOOL: ['Splitting water with electricity', 'Mixing chemicals', 'Burning fuel', 'Freezing water'], HIGH_SCHOOL: ['Hydrogen from renewable electrolysis', 'Hydrogen painted green', 'Hydrogen from plants', 'Natural hydrogen'], UNDERGRADUATE: ['Electricity cost and electrolyzer efficiency', 'Just the color', 'Only distance', 'Weather alone'], GRADUATE: ['Linking electricity to other sectors via hydrogen', 'Combining companies', 'Mixing fuels', 'Team building'], PHD: ['A molecule that stores hydrogen for transport', 'A hydrogen truck', 'A pipe', 'A fuel station'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When hydrogen and oxygen combine in a fuel cell, they make electricity and clean water!', MIDDLE_SCHOOL: 'Electrolysis uses electricity to split water molecules into hydrogen and oxygen gases.', HIGH_SCHOOL: 'Green hydrogen is produced using renewable electricity to power electrolyzers.', UNDERGRADUATE: 'Electricity cost (70%+) and electrolyzer capital/efficiency are the main cost drivers.', GRADUATE: 'Sector coupling uses hydrogen to connect renewable electricity to transport, industry, and heating.', PHD: 'Carriers like ammonia or liquid organic hydrogen carriers (LOHC) enable efficient long-distance transport.' } }] },
    externalResources: [{ title: 'Hydrogen Energy', url: 'https://www.energy.gov/eere/fuelcells', type: 'research' }]
  },
  // Module 12: Energy Storage
  {
    id: 'renewable-storage',
    slug: 'energy-storage',
    title: 'Energy Storage',
    description: {
      ELEMENTARY: 'Learn how we save energy for later, like a piggy bank for electricity!',
      MIDDLE_SCHOOL: 'Discover different ways to store energy from sun and wind.',
      HIGH_SCHOOL: 'Explore battery chemistry, pumped hydro, and other storage technologies.',
      UNDERGRADUATE: 'Analyze storage economics, degradation, and grid services applications.',
      GRADUATE: 'Examine storage policy, market design, and hybrid system optimization.',
      PHD: 'Research novel storage technologies, aging models, and portfolio optimization.'
    },
    topic: 'renewable-energy',
    category: 'STORAGE',
    icon: 'Battery',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-stor-1', title: 'Saving Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Piggy Bank!</h2><p>Sometimes the sun shines when we dont need power. We save that energy in batteries for nighttime!</p>', MIDDLE_SCHOOL: '<h2>Why Store Energy?</h2><p>Wind and solar dont always match demand. Storage bridges the gap, saving excess and releasing when needed.</p>', HIGH_SCHOOL: '<h2>Storage Technologies</h2><p>Lithium-ion batteries, pumped hydro, compressed air, flywheels, and thermal storage each have different strengths.</p>', UNDERGRADUATE: '<h2>Storage Economics</h2><p>Capital costs, round-trip efficiency, cycle life, and revenue streams determine project viability.</p>', GRADUATE: '<h2>Storage in Markets</h2><p>Arbitrage, ancillary services, capacity, and transmission deferral create stacked revenue streams.</p>', PHD: '<h2>Research Frontiers</h2><p>Next-gen chemistries, degradation modeling, and optimal sizing/dispatch under uncertainty.</p>' } }],
    activities: [{ id: 're-stor-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fill the Battery!', MIDDLE_SCHOOL: 'Match Supply and Demand', HIGH_SCHOOL: 'Compare Technologies', UNDERGRADUATE: 'Revenue Stacking', GRADUATE: 'Market Simulation', PHD: 'Portfolio Optimization' }, description: { ELEMENTARY: 'Store sunshine for nighttime use!', MIDDLE_SCHOOL: 'Balance renewable generation with storage.', HIGH_SCHOOL: 'Compare different storage technologies.', UNDERGRADUATE: 'Stack multiple revenue streams.', GRADUATE: 'Optimize storage in wholesale markets.', PHD: 'Design an optimal storage portfolio.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-stor-game', type: 'simulation', title: 'Storage Manager', description: 'Manage energy storage to keep the lights on!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-stor-quiz', passingScore: 80, questions: [{ id: 'rstq1', question: { ELEMENTARY: 'Why do we need to store energy?', MIDDLE_SCHOOL: 'What is the most common grid battery type?', HIGH_SCHOOL: 'What is round-trip efficiency?', UNDERGRADUATE: 'What is energy arbitrage?', GRADUATE: 'What is capacity value?', PHD: 'What is calendar aging?' }, options: { ELEMENTARY: ['To use sun power at night', 'For decoration', 'To make noise', 'For fun'], MIDDLE_SCHOOL: ['Lithium-ion', 'Lead-acid', 'Alkaline', 'Car battery'], HIGH_SCHOOL: ['Energy out divided by energy in', 'How fast it charges', 'How big it is', 'The color'], UNDERGRADUATE: ['Buying low, selling high', 'Free energy', 'Government payments', 'Charity'], GRADUATE: ['Ability to provide power when needed most', 'Battery capacity', 'Storage size', 'Energy amount'], PHD: ['Degradation over time regardless of use', 'Cycle degradation', 'Temperature effects', 'Manufacturing defects'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We store solar energy during the day so we can use it at night when the sun isnt shining!', MIDDLE_SCHOOL: 'Lithium-ion batteries are the most common type used for grid-scale storage today.', HIGH_SCHOOL: 'Round-trip efficiency is how much energy you get back compared to what you put in.', UNDERGRADUATE: 'Arbitrage profits from price differences - charging when cheap, discharging when expensive.', GRADUATE: 'Capacity value reflects storage ability to provide power during peak demand periods.', PHD: 'Calendar aging degrades batteries over time even without cycling, due to side reactions.' } }] },
    externalResources: [{ title: 'Energy Storage', url: 'https://www.energy.gov/oe/energy-storage', type: 'research' }]
  },
  // Module 13: Community Solar
  {
    id: 'renewable-community-solar',
    slug: 'community-solar',
    title: 'Community Solar',
    description: {
      ELEMENTARY: 'Learn how neighbors can share a solar garden together!',
      MIDDLE_SCHOOL: 'Discover how people without sunny roofs can still use solar power.',
      HIGH_SCHOOL: 'Explore community solar models, subscription programs, and virtual net metering.',
      UNDERGRADUATE: 'Analyze community solar economics, policy frameworks, and project development.',
      GRADUATE: 'Examine equitable access, low-income programs, and innovative financing models.',
      PHD: 'Research optimal siting, subscriber management, and policy effectiveness analysis.'
    },
    topic: 'renewable-energy',
    category: 'COMMUNITY',
    icon: 'Users',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-cs-1', title: 'Sharing Solar', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Solar for Everyone!</h2><p>Not everyone has a sunny roof. Community solar lets many people share one big solar farm!</p>', MIDDLE_SCHOOL: '<h2>How Community Solar Works</h2><p>A solar farm is built nearby. People subscribe and get credits on their electric bill for their share of the power.</p>', HIGH_SCHOOL: '<h2>Community Solar Models</h2><p>Utility-led programs, third-party developers, and cooperative models each have different structures and benefits.</p>', UNDERGRADUATE: '<h2>Project Economics</h2><p>Site selection, interconnection, subscriber acquisition, and bill credit rates drive project viability.</p>', GRADUATE: '<h2>Equitable Access</h2><p>Low-income carve-outs, anchor subscribers, and inclusive financing expand access beyond homeowners.</p>', PHD: '<h2>Research Frontiers</h2><p>Optimal program design, subscriber churn modeling, and policy effectiveness evaluation.</p>' } }],
    activities: [{ id: 're-cs-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Join the Solar Garden!', MIDDLE_SCHOOL: 'Subscribe to Solar', HIGH_SCHOOL: 'Compare Programs', UNDERGRADUATE: 'Develop a Project', GRADUATE: 'Design for Equity', PHD: 'Optimize Policy' }, description: { ELEMENTARY: 'Sign up your family for shared solar!', MIDDLE_SCHOOL: 'Choose a community solar subscription.', HIGH_SCHOOL: 'Compare different community solar programs.', UNDERGRADUATE: 'Develop a community solar project.', GRADUATE: 'Design an equitable community solar program.', PHD: 'Optimize community solar policy design.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-cs-game', type: 'simulation', title: 'Solar Garden Builder', description: 'Create a community solar project for your neighborhood!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-cs-quiz', passingScore: 80, questions: [{ id: 'rcsq1', question: { ELEMENTARY: 'Who can join community solar?', MIDDLE_SCHOOL: 'How do you benefit from community solar?', HIGH_SCHOOL: 'What is virtual net metering?', UNDERGRADUATE: 'What is subscriber acquisition cost?', GRADUATE: 'What is a low-income carve-out?', PHD: 'What is subscriber churn?' }, options: { ELEMENTARY: ['Anyone, even renters!', 'Only homeowners', 'Only farmers', 'Only rich people'], MIDDLE_SCHOOL: ['Credits on your electric bill', 'Free panels on your roof', 'A new car', 'Free internet'], HIGH_SCHOOL: ['Crediting solar production to subscribers bills', 'Virtual reality solar', 'Video game', 'Online shopping'], UNDERGRADUATE: ['Cost to sign up each subscriber', 'Submarine cost', 'Solar panel cost', 'Land cost'], GRADUATE: ['Reserved capacity for low-income subscribers', 'Cutting out low income', 'Income limits', 'Tax breaks'], PHD: ['Rate at which subscribers leave the program', 'Butter making', 'Panel rotation', 'Sun movement'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Community solar is for everyone - renters, apartment dwellers, and people with shady roofs can all participate!', MIDDLE_SCHOOL: 'Subscribers receive bill credits based on their share of the solar farms production.', HIGH_SCHOOL: 'Virtual net metering credits a subscribers bill for their portion of offsite solar generation.', UNDERGRADUATE: 'Customer acquisition costs significantly impact project economics - typically $200-500 per subscriber.', GRADUATE: 'Low-income carve-outs reserve a percentage of project capacity for income-qualified participants.', PHD: 'Subscriber churn - customers leaving - affects revenue stability and requires ongoing marketing.' } }] },
    externalResources: [{ title: 'Community Solar', url: 'https://www.energy.gov/eere/solar/community-solar', type: 'research' }]
  },
  // Module 14: Net Metering
  {
    id: 'renewable-net-metering',
    slug: 'net-metering',
    title: 'Net Metering',
    description: {
      ELEMENTARY: 'Learn how your electric meter can spin backwards with solar!',
      MIDDLE_SCHOOL: 'Discover how solar homes send extra power to the grid.',
      HIGH_SCHOOL: 'Explore net metering policies, rate structures, and grid economics.',
      UNDERGRADUATE: 'Analyze net metering value, cost shifts, and successor tariff designs.',
      GRADUATE: 'Examine distributed generation compensation, rate design, and utility impacts.',
      PHD: 'Research optimal DER compensation, cross-subsidization, and tariff reform strategies.'
    },
    topic: 'renewable-energy',
    category: 'POLICY',
    icon: 'ArrowLeftRight',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-nm-1', title: 'Meter Magic', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Backwards Meter!</h2><p>When your solar panels make more power than you use, the extra goes to your neighbors and your meter spins backwards!</p>', MIDDLE_SCHOOL: '<h2>How Net Metering Works</h2><p>Solar panels generate during the day. Excess goes to the grid. At night, you draw from the grid. You pay (or get paid) for the net.</p>', HIGH_SCHOOL: '<h2>Net Metering Policy</h2><p>States set net metering rules. Compensation rates, system size caps, and rollover policies vary widely.</p>', UNDERGRADUATE: '<h2>Value of Solar</h2><p>Net metering value depends on avoided energy, capacity, transmission, and environmental costs.</p>', GRADUATE: '<h2>Tariff Design</h2><p>Time-of-use rates, demand charges, and export rates affect solar economics and grid impacts.</p>', PHD: '<h2>Research Frontiers</h2><p>Optimal DER compensation design, distributional equity, and dynamic tariff structures.</p>' } }],
    activities: [{ id: 're-nm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Watch Your Meter!', MIDDLE_SCHOOL: 'Track Your Power', HIGH_SCHOOL: 'Compare Policies', UNDERGRADUATE: 'Calculate Value', GRADUATE: 'Design a Tariff', PHD: 'Optimize Compensation' }, description: { ELEMENTARY: 'See your meter spin backwards with solar!', MIDDLE_SCHOOL: 'Track electricity flowing in and out.', HIGH_SCHOOL: 'Compare net metering rules in different states.', UNDERGRADUATE: 'Calculate the value of distributed solar.', GRADUATE: 'Design a successor net metering tariff.', PHD: 'Optimize DER compensation mechanisms.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-nm-game', type: 'simulation', title: 'Net Metering Master', description: 'Maximize value from your solar through smart net metering!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-nm-quiz', passingScore: 80, questions: [{ id: 'rnmq1', question: { ELEMENTARY: 'What happens to extra solar power you make?', MIDDLE_SCHOOL: 'What does net mean in net metering?', HIGH_SCHOOL: 'Who sets net metering rules?', UNDERGRADUATE: 'What is avoided cost?', GRADUATE: 'What is a demand charge?', PHD: 'What is cross-subsidization?' }, options: { ELEMENTARY: ['It goes to your neighbors', 'It disappears', 'It explodes', 'Nothing'], MIDDLE_SCHOOL: ['The difference between in and out', 'A fishing net', 'The internet', 'A basketball net'], HIGH_SCHOOL: ['State regulators', 'Solar companies', 'The sun', 'Homeowners'], UNDERGRADUATE: ['Costs the utility doesnt incur due to solar', 'Costs to avoid', 'Hidden fees', 'Future costs'], GRADUATE: ['A fee based on peak power draw', 'A military charge', 'A battery charge', 'An accusation'], PHD: ['One customer group paying for anothers costs', 'Crossing streams', 'Mixing subsidies', 'Double payments'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When you make more solar power than you need, it flows to your neighbors through the grid!', MIDDLE_SCHOOL: 'Net means the difference - what you sent out minus what you took in from the grid.', HIGH_SCHOOL: 'State public utility commissions or legislatures set net metering policies.', UNDERGRADUATE: 'Avoided costs include energy, capacity, and infrastructure the utility doesnt need to build.', GRADUATE: 'Demand charges are based on your highest power draw, not total energy used.', PHD: 'Cross-subsidization occurs when non-solar customers pay fixed costs that solar customers avoid.' } }] },
    externalResources: [{ title: 'Net Metering', url: 'https://www.seia.org/initiatives/net-metering', type: 'research' }]
  },
  // Module 15: Energy Efficiency
  {
    id: 'renewable-efficiency',
    slug: 'energy-efficiency',
    title: 'Energy Efficiency',
    description: {
      ELEMENTARY: 'Learn how to use less energy while staying comfortable!',
      MIDDLE_SCHOOL: 'Discover ways to do more with less energy.',
      HIGH_SCHOOL: 'Explore building efficiency, appliances, and behavioral strategies.',
      UNDERGRADUATE: 'Analyze efficiency economics, program design, and measurement/verification.',
      GRADUATE: 'Examine efficiency policy, market transformation, and integrated resource planning.',
      PHD: 'Research efficiency potential studies, rebound effects, and cost-effectiveness analysis.'
    },
    topic: 'renewable-energy',
    category: 'EFFICIENCY',
    icon: 'Gauge',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-eff-1', title: 'Doing More with Less', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Superheroes!</h2><p>Saving energy is like having a superpower. LED lights, good insulation, and smart habits help us waste less!</p>', MIDDLE_SCHOOL: '<h2>Why Efficiency Matters</h2><p>The cheapest, cleanest energy is the energy we dont use. Efficiency is often called the first fuel.</p>', HIGH_SCHOOL: '<h2>Efficiency Strategies</h2><p>Building envelope improvements, high-efficiency HVAC, LED lighting, and smart controls reduce consumption.</p>', UNDERGRADUATE: '<h2>Efficiency Economics</h2><p>Simple payback, lifecycle cost, and cost-effectiveness tests evaluate efficiency investments.</p>', GRADUATE: '<h2>Efficiency Programs</h2><p>Utility programs, building codes, appliance standards, and market transformation drive efficiency adoption.</p>', PHD: '<h2>Research Frontiers</h2><p>Technical potential studies, behavioral efficiency, and rebound effect quantification.</p>' } }],
    activities: [{ id: 're-eff-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Energy Detective!', MIDDLE_SCHOOL: 'Home Energy Audit', HIGH_SCHOOL: 'Calculate Savings', UNDERGRADUATE: 'Program Design', GRADUATE: 'Policy Analysis', PHD: 'Potential Study' }, description: { ELEMENTARY: 'Find ways to save energy in your home!', MIDDLE_SCHOOL: 'Audit your home for efficiency opportunities.', HIGH_SCHOOL: 'Calculate payback for efficiency upgrades.', UNDERGRADUATE: 'Design a utility efficiency program.', GRADUATE: 'Analyze efficiency policy effectiveness.', PHD: 'Conduct a technical potential study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-eff-game', type: 'simulation', title: 'Efficiency Expert', description: 'Find and fix energy waste to maximize savings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-eff-quiz', passingScore: 80, questions: [{ id: 'reffq1', question: { ELEMENTARY: 'Which light bulb saves the most energy?', MIDDLE_SCHOOL: 'Why is efficiency called the first fuel?', HIGH_SCHOOL: 'What is simple payback period?', UNDERGRADUATE: 'What is a Total Resource Cost test?', GRADUATE: 'What is market transformation?', PHD: 'What is the rebound effect?' }, options: { ELEMENTARY: ['LED', 'Old-style bulb', 'Candle', 'No light'], MIDDLE_SCHOOL: ['Its the cheapest, cleanest energy source', 'Its used first in the morning', 'Its number one', 'Its the hottest'], HIGH_SCHOOL: ['Cost divided by annual savings', 'How fast you run', 'When you get money back', 'First payment'], UNDERGRADUATE: ['Cost-effectiveness from all perspectives', 'Total car cost', 'Resource extraction', 'Full expenses'], GRADUATE: ['Lasting change in markets toward efficiency', 'Market changes', 'Stock trading', 'Shopping'], PHD: ['Increased consumption offsetting efficiency gains', 'Bouncing back', 'Market recovery', 'Spring effect'] }, correctIndex: 0, explanation: { ELEMENTARY: 'LED light bulbs use up to 90% less energy than old incandescent bulbs!', MIDDLE_SCHOOL: 'Efficiency is the first fuel because saved energy is cheaper and cleaner than any generation source.', HIGH_SCHOOL: 'Simple payback is the upfront cost divided by yearly savings - how long until it pays for itself.', UNDERGRADUATE: 'The TRC test weighs all costs and benefits to participants, utilities, and society.', GRADUATE: 'Market transformation creates permanent shifts in product availability and consumer behavior.', PHD: 'The rebound effect occurs when efficiency savings lead to increased use, partially offsetting gains.' } }] },
    externalResources: [{ title: 'Energy Efficiency', url: 'https://www.energy.gov/eere/efficiency', type: 'research' }]
  },
  // Module 16: Geothermal Energy
  {
    id: 'renewable-geothermal',
    slug: 'geothermal-energy',
    title: 'Geothermal Energy',
    description: {
      ELEMENTARY: 'Learn how Earth\'s heat can power our homes!',
      MIDDLE_SCHOOL: 'Discover the heat beneath our feet and how we use it.',
      HIGH_SCHOOL: 'Explore geothermal power plants, heat pumps, and direct use applications.',
      UNDERGRADUATE: 'Analyze geothermal resources, enhanced systems, and project economics.',
      GRADUATE: 'Examine geothermal policy, advanced drilling, and hybrid systems.',
      PHD: 'Research enhanced geothermal systems, reservoir modeling, and induced seismicity.'
    },
    topic: 'renewable-energy',
    category: 'GEOTHERMAL',
    icon: 'Flame',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-geo-1', title: 'Earth\'s Heat', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Hot Earth!</h2><p>Deep underground, the Earth is very hot. We can use this heat to warm buildings and make electricity!</p>', MIDDLE_SCHOOL: '<h2>Geothermal Basics</h2><p>Heat from Earths core flows upward. In some places, hot water and steam can be tapped for energy.</p>', HIGH_SCHOOL: '<h2>Geothermal Systems</h2><p>Flash steam, binary cycle, and dry steam plants. Ground source heat pumps use shallow earth temperature.</p>', UNDERGRADUATE: '<h2>Resource Assessment</h2><p>Temperature gradients, permeability, fluid availability, and reservoir characteristics determine viability.</p>', GRADUATE: '<h2>Enhanced Geothermal</h2><p>Creating artificial reservoirs through hydraulic stimulation expands geothermal potential.</p>', PHD: '<h2>Research Frontiers</h2><p>Deep closed-loop systems, supercritical resources, and advanced reservoir engineering.</p>' } }],
    activities: [{ id: 're-geo-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Find the Heat!', MIDDLE_SCHOOL: 'Geothermal Explorer', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Resource Assessment', GRADUATE: 'EGS Simulation', PHD: 'Reservoir Model' }, description: { ELEMENTARY: 'Find where Earths heat comes to the surface!', MIDDLE_SCHOOL: 'Explore how geothermal energy works.', HIGH_SCHOOL: 'Design a geothermal system.', UNDERGRADUATE: 'Assess geothermal resource potential.', GRADUATE: 'Simulate an enhanced geothermal system.', PHD: 'Model geothermal reservoir dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-geo-game', type: 'simulation', title: 'Geothermal Pioneer', description: 'Tap Earths heat for clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-geo-quiz', passingScore: 80, questions: [{ id: 'rgeoq1', question: { ELEMENTARY: 'Where does geothermal energy come from?', MIDDLE_SCHOOL: 'What is a geyser?', HIGH_SCHOOL: 'What is a binary cycle plant?', UNDERGRADUATE: 'What is resource temperature gradient?', GRADUATE: 'What is EGS?', PHD: 'What is induced seismicity?' }, options: { ELEMENTARY: ['Heat from inside the Earth', 'The sun', 'Wind', 'Water'], MIDDLE_SCHOOL: ['Hot water shooting from the ground', 'A cold spring', 'A type of rock', 'An animal'], HIGH_SCHOOL: ['Uses hot water to heat a second fluid that drives turbines', 'Burns two fuels', 'Uses two suns', 'Has two buildings'], UNDERGRADUATE: ['Temperature increase with depth', 'Color gradient', 'Slope of land', 'Water temperature only'], GRADUATE: ['Enhanced Geothermal System - artificially created reservoirs', 'Electric Grid System', 'External Gas Supply', 'Energy Grid Standard'], PHD: ['Earthquakes caused by fluid injection', 'Natural earthquakes', 'Induced happiness', 'Static electricity'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Geothermal energy comes from the heat deep inside the Earth!', MIDDLE_SCHOOL: 'A geyser is a hot spring that periodically shoots water and steam into the air.', HIGH_SCHOOL: 'Binary cycle plants use geothermal heat to vaporize a secondary fluid with lower boiling point.', UNDERGRADUATE: 'Temperature gradient measures how much hotter it gets per kilometer of depth.', GRADUATE: 'EGS creates artificial permeability in hot rocks to enable geothermal where natural systems dont exist.', PHD: 'Induced seismicity is earthquakes triggered by fluid injection during EGS development.' } }] },
    externalResources: [{ title: 'Geothermal Energy', url: 'https://www.energy.gov/eere/geothermal', type: 'research' }]
  },
  // Module 17: Offshore Wind
  {
    id: 'renewable-offshore-wind',
    slug: 'offshore-wind',
    title: 'Offshore Wind',
    description: {
      ELEMENTARY: 'Learn about giant windmills in the ocean!',
      MIDDLE_SCHOOL: 'Discover how wind turbines work in the sea.',
      HIGH_SCHOOL: 'Explore offshore wind technology, resources, and challenges.',
      UNDERGRADUATE: 'Analyze offshore wind economics, supply chains, and project development.',
      GRADUATE: 'Examine offshore wind policy, floating platforms, and grid integration.',
      PHD: 'Research offshore wind modeling, environmental impacts, and advanced technologies.'
    },
    topic: 'renewable-energy',
    category: 'WIND',
    icon: 'Wind',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-osw-1', title: 'Wind at Sea', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Ocean Windmills!</h2><p>Big wind turbines can be built in the ocean where wind blows strong and steady!</p>', MIDDLE_SCHOOL: '<h2>Why Offshore?</h2><p>Ocean winds are stronger and steadier than on land. Offshore turbines can be much larger too.</p>', HIGH_SCHOOL: '<h2>Offshore Technology</h2><p>Fixed-bottom foundations in shallow water, floating platforms in deep water, and submarine cables.</p>', UNDERGRADUATE: '<h2>Project Economics</h2><p>Higher capital costs offset by better capacity factors. Supply chain and port infrastructure critical.</p>', GRADUATE: '<h2>Floating Wind</h2><p>Semi-submersibles, spar buoys, and tension leg platforms unlock deep water resources.</p>', PHD: '<h2>Research Frontiers</h2><p>Wake effects, floating platform dynamics, and wildlife interaction studies.</p>' } }],
    activities: [{ id: 're-osw-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build Ocean Turbines!', MIDDLE_SCHOOL: 'Site Selection', HIGH_SCHOOL: 'Foundation Choice', UNDERGRADUATE: 'Project Model', GRADUATE: 'Floating Design', PHD: 'Wake Modeling' }, description: { ELEMENTARY: 'Build wind turbines in the ocean!', MIDDLE_SCHOOL: 'Find the best ocean sites for wind.', HIGH_SCHOOL: 'Choose the right foundation type.', UNDERGRADUATE: 'Model offshore wind project economics.', GRADUATE: 'Design a floating wind platform.', PHD: 'Model wake effects in wind farms.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-osw-game', type: 'simulation', title: 'Offshore Wind Builder', description: 'Develop offshore wind farms in challenging ocean conditions!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-osw-quiz', passingScore: 80, questions: [{ id: 'roswq1', question: { ELEMENTARY: 'Why put wind turbines in the ocean?', MIDDLE_SCHOOL: 'What is special about ocean wind?', HIGH_SCHOOL: 'What is a fixed-bottom foundation?', UNDERGRADUATE: 'What is capacity factor?', GRADUATE: 'What is a spar buoy?', PHD: 'What is wake effect?' }, options: { ELEMENTARY: ['Wind is stronger and steadier there', 'Fish like them', 'No reason', 'They look pretty'], MIDDLE_SCHOOL: ['Stronger and more consistent than land', 'Weaker wind', 'Same as land', 'No wind at sea'], HIGH_SCHOOL: ['Foundation attached to the seafloor', 'Floating foundation', 'No foundation needed', 'Sand foundation'], UNDERGRADUATE: ['Actual generation divided by maximum possible', 'Cost factor', 'Size factor', 'Wind speed'], GRADUATE: ['Floating platform with heavy bottom', 'A type of fish', 'A buoy for boats', 'A wind direction indicator'], PHD: ['Reduced wind behind turbines affecting downstream ones', 'Waking up', 'Water waves', 'Noise effect'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wind over the ocean is stronger and blows more steadily than over land!', MIDDLE_SCHOOL: 'Ocean wind is stronger and more consistent because theres nothing to slow it down.', HIGH_SCHOOL: 'Fixed-bottom foundations are attached directly to the seafloor in water up to ~60 meters deep.', UNDERGRADUATE: 'Capacity factor is actual energy produced divided by theoretical maximum - offshore often exceeds 50%.', GRADUATE: 'A spar buoy is a floating platform stabilized by a heavy ballasted bottom section.', PHD: 'Wake effects reduce wind speed behind turbines, affecting output of downstream machines.' } }] },
    externalResources: [{ title: 'Offshore Wind', url: 'https://www.energy.gov/eere/wind/offshore-wind', type: 'research' }]
  },
  // Module 18: Solar Plus Storage
  {
    id: 'renewable-solar-storage',
    slug: 'solar-plus-storage',
    title: 'Solar Plus Storage',
    description: {
      ELEMENTARY: 'Learn how to save sunshine for nighttime!',
      MIDDLE_SCHOOL: 'Discover how batteries store solar energy for when the sun goes down.',
      HIGH_SCHOOL: 'Explore solar-storage system design, sizing, and economics.',
      UNDERGRADUATE: 'Analyze hybrid system optimization, dispatch strategies, and value stacking.',
      GRADUATE: 'Examine solar-storage policy, market structures, and grid services.',
      PHD: 'Research degradation co-optimization, forecasting, and portfolio design.'
    },
    topic: 'renewable-energy',
    category: 'HYBRID',
    icon: 'BatteryCharging',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-ss-1', title: 'Saving Sunshine', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Sunshine in a Battery!</h2><p>Solar panels make electricity when the sun shines. Batteries save that power for nighttime!</p>', MIDDLE_SCHOOL: '<h2>Why Add Storage?</h2><p>Solar only works during the day. Batteries shift solar energy to when you need it most.</p>', HIGH_SCHOOL: '<h2>System Design</h2><p>Sizing solar and storage together. AC vs DC coupling. Backup power vs daily cycling.</p>', UNDERGRADUATE: '<h2>Optimization</h2><p>Dispatch strategies, round-trip efficiency, and revenue stacking across services.</p>', GRADUATE: '<h2>Market Integration</h2><p>Capacity markets, ancillary services, and time-of-use arbitrage.</p>', PHD: '<h2>Research Frontiers</h2><p>Co-optimized degradation management, uncertainty in forecasting, and portfolio optimization.</p>' } }],
    activities: [{ id: 're-ss-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Sunshine!', MIDDLE_SCHOOL: 'Size Your System', HIGH_SCHOOL: 'Design Hybrid', UNDERGRADUATE: 'Optimize Dispatch', GRADUATE: 'Value Stacking', PHD: 'Portfolio Design' }, description: { ELEMENTARY: 'Store solar power for nighttime!', MIDDLE_SCHOOL: 'Size a solar plus storage system.', HIGH_SCHOOL: 'Design an optimized hybrid system.', UNDERGRADUATE: 'Optimize dispatch strategy.', GRADUATE: 'Stack multiple value streams.', PHD: 'Design optimal solar-storage portfolio.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ss-game', type: 'simulation', title: 'Solar Storage Manager', description: 'Optimize solar and storage for maximum value!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ss-quiz', passingScore: 80, questions: [{ id: 'rssq1', question: { ELEMENTARY: 'Why add batteries to solar?', MIDDLE_SCHOOL: 'When do batteries release stored solar?', HIGH_SCHOOL: 'What is DC coupling?', UNDERGRADUATE: 'What is dispatch strategy?', GRADUATE: 'What is value stacking?', PHD: 'What is co-optimization?' }, options: { ELEMENTARY: ['To use solar power at night', 'For decoration', 'Batteries like sun', 'No reason'], MIDDLE_SCHOOL: ['When the sun is not shining', 'Only during the day', 'Never', 'All the time'], HIGH_SCHOOL: ['Solar connects directly to battery before inverter', 'Using DC motors', 'Washington DC location', 'Double connection'], UNDERGRADUATE: ['When and how to charge/discharge', 'Where to install', 'What color to paint', 'How to clean'], GRADUATE: ['Earning from multiple grid services', 'Stacking batteries', 'Making piles', 'Value meals'], PHD: ['Jointly optimizing solar and storage operations', 'Separate optimization', 'No optimization', 'Random operation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Batteries store solar power during the day so you can use it at night!', MIDDLE_SCHOOL: 'Batteries discharge in the evening and at night when solar panels arent producing.', HIGH_SCHOOL: 'DC coupling connects solar panels directly to batteries before the inverter, enabling more efficient charging.', UNDERGRADUATE: 'Dispatch strategy determines when to charge, discharge, or hold based on prices and needs.', GRADUATE: 'Value stacking earns revenue from multiple services - energy, capacity, ancillary, and backup.', PHD: 'Co-optimization jointly manages solar curtailment and battery degradation for maximum system value.' } }] },
    externalResources: [{ title: 'Solar Plus Storage', url: 'https://www.nrel.gov/solar/solar-plus-storage.html', type: 'research' }]
  },
  // Module 19: Clean Energy Finance
  {
    id: 'renewable-finance',
    slug: 'clean-energy-finance',
    title: 'Clean Energy Finance',
    description: {
      ELEMENTARY: 'Learn how people pay for solar panels and wind turbines!',
      MIDDLE_SCHOOL: 'Discover different ways to finance clean energy projects.',
      HIGH_SCHOOL: 'Explore solar loans, leases, PPAs, and community financing.',
      UNDERGRADUATE: 'Analyze project finance, tax equity, and investment structures.',
      GRADUATE: 'Examine green bonds, climate finance, and institutional investment.',
      PHD: 'Research financial innovation, risk assessment, and energy transition investment.'
    },
    topic: 'renewable-energy',
    category: 'FINANCE',
    icon: 'DollarSign',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-fin-1', title: 'Paying for Clean Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Money for Solar!</h2><p>Solar panels cost money, but there are many ways for people to pay for them over time.</p>', MIDDLE_SCHOOL: '<h2>Financing Options</h2><p>Buying, loans, leases, and PPAs let people go solar even if they cant pay all at once.</p>', HIGH_SCHOOL: '<h2>Ownership vs Service</h2><p>Loans let you own and get tax credits. Leases and PPAs mean someone else owns the system.</p>', UNDERGRADUATE: '<h2>Project Finance</h2><p>Tax equity, debt, and sponsor equity. Investment Tax Credit and depreciation benefits.</p>', GRADUATE: '<h2>Green Finance</h2><p>Green bonds, yieldcos, and institutional investors driving clean energy growth.</p>', PHD: '<h2>Research Frontiers</h2><p>Financial innovation, climate risk integration, and transition finance.</p>' } }],
    activities: [{ id: 're-fin-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Pay for Solar!', MIDDLE_SCHOOL: 'Compare Options', HIGH_SCHOOL: 'Finance Decision', UNDERGRADUATE: 'Structure Deal', GRADUATE: 'Green Bond', PHD: 'Innovation Design' }, description: { ELEMENTARY: 'Find ways to pay for solar panels!', MIDDLE_SCHOOL: 'Compare different financing options.', HIGH_SCHOOL: 'Make a solar financing decision.', UNDERGRADUATE: 'Structure a project finance deal.', GRADUATE: 'Design a green bond offering.', PHD: 'Design financial innovation for clean energy.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-fin-game', type: 'simulation', title: 'Clean Energy Investor', description: 'Finance clean energy projects for maximum impact!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-fin-quiz', passingScore: 80, questions: [{ id: 'rfinq1', question: { ELEMENTARY: 'How can people pay for solar panels?', MIDDLE_SCHOOL: 'What is a solar lease?', HIGH_SCHOOL: 'What is a PPA?', UNDERGRADUATE: 'What is tax equity?', GRADUATE: 'What is a green bond?', PHD: 'What is transition finance?' }, options: { ELEMENTARY: ['Buy, loan, or lease', 'Only cash', 'Free always', 'No ways exist'], MIDDLE_SCHOOL: ['Renting solar panels with monthly payments', 'Buying panels', 'Free panels', 'No payments'], HIGH_SCHOOL: ['Power Purchase Agreement - paying for electricity not panels', 'Purchase Panels Always', 'Partial Payment Agreement', 'Post Payment Action'], UNDERGRADUATE: ['Investment using tax credit value', 'Tax preparation', 'Tax evasion', 'Tax forms'], GRADUATE: ['Bond funding environmentally beneficial projects', 'A green piece of paper', 'Garden bond', 'Tree bond'], PHD: ['Financing the shift from fossil to clean energy', 'Transportation finance', 'Transition metals', 'Travel financing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'People can buy solar panels, get a loan, or lease them with monthly payments!', MIDDLE_SCHOOL: 'A solar lease lets you rent panels and pay monthly without owning them.', HIGH_SCHOOL: 'A PPA means you pay for the electricity the panels produce, not the panels themselves.', UNDERGRADUATE: 'Tax equity investors monetize tax credits that the project owner cant fully use.', GRADUATE: 'Green bonds raise capital specifically for environmental projects at competitive rates.', PHD: 'Transition finance supports the shift from fossil fuels to clean energy across economies.' } }] },
    externalResources: [{ title: 'Clean Energy Finance', url: 'https://www.nrel.gov/analysis/financing.html', type: 'research' }]
  },
  // Module 20: Grid Decarbonization
  {
    id: 'renewable-grid-decarb',
    slug: 'grid-decarbonization',
    title: 'Grid Decarbonization',
    description: {
      ELEMENTARY: 'Learn how we can make all our electricity clean!',
      MIDDLE_SCHOOL: 'Discover the path to 100% clean electricity.',
      HIGH_SCHOOL: 'Explore grid decarbonization pathways, challenges, and solutions.',
      UNDERGRADUATE: 'Analyze clean energy standards, capacity planning, and integration challenges.',
      GRADUATE: 'Examine deep decarbonization scenarios, firm capacity, and policy design.',
      PHD: 'Research grid modeling, technology pathways, and transition dynamics.'
    },
    topic: 'renewable-energy',
    category: 'TRANSITION',
    icon: 'Zap',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-gd-1', title: 'Clean Grid', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>All Clean Power!</h2><p>We can make all our electricity from sun, wind, and other clean sources instead of burning fossil fuels!</p>', MIDDLE_SCHOOL: '<h2>100% Clean</h2><p>Many places are planning for 100% clean electricity. It takes solar, wind, storage, and other sources working together.</p>', HIGH_SCHOOL: '<h2>Decarbonization Pathways</h2><p>Different mixes of solar, wind, storage, nuclear, and other sources can achieve deep decarbonization.</p>', UNDERGRADUATE: '<h2>Integration Challenges</h2><p>Reliability, flexibility, firm capacity, and transmission as variable renewables grow.</p>', GRADUATE: '<h2>Deep Decarbonization</h2><p>The last 10-20% is hardest. Long-duration storage, firm clean power, and sector coupling.</p>', PHD: '<h2>Research Frontiers</h2><p>Capacity expansion modeling, technology portfolios, and transition pathway analysis.</p>' } }],
    activities: [{ id: 're-gd-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Clean the Grid!', MIDDLE_SCHOOL: 'Plan 100% Clean', HIGH_SCHOOL: 'Pathway Analysis', UNDERGRADUATE: 'Capacity Planning', GRADUATE: 'Deep Decarb', PHD: 'Transition Model' }, description: { ELEMENTARY: 'Replace dirty power with clean power!', MIDDLE_SCHOOL: 'Plan how to reach 100% clean electricity.', HIGH_SCHOOL: 'Analyze different decarbonization pathways.', UNDERGRADUATE: 'Plan clean capacity additions.', GRADUATE: 'Solve the last 20% problem.', PHD: 'Model grid transition dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-gd-game', type: 'simulation', title: 'Grid Transformer', description: 'Transform the grid to 100% clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-gd-quiz', passingScore: 80, questions: [{ id: 'rgdq1', question: { ELEMENTARY: 'Can we make all electricity clean?', MIDDLE_SCHOOL: 'What does 100% clean electricity need?', HIGH_SCHOOL: 'What is firm capacity?', UNDERGRADUATE: 'What is a clean energy standard?', GRADUATE: 'Why is the last 20% hardest?', PHD: 'What is capacity expansion modeling?' }, options: { ELEMENTARY: ['Yes, with sun, wind, and other clean sources', 'No, impossible', 'Only in dreams', 'Maybe in 1000 years'], MIDDLE_SCHOOL: ['Solar, wind, storage, and more working together', 'Only solar', 'Only wind', 'Magic'], HIGH_SCHOOL: ['Generation available on demand regardless of weather', 'Firm muscles', 'Strong poles', 'Rigid wires'], UNDERGRADUATE: ['Policy requiring clean electricity percentage', 'A rule about being clean', 'Building codes', 'Efficiency standard'], GRADUATE: ['Need firm capacity for periods when variable renewables are low', 'Its easier', 'No challenge', 'Already solved'], PHD: ['Modeling optimal generation investment over time', 'Expanding capacity', 'Making models bigger', 'Capacity building'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! We can make all our electricity from clean sources like solar, wind, and hydropower!', MIDDLE_SCHOOL: '100% clean electricity needs a combination of solar, wind, storage, and other clean sources.', HIGH_SCHOOL: 'Firm capacity is generation that can be dispatched when needed regardless of weather.', UNDERGRADUATE: 'Clean energy standards require utilities to supply a percentage of electricity from clean sources.', GRADUATE: 'Variable renewables may have extended low periods requiring long-duration storage or firm clean power.', PHD: 'Capacity expansion modeling optimizes generation and storage investment decisions over long timeframes.' } }] },
    externalResources: [{ title: 'Grid Decarbonization', url: 'https://www.nrel.gov/analysis/100-percent-clean-electricity.html', type: 'research' }]
  },
  {
    id: 'renewable-ev',
    slug: 'electric-vehicles',
    title: 'Electric Vehicles and Clean Transportation',
    description: {
      ELEMENTARY: 'Learn about cars and buses that run on electricity instead of gas!',
      MIDDLE_SCHOOL: 'Discover how electric vehicles work and why they are better for the planet.',
      HIGH_SCHOOL: 'Explore EV technology, charging infrastructure, and transportation decarbonization.',
      UNDERGRADUATE: 'Analyze EV economics, grid integration, and fleet electrification strategies.',
      GRADUATE: 'Examine transportation system transformation, policy frameworks, and equity.',
      PHD: 'Research vehicle-grid integration, mobility systems, and lifecycle impacts.'
    },
    topic: 'renewable-energy',
    category: 'TRANSPORTATION',
    icon: 'Car',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-ev-1', title: 'Electric Cars', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Cars Without Tailpipes!</h2><p>Electric cars run on batteries instead of gasoline. They dont make any smoke from a tailpipe!</p>', MIDDLE_SCHOOL: '<h2>How EVs Work</h2><p>Electric vehicles use batteries to store electricity that powers motors. No engine, no gas, no emissions.</p>', HIGH_SCHOOL: '<h2>EV Technology</h2><p>Battery chemistry, range, charging levels, and infrastructure needs for widespread adoption.</p>', UNDERGRADUATE: '<h2>EV Economics</h2><p>Total cost of ownership, charging infrastructure investment, and fleet electrification business cases.</p>', GRADUATE: '<h2>System Transformation</h2><p>Grid impacts, managed charging, vehicle-to-grid, and transportation equity.</p>', PHD: '<h2>Research Frontiers</h2><p>Battery technology, mobility-as-a-service, and lifecycle carbon analysis.</p>' } }],
    activities: [{ id: 're-ev-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Drive Electric!', MIDDLE_SCHOOL: 'EV Journey', HIGH_SCHOOL: 'Charging Network', UNDERGRADUATE: 'Fleet Analysis', GRADUATE: 'V2G Modeling', PHD: 'System Design' }, description: { ELEMENTARY: 'Take a trip in an electric car!', MIDDLE_SCHOOL: 'Plan an EV road trip.', HIGH_SCHOOL: 'Design a charging network.', UNDERGRADUATE: 'Analyze fleet electrification.', GRADUATE: 'Model vehicle-grid integration.', PHD: 'Design mobility systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ev-game', type: 'simulation', title: 'EV Champion', description: 'Electrify transportation and cut emissions!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ev-quiz', passingScore: 80, questions: [{ id: 'revq1', question: { ELEMENTARY: 'What powers an electric car?', MIDDLE_SCHOOL: 'Why are EVs cleaner?', HIGH_SCHOOL: 'What is Level 3 charging?', UNDERGRADUATE: 'What is TCO?', GRADUATE: 'What is V2G?', PHD: 'What is MaaS?' }, options: { ELEMENTARY: ['A battery', 'Gasoline', 'Steam', 'Pedals'], MIDDLE_SCHOOL: ['No tailpipe emissions', 'They fly', 'Use more fuel', 'Not cleaner'], HIGH_SCHOOL: ['DC fast charging', 'Slow home charging', 'Gas station', 'Manual charging'], UNDERGRADUATE: ['Total Cost of Ownership', 'The Car Owner', 'Technical Car Option', 'Top Cost Only'], GRADUATE: ['Vehicle-to-Grid - EVs sending power back', 'Video to Grid', 'Vertical Grid', 'Visual Grid'], PHD: ['Mobility as a Service', 'Make a Sale', 'Motor and Speed', 'Manual and Semi'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electric cars are powered by big batteries that store electricity!', MIDDLE_SCHOOL: 'EVs produce no tailpipe emissions because they run on electricity instead of burning fuel.', HIGH_SCHOOL: 'Level 3 or DC fast charging can add significant range in 20-30 minutes.', UNDERGRADUATE: 'TCO compares all costs including fuel, maintenance, and purchase price over vehicle lifetime.', GRADUATE: 'V2G allows EVs to send stored energy back to the grid during peak demand.', PHD: 'Mobility as a Service integrates various transport modes into accessible on-demand services.' } }] },
    externalResources: [{ title: 'Electric Vehicles', url: 'https://www.energy.gov/eere/vehicles/electric-vehicles', type: 'article' }]
  },
  {
    id: 'renewable-smart-grid',
    slug: 'smart-grids',
    title: 'Smart Grid Technology',
    description: {
      ELEMENTARY: 'Learn how the electricity grid is getting smarter with computers!',
      MIDDLE_SCHOOL: 'Discover how smart grids use technology to manage electricity better.',
      HIGH_SCHOOL: 'Explore smart grid components, communication systems, and grid modernization.',
      UNDERGRADUATE: 'Analyze smart grid architecture, AMI, demand response, and cybersecurity.',
      GRADUATE: 'Examine grid digitalization, transactive energy, and regulatory frameworks.',
      PHD: 'Research grid optimization, distributed intelligence, and complex systems.'
    },
    topic: 'renewable-energy',
    category: 'GRID',
    icon: 'Network',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-sg-1', title: 'Smarter Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Computers Help the Grid!</h2><p>Smart grids use computers to know when you need power and send it to you more efficiently.</p>', MIDDLE_SCHOOL: '<h2>What is a Smart Grid?</h2><p>Smart grids add sensors and communication to the electricity network, enabling better management and reliability.</p>', HIGH_SCHOOL: '<h2>Smart Grid Components</h2><p>Smart meters, sensors, automated switches, and communication networks enable two-way power and information flow.</p>', UNDERGRADUATE: '<h2>Grid Modernization</h2><p>AMI, SCADA, DMS, and demand response programs transform utility operations.</p>', GRADUATE: '<h2>Transactive Energy</h2><p>Markets at the grid edge, distributed energy resource management, and new utility business models.</p>', PHD: '<h2>Research Frontiers</h2><p>Machine learning for grid operations, distributed control, and cyber-physical security.</p>' } }],
    activities: [{ id: 're-sg-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Smart Grid Game!', MIDDLE_SCHOOL: 'Grid Sensors', HIGH_SCHOOL: 'Smart Meter Data', UNDERGRADUATE: 'System Architecture', GRADUATE: 'Market Design', PHD: 'ML Application' }, description: { ELEMENTARY: 'Help the smart grid work!', MIDDLE_SCHOOL: 'Add sensors to improve the grid.', HIGH_SCHOOL: 'Analyze smart meter data.', UNDERGRADUATE: 'Design smart grid architecture.', GRADUATE: 'Design a transactive energy market.', PHD: 'Apply machine learning to grid operations.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-sg-game', type: 'simulation', title: 'Grid Operator', description: 'Run a smart grid efficiently!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-sg-quiz', passingScore: 80, questions: [{ id: 'rsgq1', question: { ELEMENTARY: 'What makes a grid smart?', MIDDLE_SCHOOL: 'What is a smart meter?', HIGH_SCHOOL: 'What is demand response?', UNDERGRADUATE: 'What is AMI?', GRADUATE: 'What is transactive energy?', PHD: 'What is distributed control?' }, options: { ELEMENTARY: ['Computers and sensors', 'Magic', 'More wires', 'Bigger poles'], MIDDLE_SCHOOL: ['A meter that sends usage data automatically', 'A smart person reading meter', 'A regular meter', 'No meter'], HIGH_SCHOOL: ['Reducing demand when grid is stressed', 'Demanding response', 'Response team', 'Demand increase'], UNDERGRADUATE: ['Advanced Metering Infrastructure', 'All Meters Inside', 'American Meter Inc', 'Auto Meter Input'], GRADUATE: ['Energy trading at the distribution level', 'Money trading', 'Trans-Atlantic energy', 'Transit energy'], PHD: ['Control spread across many devices', 'One central computer', 'No control', 'Manual control'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Smart grids use computers and sensors to manage electricity more efficiently!', MIDDLE_SCHOOL: 'Smart meters measure electricity use in detail and communicate data back to the utility.', HIGH_SCHOOL: 'Demand response programs reduce electricity use during peak times to balance the grid.', UNDERGRADUATE: 'AMI includes smart meters, communications networks, and data management systems.', GRADUATE: 'Transactive energy enables distributed resources to participate in energy markets.', PHD: 'Distributed control spreads decision-making across many devices rather than centralizing.' } }] },
    externalResources: [{ title: 'Smart Grid', url: 'https://www.energy.gov/oe/smart-grid', type: 'article' }]
  },
  {
    id: 'renewable-microgrid',
    slug: 'microgrids',
    title: 'Microgrids and Resilience',
    description: {
      ELEMENTARY: 'Learn about tiny power grids that can work even when the big grid goes down!',
      MIDDLE_SCHOOL: 'Discover how microgrids provide backup power and energy independence.',
      HIGH_SCHOOL: 'Explore microgrid design, islanding capability, and resilience applications.',
      UNDERGRADUATE: 'Analyze microgrid economics, control systems, and business models.',
      GRADUATE: 'Examine microgrid policy, utility integration, and community microgrid development.',
      PHD: 'Research microgrid optimization, networked microgrids, and resilience quantification.'
    },
    topic: 'renewable-energy',
    category: 'RESILIENCE',
    icon: 'Shield',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-mg-1', title: 'Small but Mighty', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Mini Power Grids!</h2><p>A microgrid is a small power system that can keep the lights on even when the big grid has problems.</p>', MIDDLE_SCHOOL: '<h2>What is a Microgrid?</h2><p>Microgrids are local energy systems with generation and storage that can operate independently from the main grid.</p>', HIGH_SCHOOL: '<h2>Microgrid Components</h2><p>Generation sources, energy storage, loads, and smart controllers that manage islanding and reconnection.</p>', UNDERGRADUATE: '<h2>Microgrid Economics</h2><p>Value streams including resilience, demand charge reduction, and energy arbitrage.</p>', GRADUATE: '<h2>Community Microgrids</h2><p>Serving multiple customers, regulatory challenges, and ownership models.</p>', PHD: '<h2>Research Frontiers</h2><p>Networked microgrids, hierarchical control, and resilience valuation.</p>' } }],
    activities: [{ id: 're-mg-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Microgrid!', MIDDLE_SCHOOL: 'Island Mode', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Economics Model', GRADUATE: 'Community Plan', PHD: 'Network Optimization' }, description: { ELEMENTARY: 'Create a small power system!', MIDDLE_SCHOOL: 'Practice operating in island mode.', HIGH_SCHOOL: 'Design a microgrid system.', UNDERGRADUATE: 'Model microgrid economics.', GRADUATE: 'Plan a community microgrid.', PHD: 'Optimize networked microgrids.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-mg-game', type: 'simulation', title: 'Microgrid Manager', description: 'Keep the power on during emergencies!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-mg-quiz', passingScore: 80, questions: [{ id: 'rmgq1', question: { ELEMENTARY: 'What can a microgrid do that regular power cant?', MIDDLE_SCHOOL: 'What is islanding?', HIGH_SCHOOL: 'What makes microgrids resilient?', UNDERGRADUATE: 'What is demand charge reduction?', GRADUATE: 'What is a community microgrid?', PHD: 'What are networked microgrids?' }, options: { ELEMENTARY: ['Keep working when big grid fails', 'Nothing special', 'Use more power', 'Cost more'], MIDDLE_SCHOOL: ['Operating independently from the main grid', 'Being on an island', 'Using island power', 'Disconnecting forever'], HIGH_SCHOOL: ['Local generation and storage with smart control', 'Just batteries', 'Only solar', 'Nothing special'], UNDERGRADUATE: ['Lowering peak demand charges with storage', 'Charging more', 'Demanding charges', 'No reduction'], GRADUATE: ['Microgrid serving multiple buildings or customers', 'Small community', 'No community', 'Single building only'], PHD: ['Multiple microgrids coordinating together', 'Regular networks', 'No networks', 'Single microgrids only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Microgrids can keep power on for important buildings even when the big grid has problems!', MIDDLE_SCHOOL: 'Islanding is when a microgrid disconnects from the main grid and operates independently.', HIGH_SCHOOL: 'Local generation, storage, and intelligent control let microgrids provide power during outages.', UNDERGRADUATE: 'Demand charge reduction uses storage to lower peak demand, reducing utility demand charges.', GRADUATE: 'Community microgrids serve multiple customers, requiring special regulatory arrangements.', PHD: 'Networked microgrids coordinate multiple systems for enhanced resilience and efficiency.' } }] },
    externalResources: [{ title: 'Microgrids', url: 'https://www.energy.gov/oe/microgrids', type: 'article' }]
  },
  {
    id: 'renewable-biomass',
    slug: 'biomass-biofuels',
    title: 'Biomass and Biofuels',
    description: {
      ELEMENTARY: 'Learn how plants and waste can become fuel for energy!',
      MIDDLE_SCHOOL: 'Discover how organic materials are converted to energy and fuel.',
      HIGH_SCHOOL: 'Explore biomass conversion technologies, biofuel production, and sustainability.',
      UNDERGRADUATE: 'Analyze biomass feedstocks, conversion pathways, and lifecycle impacts.',
      GRADUATE: 'Examine bioenergy policy, advanced biofuels, and carbon accounting.',
      PHD: 'Research bioenergy systems modeling, land use, and climate mitigation potential.'
    },
    topic: 'renewable-energy',
    category: 'BIOMASS',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-bio-1', title: 'Plants to Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy from Plants!</h2><p>We can make electricity and fuel from plants, food waste, and even garbage!</p>', MIDDLE_SCHOOL: '<h2>Biomass Energy</h2><p>Organic materials like wood, crops, and waste can be burned or converted to make electricity and fuels.</p>', HIGH_SCHOOL: '<h2>Conversion Technologies</h2><p>Combustion, gasification, pyrolysis, and anaerobic digestion convert biomass to useful energy.</p>', UNDERGRADUATE: '<h2>Biofuel Production</h2><p>Ethanol, biodiesel, and advanced biofuels from various feedstocks with different sustainability profiles.</p>', GRADUATE: '<h2>Carbon Accounting</h2><p>Biogenic carbon, indirect land use change, and lifecycle GHG emissions.</p>', PHD: '<h2>Research Frontiers</h2><p>Advanced conversion, algae biofuels, and bioenergy with carbon capture (BECCS).</p>' } }],
    activities: [{ id: 're-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Trash to Energy!', MIDDLE_SCHOOL: 'Biogas Plant', HIGH_SCHOOL: 'Conversion Process', UNDERGRADUATE: 'Feedstock Analysis', GRADUATE: 'Carbon Lifecycle', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Turn waste into energy!', MIDDLE_SCHOOL: 'Build a biogas digester.', HIGH_SCHOOL: 'Design a conversion process.', UNDERGRADUATE: 'Analyze biofuel feedstocks.', GRADUATE: 'Calculate lifecycle emissions.', PHD: 'Model bioenergy systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-bio-game', type: 'simulation', title: 'Bioenergy Producer', description: 'Convert organic materials to clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-bio-quiz', passingScore: 80, questions: [{ id: 'rbioq1', question: { ELEMENTARY: 'What can become biofuel?', MIDDLE_SCHOOL: 'What is biogas?', HIGH_SCHOOL: 'What is pyrolysis?', UNDERGRADUATE: 'What is indirect land use change?', GRADUATE: 'What is BECCS?', PHD: 'What limits bioenergy potential?' }, options: { ELEMENTARY: ['Plants and food waste', 'Rocks', 'Water', 'Metal'], MIDDLE_SCHOOL: ['Gas from decomposing organic matter', 'Regular natural gas', 'Air', 'Steam'], HIGH_SCHOOL: ['Heating biomass without oxygen', 'Burning with fire', 'Freezing', 'Adding water'], UNDERGRADUATE: ['Emissions from land converted elsewhere due to biofuel crops', 'Direct land change', 'No land change', 'Land improvement'], GRADUATE: ['Bioenergy with Carbon Capture and Storage', 'Big Energy Carbon Capture', 'Biomass Energy Climate Control', 'No such thing'], PHD: ['Land availability, water, and competition with food', 'Unlimited potential', 'No limits', 'Only cost'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Plants, food waste, and other organic materials can be turned into biofuels!', MIDDLE_SCHOOL: 'Biogas is produced when organic matter decomposes without oxygen, mainly methane and CO2.', HIGH_SCHOOL: 'Pyrolysis heats biomass without oxygen to produce bio-oil, syngas, and biochar.', UNDERGRADUATE: 'ILUC occurs when biofuel crops displace food crops, causing conversion of land elsewhere.', GRADUATE: 'BECCS combines bioenergy with carbon capture to potentially achieve negative emissions.', PHD: 'Sustainable bioenergy is constrained by land, water, biodiversity, and food security.' } }] },
    externalResources: [{ title: 'Bioenergy', url: 'https://www.energy.gov/eere/bioenergy/bioenergy-basics', type: 'article' }]
  },
  {
    id: 'renewable-electrification',
    slug: 'building-electrification',
    title: 'Building Electrification',
    description: {
      ELEMENTARY: 'Learn how buildings can use electricity instead of gas for heating and cooking!',
      MIDDLE_SCHOOL: 'Discover how electric heat pumps and appliances replace fossil fuels in buildings.',
      HIGH_SCHOOL: 'Explore building electrification technology, economics, and decarbonization impact.',
      UNDERGRADUATE: 'Analyze heat pump technology, retrofit strategies, and grid impacts.',
      GRADUATE: 'Examine electrification policy, gas utility transition, and equity considerations.',
      PHD: 'Research electrification pathways, load flexibility, and system optimization.'
    },
    topic: 'renewable-energy',
    category: 'BUILDINGS',
    icon: 'Home',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-elec-1', title: 'All-Electric Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>No More Gas!</h2><p>Buildings can use electricity for everything - heating, cooling, cooking, and hot water - instead of burning gas!</p>', MIDDLE_SCHOOL: '<h2>Heat Pumps</h2><p>Heat pumps move heat instead of making it, using electricity much more efficiently than gas furnaces.</p>', HIGH_SCHOOL: '<h2>Electrification Benefits</h2><p>Eliminating on-site combustion improves air quality and enables decarbonization as the grid cleans up.</p>', UNDERGRADUATE: '<h2>Technology Options</h2><p>Air-source and ground-source heat pumps, heat pump water heaters, and induction cooking.</p>', GRADUATE: '<h2>Policy and Transition</h2><p>Building codes, gas ban policies, stranded assets, and workforce transition.</p>', PHD: '<h2>Research Frontiers</h2><p>Cold climate performance, load flexibility, and coordinated electrification planning.</p>' } }],
    activities: [{ id: 're-elec-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Go All-Electric!', MIDDLE_SCHOOL: 'Heat Pump Design', HIGH_SCHOOL: 'Retrofit Planning', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Policy Design', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Switch a home to all-electric!', MIDDLE_SCHOOL: 'Design a heat pump system.', HIGH_SCHOOL: 'Plan a building electrification retrofit.', UNDERGRADUATE: 'Size electrification equipment.', GRADUATE: 'Design electrification policy.', PHD: 'Model electrification system impacts.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-elec-game', type: 'simulation', title: 'Electrification Expert', description: 'Convert buildings from gas to electric!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-elec-quiz', passingScore: 80, questions: [{ id: 'relecq1', question: { ELEMENTARY: 'What can replace gas in buildings?', MIDDLE_SCHOOL: 'How do heat pumps work?', HIGH_SCHOOL: 'Why is electrification better for air?', UNDERGRADUATE: 'What is COP?', GRADUATE: 'What are stranded assets?', PHD: 'What is load flexibility?' }, options: { ELEMENTARY: ['Electricity', 'More gas', 'Coal', 'Oil'], MIDDLE_SCHOOL: ['Move heat instead of making it', 'Burn fuel', 'Use magic', 'Create cold'], HIGH_SCHOOL: ['No combustion means no local pollution', 'More smoke', 'Same air quality', 'Worse air'], UNDERGRADUATE: ['Coefficient of Performance - heat output vs electricity input', 'Cost of Production', 'Center of Power', 'Cooling Only Period'], GRADUATE: ['Investments that lose value in transition', 'Floating assets', 'Moving assets', 'Strong assets'], PHD: ['Ability to shift electricity demand timing', 'Flexible loads', 'No flexibility', 'Only generation flexibility'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electricity can replace gas for heating, cooking, and hot water in buildings!', MIDDLE_SCHOOL: 'Heat pumps move heat from outside to inside (or reverse) instead of burning fuel.', HIGH_SCHOOL: 'Electrification eliminates on-site combustion, removing local air pollution from buildings.', UNDERGRADUATE: 'COP measures how much heat a heat pump delivers per unit of electricity consumed.', GRADUATE: 'Stranded assets are gas infrastructure investments that lose value as buildings electrify.', PHD: 'Load flexibility allows electrified loads to shift in time to match renewable generation.' } }] },
    externalResources: [{ title: 'Building Electrification', url: 'https://rmi.org/our-work/buildings/', type: 'research' }]
  },
  {
    id: 'renewable-ocean',
    slug: 'ocean-energy',
    title: 'Ocean Energy',
    description: {
      ELEMENTARY: 'Learn how ocean waves and tides can make electricity!',
      MIDDLE_SCHOOL: 'Discover technologies that capture energy from waves, tides, and ocean heat.',
      HIGH_SCHOOL: 'Explore wave, tidal, and ocean thermal energy conversion technologies.',
      UNDERGRADUATE: 'Analyze ocean energy resources, device design, and project development.',
      GRADUATE: 'Examine marine energy policy, environmental assessment, and grid integration.',
      PHD: 'Research advanced marine energy systems, arrays, and resource characterization.'
    },
    topic: 'renewable-energy',
    category: 'OCEAN',
    icon: 'Waves',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-ocean-1', title: 'Power from the Sea', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Wave Power!</h2><p>The ocean is always moving with waves and tides. We can capture that motion and turn it into electricity!</p>', MIDDLE_SCHOOL: '<h2>Ocean Energy Sources</h2><p>Waves, tides, currents, and temperature differences in the ocean all contain energy we can harness.</p>', HIGH_SCHOOL: '<h2>Technology Types</h2><p>Wave energy converters, tidal stream turbines, tidal barrages, and ocean thermal energy conversion (OTEC).</p>', UNDERGRADUATE: '<h2>Device Engineering</h2><p>Point absorbers, oscillating water columns, tidal turbines, and the challenge of surviving harsh marine environments.</p>', GRADUATE: '<h2>Project Development</h2><p>Resource assessment, environmental permitting, grid connection, and marine spatial planning.</p>', PHD: '<h2>Research Frontiers</h2><p>Array optimization, advanced materials, wave-structure interaction, and hybrid marine renewable systems.</p>' } }],
    activities: [{ id: 're-ocean-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Catch the Waves!', MIDDLE_SCHOOL: 'Tidal Power', HIGH_SCHOOL: 'Device Design', UNDERGRADUATE: 'Resource Assessment', GRADUATE: 'Project Planning', PHD: 'Array Optimization' }, description: { ELEMENTARY: 'Capture wave energy!', MIDDLE_SCHOOL: 'Generate power from tides.', HIGH_SCHOOL: 'Design a wave energy device.', UNDERGRADUATE: 'Assess ocean energy resources.', GRADUATE: 'Plan a marine energy project.', PHD: 'Optimize device arrays.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ocean-game', type: 'simulation', title: 'Ocean Energy Engineer', description: 'Harness the power of the sea!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ocean-quiz', passingScore: 80, questions: [{ id: 'roceanq1', question: { ELEMENTARY: 'What ocean motion makes energy?', MIDDLE_SCHOOL: 'What causes tides?', HIGH_SCHOOL: 'What is OTEC?', UNDERGRADUATE: 'What is a point absorber?', GRADUATE: 'What is marine spatial planning?', PHD: 'What is array interaction?' }, options: { ELEMENTARY: ['Waves and tides', 'Nothing', 'Fish swimming', 'Boats only'], MIDDLE_SCHOOL: ['Moon and sun gravity', 'Wind only', 'Fish', 'Earth spinning only'], HIGH_SCHOOL: ['Ocean Thermal Energy Conversion', 'Ocean Total Energy Capture', 'Ocean Tidal Energy Control', 'No such thing'], UNDERGRADUATE: ['Floating buoy that bobs with waves', 'Fixed point', 'Absorbing water', 'Shore device'], GRADUATE: ['Coordinating ocean use including energy', 'Space planning', 'Marine maps only', 'No planning'], PHD: ['How devices in arrays affect each others performance', 'No interaction', 'Single devices only', 'Random effects'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Ocean waves and tides carry energy that we can capture to make electricity!', MIDDLE_SCHOOL: 'Tides are caused by the gravitational pull of the moon and sun on Earths water.', HIGH_SCHOOL: 'OTEC uses temperature differences between warm surface and cold deep water to generate power.', UNDERGRADUATE: 'Point absorbers are floating devices that move with waves to drive generators.', GRADUATE: 'Marine spatial planning coordinates energy, fishing, shipping, and conservation in ocean areas.', PHD: 'Array interaction studies how wakes and wave absorption between devices affect overall performance.' } }] },
    externalResources: [{ title: 'Marine Energy', url: 'https://www.energy.gov/eere/water/marine-energy-basics', type: 'research' }]
  },
  {
    id: 'renewable-hydrogen',
    slug: 'green-hydrogen',
    title: 'Green Hydrogen',
    description: {
      ELEMENTARY: 'Learn about hydrogen - a clean fuel made from water and renewable energy!',
      MIDDLE_SCHOOL: 'Discover how renewable electricity can make hydrogen for clean fuel.',
      HIGH_SCHOOL: 'Explore electrolysis, hydrogen storage, and fuel cell applications.',
      UNDERGRADUATE: 'Analyze green hydrogen production, economics, and infrastructure requirements.',
      GRADUATE: 'Examine hydrogen policy, sector coupling, and role in decarbonization.',
      PHD: 'Research hydrogen systems integration, advanced electrolysis, and global trade.'
    },
    topic: 'renewable-energy',
    category: 'HYDROGEN',
    icon: 'Atom',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-h2-1', title: 'Hydrogen Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clean Hydrogen!</h2><p>We can split water into hydrogen using electricity from wind and solar. The hydrogen becomes clean fuel!</p>', MIDDLE_SCHOOL: '<h2>Making Green Hydrogen</h2><p>Electrolyzers use renewable electricity to split water into hydrogen and oxygen. The hydrogen can power vehicles or make heat.</p>', HIGH_SCHOOL: '<h2>Hydrogen Value Chain</h2><p>Production via electrolysis, storage (compressed, liquid, or carriers), transport, and end uses in industry and transport.</p>', UNDERGRADUATE: '<h2>Electrolyzer Technology</h2><p>Alkaline, PEM, and solid oxide electrolyzers with different characteristics and applications.</p>', GRADUATE: '<h2>Sector Coupling</h2><p>Using hydrogen to connect electricity, heat, and transport sectors for flexible decarbonization.</p>', PHD: '<h2>Research Frontiers</h2><p>High-efficiency electrolysis, hydrogen carriers, and global hydrogen trade systems.</p>' } }],
    activities: [{ id: 're-h2-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make Hydrogen!', MIDDLE_SCHOOL: 'Electrolyzer', HIGH_SCHOOL: 'Value Chain', UNDERGRADUATE: 'System Design', GRADUATE: 'Sector Analysis', PHD: 'Trade Modeling' }, description: { ELEMENTARY: 'Split water into hydrogen!', MIDDLE_SCHOOL: 'Run an electrolyzer.', HIGH_SCHOOL: 'Design a hydrogen value chain.', UNDERGRADUATE: 'Design a hydrogen system.', GRADUATE: 'Analyze sector coupling.', PHD: 'Model hydrogen trade.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-h2-game', type: 'simulation', title: 'Hydrogen Economy Builder', description: 'Build a clean hydrogen future!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-h2-quiz', passingScore: 80, questions: [{ id: 'rh2q1', question: { ELEMENTARY: 'How do we make green hydrogen?', MIDDLE_SCHOOL: 'What is an electrolyzer?', HIGH_SCHOOL: 'Why is storage a challenge?', UNDERGRADUATE: 'What is PEM electrolysis?', GRADUATE: 'What is sector coupling?', PHD: 'What are hydrogen carriers?' }, options: { ELEMENTARY: ['Split water with renewable electricity', 'From oil', 'From coal', 'It grows naturally'], MIDDLE_SCHOOL: ['Device that splits water using electricity', 'Electricity maker', 'Water heater', 'Battery'], HIGH_SCHOOL: ['Hydrogen is light and hard to store densely', 'Easy storage', 'No challenges', 'Heavy gas'], UNDERGRADUATE: ['Proton Exchange Membrane electrolysis', 'Power Energy Module', 'Perfect Energy Maker', 'No such thing'], GRADUATE: ['Connecting electricity, heat, and transport via hydrogen', 'Single sector', 'No coupling', 'Random connection'], PHD: ['Molecules that carry hydrogen more easily than pure H2', 'Hydrogen trucks', 'No carriers needed', 'Only pipelines'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green hydrogen is made by using wind or solar electricity to split water into hydrogen and oxygen!', MIDDLE_SCHOOL: 'An electrolyzer uses electricity to split water (H2O) into hydrogen (H2) and oxygen (O2).', HIGH_SCHOOL: 'Hydrogen has low density, requiring compression, liquefaction, or chemical bonding for practical storage.', UNDERGRADUATE: 'PEM electrolyzers use a solid polymer membrane and can respond quickly to variable renewable input.', GRADUATE: 'Sector coupling uses hydrogen to link electricity, heat, and transport for flexible clean energy systems.', PHD: 'Hydrogen carriers like ammonia or liquid organic carriers enable easier storage and transport.' } }] },
    externalResources: [{ title: 'Green Hydrogen', url: 'https://www.irena.org/Energy-Transition/Technology/Hydrogen', type: 'research' }]
  },
  {
    id: 'renewable-policy',
    slug: 'energy-policy-regulation',
    title: 'Energy Policy and Regulation',
    description: {
      ELEMENTARY: 'Learn how rules and laws help clean energy grow!',
      MIDDLE_SCHOOL: 'Discover policies that support renewable energy development.',
      HIGH_SCHOOL: 'Explore renewable portfolio standards, tax credits, and grid regulations.',
      UNDERGRADUATE: 'Analyze energy policy instruments, regulatory structures, and market design.',
      GRADUATE: 'Examine energy governance, utility regulation, and policy effectiveness.',
      PHD: 'Research energy policy processes, political economy, and transition governance.'
    },
    topic: 'renewable-energy',
    category: 'POLICY',
    icon: 'FileText',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-pol-1', title: 'Rules for Clean Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Helpful Rules!</h2><p>Governments make rules to help people build more wind turbines and solar panels!</p>', MIDDLE_SCHOOL: '<h2>Energy Policies</h2><p>Tax credits, renewable requirements, and net metering are policies that help clean energy grow.</p>', HIGH_SCHOOL: '<h2>Policy Instruments</h2><p>Renewable portfolio standards, feed-in tariffs, auction systems, and tax incentives each work differently.</p>', UNDERGRADUATE: '<h2>Regulatory Structures</h2><p>Federal vs state jurisdiction, utility commission roles, and grid operator responsibilities.</p>', GRADUATE: '<h2>Policy Effectiveness</h2><p>Evaluating policy outcomes, cost-effectiveness, and unintended consequences.</p>', PHD: '<h2>Research Frontiers</h2><p>Policy process analysis, interest group dynamics, and designing effective energy transitions.</p>' } }],
    activities: [{ id: 're-pol-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Make Good Rules!', MIDDLE_SCHOOL: 'Policy Choice', HIGH_SCHOOL: 'Instrument Design', UNDERGRADUATE: 'Regulatory Analysis', GRADUATE: 'Policy Evaluation', PHD: 'Process Analysis' }, description: { ELEMENTARY: 'Create rules to help clean energy!', MIDDLE_SCHOOL: 'Choose policies to boost renewables.', HIGH_SCHOOL: 'Design a policy instrument.', UNDERGRADUATE: 'Analyze regulatory structures.', GRADUATE: 'Evaluate policy effectiveness.', PHD: 'Analyze policy processes.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 're-pol-game', type: 'simulation', title: 'Energy Policy Maker', description: 'Design policies for clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-pol-quiz', passingScore: 80, questions: [{ id: 'rpolq1', question: { ELEMENTARY: 'What do energy rules do?', MIDDLE_SCHOOL: 'What is a tax credit?', HIGH_SCHOOL: 'What is a renewable portfolio standard?', UNDERGRADUATE: 'What does a utility commission do?', GRADUATE: 'How do you evaluate policy?', PHD: 'What is policy process analysis?' }, options: { ELEMENTARY: ['Help clean energy grow', 'Stop all energy', 'Nothing', 'Make energy expensive'], MIDDLE_SCHOOL: ['Reduces taxes for clean energy', 'Increases taxes', 'No effect on taxes', 'Only for oil'], HIGH_SCHOOL: ['Requires utilities to get percent of power from renewables', 'Random requirements', 'No requirements', 'Only suggestions'], UNDERGRADUATE: ['Regulates utility rates and operations', 'Nothing', 'Only builds power plants', 'Makes electricity'], GRADUATE: ['Measure outcomes against goals and costs', 'Assume it works', 'No evaluation needed', 'Random assessment'], PHD: ['Studying how policies are made and changed', 'Only outcomes', 'No process matters', 'Random politics'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy rules help people build more wind turbines and solar panels!', MIDDLE_SCHOOL: 'Tax credits reduce the taxes people pay when they invest in clean energy.', HIGH_SCHOOL: 'RPS requires utilities to source a percentage of electricity from renewable sources.', UNDERGRADUATE: 'Utility commissions regulate rates, approve investments, and oversee utility operations.', GRADUATE: 'Policy evaluation compares outcomes to goals, assesses cost-effectiveness, and identifies improvements.', PHD: 'Policy process analysis examines how interests, institutions, and ideas shape policy outcomes.' } }] },
    externalResources: [{ title: 'Clean Energy Policy', url: 'https://www.nrel.gov/analysis/policy.html', type: 'research' }]
  },
  {
    id: 'renewable-access',
    slug: 'energy-access-equity',
    title: 'Energy Access and Equity',
    description: {
      ELEMENTARY: 'Learn how everyone should be able to have clean, affordable energy!',
      MIDDLE_SCHOOL: 'Discover why some people lack access to electricity and clean cooking.',
      HIGH_SCHOOL: 'Explore energy poverty, off-grid solutions, and just transition principles.',
      UNDERGRADUATE: 'Analyze energy access metrics, delivery models, and financing mechanisms.',
      GRADUATE: 'Examine energy justice, procedural equity, and community energy.',
      PHD: 'Research energy access pathways, distributional impacts, and inclusive transitions.'
    },
    topic: 'renewable-energy',
    category: 'EQUITY',
    icon: 'Users',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-access-1', title: 'Energy for All', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Everyone Needs Energy!</h2><p>Everyone should be able to turn on lights, cook food, and stay warm - thats energy access!</p>', MIDDLE_SCHOOL: '<h2>Energy Poverty</h2><p>Billions of people lack electricity or clean cooking fuels. This affects health, education, and economic opportunity.</p>', HIGH_SCHOOL: '<h2>Access Solutions</h2><p>Mini-grids, solar home systems, and clean cookstoves bring energy to underserved communities.</p>', UNDERGRADUATE: '<h2>Delivery Models</h2><p>Pay-as-you-go, community ownership, and utility extension each have different strengths.</p>', GRADUATE: '<h2>Energy Justice</h2><p>Distributional, procedural, and recognition justice in energy systems and transitions.</p>', PHD: '<h2>Research Frontiers</h2><p>Multi-dimensional energy poverty, leapfrogging, and socio-technical transitions.</p>' } }],
    activities: [{ id: 're-access-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Light Every Home!', MIDDLE_SCHOOL: 'Access Planning', HIGH_SCHOOL: 'Solution Design', UNDERGRADUATE: 'Model Analysis', GRADUATE: 'Justice Framework', PHD: 'Pathway Analysis' }, description: { ELEMENTARY: 'Bring energy to everyone!', MIDDLE_SCHOOL: 'Plan energy access expansion.', HIGH_SCHOOL: 'Design an access solution.', UNDERGRADUATE: 'Analyze delivery models.', GRADUATE: 'Apply energy justice frameworks.', PHD: 'Analyze access pathways.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 're-access-game', type: 'simulation', title: 'Energy Access Champion', description: 'Bring clean energy to all communities!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-access-quiz', passingScore: 80, questions: [{ id: 'raccessq1', question: { ELEMENTARY: 'What is energy access?', MIDDLE_SCHOOL: 'What is energy poverty?', HIGH_SCHOOL: 'What is a mini-grid?', UNDERGRADUATE: 'What is pay-as-you-go?', GRADUATE: 'What is procedural justice?', PHD: 'What is energy leapfrogging?' }, options: { ELEMENTARY: ['Everyone having electricity and clean cooking', 'Only rich people having power', 'No energy anywhere', 'Energy passwords'], MIDDLE_SCHOOL: ['Lacking adequate energy for basic needs', 'Having too much energy', 'Energy being free', 'No poverty exists'], HIGH_SCHOOL: ['Small local grid serving a community', 'Tiny grid for one house', 'National grid', 'No grid'], UNDERGRADUATE: ['Paying for energy services incrementally', 'Paying all at once', 'Free energy', 'No payment'], GRADUATE: ['Fair participation in energy decision-making', 'Only outcomes matter', 'No procedures', 'Random decisions'], PHD: ['Skipping fossil fuels straight to renewables', 'Following the same path', 'Jumping over energy', 'No development'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy access means everyone can turn on lights, cook safely, and stay comfortable!', MIDDLE_SCHOOL: 'Energy poverty means not having enough electricity or clean cooking fuel for basic needs.', HIGH_SCHOOL: 'Mini-grids are small local electricity networks, often solar-powered, serving off-grid communities.', UNDERGRADUATE: 'Pay-as-you-go lets customers pay small amounts via mobile money for solar home system services.', GRADUATE: 'Procedural justice ensures fair participation in energy planning and decision-making processes.', PHD: 'Leapfrogging means developing countries adopting renewables directly, skipping fossil fuel stages.' } }] },
    externalResources: [{ title: 'Energy Access', url: 'https://www.seforall.org/', type: 'research' }]
  },
  {
    id: 'renewable-finance',
    slug: 'clean-energy-finance',
    title: 'Clean Energy Finance',
    description: {
      ELEMENTARY: 'Learn how money helps build wind farms and solar panels!',
      MIDDLE_SCHOOL: 'Discover how clean energy projects get funded and built.',
      HIGH_SCHOOL: 'Explore project finance, green bonds, and investment in renewable energy.',
      UNDERGRADUATE: 'Analyze clean energy financing structures, risk allocation, and investor types.',
      GRADUATE: 'Examine sustainable finance, climate risk disclosure, and transition finance.',
      PHD: 'Research financial system transformation, stranded assets, and climate finance architecture.'
    },
    topic: 'renewable-energy',
    category: 'FINANCE',
    icon: 'DollarSign',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-fin-1', title: 'Money for Clean Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Building Clean Energy!</h2><p>Wind farms and solar plants cost money to build. Banks and investors provide money to build them!</p>', MIDDLE_SCHOOL: '<h2>Energy Finance</h2><p>Clean energy projects need investors who expect to earn returns from selling electricity.</p>', HIGH_SCHOOL: '<h2>Finance Basics</h2><p>Project finance, equity, debt, and power purchase agreements structure clean energy investments.</p>', UNDERGRADUATE: '<h2>Financial Structures</h2><p>Tax equity, yieldcos, green bonds, and infrastructure funds each play different roles.</p>', GRADUATE: '<h2>Sustainable Finance</h2><p>ESG investing, climate disclosure, and aligning financial systems with climate goals.</p>', PHD: '<h2>Research Frontiers</h2><p>Transition finance, climate risk modeling, and financial system transformation.</p>' } }],
    activities: [{ id: 're-fin-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fund a Solar Farm!', MIDDLE_SCHOOL: 'Investment Plan', HIGH_SCHOOL: 'Deal Structure', UNDERGRADUATE: 'Financial Model', GRADUATE: 'Portfolio Analysis', PHD: 'System Transformation' }, description: { ELEMENTARY: 'Get money to build solar!', MIDDLE_SCHOOL: 'Plan a clean energy investment.', HIGH_SCHOOL: 'Structure a project deal.', UNDERGRADUATE: 'Build a financial model.', GRADUATE: 'Analyze sustainable portfolios.', PHD: 'Model financial system change.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-fin-game', type: 'simulation', title: 'Clean Energy Investor', description: 'Finance the clean energy transition!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-fin-quiz', passingScore: 80, questions: [{ id: 'rfinq1', question: { ELEMENTARY: 'Who pays to build wind farms?', MIDDLE_SCHOOL: 'What do investors want?', HIGH_SCHOOL: 'What is a green bond?', UNDERGRADUATE: 'What is tax equity?', GRADUATE: 'What is ESG investing?', PHD: 'What are stranded assets in finance?' }, options: { ELEMENTARY: ['Banks and investors', 'Nobody', 'The wind', 'Free to build'], MIDDLE_SCHOOL: ['Returns from selling electricity', 'Nothing', 'Just helping', 'Free energy'], HIGH_SCHOOL: ['Bond financing specifically for green projects', 'Green colored money', 'Plant bonds', 'No such thing'], UNDERGRADUATE: ['Investment that monetizes tax credits', 'Tax on equity', 'Equity taxes', 'No taxes'], GRADUATE: ['Investing considering environmental, social, governance factors', 'Only profit', 'No standards', 'Random investing'], PHD: ['Fossil fuel assets losing value due to transition', 'Strong assets', 'Growing assets', 'No such thing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Banks and investors provide money to build wind farms and solar plants!', MIDDLE_SCHOOL: 'Investors put money into clean energy expecting to earn returns when electricity is sold.', HIGH_SCHOOL: 'Green bonds raise money specifically for environmental projects like renewable energy.', UNDERGRADUATE: 'Tax equity allows investors to monetize renewable energy tax credits they can use.', GRADUATE: 'ESG investing considers environmental, social, and governance factors alongside financial returns.', PHD: 'Stranded assets are fossil fuel investments that may lose value as the energy transition accelerates.' } }] },
    externalResources: [{ title: 'Clean Energy Finance', url: 'https://www.iea.org/topics/financing-clean-energy-transitions', type: 'research' }]
  },
  {
    id: 'renewable-storage',
    slug: 'energy-storage-technologies',
    title: 'Energy Storage Technologies',
    description: {
      ELEMENTARY: 'Learn how we save energy for when we need it later!',
      MIDDLE_SCHOOL: 'Discover batteries and other ways to store renewable energy.',
      HIGH_SCHOOL: 'Explore battery technologies, pumped hydro, and emerging storage solutions.',
      UNDERGRADUATE: 'Analyze storage technologies, applications, economics, and grid services.',
      GRADUATE: 'Examine storage policy, market design, and system integration strategies.',
      PHD: 'Research advanced storage materials, optimal deployment, and long-duration storage.'
    },
    topic: 'renewable-energy',
    category: 'STORAGE',
    icon: 'Battery',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-stor-1', title: 'Saving Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Batteries!</h2><p>We can save solar energy during the day to use at night using big batteries!</p>', MIDDLE_SCHOOL: '<h2>Storage Solutions</h2><p>Batteries, pumped hydro, and other technologies store energy when its abundant for use when needed.</p>', HIGH_SCHOOL: '<h2>Technology Options</h2><p>Lithium-ion batteries, flow batteries, pumped hydro, compressed air, and thermal storage.</p>', UNDERGRADUATE: '<h2>Storage Applications</h2><p>Frequency regulation, peak shaving, renewable integration, and backup power.</p>', GRADUATE: '<h2>Market Design</h2><p>Valuing storage services, market rules, and policy support for deployment.</p>', PHD: '<h2>Research Frontiers</h2><p>Next-generation batteries, long-duration storage, and optimal system design.</p>' } }],
    activities: [{ id: 're-stor-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Charge the Battery!', MIDDLE_SCHOOL: 'Storage Selection', HIGH_SCHOOL: 'Technology Compare', UNDERGRADUATE: 'Application Analysis', GRADUATE: 'Market Design', PHD: 'Optimization Model' }, description: { ELEMENTARY: 'Save energy in batteries!', MIDDLE_SCHOOL: 'Choose storage technologies.', HIGH_SCHOOL: 'Compare storage options.', UNDERGRADUATE: 'Analyze storage applications.', GRADUATE: 'Design storage markets.', PHD: 'Model storage optimization.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-stor-game', type: 'simulation', title: 'Storage Master', description: 'Deploy energy storage wisely!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-stor-quiz', passingScore: 80, questions: [{ id: 'rstorq1', question: { ELEMENTARY: 'Why store energy?', MIDDLE_SCHOOL: 'What is pumped hydro?', HIGH_SCHOOL: 'What is a flow battery?', UNDERGRADUATE: 'What is peak shaving?', GRADUATE: 'What is storage arbitrage?', PHD: 'What is long-duration storage?' }, options: { ELEMENTARY: ['To use it when we need it later', 'No reason', 'Energy cannot be stored', 'Just for fun'], MIDDLE_SCHOOL: ['Pumping water uphill to store energy', 'Pumping water fast', 'Hydro electricity only', 'No such thing'], HIGH_SCHOOL: ['Battery storing energy in liquid chemicals', 'Water flow battery', 'Flowing electricity', 'No such battery'], UNDERGRADUATE: ['Reducing demand peaks with stored energy', 'Shaving batteries', 'Peak climbing', 'No such thing'], GRADUATE: ['Buying cheap and selling expensive', 'Random trading', 'No value', 'Only buying'], PHD: ['Storage for days to seasons', 'Short storage', 'No long storage needed', 'Same as short'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We store energy so we can use solar power at night or wind power when its calm!', MIDDLE_SCHOOL: 'Pumped hydro pumps water uphill when power is cheap and releases it to generate electricity when needed.', HIGH_SCHOOL: 'Flow batteries store energy in liquid electrolytes, allowing independent scaling of power and energy.', UNDERGRADUATE: 'Peak shaving uses stored energy during high-demand periods to reduce peak power costs.', GRADUATE: 'Storage arbitrage profits from buying electricity when cheap and selling when expensive.', PHD: 'Long-duration storage addresses seasonal variations and extended low-generation periods.' } }] },
    externalResources: [{ title: 'Energy Storage', url: 'https://www.energy.gov/oe/energy-storage', type: 'research' }]
  },
  {
    id: 'renewable-distributed',
    slug: 'distributed-energy-resources',
    title: 'Distributed Energy Resources',
    description: {
      ELEMENTARY: 'Learn how homes and businesses can make their own clean energy!',
      MIDDLE_SCHOOL: 'Discover rooftop solar, home batteries, and local energy systems.',
      HIGH_SCHOOL: 'Explore distributed generation, demand response, and virtual power plants.',
      UNDERGRADUATE: 'Analyze DER economics, interconnection, and grid integration challenges.',
      GRADUATE: 'Examine DER policy, utility business models, and distribution system planning.',
      PHD: 'Research DER optimization, transactive energy, and grid architecture transformation.'
    },
    topic: 'renewable-energy',
    category: 'DISTRIBUTED',
    icon: 'Home',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-dist-1', title: 'Local Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy at Home!</h2><p>People can put solar panels on their roofs and even batteries in their garages to make their own clean energy!</p>', MIDDLE_SCHOOL: '<h2>Distributed Energy</h2><p>Rooftop solar, home batteries, and smart thermostats let homes and businesses manage their own energy.</p>', HIGH_SCHOOL: '<h2>DER Systems</h2><p>Solar, storage, EVs, and demand response working together as distributed energy resources.</p>', UNDERGRADUATE: '<h2>Grid Integration</h2><p>Interconnection standards, net metering, and managing two-way power flows.</p>', GRADUATE: '<h2>Policy and Business Models</h2><p>Rate design, utility transformation, and compensating DER value.</p>', PHD: '<h2>Research Frontiers</h2><p>Transactive energy, grid architecture, and DER coordination.</p>' } }],
    activities: [{ id: 're-dist-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Power Your Home!', MIDDLE_SCHOOL: 'DER Installation', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Integration Analysis', GRADUATE: 'Policy Design', PHD: 'Architecture Research' }, description: { ELEMENTARY: 'Make energy at home!', MIDDLE_SCHOOL: 'Install distributed energy.', HIGH_SCHOOL: 'Design a DER system.', UNDERGRADUATE: 'Analyze grid integration.', GRADUATE: 'Design DER policy.', PHD: 'Research grid architecture.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-dist-game', type: 'simulation', title: 'DER Manager', description: 'Build a distributed energy network!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-dist-quiz', passingScore: 80, questions: [{ id: 'rdistq1', question: { ELEMENTARY: 'What is distributed energy?', MIDDLE_SCHOOL: 'What is net metering?', HIGH_SCHOOL: 'What is a virtual power plant?', UNDERGRADUATE: 'What is interconnection?', GRADUATE: 'What is rate design?', PHD: 'What is transactive energy?' }, options: { ELEMENTARY: ['Energy made at homes and buildings', 'Only big power plants', 'No such thing', 'Distributed water'], MIDDLE_SCHOOL: ['Crediting solar owners for excess power', 'Counting meters', 'Net fishing', 'No such thing'], HIGH_SCHOOL: ['Many distributed resources working as one', 'Fake power plant', 'Virtual reality', 'No such concept'], UNDERGRADUATE: ['Connecting generation to the grid', 'Internet connection', 'Social connection', 'No connection'], GRADUATE: ['Setting electricity prices and structures', 'Rating electricity', 'Design rates', 'No design'], PHD: ['Market-based coordination of energy resources', 'Energy transactions only', 'No transactions', 'Active trading'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Distributed energy is electricity made at homes and buildings instead of big power plants!', MIDDLE_SCHOOL: 'Net metering credits solar owners for excess power they send to the grid.', HIGH_SCHOOL: 'A virtual power plant coordinates many distributed resources to act like a single power plant.', UNDERGRADUATE: 'Interconnection is the technical process of safely connecting generation to the grid.', GRADUATE: 'Rate design sets how electricity is priced to recover costs and send economic signals.', PHD: 'Transactive energy uses market signals to coordinate distributed energy resources in real time.' } }] },
    externalResources: [{ title: 'Distributed Energy', url: 'https://www.nrel.gov/grid/distributed-solar.html', type: 'research' }]
  },
  {
    id: 'renewable-transition',
    slug: 'energy-transition-masterclass',
    title: 'Energy Transition: Masterclass',
    description: {
      ELEMENTARY: 'Imagine a world powered completely by clean energy!',
      MIDDLE_SCHOOL: 'Explore the path to a 100% renewable energy future.',
      HIGH_SCHOOL: 'Examine energy transition scenarios, challenges, and opportunities.',
      UNDERGRADUATE: 'Analyze transition pathways, system integration, and sectoral decarbonization.',
      GRADUATE: 'Examine transition governance, just transitions, and accelerating change.',
      PHD: 'Research transition theory, socio-technical change, and transformation pathways.'
    },
    topic: 'renewable-energy',
    category: 'TRANSITION',
    icon: 'Rocket',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: true,
    accreditation: {
      courseTitle: 'Renewable Energy Module',
      courseDescription: 'This module provides a rigorous examination of renewable energy topics within the broader context of the global energy transition. Students analyze technical fundamentals, system design principles, economic evaluation methodologies, and policy frameworks governing deployment. The curriculum integrates quantitative analysis with applied projects, preparing learners for professional competency in sustainable energy systems.',
      learningObjectives: [
        'Analyze the fundamental principles and technologies underlying this energy topic',
        'Evaluate system performance using industry-standard metrics and quantitative methods',
        'Apply design principles to real-world scenarios with technical and economic constraints',
        'Synthesize environmental, social, and policy considerations in technology assessment',
        'Assess emerging technologies and their readiness for commercial deployment',
        'Design a project proposal integrating technical, economic, and regulatory analysis'
      ],
      creditHours: 0.5,
      totalLearningHours: 7.5,
      prerequisites: ['College-level science or engineering coursework', 'Basic quantitative reasoning'],
      assessmentFramework: {
        formativeAssessments: [
          'Reflection prompt: Analyze tradeoffs between competing approaches in this domain',
          'Scenario question: Apply quantitative methods to a real-world design problem',
          'Mini-project: Conduct a preliminary assessment using industry tools and data'
        ],
        summativeAssessments: [
          'Module exam: 10-question assessment covering technical fundamentals and applied analysis',
          'Applied deliverable: Professional-quality technical report or design document'
        ],
        passingThreshold: 70,
        proctoringRequirement: 'Module exam requires identity-verified proctoring via integrated assessment platform'
      },
      finalProject: {
        title: 'Applied Analysis and Design Project',
        description: 'Complete a professional-quality analysis or design project applying module concepts to a real-world scenario.',
        deliverables: [
          'Technical assessment with data-driven analysis',
          'System design or policy recommendation document',
          'Economic evaluation with sensitivity analysis',
          'Environmental and social impact considerations',
          'Professional presentation with data visualizations'
        ],
        rubricCriteria: [
          'Technical accuracy and depth of analysis (25%)',
          'Rigor of quantitative methodology (20%)',
          'Quality of economic or policy evaluation (25%)',
          'Professional presentation and communication (15%)',
          'Integration of sustainability considerations (15%)'
        ]
      },
      accreditationNotes: {
        aceReadiness: 'Content depth equivalent to upper-division undergraduate coursework in energy engineering or environmental science. Quantitative rigor and applied projects consistent with ABET-accredited program expectations.',
        identityVerification: 'Learner identity verified through platform authentication with photo ID matching at enrollment and proctored exam sessions.',
        regularSubstantiveInteraction: 'Asynchronous discussion forums with SME moderation. Automated feedback on simulation activities. Optional synchronous office hours with qualified instructors.',
        smeRecommendations: [
          'Subject matter expert with industry or academic credentials in renewable energy',
          'Professional engineer or certified practitioner for applied content review',
          'Faculty member for academic rigor and assessment alignment'
        ]
      },
      academicLevel: 'upper-division',
      discipline: 'Environmental Science / Energy Engineering',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    },
    lessons: [{ id: 're-trans-1', title: 'Clean Energy Future', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>A Clean Energy World!</h2><p>One day all our energy could come from sun, wind, and water - no more pollution!</p>', MIDDLE_SCHOOL: '<h2>Energy Transition</h2><p>The shift from fossil fuels to renewables is the biggest change in energy since the industrial revolution.</p>', HIGH_SCHOOL: '<h2>Transition Challenges</h2><p>Intermittency, infrastructure, costs, and incumbent interests create transition challenges.</p>', UNDERGRADUATE: '<h2>Transition Pathways</h2><p>Modeling shows multiple paths to decarbonization across electricity, heat, and transport.</p>', GRADUATE: '<h2>Just Transition</h2><p>Ensuring fairness for workers and communities affected by energy system change.</p>', PHD: '<h2>Research Frontiers</h2><p>Socio-technical transitions, regime change, and accelerating transformation.</p>' } }],
    activities: [{ id: 're-trans-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Design the Future!', MIDDLE_SCHOOL: 'Transition Path', HIGH_SCHOOL: 'Scenario Analysis', UNDERGRADUATE: 'Pathway Modeling', GRADUATE: 'Just Transition', PHD: 'Transformation Research' }, description: { ELEMENTARY: 'Design a clean energy world!', MIDDLE_SCHOOL: 'Plan the energy transition.', HIGH_SCHOOL: 'Analyze transition scenarios.', UNDERGRADUATE: 'Model transition pathways.', GRADUATE: 'Design just transitions.', PHD: 'Research transformation.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 're-trans-game', type: 'simulation', title: 'Transition Leader', description: 'Guide the clean energy transition!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-trans-quiz', passingScore: 80, questions: [{ id: 'rtransq1', question: { ELEMENTARY: 'What is the energy transition?', MIDDLE_SCHOOL: 'Why transition to renewables?', HIGH_SCHOOL: 'What is intermittency?', UNDERGRADUATE: 'What is sectoral decarbonization?', GRADUATE: 'What is a just transition?', PHD: 'What is socio-technical transition?' }, options: { ELEMENTARY: ['Changing from dirty to clean energy', 'No change', 'More fossil fuels', 'Less energy'], MIDDLE_SCHOOL: ['Stop climate change and pollution', 'No reason', 'Fossil fuels are better', 'Just for fun'], HIGH_SCHOOL: ['Variable power from sun and wind', 'Constant power', 'No variation', 'Only at night'], UNDERGRADUATE: ['Eliminating emissions sector by sector', 'One sector only', 'No sectors', 'Random reduction'], GRADUATE: ['Fair transition for affected workers and communities', 'Unjust change', 'Fast change only', 'No fairness'], PHD: ['Linked changes in technology and society', 'Only technology', 'Only society', 'No connection'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The energy transition is changing from dirty fossil fuels to clean renewable energy!', MIDDLE_SCHOOL: 'We transition to renewables to stop climate change and air pollution from fossil fuels.', HIGH_SCHOOL: 'Intermittency means solar and wind power vary with weather rather than producing constantly.', UNDERGRADUATE: 'Sectoral decarbonization eliminates emissions across electricity, industry, buildings, and transport.', GRADUATE: 'Just transition ensures workers and communities affected by change receive support and opportunity.', PHD: 'Socio-technical transitions involve interconnected changes in technology, institutions, and behavior.' } }] },
    externalResources: [{ title: 'Energy Transition', url: 'https://www.irena.org/Energy-Transition', type: 'research' }]
  }
]
