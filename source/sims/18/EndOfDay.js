/*******************************************************************************
 * The EndOfDay event class
 *
 * @copyright Copyright 2017 Gerd Wagner
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var EndOfDay = new cLASS( {
  Name: "EndOfDay",
  shortLabel: "EoD",
  supertypeName: "eVENT",
  properties: {
    "company": {range: "SingleProductCompany"}
  },
  methods: {
    "onEvent": function () {
      var comp = this.company,
          market = comp.productType.productCategory.market;
      // dump remaining lemonade
      comp.productType.stockQuantity = 0;
      // dump expired input items
      comp.inputInventoryItems["IceCubes"] = 0;
      // update costing
      comp.dailyCosts = Math.round( 100 * (comp.dailyCosts + comp.fixedCostPerDay)) / 100;
      comp.dailyProfit = Math.round( 100 * (comp.dailyRevenue - comp.dailyCosts)) / 100;
      // update statistics
      sim.stat.totalRevenue += comp.dailyRevenue;
      sim.stat.totalCosts += comp.dailyCosts;
      // store history values
      market.history.dailyDemandQuantity.add( market.dailyDemandQuantity);
      comp.history.dailyDemandForecast.add( comp.dailyDemandForecast);
      comp.history.dailyRevenue.add( comp.dailyRevenue);
      comp.history.dailyProfit.add( comp.dailyProfit);
      return [];
    }
  }
});
