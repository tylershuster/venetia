const generatePlanetNames = require('./generatePlanetNames');
const starToPlanets = require('./starToPlanets');
window.filters = {
  all: require('./filters/all'),
  homophone: require('./filters/homophone'),
  lexical: require('./filters/lexical'),
  words: require('./filters/words'),
};

window.starToPlanets = starToPlanets;
window.generatePlanetNames = generatePlanetNames;