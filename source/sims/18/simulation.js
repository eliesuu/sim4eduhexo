/*******************************************************
 * OESjs Simulation "LemonadeStand"
 * @copyright CC BY-NC 2017 Gerd Wagner
 ********************************************************/

/*******************************************************
 Simulation Parameters
 ********************************************************/
sim.scenario.simulationEndTime = 500;
// sim.scenario.randomSeed = 5  // optional
sim.config.stepDuration = 1000; // ms
sim.config.createLog = false;
sim.config.visualize = true;
sim.config.userInteractive = false;

sim.config.artworkCredits = "Weather icons by https://icons8.com";

/*******************************************************
 Simulation Model
 ********************************************************/
sim.model.time = "discrete"; // implies using only discrete random variables
sim.model.timeUnit = "h";

sim.model.objectTypes =
    ["SingleProductCompany", "ItemType", "InputItemType", "OutputItemType",
      "ProductCategory", "DailyDemandMarket", "LemonadeMarket"];
sim.model.eventTypes =
    ["StartOfDay", "Delivery", "DailyProduction", "DailyDemand", "EndOfDay"];
// global variables
sim.model.v.demandMean = 75;
sim.model.v.demandStdDev = 15;

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
      "Lemon": 100,  // pieces
      "Water": 100,  // liters
      "IceCubes": 0,  // pieces
      "Sugar": 10  // kilograms
    },
    money: 500,
    fixedCostPerDay: 50
  },
  "2": {
    typeName: "OutputItemType",
    name: "Lemonade",
    productCategory: 8,
    shortLabel: "Lem",
    quantityUnit: "ltr",
    supplyUnit: "cup",
    quantityPerSupplyUnit: 0.25,  // ltr
    salesPrice: 2,  // USD
    batchSize: 3.5,  // 1 pitcher = 3.5 liters
    stockQuantity: 0,  // in quantityUnit
    bomItemsPerBatch: {"Lemon": 3, "Water": 2.5, "IceCubes": 50, "Sugar": 0.3}
  },
  "3": {
    typeName: "InputItemType",
    name: "Lemon",
    quantityUnit: "pc",  // piece(s)
    supplyUnit: "bag",
    quantityPerSupplyUnit: 5,  // pieces
    purchasePrice: 2,  // per box
    outstandingOrder: false,
    targetInventory: 100,  // pieces
    reorderPoint: 70,
    leadTime: function () {return rand.uniformInt( 1, 2);}
  },
  "4": {
    typeName: "InputItemType",
    name: "Water",
    quantityUnit: "ltr",
    supplyUnit: "bottle",
    quantityPerSupplyUnit: 1.5,  // litre
    purchasePrice: 0.5,  // per bottle
    targetInventory: 100,  // litre
    reorderPoint: 70,
    leadTime: function () {return rand.uniformInt( 1, 3);}
  },
  "5": {
    typeName: "InputItemType",
    name: "IceCubes",
    quantityUnit: "piece",
    supplyUnit: "bag",
    quantityPerSupplyUnit: 100,// pieces
    purchasePrice: 2,
    targetInventory: 400,
    reorderPeriod: 1,
    justInTime: true,
    leadTime: function () {return 0;}  // on the same day
  },
  "6": {
    typeName: "InputItemType",
    name: "Sugar",
    quantityUnit: "kg",
    supplyUnit: "bag",
    quantityPerSupplyUnit: 1,
    purchasePrice: 1,
    targetInventory: 12,
    reorderPoint: 8,
    leadTime: function () {return rand.uniformInt( 2, 3);}
  },
  "7": {
    typeName: "LemonadeMarket",
    name: "Market",  // object name
    weatherState: WeatherStateEL.PARTLY_CLOUDY,
    temperature: 25
  },
  "8": {
    typeName: "ProductCategory",
    name: "Lemonade",  // object name
    market: 7
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
  /*
  "dailyProfit": {objectType:"SingleProductCompany", objectIdRef: 1,
      property:"dailyProfit", showTimeSeries: true, label:"Daily profit"}
  */
};
/*******************************************************
 Define the observation UI
 ********************************************************/
