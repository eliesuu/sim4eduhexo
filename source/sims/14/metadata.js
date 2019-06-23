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
sim.model.name = "ServiceDesk-0";
sim.model.title = "A Minimal Service Queue Model with Queue Length Statistics";
sim.model.systemNarrative = "The customers arriving at a service desk have to wait in a queue " +
    "when the service desk is busy. Otherwise, when the queue is empty and the service desk is not busy, they are " +
    "immediately served by the service clerk. Whenever a service is completed, the served customer departs " +
    "and the next customer from the queue, if there is any, will be served.";
sim.model.shortDescription = "A service queue model (one service and one queue) with two statistics: " +
    "maximum queue length and average queue length. The model abstracts away from individual customers and from the " +
    "composition of the queue, which is only represented in terms of its length as the value of a global variable " +
    "'queueLength'. The model includes two event types: CustomerArrival and CustomerDeparture.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2017-10-30";
sim.model.modified = "2017-10-30";
