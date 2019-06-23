var ItemType = new cLASS({
  Name: "ItemType",
  supertypeName: "oBJECT",
  properties: {
    "name": {range: "NonEmptyString", label: "Item name"},
    "quantityUnit": {range: "NonEmptyString", label: "Quantity unit"},
    "supplyUnit": {range: "NonEmptyString", label: "Supply unit"},
    "quantityPerSupplyUnit": {range: "Decimal", label: "Quantity/SupplyUnit"}
  }
});
