/*******************************************************************************
 * The PerformService activity class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/

/**
 * @type {cLASS}
 *
 * When a new PerformService JS object is created via the CustomerArrival event rule
 * scheduling an ActivityStart event with a resource allocation {"serviceDesk": this.serviceDesk},
 * a corresponding "serviceDesk" property slot is created. Consequently, the expression
 * "this.serviceDesk" can be used for accessing the associated serviceDesk object.
 */

var PerformService = new cLASS({
  Name: "PerformService",
  label: "Perform services",
  shortLabel: "Service",
  supertypeName: "aCTIVITY",
  // resource roles are special reference properties
  resourceRoles: {"serviceDesk": {range:"ServiceDesk", exclusive: true}},
  properties: {},  // there are no additional properties
  methods: {
/*
    // event rule for ActivityStart
    "onActivityStart": function () {
    },
*/
    // event rule for ActivityEnd
    "onActivityEnd": function () {
      var events = [];
      // remove customer from queue
      this.serviceDesk.queueLength--;
      // update statistics
      sim.stat.departedCustomers++;
      // if there are still customers waiting
      if (this.serviceDesk.queueLength > 0) {
        // start next service
        events.push( new oes.ActivityStart({
          occTime: sim.time + 1,
          activityType: "PerformService",
          /* a property "serviceDesk" is created  automatically from the corresponding
           resource role defined in the resources map of the ActivityStart event  */
          resources: {"serviceDesk": this.serviceDesk}
        }));
      }
      return events;
    }
  }
});

// provide an automatically generated/derived ID
PerformService.generateId = function () {
  return 1000 + sim.time;
};

PerformService.randomDuration = function () {
  return rand.frequency({"1":0.1, "2":0.2, "3":0.3, "4":0.25, "5":0.1, "6":0.05});
};
