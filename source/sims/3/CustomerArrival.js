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
  label: "Customer arrivals",
  shortLabel: "Arr",
  supertypeName: "eVENT",
  properties: {
    "serviceDesk": {range: "ServiceDesk", label:"Service desk"}
  },
  methods: {
    "onEvent": function () {
      var events=[];
      this.serviceDesk.queueLength++;
      sim.stat.arrivedCustomers++;
      // if the service desk is not busy
      if (this.serviceDesk.queueLength === 1) {
        events.push( new oes.ActivityStart({
          occTime: this.occTime+1,
          activityType: "PerformService",
          // on activity creation resource roles are copied to corresp. property slots
          resources: {"serviceDesk": this.serviceDesk}
        }));
      }
      return events;
    }
  }
});
// Any exogenous event type needs to define a static function "recurrence"
CustomerArrival.recurrence = function () {
  return rand.exponential( 0.3);
};
