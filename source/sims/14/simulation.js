/*******************************************************
 Simulation Parameters
********************************************************/
//sim.scenario.name = "...";  // optional
//sim.scenario.title = "...";  // optional
sim.scenario.simulationEndTime = 200;
sim.scenario.randomSeed = 12345;  // optional
sim.config.createLog = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.time = "discrete";  // implies using only discrete random variables
sim.model.eventTypes = ["CustomerArrival", "CustomerDeparture"];
// global variable
sim.model.v.queueLength = {
  range:"NonNegativeInteger",
  shortLabel:"qLen",
  initialValue: 0
};
// global function
sim.model.f.serviceDuration = function () {
  return rand.frequency({"2":0.3, "3":0.5, "4":0.2});
};

/*******************************************************
 Define Initial State
********************************************************/
// Either declaratively:
sim.scenario.initialState.events = [
  {typeName: "CustomerArrival", occTime:1}
];
// Or with a procedure:
/*
sim.scenario.setupInitialState = function () {
  var sD = new ServiceDesk({id: 1, queueLength: 0, isBusy: false});
  sim.addObject( sD);
  sim.scheduleEvent( new CustomerArrival({occTime:1, serviceDesk: sD}));
}
*/
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "arrivedCustomers": {range:"NonNegativeInteger", label:"Arrived customers"},
  "departedCustomers": {range:"NonNegativeInteger", label:"Departed customers"},
  "maxQueueLength": {globalVariable:"queueLength", label:"Max. queue length",
      aggregationFunction:"max"},
  "averageQueueLength": {globalVariable:"queueLength", label:"Avg. queue length",
      aggregationFunction:"avg", decimalPlaces: 2},
  "queueLength": {globalVariable:"queueLength", showTimeSeries: true, label:"Queue length"}
};
