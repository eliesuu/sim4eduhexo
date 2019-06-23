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
sim.model.name = "ServiceDesk-2";
sim.model.title = "A Continuous Time Service Queue Model with Mean Response Time Statistics";
oes.ui.i18n.changeDates.title = "2018-10-01";
sim.model.systemNarrative = "The customers arriving at a service desk " +
    "have to wait in a queue when the service desk is busy. Otherwise, when the queue is empty " +
    "and the service desk is not busy, they are immediately served by the service clerk. Whenever " +
    "a service is completed, the served customer departs and the next customer from the queue, " +
    "if there is any, will be served.";
oes.ui.i18n.changeDates.systemNarrative = "2017-04-19";
sim.model.shortDescription = "A service queue model (one service and one queue) with continuous time and one " +
    "statistic: the Mean Response Time, which is the average length of time a customer spends in the system from " +
    "arrival to departure. For recording their arrival time, individual customers are represented explicitly " +
    "in a waitingCustomers queue. The model includes two object types: <i>ServiceDesk</i> and <i>Customer</i>, " +
    "and two event types: <i>CustomerArrival</i> and <i>CustomerDeparture</i>. Both the random variable " +
    "for modeling the time between two customer arrivals and the random variable for modeling the duration " +
    "of services have an exponential probability distribution.";
oes.ui.i18n.changeDates.shortDescription = "2019-04-01";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-09-30";
sim.model.modified = "2016-10-01";
