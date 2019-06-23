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
    "onEvent": function (slots) {
      var events=[], replOrder={};
      // demand forecasting
      this.company.dailyDemandForecast = this.company.getDemandForecast()
      // production planning and replenishment
      replOrder = this.company.planProductionQuantityAndReplenishmentOrder();
      // sales price planning
      this.company.planSalesPrice();
      // schedule delivery of entire replenishment order
      events.push( new DailyDelivery({
          occTime: this.occTime + 2,  // 2 hours later
          receiver: this.company,
          deliveredItems: replOrder
      }));
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