var CustomerArrival = new cLASS({
  Name: "CustomerArrival",
  shortLabel: "Arr",  // for the log
  supertypeName: "eVENT",
  properties: {},
  methods: {
    "onEvent": function () {
      var events = [];
      sim.v.queueLength++;  // increment global variable
      sim.stat.arrivedCustomers++;
      // if the service desk is not busy
      if (sim.v.queueLength === 1) {
        events.push( new CustomerDeparture({
          occTime: this.occTime + sim.model.f.serviceDuration()
        }));
      }
      return events;
    }
  }
});
// Any exogenous event type needs to define a static function "recurrence"
CustomerArrival.recurrence = function () {
  return rand.uniformInt( 1, 6); 
};
// Any exogenous event type needs to define a static function "createNextEvent"
CustomerArrival.createNextEvent = function (e) {
 return new CustomerArrival({
     occTime: e.occTime + CustomerArrival.recurrence()
  });
};
