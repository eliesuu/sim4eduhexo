/*******************************************************************************
 * The Reception activity class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/

/**
 * @type {cLASS}
 *
 * When a new Reception JS object is created via the CustomerArrival event rule
 * scheduling an ActivityStart event with a resource allocation {"serviceDesk": this.serviceDesk},
 * a corresponding "serviceDesk" property slot is created. Consequently, the expression
 * "this.serviceDesk" can be used for accessing the associated serviceDesk object.
 */

var OrderPickup = new cLASS({
  Name: "OrderPickup",
  shortLabel: "OrdPick",
  supertypeName: "aCTIVITY",
  // resource roles are special reference properties
  resourceRoles: {"pickupWindow": {range:"PickupWindow", exclusive: true}},
  properties: {},  // there are no additional properties
  methods: {
    // event rule for ActivityStart
    /*
    "onActivityStart": function () {},
    */
    // event rule for ActivityEnd
    "onActivityEnd": function () {
      var followupEvents = [], orderNo = 0, customer=null,
          pw = this.pickupWindow;
      // remove customer from queue
      customer = pw.waitingCustomers.shift();
      // remove order from order set
      pw.preparedOrders = pw.preparedOrders.filter( function (ordNo) {
        return ordNo !== customer.id;
      });
      // remove customer from simulation
      sim.removeObject( customer);
      // update statistics
      sim.stat.departedCustomers++;
      sim.stat.cumulativeTimeInSystem += sim.time - customer.arrivalTime;
      // if there are still customers waiting
      if (pw.waitingCustomers.length > 0) {
        // if menu board has been blocked due to a full pickup queue?
        if (pw.waitingCustomers.length === pw.maxLineSize-1 && pw.menuBoard.isBlocked) {
          // remove next customer from menu board queue
          customer = pw.menuBoard.waitingCustomers.shift();
          // add customer to the pickup window queue
          pw.waitingCustomers.push( customer);
          // if there are still customers waiting at the menu board?
          if (pw.menuBoard.waitingCustomers.length > 0) {
            // schedule next OrderTaking activity
            followupEvents.push( new oes.ActivityStart({
              occTime: sim.time + 1,
              activityType: "OrderTaking",
              // define resource roles 
              resources: {"menuBoard": pw.menuBoard}
            }));
          }
          delete pw.menuBoard.isBlocked;  // unset flag
        }
        if (pw.preparedOrders.includes( pw.waitingCustomers[0].id)) {
          // schedule next OrderPickup activity start event
          followupEvents.push( new oes.ActivityStart({
            occTime: sim.time + 1,
            activityType: "OrderPickup",
            // define resource roles 
            resources: {"pickupWindow": pw}
          }));
        }  
      }
      return followupEvents;
    }
  }
});

OrderPickup.randomDuration = function () {
  return sim.model.f.twoDice() * 10;
};
