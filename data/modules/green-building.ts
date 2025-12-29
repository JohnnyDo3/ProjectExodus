// Green Building Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const greenBuildingModules: Module[] = [
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
          ELEMENTARY: `<div class="lesson-content">
            <h2>Sunny's House-Warming Adventure</h2>

            <div class="story-intro">
              <p>Meet <strong>Sunny</strong>, a friendly sunbeam who loves helping people stay warm! Today, Sunny is going to show you an amazing secret about houses.</p>
            </div>

            <div class="image-placeholder" data-caption="Sunny the sunbeam shining down on a cozy house with big windows facing south">
              [Image: Illustration of a cheerful sunbeam character approaching a house]
            </div>

            <h3>Chapter 1: The Cold House Problem</h3>

            <p>One winter morning, Sunny floated down from the sky and saw a little girl named Maya shivering in her house.</p>

            <p>"Why are you so cold?" asked Sunny.</p>

            <p>"Our heater broke!" said Maya. "And it costs so much money to fix!"</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-elem-q1">
              <p>"The best heater is already in the sky - we just need to invite it inside!"</p>
              <cite>— Sunny the Sunbeam</cite>
            </blockquote>

            <p>Sunny had a brilliant idea. "I can help warm your house for FREE! We just need to make some changes."</p>

            <h3>Chapter 2: The Magic of Big Windows</h3>

            <p>Sunny explained the first secret: <strong>window direction matters!</strong></p>

            <div class="key-concept">
              <h4>Which Way Should Windows Face?</h4>
              <p>In places like America, the sun travels across the southern sky. So big windows should face <strong>SOUTH</strong> to catch the most sunlight!</p>
            </div>

            <div class="image-placeholder" data-caption="Diagram showing how south-facing windows let in warm winter sunlight">
              [Image: Simple diagram of house with arrows showing sun entering south windows]
            </div>

            <p>Maya's dad moved her playroom to the sunny side of the house. Now Sunny could stream right in through the big windows!</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-elem-q2">
              <p>"A house that faces the sun is like a flower - it opens up to warmth and life!"</p>
              <cite>— Mr. Chen, Green Builder</cite>
            </blockquote>

            <h3>Chapter 3: Walls That Remember Warmth</h3>

            <p>But Maya noticed something strange. "Sunny, when you go away at night, it gets cold again!"</p>

            <p>Sunny smiled. "That's where <strong>thermal mass</strong> comes in! It's like a warmth battery."</p>

            <div class="activity-box">
              <h4>Try This!</h4>
              <p>Put a rock and a pillow in the sun for an hour. Then feel them both. The rock stays warm much longer! That's thermal mass!</p>
            </div>

            <p>Heavy things like stone floors, brick walls, and tile absorb heat during the day. Then at night, they slowly release that warmth back into the room!</p>

            <div class="image-placeholder" data-caption="Stone floor absorbing sunshine during the day and releasing heat at night">
              [Image: Two-panel illustration showing day (sun warming floor) and night (floor warming room)]
            </div>

            <h3>Chapter 4: The Summer Trick</h3>

            <p>"But wait!" said Maya. "Won't we get TOO hot in summer?"</p>

            <p>Sunny laughed. "Smart thinking! Here's the coolest trick of all."</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-elem-q3">
              <p>"The sun takes a high path in summer and a low path in winter - and smart builders use this dance!"</p>
              <cite>— Grandpa Joe, Solar Designer</cite>
            </blockquote>

            <p>In winter, the sun stays low in the sky, so sunlight goes deep into the house. But in summer, the sun is HIGH overhead!</p>

            <div class="key-concept">
              <h4>The Overhang Secret</h4>
              <p>A roof overhang (like a hat brim for your house) blocks the high summer sun but lets the low winter sun in. It's automatic cooling!</p>
            </div>

            <div class="image-placeholder" data-caption="Roof overhang blocking summer sun but allowing winter sun to enter">
              [Image: Side-by-side showing summer (sun blocked by overhang) and winter (sun entering under overhang)]
            </div>

            <h3>The Happy Ending</h3>

            <p>Maya's family made these changes to their house:</p>

            <div class="checklist">
              <ul>
                <li>Moved living spaces to the south side</li>
                <li>Added bigger windows facing south</li>
                <li>Put in a stone tile floor</li>
                <li>Built a nice roof overhang</li>
              </ul>
            </div>

            <p>Now their house stays warm in winter and cool in summer - using FREE sunshine!</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-elem-q4">
              <p>"When we build with nature instead of against it, everyone wins - people, planet, and pocketbooks!"</p>
              <cite>— Maya's Mom, after their home makeover</cite>
            </blockquote>

            <div class="fun-facts">
              <h4>Cool Facts!</h4>
              <ul>
                <li>People have used passive solar design for over 2,000 years!</li>
                <li>Ancient Greeks and Romans built their cities so houses faced south</li>
                <li>A well-designed passive solar home can save up to 80% on heating!</li>
              </ul>
            </div>

            <div class="chapter-summary">
              <h4>What We Learned</h4>
              <ul>
                <li>Big windows should face SOUTH to catch winter sun</li>
                <li>Heavy materials like stone store warmth (thermal mass)</li>
                <li>Roof overhangs block summer sun automatically</li>
                <li>Passive solar design uses FREE energy from the sun!</li>
              </ul>
            </div>
          </div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
            <h2>Harnessing the Sun: Passive Solar Design Basics</h2>

            <div class="intro-section">
              <p>Imagine heating and cooling your home without paying for electricity or gas. For thousands of years, people have designed buildings to work WITH the sun, not against it. This is called <strong>passive solar design</strong>.</p>
            </div>

            <div class="image-placeholder" data-caption="Modern passive solar home with large south-facing windows and roof overhangs">
              [Image: Photo of contemporary passive solar house]
            </div>

            <h3>What Makes Solar Design "Passive"?</h3>

            <p><strong>Active</strong> solar systems use machines like solar panels and pumps. <strong>Passive</strong> solar design works automatically through smart building choices - no machines needed!</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-mid-q1">
              <p>"Passive solar design is about cooperation with nature - letting the building itself do the work that machines would otherwise do."</p>
              <cite>— Edward Mazria, Architect and Environmental Advocate</cite>
            </blockquote>

            <h3>The Five Principles of Passive Solar</h3>

            <div class="principles-section">
              <div class="principle">
                <h4>1. Orientation</h4>
                <p>The building's position relative to the sun's path. In the Northern Hemisphere, the main living spaces and large windows face south.</p>
              </div>

              <div class="principle">
                <h4>2. Glazing (Windows)</h4>
                <p>Window placement and size matters! South-facing windows should be large, while north windows stay small to prevent heat loss.</p>
              </div>

              <div class="image-placeholder" data-caption="Diagram showing optimal window placement on different sides of a house">
                [Image: House floor plan showing large south windows, medium east/west, small north]
              </div>

              <div class="principle">
                <h4>3. Thermal Mass</h4>
                <p>Heavy materials (concrete, brick, stone, tile, water) that absorb heat during the day and release it at night. Think of it as a "heat battery."</p>
              </div>

              <blockquote class="scavenger-quote" data-quote-id="gb-mid-q2">
                <p>"Thermal mass is nature's thermostat - it smooths out temperature swings by storing energy when there's too much and releasing it when there's too little."</p>
                <cite>— Dr. Sarah Chen, Building Scientist</cite>
              </blockquote>

              <div class="principle">
                <h4>4. Insulation</h4>
                <p>Keeps heat WHERE you want it. In winter, insulation keeps warmth inside. In summer, it keeps heat outside.</p>
              </div>

              <div class="principle">
                <h4>5. Shading</h4>
                <p>Overhangs, awnings, and trees that block unwanted summer sun while allowing winter sun to enter.</p>
              </div>
            </div>

            <h3>Understanding Sun Angles</h3>

            <p>The key to passive solar design is understanding how the sun moves differently across seasons:</p>

            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Sun Position</th>
                    <th>What Happens</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Winter</td>
                    <td>Low in southern sky</td>
                    <td>Sunlight penetrates deep into south windows</td>
                  </tr>
                  <tr>
                    <td>Summer</td>
                    <td>High overhead</td>
                    <td>Overhangs block direct sun from entering</td>
                  </tr>
                  <tr>
                    <td>Spring/Fall</td>
                    <td>Medium height</td>
                    <td>Moderate solar gain - comfortable!</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="image-placeholder" data-caption="Diagram showing sun angles in summer vs winter and how overhangs work">
              [Image: Cross-section of house showing low winter sun entering, high summer sun blocked by overhang]
            </div>

            <h3>Real-World Example: The Earthship</h3>

            <p>Earthships are homes built from recycled materials that use passive solar design to stay comfortable in any climate - even in the desert!</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-mid-q3">
              <p>"An Earthship doesn't need to be hooked up to any utilities - it heats and cools itself, collects its own water, and grows its own food."</p>
              <cite>— Michael Reynolds, Earthship Architect</cite>
            </blockquote>

            <p>Key Earthship features:</p>
            <ul>
              <li>South-facing glass greenhouse</li>
              <li>Massive earth-bermed walls (thermal mass)</li>
              <li>Natural ventilation tubes</li>
              <li>Built into hillsides for insulation</li>
            </ul>

            <div class="image-placeholder" data-caption="Earthship home showing south-facing greenhouse and earth-bermed walls">
              [Image: Photo or diagram of an Earthship design]
            </div>

            <h3>Does Location Matter?</h3>

            <p>Absolutely! Passive solar strategies change based on climate:</p>

            <ul>
              <li><strong>Cold climates:</strong> Maximize south glazing, heavy thermal mass, super insulation</li>
              <li><strong>Hot-dry climates:</strong> Smaller windows, thick adobe walls, night ventilation</li>
              <li><strong>Hot-humid climates:</strong> Shade, cross-ventilation, raised floors, less thermal mass</li>
            </ul>

            <blockquote class="scavenger-quote" data-quote-id="gb-mid-q4">
              <p>"There's no one-size-fits-all in passive design. The best building is one that's designed for its specific place on Earth."</p>
              <cite>— Ken Yeang, Eco-Architect</cite>
            </blockquote>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Passive solar uses building design (not machines) to heat and cool</li>
                <li>Five principles: Orientation, Glazing, Thermal Mass, Insulation, Shading</li>
                <li>Sun is low in winter (enters windows) and high in summer (blocked by overhangs)</li>
                <li>Design strategies vary by climate zone</li>
                <li>These techniques can reduce energy use by 50-80%!</li>
              </ul>
            </div>
          </div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
            <h2>The Physics of Passive Solar Design</h2>

            <div class="intro-section">
              <p>Passive solar design applies fundamental physics principles - heat transfer, thermodynamics, and solar geometry - to create buildings that naturally regulate temperature. Understanding the science behind these systems allows us to design truly efficient buildings.</p>
            </div>

            <div class="image-placeholder" data-caption="Cross-section of a passive solar home showing heat flow patterns">
              [Image: Technical diagram of passive solar home with heat flow arrows]
            </div>

            <h3>Solar Geometry and Building Orientation</h3>

            <p>The Earth's 23.5 degree axial tilt creates seasonal variations in solar altitude (the sun's angle above the horizon). This is the foundation of passive solar design.</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-hs-q1">
              <p>"Understanding solar geometry is the first step in passive design - it tells us exactly where the sun will be at any hour of any day of the year."</p>
              <cite>— Ralph Knowles, Professor of Architecture, USC</cite>
            </blockquote>

            <div class="formula-box">
              <h4>Solar Altitude Angle</h4>
              <p>At solar noon on the solstices:</p>
              <ul>
                <li><strong>Winter:</strong> Altitude = 90 - Latitude - 23.5 degrees</li>
                <li><strong>Summer:</strong> Altitude = 90 - Latitude + 23.5 degrees</li>
              </ul>
              <p><em>Example: At 40 degrees N latitude, winter noon sun = 26.5 degrees, summer noon sun = 73.5 degrees</em></p>
            </div>

            <h3>Direct, Indirect, and Isolated Gain Systems</h3>

            <div class="systems-section">
              <div class="system">
                <h4>Direct Gain</h4>
                <p>Sunlight enters directly through windows and heats the interior thermal mass.</p>
                <ul>
                  <li>Simplest passive system</li>
                  <li>South-facing glazing with thermal mass floors/walls</li>
                  <li>Requires careful glare control</li>
                </ul>
              </div>

              <div class="image-placeholder" data-caption="Direct gain system showing sunlight heating a concrete floor">
                [Image: Diagram of direct gain passive solar system]
              </div>

              <div class="system">
                <h4>Indirect Gain (Trombe Wall)</h4>
                <p>A massive wall sits behind glass, absorbing heat and radiating it into the living space.</p>

                <blockquote class="scavenger-quote" data-quote-id="gb-hs-q2">
                  <p>"The Trombe wall acts as a thermal buffer - it absorbs solar radiation, stores it as heat, and releases it with a time delay of 8-10 hours."</p>
                  <cite>— Felix Trombe, French Engineer (inventor)</cite>
                </blockquote>

                <p>Trombe wall specifications:</p>
                <ul>
                  <li>Typically 8-16 inches thick (20-40 cm)</li>
                  <li>Dark-colored surface (high absorptivity)</li>
                  <li>Optional vents for convective circulation</li>
                  <li>Time lag: approximately 1 hour per inch of masonry thickness</li>
                </ul>
              </div>

              <div class="system">
                <h4>Isolated Gain (Sunspace)</h4>
                <p>A separate greenhouse space collects heat that is then distributed to the main building.</p>
                <ul>
                  <li>Can be closed off in extreme temperatures</li>
                  <li>Also provides growing space</li>
                  <li>Requires vents or fans for heat distribution</li>
                </ul>
              </div>
            </div>

            <h3>Heat Transfer Calculations</h3>

            <p>Understanding heat flow is essential for sizing passive solar systems.</p>

            <div class="formula-box">
              <h4>Key Equations</h4>

              <p><strong>Solar Heat Gain:</strong></p>
              <p>Q(solar) = I x A x SHGC x tau</p>
              <ul>
                <li>I = Solar irradiance (W/m squared)</li>
                <li>A = Window area (m squared)</li>
                <li>SHGC = Solar Heat Gain Coefficient</li>
                <li>tau = Shading factor (0-1)</li>
              </ul>

              <p><strong>Conductive Heat Loss:</strong></p>
              <p>Q(loss) = U x A x delta-T</p>
              <ul>
                <li>U = U-value (W/m squared K)</li>
                <li>A = Surface area (m squared)</li>
                <li>delta-T = Temperature difference (K or C)</li>
              </ul>

              <p><strong>Thermal Mass Storage:</strong></p>
              <p>Q(stored) = m x c x delta-T</p>
              <ul>
                <li>m = Mass (kg)</li>
                <li>c = Specific heat capacity (J/kg K)</li>
                <li>delta-T = Temperature change (K or C)</li>
              </ul>
            </div>

            <div class="image-placeholder" data-caption="Thermal properties comparison of common building materials">
              [Image: Chart comparing thermal mass properties of concrete, brick, stone, water]
            </div>

            <h3>Material Properties for Thermal Mass</h3>

            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Density (kg/m3)</th>
                  <th>Specific Heat (J/kg K)</th>
                  <th>Thermal Capacity (kJ/m3 K)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Concrete</td><td>2,400</td><td>880</td><td>2,112</td></tr>
                <tr><td>Brick</td><td>1,700</td><td>800</td><td>1,360</td></tr>
                <tr><td>Water</td><td>1,000</td><td>4,186</td><td>4,186</td></tr>
                <tr><td>Stone</td><td>2,500</td><td>900</td><td>2,250</td></tr>
                <tr><td>Adobe</td><td>1,550</td><td>900</td><td>1,395</td></tr>
              </tbody>
            </table>

            <blockquote class="scavenger-quote" data-quote-id="gb-hs-q3">
              <p>"Water has the highest heat capacity of any common material - a water wall stores twice as much heat per volume as concrete."</p>
              <cite>— Steve Baer, Solar Pioneer</cite>
            </blockquote>

            <h3>Overhang Design</h3>

            <p>Properly sized overhangs are critical for blocking summer sun while admitting winter sun.</p>

            <div class="formula-box">
              <h4>Overhang Sizing Formula</h4>
              <p>D = H / tan(alpha)</p>
              <ul>
                <li>D = Overhang depth</li>
                <li>H = Height from window top to overhang</li>
                <li>alpha = Solar altitude angle to block</li>
              </ul>
            </div>

            <p>Design goal: Block sun when altitude > 60 degrees (summer), admit when altitude < 35 degrees (winter)</p>

            <h3>Passive House Standard</h3>

            <p>The Passive House (Passivhaus) standard represents the most rigorous passive design certification:</p>

            <ul>
              <li>Heating demand: 15 kWh/m2/year or less</li>
              <li>Primary energy demand: 120 kWh/m2/year or less</li>
              <li>Airtightness: 0.6 ACH at 50 Pa or less</li>
            </ul>

            <blockquote class="scavenger-quote" data-quote-id="gb-hs-q4">
              <p>"A Passive House uses 90% less energy for heating than a typical building - that's not incremental improvement, it's a paradigm shift."</p>
              <cite>— Dr. Wolfgang Feist, Passive House Institute Founder</cite>
            </blockquote>

            <div class="chapter-summary">
              <h4>Key Engineering Concepts</h4>
              <ul>
                <li>Solar altitude varies from approximately 27 degrees (winter) to 74 degrees (summer) at mid-latitudes</li>
                <li>Three passive systems: Direct gain, Indirect gain (Trombe), Isolated gain (Sunspace)</li>
                <li>Heat transfer equations: Solar gain, conductive loss, thermal storage</li>
                <li>Water has 2x the thermal storage capacity of concrete by volume</li>
                <li>Passive House standard: 15 kWh/m2/year heating demand or less</li>
              </ul>
            </div>
          </div>`,

          UNDERGRADUATE: `<div class="lesson-content">
            <h2>Building Energy Analysis and Passive Design Integration</h2>

            <div class="intro-section">
              <p>At the undergraduate level, passive solar design is understood within the broader context of building energy systems. We analyze buildings as dynamic thermal systems, applying heat transfer theory, psychrometrics, and energy modeling to optimize passive performance.</p>
            </div>

            <div class="image-placeholder" data-caption="Energy flow diagram of a passive solar building showing all heat transfer mechanisms">
              [Image: Comprehensive energy balance diagram]
            </div>

            <h3>Building Energy Balance</h3>

            <p>A building's thermal behavior can be modeled as an energy balance equation:</p>

            <div class="equation-box">
              <p><strong>Steady-State Energy Balance:</strong></p>
              <p>Q(solar) + Q(internal) = Q(envelope) + Q(ventilation) + Q(infiltration)</p>
            </div>

            <blockquote class="scavenger-quote" data-quote-id="gb-ug-q1">
              <p>"Buildings are not static objects but dynamic thermal systems that respond to climate, occupancy, and time in complex ways."</p>
              <cite>— Dr. Gregg Ander, FAIA, Southern California Edison</cite>
            </blockquote>

            <h4>Heat Gain Components</h4>
            <ul>
              <li><strong>Solar gains Q(solar):</strong> Through glazing, opaque surfaces, and skylights</li>
              <li><strong>Internal gains Q(internal):</strong> Occupants (approximately 100W/person), lighting, equipment</li>
              <li><strong>HVAC gains:</strong> Intentional heating input (when needed)</li>
            </ul>

            <h4>Heat Loss Components</h4>
            <ul>
              <li><strong>Envelope losses Q(envelope):</strong> Through walls, roof, floor, windows</li>
              <li><strong>Ventilation Q(ventilation):</strong> Intentional air exchange</li>
              <li><strong>Infiltration Q(infiltration):</strong> Uncontrolled air leakage</li>
            </ul>

            <h3>Advanced Heat Transfer Analysis</h3>

            <div class="concept-section">
              <h4>Overall Heat Transfer Coefficient</h4>

              <p>For composite walls:</p>
              <div class="equation-box">
                <p>U = 1 / R(total)</p>
                <p>R(total) = R(si) + Sum(d(n)/lambda(n)) + R(so)</p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                    <th>Typical Values</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>R(si)</td><td>Internal surface resistance</td><td>0.13 m2K/W</td></tr>
                  <tr><td>R(so)</td><td>External surface resistance</td><td>0.04 m2K/W</td></tr>
                  <tr><td>d</td><td>Layer thickness</td><td>Variable (m)</td></tr>
                  <tr><td>lambda</td><td>Thermal conductivity</td><td>Material dependent (W/mK)</td></tr>
                </tbody>
              </table>
            </div>

            <div class="image-placeholder" data-caption="Thermal resistance model of a composite wall assembly">
              [Image: Diagram showing R-value layers through a wall section]
            </div>

            <h3>Glazing Performance Parameters</h3>

            <blockquote class="scavenger-quote" data-quote-id="gb-ug-q2">
              <p>"Window selection in passive solar design is a delicate balance - we want high solar heat gain in winter but low U-values to prevent heat loss."</p>
              <cite>— Stephen Selkowitz, LBNL Windows Research</cite>
            </blockquote>

            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Definition</th>
                  <th>Passive Solar Goal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U-value</td>
                  <td>Heat transfer coefficient</td>
                  <td>Low (less than 1.0 W/m2K for triple glazing)</td>
                </tr>
                <tr>
                  <td>SHGC</td>
                  <td>Solar Heat Gain Coefficient</td>
                  <td>High for south glass (greater than 0.5), Low for west (less than 0.3)</td>
                </tr>
                <tr>
                  <td>VT</td>
                  <td>Visible Transmittance</td>
                  <td>High for daylighting (greater than 0.5)</td>
                </tr>
                <tr>
                  <td>LSG</td>
                  <td>Light-to-Solar Gain ratio (VT/SHGC)</td>
                  <td>Greater than 1.0 for cooling climates</td>
                </tr>
              </tbody>
            </table>

            <h3>Building Energy Modeling</h3>

            <p>Modern passive solar design relies on simulation tools for performance prediction:</p>

            <div class="tools-section">
              <h4>Industry-Standard Software</h4>
              <ul>
                <li><strong>EnergyPlus:</strong> DOE's flagship whole-building simulation engine</li>
                <li><strong>PHPP:</strong> Passive House Planning Package - spreadsheet-based</li>
                <li><strong>DesignBuilder:</strong> GUI front-end for EnergyPlus</li>
                <li><strong>WUFI:</strong> Hygrothermal analysis (moisture + heat)</li>
                <li><strong>Radiance:</strong> Daylighting simulation</li>
              </ul>
            </div>

            <div class="image-placeholder" data-caption="EnergyPlus simulation output showing annual heating and cooling loads">
              [Image: Graph of monthly energy demands from building simulation]
            </div>

            <h3>Thermal Comfort Considerations</h3>

            <p>Passive solar buildings must maintain occupant comfort without mechanical systems:</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-ug-q3">
              <p>"Thermal comfort in passive buildings follows adaptive principles - occupants accept wider temperature ranges when they have control over their environment."</p>
              <cite>— Dr. Gail Brager, UC Berkeley Center for the Built Environment</cite>
            </blockquote>

            <div class="concept-section">
              <h4>Adaptive Comfort Model (ASHRAE 55)</h4>
              <p>T(comfort) = 0.31 x T(outdoor,mean) + 17.8 degrees C (plus or minus 3.5 degrees C acceptability range)</p>
              <p>Applicable to naturally ventilated buildings where occupants can open windows.</p>
            </div>

            <h3>Daylighting Integration</h3>

            <p>Passive solar glazing must balance thermal performance with daylight quality:</p>

            <ul>
              <li><strong>Daylight Factor (DF):</strong> Target 2-5% for most spaces</li>
              <li><strong>Spatial Daylight Autonomy (sDA):</strong> Percentage of space with 300 lux for 50% of occupied hours</li>
              <li><strong>Annual Sunlight Exposure (ASE):</strong> Glare metric - less than 10% area receiving 1000 lux for 250+ hours</li>
            </ul>

            <h3>Climate-Specific Design Strategies</h3>

            <table>
              <thead>
                <tr>
                  <th>Climate Zone</th>
                  <th>Primary Strategy</th>
                  <th>Key Metrics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Heating-dominated (4000+ HDD)</td>
                  <td>Maximize solar gain, super insulation</td>
                  <td>High SHGC south, low U-values</td>
                </tr>
                <tr>
                  <td>Cooling-dominated (2000+ CDD)</td>
                  <td>Minimize gain, natural ventilation</td>
                  <td>Low SHGC all orientations, shading</td>
                </tr>
                <tr>
                  <td>Mixed (similar HDD/CDD)</td>
                  <td>Seasonal switching strategies</td>
                  <td>Moderate SHGC, operable shading</td>
                </tr>
              </tbody>
            </table>

            <blockquote class="scavenger-quote" data-quote-id="gb-ug-q4">
              <p>"The first law of sustainable design: Don't fight the climate - work with it. Every climate has free energy available; our job is to capture it."</p>
              <cite>— Dr. Vivian Loftness, Carnegie Mellon University</cite>
            </blockquote>

            <div class="chapter-summary">
              <h4>Technical Summary</h4>
              <ul>
                <li>Building energy analysis uses steady-state and dynamic balance equations</li>
                <li>Composite wall R-value includes surface resistances and material layers</li>
                <li>Glazing selection balances U-value, SHGC, and VT for specific orientations</li>
                <li>Energy modeling tools (EnergyPlus, PHPP) enable performance prediction</li>
                <li>Adaptive comfort standards allow wider temperature ranges in passive buildings</li>
                <li>Design strategies must be tailored to specific climate zones</li>
              </ul>
            </div>
          </div>`,

          GRADUATE: `<div class="lesson-content">
            <h2>Advanced Passive Strategies and Performance Optimization</h2>

            <div class="intro-section">
              <p>Graduate-level study of passive solar design extends beyond individual buildings to consider urban-scale implications, advanced modeling techniques, integration with active systems, and the policy frameworks that enable widespread adoption. We examine passive design through the lens of building physics research and real-world performance data.</p>
            </div>

            <div class="image-placeholder" data-caption="Urban-scale passive solar planning showing building spacing for solar access">
              [Image: 3D model of neighborhood showing solar envelope analysis]
            </div>

            <h3>Performance Gap Analysis</h3>

            <p>A critical issue in passive building research is the discrepancy between predicted and actual performance:</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-grad-q1">
              <p>"Post-occupancy studies consistently show a 'performance gap' of 30-150% between designed and actual energy use. Understanding why is essential for advancing passive design."</p>
              <cite>— Dr. Rajat Gupta, Oxford Brookes University</cite>
            </blockquote>

            <div class="concept-section">
              <h4>Sources of Performance Gap</h4>
              <ul>
                <li><strong>Modeling assumptions:</strong> Standard schedules vs. actual occupancy</li>
                <li><strong>Construction quality:</strong> Thermal bridges, air leakage paths</li>
                <li><strong>Commissioning failures:</strong> Controls not optimized</li>
                <li><strong>Occupant behavior:</strong> Window operation, thermostat settings</li>
                <li><strong>Climate data:</strong> TMY vs. actual weather</li>
              </ul>
            </div>

            <h3>Dynamic Thermal Modeling</h3>

            <p>Advanced passive design requires time-varying analysis beyond steady-state calculations:</p>

            <div class="equation-box">
              <h4>Thermal Network Model</h4>
              <p>C(dT/dt) = Q(gains) - Sum(UA)(T - T(adj))</p>
              <p>Where C = thermal capacitance, capturing the dynamic response of thermal mass.</p>
            </div>

            <div class="image-placeholder" data-caption="Thermal network model showing RC circuits representing building zones">
              [Image: Resistance-capacitance thermal network diagram]
            </div>

            <h4>Key Dynamic Parameters</h4>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Definition</th>
                  <th>Significance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Time Constant (tau)</td>
                  <td>RC product of zone</td>
                  <td>How quickly zone responds to changes</td>
                </tr>
                <tr>
                  <td>Decrement Factor</td>
                  <td>Ratio of inside to outside temp amplitude</td>
                  <td>Damping of external temperature swings</td>
                </tr>
                <tr>
                  <td>Thermal Lag</td>
                  <td>Time shift of peak temperature</td>
                  <td>Can shift cooling load off-peak</td>
                </tr>
                <tr>
                  <td>Admittance</td>
                  <td>Heat flux per unit temp swing</td>
                  <td>Effectiveness at moderating swings</td>
                </tr>
              </tbody>
            </table>

            <h3>Natural Ventilation Engineering</h3>

            <p>Passive cooling through natural ventilation requires careful engineering analysis:</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-grad-q2">
              <p>"Natural ventilation is not the absence of mechanical systems - it's a sophisticated engineering approach that requires as much analysis as HVAC design."</p>
              <cite>— Dr. Malcolm Cook, Loughborough University</cite>
            </blockquote>

            <div class="concept-section">
              <h4>Driving Forces</h4>

              <p><strong>Wind-driven (Cross Ventilation):</strong></p>
              <div class="equation-box">
                <p>Q = Cd x A x v x sqrt(delta-Cp)</p>
              </div>

              <p><strong>Buoyancy-driven (Stack Effect):</strong></p>
              <div class="equation-box">
                <p>Q = Cd x A x sqrt(2gh(Ti-To)/To)</p>
              </div>

              <p>Design must account for both forces, which may work together or oppose each other.</p>
            </div>

            <h3>Phase Change Materials (PCM)</h3>

            <p>Advanced thermal mass using latent heat storage:</p>

            <div class="image-placeholder" data-caption="Phase change material integration in wall assembly showing melting/solidifying cycle">
              [Image: Diagram of PCM wall panel with temperature cycle]
            </div>

            <table>
              <thead>
                <tr>
                  <th>PCM Type</th>
                  <th>Melting Point</th>
                  <th>Latent Heat</th>
                  <th>Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paraffin waxes</td>
                  <td>20-30 degrees C</td>
                  <td>150-200 kJ/kg</td>
                  <td>Wall panels, ceiling tiles</td>
                </tr>
                <tr>
                  <td>Salt hydrates</td>
                  <td>18-32 degrees C</td>
                  <td>150-250 kJ/kg</td>
                  <td>Thermal storage units</td>
                </tr>
                <tr>
                  <td>Bio-based PCM</td>
                  <td>21-28 degrees C</td>
                  <td>140-180 kJ/kg</td>
                  <td>Sustainable alternatives</td>
                </tr>
              </tbody>
            </table>

            <blockquote class="scavenger-quote" data-quote-id="gb-grad-q3">
              <p>"A 1cm layer of PCM can provide equivalent thermal storage to 9cm of concrete, enabling high thermal mass in lightweight construction."</p>
              <cite>— Dr. Luisa Cabeza, University of Lleida</cite>
            </blockquote>

            <h3>Urban Solar Access and Solar Envelopes</h3>

            <p>At the urban scale, passive solar design requires consideration of overshadowing:</p>

            <div class="concept-section">
              <h4>Solar Envelope Method (Knowles)</h4>
              <p>The solar envelope defines the maximum buildable volume that won't overshadow neighboring properties during specified hours.</p>

              <ul>
                <li><strong>Cut-off times:</strong> Typically 9am-3pm on winter solstice</li>
                <li><strong>Factors:</strong> Latitude, street orientation, setbacks, desired shadow fence</li>
                <li><strong>Tools:</strong> Ladybug/Honeybee, Rhino + Grasshopper, Autodesk Revit plugins</li>
              </ul>
            </div>

            <h3>Policy and Standards Framework</h3>

            <p>Passive design is increasingly codified in building regulations:</p>

            <table>
              <thead>
                <tr>
                  <th>Standard/Policy</th>
                  <th>Region</th>
                  <th>Key Requirements</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Passive House (PHI)</td>
                  <td>International</td>
                  <td>15 kWh/m2a heating, 0.6 ACH50</td>
                </tr>
                <tr>
                  <td>PHIUS+</td>
                  <td>North America</td>
                  <td>Climate-specific, source energy limits</td>
                </tr>
                <tr>
                  <td>nZEB (EPBD)</td>
                  <td>European Union</td>
                  <td>Near-zero energy, high renewables</td>
                </tr>
                <tr>
                  <td>NatHERS</td>
                  <td>Australia</td>
                  <td>Star ratings based on thermal performance</td>
                </tr>
              </tbody>
            </table>

            <blockquote class="scavenger-quote" data-quote-id="gb-grad-q4">
              <p>"Building codes are the floor, not the ceiling. The Passive House standard shows what's technically and economically achievable today."</p>
              <cite>— Katrin Klingenberg, PHIUS Executive Director</cite>
            </blockquote>

            <h3>Research Frontiers</h3>

            <ul>
              <li><strong>Machine learning for controls:</strong> Predictive algorithms for optimal window/shading operation</li>
              <li><strong>Occupant-centric design:</strong> Personal comfort systems, adaptive opportunities</li>
              <li><strong>Resilience:</strong> Passive survivability during grid outages</li>
              <li><strong>Embodied carbon integration:</strong> Balancing operational and embodied impacts</li>
              <li><strong>Climate change adaptation:</strong> Future-proofing designs for shifting climate zones</li>
            </ul>

            <div class="chapter-summary">
              <h4>Graduate-Level Synthesis</h4>
              <ul>
                <li>Performance gap analysis reveals disconnect between predicted and actual energy use</li>
                <li>Dynamic thermal modeling captures time-varying behavior of thermal mass</li>
                <li>Natural ventilation design requires engineering analysis of wind and buoyancy forces</li>
                <li>Phase change materials offer high thermal storage density for lightweight construction</li>
                <li>Urban-scale solar access planning uses solar envelope methodology</li>
                <li>International standards (PHI, PHIUS+, nZEB) are driving passive adoption</li>
              </ul>
            </div>
          </div>`,

          PHD: `<div class="lesson-content">
            <h2>Building Physics Research and Next-Generation Passive Technologies</h2>

            <div class="intro-section">
              <p>Doctoral research in passive solar design pushes the boundaries of building physics, developing novel materials and systems while critically examining assumptions underlying current practice. This lesson surveys active research frontiers, emerging technologies, and the methodological frameworks used to advance the field.</p>
            </div>

            <div class="image-placeholder" data-caption="Research laboratory testing advanced glazing systems with spectrophotometry">
              [Image: Photo of building science research laboratory]
            </div>

            <h3>Challenging Fundamental Assumptions</h3>

            <p>Doctoral inquiry begins by questioning established paradigms:</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-phd-q1">
              <p>"The passive solar principles developed in the 1970s were revolutionary, but they assumed a stable climate. We must now ask: how do we design passive systems for a climate that's actively changing?"</p>
              <cite>— Dr. Shady Attia, University of Liege</cite>
            </blockquote>

            <div class="research-questions">
              <h4>Open Research Questions</h4>
              <ul>
                <li>How will shifting climate zones affect the viability of current passive strategies?</li>
                <li>Can passive buildings maintain comfort during extreme weather events?</li>
                <li>How do we model occupant behavior in passive buildings at scale?</li>
                <li>What is the true lifecycle carbon balance of high-performance passive envelopes?</li>
                <li>How can passive principles be applied equitably across socioeconomic contexts?</li>
              </ul>
            </div>

            <h3>Advanced Glazing Research</h3>

            <p>Window technology is a critical research frontier, seeking to overcome the inherent tradeoffs in static glazing:</p>

            <div class="technology-section">
              <h4>Dynamic Glazing Technologies</h4>

              <table>
                <thead>
                  <tr>
                    <th>Technology</th>
                    <th>Mechanism</th>
                    <th>Current Research Focus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Electrochromic</td>
                    <td>Voltage-induced ion migration</td>
                    <td>Switching speed, durability, independent VT/SHGC control</td>
                  </tr>
                  <tr>
                    <td>Thermochromic</td>
                    <td>Temperature-triggered phase change</td>
                    <td>Transition temperature tuning, hysteresis reduction</td>
                  </tr>
                  <tr>
                    <td>Photochromic</td>
                    <td>Light-activated darkening</td>
                    <td>Spectral selectivity, fatigue resistance</td>
                  </tr>
                  <tr>
                    <td>PDLC</td>
                    <td>Polymer-dispersed liquid crystals</td>
                    <td>Privacy + thermal control, energy consumption</td>
                  </tr>
                  <tr>
                    <td>SPD</td>
                    <td>Suspended particle devices</td>
                    <td>Response time, uniformity at large scale</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="image-placeholder" data-caption="Spectral transmittance curves for electrochromic glazing in clear and tinted states">
              [Image: Graph showing wavelength vs transmittance for EC glazing states]
            </div>

            <blockquote class="scavenger-quote" data-quote-id="gb-phd-q2">
              <p>"The holy grail of glazing research is independent control of visible light and infrared radiation - admitting daylight while rejecting or admitting heat as needed."</p>
              <cite>— Dr. Ariel Liebman, MIT Department of Mechanical Engineering</cite>
            </blockquote>

            <h3>Computational Fluid Dynamics in Natural Ventilation</h3>

            <p>CFD modeling enables detailed airflow analysis but presents significant methodological challenges:</p>

            <div class="concept-section">
              <h4>Modeling Considerations</h4>
              <ul>
                <li><strong>Turbulence models:</strong> RANS (k-epsilon, k-omega, SST) vs. LES trade-offs</li>
                <li><strong>Boundary conditions:</strong> ABL profiles, pressure coefficients from wind tunnel</li>
                <li><strong>Grid resolution:</strong> Y+ requirements for near-wall treatment</li>
                <li><strong>Validation:</strong> Full-scale measurement vs. scaled wind tunnel studies</li>
                <li><strong>Coupled simulation:</strong> Thermal-airflow coupling, multizone-CFD integration</li>
              </ul>
            </div>

            <div class="equation-box">
              <h4>Reynolds-Averaged Navier-Stokes (RANS)</h4>
              <p>The governing equations for turbulent flow simulation require closure models for the Reynolds stress term.</p>
            </div>

            <h3>Thermal Comfort Beyond PMV/PPD</h3>

            <p>Passive buildings challenge conventional comfort models:</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-phd-q3">
              <p>"Fanger's PMV model was developed for air-conditioned spaces. In passive buildings, psychological adaptation, perceived control, and air movement preferences fundamentally change comfort equations."</p>
              <cite>— Dr. Richard de Dear, University of Sydney</cite>
            </blockquote>

            <div class="concept-section">
              <h4>Emerging Comfort Frameworks</h4>
              <ul>
                <li><strong>Adaptive comfort:</strong> Context-dependent expectations (ASHRAE 55, EN 16798)</li>
                <li><strong>Alliesthesia:</strong> Pleasure from dynamic thermal stimulation</li>
                <li><strong>Personal comfort models:</strong> ML-based individual prediction</li>
                <li><strong>Non-uniform environments:</strong> Local body segment analysis</li>
                <li><strong>Multimodal comfort:</strong> Integration of thermal, visual, acoustic factors</li>
              </ul>
            </div>

            <h3>Building-Integrated Photovoltaics (BIPV)</h3>

            <p>The integration of passive design with active solar generation presents research opportunities:</p>

            <div class="image-placeholder" data-caption="Semi-transparent BIPV glazing showing visible light transmission and power generation">
              [Image: Photo of building with semi-transparent PV glazing]
            </div>

            <table>
              <thead>
                <tr>
                  <th>BIPV Type</th>
                  <th>Efficiency Range</th>
                  <th>Research Challenges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Crystalline Si modules</td>
                  <td>18-22%</td>
                  <td>Thermal effects on efficiency, aesthetics</td>
                </tr>
                <tr>
                  <td>Thin film (CIGS, CdTe)</td>
                  <td>12-16%</td>
                  <td>Flexible integration, color options</td>
                </tr>
                <tr>
                  <td>Semi-transparent (a-Si)</td>
                  <td>6-10%</td>
                  <td>Balancing VT, SHGC, and power output</td>
                </tr>
                <tr>
                  <td>Perovskite</td>
                  <td>15-25%+</td>
                  <td>Stability, scalability, toxicity</td>
                </tr>
                <tr>
                  <td>DSC (dye-sensitized)</td>
                  <td>8-12%</td>
                  <td>Long-term stability, color tuning</td>
                </tr>
              </tbody>
            </table>

            <h3>Machine Learning in Passive Design</h3>

            <p>AI/ML methods are transforming passive building research:</p>

            <div class="concept-section">
              <h4>Applications</h4>
              <ul>
                <li><strong>Surrogate modeling:</strong> Fast approximations of detailed simulations for optimization</li>
                <li><strong>Occupancy prediction:</strong> Learning patterns for predictive control</li>
                <li><strong>Fault detection:</strong> Identifying performance degradation in passive systems</li>
                <li><strong>Generative design:</strong> ML-guided exploration of design space</li>
                <li><strong>Digital twins:</strong> Continuous model calibration with real-time data</li>
              </ul>
            </div>

            <blockquote class="scavenger-quote" data-quote-id="gb-phd-q4">
              <p>"Machine learning doesn't replace physics-based models - it augments them. The future is hybrid models that combine physical understanding with data-driven calibration."</p>
              <cite>— Dr. Zoltan Nagy, University of Texas at Austin</cite>
            </blockquote>

            <h3>Resilience and Climate Adaptation</h3>

            <p>Critical research examines passive building performance during extreme events:</p>

            <div class="concept-section">
              <h4>Passive Survivability</h4>
              <p>The ability of a building to maintain habitable conditions during extended power outages.</p>

              <ul>
                <li><strong>Thermal autonomy:</strong> Hours a building stays habitable without HVAC</li>
                <li><strong>Critical thresholds:</strong> Wet-bulb temperatures for physiological limits</li>
                <li><strong>Vulnerable populations:</strong> Age, health status, mobility considerations</li>
                <li><strong>Future climate scenarios:</strong> RCP 4.5, RCP 8.5 projections</li>
              </ul>
            </div>

            <h3>Methodological Frameworks</h3>

            <p>Doctoral research requires rigorous methodological approaches:</p>

            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Application</th>
                  <th>Key Considerations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Field monitoring</td>
                  <td>Performance validation</td>
                  <td>Sensor accuracy, temporal resolution, privacy</td>
                </tr>
                <tr>
                  <td>Test cell experiments</td>
                  <td>Controlled component testing</td>
                  <td>Scaling laws, environmental chamber limits</td>
                </tr>
                <tr>
                  <td>Parametric simulation</td>
                  <td>Sensitivity analysis</td>
                  <td>Uncertainty propagation, model validation</td>
                </tr>
                <tr>
                  <td>Multi-objective optimization</td>
                  <td>Design space exploration</td>
                  <td>Pareto front interpretation, computational cost</td>
                </tr>
                <tr>
                  <td>LCA/LCC</td>
                  <td>Lifecycle impacts</td>
                  <td>System boundaries, data quality, allocation</td>
                </tr>
              </tbody>
            </table>

            <div class="chapter-summary">
              <h4>Research Frontiers Summary</h4>
              <ul>
                <li>Climate change challenges foundational assumptions of passive design</li>
                <li>Dynamic glazing research seeks independent control of visible and infrared radiation</li>
                <li>CFD modeling of natural ventilation requires careful turbulence model selection</li>
                <li>Comfort research is moving beyond PMV to adaptive and personal models</li>
                <li>BIPV integration balances energy generation with passive design functions</li>
                <li>Machine learning enables hybrid physics-data modeling approaches</li>
                <li>Resilience research examines passive survivability under extreme conditions</li>
              </ul>
            </div>
          </div>`
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
            ELEMENTARY: 'According to Sunny, where is the best heater already located?',
            MIDDLE_SCHOOL: 'What does Edward Mazria say passive solar design is about?',
            HIGH_SCHOOL: 'According to Ralph Knowles, what is the first step in passive design?',
            UNDERGRADUATE: 'What does Dr. Gregg Ander say buildings are?',
            GRADUATE: 'According to Dr. Rajat Gupta, what percentage is the typical performance gap?',
            PHD: 'What does Dr. Shady Attia say the 1970s passive principles assumed?'
          },
          options: {
            ELEMENTARY: ['In the sky', 'Underground', 'In the walls', 'In the basement'],
            MIDDLE_SCHOOL: ['Cooperation with nature', 'Fighting against nature', 'Using lots of machines', 'Building underground'],
            HIGH_SCHOOL: ['Understanding solar geometry', 'Buying expensive materials', 'Using thick walls', 'Installing air conditioning'],
            UNDERGRADUATE: ['Dynamic thermal systems', 'Static objects', 'Simple boxes', 'Unchanging structures'],
            GRADUATE: ['30-150%', '5-10%', '1-2%', '200-300%'],
            PHD: ['A stable climate', 'Cheap energy forever', 'No building codes', 'Unlimited materials']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Sunny said "The best heater is already in the sky - we just need to invite it inside!"',
            MIDDLE_SCHOOL: 'Mazria said passive solar design is about "cooperation with nature - letting the building itself do the work."',
            HIGH_SCHOOL: 'Knowles said "Understanding solar geometry is the first step in passive design."',
            UNDERGRADUATE: 'Dr. Ander said "Buildings are not static objects but dynamic thermal systems."',
            GRADUATE: 'Dr. Gupta noted that post-occupancy studies show a performance gap of 30-150%.',
            PHD: 'Dr. Attia pointed out that 1970s passive principles assumed a stable climate that is now changing.'
          }
        },
        {
          id: 'pq2',
          question: {
            ELEMENTARY: 'What did Mr. Chen compare a house that faces the sun to?',
            MIDDLE_SCHOOL: 'What does Dr. Sarah Chen call thermal mass?',
            HIGH_SCHOOL: 'How long does Felix Trombe say a Trombe wall delays heat release?',
            UNDERGRADUATE: 'What does Stephen Selkowitz say window selection requires?',
            GRADUATE: 'According to Dr. Malcolm Cook, what does natural ventilation require?',
            PHD: 'What does Dr. Ariel Liebman call the "holy grail" of glazing research?'
          },
          options: {
            ELEMENTARY: ['A flower', 'A car', 'A computer', 'A refrigerator'],
            MIDDLE_SCHOOL: ['Nature\'s thermostat', 'A heater', 'An air conditioner', 'A fan'],
            HIGH_SCHOOL: ['8-10 hours', '1-2 minutes', '24 hours', '1 week'],
            UNDERGRADUATE: ['A delicate balance', 'Random choices', 'The cheapest option', 'Maximum size always'],
            GRADUATE: ['As much analysis as HVAC design', 'No engineering at all', 'Just opening windows', 'Basic calculations only'],
            PHD: ['Independent control of visible light and infrared', 'Darker glass', 'Thicker panes', 'Smaller windows']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Mr. Chen said "A house that faces the sun is like a flower - it opens up to warmth and life!"',
            MIDDLE_SCHOOL: 'Dr. Chen called thermal mass "nature\'s thermostat" that smooths out temperature swings.',
            HIGH_SCHOOL: 'Trombe said his wall "releases heat with a time delay of 8-10 hours."',
            UNDERGRADUATE: 'Selkowitz said window selection is "a delicate balance" between solar gain and heat loss.',
            GRADUATE: 'Dr. Cook said natural ventilation "requires as much analysis as HVAC design."',
            PHD: 'Dr. Liebman called independent control of light and heat "the holy grail of glazing research."'
          }
        },
        {
          id: 'pq3',
          question: {
            ELEMENTARY: 'What does Grandpa Joe say the sun does differently in summer and winter?',
            MIDDLE_SCHOOL: 'What did Michael Reynolds say Earthships don\'t need?',
            HIGH_SCHOOL: 'According to Steve Baer, how does water compare to concrete for heat storage?',
            UNDERGRADUATE: 'What does Dr. Gail Brager say about thermal comfort in passive buildings?',
            GRADUATE: 'What does Dr. Luisa Cabeza say about 1cm of PCM compared to concrete?',
            PHD: 'What does Dr. Richard de Dear say Fanger\'s PMV model was developed for?'
          },
          options: {
            ELEMENTARY: ['Takes a high path in summer, low path in winter', 'Disappears in winter', 'Is brighter in summer', 'Changes color'],
            MIDDLE_SCHOOL: ['To be hooked up to utilities', 'Windows', 'Doors', 'A roof'],
            HIGH_SCHOOL: ['Water stores twice as much heat per volume', 'Concrete stores more heat', 'They are equal', 'Water loses heat faster'],
            UNDERGRADUATE: ['Occupants accept wider temperature ranges with control', 'It must be exactly 72F', 'No comfort is possible', 'Only machines work'],
            GRADUATE: ['Equivalent to 9cm of concrete', 'Half as effective', 'The same thermal storage', 'Ten times worse'],
            PHD: ['Air-conditioned spaces', 'Passive buildings', 'Outdoor spaces', 'Hot climates only']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Grandpa Joe explained that "the sun takes a high path in summer and a low path in winter."',
            MIDDLE_SCHOOL: 'Reynolds said Earthships don\'t need "to be hooked up to any utilities."',
            HIGH_SCHOOL: 'Baer said "water stores twice as much heat per volume as concrete."',
            UNDERGRADUATE: 'Dr. Brager said "occupants accept wider temperature ranges when they have control."',
            GRADUATE: 'Dr. Cabeza said "1cm of PCM can provide equivalent thermal storage to 9cm of concrete."',
            PHD: 'Dr. de Dear noted that Fanger\'s PMV model was developed for air-conditioned spaces, not passive buildings.'
          }
        },
        {
          id: 'pq4',
          question: {
            ELEMENTARY: 'What did Maya\'s Mom say happens when we build with nature?',
            MIDDLE_SCHOOL: 'According to Ken Yeang, what is the best building?',
            HIGH_SCHOOL: 'What does Dr. Wolfgang Feist say about Passive House energy use?',
            UNDERGRADUATE: 'What does Dr. Vivian Loftness call the first law of sustainable design?',
            GRADUATE: 'What does Katrin Klingenberg say building codes are?',
            PHD: 'What does Dr. Zoltan Nagy say about machine learning and physics models?'
          },
          options: {
            ELEMENTARY: ['Everyone wins - people, planet, and pocketbooks', 'It costs more money', 'Buildings fall down', 'Nothing changes'],
            MIDDLE_SCHOOL: ['One designed for its specific place on Earth', 'The biggest one', 'The most expensive one', 'A copy of other buildings'],
            HIGH_SCHOOL: ['90% less energy than typical buildings', '10% less energy', 'The same energy', 'More energy'],
            UNDERGRADUATE: ['Don\'t fight the climate - work with it', 'Use maximum energy', 'Ignore the weather', 'Build the same everywhere'],
            GRADUATE: ['The floor, not the ceiling', 'The maximum requirement', 'Unnecessary', 'Too strict'],
            PHD: ['ML augments physics models, doesn\'t replace them', 'ML replaces physics entirely', 'Physics is outdated', 'They cannot work together']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Maya\'s Mom said "When we build with nature instead of against it, everyone wins!"',
            MIDDLE_SCHOOL: 'Yeang said "The best building is one designed for its specific place on Earth."',
            HIGH_SCHOOL: 'Dr. Feist said "A Passive House uses 90% less energy for heating than a typical building."',
            UNDERGRADUATE: 'Dr. Loftness called it "Don\'t fight the climate - work with it."',
            GRADUATE: 'Klingenberg said "Building codes are the floor, not the ceiling."',
            PHD: 'Dr. Nagy said "Machine learning doesn\'t replace physics-based models - it augments them."'
          }
        },
        {
          id: 'pq5',
          question: {
            ELEMENTARY: 'What does a roof overhang do in the summer?',
            MIDDLE_SCHOOL: 'What are the five principles of passive solar design?',
            HIGH_SCHOOL: 'What is the Passive House heating demand standard?',
            UNDERGRADUATE: 'What does the Adaptive Comfort Model allow in passive buildings?',
            GRADUATE: 'What forces drive natural ventilation?',
            PHD: 'What is "passive survivability"?'
          },
          options: {
            ELEMENTARY: ['Blocks the high summer sun', 'Lets in more sun', 'Makes noise', 'Collects rainwater'],
            MIDDLE_SCHOOL: ['Orientation, Glazing, Thermal Mass, Insulation, Shading', 'Windows, Doors, Walls, Roof, Floor', 'Heat, Cool, Light, Air, Water', 'Sun, Moon, Stars, Earth, Wind'],
            HIGH_SCHOOL: ['15 kWh/m2/year or less', '100 kWh/m2/year', '500 kWh/m2/year', 'No limit'],
            UNDERGRADUATE: ['Wider acceptable temperature ranges', 'Exact 72F always', 'Narrower ranges', 'No thermal comfort'],
            GRADUATE: ['Wind pressure and buoyancy (stack effect)', 'Only mechanical fans', 'Only wind', 'Only temperature'],
            PHD: ['Maintaining habitable conditions during power outages', 'Building without permits', 'Using no materials', 'Surviving construction']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'A roof overhang blocks the high summer sun but lets the low winter sun in!',
            MIDDLE_SCHOOL: 'The five principles are Orientation, Glazing, Thermal Mass, Insulation, and Shading.',
            HIGH_SCHOOL: 'The Passive House standard requires heating demand of 15 kWh/m2/year or less.',
            UNDERGRADUATE: 'The Adaptive Comfort Model allows occupants to accept wider temperature ranges.',
            GRADUATE: 'Natural ventilation is driven by wind pressure (cross ventilation) and buoyancy (stack effect).',
            PHD: 'Passive survivability is the ability to maintain habitable conditions during extended power outages.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Passive House Institute', url: 'https://passivehouse.com/', type: 'research' },
      { title: 'DOE Building Technologies Office', url: 'https://www.energy.gov/eere/buildings', type: 'article' },
      { title: 'Whole Building Design Guide - Passive Solar Heating', url: 'https://www.wbdg.org/resources/passive-solar-heating', type: 'article' }
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
          ELEMENTARY: `<div class="lesson-content">
            <h2>Building with Nature's Gifts</h2>

            <div class="story-intro">
              <p>Have you ever built a fort out of sticks or a sandcastle at the beach? People have been building with things from nature for thousands of years! Let's meet some amazing natural building materials.</p>
            </div>

            <div class="image-placeholder" data-caption="Children exploring different natural building materials like wood, straw, and bamboo">
              [Image: Kids touching and examining various natural materials]
            </div>

            <h3>Chapter 1: Mighty Bamboo - The Super Grass</h3>

            <p>Did you know that bamboo is actually a type of GRASS? But it's not like the grass in your yard - some bamboo grows taller than a 10-story building!</p>

            <div class="key-concept">
              <h4>Bamboo Superpowers</h4>
              <ul>
                <li>Grows up to 3 feet in ONE DAY (that's faster than you can watch it!)</li>
                <li>Stronger than steel for its weight</li>
                <li>Grows back after you cut it - no need to replant!</li>
                <li>Pandas love to eat it (but we use a different kind for building)</li>
              </ul>
            </div>

            <p>In many countries like China, Japan, and Colombia, people build entire houses from bamboo. It's like nature's own building kit!</p>

            <div class="image-placeholder" data-caption="A beautiful bamboo house showing the natural golden color of bamboo poles">
              [Image: Modern bamboo house with curved roof]
            </div>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-elem-q1">
              <p>"Bamboo is the green steel of the 21st century - it grows from the earth and returns to the earth."</p>
              <cite>— Simon Velez, Bamboo Architect</cite>
            </blockquote>

            <h3>Chapter 2: Straw - Not Just for Scarecrows!</h3>

            <p>After farmers harvest wheat, rice, or oats, the leftover stalks are called straw. Instead of burning it or throwing it away, we can build with it!</p>

            <div class="fun-fact">
              <h4>Did You Know?</h4>
              <p>Straw bale houses are NOT like the straw house in "The Three Little Pigs"! Real straw bale walls are covered in plaster and are actually STRONGER and more fire-resistant than regular walls!</p>
            </div>

            <p>Straw bales are like giant nature LEGOs. You stack them up, push wooden stakes through them, and cover them with mud plaster. The thick walls keep houses cool in summer and warm in winter!</p>

            <div class="image-placeholder" data-caption="Workers stacking golden straw bales to build a wall">
              [Image: Construction of a straw bale wall]
            </div>

            <h3>Chapter 3: Wood - The Classic Choice</h3>

            <p>Wood has been used to build homes for thousands of years. But here's what makes it extra special for our planet:</p>

            <div class="key-concept">
              <h4>Wood's Earth-Saving Secret</h4>
              <p>Trees breathe in carbon dioxide (the gas that's warming our planet) and store it in their wood. When we build with wood, we're locking that carbon away! It's like the tree keeps doing its job even after it becomes a house.</p>
            </div>

            <p>The best part? We can plant new trees to replace the ones we use. That's called sustainable forestry - it means there will always be more trees!</p>

            <div class="activity-box">
              <h4>Try This!</h4>
              <p>Look around your home. How many things are made of wood? Count the wooden furniture, doors, floors, and decorations. Wood is everywhere!</p>
            </div>

            <h3>Chapter 4: Earth and Mud - Ancient Wisdom</h3>

            <p>The ground beneath your feet can become a house! People have built with earth for over 10,000 years.</p>

            <div class="image-placeholder" data-caption="Ancient adobe buildings in a desert landscape, still standing after hundreds of years">
              [Image: Traditional adobe pueblo village]
            </div>

            <p><strong>Adobe bricks</strong> are made by mixing mud, water, and straw, then drying them in the sun. No ovens or factories needed!</p>

            <p><strong>Rammed earth</strong> walls are made by pounding dirt between wooden forms until it's hard as rock. These walls can last for CENTURIES!</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-elem-q2">
              <p>"Building with earth connects us to our ancestors and to the land itself. It's the original green building material!"</p>
              <cite>— Nader Khalili, Earth Architect</cite>
            </blockquote>

            <h3>Chapter 5: Recycled Materials - Giving Trash a Second Life</h3>

            <p>Some of the coolest building materials come from things people throw away!</p>

            <ul>
              <li><strong>Old plastic bottles</strong> can be filled with sand and stacked like bricks</li>
              <li><strong>Used tires</strong> packed with earth make super-strong walls</li>
              <li><strong>Crushed glass</strong> can be mixed into countertops that sparkle</li>
              <li><strong>Old blue jeans</strong> become fluffy insulation to keep houses warm</li>
            </ul>

            <div class="fun-fact">
              <h4>Cool Building Fact!</h4>
              <p>A house in Canada was built using over 600,000 recycled plastic bottles! The bottles were filled with sand and stacked with mortar, just like regular bricks.</p>
            </div>

            <div class="chapter-summary">
              <h4>What We Learned</h4>
              <ul>
                <li>Bamboo is super-strong grass that grows back quickly</li>
                <li>Straw bales make excellent, well-insulated walls</li>
                <li>Wood stores carbon and can be grown sustainably</li>
                <li>Earth and mud have been used for building for 10,000+ years</li>
                <li>Recycled materials give new life to things people throw away</li>
              </ul>
            </div>

            <div class="reflection-question">
              <h4>Think About It!</h4>
              <p>If you could build a fort or playhouse using any natural material, which would you choose and why?</p>
            </div>
          </div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
            <h2>Sustainable Building Materials: Building a Better Future</h2>

            <div class="intro-section">
              <p>Every building starts with materials - and the choices we make about those materials can either help or hurt our planet. Let's explore how sustainable materials are changing the way we build.</p>
            </div>

            <div class="image-placeholder" data-caption="Comparison of traditional concrete building vs. a modern mass timber structure">
              [Image: Side-by-side comparison of building types]
            </div>

            <h3>Why Materials Matter</h3>

            <p>The construction industry uses about <strong>40% of all raw materials</strong> on Earth. That's more than cars, phones, and everything else combined! The materials we choose affect:</p>

            <ul>
              <li><strong>Carbon emissions</strong> - How much greenhouse gas is released making and transporting materials</li>
              <li><strong>Resource depletion</strong> - Whether we're using up limited resources or renewable ones</li>
              <li><strong>Waste</strong> - What happens to materials at the end of a building's life</li>
              <li><strong>Human health</strong> - The chemicals and pollutants people are exposed to</li>
            </ul>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-mid-q1">
              <p>"The greenest building is one that already exists, and the greenest material is one that was never extracted."</p>
              <cite>— Carl Elefante, Architect</cite>
            </blockquote>

            <h3>Natural Materials: Working with Nature</h3>

            <h4>Wood and Mass Timber</h4>

            <p>Wood is experiencing a renaissance in construction. Modern "mass timber" uses engineered wood products that can build skyscrapers!</p>

            <table>
              <tr>
                <th>Wood Product</th>
                <th>What It Is</th>
                <th>Best Uses</th>
              </tr>
              <tr>
                <td>CLT (Cross-Laminated Timber)</td>
                <td>Layers of wood glued at 90° angles</td>
                <td>Walls, floors, roofs</td>
              </tr>
              <tr>
                <td>Glulam (Glued Laminated Timber)</td>
                <td>Wood pieces glued together lengthwise</td>
                <td>Beams, columns, arches</td>
              </tr>
              <tr>
                <td>LVL (Laminated Veneer Lumber)</td>
                <td>Thin wood sheets layered together</td>
                <td>Headers, beams, joists</td>
              </tr>
            </table>

            <div class="key-concept">
              <h4>Carbon Storage in Wood</h4>
              <p>Trees absorb CO2 as they grow. When we build with wood, that carbon stays locked in the building. A typical wood-frame house stores about 28 tons of CO2 - equivalent to 7 years of driving a car!</p>
            </div>

            <div class="image-placeholder" data-caption="The Mjøstårnet in Norway - an 18-story mass timber building">
              [Image: Tall wooden skyscraper in Norway]
            </div>

            <h4>Bamboo: The Fastest Renewable</h4>

            <p>Bamboo grows up to 35 inches per day and reaches maturity in 3-5 years (compared to 30-50 years for trees). It has a higher tensile strength than steel and can be used for:</p>

            <ul>
              <li>Structural framing and scaffolding</li>
              <li>Flooring and paneling</li>
              <li>Furniture and finishes</li>
              <li>Engineered bamboo products similar to plywood</li>
            </ul>

            <h4>Straw Bale Construction</h4>

            <p>Straw is an agricultural byproduct - about 200 million tons are produced annually in the US alone. Straw bale walls offer:</p>

            <ul>
              <li>R-value of 30-35 (excellent insulation)</li>
              <li>Fire resistance when properly plastered (1-2 hour rating)</li>
              <li>Natural humidity regulation</li>
              <li>Very low embodied energy</li>
            </ul>

            <h4>Earth Building: Adobe and Rammed Earth</h4>

            <p>Earth building uses the most abundant material on the planet - soil. Modern earth construction combines ancient techniques with engineering precision.</p>

            <div class="comparison-box">
              <h4>Adobe vs. Rammed Earth</h4>
              <table>
                <tr>
                  <th>Feature</th>
                  <th>Adobe</th>
                  <th>Rammed Earth</th>
                </tr>
                <tr>
                  <td>Method</td>
                  <td>Sun-dried mud bricks</td>
                  <td>Compressed soil in forms</td>
                </tr>
                <tr>
                  <td>Wall thickness</td>
                  <td>10-14 inches</td>
                  <td>12-24 inches</td>
                </tr>
                <tr>
                  <td>Labor</td>
                  <td>Can be DIY</td>
                  <td>Usually professional</td>
                </tr>
                <tr>
                  <td>Appearance</td>
                  <td>Plastered smooth</td>
                  <td>Beautiful natural layers</td>
                </tr>
              </table>
            </div>

            <h3>Recycled and Reclaimed Materials</h3>

            <p>Using recycled materials reduces mining, logging, and manufacturing while keeping waste out of landfills.</p>

            <div class="material-spotlight">
              <h4>Recycled Steel</h4>
              <p>Steel is 100% recyclable without losing strength. Recycled steel uses 60% less energy than making new steel from iron ore. Most steel beams and rebar today contain 25-90% recycled content.</p>
            </div>

            <div class="material-spotlight">
              <h4>Recycled Concrete Aggregate</h4>
              <p>Crushed concrete from demolished buildings can replace gravel in new concrete or be used for road bases and fill. This keeps millions of tons out of landfills.</p>
            </div>

            <div class="material-spotlight">
              <h4>Reclaimed Wood</h4>
              <p>Wood from old barns, factories, and warehouses often comes from old-growth trees that no longer exist. It's denser, more stable, and full of character.</p>
            </div>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-mid-q2">
              <p>"Waste is just a resource in the wrong place."</p>
              <cite>— William McDonough, Sustainable Design Pioneer</cite>
            </blockquote>

            <h3>Innovative New Materials</h3>

            <h4>Hempcrete</h4>
            <p>Made from hemp fibers mixed with lime, hempcrete is lightweight, insulating, and actually absorbs CO2 as it cures. It's carbon-negative!</p>

            <h4>Mycelium (Mushroom Materials)</h4>
            <p>Fungal root networks can be grown into insulation panels and packaging. They're biodegradable and require very little energy to produce.</p>

            <h4>Recycled Plastic Lumber</h4>
            <p>Milk jugs and detergent bottles become decay-proof "lumber" for decks, playgrounds, and outdoor furniture. It never needs painting or staining.</p>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Construction uses 40% of global raw materials - our choices matter</li>
                <li>Wood stores carbon and mass timber can build skyscrapers</li>
                <li>Bamboo, straw, and earth are ancient materials with modern applications</li>
                <li>Recycled materials reduce waste and save energy</li>
                <li>Innovative materials like hempcrete and mycelium offer new possibilities</li>
              </ul>
            </div>

            <div class="reflection-question">
              <h4>Design Challenge</h4>
              <p>If you were designing a community center for your neighborhood, which sustainable materials would you choose for the structure, insulation, and finishes? Why?</p>
            </div>
          </div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
            <h2>Material Life Cycle Analysis: From Cradle to Grave</h2>

            <div class="intro-section">
              <p>Every building material has a story - from extraction through manufacturing, use, and eventual disposal. Understanding this complete life cycle is essential for making truly sustainable choices.</p>
            </div>

            <h3>Embodied Carbon: The Hidden Impact</h3>

            <p><strong>Embodied carbon</strong> refers to all the greenhouse gas emissions associated with a material before it even reaches the building site. This includes:</p>

            <ul>
              <li><strong>Extraction</strong> - Mining, logging, or harvesting raw materials</li>
              <li><strong>Processing</strong> - Refining, smelting, or chemical treatment</li>
              <li><strong>Manufacturing</strong> - Forming into usable products</li>
              <li><strong>Transportation</strong> - Shipping to distributors and job sites</li>
              <li><strong>Installation</strong> - Energy and waste during construction</li>
            </ul>

            <div class="image-placeholder" data-caption="Diagram showing the embodied carbon at each stage of a material's journey">
              [Image: Flow chart of material life cycle with CO2 emissions at each stage]
            </div>

            <h4>Comparing Embodied Carbon</h4>

            <table>
              <tr>
                <th>Material</th>
                <th>kgCO₂e/kg</th>
                <th>Key Factors</th>
              </tr>
              <tr>
                <td>Concrete (regular)</td>
                <td>0.10-0.15</td>
                <td>Cement production is highly carbon-intensive</td>
              </tr>
              <tr>
                <td>Concrete (with SCMs)</td>
                <td>0.05-0.10</td>
                <td>Fly ash or slag replaces some cement</td>
              </tr>
              <tr>
                <td>Steel (virgin)</td>
                <td>1.8-2.2</td>
                <td>Blast furnace process uses coal</td>
              </tr>
              <tr>
                <td>Steel (recycled)</td>
                <td>0.4-0.7</td>
                <td>Electric arc furnace with scrap</td>
              </tr>
              <tr>
                <td>Aluminum (virgin)</td>
                <td>8-12</td>
                <td>Extremely energy-intensive smelting</td>
              </tr>
              <tr>
                <td>Aluminum (recycled)</td>
                <td>0.5-1.0</td>
                <td>95% energy savings from recycling</td>
              </tr>
              <tr>
                <td>Timber (sustainably sourced)</td>
                <td>-0.5 to +0.5</td>
                <td>Can be carbon-negative due to sequestration</td>
              </tr>
              <tr>
                <td>CLT (Cross-Laminated Timber)</td>
                <td>-0.3 to +0.2</td>
                <td>Depends on adhesives and sourcing</td>
              </tr>
            </table>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-hs-q1">
              <p>"We can't solve the climate crisis by focusing only on building operations. Embodied carbon is the carbon we can't get back."</p>
              <cite>— Larry Strain, Carbon Leadership Forum</cite>
            </blockquote>

            <h3>Operational vs. Embodied Carbon</h3>

            <p>Buildings have two types of carbon emissions:</p>

            <div class="key-concept">
              <h4>The Shifting Balance</h4>
              <ul>
                <li><strong>Operational carbon:</strong> Emissions from heating, cooling, lighting, and running equipment over the building's lifetime</li>
                <li><strong>Embodied carbon:</strong> Emissions from materials and construction (one-time, upfront)</li>
              </ul>
            </div>

            <p>Historically, operational carbon dominated (70-80% of lifetime emissions). But as buildings become more efficient and the grid gets cleaner, embodied carbon becomes proportionally larger. For highly efficient buildings, embodied carbon can represent 50-70% of lifetime emissions!</p>

            <div class="image-placeholder" data-caption="Graph showing how embodied carbon becomes more significant as buildings become more efficient">
              [Image: Stacked bar chart comparing operational vs embodied carbon for standard, efficient, and net-zero buildings]
            </div>

            <h3>The Cement Problem</h3>

            <p>Cement production alone accounts for about <strong>8% of global CO2 emissions</strong> - more than aviation and shipping combined. Here's why:</p>

            <ol>
              <li><strong>Chemical reaction:</strong> Converting limestone (CaCO3) to calcium oxide releases CO2: CaCO3 → CaO + CO2</li>
              <li><strong>High heat:</strong> Kilns reach 1450°C, typically using coal or natural gas</li>
              <li><strong>Massive scale:</strong> Over 4 billion tons of cement produced annually</li>
            </ol>

            <h4>Reducing Cement's Impact</h4>

            <table>
              <tr>
                <th>Strategy</th>
                <th>CO2 Reduction</th>
                <th>How It Works</th>
              </tr>
              <tr>
                <td>Fly ash replacement</td>
                <td>15-30%</td>
                <td>Coal power plant byproduct replaces cement</td>
              </tr>
              <tr>
                <td>Slag cement</td>
                <td>25-50%</td>
                <td>Steel manufacturing byproduct replaces cement</td>
              </tr>
              <tr>
                <td>Calcined clay</td>
                <td>30-40%</td>
                <td>Abundant natural material, lower firing temp</td>
              </tr>
              <tr>
                <td>Carbon curing</td>
                <td>5-10% + storage</td>
                <td>CO2 injected during curing becomes permanent</td>
              </tr>
              <tr>
                <td>Alternative binders</td>
                <td>50-90%</td>
                <td>Geopolymers and other chemistries</td>
              </tr>
            </table>

            <h3>Mass Timber Revolution</h3>

            <p>Cross-Laminated Timber (CLT) and other mass timber products are enabling wood construction at scales previously impossible. Buildings up to 25 stories are now being built with wood structure.</p>

            <div class="key-concept">
              <h4>Mass Timber Advantages</h4>
              <ul>
                <li><strong>Carbon storage:</strong> Each cubic meter stores ~1 ton of CO2</li>
                <li><strong>Lighter weight:</strong> Reduces foundation requirements</li>
                <li><strong>Faster construction:</strong> Prefabricated panels install quickly</li>
                <li><strong>Fire safety:</strong> Chars predictably, maintains structural integrity</li>
                <li><strong>Seismic performance:</strong> Lighter weight and ductile connections</li>
              </ul>
            </div>

            <div class="image-placeholder" data-caption="Construction of a mass timber high-rise showing CLT panels being installed">
              [Image: Mass timber construction site with crane lifting CLT panel]
            </div>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-hs-q2">
              <p>"We should be building with materials that grow, not materials that are mined."</p>
              <cite>— Michael Green, Architect</cite>
            </blockquote>

            <h3>Transparency and Reporting</h3>

            <h4>Environmental Product Declarations (EPDs)</h4>

            <p>EPDs are standardized documents that report the environmental impacts of building products. They're like nutrition labels for materials, allowing apples-to-apples comparisons.</p>

            <p>EPDs typically include:</p>
            <ul>
              <li>Global Warming Potential (GWP) - carbon footprint</li>
              <li>Ozone Depletion Potential</li>
              <li>Acidification Potential</li>
              <li>Eutrophication Potential</li>
              <li>Resource depletion</li>
            </ul>

            <h4>EC3 Tool</h4>
            <p>The Embodied Carbon in Construction Calculator (EC3) is a free database with over 100,000 EPDs. It allows designers to compare materials and estimate whole-building embodied carbon.</p>

            <h3>Design Strategies for Low-Carbon Buildings</h3>

            <ol>
              <li><strong>Right-size structures:</strong> Don't over-engineer - use only what's needed</li>
              <li><strong>Substitute materials:</strong> Wood for steel, recycled for virgin</li>
              <li><strong>Specify low-carbon options:</strong> Require EPDs, set carbon limits</li>
              <li><strong>Design for longevity:</strong> Durable buildings avoid replacement</li>
              <li><strong>Enable future adaptation:</strong> Flexible designs avoid demolition</li>
              <li><strong>Plan for end-of-life:</strong> Design for disassembly and reuse</li>
            </ol>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Embodied carbon includes all emissions from material extraction to installation</li>
                <li>As buildings get more efficient, embodied carbon's share increases</li>
                <li>Cement production is responsible for 8% of global emissions</li>
                <li>Mass timber stores carbon and can replace steel and concrete</li>
                <li>EPDs provide standardized environmental data for material comparison</li>
                <li>Design decisions at early stages have the biggest impact on embodied carbon</li>
              </ul>
            </div>

            <div class="reflection-question">
              <h4>Analysis Exercise</h4>
              <p>Research a recently constructed building in your area. What structural materials were used? Based on what you've learned, what alternatives might have reduced its embodied carbon?</p>
            </div>
          </div>`,

          UNDERGRADUATE: `<div class="lesson-content">
            <h2>Material Selection and Life Cycle Assessment</h2>

            <div class="intro-section">
              <p>Sustainable material selection requires balancing multiple criteria across the entire building life cycle. This lesson introduces the frameworks and tools used by professionals to make informed material decisions.</p>
            </div>

            <h3>Life Cycle Assessment Framework</h3>

            <p>Life Cycle Assessment (LCA) is a standardized methodology (ISO 14040/14044) for quantifying environmental impacts across a product's entire life span. For buildings, the EN 15978 standard defines specific life cycle stages:</p>

            <div class="key-concept">
              <h4>Building Life Cycle Stages</h4>
              <table>
                <tr>
                  <th>Stage</th>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>Product</td>
                  <td>A1-A3</td>
                  <td>Raw material supply, transport, manufacturing</td>
                </tr>
                <tr>
                  <td>Construction</td>
                  <td>A4-A5</td>
                  <td>Transport to site, installation</td>
                </tr>
                <tr>
                  <td>Use</td>
                  <td>B1-B7</td>
                  <td>Installed product, maintenance, repair, replacement, operational energy/water</td>
                </tr>
                <tr>
                  <td>End of Life</td>
                  <td>C1-C4</td>
                  <td>Deconstruction, transport, processing, disposal</td>
                </tr>
                <tr>
                  <td>Beyond Building</td>
                  <td>D</td>
                  <td>Reuse, recovery, recycling potential</td>
                </tr>
              </table>
            </div>

            <div class="image-placeholder" data-caption="Building life cycle stages diagram per EN 15978">
              [Image: Circular diagram showing all life cycle stages A1-D]
            </div>

            <h4>LCA Impact Categories</h4>

            <p>A complete LCA evaluates multiple environmental impact categories:</p>

            <table>
              <tr>
                <th>Impact Category</th>
                <th>Unit</th>
                <th>What It Measures</th>
              </tr>
              <tr>
                <td>Global Warming Potential (GWP)</td>
                <td>kg CO2e</td>
                <td>Climate change contribution</td>
              </tr>
              <tr>
                <td>Ozone Depletion (ODP)</td>
                <td>kg CFC-11e</td>
                <td>Stratospheric ozone destruction</td>
              </tr>
              <tr>
                <td>Acidification (AP)</td>
                <td>kg SO2e</td>
                <td>Acid rain, ecosystem damage</td>
              </tr>
              <tr>
                <td>Eutrophication (EP)</td>
                <td>kg PO4e</td>
                <td>Water body nutrient pollution</td>
              </tr>
              <tr>
                <td>Smog Formation (SFP)</td>
                <td>kg O3e</td>
                <td>Ground-level ozone creation</td>
              </tr>
              <tr>
                <td>Resource Depletion</td>
                <td>kg Sb e</td>
                <td>Non-renewable resource use</td>
              </tr>
            </table>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-und-q1">
              <p>"Life cycle thinking transforms how we see buildings - not as static objects, but as flows of materials and energy through time."</p>
              <cite>— Kathrina Simonen, Carbon Leadership Forum</cite>
            </blockquote>

            <h3>Environmental Product Declarations (EPDs)</h3>

            <p>EPDs provide standardized, third-party verified environmental impact data for building products. They enable meaningful comparisons and specification of low-impact materials.</p>

            <h4>Types of EPDs</h4>

            <ul>
              <li><strong>Industry-wide EPDs:</strong> Average data for a product category (e.g., "ready-mix concrete")</li>
              <li><strong>Product-specific EPDs:</strong> Data for a specific manufacturer's product</li>
              <li><strong>Facility-specific EPDs:</strong> Data from a specific manufacturing plant</li>
            </ul>

            <p>Product-specific EPDs are most useful for comparing options, but industry-wide EPDs are acceptable when specific data isn't available.</p>

            <h4>Reading an EPD</h4>

            <p>Key information to extract from an EPD:</p>

            <ol>
              <li><strong>Declared unit:</strong> The quantity basis (e.g., 1 m³, 1 kg, 1 m²)</li>
              <li><strong>System boundaries:</strong> Which life cycle stages are included</li>
              <li><strong>GWP (A1-A3):</strong> Upfront carbon - usually the most scrutinized value</li>
              <li><strong>Service life:</strong> Assumed product lifespan</li>
              <li><strong>Module D:</strong> End-of-life credits (recycling, energy recovery)</li>
            </ol>

            <div class="image-placeholder" data-caption="Sample EPD showing key data fields highlighted">
              [Image: Annotated EPD document with callouts]
            </div>

            <h3>Material Selection Criteria</h3>

            <p>Sustainable material selection balances multiple, sometimes competing, criteria:</p>

            <div class="criteria-grid">
              <h4>1. Performance Requirements</h4>
              <ul>
                <li>Structural capacity and safety factors</li>
                <li>Durability and weathering resistance</li>
                <li>Fire rating requirements</li>
                <li>Acoustic and thermal properties</li>
                <li>Aesthetic requirements</li>
              </ul>

              <h4>2. Environmental Impacts</h4>
              <ul>
                <li>Embodied carbon (GWP)</li>
                <li>Other LCA impact categories</li>
                <li>Renewability and resource depletion</li>
                <li>Toxicity and health impacts</li>
                <li>End-of-life considerations</li>
              </ul>

              <h4>3. Economic Factors</h4>
              <ul>
                <li>First cost (materials + installation)</li>
                <li>Life cycle cost (maintenance, replacement)</li>
                <li>Local availability and lead times</li>
                <li>Market volatility and price stability</li>
              </ul>

              <h4>4. Social Considerations</h4>
              <ul>
                <li>Labor practices in supply chain</li>
                <li>Local economic impacts</li>
                <li>Indoor environmental quality</li>
                <li>Transparency and certifications</li>
              </ul>
            </div>

            <h3>Decision-Making Frameworks</h3>

            <h4>Multi-Criteria Decision Analysis (MCDA)</h4>

            <p>MCDA provides a structured approach to comparing options across multiple criteria:</p>

            <ol>
              <li>Define criteria and sub-criteria</li>
              <li>Assign weights reflecting project priorities</li>
              <li>Score each option against each criterion</li>
              <li>Calculate weighted scores</li>
              <li>Perform sensitivity analysis</li>
            </ol>

            <div class="example-box">
              <h4>Example: Structural System Selection</h4>
              <table>
                <tr>
                  <th>Criterion</th>
                  <th>Weight</th>
                  <th>Concrete</th>
                  <th>Steel</th>
                  <th>Mass Timber</th>
                </tr>
                <tr>
                  <td>Embodied carbon</td>
                  <td>30%</td>
                  <td>2</td>
                  <td>3</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>First cost</td>
                  <td>25%</td>
                  <td>4</td>
                  <td>3</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Speed of construction</td>
                  <td>20%</td>
                  <td>2</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Fire rating</td>
                  <td>15%</td>
                  <td>5</td>
                  <td>3</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Acoustic performance</td>
                  <td>10%</td>
                  <td>5</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td><strong>Weighted Score</strong></td>
                  <td>100%</td>
                  <td>3.15</td>
                  <td>3.05</td>
                  <td>3.95</td>
                </tr>
              </table>
            </div>

            <h4>Whole-Building LCA Tools</h4>

            <p>Several tools enable whole-building life cycle assessment:</p>

            <ul>
              <li><strong>Tally:</strong> Revit plug-in for real-time LCA during design</li>
              <li><strong>One Click LCA:</strong> Web-based tool with extensive database</li>
              <li><strong>EC3 (Embodied Carbon in Construction Calculator):</strong> Free tool focused on embodied carbon</li>
              <li><strong>Athena Impact Estimator:</strong> Free North American tool</li>
            </ul>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-und-q2">
              <p>"The best time to influence embodied carbon is at project inception; the ability to make changes decreases dramatically as design progresses."</p>
              <cite>— SE 2050 Commitment</cite>
            </blockquote>

            <h3>Specification and Procurement</h3>

            <h4>Writing Low-Carbon Specifications</h4>

            <p>To actually achieve low-carbon construction, environmental requirements must be written into specifications:</p>

            <div class="specification-example">
              <h4>Example Concrete Specification Language</h4>
              <p><em>"Concrete for structural applications shall have a maximum Global Warming Potential of 350 kg CO2e per cubic meter, documented by a product-specific EPD conforming to ISO 14025 and EN 15804. Concrete containing at least 30% supplementary cementitious materials (SCMs) by weight of cementitious content is preferred."</em></p>
            </div>

            <h4>Setting Carbon Budgets</h4>

            <p>Progressive projects set embodied carbon budgets and track against them:</p>

            <table>
              <tr>
                <th>Building Type</th>
                <th>Typical (kg CO2e/m²)</th>
                <th>Best Practice Target</th>
              </tr>
              <tr>
                <td>Office</td>
                <td>400-600</td>
                <td>&lt;300</td>
              </tr>
              <tr>
                <td>Residential</td>
                <td>300-500</td>
                <td>&lt;250</td>
              </tr>
              <tr>
                <td>Education</td>
                <td>350-550</td>
                <td>&lt;275</td>
              </tr>
              <tr>
                <td>Healthcare</td>
                <td>500-800</td>
                <td>&lt;400</td>
              </tr>
            </table>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>LCA quantifies environmental impacts across a product's full life cycle (stages A-D)</li>
                <li>EPDs provide standardized, verified environmental data for comparison</li>
                <li>Material selection balances performance, environmental, economic, and social criteria</li>
                <li>MCDA frameworks support systematic decision-making</li>
                <li>Low-carbon goals must be specified and tracked to be achieved</li>
                <li>Early design decisions have the greatest influence on embodied carbon</li>
              </ul>
            </div>

            <div class="reflection-question">
              <h4>Application Exercise</h4>
              <p>Using the EC3 tool or another LCA database, compare three structural systems (concrete frame, steel frame, mass timber) for a hypothetical 5-story office building. Document your methodology, findings, and recommendations.</p>
            </div>
          </div>`,

          GRADUATE: `<div class="lesson-content">
            <h2>Decarbonizing the Construction Industry</h2>

            <div class="intro-section">
              <p>The construction sector is responsible for approximately 11% of global greenhouse gas emissions from materials and construction processes alone. This lesson examines the pathways, technologies, and market mechanisms driving decarbonization of major construction materials.</p>
            </div>

            <h3>The Decarbonization Imperative</h3>

            <p>To limit global warming to 1.5°C, the built environment must achieve net-zero emissions by 2050. This requires:</p>

            <ul>
              <li><strong>40-50% reduction</strong> in embodied carbon by 2030 (vs. 2020 baseline)</li>
              <li><strong>Net-zero embodied carbon</strong> for new construction by 2050</li>
              <li><strong>Complete decarbonization</strong> of cement, steel, and aluminum production</li>
            </ul>

            <div class="image-placeholder" data-caption="Carbon pathway showing required reductions to reach net-zero by 2050">
              [Image: Graph showing decarbonization trajectory with milestones]
            </div>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-grad-q1">
              <p>"We need to reduce embodied carbon by 65% before 2030 for new buildings. This is not optional—it's physics."</p>
              <cite>— Architecture 2030</cite>
            </blockquote>

            <h3>Concrete Decarbonization Pathways</h3>

            <p>Cement production accounts for approximately 8% of global CO2 emissions. Decarbonization strategies include:</p>

            <h4>1. Clinker Substitution</h4>

            <p>Replace Portland cement clinker with supplementary cementitious materials (SCMs):</p>

            <table>
              <tr>
                <th>SCM</th>
                <th>Source</th>
                <th>Typical Replacement</th>
                <th>Limitations</th>
              </tr>
              <tr>
                <td>Fly ash</td>
                <td>Coal power plants</td>
                <td>15-35%</td>
                <td>Declining as coal use decreases</td>
              </tr>
              <tr>
                <td>Slag</td>
                <td>Steel production</td>
                <td>35-70%</td>
                <td>Limited supply, regional</td>
              </tr>
              <tr>
                <td>Calcined clay</td>
                <td>Natural clay deposits</td>
                <td>30-50%</td>
                <td>Lower firing temp than clinker</td>
              </tr>
              <tr>
                <td>Natural pozzolans</td>
                <td>Volcanic materials</td>
                <td>15-35%</td>
                <td>Geographic availability</td>
              </tr>
              <tr>
                <td>Limestone</td>
                <td>Ground limestone</td>
                <td>5-15%</td>
                <td>Limited reactivity</td>
              </tr>
            </table>

            <h4>2. Alternative Binders</h4>

            <ul>
              <li><strong>LC3 (Limestone Calcined Clay Cement):</strong> 30-40% reduction, commercially viable today</li>
              <li><strong>Geopolymers:</strong> Alkali-activated binders, 50-80% reduction potential</li>
              <li><strong>Magnesium-based cements:</strong> Lower process emissions, potential carbon absorption</li>
              <li><strong>Belite-ye'elimite-ferrite (BYF) cements:</strong> Lower firing temperature, 20-30% reduction</li>
            </ul>

            <h4>3. Process Improvements</h4>

            <ul>
              <li><strong>Kiln efficiency:</strong> Modern kilns achieve 3.0-3.4 GJ/ton vs. 4.5+ for older plants</li>
              <li><strong>Alternative fuels:</strong> Biomass, waste-derived fuels replace coal</li>
              <li><strong>Electrification:</strong> Electric kilns powered by renewables (emerging)</li>
            </ul>

            <h4>4. Carbon Capture and Utilization</h4>

            <ul>
              <li><strong>Post-combustion capture:</strong> Amine scrubbing of flue gases</li>
              <li><strong>Oxyfuel combustion:</strong> Pure oxygen enables easier capture</li>
              <li><strong>Carbon curing:</strong> CO2 injection during concrete curing (CarbonCure, Solidia)</li>
              <li><strong>Mineralization:</strong> CO2 converted to carbonates in aggregate (Blue Planet)</li>
            </ul>

            <h3>Steel Decarbonization Pathways</h3>

            <p>Steel production emits approximately 1.85 tons of CO2 per ton of steel via the blast furnace-basic oxygen furnace (BF-BOF) route. Key pathways include:</p>

            <h4>1. Increased Recycling</h4>

            <p>Electric arc furnaces (EAF) using scrap steel emit 0.4-0.7 tons CO2 per ton vs. 1.8-2.2 for virgin steel. Global scrap availability will increase as buildings from the construction boom reach end-of-life.</p>

            <h4>2. Direct Reduced Iron (DRI)</h4>

            <p>DRI processes reduce iron ore with natural gas instead of coal, achieving 30-40% emission reductions. The pathway to zero involves:</p>

            <ol>
              <li>Natural gas-based DRI (current)</li>
              <li>Green hydrogen DRI (HYBRIT, H2 Green Steel)</li>
              <li>Electrolysis-based iron reduction (emerging)</li>
            </ol>

            <h4>3. Green Hydrogen Steel</h4>

            <p>SSAB's HYBRIT project in Sweden demonstrated fossil-free steel in 2021. Commercial-scale production expected by 2026, with full conversion by 2045.</p>

            <div class="key-concept">
              <h4>Green Hydrogen Steel Production Chain</h4>
              <ol>
                <li>Renewable electricity powers electrolysis</li>
                <li>Electrolysis splits water into hydrogen and oxygen</li>
                <li>Hydrogen reduces iron ore in DRI shaft furnace</li>
                <li>DRI fed to electric arc furnace</li>
                <li>Only byproducts: water and heat</li>
              </ol>
            </div>

            <h3>Mass Timber and Biogenic Carbon</h3>

            <h4>Biogenic Carbon Accounting</h4>

            <p>Biogenic carbon presents accounting complexities:</p>

            <ul>
              <li><strong>Carbon uptake (A1):</strong> Negative emissions as trees grow</li>
              <li><strong>Carbon storage (B1):</strong> Sequestered during building use</li>
              <li><strong>End-of-life (C3-C4):</strong> Released if burned/decayed, maintained if landfilled</li>
              <li><strong>Module D:</strong> Credits for bioenergy at end-of-life</li>
            </ul>

            <p>The net climate impact depends on:</p>
            <ol>
              <li>Sustainable forest management (forest carbon stocks maintained)</li>
              <li>Building service life (longer storage = more benefit)</li>
              <li>End-of-life management (reuse > recycling > energy recovery > landfill)</li>
            </ol>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-grad-q2">
              <p>"Substituting wood for steel and concrete in mid-rise construction can reduce lifecycle carbon emissions by 60-75%."</p>
              <cite>— Churkina et al., Nature Sustainability (2020)</cite>
            </blockquote>

            <h4>Mass Timber at Scale</h4>

            <p>Research suggests that storing carbon in buildings could mitigate significant emissions:</p>

            <ul>
              <li>Potential to store 10-20 Gt CO2 in the global building stock by 2050</li>
              <li>Requires sustainable forestry practices at scale</li>
              <li>Urban wood use could sequester ~1 Gt CO2/year globally</li>
            </ul>

            <h3>Circular Construction</h3>

            <h4>Design for Disassembly</h4>

            <p>Enabling material reuse requires intentional design:</p>

            <ul>
              <li><strong>Mechanical connections:</strong> Bolts and screws vs. welding and adhesives</li>
              <li><strong>Modular systems:</strong> Standardized components for interchangeability</li>
              <li><strong>Material separation:</strong> Avoiding composites and hybrid assemblies</li>
              <li><strong>Documentation:</strong> As-built records and material specifications</li>
            </ul>

            <h4>Material Passports</h4>

            <p>Digital documentation of building materials enables circular economy:</p>

            <ul>
              <li>Material composition and source</li>
              <li>Environmental impact data</li>
              <li>Connection details and disassembly instructions</li>
              <li>Remaining service life estimates</li>
              <li>Recycling/reuse pathways</li>
            </ul>

            <h4>Urban Mining</h4>

            <p>Existing buildings represent material banks. Emerging platforms (Madaster, Building Material Scout) create marketplaces for salvaged materials.</p>

            <h3>Market Mechanisms and Policy</h3>

            <h4>Buy Clean Policies</h4>

            <p>Government procurement requirements driving market transformation:</p>

            <ul>
              <li><strong>California:</strong> Buy Clean California Act (2017) - GWP limits for steel, flat glass, insulation</li>
              <li><strong>Federal:</strong> Inflation Reduction Act (2022) - $2B for low-carbon materials</li>
              <li><strong>EU:</strong> Carbon Border Adjustment Mechanism includes construction materials</li>
            </ul>

            <h4>Carbon Pricing</h4>

            <p>Internal carbon pricing and cap-and-trade systems increasingly affect material costs. Current prices ($50-100/ton CO2e) insufficient to drive major shifts; prices of $150-200+ likely needed.</p>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Construction materials must achieve net-zero by 2050 to meet climate goals</li>
                <li>Concrete decarbonization relies on clinker substitution, alternative binders, and carbon capture</li>
                <li>Steel decarbonization pathway: scrap recycling → natural gas DRI → green hydrogen</li>
                <li>Mass timber can provide carbon storage at scale with sustainable forestry</li>
                <li>Circular construction requires design for disassembly and material passports</li>
                <li>Policy mechanisms (Buy Clean, carbon pricing) essential to drive market transformation</li>
              </ul>
            </div>

            <div class="reflection-question">
              <h4>Research Assignment</h4>
              <p>Select a specific decarbonization technology (e.g., LC3 cement, green hydrogen steel, or carbon-curing concrete). Conduct a technical and market assessment including: technology readiness level, cost premium, barriers to adoption, and policy mechanisms that could accelerate deployment.</p>
            </div>
          </div>`,

          PHD: `<div class="lesson-content">
            <h2>Material Innovation and Carbon-Negative Construction Research</h2>

            <div class="intro-section">
              <p>Achieving net-zero buildings by 2050 requires not only decarbonizing existing materials but developing novel carbon-negative alternatives. This lesson examines frontier research in bio-based materials, carbon mineralization, and the systems-level transformations needed for a circular, regenerative built environment.</p>
            </div>

            <h3>Novel Bio-Based Materials</h3>

            <h4>Mycelium Composites</h4>

            <p>Mycelium—the root structure of fungi—can be grown into structural materials using agricultural waste as substrate. Research directions include:</p>

            <ul>
              <li><strong>Substrate optimization:</strong> Agricultural residues (straw, hemp hurds, corn stover) affect mechanical properties. Lignin content correlates with density; nitrogen content affects growth rate.</li>
              <li><strong>Species selection:</strong> Ganoderma lucidum and Trametes versicolor produce different hyphal densities and binding characteristics</li>
              <li><strong>Growth conditions:</strong> Temperature, humidity, CO2 concentration, and growth duration affect material properties</li>
              <li><strong>Post-processing:</strong> Heat treatment, cold pressing, and coating affect durability and water resistance</li>
            </ul>

            <div class="research-data">
              <h4>Mycelium Composite Properties (Current Research)</h4>
              <table>
                <tr>
                  <th>Property</th>
                  <th>Range</th>
                  <th>Comparison</th>
                </tr>
                <tr>
                  <td>Density</td>
                  <td>60-300 kg/m³</td>
                  <td>Similar to EPS-rigid foam</td>
                </tr>
                <tr>
                  <td>Compressive strength</td>
                  <td>30-500 kPa</td>
                  <td>Non-structural applications</td>
                </tr>
                <tr>
                  <td>Thermal conductivity</td>
                  <td>0.04-0.08 W/mK</td>
                  <td>Competitive with mineral wool</td>
                </tr>
                <tr>
                  <td>Fire resistance</td>
                  <td>Self-extinguishing</td>
                  <td>Superior to many plastics</td>
                </tr>
                <tr>
                  <td>Carbon footprint</td>
                  <td>Negative to near-zero</td>
                  <td>Vs. ~3 kg CO2e/kg for EPS</td>
                </tr>
              </table>
            </div>

            <p>Current applications: acoustic panels, insulation, packaging, furniture. Research challenges: scaling production, achieving structural properties, ensuring consistent quality.</p>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-phd-q1">
              <p>"Mycelium represents a fundamentally different manufacturing paradigm—growing materials rather than extracting and processing them."</p>
              <cite>— Dr. Mitchell Joachim, Terreform ONE</cite>
            </blockquote>

            <h4>Engineered Living Materials</h4>

            <p>Beyond static bio-based materials, research explores materials with living biological components:</p>

            <ul>
              <li><strong>Self-healing concrete:</strong> Bacteria (Bacillus species) encapsulated in concrete produce calcite when cracks expose them to water, sealing damage autonomously</li>
              <li><strong>Bio-cementation:</strong> Microbially-induced calcite precipitation (MICP) using ureolytic bacteria can solidify sand without cement</li>
              <li><strong>Living building envelopes:</strong> Cyanobacteria or algae integrated into facades for carbon capture and biofuel production</li>
            </ul>

            <h4>Advanced Plant Fiber Composites</h4>

            <p>Beyond hempcrete, research examines:</p>

            <ul>
              <li><strong>Flax fiber reinforcement:</strong> Natural fiber composites approaching glass fiber performance</li>
              <li><strong>Bamboo fiber engineering:</strong> Extracting and reconstituting bamboo fibers for consistent properties</li>
              <li><strong>Agricultural waste valorization:</strong> Rice hulls, corn cobs, sunflower stalks as matrix or aggregate</li>
              <li><strong>Seaweed-based materials:</strong> Alginate binders and kelp fiber reinforcement</li>
            </ul>

            <h3>Carbon Mineralization Technologies</h3>

            <h4>Enhanced Weathering in Concrete</h4>

            <p>Natural mineral carbonation is slow but can be accelerated through material formulation and exposure conditions:</p>

            <ul>
              <li><strong>Reactive MgO cements:</strong> Magnesium oxide absorbs CO2 during curing, potentially exceeding emissions</li>
              <li><strong>Olivine aggregates:</strong> Magnesium silicate minerals react with atmospheric CO2</li>
              <li><strong>Accelerated carbonation curing:</strong> Exposing fresh concrete to elevated CO2 concentrations</li>
            </ul>

            <div class="key-concept">
              <h4>Carbon Mineralization Chemistry</h4>
              <p>Silicate minerals react with CO2 to form stable carbonates:</p>
              <p><code>Mg₂SiO₄ + 2CO₂ → 2MgCO₃ + SiO₂</code></p>
              <p>The resulting carbonates are thermodynamically stable over geological timescales, providing permanent carbon storage.</p>
            </div>

            <h4>Carbon-Negative Aggregates</h4>

            <p>Emerging technologies produce aggregates while sequestering carbon:</p>

            <ul>
              <li><strong>Blue Planet:</strong> Captures CO2 from flue gas, precipitates as calcium carbonate aggregate</li>
              <li><strong>Carbon8:</strong> Accelerated carbonation of industrial wastes (APCr) to create aggregate</li>
              <li><strong>Bioite:</strong> Microbial precipitation of carbonate aggregates</li>
            </ul>

            <h4>Bioite Formation Process</h4>

            <p>MICP-based aggregate formation represents a convergence of biological and geological carbon sequestration:</p>

            <ol>
              <li>Ureolytic bacteria (e.g., Sporosarcina pasteurii) hydrolyze urea</li>
              <li>Hydrolysis raises local pH and produces carbonate ions</li>
              <li>Calcium ions in solution precipitate as calcite</li>
              <li>Calcite binds loose aggregate particles</li>
              <li>Process can operate at ambient temperature and pressure</li>
            </ol>

            <h3>Systems-Level Research Questions</h3>

            <h4>Scaling Challenges</h4>

            <p>Translating laboratory innovations to industrial scale presents persistent challenges:</p>

            <table>
              <tr>
                <th>Challenge</th>
                <th>Research Questions</th>
              </tr>
              <tr>
                <td>Feedstock supply</td>
                <td>Can agricultural residue supply meet demand without competing with food/soil health? What are sustainable harvest rates?</td>
              </tr>
              <tr>
                <td>Manufacturing scale-up</td>
                <td>How do biological processes behave at industrial volumes? What are rate-limiting factors?</td>
              </tr>
              <tr>
                <td>Quality consistency</td>
                <td>How do we achieve reproducible properties with inherently variable biological systems?</td>
              </tr>
              <tr>
                <td>Energy requirements</td>
                <td>Are processing energy demands compatible with carbon-negative claims?</td>
              </tr>
              <tr>
                <td>End-of-life</td>
                <td>How do novel materials perform through multiple use cycles? What degradation mechanisms apply?</td>
              </tr>
            </table>

            <h4>Performance Verification</h4>

            <p>Validating novel material performance requires addressing:</p>

            <ul>
              <li><strong>Long-term durability:</strong> Accelerated aging protocols may not capture all degradation mechanisms</li>
              <li><strong>Biological stability:</strong> How do bio-based materials respond to moisture, pests, microorganisms?</li>
              <li><strong>Fire performance:</strong> Standard tests designed for conventional materials may not apply</li>
              <li><strong>Structural reliability:</strong> Probabilistic models for materials with high inherent variability</li>
            </ul>

            <blockquote class="scavenger-quote" data-quote-id="gb-mat-phd-q2">
              <p>"We're not just developing new materials—we're developing new paradigms for how materials can be made, used, and returned to natural cycles."</p>
              <cite>— Dr. Wil Srubar, University of Colorado Boulder</cite>
            </blockquote>

            <h4>Standards Development</h4>

            <p>Novel materials require new testing standards and certification pathways:</p>

            <ul>
              <li>Existing standards assume conventional material properties and failure modes</li>
              <li>Bio-based materials may require performance-based rather than prescriptive standards</li>
              <li>Carbon accounting standards must address biogenic carbon complexities</li>
              <li>Building codes lag material innovation by decades</li>
            </ul>

            <h4>Market Transformation Research</h4>

            <p>Technical feasibility is necessary but not sufficient. Research examines:</p>

            <ul>
              <li><strong>Innovation diffusion:</strong> How do novel construction materials achieve market penetration?</li>
              <li><strong>Risk perception:</strong> How do designers, contractors, and owners evaluate unfamiliar materials?</li>
              <li><strong>Supply chain development:</strong> What infrastructure investments enable new material supply chains?</li>
              <li><strong>Policy effectiveness:</strong> Which policy mechanisms most effectively accelerate adoption?</li>
            </ul>

            <h3>Whole-Systems Carbon Analysis</h3>

            <h4>Consequential vs. Attributional LCA</h4>

            <p>Traditional attributional LCA may underestimate or overestimate actual climate impacts:</p>

            <table>
              <tr>
                <th>Approach</th>
                <th>Method</th>
                <th>Application</th>
              </tr>
              <tr>
                <td>Attributional</td>
                <td>Allocates existing impacts to products</td>
                <td>Product comparisons, EPDs</td>
              </tr>
              <tr>
                <td>Consequential</td>
                <td>Models system-wide effects of decisions</td>
                <td>Policy analysis, large-scale shifts</td>
              </tr>
            </table>

            <p>For example, attributional LCA may show mass timber as carbon-negative. Consequential LCA asks: if demand increases dramatically, what happens to forest carbon stocks? What land-use changes occur?</p>

            <h4>Dynamic Carbon Accounting</h4>

            <p>Timing of emissions matters for climate impact. Research examines:</p>

            <ul>
              <li><strong>Temporary carbon storage:</strong> Value of delaying emissions (time value of carbon)</li>
              <li><strong>Tipping points:</strong> Near-term emissions may cross irreversible thresholds</li>
              <li><strong>Technology transitions:</strong> How do near-term material choices affect long-term technology trajectories?</li>
            </ul>

            <h3>Research Frontiers</h3>

            <div class="frontier-topics">
              <h4>Emerging Research Directions</h4>
              <ul>
                <li>Genetic engineering of organisms for optimized material production</li>
                <li>Machine learning for bio-based material property prediction</li>
                <li>Digital fabrication with living materials</li>
                <li>In-situ material production using local resources and biology</li>
                <li>Integration of material production with building-integrated agriculture</li>
                <li>Planetary-scale carbon cycle modeling for construction material scenarios</li>
              </ul>
            </div>

            <div class="chapter-summary">
              <h4>Key Research Takeaways</h4>
              <ul>
                <li>Mycelium composites represent a "growing not extracting" manufacturing paradigm</li>
                <li>Engineered living materials offer self-healing and adaptive capabilities</li>
                <li>Carbon mineralization can provide permanent geological storage in aggregates</li>
                <li>Scaling biological processes to industrial volumes presents unique challenges</li>
                <li>Standards and codes lag material innovation, requiring performance-based approaches</li>
                <li>Consequential LCA reveals system-level effects that attributional approaches miss</li>
              </ul>
            </div>

            <div class="reflection-question">
              <h4>Doctoral Research Prompt</h4>
              <p>Identify a specific research gap in carbon-negative construction materials (e.g., mycelium structural properties, MICP scaling, biogenic carbon accounting). Develop a research proposal including: literature review and gap analysis, research questions and hypotheses, proposed methodology, expected contributions, and potential barriers to translation.</p>
            </div>
          </div>`
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
          ELEMENTARY: `<div class="lesson-content">
            <h2>Design Your Dream Green Building!</h2>

            <div class="story-intro">
              <p>Imagine you could design the perfect building - one that's kind to the Earth and makes everyone inside happy and healthy. That's what green building designers do!</p>
            </div>

            <h3>What Makes a Building Green?</h3>

            <p>A green building is like a superhero for the planet! It has special powers:</p>

            <div class="key-concept">
              <h4>Green Building Superpowers</h4>
              <ul>
                <li><strong>Sun Power:</strong> Uses sunshine for light and warmth</li>
                <li><strong>Water Wisdom:</strong> Saves every drop of water</li>
                <li><strong>Earth-Friendly Materials:</strong> Made from things that don't hurt the planet</li>
                <li><strong>Living Spaces:</strong> Has plants inside and outside</li>
                <li><strong>Energy Saver:</strong> Uses very little electricity</li>
              </ul>
            </div>

            <h3>Let the Sunshine In!</h3>

            <p>Green buildings are best friends with the sun. They have big windows to let natural light in. This means no need to turn on lights during the day!</p>

            <h3>Water Detective</h3>

            <p>Green buildings are super smart about water:</p>
            <ul>
              <li>Catch rainwater from the roof</li>
              <li>Use special toilets that use less water</li>
              <li>Have plants that don't need much watering</li>
            </ul>

            <h3>Nature Inside</h3>

            <p>The coolest green buildings bring nature indoors with living walls covered with plants, indoor gardens, and views of nature from every window!</p>

            <div class="activity-box">
              <h4>Design Challenge!</h4>
              <p>Draw your dream green building! Include solar panels, plants, and big windows for sunlight.</p>
            </div>

            <div class="chapter-summary">
              <h4>What We Learned</h4>
              <ul>
                <li>Green buildings use sunshine for light and warmth</li>
                <li>They save water and catch rain</li>
                <li>Nature inside makes people happy</li>
                <li>Solar panels can make buildings energy factories</li>
              </ul>
            </div>
          </div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
            <h2>Green Building Systems: The Complete Picture</h2>

            <div class="intro-section">
              <p>Green buildings work like living organisms - many different systems working together in harmony. Understanding how these systems connect is the key to creating truly sustainable buildings.</p>
            </div>

            <h3>The Five Pillars of Green Building</h3>

            <h4>1. Energy Systems</h4>
            <p>Energy is often the biggest environmental impact. Green buildings use efficient HVAC, LED lighting, smart controls, and solar panels.</p>

            <h4>2. Water Systems</h4>
            <ul>
              <li>Low-flow fixtures using 30-50% less water</li>
              <li>Rainwater harvesting</li>
              <li>Greywater recycling</li>
              <li>Smart irrigation</li>
            </ul>

            <h4>3. Materials and Resources</h4>
            <p>Recycled content, rapidly renewable materials like bamboo, and local sourcing all reduce environmental impact.</p>

            <h4>4. Indoor Environmental Quality</h4>
            <p>Fresh air, daylight, views to outdoors, thermal comfort, and good acoustics make healthy interiors.</p>

            <h4>5. Site and Location</h4>
            <p>Walkable locations near transit, habitat protection, and stormwater management matter as much as the building itself.</p>

            <h3>Green Building Certification Systems</h3>
            <table>
              <tr><th>System</th><th>Focus</th></tr>
              <tr><td>LEED</td><td>Comprehensive sustainability</td></tr>
              <tr><td>Passive House</td><td>Extreme energy efficiency</td></tr>
              <tr><td>Living Building Challenge</td><td>Regenerative design</td></tr>
            </table>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Green buildings address energy, water, materials, indoor quality, and site</li>
                <li>Certification systems verify green building performance</li>
                <li>Building systems are interconnected</li>
              </ul>
            </div>
          </div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
            <h2>Integrated Design Process for High-Performance Buildings</h2>

            <div class="intro-section">
              <p>Creating a truly green building requires rethinking the entire design process to optimize the building as a complete system from the very beginning.</p>
            </div>

            <h3>The Whole Building Approach</h3>

            <p>Building systems interact in complex ways. Optimizing each system separately misses opportunities:</p>
            <ul>
              <li>Better envelope → Smaller HVAC needed</li>
              <li>Daylighting → Less lighting → Less cooling</li>
              <li>Thermal mass + Natural ventilation → Passive comfort</li>
            </ul>

            <h3>The IDP Process</h3>
            <ol>
              <li><strong>Set performance targets</strong> - Define quantifiable goals</li>
              <li><strong>Design charrette</strong> - All disciplines collaborate early</li>
              <li><strong>Energy modeling</strong> - Test ideas throughout design</li>
              <li><strong>Iterate and optimize</strong> - Refine based on results</li>
              <li><strong>Commissioning</strong> - Verify systems work as designed</li>
            </ol>

            <h3>Performance Targets</h3>
            <p>Energy Use Intensity (EUI) measures energy use per square foot per year. Net zero buildings produce as much renewable energy as they consume.</p>

            <h3>Beyond Net Zero: Regenerative Design</h3>
            <p>The most ambitious buildings give back more than they take - exporting clean energy, restoring water cycles, and creating habitat.</p>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Integrated design brings all team members together from project start</li>
                <li>Energy modeling should begin early and continue throughout</li>
                <li>Commissioning verifies performance</li>
              </ul>
            </div>
          </div>`,

          UNDERGRADUATE: `<div class="lesson-content">
            <h2>High-Performance Building Design: From Targets to Verification</h2>

            <div class="intro-section">
              <p>High-performance building design requires rigorous goal-setting, sophisticated analysis tools, and systematic verification.</p>
            </div>

            <h3>Performance Target Hierarchy</h3>
            <table>
              <tr><th>Level</th><th>Energy</th><th>Carbon</th></tr>
              <tr><td>Code Minimum</td><td>ASHRAE 90.1</td><td>Not addressed</td></tr>
              <tr><td>High Performance</td><td>50-70% below code</td><td>50% reduction</td></tr>
              <tr><td>Net Zero</td><td>100% renewable offset</td><td>Net zero operational</td></tr>
              <tr><td>Net Positive</td><td>Exports energy</td><td>Carbon negative</td></tr>
            </table>

            <h3>Energy Modeling</h3>
            <p>Parametric modeling tests multiple variables systematically - window ratios, glazing types, insulation levels, HVAC systems - to find optimal combinations.</p>

            <h3>High-Performance HVAC Strategies</h3>
            <ul>
              <li>Dedicated Outdoor Air Systems (DOAS)</li>
              <li>Energy Recovery Ventilation</li>
              <li>Radiant Heating/Cooling</li>
              <li>Variable Refrigerant Flow (VRF)</li>
              <li>Ground Source Heat Pumps</li>
            </ul>

            <h3>Commissioning and M&V</h3>
            <p>Commissioning verifies systems operate as designed. IPMVP protocols standardize measurement and verification of energy performance.</p>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Performance targets should be quantifiable</li>
                <li>Parametric analysis optimizes multiple variables</li>
                <li>Load reduction precedes efficient systems and renewables</li>
                <li>M&V protocols verify performance</li>
              </ul>
            </div>
          </div>`,

          GRADUATE: `<div class="lesson-content">
            <h2>Advanced Building Performance: Closing the Gap</h2>

            <div class="intro-section">
              <p>Research consistently shows buildings often use significantly more energy than predicted. Understanding and closing this "performance gap" is critical for genuine sustainability.</p>
            </div>

            <h3>The Performance Gap</h3>
            <p>Studies reveal buildings use 25-150% more energy than predicted, with root causes spanning design, construction, operations, and occupancy.</p>

            <h3>Root Causes</h3>
            <ul>
              <li><strong>Design:</strong> Unrealistic assumptions, value engineering</li>
              <li><strong>Construction:</strong> Poor installation, substitutions</li>
              <li><strong>Operations:</strong> Controls not optimized, maintenance gaps</li>
              <li><strong>Occupancy:</strong> Different patterns, thermostat overrides</li>
            </ul>

            <h3>Closing the Gap</h3>
            <p>Enhanced commissioning, fault detection and diagnostics (FDD), continuous commissioning, and occupant engagement all help buildings perform as intended.</p>

            <h3>Post-Occupancy Evaluation</h3>
            <p>Systematic assessment after occupancy examines energy performance, indoor environment, occupant satisfaction, and operational effectiveness.</p>

            <h3>Emerging Approaches</h3>
            <p>Digital twins synchronize virtual models with physical buildings. Machine learning enables anomaly detection, predictive maintenance, and automated optimization.</p>

            <div class="chapter-summary">
              <h4>Key Takeaways</h4>
              <ul>
                <li>Performance gaps are common and significant</li>
                <li>Continuous commissioning maintains performance</li>
                <li>Occupant behavior significantly impacts performance</li>
                <li>Digital twins and ML offer new optimization tools</li>
              </ul>
            </div>
          </div>`,

          PHD: `<div class="lesson-content">
            <h2>Building Performance Research: Frontiers and Future Directions</h2>

            <div class="intro-section">
              <p>Building performance research operates at the intersection of engineering, behavioral science, data science, and policy. This lesson examines current research frontiers.</p>
            </div>

            <h3>Performance Gap Research</h3>
            <p>Methodological challenges include baseline definition, normalization, attribution, and generalizability. Research directions include uncertainty quantification, calibration protocols, and multi-building studies.</p>

            <h3>Building-Grid Integration</h3>
            <p>Grid-Interactive Efficient Buildings (GEBs) provide demand response, load shifting, frequency regulation, and renewable firming. Research examines thermal storage, battery integration, predictive controls, and aggregation strategies.</p>

            <h3>Regenerative Design Research</h3>
            <p>Beyond net zero, net positive frameworks address energy export, water cycle restoration, carbon sequestration, habitat creation, and community benefit. Metrics and verification methods remain underdeveloped.</p>

            <h3>Biophilic Design Research</h3>
            <p>Evidence links nature exposure to physiological, psychological, cognitive, and health outcomes. Research questions include dose-response relationships, mechanisms, and long-term effects.</p>

            <h3>Emerging Frontiers</h3>
            <ul>
              <li>Machine learning for autonomous building control</li>
              <li>Low-cost sensor networks</li>
              <li>Privacy-preserving data sharing</li>
              <li>Circadian lighting research</li>
              <li>Climate adaptation and resilience</li>
            </ul>

            <div class="chapter-summary">
              <h4>Key Research Takeaways</h4>
              <ul>
                <li>Performance gap research needs standardized methods</li>
                <li>Building-grid integration requires coordination research</li>
                <li>Regenerative design lacks verification methods</li>
                <li>Biophilic benefits are established but mechanisms need study</li>
              </ul>
            </div>
          </div>`
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
  },
  // Module 4: Sustainable Materials
  {
    id: 'green-materials',
    slug: 'sustainable-materials',
    title: 'Sustainable Materials',
    description: {
      ELEMENTARY: 'Learn about eco-friendly materials for building!',
      MIDDLE_SCHOOL: 'Discover materials that are better for the environment.',
      HIGH_SCHOOL: 'Explore embodied carbon, life cycle assessment, and material selection.',
      UNDERGRADUATE: 'Analyze material LCA, EPDs, and sustainable procurement strategies.',
      GRADUATE: 'Examine circular economy in construction, bio-based materials, and supply chains.',
      PHD: 'Research novel sustainable materials, carbon storage potential, and system-level impacts.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Boxes',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-mat-1', title: 'Building Better', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Earth-Friendly Building!</h2><p>Some building materials are better for our planet - like bamboo, recycled wood, and natural stone!</p>', MIDDLE_SCHOOL: '<h2>Material Choices Matter</h2><p>Every building material takes energy to make and transport. Choosing wisely helps the environment.</p>', HIGH_SCHOOL: '<h2>Embodied Carbon</h2><p>The carbon emitted to manufacture, transport, install, and eventually dispose of materials. Often 20-50% of a building lifecycle carbon.</p>', UNDERGRADUATE: '<h2>Life Cycle Assessment</h2><p>Cradle-to-grave analysis of material environmental impacts. EPDs (Environmental Product Declarations) standardize reporting.</p>', GRADUATE: '<h2>Circular Construction</h2><p>Design for disassembly, material passports, and reuse markets to keep materials in use.</p>', PHD: '<h2>Research Frontiers</h2><p>Bio-based materials, carbon-storing concrete, and system-level material flow modeling.</p>' } }],
    activities: [{ id: 'gb-mat-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Sort the Materials!', MIDDLE_SCHOOL: 'Compare Impacts', HIGH_SCHOOL: 'Calculate Embodied Carbon', UNDERGRADUATE: 'EPD Analysis', GRADUATE: 'Circular Design', PHD: 'LCA Modeling' }, description: { ELEMENTARY: 'Sort materials into eco-friendly and not!', MIDDLE_SCHOOL: 'Compare environmental impacts of different materials.', HIGH_SCHOOL: 'Calculate embodied carbon for a building.', UNDERGRADUATE: 'Analyze EPDs to select materials.', GRADUATE: 'Design for material circularity.', PHD: 'Model system-level material impacts.' }, config: { ELEMENTARY: { items: 8, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 10, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 }, GRADUATE: { items: 18, hints: false, timeLimit: 90 }, PHD: { items: 22, hints: false, timeLimit: 60 } } }],
    game: { id: 'gb-mat-game', type: 'matching', title: 'Material Master', description: 'Choose the best materials for green buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-mat-quiz', passingScore: 80, questions: [{ id: 'gbmq1', question: { ELEMENTARY: 'Which is an eco-friendly building material?', MIDDLE_SCHOOL: 'What does "embodied" mean for materials?', HIGH_SCHOOL: 'What percentage of building carbon is embodied?', UNDERGRADUATE: 'What is an EPD?', GRADUATE: 'What is design for disassembly?', PHD: 'What are bio-based materials?' }, options: { ELEMENTARY: ['Bamboo', 'Plastic', 'Styrofoam', 'Oil'], MIDDLE_SCHOOL: ['Carbon used to make and transport it', 'How it looks', 'Its weight', 'Its color'], HIGH_SCHOOL: ['20-50%', '1-5%', '90-100%', '0%'], UNDERGRADUATE: ['Environmental Product Declaration', 'Energy Power Distribution', 'Electric Product Design', 'None of these'], GRADUATE: ['Designing so buildings can be taken apart for reuse', 'Building to last forever', 'Random construction', 'Using glue everywhere'], PHD: ['Materials derived from biological sources', 'Only metal materials', 'Only concrete', 'Synthetic only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Bamboo grows fast and is a sustainable, eco-friendly building material!', MIDDLE_SCHOOL: 'Embodied carbon is the carbon emissions from making and transporting a material.', HIGH_SCHOOL: 'Embodied carbon typically accounts for 20-50% of a building\'s total lifecycle carbon.', UNDERGRADUATE: 'EPDs (Environmental Product Declarations) standardize environmental impact reporting for materials.', GRADUATE: 'Design for disassembly allows buildings to be taken apart so materials can be reused.', PHD: 'Bio-based materials are derived from biological sources like wood, bamboo, or hemp.' } }] },
    externalResources: [{ title: 'Building Transparency', url: 'https://www.buildingtransparency.org/', type: 'research' }]
  },
  // Module 5: Water Efficient Buildings
  {
    id: 'green-water',
    slug: 'water-efficient-buildings',
    title: 'Water Efficient Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings can save water!',
      MIDDLE_SCHOOL: 'Discover fixtures and systems that use less water.',
      HIGH_SCHOOL: 'Explore water-efficient technologies, rainwater harvesting, and greywater reuse.',
      UNDERGRADUATE: 'Analyze water balance, net-zero water strategies, and system integration.',
      GRADUATE: 'Examine water-energy nexus, regulatory frameworks, and building-scale treatment.',
      PHD: 'Research integrated water management, emerging technologies, and resilience.'
    },
    topic: 'green-building',
    category: 'WATER',
    icon: 'Droplets',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-water-1', title: 'Saving Every Drop', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water-Smart Buildings!</h2><p>Buildings can save water with special toilets, faucets, and by collecting rain!</p>', MIDDLE_SCHOOL: '<h2>Water Efficiency</h2><p>Low-flow fixtures, efficient appliances, and smart irrigation can cut water use by 30-50%.</p>', HIGH_SCHOOL: '<h2>Water Systems</h2><p>Rainwater harvesting, greywater reuse, and on-site treatment can dramatically reduce municipal water demand.</p>', UNDERGRADUATE: '<h2>Net Zero Water</h2><p>Buildings that capture, treat, and reuse water to eliminate net water withdrawal from offsite.</p>', GRADUATE: '<h2>Water-Energy Nexus</h2><p>Water and energy are interconnected. Saving water saves energy; efficient treatment saves both.</p>', PHD: '<h2>Research Frontiers</h2><p>Building-scale water treatment, atmospheric water harvesting, and climate resilience.</p>' } }],
    activities: [{ id: 'gb-water-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fix the Leaks!', MIDDLE_SCHOOL: 'Water Audit', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Water Balance', GRADUATE: 'Integrated Design', PHD: 'Resilience Modeling' }, description: { ELEMENTARY: 'Find and fix water waste in a building!', MIDDLE_SCHOOL: 'Conduct a water audit of a building.', HIGH_SCHOOL: 'Design rainwater and greywater systems.', UNDERGRADUATE: 'Create a building water balance.', GRADUATE: 'Design an integrated water-energy system.', PHD: 'Model water system resilience.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-water-game', type: 'puzzle', title: 'Water Saver', description: 'Design water-efficient buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-water-quiz', passingScore: 80, questions: [{ id: 'gbwq1', question: { ELEMENTARY: 'How can buildings save water?', MIDDLE_SCHOOL: 'How much can efficient fixtures save?', HIGH_SCHOOL: 'What is greywater?', UNDERGRADUATE: 'What is net zero water?', GRADUATE: 'How are water and energy connected?', PHD: 'What is atmospheric water harvesting?' }, options: { ELEMENTARY: ['Low-flow toilets and faucets', 'Running water constantly', 'Bigger pipes', 'More faucets'], MIDDLE_SCHOOL: ['30-50%', '5%', '90%', '0%'], HIGH_SCHOOL: ['Water from sinks and showers', 'Toilet water', 'Drinking water', 'Rain water'], UNDERGRADUATE: ['No net withdrawal from offsite sources', 'Using only municipal water', 'Maximum water use', 'No water at all'], GRADUATE: ['Treating and moving water requires energy', 'No connection', 'Water makes electricity', 'Energy makes water'], PHD: ['Capturing water from humid air', 'Collecting rain', 'Well water', 'Ocean water'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Low-flow toilets and faucets use much less water than regular ones!', MIDDLE_SCHOOL: 'Efficient fixtures and appliances can reduce water use by 30-50%.', HIGH_SCHOOL: 'Greywater is relatively clean wastewater from sinks, showers, and laundry.', UNDERGRADUATE: 'Net zero water buildings capture and treat enough water to eliminate net withdrawal.', GRADUATE: 'Water and energy are interconnected - pumping, heating, and treating water requires significant energy.', PHD: 'Atmospheric water harvesting captures water vapor from humid air for drinking water.' } }] },
    externalResources: [{ title: 'Alliance for Water Efficiency', url: 'https://www.allianceforwaterefficiency.org/', type: 'research' }]
  },
  // Module 6: Indoor Air Quality
  {
    id: 'green-iaq',
    slug: 'indoor-air-quality',
    title: 'Indoor Air Quality',
    description: {
      ELEMENTARY: 'Learn why fresh air in buildings is so important!',
      MIDDLE_SCHOOL: 'Discover what makes indoor air healthy or unhealthy.',
      HIGH_SCHOOL: 'Explore ventilation, filtration, and source control strategies.',
      UNDERGRADUATE: 'Analyze IAQ standards, monitoring, and HVAC system design.',
      GRADUATE: 'Examine health impacts, productivity research, and building performance.',
      PHD: 'Research IAQ-health relationships, emerging contaminants, and ventilation optimization.'
    },
    topic: 'green-building',
    category: 'HEALTH',
    icon: 'Wind',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-iaq-1', title: 'Breathing Easy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clean Air Inside!</h2><p>We spend most of our time indoors. Fresh, clean air keeps us healthy and happy!</p>', MIDDLE_SCHOOL: '<h2>What is Indoor Air Quality?</h2><p>IAQ measures how clean and healthy the air inside buildings is. Good ventilation and few pollutants make good IAQ.</p>', HIGH_SCHOOL: '<h2>IAQ Factors</h2><p>Ventilation rates, filtration, source control (low-emitting materials), humidity, and CO2 levels.</p>', UNDERGRADUATE: '<h2>IAQ Engineering</h2><p>ASHRAE standards, ACH rates, filtration (MERV ratings), and demand-controlled ventilation.</p>', GRADUATE: '<h2>Health and Productivity</h2><p>Research shows better IAQ improves cognitive function, reduces illness, and increases productivity.</p>', PHD: '<h2>Research Frontiers</h2><p>Personalized exposure, real-time monitoring networks, and ventilation-infection relationships.</p>' } }],
    activities: [{ id: 'gb-iaq-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fresh Air Hunt!', MIDDLE_SCHOOL: 'Pollutant Detective', HIGH_SCHOOL: 'Ventilation Design', UNDERGRADUATE: 'System Optimization', GRADUATE: 'Health Impact Study', PHD: 'Monitoring Network' }, description: { ELEMENTARY: 'Find ways to bring fresh air into rooms!', MIDDLE_SCHOOL: 'Identify indoor air pollutants and sources.', HIGH_SCHOOL: 'Design ventilation for a building.', UNDERGRADUATE: 'Optimize HVAC for IAQ and energy.', GRADUATE: 'Study IAQ impacts on health and productivity.', PHD: 'Design an IAQ monitoring network.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-iaq-game', type: 'puzzle', title: 'Air Quality Manager', description: 'Keep indoor air clean and healthy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-iaq-quiz', passingScore: 80, questions: [{ id: 'gbiaq1', question: { ELEMENTARY: 'What makes indoor air healthy?', MIDDLE_SCHOOL: 'What is a common indoor air pollutant?', HIGH_SCHOOL: 'What does MERV rate?', UNDERGRADUATE: 'What does ACH stand for?', GRADUATE: 'How does IAQ affect productivity?', PHD: 'What is demand-controlled ventilation?' }, options: { ELEMENTARY: ['Fresh air from outside', 'Keeping windows sealed', 'Using air fresheners', 'Ignoring it'], MIDDLE_SCHOOL: ['Dust and VOCs', 'Only outdoor pollution', 'Nothing - indoor air is clean', 'Pure oxygen'], HIGH_SCHOOL: ['Filter efficiency', 'Air speed', 'Humidity', 'Temperature'], UNDERGRADUATE: ['Air Changes per Hour', 'Air Control Handler', 'Automatic Cooling and Heating', 'None of these'], GRADUATE: ['Better IAQ improves cognitive function', 'No effect', 'Decreases productivity', 'Only affects comfort'], PHD: ['Adjusting ventilation based on occupancy/CO2', 'Fixed ventilation always', 'No ventilation', 'Random adjustment'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Fresh air from outside helps keep indoor air healthy and clean!', MIDDLE_SCHOOL: 'Dust, VOCs (volatile organic compounds), and CO2 are common indoor pollutants.', HIGH_SCHOOL: 'MERV (Minimum Efficiency Reporting Value) rates how well filters capture particles.', UNDERGRADUATE: 'ACH (Air Changes per Hour) measures how many times room air is replaced per hour.', GRADUATE: 'Research shows improved IAQ increases cognitive function and productivity significantly.', PHD: 'Demand-controlled ventilation adjusts airflow based on real-time CO2 or occupancy sensing.' } }] },
    externalResources: [{ title: 'EPA Indoor Air Quality', url: 'https://www.epa.gov/indoor-air-quality-iaq', type: 'research' }]
  },
  // Module 7: Building-Integrated Renewables
  {
    id: 'green-renewables',
    slug: 'building-integrated-renewables',
    title: 'Building-Integrated Renewables',
    description: {
      ELEMENTARY: 'Learn how buildings can make their own energy!',
      MIDDLE_SCHOOL: 'Discover solar panels, wind turbines, and other renewables on buildings.',
      HIGH_SCHOOL: 'Explore BIPV, small wind, and building-scale renewable systems.',
      UNDERGRADUATE: 'Analyze renewable system sizing, integration, and grid connection.',
      GRADUATE: 'Examine net-zero energy buildings, storage integration, and policy incentives.',
      PHD: 'Research advanced BIPV, building-to-grid integration, and optimization.'
    },
    topic: 'green-building',
    category: 'ENERGY',
    icon: 'Sun',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ren-1', title: 'Power from Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Make Energy!</h2><p>Solar panels on roofs can make electricity from sunlight. Some buildings make all the energy they need!</p>', MIDDLE_SCHOOL: '<h2>Renewables on Buildings</h2><p>Rooftop solar is most common. Some buildings also use small wind, solar thermal, or ground-source heat pumps.</p>', HIGH_SCHOOL: '<h2>Building-Integrated PV</h2><p>BIPV replaces conventional materials - solar shingles, facade panels, and solar glass that generate power.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Load matching, sizing for net-zero, inverter selection, and grid interconnection requirements.</p>', GRADUATE: '<h2>Net-Zero Energy</h2><p>Buildings that produce as much energy as they consume annually through efficiency and on-site renewables.</p>', PHD: '<h2>Research Frontiers</h2><p>Advanced BIPV materials, building-grid interaction optimization, and distributed energy systems.</p>' } }],
    activities: [{ id: 'gb-ren-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Add Solar Panels!', MIDDLE_SCHOOL: 'Design a Solar Roof', HIGH_SCHOOL: 'System Sizing', UNDERGRADUATE: 'Grid Integration', GRADUATE: 'Net-Zero Design', PHD: 'Optimization Model' }, description: { ELEMENTARY: 'Add solar panels to power a building!', MIDDLE_SCHOOL: 'Design a rooftop solar system.', HIGH_SCHOOL: 'Size a renewable system for building loads.', UNDERGRADUATE: 'Design grid-connected building renewables.', GRADUATE: 'Design a net-zero energy building.', PHD: 'Optimize building-grid energy flows.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ren-game', type: 'simulation', title: 'Renewable Builder', description: 'Power buildings with renewable energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ren-quiz', passingScore: 80, questions: [{ id: 'gbrq1', question: { ELEMENTARY: 'What do solar panels on buildings do?', MIDDLE_SCHOOL: 'What is the most common building renewable?', HIGH_SCHOOL: 'What is BIPV?', UNDERGRADUATE: 'What is load matching?', GRADUATE: 'What is a net-zero energy building?', PHD: 'What is advanced BIPV?' }, options: { ELEMENTARY: ['Make electricity from sunlight', 'Make the building taller', 'Provide shade only', 'Nothing'], MIDDLE_SCHOOL: ['Rooftop solar PV', 'Nuclear', 'Coal', 'Natural gas'], HIGH_SCHOOL: ['Building-Integrated Photovoltaics', 'Big Industrial Power Vault', 'Building Interior Power View', 'None of these'], UNDERGRADUATE: ['Aligning generation with building demand', 'Maximum output always', 'No connection to load', 'Random generation'], GRADUATE: ['Produces as much energy as it consumes annually', 'Uses no energy', 'Produces maximum energy', 'Uses maximum energy'], PHD: ['Solar materials integrated into building surfaces', 'Larger panels', 'Only rooftop', 'No integration'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar panels convert sunlight into electricity to power the building!', MIDDLE_SCHOOL: 'Rooftop solar PV is by far the most common renewable technology on buildings.', HIGH_SCHOOL: 'BIPV (Building-Integrated Photovoltaics) replaces building materials with power-generating surfaces.', UNDERGRADUATE: 'Load matching aligns renewable generation timing with building electricity demand.', GRADUATE: 'Net-zero energy buildings produce as much energy as they consume over a year.', PHD: 'Advanced BIPV integrates solar cells into facades, windows, and surfaces as building materials.' } }] },
    externalResources: [{ title: 'NREL Buildings', url: 'https://www.nrel.gov/buildings/', type: 'research' }]
  },
  // Module 8: Green Roofs and Walls
  {
    id: 'green-roofs-walls',
    slug: 'green-roofs-and-walls',
    title: 'Green Roofs and Walls',
    description: {
      ELEMENTARY: 'Learn about plants growing on buildings!',
      MIDDLE_SCHOOL: 'Discover how rooftop gardens and living walls help buildings.',
      HIGH_SCHOOL: 'Explore green roof types, benefits, and installation considerations.',
      UNDERGRADUATE: 'Analyze green infrastructure performance, stormwater benefits, and thermal impacts.',
      GRADUATE: 'Examine urban heat island mitigation, biodiversity, and policy incentives.',
      PHD: 'Research plant-building interactions, performance modeling, and long-term outcomes.'
    },
    topic: 'green-building',
    category: 'LANDSCAPING',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-gr-1', title: 'Living Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Gardens in the Sky!</h2><p>Some buildings have gardens on their roofs! Plants keep buildings cool and give birds and bees a home.</p>', MIDDLE_SCHOOL: '<h2>Green Roofs and Walls</h2><p>Living plants on buildings reduce heat, capture rainwater, clean air, and provide habitat.</p>', HIGH_SCHOOL: '<h2>Green Roof Types</h2><p>Extensive (shallow, low maintenance), intensive (deeper, more plants), and semi-intensive (in between).</p>', UNDERGRADUATE: '<h2>Performance Analysis</h2><p>Stormwater retention, thermal performance, energy savings, and maintenance requirements.</p>', GRADUATE: '<h2>Urban Benefits</h2><p>Heat island mitigation, air quality improvement, biodiversity corridors, and property values.</p>', PHD: '<h2>Research Frontiers</h2><p>Long-term performance data, plant selection optimization, and integrated systems.</p>' } }],
    activities: [{ id: 'gb-gr-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Rooftop Garden!', MIDDLE_SCHOOL: 'Design Green Infrastructure', HIGH_SCHOOL: 'System Selection', UNDERGRADUATE: 'Performance Analysis', GRADUATE: 'Urban Planning', PHD: 'Long-Term Modeling' }, description: { ELEMENTARY: 'Create a garden on top of a building!', MIDDLE_SCHOOL: 'Design green roofs and walls for a building.', HIGH_SCHOOL: 'Select appropriate green roof systems.', UNDERGRADUATE: 'Analyze green roof stormwater performance.', GRADUATE: 'Plan green infrastructure at city scale.', PHD: 'Model long-term green roof performance.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-gr-game', type: 'simulation', title: 'Rooftop Gardener', description: 'Design green roofs and living walls!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-gr-quiz', passingScore: 80, questions: [{ id: 'gbgrq1', question: { ELEMENTARY: 'What grows on a green roof?', MIDDLE_SCHOOL: 'What do green roofs do for rain?', HIGH_SCHOOL: 'What is an extensive green roof?', UNDERGRADUATE: 'How do green roofs save energy?', GRADUATE: 'What is the heat island effect?', PHD: 'What is a key research gap for green roofs?' }, options: { ELEMENTARY: ['Plants', 'Cars', 'Houses', 'Nothing'], MIDDLE_SCHOOL: ['Absorb and slow it down', 'Make more rain', 'Ignore it', 'Speed it up'], HIGH_SCHOOL: ['Shallow with low-maintenance plants', 'Deep with trees', 'No plants', 'Only grass'], UNDERGRADUATE: ['Insulation and evaporative cooling', 'Using more energy', 'No energy effect', 'Heating the building'], GRADUATE: ['Cities being hotter than surrounding areas', 'Islands getting hot', 'No effect', 'Cities being cooler'], PHD: ['Long-term performance data', 'Too much data', 'No questions left', 'Easy installation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green roofs have living plants growing on them!', MIDDLE_SCHOOL: 'Green roofs absorb rainwater like a sponge, reducing runoff.', HIGH_SCHOOL: 'Extensive green roofs are shallow (2-6 inches) with hardy, low-maintenance plants.', UNDERGRADUATE: 'Green roofs provide insulation and evaporative cooling, reducing heating and cooling energy.', GRADUATE: 'Urban heat island effect makes cities significantly hotter than surrounding rural areas.', PHD: 'Long-term performance data under different climates remains a key research gap.' } }] },
    externalResources: [{ title: 'Green Roofs for Healthy Cities', url: 'https://greenroofs.org/', type: 'research' }]
  },
  // Module 9: Building Retrofits
  {
    id: 'green-retrofits',
    slug: 'building-retrofits',
    title: 'Building Retrofits',
    description: {
      ELEMENTARY: 'Learn how to make old buildings green!',
      MIDDLE_SCHOOL: 'Discover ways to improve existing buildings.',
      HIGH_SCHOOL: 'Explore energy audits, weatherization, and system upgrades.',
      UNDERGRADUATE: 'Analyze deep retrofits, cost-benefit, and project planning.',
      GRADUATE: 'Examine portfolio approaches, financing mechanisms, and policy drivers.',
      PHD: 'Research retrofit effectiveness, decision support, and scaling strategies.'
    },
    topic: 'green-building',
    category: 'RENOVATION',
    icon: 'Wrench',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ret-1', title: 'Making Buildings Better', order: 1, duration: 15, hasActivity: true, activityType: 'STEP_GUIDED', content: { ELEMENTARY: '<h2>Fix Up, Green Up!</h2><p>Old buildings can become green buildings! Adding insulation, better windows, and efficient appliances helps.</p>', MIDDLE_SCHOOL: '<h2>Building Improvements</h2><p>Most buildings already exist. Retrofitting them is essential - insulation, air sealing, efficient HVAC, and lighting.</p>', HIGH_SCHOOL: '<h2>Energy Audits</h2><p>Assessments identify improvement opportunities. Blower door tests, thermal imaging, and utility analysis guide retrofits.</p>', UNDERGRADUATE: '<h2>Deep Retrofits</h2><p>Comprehensive improvements achieving 50%+ energy reduction. Envelope, systems, and controls all upgraded together.</p>', GRADUATE: '<h2>Scaling Retrofits</h2><p>Portfolio approaches, PACE financing, energy service agreements, and building performance standards.</p>', PHD: '<h2>Research Frontiers</h2><p>Retrofit effectiveness studies, decision support tools, and scaling barriers.</p>' } }],
    activities: [{ id: 'gb-ret-act-1', type: 'STEP_GUIDED', title: { ELEMENTARY: 'Fix the Building!', MIDDLE_SCHOOL: 'Plan Improvements', HIGH_SCHOOL: 'Energy Audit', UNDERGRADUATE: 'Deep Retrofit', GRADUATE: 'Portfolio Strategy', PHD: 'Decision Tool' }, description: { ELEMENTARY: 'Help make an old building more efficient!', MIDDLE_SCHOOL: 'Plan energy improvements for a building.', HIGH_SCHOOL: 'Conduct an energy audit.', UNDERGRADUATE: 'Design a deep retrofit project.', GRADUATE: 'Develop a portfolio retrofit strategy.', PHD: 'Create a retrofit decision support tool.' }, config: { ELEMENTARY: { steps: 5, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { steps: 8, hints: true, timeLimit: 180 }, HIGH_SCHOOL: { steps: 10, hints: false, timeLimit: 150 }, UNDERGRADUATE: { steps: 12, hints: false, timeLimit: 180 }, GRADUATE: { steps: 15, hints: false, timeLimit: 120 }, PHD: { steps: 20, hints: false, timeLimit: 90 } } }],
    game: { id: 'gb-ret-game', type: 'puzzle', title: 'Retrofit Master', description: 'Upgrade buildings for efficiency!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ret-quiz', passingScore: 80, questions: [{ id: 'gbretq1', question: { ELEMENTARY: 'How can you make an old building greener?', MIDDLE_SCHOOL: 'What is the first step in a retrofit?', HIGH_SCHOOL: 'What does a blower door test measure?', UNDERGRADUATE: 'What is a deep retrofit?', GRADUATE: 'What is PACE financing?', PHD: 'What limits retrofit scaling?' }, options: { ELEMENTARY: ['Add insulation and efficient appliances', 'Tear it down', 'Paint it green', 'Ignore it'], MIDDLE_SCHOOL: ['Energy audit to find opportunities', 'Tear down walls', 'Add more rooms', 'Change the address'], HIGH_SCHOOL: ['Building air leakage', 'Water pressure', 'Foundation strength', 'Roof height'], UNDERGRADUATE: ['50%+ energy reduction through comprehensive upgrades', 'Minor changes only', 'Only lighting', 'Only HVAC'], GRADUATE: ['Property tax-based repayment for improvements', 'Personal loan', 'Grant only', 'No financing needed'], PHD: ['Split incentives, upfront costs, disruption', 'Too easy', 'No limits', 'Technology only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Adding insulation, better windows, and efficient appliances makes old buildings greener!', MIDDLE_SCHOOL: 'An energy audit identifies the best opportunities for improving building efficiency.', HIGH_SCHOOL: 'Blower door tests pressurize buildings to measure air leakage rates.', UNDERGRADUATE: 'Deep retrofits achieve 50%+ energy reduction through comprehensive envelope and system upgrades.', GRADUATE: 'PACE (Property Assessed Clean Energy) allows repayment through property tax bills.', PHD: 'Split incentives (tenant/owner), high upfront costs, and occupant disruption limit retrofit scaling.' } }] },
    externalResources: [{ title: 'Energy Star Buildings', url: 'https://www.energystar.gov/buildings', type: 'research' }]
  },
  // Module 10: Green Building Certifications
  {
    id: 'green-certifications',
    slug: 'green-building-certifications',
    title: 'Green Building Certifications',
    description: {
      ELEMENTARY: 'Learn about special awards for green buildings!',
      MIDDLE_SCHOOL: 'Discover how buildings earn green certifications.',
      HIGH_SCHOOL: 'Explore LEED, BREEAM, and other rating systems.',
      UNDERGRADUATE: 'Analyze certification requirements, costs, and market impacts.',
      GRADUATE: 'Examine certification effectiveness, policy integration, and market transformation.',
      PHD: 'Research certification outcomes, system comparison, and next-generation frameworks.'
    },
    topic: 'green-building',
    category: 'CERTIFICATION',
    icon: 'Award',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-cert-1', title: 'Green Awards', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Green Building Badges!</h2><p>Buildings can earn special badges to show they are good for the environment - like getting a gold star!</p>', MIDDLE_SCHOOL: '<h2>Green Certifications</h2><p>LEED, BREEAM, and other systems rate buildings on energy, water, materials, and health. Higher levels mean greener buildings.</p>', HIGH_SCHOOL: '<h2>LEED Rating System</h2><p>Categories: Location, Energy, Water, Materials, Indoor Quality, Innovation. Points earn Certified, Silver, Gold, or Platinum.</p>', UNDERGRADUATE: '<h2>Certification Process</h2><p>Registration, documentation, verification, and ongoing performance reporting for some systems.</p>', GRADUATE: '<h2>Market Impact</h2><p>Green certifications command rent premiums, attract tenants, and may be required by policy or investors.</p>', PHD: '<h2>Research Questions</h2><p>Do certified buildings actually perform better? Cost-effectiveness and market transformation.</p>' } }],
    activities: [{ id: 'gb-cert-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Earn the Badge!', MIDDLE_SCHOOL: 'LEED Categories', HIGH_SCHOOL: 'Certification Path', UNDERGRADUATE: 'Cost-Benefit Analysis', GRADUATE: 'Policy Design', PHD: 'Performance Verification' }, description: { ELEMENTARY: 'Help a building earn its green badge!', MIDDLE_SCHOOL: 'Match LEED categories to building features.', HIGH_SCHOOL: 'Plan a path to LEED certification.', UNDERGRADUATE: 'Analyze certification costs and benefits.', GRADUATE: 'Design certification policy for a city.', PHD: 'Design performance verification study.' }, config: { ELEMENTARY: { items: 6, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 10, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 }, GRADUATE: { items: 18, hints: false, timeLimit: 90 }, PHD: { items: 22, hints: false, timeLimit: 60 } } }],
    game: { id: 'gb-cert-game', type: 'matching', title: 'Certification Expert', description: 'Guide buildings to green certifications!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-cert-quiz', passingScore: 80, questions: [{ id: 'gbcertq1', question: { ELEMENTARY: 'What do green buildings earn?', MIDDLE_SCHOOL: 'What is LEED?', HIGH_SCHOOL: 'What are LEED certification levels?', UNDERGRADUATE: 'What drives certification demand?', GRADUATE: 'Do certified buildings rent for more?', PHD: 'What is a key research question about certifications?' }, options: { ELEMENTARY: ['Special badges showing they are green', 'Money prizes', 'Paint', 'Nothing'], MIDDLE_SCHOOL: ['A green building rating system', 'A type of plant', 'A building material', 'An architect'], HIGH_SCHOOL: ['Certified, Silver, Gold, Platinum', 'A, B, C, D', 'First, Second, Third', 'Good, Better, Best'], UNDERGRADUATE: ['Tenant demand, policy, and investor requirements', 'No demand exists', 'Only cost savings', 'Only marketing'], GRADUATE: ['Yes, studies show rental premiums', 'No premium', 'Lower rents', 'No data'], PHD: ['Do certified buildings actually perform better operationally?', 'Too many questions', 'All answered', 'No questions'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Green buildings earn special badges or certifications showing they help the environment!', MIDDLE_SCHOOL: 'LEED (Leadership in Energy and Environmental Design) is the most widely used green building rating system.', HIGH_SCHOOL: 'LEED has four certification levels based on points earned: Certified, Silver, Gold, and Platinum.', UNDERGRADUATE: 'Tenant preferences, policy requirements, and investor ESG criteria drive certification demand.', GRADUATE: 'Studies consistently show certified buildings command 3-10% rental premiums.', PHD: 'Whether certified buildings actually achieve predicted performance in operation is a key research question.' } }] },
    externalResources: [{ title: 'USGBC LEED', url: 'https://www.usgbc.org/leed', type: 'research' }]
  },
  // Module 11: Net Zero Buildings
  {
    id: 'green-net-zero',
    slug: 'net-zero-buildings',
    title: 'Net Zero Buildings',
    description: {
      ELEMENTARY: 'Learn about buildings that make their own energy!',
      MIDDLE_SCHOOL: 'Discover how buildings can produce as much energy as they use.',
      HIGH_SCHOOL: 'Explore net zero energy design strategies and technologies.',
      UNDERGRADUATE: 'Analyze net zero pathways, economics, and grid interactions.',
      GRADUATE: 'Examine net zero carbon definitions, policy, and portfolio approaches.',
      PHD: 'Research net zero measurement, verification, and scalability challenges.'
    },
    topic: 'green-building',
    category: 'NET ZERO',
    icon: 'Zap',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-nz-1', title: 'Zero Energy Building', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Make Energy!</h2><p>Some buildings have solar panels that make all the electricity they need. They are called net zero buildings!</p>', MIDDLE_SCHOOL: '<h2>What is Net Zero?</h2><p>A net zero energy building produces as much energy as it uses over a year. Super efficient + renewable energy = net zero.</p>', HIGH_SCHOOL: '<h2>Net Zero Strategies</h2><p>First reduce energy demand through efficiency, then generate renewable energy on-site or nearby to meet remaining needs.</p>', UNDERGRADUATE: '<h2>Net Zero Economics</h2><p>First costs, operating savings, incentives, and payback periods. Grid interactions and net metering value.</p>', GRADUATE: '<h2>Net Zero Carbon</h2><p>Beyond energy: embodied carbon, refrigerants, and full lifecycle emissions. Definitions and accounting boundaries.</p>', PHD: '<h2>Research Frontiers</h2><p>Performance gaps, measurement protocols, and scalability to existing building stock.</p>' } }],
    activities: [{ id: 'gb-nz-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make Energy!', MIDDLE_SCHOOL: 'Balance Energy', HIGH_SCHOOL: 'Design Net Zero', UNDERGRADUATE: 'Economic Model', GRADUATE: 'Carbon Accounting', PHD: 'Verification Protocol' }, description: { ELEMENTARY: 'Help a building make its own energy!', MIDDLE_SCHOOL: 'Balance energy use and production.', HIGH_SCHOOL: 'Design a net zero energy building.', UNDERGRADUATE: 'Model net zero project economics.', GRADUATE: 'Account for building lifecycle carbon.', PHD: 'Design net zero verification protocol.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-nz-game', type: 'simulation', title: 'Net Zero Builder', description: 'Design buildings that produce all their energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-nz-quiz', passingScore: 80, questions: [{ id: 'gbnzq1', question: { ELEMENTARY: 'What does a net zero building do?', MIDDLE_SCHOOL: 'What makes a building net zero?', HIGH_SCHOOL: 'What is the first step to net zero?', UNDERGRADUATE: 'What is grid interaction?', GRADUATE: 'What is embodied carbon?', PHD: 'What is the performance gap?' }, options: { ELEMENTARY: ['Makes all the energy it needs', 'Uses no electricity', 'Has no windows', 'Is painted green'], MIDDLE_SCHOOL: ['Produces as much energy as it uses', 'Uses only candles', 'Has no heating', 'Is underground'], HIGH_SCHOOL: ['Reduce energy demand through efficiency', 'Add solar first', 'Ignore insulation', 'Use more energy'], UNDERGRADUATE: ['Exporting and importing energy from grid', 'No grid connection', 'Only importing', 'Only exporting'], GRADUATE: ['Carbon emissions from materials and construction', 'Operational carbon only', 'No carbon', 'Carbon in the ground'], PHD: ['Difference between predicted and actual performance', 'No gap exists', 'Only design gap', 'Perfect prediction'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Net zero buildings have solar panels and other features that make all the energy they need!', MIDDLE_SCHOOL: 'A net zero building produces as much renewable energy as it consumes over a year.', HIGH_SCHOOL: 'First reduce demand through efficiency, then meet remaining needs with renewables.', UNDERGRADUATE: 'Grid interaction involves exporting surplus energy and importing when needed.', GRADUATE: 'Embodied carbon is the emissions from extracting materials, manufacturing, and construction.', PHD: 'The performance gap is the difference between design predictions and actual measured performance.' } }] },
    externalResources: [{ title: 'Net Zero Buildings', url: 'https://newbuildings.org/code_policy/zeronetzero/', type: 'research' }]
  },
  // Module 12: Biophilic Design
  {
    id: 'green-biophilic',
    slug: 'biophilic-design',
    title: 'Biophilic Design',
    description: {
      ELEMENTARY: 'Learn how nature inside buildings makes us happy!',
      MIDDLE_SCHOOL: 'Discover how connecting buildings to nature improves health.',
      HIGH_SCHOOL: 'Explore biophilic design principles and their health benefits.',
      UNDERGRADUATE: 'Analyze biophilic design patterns, implementation, and evidence base.',
      GRADUATE: 'Examine workplace productivity, health outcomes, and economic impacts.',
      PHD: 'Research biophilia mechanisms, measurement methods, and optimal applications.'
    },
    topic: 'green-building',
    category: 'WELLNESS',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-bio-1', title: 'Nature in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Bringing Nature Inside!</h2><p>Plants, sunlight, and natural materials in buildings make us feel good. Our brains love nature!</p>', MIDDLE_SCHOOL: '<h2>Biophilic Design</h2><p>Biophilia means love of nature. Biophilic buildings include plants, water, natural light, and nature views.</p>', HIGH_SCHOOL: '<h2>Design Patterns</h2><p>Direct nature (plants, water), indirect nature (materials, colors), and space conditions (prospect, refuge).</p>', UNDERGRADUATE: '<h2>Implementation</h2><p>Living walls, daylighting, natural materials, nature imagery, and spatial configurations.</p>', GRADUATE: '<h2>Evidence Base</h2><p>Research shows productivity gains, reduced stress, faster healing, and improved wellbeing.</p>', PHD: '<h2>Research Frontiers</h2><p>Mechanisms of biophilic response, dose-response relationships, and optimal applications.</p>' } }],
    activities: [{ id: 'gb-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Add Nature!', MIDDLE_SCHOOL: 'Biophilic Elements', HIGH_SCHOOL: 'Design Patterns', UNDERGRADUATE: 'Office Design', GRADUATE: 'ROI Calculation', PHD: 'Research Design' }, description: { ELEMENTARY: 'Add nature to make a room feel better!', MIDDLE_SCHOOL: 'Choose biophilic elements for a building.', HIGH_SCHOOL: 'Apply biophilic design patterns.', UNDERGRADUATE: 'Design a biophilic office space.', GRADUATE: 'Calculate biophilic design ROI.', PHD: 'Design biophilic research study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-bio-game', type: 'simulation', title: 'Nature Designer', description: 'Create spaces that connect people with nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-bio-quiz', passingScore: 80, questions: [{ id: 'gbbioq1', question: { ELEMENTARY: 'What makes us feel good inside buildings?', MIDDLE_SCHOOL: 'What does biophilia mean?', HIGH_SCHOOL: 'What is a biophilic design pattern?', UNDERGRADUATE: 'What is a living wall?', GRADUATE: 'What workplace benefit does biophilic design provide?', PHD: 'What is the stress reduction mechanism?' }, options: { ELEMENTARY: ['Plants, sunlight, and nature', 'Concrete walls', 'No windows', 'Loud machines'], MIDDLE_SCHOOL: ['Love of nature', 'Fear of plants', 'Building code', 'Type of plant'], HIGH_SCHOOL: ['A way to incorporate nature into design', 'A blueprint', 'A construction method', 'A plant species'], UNDERGRADUATE: ['A vertical garden on a wall', 'A moving wall', 'A concrete wall', 'A wall with screens'], GRADUATE: ['Increased productivity and reduced stress', 'No benefit', 'Higher costs only', 'More meetings'], PHD: ['Attention restoration and parasympathetic activation', 'Only visual', 'No mechanism known', 'Pure placebo'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Plants, sunlight, water sounds, and natural materials help us feel calm and happy!', MIDDLE_SCHOOL: 'Biophilia means love of nature - humans naturally feel good around natural elements.', HIGH_SCHOOL: 'Biophilic design patterns are ways to incorporate natural elements and spatial qualities.', UNDERGRADUATE: 'Living walls are vertical surfaces covered with plants, bringing nature into indoor spaces.', GRADUATE: 'Studies show 6-15% productivity gains and significant stress reduction from biophilic design.', PHD: 'Biophilic responses involve attention restoration theory and parasympathetic nervous system activation.' } }] },
    externalResources: [{ title: 'Biophilic Design', url: 'https://www.terrapinbrightgreen.com/reports/14-patterns/', type: 'research' }]
  },
  // Module 13: Healthy Buildings
  {
    id: 'green-healthy',
    slug: 'healthy-buildings',
    title: 'Healthy Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings can keep us healthy!',
      MIDDLE_SCHOOL: 'Discover what makes buildings good for our health.',
      HIGH_SCHOOL: 'Explore ventilation, lighting, acoustics, and wellness design.',
      UNDERGRADUATE: 'Analyze WELL certification, health metrics, and design strategies.',
      GRADUATE: 'Examine health-focused building standards and post-pandemic design.',
      PHD: 'Research building-health relationships, measurement, and intervention effectiveness.'
    },
    topic: 'green-building',
    category: 'HEALTH',
    icon: 'Heart',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-health-1', title: 'Buildings for Health', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Healthy Buildings!</h2><p>Good buildings have fresh air, natural light, and clean water. They help us stay healthy!</p>', MIDDLE_SCHOOL: '<h2>Indoor Health</h2><p>We spend 90% of time indoors. Air quality, lighting, temperature, and acoustics affect our health.</p>', HIGH_SCHOOL: '<h2>Health Factors</h2><p>Ventilation and air filtration, daylighting and views, thermal comfort, acoustics, and active design.</p>', UNDERGRADUATE: '<h2>WELL Building Standard</h2><p>Rating system focused on human health: air, water, nourishment, light, fitness, comfort, mind.</p>', GRADUATE: '<h2>Post-Pandemic Design</h2><p>Enhanced ventilation, touchless systems, flexible spaces, and infectious disease resilience.</p>', PHD: '<h2>Research Frontiers</h2><p>Building-health causal pathways, real-time monitoring, and intervention effectiveness.</p>' } }],
    activities: [{ id: 'gb-health-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make it Healthy!', MIDDLE_SCHOOL: 'Health Check', HIGH_SCHOOL: 'WELL Features', UNDERGRADUATE: 'Certification Path', GRADUATE: 'Pandemic Design', PHD: 'Health Study' }, description: { ELEMENTARY: 'Add features to make a building healthy!', MIDDLE_SCHOOL: 'Check a building for health features.', HIGH_SCHOOL: 'Select WELL certification features.', UNDERGRADUATE: 'Plan a path to WELL certification.', GRADUATE: 'Design for infectious disease resilience.', PHD: 'Design a building health study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-health-game', type: 'simulation', title: 'Health Builder', description: 'Design buildings that promote health!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-health-quiz', passingScore: 80, questions: [{ id: 'gbhealthq1', question: { ELEMENTARY: 'What do healthy buildings have?', MIDDLE_SCHOOL: 'How much time do we spend indoors?', HIGH_SCHOOL: 'What is the WELL standard?', UNDERGRADUATE: 'What are WELL concepts?', GRADUATE: 'What post-pandemic feature is key?', PHD: 'What is a building health biomarker?' }, options: { ELEMENTARY: ['Fresh air and natural light', 'Loud noises', 'No windows', 'Dark rooms'], MIDDLE_SCHOOL: ['About 90%', 'About 10%', 'About 50%', 'Never indoors'], HIGH_SCHOOL: ['A health-focused building rating system', 'A water company', 'A lighting brand', 'A paint color'], UNDERGRADUATE: ['Air, water, nourishment, light, fitness, comfort, mind', 'Only air', 'Only light', 'Only water'], GRADUATE: ['Enhanced ventilation', 'Smaller spaces', 'No changes needed', 'Less air'], PHD: ['Measurable health indicators linked to building conditions', 'Building size', 'Construction cost', 'Wall color'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Healthy buildings have fresh air, natural light, clean water, and comfortable temperatures!', MIDDLE_SCHOOL: 'We spend about 90% of our time indoors, so building quality really affects our health.', HIGH_SCHOOL: 'WELL is a rating system that focuses on human health and wellness in buildings.', UNDERGRADUATE: 'WELL has concepts covering Air, Water, Nourishment, Light, Movement, Thermal Comfort, Sound, Materials, Mind, and Community.', GRADUATE: 'Enhanced ventilation with better filtration is key for airborne disease resilience.', PHD: 'Biomarkers are measurable indicators like cortisol, heart rate variability, or cognitive performance linked to building conditions.' } }] },
    externalResources: [{ title: 'WELL Building Standard', url: 'https://www.wellcertified.com/', type: 'research' }]
  },
  // Module 14: Embodied Carbon
  {
    id: 'green-embodied-carbon',
    slug: 'embodied-carbon',
    title: 'Embodied Carbon',
    description: {
      ELEMENTARY: 'Learn about the hidden carbon in building materials!',
      MIDDLE_SCHOOL: 'Discover how materials used in buildings affect climate.',
      HIGH_SCHOOL: 'Explore lifecycle carbon, material choices, and carbon accounting.',
      UNDERGRADUATE: 'Analyze whole building lifecycle assessment and carbon reduction strategies.',
      GRADUATE: 'Examine embodied carbon policy, benchmarks, and supply chain decarbonization.',
      PHD: 'Research carbon accounting methods, data quality, and systemic reduction pathways.'
    },
    topic: 'green-building',
    category: 'CARBON',
    icon: 'Factory',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ec-1', title: 'Hidden Carbon', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Carbon in Materials!</h2><p>Making cement and steel creates carbon pollution. Choosing different materials can help the planet!</p>', MIDDLE_SCHOOL: '<h2>What is Embodied Carbon?</h2><p>Carbon is released when we mine, manufacture, and transport building materials. This is called embodied carbon.</p>', HIGH_SCHOOL: '<h2>Lifecycle Stages</h2><p>Product stage (mining, manufacturing), construction, use phase, and end of life. Upfront carbon matters now.</p>', UNDERGRADUATE: '<h2>Whole Building LCA</h2><p>Lifecycle assessment quantifies embodied carbon. Material selection, structural optimization, and design strategies.</p>', GRADUATE: '<h2>Policy and Markets</h2><p>Buy Clean policies, EPDs, carbon benchmarks, and supply chain engagement.</p>', PHD: '<h2>Research Frontiers</h2><p>Data uncertainty, biogenic carbon accounting, and industry decarbonization pathways.</p>' } }],
    activities: [{ id: 'gb-ec-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Choose Low-Carbon!', MIDDLE_SCHOOL: 'Material Comparison', HIGH_SCHOOL: 'LCA Basics', UNDERGRADUATE: 'Whole Building LCA', GRADUATE: 'Policy Analysis', PHD: 'Data Quality' }, description: { ELEMENTARY: 'Pick materials with less hidden carbon!', MIDDLE_SCHOOL: 'Compare carbon in different materials.', HIGH_SCHOOL: 'Learn lifecycle assessment basics.', UNDERGRADUATE: 'Conduct a whole building LCA.', GRADUATE: 'Analyze embodied carbon policy.', PHD: 'Assess LCA data quality and uncertainty.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ec-game', type: 'simulation', title: 'Carbon Detective', description: 'Find and reduce hidden carbon in buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ec-quiz', passingScore: 80, questions: [{ id: 'gbecq1', question: { ELEMENTARY: 'Where is hidden carbon in buildings?', MIDDLE_SCHOOL: 'What is embodied carbon?', HIGH_SCHOOL: 'What is upfront carbon?', UNDERGRADUATE: 'What is an EPD?', GRADUATE: 'What is Buy Clean policy?', PHD: 'What is biogenic carbon?' }, options: { ELEMENTARY: ['In the materials like cement and steel', 'In the air', 'In the water', 'In the paint color'], MIDDLE_SCHOOL: ['Carbon from making and transporting materials', 'Carbon in the air', 'Carbon from breathing', 'Carbon from cars only'], HIGH_SCHOOL: ['Carbon released before building is used', 'Carbon from using building', 'Carbon after demolition', 'No such thing'], UNDERGRADUATE: ['Environmental Product Declaration', 'Electric Power Device', 'Energy Performance Design', 'Emission Prevention Document'], GRADUATE: ['Procurement preference for low-carbon materials', 'Cleaning products', 'Air cleaning', 'Water treatment'], PHD: ['Carbon stored in biological materials like wood', 'Carbon from fossils', 'Carbon dioxide', 'No carbon'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Making cement and steel creates lots of carbon pollution - this is hidden in the building!', MIDDLE_SCHOOL: 'Embodied carbon is the carbon released when mining, manufacturing, and transporting building materials.', HIGH_SCHOOL: 'Upfront carbon is released before the building is even used - in material production and construction.', UNDERGRADUATE: 'An EPD (Environmental Product Declaration) discloses the environmental impacts of a product.', GRADUATE: 'Buy Clean policies require or prefer low-carbon materials in public construction projects.', PHD: 'Biogenic carbon is carbon stored in biological materials that was recently captured from the atmosphere.' } }] },
    externalResources: [{ title: 'Embodied Carbon', url: 'https://carbonleadershipforum.org/', type: 'research' }]
  },
  // Module 15: Resilient Design
  {
    id: 'green-resilient',
    slug: 'resilient-design',
    title: 'Resilient Design',
    description: {
      ELEMENTARY: 'Learn how buildings can be strong against storms and heat!',
      MIDDLE_SCHOOL: 'Discover how to design buildings that handle extreme weather.',
      HIGH_SCHOOL: 'Explore climate adaptation, passive survivability, and hazard resistance.',
      UNDERGRADUATE: 'Analyze resilience assessment, design strategies, and community-level approaches.',
      GRADUATE: 'Examine resilience metrics, financial tools, and policy integration.',
      PHD: 'Research resilience quantification, cascading failures, and transformative adaptation.'
    },
    topic: 'green-building',
    category: 'RESILIENCE',
    icon: 'Shield',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-res-1', title: 'Strong Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings that Stay Strong!</h2><p>Some buildings can handle big storms, floods, and heat waves. They protect people inside!</p>', MIDDLE_SCHOOL: '<h2>Climate Resilience</h2><p>Climate change brings more extreme weather. Resilient buildings can withstand and recover from these events.</p>', HIGH_SCHOOL: '<h2>Resilience Strategies</h2><p>Passive survivability (habitable without power), hazard resistance, redundancy, and rapid recovery.</p>', UNDERGRADUATE: '<h2>Resilience Assessment</h2><p>Hazard identification, vulnerability analysis, and adaptation options. RELi rating system.</p>', GRADUATE: '<h2>Community Resilience</h2><p>Buildings as resilience hubs, district approaches, and insurance/financing integration.</p>', PHD: '<h2>Research Frontiers</h2><p>Resilience metrics, cascading infrastructure failures, and transformative adaptation.</p>' } }],
    activities: [{ id: 'gb-res-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Storm-Proof It!', MIDDLE_SCHOOL: 'Prepare for Weather', HIGH_SCHOOL: 'Resilience Design', UNDERGRADUATE: 'Hazard Assessment', GRADUATE: 'Resilience Hub', PHD: 'Failure Analysis' }, description: { ELEMENTARY: 'Make a building safe from storms!', MIDDLE_SCHOOL: 'Prepare a building for extreme weather.', HIGH_SCHOOL: 'Design for climate resilience.', UNDERGRADUATE: 'Assess building climate hazards.', GRADUATE: 'Design a community resilience hub.', PHD: 'Analyze cascading failure scenarios.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-res-game', type: 'simulation', title: 'Resilience Engineer', description: 'Design buildings that withstand any challenge!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-res-quiz', passingScore: 80, questions: [{ id: 'gbresq1', question: { ELEMENTARY: 'What can resilient buildings handle?', MIDDLE_SCHOOL: 'Why do we need resilient buildings?', HIGH_SCHOOL: 'What is passive survivability?', UNDERGRADUATE: 'What is RELi?', GRADUATE: 'What is a resilience hub?', PHD: 'What is cascading failure?' }, options: { ELEMENTARY: ['Big storms and heat waves', 'Nothing special', 'Only sunshine', 'Only calm weather'], MIDDLE_SCHOOL: ['Climate change brings more extreme weather', 'No reason needed', 'Just for looks', 'To save money only'], HIGH_SCHOOL: ['Building stays habitable without power', 'Passive people', 'No activity', 'Survival games'], UNDERGRADUATE: ['A resilience rating system', 'A building material', 'A construction company', 'A type of insulation'], GRADUATE: ['A building supporting community during emergencies', 'A strong hub', 'A wheel hub', 'A computer hub'], PHD: ['One failure triggering others across systems', 'Waterfall', 'Normal operations', 'Single failure only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Resilient buildings can handle big storms, floods, heat waves, and other extreme weather!', MIDDLE_SCHOOL: 'Climate change is causing more extreme weather, so buildings need to be able to handle it.', HIGH_SCHOOL: 'Passive survivability means the building remains safe and habitable even without power or fuel.', UNDERGRADUATE: 'RELi is a resilience rating system for buildings and communities.', GRADUATE: 'Resilience hubs are buildings that serve communities during emergencies with power, shelter, and resources.', PHD: 'Cascading failure is when one system failure triggers failures in dependent systems.' } }] },
    externalResources: [{ title: 'Resilient Design', url: 'https://www.resilientdesign.org/', type: 'research' }]
  },
  {
    id: 'green-smart',
    slug: 'smart-buildings',
    title: 'Smart Building Technology',
    description: {
      ELEMENTARY: 'Learn how buildings can think and save energy automatically!',
      MIDDLE_SCHOOL: 'Discover how sensors and computers make buildings smarter and more efficient.',
      HIGH_SCHOOL: 'Explore building automation systems, IoT integration, and intelligent controls.',
      UNDERGRADUATE: 'Analyze smart building architectures, data analytics, and occupant-centric design.',
      GRADUATE: 'Examine advanced control strategies, machine learning, and grid-interactive buildings.',
      PHD: 'Research autonomous building systems, predictive controls, and human-building interaction.'
    },
    topic: 'green-building',
    category: 'TECHNOLOGY',
    icon: 'Cpu',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-sm-1', title: 'Thinking Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Think!</h2><p>Smart buildings use sensors to turn lights on and off, keep us comfortable, and save energy automatically!</p>', MIDDLE_SCHOOL: '<h2>Building Brains</h2><p>Building automation systems connect sensors, controllers, and equipment. They adjust lighting, heating, and cooling based on conditions.</p>', HIGH_SCHOOL: '<h2>Building Automation</h2><p>BAS integrates HVAC, lighting, security, and other systems. Sensors provide data for optimized control and fault detection.</p>', UNDERGRADUATE: '<h2>Smart Building Design</h2><p>System architecture, communication protocols, cybersecurity, and integration with grid signals and renewables.</p>', GRADUATE: '<h2>Advanced Controls</h2><p>Model predictive control, machine learning for optimization, and grid-interactive efficient buildings.</p>', PHD: '<h2>Research Frontiers</h2><p>Autonomous building systems, digital twins, and co-adaptive human-building interaction.</p>' } }],
    activities: [{ id: 'gb-sm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Smart Room!', MIDDLE_SCHOOL: 'Sensor Network', HIGH_SCHOOL: 'BAS Design', UNDERGRADUATE: 'System Integration', GRADUATE: 'Control Optimization', PHD: 'Digital Twin' }, description: { ELEMENTARY: 'Add sensors to make a smart room!', MIDDLE_SCHOOL: 'Design a building sensor network.', HIGH_SCHOOL: 'Configure a building automation system.', UNDERGRADUATE: 'Integrate smart building systems.', GRADUATE: 'Optimize building controls.', PHD: 'Build a digital twin model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-sm-game', type: 'simulation', title: 'Smart Building Engineer', description: 'Make buildings intelligent and efficient!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-sm-quiz', passingScore: 80, questions: [{ id: 'gbsmq1', question: { ELEMENTARY: 'What do smart buildings use to see?', MIDDLE_SCHOOL: 'What is building automation?', HIGH_SCHOOL: 'What is BAS?', UNDERGRADUATE: 'Why is cybersecurity important?', GRADUATE: 'What is model predictive control?', PHD: 'What is a digital twin?' }, options: { ELEMENTARY: ['Sensors', 'Eyes', 'Glasses', 'Windows only'], MIDDLE_SCHOOL: ['Connecting systems to work together automatically', 'Manual controls', 'No technology', 'Paper systems'], HIGH_SCHOOL: ['Building Automation System', 'Big Air System', 'Best Application Software', 'Building Art Studio'], UNDERGRADUATE: ['Connected systems can be attacked', 'No risk exists', 'Only locks matter', 'Security not needed'], GRADUATE: ['Uses building model to predict and optimize', 'Old fashioned control', 'Manual adjustment', 'No control'], PHD: ['Virtual model of physical building', 'Identical building', 'Twin towers', 'Double insulation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Smart buildings use sensors to see temperature, light, motion, and more!', MIDDLE_SCHOOL: 'Building automation connects all building systems so they can work together and save energy.', HIGH_SCHOOL: 'BAS (Building Automation System) integrates and controls building systems automatically.', UNDERGRADUATE: 'Smart buildings are connected to networks, making cybersecurity essential to prevent attacks.', GRADUATE: 'MPC uses a model of building physics to predict optimal control actions ahead of time.', PHD: 'A digital twin is a virtual replica of the physical building used for simulation and optimization.' } }] },
    externalResources: [{ title: 'Smart Buildings', url: 'https://www.energy.gov/eere/buildings/smart-buildings', type: 'article' }]
  },
  {
    id: 'green-timber',
    slug: 'mass-timber',
    title: 'Mass Timber Construction',
    description: {
      ELEMENTARY: 'Learn how tall buildings can be made from super strong wood!',
      MIDDLE_SCHOOL: 'Discover how engineered wood products are changing modern construction.',
      HIGH_SCHOOL: 'Explore cross-laminated timber, glulam, and tall wood building design.',
      UNDERGRADUATE: 'Analyze mass timber structural systems, fire safety, and lifecycle benefits.',
      GRADUATE: 'Examine timber building codes, connection design, and hybrid structural systems.',
      PHD: 'Research timber mechanics, biogenic carbon accounting, and forestry sustainability.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Trees',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-tm-1', title: 'Super Strong Wood', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Amazing Wooden Buildings!</h2><p>Engineers make super strong wood by gluing layers together. Now we can build tall buildings from wood!</p>', MIDDLE_SCHOOL: '<h2>Engineered Wood</h2><p>Mass timber products like CLT and glulam are made by gluing wood layers together. They are strong, fire-resistant, and store carbon.</p>', HIGH_SCHOOL: '<h2>Mass Timber Systems</h2><p>CLT panels, glulam beams, and connections enable mid-rise and tall wood buildings. Fire performance through charring behavior.</p>', UNDERGRADUATE: '<h2>Structural Design</h2><p>Load paths, connection design, fire protection strategies, and code compliance for tall wood buildings.</p>', GRADUATE: '<h2>Advanced Topics</h2><p>Timber-concrete composites, seismic design, moisture management, and building code development.</p>', PHD: '<h2>Research Frontiers</h2><p>Long-term creep behavior, connection ductility, and sustainable forestry certification.</p>' } }],
    activities: [{ id: 'gb-tm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build with Wood!', MIDDLE_SCHOOL: 'Layer It Up', HIGH_SCHOOL: 'Design CLT Building', UNDERGRADUATE: 'Structural Analysis', GRADUATE: 'Connection Design', PHD: 'Long-term Behavior' }, description: { ELEMENTARY: 'Stack wood layers to make a strong building!', MIDDLE_SCHOOL: 'Create engineered wood products.', HIGH_SCHOOL: 'Design a mass timber building.', UNDERGRADUATE: 'Analyze mass timber structures.', GRADUATE: 'Design timber connections.', PHD: 'Model long-term timber behavior.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-tm-game', type: 'simulation', title: 'Timber Tower Builder', description: 'Design and build tall wooden buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-tm-quiz', passingScore: 80, questions: [{ id: 'gbtmq1', question: { ELEMENTARY: 'How is super strong wood made?', MIDDLE_SCHOOL: 'What is CLT?', HIGH_SCHOOL: 'How does mass timber handle fire?', UNDERGRADUATE: 'What is a timber connection?', GRADUATE: 'What is timber-concrete composite?', PHD: 'What is creep in timber?' }, options: { ELEMENTARY: ['Gluing layers together', 'Painting it', 'Heating it', 'Freezing it'], MIDDLE_SCHOOL: ['Cross-Laminated Timber', 'Cool Light Tube', 'Clean Little Tree', 'Colored Lumber Type'], HIGH_SCHOOL: ['Forms protective char layer', 'Burns immediately', 'Melts', 'Explodes'], UNDERGRADUATE: ['Where timber elements join together', 'Wireless link', 'Social connection', 'Internet connection'], GRADUATE: ['Timber combined with concrete for strength', 'Concrete only', 'Timber only', 'No combination'], PHD: ['Long-term deformation under load', 'Fast movement', 'Color change', 'No change'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Mass timber is made by gluing many wood layers together, making it super strong!', MIDDLE_SCHOOL: 'CLT (Cross-Laminated Timber) is wood panels with layers glued at right angles for strength.', HIGH_SCHOOL: 'Mass timber chars predictably in fire, protecting the inner wood and maintaining structure.', UNDERGRADUATE: 'Connections transfer loads between timber elements and are critical for structural performance.', GRADUATE: 'Timber-concrete composites combine floor timber panels with concrete toppings for stiffness.', PHD: 'Creep is the gradual increase in deformation over time under sustained load.' } }] },
    externalResources: [{ title: 'Mass Timber', url: 'https://www.thinkwood.com/mass-timber', type: 'article' }]
  },
  {
    id: 'green-retrofit',
    slug: 'green-retrofits',
    title: 'Green Building Retrofits',
    description: {
      ELEMENTARY: 'Learn how old buildings can become green and save energy!',
      MIDDLE_SCHOOL: 'Discover how to upgrade existing buildings for better efficiency and comfort.',
      HIGH_SCHOOL: 'Explore deep energy retrofits, envelope improvements, and system upgrades.',
      UNDERGRADUATE: 'Analyze retrofit assessment, financing, and implementation strategies.',
      GRADUATE: 'Examine portfolio-scale retrofits, performance contracts, and policy incentives.',
      PHD: 'Research retrofit optimization, staged approaches, and decarbonization pathways.'
    },
    topic: 'green-building',
    category: 'EFFICIENCY',
    icon: 'Wrench',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-rt-1', title: 'Make Old Buildings New', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Upgrading Old Buildings!</h2><p>We can make old buildings better with new windows, insulation, and efficient systems. Its like giving them a green makeover!</p>', MIDDLE_SCHOOL: '<h2>Building Upgrades</h2><p>Retrofits add insulation, replace windows, upgrade HVAC, and seal air leaks. This saves energy and improves comfort.</p>', HIGH_SCHOOL: '<h2>Deep Energy Retrofits</h2><p>Major retrofits can reduce energy use by 50% or more. Envelope first approach addresses insulation and windows before systems.</p>', UNDERGRADUATE: '<h2>Retrofit Planning</h2><p>Energy audits, cost-benefit analysis, financing options, and phased implementation for existing buildings.</p>', GRADUATE: '<h2>Portfolio Scale</h2><p>Managing retrofits across building portfolios, ESCOs, performance contracts, and utility incentives.</p>', PHD: '<h2>Research Frontiers</h2><p>Optimal retrofit sequencing, embodied vs operational carbon tradeoffs, and deep decarbonization.</p>' } }],
    activities: [{ id: 'gb-rt-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fix Up the Building!', MIDDLE_SCHOOL: 'Upgrade Plan', HIGH_SCHOOL: 'Deep Retrofit', UNDERGRADUATE: 'Retrofit Analysis', GRADUATE: 'Portfolio Strategy', PHD: 'Optimization Model' }, description: { ELEMENTARY: 'Choose upgrades to make a building green!', MIDDLE_SCHOOL: 'Plan building improvements.', HIGH_SCHOOL: 'Design a deep energy retrofit.', UNDERGRADUATE: 'Analyze retrofit cost-effectiveness.', GRADUATE: 'Develop portfolio retrofit strategy.', PHD: 'Optimize retrofit sequencing.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-rt-game', type: 'simulation', title: 'Retrofit Expert', description: 'Transform old buildings into green ones!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-rt-quiz', passingScore: 80, questions: [{ id: 'gbrtq1', question: { ELEMENTARY: 'How can we make old buildings greener?', MIDDLE_SCHOOL: 'What does a retrofit do?', HIGH_SCHOOL: 'What is envelope first approach?', UNDERGRADUATE: 'What is an energy audit?', GRADUATE: 'What is an ESCO?', PHD: 'What is retrofit sequencing?' }, options: { ELEMENTARY: ['Add insulation and better windows', 'Paint them green', 'Add plants only', 'Make them smaller'], MIDDLE_SCHOOL: ['Upgrades buildings to save energy', 'Tears buildings down', 'Makes buildings bigger', 'Adds more rooms'], HIGH_SCHOOL: ['Fix insulation and windows before systems', 'Only upgrade HVAC', 'Only add solar', 'Systems first'], UNDERGRADUATE: ['Assessment of building energy use', 'Sound check', 'Safety inspection only', 'Color review'], GRADUATE: ['Energy Service Company providing retrofits', 'Emergency Services', 'Electrical Supply', 'Equipment Storage'], PHD: ['Optimal order of retrofit measures', 'Random order', 'Any order', 'No planning needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Adding insulation, better windows, and efficient systems makes old buildings green and comfortable!', MIDDLE_SCHOOL: 'Retrofits upgrade existing buildings with energy-saving improvements like insulation and efficient HVAC.', HIGH_SCHOOL: 'Envelope first fixes the building shell so you can install smaller, more efficient HVAC systems.', UNDERGRADUATE: 'An energy audit assesses how a building uses energy and identifies improvement opportunities.', GRADUATE: 'An ESCO (Energy Service Company) provides retrofit services often paid through guaranteed energy savings.', PHD: 'Retrofit sequencing optimizes the order of measures for maximum savings and lifecycle value.' } }] },
    externalResources: [{ title: 'Building Retrofits', url: 'https://www.energy.gov/eere/buildings/building-retrofits', type: 'article' }]
  },
  {
    id: 'green-interiors',
    slug: 'sustainable-interiors',
    title: 'Sustainable Interiors',
    description: {
      ELEMENTARY: 'Learn how to make rooms healthy and good for the Earth!',
      MIDDLE_SCHOOL: 'Discover how interior materials affect air quality and the environment.',
      HIGH_SCHOOL: 'Explore low-emitting materials, sustainable furniture, and indoor environmental quality.',
      UNDERGRADUATE: 'Analyze material health, transparency tools, and circular interior design.',
      GRADUATE: 'Examine Declare labels, Health Product Declarations, and material impact assessment.',
      PHD: 'Research chemical exposure pathways, material chemistry, and health outcome studies.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Sofa',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-in-1', title: 'Healthy Rooms', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Making Rooms Healthy!</h2><p>Some paints and furniture can make the air yucky. Choosing good materials keeps us healthy!</p>', MIDDLE_SCHOOL: '<h2>Indoor Air Quality</h2><p>Interior materials release chemicals into the air. Low-VOC paints, natural materials, and good ventilation create healthier spaces.</p>', HIGH_SCHOOL: '<h2>Material Selection</h2><p>VOCs, formaldehyde, and flame retardants affect health. Green certifications help identify safer materials.</p>', UNDERGRADUATE: '<h2>Material Transparency</h2><p>Health Product Declarations, Declare labels, and databases reveal chemical content for informed selection.</p>', GRADUATE: '<h2>Circular Interiors</h2><p>Design for disassembly, material reuse, and lifecycle thinking in interior fit-outs.</p>', PHD: '<h2>Research Frontiers</h2><p>Chemical migration, combined exposure effects, and building-health outcome correlations.</p>' } }],
    activities: [{ id: 'gb-in-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design a Healthy Room!', MIDDLE_SCHOOL: 'Material Hunt', HIGH_SCHOOL: 'Certification Check', UNDERGRADUATE: 'HPD Analysis', GRADUATE: 'Circular Design', PHD: 'Exposure Assessment' }, description: { ELEMENTARY: 'Pick healthy materials for a room!', MIDDLE_SCHOOL: 'Find low-VOC materials.', HIGH_SCHOOL: 'Evaluate material certifications.', UNDERGRADUATE: 'Analyze Health Product Declarations.', GRADUATE: 'Design for material circularity.', PHD: 'Assess occupant chemical exposure.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-in-game', type: 'simulation', title: 'Interior Designer', description: 'Create healthy sustainable interiors!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-in-quiz', passingScore: 80, questions: [{ id: 'gbinq1', question: { ELEMENTARY: 'What makes indoor air healthy?', MIDDLE_SCHOOL: 'What are VOCs?', HIGH_SCHOOL: 'What does low-VOC mean?', UNDERGRADUATE: 'What is an HPD?', GRADUATE: 'What is design for disassembly?', PHD: 'What is chemical migration?' }, options: { ELEMENTARY: ['Good materials that dont smell bad', 'Dirty carpets', 'Old paint', 'Dusty furniture'], MIDDLE_SCHOOL: ['Chemicals that evaporate from materials', 'Video games', 'Very old cars', 'Vegetables'], HIGH_SCHOOL: ['Materials that release few harmful chemicals', 'Very loud colors', 'No paint allowed', 'Light only'], UNDERGRADUATE: ['Health Product Declaration', 'High Performance Device', 'Heavy Plastic Door', 'Heat Protection Design'], GRADUATE: ['Making things easy to take apart and reuse', 'Breaking things', 'Permanent assembly', 'No design'], PHD: ['Chemicals moving from materials into air or dust', 'Bird migration', 'People moving', 'No movement'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Using good materials without yucky chemicals keeps the air healthy for us to breathe!', MIDDLE_SCHOOL: 'VOCs (Volatile Organic Compounds) are chemicals that evaporate from paints, carpets, and furniture.', HIGH_SCHOOL: 'Low-VOC products release fewer harmful chemicals, creating healthier indoor air.', UNDERGRADUATE: 'HPDs (Health Product Declarations) disclose chemical ingredients in building products.', GRADUATE: 'Design for disassembly allows materials to be easily separated and reused at end of life.', PHD: 'Chemical migration is how substances move from products into air, dust, or contact with occupants.' } }] },
    externalResources: [{ title: 'Healthy Materials', url: 'https://living-future.org/declare/', type: 'research' }]
  },
  {
    id: 'green-water',
    slug: 'water-efficient-buildings',
    title: 'Water-Efficient Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings can save water and help rivers and fish!',
      MIDDLE_SCHOOL: 'Discover how buildings can use less water through efficient fixtures and reuse.',
      HIGH_SCHOOL: 'Explore water-efficient fixtures, rainwater harvesting, and greywater systems.',
      UNDERGRADUATE: 'Analyze building water budgets, alternative water sources, and net zero water.',
      GRADUATE: 'Examine water reuse regulations, treatment technologies, and district water systems.',
      PHD: 'Research water-energy nexus, decentralized treatment, and climate adaptation.'
    },
    topic: 'green-building',
    category: 'WATER',
    icon: 'Droplet',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-wt-1', title: 'Saving Water in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Buildings That Save Water!</h2><p>Special toilets, faucets, and showers use less water. Some buildings even collect rain and use water twice!</p>', MIDDLE_SCHOOL: '<h2>Water Efficiency</h2><p>Low-flow fixtures, rainwater collection, and reusing water can reduce building water use by half or more.</p>', HIGH_SCHOOL: '<h2>Water Strategies</h2><p>High-efficiency fixtures, rainwater harvesting, greywater reuse, and landscape irrigation reduction.</p>', UNDERGRADUATE: '<h2>Water Systems Design</h2><p>Water budgets, alternative sources, treatment requirements, and net zero water buildings.</p>', GRADUATE: '<h2>Advanced Water Systems</h2><p>On-site treatment, regulatory compliance, district systems, and blackwater recycling.</p>', PHD: '<h2>Research Frontiers</h2><p>Water-energy nexus, decentralized water infrastructure, and climate resilience.</p>' } }],
    activities: [{ id: 'gb-wt-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Water!', MIDDLE_SCHOOL: 'Efficient Fixtures', HIGH_SCHOOL: 'Rainwater System', UNDERGRADUATE: 'Water Budget', GRADUATE: 'Treatment Design', PHD: 'Nexus Analysis' }, description: { ELEMENTARY: 'Choose fixtures that save water!', MIDDLE_SCHOOL: 'Select efficient water fixtures.', HIGH_SCHOOL: 'Design a rainwater system.', UNDERGRADUATE: 'Calculate building water budget.', GRADUATE: 'Design water treatment system.', PHD: 'Analyze water-energy tradeoffs.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-wt-game', type: 'simulation', title: 'Water Saver', description: 'Design buildings that conserve every drop!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-wt-quiz', passingScore: 80, questions: [{ id: 'gbwtq1', question: { ELEMENTARY: 'How do buildings save water?', MIDDLE_SCHOOL: 'What is greywater?', HIGH_SCHOOL: 'What is rainwater harvesting?', UNDERGRADUATE: 'What is net zero water?', GRADUATE: 'What is blackwater?', PHD: 'What is the water-energy nexus?' }, options: { ELEMENTARY: ['Using special toilets and faucets', 'Using more water', 'Leaving taps running', 'Taking long showers'], MIDDLE_SCHOOL: ['Used water from sinks and showers', 'Ocean water', 'Drinking water', 'Rain water'], HIGH_SCHOOL: ['Collecting and storing rain for use', 'Stopping rain', 'Wasting rain', 'Ignoring rain'], UNDERGRADUATE: ['Building supplies own water needs', 'No water used', 'Unlimited water', 'Zero cost water'], GRADUATE: ['Wastewater from toilets', 'Clean water', 'Grey water', 'No water'], PHD: ['Connection between water and energy use', 'No connection', 'Separate systems', 'Only energy matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Special low-flow toilets and faucets use much less water to do the same job!', MIDDLE_SCHOOL: 'Greywater is gently used water from sinks and showers that can be reused for toilets or irrigation.', HIGH_SCHOOL: 'Rainwater harvesting collects rain from roofs for non-potable uses or treatment for drinking.', UNDERGRADUATE: 'Net zero water buildings supply their water needs through efficiency, reuse, and rainwater.', GRADUATE: 'Blackwater is wastewater from toilets requiring treatment before reuse.', PHD: 'The water-energy nexus describes how water treatment/pumping needs energy and energy production needs water.' } }] },
    externalResources: [{ title: 'Water Efficiency', url: 'https://www.epa.gov/watersense', type: 'article' }]
  },
  {
    id: 'green-daylight',
    slug: 'daylighting-design',
    title: 'Daylighting Design',
    description: {
      ELEMENTARY: 'Learn how buildings can use sunlight instead of electric lights!',
      MIDDLE_SCHOOL: 'Discover how architects bring natural light deep into buildings.',
      HIGH_SCHOOL: 'Explore daylighting strategies, glare control, and occupant wellbeing.',
      UNDERGRADUATE: 'Analyze daylighting metrics, simulation tools, and design integration.',
      GRADUATE: 'Examine advanced daylighting systems, controls, and circadian lighting.',
      PHD: 'Research daylighting performance, human factors, and visual comfort science.'
    },
    topic: 'green-building',
    category: 'LIGHTING',
    icon: 'Sun',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-day-1', title: 'Light from the Sky', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Sunlight Inside!</h2><p>Good buildings let sunlight in so you dont need electric lights during the day!</p>', MIDDLE_SCHOOL: '<h2>Natural Light</h2><p>Windows, skylights, and light shelves bring daylight deep into buildings, saving energy and making people happier.</p>', HIGH_SCHOOL: '<h2>Daylighting Design</h2><p>Balancing light levels, controlling glare, and integrating with electric lighting for optimal performance.</p>', UNDERGRADUATE: '<h2>Daylight Simulation</h2><p>Using software to predict daylight levels, including spatial daylight autonomy and useful daylight illuminance.</p>', GRADUATE: '<h2>Advanced Systems</h2><p>Light redirecting films, automated shades, and circadian lighting for health.</p>', PHD: '<h2>Research Frontiers</h2><p>Visual comfort models, glare prediction, and health outcomes research.</p>' } }],
    activities: [{ id: 'gb-day-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Let the Sun In!', MIDDLE_SCHOOL: 'Window Design', HIGH_SCHOOL: 'Glare Control', UNDERGRADUATE: 'Daylight Simulation', GRADUATE: 'Control Strategy', PHD: 'Comfort Research' }, description: { ELEMENTARY: 'Design a sunny room!', MIDDLE_SCHOOL: 'Place windows for best daylight.', HIGH_SCHOOL: 'Balance daylight and glare.', UNDERGRADUATE: 'Simulate daylight performance.', GRADUATE: 'Design automated daylighting controls.', PHD: 'Research visual comfort factors.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-day-game', type: 'simulation', title: 'Daylighting Designer', description: 'Maximize natural light in buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-day-quiz', passingScore: 80, questions: [{ id: 'gbdayq1', question: { ELEMENTARY: 'Why use sunlight in buildings?', MIDDLE_SCHOOL: 'What is a light shelf?', HIGH_SCHOOL: 'What is glare?', UNDERGRADUATE: 'What is spatial daylight autonomy?', GRADUATE: 'What is circadian lighting?', PHD: 'What affects visual comfort?' }, options: { ELEMENTARY: ['Saves energy and makes you happy', 'Wastes energy', 'Makes buildings dark', 'Nothing'], MIDDLE_SCHOOL: ['A shelf that bounces light deeper inside', 'A shelf for books', 'A light bulb holder', 'A window cleaner'], HIGH_SCHOOL: ['Uncomfortable brightness from light contrast', 'Good lighting', 'No light', 'Dark areas'], UNDERGRADUATE: ['Percent of floor meeting daylight target', 'Space for light', 'Automatic lights', 'Day time only'], GRADUATE: ['Lighting designed for human biological rhythms', 'Circle lights', 'Round fixtures', 'No timing'], PHD: ['Light levels, glare, view, and variability', 'Only brightness', 'Only color', 'Nothing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Sunlight saves electricity and makes people feel happier and healthier!', MIDDLE_SCHOOL: 'Light shelves are horizontal surfaces that reflect daylight deeper into rooms.', HIGH_SCHOOL: 'Glare is excessive brightness or contrast that causes visual discomfort.', UNDERGRADUATE: 'sDA measures the percentage of floor area that meets daylight targets for most of the year.', GRADUATE: 'Circadian lighting supports human biological rhythms by varying light spectrum and intensity.', PHD: 'Visual comfort depends on light levels, glare, view quality, and appropriate variability.' } }] },
    externalResources: [{ title: 'Daylighting', url: 'https://www.energy.gov/energysaver/daylighting', type: 'article' }]
  },
  {
    id: 'green-commissioning',
    slug: 'building-commissioning',
    title: 'Building Commissioning',
    description: {
      ELEMENTARY: 'Learn how buildings get tested to make sure everything works right!',
      MIDDLE_SCHOOL: 'Discover how commissioning ensures buildings perform as designed.',
      HIGH_SCHOOL: 'Explore commissioning processes, testing protocols, and quality assurance.',
      UNDERGRADUATE: 'Analyze commissioning scope, team roles, and documentation requirements.',
      GRADUATE: 'Examine ongoing commissioning, monitoring-based approaches, and portfolio strategies.',
      PHD: 'Research commissioning effectiveness, fault detection, and performance persistence.'
    },
    topic: 'green-building',
    category: 'QUALITY',
    icon: 'CheckCircle',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-cx-1', title: 'Testing Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Does Everything Work?</h2><p>Before people move in, experts test all the systems to make sure the building works correctly!</p>', MIDDLE_SCHOOL: '<h2>Commissioning</h2><p>Commissioning is a quality process ensuring building systems are installed correctly and perform as designed.</p>', HIGH_SCHOOL: '<h2>Commissioning Process</h2><p>Design review, functional testing, performance verification, and training for building operators.</p>', UNDERGRADUATE: '<h2>Commissioning Scope</h2><p>HVAC, lighting, envelope, controls, and energy systems. Team roles and documentation.</p>', GRADUATE: '<h2>Ongoing Commissioning</h2><p>Continuous monitoring, fault detection, and maintaining performance over building life.</p>', PHD: '<h2>Research Frontiers</h2><p>Automated fault detection, performance persistence studies, and commissioning ROI.</p>' } }],
    activities: [{ id: 'gb-cx-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Test the Building!', MIDDLE_SCHOOL: 'System Check', HIGH_SCHOOL: 'Functional Test', UNDERGRADUATE: 'Cx Plan', GRADUATE: 'Monitoring Design', PHD: 'Performance Analysis' }, description: { ELEMENTARY: 'Make sure building systems work!', MIDDLE_SCHOOL: 'Check if systems work correctly.', HIGH_SCHOOL: 'Conduct functional performance tests.', UNDERGRADUATE: 'Develop a commissioning plan.', GRADUATE: 'Design an ongoing commissioning program.', PHD: 'Analyze commissioning effectiveness.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-cx-game', type: 'simulation', title: 'Commissioning Agent', description: 'Ensure buildings perform as designed!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-cx-quiz', passingScore: 80, questions: [{ id: 'gbcxq1', question: { ELEMENTARY: 'Why test buildings?', MIDDLE_SCHOOL: 'What is commissioning?', HIGH_SCHOOL: 'What is functional testing?', UNDERGRADUATE: 'Who is a commissioning agent?', GRADUATE: 'What is ongoing commissioning?', PHD: 'What is fault detection?' }, options: { ELEMENTARY: ['To make sure everything works', 'For fun', 'Not needed', 'To break things'], MIDDLE_SCHOOL: ['Quality process for building systems', 'Selling a building', 'Building commission', 'Nothing'], HIGH_SCHOOL: ['Testing systems under various conditions', 'Functionality test', 'No testing', 'Visual inspection only'], UNDERGRADUATE: ['Independent party verifying performance', 'Real estate agent', 'Building owner', 'No one'], GRADUATE: ['Continuous monitoring and optimization', 'Only at construction', 'Never again', 'One time only'], PHD: ['Automatically identifying system problems', 'Finding faults in plans', 'No detection', 'Human inspection only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Testing makes sure all the building systems work correctly before people move in!', MIDDLE_SCHOOL: 'Commissioning is a quality assurance process for building systems.', HIGH_SCHOOL: 'Functional testing verifies that systems perform correctly under various operating conditions.', UNDERGRADUATE: 'A commissioning agent is an independent party who verifies building performance.', GRADUATE: 'Ongoing commissioning continuously monitors and optimizes building performance over time.', PHD: 'Automated fault detection uses data analysis to identify when systems arent working properly.' } }] },
    externalResources: [{ title: 'Building Commissioning', url: 'https://www.bcxa.org/', type: 'research' }]
  },
  {
    id: 'green-acoustic',
    slug: 'acoustic-design',
    title: 'Acoustic Design',
    description: {
      ELEMENTARY: 'Learn how buildings can be quiet or have great sound when you need it!',
      MIDDLE_SCHOOL: 'Discover how architects control sound in buildings.',
      HIGH_SCHOOL: 'Explore acoustic design principles, materials, and noise control.',
      UNDERGRADUATE: 'Analyze acoustic metrics, prediction methods, and design strategies.',
      GRADUATE: 'Examine soundscape design, noise regulations, and sustainable acoustics.',
      PHD: 'Research acoustic performance, occupant wellbeing, and environmental noise.'
    },
    topic: 'green-building',
    category: 'COMFORT',
    icon: 'Volume2',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ac-1', title: 'Sound in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Good Sounds, Not Bad!</h2><p>Buildings should block noisy sounds from outside but let you hear clearly inside!</p>', MIDDLE_SCHOOL: '<h2>Acoustic Control</h2><p>Walls, ceilings, and special materials control how sound travels in buildings.</p>', HIGH_SCHOOL: '<h2>Acoustic Principles</h2><p>Sound absorption, transmission loss, and background noise levels for comfortable spaces.</p>', UNDERGRADUATE: '<h2>Acoustic Design</h2><p>Reverberation time, speech privacy, and impact isolation for various building types.</p>', GRADUATE: '<h2>Soundscapes</h2><p>Beyond noise control to positive acoustic environments. Sustainable acoustic materials.</p>', PHD: '<h2>Research Frontiers</h2><p>Acoustic comfort, cognitive performance, and acoustic metrics beyond noise.</p>' } }],
    activities: [{ id: 'gb-ac-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Quiet Room!', MIDDLE_SCHOOL: 'Sound Control', HIGH_SCHOOL: 'Material Selection', UNDERGRADUATE: 'Acoustic Analysis', GRADUATE: 'Soundscape Design', PHD: 'Wellbeing Research' }, description: { ELEMENTARY: 'Make a room with good sound!', MIDDLE_SCHOOL: 'Use materials to control sound.', HIGH_SCHOOL: 'Select acoustic materials.', UNDERGRADUATE: 'Analyze acoustic performance.', GRADUATE: 'Design positive soundscapes.', PHD: 'Research acoustic wellbeing.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ac-game', type: 'simulation', title: 'Acoustic Designer', description: 'Create buildings with great sound!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ac-quiz', passingScore: 80, questions: [{ id: 'gbacq1', question: { ELEMENTARY: 'What makes a room too noisy?', MIDDLE_SCHOOL: 'What does absorption do?', HIGH_SCHOOL: 'What is reverberation?', UNDERGRADUATE: 'What is STC?', GRADUATE: 'What is a soundscape?', PHD: 'How does noise affect health?' }, options: { ELEMENTARY: ['Sounds bouncing around', 'Quiet sounds', 'No sound', 'Soft materials'], MIDDLE_SCHOOL: ['Stops sound from bouncing', 'Makes sound louder', 'Creates echoes', 'Nothing'], HIGH_SCHOOL: ['Sound persisting after source stops', 'Vibration', 'Silence', 'Echo only'], UNDERGRADUATE: ['Sound Transmission Class - wall sound blocking', 'Sound Testing Check', 'Simple Transmission', 'No meaning'], GRADUATE: ['The acoustic environment as experienced', 'Only noise', 'Visual landscape', 'No concept'], PHD: ['Stress, sleep disruption, cardiovascular effects', 'No effects', 'Only hearing loss', 'Only annoyance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When sound bounces off hard surfaces, it makes rooms noisy and hard to hear in!', MIDDLE_SCHOOL: 'Absorptive materials stop sound from bouncing, reducing echoes and noise.', HIGH_SCHOOL: 'Reverberation is sound that lingers after the source stops due to reflections.', UNDERGRADUATE: 'STC rates how well a wall blocks airborne sound transmission between spaces.', GRADUATE: 'A soundscape considers the full acoustic experience, not just noise levels.', PHD: 'Noise exposure causes stress responses, disrupts sleep, and increases cardiovascular risk.' } }] },
    externalResources: [{ title: 'Acoustic Design', url: 'https://www.wbdg.org/resources/acoustic-comfort', type: 'article' }]
  },
  {
    id: 'green-renewable',
    slug: 'building-renewables',
    title: 'Building-Integrated Renewables',
    description: {
      ELEMENTARY: 'Learn how buildings can make their own electricity from sun and wind!',
      MIDDLE_SCHOOL: 'Discover how solar panels and other renewables work on buildings.',
      HIGH_SCHOOL: 'Explore building-integrated photovoltaics, solar thermal, and small wind.',
      UNDERGRADUATE: 'Analyze renewable system sizing, integration, and economic analysis.',
      GRADUATE: 'Examine net-zero energy buildings, storage integration, and grid interaction.',
      PHD: 'Research building-grid integration, advanced technologies, and community systems.'
    },
    topic: 'green-building',
    category: 'ENERGY',
    icon: 'Zap',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-ren-1', title: 'Buildings Make Power', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Power from Your Roof!</h2><p>Solar panels on roofs can make electricity from sunlight to power the building!</p>', MIDDLE_SCHOOL: '<h2>Building Renewables</h2><p>Rooftop solar, solar water heating, and even small wind turbines can generate energy on site.</p>', HIGH_SCHOOL: '<h2>Integration Options</h2><p>Roof-mounted PV, building-integrated PV in facades, solar thermal, and hybrid systems.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Load matching, system sizing, inverter selection, and financial analysis.</p>', GRADUATE: '<h2>Net-Zero Buildings</h2><p>Achieving net-zero energy through efficiency plus on-site renewables. Storage and grid services.</p>', PHD: '<h2>Research Frontiers</h2><p>Building-integrated PV materials, community energy sharing, and transactive buildings.</p>' } }],
    activities: [{ id: 'gb-ren-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Solar Roof!', MIDDLE_SCHOOL: 'System Selection', HIGH_SCHOOL: 'Array Design', UNDERGRADUATE: 'Economic Analysis', GRADUATE: 'Net-Zero Path', PHD: 'Advanced Integration' }, description: { ELEMENTARY: 'Put solar panels on a building!', MIDDLE_SCHOOL: 'Choose renewable systems.', HIGH_SCHOOL: 'Design a solar array.', UNDERGRADUATE: 'Analyze renewable economics.', GRADUATE: 'Plan a net-zero building.', PHD: 'Research advanced integration.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-ren-game', type: 'simulation', title: 'Renewable Builder', description: 'Power buildings with clean energy!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-ren-quiz', passingScore: 80, questions: [{ id: 'gbrenq1', question: { ELEMENTARY: 'How do solar panels help buildings?', MIDDLE_SCHOOL: 'What is solar thermal?', HIGH_SCHOOL: 'What is BIPV?', UNDERGRADUATE: 'What is load matching?', GRADUATE: 'What is a net-zero energy building?', PHD: 'What is a transactive building?' }, options: { ELEMENTARY: ['Make electricity from sunlight', 'Block the sun', 'Cool the building only', 'Nothing'], MIDDLE_SCHOOL: ['Using sun to heat water', 'Solar for electricity only', 'Thermal means cold', 'No such thing'], HIGH_SCHOOL: ['Building-Integrated Photovoltaics', 'Big Inside Power Vault', 'Building Interior PV', 'No meaning'], UNDERGRADUATE: ['Matching generation timing to building loads', 'Loading matches', 'No matching', 'Random sizing'], GRADUATE: ['Produces as much energy as it uses annually', 'Uses no energy', 'Zero cost', 'No power needed'], PHD: ['Building participating in energy markets', 'Trade building', 'Transaction building', 'No such concept'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Solar panels turn sunlight into electricity to power lights, computers, and more!', MIDDLE_SCHOOL: 'Solar thermal systems use the suns heat to warm water for the building.', HIGH_SCHOOL: 'BIPV replaces conventional building materials with solar panels in facades or roofs.', UNDERGRADUATE: 'Load matching aligns renewable generation timing with when the building uses energy.', GRADUATE: 'Net-zero energy buildings produce as much renewable energy as they consume annually.', PHD: 'Transactive buildings actively participate in energy markets, buying and selling power.' } }] },
    externalResources: [{ title: 'Building Renewables', url: 'https://www.energy.gov/eere/solar/solar-energy-and-buildings', type: 'article' }]
  },
  {
    id: 'green-adaptive',
    slug: 'adaptive-reuse',
    title: 'Adaptive Reuse and Historic Preservation',
    description: {
      ELEMENTARY: 'Learn how old buildings get new lives instead of being torn down!',
      MIDDLE_SCHOOL: 'Discover how historic buildings are transformed for new uses.',
      HIGH_SCHOOL: 'Explore adaptive reuse strategies, preservation standards, and sustainability.',
      UNDERGRADUATE: 'Analyze building assessment, code compliance, and energy upgrades.',
      GRADUATE: 'Examine preservation economics, embodied carbon, and heritage sustainability.',
      PHD: 'Research lifecycle assessment, cultural value integration, and climate adaptation.'
    },
    topic: 'green-building',
    category: 'PRESERVATION',
    icon: 'Landmark',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-adapt-1', title: 'New Life for Old Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Old Buildings, New Uses!</h2><p>Instead of tearing down old buildings, we can fix them up for new purposes!</p>', MIDDLE_SCHOOL: '<h2>Adaptive Reuse</h2><p>Factories become apartments, churches become restaurants. Old buildings get new life.</p>', HIGH_SCHOOL: '<h2>Reuse vs Demolition</h2><p>Reuse preserves embodied energy and cultural heritage while often costing less than new construction.</p>', UNDERGRADUATE: '<h2>Technical Challenges</h2><p>Building assessment, structural upgrades, code compliance, and integrating modern systems.</p>', GRADUATE: '<h2>Heritage Sustainability</h2><p>Balancing preservation values with energy performance. Standards and incentives.</p>', PHD: '<h2>Research Frontiers</h2><p>Lifecycle carbon, cultural value quantification, and climate adaptation for historic buildings.</p>' } }],
    activities: [{ id: 'gb-adapt-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Transform a Building!', MIDDLE_SCHOOL: 'Reuse Planning', HIGH_SCHOOL: 'Code Compliance', UNDERGRADUATE: 'System Integration', GRADUATE: 'Preservation Standards', PHD: 'Lifecycle Research' }, description: { ELEMENTARY: 'Give an old building a new purpose!', MIDDLE_SCHOOL: 'Plan a building transformation.', HIGH_SCHOOL: 'Meet codes while preserving character.', UNDERGRADUATE: 'Integrate modern systems sensitively.', GRADUATE: 'Apply preservation standards.', PHD: 'Research historic building lifecycle.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-adapt-game', type: 'simulation', title: 'Building Transformer', description: 'Give old buildings new purpose!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-adapt-quiz', passingScore: 80, questions: [{ id: 'gbadaptq1', question: { ELEMENTARY: 'Why save old buildings?', MIDDLE_SCHOOL: 'What is adaptive reuse?', HIGH_SCHOOL: 'What is embodied energy?', UNDERGRADUATE: 'What are code challenges?', GRADUATE: 'What are the Standards?', PHD: 'Why assess lifecycle carbon?' }, options: { ELEMENTARY: ['They have history and can be reused', 'No reason', 'Always tear down', 'Old is bad'], MIDDLE_SCHOOL: ['Transforming buildings for new purposes', 'Adapting to weather', 'Reusing materials only', 'No such thing'], HIGH_SCHOOL: ['Energy used to make the building originally', 'Current energy use', 'Embodied water', 'No energy'], UNDERGRADUATE: ['Accessibility, fire safety, and structure', 'No challenges', 'Easy compliance', 'Only paint'], GRADUATE: ['Secretary of Interiors Standards for Rehabilitation', 'No standards', 'Random rules', 'Any standards'], PHD: ['Reuse often saves carbon vs new construction', 'Always build new', 'No carbon difference', 'Carbon not important'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old buildings tell our history and can often be fixed up for new uses instead of wasted!', MIDDLE_SCHOOL: 'Adaptive reuse transforms existing buildings for new purposes while preserving character.', HIGH_SCHOOL: 'Embodied energy is all the energy used to build the structure originally.', UNDERGRADUATE: 'Historic buildings may not meet modern codes for accessibility, fire safety, and structure.', GRADUATE: 'The Standards provide guidance for sensitive rehabilitation of historic buildings.', PHD: 'Lifecycle carbon analysis often shows reuse is better than demolition and new construction.' } }] },
    externalResources: [{ title: 'Adaptive Reuse', url: 'https://www.nps.gov/tps/standards.htm', type: 'research' }]
  },
  {
    id: 'green-certification',
    slug: 'green-building-certification',
    title: 'Green Building Certification',
    description: {
      ELEMENTARY: 'Learn about special awards buildings get for being green!',
      MIDDLE_SCHOOL: 'Discover how buildings earn green certifications like LEED.',
      HIGH_SCHOOL: 'Explore LEED, WELL, Passive House, and other certification systems.',
      UNDERGRADUATE: 'Analyze certification requirements, documentation, and market impacts.',
      GRADUATE: 'Examine certification effectiveness, policy linkages, and system design.',
      PHD: 'Research certification outcomes, behavioral aspects, and future directions.'
    },
    topic: 'green-building',
    category: 'CERTIFICATION',
    icon: 'Award',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-cert-1', title: 'Green Building Awards', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Green Building Badges!</h2><p>Buildings can earn special badges like LEED for being kind to the environment!</p>', MIDDLE_SCHOOL: '<h2>Green Certifications</h2><p>LEED, ENERGY STAR, and other programs rate buildings on their environmental performance.</p>', HIGH_SCHOOL: '<h2>Certification Systems</h2><p>LEED, WELL, Living Building Challenge, and Passive House each focus on different aspects of green building.</p>', UNDERGRADUATE: '<h2>Certification Process</h2><p>Credits, prerequisites, documentation, and third-party verification.</p>', GRADUATE: '<h2>Market Transformation</h2><p>How certifications drive market change, policy integration, and value creation.</p>', PHD: '<h2>Research Frontiers</h2><p>Performance gaps, certification effectiveness, and next-generation rating systems.</p>' } }],
    activities: [{ id: 'gb-cert-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Earn Green Badges!', MIDDLE_SCHOOL: 'LEED Points', HIGH_SCHOOL: 'System Comparison', UNDERGRADUATE: 'Documentation', GRADUATE: 'Policy Analysis', PHD: 'Effectiveness Study' }, description: { ELEMENTARY: 'Help a building earn green badges!', MIDDLE_SCHOOL: 'Earn LEED certification points.', HIGH_SCHOOL: 'Compare certification systems.', UNDERGRADUATE: 'Document certification requirements.', GRADUATE: 'Analyze certification policy.', PHD: 'Study certification effectiveness.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-cert-game', type: 'simulation', title: 'Certification Expert', description: 'Guide buildings to green certification!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-cert-quiz', passingScore: 80, questions: [{ id: 'gbcertq1', question: { ELEMENTARY: 'What is LEED?', MIDDLE_SCHOOL: 'How does LEED work?', HIGH_SCHOOL: 'What is the Living Building Challenge?', UNDERGRADUATE: 'What is third-party verification?', GRADUATE: 'How do certifications affect markets?', PHD: 'What is the performance gap?' }, options: { ELEMENTARY: ['A green building award', 'A type of plant', 'A building material', 'A tool'], MIDDLE_SCHOOL: ['Buildings earn points for green features', 'Random selection', 'Only new buildings', 'No requirements'], HIGH_SCHOOL: ['Rigorous standard requiring net-positive impact', 'Easy certification', 'Only energy', 'No such thing'], UNDERGRADUATE: ['Independent review of claims', 'Self-certification', 'No verification', 'Government review only'], GRADUATE: ['Create demand for green buildings and professionals', 'No market effect', 'Lower prices', 'Less construction'], PHD: ['Actual performance differs from design predictions', 'Perfect performance', 'No gap', 'Only in old buildings'] }, correctIndex: 0, explanation: { ELEMENTARY: 'LEED is like a gold star that buildings earn for being good to the environment!', MIDDLE_SCHOOL: 'Buildings earn points for energy savings, water efficiency, materials, and other green features.', HIGH_SCHOOL: 'Living Building Challenge requires buildings to generate more energy and water than they use.', UNDERGRADUATE: 'Third-party verification means an independent organization reviews documentation and confirms compliance.', GRADUATE: 'Certifications create market signals, differentiate buildings, and drive professional training.', PHD: 'The performance gap shows certified buildings often use more energy than predicted in design.' } }] },
    externalResources: [{ title: 'LEED', url: 'https://www.usgbc.org/leed', type: 'research' }]
  },
  {
    id: 'green-healthy-materials',
    slug: 'healthy-building-materials',
    title: 'Healthy Building Materials',
    description: {
      ELEMENTARY: 'Learn about building materials that keep people healthy!',
      MIDDLE_SCHOOL: 'Discover how to choose materials that are safe for people.',
      HIGH_SCHOOL: 'Explore material health, transparency labels, and red list chemicals.',
      UNDERGRADUATE: 'Analyze material health assessment, product transparency, and specification.',
      GRADUATE: 'Examine material health research, policy frameworks, and market transformation.',
      PHD: 'Research toxicology, exposure pathways, and advancing material health science.'
    },
    topic: 'green-building',
    category: 'MATERIALS',
    icon: 'Heart',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-healthy-1', title: 'Safe Building Materials', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Healthy Materials!</h2><p>Some building materials can make people sick. We choose safe materials to keep everyone healthy!</p>', MIDDLE_SCHOOL: '<h2>Material Safety</h2><p>Some paints, flooring, and furniture can release harmful chemicals. Healthy materials avoid these.</p>', HIGH_SCHOOL: '<h2>Chemical Concerns</h2><p>VOCs, flame retardants, and other chemicals in materials affect indoor air quality and health.</p>', UNDERGRADUATE: '<h2>Material Assessment</h2><p>Declare labels, HPDs, and Cradle to Cradle certification reveal material ingredients.</p>', GRADUATE: '<h2>Market Transformation</h2><p>Driving healthier products through specification, policy, and consumer demand.</p>', PHD: '<h2>Research Frontiers</h2><p>Exposure science, health outcome studies, and advancing safer chemistry.</p>' } }],
    activities: [{ id: 'gb-healthy-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Choose Safe Materials!', MIDDLE_SCHOOL: 'Material Check', HIGH_SCHOOL: 'Label Reading', UNDERGRADUATE: 'Specification', GRADUATE: 'Policy Design', PHD: 'Exposure Research' }, description: { ELEMENTARY: 'Pick healthy materials for buildings!', MIDDLE_SCHOOL: 'Check materials for safety.', HIGH_SCHOOL: 'Read and compare product labels.', UNDERGRADUATE: 'Specify healthy materials.', GRADUATE: 'Design material health policy.', PHD: 'Research exposure pathways.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-healthy-game', type: 'simulation', title: 'Material Health Detective', description: 'Find the healthiest building materials!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-healthy-quiz', passingScore: 80, questions: [{ id: 'gbhealthyq1', question: { ELEMENTARY: 'What are healthy materials?', MIDDLE_SCHOOL: 'What are VOCs?', HIGH_SCHOOL: 'What is a Declare label?', UNDERGRADUATE: 'What is an HPD?', GRADUATE: 'What is red list?', PHD: 'What is exposure science?' }, options: { ELEMENTARY: ['Materials that dont make people sick', 'Any materials', 'Only expensive materials', 'Old materials'], MIDDLE_SCHOOL: ['Chemicals that evaporate into air', 'Vitamins', 'Only outdoor chemicals', 'Voice Over Chemicals'], HIGH_SCHOOL: ['Product ingredient transparency label', 'A declaration', 'Government label', 'No such thing'], UNDERGRADUATE: ['Health Product Declaration', 'Home Product Details', 'Hazard Prevention Document', 'No meaning'], GRADUATE: ['List of chemicals to avoid in buildings', 'List of red materials', 'Fire danger list', 'No such list'], PHD: ['Studying how people contact chemicals', 'Only exposure to sun', 'No such field', 'Photography'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Healthy materials are building products that dont have chemicals that can make people sick!', MIDDLE_SCHOOL: 'VOCs (Volatile Organic Compounds) are chemicals that evaporate from materials into the air we breathe.', HIGH_SCHOOL: 'Declare labels disclose product ingredients so designers can choose healthier materials.', UNDERGRADUATE: 'HPDs are standardized reports of product contents and health hazards.', GRADUATE: 'The Red List identifies chemicals to avoid due to health or environmental harm.', PHD: 'Exposure science studies how, when, and how much people come into contact with chemicals.' } }] },
    externalResources: [{ title: 'Material Health', url: 'https://living-future.org/declare/', type: 'research' }]
  },
  {
    id: 'green-living-roof',
    slug: 'green-roofs-walls',
    title: 'Green Roofs and Living Walls',
    description: {
      ELEMENTARY: 'Learn how plants can grow on roofs and walls of buildings!',
      MIDDLE_SCHOOL: 'Discover green roofs and living walls that bring nature to buildings.',
      HIGH_SCHOOL: 'Explore green roof types, benefits, and design considerations.',
      UNDERGRADUATE: 'Analyze green infrastructure design, stormwater management, and thermal benefits.',
      GRADUATE: 'Examine urban ecology, policy incentives, and maintenance programs.',
      PHD: 'Research ecosystem services, performance modeling, and climate adaptation.'
    },
    topic: 'green-building',
    category: 'LANDSCAPE',
    icon: 'Sprout',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-living-1', title: 'Gardens in the Sky', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Rooftop Gardens!</h2><p>Plants can grow on building roofs, keeping buildings cool and giving homes to birds and bees!</p>', MIDDLE_SCHOOL: '<h2>Green Roofs</h2><p>Green roofs are covered with plants. They absorb rain, insulate buildings, and create wildlife habitat.</p>', HIGH_SCHOOL: '<h2>Types and Design</h2><p>Extensive green roofs have shallow soil; intensive roofs can support trees. Living walls add vertical greenery.</p>', UNDERGRADUATE: '<h2>Performance Benefits</h2><p>Stormwater retention, urban heat island reduction, energy savings, and biodiversity.</p>', GRADUATE: '<h2>Policy and Programs</h2><p>Green roof requirements, incentives, and maintenance for long-term success.</p>', PHD: '<h2>Research Frontiers</h2><p>Ecosystem service quantification, substrate innovation, and climate adaptation.</p>' } }],
    activities: [{ id: 'gb-living-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Roof!', MIDDLE_SCHOOL: 'Green Roof Design', HIGH_SCHOOL: 'System Selection', UNDERGRADUATE: 'Performance Analysis', GRADUATE: 'Policy Development', PHD: 'Research Design' }, description: { ELEMENTARY: 'Create a garden on a roof!', MIDDLE_SCHOOL: 'Design a green roof.', HIGH_SCHOOL: 'Select green roof systems.', UNDERGRADUATE: 'Analyze performance benefits.', GRADUATE: 'Develop green roof policy.', PHD: 'Design green roof research.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-living-game', type: 'simulation', title: 'Green Roof Designer', description: 'Create living roofs and walls!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-living-quiz', passingScore: 80, questions: [{ id: 'gblivingq1', question: { ELEMENTARY: 'What is a green roof?', MIDDLE_SCHOOL: 'How do green roofs help?', HIGH_SCHOOL: 'What is an extensive green roof?', UNDERGRADUATE: 'What is urban heat island?', GRADUATE: 'What makes green roofs last?', PHD: 'What are ecosystem services?' }, options: { ELEMENTARY: ['A roof with plants growing on it', 'A green painted roof', 'A roof made of plants', 'No such thing'], MIDDLE_SCHOOL: ['Absorb rain, insulate, and support wildlife', 'No benefits', 'Only look nice', 'Just expensive'], HIGH_SCHOOL: ['Shallow soil and hardy plants', 'Deep soil for trees', 'No plants', 'Just rocks'], UNDERGRADUATE: ['Cities being hotter than surroundings', 'A heat island', 'Only in tropics', 'No such effect'], GRADUATE: ['Proper design, installation, and maintenance', 'No maintenance needed', 'Replace often', 'Random factors'], PHD: ['Benefits nature provides to people', 'Ecosystem destruction', 'Only plants', 'No services'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A green roof is covered with plants that grow right on top of a building!', MIDDLE_SCHOOL: 'Green roofs absorb rainwater, keep buildings cooler, and provide habitat for birds and insects.', HIGH_SCHOOL: 'Extensive green roofs have 2-6 inches of soil and hardy plants requiring little maintenance.', UNDERGRADUATE: 'Urban heat island effect makes cities significantly warmer than surrounding rural areas.', GRADUATE: 'Long-lasting green roofs require proper waterproofing, drainage, substrate, and maintenance programs.', PHD: 'Ecosystem services are the benefits people get from nature: clean air, water filtration, pollination.' } }] },
    externalResources: [{ title: 'Green Roofs', url: 'https://www.greenroofs.org/', type: 'research' }]
  },
  {
    id: 'green-performance',
    slug: 'building-performance-monitoring',
    title: 'Building Performance Monitoring',
    description: {
      ELEMENTARY: 'Learn how we check if buildings are using energy wisely!',
      MIDDLE_SCHOOL: 'Discover how buildings are monitored to save energy.',
      HIGH_SCHOOL: 'Explore energy monitoring, benchmarking, and building automation.',
      UNDERGRADUATE: 'Analyze building analytics, fault detection, and continuous commissioning.',
      GRADUATE: 'Examine performance policy, disclosure requirements, and portfolio management.',
      PHD: 'Research machine learning applications, occupant feedback, and advanced analytics.'
    },
    topic: 'green-building',
    category: 'OPERATIONS',
    icon: 'Activity',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-perf-1', title: 'Watching Building Energy', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Energy Detectives!</h2><p>We can watch how much energy buildings use and find ways to save more!</p>', MIDDLE_SCHOOL: '<h2>Building Monitoring</h2><p>Meters, sensors, and dashboards track energy, water, and comfort in real time.</p>', HIGH_SCHOOL: '<h2>Benchmarking</h2><p>Comparing building energy use to similar buildings reveals opportunities for improvement.</p>', UNDERGRADUATE: '<h2>Building Analytics</h2><p>Data analysis identifies faults, optimizes operations, and enables predictive maintenance.</p>', GRADUATE: '<h2>Policy Frameworks</h2><p>Benchmarking laws, disclosure requirements, and performance standards.</p>', PHD: '<h2>Research Frontiers</h2><p>Machine learning, digital twins, and advanced fault detection.</p>' } }],
    activities: [{ id: 'gb-perf-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Track Energy!', MIDDLE_SCHOOL: 'Dashboard Design', HIGH_SCHOOL: 'Benchmarking', UNDERGRADUATE: 'Fault Detection', GRADUATE: 'Policy Analysis', PHD: 'ML Application' }, description: { ELEMENTARY: 'Watch how buildings use energy!', MIDDLE_SCHOOL: 'Design an energy dashboard.', HIGH_SCHOOL: 'Benchmark building energy.', UNDERGRADUATE: 'Detect system faults.', GRADUATE: 'Analyze performance policy.', PHD: 'Apply machine learning.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-perf-game', type: 'simulation', title: 'Performance Monitor', description: 'Optimize building performance!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-perf-quiz', passingScore: 80, questions: [{ id: 'gbperfq1', question: { ELEMENTARY: 'Why monitor building energy?', MIDDLE_SCHOOL: 'What does a dashboard show?', HIGH_SCHOOL: 'What is benchmarking?', UNDERGRADUATE: 'What is fault detection?', GRADUATE: 'What is energy disclosure?', PHD: 'What is a digital twin?' }, options: { ELEMENTARY: ['To find ways to save energy', 'No reason', 'To use more energy', 'Just for fun'], MIDDLE_SCHOOL: ['Energy use in real time', 'Only car dashboards', 'Nothing useful', 'Stock prices'], HIGH_SCHOOL: ['Comparing to similar buildings', 'Making benches', 'Random comparison', 'No comparison'], UNDERGRADUATE: ['Finding problems in building systems', 'Finding human faults', 'No detection', 'Only major faults'], GRADUATE: ['Requiring buildings to report energy use', 'Hiding energy use', 'No requirements', 'Only new buildings'], PHD: ['Virtual model of a building', 'Twin buildings', 'Two dashboards', 'No such thing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'By watching energy use, we can find problems and save energy!', MIDDLE_SCHOOL: 'Dashboards show energy use, water use, and comfort conditions in real time.', HIGH_SCHOOL: 'Benchmarking compares a buildings energy use to similar buildings to find improvement opportunities.', UNDERGRADUATE: 'Fault detection analytics identify equipment problems and operational issues from data.', GRADUATE: 'Energy disclosure laws require buildings to report energy use for transparency.', PHD: 'Digital twins are virtual models of buildings that enable simulation and optimization.' } }] },
    externalResources: [{ title: 'Building Performance', url: 'https://www.energystar.gov/buildings/benchmark', type: 'research' }]
  },
  {
    id: 'green-resilient',
    slug: 'climate-resilient-buildings',
    title: 'Climate-Resilient Buildings',
    description: {
      ELEMENTARY: 'Learn how buildings stay safe during storms, floods, and heat waves!',
      MIDDLE_SCHOOL: 'Discover how buildings are designed to handle extreme weather.',
      HIGH_SCHOOL: 'Explore climate risk assessment and resilient design strategies.',
      UNDERGRADUATE: 'Analyze building vulnerability, adaptation measures, and resilience standards.',
      GRADUATE: 'Examine climate risk disclosure, resilience policy, and insurance implications.',
      PHD: 'Research climate projections, damage functions, and adaptation pathways.'
    },
    topic: 'green-building',
    category: 'RESILIENCE',
    icon: 'Shield',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-resil-1', title: 'Weather-Ready Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Strong Buildings!</h2><p>Buildings can be made to handle storms, floods, and very hot days to keep people safe!</p>', MIDDLE_SCHOOL: '<h2>Climate Resilience</h2><p>Resilient buildings can survive and recover from floods, storms, heat waves, and other climate impacts.</p>', HIGH_SCHOOL: '<h2>Climate Risks</h2><p>Rising seas, stronger storms, heat waves, and flooding require new design approaches.</p>', UNDERGRADUATE: '<h2>Resilience Measures</h2><p>Flood protection, wind resistance, passive survivability, and backup systems.</p>', GRADUATE: '<h2>Policy and Finance</h2><p>Building codes, insurance, disclosure, and investment in resilience.</p>', PHD: '<h2>Research Frontiers</h2><p>Climate projections, vulnerability modeling, and adaptation effectiveness.</p>' } }],
    activities: [{ id: 'gb-resil-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Storm-Proof Building!', MIDDLE_SCHOOL: 'Risk Assessment', HIGH_SCHOOL: 'Resilience Design', UNDERGRADUATE: 'Vulnerability Analysis', GRADUATE: 'Policy Development', PHD: 'Adaptation Research' }, description: { ELEMENTARY: 'Make buildings safe from storms!', MIDDLE_SCHOOL: 'Assess climate risks.', HIGH_SCHOOL: 'Design for resilience.', UNDERGRADUATE: 'Analyze building vulnerability.', GRADUATE: 'Develop resilience policy.', PHD: 'Research adaptation measures.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-resil-game', type: 'simulation', title: 'Resilience Builder', description: 'Design climate-ready buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-resil-quiz', passingScore: 80, questions: [{ id: 'gbresillq1', question: { ELEMENTARY: 'What is a resilient building?', MIDDLE_SCHOOL: 'What climate risks affect buildings?', HIGH_SCHOOL: 'What is passive survivability?', UNDERGRADUATE: 'What is a vulnerability assessment?', GRADUATE: 'Why disclose climate risk?', PHD: 'What are damage functions?' }, options: { ELEMENTARY: ['A building that stays safe in bad weather', 'A bouncy building', 'A weak building', 'Any building'], MIDDLE_SCHOOL: ['Floods, storms, and extreme heat', 'No risks', 'Only cold', 'Only rain'], HIGH_SCHOOL: ['Maintaining livable conditions without power', 'Passive heating', 'No survivability', 'Active systems only'], UNDERGRADUATE: ['Identifying climate risks to a building', 'No assessment needed', 'Random guessing', 'Only new buildings'], GRADUATE: ['Inform decisions and price risk', 'Hide problems', 'No benefit', 'Only for insurance'], PHD: ['Relationships between hazards and building damage', 'Random damage', 'No functions', 'Only structural'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Resilient buildings are designed to stay safe and working during storms, floods, and heat waves!', MIDDLE_SCHOOL: 'Buildings face risks from flooding, high winds, extreme heat, and other climate impacts.', HIGH_SCHOOL: 'Passive survivability means a building maintains safe temperatures even without power.', UNDERGRADUATE: 'Vulnerability assessments identify which climate hazards pose risks to a specific building.', GRADUATE: 'Climate risk disclosure informs investment decisions and helps price insurance accurately.', PHD: 'Damage functions model how hazard intensity relates to physical damage and economic loss.' } }] },
    externalResources: [{ title: 'Climate Resilience', url: 'https://www.usgbc.org/resources/resilience', type: 'research' }]
  },
  {
    id: 'green-netzero',
    slug: 'net-zero-carbon-buildings',
    title: 'Net Zero Carbon Buildings',
    description: {
      ELEMENTARY: 'Learn about buildings that dont add any bad stuff to the air!',
      MIDDLE_SCHOOL: 'Discover buildings that produce zero carbon emissions.',
      HIGH_SCHOOL: 'Explore net zero carbon strategies, embodied carbon, and operational carbon.',
      UNDERGRADUATE: 'Analyze whole-life carbon assessment, reduction strategies, and offsetting.',
      GRADUATE: 'Examine net zero policy, carbon accounting standards, and decarbonization pathways.',
      PHD: 'Research carbon modeling, reduction verification, and building sector decarbonization.'
    },
    topic: 'green-building',
    category: 'CARBON',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-nz-1', title: 'Zero Carbon Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clean Air Buildings!</h2><p>Net zero buildings dont add pollution to the air because they use clean energy and smart design!</p>', MIDDLE_SCHOOL: '<h2>Net Zero Carbon</h2><p>Net zero carbon buildings eliminate or offset all carbon emissions from energy and materials.</p>', HIGH_SCHOOL: '<h2>Carbon Strategies</h2><p>Reducing operational energy, using renewable energy, and choosing low-carbon materials.</p>', UNDERGRADUATE: '<h2>Whole-Life Carbon</h2><p>Accounting for embodied carbon in materials plus operational carbon over building lifespan.</p>', GRADUATE: '<h2>Policy and Standards</h2><p>Net zero commitments, carbon accounting frameworks, and verification requirements.</p>', PHD: '<h2>Research Frontiers</h2><p>Carbon modeling accuracy, reduction pathway optimization, and sector decarbonization.</p>' } }],
    activities: [{ id: 'gb-nz-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Zero Carbon Design!', MIDDLE_SCHOOL: 'Carbon Calculator', HIGH_SCHOOL: 'Reduction Strategy', UNDERGRADUATE: 'Life Cycle Assessment', GRADUATE: 'Policy Analysis', PHD: 'Decarbonization Model' }, description: { ELEMENTARY: 'Design a clean air building!', MIDDLE_SCHOOL: 'Calculate building carbon.', HIGH_SCHOOL: 'Plan carbon reductions.', UNDERGRADUATE: 'Assess whole-life carbon.', GRADUATE: 'Analyze net zero policies.', PHD: 'Model decarbonization pathways.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-nz-game', type: 'simulation', title: 'Carbon Zero Builder', description: 'Eliminate building carbon!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-nz-quiz', passingScore: 80, questions: [{ id: 'gbnzq1', question: { ELEMENTARY: 'What is a net zero building?', MIDDLE_SCHOOL: 'What are the two types of building carbon?', HIGH_SCHOOL: 'What is embodied carbon?', UNDERGRADUATE: 'What is whole-life carbon?', GRADUATE: 'What is carbon accounting?', PHD: 'What is sectoral decarbonization?' }, options: { ELEMENTARY: ['A building that doesnt add pollution to the air', 'A building with no numbers', 'A building with no walls', 'Any building'], MIDDLE_SCHOOL: ['Embodied carbon and operational carbon', 'Black and white carbon', 'No carbon types', 'Only one type'], HIGH_SCHOOL: ['Carbon released making building materials', 'Carbon in the building', 'Operational carbon', 'No such thing'], UNDERGRADUATE: ['Total carbon from materials and operations over building life', 'Only construction', 'Only operations', 'Short-term carbon'], GRADUATE: ['Measuring and tracking carbon emissions', 'Counting money', 'No accounting', 'Random tracking'], PHD: ['Reducing emissions across an entire sector', 'Single building', 'Only energy', 'No reduction'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Net zero buildings use clean energy and smart design so they dont add pollution to the air!', MIDDLE_SCHOOL: 'Buildings have embodied carbon from materials and operational carbon from energy use.', HIGH_SCHOOL: 'Embodied carbon is the emissions from making, transporting, and installing building materials.', UNDERGRADUATE: 'Whole-life carbon includes embodied carbon plus all operational carbon over the building lifespan.', GRADUATE: 'Carbon accounting systematically measures and tracks emissions to enable management and reduction.', PHD: 'Sectoral decarbonization develops pathways to eliminate emissions across the entire building sector.' } }] },
    externalResources: [{ title: 'Net Zero Buildings', url: 'https://architecture2030.org/', type: 'research' }]
  },
  {
    id: 'green-biophilic',
    slug: 'biophilic-design',
    title: 'Biophilic Design',
    description: {
      ELEMENTARY: 'Learn how buildings can bring nature inside to make people happy!',
      MIDDLE_SCHOOL: 'Discover how connecting with nature in buildings improves wellbeing.',
      HIGH_SCHOOL: 'Explore biophilic design principles, patterns, and health benefits.',
      UNDERGRADUATE: 'Analyze biophilic design frameworks, implementation strategies, and research evidence.',
      GRADUATE: 'Examine biophilic urbanism, economic benefits, and organizational applications.',
      PHD: 'Research biophilia science, design effectiveness, and human-nature relationships.'
    },
    topic: 'green-building',
    category: 'WELLNESS',
    icon: 'Flower',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'gb-bio-1', title: 'Nature in Buildings', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Bringing Nature Inside!</h2><p>Buildings with plants, sunlight, water, and nature views make people feel happy and healthy!</p>', MIDDLE_SCHOOL: '<h2>Biophilic Design</h2><p>Biophilic design brings nature into buildings through plants, natural light, water, and organic shapes.</p>', HIGH_SCHOOL: '<h2>Design Patterns</h2><p>Fourteen patterns of biophilic design including nature in space, natural analogues, and nature of space.</p>', UNDERGRADUATE: '<h2>Implementation</h2><p>Integrating biophilic elements into building design, operations, and renovation.</p>', GRADUATE: '<h2>Business Case</h2><p>Productivity, health, and property value benefits of biophilic design.</p>', PHD: '<h2>Research Frontiers</h2><p>Biophilia hypothesis, dose-response relationships, and design effectiveness.</p>' } }],
    activities: [{ id: 'gb-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Nature Room!', MIDDLE_SCHOOL: 'Biophilic Plan', HIGH_SCHOOL: 'Pattern Application', UNDERGRADUATE: 'Design Integration', GRADUATE: 'Business Analysis', PHD: 'Research Design' }, description: { ELEMENTARY: 'Add nature to a room!', MIDDLE_SCHOOL: 'Plan biophilic elements.', HIGH_SCHOOL: 'Apply design patterns.', UNDERGRADUATE: 'Integrate biophilic design.', GRADUATE: 'Analyze economic benefits.', PHD: 'Design biophilia research.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-bio-game', type: 'simulation', title: 'Biophilic Builder', description: 'Design spaces that connect with nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-bio-quiz', passingScore: 80, questions: [{ id: 'gbbioq1', question: { ELEMENTARY: 'What is biophilic design?', MIDDLE_SCHOOL: 'How does nature help in buildings?', HIGH_SCHOOL: 'What are natural analogues?', UNDERGRADUATE: 'What is prospect and refuge?', GRADUATE: 'What is the productivity benefit?', PHD: 'What is the biophilia hypothesis?' }, options: { ELEMENTARY: ['Design that brings nature into buildings', 'Fear of nature', 'Keeping nature out', 'Robot design'], MIDDLE_SCHOOL: ['Makes people healthier and happier', 'No benefit', 'Makes buildings weak', 'Only looks nice'], HIGH_SCHOOL: ['Design elements that mimic nature', 'Actual nature only', 'Nothing natural', 'Technology'], UNDERGRADUATE: ['Views with both openness and shelter', 'Only open views', 'Only enclosed spaces', 'No views'], GRADUATE: ['Workers are more productive in biophilic spaces', 'No difference', 'Less productive', 'Same productivity'], PHD: ['Humans have innate need to connect with nature', 'Humans avoid nature', 'No connection needed', 'Only cultural'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Biophilic design brings nature into buildings with plants, light, water, and natural materials!', MIDDLE_SCHOOL: 'Connecting with nature in buildings reduces stress, improves focus, and boosts happiness.', HIGH_SCHOOL: 'Natural analogues are design elements like organic shapes and natural materials that evoke nature.', UNDERGRADUATE: 'Prospect and refuge combines open views (prospect) with protected spaces (refuge) for psychological comfort.', GRADUATE: 'Research shows 6-12% productivity gains in biophilic workplaces from reduced stress and better focus.', PHD: 'The biophilia hypothesis proposes that humans have an evolved, innate affinity for nature and living systems.' } }] },
    externalResources: [{ title: 'Biophilic Design', url: 'https://www.terrapinbrightgreen.com/report/14-patterns/', type: 'research' }]
  },
  {
    id: 'green-future',
    slug: 'green-building-future',
    title: 'Green Building Future',
    description: {
      ELEMENTARY: 'Explore how buildings of the future will be super green and amazing!',
      MIDDLE_SCHOOL: 'Discover the future of buildings that help the planet and people.',
      HIGH_SCHOOL: 'Examine emerging trends and transformative potential of green building.',
      UNDERGRADUATE: 'Analyze innovation trajectories, market transformation, and scaling strategies.',
      GRADUATE: 'Evaluate policy pathways, investment trends, and sector transformation.',
      PHD: 'Synthesize research frontiers, modeling approaches, and built environment decarbonization.'
    },
    topic: 'green-building',
    category: 'FUTURE',
    icon: 'Sparkles',
    color: 'ocean',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 45, HIGH_SCHOOL: 60, UNDERGRADUATE: 90, GRADUATE: 120, PHD: 180 },
    isMasterclass: true,
    lessons: [{ id: 'gb-fut-1', title: 'Buildings of Tomorrow', order: 1, duration: 20, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Amazing Future Buildings!</h2><p>Future buildings will make their own energy, clean the air, and be wonderful places to live and work!</p>', MIDDLE_SCHOOL: '<h2>Green Building Future</h2><p>Buildings will become net positive - generating more energy, cleaning air, and enhancing nature.</p>', HIGH_SCHOOL: '<h2>Transformation Trends</h2><p>Mass timber, building-integrated renewables, smart systems, and regenerative design are reshaping construction.</p>', UNDERGRADUATE: '<h2>Market Transformation</h2><p>Policy drivers, technology innovation, and market demand accelerating green building adoption.</p>', GRADUATE: '<h2>Sector Decarbonization</h2><p>Pathways to zero-carbon buildings, retrofit strategies, and embodied carbon reduction.</p>', PHD: '<h2>Research Synthesis</h2><p>Integrating building science, policy analysis, and economics for built environment transformation.</p>' } }],
    activities: [{ id: 'gb-fut-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Future Building Dream!', MIDDLE_SCHOOL: 'Vision Design', HIGH_SCHOOL: 'Trend Analysis', UNDERGRADUATE: 'Market Strategy', GRADUATE: 'Policy Design', PHD: 'Synthesis Research' }, description: { ELEMENTARY: 'Design buildings of the future!', MIDDLE_SCHOOL: 'Create a green building vision.', HIGH_SCHOOL: 'Analyze transformation trends.', UNDERGRADUATE: 'Develop market strategy.', GRADUATE: 'Design transformative policies.', PHD: 'Synthesize research for transformation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'gb-fut-game', type: 'simulation', title: 'Building Revolution', description: 'Transform the built environment!', rounds: 7, timeLimit: 60, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'gb-fut-quiz', passingScore: 80, questions: [{ id: 'gfutq1', question: { ELEMENTARY: 'What will future buildings do?', MIDDLE_SCHOOL: 'What is a net positive building?', HIGH_SCHOOL: 'What is mass timber?', UNDERGRADUATE: 'What drives market transformation?', GRADUATE: 'What is deep retrofit?', PHD: 'What is technology forcing?' }, options: { ELEMENTARY: ['Make energy, clean air, and help nature', 'Pollute more', 'Use more resources', 'Stay the same'], MIDDLE_SCHOOL: ['A building that gives back more than it takes', 'A building that takes more', 'A normal building', 'A negative building'], HIGH_SCHOOL: ['Large engineered wood products for construction', 'Very heavy timber', 'Timber from massive trees', 'Any wood'], UNDERGRADUATE: ['Policy, technology, and consumer demand', 'Only price', 'Only regulations', 'Random factors'], GRADUATE: ['Comprehensive renovation to very high performance', 'Minor repairs', 'Cosmetic updates', 'Demolition'], PHD: ['Policy that drives technology development', 'Technology driving policy', 'No connection', 'Random development'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Future buildings will make clean energy, purify air, and create homes for plants and animals!', MIDDLE_SCHOOL: 'Net positive buildings produce more energy, clean more air, and provide more benefits than they consume.', HIGH_SCHOOL: 'Mass timber is large-scale engineered wood that can replace steel and concrete in construction.', UNDERGRADUATE: 'Market transformation requires aligned policy drivers, technological innovation, and consumer demand.', GRADUATE: 'Deep retrofits comprehensively upgrade existing buildings to achieve dramatic energy reductions.', PHD: 'Technology forcing policies set standards beyond current capability, driving innovation to meet them.' } }] },
    externalResources: [{ title: 'Future of Buildings', url: 'https://www.wgbc.org/', type: 'research' }]
  }
]
