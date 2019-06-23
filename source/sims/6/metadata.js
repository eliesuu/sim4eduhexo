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
sim.model.name = "SchellingSegregationModel-1";
sim.model.title = "The Schelling Segregation Model";
sim.model.systemNarrative = "Residential segregation results from the behavior of residents as members of some social group, being either content or uncontent with their neighborhood depending on the fact if it includes a sufficient number of residents of the same group, and moving to another place as a consequence of being uncontent. A residential area is populated by residents belonging to some group. Periodically, all residents check if they are content with their neighborhood, based on their degree of tolerating neighbors of a different group. If they are not, they move to a location where they are content, or leave the area if they don't find such a location.";
sim.model.shortDescription = "In the simulation model, the residential area, as the simulation space, is represented by an integer grid (a 2-dimensional array of integer values) with 'neighborhood' defined to consist of the 8 adjacent cells surrounding a cell. A cell's integer value represents the group/type of resident occupying it.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Gerd Wagner";
sim.model.created = "2016-06-01";
sim.model.modified = "2016-09-22";
