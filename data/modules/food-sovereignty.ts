// Food Sovereignty Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const foodSovereigntyModules: Module[] = [
  // Module 1: Introduction to Food Sovereignty
  {
    id: 'food-sov-intro',
    slug: 'introduction-to-food-sovereignty',
    title: 'Introduction to Food Sovereignty',
    description: {
      ELEMENTARY: 'Learn how communities grow their own food and why it matters!',
      MIDDLE_SCHOOL: 'Discover how communities take control of their food systems and why food independence is important.',
      HIGH_SCHOOL: 'Explore the concept of food sovereignty and how communities worldwide are reclaiming control over their food systems.',
      UNDERGRADUATE: 'Analyze the political, economic, and social dimensions of food sovereignty movements globally.',
      GRADUATE: 'Critically examine food sovereignty as a framework for agrarian reform and alternatives to industrial food systems.',
      PHD: 'Investigate the theoretical foundations and policy implications of food sovereignty within global governance structures.'
    },
    topic: 'food-sovereignty',
    category: 'FOUNDATIONS',
    icon: 'Sprout',
    color: 'moss',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-intro-1',
        title: 'What is Food Sovereignty?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>The Story of Maria's Garden</h2>

<p>Maria lived in a small town where most food came from far, far away. One day, she bit into a tomato and thought, "This doesn't taste like Grandma's tomatoes at all!"</p>

<p>Her grandmother smiled and said, "That's because it traveled thousands of miles to get here. Let me show you something special."</p>

<div class="image-placeholder" data-caption="Maria and her grandmother looking at a community garden">
[Image: A young girl and elderly woman standing at the entrance of a vibrant community garden]
</div>

<p>Grandma took Maria to a <strong>community garden</strong> where neighbors grew food together. The tomatoes there were red, juicy, and tasted like sunshine!</p>

<blockquote class="scavenger-quote" data-quote-id="fs-elem-q1">
<p>"When we grow our own food, we feed our bodies AND our community."</p>
<cite>— Grandma Rosa, Community Gardener</cite>
</blockquote>

<h3>What is Food Sovereignty?</h3>

<p><strong>Food sovereignty</strong> is a big phrase that means something simple: <em>Communities get to choose what food they grow and eat!</em></p>

<p>Think about it like this:</p>
<ul>
<li>Your family decides what to cook for dinner</li>
<li>Your neighborhood decides what to grow in the garden</li>
<li>Your community decides how to share and sell food</li>
</ul>

<div class="image-placeholder" data-caption="Children helping plant seeds in a garden">
[Image: Happy children of different backgrounds planting seeds together]
</div>

<h3>Why Does This Matter?</h3>

<p>Maria learned that when communities grow their own food:</p>

<ul>
<li><strong>Food tastes better</strong> — it's fresh from the garden!</li>
<li><strong>Neighbors become friends</strong> — they work together</li>
<li><strong>The Earth stays healthy</strong> — less trucks driving food around</li>
<li><strong>Everyone has enough to eat</strong> — the community shares</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="fs-elem-q2">
<p>"Food sovereignty means the people who grow food and the people who eat food work together."</p>
<cite>— La Vía Campesina, Farmers Organization</cite>
</blockquote>

<h3>Maria's Discovery</h3>

<p>By the end of summer, Maria had grown her very first tomato plant. She shared tomatoes with her neighbors, saved seeds for next year, and even taught other kids how to garden.</p>

<p>"I understand now, Grandma!" Maria said. "When we grow food together, everyone wins!"</p>

<div class="key-concept">
<h4>Remember!</h4>
<p>Food sovereignty = Communities choosing their own food future</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>The Global Food Puzzle</h2>

<p>Imagine you're eating breakfast. Your orange juice might come from Brazil. Your cereal grain from Canada. Your banana from Ecuador. Before you've even finished eating, your food has traveled more than you might travel in a whole year!</p>

<p>This global food system seems convenient, but communities around the world are asking an important question: <em>Should we have more control over our own food?</em></p>

<div class="image-placeholder" data-caption="World map showing food transportation routes">
[Image: Interactive map showing how far common breakfast foods travel]
</div>

<h3>What is Food Sovereignty?</h3>

<p><strong>Food sovereignty</strong> is the right of peoples to healthy, culturally appropriate food produced through ecologically sound and sustainable methods. It's about communities having control over their own food systems.</p>

<blockquote class="scavenger-quote" data-quote-id="fs-mid-q1">
<p>"Food sovereignty is the right of peoples to define their own food and agriculture systems."</p>
<cite>— Declaration of Nyéléni, 2007</cite>
</blockquote>

<h3>The Seven Pillars of Food Sovereignty</h3>

<p>In 2007, over 500 representatives from 80 countries met in Nyéléni, Mali to define food sovereignty. They created seven pillars:</p>

<ol>
<li><strong>Food for People</strong> — Food is a basic human right, not just a commodity to be traded</li>
<li><strong>Values Food Providers</strong> — Farmers, fishers, and food workers deserve respect and fair treatment</li>
<li><strong>Localizes Food Systems</strong> — Food should be produced close to where it's consumed when possible</li>
<li><strong>Local Control</strong> — Communities make decisions about their own food systems</li>
<li><strong>Builds Knowledge and Skills</strong> — Traditional farming knowledge is passed down through generations</li>
<li><strong>Works with Nature</strong> — Food production methods protect the environment</li>
<li><strong>Food is Sacred</strong> — Food is more than a product—it connects us to culture and community</li>
</ol>

<div class="image-placeholder" data-caption="The seven pillars of food sovereignty">
[Image: Illustrated diagram showing the seven pillars as columns supporting a healthy community]
</div>

<h3>A Tale of Two Communities</h3>

<p><strong>Community A</strong> relies entirely on imported food. When shipping costs rise or supply chains break, food becomes expensive or unavailable. Local farmers have disappeared because they couldn't compete with cheap imports.</p>

<p><strong>Community B</strong> practices food sovereignty. Local farmers grow diverse crops, neighbors trade at farmers markets, and traditional recipes use local ingredients. When global problems arise, they still have food security.</p>

<blockquote class="scavenger-quote" data-quote-id="fs-mid-q2">
<p>"We are not just fighting for food. We are fighting for the right to continue existing as peoples."</p>
<cite>— Indigenous farmer from Guatemala</cite>
</blockquote>

<h3>Why Should You Care?</h3>

<p>Food sovereignty affects everyone:</p>
<ul>
<li><strong>Health:</strong> Local, fresh food is often more nutritious</li>
<li><strong>Environment:</strong> Less transportation means less pollution</li>
<li><strong>Economy:</strong> Money spent locally stays in the community</li>
<li><strong>Culture:</strong> Traditional foods and farming knowledge are preserved</li>
<li><strong>Security:</strong> Communities aren't dependent on distant supply chains</li>
</ul>

<div class="key-concept">
<h4>Key Takeaway</h4>
<p>Food sovereignty isn't about isolation—it's about communities having the power to make their own food decisions while still participating in broader food networks when they choose to.</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Food Sovereignty: A Movement Born from Resistance</h2>

<p>In 1996, while world leaders gathered at the World Food Summit in Rome to discuss hunger, a different conversation was happening outside. Farmers, peasants, and indigenous peoples from around the world came together to challenge the very foundations of the global food system.</p>

<p>They didn't just want more food aid or better trade deals. They wanted something revolutionary: the right to control their own food systems.</p>

<div class="image-placeholder" data-caption="La Vía Campesina founding members at the 1996 World Food Summit">
[Image: Historical photo of farmers and activists gathering in Rome, 1996]
</div>

<h3>The Birth of a Concept</h3>

<p><strong>La Vía Campesina</strong> (Spanish for "The Peasant Way"), an international movement of small-scale farmers, introduced the term "food sovereignty" as an alternative to the dominant model of food security.</p>

<blockquote class="scavenger-quote" data-quote-id="fs-high-q1">
<p>"Food sovereignty is the right of each nation to maintain and develop its own capacity to produce its basic foods respecting cultural and productive diversity."</p>
<cite>— La Vía Campesina, Rome Declaration, 1996</cite>
</blockquote>

<h3>Food Security vs. Food Sovereignty: Understanding the Difference</h3>

<table class="comparison-table">
<thead>
<tr><th>Food Security</th><th>Food Sovereignty</th></tr>
</thead>
<tbody>
<tr><td>Focuses on <em>access</em> to sufficient food</td><td>Focuses on <em>control</em> over food systems</td></tr>
<tr><td>Can be achieved through imports and aid</td><td>Prioritizes local production and decision-making</td></tr>
<tr><td>Measures quantity of available food</td><td>Values quality, culture, and sustainability</td></tr>
<tr><td>Works within existing trade structures</td><td>Challenges power imbalances in food systems</td></tr>
<tr><td>Government and market-centered</td><td>Community and producer-centered</td></tr>
</tbody>
</table>

<h3>The Nyéléni Declaration</h3>

<p>In 2007, over 500 delegates from more than 80 countries gathered in Nyéléni, Mali—a village named after a legendary Malian woman farmer. This Forum for Food Sovereignty produced the most comprehensive definition of the concept.</p>

<blockquote class="scavenger-quote" data-quote-id="fs-high-q2">
<p>"Food sovereignty is the right of peoples to healthy and culturally appropriate food produced through ecologically sound and sustainable methods, and their right to define their own food and agriculture systems."</p>
<cite>— Nyéléni Declaration, 2007</cite>
</blockquote>

<div class="image-placeholder" data-caption="Delegates at the Nyéléni Forum, Mali, 2007">
[Image: Diverse group of farmers and activists from around the world at the historic gathering]
</div>

<h3>Case Study: Ecuador's Constitutional Revolution</h3>

<p>In 2008, Ecuador became the first country to enshrine food sovereignty in its constitution. Article 281 states:</p>

<blockquote class="scavenger-quote" data-quote-id="fs-high-q3">
<p>"Food sovereignty constitutes a strategic objective and an obligation of the State to guarantee that individuals, communities, peoples and nations achieve self-sufficiency in healthy and culturally appropriate food on a permanent basis."</p>
<cite>— Constitution of Ecuador, Article 281, 2008</cite>
</blockquote>

<p>This constitutional protection means Ecuador must:</p>
<ul>
<li>Promote sustainable small-scale farming</li>
<li>Protect agricultural biodiversity and traditional knowledge</li>
<li>Ensure access to land, water, and seeds for farmers</li>
<li>Prevent food speculation and monopolies</li>
</ul>

<h3>Criticisms and Debates</h3>

<p>Food sovereignty isn't without its critics. Some argue that:</p>
<ul>
<li><strong>Trade benefits consumers</strong> through lower prices and variety</li>
<li><strong>Local production alone</strong> can't feed growing urban populations</li>
<li><strong>Romanticizing small farms</strong> ignores efficiency gains from scale</li>
<li><strong>National food self-sufficiency</strong> may not be realistic for all countries</li>
</ul>

<p>Proponents respond that food sovereignty doesn't mean complete isolation—it means communities having the <em>choice</em> to participate in global markets rather than being forced into dependence.</p>

<div class="key-concept">
<h4>Critical Thinking</h4>
<p>Food sovereignty challenges us to ask: Who controls our food system, and whose interests does it serve? The answer shapes everything from environmental policy to human rights.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Theorizing Food Sovereignty: Beyond the Agricultural Question</h2>

<p>Food sovereignty emerges at the intersection of agrarian studies, political ecology, and development theory. Understanding its theoretical foundations requires examining how it challenges dominant paradigms in food system governance.</p>

<h3>Historical Context: The Corporate Food Regime</h3>

<p>Harriet Friedmann and Philip McMichael's <em>food regime analysis</em> provides crucial context. They identify three historical food regimes:</p>

<ol>
<li><strong>British Hegemonic Regime (1870-1914):</strong> Colonial extraction of food from periphery to core</li>
<li><strong>US Hegemonic Regime (1945-1973):</strong> Food aid as geopolitical tool, Green Revolution technologies</li>
<li><strong>Corporate Food Regime (1980s-present):</strong> Neoliberal restructuring, WTO governance, agribusiness consolidation</li>
</ol>

<blockquote class="scavenger-quote" data-quote-id="fs-undergrad-q1">
<p>"The corporate food regime represents a historically specific constellation of governments, corporations, and international institutions aligned around neoliberal prescriptions for agriculture."</p>
<cite>— Philip McMichael, "Food Regimes and Agrarian Questions," 2013</cite>
</blockquote>

<div class="image-placeholder" data-caption="Timeline of global food regimes">
[Image: Visual timeline showing the three food regimes and key characteristics of each]
</div>

<h3>Challenging Market Fundamentalism</h3>

<p>Food sovereignty fundamentally questions core assumptions of neoclassical economics as applied to agriculture:</p>

<h4>Comparative Advantage Critique</h4>
<p>Ricardo's theory suggests countries should specialize in producing goods where they have relative efficiency advantages. Food sovereignty advocates argue this:</p>
<ul>
<li>Ignores power asymmetries in global trade</li>
<li>Creates dangerous dependencies on food imports</li>
<li>Destroys agricultural biodiversity and traditional knowledge</li>
<li>Externalizes environmental costs of long-distance food transport</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="fs-undergrad-q2">
<p>"Comparative advantage in agriculture is not a natural fact but a political construction that benefits those with power to shape the terms of trade."</p>
<cite>— Raj Patel, "Stuffed and Starved," 2007</cite>
</blockquote>

<h4>The Commodity Critique</h4>
<p>Karl Polanyi's concept of "fictitious commodities" is central to food sovereignty theory. Land, labor, and food—unlike manufactured goods—were not produced for sale and cannot be treated as pure commodities without social dislocation.</p>

<h3>The Via Campesina Framework</h3>

<p>La Vía Campesina represents over 200 million farmers across 81 countries. Their approach synthesizes:</p>

<ul>
<li><strong>Agrarian populism:</strong> Defending peasant agriculture against capitalist transformation</li>
<li><strong>Human rights discourse:</strong> Reframing food access as fundamental right</li>
<li><strong>Ecological modernization:</strong> Agroecology as alternative to industrial agriculture</li>
<li><strong>Feminist analysis:</strong> Recognizing women's central role in food systems</li>
</ul>

<div class="image-placeholder" data-caption="La Vía Campesina organizational structure">
[Image: Diagram showing the global network of peasant organizations under La Vía Campesina]
</div>

<h3>Policy Frameworks and Tensions</h3>

<p>Food sovereignty's translation into policy reveals inherent tensions:</p>

<table class="analysis-table">
<thead>
<tr><th>Policy Area</th><th>Food Sovereignty Position</th><th>Implementation Challenges</th></tr>
</thead>
<tbody>
<tr><td>Trade Policy</td><td>Right to protect domestic markets</td><td>WTO agreements limit tariff sovereignty</td></tr>
<tr><td>Land Reform</td><td>Land to the tiller, limits on concentration</td><td>Property rights resistance, compensation costs</td></tr>
<tr><td>Seed Systems</td><td>Farmer seed saving rights, no GMO patents</td><td>UPOV conventions, TRIPS agreement conflicts</td></tr>
<tr><td>Public Procurement</td><td>Priority purchasing from small farmers</td><td>Efficiency arguments, trade agreement constraints</td></tr>
</tbody>
</table>

<blockquote class="scavenger-quote" data-quote-id="fs-undergrad-q3">
<p>"Food sovereignty is not just an alternative policy framework but a fundamentally different way of organizing social relations around food production and consumption."</p>
<cite>— Hannah Wittman, "Food Sovereignty: Reconnecting Food, Nature and Community," 2010</cite>
</blockquote>

<h3>Analytical Framework for Assessment</h3>

<p>When analyzing food sovereignty initiatives, consider:</p>
<ol>
<li><strong>Scale:</strong> Local, national, or transnational implementation?</li>
<li><strong>Actors:</strong> Who defines sovereignty—states, communities, movements?</li>
<li><strong>Mechanisms:</strong> Rights-based, market-based, or commons-based approaches?</li>
<li><strong>Tensions:</strong> How are trade-offs between sovereignty, sustainability, and security managed?</li>
</ol>

<div class="key-concept">
<h4>Research Questions</h4>
<p>Critical inquiry into food sovereignty requires examining not just what it proposes, but how power relations are reproduced or transformed in its implementation. Whose sovereignty is advanced, and at what scales does meaningful food system change occur?</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Food Sovereignty: Epistemological Foundations and Counter-Hegemonic Potential</h2>

<p>Graduate-level analysis of food sovereignty requires engagement with multiple theoretical traditions and critical examination of the concept's transformative potential and limitations. This lesson examines food sovereignty through lenses of agrarian political economy, postcolonial theory, and social movement studies.</p>

<h3>Situating Food Sovereignty in Agrarian Political Economy</h3>

<p>The "agrarian question"—concerning the fate of peasant agriculture under capitalism—remains central to food sovereignty discourse. Three interpretive traditions inform contemporary debates:</p>

<ol>
<li><strong>Classical Marxist:</strong> Inevitable proletarianization of peasantry (Lenin, Kautsky)</li>
<li><strong>Chayanovian:</strong> Peasant economy operates on distinct, non-capitalist logic</li>
<li><strong>Neo-populist:</strong> Peasant persistence as form of resistance (van der Ploeg, McMichael)</li>
</ol>

<p>Food sovereignty primarily draws on neo-populist interpretations, positioning peasant agriculture not as anachronism but as viable alternative to industrial food production.</p>

<blockquote class="scavenger-quote" data-quote-id="fs-grad-q1">
<p>"The persistence of peasant farming is not a residual phenomenon but represents active resistance to and partial autonomy from capitalist relations."</p>
<cite>— Jan Douwe van der Ploeg, "The New Peasantries," 2008</cite>
</blockquote>

<div class="image-placeholder" data-caption="Theoretical traditions informing food sovereignty">
[Image: Conceptual diagram showing intellectual genealogy of food sovereignty theory]
</div>

<h3>Postcolonial and Decolonial Perspectives</h3>

<p>Food sovereignty's emergence from Global South movements necessitates engagement with postcolonial theory. Key considerations include:</p>

<h4>Colonial Legacies in Food Systems</h4>
<ul>
<li><strong>Plantation economies:</strong> Export orientation over food self-sufficiency</li>
<li><strong>Epistemicide:</strong> Destruction of indigenous agricultural knowledge</li>
<li><strong>Land dispossession:</strong> Ongoing effects of colonial land grabs</li>
<li><strong>Structural adjustment:</strong> Neocolonial conditions on food policy</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="fs-grad-q2">
<p>"Food sovereignty represents an epistemic break from colonial frameworks that positioned the Global South as supplier of raw materials and importer of 'development.'"</p>
<cite>— Raj Patel, "Food Sovereignty: Power, Gender, and the Right to Food," 2009</cite>
</blockquote>

<h4>Indigenous Food Sovereignty</h4>
<p>Indigenous articulations of food sovereignty extend beyond La Vía Campesina's framework to encompass:</p>
<ul>
<li>Traditional food systems as expression of self-determination</li>
<li>Sacred relationships with land, water, and food species</li>
<li>Rejection of property frameworks incompatible with commons-based food systems</li>
<li>Treaty rights and nation-to-nation relationships</li>
</ul>

<h3>Feminist Political Ecology and Food Sovereignty</h3>

<p>Gender analysis reveals both opportunities and limitations in food sovereignty discourse:</p>

<blockquote class="scavenger-quote" data-quote-id="fs-grad-q3">
<p>"Without a feminist perspective, food sovereignty risks reproducing patriarchal relations within peasant households and movements."</p>
<cite>— Bina Agarwal, "Gender and Green Governance," 2010</cite>
</blockquote>

<p>Critical gender questions include:</p>
<ul>
<li>Women produce 60-80% of food in developing countries but own less than 2% of land</li>
<li>Romanticization of "family farming" obscures gendered divisions of labor</li>
<li>Women's exclusion from farmer organizations and policy spaces</li>
<li>Feminist economics revaluing reproductive and care work in food systems</li>
</ul>

<div class="image-placeholder" data-caption="Gendered dimensions of food sovereignty">
[Image: Infographic showing women's roles in food production versus land ownership statistics]
</div>

<h3>The Scale Question: Local, National, Global</h3>

<p>A central tension in food sovereignty theory concerns appropriate scales of governance and action:</p>

<table class="theoretical-table">
<thead>
<tr><th>Scale</th><th>Opportunities</th><th>Limitations</th></tr>
</thead>
<tbody>
<tr><td>Local/Community</td><td>Democratic participation, ecological adaptation</td><td>Limited resources, vulnerability to external shocks</td></tr>
<tr><td>National/State</td><td>Policy tools, market regulation capacity</td><td>State capture by agribusiness, nationalism risks</td></tr>
<tr><td>Transnational/Movement</td><td>Counter-hegemonic coordination, solidarity</td><td>Implementation gaps, representation challenges</td></tr>
</tbody>
</table>

<h3>Counter-Hegemony and Gramscian Analysis</h3>

<p>Applying Gramsci's theory of hegemony, food sovereignty can be analyzed as:</p>

<ul>
<li><strong>War of position:</strong> Long-term building of alternative institutions, knowledge systems, and common sense about food</li>
<li><strong>Organic intellectuals:</strong> Peasant leaders articulating alternatives to neoliberal food governance</li>
<li><strong>Counter-hegemonic bloc:</strong> Alliance building across peasants, consumers, environmentalists, indigenous peoples</li>
<li><strong>Passive revolution risk:</strong> Co-optation through "sustainable intensification," "climate-smart agriculture"</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="fs-grad-q4">
<p>"Food sovereignty represents a 'counter-hegemonic' challenge not merely to neoliberal policies but to the very 'common sense' that defines food as commodity rather than commons."</p>
<cite>— Eric Holt-Giménez and Annie Shattuck, "Food Crises, Food Regimes and Food Movements," 2011</cite>
</blockquote>

<h3>Methodological Considerations</h3>

<p>Researching food sovereignty requires methodological reflection:</p>
<ul>
<li><strong>Positionality:</strong> Researcher relationships to movements and communities studied</li>
<li><strong>Participatory approaches:</strong> Collaborative research with movement actors</li>
<li><strong>Multi-scalar analysis:</strong> Linking local practices to global processes</li>
<li><strong>Engaged scholarship:</strong> Scholar-activist tensions and contributions</li>
</ul>

<div class="key-concept">
<h4>Critical Research Agenda</h4>
<p>Graduate research on food sovereignty should interrogate: Under what conditions do food sovereignty initiatives transform power relations versus merely ameliorate symptoms of the corporate food regime? How can we assess "actually existing" food sovereignty against normative aspirations?</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Ontological Politics and the Pluriverse: Advanced Theoretical Frameworks for Food Sovereignty Analysis</h2>

<p>Doctoral-level engagement with food sovereignty requires moving beyond policy analysis to examine fundamental ontological and epistemological questions. This lesson explores how food sovereignty movements enact alternative ways of knowing and being in relation to food, land, and nature.</p>

<h3>Beyond Critique: Ontological Politics and Food Sovereignty</h3>

<p>Drawing on Science and Technology Studies (STS) and political ontology, we can analyze food sovereignty not merely as alternative policy but as performance of different worlds.</p>

<h4>Actor-Network Theory and Food Systems</h4>
<p>Bruno Latour's actor-network theory (ANT) offers analytical tools for understanding how food sovereignty assembles heterogeneous actors—human and non-human—into alternative food networks:</p>

<ul>
<li><strong>Seeds as actors:</strong> Open-pollinated varieties vs. proprietary hybrids enact different socio-technical relations</li>
<li><strong>Soil as participant:</strong> Agroecological practices vs. input-intensive farming produce different soils and ecologies</li>
<li><strong>Translation:</strong> How food sovereignty movements enroll diverse actors into coherent networks</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="fs-phd-q1">
<p>"What if, instead of analyzing food sovereignty as a demand for rights within existing political ontologies, we understood it as performing alternative ontologies—different ways of composing worlds with food, land, and community?"</p>
<cite>— Arturo Escobar, "Designs for the Pluriverse," 2018</cite>
</blockquote>

<div class="image-placeholder" data-caption="Ontological mapping of food sovereignty">
[Image: Complex network diagram showing human and non-human actors in food sovereignty assemblages]
</div>

<h3>Haraway's Naturecultures and Food Sovereignty</h3>

<p>Donna Haraway's concept of "naturecultures" disrupts the nature/culture binary underlying both industrial agriculture and some alternative food movements:</p>

<blockquote class="scavenger-quote" data-quote-id="fs-phd-q2">
<p>"There is no way to disentangle the biological and the cultural in seed-saving practices; seeds are naturecultures, simultaneously genetic material and cultural heritage."</p>
<cite>— Adapted from Donna Haraway, "Staying with the Trouble," 2016</cite>
</blockquote>

<p>Implications for food sovereignty analysis:</p>
<ul>
<li>Seed sovereignty involves not "preserving nature" but cultivating specific naturecultures</li>
<li>Traditional agricultural knowledge is not "applied to" nature but emerges from human-nonhuman co-evolution</li>
<li>The dichotomy between "natural" and "industrial" food obscures complex technological assemblages</li>
</ul>

<h3>Gramscian Hegemony Revisited: The Corporate Food Regime as Common Sense</h3>

<p>Advanced Gramscian analysis examines how the corporate food regime achieves hegemony not through coercion alone but by becoming "common sense":</p>

<h4>Elements of Food Regime Hegemony</h4>
<ul>
<li><strong>Productivism:</strong> Yield maximization as self-evident goal</li>
<li><strong>Consumer sovereignty:</strong> "Choice" as primary food system value</li>
<li><strong>Technological solutionism:</strong> Innovation as path to sustainability</li>
<li><strong>Cheap food policy:</strong> Low prices naturalized, externalities invisible</li>
</ul>

<blockquote class="scavenger-quote" data-quote-id="fs-phd-q3">
<p>"The power of the corporate food regime lies not primarily in coercion but in its capacity to define the very terms in which food policy debates are conducted—making alternatives appear utopian, inefficient, or backward."</p>
<cite>— Philip McMichael, "Historicizing Food Sovereignty," 2014</cite>
</blockquote>

<h4>Counter-Hegemonic Strategies</h4>
<p>Food sovereignty movements engage in what Gramsci called "war of position":</p>
<ul>
<li><strong>Alternative knowledge production:</strong> Agroecology, peasant-to-peasant learning</li>
<li><strong>Institution building:</strong> Seed banks, farmers' markets, food policy councils</li>
<li><strong>Narrative contestation:</strong> "Feeding the world" counter-narratives</li>
<li><strong>Alliance formation:</strong> Linking agrarian, environmental, and food justice movements</li>
</ul>

<div class="image-placeholder" data-caption="Gramscian analysis of food system hegemony and counter-hegemony">
[Image: Theoretical framework diagram showing hegemonic elements and counter-hegemonic strategies]
</div>

<h3>The Pluriverse and Beyond-Development</h3>

<p>Arturo Escobar's concept of the "pluriverse"—a world where many worlds fit—provides a framework for understanding food sovereignty as part of broader "transitions" away from the development paradigm:</p>

<blockquote class="scavenger-quote" data-quote-id="fs-phd-q4">
<p>"Food sovereignty is not simply about producing food differently within the existing world but about defending and enacting different worlds—relational worlds where food, land, water, and community are not separable resources to be optimized but constitutive elements of being."</p>
<cite>— Arturo Escobar, "Thinking-Feeling with the Earth," 2020</cite>
</blockquote>

<h4>Research Implications</h4>
<ul>
<li>Move from "food sovereignty studies" to studying how food sovereignty movements perform alternative ontologies</li>
<li>Attend to what food sovereignty enables to exist—worlds, relations, beings—not just what it opposes</li>
<li>Engage with non-Western and indigenous ontologies on their own terms, not as "cultural beliefs" about a single nature</li>
</ul>

<h3>Methodological Reflexivity: Decolonizing Food Sovereignty Research</h3>

<p>Doctoral research requires critical examination of research practices themselves:</p>

<table class="methodology-table">
<thead>
<tr><th>Conventional Approach</th><th>Decolonial Alternative</th></tr>
</thead>
<tbody>
<tr><td>Researcher as expert extracting knowledge</td><td>Research as collaborative knowledge production</td></tr>
<tr><td>Movements as objects of study</td><td>Movements as interlocutors and co-theorists</td></tr>
<tr><td>Academic publications as primary output</td><td>Accountable scholarship serving movement needs</td></tr>
<tr><td>Theory application to empirical cases</td><td>Theory emerging from situated practices</td></tr>
</tbody>
</table>

<h3>Emerging Research Frontiers</h3>

<ul>
<li><strong>Multispecies food sovereignty:</strong> Centering non-human actors and ecological relations</li>
<li><strong>Digital food sovereignty:</strong> Data, platforms, and algorithmic governance in food systems</li>
<li><strong>Climate food sovereignty:</strong> Adaptation, mitigation, and just transitions</li>
<li><strong>Urban food sovereignty:</strong> Translating peasant frameworks to city contexts</li>
<li><strong>Metabolic rift:</strong> Food sovereignty and socioecological metabolism</li>
</ul>

<div class="key-concept">
<h4>Doctoral Research Orientation</h4>
<p>The doctoral researcher studying food sovereignty must navigate between rigorous theoretical engagement and accountability to movements. The challenge is not merely to analyze food sovereignty but to contribute to the epistemic work of articulating and defending alternative food futures against the totalizing claims of the corporate food regime.</p>
</div>
</div>`
        }
      },
      {
        id: 'fs-intro-2',
        title: 'Local Food Systems',
        order: 2,
        duration: 15,
        hasActivity: false,
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>Where Does Local Food Come From?</h2>

<p>Remember Maria from our last story? She learned that the best tasting food comes from nearby! Let us explore all the amazing places where local food grows and is sold.</p>

<h3>The Farmers Market</h3>
<p>A farmers market is like a food party where farmers bring their fresh food to sell:</p>
<ul>
<li>Farmers set up tables with fruits and vegetables</li>
<li>You can meet the person who grew your food!</li>
<li>The food is super fresh - sometimes picked that morning</li>
<li>You can ask questions about how food is grown</li>
</ul>

<h3>Community Gardens</h3>
<p>In a community garden, neighbors share a big garden space:</p>
<ul>
<li>Each family gets their own little plot</li>
<li>Neighbors help each other learn gardening</li>
<li>People share extra vegetables with each other</li>
<li>Kids learn to grow their own food</li>
</ul>

<h3>Backyard and School Gardens</h3>
<p>You can grow food right where you are!</p>
<ul>
<li>Tomatoes in pots on a balcony</li>
<li>Herbs in a sunny window</li>
<li>A vegetable patch in your school</li>
<li>Fruit trees in your neighborhood</li>
</ul>

<h3>Food from Local Farms</h3>
<p>Some families join a special food club called a CSA:</p>
<ul>
<li>CSA means Community Supported Agriculture</li>
<li>You pay the farmer at the start of the season</li>
<li>Every week you get a box of whatever is growing</li>
<li>It is like a surprise vegetable present!</li>
</ul>

<h3>Why Local Food is Special</h3>
<ul>
<li>It is fresher and tastes better</li>
<li>Less pollution from trucks driving far away</li>
<li>Money helps farmers in your community</li>
<li>You learn about seasons - strawberries in summer, apples in fall!</li>
</ul>

<div class="key-concept">
<h4>Local Food Heroes</h4>
<p>Farmers, gardeners, and neighbors who grow food near you are helping your community stay healthy and strong!</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Building Local Food Networks</h2>

<p>Local food systems are networks of farmers, processors, distributors, and consumers all working within a region. These systems create alternatives to the global industrial food chain.</p>

<h3>Types of Local Food Outlets</h3>

<table>
<tr><th>Type</th><th>Description</th><th>Benefits</th></tr>
<tr><td>Farmers Markets</td><td>Direct sales from farmer to consumer</td><td>Fresh food, meet your farmer, community gathering</td></tr>
<tr><td>CSA (Community Supported Agriculture)</td><td>Subscription boxes from local farms</td><td>Share risk with farmer, seasonal variety</td></tr>
<tr><td>Farm Stands</td><td>On-farm sales locations</td><td>Freshest possible, farm experience</td></tr>
<tr><td>Food Co-ops</td><td>Member-owned grocery stores</td><td>Local products, democratic ownership</td></tr>
<tr><td>Farm-to-School</td><td>Schools purchasing from local farms</td><td>Education, healthy meals, farmer income</td></tr>
</table>

<h3>How CSAs Work</h3>

<p>Community Supported Agriculture connects consumers directly to farmers:</p>
<ol>
<li><strong>Sign up:</strong> Pay at the start of the growing season</li>
<li><strong>Share the risk:</strong> If crops fail, everyone shares the loss; if abundant, everyone shares the bounty</li>
<li><strong>Weekly pickup:</strong> Receive a share of whatever is harvested</li>
<li><strong>Eat seasonally:</strong> Learn to cook with what is available</li>
</ol>

<h3>Benefits of Local Food Systems</h3>

<h4>For Farmers:</h4>
<ul>
<li>Keep more money (no middlemen)</li>
<li>Direct feedback from customers</li>
<li>More stable income from CSA pre-payments</li>
<li>Build relationships with community</li>
</ul>

<h4>For Communities:</h4>
<ul>
<li>Fresher, more nutritious food</li>
<li>Money circulates locally</li>
<li>Preserve farmland and rural livelihoods</li>
<li>Reduce environmental impact</li>
</ul>

<h3>Challenges and Solutions</h3>

<table>
<tr><th>Challenge</th><th>Solution</th></tr>
<tr><td>Seasonal availability</td><td>Food preservation, storage crops, greenhouses</td></tr>
<tr><td>Higher prices</td><td>SNAP at farmers markets, sliding scale CSA</td></tr>
<tr><td>Convenience</td><td>Online ordering, multiple pickup locations</td></tr>
<tr><td>Limited selection</td><td>Multi-farm CSAs, food hub aggregation</td></tr>
</table>

<div class="key-concept">
<h4>Economic Impact</h4>
<p>Studies show that dollars spent at local farms recirculate in the local economy 2-3 times more than money spent at chain stores. Local food builds local wealth!</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Local Food System Economics and Infrastructure</h2>

<p>Building functional local food systems requires understanding the economics, logistics, and infrastructure that connect local producers to consumers.</p>

<h3>The Local Food Economy</h3>

<h4>Direct Marketing Channels:</h4>
<table>
<thead>
<tr><th>Channel</th><th>Farmer Revenue Share</th><th>Consumer Price Premium</th><th>Annual Growth</th></tr>
</thead>
<tbody>
<tr><td>Farmers Markets</td><td>90-100 percent</td><td>20-50 percent</td><td>3-5 percent</td></tr>
<tr><td>CSA</td><td>100 percent</td><td>10-30 percent</td><td>5-7 percent</td></tr>
<tr><td>On-farm sales</td><td>100 percent</td><td>0-20 percent</td><td>4-6 percent</td></tr>
<tr><td>Conventional retail</td><td>15-25 percent</td><td>0 percent (baseline)</td><td>1-2 percent</td></tr>
</tbody>
</table>

<h3>Food Hubs and Aggregation</h3>

<p>Food hubs solve a key problem: connecting many small farms with large buyers.</p>

<h4>Food Hub Functions:</h4>
<ul>
<li><strong>Aggregation:</strong> Combine products from multiple farms</li>
<li><strong>Distribution:</strong> Efficient delivery to buyers</li>
<li><strong>Marketing:</strong> Brand development and sales</li>
<li><strong>Processing:</strong> Washing, packing, value-added production</li>
</ul>

<h4>Food Hub Models:</h4>
<ul>
<li><strong>Non-profit:</strong> Mission-driven, grant-supported</li>
<li><strong>Cooperative:</strong> Farmer-owned and governed</li>
<li><strong>For-profit:</strong> Private business model</li>
<li><strong>Hybrid:</strong> Combination structures</li>
</ul>

<h3>Institutional Procurement</h3>

<p>Large institutions can anchor local food systems:</p>
<ul>
<li><strong>Schools:</strong> Farm-to-school programs reaching millions of students</li>
<li><strong>Hospitals:</strong> Health systems sourcing locally for patient and cafeteria food</li>
<li><strong>Universities:</strong> Campus dining using local products</li>
<li><strong>Government:</strong> Procurement policies favoring local</li>
</ul>

<h4>Barriers to Institutional Buying:</h4>
<ul>
<li>Volume and consistency requirements</li>
<li>Food safety certification needs</li>
<li>Procurement policies designed for large vendors</li>
<li>Price competition with industrial suppliers</li>
</ul>

<h3>Infrastructure Needs</h3>

<p>Local food systems require physical infrastructure:</p>
<ul>
<li><strong>Processing:</strong> USDA-inspected meat facilities, commercial kitchens</li>
<li><strong>Storage:</strong> Cold storage, dry storage, grain handling</li>
<li><strong>Distribution:</strong> Refrigerated trucks, loading facilities</li>
<li><strong>Retail:</strong> Farmers market infrastructure, co-op stores</li>
</ul>

<div class="key-concept">
<h4>Systems Thinking</h4>
<p>Local food is not just about individual farm-to-consumer relationships. Building resilient local food systems requires infrastructure, policy, and coordination across the entire supply chain.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Local Food Systems: Economic Analysis and Policy Frameworks</h2>

<p>Understanding local food systems requires analyzing their economic structure, measuring their impacts, and examining the policy environment that shapes their development.</p>

<h3>Defining and Measuring Local</h3>

<h4>Defining Local:</h4>
<ul>
<li><strong>Geographic radius:</strong> 100-mile, 400-mile definitions common</li>
<li><strong>Political boundaries:</strong> Same state, region, or foodshed</li>
<li><strong>Supply chain length:</strong> Number of intermediaries between producer and consumer</li>
<li><strong>Knowledge relationship:</strong> Consumer knows producer identity</li>
</ul>

<h4>Market Size Estimates:</h4>
<table>
<tr><th>Metric</th><th>Value</th><th>Source</th></tr>
<tr><td>US local food sales</td><td>12 billion dollars</td><td>USDA 2020</td></tr>
<tr><td>Percent of farms selling local</td><td>7.8 percent</td><td>Ag Census 2017</td></tr>
<tr><td>Number of farmers markets</td><td>8,600</td><td>USDA 2019</td></tr>
<tr><td>Number of food hubs</td><td>300 plus</td><td>USDA 2020</td></tr>
</table>

<h3>Economic Impact Analysis</h3>

<h4>Methods:</h4>
<ul>
<li><strong>Input-output models:</strong> Trace spending through regional economy</li>
<li><strong>Multiplier effects:</strong> Local spending recirculates more than imports</li>
<li><strong>Employment impacts:</strong> Jobs created per million dollars of sales</li>
<li><strong>Leakage analysis:</strong> Money leaving vs. staying in region</li>
</ul>

<h4>Typical Findings:</h4>
<ul>
<li>Local food sales generate 1.4-2.6 times more local economic activity than equivalent imports</li>
<li>Local farms employ more people per dollar of revenue</li>
<li>Strong local food systems correlate with lower poverty rates</li>
</ul>

<h3>Policy Frameworks</h3>

<h4>Federal Policies:</h4>
<table>
<tr><th>Program</th><th>Description</th><th>Funding Level</th></tr>
<tr><td>Farmers Market Promotion Program</td><td>Grants for market development</td><td>23 million dollars per year</td></tr>
<tr><td>Local Food Promotion Program</td><td>Enterprise and planning grants</td><td>27 million dollars per year</td></tr>
<tr><td>Value-Added Producer Grants</td><td>Working capital and planning</td><td>23 million dollars per year</td></tr>
<tr><td>Farm to School Grant Program</td><td>School procurement and education</td><td>12 million dollars per year</td></tr>
</table>

<h4>State and Local Policies:</h4>
<ul>
<li>Procurement preferences for local products</li>
<li>Food hub and infrastructure investments</li>
<li>Farmland preservation programs</li>
<li>Beginning farmer support programs</li>
<li>Food access and nutrition incentives</li>
</ul>

<h3>Critical Analysis</h3>

<h4>Debates in Local Food Scholarship:</h4>
<ul>
<li><strong>Local trap:</strong> Local does not automatically equal sustainable or just</li>
<li><strong>Scale appropriateness:</strong> Right-sizing food systems for different contexts</li>
<li><strong>Equity:</strong> Who has access to local food? Who benefits from local food systems?</li>
<li><strong>Environmental claims:</strong> Is local always lower impact?</li>
</ul>

<div class="key-concept">
<h4>Analytical Framework</h4>
<p>Rigorous analysis of local food systems requires moving beyond assumptions to examine actual economic flows, environmental impacts, and equity outcomes. Local is a starting point, not an end in itself.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Local Food Systems: Alternative Networks and Systemic Change</h2>

<p>Graduate engagement with local food systems situates them within broader debates about food system transformation, alternative economic networks, and socioecological sustainability.</p>

<h3>Theoretical Frameworks</h3>

<h4>Alternative Food Networks (AFNs):</h4>
<p>AFNs are defined in opposition to conventional food systems:</p>
<ul>
<li><strong>Shorter supply chains:</strong> Reducing distance and intermediaries</li>
<li><strong>Embedding:</strong> Social relationships within economic exchange</li>
<li><strong>Quality conventions:</strong> Alternative definitions of food quality</li>
<li><strong>Reflexivity:</strong> Consumer awareness of production conditions</li>
</ul>

<h4>Critiques of AFN Literature:</h4>
<ul>
<li>Romanticization of local and small-scale</li>
<li>Insufficient attention to power and inequality</li>
<li>Limited engagement with racial justice</li>
<li>Weak theorization of system change</li>
</ul>

<h3>Civic Agriculture and Food Democracy</h3>

<h4>Civic Agriculture Concept:</h4>
<p>Lyson's civic agriculture framework emphasizes:</p>
<ul>
<li>Agriculture embedded in local communities</li>
<li>Farmers as community members, not just producers</li>
<li>Food system participation as civic engagement</li>
<li>Local food infrastructure as public goods</li>
</ul>

<h4>Food Democracy:</h4>
<p>Decision-making power over food systems:</p>
<ul>
<li>Who controls production, distribution, and access?</li>
<li>Whose knowledge counts in food system governance?</li>
<li>How are food system decisions made democratically?</li>
</ul>

<h3>Scale and Transformation</h3>

<table>
<tr><th>Question</th><th>Reformist Position</th><th>Radical Position</th></tr>
<tr><td>Relationship to conventional system</td><td>Complement and improve</td><td>Challenge and replace</td></tr>
<tr><td>Scale of impact</td><td>Incremental expansion</td><td>Systemic transformation</td></tr>
<tr><td>Market engagement</td><td>Work within markets</td><td>Build alternative economies</td></tr>
<tr><td>Policy approach</td><td>Support programs</td><td>Structural change</td></tr>
</table>

<h3>Racial Equity in Local Food</h3>

<p>Critical scholarship examines:</p>
<ul>
<li>Whiteness of farmers market spaces and leadership</li>
<li>Historical dispossession of Black and Indigenous farmers</li>
<li>Food apartheid and uneven access to local food</li>
<li>Community-led solutions in marginalized communities</li>
</ul>

<h3>Research Methods</h3>

<ul>
<li><strong>Value chain analysis:</strong> Mapping flows of products, money, and power</li>
<li><strong>Network analysis:</strong> Relationships among food system actors</li>
<li><strong>Participatory research:</strong> Collaboration with communities and farmers</li>
<li><strong>Political economy:</strong> Power structures shaping food systems</li>
</ul>

<div class="key-concept">
<h4>Graduate Research Orientation</h4>
<p>Graduate research on local food systems must engage critically with celebratory narratives while remaining committed to alternatives. The task is to analyze limitations while contributing to more just and sustainable food futures.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Local Food Systems: Theoretical Interventions and Research Frontiers</h2>

<p>Doctoral engagement with local food systems requires theoretical innovation, methodological rigor, and attentiveness to the politics of knowledge production in contested terrain.</p>

<h3>Theoretical Debates</h3>

<h4>Beyond the Local Trap:</h4>
<p>Born and Purcell's critique and subsequent developments:</p>
<ul>
<li>Scale is socially constructed, not inherently meaningful</li>
<li>Local outcomes depend on the social relations at that scale</li>
<li>Scalar politics: why is local valorized in food movements?</li>
<li>Relational approaches to scale in food systems</li>
</ul>

<h4>Convention Theory Applications:</h4>
<table>
<tr><th>Convention</th><th>Quality Definition</th><th>Local Food Application</th></tr>
<tr><td>Market</td><td>Price signals</td><td>Premium pricing for local</td></tr>
<tr><td>Industrial</td><td>Efficiency and standards</td><td>Food safety certification</td></tr>
<tr><td>Domestic</td><td>Trust and tradition</td><td>Farmer-consumer relationships</td></tr>
<tr><td>Civic</td><td>Collective welfare</td><td>Community food security</td></tr>
<tr><td>Ecological</td><td>Environmental impact</td><td>Sustainable production</td></tr>
</table>

<h3>Emerging Research Areas</h3>

<h4>Digital Platforms and Local Food:</h4>
<ul>
<li>Online farmers markets and ordering platforms</li>
<li>Blockchain for local food traceability</li>
<li>Data governance in local food systems</li>
<li>Platform cooperativism alternatives</li>
</ul>

<h4>Climate Adaptation:</h4>
<ul>
<li>Local food system resilience to climate shocks</li>
<li>Bioregional food system planning</li>
<li>Carbon accounting in local versus global supply chains</li>
<li>Climate-appropriate crop selection</li>
</ul>

<h4>Pandemic Lessons:</h4>
<ul>
<li>Supply chain vulnerability and local resilience</li>
<li>Rapid innovation in local food distribution</li>
<li>Essential worker visibility in food systems</li>
<li>Mutual aid and community food networks</li>
</ul>

<h3>Methodological Considerations</h3>

<h4>Challenges in Local Food Research:</h4>
<ul>
<li>Defining boundaries of local food systems</li>
<li>Data availability for small-scale operations</li>
<li>Attribution of impacts in complex systems</li>
<li>Researcher positionality in community-engaged work</li>
</ul>

<h4>Innovative Approaches:</h4>
<ul>
<li>GIS and spatial analysis of local food access</li>
<li>Social network analysis of food system relationships</li>
<li>Comparative case studies across contexts</li>
<li>Mixed methods combining quantitative and qualitative</li>
</ul>

<h3>Contribution to Food Sovereignty</h3>

<p>How does local food scholarship contribute to food sovereignty?</p>
<ul>
<li>Documenting alternatives to corporate food systems</li>
<li>Analyzing conditions enabling community control</li>
<li>Critiquing co-optation by market forces</li>
<li>Supporting movement knowledge production</li>
</ul>

<div class="key-concept">
<h4>Doctoral Research Orientation</h4>
<p>Doctoral research on local food systems occupies a space between analytical distance and normative commitment. The challenge is to produce rigorous scholarship that advances both academic debates and practical alternatives to industrial food.</p>
</div>
</div>`
        }
      },
      {
        id: 'fs-intro-3',
        title: 'Building Food Sovereignty in Your Community',
        order: 3,
        duration: 15,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `<div class="lesson-content">
<h2>You Can Be a Food Hero!</h2>

<p>Guess what? Kids like YOU can help build food sovereignty in your community! Here are some fun ways to get started.</p>

<h3>Start a Garden</h3>
<p>Growing food is the first step to food sovereignty!</p>
<ul>
<li>Plant seeds in pots on a windowsill</li>
<li>Ask your school about starting a garden club</li>
<li>Help a neighbor with their garden</li>
<li>Grow easy plants like beans, lettuce, or tomatoes</li>
</ul>

<h3>Learn About Your Food</h3>
<p>Food heroes know where their food comes from:</p>
<ul>
<li>Ask your parents where food in your kitchen came from</li>
<li>Visit a farmers market and talk to farmers</li>
<li>Learn recipes from your grandparents or elders</li>
<li>Try new vegetables you have never eaten before</li>
</ul>

<h3>Share With Others</h3>
<p>Food sovereignty is about community:</p>
<ul>
<li>Share garden vegetables with neighbors</li>
<li>Help cook a meal for your family</li>
<li>Trade snacks that you grew or made</li>
<li>Teach a friend how to plant a seed</li>
</ul>

<h3>Reduce Food Waste</h3>
<p>Every bit of food is precious:</p>
<ul>
<li>Eat all the food on your plate</li>
<li>Save scraps for compost</li>
<li>Use leftovers for tomorrow's lunch</li>
<li>Store food properly so it stays fresh</li>
</ul>

<h3>Speak Up!</h3>
<p>Food heroes have a voice:</p>
<ul>
<li>Ask your school to serve local food</li>
<li>Tell your family about what you learned</li>
<li>Draw pictures about growing food</li>
<li>Write a story about a community garden</li>
</ul>

<div class="key-concept">
<h4>You Have Power!</h4>
<p>Every seed you plant, every local food you eat, and every person you teach makes your community stronger. YOU are part of the food sovereignty movement!</p>
</div>
</div>`,

          MIDDLE_SCHOOL: `<div class="lesson-content">
<h2>Taking Action for Food Sovereignty</h2>

<p>Food sovereignty is not just an idea to learn about - it is a movement to join. Here is how students can take meaningful action in their communities.</p>

<h3>Action Levels</h3>

<table>
<tr><th>Level</th><th>Actions</th><th>Impact</th></tr>
<tr><td>Personal</td><td>Grow food, cook from scratch, reduce waste</td><td>Build skills, reduce dependence</td></tr>
<tr><td>Family</td><td>Shop at farmers markets, join CSA, preserve food</td><td>Support local farmers, eat seasonally</td></tr>
<tr><td>School</td><td>Start garden club, advocate for local school food</td><td>Educate peers, change institutions</td></tr>
<tr><td>Community</td><td>Volunteer at food bank, help community garden</td><td>Build food access, strengthen networks</td></tr>
</table>

<h3>Starting a School Project</h3>

<h4>School Garden Steps:</h4>
<ol>
<li>Find interested students and a supportive teacher</li>
<li>Survey available space (even containers work!)</li>
<li>Research what grows in your season and climate</li>
<li>Write a proposal for school administration</li>
<li>Seek donations of seeds, tools, and materials</li>
<li>Plant, maintain, and harvest together</li>
<li>Share food with cafeteria or community</li>
</ol>

<h4>Farm-to-School Campaign:</h4>
<ol>
<li>Research what local farms exist near your school</li>
<li>Find out how school food purchasing decisions are made</li>
<li>Create a petition or presentation for decision-makers</li>
<li>Propose a pilot program starting small</li>
<li>Document success and expand</li>
</ol>

<h3>Community Engagement</h3>

<h4>Ways to Get Involved:</h4>
<ul>
<li><strong>Community garden:</strong> Volunteer to help maintain shared plots</li>
<li><strong>Food bank:</strong> Sort donations, help with distribution</li>
<li><strong>Farmers market:</strong> Help a farmer at their stand</li>
<li><strong>Seed library:</strong> Start or support seed sharing</li>
<li><strong>Cooking classes:</strong> Learn traditional recipes from elders</li>
</ul>

<h3>Food Preservation Skills</h3>

<p>Preserving food extends local harvests through the year:</p>
<ul>
<li><strong>Freezing:</strong> Berries, vegetables, prepared meals</li>
<li><strong>Canning:</strong> Jams, pickles, tomato sauce (learn from an adult)</li>
<li><strong>Drying:</strong> Herbs, fruit leather, dried beans</li>
<li><strong>Fermentation:</strong> Sauerkraut, kimchi, pickles</li>
</ul>

<div class="key-concept">
<h4>Start Where You Are</h4>
<p>You do not need to do everything at once. Pick one action that interests you and start there. Every small step toward food sovereignty adds up!</p>
</div>
</div>`,

          HIGH_SCHOOL: `<div class="lesson-content">
<h2>Organizing for Food System Change</h2>

<p>Moving from individual action to collective organizing is essential for transforming food systems. This lesson explores strategies for effective food sovereignty advocacy.</p>

<h3>Understanding Power in Food Systems</h3>

<h4>Who Holds Power:</h4>
<ul>
<li><strong>Corporations:</strong> Control seeds, inputs, processing, retail</li>
<li><strong>Government:</strong> Sets policy, subsidies, regulations</li>
<li><strong>Institutions:</strong> Schools, hospitals, prisons make large purchases</li>
<li><strong>Consumers:</strong> Purchasing decisions send market signals</li>
<li><strong>Producers:</strong> Farmers and food workers create all food</li>
</ul>

<h4>Power Mapping:</h4>
<p>Before organizing, understand:</p>
<ul>
<li>Who makes decisions you want to change?</li>
<li>Who influences those decision-makers?</li>
<li>What pressure points exist?</li>
<li>Who are potential allies and opponents?</li>
</ul>

<h3>Campaign Strategies</h3>

<table>
<tr><th>Strategy</th><th>Targets</th><th>Tactics</th></tr>
<tr><td>Policy advocacy</td><td>Legislators, regulators</td><td>Testimony, lobbying, voter mobilization</td></tr>
<tr><td>Institutional change</td><td>Schools, hospitals, businesses</td><td>Petitions, meetings, media campaigns</td></tr>
<tr><td>Consumer campaigns</td><td>Companies, retailers</td><td>Boycotts, buycotts, shareholder actions</td></tr>
<tr><td>Community building</td><td>Neighborhoods, networks</td><td>Gardens, markets, education</td></tr>
</table>

<h3>Coalition Building</h3>

<p>Food sovereignty connects many issues:</p>
<ul>
<li><strong>Environmental groups:</strong> Sustainable agriculture, climate</li>
<li><strong>Labor organizations:</strong> Food worker rights</li>
<li><strong>Health advocates:</strong> Nutrition, food access</li>
<li><strong>Social justice groups:</strong> Racial equity, economic justice</li>
<li><strong>Farmer organizations:</strong> Producer rights, fair prices</li>
</ul>

<h3>Campaign Example: Farm to School</h3>

<h4>Phase 1: Research</h4>
<ul>
<li>Current school food sourcing and budget</li>
<li>Local farms and their capacity</li>
<li>Successful programs in other districts</li>
<li>Decision-making process for school food</li>
</ul>

<h4>Phase 2: Coalition Building</h4>
<ul>
<li>Student government endorsement</li>
<li>Parent group support</li>
<li>Teacher allies</li>
<li>Local farmer participation</li>
</ul>

<h4>Phase 3: Action</h4>
<ul>
<li>Present to school board</li>
<li>Propose pilot program</li>
<li>Media coverage</li>
<li>Monitor implementation</li>
</ul>

<div class="key-concept">
<h4>Organizing Principle</h4>
<p>Effective food system change requires organized people power. Individual choices matter, but collective action transforms institutions and policies.</p>
</div>
</div>`,

          UNDERGRADUATE: `<div class="lesson-content">
<h2>Food Sovereignty Organizing: Theory and Practice</h2>

<p>Undergraduate engagement with food sovereignty organizing integrates social movement theory with practical skills for food system transformation.</p>

<h3>Social Movement Theory Applied</h3>

<h4>Resource Mobilization:</h4>
<ul>
<li>What resources do food movements need? (people, money, expertise)</li>
<li>How do movements build organizational infrastructure?</li>
<li>Role of professional movement organizations vs. grassroots</li>
</ul>

<h4>Political Opportunity:</h4>
<ul>
<li>When are policy windows open for change?</li>
<li>How do external events create opportunities? (food scares, climate disasters)</li>
<li>Role of elite allies in movement success</li>
</ul>

<h4>Framing:</h4>
<ul>
<li>How do movements define problems and solutions?</li>
<li>Food sovereignty vs. food security framings</li>
<li>Counter-framing by corporate food system defenders</li>
</ul>

<h3>Levels of Intervention</h3>

<table>
<tr><th>Level</th><th>Focus</th><th>Examples</th></tr>
<tr><td>Individual</td><td>Behavior and consumption</td><td>Dietary choice, food growing</td></tr>
<tr><td>Organizational</td><td>Institutional practices</td><td>University dining, hospital food</td></tr>
<tr><td>Community</td><td>Local food infrastructure</td><td>Markets, gardens, co-ops</td></tr>
<tr><td>Policy</td><td>Government programs and regulations</td><td>Farm bill, zoning, procurement</td></tr>
<tr><td>Systemic</td><td>Economic and political structures</td><td>Trade policy, corporate power</td></tr>
</table>

<h3>Movement Strategy Analysis</h3>

<h4>Inside vs. Outside Strategies:</h4>
<ul>
<li><strong>Inside:</strong> Working within institutions, policy advocacy, partnerships</li>
<li><strong>Outside:</strong> Protest, direct action, building alternatives</li>
<li><strong>Dual power:</strong> Creating parallel institutions while challenging dominant systems</li>
</ul>

<h4>Reform vs. Transformation:</h4>
<ul>
<li>Do reforms strengthen or weaken transformative potential?</li>
<li>What is the relationship between incremental and radical change?</li>
<li>When does working within the system change it vs. co-opt movements?</li>
</ul>

<h3>Skills for Organizers</h3>

<ul>
<li><strong>Power analysis:</strong> Understanding decision-making structures</li>
<li><strong>Campaign planning:</strong> Goals, targets, tactics, timeline</li>
<li><strong>Coalition building:</strong> Finding common ground across difference</li>
<li><strong>Communication:</strong> Framing, storytelling, media relations</li>
<li><strong>Facilitation:</strong> Running effective meetings and processes</li>
<li><strong>Evaluation:</strong> Learning from success and failure</li>
</ul>

<div class="key-concept">
<h4>Praxis</h4>
<p>Food sovereignty organizing requires integration of theory and practice. Academic analysis informs strategy; organizing experience generates new theoretical insights.</p>
</div>
</div>`,

          GRADUATE: `<div class="lesson-content">
<h2>Food Sovereignty Movements: Comparative Analysis and Strategic Questions</h2>

<p>Graduate engagement with food sovereignty organizing examines movement dynamics, comparative cases, and strategic debates within the global food sovereignty movement.</p>

<h3>La Via Campesina as Transnational Movement</h3>

<h4>Organizational Structure:</h4>
<ul>
<li>Federation of national and regional peasant organizations</li>
<li>Representation from over 80 countries</li>
<li>Internal democracy and consensus decision-making</li>
<li>Balance between global coordination and local autonomy</li>
</ul>

<h4>Movement Strategies:</h4>
<ul>
<li><strong>Counter-summits:</strong> Challenging WTO, FAO, World Bank</li>
<li><strong>Policy engagement:</strong> UN Committee on Food Security</li>
<li><strong>Direct action:</strong> Land occupations, seed exchanges</li>
<li><strong>Knowledge production:</strong> Agroecology training centers</li>
</ul>

<h3>Comparative Movement Analysis</h3>

<table>
<tr><th>Movement</th><th>Context</th><th>Strategies</th><th>Outcomes</th></tr>
<tr><td>MST Brazil</td><td>Landless workers</td><td>Land occupation, cooperatives</td><td>400,000 families settled</td></tr>
<tr><td>Food Sovereignty Ghana</td><td>Seed and trade policy</td><td>Policy advocacy, farmer networks</td><td>Plant Breeders Bill modified</td></tr>
<tr><td>MASIPAG Philippines</td><td>Rice farmer sovereignty</td><td>Farmer-led breeding, training</td><td>Thousands of farmers using local varieties</td></tr>
<tr><td>Black Urban Growers US</td><td>Urban food justice</td><td>Land access, education</td><td>Growing network of Black farmers</td></tr>
</table>

<h3>Strategic Debates</h3>

<h4>State Engagement:</h4>
<ul>
<li>Can food sovereignty be achieved through state policy?</li>
<li>Risks of institutionalization and co-optation</li>
<li>Cases of state support: Venezuela, Bolivia, Ecuador</li>
<li>Limits of food sovereignty in capitalist states</li>
</ul>

<h4>Market Engagement:</h4>
<ul>
<li>Role of alternative markets (fair trade, organic, local)</li>
<li>Certification and market access for small farmers</li>
<li>Critique of market-based approaches to food system change</li>
<li>Solidarity economy alternatives</li>
</ul>

<h4>Scale and Alliance:</h4>
<ul>
<li>Rural-urban alliances in food sovereignty</li>
<li>Producer-consumer relationships beyond markets</li>
<li>Intersectionality: food sovereignty and other justice movements</li>
<li>Global North-South solidarity and tensions</li>
</ul>

<h3>Research Engagement</h3>

<p>Graduate researchers supporting food sovereignty movements:</p>
<ul>
<li>Participatory research methodologies</li>
<li>Movement documentation and analysis</li>
<li>Policy research for advocacy</li>
<li>Popular education materials development</li>
</ul>

<div class="key-concept">
<h4>Scholar-Activist Orientation</h4>
<p>Graduate engagement with food sovereignty organizing navigates between analytical rigor and movement accountability. The challenge is to produce scholarship that advances both academic understanding and movement effectiveness.</p>
</div>
</div>`,

          PHD: `<div class="lesson-content">
<h2>Food Sovereignty Praxis: Theoretical and Strategic Frontiers</h2>

<p>Doctoral engagement with food sovereignty organizing requires theoretical sophistication, methodological innovation, and commitment to movement-relevant research.</p>

<h3>Theoretical Frameworks for Movement Analysis</h3>

<h4>Gramscian Analysis:</h4>
<ul>
<li>Hegemony and counter-hegemony in food systems</li>
<li>Building food sovereignty as common sense</li>
<li>Organic intellectuals within peasant movements</li>
<li>War of position in food system transformation</li>
</ul>

<h4>Contentious Politics:</h4>
<ul>
<li>Repertoires of contention in food movements</li>
<li>Dynamics of contention: mechanisms and processes</li>
<li>Scale shift in transnational food activism</li>
<li>Certification and institutionalization</li>
</ul>

<h4>Postcolonial and Decolonial Approaches:</h4>
<ul>
<li>Colonial continuities in global food systems</li>
<li>Food sovereignty as decolonization</li>
<li>Indigenous food sovereignty and self-determination</li>
<li>Epistemic justice in food knowledge</li>
</ul>

<h3>Strategic Analysis Frameworks</h3>

<table>
<tr><th>Framework</th><th>Key Questions</th><th>Food Sovereignty Application</th></tr>
<tr><td>Power structure analysis</td><td>Who rules? How is rule maintained?</td><td>Corporate food regime analysis</td></tr>
<tr><td>Theory of change</td><td>How does change happen? What is our role?</td><td>Movement strategy development</td></tr>
<tr><td>Conjunctural analysis</td><td>What are conditions for change now?</td><td>Identifying political opportunities</td></tr>
<tr><td>Prefigurative politics</td><td>How do we build the future now?</td><td>Alternative food systems as strategy</td></tr>
</table>

<h3>Research Methodologies</h3>

<h4>Participatory Action Research:</h4>
<ul>
<li>Research as tool for movement learning and strategy</li>
<li>Community ownership of research process and outcomes</li>
<li>Integration of research with organizing</li>
<li>Challenges: time, resources, academic incentives</li>
</ul>

<h4>Global Ethnography:</h4>
<ul>
<li>Following movements across scales and sites</li>
<li>Connecting local struggles to global dynamics</li>
<li>Multi-sited fieldwork challenges</li>
</ul>

<h3>Emerging Questions</h3>

<ul>
<li>How do digital technologies reshape food sovereignty organizing?</li>
<li>What is the role of youth in food sovereignty movements?</li>
<li>How does climate crisis change movement strategy?</li>
<li>What are pathways from local alternatives to systemic change?</li>
<li>How do movements navigate contradiction between reform and transformation?</li>
</ul>

<h3>Contribution and Accountability</h3>

<p>Doctoral research in food sovereignty organizing requires:</p>
<ul>
<li>Theoretical contribution to academic debates</li>
<li>Practical utility for movement strategy</li>
<li>Methodological innovation in engaged scholarship</li>
<li>Accountability to movement partners and communities</li>
</ul>

<div class="key-concept">
<h4>Research as Praxis</h4>
<p>Doctoral research on food sovereignty organizing is itself a form of political practice. The choices about what to study, how to study it, and for whom shape both academic knowledge and movement capacity. The challenge is to navigate these tensions productively.</p>
</div>
</div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-intro-act-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Map Your Food Journey!',
          MIDDLE_SCHOOL: 'Sort Local vs Global Foods',
          HIGH_SCHOOL: 'Analyze Food Systems',
          UNDERGRADUATE: 'Policy Framework Analysis',
          GRADUATE: 'Case Study Comparison',
          PHD: 'Theoretical Framework Mapping'
        },
        description: {
          ELEMENTARY: 'Trace where your food comes from and find local alternatives!',
          MIDDLE_SCHOOL: 'Categorize foods by their origin and production method.',
          HIGH_SCHOOL: 'Compare industrial and sovereign food system characteristics.',
          UNDERGRADUATE: 'Analyze policies supporting or hindering food sovereignty.',
          GRADUATE: 'Compare food sovereignty implementations across regions.',
          PHD: 'Map theoretical frameworks to empirical case studies.'
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
      id: 'fs-intro-game',
      type: 'simulation',
      title: 'Food Sovereignty Builder',
      description: 'Build a food sovereign community by making strategic decisions!',
      rounds: 5,
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
      id: 'fs-intro-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fsq1',
          question: {
            ELEMENTARY: 'What does food sovereignty mean?',
            MIDDLE_SCHOOL: 'Which is a pillar of food sovereignty?',
            HIGH_SCHOOL: 'When was food sovereignty first introduced internationally?',
            UNDERGRADUATE: 'What does food sovereignty critique about comparative advantage?',
            GRADUATE: 'Which theoretical framework emphasizes gendered food production?',
            PHD: 'What Gramscian concept applies to food sovereignty movements?'
          },
          options: {
            ELEMENTARY: ['Communities decide what food to grow', 'Buying food from far away', 'Only eating fast food', 'Not growing any food'],
            MIDDLE_SCHOOL: ['Localizes Food Systems', 'Import Everything', 'Ignore Farmers', 'Only Profit Matters'],
            HIGH_SCHOOL: ['1996 at World Food Summit', '1776', '2020', '1850'],
            UNDERGRADUATE: ['Push for specialization over diversity', 'Support for local markets', 'Protection of small farms', 'Food quality standards'],
            GRADUATE: ['Feminist Political Ecology', 'Classical Economics', 'Rational Choice Theory', 'Behaviorism'],
            PHD: ['Counter-hegemony', 'Laissez-faire', 'Mercantilism', 'Monetarism']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Food sovereignty means communities get to decide what food they grow and eat!',
            MIDDLE_SCHOOL: 'Localizing food systems keeps food production close to where people live.',
            HIGH_SCHOOL: 'La Vía Campesina introduced food sovereignty at the 1996 World Food Summit.',
            UNDERGRADUATE: 'Food sovereignty critiques the push for countries to specialize rather than maintain diverse food production.',
            GRADUATE: 'Feminist Political Ecology analyzes the gendered dimensions of food production.',
            PHD: 'Gramscian counter-hegemony describes how movements challenge dominant ideologies.'
          }
        },
        {
          id: 'fsq2',
          question: {
            ELEMENTARY: 'In the story, what did Maria grow in her garden?',
            MIDDLE_SCHOOL: 'Where did the Nyéléni Declaration take place?',
            HIGH_SCHOOL: 'Which country first put food sovereignty in its constitution?',
            UNDERGRADUATE: 'Who authored "Stuffed and Starved" critiquing comparative advantage?',
            GRADUATE: 'What does "epistemicide" refer to in food systems?',
            PHD: 'Whose concept of "naturecultures" applies to seed sovereignty?'
          },
          options: {
            ELEMENTARY: ['Tomatoes', 'Candy', 'Toys', 'Books'],
            MIDDLE_SCHOOL: ['Mali', 'France', 'United States', 'Japan'],
            HIGH_SCHOOL: ['Ecuador', 'United States', 'China', 'Brazil'],
            UNDERGRADUATE: ['Raj Patel', 'Adam Smith', 'Karl Marx', 'John Keynes'],
            GRADUATE: ['Destruction of indigenous knowledge', 'Study of diseases', 'Economic analysis', 'Population growth'],
            PHD: ['Donna Haraway', 'Michel Foucault', 'Pierre Bourdieu', 'Max Weber']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Maria grew tomatoes in her garden and shared them with neighbors!',
            MIDDLE_SCHOOL: 'The 2007 Nyéléni Declaration was created in Mali, Africa.',
            HIGH_SCHOOL: 'Ecuador became the first country to include food sovereignty in its constitution in 2008.',
            UNDERGRADUATE: 'Raj Patel\'s "Stuffed and Starved" critiques how global food systems create both obesity and hunger.',
            GRADUATE: 'Epistemicide refers to the colonial destruction of indigenous agricultural knowledge systems.',
            PHD: 'Donna Haraway\'s concept of naturecultures helps understand seeds as both biological and cultural.'
          }
        },
        {
          id: 'fsq3',
          question: {
            ELEMENTARY: 'Why does food from community gardens taste better?',
            MIDDLE_SCHOOL: 'How many pillars of food sovereignty are there?',
            HIGH_SCHOOL: 'What organization introduced food sovereignty?',
            UNDERGRADUATE: 'What is the "corporate food regime"?',
            GRADUATE: 'What percentage of food do women produce in developing countries?',
            PHD: 'What does Escobar\'s "pluriverse" concept suggest about food sovereignty?'
          },
          options: {
            ELEMENTARY: ['It\'s fresh from the garden', 'It has more sugar', 'It\'s frozen', 'It comes from far away'],
            MIDDLE_SCHOOL: ['Seven', 'Three', 'Ten', 'Two'],
            HIGH_SCHOOL: ['La Vía Campesina', 'The United Nations', 'World Bank', 'McDonald\'s'],
            UNDERGRADUATE: ['Neoliberal agribusiness consolidation since 1980s', 'Small farmer cooperatives', 'Government food programs', 'Traditional farming'],
            GRADUATE: ['60-80%', '10-20%', '90-100%', '30-40%'],
            PHD: ['It enacts different worlds, not just different policies', 'It\'s purely economic', 'It\'s only about food production', 'It rejects all technology']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Fresh food from gardens tastes better because it was just picked!',
            MIDDLE_SCHOOL: 'The seven pillars cover food for people, valuing providers, localizing systems, local control, knowledge building, working with nature, and food as sacred.',
            HIGH_SCHOOL: 'La Vía Campesina, the international peasant movement, introduced food sovereignty in 1996.',
            UNDERGRADUATE: 'The corporate food regime describes how governments, corporations, and international institutions align around neoliberal agricultural policies.',
            GRADUATE: 'Women produce 60-80% of food in developing countries but own less than 2% of land.',
            PHD: 'Escobar argues food sovereignty performs alternative ontologies—different ways of composing worlds with food, land, and community.'
          }
        },
        {
          id: 'fsq4',
          question: {
            ELEMENTARY: 'What happens when neighbors grow food together?',
            MIDDLE_SCHOOL: 'What is one benefit of local food systems?',
            HIGH_SCHOOL: 'What is the difference between food security and food sovereignty?',
            UNDERGRADUATE: 'What did Karl Polanyi call land, labor, and food?',
            GRADUATE: 'What is "war of position" in Gramscian analysis?',
            PHD: 'What methodological shift does decolonial food research require?'
          },
          options: {
            ELEMENTARY: ['They become friends and share', 'They fight over vegetables', 'Nothing happens', 'They stay strangers'],
            MIDDLE_SCHOOL: ['Less pollution from transportation', 'More expensive food', 'Less variety', 'Longer shipping times'],
            HIGH_SCHOOL: ['Sovereignty focuses on control, security on access', 'They mean the same thing', 'Security is more comprehensive', 'Sovereignty is about imports'],
            UNDERGRADUATE: ['Fictitious commodities', 'Real commodities', 'Natural resources', 'Capital goods'],
            GRADUATE: ['Long-term building of alternative institutions', 'Military strategy', 'Economic policy', 'Electoral politics'],
            PHD: ['Research as collaborative knowledge production', 'Extractive data collection', 'Quantitative methods only', 'Avoiding movement engagement']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'When neighbors garden together, they become friends and share food with each other!',
            MIDDLE_SCHOOL: 'Local food systems reduce pollution because food doesn\'t have to travel as far.',
            HIGH_SCHOOL: 'Food sovereignty focuses on community control over food systems, while food security just measures if people have enough food.',
            UNDERGRADUATE: 'Polanyi argued land, labor, and food are "fictitious commodities" that cannot be treated purely as market goods.',
            GRADUATE: 'Gramsci\'s "war of position" describes the long-term building of alternative institutions and common sense.',
            PHD: 'Decolonial research shifts from extracting knowledge to collaborative production with movement actors.'
          }
        },
        {
          id: 'fsq5',
          question: {
            ELEMENTARY: 'According to La Vía Campesina, who should work together on food?',
            MIDDLE_SCHOOL: 'What is "food is sacred" pillar about?',
            HIGH_SCHOOL: 'What must Ecuador do under its food sovereignty constitution?',
            UNDERGRADUATE: 'How many farmers does La Vía Campesina represent globally?',
            GRADUATE: 'What is "passive revolution" risk for food sovereignty?',
            PHD: 'What are emerging frontiers in food sovereignty research?'
          },
          options: {
            ELEMENTARY: ['People who grow food and people who eat food', 'Only farmers', 'Only stores', 'Only governments'],
            MIDDLE_SCHOOL: ['Food connects us to culture, not just profit', 'Food should be expensive', 'Food is only for trading', 'Food is not important'],
            HIGH_SCHOOL: ['Protect biodiversity and ensure farmer access to land', 'Import all food', 'Ban all farming', 'Only grow one crop'],
            UNDERGRADUATE: ['Over 200 million', '1 million', '10 million', '50 million'],
            GRADUATE: ['Co-optation through "climate-smart agriculture"', 'Total revolution', 'Policy implementation', 'Academic research'],
            PHD: ['Digital, multispecies, climate, and urban food sovereignty', 'Only traditional farming', 'Purely economic analysis', 'Single-method research']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'La Vía Campesina says people who grow food and people who eat food should work together!',
            MIDDLE_SCHOOL: 'The "food is sacred" pillar means food connects us to culture and community—it\'s not just something to buy and sell.',
            HIGH_SCHOOL: 'Ecuador\'s constitution requires protecting biodiversity, traditional knowledge, and ensuring farmers have access to land, water, and seeds.',
            UNDERGRADUATE: 'La Vía Campesina represents over 200 million farmers across 81 countries worldwide.',
            GRADUATE: 'Passive revolution risk means food sovereignty ideas get co-opted into corporate-friendly frameworks like "sustainable intensification."',
            PHD: 'Emerging research frontiers include digital food sovereignty, multispecies approaches, climate adaptation, and urban contexts.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'La Via Campesina - International Peasant Movement', url: 'https://viacampesina.org/', type: 'research' },
      { title: 'US Food Sovereignty Alliance', url: 'https://usfoodsovereigntyalliance.org/', type: 'article' },
      { title: 'Nyéléni Declaration on Food Sovereignty', url: 'https://nyeleni.org/spip.php?article290', type: 'research' }
    ]
  },
  // Module 2: Community Gardens
  {
    id: 'food-sov-community-gardens',
    slug: 'community-gardens',
    title: 'Community Gardens',
    description: {
      ELEMENTARY: 'Discover the magic of gardens where neighbors grow food together!',
      MIDDLE_SCHOOL: 'Learn how community gardens bring people together and provide fresh food.',
      HIGH_SCHOOL: 'Explore the social, environmental, and health benefits of community gardening.',
      UNDERGRADUATE: 'Analyze community garden models, governance, and urban food security impacts.',
      GRADUATE: 'Examine community gardens as sites of food justice and urban transformation.',
      PHD: 'Research community garden effectiveness, scaling challenges, and policy integration.'
    },
    topic: 'food-sovereignty',
    category: 'URBAN AGRICULTURE',
    icon: 'Users',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-garden-1',
        title: 'Growing Together',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌻 Gardens for Everyone!</h2><p>A community garden is a special place where neighbors share land to grow vegetables, fruits, and flowers together!</p><h3>What Happens in Community Gardens?</h3><ul><li>🥬 People grow their own vegetables</li><li>👨‍👩‍👧‍👦 Families work together</li><li>🐝 Bees and butterflies visit</li><li>🤝 Neighbors become friends</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Community Garden Benefits</h2><h3>For People</h3><ul><li>Fresh, healthy food access</li><li>Physical activity and exercise</li><li>Mental health and stress relief</li><li>Social connections</li></ul><h3>For the Environment</h3><ul><li>Green spaces in cities</li><li>Habitat for pollinators</li><li>Reduced food transportation</li><li>Composting and recycling</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Community Garden Models</h2><h3>Types of Gardens</h3><ul><li><strong>Allotment:</strong> Individual plots for families</li><li><strong>Collective:</strong> Shared cultivation and harvest</li><li><strong>School:</strong> Educational focus for students</li><li><strong>Therapeutic:</strong> Healing and rehabilitation</li></ul><h3>Challenges</h3><p>Land tenure, water access, volunteer management, and equitable access.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Urban Food Security</h2><h3>Community Gardens and Food Access</h3><p>Research shows community gardens can significantly improve household food security, particularly in food deserts.</p><h3>Governance Models</h3><ul><li>Non-profit management</li><li>Municipal programs</li><li>Land trust models</li><li>Cooperative structures</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Food Justice in Urban Spaces</h2><h3>Critical Perspectives</h3><p>Community gardens can either reinforce or challenge existing inequalities depending on access, governance, and integration with broader movements.</p><h3>Gentrification Concerns</h3><p>Green amenities can increase property values and displace the communities they were meant to serve.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Measuring Impact</h3><ul><li>Food production quantification</li><li>Social capital metrics</li><li>Health outcome studies</li><li>Environmental services valuation</li></ul><h3>Policy Integration</h3><p>Integrating community gardens into comprehensive urban food system planning.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-garden-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Plan Your Garden Plot!',
          MIDDLE_SCHOOL: 'Design a Community Garden',
          HIGH_SCHOOL: 'Garden Management Simulation',
          UNDERGRADUATE: 'Governance Model Analysis',
          GRADUATE: 'Equity Assessment Tool',
          PHD: 'Impact Measurement Design'
        },
        description: {
          ELEMENTARY: 'Choose what vegetables to plant in your garden space!',
          MIDDLE_SCHOOL: 'Layout a community garden with different zones.',
          HIGH_SCHOOL: 'Manage resources, volunteers, and growing seasons.',
          UNDERGRADUATE: 'Compare different governance and funding models.',
          GRADUATE: 'Assess equity dimensions of garden access and benefits.',
          PHD: 'Design a comprehensive impact measurement framework.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 15 },
          GRADUATE: { complexity: 'expert', variables: 20 },
          PHD: { complexity: 'research', variables: 28 }
        }
      }
    ],
    game: {
      id: 'fs-garden-game',
      type: 'simulation',
      title: 'Community Garden Manager',
      description: 'Build and manage a thriving community garden!',
      rounds: 6,
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
      id: 'fs-garden-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fgq1',
          question: {
            ELEMENTARY: 'What do people do in community gardens?',
            MIDDLE_SCHOOL: 'What is a benefit of community gardens for the environment?',
            HIGH_SCHOOL: 'What is an allotment-style community garden?',
            UNDERGRADUATE: 'Which governance model gives long-term land security?',
            GRADUATE: 'What concern exists about gardens and gentrification?',
            PHD: 'What is challenging about measuring garden social impact?'
          },
          options: {
            ELEMENTARY: ['Grow food together with neighbors', 'Watch TV', 'Play video games', 'Sleep'],
            MIDDLE_SCHOOL: ['Provides habitat for pollinators', 'Creates more pollution', 'Uses more water', 'Increases traffic'],
            HIGH_SCHOOL: ['Individual plots for families', 'One big shared plot', 'Only flowers allowed', 'No rules at all'],
            UNDERGRADUATE: ['Community land trust', 'Annual lease', 'Informal agreement', 'No governance'],
            GRADUATE: ['Can increase property values and displacement', 'Always prevents gentrification', 'Has no effect on housing', 'Decreases neighborhood value'],
            PHD: ['Attributing outcomes to garden participation', 'Counting vegetables', 'Measuring plot size', 'Counting visitors']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Community gardens are places where neighbors grow food together!',
            MIDDLE_SCHOOL: 'Gardens provide flowers for bees and butterflies to visit.',
            HIGH_SCHOOL: 'Allotment gardens give individual families their own plot to manage.',
            UNDERGRADUATE: 'Community land trusts provide permanent protection for garden land.',
            GRADUATE: 'Green amenities can raise property values and potentially displace residents.',
            PHD: 'Isolating the effect of garden participation from other factors is methodologically challenging.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'American Community Gardening Association', url: 'https://www.communitygarden.org/', type: 'research' },
      { title: 'Community Garden Guide', url: 'https://www.nal.usda.gov/legacy/afsic/community-gardening', type: 'article' }
    ]
  },
  // Module 3: Seed Saving
  {
    id: 'food-sov-seed-saving',
    slug: 'seed-saving',
    title: 'Seed Saving',
    description: {
      ELEMENTARY: 'Learn how to save seeds from plants to grow more next year!',
      MIDDLE_SCHOOL: 'Discover the ancient art of seed saving and why it matters for our food future.',
      HIGH_SCHOOL: 'Explore seed saving techniques, genetic diversity, and seed sovereignty movements.',
      UNDERGRADUATE: 'Analyze seed systems, intellectual property issues, and farmer seed networks.',
      GRADUATE: 'Examine seed sovereignty as resistance to corporate seed control and GMO patents.',
      PHD: 'Research in-situ conservation, participatory plant breeding, and seed system resilience.'
    },
    topic: 'food-sovereignty',
    category: 'SEED SYSTEMS',
    icon: 'Flower',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-seed-1',
        title: 'Seeds are Treasures',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌱 Magical Seeds!</h2><p>Every plant starts as a tiny seed. When we save seeds, we can grow plants again and again!</p><h3>How to Save Seeds</h3><ol><li>Let the plant grow big and strong</li><li>Wait for seeds to form</li><li>Collect the dry seeds</li><li>Store them in a cool, dry place</li><li>Plant them next year!</li></ol></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>The Art of Seed Saving</h2><h3>Why Save Seeds?</h3><ul><li>Free seeds for next year</li><li>Plants adapt to your local conditions</li><li>Preserve rare varieties</li><li>Independence from seed companies</li></ul><h3>Easy Seeds to Save</h3><p>Tomatoes, peppers, beans, peas, and lettuce are great for beginners!</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Seed Science</h2><h3>Open-Pollinated vs Hybrid</h3><ul><li><strong>Open-pollinated:</strong> Seeds grow true to parent, can save</li><li><strong>Hybrid (F1):</strong> Seeds won't match parent, need to rebuy</li></ul><h3>Genetic Diversity</h3><p>Saving seeds from many plants maintains genetic diversity and resilience.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Seed Systems Analysis</h2><h3>Formal vs Informal Systems</h3><ul><li>Commercial seed industry</li><li>Farmer-saved seed networks</li><li>Community seed banks</li><li>Gene banks and ex-situ conservation</li></ul><h3>Intellectual Property</h3><p>Plant variety protection, patents, and their impact on farmer seed saving rights.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Seed Sovereignty</h2><h3>Corporate Concentration</h3><p>Four companies control over 60% of global seed sales, raising concerns about farmer autonomy and crop diversity.</p><h3>Resistance Movements</h3><p>Seed swaps, community seed libraries, and open-source seed initiatives challenge corporate control.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Participatory Plant Breeding</h3><p>Farmer-scientist collaborations developing locally adapted varieties.</p><h3>Seed System Resilience</h3><p>How diverse, decentralized seed systems withstand shocks better than centralized systems.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-seed-act-1',
        type: 'STEP_GUIDED',
        title: {
          ELEMENTARY: 'Save Tomato Seeds!',
          MIDDLE_SCHOOL: 'Seed Saving Guide',
          HIGH_SCHOOL: 'Isolation Distances',
          UNDERGRADUATE: 'Seed System Mapping',
          GRADUATE: 'Policy Analysis',
          PHD: 'Conservation Strategy'
        },
        description: {
          ELEMENTARY: 'Learn step-by-step how to save seeds from a tomato!',
          MIDDLE_SCHOOL: 'Follow guides for saving different types of seeds.',
          HIGH_SCHOOL: 'Calculate isolation distances to maintain variety purity.',
          UNDERGRADUATE: 'Map formal and informal seed sources in a region.',
          GRADUATE: 'Analyze policies affecting farmer seed saving rights.',
          PHD: 'Design an integrated seed conservation strategy.'
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
      id: 'fs-seed-game',
      type: 'matching',
      title: 'Seed Saver',
      description: 'Match seeds to plants and learn saving techniques!',
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
      id: 'fs-seed-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fseed1',
          question: {
            ELEMENTARY: 'What do seeds need to be stored properly?',
            MIDDLE_SCHOOL: 'Why is saving seeds important?',
            HIGH_SCHOOL: 'What is the difference between open-pollinated and hybrid seeds?',
            UNDERGRADUATE: 'What percentage of global seed sales do top 4 companies control?',
            GRADUATE: 'What is a community seed library?',
            PHD: 'What is participatory plant breeding?'
          },
          options: {
            ELEMENTARY: ['Cool and dry place', 'Hot and wet place', 'Bright sunlight', 'In water'],
            MIDDLE_SCHOOL: ['Preserves varieties and saves money', 'Takes too much time', 'Seeds go bad anyway', 'Not important'],
            HIGH_SCHOOL: ['OP seeds grow true, hybrids do not', 'They are the same', 'Hybrids are better', 'OP seeds are illegal'],
            UNDERGRADUATE: ['Over 60%', '10%', '25%', '90%'],
            GRADUATE: ['Place to borrow and share seeds', 'Commercial seed store', 'Gene bank', 'Seed factory'],
            PHD: ['Farmer-scientist collaboration for local varieties', 'Lab-only breeding', 'Corporate breeding', 'Random selection']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Seeds stay healthy longest when kept cool and dry!',
            MIDDLE_SCHOOL: 'Seed saving preserves plant varieties and gives farmers independence.',
            HIGH_SCHOOL: 'Open-pollinated seeds produce plants like their parents; hybrids do not.',
            UNDERGRADUATE: 'Just four companies control over 60% of the global commercial seed market.',
            GRADUATE: 'Seed libraries allow community members to borrow and return seeds.',
            PHD: 'PPB involves farmers and scientists collaborating to breed locally-adapted varieties.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Seed Savers Exchange', url: 'https://www.seedsavers.org/', type: 'research' },
      { title: 'Open Source Seed Initiative', url: 'https://osseeds.org/', type: 'article' }
    ]
  },
  // Module 4: Farmers Markets
  {
    id: 'food-sov-farmers-markets',
    slug: 'farmers-markets',
    title: 'Farmers Markets',
    description: {
      ELEMENTARY: 'Visit the farmers market where you can meet the people who grow your food!',
      MIDDLE_SCHOOL: 'Learn how farmers markets connect local farmers directly with communities.',
      HIGH_SCHOOL: 'Explore the economics, social benefits, and challenges of direct-to-consumer marketing.',
      UNDERGRADUATE: 'Analyze farmers market impacts on local food systems, farm viability, and food access.',
      GRADUATE: 'Examine farmers markets as alternative food networks challenging conventional distribution.',
      PHD: 'Research farmers market effectiveness, scaling limitations, and institutional embeddedness.'
    },
    topic: 'food-sovereignty',
    category: 'LOCAL MARKETS',
    icon: 'ShoppingBag',
    color: 'ocean',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 80, PHD: 105 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-market-1',
        title: 'Meet Your Farmer',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🧺 The Farmers Market!</h2><p>At a farmers market, you can buy food directly from the people who grew it!</p><h3>What You'll Find</h3><ul><li>🍅 Fresh vegetables and fruits</li><li>🥚 Farm fresh eggs</li><li>🍯 Local honey</li><li>🧀 Homemade cheese</li><li>🌸 Beautiful flowers</li></ul><h3>Why It's Special</h3><p>You can ask farmers how they grow their food!</p></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Direct Farm-to-Consumer</h2><h3>Benefits for Farmers</h3><ul><li>Keep more money (no middleman)</li><li>Direct customer feedback</li><li>Sell imperfect produce</li></ul><h3>Benefits for Shoppers</h3><ul><li>Fresher food (picked yesterday!)</li><li>Know where food comes from</li><li>Support local economy</li><li>Discover new varieties</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Farmers Market Economics</h2><h3>Value Chain Comparison</h3><p>Farmers typically receive 15-20% of retail price through conventional channels, but 80-100% at farmers markets.</p><h3>Challenges</h3><ul><li>Weather dependence</li><li>Time commitment for farmers</li><li>Limited operating hours</li><li>Price perception issues</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Market Impact Analysis</h2><h3>Economic Impacts</h3><ul><li>Local economic multiplier effects</li><li>Farm viability and diversification</li><li>Job creation in local food systems</li></ul><h3>Food Access</h3><p>SNAP/EBT acceptance and matching programs improve access for low-income shoppers.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Alternative Food Networks</h2><h3>Embeddedness Theory</h3><p>Farmers markets create social embeddedness that conventional markets lack.</p><h3>Critiques</h3><ul><li>Who has access?</li><li>Romanticization of small farms</li><li>Scalability limitations</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Research Questions</h2><h3>Measuring Impact</h3><ul><li>Attribution challenges</li><li>Spillover effects</li><li>Long-term farm viability</li></ul><h3>Institutional Analysis</h3><p>How markets become embedded in local food system infrastructure.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-market-act-1',
        type: 'SCENARIO',
        title: {
          ELEMENTARY: 'Shop at the Market!',
          MIDDLE_SCHOOL: 'Compare Prices',
          HIGH_SCHOOL: 'Market Economics',
          UNDERGRADUATE: 'Impact Assessment',
          GRADUATE: 'Access Analysis',
          PHD: 'Research Design'
        },
        description: {
          ELEMENTARY: 'Choose healthy foods from different vendors!',
          MIDDLE_SCHOOL: 'Compare farmers market prices to supermarket prices.',
          HIGH_SCHOOL: 'Calculate farmer revenue under different sales channels.',
          UNDERGRADUATE: 'Assess the economic impact of a farmers market.',
          GRADUATE: 'Analyze who benefits from and has access to farmers markets.',
          PHD: 'Design research to measure market effectiveness.'
        },
        config: {
          ELEMENTARY: { scenarios: 3, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { scenarios: 4, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { scenarios: 5, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { scenarios: 6, hints: false, timeLimit: 120 },
          GRADUATE: { scenarios: 7, hints: false, timeLimit: 90 },
          PHD: { scenarios: 8, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'fs-market-game',
      type: 'simulation',
      title: 'Market Manager',
      description: 'Run a successful farmers market!',
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
      id: 'fs-market-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fmq1',
          question: {
            ELEMENTARY: 'Who sells food at a farmers market?',
            MIDDLE_SCHOOL: 'Why do farmers earn more at farmers markets?',
            HIGH_SCHOOL: 'What percentage do farmers typically get through conventional channels?',
            UNDERGRADUATE: 'What programs help low-income shoppers at farmers markets?',
            GRADUATE: 'What does embeddedness mean in market contexts?',
            PHD: 'What is a key challenge in measuring farmers market impact?'
          },
          options: {
            ELEMENTARY: ['Farmers who grew the food', 'Robots', 'Strangers from far away', 'Nobody knows'],
            MIDDLE_SCHOOL: ['No middleman takes a cut', 'Markets charge more', 'Food is worse quality', 'Less work involved'],
            HIGH_SCHOOL: ['15-20%', '80-100%', '50%', '5%'],
            UNDERGRADUATE: ['SNAP/EBT matching programs', 'No programs exist', 'Only cash accepted', 'Credit cards only'],
            GRADUATE: ['Social relationships in economic exchange', 'Physical location only', 'Embedding ads', 'Underground markets'],
            PHD: ['Attribution of effects to market participation', 'Counting vendors', 'Measuring plot size', 'Counting customers']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Farmers sell the food they grew themselves at farmers markets!',
            MIDDLE_SCHOOL: 'Selling directly means no middlemen take a portion of the price.',
            HIGH_SCHOOL: 'Farmers typically receive only 15-20% of retail price through conventional supply chains.',
            UNDERGRADUATE: 'SNAP/EBT matching programs double purchasing power for low-income shoppers.',
            GRADUATE: 'Embeddedness refers to how economic transactions are shaped by social relationships.',
            PHD: 'Isolating the specific impact of market participation from other factors is methodologically challenging.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Farmers Market Coalition', url: 'https://farmersmarketcoalition.org/', type: 'research' },
      { title: 'USDA Farmers Markets', url: 'https://www.ams.usda.gov/local-food-directories/farmersmarkets', type: 'tool' }
    ]
  },
  // Module 5: Food Preservation
  {
    id: 'food-sov-preservation',
    slug: 'food-preservation',
    title: 'Food Preservation',
    description: {
      ELEMENTARY: 'Learn how to make food last longer so nothing goes to waste!',
      MIDDLE_SCHOOL: 'Discover traditional methods for preserving fruits, vegetables, and more.',
      HIGH_SCHOOL: 'Explore the science of food preservation including canning, fermenting, and drying.',
      UNDERGRADUATE: 'Analyze preservation methods, food safety, and role in food security.',
      GRADUATE: 'Examine preservation as cultural practice, food sovereignty tool, and business opportunity.',
      PHD: 'Research preservation efficacy, traditional knowledge documentation, and innovation.'
    },
    topic: 'food-sovereignty',
    category: 'PRESERVATION',
    icon: 'Archive',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-preserve-1',
        title: 'Making Food Last',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🥫 Keep Food Fresh!</h2><p>Long ago, people learned to save food for winter. We can do it too!</p><h3>Ways to Preserve Food</h3><ul><li>🧊 Freezing - makes food super cold</li><li>☀️ Drying - removes all the water</li><li>🥒 Pickling - uses vinegar</li><li>🍯 Jamming - adds lots of sugar</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Preservation Methods</h2><h3>How They Work</h3><ul><li><strong>Freezing:</strong> Stops bacteria by cold</li><li><strong>Drying:</strong> Removes water bacteria need</li><li><strong>Canning:</strong> Heat kills bacteria, seal keeps them out</li><li><strong>Fermenting:</strong> Good bacteria crowd out bad</li><li><strong>Salting:</strong> Salt draws out water</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Food Preservation Science</h2><h3>Factors Affecting Spoilage</h3><ul><li>Water activity (aw)</li><li>pH level</li><li>Temperature</li><li>Oxygen availability</li></ul><h3>Safety Considerations</h3><p>Botulism risk in improper canning; follow tested recipes.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Preservation Systems</h2><h3>Food Security Role</h3><p>Preservation extends seasonal abundance through lean months, critical for food sovereignty.</p><h3>Commercial vs Home Scale</h3><ul><li>Equipment and technique differences</li><li>Regulatory requirements</li><li>Value-added opportunities</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Cultural and Economic Dimensions</h2><h3>Traditional Knowledge</h3><p>Preservation methods carry cultural meaning and connect generations.</p><h3>Economic Opportunity</h3><p>Value-added processing can improve farm viability and market access.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Traditional Method Documentation</h3><p>Recording and validating traditional preservation techniques.</p><h3>Innovation</h3><p>Combining traditional methods with modern food safety science.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-preserve-act-1',
        type: 'STEP_GUIDED',
        title: {
          ELEMENTARY: 'Make Sun-Dried Tomatoes!',
          MIDDLE_SCHOOL: 'Pickle Vegetables',
          HIGH_SCHOOL: 'Safe Canning Practice',
          UNDERGRADUATE: 'Preservation Planning',
          GRADUATE: 'Value Chain Analysis',
          PHD: 'Method Validation'
        },
        description: {
          ELEMENTARY: 'Learn to dry tomatoes in the sun!',
          MIDDLE_SCHOOL: 'Follow steps to pickle cucumbers safely.',
          HIGH_SCHOOL: 'Practice safe water bath canning techniques.',
          UNDERGRADUATE: 'Plan preservation for a seasonal harvest.',
          GRADUATE: 'Analyze value addition through preservation.',
          PHD: 'Design validation study for traditional method.'
        },
        config: {
          ELEMENTARY: { steps: 4, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { steps: 6, hints: true, timeLimit: 180 },
          HIGH_SCHOOL: { steps: 8, hints: false, timeLimit: 150 },
          UNDERGRADUATE: { steps: 10, hints: false, timeLimit: 180 },
          GRADUATE: { steps: 12, hints: false, timeLimit: 120 },
          PHD: { steps: 15, hints: false, timeLimit: 90 }
        }
      }
    ],
    game: {
      id: 'fs-preserve-game',
      type: 'sorting',
      title: 'Preservation Pro',
      description: 'Match foods to the best preservation methods!',
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
      id: 'fs-preserve-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fpq1',
          question: {
            ELEMENTARY: 'What does drying food do?',
            MIDDLE_SCHOOL: 'How does fermenting preserve food?',
            HIGH_SCHOOL: 'What is the main safety risk in home canning?',
            UNDERGRADUATE: 'How does preservation support food sovereignty?',
            GRADUATE: 'Why is traditional preservation knowledge valuable?',
            PHD: 'What challenge exists in validating traditional methods?'
          },
          options: {
            ELEMENTARY: ['Removes water so it lasts longer', 'Makes it wet', 'Adds sugar', 'Freezes it'],
            MIDDLE_SCHOOL: ['Good bacteria crowd out bad bacteria', 'Heat kills everything', 'It does not preserve', 'Magic'],
            HIGH_SCHOOL: ['Botulism from improper canning', 'Too much flavor', 'Food gets too dry', 'Colors change'],
            UNDERGRADUATE: ['Extends seasonal abundance year-round', 'Increases imports', 'Reduces local production', 'Only helps corporations'],
            GRADUATE: ['Carries cultural meaning and proven efficacy', 'Has no modern relevance', 'Is always unsafe', 'Cannot be documented'],
            PHD: ['Standardizing without losing traditional character', 'Too simple to study', 'No funding available', 'Already fully documented']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Removing water keeps bacteria from growing so food lasts longer!',
            MIDDLE_SCHOOL: 'Beneficial bacteria in fermentation outcompete harmful bacteria.',
            HIGH_SCHOOL: 'Clostridium botulinum can grow in improperly canned low-acid foods.',
            UNDERGRADUATE: 'Preservation allows communities to store local abundance for year-round food security.',
            GRADUATE: 'Traditional knowledge represents generations of practical experimentation and cultural heritage.',
            PHD: 'Standardizing methods for food safety while preserving traditional characteristics is complex.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'NCHFP Home Food Preservation', url: 'https://nchfp.uga.edu/', type: 'research' },
      { title: 'Ball Canning', url: 'https://www.freshpreserving.com/', type: 'article' }
    ]
  },
  // Module 6: Urban Farming
  {
    id: 'food-sov-urban-farming',
    slug: 'urban-farming',
    title: 'Urban Farming',
    description: {
      ELEMENTARY: 'Grow food in the city - even on rooftops and balconies!',
      MIDDLE_SCHOOL: 'Learn how cities can produce their own food in surprising places.',
      HIGH_SCHOOL: 'Explore urban agriculture techniques, vertical farming, and city food systems.',
      UNDERGRADUATE: 'Analyze urban farm economics, policy support, and integration with city planning.',
      GRADUATE: 'Examine urban agriculture as food justice strategy and community development tool.',
      PHD: 'Research urban farm productivity, environmental services, and policy effectiveness.'
    },
    topic: 'food-sovereignty',
    category: 'URBAN AGRICULTURE',
    icon: 'Building2',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [{ id: 'fs-urban-1', title: 'City Farms', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Farms in the City!</h2><p>You can grow food anywhere - rooftops, balconies, even old parking lots!</p>', MIDDLE_SCHOOL: '<h2>Urban Agriculture</h2><p>Cities are finding creative spaces for food production: vacant lots, rooftops, vertical farms.</p>', HIGH_SCHOOL: '<h2>Urban Farming Methods</h2><p>Container gardening, rooftop farms, vertical farms, aquaponics, and community gardens transform cities.</p>', UNDERGRADUATE: '<h2>Urban Farm Economics</h2><p>Land costs, labor, market access, and policy support shape urban farm viability.</p>', GRADUATE: '<h2>Food Justice Applications</h2><p>Urban farms address food deserts, provide jobs, and build community resilience.</p>', PHD: '<h2>Research Questions</h2><p>Productivity optimization, environmental benefits, and policy evaluation methods.</p>' } }],
    activities: [{ id: 'fs-urban-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design a Rooftop Garden!', MIDDLE_SCHOOL: 'Plan an Urban Farm', HIGH_SCHOOL: 'Site Assessment', UNDERGRADUATE: 'Business Planning', GRADUATE: 'Impact Assessment', PHD: 'Research Design' }, description: { ELEMENTARY: 'Create a garden on top of a building!', MIDDLE_SCHOOL: 'Plan how to transform an empty lot into a farm.', HIGH_SCHOOL: 'Assess a site for urban farming potential.', UNDERGRADUATE: 'Develop a business plan for an urban farm.', GRADUATE: 'Assess community impacts of urban farming.', PHD: 'Design research on urban agriculture.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 15 }, GRADUATE: { complexity: 'expert', variables: 20 }, PHD: { complexity: 'research', variables: 28 } } }],
    game: { id: 'fs-urban-game', type: 'simulation', title: 'City Farmer', description: 'Build and manage an urban farm!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-urban-quiz', passingScore: 80, questions: [{ id: 'fuq1', question: { ELEMENTARY: 'Where can you grow food in a city?', MIDDLE_SCHOOL: 'What is vertical farming?', HIGH_SCHOOL: 'What challenge do urban farms face?', UNDERGRADUATE: 'What policy supports urban farming?', GRADUATE: 'How do urban farms address food deserts?', PHD: 'What is a key research gap in urban agriculture?' }, options: { ELEMENTARY: ['Rooftops, balconies, empty lots', 'Only in the country', 'Nowhere', 'Underground'], MIDDLE_SCHOOL: ['Growing food in stacked layers', 'Farming on hills', 'Mountain farming', 'Deep farming'], HIGH_SCHOOL: ['Land costs and access', 'Too much rain', 'Too much space', 'No challenges'], UNDERGRADUATE: ['Zoning changes and incentives', 'No policy support exists', 'Only federal programs', 'Banning farming'], GRADUATE: ['Providing local fresh food access', 'Making food more expensive', 'Reducing jobs', 'Increasing transportation'], PHD: ['Long-term productivity data', 'How to plant seeds', 'Basic farming', 'Soil color'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Cities have lots of spaces for growing food - rooftops, balconies, and empty lots!', MIDDLE_SCHOOL: 'Vertical farming grows food in stacked layers, often indoors with LED lights.', HIGH_SCHOOL: 'Urban farms face high land costs and competition for space.', UNDERGRADUATE: 'Zoning changes and incentives help urban farms get started and stay viable.', GRADUATE: 'Urban farms bring fresh, affordable produce to neighborhoods lacking grocery stores.', PHD: 'Long-term data on urban farm productivity and sustainability is limited.' } }] },
    externalResources: [{ title: 'Urban Farming Institute', url: 'https://urbanfarminginstitute.org/', type: 'research' }]
  },
  // Module 7: Food Cooperatives
  {
    id: 'food-sov-cooperatives',
    slug: 'food-cooperatives',
    title: 'Food Cooperatives',
    description: {
      ELEMENTARY: 'Learn about stores owned by the community!',
      MIDDLE_SCHOOL: 'Discover how food co-ops work and why people start them.',
      HIGH_SCHOOL: 'Explore cooperative business models, governance, and community benefits.',
      UNDERGRADUATE: 'Analyze co-op economics, membership structures, and market positioning.',
      GRADUATE: 'Examine cooperatives as alternative food system institutions and movement building.',
      PHD: 'Research cooperative effectiveness, scale challenges, and systemic change potential.'
    },
    topic: 'food-sovereignty',
    category: 'COOPERATIVES',
    icon: 'Users',
    color: 'ocean',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 80, PHD: 105 },
    isMasterclass: false,
    lessons: [{ id: 'fs-coop-1', title: 'People-Owned Stores', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Our Store!</h2><p>A co-op is a store owned by the people who shop there!</p>', MIDDLE_SCHOOL: '<h2>What is a Food Co-op?</h2><p>Members own the store together, share decisions, and often get discounts.</p>', HIGH_SCHOOL: '<h2>Cooperative Principles</h2><p>Open membership, democratic control, member economic participation, autonomy, education, cooperation, community concern.</p>', UNDERGRADUATE: '<h2>Co-op Business Models</h2><p>Consumer, producer, and worker cooperatives each serve different needs.</p>', GRADUATE: '<h2>Co-ops as Alternatives</h2><p>Cooperatives challenge corporate food retail and build community power.</p>', PHD: '<h2>Research Questions</h2><p>Scale vs values, competitive positioning, and systemic impact.</p>' } }],
    activities: [{ id: 'fs-coop-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Start a Co-op!', MIDDLE_SCHOOL: 'Member Meeting', HIGH_SCHOOL: 'Governance Design', UNDERGRADUATE: 'Business Analysis', GRADUATE: 'Movement Building', PHD: 'Impact Research' }, description: { ELEMENTARY: 'Imagine starting a store with your neighbors!', MIDDLE_SCHOOL: 'Practice making decisions together as co-op members.', HIGH_SCHOOL: 'Design governance for a food cooperative.', UNDERGRADUATE: 'Analyze co-op business model viability.', GRADUATE: 'Explore how co-ops build food movement power.', PHD: 'Design research on cooperative impact.' }, config: { ELEMENTARY: { scenarios: 3, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 4, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 5, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 6, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 7, hints: false, timeLimit: 90 }, PHD: { scenarios: 8, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-coop-game', type: 'simulation', title: 'Co-op Manager', description: 'Run a successful food cooperative!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-coop-quiz', passingScore: 80, questions: [{ id: 'fcq1', question: { ELEMENTARY: 'Who owns a food co-op?', MIDDLE_SCHOOL: 'How do co-op members make decisions?', HIGH_SCHOOL: 'What is one cooperative principle?', UNDERGRADUATE: 'What is a consumer cooperative?', GRADUATE: 'How do co-ops challenge corporate food?', PHD: 'What tension exists as co-ops grow?' }, options: { ELEMENTARY: ['The members who shop there', 'One rich person', 'The government', 'Nobody'], MIDDLE_SCHOOL: ['Democratically - each member gets a vote', 'The manager decides everything', 'Random selection', 'No decisions needed'], HIGH_SCHOOL: ['Democratic member control', 'Maximum profit', 'Owner control', 'Government control'], UNDERGRADUATE: ['Owned by the customers who shop there', 'Owned by investors', 'Owned by workers only', 'Owned by suppliers'], GRADUATE: ['Community ownership vs corporate profit', 'They support corporations', 'No challenge', 'Same as regular stores'], PHD: ['Maintaining values while scaling', 'Too many customers', 'Too much profit', 'No tensions exist'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Food co-ops are owned by the members - the people who shop there!', MIDDLE_SCHOOL: 'In a co-op, each member gets one vote, regardless of how much they buy.', HIGH_SCHOOL: 'Democratic member control means members make decisions together.', UNDERGRADUATE: 'Consumer cooperatives are owned by and serve their customer-members.', GRADUATE: 'Co-ops offer community-controlled alternatives to profit-driven corporate retailers.', PHD: 'Growing co-ops often struggle to maintain democratic values and mission focus.' } }] },
    externalResources: [{ title: 'National Co-op Grocers', url: 'https://www.ncg.coop/', type: 'research' }]
  },
  // Module 8: Indigenous Food Systems
  {
    id: 'food-sov-indigenous',
    slug: 'indigenous-food-systems',
    title: 'Indigenous Food Systems',
    description: {
      ELEMENTARY: 'Learn about traditional foods and farming from indigenous peoples!',
      MIDDLE_SCHOOL: 'Discover how indigenous communities have grown food for thousands of years.',
      HIGH_SCHOOL: 'Explore traditional ecological knowledge, heritage crops, and food sovereignty movements.',
      UNDERGRADUATE: 'Analyze indigenous food systems, colonization impacts, and revitalization efforts.',
      GRADUATE: 'Examine indigenous food sovereignty as decolonization and self-determination.',
      PHD: 'Research traditional knowledge systems, co-management, and indigenous research methodologies.'
    },
    topic: 'food-sovereignty',
    category: 'INDIGENOUS SYSTEMS',
    icon: 'Leaf',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [{ id: 'fs-indig-1', title: 'Traditional Ways', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Ancient Wisdom!</h2><p>Indigenous peoples have grown food in harmony with nature for thousands of years.</p>', MIDDLE_SCHOOL: '<h2>Traditional Knowledge</h2><p>The Three Sisters (corn, beans, squash) is one example of indigenous agricultural genius.</p>', HIGH_SCHOOL: '<h2>Indigenous Food Sovereignty</h2><p>Reclaiming traditional foods, seeds, and land is central to indigenous self-determination.</p>', UNDERGRADUATE: '<h2>Colonization Impacts</h2><p>Food system disruption was a tool of colonization. Revitalization restores health and culture.</p>', GRADUATE: '<h2>Decolonizing Food</h2><p>Indigenous food sovereignty challenges colonial food systems and asserts self-determination.</p>', PHD: '<h2>Research Ethics</h2><p>Indigenous research methodologies center community benefit and sovereignty.</p>' } }],
    activities: [{ id: 'fs-indig-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Three Sisters Garden!', MIDDLE_SCHOOL: 'Traditional Foods', HIGH_SCHOOL: 'Heritage Seeds', UNDERGRADUATE: 'System Analysis', GRADUATE: 'Sovereignty Framework', PHD: 'Ethical Research' }, description: { ELEMENTARY: 'Plant corn, beans, and squash together!', MIDDLE_SCHOOL: 'Match traditional foods to their origins.', HIGH_SCHOOL: 'Explore heritage seed varieties and their significance.', UNDERGRADUATE: 'Analyze indigenous food system disruption and revitalization.', GRADUATE: 'Apply indigenous food sovereignty frameworks.', PHD: 'Design community-centered research.' }, config: { ELEMENTARY: { items: 6, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 8, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 }, GRADUATE: { items: 18, hints: false, timeLimit: 90 }, PHD: { items: 22, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-indig-game', type: 'matching', title: 'Traditional Knowledge', description: 'Learn about indigenous food traditions!', rounds: 5, timeLimit: 35, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-indig-quiz', passingScore: 80, questions: [{ id: 'fiq1', question: { ELEMENTARY: 'What are the Three Sisters?', MIDDLE_SCHOOL: 'How do the Three Sisters help each other?', HIGH_SCHOOL: 'What is traditional ecological knowledge?', UNDERGRADUATE: 'How did colonization affect indigenous food systems?', GRADUATE: 'What does indigenous food sovereignty assert?', PHD: 'What is CBPR in indigenous research?' }, options: { ELEMENTARY: ['Corn, beans, and squash', 'Three actual sisters', 'Three rivers', 'Three mountains'], MIDDLE_SCHOOL: ['Corn supports beans, beans add nitrogen, squash shades soil', 'They do not help each other', 'They fight for space', 'They are planted separately'], HIGH_SCHOOL: ['Knowledge passed down about living with nature', 'Only book learning', 'Modern science only', 'No such thing'], UNDERGRADUATE: ['Disrupted food access, seeds, and practices', 'Improved everything', 'No impact', 'Only positive changes'], GRADUATE: ['Self-determination over food systems', 'Government control', 'Corporate ownership', 'Individual choice only'], PHD: ['Community-Based Participatory Research', 'Corporate Business Planning Research', 'Centralized Based Processing Research', 'None of these'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The Three Sisters are corn, beans, and squash - planted together!', MIDDLE_SCHOOL: 'Corn gives beans a pole to climb, beans add nitrogen, squash leaves shade soil and prevent weeds.', HIGH_SCHOOL: 'Traditional ecological knowledge is wisdom about ecosystems passed down through generations.', UNDERGRADUATE: 'Colonization systematically disrupted indigenous food access, seed sovereignty, and traditional practices.', GRADUATE: 'Indigenous food sovereignty asserts the right to define and control food systems.', PHD: 'CBPR (Community-Based Participatory Research) centers community needs and governance.' } }] },
    externalResources: [{ title: 'First Nations Development Institute', url: 'https://www.firstnations.org/', type: 'research' }]
  },
  // Module 9: Agroecology
  {
    id: 'food-sov-agroecology',
    slug: 'agroecology',
    title: 'Agroecology',
    description: {
      ELEMENTARY: 'Learn how farms can work like nature!',
      MIDDLE_SCHOOL: 'Discover farming that copies nature\'s patterns and systems.',
      HIGH_SCHOOL: 'Explore agroecological principles, practices, and transitions.',
      UNDERGRADUATE: 'Analyze agroecology as science, practice, and social movement.',
      GRADUATE: 'Examine agroecology in policy, research, and food system transformation.',
      PHD: 'Research agroecological transitions, metrics, and political ecology.'
    },
    topic: 'food-sovereignty',
    category: 'AGROECOLOGY',
    icon: 'TreePine',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [{ id: 'fs-agro-1', title: 'Farming Like Nature', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Nature\'s Farm!</h2><p>In nature, plants and animals help each other. Agroecology copies this!</p>', MIDDLE_SCHOOL: '<h2>What is Agroecology?</h2><p>Farming that uses ecological principles - diversity, natural pest control, healthy soil.</p>', HIGH_SCHOOL: '<h2>Agroecological Principles</h2><p>Enhance biodiversity, recycle nutrients, build soil, integrate crops and animals, reduce external inputs.</p>', UNDERGRADUATE: '<h2>Three Faces of Agroecology</h2><p>Scientific discipline, set of practices, and social movement for food system change.</p>', GRADUATE: '<h2>Agroecology in Policy</h2><p>FAO, IAASTD, and civil society promote agroecology for sustainable food systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Transition pathways, territorial approaches, and political economy of agroecology.</p>' } }],
    activities: [{ id: 'fs-agro-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design an Eco-Farm!', MIDDLE_SCHOOL: 'Natural Pest Control', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Transition Planning', GRADUATE: 'Policy Analysis', PHD: 'Research Methods' }, description: { ELEMENTARY: 'Create a farm where plants help each other!', MIDDLE_SCHOOL: 'Use beneficial insects instead of pesticides.', HIGH_SCHOOL: 'Design an agroecological farm system.', UNDERGRADUATE: 'Plan a farm transition to agroecology.', GRADUATE: 'Analyze policies supporting agroecology.', PHD: 'Design participatory agroecology research.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 15 }, GRADUATE: { complexity: 'expert', variables: 20 }, PHD: { complexity: 'research', variables: 28 } } }],
    game: { id: 'fs-agro-game', type: 'simulation', title: 'Agroecology Farmer', description: 'Build a farm that works with nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-agro-quiz', passingScore: 80, questions: [{ id: 'faq1', question: { ELEMENTARY: 'What does agroecology copy?', MIDDLE_SCHOOL: 'How does agroecology control pests?', HIGH_SCHOOL: 'What is one agroecological principle?', UNDERGRADUATE: 'What are the three faces of agroecology?', GRADUATE: 'What international body promotes agroecology?', PHD: 'What is a territorial approach to agroecology?' }, options: { ELEMENTARY: ['Nature\'s patterns', 'Factories', 'Cities', 'Nothing'], MIDDLE_SCHOOL: ['Beneficial insects and diversity', 'More pesticides', 'Ignoring pests', 'Removing all insects'], HIGH_SCHOOL: ['Enhance biodiversity', 'Maximize monoculture', 'Use more chemicals', 'Remove all animals'], UNDERGRADUATE: ['Science, practice, and social movement', 'Only science', 'Only farming', 'Only politics'], GRADUATE: ['FAO', 'WTO', 'IMF', 'World Bank only'], PHD: ['Landscape-scale coordinated transitions', 'Individual farm only', 'Single crop focus', 'Export orientation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Agroecology copies nature\'s patterns - how plants and animals help each other!', MIDDLE_SCHOOL: 'Agroecology uses beneficial insects, habitat diversity, and natural predators.', HIGH_SCHOOL: 'Enhancing biodiversity is a core agroecological principle.', UNDERGRADUATE: 'Agroecology encompasses scientific research, farming practices, and social movements.', GRADUATE: 'The FAO (UN Food and Agriculture Organization) has adopted agroecology.', PHD: 'Territorial approaches coordinate agroecological transitions across landscapes.' } }] },
    externalResources: [{ title: 'Agroecology Fund', url: 'https://www.agroecologyfund.org/', type: 'research' }]
  },
  // Module 10: Food Justice
  {
    id: 'food-sov-food-justice',
    slug: 'food-justice',
    title: 'Food Justice',
    description: {
      ELEMENTARY: 'Learn why everyone deserves good food!',
      MIDDLE_SCHOOL: 'Discover why some neighborhoods lack access to healthy food.',
      HIGH_SCHOOL: 'Explore food deserts, food access inequities, and community solutions.',
      UNDERGRADUATE: 'Analyze structural racism in food systems and food justice movements.',
      GRADUATE: 'Examine food justice frameworks, organizing strategies, and policy change.',
      PHD: 'Research food justice outcomes, intersectionality, and transformative approaches.'
    },
    topic: 'food-sovereignty',
    category: 'FOOD JUSTICE',
    icon: 'Scale',
    color: 'terra',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 80, PHD: 105 },
    isMasterclass: false,
    lessons: [{ id: 'fs-justice-1', title: 'Fair Food for All', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Food for Everyone!</h2><p>Everyone deserves healthy, tasty food - but not everyone can get it easily.</p>', MIDDLE_SCHOOL: '<h2>What is a Food Desert?</h2><p>Areas where fresh, healthy food is hard to find - often low-income neighborhoods.</p>', HIGH_SCHOOL: '<h2>Food Access Inequities</h2><p>Grocery store locations, transportation, income, and racism all affect food access.</p>', UNDERGRADUATE: '<h2>Structural Racism</h2><p>Redlining, disinvestment, and discrimination created many food deserts.</p>', GRADUATE: '<h2>Food Justice Movement</h2><p>Community-led organizing for equitable, sustainable, local food systems.</p>', PHD: '<h2>Research Approaches</h2><p>Participatory methods, intersectionality, and measuring justice outcomes.</p>' } }],
    activities: [{ id: 'fs-justice-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Find the Food!', MIDDLE_SCHOOL: 'Map Food Access', HIGH_SCHOOL: 'Identify Barriers', UNDERGRADUATE: 'Analyze Causes', GRADUATE: 'Organizing Strategy', PHD: 'Justice Metrics' }, description: { ELEMENTARY: 'Help families find healthy food in their neighborhood!', MIDDLE_SCHOOL: 'Map where food is easy and hard to get.', HIGH_SCHOOL: 'Identify barriers to food access in a community.', UNDERGRADUATE: 'Analyze structural causes of food inequity.', GRADUATE: 'Develop a food justice organizing strategy.', PHD: 'Design food justice outcome measurement.' }, config: { ELEMENTARY: { scenarios: 3, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 4, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 5, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 6, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 7, hints: false, timeLimit: 90 }, PHD: { scenarios: 8, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-justice-game', type: 'simulation', title: 'Food Justice Hero', description: 'Help communities get fair food access!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-justice-quiz', passingScore: 80, questions: [{ id: 'fjq1', question: { ELEMENTARY: 'What does everyone deserve?', MIDDLE_SCHOOL: 'What is a food desert?', HIGH_SCHOOL: 'What affects food access?', UNDERGRADUATE: 'What created many food deserts?', GRADUATE: 'What is food justice organizing?', PHD: 'What is intersectionality in food justice?' }, options: { ELEMENTARY: ['Access to healthy food', 'Only fast food', 'No food', 'Expensive food'], MIDDLE_SCHOOL: ['An area with little access to healthy food', 'An actual desert', 'A food museum', 'A food festival'], HIGH_SCHOOL: ['Store locations, transportation, income, racism', 'Only personal choice', 'Weather only', 'Nothing affects it'], UNDERGRADUATE: ['Redlining, disinvestment, discrimination', 'Natural processes', 'Random chance', 'Personal choices only'], GRADUATE: ['Community-led work for equitable food systems', 'Corporate campaigns', 'Government only', 'Individual action only'], PHD: ['How multiple identities affect food access', 'Single factor analysis', 'No identity factors', 'Only income matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Everyone deserves access to healthy, affordable, culturally appropriate food!', MIDDLE_SCHOOL: 'Food deserts are areas - often low-income - with little access to healthy food.', HIGH_SCHOOL: 'Food access is shaped by store locations, transportation, income, and systemic racism.', UNDERGRADUATE: 'Historical redlining and disinvestment created many of today\'s food deserts.', GRADUATE: 'Food justice organizing builds community power for equitable, sustainable food systems.', PHD: 'Intersectionality examines how race, class, gender, and other factors combine to affect food access.' } }] },
    externalResources: [{ title: 'Food Research & Action Center', url: 'https://frac.org/', type: 'research' }]
  },
  // Module 11: Local Food Systems
  {
    id: 'food-sov-local-systems',
    slug: 'local-food-systems',
    title: 'Local Food Systems',
    description: {
      ELEMENTARY: 'Learn why eating food grown nearby is good for everyone!',
      MIDDLE_SCHOOL: 'Discover how local food connects farmers and communities.',
      HIGH_SCHOOL: 'Explore local food infrastructure, economics, and community benefits.',
      UNDERGRADUATE: 'Analyze food miles, local food policy, and regional food networks.',
      GRADUATE: 'Examine food system localization, food hubs, and economic multipliers.',
      PHD: 'Research local food system resilience, supply chain optimization, and policy.'
    },
    topic: 'food-sovereignty',
    category: 'LOCAL FOOD',
    icon: 'MapPin',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-local-1', title: 'Food From Close By', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Nearby Food!</h2><p>Food that grows near you is fresher and helps local farmers!</p>', MIDDLE_SCHOOL: '<h2>Local Food Benefits</h2><p>Fresher food, less transportation, support for local farmers, and community connections.</p>', HIGH_SCHOOL: '<h2>Local Food Infrastructure</h2><p>Farm-to-school, food hubs, CSAs, and regional distribution connect local producers to consumers.</p>', UNDERGRADUATE: '<h2>Food System Economics</h2><p>Local multipliers, food miles limitations, and balancing local with global trade.</p>', GRADUATE: '<h2>Food Hubs</h2><p>Aggregation and distribution facilities help small farms reach larger markets.</p>', PHD: '<h2>Research Frontiers</h2><p>Measuring local food system impacts, optimization, and resilience assessment.</p>' } }],
    activities: [{ id: 'fs-local-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Shop Local!', MIDDLE_SCHOOL: 'Build a Food Network', HIGH_SCHOOL: 'Map Your Foodshed', UNDERGRADUATE: 'Economic Analysis', GRADUATE: 'Hub Design', PHD: 'Resilience Modeling' }, description: { ELEMENTARY: 'Find local food in your community!', MIDDLE_SCHOOL: 'Connect farms with people who need food.', HIGH_SCHOOL: 'Map local food sources in your region.', UNDERGRADUATE: 'Analyze local food economic impacts.', GRADUATE: 'Design a regional food hub.', PHD: 'Model local food system resilience.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-local-game', type: 'simulation', title: 'Local Food Builder', description: 'Build strong local food networks!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-local-quiz', passingScore: 80, questions: [{ id: 'flq1', question: { ELEMENTARY: 'Why is local food good?', MIDDLE_SCHOOL: 'What is a CSA?', HIGH_SCHOOL: 'What is a food hub?', UNDERGRADUATE: 'What is the local multiplier effect?', GRADUATE: 'What services do food hubs provide?', PHD: 'What limits food miles as a metric?' }, options: { ELEMENTARY: ['It is fresher and helps local farmers', 'It is always cheaper', 'It comes in packages', 'It lasts longer'], MIDDLE_SCHOOL: ['Community Supported Agriculture - buying farm shares', 'Cheap Store Available', 'Central Supply Area', 'A type of crop'], HIGH_SCHOOL: ['A facility that aggregates and distributes local food', 'A grocery store', 'A restaurant', 'A food truck'], UNDERGRADUATE: ['Money spent locally recirculates in the community', 'Money always leaves', 'No economic impact', 'Only benefits farmers'], GRADUATE: ['Aggregation, storage, distribution, marketing', 'Only selling food', 'Only storage', 'Only trucking'], PHD: ['Does not capture full environmental or social impact', 'Perfectly captures impact', 'Too comprehensive', 'Always accurate'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Local food is fresher and your money helps farmers in your community!', MIDDLE_SCHOOL: 'A CSA (Community Supported Agriculture) lets you buy a share of a farm\'s harvest.', HIGH_SCHOOL: 'Food hubs aggregate products from many farms to reach larger markets efficiently.', UNDERGRADUATE: 'Local multipliers mean dollars spent locally circulate 2-3 times in the community.', GRADUATE: 'Food hubs provide aggregation, storage, processing, distribution, and marketing services.', PHD: 'Food miles oversimplify - local is not always better when full lifecycle is considered.' } }] },
    externalResources: [{ title: 'USDA Local Food', url: 'https://www.usda.gov/topics/food-and-nutrition/food-security', type: 'research' }]
  },
  // Module 12: School Gardens
  {
    id: 'food-sov-school-gardens',
    slug: 'school-gardens',
    title: 'School Gardens',
    description: {
      ELEMENTARY: 'Learn how to grow food at school!',
      MIDDLE_SCHOOL: 'Discover the benefits of school garden programs.',
      HIGH_SCHOOL: 'Explore garden-based learning and curriculum integration.',
      UNDERGRADUATE: 'Analyze school garden outcomes, best practices, and sustainability.',
      GRADUATE: 'Examine school garden policy, scaling strategies, and evaluation.',
      PHD: 'Research school garden impacts on health, learning, and food systems.'
    },
    topic: 'food-sovereignty',
    category: 'EDUCATION',
    icon: 'School',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-school-1', title: 'Gardens at School', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>School Garden Fun!</h2><p>Growing food at school helps you learn about plants, eat healthy, and have fun outside!</p>', MIDDLE_SCHOOL: '<h2>School Garden Benefits</h2><p>Learn science, eat fresh vegetables, work together, and connect with nature.</p>', HIGH_SCHOOL: '<h2>Garden-Based Learning</h2><p>Gardens integrate science, math, nutrition, and environmental education.</p>', UNDERGRADUATE: '<h2>Program Design</h2><p>Curriculum integration, volunteer coordination, funding, and sustainability planning.</p>', GRADUATE: '<h2>Scaling Gardens</h2><p>District-wide programs, policy support, and long-term sustainability strategies.</p>', PHD: '<h2>Research Frontiers</h2><p>Measuring garden impacts on dietary behavior, learning outcomes, and food system awareness.</p>' } }],
    activities: [{ id: 'fs-school-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Garden!', MIDDLE_SCHOOL: 'Plan Your Garden', HIGH_SCHOOL: 'Curriculum Design', UNDERGRADUATE: 'Program Planning', GRADUATE: 'Scale Analysis', PHD: 'Outcome Evaluation' }, description: { ELEMENTARY: 'Design a school garden!', MIDDLE_SCHOOL: 'Plan what to grow in your school garden.', HIGH_SCHOOL: 'Design garden-based lessons.', UNDERGRADUATE: 'Plan a sustainable school garden program.', GRADUATE: 'Analyze scaling school gardens district-wide.', PHD: 'Design school garden outcome evaluation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-school-game', type: 'simulation', title: 'School Garden Planner', description: 'Build an amazing school garden!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-school-quiz', passingScore: 80, questions: [{ id: 'fsgq1', question: { ELEMENTARY: 'What can you learn in a school garden?', MIDDLE_SCHOOL: 'What subjects can gardens teach?', HIGH_SCHOOL: 'What is garden-based learning?', UNDERGRADUATE: 'What is key to garden sustainability?', GRADUATE: 'What supports scaling school gardens?', PHD: 'What is hard to measure about garden impacts?' }, options: { ELEMENTARY: ['Where food comes from and how plants grow', 'Nothing', 'Only sports', 'Only reading'], MIDDLE_SCHOOL: ['Science, math, nutrition, environment', 'Only art', 'Only PE', 'Nothing'], HIGH_SCHOOL: ['Using gardens to teach across subjects', 'Only growing food', 'Indoor learning only', 'No education involved'], UNDERGRADUATE: ['Dedicated coordinator and funding plan', 'Just enthusiasm', 'Only volunteers', 'No planning needed'], GRADUATE: ['Policy support and district commitment', 'Individual teachers only', 'No support needed', 'Funding alone'], PHD: ['Long-term dietary behavior change', 'Short-term knowledge', 'Garden size', 'Number of plants'] }, correctIndex: 0, explanation: { ELEMENTARY: 'School gardens teach where food comes from and how plants grow!', MIDDLE_SCHOOL: 'Gardens can teach science, math, nutrition, environmental studies, and more.', HIGH_SCHOOL: 'Garden-based learning uses gardens as hands-on teaching tools across the curriculum.', UNDERGRADUATE: 'A dedicated coordinator and sustainable funding are key to garden program longevity.', GRADUATE: 'District policies and long-term commitment help scale school gardens successfully.', PHD: 'Measuring whether gardens create lasting changes in eating habits is methodologically challenging.' } }] },
    externalResources: [{ title: 'School Garden Support', url: 'https://www.nifa.usda.gov/', type: 'research' }]
  },
  // Module 13: Urban Agriculture Policy
  {
    id: 'food-sov-urban-policy',
    slug: 'urban-agriculture-policy',
    title: 'Urban Agriculture Policy',
    description: {
      ELEMENTARY: 'Learn how cities can help people grow food!',
      MIDDLE_SCHOOL: 'Discover rules that help or stop urban farming.',
      HIGH_SCHOOL: 'Explore zoning, land access, and urban agriculture regulations.',
      UNDERGRADUATE: 'Analyze urban agriculture policy tools, barriers, and best practices.',
      GRADUATE: 'Examine comprehensive urban food policies and governance structures.',
      PHD: 'Research policy effectiveness, urban food planning, and governance innovation.'
    },
    topic: 'food-sovereignty',
    category: 'POLICY',
    icon: 'Building2',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-urban-pol-1', title: 'Rules for Growing', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Cities Can Help!</h2><p>Cities can make rules that help people grow food in yards, lots, and rooftops!</p>', MIDDLE_SCHOOL: '<h2>Urban Farming Rules</h2><p>Zoning laws, permits, and land access affect where and how people can farm in cities.</p>', HIGH_SCHOOL: '<h2>Policy Barriers</h2><p>Zoning restrictions, land tenure, water access, and regulations can limit urban agriculture.</p>', UNDERGRADUATE: '<h2>Policy Tools</h2><p>Zoning reforms, urban agriculture ordinances, land trusts, and incentive programs.</p>', GRADUATE: '<h2>Food Policy Councils</h2><p>Multi-stakeholder bodies advising on comprehensive urban food policy.</p>', PHD: '<h2>Research Frontiers</h2><p>Policy effectiveness evaluation, governance models, and urban food system planning.</p>' } }],
    activities: [{ id: 'fs-urban-pol-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Help the City Garden!', MIDDLE_SCHOOL: 'Fix the Rules', HIGH_SCHOOL: 'Policy Analysis', UNDERGRADUATE: 'Draft an Ordinance', GRADUATE: 'Council Design', PHD: 'Policy Evaluation' }, description: { ELEMENTARY: 'Help make rules that let people grow food!', MIDDLE_SCHOOL: 'Identify rules that help and hurt urban farms.', HIGH_SCHOOL: 'Analyze urban agriculture policy in a city.', UNDERGRADUATE: 'Draft an urban agriculture ordinance.', GRADUATE: 'Design a food policy council.', PHD: 'Evaluate urban ag policy effectiveness.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-urban-pol-game', type: 'simulation', title: 'Policy Planner', description: 'Create policies that help urban farms thrive!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-urban-pol-quiz', passingScore: 80, questions: [{ id: 'fupq1', question: { ELEMENTARY: 'How can cities help urban farmers?', MIDDLE_SCHOOL: 'What is zoning?', HIGH_SCHOOL: 'What is a common policy barrier to urban farming?', UNDERGRADUATE: 'What is a land trust?', GRADUATE: 'What is a food policy council?', PHD: 'What is challenging about evaluating urban ag policy?' }, options: { ELEMENTARY: ['Make rules that allow growing food', 'Ban all farming', 'Ignore food', 'Only allow stores'], MIDDLE_SCHOOL: ['Rules about what can be built where', 'A type of garden', 'A farming tool', 'A plant zone'], HIGH_SCHOOL: ['Zoning that prohibits agriculture in residential areas', 'Too much support', 'Free land everywhere', 'No barriers exist'], UNDERGRADUATE: ['Organization that holds land for community benefit', 'A bank', 'A real estate company', 'A farm'], GRADUATE: ['Multi-stakeholder body advising on food policy', 'A restaurant group', 'A grocery chain', 'A farm cooperative'], PHD: ['Attribution and long-term outcome measurement', 'Too simple', 'Perfect data available', 'No challenges'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Cities can make rules that allow people to grow food in different places!', MIDDLE_SCHOOL: 'Zoning laws regulate what activities are allowed in different areas of a city.', HIGH_SCHOOL: 'Many zoning codes prohibit agriculture in residential zones, limiting urban farming.', UNDERGRADUATE: 'Land trusts are nonprofits that hold land in trust for community purposes, ensuring long-term access.', GRADUATE: 'Food policy councils bring together diverse stakeholders to advise on comprehensive food policy.', PHD: 'Attributing outcomes to specific policies and measuring long-term impacts is methodologically difficult.' } }] },
    externalResources: [{ title: 'Food Policy Networks', url: 'https://www.foodpolicynetworks.org/', type: 'research' }]
  },
  // Module 14: Food Processing and Preservation
  {
    id: 'food-sov-processing',
    slug: 'food-processing-preservation',
    title: 'Food Processing and Preservation',
    description: {
      ELEMENTARY: 'Learn how to keep food fresh longer!',
      MIDDLE_SCHOOL: 'Discover ways to preserve food at home and in communities.',
      HIGH_SCHOOL: 'Explore canning, drying, fermenting, and food safety.',
      UNDERGRADUATE: 'Analyze local food processing, shared-use kitchens, and value-added products.',
      GRADUATE: 'Examine food processing policy, food safety regulations, and infrastructure.',
      PHD: 'Research local processing economics, food safety systems, and innovation.'
    },
    topic: 'food-sovereignty',
    category: 'PROCESSING',
    icon: 'Factory',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-process-1', title: 'Making Food Last', order: 1, duration: 15, hasActivity: true, activityType: 'STEP_GUIDED', content: { ELEMENTARY: '<h2>Food That Lasts!</h2><p>Drying, freezing, and canning help food stay good for a long time!</p>', MIDDLE_SCHOOL: '<h2>Preservation Methods</h2><p>Canning, freezing, drying, fermenting, and pickling extend food life safely.</p>', HIGH_SCHOOL: '<h2>Food Safety</h2><p>Proper preservation prevents spoilage and foodborne illness. Follow tested recipes!</p>', UNDERGRADUATE: '<h2>Value-Added Processing</h2><p>Turning raw products into jams, sauces, or dried goods adds value for farmers.</p>', GRADUATE: '<h2>Processing Infrastructure</h2><p>Shared-use kitchens, mobile processing, and co-packers serve local food systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Local processing economics, food safety innovation, and scale-appropriate technology.</p>' } }],
    activities: [{ id: 'fs-process-act-1', type: 'STEP_GUIDED', title: { ELEMENTARY: 'Dry Some Fruit!', MIDDLE_SCHOOL: 'Try Preservation Methods', HIGH_SCHOOL: 'Food Safety Challenge', UNDERGRADUATE: 'Value-Added Planning', GRADUATE: 'Infrastructure Analysis', PHD: 'Economics Modeling' }, description: { ELEMENTARY: 'Learn how to dry fruit to make it last!', MIDDLE_SCHOOL: 'Compare different food preservation methods.', HIGH_SCHOOL: 'Identify food safety best practices.', UNDERGRADUATE: 'Plan a value-added product line for a farm.', GRADUATE: 'Analyze shared-use kitchen feasibility.', PHD: 'Model local processing economic impacts.' }, config: { ELEMENTARY: { steps: 5, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { steps: 7, hints: true, timeLimit: 180 }, HIGH_SCHOOL: { steps: 9, hints: false, timeLimit: 150 }, UNDERGRADUATE: { steps: 12, hints: false, timeLimit: 180 }, GRADUATE: { steps: 15, hints: false, timeLimit: 120 }, PHD: { steps: 18, hints: false, timeLimit: 90 } } }],
    game: { id: 'fs-process-game', type: 'puzzle', title: 'Preservation Pro', description: 'Master food preservation techniques!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-process-quiz', passingScore: 80, questions: [{ id: 'fprq1', question: { ELEMENTARY: 'What is one way to make food last longer?', MIDDLE_SCHOOL: 'What does fermentation do?', HIGH_SCHOOL: 'Why use tested canning recipes?', UNDERGRADUATE: 'What is a value-added product?', GRADUATE: 'What is a shared-use kitchen?', PHD: 'What is a key challenge for local processing?' }, options: { ELEMENTARY: ['Drying it', 'Leaving it outside', 'Putting it in water', 'Nothing'], MIDDLE_SCHOOL: ['Uses good bacteria to preserve food', 'Heats food very hot', 'Freezes food', 'Wastes food'], HIGH_SCHOOL: ['To prevent foodborne illness from improper preservation', 'To save money', 'No reason', 'Only for taste'], UNDERGRADUATE: ['Processed product that sells for more than raw', 'Cheaper product', 'Unprocessed food', 'Only fresh items'], GRADUATE: ['Licensed facility for multiple producers to use', 'A home kitchen', 'A restaurant', 'A grocery store'], PHD: ['Economies of scale vs. local benefits', 'Too easy', 'No challenges', 'Always profitable'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Drying removes water so food stays good much longer!', MIDDLE_SCHOOL: 'Fermentation uses beneficial bacteria to preserve food and add flavor.', HIGH_SCHOOL: 'Tested recipes ensure proper acidity and processing to prevent dangerous bacteria.', UNDERGRADUATE: 'Value-added products (jams, sauces) sell for more than raw produce, increasing farm income.', GRADUATE: 'Shared-use kitchens are licensed facilities that multiple small producers can use affordably.', PHD: 'Balancing economies of scale in processing with local system benefits is economically challenging.' } }] },
    externalResources: [{ title: 'National Center for Home Food Preservation', url: 'https://nchfp.uga.edu/', type: 'research' }]
  },
  // Module 15: Traditional Food Knowledge
  {
    id: 'food-sov-traditional',
    slug: 'traditional-food-knowledge',
    title: 'Traditional Food Knowledge',
    description: {
      ELEMENTARY: 'Learn about foods and recipes passed down through families!',
      MIDDLE_SCHOOL: 'Discover traditional foods and cooking from different cultures.',
      HIGH_SCHOOL: 'Explore the importance of preserving traditional food knowledge.',
      UNDERGRADUATE: 'Analyze traditional ecological knowledge, food heritage, and cultural preservation.',
      GRADUATE: 'Examine intellectual property, biocultural heritage, and decolonizing food systems.',
      PHD: 'Research traditional knowledge systems, food sovereignty, and cultural resilience.'
    },
    topic: 'food-sovereignty',
    category: 'CULTURE',
    icon: 'Book',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-trad-1', title: 'Food from Our Ancestors', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Family Recipes!</h2><p>Grandparents and great-grandparents passed down special ways of growing and cooking food.</p>', MIDDLE_SCHOOL: '<h2>Cultural Food Traditions</h2><p>Every culture has special foods, recipes, and growing methods passed through generations.</p>', HIGH_SCHOOL: '<h2>Preserving Food Heritage</h2><p>Traditional food knowledge is disappearing. Documenting and practicing it keeps it alive.</p>', UNDERGRADUATE: '<h2>Traditional Ecological Knowledge</h2><p>TEK includes farming methods, seed saving, and land management refined over centuries.</p>', GRADUATE: '<h2>Decolonizing Food</h2><p>Reclaiming indigenous food systems and traditional practices as food sovereignty.</p>', PHD: '<h2>Research Ethics</h2><p>Participatory methods, intellectual property rights, and respectful engagement with traditional knowledge.</p>' } }],
    activities: [{ id: 'fs-trad-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Share a Recipe!', MIDDLE_SCHOOL: 'Explore Traditions', HIGH_SCHOOL: 'Document Knowledge', UNDERGRADUATE: 'TEK Analysis', GRADUATE: 'Community Research', PHD: 'Ethical Framework' }, description: { ELEMENTARY: 'Share a special recipe from your family!', MIDDLE_SCHOOL: 'Explore food traditions from different cultures.', HIGH_SCHOOL: 'Document traditional food knowledge.', UNDERGRADUATE: 'Analyze traditional ecological knowledge.', GRADUATE: 'Design community-based food research.', PHD: 'Develop ethical framework for TEK research.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-trad-game', type: 'puzzle', title: 'Tradition Keeper', description: 'Preserve and share traditional food knowledge!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-trad-quiz', passingScore: 80, questions: [{ id: 'ftq1', question: { ELEMENTARY: 'Who teaches us traditional foods?', MIDDLE_SCHOOL: 'What is passed down through generations?', HIGH_SCHOOL: 'Why preserve traditional food knowledge?', UNDERGRADUATE: 'What is TEK?', GRADUATE: 'What is decolonizing food systems?', PHD: 'What is a key ethics issue in TEK research?' }, options: { ELEMENTARY: ['Grandparents and elders', 'Strangers', 'Nobody', 'Television only'], MIDDLE_SCHOOL: ['Recipes, growing methods, and food traditions', 'Nothing', 'Only money', 'Only clothes'], HIGH_SCHOOL: ['It contains valuable knowledge that could be lost', 'It has no value', 'Everything is online', 'Old ways are bad'], UNDERGRADUATE: ['Traditional Ecological Knowledge', 'Technical Education Knowledge', 'Temporary Expert Knowledge', 'Total Environment Knowledge'], GRADUATE: ['Reclaiming indigenous food practices and sovereignty', 'Colonizing more land', 'Only modern methods', 'Ignoring tradition'], PHD: ['Intellectual property and community consent', 'No ethics needed', 'Take all knowledge freely', 'Researchers own all'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Grandparents and elders teach us special foods and recipes from long ago!', MIDDLE_SCHOOL: 'Food traditions including recipes, growing methods, and cultural practices pass through generations.', HIGH_SCHOOL: 'Traditional knowledge contains sustainable practices and cultural heritage that could be lost.', UNDERGRADUATE: 'TEK (Traditional Ecological Knowledge) encompasses indigenous and local knowledge of the environment.', GRADUATE: 'Decolonizing food means reclaiming indigenous food systems and practices as part of food sovereignty.', PHD: 'Respecting intellectual property rights and obtaining proper community consent are key ethical issues.' } }] },
    externalResources: [{ title: 'First Nations Development Institute', url: 'https://www.firstnations.org/', type: 'research' }]
  },
  // Module 16: Food Waste Reduction
  {
    id: 'food-sov-waste',
    slug: 'food-waste-reduction',
    title: 'Food Waste Reduction',
    description: {
      ELEMENTARY: 'Learn why wasting food hurts the planet and how to stop it!',
      MIDDLE_SCHOOL: 'Discover where food waste happens and how to reduce it.',
      HIGH_SCHOOL: 'Explore food waste across the supply chain and solutions.',
      UNDERGRADUATE: 'Analyze food loss and waste measurement, causes, and interventions.',
      GRADUATE: 'Examine food waste policy, redistribution systems, and behavior change.',
      PHD: 'Research food waste quantification, systems interventions, and circular food systems.'
    },
    topic: 'food-sovereignty',
    category: 'WASTE',
    icon: 'Trash2',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-waste-1', title: 'Stop Food Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Dont Waste Food!</h2><p>When we throw food away, we waste all the work that grew it. Eat what you take!</p>', MIDDLE_SCHOOL: '<h2>Where Food is Wasted</h2><p>Food is wasted on farms, in stores, in restaurants, and in homes. About 1/3 of food is wasted!</p>', HIGH_SCHOOL: '<h2>Supply Chain Waste</h2><p>Losses occur at harvest, storage, processing, retail, and consumption. Different solutions for each stage.</p>', UNDERGRADUATE: '<h2>Measurement Challenges</h2><p>Defining and measuring food loss vs. waste. Data gaps and estimation methods.</p>', GRADUATE: '<h2>Policy Approaches</h2><p>Date labeling reform, liability protection for donations, targets, and reporting requirements.</p>', PHD: '<h2>Research Frontiers</h2><p>Causal pathway analysis, intervention effectiveness, and circular food system design.</p>' } }],
    activities: [{ id: 'fs-waste-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Food!', MIDDLE_SCHOOL: 'Waste Audit', HIGH_SCHOOL: 'Supply Chain Analysis', UNDERGRADUATE: 'Measurement Design', GRADUATE: 'Policy Analysis', PHD: 'System Intervention' }, description: { ELEMENTARY: 'Help save food from being wasted!', MIDDLE_SCHOOL: 'Audit where food is wasted.', HIGH_SCHOOL: 'Analyze waste in the food supply chain.', UNDERGRADUATE: 'Design food waste measurement system.', GRADUATE: 'Analyze food waste policy options.', PHD: 'Design systemic food waste intervention.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-waste-game', type: 'simulation', title: 'Waste Warrior', description: 'Stop food waste at every stage!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-waste-quiz', passingScore: 80, questions: [{ id: 'fwasq1', question: { ELEMENTARY: 'What should we do with food?', MIDDLE_SCHOOL: 'How much food is wasted globally?', HIGH_SCHOOL: 'Where does most household food waste occur?', UNDERGRADUATE: 'What is the difference between loss and waste?', GRADUATE: 'What is date label confusion?', PHD: 'What is a food waste intervention pathway?' }, options: { ELEMENTARY: ['Eat it, dont throw it away', 'Throw it all away', 'Hide it', 'Give it to bugs'], MIDDLE_SCHOOL: ['About one-third', 'Almost none', 'All of it', 'Half'], HIGH_SCHOOL: ['Fruits, vegetables, and leftovers', 'Canned goods', 'Frozen items', 'Dried foods'], UNDERGRADUATE: ['Loss is pre-retail, waste is retail and consumer', 'Same thing', 'Loss is larger', 'Waste is at farm'], GRADUATE: ['Confusing best by vs. expires dates leading to unnecessary disposal', 'Perfect labeling', 'No labels', 'Only numbers'], PHD: ['Causal chain from driver to behavior to outcome', 'Random actions', 'Single solution', 'No pathways exist'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We should eat the food we take and not throw away good food!', MIDDLE_SCHOOL: 'About one-third of all food produced globally is lost or wasted.', HIGH_SCHOOL: 'Fresh produce and leftovers are the largest categories of household food waste.', UNDERGRADUATE: 'Food loss occurs before retail (farm to processor), while food waste is at retail and consumer levels.', GRADUATE: 'Consumers often discard safe food due to confusion between quality dates and safety dates.', PHD: 'Intervention pathways trace causal chains from waste drivers through behaviors to reduction outcomes.' } }] },
    externalResources: [{ title: 'ReFED', url: 'https://refed.org/', type: 'research' }]
  },
  // Module 17: Indigenous Food Systems
  {
    id: 'food-sov-indigenous',
    slug: 'indigenous-food-systems',
    title: 'Indigenous Food Systems',
    description: {
      ELEMENTARY: 'Learn about native plants and foods from the first people!',
      MIDDLE_SCHOOL: 'Discover how indigenous peoples grew and gathered food sustainably.',
      HIGH_SCHOOL: 'Explore indigenous food sovereignty and traditional food practices.',
      UNDERGRADUATE: 'Analyze indigenous food systems, land rights, and food sovereignty movements.',
      GRADUATE: 'Examine indigenous food policy, treaty rights, and revitalization efforts.',
      PHD: 'Research indigenous food sovereignty, decolonization, and Two-Eyed Seeing approaches.'
    },
    topic: 'food-sovereignty',
    category: 'INDIGENOUS',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-indig-1', title: 'First Foods', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Food from the Land!</h2><p>Indigenous peoples have grown and gathered food from the land for thousands of years with special knowledge.</p>', MIDDLE_SCHOOL: '<h2>Traditional Food Ways</h2><p>Hunting, fishing, gathering, and farming practices developed over generations sustain communities.</p>', HIGH_SCHOOL: '<h2>Indigenous Food Sovereignty</h2><p>The right of indigenous peoples to define and control their own food systems.</p>', UNDERGRADUATE: '<h2>Land and Food</h2><p>Connection between land rights, treaty rights, and access to traditional foods.</p>', GRADUATE: '<h2>Food Revitalization</h2><p>Movements to restore traditional food systems as health and cultural interventions.</p>', PHD: '<h2>Research Methods</h2><p>Two-Eyed Seeing, community-based participatory research, and indigenous methodologies.</p>' } }],
    activities: [{ id: 'fs-indig-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Learn from Elders', MIDDLE_SCHOOL: 'Traditional Foods', HIGH_SCHOOL: 'Food Rights', UNDERGRADUATE: 'Land Analysis', GRADUATE: 'Revitalization Plan', PHD: 'Research Design' }, description: { ELEMENTARY: 'Learn about traditional foods from the land!', MIDDLE_SCHOOL: 'Explore traditional food gathering practices.', HIGH_SCHOOL: 'Analyze indigenous food sovereignty.', UNDERGRADUATE: 'Analyze land and food access issues.', GRADUATE: 'Plan a food revitalization program.', PHD: 'Design indigenous food research ethically.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-indig-game', type: 'puzzle', title: 'First Foods Journey', description: 'Learn about traditional indigenous food systems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-indig-quiz', passingScore: 80, questions: [{ id: 'findq1', question: { ELEMENTARY: 'How long have indigenous peoples grown food?', MIDDLE_SCHOOL: 'What are traditional food ways?', HIGH_SCHOOL: 'What is indigenous food sovereignty?', UNDERGRADUATE: 'How does land access affect food sovereignty?', GRADUATE: 'What is food revitalization?', PHD: 'What is Two-Eyed Seeing?' }, options: { ELEMENTARY: ['Thousands of years', 'Just recently', 'Never', 'Only 100 years'], MIDDLE_SCHOOL: ['Practices passed down through generations', 'Modern farming only', 'Store-bought food', 'Fast food'], HIGH_SCHOOL: ['Indigenous peoples right to control their food systems', 'Government food programs', 'Only farming', 'No control'], UNDERGRADUATE: ['Land loss means loss of traditional food access', 'No connection', 'Land doesnt matter', 'Only money matters'], GRADUATE: ['Restoring traditional food systems and practices', 'Stopping all tradition', 'Only new foods', 'Food destruction'], PHD: ['Integrating indigenous and Western knowledge', 'Only Western science', 'Rejecting all knowledge', 'Random approach'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Indigenous peoples have been growing and gathering food from the land for thousands of years!', MIDDLE_SCHOOL: 'Traditional food ways include hunting, fishing, gathering, and farming knowledge passed through generations.', HIGH_SCHOOL: 'Indigenous food sovereignty is the right of indigenous peoples to define and control their own food systems.', UNDERGRADUATE: 'Loss of traditional lands directly impacts access to traditional foods and food sovereignty.', GRADUATE: 'Food revitalization restores traditional food systems as health, cultural, and sovereignty interventions.', PHD: 'Two-Eyed Seeing respects both indigenous and Western knowledge systems together.' } }] },
    externalResources: [{ title: 'Indigenous Food Systems', url: 'https://www.firstnations.org/knowledge-center/food-sovereignty/', type: 'research' }]
  },
  // Module 18: Climate-Resilient Agriculture
  {
    id: 'food-sov-climate',
    slug: 'climate-resilient-agriculture',
    title: 'Climate-Resilient Agriculture',
    description: {
      ELEMENTARY: 'Learn how farmers can grow food even when weather changes!',
      MIDDLE_SCHOOL: 'Discover farming practices that handle floods, droughts, and heat.',
      HIGH_SCHOOL: 'Explore climate adaptation strategies for agriculture.',
      UNDERGRADUATE: 'Analyze climate risks, adaptation options, and resilience building.',
      GRADUATE: 'Examine climate-smart agriculture policy, finance, and implementation.',
      PHD: 'Research climate modeling, adaptation pathways, and transformation.'
    },
    topic: 'food-sovereignty',
    category: 'CLIMATE',
    icon: 'CloudRain',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-clim-1', title: 'Farming with Change', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Weather is Changing!</h2><p>Farmers are learning new ways to grow food when it gets too hot, too dry, or too wet.</p>', MIDDLE_SCHOOL: '<h2>Climate Challenges</h2><p>More droughts, floods, heat waves, and new pests threaten food production. Farmers must adapt.</p>', HIGH_SCHOOL: '<h2>Adaptation Strategies</h2><p>Drought-resistant varieties, water harvesting, diversification, and adjusted planting dates help.</p>', UNDERGRADUATE: '<h2>Climate Risk Assessment</h2><p>Vulnerability mapping, scenario planning, and cost-benefit analysis of adaptation options.</p>', GRADUATE: '<h2>Climate-Smart Agriculture</h2><p>Triple win: productivity, adaptation, and mitigation. Policy frameworks and finance.</p>', PHD: '<h2>Research Frontiers</h2><p>Transformative adaptation, limits to adaptation, and decision making under uncertainty.</p>' } }],
    activities: [{ id: 'fs-clim-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Help Farmers Adapt!', MIDDLE_SCHOOL: 'Weather Challenges', HIGH_SCHOOL: 'Adaptation Planning', UNDERGRADUATE: 'Risk Assessment', GRADUATE: 'Policy Design', PHD: 'Transformation Analysis' }, description: { ELEMENTARY: 'Help farmers grow food in changing weather!', MIDDLE_SCHOOL: 'Choose strategies for weather challenges.', HIGH_SCHOOL: 'Plan farm adaptation to climate change.', UNDERGRADUATE: 'Assess climate risks for a farming region.', GRADUATE: 'Design climate-smart agriculture policy.', PHD: 'Analyze transformative adaptation pathways.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-clim-game', type: 'simulation', title: 'Climate Farmer', description: 'Adapt farming to changing weather!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-clim-quiz', passingScore: 80, questions: [{ id: 'fclimq1', question: { ELEMENTARY: 'What are farmers learning to do?', MIDDLE_SCHOOL: 'What climate challenges do farmers face?', HIGH_SCHOOL: 'What is drought-resistant variety?', UNDERGRADUATE: 'What is vulnerability mapping?', GRADUATE: 'What is climate-smart agriculture?', PHD: 'What is transformative adaptation?' }, options: { ELEMENTARY: ['Grow food in changing weather', 'Stop farming', 'Ignore weather', 'Only farm indoors'], MIDDLE_SCHOOL: ['Droughts, floods, and heat waves', 'Perfect weather always', 'No challenges', 'Only cold'], HIGH_SCHOOL: ['A crop that survives with less water', 'A dry crop', 'A dead plant', 'A wet crop'], UNDERGRADUATE: ['Mapping areas most at risk from climate', 'Random mapping', 'No maps needed', 'Only city maps'], GRADUATE: ['Agriculture that improves productivity, adaptation, and mitigation', 'Only yields', 'Only profit', 'Only weather'], PHD: ['Fundamental change in food systems rather than incremental', 'Small changes only', 'No change', 'Reversing change'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Farmers are learning new ways to grow food even when weather gets difficult!', MIDDLE_SCHOOL: 'Climate change brings more droughts, floods, heat waves, and new pests to farming.', HIGH_SCHOOL: 'Drought-resistant crop varieties can survive and produce with less water.', UNDERGRADUATE: 'Vulnerability mapping identifies areas and populations most at risk from climate impacts.', GRADUATE: 'CSA addresses food security while adapting to and mitigating climate change.', PHD: 'Transformative adaptation involves fundamental system changes rather than incremental adjustments.' } }] },
    externalResources: [{ title: 'Climate Smart Agriculture', url: 'https://www.fao.org/climate-smart-agriculture/en/', type: 'research' }]
  },
  // Module 19: Food Access and Equity
  {
    id: 'food-sov-access',
    slug: 'food-access-equity',
    title: 'Food Access and Equity',
    description: {
      ELEMENTARY: 'Learn why everyone should be able to get healthy food!',
      MIDDLE_SCHOOL: 'Discover why some neighborhoods dont have good grocery stores.',
      HIGH_SCHOOL: 'Explore food deserts, food apartheid, and solutions.',
      UNDERGRADUATE: 'Analyze food access disparities, root causes, and interventions.',
      GRADUATE: 'Examine food justice, structural racism, and transformative solutions.',
      PHD: 'Research food equity measurement, systems change, and policy evaluation.'
    },
    topic: 'food-sovereignty',
    category: 'EQUITY',
    icon: 'Users',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-access-1', title: 'Food for All', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Everyone Needs Good Food!</h2><p>Every person should be able to get healthy, fresh food near their home.</p>', MIDDLE_SCHOOL: '<h2>Food Deserts</h2><p>Some neighborhoods lack grocery stores with fresh food. Residents must travel far or eat unhealthy options.</p>', HIGH_SCHOOL: '<h2>Food Apartheid</h2><p>Unequal food access results from policy decisions, not accident. Race and income predict food access.</p>', UNDERGRADUATE: '<h2>Root Causes</h2><p>Redlining, disinvestment, retail economics, and transportation create food access disparities.</p>', GRADUATE: '<h2>Food Justice</h2><p>Movement connecting food access to racial justice, economic justice, and community control.</p>', PHD: '<h2>Research Frontiers</h2><p>Food access metrics, intervention effectiveness, and structural change analysis.</p>' } }],
    activities: [{ id: 'fs-access-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Help Everyone Eat!', MIDDLE_SCHOOL: 'Map Food Access', HIGH_SCHOOL: 'Root Cause Analysis', UNDERGRADUATE: 'Disparity Analysis', GRADUATE: 'Justice Campaign', PHD: 'Systems Analysis' }, description: { ELEMENTARY: 'Help neighborhoods get good food!', MIDDLE_SCHOOL: 'Map food stores in different neighborhoods.', HIGH_SCHOOL: 'Analyze root causes of food access problems.', UNDERGRADUATE: 'Analyze food access disparities in a city.', GRADUATE: 'Design a food justice campaign.', PHD: 'Analyze food system structural change.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-access-game', type: 'simulation', title: 'Food Justice Champion', description: 'Improve food access in underserved areas!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-access-quiz', passingScore: 80, questions: [{ id: 'faccq1', question: { ELEMENTARY: 'What should everyone be able to get?', MIDDLE_SCHOOL: 'What is a food desert?', HIGH_SCHOOL: 'What is food apartheid?', UNDERGRADUATE: 'What is redlining?', GRADUATE: 'What is food justice?', PHD: 'What limits food access research?' }, options: { ELEMENTARY: ['Healthy, fresh food', 'Only candy', 'Nothing', 'Food far away'], MIDDLE_SCHOOL: ['Area without stores selling fresh food', 'A dry place', 'A sandy area', 'A new store'], HIGH_SCHOOL: ['Intentional unequal food access based on race/income', 'Natural food patterns', 'Food choice', 'Diet preference'], UNDERGRADUATE: ['Discriminatory lending denying services to areas', 'Drawing red lines', 'A art project', 'Road planning'], GRADUATE: ['Movement connecting food, racial, and economic justice', 'Food cooking', 'Food delivery', 'Restaurant review'], PHD: ['Measurement challenges and data limitations', 'Perfect data', 'No challenges', 'Too much funding'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Everyone should be able to get healthy, fresh food near their home!', MIDDLE_SCHOOL: 'A food desert is an area without grocery stores selling fresh, healthy food nearby.', HIGH_SCHOOL: 'Food apartheid highlights that unequal food access results from policy choices, not accident.', UNDERGRADUATE: 'Redlining was discriminatory denial of services based on race, causing lasting neighborhood disinvestment.', GRADUATE: 'Food justice connects food access to broader racial and economic justice movements.', PHD: 'Measuring true food access and attributing intervention impacts faces significant methodological challenges.' } }] },
    externalResources: [{ title: 'Food Research Action Center', url: 'https://frac.org/', type: 'research' }]
  },
  // Module 20: Cooperative Food Models
  {
    id: 'food-sov-coops',
    slug: 'cooperative-food-models',
    title: 'Cooperative Food Models',
    description: {
      ELEMENTARY: 'Learn how people work together to grow and share food!',
      MIDDLE_SCHOOL: 'Discover food cooperatives and how they work.',
      HIGH_SCHOOL: 'Explore food co-ops, CSAs, and cooperative business models.',
      UNDERGRADUATE: 'Analyze cooperative economics, governance, and food system applications.',
      GRADUATE: 'Examine cooperative development, financing, and scaling strategies.',
      PHD: 'Research cooperative impacts, alternative food networks, and economic democracy.'
    },
    topic: 'food-sovereignty',
    category: 'COOPERATIVE',
    icon: 'Handshake',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-coop-1', title: 'Working Together', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Food Friends!</h2><p>When people work together, they can grow more food and share it fairly!</p>', MIDDLE_SCHOOL: '<h2>Food Cooperatives</h2><p>Co-ops are businesses owned by their members. Food co-ops sell healthy food and share profits with members.</p>', HIGH_SCHOOL: '<h2>Cooperative Models</h2><p>Consumer co-ops, worker co-ops, producer co-ops, and multi-stakeholder models.</p>', UNDERGRADUATE: '<h2>Cooperative Principles</h2><p>Democratic member control, economic participation, autonomy, education, cooperation, and community concern.</p>', GRADUATE: '<h2>Cooperative Development</h2><p>Starting co-ops, governance challenges, financing, and technical assistance needs.</p>', PHD: '<h2>Research Frontiers</h2><p>Cooperative impacts on communities, alternative economies, and economic democracy.</p>' } }],
    activities: [{ id: 'fs-coop-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Start a Food Team!', MIDDLE_SCHOOL: 'Design a Co-op', HIGH_SCHOOL: 'Business Model', UNDERGRADUATE: 'Governance Design', GRADUATE: 'Development Plan', PHD: 'Impact Assessment' }, description: { ELEMENTARY: 'Work together to grow and share food!', MIDDLE_SCHOOL: 'Design a food cooperative.', HIGH_SCHOOL: 'Create a cooperative business model.', UNDERGRADUATE: 'Design cooperative governance.', GRADUATE: 'Plan cooperative development strategy.', PHD: 'Assess cooperative community impacts.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-coop-game', type: 'simulation', title: 'Co-op Builder', description: 'Build thriving food cooperatives!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-coop-quiz', passingScore: 80, questions: [{ id: 'fcoopq1', question: { ELEMENTARY: 'What do people do in a food co-op?', MIDDLE_SCHOOL: 'Who owns a cooperative?', HIGH_SCHOOL: 'What is a worker cooperative?', UNDERGRADUATE: 'What is democratic member control?', GRADUATE: 'What is a development challenge for co-ops?', PHD: 'What is economic democracy?' }, options: { ELEMENTARY: ['Work together to share food', 'Work alone', 'Buy from big stores only', 'Throw food away'], MIDDLE_SCHOOL: ['The members', 'One rich person', 'The government', 'Nobody'], HIGH_SCHOOL: ['A business owned by its workers', 'A regular company', 'A government agency', 'A charity'], UNDERGRADUATE: ['Members have equal vote in decisions', 'Boss decides everything', 'Random selection', 'No voting'], GRADUATE: ['Accessing capital and technical assistance', 'Too easy', 'No challenges', 'Unlimited money'], PHD: ['Economic systems with democratic ownership and control', 'Only voting', 'No democracy', 'Corporate control'] }, correctIndex: 0, explanation: { ELEMENTARY: 'In a food co-op, people work together to grow, buy, and share healthy food!', MIDDLE_SCHOOL: 'Cooperatives are owned by their members - the people who use and benefit from them.', HIGH_SCHOOL: 'Worker cooperatives are businesses owned and democratically controlled by their workers.', UNDERGRADUATE: 'Democratic member control means each member has an equal vote regardless of investment.', GRADUATE: 'Accessing startup capital and ongoing technical support are key development challenges.', PHD: 'Economic democracy extends democratic principles to economic ownership and workplace governance.' } }] },
    externalResources: [{ title: 'Cooperative Development', url: 'https://www.ncba.coop/', type: 'research' }]
  },
  {
    id: 'food-sov-school',
    slug: 'farm-to-school',
    title: 'Farm-to-School Programs',
    description: {
      ELEMENTARY: 'Learn how farms bring fresh food to your school cafeteria!',
      MIDDLE_SCHOOL: 'Discover farm-to-school programs and school gardens.',
      HIGH_SCHOOL: 'Explore farm-to-school procurement, education, and school garden integration.',
      UNDERGRADUATE: 'Analyze farm-to-school policy, implementation models, and outcome assessment.',
      GRADUATE: 'Examine institutional food procurement, supply chain development, and program scaling.',
      PHD: 'Research farm-to-school impacts on health, education, and local farm economies.'
    },
    topic: 'food-sovereignty',
    category: 'EDUCATION',
    icon: 'School',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-school-1', title: 'Fresh Food at School', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Farm Fresh Lunches!</h2><p>Local farmers can bring fresh fruits and vegetables to your school so you can eat healthy lunches!</p>', MIDDLE_SCHOOL: '<h2>Farm-to-School</h2><p>Farm-to-school programs connect local farms with schools for fresh food, education, and school gardens.</p>', HIGH_SCHOOL: '<h2>Program Components</h2><p>Local procurement, food education, school gardens, and farmer visits create comprehensive programs.</p>', UNDERGRADUATE: '<h2>Implementation</h2><p>Policy development, procurement logistics, food service integration, and stakeholder engagement.</p>', GRADUATE: '<h2>Scaling Programs</h2><p>Food hubs, aggregation, district-wide implementation, and regional coordination.</p>', PHD: '<h2>Research Frontiers</h2><p>Health outcomes, educational impacts, and economic benefits to local farmers.</p>' } }],
    activities: [{ id: 'fs-school-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plan a Farm Lunch!', MIDDLE_SCHOOL: 'School Garden', HIGH_SCHOOL: 'Program Design', UNDERGRADUATE: 'Implementation Plan', GRADUATE: 'District Strategy', PHD: 'Impact Study' }, description: { ELEMENTARY: 'Help bring farm food to school!', MIDDLE_SCHOOL: 'Design a school garden.', HIGH_SCHOOL: 'Design a farm-to-school program.', UNDERGRADUATE: 'Plan program implementation.', GRADUATE: 'Develop district-wide strategy.', PHD: 'Design impact evaluation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-school-game', type: 'simulation', title: 'School Food Hero', description: 'Bring healthy local food to schools!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-school-quiz', passingScore: 80, questions: [{ id: 'fschoolq1', question: { ELEMENTARY: 'Where does farm-to-school food come from?', MIDDLE_SCHOOL: 'What are the parts of farm-to-school?', HIGH_SCHOOL: 'Why involve local farmers?', UNDERGRADUATE: 'What is local procurement?', GRADUATE: 'What is a food hub?', PHD: 'What outcomes are measured?' }, options: { ELEMENTARY: ['Local farms nearby', 'Far away countries', 'Factories only', 'No farms'], MIDDLE_SCHOOL: ['Local food, gardens, and education', 'Just lunches', 'Only recess', 'No programs'], HIGH_SCHOOL: ['Fresh food, local economy, education', 'Cheaper only', 'Faster delivery', 'No reason'], UNDERGRADUATE: ['Buying food from local sources', 'Buying from anywhere', 'No buying', 'Only big companies'], GRADUATE: ['Facility aggregating local farm products', 'Bicycle hub', 'Computer hub', 'No hubs'], PHD: ['Health, education, and economic impacts', 'Only taste', 'Nothing measured', 'Just cost'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Farm-to-school brings fresh food from local farms near your community to your school!', MIDDLE_SCHOOL: 'Farm-to-school includes local food procurement, school gardens, and nutrition education.', HIGH_SCHOOL: 'Local farmers provide fresher food, support the local economy, and offer educational opportunities.', UNDERGRADUATE: 'Local procurement prioritizes purchasing food from farms within a defined geographic area.', GRADUATE: 'Food hubs aggregate products from multiple small farms to meet institutional demand.', PHD: 'Research examines student health, dietary behavior, academic outcomes, and farm economic benefits.' } }] },
    externalResources: [{ title: 'Farm to School', url: 'https://www.farmtoschool.org/', type: 'research' }]
  },
  {
    id: 'food-sov-agroforestry',
    slug: 'agroforestry-food-forests',
    title: 'Agroforestry and Food Forests',
    description: {
      ELEMENTARY: 'Learn about forests you can eat from - full of fruit and nut trees!',
      MIDDLE_SCHOOL: 'Discover how trees and food crops grow together in agroforestry.',
      HIGH_SCHOOL: 'Explore agroforestry systems, food forests, and multistory cropping.',
      UNDERGRADUATE: 'Analyze agroforestry design, species selection, and ecological interactions.',
      GRADUATE: 'Examine agroforestry economics, carbon sequestration, and policy support.',
      PHD: 'Research agroforestry system optimization, climate adaptation, and scaling barriers.'
    },
    topic: 'food-sovereignty',
    category: 'PRODUCTION',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-agf-1', title: 'Edible Forests', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Forests You Can Eat!</h2><p>Imagine a forest full of apple trees, berry bushes, and vegetables all growing together!</p>', MIDDLE_SCHOOL: '<h2>Trees and Crops Together</h2><p>Agroforestry combines trees with crops or livestock. Food forests mimic natural forests with edible plants.</p>', HIGH_SCHOOL: '<h2>Agroforestry Systems</h2><p>Alley cropping, silvopasture, forest farming, windbreaks, and riparian buffers.</p>', UNDERGRADUATE: '<h2>Design Principles</h2><p>Species selection, spatial arrangement, succession planning, and guild design.</p>', GRADUATE: '<h2>System Economics</h2><p>Establishment costs, delayed returns, diverse revenue streams, and ecosystem service payments.</p>', PHD: '<h2>Research Frontiers</h2><p>Yield optimization, climate adaptation potential, and adoption barriers.</p>' } }],
    activities: [{ id: 'fs-agf-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Food Forest!', MIDDLE_SCHOOL: 'Layer Design', HIGH_SCHOOL: 'System Planning', UNDERGRADUATE: 'Guild Design', GRADUATE: 'Economic Analysis', PHD: 'Optimization Model' }, description: { ELEMENTARY: 'Create a forest full of food!', MIDDLE_SCHOOL: 'Design food forest layers.', HIGH_SCHOOL: 'Plan an agroforestry system.', UNDERGRADUATE: 'Design a plant guild.', GRADUATE: 'Analyze agroforestry economics.', PHD: 'Model system optimization.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-agf-game', type: 'simulation', title: 'Food Forest Designer', description: 'Create productive edible forest ecosystems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-agf-quiz', passingScore: 80, questions: [{ id: 'fagfq1', question: { ELEMENTARY: 'What grows in a food forest?', MIDDLE_SCHOOL: 'What is agroforestry?', HIGH_SCHOOL: 'What is silvopasture?', UNDERGRADUATE: 'What is a plant guild?', GRADUATE: 'Why are returns delayed?', PHD: 'What limits adoption?' }, options: { ELEMENTARY: ['Fruit trees, berries, and vegetables', 'Only grass', 'Nothing edible', 'Just pine trees'], MIDDLE_SCHOOL: ['Trees combined with crops or animals', 'Only forests', 'Only fields', 'No trees'], HIGH_SCHOOL: ['Trees combined with livestock grazing', 'Only pasture', 'Only forest', 'Indoor farming'], UNDERGRADUATE: ['Plants that support each other', 'A club', 'A single plant', 'Random planting'], GRADUATE: ['Trees take years to produce', 'Instant returns', 'No reason', 'Fast money'], PHD: ['Land tenure, knowledge, capital access', 'No barriers', 'Perfect systems', 'Easy adoption'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Food forests have fruit and nut trees, berry bushes, vegetables, and herbs all growing together!', MIDDLE_SCHOOL: 'Agroforestry integrates trees with crops, livestock, or both on the same land.', HIGH_SCHOOL: 'Silvopasture combines trees and livestock grazing for multiple benefits.', UNDERGRADUATE: 'Plant guilds are combinations of plants that support each other through nutrient cycling, pest control, etc.', GRADUATE: 'Tree crops take several years to reach production, requiring patient investment.', PHD: 'Tenure insecurity, knowledge gaps, and upfront costs limit agroforestry adoption.' } }] },
    externalResources: [{ title: 'Agroforestry', url: 'https://www.aftaweb.org/', type: 'research' }]
  },
  {
    id: 'food-sov-nutrition',
    slug: 'nutrition-education',
    title: 'Nutrition Education',
    description: {
      ELEMENTARY: 'Learn about healthy eating and how food helps your body grow strong!',
      MIDDLE_SCHOOL: 'Discover the basics of nutrition and making healthy food choices.',
      HIGH_SCHOOL: 'Explore nutrition science, dietary guidelines, and health outcomes.',
      UNDERGRADUATE: 'Analyze nutrition education programs, behavior change, and evaluation methods.',
      GRADUATE: 'Examine nutrition policy, food environment interventions, and health equity.',
      PHD: 'Research nutrition behavior change, community-based approaches, and structural determinants.'
    },
    topic: 'food-sovereignty',
    category: 'EDUCATION',
    icon: 'Heart',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-nut-1', title: 'Eating for Health', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Food Gives You Power!</h2><p>Different foods help your body in different ways - fruits give you vitamins, proteins make you strong!</p>', MIDDLE_SCHOOL: '<h2>Nutrition Basics</h2><p>Carbohydrates, proteins, fats, vitamins, and minerals all play important roles in keeping you healthy.</p>', HIGH_SCHOOL: '<h2>Dietary Guidelines</h2><p>Evidence-based recommendations for healthy eating patterns, portion sizes, and nutrient needs.</p>', UNDERGRADUATE: '<h2>Education Methods</h2><p>Teaching strategies, cooking skills, food literacy, and behavior change theories.</p>', GRADUATE: '<h2>Food Environments</h2><p>How food availability, marketing, and pricing shape dietary choices beyond individual knowledge.</p>', PHD: '<h2>Research Frontiers</h2><p>Structural determinants of diet, community-based participatory approaches, and equity-focused interventions.</p>' } }],
    activities: [{ id: 'fs-nut-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Healthy Plate!', MIDDLE_SCHOOL: 'Nutrient Hunt', HIGH_SCHOOL: 'Meal Planning', UNDERGRADUATE: 'Program Design', GRADUATE: 'Environment Analysis', PHD: 'Intervention Research' }, description: { ELEMENTARY: 'Create a plate of healthy foods!', MIDDLE_SCHOOL: 'Find nutrients in different foods.', HIGH_SCHOOL: 'Plan balanced meals.', UNDERGRADUATE: 'Design a nutrition education program.', GRADUATE: 'Analyze food environment impacts.', PHD: 'Design a research intervention.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-nut-game', type: 'simulation', title: 'Nutrition Expert', description: 'Learn to make healthy food choices!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-nut-quiz', passingScore: 80, questions: [{ id: 'fnutq1', question: { ELEMENTARY: 'What do fruits give you?', MIDDLE_SCHOOL: 'What do proteins do?', HIGH_SCHOOL: 'What are dietary guidelines?', UNDERGRADUATE: 'What is food literacy?', GRADUATE: 'What shapes food choices?', PHD: 'What are structural determinants?' }, options: { ELEMENTARY: ['Vitamins to stay healthy', 'Nothing', 'Sugar only', 'Just color'], MIDDLE_SCHOOL: ['Help build and repair your body', 'Make you tired', 'Nothing important', 'Only taste good'], HIGH_SCHOOL: ['Evidence-based eating recommendations', 'Random suggestions', 'Old rules', 'Marketing claims'], UNDERGRADUATE: ['Understanding and skills to choose healthy food', 'Reading labels only', 'No skills needed', 'Just shopping'], GRADUATE: ['Availability, marketing, pricing, and access', 'Only willpower', 'Just knowledge', 'Nothing external'], PHD: ['Economic, social, and policy factors affecting diet', 'Individual choices only', 'No structure', 'Random factors'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Fruits give you vitamins that help your body stay healthy and fight off sickness!', MIDDLE_SCHOOL: 'Proteins help build and repair muscles, skin, and other tissues in your body.', HIGH_SCHOOL: 'Dietary guidelines provide evidence-based recommendations for healthy eating patterns.', UNDERGRADUATE: 'Food literacy includes knowledge, skills, and confidence to make healthy food choices.', GRADUATE: 'Food environments shape choices through product availability, marketing exposure, and pricing.', PHD: 'Structural determinants are the broader economic, social, and policy conditions affecting dietary patterns.' } }] },
    externalResources: [{ title: 'Nutrition Education', url: 'https://snaped.fns.usda.gov/', type: 'article' }]
  },
  {
    id: 'food-sov-fisheries',
    slug: 'sustainable-fisheries',
    title: 'Sustainable Fisheries and Aquaculture',
    description: {
      ELEMENTARY: 'Learn about fishing and fish farming that keeps the ocean healthy!',
      MIDDLE_SCHOOL: 'Discover sustainable ways to catch and raise fish for food.',
      HIGH_SCHOOL: 'Explore fisheries management, aquaculture systems, and marine conservation.',
      UNDERGRADUATE: 'Analyze fisheries economics, aquaculture technology, and certification programs.',
      GRADUATE: 'Examine fisheries policy, aquaculture sustainability, and blue food systems.',
      PHD: 'Research fisheries modeling, aquaculture innovation, and ocean food security.'
    },
    topic: 'food-sovereignty',
    category: 'PRODUCTION',
    icon: 'Fish',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-fish-1', title: 'Fish for the Future', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Keeping Fish Swimming!</h2><p>We need to catch fish carefully so there are always plenty left in the ocean!</p>', MIDDLE_SCHOOL: '<h2>Overfishing</h2><p>Taking too many fish means there are not enough left to have babies. Sustainable fishing leaves fish to reproduce.</p>', HIGH_SCHOOL: '<h2>Fisheries Management</h2><p>Catch limits, marine protected areas, and selective gear help fish populations recover.</p>', UNDERGRADUATE: '<h2>Aquaculture Systems</h2><p>Fish farming techniques, feed sustainability, environmental impacts, and integrated systems.</p>', GRADUATE: '<h2>Blue Food Systems</h2><p>Marine and freshwater food production, nutrition contributions, and sustainable intensification.</p>', PHD: '<h2>Research Frontiers</h2><p>Stock assessment models, recirculating aquaculture, and climate impacts on fisheries.</p>' } }],
    activities: [{ id: 'fs-fish-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fishing Game!', MIDDLE_SCHOOL: 'Fish Population', HIGH_SCHOOL: 'Management Plan', UNDERGRADUATE: 'Aquaculture Design', GRADUATE: 'Policy Analysis', PHD: 'Stock Model' }, description: { ELEMENTARY: 'Learn to fish sustainably!', MIDDLE_SCHOOL: 'Manage a fish population.', HIGH_SCHOOL: 'Create a fisheries management plan.', UNDERGRADUATE: 'Design an aquaculture system.', GRADUATE: 'Analyze fisheries policy.', PHD: 'Build a stock assessment model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-fish-game', type: 'simulation', title: 'Sustainable Fisher', description: 'Manage fish populations for long-term health!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-fish-quiz', passingScore: 80, questions: [{ id: 'ffishq1', question: { ELEMENTARY: 'Why leave some fish in the ocean?', MIDDLE_SCHOOL: 'What is overfishing?', HIGH_SCHOOL: 'What is a catch limit?', UNDERGRADUATE: 'What is aquaculture?', GRADUATE: 'What are blue foods?', PHD: 'What is stock assessment?' }, options: { ELEMENTARY: ['So they can have babies', 'No reason', 'Fish like being alone', 'Ocean is too big'], MIDDLE_SCHOOL: ['Taking too many fish to reproduce', 'Catching any fish', 'Not fishing', 'Fish swimming over'], HIGH_SCHOOL: ['Maximum fish allowed to be caught', 'No limits', 'Catching everything', 'Fish counting'], UNDERGRADUATE: ['Farming fish and aquatic organisms', 'Ocean swimming', 'Water sports', 'Fish watching'], GRADUATE: ['Food from aquatic environments', 'Blue colored food', 'Sad food', 'Cold food'], PHD: ['Estimating fish population size and trends', 'Counting one fish', 'No assessment', 'Random guess'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We leave some fish so they can have babies and keep the fish population healthy!', MIDDLE_SCHOOL: 'Overfishing means catching too many fish, leaving too few to reproduce and maintain populations.', HIGH_SCHOOL: 'Catch limits set the maximum amount of fish that can be caught to prevent overfishing.', UNDERGRADUATE: 'Aquaculture is the farming of fish, shellfish, and aquatic plants for food.', GRADUATE: 'Blue foods are nutritious foods from aquatic environments including fish, shellfish, and seaweed.', PHD: 'Stock assessment estimates population size, productivity, and sustainable harvest levels.' } }] },
    externalResources: [{ title: 'Sustainable Fisheries', url: 'https://www.worldwildlife.org/industries/sustainable-seafood', type: 'research' }]
  },
  {
    id: 'food-sov-urban',
    slug: 'urban-farming',
    title: 'Urban Farming and Rooftop Gardens',
    description: {
      ELEMENTARY: 'Learn how people grow food in cities on rooftops and empty lots!',
      MIDDLE_SCHOOL: 'Discover urban farming techniques from rooftop gardens to vertical farms.',
      HIGH_SCHOOL: 'Explore urban agriculture models, zoning, and community benefits.',
      UNDERGRADUATE: 'Analyze urban food production economics, policy frameworks, and design.',
      GRADUATE: 'Examine urban food systems, controlled environment agriculture, and food planning.',
      PHD: 'Research urban agriculture productivity, food system resilience, and social outcomes.'
    },
    topic: 'food-sovereignty',
    category: 'PRODUCTION',
    icon: 'Building',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-urban-1', title: 'City Farms', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Growing Food in Cities!</h2><p>Even in big cities, people grow vegetables on rooftops, in yards, and in empty lots!</p>', MIDDLE_SCHOOL: '<h2>Urban Agriculture</h2><p>Rooftop gardens, community gardens, vertical farms, and vacant lot farming bring food production to cities.</p>', HIGH_SCHOOL: '<h2>Urban Farming Models</h2><p>Commercial urban farms, nonprofit gardens, high-tech vertical farms, and rooftop greenhouses.</p>', UNDERGRADUATE: '<h2>Policy and Economics</h2><p>Zoning regulations, water access, land tenure, business models, and community land trusts.</p>', GRADUATE: '<h2>Urban Food Planning</h2><p>Integrating urban agriculture into city planning, food policy councils, and urban food systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Production efficiency, social impacts, ecosystem services, and climate adaptation.</p>' } }],
    activities: [{ id: 'fs-urban-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'City Garden!', MIDDLE_SCHOOL: 'Rooftop Farm', HIGH_SCHOOL: 'Business Plan', UNDERGRADUATE: 'Policy Analysis', GRADUATE: 'System Planning', PHD: 'Impact Assessment' }, description: { ELEMENTARY: 'Start a garden in the city!', MIDDLE_SCHOOL: 'Design a rooftop garden.', HIGH_SCHOOL: 'Plan an urban farm business.', UNDERGRADUATE: 'Analyze urban agriculture policy.', GRADUATE: 'Plan urban food systems.', PHD: 'Assess urban farm impacts.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-urban-game', type: 'simulation', title: 'Urban Farmer', description: 'Grow food in the heart of the city!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-urban-quiz', passingScore: 80, questions: [{ id: 'furbanq1', question: { ELEMENTARY: 'Where can you grow food in a city?', MIDDLE_SCHOOL: 'What is a vertical farm?', HIGH_SCHOOL: 'What is zoning?', UNDERGRADUATE: 'What is a community land trust?', GRADUATE: 'What is a food policy council?', PHD: 'What ecosystem services do urban farms provide?' }, options: { ELEMENTARY: ['Rooftops, yards, and empty lots', 'Only in the country', 'Nowhere in cities', 'Only in stores'], MIDDLE_SCHOOL: ['Farm growing food in stacked layers', 'A tall building', 'A mountain farm', 'A wide field'], HIGH_SCHOOL: ['Rules about how land can be used', 'Time zones', 'Weather zones', 'No rules'], UNDERGRADUATE: ['Nonprofit holding land for community benefit', 'Government land', 'Private company', 'No organization'], GRADUATE: ['Group advising on food policy', 'Restaurant council', 'Food court', 'Kitchen council'], PHD: ['Stormwater management, cooling, biodiversity', 'None', 'Only food', 'Only beauty'] }, correctIndex: 0, explanation: { ELEMENTARY: 'In cities, people grow food on rooftops, in backyards, and in empty lots that need love!', MIDDLE_SCHOOL: 'Vertical farms grow food in stacked layers using artificial lighting and controlled environments.', HIGH_SCHOOL: 'Zoning regulations determine what activities are allowed on different types of land.', UNDERGRADUATE: 'Community land trusts are nonprofits that hold land for community benefit, often enabling urban farms.', GRADUATE: 'Food policy councils bring stakeholders together to advise local government on food system issues.', PHD: 'Urban farms provide stormwater management, urban cooling, habitat, and educational opportunities.' } }] },
    externalResources: [{ title: 'Urban Agriculture', url: 'https://www.urbanagricultureusa.org/', type: 'research' }]
  },
  {
    id: 'food-sov-preservation',
    slug: 'food-preservation-storage',
    title: 'Food Preservation and Storage',
    description: {
      ELEMENTARY: 'Learn how to keep food fresh longer so nothing goes to waste!',
      MIDDLE_SCHOOL: 'Discover canning, drying, freezing, and fermenting to preserve food.',
      HIGH_SCHOOL: 'Explore food preservation science, traditional methods, and food safety.',
      UNDERGRADUATE: 'Analyze preservation technologies, shelf life optimization, and storage systems.',
      GRADUATE: 'Examine cold chain logistics, post-harvest loss reduction, and preservation innovation.',
      PHD: 'Research preservation science, food security implications, and emerging technologies.'
    },
    topic: 'food-sovereignty',
    category: 'PROCESSING',
    icon: 'Archive',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-pres-1', title: 'Keeping Food Fresh', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Food That Lasts!</h2><p>We can keep food fresh longer by freezing, drying, or putting it in jars!</p>', MIDDLE_SCHOOL: '<h2>Preservation Methods</h2><p>Canning, freezing, drying, smoking, pickling, and fermenting stop food from spoiling.</p>', HIGH_SCHOOL: '<h2>Science of Preservation</h2><p>Preservation works by controlling bacteria, enzymes, moisture, and oxygen. Different methods target different factors.</p>', UNDERGRADUATE: '<h2>Modern Technologies</h2><p>Controlled atmosphere storage, modified atmosphere packaging, cold chain management, and emerging technologies.</p>', GRADUATE: '<h2>Post-Harvest Systems</h2><p>Reducing food loss between farm and consumer through improved storage, handling, and logistics.</p>', PHD: '<h2>Research Frontiers</h2><p>Novel preservation technologies, climate-resilient storage, and food security applications.</p>' } }],
    activities: [{ id: 'fs-pres-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Preserve Food!', MIDDLE_SCHOOL: 'Method Match', HIGH_SCHOOL: 'Safety Planning', UNDERGRADUATE: 'System Design', GRADUATE: 'Loss Reduction', PHD: 'Technology Assessment' }, description: { ELEMENTARY: 'Keep food fresh longer!', MIDDLE_SCHOOL: 'Match foods with preservation methods.', HIGH_SCHOOL: 'Plan safe food preservation.', UNDERGRADUATE: 'Design a storage system.', GRADUATE: 'Reduce post-harvest losses.', PHD: 'Assess preservation technologies.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-pres-game', type: 'simulation', title: 'Preservation Pro', description: 'Keep food fresh and reduce waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-pres-quiz', passingScore: 80, questions: [{ id: 'fpresq1', question: { ELEMENTARY: 'How can we keep food longer?', MIDDLE_SCHOOL: 'What does canning do?', HIGH_SCHOOL: 'Why does drying preserve food?', UNDERGRADUATE: 'What is modified atmosphere packaging?', GRADUATE: 'What is cold chain?', PHD: 'What is a novel preservation technology?' }, options: { ELEMENTARY: ['Freezing, drying, or canning', 'Leave it out', 'Throw it away', 'Nothing helps'], MIDDLE_SCHOOL: ['Seals food in jars to stop bacteria', 'Just puts food in cans', 'Makes food taste bad', 'Nothing'], HIGH_SCHOOL: ['Removes water bacteria need to grow', 'Makes food wet', 'Adds bacteria', 'No effect'], UNDERGRADUATE: ['Changing gases around food to slow spoilage', 'Regular air', 'No packaging', 'Just cardboard'], GRADUATE: ['Temperature-controlled supply chain', 'Cold weather', 'Chain of freezers only', 'Ice delivery'], PHD: ['High pressure processing, pulsed electric fields', 'Only canning', 'Just freezing', 'No new methods'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We can keep food fresh by freezing it, drying it out, or sealing it in jars!', MIDDLE_SCHOOL: 'Canning seals food in airtight jars and heats them to kill bacteria so food lasts longer.', HIGH_SCHOOL: 'Drying removes water that bacteria need to grow and multiply.', UNDERGRADUATE: 'MAP changes the gas composition around food to slow ripening and microbial growth.', GRADUATE: 'Cold chain is the unbroken temperature-controlled supply chain from farm to consumer.', PHD: 'Novel technologies include high pressure processing, pulsed electric fields, and plasma treatment.' } }] },
    externalResources: [{ title: 'Food Preservation', url: 'https://nchfp.uga.edu/', type: 'research' }]
  },
  {
    id: 'food-sov-seeds',
    slug: 'seed-saving-biodiversity',
    title: 'Seed Saving and Biodiversity',
    description: {
      ELEMENTARY: 'Learn how saving seeds keeps plants growing for future generations!',
      MIDDLE_SCHOOL: 'Discover seed saving techniques and why crop diversity matters.',
      HIGH_SCHOOL: 'Explore seed sovereignty, seed banks, and agricultural biodiversity.',
      UNDERGRADUATE: 'Analyze seed systems, intellectual property, and genetic resource governance.',
      GRADUATE: 'Examine seed policy, farmer rights, and conservation strategies.',
      PHD: 'Research seed system resilience, evolutionary plant breeding, and food security.'
    },
    topic: 'food-sovereignty',
    category: 'BIODIVERSITY',
    icon: 'Sprout',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-seed-1', title: 'Seeds for Tomorrow', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Magic Seeds!</h2><p>Every plant comes from a seed, and we can save seeds to plant next year!</p>', MIDDLE_SCHOOL: '<h2>Seed Saving</h2><p>Farmers have saved seeds for thousands of years. Today, seed saving keeps rare varieties alive.</p>', HIGH_SCHOOL: '<h2>Seed Sovereignty</h2><p>The right of farmers to save, share, and breed seeds. Corporate seeds vs farmer-saved seeds.</p>', UNDERGRADUATE: '<h2>Seed Systems</h2><p>Formal and informal seed sectors, certification, plant variety protection, and patents.</p>', GRADUATE: '<h2>Genetic Resources</h2><p>Seed banks, in situ conservation, access and benefit sharing, and farmer rights.</p>', PHD: '<h2>Research Frontiers</h2><p>Evolutionary plant breeding, participatory variety selection, and climate adaptation.</p>' } }],
    activities: [{ id: 'fs-seed-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save Seeds!', MIDDLE_SCHOOL: 'Seed Bank', HIGH_SCHOOL: 'Variety Selection', UNDERGRADUATE: 'System Analysis', GRADUATE: 'Policy Design', PHD: 'Breeding Program' }, description: { ELEMENTARY: 'Learn to save seeds from plants!', MIDDLE_SCHOOL: 'Create a seed saving system.', HIGH_SCHOOL: 'Select plant varieties.', UNDERGRADUATE: 'Analyze seed system governance.', GRADUATE: 'Design seed conservation policy.', PHD: 'Design a breeding program.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-seed-game', type: 'simulation', title: 'Seed Guardian', description: 'Protect crop diversity through seed saving!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-seed-quiz', passingScore: 80, questions: [{ id: 'fseedq1', question: { ELEMENTARY: 'Where do plants come from?', MIDDLE_SCHOOL: 'Why save seeds?', HIGH_SCHOOL: 'What is seed sovereignty?', UNDERGRADUATE: 'What is plant variety protection?', GRADUATE: 'What are farmer rights?', PHD: 'What is evolutionary breeding?' }, options: { ELEMENTARY: ['Seeds', 'Stores only', 'Nowhere', 'Factories'], MIDDLE_SCHOOL: ['Keep rare varieties alive', 'Seeds are useless', 'No reason', 'Just for fun'], HIGH_SCHOOL: ['Farmers right to save and share seeds', 'Company ownership only', 'No rights', 'Government seeds'], UNDERGRADUATE: ['Legal protection for new plant varieties', 'No protection', 'Animal protection', 'Building protection'], GRADUATE: ['Rights to save, use, exchange, and sell seeds', 'No farmer rights', 'Only company rights', 'Government rights'], PHD: ['Crops adapting through natural selection', 'Static breeding', 'No evolution', 'Only lab breeding'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Every plant grows from a seed - tiny packages that hold everything needed to grow!', MIDDLE_SCHOOL: 'Seed saving preserves rare and traditional varieties that might otherwise disappear.', HIGH_SCHOOL: 'Seed sovereignty is the right of farmers and communities to save, breed, and exchange seeds.', UNDERGRADUATE: 'PVP gives breeders exclusive rights to new varieties while allowing farmer seed saving.', GRADUATE: 'Farmer rights include saving, using, exchanging, and selling farm-saved seed.', PHD: 'Evolutionary breeding exposes diverse populations to selection pressure for local adaptation.' } }] },
    externalResources: [{ title: 'Seed Savers', url: 'https://www.seedsavers.org/', type: 'research' }]
  },
  {
    id: 'food-sov-policy',
    slug: 'food-policy-governance',
    title: 'Food Policy and Governance',
    description: {
      ELEMENTARY: 'Learn how rules and leaders help make sure everyone gets good food!',
      MIDDLE_SCHOOL: 'Discover how governments create food programs and policies.',
      HIGH_SCHOOL: 'Explore food policy at local, national, and international levels.',
      UNDERGRADUATE: 'Analyze food policy instruments, governance structures, and stakeholder engagement.',
      GRADUATE: 'Examine food system governance, policy integration, and democratic food systems.',
      PHD: 'Research food policy processes, power dynamics, and transformative governance.'
    },
    topic: 'food-sovereignty',
    category: 'POLICY',
    icon: 'Scale',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-pol-1', title: 'Food Rules', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Rules That Help!</h2><p>Governments make rules to help farmers grow food and make sure everyone can eat!</p>', MIDDLE_SCHOOL: '<h2>Food Programs</h2><p>School lunches, food stamps, farm subsidies, and food safety rules are all food policies.</p>', HIGH_SCHOOL: '<h2>Policy Levels</h2><p>Local food policy councils, national farm bills, and international trade agreements all shape food systems.</p>', UNDERGRADUATE: '<h2>Policy Tools</h2><p>Regulations, subsidies, taxes, procurement, and education as instruments of food policy.</p>', GRADUATE: '<h2>Food Governance</h2><p>Multi-level governance, stakeholder participation, and coordinating across sectors.</p>', PHD: '<h2>Research Frontiers</h2><p>Policy process analysis, power in food systems, and pathways to transformation.</p>' } }],
    activities: [{ id: 'fs-pol-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Make Good Rules!', MIDDLE_SCHOOL: 'Program Design', HIGH_SCHOOL: 'Policy Proposal', UNDERGRADUATE: 'Instrument Analysis', GRADUATE: 'Governance Design', PHD: 'Process Analysis' }, description: { ELEMENTARY: 'Create rules to help everyone eat!', MIDDLE_SCHOOL: 'Design a food program.', HIGH_SCHOOL: 'Propose a food policy.', UNDERGRADUATE: 'Analyze policy instruments.', GRADUATE: 'Design food governance.', PHD: 'Analyze policy processes.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-pol-game', type: 'simulation', title: 'Food Policy Maker', description: 'Create policies for a healthy food system!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-pol-quiz', passingScore: 80, questions: [{ id: 'fpolq1', question: { ELEMENTARY: 'Who makes food rules?', MIDDLE_SCHOOL: 'What is a food policy?', HIGH_SCHOOL: 'What is a food policy council?', UNDERGRADUATE: 'What are policy instruments?', GRADUATE: 'What is multi-level governance?', PHD: 'How does power shape food policy?' }, options: { ELEMENTARY: ['Governments and leaders', 'Nobody', 'Just stores', 'Animals'], MIDDLE_SCHOOL: ['Rules about food production and access', 'Recipe books', 'Restaurant menus', 'No rules exist'], HIGH_SCHOOL: ['Group advising local government on food', 'Food court', 'Cooking council', 'No councils'], UNDERGRADUATE: ['Tools governments use to achieve policy goals', 'Musical instruments', 'Kitchen tools', 'No tools'], GRADUATE: ['Coordinating policy across local to international', 'One level only', 'No coordination', 'Random levels'], PHD: ['Corporate lobbying, political economy, agenda setting', 'No power dynamics', 'Everyone equal', 'Random outcomes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Governments and community leaders make rules to help farmers and make sure everyone can eat!', MIDDLE_SCHOOL: 'Food policies are government rules and programs about growing, selling, and accessing food.', HIGH_SCHOOL: 'Food policy councils bring together community members to advise on local food issues.', UNDERGRADUATE: 'Policy instruments include regulations, subsidies, taxes, procurement policies, and education.', GRADUATE: 'Multi-level governance coordinates food policy from local to national to international scales.', PHD: 'Power dynamics including lobbying, framing, and agenda control shape food policy outcomes.' } }] },
    externalResources: [{ title: 'Food Policy', url: 'https://www.foodpolicynetworks.org/', type: 'research' }]
  },
  {
    id: 'food-sov-regenerative',
    slug: 'regenerative-food-systems',
    title: 'Regenerative Food Systems',
    description: {
      ELEMENTARY: 'Learn how farming can make the earth healthier instead of using it up!',
      MIDDLE_SCHOOL: 'Discover food systems that heal soil, water, and communities.',
      HIGH_SCHOOL: 'Explore regenerative agriculture principles applied across food systems.',
      UNDERGRADUATE: 'Analyze regenerative food system design, metrics, and transition pathways.',
      GRADUATE: 'Examine regenerative economics, certification, and scaling strategies.',
      PHD: 'Research regenerative systems thinking, outcome measurement, and transformation.'
    },
    topic: 'food-sovereignty',
    category: 'REGENERATIVE',
    icon: 'RefreshCw',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-regen-1', title: 'Growing Better', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Healing the Earth!</h2><p>Some farming makes soil healthier and helps nature instead of hurting it!</p>', MIDDLE_SCHOOL: '<h2>Regenerative Food</h2><p>Regenerative means making things better. Regenerative food systems improve soil, water, and communities over time.</p>', HIGH_SCHOOL: '<h2>Beyond Sustainable</h2><p>Sustainability maintains current state. Regeneration actively improves ecosystems and communities.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Applying regenerative principles across production, processing, distribution, and consumption.</p>', GRADUATE: '<h2>Scaling Regeneration</h2><p>Market mechanisms, policy support, and supply chain transformation for regenerative systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Outcome-based metrics, systems change theory, and regenerative transitions.</p>' } }],
    activities: [{ id: 'fs-regen-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Heal the Land!', MIDDLE_SCHOOL: 'System Map', HIGH_SCHOOL: 'Transition Plan', UNDERGRADUATE: 'System Design', GRADUATE: 'Market Strategy', PHD: 'Metrics Development' }, description: { ELEMENTARY: 'Make the earth healthier!', MIDDLE_SCHOOL: 'Map a regenerative food system.', HIGH_SCHOOL: 'Plan a transition to regenerative.', UNDERGRADUATE: 'Design a regenerative system.', GRADUATE: 'Develop market strategies.', PHD: 'Develop outcome metrics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-regen-game', type: 'simulation', title: 'Regenerative Builder', description: 'Create food systems that heal the earth!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-regen-quiz', passingScore: 80, questions: [{ id: 'fregenq1', question: { ELEMENTARY: 'What does regenerative farming do?', MIDDLE_SCHOOL: 'What does regenerative mean?', HIGH_SCHOOL: 'How is regenerative different from sustainable?', UNDERGRADUATE: 'What is outcome-based assessment?', GRADUATE: 'What enables scaling?', PHD: 'What is systems change?' }, options: { ELEMENTARY: ['Makes soil healthier', 'Uses up the soil', 'Nothing special', 'Only grows weeds'], MIDDLE_SCHOOL: ['Making things better over time', 'Staying the same', 'Getting worse', 'No change'], HIGH_SCHOOL: ['Regenerative improves, sustainable maintains', 'Same thing', 'Sustainable is better', 'No difference'], UNDERGRADUATE: ['Measuring actual ecological and social outcomes', 'Just counting practices', 'No measurement', 'Random assessment'], GRADUATE: ['Market demand, policy support, supply chains', 'Nothing helps', 'Only grants', 'Just good intentions'], PHD: ['Fundamental shifts in how systems function', 'Small adjustments', 'No change needed', 'Just new products'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Regenerative farming makes soil healthier and helps nature thrive!', MIDDLE_SCHOOL: 'Regenerative means actively making things better - improving soil, water, and communities.', HIGH_SCHOOL: 'Sustainable maintains the current state while regenerative actively improves ecosystems.', UNDERGRADUATE: 'Outcome-based assessment measures actual improvements in soil health, biodiversity, and livelihoods.', GRADUATE: 'Scaling requires consumer demand, supportive policy, and supply chain partners committed to regeneration.', PHD: 'Systems change involves fundamental shifts in structures, relationships, and mental models.' } }] },
    externalResources: [{ title: 'Regenerative Agriculture', url: 'https://regenerationinternational.org/', type: 'research' }]
  },
  {
    id: 'food-sov-resilience',
    slug: 'food-system-resilience',
    title: 'Food System Resilience',
    description: {
      ELEMENTARY: 'Learn how communities make sure they can always get food, even when problems happen!',
      MIDDLE_SCHOOL: 'Discover how food systems can bounce back from disasters and disruptions.',
      HIGH_SCHOOL: 'Explore food system vulnerabilities, resilience strategies, and emergency planning.',
      UNDERGRADUATE: 'Analyze resilience frameworks, vulnerability assessment, and adaptation strategies.',
      GRADUATE: 'Examine food system shocks, adaptive capacity, and transformation pathways.',
      PHD: 'Research resilience theory, complex adaptive systems, and food security under uncertainty.'
    },
    topic: 'food-sovereignty',
    category: 'RESILIENCE',
    icon: 'Shield',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-resil-1', title: 'Food When We Need It', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Always Having Food!</h2><p>Communities plan ahead so they can still get food even when storms or other problems happen!</p>', MIDDLE_SCHOOL: '<h2>Bouncing Back</h2><p>Resilient food systems can recover from floods, droughts, pandemics, and other disruptions.</p>', HIGH_SCHOOL: '<h2>Vulnerabilities</h2><p>Long supply chains, lack of diversity, and climate change create food system weaknesses.</p>', UNDERGRADUATE: '<h2>Resilience Framework</h2><p>Robustness, redundancy, flexibility, and resourcefulness as components of food system resilience.</p>', GRADUATE: '<h2>Adaptive Capacity</h2><p>Building capacity to respond, learn, and transform in response to shocks and stresses.</p>', PHD: '<h2>Research Frontiers</h2><p>Complex adaptive systems, transformation, and resilience under deep uncertainty.</p>' } }],
    activities: [{ id: 'fs-resil-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Emergency Food Plan!', MIDDLE_SCHOOL: 'Resilience Test', HIGH_SCHOOL: 'Vulnerability Map', UNDERGRADUATE: 'Framework Analysis', GRADUATE: 'Capacity Building', PHD: 'Systems Model' }, description: { ELEMENTARY: 'Plan for food emergencies!', MIDDLE_SCHOOL: 'Test food system resilience.', HIGH_SCHOOL: 'Map food system vulnerabilities.', UNDERGRADUATE: 'Analyze resilience frameworks.', GRADUATE: 'Build adaptive capacity.', PHD: 'Model complex food systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-resil-game', type: 'simulation', title: 'Resilience Builder', description: 'Prepare food systems for any challenge!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-resil-quiz', passingScore: 80, questions: [{ id: 'fresilq1', question: { ELEMENTARY: 'Why plan for food emergencies?', MIDDLE_SCHOOL: 'What is a resilient food system?', HIGH_SCHOOL: 'What makes food systems vulnerable?', UNDERGRADUATE: 'What is redundancy?', GRADUATE: 'What is adaptive capacity?', PHD: 'What are complex adaptive systems?' }, options: { ELEMENTARY: ['So we always have food', 'No reason', 'Just for fun', 'Food appears magically'], MIDDLE_SCHOOL: ['One that recovers from disruptions', 'A perfect system', 'No disruptions ever', 'Never changes'], HIGH_SCHOOL: ['Long supply chains and low diversity', 'Being too strong', 'Too much local food', 'Perfect weather'], UNDERGRADUATE: ['Having backup sources and pathways', 'Having only one option', 'No backups needed', 'Random choices'], GRADUATE: ['Ability to respond, learn, and transform', 'Staying the same', 'Ignoring problems', 'No learning'], PHD: ['Systems with many interacting parts that adapt', 'Simple systems', 'No interaction', 'Static systems'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Planning ahead means we can still get food even when storms or problems happen!', MIDDLE_SCHOOL: 'Resilient food systems can bounce back from floods, droughts, and other disruptions.', HIGH_SCHOOL: 'Long supply chains, dependence on few sources, and climate change increase vulnerability.', UNDERGRADUATE: 'Redundancy means having multiple sources and pathways so failures dont cause collapse.', GRADUATE: 'Adaptive capacity is the ability to respond to shocks, learn from experience, and transform when needed.', PHD: 'Complex adaptive systems have many interacting parts that self-organize and evolve over time.' } }] },
    externalResources: [{ title: 'Food Resilience', url: 'https://www.resilience.org/food/', type: 'research' }]
  },
  {
    id: 'food-sov-indigenous',
    slug: 'indigenous-food-ways',
    title: 'Indigenous Food Ways',
    description: {
      ELEMENTARY: 'Learn how Indigenous peoples have grown and gathered food for thousands of years!',
      MIDDLE_SCHOOL: 'Discover traditional food knowledge and Indigenous food systems.',
      HIGH_SCHOOL: 'Explore Indigenous agriculture, food sovereignty movements, and cultural preservation.',
      UNDERGRADUATE: 'Analyze Indigenous food systems, decolonization, and traditional ecological knowledge.',
      GRADUATE: 'Examine Indigenous rights, food sovereignty policy, and knowledge co-production.',
      PHD: 'Research Indigenous methodologies, biocultural heritage, and food system transformation.'
    },
    topic: 'food-sovereignty',
    category: 'CULTURE',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-indig-1', title: 'Traditional Food Knowledge', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Ancient Wisdom!</h2><p>Indigenous peoples have known how to grow and gather food in harmony with nature for thousands of years!</p>', MIDDLE_SCHOOL: '<h2>Traditional Knowledge</h2><p>Indigenous food systems include traditional crops, gathering practices, and ecological knowledge passed down through generations.</p>', HIGH_SCHOOL: '<h2>Food Sovereignty Movements</h2><p>Indigenous communities are revitalizing traditional foods to improve health and assert cultural identity.</p>', UNDERGRADUATE: '<h2>Decolonizing Food</h2><p>Reconnecting with traditional foods addresses health disparities and cultural loss from colonization.</p>', GRADUATE: '<h2>Knowledge Co-Production</h2><p>Ethical research partnerships that respect Indigenous intellectual property and protocols.</p>', PHD: '<h2>Research Frontiers</h2><p>Indigenous methodologies, biocultural heritage conservation, and food sovereignty scholarship.</p>' } }],
    activities: [{ id: 'fs-indig-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Traditional Foods!', MIDDLE_SCHOOL: 'Knowledge Map', HIGH_SCHOOL: 'Sovereignty Project', UNDERGRADUATE: 'Decolonization', GRADUATE: 'Partnership Design', PHD: 'Methodology Research' }, description: { ELEMENTARY: 'Learn about traditional foods!', MIDDLE_SCHOOL: 'Map traditional food knowledge.', HIGH_SCHOOL: 'Design a sovereignty project.', UNDERGRADUATE: 'Analyze decolonization.', GRADUATE: 'Design ethical partnerships.', PHD: 'Research Indigenous methods.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-indig-game', type: 'simulation', title: 'Traditional Food Keeper', description: 'Preserve and share traditional food knowledge!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-indig-quiz', passingScore: 80, questions: [{ id: 'findigq1', question: { ELEMENTARY: 'Who has food knowledge from long ago?', MIDDLE_SCHOOL: 'What is traditional ecological knowledge?', HIGH_SCHOOL: 'What is Indigenous food sovereignty?', UNDERGRADUATE: 'What does decolonizing food mean?', GRADUATE: 'What is knowledge co-production?', PHD: 'What are Indigenous methodologies?' }, options: { ELEMENTARY: ['Indigenous peoples', 'Nobody', 'Only scientists', 'Only farmers'], MIDDLE_SCHOOL: ['Knowledge passed down about nature and food', 'Only written science', 'New discoveries', 'No such knowledge'], HIGH_SCHOOL: ['Right of Indigenous peoples to control their food systems', 'Government food control', 'No control', 'Corporate food control'], UNDERGRADUATE: ['Reconnecting with traditional foods and practices', 'Colonial food only', 'Ignoring tradition', 'No change'], GRADUATE: ['Research partnerships respecting Indigenous knowledge', 'Extracting knowledge', 'No partnership', 'One-way research'], PHD: ['Research approaches grounded in Indigenous worldviews', 'Only Western methods', 'No methods', 'Random approaches'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Indigenous peoples have food knowledge passed down for thousands of years!', MIDDLE_SCHOOL: 'Traditional ecological knowledge is wisdom about nature and food passed through generations.', HIGH_SCHOOL: 'Indigenous food sovereignty is the right of Indigenous peoples to define their own food systems.', UNDERGRADUATE: 'Decolonizing food means reconnecting with traditional foods and practices disrupted by colonization.', GRADUATE: 'Knowledge co-production involves equal partnerships respecting Indigenous intellectual property.', PHD: 'Indigenous methodologies are research approaches grounded in Indigenous worldviews and ethics.' } }] },
    externalResources: [{ title: 'Indigenous Food', url: 'https://firstnations.org/knowledge-center/food-sovereignty/', type: 'research' }]
  },
  {
    id: 'food-sov-finance',
    slug: 'food-system-finance',
    title: 'Food System Finance',
    description: {
      ELEMENTARY: 'Learn how money helps farmers grow food and bring it to stores!',
      MIDDLE_SCHOOL: 'Discover how food businesses get funding to grow and sell food.',
      HIGH_SCHOOL: 'Explore farm finance, food enterprise funding, and investment in food systems.',
      UNDERGRADUATE: 'Analyze agricultural credit, food venture capital, and impact investing.',
      GRADUATE: 'Examine food system finance flows, blended capital, and investment strategies.',
      PHD: 'Research financial system transformation, patient capital, and food system investment theory.'
    },
    topic: 'food-sovereignty',
    category: 'FINANCE',
    icon: 'DollarSign',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'fs-fin-1', title: 'Money for Food', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Farm Funding!</h2><p>Farmers need money to buy seeds, equipment, and land. Banks and investors help them get started!</p>', MIDDLE_SCHOOL: '<h2>Food Business Finance</h2><p>Farms, food processors, and grocery stores all need funding to operate and grow.</p>', HIGH_SCHOOL: '<h2>Finance Options</h2><p>Farm loans, grants, investors, and crowdfunding help food businesses at different stages.</p>', UNDERGRADUATE: '<h2>Agricultural Credit</h2><p>Farm Credit System, microfinance, and the unique challenges of financing agriculture.</p>', GRADUATE: '<h2>Impact Investing</h2><p>Investments seeking social and environmental returns alongside financial returns.</p>', PHD: '<h2>Research Frontiers</h2><p>Financial system transformation, patient capital, and food system investment flows.</p>' } }],
    activities: [{ id: 'fs-fin-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fund a Farm!', MIDDLE_SCHOOL: 'Business Plan', HIGH_SCHOOL: 'Finance Options', UNDERGRADUATE: 'Credit Analysis', GRADUATE: 'Impact Portfolio', PHD: 'System Analysis' }, description: { ELEMENTARY: 'Help farmers get funding!', MIDDLE_SCHOOL: 'Create a food business plan.', HIGH_SCHOOL: 'Compare finance options.', UNDERGRADUATE: 'Analyze agricultural credit.', GRADUATE: 'Design an impact portfolio.', PHD: 'Analyze food finance systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'fs-fin-game', type: 'simulation', title: 'Food Finance Manager', description: 'Fund sustainable food businesses!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-fin-quiz', passingScore: 80, questions: [{ id: 'ffinq1', question: { ELEMENTARY: 'Why do farmers need money?', MIDDLE_SCHOOL: 'What do food businesses need funding for?', HIGH_SCHOOL: 'What is a farm loan?', UNDERGRADUATE: 'What is the Farm Credit System?', GRADUATE: 'What is impact investing?', PHD: 'What is patient capital?' }, options: { ELEMENTARY: ['To buy seeds, equipment, and land', 'No reason', 'Money grows on trees', 'Farms are free'], MIDDLE_SCHOOL: ['Equipment, inventory, and expansion', 'Nothing', 'Farms need no money', 'Only big farms'], HIGH_SCHOOL: ['Money borrowed to operate or expand a farm', 'Farm gift', 'Free money', 'No such thing'], UNDERGRADUATE: ['Government-sponsored agricultural lender', 'Any bank', 'No system', 'Farm Bureau'], GRADUATE: ['Investments seeking social and financial returns', 'Only profit', 'Charity only', 'No returns'], PHD: ['Long-term capital tolerating lower near-term returns', 'Quick returns only', 'No patience', 'Standard investing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Farmers need money to buy seeds, equipment, land, and supplies to grow food!', MIDDLE_SCHOOL: 'Food businesses need funding for equipment, inventory, facilities, and growth.', HIGH_SCHOOL: 'Farm loans are borrowed money farmers use to buy land, equipment, or operating expenses.', UNDERGRADUATE: 'The Farm Credit System is a network of cooperative lenders serving agriculture.', GRADUATE: 'Impact investing seeks measurable social and environmental impact alongside financial returns.', PHD: 'Patient capital accepts longer time horizons and lower returns to support systemic change.' } }] },
    externalResources: [{ title: 'Food Finance', url: 'https://www.cdfa.net/cdfa/cdfaweb.nsf/pages/food-systems-finance.html', type: 'research' }]
  },
  {
    id: 'food-sov-future',
    slug: 'future-of-food',
    title: 'Future of Food: Masterclass',
    description: {
      ELEMENTARY: 'Imagine what food and farming will be like when you grow up!',
      MIDDLE_SCHOOL: 'Explore innovations shaping the future of food and agriculture.',
      HIGH_SCHOOL: 'Examine emerging technologies, trends, and visions for future food systems.',
      UNDERGRADUATE: 'Analyze food system scenarios, emerging technologies, and transformation pathways.',
      GRADUATE: 'Examine food futures research, foresight methods, and visioning for change.',
      PHD: 'Research anticipatory governance, food system transformation, and long-term change.'
    },
    topic: 'food-sovereignty',
    category: 'FUTURES',
    icon: 'Rocket',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: true,
    lessons: [{ id: 'fs-future-1', title: 'Food of Tomorrow', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Future Food!</h2><p>In the future, we might grow food in new ways - in cities, in oceans, or even in space!</p>', MIDDLE_SCHOOL: '<h2>Food Innovation</h2><p>Vertical farms, lab-grown meat, precision agriculture, and new crops are changing how we produce food.</p>', HIGH_SCHOOL: '<h2>Emerging Trends</h2><p>Climate adaptation, alternative proteins, automation, and changing diets will reshape food systems.</p>', UNDERGRADUATE: '<h2>Scenario Planning</h2><p>Exploring multiple possible futures helps prepare for uncertainty and guide action.</p>', GRADUATE: '<h2>Foresight Methods</h2><p>Trend analysis, scenario development, and backcasting to envision and create desired futures.</p>', PHD: '<h2>Research Frontiers</h2><p>Anticipatory governance, transformation research, and shaping long-term food system change.</p>' } }],
    activities: [{ id: 'fs-future-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Dream the Future!', MIDDLE_SCHOOL: 'Innovation Explorer', HIGH_SCHOOL: 'Trend Analysis', UNDERGRADUATE: 'Scenario Building', GRADUATE: 'Foresight Practice', PHD: 'Transformation Research' }, description: { ELEMENTARY: 'Imagine future food!', MIDDLE_SCHOOL: 'Explore food innovations.', HIGH_SCHOOL: 'Analyze food system trends.', UNDERGRADUATE: 'Build food system scenarios.', GRADUATE: 'Practice foresight methods.', PHD: 'Research transformation.' }, config: { ELEMENTARY: { scenarios: 4, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 5, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 6, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 7, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 8, hints: false, timeLimit: 90 }, PHD: { scenarios: 10, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-future-game', type: 'simulation', title: 'Food Futurist', description: 'Design the food system of tomorrow!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-future-quiz', passingScore: 80, questions: [{ id: 'ffutureq1', question: { ELEMENTARY: 'Where might we grow food in the future?', MIDDLE_SCHOOL: 'What is a vertical farm?', HIGH_SCHOOL: 'What is an alternative protein?', UNDERGRADUATE: 'What is scenario planning?', GRADUATE: 'What is backcasting?', PHD: 'What is anticipatory governance?' }, options: { ELEMENTARY: ['In cities, oceans, and even space!', 'Only on farms', 'Nowhere new', 'Underground only'], MIDDLE_SCHOOL: ['Indoor farm growing food in stacked layers', 'Tall outdoor farm', 'Mountain farm', 'No such thing'], HIGH_SCHOOL: ['Protein from plants, insects, or cells instead of livestock', 'Regular meat', 'No protein', 'Only beans'], UNDERGRADUATE: ['Exploring multiple possible futures to guide decisions', 'Predicting one future', 'No planning', 'Random guessing'], GRADUATE: ['Starting from desired future and working backward', 'Only forward planning', 'No method', 'Forecasting'], PHD: ['Preparing for and shaping emerging issues', 'Only reacting', 'No governance', 'Past governance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'In the future we might grow food in tall buildings in cities, floating farms in oceans, and even in space!', MIDDLE_SCHOOL: 'Vertical farms grow food indoors in stacked layers, using less water and land than traditional farms.', HIGH_SCHOOL: 'Alternative proteins include plant-based meats, insect protein, and cell-cultured meat.', UNDERGRADUATE: 'Scenario planning explores multiple possible futures to inform strategy and decision-making.', GRADUATE: 'Backcasting starts from a desired future vision and works backward to identify steps to get there.', PHD: 'Anticipatory governance develops proactive approaches to emerging technologies and challenges.' } }] },
    externalResources: [{ title: 'Future of Food', url: 'https://www.wri.org/initiatives/food', type: 'research' }]
  }
]
