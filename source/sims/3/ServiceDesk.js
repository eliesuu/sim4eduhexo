var ServiceDesk = new cLASS({
  Name: "ServiceDesk",
  label: "Service desks",
  supertypeName: "oBJECT",
  properties: {
    "queueLength": { range: "NonNegativeInteger", label: "Queue length",
        shortLabel: "qLen"}
  }
});
