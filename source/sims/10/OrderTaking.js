/*******************************************************************************
 * The OrderTaking activity class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/

/**
 * @type {cLASS}
 *
 * When a new Reception activity is created (in the form of a JS object) by
 * an ActivityStart event with a resource allocation {"serviceDesk": this.serviceDesk}
 * scheduled by the CustomerArrival event rule, a corresponding "serviceDesk" property
 * slot is created. Consequently, the expression "this.serviceDesk" can be used for
 * accessing the associated serviceDesk object.
 */

var OrderTaking = new cLASS({
  Name: "OrderTaking",
  shortLabel: "OrdTak",
  supertypeName: "aCTIVITY",
  // resource roles are special reference properties
  resourceRoles: {"menuBoard": {range:"MenuBoard", exclusive: true}},
  properties: {},  // there are no additional properties
  methods: {
/*
    // event rule for ActivityStart
    "onActivityStart": function () {
    },
*/
    // event rule for ActivityEnd
    "onActivityEnd": function () {
      var followupEvents = [], customer = null, order = null,
          kitchen = this.menuBoard.kitchen,
          pickupWindow = this.menuBoard.pickupWindow;
      // get next customer from menu board queue
      customer = this.menuBoard.waitingCustomers[0];
      // add customer ID as order number to the kitchen's order queue
      kitchen.waitingOrders.push( customer.id);
      // if there are no other orders in the kitchen's order queue?
      if (kitchen.waitingOrders.length === 1) {
        // start OrderPreparation activity
        followupEvents.push( new oes.ActivityStart({
          occTime: sim.time+1,
          activityType: "OrderPreparation",
          // define resource roles (s.th. corresp. activity properties will be created)
          resources: {"kitchen": kitchen}
        }));
      }
      // proceed only if the pickup window queue is not full
      if (pickupWindow.waitingCustomers.length >= pickupWindow.maxLineSize) {
        this.menuBoard.isBlocked = true;
        return followupEvents;
      }
      // remove customer from menu board queue
      customer = this.menuBoard.waitingCustomers.shift();
      // add customer to the pickup window queue
      pickupWindow.waitingCustomers.push( customer);
      // if there are still customers waiting at the menu board?
      if (this.menuBoard.waitingCustomers.length > 0) {
        // schedule next OrderTaking activity
        followupEvents.push( new oes.ActivityStart({
          occTime: sim.time + 1,
          activityType: "OrderTaking",
          // define resource roles (s.th. corresp. activity properties will be created)
          resources: {"menuBoard": this.menuBoard}
        }));
      }
      return followupEvents;
    }
  }
});

OrderTaking.randomDuration = function () {
  return sim.model.f.twoDice() * 10;
};
