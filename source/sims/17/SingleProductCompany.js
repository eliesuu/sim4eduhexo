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
    "dailyDemandQuantity": {range: "PositiveInteger", optional:true, historySize: 5, shortLabel: "dem"},
    "dailyDemandForecast": {range: "PositiveInteger", optional:true, historySize: 1, shortLabel: "demF"},
    "dailyRevenue": {range: "PositiveDecimal", optional:true, decimalPlaces: 2, historySize: 5, shortLabel: "rev"},
    "dailyCosts": {range: "PositiveDecimal", optional:true, decimalPlaces: 2, historySize: 5, shortLabel: "cost"},
    "dailyProfit": {range: "Decimal", optional:true, decimalPlaces: 2, historySize: 5, shortLabel: "p"}
  },
  methods: {
    "getDemandForecast": function () {
      var demandRB = this.history.dailyDemandQuantity,  // a ring buffer
          N = demandRB.nmrOfItems(),
          i=0, val=0, sum=0, df=0;
      if (N < 3) {  // buffer still too empty
        df = rand.uniformInt( 50, 100);
      } else  {  // simple moving average
        for (i=0; i < N; i++) {
          val = demandRB.buffer[(demandRB.first+i) % demandRB.size];
          sum += val;
        }
        df = Math.ceil( sum / N);
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
    "computeReplenishmentOrder": function (planProdQty) {
      var inpInvItems = this.inputInventoryItems,
          bom = this.productType.bomItemsPerBatch,
          replenOrder={}, replenCost=0;
      // compute replenishment order quantities
      Object.keys( bom).forEach( function (inpItemName) {
        var inpItem = sim.namedObjects[inpItemName],
            requiredQty = planProdQty * bom[inpItemName],
            orderQty = Math.max( requiredQty - inpInvItems[inpItemName], 0);
        replenOrder[inpItemName] = Math.ceil( orderQty / inpItem.quantityPerSupplyUnit);
        replenCost += replenOrder[inpItemName] * inpItem.purchasePrice;
      });
      replenOrder.cost = replenCost;
      return replenOrder;
    },
    // planProdQty in number of batches (e.g. pitchers)
    "planProductionQuantityAndReplenishmentOrder": function () {  // in number of batches
      var demandForecast = this.dailyDemandForecast,
          // in number of batches (e.g. pitchers)
          planProdQty = Math.ceil( demandForecast * this.productType.quantityPerSupplyUnit /
              this.productType.batchSize),
          replenOrder={}, batchCost=0;
      // compute replenishment order quantities and cost
      replenOrder = this.computeReplenishmentOrder( planProdQty);
      // decrease planProdQty if required by budget constraints
      if (replenOrder.cost > this.money) {
        batchCost = this.computeBatchCost( this.productType.bomItemsPerBatch);
        planProdQty = Math.floor( this.money / batchCost);
        replenOrder = this.computeReplenishmentOrder( planProdQty);
      }
      this.productType.plannedProductionQuantity = planProdQty;
      return replenOrder;
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
      Object.keys( bom).forEach( function (itemId) {
        var qty = inpInvItems[itemId] - bom[itemId] * planProdQty;
        // round to 2 decimal places
        inpInvItems[itemId] = Math.round( 100 * qty) / 100;
      });
      // add product output to inventory
      prodType.stockQuantity = planProdQty * prodType.batchSize;
    }
  }
});
