var PurchaseRequest = new cLASS( {
  Name: "PurchaseRequest",
  shortLabel: "Pr",
  supertypeName: "eVENT",
  properties: {
    "customer": { range: "Customer" },
    "entrepreneur": { range: "Entrepreneur" },
    "quantity": { range: "NonNegativeInteger" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var satisfaction = false;
      
      if ( this.entrepreneur.inventoryLevel >= this.quantity ) {
        this.entrepreneur.wealth += this.entrepreneur.productPrice *
            this.quantity;
        this.entrepreneur.profit += (this.entrepreneur.productPrice -
            this.entrepreneur.productionCost) * this.quantity;
        this.entrepreneur.inventoryLevel -= this.quantity;
        satisfaction = true;
        
        // Update statistics on Products Purchased
        sim.stat.productsPurchased += this.quantity;
      } else {
        // Update statistics on Purchases Request Missed
        sim.stat.purchaseRequestsMissed += this.quantity;
      }
      
      // Update Entrepreneur's appraisal
      followupEvents.push( new AppraiseTransaction( {
        occTime: this.occTime + 1,
        customer: this.customer,
        entrepreneur: this.entrepreneur,
        satisfaction: satisfaction
      } ) );
      
      // Update statistics on Products Requested
      sim.stat.productsRequested += this.quantity;
      
      return followupEvents;
    }
  }
} );
