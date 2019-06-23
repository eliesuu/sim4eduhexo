/*******************************************************************************
 * The StartOfDay event class
 *
 * @copyright Copyright 2017 Gerd Wagner
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var StartOfDay = new cLASS( {
  Name: "StartOfDay",
  shortLabel: "SoD",
  supertypeName: "eVENT",
  
  properties: {
    "company": {
      range: "SingleProductCompany"
    }
  },
  
  methods: {
    // parameters may be delivered by user action form
    "onEvent": function (slots) {
      var events=[], replOrder={},
          inpInvItems = this.company.inputInventoryItems,
          prodType = this.company.productType,
          market = prodType.productCategory.market,
          dayNo = Math.ceil( sim.time / 24);
      // demand forecasting
      this.company.dailyDemandForecast = this.company.getDemandForecast()
      // production planning and replenishment
      if (slots && slots.planProdQty) {  // provided by UI
        prodType.plannedProductionQuantity = slots.planProdQty;
      } else {
        this.company.planProductionQuantity();
      }
      // sales price planning
      if (slots && slots.planSalesPrice) {  // provided by UI
        prodType.salesPrice = slots.planSalesPrice;
      } else {
        this.company.planSalesPrice();
      }
      // reset object-specific daily statistics variables
      this.company.dailyRevenue = 0;
      this.company.dailyCosts = 0;
      this.company.dailyProfit = 0;
      // check inventory and create deliveries
      Object.keys( inpInvItems).forEach( function (inpItemName) {
        var inpItem=null, del={}, x=0;
        inpItem = sim.namedObjects[inpItemName];
        if ((inpItem.reorderPeriod && dayNo % inpItem.reorderPeriod === 0) ||
            (inpItem.reorderPoint && !inpItem.outstandingOrder) &&
              inpInvItems[inpItemName] <= inpItem.reorderPoint) {
          // compute order quantity (in supply units)
          x = (inpItem.targetInventory - inpInvItems[inpItemName]) / inpItem.quantityPerSupplyUnit;
          del[inpItemName] = Math.ceil( x);
          del.cost = del[inpItemName] * inpItem.purchasePrice;
          events.push( new Delivery({
            occTime: this.occTime + inpItem.leadTime() * 24 + 2,  // 2 hours later
            receiver: this.company,
            deliveredItems: del
          }));
          inpItem.outstandingOrder = true;
        }
      }, this);
      // schedule DailyProduction event
      events.push( new DailyProduction({
        occTime: this.occTime + 3,  // 1 hour after deliveries
        company: this.company
      }));
      // schedule DailyDemand event
      events.push( new DailyDemand({
        occTime: this.occTime + 8,  // 8 hours later
        company: this.company,
        quantity: market.getDailyDemandQuantity()
      }));
      // schedule EndOfDay event
      events.push( new EndOfDay({
        occTime: this.occTime + 10,  // 10 hours later
        company: this.company
      }));
      return events;
    }
  }
} );
// Any exogenous event type needs to define a static function "recurrence"
StartOfDay.recurrence = function () {
  return 24;
};
// Any exogenous event type needs to define a static function "createNextEvent"
StartOfDay.createNextEvent = function ( e ) {
  return new StartOfDay( {
    occTime: e.occTime + StartOfDay.recurrence(),
    company: e.company
  } );
};