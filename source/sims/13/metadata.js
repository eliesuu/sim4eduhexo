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
sim.model.name = "FourConsecutiveMachines-3";
sim.model.title = "A Processing Network Model of Four Consecutive Machines";
sim.model.systemNarrative = "A manufacturing company uses 4 consecutive machines.";
sim.model.shortDescription = "The simulation scenario defines an entry node for incoming orders, " +
    "four consecutive processing nodes representing the four machines M1-M4, and an exit node.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2017-01-16";
sim.model.modified = "2017-01-16";
