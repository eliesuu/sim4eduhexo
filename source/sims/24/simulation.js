/*******************************************************
 * OESjs / FourConsecutiveMachines-3
 ********************************************************/
/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 168 * 60;
//sim.scenario.simulationEndTime = 50;
sim.scenario.idCounter = 11;  // start value of auto IDs
sim.scenario.randomSeed = 4;  // optional
/*******************************************************
 Simulation Configuration
 ********************************************************/
sim.config.createLog = false;
sim.config.isConstraintCheckingTurnedOn = true;
//sim.config.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.time = "continuous";
sim.model.timeUnit = "m";
sim.model.timeRoundingDecimalPlaces = 2;  // like in 3.81
sim.model.eventTypes = ["Breakdown", "RepairEnd"];

// model variables
sim.model.v.partArrivalRecurrenceMean =  {
  range:"Decimal", initialValue: 6,
  label:"Arrival recurr. mean (min.)",
  hint:"The mean time between part arrivals (in minutes)",
  unit: "min"
};
sim.model.v.failureRecurrenceMean =  {
  range:"Decimal", initialValue: 39.9,
  label:"Failure recurr. mean (hrs.)",
  hint:"The mean time between repairs and the next machine failures (in hours)"
};
/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "eNTRYnODE", name:"partEntry", successorNode: 2,
        arrivalRecurrence: function () { return rand.exponential( 1/sim.v.partArrivalRecurrenceMean);}},
  "2": {typeName: "pROCESSINGnODE", name:"WS1", successorNode: 3,
        randomDuration: function () { return rand.triangular( 3, 8, 4);}},
  "3": {typeName: "pROCESSINGnODE", name:"WS2", successorNode: 4,
        randomDuration: function () { return rand.frequency({"6.3":0.6, "9.3":0.4});}},
  "4": {typeName: "pROCESSINGnODE", name:"WS3", successorNode: 5, fixedDuration: 7.0},
  "5": {typeName: "eXITnODE", name:"productExit"}
};
sim.scenario.initialState.events = [
  {typeName:"Breakdown", occTime: 35*60, workStation: 2},
  {typeName:"Breakdown", occTime: 40*60, workStation: 3},
  {typeName:"Breakdown", occTime: 45*60, workStation: 4}
];
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "arrivedObjects": {label:"Arrived parts"},
  "departedObjects": {label:"Departed products"}
};
/*******************************************************
 Define Experiment
 ********************************************************/
sim.experiment.id = 1;
sim.experiment.experimentNo = 1;
sim.experiment.title = "Simple experiment (without parameters)";
sim.experiment.replications = 10;
sim.experiment.seeds = [1,2,3,4,5,6,7,8,9,10];
