var CustomerDeparture = new cLASS({
  Name: "CustomerDeparture",
  shortLabel: "Dep",  // for the log
  supertypeName: "eVENT",
  properties: {},
  methods: {
    "onEvent": function () {
      var events = [];
      // remove customer from queue
      sim.v.queueLength--;
      // if there are still customers waiting
      if (sim.v.queueLength > 0) {
        // start next service and schedule its end/departure
        events.push( new CustomerDeparture({
            occTime: this.occTime + sim.model.f.serviceDuration()
        }));
      }
      sim.stat.departedCustomers++;
      return events;
    }
  }
});
