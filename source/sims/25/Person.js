/*******************************************************************************
 * Person object class
 *
 * @copyright Copyright 2019 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 ******************************************************************************/
var Person = new cLASS( {
  Name: "Person",
  supertypeName: "oBJECT",
  properties: {
    "state": {
      range: "NonNegativeInteger",
      label: "State"
    },
    "probTransmission": {
      range: "PositiveDecimal",
      label: "Transmission probability"
    },
    "probRecovery": {
      range: "PositiveDecimal",
      label: "Recovery probability"
    }
  },
  methods: {
    /**
     * @description Interaction between two individuals
     * @param partner Individual to interact
     * @returns State of the individual after the interaction
     */
    "interact": function ( person ) {
      if ( ( person.state === 1 ) &&
        ( this.state === 0 ) &&
        ( rand.uniform() < this.probTransmission ) ) {
        this.state = 1;
        sim.v.totalInfected += 1;
      }
      return this.state;
    },

    /**
     * @description Infection recovery
     * @returns true if recovered, false otherwise
     */
    "recover": function () {
      if ( ( this.state === 1 ) && ( rand.uniform() < this.probRecovery ) ) {
        this.state = 2;
        return true;
      }
      return false;
    }
  }
} );