/*******************************************************************************
 * The Delivery event class
 *
 * @copyright Copyright 2017 Gerd Wagner
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var Delivery = new cLASS({
  Name: "Delivery",
  shortLabel: "Del",
  supertypeName: "eVENT",
  properties: {
    "receiver": {range: "SingleProductCompany"},
    "deliveredItems": {range: Object, shortLabel: "item"}
  },
  methods: {
    "onEvent": function () {
      var rec = this.receiver,
          deliveredItems = this.deliveredItems;
      // add delivered item(s) to inventory
      Object.keys( deliveredItems).forEach( function (inpItemName) {
        var inpItem = sim.namedObjects[inpItemName], newQ=0;
        if (inpItemName !== "cost") {  // exclude special "cost" field from map processing
          newQ = rec.inputInventoryItems[inpItemName] +
              deliveredItems[inpItemName] * inpItem.quantityPerSupplyUnit;
          // round to 2 decimal places
          rec.inputInventoryItems[inpItemName] = Math.round( 100 * newQ) / 100;
          inpItem.outstandingOrder = false;
        }
      });
      // pay for delivered items
      rec.money = Math.round( 100 * (rec.money - deliveredItems.cost)) / 100;
      // update costing
      this.receiver.dailyCosts += deliveredItems.cost;
      return [];
    }
  }
});
