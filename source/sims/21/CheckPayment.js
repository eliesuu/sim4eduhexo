/*******************************************************************************
 * The CheckPayment event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var CheckPayment = new cLASS( {
  Name: "CheckPayment",
  shortLabel: "Cp",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "entrepreneur": { range: "Entrepreneur" },
    "state": { range: "State" },
    "pizzoToPay": { range: "Decimal" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      
      // Check if Entrepreneur paid the pizzo
      if ( this.mafia.checkPizzoPaid( this.entrepreneur.id ) ) {
        // Decide to benefit Entrepreneur
        if ( rand.uniform() < this.mafia.benefitProb ) {
          followupEvents.push( new Benefit( {
            occTime: this.occTime + 1,
            entrepreneur: this.entrepreneur,
            mafia: this.mafia,
            paidPizzo: this.pizzoToPay
          } ) );
        }
      } else {
        this.entrepreneur.numNoPayments += 1;
        
        // Decide to punish Entrepreneur
        if ( rand.uniform() < this.mafia.punishProb ) {
          followupEvents.push( new Punish( {
            occTime: this.occTime + 1,
            entrepreneur: this.entrepreneur,
            state: this.state,
            mafia: this.mafia
          } ) );
        }
      }
      
      return followupEvents;
    }
  }
} );
