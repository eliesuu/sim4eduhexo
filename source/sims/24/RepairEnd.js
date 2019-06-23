var RepairEnd = new cLASS({
  Name: "RepairEnd",
  supertypeName: "eVENT",
  shortLabel: "RprEnd",
  properties: {
    "workStation": {range:"pROCESSINGnODE", label:"Work station"}
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      if (this.workStation.inputQueue.length > 0) {
        this.workStation.status = oes.ProcNodeStatusEL.BUSY;
        followupEvents.push( new oes.ProcessingActivityStart({
          occTime: this.occTime + sim.nextMomentDeltaT,
          activityType: "pROCESSINGaCTIVITY",
          procNode: this.workStation,
          resources: {}
        }));
      } else {
        this.workStation.status = oes.ProcNodeStatusEL.IDLE;
      }
      followupEvents.push( new Breakdown({
        occTime: this.occTime + Breakdown.dependentRecurrence(),
        workStation: this.workStation
      }));
      return followupEvents;
    }
  }
});
RepairEnd.randomDuration = function () {
  return rand.uniformInt( 30, 120);
};

