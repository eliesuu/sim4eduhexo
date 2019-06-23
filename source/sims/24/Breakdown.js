var Breakdown = new cLASS({
  Name: "Breakdown",
  shortLabel: "BrkDwn",
  supertypeName: "eVENT",
  properties: {
    "workStation": {range:"pROCESSINGnODE", label:"Work station"}
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      this.workStation.status = oes.ProcNodeStatusEL.DOWN;
      followupEvents.push( new RepairEnd({
        occTime: this.occTime + RepairEnd.randomDuration(),
        workStation: this.workStation
      }));
      return followupEvents;
    }
  }
});

Breakdown.dependentRecurrence = function () {
  return rand.exponential( 1 / (sim.v.failureRecurrenceMean * 60));
};