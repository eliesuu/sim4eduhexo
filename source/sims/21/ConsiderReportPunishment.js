/*******************************************************************************
 * The ConsiderReportPunishment event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ConsiderReportPunishment = new cLASS( {
  Name: "ConsiderReportPunishment",
  shortLabel: "Rpp",
  supertypeName: "eVENT",
  properties: {
    "entrepreneur": { range: "Entrepreneur" },
    "state": { range: "State" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var mafiaPunisher, stateProtector, effectiveness, compensation;
      var reportProb, timeSpecInv;
      var lossAftPun = 0;
      
      // Evaluate Mafia as punisher
      mafiaPunisher = (this.entrepreneur.numPunishment /
          this.entrepreneur.numNoPaidPizzo) || 0;
      
      // Evaluate State as protector
      effectiveness = (this.entrepreneur.numEffectiveRep /
          this.entrepreneur.numPizzoRep);
      
      compensation = (this.entrepreneur.numCompensation /
          this.entrepreneur.numPunishRep);
      
      if ( (effectiveness) && (!compensation) ) {
        compensation = 0;
      } else if ( (!effectiveness) && (compensation) ) {
        effectiveness = 0;
      }
      
      stateProtector = (0.5 * (effectiveness + compensation)) ||
        this.entrepreneur.stateProtector;
      
      reportProb = (1 - mafiaPunisher) * stateProtector;
      
      if ( rand.uniform() < reportProb ) {
        this.entrepreneur.numPunishRep += 1;
        
        if ( this.entrepreneur.notProducedProducts > 0 ) {
          lossAftPun = this.entrepreneur.notProducedProducts *
              this.entrepreneur.productPrice;
          this.entrepreneur.notProducedProducts = 0;
        } else {
          lossAftPun = this.entrepreneur.destroyedProducts *
              this.entrepreneur.productPrice;
          this.entrepreneur.destroyedProducts = 0;
        }
        
        followupEvents.push( new Assist( {
          occTime: this.occTime + 1,
          entrepreneur: this.entrepreneur,
          state: this.state,
          lossAftPun: lossAftPun
        } ) );
        
        // Update statistics on 
        sim.stat.punishmentReported += 1;
      }
      
      return followupEvents;
    }
  }
} );
