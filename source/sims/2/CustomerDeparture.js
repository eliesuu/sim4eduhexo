var CustomerDeparture = new cLASS({
  Name: "CustomerDeparture",
  label: "Customer departures",
  shortLabel: "Dep",
  supertypeName: "eVENT",
  properties: {
    "serviceDesk": {range: "ServiceDesk", label:"Service desk"}
  },
  methods: {
    "onEvent": function () {
      var events=[], srvTm=0;
      // remove/pop customer from FIFO queue (FIFO pop = JS shift)
      var departingCustomer = this.serviceDesk.waitingCustomers.shift();
      // add the time the customer has spent in the system
      sim.stat.cumulativeTimeInSystem += this.occTime - departingCustomer.arrivalTime;
      // remove customer from simulation
      sim.removeObject( departingCustomer);
      // update statistics
      sim.stat.departedCustomers++;
      // if there are still customers waiting
      if (this.serviceDesk.waitingCustomers.length > 0) {
        // start next service and schedule its end/departure
        srvTm = ServiceDesk.serviceDuration();
        events.push( new CustomerDeparture({
          occTime: this.occTime + srvTm,
          serviceDesk: this.serviceDesk
        }));
      }
      return events;
    }
  }
});
