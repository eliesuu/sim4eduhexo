/*******************************************************
 * ServiceDesk-3 - An example of a discrete event simulation.
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany) + ODU (VA, USA)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
 ********************************************************/
/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 4*3600;
sim.scenario.timeUnit = "s";
sim.scenario.idCounter = 11;  // start value of auto IDs
//sim.scenario.randomSeed = 2345;  // optional
sim.config.createLog = false;
//sim.config.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.objectTypes = ["Customer", "MenuBoard", "Kitchen", "PickupWindow"];
sim.model.eventTypes = ["CustomerArrival"];
sim.model.activityTypes = ["OrderTaking", "OrderPreparation", "OrderPickup"];

sim.model.f.twoDice = function () {
  return rand.uniformInt(1,6) + rand.uniformInt(1,6)
};

/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "MenuBoard", name:"mb", maxLineSize: 3,
        waitingCustomers:[], kitchen: 2, pickupWindow: 3},
  "2": {typeName: "Kitchen", name:"ki",
        waitingOrders:[], pickupWindow: 3},
  "3": {typeName: "PickupWindow", name:"pw", maxLineSize: 3,
        waitingCustomers:[], preparedOrders:[], menuBoard: 1}
};
sim.scenario.initialState.events = [
  {typeName: "CustomerArrival", occTime: 1, menuBoard: 1}
];
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "lostCustomers": {range:"NonNegativeInteger", label:"Lost customers"},
  "arrivedCustomers": {range:"NonNegativeInteger", label:"Arrived customers"},
  "departedCustomers": {range:"NonNegativeInteger", label:"Departed customers"},
  "revenue": { range: "Decimal", label:"Revenue", unit: "$"},
  "lostRevenue": { range: "Decimal", label:"Lost revenue", unit: "$"},
  "cumulativeTimeInSystem": {range:"Decimal"},
  "meanTimeInSystem": { range: "Decimal",  label:"Time in system",
    computeOnlyAtEnd: true, decimalPlaces: 1, unit: "s",
    expression: function () {
      return sim.stat.cumulativeTimeInSystem / sim.stat.departedCustomers}
  }
};
