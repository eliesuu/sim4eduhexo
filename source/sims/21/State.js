/*******************************************************************************
 * The State object class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var State = new cLASS( {
  Name: "State",
  supertypeName: "oBJECT",
  properties: {
    "numFreeOff": {
      range: "NonNegativeInteger",
      label: "Number Free Officers"
    },
    "genInvProb": {
      range: "Decimal",
      label: "General Investigation Prob"
    },
    "timeGenInvMin": {
      range: "NonNegativeInteger",
      label: "General Investigation Duration Min"
    },
    "timeGenInvMax": {
      range: "NonNegativeInteger",
      label: "General Investigation Duration Max"
    },
    "timeSpecInvMin": {
      range: "NonNegativeInteger",
      label: "Specific Investigation Duration Min"
    },
    "timeSpecInvMax": {
      range: "NonNegativeInteger",
      label: "Specific Investigation Duration Max"
    },
    "timeTrialMin": {
      range: "NonNegativeInteger",
      label: "Trial Duration Min"
    },
    "timeTrialMax": {
      range: "NonNegativeInteger",
      label: "Trial Duration Max"
    },
    "timeInPrisonMin": {
      range: "NonNegativeInteger",
      label: "Time In Prison Min"
    },
    "timeInPrisonMax": {
      range: "NonNegativeInteger",
      label: "Time In Prison Max"
    },
    "entreToObserve": {
      range: "NonNegativeInteger",
      minCard: 0,
      maxCard: Infinity
    },
    "entreUnderObservation": {
      range: "NonNegativeInteger",
      minCard: 0,
      maxCard: Infinity
    },
    "seeAndCaptureProb": {
      range: "Decimal",
      label: "Probability See and Capture"
    },
    "captureProb": {
      range: "Decimal",
      label: "Probability See and Capture"
    },
    "imprisonProb": {
      range: "Decimal",
      label: "Probability to Imprison"
    },
    "assistProb": {
      range: "Decimal",
      label: "Probability to Assist"
    }
  },
  methods: {
    // Start a General Investigation
    "startGenInv": function () {
      var entrepreneurs = cLASS["Entrepreneur"].instances;
      var entrepreneur;
      
      if ( this.entreToObserve.length === 0 ) {
        this.entreToObserve = Object.keys( entrepreneurs );
      }
      
      entrepreneur = entrepreneurs[this.entreToObserve.splice(
          rand.uniformInt( 0, this.entreToObserve.length - 1 ), 1 )];
      
      // Add the Entrepreneur for observation
      this.entreUnderObservation.push( entrepreneur.id );
      
      return entrepreneur;
    },
    // Finish an investigation
    "finishInv": function ( eId ) {
      
      this.entreUnderObservation.splice(
          this.entreUnderObservation.indexOf( eId ), 1 );
    }
  }
} );
