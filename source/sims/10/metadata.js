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
sim.model.name = "DriveThru-1";
sim.model.title = "Drive Through Restaurant";
sim.model.systemNarrative = "<p>As a car enters the drive thru from the street, the driver decides "+
    "whether or not to get in line. If she decides to leave the restaurant, she counts as a lost customer. "+
    "If she decides to get in line, she waits until the menu board is available. At that time, she gives "+
    "the order to the order taker. After the order is taken, two things occur simultaneously:</p>"+
    "<ol><li>the driver moves forward if there is room, otherwise she has to wait at the menu board "+
    "until there is room to move forward.</li>"+
    "<li>The order is sent back to the kitchen where it is prepared with some delay.</li></ol>"+
    "<p>As soon as the driver reaches the pickup window, she pays and picks up her food, if it is ready. "+
    "If the food is not yet ready, she has to wait until her order is delivered to the pickup window.</p>";
sim.model.shortDescription = "The drive thru is modeled as a system with order processing "+
    "activities performed at three service points with queues: the order taking at the menu board, " +
    "the order preparation at the kitchen and the order pickup at the pickup window. The model includes " +
    "four object types: MenuBoard, Kitchen, PickupWindow and Customer, one event type: " +
    "CustomerArrival, and three activity types: OrderTaking, OrderPreparation and OrderPickup. " +
    "NB: In a more realistic model, the order queue in the kitchen would be served by several kitchen " +
    "staff members in parallel, such that they represent the resources of the OrderPreparation activity.";
sim.model.source = "<a href='http://www.informs-sim.org/wsc08papers/005.pdf'>Introduction to Simulation</a> " +
    "by R.G. Ingalls, in <em>Proceedings of the 2008 Winter Simulation Conference</em>";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-12-07";
sim.model.modified = "2019-01-09";
