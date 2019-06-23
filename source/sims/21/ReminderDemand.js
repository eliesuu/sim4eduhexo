/*******************************************************************************
 * The ReminderDemand event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ReminderDemand = new cLASS( {
  Name: "ReminderDemand",
  shortLabel: "Rd",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "state": { range: "State" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var entrepreneurToDemand;
      var freeMafiosi = this.mafia.numFreeMaf;
      
      while ( freeMafiosi > 0 ) {
        if ( rand.uniform() < this.mafia.demandProb ) {
          entrepreneurToDemand = this.mafia.demandPizzoFrom();
          
          if ( (this.mafia.numFreeMaf > 0) && (entrepreneurToDemand) ) {
            this.mafia.numFreeMaf -= 1;
            
            followupEvents.push( new DemandPizzo( {
              occTime: this.occTime + 1,
              mafia: this.mafia,
              state: this.state,
              entrepreneur: entrepreneurToDemand
            } ) );
          }
        }
        
        freeMafiosi -= 1;
      }
      
      return followupEvents;
    }
  }
} );

ReminderDemand.recurrence = function ( e ) {
  return 1;
};
