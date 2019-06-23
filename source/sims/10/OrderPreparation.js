/*******************************************************************************
 * The OrderPreparation activity class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/

/**
 * @type {cLASS}
 *
 */
var OrderPreparation = new cLASS({
  Name: "OrderPreparation",
  shortLabel: "OrdPrep",
  supertypeName: "aCTIVITY",
  // resource roles are special reference properties
  resourceRoles: {"kitchen": {range:"Kitchen", exclusive: true}},
  properties: {},  // there are no additional properties
  methods: {
/*
    // event rule for ActivityStart
    "onActivityStart": function () {
    },
*/
    // event rule for ActivityEnd
    "onActivityEnd": function () {
      var followupEvents = [], orderNo=0,
          pickupWindow = this.kitchen.pickupWindow;
      // remove order from kitchen queue
      orderNo = this.kitchen.waitingOrders.shift();
      // deliver order to the pickup window (recall that orderNo = customer.id)
      pickupWindow.preparedOrders.push( orderNo);
      // has the pickup window been waiting for this specific order?
      if (pickupWindow.waitingCustomers.length > 0 &&
          orderNo === pickupWindow.waitingCustomers[0].id) {
        // start OrderPickup activity for this waiting customer
        followupEvents.push( new oes.ActivityStart({
          occTime: sim.time+1,
          activityType: "OrderPickup",
          // define resource roles 
          resources: {"pickupWindow": pickupWindow}
        }));
      }
      // if there are still orders in the kitchen's order queue?
      if (this.kitchen.waitingOrders.length > 0) {
        // schedule next OrderPreparation activity
        followupEvents.push( new oes.ActivityStart({
          occTime: sim.time+1,
          activityType: "OrderPreparation",
          // define resource roles (s.th. corresp. activity properties will be created)
          resources: {"kitchen": this.kitchen}
        }));
      }
      return followupEvents;
    }
  }
});

OrderPreparation.randomDuration = function () {
  return sim.model.f.twoDice() * 10;
};
