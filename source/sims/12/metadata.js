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
sim.model.name = "ServiceDesk-4";
sim.model.title = "A Processing Network Model of a Service Desk";
sim.model.systemNarrative = "The customers arriving at a service desk (or service station) " +
    "have to wait in a queue when the service desk is busy. Otherwise, when the queue is empty " +
    "and the service desk is not busy, they are immediately served by the service clerk. " +
    "Whenever a service is completed, the served customer departs and the next customer from " +
    "the queue, if there is any, will be served.";
sim.model.shortDescription = "The service desk is modeled as a processing node of a " +
    "processing network that has an entry node and an exit node for arriving and departing " +
    "customers. The model is based on the pre-defined Processing Network concepts eNTRYnODE, " +
    "pROCESSINGnODE and eXITnODE, such that processing objects 'flow through the system' " +
    "by entering it through an arrival event at an entry node, then passing one or more " +
    "processing nodes while participating in their processing activities, and finally " +
    "leaving it through a departure event at an exit node. The simulation scenario just " +
    "instantiates one entry node, one processing node (the 'serviceDesk') and one exit " +
    "node.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-12-27";
sim.model.modified = "2017-01-04";
