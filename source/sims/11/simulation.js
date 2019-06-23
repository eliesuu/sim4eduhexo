/*******************************************************
 * ProcessingNetwork-1 - An example of an OES Processing Network simulation.
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany) + ODU (VA, USA)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
 ********************************************************/
/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 300;
sim.scenario.idCounter = 11;  // start value of auto IDs
sim.scenario.randomSeed = 2345;  // optional
sim.config.createLog = true;
sim.config.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.time = "continuous";
sim.model.timeRoundingDecimalPlaces = 2;  // like in 3.85

/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "eNTRYnODE", name:"custEntry", successorNode: 2, maxNmrOfArrivals: 100},
  "2": {typeName: "pROCESSINGnODE", name:"receptDesk", successorNode: 3},
  "3": {typeName: "pROCESSINGnODE", name:"caseDesk", successorNode: 4,
        // define a non-default duration
        randomDuration: function () {return rand.exponential( 1);}},
  "4": {typeName: "eXITnODE", name:"custExit"}
};
