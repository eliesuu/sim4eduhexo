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
sim.model.name = "SIR-1";
sim.model.title = "A Basic Susceptible-Infectious-Recovered (SIR) Model";
sim.model.systemNarrative = "<p>Diseases are a ubiquitous part of human " +
  "life. Contagious disease is a subset category of transmissible diseases " +
  "that are transmitted to other individuals, either by direct physical " +
  "contact, or by indirectly through secretion, objects or airborne " +
  "route. We can understand the problem of disease spread as follows: One " +
  "(or more) infected person is introduced into a community of " +
  "individuals, more or less susceptible to the disease in question. The " +
  "disease spreads from the affected to the unaffected by contact " +
  "infection. Each infected person runs through the course of his sickness, " +
  "and finally is removed from the number of those who are sick, by " +
  "recovery or by death. The chances of recovery or death vary from day to " +
  "day during the course of this disease. The chances that the affected may " +
  "convey infection to the unaffected are likewise dependent upon the " +
  "stage of the sickness. As the epidemic spreads, the number of unaffected " +
  "members of the community becomes reduced. Since the course of an " +
  "epidemic is short compared with the life of an individual, the " +
  "population may be considered as remaining constant, except in as far " +
  "as it is modified by deaths due to the epidemic disease itself. In the " +
  "course of time the epidemic may come to an end.</p> ";
sim.model.shortDescription = "<p>A Susceptible-Infectious-Recovered (SIR) " +
  "model is an epidemiological model that computes the theoretical number " +
  "of individuals infected with a contagious disease in a closed population " +
  "over time. The individuals in this population can be subdivided into a " +
  "set of distinct classes, dependent upon their experience with respect to " +
  "the disease. In the SIR model, we can assume that " +
  "individuals are in one of three possible classes: Susceptible, " +
  "Infectious or Recovered. Susceptible individuals have never come into " +
  "contact with the disease and are able to contract the disease. Infectious " +
  "individuals have the disease and can convey it to susceptible individuals " +
  "via contact. Recovered individuals are cured of and " +
  "immune to the disease for life. Individuals are born in the " +
  "susceptible class. Thus, due to the contact with an infectious " +
  "individual, a susceptible individual may contract the disease, after " +
  "which the individual moves to the infectious class. Once infectious, the " +
  "individual can spread the disease to other susceptible individuals via " +
  "contact, yet after some time the individual is cured and moves to the " +
  "recovered class. Depending on the characteristics of the population, " +
  "individuals may have more or less contact to other individuals " +
  "(<i>I</i>), which varies the speed in which the disease spreads. The " +
  "disease spread and amount of infected individuals is influenced by the " +
  "disease's contagiousness (&beta;) and recoverability (<i>g</i>). The " +
  "disease stops spreading when there is no susceptible or infectious " +
  "individuals in the population.</p>";
sim.model.source = "Kermack, W. O. &amp; McKendrick, A. G. (1927). " +
  "<a href='https://doi.org/10.1098%2Frspa.1927.0118' target='_blank'>" +
  "A contribution to the mathematical theory of epidemics</a >. " +
  "<i>Proceedings of the Royal Society A</i>, 115(772), p. 700-721.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Luis Gustavo Nardin";
sim.model.contributors = "Gerd Wagner";
sim.model.created = "2019-02-28";
sim.model.modified = "2019-04-03";