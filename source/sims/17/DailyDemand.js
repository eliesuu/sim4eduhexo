/*******************************************************************************
 * The DailyDemand event class
 *
 * @copyright Copyright 2017 Gerd Wagner
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var DailyDemand = new cLASS({
    Name: "DailyDemand",
    shortLabel: "Dem",
    supertypeName: "eVENT",
    properties: {
      "company": {range: "SingleProductCompany"},
      // in # of supply units (cups)
      "quantity": {range: "PositiveInteger", label: "Quantity", shortLabel: "qty"}
    },
    methods: {
      "onEvent": function () {
        var events=[], x=0,
            prodType = this.company.productType,
            qtyPerSupplyUnit = prodType.quantityPerSupplyUnit,
            availSupplyUnits = Math.floor( prodType.stockQuantity / qtyPerSupplyUnit);
        // store dailyDemandQuantity
        this.company.dailyDemandQuantity = this.quantity;
        // deduct demand from quantity in stock
        if (this.quantity > availSupplyUnits) {
          prodType.stockQuantity = 0;
          sim.stat.lostSales += this.quantity - availSupplyUnits;
        } else {
          prodType.stockQuantity -= this.quantity * qtyPerSupplyUnit;
        }
        // calculate and round daily revenue
        x = Math.min( this.quantity, availSupplyUnits) * prodType.salesPrice;
        this.company.dailyRevenue = Math.round( 100 * x) / 100;
        // update liquidity
        x = this.company.money + this.company.dailyRevenue;
        this.company.money = Math.round( 100 * x) / 100;
        // update statistics
        sim.stat.totalRevenue += this.company.dailyRevenue;
        // store history values in manuf. company
        this.company.history.dailyDemandQuantity.add( this.quantity);
        this.company.history.dailyRevenue.add( this.company.dailyRevenue);
        return events;
      }
    }
});
DailyDemand.quantityRV = function () {
  // in product quantity units (e.g., lemonade cups)
  return rand.uniformInt(50, 100);  //
};