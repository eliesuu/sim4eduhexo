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
    "serviceProvider": {range: "ServiceProvider"}
  },
  methods: {
    "onEvent": function () {
      var srvTm=0, followupEvents=[], customer=null;
      // create new customer object
      customer = new Customer({arrivalTime: this.occTime});
      sim.addObject( customer);
      // push new customer to the queue
      this.serviceProvider.waitingCustomers.push( customer);
      // update statistics
      sim.stat.arrivedCustomers++;
      // if the service desk is not busy
      if (this.serviceProvider.waitingCustomers.length === 1) {
        followupEvents.push( new oes.ActivityStart({
          occTime: this.occTime + 1,
          activityType: "Service",
          // on activity creation resource roles are copied to corresp. property slots
          resources: {"serviceProvider": this.serviceProvider}
        }));
      }
      return followupEvents;
    }
  }
});
// Any exogenous event type needs to define a static function "recurrence"
CustomerArrival.recurrence = function () {
  return rand.uniformInt( 1, 6);  // better: exponential( 0.5)
};
