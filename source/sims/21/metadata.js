/*******************************************************************************
 * Mafia simulation model metadata information
 * 
 * @copyright Copyright 2017-2018 Brandenburg University of Technology, Germany
 * @license The MIT License (MIT)
 * @author Luis Gustavo Nardin
 * @author Gerd Wagner
 * @author Jakub Lelo
 ******************************************************************************/
var sim = sim || {};
sim.model = sim.model || {};
sim.scenario = sim.scenario || {};
sim.config = sim.config || {};

var oes = oes || {};
oes.ui = oes.ui || {};
oes.ui.explanation = {};
oes.ui.i18n = {transDates:{}, changeDates:{}};

/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.name = "Mafia-1";
sim.model.title = "Mafia Protection Rackets";
sim.model.systemNarrative =
    "<p>Criminal organizations all over the world sell protection: "+
    "Latin American gangs, the Japanese <em>Yakuza</em>, the Russian Mafia, and the main Mafia organizations "+
    "operating in Italy: the Sicilian Mafia called <em>Cosa Nostra</em>, the <em>Sacra Corona Unita</em> in Puglia, "
        + "the <em>`Ndrangheta</em> in Calabria, and the <em>Camorra</em> in Campania. </p> " +
    "<p>Some of these groups provide genuine protection deterring thieves and other criminals " +
    "from exploiting businesses, while others practice pure extortion and only offer not " +
    "harming their ‘clients’. </p>"
        + "<p>Protection rackets harm the societies and economies in which they operate in multiple ways. " +
    "They harm those that they extort by taking their resources, providing little in return, " +
    "and inflicting violence upon those who refuse to pay them. " +
    "Even groups that provide real protection facilitate illegal transactions and allow " +
    "markets for illegal, and frequently harmful, goods and services, to exist. " +
    "They may also enforce cartels among businesses, increasing costs and hurting consumers. </p>"
sim.model.shortDescription =
    "<p>The model defines four object types: Customer, Entrepreneur, Mafia and State.  "
        + "Entrepreneurs represent business owners who are engaged "
        + "with producing and selling products or services. They make a number of decisions: " +
    "(i) pay pizzo or not, if approached by Mafiosi, (ii) report pizzo requests to the State, " +
    "(iii) report Mafia punishments to the State. </p> "
        + "<p>The State represents institutions responsible for enforcing antiracket laws. " +
    "It is composed of a set of police officers that can imprison Mafiosi based " +
    "on general investigations or on specific investigations, which are more likely to succeed. " +
    "After the police capture a Mafioso, they may find information about the entrepreneurs that " +
    "paid pizzo to that Mafioso. The State can then use this evidence to elicit collaboration " +
    "from those entrepreneurs. If collaboration is obtained, the State uses the collected information " +
    "to prosecute that Mafioso. The State can also provide financial support to entrepreneurs who have " +
    "suffered damages from a Mafia punishment. </p>"
        + "<p>The Mafia represents a family covering a neighbourhood and is composed of Mafiosi " +
    "that (i) request pizzo from entrepreneurs, (ii) provide protection to paying entrepreneurs, and " +
    "(iii) punish non-paying entrepreneurs. Since they are part of the same family they coordinate their " +
    "actions. The entrepreneurs decide on their own if they accept or decline the pizzo request, " +
    "but every decision they make has consequences, good or bad. If entrepreneurs don't pay, they will be " +
    "punished, e.g., by destroying their inventory. </p>"
sim.model.source =
    "L.G. Nardin, G. Andrighetto, R. Conte, Á. Székely, D. Anzola, C. Elsenbroich, U. Lotzmann, "
        + "M. Neumann, V. Punzo and K.G. Troitzsch. 2016. <a href='https://dx.doi.org/10.1007%2fs10458-016-9330-z'>Simulating "
        + "Protection Rackets: A Case Study of the Sicilian Mafia</a>. <i>Journal of Autonomous Agents and Multi-Agent Systems</i>. "
        + "30(6):1117-1147.";
sim.model.license = "CC BY-NC";
sim.model.creator = "Jakub Lelo, Luis Gustavo Nardin, Gerd Wagner";
sim.model.created = "2017-05-09";
sim.model.modified = "2018-08-26";
