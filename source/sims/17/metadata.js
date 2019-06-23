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
sim.model.name = "LemonadeStand-1";
sim.model.title = "A Lemonade Stand as a Manufacturing Company";
sim.model.systemNarrative = "<p>A lemonade seller makes lemonade in pitchers and sells it in paper cups at a stand in a street market. " +
    "Each day consists of the following process steps and phases:</p>" +
    "<ol><li>The day starts with making planning decisions (demand forecasting, production planning and sales price planning) " +
    "and purchasing the required input materials (lemons, sugar, etc.).</li>" +
    "<li>Some time later, the ordered input materials are delivered, the planned quantity of lemonade is produced and the stand is opened.</li>" +
    "<li>Then, customers arrive randomly and order a cup of lemonade. As long as there is still lemonade in stock, customer orders are served.</li>" +
    "<li>At the end of the day, the lemonade stand is closed and the remaining lemonade and expired input items are dumped.</li></ol>" +
    "<p>The <a href='https://en.wikipedia.org/wiki/Lemonade_Stand'>Lemonade Stand Game</a> was developed in 1973 by Bob Jamison for mainframe " +
    "computers and was later ported to the Apple II platform in 1979 and distributed by Apple throughout the 1980s.</p>";
sim.model.shortDescription = "<p>A lemonade stand can be modeled in a generic way as an instance of a <em>single product manufacturing company</em> " +
    "that uses an input inventory and transforms <em>input items</em> into an <em>output item</em> (the product). We make a series of three " +
    "increasingly complex models of lemonade stands:</p>" +
    "<ol><li>In the basic model, we build a scenario with just one lemonade stand (a monopoly) and we abstract away from market conditions, " +
    "customers and individual customer orders as well as from suppliers, " +
    "individual replenishment orders and corresponding deliveries, inventory management, marketing activities and competition. " +
    "Customer orders are aggregated into a random daily demand quantity. An aggregate replenishment order is directly converted " +
    "into a corresponding daily delivery. Due to reliable daily deliveries there is no need for inventory management.</li>" +
    "<li>In the second model, we consider individual (possibly delayed) deliveries, inventory management and market conditions dominated by the weather.</li>" +
    "<li>In the third model, we consider individual customers and we build a scenario with several lemonade stands that compete with each other.</li>" +
    "</ol>";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.contributors = "Ke Xu";
sim.model.created = "2018-03-13";
sim.model.modified = "2018-03-14";
