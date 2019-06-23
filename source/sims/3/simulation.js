/*******************************************************
 * ServiceDesk-3 - An example of a discrete event simulation.
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany) + ODU (VA, USA)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
 ********************************************************/
/*******************************************************
 Simulation Parameters
********************************************************/
//scenario.name = "...";  // optional
//scenario.title = "...";  // optional
sim.scenario.simulationEndTime = 200;
//sim.scenario.randomSeed = 12345;  // optional
sim.config.createLog = true;
//sim.scenario.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.time = "continuous";
sim.model.timeRoundingDecimalPlaces = 2;
sim.model.timeUnit = "m";  // minutes

sim.model.objectTypes = ["ServiceDesk"];
sim.model.eventTypes = ["CustomerArrival"];
sim.model.activityTypes = ["PerformService"];
/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "ServiceDesk", name:"sd1", shortLabel:"sd1", queueLength: 0}
};
sim.scenario.initialState.events = [
  {typeName: "CustomerArrival", occTime:1, serviceDesk:"1"}
];
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "arrivedCustomers": {range:"NonNegativeInteger", label:"Arrived customers"},
  "departedCustomers": {range:"NonNegativeInteger", label:"Departed customers"},
  "maxQueueLength": {objectType:"ServiceDesk", objectIdRef: 1,
      property:"queueLength", aggregationFunction:"max", label:"Max. queue length"}
};
