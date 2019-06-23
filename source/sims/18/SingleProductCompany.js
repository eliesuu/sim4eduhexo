var SingleProductCompany = new cLASS({
  Name: "SingleProductCompany",
  supertypeName: "oBJECT",
  properties: {
    "productType": {range: "OutputItemType"},
    "inputInventoryItems": {range: Object, label: "Input inventory items", shortLabel: "inp"},
    "money": {range: "Decimal",  label: "Liquidity", shortLabel: "mon"},
    // Includes labor cost and facilities cost
    "fixedCostPerDay": {range: "PositiveDecimal",  label: "Fixed cost per day"},
    //*** non-persistent variables ***
    "dailyRevenue": {range: "PositiveDecimal", decimalPlaces: 2, historySize: 5, shortLabel: "rev"},
    "dailyCosts": {range: "PositiveDecimal", decimalPlaces: 2, shortLabel: "cost"},
    "dailyProfit": {range: "Decimal", decimalPlaces: 2, historySize: 5, shortLabel: "p"},
    // needed for Simple Exponential Smoothing (SES)
    "dailyDemandForecast": {range: "PositiveInteger", historySize: 1, shortLabel: "demF"}
  },
  methods: {
    "getDemandForecast": function () {
      var market = this.productType.productCategory.market,
          demandRB = market.history.dailyDemandQuantity,  // a ring buffer
          N = demandRB.nmrOfItems(), df=0;
      if (N < 3) {  // buffer still too empty
        df = Math.round( rand.normal( sim.model.v.demandMean, sim.model.v.demandStdDev));
      } else  {  // simple moving average
        df = Math.round( demandRB.getSMA( 3));  // over 3 values
      }
      return df;
    },
    "computeBatchCost": function (bom) {  // "bom" maps input item IDs (names) to qty. units
      var cost=0;
      Object.keys( bom).forEach( function (inpItemName) {
        var inpItem = sim.namedObjects[inpItemName];
        cost += Math.ceil( bom[inpItemName] / inpItem.quantityPerSupplyUnit) * inpItem.purchasePrice;
      });
      return cost;
    },
    "planProductionQuantity": function () {  // in number of batches
      var inpInvItems = this.inputInventoryItems,
          bom = this.productType.bomItemsPerBatch,
          demandForecast = this.dailyDemandForecast,
          // in number of batches (e.g. pitchers)
          planProdQty = Math.ceil( demandForecast * this.productType.quantityPerSupplyUnit /
              this.productType.batchSize);
      // decrease planProdQty if required by inventory constraints
      Object.keys( bom).forEach( function (inpItemName) {
        var inpItem = sim.namedObjects[inpItemName],
            requiredQty = planProdQty * bom[inpItemName];
        if (!inpItem.justInTime && requiredQty > inpInvItems[inpItemName]) {
          planProdQty = Math.ceil( inpInvItems[inpItemName] / bom[inpItemName]);
        };
      });
      this.productType.plannedProductionQuantity = planProdQty;
    },
    "planSalesPrice": function () {
      var price=0, batchVariableCosts=0,
          supplyUnitVariableCosts=0, supplyUnitCosts=0,
          expectedProfitRate = 0.1;
      batchVariableCosts = this.computeBatchCost( this.productType.bomItemsPerBatch);
      supplyUnitVariableCosts = batchVariableCosts / this.productType.batchSize *
          this.productType.quantityPerSupplyUnit;
      supplyUnitCosts = supplyUnitVariableCosts +
          this.fixedCostPerDay / this.dailyDemandForecast;
      price = supplyUnitCosts * (1 + expectedProfitRate);
      this.productType.salesPrice = Math.round( 100 * price) / 100;
    },
    "performProduction": function () {
      var prodType = this.productType,
          bom = prodType.bomItemsPerBatch,
          planProdQty = prodType.plannedProductionQuantity,
          inpInvItems = this.inputInventoryItems;
      // subtract inputs from inventory
      Object.keys( bom).forEach( function (itemName) {
        var qty = inpInvItems[itemName] - bom[itemName] * planProdQty;
        // round to 2 decimal places
        inpInvItems[itemName] = Math.round( 100 * qty) / 100;
      });
      // add product output to inventory
      prodType.stockQuantity = planProdQty * prodType.batchSize;
    }
  }
});
