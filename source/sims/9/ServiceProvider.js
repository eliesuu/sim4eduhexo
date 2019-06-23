var ServiceProvider = new cLASS({
  Name: "ServiceProvider",
  shortLabel: "SrvProv",
  supertypeName: "oBJECT",
  properties: {
    "waitingCustomers": { range: "Customer", label: "Waiting customers",
        shortLabel:"queue", minCard: 0, maxCard: Infinity, isOrdered: true},
    "nextServiceProvider": { range: "ServiceProvider", optional: true}
  }
});
