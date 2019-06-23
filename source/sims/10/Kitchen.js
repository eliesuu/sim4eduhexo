var Kitchen = new cLASS({
  Name: "Kitchen",
  shortLabel: "Kit",
  supertypeName: "oBJECT",
  properties: {
    "waitingOrders": { range: "Integer", label: "Waiting Orders",
        shortLabel: "ordQ", minCard: 0, maxCard: Infinity},
    "pickupWindow": { range: "PickupWindow"}
  }
});
