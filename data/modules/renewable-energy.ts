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
        { id: 'rwq2', question: { ELEMENTARY: 'What is inside the big box on top of a wind turbine?', MIDDLE_SCHOOL: 'What is the nacelle of a wind turbine?', HIGH_SCHOOL: 'What are the main components inside a wind turbine nacelle?', UNDERGRADUATE: 'How does a doubly-fed induction generator (DFIG) differ from a permanent magnet synchronous generator (PMSG)?', GRADUATE: 'What are the trade-offs between DFIG and direct-drive PMSG architectures in terms of reliability and cost?', PHD: 'How do superconducting generators address scaling limits of conventional PMSG designs for 20+ MW turbines?' }, options: { ELEMENTARY: ['A generator that makes electricity', 'A bedroom for birds', 'A water tank', 'A big speaker'], MIDDLE_SCHOOL: ['The housing containing the generator and gearbox', 'The blade tip', 'The tower base', 'The foundation'], HIGH_SCHOOL: ['Generator, gearbox, yaw system, brake, and controller', 'Only a generator', 'Batteries and solar panels', 'Hydraulic pumps only'], UNDERGRADUATE: ['DFIG uses partial converter with gearbox; PMSG uses full converter, often gearless', 'They are identical in function', 'DFIG is always direct-drive', 'PMSG requires a gearbox'], GRADUATE: ['DFIG: lower converter cost but gearbox maintenance; PMSG: higher reliability but heavier generator', 'DFIG is superior in all metrics', 'PMSG always costs less', 'No meaningful differences exist'], PHD: ['HTS generators reduce mass by 50-70% enabling lightweight direct-drive at extreme scale, but require cryogenic systems', 'Superconducting generators are heavier', 'They only work onshore', 'They eliminate all maintenance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The big box (nacelle) on top holds a generator that turns the spinning motion into electricity!', MIDDLE_SCHOOL: 'The nacelle sits on top of the tower and houses the generator, gearbox, and control systems.', HIGH_SCHOOL: 'The nacelle contains the drivetrain (gearbox + generator), yaw mechanism, mechanical brake, and control electronics.', UNDERGRADUATE: 'DFIG uses a partially-rated converter (~30%) with a gearbox, while PMSG typically uses a full converter and can be direct-drive, eliminating the gearbox.', GRADUATE: 'DFIG offers lower power electronics cost but gearbox failures dominate O&M; PMSG eliminates gearbox but requires larger, heavier generators and full converters.', PHD: 'High-temperature superconducting (HTS) generators achieve 50-70% mass reduction vs conventional PMSG, critical for 20+ MW designs where conventional magnet mass becomes prohibitive, at the cost of cryogenic cooling complexity.' } },
        { id: 'rwq3', question: { ELEMENTARY: 'What do we call measuring how much wind blows in a place?', MIDDLE_SCHOOL: 'How do scientists measure wind speed?', HIGH_SCHOOL: 'What instrument measures wind speed at potential turbine sites?', UNDERGRADUATE: 'What is the typical duration of a bankable wind resource assessment campaign?', GRADUATE: 'How does measure-correlate-predict (MCP) extend short-term measurements to long-term estimates?', PHD: 'What are the uncertainty components in a P90 energy yield estimate and how are they propagated?' }, options: { ELEMENTARY: ['Wind resource assessment', 'Weather watching', 'Cloud counting', 'Storm chasing'], MIDDLE_SCHOOL: ['Anemometers', 'Thermometers', 'Barometers', 'Rain gauges'], HIGH_SCHOOL: ['Met mast with anemometers at multiple heights', 'A single weather vane', 'Satellite images only', 'Wind socks'], UNDERGRADUATE: ['Minimum 12 months, preferably 2-3 years', '1 week', '1 day', '10 years minimum'], GRADUATE: ['Correlates on-site data with long-term reference stations to predict 20-year wind regime', 'Simply averages short-term data', 'Uses only satellite data', 'Relies on climate models alone'], PHD: ['Wind speed measurement, long-term adjustment, spatial extrapolation, wake model, and curtailment uncertainties combined via Monte Carlo', 'Only measurement uncertainty matters', 'Single deterministic estimate', 'P90 ignores uncertainty'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Scientists measure how much wind blows in different places to find the best spots for wind turbines!', MIDDLE_SCHOOL: 'Anemometers are special instruments that spin in the wind to measure how fast it is blowing.', HIGH_SCHOOL: 'Meteorological masts (met masts) carry anemometers at hub height and other levels to profile the wind resource.', UNDERGRADUATE: 'Bankable assessments require at least 12 months of on-site data; 2-3 years reduces long-term adjustment uncertainty significantly.', GRADUATE: 'MCP correlates concurrent on-site and reference data, then uses the long-term reference record to predict the site wind regime over the project lifetime.', PHD: 'P90 combines measurement (sensor calibration, mounting), long-term adjustment (reference quality), spatial (flow model), wake, and operational uncertainties via Monte Carlo or analytical propagation.' } },
        { id: 'rwq4', question: { ELEMENTARY: 'Can wind turbines affect birds?', MIDDLE_SCHOOL: 'What is one environmental concern about wind turbines?', HIGH_SCHOOL: 'What strategies reduce bird and bat mortality at wind farms?', UNDERGRADUATE: 'How do curtailment-based mitigation strategies balance wildlife protection with energy production?', GRADUATE: 'What role does radar-activated curtailment play in reducing raptor mortality at wind farms?', PHD: 'How do population viability analysis (PVA) models inform cumulative impact assessments for wind energy on avian species?' }, options: { ELEMENTARY: ['Yes, birds can sometimes fly into the blades', 'No, birds always avoid them', 'Wind turbines help birds fly', 'Birds live inside turbines'], MIDDLE_SCHOOL: ['Birds and bats can be harmed by spinning blades', 'Wind turbines pollute the air', 'They make the ground shake', 'They use too much water'], HIGH_SCHOOL: ['Radar detection, curtailment during migration, and careful siting', 'Paint the blades bright colors', 'Remove all nearby trees', 'Only operate at night'], UNDERGRADUATE: ['Smart curtailment during high-risk periods reduces mortality 50-80% with 1-3% energy loss', 'Curtailment always loses 50% of energy', 'No curtailment strategy works', 'Only full shutdown is effective'], GRADUATE: ['Radar detects approaching raptors and triggers temporary shutdown, reducing mortality 80%+ with minimal energy loss', 'Radar only tracks weather', 'Manual spotters are more effective', 'Radar increases bird mortality'], PHD: ['PVA models quantify population-level effects of additional mortality, distinguishing compensatory from additive mortality across cumulative wind development', 'PVA only counts dead birds', 'Population models are not applicable', 'Cumulative impacts cannot be modeled'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Birds can sometimes fly into spinning blades, so scientists study how to protect them when building wind farms.', MIDDLE_SCHOOL: 'Spinning turbine blades can harm birds and bats, so wind farms are carefully placed away from migration routes.', HIGH_SCHOOL: 'Radar detection systems, seasonal curtailment during peak migration, and avoiding critical habitats significantly reduce wildlife impacts.', UNDERGRADUATE: 'Smart curtailment during high-risk periods (low wind nights for bats, migration seasons for birds) can reduce mortality 50-80% while sacrificing only 1-3% of annual energy production.', GRADUATE: 'Radar-activated curtailment (e.g., IdentiFlight) detects approaching raptors and triggers 30-60 second shutdowns, achieving 80%+ mortality reduction with <1% annual energy loss.', PHD: 'PVA models integrate demographic parameters, density dependence, and stochasticity to determine whether wind-related mortality is additive to natural mortality, enabling science-based cumulative impact thresholds across regional development scenarios.' } },
        { id: 'rwq5', question: { ELEMENTARY: 'Can wind turbines be built in the ocean?', MIDDLE_SCHOOL: 'What is the advantage of putting wind turbines in the ocean?', HIGH_SCHOOL: 'What types of foundations are used for offshore wind turbines?', UNDERGRADUATE: 'What is the typical installed cost range for offshore wind projects?', GRADUATE: 'How do jacket and monopile foundations compare for transitional water depths (30-60m)?', PHD: 'What coupled aero-hydro-servo-elastic modeling challenges arise for floating offshore wind turbines?' }, options: { ELEMENTARY: ['Yes, they are called offshore wind turbines!', 'No, they would sink', 'Only very tiny ones', 'Only in lakes'], MIDDLE_SCHOOL: ['Ocean winds are stronger and steadier', 'Its cheaper to build there', 'Fish help spin the blades', 'Waves power the turbines'], HIGH_SCHOOL: ['Monopile, jacket, gravity base, and floating platforms', 'Only concrete blocks', 'Anchored to ships', 'Suction cups on the seabed'], UNDERGRADUATE: ['$3,000-$5,000 per kW installed', '$500 per kW', '$50,000 per kW', '$100 per kW'], GRADUATE: ['Jackets offer better fatigue life in deeper water but cost more; monopiles are simpler but reach depth limits around 40m', 'Monopiles work at any depth', 'Jackets are always cheaper', 'No difference in performance'], PHD: ['Coupling blade aerodynamics, platform hydrodynamics, mooring dynamics, and control in time domain with nonlinear wave-body interaction', 'Only aerodynamics matter', 'Steady-state analysis is sufficient', 'Floating platforms eliminate dynamic loading'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Offshore wind turbines are built in the ocean where wind blows really strong — they make lots of electricity!', MIDDLE_SCHOOL: 'Wind over the ocean blows stronger and more consistently than on land, so offshore turbines can generate more electricity.', HIGH_SCHOOL: 'Offshore foundations include monopiles (steel tubes), jackets (lattice frames), gravity bases (concrete), and floating platforms for deep water.', UNDERGRADUATE: 'Offshore wind costs $3,000-$5,000/kW installed, driven by foundation, installation vessels, and subsea cable costs, though LCOE is declining rapidly.', GRADUATE: 'Jackets distribute loads across multiple legs offering superior fatigue performance beyond 30m depth, while monopiles are simpler and cheaper but face practical limits around 40m due to steel mass and installation constraints.', PHD: 'Floating OWT requires coupled aero-hydro-servo-elastic simulation capturing blade-wake interaction, 6-DOF platform motion, nonlinear mooring restoring forces, and controller interaction with low-frequency platform modes.' } },
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
        },
        { id: 'rhq2', question: { ELEMENTARY: 'What does a dam hold back?', MIDDLE_SCHOOL: 'What is a reservoir?', HIGH_SCHOOL: 'What is the difference between run-of-river and storage hydropower?', UNDERGRADUATE: 'What is the typical capacity factor range for large hydropower plants?', GRADUATE: 'How does variable-speed pumped storage improve grid flexibility compared to fixed-speed?', PHD: 'What role does stochastic dynamic programming play in optimal reservoir operation?' }, options: { ELEMENTARY: ['Water', 'Air', 'Rocks', 'Sand'], MIDDLE_SCHOOL: ['A lake created behind a dam', 'A type of fish', 'A water filter', 'A power line'], HIGH_SCHOOL: ['Run-of-river uses natural flow; storage uses a reservoir', 'They are identical', 'Run-of-river needs a larger dam', 'Storage cannot generate electricity'], UNDERGRADUATE: ['40-60% for large plants', '10-15%', '90-95%', 'Less than 5%'], GRADUATE: ['Variable-speed allows partial-load pumping and continuous frequency regulation', 'No improvement over fixed-speed', 'Only for small installations', 'Eliminates the reservoir'], PHD: ['SDP optimizes release schedules under inflow uncertainty via Bellman equations', 'Not used in hydro', 'Only for thermal plants', 'Replaces human decisions'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Water! Dams hold back water to control its flow and make electricity.', MIDDLE_SCHOOL: 'A reservoir is a large lake created behind a dam to store water for generating electricity.', HIGH_SCHOOL: 'Run-of-river diverts part of the natural flow through turbines; storage facilities use reservoirs to control water release timing.', UNDERGRADUATE: 'Large hydro achieves 40-60% capacity factors, significantly higher than solar (15-25%) or wind (25-45%) due to dispatchability.', GRADUATE: 'Variable-speed pumped storage provides continuous frequency regulation across its operating range, unlike fixed-speed which operates at discrete power levels.', PHD: 'SDP discretizes state space (storage, inflow) and solves Bellman equations recursively to find optimal release policies under uncertain future inflows.' } },
        { id: 'rhq3', question: { ELEMENTARY: 'How does water make electricity?', MIDDLE_SCHOOL: 'What is a hydroelectric turbine?', HIGH_SCHOOL: 'What is hydraulic head in hydropower?', UNDERGRADUATE: 'How is hydropower output calculated?', GRADUATE: 'What are the environmental trade-offs of large dam construction?', PHD: 'How do coupled hydrological-reservoir models inform climate adaptation for hydropower?' }, options: { ELEMENTARY: ['Water flows through turbines that spin generators', 'Magic', 'Wind pushes the water', 'Solar panels on water'], MIDDLE_SCHOOL: ['A machine that converts water flow to electricity', 'A boat engine', 'A water pump', 'A measuring device'], HIGH_SCHOOL: ['The vertical distance water falls', 'The width of the river', 'The water temperature', 'The current speed only'], UNDERGRADUATE: ['P = rho × g × Q × h × efficiency', 'P = voltage × current only', 'P = dam height × width', 'P = water temperature × volume'], GRADUATE: ['Habitat fragmentation and altered flow vs low-carbon baseload and flood control', 'No trade-offs exist', 'Only positive effects', 'Only fish are affected'], PHD: ['Integrated GCM-watershed-reservoir models assess yield under future precipitation scenarios', 'Climate models are irrelevant', 'Only historical data matters', 'Reservoirs eliminate climate risk'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Water flows through big spinning machines called turbines, which are connected to generators that make electricity!', MIDDLE_SCHOOL: 'A hydroelectric turbine is a spinning machine inside a dam that converts flowing water energy into electrical energy.', HIGH_SCHOOL: 'Hydraulic head is the vertical distance between the water surface and the turbine, determining the potential energy available for conversion.', UNDERGRADUATE: 'Power output P = ρgQhη where ρ is water density, g is gravity, Q is flow rate, h is net head, and η is overall efficiency (typically 85-93%).', GRADUATE: 'Large dams provide low-carbon baseload power and flood control but cause habitat fragmentation, sediment trapping, and altered downstream flow regimes.', PHD: 'Coupled models integrate GCM projections with watershed hydrology and reservoir operations to assess yield reliability under changing precipitation and temperature regimes.' } },
        { id: 'rhq4', question: { ELEMENTARY: 'Can rivers without dams make electricity?', MIDDLE_SCHOOL: 'What is run-of-river hydropower?', HIGH_SCHOOL: 'How does a Francis turbine differ from a Kaplan?', UNDERGRADUATE: 'What are the main energy losses in hydropower systems?', GRADUATE: 'How does sedimentation affect long-term reservoir performance?', PHD: 'What methodologies quantify water-energy nexus trade-offs in multi-purpose reservoirs?' }, options: { ELEMENTARY: ['Yes, with run-of-river systems!', 'No, always need a dam', 'Only very fast rivers', 'Only oceans'], MIDDLE_SCHOOL: ['Hydro using natural river flow without a large dam', 'Running by a river', 'River water for drinking', 'A river race'], HIGH_SCHOOL: ['Francis has fixed blades for medium head; Kaplan has adjustable for low head', 'They are identical', 'Francis is for tidal only', 'Kaplan needs higher head'], UNDERGRADUATE: ['Penstock friction, turbine losses, generator losses, and transformer losses', 'No losses occur', 'Only generator losses', 'Losses always exceed 50%'], GRADUATE: ['Reduces storage capacity, increases turbine abrasion, alters downstream geomorphology', 'No effect', 'Improves turbine performance', 'Only affects year one'], PHD: ['Multi-objective Pareto optimization balancing generation, irrigation, environmental flows, and flood control', 'Simple cost-benefit only', 'Water and energy are independent', 'Cannot be quantified'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Run-of-river systems use the natural flow of a river to spin turbines without needing a big dam.', MIDDLE_SCHOOL: 'Run-of-river hydropower uses the natural flow of a river with little or no water storage to generate electricity.', HIGH_SCHOOL: 'Francis turbines have fixed guide vanes for medium head (10-300m); Kaplan turbines have adjustable blades optimized for low head (2-40m) with variable flow.', UNDERGRADUATE: 'Losses include penstock friction (2-5%), turbine hydraulic losses (5-10%), generator losses (2-3%), and transformer losses (1-2%), yielding overall efficiency of 80-93%.', GRADUATE: 'Sedimentation reduces live storage capacity by 0.5-2% annually, accelerates turbine runner erosion, and traps nutrients that alter downstream ecology over decades.', PHD: 'Multi-objective optimization frameworks generate Pareto frontiers revealing trade-offs between hydropower generation, irrigation supply, environmental flows, and flood control under uncertain future conditions.' } },
        { id: 'rhq5', question: { ELEMENTARY: 'What is the biggest hydropower dam?', MIDDLE_SCHOOL: 'How much world electricity comes from hydro?', HIGH_SCHOOL: 'What is pumped-storage hydropower?', UNDERGRADUATE: 'What is the round-trip efficiency of modern pumped-storage?', GRADUATE: 'How do closed-loop pumped storage systems differ from open-loop environmentally?', PHD: 'What challenges exist for underground pumped hydro in abandoned mines?' }, options: { ELEMENTARY: ['The Three Gorges Dam in China', 'Hoover Dam', 'Niagara Falls', 'Panama Canal'], MIDDLE_SCHOOL: ['About 16% of global electricity', 'About 1%', 'About 75%', 'About 50%'], HIGH_SCHOOL: ['Water pumped uphill to store energy, released to generate at peak demand', 'A pump storing water underground', 'A water filter type', 'Pumping to cool plants'], UNDERGRADUATE: ['75-82% for modern variable-speed systems', '30-40%', '95-99%', '50-55%'], GRADUATE: ['Closed-loop avoids river disruption using off-stream reservoirs', 'No difference', 'Open-loop is always better', 'Closed-loop needs more water'], PHD: ['Variable head, geological stability, high-pressure waterways, and underground ventilation', 'No challenges', 'Only cost matters', 'Mines are always suitable'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The Three Gorges Dam in China is the biggest — it can power millions of homes!', MIDDLE_SCHOOL: 'About 16% of all electricity worldwide comes from hydropower, making it the largest renewable source.', HIGH_SCHOOL: 'Pumped-storage pumps water uphill when electricity is cheap, then releases it through turbines during peak demand periods.', UNDERGRADUATE: 'Modern variable-speed pumped storage achieves 75-82% round-trip efficiency, with ternary units reaching up to 82%.', GRADUATE: 'Closed-loop systems use artificial off-stream reservoirs avoiding aquatic habitat disruption, while open-loop connects to rivers affecting flow regimes and aquatic connectivity.', PHD: 'Underground PSH faces variable head conditions as water levels change, requires geologically stable caverns, high-pressure waterway lining, and ventilation for compressed air management in sealed chambers.' } },
        { id: 'rhq6', question: { ELEMENTARY: 'Do fish have trouble with dams?', MIDDLE_SCHOOL: 'What are fish ladders?', HIGH_SCHOOL: 'What monitoring is required for hydropower licensing?', UNDERGRADUATE: 'How do modern fish passage technologies balance generation with ecology?', GRADUATE: 'What is eDNA monitoring for assessing hydropower biodiversity impacts?', PHD: 'How do downstream fish passage survival models inform turbine design?' }, options: { ELEMENTARY: ['Yes, dams block fish from swimming upstream', 'No, fish jump over dams', 'Fish prefer dams', 'Dams help fish swim'], MIDDLE_SCHOOL: ['Stepped pools helping fish travel past dams', 'Devices to catch fish', 'Water depth meters', 'Water cleaners'], HIGH_SCHOOL: ['Flow monitoring, fish surveys, water quality, and sediment analysis', 'None required', 'Only temperature', 'Only during construction'], UNDERGRADUATE: ['Sensor-equipped passages with real-time gate optimization minimize spill while maximizing passage', 'Fish passage eliminates generation', 'Technology cannot help', 'Only barriers work'], GRADUATE: ['eDNA metabarcoding detects species from water samples for non-invasive biodiversity assessment', 'Not applicable to aquatic systems', 'Only visual surveys work', 'Replaces all monitoring'], PHD: ['CFD blade strike zones, pressure profiles, and predation rates optimize runner geometry for fish safety', 'Only strike probability matters', 'Barotrauma is negligible', 'Models are unused'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes — dams can block fish like salmon from swimming upstream to lay their eggs. Fish ladders help them get past!', MIDDLE_SCHOOL: 'Fish ladders are a series of stepped pools that help fish travel past dams so they can continue their migration.', HIGH_SCHOOL: 'Hydropower licensing requires continuous flow monitoring, periodic fish population surveys, water quality testing, and sediment transport analysis.', UNDERGRADUATE: 'Sensor-equipped fish passages with real-time monitoring optimize gate operations to maximize passage efficiency while minimizing generation losses from spill.', GRADUATE: 'eDNA metabarcoding detects species presence from water samples, enabling cost-effective, non-invasive assessment of aquatic biodiversity changes upstream and downstream.', PHD: 'Integrated models combine CFD-predicted blade strike zones, pressure change profiles, and post-passage predation rates to optimize turbine runner geometry for fish-friendly operation.' } },
        { id: 'rhq7', question: { ELEMENTARY: 'Which country uses the most hydropower?', MIDDLE_SCHOOL: 'What is a micro-hydro system?', HIGH_SCHOOL: 'How does hydropower help grid stability?', UNDERGRADUATE: 'What factors determine small hydropower economic viability?', GRADUATE: 'How do cascading hydropower systems optimize water use across a basin?', PHD: 'What are implications of non-stationary hydrology for hydropower risk assessment?' }, options: { ELEMENTARY: ['China, then Brazil', 'United States', 'Australia', 'Japan'], MIDDLE_SCHOOL: ['A small system powering a village or farm', 'A tiny dam for ants', 'A water microscope', 'A mini pool'], HIGH_SCHOOL: ['Provides fast-ramping generation and frequency regulation', 'Cannot help stability', 'Only baseload power', 'By storing electricity'], UNDERGRADUATE: ['Available flow, head, civil works cost, grid distance, and PPA terms', 'Only river size', 'Cost never matters', 'Only subsidies'], GRADUATE: ['Coordinates upstream releases to maximize downstream generation with travel time accounting', 'Cascade systems are independent', 'Upstream doesnt affect downstream', 'Only largest plant matters'], PHD: ['Requires abandoning stationarity assumption, demanding adaptive design and scenario-based planning', 'History always predicts future', 'Climate doesnt affect hydrology', 'Design is fixed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'China uses the most hydropower in the world, followed by Brazil with its huge rivers and dams!', MIDDLE_SCHOOL: 'A micro-hydro system is a small hydropower setup (under 100 kW) that can power a village or farm using a nearby stream.', HIGH_SCHOOL: 'Hydropower provides fast-ramping dispatchable generation and frequency regulation due to turbine response times of seconds.', UNDERGRADUATE: 'Viability depends on available flow, hydraulic head, civil works cost, grid connection distance, regulatory requirements, and PPA pricing.', GRADUATE: 'Cascade optimization coordinates release schedules from upstream to downstream, accounting for water travel times and storage constraints to maximize system-wide generation.', PHD: 'Non-stationary hydrology means historical flow statistics may not represent future conditions, requiring adaptive design margins and scenario-based infrastructure planning under climate uncertainty.' } },
        { id: 'rhq8', question: { ELEMENTARY: 'Is hydropower renewable?', MIDDLE_SCHOOL: 'What is tidal energy?', HIGH_SCHOOL: 'How does drought affect hydropower?', UNDERGRADUATE: 'What is the LCOE for large hydropower?', GRADUATE: 'How do real-time hydrological forecasts optimize hydro dispatch in markets?', PHD: 'What methods address dimensionality in multi-reservoir optimization?' }, options: { ELEMENTARY: ['Yes, the water cycle keeps it going!', 'No, water runs out', 'Only sometimes', 'Only in rainy places'], MIDDLE_SCHOOL: ['Energy from the rise and fall of ocean tides', 'Energy from river waves', 'Wind over water', 'Solar on boats'], HIGH_SCHOOL: ['Reduced water flow directly decreases generation capacity', 'Drought has no effect', 'Generation increases', 'Only small plants affected'], UNDERGRADUATE: ['$30-60/MWh, competitive with wind and solar', '$200-300/MWh', '$1-5/MWh', 'Always the most expensive'], GRADUATE: ['Ensemble weather forecasts drive inflow predictions enabling profit-maximizing market bidding', 'Forecasting is not useful', 'Only historical averages used', 'Markets dont affect dispatch'], PHD: ['Approximate DP, sampling methods, and reinforcement learning decompose large state-action spaces', 'Dimensionality is solved', 'Only linear programming', 'Multi-reservoir optimization is impossible'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Hydropower is renewable because the water cycle keeps rivers flowing with rain and snowmelt.', MIDDLE_SCHOOL: 'Tidal energy captures the rise and fall of ocean tides to generate electricity using underwater turbines.', HIGH_SCHOOL: 'Drought reduces water inflow to reservoirs, directly decreasing the available flow for generation and cutting energy output.', UNDERGRADUATE: 'Large hydro LCOE ranges $30-60/MWh depending on site, competitive with onshore wind ($25-50) and utility solar ($25-45).', GRADUATE: 'Ensemble weather forecasts drive hydrological models predicting inflows 1-14 days ahead, enabling profit-maximizing bidding in day-ahead and balancing markets.', PHD: 'Approximate dynamic programming, sampling-based methods, and reinforcement learning decompose large state-action spaces into tractable subproblems for real-time multi-reservoir management.' } },
        { id: 'rhq9', question: { ELEMENTARY: 'Can hydropower help prevent floods?', MIDDLE_SCHOOL: 'What is dam safety monitoring?', HIGH_SCHOOL: 'How does climate change affect hydropower potential?', UNDERGRADUATE: 'What role does hydropower play in integrating variable renewables?', GRADUATE: 'How do multi-purpose dam rules balance competing demands under climate uncertainty?', PHD: 'What are frontier challenges in fish-friendly turbine design?' }, options: { ELEMENTARY: ['Yes, dams hold back extra storm water', 'No, dams cause floods', 'Only small floods', 'Nothing to do with floods'], MIDDLE_SCHOOL: ['Measuring a dams health and water levels to keep people safe', 'Watching fish', 'Cleaning the dam', 'Testing water taste'], HIGH_SCHOOL: ['Changing rainfall alters river flows and seasonal generation profiles', 'No effect on hydro', 'Only increases generation', 'Only wind is affected'], UNDERGRADUATE: ['Fast-ramping dispatchable generation that compensates for solar and wind variability', 'Competes with renewables', 'Cannot integrate', 'Only baseload'], GRADUATE: ['Robust optimization with adaptive rule curves adjusting to evolving climate projections', 'Rules never change', 'Uncertainty cannot be managed', 'Single-purpose is sufficient'], PHD: ['Minimum gap runners and bio-inspired blades must achieve under 2% mortality while maintaining 90%+ efficiency', 'Fish-friendly turbines impossible', 'Efficiency must be sacrificed', 'Only screens protect fish'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Dams can hold back extra water during big storms, protecting towns and farms downstream from flooding.', MIDDLE_SCHOOL: 'Dam safety monitoring uses instruments to measure water levels, dam movement, and seepage to keep everyone safe.', HIGH_SCHOOL: 'Climate change alters precipitation patterns and glacier melt, shifting seasonal flow profiles and affecting both water availability and generation timing.', UNDERGRADUATE: 'Hydropower provides fast-ramping dispatchable generation that compensates for solar and wind intermittency, effectively functioning as a grid-scale battery.', GRADUATE: 'Robust optimization and adaptive management frameworks enable dynamic rule curves that adjust to evolving climate projections while balancing irrigation, environmental flows, and flood control.', PHD: 'Minimum gap runner designs and bio-inspired blade geometries must simultaneously achieve fish mortality below 2% and maintain hydraulic efficiency above 90% — an active research frontier.' } },
        { id: 'rhq10', question: { ELEMENTARY: 'What is the oldest way humans used water power?', MIDDLE_SCHOOL: 'How efficient are modern hydro turbines?', HIGH_SCHOOL: 'What are the main hydropower turbine types?', UNDERGRADUATE: 'How do degassing systems address dissolved gas supersaturation below dams?', GRADUATE: 'What emerging technologies expand hydropower without new large dams?', PHD: 'How do LCA frameworks compare hydropower carbon footprints across reservoir types?' }, options: { ELEMENTARY: ['Water wheels, used for thousands of years', 'Nuclear power', 'Solar panels', 'Wind turbines'], MIDDLE_SCHOOL: ['Over 90% efficient at converting water energy', 'About 10%', 'About 50%', 'About 25%'], HIGH_SCHOOL: ['Pelton for high head, Francis for medium, Kaplan for low head', 'Only one type', 'All identical', 'Type doesnt matter'], UNDERGRADUATE: ['Aerating weirs and turbine venting reduce dissolved nitrogen causing fish gas bubble disease', 'Degassing is unnecessary', 'Only affects taste', 'Chemical treatment used'], GRADUATE: ['In-conduit hydro, hydrokinetic turbines, and modular dam retrofits add capacity at existing infrastructure', 'No new tech exists', 'Only large dams work', 'Hydro has reached its limit'], PHD: ['LCA accounts for construction, reservoir GHG flux, and avoided emissions — tropical reservoirs have higher intensity than boreal', 'All hydro is carbon-free', 'LCA not applicable', 'Reservoir type doesnt matter'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Water wheels! People have used flowing water to grind grain and do work for thousands of years.', MIDDLE_SCHOOL: 'Modern hydropower turbines are over 90% efficient — among the most efficient power generation technologies in the world.', HIGH_SCHOOL: 'The three main types are Pelton (high head, impulse), Francis (medium head, reaction), and Kaplan (low head, propeller with adjustable blades).', UNDERGRADUATE: 'Aerating weirs and turbine venting inject atmospheric air downstream to reduce dissolved gas supersaturation that causes gas bubble disease in fish.', GRADUATE: 'In-conduit hydropower in water supply pipes, hydrokinetic turbines in rivers, and modular turbine retrofits at existing dams expand capacity without new impoundments.', PHD: 'LCA must account for construction emissions, reservoir GHG flux (CO2 and CH4 from organic decomposition), with tropical reservoirs showing 10-100x higher carbon intensity than boreal or run-of-river systems.' } }
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
          UNDERGRADUATE: `<div class="lesson-content">
<h2>Geothermal Energy Systems: Resource Engineering, Power Conversion, and Direct-Use Applications</h2>

<p>Geothermal energy provides approximately 15.9 GW of installed electricity generation capacity worldwide, with a remarkable capacity factor exceeding 90%—making it one of the most reliable baseload renewable resources available. The United States leads with approximately 3.7 GW of installed capacity, primarily concentrated at The Geysers in California, the world's largest geothermal complex.</p>

<h3>Geothermal Resource Classification</h3>

<p>Geothermal resources are classified by reservoir temperature, which determines the appropriate conversion technology:</p>

<table class="technical-table">
<thead>
<tr><th>Resource Class</th><th>Temperature Range</th><th>Enthalpy Classification</th><th>Conversion Technology</th><th>Primary Applications</th></tr>
</thead>
<tbody>
<tr><td>High-enthalpy</td><td>>220 C</td><td>High</td><td>Flash steam, dry steam</td><td>Electricity generation</td></tr>
<tr><td>Medium-enthalpy</td><td>150-220 C</td><td>Medium</td><td>Flash or binary cycle</td><td>Electricity, combined heat-power</td></tr>
<tr><td>Low-enthalpy</td><td>90-150 C</td><td>Low</td><td>Binary cycle (ORC)</td><td>Electricity, direct use</td></tr>
<tr><td>Very low-enthalpy</td><td><90 C</td><td>Very low</td><td>Heat exchangers, heat pumps</td><td>District heating, aquaculture</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-geo-undergrad-q1">
<p>"Geothermal energy provides continuous, weather-independent baseload power with capacity factors of 90-95%, higher than any other renewable energy technology. A single geothermal well can produce 5-10 MW of electricity for 30+ years with proper reservoir management."</p>
<cite>— U.S. Department of Energy, Geothermal Technologies Office, GeoVision Report, 2019</cite>
</blockquote>

<h3>Power Plant Technologies</h3>

<h4>Dry Steam Plants</h4>
<p>The simplest configuration, used where the reservoir produces dry steam directly (rare, e.g., The Geysers, Larderello). Steam flows directly to the turbine, achieving conversion efficiencies of 50-70% of theoretical Carnot efficiency.</p>

<h4>Flash Steam Plants</h4>
<p>The most common type globally. High-pressure geothermal brine is flashed to steam in a separator vessel:</p>
<ul>
<li><strong>Single-flash:</strong> One-stage separation; suitable for resources >180 C; 10-15% of brine mass converts to steam</li>
<li><strong>Double-flash:</strong> Two-stage separation captures additional energy from remaining brine; 15-25% higher output than single-flash</li>
<li><strong>Typical efficiency:</strong> 10-18% thermal-to-electric conversion (limited by moderate source temperatures)</li>
</ul>

<h4>Binary Cycle Plants (ORC/Kalina)</h4>
<p>The key technology for expanding geothermal to lower-temperature resources:</p>
<ul>
<li><strong>Working fluids:</strong> Isobutane, isopentane, or ammonia-water mixtures (Kalina cycle)</li>
<li><strong>Temperature range:</strong> 100-180 C resource temperatures</li>
<li><strong>Efficiency:</strong> 8-13% thermal-to-electric (lower temperatures limit Carnot efficiency)</li>
<li><strong>Environmental advantage:</strong> Closed-loop system with zero emissions and full reinjection</li>
</ul>

<div class="image-placeholder" data-caption="Schematic comparison of dry steam, flash steam, and binary cycle geothermal power plants">
[Image: Three-panel diagram showing the flow paths and key components of each geothermal plant type]
</div>

<h3>Enhanced Geothermal Systems (EGS)</h3>

<p>EGS technology extends geothermal potential to regions lacking natural hydrothermal reservoirs by engineering permeability in hot dry rock:</p>

<blockquote class="scavenger-quote" data-quote-id="re-geo-undergrad-q2">
<p>"Enhanced Geothermal Systems represent a transformative technology that could increase U.S. geothermal potential from 3.7 GW to over 100 GW by accessing the vast thermal energy stored in hot dry rock formations across the western states and beyond."</p>
<cite>— Stanford Geothermal Workshop Proceedings, "EGS Development Pathways," 2023</cite>
</blockquote>

<h4>EGS Engineering Process</h4>
<ul>
<li><strong>Site characterization:</strong> Temperature gradient drilling, stress field measurement, and rock mechanics testing</li>
<li><strong>Stimulation design:</strong> Hydraulic fracturing or hydroshearing to create permeable fracture networks at 3-6 km depth</li>
<li><strong>Reservoir creation:</strong> Circulating fluid between injection and production wells through engineered fracture network</li>
<li><strong>Monitoring:</strong> Microseismic arrays, distributed temperature sensing (DTS), and tracer testing to characterize flow paths</li>
<li><strong>Thermal management:</strong> Optimizing extraction rates to prevent premature thermal drawdown over 20-30 year project life</li>
</ul>

<h3>Heat Flow Measurements and Well Logging</h3>

<p>Resource assessment relies on subsurface temperature data:</p>

<code>Q = k × dT/dz</code>

<p>Where Q is heat flow (mW/m2), k is thermal conductivity (W/m-K), and dT/dz is the geothermal gradient (C/km). Average continental heat flow is ~65 mW/m2; geothermal development targets areas exceeding 80-100 mW/m2.</p>

<h3>Direct-Use Applications</h3>

<table class="technical-table">
<thead>
<tr><th>Application</th><th>Temperature Range</th><th>Installed Capacity (Global)</th><th>Efficiency</th></tr>
</thead>
<tbody>
<tr><td>District heating</td><td>60-120 C</td><td>~12 GWth</td><td>80-95% thermal</td></tr>
<tr><td>Greenhouse heating</td><td>40-100 C</td><td>~4 GWth</td><td>70-85% thermal</td></tr>
<tr><td>Aquaculture</td><td>20-45 C</td><td>~1 GWth</td><td>60-80% thermal</td></tr>
<tr><td>Industrial process heat</td><td>100-200 C</td><td>~3 GWth</td><td>50-80% thermal</td></tr>
</tbody>
</table>

<h3>Ground-Source Heat Pumps vs. Deep Geothermal</h3>

<ul>
<li><strong>Ground-source heat pumps (GSHP):</strong> Exploit shallow earth temperature (10-20 C at 2-100m depth); COP of 3-5; applicable virtually everywhere; residential and commercial scale</li>
<li><strong>Deep geothermal:</strong> Access high-temperature resources (>150 C at 1-5 km depth); limited to geologically favorable regions; utility-scale power generation</li>
<li><strong>Medium-depth systems:</strong> Emerging category (300-2000m depth, 40-90 C); suitable for district heating without power generation</li>
</ul>

<h3>LCOE and Drilling Cost Analysis</h3>

<blockquote class="scavenger-quote" data-quote-id="re-geo-undergrad-q3">
<p>"Drilling accounts for 30-50% of total geothermal project costs, with deep wells (>3 km) costing $5-20 million each. Reducing drilling costs through advanced technologies is the single most impactful pathway to making geothermal competitive across broader resource grades."</p>
<cite>— Geothermal Energy Association, Annual U.S. and Global Geothermal Power Production Report, 2023</cite>
</blockquote>

<table class="technical-table">
<thead>
<tr><th>Cost Component</th><th>Conventional Hydrothermal</th><th>Enhanced Geothermal (EGS)</th></tr>
</thead>
<tbody>
<tr><td>Exploration and confirmation</td><td>$5-15M</td><td>$10-30M</td></tr>
<tr><td>Well drilling (per well)</td><td>$3-8M</td><td>$5-20M</td></tr>
<tr><td>Power plant construction</td><td>$1500-2500/kW</td><td>$2000-4000/kW</td></tr>
<tr><td>LCOE range</td><td>$40-80/MWh</td><td>$80-150/MWh (current)</td></tr>
<tr><td>Capacity factor</td><td>90-95%</td><td>80-90% (target)</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Geothermal energy is unique among renewables for providing continuous, weather-independent baseload power with minimal land footprint and near-zero operational emissions. The primary engineering challenge is subsurface uncertainty—resource characterization requires expensive drilling, and reservoir performance cannot be fully predicted from surface data alone. EGS technology has the potential to transform geothermal from a niche resource confined to volcanic regions into a broadly deployable baseload technology, but achieving cost-competitive drilling at scale remains the critical barrier.</p>
</div>
</div>`,
          GRADUATE: `<div class="lesson-content">
<h2>Advanced Geothermal Systems: Frontier Technologies, Risk Management, and Grid Decarbonization</h2>

<p>Geothermal energy research is advancing rapidly along multiple fronts—from supercritical resource exploitation to closed-loop systems that eliminate subsurface uncertainty. Graduate-level analysis requires understanding the geophysical, engineering, and policy dimensions of next-generation geothermal development and its role in decarbonizing both electricity and heat sectors.</p>

<h3>Induced Seismicity Risk Assessment and Mitigation</h3>

<p>Induced seismicity is the primary environmental and social risk for geothermal operations, particularly EGS projects:</p>

<blockquote class="scavenger-quote" data-quote-id="re-geo-grad-q1">
<p>"The 2017 Pohang earthquake (M5.5) in South Korea, triggered by an EGS stimulation project, fundamentally changed the geothermal industry's approach to induced seismicity risk. Probabilistic seismic hazard assessment and adaptive traffic-light protocols are now essential components of any EGS development plan."</p>
<cite>— Nature Geoscience, "Induced Seismicity and Geothermal Energy: Lessons from Pohang," 2019</cite>
</blockquote>

<h4>Traffic Light Protocol (TLP)</h4>
<table class="technical-table">
<thead>
<tr><th>Level</th><th>Magnitude Threshold</th><th>Operational Response</th><th>Monitoring Requirement</th></tr>
</thead>
<tbody>
<tr><td>Green</td><td>M < 1.0</td><td>Continue operations normally</td><td>Routine microseismic monitoring</td></tr>
<tr><td>Yellow</td><td>M 1.0-2.0</td><td>Reduce injection rate and pressure</td><td>Enhanced monitoring, hourly review</td></tr>
<tr><td>Orange</td><td>M 2.0-3.0</td><td>Suspend injection; controlled bleed-off</td><td>Continuous analysis, stakeholder notification</td></tr>
<tr><td>Red</td><td>M > 3.0</td><td>Immediate shut-in; incident investigation</td><td>Full post-event assessment required</td></tr>
</tbody>
</table>

<h4>Advanced Mitigation Strategies</h4>
<ul>
<li><strong>Cyclic soft stimulation:</strong> Alternating injection and rest periods to limit stress accumulation on faults</li>
<li><strong>Multi-well sequential stimulation:</strong> Distributing pressure across multiple injection points</li>
<li><strong>Pre-stimulation fault mapping:</strong> 3D seismic imaging and stress analysis to identify and avoid critically stressed faults</li>
<li><strong>Real-time adaptive control:</strong> Machine learning algorithms adjusting injection parameters based on microseismic feedback</li>
</ul>

<h3>Supercritical Geothermal Resources</h3>

<p>Supercritical water (>374 C, >22.1 MPa) offers dramatically higher energy content per unit mass, potentially enabling 5-10x more power per well:</p>

<blockquote class="scavenger-quote" data-quote-id="re-geo-grad-q2">
<p>"The Iceland Deep Drilling Project (IDDP) demonstrated that supercritical geothermal wells can produce up to 36 MW of thermal power—approximately ten times that of a conventional geothermal well. IDDP-1 encountered magma at 2.1 km depth, producing superheated steam at 452 C."</p>
<cite>— Geothermics, "Results from the IDDP: Accessing Supercritical Geothermal Resources," 2020</cite>
</blockquote>

<h4>Research Challenges for Supercritical Systems</h4>
<ul>
<li><strong>Extreme conditions:</strong> Temperatures >400 C and pressures >25 MPa require specialized drilling fluids, cements, and casing materials</li>
<li><strong>Corrosion:</strong> Supercritical fluids are highly corrosive; titanium and nickel alloy wellbore components required</li>
<li><strong>Permeability:</strong> Brittle-ductile transition zone may limit natural permeability; novel stimulation approaches needed</li>
<li><strong>Economic potential:</strong> If technically mastered, could reduce LCOE to $20-40/MWh through dramatically higher per-well output</li>
</ul>

<h3>Reservoir Modeling and Tracer Testing</h3>

<p>Geothermal reservoir management relies on numerical modeling validated by field data:</p>

<table class="technical-table">
<thead>
<tr><th>Modeling Approach</th><th>Application</th><th>Key Software</th></tr>
</thead>
<tbody>
<tr><td>TOUGH2/TOUGH3</td><td>Multiphase, multicomponent flow and heat transport</td><td>LBNL (industry standard)</td></tr>
<tr><td>FEHM</td><td>Coupled thermal-hydrological-mechanical modeling</td><td>LANL</td></tr>
<tr><td>COMSOL Multiphysics</td><td>Coupled physics simulation</td><td>Commercial FEM platform</td></tr>
<tr><td>Discrete fracture networks</td><td>EGS fracture flow modeling</td><td>FracMan, GEOS</td></tr>
</tbody>
</table>

<h4>Tracer Testing Methods</h4>
<ul>
<li><strong>Conservative tracers:</strong> Fluorescein, naphthalene sulfonates for flow path mapping and residence time distribution</li>
<li><strong>Reactive tracers:</strong> Temperature-sensitive compounds for thermal breakthrough prediction</li>
<li><strong>Interpretation:</strong> Mean residence time, swept volume, and fracture surface area estimation from tracer return curves</li>
</ul>

<h3>Advanced Drilling Technologies</h3>

<ul>
<li><strong>Millimeter-wave drilling:</strong> MIT/Quaise Energy concept using high-power gyrotrons to vaporize rock; could reach 20 km depth</li>
<li><strong>Plasma drilling:</strong> GA Drilling's Plasmabit technology using plasma pulses for contact-free rock destruction</li>
<li><strong>Closed-loop drilling:</strong> Directional drilling technology enabling U-tube configurations without fracture stimulation</li>
<li><strong>Automated drilling:</strong> AI-guided drill-bit steering and real-time formation evaluation to reduce non-productive time</li>
</ul>

<h3>Closed-Loop Geothermal Systems</h3>

<p>Closed-loop designs circulate working fluid through sealed wellbore systems without fluid contact with the reservoir:</p>

<blockquote class="scavenger-quote" data-quote-id="re-geo-grad-q3">
<p>"Eavor Technologies' Eavor-Loop closed-loop geothermal system eliminates the need for permeable reservoirs, induced seismicity risk, and water consumption by circulating fluid through a sealed multilateral wellbore system. The thermosiphon effect drives circulation without pumping energy in suitable configurations."</p>
<cite>— Nature Energy, "Closed-Loop Geothermal: A New Paradigm for Geothermal Energy," 2023</cite>
</blockquote>

<h4>Closed-Loop Advantages and Limitations</h4>
<ul>
<li><strong>Advantages:</strong> No induced seismicity, no water consumption, no subsurface uncertainty, deployable in any thermal gradient</li>
<li><strong>Limitations:</strong> Heat transfer limited by conduction through wellbore wall; lower power per well than open-loop systems</li>
<li><strong>Optimization:</strong> Multilateral designs maximize heat exchange surface area; spacing prevents thermal interference</li>
</ul>

<h3>Geothermal in Grid Decarbonization Pathways</h3>

<ul>
<li><strong>Firm clean power:</strong> Geothermal provides 24/7 dispatchable generation without storage or fuel cost volatility</li>
<li><strong>Complementarity:</strong> Pairs with variable renewables—geothermal baseload reduces storage requirements</li>
<li><strong>Heat decarbonization:</strong> Direct-use geothermal for district heating displaces fossil fuel boilers in cold climates</li>
<li><strong>Industrial heat:</strong> Process heat at 150-300 C for food processing, chemicals, and materials manufacturing</li>
</ul>

<h3>Mineral Extraction from Geothermal Brines</h3>

<p>Geothermal brines contain dissolved minerals that represent significant co-production revenue potential:</p>

<ul>
<li><strong>Lithium recovery:</strong> Salton Sea geothermal brines contain 200-400 ppm lithium; direct lithium extraction (DLE) technologies could produce 90,000+ tonnes/year of lithium carbonate equivalent</li>
<li><strong>Rare earth elements:</strong> Some brines contain extractable concentrations of Ce, La, and Nd</li>
<li><strong>Silica and zinc:</strong> Already commercially extracted at some geothermal facilities</li>
<li><strong>Economic impact:</strong> Mineral co-production could reduce net LCOE by $10-30/MWh, fundamentally changing project economics</li>
</ul>

<div class="key-concept">
<h4>Graduate Research Perspective</h4>
<p>Next-generation geothermal technologies—EGS, supercritical resources, and closed-loop systems—have the potential to transform geothermal from a geographically constrained niche resource into a globally deployable firm clean energy source. The research frontier spans drilling engineering, geomechanics, materials science, and mineral processing, requiring truly interdisciplinary approaches. As grid decarbonization progresses, the value of firm, dispatchable, zero-carbon generation increases, making the geothermal innovation pipeline increasingly important for achieving climate targets.</p>
</div>
</div>`,
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
        },
        { id: 'rgq2', question: { ELEMENTARY: 'Where does geothermal energy come from?', MIDDLE_SCHOOL: 'What causes geothermal heat?', HIGH_SCHOOL: 'What is the geothermal gradient?', UNDERGRADUATE: 'What are the three main types of geothermal power plants?', GRADUATE: 'How does enhanced geothermal systems (EGS) technology create reservoirs in hot dry rock?', PHD: 'What are the induced seismicity risk assessment frameworks for EGS operations?' }, options: { ELEMENTARY: ['Heat deep inside the Earth', 'The sun', 'Wind', 'Ocean waves'], MIDDLE_SCHOOL: ['Radioactive decay in Earths core and mantle', 'Volcanic explosions only', 'Underground fires', 'Friction from tectonic plates only'], HIGH_SCHOOL: ['Temperature increase with depth, averaging 25-30C per km', 'How fast geysers erupt', 'Earths rotation speed', 'Depth of the ocean'], UNDERGRADUATE: ['Dry steam, flash steam, and binary cycle plants', 'Only one type exists', 'Solar-thermal and geothermal are the same', 'Steam and nuclear'], GRADUATE: ['Hydraulic stimulation creates fracture networks in hot impermeable rock, then circulates water to extract heat', 'Drilling deeper wells only', 'Using explosives underground', 'Pumping steam from volcanoes'], PHD: ['Probabilistic seismic hazard analysis combined with traffic light protocols controlling injection parameters based on real-time seismicity', 'Seismicity cannot be managed', 'Only magnitude matters', 'No frameworks exist'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Geothermal energy comes from the heat deep inside the Earth — its like the planet has its own furnace!', MIDDLE_SCHOOL: 'Earths interior heat comes mainly from radioactive decay of elements like uranium and thorium, plus residual heat from planetary formation.', HIGH_SCHOOL: 'The geothermal gradient is the rate of temperature increase with depth, averaging 25-30°C per km but varying with geological setting.', UNDERGRADUATE: 'Dry steam plants use steam directly, flash plants depressurize hot water to create steam, and binary plants use a secondary working fluid with a lower boiling point.', GRADUATE: 'EGS uses hydraulic stimulation to create fracture networks in hot impermeable rock at 3-10 km depth, then circulates injected water through the fractures to extract heat.', PHD: 'Probabilistic seismic hazard analysis (PSHA) combined with adaptive traffic light protocols (TLP) controls injection pressure and flow rate based on real-time microseismic monitoring.' } },
        { id: 'rgq3', question: { ELEMENTARY: 'What comes out of the ground at geothermal areas?', MIDDLE_SCHOOL: 'What is a geyser?', HIGH_SCHOOL: 'How do binary cycle geothermal plants work?', UNDERGRADUATE: 'What is the typical capacity factor of geothermal power plants?', GRADUATE: 'How does supercritical geothermal resource development differ from conventional systems?', PHD: 'What are the thermodynamic optimization strategies for binary ORC plants using low-temperature resources?' }, options: { ELEMENTARY: ['Hot water and steam', 'Cold air', 'Oil', 'Gold'], MIDDLE_SCHOOL: ['A natural hot spring that shoots water and steam into the air', 'A type of volcano', 'An underground river', 'A hot rock'], HIGH_SCHOOL: ['They use a secondary fluid with lower boiling point heated by geothermal water', 'They burn geothermal gas', 'They use solar to heat the water', 'They mix water with chemicals'], UNDERGRADUATE: ['Over 90%, providing reliable baseload power', '20-30%', '50-60%', 'Less than 10%'], GRADUATE: ['Supercritical fluids above 374C carry 5-10x more energy per unit mass but require exotic materials', 'Slightly hotter water', 'Same as conventional', 'Lower energy density'], PHD: ['Working fluid selection, recuperator integration, and superheat optimization maximize exergetic efficiency for resources below 150C', 'Only one working fluid works', 'Optimization is unnecessary', 'Low-temp resources cannot generate power'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Hot water and steam come up from deep underground in geothermal areas — you can sometimes see steam rising from the ground!', MIDDLE_SCHOOL: 'A geyser is a natural hot spring that periodically erupts, shooting boiling water and steam high into the air due to underground heat.', HIGH_SCHOOL: 'Binary cycle plants pass geothermal water through a heat exchanger to heat a secondary fluid (like isobutane) that boils at a lower temperature to drive a turbine.', UNDERGRADUATE: 'Geothermal plants achieve over 90% capacity factors — among the highest of any power source — providing continuous baseload generation.', GRADUATE: 'Supercritical geothermal resources (above 374°C, 22 MPa) carry 5-10x more enthalpy per unit mass but require corrosion-resistant alloys and novel drilling techniques.', PHD: 'ORC optimization for low-temperature resources involves working fluid selection (R245fa, isobutane), recuperator integration, and superheat/pressure ratio tuning to maximize exergetic efficiency.' } },
        { id: 'rgq4', question: { ELEMENTARY: 'Can we heat homes with Earths heat?', MIDDLE_SCHOOL: 'What are geothermal heat pumps?', HIGH_SCHOOL: 'What is the difference between hydrothermal and petrothermal resources?', UNDERGRADUATE: 'What are the main drilling challenges in geothermal development?', GRADUATE: 'How do geothermal district heating systems achieve economic viability?', PHD: 'What role does tracer testing play in characterizing EGS reservoir connectivity?' }, options: { ELEMENTARY: ['Yes, using geothermal heat pumps!', 'No, its too hot', 'Only in Iceland', 'Only near volcanoes'], MIDDLE_SCHOOL: ['Systems using stable ground temperature to heat and cool buildings', 'Pumps that move lava', 'Hot tubs powered by the Earth', 'Underground heaters'], HIGH_SCHOOL: ['Hydrothermal has natural fluid and permeability; petrothermal is hot dry rock requiring stimulation', 'They are the same', 'Hydrothermal is man-made', 'Petrothermal uses petroleum'], UNDERGRADUATE: ['Hard rock drilling wear, high temperatures degrading equipment, and lost circulation in fracture zones', 'No challenges exist', 'Only cost matters', 'Same as oil and gas'], GRADUATE: ['Large thermal loads, favorable geology reducing drilling costs, and long-term heat supply contracts with municipalities', 'They are never viable', 'Only in volcanic areas', 'Require government subsidies always'], PHD: ['Conservative and reactive tracers characterize flow paths, residence times, and thermal breakthrough to validate reservoir models', 'Tracers are not used', 'Only temperature logs work', 'Tracers damage the reservoir'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Geothermal heat pumps use the stable temperature underground to keep homes warm in winter and cool in summer.', MIDDLE_SCHOOL: 'Geothermal heat pumps use the constant temperature a few meters underground (about 10-15°C) to efficiently heat and cool buildings.', HIGH_SCHOOL: 'Hydrothermal resources have natural fluid and rock permeability; petrothermal (hot dry rock) has heat but requires engineered fracture networks.', UNDERGRADUATE: 'Geothermal drilling faces hard crystalline rock causing rapid bit wear, temperatures above 300°C degrading electronics, and lost circulation in fractured zones.', GRADUATE: 'District heating viability requires sufficient thermal demand density, favorable well productivity, and long-term municipal contracts ensuring revenue for 20-30 year payback.', PHD: 'Conservative (naphthalene disulfonates) and reactive (thermally degrading) tracers reveal flow paths, mean residence times, and swept volume to validate numerical reservoir models.' } },
        { id: 'rgq5', question: { ELEMENTARY: 'Is geothermal energy available everywhere?', MIDDLE_SCHOOL: 'Which country gets the most electricity from geothermal?', HIGH_SCHOOL: 'What factors determine geothermal resource temperature and productivity?', UNDERGRADUATE: 'What is the LCOE range for geothermal power?', GRADUATE: 'How does reservoir management prevent thermal drawdown in geothermal fields?', PHD: 'What coupled thermo-hydro-mechanical-chemical (THMC) processes govern EGS reservoir evolution?' }, options: { ELEMENTARY: ['The heat is everywhere, but its easiest to use near volcanoes', 'Only at the North Pole', 'Only in deserts', 'Only underground'], MIDDLE_SCHOOL: ['Iceland — nearly all its electricity and heating come from geothermal', 'Brazil', 'Australia', 'Canada'], HIGH_SCHOOL: ['Tectonic setting, heat flow, rock permeability, and fluid availability', 'Only depth matters', 'Just the type of rock', 'Surface temperature'], UNDERGRADUATE: ['$50-100/MWh, with potential to decrease with EGS advances', '$5-10/MWh', '$300-500/MWh', '$1000+/MWh'], GRADUATE: ['Reinjection strategies, production rate management, and make-up well drilling maintain pressure and temperature', 'No management needed', 'Only drill new wells', 'Shut down and wait'], PHD: ['Thermal stress cracking, pressure-dependent permeability, mineral dissolution/precipitation, and chemical alteration interact to change reservoir properties over time', 'Only thermal processes matter', 'Chemistry is irrelevant', 'Processes are independent'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Earths heat is everywhere underground, but its much easier to reach near volcanoes and hot springs where it comes closer to the surface.', MIDDLE_SCHOOL: 'Iceland gets nearly all its electricity and heating from geothermal energy thanks to its volcanic geology on the Mid-Atlantic Ridge.', HIGH_SCHOOL: 'Resource quality depends on tectonic setting (plate boundaries, hotspots), regional heat flow, rock permeability, fracture density, and availability of natural fluids.', UNDERGRADUATE: 'Geothermal LCOE ranges $50-100/MWh depending on resource temperature and depth, with EGS advances expected to reduce costs significantly.', GRADUATE: 'Sustainable reservoir management uses strategic reinjection to maintain pressure support, controlled production rates to limit cooling, and make-up wells to compensate for declining productivity.', PHD: 'THMC coupling means thermal contraction creates new fractures, pressure changes alter apertures, mineral dissolution increases permeability near injection but precipitation reduces it at production — requiring integrated simulation.' } },
        { id: 'rgq6', question: { ELEMENTARY: 'Does geothermal energy cause pollution?', MIDDLE_SCHOOL: 'What are the environmental benefits of geothermal energy?', HIGH_SCHOOL: 'What emissions are associated with geothermal power plants?', UNDERGRADUATE: 'How do geothermal plants manage hydrogen sulfide and other non-condensable gases?', GRADUATE: 'What is the life-cycle carbon intensity of geothermal power compared to fossil fuels?', PHD: 'How do closed-loop geothermal systems eliminate surface environmental impacts?' }, options: { ELEMENTARY: ['Very little — its one of the cleanest energy sources', 'Yes, lots of smoke', 'As much as coal', 'More than cars'], MIDDLE_SCHOOL: ['Very low emissions, small land footprint, and reliable 24/7 power', 'No benefits', 'Only works sometimes', 'Requires fossil fuel backup'], HIGH_SCHOOL: ['Small amounts of CO2, H2S, and trace gases, far less than fossil fuels', 'Same as coal', 'Zero emissions always', 'Only water vapor'], UNDERGRADUATE: ['Scrubber systems, Stretford process, and reinjection of NCGs remove H2S to meet air quality standards', 'No management needed', 'Only dilution is used', 'H2S is harmless'], GRADUATE: ['15-55 g CO2eq/kWh vs 400-1000 for fossil fuels, with binary plants near zero direct emissions', 'Same as natural gas', 'Higher than coal', 'Cannot be measured'], PHD: ['Closed-loop circulates working fluid in sealed wellbores, eliminating fluid loss, induced seismicity risk, and surface gas emissions', 'Closed-loop is identical to open', 'No advantages exist', 'Only reduces cost'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Geothermal energy causes very little pollution — its one of the cleanest ways to make electricity!', MIDDLE_SCHOOL: 'Geothermal has very low greenhouse gas emissions, uses a small land area, and provides reliable power 24 hours a day, 7 days a week.', HIGH_SCHOOL: 'Geothermal plants emit small amounts of CO2 (15-55 g/kWh) and hydrogen sulfide, far less than the 400-1000 g/kWh from fossil fuel plants.', UNDERGRADUATE: 'H2S abatement uses Stretford process or iron-chelate scrubbers achieving 99.9% removal, with NCG reinjection eliminating atmospheric release entirely.', GRADUATE: 'Life-cycle emissions are 15-55 g CO2eq/kWh for flash plants and near-zero for binary, compared to 400-1000 g/kWh for fossil fuels.', PHD: 'Closed-loop (Advanced Geothermal Systems) circulates sealed working fluid through U-tube or coaxial wellbores, eliminating reservoir fluid extraction, induced seismicity, and surface gas emissions.' } },
        { id: 'rgq7', question: { ELEMENTARY: 'How long can geothermal energy last?', MIDDLE_SCHOOL: 'What is the Ring of Fire?', HIGH_SCHOOL: 'How deep do geothermal wells typically go?', UNDERGRADUATE: 'What are the key economic risks in geothermal project development?', GRADUATE: 'How does machine learning improve geothermal exploration success rates?', PHD: 'What are the materials science challenges for supercritical geothermal wells?' }, options: { ELEMENTARY: ['Millions of years — the Earths heat isnt going away!', 'Only 10 years', 'Until the volcano stops', 'One year'], MIDDLE_SCHOOL: ['A zone of volcanoes and earthquakes around the Pacific Ocean with lots of geothermal potential', 'A ring-shaped hot spring', 'A fire underground', 'A circular volcano'], HIGH_SCHOOL: ['1-3 km for conventional, up to 5+ km for EGS', 'Just a few meters', 'Over 100 km', 'Exactly 500 meters'], UNDERGRADUATE: ['Exploration risk (resource uncertainty), drilling cost overruns, and reservoir underperformance', 'No risks exist', 'Only regulatory risk', 'Same as solar projects'], GRADUATE: ['ML integrates geological, geophysical, and geochemical data to identify prospective sites with higher probability of success', 'ML cannot help exploration', 'Only replaces drilling', 'Eliminates all risk'], PHD: ['Corrosion-resistant alloys, high-temperature cements, and elastomers must withstand supercritical fluids above 374C and acidic conditions', 'Standard oil well materials work', 'No special materials needed', 'Only the drill bit matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Geothermal energy can last millions of years — the heat inside Earth isnt going away anytime soon!', MIDDLE_SCHOOL: 'The Ring of Fire is a horseshoe-shaped zone around the Pacific Ocean with many volcanoes and earthquakes — ideal for geothermal energy.', HIGH_SCHOOL: 'Conventional geothermal wells reach 1-3 km depth; EGS wells may extend beyond 5 km to access hot dry rock resources.', UNDERGRADUATE: 'Key risks include exploration failure (only 50-60% well success rate), drilling cost overruns from unexpected geological conditions, and reservoir thermal drawdown.', GRADUATE: 'Machine learning integrates multi-source data (gravity, magnetics, chemistry, temperature) to produce probability maps that improve exploration well targeting success rates.', PHD: 'Supercritical wells require nickel-based alloys resistant to chloride stress-corrosion cracking, CO2-resistant cements, and high-temperature seals above 374°C in acidic, high-pressure environments.' } },
        { id: 'rgq8', question: { ELEMENTARY: 'Can geothermal energy make electricity and heat at the same time?', MIDDLE_SCHOOL: 'How does geothermal heating work in Iceland?', HIGH_SCHOOL: 'What is a geothermal heat pump coefficient of performance?', UNDERGRADUATE: 'How does combined heat and power (CHP) improve geothermal project economics?', GRADUATE: 'What is the role of fiber-optic distributed temperature sensing in geothermal wells?', PHD: 'How do coupled reservoir-wellbore models predict long-term geothermal field behavior?' }, options: { ELEMENTARY: ['Yes! Its called combined heat and power', 'No, only one at a time', 'Only heat', 'Only electricity'], MIDDLE_SCHOOL: ['Hot water from underground is piped directly to buildings for heating', 'Burning volcanic rocks', 'Using lava to heat water', 'Solar panels near volcanoes'], HIGH_SCHOOL: ['COP of 3-5, meaning 3-5 units of heat per unit of electricity used', 'Always exactly 1', 'Less than 1', 'Over 100'], UNDERGRADUATE: ['Cascading use of rejected heat for district heating, greenhouses, and aquaculture increases revenue streams', 'CHP is not possible', 'Reduces efficiency', 'Only works for large plants'], GRADUATE: ['DTS provides continuous temperature profiles along the entire wellbore for real-time reservoir monitoring', 'Only measures surface temperature', 'Cannot work in wells', 'Replaced by thermocouples'], PHD: ['Coupled models integrate reservoir fluid flow, heat transport, and wellbore hydraulics to predict enthalpy decline and optimal extraction rates over decades', 'Models are unnecessary', 'Only simple calculations needed', 'Cannot predict long-term behavior'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Geothermal can make electricity AND heat buildings at the same time — thats called combined heat and power.', MIDDLE_SCHOOL: 'In Iceland, naturally hot water from underground is pumped through pipes to heat homes, swimming pools, and greenhouses year-round.', HIGH_SCHOOL: 'Geothermal heat pumps achieve a COP of 3-5, meaning they deliver 3-5 units of heating or cooling energy for every unit of electricity consumed.', UNDERGRADUATE: 'CHP cascades waste heat from power generation to district heating, greenhouses, aquaculture, and industrial processes, improving total energy utilization to 70-90%.', GRADUATE: 'Fiber-optic DTS provides continuous temperature profiles along entire wellbore length with meter-scale resolution, enabling real-time monitoring of feed zones and thermal breakthrough.', PHD: 'Coupled reservoir-wellbore simulators (like TOUGH2-WELLSIM) integrate multiphase flow, heat transport, and wellbore hydraulics to forecast enthalpy decline and optimize extraction over 30+ year horizons.' } },
        { id: 'rgq9', question: { ELEMENTARY: 'What does a geothermal power plant look like?', MIDDLE_SCHOOL: 'How much land does a geothermal plant need?', HIGH_SCHOOL: 'What is the global installed geothermal power capacity?', UNDERGRADUATE: 'How do geothermal resources integrate with other renewable energy systems?', GRADUATE: 'What advances in drilling technology could make geothermal accessible everywhere?', PHD: 'How does the techno-economic potential of superhot rock energy compare to conventional geothermal?' }, options: { ELEMENTARY: ['Usually small buildings with steam coming out — much smaller than coal plants!', 'Huge factories with smokestacks', 'Giant solar panels', 'Tall wind turbines'], MIDDLE_SCHOOL: ['Very little — about 1-8 acres per MW, among the smallest of any power source', 'Hundreds of square miles', 'Same as a solar farm', 'More than a coal mine'], HIGH_SCHOOL: ['About 16 GW worldwide as of 2024', 'Over 1000 GW', 'Less than 100 MW', 'Exactly 1 GW'], UNDERGRADUATE: ['Geothermal provides baseload complementing variable solar and wind, reducing storage needs', 'Cannot integrate with others', 'Competes with all renewables', 'Only pairs with nuclear'], GRADUATE: ['Millimeter-wave drilling and plasma drilling could reach 20+ km economically, accessing heat everywhere', 'Drilling technology is mature', 'Only deeper conventional bits', 'Advances are decades away'], PHD: ['Superhot rock (400C+) could deliver 5-10x power per well, potentially providing 100+ TWh globally from a fraction of current well count', 'Same output as conventional', 'Lower energy density', 'Not technically feasible'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Geothermal plants are usually small buildings with some steam — much smaller and cleaner-looking than coal or gas power plants!', MIDDLE_SCHOOL: 'Geothermal plants have one of the smallest land footprints of any power source — only about 1-8 acres per megawatt of capacity.', HIGH_SCHOOL: 'Global installed geothermal power capacity is approximately 16 GW as of 2024, led by the US, Indonesia, Philippines, Turkey, and New Zealand.', UNDERGRADUATE: 'Geothermal provides continuous baseload generation that complements variable solar and wind, reducing the need for battery storage and gas peakers.', GRADUATE: 'Millimeter-wave and plasma drilling technologies aim to reach 20+ km depths economically, which could make geothermal energy accessible virtually anywhere on Earth.', PHD: 'Superhot rock energy (400°C+) could deliver 5-10x power per well compared to conventional, potentially unlocking 100+ TWh globally and transforming geothermal from niche to dominant resource.' } },
        { id: 'rgq10', question: { ELEMENTARY: 'Are there geothermal areas in the United States?', MIDDLE_SCHOOL: 'What US state has the most geothermal power?', HIGH_SCHOOL: 'How is geothermal exploration conducted?', UNDERGRADUATE: 'What regulatory frameworks govern geothermal development in the US?', GRADUATE: 'How does the FORGE initiative advance EGS technology toward commercial deployment?', PHD: 'What are the thermodynamic limits of heat extraction from finite geothermal reservoirs?' }, options: { ELEMENTARY: ['Yes! Yellowstone and many western states have geothermal activity', 'No geothermal in the US', 'Only Hawaii', 'Only Alaska'], MIDDLE_SCHOOL: ['California, with The Geysers being the worlds largest geothermal field', 'Texas', 'Florida', 'New York'], HIGH_SCHOOL: ['Geological surveys, geochemistry, geophysics (gravity, magnetics, MT), and slim-hole drilling', 'Just digging a hole', 'Satellite images only', 'Asking local residents'], UNDERGRADUATE: ['BLM leasing on federal land, state permits, NEPA environmental review, and EPA underground injection rules', 'No regulations exist', 'Same as oil and gas exactly', 'Only state-level permits'], GRADUATE: ['FORGE provides a dedicated EGS field laboratory for testing stimulation, monitoring, and modeling techniques at full scale', 'FORGE is a policy program', 'Only funds research papers', 'Replaced by private industry'], PHD: ['Maximum extractable energy is bounded by reservoir thermal mass, recharge rate, and economic minimum temperature — sustainable yield requires balancing extraction with conductive/convective recharge', 'There are no limits', 'All heat can be extracted', 'Only well depth matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! The US has lots of geothermal activity, especially in western states. Yellowstone has famous geysers and hot springs!', MIDDLE_SCHOOL: 'California leads US geothermal power — The Geysers in northern California is the worlds largest geothermal power complex at over 900 MW.', HIGH_SCHOOL: 'Exploration uses geological mapping, geochemical analysis of hot springs, geophysical surveys (gravity, magnetics, magnetotellurics), and exploration drilling.', UNDERGRADUATE: 'US geothermal development requires BLM leasing for federal land, state drilling permits, NEPA environmental review, and EPA Class V underground injection permits.', GRADUATE: 'The FORGE (Frontier Observatory for Research in Geothermal Energy) site in Utah provides a dedicated EGS test bed for validating stimulation, monitoring, and modeling at commercial scale.', PHD: 'Sustainable extraction is bounded by reservoir thermal mass (ρcV·ΔT), natural recharge rate, and economic cutoff temperature — exceeding sustainable yield causes irreversible thermal drawdown.' } }
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
        },
        { id: 'rstq2', question: { ELEMENTARY: 'What is a battery?', MIDDLE_SCHOOL: 'What types of batteries are used for grid storage?', HIGH_SCHOOL: 'What is the difference between energy capacity and power rating in storage?', UNDERGRADUATE: 'What is the round-trip efficiency of lithium-ion battery storage systems?', GRADUATE: 'How do lithium iron phosphate (LFP) batteries compare to nickel manganese cobalt (NMC) for grid applications?', PHD: 'What degradation mechanisms limit lithium-ion battery calendar and cycle life in grid storage?' }, options: { ELEMENTARY: ['A device that stores energy for later use', 'A type of light bulb', 'A generator', 'A wire'], MIDDLE_SCHOOL: ['Lithium-ion, flow batteries, and lead-acid', 'Only car batteries', 'Only AA batteries', 'Nuclear batteries'], HIGH_SCHOOL: ['Energy capacity is total stored energy (kWh); power rating is max charge/discharge rate (kW)', 'They are the same', 'Power is always larger', 'Energy is measured in watts'], UNDERGRADUATE: ['85-95% depending on chemistry and operating conditions', '50-60%', '99-100%', 'Less than 30%'], GRADUATE: ['LFP offers longer cycle life and better thermal safety; NMC offers higher energy density and lower weight', 'No difference', 'NMC is always better', 'LFP is only for phones'], PHD: ['SEI growth, lithium plating, cathode structural degradation, and electrolyte decomposition limit usable life', 'No degradation occurs', 'Only temperature matters', 'Degradation stops after year one'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A battery stores energy — like saving electricity in a box so you can use it later when you need it!', MIDDLE_SCHOOL: 'Grid storage uses lithium-ion batteries (most common), flow batteries (for long duration), and sometimes lead-acid batteries.', HIGH_SCHOOL: 'Energy capacity (kWh) is the total energy stored; power rating (kW) is how fast you can charge or discharge. A 100 kW/400 kWh system delivers 100 kW for 4 hours.', UNDERGRADUATE: 'Li-ion grid storage achieves 85-95% round-trip efficiency (DC-DC), with AC-AC efficiency slightly lower due to inverter losses.', GRADUATE: 'LFP offers 4000-8000+ cycle life and superior thermal stability vs NMC at 1500-3000 cycles; NMC provides 50-70% higher energy density, favoring space-constrained applications.', PHD: 'Calendar aging driven by SEI growth consumes lithium inventory; cycling causes cathode particle cracking, lithium plating at high C-rates, and electrolyte oxidation — all reducing capacity and increasing resistance.' } },
        { id: 'rstq3', question: { ELEMENTARY: 'How do we store solar energy for nighttime?', MIDDLE_SCHOOL: 'What is a flow battery?', HIGH_SCHOOL: 'How does pumped hydro storage work?', UNDERGRADUATE: 'What are the key grid services provided by battery energy storage systems?', GRADUATE: 'How do hybrid battery storage configurations optimize for multiple grid service stacking?', PHD: 'What are the techno-economic trade-offs between long-duration storage technologies?' }, options: { ELEMENTARY: ['In batteries so we can use it when the sun goes down', 'We cant', 'Turn on more solar panels', 'Use candles'], MIDDLE_SCHOOL: ['A battery where energy is stored in liquid tanks that can be scaled up easily', 'A battery that flows like water', 'A waterfall battery', 'A liquid computer'], HIGH_SCHOOL: ['Water is pumped uphill when power is cheap, then flows down through turbines when needed', 'Pumping water into batteries', 'Using water pressure to charge phones', 'Filtering water for energy'], UNDERGRADUATE: ['Frequency regulation, peak shaving, arbitrage, capacity firming, and black start capability', 'Only backup power', 'Only frequency regulation', 'Only peak shaving'], GRADUATE: ['Co-located battery types (e.g., Li-ion for fast response + flow battery for duration) maximize stacked revenue streams', 'Only one battery type per site', 'Hybrid systems are less efficient', 'Stacking services is not allowed'], PHD: ['Iron-air, compressed air, and flow batteries trade cost, efficiency, and duration — optimal choice depends on discharge duration and cycling requirements', 'All long-duration technologies are identical', 'Only cost matters', 'Li-ion works for all durations'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We store solar energy in big batteries during the day so we still have electricity at night when the sun is down!', MIDDLE_SCHOOL: 'Flow batteries store energy in large tanks of liquid electrolyte — the bigger the tanks, the more energy you can store.', HIGH_SCHOOL: 'Pumped hydro stores energy by pumping water to a higher reservoir when electricity is cheap, then releasing it through turbines to generate during peak demand.', UNDERGRADUATE: 'BESS provides frequency regulation (fastest), peak shaving, energy arbitrage, renewable firming, transmission deferral, and black start capability.', GRADUATE: 'Hybrid configurations pair fast-response Li-ion (for regulation) with long-duration flow or iron-air batteries (for arbitrage/firming), stacking multiple revenue streams to improve project economics.', PHD: 'Iron-air offers lowest cost per kWh but 45% RTE; CAES provides 50-70% RTE at scale; flow batteries offer 65-75% RTE with independent power/energy scaling — duration and cycling profile determine optimal selection.' } },
        { id: 'rstq4', question: { ELEMENTARY: 'What happens when too much solar power is made?', MIDDLE_SCHOOL: 'How big are grid-scale batteries?', HIGH_SCHOOL: 'What is depth of discharge and why does it matter for batteries?', UNDERGRADUATE: 'How does battery degradation affect the economics of storage projects?', GRADUATE: 'What role does thermal management play in battery storage system performance and safety?', PHD: 'How do second-life EV batteries address sustainability and cost challenges in stationary storage?' }, options: { ELEMENTARY: ['It can be stored in batteries for later', 'It disappears', 'The sun gets blocked', 'Power lines break'], MIDDLE_SCHOOL: ['Some are as big as warehouses and can power thousands of homes', 'Tiny like phone batteries', 'Size of a car only', 'Invisible'], HIGH_SCHOOL: ['How much of a battery capacity is used — deeper discharge means faster wear', 'How deep the battery is buried', 'The weight of the battery', 'How fast it charges'], UNDERGRADUATE: ['Degradation reduces usable capacity over time, requiring oversizing or augmentation to meet contract obligations', 'Degradation has no economic impact', 'Batteries never degrade', 'Only affects warranties'], GRADUATE: ['Active liquid cooling maintains optimal 20-30C cell temperature, preventing accelerated degradation and thermal runaway', 'Temperature does not affect batteries', 'Only needed in deserts', 'Passive cooling is always sufficient'], PHD: ['Repurposing EV batteries at 70-80% SOH for stationary storage extends useful life and reduces lifecycle emissions, but requires robust grading and BMS integration', 'Second-life batteries are unsafe', 'No cost advantage exists', 'Only new batteries should be used'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Extra solar power can be stored in big batteries so we can use it when its cloudy or at night!', MIDDLE_SCHOOL: 'Grid-scale batteries can be enormous — some fill entire warehouses and store enough energy to power thousands of homes for hours.', HIGH_SCHOOL: 'Depth of discharge (DoD) is the percentage of battery capacity used. Shallower cycling (lower DoD) extends battery life significantly.', UNDERGRADUATE: 'Degradation reduces usable capacity 2-3% per year, requiring initial oversizing or periodic augmentation to maintain contracted capacity over 10-20 year project life.', GRADUATE: 'Active liquid cooling maintains cells at 20-30°C, preventing accelerated SEI growth above 35°C and thermal runaway risk, directly impacting 20-year degradation trajectory.', PHD: 'Second-life EV batteries at 70-80% state-of-health can serve 5-10 additional years in stationary storage, but require robust cell grading, repackaging, and integrated BMS for reliable operation.' } },
        { id: 'rstq5', question: { ELEMENTARY: 'Can we store energy without batteries?', MIDDLE_SCHOOL: 'What is compressed air energy storage?', HIGH_SCHOOL: 'How do flywheels store energy?', UNDERGRADUATE: 'What are the advantages and limitations of vanadium redox flow batteries?', GRADUATE: 'How do gravity-based energy storage systems work and what are their scaling prospects?', PHD: 'What are the fundamental thermodynamic efficiency limits of adiabatic compressed air energy storage?' }, options: { ELEMENTARY: ['Yes! With pumped water, compressed air, and spinning flywheels', 'No, only batteries', 'Only with magnets', 'Only with fuel'], MIDDLE_SCHOOL: ['Storing energy by compressing air underground and releasing it to spin turbines', 'Blowing up balloons', 'Making wind with machines', 'Cooling buildings with air'], HIGH_SCHOOL: ['Flywheels spin a heavy rotor at high speed, storing energy as rotational kinetic energy', 'They dont store energy', 'Using fans to generate power', 'Spinning magnets in water'], UNDERGRADUATE: ['Unlimited cycle life and independent power/energy scaling, but lower energy density and higher upfront cost than Li-ion', 'No advantages', 'Same as lithium-ion', 'Only for small applications'], GRADUATE: ['Gravity storage lifts heavy blocks during charging and lowers them to generate, offering long duration with no chemical degradation', 'Gravity storage is theoretical only', 'Only works on mountains', 'Requires rare materials'], PHD: ['Adiabatic CAES limited by compressor isentropic efficiency, thermal storage losses, and expander performance — theoretical max ~70% RTE with multi-stage intercooling', 'No thermodynamic limits', 'Always achieves 100%', 'Same as batteries'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! We can store energy by pumping water uphill, compressing air underground, or spinning heavy wheels really fast.', MIDDLE_SCHOOL: 'CAES compresses air into underground caverns when electricity is cheap, then releases it through turbines to generate power when needed.', HIGH_SCHOOL: 'Flywheels store energy by spinning a heavy rotor (often in a vacuum to reduce friction) at very high speeds — the faster it spins, the more energy it holds.', UNDERGRADUATE: 'Vanadium flow batteries offer virtually unlimited cycle life and independently scalable power (stack size) and energy (tank volume), but have lower energy density (~25 Wh/L) and higher capital cost.', GRADUATE: 'Gravity storage systems lift concrete or composite blocks using surplus electricity, then lower them through generators to produce power — offering 80-85% RTE with 30+ year asset life and no chemical degradation.', PHD: 'Adiabatic CAES efficiency is bounded by multi-stage compressor isentropic efficiency (85-90% per stage), thermal energy storage round-trip losses (5-10%), and expander polytropic efficiency — practical systems target 65-70% RTE.' } },
        { id: 'rstq6', question: { ELEMENTARY: 'How do electric cars help store energy?', MIDDLE_SCHOOL: 'What is vehicle-to-grid technology?', HIGH_SCHOOL: 'What is the role of energy storage in renewable energy integration?', UNDERGRADUATE: 'How do front-of-meter vs behind-the-meter storage projects differ in value streams?', GRADUATE: 'What are the optimal bidding strategies for battery storage in wholesale electricity markets?', PHD: 'How do multi-objective optimization frameworks design hybrid renewable-plus-storage systems?' }, options: { ELEMENTARY: ['Electric car batteries can send power back to the grid when parked', 'They dont help', 'Cars use too much energy', 'Only when driving'], MIDDLE_SCHOOL: ['Using parked electric car batteries to supply power back to the electricity grid', 'Cars that drive on the grid', 'Grid-powered toy cars', 'Electric grid racing'], HIGH_SCHOOL: ['Storage smooths variable renewable output and shifts energy from production to consumption times', 'Storage is not needed', 'Only backup during blackouts', 'Increases renewable curtailment'], UNDERGRADUATE: ['Front-of-meter earns from wholesale markets and grid services; behind-the-meter reduces demand charges and provides backup', 'No difference', 'Behind-the-meter is always better', 'Front-of-meter only provides backup'], GRADUATE: ['Stochastic optimization considering price forecasts, state of charge, degradation costs, and multiple market products', 'Simple price thresholds only', 'Charge at night, discharge at day', 'Random bidding works'], PHD: ['Pareto optimization balances LCOE, reliability (LOLP), and curtailment across solar/wind/storage ratios using genetic algorithms or mixed-integer programming', 'Only minimize cost', 'Single-objective is sufficient', 'Optimization is unnecessary'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electric car batteries can send stored power back to the grid when the car is parked — like a giant battery on wheels helping everyone!', MIDDLE_SCHOOL: 'Vehicle-to-grid (V2G) lets parked electric cars discharge their batteries to help power the grid during peak demand periods.', HIGH_SCHOOL: 'Storage enables renewable integration by smoothing variable solar and wind output, time-shifting energy, and providing grid stability services.', UNDERGRADUATE: 'Front-of-meter storage earns from energy arbitrage, ancillary services, and capacity markets; behind-the-meter reduces demand charges, provides backup, and enables solar self-consumption.', GRADUATE: 'Optimal bidding uses stochastic optimization with price forecast uncertainty, degradation cost per cycle, state-of-charge constraints, and co-optimization across energy, regulation, and reserve markets.', PHD: 'Multi-objective frameworks generate Pareto frontiers across LCOE, loss-of-load probability, and curtailment using genetic algorithms (NSGA-II) or MILP to identify optimal technology mixes.' } },
        { id: 'rstq7', question: { ELEMENTARY: 'How long can batteries store energy?', MIDDLE_SCHOOL: 'What is the difference between short and long duration storage?', HIGH_SCHOOL: 'What safety concerns exist with lithium-ion batteries?', UNDERGRADUATE: 'How is battery energy storage system sizing determined for a specific application?', GRADUATE: 'What market design changes are needed to properly value energy storage flexibility?', PHD: 'How do solid-state batteries address safety and energy density limitations of conventional lithium-ion?' }, options: { ELEMENTARY: ['Hours to days depending on the type', 'Only seconds', 'Forever', 'Exactly one hour'], MIDDLE_SCHOOL: ['Short duration is 1-4 hours; long duration is 8+ hours for seasonal shifts', 'No difference', 'Short is minutes only', 'Long is years only'], HIGH_SCHOOL: ['Thermal runaway can cause fires if batteries overheat or are damaged', 'No safety concerns', 'Only small batteries are risky', 'Lithium is explosive in air'], UNDERGRADUATE: ['Load profile analysis, target services, economic optimization of power/energy ratio, and degradation modeling', 'Random selection', 'Biggest is always best', 'Only power rating matters'], GRADUATE: ['Separate capacity and energy pricing, proper ancillary service compensation, and removing barriers to market participation', 'No changes needed', 'Eliminate all markets', 'Only increase storage subsidies'], PHD: ['Solid electrolytes eliminate flammable liquid, enable lithium metal anodes for 2x energy density, but face interface resistance and manufacturing scale challenges', 'Solid-state is identical to liquid', 'No safety improvement', 'Already commercially dominant'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Different batteries can store energy for different times — some for hours, and special ones can store it for days!', MIDDLE_SCHOOL: 'Short-duration storage (1-4 hours) handles daily peaks; long-duration storage (8+ hours to seasonal) addresses extended low-renewable periods.', HIGH_SCHOOL: 'Li-ion batteries can experience thermal runaway if overheated, overcharged, or damaged — thats why they have safety systems and fire suppression.', UNDERGRADUATE: 'BESS sizing requires load/generation profile analysis, target service identification, power/energy ratio optimization, degradation modeling, and economic evaluation of revenue vs capital cost.', GRADUATE: 'Proper storage valuation requires unbundled capacity/energy pricing, technology-neutral ancillary service procurement, and removing minimum size and duration barriers to wholesale market participation.', PHD: 'Solid-state batteries replace flammable liquid electrolyte with ceramic or polymer, enabling lithium metal anodes (2x energy density) with inherent thermal stability, though interface impedance and scalable manufacturing remain challenges.' } },
        { id: 'rstq8', question: { ELEMENTARY: 'Why is energy storage important for the future?', MIDDLE_SCHOOL: 'How much energy storage is installed worldwide?', HIGH_SCHOOL: 'What is the levelized cost of storage?', UNDERGRADUATE: 'How do lithium-ion battery supply chains affect storage deployment?', GRADUATE: 'What are the emerging long-duration storage technologies beyond lithium-ion?', PHD: 'How do degradation-aware optimal control strategies extend battery asset value?' }, options: { ELEMENTARY: ['It helps us use clean energy even when sun and wind arent available', 'Its not important', 'Only for phones', 'Only for flashlights'], MIDDLE_SCHOOL: ['Over 100 GW globally and growing rapidly', 'Less than 1 MW', 'Exactly 10 GW', 'Over 1000 GW'], HIGH_SCHOOL: ['Total cost per unit of energy delivered over the systems lifetime including degradation', 'Price of the battery only', 'Electricity price', 'Installation cost only'], UNDERGRADUATE: ['Lithium and cobalt supply concentration, mining impacts, and geopolitical risks affect cost and availability', 'Supply chains have no effect', 'All materials are abundant', 'Only cost matters'], GRADUATE: ['Iron-air, zinc-air, liquid metal, thermal, and hydrogen storage target 100+ hours at lower cost', 'No emerging technologies', 'Li-ion covers all needs', 'Only pumped hydro for long duration'], PHD: ['Model predictive control incorporating degradation state minimizes total cost of ownership by optimizing cycling depth, rate, and temperature', 'Always maximize throughput', 'Degradation cannot be controlled', 'Only calendar aging matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy storage lets us save clean solar and wind energy for when we need it — making renewable energy work all the time!', MIDDLE_SCHOOL: 'Over 100 GW of energy storage is installed globally, with installations doubling each year as costs fall and renewables expand.', HIGH_SCHOOL: 'Levelized cost of storage (LCOS) accounts for capital cost, efficiency losses, degradation replacement, and operating costs per unit of energy delivered over the system lifetime.', UNDERGRADUATE: 'Li-ion depends on lithium (Australia, Chile), cobalt (DRC), and nickel (Indonesia) — supply concentration creates cost volatility and geopolitical risk for storage deployment.', GRADUATE: 'Iron-air (Form Energy), zinc-air, liquid metal (Ambri), thermal (Antora), and green hydrogen storage target 100+ hour duration at $10-50/kWh capital cost.', PHD: 'Degradation-aware MPC uses real-time degradation state estimation to co-optimize cycling profile, depth, C-rate, and temperature setpoints, extending useful life 20-30% vs naive operation.' } },
        { id: 'rstq9', question: { ELEMENTARY: 'What is a solar battery for homes?', MIDDLE_SCHOOL: 'How do home battery systems work with solar panels?', HIGH_SCHOOL: 'What factors affect battery storage economics?', UNDERGRADUATE: 'How do capacity markets compensate energy storage resources?', GRADUATE: 'What are the fire safety standards and thermal runaway mitigation strategies for BESS installations?', PHD: 'How do quantum computing approaches address combinatorial optimization in storage dispatch?' }, options: { ELEMENTARY: ['A battery at your house that stores solar energy', 'A solar panel that is also a battery', 'A battery powered by moonlight', 'A flashlight'], MIDDLE_SCHOOL: ['Solar charges the battery during the day; the battery powers the home at night', 'Batteries replace solar panels', 'They dont work together', 'Solar sends power to car batteries only'], HIGH_SCHOOL: ['Capital cost, cycle life, round-trip efficiency, revenue opportunities, and financing terms', 'Only the purchase price', 'Nothing affects economics', 'Only government incentives'], UNDERGRADUATE: ['Storage earns capacity payments by guaranteeing availability during peak periods, with duration requirements typically 4+ hours', 'Capacity markets exclude storage', 'Only pays for energy delivered', 'No compensation available'], GRADUATE: ['NFPA 855 governs siting, UL 9540A tests thermal runaway propagation, and active suppression plus ventilation prevent cascading cell failures', 'No standards exist', 'Only applies to large systems', 'Fire risk is zero'], PHD: ['Quantum annealing and variational quantum eigensolvers explore exponentially large dispatch solution spaces for multi-storage portfolio optimization', 'Quantum computing is irrelevant', 'Classical computing is always sufficient', 'Only for battery chemistry'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A solar battery is a big battery in your house that stores extra solar energy from daytime so you can use it at night!', MIDDLE_SCHOOL: 'Solar panels charge the home battery during sunny hours; when the sun goes down, the battery powers your home instead of the grid.', HIGH_SCHOOL: 'Storage economics depend on capital cost ($/kWh), cycle life, round-trip efficiency, available revenue streams (arbitrage, demand charges, backup), and financing terms.', UNDERGRADUATE: 'Capacity markets pay storage for guaranteed availability during system peaks, typically requiring 4+ hour duration and offering fixed $/kW-year payments.', GRADUATE: 'NFPA 855 governs BESS siting and installation, UL 9540A tests thermal runaway propagation between cells, and engineered controls include gas detection, active suppression, and forced ventilation.', PHD: 'Quantum annealing maps multi-asset storage dispatch to QUBO formulations, potentially solving combinatorial scheduling problems with exponential classical complexity in polynomial quantum time.' } },
        { id: 'rstq10', question: { ELEMENTARY: 'Will batteries get cheaper in the future?', MIDDLE_SCHOOL: 'How fast are battery costs falling?', HIGH_SCHOOL: 'What is the learning rate for lithium-ion batteries?', UNDERGRADUATE: 'How do battery recycling economics affect the long-term sustainability of storage?', GRADUATE: 'What is the role of digital twins in optimizing battery storage operations?', PHD: 'How do multi-scale modeling approaches bridge atomistic battery research to system-level performance prediction?' }, options: { ELEMENTARY: ['Yes, they get cheaper every year!', 'No, they will get more expensive', 'They stay the same price', 'Nobody knows'], MIDDLE_SCHOOL: ['Battery costs have fallen over 90% since 2010 and continue dropping', 'Costs are going up', 'Costs havent changed', 'They change randomly'], HIGH_SCHOOL: ['Approximately 18-20% cost reduction per doubling of cumulative production', '0% - no learning', '50% per year', 'Costs increase with scale'], UNDERGRADUATE: ['Hydrometallurgical recycling can recover 95%+ of critical minerals, reducing virgin material dependence and improving lifecycle sustainability', 'Recycling is not economically viable', 'Only lead-acid can be recycled', 'Recycling produces more waste'], GRADUATE: ['Digital twins simulate real-time battery state, predict degradation trajectories, and optimize dispatch for maximum asset value', 'Digital twins are marketing only', 'Only for manufacturing', 'Cannot model degradation'], PHD: ['DFT calculations inform electrode kinetics, mesoscale models capture microstructural evolution, and system models predict pack-level degradation and performance', 'Only empirical testing works', 'Atomistic models are too slow', 'Single-scale models are sufficient'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Batteries keep getting cheaper and better every year, which means more clean energy storage for everyone!', MIDDLE_SCHOOL: 'Battery costs have dropped over 90% since 2010 — from over $1,100/kWh to under $140/kWh — and continue falling fast.', HIGH_SCHOOL: 'Li-ion batteries show an 18-20% learning rate — costs fall 18-20% each time cumulative production doubles, driven by manufacturing scale and chemistry improvements.', UNDERGRADUATE: 'Hydrometallurgical recycling achieves 95%+ recovery of lithium, cobalt, nickel, and manganese, creating a circular supply chain that improves long-term economics and sustainability.', GRADUATE: 'Digital twins integrate real-time sensor data with electrochemical models to estimate internal states, predict remaining useful life, and optimize dispatch for maximum lifetime revenue.', PHD: 'Multi-scale modeling bridges DFT-informed electrode kinetics to mesoscale microstructural evolution (phase-field) to macro cell models (P2D) to pack-level thermal-electrical models for predictive system design.' } }
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
    lessons: [{ id: 're-bio-1', title: 'Energy from Plants', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plant Power!</h2><p>Plants store energy from the sun. When we burn them or turn them into fuel, we release that energy!</p>', MIDDLE_SCHOOL: '<h2>Biomass Basics</h2><p>Biomass includes wood, crops, animal waste, and food scraps. These can be burned for heat or converted to biofuels.</p>', HIGH_SCHOOL: '<h2>Conversion Technologies</h2><p>Direct combustion, gasification, pyrolysis, and anaerobic digestion convert biomass to useful energy.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Biomass Energy Systems: Conversion Technologies, Supply Chains, and Lifecycle Analysis</h2>

<p>Biomass accounts for approximately 55 EJ of primary energy globally, making it the largest renewable energy source by total energy contribution. Modern bioenergy—distinct from traditional biomass burning—encompasses sophisticated conversion pathways that transform agricultural residues, forestry waste, energy crops, and municipal solid waste into electricity, heat, and transportation fuels. Understanding the engineering and economics of biomass systems requires analyzing the full supply chain from feedstock to final energy service.</p>

<h3>Biomass Conversion Technologies</h3>

<p>Four primary conversion pathways dominate commercial bioenergy:</p>

<table class="technical-table">
<thead>
<tr><th>Technology</th><th>Process</th><th>Products</th><th>Efficiency</th><th>Scale</th></tr>
</thead>
<tbody>
<tr><td>Direct combustion</td><td>Oxidation at 800-1000°C</td><td>Heat, steam, electricity</td><td>20-40% (elec), 80-90% (CHP)</td><td>1-500 MW</td></tr>
<tr><td>Gasification</td><td>Partial oxidation at 700-1200°C</td><td>Syngas (CO + H₂)</td><td>25-40% (elec), 70-80% (CHP)</td><td>1-100 MW</td></tr>
<tr><td>Pyrolysis</td><td>Thermal decomposition without O₂</td><td>Bio-oil, biochar, syngas</td><td>50-75% (energy in bio-oil)</td><td>0.1-50 MW</td></tr>
<tr><td>Anaerobic digestion</td><td>Microbial decomposition</td><td>Biogas (CH₄ + CO₂)</td><td>30-60% (of feedstock energy)</td><td>0.01-10 MW</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-bio-undergrad-q1">
<p>"Modern bioenergy, when sustainably sourced, can provide dispatchable renewable power and low-carbon fuels for hard-to-electrify sectors. The key challenge is ensuring feedstock sustainability across the full supply chain."</p>
<cite>— IEA, Net Zero by 2050: A Roadmap for the Global Energy Sector, 2021</cite>
</blockquote>

<h3>Supply Chain Engineering</h3>

<p>Biomass supply chains present unique logistical challenges due to the low energy density and distributed nature of feedstocks:</p>

<ul>
<li><strong>Feedstock density:</strong> Biomass has 10-18 GJ/tonne vs. 24-30 GJ/tonne for coal, requiring 2-3x more transport volume per unit energy</li>
<li><strong>Collection radius:</strong> Economic collection typically limited to 50-100 km; beyond this, transport costs dominate</li>
<li><strong>Seasonal availability:</strong> Agricultural residues are seasonal; year-round operation requires storage or diverse feedstock portfolios</li>
<li><strong>Preprocessing:</strong> Drying (moisture from 50% to 10-15%), chipping, pelletizing, and torrefaction improve energy density and handling</li>
<li><strong>Storage degradation:</strong> Biological decomposition, spontaneous combustion risk, and dry matter loss during storage require management</li>
</ul>

<h3>Economics and LCOE Analysis</h3>

<table class="technical-table">
<thead>
<tr><th>Bioenergy Type</th><th>LCOE ($/MWh)</th><th>Capacity Factor</th><th>Key Cost Driver</th></tr>
</thead>
<tbody>
<tr><td>Dedicated biomass power</td><td>$60-120</td><td>70-90%</td><td>Feedstock cost (40-60% of LCOE)</td></tr>
<tr><td>Biomass co-firing</td><td>$40-70</td><td>80-90%</td><td>Coal plant retrofit costs</td></tr>
<tr><td>Biogas (AD)</td><td>$80-150</td><td>60-90%</td><td>Feedstock collection and digester capital</td></tr>
<tr><td>Waste-to-energy</td><td>$70-130</td><td>85-95%</td><td>Emission controls and ash disposal</td></tr>
</tbody>
</table>

<h3>Lifecycle Emissions and Sustainability</h3>

<p>Biomass carbon accounting requires careful lifecycle analysis. While combustion releases CO₂, the net climate impact depends on regrowth rates, land use change, and supply chain emissions:</p>

<ul>
<li><strong>Carbon neutrality assumption:</strong> Valid only when biomass regrowth matches harvest rates over relevant timescales</li>
<li><strong>Supply chain emissions:</strong> Harvesting, transport, and processing add 10-30 gCO₂e/kWh to lifecycle emissions</li>
<li><strong>Land use change:</strong> Converting forests or grasslands to energy crops can create a carbon debt taking decades to repay</li>
<li><strong>Sustainability certification:</strong> Standards like SBP, FSC, and RSB verify sustainable sourcing practices</li>
</ul>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Biomass energy occupies a unique position in the renewable portfolio: it provides dispatchable power, can produce liquid fuels for hard-to-electrify sectors, and offers negative emission potential through BECCS. However, the sustainability of biomass supply chains requires rigorous lifecycle analysis and certification. Engineers must balance conversion efficiency, feedstock logistics, emissions accounting, and economic viability when designing bioenergy systems. The most promising applications leverage waste streams that would otherwise decompose and emit methane.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Bioenergy Systems: Biorefineries, BECCS, and the Role of Biomass in Deep Decarbonization</h2>

<p>As global energy systems pursue net-zero emissions, biomass transitions from a traditional fuel to a strategic feedstock enabling negative emissions and hard-to-abate sector decarbonization. Graduate-level analysis examines advanced biorefinery concepts, bioenergy with carbon capture and storage (BECCS), thermochemical and biochemical conversion optimization, and the complex sustainability governance frameworks that determine whether bioenergy delivers genuine climate benefits.</p>

<h3>Integrated Biorefinery Concepts</h3>

<p>Modern biorefineries apply the petroleum refinery concept to biomass, maximizing value extraction through multiple product streams:</p>

<table class="technical-table">
<thead>
<tr><th>Biorefinery Platform</th><th>Primary Feedstock</th><th>Key Products</th><th>TRL</th></tr>
</thead>
<tbody>
<tr><td>Sugar platform</td><td>Lignocellulosic biomass</td><td>Cellulosic ethanol, biochemicals, lignin co-products</td><td>7-8</td></tr>
<tr><td>Syngas platform</td><td>Mixed biomass/waste</td><td>Fischer-Tropsch fuels, methanol, DME, hydrogen</td><td>6-8</td></tr>
<tr><td>Pyrolysis platform</td><td>Woody biomass</td><td>Bio-oil, biochar, upgraded hydrocarbons</td><td>5-7</td></tr>
<tr><td>Algal platform</td><td>CO₂ + nutrients + light</td><td>Biodiesel, protein, nutraceuticals, bioplastics</td><td>4-6</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-bio-grad-q1">
<p>"Bioenergy with carbon capture and storage is one of few technologies capable of delivering net-negative emissions at scale. IPCC scenarios limiting warming to 1.5°C deploy 100-300 EJ/yr of bioenergy by 2050, with BECCS removing 2-10 GtCO₂/yr."</p>
<cite>— IPCC, Sixth Assessment Report, Working Group III: Mitigation of Climate Change, 2022</cite>
</blockquote>

<h3>BECCS: Engineering and Feasibility</h3>

<p>BECCS integrates biomass energy conversion with geological carbon storage, creating a net-negative emissions pathway:</p>

<ul>
<li><strong>Capture technologies:</strong> Post-combustion amine scrubbing (90% capture rate), oxy-combustion (>95%), pre-combustion via gasification with water-gas shift</li>
<li><strong>Energy penalty:</strong> CO₂ capture reduces net power output by 15-30%, increasing LCOE by $30-60/MWh</li>
<li><strong>Storage requirements:</strong> Geological storage in saline aquifers, depleted oil/gas reservoirs; requires characterization, monitoring, and long-term liability frameworks</li>
<li><strong>Scale constraints:</strong> Sustainable biomass availability limits BECCS to 2-5 GtCO₂/yr removal globally; land, water, and biodiversity constraints must be respected</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-bio-grad-q2">
<p>"The sustainability of large-scale bioenergy deployment depends critically on governance: robust certification systems, lifecycle accounting that captures indirect land use change, and integration with food security and biodiversity objectives."</p>
<cite>— Nature Climate Change, "Bioenergy and Land Use: Current Status and Governance Challenges," 2023</cite>
</blockquote>

<h3>Advanced Biofuel Pathways</h3>

<table class="technical-table">
<thead>
<tr><th>Fuel Pathway</th><th>Conversion Route</th><th>GHG Reduction vs. Fossil</th><th>Production Cost</th><th>Current Status</th></tr>
</thead>
<tbody>
<tr><td>Cellulosic ethanol</td><td>Enzymatic hydrolysis + fermentation</td><td>60-85%</td><td>$3-6/gallon</td><td>Early commercial</td></tr>
<tr><td>Renewable diesel (HVO)</td><td>Hydrotreating of fats/oils</td><td>50-80%</td><td>$3-5/gallon</td><td>Commercial scale</td></tr>
<tr><td>SAF (HEFA)</td><td>Hydroprocessed esters and fatty acids</td><td>50-80%</td><td>$4-8/gallon</td><td>Commercial, limited scale</td></tr>
<tr><td>SAF (Fischer-Tropsch)</td><td>Gasification + FT synthesis</td><td>80-95%</td><td>$6-12/gallon</td><td>Demonstration</td></tr>
<tr><td>Biomethane (RNG)</td><td>Anaerobic digestion + upgrading</td><td>70-200% (if displacing manure CH₄)</td><td>$15-30/MMBtu</td><td>Growing commercial</td></tr>
</tbody>
</table>

<h3>Sustainability Governance and Certification</h3>

<ul>
<li><strong>EU RED III:</strong> Renewable Energy Directive sets sustainability criteria including GHG saving thresholds, land use restrictions, and cascading use principles</li>
<li><strong>CORSIA:</strong> Carbon Offsetting and Reduction Scheme for International Aviation certifies SAF sustainability</li>
<li><strong>Indirect land use change (iLUC):</strong> Modeling approaches (GTAP, GLOBIOM) estimate emissions from market-mediated land conversion</li>
<li><strong>Carbon debt analysis:</strong> Time-dependent accounting reveals that some biomass pathways create decades-long carbon payback periods before achieving net benefit</li>
</ul>

<h3>Research Frontiers</h3>

<ul>
<li><strong>Synthetic biology:</strong> Engineering microorganisms for direct conversion of lignocellulose to fuels and chemicals without pretreatment</li>
<li><strong>Algal biofuels:</strong> Photobioreactor and open-pond systems achieving >50 g/m²/day productivity; techno-economic targets require $500/tonne biomass</li>
<li><strong>Biochar carbon removal:</strong> Slow pyrolysis produces stable carbon with >100-year residence time; co-benefits for soil health</li>
<li><strong>Power-to-X integration:</strong> Coupling biomass gasification with green hydrogen for enhanced fuel yields (>90% carbon utilization)</li>
</ul>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>The role of bioenergy in climate mitigation depends on resolving fundamental tensions between scale and sustainability. IPCC pathways rely heavily on BECCS for negative emissions, but global sustainable biomass potential is constrained by food security, biodiversity, water availability, and governance capacity. Graduate-level analysis requires systems thinking that integrates techno-economic assessment with lifecycle analysis, earth system modeling, and political economy. The most defensible bioenergy strategies prioritize waste feedstocks, avoid competition with food production, and implement rigorous monitoring of actual versus modeled climate benefits.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>BECCS (bioenergy with carbon capture), algal biofuels, and synthetic biology approaches.</p>' } }],
    activities: [{ id: 're-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Grow Fuel!', MIDDLE_SCHOOL: 'Biomass Sources', HIGH_SCHOOL: 'Conversion Pathways', UNDERGRADUATE: 'Supply Chain Design', GRADUATE: 'Lifecycle Analysis', PHD: 'Carbon Balance Model' }, description: { ELEMENTARY: 'See how plants become energy!', MIDDLE_SCHOOL: 'Match biomass sources to energy outputs.', HIGH_SCHOOL: 'Choose the best conversion technology for different feedstocks.', UNDERGRADUATE: 'Design an efficient biomass supply chain.', GRADUATE: 'Conduct a lifecycle analysis of biofuel systems.', PHD: 'Model carbon flows in bioenergy systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-bio-game', type: 'simulation', title: 'Bioenergy Manager', description: 'Manage a sustainable biomass energy system!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-bio-quiz', passingScore: 80, questions: [{ id: 'rbq1', question: { ELEMENTARY: 'What is biomass made from?', MIDDLE_SCHOOL: 'What process breaks down waste without oxygen?', HIGH_SCHOOL: 'Which conversion technology produces syngas?', UNDERGRADUATE: 'What is the main challenge for biomass supply chains?', GRADUATE: 'What does BECCS stand for?', PHD: 'What is a key advantage of algal biofuels?' }, options: { ELEMENTARY: ['Plants and organic waste', 'Rocks', 'Water', 'Metal'], MIDDLE_SCHOOL: ['Anaerobic digestion', 'Burning', 'Freezing', 'Drying'], HIGH_SCHOOL: ['Gasification', 'Direct combustion', 'Fermentation', 'Distillation'], UNDERGRADUATE: ['Collection and transportation costs', 'Too much supply', 'No technology exists', 'Unlimited land'], GRADUATE: ['Bioenergy with Carbon Capture and Storage', 'Basic Energy Carbon Capture System', 'Biomass Electricity Conversion Control', 'None of these'], PHD: ['High productivity per acre and no food competition', 'Low cost today', 'Simple harvesting', 'Works everywhere'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Biomass comes from plants, wood, crops, and organic waste - all things that once lived!', MIDDLE_SCHOOL: 'Anaerobic digestion breaks down organic matter without oxygen, producing biogas.', HIGH_SCHOOL: 'Gasification heats biomass with limited oxygen to produce syngas (synthesis gas).', UNDERGRADUATE: 'Biomass is bulky and expensive to collect and transport, affecting economics.', GRADUATE: 'BECCS combines bioenergy production with carbon capture for potential negative emissions.', PHD: 'Algae can produce far more biomass per acre than crops and do not compete with food production.' } }, { id: 'rbq2', question: { ELEMENTARY: 'What is biomass?', MIDDLE_SCHOOL: 'How can wood be used to make electricity?', HIGH_SCHOOL: 'What is the difference between biomass and biofuel?', UNDERGRADUATE: 'What are the net carbon implications of different biomass feedstocks?', GRADUATE: 'How does integrated gasification combined cycle improve biomass power efficiency?', PHD: 'What are the life-cycle GHG accounting controversies surrounding forest biomass for electricity?' }, options: { ELEMENTARY: ['Plants and organic waste that store energy', 'Rocks', 'Metal', 'Plastic'], MIDDLE_SCHOOL: ['By burning it to heat water and make steam for turbines', 'By freezing it', 'Wood cant make electricity', 'By painting it'], HIGH_SCHOOL: ['Biomass is the raw material; biofuel is processed fuel derived from biomass', 'They are the same thing', 'Biofuel comes from oil', 'Biomass is always liquid'], UNDERGRADUATE: ['Short-rotation crops are near carbon-neutral; forest residues depend on baseline and time horizon', 'All biomass is carbon-neutral', 'Biomass always increases carbon', 'Only corn matters'], GRADUATE: ['BIGCC gasifies biomass then burns syngas in gas+steam turbines achieving 35-45% efficiency vs 20-25% for direct combustion', 'No improvement', 'Only works with coal', 'Reduces efficiency'], PHD: ['Carbon debt, payback periods, counterfactual baselines, and forest carbon sink impacts are debated', 'No controversies exist', 'All biomass is zero-carbon', 'Only fossil fuels have GHG issues'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Biomass means plants, wood, food scraps, and other organic materials that contain stored energy from the sun!', MIDDLE_SCHOOL: 'Wood can be burned in a boiler to heat water into steam, which spins a turbine connected to a generator that produces electricity.', HIGH_SCHOOL: 'Biomass refers to raw organic materials (wood, crops, waste), while biofuel is a processed liquid or gaseous fuel derived from biomass (ethanol, biodiesel, biogas).', UNDERGRADUATE: 'Short-rotation energy crops can achieve near carbon neutrality, while forest biomass accounting depends on baseline assumptions, rotation periods, and whether harvest accelerates or merely utilizes forest carbon flux.', GRADUATE: 'Biomass IGCC gasifies feedstock into syngas, cleans it, then combusts in a gas turbine with waste heat recovery through a steam cycle, achieving 35-45% efficiency versus 20-25% for conventional direct combustion.', PHD: 'Forest biomass GHG accounting remains controversial: carbon debt from harvest, payback period assumptions (decades to centuries), counterfactual forest management baselines, and cumulative impact on forest carbon sinks divide policymakers and scientists.' } }, { id: 'rbq3', question: { ELEMENTARY: 'Can food scraps make energy?', MIDDLE_SCHOOL: 'What is biogas?', HIGH_SCHOOL: 'What crops are commonly used for bioenergy production?', UNDERGRADUATE: 'How does anaerobic digestion technology convert organic waste to energy?', GRADUATE: 'What are the sustainability criteria for biomass under EU RED III?', PHD: 'How do techno-economic assessments evaluate cellulosic ethanol pathways?' }, options: { ELEMENTARY: ['Yes! Food waste can be turned into biogas', 'No, food scraps are useless', 'Only meat can make energy', 'Only vegetables'], MIDDLE_SCHOOL: ['A gas made from decomposing organic waste', 'A type of natural gas from underground', 'Polluted air', 'A chemical weapon'], HIGH_SCHOOL: ['Corn, sugarcane, switchgrass, and miscanthus', 'Only wheat', 'Only rice', 'No crops are used'], UNDERGRADUATE: ['Microorganisms break down organic matter without oxygen producing methane-rich biogas', 'It uses sunlight', 'Burns the waste directly', 'Freezes organic matter'], GRADUATE: ['GHG savings thresholds, land-use criteria, biodiversity protection, and cascade use principles', 'No criteria exist', 'Only price matters', 'Any biomass qualifies'], PHD: ['TEA integrates pretreatment, enzymatic hydrolysis, fermentation, and separation costs against ethanol yield and co-product revenue', 'Only feedstock cost matters', 'No assessment needed', 'Only laboratory yields count'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Food scraps and other organic waste can be broken down by tiny organisms to produce biogas, which can generate electricity or heat.', MIDDLE_SCHOOL: 'Biogas is a mixture of methane and CO2 produced when organic materials decompose without oxygen (anaerobic digestion).', HIGH_SCHOOL: 'Common bioenergy crops include corn and sugarcane (for ethanol), soybeans and canola (for biodiesel), and dedicated energy crops like switchgrass and miscanthus (for cellulosic biofuels).', UNDERGRADUATE: 'Anaerobic digestion uses consortia of microorganisms to break down organic matter in oxygen-free conditions through hydrolysis, acidogenesis, acetogenesis, and methanogenesis, producing 50-70% methane biogas.', GRADUATE: 'EU RED III requires biomass to demonstrate 70-80% GHG savings vs fossil fuels, comply with land-use change criteria, protect high-biodiversity areas, and follow the cascade use principle prioritizing material over energy use.', PHD: 'TEA for cellulosic ethanol models integrated costs of pretreatment (dilute acid, steam explosion), enzymatic saccharification, co-fermentation (C5+C6 sugars), and downstream separation against achievable yields and lignin co-product revenue.' } }, { id: 'rbq4', question: { ELEMENTARY: 'Do plants store energy from the sun?', MIDDLE_SCHOOL: 'What is the difference between first and second generation biofuels?', HIGH_SCHOOL: 'How efficient is biomass electricity generation compared to fossil fuels?', UNDERGRADUATE: 'What is the food vs fuel debate in bioenergy?', GRADUATE: 'How do torrefaction and pelletization improve biomass logistics and combustion properties?', PHD: 'What are the catalytic pathways for biomass-to-aviation fuel conversion?' }, options: { ELEMENTARY: ['Yes! Plants capture sunlight through photosynthesis', 'No, plants dont use energy', 'Only flowers store energy', 'Only trees'], MIDDLE_SCHOOL: ['First gen uses food crops; second gen uses non-food biomass like wood and crop residues', 'No difference', 'First gen is newer', 'Second gen uses coal'], HIGH_SCHOOL: ['Biomass is 20-35% efficient; less than fossil fuels but uses renewable fuel', 'More efficient than fossil fuels', 'They are exactly the same', 'Biomass is 0% efficient'], UNDERGRADUATE: ['Using food crops for fuel may raise food prices and compete for agricultural land', 'There is no debate', 'Fuel always comes first', 'Only affects rich countries'], GRADUATE: ['Torrefaction removes moisture and increases energy density; pelletization standardizes handling', 'No improvement', 'Only for appearance', 'Makes biomass worse'], PHD: ['Fischer-Tropsch, hydrothermal liquefaction, and alcohol-to-jet convert biomass to sustainable aviation fuel', 'No pathways exist', 'Only blending with kerosene', 'Only hydrogen routes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Through photosynthesis, plants capture sunlight and store it as chemical energy in their leaves, stems, and roots.', MIDDLE_SCHOOL: 'First-generation biofuels use food crops (corn ethanol, soy biodiesel). Second-generation uses non-food lignocellulosic biomass (wood chips, crop residues, switchgrass) avoiding food competition.', HIGH_SCHOOL: 'Dedicated biomass power plants achieve 20-35% electrical efficiency, lower than coal or gas, but the fuel is renewable and can be carbon-neutral when sustainably sourced.', UNDERGRADUATE: 'The food vs fuel debate centers on whether dedicating cropland to bioenergy raises food commodity prices, displaces smallholder agriculture, and drives indirect land-use change with associated carbon emissions.', GRADUATE: 'Torrefaction (250-300C, oxygen-free) reduces moisture to <5%, increases energy density to 20-23 MJ/kg (approaching coal), and improves grindability. Pelletization compresses bulk density from 100 to 600-700 kg/m3 for efficient transport.', PHD: 'SAF pathways include Fischer-Tropsch synthesis from biomass gasification syngas, hydrothermal liquefaction of wet biomass to biocrude, and alcohol-to-jet conversion of ethanol/isobutanol to drop-in jet fuel meeting ASTM D7566 specifications.' } }, { id: 'rbq5', question: { ELEMENTARY: 'What is wood pellet fuel?', MIDDLE_SCHOOL: 'Can we make fuel for cars from plants?', HIGH_SCHOOL: 'What are the environmental risks of large-scale biomass plantations?', UNDERGRADUATE: 'How does biomass co-firing in coal plants contribute to decarbonization?', GRADUATE: 'What role does BECCS play in negative emissions scenarios?', PHD: 'How do lignin valorization strategies improve the economics of integrated biorefineries?' }, options: { ELEMENTARY: ['Compressed wood pieces used for heating', 'Tiny wooden toys', 'Painted wood chips', 'Sawdust'], MIDDLE_SCHOOL: ['Yes, ethanol and biodiesel come from plants', 'No, cars only use gasoline', 'Only electric cars use plants', 'Only trucks can use plant fuel'], HIGH_SCHOOL: ['Monoculture reduces biodiversity, water depletion, soil degradation, and land-use change emissions', 'No environmental risks', 'Plantations improve everything', 'Only water use is affected'], UNDERGRADUATE: ['Co-firing 5-20% biomass displaces coal emissions with minimal plant modification', 'Co-firing increases emissions', 'Only works at 100% biomass', 'Coal plants cannot burn biomass'], GRADUATE: ['Bioenergy with carbon capture achieves net negative emissions by permanently sequestering biogenic CO2', 'BECCS adds emissions', 'Carbon capture does not work with biomass', 'Only for natural gas'], PHD: ['Converting lignin to chemicals, carbon fiber, or BTX adds $50-150/ton revenue beyond combustion value', 'Lignin has no value', 'Only burn lignin', 'Lignin cannot be processed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wood pellets are small, compressed pieces of wood used as fuel for heating stoves and power plants. They burn cleanly and efficiently.', MIDDLE_SCHOOL: 'Yes! Ethanol is made from corn or sugarcane, and biodiesel from soybeans or canola. These biofuels can power cars and trucks.', HIGH_SCHOOL: 'Large-scale biomass plantations risk monoculture biodiversity loss, excessive water consumption, soil nutrient depletion, and indirect land-use change emissions that can negate climate benefits.', UNDERGRADUATE: 'Co-firing 5-20% biomass in existing coal plants displaces fossil CO2 emissions with biogenic carbon at low capital cost, serving as a transitional decarbonization strategy while dedicated biomass or renewable capacity is built.', GRADUATE: 'BECCS combines biomass energy with CO2 capture and geological storage, achieving net negative emissions since the biomass absorbed atmospheric CO2 during growth and that CO2 is permanently sequestered. Most 1.5C pathways require 2-10 GtCO2/yr of BECCS.', PHD: 'Lignin valorization through catalytic depolymerization to aromatic chemicals, carbon fiber precursors, or BTX (benzene, toluene, xylene) adds $50-150/ton revenue beyond combustion heat value, transforming biorefinery economics.' } }, { id: 'rbq6', question: { ELEMENTARY: 'Is burning biomass bad for the air?', MIDDLE_SCHOOL: 'How much of the worlds energy comes from biomass?', HIGH_SCHOOL: 'What is pyrolysis?', UNDERGRADUATE: 'How do waste-to-energy facilities handle emission control for municipal solid waste combustion?', GRADUATE: 'What are the mass and energy balances for commercial-scale anaerobic digestion systems?', PHD: 'How do consolidated bioprocessing organisms simplify cellulosic ethanol production?' }, options: { ELEMENTARY: ['It makes some smoke but is better than fossil fuels when managed well', 'No smoke at all', 'Worse than all fossil fuels', 'It cleans the air'], MIDDLE_SCHOOL: ['About 10% of global primary energy', 'Less than 1%', 'About 90%', 'Exactly 50%'], HIGH_SCHOOL: ['Heating biomass without oxygen to produce bio-oil, syngas, and biochar', 'A type of volcano', 'Burning biomass in air', 'Freezing organic matter'], UNDERGRADUATE: ['Multi-stage flue gas treatment: SCR for NOx, scrubbers for acid gases, activated carbon for dioxins, and baghouse filters', 'No emission controls needed', 'Only water spray', 'Just a tall chimney'], GRADUATE: ['Typical yields: 200-400 m3 biogas per ton VS with 50-60% methane; 30-50% energy conversion efficiency', 'No measurable yields', '100% conversion efficiency', 'Only methane is produced'], PHD: ['CBP organisms perform enzyme production, cellulose hydrolysis, and fermentation in one step reducing cost', 'No simplification possible', 'Only for starch crops', 'CBP reduces yield'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Burning biomass does produce smoke and particles, but modern biomass plants use filters and scrubbers. When new plants grow to replace harvested ones, the CO2 is reabsorbed.', MIDDLE_SCHOOL: 'Biomass provides about 10% of global primary energy, mostly traditional cooking and heating in developing countries, with growing modern applications.', HIGH_SCHOOL: 'Pyrolysis heats biomass to 300-700C without oxygen, producing bio-oil (liquid fuel), syngas (combustible gas), and biochar (solid carbon) in varying proportions depending on temperature and residence time.', UNDERGRADUATE: 'Modern waste-to-energy uses selective catalytic reduction (SCR) for NOx, wet/dry scrubbers for HCl/SO2, activated carbon injection for dioxins/mercury, and fabric filter baghouses achieving emissions well below regulatory limits.', GRADUATE: 'Commercial AD systems typically yield 200-400 m3 biogas per ton of volatile solids at 50-60% methane content, with overall energy conversion efficiency of 30-50% when accounting for parasitic loads and digestate handling.', PHD: 'Consolidated bioprocessing uses engineered microorganisms (e.g., Clostridium thermocellum) that produce cellulase enzymes, hydrolyze cellulose, and ferment sugars in a single reactor, eliminating costly external enzyme addition.' } }, { id: 'rbq7', question: { ELEMENTARY: 'What is compost?', MIDDLE_SCHOOL: 'What is carbon neutral?', HIGH_SCHOOL: 'What is the energy density of wood compared to coal?', UNDERGRADUATE: 'How do sustainability certification schemes ensure responsible biomass sourcing?', GRADUATE: 'What are the process integration strategies for maximizing energy recovery in pulp and paper biorefineries?', PHD: 'How do synthetic biology approaches engineer microorganisms for advanced biofuel production?' }, options: { ELEMENTARY: ['Decomposed food and yard waste that becomes soil fertilizer', 'A type of computer', 'Burnt plastic', 'Rock dust'], MIDDLE_SCHOOL: ['When something releases only as much carbon as it absorbed', 'Zero energy use', 'No carbon at all', 'Only using wind power'], HIGH_SCHOOL: ['Wood has about half the energy density of coal per kilogram', 'Wood has more energy than coal', 'They are exactly equal', 'Coal has less energy'], UNDERGRADUATE: ['Third-party audits verify chain of custody, GHG savings, and land-use criteria compliance', 'No certification exists', 'Only price certification', 'Self-reporting is sufficient'], GRADUATE: ['Pinch analysis and heat integration maximize steam and electricity co-generation from black liquor and bark', 'No strategies exist', 'Only burn all waste', 'Electricity only'], PHD: ['Metabolic engineering and directed evolution create pathways for fatty acid-derived diesel, isoprenoid jet fuel, and higher alcohols', 'Synthetic biology is not used', 'Only natural organisms work', 'Only for pharmaceuticals'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Compost is made when food scraps, leaves, and yard waste break down naturally into nutrient-rich soil that helps gardens grow.', MIDDLE_SCHOOL: 'Carbon neutral means a process releases only as much CO2 as was absorbed during growth, resulting in no net increase in atmospheric carbon.', HIGH_SCHOOL: 'Wood has an energy density of about 15-20 MJ/kg compared to coals 24-35 MJ/kg, meaning you need more wood by weight to produce the same energy.', UNDERGRADUATE: 'Schemes like FSC, SBP, and ISCC provide third-party chain-of-custody audits verifying sustainable forest management, GHG savings calculations, and compliance with land-use and biodiversity criteria.', GRADUATE: 'Pulp mill biorefineries use pinch analysis to optimize heat exchanger networks, gasify black liquor for combined cycle power, and extract hemicelluloses for fermentation while maintaining pulp quality and maximizing overall energy recovery.', PHD: 'Synthetic biology engineers metabolic pathways in microorganisms for advanced biofuels: fatty acid synthase modifications for diesel-range hydrocarbons, mevalonate pathway optimization for isoprenoid jet fuels, and keto-acid pathways for branched-chain alcohols.' } }, { id: 'rbq8', question: { ELEMENTARY: 'Can animal waste make energy?', MIDDLE_SCHOOL: 'What is algae biofuel?', HIGH_SCHOOL: 'How does biomass gasification differ from combustion?', UNDERGRADUATE: 'What policy mechanisms support biomass energy deployment?', GRADUATE: 'How do spatially-explicit supply chain models optimize biomass logistics?', PHD: 'What are the thermochemical conversion pathways for producing drop-in hydrocarbon fuels from lignocellulose?' }, options: { ELEMENTARY: ['Yes! Manure can produce biogas', 'No, only plants make energy', 'Only horse manure', 'It is too smelly'], MIDDLE_SCHOOL: ['Fuel made from tiny water plants called algae', 'Gas from seaweed', 'Diesel from fish', 'Oil from coral'], HIGH_SCHOOL: ['Gasification converts biomass to syngas at high temperature with limited oxygen; combustion fully burns it', 'No difference', 'Gasification is cooler', 'Combustion makes gas too'], UNDERGRADUATE: ['Renewable portfolio standards, feed-in tariffs, carbon pricing, and blending mandates', 'No policy support exists', 'Only tax breaks', 'Only in Europe'], GRADUATE: ['GIS-based models optimize feedstock sourcing, depot placement, and transport routing to minimize delivered cost', 'Location does not matter', 'Only distance matters', 'Random sourcing is fine'], PHD: ['Fast pyrolysis to bio-oil then hydrotreating, or gasification to syngas then Fischer-Tropsch synthesis', 'No pathways exist', 'Only fermentation', 'Only direct combustion'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Animal manure from farms can be put in special tanks called digesters where bacteria break it down to produce biogas for electricity and heating.', MIDDLE_SCHOOL: 'Algae biofuel comes from microscopic algae that can produce oils much faster per acre than traditional crops, potentially yielding 10-100x more fuel per hectare.', HIGH_SCHOOL: 'Gasification converts biomass to synthesis gas (CO + H2) at 700-1000C with limited oxygen for use as fuel or chemical feedstock, while combustion fully oxidizes biomass releasing heat for steam generation.', UNDERGRADUATE: 'Biomass energy is supported by renewable portfolio standards (qualifying biomass), feed-in tariffs, carbon pricing (biogenic carbon credits), blending mandates (RFS ethanol requirements), and tax incentives.', GRADUATE: 'Spatially-explicit supply chain models integrate GIS-based feedstock availability, road network distances, depot/preprocessing facility placement, and seasonal availability to minimize delivered feedstock cost at the biorefinery gate.', PHD: 'Drop-in hydrocarbon routes include fast pyrolysis producing bio-oil followed by catalytic hydrodeoxygenation, and gasification producing syngas followed by Fischer-Tropsch synthesis, both yielding fuels compatible with existing infrastructure.' } }] },
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
    lessons: [{ id: 're-ocean-1', title: 'Power from the Sea', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Ocean Power!</h2><p>The ocean is always moving - waves crash, tides rise and fall. We can capture this motion to make electricity!</p>', MIDDLE_SCHOOL: '<h2>Types of Ocean Energy</h2><p>Wave energy uses surface motion. Tidal energy uses predictable water flow. Ocean thermal uses temperature differences.</p>', HIGH_SCHOOL: '<h2>Ocean Energy Technologies</h2><p>Point absorbers, oscillating water columns, attenuators for waves. Tidal barrages, stream turbines, and lagoons for tides.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Ocean Energy Systems: Wave, Tidal, and OTEC Resource Engineering</h2>

<p>The world's oceans contain approximately 32,000 TWh/year of extractable wave energy and 1,200 TWh/year of tidal energy. Despite this potential, ocean energy remains at an early commercial stage with approximately 535 MW of tidal and under 3 MW of wave capacity installed globally. Understanding resource assessment, device engineering, and deployment challenges is essential.</p>

<h3>Wave Energy Resource Quantification</h3>

<p>Wave power density is governed by:</p>
<code>P = (ρ × g² × H²s × Te) / (64π) ≈ 0.49 × H²s × Te (kW/m)</code>

<p>Where Hs is significant wave height (m) and Te is energy period (s).</p>

<table class="technical-table">
<thead><tr><th>Region</th><th>Wave Power (kW/m)</th><th>Variability</th><th>Status</th></tr></thead>
<tbody>
<tr><td>North Atlantic (Scotland)</td><td>40-75</td><td>High seasonal</td><td>EMEC test site active</td></tr>
<tr><td>Pacific Northwest (US)</td><td>30-50</td><td>Moderate</td><td>PacWave under development</td></tr>
<tr><td>Southern Ocean (Chile, Australia)</td><td>50-80</td><td>Relatively stable</td><td>Early demonstration</td></tr>
<tr><td>North Sea</td><td>20-40</td><td>Moderate</td><td>Multiple test sites</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ocean-undergrad-q1">
<p>"Ocean energy offers predictable, high-capacity-factor renewable generation. Tidal resources offer near-perfect predictability decades in advance, while wave energy provides seasonal complementarity with solar and wind."</p>
<cite>— European Commission, Strategic Energy Technology Plan: Ocean Energy, 2023</cite>
</blockquote>

<h3>Wave Energy Converter Technologies</h3>
<ul>
<li><strong>Point absorbers:</strong> Floating buoys using hydraulic or linear generators to capture heave motion (CorPower, Carnegie CETO)</li>
<li><strong>Oscillating water columns (OWC):</strong> Air compressed by waves drives Wells turbines; bidirectional airflow operation (Mutriku, Spain)</li>
<li><strong>Overtopping devices:</strong> Waves fill elevated reservoirs draining through low-head turbines (Wave Dragon)</li>
<li><strong>Oscillating wave surge converters:</strong> Near-shore flaps capture surge motion (Aquamarine Oyster)</li>
</ul>

<h3>Tidal Energy Systems</h3>
<table class="technical-table">
<thead><tr><th>Technology</th><th>Mechanism</th><th>Capacity Factor</th><th>Key Projects</th></tr></thead>
<tbody>
<tr><td>Tidal barrage</td><td>Dam across estuary</td><td>25-30%</td><td>La Rance (240 MW), Sihwa (254 MW)</td></tr>
<tr><td>Tidal stream turbine</td><td>Horizontal-axis rotor</td><td>25-40%</td><td>MeyGen (6 MW, Scotland)</td></tr>
<tr><td>Tidal kite</td><td>Underwater figure-8 kite</td><td>30-40%</td><td>Minesto Deep Green</td></tr>
</tbody>
</table>

<h3>OTEC (Ocean Thermal Energy Conversion)</h3>
<p>OTEC uses the 20-25°C temperature differential between surface and deep water via a Rankine cycle. Theoretical Carnot efficiency is 6-7%, but tropical ocean thermal mass enables baseload generation. NREL estimates global potential at 7,000 TWh/year with current LCOE of $150-300/MWh.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Ocean energy faces the fundamental challenge of operating in the most corrosive, dynamic, and inaccessible environment on Earth. Devices must survive 100-year storms, resist biofouling, and operate with minimal maintenance. The path to viability depends on sufficient reliability and array-scale deployment to drive learning rates similar to offshore wind's trajectory from $200/MWh to under $50/MWh over two decades.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Ocean Energy: Hydrodynamic Optimization, Array Design, and Marine Integration</h2>

<p>Ocean energy represents one of the last major untapped renewable resources. Graduate analysis examines hydrodynamic theory underlying wave energy capture, array optimization and interaction effects, advanced tidal stream engineering, and marine spatial planning frameworks for responsible deployment.</p>

<h3>Wave Energy Capture Theory</h3>
<p>The theoretical maximum absorption of a heaving point absorber (Budal-Falnes limit):</p>
<code>P_max = (λ / 2π) × P_w — capturing energy from a front wider than device diameter</code>

<p>Achieving this requires complex-conjugate control matching device velocity to wave excitation force, demanding reactive power flow and facing practical stroke/force constraints.</p>

<blockquote class="scavenger-quote" data-quote-id="re-ocean-grad-q1">
<p>"The fundamental challenge in wave energy is not the theoretical capture width but achieving reliable reactive control in irregular seas while surviving extreme loads that exceed operational forces by an order of magnitude."</p>
<cite>— Renewable and Sustainable Energy Reviews, "Wave Energy Technology Review," 2023</cite>
</blockquote>

<h3>Advanced Control Strategies</h3>
<table class="technical-table">
<thead><tr><th>Control Strategy</th><th>Mechanism</th><th>Energy Gain vs Passive</th><th>Challenge</th></tr></thead>
<tbody>
<tr><td>Latching control</td><td>Lock at extreme position, release in phase</td><td>50-200%</td><td>Wave prediction; impulse loads</td></tr>
<tr><td>Declutching</td><td>Disengage PTO at optimal phases</td><td>30-100%</td><td>Less aggressive; simpler implementation</td></tr>
<tr><td>Model predictive (MPC)</td><td>Optimize PTO trajectory over prediction horizon</td><td>100-300%</td><td>Real-time wave forecasting</td></tr>
<tr><td>Reinforcement learning</td><td>AI-learned policy from wave interactions</td><td>50-200%</td><td>Training convergence; generalization</td></tr>
</tbody>
</table>

<h3>Array Layout Optimization</h3>
<p>Array interaction is quantified by the q-factor: q = P_array / (N × P_isolated). Optimal spacing creates constructive wave interference achieving q > 1. Genetic algorithms and adjoint methods optimize layout against irregular sea states and multiple objectives.</p>

<blockquote class="scavenger-quote" data-quote-id="re-ocean-grad-q2">
<p>"Model predictive control with deterministic sea wave prediction using upstream sensors can increase wave energy capture by 100-300% compared to passive damping, fundamentally changing device economics."</p>
<cite>— IEEE Transactions on Sustainable Energy, "Optimal Control of Wave Energy Converters," 2022</cite>
</blockquote>

<h3>Marine Environmental Assessment</h3>
<table class="technical-table">
<thead><tr><th>Impact</th><th>Mechanism</th><th>Monitoring</th><th>Mitigation</th></tr></thead>
<tbody>
<tr><td>Marine mammals</td><td>Collision, noise, EMF</td><td>PAM, visual surveys, tagging</td><td>Shutdown protocols, acoustic deterrents</td></tr>
<tr><td>Benthic habitat</td><td>Anchoring, scour</td><td>ROV surveys, grab sampling</td><td>Habitat-enhancing foundation design</td></tr>
<tr><td>Sediment transport</td><td>Altered wave/current patterns</td><td>Acoustic profiling</td><td>Array layout respecting corridors</td></tr>
</tbody>
</table>

<h3>Tidal Stream Advanced Topics</h3>
<ul>
<li><strong>Turbulence:</strong> Tidal flows contain 10-20% turbulence intensity causing fatigue; ADP measurements inform structural models</li>
<li><strong>Blockage effects:</strong> Array extraction >10% of channel energy may alter upstream water levels requiring environmental assessment</li>
<li><strong>Floating platforms:</strong> Orbital Marine O2 (2 MW) demonstrates cost reduction through simplified installation and maintenance</li>
</ul>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Ocean energy research spans hydrodynamics, structural engineering, marine ecology, and control theory. Unlike wind energy which converged on a dominant three-blade design early, wave energy remains in a pre-convergence phase. Success requires standardized testing protocols, multi-technology test sites, and financial instruments that share technology risk between public and private sectors during the critical transition from demonstration to commercial arrays.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Array optimization, power take-off systems, materials science for marine conditions.</p>' } }],
    activities: [{ id: 're-ocean-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Catch the Waves!', MIDDLE_SCHOOL: 'Tidal Power', HIGH_SCHOOL: 'Device Selection', UNDERGRADUATE: 'Site Assessment', GRADUATE: 'Array Planning', PHD: 'Hydrodynamic Modeling' }, description: { ELEMENTARY: 'See how waves can power lights!', MIDDLE_SCHOOL: 'Harness the rising and falling tides for power.', HIGH_SCHOOL: 'Select the right device for different ocean conditions.', UNDERGRADUATE: 'Assess a site for ocean energy potential.', GRADUATE: 'Plan a marine energy array with environmental considerations.', PHD: 'Model wave-device-wave interactions in arrays.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ocean-game', type: 'simulation', title: 'Ocean Energy Pioneer', description: 'Build and operate ocean energy systems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ocean-quiz', passingScore: 80, questions: [{ id: 'roq1', question: { ELEMENTARY: 'What makes waves in the ocean?', MIDDLE_SCHOOL: 'What causes tides?', HIGH_SCHOOL: 'What is an oscillating water column?', UNDERGRADUATE: 'What determines wave power?', GRADUATE: 'What is a major deployment challenge for ocean energy?', PHD: 'What is array interaction in wave energy?' }, options: { ELEMENTARY: ['Wind blowing on water', 'Fish swimming', 'Boats moving', 'Rocks falling'], MIDDLE_SCHOOL: ['The moon\'s gravity', 'Wind', 'Earthquakes', 'Temperature'], HIGH_SCHOOL: ['A wave device using air compression', 'A type of submarine', 'A water pipe', 'An ocean current'], UNDERGRADUATE: ['Wave height and period', 'Water temperature only', 'Ocean color', 'Fish population'], GRADUATE: ['Harsh marine environment', 'Too much energy', 'Too many locations', 'Low costs'], PHD: ['How devices affect waves reaching other devices', 'Fish swimming patterns', 'Boat traffic', 'Temperature changes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wind blowing across the ocean surface creates waves!', MIDDLE_SCHOOL: 'The moon\'s gravitational pull creates the predictable rise and fall of tides.', HIGH_SCHOOL: 'An OWC captures waves in a chamber, compressing air to drive a turbine.', UNDERGRADUATE: 'Wave power is proportional to wave height squared and wave period.', GRADUATE: 'Surviving storms, biofouling, and maintenance in the ocean environment are major challenges.', PHD: 'Array interaction describes how energy extraction by one device affects wave energy available to others.' } }, { id: 'roq2', question: { ELEMENTARY: 'Can ocean waves make electricity?', MIDDLE_SCHOOL: 'How do tidal turbines work?', HIGH_SCHOOL: 'What is the global theoretical potential of ocean energy?', UNDERGRADUATE: 'How do oscillating water column devices convert wave energy to electricity?', GRADUATE: 'What are the survivability challenges for wave energy converters in extreme sea states?', PHD: 'How do spectral wave models inform the design of resonant wave energy converters?' }, options: { ELEMENTARY: ['Yes! Wave energy converters capture wave motion', 'No, waves are too weak', 'Only tsunamis can', 'Waves only make sand'], MIDDLE_SCHOOL: ['Like underwater windmills powered by tidal currents', 'They spin from waves', 'They use diesel engines', 'They float on top'], HIGH_SCHOOL: ['Estimated at thousands of TWh per year globally', 'Almost zero', 'Only 1 MWh', 'More than all energy used'], UNDERGRADUATE: ['Air is pushed through a turbine as waves cause water to rise and fall in a chamber', 'They boil seawater', 'They use solar panels underwater', 'They filter salt'], GRADUATE: ['Extreme loads from 100-year waves require over-engineering or adaptive survival modes that increase cost', 'No challenges', 'Waves are always gentle', 'Only corrosion matters'], PHD: ['Wave spectra characterize energy distribution across frequencies and directions for tuning device natural frequency', 'Only wave height matters', 'Spectra are not used', 'Only tidal models work'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Special machines called wave energy converters capture the up-and-down motion of ocean waves and turn it into electricity.', MIDDLE_SCHOOL: 'Tidal turbines work like underwater windmills, spinning as strong tidal currents flow past their blades to generate electricity.', HIGH_SCHOOL: 'Ocean energy (waves, tides, currents, thermal, salinity gradient) has a theoretical potential of thousands of TWh/year, though practically extractable resources are a fraction of this.', UNDERGRADUATE: 'OWC devices use wave-driven water level oscillations in a partially submerged chamber to push and pull air through a Wells or impulse turbine that spins in both directions.', GRADUATE: 'WECs must survive 100-year storm loads 10-100x greater than operating conditions, requiring either massive structural over-design or adaptive survival modes (submergence, de-tuning) that add cost and complexity.', PHD: 'Spectral wave models (e.g., SWAN, WaveWatch III) provide directional wave spectra that inform the design of resonant WECs by matching device natural frequency to peak spectral periods at the deployment site.' } }, { id: 'roq3', question: { ELEMENTARY: 'What are tides?', MIDDLE_SCHOOL: 'What is ocean thermal energy conversion?', HIGH_SCHOOL: 'What is the difference between tidal range and tidal stream energy?', UNDERGRADUATE: 'How do marine spatial planning frameworks address conflicts between ocean energy and other sea users?', GRADUATE: 'What are the hydrodynamic interaction effects in arrays of wave energy converters?', PHD: 'How do bio-fouling mitigation strategies affect the levelized cost of ocean energy?' }, options: { ELEMENTARY: ['The regular rise and fall of the ocean caused by the moon', 'Wind pushing water', 'Fish swimming together', 'Underwater earthquakes'], MIDDLE_SCHOOL: ['Using temperature differences between warm surface and cold deep water', 'Heating the ocean', 'Freezing ocean water', 'Using ocean salt for fuel'], HIGH_SCHOOL: ['Tidal range uses height difference in barrages; tidal stream uses current flow through turbines', 'They are the same', 'Range uses turbines only', 'Stream uses dams only'], UNDERGRADUATE: ['MSP balances energy development with fishing, shipping, conservation, and defense through zoning', 'No planning needed', 'Only energy matters', 'Conflicts cannot be resolved'], GRADUATE: ['Constructive and destructive interference between devices affects array power capture by 5-20%', 'No interaction effects', 'Arrays always improve output', 'Only spacing matters'], PHD: ['Anti-fouling coatings, materials selection, and maintenance scheduling add 5-15% to LCOE but are essential for performance', 'Bio-fouling is not an issue', 'Only paint is needed', 'Fouling improves performance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Tides are the regular rise and fall of ocean water levels caused by the gravitational pull of the moon and sun on Earth.', MIDDLE_SCHOOL: 'OTEC uses the temperature difference between warm tropical surface water (~25C) and cold deep water (~5C) to run a heat engine and generate electricity.', HIGH_SCHOOL: 'Tidal range energy captures potential energy from water level differences using barrages or lagoons, while tidal stream energy extracts kinetic energy from flowing tidal currents using submerged turbines.', UNDERGRADUATE: 'Marine spatial planning uses stakeholder engagement and GIS-based zoning to balance ocean energy lease areas with fishing grounds, shipping lanes, marine protected areas, military operations, and subsea cables.', GRADUATE: 'Hydrodynamic interactions in WEC arrays create constructive and destructive interference patterns that can increase or decrease power capture by 5-20% depending on device spacing, wave direction, and array layout optimization.', PHD: 'Bio-fouling mitigation through anti-fouling coatings, cathodic protection, copper-nickel alloys, and scheduled maintenance adds 5-15% to LCOE but is essential to maintain hydrodynamic performance and structural integrity in marine environments.' } }, { id: 'roq4', question: { ELEMENTARY: 'Do underwater turbines look like wind turbines?', MIDDLE_SCHOOL: 'How predictable is tidal energy compared to wind?', HIGH_SCHOOL: 'What materials withstand the harsh marine environment for ocean energy devices?', UNDERGRADUATE: 'How do tidal lagoon projects differ from traditional tidal barrages environmentally?', GRADUATE: 'What numerical modeling approaches capture wave-structure interaction for WEC design?', PHD: 'How does salinity gradient energy (osmotic power) work and what are its development barriers?' }, options: { ELEMENTARY: ['Yes, they look similar but are underwater', 'No, they look like boats', 'They are square', 'They have no blades'], MIDDLE_SCHOOL: ['Very predictable because tides follow lunar cycles', 'Completely unpredictable', 'Less predictable than wind', 'Only predictable on weekends'], HIGH_SCHOOL: ['Marine-grade steel, composites, and specialized anti-corrosion coatings', 'Regular household materials', 'Only plastic', 'Wood and rope'], UNDERGRADUATE: ['Lagoons have smaller impoundment footprint and allow fish passage, reducing ecological disruption', 'No difference', 'Lagoons are worse', 'Barrages are smaller'], GRADUATE: ['CFD with free-surface tracking (VOF, SPH) coupled with structural FEA captures nonlinear wave-body dynamics', 'Simple spreadsheets', 'Only physical tank tests', 'CFD does not work for waves'], PHD: ['PRO or RED membranes extract energy from salinity difference between river and seawater; membrane cost and fouling are key barriers', 'Salt cannot produce energy', 'Only works in space', 'No barriers exist'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Tidal turbines look a lot like wind turbines but they work underwater, using flowing tidal currents instead of wind.', MIDDLE_SCHOOL: 'Tidal energy is highly predictable because tides follow precise lunar and solar gravitational cycles, enabling accurate power forecasting years in advance, unlike variable wind or solar resources.', HIGH_SCHOOL: 'Ocean energy devices use marine-grade stainless steel, fiber-reinforced polymer composites, concrete, and specialized anti-corrosion coatings and cathodic protection systems to withstand saltwater, wave loads, and marine growth.', UNDERGRADUATE: 'Tidal lagoons impound smaller areas than full-estuary barrages, allow bidirectional fish passage through low-head turbines, and maintain partial tidal exchange, significantly reducing ecological disruption compared to traditional barrages.', GRADUATE: 'Wave-structure interaction modeling uses CFD with free-surface methods (Volume of Fluid, SPH) coupled to structural FEA to capture nonlinear wave loads, resonant response, power take-off dynamics, and mooring forces.', PHD: 'Pressure-retarded osmosis (PRO) and reverse electrodialysis (RED) extract energy from the Gibbs free energy of mixing between fresh and salt water. Development barriers include membrane cost ($2-5/m2 target), fouling, and low power density (<5 W/m2).' } }, { id: 'roq5', question: { ELEMENTARY: 'Can we get energy from the temperature of the ocean?', MIDDLE_SCHOOL: 'What is a tidal barrage?', HIGH_SCHOOL: 'How is wave energy measured and characterized?', UNDERGRADUATE: 'What are the key performance indicators for ocean energy technology readiness?', GRADUATE: 'How do probabilistic structural reliability methods apply to marine energy device certification?', PHD: 'What are the coupled aero-hydro-elastic modeling requirements for floating tidal platforms?' }, options: { ELEMENTARY: ['Yes! Warm surface water and cold deep water can make electricity', 'No, ocean temperature doesnt help', 'Only ice can make energy', 'Only hot springs'], MIDDLE_SCHOOL: ['A dam built across a bay to capture tidal water for energy', 'A wall to stop waves', 'A type of boat', 'An underwater cave'], HIGH_SCHOOL: ['By wave height, period, and direction using buoys and models', 'Only by watching waves', 'Just wave color', 'Temperature only'], UNDERGRADUATE: ['LCOE, capacity factor, availability, and progression through TRL stages', 'Only cost', 'Only size', 'No KPIs exist'], GRADUATE: ['Fatigue reliability and extreme load design use probability distributions of marine loads with safety factors', 'Not applicable to marine', 'Only visual inspection', 'Deterministic only'], PHD: ['Platform motion, turbine hydrodynamics, structural loads, and mooring dynamics require coupled time-domain simulation', 'Only steady-state analysis', 'No modeling needed', 'Only tank testing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Ocean Thermal Energy Conversion (OTEC) uses the temperature difference between warm surface water and cold deep water to generate electricity in tropical regions.', MIDDLE_SCHOOL: 'A tidal barrage is a dam built across a tidal estuary that captures water at high tide and releases it through turbines as the tide goes out.', HIGH_SCHOOL: 'Wave energy is characterized by significant wave height (Hs), energy period (Te), and direction, measured by wave buoys and hindcast models. Wave power is expressed in kW per meter of wave front.', UNDERGRADUATE: 'Ocean energy KPIs include LCOE trajectory (targeting <$150/MWh by 2030), capacity factor (25-35% for tidal, 20-30% for wave), availability (>85%), and Technology Readiness Level progression from TRL 5-9.', GRADUATE: 'Marine energy certification uses probabilistic structural reliability methods that characterize load distributions from irregular sea states, apply partial safety factors per IEC 62600 standards, and assess fatigue damage accumulation over 20-year design life.', PHD: 'Floating tidal platforms require coupled time-domain simulation of platform hydrodynamics (6-DOF motion), rotor hydro-loads, flexible structural response, and mooring/cable dynamics under combined wave-current-wind environmental loading.' } }] },
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
    lessons: [{ id: 're-grid-1', title: 'The Smart Power Network', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Electricity!</h2><p>A smart grid is like the internet for electricity - it knows where power is needed and sends it there!</p>', MIDDLE_SCHOOL: '<h2>What Makes a Grid Smart?</h2><p>Sensors, smart meters, computers, and communication networks work together to manage electricity flow efficiently.</p>', HIGH_SCHOOL: '<h2>Smart Grid Components</h2><p>Advanced metering infrastructure (AMI), distribution automation, demand response, and distributed energy resources.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Smart Grid Engineering: Digital Transformation of Electricity Systems</h2>

<p>The global smart grid market exceeds $50 billion annually as utilities invest in digital infrastructure to manage bidirectional power flows, integrate distributed energy resources, and improve system resilience. Smart grid technologies transform the one-way power delivery model into an interactive, data-driven network capable of accommodating high renewable penetration while maintaining reliability.</p>

<h3>Smart Grid Architecture</h3>

<table class="technical-table">
<thead><tr><th>Technology Layer</th><th>Components</th><th>Function</th><th>Investment Scale</th></tr></thead>
<tbody>
<tr><td>Advanced Metering (AMI)</td><td>Smart meters, comm networks, MDMS</td><td>15-minute interval data, remote connect/disconnect</td><td>$200-400/meter</td></tr>
<tr><td>Distribution Automation (DA)</td><td>Reclosers, switches, sensors, FLISR</td><td>Self-healing, fault isolation in seconds</td><td>$1-3M per feeder</td></tr>
<tr><td>SCADA/DMS</td><td>Control center, RTUs, ADMS platform</td><td>Real-time monitoring and dispatch</td><td>$50-200M per utility</td></tr>
<tr><td>DERMS</td><td>DER aggregation, dispatch optimization</td><td>Coordinate rooftop solar, storage, EVs</td><td>$5-20M implementation</td></tr>
<tr><td>Grid-Edge Intelligence</td><td>Smart inverters, IoT sensors, edge computing</td><td>Local voltage regulation, data processing</td><td>Incremental per device</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-sg-undergrad-q1">
<p>"Smart grid investments deliver a 4:1 benefit-to-cost ratio when considering reduced outage costs, deferred infrastructure, lower losses, and enabled DER integration. The challenge is coordinating utility, customer, and third-party investments across the distribution system."</p>
<cite>— Electric Power Research Institute (EPRI), Smart Grid Benefits Assessment, 2022</cite>
</blockquote>

<h3>Demand Response and Load Flexibility</h3>
<ul>
<li><strong>Price-responsive DR:</strong> Time-of-use, critical peak pricing, and real-time pricing shift 5-15% of peak load</li>
<li><strong>Direct load control:</strong> Utility-dispatched cycling of HVAC, water heaters, EV chargers provides 1-3 kW per participant</li>
<li><strong>Aggregated VPPs:</strong> Virtual power plants aggregate thousands of DERs into dispatchable resources for wholesale markets</li>
<li><strong>Industrial DR:</strong> Large customers provide 10-100 MW of interruptible load for grid emergencies</li>
</ul>

<h3>Cybersecurity Considerations</h3>
<p>Smart grids expand the attack surface from dozens of substations to millions of connected endpoints. NERC CIP standards mandate security controls for bulk electric system assets. Distribution system security requires defense-in-depth approaches including network segmentation, encrypted communications, and anomaly detection.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Smart grid transformation is fundamentally an information technology challenge layered onto critical infrastructure. Engineers must balance the benefits of connectivity and automation against cybersecurity risks, data privacy concerns, and the enormous cost of upgrading century-old distribution systems. The most successful deployments integrate technology investments with reformed utility business models that properly value grid flexibility and DER coordination.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Grid Intelligence: Transactive Energy, Machine Learning, and Distribution System Markets</h2>

<p>As distributed energy resources proliferate, traditional centralized dispatch becomes inadequate for managing millions of grid-edge devices. Graduate analysis examines transactive energy frameworks, distribution locational marginal prices, machine learning applications for grid operation, and the regulatory transformation required to enable next-generation grid architectures.</p>

<h3>Transactive Energy Frameworks</h3>
<p>Transactive energy uses economic signals and market mechanisms to coordinate DER dispatch without centralized control:</p>

<table class="technical-table">
<thead><tr><th>Framework</th><th>Price Discovery</th><th>Settlement</th><th>Example Projects</th></tr></thead>
<tbody>
<tr><td>Distribution LMP (DLMP)</td><td>Optimal power flow at each node</td><td>Utility-managed clearing</td><td>ConEd BQDM, DSPx initiative</td></tr>
<tr><td>Peer-to-peer trading</td><td>Bilateral negotiation or auction</td><td>Blockchain or platform-based</td><td>Brooklyn Microgrid, Power Ledger</td></tr>
<tr><td>Double auction</td><td>Buyers and sellers submit bids/offers</td><td>Clearing price for each interval</td><td>GridWise Olympic Peninsula demo</td></tr>
<tr><td>Federated markets</td><td>Hierarchical market layers</td><td>Coordinated wholesale-retail</td><td>EPRI DER-VET framework</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-sg-grad-q1">
<p>"Transactive energy represents a paradigm shift from centralized dispatch to decentralized coordination. Early demonstrations show that price-responsive DERs can provide distribution services equivalent to traditional infrastructure at 30-50% lower cost."</p>
<cite>— Pacific Northwest National Laboratory, GridWise Transactive Energy Framework, 2022</cite>
</blockquote>

<h3>Machine Learning in Grid Operations</h3>
<ul>
<li><strong>Load forecasting:</strong> Deep learning (LSTM, transformer models) achieve 1-3% MAPE for day-ahead load, enabling more efficient unit commitment</li>
<li><strong>Renewable forecasting:</strong> Ensemble methods combining NWP with ML improve solar/wind forecasts by 15-30% vs. persistence</li>
<li><strong>Anomaly detection:</strong> Autoencoders and isolation forests identify equipment degradation, cyber intrusion, and non-technical losses</li>
<li><strong>Optimal power flow:</strong> Neural network proxies for AC-OPF solve in milliseconds vs. minutes, enabling real-time optimization</li>
<li><strong>Topology optimization:</strong> RL agents learn switching sequences for loss reduction and congestion management</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-sg-grad-q2">
<p>"Deep reinforcement learning agents have demonstrated the ability to manage distribution voltage within ±5% of nominal across all nodes while minimizing curtailment, outperforming rule-based Volt-VAR optimization by 15-25%."</p>
<cite>— IEEE Transactions on Power Systems, "Deep RL for Distribution Voltage Control," 2023</cite>
</blockquote>

<h3>Utility Business Model Transformation</h3>
<p>Traditional cost-of-service regulation misaligns incentives with smart grid investment. Performance-based regulation (PBR) mechanisms include:</p>
<ul>
<li><strong>Revenue decoupling:</strong> Separate utility revenue from volumetric sales to remove disincentive for efficiency</li>
<li><strong>Performance incentive mechanisms (PIMs):</strong> Reward metrics like DER hosting, peak reduction, and customer satisfaction</li>
<li><strong>Platform models:</strong> Utility as distribution system operator (DSO) facilitating third-party services</li>
</ul>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>The convergence of power systems, telecommunications, and information technology creates unprecedented opportunities and challenges for grid management. Research frontiers include federated learning for privacy-preserving grid optimization, digital twins for real-time simulation, and quantum computing applications for large-scale optimal power flow. The central tension remains between the efficiency of market-based coordination and the reliability requirements of critical infrastructure.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Distributed optimization algorithms, cybersecurity for operational technology, and resilience quantification.</p>' } }],
    activities: [{ id: 're-grid-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Power the City!', MIDDLE_SCHOOL: 'Balance the Grid', HIGH_SCHOOL: 'Demand Response', UNDERGRADUATE: 'AMI Deployment', GRADUATE: 'Market Simulation', PHD: 'Resilience Modeling' }, description: { ELEMENTARY: 'Send power where it is needed in the city!', MIDDLE_SCHOOL: 'Balance electricity supply and demand in real-time.', HIGH_SCHOOL: 'Design a demand response program.', UNDERGRADUATE: 'Plan an advanced metering infrastructure rollout.', GRADUATE: 'Simulate transactive energy market dynamics.', PHD: 'Model grid resilience under cyber-physical threats.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-grid-game', type: 'simulation', title: 'Grid Operator', description: 'Manage a smart electricity grid!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-grid-quiz', passingScore: 80, questions: [{ id: 'rgdq1', question: { ELEMENTARY: 'What does a smart grid know?', MIDDLE_SCHOOL: 'What device measures your home electricity use in real-time?', HIGH_SCHOOL: 'What is demand response?', UNDERGRADUATE: 'What does AMI stand for?', GRADUATE: 'What is transactive energy?', PHD: 'What is a key cybersecurity concern for smart grids?' }, options: { ELEMENTARY: ['Where power is needed', 'What you ate for breakfast', 'Your favorite color', 'Tomorrow\'s weather'], MIDDLE_SCHOOL: ['Smart meter', 'Regular clock', 'Thermometer', 'Smoke detector'], HIGH_SCHOOL: ['Changing electricity use based on grid conditions', 'Using more power always', 'Ignoring the grid', 'Building more plants'], UNDERGRADUATE: ['Advanced Metering Infrastructure', 'Automatic Money Investing', 'Alternative Measurement Index', 'Annual Meter Inspection'], GRADUATE: ['Market-based coordination of distributed resources', 'Traditional utility billing', 'Manual grid control', 'Fossil fuel trading'], PHD: ['Attacks on operational technology systems', 'Email phishing', 'Website defacement', 'Social media hacking'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A smart grid knows where power is needed and can send it there efficiently!', MIDDLE_SCHOOL: 'Smart meters measure your electricity use in real-time and communicate with the utility.', HIGH_SCHOOL: 'Demand response programs incentivize customers to reduce or shift usage during peak times.', UNDERGRADUATE: 'AMI (Advanced Metering Infrastructure) includes smart meters, networks, and data systems.', GRADUATE: 'Transactive energy uses market mechanisms and price signals to coordinate distributed resources.', PHD: 'Attacks on SCADA and other operational technology can disrupt physical grid operations.' } }, { id: 'rgdq2', question: { ELEMENTARY: 'What is a smart grid?', MIDDLE_SCHOOL: 'How do smart meters help save energy?', HIGH_SCHOOL: 'What communication technologies enable smart grid operations?', UNDERGRADUATE: 'How does advanced distribution management system (ADMS) software integrate DER into grid operations?', GRADUATE: 'What cybersecurity frameworks protect smart grid infrastructure from attack?', PHD: 'How do transactive energy platforms enable peer-to-peer electricity trading?' }, options: { ELEMENTARY: ['An electricity network that uses computers to manage power better', 'A grid made of smart phones', 'A type of computer game', 'A solar panel'], MIDDLE_SCHOOL: ['They show how much electricity you use in real time', 'They make electricity', 'They replace power plants', 'They only measure gas'], HIGH_SCHOOL: ['Fiber optics, cellular, mesh radio, and power-line communication', 'Only postal mail', 'Smoke signals', 'Only WiFi'], UNDERGRADUATE: ['ADMS uses real-time telemetry and optimization to manage voltage, protection, and DER dispatch', 'ADMS is not used', 'Only manual control', 'DER cannot be managed'], GRADUATE: ['NERC CIP, IEC 62351, and NIST frameworks address grid-specific IT/OT security', 'No frameworks exist', 'Only antivirus software', 'Cybersecurity is not needed'], PHD: ['Blockchain or platform-based systems enable bilateral energy contracts between prosumers and consumers', 'P2P trading is illegal', 'Only utilities can trade', 'No platforms exist'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A smart grid is an electricity network that uses digital technology, sensors, and computers to deliver power more efficiently and reliably.', MIDDLE_SCHOOL: 'Smart meters show you exactly how much electricity you are using in real time, helping you find ways to save energy and reduce your bills.', HIGH_SCHOOL: 'Smart grids use fiber optic backbone networks, cellular (4G/5G) for wide-area, mesh radio (RF) for neighborhood area, and power-line communication for last-mile connectivity to meters and devices.', UNDERGRADUATE: 'ADMS integrates SCADA, DMS, and OMS with real-time DER telemetry to perform Volt/VAR optimization, fault location/isolation/restoration, and optimal DER dispatch across the distribution network.', GRADUATE: 'Smart grid cybersecurity follows NERC CIP (bulk power), IEC 62351 (communication security), and NIST SP 800-82 (industrial control systems), addressing IT/OT convergence, supply chain integrity, and incident response.', PHD: 'Transactive energy platforms use price signals or blockchain-based smart contracts to enable bilateral electricity trading between prosumers (with solar/storage) and consumers, settling transactions through distribution utility or independent platforms.' } }, { id: 'rgdq3', question: { ELEMENTARY: 'Can your house talk to the power company?', MIDDLE_SCHOOL: 'What is demand response?', HIGH_SCHOOL: 'What is the difference between centralized and distributed energy resources?', UNDERGRADUATE: 'How does Volt/VAR optimization reduce distribution system losses?', GRADUATE: 'What are the interoperability standards required for smart grid device integration?', PHD: 'How do distribution-level phasor measurement units improve situational awareness?' }, options: { ELEMENTARY: ['Yes! Smart devices can communicate with the grid', 'Houses cant communicate', 'Only phones can', 'Only at night'], MIDDLE_SCHOOL: ['Reducing electricity use during peak times when asked', 'Demanding more power', 'Responding to emergencies', 'Buying new appliances'], HIGH_SCHOOL: ['Centralized = large power plants; distributed = local solar, batteries, etc.', 'They are the same', 'Distributed is always bigger', 'Centralized means at home'], UNDERGRADUATE: ['Coordinating voltage regulators and capacitor banks to minimize I2R losses while maintaining voltage limits', 'It increases losses', 'Only changes voltage', 'Not related to losses'], GRADUATE: ['IEEE 2030, IEC 61850, OpenADR, and CIM/CIS standards enable device interoperability', 'No standards needed', 'Each utility creates its own', 'Only one standard exists'], PHD: ['Micro-PMUs capture sub-second voltage phasors revealing oscillations, reverse flows, and events invisible to SCADA', 'PMUs only work in transmission', 'Distribution is too small', 'Only for frequency monitoring'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! With smart grid technology, appliances in your home can communicate with the power company to help manage electricity use during busy times.', MIDDLE_SCHOOL: 'Demand response means voluntarily reducing or shifting electricity use during peak demand periods, often in exchange for incentives or lower rates.', HIGH_SCHOOL: 'Centralized resources are large power plants far from users; distributed resources (rooftop solar, batteries, small generators) are located near or at the point of consumption.', UNDERGRADUATE: 'Volt/VAR optimization coordinates LTCs, voltage regulators, and switched capacitor banks using real-time sensor feedback to minimize resistive losses (I2R) while keeping all customer voltages within ANSI C84.1 limits, typically saving 2-4% of distribution losses.', GRADUATE: 'Smart grid interoperability requires IEEE 2030 (reference model), IEC 61850 (substation automation), OpenADR (demand response), and CIM/CIS (Common Information Model) standards for seamless multi-vendor device integration.', PHD: 'Distribution micro-PMUs sampling at 30-120 Hz capture voltage and current phasors revealing sub-second oscillations, reverse power flows from DER, and incipient fault signatures invisible to traditional 2-4 second SCADA polling.' } }, { id: 'rgdq4', question: { ELEMENTARY: 'What are solar panels on houses called when they send power to the grid?', MIDDLE_SCHOOL: 'What is a distributed energy resource?', HIGH_SCHOOL: 'How does time-of-use pricing incentivize load shifting?', UNDERGRADUATE: 'How do grid-forming inverters maintain stability in low-inertia distribution networks?', GRADUATE: 'What machine learning methods optimize DER scheduling in distribution networks?', PHD: 'How do networked microgrids provide resilience through hierarchical control architectures?' }, options: { ELEMENTARY: ['Distributed generation or rooftop solar', 'Grid stealers', 'Power plants', 'Wind turbines'], MIDDLE_SCHOOL: ['Small power sources like solar and batteries near where electricity is used', 'A large coal plant', 'An oil rig', 'A nuclear reactor'], HIGH_SCHOOL: ['Higher prices during peak hours encourage shifting consumption to cheaper off-peak times', 'Prices are always the same', 'Only affects businesses', 'Peak is always cheapest'], UNDERGRADUATE: ['Grid-forming inverters provide voltage and frequency reference, synthetic inertia, and fault current', 'They cannot maintain stability', 'Only synchronous generators can', 'Inverters only follow the grid'], GRADUATE: ['Reinforcement learning and stochastic optimization schedule DER dispatch under forecast uncertainty', 'ML is not applicable', 'Only manual scheduling works', 'Only rule-based control'], PHD: ['Primary (device), secondary (microgrid), and tertiary (network) layers coordinate islanding, reconnection, and power sharing', 'Only centralized control', 'Hierarchy is not needed', 'Only one microgrid can exist'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When solar panels on homes send extra electricity back to the grid, it is called distributed generation - many small power sources instead of one big one!', MIDDLE_SCHOOL: 'Distributed energy resources (DERs) are small-scale power sources or storage located near where electricity is consumed, including rooftop solar, batteries, small wind, and EVs.', HIGH_SCHOOL: 'Time-of-use pricing charges more during peak hours (e.g., 4-9 PM) and less during off-peak, incentivizing customers to shift flexible loads like EV charging and laundry to cheaper periods.', UNDERGRADUATE: 'Grid-forming inverters establish voltage magnitude and frequency reference using virtual synchronous machine or droop control algorithms, providing synthetic inertia, fault current contribution, and black start capability in low-inertia networks.', GRADUATE: 'Deep reinforcement learning and stochastic optimization methods schedule DER dispatch, EV charging, and storage cycling under solar/load forecast uncertainty, outperforming rule-based approaches by 10-20% in cost reduction.', PHD: 'Networked microgrids use hierarchical control: primary (local droop), secondary (microgrid frequency/voltage restoration), and tertiary (inter-microgrid power exchange optimization) layers to provide resilient, coordinated operation during grid outages.' } }, { id: 'rgdq5', question: { ELEMENTARY: 'What happens during a blackout?', MIDDLE_SCHOOL: 'How does the smart grid help with renewable energy?', HIGH_SCHOOL: 'What is grid-edge computing?', UNDERGRADUATE: 'How do advanced metering infrastructure systems enable dynamic pricing and load management?', GRADUATE: 'What are the privacy and data governance challenges of smart grid data analytics?', PHD: 'How do digital twin models of distribution networks improve planning and operations?' }, options: { ELEMENTARY: ['The electricity stops and the lights go out', 'Nothing changes', 'Only TVs turn off', 'Computers keep working'], MIDDLE_SCHOOL: ['It helps balance variable solar and wind power across the grid', 'It doesnt help renewables', 'Only helps coal plants', 'Blocks renewable energy'], HIGH_SCHOOL: ['Processing data at sensors and devices near the grid edge rather than centrally', 'Computing at the center only', 'A type of smartphone', 'Edge of the internet'], UNDERGRADUATE: ['AMI provides interval data enabling real-time pricing, outage detection, and automated demand response', 'AMI only reads meters monthly', 'No load management possible', 'Only for billing'], GRADUATE: ['Granular consumption data reveals occupancy, appliance use, and behavior patterns requiring anonymization and access controls', 'No privacy concerns', 'Only utilities see data', 'Data is never stored'], PHD: ['Digital twins replicate network topology, load, and DER state for scenario analysis and operator training', 'Digital twins are only for manufacturing', 'Too expensive for utilities', 'Only for new networks'] }, correctIndex: 0, explanation: { ELEMENTARY: 'During a blackout, power lines stop delivering electricity so lights, appliances, and electronics stop working until the power company fixes the problem.', MIDDLE_SCHOOL: 'The smart grid uses sensors, weather forecasts, and automated controls to balance variable renewable energy from solar and wind, keeping the grid stable as clean energy grows.', HIGH_SCHOOL: 'Grid-edge computing processes data at or near sensors, inverters, and smart devices rather than sending everything to a central server, enabling faster response times for protection and DER control.', UNDERGRADUATE: 'AMI systems collect 15-minute (or sub-minute) interval data enabling dynamic pricing signals, near-real-time outage detection via last-gasp messaging, remote connect/disconnect, and automated demand response program enrollment.', GRADUATE: 'Smart meter data at 15-minute granularity can reveal occupancy patterns, appliance signatures, and lifestyle information, requiring robust anonymization, differential privacy techniques, and GDPR/state-level data governance frameworks.', PHD: 'Distribution digital twins create real-time virtual replicas integrating GIS topology, SCADA telemetry, AMI data, and DER state estimation for scenario planning, hosting capacity analysis, and operator training simulation.' } }] },
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
    lessons: [{ id: 're-micro-1', title: 'Mini Power Systems', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Your Own Power Grid!</h2><p>A microgrid is like having your own small power system. If the big grid goes down, you still have power!</p>', MIDDLE_SCHOOL: '<h2>What is a Microgrid?</h2><p>A local energy system with generation, storage, and loads that can operate connected to or separate from the main grid.</p>', HIGH_SCHOOL: '<h2>Microgrid Components</h2><p>Distributed generation (solar, wind, generators), storage, smart controls, and the ability to island.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Microgrid Engineering: Design, Control, and Economic Optimization</h2>

<p>Microgrids are localized energy systems capable of operating independently from the main grid, providing resilience, reliability, and economic benefits to critical facilities, campuses, and communities. The global microgrid market reached $30 billion in 2023 with over 7,500 projects deployed worldwide, driven by resilience needs, falling DER costs, and advanced control technologies.</p>

<h3>Microgrid Architecture and Components</h3>

<table class="technical-table">
<thead><tr><th>Component</th><th>Function</th><th>Typical Technologies</th><th>Sizing Considerations</th></tr></thead>
<tbody>
<tr><td>Generation</td><td>Primary power supply</td><td>Solar PV, diesel/gas genset, fuel cell, wind</td><td>Peak demand + spinning reserve</td></tr>
<tr><td>Energy storage</td><td>Balancing, islanding, power quality</td><td>Li-ion batteries, flywheels</td><td>Critical load × desired autonomy hours</td></tr>
<tr><td>Point of common coupling (PCC)</td><td>Grid interconnection switch</td><td>Static transfer switch, breaker</td><td>Rated for full export/import capacity</td></tr>
<tr><td>Microgrid controller</td><td>Dispatch optimization, islanding detection</td><td>Centralized or distributed control</td><td>Communication latency requirements</td></tr>
<tr><td>Loads</td><td>Energy consumption</td><td>Critical (must-serve) and deferrable</td><td>Load prioritization for islanded mode</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-micro-undergrad-q1">
<p>"Microgrids reduce outage costs by 80-95% for critical facilities. The average cost of a power outage for commercial customers exceeds $20,000 per event, making microgrid resilience investments increasingly cost-effective."</p>
<cite>— U.S. Department of Energy, Microgrid Portfolio of Activities, 2023</cite>
</blockquote>

<h3>Control Architecture</h3>
<ul>
<li><strong>Centralized control:</strong> Single controller optimizes all DER dispatch; fast response but single point of failure</li>
<li><strong>Decentralized (droop-based):</strong> Each inverter responds to local frequency/voltage deviations; no communication required but suboptimal dispatch</li>
<li><strong>Hierarchical control:</strong> Primary (droop), secondary (restoration), tertiary (economic optimization) layers provide robust performance</li>
<li><strong>Grid-forming inverters:</strong> Create voltage/frequency reference for islanded operation; essential when no synchronous machines present</li>
</ul>

<h3>Economic Analysis</h3>
<p>Microgrid value streams include: demand charge reduction (30-50% savings), energy arbitrage ($5-30/MWh), resilience value ($20-200/kW-year depending on criticality), utility incentive programs, and wholesale market participation. HOMER and DER-CAM software tools optimize system sizing against these value streams.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Microgrid design requires integrating power systems engineering, control theory, and economic optimization. The critical engineering challenge is seamless islanding—detecting grid outages within milliseconds and transitioning to island mode without disrupting sensitive loads. Grid-forming inverter technology has emerged as the key enabler, allowing 100% inverter-based microgrids without synchronous generators.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Microgrid Systems: Networked Architectures, Resilience Quantification, and Grid Services</h2>

<p>As microgrids mature from isolated installations to networked systems, graduate-level analysis examines hierarchical and multi-agent control strategies, methods for quantifying resilience value, regulatory frameworks enabling microgrid-grid interaction, and the emerging role of microgrids as distribution system assets providing grid services.</p>

<h3>Networked Microgrid Architectures</h3>

<table class="technical-table">
<thead><tr><th>Architecture</th><th>Topology</th><th>Coordination</th><th>Benefits</th></tr></thead>
<tbody>
<tr><td>Isolated microgrid</td><td>Single site, single PCC</td><td>Local controller</td><td>Simple, proven, facility-level resilience</td></tr>
<tr><td>Networked microgrids</td><td>Multiple microgrids with DC/AC ties</td><td>Multi-agent distributed control</td><td>Resource sharing, improved reliability</td></tr>
<tr><td>Community microgrid</td><td>Serves multiple customers across utility lines</td><td>Utility or third-party operated</td><td>Neighborhood resilience, shared costs</td></tr>
<tr><td>Virtual microgrid</td><td>Aggregated DERs without dedicated infrastructure</td><td>Cloud-based optimization</td><td>Low capital cost, software-defined boundaries</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-micro-grad-q1">
<p>"Networked microgrids can improve system reliability by sharing reserves and balancing resources across interconnected islands, reducing required storage capacity by 20-40% compared to isolated microgrids providing equivalent resilience."</p>
<cite>— IEEE Transactions on Smart Grid, "Optimal Operation of Networked Microgrids," 2023</cite>
</blockquote>

<h3>Resilience Valuation Methods</h3>
<ul>
<li><strong>Value of Lost Load (VOLL):</strong> Sector-specific estimates range from $10/kWh (residential) to $100+/kWh (healthcare, data centers)</li>
<li><strong>ICE Calculator (DOE):</strong> Interruption Cost Estimate tool provides county-level outage cost data</li>
<li><strong>Stochastic resilience metrics:</strong> Probability-weighted outage scenarios with Monte Carlo simulation</li>
<li><strong>FEMA benefit-cost analysis:</strong> Hazard mitigation grant programs require standardized resilience benefit quantification</li>
</ul>

<h3>Multi-Agent Control Systems</h3>
<p>Distributed multi-agent systems enable scalable microgrid coordination without centralized control. Consensus algorithms converge to optimal dispatch while preserving privacy and reducing communication requirements. Challenges include convergence speed, communication latency, and Byzantine fault tolerance.</p>

<blockquote class="scavenger-quote" data-quote-id="re-micro-grad-q2">
<p>"Multi-agent reinforcement learning enables autonomous microgrid operation with near-optimal dispatch while requiring only local measurements and neighbor communication, achieving within 3% of centralized optimal at a fraction of the communication overhead."</p>
<cite>— Applied Energy, "Multi-Agent RL for Microgrid Energy Management," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>The evolution from single-site microgrids to networked, community-scale systems raises fundamental questions about grid architecture, market design, and regulatory frameworks. Research frontiers include formal verification of microgrid stability under N-k contingencies, privacy-preserving distributed optimization for multi-stakeholder systems, and equitable governance models ensuring that microgrid resilience benefits reach vulnerable populations rather than creating energy access disparities.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Hierarchical and distributed control, stability analysis, and cyber-physical security.</p>' } }],
    activities: [{ id: 're-micro-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Mini Grid!', MIDDLE_SCHOOL: 'Design Your Microgrid', HIGH_SCHOOL: 'Islanding Exercise', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Networked Operation', PHD: 'Control Design' }, description: { ELEMENTARY: 'Create a small power system for a neighborhood!', MIDDLE_SCHOOL: 'Design a microgrid with solar, batteries, and loads.', HIGH_SCHOOL: 'Practice disconnecting from the main grid safely.', UNDERGRADUATE: 'Size a microgrid for a campus or community.', GRADUATE: 'Operate multiple microgrids in coordination.', PHD: 'Design hierarchical control for a microgrid.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-micro-game', type: 'simulation', title: 'Microgrid Builder', description: 'Design and operate a resilient microgrid!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-micro-quiz', passingScore: 80, questions: [{ id: 'rmgq1', question: { ELEMENTARY: 'What can a microgrid do when the big grid fails?', MIDDLE_SCHOOL: 'What is islanding?', HIGH_SCHOOL: 'What components does a microgrid need to island?', UNDERGRADUATE: 'What is a key economic driver for microgrids?', GRADUATE: 'What is peer-to-peer energy trading?', PHD: 'What is a challenge in hierarchical microgrid control?' }, options: { ELEMENTARY: ['Keep the power on', 'Turn everything off', 'Call for help', 'Wait for sun'], MIDDLE_SCHOOL: ['Operating independently from the main grid', 'Being on an island', 'Using only water power', 'Shutting down'], HIGH_SCHOOL: ['Generation, storage, and smart controls', 'Only solar panels', 'Only batteries', 'Only generators'], UNDERGRADUATE: ['Resilience and reliability value', 'Always cheaper than grid', 'No permits needed', 'Free energy'], GRADUATE: ['Direct energy exchange between prosumers', 'Trading electricity stocks', 'Bartering goods', 'Government distribution'], PHD: ['Coordinating local and global objectives', 'Too simple', 'No math needed', 'Single controller'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When the main power grid fails, a microgrid can keep the lights on by itself!', MIDDLE_SCHOOL: 'Islanding means a microgrid disconnects and operates independently from the main grid.', HIGH_SCHOOL: 'To island, a microgrid needs its own generation, storage, and smart controls to balance supply and demand.', UNDERGRADUATE: 'Resilience value - avoiding outage costs - is often the primary economic justification.', GRADUATE: 'Peer-to-peer trading allows households and businesses to buy/sell energy directly with each other.', PHD: 'Balancing local optimization with global objectives while maintaining stability is a key challenge.' } }, { id: 'rmgq2', question: { ELEMENTARY: 'What is a microgrid?', MIDDLE_SCHOOL: 'Can a microgrid work without the main power grid?', HIGH_SCHOOL: 'What components make up a typical microgrid?', UNDERGRADUATE: 'How do microgrid controllers manage islanding and reconnection transitions?', GRADUATE: 'What are the optimal sizing methodologies for hybrid renewable microgrids?', PHD: 'How do stochastic programming models handle uncertainty in microgrid energy management?' }, options: { ELEMENTARY: ['A small, local electricity network', 'A tiny power line', 'A small computer', 'A battery pack'], MIDDLE_SCHOOL: ['Yes! It can island and run on its own', 'No, it always needs the main grid', 'Only for one minute', 'Only with diesel'], HIGH_SCHOOL: ['Generation sources, storage, loads, and an intelligent controller', 'Only solar panels', 'Just batteries', 'Only a generator'], UNDERGRADUATE: ['Seamless transfer switches and synchronized reconnection maintain power quality during transitions', 'Manual switching only', 'Cannot be managed', 'Always causes a blackout'], GRADUATE: ['HOMER, genetic algorithms, and MILP optimize component sizing for minimum lifecycle cost under resource uncertainty', 'No methodology needed', 'Only use the biggest components', 'Random sizing works'], PHD: ['Two-stage stochastic and robust optimization handle solar, wind, and load forecast uncertainty in dispatch', 'Uncertainty does not affect microgrids', 'Only deterministic models work', 'Ignore uncertainty'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A microgrid is a small, local electricity network that can operate connected to or independently from the main power grid.', MIDDLE_SCHOOL: 'Yes! One of the key features of a microgrid is its ability to island - disconnect from the main grid and operate independently using its own generation and storage.', HIGH_SCHOOL: 'A typical microgrid includes distributed generation (solar, wind, diesel), energy storage (batteries), controllable loads, and an intelligent microgrid controller that manages power flow and transitions.', UNDERGRADUATE: 'Microgrid controllers manage islanding via static transfer switches (sub-cycle) or breaker-based schemes, using synchrophasor measurements for seamless reconnection when grid voltage, frequency, and phase angle are within IEEE 1547 limits.', GRADUATE: 'Optimal sizing uses HOMER (techno-economic screening), genetic algorithms, or mixed-integer linear programming to minimize lifecycle cost (CAPEX + OPEX + fuel) under stochastic renewable resource and load profiles over 20-25 year horizons.', PHD: 'Two-stage stochastic programming optimizes day-ahead commitment and real-time dispatch under scenario-based renewable and load uncertainty, while robust optimization protects against worst-case realizations within defined uncertainty sets.' } }, { id: 'rmgq3', question: { ELEMENTARY: 'Why would a hospital want a microgrid?', MIDDLE_SCHOOL: 'What is islanding?', HIGH_SCHOOL: 'How do diesel generators interact with renewable sources in hybrid microgrids?', UNDERGRADUATE: 'What resilience metrics quantify microgrid performance during extended grid outages?', GRADUATE: 'How do protection schemes adapt to bidirectional power flow in microgrids?', PHD: 'What are the regulatory barriers to microgrid deployment in most US jurisdictions?' }, options: { ELEMENTARY: ['To keep the lights on even during a power outage', 'Hospitals dont need electricity', 'For decoration', 'Only for heating'], MIDDLE_SCHOOL: ['When a microgrid disconnects and runs on its own', 'Building on an island', 'Turning off all power', 'A type of battery'], HIGH_SCHOOL: ['Diesel provides firm backup while renewables reduce fuel consumption and emissions', 'They cannot work together', 'Diesel blocks renewables', 'Only one can run at a time'], UNDERGRADUATE: ['Expected unserved energy, survival time, and critical load coverage fraction', 'Only cost matters', 'No metrics exist', 'Only duration matters'], GRADUATE: ['Adaptive overcurrent and differential protection adjust settings for grid-connected vs islanded modes', 'Protection does not change', 'Only fuses are used', 'No protection needed'], PHD: ['Utility franchise rights, standby tariffs, interconnection rules, and third-party ownership restrictions', 'No barriers exist', 'Only technical barriers', 'Regulations support all microgrids'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Hospitals need electricity all the time to power life-saving equipment. A microgrid ensures they have backup power even when the main grid goes down!', MIDDLE_SCHOOL: 'Islanding is when a microgrid disconnects from the main grid and operates independently, using its own generators and batteries to power local loads.', HIGH_SCHOOL: 'Hybrid microgrids use diesel generators for firm capacity and peak shaving while renewable sources (solar, wind) reduce fuel consumption by 40-70%, with batteries smoothing transitions and providing spinning reserve.', UNDERGRADUATE: 'Resilience metrics include expected unserved energy (MWh), survival time at critical load (hours), critical load coverage fraction (%), and recovery time, quantifying microgrid performance during extended outages.', GRADUATE: 'Microgrid protection must handle bidirectional fault currents using adaptive overcurrent settings, communication-based differential schemes, or directional elements that switch between grid-connected and islanded protection settings.', PHD: 'US microgrid deployment faces utility franchise territory protections, punitive standby tariffs, complex interconnection study requirements (IEEE 1547), and restrictions on third-party ownership of generation assets serving multiple customers.' } }, { id: 'rmgq4', question: { ELEMENTARY: 'Can solar panels and batteries make a microgrid?', MIDDLE_SCHOOL: 'What is a campus microgrid?', HIGH_SCHOOL: 'What is the role of energy storage in microgrid stability?', UNDERGRADUATE: 'How do microgrids provide value to the broader distribution network?', GRADUATE: 'What control architectures coordinate multiple DER in community microgrids?', PHD: 'How do climate adaptation strategies inform microgrid design for extreme weather resilience?' }, options: { ELEMENTARY: ['Yes! Solar and batteries are key microgrid components', 'No, you need coal', 'Only wind turbines work', 'Only diesel generators'], MIDDLE_SCHOOL: ['A microgrid serving a university or business campus', 'A camping trip', 'A school project', 'A type of classroom'], HIGH_SCHOOL: ['Storage provides frequency regulation, voltage support, and bridge power during source transitions', 'Storage is not needed', 'Only for backup', 'Reduces stability'], UNDERGRADUATE: ['Peak shaving, reactive power support, and reduced line losses benefit the utility', 'No value to the grid', 'Only costs the utility money', 'Microgrids hurt the grid'], GRADUATE: ['Hierarchical, decentralized, and distributed MPC architectures balance local and system objectives', 'Only centralized control', 'No coordination needed', 'Random dispatch'], PHD: ['Hardened infrastructure, underground cables, flood elevation, and diverse generation mix address multi-hazard threats', 'Climate does not affect microgrids', 'Only temperature matters', 'Standard design is sufficient'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! A simple microgrid can be built with just solar panels and batteries, providing clean, reliable electricity for homes or buildings.', MIDDLE_SCHOOL: 'A campus microgrid serves a university, hospital complex, or business park with its own generation, storage, and intelligent controls for reliability and efficiency.', HIGH_SCHOOL: 'Energy storage in microgrids provides fast frequency regulation, voltage support through reactive power, seamless bridge power during generation transitions, and peak shaving to reduce demand charges.', UNDERGRADUATE: 'Microgrids benefit the distribution network through peak demand reduction, reactive power support, reduced line losses, deferred infrastructure upgrades, and enhanced local reliability, quantifiable through distribution system value-of-DER analyses.', GRADUATE: 'Community microgrids use hierarchical control (primary droop, secondary restoration, tertiary optimization), decentralized consensus algorithms, or distributed model predictive control to coordinate multiple DER while respecting privacy and ownership boundaries.', PHD: 'Climate-resilient microgrid design incorporates hardened infrastructure (underground cables, elevated equipment), fuel diversity (solar + battery + generator), flood and wind load ratings, and redundant communication for multi-hazard resilience.' } }] },
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
    lessons: [{ id: 're-ev-1', title: 'Cars That Plug In', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Electric Cars!</h2><p>Electric vehicles (EVs) use batteries instead of gas tanks. You charge them like a big phone!</p>', MIDDLE_SCHOOL: '<h2>How EVs Work</h2><p>A battery stores electricity. An electric motor turns the wheels. Regenerative braking recaptures energy when stopping.</p>', HIGH_SCHOOL: '<h2>EV Technology</h2><p>Lithium-ion batteries, permanent magnet motors, power electronics, and charging standards (Level 1/2/3).</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Electric Vehicle Engineering: Battery Technology, Charging Infrastructure, and Grid Integration</h2>

<p>Global electric vehicle sales exceeded 14 million units in 2023, representing 18% of all new car sales. EV adoption is accelerating as battery costs have fallen 90% since 2010 to approximately $139/kWh at pack level, with projections reaching $80/kWh by 2030. Understanding EV technology, economics, and grid interactions is essential for energy systems planning.</p>

<h3>Battery Chemistry Comparison</h3>

<table class="technical-table">
<thead><tr><th>Chemistry</th><th>Energy Density (Wh/kg)</th><th>Cycle Life</th><th>Cost ($/kWh)</th><th>Key Applications</th></tr></thead>
<tbody>
<tr><td>NMC 811</td><td>250-300</td><td>1,000-2,000</td><td>$120-150</td><td>Long-range passenger EVs (Tesla, BMW)</td></tr>
<tr><td>LFP</td><td>160-200</td><td>3,000-5,000</td><td>$80-100</td><td>Standard range, commercial vehicles (BYD, Tesla)</td></tr>
<tr><td>NCA</td><td>260-300</td><td>1,000-1,500</td><td>$130-160</td><td>Premium EVs (Tesla Model S/X)</td></tr>
<tr><td>Solid-state (emerging)</td><td>350-500</td><td>TBD</td><td>>$200 (projected)</td><td>Next-gen vehicles (Toyota, QuantumScape)</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ev-undergrad-q1">
<p>"Electric vehicles have reached total-cost-of-ownership parity with ICE vehicles in most segments when considering fuel, maintenance, and resale value. The remaining barrier is upfront purchase price, which battery cost reductions will address by 2025-2027 in most markets."</p>
<cite>— BloombergNEF, Electric Vehicle Outlook 2024</cite>
</blockquote>

<h3>Charging Infrastructure</h3>
<ul>
<li><strong>Level 1 (120V AC):</strong> 1.4-1.9 kW; 3-5 miles/hour; overnight home charging; no installation cost</li>
<li><strong>Level 2 (240V AC):</strong> 3.3-19.2 kW; 12-80 miles/hour; home, workplace, public; $500-2,000 installed</li>
<li><strong>DCFC (DC Fast Charging):</strong> 50-350 kW; 200+ miles in 15-30 min; highway corridors; $50,000-150,000 installed</li>
<li><strong>Megawatt Charging (MCS):</strong> Up to 3.75 MW; commercial trucks; 30-min charge for 200+ miles; emerging standard</li>
</ul>

<h3>Total Cost of Ownership Analysis</h3>
<table class="technical-table">
<thead><tr><th>Cost Category</th><th>EV (per mile)</th><th>ICE (per mile)</th><th>EV Advantage</th></tr></thead>
<tbody>
<tr><td>Fuel/Electricity</td><td>$0.04-0.06</td><td>$0.10-0.16</td><td>50-70% savings</td></tr>
<tr><td>Maintenance</td><td>$0.04-0.06</td><td>$0.08-0.10</td><td>40-50% savings</td></tr>
<tr><td>Insurance</td><td>$0.06-0.10</td><td>$0.05-0.08</td><td>10-20% premium</td></tr>
<tr><td>Depreciation</td><td>$0.15-0.25</td><td>$0.15-0.20</td><td>Varies by model</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>EV engineering spans electrochemistry, power electronics, thermal management, and grid systems. The convergence of battery cost reduction, charging infrastructure buildout, and supportive policy creates a tipping point for mass adoption. Engineers must address the dual challenge of vehicle range anxiety through fast charging while managing distribution grid impacts from concentrated charging loads that can exceed transformer ratings in residential neighborhoods.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Transportation Electrification: V2G, Fleet Operations, and System-Level Grid Integration</h2>

<p>As EV penetration approaches 30-50% in leading markets, graduate analysis shifts from individual vehicle economics to system-level impacts: distribution grid reinforcement, managed charging strategies, vehicle-to-grid (V2G) services, fleet electrification logistics, and the equity dimensions of transportation decarbonization.</p>

<h3>Vehicle-Grid Integration (VGI)</h3>

<table class="technical-table">
<thead><tr><th>VGI Mode</th><th>Mechanism</th><th>Value</th><th>Battery Impact</th></tr></thead>
<tbody>
<tr><td>Managed charging (V1G)</td><td>Shift charging to off-peak/high-RE periods</td><td>$50-200/vehicle/year</td><td>Negligible degradation</td></tr>
<tr><td>V2G (bidirectional)</td><td>Discharge to grid for frequency regulation, peak shaving</td><td>$200-800/vehicle/year</td><td>0.5-2% additional degradation/year</td></tr>
<tr><td>V2H (vehicle-to-home)</td><td>Power home during outages</td><td>Resilience: $100-500/year avoided outage cost</td><td>Minimal (infrequent use)</td></tr>
<tr><td>V2B (vehicle-to-building)</td><td>Fleet vehicles power buildings during peaks</td><td>Demand charge reduction: 20-40%</td><td>Managed through fleet scheduling</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ev-grad-q1">
<p>"With 50 million EVs on US roads, managed charging alone could provide 50-100 GW of flexible load—equivalent to all US pumped storage capacity. V2G could add 200-500 GW of distributed storage, fundamentally reshaping grid operations."</p>
<cite>— Nature Energy, "The Potential of Vehicle-Grid Integration," 2023</cite>
</blockquote>

<h3>Distribution System Impacts</h3>
<ul>
<li><strong>Transformer overloading:</strong> Residential transformers rated for 25-50 kVA may serve 5-10 homes; 2-3 simultaneous L2 chargers can cause overloading</li>
<li><strong>Voltage violations:</strong> Concentrated EV charging at feeder ends causes voltage sag; smart charger Volt-Watt response mitigates</li>
<li><strong>Phase imbalance:</strong> Single-phase L2 chargers on residential feeders create imbalance requiring utility monitoring</li>
<li><strong>Hosting capacity:</strong> Utilities use EV adoption forecasting + hosting capacity analysis to proactively target infrastructure upgrades</li>
</ul>

<h3>Fleet Electrification</h3>
<p>Commercial and public fleet electrification requires depot charging infrastructure, route optimization considering energy consumption, and total cost of ownership analysis incorporating duty cycles, dwell times, and electricity rate structures. Transit agencies report 40-60% lower per-mile operating costs with electric buses despite higher capital costs.</p>

<blockquote class="scavenger-quote" data-quote-id="re-ev-grad-q2">
<p>"Medium- and heavy-duty vehicle electrification is the next frontier. Electric transit buses achieve TCO parity today, delivery vans by 2025, and long-haul trucks by 2030 as battery energy density improves and megawatt charging infrastructure deploys."</p>
<cite>— ICCT, Total Cost of Ownership for Heavy-Duty Vehicles, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Transportation electrification is fundamentally a systems integration challenge. Optimizing charging across millions of vehicles while maintaining grid reliability, ensuring equitable access for low-income communities and renters, and managing critical mineral supply chains for batteries all require interdisciplinary research spanning power systems, transportation planning, materials science, and environmental justice.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Solid-state batteries, ultra-fast charging, vehicle-to-grid integration, and autonomous EV fleets.</p>' } }],
    activities: [{ id: 're-ev-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Drive an EV!', MIDDLE_SCHOOL: 'Plan a Trip', HIGH_SCHOOL: 'Compare Costs', UNDERGRADUATE: 'Charging Network', GRADUATE: 'Fleet Analysis', PHD: 'V2G Optimization' }, description: { ELEMENTARY: 'See how far an electric car can go on a charge!', MIDDLE_SCHOOL: 'Plan a road trip with charging stops.', HIGH_SCHOOL: 'Compare EV and gas car costs over time.', UNDERGRADUATE: 'Design a charging network for a city.', GRADUATE: 'Analyze fleet electrification economics.', PHD: 'Optimize vehicle-to-grid energy flows.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ev-game', type: 'simulation', title: 'EV Road Trip', description: 'Plan efficient trips with electric vehicles!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ev-quiz', passingScore: 80, questions: [{ id: 'revq1', question: { ELEMENTARY: 'What powers an electric car?', MIDDLE_SCHOOL: 'What is regenerative braking?', HIGH_SCHOOL: 'What is Level 3 charging?', UNDERGRADUATE: 'What is total cost of ownership?', GRADUATE: 'What is vehicle-to-grid (V2G)?', PHD: 'What is a key challenge for solid-state batteries?' }, options: { ELEMENTARY: ['A battery', 'Gasoline', 'Coal', 'Water'], MIDDLE_SCHOOL: ['Recapturing energy when slowing down', 'Braking really hard', 'Using new brakes', 'Braking slowly'], HIGH_SCHOOL: ['DC fast charging (50+ kW)', 'Regular outlet (120V)', 'Home charger (240V)', 'Solar charging'], UNDERGRADUATE: ['All costs over vehicle lifetime', 'Just purchase price', 'Only fuel costs', 'Insurance only'], GRADUATE: ['Using EV batteries to supply grid power', 'A video game', 'Virtual driving', 'Voice to garage'], PHD: ['Manufacturing scalability and cost', 'Too much energy', 'Too heavy', 'Wrong color'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electric cars run on large batteries that you charge with electricity!', MIDDLE_SCHOOL: 'Regenerative braking captures energy when you slow down and puts it back in the battery.', HIGH_SCHOOL: 'Level 3 DC fast charging can add hundreds of miles of range in under an hour.', UNDERGRADUATE: 'Total cost of ownership includes purchase, fuel, maintenance, and other costs over the vehicle\'s life.', GRADUATE: 'V2G allows parked EVs to discharge power back to the grid during peak demand.', PHD: 'Manufacturing solid-state batteries at scale with competitive cost remains the primary challenge.' } }, { id: 'revq2', question: { ELEMENTARY: 'How do electric cars charge?', MIDDLE_SCHOOL: 'What is regenerative braking?', HIGH_SCHOOL: 'What types of EV charging levels exist?', UNDERGRADUATE: 'How does managed EV charging reduce grid peak demand?', GRADUATE: 'What are the degradation impacts of DC fast charging on battery longevity?', PHD: 'How do vehicle-to-everything (V2X) architectures enable bidirectional power flow between EVs and buildings/grid?' }, options: { ELEMENTARY: ['By plugging into a charger connected to the electricity grid', 'By filling with gas', 'Using solar only', 'They charge themselves'], MIDDLE_SCHOOL: ['Capturing energy from slowing down to recharge the battery', 'Breaking really fast', 'A special brake pedal', 'Stopping without brakes'], HIGH_SCHOOL: ['Level 1 (120V), Level 2 (240V), and DC fast charging (480V+)', 'Only one type exists', 'Level 1 through Level 10', 'Only fast charging'], UNDERGRADUATE: ['Smart charging shifts EV load to off-peak hours reducing peak demand by 30-60%', 'Managed charging increases peak demand', 'No effect on grid', 'Only charges at peak times'], GRADUATE: ['Frequent DCFC above 50 kW accelerates lithium plating and SEI growth, reducing battery life 10-30%', 'Fast charging has no effect', 'Improves battery life', 'Only affects range temporarily'], PHD: ['V2X uses bidirectional chargers with grid-forming capability for V2G, V2H, and V2B power export', 'Bidirectional flow is impossible', 'Only V2G exists', 'EVs can only receive power'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electric cars charge by plugging into a charging station connected to the electricity grid, just like charging a phone but much bigger!', MIDDLE_SCHOOL: 'Regenerative braking captures the kinetic energy when an EV slows down and converts it back to electricity to recharge the battery, extending driving range by 10-30%.', HIGH_SCHOOL: 'EV charging levels: Level 1 (120V AC, 1-2 kW, overnight), Level 2 (240V AC, 7-19 kW, 4-8 hours), DC Fast Charging (200-1000V DC, 50-350 kW, 15-45 minutes to 80%).', UNDERGRADUATE: 'Managed (smart) charging uses price signals, utility programs, or fleet scheduling to shift EV charging from peak demand hours to overnight valleys, reducing grid peak demand by 30-60% compared to unmanaged charging.', GRADUATE: 'Repeated DC fast charging above 50 kW accelerates lithium plating at the anode and SEI layer growth due to high C-rates and localized heating, reducing battery capacity 10-30% faster than predominantly Level 2 charging.', PHD: 'V2X architectures use bidirectional onboard or offboard chargers with grid-forming inverter capability to export power: V2G (to grid for ancillary services), V2H (to home during outages), and V2B (to building for demand charge reduction).' } }, { id: 'revq3', question: { ELEMENTARY: 'How far can electric cars drive on one charge?', MIDDLE_SCHOOL: 'What is range anxiety?', HIGH_SCHOOL: 'How does battery thermal management affect EV performance?', UNDERGRADUATE: 'What infrastructure planning models optimize public EV charging network deployment?', GRADUATE: 'How do battery swapping systems compare to fast charging for commercial fleet electrification?', PHD: 'What are the grid infrastructure upgrade requirements to support high EV adoption scenarios?' }, options: { ELEMENTARY: ['100 to 400+ miles depending on the car and battery', 'Only 5 miles', 'They never need charging', 'Exactly 1000 miles'], MIDDLE_SCHOOL: ['Worry about running out of charge before reaching a charger', 'Fear of driving at night', 'Anxiety about car repairs', 'Worry about gas prices'], HIGH_SCHOOL: ['Liquid cooling maintains optimal 20-40C range for performance and longevity', 'Temperature doesnt matter', 'Only matters in winter', 'Only air cooling is used'], UNDERGRADUATE: ['Flow models, queuing theory, and spatial optimization place chargers to minimize wait times and maximize utilization', 'Random placement works', 'Only at gas stations', 'No planning needed'], GRADUATE: ['Swapping enables 3-5 minute exchanges ideal for taxis/delivery; fast charging suits most other use cases', 'Swapping is always superior', 'Identical approaches', 'Swapping is obsolete'], PHD: ['Transformer upgrades, service panel increases, and feeder reinforcement for clusters of simultaneous EV charging', 'No upgrades needed', 'Only new power plants', 'Only more solar panels'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Modern electric cars can drive 100 to over 400 miles on a single charge, and the range keeps improving with better batteries!', MIDDLE_SCHOOL: 'Range anxiety is the worry that your electric car will run out of battery charge before you can find a place to recharge.', HIGH_SCHOOL: 'Active liquid thermal management maintains battery cells at optimal 20-40C through cooling loops and heat pumps, maximizing power output, charging speed, and longevity while preventing thermal runaway.', UNDERGRADUATE: 'Public charging network optimization uses traffic flow models, queuing theory (M/G/c), and spatial optimization to place chargers where they minimize average wait time, maximize utilization, and serve equity-priority communities.', GRADUATE: 'Battery swapping enables 3-5 minute standardized exchanges ideal for high-utilization fleets (taxis, delivery), while fast charging suits most use cases with improving speeds. Swapping requires standardized batteries and significant depot infrastructure.', PHD: 'High EV adoption requires distribution transformer upgrades (residential clusters may need 2-3x capacity), 200A+ service panels, feeder reinforcement, and potentially dedicated medium-voltage circuits for fast charging hubs.' } }, { id: 'revq4', question: { ELEMENTARY: 'Are electric cars good for the environment?', MIDDLE_SCHOOL: 'What is a plug-in hybrid?', HIGH_SCHOOL: 'How do EV batteries get recycled?', UNDERGRADUATE: 'What is the total cost of ownership comparison between EVs and ICE vehicles?', GRADUATE: 'How do bidirectional charging standards enable vehicle-to-grid services?', PHD: 'What are the life-cycle assessment methodologies for comparing EV and ICE vehicle environmental impacts?' }, options: { ELEMENTARY: ['Yes! They produce zero tailpipe emissions', 'No, they pollute more than gas cars', 'Only if they use solar', 'They are the same as gas cars'], MIDDLE_SCHOOL: ['A car with both an electric motor and a gasoline engine', 'A regular gas car', 'A fully electric car', 'A hybrid bicycle'], HIGH_SCHOOL: ['Breaking them down to recover lithium, cobalt, nickel, and other valuable materials', 'They cannot be recycled', 'They are thrown away', 'They decompose naturally'], UNDERGRADUATE: ['EVs have higher upfront cost but lower fuel and maintenance, achieving parity at 3-7 years', 'EVs always cost more', 'ICE always costs more', 'Costs are identical'], GRADUATE: ['CCS/CHAdeMO with bidirectional capability and IEEE 1547/UL 1741 grid interconnection compliance', 'No standards exist', 'Only one-directional charging', 'Standards prevent V2G'], PHD: ['Cradle-to-grave LCA comparing manufacturing, use-phase electricity mix, and end-of-life across impact categories', 'Only tailpipe emissions matter', 'No methodology exists', 'Only fuel economy comparison'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Electric cars produce zero tailpipe emissions, and when charged with renewable energy, they are very clean for the environment.', MIDDLE_SCHOOL: 'A plug-in hybrid (PHEV) has both an electric motor with a rechargeable battery and a gasoline engine, giving you electric range plus gasoline backup for longer trips.', HIGH_SCHOOL: 'EV battery recycling uses hydrometallurgical or pyrometallurgical processes to recover valuable materials like lithium, cobalt, nickel, and manganese for reuse in new batteries.', UNDERGRADUATE: 'EV TCO includes higher MSRP offset by lower fuel cost (3-5x cheaper per mile), 40-60% lower maintenance (no oil changes, brake wear reduced by regen), achieving cost parity with comparable ICE vehicles at 3-7 years depending on driving patterns.', GRADUATE: 'Bidirectional charging requires CCS or CHAdeMO hardware with V2X capability, plus compliance with IEEE 1547 interconnection, UL 1741 safety certification, and utility-specific V2G program enrollment for grid service participation.', PHD: 'Comprehensive EV LCA uses cradle-to-grave methodology comparing manufacturing emissions (battery production), use-phase emissions (grid electricity mix over vehicle lifetime), and end-of-life (recycling recovery rates) across climate, resource, and toxicity impact categories.' } }, { id: 'revq5', question: { ELEMENTARY: 'What is the biggest battery in an electric car?', MIDDLE_SCHOOL: 'How long does it take to charge an electric car?', HIGH_SCHOOL: 'What materials are used in EV batteries?', UNDERGRADUATE: 'How do fleet electrification strategies differ from consumer EV adoption approaches?', GRADUATE: 'What power electronics advances enable ultra-fast charging above 350 kW?', PHD: 'How do second-life EV battery applications create circular economy value?' }, options: { ELEMENTARY: ['The battery pack under the floor that stores all the electricity', 'The car itself', 'The engine', 'A tiny battery like a phone'], MIDDLE_SCHOOL: ['From 30 minutes to overnight depending on the charger type', 'Always exactly 1 hour', '5 seconds', 'One full week'], HIGH_SCHOOL: ['Lithium, nickel, cobalt, manganese, and graphite', 'Only iron', 'Glass and plastic', 'Wood and copper'], UNDERGRADUATE: ['Fleet electrification uses TCO models, depot charging, and route optimization; consumer relies on incentives and public charging', 'No difference', 'Only fleet electrification works', 'Consumer always adopts first'], GRADUATE: ['Silicon carbide (SiC) power semiconductors enable 800V+ architectures with lower switching losses', 'No advances needed', 'Only copper wiring changes', 'Lower voltage is better'], PHD: ['Repurposing 70-80% SOH packs for stationary storage extends value by 5-10 years before recycling', 'No second-life value', 'Batteries must be immediately recycled', 'Only for small devices'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The biggest part of an electric car is its battery pack, which sits under the floor and can weigh 400-700 kg, storing enough electricity to drive hundreds of miles!', MIDDLE_SCHOOL: 'Charging time varies: Level 1 takes overnight (8-16 hours), Level 2 takes 4-8 hours, and DC fast charging can reach 80% in 15-45 minutes.', HIGH_SCHOOL: 'EV batteries primarily use lithium, nickel, cobalt, manganese (NMC) or lithium iron phosphate (LFP) cathodes, graphite anodes, and liquid electrolyte, with silicon-anode and solid-state technologies emerging.', UNDERGRADUATE: 'Fleet electrification uses depot-based TCO analysis, route-specific energy modeling, scheduled charging optimization, and centralized procurement, while consumer adoption relies on purchase incentives, public charging access, and dealership education.', GRADUATE: 'Silicon carbide (SiC) MOSFETs enable 800V+ vehicle architectures with 50% lower switching losses than silicon IGBTs, supporting 350+ kW charging at >95% efficiency while reducing thermal management requirements.', PHD: 'EV batteries at 70-80% state of health are repurposed for stationary storage (peak shaving, backup, grid services), extending total lifecycle value by 5-10 years before final recycling recovers critical minerals.' } }] },
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
    lessons: [{ id: 're-h2-1', title: 'The Lightest Fuel', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Hydrogen Power!</h2><p>Hydrogen is the lightest thing in the universe. When it combines with oxygen, it makes electricity and water!</p>', MIDDLE_SCHOOL: '<h2>How Hydrogen Works</h2><p>We can split water into hydrogen and oxygen using electricity. Later, fuel cells recombine them to make electricity.</p>', HIGH_SCHOOL: '<h2>Hydrogen Production</h2><p>Green hydrogen uses renewable electricity for electrolysis. Gray hydrogen comes from natural gas. Blue hydrogen captures the CO2.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Hydrogen Energy Systems: Electrolysis, Storage, and Applications</h2>

<p>The global hydrogen market produces approximately 95 million tonnes annually, but over 95% comes from fossil fuels. Green hydrogen—produced via electrolysis powered by renewables—is central to decarbonizing hard-to-electrify sectors. The DOE Hydrogen Shot targets $1/kg production cost by 2031, down from $4-6/kg today.</p>

<h3>Electrolyzer Technologies</h3>
<table class="technical-table">
<thead><tr><th>Technology</th><th>Efficiency</th><th>Capital Cost</th><th>Lifetime</th><th>Best Suited For</th></tr></thead>
<tbody>
<tr><td>Alkaline (AEL)</td><td>60-70% (LHV)</td><td>$500-1,000/kW</td><td>60,000-80,000 hours</td><td>Large-scale, steady operation</td></tr>
<tr><td>PEM</td><td>55-70% (LHV)</td><td>$1,000-1,800/kW</td><td>40,000-60,000 hours</td><td>Dynamic operation, compact footprint</td></tr>
<tr><td>Solid Oxide (SOEC)</td><td>75-85% (LHV)</td><td>$2,000-4,000/kW</td><td>20,000-40,000 hours</td><td>Industrial heat integration, highest efficiency</td></tr>
<tr><td>Anion Exchange Membrane</td><td>60-70% (LHV)</td><td>$800-1,500/kW (projected)</td><td>TBD</td><td>Emerging: low-cost materials, PEM-like dynamics</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-h2-undergrad-q1">
<p>"Green hydrogen costs are projected to fall to $1.5-3/kg by 2030 driven by electrolyzer manufacturing scale-up, declining renewable electricity costs, and improved capacity factors. At $2/kg, hydrogen becomes competitive with natural gas in many industrial applications."</p>
<cite>— IRENA, Green Hydrogen Cost Reduction: Scaling Up Electrolysers, 2023</cite>
</blockquote>

<h3>Hydrogen Storage and Transport</h3>
<ul>
<li><strong>Compressed gas:</strong> 350-700 bar; most mature; energy penalty 10-15% of H2 energy content</li>
<li><strong>Liquid hydrogen:</strong> -253°C; energy-intensive liquefaction (30% energy penalty); best for long-distance transport</li>
<li><strong>Salt cavern storage:</strong> Large-scale underground storage; lowest cost per kg for seasonal storage</li>
<li><strong>Ammonia (NH3):</strong> Energy carrier for shipping; requires cracking for end use; established infrastructure</li>
<li><strong>Pipeline:</strong> Existing natural gas pipelines can transport 5-20% H2 blends; dedicated H2 pipelines for higher concentrations</li>
</ul>

<h3>End-Use Applications</h3>
<table class="technical-table">
<thead><tr><th>Sector</th><th>Application</th><th>H2 Advantage</th><th>Competition</th></tr></thead>
<tbody>
<tr><td>Industry</td><td>Steel (DRI-H2), ammonia, refining</td><td>High-temperature heat, chemical feedstock</td><td>CCS on fossil processes</td></tr>
<tr><td>Transport</td><td>Heavy trucks, shipping, aviation (via SAF)</td><td>Energy density for long-range heavy-duty</td><td>Battery electric for shorter ranges</td></tr>
<tr><td>Power</td><td>Gas turbines, fuel cells for peaking/backup</td><td>Long-duration storage alternative</td><td>Batteries for short duration</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Hydrogen's role in the energy transition is defined by its versatility as both an energy carrier and chemical feedstock. The engineering challenge is efficiency: each conversion step (electricity→H2→end use) incurs losses, making direct electrification preferable where feasible. Hydrogen makes economic sense primarily where electrification is impractical—steelmaking, long-haul transport, seasonal storage—and where its chemical properties are irreplaceable.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Hydrogen Systems Integration: Sector Coupling, Infrastructure Planning, and Market Development</h2>

<p>Green hydrogen's potential as a universal energy carrier underpins ambitious policy targets: the EU aims for 10 million tonnes of domestic production and 10 million tonnes of imports by 2030, while the US Inflation Reduction Act offers production tax credits of up to $3/kg. Graduate analysis examines system-level optimization, infrastructure planning, and the institutional frameworks needed to create a functioning hydrogen economy.</p>

<h3>Hydrogen Hub Design</h3>
<p>The DOE Regional Clean Hydrogen Hubs (H2Hubs) program allocated $7 billion for seven hubs combining production, storage, transport, and end use:</p>

<table class="technical-table">
<thead><tr><th>Hub Element</th><th>Design Considerations</th><th>Scale Requirements</th></tr></thead>
<tbody>
<tr><td>Production</td><td>Electrolyzer sizing, renewable curtailment capture, grid connection</td><td>100 MW - 1 GW electrolyzer capacity</td></tr>
<tr><td>Storage</td><td>Salt caverns (lowest cost), lined rock caverns, compressed tanks</td><td>Days to seasonal (GWh scale)</td></tr>
<tr><td>Distribution</td><td>Pipeline (new or repurposed), tube trailers, liquid H2 tankers</td><td>Regional network, 50-500 km</td></tr>
<tr><td>End use</td><td>Industrial offtakers, fueling stations, power generation</td><td>Demand aggregation for bankability</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-h2-grad-q1">
<p>"The economics of green hydrogen are primarily determined by three factors: electricity cost (50-70% of production cost), electrolyzer capital cost (20-30%), and capacity factor (10-20%). Optimizing the coupling between variable renewables and electrolyzer operation is the central engineering challenge."</p>
<cite>— Nature Energy, "The Future of Green Hydrogen," 2023</cite>
</blockquote>

<h3>Sector Coupling Analysis</h3>
<ul>
<li><strong>Power-to-Gas:</strong> Converts renewable electricity surplus to hydrogen or synthetic methane for injection into gas networks</li>
<li><strong>Power-to-Liquids:</strong> Fischer-Tropsch synthesis of H2 + captured CO2 produces synthetic fuels for aviation and shipping</li>
<li><strong>Industrial decarbonization:</strong> Green hydrogen replaces grey hydrogen (from SMR) in ammonia and refining; DRI-H2 replaces blast furnace steelmaking</li>
<li><strong>System flexibility:</strong> Electrolyzers as flexible load absorb renewable curtailment; H2 storage provides multi-day to seasonal energy shifting</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-h2-grad-q2">
<p>"Hydrogen infrastructure decisions made in the next decade will create path dependencies lasting 50+ years. Pipeline routing, storage site selection, and end-use technology choices will shape the spatial economics of the hydrogen economy for generations."</p>
<cite>— Energy Policy, "Infrastructure Planning for the Hydrogen Economy," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Hydrogen systems analysis requires integrated energy system models that capture the interactions between electricity, gas, heat, and transport networks. Key research questions include optimal electrolyzer-renewable coupling strategies under uncertainty, pipeline vs. truck vs. ammonia transport cost crossovers at different distances, and the role of international hydrogen trade in global decarbonization. The field must also address safety standards, public acceptance, and workforce development for an industry that will scale from niche to commodity within a decade.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>High-temperature electrolysis, hydrogen carriers (ammonia, LOHC), and large-scale system optimization.</p>' } }],
    activities: [{ id: 're-h2-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make Hydrogen!', MIDDLE_SCHOOL: 'Split Water', HIGH_SCHOOL: 'Color the Hydrogen', UNDERGRADUATE: 'Cost Calculator', GRADUATE: 'Sector Coupling', PHD: 'System Optimization' }, description: { ELEMENTARY: 'See how water becomes hydrogen fuel!', MIDDLE_SCHOOL: 'Use electricity to split water molecules.', HIGH_SCHOOL: 'Compare green, blue, and gray hydrogen.', UNDERGRADUATE: 'Calculate levelized cost of hydrogen.', GRADUATE: 'Design a hydrogen sector coupling system.', PHD: 'Optimize a regional hydrogen network.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-h2-game', type: 'simulation', title: 'Hydrogen Highway', description: 'Build a hydrogen economy from production to use!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-h2-quiz', passingScore: 80, questions: [{ id: 'rh2q1', question: { ELEMENTARY: 'What do you get when hydrogen meets oxygen?', MIDDLE_SCHOOL: 'What is electrolysis?', HIGH_SCHOOL: 'What is green hydrogen?', UNDERGRADUATE: 'What determines green hydrogen cost?', GRADUATE: 'What is sector coupling?', PHD: 'What is a hydrogen carrier?' }, options: { ELEMENTARY: ['Electricity and water', 'Fire', 'Nothing', 'Smoke'], MIDDLE_SCHOOL: ['Splitting water with electricity', 'Mixing chemicals', 'Burning fuel', 'Freezing water'], HIGH_SCHOOL: ['Hydrogen from renewable electrolysis', 'Hydrogen painted green', 'Hydrogen from plants', 'Natural hydrogen'], UNDERGRADUATE: ['Electricity cost and electrolyzer efficiency', 'Just the color', 'Only distance', 'Weather alone'], GRADUATE: ['Linking electricity to other sectors via hydrogen', 'Combining companies', 'Mixing fuels', 'Team building'], PHD: ['A molecule that stores hydrogen for transport', 'A hydrogen truck', 'A pipe', 'A fuel station'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When hydrogen and oxygen combine in a fuel cell, they make electricity and clean water!', MIDDLE_SCHOOL: 'Electrolysis uses electricity to split water molecules into hydrogen and oxygen gases.', HIGH_SCHOOL: 'Green hydrogen is produced using renewable electricity to power electrolyzers.', UNDERGRADUATE: 'Electricity cost (70%+) and electrolyzer capital/efficiency are the main cost drivers.', GRADUATE: 'Sector coupling uses hydrogen to connect renewable electricity to transport, industry, and heating.', PHD: 'Carriers like ammonia or liquid organic hydrogen carriers (LOHC) enable efficient long-distance transport.' } }, { id: 'rh2q2', question: { ELEMENTARY: 'What color is hydrogen gas?', MIDDLE_SCHOOL: 'How is green hydrogen made?', HIGH_SCHOOL: 'What is the energy density of hydrogen compared to gasoline?', UNDERGRADUATE: 'What are the current costs and efficiency of PEM vs alkaline electrolyzers?', GRADUATE: 'How do hydrogen storage methods compare in volumetric and gravimetric density?', PHD: 'What are the techno-economic barriers to scaling green hydrogen to gigawatt capacity?' }, options: { ELEMENTARY: ['Colorless - you cant see it!', 'Blue', 'Green', 'Red'], MIDDLE_SCHOOL: ['Using renewable electricity to split water', 'Painting it green', 'From green plants', 'Mining from the ground'], HIGH_SCHOOL: ['Hydrogen has 3x more energy per kg but is very light and takes up lots of space', 'Less than gasoline', 'Exactly the same', 'Hydrogen is heavier'], UNDERGRADUATE: ['PEM: higher efficiency (60-70%), faster response; alkaline: lower cost, proven at scale', 'They are identical', 'PEM is always cheaper', 'Alkaline is more efficient'], GRADUATE: ['Compressed gas (700 bar): 40 g/L; liquid H2: 71 g/L; metal hydrides: variable', 'All methods are equal', 'Only compressed works', 'Storage is impossible'], PHD: ['Electrolyzer manufacturing scale, renewable electricity cost, and infrastructure buildout are key barriers', 'No barriers exist', 'Only water supply matters', 'Technology is fully mature'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Hydrogen gas is completely colorless and invisible. You cannot see, smell, or taste it!', MIDDLE_SCHOOL: 'Green hydrogen is made by using renewable electricity (solar or wind) to power an electrolyzer that splits water (H2O) into hydrogen and oxygen.', HIGH_SCHOOL: 'Hydrogen has about 3x the gravimetric energy density of gasoline (120 MJ/kg vs 44 MJ/kg) but very low volumetric density, requiring compression to 350-700 bar or liquefaction to -253C for practical storage.', UNDERGRADUATE: 'PEM electrolyzers offer 60-70% system efficiency, fast dynamic response, and compact footprint at higher cost ($1,100-1,800/kW). Alkaline electrolyzers provide proven reliability at lower cost ($500-1,000/kW) but slower load-following.', GRADUATE: 'Compressed H2 at 700 bar achieves ~40 g/L volumetric density; liquid H2 reaches 71 g/L but requires cryogenic storage; metal hydrides offer safe storage but add weight. Each suits different applications.', PHD: 'Scaling green hydrogen to GW requires electrolyzer manufacturing scale-up (current ~1-2 GW/yr global), renewable electricity at <$30/MWh, hydrogen pipeline and storage infrastructure, and offtake contract certainty to de-risk investment.' } }, { id: 'rh2q3', question: { ELEMENTARY: 'Can hydrogen power cars?', MIDDLE_SCHOOL: 'What is a fuel cell?', HIGH_SCHOOL: 'What is the difference between gray, blue, and green hydrogen?', UNDERGRADUATE: 'How does hydrogen fuel cell efficiency compare to battery electric for transportation?', GRADUATE: 'What role can hydrogen play in decarbonizing hard-to-abate industrial sectors?', PHD: 'How do integrated energy system models optimize hydrogen production, storage, and end-use across sectors?' }, options: { ELEMENTARY: ['Yes! Fuel cell cars run on hydrogen', 'No, only gasoline works', 'Only buses use hydrogen', 'Hydrogen is too dangerous'], MIDDLE_SCHOOL: ['A device that combines hydrogen and oxygen to make electricity and water', 'A phone battery', 'A solar cell', 'A type of generator'], HIGH_SCHOOL: ['Gray from natural gas; blue adds carbon capture; green uses renewable electrolysis', 'All the same', 'Only colors differ', 'Green means old'], UNDERGRADUATE: ['Fuel cells are 50-60% efficient at the wheel; BEV is 75-85% from grid to wheel', 'Fuel cells are always more efficient', 'They are identical', 'BEV is always worse'], GRADUATE: ['High-temperature process heat, steelmaking (DRI), ammonia, and refining are key applications', 'Only transportation matters', 'Industry cannot use hydrogen', 'Hydrogen replaces all fuels'], PHD: ['Whole-energy-system models co-optimize hydrogen with electricity, heat, and gas networks under sector coupling', 'Models are too complex', 'Only electrolyzer size matters', 'Each sector is independent'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Hydrogen fuel cell cars use hydrogen gas to generate electricity in a fuel cell, producing only water as exhaust.', MIDDLE_SCHOOL: 'A fuel cell is a device that combines hydrogen with oxygen in an electrochemical reaction to produce electricity, heat, and water - with zero emissions!', HIGH_SCHOOL: 'Gray hydrogen comes from steam methane reforming (~10 tCO2/tH2). Blue hydrogen adds carbon capture (85-95% capture rate). Green hydrogen uses renewable-powered electrolysis (near-zero emissions).', UNDERGRADUATE: 'Well-to-wheel efficiency: BEV achieves 75-85% (grid to wheel); hydrogen FCEV achieves 25-35% (electrolysis losses + compression + fuel cell). BEV is more efficient for light-duty vehicles; hydrogen suits heavy-duty and long-range.', GRADUATE: 'Hydrogen can decarbonize sectors where direct electrification is impractical: steel (H2-DRI replacing coke), ammonia/fertilizers (green NH3), high-temperature industrial heat (>400C), and long-haul heavy transport.', PHD: 'Integrated energy system models (e.g., TIMES, PyPSA) co-optimize hydrogen production, storage (salt caverns, tanks), transport (pipelines, trucks), and end-use across electricity, industry, transport, and heat sectors under cost and emission constraints.' } }, { id: 'rh2q4', question: { ELEMENTARY: 'Is hydrogen found naturally?', MIDDLE_SCHOOL: 'What comes out of a hydrogen fuel cell exhaust?', HIGH_SCHOOL: 'How is hydrogen transported?', UNDERGRADUATE: 'What are the safety considerations for hydrogen infrastructure?', GRADUATE: 'How do proton exchange membrane electrolyzers respond to variable renewable input?', PHD: 'What are the material science challenges for high-temperature solid oxide electrolysis?' }, options: { ELEMENTARY: ['Hydrogen is mostly found combined with other elements like in water', 'Yes, in hydrogen mines', 'Only in space', 'In special trees'], MIDDLE_SCHOOL: ['Just water and a little heat!', 'Black smoke', 'Carbon dioxide', 'Nothing at all'], HIGH_SCHOOL: ['By pipeline, tube trailer trucks, liquid tanker, or converted to ammonia for shipping', 'Only in balloons', 'By mail', 'Cannot be transported'], UNDERGRADUATE: ['Hydrogen is flammable with wide explosive range; ventilation, leak detection, and embrittlement management are critical', 'No safety concerns', 'Same as natural gas', 'Only in enclosed spaces'], GRADUATE: ['PEM ramps in milliseconds, enabling direct coupling with variable solar and wind output', 'Cannot follow variable input', 'Only works at constant power', 'Requires battery buffer always'], PHD: ['Electrode degradation, seal integrity, and chromium poisoning at 700-850C limit SOE cell lifetime', 'No challenges exist', 'Only cost matters', 'Temperature is not an issue'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Hydrogen is abundant but almost always bonded to other elements - in water (H2O) and hydrocarbons. Free hydrogen gas must be produced.', MIDDLE_SCHOOL: 'The only exhaust from a hydrogen fuel cell is pure water and a little heat - making it one of the cleanest energy technologies!', HIGH_SCHOOL: 'Hydrogen is transported via dedicated pipelines (cheapest for large volumes), compressed gas tube trailers (regional), cryogenic liquid tankers, or converted to ammonia/LOHC for ocean shipping.', UNDERGRADUATE: 'Hydrogen safety requires managing its wide flammable range (4-75% in air), invisible flame, metal embrittlement of steel pipelines, and buoyant rapid dispersion through leak detection, ventilation design, and hydrogen-rated materials.', GRADUATE: 'PEM electrolyzers ramp from 0-100% in seconds to milliseconds, enabling direct coupling with variable renewable output without intermediate battery storage, though dynamic operation impacts membrane durability.', PHD: 'SOEC operates at 700-850C achieving >90% electrical efficiency but faces nickel electrode coarsening, glass-ceramic seal degradation, chromium vapor poisoning from interconnects, and thermal cycling fatigue limiting stack lifetime to 20,000-40,000 hours.' } }, { id: 'rh2q5', question: { ELEMENTARY: 'Can hydrogen store energy from wind and solar?', MIDDLE_SCHOOL: 'What is electrolysis?', HIGH_SCHOOL: 'How much water does electrolysis require to produce 1 kg of hydrogen?', UNDERGRADUATE: 'What blending limits exist for hydrogen in natural gas pipelines?', GRADUATE: 'How do hydrogen hubs and valleys accelerate the hydrogen economy?', PHD: 'What are the thermodynamic and practical efficiency limits of water electrolysis technologies?' }, options: { ELEMENTARY: ['Yes! Excess renewable electricity can make hydrogen for later use', 'No, hydrogen cant store energy', 'Only batteries can store it', 'Only pumped hydro'], MIDDLE_SCHOOL: ['Using electricity to split water into hydrogen and oxygen', 'A type of exercise', 'Mixing chemicals', 'Boiling water'], HIGH_SCHOOL: ['About 9-10 liters of purified water per kg H2', '1 drop', '100 liters', '1000 liters'], UNDERGRADUATE: ['Currently 5-20% by volume depending on pipeline material and end-use equipment', '100% hydrogen always works', 'No blending is possible', 'Only 0.1%'], GRADUATE: ['Regional hubs concentrate supply, demand, and infrastructure to achieve scale economies and learning rates', 'Hubs slow down progress', 'Only national scale works', 'Individual projects are better'], PHD: ['Thermoneutral voltage sets minimum energy; practical systems achieve 50-80% depending on technology and operating conditions', '100% efficiency is possible', 'No thermodynamic limits', 'Only Carnot limits apply'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! When there is extra wind or solar electricity, it can power electrolyzers to make hydrogen, which stores the energy for use when its needed.', MIDDLE_SCHOOL: 'Electrolysis is the process of using electricity to split water molecules (H2O) into hydrogen gas (H2) and oxygen gas (O2).', HIGH_SCHOOL: 'Producing 1 kg of hydrogen requires about 9-10 liters of purified water (stoichiometric 9 L plus process losses). This is modest compared to many industrial processes.', UNDERGRADUATE: 'Current blending limits range from 5-20% hydrogen by volume depending on pipeline steel grade (embrittlement risk), compressor compatibility, and downstream appliance tolerance. Higher blends require pipeline upgrades.', GRADUATE: 'Hydrogen hubs (e.g., US DOE Regional Clean Hydrogen Hubs) concentrate production, storage, and diverse end-uses in geographic clusters to achieve infrastructure scale, reduce unit costs, and build supply chain expertise.', PHD: 'Water electrolysis minimum energy is the thermoneutral voltage (1.48V at 25C). Practical efficiencies: alkaline 60-70%, PEM 55-70%, SOEC 75-90% (benefiting from thermal energy input), all referenced to HHV of hydrogen produced.' } }] },
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
    lessons: [{ id: 're-stor-1', title: 'Saving Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Piggy Bank!</h2><p>Sometimes the sun shines when we dont need power. We save that energy in batteries for nighttime!</p>', MIDDLE_SCHOOL: '<h2>Why Store Energy?</h2><p>Wind and solar dont always match demand. Storage bridges the gap, saving excess and releasing when needed.</p>', HIGH_SCHOOL: '<h2>Storage Technologies</h2><p>Lithium-ion batteries, pumped hydro, compressed air, flywheels, and thermal storage each have different strengths.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Advanced Energy Storage: Technologies, Economics, and Grid Applications</h2>

<p>Global energy storage deployments reached 45 GW/99 GWh in 2023, with lithium-ion batteries dominating at 95% market share. However, the need for long-duration energy storage (LDES) to support grids with 80%+ renewable penetration is driving investment in diverse technologies including flow batteries, compressed air, iron-air, and gravity storage. Understanding technology tradeoffs and revenue stacking is essential for project economics.</p>

<h3>Storage Technology Comparison</h3>
<table class="technical-table">
<thead><tr><th>Technology</th><th>Duration</th><th>Round-Trip Efficiency</th><th>Cycle Life</th><th>LCOS ($/MWh)</th></tr></thead>
<tbody>
<tr><td>Li-ion (LFP)</td><td>1-4 hours</td><td>85-95%</td><td>3,000-6,000</td><td>$150-250</td></tr>
<tr><td>Vanadium redox flow</td><td>4-12 hours</td><td>65-80%</td><td>15,000+</td><td>$200-400</td></tr>
<tr><td>Iron-air</td><td>24-100+ hours</td><td>40-50%</td><td>5,000+</td><td>$50-100 (projected)</td></tr>
<tr><td>Compressed air (CAES)</td><td>8-24+ hours</td><td>50-70%</td><td>30+ years</td><td>$100-200</td></tr>
<tr><td>Pumped hydro</td><td>8-24+ hours</td><td>70-85%</td><td>50+ years</td><td>$100-150</td></tr>
<tr><td>Gravity storage</td><td>4-12 hours</td><td>75-85%</td><td>35+ years</td><td>$150-300</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-stor2-undergrad-q1">
<p>"Long-duration energy storage is the missing piece of the clean energy puzzle. While lithium-ion dominates short-duration applications, technologies providing 10-100+ hours of storage at costs below $20/kWh are essential for achieving 90%+ renewable grids."</p>
<cite>— LDES Council/McKinsey, Net-Zero Power: Long Duration Energy Storage for a Renewable Grid, 2023</cite>
</blockquote>

<h3>Revenue Stacking</h3>
<ul>
<li><strong>Energy arbitrage:</strong> Buy low/sell high across time-of-use periods; $20-80/MWh spread</li>
<li><strong>Frequency regulation:</strong> Fast response (sub-second) to grid frequency deviations; $5-30/MW-hr</li>
<li><strong>Capacity:</strong> Firm dispatchable capacity credit; $50-150/kW-year</li>
<li><strong>Transmission/distribution deferral:</strong> Defer infrastructure upgrades; $30-200/kW-year</li>
<li><strong>Renewable firming:</strong> Paired with solar/wind to provide firm clean power; value increasing with RE penetration</li>
</ul>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Energy storage economics are fundamentally about matching the right technology to the right application. Li-ion excels at short-duration, high-cycle applications like frequency regulation. Flow batteries and compressed air serve medium-duration needs. Emerging technologies like iron-air and green hydrogen target multi-day seasonal storage. The optimal grid-scale storage portfolio will include multiple technologies, and revenue stacking across services is essential to achieve bankable project economics today.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Energy Storage Market Integration: Wholesale Participation, Capacity Accreditation, and Degradation-Aware Dispatch</h2>

<p>FERC Orders 841 and 2222 opened wholesale electricity markets to energy storage, creating new opportunities and analytical challenges. Graduate analysis examines storage dispatch optimization under market uncertainty, effective load carrying capability (ELCC) for capacity accreditation, degradation-aware bidding strategies, and the regulatory evolution needed to properly value storage flexibility.</p>

<h3>Wholesale Market Participation</h3>
<table class="technical-table">
<thead><tr><th>Market Product</th><th>Storage Advantage</th><th>Revenue Potential</th><th>Operational Requirement</th></tr></thead>
<tbody>
<tr><td>Day-ahead energy</td><td>Price arbitrage with perfect foresight</td><td>$30-100/kW-year</td><td>Optimal charge/discharge scheduling</td></tr>
<tr><td>Real-time energy</td><td>Fast ramping captures price spikes</td><td>$10-50/kW-year</td><td>5-minute dispatch response</td></tr>
<tr><td>Regulation (RegD)</td><td>Sub-second response, high mileage payments</td><td>$40-120/kW-year</td><td>AGC signal following</td></tr>
<tr><td>Spinning reserve</td><td>Instantaneous response capability</td><td>$5-20/kW-year</td><td>10-minute sustained output</td></tr>
<tr><td>Capacity market</td><td>Firm clean capacity</td><td>$50-200/kW-year</td><td>Duration and ELCC requirements</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-stor2-grad-q1">
<p>"Storage capacity accreditation must move beyond simple nameplate ratings to reflect actual reliability contributions. ELCC analysis shows that as storage penetration increases, the marginal capacity value of 4-hour batteries declines from 90% to 40-60% of nameplate, requiring longer durations or portfolio approaches."</p>
<cite>— NREL, Storage Futures Study: The Challenge of Defining Long-Duration Storage, 2023</cite>
</blockquote>

<h3>Degradation-Aware Dispatch Optimization</h3>
<p>Battery degradation is a function of depth of discharge, C-rate, temperature, and state of charge. Optimal dispatch must internalize degradation costs:</p>
<ul>
<li><strong>Calendar aging:</strong> Capacity loss from time at elevated temperature and SOC; 2-3% per year for LFP at 25°C</li>
<li><strong>Cycle aging:</strong> Capacity loss per full-equivalent cycle; 0.01-0.02% per cycle for LFP</li>
<li><strong>C-rate effects:</strong> Higher discharge rates increase degradation; optimal strategies avoid peak rates</li>
<li><strong>Co-optimization:</strong> Joint optimization of market revenue and battery lifetime using dynamic programming or MPC</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-stor2-grad-q2">
<p>"Degradation-aware dispatch increases battery net present value by 10-25% compared to revenue-maximizing strategies that ignore degradation, extending useful life from 8 to 12+ years."</p>
<cite>— IEEE Transactions on Energy Conversion, "Degradation-Aware Optimal Operation of Storage," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Storage market design remains an active area of policy and technical research. Key questions include how to properly accredit hybrid storage+renewable resources, whether markets need product definitions for multi-day or seasonal storage, and how to manage strategic behavior by storage operators with market power. The intersection of battery degradation science and market optimization creates opportunities for interdisciplinary research spanning electrochemistry, operations research, and market design.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Next-gen chemistries, degradation modeling, and optimal sizing/dispatch under uncertainty.</p>' } }],
    activities: [{ id: 're-stor-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fill the Battery!', MIDDLE_SCHOOL: 'Match Supply and Demand', HIGH_SCHOOL: 'Compare Technologies', UNDERGRADUATE: 'Revenue Stacking', GRADUATE: 'Market Simulation', PHD: 'Portfolio Optimization' }, description: { ELEMENTARY: 'Store sunshine for nighttime use!', MIDDLE_SCHOOL: 'Balance renewable generation with storage.', HIGH_SCHOOL: 'Compare different storage technologies.', UNDERGRADUATE: 'Stack multiple revenue streams.', GRADUATE: 'Optimize storage in wholesale markets.', PHD: 'Design an optimal storage portfolio.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-stor-game', type: 'simulation', title: 'Storage Manager', description: 'Manage energy storage to keep the lights on!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-stor-quiz', passingScore: 80, questions: [{ id: 'rstq1', question: { ELEMENTARY: 'Why do we need to store energy?', MIDDLE_SCHOOL: 'What is the most common grid battery type?', HIGH_SCHOOL: 'What is round-trip efficiency?', UNDERGRADUATE: 'What is energy arbitrage?', GRADUATE: 'What is capacity value?', PHD: 'What is calendar aging?' }, options: { ELEMENTARY: ['To use sun power at night', 'For decoration', 'To make noise', 'For fun'], MIDDLE_SCHOOL: ['Lithium-ion', 'Lead-acid', 'Alkaline', 'Car battery'], HIGH_SCHOOL: ['Energy out divided by energy in', 'How fast it charges', 'How big it is', 'The color'], UNDERGRADUATE: ['Buying low, selling high', 'Free energy', 'Government payments', 'Charity'], GRADUATE: ['Ability to provide power when needed most', 'Battery capacity', 'Storage size', 'Energy amount'], PHD: ['Degradation over time regardless of use', 'Cycle degradation', 'Temperature effects', 'Manufacturing defects'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We store solar energy during the day so we can use it at night when the sun isnt shining!', MIDDLE_SCHOOL: 'Lithium-ion batteries are the most common type used for grid-scale storage today.', HIGH_SCHOOL: 'Round-trip efficiency is how much energy you get back compared to what you put in.', UNDERGRADUATE: 'Arbitrage profits from price differences - charging when cheap, discharging when expensive.', GRADUATE: 'Capacity value reflects storage ability to provide power during peak demand periods.', PHD: 'Calendar aging degrades batteries over time even without cycling, due to side reactions.' } }, { id: 'rstq12', question: { ELEMENTARY: 'What are different ways to store energy?', MIDDLE_SCHOOL: 'How does gravity energy storage work?', HIGH_SCHOOL: 'What is the difference between short and long duration energy storage?', UNDERGRADUATE: 'How do zinc-bromine flow batteries perform in commercial installations?', GRADUATE: 'What are the thermodynamic efficiency limits of adiabatic compressed air energy storage?', PHD: 'How do multi-physics degradation models predict calendar and cycle aging interactions in grid batteries?' }, options: { ELEMENTARY: ['Batteries, pumped hydro, compressed air, and flywheels', 'Only batteries', 'Only coal', 'No ways exist'], MIDDLE_SCHOOL: ['Lifting heavy weights up and lowering them to generate electricity', 'Using gravity to hold things down', 'Making things float', 'Weighing objects'], HIGH_SCHOOL: ['Short is minutes to hours; long is days to seasonal storage', 'No difference', 'Short is faster', 'Long is smaller'], UNDERGRADUATE: ['Zinc-bromine achieves 65-75% efficiency with independent power/energy scaling for 4-8 hour applications', 'They dont work commercially', '100% efficient', 'Only for homes'], GRADUATE: ['Thermal energy storage during compression limits polytropic efficiency losses to achieve 65-75% round-trip', 'No limits exist', '100% achievable', 'Only 10% possible'], PHD: ['Coupled SEI growth, lithium inventory loss, and LAM models predict nonlinear aging under mixed cycling and rest', 'Simple linear models suffice', 'Aging cannot be predicted', 'Only testing works'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy can be stored in many ways: batteries (chemical), pumped hydro (gravitational), compressed air (pressure), flywheels (kinetic), and thermal storage (heat or cold).', MIDDLE_SCHOOL: 'Gravity energy storage lifts heavy blocks or water to a height when electricity is cheap, then lowers them through generators when power is needed.', HIGH_SCHOOL: 'Short-duration storage (minutes to 4 hours) serves frequency regulation and peak shaving. Long-duration (8-100+ hours) provides multi-day resilience and seasonal shifting.', UNDERGRADUATE: 'Commercial zinc-bromine flow batteries achieve 65-75% round-trip efficiency with independently scalable power (stack) and energy (tank), suited for 4-8 hour C&I peak shaving applications with 20-year expected lifetimes.', GRADUATE: 'Adiabatic CAES stores compression heat in thermal energy storage media and returns it during expansion, theoretically achieving 65-75% round-trip efficiency by avoiding fuel combustion needed in diabatic systems.', PHD: 'Multi-physics aging models couple SEI growth kinetics, lithium inventory loss, and loss of active material (LAM) in both electrodes, capturing nonlinear interactions between calendar fade and cycle degradation under realistic grid duty cycles.' } }, { id: 'rstq13', question: { ELEMENTARY: 'Why do batteries get warm when charging?', MIDDLE_SCHOOL: 'What is a vanadium redox flow battery?', HIGH_SCHOOL: 'How does liquid air energy storage work?', UNDERGRADUATE: 'What are the key performance metrics for evaluating grid energy storage technologies?', GRADUATE: 'How do hybrid storage systems combining batteries and supercapacitors optimize grid applications?', PHD: 'What role does hydrogen storage play in seasonal energy balancing for high-renewable grids?' }, options: { ELEMENTARY: ['Chemical reactions inside produce heat', 'They have a heater', 'The sun warms them', 'Electricity is hot'], MIDDLE_SCHOOL: ['A battery using liquid vanadium in tanks that can be scaled independently', 'A battery made of rocks', 'A regular car battery', 'A type of fuel cell'], HIGH_SCHOOL: ['Air is liquefied and stored in tanks then expanded through turbines when power is needed', 'Liquid air is breathed by generators', 'Air is frozen solid', 'Fans blow liquid air'], UNDERGRADUATE: ['Round-trip efficiency, cycle life, energy/power density, response time, and LCOS', 'Only cost', 'Only size', 'Only speed'], GRADUATE: ['Supercapacitors handle power spikes; batteries provide energy, reducing battery stress and extending life', 'Hybrids are worse', 'Only one technology works', 'Supercapacitors replace batteries'], PHD: ['Underground hydrogen storage in salt caverns provides TWh-scale seasonal storage impossible with batteries', 'Hydrogen cannot be stored seasonally', 'Only batteries work for seasons', 'Salt caverns are too small'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Chemical reactions inside the battery generate heat as a byproduct when charging and discharging - thats why your phone sometimes feels warm while charging!', MIDDLE_SCHOOL: 'Vanadium redox flow batteries store energy in liquid vanadium electrolyte in external tanks, allowing independent scaling of power (stack size) and energy (tank volume) for long-duration applications.', HIGH_SCHOOL: 'Liquid air energy storage (LAES/CRYOBattery) cools air to -196C for storage in insulated tanks, then warms and expands it through turbines to generate electricity, achieving 50-70% round-trip efficiency at scale.', UNDERGRADUATE: 'Key metrics include round-trip efficiency (%), cycle life (# cycles), energy density (Wh/L), power density (W/L), response time (ms-min), levelized cost of storage ($/MWh-cycle), and calendar life (years).', GRADUATE: 'Hybrid battery-supercapacitor systems use supercapacitors for high-power transients (frequency regulation, ramp support) while batteries handle energy-intensive services, reducing battery C-rate stress and extending cycle life by 30-50%.', PHD: 'Underground hydrogen storage in salt caverns provides TWh-scale seasonal storage capacity (>100 GWh per cavern) at $1-2/kWh, uniquely suited to bridging multi-week renewable droughts impossible to address with battery storage.' } }] },
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
    lessons: [{ id: 're-cs-1', title: 'Sharing Solar', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Solar for Everyone!</h2><p>Not everyone has a sunny roof. Community solar lets many people share one big solar farm!</p>', MIDDLE_SCHOOL: '<h2>How Community Solar Works</h2><p>A solar farm is built nearby. People subscribe and get credits on their electric bill for their share of the power.</p>', HIGH_SCHOOL: '<h2>Community Solar Models</h2><p>Utility-led programs, third-party developers, and cooperative models each have different structures and benefits.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Community Solar: Project Development, Subscriber Economics, and Equitable Access</h2>

<p>Community solar enables households and businesses to benefit from solar energy without rooftop installations. With over 6 GW installed across 43 states, community solar is the fastest-growing segment of the U.S. distributed solar market. Programs allow subscribers to receive bill credits for their share of a local solar project's output, democratizing access to clean energy.</p>

<h3>Community Solar Business Models</h3>

<table class="technical-table">
<thead>
<tr><th>Model</th><th>Ownership</th><th>Subscriber Relationship</th><th>Typical Discount</th></tr>
</thead>
<tbody>
<tr><td>Utility-administered</td><td>Utility or third-party</td><td>Opt-in program on utility bill</td><td>5-15% bill credit discount</td></tr>
<tr><td>Third-party developer</td><td>Developer SPV</td><td>Subscription agreement (12-25 yr)</td><td>10-20% savings guarantee</td></tr>
<tr><td>Community-owned</td><td>Cooperative or nonprofit</td><td>Member ownership shares</td><td>Variable based on production</td></tr>
<tr><td>Anchor-subscriber</td><td>Developer with anchor tenant</td><td>Large offtaker + residential</td><td>Anchor gets better rate</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-cs-undergrad-q1">
<p>"Community solar can serve the 77% of U.S. households unable to install rooftop solar due to renting, shading, roof condition, or cost barriers. Low-income carve-outs in program design are essential to ensuring equitable participation."</p>
<cite>— NREL, Sharing the Sun: Community Solar Deployment, 2023</cite>
</blockquote>

<h3>Project Development Economics</h3>
<ul>
<li><strong>Site selection:</strong> Proximity to load (interconnection capacity), land cost, solar resource, environmental screening</li>
<li><strong>Interconnection:</strong> Distribution-level (typically <5 MW AC); hosting capacity analysis determines feasibility</li>
<li><strong>Subscriber acquisition:</strong> Customer acquisition cost of $0.10-0.25/W; churn management critical for revenue certainty</li>
<li><strong>Bill credit mechanism:</strong> Virtual net metering (VNM) credits subscriber accounts at retail or avoided-cost rate</li>
<li><strong>Revenue model:</strong> Subscriber discount (10-20% off retail) while developer earns ITC + PTC + subscriber payments</li>
</ul>

<h3>Low-Income Access Design</h3>
<table class="technical-table">
<thead>
<tr><th>State</th><th>LMI Carve-out</th><th>Additional Incentives</th><th>Program Scale</th></tr>
</thead>
<tbody>
<tr><td>New York</td><td>20% of capacity</td><td>Adder for LMI subscribers</td><td>2+ GW allocated</td></tr>
<tr><td>Colorado</td><td>5% minimum</td><td>Low-income weatherization integration</td><td>500+ MW</td></tr>
<tr><td>Illinois</td><td>50% of incentive budget</td><td>Illinois Solar for All program</td><td>800+ MW target</td></tr>
<tr><td>New Jersey</td><td>51% LMI requirement</td><td>Enhanced bill credit rate</td><td>150+ MW/year</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Community solar bridges the gap between utility-scale economics and distributed solar access. Project success depends on navigating interconnection queues, managing subscriber portfolios, and designing bill credit structures that deliver genuine savings while maintaining developer returns. The policy design of community solar programs—particularly LMI access provisions—determines whether this model delivers on its promise of energy democracy.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Community Solar: Program Design, Policy Analysis, and Equity Frameworks</h2>

<p>Community solar program design involves complex trade-offs between developer economics, subscriber value, grid impacts, and equity outcomes. Graduate analysis examines program evaluation methodologies, rate design implications, scalability constraints, and the emerging evidence base for low-income community solar effectiveness.</p>

<h3>Program Design Comparative Analysis</h3>

<table class="technical-table">
<thead>
<tr><th>Design Element</th><th>Options</th><th>Trade-offs</th></tr>
</thead>
<tbody>
<tr><td>Credit rate</td><td>Retail rate, avoided cost, value of solar</td><td>Higher credit = more subscriber value but potential cross-subsidy</td></tr>
<tr><td>Project size cap</td><td>1-5 MW typical</td><td>Larger = better economics; smaller = more distributed benefits</td></tr>
<tr><td>Geographic requirement</td><td>Same utility, county, or feeder</td><td>Tighter = more local benefit; broader = better site selection</td></tr>
<tr><td>Subscriber portability</td><td>Fixed allocation vs. transferable</td><td>Portability reduces churn risk but complicates billing</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-cs-grad-q1">
<p>"The fundamental tension in community solar policy is between developer-friendly programs that drive deployment volume and equity-centered programs that prioritize access for underserved communities. The most effective programs achieve both through thoughtful incentive design and dedicated LMI channels."</p>
<cite>— Lawrence Berkeley National Laboratory, Community Solar in the U.S.: Market Update, 2023</cite>
</blockquote>

<h3>Cross-Subsidy and Rate Design</h3>
<ul>
<li><strong>Cost shift debate:</strong> Non-participating ratepayers may bear grid costs if credit rate exceeds avoided cost</li>
<li><strong>Value of solar studies:</strong> LBNL methodology calculates avoided energy, capacity, T&D, and environmental costs</li>
<li><strong>Successor tariff design:</strong> Minnesota's community solar garden program provides a case study in rate evolution</li>
<li><strong>Locational value:</strong> Projects sited on constrained feeders provide higher grid value; some programs offer locational adders</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-cs-grad-q2">
<p>"Evidence from over 100 low-income community solar projects shows that program design features—auto-enrollment, on-bill financing, guaranteed savings, and simplified subscription—are more important than the discount rate in driving LMI participation and retention."</p>
<cite>— Clean Energy States Alliance, Low-Income Community Solar: Lessons Learned, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Community solar research increasingly focuses on measuring actual equity outcomes rather than assumed benefits. Key research questions include: Do LMI subscribers achieve the same savings as market-rate subscribers? Does community solar reduce energy burden for participants? How do subscriber churn patterns differ across income levels? And how should regulators balance deployment pace with equity outcomes when the two conflict?</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Optimal program design, subscriber churn modeling, and policy effectiveness evaluation.</p>' } }],
    activities: [{ id: 're-cs-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Join the Solar Garden!', MIDDLE_SCHOOL: 'Subscribe to Solar', HIGH_SCHOOL: 'Compare Programs', UNDERGRADUATE: 'Develop a Project', GRADUATE: 'Design for Equity', PHD: 'Optimize Policy' }, description: { ELEMENTARY: 'Sign up your family for shared solar!', MIDDLE_SCHOOL: 'Choose a community solar subscription.', HIGH_SCHOOL: 'Compare different community solar programs.', UNDERGRADUATE: 'Develop a community solar project.', GRADUATE: 'Design an equitable community solar program.', PHD: 'Optimize community solar policy design.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-cs-game', type: 'simulation', title: 'Solar Garden Builder', description: 'Create a community solar project for your neighborhood!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-cs-quiz', passingScore: 80, questions: [{ id: 'rcsq1', question: { ELEMENTARY: 'Who can join community solar?', MIDDLE_SCHOOL: 'How do you benefit from community solar?', HIGH_SCHOOL: 'What is virtual net metering?', UNDERGRADUATE: 'What is subscriber acquisition cost?', GRADUATE: 'What is a low-income carve-out?', PHD: 'What is subscriber churn?' }, options: { ELEMENTARY: ['Anyone, even renters!', 'Only homeowners', 'Only farmers', 'Only rich people'], MIDDLE_SCHOOL: ['Credits on your electric bill', 'Free panels on your roof', 'A new car', 'Free internet'], HIGH_SCHOOL: ['Crediting solar production to subscribers bills', 'Virtual reality solar', 'Video game', 'Online shopping'], UNDERGRADUATE: ['Cost to sign up each subscriber', 'Submarine cost', 'Solar panel cost', 'Land cost'], GRADUATE: ['Reserved capacity for low-income subscribers', 'Cutting out low income', 'Income limits', 'Tax breaks'], PHD: ['Rate at which subscribers leave the program', 'Butter making', 'Panel rotation', 'Sun movement'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Community solar is for everyone - renters, apartment dwellers, and people with shady roofs can all participate!', MIDDLE_SCHOOL: 'Subscribers receive bill credits based on their share of the solar farms production.', HIGH_SCHOOL: 'Virtual net metering credits a subscribers bill for their portion of offsite solar generation.', UNDERGRADUATE: 'Customer acquisition costs significantly impact project economics - typically $200-500 per subscriber.', GRADUATE: 'Low-income carve-outs reserve a percentage of project capacity for income-qualified participants.', PHD: 'Subscriber churn - customers leaving - affects revenue stability and requires ongoing marketing.' } }, { id: 'rcsq2', question: { ELEMENTARY: 'Can you use solar power if you dont have a roof?', MIDDLE_SCHOOL: 'What is a community solar garden?', HIGH_SCHOOL: 'How does virtual net metering work?', UNDERGRADUATE: 'What subscriber acquisition and retention strategies drive community solar program success?', GRADUATE: 'How do community solar programs address energy equity and environmental justice?', PHD: 'What are the optimal financial structures for community solar projects serving low-to-moderate income subscribers?' }, options: { ELEMENTARY: ['Yes! Community solar lets you share a solar farm', 'No, you must have panels on your roof', 'Only with batteries', 'Only businesses can'], MIDDLE_SCHOOL: ['A shared solar installation where many people subscribe for credits', 'A garden that grows in sunlight', 'Solar panels in a park', 'A type of greenhouse'], HIGH_SCHOOL: ['Subscribers receive bill credits from an offsite solar project proportional to their share', 'You must physically use the solar electricity', 'Credits only work on-site', 'Virtual means it doesnt work'], UNDERGRADUATE: ['Low barriers to entry, bill savings guarantees, and flexible subscription terms', 'Only door-to-door sales', 'No strategies needed', 'Only advertising works'], GRADUATE: ['Income-qualified carve-outs, low barriers, and siting in disadvantaged communities advance energy equity', 'Equity is not relevant', 'Only wealthy subscribers benefit', 'Community solar increases inequality'], PHD: ['On-bill financing, grant-leveraged subscriber funds, and LMI adders reduce barriers for underserved communities', 'Only standard financing', 'LMI programs are not viable', 'No special structures needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Community solar lets people who rent or dont have suitable roofs subscribe to a shared solar farm and get credits on their electricity bill.', MIDDLE_SCHOOL: 'A community solar garden is a solar installation shared by multiple subscribers who receive credits on their utility bills proportional to their subscription share.', HIGH_SCHOOL: 'Virtual net metering allocates generation credits from a community solar facility to subscriber utility accounts based on their subscription percentage, reducing their bills without physical connection to the solar array.', UNDERGRADUATE: 'Successful programs combine low/no upfront cost, guaranteed bill savings (5-15%), flexible terms (no long-term lock-in), simple enrollment, and community engagement to acquire and retain diverse subscriber bases.', GRADUATE: 'Community solar advances energy justice through income-qualified subscriber carve-outs (often 40-50% LMI), reduced credit requirements, multilingual outreach, and intentional siting in environmental justice communities.', PHD: 'LMI-focused structures use on-bill financing (no credit check), grant-leveraged subscriber funds, state LMI adders ($0.02-0.05/kWh above market), and nonprofit sponsorship models to ensure inclusive participation.' } }, { id: 'rcsq3', question: { ELEMENTARY: 'Do you have to own a house to use solar energy?', MIDDLE_SCHOOL: 'How does subscribing to community solar save money?', HIGH_SCHOOL: 'What is the typical size of a community solar project?', UNDERGRADUATE: 'How do state policies shape community solar market development?', GRADUATE: 'What interconnection and grid integration challenges face large community solar portfolios?', PHD: 'How do agrivoltaic community solar designs maximize co-benefits for farming communities?' }, options: { ELEMENTARY: ['No! Renters can participate in community solar', 'Yes, only homeowners can', 'Only businesses use solar', 'Only governments'], MIDDLE_SCHOOL: ['Your share of solar generation reduces your monthly electricity bill', 'It doesnt save money', 'You get free panels', 'Solar costs more'], HIGH_SCHOOL: ['Usually 1-5 MW serving 100-1000+ subscribers', 'Only tiny systems', 'Always 100 MW', 'Exactly 1 panel'], UNDERGRADUATE: ['Enabling legislation, program caps, subscriber rules, and credit rates determine market size', 'Policies dont matter', 'All states are the same', 'Only federal policy counts'], GRADUATE: ['Hosting capacity limits, voltage regulation, and protection coordination for distributed MW-scale injection', 'No challenges', 'Only transmission matters', 'Interconnection is instant'], PHD: ['Elevated panels allow farming underneath, providing crop shade benefits, pollinator habitat, and dual revenue streams', 'Solar prevents farming', 'Only flat ground panels work', 'No agricultural benefits'] }, correctIndex: 0, explanation: { ELEMENTARY: 'No! Community solar is perfect for renters, condo owners, and anyone who cant install rooftop panels - you subscribe to a shared solar project instead.', MIDDLE_SCHOOL: 'When your share of the community solar farm generates electricity, you receive credits on your electricity bill, typically saving 5-15% on your monthly costs.', HIGH_SCHOOL: 'Community solar projects are typically 1-5 MW, large enough to serve 100-1,000+ residential subscribers or a mix of residential, commercial, and anchor subscribers.', UNDERGRADUATE: 'State enabling legislation, program capacity caps, subscriber eligibility rules, bill credit rates (retail vs avoided cost), and REC ownership determine community solar market viability and growth trajectory.', GRADUATE: 'Large community solar portfolios face distribution hosting capacity constraints, requiring interconnection studies for voltage regulation, reverse power flow, protection coordination, and potential feeder upgrades for MW-scale injection.', PHD: 'Agrivoltaic community solar elevates panels 8-12 feet for equipment clearance, enabling shade-tolerant crop cultivation, pollinator habitat (25%+ yield improvement for some crops), and dual land-use revenue streams for farm communities.' } }] },
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
    lessons: [{ id: 're-nm-1', title: 'Meter Magic', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Backwards Meter!</h2><p>When your solar panels make more power than you use, the extra goes to your neighbors and your meter spins backwards!</p>', MIDDLE_SCHOOL: '<h2>How Net Metering Works</h2><p>Solar panels generate during the day. Excess goes to the grid. At night, you draw from the grid. You pay (or get paid) for the net.</p>', HIGH_SCHOOL: '<h2>Net Metering Policy</h2><p>States set net metering rules. Compensation rates, system size caps, and rollover policies vary widely.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Net Metering and Distributed Solar Compensation: Policy Frameworks and Economic Analysis</h2>

<p>Net metering—allowing solar customers to export excess generation to the grid in exchange for bill credits—has been the primary policy driver for U.S. distributed solar growth. Over 3.5 million U.S. homes have rooftop solar, the vast majority under net metering. However, as solar penetration grows, states are transitioning to successor tariffs that more precisely value distributed generation.</p>

<h3>Net Metering Policy Evolution</h3>

<table class="technical-table">
<thead>
<tr><th>Policy Generation</th><th>Credit Rate</th><th>Key Feature</th><th>Example States</th></tr>
</thead>
<tbody>
<tr><td>NEM 1.0</td><td>Full retail rate</td><td>1:1 kWh credit, annual true-up</td><td>Early CA, most states initially</td></tr>
<tr><td>NEM 2.0</td><td>TOU retail rate</td><td>Time-varying credits, non-bypassable charges</td><td>CA (2017-2023)</td></tr>
<tr><td>NEM 3.0 / NBT</td><td>Avoided cost (~$0.05-0.08/kWh)</td><td>Export rate based on grid value; encourages storage</td><td>CA (2023+)</td></tr>
<tr><td>Value of solar tariff</td><td>Calculated value (~$0.08-0.15/kWh)</td><td>Transparent methodology based on avoided costs</td><td>MN, AR, some others</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-nm-undergrad-q1">
<p>"The transition from retail-rate net metering to value-based compensation represents one of the most significant distributed energy policy shifts in a decade. Getting the export rate right—high enough to support continued solar adoption but low enough to avoid cost shifting—is the central challenge."</p>
<cite>— LBNL, Designing Distributed Generation Tariffs Well, 2022</cite>
</blockquote>

<h3>Value of Solar Components</h3>
<ul>
<li><strong>Avoided energy:</strong> Wholesale energy cost displaced by solar generation ($20-40/MWh)</li>
<li><strong>Avoided capacity:</strong> Reduction in peak demand and capacity procurement needs ($20-80/kW-year)</li>
<li><strong>Avoided T&D losses:</strong> Generation near load reduces transmission and distribution losses (5-8%)</li>
<li><strong>Environmental value:</strong> Avoided emissions and REC value ($5-30/MWh depending on market)</li>
<li><strong>Grid support services:</strong> Smart inverter Volt-VAR and frequency response capabilities</li>
</ul>

<h3>Cross-Subsidy Analysis</h3>
<p>The cross-subsidy debate centers on whether solar customers pay their fair share of fixed grid costs. Studies show the net impact depends on solar penetration, rate design, and local grid conditions. At low penetration (<5%), net metering typically provides net benefits to all ratepayers. At higher penetration, fixed cost recovery becomes a concern without rate reform.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Net metering policy directly affects distributed solar economics and, consequently, adoption rates, grid planning, and utility revenue. Engineers must understand both the technical value of distributed solar (avoided energy, capacity, and losses) and the economic framework through which that value is compensated. The trend toward time-varying and location-specific compensation creates opportunities for solar-plus-storage systems that can shift exports to high-value periods.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Rate Design and Distributed Generation Compensation: Economics, Equity, and Grid Integration</h2>

<p>Distributed generation compensation reform is among the most contentious regulatory proceedings in U.S. energy policy. Graduate analysis examines the methodological challenges of valuing distributed solar, rate design theory applied to prosumer tariffs, distributional equity impacts, and the interaction between compensation policy and technology adoption dynamics.</p>

<h3>Value of Solar Methodologies</h3>

<table class="technical-table">
<thead>
<tr><th>Component</th><th>Methodology</th><th>Typical Value Range</th><th>Key Uncertainty</th></tr>
</thead>
<tbody>
<tr><td>Energy</td><td>Wholesale LMP or avoided cost</td><td>$20-50/MWh</td><td>Future fuel prices</td></tr>
<tr><td>Generation capacity</td><td>ELCC-based capacity credit</td><td>$0-80/kW-yr</td><td>Solar penetration level</td></tr>
<tr><td>T&D capacity</td><td>Marginal cost of T&D expansion</td><td>$0-60/kW-yr</td><td>Location-specific; hard to generalize</td></tr>
<tr><td>Environmental</td><td>Social cost of carbon or REC value</td><td>$10-50/MWh</td><td>Policy-dependent valuation</td></tr>
<tr><td>Integration costs</td><td>Ramping, voltage, protection</td><td>-$5 to -$15/MWh</td><td>Penetration-dependent</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-nm-grad-q1">
<p>"The 'value of solar' is not a single number but a time-varying, location-specific, and penetration-dependent function. Simplifying it to a single tariff rate necessarily involves policy choices about which values to include and how to weight present versus future benefits."</p>
<cite>— The Electricity Journal, "Valuing Distributed Solar: Methodological Challenges," 2023</cite>
</blockquote>

<h3>Rate Design Principles</h3>
<ul>
<li><strong>Cost causation:</strong> Rates should reflect the actual costs a customer imposes on the system</li>
<li><strong>Gradualism:</strong> Avoid rate shock; transition existing solar customers to new rates over time</li>
<li><strong>Technology neutrality:</strong> Rate design should not favor specific technologies over others</li>
<li><strong>Equity:</strong> Ensure rate reform does not disproportionately burden low-income customers</li>
<li><strong>Simplicity vs. precision:</strong> More precise rates (TOU, demand charges) are harder for customers to understand</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-nm-grad-q2">
<p>"California's NEM 3.0 transition reduced the solar-only payback period from 5-6 years to 8-12 years, while making solar-plus-storage payback competitive at 6-8 years. This policy-driven shift toward storage co-deployment may ultimately accelerate grid flexibility."</p>
<cite>— Utility Dive analysis of CPUC Decision 22-12-056, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>The net metering reform debate reveals fundamental tensions in electricity regulation: between cost-of-service principles and clean energy adoption incentives, between economic efficiency and distributional equity, and between incumbent utility business models and emerging prosumer economics. Research is needed on the real-world adoption impacts of rate reforms and on designing compensation structures that send accurate price signals while maintaining solar market momentum.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Optimal DER compensation design, distributional equity, and dynamic tariff structures.</p>' } }],
    activities: [{ id: 're-nm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Watch Your Meter!', MIDDLE_SCHOOL: 'Track Your Power', HIGH_SCHOOL: 'Compare Policies', UNDERGRADUATE: 'Calculate Value', GRADUATE: 'Design a Tariff', PHD: 'Optimize Compensation' }, description: { ELEMENTARY: 'See your meter spin backwards with solar!', MIDDLE_SCHOOL: 'Track electricity flowing in and out.', HIGH_SCHOOL: 'Compare net metering rules in different states.', UNDERGRADUATE: 'Calculate the value of distributed solar.', GRADUATE: 'Design a successor net metering tariff.', PHD: 'Optimize DER compensation mechanisms.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-nm-game', type: 'simulation', title: 'Net Metering Master', description: 'Maximize value from your solar through smart net metering!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-nm-quiz', passingScore: 80, questions: [{ id: 'rnmq1', question: { ELEMENTARY: 'What happens to extra solar power you make?', MIDDLE_SCHOOL: 'What does net mean in net metering?', HIGH_SCHOOL: 'Who sets net metering rules?', UNDERGRADUATE: 'What is avoided cost?', GRADUATE: 'What is a demand charge?', PHD: 'What is cross-subsidization?' }, options: { ELEMENTARY: ['It goes to your neighbors', 'It disappears', 'It explodes', 'Nothing'], MIDDLE_SCHOOL: ['The difference between in and out', 'A fishing net', 'The internet', 'A basketball net'], HIGH_SCHOOL: ['State regulators', 'Solar companies', 'The sun', 'Homeowners'], UNDERGRADUATE: ['Costs the utility doesnt incur due to solar', 'Costs to avoid', 'Hidden fees', 'Future costs'], GRADUATE: ['A fee based on peak power draw', 'A military charge', 'A battery charge', 'An accusation'], PHD: ['One customer group paying for anothers costs', 'Crossing streams', 'Mixing subsidies', 'Double payments'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When you make more solar power than you need, it flows to your neighbors through the grid!', MIDDLE_SCHOOL: 'Net means the difference - what you sent out minus what you took in from the grid.', HIGH_SCHOOL: 'State public utility commissions or legislatures set net metering policies.', UNDERGRADUATE: 'Avoided costs include energy, capacity, and infrastructure the utility doesnt need to build.', GRADUATE: 'Demand charges are based on your highest power draw, not total energy used.', PHD: 'Cross-subsidization occurs when non-solar customers pay fixed costs that solar customers avoid.' } }, { id: 'rnmq2', question: { ELEMENTARY: 'What happens to extra solar electricity your home makes?', MIDDLE_SCHOOL: 'What is net metering?', HIGH_SCHOOL: 'How does net metering differ from feed-in tariffs?', UNDERGRADUATE: 'What cost-shifting concerns arise from net metering at high solar penetration?', GRADUATE: 'How do net billing and successor tariff designs balance DG compensation with cost allocation?', PHD: 'What econometric approaches isolate the causal impact of net metering policies on solar adoption?' }, options: { ELEMENTARY: ['It goes back to the grid and you get credit', 'It disappears', 'It breaks the grid', 'You have to throw it away'], MIDDLE_SCHOOL: ['Getting credit for excess solar electricity you send to the grid', 'Counting meters', 'Measuring internet speed', 'A type of power bill'], HIGH_SCHOOL: ['Net metering credits at retail rate; feed-in tariffs pay a fixed price per kWh exported', 'They are identical', 'Net metering pays more always', 'Feed-in tariffs are free'], UNDERGRADUATE: ['Non-solar customers may subsidize fixed grid costs not recovered through volumetric rates from net-metered customers', 'No cost concerns exist', 'Solar customers pay too much', 'Only utilities benefit'], GRADUATE: ['Net billing compensates exports at avoided cost while maintaining grid charge recovery through fixed charges or demand rates', 'Successor tariffs always reduce compensation', 'Only retail rate is fair', 'No alternative designs exist'], PHD: ['Difference-in-differences and regression discontinuity exploit policy variation across jurisdictions and time to identify causal effects', 'Only surveys work', 'Correlation equals causation', 'Econometrics cannot be applied'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When your solar panels make more electricity than you need, the extra flows back to the grid and your meter spins backward, giving you credit!', MIDDLE_SCHOOL: 'Net metering is a billing arrangement where you receive credit at the retail electricity rate for excess solar generation you export to the grid.', HIGH_SCHOOL: 'Net metering credits exports at the full retail rate. Feed-in tariffs (FITs) offer a fixed, often premium price per kWh exported, set by policy rather than linked to the retail rate.', UNDERGRADUATE: 'At high solar penetration, net-metered customers may not pay their proportional share of fixed grid infrastructure costs (poles, wires, transformers) that are recovered through volumetric rates, potentially shifting costs to non-solar ratepayers.', GRADUATE: 'Net billing successor tariffs (e.g., California NEM 3.0) compensate exports at avoided cost rates reflecting time-varying grid value, while recovering fixed costs through minimum bills, grid participation charges, or demand-based rates.', PHD: 'Econometric methods including difference-in-differences across state policy changes and regression discontinuity at program cap thresholds isolate the causal effect of net metering on residential solar adoption rates, controlling for confounders.' } }, { id: 'rnmq3', question: { ELEMENTARY: 'Does your electricity meter spin backward with solar panels?', MIDDLE_SCHOOL: 'What is a two-way meter?', HIGH_SCHOOL: 'What is time-of-use net metering?', UNDERGRADUATE: 'How do virtual net metering programs enable multi-tenant building solar?', GRADUATE: 'What are the utility planning implications of high net metering penetration on distribution circuits?', PHD: 'How do international net metering policy designs differ and what outcomes have they produced?' }, options: { ELEMENTARY: ['Yes! When you make more than you use, the meter goes backward', 'No, meters only go one way', 'Meters stop working', 'Meters go faster'], MIDDLE_SCHOOL: ['A meter that measures electricity flowing both to and from the grid', 'A meter with two screens', 'A meter that costs twice as much', 'Two separate meters'], HIGH_SCHOOL: ['Credits vary based on time of day - worth more during peak hours', 'Time doesnt matter', 'Only works at night', 'Same rate all day'], UNDERGRADUATE: ['Virtual metering allocates credits from a single rooftop array to multiple tenant accounts in one building', 'Only single-family homes can use solar', 'Each tenant needs their own array', 'Virtual means imaginary'], GRADUATE: ['Reverse power flow, voltage rise, protection miscoordination, and transformer aging require hosting capacity analysis', 'No planning implications', 'Only helps the utility', 'Penetration is always low'], PHD: ['Policies range from full retail (US) to percentage-based (Brazil) to avoided-cost (Australia successor), with varying adoption and equity outcomes', 'All countries use the same design', 'Only US has net metering', 'International approaches dont work'] }, correctIndex: 0, explanation: { ELEMENTARY: 'With traditional net metering, your meter effectively spins backward when your solar panels send excess electricity to the grid, reducing your bill.', MIDDLE_SCHOOL: 'A two-way (bidirectional) meter measures electricity flowing in both directions: from the grid to your home and from your solar panels back to the grid.', HIGH_SCHOOL: 'Time-of-use net metering applies different credit rates depending on when you export electricity, with higher value during peak demand hours and lower value during off-peak, incentivizing storage to shift exports.', UNDERGRADUATE: 'Virtual net metering enables a single solar installation on a multi-tenant building to allocate generation credits across all tenant utility accounts proportionally, removing the barrier of individual rooftop access.', GRADUATE: 'High net metering penetration causes reverse power flow, voltage rise beyond ANSI limits, protection miscoordination, and accelerated transformer aging, requiring utilities to perform hosting capacity analysis and targeted upgrades.', PHD: 'Net metering designs vary globally: US states offer full retail credit, Brazil uses percentage-based compensation, Australia transitioned to feed-in tariffs, and many countries cap program capacity - producing diverse adoption rates and cost-allocation outcomes.' } }] },
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
    lessons: [{ id: 're-eff-1', title: 'Doing More with Less', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Superheroes!</h2><p>Saving energy is like having a superpower. LED lights, good insulation, and smart habits help us waste less!</p>', MIDDLE_SCHOOL: '<h2>Why Efficiency Matters</h2><p>The cheapest, cleanest energy is the energy we dont use. Efficiency is often called the first fuel.</p>', HIGH_SCHOOL: '<h2>Efficiency Strategies</h2><p>Building envelope improvements, high-efficiency HVAC, LED lighting, and smart controls reduce consumption.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Energy Efficiency Engineering: Building Science, Economic Analysis, and Program Design</h2>

<p>Energy efficiency is the cheapest and fastest-to-deploy clean energy resource. The IEA estimates that efficiency improvements since 2000 avoided 12% of global energy demand growth. In the U.S., utility demand-side management (DSM) programs save approximately 30 TWh annually at an average cost of $0.025/kWh—roughly one-third the cost of new generation. Understanding building science, economic evaluation, and program design is essential for maximizing this resource.</p>

<h3>Building Energy Performance</h3>

<table class="technical-table">
<thead>
<tr><th>End Use</th><th>% of U.S. Building Energy</th><th>Key Efficiency Measures</th><th>Typical Savings</th></tr>
</thead>
<tbody>
<tr><td>HVAC</td><td>35-45%</td><td>Heat pumps, insulation, air sealing</td><td>30-50%</td></tr>
<tr><td>Lighting</td><td>10-15%</td><td>LED retrofit, controls, daylighting</td><td>50-80%</td></tr>
<tr><td>Water heating</td><td>10-15%</td><td>Heat pump water heaters</td><td>50-70%</td></tr>
<tr><td>Plug loads</td><td>15-25%</td><td>ENERGY STAR equipment, smart strips</td><td>20-40%</td></tr>
<tr><td>Building envelope</td><td>Affects all above</td><td>Insulation, windows, air barrier</td><td>20-40% whole-building</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-eff-undergrad-q1">
<p>"Energy efficiency is the 'first fuel'—the cleanest, cheapest energy resource available. Every dollar invested in efficiency avoids $2-4 in supply-side infrastructure costs. The challenge is not technology but deployment: overcoming market barriers to capture cost-effective savings at scale."</p>
<cite>— American Council for an Energy-Efficient Economy (ACEEE), State Energy Efficiency Scorecard, 2023</cite>
</blockquote>

<h3>Economic Evaluation Methods</h3>
<ul>
<li><strong>Simple payback:</strong> Investment cost / annual savings; typically require <5 years for commercial adoption</li>
<li><strong>Lifecycle cost analysis:</strong> NPV of all costs and savings over measure life; accounts for discount rate and escalation</li>
<li><strong>Total Resource Cost (TRC) test:</strong> Benefits (avoided energy, capacity, T&D) vs. costs (measure + program); must exceed 1.0</li>
<li><strong>Societal Cost Test (SCT):</strong> Adds externalities (emissions, health) to TRC; broader benefit accounting</li>
<li><strong>Cost of conserved energy (CCE):</strong> Annualized cost per kWh saved; compare to marginal generation cost</li>
</ul>

<h3>ASHRAE Energy Audit Levels</h3>
<table class="technical-table">
<thead>
<tr><th>Level</th><th>Scope</th><th>Deliverable</th><th>Cost</th></tr>
</thead>
<tbody>
<tr><td>Level 1: Walk-through</td><td>Visual inspection, utility analysis</td><td>Low/no-cost opportunities</td><td>$0.05-0.15/sqft</td></tr>
<tr><td>Level 2: Energy survey</td><td>Detailed analysis, engineering calculations</td><td>Prioritized ECM list with economics</td><td>$0.15-0.35/sqft</td></tr>
<tr><td>Level 3: Investment-grade</td><td>Building simulation, M&V plan</td><td>Bankable savings projections</td><td>$0.25-0.75/sqft</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Energy efficiency engineering requires integrating building science, HVAC design, controls engineering, and economic analysis. The fundamental principle—reducing energy waste is cheaper than producing new energy—applies across all building types and climate zones. However, capturing these savings requires overcoming persistent market barriers including split incentives (landlord/tenant), information asymmetry, and access to capital.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Energy Efficiency: Program Evaluation, Behavioral Science, and Market Transformation</h2>

<p>Scaling energy efficiency requires understanding not just the technical potential but the behavioral, institutional, and market barriers that prevent cost-effective measures from being adopted. Graduate analysis examines program evaluation methodologies, the energy efficiency gap, behavioral interventions, and market transformation strategies.</p>

<h3>The Energy Efficiency Gap</h3>

<table class="technical-table">
<thead>
<tr><th>Barrier Category</th><th>Mechanism</th><th>Example</th><th>Policy Response</th></tr>
</thead>
<tbody>
<tr><td>Split incentives</td><td>Investor ≠ beneficiary</td><td>Landlord pays for upgrades, tenant pays utility bill</td><td>Benchmarking, green lease provisions</td></tr>
<tr><td>Information failures</td><td>Lack of energy data</td><td>Buyer cannot assess home efficiency at purchase</td><td>Energy labeling, disclosure requirements</td></tr>
<tr><td>Capital constraints</td><td>High upfront cost</td><td>Low-income households cannot fund insulation</td><td>On-bill financing, PACE, WAP</td></tr>
<tr><td>Behavioral biases</td><td>Bounded rationality</td><td>Hyperbolic discounting of future savings</td><td>Defaults, social norms, smart nudges</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-eff-grad-q1">
<p>"The gap between technically cost-effective energy efficiency and actual adoption remains substantial—estimated at 20-50% of current energy consumption. Closing this gap requires not just better technology but better program design informed by behavioral science and institutional analysis."</p>
<cite>— Journal of Economic Perspectives, "The Energy Efficiency Gap," 2023</cite>
</blockquote>

<h3>Program Evaluation: EM&V</h3>
<ul>
<li><strong>Evaluation, Measurement, and Verification (EM&V):</strong> IPMVP protocols establish savings measurement standards</li>
<li><strong>Net vs. gross savings:</strong> Free-ridership (would have adopted anyway) and spillover (additional adoptions) adjust gross to net</li>
<li><strong>Randomized controlled trials:</strong> Gold standard for causal attribution; increasingly used in behavioral programs</li>
<li><strong>Advanced M&V 2.0:</strong> Using AMI data and statistical models for population-level savings estimation without individual metering</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-eff-grad-q2">
<p>"Behavioral interventions—social comparison reports, default enrollment, and commitment devices—can reduce household energy consumption by 2-5% at very low cost per kWh saved. When combined with traditional rebate programs, behavioral approaches amplify overall program effectiveness."</p>
<cite>— Science, "Behavioral Science and Energy Policy," 2022</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Energy efficiency research is evolving from engineering-centric analysis to interdisciplinary approaches integrating behavioral economics, data science, and implementation science. Key frontier questions include: How do we accurately measure efficiency savings at scale using smart meter data? How do rebound effects (increased consumption following efficiency gains) vary across income levels? And how should efficiency programs evolve as electrification and decarbonization reshape building energy systems?</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Technical potential studies, behavioral efficiency, and rebound effect quantification.</p>' } }],
    activities: [{ id: 're-eff-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Energy Detective!', MIDDLE_SCHOOL: 'Home Energy Audit', HIGH_SCHOOL: 'Calculate Savings', UNDERGRADUATE: 'Program Design', GRADUATE: 'Policy Analysis', PHD: 'Potential Study' }, description: { ELEMENTARY: 'Find ways to save energy in your home!', MIDDLE_SCHOOL: 'Audit your home for efficiency opportunities.', HIGH_SCHOOL: 'Calculate payback for efficiency upgrades.', UNDERGRADUATE: 'Design a utility efficiency program.', GRADUATE: 'Analyze efficiency policy effectiveness.', PHD: 'Conduct a technical potential study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-eff-game', type: 'simulation', title: 'Efficiency Expert', description: 'Find and fix energy waste to maximize savings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-eff-quiz', passingScore: 80, questions: [{ id: 'reffq1', question: { ELEMENTARY: 'Which light bulb saves the most energy?', MIDDLE_SCHOOL: 'Why is efficiency called the first fuel?', HIGH_SCHOOL: 'What is simple payback period?', UNDERGRADUATE: 'What is a Total Resource Cost test?', GRADUATE: 'What is market transformation?', PHD: 'What is the rebound effect?' }, options: { ELEMENTARY: ['LED', 'Old-style bulb', 'Candle', 'No light'], MIDDLE_SCHOOL: ['Its the cheapest, cleanest energy source', 'Its used first in the morning', 'Its number one', 'Its the hottest'], HIGH_SCHOOL: ['Cost divided by annual savings', 'How fast you run', 'When you get money back', 'First payment'], UNDERGRADUATE: ['Cost-effectiveness from all perspectives', 'Total car cost', 'Resource extraction', 'Full expenses'], GRADUATE: ['Lasting change in markets toward efficiency', 'Market changes', 'Stock trading', 'Shopping'], PHD: ['Increased consumption offsetting efficiency gains', 'Bouncing back', 'Market recovery', 'Spring effect'] }, correctIndex: 0, explanation: { ELEMENTARY: 'LED light bulbs use up to 90% less energy than old incandescent bulbs!', MIDDLE_SCHOOL: 'Efficiency is the first fuel because saved energy is cheaper and cleaner than any generation source.', HIGH_SCHOOL: 'Simple payback is the upfront cost divided by yearly savings - how long until it pays for itself.', UNDERGRADUATE: 'The TRC test weighs all costs and benefits to participants, utilities, and society.', GRADUATE: 'Market transformation creates permanent shifts in product availability and consumer behavior.', PHD: 'The rebound effect occurs when efficiency savings lead to increased use, partially offsetting gains.' } }, { id: 'reffq2', question: { ELEMENTARY: 'What does energy efficiency mean?', MIDDLE_SCHOOL: 'How do LED lights save energy?', HIGH_SCHOOL: 'What is an energy audit?', UNDERGRADUATE: 'What are the most cost-effective energy efficiency measures for commercial buildings?', GRADUATE: 'How do building energy performance certificates drive retrofit investment decisions?', PHD: 'What are the rebound effects that can erode energy efficiency savings in practice?' }, options: { ELEMENTARY: ['Using less energy to do the same job', 'Using no energy at all', 'Making more energy', 'Only using solar'], MIDDLE_SCHOOL: ['They use much less electricity than old bulbs to make the same light', 'They dont make light', 'They use more energy', 'Only last one day'], HIGH_SCHOOL: ['A checkup to find where a building wastes energy', 'A financial audit', 'A type of tax', 'An energy bill'], UNDERGRADUATE: ['LED lighting, HVAC optimization, envelope improvements, and controls yield highest ROI', 'Only solar panels', 'Replacing all equipment', 'No cost-effective measures'], GRADUATE: ['EPCs create transparent efficiency ratings that inform property valuation and trigger mandatory upgrades at transaction', 'EPCs have no influence', 'Only for new buildings', 'Certificates are decorative'], PHD: ['Direct rebound (increased use), indirect rebound (spending savings on energy-intensive goods), and economy-wide effects', 'No rebound effects exist', '100% of savings are lost', 'Only applies to vehicles'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy efficiency means getting the same result using less energy - like LED bulbs that give the same light while using 75% less electricity than old incandescent bulbs!', MIDDLE_SCHOOL: 'LED lights convert electricity to light much more efficiently than incandescent bulbs, using 75% less energy and lasting 25 times longer for the same brightness.', HIGH_SCHOOL: 'An energy audit is a professional assessment of a building to identify where energy is wasted and recommend improvements like better insulation, efficient appliances, and smart controls.', UNDERGRADUATE: 'Commercial building efficiency ROI leaders: LED retrofits (1-3 year payback), HVAC optimization and controls (2-5 years), envelope air sealing (3-7 years), and building automation systems (3-5 years).', GRADUATE: 'Energy Performance Certificates create transparent building efficiency ratings (A-G) that inform buyer/tenant decisions, affect property valuations (3-8% premium for A/B ratings), and trigger mandatory upgrade requirements at sale or lease in many jurisdictions.', PHD: 'Direct rebound (efficiency lowers cost per use, increasing consumption), indirect rebound (savings spent on other energy-intensive goods), and economy-wide effects (efficiency-driven GDP growth increasing total energy demand) can erode 20-60% of engineering savings estimates.' } }, { id: 'reffq3', question: { ELEMENTARY: 'Why is it good to turn off lights when leaving a room?', MIDDLE_SCHOOL: 'What is insulation?', HIGH_SCHOOL: 'How do heat pumps achieve efficiencies above 100%?', UNDERGRADUATE: 'What measurement and verification protocols ensure energy savings persistence?', GRADUATE: 'How do deep energy retrofits transform existing building stock toward net-zero?', PHD: 'What are the behavioral economics interventions that increase energy efficiency program participation?' }, options: { ELEMENTARY: ['It saves electricity and reduces waste', 'It doesnt matter', 'Only saves money for rich people', 'Lights turn off automatically'], MIDDLE_SCHOOL: ['Material that keeps heat in during winter and out during summer', 'A type of electricity', 'A wall decoration', 'A type of window'], HIGH_SCHOOL: ['They move heat rather than generating it, delivering 2-5 units of heat per unit of electricity', 'They break physics', 'Only in warm climates', 'They cant exceed 100%'], UNDERGRADUATE: ['IPMVP protocols use baseline comparison, metering, and statistical methods to verify realized savings', 'No verification needed', 'Only check once', 'Savings are guaranteed'], GRADUATE: ['Whole-building envelope, systems, and controls upgrades achieve 50-80% energy reduction targeting net-zero performance', 'Only replace windows', 'Minor changes are sufficient', 'Net-zero is impossible for existing buildings'], PHD: ['Social norms, defaults, loss framing, and commitment devices increase participation 20-50% vs standard marketing', 'Only rebates work', 'Behavior doesnt matter', 'Information alone is sufficient'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Turning off lights saves electricity, which means less energy wasted and a lower electricity bill for your family.', MIDDLE_SCHOOL: 'Insulation is material put in walls, roofs, and floors that slows heat transfer, keeping buildings warm in winter and cool in summer, reducing energy needed for heating and cooling.', HIGH_SCHOOL: 'Heat pumps achieve COP of 2-5 (200-500% efficiency) because they move existing heat from outdoors to indoors rather than generating heat, using electricity only to drive the refrigerant cycle.', UNDERGRADUATE: 'IPMVP (International Performance Measurement and Verification Protocol) uses calibrated baseline models, sub-metering, and normalized comparison to verify that energy conservation measures deliver projected savings over time.', GRADUATE: 'Deep energy retrofits integrate envelope upgrades (air sealing, super-insulation, high-performance windows), efficient HVAC (heat pumps), lighting, and smart controls to achieve 50-80% energy reduction, approaching net-zero with on-site renewables.', PHD: 'Behavioral economics shows that social norm comparisons (neighbor reports), opt-out defaults, loss framing, and public commitment devices increase efficiency program participation 20-50% more than rebates and information alone.' } }] },
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
    lessons: [{ id: 're-geo-1', title: 'Earth\'s Heat', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Hot Earth!</h2><p>Deep underground, the Earth is very hot. We can use this heat to warm buildings and make electricity!</p>', MIDDLE_SCHOOL: '<h2>Geothermal Basics</h2><p>Heat from Earths core flows upward. In some places, hot water and steam can be tapped for energy.</p>', HIGH_SCHOOL: '<h2>Geothermal Systems</h2><p>Flash steam, binary cycle, and dry steam plants. Ground source heat pumps use shallow earth temperature.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Advanced Geothermal Energy: Enhanced Systems, Resource Exploration, and Next-Generation Technologies</h2>

<p>Conventional hydrothermal geothermal provides approximately 16 GW of installed capacity globally, concentrated in volcanic regions. However, enhanced geothermal systems (EGS) could unlock 100+ GW of baseload clean power by creating artificial reservoirs in hot dry rock found virtually everywhere at sufficient depth. The DOE Enhanced Geothermal Shot targets $45/MWh LCOE by 2035.</p>

<h3>Geothermal Resource Classification</h3>

<table class="technical-table">
<thead>
<tr><th>Resource Type</th><th>Temperature</th><th>Depth</th><th>Global Capacity</th><th>Technology</th></tr>
</thead>
<tbody>
<tr><td>High-temp hydrothermal</td><td>>150°C</td><td>1-3 km</td><td>~16 GW installed</td><td>Flash/dry steam</td></tr>
<tr><td>Low-temp hydrothermal</td><td>90-150°C</td><td>1-3 km</td><td>~2 GW installed</td><td>Binary ORC</td></tr>
<tr><td>Enhanced geothermal (EGS)</td><td>150-300°C</td><td>3-7 km</td><td>~50 MW demo</td><td>Hydraulic stimulation + binary</td></tr>
<tr><td>Superhot rock</td><td>>375°C</td><td>5-10+ km</td><td>Research phase</td><td>Supercritical fluid systems</td></tr>
<tr><td>Closed-loop (AGS)</td><td>150-300°C</td><td>3-7 km</td><td>~5 MW demo</td><td>Sealed downhole heat exchanger</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-geo2-undergrad-q1">
<p>"Enhanced geothermal has the potential to provide over 100 GW of firm, baseload clean electricity in the U.S. alone—enough to replace a significant fraction of retiring fossil generation. The key challenge is reducing drilling costs, which represent 40-60% of total project cost."</p>
<cite>— DOE, Geothermal Technologies Office: Enhanced Geothermal Shot Analysis, 2023</cite>
</blockquote>

<h3>EGS Engineering</h3>
<ul>
<li><strong>Reservoir creation:</strong> Hydraulic stimulation (controlled injection at 5-15 MPa) creates fracture networks in low-permeability rock</li>
<li><strong>Well design:</strong> Injection and production wells spaced 500-1500m apart; directional drilling essential</li>
<li><strong>Heat extraction:</strong> Circulate water through engineered fracture network; binary ORC converts 150-200°C fluid to electricity</li>
<li><strong>Induced seismicity management:</strong> Traffic-light protocol (green/yellow/red) based on real-time seismic monitoring</li>
<li><strong>Flow short-circuiting:</strong> Major risk where fluid bypasses fracture network via single pathway; tracer testing validates distribution</li>
</ul>

<h3>Drilling Technology Innovation</h3>
<table class="technical-table">
<thead>
<tr><th>Technology</th><th>Mechanism</th><th>Cost Reduction Potential</th><th>Developer</th></tr>
</thead>
<tbody>
<tr><td>Millimeter-wave drilling</td><td>Directed energy vaporizes rock</td><td>10x faster; 50%+ cost reduction</td><td>Quaise Energy</td></tr>
<tr><td>Plasma pulse drilling</td><td>Electric discharge fractures rock</td><td>3-5x faster</td><td>GA Drilling</td></tr>
<tr><td>Advanced rotary (PDC)</td><td>Improved bit design and automation</td><td>20-40% cost reduction</td><td>Multiple service companies</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Geothermal engineering is being revolutionized by techniques borrowed from the oil and gas industry—horizontal drilling, hydraulic fracturing, and fiber-optic sensing—adapted for the unique challenges of high-temperature crystalline rock. The convergence of EGS technology with advanced drilling could transform geothermal from a niche resource limited to volcanic regions into a ubiquitous source of firm, clean baseload power available virtually anywhere.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Enhanced Geothermal Systems: Reservoir Engineering, Induced Seismicity, and Superhot Rock Frontiers</h2>

<p>EGS represents the most transformative potential advancement in clean firm power. Graduate analysis examines reservoir engineering fundamentals, thermo-hydro-mechanical-chemical (THMC) coupled processes in fractured rock, induced seismicity risk management, and the frontier of superhot rock geothermal where supercritical fluid conditions could deliver 5-10x the power output per well.</p>

<h3>THMC Coupled Processes</h3>

<table class="technical-table">
<thead>
<tr><th>Process</th><th>Mechanism</th><th>Effect on Reservoir</th><th>Modeling Approach</th></tr>
</thead>
<tbody>
<tr><td>Thermal</td><td>Heat extraction cools rock</td><td>Thermal contraction opens fractures</td><td>FEM heat transfer</td></tr>
<tr><td>Hydraulic</td><td>Fluid flow through fractures</td><td>Pressure changes affect aperture</td><td>Discrete fracture network (DFN)</td></tr>
<tr><td>Mechanical</td><td>Stress changes from injection</td><td>Fracture slip and propagation</td><td>Geomechanical simulation</td></tr>
<tr><td>Chemical</td><td>Mineral dissolution/precipitation</td><td>Permeability evolution over time</td><td>Reactive transport modeling</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-geo2-grad-q1">
<p>"The Fervo Energy Cape Station project in Nevada achieved a major EGS milestone: sustained flow rates of 63 liters/second at 191°C through a horizontal well pair with fiber-optic distributed sensing, demonstrating that oil and gas horizontal drilling techniques can be successfully adapted for geothermal applications."</p>
<cite>— Fervo Energy / DOE FORGE Project Technical Report, 2023</cite>
</blockquote>

<h3>Induced Seismicity Risk Governance</h3>
<ul>
<li><strong>Traffic light protocol:</strong> Green (M<1.0, continue), Yellow (M 1.0-2.0, reduce injection), Red (M>2.0, shut in)</li>
<li><strong>Statistical forecasting:</strong> Gutenberg-Richter b-value analysis and injection parameter correlation</li>
<li><strong>Seismic hazard vs. risk:</strong> Ground motion prediction equations + vulnerability + exposure = quantified risk</li>
<li><strong>Regulatory frameworks:</strong> Switzerland, South Korea, and U.S. DOE FORGE protocols provide evolving governance models</li>
</ul>

<h3>Superhot Rock Geothermal</h3>
<p>At temperatures above 375°C and pressures above 22 MPa, water becomes supercritical, with dramatically different thermodynamic properties:</p>

<table class="technical-table">
<thead>
<tr><th>Parameter</th><th>Conventional EGS</th><th>Superhot Rock</th><th>Improvement Factor</th></tr>
</thead>
<tbody>
<tr><td>Fluid temperature</td><td>150-200°C</td><td>400-500°C</td><td>—</td></tr>
<tr><td>Power per well</td><td>3-5 MW</td><td>30-50 MW</td><td>5-10x</td></tr>
<tr><td>Enthalpy</td><td>~800 kJ/kg</td><td>~3,000 kJ/kg</td><td>~4x</td></tr>
<tr><td>Well cost (est.)</td><td>$10-20M</td><td>$15-30M</td><td>—</td></tr>
<tr><td>LCOE target</td><td>$45-80/MWh</td><td>$20-40/MWh</td><td>2x cheaper</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-geo2-grad-q2">
<p>"Superhot rock geothermal could fundamentally change the economics of firm clean power. The Iceland Deep Drilling Project's IDDP-1 well produced 35 MW of steam at 450°C—the most powerful geothermal well ever drilled. The challenge is developing materials and drilling systems that reliably operate in these extreme conditions."</p>
<cite>— Geothermics, "Superhot Geothermal Resources: A Global Assessment," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Geothermal research is experiencing a renaissance driven by the convergence of climate urgency, oil and gas technology transfer, and venture capital investment. The key research challenges span materials science (drill bits and casing for 400°C+ rock), reservoir engineering (THMC modeling of fractured crystalline rock), and risk science (induced seismicity governance). Success in EGS and superhot rock could provide the firm, clean, baseload power that complements variable wind and solar.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Deep closed-loop systems, supercritical resources, and advanced reservoir engineering.</p>' } }],
    activities: [{ id: 're-geo-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Find the Heat!', MIDDLE_SCHOOL: 'Geothermal Explorer', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Resource Assessment', GRADUATE: 'EGS Simulation', PHD: 'Reservoir Model' }, description: { ELEMENTARY: 'Find where Earths heat comes to the surface!', MIDDLE_SCHOOL: 'Explore how geothermal energy works.', HIGH_SCHOOL: 'Design a geothermal system.', UNDERGRADUATE: 'Assess geothermal resource potential.', GRADUATE: 'Simulate an enhanced geothermal system.', PHD: 'Model geothermal reservoir dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-geo-game', type: 'simulation', title: 'Geothermal Pioneer', description: 'Tap Earths heat for clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-geo-quiz', passingScore: 80, questions: [{ id: 'rgeoq1', question: { ELEMENTARY: 'Where does geothermal energy come from?', MIDDLE_SCHOOL: 'What is a geyser?', HIGH_SCHOOL: 'What is a binary cycle plant?', UNDERGRADUATE: 'What is resource temperature gradient?', GRADUATE: 'What is EGS?', PHD: 'What is induced seismicity?' }, options: { ELEMENTARY: ['Heat from inside the Earth', 'The sun', 'Wind', 'Water'], MIDDLE_SCHOOL: ['Hot water shooting from the ground', 'A cold spring', 'A type of rock', 'An animal'], HIGH_SCHOOL: ['Uses hot water to heat a second fluid that drives turbines', 'Burns two fuels', 'Uses two suns', 'Has two buildings'], UNDERGRADUATE: ['Temperature increase with depth', 'Color gradient', 'Slope of land', 'Water temperature only'], GRADUATE: ['Enhanced Geothermal System - artificially created reservoirs', 'Electric Grid System', 'External Gas Supply', 'Energy Grid Standard'], PHD: ['Earthquakes caused by fluid injection', 'Natural earthquakes', 'Induced happiness', 'Static electricity'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Geothermal energy comes from the heat deep inside the Earth!', MIDDLE_SCHOOL: 'A geyser is a hot spring that periodically shoots water and steam into the air.', HIGH_SCHOOL: 'Binary cycle plants use geothermal heat to vaporize a secondary fluid with lower boiling point.', UNDERGRADUATE: 'Temperature gradient measures how much hotter it gets per kilometer of depth.', GRADUATE: 'EGS creates artificial permeability in hot rocks to enable geothermal where natural systems dont exist.', PHD: 'Induced seismicity is earthquakes triggered by fluid injection during EGS development.' } }, { id: 'rgeoq2', question: { ELEMENTARY: 'Can the ground under your house help heat it?', MIDDLE_SCHOOL: 'What is a ground-source heat pump?', HIGH_SCHOOL: 'What are the different types of ground heat exchanger configurations?', UNDERGRADUATE: 'How does ground thermal conductivity testing inform GSHP system design?', GRADUATE: 'What are the long-term thermal sustainability concerns for large GSHP fields?', PHD: 'How do hybrid GSHP systems with supplemental heating/cooling optimize lifecycle costs?' }, options: { ELEMENTARY: ['Yes! The ground stays warm enough to heat your home', 'No, the ground is always cold', 'Only in summer', 'Only near volcanoes'], MIDDLE_SCHOOL: ['A system using underground pipes to heat and cool buildings efficiently', 'A pump that heats the ground', 'A type of furnace', 'A water heater'], HIGH_SCHOOL: ['Horizontal loops, vertical boreholes, pond/lake loops, and open-loop groundwater', 'Only one type exists', 'Only deep wells', 'Only under buildings'], UNDERGRADUATE: ['In-situ thermal response tests measure ground conductivity to size borehole heat exchangers accurately', 'Testing is not needed', 'Only soil type matters', 'Standard values work everywhere'], GRADUATE: ['Ground temperature drift from imbalanced heating/cooling loads can degrade performance over decades', 'No sustainability concerns', 'Ground temperature never changes', 'Only relevant in cold climates'], PHD: ['Adding cooling towers or boilers to handle peak loads reduces required borehole depth by 20-40%', 'Hybrid systems are less efficient', 'Only GSHP alone works', 'Supplemental systems waste energy'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Just a few feet underground, the temperature stays relatively constant year-round, providing a heat source in winter and a heat sink in summer.', MIDDLE_SCHOOL: 'A ground-source heat pump uses a loop of pipes buried underground to exchange heat with the earth, providing efficient heating in winter and cooling in summer with COP of 3-5.', HIGH_SCHOOL: 'GSHP configurations include horizontal loops (4-6 ft deep trenches), vertical boreholes (150-500 ft deep), pond/lake loops (submerged coils), and open-loop systems pumping groundwater directly.', UNDERGRADUATE: 'Thermal response tests (TRT) measure in-situ ground thermal conductivity and borehole thermal resistance by circulating heated fluid and monitoring temperature response, critical for accurately sizing borehole fields to within 10%.', GRADUATE: 'Large GSHP fields with imbalanced annual heating/cooling loads can experience progressive ground temperature drift over 10-25 years, degrading COP. Thermal modeling over 20+ year horizons and balanced design or hybrid supplementation prevent this.', PHD: 'Hybrid GSHP systems use cooling towers (in cooling-dominant climates) or supplemental boilers (heating-dominant) for peak loads, reducing required borehole depth by 20-40% and improving economic payback while maintaining high seasonal efficiency.' } }] },
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
    lessons: [{ id: 're-osw-1', title: 'Wind at Sea', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Ocean Windmills!</h2><p>Big wind turbines can be built in the ocean where wind blows strong and steady!</p>', MIDDLE_SCHOOL: '<h2>Why Offshore?</h2><p>Ocean winds are stronger and steadier than on land. Offshore turbines can be much larger too.</p>', HIGH_SCHOOL: '<h2>Offshore Technology</h2><p>Fixed-bottom foundations in shallow water, floating platforms in deep water, and submarine cables.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Offshore Wind Engineering: Foundation Design, Transmission, and Project Economics</h2>

<p>Global offshore wind capacity reached 75 GW in 2023, with Europe leading at 35 GW and China rapidly expanding. The U.S. has a 30 GW pipeline with its first large-scale projects (Vineyard Wind, South Fork) now operational. Offshore wind offers capacity factors of 40-55%—significantly higher than onshore—and proximity to coastal load centers. However, capital costs of $3,000-5,000/kW require sophisticated project development and supply chain management.</p>

<h3>Foundation Technologies</h3>

<table class="technical-table">
<thead>
<tr><th>Type</th><th>Water Depth</th><th>Turbine Size</th><th>Cost Share</th><th>Installation Method</th></tr>
</thead>
<tbody>
<tr><td>Monopile</td><td>0-40m</td><td>Up to 15 MW</td><td>20-25% of capex</td><td>Hydraulic hammer</td></tr>
<tr><td>Jacket</td><td>25-60m</td><td>8-15 MW</td><td>25-30% of capex</td><td>Pre-assembled, lifted</td></tr>
<tr><td>Gravity base</td><td>0-30m</td><td>5-12 MW</td><td>20-30% of capex</td><td>Floated and ballasted</td></tr>
<tr><td>Floating (spar)</td><td>60-300m</td><td>8-15 MW</td><td>30-40% of capex</td><td>Towed to site</td></tr>
<tr><td>Floating (semi-sub)</td><td>40-300m</td><td>8-15 MW</td><td>30-40% of capex</td><td>Assembled at port</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-osw-undergrad-q1">
<p>"Offshore wind LCOE has fallen 60% since 2015, driven by larger turbines, competitive auctions, and supply chain maturation. However, recent cost increases from inflation and supply chain bottlenecks highlight the importance of stable policy frameworks and port infrastructure investment."</p>
<cite>— IRENA, Offshore Wind Outlook, 2023</cite>
</blockquote>

<h3>Electrical Transmission</h3>
<ul>
<li><strong>HVAC (high-voltage AC):</strong> Standard for projects <80 km from shore; 220-275 kV; submarine cable</li>
<li><strong>HVDC (high-voltage DC):</strong> Preferred for >80 km; lower losses over distance; VSC technology enables multi-terminal grids</li>
<li><strong>Offshore substations:</strong> Step up voltage from 33-66 kV array cables to export voltage</li>
<li><strong>Meshed grids:</strong> Interconnecting multiple wind farms and countries via HVDC backbone (North Sea concept)</li>
</ul>

<h3>Supply Chain and Port Requirements</h3>
<p>A single 15 MW turbine requires: nacelle (600+ tonnes), tower sections (800+ tonnes), blades (100m+ each), and foundation (1,000-4,000 tonnes). Marshalling ports need 15+ hectares of laydown area, 800+ tonne crane capacity, and deep-water berths (8-12m draft). The Jones Act requires U.S.-flagged vessels for domestic offshore wind installation.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Offshore wind engineering integrates marine structural design, electrical power systems, metocean analysis, and logistics optimization. The trend toward larger turbines (15+ MW) and deeper water (floating foundations) is expanding the addressable resource but increasing engineering complexity. Success requires coordinating a global supply chain with specialized vessels, purpose-built ports, and a trained offshore workforce.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Offshore Wind: Floating Platforms, Grid Integration, and Market Design</h2>

<p>Floating offshore wind is transitioning from demonstration to commercial scale, with over 200 MW operational and 50+ GW in development globally. Graduate analysis examines coupled aeroelastic-hydrodynamic modeling, floating platform design optimization, offshore grid architecture, and the policy and market frameworks needed to unlock deep-water wind resources.</p>

<h3>Floating Platform Engineering</h3>

<table class="technical-table">
<thead>
<tr><th>Platform Type</th><th>Stability Mechanism</th><th>Depth Range</th><th>Key Projects</th></tr>
</thead>
<tbody>
<tr><td>Spar buoy</td><td>Ballast (deep draft)</td><td>100-300m</td><td>Hywind Scotland (30 MW)</td></tr>
<tr><td>Semi-submersible</td><td>Waterplane area</td><td>40-300m</td><td>WindFloat Atlantic, Kincardine</td></tr>
<tr><td>Tension leg platform</td><td>Taut mooring tendons</td><td>50-200m</td><td>Pelastar (concept), GICON</td></tr>
<tr><td>Barge</td><td>Large waterplane area</td><td>30-100m</td><td>Ideol/BW Ideol Floatgen</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-osw-grad-q1">
<p>"Floating offshore wind opens access to 80% of global offshore wind resources located in waters deeper than 60 meters. Achieving cost parity with fixed-bottom offshore wind—targeted by 2030—requires industrializing manufacturing, standardizing platform designs, and developing dynamic cable technology for array-scale deployment."</p>
<cite>— Wind Europe, Floating Offshore Wind: A Global Opportunity, 2023</cite>
</blockquote>

<h3>Coupled Dynamic Modeling</h3>
<ul>
<li><strong>Aeroelastic loads:</strong> Turbine aerodynamics coupled with platform motion; pitch/roll affects angle of attack</li>
<li><strong>Hydrodynamic loads:</strong> Wave, current, and wind loading on platform; Morison equation and potential flow theory</li>
<li><strong>Mooring dynamics:</strong> Catenary or taut-leg mooring fatigue; dynamic analysis required for certification</li>
<li><strong>Dynamic cables:</strong> Inter-array cables must accommodate platform motion; bend stiffener and buoyancy module design critical</li>
</ul>

<h3>Offshore Grid Architecture</h3>

<table class="technical-table">
<thead>
<tr><th>Configuration</th><th>Topology</th><th>Advantage</th><th>Example</th></tr>
</thead>
<tbody>
<tr><td>Radial</td><td>Point-to-point to shore</td><td>Simple, proven</td><td>Most current projects</td></tr>
<tr><td>Hub-and-spoke</td><td>Offshore platform + radial</td><td>Reduced cable length</td><td>North Sea concept</td></tr>
<tr><td>Meshed HVDC</td><td>Multi-terminal DC network</td><td>Redundancy, cross-border trade</td><td>North Sea Wind Power Hub</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-osw-grad-q2">
<p>"A meshed North Sea offshore grid connecting wind farms across multiple countries could reduce total system costs by 10-20% compared to radial connections, while improving reliability and enabling cross-border renewable energy trading."</p>
<cite>— Nature Energy, "The Value of a North Sea Offshore Grid," 2022</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Floating offshore wind research spans naval architecture, aeroelasticity, marine engineering, and power systems. The central challenge is managing coupled dynamics—platform motion, turbine aerodynamics, mooring forces, and cable loading—in extreme ocean environments while achieving the cost reductions needed for commercial viability. Research priorities include standardized platform designs for mass production, advanced control strategies that account for platform motion, and digital twin technology for predictive maintenance of offshore assets.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Wake effects, floating platform dynamics, and wildlife interaction studies.</p>' } }],
    activities: [{ id: 're-osw-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build Ocean Turbines!', MIDDLE_SCHOOL: 'Site Selection', HIGH_SCHOOL: 'Foundation Choice', UNDERGRADUATE: 'Project Model', GRADUATE: 'Floating Design', PHD: 'Wake Modeling' }, description: { ELEMENTARY: 'Build wind turbines in the ocean!', MIDDLE_SCHOOL: 'Find the best ocean sites for wind.', HIGH_SCHOOL: 'Choose the right foundation type.', UNDERGRADUATE: 'Model offshore wind project economics.', GRADUATE: 'Design a floating wind platform.', PHD: 'Model wake effects in wind farms.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-osw-game', type: 'simulation', title: 'Offshore Wind Builder', description: 'Develop offshore wind farms in challenging ocean conditions!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-osw-quiz', passingScore: 80, questions: [{ id: 'roswq1', question: { ELEMENTARY: 'Why put wind turbines in the ocean?', MIDDLE_SCHOOL: 'What is special about ocean wind?', HIGH_SCHOOL: 'What is a fixed-bottom foundation?', UNDERGRADUATE: 'What is capacity factor?', GRADUATE: 'What is a spar buoy?', PHD: 'What is wake effect?' }, options: { ELEMENTARY: ['Wind is stronger and steadier there', 'Fish like them', 'No reason', 'They look pretty'], MIDDLE_SCHOOL: ['Stronger and more consistent than land', 'Weaker wind', 'Same as land', 'No wind at sea'], HIGH_SCHOOL: ['Foundation attached to the seafloor', 'Floating foundation', 'No foundation needed', 'Sand foundation'], UNDERGRADUATE: ['Actual generation divided by maximum possible', 'Cost factor', 'Size factor', 'Wind speed'], GRADUATE: ['Floating platform with heavy bottom', 'A type of fish', 'A buoy for boats', 'A wind direction indicator'], PHD: ['Reduced wind behind turbines affecting downstream ones', 'Waking up', 'Water waves', 'Noise effect'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wind over the ocean is stronger and blows more steadily than over land!', MIDDLE_SCHOOL: 'Ocean wind is stronger and more consistent because theres nothing to slow it down.', HIGH_SCHOOL: 'Fixed-bottom foundations are attached directly to the seafloor in water up to ~60 meters deep.', UNDERGRADUATE: 'Capacity factor is actual energy produced divided by theoretical maximum - offshore often exceeds 50%.', GRADUATE: 'A spar buoy is a floating platform stabilized by a heavy ballasted bottom section.', PHD: 'Wake effects reduce wind speed behind turbines, affecting output of downstream machines.' } }, { id: 'roswq2', question: { ELEMENTARY: 'Can wind turbines be built in the ocean?', MIDDLE_SCHOOL: 'How big are offshore wind turbines?', HIGH_SCHOOL: 'What types of foundations support offshore wind turbines?', UNDERGRADUATE: 'What are the key cost drivers for offshore wind farm development?', GRADUATE: 'How do floating offshore wind platforms extend viable deployment areas?', PHD: 'What coupled aero-hydro-servo-elastic simulation requirements exist for floating offshore wind certification?' }, options: { ELEMENTARY: ['Yes, offshore wind farms produce lots of clean energy!', 'No, turbines cant go in water', 'Only small ones', 'Only near shore'], MIDDLE_SCHOOL: ['Very big - taller than skyscrapers with blades over 100m long', 'Same size as onshore', 'Very small', 'About 10 feet tall'], HIGH_SCHOOL: ['Monopiles, jackets, gravity bases, and floating platforms', 'Only concrete blocks', 'Anchored to boats', 'They float freely'], UNDERGRADUATE: ['Foundation, installation vessels, subsea cables, and operations/maintenance dominate LCOE', 'Only turbine cost', 'Land lease only', 'No significant costs'], GRADUATE: ['Semi-submersibles, spars, and TLPs enable deployment in water depths >60m where fixed foundations are impractical', 'Floating is not viable', 'Only for shallow water', 'Fixed foundations work everywhere'], PHD: ['Time-domain coupling of rotor aerodynamics, platform hydrodynamics, mooring dynamics, and controller interaction under combined wind-wave loading', 'Only static analysis', 'Decoupled models suffice', 'No simulation required'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Offshore wind farms are built in the ocean where winds are stronger and more consistent, generating large amounts of clean electricity.', MIDDLE_SCHOOL: 'Modern offshore turbines are enormous: the latest models exceed 260m in total height with rotor diameters over 220m and rated power of 15-18 MW.', HIGH_SCHOOL: 'Fixed foundations include monopiles (steel tubes, most common, <40m depth), jackets (lattice frames, 30-60m), and gravity bases (concrete). Floating platforms serve deeper waters.', UNDERGRADUATE: 'Offshore wind LCOE is driven by foundations (20-25%), installation vessel costs (15-20%), subsea export cables (10-15%), and O&M (25-30% of lifecycle cost), with turbine supply representing 30-35% of CAPEX.', GRADUATE: 'Floating platforms (semi-submersibles, spars, tension-leg) anchor to the seabed via mooring lines, enabling deployment in 60-1000m+ water depths where 80% of global offshore wind resource exists.', PHD: 'IEC 61400-3-2 requires coupled time-domain simulation of blade aerodynamics, 6-DOF platform motion, nonlinear mooring dynamics, and control system response under combined stochastic wind and wave loading for type certification.' } }] },
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
    lessons: [{ id: 're-ss-1', title: 'Saving Sunshine', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Sunshine in a Battery!</h2><p>Solar panels make electricity when the sun shines. Batteries save that power for nighttime!</p>', MIDDLE_SCHOOL: '<h2>Why Add Storage?</h2><p>Solar only works during the day. Batteries shift solar energy to when you need it most.</p>', HIGH_SCHOOL: '<h2>System Design</h2><p>Sizing solar and storage together. AC vs DC coupling. Backup power vs daily cycling.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Solar-Plus-Storage Systems: Design, Dispatch Optimization, and Hybrid Project Economics</h2>

<p>Solar-plus-storage has emerged as the dominant new-build resource in U.S. electricity markets, with over 80% of utility-scale solar projects in interconnection queues now paired with battery storage. The combination transforms solar from a variable, non-dispatchable resource into a flexible, partially-firm asset capable of providing capacity, energy shifting, and ancillary services.</p>

<h3>System Configuration Options</h3>

<table class="technical-table">
<thead>
<tr><th>Configuration</th><th>Coupling</th><th>ITC Eligibility</th><th>Operational Flexibility</th></tr>
</thead>
<tbody>
<tr><td>DC-coupled</td><td>Storage on DC side of inverter</td><td>Full ITC if charged 100% from solar</td><td>Clipping capture, single inverter</td></tr>
<tr><td>AC-coupled</td><td>Storage has independent inverter</td><td>Standalone storage ITC (IRA)</td><td>Grid charging, independent dispatch</td></tr>
<tr><td>DC + AC hybrid</td><td>Both coupling points</td><td>Mixed ITC treatment</td><td>Maximum flexibility</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ss-undergrad-q1">
<p>"Solar-plus-storage projects now consistently underbid standalone gas peakers in competitive procurement. The 2023 NREL Annual Technology Baseline projects hybrid system LCOE reaching $30-45/MWh by 2030, fundamentally changing resource planning economics."</p>
<cite>— NREL, Annual Technology Baseline: Solar-Plus-Storage, 2023</cite>
</blockquote>

<h3>Dispatch Optimization</h3>
<ul>
<li><strong>Clipping capture:</strong> DC-coupled storage captures energy above inverter rating (DC/AC ratio 1.3-1.6)</li>
<li><strong>Energy shifting:</strong> Store midday surplus, discharge during evening peak ($20-80/MWh spread)</li>
<li><strong>Capacity firming:</strong> Guarantee 4-hour delivery during peak; qualifies for capacity market</li>
<li><strong>Ancillary services:</strong> Frequency regulation from battery while solar generates energy</li>
<li><strong>Renewable curtailment reduction:</strong> Absorb excess generation that would otherwise be curtailed</li>
</ul>

<h3>Hybrid PPA Structures</h3>
<table class="technical-table">
<thead>
<tr><th>PPA Type</th><th>Structure</th><th>Risk Allocation</th></tr>
</thead>
<tbody>
<tr><td>Bundled energy</td><td>Fixed $/MWh for all delivered energy</td><td>Developer bears dispatch risk</td></tr>
<tr><td>Shaped product</td><td>Guaranteed delivery during specified hours</td><td>Developer bears shaping risk</td></tr>
<tr><td>Toll arrangement</td><td>Buyer controls dispatch, pays capacity fee</td><td>Buyer bears market risk</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Solar-plus-storage system design requires co-optimizing solar array size, inverter capacity, battery power/energy ratio, and dispatch strategy against wholesale market conditions and PPA obligations. The DC/AC ratio, storage duration, and coupling configuration interact to determine system economics. As storage costs continue to decline, the optimal storage-to-solar ratio is increasing, and hybrid systems are becoming the default rather than the exception for new utility-scale solar.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Hybrid Systems: Market Participation, Capacity Accreditation, and Co-Optimization</h2>

<p>Solar-plus-storage hybrid resources challenge existing market rules designed for conventional generators. Graduate analysis examines capacity accreditation methodologies for hybrid resources, co-optimization of investment and operations, market design implications, and the emerging role of hybrids as grid backbone resources.</p>

<h3>Capacity Accreditation for Hybrids</h3>

<table class="technical-table">
<thead>
<tr><th>Method</th><th>Approach</th><th>Hybrid Treatment</th><th>ISO/RTO Using</th></tr>
</thead>
<tbody>
<tr><td>ELCC marginal</td><td>Incremental reliability contribution</td><td>Joint ELCC of solar+storage as system</td><td>CAISO, PJM (transitioning)</td></tr>
<tr><td>Exceedance-based</td><td>Availability during top risk hours</td><td>Must demonstrate delivery for X hours</td><td>ERCOT, SPP</td></tr>
<tr><td>Nameplate derate</td><td>Fixed percentage of nameplate</td><td>Sum of component derates (conservative)</td><td>Legacy methods</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ss-grad-q1">
<p>"The joint ELCC of solar-plus-storage exceeds the sum of individual component ELCCs because the storage addresses solar's primary capacity limitation—non-production during peak evening hours. A 100 MW solar + 50 MW/200 MWh storage hybrid may achieve 70-85% capacity credit versus 30-50% for solar alone."</p>
<cite>— NREL, Capacity Credit of Solar-Plus-Storage in Resource Adequacy, 2023</cite>
</blockquote>

<h3>Investment and Operations Co-Optimization</h3>
<ul>
<li><strong>Sizing co-optimization:</strong> Joint optimization of solar MW, storage MW/MWh, and inverter capacity against market revenue streams</li>
<li><strong>Degradation-aware scheduling:</strong> Battery cycling strategy affects 20-year revenue; must optimize present dispatch against future capacity fade</li>
<li><strong>IRA incentive stacking:</strong> ITC (30% base + adders for domestic content, energy community, LMI), PTC alternative, standalone storage ITC</li>
<li><strong>Merchant risk:</strong> Uncontracted hybrid revenue depends on energy price shape, capacity market design, and ancillary service markets</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-ss-grad-q2">
<p>"Co-locating storage with solar reduces interconnection costs by 20-40% and enables shared land, permits, and grid connection infrastructure. However, interconnection rules for hybrid resources remain inconsistent across ISOs, creating regulatory uncertainty."</p>
<cite>— The Electricity Journal, "Hybrid Resource Interconnection Challenges," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Hybrid system research focuses on co-optimization across multiple timescales: long-term sizing decisions, medium-term PPA structuring, and real-time dispatch. The central research challenge is developing stochastic optimization frameworks that capture the interaction between solar variability, battery degradation, market price uncertainty, and capacity accreditation rules. As hybrids become the dominant new resource, their treatment in wholesale markets will significantly influence the pace and economics of grid decarbonization.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Co-optimized degradation management, uncertainty in forecasting, and portfolio optimization.</p>' } }],
    activities: [{ id: 're-ss-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Sunshine!', MIDDLE_SCHOOL: 'Size Your System', HIGH_SCHOOL: 'Design Hybrid', UNDERGRADUATE: 'Optimize Dispatch', GRADUATE: 'Value Stacking', PHD: 'Portfolio Design' }, description: { ELEMENTARY: 'Store solar power for nighttime!', MIDDLE_SCHOOL: 'Size a solar plus storage system.', HIGH_SCHOOL: 'Design an optimized hybrid system.', UNDERGRADUATE: 'Optimize dispatch strategy.', GRADUATE: 'Stack multiple value streams.', PHD: 'Design optimal solar-storage portfolio.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ss-game', type: 'simulation', title: 'Solar Storage Manager', description: 'Optimize solar and storage for maximum value!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ss-quiz', passingScore: 80, questions: [{ id: 'rssq1', question: { ELEMENTARY: 'Why add batteries to solar?', MIDDLE_SCHOOL: 'When do batteries release stored solar?', HIGH_SCHOOL: 'What is DC coupling?', UNDERGRADUATE: 'What is dispatch strategy?', GRADUATE: 'What is value stacking?', PHD: 'What is co-optimization?' }, options: { ELEMENTARY: ['To use solar power at night', 'For decoration', 'Batteries like sun', 'No reason'], MIDDLE_SCHOOL: ['When the sun is not shining', 'Only during the day', 'Never', 'All the time'], HIGH_SCHOOL: ['Solar connects directly to battery before inverter', 'Using DC motors', 'Washington DC location', 'Double connection'], UNDERGRADUATE: ['When and how to charge/discharge', 'Where to install', 'What color to paint', 'How to clean'], GRADUATE: ['Earning from multiple grid services', 'Stacking batteries', 'Making piles', 'Value meals'], PHD: ['Jointly optimizing solar and storage operations', 'Separate optimization', 'No optimization', 'Random operation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Batteries store solar power during the day so you can use it at night!', MIDDLE_SCHOOL: 'Batteries discharge in the evening and at night when solar panels arent producing.', HIGH_SCHOOL: 'DC coupling connects solar panels directly to batteries before the inverter, enabling more efficient charging.', UNDERGRADUATE: 'Dispatch strategy determines when to charge, discharge, or hold based on prices and needs.', GRADUATE: 'Value stacking earns revenue from multiple services - energy, capacity, ancillary, and backup.', PHD: 'Co-optimization jointly manages solar curtailment and battery degradation for maximum system value.' } }, { id: 'rssq2', question: { ELEMENTARY: 'Can solar panels and batteries work together?', MIDDLE_SCHOOL: 'What is solar-plus-storage?', HIGH_SCHOOL: 'How does solar-plus-storage earn revenue from multiple grid services?', UNDERGRADUATE: 'What ITC and tax incentive structures apply to co-located solar-plus-storage?', GRADUATE: 'How do hybrid inverter architectures optimize solar-plus-storage system design?', PHD: 'What are the co-optimization dispatch strategies for solar-plus-storage in wholesale markets?' }, options: { ELEMENTARY: ['Yes! Batteries store solar power for when the sun goes down', 'No, they dont work together', 'Only at night', 'Only in summer'], MIDDLE_SCHOOL: ['Pairing solar panels with batteries to store excess generation', 'Solar panels with extra storage rooms', 'A bigger solar panel', 'Solar-powered storage units'], HIGH_SCHOOL: ['Arbitrage, capacity value, frequency regulation, and renewable self-consumption', 'Only one revenue stream', 'No revenue possible', 'Only sells electricity'], UNDERGRADUATE: ['Storage charged 75%+ from solar qualifies for ITC; standalone storage also now ITC-eligible', 'No tax incentives exist', 'Only solar gets ITC', 'Storage disqualifies solar ITC'], GRADUATE: ['DC-coupled hybrid inverters reduce conversion losses and enable clipping recovery from oversized arrays', 'Only AC-coupled works', 'No architectural choices', 'Inverters dont matter'], PHD: ['MILP co-optimizes charge/discharge against day-ahead and real-time price forecasts, ramp products, and capacity obligations', 'Simple rules suffice', 'No optimization needed', 'Only charge during day'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Solar panels and batteries are a great team - the panels make electricity during the day, and the batteries save extra power for nighttime use.', MIDDLE_SCHOOL: 'Solar-plus-storage combines solar panels with battery storage to capture excess generation, shift it to high-value periods, and provide grid services beyond what solar alone can deliver.', HIGH_SCHOOL: 'Solar-plus-storage stacks revenue from energy arbitrage (charge low/discharge high), capacity value (firm dispatchable resource), frequency regulation (fast battery response), and increased renewable self-consumption (reduced grid purchases).', UNDERGRADUATE: 'The IRA allows ITC for storage charged 75%+ from co-located solar, and standalone storage is now ITC-eligible. DC-coupling enables storage to capture clipped solar energy, maximizing ITC-qualifying charging.', GRADUATE: 'DC-coupled hybrid inverters connect batteries and solar on the DC bus before a shared inverter, reducing AC-DC conversion losses by 2-3% and recovering clipped energy from DC-oversized arrays (1.3-1.5 ILR).', PHD: 'MILP dispatch co-optimizes solar-plus-storage against day-ahead energy prices, real-time balancing, frequency regulation, and capacity obligations while respecting battery degradation constraints and solar forecast uncertainty.' } }] },
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
    lessons: [{ id: 're-fin-1', title: 'Paying for Clean Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Money for Solar!</h2><p>Solar panels cost money, but there are many ways for people to pay for them over time.</p>', MIDDLE_SCHOOL: '<h2>Financing Options</h2><p>Buying, loans, leases, and PPAs let people go solar even if they cant pay all at once.</p>', HIGH_SCHOOL: '<h2>Ownership vs Service</h2><p>Loans let you own and get tax credits. Leases and PPAs mean someone else owns the system.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Clean Energy Project Finance: Tax Equity, Incentive Structures, and Capital Markets</h2>

<p>Clean energy project finance has mobilized over $1.1 trillion globally in 2023, with the U.S. Inflation Reduction Act providing an estimated $370 billion in clean energy incentives over ten years. Understanding the financial structures that enable renewable energy deployment—tax equity partnerships, project debt, and federal incentive mechanisms—is essential for engineers and project developers working in the sector.</p>

<h3>U.S. Federal Tax Incentives (Post-IRA)</h3>

<table class="technical-table">
<thead>
<tr><th>Incentive</th><th>Base Rate</th><th>Prevailing Wage Bonus</th><th>Additional Adders</th></tr>
</thead>
<tbody>
<tr><td>Investment Tax Credit (ITC)</td><td>6%</td><td>30%</td><td>+10% domestic content, +10% energy community, +10-20% LMI</td></tr>
<tr><td>Production Tax Credit (PTC)</td><td>0.55¢/kWh</td><td>2.75¢/kWh</td><td>+10% domestic content, +10% energy community</td></tr>
<tr><td>MACRS depreciation</td><td>5-year accelerated</td><td>100% bonus depreciation (phasing down)</td><td>Combined with ITC/PTC</td></tr>
<tr><td>Standalone storage ITC</td><td>6%</td><td>30%</td><td>Same adders as solar ITC</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-fin-undergrad-q1">
<p>"The IRA's transferability provision—allowing tax credits to be sold for cash—democratizes clean energy finance by eliminating the need for tax equity partnerships, potentially reducing transaction costs by 2-5% of project value and expanding the investor base."</p>
<cite>— Lazard, Levelized Cost of Energy Analysis, Version 17.0, 2024</cite>
</blockquote>

<h3>Tax Equity Partnership Structures</h3>
<ul>
<li><strong>Partnership flip:</strong> Tax investor receives 99% of allocations until target yield achieved, then flips to 5%. Most common structure.</li>
<li><strong>Sale-leaseback:</strong> Developer sells asset to tax investor who leases it back. Simpler but less flexible.</li>
<li><strong>Inverted lease:</strong> Developer leases to tax investor who operates and passes through credits. Used for ITC projects.</li>
<li><strong>Credit transfer (IRA new):</strong> Direct sale of tax credits at $0.90-0.95 per dollar of credit. Simpler than partnership.</li>
</ul>

<h3>Project Finance Capital Stack</h3>
<table class="technical-table">
<thead>
<tr><th>Layer</th><th>Typical %</th><th>Cost of Capital</th><th>Risk Profile</th></tr>
</thead>
<tbody>
<tr><td>Tax equity</td><td>35-50%</td><td>6-8% after-tax</td><td>Tax credit and depreciation benefit</td></tr>
<tr><td>Project debt</td><td>30-50%</td><td>5-7% (project finance)</td><td>Secured by project cash flows</td></tr>
<tr><td>Sponsor equity</td><td>10-25%</td><td>10-15% target return</td><td>Residual cash flow and upside</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Clean energy finance determines which projects get built. Engineers must understand not just the technical performance of renewable systems but how that performance translates into bankable cash flows. Energy production estimates, degradation assumptions, and curtailment risk directly affect financing terms. The IRA has fundamentally reshaped U.S. clean energy economics, making previously marginal projects viable and creating new financial structures that expand the investor universe.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Clean Energy Finance: Structured Finance, Risk Management, and Emerging Markets</h2>

<p>As clean energy transitions from policy-dependent to market-competitive, financial innovation is enabling deployment at unprecedented scale. Graduate analysis examines advanced financial structures, risk quantification and allocation, the growing role of institutional capital, and the financial instruments bridging the gap between developed and emerging market clean energy investment.</p>

<h3>Advanced Financial Instruments</h3>

<table class="technical-table">
<thead>
<tr><th>Instrument</th><th>Mechanism</th><th>Scale</th><th>Investor Base</th></tr>
</thead>
<tbody>
<tr><td>Green bonds</td><td>Use-of-proceeds bonds for eligible projects</td><td>$500B+ annual issuance</td><td>Fixed-income institutional</td></tr>
<tr><td>ABS (securitization)</td><td>Pooling distributed solar loans/leases</td><td>$10B+ annual</td><td>Capital markets</td></tr>
<tr><td>YieldCos</td><td>Publicly traded vehicles holding operating assets</td><td>$50B+ market cap</td><td>Yield-seeking equity</td></tr>
<tr><td>Virtual PPAs</td><td>Financial hedge on energy price</td><td>$30B+ contracted</td><td>Corporate offtakers</td></tr>
<tr><td>Carbon credits</td><td>Verified emission reductions</td><td>$2B voluntary market</td><td>Corporate compliance/voluntary</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-fin-grad-q1">
<p>"The emergence of tax credit transferability under the IRA is creating a new $50+ billion annual market for clean energy tax credits. Early transactions in 2023-2024 established pricing at $0.90-0.95 per dollar of credit, with standardization of documentation and due diligence evolving rapidly."</p>
<cite>— Norton Rose Fulbright, U.S. Clean Energy Tax Credit Transfer Market Report, 2024</cite>
</blockquote>

<h3>Risk Quantification and Allocation</h3>
<ul>
<li><strong>Resource risk:</strong> P50/P90/P99 energy production estimates; weather year variability; independent engineer review</li>
<li><strong>Technology risk:</strong> Equipment warranty, degradation assumptions, O&M cost escalation</li>
<li><strong>Market risk:</strong> Merchant tail exposure after PPA term; basis risk between PPA node and delivery</li>
<li><strong>Regulatory risk:</strong> Net metering changes, interconnection delays, permitting uncertainty</li>
<li><strong>Counterparty risk:</strong> Offtaker creditworthiness; utility vs. corporate PPA risk profiles</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-fin-grad-q2">
<p>"Institutional investors managing $130+ trillion in assets are increasingly allocating to clean energy infrastructure, driven by ESG mandates, inflation-hedging characteristics, and stable contracted cash flows. This capital shift is reducing the cost of capital for renewable projects by 100-200 basis points."</p>
<cite>— BloombergNEF, Energy Transition Investment Trends, 2024</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Clean energy finance research examines how financial innovation can accelerate the energy transition. Key questions include: How does tax credit transferability affect market structure and transaction costs? What financial instruments can mobilize private capital for clean energy in emerging markets? How should merchant risk be priced as renewable penetration increases and cannibalization effects depress capture prices? And how can financial structures be designed to align investor returns with grid decarbonization outcomes?</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Financial innovation, climate risk integration, and transition finance.</p>' } }],
    activities: [{ id: 're-fin-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Pay for Solar!', MIDDLE_SCHOOL: 'Compare Options', HIGH_SCHOOL: 'Finance Decision', UNDERGRADUATE: 'Structure Deal', GRADUATE: 'Green Bond', PHD: 'Innovation Design' }, description: { ELEMENTARY: 'Find ways to pay for solar panels!', MIDDLE_SCHOOL: 'Compare different financing options.', HIGH_SCHOOL: 'Make a solar financing decision.', UNDERGRADUATE: 'Structure a project finance deal.', GRADUATE: 'Design a green bond offering.', PHD: 'Design financial innovation for clean energy.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-fin-game', type: 'simulation', title: 'Clean Energy Investor', description: 'Finance clean energy projects for maximum impact!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-fin-quiz', passingScore: 80, questions: [{ id: 'rfinq1', question: { ELEMENTARY: 'How can people pay for solar panels?', MIDDLE_SCHOOL: 'What is a solar lease?', HIGH_SCHOOL: 'What is a PPA?', UNDERGRADUATE: 'What is tax equity?', GRADUATE: 'What is a green bond?', PHD: 'What is transition finance?' }, options: { ELEMENTARY: ['Buy, loan, or lease', 'Only cash', 'Free always', 'No ways exist'], MIDDLE_SCHOOL: ['Renting solar panels with monthly payments', 'Buying panels', 'Free panels', 'No payments'], HIGH_SCHOOL: ['Power Purchase Agreement - paying for electricity not panels', 'Purchase Panels Always', 'Partial Payment Agreement', 'Post Payment Action'], UNDERGRADUATE: ['Investment using tax credit value', 'Tax preparation', 'Tax evasion', 'Tax forms'], GRADUATE: ['Bond funding environmentally beneficial projects', 'A green piece of paper', 'Garden bond', 'Tree bond'], PHD: ['Financing the shift from fossil to clean energy', 'Transportation finance', 'Transition metals', 'Travel financing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'People can buy solar panels, get a loan, or lease them with monthly payments!', MIDDLE_SCHOOL: 'A solar lease lets you rent panels and pay monthly without owning them.', HIGH_SCHOOL: 'A PPA means you pay for the electricity the panels produce, not the panels themselves.', UNDERGRADUATE: 'Tax equity investors monetize tax credits that the project owner cant fully use.', GRADUATE: 'Green bonds raise capital specifically for environmental projects at competitive rates.', PHD: 'Transition finance supports the shift from fossil fuels to clean energy across economies.' } }, { id: 'rfinq2', question: { ELEMENTARY: 'How do people pay for solar panels?', MIDDLE_SCHOOL: 'What is a power purchase agreement?', HIGH_SCHOOL: 'What are green bonds?', UNDERGRADUATE: 'How does the IRA tax credit structure incentivize clean energy investment?', GRADUATE: 'What financial instruments manage renewable energy project risks?', PHD: 'How do levelized cost models compare the economics of different generation technologies?' }, options: { ELEMENTARY: ['Through loans, leases, or savings over time', 'Only rich people can afford them', 'The government pays for all of them', 'They are free'], MIDDLE_SCHOOL: ['A contract to buy electricity at a set price for many years', 'An agreement to purchase power tools', 'A peace treaty', 'A utility bill payment plan'], HIGH_SCHOOL: ['Bonds that fund environmentally beneficial projects', 'Bonds made of recycled paper', 'Green-colored money', 'Only for government use'], UNDERGRADUATE: ['Production and investment tax credits with adders for domestic content, energy communities, and LMI reduce effective cost 30-70%', 'No incentives exist', 'Only production credits', 'Credits are negligible'], GRADUATE: ['Tax equity, debt, insurance, hedges, and PPA contracts allocate risk among project stakeholders', 'No risk management available', 'Only insurance', 'Risk cannot be managed'], PHD: ['LCOE divides lifecycle costs by lifetime generation to compare technologies on $/MWh basis', 'Only upfront cost matters', 'Cannot compare technologies', 'Revenue is the only metric'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar panels can be paid for through cash purchase, solar loans (like a car loan), leases (monthly rental), or power purchase agreements (pay for electricity produced).', MIDDLE_SCHOOL: 'A PPA is a long-term contract (10-25 years) where a buyer agrees to purchase electricity from a renewable energy project at a predetermined price, providing revenue certainty for the developer.', HIGH_SCHOOL: 'Green bonds are fixed-income securities specifically earmarked to raise money for climate and environmental projects, with $500+ billion issued annually across renewable energy, efficiency, and clean transport.', UNDERGRADUATE: 'The IRA provides 30% ITC or PTC base credits with 10% adders each for domestic content, energy communities, and low-income benefits, plus bonus credits for small projects, enabling 40-70% effective cost reduction.', GRADUATE: 'Renewable project finance uses tax equity partnerships (monetize credits), senior debt (project finance), insurance (resource, equipment), revenue hedges (PPA, proxy revenue swaps), and construction wraps to allocate risks appropriately.', PHD: 'LCOE divides total lifecycle costs (CAPEX + O&M + fuel + decommissioning, discounted) by total lifetime energy production (MWh, capacity-factor adjusted) enabling technology-neutral comparison on a $/MWh basis.' } }] },
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
    lessons: [{ id: 're-gd-1', title: 'Clean Grid', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>All Clean Power!</h2><p>We can make all our electricity from sun, wind, and other clean sources instead of burning fossil fuels!</p>', MIDDLE_SCHOOL: '<h2>100% Clean</h2><p>Many places are planning for 100% clean electricity. It takes solar, wind, storage, and other sources working together.</p>', HIGH_SCHOOL: '<h2>Decarbonization Pathways</h2><p>Different mixes of solar, wind, storage, nuclear, and other sources can achieve deep decarbonization.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Grid Decarbonization: Pathways, Reliability, and System Integration at High Renewable Penetration</h2>

<p>Achieving a net-zero electricity grid requires scaling renewables from ~20% to 80-100% of generation while maintaining reliability. The technical challenges multiply beyond 60-70% renewable penetration as variable generation creates periods of over-supply and multi-day droughts. NREL's 100% Clean Electricity study identifies feasible pathways but highlights the critical need for transmission expansion, long-duration storage, and firm clean resources.</p>

<h3>Renewable Integration Challenges by Penetration Level</h3>

<table class="technical-table">
<thead>
<tr><th>Penetration Level</th><th>Primary Challenge</th><th>Key Solutions</th><th>System Cost Impact</th></tr>
</thead>
<tbody>
<tr><td>0-20%</td><td>Minimal; existing flexibility sufficient</td><td>Standard grid operations</td><td>Cost reduction (displaces fuel)</td></tr>
<tr><td>20-50%</td><td>Ramping, duck curve, curtailment begins</td><td>Storage, demand response, interconnection</td><td>Modest integration costs</td></tr>
<tr><td>50-80%</td><td>Multi-hour balancing, capacity adequacy</td><td>4-8 hr storage, transmission, flexible loads</td><td>Moderate additional costs</td></tr>
<tr><td>80-100%</td><td>Multi-day droughts, seasonal mismatch</td><td>LDES, firm clean power, sector coupling</td><td>Significant incremental costs</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-gd-undergrad-q1">
<p>"The last 10-20% of grid decarbonization is disproportionately expensive and technically challenging. Achieving 90% clean electricity costs roughly $40-60/MWh on average, but reaching 100% may add $20-50/MWh due to the need for long-duration storage and firm clean resources to cover extended renewable droughts."</p>
<cite>— NREL, 100% Clean Electricity by 2035 Study, 2022</cite>
</blockquote>

<h3>Transmission as a Decarbonization Enabler</h3>
<ul>
<li><strong>Geographic diversity:</strong> Connecting distant renewable zones smooths aggregate variability by 30-50%</li>
<li><strong>Interregional transfer:</strong> HVDC ties between regions reduce firm capacity needs by sharing reserves</li>
<li><strong>GW-scale corridors:</strong> DOE National Transmission Planning Study identifies need for 2-3x current interregional capacity</li>
<li><strong>Permitting reform:</strong> Current 7-12 year development timeline for interstate transmission is a binding constraint</li>
</ul>

<h3>Firm Clean Power Options</h3>
<table class="technical-table">
<thead>
<tr><th>Technology</th><th>Dispatchability</th><th>Estimated LCOE</th><th>Timeline</th></tr>
</thead>
<tbody>
<tr><td>Advanced nuclear (SMR)</td><td>Baseload/load-following</td><td>$60-100/MWh</td><td>Late 2020s deployment</td></tr>
<tr><td>Enhanced geothermal</td><td>Baseload</td><td>$45-80/MWh</td><td>2030+ at scale</td></tr>
<tr><td>Hydrogen turbines</td><td>Peaking/dispatchable</td><td>$80-150/MWh</td><td>2030+ (fuel cost dependent)</td></tr>
<tr><td>Natural gas + CCS</td><td>Dispatchable</td><td>$60-90/MWh</td><td>Available now (limited deployment)</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Grid decarbonization is fundamentally a systems engineering challenge. No single technology solves it—the solution requires a portfolio of variable renewables, short and long-duration storage, transmission, demand flexibility, and firm clean resources, optimized as an integrated system. Engineers must move beyond component-level thinking to system-level planning that accounts for temporal and spatial correlations in renewable generation, load patterns, and extreme weather events.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Deep Grid Decarbonization: Capacity Expansion Modeling, Resource Adequacy, and System Transformation</h2>

<p>Planning for a net-zero electricity system requires sophisticated capacity expansion models, reformed resource adequacy frameworks, and integrated assessment of cross-sector electrification impacts. Graduate analysis examines modeling methodologies, the economics of the last 10-20% of decarbonization, and institutional reforms needed to enable the transition.</p>

<h3>Capacity Expansion Modeling</h3>

<table class="technical-table">
<thead>
<tr><th>Model</th><th>Developer</th><th>Scope</th><th>Key Feature</th></tr>
</thead>
<tbody>
<tr><td>ReEDS</td><td>NREL</td><td>U.S. electricity system</td><td>Hourly operations, transmission</td></tr>
<tr><td>GenX</td><td>MIT/Princeton</td><td>Configurable regions</td><td>Open-source, detailed storage modeling</td></tr>
<tr><td>PLEXOS</td><td>Energy Exemplar</td><td>Global, utility-scale</td><td>Commercial-grade production cost</td></tr>
<tr><td>SWITCH</td><td>UC Berkeley</td><td>Regional/national</td><td>Open-source, investment + operations</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-gd-grad-q1">
<p>"Capacity expansion models reveal that the cost-optimal path to a clean grid is not linear—it follows an S-curve where rapid initial progress from cheap solar and wind gives way to diminishing returns as the system must accommodate increasingly costly solutions for residual emissions."</p>
<cite>— Joule, "The Cost of Decarbonizing the U.S. Electricity Sector," 2023</cite>
</blockquote>

<h3>Resource Adequacy Reform</h3>
<ul>
<li><strong>Traditional metrics:</strong> Loss-of-load expectation (LOLE) of 1 day in 10 years; originally designed for thermal fleet</li>
<li><strong>ELCC for renewables:</strong> Marginal ELCC declines with penetration; 4-hr storage ELCC saturates at 20-30% penetration</li>
<li><strong>Correlated weather risk:</strong> Traditional LOLE methods underestimate risk from correlated renewable droughts across regions</li>
<li><strong>Clean capacity markets:</strong> Designing capacity mechanisms that incentivize clean firm resources while phasing out fossil</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-gd-grad-q2">
<p>"Traditional resource adequacy analysis based on independent generator outages fundamentally underestimates risk in high-renewable systems where weather-driven generation shortfalls are correlated across space and time. New methods incorporating climate-informed weather years and cross-regional correlations are essential."</p>
<cite>— IEEE Transactions on Power Systems, "Resource Adequacy for Decarbonized Grids," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Grid decarbonization research increasingly focuses on the interaction between technology costs, market design, and institutional capacity. Model results are sensitive to assumptions about technology availability, cost trajectories, and social acceptance constraints. The most robust research uses scenario analysis across multiple futures, incorporates weather-year variability, and accounts for the institutional reforms needed to enable the technical transition. The question is no longer whether a clean grid is technically feasible, but what combination of policies, markets, and investments will achieve it most efficiently and equitably.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Capacity expansion modeling, technology portfolios, and transition pathway analysis.</p>' } }],
    activities: [{ id: 're-gd-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Clean the Grid!', MIDDLE_SCHOOL: 'Plan 100% Clean', HIGH_SCHOOL: 'Pathway Analysis', UNDERGRADUATE: 'Capacity Planning', GRADUATE: 'Deep Decarb', PHD: 'Transition Model' }, description: { ELEMENTARY: 'Replace dirty power with clean power!', MIDDLE_SCHOOL: 'Plan how to reach 100% clean electricity.', HIGH_SCHOOL: 'Analyze different decarbonization pathways.', UNDERGRADUATE: 'Plan clean capacity additions.', GRADUATE: 'Solve the last 20% problem.', PHD: 'Model grid transition dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-gd-game', type: 'simulation', title: 'Grid Transformer', description: 'Transform the grid to 100% clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-gd-quiz', passingScore: 80, questions: [{ id: 'rgdq1', question: { ELEMENTARY: 'Can we make all electricity clean?', MIDDLE_SCHOOL: 'What does 100% clean electricity need?', HIGH_SCHOOL: 'What is firm capacity?', UNDERGRADUATE: 'What is a clean energy standard?', GRADUATE: 'Why is the last 20% hardest?', PHD: 'What is capacity expansion modeling?' }, options: { ELEMENTARY: ['Yes, with sun, wind, and other clean sources', 'No, impossible', 'Only in dreams', 'Maybe in 1000 years'], MIDDLE_SCHOOL: ['Solar, wind, storage, and more working together', 'Only solar', 'Only wind', 'Magic'], HIGH_SCHOOL: ['Generation available on demand regardless of weather', 'Firm muscles', 'Strong poles', 'Rigid wires'], UNDERGRADUATE: ['Policy requiring clean electricity percentage', 'A rule about being clean', 'Building codes', 'Efficiency standard'], GRADUATE: ['Need firm capacity for periods when variable renewables are low', 'Its easier', 'No challenge', 'Already solved'], PHD: ['Modeling optimal generation investment over time', 'Expanding capacity', 'Making models bigger', 'Capacity building'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! We can make all our electricity from clean sources like solar, wind, and hydropower!', MIDDLE_SCHOOL: '100% clean electricity needs a combination of solar, wind, storage, and other clean sources.', HIGH_SCHOOL: 'Firm capacity is generation that can be dispatched when needed regardless of weather.', UNDERGRADUATE: 'Clean energy standards require utilities to supply a percentage of electricity from clean sources.', GRADUATE: 'Variable renewables may have extended low periods requiring long-duration storage or firm clean power.', PHD: 'Capacity expansion modeling optimizes generation and storage investment decisions over long timeframes.' } }, { id: 'rgdq12', question: { ELEMENTARY: 'What does decarbonize the grid mean?', MIDDLE_SCHOOL: 'How can we make the electricity grid cleaner?', HIGH_SCHOOL: 'What role does natural gas play as a transition fuel?', UNDERGRADUATE: 'How do capacity expansion models determine least-cost decarbonization pathways?', GRADUATE: 'What are the system integration challenges of 80%+ renewable electricity grids?', PHD: 'How do carbon pricing mechanisms interact with renewable energy subsidies in grid decarbonization?' }, options: { ELEMENTARY: ['Removing carbon pollution from electricity generation', 'Cleaning the wires', 'Making the grid smaller', 'Using less electricity'], MIDDLE_SCHOOL: ['By replacing fossil fuels with renewable energy and storage', 'Only by using less power', 'Painting power plants green', 'Building more coal plants'], HIGH_SCHOOL: ['Gas produces less CO2 than coal but is not zero-carbon; bridging to renewables', 'Gas is carbon-free', 'Gas is worse than coal', 'Gas is the final solution'], UNDERGRADUATE: ['Linear programming optimizes generation mix, transmission, and storage investment under emission constraints', 'Models are not useful', 'Only expert opinion matters', 'Random selection works'], GRADUATE: ['Balancing supply-demand, maintaining stability, ensuring resource adequacy, and managing transmission congestion', 'No challenges at 80%+', 'Only cost matters', 'Intermittency is the only issue'], PHD: ['Carbon pricing provides economy-wide signal while subsidies accelerate deployment; interaction can over-subsidize or create efficiency', 'They are unrelated', 'Carbon pricing alone is sufficient', 'Subsidies cancel carbon pricing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Decarbonizing the grid means switching from fossil fuels like coal and gas to clean sources like solar, wind, and hydro to stop carbon pollution from electricity generation.', MIDDLE_SCHOOL: 'We can make the grid cleaner by building more solar, wind, and storage, retiring coal and gas plants, improving efficiency, and modernizing the transmission system.', HIGH_SCHOOL: 'Natural gas emits 50-60% less CO2 than coal per MWh and provides flexibility, but it is not zero-carbon and carries methane leakage risk. It can bridge to renewables but should not be the endpoint.', UNDERGRADUATE: 'Capacity expansion models (GenX, SWITCH, ReEDS) use linear/mixed-integer programming to co-optimize generation, storage, and transmission investment over decades under emission constraints, technology costs, and reliability requirements.', GRADUATE: '80%+ renewable grids face supply-demand balancing across weather patterns, reduced synchronous inertia, resource adequacy during multi-day low-renewable events, transmission congestion management, and maintaining frequency stability.', PHD: 'Carbon pricing provides technology-neutral abatement incentives while renewable subsidies address market failures (learning, risk). Interaction requires careful design to avoid over-subsidization or inefficient abatement ordering.' } }] },
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
    lessons: [{ id: 're-ev-1', title: 'Electric Cars', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Cars Without Tailpipes!</h2><p>Electric cars run on batteries instead of gasoline. They dont make any smoke from a tailpipe!</p>', MIDDLE_SCHOOL: '<h2>How EVs Work</h2><p>Electric vehicles use batteries to store electricity that powers motors. No engine, no gas, no emissions.</p>', HIGH_SCHOOL: '<h2>EV Technology</h2><p>Battery chemistry, range, charging levels, and infrastructure needs for widespread adoption.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Fleet Electrification: Total Cost Analysis, Depot Infrastructure, and Operational Optimization</h2>

<p>Commercial and government fleet electrification is accelerating, driven by declining vehicle costs, federal and state mandates, and corporate sustainability commitments. Understanding fleet-specific TCO analysis, depot charging infrastructure requirements, and operational planning is essential for fleet managers and energy engineers designing electrification programs.</p>

<h3>Fleet TCO Comparison</h3>

<table class="technical-table">
<thead>
<tr><th>Vehicle Class</th><th>ICE Annual Cost</th><th>EV Annual Cost</th><th>Payback Period</th><th>Key Savings Driver</th></tr>
</thead>
<tbody>
<tr><td>Light-duty sedan</td><td>$8,000-10,000</td><td>$6,000-8,000</td><td>3-5 years</td><td>Fuel savings</td></tr>
<tr><td>Transit bus</td><td>$150,000-180,000</td><td>$100,000-130,000</td><td>4-7 years</td><td>Fuel + maintenance</td></tr>
<tr><td>Delivery van</td><td>$25,000-35,000</td><td>$18,000-28,000</td><td>3-5 years</td><td>High mileage fuel savings</td></tr>
<tr><td>Class 8 day cab</td><td>$180,000-220,000</td><td>$160,000-200,000</td><td>5-8 years</td><td>Fuel (diesel price dependent)</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ev2-undergrad-q1">
<p>"For fleets operating 20,000+ miles annually, electric vehicles already achieve lower total cost of ownership than diesel or gasoline equivalents in most use cases. The economic advantage grows as battery costs decline and electricity rates remain stable relative to volatile fuel prices."</p>
<cite>— Atlas Public Policy, Electric Vehicle Fleet Economics Database, 2023</cite>
</blockquote>

<h3>Depot Charging Infrastructure</h3>
<ul>
<li><strong>Power demand:</strong> 50-bus depot requires 2-5 MW; 100-truck depot may need 5-15 MW</li>
<li><strong>Utility coordination:</strong> Service upgrades (new transformer, primary feed) can take 12-24 months and cost $500K-5M</li>
<li><strong>Managed charging:</strong> Staggering charge start times reduces peak demand 40-60% vs. unmanaged</li>
<li><strong>On-site solar + storage:</strong> Reduces demand charges and provides resilience</li>
<li><strong>Grid services:</strong> V1G managed charging can participate in demand response programs</li>
</ul>

<h3>Operational Planning</h3>
<p>Fleet electrification requires matching vehicle capabilities to route requirements: range, payload, dwell time for charging, and seasonal performance variation (cold weather reduces range 20-40%). Route analysis tools from NREL (FASTSim, AFLEET) help fleet managers identify which vehicles to electrify first based on duty cycle compatibility.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Fleet electrification is a systems problem integrating vehicle selection, charging infrastructure design, utility interconnection, and operational scheduling. The most successful fleet transitions start with detailed route analysis, pilot deployments of 5-10 vehicles, and phased infrastructure buildout. Demand charge management through smart charging is often the difference between positive and negative project economics.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Transportation Electrification at Scale: Distribution Planning, Equity, and System-Level Optimization</h2>

<p>Mass transportation electrification creates coupled planning challenges across the electric power and transportation systems. Graduate analysis examines distribution system impact analysis, equity-centered electrification policy, autonomous vehicle integration, and co-optimization of vehicle fleets with the electricity grid.</p>

<h3>Distribution System Impact Analysis</h3>

<table class="technical-table">
<thead>
<tr><th>EV Adoption Level</th><th>Feeder Impact</th><th>Mitigation Required</th><th>Utility Investment</th></tr>
</thead>
<tbody>
<tr><td>5-10% of customers</td><td>Minimal; within existing capacity</td><td>None typically</td><td>Monitoring only</td></tr>
<tr><td>20-30%</td><td>Transformer overloading on some feeders</td><td>Managed charging, transformer upgrades</td><td>$500-2,000/customer</td></tr>
<tr><td>50%+</td><td>Feeder capacity constraints widespread</td><td>Infrastructure upgrades, TOU rates, V1G</td><td>$2,000-5,000/customer</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ev2-grad-q1">
<p>"Managed EV charging—using TOU rates, demand response, and smart charging protocols—can defer 50-70% of distribution system upgrades that would otherwise be needed at high EV adoption levels. The key is deploying managed charging programs before infrastructure constraints bind."</p>
<cite>— EPRI, Distribution System Planning for Transportation Electrification, 2023</cite>
</blockquote>

<h3>Transportation Equity</h3>
<ul>
<li><strong>Clean mobility access:</strong> Low-income communities bear disproportionate pollution burden from transportation; EV access reduces local emissions</li>
<li><strong>Charging desert problem:</strong> Multi-unit dwellings and renters face charging access barriers; public charging investment must target underserved areas</li>
<li><strong>Used EV market:</strong> As first-generation EVs enter secondary market at $15,000-25,000, affordability improves</li>
<li><strong>Federal programs:</strong> EPA Clean School Bus ($5B), NEVI formula funding ($5B), IRA used EV credit ($4,000)</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-ev2-grad-q2">
<p>"The Justice40 initiative requires that 40% of federal clean energy investment benefits flow to disadvantaged communities. For transportation electrification, this means prioritizing EV charging infrastructure, clean transit, and electric school buses in communities with the highest pollution burden."</p>
<cite>— White House Environmental Justice Council, Justice40 Implementation Guidance, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Transportation electrification research requires coupled power-transportation modeling that captures the feedback loops between EV adoption, charging behavior, grid investment, and electricity prices. Ensuring equitable outcomes requires moving beyond average cost-benefit analysis to distributional impact assessment across income levels, geographies, and communities. The intersection of autonomous vehicles and electrification adds further complexity as ride-hailing fleet operators may drive EV adoption patterns very differently from individual consumers.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Battery technology, mobility-as-a-service, and lifecycle carbon analysis.</p>' } }],
    activities: [{ id: 're-ev-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Drive Electric!', MIDDLE_SCHOOL: 'EV Journey', HIGH_SCHOOL: 'Charging Network', UNDERGRADUATE: 'Fleet Analysis', GRADUATE: 'V2G Modeling', PHD: 'System Design' }, description: { ELEMENTARY: 'Take a trip in an electric car!', MIDDLE_SCHOOL: 'Plan an EV road trip.', HIGH_SCHOOL: 'Design a charging network.', UNDERGRADUATE: 'Analyze fleet electrification.', GRADUATE: 'Model vehicle-grid integration.', PHD: 'Design mobility systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ev-game', type: 'simulation', title: 'EV Champion', description: 'Electrify transportation and cut emissions!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ev-quiz', passingScore: 80, questions: [{ id: 'revq1', question: { ELEMENTARY: 'What powers an electric car?', MIDDLE_SCHOOL: 'Why are EVs cleaner?', HIGH_SCHOOL: 'What is Level 3 charging?', UNDERGRADUATE: 'What is TCO?', GRADUATE: 'What is V2G?', PHD: 'What is MaaS?' }, options: { ELEMENTARY: ['A battery', 'Gasoline', 'Steam', 'Pedals'], MIDDLE_SCHOOL: ['No tailpipe emissions', 'They fly', 'Use more fuel', 'Not cleaner'], HIGH_SCHOOL: ['DC fast charging', 'Slow home charging', 'Gas station', 'Manual charging'], UNDERGRADUATE: ['Total Cost of Ownership', 'The Car Owner', 'Technical Car Option', 'Top Cost Only'], GRADUATE: ['Vehicle-to-Grid - EVs sending power back', 'Video to Grid', 'Vertical Grid', 'Visual Grid'], PHD: ['Mobility as a Service', 'Make a Sale', 'Motor and Speed', 'Manual and Semi'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electric cars are powered by big batteries that store electricity!', MIDDLE_SCHOOL: 'EVs produce no tailpipe emissions because they run on electricity instead of burning fuel.', HIGH_SCHOOL: 'Level 3 or DC fast charging can add significant range in 20-30 minutes.', UNDERGRADUATE: 'TCO compares all costs including fuel, maintenance, and purchase price over vehicle lifetime.', GRADUATE: 'V2G allows EVs to send stored energy back to the grid during peak demand.', PHD: 'Mobility as a Service integrates various transport modes into accessible on-demand services.' } }, { id: 'revq12', question: { ELEMENTARY: 'Are electric buses used in cities?', MIDDLE_SCHOOL: 'How do electric trucks compare to diesel trucks?', HIGH_SCHOOL: 'What is vehicle-to-grid?', UNDERGRADUATE: 'How do fleet electrification total cost of ownership models account for charging infrastructure?', GRADUATE: 'What are the grid planning requirements for electrifying medium and heavy-duty vehicle depots?', PHD: 'How do autonomous electric vehicles change urban mobility energy demand patterns?' }, options: { ELEMENTARY: ['Yes! Many cities use electric buses', 'No, only cars are electric', 'Only trains are electric', 'Only taxis'], MIDDLE_SCHOOL: ['Electric trucks have lower fuel and maintenance costs but higher upfront price', 'Diesel is always better', 'They are identical', 'Electric trucks dont exist'], HIGH_SCHOOL: ['Electric vehicles sending stored power back to the grid when parked', 'A video game', 'A type of highway', 'Grid-powered vehicles'], UNDERGRADUATE: ['TCO includes vehicle CAPEX, charger installation, electricity tariffs, demand charges, and maintenance savings', 'Only vehicle price matters', 'Charging is free', 'Only fuel cost counts'], GRADUATE: ['Depot electrification requires MW-scale service upgrades, demand management, and utility coordination', 'No grid planning needed', 'Standard outlets suffice', 'Only a single charger needed'], PHD: ['Shared autonomous EVs increase VMT per vehicle but reduce fleet size and can optimize charging for grid benefit', 'No change in energy use', 'Only increases energy demand', 'Only for rural areas'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Electric buses are being used in cities all over the world, providing quiet, zero-emission public transportation.', MIDDLE_SCHOOL: 'Electric trucks offer 40-60% lower fuel costs and 30-40% lower maintenance costs than diesel, with TCO parity approaching for many duty cycles despite higher upfront cost.', HIGH_SCHOOL: 'V2G allows parked electric vehicles to discharge stored electricity back to the grid, providing services like peak shaving and frequency regulation while earning revenue for the EV owner.', UNDERGRADUATE: 'Fleet TCO models account for vehicle lease/purchase, Level 2 and DCFC charger installation ($2-5K per L2, $50-150K per DCFC), electricity costs including demand charges (often 30-50% of charging cost), and reduced maintenance.', GRADUATE: 'Medium/heavy-duty depot electrification can require 2-10+ MW service upgrades, necessitating utility distribution planning, demand charge management through smart scheduling and on-site storage, and potentially dedicated substations.', PHD: 'Shared autonomous EVs may increase vehicle-miles-traveled 10-30% (repositioning, induced demand) while reducing fleet size 60-80%, enabling optimized off-peak charging coordination that reduces grid impact vs individually owned EVs.' } }] },
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
    lessons: [{ id: 're-sg-1', title: 'Smarter Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Computers Help the Grid!</h2><p>Smart grids use computers to know when you need power and send it to you more efficiently.</p>', MIDDLE_SCHOOL: '<h2>What is a Smart Grid?</h2><p>Smart grids add sensors and communication to the electricity network, enabling better management and reliability.</p>', HIGH_SCHOOL: '<h2>Smart Grid Components</h2><p>Smart meters, sensors, automated switches, and communication networks enable two-way power and information flow.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Advanced Distribution Technology: AMI Analytics, DERMS, and Grid-Edge Computing</h2>

<p>The modern distribution utility operates as a technology platform, processing terabytes of data from millions of smart meters, thousands of sensors, and growing fleets of distributed energy resources. Understanding the software and communications architecture that enables real-time grid management is essential for engineers designing and operating 21st-century distribution systems.</p>

<h3>AMI Data Analytics Applications</h3>

<table class="technical-table">
<thead>
<tr><th>Application</th><th>Data Source</th><th>Analytics Method</th><th>Utility Value</th></tr>
</thead>
<tbody>
<tr><td>Revenue protection</td><td>15-min interval data</td><td>Anomaly detection algorithms</td><td>1-3% revenue recovery</td></tr>
<tr><td>Transformer loading</td><td>Downstream meter aggregation</td><td>Statistical load estimation</td><td>Targeted replacement vs. blanket upgrades</td></tr>
<tr><td>Outage detection</td><td>Last gasp / power restoration</td><td>Automated OMS integration</td><td>Faster restoration, fewer truck rolls</td></tr>
<tr><td>Voltage monitoring</td><td>Meter voltage readings</td><td>Distribution state estimation</td><td>CVR, Volt-VAR optimization</td></tr>
<tr><td>EV detection</td><td>Load shape change detection</td><td>Machine learning classification</td><td>Proactive infrastructure planning</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-sg2-undergrad-q1">
<p>"Utilities that have deployed advanced analytics on AMI data report 2-5% reductions in distribution system losses through voltage optimization, 30-50% reductions in estimated billing, and 20-40% faster outage restoration through automated detection and switching."</p>
<cite>— Electric Power Research Institute (EPRI), AMI Analytics Value Assessment, 2023</cite>
</blockquote>

<h3>DERMS Architecture</h3>
<ul>
<li><strong>Device aggregation:</strong> Group thousands of DERs into virtual power plants manageable as single resources</li>
<li><strong>Dispatch optimization:</strong> Real-time scheduling of DERs for grid services (frequency, voltage, capacity)</li>
<li><strong>IEEE 2030.5 / OpenADR:</strong> Standard protocols for DER communication and control</li>
<li><strong>Coordination with ADMS:</strong> DERMS must operate within distribution system constraints (voltage, thermal limits)</li>
</ul>

<h3>Grid-Edge Computing</h3>
<p>Edge intelligence enables real-time decision-making without centralized communication latency. Smart inverters (IEEE 1547-2018) provide autonomous functions including Volt-VAR (Category B), Volt-Watt, frequency-watt, and anti-islanding. Edge controllers at the transformer or feeder level aggregate local DERs for coordinated response.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Distribution technology is converging from multiple previously separate domains—metering, SCADA, outage management, DER management, and customer systems—into integrated platforms. Engineers must understand not just individual technologies but how they interact as systems. The data architecture decisions made today will determine whether utilities can manage millions of distributed resources as grid assets or face them as uncontrollable loads.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Transactive Energy and Distribution Market Design: Peer-to-Peer Trading, DLMPs, and Platform Economics</h2>

<p>Transactive energy extends market-based coordination to the distribution system edge, enabling millions of prosumers to trade energy, flexibility, and grid services. Graduate analysis examines distribution locational marginal pricing, blockchain-enabled peer-to-peer trading, platform business models for distribution system operators, and the regulatory reforms enabling these innovations.</p>

<h3>Distribution Locational Marginal Pricing (DLMP)</h3>

<table class="technical-table">
<thead>
<tr><th>DLMP Component</th><th>Mechanism</th><th>Signal Provided</th></tr>
</thead>
<tbody>
<tr><td>Energy</td><td>Marginal cost of serving load at node</td><td>Time-varying energy value</td></tr>
<tr><td>Congestion</td><td>Shadow price of thermal constraints</td><td>Locational infrastructure value</td></tr>
<tr><td>Losses</td><td>Marginal loss factor at node</td><td>Electrical distance from substation</td></tr>
<tr><td>Voltage</td><td>Shadow price of voltage constraints</td><td>Reactive power value</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-sg2-grad-q1">
<p>"Distribution locational marginal prices can vary by 5-10x across a single feeder during peak conditions, reflecting the highly localized nature of distribution system constraints. This spatial granularity creates opportunities for DERs to provide targeted grid services at much higher value than system-average rates."</p>
<cite>— IEEE Transactions on Power Systems, "Distribution Locational Marginal Pricing," 2023</cite>
</blockquote>

<h3>Blockchain and Peer-to-Peer Energy Trading</h3>
<ul>
<li><strong>Brooklyn Microgrid:</strong> Pioneer P2P project enabling neighbors to trade rooftop solar production via Ethereum blockchain</li>
<li><strong>Settlement mechanisms:</strong> Smart contracts automate bilateral energy trading and settlement</li>
<li><strong>Scalability challenges:</strong> Transaction throughput, latency, and energy consumption of proof-of-work consensus</li>
<li><strong>Regulatory barriers:</strong> P2P trading conflicts with utility-as-sole-provider regulations in most jurisdictions</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-sg2-grad-q2">
<p>"While blockchain-enabled peer-to-peer energy trading captures public imagination, the real transformation may come from centrally-coordinated distribution markets operated by DSOs, which can achieve similar outcomes with lower transaction costs and better integration with physical grid constraints."</p>
<cite>— Nature Energy, "Rethinking Peer-to-Peer Energy Trading," 2022</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Transactive energy research sits at the intersection of market design, power systems, and computer science. Key open questions include: Can distribution markets clear efficiently given the computational complexity of AC power flow constraints? How should market rules handle the dual role of DERs as both market participants and grid-connected devices? And what regulatory frameworks enable distribution market innovation while protecting captive customers from market power abuse?</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Machine learning for grid operations, distributed control, and cyber-physical security.</p>' } }],
    activities: [{ id: 're-sg-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Smart Grid Game!', MIDDLE_SCHOOL: 'Grid Sensors', HIGH_SCHOOL: 'Smart Meter Data', UNDERGRADUATE: 'System Architecture', GRADUATE: 'Market Design', PHD: 'ML Application' }, description: { ELEMENTARY: 'Help the smart grid work!', MIDDLE_SCHOOL: 'Add sensors to improve the grid.', HIGH_SCHOOL: 'Analyze smart meter data.', UNDERGRADUATE: 'Design smart grid architecture.', GRADUATE: 'Design a transactive energy market.', PHD: 'Apply machine learning to grid operations.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-sg-game', type: 'simulation', title: 'Grid Operator', description: 'Run a smart grid efficiently!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-sg-quiz', passingScore: 80, questions: [{ id: 'rsgq1', question: { ELEMENTARY: 'What makes a grid smart?', MIDDLE_SCHOOL: 'What is a smart meter?', HIGH_SCHOOL: 'What is demand response?', UNDERGRADUATE: 'What is AMI?', GRADUATE: 'What is transactive energy?', PHD: 'What is distributed control?' }, options: { ELEMENTARY: ['Computers and sensors', 'Magic', 'More wires', 'Bigger poles'], MIDDLE_SCHOOL: ['A meter that sends usage data automatically', 'A smart person reading meter', 'A regular meter', 'No meter'], HIGH_SCHOOL: ['Reducing demand when grid is stressed', 'Demanding response', 'Response team', 'Demand increase'], UNDERGRADUATE: ['Advanced Metering Infrastructure', 'All Meters Inside', 'American Meter Inc', 'Auto Meter Input'], GRADUATE: ['Energy trading at the distribution level', 'Money trading', 'Trans-Atlantic energy', 'Transit energy'], PHD: ['Control spread across many devices', 'One central computer', 'No control', 'Manual control'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Smart grids use computers and sensors to manage electricity more efficiently!', MIDDLE_SCHOOL: 'Smart meters measure electricity use in detail and communicate data back to the utility.', HIGH_SCHOOL: 'Demand response programs reduce electricity use during peak times to balance the grid.', UNDERGRADUATE: 'AMI includes smart meters, communications networks, and data management systems.', GRADUATE: 'Transactive energy enables distributed resources to participate in energy markets.', PHD: 'Distributed control spreads decision-making across many devices rather than centralizing.' } }, { id: 'rsgq2', question: { ELEMENTARY: 'What makes a grid smart?', MIDDLE_SCHOOL: 'How do sensors help the power grid?', HIGH_SCHOOL: 'What is SCADA?', UNDERGRADUATE: 'How do distribution system operators transition to active network management?', GRADUATE: 'What role does edge computing play in next-generation smart grid architectures?', PHD: 'How do federated learning approaches enable privacy-preserving smart grid analytics?' }, options: { ELEMENTARY: ['Computers, sensors, and software that manage electricity automatically', 'Faster wires', 'More power plants', 'Bigger transformers'], MIDDLE_SCHOOL: ['They detect problems and help fix them quickly', 'They make electricity', 'They are decorative', 'Only for security'], HIGH_SCHOOL: ['A system that monitors and controls the grid remotely', 'A type of robot', 'A brand of battery', 'A social media platform'], UNDERGRADUATE: ['ADMS platforms, DER visibility, and probabilistic forecasting enable active voltage and power management', 'DSOs dont manage DER', 'Passive operation continues', 'Only transmission changes'], GRADUATE: ['Edge nodes process local data for sub-second protection and control decisions without cloud latency', 'Edge computing is not relevant', 'All data goes to the cloud', 'Only for smart meters'], PHD: ['FL trains models across utility datasets without sharing raw consumption data, preserving customer privacy', 'Privacy cannot be maintained', 'Only centralized data works', 'Smart grids dont use ML'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Smart grids use digital sensors, communication networks, and software to monitor and manage electricity flow automatically and efficiently.', MIDDLE_SCHOOL: 'Grid sensors detect voltage changes, equipment faults, and power quality issues in real time, enabling faster response to problems and better management of the entire system.', HIGH_SCHOOL: 'SCADA (Supervisory Control and Data Acquisition) is a system that remotely monitors and controls grid equipment like substations, switches, and generators from a central control room.', UNDERGRADUATE: 'DSO transition to active network management requires ADMS platforms integrating real-time DER telemetry, probabilistic load/generation forecasting, and automated Volt/VAR and congestion management across feeders.', GRADUATE: 'Edge computing at substations and intelligent electronic devices enables sub-millisecond protection decisions, local DER coordination, and data aggregation, reducing cloud communication latency and bandwidth requirements for time-critical functions.', PHD: 'Federated learning trains ML models (load forecasting, anomaly detection) across distributed utility datasets without centralizing raw smart meter data, satisfying privacy regulations while leveraging collective intelligence.' } }] },
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
    lessons: [{ id: 're-mg-1', title: 'Small but Mighty', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Mini Power Grids!</h2><p>A microgrid is a small power system that can keep the lights on even when the big grid has problems.</p>', MIDDLE_SCHOOL: '<h2>What is a Microgrid?</h2><p>Microgrids are local energy systems with generation and storage that can operate independently from the main grid.</p>', HIGH_SCHOOL: '<h2>Microgrid Components</h2><p>Generation sources, energy storage, loads, and smart controllers that manage islanding and reconnection.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Community Microgrids and Resilience: Value Quantification, Design Standards, and Policy Frameworks</h2>

<p>As extreme weather events increase in frequency and severity, community microgrids are emerging as critical infrastructure for resilience. FEMA data shows that power outages from major weather events have increased 67% since 2000. Community microgrids—serving multiple buildings, critical facilities, or entire neighborhoods—provide a scalable approach to enhancing resilience while delivering ongoing economic value through energy management.</p>

<h3>Resilience Value Quantification</h3>

<table class="technical-table">
<thead>
<tr><th>Facility Type</th><th>Value of Lost Load ($/kWh)</th><th>Critical Duration</th><th>Microgrid Justification</th></tr>
</thead>
<tbody>
<tr><td>Hospital</td><td>$150-500</td><td>72+ hours</td><td>Life safety, regulatory requirement</td></tr>
<tr><td>Data center</td><td>$200-1,000</td><td>Continuous</td><td>SLA penalties, data loss</td></tr>
<tr><td>Water/wastewater</td><td>$50-200</td><td>48+ hours</td><td>Public health, EPA consent orders</td></tr>
<tr><td>Grocery/pharmacy</td><td>$20-80</td><td>24-48 hours</td><td>Community sustenance, cold chain</td></tr>
<tr><td>Community shelter</td><td>Incalculable</td><td>Duration of event</td><td>Life safety, social cohesion</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-mg2-undergrad-q1">
<p>"Community resilience hubs—microgrids serving cooling centers, communication nodes, and medical facilities during grid outages—provide social value that transcends traditional benefit-cost analysis. Their value is measured in lives saved, not just dollars."</p>
<cite>— DOE, Community Resilience Planning Guide for Microgrids, 2023</cite>
</blockquote>

<h3>Community Microgrid Design Considerations</h3>
<ul>
<li><strong>Multi-customer serving:</strong> Must address utility franchise territory issues; special tariffs or ownership structures needed</li>
<li><strong>Critical load identification:</strong> Community engagement process to determine which loads receive priority during islanding</li>
<li><strong>Renewable integration:</strong> Solar + storage microgrids can sustain critical loads for days without fuel resupply</li>
<li><strong>IEEE 1547.4:</strong> Standard for intentional islanding and reconnection of distributed resources</li>
</ul>

<h3>Federal and State Resilience Programs</h3>
<table class="technical-table">
<thead>
<tr><th>Program</th><th>Funding</th><th>Eligible Projects</th></tr>
</thead>
<tbody>
<tr><td>DOE Grid Resilience and Innovation Partnerships (GRIP)</td><td>$10.5B</td><td>Grid hardening, microgrids, DER</td></tr>
<tr><td>FEMA BRIC (Building Resilient Infrastructure)</td><td>$1B/year</td><td>Hazard mitigation including microgrids</td></tr>
<tr><td>State programs (CT, NY, CA, NJ)</td><td>Varies</td><td>Community microgrid feasibility and construction</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Community microgrid engineering requires combining traditional power systems design with community engagement, resilience quantification, and multi-stakeholder governance. The technical challenge of serving multiple customers across utility infrastructure during islanding is compounded by regulatory, ownership, and cost allocation questions. Success requires interdisciplinary teams spanning engineering, emergency management, community planning, and utility regulatory expertise.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Resilience Engineering: Multi-Hazard Analysis, Optimal Investment, and Regulatory Innovation</h2>

<p>Quantifying and optimizing resilience investment requires probabilistic frameworks that account for multiple hazard types, cascading failures, and community-specific vulnerability. Graduate analysis examines stochastic resilience optimization, regulatory innovation enabling community microgrids, and the intersection of climate adaptation with clean energy deployment.</p>

<h3>Multi-Hazard Resilience Framework</h3>

<table class="technical-table">
<thead>
<tr><th>Hazard</th><th>Grid Impact</th><th>Microgrid Sizing Implication</th><th>Climate Trend</th></tr>
</thead>
<tbody>
<tr><td>Hurricane/typhoon</td><td>Wide-area, multi-day outage</td><td>72-168 hr island capability</td><td>Increasing intensity</td></tr>
<tr><td>Wildfire</td><td>PSPS de-energization events</td><td>24-72 hr island capability</td><td>Expanding fire seasons</td></tr>
<tr><td>Extreme heat</td><td>Transformer overloading, demand spike</td><td>Peak shaving + backup cooling</td><td>More frequent heat waves</td></tr>
<tr><td>Winter storm</td><td>Generation + transmission failures</td><td>Fuel-independent generation (solar+storage)</td><td>Possible polar vortex disruption</td></tr>
<tr><td>Cyberattack</td><td>Control system disruption</td><td>Autonomous island operation</td><td>Increasing sophistication</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-mg2-grad-q1">
<p>"Optimizing microgrid investment across multiple hazard scenarios reveals that designing for the single worst-case event often leads to over-investment in some capabilities and under-investment in others. Multi-hazard stochastic optimization identifies portfolios that provide robust resilience across the full range of threats."</p>
<cite>— Risk Analysis, "Multi-Hazard Optimization of Community Microgrid Investments," 2023</cite>
</blockquote>

<h3>Regulatory Innovation</h3>
<ul>
<li><strong>Connecticut microgrid program:</strong> First state program funding community microgrid design and construction; competitive solicitation model</li>
<li><strong>New York REV:</strong> Reforming Energy Vision enables utility microgrid tariffs and non-wires alternatives</li>
<li><strong>Microgrid-as-a-service:</strong> Third-party ownership model where developer builds, owns, operates; customer pays service fee</li>
<li><strong>Community choice aggregation:</strong> CCA entities increasingly investing in community microgrids for resilience</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-mg2-grad-q2">
<p>"The regulatory barrier to community microgrids is not technology but institutional design. Serving multiple customers across utility infrastructure during islanding challenges fundamental assumptions about utility franchise territory, safety jurisdiction, and rate design."</p>
<cite>— The Electricity Journal, "Regulatory Frameworks for Community Microgrids," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Resilience research is evolving from engineering reliability analysis to socio-technical systems thinking. Key frontiers include: quantifying the compounding effects of sequential extreme events; integrating social vulnerability indices into resilience investment optimization; developing adaptive microgrid control strategies that reconfigure based on evolving hazard conditions; and creating equitable cost allocation frameworks that ensure resilience benefits reach the most vulnerable communities.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Networked microgrids, hierarchical control, and resilience valuation.</p>' } }],
    activities: [{ id: 're-mg-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Microgrid!', MIDDLE_SCHOOL: 'Island Mode', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Economics Model', GRADUATE: 'Community Plan', PHD: 'Network Optimization' }, description: { ELEMENTARY: 'Create a small power system!', MIDDLE_SCHOOL: 'Practice operating in island mode.', HIGH_SCHOOL: 'Design a microgrid system.', UNDERGRADUATE: 'Model microgrid economics.', GRADUATE: 'Plan a community microgrid.', PHD: 'Optimize networked microgrids.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-mg-game', type: 'simulation', title: 'Microgrid Manager', description: 'Keep the power on during emergencies!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-mg-quiz', passingScore: 80, questions: [{ id: 'rmgq1', question: { ELEMENTARY: 'What can a microgrid do that regular power cant?', MIDDLE_SCHOOL: 'What is islanding?', HIGH_SCHOOL: 'What makes microgrids resilient?', UNDERGRADUATE: 'What is demand charge reduction?', GRADUATE: 'What is a community microgrid?', PHD: 'What are networked microgrids?' }, options: { ELEMENTARY: ['Keep working when big grid fails', 'Nothing special', 'Use more power', 'Cost more'], MIDDLE_SCHOOL: ['Operating independently from the main grid', 'Being on an island', 'Using island power', 'Disconnecting forever'], HIGH_SCHOOL: ['Local generation and storage with smart control', 'Just batteries', 'Only solar', 'Nothing special'], UNDERGRADUATE: ['Lowering peak demand charges with storage', 'Charging more', 'Demanding charges', 'No reduction'], GRADUATE: ['Microgrid serving multiple buildings or customers', 'Small community', 'No community', 'Single building only'], PHD: ['Multiple microgrids coordinating together', 'Regular networks', 'No networks', 'Single microgrids only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Microgrids can keep power on for important buildings even when the big grid has problems!', MIDDLE_SCHOOL: 'Islanding is when a microgrid disconnects from the main grid and operates independently.', HIGH_SCHOOL: 'Local generation, storage, and intelligent control let microgrids provide power during outages.', UNDERGRADUATE: 'Demand charge reduction uses storage to lower peak demand, reducing utility demand charges.', GRADUATE: 'Community microgrids serve multiple customers, requiring special regulatory arrangements.', PHD: 'Networked microgrids coordinate multiple systems for enhanced resilience and efficiency.' } }, { id: 'rmgq12', question: { ELEMENTARY: 'Can a neighborhood have its own power system?', MIDDLE_SCHOOL: 'What makes microgrids important for emergencies?', HIGH_SCHOOL: 'How do community microgrids serve multiple customers?', UNDERGRADUATE: 'What value-of-resilience methodologies quantify microgrid benefits for critical facilities?', GRADUATE: 'How do networked microgrids coordinate operation during widespread grid outages?', PHD: 'What regulatory innovations enable multi-customer microgrid deployment?' }, options: { ELEMENTARY: ['Yes! Community microgrids power entire neighborhoods', 'No, only one building at a time', 'Only cities can', 'Only with diesel'], MIDDLE_SCHOOL: ['They keep power on when the main grid goes down', 'They dont help in emergencies', 'Only backup generators matter', 'Only candles work'], HIGH_SCHOOL: ['Shared generation and storage serve multiple buildings through a local distribution network', 'Each customer has separate systems', 'Only one customer at a time', 'Community microgrids dont exist'], UNDERGRADUATE: ['Avoided outage costs, statistical VOLL, and resilience dividends quantify microgrid value beyond energy savings', 'Resilience has no value', 'Only energy savings matter', 'Cannot be quantified'], GRADUATE: ['Peer-to-peer power sharing, hierarchical control, and mutual aid protocols maintain coverage across networked microgrids', 'Coordination is impossible', 'Each microgrid is isolated', 'Only one microgrid can island'], PHD: ['Special purpose entities, microgrid tariffs, and regulatory sandboxes enable multi-customer models beyond utility franchise constraints', 'No regulatory path exists', 'Only utilities can operate', 'Regulation prevents all microgrids'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Community microgrids can power an entire neighborhood or campus with shared solar panels, batteries, and generators, keeping the lights on even during grid outages.', MIDDLE_SCHOOL: 'Microgrids provide critical backup power during emergencies like storms, fires, or grid failures, keeping essential services like hospitals, shelters, and communication systems running.', HIGH_SCHOOL: 'Community microgrids use shared generation (solar, generators) and storage connected through a local distribution network to serve multiple buildings, managed by a central controller for optimal dispatch.', UNDERGRADUATE: 'Resilience valuation uses avoided outage costs (business interruption, spoiled goods), statistical value of lost load (VOLL: $10-50/kWh for residential, $50-200+ for commercial), and resilience dividend frameworks to quantify microgrid benefits.', GRADUATE: 'Networked microgrids share power via peer-to-peer protocols, use hierarchical control (local droop, microgrid-level optimization, network-level coordination), and implement mutual aid agreements for load shedding priority during extended outages.', PHD: 'Regulatory innovations including special purpose entities (microgrid-as-a-service), dedicated microgrid tariffs, community choice aggregation, and regulatory sandbox programs create pathways for multi-customer microgrids beyond traditional utility franchise constraints.' } }] },
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
    lessons: [{ id: 're-bio-1', title: 'Plants to Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy from Plants!</h2><p>We can make electricity and fuel from plants, food waste, and even garbage!</p>', MIDDLE_SCHOOL: '<h2>Biomass Energy</h2><p>Organic materials like wood, crops, and waste can be burned or converted to make electricity and fuels.</p>', HIGH_SCHOOL: '<h2>Conversion Technologies</h2><p>Combustion, gasification, pyrolysis, and anaerobic digestion convert biomass to useful energy.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Biofuel Systems Engineering: Production Pathways, Policy Frameworks, and Sustainability</h2>

<p>Global biofuel production reached 190 billion liters in 2023, dominated by corn ethanol (US) and sugarcane ethanol (Brazil). Advanced biofuels—cellulosic ethanol, renewable diesel, and sustainable aviation fuel (SAF)—are critical for decarbonizing transportation sectors resistant to electrification. The Renewable Fuel Standard (RFS) mandates blending targets while the IRA provides production tax credits for SAF.</p>

<h3>Biofuel Production Pathways</h3>

<table class="technical-table">
<thead>
<tr><th>Pathway</th><th>Feedstock</th><th>Process</th><th>Product</th><th>GHG Reduction</th></tr>
</thead>
<tbody>
<tr><td>Corn ethanol</td><td>Corn starch</td><td>Fermentation + distillation</td><td>E10/E15/E85</td><td>20-40%</td></tr>
<tr><td>Cellulosic ethanol</td><td>Crop residues, wood</td><td>Pretreatment + enzymatic hydrolysis</td><td>Cellulosic RIN</td><td>60-85%</td></tr>
<tr><td>Renewable diesel (HVO)</td><td>Fats, oils, greases</td><td>Hydroprocessing</td><td>Drop-in diesel</td><td>50-80%</td></tr>
<tr><td>SAF (HEFA)</td><td>Waste fats, oils</td><td>Hydroprocessing + isomerization</td><td>Jet-A compatible</td><td>50-80%</td></tr>
<tr><td>Biomethane (RNG)</td><td>Dairy manure, landfill</td><td>Anaerobic digestion + upgrading</td><td>Pipeline-quality gas</td><td>70-300%</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-biofuel-undergrad-q1">
<p>"Sustainable aviation fuel is essential for decarbonizing aviation—an industry responsible for 2.5% of global CO2 emissions with no viable electrification pathway for long-haul flights. Current SAF production is less than 0.1% of jet fuel demand; scaling to 10% by 2030 requires massive investment."</p>
<cite>— ICAO, State of Sustainable Aviation Fuel Production, 2023</cite>
</blockquote>

<h3>U.S. Biofuel Policy</h3>
<ul>
<li><strong>RFS2:</strong> Mandates 36 billion gallons/year by 2022; actual volumes set annually by EPA</li>
<li><strong>RINs market:</strong> Renewable identification numbers create compliance credit trading; D3 (cellulosic) RINs most valuable</li>
<li><strong>LCFS:</strong> California Low Carbon Fuel Standard creates credit market based on lifecycle carbon intensity</li>
<li><strong>IRA SAF credit:</strong> $1.25-1.75/gallon for SAF achieving 50%+ GHG reduction vs. conventional jet fuel</li>
</ul>

<h3>Sustainability Certification</h3>
<p>CORSIA (Carbon Offsetting and Reduction Scheme for International Aviation) and RSB (Roundtable on Sustainable Biomaterials) certify biofuel sustainability through lifecycle analysis, land use criteria, and social safeguards. The EU RED III sets increasingly strict sustainability thresholds and introduces cascading use principles prioritizing material use over energy.</p>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Biofuel engineering requires integrating biochemistry, process engineering, supply chain logistics, and lifecycle analysis. The critical evaluation criterion is net lifecycle GHG reduction—which depends not just on conversion efficiency but on feedstock sourcing, land use change, and co-product credits. The highest-value biofuel applications target sectors with no electrification alternative: aviation, marine shipping, and high-temperature industrial processes.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Biofuel Systems: Lifecycle Analysis, Indirect Land Use Change, and SAF Scale-Up</h2>

<p>The climate value of biofuels depends entirely on lifecycle analysis methodology—particularly treatment of biogenic carbon, indirect land use change (iLUC), and time-dependent accounting. Graduate analysis examines LCA methodological controversies, SAF technology scale-up challenges, and the role of advanced biofuels in integrated assessment models.</p>

<h3>Lifecycle Analysis Methodology</h3>

<table class="technical-table">
<thead>
<tr><th>LCA Component</th><th>Methodology</th><th>Key Uncertainty</th><th>Impact on Results</th></tr>
</thead>
<tbody>
<tr><td>Direct emissions</td><td>GREET model, ISO 14044</td><td>Co-product allocation method</td><td>±10-20%</td></tr>
<tr><td>Indirect land use (iLUC)</td><td>GTAP, GLOBIOM models</td><td>Elasticity parameters, baseline</td><td>±50-200%</td></tr>
<tr><td>Biogenic carbon timing</td><td>GWP* vs. GWP100</td><td>Time horizon selection</td><td>±20-50%</td></tr>
<tr><td>Soil carbon</td><td>Century, DayCent models</td><td>Long-term sequestration rate</td><td>±10-30%</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-biofuel-grad-q1">
<p>"Indirect land use change remains the most contentious element of biofuel lifecycle analysis. Different economic models produce iLUC estimates for corn ethanol ranging from 7 to 104 gCO2e/MJ—a range that spans the difference between biofuels being significantly better or worse than fossil fuels."</p>
<cite>— Annual Review of Environment and Resources, "Biofuel Land Use Change Debate," 2023</cite>
</blockquote>

<h3>SAF Scale-Up Pathways</h3>
<ul>
<li><strong>HEFA (current leader):</strong> Hydroprocessed esters and fatty acids from waste oils; feedstock-limited to ~5 billion gallons/year</li>
<li><strong>Fischer-Tropsch:</strong> Gasification + FT synthesis from biomass or waste; higher GHG reduction but higher cost</li>
<li><strong>Alcohol-to-jet (ATJ):</strong> Ethanol dehydration + oligomerization; leverages existing ethanol infrastructure</li>
<li><strong>Power-to-liquid (e-fuels):</strong> Green hydrogen + captured CO2; highest cost but unlimited feedstock potential</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-biofuel-grad-q2">
<p>"Meeting ICAO's long-term aspirational goal of net-zero aviation by 2050 requires approximately 450 billion liters of SAF annually. This represents a 500x scale-up from current production, requiring $1-2 trillion in cumulative investment across production facilities, feedstock supply chains, and hydrogen infrastructure."</p>
<cite>— McKinsey & Company, Clean Skies for Tomorrow: SAF Scale-Up Report, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Biofuel research increasingly focuses on the credibility and governance of carbon accounting. The divergence between LCA methodologies means that the same biofuel pathway can appear either climate-beneficial or climate-harmful depending on analytical choices. Resolving these methodological disputes—particularly around iLUC, biogenic carbon timing, and system boundary definitions—is essential for credible climate policy. The field is moving toward standardized, transparent LCA frameworks with explicit treatment of uncertainty.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Advanced conversion, algae biofuels, and bioenergy with carbon capture (BECCS).</p>' } }],
    activities: [{ id: 're-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Trash to Energy!', MIDDLE_SCHOOL: 'Biogas Plant', HIGH_SCHOOL: 'Conversion Process', UNDERGRADUATE: 'Feedstock Analysis', GRADUATE: 'Carbon Lifecycle', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Turn waste into energy!', MIDDLE_SCHOOL: 'Build a biogas digester.', HIGH_SCHOOL: 'Design a conversion process.', UNDERGRADUATE: 'Analyze biofuel feedstocks.', GRADUATE: 'Calculate lifecycle emissions.', PHD: 'Model bioenergy systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-bio-game', type: 'simulation', title: 'Bioenergy Producer', description: 'Convert organic materials to clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-bio-quiz', passingScore: 80, questions: [{ id: 'rbioq1', question: { ELEMENTARY: 'What can become biofuel?', MIDDLE_SCHOOL: 'What is biogas?', HIGH_SCHOOL: 'What is pyrolysis?', UNDERGRADUATE: 'What is indirect land use change?', GRADUATE: 'What is BECCS?', PHD: 'What limits bioenergy potential?' }, options: { ELEMENTARY: ['Plants and food waste', 'Rocks', 'Water', 'Metal'], MIDDLE_SCHOOL: ['Gas from decomposing organic matter', 'Regular natural gas', 'Air', 'Steam'], HIGH_SCHOOL: ['Heating biomass without oxygen', 'Burning with fire', 'Freezing', 'Adding water'], UNDERGRADUATE: ['Emissions from land converted elsewhere due to biofuel crops', 'Direct land change', 'No land change', 'Land improvement'], GRADUATE: ['Bioenergy with Carbon Capture and Storage', 'Big Energy Carbon Capture', 'Biomass Energy Climate Control', 'No such thing'], PHD: ['Land availability, water, and competition with food', 'Unlimited potential', 'No limits', 'Only cost'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Plants, food waste, and other organic materials can be turned into biofuels!', MIDDLE_SCHOOL: 'Biogas is produced when organic matter decomposes without oxygen, mainly methane and CO2.', HIGH_SCHOOL: 'Pyrolysis heats biomass without oxygen to produce bio-oil, syngas, and biochar.', UNDERGRADUATE: 'ILUC occurs when biofuel crops displace food crops, causing conversion of land elsewhere.', GRADUATE: 'BECCS combines bioenergy with carbon capture to potentially achieve negative emissions.', PHD: 'Sustainable bioenergy is constrained by land, water, biodiversity, and food security.' } }, { id: 'rbioq2', question: { ELEMENTARY: 'What is biodiesel?', MIDDLE_SCHOOL: 'How is ethanol made from corn?', HIGH_SCHOOL: 'What is cellulosic ethanol?', UNDERGRADUATE: 'How do renewable fuel standard mandates drive biofuel market development?', GRADUATE: 'What are the sustainability implications of palm oil biodiesel expansion?', PHD: 'How do integrated biorefinery concepts maximize value from lignocellulosic feedstocks?' }, options: { ELEMENTARY: ['Fuel for diesel engines made from plant oils or animal fats', 'Regular diesel fuel', 'A type of food', 'A cleaning product'], MIDDLE_SCHOOL: ['Corn starch is fermented into alcohol then distilled into fuel', 'By squeezing corn kernels', 'Corn is burned directly', 'Corn powers solar panels'], HIGH_SCHOOL: ['Ethanol made from non-food plant material like wood and crop residues', 'Regular corn ethanol', 'A type of food supplement', 'Cellulose-powered batteries'], UNDERGRADUATE: ['Volume mandates create guaranteed demand, price floors, and RIN credit markets for obligated parties', 'Mandates have no effect', 'Only voluntary markets work', 'Standards reduce production'], GRADUATE: ['Deforestation, peatland drainage, biodiversity loss, and carbon debt from land-use change outweigh GHG savings', 'No sustainability issues', 'Palm oil is perfectly sustainable', 'Only affects taste'], PHD: ['Biorefineries co-produce fuels, chemicals, and materials from all biomass fractions maximizing revenue and minimizing waste', 'Only fuel production matters', 'Co-products have no value', 'Biorefineries are not viable'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Biodiesel is a renewable fuel made from vegetable oils (like soybean or canola), recycled cooking oil, or animal fats that works in regular diesel engines.', MIDDLE_SCHOOL: 'Corn ethanol is made by milling corn to extract starch, mixing with enzymes to convert starch to sugar, fermenting sugar to alcohol with yeast, then distilling to 200-proof ethanol.', HIGH_SCHOOL: 'Cellulosic ethanol is made from the non-food structural parts of plants (cellulose, hemicellulose in wood, grasses, crop residues), requiring pretreatment and enzymatic hydrolysis before fermentation.', UNDERGRADUATE: 'The US Renewable Fuel Standard mandates blending volumes that create guaranteed biofuel demand, while RIN (Renewable Identification Number) credit markets provide price support. EU RED III sets similar blending targets with sustainability criteria.', GRADUATE: 'Palm oil biodiesel expansion drives tropical deforestation and peatland drainage, releasing stored carbon that creates a carbon debt of 86-423 years, while threatening orangutan habitat and indigenous communities - making it among the highest-risk biofuel feedstocks.', PHD: 'Integrated biorefineries fractionate lignocellulose to co-produce cellulosic ethanol (from C6 sugars), xylitol or furfural (from C5 sugars), lignin-derived aromatics or carbon fiber, and process heat/power from residues, maximizing revenue per ton of biomass.' } }] },
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
    lessons: [{ id: 're-elec-1', title: 'All-Electric Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>No More Gas!</h2><p>Buildings can use electricity for everything - heating, cooling, cooking, and hot water - instead of burning gas!</p>', MIDDLE_SCHOOL: '<h2>Heat Pumps</h2><p>Heat pumps move heat instead of making it, using electricity much more efficiently than gas furnaces.</p>', HIGH_SCHOOL: '<h2>Electrification Benefits</h2><p>Eliminating on-site combustion improves air quality and enables decarbonization as the grid cleans up.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Building Electrification: Heat Pump Technology, Performance Analysis, and Transition Planning</h2>

<p>Building electrification—replacing fossil fuel heating equipment with electric alternatives—is critical for achieving economy-wide decarbonization. Heat pumps now outsell gas furnaces in the U.S., with 4.3 million units sold in 2023. Understanding heat pump performance, building load analysis, and the economics of fuel switching enables engineers to design effective electrification strategies.</p>

<h3>Heat Pump Technology Comparison</h3>

<table class="technical-table">
<thead>
<tr><th>Technology</th><th>COP Range</th><th>Cold Climate Performance</th><th>Installed Cost</th><th>Best Application</th></tr>
</thead>
<tbody>
<tr><td>Air-source (ducted)</td><td>2.5-4.5</td><td>Rated to -15°F; COP drops to 1.5-2.0</td><td>$12,000-20,000</td><td>Whole-home replacement</td></tr>
<tr><td>Air-source (mini-split)</td><td>3.0-5.0</td><td>Rated to -13°F; ideal for zoning</td><td>$3,000-8,000/zone</td><td>Room-level, retrofit</td></tr>
<tr><td>Ground-source (GSHP)</td><td>3.5-5.5</td><td>Excellent (stable ground temp)</td><td>$20,000-40,000</td><td>New construction, high loads</td></tr>
<tr><td>HP water heater</td><td>2.5-4.0</td><td>Works to 40°F ambient</td><td>$1,500-3,000</td><td>Replace electric/gas tank</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-elec-undergrad-q1">
<p>"Modern cold-climate heat pumps deliver 2-3x more heat energy than they consume in electricity, even at sub-zero temperatures. This means electrification reduces total energy consumption while eliminating on-site combustion emissions—a win for both efficiency and climate."</p>
<cite>— NEEP, Cold Climate Air Source Heat Pump Market Assessment, 2023</cite>
</blockquote>

<h3>Building Load Analysis for Electrification</h3>
<ul>
<li><strong>Manual J load calculation:</strong> ACCA standard for residential heating/cooling load estimation; essential for equipment sizing</li>
<li><strong>Electrical panel capacity:</strong> Many homes have 100A panels; heat pumps may require 200A upgrade ($2,000-4,000)</li>
<li><strong>Envelope first:</strong> Insulation and air sealing reduce load, enabling smaller/cheaper heat pump systems</li>
<li><strong>Hybrid approach:</strong> Heat pump handles 80-90% of heating hours; existing furnace covers extreme cold peaks</li>
</ul>

<h3>Economics of Fuel Switching</h3>
<table class="technical-table">
<thead>
<tr><th>Scenario</th><th>Annual Operating Cost</th><th>vs. Gas Furnace</th><th>Key Variable</th></tr>
</thead>
<tbody>
<tr><td>HP in mild climate (COP 3.5)</td><td>$800-1,200</td><td>30-50% savings</td><td>Electricity rate</td></tr>
<tr><td>HP in cold climate (COP 2.5)</td><td>$1,200-2,000</td><td>0-20% savings</td><td>Gas vs. elec rate ratio</td></tr>
<tr><td>HP with TOU rate + solar</td><td>$400-800</td><td>50-70% savings</td><td>Solar self-consumption</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Building electrification engineering requires integrating HVAC design, building science, electrical engineering, and energy economics. The fundamental principle is that heat pumps move heat rather than generating it, achieving efficiencies of 200-500%. The design challenge is right-sizing systems for each building's envelope, climate, and usage patterns while managing the electrical infrastructure requirements of transitioning from gas to electric end uses.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Building Electrification at Scale: Grid Impacts, Gas System Transition, and Policy Design</h2>

<p>Widespread building electrification transforms both the electricity and gas systems, creating new winter peak loads while stranding gas infrastructure investments. Graduate analysis examines distribution planning for electrification load growth, gas system decommissioning strategies, building code reform, and the political economy of fossil fuel phase-out in buildings.</p>

<h3>Grid Impact of Building Electrification</h3>

<table class="technical-table">
<thead>
<tr><th>Electrification Scenario</th><th>Winter Peak Impact</th><th>Annual Load Growth</th><th>Distribution Upgrades</th></tr>
</thead>
<tbody>
<tr><td>10% HP adoption</td><td>+5-10% winter peak</td><td>+2-4%</td><td>Targeted transformer upgrades</td></tr>
<tr><td>50% HP adoption</td><td>+30-50% winter peak</td><td>+10-15%</td><td>Feeder reconductoring, substation expansion</td></tr>
<tr><td>100% HP (full electrification)</td><td>+60-100% winter peak</td><td>+25-35%</td><td>Major distribution system rebuild</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-elec-grad-q1">
<p>"Building electrification will shift many utilities from summer-peaking to winter-peaking systems, fundamentally changing resource planning, distribution design criteria, and rate structures. The coincidence of heat pump load with cold-weather renewable droughts creates a challenging reliability scenario that requires careful planning."</p>
<cite>— Brattle Group, Electrification and Grid Planning: Load Growth Scenarios, 2023</cite>
</blockquote>

<h3>Gas System Transition Strategies</h3>
<ul>
<li><strong>Managed transition:</strong> Coordinated neighborhood-by-neighborhood gas system retirement; reduces stranded asset costs</li>
<li><strong>Hybrid electrification:</strong> Heat pumps for 80%+ of heating load; gas backup for extreme cold peaks; extends gas asset life</li>
<li><strong>Death spiral risk:</strong> As customers leave gas system, remaining customers bear higher per-unit infrastructure costs</li>
<li><strong>Stranded assets:</strong> Gas utilities have $200B+ in unrecovered pipeline investment; accelerated depreciation schedules debated</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-elec-grad-q2">
<p>"Strategic decommissioning of gas distribution mains—targeting neighborhoods with aging infrastructure and high electrification potential—can reduce gas system costs while accelerating electrification. The key is coordinating gas retirement with electric capacity buildout to avoid reliability gaps."</p>
<cite>— Energy Transitions Commission, Gas System Decarbonization Pathways, 2023</cite>
</blockquote>

<h3>Building Code and Policy Reform</h3>
<table class="technical-table">
<thead>
<tr><th>Policy</th><th>Jurisdiction</th><th>Mechanism</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>Gas ban (new construction)</td><td>NYC, SF, Berkeley, 70+ cities</td><td>Prohibit gas in new buildings</td><td>Some preempted by state law</td></tr>
<tr><td>All-electric building code</td><td>WA, MA (proposed)</td><td>Electric-ready or all-electric</td><td>Advancing through code cycles</td></tr>
<tr><td>Heat pump mandates</td><td>IRA (tax credits), state programs</td><td>Financial incentives + workforce</td><td>Active deployment</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Building electrification research requires coupled analysis of electricity and gas systems that have historically been planned independently. The central research question is how to manage the transition at the infrastructure level—coordinating gas system retirement with electric system expansion in a way that minimizes total system cost, maintains reliability, and ensures equity. The political economy of this transition—impacting gas utilities, HVAC contractors, and building owners—makes implementation as much a governance challenge as a technical one.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Cold climate performance, load flexibility, and coordinated electrification planning.</p>' } }],
    activities: [{ id: 're-elec-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Go All-Electric!', MIDDLE_SCHOOL: 'Heat Pump Design', HIGH_SCHOOL: 'Retrofit Planning', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Policy Design', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Switch a home to all-electric!', MIDDLE_SCHOOL: 'Design a heat pump system.', HIGH_SCHOOL: 'Plan a building electrification retrofit.', UNDERGRADUATE: 'Size electrification equipment.', GRADUATE: 'Design electrification policy.', PHD: 'Model electrification system impacts.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-elec-game', type: 'simulation', title: 'Electrification Expert', description: 'Convert buildings from gas to electric!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-elec-quiz', passingScore: 80, questions: [{ id: 'relecq1', question: { ELEMENTARY: 'What can replace gas in buildings?', MIDDLE_SCHOOL: 'How do heat pumps work?', HIGH_SCHOOL: 'Why is electrification better for air?', UNDERGRADUATE: 'What is COP?', GRADUATE: 'What are stranded assets?', PHD: 'What is load flexibility?' }, options: { ELEMENTARY: ['Electricity', 'More gas', 'Coal', 'Oil'], MIDDLE_SCHOOL: ['Move heat instead of making it', 'Burn fuel', 'Use magic', 'Create cold'], HIGH_SCHOOL: ['No combustion means no local pollution', 'More smoke', 'Same air quality', 'Worse air'], UNDERGRADUATE: ['Coefficient of Performance - heat output vs electricity input', 'Cost of Production', 'Center of Power', 'Cooling Only Period'], GRADUATE: ['Investments that lose value in transition', 'Floating assets', 'Moving assets', 'Strong assets'], PHD: ['Ability to shift electricity demand timing', 'Flexible loads', 'No flexibility', 'Only generation flexibility'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Electricity can replace gas for heating, cooking, and hot water in buildings!', MIDDLE_SCHOOL: 'Heat pumps move heat from outside to inside (or reverse) instead of burning fuel.', HIGH_SCHOOL: 'Electrification eliminates on-site combustion, removing local air pollution from buildings.', UNDERGRADUATE: 'COP measures how much heat a heat pump delivers per unit of electricity consumed.', GRADUATE: 'Stranded assets are gas infrastructure investments that lose value as buildings electrify.', PHD: 'Load flexibility allows electrified loads to shift in time to match renewable generation.' } }, { id: 'relecq2', question: { ELEMENTARY: 'Can buildings run entirely on electricity?', MIDDLE_SCHOOL: 'What is building electrification?', HIGH_SCHOOL: 'How do heat pump water heaters compare to gas water heaters?', UNDERGRADUATE: 'What are the grid load implications of widespread building electrification?', GRADUATE: 'How do cold-climate heat pumps perform at sub-zero temperatures?', PHD: 'What are the optimal retrofit sequencing strategies for whole-building electrification?' }, options: { ELEMENTARY: ['Yes! All-electric buildings use heat pumps and induction cooktops', 'No, buildings need gas for heating', 'Only small buildings', 'Only in warm climates'], MIDDLE_SCHOOL: ['Replacing gas heating, cooking, and hot water with electric alternatives', 'Adding more outlets', 'Making buildings bigger', 'Only using electric lights'], HIGH_SCHOOL: ['Heat pump water heaters use 2-3x less energy but have higher upfront cost', 'Gas is always more efficient', 'They are identical', 'Heat pump heaters dont work'], UNDERGRADUATE: ['Winter peak demand increases requiring grid planning for coincident heating loads', 'No grid impact', 'Only reduces demand', 'Only summer matters'], GRADUATE: ['Modern cold-climate ASHPs maintain 80-100% capacity to -15F using vapor injection and variable-speed compressors', 'They stop working below freezing', 'Only geothermal works in cold', 'Resistance heat is needed'], PHD: ['Envelope first (insulation, air sealing), then right-size heat pump, then panel upgrade, then electrify remaining appliances', 'Random order works', 'Always start with heat pump', 'Only one change needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! All-electric buildings use heat pumps for heating/cooling, heat pump water heaters, induction cooktops, and battery storage - no gas needed!', MIDDLE_SCHOOL: 'Building electrification means replacing natural gas appliances (furnaces, boilers, stoves, water heaters) with efficient electric alternatives, primarily heat pumps and induction technology.', HIGH_SCHOOL: 'Heat pump water heaters achieve COP of 2-4 (200-400% efficiency) vs gas water heaters at 60-80% efficiency, using 2-3x less energy despite higher upfront cost ($1,500-2,500 vs $800-1,500).', UNDERGRADUATE: 'Widespread electrification shifts building thermal loads to the grid, potentially increasing winter peak demand 30-50%. Utilities must plan for coincident heating loads through demand management, storage, and distribution upgrades.', GRADUATE: 'Modern cold-climate ASHPs use vapor-injection enhanced compressors and variable-speed inverter drives to maintain 80-100% rated heating capacity down to -15F (-26C), with COP of 1.5-2.5 even at extreme temperatures.', PHD: 'Optimal retrofit sequencing: (1) envelope improvements to reduce load, (2) right-sized heat pump installation, (3) electrical panel upgrade to 200A if needed, (4) electrify water heater, cooking, and dryer, minimizing oversizing and cost.' } }] },
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
    lessons: [{ id: 're-ocean-1', title: 'Power from the Sea', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Wave Power!</h2><p>The ocean is always moving with waves and tides. We can capture that motion and turn it into electricity!</p>', MIDDLE_SCHOOL: '<h2>Ocean Energy Sources</h2><p>Waves, tides, currents, and temperature differences in the ocean all contain energy we can harness.</p>', HIGH_SCHOOL: '<h2>Technology Types</h2><p>Wave energy converters, tidal stream turbines, tidal barrages, and ocean thermal energy conversion (OTEC).</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Marine Energy Device Engineering: Structural Design, Materials, and Survivability</h2>

<p>Marine energy devices must operate in one of the most demanding environments on Earth—withstanding corrosion, biofouling, extreme wave loading, and limited maintenance access. This module examines the structural engineering principles, materials science, and survivability strategies that determine whether ocean energy devices can achieve the 20-25 year design life required for economic viability.</p>

<h3>Design Load Cases</h3>

<table class="technical-table">
<thead>
<tr><th>Load Case</th><th>Return Period</th><th>Design Standard</th><th>Typical Load Factor</th></tr>
</thead>
<tbody>
<tr><td>Operating loads</td><td>Annual maximum</td><td>IEC 62600</td><td>1.35 (ULS)</td></tr>
<tr><td>Extreme loads</td><td>50-year return</td><td>IEC 62600 / DNV-OS-C101</td><td>1.5 (ULS)</td></tr>
<tr><td>Fatigue loads</td><td>Design lifetime</td><td>S-N curves, Palmgren-Miner</td><td>Damage summation ≤ 1.0</td></tr>
<tr><td>Accidental loads</td><td>Mooring failure, collision</td><td>DNV-OS-E301</td><td>Survival condition</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ocean2-undergrad-q1">
<p>"The ratio of extreme to operational loads in ocean energy is 5-10x, compared to 2-3x for wind turbines. This means marine energy devices must be structurally designed for survival conditions that far exceed their power-producing operating envelope, fundamentally challenging cost optimization."</p>
<cite>— EMEC (European Marine Energy Centre), Design Basis for Marine Energy Converters, 2023</cite>
</blockquote>

<h3>Materials and Corrosion</h3>
<ul>
<li><strong>Marine-grade steel:</strong> S355 with cathodic protection and marine coating systems; 25-year maintenance cycle</li>
<li><strong>Composite materials:</strong> Fiberglass or carbon fiber for blades and fairings; fatigue and UV resistance critical</li>
<li><strong>Biofouling:</strong> Adds 20-50% hydrodynamic drag within months; antifouling coatings or cleaning required</li>
<li><strong>Concrete:</strong> Used for gravity bases and some OWC structures; marine concrete mix design resists chloride attack</li>
</ul>

<h3>Mooring System Design</h3>
<table class="technical-table">
<thead>
<tr><th>Mooring Type</th><th>Application</th><th>Design Life</th><th>Key Failure Mode</th></tr>
</thead>
<tbody>
<tr><td>Catenary chain</td><td>Floating WECs, shallow-moderate depth</td><td>20-25 years</td><td>Fatigue at fairlead, corrosion</td></tr>
<tr><td>Taut synthetic rope</td><td>Deep water, tension-based</td><td>15-20 years</td><td>UV degradation, creep</td></tr>
<tr><td>Gravity anchor</td><td>Soft seabed, moderate loads</td><td>25+ years</td><td>Scour, seabed mobility</td></tr>
<tr><td>Drag embedment</td><td>Various seabed types</td><td>25+ years</td><td>Installation quality</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Marine energy device engineering confronts a fundamental tension: devices must be robust enough to survive extreme ocean conditions yet cost-effective enough to compete with other renewables. The industry is learning from offshore oil and gas and offshore wind, adapting materials, mooring systems, and maintenance strategies. Survivability—not just energy capture—remains the primary engineering challenge for ocean energy commercialization.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Ocean Energy Project Development: Consenting, Environmental Assessment, and Technology Readiness</h2>

<p>Marine energy project development navigates a complex landscape of environmental regulation, marine spatial planning, technology risk assessment, and stakeholder engagement. Graduate analysis examines consenting frameworks, adaptive management approaches to environmental monitoring, technology readiness assessment, and the institutional barriers to ocean energy commercialization.</p>

<h3>Technology Readiness Assessment</h3>

<table class="technical-table">
<thead>
<tr><th>TRL</th><th>Description</th><th>Ocean Energy Context</th><th>Investment Stage</th></tr>
</thead>
<tbody>
<tr><td>1-3</td><td>Concept to lab validation</td><td>Tank testing of scale models</td><td>Research grants</td></tr>
<tr><td>4-5</td><td>Lab to open water prototype</td><td>Quarter/half-scale sea testing</td><td>Government grants, VC</td></tr>
<tr><td>6-7</td><td>Full-scale demonstration</td><td>Single device grid-connected testing</td><td>Grants + early project finance</td></tr>
<tr><td>8-9</td><td>Pre-commercial to commercial</td><td>Array deployment, cost reduction</td><td>Project finance, revenue support</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-ocean2-grad-q1">
<p>"The ocean energy sector has been in the 'valley of death' between TRL 5-7 for two decades. Breaking through requires de-risking technology at test centers like EMEC and PacWave, standardizing testing protocols, and developing insurance and warranty products that enable project finance."</p>
<cite>— Ocean Energy Europe, Strategic Roadmap: Building Ocean Energy for Europe, 2023</cite>
</blockquote>

<h3>Environmental Consenting Frameworks</h3>
<ul>
<li><strong>Adaptive management:</strong> Deploy-and-monitor approach for novel technologies with limited environmental data; ORJIP provides evidence base</li>
<li><strong>Survey-deploy-monitor:</strong> Sequential approach reduces upfront survey burden while ensuring environmental protection</li>
<li><strong>Collision risk modeling:</strong> For tidal turbines, models estimate encounter rates between marine mammals and rotating blades</li>
<li><strong>Cumulative impact assessment:</strong> Required for array-scale deployment; considers interaction with other marine activities</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-ocean2-grad-q2">
<p>"After a decade of environmental monitoring at test sites worldwide, no significant adverse impacts from single marine energy devices have been detected. The challenge is extrapolating from single-device observations to predict cumulative impacts of commercial-scale arrays."</p>
<cite>— PNNL, State of the Science Report: Environmental Effects of Marine Renewable Energy, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Ocean energy project development research addresses the gap between technology demonstration and commercial deployment. Key questions include: How can consenting processes be streamlined without compromising environmental protection? What financial instruments can share technology risk between public and private sectors? And how should marine spatial planning balance energy development with existing ocean uses—fishing, shipping, defense, and ecosystem conservation—in an era of increasing demand for ocean space?</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Array optimization, advanced materials, wave-structure interaction, and hybrid marine renewable systems.</p>' } }],
    activities: [{ id: 're-ocean-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Catch the Waves!', MIDDLE_SCHOOL: 'Tidal Power', HIGH_SCHOOL: 'Device Design', UNDERGRADUATE: 'Resource Assessment', GRADUATE: 'Project Planning', PHD: 'Array Optimization' }, description: { ELEMENTARY: 'Capture wave energy!', MIDDLE_SCHOOL: 'Generate power from tides.', HIGH_SCHOOL: 'Design a wave energy device.', UNDERGRADUATE: 'Assess ocean energy resources.', GRADUATE: 'Plan a marine energy project.', PHD: 'Optimize device arrays.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-ocean-game', type: 'simulation', title: 'Ocean Energy Engineer', description: 'Harness the power of the sea!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-ocean-quiz', passingScore: 80, questions: [{ id: 'roceanq1', question: { ELEMENTARY: 'What ocean motion makes energy?', MIDDLE_SCHOOL: 'What causes tides?', HIGH_SCHOOL: 'What is OTEC?', UNDERGRADUATE: 'What is a point absorber?', GRADUATE: 'What is marine spatial planning?', PHD: 'What is array interaction?' }, options: { ELEMENTARY: ['Waves and tides', 'Nothing', 'Fish swimming', 'Boats only'], MIDDLE_SCHOOL: ['Moon and sun gravity', 'Wind only', 'Fish', 'Earth spinning only'], HIGH_SCHOOL: ['Ocean Thermal Energy Conversion', 'Ocean Total Energy Capture', 'Ocean Tidal Energy Control', 'No such thing'], UNDERGRADUATE: ['Floating buoy that bobs with waves', 'Fixed point', 'Absorbing water', 'Shore device'], GRADUATE: ['Coordinating ocean use including energy', 'Space planning', 'Marine maps only', 'No planning'], PHD: ['How devices in arrays affect each others performance', 'No interaction', 'Single devices only', 'Random effects'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Ocean waves and tides carry energy that we can capture to make electricity!', MIDDLE_SCHOOL: 'Tides are caused by the gravitational pull of the moon and sun on Earths water.', HIGH_SCHOOL: 'OTEC uses temperature differences between warm surface and cold deep water to generate power.', UNDERGRADUATE: 'Point absorbers are floating devices that move with waves to drive generators.', GRADUATE: 'Marine spatial planning coordinates energy, fishing, shipping, and conservation in ocean areas.', PHD: 'Array interaction studies how wakes and wave absorption between devices affect overall performance.' } }, { id: 'roceanq2', question: { ELEMENTARY: 'What is tidal energy?', MIDDLE_SCHOOL: 'How can ocean temperature differences make electricity?', HIGH_SCHOOL: 'What is the current state of wave energy technology development?', UNDERGRADUATE: 'How do tidal range projects assess environmental impacts on estuarine ecosystems?', GRADUATE: 'What are the techno-economic benchmarks for commercially viable marine energy?', PHD: 'How do digital twin approaches accelerate marine energy device development?' }, options: { ELEMENTARY: ['Energy from the regular rise and fall of ocean tides', 'Wind at the beach', 'Solar power at sea', 'Energy from fish'], MIDDLE_SCHOOL: ['OTEC uses warm surface and cold deep water temperature difference', 'The ocean heats solar panels', 'Cold water freezes into ice power', 'Only hot springs work'], HIGH_SCHOOL: ['Multiple device concepts at TRL 5-7 with leading designs approaching commercial demonstration', 'Fully commercial already', 'Not started yet', 'Only one design exists'], UNDERGRADUATE: ['Hydrodynamic modeling, before-after ecological monitoring, and adaptive management assess changes to sediment transport and biodiversity', 'No assessment needed', 'Only fish counts', 'Environment is not affected'], GRADUATE: ['Target LCOE of $100-150/MWh for wave and $100-200/MWh for tidal by 2030', 'Already at $10/MWh', 'Benchmarks are not set', 'Cost does not matter'], PHD: ['Virtual prototyping reduces physical testing costs and accelerates design iteration through coupled simulation', 'Digital twins are not applicable', 'Only physical testing works', 'Too expensive for marine energy'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Tidal energy captures the power of ocean tides - the regular rising and falling of water levels caused by the gravitational pull of the moon and sun.', MIDDLE_SCHOOL: 'Ocean Thermal Energy Conversion (OTEC) exploits the ~20C temperature difference between tropical surface water and deep cold water to run a thermodynamic cycle generating electricity continuously.', HIGH_SCHOOL: 'Wave energy has multiple concepts (point absorbers, oscillating water columns, overtopping devices, attenuators) at TRL 5-7, with leading designs like CorPower and Carnegie approaching multi-MW commercial demonstration.', UNDERGRADUATE: 'Tidal range EIA uses coupled hydrodynamic-sediment transport models, before-after-control-impact ecological monitoring, fish telemetry studies, and adaptive management frameworks to assess and mitigate changes to estuarine dynamics.', GRADUATE: 'Marine energy targets LCOE of $100-150/MWh (wave) and $100-200/MWh (tidal stream) by 2030, requiring cost reductions through array learning, standardization, and reliability improvements from current demonstration-stage costs.', PHD: 'Marine energy digital twins couple CFD hydrodynamics, structural FEA, power take-off models, and environmental loading to enable virtual prototyping that reduces expensive sea trials and accelerates design optimization from years to months.' } }] },
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
    lessons: [{ id: 're-h2-1', title: 'Hydrogen Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clean Hydrogen!</h2><p>We can split water into hydrogen using electricity from wind and solar. The hydrogen becomes clean fuel!</p>', MIDDLE_SCHOOL: '<h2>Making Green Hydrogen</h2><p>Electrolyzers use renewable electricity to split water into hydrogen and oxygen. The hydrogen can power vehicles or make heat.</p>', HIGH_SCHOOL: '<h2>Hydrogen Value Chain</h2><p>Production via electrolysis, storage (compressed, liquid, or carriers), transport, and end uses in industry and transport.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Green Hydrogen Production: Electrolyzer Design, System Integration, and the Hydrogen Economy</h2>

<p>Green hydrogen—produced via electrolysis powered by renewable electricity—is projected to grow from less than 1% of global hydrogen production today to 10-30% by 2030. The DOE Hydrogen Shot targets $1/kg by 2031, which would make green hydrogen cost-competitive with grey hydrogen ($1-2/kg from steam methane reforming). This module examines electrolyzer stack design, system-level integration with renewable generation, and hydrogen infrastructure development.</p>

<h3>Electrolyzer Stack Engineering</h3>

<table class="technical-table">
<thead>
<tr><th>Parameter</th><th>Alkaline</th><th>PEM</th><th>Solid Oxide</th></tr>
</thead>
<tbody>
<tr><td>Cell voltage</td><td>1.8-2.4 V</td><td>1.8-2.2 V</td><td>1.0-1.5 V</td></tr>
<tr><td>Current density</td><td>0.2-0.4 A/cm²</td><td>1.0-3.0 A/cm²</td><td>0.3-1.0 A/cm²</td></tr>
<tr><td>Electrolyte</td><td>25-30% KOH</td><td>Nafion membrane</td><td>Yttria-stabilized zirconia</td></tr>
<tr><td>Catalyst</td><td>Nickel (anode + cathode)</td><td>Iridium (anode), Platinum (cathode)</td><td>Perovskite (anode), Ni-YSZ (cathode)</td></tr>
<tr><td>Output pressure</td><td>1-30 bar</td><td>30-80 bar</td><td>1-15 bar</td></tr>
<tr><td>Water quality</td><td>Standard deionized</td><td>Ultra-pure (>10 MΩ·cm)</td><td>Steam input</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-gh2-undergrad-q1">
<p>"PEM electrolyzers are gaining market share due to their fast dynamic response, compact footprint, and high-pressure output—ideal for coupling with variable renewable generation. However, their dependence on iridium and platinum catalysts presents a critical mineral supply chain risk."</p>
<cite>— IRENA, Green Hydrogen Cost Reduction: Scaling Up Electrolysers, 2023</cite>
</blockquote>

<h3>System Integration with Renewables</h3>
<ul>
<li><strong>Dedicated renewable:</strong> Electrolyzer co-located with solar/wind; capacity factor 20-45% depending on resource</li>
<li><strong>Grid-connected with PPAs:</strong> Draws from grid with renewable energy certificates; higher capacity factor (60-90%)</li>
<li><strong>Hybrid configuration:</strong> Dedicated renewable + grid backup; optimizes electrolyzer utilization and hydrogen cost</li>
<li><strong>Curtailment harvesting:</strong> Run electrolyzer only during curtailment events; very low electricity cost but low utilization</li>
</ul>

<h3>Levelized Cost of Hydrogen (LCOH)</h3>
<table class="technical-table">
<thead>
<tr><th>Configuration</th><th>Electricity Cost</th><th>LCOH ($/kg)</th><th>Key Assumption</th></tr>
</thead>
<tbody>
<tr><td>Grid + PEM (today)</td><td>$40-60/MWh</td><td>$4-7</td><td>50 kWh/kg, $1000/kW capex</td></tr>
<tr><td>Solar + PEM (today)</td><td>$20-30/MWh</td><td>$3-5</td><td>25% CF, $800/kW capex</td></tr>
<tr><td>Solar + PEM (2030)</td><td>$15-20/MWh</td><td>$1.5-3</td><td>30% CF, $300/kW capex</td></tr>
<tr><td>DOE H2 Shot target</td><td>$10-15/MWh</td><td>$1</td><td>Aggressive cost reduction</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Green hydrogen system design requires optimizing across electrolyzer technology, renewable resource quality, capacity factor, and downstream hydrogen logistics. The dominant cost driver is electricity (60-80% of LCOH), making the lowest-cost renewable resources—regions with combined solar + wind capacity factors above 40%—the most attractive locations. System-level engineering that co-optimizes renewable sizing, electrolyzer capacity, and hydrogen buffer storage can reduce LCOH by 20-30% compared to independently-sized components.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Hydrogen Infrastructure and Sector Coupling: Pipeline Systems, Storage, and Global Trade</h2>

<p>Scaling hydrogen beyond niche applications requires developing infrastructure for production, storage, transport, and end-use at continental scale. Graduate analysis examines hydrogen pipeline engineering, geological storage options, the emerging global hydrogen trade, and integrated energy system models that quantify hydrogen's optimal role across sectors.</p>

<h3>Hydrogen Pipeline Infrastructure</h3>

<table class="technical-table">
<thead>
<tr><th>Parameter</th><th>New H₂ Pipeline</th><th>Repurposed Gas Pipeline</th><th>Key Concern</th></tr>
</thead>
<tbody>
<tr><td>Material</td><td>API 5L X52/X60 (H₂ service)</td><td>Existing carbon steel</td><td>Hydrogen embrittlement risk</td></tr>
<tr><td>Operating pressure</td><td>70-100 bar</td><td>50-80 bar (derated)</td><td>Fracture toughness at high H₂%</td></tr>
<tr><td>Cost</td><td>$1-3M/mile</td><td>$0.3-0.8M/mile (retrofit)</td><td>Compressor station conversion</td></tr>
<tr><td>Capacity</td><td>1-10 GW equivalent</td><td>Variable (diameter dependent)</td><td>3x volume needed vs. natural gas per unit energy</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-gh2-grad-q1">
<p>"Repurposing existing natural gas pipelines for hydrogen transport could reduce infrastructure costs by 60-80% compared to new-build pipelines. However, material compatibility assessment—particularly hydrogen embrittlement of high-strength steels—requires case-by-case engineering evaluation."</p>
<cite>— European Hydrogen Backbone Initiative, Technical Assessment Report, 2023</cite>
</blockquote>

<h3>Geological Hydrogen Storage</h3>
<ul>
<li><strong>Salt caverns:</strong> Most mature option; operational in Texas and UK; low cushion gas requirement (25-30%); fast cycling</li>
<li><strong>Depleted gas reservoirs:</strong> Large capacity; higher cushion gas (50-60%); potential for microbial H₂ consumption</li>
<li><strong>Lined rock caverns:</strong> Man-made underground chambers; location-flexible; higher cost per unit volume</li>
<li><strong>Storage capacity:</strong> A single salt cavern (500,000 m³) stores ~5,000-10,000 tonnes H₂ (~170-340 GWh)</li>
</ul>

<h3>Sector Coupling and System Integration</h3>

<table class="technical-table">
<thead>
<tr><th>Sector</th><th>Hydrogen Application</th><th>Alternative</th><th>H₂ Advantage</th></tr>
</thead>
<tbody>
<tr><td>Heavy industry (steel)</td><td>DRI-EAF replacing blast furnace</td><td>Electrification (limited)</td><td>Drop-in reduction agent</td></tr>
<tr><td>Chemicals (ammonia)</td><td>Green ammonia via Haber-Bosch</td><td>Electrochemical (emerging)</td><td>Existing process, proven scale</td></tr>
<tr><td>Long-haul transport</td><td>Fuel cell trucks, ships, aircraft</td><td>Batteries (range-limited)</td><td>Energy density, refuel speed</td></tr>
<tr><td>Grid balancing</td><td>H₂ turbines for firm clean power</td><td>LDES batteries</td><td>Seasonal storage capability</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-gh2-grad-q2">
<p>"Integrated energy system models consistently find that hydrogen is essential for achieving net-zero emissions, but its optimal share varies dramatically—from 5% to 25% of final energy—depending on assumptions about electricity costs, electrification rates, and biomass availability. The 'hydrogen everywhere' narrative and the 'hydrogen nowhere' critique are both incorrect."</p>
<cite>— Joule, "The Role of Hydrogen in Energy System Decarbonization," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Hydrogen infrastructure research confronts a classic chicken-and-egg problem: production requires demand certainty, and demand requires supply assurance. The DOE hydrogen hubs program attempts to break this impasse by co-developing production, infrastructure, and end-use in regional clusters. Research priorities include materials science for hydrogen-compatible pipelines, underground storage characterization, and whole-system modeling that identifies the optimal hydrogen production locations, transport routes, and end-use applications for each regional context.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>High-efficiency electrolysis, hydrogen carriers, and global hydrogen trade systems.</p>' } }],
    activities: [{ id: 're-h2-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make Hydrogen!', MIDDLE_SCHOOL: 'Electrolyzer', HIGH_SCHOOL: 'Value Chain', UNDERGRADUATE: 'System Design', GRADUATE: 'Sector Analysis', PHD: 'Trade Modeling' }, description: { ELEMENTARY: 'Split water into hydrogen!', MIDDLE_SCHOOL: 'Run an electrolyzer.', HIGH_SCHOOL: 'Design a hydrogen value chain.', UNDERGRADUATE: 'Design a hydrogen system.', GRADUATE: 'Analyze sector coupling.', PHD: 'Model hydrogen trade.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-h2-game', type: 'simulation', title: 'Hydrogen Economy Builder', description: 'Build a clean hydrogen future!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-h2-quiz', passingScore: 80, questions: [{ id: 'rh2q1', question: { ELEMENTARY: 'How do we make green hydrogen?', MIDDLE_SCHOOL: 'What is an electrolyzer?', HIGH_SCHOOL: 'Why is storage a challenge?', UNDERGRADUATE: 'What is PEM electrolysis?', GRADUATE: 'What is sector coupling?', PHD: 'What are hydrogen carriers?' }, options: { ELEMENTARY: ['Split water with renewable electricity', 'From oil', 'From coal', 'It grows naturally'], MIDDLE_SCHOOL: ['Device that splits water using electricity', 'Electricity maker', 'Water heater', 'Battery'], HIGH_SCHOOL: ['Hydrogen is light and hard to store densely', 'Easy storage', 'No challenges', 'Heavy gas'], UNDERGRADUATE: ['Proton Exchange Membrane electrolysis', 'Power Energy Module', 'Perfect Energy Maker', 'No such thing'], GRADUATE: ['Connecting electricity, heat, and transport via hydrogen', 'Single sector', 'No coupling', 'Random connection'], PHD: ['Molecules that carry hydrogen more easily than pure H2', 'Hydrogen trucks', 'No carriers needed', 'Only pipelines'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green hydrogen is made by using wind or solar electricity to split water into hydrogen and oxygen!', MIDDLE_SCHOOL: 'An electrolyzer uses electricity to split water (H2O) into hydrogen (H2) and oxygen (O2).', HIGH_SCHOOL: 'Hydrogen has low density, requiring compression, liquefaction, or chemical bonding for practical storage.', UNDERGRADUATE: 'PEM electrolyzers use a solid polymer membrane and can respond quickly to variable renewable input.', GRADUATE: 'Sector coupling uses hydrogen to link electricity, heat, and transport for flexible clean energy systems.', PHD: 'Hydrogen carriers like ammonia or liquid organic carriers enable easier storage and transport.' } }, { id: 'rh2q12', question: { ELEMENTARY: 'What is green hydrogen?', MIDDLE_SCHOOL: 'How is green hydrogen different from gray hydrogen?', HIGH_SCHOOL: 'Can hydrogen replace natural gas in pipelines?', UNDERGRADUATE: 'What electrolyzer technologies are best suited for coupling with variable renewable energy?', GRADUATE: 'How do hydrogen valleys and industrial clusters create demand-side certainty?', PHD: 'What are the land and water resource requirements for large-scale green hydrogen production?' }, options: { ELEMENTARY: ['Hydrogen made using renewable electricity', 'Hydrogen painted green', 'A new type of plant', 'Green-colored gas'], MIDDLE_SCHOOL: ['Green uses renewable electricity; gray uses fossil fuels', 'No difference', 'Green is more polluting', 'Gray is cleaner'], HIGH_SCHOOL: ['Partially - some blending is possible but full replacement needs pipeline upgrades', 'Yes, no changes needed', 'No, completely incompatible', 'Only in new pipelines'], UNDERGRADUATE: ['PEM excels at dynamic operation; SOEC offers highest efficiency with waste heat integration', 'Only alkaline works', 'All are identical', 'None can follow renewables'], GRADUATE: ['Co-locating production with industrial offtakers (steel, ammonia, refining) provides bankable demand contracts', 'Demand certainty is not needed', 'Only export markets matter', 'Clusters slow development'], PHD: ['1 GW electrolyzer needs ~4 GW renewables, 3000+ hectares of solar/wind land, and 9+ ML/day of purified water', 'No land needed', 'Only water matters', 'Same as a gas plant'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green hydrogen is hydrogen gas made by splitting water using electricity from renewable sources like solar and wind - completely clean!', MIDDLE_SCHOOL: 'Green hydrogen uses renewable electricity for electrolysis (zero emissions). Gray hydrogen comes from steam methane reforming of natural gas, producing ~10 tons of CO2 per ton of hydrogen.', HIGH_SCHOOL: 'Hydrogen can be blended up to 5-20% by volume in existing gas pipelines with minimal modifications. Full hydrogen requires upgraded pipeline materials (to prevent embrittlement), compressors, and end-use equipment.', UNDERGRADUATE: 'PEM electrolyzers offer millisecond response times ideal for direct renewable coupling. SOEC achieves 90%+ efficiency when integrated with industrial waste heat. Alkaline is lowest cost but slower to ramp.', GRADUATE: 'Hydrogen valleys co-locate renewable generation, electrolyzers, and industrial demand (steel, ammonia, refining) with shared infrastructure, providing bankable offtake contracts that de-risk investment and accelerate scale.', PHD: '1 GW of electrolysis requires ~4 GW of dedicated renewables (at 25% CF), 3,000+ hectares of solar/wind area, and 9+ million liters/day of purified water, making siting, water sourcing, and land-use planning critical at scale.' } }] },
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
    lessons: [{ id: 're-pol-1', title: 'Rules for Clean Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Helpful Rules!</h2><p>Governments make rules to help people build more wind turbines and solar panels!</p>', MIDDLE_SCHOOL: '<h2>Energy Policies</h2><p>Tax credits, renewable requirements, and net metering are policies that help clean energy grow.</p>', HIGH_SCHOOL: '<h2>Policy Instruments</h2><p>Renewable portfolio standards, feed-in tariffs, auction systems, and tax incentives each work differently.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Energy Policy and Regulation: Institutional Frameworks, Market Design, and Clean Energy Law</h2>

<p>The U.S. energy regulatory system is a complex layered structure spanning federal, state, and local jurisdictions. Understanding how FERC, state public utility commissions, and grid operators interact is essential for anyone working in clean energy—because regulatory decisions determine which projects get built, how they are compensated, and who bears the costs and benefits of the energy transition.</p>

<h3>U.S. Energy Regulatory Structure</h3>

<table class="technical-table">
<thead>
<tr><th>Entity</th><th>Jurisdiction</th><th>Key Functions</th><th>Clean Energy Impact</th></tr>
</thead>
<tbody>
<tr><td>FERC</td><td>Interstate wholesale markets</td><td>Market rules, transmission, interconnection</td><td>Order 2222 (DER), Order 2023 (interconnection)</td></tr>
<tr><td>State PUCs</td><td>Retail rates, utility operations</td><td>Rate cases, resource planning, net metering</td><td>IRP requirements, RPS enforcement</td></tr>
<tr><td>RTOs/ISOs</td><td>Wholesale market operations</td><td>Dispatch, reliability, capacity markets</td><td>Renewable integration, storage rules</td></tr>
<tr><td>EPA</td><td>Environmental standards</td><td>Emissions rules, permitting</td><td>Clean Power Plan successor, methane rules</td></tr>
<tr><td>DOE</td><td>R&D, national labs</td><td>Technology programs, grid resilience</td><td>LPO, GRIP grants, hydrogen hubs</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-pol-undergrad-q1">
<p>"The speed of the energy transition is increasingly constrained not by technology costs but by institutional capacity—interconnection queue processing, permitting timelines, and regulatory proceeding cycles. Accelerating clean energy deployment requires modernizing these institutional processes alongside the technologies themselves."</p>
<cite>— Lawrence Berkeley National Laboratory, Queued Up: Characteristics of Power Plants Seeking Transmission Interconnection, 2023</cite>
</blockquote>

<h3>Key Federal Clean Energy Policies</h3>
<ul>
<li><strong>Inflation Reduction Act (2022):</strong> $370B+ in clean energy tax credits; 10-year production and investment tax credits; technology-neutral clean electricity PTC</li>
<li><strong>Bipartisan Infrastructure Law:</strong> $65B for grid infrastructure, $7.5B for EV charging, $7B for hydrogen hubs</li>
<li><strong>PURPA (1978, reformed):</strong> Requires utilities to purchase from qualifying facilities; foundational policy for distributed generation</li>
<li><strong>Clean Air Act:</strong> EPA authority to regulate power plant emissions; basis for GHG regulations</li>
</ul>

<h3>State-Level Policy Tools</h3>
<table class="technical-table">
<thead>
<tr><th>Policy</th><th>States with Policy</th><th>Mechanism</th><th>Impact</th></tr>
</thead>
<tbody>
<tr><td>Renewable Portfolio Standard</td><td>30+ states + DC</td><td>Mandate % renewable by target year</td><td>Primary driver of utility RE procurement</td></tr>
<tr><td>Clean Energy Standard</td><td>NY, WA, others</td><td>Includes nuclear, CCS</td><td>Broader technology eligibility</td></tr>
<tr><td>Carbon pricing</td><td>RGGI (12 states), WCI (CA, WA)</td><td>Cap-and-trade or carbon tax</td><td>$5-30/tonne CO₂</td></tr>
<tr><td>Community solar</td><td>43 states</td><td>Virtual net metering, shared solar</td><td>Expands solar access</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Clean energy engineers must understand the regulatory environment as a design constraint. Interconnection timelines (currently 4-5 years on average), permitting requirements, rate structures, and market rules fundamentally shape which projects are viable and where. The IRA has transformed project economics, but the binding constraints have shifted to permitting, transmission, and interconnection—institutional bottlenecks that require policy reform alongside technological progress.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Energy Policy Analysis: Instrument Design, Political Economy, and Comparative Effectiveness</h2>

<p>Energy policy analysis requires rigorous evaluation frameworks that go beyond simple deployment metrics to assess cost-effectiveness, distributional impacts, innovation effects, and unintended consequences. Graduate analysis examines policy instrument design theory, comparative analysis of climate policy approaches, and the political economy factors that determine which policies succeed.</p>

<h3>Policy Instrument Comparison</h3>

<table class="technical-table">
<thead>
<tr><th>Instrument</th><th>Efficiency</th><th>Distributional Impact</th><th>Political Feasibility</th><th>Innovation Signal</th></tr>
</thead>
<tbody>
<tr><td>Carbon tax</td><td>High (least-cost abatement)</td><td>Regressive without revenue recycling</td><td>Low (visible price increase)</td><td>Strong, technology-neutral</td></tr>
<tr><td>Cap-and-trade</td><td>High (with well-designed cap)</td><td>Depends on allowance allocation</td><td>Moderate (market-based)</td><td>Strong, market-driven</td></tr>
<tr><td>RPS/CES</td><td>Moderate (not least-cost)</td><td>Hidden in electricity rates</td><td>High (proven track record)</td><td>Moderate, technology-specific</td></tr>
<tr><td>Tax credits (IRA)</td><td>Variable (generous credits)</td><td>Progressive if transferable</td><td>High (no visible cost)</td><td>Strong for eligible technologies</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-pol-grad-q1">
<p>"The IRA represents a fundamental shift in U.S. climate policy strategy—from regulation and pricing to industrial policy and subsidies. While economists generally prefer pricing instruments for efficiency, the political economy evidence suggests that subsidy-based approaches may achieve faster deployment because they create constituencies for continued policy support."</p>
<cite>— Brookings Institution, "The Political Economy of the Inflation Reduction Act," 2023</cite>
</blockquote>

<h3>Interconnection Reform</h3>
<ul>
<li><strong>Queue crisis:</strong> 2,000+ GW in U.S. interconnection queues with 5-year average processing time; 80% of projects withdraw</li>
<li><strong>FERC Order 2023:</strong> Cluster study process, financial commitment requirements, affected system studies reform</li>
<li><strong>First-ready, first-served:</strong> Alternative to first-come queue; projects demonstrating readiness advance faster</li>
<li><strong>Grid-enhancing technologies:</strong> Dynamic line rating, topology optimization, and advanced power flow control can unlock existing capacity</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-pol-grad-q2">
<p>"The interconnection queue has become the primary bottleneck for clean energy deployment in the United States. Resolving this requires not just procedural reform but fundamental changes to transmission planning, cost allocation, and the relationship between generation development and transmission expansion."</p>
<cite>— LBNL, Interconnection Queue Trends and Analysis, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Energy policy research increasingly emphasizes implementation science—understanding why policies succeed or fail in practice rather than just in theory. Key questions include: How do policy design details (phase-in schedules, compliance flexibility, enforcement mechanisms) affect outcomes? What institutional capacity is needed to implement ambitious clean energy policies? And how can policy design anticipate and mitigate unintended consequences like interconnection queue congestion or supply chain bottlenecks?</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Policy process analysis, interest group dynamics, and designing effective energy transitions.</p>' } }],
    activities: [{ id: 're-pol-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Make Good Rules!', MIDDLE_SCHOOL: 'Policy Choice', HIGH_SCHOOL: 'Instrument Design', UNDERGRADUATE: 'Regulatory Analysis', GRADUATE: 'Policy Evaluation', PHD: 'Process Analysis' }, description: { ELEMENTARY: 'Create rules to help clean energy!', MIDDLE_SCHOOL: 'Choose policies to boost renewables.', HIGH_SCHOOL: 'Design a policy instrument.', UNDERGRADUATE: 'Analyze regulatory structures.', GRADUATE: 'Evaluate policy effectiveness.', PHD: 'Analyze policy processes.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 're-pol-game', type: 'simulation', title: 'Energy Policy Maker', description: 'Design policies for clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-pol-quiz', passingScore: 80, questions: [{ id: 'rpolq1', question: { ELEMENTARY: 'What do energy rules do?', MIDDLE_SCHOOL: 'What is a tax credit?', HIGH_SCHOOL: 'What is a renewable portfolio standard?', UNDERGRADUATE: 'What does a utility commission do?', GRADUATE: 'How do you evaluate policy?', PHD: 'What is policy process analysis?' }, options: { ELEMENTARY: ['Help clean energy grow', 'Stop all energy', 'Nothing', 'Make energy expensive'], MIDDLE_SCHOOL: ['Reduces taxes for clean energy', 'Increases taxes', 'No effect on taxes', 'Only for oil'], HIGH_SCHOOL: ['Requires utilities to get percent of power from renewables', 'Random requirements', 'No requirements', 'Only suggestions'], UNDERGRADUATE: ['Regulates utility rates and operations', 'Nothing', 'Only builds power plants', 'Makes electricity'], GRADUATE: ['Measure outcomes against goals and costs', 'Assume it works', 'No evaluation needed', 'Random assessment'], PHD: ['Studying how policies are made and changed', 'Only outcomes', 'No process matters', 'Random politics'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy rules help people build more wind turbines and solar panels!', MIDDLE_SCHOOL: 'Tax credits reduce the taxes people pay when they invest in clean energy.', HIGH_SCHOOL: 'RPS requires utilities to source a percentage of electricity from renewable sources.', UNDERGRADUATE: 'Utility commissions regulate rates, approve investments, and oversee utility operations.', GRADUATE: 'Policy evaluation compares outcomes to goals, assesses cost-effectiveness, and identifies improvements.', PHD: 'Policy process analysis examines how interests, institutions, and ideas shape policy outcomes.' } }, { id: 'rpolq2', question: { ELEMENTARY: 'What are energy policies?', MIDDLE_SCHOOL: 'How do renewable portfolio standards work?', HIGH_SCHOOL: 'What is carbon pricing?', UNDERGRADUATE: 'How do wholesale electricity market designs accommodate high renewable penetration?', GRADUATE: 'What policy instruments most effectively drive clean energy innovation vs deployment?', PHD: 'How do international climate agreements translate into national energy policy implementation?' }, options: { ELEMENTARY: ['Rules governments make about how we produce and use energy', 'Only for politicians', 'A type of energy', 'Rules about food'], MIDDLE_SCHOOL: ['They require utilities to get a percentage of electricity from renewable sources', 'They set renewable prices', 'Only apply to solar', 'They reduce electricity use'], HIGH_SCHOOL: ['Making companies pay for the carbon pollution they create', 'The price of carbon fiber', 'A type of tax refund', 'Pricing coal by weight'], UNDERGRADUATE: ['Redesigned capacity markets, flexible ramping products, and sub-hourly dispatch accommodate variability', 'Markets need no changes', 'Only fixed prices work', 'Renewables cannot participate'], GRADUATE: ['RD&D funding drives innovation; deployment incentives (PTC/ITC) drive cost reduction through learning', 'Only one instrument needed', 'Policy does not affect innovation', 'Market forces alone suffice'], PHD: ['Paris Agreement NDCs set national targets; domestic legislation implements through carbon pricing, standards, and incentives', 'Agreements are not binding', 'Only UN enforces policy', 'National policy is independent'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy policies are rules and plans that governments make about how energy is produced, distributed, and used - shaping our clean energy future.', MIDDLE_SCHOOL: 'Renewable portfolio standards require electricity suppliers to obtain a minimum percentage of their power from renewable sources, increasing over time (e.g., 50% by 2030, 100% by 2045).', HIGH_SCHOOL: 'Carbon pricing puts a cost on CO2 emissions through either a carbon tax (fixed price per ton) or cap-and-trade (emission allowances traded in a market), incentivizing emission reductions.', UNDERGRADUATE: 'High-renewable wholesale markets require redesigned capacity products valuing flexibility, fast-ramping ancillary services for inverter-based resources, sub-hourly dispatch intervals, and negative pricing provisions.', GRADUATE: 'R&D funding and demonstration programs drive early-stage innovation (push), while deployment incentives (PTC, ITC, RPS) drive learning-by-doing cost reduction (pull). Effective policy combines both across the innovation lifecycle.', PHD: 'Paris Agreement NDCs establish national emission reduction commitments that are implemented through domestic energy legislation including carbon pricing, renewable mandates, efficiency standards, and clean energy investment incentives.' } }] },
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
    lessons: [{ id: 're-access-1', title: 'Energy for All', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Everyone Needs Energy!</h2><p>Everyone should be able to turn on lights, cook food, and stay warm - thats energy access!</p>', MIDDLE_SCHOOL: '<h2>Energy Poverty</h2><p>Billions of people lack electricity or clean cooking fuels. This affects health, education, and economic opportunity.</p>', HIGH_SCHOOL: '<h2>Access Solutions</h2><p>Mini-grids, solar home systems, and clean cookstoves bring energy to underserved communities.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Energy Access and Equity: Global Frameworks, Delivery Models, and Environmental Justice</h2>

<p>Approximately 675 million people lack access to electricity, and 2.3 billion cook with polluting fuels, according to the IEA. In the U.S., low-income households spend 8-10% of income on energy compared to 3% for median-income households—an energy burden that perpetuates poverty and inequality. Understanding energy access models, environmental justice frameworks, and equitable transition strategies is essential for designing inclusive clean energy systems.</p>

<h3>Global Energy Access Models</h3>

<table class="technical-table">
<thead>
<tr><th>Model</th><th>Technology</th><th>Cost per Connection</th><th>Strengths</th><th>Limitations</th></tr>
</thead>
<tbody>
<tr><td>Grid extension</td><td>Central generation + T&D</td><td>$1,000-3,000</td><td>Reliable, high capacity</td><td>Slow rollout, high fixed cost</td></tr>
<tr><td>Mini-grid</td><td>Solar + battery + distribution</td><td>$500-1,500</td><td>Faster deployment, scalable</td><td>Tariff sustainability, management</td></tr>
<tr><td>Solar home system</td><td>Panel + battery + lights/phone</td><td>$100-500</td><td>Immediate, PAYG financing</td><td>Limited capacity (Tier 1-2)</td></tr>
<tr><td>Productive use</td><td>Solar irrigation, milling, cold chain</td><td>$500-5,000</td><td>Income generation enables payback</td><td>Requires business model support</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-access-undergrad-q1">
<p>"Achieving SDG 7—universal energy access by 2030—requires tripling annual investment to $40 billion per year and deploying mini-grids and solar home systems at 10x current rates. The technology exists; the challenge is financing, governance, and last-mile delivery."</p>
<cite>— IEA / World Bank, Tracking SDG 7: The Energy Progress Report, 2023</cite>
</blockquote>

<h3>U.S. Energy Justice Framework</h3>
<ul>
<li><strong>Distributional justice:</strong> Fair allocation of energy costs and benefits across communities; energy burden reduction</li>
<li><strong>Procedural justice:</strong> Meaningful participation of affected communities in energy decision-making</li>
<li><strong>Recognition justice:</strong> Acknowledging historical harms from pollution and energy system inequities</li>
<li><strong>Restorative justice:</strong> Remedying past harms through targeted investment and community benefit agreements</li>
</ul>

<h3>Federal Equity Programs</h3>
<table class="technical-table">
<thead>
<tr><th>Program</th><th>Funding</th><th>Target</th><th>Mechanism</th></tr>
</thead>
<tbody>
<tr><td>Justice40 Initiative</td><td>40% of federal investment</td><td>Disadvantaged communities</td><td>CEJST screening tool</td></tr>
<tr><td>IRA Residential Credits</td><td>$4,000 used EV, $8,000 HP</td><td>LMI households</td><td>Income-qualified rebates</td></tr>
<tr><td>LIHEAP / WAP</td><td>$4B/year</td><td>Low-income households</td><td>Weatherization + bill assistance</td></tr>
<tr><td>EPA Environmental Justice Grants</td><td>$3B (IRA)</td><td>EJ communities</td><td>Community-led projects</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Equitable clean energy engineering requires centering community needs in system design. This means designing solar and storage systems optimized for energy burden reduction rather than maximum generation, engaging communities as partners in project development, and measuring success not just in MWh deployed but in household energy burden reduction, local job creation, and pollution reduction in frontline communities.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced Energy Justice: Theoretical Frameworks, Empirical Evidence, and Just Transition Design</h2>

<p>Energy justice has evolved from an advocacy concept to an analytical framework with growing empirical rigor. Graduate analysis examines energy justice theory, measurement methodologies, the distributional impacts of clean energy policies, and just transition strategies for fossil fuel-dependent communities and workers.</p>

<h3>Energy Justice Analytical Framework</h3>

<table class="technical-table">
<thead>
<tr><th>Justice Dimension</th><th>Key Question</th><th>Measurement Approach</th><th>Policy Response</th></tr>
</thead>
<tbody>
<tr><td>Distributional</td><td>Who bears costs and receives benefits?</td><td>Spatial analysis of pollution, costs, benefits</td><td>Targeted investment, rate reform</td></tr>
<tr><td>Procedural</td><td>Who participates in decisions?</td><td>Representation analysis, engagement metrics</td><td>Community benefit agreements</td></tr>
<tr><td>Recognition</td><td>Whose knowledge and experience counts?</td><td>Qualitative research, lived experience</td><td>Indigenous sovereignty, community leadership</td></tr>
<tr><td>Restorative</td><td>How are past harms remedied?</td><td>Cumulative impact assessment</td><td>Reparative investment, cleanup</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-access-grad-q1">
<p>"Empirical analysis of U.S. clean energy tax credits reveals that benefits have disproportionately flowed to higher-income, whiter communities. The IRA's low-income bonus credits and direct pay provisions represent a significant design innovation aimed at correcting this pattern."</p>
<cite>— Nature Energy, "Distributional Impacts of U.S. Clean Energy Policy," 2023</cite>
</blockquote>

<h3>Just Transition for Fossil Fuel Communities</h3>
<ul>
<li><strong>Economic diversification:</strong> Attracting clean energy manufacturing, tech, and service industries to coal-dependent regions</li>
<li><strong>Worker transition:</strong> Retraining programs, early retirement packages, wage insurance for displaced fossil fuel workers</li>
<li><strong>Community investment:</strong> IRA energy community bonus credit (+10% ITC/PTC) for projects in coal closure communities</li>
<li><strong>Tax revenue replacement:</strong> Clean energy PILOT (payment in lieu of taxes) agreements for local governments losing fossil fuel tax base</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-access-grad-q2">
<p>"Just transition is not just about displaced workers—it is about entire communities whose economic, social, and cultural identities are intertwined with fossil fuel industries. Effective transition requires place-based strategies developed with, not for, affected communities."</p>
<cite>— Resources for the Future, "Just Transition: A Framework for Change," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Energy justice research is moving from conceptual frameworks to empirical measurement—using geospatial analysis, econometric methods, and community-based participatory research to quantify who benefits from and who is burdened by energy system transitions. Key frontiers include developing composite energy justice metrics, evaluating the effectiveness of Justice40 implementation, and understanding how procedural justice in energy decision-making affects distributional outcomes.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Multi-dimensional energy poverty, leapfrogging, and socio-technical transitions.</p>' } }],
    activities: [{ id: 're-access-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Light Every Home!', MIDDLE_SCHOOL: 'Access Planning', HIGH_SCHOOL: 'Solution Design', UNDERGRADUATE: 'Model Analysis', GRADUATE: 'Justice Framework', PHD: 'Pathway Analysis' }, description: { ELEMENTARY: 'Bring energy to everyone!', MIDDLE_SCHOOL: 'Plan energy access expansion.', HIGH_SCHOOL: 'Design an access solution.', UNDERGRADUATE: 'Analyze delivery models.', GRADUATE: 'Apply energy justice frameworks.', PHD: 'Analyze access pathways.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 're-access-game', type: 'simulation', title: 'Energy Access Champion', description: 'Bring clean energy to all communities!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-access-quiz', passingScore: 80, questions: [{ id: 'raccessq1', question: { ELEMENTARY: 'What is energy access?', MIDDLE_SCHOOL: 'What is energy poverty?', HIGH_SCHOOL: 'What is a mini-grid?', UNDERGRADUATE: 'What is pay-as-you-go?', GRADUATE: 'What is procedural justice?', PHD: 'What is energy leapfrogging?' }, options: { ELEMENTARY: ['Everyone having electricity and clean cooking', 'Only rich people having power', 'No energy anywhere', 'Energy passwords'], MIDDLE_SCHOOL: ['Lacking adequate energy for basic needs', 'Having too much energy', 'Energy being free', 'No poverty exists'], HIGH_SCHOOL: ['Small local grid serving a community', 'Tiny grid for one house', 'National grid', 'No grid'], UNDERGRADUATE: ['Paying for energy services incrementally', 'Paying all at once', 'Free energy', 'No payment'], GRADUATE: ['Fair participation in energy decision-making', 'Only outcomes matter', 'No procedures', 'Random decisions'], PHD: ['Skipping fossil fuels straight to renewables', 'Following the same path', 'Jumping over energy', 'No development'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Energy access means everyone can turn on lights, cook safely, and stay comfortable!', MIDDLE_SCHOOL: 'Energy poverty means not having enough electricity or clean cooking fuel for basic needs.', HIGH_SCHOOL: 'Mini-grids are small local electricity networks, often solar-powered, serving off-grid communities.', UNDERGRADUATE: 'Pay-as-you-go lets customers pay small amounts via mobile money for solar home system services.', GRADUATE: 'Procedural justice ensures fair participation in energy planning and decision-making processes.', PHD: 'Leapfrogging means developing countries adopting renewables directly, skipping fossil fuel stages.' } }, { id: 'raccessq2', question: { ELEMENTARY: 'Does everyone in the world have electricity?', MIDDLE_SCHOOL: 'What is energy poverty?', HIGH_SCHOOL: 'How do mini-grids bring power to remote communities?', UNDERGRADUATE: 'What business models sustain rural electrification beyond initial donor funding?', GRADUATE: 'How do gender-responsive energy programs improve development outcomes?', PHD: 'What are the just transition frameworks for communities dependent on fossil fuel employment?' }, options: { ELEMENTARY: ['No, about 700 million people lack electricity', 'Yes, everyone has electricity', 'Only in Africa', 'Only a few people'], MIDDLE_SCHOOL: ['When people cant afford enough energy for basic needs', 'Having too much energy', 'Only about gasoline', 'A type of power plant'], HIGH_SCHOOL: ['Solar panels, batteries, and a local network provide reliable power without long transmission lines', 'Only by extending the main grid', 'Mini-grids dont work', 'Only diesel generators'], UNDERGRADUATE: ['Pay-as-you-go, productive use development, and anchor loads create financially sustainable mini-grid operations', 'Donor funding forever', 'Free electricity for all', 'Only government can operate'], GRADUATE: ['Women-focused energy access reduces indoor air pollution deaths, frees time for education, and enables enterprise', 'Gender is not relevant to energy', 'Only men benefit', 'No measurable impact'], PHD: ['Retraining, economic diversification, pension bridges, and community investment ensure equitable transition', 'Just stop fossil fuels immediately', 'Workers should find new jobs alone', 'No framework needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'No - about 700 million people worldwide still lack access to electricity, mostly in sub-Saharan Africa and South Asia.', MIDDLE_SCHOOL: 'Energy poverty means not having access to affordable, reliable energy for basic needs like lighting, cooking, heating, and powering essential devices.', HIGH_SCHOOL: 'Mini-grids combine solar panels, batteries, and a local distribution network to provide reliable electricity to remote communities without the cost of extending long-distance transmission infrastructure.', UNDERGRADUATE: 'Sustainable mini-grid business models combine pay-as-you-go (PAYGO) mobile payment, productive use development (milling, cold storage, irrigation), anchor load contracts (telecom towers), and tiered tariff structures.', GRADUATE: 'Gender-responsive energy programs reduce indoor air pollution mortality (disproportionately affecting women/children), free 2-4 hours daily from fuel collection for education/enterprise, and enable women-led businesses through productive use appliances.', PHD: 'Just transition frameworks provide fossil fuel workers with retraining programs, economic diversification investment, pension/wage bridges, community benefit agreements, and proactive planning to ensure equitable distribution of transition costs and benefits.' } }] },
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
    lessons: [{ id: 're-fin-1', title: 'Money for Clean Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Building Clean Energy!</h2><p>Wind farms and solar plants cost money to build. Banks and investors provide money to build them!</p>', MIDDLE_SCHOOL: '<h2>Energy Finance</h2><p>Clean energy projects need investors who expect to earn returns from selling electricity.</p>', HIGH_SCHOOL: '<h2>Finance Basics</h2><p>Project finance, equity, debt, and power purchase agreements structure clean energy investments.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Advanced Clean Energy Finance: Capital Markets, Risk Management, and Emerging Instruments</h2>

<p>The clean energy sector attracted $1.8 trillion in global investment in 2023, exceeding fossil fuel investment for the first time. Understanding the capital markets infrastructure—from project finance to securitization to carbon markets—is essential for scaling deployment to meet climate targets. This module examines advanced financial structures that mobilize institutional capital for clean energy at scale.</p>

<h3>Capital Stack Optimization</h3>

<table class="technical-table">
<thead>
<tr><th>Capital Source</th><th>Cost of Capital</th><th>Risk Appetite</th><th>Clean Energy Role</th></tr>
</thead>
<tbody>
<tr><td>Commercial bank debt</td><td>5-7%</td><td>Low (investment grade)</td><td>Construction and term loans</td></tr>
<tr><td>Tax equity</td><td>6-8% after-tax</td><td>Low-moderate</td><td>Monetize ITC/PTC</td></tr>
<tr><td>Infrastructure funds</td><td>8-12%</td><td>Moderate</td><td>Operating asset acquisition</td></tr>
<tr><td>Green bonds</td><td>4-6%</td><td>Low</td><td>Refinancing operational portfolios</td></tr>
<tr><td>Venture capital</td><td>20-30%</td><td>High</td><td>Technology development stage</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-fin2-undergrad-q1">
<p>"The IRA's transferability provision is creating a new $50+ billion annual market for clean energy tax credits. By allowing credits to be sold for cash, it eliminates the complex partnership structures that previously limited the investor base and added 2-5% in transaction costs."</p>
<cite>— Wood Mackenzie, U.S. Clean Energy Tax Credit Market Outlook, 2024</cite>
</blockquote>

<h3>Key Financial Metrics</h3>
<ul>
<li><strong>WACC:</strong> Weighted average cost of capital; 5-8% for contracted renewable projects in developed markets</li>
<li><strong>DSCR:</strong> Debt service coverage ratio; lenders typically require 1.3-1.5x minimum DSCR</li>
<li><strong>IRR:</strong> Levered sponsor IRR targets of 10-15% for renewable projects</li>
<li><strong>P50/P90 production:</strong> Probability-weighted energy estimates; debt sizing typically based on P90</li>
</ul>

<h3>Carbon Credit Markets</h3>
<table class="technical-table">
<thead>
<tr><th>Market Type</th><th>Price Range</th><th>Volume (2023)</th><th>Key Standard</th></tr>
</thead>
<tbody>
<tr><td>EU ETS (compliance)</td><td>$60-100/tonne</td><td>1.4 Gt CO₂</td><td>EU regulation</td></tr>
<tr><td>California cap-and-trade</td><td>$30-35/tonne</td><td>300 Mt CO₂</td><td>ARB regulation</td></tr>
<tr><td>Voluntary carbon market</td><td>$5-50/tonne</td><td>150 Mt CO₂</td><td>Verra, Gold Standard, ACR</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Clean energy finance is increasingly the binding constraint on deployment speed. Engineers who understand financial metrics—LCOE sensitivities, DSCR requirements, P90 production thresholds—can design projects that are not just technically optimal but also financeable. The convergence of declining technology costs, favorable policy (IRA), and growing institutional capital appetite is creating a historic opportunity for clean energy scaling.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Sustainable Finance and Climate Risk: ESG Integration, Disclosure, and Financial System Alignment</h2>

<p>The financial sector is increasingly integrating climate risk into investment decisions, regulatory frameworks, and reporting standards. Graduate analysis examines climate-related financial disclosure, transition risk modeling, the effectiveness of ESG integration in driving decarbonization outcomes, and the emerging regulatory landscape for sustainable finance.</p>

<h3>Climate-Related Financial Disclosure</h3>

<table class="technical-table">
<thead>
<tr><th>Framework</th><th>Scope</th><th>Key Requirements</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>TCFD</td><td>Voluntary (becoming mandatory)</td><td>Governance, strategy, risk, metrics</td><td>4,000+ supporters globally</td></tr>
<tr><td>SEC Climate Rule</td><td>U.S. public companies</td><td>Scope 1, 2 emissions; material Scope 3</td><td>Final rule, phased implementation</td></tr>
<tr><td>EU CSRD</td><td>Large EU companies</td><td>Double materiality (financial + impact)</td><td>Phased in 2024-2028</td></tr>
<tr><td>ISSB (IFRS S1/S2)</td><td>Global baseline</td><td>Climate and general sustainability</td><td>Adopted by multiple jurisdictions</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-fin2-grad-q1">
<p>"Climate disclosure mandates are transforming clean energy investment from a values-based choice to a risk-management imperative. As companies face requirements to report emissions and transition plans, the financial case for clean energy investment becomes increasingly integrated into core business strategy."</p>
<cite>— Bank of England, Climate-Related Financial Risk: Regulatory Expectations, 2023</cite>
</blockquote>

<h3>Transition Risk Analysis</h3>
<ul>
<li><strong>Stranded asset risk:</strong> $1-4 trillion in fossil fuel assets potentially stranded under net-zero scenarios</li>
<li><strong>Carbon price scenarios:</strong> NGFS scenarios model carbon prices of $50-250/tonne by 2030 depending on policy ambition</li>
<li><strong>Physical risk:</strong> Climate damage to energy infrastructure; wildfires, hurricanes, extreme heat affecting generation and T&D</li>
<li><strong>Litigation risk:</strong> Growing legal liability for climate-related damages and greenwashing claims</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-fin2-grad-q2">
<p>"Net-zero investment frameworks require portfolio-level alignment metrics that go beyond simple exclusion or ESG scores. The Paris Aligned Investment Initiative and Science Based Targets initiative provide methodologies for assessing whether investment portfolios are aligned with 1.5°C pathways."</p>
<cite>— Climate Policy Initiative, Global Landscape of Climate Finance, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Sustainable finance research examines the causal mechanisms linking financial sector action to real-economy decarbonization. Key questions include: Does ESG integration actually reduce emissions or merely reallocate them between portfolios? How should climate scenario analysis incorporate tipping points and tail risks? And what financial system reforms—from central bank mandates to fiduciary duty definitions—are needed to align capital allocation with climate stability?</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Transition finance, climate risk modeling, and financial system transformation.</p>' } }],
    activities: [{ id: 're-fin-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fund a Solar Farm!', MIDDLE_SCHOOL: 'Investment Plan', HIGH_SCHOOL: 'Deal Structure', UNDERGRADUATE: 'Financial Model', GRADUATE: 'Portfolio Analysis', PHD: 'System Transformation' }, description: { ELEMENTARY: 'Get money to build solar!', MIDDLE_SCHOOL: 'Plan a clean energy investment.', HIGH_SCHOOL: 'Structure a project deal.', UNDERGRADUATE: 'Build a financial model.', GRADUATE: 'Analyze sustainable portfolios.', PHD: 'Model financial system change.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-fin-game', type: 'simulation', title: 'Clean Energy Investor', description: 'Finance the clean energy transition!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-fin-quiz', passingScore: 80, questions: [{ id: 'rfinq1', question: { ELEMENTARY: 'Who pays to build wind farms?', MIDDLE_SCHOOL: 'What do investors want?', HIGH_SCHOOL: 'What is a green bond?', UNDERGRADUATE: 'What is tax equity?', GRADUATE: 'What is ESG investing?', PHD: 'What are stranded assets in finance?' }, options: { ELEMENTARY: ['Banks and investors', 'Nobody', 'The wind', 'Free to build'], MIDDLE_SCHOOL: ['Returns from selling electricity', 'Nothing', 'Just helping', 'Free energy'], HIGH_SCHOOL: ['Bond financing specifically for green projects', 'Green colored money', 'Plant bonds', 'No such thing'], UNDERGRADUATE: ['Investment that monetizes tax credits', 'Tax on equity', 'Equity taxes', 'No taxes'], GRADUATE: ['Investing considering environmental, social, governance factors', 'Only profit', 'No standards', 'Random investing'], PHD: ['Fossil fuel assets losing value due to transition', 'Strong assets', 'Growing assets', 'No such thing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Banks and investors provide money to build wind farms and solar plants!', MIDDLE_SCHOOL: 'Investors put money into clean energy expecting to earn returns when electricity is sold.', HIGH_SCHOOL: 'Green bonds raise money specifically for environmental projects like renewable energy.', UNDERGRADUATE: 'Tax equity allows investors to monetize renewable energy tax credits they can use.', GRADUATE: 'ESG investing considers environmental, social, and governance factors alongside financial returns.', PHD: 'Stranded assets are fossil fuel investments that may lose value as the energy transition accelerates.' } }, { id: 'rfinq12', question: { ELEMENTARY: 'What is a green bank?', MIDDLE_SCHOOL: 'How do carbon markets work?', HIGH_SCHOOL: 'What is blended finance?', UNDERGRADUATE: 'How do tax equity partnership structures monetize clean energy tax credits?', GRADUATE: 'What financial innovations are reducing the cost of capital for renewable projects in emerging markets?', PHD: 'How do climate risk disclosure frameworks affect clean energy investment flows?' }, options: { ELEMENTARY: ['A bank that funds clean energy and environmental projects', 'A bank painted green', 'A forest bank', 'A recycling center'], MIDDLE_SCHOOL: ['Companies buy and sell permits to emit CO2', 'Markets that sell green products', 'Only governments trade', 'Carbon cannot be traded'], HIGH_SCHOOL: ['Combining public and private money to fund clean energy where private investment alone wont go', 'Mixing different currencies', 'Only public funding', 'Only private money'], UNDERGRADUATE: ['Investors contribute capital in exchange for tax benefits; developers retain cash flow after flip', 'Tax equity is not used', 'Only banks provide equity', 'Credits cannot be monetized'], GRADUATE: ['Green bonds, DFI first-loss guarantees, currency hedging facilities, and standardized contracts reduce perceived risk', 'No innovations exist', 'Only grants work', 'Emerging markets cannot finance renewables'], PHD: ['TCFD and SEC climate rules drive capital toward clean energy by making fossil fuel climate risks transparent', 'Disclosure has no effect', 'Only regulations matter', 'Climate risk is not financial'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A green bank is a financial institution dedicated to funding clean energy projects, using public money to attract private investment in renewable energy and efficiency.', MIDDLE_SCHOOL: 'Carbon markets set a cap on total emissions and let companies buy and sell emission permits. Companies that reduce emissions can sell unused permits to those that need more.', HIGH_SCHOOL: 'Blended finance uses public or concessional capital to de-risk clean energy investments and attract private capital into markets where risk-adjusted returns alone would not justify investment.', UNDERGRADUATE: 'Tax equity partnerships (partnership flip, inverted lease) allow investors with tax liability to contribute capital in exchange for ITC/PTC and depreciation benefits, flipping ownership to the developer after the recapture period.', GRADUATE: 'Financial innovations include green/sustainability-linked bonds ($500B+/yr), DFI first-loss guarantees (reducing risk by 30-50%), local currency hedging facilities, and standardized PPA contracts that reduce transaction costs in emerging markets.', PHD: 'TCFD and SEC climate disclosure rules make fossil fuel stranded asset risk, physical climate risk, and transition risk transparent, redirecting institutional capital toward clean energy investments with better long-term risk-adjusted returns.' } }] },
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
    lessons: [{ id: 're-stor-1', title: 'Saving Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Batteries!</h2><p>We can save solar energy during the day to use at night using big batteries!</p>', MIDDLE_SCHOOL: '<h2>Storage Solutions</h2><p>Batteries, pumped hydro, and other technologies store energy when its abundant for use when needed.</p>', HIGH_SCHOOL: '<h2>Technology Options</h2><p>Lithium-ion batteries, flow batteries, pumped hydro, compressed air, and thermal storage.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Energy Storage Applications: Grid Services, Market Participation, and System Design</h2>

<p>Energy storage is the Swiss army knife of the modern grid, providing services across timescales from milliseconds (frequency regulation) to seasons (hydrogen storage). Global battery storage deployment is accelerating exponentially—from 10 GW in 2020 to 45+ GW in 2023. Understanding which storage technologies and configurations serve which grid applications is essential for system planners and project developers.</p>

<h3>Storage Applications by Timescale</h3>

<table class="technical-table">
<thead>
<tr><th>Application</th><th>Response Time</th><th>Duration</th><th>Optimal Technology</th><th>Revenue</th></tr>
</thead>
<tbody>
<tr><td>Frequency regulation</td><td>Milliseconds</td><td>15-30 min</td><td>Li-ion battery, flywheel</td><td>$5-30/MW-hr</td></tr>
<tr><td>Spinning reserve</td><td>Seconds</td><td>1-2 hours</td><td>Li-ion battery</td><td>$3-15/MW-hr</td></tr>
<tr><td>Peak shaving</td><td>Minutes</td><td>2-4 hours</td><td>Li-ion battery</td><td>Demand charge reduction</td></tr>
<tr><td>Energy arbitrage</td><td>Minutes</td><td>4-8 hours</td><td>Li-ion, flow battery</td><td>$10-60/MWh spread</td></tr>
<tr><td>Renewable firming</td><td>Minutes-hours</td><td>4-12 hours</td><td>Li-ion, flow battery</td><td>Capacity + energy value</td></tr>
<tr><td>T&D deferral</td><td>Seasonal planning</td><td>4-8 hours</td><td>Li-ion battery</td><td>$50-200/kW-yr avoided</td></tr>
<tr><td>Seasonal storage</td><td>Weeks-months</td><td>100+ hours</td><td>Hydrogen, CAES, PSH</td><td>System reliability value</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-stor3-undergrad-q1">
<p>"Revenue stacking—combining multiple value streams in a single storage system—is essential for project economics. A 100 MW battery participating in energy arbitrage, frequency regulation, and capacity markets can earn 2-3x the revenue of a system providing only one service."</p>
<cite>— Lazard, Levelized Cost of Storage Analysis, Version 9.0, 2024</cite>
</blockquote>

<h3>Battery Energy Storage System (BESS) Design</h3>
<ul>
<li><strong>System sizing:</strong> Power (MW) and energy (MWh) independently determined by application requirements</li>
<li><strong>Thermal management:</strong> HVAC or liquid cooling maintains cells at 20-30°C; critical for safety and longevity</li>
<li><strong>Fire safety:</strong> NFPA 855 standard; thermal runaway detection, ventilation, suppression, and spacing requirements</li>
<li><strong>Inverter configuration:</strong> Central inverter (cost-effective) vs. string inverter (redundancy, partial operation)</li>
<li><strong>Augmentation strategy:</strong> Add capacity over time vs. oversize initially to maintain rated capacity through degradation</li>
</ul>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>Energy storage system design requires matching technology capability to application requirements across multiple dimensions: response speed, duration, cycle life, round-trip efficiency, and safety. The economic case depends on stacking compatible services—a system providing frequency regulation during some hours and energy arbitrage during others captures more value than one dedicated to a single application. As storage costs decline, the set of economically viable applications expands, making storage an increasingly standard component of grid planning.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Energy Storage in Wholesale Markets: Accreditation, Dispatch Optimization, and Regulatory Design</h2>

<p>Storage participation in wholesale electricity markets is rapidly evolving as regulators develop rules for this fundamentally different resource type—one that is neither a generator nor a load but both. Graduate analysis examines FERC orders enabling storage participation, capacity accreditation methodologies, co-optimization of energy and ancillary services, and the implications of storage at scale for market design.</p>

<h3>FERC Regulatory Framework for Storage</h3>

<table class="technical-table">
<thead>
<tr><th>FERC Order</th><th>Key Provision</th><th>Impact</th></tr>
</thead>
<tbody>
<tr><td>Order 841 (2018)</td><td>Storage as market participant</td><td>Removed minimum size, enabled dual participation</td></tr>
<tr><td>Order 2222 (2020)</td><td>DER aggregation</td><td>Behind-the-meter storage can participate in wholesale markets</td></tr>
<tr><td>Order 2023 (2023)</td><td>Interconnection reform</td><td>Cluster study process, reduced queue timelines for hybrid</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-stor3-grad-q1">
<p>"As storage penetration increases, its marginal capacity value (ELCC) declines—creating a paradox where the first GW of storage in a region provides high capacity value but subsequent additions provide diminishing returns. This 'ELCC saturation' effect has major implications for optimal storage deployment levels."</p>
<cite>— NREL, Storage Futures Study: The Challenge of Declining ELCC, 2022</cite>
</blockquote>

<h3>State-of-Charge Aware Dispatch</h3>
<ul>
<li><strong>Look-ahead optimization:</strong> Multi-period dispatch considering future price expectations and SOC trajectories</li>
<li><strong>Degradation cost inclusion:</strong> Adding $/MWh degradation cost to dispatch marginal cost changes optimal cycling behavior</li>
<li><strong>Co-optimization:</strong> Joint scheduling of energy and ancillary services maximizes total revenue</li>
<li><strong>Uncertainty handling:</strong> Stochastic or robust optimization for price and renewable forecast uncertainty</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-stor3-grad-q2">
<p>"At high storage penetrations, storage competes with itself—reducing price spreads that make arbitrage profitable. This 'price cannibalization' effect limits the economic deployment of storage before its full technical potential is reached, suggesting that market design reforms may be needed."</p>
<cite>— The Electricity Journal, "Price Cannibalization and Storage Economics," 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Storage market design research addresses fundamental questions about how to properly value a resource that provides fundamentally different services than conventional generators. Key research fronts include: accurate capacity accreditation that reflects duration limitations; market rules that enable co-optimization across energy, ancillary, and capacity products; and understanding the macro-economic dynamics of storage at scale, including price cannibalization and ELCC saturation effects.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Next-generation batteries, long-duration storage, and optimal system design.</p>' } }],
    activities: [{ id: 're-stor-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Charge the Battery!', MIDDLE_SCHOOL: 'Storage Selection', HIGH_SCHOOL: 'Technology Compare', UNDERGRADUATE: 'Application Analysis', GRADUATE: 'Market Design', PHD: 'Optimization Model' }, description: { ELEMENTARY: 'Save energy in batteries!', MIDDLE_SCHOOL: 'Choose storage technologies.', HIGH_SCHOOL: 'Compare storage options.', UNDERGRADUATE: 'Analyze storage applications.', GRADUATE: 'Design storage markets.', PHD: 'Model storage optimization.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-stor-game', type: 'simulation', title: 'Storage Master', description: 'Deploy energy storage wisely!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-stor-quiz', passingScore: 80, questions: [{ id: 'rstorq1', question: { ELEMENTARY: 'Why store energy?', MIDDLE_SCHOOL: 'What is pumped hydro?', HIGH_SCHOOL: 'What is a flow battery?', UNDERGRADUATE: 'What is peak shaving?', GRADUATE: 'What is storage arbitrage?', PHD: 'What is long-duration storage?' }, options: { ELEMENTARY: ['To use it when we need it later', 'No reason', 'Energy cannot be stored', 'Just for fun'], MIDDLE_SCHOOL: ['Pumping water uphill to store energy', 'Pumping water fast', 'Hydro electricity only', 'No such thing'], HIGH_SCHOOL: ['Battery storing energy in liquid chemicals', 'Water flow battery', 'Flowing electricity', 'No such battery'], UNDERGRADUATE: ['Reducing demand peaks with stored energy', 'Shaving batteries', 'Peak climbing', 'No such thing'], GRADUATE: ['Buying cheap and selling expensive', 'Random trading', 'No value', 'Only buying'], PHD: ['Storage for days to seasons', 'Short storage', 'No long storage needed', 'Same as short'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We store energy so we can use solar power at night or wind power when its calm!', MIDDLE_SCHOOL: 'Pumped hydro pumps water uphill when power is cheap and releases it to generate electricity when needed.', HIGH_SCHOOL: 'Flow batteries store energy in liquid electrolytes, allowing independent scaling of power and energy.', UNDERGRADUATE: 'Peak shaving uses stored energy during high-demand periods to reduce peak power costs.', GRADUATE: 'Storage arbitrage profits from buying electricity when cheap and selling when expensive.', PHD: 'Long-duration storage addresses seasonal variations and extended low-generation periods.' } }, { id: 'rstorq2', question: { ELEMENTARY: 'What is a flow battery?', MIDDLE_SCHOOL: 'How do flywheels store energy?', HIGH_SCHOOL: 'What is thermal energy storage?', UNDERGRADUATE: 'How do iron-air batteries achieve ultra-low cost for long-duration storage?', GRADUATE: 'What role does compressed air energy storage play in grid-scale applications?', PHD: 'How do multi-day storage technologies address extended renewable droughts?' }, options: { ELEMENTARY: ['A battery that stores energy in liquid tanks', 'A battery that flows like water', 'A type of river power', 'A liquid solar panel'], MIDDLE_SCHOOL: ['A heavy wheel spinning very fast stores energy as motion', 'Wheels that fly through the air', 'Wheels that generate heat', 'A type of wind turbine'], HIGH_SCHOOL: ['Storing heat or cold in materials for later use', 'Only storing ice', 'Thermal means hot springs', 'A type of insulation'], UNDERGRADUATE: ['Abundant iron and air as reactants with simple electrochemistry enable sub-$20/kWh targets', 'Iron-air is expensive', 'Only lithium works for storage', 'Iron cannot store energy'], GRADUATE: ['Salt cavern CAES provides 100+ MW, 8-24 hour storage with 50+ year asset life', 'CAES is not grid-scale', 'Only for small applications', 'Technology does not exist'], PHD: ['Hydrogen in caverns, iron-air, and thermal storage bridge 3-14 day low-renewable periods that batteries cannot economically serve', 'Multi-day storage is not needed', 'Only batteries work', 'Droughts dont affect renewables'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A flow battery stores energy in liquid chemicals held in external tanks. The bigger the tanks, the more energy it can store, making it great for long-duration applications.', MIDDLE_SCHOOL: 'Flywheels store energy as rotational kinetic energy in a heavy spinning mass (carbon fiber rotor) in a vacuum chamber, providing instant power for seconds to minutes.', HIGH_SCHOOL: 'Thermal energy storage captures heat or cold in materials like molten salt (565C for CSP), ice (for cooling), or phase-change materials for later use in heating, cooling, or electricity generation.', UNDERGRADUATE: 'Iron-air batteries use iron oxidation/reduction with ambient oxygen, leveraging abundant iron ($0.10/kg) and simple aqueous electrolyte to target sub-$20/kWh energy capacity cost for 100+ hour duration.', GRADUATE: 'Compressed air energy storage uses off-peak electricity to compress air into salt caverns (50-70 bar), releasing it through expansion turbines during peak demand. Existing plants (Huntorf, McIntosh) demonstrate 100+ MW scale with 50+ year operational life.', PHD: 'Multi-day storage technologies (underground hydrogen at $1-2/kWh, iron-air at <$20/kWh, thermal at $10-30/kWh) address 3-14 day renewable droughts that would require uneconomic oversizing of 4-hour lithium-ion batteries.' } }] },
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
    lessons: [{ id: 're-dist-1', title: 'Local Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy at Home!</h2><p>People can put solar panels on their roofs and even batteries in their garages to make their own clean energy!</p>', MIDDLE_SCHOOL: '<h2>Distributed Energy</h2><p>Rooftop solar, home batteries, and smart thermostats let homes and businesses manage their own energy.</p>', HIGH_SCHOOL: '<h2>DER Systems</h2><p>Solar, storage, EVs, and demand response working together as distributed energy resources.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>Distributed Energy Resources: Interconnection, Smart Inverters, and Grid Integration</h2>

<p>Distributed energy resources (DERs)—rooftop solar, battery storage, EVs, smart thermostats, and other behind-the-meter assets—are transforming the distribution grid from a one-way delivery system to a bidirectional energy platform. Over 160 GW of DERs are interconnected in the U.S., with projections of 380+ GW by 2030. Understanding interconnection standards, smart inverter capabilities, and hosting capacity analysis is essential for grid integration engineers.</p>

<h3>IEEE 1547-2018: The DER Interconnection Standard</h3>

<table class="technical-table">
<thead>
<tr><th>Capability</th><th>Category I (Default)</th><th>Category II (Moderate)</th><th>Category III (Advanced)</th></tr>
</thead>
<tbody>
<tr><td>Voltage regulation</td><td>Volt-VAR (limited)</td><td>Volt-VAR (full range)</td><td>Volt-VAR + Volt-Watt</td></tr>
<tr><td>Frequency ride-through</td><td>Mandatory (limited range)</td><td>Extended range</td><td>Full frequency support</td></tr>
<tr><td>Voltage ride-through</td><td>Mandatory (limited)</td><td>Extended range</td><td>Momentary cessation eliminated</td></tr>
<tr><td>Power factor</td><td>0.98 leading/lagging</td><td>0.90 leading/lagging</td><td>0.85 leading/lagging</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-der-undergrad-q1">
<p>"Smart inverters transform DERs from passive, inject-and-forget devices into active grid participants capable of voltage regulation, frequency support, and fault ride-through. IEEE 1547-2018 mandates these capabilities, but actual deployment requires utility activation and communication infrastructure."</p>
<cite>— EPRI, Smart Inverter Implementation Guidebook, 2023</cite>
</blockquote>

<h3>Hosting Capacity Analysis</h3>
<ul>
<li><strong>Definition:</strong> Maximum DER capacity a feeder can accommodate without violating thermal, voltage, or protection limits</li>
<li><strong>Voltage constraints:</strong> DER injection raises voltage; ANSI C84.1 limits of ±5% must be maintained</li>
<li><strong>Thermal constraints:</strong> Reverse power flow may overload transformers and conductors</li>
<li><strong>Protection constraints:</strong> DERs change fault current magnitude and direction; sympathetic tripping risk</li>
<li><strong>Iterative power flow:</strong> Sequential connection impact studies; computationally intensive for system-wide analysis</li>
</ul>

<h3>DER Interconnection Process</h3>
<table class="technical-table">
<thead>
<tr><th>Project Size</th><th>Process</th><th>Timeline</th><th>Typical Cost</th></tr>
</thead>
<tbody>
<tr><td>Residential (<25 kW)</td><td>Fast track / simplified</td><td>2-4 weeks</td><td>$0-500</td></tr>
<tr><td>Small commercial (25-500 kW)</td><td>Supplemental review</td><td>1-3 months</td><td>$500-5,000</td></tr>
<tr><td>Large DER (500 kW - 5 MW)</td><td>Full interconnection study</td><td>3-12 months</td><td>$5,000-50,000</td></tr>
<tr><td>Utility-scale (>5 MW)</td><td>Transmission-level study</td><td>1-5 years</td><td>$50,000-500,000+</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>DER integration engineering sits at the intersection of power systems, communications, and control. The fundamental challenge is managing millions of distributed devices—each with different capabilities, owners, and objectives—as a coordinated fleet that supports rather than degrades grid reliability. Success requires moving from the current device-by-device interconnection paradigm to system-level planning that proactively identifies optimal DER locations and enables coordinated control.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Advanced DER Integration: Hosting Capacity Optimization, Virtual Power Plants, and Utility Transformation</h2>

<p>As DER penetration reaches levels that materially affect distribution system operations, utilities and regulators must develop new tools, markets, and business models to manage the transition. Graduate analysis examines advanced hosting capacity methods, virtual power plant operations, non-wires alternatives, and the regulatory frameworks enabling utility business model transformation.</p>

<h3>Advanced Hosting Capacity Methods</h3>

<table class="technical-table">
<thead>
<tr><th>Method</th><th>Approach</th><th>Speed</th><th>Accuracy</th></tr>
</thead>
<tbody>
<tr><td>Iterative power flow</td><td>Sequential DER addition with power flow</td><td>Slow (hours per feeder)</td><td>High</td></tr>
<tr><td>Stochastic</td><td>Monte Carlo sampling of DER locations</td><td>Moderate</td><td>High (probabilistic)</td></tr>
<tr><td>Linearized (DLMP-based)</td><td>Sensitivity factors from linearized model</td><td>Fast (seconds)</td><td>Moderate (approximation)</td></tr>
<tr><td>ML-accelerated</td><td>Neural network trained on power flow results</td><td>Very fast</td><td>High (with sufficient training)</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-der-grad-q1">
<p>"Virtual power plants aggregating 10,000+ DERs now routinely participate in wholesale markets, providing frequency regulation, demand response, and capacity services. The technical challenge is coordinating diverse assets with different capabilities, constraints, and communication protocols into a reliable dispatchable resource."</p>
<cite>— IEEE Power and Energy Magazine, "Virtual Power Plants: Architecture and Performance," 2023</cite>
</blockquote>

<h3>Non-Wires Alternatives</h3>
<ul>
<li><strong>Definition:</strong> Using DERs, storage, and demand management to defer or avoid traditional grid infrastructure upgrades</li>
<li><strong>ConEdison BQDM:</strong> Pioneer NWA program in Brooklyn/Queens using demand management, storage, and solar to defer $1.2B substation upgrade</li>
<li><strong>Benefit-cost framework:</strong> Compare NWA cost with traditional infrastructure cost, including optionality value</li>
<li><strong>Risk management:</strong> NWA performance risk if DER aggregation doesn't achieve expected load relief</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="re-der-grad-q2">
<p>"The utility of the future operates as a distribution system platform—coordinating DERs, enabling markets at the grid edge, and ensuring reliability through advanced analytics rather than through owning and controlling all assets. This transformation requires fundamental changes in regulation, technology, and organizational culture."</p>
<cite>— MIT Energy Initiative, Utility of the Future Study, 2023</cite>
</blockquote>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>DER integration research addresses the transition from a centralized, utility-controlled power system to a distributed, multi-stakeholder platform. Key research frontiers include scalable optimization algorithms for millions of DERs, federated learning approaches that respect data privacy while enabling system-wide optimization, and regulatory design that properly compensates DER services while maintaining universal service obligations and grid reliability.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Transactive energy, grid architecture, and DER coordination.</p>' } }],
    activities: [{ id: 're-dist-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Power Your Home!', MIDDLE_SCHOOL: 'DER Installation', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Integration Analysis', GRADUATE: 'Policy Design', PHD: 'Architecture Research' }, description: { ELEMENTARY: 'Make energy at home!', MIDDLE_SCHOOL: 'Install distributed energy.', HIGH_SCHOOL: 'Design a DER system.', UNDERGRADUATE: 'Analyze grid integration.', GRADUATE: 'Design DER policy.', PHD: 'Research grid architecture.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 're-dist-game', type: 'simulation', title: 'DER Manager', description: 'Build a distributed energy network!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-dist-quiz', passingScore: 80, questions: [{ id: 'rdistq1', question: { ELEMENTARY: 'What is distributed energy?', MIDDLE_SCHOOL: 'What is net metering?', HIGH_SCHOOL: 'What is a virtual power plant?', UNDERGRADUATE: 'What is interconnection?', GRADUATE: 'What is rate design?', PHD: 'What is transactive energy?' }, options: { ELEMENTARY: ['Energy made at homes and buildings', 'Only big power plants', 'No such thing', 'Distributed water'], MIDDLE_SCHOOL: ['Crediting solar owners for excess power', 'Counting meters', 'Net fishing', 'No such thing'], HIGH_SCHOOL: ['Many distributed resources working as one', 'Fake power plant', 'Virtual reality', 'No such concept'], UNDERGRADUATE: ['Connecting generation to the grid', 'Internet connection', 'Social connection', 'No connection'], GRADUATE: ['Setting electricity prices and structures', 'Rating electricity', 'Design rates', 'No design'], PHD: ['Market-based coordination of energy resources', 'Energy transactions only', 'No transactions', 'Active trading'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Distributed energy is electricity made at homes and buildings instead of big power plants!', MIDDLE_SCHOOL: 'Net metering credits solar owners for excess power they send to the grid.', HIGH_SCHOOL: 'A virtual power plant coordinates many distributed resources to act like a single power plant.', UNDERGRADUATE: 'Interconnection is the technical process of safely connecting generation to the grid.', GRADUATE: 'Rate design sets how electricity is priced to recover costs and send economic signals.', PHD: 'Transactive energy uses market signals to coordinate distributed energy resources in real time.' } }, { id: 'rdistq2', question: { ELEMENTARY: 'What is distributed energy?', MIDDLE_SCHOOL: 'How does rooftop solar help the grid?', HIGH_SCHOOL: 'What is a virtual power plant?', UNDERGRADUATE: 'How do hosting capacity analyses determine DER interconnection limits on distribution feeders?', GRADUATE: 'What value-of-DER methodologies quantify the grid benefits of distributed resources?', PHD: 'How do transactive energy markets coordinate millions of distributed resources?' }, options: { ELEMENTARY: ['Small power sources located close to where electricity is used', 'A big power plant far away', 'Energy that is spread thin', 'Only wind power'], MIDDLE_SCHOOL: ['It reduces demand on central power plants and transmission lines', 'It doesnt help at all', 'Only helps the homeowner', 'It overloads the grid'], HIGH_SCHOOL: ['Software coordinating many small energy resources to act as one power plant', 'A video game', 'A fake power plant', 'A planning tool only'], UNDERGRADUATE: ['Power flow simulations determine maximum DER capacity before voltage or thermal violations', 'No analysis needed', 'Only transformer size matters', 'Any amount of DER is fine'], GRADUATE: ['Avoided energy, capacity, T&D, environmental, and resilience values quantify full DER stack benefits', 'Only energy value matters', 'DER has no grid value', 'Only cost matters'], PHD: ['Price signals, blockchain, or platform-based coordination enable real-time P2P energy trading and grid services', 'Central control only', 'Markets cannot coordinate DER', 'Only utility dispatch works'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Distributed energy means generating electricity close to where it is used, like rooftop solar, small wind turbines, batteries, and backup generators at homes and businesses.', MIDDLE_SCHOOL: 'Rooftop solar reduces the amount of electricity that must be generated by large power plants and transmitted over long distances, lowering peak demand and reducing line losses.', HIGH_SCHOOL: 'A virtual power plant (VPP) uses software to coordinate thousands of distributed energy resources (solar, batteries, EVs, smart thermostats) to provide grid services as if they were a single large power plant.', UNDERGRADUATE: 'Hosting capacity analysis uses iterative power flow simulations to determine maximum DER capacity on each feeder segment before voltage rise, thermal overload, or protection miscoordination violations occur.', GRADUATE: 'Value-of-DER studies quantify avoided energy costs, generation capacity, T&D infrastructure, line losses, environmental compliance, and resilience benefits using locational and temporal granularity to capture full distributed resource value.', PHD: 'Transactive energy uses dynamic price signals (locational marginal price at distribution level) or blockchain-based platforms to coordinate millions of DER in real-time, enabling P2P trading, congestion management, and aggregated grid services.' } }] },
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
    lessons: [{ id: 're-trans-1', title: 'Clean Energy Future', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>A Clean Energy World!</h2><p>One day all our energy could come from sun, wind, and water - no more pollution!</p>', MIDDLE_SCHOOL: '<h2>Energy Transition</h2><p>The shift from fossil fuels to renewables is the biggest change in energy since the industrial revolution.</p>', HIGH_SCHOOL: '<h2>Transition Challenges</h2><p>Intermittency, infrastructure, costs, and incumbent interests create transition challenges.</p>', UNDERGRADUATE: `<div class="lesson-content">
<h2>The Energy Transition: Decarbonization Pathways, System Integration, and Implementation Science</h2>

<p>The global energy transition—transforming how we produce, deliver, and consume energy to achieve net-zero emissions by mid-century—is the defining engineering challenge of our generation. This masterclass synthesizes concepts from all preceding modules into an integrated systems perspective, examining decarbonization pathways, sectoral coupling, implementation barriers, and the scale of transformation required.</p>

<h3>Net-Zero Pathway Analysis</h3>

<table class="technical-table">
<thead>
<tr><th>Scenario</th><th>Source</th><th>2050 Electricity</th><th>Key Technologies</th><th>Cumulative Investment</th></tr>
</thead>
<tbody>
<tr><td>Net Zero by 2050</td><td>IEA</td><td>90% renewables</td><td>Solar, wind, storage, efficiency</td><td>$4 trillion/year by 2030</td></tr>
<tr><td>1.5°C Pathway</td><td>IRENA</td><td>90% renewables</td><td>Electrification + green hydrogen</td><td>$5.7 trillion/year 2023-2050</td></tr>
<tr><td>All-Sources</td><td>Princeton NZA</td><td>70-95% clean</td><td>Multiple pathways modeled</td><td>$2.5 trillion additional by 2050</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-trans-undergrad-q1">
<p>"Net-zero pathways consistently show that the energy transition is not just about adding renewables—it requires simultaneously transforming electricity, transportation, buildings, and industry while building new infrastructure for hydrogen, CO2 transport, and expanded grids. The scale of change is unprecedented but technically and economically feasible."</p>
<cite>— IEA, Net Zero by 2050: A Roadmap for the Global Energy Sector, 2021</cite>
</blockquote>

<h3>Sectoral Coupling</h3>
<ul>
<li><strong>Electrification of transport:</strong> EVs powered by clean grid; reduces oil demand by 50-80%</li>
<li><strong>Electrification of buildings:</strong> Heat pumps replacing gas furnaces; doubles electricity demand from buildings</li>
<li><strong>Green hydrogen for industry:</strong> Steel, chemicals, refining; connects clean electricity to industrial heat</li>
<li><strong>Sustainable fuels for aviation/shipping:</strong> SAF, e-fuels, green ammonia for long-distance transport</li>
<li><strong>Carbon capture:</strong> Point-source CCS for cement, steel; direct air capture for residual emissions</li>
</ul>

<h3>Implementation Barriers</h3>
<table class="technical-table">
<thead>
<tr><th>Barrier</th><th>Scale</th><th>Solution Approach</th><th>Timeline</th></tr>
</thead>
<tbody>
<tr><td>Permitting and siting</td><td>7-12 year transmission projects</td><td>Federal permitting reform, one-stop-shop</td><td>Legislative action needed</td></tr>
<tr><td>Supply chain</td><td>Critical minerals, manufacturing</td><td>Domestic production, recycling, substitution</td><td>5-10 year buildout</td></tr>
<tr><td>Workforce</td><td>500,000+ additional clean energy workers</td><td>Training programs, apprenticeships</td><td>Continuous scaling</td></tr>
<tr><td>Social acceptance</td><td>Local opposition to projects</td><td>Community benefit agreements, engagement</td><td>Project-by-project</td></tr>
</tbody>
</table>

<div class="key-concept">
<h4>Engineering Perspective</h4>
<p>The energy transition is fundamentally a systems engineering challenge requiring optimization across technology, infrastructure, markets, institutions, and human behavior. No single technology, policy, or market reform is sufficient—success requires integrated action across all dimensions simultaneously. Engineers must think in terms of coupled systems, where decisions in one sector (e.g., building electrification) create requirements in another (e.g., grid capacity), and where the pace of transition is constrained not just by technology costs but by institutional capacity, workforce availability, and social acceptance.</p>
</div>
</div>`, GRADUATE: `<div class="lesson-content">
<h2>Energy Transition Systems Analysis: Sociotechnical Theory, Integrated Assessment, and Governance</h2>

<p>The energy transition is not merely a technical substitution of one energy source for another—it is a fundamental transformation of sociotechnical systems encompassing technology, infrastructure, institutions, markets, practices, and cultural meanings. Graduate analysis draws on transitions theory, integrated assessment modeling, political economy, and governance studies to examine how and why energy systems change.</p>

<h3>Multi-Level Perspective on Transitions</h3>

<table class="technical-table">
<thead>
<tr><th>Level</th><th>Description</th><th>Energy Transition Example</th><th>Timescale</th></tr>
</thead>
<tbody>
<tr><td>Landscape</td><td>Macro trends, external pressures</td><td>Climate change, geopolitics, demographics</td><td>Decades</td></tr>
<tr><td>Regime</td><td>Dominant system configuration</td><td>Fossil fuel-based centralized grid</td><td>Years-decades</td></tr>
<tr><td>Niche</td><td>Protected spaces for innovation</td><td>Solar, EVs, heat pumps (early stage)</td><td>Years</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-trans-grad-q1">
<p>"Energy transitions are not driven by technology alone—they require aligned changes across technology, markets, policy, infrastructure, user practices, and cultural meaning. Historical analysis shows that transitions take 30-50 years but can be accelerated through deliberate policy intervention and crisis-driven windows of opportunity."</p>
<cite>— Research Policy, "Sociotechnical Transitions and Policy: A Multi-Level Analysis," 2023</cite>
</blockquote>

<h3>Integrated Assessment Models</h3>
<ul>
<li><strong>IAMs (IPCC):</strong> GCAM, MESSAGE, REMIND link energy, economy, and climate systems to model mitigation pathways</li>
<li><strong>Limitations:</strong> Perfect foresight, limited technology detail, social/political dynamics poorly represented</li>
<li><strong>Scenario approach:</strong> SSPs (Shared Socioeconomic Pathways) + RCPs (Representative Concentration Pathways) create scenario matrix</li>
<li><strong>Feasibility assessment:</strong> IPCC AR6 assesses geophysical, technological, economic, institutional, and socio-cultural feasibility of mitigation options</li>
</ul>

<h3>Political Economy of Transitions</h3>

<table class="technical-table">
<thead>
<tr><th>Factor</th><th>Accelerator</th><th>Barrier</th></tr>
</thead>
<tbody>
<tr><td>Incumbent interests</td><td>Diversification into clean energy</td><td>Lobbying against regulation, stranded asset protection</td></tr>
<tr><td>Labor</td><td>Clean energy job creation (net positive)</td><td>Concentrated losses in fossil regions</td></tr>
<tr><td>Finance</td><td>ESG mandates, green bonds</td><td>Short-termism, fossil fuel financing inertia</td></tr>
<tr><td>Public opinion</td><td>Climate concern, cost savings</td><td>NIMBYism, energy security fears</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="re-trans-grad-q2">
<p>"The pace of the energy transition will be determined not by what is technically feasible or economically optimal, but by what is politically possible and institutionally achievable. Understanding and navigating the political economy of change—coalition building, institutional reform, just transition—is as important as developing new technologies."</p>
<cite>— Annual Review of Political Science, "The Political Economy of Energy Transitions," 2023</cite>
</blockquote>

<h3>Stranded Assets and Path Dependencies</h3>
<ul>
<li><strong>Carbon budget implication:</strong> Existing fossil fuel infrastructure, if operated to end of life, would exceed 1.5°C carbon budget</li>
<li><strong>Early retirement economics:</strong> When clean alternatives are cheaper than operating costs of existing fossil plants, early retirement is economically rational</li>
<li><strong>Infrastructure lock-in:</strong> Long-lived infrastructure (pipelines, power plants, buildings) creates multi-decade path dependencies</li>
<li><strong>Just transition financing:</strong> Mechanisms to compensate workers and communities while managing stranded asset losses</li>
</ul>

<div class="key-concept">
<h4>Research Perspective</h4>
<p>Energy transition research increasingly recognizes that the challenge is not primarily technological but institutional and political. The technologies for a clean energy system largely exist; the research frontier centers on understanding why transitions happen faster in some contexts than others, how to design policies that build and maintain political coalitions for sustained action, and how to manage the distributional conflicts inherent in fundamental system change. The most impactful research bridges disciplinary boundaries—connecting engineering feasibility with economic modeling, political analysis, and social science.</p>
</div>
</div>`, PHD: '<h2>Research Frontiers</h2><p>Socio-technical transitions, regime change, and accelerating transformation.</p>' } }],
    activities: [{ id: 're-trans-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Design the Future!', MIDDLE_SCHOOL: 'Transition Path', HIGH_SCHOOL: 'Scenario Analysis', UNDERGRADUATE: 'Pathway Modeling', GRADUATE: 'Just Transition', PHD: 'Transformation Research' }, description: { ELEMENTARY: 'Design a clean energy world!', MIDDLE_SCHOOL: 'Plan the energy transition.', HIGH_SCHOOL: 'Analyze transition scenarios.', UNDERGRADUATE: 'Model transition pathways.', GRADUATE: 'Design just transitions.', PHD: 'Research transformation.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 're-trans-game', type: 'simulation', title: 'Transition Leader', description: 'Guide the clean energy transition!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 're-trans-quiz', passingScore: 80, questions: [{ id: 'rtransq1', question: { ELEMENTARY: 'What is the energy transition?', MIDDLE_SCHOOL: 'Why transition to renewables?', HIGH_SCHOOL: 'What is intermittency?', UNDERGRADUATE: 'What is sectoral decarbonization?', GRADUATE: 'What is a just transition?', PHD: 'What is socio-technical transition?' }, options: { ELEMENTARY: ['Changing from dirty to clean energy', 'No change', 'More fossil fuels', 'Less energy'], MIDDLE_SCHOOL: ['Stop climate change and pollution', 'No reason', 'Fossil fuels are better', 'Just for fun'], HIGH_SCHOOL: ['Variable power from sun and wind', 'Constant power', 'No variation', 'Only at night'], UNDERGRADUATE: ['Eliminating emissions sector by sector', 'One sector only', 'No sectors', 'Random reduction'], GRADUATE: ['Fair transition for affected workers and communities', 'Unjust change', 'Fast change only', 'No fairness'], PHD: ['Linked changes in technology and society', 'Only technology', 'Only society', 'No connection'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The energy transition is changing from dirty fossil fuels to clean renewable energy!', MIDDLE_SCHOOL: 'We transition to renewables to stop climate change and air pollution from fossil fuels.', HIGH_SCHOOL: 'Intermittency means solar and wind power vary with weather rather than producing constantly.', UNDERGRADUATE: 'Sectoral decarbonization eliminates emissions across electricity, industry, buildings, and transport.', GRADUATE: 'Just transition ensures workers and communities affected by change receive support and opportunity.', PHD: 'Socio-technical transitions involve interconnected changes in technology, institutions, and behavior.' } }, { id: 'rtransq2', question: { ELEMENTARY: 'What is the energy transition?', MIDDLE_SCHOOL: 'Why do we need to change how we make energy?', HIGH_SCHOOL: 'What technologies are key to the energy transition?', UNDERGRADUATE: 'How do integrated assessment models project energy transition pathways to net-zero?', GRADUATE: 'What are the socioeconomic implications of rapid energy transition for fossil fuel-dependent economies?', PHD: 'How do tipping point dynamics and feedback loops accelerate or impede energy system transitions?' }, options: { ELEMENTARY: ['Shifting from fossil fuels to clean, renewable energy', 'Using more coal', 'Keeping things the same', 'Only changing cars'], MIDDLE_SCHOOL: ['To stop climate change and reduce air pollution', 'We dont need to change', 'Only to save money', 'Because fossil fuels are expensive'], HIGH_SCHOOL: ['Solar, wind, batteries, EVs, heat pumps, hydrogen, and smart grids', 'Only solar panels', 'Only nuclear power', 'Only electric cars'], UNDERGRADUATE: ['IAMs couple energy, economy, land-use, and climate modules to find cost-optimal decarbonization pathways', 'Models are not useful', 'Only expert opinion matters', 'Only one pathway exists'], GRADUATE: ['GDP contraction, employment disruption, stranded assets, and fiscal revenue loss require managed diversification', 'No socioeconomic impacts', 'Only benefits', 'Only affects poor countries'], PHD: ['Technology cost learning curves, policy feedback, and social norm shifts can create self-reinforcing adoption cascades', 'Transitions are always linear', 'Tipping points dont exist', 'Only policy drives change'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The energy transition is the global shift from fossil fuels (coal, oil, gas) to clean, renewable energy sources like solar, wind, and batteries.', MIDDLE_SCHOOL: 'We need the energy transition to stop climate change caused by burning fossil fuels, reduce deadly air pollution, create new jobs, and build a sustainable energy system for the future.', HIGH_SCHOOL: 'Key transition technologies include solar PV, wind power, battery storage, electric vehicles, heat pumps, green hydrogen, smart grids, and carbon capture - working together as a system.', UNDERGRADUATE: 'Integrated assessment models (IPCC, IEA NZE, IRENA) couple energy system optimization, macroeconomic modeling, land-use change, and climate response to project cost-optimal pathways achieving 1.5-2C targets with varying technology mixes.', GRADUATE: 'Fossil fuel-dependent economies face 5-15% GDP contraction risk, employment disruption (millions of workers), asset stranding ($1-4 trillion), and fiscal revenue loss requiring proactive economic diversification, retraining, and social protection.', PHD: 'Energy transitions exhibit tipping point dynamics: technology learning curves cross cost thresholds, policy ratchets create investment certainty, social norm shifts accelerate adoption, and infrastructure lock-in creates path dependence - both accelerating and impeding change.' } }] },
    externalResources: [{ title: 'Energy Transition', url: 'https://www.irena.org/Energy-Transition', type: 'research' }]
  }
]