sim.config.observationUI.type = "SVG";
sim.config.observationUI.canvas.width = 600;
sim.config.observationUI.canvas.height = 300;
//Allows background styling (not needed here)
//sim.config.observationUI.canvas.style = "background-color:yellow";
sim.config.observationUI.fixedElements = {
  "LemonadeStandTable": {
    shapeName: "polygon",  // an SVG shape name
    // defining fixed values for the attributes of an SVG shape
    shapeAttributes: {points: "400,150 400,160 350,160 350,260 340,260 340,160 240,160 240,260 230,260 230,160 180,160 180,150"},
    // CSS style rules for the SVG element
    style: "fill:brown; stroke-width:0"
  },
  "LemonadePitcher": {
    shapeName: "polyline",
    shapeAttributes: {points: "200,100 200,150 250,150 250,100"},
    style: "fill:none; stroke:black; stroke-width:3"
  }
};
sim.config.observationUI.objectViews = {
  "LemonadeStand": [  // a view consisting of a group of SVG elements
    {shapeName: "rect",  // an SVG shape name
     // CSS style rules for the SVG element
     style: "fill:yellow; stroke-width:0",
     // attribute-value slots of an SVG shape, using fixed values or expressions
     shapeAttributes: {
       // defining fixed values for the attributes of an SVG shape
       x: 205, width: 40,
       // using expressions for defining the values of shape attributes
       y: function (stand) {return 145 - stand.productType.stockQuantity;},
       height: function (stand) {return stand.productType.stockQuantity;}
     }
    },
    {shapeName: "text",  // text elements are treated like shapes
      style:"font-size:10px; text-anchor:middle",  // CSS text style rules
      shapeAttributes: {
        x: 225, y: 145,  // coordinates for positioning the text
        textContent: function (stand) {return stand.productType.stockQuantity;}
      }
    },
    {shapeName: "rect",  //
      // dailyRevenue
     style:"stroke-width:0",
     fillPatternImage:{id:"fp1", file:"Dollar-Coin.svg"},
     shapeAttributes: { x: 300, width: 60,
       y: function (stand) {return 145 - parseInt( stand.dailyRevenue);},
       height: function (stand) {return parseInt( stand.dailyRevenue);}
     }
    },
    {shapeName: "text",  // text element for dailyRevenue
      style:"font-size:10px; text-anchor:middle",  // CSS text style rules
      shapeAttributes: {
        x: 375, y: 145,
        textContent: function (stand) {return stand.dailyRevenue ? stand.dailyRevenue : "";}
      }
    }
  ],
  "Market": {  // a view consisting of a map of enum attributes to lists of visualization items with an optional canvasBackgroundColor
    "weatherState": [  // an array list mapping enum indexes to visualization items
      {shapeName:"image", shapeAttributes:{ file:"icons8-Summer-96.png",
          x:450, y:0, width:96, height:96}, canvasBackgroundColor:"lightyellow"},
      {shapeName:"image", shapeAttributes:{ file:"icons8-Partly-Cloudy-Day-96.png",
          x:450, y:0, width:96, height:96}, canvasBackgroundColor:"oldlace"},  // or ivory?
      {shapeName:"image", shapeAttributes:{ file:"icons8-Cloud-128.png",
          x:450, y:0, width:128, height:128}, canvasBackgroundColor:"lightgray"},
      {shapeName:"image", shapeAttributes:{ file:"icons8-Rain-128.png",
          x:450, y:0, width:128, height:128}, canvasBackgroundColor:"silver"},
    ]
  }
};
sim.config.observationUI.eventAppearances = {
  /* duration  If the sound source is a file and if no duration is specified, then the entire file is played.
               If deal with a sound file and a duration is specified with a value lower than the sound file duration
               then only the "duration" time is played from that file. If the source is a note sequence and no duration
               is specified, then the duration is computed as the sum of all note durations. If the source is a
               note sequence and a duration is defined then the duration of each note from sequence is multiplied
               with a factor that ensures that the total notes duration equals with the value of the @duration attribute.
   soundSource The source can be a note sequence or a sound file (identified by its extension (.mp3 or ...).
               If it's a file it is first searched in the project directory under "media/sounds". If the file is not found,
               then it is searched in the global media/sounds folder. If still not found, then no sound is played.
               Note that the path is relativ to "media/sounds". So a value @introSoundFile="/mySounds/background.mid"
               will be searched in "media/sounds/mySounds/background.mid".
               A note sequence is a list of note/duration/volume triples where the note is an integer between 0
               (corresponding to a low C) and 127 (in half-tones) and the duration (in ms) and volume (in range 0 = mute
               to 127 = MAX_VOLUME) are positive integers. An example is "12/300/80 14/200/90"
   instrumentNo (or instrumentName) ???
   */
  "DailyDemand": {
    //sound: {duration: 1000, source:"12/300/80 14/200/90"},
    view: {  // an event view is a web animation of a DOM element
      imageFile: "customers.svg",
      style: "width:300px; height:300px; position:absolute; left:-30%; top:135px;",
      keyframes: [{left:'-30%'}, {left:'80%'}],
      duration: 1000,  // ms
      //iterations: Infinity,
      //fill:
    }
  },
  "EndOfDay": {
    view: {  // an event view is a web animation of a DOM element
      domElem: function () {return sim.visualEl;},  // the visualization container element
      keyframes: [{backgroundColor:'lightgray'}, {backgroundColor:'darkslategrey'}],
      duration: 1000  // ms
    }
  }
};
/*******************************************************
 Define User Interactions
 ********************************************************/
