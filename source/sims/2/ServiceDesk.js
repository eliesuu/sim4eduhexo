var ServiceDesk = new cLASS({
  Name: "ServiceDesk",
  supertypeName: "oBJECT",
  properties: {
    "queueLength": { range: "NonNegativeInteger",
        label: "Queue length", shortLabel: "qLen"}
  }
});
ServiceDesk.serviceDuration = function () {
  return rand.frequency({"2":0.3, "3":0.5, "4":0.2});
  /* Or, alternatively,
  var r = rand.uniformInt( 0, 99);
  if ( r < 30) return 2;         // probability 0.30
  else if ( r < 80) return 3;    // probability 0.50
  else return 4;                 // probability 0.20
  */
};