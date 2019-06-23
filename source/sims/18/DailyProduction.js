/*******************************************************************************
 * The DailyProduction event class
 *
 * @copyright Copyright 2017 Gerd Wagner
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var DailyProduction = new cLASS({
  Name: "DailyProduction",
  shortLabel: "Prod",
  supertypeName: "eVENT",
  properties: {
    "company": {range: "SingleProductCompany"}
  },
  methods: {
    "onEvent": function () {
      // perform production
      this.company.performProduction();
      return [];
    }
  }
});
