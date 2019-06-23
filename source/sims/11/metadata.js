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
sim.model.name = "ConsecutiveServices-2";
sim.model.title = "A Processing Network Model of Two Consecutive Services";
sim.model.systemNarrative = "The customers of the Department of Motor Vehicles first have to " +
    "queue up at the reception for their request being recorded. Then they have to wait for a " +
    "clerk who will handle their case.";
sim.model.shortDescription = "Both the reception desk and the case handling desk are " +
    "modeled as processing nodes (with input queues) within a processing network that has " +
    "an entry node and an exit node for arriving and departing customers. The model is " +
    "based on the pre-defined OES Processing Network concepts eNTRYnODE, pROCESSINGnODE and " +
    "eXITnODE, such that processing objects are 'flowing through the system' by entering it " +
    "through an arrival event at an entry node, then passing one or more processing nodes while " +
    "participating in their processing activities, and finally leaving it through a departure event " +
    "at an exit node. The simulation scenario just instantiates one entry node, two processing nodes " +
    "('receptDesk' and 'caseDesk') and one exit node.";
// meta data
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-12-15";
sim.model.modified = "2016-12-27";
