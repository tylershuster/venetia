
const starToPlanets = require('./starToPlanets');

// const fs = require('fs');

const all = require('./filters/all');
const words = require('./filters/words');
const lexical = require('./filters/lexical');
const homophone = require('./filters/homophone');


const limit = 50000;

module.exports = async function generatePlanetNames({ parent, output, callback = () => {} }) {
  // const stream = fs.createWriteStream(`planets-${Date.now()}.txt`, { flags:'a' });
  const planets = starToPlanets(parent);

  planets = planets.slice(0, limit);

  // progress.start(planets.length, 0);

  // let found = 0;

  const outputs = {
    all,
    words,
    lexical,
    homophone,
    default: all
  };

  const func = outputs[output] ? outputs[output] : outputs.default;

  await func(planets, callback);

  // progress.stop();

}



