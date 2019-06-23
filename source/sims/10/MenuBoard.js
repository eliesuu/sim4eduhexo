var MenuBoard = new cLASS({
  Name: "MenuBoard",
  shortLabel: "MB",
  supertypeName: "oBJECT",
  properties: {
    "waitingCustomers": { range: "Customer", label: "Waiting customers",
        shortLabel: "custQ", minCard: 0, maxCard: Infinity},
    "maxLineSize": { range: "NonNegativeInteger", label: "Queue length limit"},
    "kitchen": { range: "Kitchen"},
    "pickupWindow": { range: "PickupWindow"},
    "isBlocked": { range: "Boolean", optional: true, shortLabel: "blocked"}
  }
});
