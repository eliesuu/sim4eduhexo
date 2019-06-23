var OutputItemType = new cLASS( {
  Name: "OutputItemType",
  supertypeName: "ItemType",
  properties: {
    "productCategory": {range: "ProductCategory", label: "Product category"},
    "salesPrice": {range: "PositiveDecimal", label: "Sales price"},
    "batchSize": {range: "PositiveDecimal", label: "Batch size"},  // in quantity units
    "stockQuantity": {range: "Decimal", label: "Stock quantity", shortLabel: "qty"},  // in quantity units
    "bomItemsPerBatch": {range: Object, label: "Bill of materials"},
    // a non-persistent variable
    "plannedProductionQuantity": {range: "Integer"} // in number of batches
  }
} );