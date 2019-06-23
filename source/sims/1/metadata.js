var sim = sim || {};
sim.model = sim.model || {};
sim.scenario = sim.scenario || {};
sim.config = sim.config || {};

var oes = oes || {};
oes.ui = oes.ui || {};
oes.ui.explanation = {};
oes.ui.i18n = {transDates:{}, changeDates:{}};

/*******************************************************
 Simulation Model
********************************************************/
sim.model.name = "ServiceDesk-1";
sim.model.title = "A Service Queue Model with Utilization and Maximum Queue Length Statistics";
oes.ui.i18n.changeDates.title = "2017-04-19";
sim.model.systemNarrative = "The customers arriving at a service desk have to wait in a queue " +
    "when the service desk is busy. Otherwise, when the queue is empty and the service desk is not busy, " +
    "they are immediately served by the service clerk. Whenever a service is completed, the served " +
    "customer departs and the next customer from the queue, if there is any, will be served.";
oes.ui.i18n.changeDates.systemNarrative = "2017-04-19";
sim.model.shortDescription = "A service queue model (one service and one queue) with two statistics: " +
    "maximum queue length and service utilization. For simplicity, the model uses abstract (discrete) "+
    "time and abstracts away from individual customers and from the composition of the queue, " +
    "which is only represented in terms of its length. The model includes one object type: " +
    "<i>ServiceDesk</i>, and two event types: <i>CustomerArrival</i> and <i>CustomerDeparture</i>. The random "+
    "time variable for the recurrence of customer arrival events has a discrete uniform distribution and " +
    "the random time variable for modeling the duration of services has a discrete empirical distribution.";
oes.ui.i18n.changeDates.shortDescription = "2019-04-01";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-06-01";
sim.model.modified = "2017-04-19";
