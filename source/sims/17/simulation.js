/*******************************************************
 * OESjs Simulation "LemonadeStand"
 * @copyright CC BY-NC 2017 Gerd Wagner
 ********************************************************/

/*******************************************************
 Simulation Parameters
 ********************************************************/
sim.scenario.simulationEndTime = 40*24;  // 40 days = 2 months
// sim.scenario.randomSeed = 5  // optional
sim.config.createLog = true;

/*******************************************************
 Simulation Model
 ********************************************************/
sim.model.time = "discrete"; // implies using only discrete random variables
sim.model.timeUnit = "h";

sim.model.objectTypes =
    ["SingleProductCompany", "ItemType", "InputItemType", "OutputItemType"];
sim.model.eventTypes =
    ["StartOfDay", "DailyDelivery", "DailyDemand", "EndOfDay"];

/*******************************************************
 Define the initial state
 ********************************************************/
sim.scenario.initialState.objects = {
  "1": {
    typeName: "SingleProductCompany",
    name: "LemonadeStand",
    shortLabel: "Stand",
    productType: 2,  // Lemonade
    inputInventoryItems: {
      "Lemon": 0,  // pieces
      "Water": 0,  // liters
      "IceCubes": 0,  // pieces
      "Sugar": 0,  // kilograms
      "PaperCup": 0
    },
    money: 100,
    fixedCostPerDay: 50
  },
  "2": {
    typeName: "OutputItemType",
    name: "Lemonade",
    shortLabel: "Lem",
    quantityUnit: "ltr",
    supplyUnit: "cup",
    quantityPerSupplyUnit: 0.25,  /// ltr
    salesPrice: 2,  // e.g., USD
    batchSize: 3.5,  // 1 pitcher = 3.5 liters
    stockQuantity: 0,  // in quantityUnit
    bomItemsPerBatch: {"Lemon": 3, "Water": 2.5, "IceCubes": 50, "Sugar": 0.3, "PaperCup": 1}
  },
  "3": {
    typeName: "InputItemType",
    name: "Lemon",
    quantityUnit: "pc",  // piece(s)
    supplyUnit: "bag",
    quantityPerSupplyUnit: 5,  // pieces
    purchasePrice: 2  // per box
  },
  "4": {
    typeName: "InputItemType",
    name: "Water",
    quantityUnit: "ltr",
    supplyUnit: "bottle",
    quantityPerSupplyUnit: 1.5,  // litre
    purchasePrice: 0.5  // per bottle
  },
  "5": {
    typeName: "InputItemType",
    name: "IceCubes",
    quantityUnit: "pc",
    supplyUnit: "bag",
    quantityPerSupplyUnit: 100,// pieces
    purchasePrice: 2
  },
  "6": {
    typeName: "InputItemType",
    name: "Sugar",
    quantityUnit: "kg",
    supplyUnit: "bag",
    quantityPerSupplyUnit: 1,
    purchasePrice: 1
  },
  "7": {
    typeName: "InputItemType",
    name: "PaperCup",
    quantityUnit: "pc",
    supplyUnit: "box",
    quantityPerSupplyUnit: 100,
    purchasePrice: 2.5
  }
};

sim.scenario.initialState.events = [
  {typeName: "StartOfDay", occTime: 8, company: 1}
];
/*******************************************************
 Define Output Statistics Variables
 ********************************************************/
sim.model.statistics = {
  "totalRevenue": {range: "Decimal", label: "Total revenue", unit: "$"},
  "totalCosts": {range: "Decimal", label: "Total costs", unit: "$"},
  "totalProfit": {range: "Decimal", label: "Total profit",
    computeOnlyAtEnd: true, decimalPlaces: 2, unit: "$",
    expression: function () {
      return sim.stat.totalRevenue - sim.stat.totalCosts;
    }
  },
  "lostSales": {range: "NonNegativeInteger", label: "Lost sales"},
  "dailyRevenue": {objectType:"SingleProductCompany", objectIdRef: 1,
    property:"dailyRevenue", showTimeSeries: true, label:"Daily revenue"},
  "dailyProfit": {objectType:"SingleProductCompany", objectIdRef: 1,
      property:"dailyProfit", showTimeSeries: true, label:"Daily profit"}
};
