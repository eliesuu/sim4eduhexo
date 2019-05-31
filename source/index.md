<section class="description"><h1>Web-Based Simulation for Science and Education</h1>
<div>
     <p>The <em>Simulation for Education (Sim4edu</em>) project website supports web-based simulation
      with open source technologies for science and education. It provides both <b><i>simulation
       technologies</i></b> and a <b><i>library of educational simulations</i></b>. Its goal is to support various
      styles of modeling and simulation, including <em>discrete event</em> simulation,
      <em>NetLogo</em>-style grid space models (and <em>Cellular Automata</em> models), and
      <em>agent</em>-based simulation.</p>
     <p>As opposed to traditional simulation technologies, <em>web-based</em> simulations,
      typically implemented with JavaScript, can be executed in any web browser, not just on desktop
      computers, but also on mobile devices like tablets and smartphones. This allows sharing
      simulations by means of simple web links and makes them easily accessible to anyone anywhere.
     </p>
    </div>
   </section>
   <section class="sim-category" id="ad-hoc-sim">
    <h1>Examples of ad-hoc simulation programs</h1>
    <p>... not based on any simulation paradigm or framework.</p>
    <dl>
     <dt><a href="http://play.elevatorsaga.com">Elevator Saga</a></dt>
     <dd>Learning how to code by programming an elevator.</dd>
     <dt><a href="http://www.natureincode.com/code/various/ants.html">JavaScript Ants</a></dt>
     <dd><img src="img/ant.svg" style="float:right; margin: 0 6px 0 1em;" width="50" id="ant" />A simulation about ants finding food and bringing it back to the nest. Once an ant finds food, she leaves a chemical trail behind while walking back to the nest. The chemical substance evaporates over time, and other ants simply follow the gradient of the substance until they find the food.</dd>
     <dt><a href="http://www.traffic-simulation.de/">Roundabout</a></dt>
     <dd>Microsimulation of traffic flow.</dd>
    </dl>
   </section>
   <section class="sim-category" id="DES">
    <h1>Examples of Discrete Event Simulation (DES) </h1>
    <p>... with fixed-increment time progression.</p>
    <dl>
     <dt><a href="sims/25/index.html">Susceptible-Infected-Recovered (SIR) Disease Model</a></dt>
     <dd>An epidemiological model about the infection dynamics of a contagious disease in a closed population.
      See also <a href="https://insightmaker.com/insight/2944/SIR-Model">a continuous SIR model</a>.</dd>
    </dl>
    <p>... with next-event time progression.</p>
    <dl>
     <dt><a href="sims/4/index.html">Inventory Management</a></dt><dd><img src="img/forklift.svg" style="float:right; margin: 4px 6px 0 1em;" width="60" />An inventory
     management system with a continuous replenishment policy based on a reorder point.</dd>
     <dt><a href="sims/10/index.html">DriveThru</a></dt><dd><img src="img/drive-through-blue.svg" style="float:right; margin: 0 6px 0 1em"
                                                                 title="Icon CC 3.0 BY Freepik (www.freepik.com) from www.flaticon.com" width="70" />The order processing activities of a drive through
     restaurant are performed at three service points with queues: the <em>order taking</em> at the menu board, the <em>order preparation</em>
     at the kitchen and the <em>order pickup</em> at the pickup window.</dd>
     <dt><a href="sims/20/index.html">Lengnick's Baseline Economy</a></dt><dd><img src="img/factory.svg" style="float:right; margin: 0 6px 0 1em;" width="60" /> <!-- /LengnickBaselineEconomy-1 -->
     Households play the roles of em&shy;ploy&shy;ees and con&shy;sumers, while firms play the roles of employers and producers.</dd>
    </dl>
    <p><a href="des-models/index.html">More...</a></p>
   </section>
   <section class="sim-category" id="grid-space">
    <h1>Examples of Grid Space Models</h1>
    <p>... with fixed-increment time progression.</p>
    <dl>
     <dt><a href="sims/16/index.html">Gossip Model</a></dt>
	    <dd>A Cellular Automata model about the problem of spreading gossip.</dd>
     <dt><a href="sims/6/index.html">Schelling Segregation Model</a></dt>
	    <dd><img src="img/SchellingGrid.png" style="float:right; margin: 6px 6px 0 1em;" width="46" height="59" />
	     A residential area is popu&shy;lated by resi&shy;dents belonging to different groups. Periodically, all
      residents check if they are content with their neighborhood, based on their degree of
      tolerating neighbors of a different group. If they are not, they move to a location where they
      are content, or leave the area if they don't find such a location.</dd>
    </dl>
    <p><a href="gridspace-models/index.html">More...</a></p>
   </section>
   <section class="sim-category" id="contin">
    <h1>Examples of Continuous Simulation</h1>
    <p>... with continuous state changes driven by fixed-increment time progression.</p>
    <dl>
      <dt><a href="sims/15/index.html">Solar System</a></dt><dd>Implemented with CSS 3D animations.</dd>
      <dt><a href="https://29a.ch/sandbox/2010/galaxy/">Galaxy</a></dt><dd>A spiral galaxy with
      5000 stars (by Jonas Wagner, 2010-08-18).</dd>
     <dt><a href="https://insightmaker.com/insight/1954/The-World3-Model">World3</a></dt>
     <dd>A <em>System Dynamics</em> model of the interactions between population, industrial growth, food production
      and limits in the ecosystems of the Earth. Reconstructed with <a href="https://insightmaker.com/">Insight Maker</a>.</dd>
    </dl>
    <p><a href="continuous-models/index.html">More...</a></p>
   </section>
  </main>
  <aside><h1>News...</h1>
   <ul>
    <li>8-Apr-2019: We are looking for <strong>volunteer translators</strong> to Spanish, Brazilian, French or any language you'd like to support. 
	 Please <a href="mailto:G.Wagner@b-tu.de?subject=Sim4edu%20Translation&body=Hi%20guys!%0D%0AI'd%20like%20to%20help%20with%20translating%20Sim4edu%20to%20...">contact us</a> 
	 if you can help  with this.</li>
    <li>3-Apr-2019: The Sim4edu website and its OESjs simulations has been internationalized: now also available in
     Chinese and in German (soon).</li>
    <li>8-Jan-2019: OESjs 1.3e has been released: solving issues with Processing Network simulation and adding summary statistics to experiments.</li>
    <li>19-Sep-2018: OESjs 1.3c has been released: additional user interfaces for inspecting code, initial events and experiments.</li>
    <li>28-July-2018: OESjs 1.3b has been released. Now supporting a user interface for setting model variables.</li>
    <li>9-May-2018: OESjs 1.3a has been released. It allows defining simulation experiments and runs faster due to running the simulator in its own (worker) thread.</li>
    <li>4-May-2018: The Sim4edu website has moved to Netlify</li>
   </ul>
</aside>