sim.scenario.userInteractions = {
  "StartOfDay": {  // triggering event type
    title: "Plan production and sales price (at StartOfDay)",
    // a UI may be triggered by an event satisfying a condition
    trigEvtCondition: function (e) {
      return (e.company.id === 1);
    },
    outputFields: {
      "dailyDemandHistory": {label:"Demand history (cups)",
        hint:"How many cups of lemonade have been sold in the past days",
        // defining the value of an output field
        fieldValue: function () {
          // objects have a value history for properties defined with a 'historySize'
          return sim.namedObjects["LemonadeStand"].history.dailyDemandQuantity.toString();
        }
      },
      "dailyRevenueHistory": {label:"Revenue history ($)",
        hint:"How much cash has been earned in the past days",
        fieldValue: function () {
          return sim.namedObjects["LemonadeStand"].history.dailyRevenue.toString();
        }
      },
      "weatherStateHistory": {label:"Weather history",
        hint:"How the weather was in the past days",
        fieldValue: function () {
          return sim.namedObjects["Market"].history.weatherState.toString();
        }
      },
      "temperatureHistory": {label:"Temperature history (°C)",
        hint:"How the temperature was in the past days",
        fieldValue: function () {
          return sim.namedObjects["Market"].history.temperature.toString();
        }
      },
      "forecastWeatherState": {label:"Weather forecast",
        hint:"The weather forecast for today",
        fieldValue: function () {
          return WeatherStateEL.labels[sim.namedObjects["Market"].forecastWeatherState-1];
        }
      },
      "forecastTemperature": {label:"Temperature forecast",
        hint:"The temperature forecast for today",
        fieldValue: function () {
          return sim.namedObjects["Market"].forecastTemperature.toString();
        }
      }
    },
    inputFields: {
      "planProdQty": {range:"PositiveInteger", default: 12, label:"Planned prod. quantity",
        hint:"How many pitchers of lemonade to produce?", suffixLabel:"pitchers (3.5 l)"},
      "planSalesPrice": {range:"Amount", decimalPlaces: 2, default: 2.00, label:"Planned sales price ($)",
        hint:"For how many $ is a cup to be sold?", suffixLabel:"per cup"}
    },
    // a list of fields or field groups (sub-arrays) defining the ordering/grouping of UI fields
    fieldOrder: ["dailyDemandHistory","dailyRevenueHistory","weatherStateHistory","temperatureHistory",
      ["forecastWeatherState","forecastTemperature"],"planProdQty","planSalesPrice"],
    waitForUserInput: true,
  }
};
