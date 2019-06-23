/*******************************************************************************
 * The Customer object class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var AppraiseTransaction = new cLASS( {
  Name: "AppraiseTransaction",
  shortLabel: "At",
  supertypeName: "eVENT",
  properties: {
    "customer": { range: "Customer" },
    "entrepreneur": { range: "Entrepreneur" },
    "satisfaction": { range: "Boolean" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      
      // If Entrepreneur satisfies the Customer's demand, satisfaction ++
      // otherwise --
      if ( this.satisfaction &&
          this.customer.satisfactions[this.entrepreneur.id] < 10 ) {
        this.customer.satisfactions[this.entrepreneur.id] += 1;
      } else if ( !this.satisfaction &&
          this.customer.satisfactions[this.entrepreneur.id] > 1 ) {
        this.customer.satisfactions[this.entrepreneur.id] -= 1;
      }
      
      return followupEvents;
    }
  }
} );
