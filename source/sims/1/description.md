---
layout: description
title: A Single Service Desk Queueing System Model with Utilization and Maximum Queue Length Statistics
metatitle: Single Service Desk Queueing System Model | sim4edu.com
metadesc: A service queue model with two statistics maximum queue length and service utilization. The model uses abstract time & abstracts away from individual customers
ogtitle: Single Service Desk Queueing System Model | Two statistics | sim4edu.com
ogdesc: A service queue model with two statistics maximum queue length and service utilization. The model uses abstract time & abstracts away from individual customers
lang: en
---
  <section class="mbd collapsed"><h2><span>►</span>Conceptual Model <sup class="expl-req">?</sup></h2>
   <div id="expl-CM" class="expl"></div>

   <section><h3>Conceptual Information Model <sup class="expl-req">?</sup></h3>
     <div id="expl-CIM" class="expl"></div>
     <p>The potentially relevant object types are:</p>
<!--
     <figure class="right-float">
       <img src="CIM-ObjT.svg" width="450"/>
       <figcaption>A conceptual model describing object types.</figcaption>
     </figure>
-->
     <ol>
       <li>customers,</li>
       <li>service desks,</li>
       <li>service queues,</li>
       <li>service clerks.</li>
     </ol>
     <p>Notice that it seems preferable (more natural) to separate the service queue from the service desk and
       not consider the customer that is currently being served at the service desk to be part of the queue.</p>
     <p>Conceptually, a queue is a linearly ordered collection of objects of a certain type with a First-In-First-Out
       policy: the next object to be removed is the first object, at the front of the queue, while additional
       objects are added at the end of the queue.</p>
     <p>Potentially relevant types of events are:</p>
     <ol>
       <li>customer arrivals,</li>
       <li>customers queuing up,</li>
       <li>customers being notified/invited to move forward to the service desk,</li>
       <li>service start,</li>
       <li>service end,</li>
       <li>customer departures.</li>
     </ol>
     <p>Notice that a pair of start and end events, like "service start" and "service end", indicates that there is
      an activity that is temporally framed by these two events. It's an option to consider also activities, in addition
      to objects and events, in a conceptual model. We will do this in our <a href="https://sim4edu.com/sims/3/description.html">
      3rd simulation model</a> of the service desk system.</p>
     <p>Both object types and event types, together with their participation associations, can be visually described in
       a UML class diagram, as shown below.</p>
     <figure>
       <img src="media/img/CIM.svg" width="600" alt="cim"/>
       <figcaption>A conceptual information model describing object types and event types.</figcaption>
     </figure>
   </section>

   <section>
     <h3>Conceptual Process Model <sup class="expl-req">?</sup></h3>
     <div id="expl-CPM" class="expl"></div>
     <table>
       <caption>Event rules.</caption>
       <thead>
       <tr>
         <th>ON (event type)</th><th>DO (event routine)</th><th>Rule Diagram</th>
       </tr>
       </thead>
       <tbody>
       <tr>
         <td>customer arrival</td>
         <td>If the service desk is busy, then the new customer queues up,
           else the service starts.</td>
         <td><img src="media/img/Arrival_CRM.svg" width="250" alt="arrival crm"/></td>
       </tr>
       <tr>
         <td>service start</td>
         <td>After some time, the service ends.</td>
         <td><img src="media/img/ServiceStart_CRM.svg" width="250" alt="service start crm"/></td>
       </tr>
       <tr>
         <td>service end</td>
         <td>The served customer departs. If there are still customers waiting in the queue,
           then the next service starts.</td>
         <td><img src="media/img/ServiceEnd_CRM.svg" width="250" alt="service end crm"/></td>
       </tr>
       </tbody>
     </table>
     <p>The involved types of events can be related with each other via their (possibly conditional) temporal succession,
      as visualized in the following BPMN process diagram:</p>
     <figure>
       <img src="media/img/CPM.svg" width="600" alt="cpm"/>
       <figcaption>A conceptual process diagram integrating the event rule diagrams.</figcaption>
     </figure>
   </section>
 </section>

 <section class="mbd collapsed"><h2><span>►</span>Simulation Design Model <sup class="expl-req">?</sup></h2>
   <div id="expl-DM" class="expl"></div>

   <section><h3>Information Design Model <sup class="expl-req">?</sup></h3>
     <div id="expl-IDM" class="expl"></div>
     <p>In the current simulation project, the purpose of the simulation model is to compute two statistics:
       the <em>service utilization</em> and <em>the maximum queue length</em>. We may therefore abstract away from many
       of the object types from the conceptual information model:</p>
     <ul>
       <li> <code>Customer</code>: we don't need any information about individual customers;</li>
       <li> <code>ServiceQueue</code>: we don't need to know who is next, it's sufficient to know <em>the length of the queue</em>;</li>
       <li> <code>ServiceDesk</code>: we don't need any information about the service desks, the information if
         <em>the service desk is busy</em> or not is obtained by testing if the queue's length is greater than 0.</li>
       <li> <code>ServiceClerk</code>: we don't need any information about service clerks.</li>
     </ul>
     <p>Consequently, a computational design for the purpose of computing the two statistics <em>maximum queue length</em>
       and <em>service utilization</em> is obtained by modeling only one object type: <b><code>ServiceDesk</code></b> with
       one (integer-valued) attribute <code>queueLength</code>, and with one random variable <code>serviceDuration()</code>
       expressed in the form of a special kind of function.</p>
     <p>Concerning the event types described in the conceptual information model, the goal is to keep
       only those of them, which are really needed, in the design model. This question is closely related
       to the question, which types of state changes and follow-up event creation have to be modeled for
       being able to answer the research question(s).</p>
     <p>In the case of the given two research questions, we need to keep track of changes of the queue length
       and we need to be able to add up the service durations. For keeping track of queue length changes,
       we need to consider all types of events that may change the queue length: <em>customer arrivals</em> and
       <em>customer departures</em>. For being able to add up the service durations, we need to catch <em>service start</em>
       and <em>service end events</em>.</p>
     <p>After identifying the relevant event types, we can look for further simplification opportunities
      by analyzing their possible temporal coincidence. Clearly, we can consider customer departures
      to occur immediately after the corresponding service end events, without having any effects that
      could not be merged. Therefore, we can drop service end events, and take care of their effects
      (the cumulative service time computation) when handling the related customer departure event.</p>
     <p>In addition, we can drop service start events, since they temporally coincide with customer
      arrivals when the queue is empty, or otherwise (when the queue is not empty) they coincide
      with service end (and, hence, with customer departure) events, because each service end event
      causes a new service start event as long as the queue is not empty.</p>
     <p>As a result of the above considerations, we get the following two types of events:</p>
     <ul>
       <li><b><code>CustomerArrival</code></b> with a reference property <code>serviceDesk</code> with range
         <code>ServiceDesk</code>. As an exogenous event type, <code>CustomerArrival</code> has a
         <code>recurrence</code> function representing a random variable for computing the time in-between
         two subsequent event occurrences.</li>
       <li><b><code>CustomerDeparture</code></b> with a reference property <code>serviceDesk</code> with range
         <code>ServiceDesk</code>.</li>
     </ul>
     <p>Notice that, for simplicity, we consider the customer that is currently being served to be part of the queue.
      In this way, in the simulation program, we can check if the service desk is busy by testing if the length of
      the queue is greater than 0.</p>
     <p>An alternative approach would be not considering the currently served customer as
       part of the queue, but rather use a Boolean attribute <code>isBusy</code> for being able to keep track if the
       service desk ist still busy with serving a customer.</p>
     <p>The object types and event types described above, together with their participation associations
       ("service desks participate in customer arrival events and in customer departure events"),
       are visually described in the following UML class diagram:</p>
     <figure>
       <img src="media/img/IDM.svg" width="500" alt="idm"/>
       <figcaption>An information design model describing object types and event types.</figcaption>
     </figure>
     <p>Notice how functions representing random variables, like <code>serviceDuration()</code> and <code>recurrence()</code>,
       are marked with the keyword (or UML stereotype) «rv» standing for "random variable".</p>
   </section>
   <section><h3>Process Design Model <sup class="expl-req">?</sup></h3>
     <div id="expl-PDM" class="expl"></div>
     <table>
       <caption>Event rule design table.</caption>
       <thead>
       <tr>
         <td>ON (event type)</td><td>DO (event routine)</td>
       </tr>
       </thead>
       <tbody>
       <tr>
         <td>CustomerArrival( sd) @ t</td>
         <td style="font-size:smaller">
           INCREMENT sd.queueLength<br/>
           IF sd.queueLength = 1<br/>
           THEN SCHEDULE CustomerDeparture( sd) @ (t + sd.serviceDuration())
         </td>
       </tr>
       <tr>
         <td>CustomerDeparture( sd) @ t</td>
         <td style="font-size:smaller">
           DECREMENT sd.queueLength<br/>
           IF sd.queueLength > 0<br/>
           THEN SCHEDULE CustomerDeparture( sd) @ (t + sd.serviceDuration())
         </td>
       </tr>
       </tbody>
     </table>
     <table>
       <caption>From conceptual event rule models to rule design models.</caption>
       <thead>
        <tr><th>Conceptual rule models</th><th>Rule design models</th></tr>
       </thead>
       <tbody>
        <tr>
         <td><img src="media/img/Arrival_CRM.svg" width="250" alt="arrival crm"/></td>
         <td><img src="media/img/Arrival_RDM.svg" width="450" alt="arrival rdm"/></td>
        </tr>
        <tr>
         <td><img src="media/img/ServiceStart_CRM.svg" width="250"/></td>
          <td rowspan="2"><img src="media/img/Departure_RDM.svg" width="450" alt="departure rdm"/></td>
        </tr>
        <tr>
         <td><img src="media/img/ServiceEnd_CRM.svg" width="250" alt="service end crm"/></td>
        </tr>
       </tbody>
     </table>
     <figure>
       <img src="media/img/PDM.svg" width="700" alt="pdm"/>
       <figcaption>A process design model integrating both event rule design models.</figcaption>
     </figure>
   </section>
 </section>

 <section class="mbd collapsed"><h2><span>►</span>See also</h2>
  <section><h3>Other OES Models for the Same System/Problem/Domain</h3>
   <ol>
     <!--
     <li><a href="../1/index.html">ServiceDesk-1</a>: A service queue model
       (one service and one queue) with two statistics: <i>maximum queue length</i> and <i>service utilization</i>.
       The model abstracts away from individual customers and from the composition of the queue.</li>
     -->
     <li><a href="../2/index.html">ServiceDesk-2</a>: A service queue model
       (one service and one queue) with one statistic: the Mean Response Time, which is the average length of time
       a customer spends in the system from arrival to departure. For recording their arrival time, individual
       customers are represented explicitly in a <i>waitingCustomers</i> queue.</li>
     <li><a href="../3/index.html">ServiceDesk-3</a>: A service queue model where the service
       is modeled as an activity with the service desk as its resource, for which the utilization statistics
       is computed automatically.</li>
     <li><a href="../12/index.html">ServiceDesk-4</a>: A service queue model where the
       service desk is modeled as a processing node of a processing network that has an entry node and
       an exit node for arriving and departing customers. The model is based on the pre-defined
       <i>Processing Network</i> concepts: WorkObject, Arrival, EntryNode, ProcessingNode and ExitNode,
       such that processing objects 'flow through the system'.</li>
     <li><a href="../9/index.html">ConsecutiveServices</a>: An activity-based
       service queue model of two consecutive service providers with customer waiting lines.</li>
     <li><a href="../11/index.html">ProcessingNetwork-1</a>: A service queue model
       where service providers are modeled as processing nodes (with input queues) within a processing network
       that has an entry node and an exit node for arriving and departing customers. The model is based on
       the pre-defined <i>Processing Network</i> concepts: WorkObject, Arrival, EntryNode, ProcessingNode and ExitNode,
       such that processing objects 'flow through the system'.</li>
   </ol>
  </section>
  <section><h2>Similar Models Implemented with Other Frameworks</h2>
   <ol>
     <li><a href="http://ccl.northwestern.edu/netlogo/models/community/Queueing_Simulation_Discrete_Event">Queueing_Simulation_Discrete_Event</a>: This NetLogo simulation uses NetLogo's tick-advance primitive to advance simulation time by non-integral amounts. However, NetLogo's standard ticks display is unable to display non-integral values, so a custom ticks display has to be programmed. Copyright 2010, Nick Bennett.</li>
   </ol>
  </section>
 </section>
