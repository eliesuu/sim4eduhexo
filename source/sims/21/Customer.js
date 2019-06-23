/*******************************************************************************
 * The Customer object class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var Customer = new cLASS( {
  Name: "Customer",
  supertypeName: "oBJECT",
  properties: {
    "satisfactions": {
      range: "NonNegativeInteger",
      minCard: 0,
      maxCard: Infinity
    },
    "purchaseProb": {
      range: "Decimal",
      label: "Purchase Probability"
    },
    "purchaseProductMin": {
      range: "NonNegativeInteger",
      label: "Minimum Products to Purchase"
    },
    "purchaseProductMax": {
      range: "NonNegativeInteger",
      label: "Maximum Products to Purchase"
    }
  }
} );
