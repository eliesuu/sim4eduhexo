/*******************************************************************************
 * The Assist event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var Assist = new cLASS( {
  Name: "Assist",
  shortLabel: "A",
  supertypeName: "eVENT",
  properties: {
    "entrepreneur": { range: "Entrepreneur" },
    "state": { range: "State" },
    "lossAftPun": { range: "Decimal" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      
      // Update statistics on Assistance Requested
      sim.stat.assistanceRequested += 1;
      
      // Check if the State is able to assist the Entrepreneur
      if ( rand.uniform() < this.state.assistProb ) {
        this.entrepreneur.numCompensation += 1;
        this.entrepreneur.wealth += this.lossAftPun;
        
        // Update statistics on Assistance Provided
        sim.stat.assistanceProvided += 1;
        sim.stat.assistanceTotal += this.lossAftPun;
      }
      
      return followupEvents;
    }
  }
} );
