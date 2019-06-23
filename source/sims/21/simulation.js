/*******************************************************************************
 * Mafia Economy simulation model
 *
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
/*******************************************************************************
 * Simulation Parameters
 ******************************************************************************/
sim.scenario.simulationEndTime = 3650;
sim.scenario.idCounter = 11; // optional
sim.scenario.randomSeed = 1; // optional
/*******************************************************************************
 * Simulation Config
 ******************************************************************************/
// sim.config.stepDuration = 0;  // optional
// sim.config.createLog = false;  // optional
// sim.config.userInteractive = false;  // optional
// sim.config.visualize = false;  // optional
/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.time = "discrete";
sim.model.timeUnit = "D"; // days
// sim.model.timeIncrement = 1; // optional

/* Object, Event, and Activity types */
sim.model.objectTypes = [ "State", "Mafia", "Entrepreneur", "Customer" ];
sim.model.eventTypes = [
  /* State */
  "ReminderGenInv", "EndGenInv", "EndSpecInv", "Trial", "ReleasePrison",
  "Assist",
  /* Mafia */
  "ReminderDemand", "DemandPizzo", "CheckPayment", "Benefit", "Punish",
  /* Entrepreneur */
  "ProduceProducts", "ConsiderPayPizzo", "ConsiderReportPizzo",
  "ConsiderReportPunishment",
  /* Customer */
  "ReminderPurchase", "PurchaseRequest", "AppraiseTransaction"
];
sim.model.activityTypes = [];

/* Global Variables */
sim.model.v.numEntrepreneurs = {
  range: "PositiveInteger",
  initialValue: 100,
  label: "Number Entrepreneurs"
};
sim.model.v.numCustomers = {
  range: "PositiveInteger",
  initialValue: 2000,
  label: "Number Customers"
};
sim.model.v.numPolice = {
  range: "NonNegativeInteger",
  initialValue: 20,
  label: "Number Police Officers"
};
sim.model.v.numMafiosi = {
  range: "NonNegativeInteger",
  initialValue: 20,
  label: "Number Mafiosi"
};
/* Mafia */
sim.model.v.demandProb = {
  range: "PositiveDecimal",
  initialValue: 0.5,
  decimalPlaces: 5,
  label: "Demand Prob"
};
sim.model.v.pizzoPayPerc = {
  range: "PositiveDecimal",
  initialValue: 0.1,
  decimalPlaces: 5,
  label: "Pizzo Perc"
};
sim.model.v.benefitProb = {
  range: "PositiveDecimal",
  initialValue: 0.25,
  decimalPlaces: 5,
  label: "Benefit Prob"
};
sim.model.v.benefitPerc = {
  range: "PositiveDecimal",
  initialValue: 0.75,
  decimalPlaces: 5,
  label: "Benefit Perc"
};
sim.model.v.punishProb = {
  range: "PositiveDecimal",
  initialValue: 0.75,
  decimalPlaces: 5,
  label: "Punish Prob"
};
sim.model.v.punishPerc = {
  range: "PositiveDecimal",
  initialValue: 0.25,
  decimalPlaces: 5,
  label: "Punish Perc"
};
/* State */
sim.model.v.genInvProb = {
  range: "PositiveDecimal",
  initialValue: 0.015,
  decimalPlaces: 5,
  label: "General Inv Prob"
};
sim.model.v.timeGenInvMin = {
  range: "PositiveInteger",
  initialValue: 5,
  //label: "Min Time General Inv"
};
sim.model.v.timeGenInvMax = {
  range: "PositiveInteger",
  initialValue: 15,
  //label: "Max Time General Inv"
};
sim.model.v.timeSpecInvMin = {
  range: "PositiveInteger",
  initialValue: 30,
  //label: "Min Time Specific Inv"
};
sim.model.v.timeSpecInvMax = {
  range: "PositiveInteger",
  initialValue: 30,
  //label: "Max Time Specific Inv"
};
sim.model.v.timeTrialMin = {
  range: "PositiveInteger",
  initialValue: 120,
  //label: "Min Time to Trial"
};
sim.model.v.timeTrialMax = {
  range: "PositiveInteger",
  initialValue: 730,
  //label: "Max Time to Trial"
};
sim.model.v.timeInPrisonMin = {
  range: "PositiveInteger",
  initialValue: 120,
  //label: "Min Time in Prison"
};
sim.model.v.timeInPrisonMax = {
  range: "PositiveInteger",
  initialValue: 1825,
  //label: "Max Time in Prison"
};
sim.model.v.seeCaptureProb = {
  range: "PositiveDecimal",
  initialValue: 0.25,
  decimalPlaces: 5,
  label: "See and Capture Prob"
};
sim.model.v.captureProb = {
  range: "PositiveDecimal",
  initialValue: 0.5,
  decimalPlaces: 5,
  label: "Capture Prob"
};
sim.model.v.imprisonProb = {
  range: "PositiveDecimal",
  initialValue: 0.75,
  decimalPlaces: 5,
  label: "Convict Prob"
};
sim.model.v.assistProb = {
  range: "PositiveDecimal",
  initialValue: 0.5,
  decimalPlaces: 5,
  label: "Assist Prob"
};
/* Entrepreneur */
sim.model.v.productionVolume = {
  range: "NonNegativeInteger",
  initialValue: 1,
  //label: "Production Volume"
};
sim.model.v.productionCost = {
  range: "PositiveDecimal",
  initialValue: 1,
  decimalPlaces: 2,
  //label: "Production Cost"
};
sim.model.v.productPrice = {
  range: "PositiveDecimal",
  initialValue: 3,
  decimalPlaces: 2,
  //label: "Product Price"
};
sim.model.v.productionBenefitDuration = {
  range: "PositiveInteger",
  initialValue: 1,
  //label: "Benefit Duration"
};
sim.model.v.productionBenefitRate = {
  range: "PositiveDecimal",
  initialValue: 2,
  decimalPlaces: 5,
  //label: "Benefit Rate"
};
sim.model.v.productionPunishDuration = {
  range: "PositiveInteger",
  initialValue: 1,
  //label: "Punish Duration"
};
sim.model.v.productionPunishRate = {
  range: "PositiveDecimal",
  initialValue: 0,
  decimalPlaces: 5,
  //label: "Punish Rate"
};
sim.model.v.stateProtector = {
  range: "PositiveDecimal",
  initialValue: 0.5,
  decimalPlaces: 5,
  //label: "Default State Protector"
};
/* Customer */
sim.model.v.purchaseProb = {
  range: "PositiveDecimal",
  initialValue: 0.15,
  decimalPlaces: 5,
  //label: "Purchase Prob"
};
sim.model.v.purchaseProductMin = {
  range: "NonNegativeInteger",
  initialValue: 2,
  //label: "Min Products to Purchase"
};
sim.model.v.purchaseProductMax = {
  range: "NonNegativeInteger",
  initialValue: 4,
  //label: "Min Products to Purchase"
};
/*******************************************************************************
 * Define Initial State
 ******************************************************************************/
