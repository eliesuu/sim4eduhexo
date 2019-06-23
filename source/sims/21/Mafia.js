/*******************************************************************************
 * The Mafia object class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var Mafia = new cLASS( {
  Name: "Mafia",
  supertypeName: "oBJECT",
  properties: {
    "numFreeMaf": {
      range: "NonNegativeInteger",
      label: "Number Free Mafiosi"
    },
    "numCaptMaf": {
      range: "NonNegativeInteger",
      label: "Number Captured Mafiosi"
    },
    "numPrisMaf": {
      range: "NonNegativeInteger",
      label: "Number Imprisoned Mafiosi"
    },
    "demandProb": {
      range: "Decimal",
      label: "Demand Pizzo Probability"
    },
    "toDemandEnt": {
      range: "NonNegativeInteger",
      minCard: 0,
      maxCard: Infinity
    },
    "pizzoPayPerc": {
      range: "Decimal",
      label: "Pizzo To Pay Percentage"
    },
    "timeForPayment": {
      range: "NonNegativeInteger",
      label: "Time For Payment"
    },
    "paidPizzo": {
      range: "NonNegativeInteger",
      minCard: 0,
      maxCard: Infinity
    },
    "benefitProb": {
      range: "Decimal",
      label: "Benfit Probability"
    },
    "punishProb": {
      range: "Decimal",
      label: "Punishment Probability"
    },
    "moneyBenefitPerc": {
      range: "Decimal",
      label: "Pizzo Benefit Percentage"
    },
    "destroyProductPerc": {
      range: "Decimal",
      label: "Destroy Product Percentage"
    }
  },
  methods: {
    // Define the Entrepreneur to demand pizzo from
    "demandPizzoFrom": function () {
      var entrepreneurs = cLASS["Entrepreneur"].instances;
      var entrepreneur, eId = 0;
      
      if ( this.toDemandEnt.length === 0 ) {
        this.toDemandEnt = Object.keys( entrepreneurs );
        rand.shuffleArray( this.toDemandEnt );
      }
      
      eId = this.toDemandEnt.splice( rand.uniformInt( 0,
          this.toDemandEnt.length - 1 ), 1 );
      
      entrepreneur = entrepreneurs[eId];
      
      return entrepreneur;
    },
    // Check if Entrepreneur paid the pizzo
    "checkPizzoPaid": function ( eId ) {
      var index = this.paidPizzo.indexOf( eId );
      
      if ( index > -1 ) {
        this.paidPizzo.splice( index, 1 );
        return true;
      }
      
      return false;
    },
    // Set the Entrepreneur paid the pizzo
    "setPizzoPaid": function ( eId ) {
      this.paidPizzo.push( eId );
    }
  }
} );
