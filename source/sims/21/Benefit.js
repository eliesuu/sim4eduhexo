/*******************************************************************************
 * The Benefit event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var Benefit = new cLASS( {
  Name: "Benefit",
  shortLabel: "B",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "entrepreneur": { range: "Entrepreneur" },
    "paidPizzo": { range: "Decimal" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var benefit;
      var typeOfBenefit = rand.uniform() >= 0.5;
      
      // Payback money
      if ( typeOfBenefit ) {
        benefit = parseFloat( (this.mafia.moneyBenefitPerc *
            this.paidPizzo).toFixed( 2 ) );
        this.entrepreneur.wealth += benefit;
        
      // Increase production
      } else {
        this.entrepreneur.productionPunish = false;
        this.entrepreneur.productionBenefit = true;
        this.entrepreneur.productionImpactDuration =
            this.entrepreneur.productionBenefitDuration;
      }
      
      this.entrepreneur.numBenefit += 1;
      
      // Update statistics on Benefits
      sim.stat.benefits += 1;
      
      return followupEvents;
    }
  }
} );