// Initial Objects
sim.scenario.initialState.objects = {};

// Initial Events
sim.scenario.initialState.events = [ {
    typeName: "ReminderGenInv",
    occTime: 1,
    state: 2
  },
  {
    typeName: "ReminderDemand",
    occTime: 1,
    mafia: 1,
    state: 2
  }
];

// Initial Functions
sim.scenario.setupInitialState = function () {
  var i, objId;
  var satisfactionsV = [];

  // Create the Mafia
  sim.addObject( new Mafia( {
    id: 1,
    name: "mafia",
    numFreeMaf: sim.v.numMafiosi,
    numCaptMaf: 0,
    numPrisMaf: 0,
    demandProb: sim.v.demandProb,
    toDemandEnt: [],
    pizzoPayPerc: sim.v.pizzoPayPerc,
    timeForPayment: 5,
    paidPizzo: [],
    benefitProb: sim.v.benefitProb,
    punishProb: sim.v.punishProb,
    moneyBenefitPerc: sim.v.benefitPerc,
    destroyProductPerc: sim.v.punishPerc
  } ) );

  // Create the State
  sim.addObject( new State( {
    id: 2,
    name: "state",
    numFreeOff: sim.v.numPolice,
    genInvProb: sim.v.genInvProb,
    timeGenInvMin: sim.v.timeGenInvMin,
    timeGenInvMax: sim.v.timeGenInvMax,
    timeSpecInvMin: sim.v.timeSpecInvMin,
    timeSpecInvMax: sim.v.timeSpecInvMax,
    timeTrialMin: sim.v.timeTrialMin,
    timeTrialMax: sim.v.timeTrialMax,
    timeInPrisonMin: sim.v.timeInPrisonMin,
    timeInPrisonMax: sim.v.timeInPrisonMax,
    seeAndCaptureProb: sim.v.seeCaptureProb,
    captureProb: sim.v.captureProb,
    imprisonProb: sim.v.imprisonProb,
    assistProb: sim.v.assistProb,
    entreToObserve: [],
    entreUnderObservation: []
  } ) );

  // Create Entrepreneurs
  for ( i = 0; i < sim.v.numEntrepreneurs; i += 1 ) {
    objId = i + 3;
    sim.addObject( new Entrepreneur( {
      id: objId,
      name: "entrepreneur" + i,
      wealth: 1000.0,
      profit: 0,
      inventoryLevel: 10,
      productPrice: sim.v.productPrice,
      productionVolume: sim.v.productionVolume,
      productionCost: sim.v.productionCost,
      productionBenefit: false,
      productionBenefitDuration: sim.v.productionBenefitDuration,
      productionBenefitRate: sim.v.productionBenefitRate,
      productionPunish: false,
      productionPunishDuration: sim.v.productionPunishDuration,
      productionPunishRate: sim.v.productionPunishRate,
      productionImpactDuration: 0,
      numPizzoRequest: 0,
      numPaidPizzo: 0,
      numNoPaidPizzo: 0,
      numPizzoRep: 0,
      numEffectiveRep: 0,
      numBenefit: 0,
      numPunishment: 0,
      numPunishRep: 0,
      numCompensation: 0,
      destroyedProducts: 0,
      notProducedProducts: 0,
      stateProtector: sim.v.stateProtector
    } ) );

    // Create Produce Products event
    sim.scheduleEvent( new ProduceProducts( {
      occTime: 1,
      entrepreneur: objId
    } ) );

    satisfactionsV[ objId ] = 5;
  }

  // Create Customers
  for ( i = 0; i < sim.v.numCustomers; i += 1 ) {
    objId = 3 + sim.v.numEntrepreneurs + i;
    sim.addObject( new Customer( {
      id: objId,
      name: "customer" + i,
      purchaseProb: sim.v.purchaseProb,
      purchaseProductMin: sim.v.purchaseProductMin,
      purchaseProductMax: sim.v.purchaseProductMax,
      satisfactions: satisfactionsV
    } ) );

    // Create ReminderPurchase events
    sim.scheduleEvent( new ReminderPurchase( {
      occTime: 1,
      customer: objId
    } ) );
  }
};

