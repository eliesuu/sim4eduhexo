/**
 * @fileOverview  Defines namespaces, global variables and procedures
 * 
 * @author Gerd Wagner
 */
var s4e = {
  docLocale: document.documentElement.lang,
  supportedLangFamilies: ["en", "de", "zh"],
  languageNames: { "de":"Deutsch", "en":"English", "es":"Español", "fr":"Français",
      "pt":"Português", "ru":"Русский", "zh":"中文"},
  getUserLanguage: function () {
    var languages = window.navigator.languages || 
          [window.navigator.language || window.navigator.userLanguage];
    return languages[0];  // use .substring(0,2) for extracting base language
  },
  constructLanguageOptions: function ( langSel) {
    var opt = {},
	    userLangFam = s4e.getUserLanguage().substring(0,2);
    for (var i=0; i < s4e.supportedLangFamilies.length; i++) {
      opt = document.createElement("option");
      opt.value = s4e.supportedLangFamilies[i];
      opt.textContent = s4e.languageNames[opt.value];
      if (opt.value === s4e.docLocale.substring(0,2)) {
        opt.setAttribute("selected", "selected");
      }
      langSel.appendChild( opt);    
    }
  }
}
// change event handler for the "languageSelect" element 
s4e.switchLanguage = function () { 
  var selectedLangFam = document.getElementById("languageSelect").value;
  if (selectedLangFam !== s4e.docLocale.substring(0,2)) {
    if (selectedLangFam === "en") {
      // switch from language start page to default start page
      window.location = "../index.html?lang='en'";
  	} else {
      if (s4e.docLocale.substring(0,2) === "en") {
        // switch from default start page to language start page
        window.location = "./" + selectedLangFam + "/index.html";
      } else {
        // switch from a language start page to another language start page
        window.location = "../" + selectedLangFam + "/index.html";
      }
	  }
  }
};
