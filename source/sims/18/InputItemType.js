var InputItemType = new cLASS({
  Name: "InputItemType",
  supertypeName: "ItemType",
  properties: {
    "purchasePrice": {range: "Decimal", label: "Purchase price (per supply unit)"},
    "targetInventory": {range: "PositiveDecimal", label: "Target inventory (in qty.units)"},
    "reorderPeriod": {range:"PositiveDecimal", optional:true, label:"Reorder period (in #days)"},
    "reorderPoint": {range:"PositiveDecimal", optional:true, label:"Reorder point (in qty.units)"},
    "justInTime": {range:"Boolean", optional:true, label:"Just-in time delivery?"},
    // non-persistent variable
    "outstandingOrder":  {range:"Boolean", optional:true}
  }
});