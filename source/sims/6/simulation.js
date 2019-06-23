/*******************************************************
 * Predator-Prey - An example of a discrete event simulation.
 * @copyright Copyright 2016 Gerd Wagner, BTU (Germany) + ODU (VA, USA)
 * @author Gerd Wagner
 * @license The MIT License (MIT)
********************************************************/

/*******************************************************
 Simulation Parameters
********************************************************/
sim.scenario.simulationEndTime = 10;

sim.config.stepDuration = 200;  // observation time per step in ms
sim.config.visualize = true;
sim.config.createLog = false;
// set grid cell size (default: 3)
//sim.config.observationUI.spaceView.gridCellSize = 1;
/*******************************************************
 Simulation Model
********************************************************/
sim.model.objectTypes = ["GroupOfResidents"];
// Space model
sim.model.space.type = "IntegerGrid";
sim.model.space.xMax = 120;
sim.model.space.yMax = 60;
// model variables
sim.model.v.neigborHoodRadius =  {
  range:"PositiveInteger", initialValue: 1,
  label:"Neigborhood radius"
};
sim.model.v.uncontentResidents =  {  // a list used as a global store
  range: Array, initialValue: []
};
sim.model.v.populationDensity =  {
  range:"UnitInterval", label:"Population density", initialValue: 0.6
};
/*
 * Compute the percentage of neighbors from different groups
 */
sim.model.f.neighbDiffLevel = function (posX, posY, groupNo) {
  var xMax = sim.model.space.xMax,
      yMax = sim.model.space.yMax;
  var neighboursCount = 0, neighboursOfDifferentGroupCount = 0;
  var cellValue = 0, x = 0, y = 0;
  var radius = sim.v.neigborHoodRadius || 1;
  // scan all residents in the neighbourhood not considering the current location
  for (x = Math.max( posX-radius, 1); x <= Math.min( posX+radius, xMax); x++) {
    for (y = Math.max( posY-radius, 1); y <= Math.min( posY+radius, yMax); y++) {
      if (!(x === posX && y === posY)) {
        cellValue =  sim.space.grid[(y-1)*xMax + x-1] & 15;  //lower 4 bits
        if (cellValue !== 0) {
          neighboursCount++;
          if (cellValue !== groupNo) neighboursOfDifferentGroupCount++;
        }
      }
    }
  }
  if (neighboursCount === 0) return 0;  // no different neighbors
  else return neighboursOfDifferentGroupCount / neighboursCount;
};

