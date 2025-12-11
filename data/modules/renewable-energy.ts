// Renewable Energy Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const renewableEnergyModules: Module[] = [
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
