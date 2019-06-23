/*******************************************************************************
 * The CustomerArrival event class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/

/**
 * @type {cLASS}
 */
var CustomerArrival = new cLASS({
  Name: "CustomerArrival",
  shortLabel: "Arr",
  supertypeName: "eVENT",
  properties: {
    "menuBoard": {range: "MenuBoard"}
  },
  methods: {
    "onEvent": function () {
      var followupEvents=[], customer=null,
          customerOrderValue = sim.model.f.twoDice() * 2 - 2;
      // if the menu board queue is full?
      if (this.menuBoard.waitingCustomers.length >= this.menuBoard.maxLineSize) {
        sim.stat.lostCustomers++;
        sim.stat.lostRevenue += customerOrderValue;
      } else {
        sim.stat.arrivedCustomers++;
        sim.stat.revenue += customerOrderValue;
        customer = new Customer({arrivalTime: this.occTime});
        sim.addObject( customer);
        this.menuBoard.waitingCustomers.push( customer);
        // if the menu board is not busy?
        if (this.menuBoard.waitingCustomers.length === 1) {
          // start new OrderTaking activity
          followupEvents.push( new oes.ActivityStart({
            occTime: this.occTime+1,
            activityType: "OrderTaking",
            // on activity creation resource roles are copied to corresp. property slots
            resources: {"menuBoard": this.menuBoard}
          }));
        }
      }
      return followupEvents;
    }
  }
});
// Any exogenous event type needs to define a static function "recurrence"
CustomerArrival.recurrence = function () {
  return sim.model.f.twoDice() * 10;
};
// Any exogenous event type needs to define a static function "createNextEvent"
CustomerArrival.createNextEvent = function (e) {
  return new CustomerArrival({
    occTime: e.occTime + CustomerArrival.recurrence(),
    menuBoard: e.menuBoard  // always arriving at the same menu board
  });
};