sim.model.OnEachTimeStep = function () {
  var i=0, xR=0, yR=0, g=0, N=0, pos=[], newPos=[];
  var xMax = sim.model.space.xMax,
      yMax = sim.model.space.yMax,
      neighbDiffLevel = sim.model.f.neighbDiffLevel,
      groups = cLASS["GroupOfResidents"].instances,
      cellVal = oes.space.grid.i.getCellValue;  // function reference
  //-------------------------------------------------------------
  function findAcceptableLocation( x0, y0) {
    var x = 0, y = 0, d = 0;
    var g = cellVal( x0, y0),
        tol = groups[String(g)].toleranceLevel;
    // the maximum distance of the current grid cell to one of the border lines
    var maxDistance = Math.max( Math.max( xMax-x0, x0-1), Math.max( yMax-y0, y0-1));
    for (d=1; d <= maxDistance; d++) {
      // start North clockwise
      y = y0 + d;  // inspect the line North
      if (y <= yMax) {
        for (x = Math.max( x0-d, 1); x <= Math.min( x0 + d, xMax); x++) {
          if (cellVal(x,y) === 0 && neighbDiffLevel(x,y,g) <= tol) return [x,y];
        }
      }
      x = x0 + d;  // inspect the line East
      if (x <= xMax) {
        for (y = Math.min( y0+d-1, yMax); y >= Math.max( y0-d, 1); y--) {
          if (cellVal(x,y) === 0 && neighbDiffLevel(x,y,g) <= tol) return [x,y];
        }
      }
      y = y0 - d;  // inspect the line South
      if (y >= 1) {
        for (x = Math.min( x0+d-1, xMax); x >= Math.max( x0-d, 1); x--) {
          if (cellVal(x,y) === 0 && neighbDiffLevel(x,y,g) <= tol) return [x,y];
        }
      }
      x = x0 - d;  // inspect the line West
      if (x >= 1) {
        for (y = Math.max( y0-d+1, 1); y <= Math.min( y0+d-1, yMax); y++) {
          if (cellVal(x,y) === 0 && neighbDiffLevel(x,y,g) <= tol) return [x,y];
        }
      }
    }
    return null;
  }
  //-------------------------------------------------------------
  // Pick a resident that is not content
  N = sim.v.uncontentResidents.length;
  for (i=0; i < N; i++) {
    pos = sim.v.uncontentResidents[i];
    xR = pos[0]; yR = pos[1];
    g = sim.space.grid[(yR-1)*xMax + xR-1];  // group ID
    // search for a free cell where the resident would be content
    newPos = findAcceptableLocation( xR, yR);
    if (newPos) {  // move to new location
      sim.space.grid[(newPos[1]-1)*xMax+newPos[0]-1] = g;
      sim.space.grid[(yR-1)*xMax + xR-1] = 0;
    } else {  // leave grid
      sim.space.grid[(yR-1)*xMax + xR-1] = 0;
      sim.stat.residentsWhoLeftTheGrid++;
    }
  }
  // collect all residents that are still uncontent
  sim.v.uncontentResidents = [];
  oes.space.grid.forAllCells( function (x,y) {
    var g = cellVal(x,y), tol = 0;
    if (g > 0) {
      tol = groups[String(g)].toleranceLevel;
      if (neighbDiffLevel(x,y,g) > tol) {
        sim.v.uncontentResidents.push([x,y]);
      }
    }
  });
  sim.stat.nmrOfUncontentResidents = sim.v.uncontentResidents.length;
};
/**********************************************************
 Define the initial state of the simulation system
***********************************************************/
sim.scenario.setupInitialState = function () {
  var xMax = sim.model.space.xMax;
  var grid = sim.space.grid;
  var neighbDiffLevel = sim.model.f.neighbDiffLevel,
      groups={}, nmrOfGroups=0, obj=null;
  // create GroupOfResidents instances in setupInitialState since they are used here
  if (!sim.objects["1"]) {
    obj = new GroupOfResidents({
      id:1, name:"Blue", toleranceLevel: 0.5
    });
    sim.addObject( obj);
  }
  if (!sim.objects["2"]) {
    obj = new GroupOfResidents({
      id:2, name:"Red", toleranceLevel: 0.9
    });
    sim.addObject( obj);
  }
  groups = cLASS["GroupOfResidents"].instances;
  nmrOfGroups = Object.keys( groups).length;
  //TODO: find bug responsible for changing the values of sim.model.v.uncontentResidents.initialValue
  // This is a workaround to be dropped when bug is found
  sim.v.uncontentResidents = [];
  // populate a portion of the grid cells
  oes.space.grid.forAllCells( function (x,y) {
    var groupNo = 0;
    if (Math.random() < sim.v.populationDensity) {
      // pick a random group number
      groupNo = rand.uniformInt( 1, nmrOfGroups);
      // mark cell as occupied
      grid[(y-1)*xMax + x - 1] = groupNo;
    } else {
      // mark cell as free
      grid[(y-1)*xMax + x - 1] = 0;
    }
  });
  // collect all uncontent residents
  oes.space.grid.forAllCells( function (x,y) {
    var g = oes.space.grid.i.getCellValue( x, y),  // group number
        tol = 0.0;
    if (g > 0) {  // cell is occupied by a resident
      tol = groups[String(g)].toleranceLevel;
      if (neighbDiffLevel(x,y,g) > tol) {
        sim.v.uncontentResidents.push([x,y]);
      }
    }
  });
  sim.stat.nmrOfUncontentResidents = sim.v.uncontentResidents.length;
};
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "residentsWhoLeftTheGrid": {range:"NonNegativeInteger", label:"Residents gone"},
  "nmrOfUncontentResidents": {
    range:"NonNegativeInteger",
    label:"Uncontent residents",
    showTimeSeries: true
  }
};
