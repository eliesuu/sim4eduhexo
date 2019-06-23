/*******************************************************************************
 * The Punish event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var Punish = new cLASS( {
  Name: "Punish",
  shortLabel: "P",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "entrepreneur": { range: "Entrepreneur" },
    "state": { range: "State" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var reportTime;
      
      var typeOfPunishment = rand.uniform() >= 0.5;
      
      this.entrepreneur.numPunishment += 1;
      
      // Destroy products
      if ( typeOfPunishment ) {
        this.entrepreneur.destroyedProducts = 
          Math.round( this.entrepreneur.inventoryLevel *
              this.mafia.destroyProductPerc );
        
        this.entrepreneur.inventoryLevel = Math.max (0,
            this.entrepreneur.inventoryLevel -
            this.entrepreneur.destroyedProducts );
        
        reportTime = 1;
        
      // Reduce production
      } else {
        this.entrepreneur.productionPunish = true;
        this.entrepreneur.productionBenefit = false;
        this.entrepreneur.productionImpactDuration =
            this.entrepreneur.productionPunishDuration;
        
        reportTime = this.entrepreneur.productionPunishDuration + 1;
      }
      
      followupEvents.push( new ConsiderReportPunishment( {
        occTime: this.occTime + reportTime,
        entrepreneur: this.entrepreneur,
        state: this.state
      } ) );
      
      // Update statistics on Punishments
      sim.stat.punishments += 1;
      
      return followupEvents;
    }
  }
} );
