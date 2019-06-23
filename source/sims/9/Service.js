/*******************************************************************************
 * The Service activity class
 *
 * @copyright Copyright 2015-2016 Gerd Wagner
 *   Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license The MIT License (MIT)
 * @author Gerd Wagner
 ******************************************************************************/

/**
 * @type {cLASS}
 *
 * When a new Service activity is created (in the form of a JS object) by an
 * ActivityStart event with a resource allocation {"serviceProvider": this.serviceProvider}
 * scheduled, e.g., by the CustomerArrival event rule, a corresponding "serviceProvider"
 * property slot is created. Consequently, the expression "this.serviceProvider" can be
 * used for accessing the associated serviceProvider object.
 */

var Service = new cLASS({
  Name: "Service",
  supertypeName: "aCTIVITY",
  shortLabel: "Service",
  // resource roles are special reference properties
  resourceRoles: {"serviceProvider": {range:"ServiceProvider", exclusive: true}},
  properties: {},  // there are no additional properties
  methods: {
/*
    // event rule for ActivityStart
    "onActivityStart": function () {
    },
*/
    // event rule for ActivityEnd
    "onActivityEnd": function () {
      var followupEvents = [], customer=null,
          nextServiceProvider = this.serviceProvider.nextServiceProvider;
      // remove customer from queue
      customer = this.serviceProvider.waitingCustomers.shift();
      // is there a successor service desk?
      if (nextServiceProvider) {
        // add customer to the queue of the next service desk
        nextServiceProvider.waitingCustomers.push( customer);
        // is the next service desk available/idle?
        if (nextServiceProvider.waitingCustomers.length === 1) {
          // start new service at next service desk
          followupEvents.push( new oes.ActivityStart({
            occTime: sim.time + 1,
            activityType: "Service",
            // on activity creation resource roles are copied to corresp. property slots
            resources: {"serviceProvider": nextServiceProvider}
          }));
        }
      } else {  // there is no successor service desk
        // add the time the customer has spent in the system
        sim.stat.cumulativeTimeInSystem += sim.time - customer.arrivalTime;
        // remove customer from simulation
        sim.removeObject( customer);
        // update departedCustomers statistics
        sim.stat.departedCustomers++;
      }
      // if there are still customers waiting?
      if (this.serviceProvider.waitingCustomers.length > 0) {
        // schedule next service start event
        followupEvents.push( new oes.ActivityStart({
          occTime: sim.time + 1,
          activityType: "Service",
          /* a property "serviceProvider" is created automatically from the corresponding
           resource role defined in the resources map of the ActivityStart event  */
          resources: {"serviceProvider": this.serviceProvider}
        }));
      }
      return followupEvents;
    }
  }
});
Service.randomDuration = function () {
  var r = rand.uniformInt( 0, 99);
  if ( r < 10) return 1;         // probability 0.10
  else if ( r < 30) return 2;    // probability 0.20
  else if ( r < 60) return 3;    // probability 0.30
  else if ( r < 85) return 4;    // probability 0.25
  else if ( r < 95) return 5;    // probability 0.10
  else return 6;                 // probability 0.05
};

