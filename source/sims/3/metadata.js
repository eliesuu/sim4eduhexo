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
sim.model.name = "ServiceDesk-3";
sim.model.title = "An Activity-Based Service Queue Model";
oes.ui.i18n.changeDates.title = "2018-10-01";
sim.model.systemNarrative = "The customers arriving at a service desk (or service station) have to wait " +
    "in a queue when the service desk is busy. Otherwise, when the queue is empty and the service desk is not busy, " +
    "they are immediately served by the service clerk. Whenever a service is completed, the served customer " +
    "departs and the next customer from the queue, if there is any, will be served.";
oes.ui.i18n.changeDates.systemNarrative = "2017-04-19";
sim.model.shortDescription = "A service queue model where the service is modeled as an activity with " +
    "the service desk as its resource, for which the utilization statistics is computed automatically. " +
    "The model includes one object type: ServiceDesk, one event type: CustomerArrival " +
    "and one activity type: PerformService. Since both the inter-arrival and the service times are exponentially distributed, " +
    "this model corresponds to an <a href='https://en.wikipedia.org/wiki/M/M/1_queue'>M/M/1 queue</a> in Queueing Theory.";
oes.ui.i18n.changeDates.shortDescription = "2019-03-13";  // document last change date
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-10-04";
sim.model.modified = "2016-10-18";
