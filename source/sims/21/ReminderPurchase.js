/*******************************************************************************
 * The ReminderPurchase event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ReminderPurchase = new cLASS( {
  Name: "ReminderPurchase",
  shortLabel: "Rp",
  supertypeName: "eVENT",
  properties: {
    "customer": { range: "Customer" }
  },
  methods: {
    "onEvent": function () {
      var satisfactions, keys, entrepreneur, quantity, eObj;
      var followupEvents = [];
      var satisfaction = 0.0;
      
      if ( rand.uniform() < this.customer.purchaseProb ) {
        // Select Entrepreneur with the highest satisfaction
        satisfactions = this.customer.satisfactions;
        
        // Shuffle the Entrepreneurs
        keys = Object.keys( cLASS["Entrepreneur"].instances );
        rand.shuffleArray( keys );
        
        keys.forEach( function ( objId ) {
          eObj = cLASS["Entrepreneur"].instances[objId];
          if ( (satisfactions[eObj.id] > satisfaction) ||
              (satisfactions[eObj.id] === satisfaction &&
                  rand.uniform() >= 0.5) ) {
            entrepreneur = eObj;
            satisfaction = satisfactions[eObj.id];
          }
        } );
        
        // Define quantity to purchase
        quantity = rand.uniformInt( this.customer.purchaseProductMin,
            this.customer.purchaseProductMax );
        
        followupEvents.push( new PurchaseRequest( {
          occTime: this.occTime + 1,
          customer: this.customer,
          entrepreneur: entrepreneur,
          quantity: quantity
        } ) );
      }
      
      return followupEvents;
    }
  }
} );

ReminderPurchase.recurrence = function ( e ) {
  return 1;
};
