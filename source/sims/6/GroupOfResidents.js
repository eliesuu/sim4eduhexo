/* Species is a powertype, so its instances are object types.
   This will be supported by a future OES version.
 */
var GroupOfResidents = new cLASS({
  Name: "GroupOfResidents",
  supertypeName: "oBJECT",  //TODO: a group is not an ordinary object, but a type
  properties: {
    "toleranceLevel": {range: "ClosedUnitIntervall", label:"Tolerance level",
        hint:"The different-neighbor percentage tolerated for being content"}
  },
  methods: {
  }
});
