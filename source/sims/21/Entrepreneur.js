/*******************************************************************************
 * The Entrepreneur object class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var Entrepreneur = new cLASS( {
  Name: "Entrepreneur",
  supertypeName: "oBJECT",
  properties: {
    "wealth": {
      range: "Decimal",
      label: "Liquidity"
    },
    "profit": {
      range: "Decimal",
      label: "Last Pizzo Request Liquidity"
    },
    "inventoryLevel": {
      range: "NonNegativeInteger",
      label: "Products Inventory Level"
    },
    "productPrice": {
      range: "Decimal",
      label: "Product Price"
    },
    "productionVolume": {
      range: "NonNegativeInteger",
      label: "Production Volume"
    },
    "productionCost": {
      range: "Decimal",
      label: "Production Cost"
    },
    "productionBenefit": {
      range: "Boolean",
      label: "Production Benefit"
    },
    "productionBenefitDuration": {
      range: "NonNegativeInteger",
      label: "Duration of Benefit Production"
    },
    "productionBenefitRate": {
      range: "Decimal",
      label: "Production Benefit Rate"
    },
    "productionPunish": {
      range: "Boolean",
      label: "Production Punish"
    },
    "productionPunishDuration": {
      range: "NonNegativeInteger",
      label: "Duration Punish Production"
    },
    "productionPunishRate": {
      range: "Decimal",
      label: "Production Punish Rate"
    },
    "productionImpactDuration": {
      range: "NonNegativeInteger",
      label: "Duration Impact on Production"
    },
    "numPizzoRequest": {
      range: "NonNegativeInteger",
      label: "Number Pizzo Requests"
    },
    "numPaidPizzo": {
      range: "NonNegativeInteger",
      label: "Number Paid Pizzo"
    },
    "numNoPaidPizzo": {
      range: "NonNegativeInteger",
      label: "Number Not Paid Pizzo"
    },
    "numPizzoRep": {
      range: "NonNegativeInteger",
      label: "Number Pizzo Reports"
    },
    "numEffectiveRep": {
      range: "NonNegativeInteger",
      label: "Number Effective Reports"
    },
    "numBenefit": {
      range: "NonNegativeInteger",
      label: "Number Benefits"
    },
    "numPunishment": {
      range: "NonNegativeInteger",
      label: "Number Punishments"
    },
    "numPunishRep": {
      range: "NonNegativeInteger",
      label: "Number Punishment Reports"
    },
    "numCompensation": {
      range: "NonNegativeInteger",
      label: "Number State Compansations"
    },
    "destroyedProducts": {
      range: "NonNegativeInteger",
      label: "Destroyed Products"
    },
    "notProducedProducts": {
      range: "NonNegativeInteger",
      label: "Non-Producted Products"
    },
    "stateProtector": {
      range: "Decimal",
      label: "State as Protector"
    }
  }
} );
