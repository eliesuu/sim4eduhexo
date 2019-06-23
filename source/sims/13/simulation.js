/*******************************************************
 * FourConsecutiveMachines-3 - An example of a discrete event simulation.
 *
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany) + ODU (VA, USA)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
 ********************************************************/
/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 100;
sim.scenario.idCounter = 11;  // start value of auto IDs
sim.scenario.randomSeed = 2345;  // optional
sim.config.createLog = false;
//sim.config.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.time = "continuous";
sim.model.timeRoundingDecimalPlaces = 1;  // like in 3.8

// fixed model parameters
sim.model.v.orderEventRate =  {
  range:"Decimal", initialValue: 0.75,
  label:"Order event rate"
};
sim.model.v.revenuePerOrder =  {
  range:"Decimal", initialValue: 15,
  label:"Revenue per order"
};
sim.model.v.backlogCostsPerOrderPerTimeUnit =  {
  range:"Decimal", initialValue: 0.1,
  label:"Backlog costs",
  hint:"Backlog costs per order and timeUnit"
};
sim.model.v.manuCostsPerOrder =  {
  range:"Decimal", initialValue: 11,
  label:"Manuf. costs per order"
};

/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "eNTRYnODE", name:"orderEntry", successorNode: 2,
        arrivalRecurrence: function () { return rand.exponential( sim.v.orderEventRate);}},
  "2": {typeName: "pROCESSINGnODE", name:"M1", successorNode: 3,
        randomDuration: function () { return rand.triangular(0.5, 1.5, 1);}},
  "3": {typeName: "pROCESSINGnODE", name:"M2", successorNode: 4,
        randomDuration: function () { return rand.triangular(0.5, 1.5, 1);}},
  "4": {typeName: "pROCESSINGnODE", name:"M3", successorNode: 5,
        randomDuration: function () { return rand.triangular(1, 2, 1.5);}},
  "5": {typeName: "pROCESSINGnODE", name:"M4", successorNode: 6,
        randomDuration: function () { return rand.triangular(0.5, 1.5, 1);}},
  "6": {typeName: "eXITnODE", name:"orderExit",
        onDeparture: function () {
          var backlogQuantity = sim.stat.arrivedOrders - sim.stat.departedOrders;
          sim.stat.revenue += sim.v.revenuePerOrder;
          sim.stat.manuCosts += sim.v.manuCostsPerOrder;
          sim.stat.backlogCosts += sim.v.backlogCostsPerOrderPerTimeUnit * backlogQuantity;
          return [];
        }}
};
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "arrivedOrders": {objectType:"eNTRYnODE", objectIdRef: 1, property:"nmrOfArrivedObjects"},
  "departedOrders": {objectType:"eXITnODE", objectIdRef: 6, property:"nmrOfDepartedObjects"},
  "revenue": {range:"Decimal", label:"Revenue", unit: "T€"},
  "manuCosts": {range:"Decimal", label:"Manuf. costs", unit: "T€"},
  "backlogCosts": {range:"Decimal", label:"Backlog costs", unit: "T€"},
  "profit": { range: "Decimal",  label:"Profit",
    computeOnlyAtEnd: true, decimalPlaces: 1, unit: "T€",
    expression: function () {
      return sim.stat.revenue - (sim.stat.manuCosts + sim.stat.backlogCosts)}
  }
};