/*******************************************************************************
 * Define Output Statistics Variables
 ******************************************************************************/
sim.model.statistics = {
  /*"freeMafiosi": {
    objectType:"Mafia",
    objectIdRef: 1,
    property:"numFreeMaf",
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    label:"Free Mafiosi"
  },
  "notProducedProducts": {
    objectType:"Entrepreneur",
    objectIdRef: 5,
    property:"notProducedProducts",
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    label:"notProducedProducts"
  },
  "profit": {
    objectType:"Entrepreneur",
    objectIdRef: 5,
    property:"profit",
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    label:"Profit"
  },*/
  "pizzoRequested": {
    range: "NonNegativeInteger",
    label: "Pizzo Requested",
    initialValue: 0
  },
  "pizzoPaid": {
    range: "NonNegativeInteger",
    label: "Paid Pizzo",
    initialValue: 0
  },
  "pizzoNotPaid": {
    range: "NonNegativeInteger",
    label: "Not Paid Pizzo",
    initialValue: 0
  },
  "pizzoPaidTotal": {
    range: "PositiveDecimal",
    label: "Total Paid Pizzo",
    initialValue: 0
  },
  "benefits": {
    range: "NonNegativeInteger",
    label: "Benefits",
    initialValue: 0
  },
  "pizzoReported": {
    range: "NonNegativeInteger",
    label: "Pizzo Reports",
    initialValue: 0
  },
  "punishments": {
    range: "NonNegativeInteger",
    label: "Punishments",
    initialValue: 0
  },
  "punishmentReported": {
    range: "NonNegativeInteger",
    label: "Punishments Reported",
    initialValue: 0
  },
  "assistanceRequested": {
    range: "NonNegativeInteger",
    label: "Assistance Requested",
    initialValue: 0
  },
  "assistanceProvided": {
    range: "NonNegativeInteger",
    label: "Assistance Provided",
    initialValue: 0
  },
  "assistanceTotal": {
    range: "PositiveDecimal",
    label: "Total Assistance",
    initialValue: 0
  },
  "genInv": {
    range: "NonNegativeInteger",
    label: "General Inv",
    initialValue: 0
  },
  "genInvMissed": {
    range: "NonNegativeInteger",
    label: "Missed General Inv",
    initialValue: 0
  },
  "genInvSuccess": {
    range: "NonNegativeInteger",
    label: "Successful General Inv",
    initialValue: 0
  },
  "specInv": {
    range: "NonNegativeInteger",
    label: "Specific Inv",
    initialValue: 0
  },
  "specInvMissed": {
    range: "NonNegativeInteger",
    label: "Missed Specific Inv",
    initialValue: 0
  },
  "specInvSuccess": {
    range: "NonNegativeInteger",
    label: "Successful Specific Inv",
    initialValue: 0
  },
  "imprisonments": {
    range: "NonNegativeInteger",
    label: "Imprisonments",
    initialValue: 0
  },
  "productsProduced": {
    range: "NonNegativeInteger",
    label: "Produced Products",
    initialValue: 0
  },
  "productsRequested": {
    range: "NonNegativeInteger",
    label: "Requested Products",
    initialValue: 0
  },
  "productsPurchased": {
    range: "NonNegativeInteger",
    label: "Purchased Products",
    initialValue: 0
  },
  "purchaseRequestsMissed": {
    range: "NonNegativeInteger",
    label: "Missed Requests",
    initialValue: 0
  },
  "liquidity": {
    range: "PositiveDecimal",
    label: "Liquidity",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      var total = 0;
      var entrepreneurs = cLASS[ "Entrepreneur" ].instances;
      Object.keys( entrepreneurs ).forEach( function ( objId ) {
        total += entrepreneurs[ objId ].wealth;
      } );

      return total;
    }
  }
};