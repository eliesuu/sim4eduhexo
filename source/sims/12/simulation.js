/*******************************************************
 * ServiceDesk-4 - An example of a discrete event simulation.
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
sim.config.suppressInitialStateUI = true;
/*******************************************************
 Simulation Model
********************************************************/

/**
 * Modeling event recurrence and activity durations as continuous random variables
 * requires using a continuous time model with the option to round the simulation time by
 * defining the model parameter timeRoundingFactor. By default, the timeRoundingFactor
 * also determines the model parameter nextMomentDeltaT, which is the minimal time delay
 * until the next moment (corresponding to the concept of simulation time granularity).
 * Otherwise, nextMomentDeltaT can be set explicitly, as shown below.
 *
 */
sim.model.time = "continuous";
// sim.model.timeRoundingDecimalPlaces = 3;  // like in 3.752
sim.model.nextMomentDeltaT = 0.001;


/*******************************************************
 Define Initial State
********************************************************/
sim.scenario.initialState.objects = {
  "1": {typeName: "eNTRYnODE", name:"custEntry", successorNode: 2},
  "2": {typeName: "pROCESSINGnODE", name:"serviceDesk", successorNode: 3},
  "3": {typeName: "eXITnODE", name:"custExit"}
};

