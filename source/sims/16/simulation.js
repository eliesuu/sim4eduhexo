/*******************************************************
 * Gossip - An example of a discrete event simulation.
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany) + ODU (VA, USA)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
********************************************************/

/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 100;
sim.config.stepDuration = 200;  // 200 ms observation time per step
sim.config.visualize = true;
/*******************************************************
 Simulation Model
********************************************************/
// Space model
sim.model.space.type = "IntegerGrid";
sim.model.space.xMax = 100;
sim.model.space.yMax = 100;

sim.model.f.sampleGossipSpreadProbability = function () {
  return rand.uniformInt( 0, 1);  // for creating a 50% probability
};
/**
 * Check all 4 neighbor cells (N/E/S/W) if their value is 1
 */
sim.model.f.getNmrOfGossipNeighbors = function (x,y) {
  var nmrOfGossipNeighbors=0;
  // check North neighbor
  if (oes.space.grid.i.getCellValue( x, y+1) === 1) {
    nmrOfGossipNeighbors += 1;
  }
  // check East neighbor
  if (oes.space.grid.i.getCellValue( x+1, y) === 1) {
    nmrOfGossipNeighbors += 1;
  }
  // check South neighbor
  if (oes.space.grid.i.getCellValue( x, y-1) === 1) {
    nmrOfGossipNeighbors += 1;
  }
  // check West neighbor
  if (oes.space.grid.i.getCellValue( x-1, y) === 1) {
    nmrOfGossipNeighbors += 1;
  }
  return nmrOfGossipNeighbors;
};

sim.model.OnEachTimeStep = function () {
  var xMax = sim.model.space.xMax,
      yMax = sim.model.space.yMax;
  oes.space.grid.forAllCells( function (x,y) {
    var nmrOfGossipNeighbors = sim.model.f.getNmrOfGossipNeighbors(x,y),
        i = 0;
    for (i=0; i < nmrOfGossipNeighbors; i=i+1) {
      if (sim.model.f.sampleGossipSpreadProbability() === 1) {
        oes.space.grid.i.setCellValue( xMax-x+1, yMax-y+1, 1);
        break;
      }
    }
  });
};
/**********************************************************
 Define the initial state of the simulation 
***********************************************************/
sim.scenario.setupInitialState = function () {
  var xMax = sim.model.space.xMax,
      yMax = sim.model.space.yMax,
      xInitialGossip = Math.round( xMax/2),
      yInitialGossip = Math.round( yMax/2);
  oes.space.grid.i.setCellValue( xInitialGossip, yInitialGossip, 1);
};
