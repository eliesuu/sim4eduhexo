/*******************************************************************************
 * The EndGenInv event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var EndGenInv = new cLASS( {
  Name: "EndGenInv",
  shortLabel: "Egi",
  supertypeName: "eVENT",
  properties: {
    "state": { range: "State" },
    "entrepreneur": { range: "Entrepreneur" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      
      // Stop observing an Entrepreneur
      this.state.finishInv( this.entrepreneur.id );
      
      // Release the Police Officer
      this.state.numFreeOff += 1;
      
      return followupEvents;
    }
  }
} );