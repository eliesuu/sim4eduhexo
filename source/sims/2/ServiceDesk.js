var ServiceDesk = new cLASS({
  Name: "ServiceDesk",
  label: "Service desks",
  supertypeName: "oBJECT",
  properties: {
    "waitingCustomers": { range: "Customer", label: "Waiting customers",
      shortLabel: "queue", minCard: 0, maxCard: Infinity}
  }
});
ServiceDesk.serviceDuration = function () {
  return rand.exponential( 0.5);
};