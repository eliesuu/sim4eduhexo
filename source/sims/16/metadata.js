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
sim.model.name = "Gossip";
sim.model.title = "A Cellular Automata Model for the Problem of Spreading Gossip";
sim.model.systemNarrative = "People living in some area participate in the spread of gossip. " +
    "Each person learns of the gossip from a neighbour who has already heard the news, and may then " +
    "pass it on to his or her neighbour (but if they don’t happen to see their neighbour that day, " +
    "they will not have a chance to spread the news). Once someone hears the gossip, he or she " +
    "remembers it and does not need to hear it again.";
sim.model.shortDescription = "A cellular automata model where each cell represents a person "+
    "that is likely to spread the gossip to his or her neighbors (using the N/E/S/W concept of neighborhood). " +
    "Each cell may be in either of two states: knowing the gossip or not knowing about it, corresponding to " +
    "the two integer values 1 or 0 in an integer grid. If the cell is in state 0, and it has one or more " +
    "neighbours in state 1, then for each of them, change the cell's state to 1 with some probability, " +
    "otherwise leave it at 0. If the cell is in state 1, it remains in that state.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-11-30";
sim.model.modified = "2016-12-05";
