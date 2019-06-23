/*******************************************************************************
 * The ProduceProducts event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ProduceProducts = new cLASS( {
  Name: "ProduceProducts",
  shortLabel: "Pps",
  supertypeName: "eVENT",
  properties: {
    "entrepreneur": { range: "Entrepreneur" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var quantity, cost;
      
      // Benefited production
      if ( this.entrepreneur.productionBenefit ) {
        quantity = Math.round( this.entrepreneur.productionBenefitRate *
            this.entrepreneur.productionVolume );
        
        if ( this.entrepreneur.productionImpactDuration > 0 ) {
          this.entrepreneur.productionImpactDuration -= 1;
        } else {
          this.entrepreneur.productionBenefit = false;
        }
      // Punished production
      } else if ( this.entrepreneur.productionPunish ) {
        quantity = Math.round( this.entrepreneur.productionPunishRate *
            this.entrepreneur.productionVolume );
        
        this.entrepreneur.notProducedProducts +=
          this.entrepreneur.productionVolume -
          Math.round( this.entrepreneur.productionPunishRate *
              this.entrepreneur.productionVolume );
        
        if ( this.entrepreneur.productionImpactDuration > 0 ) {
          this.entrepreneur.productionImpactDuration -= 1;
        } else {
          this.entrepreneur.productionPunish = false;
        }
      // Normal production
      } else {
        quantity = this.entrepreneur.productionVolume;
      }
      
      cost = quantity * this.entrepreneur.productionCost;
      
      if ( this.entrepreneur.wealth > cost ) {
        this.entrepreneur.inventoryLevel += quantity;
        this.entrepreneur.wealth -= cost;
        
        // Update statistics on Production
        sim.stat.productsProduced += quantity;
      }
      
      return followupEvents;
    }
  }
} );

ProduceProducts.recurrence = function ( e ) {
  return 1;
};
