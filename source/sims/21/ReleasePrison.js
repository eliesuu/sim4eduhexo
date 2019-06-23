/*******************************************************************************
 * The ReleasePrison event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ReleasePrison = new cLASS( {
  Name: "ReleasePrison",
  shortLabel: "RP",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      
      this.mafia.numPrisMaf -= 1;
      this.mafia.numFreeMaf += 1;
      
      return followupEvents;
    }
  }
} );
