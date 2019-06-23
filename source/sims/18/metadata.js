var sim = sim || {};
sim.model = sim.model || {};
sim.scenario = sim.scenario || {};
sim.config = sim.config || {};

var oes = oes || {};
oes.ui = oes.ui || {};
oes.ui.explanation = {};
oes.ui.i18n = {transDates:{}, changeDates:{}};

/*******************************************************
 Simulation Model
********************************************************/
sim.model.name = "LemonadeStand-2";
sim.model.title = "A Lemonade Stand as a Manufacturing Company in a Monopoly Market Dominated by Weather Conditions";
sim.model.systemNarrative = "A lemonade stand has to deal with often delayed deliveries (of lemons, sugar, etc.) " +
    "by means of inventory management with continuous or periodic review policies. Its market conditions are dominated " +
    "by the weather: the more sunny and warm its is, the higher is the demand for lemonade.";
sim.model.shortDescription = "This model modifies and extends the LemonadeStand-1 model by implementing " +
    "replenishment policies for input items, requiring to replace daily aggregate delivery events with leadtime-delayed " +
    "delivery events per input item, and by implementing market conditions dominated by the weather.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.contributors = "Ke Xu";
sim.model.created = "2017-09-19";
sim.model.modified = "2018-03-15";
