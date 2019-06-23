/*******************************************************************************
 * The ReminderGenInv event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ReminderGenInv = new cLASS( {
  Name: "ReminderGenInv",
  shortLabel: "Rgi",
  supertypeName: "eVENT",
  properties: {
    "state": { range: "State" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var timeGenInv, entreObs;
      
      if ( rand.uniform() < this.state.genInvProb ) {
        if ( this.state.numFreeOff > 0 ) {
          // Allocate a Police Officer
          this.state.numFreeOff -= 1;
          
          // Define an Entrepreneur to observe
          entreObs = this.state.startGenInv();
          
          timeGenInv = rand.uniformInt( this.state.timeGenInvMin,
              this.state.timeGenInvMax );
          
          // Schedule end of the general investigation
          followupEvents.push( new EndGenInv( {
            occTime: this.occTime + timeGenInv,
            state: this.state,
            entrepreneur: entreObs
          } ) );
          
          // Update statistics on General Investigations
          sim.stat.genInv += 1;
        } else {
          // Update statistics on Missed General Investigations
          sim.stat.genInvMissed += 1;
        }
      }
      
      return followupEvents;
    }
  }
} );

ReminderGenInv.recurrence = function ( e ) {
  return 1;
};
