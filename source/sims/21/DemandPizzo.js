/*******************************************************************************
 * The DemandPizzo event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var DemandPizzo = new cLASS( {
  Name: "DemandPizzo",
  shortLabel: "Dp",
  supertypeName: "eVENT",
  properties: {
    "mafia": { range: "Mafia" },
    "entrepreneur": { range: "Entrepreneur" },
    "state": { range: "State" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var pizzoToPay, timeToTrial;
      
      // Entrepreneur under observation by an Officer that sees the
      // demand and captures the Mafioso
      if ( (this.state.entreUnderObservation.includes( this.entrepreneur.id )) &&
          (rand.uniform() < this.state.seeAndCaptureProb) ) {
        // Mafioso captured
        this.mafia.numCaptMaf += 1;
        
        timeToTrial = rand.uniformInt( this.state.timeTrialMin,
            this.state.timeTrialMax );
        
        followupEvents.push( new Trial( {
          occTime: this.occTime + timeToTrial,
          mafia: this.mafia,
		  entrepreneur: this.entrepreneur,
          state: this.state
        } ) );
        
        // Update statistics on General Investigation Success
        sim.stat.genInvSuccess += 1;
      } else {
        // Calculate the pizzo amount based on Entrepreneur's wealth
        pizzoToPay = parseFloat( (this.mafia.pizzoPayPerc *
            this.entrepreneur.profit).toFixed( 2 ) );
        
        followupEvents.push( new ConsiderPayPizzo( {
          occTime: this.occTime + 1,
          mafia: this.mafia,
          entrepreneur: this.entrepreneur,
          state: this.state,
          pizzoToPay: pizzoToPay
        } ) );
        
        followupEvents.push( new CheckPayment( {
          occTime: this.occTime + this.mafia.timeForPayment,
          mafia: this.mafia,
          entrepreneur: this.entrepreneur,
          state: this.state,
          pizzoToPay: pizzoToPay
        } ) );
        
        // Mafioso not captured after demanding pizzo
        this.mafia.numFreeMaf += 1;
        
        this.entrepreneur.numPizzoRequest += 1
        
        // Update statistics on Pizzo Requested
        sim.stat.pizzoRequested += 1;
      }
      
      return followupEvents;
    }
  }
} );
