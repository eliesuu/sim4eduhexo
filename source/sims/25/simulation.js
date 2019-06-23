/*******************************************************************************
 * Susceptible-Infectious-Recovered model
 *
 * @copyright Copyright 2019 Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 ******************************************************************************/
/*******************************************************************************
 * Simulation Parameters
 ******************************************************************************/
sim.scenario.simulationEndTime = 2000;
sim.scenario.idCounter = 0; // optional
// sim.scenario.randomSeed = 1234; // optional
/*******************************************************************************
 * Simulation Configuration
 ******************************************************************************/
// sim.config.stepDuration = 0; // optional
// sim.config.createLog = false; // optional
// sim.config.userInteractive = false; // optional
// sim.config.visualize = false; // optional
/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.time = "discrete";
sim.model.timeUnit = "D"; // days
sim.model.timeIncrement = 1; // optional

sim.model.objectTypes = [ "Person" ];
sim.model.eventTypes = [];
sim.model.activityTypes = [];

/*******************************************************************************
 * Global Variable and Global Function
 ******************************************************************************/
/* Global Variables */
sim.model.v.nmrOfPeople = {
  range: "PositiveInteger",
  initialValue: 1000,
  label: "Number of Individuals"
};
sim.model.v.initialInfectious = {
  range: "PositiveInteger",
  initialValue: 10,
  label: "Number of Infectious",
  hint: "Initial number of people infectious"
};
sim.model.v.beta = {
  range: "PositiveDecimal",
  initialValue: 0.031,
  label: "Beta",
  hint: "Transmission rate"
};
sim.model.v.gamma = {
  range: "PositiveDecimal",
  initialValue: 0.015,
  label: "Gamma",
  hint: "Recovery rate"
};
sim.model.v.totalInfected = {
  range: "NonNegativeInteger",
  initialValue: 0
};
// 0: Susceptible, 1: Infectious, 2: Recovered
sim.model.v.nmrOfPeoplePerState = {
  range: Object,
  initialValue: [ 0, 0, 0 ]
};

/*******************************************************************************
 * Define Initial State
 ******************************************************************************/
sim.scenario.setupInitialState = function () {
  var i, state, person;
  var n = sim.v.initialInfectious;

  var probBeta = -1 * Math.log( 1 - sim.v.beta );
  var probGamma = -1 * Math.log( 1 - sim.v.gamma );

  // Create People
  for ( i = 1; i <= sim.v.nmrOfPeople; i += 1 ) {

    if ( n > 0 ) {
      state = 1;
      n -= 1;
      sim.stat.totalInfected += 1;
    } else {
      state = 0;
    }

    person = new Person( {
      id: i,
      state: state,
      probTransmission: probBeta,
      probRecovery: probGamma
    } );
    sim.addObject( person );
  }
  sim.v.totalInfected = sim.v.initialInfectious - n;
};

/*******************************************************************************
 * Define Experiment
 ******************************************************************************/
// sim.experiment.id = 1;
// sim.experiment.experimentNo = 1;
// sim.experiment.title = "Basic";
// sim.experiment.parameterDefs = [
//   new oes.ExperimentParamDef(
//     { name: "beta", values: [ 0.031, 0.25 ] } ),
//   new oes.ExperimentParamDef(
//     { name: "gamma", values: [ 0.015, 0.125 ] } )
// ];
// sim.experiment.replications = 10;
// sim.experiment.seeds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
// sim.experiment.storeEachExperimentScenarioRun = true;

/*******************************************************************************
 * Execution
 ******************************************************************************/
sim.model.OnEachTimeStep = function () {
  var person1, person1State, person1NewState;
  var person2, person2State, person2NewState;
  var infectious = [];
  var persons = cLASS[ "Person" ].instances;
  var personIDs = Object.keys( persons );
  var nmrOfPersons = personIDs.length;

  sim.v.nmrOfPeoplePerState = [ 0, 0, 0 ];

  rand.shuffleArray( personIDs );

  while ( nmrOfPersons > 1 ) {
    person1 = persons[ personIDs[ nmrOfPersons - 1 ] ];
    person2 = persons[ personIDs[ nmrOfPersons - 2 ] ];

    person1State = person1.state;
    person2State = person2.state;

    person1NewState = person1.state;
    person2NewState = person2.state;

    if ( person1State === 1 ) {
      infectious.push( person1 );
      person2NewState = person2.interact( person1 );
    }

    if ( person2State === 1 ) {
      infectious.push( person2 );
      person1NewState = person1.interact( person2 );
    }

    sim.v.nmrOfPeoplePerState[ person1NewState ] += 1;
    sim.v.nmrOfPeoplePerState[ person2NewState ] += 1;

    nmrOfPersons -= 2;
  }

  infectious.forEach( function ( person ) {
    if ( person.recover() ) {
      sim.v.nmrOfPeoplePerState[ 1 ] -= 1;
      sim.v.nmrOfPeoplePerState[ 2 ] += 1;
    }
  } );
};

/*******************************************************************************
 * Define Output Statistics Variables
 ******************************************************************************/
sim.model.statistics = {
  "totalInfected": {
    range: "NonNegativeInteger",
    label: "Number of Infected",
    initialValue: 0,
    computeOnlyAtEnd: true,
    expression: function () {
      return sim.v.totalInfected;
    }
  },
  "percSusceptible": {
    range: "PositiveDecimal",
    label: "% Susceptible",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      return sim.v.nmrOfPeoplePerState[ 0 ] / sim.v.nmrOfPeople;
    }
  },
  "percInfectious": {
    range: "PositiveDecimal",
    label: "% Infectious",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      return sim.v.nmrOfPeoplePerState[ 1 ] / sim.v.nmrOfPeople;
    }
  },
  "percRecovered": {
    range: "PositiveDecimal",
    label: "% Recovered",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      return sim.v.nmrOfPeoplePerState[ 2 ] / sim.v.nmrOfPeople;
    }
  }
};