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
sim.model.name = "ConsecutiveServices-1";
sim.model.title = "An Activity-Based Model of Consecutive Services";
sim.model.systemNarrative = "The customers of the Department of Motor Vehicles first have to " +
    "queue up at the reception for their request being recorded. Then they have to wait for a " +
    "clerk who will handle their case.";
sim.model.shortDescription = "Both the reception and the case handling are modeled as service " +
    "providers with waiting lines, resulting in a model of two consecutive services with queues. For both " +
    "service providers, utilization statistics are computed automatically by the simulator. " +
    "The model includes two object types: <i>ServiceProvider</i> and <i>Customer</i>, one event type: " +
    "CustomerArrival, and one activity type: Service, which is instantiated both by the reception " +
    "service and the case handling service.";
// meta data
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-12-07";
sim.model.modified = "2017-01-02";
