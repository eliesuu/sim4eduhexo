/*******************************************************************************
 * The EndSpecInv event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var EndSpecInv = new cLASS( {
  Name: "EndSpecInv",
  shortLabel: "Esi",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "state": { range: "State" },
    "entrepreneur": { range: "Entrepreneur" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var timeToTrial;
      
      // Stop observing an Entrepreneur
      this.state.finishInv( this.entrepreneur.id );
      
      // Mafioso captured by a specific investigation
      if ( (rand.uniform() < this.state.captureProb) &&
          (this.mafia.numFreeMaf > 0) ) {
        this.mafia.numCaptMaf += 1;
        this.mafia.numFreeMaf -= 1;
        this.entrepreneur.numEffectiveRep += 1;
        
        timeToTrial = rand.uniformInt( this.state.timeTrialMin,
            this.state.timeTrialMax );
        
        followupEvents.push( new Trial( {
          occTime: this.occTime + timeToTrial,
          mafia: this.mafia,
		  entrepreneur: this.entrepreneur,
          state: this.state
        } ) );
        
        // Update statistics on Specific Investigation Success
        sim.stat.specInvSuccess += 1;
      }
      
      // Release the Police Officer
      this.state.numFreeOff += 1;
      
      return followupEvents;
    }
  }
} );
