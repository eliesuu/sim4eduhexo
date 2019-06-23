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
sim.model.name = "ThreeConsecutiveWorkstations-1";
sim.model.title = "Three Consecutive Manufacturing Workstations with Machine Failures";
sim.model.systemNarrative = "A manufacturing company uses an assembly line of three consecutive workstations.";
sim.model.shortDescription = "A Processing Network model defining an entry node for arriving parts, " +
    "three consecutive processing nodes representing manufacturing workstations, and an exit node for departing products.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2018-12-05";
sim.model.modified = "2019-01-08";
