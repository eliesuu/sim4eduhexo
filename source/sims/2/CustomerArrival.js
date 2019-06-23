/*******************************************************************************
 * The CustomerArrival event class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/
var CustomerArrival = new cLASS({
  Name: "CustomerArrival",
  label: "Customer arrivals",
  shortLabel: "Arr",
  supertypeName: "eVENT",
  properties: {
    "serviceDesk": {range: "ServiceDesk", label:"Service desk"}
  },
  methods: {
    "onEvent": function () {
      var srvTm=0, followupEvents=[];
      // create new customer object
      this.customer = new Customer({arrivalTime: this.occTime});
      sim.addObject( this.customer);
      // push new customer to the queue
      this.serviceDesk.waitingCustomers.push( this.customer);
      // update statistics
      sim.stat.arrivedCustomers++;
      // if the service desk is not busy
      if (this.serviceDesk.waitingCustomers.length === 1) {
        srvTm = ServiceDesk.serviceDuration();
        followupEvents.push( new CustomerDeparture({
          occTime: this.occTime + srvTm,
          serviceDesk: this.serviceDesk
        }));
      }
      return followupEvents;
    },
    "createNextEvent": function () {
      return new CustomerArrival({
        occTime: this.occTime + CustomerArrival.recurrence(),
        serviceDesk: this.serviceDesk
      });
    }
  }
});
// Any exogenous event type needs to define a static function "recurrence"
CustomerArrival.recurrence = function () {
  return rand.exponential( sim.v.arrivalEventRate);
};
