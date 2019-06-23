/*******************************************************
 * ServiceDesk-2 - An example of a discrete event simulation.
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
 ********************************************************/
/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 1000;
sim.scenario.idCounter = 11;  // start value of auto IDs
//scenario.randomSeed = 5;  // optional
sim.config.createLog = true;
//scenario.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.time = "continuous";
sim.model.timeRoundingDecimalPlaces = 3;
sim.model.timeUnit = "m";  // minutes

sim.model.objectTypes = ["ServiceDesk", "Customer"];
sim.model.eventTypes = ["CustomerArrival", "CustomerDeparture"];
sim.model.constraints = {
  "nonEmptyQueue-implies-DepartureEvt": function () {
    var departureEvtExists = sim.FEL.containsEventOfType("CustomerDeparture");
    if (sim.namedObjects["sd1"].queueLength > 0) return departureEvtExists;  // there must be a departure
    else return !departureEvtExists;  // there must not be a departure
  }
};

sim.model.v.arrivalEventRate =  {
  range:"Decimal",
  label:"Arrival event rate",
  initialValue: 0.5
};

/* Define an experiment */
/*
sim.experiment = new oes.ExperimentDef({
  id: 1,
  scenarioNo: 1,
  experimentNo: 1,
  experimentTitle: "Test",
  replications: 10,
  seeds: [123, 234, 345, 456, 567, 678, 789, 890, 901, 12],
  parameterDefs: [
    new oes.ExperimentParamDef({name:"arrivalEventRate", values:[0.4, 0.5, 0.6]})
  ]
});
*/
sim.experiment.id = 1;
sim.experiment.experimentNo = 1;  // sequence number relative to simulation scenario
sim.experiment.title = "Test";
sim.experiment.replications = 10;
sim.experiment.seeds = [1,2,3,4,5,6,7,8,9,10];
sim.experiment.parameterDefs = [
  {name:"arrivalEventRate", values:[0.4, 0.5, 0.6]}
];
sim.experiment.storeEachExperimentScenarioRun = true;
sim.experiment.timeSeriesStatisticsVariables = ["arrivedCustomers","departedCustomers"];

/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "ServiceDesk", name: "sd1", shortLabel:"sd1", waitingCustomers:[]}
};
sim.scenario.initialState.events = [
  {typeName: "CustomerArrival", occTime: 1, serviceDesk: 1}
];
/*
sim.scenario.setupInitialState = function () {
  var sD = new ServiceDesk({id: 1, queueLength: 0});
  var c = new Customer({id: 2, arrivalTime: 1});
  sim.addObject( sD);
  sim.addObject(c);
  sim.scheduleEvent( new CustomerArrival({occTime:1, serviceDesk: sD, customer: c}));
}
*/
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "arrivedCustomers": {range:"NonNegativeInteger", label:"Arrived customers", showTimeSeries: true},
  "departedCustomers": {range:"NonNegativeInteger", label:"Departed customers"},
  "cumulativeTimeInSystem": {range:"Decimal"},
  "meanTimeInSystem": { range: "Decimal",  label:"Avg. time in system ("+ sim.model.timeUnit +")",
    computeOnlyAtEnd: true, decimalPlaces: 1, unit: "min",
    expression: function () {
      return sim.stat.cumulativeTimeInSystem / sim.stat.departedCustomers}
  }
};
