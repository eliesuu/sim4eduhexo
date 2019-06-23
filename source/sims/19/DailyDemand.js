/*******************************************************************************
 * The DailyDemand event class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var DailyDemand = new cLASS({
  Name: "DailyDemand",
  shortLabel: "DD",
  supertypeName: "eVENT",
  properties: {
    "quantity": {range: "PositiveInteger", label:"Quantity", shortLabel:"quant" },
    "shop": {range: "SingleProductShop"}
  },
  methods: {
    "onEvent": function () {
      var q = this.quantity,
          prevStockLevel = this.shop.quantityInStock;
      // update lostSales if demand quantity greater than stock level
      if (q > prevStockLevel) {
        sim.stat.lostSales += q - prevStockLevel;
      }
      // update quantityInStock
      this.shop.quantityInStock = Math.max( prevStockLevel-q, 0);
      // periodically schedule new Delivery events
      if (sim.time % this.shop.reorderInterval === 0) {
        return [new Delivery({
          occTime: this.occTime + Delivery.sampleLeadTime(),
          quantity: this.shop.targetInventory - this.shop.quantityInStock,
          receiver: this.shop
        })];
      } else return [];  // no follow-up events
    },
    createNextEvent: function () {
      return new DailyDemand({
        occTime: this.occTime + DailyDemand.recurrence(),
        quantity: DailyDemand.sampleQuantity(),
        shop: this.shop
      });
    }  }
});
DailyDemand.recurrence = function () {
  return 1;
};
DailyDemand.sampleQuantity = function () {
  return rand.uniformInt( 5, 30);
};
