/*******************************************************
 * ConsecutiveServices - An example of a discrete event simulation.
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany) + ODU (VA, USA)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
 ********************************************************/
/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 200;
sim.scenario.idCounter = 11;  // start value of auto IDs
//sim.scenario.randomSeed = 2345;  // optional
sim.config.createLog = true;
//sim.scenario.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.objectTypes = ["ServiceProvider", "Customer"];
sim.model.eventTypes = ["CustomerArrival"];
sim.model.activityTypes = ["Service"];
/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "ServiceProvider", name:"reception", nextServiceProvider: 2},
  "2": {typeName: "ServiceProvider", name:"caseHandling"}
};
sim.scenario.initialState.events = [
  {typeName: "CustomerArrival", occTime: 1, serviceProvider: 1}
];
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "arrivedCustomers": {range:"NonNegativeInteger", label:"Arrived customers"},
  "departedCustomers": {range:"NonNegativeInteger", label:"Departed customers"},
  "cumulativeTimeInSystem": {range:"Decimal"},
  "meanTimeInSystem": { range: "Decimal",  label:"Average time in system",
    computeOnlyAtEnd: true, decimalPlaces: 1, unit: "min",
    expression: function () {
      return sim.stat.cumulativeTimeInSystem / sim.stat.departedCustomers}
  }
};
