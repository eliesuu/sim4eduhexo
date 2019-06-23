/*******************************************************************************
 * The ConsiderPayPizzo event class
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var ConsiderPayPizzo = new cLASS( {
  Name: "ConsiderPayPizzo",
  shortLabel: "Cpp",
  supertypeName: "eVENT",
  properties: {
    "entrepreneur": { range: "Entrepreneur" },
    "mafia": { range: "Mafia" },
    "state": { range: "State" },
    "pizzoToPay": { range: "Decimal" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];
      var increasedProd, reducedProd;
      var mafiaBenefit, benefitProd, benefitPayback;
      var mafiaPunish, punishProd, punishWarehouse;
      var pay, notPay, convPay, convNotPay, IGpay;
      
      /* Estimate Mafia benefit */
      increasedProd = ((this.entrepreneur.productionVolume *
          this.entrepreneur.productionBenefitRate) -
          this.entrepreneur.productionVolume) *
          this.entrepreneur.productionBenefitDuration;
      
      benefitProd = parseFloat( increasedProd *
          (this.entrepreneur.productPrice - 
              this.entrepreneur.productionCost).toFixed( 2 ) );
      
      benefitPayback = parseFloat( (this.mafia.moneyBenefitPerc *
          this.pizzoToPay).toFixed( 2 ) );
      
      if ( benefitProd > benefitPayback ) {
        mafiaBenefit = benefitProd;
      } else {
        mafiaBenefit = benefitPayback;
      }
      
      // Calculate the inclination to Pay Pizzo
      pay = mafiaBenefit - this.pizzoToPay;
      
      /* Estimate Mafia punishment */
      reducedProd = (this.entrepreneur.productionVolume -
          (this.entrepreneur.productionVolume *
              this.entrepreneur.productionPunishRate)) *
              this.entrepreneur.productionPunishDuration;
      
      punishProd = parseFloat( reducedProd *
          (this.entrepreneur.productPrice - 
              this.entrepreneur.productionCost).toFixed( 2 ) );
      
      punishWarehouse = parseFloat( (this.entrepreneur.inventoryLevel *
          this.mafia.destroyProductPerc *
          this.entrepreneur.productPrice).toFixed( 2 ) );
      
      if ( punishWarehouse > punishProd ) {
        mafiaPunish = punishWarehouse;
      } else {
        mafiaPunish = punishProd;
      }
      
      // Calculate the inclination to Not Pay Pizzo
      notPay = (-mafiaPunish * (this.entrepreneur.numPunishment /
          this.entrepreneur.numNoPaidPizzo)) || 0;
      
      // Normalize the Pay and Not Pay values
      convPay = (Math.atan2( 0.01 * pay, 1 ) / Math.PI) + 0.5;
      convNotPay = (Math.atan2( 0.01 * notPay, 1 ) / Math.PI) + 0.5;
      IGpay = (convPay / (convPay + convNotPay)) || 0;
      
      // Decide to Pay Pizzo
      if ( (rand.uniform() < IGpay) && 
          (this.entrepreneur.wealth >= this.pizzoToPay) ) {
        this.entrepreneur.wealth -= this.pizzoToPay;
        this.entrepreneur.numPaidPizzo += 1;
        
        this.mafia.setPizzoPaid( this.entrepreneur.id );
        
        // Update statistics on Pizzo Paid
        sim.stat.pizzoPaid += 1;
        sim.stat.pizzoPaidTotal += this.pizzoToPay;
        
      // Decide NOT to Pay Pizzo
      } else {
        this.entrepreneur.numNoPaidPizzo += 1;
        
        followupEvents.push( new ConsiderReportPizzo( {
          occTime: this.occTime + 1,
          mafia: this.mafia,
          entrepreneur: this.entrepreneur,
          state: this.state
        } ) );
        
        // Update statistics on Pizzo Not Paid
        sim.stat.pizzoNotPaid += 1;
      }
      
      this.entrepreneur.profit = 0;
      
      return followupEvents;
    }
  }
} );
