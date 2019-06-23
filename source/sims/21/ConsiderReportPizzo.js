/*******************************************************************************
 * The ConsiderReportPizzo event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ConsiderReportPizzo = new cLASS( {
  Name: "ConsiderReportPizzo",
  shortLabel: "Rp",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "entrepreneur": { range: "Entrepreneur" },
    "state": { range: "State" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var mafiaPunisher, stateProtector, effectiveness, compensation;
      var reportProb, timeSpecInv;
      
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
      
      // Report pizzo and includes Entrepreneur under observation
      if ( rand.uniform() < reportProb ) {
        this.entrepreneur.numPizzoRep += 1;
        
        if ( this.state.numFreeOff > 0 ) {
          this.state.numFreeOff -= 1;
          
          this.state.entreUnderObservation.push( this.entrepreneur.id );
          
          timeSpecInv = rand.uniformInt( this.state.timeSpecInvMin,
              this.state.timeSpecInvMax );
          
          followupEvents.push( new EndSpecInv( {
            occTime: this.occTime + timeSpecInv,
            mafia: this.mafia,
            state: this.state,
            entrepreneur: this.entrepreneur
          } ) );
          
          // Update statistics on Specific Investigations
          sim.stat.specInv += 1;
        } else {
          // Update statistics on Missed Specific Investigations
          sim.stat.specInvMissed += 1;
        }
        
        // Update statistics on Pizzo Reported
        sim.stat.pizzoReported += 1;
      }
      
      return followupEvents;
    }
  }
} );
