/*******************************************************************************
 * The Trial event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var Trial = new cLASS( {
  Name: "Trial",
  shortLabel: "T",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "entrepreneur": { range: "Entrepreneur" },
    "state": { range: "State" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var timeInPrison;
      
      this.mafia.numCaptMaf -= 1;
      
      if ( rand.uniform() < this.state.imprisonProb ) {
        // Mafioso imprisoned
        this.mafia.numPrisMaf += 1;
        
        timeInPrison = rand.uniformInt( this.state.timeInPrisonMin,
            this.state.timeInPrisonMax );
        
        followupEvents.push( new ReleasePrison( {
          occTime: this.occTime + timeInPrison,
          mafia: this.mafia
        } ) );
        
        // Update statistics
        sim.stat.imprisonments += 1;
      } else {
        // Mafioso not convicted
        this.mafia.numFreeMaf += 1;
      }
      
      return followupEvents;
    }
  }
} );
