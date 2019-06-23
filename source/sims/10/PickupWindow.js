var PickupWindow = new cLASS({
  Name: "PickupWindow",
  shortLabel: "PW",
  supertypeName: "oBJECT",
  properties: {
    "waitingCustomers": {range: "Customer", label: "Waiting customers",
        shortLabel: "custQ", minCard: 0, maxCard: Infinity},
    "maxLineSize": {range: "NonNegativeInteger",label: "Queue length limit"},
    "preparedOrders": {range: "Integer", label: "Prep. orders cust.ID",
        shortLabel: "prepOrd", minCard: 0, maxCard: Infinity},
    "suspendedActivityId": {range: "Integer", optional: true, shortLabel: "suspActId"},
    "menuBoard": { range: "MenuBoard"}
  }
});
