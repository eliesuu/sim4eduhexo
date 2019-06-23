var SingleProductShop = new cLASS({
  Name: "SingleProductShop",
  shortLabel: "Shop",
  supertypeName: "oBJECT",
  properties: {
    "quantityInStock": {range:"NonNegativeInteger", label:"Stock", shortLabel:"stock"},
    "reorderInterval": {range:"NonNegativeInteger"},
    "targetInventory": {range:"PositiveInteger"}
  }
});
