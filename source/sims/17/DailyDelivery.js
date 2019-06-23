/*******************************************************************************
 * The DailyDelivery event class
 *
 * @copyright Copyright 2017 Gerd Wagner
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var DailyDelivery = new cLASS({
  Name: "DailyDelivery",
  shortLabel: "Del",
  supertypeName: "eVENT",
  properties: {
    "receiver": {range: "SingleProductCompany"},
    "deliveredItems": {range: Object}
  },
  methods: {
    "onEvent": function () {
      var events=[], rec = this.receiver,
          deliveredItems = this.deliveredItems;
      // add delivered items to inventory
      Object.keys( deliveredItems).forEach( function (inpItemId) {
        var inpItem = sim.namedObjects[inpItemId], newQ=0;
        if (inpItemId !== "cost") {  // exclude special "cost" field from map processing
          newQ = rec.inputInventoryItems[inpItemId] +
              deliveredItems[inpItemId] * inpItem.quantityPerSupplyUnit;
          // round to 2 decimal places
          rec.inputInventoryItems[inpItemId] = Math.round( 100 * newQ) / 100;
        }
      });
      // pay for delivered items
      rec.money = Math.round( 100 * (rec.money - deliveredItems.cost)) / 100;
      // update costing
      this.receiver.dailyCosts = deliveredItems.cost;
      // perform production
      this.receiver.performProduction();
      events.push( new DailyDemand({
        occTime: this.occTime + 6,  // 6 hours later
        company: this.receiver,
        quantity: DailyDemand.quantityRV()
      }));
      return events;
    }
  }
});
