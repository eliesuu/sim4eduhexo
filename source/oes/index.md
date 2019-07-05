---
layout: area-page
title: Object Event Modeling And Simulation
metatitle: Object Event Modeling And Simulation
metadesc: About Object Event Modeling and Simulation, a general Discrete Event Simulation approach.
---
<aside>
<h3>Papers</h3>
	 <dl style="padding-left:0"><dt>OEM</dt>
		<dd>Gerd Wagner. <a href="https://articles.jsime.org/1/1/">Information and Process Modeling for Simulation – Part I: Objects and Events</a>. <em>Journal of Simulation Engineering</em> 1:1, 2018.</dd>
		<dt>OES</dt>
		<dd>Gerd Wagner. <a href="https://www.informs-sim.org/wsc17papers/includes/files/056.pdf">An Abstract State Machine Semantics For Discrete Event Simulation</a>. <em>Proceedings of the 2017 Winter Simulation Conference</em>. In: W. K. V. Chan et al (Eds.). Piscataway, NJ: IEEE.</dd>
		<dt>A/OEM&amp;S</dt>
		<dd>Gerd Wagner and Luis G. Nardin. <a href="https://oxygen.informatik.tu-cottbus.de/publications/wagner/WSC2018-AgentConcepts.pdf">Adding Agent Concepts to Object Event Modeling and Simulation</a>. <em>Proceedings of the 2018 Winter Simulation Conference</em>. In: M. Rabe et al (Eds.). Piscataway, NJ: IEEE.</dd>
	 </dl>
	</aside>
<p>Object Event Modeling and Simulation (OEM&amp;S) is a general <em>Discrete Event Simulation</em> paradigm combining <em>object-oriented</em> modeling with the <em>event scheduling</em> paradigm. 
In OEM, the state structure of a system can be modeled with UML Class Diagrams defining both object and event types, and the system's dynamics can be modeled with conceptual process models (expressed, e.g., in BPMN) and process design models (expressed, e.g., in <a href="../reading/DPMN.pdf">DPMN</a>).</p>

<p><em>Agent/Object Event Simulation (A/OES)</em>, is an extension of basic OES by adding the concepts of <em>agents</em>, <em>perception</em>, <em>action</em> and <em>communication</em>.</p>

<p>Sim4edu currently provides the <em>OESjs</em> simulation framework, which is a JavaScript implementation of the OES paradigm, or, more precisely, of its language OESL and its abstract simulator <em>Omega-Epsilon-Sigma </em>(ΩΕΣ) that supports both <em>next-event time progression</em>, as used in discrete event simulation, and <em>fixed-increment time progression</em>, as used in <em>NetLogo</em>-based social science simulations as well as in continuous state change simulations. The next simulator/framework on the roadmap of Sim4edu implements the <em>A/OES paradigm</em> for agent-based discrete event simulation and is called <em>A-OESjs</em>.</p>

<p>A real-world <em>discrete event system</em> (or <em>discrete dynamic system</em>) consists of:</p>

<ul>
	<li>objects (of certain types) whose states may be changed by</li>
	<li>events (of certain types) occurring at a point in time from a discrete set of time points.</li>
</ul>

<p>This means that in order to model a discrete event system using OES, we have to</p>

<ol>
	<li>Describe its <em><strong>object types</strong></em> and <em><strong>event types</strong></em>.</li>
	<li>Specify, for any event type, which <em>causal regularity</em>, responsible for <em><strong>state changes</strong></em> of objects and <em><strong>follow-up events</strong></em>, is triggered by events of that type. Causal regularities are captured by <strong><em>event rules</em></strong>.</li>
</ol>

<p>The <em><strong>OES language</strong></em> (OESL) allows defining:</p>

<ol>
	<li><em>Object types</em> in the form of classes (of an object-oriented language like UML or JavaScript),</li>
	<li><em>Event types</em> in the form of classes, and their <em>event rules</em> in the form of a special&nbsp;<em>onEvent</em> method in the corresponding event class.</li>
</ol>

<p>OESL is a historic successor of <a href="https://oxygen.informatik.tu-cottbus.de/aors/ERSL.html">ERSL</a>, since the OES paradigm has been developed as a continuation of an earlier R&amp;D project called <a href="http://oxygen.informatik.tu-cottbus.de/aor/?q=node/24"><em>Entity-Relationship Modeling and Simulation</em></a>. Likewise, A/OESL is a historic successor of <a href="https://oxygen.informatik.tu-cottbus.de/aors/AORSL.html">AORSL</a>, since the A/OES paradigm has been developed as a continuation of an earlier R&amp;D project called <a href="http://oxygen.informatik.tu-cottbus.de/aor/"><em>Agent-Object-Relationship Simulation</em></a>.</p>

<p>In OES, two categories of simulated events are distinguished:</p>

<ol>
	<li><em>Exogenous events </em>occur, periodically, due to factors that are external to the simulation model. Their re-occurrence pattern is modeled in the form of a <em><strong>recurrence</strong></em> function.</li>
	<li><em>Caused events</em> are simulated events that are caused by other simulated events.</li>
</ol>

<p>An OES <strong><em>scenario</em></strong> consists of:</p>

<ul>
	<li>An <em>OES model</em> defining <em>object types</em> and <em>event types</em> (with <em>event rules</em>), as well as <em>output statistics</em>. It may include a <em>space model</em> definition.</li>
	<li><em>Simulation parameter</em> definitions, like the length of the simulation or a seed for the random number generator.</li>
	<li>An <em>initial state</em> definition.</li>
</ul>

<p>An OES <strong><em>model</em></strong> may include definitions of</p>

<ul>
	<li><em>Object types</em></li>
	<li><em>Event types</em> with <em>event rules</em> defining the causation of state changes and follow-up events</li>
	<li>A <em>time model</em>: either discrete or continuous time</li>
	<li>A <em>space model</em> such as a grid space or a 2D/3D continuous space</li>
	<li><em>Statistics variables</em></li>
	<li><em>Global model variables</em> and/or <em>functions</em></li>
</ul> 

<p>An OES scenario simulation can be configured with</p>

<ul>
	<li>A <em>visualization</em> definition (like a 3D visualization of a 2D space model)</li>
	<li>A <em>user interaction</em> definition for making simulation games</li>
	<li>Various <em>user interface (UI)</em> definitions, e.g. a UI for defining the initial state or a UI for defining the form of visualization</li>
</ul>
</main>